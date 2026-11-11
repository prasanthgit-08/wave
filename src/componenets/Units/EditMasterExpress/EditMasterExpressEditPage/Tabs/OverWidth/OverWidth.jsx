import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import numberValidation from "../../../../../../utils/validation/NumberValidation";
import {
  setIsOverWidthTabValid,
  setUnitOverWidthData,
  setEditedUnitDataToSaveForOverWidthTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const OverWidth = ({ styles }) => {
  //Local States

  const [unitOverWidthPermitPK, setUnitOverWidthPermitPK] = useState("");
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
  const [updated, setUpdated] = useState(false);
  const [showBoatInfoDiv, setShowBoatInfoDiv] = useState(false);
  const dispatch = useDispatch();
  //Global states
  const overWidthLoadFromSclice = useSelector((state) => state.editMasterExpressTabsReducer.overWidthLoad);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);

  useEffect(() => {
    if (trailerOnly === true) {
      if (trailerOverhangs) {
      } else {
        //clear overhang info if overhang is unchecked
        clearTrailerHangInfo();
      }
      setShowBoatInfoDiv(false);
    } else {
      setShowBoatInfoDiv(true);
      setTrailerOverhangs(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trailerOnly, trailerOverhangs]);

  useEffect(() => {
    dispatch(
      setUnitOverWidthData({
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
        trailerHeightFoot: trailerHeightFoot,
        trailerHeightInch: trailerHeightInch,
        trailerOverhangFoot: trailerOverhangFoot,
        trailerOverhangInch: trailerOverhangInch,
        boatMake: boatMake,
        hullId: hullId || "",
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

    if (invoiceAmount && invoiceAmount > 0 && permitInvoiceNumber === "") {
      invoiceFlag = false;
    }

    if (
      trailerAxles &&
      axleSpreadFoot &&
      axleSpreadFoot > 0 &&
      axleSpreadInch !== null &&
      axleSpreadInch !== undefined &&
      axleSpreadInch !== "" &&
      axleSpreadInch >= 0 &&
      trailerLengthFoot &&
      trailerLengthFoot > 0 &&
      trailerWidthFoot &&
      trailerLengthInch !== null &&
      trailerLengthInch !== undefined &&
      trailerLengthInch !== "" &&
      trailerLengthInch >= 0 &&
      trailerHeightInch !== null &&
      trailerHeightInch !== undefined &&
      trailerHeightInch !== "" &&
      trailerHeightInch >= 0 &&
      trailerWidthInch !== null &&
      trailerWidthInch !== undefined &&
      trailerWidthInch !== "" &&
      trailerWidthInch >= 0 &&
      trailerHeightFoot &&
      trailerHeightFoot > 0 &&
      trailerMake &&
      trailerVIN &&
      trailerYear &&
      trailerYear >= 1900 &&
      trailerYear <= 2100
    ) {
      trailerFlag = true;
    } else {
      trailerFlag = false;
    }
    if (trailerOverhangs) {
      if (!(
        trailerOverhangFoot &&
        trailerOverhangInch >= 0 &&
        trailerOverhangInch !== undefined &&
        trailerOverhangInch !== ""
      )) {
        trailerFlag = false;
      }
    }
    if (!trailerOnly) {
      if (
        boatMake &&
        hullId &&
        boatLengthFoot &&
        boatLengthFoot >= 0 &&
        boatLengthInch !== null &&
        boatLengthInch !== undefined &&
        boatLengthInch !== "" &&
        boatLengthInch >= 0 &&
        boatWidthFoot &&
        boatWidthFoot >= 0 &&
        boatWidthInch !== null &&
        boatWidthInch !== undefined &&
        boatWidthInch !== "" &&
        boatHeightFoot &&
        boatHeightFoot >= 0 &&
        boatHeightInch >= 0 &&
        boatHeightInch !== undefined &&
        boatHeightInch !== "" &&
        totalHeightFoot &&
        totalHeightFoot >= 0 &&
        totalHeightInch >= 0 &&
        totalHeightInch !== undefined &&
        totalHeightInch !== ""
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
      !/^\d*\.$/.test(permitAmount) &&
      !/^\d*\.$/.test(invoiceAmount) &&
      !/^\d*\.$/.test(permitInvoiceNumber)
    ) {
      dispatch(setIsOverWidthTabValid(true));
    } else {
      dispatch(setIsOverWidthTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    trailerWidthFoot,
    trailerWidthInch,
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

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setUnitOverWidthPermitPK(
        selectedUnitData?.editMasterExpressOverWidthTabDTO?.unitOverWidthPermitPK || ""
      );
      setTrailerOnly(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerOnly || false);
      setTrailerOverhangs(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerOverhangs || false);
      setPermitAmount(selectedUnitData?.editMasterExpressOverWidthTabDTO?.permitAmount || 0);
      setInvoiceAmount(selectedUnitData?.editMasterExpressOverWidthTabDTO?.invoiceAmount || 0);
      setPermitInvoiceNumber(
        selectedUnitData?.editMasterExpressOverWidthTabDTO?.permitInvoiceNumber?.trim() || ""
      );
      setTrailerMake(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerMake?.trim() || "");
      setTrailerVIN(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerVIN?.trim() || "");
      setTrailerYear(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerYear?.trim() || "");
      setTrailerAxles(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerAxles || 0);
      setAxleSpreadFoot(selectedUnitData?.editMasterExpressOverWidthTabDTO?.axleSpreadFoot || 0);
      setAxleSpreadInch(selectedUnitData?.editMasterExpressOverWidthTabDTO?.axleSpreadInch || 0);
      setTrailerLengthFoot(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerLengthFoot || 0);
      setTrailerLengthInch(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerLengthInch || 0);
      setTrailerWidthFoot(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerWidthFoot || 0);
      setTrailerWidthInch(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerWidthInch || 0);
      setTrailerHeightFoot(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerHeightFoot || 0);
      setTrailerHeightInch(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerHeightInch || 0);
      setTrailerOverhangFoot(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerOverhangFoot || "");
      setTrailerOverhangInch(selectedUnitData?.editMasterExpressOverWidthTabDTO?.trailerOverhangInch || 0);
      setBoatMake(selectedUnitData?.editMasterExpressOverWidthTabDTO?.boatMake?.trim() || "");
      setHullId(selectedUnitData?.editMasterExpressOverWidthTabDTO?.hullId?.trim() || "");
      setBoatLengthFoot(selectedUnitData?.editMasterExpressOverWidthTabDTO?.boatLengthFoot || "");
      setBoatLengthInch(selectedUnitData?.editMasterExpressOverWidthTabDTO?.boatLengthInch || "");
      setBoatWidthFoot(selectedUnitData?.editMasterExpressOverWidthTabDTO?.boatWidthFoot || "");
      setBoatWidthInch(selectedUnitData?.editMasterExpressOverWidthTabDTO?.boatWidthInch || "");
      setBoatHeightFoot(selectedUnitData?.editMasterExpressOverWidthTabDTO?.boatHeightFoot || "");
      setBoatHeightInch(selectedUnitData?.editMasterExpressOverWidthTabDTO?.boatHeightInch || "");
      setTotalHeightFoot(selectedUnitData?.editMasterExpressOverWidthTabDTO?.totalHeightFoot || "");
      setTotalHeightInch(selectedUnitData?.editMasterExpressOverWidthTabDTO?.totalHeightInch || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitData, viewDetail]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  useEffect(() => {
    dispatch(
      setEditedUnitDataToSaveForOverWidthTab({
        unitOverWidthPermitPK: unitOverWidthPermitPK,
        trailerOnly: trailerOnly || false,
        trailerOverhangs: trailerOverhangs || false,
        permitAmount: permitAmount || Number(0),
        invoiceAmount: invoiceAmount || Number(0),
        permitInvoiceNumber: permitInvoiceNumber,
        trailerMake: trailerMake || Number(0),
        trailerVIN: trailerVIN || Number(0),
        trailerYear: trailerYear || Number(0),
        trailerAxles: trailerAxles || Number(0),
        axleSpreadFoot: axleSpreadFoot || Number(0),
        axleSpreadInch: axleSpreadInch || Number(0),
        trailerLengthFoot: trailerLengthFoot || Number(0),
        trailerLengthInch: trailerLengthInch || Number(0),
        trailerHeightFoot: trailerHeightFoot || Number(0),
        trailerHeightInch: trailerHeightInch || Number(0),
        trailerWidthFoot: trailerWidthFoot || Number(0),
        trailerWidthInch: trailerWidthInch || Number(0),
        trailerOverhangFoot: trailerOverhangFoot || Number(0),
        trailerOverhangInch: trailerOverhangInch || Number(0),
        boatMake: boatMake,
        hullId: hullId || Number(0),
        boatLengthFoot: boatLengthFoot || Number(0),
        boatLengthInch: boatLengthInch || Number(0),
        boatWidthFoot: boatWidthFoot || Number(0),
        boatWidthInch: boatWidthInch || Number(0),
        boatHeightFoot: boatHeightFoot || Number(0),
        boatHeightInch: boatHeightInch || Number(0),
        totalHeightFoot: totalHeightFoot || Number(0),
        totalHeightInch: totalHeightInch || Number(0),
        updated: updated,
      })
    );
  }, [
    unitOverWidthPermitPK,
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
    trailerWidthInch,
    trailerWidthFoot,
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
  }, [overWidthLoadFromSclice]);

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
  /* const yearValidation = (value, min) => {
    if (!value) return value;

    const year = value.replace(/[^\d]/g, "");
    if (value !== null && value !== "undefined" && value !== "" && value.length === 4) {
      var current_year = new Date().getFullYear();
      if (year < min || year > current_year) {
        return min;
      } else {
        console.log(" in else year ", year);
        return year;
      }
    } else return year;
  }; */
  const yearValidation = (value, currentYear) => {
    const minYear = 1900;
    const maxYear = currentYear + 1;

    if (!value || value.length !== 4 || isNaN(value)) {
      return String(maxYear);
    }

    const year = Number(value);

    if (year < minYear) return String(minYear);
    if (year > maxYear) return String(maxYear);

    return String(year);
  };

  return (
    <div className={` mb-0`}>
      {/* ROW 1 */}
      <Row>
        <Col sm={5} xs={5}>
          <div className="p-l-25 mt-3">
            {/* ********************* */}
            {/*  Trailer Only */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={` customColFormLabel`}>Trailer Only</Form.Label>
              </Col>
              <Col sm={1} xs={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="trailerOnly"
                  name="trailerOnly"
                  value={trailerOnly}
                  checked={trailerOnly}
                  disabled={viewDetail}
                  onChange={(event) => {
                    setUpdated(true);
                    setTrailerOnly(event.target.checked);
                    if (event.target.checked) {
                      clearBoatInfo();
                    }
                  }}
                />
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*  Over Hanging Trailer */}

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
                  disabled={viewDetail || !trailerOnly}
                  onChange={(event) => {
                    setUpdated(true);
                    setTrailerOverhangs(event.target.checked);
                  }}
                />
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*  Permit Charge */}

            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Permit Charge</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="m-l-1" style={{ width: "83px" }}>
                <input
                  className={`customFormControl ${
                    !viewDetail &&
                    (parseFloat(permitAmount) < 0 || permitAmount === "." || /^\d*\.$/.test(permitAmount)
                      ? "borderRed"
                      : "")
                  }`}
                  id="permitChange"
                  name="permitChange"
                  value={permitAmount}
                  disabled={viewDetail}
                  type="text"
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === "" || /^\d{0,5}(\.\d{0,2})?$/.test(value)) {
                      setUpdated(true);
                      setPermitAmount(value);
                    }
                  }}
                />
              </Col>
            </Form.Group>

            {/* ********************* */}
            {/*  Invoice Amount */}

            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Invoice Amount</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="m-l-1" style={{ width: "83px" }}>
                <input
                  className={`customFormControl ${
                    !viewDetail &&
                    (parseFloat(invoiceAmount) < 0 || invoiceAmount === "." || /^\d*\.$/.test(invoiceAmount)
                      ? "borderRed"
                      : "")
                  }`}
                  id="invoiceAmount"
                  name="invoiceAmount"
                  value={invoiceAmount}
                  disabled={viewDetail}
                  type="text"
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === "" || /^\d{0,5}(\.\d{0,2})?$/.test(value)) {
                      setUpdated(true);
                      setInvoiceAmount(value);
                    }
                  }}
                />
              </Col>
            </Form.Group>

            {/* ********************* */}
            {/*  Invoice Number */}

            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Invoice Number</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={2} className="m-l-1" style={{ width: "100px" }}>
                <input
                  className={`customFormControl ${
                    !viewDetail
                      ? parseFloat(permitInvoiceNumber) < 0 ||
                        permitInvoiceNumber === "." ||
                        /^\d*\.$/.test(permitInvoiceNumber)
                        ? "borderRed"
                        : invoiceAmount && invoiceAmount > 0
                          ? permitInvoiceNumber === ""
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      : ""
                  }`}
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={permitInvoiceNumber}
                  disabled={viewDetail}
                  type="text"
                  maxLength={10}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(event) => {
                    setUpdated(true);
                    let value = event.target.value?.trim();
                    setPermitInvoiceNumber(value);

                    // }
                  }}
                />
              </Col>
            </Form.Group>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={5} xs={5}>
          <div className="row p-l-35 mt-4">
            <Col sm={4} xs={4}>
              Trailer Information
            </Col>
          </div>

          <div className="row p-l-25">
            {/* ********************* */}
            {/*   Make */}
            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Make</Form.Label>
              </Col>
              <Col xs={8}>
                <input
                  className={`customFormControl ${
                    viewDetail ? "" : trailerMake ? "borderGreen" : "borderRed"
                  }`}
                  id="make"
                  name="make"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerMake}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    const input = event.target.value;
                    // Remove any leading spaces
                    if (input.startsWith(" ") || input.startsWith(".")) {
                      setTrailerMake(input.replace(/^[ .]+/, "")); // Removes leading spaces and dots
                    } else {
                      setTrailerMake(input);
                    }
                  }}
                />
              </Col>
            </Form.Group>

            {/* ********************* */}
            {/*  VIN */}

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>VIN</Form.Label>
              </Col>
              <Col xs={6}>
                <input
                  className={`customFormControl ${viewDetail ? "" : trailerVIN ? "borderGreen" : "borderRed"}`}
                  id="vin"
                  name="vin"
                  type="text"
                  maxLength={21}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerVIN}
                  disabled={viewDetail}
                  onInput={(event) => {
                    const input = event.target.value;
                    setUpdated(true);
                    if (input.startsWith(" ") || input.startsWith(".")) {
                      setTrailerVIN(input.replace(/^[ .]+/, "")); // Removes leading spaces and dots
                    } else {
                      setTrailerVIN(input);
                    }
                  }}
                />
              </Col>
            </Form.Group>

            {/* ********************* */}
            {/*   Year */}

            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Year</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className={`customFormControl ${
                    viewDetail
                      ? ""
                      : trailerYear && trailerYear >= 1900 && trailerYear <= 2100
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
                  disabled={viewDetail}
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
          <div className="row p-l-25">
            {/* ********************* */}
            {/*   Trailer Axles */}

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Trailer Axles</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "90px" }} /* className="p-r-0" */>
                <input
                  className={`customFormControl ${
                    viewDetail ? "" : trailerAxles ? "borderGreen" : "borderRed"
                  }`}
                  id="axles"
                  name="axles"
                  type="text"
                  maxLength={1}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerAxles}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    setTrailerAxles(minMaxCalculation(event.target.value, 1, 9));
                  }}
                  style={{
                    borderColor: viewDetail ? "" : trailerAxles ? "green" : "red",
                  }}
                />
              </Col>
              <Col></Col>
              <Col></Col>
            </Form.Group>

            {/* ********************* */}
            {/*   Axle Spread */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Axle Spread</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "90px" }} /* className="p-r-0" */>
                <input
                  className={`customFormControl ${
                    viewDetail ? "" : axleSpreadFoot ? "borderGreen" : "borderRed"
                  }`}
                  id="spread"
                  name="spread"
                  type="text"
                  step="1"
                  min="1"
                  max="9"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={axleSpreadFoot}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    setAxleSpreadFoot(minMaxCalculation(event.target.value, 1, 99));
                  }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "90px" }}>
                <input
                  className={`customFormControl ${
                    viewDetail
                      ? ""
                      : axleSpreadInch !== null &&
                          axleSpreadInch !== undefined &&
                          axleSpreadInch !== "" &&
                          axleSpreadInch >= 0
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  id="inches"
                  name="inches"
                  type="text"
                  maxLength={2}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={axleSpreadInch}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    setAxleSpreadInch(minMaxCalculation(event.target.value, 0, 11));
                  }}
                  style={{
                    borderColor: viewDetail ? "" : Number(axleSpreadInch) >= 0 ? "green" : "red",
                  }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*    Length */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Length</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "90px" }}>
                <input
                  className={`customFormControl ${
                    viewDetail ? "" : trailerLengthFoot ? "borderGreen" : "borderRed"
                  }`}
                  id="feet1"
                  name="feet1"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerLengthFoot}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    setTrailerLengthFoot(minMaxCalculation(event.target.value, 1, 99));
                  }}
                  style={{
                    borderColor: viewDetail ? "" : trailerLengthFoot ? "green" : "red",
                  }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "90px" }}>
                <input
                  className={`customFormControl ${
                    viewDetail
                      ? ""
                      : trailerLengthInch !== null &&
                          trailerLengthInch !== undefined &&
                          trailerLengthInch !== "" &&
                          trailerLengthInch >= 0
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  id="inch1"
                  name="inch1"
                  type="text"
                  maxLength={2}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerLengthInch}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    setTrailerLengthInch(minMaxCalculation(event.target.value, 0, 11));
                  }}
                  style={{
                    borderColor: viewDetail ? "" : trailerLengthInch ? "green" : "red",
                  }}
                />
              </Col>
              <Col sm={1} xs={1}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*     Width */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Width</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "90px" }}>
                <input
                  className={`customFormControl ${
                    viewDetail ? "" : trailerWidthFoot ? "borderGreen" : "borderRed"
                  }`}
                  id="feet2"
                  name="feet2"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerWidthFoot}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    setTrailerWidthFoot(minMaxCalculation(event.target.value, 1, 99));
                  }}
                  style={{
                    borderColor: viewDetail ? "" : trailerWidthFoot ? "green" : "red",
                  }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "90px" }}>
                <input
                  className={`customFormControl ${
                    viewDetail
                      ? ""
                      : trailerWidthInch !== null &&
                          trailerWidthInch !== undefined &&
                          trailerWidthInch !== "" &&
                          trailerWidthInch >= 0
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  id="inch2"
                  name="inch2"
                  type="text"
                  maxLength={2}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerWidthInch}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    setTrailerWidthInch(minMaxCalculation(event.target.value, 0, 11));
                  }}
                  style={{
                    borderColor: viewDetail ? "" : Number(trailerWidthInch) >= 0 ? "green" : "red",
                  }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*     Height */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Height</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "90px" }}>
                <input
                  className={`customFormControl ${
                    viewDetail ? "" : trailerHeightFoot ? "borderGreen" : "borderRed"
                  }`}
                  id="feet3"
                  name="feet3"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerHeightFoot}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    setTrailerHeightFoot(minMaxCalculation(event.target.value, 1, 99));
                  }}
                  style={{
                    borderColor: viewDetail ? "" : trailerHeightFoot ? "green" : "red",
                  }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2}>
                <input
                  className={`customFormControl ${
                    viewDetail
                      ? ""
                      : trailerHeightInch !== null &&
                          trailerHeightInch !== undefined &&
                          trailerHeightInch !== "" &&
                          trailerHeightInch >= 0
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  id="inch3"
                  name="inch3"
                  type="text"
                  maxLength={2}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={trailerHeightInch}
                  disabled={viewDetail}
                  onInput={(event) => {
                    setUpdated(true);
                    setTrailerHeightInch(minMaxCalculation(event.target.value, 0, 11));
                  }}
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*     Overhang */}
            {trailerOverhangs ? (
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={`customColFormLabel`}>Overhang</Form.Label>
                </Col>
                <Col sm={2} xs={2}>
                  <input
                    className={`customFormControl ${
                      viewDetail ? "" : trailerOverhangFoot ? "borderGreen" : "borderRed"
                    }`}
                    id="feet4"
                    name="feet4"
                    type="text"
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={trailerOverhangFoot}
                    disabled={!trailerOverhangs || viewDetail}
                    onInput={(event) => {
                      setUpdated(true);
                      setTrailerOverhangFoot(minMaxCalculation(event.target.value, 1, 99));
                    }}
                    style={{
                      borderColor: viewDetail ? "" : trailerOverhangFoot ? "green" : "red",
                    }}
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col sm={2} xs={2}>
                  <input
                    className={`customFormControl ${
                      viewDetail
                        ? ""
                        : trailerOverhangInch >= 0 &&
                            trailerOverhangInch !== undefined &&
                            trailerOverhangInch !== ""
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    id="inch4"
                    name="inch4"
                    type="text"
                    maxLength={2}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={trailerOverhangInch}
                    disabled={viewDetail || !trailerOverhangs}
                    onInput={(event) => {
                      setUpdated(true);
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

        {!trailerOnly && (
          <Col sm={5} xs={5}>
            {/* ROW 1 */}
            {/* ********************* */}
            {/*   Boat Information */}
            <div className="row p-l-35 mt-4">
              <Col sm={4} xs={4}>
                Boat Information
              </Col>
            </div>
            {showBoatInfoDiv && (
              <div className="row p-l-25">
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Make</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <input
                      className={`customFormControl ${viewDetail ? "" : boatMake ? "borderGreen" : "borderRed"}`}
                      id="make2"
                      name="make2"
                      type="text"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={boatMake}
                      disabled={viewDetail}
                      onInput={(event) => {
                        const input = event.target.value;
                        setUpdated(true);
                        if (input.startsWith(" ") || input.startsWith(".")) {
                          setBoatMake(input.replace(/^[ .]+/, "")); // Removes leading spaces and dots
                        } else {
                          setBoatMake(input);
                        }
                      }}
                      style={{
                        borderColor: viewDetail ? "" : boatMake ? "green" : "red",
                      }}
                    />
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/*   Hull ID */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Hull ID</Form.Label>
                  </Col>
                  <Col xs={6}>
                    <input
                      id="hullId"
                      name="hullId"
                      type="text"
                      maxLength={20}
                      autoComplete="off"
                      aria-autocomplete="list"
                      className={`customFormControl ${viewDetail ? "" : hullId ? "borderGreen" : "borderRed"}`}
                      value={hullId}
                      disabled={viewDetail}
                      onInput={(event) => {
                        const input = event.target.value;
                        setUpdated(true);
                        if (input.startsWith(" ") || input.startsWith(".")) {
                          setHullId(input.replace(/^[ .]+/, "")); // Removes leading spaces and dots
                        } else {
                          setHullId(input);
                        }
                      }}
                      style={{
                        borderColor: viewDetail ? "" : hullId ? "green" : "red",
                      }}
                    />
                  </Col>
                </Form.Group>
              </div>
            )}

            {showBoatInfoDiv && (
              <div className="row p-l-25">
                {/* ********************* */}
                {/*   Length */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Length</Form.Label>
                  </Col>
                  <Col sm={2} xs={2}>
                    <input
                      className={`customFormControl ${
                        viewDetail ? "" : boatLengthFoot ? "borderGreen" : "borderRed"
                      }`}
                      id="feet5"
                      name="feet5"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={boatLengthFoot}
                      disabled={viewDetail}
                      onInput={(event) => {
                        setBoatLengthFoot(minMaxCalculation(event.target.value, 1, 99));
                      }}
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                  </Col>
                  <Col sm={2} xs={2}>
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : boatLengthInch >= 0 && boatLengthInch !== undefined && boatLengthInch !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="inch5"
                      name="inch5"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={boatLengthInch}
                      disabled={viewDetail}
                      onInput={(event) => {
                        setUpdated(true);
                        setBoatLengthInch(minMaxCalculation(event.target.value, 0, 11));
                      }}
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/*   Width */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Width</Form.Label>
                  </Col>
                  <Col sm={2} xs={2}>
                    <input
                      className={`customFormControl ${
                        viewDetail ? "" : boatWidthFoot ? "borderGreen" : "borderRed"
                      }`}
                      id="feet6"
                      name="feet6"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={boatWidthFoot}
                      disabled={viewDetail}
                      onInput={(event) => {
                        setUpdated(true);
                        setBoatWidthFoot(minMaxCalculation(event.target.value, 1, 99));
                      }}
                      style={{
                        borderColor: viewDetail ? "" : boatWidthFoot ? "green" : "red",
                      }}
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                  </Col>
                  <Col sm={2} xs={2}>
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : boatWidthInch >= 0 && boatWidthInch !== undefined && boatWidthInch !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="inch6"
                      name="inch6"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={boatWidthInch}
                      disabled={viewDetail}
                      onInput={(event) => {
                        setUpdated(true);
                        setBoatWidthInch(minMaxCalculation(event.target.value, 0, 11));
                      }}
                      style={{
                        borderColor: viewDetail ? "" : boatWidthInch ? "green" : "red",
                      }}
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/*   Height */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Height</Form.Label>
                  </Col>
                  <Col sm={2} xs={2}>
                    <input
                      className={`customFormControl ${
                        viewDetail ? "" : boatHeightFoot ? "borderGreen" : "borderRed"
                      }`}
                      id="feet7"
                      name="feet7"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={boatHeightFoot}
                      disabled={viewDetail}
                      onInput={(event) => {
                        setUpdated(true);
                        setBoatHeightFoot(minMaxCalculation(event.target.value, 1, 99));
                      }}
                      style={{
                        borderColor: viewDetail ? "" : boatHeightFoot ? "green" : "red",
                      }}
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                  </Col>
                  <Col sm={2} xs={2}>
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : boatHeightInch >= 0 && boatHeightInch !== undefined && boatHeightInch !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="inch7"
                      name="inch7"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={boatHeightInch}
                      disabled={viewDetail}
                      onInput={(event) => {
                        setUpdated(true);
                        setBoatHeightInch(minMaxCalculation(event.target.value, 0, 11));
                      }}
                      style={{
                        borderColor: viewDetail ? "" : boatHeightInch ? "green" : "red",
                      }}
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0"></Form.Group>
                {/* ********************* */}
                {/*   Total Height */}

                <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Total Height</Form.Label>
                  </Col>
                  <Col sm={2} xs={2}>
                    <input
                      className={`customFormControl ${
                        viewDetail ? "" : totalHeightFoot ? "borderGreen" : "borderRed"
                      }`}
                      id="feet8"
                      name="feet8"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={totalHeightFoot}
                      disabled={viewDetail}
                      onInput={(event) => {
                        setUpdated(true);
                        setTotalHeightFoot(minMaxCalculation(event.target.value, 1, 99));
                      }}
                      style={{
                        borderColor: viewDetail ? "" : totalHeightFoot ? "green" : "red",
                      }}
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                  </Col>
                  <Col sm={2} xs={2}>
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : totalHeightInch >= 0 && totalHeightInch !== undefined && totalHeightInch !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="inch8"
                      name="inch8"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={totalHeightInch}
                      disabled={viewDetail}
                      onInput={(event) => {
                        setUpdated(true);
                        setTotalHeightInch(minMaxCalculation(event.target.value, 0, 11));
                      }}
                      style={{
                        borderColor: viewDetail ? "" : totalHeightInch ? "green" : "red",
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
        )}
      </Row>
    </div>
  );
};

export default OverWidth;
