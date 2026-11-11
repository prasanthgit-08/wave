/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { batch, useDispatch, useSelector } from "react-redux";
import { setOnHoldForm, setOnHoldTab, setOnHold } from "../../../../../redux/OrderEntryFilterSlice";
import { Formik } from "formik";
import * as yup from "yup";
import DateInputField from "../../../../common/DateInputField";

function OnHold({ styles }) {
  const [reasonforhold, setReasonaForHold] = useState("");
  const [authorizedby, setAuthorizedBy] = useState("");
  const [releasedate, setReleaseDate] = useState("");
  const [isReleaseDateValid, setIsReleaseDateValid] = useState(true);
  const [onholdnotes, setOnHoldNotes] = useState("");

  const dispatch = useDispatch();
  const onHold = useSelector((state) => state.orderEntryReducer.onHold);
  const customerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const dataResetFlag = useSelector((state) => state.orderEntryReducer.dataReset);
  //for date format to check min date in ohhold
  let today = new Date();

  function formDataOnHold() {
    dispatch(
      setOnHoldForm({
        reason: reasonforhold,
        authorizedBy: authorizedby,
        holdReleaseDate: releasedate,
        notes: onholdnotes,
      })
    );
  }

  useEffect(() => {
    formDataOnHold();
  }, [reasonforhold, authorizedby, onholdnotes, releasedate]);

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  const validationSchema = yup.object({
    reasonforhold: yup.string().required(),
    authorizedby: yup.string().required(),
    onholdnotes: yup.string().required(),
  });

  //tab check
  useEffect(() => {
    setReasonaForHold("");
    setAuthorizedBy("");
    setReleaseDate("");
    setOnHoldNotes("");
  }, [onHold, customerId, dataResetFlag]);

  //Tab Validation
  useEffect(() => {
    if (reasonforhold !== "" && authorizedby !== "" && onholdnotes !== "" && isReleaseDateValid) {
      dispatch(setOnHoldTab(true));
    } else {
      dispatch(setOnHoldTab(false));
    }
  }, [reasonforhold, authorizedby, onholdnotes, isReleaseDateValid]);

  let viewDetail = false;

  return (
    <Formik
      initialValues={{ reasonforhold, authorizedby, onholdnotes }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnMount
      initialTouched={{ reasonforhold: true, authorizedby: true, onholdnotes: true }}
      on={on}
    >
      {(formik) => (
        <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
          <div className="col-5">
            <Row>
              <Col>
                <Form.Group className="mt-3 form-group  align-items-center row  ms-2">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="customColFormLabel">
                      Reason For Hold
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className={`customFormControl  ${
                        viewDetail
                          ? "black"
                          : formik.errors.reasonforhold === undefined && reasonforhold != ""
                            ? "borderGreen"
                            : formik.errors.reasonforhold !== undefined && reasonforhold == ""
                              ? "borderRed"
                              : ""
                      }`}
                      id="reasonforhold"
                      name="reasonforhold"
                      type="search"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={reasonforhold}
                      onChange={(e) => setReasonaForHold(e.target.value)}
                      style={{
                        borderColor:
                          viewDetail === true
                            ? "black"
                            : formik.errors.reasonforhold === undefined && reasonforhold != ""
                              ? "green"
                              : formik.errors.reasonforhold !== undefined && reasonforhold == ""
                                ? "red"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mt-3 form-group  align-items-center row  ms-2">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="customColFormLabel">
                      Authorized By
                    </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className={`customFormControl  ${
                        viewDetail
                          ? "black"
                          : formik.errors.authorizedby === undefined && authorizedby != ""
                            ? "borderGreen"
                            : formik.errors.authorizedby !== undefined && authorizedby == ""
                              ? "borderRed"
                              : ""
                      }`}
                      id="authorizedby"
                      name="authorizedby"
                      type="search"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={authorizedby}
                      onChange={(e) => setAuthorizedBy(e.target.value)}
                      style={{
                        borderColor:
                          viewDetail === true
                            ? "black"
                            : formik.errors.authorizedby === undefined && authorizedby != ""
                              ? "green"
                              : formik.errors.authorizedby !== undefined && authorizedby == ""
                                ? "red"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mt-3 form-group  align-items-center row  ms-2">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="customColFormLabel">
                      Release Date
                    </Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
                    <DateInputField
                      date={releasedate}
                      setDate={setReleaseDate}
                      setIsDateValid={setIsReleaseDateValid}
                      className={isReleaseDateValid ? "" : "borderRed"}
                      min={new Date()}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mt-3 form-group  row  ms-2">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <Form.Label htmlFor="name" className="customColFormLabel">
                      Notes
                    </Form.Label>
                  </Col>

                  <Col xs={12} md={12} sm={12} className="p-0 mt-1">
                    <textarea
                      rows={10}
                      cols={70}
                      type="text"
                      className={`customFormControl h-335px  ${
                        viewDetail
                          ? "black"
                          : formik.errors.onholdnotes === undefined && onholdnotes != ""
                            ? "borderGreen"
                            : formik.errors.onholdnotes !== undefined && onholdnotes == ""
                              ? "borderRed"
                              : ""
                      }`}
                      id="onholdnotes"
                      name="onholdnotes"
                      value={onholdnotes}
                      onChange={(e) => setOnHoldNotes(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default OnHold;
