import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
import {
  resetChanges,
  setCheckEmail,
  setCheckName,
  setEmail,
  setIsDetailsTabValid,
  setName,
  setReportsAsCSV,
  setReportsAsExcel,
  setReportsAsPDF,
  setReportsAsText,
  setSaveFormData,
} from "../../../../../redux/CustomerPlantEmailSlice";
import PlantEmailService from "../../../../../services/PlantEmailService";
const DetailsTab = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const emailPK = params.emailPk;
  const plantId = params.id;
  const [radioValue, setRadioValue] = useState("");

  const name = useSelector((state) => state.customerPlantEmailReducer.name);
  const email = useSelector((state) => state.customerPlantEmailReducer.email);
  const reportsAsText = useSelector((state) => state.customerPlantEmailReducer.reportsAsText);
  const reportsAsExcel = useSelector((state) => state.customerPlantEmailReducer.reportsAsExcel);
  const reportsAsPDF = useSelector((state) => state.customerPlantEmailReducer.reportsAsPDF);
  const reportsAsCSV = useSelector((state) => state.customerPlantEmailReducer.reportsAsCSV);
  const viewDetail = useSelector((state) => state.customerPlantEmailReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerPlantEmailReducer.editFormData);
  const checkName = useSelector((state) => state.customerPlantEmailReducer.checkName);
  const checkEmail = useSelector((state) => state.customerPlantEmailReducer.checkEmail);
  const changesCancelled = useSelector((state) => state.customerPlantEmailReducer.changesCancelled);

  useEffect(() => {
    if (emailPK) {
      if (reportsAsText) {
        setRadioValue("reportsAsText");
      } else if (reportsAsExcel) {
        setRadioValue("reportsAsExcel");
      } else if (reportsAsPDF) {
        setRadioValue("reportsAsPDF");
      } else if (reportsAsCSV) {
        setRadioValue("reportsAsCSV");
      }
    }
  }, [reportsAsText, reportsAsExcel, reportsAsPDF, reportsAsCSV]);

  useEffect(() => {
    if (radioValue === "reportsAsText") {
      dispatch(setReportsAsText(true));
      dispatch(setReportsAsExcel(false));
      dispatch(setReportsAsPDF(false));
      dispatch(setReportsAsCSV(false));
    } else if (radioValue === "reportsAsExcel") {
      dispatch(setReportsAsText(false));
      dispatch(setReportsAsExcel(true));
      dispatch(setReportsAsPDF(false));
      dispatch(setReportsAsCSV(false));
    } else if (radioValue === "reportsAsPDF") {
      dispatch(setReportsAsPDF(true));
      dispatch(setReportsAsText(false));
      dispatch(setReportsAsExcel(false));
      dispatch(setReportsAsCSV(false));
    } else if (radioValue === "reportsAsCSV") {
      dispatch(setReportsAsText(false));
      dispatch(setReportsAsExcel(false));
      dispatch(setReportsAsPDF(false));
      dispatch(setReportsAsCSV(true));
    }
  }, [radioValue]);
  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().matches(emailRegex).required(),
  });
  const handleCheckName = (name) => {
    PlantEmailService.checkNameExist(name, emailPK, plantId)
      .then((res) => {
        dispatch(setCheckName(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCheckEmail = (email) => {
    PlantEmailService.checkEmailExist(email, emailPK, plantId)
      .then((res) => {
        dispatch(setCheckEmail(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (editFormData == null || editFormData === undefined) {
      dispatch(resetChanges());
      setRadioValue("");
    }
  }, [editFormData]);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setName(editFormData.name ? editFormData.name?.trim() : ""));
      dispatch(setEmail(editFormData.email ? editFormData.email?.trim() : ""));
      dispatch(setReportsAsExcel(editFormData.reportsAsExcel ? editFormData.reportsAsExcel : ""));
      dispatch(setReportsAsText(editFormData.reportsAsText ? editFormData.reportsAsText : ""));
      dispatch(setReportsAsPDF(editFormData.reportsAsPDF ? editFormData.reportsAsPDF : ""));
      dispatch(setReportsAsCSV(editFormData.reportsAsCSV ? editFormData.reportsAsCSV : ""));

      dispatch(setCheckName());
      dispatch(setCheckEmail());
    }
  }, [editFormData, changesCancelled]);

  // to backend
  const detailTabData = () => {
    dispatch(
      setSaveFormData({
        name: name,
        email: email,
        customerPlantFK: plantId,
        customerPlantEmailPK: emailPK,
        reportsAsText,
        reportsAsExcel,
        reportsAsPDF,
        reportsAsCSV,
      })
    );
  };
  useEffect(() => {
    detailTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, plantId, emailPK, reportsAsText, reportsAsExcel, reportsAsPDF, reportsAsCSV]);

  //tab validation
  useEffect(() => {
    if (
      name !== "" &&
      !checkName &&
      email !== "" &&
      !checkEmail &&
      email.match(emailRegex) &&
      (reportsAsCSV || reportsAsExcel || reportsAsPDF || reportsAsText)
    ) {
      dispatch(setIsDetailsTabValid(true));
    } else {
      dispatch(setIsDetailsTabValid(false));
    }
  }, [name, email, reportsAsText, reportsAsExcel, reportsAsPDF, reportsAsCSV, checkName, checkEmail]);

  return (
    <Formik
      initialValues={{
        name,
        email,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        name: true,

        email: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-15 w-100">
            <Row className="m-0 justify-content-start p-0">
              <Col lg={12}>
                <Form.Group className="margin-box-1 form-group m-t-20 m-b-20   align-items-center row  m-l-0 m-r-0">
                  <Col xl={2} lg={2} md={2} xs={2} sm={2} className="p-0">
                    <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                      {t("dealers.list.page.table.heading.name")}
                    </Form.Label>
                  </Col>

                  <Col xl={4} lg={4} md={4} sm={4} xs={4} className="p-0">
                    <input
                      type="text"
                      className={`${QuarterScreen.formControl} ${
                        checkName && !viewDetail
                          ? "borderRed"
                          : viewDetail === true
                            ? "black"
                            : formik.errors.name === undefined && name.length > 0
                              ? "borderGreen"
                              : formik.errors.name !== undefined || name == ""
                                ? "borderRed"
                                : ""
                      }`}
                      id="name"
                      name="name"
                      value={name}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onChange={(e) => {
                        dispatch(setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                        dispatch(setCheckName(""));
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          handleCheckName(e.target.value);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 form-group m-b-30  align-items-center row  m-l-0 m-r-0">
                  <Col xl={2} lg={2} md={2} xs={2} sm={2} className="p-0">
                    <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                      {t("edit.dealer.page.resources.tab.deliveryEmail")}
                    </Form.Label>
                  </Col>

                  <Col xl={5} lg={5} md={5} sm={5} xs={5} className="p-0">
                    <input
                      type="text"
                      className={`${styles.formControl}  ${
                        viewDetail === true
                          ? ""
                          : formik.errors.email === undefined &&
                              email != null &&
                              email.length >= 1 &&
                              !checkEmail
                            ? "borderGreen"
                            : formik.errors.email !== undefined || checkEmail
                              ? "borderRed"
                              : ""
                      }  `}
                      id="email"
                      name="email"
                      value={email}
                      maxLength={70}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onChange={(e) => {
                        dispatch(setEmail(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                        dispatch(setCheckEmail(""));
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          handleCheckEmail(e.target.value);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <div className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                  <Col xl={2} lg={2} md={2} xs={2} sm={2} className="p-0">
                    <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                      {t("permission.form.page.details.tab.reports.as.text")}
                    </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="radio"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? reportsAsText
                            ? ""
                            : !reportsAsText && !reportsAsExcel && !reportsAsCSV && !reportsAsPDF
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="reportsAsText"
                      disabled={viewDetail}
                      value="reportsAsText"
                      name="reports"
                      checked={radioValue === "reportsAsText"}
                      onChange={(e) => {
                        setRadioValue(e.target.value);
                      }}
                    />
                  </Col>
                </div>

                <div className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                  <Col xl={2} lg={2} md={2} xs={2} sm={2} className="p-0">
                    <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                      {t("permission.form.page.details.tab.reports.as.excel")}
                    </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="radio"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? reportsAsExcel
                            ? ""
                            : !reportsAsText && !reportsAsExcel && !reportsAsCSV && !reportsAsPDF
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="reportsAsExcel"
                      name="reports"
                      disabled={viewDetail}
                      value="reportsAsExcel"
                      checked={radioValue === "reportsAsExcel"}
                      onChange={(e) => {
                        setRadioValue(e.target.value);
                      }}
                    />
                  </Col>
                </div>

                <div className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                  <Col xl={2} lg={2} md={2} xs={2} sm={2} className="p-0">
                    <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                      {t("permission.form.page.details.tab.reports.as.pdf")}
                    </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="radio"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? reportsAsPDF
                            ? ""
                            : !reportsAsText && !reportsAsExcel && !reportsAsCSV && !reportsAsPDF
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="reportsAsPDF"
                      disabled={viewDetail}
                      name="reports"
                      value="reportsAsPDF"
                      checked={radioValue === "reportsAsPDF"}
                      onChange={(e) => {
                        setRadioValue(e.target.value);
                      }}
                    />
                  </Col>
                </div>

                <div className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                  <Col xl={2} lg={2} md={2} xs={2} sm={2} className="p-0">
                    <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                      {t("permission.form.page.details.tab.reports.as.csv")}
                    </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="radio"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? reportsAsCSV
                            ? ""
                            : !reportsAsText && !reportsAsExcel && !reportsAsCSV && !reportsAsPDF
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="reportsAsCSV"
                      disabled={viewDetail}
                      value={"reportsAsCSV"}
                      name="reports"
                      checked={radioValue === "reportsAsCSV"}
                      onChange={(e) => {
                        setRadioValue(e.target.value);
                      }}
                    />
                  </Col>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DetailsTab;
