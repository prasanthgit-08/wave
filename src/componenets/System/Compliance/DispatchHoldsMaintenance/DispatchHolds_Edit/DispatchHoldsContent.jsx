import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import Input from "../../../../../components/common/input";
import { useDispatch, useSelector } from "react-redux";

import DispatchHoldsService from "../../../../../services/DispatchHoldsService";
import {
  setCheckDescriptionExist,
  setCheckDriverDescriptionExist,
  setCheckObjectKeyExist,
  setDescription,
  setDispatchers,
  setDriverDescription,
  setEditFormData,
  setNotes,
  setObjectKey,
  setRestricted,
  setSaveFormData,
  setUseHoldDate,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../../redux/DispatchHoldSearchSlice";
const DispatchHoldsContent = () => {
  const { id } = useParams();
  const params = useParams();
  const pk = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const useHoldDate = useSelector((state) => state.dispatchHoldSearchSliceReducer.useHoldDate);
  const description = useSelector((state) => state.dispatchHoldSearchSliceReducer.description);
  const driverDescription = useSelector((state) => state.dispatchHoldSearchSliceReducer.driverDescription);
  const notes = useSelector((state) => state.dispatchHoldSearchSliceReducer.notes);

  const viewDetail = useSelector((state) => state.dispatchHoldSearchSliceReducer.viewDetail);
  const editFormData = useSelector((state) => state.dispatchHoldSearchSliceReducer.editFormData);
  const checkObjectKeyExist = useSelector(
    (state) => state.dispatchHoldSearchSliceReducer.checkObjectKeyExist
  );
  const checkDescriptionExist = useSelector(
    (state) => state.dispatchHoldSearchSliceReducer.checkDescriptionExist
  );
  const checkDriverDescriptionExist = useSelector(
    (state) => state.dispatchHoldSearchSliceReducer.checkDriverDescriptionExist
  );
  const objectKey = useSelector((state) => state.dispatchHoldSearchSliceReducer.objectKey);
  const restricted = useSelector((state) => state.dispatchHoldSearchSliceReducer.restricted);
  const dispatchers = useSelector((state) => state.dispatchHoldSearchSliceReducer.dispatchers);
  const saveLoaded = useSelector((state) => state.dispatchHoldSearchSliceReducer.saveLoaded);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDescription(editFormData.description ? editFormData.description?.trim() : ""));
      dispatch(
        setDriverDescription(editFormData.driverDescription ? editFormData.driverDescription?.trim() : "")
      );
      dispatch(setRestricted(editFormData.restricted));
      dispatch(setDispatchers(editFormData.dispatchers));
      dispatch(setObjectKey(editFormData.objectKey ? editFormData.objectKey?.trim() : ""));

      dispatch(setUseHoldDate(editFormData.useHoldDate));

      dispatch(setNotes(editFormData.notes ? editFormData.notes : ""));
      dispatch(setCheckDescriptionExist(""));
      dispatch(setCheckDriverDescriptionExist(""));
    }
  }, [editFormData, viewDetail]);

  const fetchRecordById = (id) => {
    setLoading(true);
    DispatchHoldsService.getById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        navigate("/dispatch-hold");
      });
  };
  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setDescription(""));
      dispatch(setDriverDescription(""));
      dispatch(setObjectKey(""));
      dispatch(setUseHoldDate(false));

      dispatch(setRestricted(false));
      dispatch(setDispatchers(false));

      dispatch(setNotes(""));
      dispatch(setCheckDescriptionExist(""));
      dispatch(setCheckDriverDescriptionExist(""));
      dispatch(setCheckObjectKeyExist(false));
    }
  }, [editFormData]);

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
    }
  }, [id]);

  //check description exist
  const findDescriptionExist = (string) => {
    DispatchHoldsService.descriptionExistCheck(string, id)
      .then((res) => {
        dispatch(setCheckDescriptionExist(res.data));
      })
      .catch((err) => {});
  };
  //check driver description exist
  const findDriverDescriptionExist = (string) => {
    DispatchHoldsService.driverDescriptionExistCheck(string, id)
      .then((res) => {
        dispatch(setCheckDriverDescriptionExist(res.data));
      })
      .catch((err) => {});
  };

  //check objectkey exist
  const checkObjectkeyExist = (objectKey) => {
    DispatchHoldsService.objectkeyuniqueornot(objectKey, id)
      .then((res) => {
        dispatch(setCheckObjectKeyExist(res.data));
      })
      .catch((err) => {});
  };
  const getData = () => {
    dispatch(
      setSaveFormData({
        dispatchHoldPK: id,
        description: description,
        driverDescription: driverDescription,
        objectKey: objectKey ? objectKey : null,
        restricted: restricted,
        useHoldDate: useHoldDate,
        notes: notes,
        dispatchers: dispatchers,
      })
    );
  };
  useEffect(() => {
    getData();
  }, [pk, description, driverDescription, objectKey, useHoldDate, restricted, notes, dispatchers]);

  const validationSchema = yup.object({
    description: yup.string().required(),
    driverDescription: yup.string().required(),
    objectKey: yup.string().when("restricted", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
  });

  return (
    <Formik
      initialValues={{
        description,
        driverDescription,
        objectKey,
        restricted,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        description: true,
        driverDescription: true,
        objectKey: true,
        restricted: false,
      }}
    >
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-0 ">
                  <Col xs={10}>
                    <Form.Group className=" mt-1 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">
                          {t("edit.printer.page.description")}
                        </Form.Label>
                      </Col>

                      <Col xs={5} md={5} sm={5} className="p-0">
                        <Input
                          id="description"
                          name="description"
                          type="text"
                          value={description}
                          maxLength={30}
                          disabled={viewDetail}
                          className={`${styles.formControl}  ${
                            viewDetail
                              ? ""
                              : formik.errors.description === undefined && description.length >= 1
                                ? checkDescriptionExist
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                          }
                      `}
                          onChange={(e) => {
                            dispatch(setDescription(e.target.value.replace(/^\s+/g, "")));
                            dispatch(setCheckDescriptionExist(false));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              findDescriptionExist(e.target.value);
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Driver Description</Form.Label>
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0">
                        <Input
                          id="driverDescription"
                          name="driverDescription"
                          type="text"
                          value={driverDescription}
                          maxLength={50}
                          disabled={viewDetail}
                          className={`${styles.formControl}  ${
                            viewDetail
                              ? ""
                              : formik.errors.driverDescription === undefined && driverDescription.length >= 1
                                ? checkDriverDescriptionExist
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                          }
                      `}
                          onChange={(e) => {
                            dispatch(setDriverDescription(e.target.value.replace(/^\s+/g, "")));
                            dispatch(setCheckDriverDescriptionExist(false));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              findDriverDescriptionExist(e.target.value);
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Use Hold Date</Form.Label>
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0 "
                          id="useHoldDate"
                          name="useHoldDate"
                          disabled={viewDetail}
                          value={useHoldDate}
                          checked={useHoldDate}
                          onChange={(e) => {
                            dispatch(setUseHoldDate(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Restricted</Form.Label>
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0 "
                          id="restricted"
                          name="restricted"
                          disabled={viewDetail || dispatchers === true}
                          value={restricted}
                          checked={restricted}
                          onChange={(e) => {
                            dispatch(setRestricted(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Dispatchers</Form.Label>
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0 "
                          id="restricted"
                          name="restricted"
                          disabled={viewDetail || restricted == true}
                          value={dispatchers}
                          checked={dispatchers}
                          onChange={(e) => {
                            dispatch(setDispatchers(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Object Key</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <Input
                          id="objectKey"
                          name="objectKey"
                          type="text"
                          value={objectKey}
                          maxLength={10}
                          disabled={viewDetail}
                          className={`customFormControl ${
                            viewDetail === true ||
                            (!restricted && !objectKey && !checkObjectKeyExist) ||
                            (!restricted && objectKey && !checkObjectKeyExist)
                              ? ""
                              : restricted && objectKey && !checkObjectKeyExist
                                ? "borderGreen"
                                : "borderRed"
                          }`}

                          onChange={(e) => {
                            dispatch(setObjectKey(e.target.value.replace(/^\s+/g, "")));
                            dispatch(setCheckObjectKeyExist(false));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              checkObjectkeyExist(e.target.value);
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items row  m-l-0 m-r-0 ">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Notes</Form.Label>
                      </Col>

                      <Col xs={9} md={9} sm={9} className="p-0">
                        <textarea
                          id="notes"
                          className={`${styles.formControl} h-100 `}
                          rows={8}
                          cols={23}
                          name="notes"
                          type="text"
                          value={notes}
                          disabled={viewDetail}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onInput={(e) => {
                            dispatch(setNotes(e.target.value.replace(/^\s+/g, "")));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>

                {(saveLoaded || loading) && (
                  <div className="fade modal-backdrop show">
                    <div className="pos-center">
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

export default DispatchHoldsContent;
