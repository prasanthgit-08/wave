import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import {
  setDelayDate,
  setDelayedUnitCodeID,
  setDelayedUnitCodeInput,
  setReported,
  setSendNotificationEmails,
  setSendUpdateEmails,
  setNewGenerlTabValid,
  setSaveFormData,
} from "../../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";

import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import DateInputField from "../../../../../common/DateInputField";

import LookupButton from "../../../../../common/LookupButton";
import DelayUnitCodeLookup from "../../../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
import { PermissionKeyGeneratorUtil } from "../../../../../../utils/PermissionKeyGeneratorUtil";
import { formatDatetimeToDate } from "../../../../../../utils/dateUtils";
const General = () => {
  const { companyName, driverfk, unitfk } = useParams();
  const [showLookup, setShowLookup] = useState(false);
  const delayedUnitCodeID = useSelector((state) => state.delayProcessing.delayedUnitCodeID);
  const delayedUnitCodeInput = useSelector((state) => state.delayProcessing.delayedUnitCodeInput);
  const reportedDate = useSelector((state) => state.delayProcessing.reported);
  const delayDate = useSelector((state) => state.delayProcessing.delayDate);
  const [delayUnitCodeArray, setDelayUnitCodeArray] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const [delayPeriod, setDelayPeriod] = useState("AM"); // Default to AM
  const [reportPeriod, setReportPeriod] = useState("AM"); // Default to AM

  const [sendUpdateOfNotificationEmail, setSendUpdateOfNotificationEmail] = useState(false);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const [newDelayData, setNewDelayData] = useState(null);
  const [lastLocation, setLastLocation] = useState("");
  const [lastLocationCity, setLastLocationCity] = useState("");
  const [lastLocationStateCode, setLastLocationStateCode] = useState("");
  const [currentLocaionName, setCurrentLocaionName] = useState("");
  const [currentLocaionAddress1, setCurrentLocaionAddress1] = useState("");
  const [currentLocaionAddress2, setCurrentLocaionAddress2] = useState("");
  const [contact, setContact] = useState();
  const [phone, setPhone] = useState();
  const [postalcode, setPostalCode] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [canadian, setCanadian] = useState(false);
  const [atDelivery, setAtDelivery] = useState(false);
  const [atLastLOcation, setAtLastLOcation] = useState(false);
  const [selectedDelayDate, setSelectedDelayDate] = useState(formatDatetimeToDate(new Date()));
  const [isSelectedDelayDateValid, setIsSelectedDelayDateValid] = useState(true);

  const [selectedDelayTime, setSelectedDelayTime] = useState();
  const [selectedReportDate, setSelectedReportDate] = useState(formatDatetimeToDate(new Date()));
  const [isSelectedReportDateValid, setIsSelectedReportDateValid] = useState(true);
  const [selectedReportTime, setSelectedReportTime] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const unitConfirmationData = useSelector((state) => state.delayProcessing.unitConfirmationData);
  const [sendNotificationEmail, setSendNotificationEmail] = useState(true);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("DELAYNEW", "new");
  const [hasEmailSendPermission, setHasEmailSendPermission] = useState(false);
  //used for custom delay unitcode lookup
  const pageNumber = useSelector((state) => state.delayCodeUnitLookupReducer.pageNumber);
  const normalSortFlag = useSelector((state) => state.delayCodeUnitLookupReducer.normalSortFlag);
  const normalSortValue = useSelector((state) => state.delayCodeUnitLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.delayCodeUnitLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.delayCodeUnitLookupReducer.searchTerms);

  /**Validation city,state,zip */
  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
  });

  /** Delayunitcode autocomplete**/
  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setShowLookup(false);
    dispatch(setDelayedUnitCodeInput(delayUnitCode.description?.trim()));
    dispatch(setDelayedUnitCodeID(delayUnitCode.delayedUnitCodePK));
  };

  const handleLookup = () => {
    setShowLookup(true);
  };

  const fetchDelayedUnitCode = (string) => {
    setIsLoading(true);
    DelayProcessingService.getAutoCompleteForDelayUnitCodes(string, companyName, null)
      .then((response) => {
        const data = response?.data;
        const listingData = data?.filter((item) => item.Type !== "Pagination");

        setDelayUnitCodeArray(listingData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  /** Used to set Time**/
  function combineDateAndTime(dateInput, timeInput, period) {
    // Handle if dateInput is a full ISO string (e.g. 2025-07-31T09:00:00Z)
    let dateStr = typeof dateInput === "string" ? dateInput?.split("T")[0] : "";

    // Handle if timeInput is a full ISO or contains timezone (e.g. 12:04:00Z or 12:04:00+05:30)
    let timeStr = "";
    if (typeof timeInput === "string") {
      // Remove everything after seconds (like Z or +05:30)
      timeStr = timeInput
        .split("T")
        .pop()
        .split(/Z|\+|\-/)[0]; // Gets just HH:mm or HH:mm:ss
    }

    // Default to seconds precision
    if (timeStr && timeStr?.length <= 5) {
      timeStr += ":00";
    }

    let [hr, min, sec] = timeStr?.split(":")?.map(Number) || [];
    if (period === "PM" && hr < 12) {
      hr += 12;
    } else if (period === "AM" && hr === 12) {
      hr = 0;
    }

    // Pad hours and reconstruct time
    const hrStr = String(hr).padStart(2, "0");
    const finalTime = `${hrStr}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.000`;

    // Combine date and time
    const combined = `${dateStr} ${finalTime}`;
    return combined;
  }

  /** used to get delay new tabs**/

  const getNewDelayDetails = () => {
    setLoading(true);
    DelayProcessingService.fetchNewDelayDetails(unitfk, "general", companyName, 0, 10, "", false)
      .then((response) => {
        const data = response?.data[0];
        setNewDelayData(data);
        setPhone(data?.Phone != null ? formatPhoneNumber(data?.Phone) : "");
        setContact(data?.Contact?.trim());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (unitfk) {
      getNewDelayDetails();
    }
  }, [unitfk]);

  /**general tab validation**/
  useEffect(() => {
    const isTimeValid =
      selectedDelayTime &&
      typeof selectedDelayTime === "string" &&
      selectedDelayTime?.trim() !== "" &&
      /^([0]?[1-9]|1[0-2]):[0-5][0-9]$/.test(selectedDelayTime);

    const isReportTimeValid =
      selectedReportTime &&
      typeof selectedReportTime === "string" &&
      selectedReportTime?.trim() !== "" &&
      /^([0]?[1-9]|1[0-2]):[0-5][0-9]$/.test(selectedReportTime);
    if (
      delayedUnitCodeInput &&
      delayedUnitCodeID &&
      selectedDelayDate &&
      isSelectedDelayDateValid &&
      selectedReportDate &&
      isSelectedReportDateValid &&
      isTimeValid &&
      isReportTimeValid &&
      contact &&
      phone &&
      phone?.length === 14 &&
      (atLastLOcation ||
        atDelivery ||
        (!atLastLOcation && !atDelivery && currentLocaionName && currentLocaionAddress1 && postalCodePK))
    ) {
      dispatch(setNewGenerlTabValid(true));
    } else {
      {
        dispatch(setNewGenerlTabValid(false));
      }
    }
  }, [
    selectedDelayTime,
    selectedReportTime,
    delayedUnitCodeID,
    delayedUnitCodeInput,
    selectedDelayDate,
    isSelectedDelayDateValid,
    selectedReportDate,
    isSelectedReportDateValid,
    contact,
    atLastLOcation,
    atDelivery,
    currentLocaionName,
    currentLocaionAddress1,
    city,
    phone,
    statecode,
    postalCodePK,
  ]);

  /**general tab payload**/
  const generalTabData = () => {
    dispatch(
      setSaveFormData({
        unitFK: unitfk,
        delayedUnitFK: null,
        delayedUnitCodeFK: delayedUnitCodeID,
        delayInHouseNotes: null,
        delayCustomerNotes: null,
        delayContactPhone: null,
        delayContact: null,
        delayContactExtension: null,
        delayContactFax: null,
        delayDate: delayDate,
        bodyText: null,
        currentLocationName: currentLocaionName,
        currentLocationAddress1: currentLocaionAddress1,
        currentLocationAddress2: currentLocaionAddress2,
        currentLocationCity: city,
        currentLocationState: statecode,
        currentLocationPostal: postalcode,
        phone: phone?.replace(/\s+/g, ""),
        contact: contact,
        delayUnitLocationFK: null,
        workingUnitLocationFK: null,
        inYard: false,
        reported: reportedDate,
        dispatchFK: newDelayData?.DispatchPK,
        sendNotificationEmail: sendNotificationEmail,
        atPickup: false,
        hasEmailSendPermission: hasEmailSendPermission,
        atLastLocation: atLastLOcation,
        atDelivery: atDelivery,
      })
    );
  };

  useEffect(() => {
    generalTabData();
  }, [
    newDelayData,
    hasEmailSendPermission,
    delayedUnitCodeID,
    delayedUnitCodeInput,
    selectedDelayDate,
    isSelectedDelayDateValid,
    selectedReportDate,
    isSelectedReportDateValid,
    contact,
    phone,
    atLastLOcation,
    atDelivery,
    currentLocaionName,
    currentLocaionAddress1,
    currentLocaionAddress2,
    city,
    statecode,
    postalCodePK,
    sendNotificationEmail,
    delayDate,
    reportedDate,
    unitfk,
    postalcode,
  ]);

  /****/
  const isValid12HourTime = (date, time) => Boolean(date && /^([0]?[1-9]|1[0-2]):[0-5][0-9]$/.test(time));

  // ——— Initialize default time & period ———
  useEffect(() => {
    const now = new Date();
    let hrs = now.getHours();
    const mins = now.getMinutes();
    const pm = hrs >= 12 ? "PM" : "AM";
    if (hrs === 0) hrs = 12;
    else if (hrs > 12) hrs -= 12;
    const fmt = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

    setSelectedDelayTime(fmt);
    setDelayPeriod(pm);
    setSelectedReportTime(fmt);
    setReportPeriod(pm);
    dispatch(setDelayDate(combineDateAndTime(selectedDelayDate, fmt, pm)));
    dispatch(setReported(combineDateAndTime(selectedReportDate, fmt, pm)));
  }, []);

  const insertColonAfterTwoDigits = (input) => {
    if (!input || input?.includes(":")) return input;

    const cleaned = input?.replace(/\D/g, "");

    if (cleaned?.length <= 2) return cleaned;
    if (cleaned?.length <= 4) {
      return `${cleaned?.slice(0, 2)}:${cleaned?.slice(2)}`;
    }

    return cleaned?.slice(0, 2) + ":" + cleaned?.slice(2, 4); // truncate anything beyond 4 digits
  };

  //check permission
  useEffect(() => {
    if (deniedPermissions) {
      setHasEmailSendPermission(!deniedPermissions?.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);

  return (
    <Formik
      initialValues={{
        city,
        statecode,
        postalcode,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        city: true,
        statecode: true,
        postalcode: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div>
            <Row className="m-0 p-0">
              <Col sm={6} md={6} xs={6}>
                <Form.Group className="mt-1 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Driver</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="driverName"
                      value={newDelayData?.Driver?.trim()}
                      name="driverName"
                      maxLength={30}
                      disabled
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                {/* Empty Tag for styling */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
                  <Col xs={8} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Unit Number</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={newDelayData?.UnitNumber?.trim()}
                      id="description"
                      name="description"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Model</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="model"
                      value={newDelayData?.Model?.trim()}
                      name="model"
                      maxLength={30}
                      disabled
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> VIN</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={newDelayData?.VIN?.trim()}
                      id="vin"
                      name="vin"
                      maxLength={30}
                      disabled
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Unit Type</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={newDelayData?.UnitType?.trim()}
                      id="untType"
                      name="unitType"
                      maxLength={30}
                      disabled
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Special Code</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={newDelayData?.SpecialCode?.trim()}
                      id="specialCode"
                      name="specialCode"
                      maxLength={30}
                      disabled
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>

                {/* Empty Tag for styling */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
                  <Col xs={8} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Delay Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={selectedDelayDate}
                      setDate={(value) => {
                        setSelectedDelayDate(value);
                        dispatch(setDelayDate(combineDateAndTime(value, selectedDelayTime, delayPeriod)));
                      }}
                      max={new Date()}
                      setIsDateValid={setIsSelectedDelayDateValid}
                      className={`customFormControl ${
                        selectedDelayDate && isSelectedDelayDateValid ? "borderGreen" : "borderRed"
                      }`}
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      placeholder="HH:MM"
                      maxLength={5}
                      className={`customFormControl ${
                        isValid12HourTime(selectedDelayDate, selectedDelayTime) ? "borderGreen" : "borderRed"
                      }`}
                      value={selectedDelayTime}
                      onChange={(e) => {
                        const value = e.target.value;
                        const newvalue = insertColonAfterTwoDigits(value);
                        setSelectedDelayTime(newvalue);
                        dispatch(setDelayDate(combineDateAndTime(selectedDelayDate, newvalue, delayPeriod)));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" || e.key === ":") return;
                        if (!/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                      style={{ width: "65px" }}
                    />
                  </Col>
                  <Col sm={1}>
                    <label>
                      <input
                        type="radio"
                        name="delayTimePeriod"
                        value="AM"
                        checked={delayPeriod === "AM"}
                        onChange={(e) => {
                          setDelayPeriod(e.target.value);
                          dispatch(
                            setDelayDate(
                              combineDateAndTime(selectedDelayDate, selectedDelayTime, e.target.value)
                            )
                          );
                        }}
                      />{" "}
                      AM
                    </label>
                  </Col>
                  <Col sm={1}>
                    <label>
                      <input
                        type="radio"
                        name="delayTimePeriod"
                        value="PM"
                        checked={delayPeriod === "PM"}
                        onChange={(e) => {
                          setDelayPeriod(e.target.value);
                          dispatch(
                            setDelayDate(
                              combineDateAndTime(selectedDelayDate, selectedDelayTime, e.target.value)
                            )
                          );
                        }}
                      />{" "}
                      PM
                    </label>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Reported Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={selectedReportDate}
                      max={new Date()}
                      setDate={(value) => {
                        setSelectedReportDate(value);
                        dispatch(setReported(combineDateAndTime(value, selectedReportTime, reportPeriod)));
                      }}
                      setIsDateValid={setIsSelectedReportDateValid}
                      className={`customFormControl ${
                        selectedReportDate && isSelectedReportDateValid ? "borderGreen" : "borderRed"
                      }`}
                    />
                  </Col>

                  <Col sm={2}>
                    <input
                      type="text"
                      placeholder="HH:MM"
                      maxLength={5}
                      className={`customFormControl ${
                        isValid12HourTime(selectedReportDate, selectedReportTime)
                          ? "borderGreen"
                          : "borderRed"
                      }`}
                      value={selectedReportTime}
                      onChange={(e) => {
                        const value = e.target.value;
                        const newvalue = insertColonAfterTwoDigits(value);
                        setSelectedReportTime(newvalue);
                        dispatch(setReported(combineDateAndTime(selectedReportDate, newvalue, reportPeriod)));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" || e.key === ":") return;
                        if (!/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                      style={{ width: "65px" }}
                    />
                  </Col>
                  <Col sm={1}>
                    <label>
                      <input
                        type="radio"
                        name="reportTimePeriod"
                        value="AM"
                        checked={reportPeriod === "AM"}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                          dispatch(
                            setReported(
                              combineDateAndTime(selectedDelayDate, selectedDelayTime, e.target.value)
                            )
                          );
                        }}
                      />{" "}
                      AM
                    </label>
                  </Col>
                  <Col sm={1}>
                    <label>
                      <input
                        type="radio"
                        name="reportTimePeriod"
                        value="PM"
                        checked={reportPeriod === "PM"}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                          dispatch(
                            setReported(
                              combineDateAndTime(selectedDelayDate, selectedDelayTime, e.target.value)
                            )
                          );
                        }}
                      />{" "}
                      PM
                    </label>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Delay Code</Form.Label>
                  </Col>

                  <Col xs={6} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={delayUnitCodeArray}
                      searchString={delayedUnitCodeInput}
                      renderItemId={(item) => item.delayedUnitCodePK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setDelayedUnitCodeInput(string))}
                      fetchDataBySearchString={fetchDelayedUnitCode}
                      onSelect={handleDelayUnitCodeLookup}
                      selectedId={delayedUnitCodeID}
                      clearInputCallback={() => {
                        dispatch(setDelayedUnitCodeID(""));
                      }}
                      style={`pointer:true`}
                      className={`customFormControl ${
                        delayedUnitCodeInput && delayedUnitCodeID ? "borderGreen" : "borderRed"
                      }`}
                      maxHeight="170px"
                      loading={isLoading}
                    />
                    <LookupButton onClick={handleLookup} />
                  </Col>
                </Form.Group>

                {/* Empty Tag for styling */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
                  <Col xs={8} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Send Notification Email</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="email"
                      name="email"
                      value={sendNotificationEmail}
                      checked={sendNotificationEmail}
                      disabled
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} md={6} xs={6}>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Pickup</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={newDelayData?.PickupName?.trim()}
                      id="pickupName"
                      name="pickupName"
                      maxLength={30}
                      disabled
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={newDelayData?.PickupCity?.trim()}
                      id="pickupAddr1"
                      name="pickupAddr1"
                      maxLength={30}
                      disabled
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <input
                      className="customFormControl"
                      name="pickupaddr2"
                      value={newDelayData?.PickupState?.trim()}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Delivery</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={newDelayData?.DeliveryName?.trim()}
                      id="delName"
                      name="delName"
                      maxLength={30}
                      disabled
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={newDelayData?.DeliveryCity?.trim()}
                      id="deliveryName"
                      name="deliveryName"
                      maxLength={30}
                      disabled
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <input
                      className="customFormControl"
                      name="deliveryAddr1"
                      value={newDelayData?.DeliveryState?.trim()}
                      maxLength={4}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Last Location</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      checked={atLastLOcation}
                      className="form-check-input p-0 "
                      id="atlastLocation"
                      name="atlastLocation"
                      disabled={atDelivery}
                      onChange={(e) => {
                        const value = e.target.checked;

                        setAtLastLOcation(value);
                        if (value) {
                          setLastLocation(newDelayData?.LastLocationName);
                          setLastLocationCity(newDelayData?.LastLocationCity);
                          setLastLocationStateCode(newDelayData?.LastLocationStateCode);

                          setContact(newDelayData?.LastLocationContact);
                          setPhone(
                            newDelayData?.LastLocationPhone != null
                              ? formatPhoneNumber(newDelayData?.LastLocationPhone)
                              : ""
                          );
                        } else {
                          setLastLocation("");
                          setLastLocationCity("");
                          setLastLocationStateCode("");
                          setContact("");
                          setPhone("");
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Last Location</Form.Label>
                  </Col>
                  <Col xs={5} className="p-0">
                    <input
                      name="lastLocation"
                      id="lastLocation"
                      type="text"

                      value={lastLocation}
                      className={`customFormControl`}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                  <Col xs={3} className="p-0"></Col>
                  <Col xs={5} className="p-0">
                    <input
                      name="lastLocation2"
                      id="lastLocation2"
                      type="text"

                      value={lastLocationCity}
                      className={`customFormControl`}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                  <Col xs={1} className="w-60px">
                    <input
                      name="lastLocation3"
                      id="lastLocation3"
                      type="text"

                      value={lastLocationStateCode}
                      className={`customFormControl`}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Delivery</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="atdelivery"
                      name="atdelivery"
                      disabled={atLastLOcation}
                      checked={atDelivery}
                      onChange={(e) => {
                        const value = e.target.checked;
                        setAtDelivery(value);
                        if (value) {
                          setCurrentLocaionName(newDelayData?.AtDeliveryName?.trim());
                          setCurrentLocaionAddress1(newDelayData?.AtDeliveryAddress1?.trim() ?? "");
                          setCurrentLocaionAddress2(
                            newDelayData?.AtDeliveryAddress2 &&
                              newDelayData.AtDeliveryAddress2?.trim() !== "null"
                              ? newDelayData.AtDeliveryAddress2?.trim()
                              : ""
                          );
                          setCity(newDelayData?.AtDeliveryCity?.trim());
                          setPostalCode(newDelayData?.AtDeliveryPostalCode?.trim());
                          setStateCode(newDelayData?.AtDeliveryState?.trim());

                          setContact(newDelayData?.DeliveryContact?.trim());
                          setPhone(
                            newDelayData?.DeliveryPhone != null
                              ? formatPhoneNumber(newDelayData?.DeliveryPhone)
                              : ""
                          );
                        } else {
                          setCurrentLocaionName("");
                          setCurrentLocaionAddress1("");
                          setCurrentLocaionAddress2("");
                          setCity("");
                          setPostalCode("");
                          setStateCode("");
                          setPostalCodePK("");
                          setContact("");
                          setPhone("");
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Current Location</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      value={currentLocaionName}
                      id="name"
                      name="name"
                      maxLength={30}
                      disabled={atLastLOcation || atDelivery}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        setCurrentLocaionName(e.target.value);
                      }}
                      className={`customFormControl ${
                        atLastLOcation || atDelivery ? "" : currentLocaionName ? "borderGreen" : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        atLastLOcation || atDelivery
                          ? ""
                          : currentLocaionAddress1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      value={currentLocaionAddress1}
                      disabled={atLastLOcation || atDelivery}
                      id="ad1"
                      name="ad1"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setCurrentLocaionAddress1(e.target.value);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={currentLocaionAddress2}
                      disabled={atLastLOcation || atDelivery}
                      id="ad2"
                      name="ad2"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setCurrentLocaionAddress2(e.target.value);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <PostalCodeComponent
                  disabled={atLastLOcation || atDelivery}
                  city={city}
                  setCity={setCity}
                  stateCode={statecode}
                  setStateCode={setStateCode}
                  postalCode={postalcode}
                  setPostalCode={setPostalCode}
                  setPostalValues={setPostalValues}
                  postalOptions={postalOptions}
                  postalCodePK={postalCodePK}
                  setPostalCodePK={setPostalCodePK}
                  canadian={canadian}
                  setCanadian={setCanadian}
                />

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Contact</Form.Label>
                  </Col>

                  <Col xs={8} md={7} sm={6} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${contact ? "borderGreen" : "borderRed"}`}
                      id="contact"
                      name="contact"
                      value={contact}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onInput={(e) => {
                        setContact(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      maxLength={14}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      value={phone}
                      onChange={(e) => phoneFormatHandler(e)}
                      className={`customFormControl ${
                        phone !== "" && phone?.length === 14 ? "borderGreen" : "borderRed"
                      }`}
                      onInput={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <DelayUnitCodeLookup
              show={showLookup}
              onHide={() => setShowLookup(false)}
              renderItemId={(item) => item.delayedUnitCodePK}
              handleLookupSelection={handleDelayUnitCodeLookup}
              customServiceCallback={() =>
                DelayProcessingService.getLookupForDelayUnitCodes(
                  selectedSearchCriteria,
                  searchTerms,
                  pageNumber,
                  normalSortValue,
                  normalSortFlag,
                  companyName,
                  null
                )
              }
            />
            {loading && (
              <div className="fade modal-backdrop show">
                {" "}
                <div className="pos-center">
                  {" "}
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default General;
