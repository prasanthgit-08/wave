import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setDriversPayTabData,
  setReimbursementTabValid,
} from "../../../../../../../../redux/PaymentRequestSlice";

const blockNonNumeric = (e) => {
  if (e.data && /[^0-9.-]/.test(e.data)) e.preventDefault();
};

const ReimbursementTab = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const editFormData = useSelector((state) => state.paymentRequestSlice.editFormData);
  const viewDetail = useSelector((state) => state.paymentRequestSlice.viewDetail);

  const changesCancelled = useSelector((state) => state.paymentRequestSlice.changesCancelled);
  const driversPayTabData = useSelector((state) => state.paymentRequestSlice.driversPayTabData);

  // If Drivers Pay has a Shuttle / Other #1 / Other #2 value, reimbursement is optional
  const hasPayShuttleOrOther =
    !!driversPayTabData?.shuttleAmount ||
    !!driversPayTabData?.otherAmount1 ||
    !!driversPayTabData?.otherAmount2;

  const [motelAmount, setMotelAmount] = useState(null);
  const [motelDescription, setMotelDescription] = useState("");
  const [repairAmount, setRepairAmount] = useState(null);
  const [repairDescription, setRepairDescription] = useState("");
  const [fuelAmount, setFuelAmount] = useState(null);
  const [fuelDescription, setFuelDescription] = useState("");
  const [tollsAmount, setTollsAmount] = useState(null);
  const [tollsDescription, setTollsDescription] = useState("");
  const [permitsAmount, setPermitsAmount] = useState(null);
  const [permitsDescription, setPermitsDescription] = useState("");
  const [washAmount, setWashAmount] = useState(null);
  const [washDescription, setWashDescription] = useState("");
  const [otherReimbursmentAmount1, setOtherReimbursmentAmount1] = useState(null);
  const [otherReimbursmentDescription1, setOtherReimbursmentDescription1] = useState("");
  const [otherReimbursmentAmount2, setOtherReimbursmentAmount2] = useState(null);
  const [otherReimbursmentDescription2, setOtherReimbursmentDescription2] = useState("");
  const [reimbursmentNotes, setReimbursmentNotes] = useState("");
  const [isMotelValid, setIsMotelValid] = useState(true);
  const [isRepairValid, setIsRepairValid] = useState(true);
  const [isFuelValid, setIsFuelValid] = useState(true);
  const [isTollsValid, setIsTollsValid] = useState(true);
  const [isPermitsValid, setIsPermitsValid] = useState(true);
  const [isWashValid, setIsWashValid] = useState(true);
  const [isOther1Valid, setIsOther1Valid] = useState(true);
  const [isOther2Valid, setIsOther2Valid] = useState(true);

  useEffect(() => {
    if (editFormData) {
      setMotelAmount(editFormData.MotelAmount !== 0 ? editFormData?.MotelAmount : null);
      setMotelDescription(editFormData?.MotelDescription || "");
      setRepairAmount(editFormData.RepairAmount !== 0 ? editFormData?.RepairAmount : null);
      setRepairDescription(editFormData.RepairDescription || "");
      setFuelAmount(editFormData.FuelAmount !== 0 ? editFormData?.FuelAmount : null);
      setFuelDescription(editFormData?.FuelDescription || "");
      setTollsAmount(editFormData.TollsAmount !== 0 ? editFormData?.TollsAmount : null);
      setTollsDescription(editFormData?.TollsDescription || "");
      setPermitsAmount(editFormData.PermitsAmount !== 0 ? editFormData?.PermitsAmount : null);
      setPermitsDescription(editFormData?.PermitsDescription || "");
      setWashAmount(editFormData.WashAmount !== 0 ? editFormData?.WashAmount : null);
      setWashDescription(editFormData?.WashDescription || "");
      setOtherReimbursmentAmount1(
        editFormData.OtherReimbursmentAmount1 !== 0 ? editFormData?.OtherReimbursmentAmount1 : null
      );
      setOtherReimbursmentDescription1(editFormData?.OtherReimbursmentDescription1 || "");
      setOtherReimbursmentAmount2(
        editFormData.OtherReimbursmentAmount2 !== 0 ? editFormData?.OtherReimbursmentAmount2 : null
      );
      setOtherReimbursmentDescription2(editFormData?.OtherReimbursmentDescription2 || "");
      setReimbursmentNotes(editFormData.ReimbursmentNotes || "");
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    dispatch(
      setDriversPayTabData({
        motelAmount: motelAmount,
        motelDescription: motelDescription,
        repairAmount: repairAmount,
        repairDescription: repairDescription,
        fuelAmount: fuelAmount,
        fuelDescription: fuelDescription,
        tollsAmount: tollsAmount,
        tollsDescription: tollsDescription,
        permitsAmount: permitsAmount,
        permitsDescription: permitsDescription,
        washAmount: washAmount,
        washDescription: washDescription,
        otherReimbursmentAmount1: otherReimbursmentAmount1,
        otherReimbursmentDescription1: otherReimbursmentDescription1,
        otherReimbursmentAmount2: otherReimbursmentAmount2,
        otherReimbursmentDescription2: otherReimbursmentDescription2,
        reimbursmentNotes: reimbursmentNotes,
      })
    );
  }, [
    motelAmount,
    motelDescription,
    repairAmount,
    repairDescription,
    fuelAmount,
    fuelDescription,
    tollsAmount,
    tollsDescription,
    permitsAmount,
    permitsDescription,
    washAmount,
    washDescription,
    otherReimbursmentAmount1,
    otherReimbursmentDescription1,
    otherReimbursmentAmount2,
    otherReimbursmentDescription2,
    reimbursmentNotes,
    editFormData,
    dispatch,
  ]);

  useEffect(() => {
    const validatePair = (amount, reason) => {
      const hasAmount = amount !== null && amount !== "" && !isNaN(amount);
      const hasReason = reason.trim() !== "";
      // Both empty -> valid (unless overall reimbursement is mandatory)
      if (!hasAmount && !hasReason) return true;
      // Both filled -> valid
      if (hasAmount && hasReason) return true;
      // Only one filled -> invalid
      return false;
    };

    setIsMotelValid(validatePair(motelAmount, motelDescription));
    setIsRepairValid(validatePair(repairAmount, repairDescription));
    setIsFuelValid(validatePair(fuelAmount, fuelDescription));
    setIsTollsValid(validatePair(tollsAmount, tollsDescription));
    setIsPermitsValid(validatePair(permitsAmount, permitsDescription));
    setIsWashValid(validatePair(washAmount, washDescription));
    setIsOther1Valid(validatePair(otherReimbursmentAmount1, otherReimbursmentDescription1));
    setIsOther2Valid(validatePair(otherReimbursmentAmount2, otherReimbursmentDescription2));
  }, [
    motelAmount,
    motelDescription,
    repairAmount,
    repairDescription,
    fuelAmount,
    fuelDescription,
    tollsAmount,
    tollsDescription,
    permitsAmount,
    permitsDescription,
    washAmount,
    washDescription,
    otherReimbursmentAmount1,
    otherReimbursmentDescription1,
    otherReimbursmentAmount2,
    otherReimbursmentDescription2,
  ]);

  useEffect(() => {
    const hasInvalidFields =
      !isMotelValid ||
      !isRepairValid ||
      !isFuelValid ||
      !isTollsValid ||
      !isPermitsValid ||
      !isWashValid ||
      !isOther1Valid ||
      !isOther2Valid;

    const isAnyAmountMissing =
      !motelAmount &&
      !repairAmount &&
      !fuelAmount &&
      !tollsAmount &&
      !permitsAmount &&
      !washAmount &&
      !otherReimbursmentAmount1 &&
      !otherReimbursmentAmount2;

    if (hasInvalidFields || (isAnyAmountMissing && !hasPayShuttleOrOther)) {
      dispatch(setReimbursementTabValid(true));
    } else {
      dispatch(setReimbursementTabValid(false));
    }
  }, [
    motelAmount,
    motelDescription,
    repairAmount,
    repairDescription,
    fuelAmount,
    fuelDescription,
    tollsAmount,
    tollsDescription,
    permitsAmount,
    permitsDescription,
    washAmount,
    washDescription,
    otherReimbursmentAmount1,
    otherReimbursmentDescription1,
    otherReimbursmentAmount2,
    otherReimbursmentDescription2,
    isMotelValid,
    isRepairValid,
    isFuelValid,
    isTollsValid,
    isPermitsValid,
    isWashValid,
    isOther1Valid,
    isOther2Valid,
    hasPayShuttleOrOther,
  ]);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20">
        <Col xs={12}>
          <Form.Group className="mt-2 mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Motel</Form.Label>
            </Col>

            <Col xs={1} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                inputMode="decimal"
                maxLength={8}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isMotelValid
                      ? "borderRed"
                      : motelAmount && motelDescription
                        ? "borderGreen"
                        : repairAmount ||
                            fuelAmount ||
                            tollsAmount ||
                            permitsAmount ||
                            washAmount ||
                            otherReimbursmentAmount1 ||
                            otherReimbursmentAmount2 ||
                            hasPayShuttleOrOther
                          ? ""
                          : "borderRed"
                }`}
                value={motelAmount ?? ""}

                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setMotelAmount(value);
                }}
                onBeforeInput={blockNonNumeric}
                disabled={viewDetail}
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"

                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isMotelValid
                      ? "borderRed"
                      : motelAmount && motelDescription
                        ? "borderGreen"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="list"

                value={motelDescription}
                onChange={(e) => {
                  setMotelDescription(e.target.value);
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                disabled={viewDetail || (!motelAmount && !motelDescription)}
                maxLength={60}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Repair</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                inputMode="decimal"
                maxLength={30}

                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isRepairValid
                      ? "borderRed"
                      : repairAmount && repairDescription
                        ? "borderGreen"
                        : fuelAmount ||
                            tollsAmount ||
                            permitsAmount ||
                            washAmount ||
                            motelAmount ||
                            otherReimbursmentAmount1 ||
                            otherReimbursmentAmount2 ||
                            hasPayShuttleOrOther
                          ? ""
                          : "borderRed"
                }`}
                value={repairAmount ?? ""}

                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setRepairAmount(value);
                }}
                onBeforeInput={blockNonNumeric}
                disabled={viewDetail}
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isRepairValid
                      ? "borderRed"
                      : repairAmount && repairDescription
                        ? "borderGreen"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="list"

                value={repairDescription}
                onChange={(e) => {
                  setRepairDescription(e.target.value);
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                disabled={viewDetail || (!repairAmount && !repairDescription)}
                maxLength={60}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Fuel</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                inputMode="decimal"
                maxLength={30}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isFuelValid
                      ? "borderRed"
                      : fuelAmount && fuelDescription
                        ? "borderGreen"
                        : repairAmount ||
                            tollsAmount ||
                            permitsAmount ||
                            washAmount ||
                            motelAmount ||
                            otherReimbursmentAmount1 ||
                            otherReimbursmentAmount2 ||
                            hasPayShuttleOrOther
                          ? ""
                          : "borderRed"
                }`}
                value={fuelAmount ?? ""}

                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setFuelAmount(value);
                }}
                onBeforeInput={blockNonNumeric}
                disabled={viewDetail}
              />
            </Col>

            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"

                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isFuelValid
                      ? "borderRed"
                      : fuelAmount && fuelDescription
                        ? "borderGreen"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="list"

                value={fuelDescription}
                onChange={(e) => {
                  setFuelDescription(e.target.value);
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                disabled={viewDetail || (!fuelAmount && !fuelDescription)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Tolls</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                inputMode="decimal"
                maxLength={30}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isTollsValid
                      ? "borderRed"
                      : tollsAmount && tollsDescription
                        ? "borderGreen"
                        : repairAmount ||
                            fuelAmount ||
                            permitsAmount ||
                            washAmount ||
                            motelAmount ||
                            otherReimbursmentAmount1 ||
                            otherReimbursmentAmount2 ||
                            hasPayShuttleOrOther
                          ? ""
                          : "borderRed"
                }`}
                value={tollsAmount ?? ""}

                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setTollsAmount(value);
                }}
                onBeforeInput={blockNonNumeric}
                disabled={viewDetail}
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"

                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isTollsValid
                      ? "borderRed"
                      : tollsAmount && tollsDescription
                        ? "borderGreen"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="list"

                value={tollsDescription}
                onChange={(e) => {
                  setTollsDescription(e.target.value);
                }}
                disabled={viewDetail || (!tollsAmount && !tollsDescription)}
                maxLength={60}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Permits</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                inputMode="decimal"
                maxLength={30}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isPermitsValid
                      ? "borderRed"
                      : permitsAmount && permitsDescription
                        ? "borderGreen"
                        : repairAmount ||
                            fuelAmount ||
                            tollsAmount ||
                            washAmount ||
                            motelAmount ||
                            otherReimbursmentAmount1 ||
                            otherReimbursmentAmount2 ||
                            hasPayShuttleOrOther
                          ? ""
                          : "borderRed"
                }`}
                value={permitsAmount ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setPermitsAmount(value);
                }}
                onBeforeInput={blockNonNumeric}
                disabled={viewDetail}
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isPermitsValid
                      ? "borderRed"
                      : permitsAmount && permitsDescription
                        ? "borderGreen"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="list"

                value={permitsDescription}
                onChange={(e) => {
                  setPermitsDescription(e.target.value);
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                disabled={viewDetail || (!permitsAmount && !permitsDescription)}
                maxLength={60}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Wash</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                inputMode="decimal"
                maxLength={30}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isWashValid
                      ? "borderRed"
                      : washAmount && washDescription
                        ? "borderGreen"
                        : repairAmount ||
                            fuelAmount ||
                            tollsAmount ||
                            permitsAmount ||
                            motelAmount ||
                            otherReimbursmentAmount1 ||
                            otherReimbursmentAmount2 ||
                            hasPayShuttleOrOther
                          ? ""
                          : "borderRed"
                }`}
                value={washAmount ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setWashAmount(value);
                }}
                onBeforeInput={blockNonNumeric}
                disabled={viewDetail}
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isWashValid
                      ? "borderRed"
                      : washAmount && washDescription
                        ? "borderGreen"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="list"

                value={washDescription}
                onChange={(e) => {
                  setWashDescription(e.target.value);
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                disabled={viewDetail || (!washAmount && !washDescription)}
                maxLength={60}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Other #1</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                inputMode="decimal"
                maxLength={30}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isOther1Valid
                      ? "borderRed"
                      : otherReimbursmentAmount1 && otherReimbursmentDescription1
                        ? "borderGreen"
                        : repairAmount ||
                            fuelAmount ||
                            tollsAmount ||
                            permitsAmount ||
                            motelAmount ||
                            washAmount ||
                            otherReimbursmentAmount2 ||
                            hasPayShuttleOrOther
                          ? ""
                          : "borderRed"
                }`}
                value={otherReimbursmentAmount1 ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setOtherReimbursmentAmount1(value);
                }}
                onBeforeInput={blockNonNumeric}
                disabled={viewDetail}
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"

                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isOther1Valid
                      ? "borderRed"
                      : otherReimbursmentAmount1 && otherReimbursmentDescription1
                        ? "borderGreen"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="list"

                value={otherReimbursmentDescription1}
                onChange={(e) => {
                  setOtherReimbursmentDescription1(e.target.value);
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}

                disabled={viewDetail || (!otherReimbursmentAmount1 && !otherReimbursmentDescription1)}
                maxLength={60}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Other #2</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                inputMode="decimal"
                maxLength={30}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isOther2Valid
                      ? "borderRed"
                      : otherReimbursmentAmount2 && otherReimbursmentDescription2
                        ? "borderGreen"
                        : repairAmount ||
                            fuelAmount ||
                            tollsAmount ||
                            permitsAmount ||
                            motelAmount ||
                            washAmount ||
                            otherReimbursmentAmount1 ||
                            hasPayShuttleOrOther
                          ? ""
                          : "borderRed"
                }`}
                value={otherReimbursmentAmount2 ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setOtherReimbursmentAmount2(value);
                }}
                onBeforeInput={blockNonNumeric}
                disabled={viewDetail}
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : !isOther2Valid
                      ? "borderRed"
                      : otherReimbursmentAmount2 && otherReimbursmentDescription2
                        ? "borderGreen"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="list"

                value={otherReimbursmentDescription2}
                onChange={(e) => {
                  setOtherReimbursmentDescription2(e.target.value);
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                disabled={viewDetail || (!otherReimbursmentAmount2 && !otherReimbursmentDescription2)}
                maxLength={60}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0 d-flex align-self-start">
              <Form.Label className={`customColFormLabel`}>Notes</Form.Label>
            </Col>

            <Col xs={9} className="p-0">
              <textarea
                name="thankYouText"
                id="thankYouText"
                style={{ width: "86%" }}
                rows="9"
                className={`customFocusClass `}
                maxLength={300}
                value={reimbursmentNotes}
                onChange={(e) => {
                  setReimbursmentNotes(e.target.value);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default ReimbursementTab;
