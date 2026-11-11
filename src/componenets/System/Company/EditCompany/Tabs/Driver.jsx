import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setIsDriverTabValid, setSaveCompanyObject } from "../../../../../redux/CompanySlice";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import DateInputField from "../../../../common/DateInputField";
import Input from "../../../../../components/common/input";

function Driver() {
  const dispatch = useDispatch();
  const [lastDrugRandom, setLastDrugRandom] = useState("");
  const [logViolationSent, setLogViolationSent] = useState("");
  const [logViolationDue, setLogViolationDue] = useState("");
  const [dotInspectionReturnDays, setDotInspectionReturnDays] = useState("");

  const [dotInspectionAward, setDotInspectionAward] = useState("");
  const [dotInspectionAwardMiles, setDOTInspectionAwardMiles] = useState("");
  const [dotInspectionFine, setDotInspectionFine] = useState("");
  const [dotInspectionFineMiles, setDotInspectionFineMiles] = useState("");

  const [dotInspectionHOSFine, setDotInspectionHOSFine] = useState("");

  const [dotInspectionDOTReportedFine, setDotInspectionDOTReportedFine] = useState("");

  const [maximunAdvanceMotorized, setMaximunAdvanceMotorized] = useState("");
  const [advancePercentMotorized, setAdvancePercentMotorized] = useState("");
  const [maximumAdvanceTowable, setMaximumAdvanceTowable] = useState("");
  const [advancePercentTowable, setAdvancePercentTowable] = useState("");
  const [driveawayLatePaperworkDays, setDriveawayLatePaperworkDays] = useState("");
  const [towableLatePaperworkDays, setTowableLatePaperworkDays] = useState("");
  const [maximumReserve, setMaximumReserve] = useState("");
  const [latePaperWorkFee, setLatePaperWorkFee] = useState("");
  const [bondFund, setBondFund] = useState("");
  const [bondFund1stClaim, setBondFund1stClaim] = useState("");
  const [bondFund2ndClaim, setBondFund2ndClaim] = useState("");
  const [bondFundPercentage, setBondFundPercentage] = useState("");
  const [halfTonAdjustmentRate, setHalfTonAdjustmentRate] = useState("");
  const [halfTonGVWRCutoff, setHalfTonGVWRCutoff] = useState("");
  const [noGVWRLengthCutoff, setNoGVWRLengthCutoff] = useState("");
  const [dayTrip, setDayTrip] = useState("");
  const [shuttleTrip, setShuttleTrip] = useState("");
  const [daysToNextSafety, setDaysToNextSafety] = useState("");
  const [isLastDrugRandomValid, setIsLastDrugRandomValid] = useState(true);
  const [isLogViolationSent, setIsLogViolationSent] = useState(true);
  const [isLogViolationDue, setIsLogViolationDue] = useState(true);
  const companyPK = useSelector((state) => state.companyReducer.companyPK);
  const companyData = useSelector((state) => state.companyReducer.companyData);
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);

  useEffect(() => {
    setLastDrugRandom(companyData ? formatDatetimeToDate(companyData.lastDrugRandom) || "" : "");
    setLogViolationSent(companyData ? formatDatetimeToDate(companyData.logViolationSent) || "" : "");
    setLogViolationDue(companyData ? formatDatetimeToDate(companyData.logViolationDue) || "" : "");
    setDotInspectionReturnDays(companyData ? companyData.dotInspectionReturnDays || "" : "");

    setDotInspectionDOTReportedFine(companyData ? companyData.dotInspectionDOTReportedFine || "" : "");

    setDotInspectionHOSFine(companyData ? companyData.dotInspectionHOSFine || "" : "");

    setDotInspectionFineMiles(companyData ? companyData.dotInspectionFineMiles || "" : "");

    setDotInspectionAward(companyData ? companyData.dotInspectionAward || "" : "");

    setDOTInspectionAwardMiles(companyData ? companyData.dotInspectionAwardMiles || "" : "");

    setDotInspectionFine(companyData ? companyData.dotInspectionFine || "" : "");

    setMaximunAdvanceMotorized(companyData ? companyData.maximumAdvanceMotorized || "" : "");
    setAdvancePercentMotorized(
      Math.floor(companyData ? companyData.advancePercentMotorized * 100 || "" : "")
    );
    setMaximumAdvanceTowable(companyData ? companyData.maximumAdvanceTowable || "" : "");
    setAdvancePercentTowable(Math.floor(companyData ? companyData.advancePercentTowable * 100 || "" : ""));
    setDriveawayLatePaperworkDays(companyData ? companyData.driveawayLatePaperworkDays || "0" : "");
    setTowableLatePaperworkDays(companyData ? companyData.towableLatePaperworkDays || "" : "");
    setMaximumReserve(companyData ? companyData.maximumReserve || "0" : "");
    setLatePaperWorkFee(companyData ? companyData.latePaperWorkFee || "" : "");
    setBondFund(companyData ? companyData.bondFund || "0" : "");
    setBondFund1stClaim(companyData ? companyData.bondFund1stClaim || "0" : "");
    setBondFund2ndClaim(companyData ? companyData.bondFund2ndClaim || "0" : "");
    setBondFundPercentage(Math.floor(companyData ? companyData.bondFundPercentage * 100 || "" : ""));
    setHalfTonAdjustmentRate(companyData ? companyData.halfTonAdjustmentRate || "0" : "");
    setHalfTonGVWRCutoff(companyData ? companyData.halfTonGVWRCutoff || "0" : "");
    setNoGVWRLengthCutoff(companyData ? companyData.noGVWRLengthCutoff || "0" : "");
    setDayTrip(companyData ? companyData.dayTrip || "0" : "");
    setShuttleTrip(companyData ? companyData.shuttleTrip || "0" : "");
    setDaysToNextSafety(companyData ? companyData.daysToNextSafety || "0" : "");
  }, [companyData, viewDetail]);

  useEffect(() => {
    dispatch(
      setSaveCompanyObject({
        lastDrugRandom: lastDrugRandom,
        logViolationSent: logViolationSent,
        logViolationDue: logViolationDue,
        dotInspectionReturnDays: dotInspectionReturnDays,
        maximumAdvanceMotorized: maximunAdvanceMotorized,
        advancePercentMotorized: advancePercentMotorized / 100,
        maximumAdvanceTowable: maximumAdvanceTowable,
        advancePercentTowable: advancePercentTowable / 100,
        driveawayLatePaperworkDays: driveawayLatePaperworkDays,
        towableLatePaperworkDays: towableLatePaperworkDays,
        maximumReserve: maximumReserve,
        latePaperWorkFee: latePaperWorkFee,
        bondFund: bondFund,
        bondFund1stClaim: bondFund1stClaim,
        bondFund2ndClaim: bondFund2ndClaim,
        bondFundPercentage: bondFundPercentage / 100,
        daysToNextSafety: daysToNextSafety,
        halfTonAdjustmentRate: halfTonAdjustmentRate,
        halfTonGVWRCutoff: halfTonGVWRCutoff,
        noGVWRLengthCutoff: noGVWRLengthCutoff,

        dotInspectionAwardMiles: dotInspectionAwardMiles,
        dayTrip: dayTrip,
        shuttleTrip: shuttleTrip,
        dotInspectionAward: dotInspectionAward,
        dotInspectionFine: dotInspectionFine,
        dotInspectionFineMiles: dotInspectionFineMiles,
        dotInspectionHOSFine: dotInspectionHOSFine,
        dotInspectionDOTReportedFine: dotInspectionDOTReportedFine,
      })
    );
  }, [
    dotInspectionHOSFine,
    dotInspectionDOTReportedFine,
    dotInspectionAwardMiles,
    dotInspectionFineMiles,
    lastDrugRandom,
    logViolationSent,
    logViolationDue,
    dotInspectionReturnDays,
    maximunAdvanceMotorized,
    advancePercentMotorized,
    maximumAdvanceTowable,
    advancePercentTowable,
    driveawayLatePaperworkDays,
    towableLatePaperworkDays,
    maximumReserve,
    latePaperWorkFee,
    bondFund,
    bondFund1stClaim,
    bondFund2ndClaim,
    bondFundPercentage,
    daysToNextSafety,
    halfTonAdjustmentRate,
    halfTonGVWRCutoff,
    noGVWRLengthCutoff,
    dayTrip,
    shuttleTrip,
    dotInspectionAward,
    dotInspectionFine,
  ]);

  useEffect(() => {
    if (
      parseInt(dotInspectionReturnDays) > 32767 ||
      parseInt(dotInspectionReturnDays) <= 0 ||
      !dotInspectionReturnDays ||
      parseFloat(dotInspectionAward) >= 10000.0 ||
      parseFloat(dotInspectionAward) < 0.0 ||
      !dotInspectionAward ||
      dotInspectionAward === "." ||
      /^\d*\.$/.test(dotInspectionAward) ||
      !dotInspectionHOSFine ||
      dotInspectionHOSFine === "-" ||
      dotInspectionHOSFine === "-." ||
      isNaN(parseFloat(dotInspectionHOSFine)) ||
      parseFloat(dotInspectionHOSFine) < -32768 ||
      parseFloat(dotInspectionHOSFine) > 0 ||
      !dotInspectionDOTReportedFine ||
      dotInspectionDOTReportedFine === "-" ||
      dotInspectionDOTReportedFine === "-." ||
      isNaN(parseFloat(dotInspectionDOTReportedFine)) ||
      parseFloat(dotInspectionDOTReportedFine) < -32768 ||
      parseFloat(dotInspectionDOTReportedFine) > 0 ||
      parseInt(dotInspectionAwardMiles) > 32767 ||
      parseInt(dotInspectionAwardMiles) <= 0 ||
      !dotInspectionAwardMiles ||
      !dotInspectionFine ||
      dotInspectionFine === "-" ||
      dotInspectionFine === "-." ||
      isNaN(parseFloat(dotInspectionFine)) ||
      parseFloat(dotInspectionFine) < -32768 ||
      parseFloat(dotInspectionFine) > 0 ||
      !dotInspectionFineMiles ||
      dotInspectionFineMiles === "-" ||
      dotInspectionFineMiles === "-." ||
      isNaN(parseFloat(dotInspectionFineMiles)) ||
      parseFloat(dotInspectionFineMiles) < -32768 ||
      parseFloat(dotInspectionFineMiles) > 0 ||
      parseFloat(maximunAdvanceMotorized) > 5000.0 ||
      parseFloat(maximunAdvanceMotorized) <= 0.0 ||
      !maximunAdvanceMotorized ||
      maximunAdvanceMotorized === "." ||
      /^\d*\.$/.test(maximunAdvanceMotorized) ||
      parseInt(advancePercentMotorized) > 99 ||
      parseInt(advancePercentMotorized) <= 0 ||
      !advancePercentMotorized ||
      parseFloat(maximumAdvanceTowable) > 5000.0 ||
      parseFloat(maximumAdvanceTowable) <= 0.0 ||
      !maximumAdvanceTowable ||
      maximumAdvanceTowable === "." ||
      /^\d*\.$/.test(maximumAdvanceTowable) ||
      parseInt(advancePercentTowable) > 99 ||
      parseInt(advancePercentTowable) <= 0 ||
      !advancePercentTowable ||
      advancePercentTowable === "." ||
      parseInt(driveawayLatePaperworkDays) > 32767 ||
      parseInt(driveawayLatePaperworkDays) < 0 ||
      driveawayLatePaperworkDays === "" ||
      driveawayLatePaperworkDays === null ||
      driveawayLatePaperworkDays === undefined ||
      parseInt(towableLatePaperworkDays) > 15 ||
      parseInt(towableLatePaperworkDays) <= 0 ||
      towableLatePaperworkDays === "" ||
      towableLatePaperworkDays === null ||
      towableLatePaperworkDays === undefined ||
      parseInt(daysToNextSafety) > 365 ||
      parseInt(daysToNextSafety) < 0 ||
      daysToNextSafety === "" ||
      daysToNextSafety === null ||
      daysToNextSafety === undefined ||
      parseFloat(maximumReserve) >= 10000.0 ||
      parseFloat(maximumReserve) < 0.0 ||
      !maximumReserve ||
      maximumReserve === "." ||
      /^\d*\.$/.test(maximumReserve) ||
      parseFloat(latePaperWorkFee) <= 0.0 ||
      !latePaperWorkFee ||
      latePaperWorkFee === "." ||
      /^\d*\.$/.test(latePaperWorkFee) ||
      parseFloat(bondFund) >= 10000.0 ||
      parseFloat(bondFund) < 0.0 ||
      !bondFund ||
      bondFund === "." ||
      /^\d*\.$/.test(bondFund) ||
      parseFloat(bondFund1stClaim) >= 10000.0 ||
      parseFloat(bondFund1stClaim) < 0.0 ||
      !bondFund1stClaim ||
      parseFloat(bondFund1stClaim) < parseFloat(bondFund) ||
      bondFund1stClaim === "." ||
      /^\d*\.$/.test(bondFund1stClaim) ||
      parseFloat(bondFund2ndClaim) >= 10000.0 ||
      parseFloat(bondFund2ndClaim) < 0.0 ||
      !bondFund2ndClaim ||
      parseFloat(bondFund2ndClaim) < parseFloat(bondFund1stClaim) ||
      bondFund2ndClaim === "." ||
      /^\d*\.$/.test(bondFund2ndClaim) ||
      parseInt(bondFundPercentage) > 99 ||
      parseInt(bondFundPercentage) <= 0 ||
      !bondFundPercentage ||
      parseFloat(halfTonAdjustmentRate) > 0.0 ||
      parseFloat(halfTonAdjustmentRate) < -1.0 ||
      !halfTonAdjustmentRate ||
      halfTonAdjustmentRate === "-" ||
      /^(-?\d*\.)$/.test(halfTonAdjustmentRate) ||
      halfTonAdjustmentRate === "-." ||
      parseInt(halfTonGVWRCutoff) > 26000 ||
      parseInt(halfTonGVWRCutoff) < 0 ||
      halfTonGVWRCutoff === "" ||
      halfTonGVWRCutoff === null ||
      halfTonGVWRCutoff === undefined ||
      parseInt(noGVWRLengthCutoff) > 50 ||
      parseInt(noGVWRLengthCutoff) < 0 ||
      noGVWRLengthCutoff === "" ||
      noGVWRLengthCutoff === null ||
      noGVWRLengthCutoff === undefined ||
      parseInt(dayTrip) > 1000 ||
      parseInt(dayTrip) < 0 ||
      dayTrip === "" ||
      dayTrip === null ||
      dayTrip === undefined ||
      parseInt(shuttleTrip) > 100 ||
      parseInt(shuttleTrip) < 0 ||
      shuttleTrip === "" ||
      shuttleTrip === null ||
      shuttleTrip === undefined ||
      !isLastDrugRandomValid ||
      !isLogViolationDue ||
      !isLogViolationSent
    ) {
      dispatch(setIsDriverTabValid(false));
    } else {
      dispatch(setIsDriverTabValid(true));
    }
  }, [
    dotInspectionAward,
    dotInspectionAwardMiles,
    dotInspectionReturnDays,
    dotInspectionDOTReportedFine,
    dotInspectionHOSFine,
    dotInspectionFine,
    dotInspectionFineMiles,
    maximunAdvanceMotorized,
    advancePercentMotorized,
    maximumAdvanceTowable,
    advancePercentTowable,
    driveawayLatePaperworkDays,
    halfTonAdjustmentRate,
    towableLatePaperworkDays,
    daysToNextSafety,
    maximumReserve,
    latePaperWorkFee,
    bondFund,
    bondFund1stClaim,
    bondFund2ndClaim,
    bondFundPercentage,
    halfTonGVWRCutoff,
    noGVWRLengthCutoff,
    dayTrip,
    shuttleTrip,
    isLastDrugRandomValid,
    isLogViolationDue,
    isLogViolationSent,
  ]);

  return (
    <div className="p-2">
      <div className="d-flex">
        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Last Drug Random
              </Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                setIsDateValid={setIsLastDrugRandomValid}
                date={lastDrugRandom}
                setDate={(value) => setLastDrugRandom(value)}
                disabled={viewDetail}
                className={isLastDrugRandomValid ? "" : "borderRed"}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                log violation sent
              </Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                setIsDateValid={setIsLogViolationSent}
                date={logViolationSent}
                setDate={(value) => setLogViolationSent(value)}
                disabled={viewDetail}
                className={isLogViolationSent ? "" : "borderRed"}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                log violation due
              </Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                setIsDateValid={setIsLogViolationDue}
                disabled={viewDetail}
                date={logViolationDue}
                setDate={setLogViolationDue}
                className={isLogViolationDue ? "" : "borderRed"}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                maximum advance motorized
              </Form.Label>
            </Col>

            <div className="p-0 col-1 w-68px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(maximunAdvanceMotorized) > 5000.0 ||
                      parseFloat(maximunAdvanceMotorized) <= 0.0 ||
                      !maximunAdvanceMotorized ||
                      maximunAdvanceMotorized === "." ||
                      /^\d*\.$/.test(maximunAdvanceMotorized)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={8}
                value={maximunAdvanceMotorized}
                defaultValue={0.0}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setMaximunAdvanceMotorized(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                advance percent motorized
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(advancePercentMotorized) > 99 ||
                      parseInt(advancePercentMotorized) <= 0 ||
                      !advancePercentMotorized
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={2}
                value={advancePercentMotorized}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                defaultValue={0.0}
                onInput={(e) => {
                  setAdvancePercentMotorized(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                maximum advance towable
              </Form.Label>
            </Col>

            <div className="p-0 col-1 w-68px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(maximumAdvanceTowable) > 5000.0 ||
                      parseFloat(maximumAdvanceTowable) <= 0.0 ||
                      !maximumAdvanceTowable ||
                      maximumAdvanceTowable === "." ||
                      /^\d*\.$/.test(maximumAdvanceTowable)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={8}
                value={maximumAdvanceTowable}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setMaximumAdvanceTowable(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                advance percent towable
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(advancePercentTowable) > 99 ||
                      parseInt(advancePercentTowable) <= 0 ||
                      !advancePercentTowable ||
                      advancePercentTowable === "." ||
                      /^\d*\.$/.test(advancePercentTowable)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={2}
                value={advancePercentTowable}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setAdvancePercentTowable(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                late paperwork days motorized
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(driveawayLatePaperworkDays) > 32767 ||
                      parseInt(driveawayLatePaperworkDays) < 0 ||
                      driveawayLatePaperworkDays === "" ||
                      driveawayLatePaperworkDays === null ||
                      driveawayLatePaperworkDays === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={driveawayLatePaperworkDays}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setDriveawayLatePaperworkDays(e.target.value.replace(/[^\d]/g, "").slice(0, 5));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                late paperwork days towable
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(towableLatePaperworkDays) > 15 ||
                      parseInt(towableLatePaperworkDays) <= 0 ||
                      towableLatePaperworkDays === "" ||
                      towableLatePaperworkDays === null ||
                      towableLatePaperworkDays === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={towableLatePaperworkDays}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setTowableLatePaperworkDays(e.target.value.replace(/[^\d]/g, "").slice(0, 5));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                maximum reserve
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(maximumReserve) >= 10000.0 ||
                      parseFloat(maximumReserve) < 0.0 ||
                      !maximumReserve ||
                      maximumReserve === "." ||
                      /^\d*\.$/.test(maximumReserve)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={8}
                value={maximumReserve}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setMaximumReserve(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                late paperwork fee
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(latePaperWorkFee) <= 0.0 ||
                      !latePaperWorkFee ||
                      latePaperWorkFee === "." ||
                      /^\d*\.$/.test(latePaperWorkFee)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={latePaperWorkFee}
                disabled={viewDetail}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setLatePaperWorkFee(e.target.value);
                }}
              />
            </div>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driver bond fund
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(bondFund) >= 10000.0 ||
                      parseFloat(bondFund) < 0.0 ||
                      !bondFund ||
                      bondFund === "." ||
                      /^\d*\.$/.test(bondFund)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={bondFund}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setBondFund(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driver bond fund 1st claim
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(bondFund1stClaim) >= 10000.0 ||
                      parseFloat(bondFund1stClaim) < 0.0 ||
                      !bondFund1stClaim ||
                      parseFloat(bondFund1stClaim) < parseFloat(bondFund) ||
                      bondFund1stClaim === "." ||
                      /^\d*\.$/.test(bondFund1stClaim)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={bondFund1stClaim}
                disabled={viewDetail}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setBondFund1stClaim(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driver bond fund 2nd claim
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(bondFund2ndClaim) >= 10000.0 ||
                      parseFloat(bondFund2ndClaim) < 0.0 ||
                      !bondFund2ndClaim ||
                      parseFloat(bondFund2ndClaim) < parseFloat(bondFund1stClaim) ||
                      bondFund2ndClaim === "." ||
                      /^\d*\.$/.test(bondFund2ndClaim)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={bondFund2ndClaim}
                disabled={viewDetail}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setBondFund2ndClaim(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driver bond fund percentage
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(bondFundPercentage) > 99 ||
                      parseInt(bondFundPercentage) <= 0 ||
                      !bondFundPercentage
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={bondFundPercentage}
                disabled={viewDetail}
                maxLength={2}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setBondFundPercentage(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                days to next safety
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(daysToNextSafety) > 365 ||
                      parseInt(daysToNextSafety) < 0 ||
                      daysToNextSafety === "" ||
                      daysToNextSafety === null ||
                      daysToNextSafety === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={daysToNextSafety}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setDaysToNextSafety(e.target.value.replace(/[^\d]/g, "").slice(0, 5));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driver half ton adjustment rate
              </Form.Label>
            </Col>
            <div className="p-0 col-1 w-68px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(halfTonAdjustmentRate) > 0.0 ||
                      parseFloat(halfTonAdjustmentRate) < -1.0 ||
                      !halfTonAdjustmentRate ||
                      halfTonAdjustmentRate === "-" ||
                      /^(-?\d*\.)$/.test(halfTonAdjustmentRate) ||
                      halfTonAdjustmentRate === "-."
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={halfTonAdjustmentRate}
                disabled={viewDetail}
                maxLength={9}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^-?\d{0,5}(\.\d{0,2})?$/) && setHalfTonAdjustmentRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driver half ton GVWR cutoff
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(halfTonGVWRCutoff) > 26000 ||
                      parseInt(halfTonGVWRCutoff) < 0 ||
                      halfTonGVWRCutoff === "" ||
                      halfTonGVWRCutoff === null ||
                      halfTonGVWRCutoff === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={halfTonGVWRCutoff}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setHalfTonGVWRCutoff(e.target.value.replace(/[^\d]/g, "").slice(0, 5));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                CDL no GVWR length cutoff
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(noGVWRLengthCutoff) > 50 ||
                      parseInt(noGVWRLengthCutoff) < 0 ||
                      noGVWRLengthCutoff === "" ||
                      noGVWRLengthCutoff === null ||
                      noGVWRLengthCutoff === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={noGVWRLengthCutoff}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNoGVWRLengthCutoff(e.target.value.replace(/[^\d]/g, "").slice(0, 5));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                day trip
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(dayTrip) > 1000 ||
                      parseInt(dayTrip) < 0 ||
                      dayTrip === "" ||
                      dayTrip === null ||
                      dayTrip === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={dayTrip}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setDayTrip(e.target.value.replace(/[^\d]/g, "").slice(0, 5));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                shuttle trip
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(shuttleTrip) > 100 ||
                      parseInt(shuttleTrip) < 0 ||
                      shuttleTrip === "" ||
                      shuttleTrip === null ||
                      shuttleTrip === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={shuttleTrip}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setShuttleTrip(e.target.value.replace(/[^\d]/g, "").slice(0, 5));
                }}
              />
            </div>
          </Form.Group>
        </Col>

        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                DOT inspection return days
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(dotInspectionReturnDays) > 32767 ||
                      parseInt(dotInspectionReturnDays) <= 0 ||
                      !dotInspectionReturnDays
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="dotInspectionReturnDays"
                name="dotInspectionReturnDays"
                type="text"
                value={dotInspectionReturnDays}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setDotInspectionReturnDays(e.target.value.replace(/[^\d]/g, "").slice(0, 5));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                DOT Inspection Award
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(dotInspectionAward) >= 10000.0 ||
                      parseFloat(dotInspectionAward) < 0.0 ||
                      !dotInspectionAward ||
                      dotInspectionAward === "." ||
                      /^\d*\.$/.test(dotInspectionAward)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="dotInspectionAward"
                name="dotInspectionAward"
                type="text"
                value={dotInspectionAward}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^(?!-)\d{0,5}(\.\d{0,2})?$/.test(value)) {
                    setDotInspectionAward(value);
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                DOT Inspection Award Miles
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(dotInspectionAwardMiles) > 32767 ||
                      parseInt(dotInspectionAwardMiles) <= 0 ||
                      !dotInspectionAwardMiles
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={dotInspectionAwardMiles}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^(?!-)\d{0,5}(\.\d{0,2})?$/.test(value)) {
                    setDOTInspectionAwardMiles(value);
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                DOT Inspection Fine
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? (() => {
                        if (!dotInspectionFine || dotInspectionFine === "") {
                          return "borderRed";
                        }

                        if (dotInspectionFine === "-" || dotInspectionFine === "-.") {
                          return "borderRed";
                        }

                        const numericValue = parseFloat(dotInspectionFine);

                        if (isNaN(numericValue)) {
                          return "borderRed";
                        }

                        if (numericValue >= -32768 && numericValue <= 0) {
                          return "borderGreen";
                        } else {
                          return "borderRed";
                        }
                      })()
                    : ""
                }`}
                id="dotInspectionFine"
                name="dotInspectionFine"
                type="text"
                value={dotInspectionFine}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.value;

                  const isValidFormat = /^-?\d{0,5}(\.\d{0,2})?$/.test(value);

                  if (isValidFormat) {
                    if (value === "" || value === "-" || value === "-.") {
                      setDotInspectionFine(value);
                      return;
                    }

                    const numericValue = parseFloat(value);
                    if (!isNaN(numericValue) && numericValue <= 0 && numericValue >= -32768) {
                      setDotInspectionFine(value);
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "E") {
                    e.preventDefault();
                  }

                  if (
                    !/[\d.\-]/.test(e.key) &&
                    !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                  ) {
                    e.preventDefault();
                  }

                  if (e.key === "." && dotInspectionFine.includes(".")) {
                    e.preventDefault();
                  }

                  if (e.key === "-" && (dotInspectionFine.includes("-") || e.target.selectionStart !== 0)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                DOT Inspection Fine Miles
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? (() => {
                        if (!dotInspectionFineMiles || dotInspectionFineMiles === "") {
                          return "borderRed";
                        }

                        if (dotInspectionFineMiles === "-" || dotInspectionFineMiles === "-.") {
                          return "borderRed";
                        }

                        const numericValue = parseFloat(dotInspectionFineMiles);

                        if (isNaN(numericValue)) {
                          return "borderRed";
                        }

                        if (numericValue >= -32768 && numericValue <= 0) {
                          return "borderGreen";
                        } else {
                          return "borderRed";
                        }
                      })()
                    : ""
                }`}
                id="dotInspectionFineMiles"
                name="dotInspectionFineMiles"
                type="text"
                value={dotInspectionFineMiles}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.value;

                  const isValidFormat = /^-?\d{0,5}(\.\d{0,2})?$/.test(value);

                  if (isValidFormat) {
                    if (value === "" || value === "-" || value === "-.") {
                      setDotInspectionFineMiles(value);
                      return;
                    }

                    const numericValue = parseFloat(value);
                    if (!isNaN(numericValue) && numericValue <= 0 && numericValue >= -32768) {
                      setDotInspectionFineMiles(value);
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "E") {
                    e.preventDefault();
                  }

                  if (
                    !/[\d.\-]/.test(e.key) &&
                    !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                  ) {
                    e.preventDefault();
                  }

                  if (e.key === "." && dotInspectionFineMiles.includes(".")) {
                    e.preventDefault();
                  }

                  if (
                    e.key === "-" &&
                    (dotInspectionFineMiles.includes("-") || e.target.selectionStart !== 0)
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                DOT Inspection HOS Fine
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? (() => {
                        if (!dotInspectionHOSFine || dotInspectionHOSFine === "") {
                          return "borderRed";
                        }

                        if (dotInspectionHOSFine === "-" || dotInspectionHOSFine === "-.") {
                          return "borderRed";
                        }

                        const numericValue = parseFloat(dotInspectionHOSFine);

                        if (isNaN(numericValue)) {
                          return "borderRed";
                        }

                        if (numericValue >= -32768 && numericValue <= 0) {
                          return "borderGreen";
                        } else {
                          return "borderRed";
                        }
                      })()
                    : ""
                }`}
                id="dotInspectionHOSFine"
                name="dotInspectionHOSFine"
                type="text"
                value={dotInspectionHOSFine}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.value;

                  const isValidFormat = /^-?\d{0,5}(\.\d{0,2})?$/.test(value);

                  if (isValidFormat) {
                    if (value === "" || value === "-" || value === "-.") {
                      setDotInspectionHOSFine(value);
                      return;
                    }

                    const numericValue = parseFloat(value);
                    if (!isNaN(numericValue) && numericValue <= 0 && numericValue >= -32768) {
                      setDotInspectionHOSFine(value);
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "E") {
                    e.preventDefault();
                  }

                  if (
                    !/[\d.\-]/.test(e.key) &&
                    !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                  ) {
                    e.preventDefault();
                  }

                  if (e.key === "." && dotInspectionHOSFine.includes(".")) {
                    e.preventDefault();
                  }

                  if (
                    e.key === "-" &&
                    (dotInspectionHOSFine.includes("-") || e.target.selectionStart !== 0)
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                DOT Inspection DOT Reported Fine
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? (() => {
                        if (!dotInspectionDOTReportedFine || dotInspectionDOTReportedFine === "") {
                          return "borderRed";
                        }

                        if (dotInspectionDOTReportedFine === "-" || dotInspectionDOTReportedFine === "-.") {
                          return "borderRed";
                        }

                        const numericValue = parseFloat(dotInspectionDOTReportedFine);

                        if (isNaN(numericValue)) {
                          return "borderRed";
                        }

                        if (numericValue >= -32768 && numericValue <= 0) {
                          return "borderGreen";
                        } else {
                          return "borderRed";
                        }
                      })()
                    : ""
                }`}
                id="dotInspectionDOTReportedFine"
                name="dotInspectionDOTReportedFine"
                type="text"
                value={dotInspectionDOTReportedFine}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.value;

                  const isValidFormat = /^-?\d{0,5}(\.\d{0,2})?$/.test(value);

                  if (isValidFormat) {
                    if (value === "" || value === "-" || value === "-.") {
                      setDotInspectionDOTReportedFine(value);
                      return;
                    }

                    const numericValue = parseFloat(value);
                    if (!isNaN(numericValue) && numericValue <= 0 && numericValue >= -32768) {
                      setDotInspectionDOTReportedFine(value);
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "E") {
                    e.preventDefault();
                  }

                  if (
                    !/[\d.\-]/.test(e.key) &&
                    !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                  ) {
                    e.preventDefault();
                  }

                  if (e.key === "." && dotInspectionDOTReportedFine.includes(".")) {
                    e.preventDefault();
                  }

                  if (
                    e.key === "-" &&
                    (dotInspectionDOTReportedFine.includes("-") || e.target.selectionStart !== 0)
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
}

export default Driver;
