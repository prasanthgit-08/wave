import React, { useState, useEffect, useRef } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import {
  setDelayDate,
  setReported,
  setSendUpdateEmails,
  setEditGenerlTabValid,
  setEditSaveFormData,
  setLoading,
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
import LoadingIcon from "../../../../../common/LoadingIcon";
const General = () => {
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const [showLookup, setShowLookup] = useState(false);
  const reportedDate = useSelector((state) => state.delayProcessing.reported);
  const delayDate = useSelector((state) => state.delayProcessing.delayDate);
  const [delayUnitCodeArray, setDelayUnitCodeArray] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const [delayPeriod, setDelayPeriod] = useState("AM"); // Default to AM
  const [reportPeriod, setReportPeriod] = useState("AM"); // Default to AM
  const [sendUpdateOfNotificationEmail, setSendUpdateOfNotificationEmail] = useState(false);
  const [newDelayData, setNewDelayData] = useState(null);
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
  const [selectedDelayDate, setSelectedDelayDate] = useState(new Date());
  const [isSelectedDelayDateValid, setIsSelectedDelayDateValid] = useState(true);
  const [selectedDelayTime, setSelectedDelayTime] = useState();
  const [selectedReportDate, setSelectedReportDate] = useState(new Date());
  const [isSelectedReportDateValid, setIsSelectedReportDateValid] = useState(true);
  const [selectedReportTime, setSelectedReportTime] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [sendUpdateEmail, setSendUpdateEmail] = useState(false);
  const [delayContact, setDelayContact] = useState("");
  const [delayPhone, setDelayPhone] = useState("");
  const [delayFax, setDelayFax] = useState("");
  const [delayPhoneExtension, setDelayPhoneExtension] = useState("");

  //used for custom delay unitcode lookup

  const pageNumber = useSelector((state) => state.delayCodeUnitLookupReducer.pageNumber);
  const normalSortFlag = useSelector((state) => state.delayCodeUnitLookupReducer.normalSortFlag);
  const normalSortValue = useSelector((state) => state.delayCodeUnitLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.delayCodeUnitLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.delayCodeUnitLookupReducer.searchTerms);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const delayPhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDelayPhone(formattedPhoneNumber);
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDelayFax(formattedPhoneNumber);
  };
  const phoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);
    setDelayPhoneExtension(extenstion);
  };
  const [delayedUnitCodeID, setDelayedUnitCodeID] = useState("");
  const [delayedUnitCodeInput, setDelayedUnitCodeInput] = useState("");

  const { loading, editDetailFlag } = useSelector((state) => state.delayProcessing);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("DELAYNEW", "new");
  const [hasEmailSendPermission, setHasEmailSendPermission] = useState(false);
  //check permission
  useEffect(() => {
    if (deniedPermissions) {
      setHasEmailSendPermission(!deniedPermissions?.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);
  /**Validation city,state,zip */
  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
  });

  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setShowLookup(false);
    setDelayedUnitCodeInput(delayUnitCode?.description?.trim());
    setDelayedUnitCodeID(delayUnitCode?.delayedUnitCodePK);
  };

  const handleLookup = () => {
    setShowLookup(true);
  };

  const fetchDelayedUnitCode = (string) => {
    setIsLoading(true);
    DelayProcessingService.getAutoCompleteForDelayUnitCodes(string, companyName, delayedUnitPK)
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

  useEffect(() => {
    dispatch(setSendUpdateEmails(sendUpdateOfNotificationEmail));
  }, [sendUpdateOfNotificationEmail]);

  /** used to get delay new tabs**/

  const getViewData = () => {
    dispatch(setLoading(true));
    DelayProcessingService.fetchViewDelayDetails(delayedUnitPK, "general", companyName, 0, 10, "", false)
      .then((response) => {
        const data = response?.data[0];
        setNewDelayData(data);
        setPhone(data?.Phone != null ? formatPhoneNumber(data?.Phone) : "");
        setDelayPhone(data?.DelayContactPhone != null ? formatPhoneNumber(data?.DelayContactPhone) : "");
        setDelayFax(data?.DelayContactFAX != null ? formatPhoneNumber(data?.DelayContactFAX) : "");
        setDelayContact(data?.DelayContact?.trim());
        setContact(data?.Contact?.trim());
        setCurrentLocaionName(data?.CurrentLocationName)?.trim();
        setCurrentLocaionAddress1(data?.CurrentLocationAddress1?.trim());
        setCurrentLocaionAddress2(data?.CurrentLocationAddress2?.trim());
        setCity(data?.CurrentLocationCity?.trim());
        setStateCode(data?.CurrentLocationStateCode?.trim());
        setPostalCode(data?.CurrentLocationPostalCode?.trim());
        setDelayedUnitCodeInput(data?.DelayCode?.trim());
        setDelayedUnitCodeID(data?.DelayedUnitCodePK);
        setPostalCodePK(data?.PostalCodePK);
        setSelectedDelayDate(data?.DelayDate);
        setSelectedDelayTime(data?.DelayTimeOnly);
        setDelayPeriod(data?.DelayAMPM);
        setSelectedReportDate(data?.Reported);
        setSelectedReportTime(data?.ReportedTimeOnly);
        setReportPeriod(data?.ReportedAMPM);
        setDelayPhoneExtension(data?.DelayContactExtension);
        dispatch(setLoading(false));
        dispatch(setDelayDate(combineDateAndTime(data?.DelayDate, data?.DelayTimeOnly, data?.DelayAMPM)));
        dispatch(setReported(combineDateAndTime(data?.DelayDate, data?.DelayTimeOnly, data?.DelayAMPM)));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    if (delayedUnitPK && editDetailFlag) {
      getViewData();
    }
  }, [delayedUnitPK, editDetailFlag]);

  //general tab validation
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
      contact &&
      phone &&
      phone?.match(phoneRegex) &&
      (!delayPhoneExtension || (delayPhoneExtension && delayPhoneExtension?.length >= 3)) &&
      delayContact &&
      delayPhone &&
      delayPhone?.match(phoneRegex) &&
      ((delayFax && delayFax?.match(phoneRegex)) || !delayFax) &&
      isTimeValid &&
      isReportTimeValid
    ) {
      dispatch(setEditGenerlTabValid(true));
    } else {
      {
        dispatch(setEditGenerlTabValid(false));
      }
    }
  }, [
    delayPhoneExtension,
    delayedUnitCodeID,
    delayedUnitCodeInput,
    selectedDelayDate,
    isSelectedDelayDateValid,
    selectedReportDate,
    isSelectedReportDateValid,
    contact,
    atLastLOcation,
    atDelivery,
    phone,
    delayContact,
    delayPhone,
    delayFax,
    selectedDelayTime,
    selectedReportTime,
  ]);

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

  //set save object

  const generalTabData = () => {
    dispatch(
      setEditSaveFormData({
        unitFK: unitfk,
        delayedUnitFK: delayedUnitPK,
        delayedUnitCodeFK: delayedUnitCodeID,
        delayContactPhone: delayPhone?.replace(/\s+/g, ""),
        delayContact: delayContact,
        delayContactExtension: delayPhoneExtension,
        delayContactFax: delayFax?.replace(/\s+/g, ""),
        delayDate: delayDate,
        reported: reportedDate,
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
        hasEmailSendPermission: hasEmailSendPermission,
        reported: reportedDate,
        dispatchFK: newDelayData?.DispatchFK,
        sendUpdateEmail: sendUpdateEmail,
      })
    );
  };

  useEffect(() => {
    generalTabData();
  }, [
    unitfk,
    newDelayData,
    delayedUnitPK,
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
    currentLocaionAddress2,
    city,
    phone,
    statecode,
    postalcode,
    ,
    sendUpdateEmail,
    delayDate,
    reportedDate,
    delayContact,
    delayPhone,
    delayPhoneExtension,
    delayFax,
    hasEmailSendPermission,
    reportedDate,
    delayDate,
  ]);
  //used to set time
  const isValid12HourTime = (date, time) => Boolean(date && /^([0]?[1-9]|1[0-2]):[0-5][0-9]$/.test(time));

  const toISODateTime = (date, time, period) => {
    let [h, m] = time?.split(":")?.map(Number) || [];
    if (period === "PM" && h < 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${date}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

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

  //used to navigate back to view page
  useEffect(() => {
    if (!editDetailFlag) {
      navigate(
        `/delay-processing/delayed-details/${companyName}/${Number(unitfk)}/${Number(driverfk)}/${Number(
          delayedUnitPK
        )}`
      );
    }
  }, [editDetailFlag]);

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

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Driver Released</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="outbound"
                      name="outbound"
                      value={newDelayData?.DriverReleased}
                      checked={newDelayData?.DriverReleased}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="form-group mt-2 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Driver Release Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField date={newDelayData?.DriverReleaseDate} disabled />
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

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Delay Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={loading ? "" : selectedDelayDate}
                      max={new Date()}
                      setDate={(value) => {
                        setSelectedDelayDate(value);
                        dispatch(setDelayDate(combineDateAndTime(value, selectedDelayTime, delayPeriod)));
                      }}
                      setIsDateValid={setIsSelectedDelayDateValid}
                      className={`customFormControl ${
                        !loading
                          ? selectedDelayDate && isSelectedDelayDateValid
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      placeholder="HH:MM"
                      maxLength={5}
                      className={`customFormControl ${
                        !loading
                          ? isValid12HourTime(selectedDelayDate, selectedDelayTime)
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      value={loading ? "" : selectedDelayTime}
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
                      date={loading ? "" : selectedReportDate}
                      max={new Date()}
                      setDate={(value) => {
                        setSelectedReportDate(value);
                        dispatch(setReported(combineDateAndTime(value, selectedReportTime)));
                      }}
                      setIsDateValid={setIsSelectedReportDateValid}
                      className={`customFormControl ${
                        !loading
                          ? selectedReportDate && isSelectedReportDateValid
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                    />
                  </Col>

                  <Col sm={2}>
                    <input
                      type="text"
                      placeholder="HH:MM"
                      maxLength={5}
                      className={`customFormControl ${
                        !loading
                          ? isValid12HourTime(selectedReportDate, selectedReportTime)
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      onChange={(e) => {
                        const value = e.target.value;
                        const newvalue = insertColonAfterTwoDigits(value);
                        setSelectedReportTime(newvalue);
                        dispatch(setReported(combineDateAndTime(selectedReportDate, newvalue, reportPeriod)));
                      }}
                      value={loading ? "" : selectedReportTime}
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
                              combineDateAndTime(selectedReportDate, selectedReportTime, e.target.value)
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
                              combineDateAndTime(selectedReportDate, selectedReportTime, e.target.value)
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
                      handleSearchString={(string) => setDelayedUnitCodeInput(string)}
                      fetchDataBySearchString={fetchDelayedUnitCode}
                      onSelect={handleDelayUnitCodeLookup}
                      selectedId={delayedUnitCodeID}
                      clearInputCallback={() => {
                        setDelayedUnitCodeID("");
                      }}
                      style={`pointer:true`}
                      className={`customFormControl ${
                        !loading
                          ? delayedUnitCodeInput && delayedUnitCodeID
                            ? "borderGreen"
                            : "borderRed"
                          : ""
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
                    <Form.Label className=" col-form-label dealer-label">Send Update Email</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="email"
                      name="email"
                      value={sendUpdateEmail}
                      checked={sendUpdateEmail}
                      onChange={(e) => {
                        setSendUpdateEmail(e.target.checked);
                      }}
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
                      value={newDelayData?.PickupState}
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

                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Current Location</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      value={currentLocaionName}
                      id="name"
                      name="name"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                      onChange={(e) => {
                        setCurrentLocaionName(e.target.value);
                      }}
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
                      className="customFormControl"
                      value={currentLocaionAddress1}
                      disabled
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
                      disabled
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
                  disabled
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
                      className={`customFormControl
                        ${!loading ? (contact ? "borderGreen" : "borderRed") : ""}
                      `}
                      id="contact"
                      name="contact"
                      value={contact}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
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
                        loading ? "" : phone !== "" && phone?.length === 14 ? "borderGreen" : "borderRed"
                      }`}
                      onInput={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Delay Contact</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${!loading ? (delayContact ? "borderGreen" : "borderRed") : ""}`}
                      value={delayContact}
                      id="delayContact"
                      name="delayContact"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onInput={(e) => {
                        setDelayContact(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Delay Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      id="delayContactPhone"
                      name="delayContactPhone"
                      maxLength={14}
                      value={delayPhone}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => delayPhoneFormatHandler(e)}
                      className={`customFormControl ${
                        loading
                          ? ""
                          : delayPhone !== "" && delayPhone?.length == 14
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      onInput={(e) => {
                        setDelayPhone(e.target.value);
                      }}
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <input
                      name="extn"
                      maxLength={4}
                      onChange={phoneFormatExtension}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={!delayPhone}
                      value={delayPhoneExtension}
                      onInput={(e) => {
                        setDelayPhoneExtension(e.target.value);
                      }}
                      className={`customFormControl ${
                        loading || !delayPhone || !delayPhoneExtension
                          ? ""
                          : delayPhoneExtension && delayPhoneExtension?.length < 3
                            ? "borderRed"
                            : ""
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Delay FAX</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      id="delayFax"
                      name="delayFax"
                      maxLength={14}
                      value={delayFax}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onInput={(e) => {
                        setDelayFax(e.target.value);
                      }}
                      onChange={(e) => faxFormatHandler(e)}
                      style={{
                        border: loading
                          ? ""
                          : String(delayFax).match(phoneRegex) || delayFax === ""
                            ? "black 1px solid"
                            : "red 2px solid",
                      }}
                      className="customFormControl"
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
                  delayedUnitPK
                )
              }
            />
            {loading && <LoadingIcon />}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default General;
