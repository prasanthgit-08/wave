import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import phoneExtension from "../../../../../utils/validation/PhoneExtension";
import numberValidation from "../../../../../utils/validation/NumberValidation";
import {
  setUnitOverWidthPermitsData,
  setOverWidthValidationFlag,
} from "../../../../../redux/OrderEntryFilterSlice";
import { useSelector } from "react-redux";

const OverWidth = ({ styles }) => {
  const [trailerOnly, setTrailerOnly] = useState(false);
  const [trailerOverhangs, setTrailerOverhangs] = useState(false);
  const [permitAmount, setPermitAmount] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [permitInvoiceNumber, setPermitInvoiceNumber] = useState("");
  const [trailerMake, setTrailerMake] = useState("");
  const [trailerVIN, setTrailerVIN] = useState("");
  const [trailerYear, setTrailerYear] = useState("");
  const [trailerAxles, setTrailerAxles] = useState("");
  const [axleSpreadFoot, setAxleSpreadFoot] = useState("");
  const [axleSpreadInch, setAxleSpreadInch] = useState("");
  const [trailerLengthFoot, setTrailerLengthFoot] = useState("");
  const [trailerLengthInch, setTrailerLengthInch] = useState("");
  const [trailerWidthFoot, setTrailerWidthFoot] = useState("");
  const [trailerWidthInch, setTrailerWidthInch] = useState("");
  const [trailerHeightFoot, setTrailerHeightFoot] = useState("");
  const [trailerHeightInch, setTrailerHeightInch] = useState("");
  const [trailerOverhangFoot, setTrailerOverhangFoot] = useState("");
  const [trailerOverhangInch, setTrailerOverhangInch] = useState("");
  const [boatMake, setBoatMake] = useState("");
  const [hullId, setHullId] = useState("");
  const [boatLengthFoot, setBoatLengthFoot] = useState("");
  const [boatLengthInch, setBoatLengthInch] = useState("");
  const [boatWidthFoot, setBoatWidthFoot] = useState("");
  const [boatWidthInch, setBoatWidthInch] = useState("");
  const [boatHeightFoot, setBoatHeightFoot] = useState("");
  const [boatHeightInch, setBoatHeightInch] = useState("");
  const [totalHeightFoot, setTotalHeightFoot] = useState("");
  const [totalHeightInch, setTotalHeightInch] = useState("");

  const [showTrailerInfoDiv, setShowTrailerInfoDiv] = useState(false);

  const [showBoatInfoDiv, setShowBoatInfoDiv] = useState(false);

  const current_year = new Date().getFullYear();

  const dispatch = useDispatch();
  const overWidthLoadFromRedux = useSelector((state) => state.orderEntryReducer.overWidthLoad);

  useEffect(() => {
    if (trailerOnly === true) {
      if (trailerOverhangs) {
      } else {
        //clear overhang info if overhang is unchecked
        clearTrailerHangInfo();
      }
      setShowTrailerInfoDiv(true);
      setShowBoatInfoDiv(false);
    } else {
      setShowTrailerInfoDiv(false);
      setShowBoatInfoDiv(true);
      setTrailerOverhangs(false);
    }
  }, [trailerOnly, trailerOverhangs]);

  useEffect(() => {
    dispatch(
      setUnitOverWidthPermitsData({
        trailerOnly: trailerOnly,
        trailerOverhangs: trailerOverhangs,
        permitAmount: permitAmount,
        invoiceAmount: invoiceAmount,
        permitInvoiceNumber: permitInvoiceNumber,
        trailerMake: trailerMake,
        trailerVIN: trailerVIN,
        trailerYear: trailerYear,
        trailerAxles: trailerAxles,
        axleSpreadFoot: axleSpreadFoot,
        axleSpreadInch: axleSpreadInch,
        trailerLengthFoot: trailerLengthFoot,
        trailerLengthInch: trailerLengthInch,
        trailerWidthFoot: trailerWidthFoot,
        trailerWidthInch: trailerWidthInch,
        trailerHeightFoot: trailerHeightFoot,
        trailerHeightInch: trailerHeightInch,
        trailerOverhangFoot: trailerOverhangFoot,
        trailerOverhangInch: trailerOverhangInch,
        boatMake: boatMake,
        hullId: hullId,
        boatLengthFoot: boatLengthFoot,
        boatLengthInch: boatLengthInch,
        boatWidthFoot: boatWidthFoot,
        boatWidthInch: boatWidthInch,
        boatHeightFoot: boatHeightFoot,
        boatHeightInch: boatHeightInch,
        totalHeightFoot: totalHeightFoot,
        totalHeightInch: totalHeightInch,
      })
    );
    let invoiceFlag = true;
    let trailerFlag = true;
    let boatFlag = true;

    if (invoiceAmount !== "" && permitInvoiceNumber === "") {
      invoiceFlag = false;
    }
    if (trailerOnly) {
      clearBoatInfo();
      if (
        trailerAxles &&
        axleSpreadFoot &&
        axleSpreadInch &&
        trailerLengthFoot &&
        trailerLengthInch &&
        trailerHeightFoot &&
        trailerHeightInch &&
        trailerMake &&
        trailerVIN &&
        trailerYear &&
        trailerYear?.length === 4 &&
        Number(trailerYear) > 1970 &&
        Number(trailerYear) < Number(current_year) + Number(2)
      ) {
        trailerFlag = true;
      } else {
        trailerFlag = false;
      }
      if (trailerOverhangs) {
        if (!(trailerOverhangFoot && trailerOverhangInch)) {
          trailerFlag = false;
        }
      }
    }
    if (!trailerOnly) {
      // clearTrailerInfo();
      clearTrailerHangInfo();
      if (
        boatMake &&
        hullId &&
        boatLengthFoot &&
        boatLengthInch &&
        boatWidthFoot &&
        boatWidthInch &&
        boatHeightFoot &&
        boatHeightInch &&
        totalHeightFoot &&
        totalHeightInch
      ) {
        boatFlag = true;
      } else {
        boatFlag = false;
      }
    }

    if (
      invoiceFlag &&
      trailerFlag &&
      boatFlag &&
      isValidDecimal(permitAmount) &&
      isValidDecimal(invoiceAmount)
    ) {
      dispatch(setOverWidthValidationFlag(true));
    } else {
      dispatch(setOverWidthValidationFlag(false));
    }
  }, [
    trailerOnly,
    trailerOverhangs,
    permitAmount,
    invoiceAmount,
    permitInvoiceNumber,
    trailerMake,
    trailerVIN,
    trailerYear,
    trailerAxles,
    axleSpreadFoot,
    axleSpreadInch,
    trailerLengthFoot,
    trailerLengthInch,
    trailerHeightFoot,
    trailerHeightInch,
    trailerOverhangFoot,
    trailerOverhangInch,
    boatMake,
    hullId,
    boatLengthFoot,
    boatLengthInch,
    boatWidthFoot,
    boatWidthInch,
    boatHeightFoot,
    boatHeightInch,
    totalHeightFoot,
    totalHeightInch,
  ]);

  //clearing the fields when the user selects a different unit type
  useEffect(() => {
    setTrailerOnly(false);
    setTrailerOverhangs(false);
    setPermitAmount("");
    setInvoiceAmount("");
    setPermitInvoiceNumber("");

    clearBoatInfo();
    clearTrailerInfo();
    clearTrailerHangInfo();
  }, [overWidthLoadFromRedux]);

  function clearTrailerHangInfo() {
    setTrailerOverhangFoot("");
    setTrailerOverhangInch("");
  }
  function clearBoatInfo() {
    setBoatMake("");
    setHullId("");
    setBoatLengthFoot("");
    setBoatLengthInch("");
    setBoatWidthFoot("");
    setBoatWidthInch("");
    setBoatHeightFoot("");
    setBoatHeightInch("");
    setTotalHeightFoot("");
    setTotalHeightInch("");
  }

  function clearTrailerInfo() {
    setTrailerMake("");
    setTrailerVIN("");
    setTrailerYear("");
    setTrailerAxles("");
    setAxleSpreadFoot("");
    setAxleSpreadInch("");
    setTrailerLengthFoot("");
    setTrailerLengthInch("");
    setTrailerWidthFoot("");
    setTrailerWidthInch("");
    setTrailerHeightFoot("");
    setTrailerHeightInch("");
    setTrailerOverhangFoot("");
    setTrailerOverhangInch("");
  }
  const minMaxCalculation = (value, min, max) => {
    if (!value) return value;

    const number = value.replace(/[^\d]/g, "");
    if (number > max) return max;
    else if (number < min) return min;
    else return number;
  };

  const isValidDecimal = (value) => {
    if (value === "" || value === "0") return true;

    // 1–5 digits with optional .xx  OR  leading dot with 1–2 digits
    const regexp = /^(?:\d{1,5}(?:\.\d{1,2})?|\.\d{1,2})$/;
    return regexp.test(value);
  };

  const yearValidation = (value, currentYear) => {
    const minYear = 1970;
    const maxYear = currentYear + 1;

    if (!value || value.length !== 4 || isNaN(value)) {
      return String(maxYear);
    }

    const year = Number(value);

    if (year < minYear) return String(minYear);
    if (year > maxYear) return String(maxYear);

    return String(year);
  };

  const handleInputValue = (e, setValue) => {
    let value = e.target.value;
    let indexOfDecimal = value.indexOf(".");

    if (value.length === 6 && indexOfDecimal === -1) {
      value = value.slice(0, 5) + "." + value.slice(5);
    } else if (indexOfDecimal === 5 && value.length === 6) {
    } else {
      value = value.replace(/[^\d\.]/g, "");
    }

    if (e.inputType === "deleteContentBackward" && value[indexOfDecimal - 1] === ".") {
      value = value.slice(0, indexOfDecimal - 1) + value.slice(indexOfDecimal);
      e.target.value = value;
      return;
    }

    e.target.value = value;
    setValue(e.target.value);
  };

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      {/* ROW 1 */}
      <Row>
        <Col sm={5} xs={5}>
          <div className="p-l-25 m-t-25">
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Trailer Only</Form.Label>
              </Col>
              <Col sm={1} xs={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="trailerOnly"
                  name="trailerOnly"
                  value={trailerOnly}
                  checked={trailerOnly}
                  onChange={(event) => {
                    setTrailerOnly(event.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Over Hanging Trailer</Form.Label>
              </Col>
              <Col sm={1} xs={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="overHangingTrailer"
                  name="overHangingTrailer"
                  value={trailerOverhangs}
                  checked={trailerOverhangs}
                  disabled={!trailerOnly}
                  onChange={(event) => {
                    setTrailerOverhangs(event.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Permit Charge</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className=" m-l-1" style={{ width: "90px" }}>
                <input
                  className={`customFormControl ${!isValidDecimal(permitAmount) ? "borderRed" : ""}`}
                  id="permitChange"
                  name="permitChange"
                  type="text"
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={permitAmount}
                  onChange={(e) => {
                    handleInputValue(e, setPermitAmount);
                    setPermitAmount(numberValidation(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Invoice Amount</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className=" m-l-1" style={{ width: "90px" }}>
                <input
                  className={`customFormControl ${!isValidDecimal(invoiceAmount) ? "borderRed" : ""}`}
                  id="invoiceAmount"
                  name="invoiceAmount"
                  type="text"
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={invoiceAmount}
                  onChange={(e) => {
                    handleInputValue(e, setInvoiceAmount);
                    setInvoiceAmount(numberValidation(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Invoice Number</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className=" m-l-1" style={{ width: "100px" }}>
                <input
                  className={`customFormControl ${
                    invoiceAmount ? (permitInvoiceNumber === "" ? "borderRed" : "borderGreen") : ""
                  }`}
                  id="invoiceNumber"
                  name="invoiceNumber"
                  type="text"
                  maxLength={10}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={permitInvoiceNumber}
                  onInput={(event) => {
                    setPermitInvoiceNumber(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </div>
        </Col>
      </Row>

      {/* ROW 2 */}
      <Row>
        <Col sm={5} xs={5}>
          {/* ROW 1 */}
          <div className="row p-l-35 mt-4">
            <Col sm={4} xs={4}>
              Trailer Information
            </Col>
          </div>
          {/* ROW 2 */}
          <div className="row p-l-25">
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Make</Form.Label>
              </Col>
              <Col sm={8} xs={8}>
                <input
                  className={`customFormControl ${trailerMake ? "borderGreen" : "borderRed"}`}
                  id="make"
                  name="make"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerMake}
                  onInput={(event) => {
                    setTrailerMake(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>VIN</Form.Label>
              </Col>
              <Col sm={6} xs={6}>
                <input
                  className={`customFormControl ${trailerVIN ? "borderGreen" : "borderRed"}`}
                  id="vin"
                  name="vin"
                  type="text"
                  maxLength={21}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerVIN}
                  onInput={(event) => {
                    setTrailerVIN(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Year</Form.Label>
              </Col>
              <Col sm={3} xs={3} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${
                    trailerYear &&
                    trailerYear?.length === 4 &&
                    Number(trailerYear) > 1969 &&
                    Number(trailerYear) < Number(current_year) + Number(2)
                      ? "borderGreen"
                      : "borderRed"
                  }`}
                  id="year"
                  name="year"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerYear}
                  onChange={(e) => {
                    // Only restrict to digits while typing
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) setTrailerYear(value);
                  }}
                  onBlur={(e) => {
                    // Validate only when user leaves the field
                    const validatedYear = yearValidation(e.target.value, new Date().getFullYear());
                    setTrailerYear(validatedYear);
                  }}
                />
              </Col>
            </Form.Group>
          </div>
          {/* ROW 3 */}
          <div className="row p-l-25">
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Trailer Axles</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${trailerAxles ? "borderGreen" : "borderRed"}`}
                  id="axles"
                  name="axles"
                  type="text"
                  maxLength={1}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerAxles}
                  onInput={(event) => {
                    setTrailerAxles(minMaxCalculation(event.target.value, 1, 9));
                  }}
                  style={{ borderColor: trailerAxles ? "green" : "red" }}
                />
              </Col>
              <Col></Col>
              <Col></Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Axle Spread</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${axleSpreadFoot ? "borderGreen" : "borderRed"}`}
                  id="spread"
                  name="spread"
                  type="number"
                  step="1"
                  min="1"
                  max="9"

                  autoComplete="off"
                  aria-autocomplete="list"
                  value={axleSpreadFoot}
                  onInput={(event) => {
                    setAxleSpreadFoot(minMaxCalculation(event.target.value, 1, 99));
                  }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${axleSpreadInch ? "borderGreen" : "borderRed"}`}
                  id="inches"
                  name="inches"

                  type="number"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={axleSpreadInch}
                  onInput={(event) => {
                    setAxleSpreadInch(minMaxCalculation(event.target.value, 0, 11));
                  }}
                  style={{ borderColor: axleSpreadInch ? "green" : "red" }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inches</Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Length</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${trailerLengthFoot ? "borderGreen" : "borderRed"}`}
                  id="feet1"
                  name="feet1"
                  type="number"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerLengthFoot}
                  onInput={(event) => {
                    setTrailerLengthFoot(minMaxCalculation(event.target.value, 1, 99));
                  }}
                  style={{ borderColor: trailerLengthFoot ? "green" : "red" }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${trailerLengthInch ? "borderGreen" : "borderRed"}`}
                  id="inch1"
                  name="inch1"
                  type="number"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerLengthInch}
                  onInput={(event) => {
                    setTrailerLengthInch(minMaxCalculation(event.target.value, 0, 11));
                  }}
                  style={{ borderColor: trailerLengthInch ? "green" : "red" }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Width</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${trailerWidthFoot ? "borderGreen" : "borderRed"}`}
                  id="feet2"
                  name="feet2"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerWidthFoot}
                  onInput={(event) => {
                    setTrailerWidthFoot(minMaxCalculation(event.target.value, 1, 99));
                  }}
                  style={{ borderColor: trailerWidthFoot ? "green" : "red" }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${trailerWidthInch ? "borderGreen" : "borderRed"}`}
                  id="inch2"
                  name="inch2"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerWidthInch}
                  onInput={(event) => {
                    setTrailerWidthInch(minMaxCalculation(event.target.value, 0, 11));
                  }}
                  style={{ borderColor: trailerWidthInch ? "green" : "red" }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Height</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${trailerHeightFoot ? "borderGreen" : "borderRed"}`}
                  id="feet3"
                  name="feet3"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerHeightFoot}
                  onInput={(event) => {
                    setTrailerHeightFoot(minMaxCalculation(event.target.value, 1, 99));
                  }}
                  style={{ borderColor: trailerHeightFoot ? "green" : "red" }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${trailerHeightInch ? "borderGreen" : "borderRed"}`}
                  id="inch3"
                  name="inch3"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerHeightInch}
                  onInput={(event) => {
                    setTrailerHeightInch(minMaxCalculation(event.target.value, 0, 11));
                  }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>
            {trailerOverhangs ? (
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={`customColFormLabel`}>Overhang</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${
                      trailerOverhangs ? (trailerOverhangFoot ? "borderGreen" : "borderRed") : ""
                    }`}
                    id="feet4"
                    name="feet4"
                    type="text"
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={trailerOverhangFoot}
                    disabled={!trailerOverhangs}
                    onInput={(event) => {
                      setTrailerOverhangFoot(minMaxCalculation(event.target.value, 1, 99));
                    }}
                    style={{ borderColor: trailerOverhangs ? (trailerOverhangFoot ? "green" : "red") : "" }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${
                      trailerOverhangs ? (trailerOverhangInch ? "borderGreen" : "borderRed") : ""
                    }`}
                    id="inch4"
                    name="inch4"
                    type="text"
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={trailerOverhangInch}
                    disabled={!trailerOverhangs}
                    onInput={(event) => {
                      setTrailerOverhangInch(minMaxCalculation(event.target.value, 0, 11));
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col sm={5} xs={5} className={trailerOnly ? "hide-elements" : ""}>
          {/* ROW 1 */}
          <div className="row p-l-35 mt-4">
            <Col sm={4} xs={4}>
              Boat Information
            </Col>
          </div>
          {/* ROW 2 */}
          {showBoatInfoDiv && (
            <div className="row p-l-25">
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={`customColFormLabel`}>Make</Form.Label>
                </Col>
                <Col sm={8} xs={8}>
                  <input
                    className={`customFormControl ${boatMake ? "borderGreen" : "borderRed"}`}
                    id="make2"
                    name="make2"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={boatMake}
                    onInput={(event) => {
                      setBoatMake(event.target.value);
                    }}
                    style={{ borderColor: boatMake ? "green" : "red" }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={`customColFormLabel`}>Hull ID</Form.Label>
                </Col>
                <Col sm={6} xs={6}>
                  <input
                    className={`customFormControl ${hullId ? "borderGreen" : "borderRed"}`}
                    id="hullId"
                    name="hullId"
                    type="text"
                    maxLength={20}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={hullId}
                    onInput={(event) => {
                      setHullId(event.target.value);
                    }}
                    style={{ borderColor: hullId ? "green" : "red" }}
                  />
                </Col>
              </Form.Group>
            </div>
          )}
          {/* ROW 3 */}
          {showBoatInfoDiv && (
            <div className="row p-l-25">
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={`customColFormLabel`}>Length</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${boatLengthFoot ? "borderGreen" : "borderRed"}`}
                    id="spread"
                    name="spread"
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={boatLengthFoot}
                    onInput={(event) => {
                      setBoatLengthFoot(minMaxCalculation(event.target.value, 1, 99));
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${boatLengthInch ? "borderGreen" : "borderRed"}`}
                    id="spread"
                    name="spread"
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={boatLengthInch}
                    onInput={(event) => {
                      setBoatLengthInch(minMaxCalculation(event.target.value, 0, 11));
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={`customColFormLabel`}>Width</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${boatWidthFoot ? "borderGreen" : "borderRed"}`}
                    id="spread"
                    name="spread"
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={boatWidthFoot}
                    onInput={(event) => {
                      setBoatWidthFoot(minMaxCalculation(event.target.value, 1, 99));
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${boatWidthInch ? "borderGreen" : "borderRed"}`}
                    id="spread"
                    name="spread"
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={boatWidthInch}
                    onInput={(event) => {
                      setBoatWidthInch(minMaxCalculation(event.target.value, 0, 11));
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={`customColFormLabel`}>Height</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${boatHeightFoot ? "borderGreen" : "borderRed"}`}
                    id="spread"
                    name="spread"
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={boatHeightFoot}
                    onInput={(event) => {
                      setBoatHeightFoot(minMaxCalculation(event.target.value, 1, 99));
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${boatHeightInch ? "borderGreen" : "borderRed"}`}
                    id="spread"
                    name="spread"
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={boatHeightInch}
                    onInput={(event) => {
                      setBoatHeightInch(minMaxCalculation(event.target.value, 0, 11));
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={`customColFormLabel`}>Total Height</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${totalHeightFoot ? "borderGreen" : "borderRed"}`}
                    id="spread"
                    name="spread"
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={totalHeightFoot}
                    onInput={(event) => {
                      setTotalHeightFoot(minMaxCalculation(event.target.value, 1, 99));
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className={`customFormControl ${totalHeightInch ? "borderGreen" : "borderRed"}`}
                    id="spread"
                    name="spread"
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={totalHeightInch}
                    onInput={(event) => {
                      setTotalHeightInch(minMaxCalculation(event.target.value, 0, 11));
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OverWidth;
