import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { t } from "i18next";
import { Form, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../../../../styles/QuarterScreen.module.css";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import Input from "../../../../../components/common/input";
import {
  setDateRequired,
  setDeleaseItems,
  setDeleaseItemsFormData,
  setDescription,
  setDescriptionValid,
  setEditFormData,
  setInActive,
  setViewDetail,
  setDeleaseItemPK,
  setSelecteActiveType,
} from "../../../../../redux/DeleaseItemsSlice";
import DeleaseItemsService from "../../../../../services/DeleaseItemsService";
import LoadingIcon from "../../../../common/LoadingIcon";

const DeleaseItemsFormContent = () => {
  const inActive = useSelector((state) => state.deleaseItemsReducer.inActive);
  const description = useSelector((state) => state.deleaseItemsReducer.description);
  const dateRequired = useSelector((state) => state.deleaseItemsReducer.dateRequired);
  const viewDetail = useSelector((state) => state.deleaseItemsReducer.viewDetail);
  const { id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const editFormData = useSelector((state) => state.deleaseItemsReducer.editFormData);
  const selecteActiveType = useSelector((state) => state.deleaseItemsReducer.selecteActiveType);
  const descriptionValid = useSelector((state) => state.deleaseItemsReducer.descriptionValid);
  const navigate = useNavigate();
  const params = useParams();
  const deleaseItemPK = params.id;
  const [descriptionError, setDescriptionError] = useState("");

  const changesCancelled = useSelector((state) => state.deleaseItemsReducer.changesCancelled);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setDeleaseItemPK(""));
      dispatch(setDescription(""));
      dispatch(setInActive(""));
      dispatch(setDateRequired(""));
    }
  }, [editFormData]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDeleaseItemPK(editFormData.deleaseItemPK || ""));
      dispatch(setDescription(editFormData.description || ""));
      dispatch(setInActive(editFormData.inActive || ""));
      dispatch(setDateRequired(editFormData.dateRequired || ""));
    }
  }, [editFormData]);

  const getContact = () => {
    dispatch(
      setDeleaseItemsFormData({
        deleaseItemPK: id,
        description: description,
        inActive: inActive,
        dateRequired: dateRequired,
        selecteActiveType: selecteActiveType,
      })
    );
  };
  useEffect(() => {
    getContact();
  }, [id, description, inActive, dateRequired]);

  const fetchRecordById = (id) => {
    setLoading(true);
    DeleaseItemsService.getDeleaseItemsById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        console.log(error);
        navigate("/delease-items");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheckUniqueDescription = (value) => {
    // if (!value || value?.trim() === "") return;

    DeleaseItemsService.checkDescriptionExist(value, deleaseItemPK)
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
  };
  useEffect(() => {
    if (id) {
      fetchRecordById(id);
      setDescriptionError("");
      dispatch(setDescriptionValid(true));
    }
  }, [id, changesCancelled]);

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };
  return (
    <Formik
      initialValues={{
        inActive,
        description,
        dateRequired,
      }}
      validationSchema={""}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        inActive: true,
        description: true,
        dateRequired: true,
      }}
      on={on}
    >
      {(formik) => (
        <Form>
          <div className="w-100 p-2">
            {loading && <LoadingIcon />}
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Col xs={10} md={10} className="ms-3 h-250px">
                    <Form.Group className="margin-box-1 form-group m-t-20 m-b-20   align-items-center row  m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Description
                        </Form.Label>
                      </Col>

                      <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                        <Input
                          type="text"
                          id="description"
                          name="description"
                          value={description}
                          className={`${QuarterScreen.formControl} ${
                            viewDetail || loading
                              ? ""
                              : description !== "" && descriptionError.length === 0 && descriptionValid
                                ? "borderGreen"
                                : "borderRed"
                          }`}
                          disabled={viewDetail}
                          maxLength={30}
                          onChange={(e) => {
                            const value = e.target.value.replace(/^\s+/g, "");
                            formik.handleChange(e);
                            dispatch(setDescription(value));
                            setDescriptionError(""); // clear on input
                            dispatch(setDescriptionValid(true));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              handleCheckUniqueDescription(e.target.value);
                            }
                          }}
                        />
                      </Col>
                      <Form.Group
                        className={`form-group m-t-1  align-items-center d-flex ${
                          !viewDetail && descriptionError ? "" : "hide-elements"
                        }`}
                      >
                        <div className="p-0 w-200px "></div>

                        <Col xs={9} md={9} sm={9} className="d-flex ">
                          <p className="mb-0 text-danger margin-left-5 " style={{ height: "5px" }}>
                            {/* {descriptionError} */}
                          </p>
                        </Col>
                      </Form.Group>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Inactive</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="inActive"
                          name="inActive"
                          checked={inActive}
                          disabled={viewDetail}
                          onChange={(e) => {
                            dispatch(setInActive(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Date Required</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="dateRequired"
                          name="dateRequired"
                          checked={dateRequired}
                          disabled={viewDetail}
                          onChange={(e) => {
                            dispatch(setDateRequired(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DeleaseItemsFormContent;
