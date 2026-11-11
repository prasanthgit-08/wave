import { t } from "i18next";
import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import QuarterScreen from "../../../styles/QuarterScreen.module.css";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  setCode,
  setCodesData,
  setDescription,
  setEditFormData,
  setDispatchRestrictions,
  setSpecialCodePK,
  setUrgent,
  setViewDetail,
  setCodeValid,
  setDescriptionValid,
} from "../../../redux/SpecialCodesSlice";
import SpecialCodesService from "../../../services/SpecialCodesService";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { removeLeadingWhitespace } from "../../../utils/utils";
import LoadingIcon from "../../common/LoadingIcon";

const SpecialCodesFormContent = () => {
  const { id } = useParams();
  const code = useSelector((state) => state.specialCodesReducer.code);
  const description = useSelector((state) => state.specialCodesReducer.description);
  const urgent = useSelector((state) => state.specialCodesReducer.urgent);
  const dispatchRestrictions = useSelector((state) => state.specialCodesReducer.dispatchRestrictions);
  const viewDetail = useSelector((state) => state.specialCodesReducer.viewDetail);
  const editFormData = useSelector((state) => state.specialCodesReducer.editFormData);
  const changesCancelled = useSelector((state) => state.specialCodesReducer.changesCancelled);
  const [codeError, setCodeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const params = useParams();
  const specialCodePK = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const descriptionValid = useSelector((state) => state.specialCodesReducer.descriptionValid);
  const codeValid = useSelector((state) => state.specialCodesReducer.codeValid);

  const fetchRecordById = (id) => {
    setLoading(true);
    SpecialCodesService.getSpecialCodesById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        navigate("/special-codes-maintenance");
      })
      .finally(() => setLoading(false));
  };

  //to backend
  const getCodes = () => {
    dispatch(
      setCodesData({
        specialCodePK: id,
        code: code,
        description: description,
        urgent: urgent,
        dispatchRestrictions: dispatchRestrictions,
      })
    );
  };

  const handleCheckUniqueCode = (value) => {
    SpecialCodesService.checkCode(value, specialCodePK)
      .then((res) => {
        if (res.data.length > 0) {
          setCodeError(res.data);
          dispatch(setCodeValid(false));
        } else {
          setCodeError("");
          dispatch(setCodeValid(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckUniqueDescription = (value) => {
    if (value?.trim()) {
      SpecialCodesService.checkDescription(value, specialCodePK)
        .then((res) => {
          if (res.data.length > 0) {
            setDescriptionError(res.data);
            dispatch(setDescriptionValid(false));
          } else {
            setDescriptionError("");
            dispatch(setDescriptionValid(true));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setSpecialCodePK(""));
      dispatch(setCode(""));
      dispatch(setDescription(""));
      dispatch(setUrgent(false));
      dispatch(setDispatchRestrictions(false));
    }
  }, [editFormData]);

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
      handleCheckUniqueCode();
      handleCheckUniqueDescription();
    }
  }, [id, changesCancelled]);

  useEffect(() => {
    getCodes();
  }, [id, code, description, urgent, dispatchRestrictions]);

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setCode(""));
      dispatch(setDescription(""));
      dispatch(setUrgent(false));
      dispatch(setDispatchRestrictions(false));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setSpecialCodePK(editFormData.specialCodePK || ""));
      dispatch(setCode(editFormData.code || ""));
      dispatch(setDescription(editFormData.description || ""));
      setDescriptionError("");
      setCodeError("");
      dispatch(setUrgent(editFormData.urgent || false));
      dispatch(setDispatchRestrictions(editFormData.dispatchRestrictions || false));
    }
  }, [editFormData, changesCancelled]);

  const validationSchema = yup.object({
    code: yup.string().required(),
    description: yup.string().required(),
  });

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{
        code,
        description,
        urgent,
        dispatchRestrictions,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        code: true,
        description: true,
      }}
      on={on}
    >
      {(formik) => (
        <div className="w-100 p-2">
          {loading && <LoadingIcon />}
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Col xs={10} md={10} className="ms-3 h-250px">
                  <Form.Group className="margin-box-1 form-group m-t-20 align-items-center row  m-l-0 m-r-0">
                    <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                      <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                        {t("edit.SpecialCodes.page.resources.tab.code")}
                      </Form.Label>
                    </Col>

                    <Col xl={2} lg={2} md={2} sm={2} xs={2} className="p-0">
                      <input
                        name={code}
                        type="text"
                        className={`${QuarterScreen.formControl} ${
                          viewDetail === true
                            ? ""
                            : code !== "" && codeError.length === 0 && codeValid
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        maxLength={6}
                        id="code"
                        value={code}
                        disabled={viewDetail}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onChange={(e) => {
                          formik.handleChange(e);
                          dispatch(setCode(removeLeadingWhitespace(e.target.value.toUpperCase())));
                          setCodeError("");
                          dispatch(setCodeValid(true));
                        }}
                        onBlur={(e) => {
                          handleCheckUniqueCode(e.target.value);
                        }}
                        style={{
                          borderColor:
                            viewDetail === true
                              ? "black"
                              : code !== "" && codeError.length === 0 && codeValid
                                ? "green"
                                : "red",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="margin-box-1 form-group m-t-20 align-items-center row  m-l-0 m-r-0">
                    <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                      <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                        {t("edit.SpecialCodes.page.resources.tab.description")}
                      </Form.Label>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                      <input
                        name={description}
                        type="text"
                        className={`${QuarterScreen.formControl} ${
                          viewDetail === true
                            ? ""
                            : description !== "" && descriptionError.length === 0 && descriptionValid
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        maxLength={30}
                        id="description"
                        value={description}
                        disabled={viewDetail}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onChange={(e) => {
                          formik.handleChange(e);
                          dispatch(setDescription(removeLeadingWhitespace(e.target.value.toUpperCase())));
                          setDescriptionError("");
                          dispatch(setDescriptionValid(true));
                        }}
                        onBlur={(e) => {
                          handleCheckUniqueDescription(e.target.value);
                        }}
                        style={{
                          borderColor:
                            viewDetail === true
                              ? "black"
                              : description !== "" && descriptionError.length === 0 && descriptionValid
                                ? "green"
                                : "red",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="margin-box-5 form-group m-t-2 m-b-20 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} className="p-0  ">
                      <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                        Urgent
                      </Form.Label>
                    </Col>

                    <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        id="urgent"
                        name="urgent"
                        value={urgent}
                        checked={urgent}
                        disabled={viewDetail}
                        onChange={(e) => dispatch(setUrgent(e.target.checked))}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} className="p-0  ">
                      <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                        Restricted Dispatch
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        id="dispatchRestrictions"
                        name="dispatchRestrictions"
                        value={dispatchRestrictions}
                        checked={dispatchRestrictions}
                        disabled={viewDetail}
                        onChange={(e) => dispatch(setDispatchRestrictions(e.target.checked))}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SpecialCodesFormContent;
