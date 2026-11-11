import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { t } from "i18next";
import { Form, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ShuttleCitysService from "../../../../services/ShuttleCitysService";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { RadioGroup, Radio } from "react-radio-group";
import {
  setViewDetail,
  setCity,
  setOutbound,
  setReload,
  setEditFormData,
  setCheckCity,
  setRadioValue,
} from "../../../../redux/ShuttleCitysSlice";
import LoadingIcon from "../../../common/LoadingIcon";
import Input from "../../../../components/common/input";

const ShuttleCitysFormContent = () => {
  const { pageNumber } = useParams();
  const viewDetail = useSelector((state) => state.shuttleCitysReducer.viewDetail);
  const params = useParams();
  const dispatch = useDispatch();
  const editFormData = useSelector((state) => state.shuttleCitysReducer.editFormData);
  const navigate = useNavigate();
  const { id } = useParams();
  const city = useSelector((state) => state.shuttleCitysReducer.city);
  const outbound = useSelector((state) => state.shuttleCitysReducer.outbound);
  const reload = useSelector((state) => state.shuttleCitysReducer.reload);
  const changesCancelled = useSelector((state) => state.shuttleCitysReducer.changesCancelled);
  const radioValue = useSelector((state) => state.shuttleCitysReducer.radioValue);
  const checkCity = useSelector((state) => state.shuttleCitysReducer.checkCity);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editFormData === undefined || editFormData == null || editFormData === "") {
      dispatch(setCity(""));
    }
  }, [editFormData]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setCity(editFormData.city ? editFormData.city?.trim() : ""));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      ShuttleCitysService.getShuttleCitysById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setEditFormData(data));
          dispatch(setViewDetail(true));
          dispatch(setOutbound(data.outbound));
          dispatch(setReload(data.reload));
          dispatch(setCheckCity(""));
        })
        .catch((err) => {
          console.log(err);
          navigate("/shuttle-citys");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      if (outbound) {
        dispatch(setRadioValue("outbound"));
      } else if (reload) {
        dispatch(setRadioValue("reload"));
      }
    }
  }, [outbound, reload]);

  useEffect(() => {
    if (radioValue == "outbound") {
      dispatch(setOutbound(true));
      dispatch(setReload(false));
    } else if (radioValue == "reload") {
      dispatch(setOutbound(false));
      dispatch(setReload(true));
    }
  }, [radioValue]);

  const handleCheckCity = (e) => {
    ShuttleCitysService.checkCityExist(e.target.value, id)
      .then((res) => {
        dispatch(setCheckCity(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validationSchema = yup.object({
    city: yup.string().required(),
  });

  const on = (setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{
        city,
        outbound,
        reload,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        city: true,
      }}
      on={on}
    >
      {(formik) => (
        <div className="w-100 p-2">
          {loading && <LoadingIcon />}
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-0">
                  <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                    <Form.Group className="form-group mt-5 form-group  m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={1} md={1} xs={1} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>
                          {t("ShuttleCitys.edit.page.city")}
                        </Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="p-0">
                        <input
                          name={city}
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            viewDetail || loading
                              ? ""
                              : city.length >= 1
                                ? checkCity
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                          }`}
                          maxLength={30}
                          id="city"
                          value={city}
                          disabled={viewDetail}

                          onInput={(e) => {
                            formik.handleChange(e);
                            dispatch(setCity(e.target.value));
                            dispatch(setCheckCity(""));
                          }}
                          onBlur={(e) => handleCheckCity(e)}
                        />
                      </Col>
                    </Form.Group>

                    <div className="margin-box-5 form-group m-t-5 m-b-15 align-items-center row  m-l-0 m-r-0">
                      <Col md={1} xs={1} sm={1} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          {t("ShuttleCitys.edit.page.type")}
                        </Form.Label>
                      </Col>
                      <Col md={4} xs={4} sm={4} className="p-0">
                        <RadioGroup
                          className="d-flex"
                          name="radioValue"
                          selectedValue={radioValue}
                          onChange={(value) => {
                            dispatch(setRadioValue(value));
                          }}
                        >
                          <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                            <Radio value="outbound" disabled={viewDetail} />
                            <label className={`f-w-600 m-l-5 ${QuarterScreen.label}`}>
                              {t("ShuttleCitys.edit.page.outbound")}
                            </label>
                          </Col>

                          <Col xs={2} md={2} sm={2} className="p-0 ms-5 d-flex">
                            <Radio value="reload" disabled={viewDetail} />
                            <label className={`f-w-600 m-l-5 ${QuarterScreen.label}`}>
                              {t("ShuttleCitys.edit.page.reload")}
                            </label>
                          </Col>
                        </RadioGroup>
                      </Col>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ShuttleCitysFormContent;
