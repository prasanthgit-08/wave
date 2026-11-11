import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDealer, setPickPhone } from "../../../../../redux/EditDealerSlice";
import { Form, Col, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import FormikController from "../../../../../utils/validation/FormikController";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";

function PickupTab() {
  const [sundayPickup, setSundayPickup] = useState(false);
  const [mondayPickup, setMondayPickup] = useState(false);
  const [tuesdayPickup, setTuesdayPickup] = useState(false);
  const [wednesdayPickup, setWednesdayPickup] = useState(false);
  const [thursdayPickup, setThursdayPickup] = useState(false);
  const [fridayPickup, setFridayPickup] = useState(false);
  const [saturdayPickup, setSaturdayPickup] = useState(false);
  const [pickupContact, setPickupContact] = useState("");
  const [pickupContactPhone, setPickupContactPhone] = useState("");
  const [pickupContactEmail, setPickupContactEmail] = useState("");
  const [pickupAddress1, setPickupAddress1] = useState("");
  const [pickupAddress2, setPickupAddress2] = useState("");
  const [pickupHours, setPickupHours] = useState("");
  const [pickupNotes, setPickupNotes] = useState("");
  const [atleastOneCheckPickupDate, setAtleastOneCheckPickupDate] = useState(true);

  const dealerData = useSelector((state) => state.editDealerReducer.dealerData);
  let viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);
  useEffect(() => {
    if (dealerData != null) {
      setSundayPickup(dealerData.sundayPickup);
      setMondayPickup(dealerData.mondayPickup);
      setTuesdayPickup(dealerData.tuesdayPickup);
      setWednesdayPickup(dealerData.wednesdayPickup);
      setThursdayPickup(dealerData.thursdayPickup);
      setFridayPickup(dealerData.fridayPickup);
      setSaturdayPickup(dealerData.saturdayPickup);
      setPickupContact(dealerData.pickupContact !== null ? dealerData.pickupContact?.trim() : "");
      if (null != dealerData.pickupContactPhone) {
        setPickupContactPhone(formatPhoneNumber(dealerData.pickupContactPhone));
      } else {
        setPickupContactPhone("");
      }
      setPickupContactEmail(
        dealerData.pickupContactEmail != null ? dealerData.pickupContactEmail?.trim() : ""
      );
      setPickupAddress1(dealerData.pickupAddress1 != null ? dealerData.pickupAddress1?.trim() : "");
      setPickupAddress2(dealerData.pickupAddress2 != null ? dealerData.pickupAddress2?.trim() : "");
      setPickupHours(dealerData.pickupHours != null ? dealerData.pickupHours?.trim() : "");
      setPickupNotes(dealerData.pickupNotes != null ? dealerData.pickupNotes?.trim() : "");
    }
  }, [dealerData, viewDetail]);

  useEffect(() => {
    pickupTabFormData();
  }, [
    sundayPickup,
    mondayPickup,
    tuesdayPickup,
    wednesdayPickup,
    thursdayPickup,
    fridayPickup,
    saturdayPickup,
    pickupContact,
    pickupContactPhone,
    pickupContactEmail,
    pickupAddress1,
    pickupAddress2,
    pickupHours,
    pickupNotes,
    atleastOneCheckPickupDate,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPickPhone(pickupContactPhone));
  }, [pickupContactPhone]);

  const pickupTabFormData = () => {
    dispatch(
      setDealer({
        sundayPickup: sundayPickup,
        mondayPickup: mondayPickup,
        tuesdayPickup: tuesdayPickup,
        wednesdayPickup: wednesdayPickup,
        thursdayPickup: thursdayPickup,
        fridayPickup: fridayPickup,
        saturdayPickup: saturdayPickup,
        pickupContact: pickupContact,
        pickupContactPhone: pickupContactPhone?.replace(/\s+/g, ""),
        pickupContactEmail: pickupContactEmail,
        pickupAddress1: pickupAddress1,
        pickupAddress2: pickupAddress2,
        pickupHours: pickupHours,
        pickupNotes: pickupNotes,
        atleastOneCheckPickupDate,
      })
    );
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    pickupContactPhone: yup.string().matches(phoneRegex),
  });

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPickupContactPhone(formattedPhoneNumber);
  };

  const handlePhoneKeyDown = (e) => {
    const input = e.target;

    // Backspace key
    if (e.key === "Backspace") {
      const cursorPosition = input.selectionStart;

      // If cursor is NOT at the end
      if (cursorPosition !== input.value.length) {
        e.preventDefault();

        // Move cursor to end
        setTimeout(() => {
          input.setSelectionRange(input.value.length, input.value.length);
        }, 0);
      }
    }
  };

  useEffect(() => {
    // hide error message when validation is true
    if (
      sundayPickup ||
      mondayPickup ||
      tuesdayPickup ||
      wednesdayPickup ||
      thursdayPickup ||
      fridayPickup ||
      saturdayPickup
    ) {
      setAtleastOneCheckPickupDate(false);
    } else {
      setAtleastOneCheckPickupDate(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sundayPickup,
    mondayPickup,
    tuesdayPickup,
    wednesdayPickup,
    thursdayPickup,
    fridayPickup,
    saturdayPickup,
  ]);

  return (
    <Formik
      initialValues={{ pickupContactPhone }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      initialTouched={{ pickupContactPhone: true }}
    >
      {(formik) => (
        <div className="p-2 w-100">
          <Row className="m-0 p-0">
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Pickup Address</Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    name="ad1"
                    value={pickupAddress1}
                    onBeforeInput={(e) => {
                      if (e.data === " " && e.target.value?.trim().length === 0) {
                        e.preventDefault();
                      }
                    }}
                    maxLength={30}
                    disabled={viewDetail}
                    autoComplete="one-time-code"
                    aria-autocomplete="list"
                    onInput={(e) => setPickupAddress1(e.target.value)}
                    spellCheck={false}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    name="ad2"
                    value={pickupAddress2}
                    onBeforeInput={(e) => {
                      if (e.data === " " && e.target.value?.trim().length === 0) {
                        e.preventDefault();
                      }
                    }}
                    maxLength={30}
                    disabled={viewDetail}
                    autoComplete="one-time-code"
                    aria-autocomplete="list"
                    onInput={(e) => setPickupAddress2(e.target.value)}
                    spellCheck={false}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-5 align-items-center row  m-l-0 m-r-0">
                <Col xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Pickup Contact</Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    type="text"
                    className={"customFormControl"}
                    name="pickupContact"
                    maxLength={30}
                    value={pickupContact}
                    disabled={viewDetail}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => setPickupContact(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Pickup Phone</Form.Label>
                </Col>
                <Col xs={4} md={3} sm={4} className="p-0" style={{ width: "110px" }}>
                  <input
                    type="pickupContactPhone"
                    className={`customFormControl ${
                      viewDetail === true
                        ? ""
                        : formik.errors.pickupContactPhone === undefined &&
                            pickupContactPhone != null &&
                            pickupContactPhone.length > 1
                          ? ""
                          : formik.errors.pickupContactPhone !== undefined
                            ? "borderRed"
                            : ""
                    }`}
                    onKeyDown={handlePhoneKeyDown} // 👉 Add this

                    onBeforeInput={(e) => {
                      if (e.data && /\D/.test(e.data)) {
                        e.preventDefault();
                      }
                    }}
                    name="pickupContactPhone"
                    maxLength={14}
                    value={pickupContactPhone}
                    disabled={viewDetail}
                    onChange={phoneFormatHandler}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => {
                      formik.handleChange(e);
                      setPickupContactPhone(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-5 row  m-l-0 m-r-0">
                <Col xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    Days Dealers Is Open For Pickup
                  </Form.Label>
                </Col>

                <Col xs={6} sm={4} className="p-0">
                  <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                    <Form.Check.Input
                      className={`form-check-input ${
                        !viewDetail
                          ? sundayPickup
                            ? "borderGreen"
                            : !sundayPickup &&
                                !mondayPickup &&
                                !tuesdayPickup &&
                                !wednesdayPickup &&
                                !thursdayPickup &&
                                !fridayPickup &&
                                !saturdayPickup
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      type="checkbox"
                      name="sundayPickup"
                      value={sundayPickup}
                      checked={sundayPickup}
                      disabled={viewDetail}
                      onChange={(e) => setSundayPickup(e.target.checked)}
                    />
                    <span className="ps-2">Sunday</span>
                  </Form.Check>

                  <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                    <Form.Check.Input
                      className={`form-check-input ${
                        !viewDetail
                          ? mondayPickup
                            ? "borderGreen"
                            : !sundayPickup &&
                                !mondayPickup &&
                                !tuesdayPickup &&
                                !wednesdayPickup &&
                                !thursdayPickup &&
                                !fridayPickup &&
                                !saturdayPickup
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      type="checkbox"
                      name="mondayPickup"
                      disabled={viewDetail}
                      checked={mondayPickup}
                      value={mondayPickup}
                      onChange={(e) => setMondayPickup(e.target.checked)}
                    />
                    <span className="ps-2">Monday</span>
                  </Form.Check>

                  <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                    <Form.Check.Input
                      className={`form-check-input ${
                        !viewDetail
                          ? tuesdayPickup
                            ? "borderGreen"
                            : !sundayPickup &&
                                !mondayPickup &&
                                !tuesdayPickup &&
                                !wednesdayPickup &&
                                !thursdayPickup &&
                                !fridayPickup &&
                                !saturdayPickup
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      type="checkbox"
                      name="tuesdayPickup"
                      disabled={viewDetail}
                      checked={tuesdayPickup}
                      value={tuesdayPickup}
                      onChange={(e) => setTuesdayPickup(e.target.checked)}
                    />
                    <span className="ps-2">Tuesday</span>
                  </Form.Check>

                  <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                    <Form.Check.Input
                      className={`form-check-input ${
                        !viewDetail
                          ? wednesdayPickup
                            ? "borderGreen"
                            : !sundayPickup &&
                                !mondayPickup &&
                                !tuesdayPickup &&
                                !wednesdayPickup &&
                                !thursdayPickup &&
                                !fridayPickup &&
                                !saturdayPickup
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      type="checkbox"
                      name="wednesdayPickup"
                      disabled={viewDetail}
                      checked={wednesdayPickup}
                      value={wednesdayPickup}
                      onChange={(e) => setWednesdayPickup(e.target.checked)}
                    />
                    <span className="ps-2">Wednesday</span>
                  </Form.Check>

                  <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                    <Form.Check.Input
                      className={`form-check-input ${
                        !viewDetail
                          ? thursdayPickup
                            ? "borderGreen"
                            : !sundayPickup &&
                                !mondayPickup &&
                                !tuesdayPickup &&
                                !wednesdayPickup &&
                                !thursdayPickup &&
                                !fridayPickup &&
                                !saturdayPickup
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      type="checkbox"
                      name="thursdayPickup"
                      disabled={viewDetail}
                      checked={thursdayPickup}
                      value={thursdayPickup}
                      onChange={(e) => setThursdayPickup(e.target.checked)}
                    />
                    <span className="ps-2">Thursday</span>
                  </Form.Check>

                  <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                    <Form.Check.Input
                      className={`form-check-input ${
                        !viewDetail
                          ? fridayPickup
                            ? "borderGreen"
                            : !sundayPickup &&
                                !mondayPickup &&
                                !tuesdayPickup &&
                                !wednesdayPickup &&
                                !thursdayPickup &&
                                !fridayPickup &&
                                !saturdayPickup
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      type="checkbox"
                      name="fridayPickup"
                      disabled={viewDetail}
                      checked={fridayPickup}
                      value={fridayPickup}
                      onChange={(e) => setFridayPickup(e.target.checked)}
                    />
                    <span className="ps-2">Friday</span>
                  </Form.Check>

                  <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                    <Form.Check.Input
                      className={`form-check-input ${
                        !viewDetail
                          ? saturdayPickup
                            ? "borderGreen"
                            : !sundayPickup &&
                                !mondayPickup &&
                                !tuesdayPickup &&
                                !wednesdayPickup &&
                                !thursdayPickup &&
                                !fridayPickup &&
                                !saturdayPickup
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      type="checkbox"
                      name="saturdayPickup"
                      disabled={viewDetail}
                      checked={saturdayPickup}
                      value={saturdayPickup}
                      onChange={(e) => setSaturdayPickup(e.target.checked)}
                    />
                    <span className="ps-2">Saturday</span>
                  </Form.Check>
                  {/* <Row className={`${!viewDetail && atleastOneCheckPickupDate ? "" : "hide-elements"}`}>
                  <Col >
                    <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                      Select at least One day
                    </p>
                  </Col>
                </Row> */}
                </Col>
              </Form.Group>
            </Col>

            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              <Form.Group className="form-group mt-4  align-items-center row  m-l-0 m-r-0">
                <Col xs={12} sm={10} className="p-0">
                  <label className="col-form-label dealer-label p-0 m-b-10">
                    Additional Text Added To Drivers Confirmation Email For Pickup Hours
                  </label>
                </Col>
                <Col sm={10} xs={12} className="p-0">
                  <textarea
                    rows={10}
                    cols={20}
                    style={{
                      resize: "none",
                      display: "fixed",
                      minHeight: "210px",
                      minWidth: "500px",
                      boxShadow: "none",
                      fontSize: "12px",
                    }}
                    onBeforeInput={(e) => {
                      if (e.data === " " && e.target.value?.trim().length === 0) {
                        e.preventDefault();
                      }
                    }}
                    type="text"
                    className="customFormControl h-100 textarea-height "
                    name="pickupHours"
                    value={pickupHours}
                    disabled={viewDetail}
                    onInput={(e) => setPickupHours(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-4 align-items-center row  m-l-0 m-r-0">
                <Col xs={12} sm={10} className="p-0">
                  <label className="col-form-label dealer-label p-0 m-b-10">
                    Text Added To Drivers Confirmation Email For Pickup Information
                  </label>
                </Col>
                <Col sm={10} xs={12} className="p-0">
                  <textarea
                    rows={10}
                    cols={20}
                    style={{
                      resize: "none",
                      display: "fixed",
                      minHeight: "210px",
                      minWidth: "500px",
                      boxShadow: "none",
                      fontSize: "12px",
                    }}
                    type="text"
                    className="customFormControl h-100 textarea-height "
                    name="pickupNotes"
                    value={pickupNotes}
                    disabled={viewDetail}
                    onInput={(e) => setPickupNotes(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </div>
      )}
    </Formik>
  );
}

export default PickupTab;
