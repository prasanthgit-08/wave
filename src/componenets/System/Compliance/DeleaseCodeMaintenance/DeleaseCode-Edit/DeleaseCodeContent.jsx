import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import Input from "../../../../../components/common/input";
import {
  setCheckCode,
  setCheckDescription,
  setCode,
  setDescription,
  setEditFormData,
  setSaveFormData,
  setViewDetail,
} from "../../../../../redux/DeleaseCodeSlice";
import DeleaseCodeService from "../../../../../services/DeleaseCodeService";
const DeleaseCodeContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const viewDetail = useSelector((state) => state.deleaseCodeReducer.viewDetail);
  const code = useSelector((state) => state.deleaseCodeReducer.code);
  const description = useSelector((state) => state.deleaseCodeReducer.description);
  const checkCode = useSelector((state) => state.deleaseCodeReducer.checkCode);
  const editFormData = useSelector((state) => state.deleaseCodeReducer.editFormData);
  const changesCancelled = useSelector((state) => state.deleaseCodeReducer.changesCancelled);
  const checkDescription = useSelector((state) => state.deleaseCodeReducer.checkDescription);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setCode(editFormData.deleaseCode ? editFormData.deleaseCode?.trim() : ""));
      dispatch(setDescription(editFormData.description ? editFormData.description : ""));
      dispatch(setCheckCode(""));
      dispatch(setCheckDescription(false));
    }
  }, [editFormData, changesCancelled]);

  const fetchRecordById = (id) => {
    setLoad(true);
    DeleaseCodeService.getDeleaseCodesById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        setLoad(false);
      })
      .catch((error) => {
        setLoad(false);
        console.log(error);
        navigate("/delease-code");
      });
  };

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setCode(""));
      dispatch(setDescription(""));
      dispatch(setCheckCode(""));
      dispatch(setCheckDescription(false));
    }
  }, [editFormData]);

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);

  // to backend
  const getCodeData = () => {
    dispatch(
      setSaveFormData({
        deleaseCodePK: id,
        deleaseCode: code,
        description: description,
      })
    );
  };
  useEffect(() => {
    getCodeData();
  }, [id, description, code]);
  //uniqness check
  const CheckCodeExist = (code) => {
    DeleaseCodeService.checkCodeExist(code, id)
      .then((res) => {
        dispatch(setCheckCode(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkDuplicateDescription = (description) => {
    DeleaseCodeService.checkdescriptionExist(description, id)
      .then((response) => {
        dispatch(setCheckDescription(response.data));
      })
      .catch((err) => {
        dispatch(setCheckDescription(false));
      });
  };
  const validationSchema = yup.object({
    contact: yup.string().required(),
    description: yup.string().required(),
  });
  return (
    <Formik
      initialValues={{
        code,
        description,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        code: true,
        description: true,
      }}
    >
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-10">
                  <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                    <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                      <Col xs={1} sm={1} md={1} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>Code</Form.Label>
                      </Col>

                      <Col xs={1} md={1} sm={1} className="p-0">
                        <Input
                          name={code}
                          type="text"
                          maxLength={4}
                          id="code"
                          value={code.toUpperCase()}
                          disabled={viewDetail}
                          onChange={(e) => {
                            dispatch(setCode(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                            dispatch(setCheckCode(""));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              CheckCodeExist(e.target.value);
                            }
                          }}
                          className={`${QuarterScreen.formControl} ${
                            viewDetail
                              ? ""
                              : code.length >= 1
                                ? checkCode
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                          }`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                      <Col xs={1} sm={1} md={1} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>Description</Form.Label>
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0">
                        <Input
                          name={description}
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            viewDetail
                              ? ""
                              : description.length >= 1
                                ? checkDescription
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                          }`}
                          maxLength={30}
                          id="description"
                          value={description}
                          disabled={viewDetail}
                          onChange={(e) => {
                            dispatch(setDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                            dispatch(setCheckDescription(false));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              checkDuplicateDescription(e.target.value);
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                {load && (
                  <div className="fade modal-backdrop show">
                    {" "}
                    <div className="pos-center">
                      {" "}
                      <div className="loader"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default DeleaseCodeContent;
