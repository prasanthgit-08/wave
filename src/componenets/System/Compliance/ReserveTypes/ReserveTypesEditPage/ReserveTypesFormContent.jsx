import { t } from "i18next";
import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import Input from "../../../../../components/common/input";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  setDescriptionValid,
  setEditFormData,
  setObjectKey,
  setObjectKeyValid,
  setReserveTypesData,
  setReserveTypePK,
  setViewDetail,
  setDescription,
  setRequired,
  setObjectKeyError,
  setDescriptionError,
} from "../../../../../redux/ReserveTypesSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ReserveTypeService from "../../../../../services/ReserveTypeService";
import LoadingIcon from "../../../../common/LoadingIcon";
const ReserveTypesFormContent = () => {
  const { id, pageNumber } = useParams();
  const objectKey = useSelector((state) => state.reserveTypesReducer.objectKey);
  const description = useSelector((state) => state.reserveTypesReducer.description);
  const required = useSelector((state) => state.reserveTypesReducer.required);
  const viewDetail = useSelector((state) => state.reserveTypesReducer.viewDetail);
  const editFormData = useSelector((state) => state.reserveTypesReducer.editFormData);
  const reserveTypesData = useSelector((state) => state.reserveTypesReducer.reserveTypesData);
  const changesCancelled = useSelector((state) => state.reserveTypesReducer.changesCancelled);
  const descriptionError = useSelector((state) => state.reserveTypesReducer.descriptionError);
  const objectKeyError = useSelector((state) => state.reserveTypesReducer.objectKeyError);
  const params = useParams();
  const reserveTypePK = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  window.addEventListener("popstate", () => {
    dispatch(setObjectKeyError(true));
    dispatch(setObjectKeyValid(true));
    dispatch(setDescriptionError(true));
    dispatch(setDescriptionValid(true));
  });

  const fetchRecordById = (reserveTypePK) => {
    setLoading(true);
    ReserveTypeService.getRecord(reserveTypePK)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        navigate("/reserve-types");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //to backend
  const getReserveTypes = () => {
    dispatch(
      setReserveTypesData({
        reserveTypePK: reserveTypePK,
        objectKey: objectKey,
        description: description,
        required: required,
      })
    );
  };

  const handleCheckUniqueObjectKey = (string) => {
    ReserveTypeService.checkObjectKeyExist(id, objectKey)
      .then((res) => {
        dispatch(setObjectKeyError(res.data));
        dispatch(setObjectKeyValid(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckUniqueDescription = (string) => {
    ReserveTypeService.checkDescriptionExist(id, description)
      .then((res) => {
        dispatch(setDescriptionError(res.data));
        dispatch(setDescriptionValid(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (editFormData === undefined || editFormData == null || editFormData === "") {
      dispatch(setDescription(""));
      dispatch(setObjectKey(""));
      dispatch(setRequired(""));
      dispatch(setReserveTypePK(""));
      dispatch(setObjectKeyError(true));
      dispatch(setObjectKeyValid(true));
      dispatch(setDescriptionError(true));
      dispatch(setDescriptionValid(true));
    }
  }, [editFormData]);

  useEffect(() => {
    if (reserveTypePK) {
      fetchRecordById(reserveTypePK);
    }
  }, [reserveTypePK, changesCancelled]);

  useEffect(() => {
    getReserveTypes();
  }, [reserveTypePK]);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setReserveTypePK(editFormData.reserveTypePK || ""));
      dispatch(setObjectKey(editFormData.objectKey || ""));
      dispatch(setDescription(editFormData.description || ""));
      dispatch(setRequired(editFormData.required || false));
    }
  }, [editFormData]);

  const validationSchema = yup.object({
    objectKey: yup.string().required(),
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
        objectKey,
        description,
        required,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        objectKey: true,
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
                        Object Key
                      </Form.Label>
                    </Col>

                    <Col xl={2} lg={2} md={2} sm={2} xs={2} className="p-0">
                      <Input
                        name={objectKey}
                        type="text"
                        className={`${QuarterScreen.formControl} ${
                          viewDetail || loading === true
                            ? ""
                            : objectKey !== "" && objectKeyError
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        maxLength={50}
                        id="objectKey"
                        value={objectKey}
                        disabled={viewDetail}
                        onChange={(e) => {
                          const value = e.target.value.replace(/^\s+/g, "");
                          formik.handleChange(e);
                          dispatch(setObjectKey(value));
                          dispatch(setObjectKeyError(true)); // optional logic
                          dispatch(setObjectKeyValid(true));
                        }}
                        onBlur={(e) => {
                          const value = e.target.value?.trim();
                          if (value) {
                            handleCheckUniqueObjectKey(value); // common for both create/edit
                          }
                        }}
                      />
                    </Col>
                    <Row className={`${!viewDetail && !objectKeyError ? "" : "hide-elements"}`}>
                      <Col xs={3} md={3} sm={3}></Col>
                      <Col style={{ paddingLeft: "5px" }}>
                        {/* <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                    {`Object Key '${objectKey}' already exists!` }                   </p> */}
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="margin-box-1 form-group m-t-20 align-items-center row  m-l-0 m-r-0">
                    <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                      <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                        Description
                      </Form.Label>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                      <Input
                        name={description}
                        type="text"
                        className={`${QuarterScreen.formControl} ${
                          viewDetail || loading === true
                            ? ""
                            : description !== "" && descriptionError
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        maxLength={30}
                        id="description"
                        value={description}
                        disabled={viewDetail}
                        onChange={(e) => {
                          formik.handleChange(e);
                          dispatch(setDescription(e.target.value.replace(/^\s+/g, "")));
                          dispatch(setDescriptionError(true));
                          dispatch(setDescriptionValid(true));
                        }}
                        onBlur={(e) => {
                          if (e.target.value) {
                            handleCheckUniqueDescription(e.target.value);
                          }
                        }}
                      />
                    </Col>
                    <Row className={`${!viewDetail && !descriptionError ? "" : "hide-elements"}`}>
                      <Col xs={3} md={3} sm={3}></Col>
                      <Col style={{ paddingLeft: "5px" }}>
                        {/* <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                  {`Description '${description}' already exists!` }
                    
                    </p> */}
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="margin-box-1 form-group m-t-20 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} className="p-0  ">
                      <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                        Required
                      </Form.Label>
                    </Col>

                    <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        id="required"
                        name="required"
                        value={required}
                        checked={required}
                        disabled={viewDetail}
                        onChange={(e) => dispatch(setRequired(e.target.checked))}
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

export default ReserveTypesFormContent;
