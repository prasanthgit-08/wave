import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import Input from "../../../../../components/common/input";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import ComplianceItemsService from "../../../../../services/ComplianceItemsService";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCheckDescriptionExist,
  setCheckDriverDescriptionExist,
  setCheckObjectKeyExist,
  setDescription,
  setDriverDescription,
  setEditFormData,
  setKeepHistory,
  setNotes,
  setObjectKey,
  setRestricted,
  setSaveFormData,
  setUseBlockDate,
  setUseLastDate,
  setUseNextDate,
  setViewDetail,
} from "../../../../../redux/ComplianceItemsSlice";
const ComplianceItemsContent = () => {
  const params = useParams();
  const { id } = useParams();
  const pk = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [atleastOnerror, setAtleastOneError] = useState(true);
  const useLastDate = useSelector((state) => state.complianceItemsReducer.useLastDate);
  const useNextDate = useSelector((state) => state.complianceItemsReducer.useNextDate);
  const useBlockDate = useSelector((state) => state.complianceItemsReducer.useBlockDate);
  const description = useSelector((state) => state.complianceItemsReducer.description);
  const driverDescription = useSelector((state) => state.complianceItemsReducer.driverDescription);
  const notes = useSelector((state) => state.complianceItemsReducer.notes);
  const objectKey = useSelector((state) => state.complianceItemsReducer.objectKey);
  const restricted = useSelector((state) => state.complianceItemsReducer.restricted);
  const keepHistory = useSelector((state) => state.complianceItemsReducer.keepHistory);
  const checkDescriptionExist = useSelector((state) => state.complianceItemsReducer.checkDescriptionExist);
  const viewDetail = useSelector((state) => state.complianceItemsReducer.viewDetail);
  const editFormData = useSelector((state) => state.complianceItemsReducer.editFormData);
  const changesCancelled = useSelector((state) => state.complianceItemsReducer.changesCancelled);
  const checkDriverDescriptionExist = useSelector(
    (state) => state.complianceItemsReducer.checkDriverDescriptionExist
  );
  const checkObjectKeyExist = useSelector((state) => state.complianceItemsReducer.checkObjectKeyExist);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDescription(editFormData.description ? editFormData.description?.trim() : ""));
      dispatch(
        setDriverDescription(editFormData.driverDescription ? editFormData.driverDescription?.trim() : "")
      );
      dispatch(setObjectKey(editFormData.objectKey ? editFormData.objectKey?.trim() : ""));
      dispatch(setUseLastDate(editFormData.useLastDate ? editFormData.useLastDate : ""));
      dispatch(setUseNextDate(editFormData.useNextDate ? editFormData.useNextDate : ""));
      dispatch(setUseBlockDate(editFormData.useBlockDate ? editFormData.useBlockDate : ""));
      dispatch(setRestricted(editFormData.restricted ? editFormData.restricted : ""));
      dispatch(setKeepHistory(editFormData.keepHistory ? editFormData.keepHistory : ""));
      dispatch(setNotes(editFormData.notes ? editFormData.notes : ""));
      dispatch(setCheckDescriptionExist(""));
    }
  }, [editFormData, changesCancelled]);

  const fetchRecordById = (id) => {
    setLoading(true);
    ComplianceItemsService.getComplianceItemsById(id)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        navigate("/compilance-items");
      });
  };

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);
  // to backend
  const getData = () => {
    dispatch(
      setSaveFormData({
        complianceItemPK: pk,
        description: description,
        driverDescription: driverDescription,
        objectKey: objectKey ? objectKey : null,
        restricted: restricted,
        useBlockDate: useBlockDate,
        useNextDate: useNextDate,
        useLastDate: useLastDate,
        notes: notes,
        keepHistory: keepHistory,
      })
    );
  };

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setDescription(""));
      dispatch(setDriverDescription(""));
      dispatch(setObjectKey(""));
      dispatch(setUseLastDate(""));
      dispatch(setUseNextDate(""));
      dispatch(setUseBlockDate(""));
      dispatch(setRestricted(""));
      dispatch(setKeepHistory(""));
      dispatch(setNotes(""));
      dispatch(setCheckDescriptionExist(""));
      dispatch(setCheckDriverDescriptionExist(false));
      dispatch(setCheckObjectKeyExist(false));
    }
  }, [editFormData]);

  useEffect(() => {
    getData();
  }, [
    pk,
    description,
    driverDescription,
    objectKey,
    useBlockDate,
    useNextDate,
    useLastDate,
    keepHistory,
    restricted,
    notes,
  ]);

  //check unique description exist
  const findDescriptionExist = (description) => {
    ComplianceItemsService.checkDescription(description, pk)
      .then((res) => {
        const data = res.data;

        dispatch(setCheckDescriptionExist(data));
      })
      .catch((err) => {});
  };

  //check unique  driver description exist
  const checkDuplicateDriverDescription = (driverDescription) => {
    ComplianceItemsService.checkDriversDescription(driverDescription, pk)
      .then((res) => {
        const data = res.data;

        dispatch(setCheckDriverDescriptionExist(data));
      })
      .catch((err) => {
        dispatch(setCheckDriverDescriptionExist(false));
      });
  };

  const validationSchema = yup.object({
    description: yup.string().required(),
    driverDescription: yup.string().required(),
    objectKey: yup.string().when("restricted", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
  });

  //check objectkey exist
  const checkObjectkeyExist = (objectKey) => {
    ComplianceItemsService.objectkeyuniqueornot(objectKey, id)
      .then((res) => {
        dispatch(setCheckObjectKeyExist(res.data));
      })
      .catch((err) => {
        dispatch(setCheckObjectKeyExist(false));
      });
  };

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
        <div className="p-2">
          <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="m-0 p-0 ">
              <Col xs={10}>
                <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
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
                      }`}
                      onChange={(e) => {
                        dispatch(setDescription(e.target.value.replace(/^\s+/g, "")));
                        dispatch(setCheckDescriptionExist(""));
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
                        viewDetail === true
                          ? ""
                          : driverDescription.length >= 1
                            ? checkDriverDescriptionExist
                              ? "borderRed"
                              : "borderGreen"
                            : "borderRed"
                      }`}
                      onChange={(e) => {
                        dispatch(setDriverDescription(e.target.value.replace(/^\s+/g, "")));
                        dispatch(setCheckDriverDescriptionExist(false));
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          checkDuplicateDriverDescription(e.target.value);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Use Last Date</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? useLastDate
                            ? ""
                            : !useLastDate && !useBlockDate && !useNextDate
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="useLastDate"
                      name="useLastDate"
                      disabled={viewDetail}
                      value={useLastDate}
                      checked={useLastDate}
                      onChange={(e) => {
                        dispatch(setUseLastDate(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Use Next Date</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? useNextDate
                            ? ""
                            : !useNextDate && !useBlockDate && !useLastDate
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="useNextDate"
                      name="useNextDate"
                      disabled={viewDetail}
                      value={useNextDate}
                      checked={useNextDate}
                      onChange={(e) => {
                        dispatch(setUseNextDate(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Use Block Date</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? useBlockDate
                            ? ""
                            : !useBlockDate && !useNextDate && !useLastDate
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="useBlockDate"
                      name="useBlockDate"
                      disabled={viewDetail}
                      value="useBlockDate"
                      checked={useBlockDate}
                      onChange={(e) => {
                        dispatch(setUseBlockDate(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-2 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Restricted</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="restricted"
                      name="restricted"
                      disabled={viewDetail}
                      value="restricted"
                      checked={restricted}
                      onChange={(e) => {
                        dispatch(setRestricted(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Keep History</Form.Label>
                  </Col>

                  <Col xs={6} md={6} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="keepHistory"
                      name="keepHistory"
                      disabled={viewDetail}
                      value="keepHistory"
                      checked={keepHistory}
                      onChange={(e) => {
                        dispatch(setKeepHistory(e.target.checked));
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
                      maxLength={60}
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
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      disabled={viewDetail}

                      onInput={(e) => {
                        dispatch(setNotes(e.target.value.replace(/^\s+/g, "")));
                      }}
                    />
                  </Col>
                  {loading && (
                    <div className="fade modal-backdrop show">
                      <div className="pos-center">
                        <div className="loader"></div>
                      </div>
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ComplianceItemsContent;
