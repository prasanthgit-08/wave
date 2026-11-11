import { parseLocalDate } from "../../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../../common/DateInputField";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsDatesTabValid, setSaveFormData } from "../../../../../../redux/DriverMaintenanceSlice";
import DriverService from "../../../../../../services/DriverService";
import { useParams } from "react-router-dom";
import Input from "../../../../../../components/common/input";
import { getEnum } from "../../../../../../utils/enumUtils";
const DatesTab = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const [lastSafety, setLastSafety] = useState("");
  const [isLastSafetyValidation, setIsLastSafetyValidation] = useState(true);
  const [nextSafety, setNextSafety] = useState("");
  const [safetyCertificateNumber, setSafetyCertificateNumber] = useState("");
  const [annualReview, setAnnualReview] = useState("");
  const [isAnnualReviewDateValidation, setIsAnnualReviewDateValidation] = useState(true);
  const [isExpirationDateValidation, setIsExpirationDateValidation] = useState(true);
  const [dotPhysicalExpirationDate, setDotPhysicalExpirationDate] = useState("");
  const [lastMVR, setLastMVR] = useState("");
  const [isLastMVRValidation, setIsLastMVRValidation] = useState(true);
  const [driversLicenseNumber, setDriversLicenseNumber] = useState("");
  const [driversLicenseExpiration, setDriversLicenseExpiration] = useState("");
  const [isLicenseExpirationValidation, setIsLicenseExpirationValidation] = useState(true);
  const [driversLicenseState, setDriversLicenseState] = useState("");
  const [driverStateCodeExist, setDriverStateCodeExist] = useState(true);
  const [driversLicenseType, setDriversLicenseType] = useState("");
  const [licensePEndorsment, setLicensePEndorsment] = useState(false);
  const [lastSimulator, setLastSimulator] = useState("");
  const [isLastSimulatorValidation, setIsLastSimulatorValidation] = useState(true);
  const [nextSimulator, setNextSimulator] = useState("");
  const [lastDispatchedByUserFK, setLastDispatchedByUserFK] = useState("");
  const [lastDispatchedByInput, setLastDispatchedByInput] = useState("");
  const [lastDispatchDate, setLastDispatchDate] = useState("");
  const [lastDeliveryDate, setLastDeliveryDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [isAvailableDateValidation, setIsAvailableDateValidation] = useState(true);
  const [availableNotes, setAvailableNotes] = useState("");
  const [plateNumber1, setPlateNumber1] = useState("");
  const [plateNumber2, setplateNumber2] = useState("");
  const [plateState1, setPlateState1] = useState("");
  const [plateState2, setPlateState2] = useState("");
  const [plateState1Exist, setPlateState1Exist] = useState(true);
  const [plateState2Exist, setPlateState2Exist] = useState(true);
  const [plateExpirationDate1, setPlateExpirationDate1] = useState("");
  const [isPlateExpirationDate1Validation, setIsPlateExpirationDate1Validation] = useState(true);
  const [plateExpirationDate2, setPlateExpirationDate2] = useState("");
  const [isPlateExpirationDate2Validation, setIsPlateExpirationDate2Validation] = useState(true);
  const [isDateValidation, setIsDateValidation] = useState(true);
  const [licenseDEndorsment, setLicenseDEndorsment] = useState(false);
  const [licenseTEndorsment, setLicenseTEndorsment] = useState(false);
  const [isNextSimulatorValidation, setIsNextSimulatorValidation] = useState(true);
  const [isNextSafetyValidation, setIsNextSafetyValidation] = useState(true);
  const driverHireDate = useSelector((state) => state.driverMaintenanceReducer.driverHireDate);
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const companyData = useSelector((state) => state.driverMaintenanceReducer.companyData);
  const motorizedDriver = useSelector((state) => state.driverMaintenanceReducer.motorizedDriver);
  const driverActive = useSelector((state) => state.driverMaintenanceReducer.driverActive);
  const driverFlatbed = useSelector((state) => state.driverMaintenanceReducer.driverFlatbed);
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const displayFlag = useSelector((state) => state.driverMaintenanceReducer.displayFlag);

  const licenseTypeData = getEnum("licenseType");

  const setDatesTabData = (formData, source) => {
    setLastSafety(formData?.lastSafety || "");
    setNextSafety(formData?.nextSafety || "");
    setSafetyCertificateNumber(formData?.safetyCertificateNumber?.trim() || "");
    setAnnualReview(formData?.annualReview || "");
    setDotPhysicalExpirationDate(formData?.dotPhysicalExpirationDate || "");
    setLastMVR(formData?.lastMVR || "");
    setDriversLicenseNumber(formData?.driversLicenseNumber || "");
    setDriversLicenseExpiration(formData?.driversLicenseExpiration || "");
    setDriversLicenseState(formData?.driversLicenseState?.trim() || "");
    setDriversLicenseType(formData?.driversLicenseType?.trim() || "");
    setLicensePEndorsment(formData?.licensePEndorsment || false);
    setLicenseDEndorsment(formData?.licenseDEndorsment || false);
    setLicenseTEndorsment(formData?.licenseTEndorsment || false);
    setLastSimulator(formData?.lastSimulator || "");
    setNextSimulator(formData?.nextSimulator || "");
    setLastDispatchedByUserFK(formData?.lastDispatchedByUserFK);
    setLastDispatchDate(formData?.lastDispatchDate || "");
    setLastDeliveryDate(formData?.lastDeliveryDate || "");
    setAvailableDate(formData?.availableDate || "");
    setAvailableNotes(formData?.availableNotes || "");
    setPlateNumber1(formData?.plateNumber1?.trim() || "");
    setplateNumber2(formData?.plateNumber2?.trim() || "");
    setPlateExpirationDate1(formData?.plateExpirationDate1 || "");
    setPlateExpirationDate2(formData?.plateExpirationDate2 || "");
    setPlateState1(formData?.plateState1?.trim() || "");
    setPlateState2(formData?.plateState2?.trim() || "");
  };
  useEffect(() => {
    if (viewDetail && editFormData != null) {
      setDatesTabData(editFormData, "backend");
      setLastDispatchedByInput(editFormData?.driverFileData?.LastDispatchedByUserName?.trim() || null);
    }
    if (!viewDetail && saveFormData !== null && displayFlag) {
      setDatesTabData(saveFormData, "frontend");
      setLastDispatchedByInput(saveFormData?.lastDispatchedByInput?.trim());
    }
  }, [editFormData, viewDetail, displayFlag]);

  const dateTabData = () => {
    dispatch(
      setSaveFormData({
        lastSafety: lastSafety,
        nextSafety: nextSafety,
        safetyCertificateNumber: safetyCertificateNumber,
        annualReview: annualReview,
        dotPhysicalExpirationDate: dotPhysicalExpirationDate,
        lastMVR: lastMVR,
        driversLicenseNumber: driversLicenseNumber,
        driversLicenseExpiration: driversLicenseExpiration,
        driversLicenseState: driversLicenseState,
        driversLicenseType: driversLicenseType,
        licensePEndorsment: licensePEndorsment,
        licenseDEndorsment: licenseDEndorsment,
        licenseTEndorsment: licenseTEndorsment,
        lastSimulator: lastSimulator,
        nextSimulator: nextSimulator,
        lastDeliveryDate: lastDeliveryDate,
        lastDispatchDate: lastDispatchDate,
        availableDate: availableDate,
        availableNotes: availableNotes,
        plateNumber1: plateNumber1,
        plateNumber2: plateNumber2,
        plateExpirationDate1: plateExpirationDate1,
        plateExpirationDate2: plateExpirationDate2,
        plateState1: plateState1,
        plateState2: plateState2,
        lastDispatchedByUserFK: lastDispatchedByUserFK,
        lastDispatchedByInput,
      })
    );
  };
  useEffect(() => {
    dateTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lastSafety,
    nextSafety,
    safetyCertificateNumber,
    annualReview,
    dotPhysicalExpirationDate,
    lastMVR,
    driversLicenseNumber,
    driversLicenseExpiration,
    licensePEndorsment,
    lastSimulator,
    nextSimulator,
    lastDispatchDate,
    lastDispatchedByUserFK,
    lastDeliveryDate,
    availableDate,
    availableNotes,
    plateNumber2,
    plateNumber1,
    plateExpirationDate1,
    plateExpirationDate2,
    driversLicenseState,
    driversLicenseType,
    licenseTEndorsment,
    licenseDEndorsment,
    plateState1,
    plateState2,
    lastDispatchedByInput,
  ]);

  /**
   * used for Claering values
   */
  useEffect(() => {
    if (saveFormData?.mootorized === false) {
      setLicensePEndorsment(false);
      setLicenseDEndorsment(false);
      setLicenseTEndorsment(false);
    }
  }, [saveFormData?.mootorized]);

  /**
   * used for Setting Dates
   */
  useEffect(() => {
    if (!id) {
      setLastSafety(driverHireDate);
      if (companyData !== null && companyData?.daysToNextSafety) {
        const nextSafetyDate = calculateNextDate(driverHireDate, companyData?.daysToNextSafety);
        setNextSafety(nextSafetyDate);
      }
    }
  }, [id, driverHireDate, companyData]);

  useEffect(() => {
    if (!id && !lastSimulator) {
      if (companyData?.daysToNextSafety) {
        const nextDate = calculateNextDate(driverHireDate, companyData?.daysToNextSafety / 2);

        setNextSimulator(nextDate);
      }
    }
  }, [id, lastSimulator, driverHireDate, companyData]);

  function calculateNextDate(lastDate, daysToNext) {
    if (!lastDate) return "";
    const lastDateObj = parseLocalDate(lastDate);
    const nextDateObj = parseLocalDate(lastDateObj);
    nextDateObj.setDate(nextDateObj.getDate() + daysToNext);
    const year = nextDateObj.getFullYear();
    const month = String(nextDateObj.getMonth() + 1).padStart(2, "0");
    const day = String(nextDateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /**
   * used to check State Code exist or not
   */
  const checkStateCodeExistOrNot = (driversLicenseState) => {
    DriverService.checkStateCodeExist(driversLicenseState)
      .then((response) => {
        setDriverStateCodeExist(response.data);
      })
      .catch((err) => {
        setDriverStateCodeExist(false);
      });
  };

  const checkPlateState1Exist = (plateState1) => {
    DriverService.checkStateCodeExist(plateState1)
      .then((response) => {
        setPlateState1Exist(response.data);
      })
      .catch((err) => {
        setPlateState1Exist(false);
      });
  };

  const checkPlateState2Exist = (plateState2) => {
    DriverService.checkStateCodeExist(plateState2)
      .then((response) => {
        setPlateState2Exist(response.data);
      })
      .catch((err) => {
        setPlateState2Exist(false);
      });
  };

  /**
   * used forTab validation
   */
  useEffect(() => {
    const isPlateNumber1Required = driverActive && !driverFlatbed;

    if (
      isNextSafetyValidation &&
      isNextSimulatorValidation &&
      isLastSafetyValidation &&
      annualReview &&
      isAnnualReviewDateValidation &&
      isAvailableDateValidation &&
      isLastMVRValidation &&
      isLastSimulatorValidation &&
      isExpirationDateValidation &&
      isPlateExpirationDate1Validation &&
      isPlateExpirationDate2Validation &&
      isLicenseExpirationValidation &&
      dotPhysicalExpirationDate &&
      driversLicenseNumber &&
      driversLicenseState &&
      driverStateCodeExist &&
      driversLicenseExpiration &&
      driversLicenseType &&
      plateNumber1 &&
      plateState1Exist &&
      plateState2Exist &&
      ((isPlateNumber1Required &&
        plateNumber1 &&
        plateExpirationDate1 &&
        ((plateNumber2 && plateExpirationDate2) || (!plateNumber2 && !plateExpirationDate2))) ||
        (!isPlateNumber1Required &&
          ((!plateNumber1 && !plateExpirationDate1 && !plateExpirationDate2 && !plateNumber2) ||
            (plateNumber1 &&
              plateExpirationDate1 &&
              ((plateNumber2 && plateExpirationDate2) || (!plateNumber2 && !plateExpirationDate2))))))
    ) {
      dispatch(setIsDatesTabValid(true));
    } else {
      dispatch(setIsDatesTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLastSafetyValidation,
    isAnnualReviewDateValidation,
    isLicenseExpirationValidation,
    annualReview,
    driverStateCodeExist,
    dotPhysicalExpirationDate,
    driversLicenseNumber,
    driversLicenseState,
    driversLicenseExpiration,
    driversLicenseType,
    driverActive,
    driverFlatbed,
    plateNumber1,
    plateExpirationDate1,
    plateExpirationDate2,
    plateNumber2,
    isAnnualReviewDateValidation,
    isAvailableDateValidation,
    isExpirationDateValidation,
    isLastMVRValidation,
    isLastSafetyValidation,
    isPlateExpirationDate1Validation,
    isPlateExpirationDate2Validation,
    isLicenseExpirationValidation,
    isLastSimulatorValidation,
    plateState1Exist,
    plateState2Exist,
    isNextSafetyValidation,
    isNextSimulatorValidation,
  ]);

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Last Safety</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={lastSafety}
                setIsDateValid={setIsLastSafetyValidation}
                setDate={(value) => {
                  setLastSafety(value);
                  if (companyData !== null && companyData?.daysToNextSafety) {
                    const nextSafetyDate = calculateNextDate(value, companyData?.daysToNextSafety);
                    setNextSafety(nextSafetyDate);
                  }
                }}
                disabled={viewDetail}

                className={`customFormControl ${
                  viewDetail === true ? "" : isLastSafetyValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Next Safety</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={nextSafety}
                setDate={setNextSafety}
                disabled={viewDetail}
                setIsDateValid={setIsNextSafetyValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isNextSafetyValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Safety Certificate Number</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyCertificateNumber}
                maxLength={30}
                disabled={viewDetail}
                onChange={(e) => {
                  setSafetyCertificateNumber(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Annual Review</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={annualReview}
                setIsDateValid={setIsAnnualReviewDateValidation}
                setDate={setAnnualReview}
                disabled={viewDetail}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : annualReview !== "" && isAnnualReviewDateValidation
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">DOT Physical Expiration</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={dotPhysicalExpirationDate}
                setIsDateValid={setIsExpirationDateValidation}
                setDate={setDotPhysicalExpirationDate}
                disabled={viewDetail}
                min={!id ? new Date() : null}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : dotPhysicalExpirationDate && isExpirationDateValidation
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Last MVR</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={lastMVR}
                setDate={setLastMVR}
                disabled={viewDetail}
                setIsDateValid={setIsLastMVRValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isLastMVRValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Driver License Number</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <Input
                id="customer"
                name="customer"
                type="customer"
                value={driversLicenseNumber}
                maxLength={30}
                onChange={(e) => {
                  setDriversLicenseNumber(e.target.value);
                }}
                disabled={viewDetail}
                className={`customFormControl ${
                  viewDetail === true ? "" : driversLicenseNumber !== "" ? "borderGreen" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Driver License State</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-30px">
              <Input
                className={`customFormControl l ${
                  viewDetail === true
                    ? ""
                    : driversLicenseState?.length === 2 && driverStateCodeExist
                      ? "borderGreen"
                      : "borderRed"
                }`}
                name="extn"
                value={driversLicenseState?.toUpperCase()}
                maxLength={2}
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.value;
                  setDriverStateCodeExist(false);
                  setDriversLicenseState(e.target.value);

                  if (value.length === 2) {
                    checkStateCodeExistOrNot(value);
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Driver License Expiration</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={driversLicenseExpiration}
                setIsDateValid={setIsLicenseExpirationValidation}
                setDate={setDriversLicenseExpiration}
                disabled={viewDetail}
                min={!id ? new Date() : null}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : driversLicenseExpiration && isLicenseExpirationValidation
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Driver License Type</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Form.Select
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : driversLicenseType && driversLicenseType?.match(/^(CDLA|CDLB|Operator|Chauffeur)$/)
                      ? "borderGreen"
                      : "borderRed"
                }`}
                name="creditCardPayments"
                disabled={viewDetail}
                value={driversLicenseType}
                onChange={(e) => {
                  setDriversLicenseType(e.target.value);
                }}
              >
                <option value="">--Select--</option>
                {licenseTypeData?.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Passenger Endorsement</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                disabled={viewDetail || !motorizedDriver}
                value={licensePEndorsment}
                checked={licensePEndorsment}
                onChange={(e) => {
                  setLicensePEndorsment(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Double Combination Endorsement</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                disabled={viewDetail || !motorizedDriver}
                value={licenseDEndorsment}
                checked={licenseDEndorsment}
                onChange={(e) => {
                  setLicenseDEndorsment(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Triple Combination Endorsement</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                disabled={viewDetail || !motorizedDriver}
                value={licenseTEndorsment}
                checked={licenseTEndorsment}
                onChange={(e) => {
                  setLicenseTEndorsment(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={8} md={8} xs={8} className="ps-lg-2">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col xs={2} md={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Last Simulator</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-98px">
              <DateInputField
                date={lastSimulator}

                setDate={(value) => {
                  setLastSimulator(value);

                  if (companyData?.daysToNextSafety != null) {
                    const date = calculateNextDate(value, companyData.daysToNextSafety);
                    setNextSimulator(date);
                  }
                }}

                disabled={viewDetail}
                setIsDateValid={setIsLastSimulatorValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isLastSimulatorValidation ? "" : "borderRed"
                }`}
              />
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0"></Col>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Transport Plate#1</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail || (!driverActive && driverFlatbed)
                    ? ""
                    : (driverActive && !driverFlatbed && !plateNumber1) || !plateNumber1
                      ? "borderRed"
                      : ""
                } `}
                id="customer"
                name="customer"
                type="customer"
                value={plateNumber1}
                maxLength={10}
                disabled={viewDetail}

                onChange={(e) => {
                  const value = e.target.value;
                  setPlateNumber1(value);
                  if (!value) {
                    setPlateExpirationDate1("");
                    setPlateState1("");
                  }
                }}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-r-0 w-40px">
              <Input
                className={`customFormControl ${
                  !viewDetail ? (!plateState1 || (plateState1 && plateState1Exist) ? "" : "borderRed") : ""
                }`}
                name="extn"
                value={plateState1?.toUpperCase()}
                maxLength={2}
                disabled={viewDetail || !plateNumber1}
                onChange={(e) => {
                  const value = e.target.value;
                  setPlateState1(value);

                  if (value.length === 2) {
                    checkPlateState1Exist(value);
                  } else {
                    setPlateState1Exist(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => {
                    if (!plateState1Exist) {
                      setPlateState1("");
                      setPlateState1Exist(true);
                    }
                  }, 0);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Next Simulator</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-98px">
              <DateInputField
                date={nextSimulator}
                setDate={setNextSimulator}
                disabled={viewDetail}

                setIsDateValid={setIsNextSimulatorValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isNextSimulatorValidation ? "" : "borderRed"
                }`}
              />
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0"></Col>

            <Col sm={2} md={2} xs={2} className="p-0 ">
              <Form.Label className="col-form-label dealer-label ">Plate#1 Expiration</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-98px">
              <DateInputField
                date={plateExpirationDate1}
                setIsDateValid={setIsPlateExpirationDate1Validation}
                setDate={setPlateExpirationDate1}
                disabled={viewDetail || !plateNumber1}
                className={`customFormControl ${
                  viewDetail || !plateNumber1
                    ? ""
                    : plateNumber1 && plateExpirationDate1 && isPlateExpirationDate1Validation
                      ? ""
                      : "borderRed"
                } `}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-98px">
              <input type="checkbox" className="form-check-input p-0 " hidden={id || !id} />
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0"></Col>

            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Transport Plate#2</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail ? "" : !plateNumber2 && plateExpirationDate2 ? "borderRed" : ""
                } `}
                id="customer"
                name="customer"
                type="customer"
                value={plateNumber2}
                maxLength={10}
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.value;
                  setplateNumber2(value);
                  if (!value) {
                    setPlateExpirationDate2("");
                    setPlateState2("");
                  }
                }}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-r-0 w-40px">
              <Input
                className={`customFormControl ${
                  !viewDetail ? (!plateState2 || (plateState2Exist && plateState2) ? "" : "borderRed") : ""
                }`}
                name="extn"
                value={plateState2?.toUpperCase()}
                maxLength={2}
                disabled={viewDetail || !plateNumber2}
                onChange={(e) => {
                  const value = e.target.value;
                  setPlateState2(value);

                  if (value.length === 2) {
                    checkPlateState2Exist(value);
                  } else {
                    setPlateState2Exist(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => {
                    if (!plateState2Exist) {
                      setPlateState2("");
                      setPlateState2Exist(true);
                    }
                  }, 0);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-98px">
              <input type="checkbox" className="form-check-input p-0 " hidden={id || !id} />
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0"></Col>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plate#2 Expiration</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-98px">
              <DateInputField
                date={plateExpirationDate2}
                setIsDateValid={setIsPlateExpirationDate2Validation}
                setDate={setPlateExpirationDate2}
                disabled={viewDetail || !plateNumber2}
                className={`customFormControl ${
                  viewDetail || !plateNumber2
                    ? ""
                    : plateNumber2 && plateExpirationDate2 && isPlateExpirationDate2Validation
                      ? ""
                      : "borderRed"
                } `}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 m-t-100">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Last Dispatch By</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={lastDispatchedByInput}
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Last Dispatch Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={lastDispatchDate} setDate={setLastDispatchDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Last Delivery Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={lastDeliveryDate} setDate={setLastDeliveryDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Available Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={availableDate}
                setDate={setAvailableDate}
                disabled={viewDetail}
                setIsDateValid={setIsAvailableDateValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isAvailableDateValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <label className="col-form-label dealer-label  ">Available Notes</label>
            </Col>

            <Col sm={9} md={9} className="p-0 ">
              <textarea
                rows={8}
                cols={6}
                type="text"
                className="customFormControl h-100 "
                name="notes"
                value={availableNotes}
                autoComplete="newpassword"
                aria-autocomplete="none"
                disabled={viewDetail}
                onInput={(e) => setAvailableNotes(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default DatesTab;
