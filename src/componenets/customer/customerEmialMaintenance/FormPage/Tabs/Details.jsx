import React from "react";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { t } from "i18next";
import { useEffect, useState, useRef } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setNameRedux,
  setEmailRedux,
  setReportsAsCSV,
  setReportsAsExcel,
  setReportsAsPDF,
  setIsMailValid,
  setCheckEmailDataValid,
  setSelectedId,
  setReportsAsText,
} from "../../../../../redux/CustomerEmailMaintenanceSlice";
import { useParams } from "react-router-dom";
import CustomerEmailMaintenance from "../../../../../services/CustomerEmailMaintenanceService";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
import { removeLeadingWhitespace } from "../../../../../utils/utils";
import Input from "../../../../../components/common/input";

function Details({ loading }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkEmailData, setCheckEmailData] = useState("");
  const [radioValue, setRadioValue] = useState("");

  const { cupk } = useParams();

  const valueName = useSelector((state) => state.customerEmailMaintenance.name);
  const valueEmail = useSelector((state) => state.customerEmailMaintenance.email);
  const reportsAsText = useSelector((state) => state.customerEmailMaintenance.reportsAsText);
  const reportsAsExcel = useSelector((state) => state.customerEmailMaintenance.reportsAsExcel);
  const ReportsAsPDF = useSelector((state) => state.customerEmailMaintenance.reportsAsPDF);
  const ReportsAsCSV = useSelector((state) => state.customerEmailMaintenance.reportsAsCSV);

  const EditMode = useSelector((state) => state.customerEmailMaintenance.editMode);

  useEffect(() => {
    if (cupk) {
      if (reportsAsText) {
        setRadioValue("reportsAsText");
      } else if (reportsAsExcel) {
        setRadioValue("reportsAsExcel");
      } else if (ReportsAsPDF) {
        setRadioValue("ReportsAsPDF");
      } else if (ReportsAsCSV) {
        setRadioValue("ReportsAsCSV");
      }
    }
  }, [reportsAsText, reportsAsExcel, ReportsAsPDF, ReportsAsCSV]);

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
    } else if (radioValue === "ReportsAsPDF") {
      dispatch(setReportsAsText(false));
      dispatch(setReportsAsExcel(false));
      dispatch(setReportsAsPDF(true));
      dispatch(setReportsAsCSV(false));
    } else if (radioValue === "ReportsAsCSV") {
      dispatch(setReportsAsText(false));
      dispatch(setReportsAsExcel(false));
      dispatch(setReportsAsPDF(false));
      dispatch(setReportsAsCSV(true));
    }
  }, [radioValue]);

  useEffect(() => {
    setCheckEmailData("");
    dispatch(setCheckEmailDataValid(""));
  }, [EditMode]);

  const checkEmailDataValid = useSelector((state) => state.customerEmailMaintenance.checkEmailDataValid);
  const customerfk = useSelector((state) => state.customerEmailMaintenance.customerFK);
  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().matches(emailRegex),
  });

  const hanldeCheckEmail = (e) => {
    CustomerEmailMaintenance.checkEmail(e.target.value, cupk, customerfk)
      .then((res) => {
        setCheckEmailData(res.data);
        dispatch(setCheckEmailDataValid(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={{
        name,
        email,
      }}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <div className="p-15 w-100">
            <Row className="m-0 justify-content-start p-0">
              <Col lg={12}>
                <Form.Group className=" form-group mt-2 m-b-20   align-items-center row  m-l-0 m-r-0">
                  <Col xl={2} lg={2} md={2} xs={2} sm={2} className="p-0">
                    <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                      {t("dealers.list.page.table.heading.name")}
                    </Form.Label>
                  </Col>

                  <Col xl={4} lg={4} md={4} sm={4} xs={4} className="p-0">
                    <Input
                      type="text"
                      className={`${QuarterScreen.formControl} ${
                        EditMode ? "" : valueName || name.length >= 1 ? "borderGreen" : "borderRed"
                      }`}
                      id="name"
                      name="name"
                      maxLength={30}
                      disabled={EditMode}
                      value={valueName}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setName(removeLeadingWhitespace(e.target.value));
                        dispatch(setNameRedux(removeLeadingWhitespace(e.target.value)));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 form-group mb-3  align-items-center row  m-l-0 m-r-0">
                  <Col xl={2} lg={2} md={2} xs={2} sm={2} className="p-0">
                    <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                      {t("edit.dealer.page.resources.tab.deliveryEmail")}
                    </Form.Label>
                  </Col>

                  <Col xl={5} lg={5} md={5} sm={5} xs={5} className="p-0">
                    <Input
                      type="text"
                      className={`${QuarterScreen.formControl} ${
                        EditMode
                          ? ""
                          : valueEmail.match(
                                /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/
                              ) && valueEmail.length > 1
                            ? checkEmailData || checkEmailDataValid
                              ? "borderRed"
                              : "borderGreen"
                            : "borderRed"
                      }`}
                      id="email"
                      name="email"
                      disabled={EditMode}
                      value={valueEmail}
                      maxLength={70}
                      onBlur={(e) => {
                        if (!e.target.value.trim()) return;
                        hanldeCheckEmail(e);
                      }}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setEmail(removeLeadingWhitespace(e.target.value));
                        dispatch(setEmailRedux(removeLeadingWhitespace(e.target.value)));
                        dispatch(setIsMailValid(""));
                        setCheckEmailData("");
                        dispatch(setCheckEmailDataValid(""));
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
                        EditMode || loading ? "" : !radioValue ? "borderRed" : ""
                      }`}
                      id="reportsAsText"
                      disabled={EditMode}
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
                        EditMode || loading ? "" : !radioValue ? "borderRed" : ""
                      }`}
                      id="reportsAsExcel"
                      name="reports"
                      disabled={EditMode}
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
                        EditMode || loading ? "" : !radioValue ? "borderRed" : ""
                      }`}
                      id="ReportsAsPDF"
                      name="reports"
                      disabled={EditMode}
                      value="ReportsAsPDF"
                      checked={radioValue === "ReportsAsPDF"}
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
                        EditMode || loading ? "" : !radioValue ? "borderRed" : ""
                      }`}
                      id="ReportsAsCSV"
                      disabled={EditMode}
                      value={"ReportsAsCSV"}
                      name="reports"
                      checked={radioValue === "ReportsAsCSV"}
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
}

export default Details;
