import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  setDriverPayRequestsPK,
  setDriverpayTabValid,
  setDriversPayTabData,
  setUnitId,
  setDispatchId,
  setChangesCancelled,
} from "../../../../../../../../redux/PaymentRequestSlice";
import AutoCompleteDropdown from "../../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../../common/LookupButton";
import UnitSelectionLookup from "../../../../../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import DispatchesLookup from "../../../../../../../LookupScreens/Disptches/DispatchesLookup";
import PaymentRequestService from "../../../../../../../../services/operations/PaymentRequestService";

const DriversPayTab = () => {
  const { driverId, id } = useParams();
  const editFormData = useSelector((state) => state.paymentRequestSlice.editFormData);
  const viewDetail = useSelector((state) => state.paymentRequestSlice.viewDetail);
  const unitId = useSelector((state) => state.paymentRequestSlice.unitId);
  const driverPayRequestsPK = useSelector((state) => state.paymentRequestSlice.driverPayRequestsPK);
  const dispatchId = useSelector((state) => state.paymentRequestSlice.dispatchId);
  const driverpayTabValid = useSelector((state) => state.paymentRequestSlice.driverpayTabValid);
  const driversPayTabData = useSelector((state) => state.paymentRequestSlice.driversPayTabData);
  const changesCancelled = useSelector((state) => state.paymentRequestSlice.changesCancelled);

  const dispatch = useDispatch();

  // If any Reimbursement amount is entered, Shuttle / Other #1 / Other #2 are optional
  const hasReimbursementAmount =
    !!driversPayTabData?.motelAmount ||
    !!driversPayTabData?.repairAmount ||
    !!driversPayTabData?.fuelAmount ||
    !!driversPayTabData?.tollsAmount ||
    !!driversPayTabData?.permitsAmount ||
    !!driversPayTabData?.washAmount ||
    !!driversPayTabData?.otherReimbursmentAmount1 ||
    !!driversPayTabData?.otherReimbursmentAmount2;

  const [unitNumber, setUnitNumber] = useState("");
  const [downtimeHours, setDowntimeHours] = useState("");
  const [downtimeRate, setDowntimeRate] = useState(0);
  const [downtimeAmount, setDowntimeAmount] = useState("");
  const [additionalMiles, setAdditionalMiles] = useState("");
  const [mileageRate, setMileageRate] = useState(0);
  const [mileageAmount, setMileageAmount] = useState("");
  const [recruitingBonusAmount, setRecruitingBonusAmount] = useState(0);
  const [recruitedDriver, setRecruitedDriver] = useState("");
  const [shuttleAmount, setShuttleAmount] = useState(null);
  const [shuttleDescription, setShuttleDescription] = useState("");
  const [otherAmount1, setOtherAmount1] = useState(null);
  const [otherAmountDescription1, setOtherAmountDescription1] = useState("");
  const [otherAmount2, setOtherAmount2] = useState(null);
  const [otherAmountDescription2, setOtherAmountDescription2] = useState("");
  const [notes, setNotes] = useState("");
  const [driverFK, setDriverFK] = useState(null);
  const [unitNumberInput, setUnitNumberInput] = useState("");
  const [unitData, setUnitData] = useState([]);
  const [alternateNumber, setAlternateNumber] = useState("");
  const [downTimeRateFromCustomer, setDownTimeRateFromCustomer] = useState(null);

  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [showDispatchSelectionLookup, setShowDispatchSelectionLookup] = useState(false);

  const [driverData, setDriverData] = useState([]);
  const [driverInput, setDriverInput] = useState("");
  const [recruitedDriverFK, setRecruitedDriverFK] = useState(null);
  const [showFields, setShowFields] = useState(false);

  const [dispatchData, setDispatchData] = useState([]);
  const [dispatchInput, setDispatchInput] = useState("");
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const location = useLocation();

  const handleUnitNumberSelection = (unit) => {
    dispatch(setUnitId(unit.unitPK));
    setUnitNumberInput(unit.unitNumber?.trim());
    setDowntimeRate(unit?.driverDowntimeRate);
    setDownTimeRateFromCustomer(unit?.driverDowntimeRate);
    setShowUnitSelectionLookup(false);
  };

  const handleDispatchesSelection = (d) => {
    dispatch(setDispatchId(d.DispatchPK));
    setDispatchInput(d.UnitNumber?.trim());
    setDowntimeRate(d?.DriverDowntimeRate);
    setDownTimeRateFromCustomer(d?.DriverDowntimeRate);
    setShowDispatchSelectionLookup(false);
  };

  const handleDriverSelection = (e) => {
    setRecruitedDriverFK(e.driverPK);
    setDriverInput(e.fullName?.trim());

    setShowUnitSelectionLookup(false);
  };

  useEffect(() => {
    const payTabData = {
      unitNumber: unitNumber,
      downtimeHours: downtimeHours,
      downtimeRate: downtimeRate,
      downtimeAmount: downtimeAmount,
      additionalMiles: additionalMiles,
      mileageRate: mileageRate,
      mileageAmount: mileageAmount,
      recruitingBonusAmount: recruitingBonusAmount,
      recruitedDriver: recruitedDriver,
      shuttleAmount: shuttleAmount,
      shuttleDescription: shuttleDescription,
      otherAmount1: otherAmount1,
      otherAmountDescription1: otherAmountDescription1,
      otherAmount2: otherAmount2,
      otherAmountDescription2: otherAmountDescription2,
      notes: notes,
      driverFK: driverFK,
      recruitedDriverFK: recruitedDriverFK,
      unitId: unitId,
      alternateNumber: alternateNumber,
    };
    dispatch(setDriversPayTabData(payTabData));
  }, [
    unitNumber,
    downtimeHours,
    downtimeRate,
    downtimeAmount,
    additionalMiles,
    mileageRate,
    mileageAmount,
    recruitingBonusAmount,
    recruitedDriver,
    shuttleAmount,
    shuttleDescription,
    otherAmount1,
    otherAmountDescription1,
    otherAmount2,
    otherAmountDescription2,
    notes,
    editFormData,
    driverFK,
    recruitedDriverFK,
    unitId,
    driverPayRequestsPK,
    alternateNumber,
  ]);
  const getAllUnitNumbers = (string) => {
    setDropdownLoading(true);
    PaymentRequestService.getAllUnitNumbersAuto(string)
      .then((response) => {
        const data = response.data.content;
        const unitNum = data?.map((units) => ({ ...units, unitNumber: units.unitNumber?.trim() }));
        setUnitData(unitNum);
      })
      .catch((error) => {})
      .finally(() => setDropdownLoading(false));
  };
  const getAllDispatchNumbers = (string) => {
    setDropdownLoading(true);
    PaymentRequestService.getAllUnitNumbersFromDispatchesAuto(string)
      .then((response) => {
        if (!response.data || !Array.isArray(response.data)) {
          setDispatchData([]);
          return;
        }

        const driverIdNum = Number(driverId); // Ensure it's a number
        const dispatchData = response.data
          .filter((units) => !!units?.UnitNumber) // Ensure UnitNumber exists
          .filter((units) => Number(units?.DriverFK) === driverIdNum) // Match DriverFK
          .map((units) => ({
            ...units,
            UnitNumber: units.UnitNumber?.trim(),
          }));

        setDispatchData(dispatchData);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setDispatchData([]);
      })
      .finally(() => setDropdownLoading(false));
  };

  const getAllDrivers = (string) => {
    setDropdownLoading(true);
    PaymentRequestService.getActiveDriver(0, string)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : response.data.content;
        const driver = data?.map((e) => ({
          ...e,
          fullName: `${e.firstName?.trim() || ""} ${e.lastName?.trim() || ""}`,
        }));
        setDriverData(driver);
      })
      .catch((error) => {
        console.error("Error fetching drivers: ", error);
      })
      .finally(() => setDropdownLoading(false));
  };

  const preventCharBeforeInput = (e) => {
    const char = e.data;
    if (!/[\d.-]/.test(char)) {
      e.preventDefault(); // Block anything other than digit, dot, or minus
    }
  };

  useEffect(() => {
    if (editFormData) {
      setUnitNumber(editFormData.UnitNumber || "");

      setDowntimeHours(editFormData.DowntimeHours || null);

      if (editFormData?.DriverDowntimeRate > 0) {
        setDowntimeRate(editFormData.DriverDowntimeRate !== undefined ? editFormData.DriverDowntimeRate : 0);
      } else {
        setDowntimeRate(editFormData.DowntimeRate !== undefined ? editFormData.DowntimeRate : 0);
      }

      setDowntimeAmount(editFormData.DowntimeAmount !== undefined ? editFormData.DowntimeAmount : 0);

      setAdditionalMiles(editFormData.AdditionalMiles || null);

      setMileageRate(editFormData.MileageRate !== undefined ? editFormData.MileageRate : 0);
      setMileageAmount(editFormData.MileageAmount !== undefined ? editFormData.MileageAmount : 0);
      setRecruitingBonusAmount(
        editFormData.RecruitingBonusAmount !== undefined ? editFormData.RecruitingBonusAmount : 0
      );

      setRecruitedDriver(editFormData?.RecruitedDriver || "");
      setRecruitedDriverFK(editFormData?.RecruitedDriverFK || null);

      setShuttleAmount(editFormData.ShuttleAmount || null);

      setShuttleDescription(editFormData?.ShuttleDescription || "");

      setOtherAmount1(editFormData?.OtherAmount1 || null);

      setOtherAmountDescription1(editFormData.OtherAmountDescription1 || "");

      setOtherAmount2(editFormData?.OtherAmount2 || null);

      setOtherAmountDescription2(editFormData.OtherAmountDescription2 || "");
      setNotes(editFormData.Notes || "");
      setDriverFK(driverId);
      dispatch(setUnitId(editFormData.unitFK));
      dispatch(setDriverPayRequestsPK(editFormData?.RecruitedDriverFK));
      setDriverInput(editFormData?.RecruitedDriver);
      dispatch(setDispatchId(editFormData.DispatchPK));
      setAlternateNumber(editFormData?.NonUnitReason);
    }
  }, [editFormData, changesCancelled, id]);

  useEffect(() => {
    if (location.pathname.includes("payment-requests-new")) {
      setShowFields(true);
    }
  }, [location]);

  useEffect(() => {
    const hours = parseFloat(downtimeHours) || 0;
    const rate = parseFloat(downtimeRate) || 0;
    setDowntimeAmount((hours * rate).toFixed(2));
  }, [downtimeHours, downtimeRate]);
  useEffect(() => {
    const hours = parseFloat(additionalMiles) || 0;
    const rate = parseFloat(mileageRate) || 0;
    setMileageAmount((hours * rate).toFixed(2));
  }, [additionalMiles, mileageRate]);

  useEffect(() => {
    const isDashOnly =
      shuttleAmount === "-" ||
      otherAmount1 === "-" ||
      otherAmount2 === "-" ||
      downtimeHours === "-" ||
      additionalMiles === "-";

    const isDotOnly =
      shuttleAmount === "." ||
      otherAmount1 === "." ||
      otherAmount2 === "." ||
      downtimeHours === "." ||
      additionalMiles === ".";

    if (
      ((shuttleAmount && shuttleDescription) ||
        otherAmount1 ||
        otherAmount2 ||
        additionalMiles ||
        downtimeHours ||
        (otherAmount1 && otherAmountDescription1) ||
        shuttleAmount ||
        otherAmount2 ||
        additionalMiles ||
        downtimeHours ||
        (otherAmount2 && otherAmountDescription2) ||
        shuttleAmount ||
        otherAmount1 ||
        additionalMiles ||
        downtimeHours ||
        otherAmount2 ||
        shuttleAmount ||
        otherAmount1 ||
        additionalMiles ||
        downtimeHours ||
        recruitingBonusAmount ||
        hasReimbursementAmount) &&
      (!shuttleAmount || shuttleDescription) &&
      (!otherAmount1 || otherAmountDescription1) &&
      (!otherAmount2 || otherAmountDescription2) &&
      (!shuttleDescription || shuttleAmount) &&
      (!otherAmountDescription1 || otherAmount1) &&
      (!otherAmountDescription2 || otherAmount2) &&
      (id || unitId || dispatchId || alternateNumber) &&
      (recruitingBonusAmount <= 0 || (recruitingBonusAmount && recruitedDriverFK)) &&
      !isDashOnly &&
      !isDotOnly
    ) {
      dispatch(setDriverpayTabValid(true));
    } else {
      dispatch(setDriverpayTabValid(false));
    }
  }, [
    shuttleAmount,
    shuttleDescription,
    otherAmount1,
    otherAmountDescription1,
    otherAmount2,
    otherAmountDescription2,
    otherAmount2,
    alternateNumber,
    dispatchId,
    unitId,
    driverInput,
    recruitedDriverFK,
    recruitingBonusAmount,
    downtimeHours,
    additionalMiles,
    hasReimbursementAmount,
  ]);

  useEffect(() => {
    if (recruitingBonusAmount === "" || recruitingBonusAmount === "") {
      setDriverInput("");
      setRecruitedDriverFK(null);
    }
  }, [recruitingBonusAmount, recruitedDriverFK]);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-10">
        <Col xs={12}>
          <Form.Group className="form-group mt-1 m-b-10 align-items-center row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              {id ? (
                <Form.Label className={"customColFormLabel"}>Unit Number</Form.Label>
              ) : (
                <Form.Label className={"customColFormLabel"}>Unit</Form.Label>
              )}
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
              {id ? (
                <input
                  id="alternatenumber"
                  name="alternatenumber"
                  type="text"
                  value={unitNumber}
                  maxLength={30}
                  onChange={(e) => {
                    setAlternateNumber(e.target.value);
                  }}
                  className={`customFormControl`}
                  autoComplete="new-password"
                  disabled={unitId !== null}
                />
              ) : (
                <>
                  <AutoCompleteDropdown
                    arrayList={unitData}
                    searchString={unitNumberInput}
                    renderItemId={(item) => item.unitPK}
                    renderItemField={(item) => item.unitNumber}
                    handleSearchString={(string) => setUnitNumberInput(string)}
                    selectedId={unitId}
                    fetchDataBySearchString={getAllUnitNumbers}
                    loading={dropdownLoading}
                    onSelect={handleUnitNumberSelection}
                    clearInputCallback={() => {
                      dispatch(setUnitId(null));
                      setDowntimeRate(0);
                      setDownTimeRateFromCustomer(0);
                    }}
                    disabled={viewDetail || alternateNumber !== "" || dispatchId}
                    className={`customFormControl ${
                      !viewDetail && (alternateNumber || unitId || dispatchId)
                        ? ""
                        : !viewDetail
                          ? "borderRed"
                          : ""
                    }`}
                  />
                  <LookupButton
                    onClick={() => setShowUnitSelectionLookup(true)}
                    disabled={viewDetail || alternateNumber !== "" || dispatchId}
                  />
                </>
              )}
            </Col>
          </Form.Group>

          {showFields && !viewDetail && (
            <>
              <Form.Group className="form-group mt-1 m-b-10 align-items-center row m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className={"customColFormLabel"}>Dispatch</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
                  <AutoCompleteDropdown
                    arrayList={dispatchData}
                    searchString={dispatchInput}
                    renderItemId={(item) => item.DispatchPK}
                    renderItemField={(item) => item.UnitNumber}
                    handleSearchString={(string) => setDispatchInput(string)}
                    selectedId={dispatchId}
                    fetchDataBySearchString={getAllDispatchNumbers}
                    loading={dropdownLoading}
                    onSelect={handleDispatchesSelection}
                    clearInputCallback={() => {
                      dispatch(setDispatchId(null));
                      setDowntimeRate(0);
                      setDownTimeRateFromCustomer(0);
                    }}
                    disabled={viewDetail || alternateNumber !== "" || unitId}
                    className={` customFormControl ${
                      !viewDetail && (alternateNumber || unitId || dispatchId)
                        ? ""
                        : !viewDetail
                          ? "borderRed"
                          : ""
                    }`}
                  />
                  <LookupButton
                    onClick={() => setShowDispatchSelectionLookup(true)}
                    disabled={viewDetail || alternateNumber !== "" || unitId}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3 mt-1 align-items-center row m-l-0 m-r-0">
                <Col xs={2} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Alternate Number</Form.Label>
                </Col>
                <Col xs={3} md={3} className="p-0">
                  <input
                    id="alternatenumber"
                    name="alternatenumber"
                    type="text"
                    value={alternateNumber}
                    maxLength={30}
                    onChange={(e) => {
                      setAlternateNumber(e.target.value);
                    }}
                    aria-autocomplete="list"
                    onBeforeInput={(e) => {
                      if (e.data === " " && e.target.value?.trim().length === 0) {
                        e.preventDefault();
                      }
                    }}
                    className={` customFormControl ${
                      !viewDetail && (alternateNumber || unitId || dispatchId)
                        ? ""
                        : !viewDetail
                          ? "borderRed"
                          : ""
                    }`}
                    autoComplete="off"
                    disabled={viewDetail || dispatchId || unitId}
                  />
                </Col>
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3  mt-1 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Down Time Hours</Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={5}
                value={downtimeHours ?? ""}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : downtimeHours && !isNaN(parseFloat(downtimeHours)) && parseFloat(downtimeHours) >= 0
                      ? "borderGreen"
                      : shuttleAmount ||
                          otherAmount2 ||
                          otherAmount1 ||
                          additionalMiles ||
                          recruitingBonusAmount ||
                          hasReimbursementAmount
                        ? ""
                        : "borderRed"
                }`}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const value = e.target.value;
                  const parsed = parseFloat(value);
                  if (!value || (value.match(/^\d*\.?\d*$/) && (isNaN(parsed) || parsed <= 32767))) {
                    setDowntimeHours(value);
                  }
                }}
                disabled={viewDetail}
              />
            </Col>
            <Col xs={1} className="">
              <Form.Label className="customColFormLabel">Rate per Hour</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                value={downtimeRate}
                className={`customFormControl`}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^\d{0,2}(\.\d{0,2})?$/;
                  if (regex.test(value)) {
                    setDowntimeRate(value);
                  }
                }}
                aria-autocomplete="list"
                disabled={
                  viewDetail || id || editFormData?.DriverDowntimeRate > 0 || downTimeRateFromCustomer > 0
                }
              />
            </Col>
            <Col xs={1} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Total</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={downtimeAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^\d{0,5}(\.\d{0,2})?$/;
                  if (regex.test(value)) {
                    setDowntimeAmount(value);
                  }
                }}
                aria-autocomplete="list"
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Additional Miles</Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={5}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : additionalMiles &&
                        !isNaN(parseFloat(additionalMiles)) &&
                        parseFloat(additionalMiles) >= 0
                      ? "borderGreen"
                      : shuttleAmount ||
                          otherAmount2 ||
                          otherAmount1 ||
                          downtimeHours ||
                          recruitingBonusAmount ||
                          hasReimbursementAmount
                        ? ""
                        : "borderRed"
                }`}
                value={additionalMiles ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const parsed = parseFloat(value);
                  if (!value || (value.match(/^\d*\.?\d*$/) && (isNaN(parsed) || parsed <= 32767))) {
                    setAdditionalMiles(value);
                  }
                }}
                aria-autocomplete="list"
                disabled={viewDetail}
              />
            </Col>
            <Col xs={1} className="">
              <Form.Label className="customColFormLabel">Rate per Mile</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={mileageRate}
                onChange={(e) => {
                  const value = e.target.value;

                  // Regular expression to match the pattern 12345.67 or 12345
                  const regex = /^\d{0,2}(\.\d{0,2})?$/;

                  // Check if the new value matches the pattern
                  if (regex.test(value)) {
                    setMileageRate(value);
                  }
                }}
                aria-autocomplete="list"
                disabled={viewDetail || id}
              />
            </Col>
            <Col xs={1} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Total</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={mileageAmount}
                onChange={(e) => {
                  const value = e.target.value;

                  const regex = /^\d{0,5}(\.\d{0,2})?$/;

                  if (regex.test(value)) {
                    setMileageAmount(value);
                  }
                }}
                aria-autocomplete="list"
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Recruiting Bonus</Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : recruitedDriverFK && recruitingBonusAmount > 0
                      ? "borderGreen"
                      : recruitingBonusAmount > 0 ||
                          downtimeHours ||
                          shuttleAmount ||
                          otherAmount2 ||
                          otherAmount1 ||
                          additionalMiles ||
                          hasReimbursementAmount
                        ? ""
                        : "borderRed"
                }`}
                value={recruitingBonusAmount}
                onChange={(e) => {
                  const value = e.target.value;

                  const regex = /^\d{0,5}(\.\d{0,2})?$/;

                  if (regex.test(value)) {
                    setRecruitingBonusAmount(value);
                  }
                }}
                onBeforeInput={(e) => {
                  const input = e.data;
                  const currentValue = e.target.value;

                  const regex = /^[0-9]*\.?[0-9]*$/;

                  if (!regex.test(currentValue + input)) {
                    e.preventDefault();
                  }
                }}
                aria-autocomplete="list"
                disabled={viewDetail}
              />
            </Col>

            <Col xs={1} className="p-0"></Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Recruited Driver</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
              <AutoCompleteDropdown
                arrayList={driverData}
                searchString={driverInput}
                renderItemId={(item) => item.driverPK}
                renderItemField={(item) => item.fullName}
                handleSearchString={(string) => setDriverInput(string)}
                selectedId={recruitedDriverFK}
                fetchDataBySearchString={getAllDrivers}
                loading={dropdownLoading}
                onSelect={handleDriverSelection}
                clearInputCallback={() => {
                  setRecruitedDriverFK(null);
                }}
                disabled={recruitingBonusAmount <= 0 || viewDetail}
                className={`${
                  viewDetail || recruitingBonusAmount <= 0
                    ? ""
                    : recruitedDriverFK === null && recruitingBonusAmount > 0
                      ? "borderRed"
                      : "borderGreen"
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Shuttle</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "100px" }}>
              <input
                type="text"
                maxLength={30}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : shuttleAmount && shuttleAmount !== "-" && shuttleAmount !== "." && shuttleDescription
                      ? "borderGreen"
                      : shuttleAmount
                        ? "borderRed"
                        : !(
                              otherAmount1 ||
                              otherAmount2 ||
                              additionalMiles ||
                              downtimeHours ||
                              recruitingBonusAmount ||
                              hasReimbursementAmount
                            )
                          ? "borderRed"
                          : ""
                }`}
                value={shuttleAmount ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setShuttleAmount(value);
                }}
                onBeforeInput={preventCharBeforeInput}
                aria-autocomplete="list"
                disabled={viewDetail}
              />
            </Col>
            <Col xs={1} className="">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={7} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : shuttleAmount && shuttleAmount !== "." && shuttleAmount !== "-" && shuttleDescription
                      ? "borderGreen"
                      : shuttleAmount || shuttleDescription
                        ? "borderRed"
                        : ""
                }`}
                value={shuttleDescription}
                onChange={(e) => {
                  setShuttleDescription(e.target.value);
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                autoComplete="off"
                aria-autocomplete="new-password"
                disabled={viewDetail || (!shuttleAmount && !shuttleDescription)}
                maxLength={60}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Other #1</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "100px" }}>
              <input
                type="text"
                maxLength={30}
                value={otherAmount1 ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setOtherAmount1(value);
                }}
                onBeforeInput={preventCharBeforeInput}
                aria-autocomplete="list"
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : otherAmount1 && otherAmount1 !== "-" && otherAmount1 !== "." && otherAmountDescription1
                      ? "borderGreen"
                      : otherAmount1
                        ? "borderRed"
                        : !(
                              shuttleAmount ||
                              otherAmount2 ||
                              additionalMiles ||
                              downtimeHours ||
                              recruitingBonusAmount ||
                              hasReimbursementAmount
                            )
                          ? "borderRed"
                          : ""
                }`}
                disabled={viewDetail}
              />
            </Col>
            <Col xs={1} className="">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={7} className="p-0">
              <input
                name="otherAmountDescription1"
                id="otherAmountDescription1"
                type="text"
                value={otherAmountDescription1}
                onChange={(e) => {
                  setOtherAmountDescription1(e.target.value);
                }}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : otherAmount1 && otherAmount1 !== "-" && otherAmount1 !== "." && otherAmountDescription1
                      ? "borderGreen"
                      : otherAmount1 || otherAmountDescription1
                        ? "borderRed"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || (!otherAmount1 && !otherAmountDescription1)}
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
              <Form.Label className={`customColFormLabel`}>Other #2</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "100px" }}>
              <input
                name="otherAmount2"
                id="otherAmount2"
                type="text"
                maxLength={8}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : otherAmount2 && otherAmount2 !== "-" && otherAmount2 !== "." && otherAmountDescription2
                      ? "borderGreen"
                      : otherAmount2
                        ? "borderRed"
                        : !(
                              shuttleAmount ||
                              otherAmount1 ||
                              additionalMiles ||
                              downtimeHours ||
                              recruitingBonusAmount ||
                              hasReimbursementAmount
                            )
                          ? "borderRed"
                          : ""
                }`}
                onBeforeInput={preventCharBeforeInput}
                value={otherAmount2 ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^-?\d*(\.\d{0,2})?$/;
                  if (!regex.test(value)) return;
                  const isNegative = value.startsWith("-");
                  const [intPart, decimalPart = ""] = value.replace("-", "").split(".");
                  const totalDigits = intPart.length + decimalPart.length;
                  const maxIntDigits = isNegative ? 4 : 5;

                  if (intPart.length > maxIntDigits || totalDigits > 7) return;
                  setOtherAmount2(value);
                }}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
              />
            </Col>
            <Col xs={1} className="">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={7} className="p-0">
              <input
                name="otherAmountDescription2"
                id="otherAmountDescription2"
                type="text"
                value={otherAmountDescription2}
                onChange={(e) => {
                  setOtherAmountDescription2(e.target.value);
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : otherAmount2 && otherAmount2 !== "-" && otherAmount2 !== "." && otherAmountDescription2
                      ? "borderGreen"
                      : otherAmount2 || otherAmountDescription2
                        ? "borderRed"
                        : ""
                }`}
                autoComplete="off"
                aria-autocomplete="new-password"
                disabled={viewDetail || (!otherAmount2 && !otherAmountDescription2)}
                maxLength={60}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3  mt-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0 d-flex align-self-start">
              <Form.Label className={`customColFormLabel`}>Notes</Form.Label>
            </Col>

            <Col xs={9} className="p-0">
              <textarea
                name="notes"
                id="notes"
                style={{ width: "100%" }}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
                rows="8"
                className={`customFocusClass `}
                maxLength={300}
                disabled={viewDetail}
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <UnitSelectionLookup
        MaintenanceProgram
        show={showUnitSelectionLookup}
        onHide={() => setShowUnitSelectionLookup(false)}
        handleLookupSelection={handleUnitNumberSelection}
      />

      <DispatchesLookup
        MaintenanceProgram
        renderItemId={(item) => item?.DispatchPK}
        show={showDispatchSelectionLookup}
        onHide={() => setShowDispatchSelectionLookup(false)}
        handleLookupSelection={handleDispatchesSelection}
      />
    </div>
  );
};

export default DriversPayTab;
