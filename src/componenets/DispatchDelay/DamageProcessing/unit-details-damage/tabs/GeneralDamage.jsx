import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import phoneExtension from "../../../../../utils/validation/PhoneExtension";
import numberValidation from "../../../../../utils/validation/NumberValidation";
import * as yup from "yup";
import {
  setDealerCity,
  setDealerPostcode,
  setDealerStatecode,
  setOnCancel,
  setPostalCodeOnChange,
} from "../../../../../redux/EditDealerSlice";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { formatForApi, formatDate, formatDatetimeToDate } from "../../../../../utils/dateUtils";
import { Formik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import {
  setDamageTime,
  setDriverName,
  setUnitNumber,
  setModel,
  setVin,
  setUnitType,
  setSpecialCode,
  setReportedDate,
  setReportedTime,
  setDamageCode,
  setWeatherCode,
  setRoadTypeCode,
  setRoadConditionCode,
  setDamageDate,
  setPickupCity,
  setPickupName,
  setPickupState,
  setDeliveryName,
  setDeliveryCity,
  setDeliveryState,
  setLastLocationName,
  setLastLocationCity,
  setLastLocationState,
  setCurrentLocationName,
  setCurrentLocationAdd1,
  setCurrentLocationAdd2,
  setCurrentLocationCity,
  setCurrentLocationState,
  setViewOnly,
  setDamagedUnitCodeInput,
  setDamagedUnitCodeID,
  setDamagedUnitCodeFK,
  setWeatherUnitCodeInput,
  setWeatherUnitCodeID,
  setWeatherUnitCodeFK,
  setRoadTypeCodeInput,
  setRoadTypeUnitCodeID,
  setRoadTypeUnitCodeFK,
  setRoadConditionCodeInput,
  setRoadConditionUnitCodeID,
  setRoadConditionFK,
  setDamageSaveFlag,
  setDamageData,
  setAtLastLocation,
  setAtPickup,
  setInYard,
  setAtDelivery,
  setPhone,
  setContact,
  setCurrentLocationPostalCode,
  setCurrentLocationPostalCodePK,
  setSendNotificationEmail,
  setDriverReported,
  setDriverResponsible,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";
import DelayUnitCodeLookup from "../../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
import { setReported } from "../../../../../redux/DamageProcessingSlice";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";

const GeneralDamage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const id = useParams().unitfk;

  const unitPK = useSelector((state) => state.delayDamage.unitPK);
  const driverName = useSelector((state) => state.delayDamage.driverName);
  const model = useSelector((state) => state.delayDamage.model);
  const unitNumber = useSelector((state) => state.delayDamage.unitNumber);
  const vin = useSelector((state) => state.delayDamage.vin);
  const unitType = useSelector((state) => state.delayDamage.unitType);
  const specialCode = useSelector((state) => state.delayDamage.specialCode);
  const pickupName = useSelector((state) => state.delayDamage.pickupName);
  const pickupCity = useSelector((state) => state.delayDamage.pickupCity);
  const pickupState = useSelector((state) => state.delayDamage.pickupState);
  const deliveryName = useSelector((state) => state.delayDamage.deliveryName);
  const deliveryCity = useSelector((state) => state.delayDamage.deliveryCity);
  const deliveryState = useSelector((state) => state.delayDamage.deliveryState);

  const reportedDate = useSelector((state) => state.delayDamage.reported);

  const damageDate = useSelector((state) => state.delayDamage.damageDate);

  const lastLocationName = useSelector((state) => state.delayDamage.lastLocationName);
  const lastLocationCity = useSelector((state) => state.delayDamage.lastLocationCity);
  const lastLocationState = useSelector((state) => state.delayDamage.lastLocationState);

  const currentLocationName = useSelector((state) => state.delayDamage.currentLocationName);
  const currentLocationAdd1 = useSelector((state) => state.delayDamage.currentLocationAdd1);
  const currentLocationAdd2 = useSelector((state) => state.delayDamage.currentLocationAdd2);
  const currentLocationCity = useSelector((state) => state.delayDamage.currentLocationCity);
  const currentLocationState = useSelector((state) => state.delayDamage.currentLocationState);
  const viewOnly = useSelector((state) => state.delayDamage.viewOnly);

  const [damagePeriod, setDamagePeriod] = useState("AM"); // Default to AM
  const [reportPeriod, setReportPeriod] = useState("AM"); // Default to AM

  const [weatherUnitCodeArray, setWeatherUnitCodeArray] = useState([]);
  const [roadConditionCodeArray, setRoadConditionCodeArray] = useState([]);
  const roadTypeUnitCodeID = useSelector((state) => state.delayDamage.roadTypeUnitCodeID);
  const roadConditionUnitCodeID = useSelector((state) => state.delayDamage.roadConditionUnitCodeID);

  const damagedUnitCodeID = useSelector((state) => state.delayDamage.damagedUnitCodeID);
  const weatherUnitCodeID = useSelector((state) => state.delayDamage.weatherUnitCodeID);
  const damagedUnitCodeInput = useSelector((state) => state.delayDamage.damagedUnitCodeInput);
  const weatherUnitCodeInput = useSelector((state) => state.delayDamage.weatherUnitCodeInput);
  const roadTypeCodeInput = useSelector((state) => state.delayDamage.roadTypeCodeInput);
  const roadConditionCodeInput = useSelector((state) => state.delayDamage.roadConditionCodeInput);
  const delayedUnitCode1 = useSelector((state) => state.delayDamage.delayedUnitCodeFK);
  const weatherUnitCodeFK = useSelector((state) => state.delayDamage.weatherUnitCodeFK);
  const sendNotificationEmail = useSelector((state) => state.delayDamage.sendNotificationEmail);
  const driverReported = useSelector((state) => state.delayDamage.driverReported);
  const driverResponsible = useSelector((state) => state.delayDamage.driverResponsible);

  const delayedUnitFK = useSelector((state) => state.delayDamage.delayedUnitFK);

  const [selectedDamageDate, setSelectedDamageDate] = useState(() => {
    const now = new Date();
    return formatForApi(now);
  });

  const Phone = useSelector((state) => state.delayDamage.phone);
  const contact = useSelector((state) => state.delayDamage.contact);
  const damageInHouseNotes = useSelector((state) => state.delayDamage.damageInHouseNotes);
  const damageCustomerNotes = useSelector((state) => state.delayDamage.damageCustomerNotes);
  const inYard = useSelector((state) => state.delayDamage.inYard);
  const damageYardFK = useSelector((state) => state.delayDamage.damageYardFK);
  const atLastLocation = useSelector((state) => state.delayDamage.atLastLocation);
  const damageData = useSelector((state) => state.delayDamage.damageData);

  const atPickup = useSelector((state) => state.delayDamage.atPickup);
  const atDelivery = useSelector((state) => state.delayDamage.atDelivery);
  const damageDealerFK = useSelector((state) => state.delayDamage.damageDealerFK);
  const damageUnitAddressFK = useSelector((state) => state.delayDamage.damageUnitAddressFK);
  const damageUnitLocationFK = useSelector((state) => state.delayDamage.damageUnitLocationFK);
  const emailDamageData = useSelector((state) => state.delayDamage.emailDamageData);
  const currentLocationPostalCode = useSelector((state) => state.delayDamage.currentLocationPostalCode);
  const currentLocationPostalCodePK = useSelector((state) => state.delayDamage.currentLocationPostalCodePK);
  const delayedUnitCodeFK = useSelector((state) => state.delayProcessing.delayedUnitCodeFK);
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [canadian, setCanadian] = useState(false);

  const [selectedDamageDateInput, setSelectedDamageDateInput] = useState("");
  const [isSelectedDamageDateValid, setIsSelectedDamageDateValid] = useState(true);
  const [selectedDamageTime, setSelectedDamageTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  });

  const [selectedReportDate, setSelectedReportDate] = useState(() => {
    const now = new Date();
    return formatForApi(now);
  });
  const [selectedReportDateInput, setSelectedReportDateInput] = useState("");
  const [isSelectedReportDateValid, setIsSelectedReportDateValid] = useState(true);
  const [selectedReportTime, setSelectedReportTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  });

  const [damagedUnitCodeArray, setDamagedUnitCodeArray] = useState([]);
  const [roadTypeCodeArray, setRoadTypeCodeArray] = useState([]);

  const [selectedCompanyName, setSelectedCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };

  const [showLookup, setShowLookup] = useState(false);
  const [showLookup2, setShowLookup2] = useState(false);
  const [showWeatherLookup, setShowWeatherLookup] = useState(false);
  const [showRoadTypeLookup, setShowRoadTypeLookup] = useState(false);
  const [showRoadConditionLookup, setShowRoadConditionLookup] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;

  const shouldHideButton = (keyword) => pathname?.includes(keyword);

  const dispatch = useDispatch();

  const fetchDamageDetails = async () => {
    try {
      const response = await DelayDamageService.getDelayDamageDetails("General", id || rowData?.unitFK);
      if (response?.data && Array.isArray(response?.data)) {
        // Assuming the first element contains the data we need
        const damageData = response?.data[0];
        dispatch(setDamageData(damageData));
        dispatch(setDriverName(damageData?.Driver?.trim() || ""));
        dispatch(setUnitNumber(damageData?.UnitNumber || ""));

        dispatch(setModel(damageData?.Model || ""));
        dispatch(setVin(damageData?.VIN || ""));
        dispatch(setUnitType(damageData?.UnitType || ""));
        dispatch(setSpecialCode(damageData?.SpecialCode || ""));
        dispatch(setDamageDate(damageData?.DamageDate || ""));
        dispatch(setDamageTime(damageData?.DamageTime || ""));
        dispatch(setDamageCode(damageData?.DamageCode || ""));
        dispatch(setWeatherCode(damageData?.WeatherCode || ""));
        dispatch(setRoadTypeCode(damageData?.RoadTypeCode || ""));
        dispatch(setRoadConditionCode(damageData?.RoadConditionCode || ""));
        dispatch(setPickupName(damageData?.PickupName?.trim() || ""));
        dispatch(setPickupCity(damageData?.PickupCity?.trim() || ""));
        dispatch(setPickupState(damageData?.PickupState?.trim() || ""));

        dispatch(setDeliveryName(damageData?.DeliveryName?.trim() || ""));
        dispatch(setDeliveryCity(damageData?.DeliveryCity?.trim() || ""));
        dispatch(setDeliveryState(damageData?.DeliveryState?.trim() || ""));

        dispatch(setLastLocationName(damageData?.LastLocationName?.trim() || ""));
        dispatch(setLastLocationCity(damageData?.LastLocationCity?.trim() || ""));
        dispatch(setLastLocationState(damageData?.LastLocationStateCode?.trim() || ""));

        dispatch(setCurrentLocationName(damageData?.CurrentLocationName?.trim() || ""));
        dispatch(setCurrentLocationAdd1(damageData?.CurrentLocationAddress1?.trim() || ""));
        dispatch(setCurrentLocationAdd2(damageData?.CurrentLocationAddress2?.trim() || ""));
        dispatch(setCurrentLocationCity(damageData?.CurrentLocationCity?.trim() || ""));
        dispatch(setCurrentLocationState(damageData?.CurrentLocationStateCode?.trim() || ""));
      }
    } catch (error) {
      console.error("Error fetching damage details:", error);
    }
  };

  useEffect(() => {
    if (damageData && atLastLocation) {
      setCurrentLocationName(damageData?.LastLocationName?.trim() || "");
      setCurrentLocationCity(damageData?.LastLocationCity?.trim() || "");
      setCurrentLocationState(damageData?.LastLocationStateCode?.trim() || "");
      setCurrentLocationPostalCode(damageData?.LastLocation_PostCode?.trim() || "");
      setCurrentLocationAdd1(damageData?.LastLocation_Address1?.trim() || "");
      setCurrentLocationAdd2(damageData?.LastLocation_Address2?.trim() || "");
      setInYard(false);
      setAtPickup(false);
      setAtDelivery(false);
    } else {
      if (!inYard && !atDelivery && !atPickup) {
        resetLocation();
      }
    }
  }, [atLastLocation]);

  useEffect(() => {
    if (damageData && inYard) {
      setCurrentLocationName(damageData?.Yard_CurLocation_Name?.trim() || "");
      setCurrentLocationCity(damageData?.Yard_CurLocation_City?.trim() || "");
      setCurrentLocationState(damageData?.Yard_CurLocation_State?.trim() || "");
      setCurrentLocationPostalCode(damageData?.Yard_CurLocation_PostCode?.trim() || "");
      setCurrentLocationAdd1(damageData?.Yard_CurLocation_Add1?.trim() || "");
      setCurrentLocationAdd2(damageData?.Yard_CurLocation_Add2?.trim() || "");
      setAtLastLocation(false);
      setAtPickup(false);
      setAtDelivery(false);
    } else {
      if (!atLastLocation && !atDelivery && !atPickup) {
        resetLocation();
      }
    }
  }, [inYard]);

  useEffect(() => {
    if (damageData && atPickup) {
      setCurrentLocationName(damageData?.PickupName?.trim() || "");
      setCurrentLocationCity(damageData?.PickupCity?.trim() || "");
      setCurrentLocationState(damageData?.PickupState?.trim() || "");
      setCurrentLocationPostalCode(damageData?.PickUp_CurLocation_PostCode?.trim() || "");
      setCurrentLocationAdd1(damageData?.PickUp_CurLocation_Add1?.trim() || "");
      setCurrentLocationAdd2(damageData?.PickUp_CurLocation_Add2?.trim() || "");
      setAtLastLocation(false);
      setInYard(false);
      setAtDelivery(false);
    } else {
      if (!atLastLocation && !atDelivery && !inYard) {
        resetLocation();
      }
    }
  }, [atPickup]);

  useEffect(() => {
    if (damageData && atDelivery) {
      setCurrentLocationName(damageData?.DeliveryName?.trim() || "");
      setCurrentLocationCity(damageData?.DeliveryCity?.trim() || "");
      setCurrentLocationState(damageData?.DeliveryState?.trim() || "");
      setAtLastLocation(false);
      setInYard(false);
      setAtPickup(false);
    } else {
      if (!atLastLocation && !atPickup && !inYard) {
        resetLocation();
      }
    }
  }, [atDelivery]);

  const resetLocation = () => {
    dispatch(setCurrentLocationName(""));
    dispatch(setCurrentLocationAdd1(""));
    dispatch(setCurrentLocationAdd2(""));
    dispatch(setCurrentLocationCity(""));
    dispatch(setCurrentLocationState(""));
  };

  const generalDamageData = () => {
    dispatch(
      setDamageData({
        unitPK: id,
        damageDate: damageDate,
        reported: reportedDate,
        damagedUnitCodeFk: damagedUnitCodeID,
        weatherUnitCodeFk: weatherUnitCodeID,
        roadTypeUnitCodeFk: roadTypeUnitCodeID,
        roadConditionCodeFk: roadConditionUnitCodeID,
        delayedUnitFK: delayedUnitFK,
        delayedUnitCodeFK: delayedUnitCodeFK || damagedUnitCodeID,
        Phone: Phone,
        contact: contact,
        damageInHouseNotes: damageInHouseNotes,
        damageCustomerNotes: damageCustomerNotes,
        inYard: inYard,
        damageYardFK: damageYardFK,
        atPickup: atPickup,
        atDelivery: atDelivery,
        damageDealerFK: damageDealerFK,
        damageUnitAddressFK: damageUnitAddressFK,
        damageUnitLocationFK: damageUnitLocationFK,
        xmlData: emailDamageData,
        company: selectedCompanyName,
        driverFK: rowData?.driverFK,
      })
    );
  };
  useEffect(() => {
    dispatch(setDamageDate(selectedDamageDate + "T" + selectedDamageTime));
    generalDamageData();
  }, [
    damageDate,
    reportedDate,
    damagedUnitCodeInput,
    damagedUnitCodeID,
    weatherUnitCodeInput,
    weatherUnitCodeID,
    roadTypeCodeInput,
    roadTypeUnitCodeID,
    roadConditionCodeInput,
    roadConditionUnitCodeID,
    currentLocationName,
    currentLocationAdd1,
    currentLocationCity,
    currentLocationState,
    selectedDamageDate,
    isSelectedReportDateValid,
    selectedDamageTime,
    isSelectedDamageDateValid,
    selectedReportDate,
    selectedReportTime,
    Phone,
  ]);

  // Tab & Save Validtaion
  useEffect(() => {
    if (
      selectedDamageDate &&
      isSelectedDamageDateValid &&
      selectedDamageTime &&
      selectedReportDate &&
      isSelectedReportDateValid &&
      selectedReportTime &&
      damagedUnitCodeID &&
      weatherUnitCodeID &&
      roadTypeUnitCodeID &&
      roadConditionUnitCodeID &&
      (inYard ||
        atPickup ||
        atLastLocation ||
        atDelivery ||
        (currentLocationName && currentLocationAdd1 && currentLocationPostalCodePK)) &&
      Phone &&
      Phone?.length === 14
    ) {
      dispatch(setDamageSaveFlag(true));
    } else {
      dispatch(setDamageSaveFlag(false));
    }
  }, [
    selectedDamageDate,
    isSelectedDamageDateValid,
    selectedDamageTime,
    selectedReportDate,
    isSelectedReportDateValid,
    selectedReportTime,
    damagedUnitCodeID,
    weatherUnitCodeID,
    roadTypeUnitCodeID,
    roadConditionUnitCodeID,
    inYard,
    atPickup,
    atLastLocation,
    atDelivery,
    currentLocationName,
    currentLocationAdd1,
    currentLocationPostalCodePK,
    Phone,
  ]);

  const fetchDamageUnitCode = (string, stringName) => {
    DelayProcessingService.getDelayUnitCodesForAutoComplete(string, stringName).then((response) => {
      const data = response?.data?.content;
      const delayUnitCodeList = data?.map((codeList) => ({
        ...codeList,
        description: codeList.description?.trim(),
      }));
      if (stringName === "damage") setDamagedUnitCodeArray(delayUnitCodeList);
      else if (stringName === "weather") setWeatherUnitCodeArray(delayUnitCodeList);
      else if (stringName === "roadType") setRoadTypeCodeArray(delayUnitCodeList);
      else if (stringName === "roadcondition") setRoadConditionCodeArray(delayUnitCodeList);
    });
  };

  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };

  //lookup
  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setShowLookup(false);
    dispatch(setDamagedUnitCodeInput(delayUnitCode?.description?.trim()));
    dispatch(setDamagedUnitCodeID(delayUnitCode?.delayedUnitCodePK));
    dispatch(setDamagedUnitCodeFK(delayUnitCode?.delayedUnitCodePK));
  };
  const handleWeatherUnitCodeLookup = (delayUnitCode) => {
    setShowWeatherLookup(false);
    dispatch(setWeatherUnitCodeInput(delayUnitCode?.description?.trim()));
    dispatch(setWeatherUnitCodeID(delayUnitCode?.delayedUnitCodePK));
    dispatch(setWeatherUnitCodeFK(delayUnitCode?.delayedUnitCodePK));
  };
  const handleRoadTyperUnitCodeLookup = (delayUnitCode) => {
    setShowRoadTypeLookup(false);
    dispatch(setRoadTypeCodeInput(delayUnitCode?.description?.trim()));
    dispatch(setRoadTypeUnitCodeID(delayUnitCode?.delayedUnitCodePK));
    dispatch(setRoadTypeUnitCodeFK(delayUnitCode?.delayedUnitCodePK));
  };
  const handleRoadConditionrUnitCodeLookup = (delayUnitCode) => {
    setShowRoadConditionLookup(false);
    dispatch(setRoadConditionCodeInput(delayUnitCode?.description?.trim()));
    dispatch(setRoadConditionUnitCodeID(delayUnitCode?.delayedUnitCodePK));
    dispatch(setRoadConditionFK(delayUnitCode?.delayedUnitCodePK));
  };

  const handleLookup = () => {
    setShowLookup(true);
  };

  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    fetchDamageDetails();

    dispatch(setDamageDate(selectedDamageDate + "T" + selectedDamageTime));
  }, []);

  useEffect(() => {
    dispatch(setDamageDate(selectedDamageDate + "T" + selectedDamageTime));
  }, [selectedDamageDate]);

  const convertTo12Hour = (time24, date) => {
    const [hours, minutes] = time24?.split(":")?.map(Number) || [];
    const suffix = hours >= 12 ? "PM" : "AM";
    if (date === "delayed") {
      // setDelayPeriod(suffix);
    }
    if (date === "reported") {
      setReportPeriod(suffix);
    }
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hours12 < 10 ? "0" + hours12 : hours12}:${String(minutes).padStart(2, "0")}`;
  };

  const handleAMChange = (value) => {
    setDamagePeriod(value);
    updateDelayDateTime(selectedDamageTime, value);
  };

  const handleAM1Change = (value) => {
    setReportPeriod(value);
    updateReportedDateTime(selectedReportTime, value);
  };

  const updateDelayDateTime = (time, period) => {
    const [hour, minute] = time?.split(":")?.map(Number) || [];
    let convertedHour = hour % 12; // Convert 12-hour format to 0-11 range
    if (period === "PM") {
      if (hour === 12) {
        convertedHour = 12; // 12 PM remains 12
      } else {
        convertedHour += 12; // Convert to 24-hour format
      }
    } else if (period === "AM" && hour === 12) {
      convertedHour = 0; // Convert 12 AM to 0 hours
    }

    const formattedDate =
      selectedDamageDate +
      "T" +
      `${convertedHour < 10 ? "0" + convertedHour : convertedHour}:${minute < 10 ? "0" + minute : minute}:00`;

    dispatch(setDamageDate(formattedDate));
  };

  const updateReportedDateTime = (time, period) => {
    const [hour, minute] = time?.split(":")?.map(Number) || [];
    let convertedHour = hour % 12; // Convert 12-hour format to 0-11 range
    if (period === "PM") {
      if (hour === 12) {
        convertedHour = 12; // 12 PM remains 12
      } else {
        convertedHour += 12; // Convert to 24-hour format
      }
    } else if (period === "AM" && hour === 12) {
      convertedHour = 0; // Convert 12 AM to 0 hours
    }

    const formattedDate =
      selectedReportDate +
      "T" +
      `${convertedHour < 10 ? "0" + convertedHour : convertedHour}:${minute < 10 ? "0" + minute : minute}:00`;

    dispatch(setReported(formattedDate));
  };

  return (
    <Formik
      initialValues={{}}
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
          <div className={"p-15 w-100"}>
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
                      value={driverName?.trim() || ""}
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
                    <Form.Label className="col-form-label dealer-label"> Unit Number</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={unitNumber?.trim() || ""}
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
                      value={model?.trim() || ""}
                      id="model"
                      name="model"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
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
                      id="vin"
                      name="vin"
                      maxLength={30}
                      value={vin?.trim() || ""}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
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
                      value={unitType?.trim() || ""}
                      id="untType"
                      name="unitType"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
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
                      value={specialCode?.trim() || ""}
                      id="specialCode"
                      name="specialCode"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
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
                    <Form.Label className="col-form-label dealer-label"> Damage Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={selectedDamageDate}
                      setDate={(value) => {
                        setSelectedDamageDate(value);
                        if (value) {
                          dispatch(setDamageDate(value + "T" + selectedDamageTime));
                        } else {
                          dispatch(setDamageDate(""));
                        }
                      }}
                      dateInput={selectedDamageDateInput}
                      setDateInput={(value) => {
                        setSelectedDamageDateInput(value);
                        if (!value) {
                          setSelectedDamageDate("");
                          dispatch(setDamageDate(""));
                        } else {
                          dispatch(setDamageDate(value + "T" + selectedDamageTime));
                        }
                      }}
                      setIsDateValid={(value) => {
                        if (!value) {
                          dispatch(setDamageDate(""));
                        }
                        setIsSelectedDamageDateValid(value);
                      }}
                      className={`customFormControl ${
                        selectedDamageDate && isSelectedDamageDateValid
                          ? "borderGreen"
                          : "borderRed"
                            ? viewOnly
                            : ""
                      }`}
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        selectedDamageTime ? "borderGreen" : "borderRed" ? viewOnly : ""
                      }`}
                      id="delayTime"
                      name="delayTime"
                      value={selectedDamageTime}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        setSelectedDamageTime(e.target.value);
                        const [hour, minute] = e.target.value.split(":").map(Number);
                        if (
                          isNaN(hour) ||
                          isNaN(minute) ||
                          hour < 1 ||
                          hour > 12 ||
                          minute < 0 ||
                          minute > 59
                        ) {
                          dispatch(setDamageDate(""));
                        } else {
                          setDamagePeriod(damagePeriod);
                          updateDelayDateTime(e.target.value, damagePeriod);
                        }
                      }}
                      style={{ width: "65px" }}
                      onKeyDown={(event) => {
                        if (event.key === "Backspace" || event.key === ":") {
                          return;
                        }
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      placeholder="HH:MM"
                      maxLength={5}
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        name="delayAMtimePeriod"
                        value="AM"
                        checked={damagePeriod === "AM"}
                        onClick={(e) => {
                          if (viewOnly) {
                            e.preventDefault();
                            return;
                          }
                          const [hour, minute] = selectedDamageTime?.split(":")?.map(Number) || [];
                          if (
                            isNaN(hour) ||
                            isNaN(minute) ||
                            hour < 1 ||
                            hour > 12 ||
                            minute < 0 ||
                            minute > 59
                          ) {
                            dispatch(setDamageDate(""));
                          } else {
                            handleAMChange("AM");
                          }
                        }}
                        style={{ marginRight: "1px" }}
                      />
                      &nbsp;AM
                    </Form.Label>
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        name="delayPMtimePeriod"
                        value="PM"
                        checked={damagePeriod === "PM"}
                        onClick={(e) => {
                          if (viewOnly) {
                            e.preventDefault();
                            return;
                          }
                          const [hour, minute] = selectedDamageTime?.split(":")?.map(Number) || [];
                          if (
                            isNaN(hour) ||
                            isNaN(minute) ||
                            hour < 1 ||
                            hour > 12 ||
                            minute < 0 ||
                            minute > 59
                          ) {
                            dispatch(setDamageDate(""));
                          } else {
                            handleAMChange("PM");
                          }
                        }}
                        style={{ marginRight: "1px" }}
                      />
                      &nbsp;PM
                    </Form.Label>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Reported Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={selectedReportDate}
                      setDate={(value) => {
                        setSelectedReportDate(value);
                        if (value) {
                          dispatch(setReported(value + "T" + selectedReportTime));
                        } else {
                          dispatch(setReported(""));
                        }
                      }}
                      dateInput={selectedReportDateInput}
                      setDateInput={(value) => {
                        setSelectedReportDateInput(value);
                        if (!value) {
                          setSelectedReportDate("");
                          dispatch(setReported(""));
                        }
                      }}
                      setIsDateValid={(value) => {
                        if (!value) {
                          dispatch(setReported(""));
                        }
                        setIsSelectedReportDateValid(value);
                      }}

                      className={`customFormControl ${
                        selectedReportDate && isSelectedReportDateValid
                          ? "borderGreen"
                          : "borderRed"
                            ? viewOnly
                            : ""
                      }`}
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        selectedReportTime ? "borderGreen" : "borderRed" ? viewOnly : ""
                      }`}
                      id="reportedTime"
                      name="reportedTime"
                      value={selectedReportTime}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        setSelectedReportTime(e.target.value);
                        const [hour, minute] = e.target.value.split(":").map(Number);
                        if (
                          isNaN(hour) ||
                          isNaN(minute) ||
                          hour < 1 ||
                          hour > 12 ||
                          minute < 0 ||
                          minute > 59
                        ) {
                          dispatch(setReported(""));
                        } else {
                          setReportPeriod(reportPeriod);
                          updateReportedDateTime(e.target.value, reportPeriod);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Backspace" || event.key === ":") {
                          return;
                        }
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      placeholder="HH:MM"
                      style={{ width: "65px" }}
                      maxLength={5}
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        name="reportedAMtimePeriod"
                        value="AM"
                        checked={reportPeriod === "AM"}
                        onClick={(e) => {
                          if (viewOnly) {
                            e.preventDefault();
                            return;
                          }
                          const [hour, minute] = selectedReportTime?.split(":")?.map(Number) || [];
                          if (
                            isNaN(hour) ||
                            isNaN(minute) ||
                            hour < 1 ||
                            hour > 12 ||
                            minute < 0 ||
                            minute > 59
                          ) {
                            dispatch(setReported(""));
                          } else {
                            handleAM1Change("AM");
                          }
                        }}
                        style={{ marginRight: "1px" }}
                      />
                      &nbsp;AM
                    </Form.Label>
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        name="reportedPMtimePeriod"
                        value="PM"
                        checked={reportPeriod === "PM"}
                        onClick={(e) => {
                          if (viewOnly) {
                            e.preventDefault();
                            return;
                          }
                          const [hour, minute] = selectedReportTime?.split(":")?.map(Number) || [];
                          if (
                            isNaN(hour) ||
                            isNaN(minute) ||
                            hour < 1 ||
                            hour > 12 ||
                            minute < 0 ||
                            minute > 59
                          ) {
                            dispatch(setReported(""));
                          } else {
                            handleAM1Change("PM");
                          }
                        }}
                        style={{ marginRight: "1px" }}
                      />
                      &nbsp;PM
                    </Form.Label>
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Damage Code</Form.Label>
                  </Col>

                  <Col className="p-0" xs={5} hidden={shouldHideButton("unit-details") || !viewOnly}>
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="unitCode"
                      name="unitCode"
                      maxLength={30}
                      value={rowData?.delayedUnitCode1 ? rowData?.delayedUnitCode1.description?.trim() : ""}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>

                  <Col
                    xs={6}
                    className={`p-0 d-flex`}
                    hidden={shouldHideButton("delayed-details") && viewOnly}
                  >
                    <AutoCompleteDropdown
                      arrayList={damagedUnitCodeArray}
                      searchString={damagedUnitCodeInput}
                      renderItemId={(item) => item.delayedUnitCodePK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setDamagedUnitCodeInput(string))}
                      fetchDataBySearchString={(string) => fetchDamageUnitCode(string, "damage")}
                      onSelect={handleDelayUnitCodeLookup}
                      selectedId={damagedUnitCodeID}
                      clearInputCallback={() => {
                        setDamagedUnitCodeID("");
                        dispatch(setDamagedUnitCodeFK(null));
                        dispatch(setDamagedUnitCodeID(null));
                      }}
                      hidden={shouldHideButton("delayed-details") && viewOnly}
                      style={`pointer:true`}
                      disabled={shouldHideButton("delayed-details") && viewOnly}
                      className={`customFormControl ${
                        damagedUnitCodeInput && damagedUnitCodeID ? "borderGreen" : "borderRed"
                      }`}
                      maxHeight="170px"
                    />
                    <LookupButton
                      onClick={handleLookup}
                      hidden={shouldHideButton("delayed-details") && viewOnly}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Weather Code</Form.Label>
                  </Col>

                  <Col className="p-0" xs={5} hidden={shouldHideButton("unit-details") || !viewOnly}>
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="unitCode"
                      name="unitCode"
                      maxLength={30}
                      value={rowData?.delayedUnitCode ? rowData?.delayedUnitCode.description?.trim() : ""}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>

                  <Col
                    xs={6}
                    className={`p-0 d-flex`}
                    hidden={shouldHideButton("delayed-details") && viewOnly}
                  >
                    <AutoCompleteDropdown
                      arrayList={weatherUnitCodeArray}
                      searchString={weatherUnitCodeInput}
                      renderItemId={(item) => item.delayedUnitCodePK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setWeatherUnitCodeInput(string))}
                      fetchDataBySearchString={(string) => fetchDamageUnitCode(string, "weather")}
                      onSelect={handleWeatherUnitCodeLookup}
                      selectedId={weatherUnitCodeID}
                      clearInputCallback={() => {
                        setWeatherUnitCodeID("");
                        dispatch(setDamagedUnitCodeFK(null));
                        dispatch(setWeatherUnitCodeID(null));
                      }}
                      hidden={shouldHideButton("delayed-details") && viewOnly}
                      style={`pointer:true`}
                      disabled={shouldHideButton("delayed-details") && viewOnly}
                      className={`customFormControl ${
                        weatherUnitCodeInput && weatherUnitCodeID ? "borderGreen" : "borderRed"
                      }`}
                      maxHeight="170px"
                    />
                    <LookupButton
                      onClick={() => setShowWeatherLookup(true)}
                      hidden={shouldHideButton("delayed-details") && viewOnly}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Road Type Code</Form.Label>
                  </Col>

                  <Col className="p-0" xs={5} hidden={shouldHideButton("unit-details") || !viewOnly}>
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="unitCode"
                      name="unitCode"
                      maxLength={30}
                      value={rowData?.delayedUnitCode ? rowData?.delayedUnitCode.description?.trim() : ""}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>

                  <Col
                    xs={6}
                    className={`p-0 d-flex`}
                    hidden={shouldHideButton("delayed-details") && viewOnly}
                  >
                    <AutoCompleteDropdown
                      arrayList={roadTypeCodeArray}
                      searchString={roadTypeCodeInput}
                      renderItemId={(item) => item.delayedUnitCodePK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setRoadTypeCodeInput(string))}
                      fetchDataBySearchString={(string) => fetchDamageUnitCode(string, "roadType")}
                      onSelect={handleRoadTyperUnitCodeLookup}
                      selectedId={roadTypeUnitCodeID}
                      clearInputCallback={() => {
                        setRoadTypeUnitCodeID("");
                        dispatch(setDamagedUnitCodeFK(null));
                        dispatch(setRoadTypeUnitCodeID(null));
                      }}
                      hidden={shouldHideButton("delayed-details") && viewOnly}
                      style={`pointer:true`}
                      disabled={shouldHideButton("delayed-details") && viewOnly}
                      className={`customFormControl ${
                        roadTypeCodeInput && roadTypeUnitCodeID ? "borderGreen" : "borderRed"
                      }`}
                      maxHeight="170px"
                    />
                    <LookupButton
                      onClick={() => setShowRoadTypeLookup(true)}
                      hidden={shouldHideButton("delayed-details") && viewOnly}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Road Condition Code</Form.Label>
                  </Col>

                  <Col className="p-0" xs={5} hidden={shouldHideButton("unit-details") || !viewOnly}>
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="unitCode"
                      name="unitCode"
                      maxLength={30}
                      value={rowData?.delayedUnitCode ? rowData?.delayedUnitCode.description?.trim() : ""}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>

                  <Col
                    xs={6}
                    className={`p-0 d-flex`}
                    hidden={shouldHideButton("delayed-details") && viewOnly}
                  >
                    <AutoCompleteDropdown
                      arrayList={roadConditionCodeArray}
                      searchString={roadConditionCodeInput}
                      renderItemId={(item) => item.delayedUnitCodePK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setRoadConditionCodeInput(string))}
                      fetchDataBySearchString={(string) => fetchDamageUnitCode(string, "roadcondition")}
                      onSelect={handleRoadConditionrUnitCodeLookup}
                      selectedId={roadConditionUnitCodeID}
                      clearInputCallback={() => {
                        setDamagedUnitCodeID("");
                        dispatch(setDamagedUnitCodeFK(null));
                        dispatch(setRoadConditionUnitCodeID(null));
                      }}
                      hidden={shouldHideButton("delayed-details") && viewOnly}
                      style={`pointer:true`}
                      disabled={shouldHideButton("delayed-details") && viewOnly}
                      className={`customFormControl ${
                        roadConditionCodeInput && roadConditionUnitCodeID ? "borderGreen" : "borderRed"
                      }`}
                      maxHeight="170px"
                    />
                    <LookupButton
                      onClick={() => setShowRoadConditionLookup(true)}
                      hidden={shouldHideButton("delayed-details") && viewOnly}
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

                <Form.Group className="mt-2 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Driver Responsible</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="driverResponsible"
                      name="driverResponsible"
                      checked={driverResponsible}
                      onChange={(e) => dispatch(setDriverResponsible(e.target.checked))}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Driver Reported</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="driverReported"
                      name="driverReported"
                      checked={driverReported}
                      onChange={(e) => dispatch(setDriverReported(e.target.checked))}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Send Notification Email</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="email"
                      name="email"
                      checked={sendNotificationEmail}
                      onChange={(e) => dispatch(setSendNotificationEmail(e.target.checked))}
                      disabled={sendNotificationEmail}
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
                      value={pickupName?.trim() || ""}
                      id="pickupName"
                      name="pickupName"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
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
                      value={pickupCity?.trim() || ""}
                      id="pickupAddr1"
                      name="pickupAddr1"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <input
                      className="customFormControl"
                      name="pickupaddr2"
                      value={pickupState?.trim() || ""}
                      maxLength={4}
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
                      value={deliveryName?.trim() || ""}
                      id="delName"
                      name="delName"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
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
                      value={deliveryCity?.trim() || ""}
                      id="deliveryName"
                      name="deliveryName"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <input
                      className="customFormControl"
                      name="deliveryAddr1"
                      value={deliveryState?.trim() || ""}
                      maxLength={4}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">In Yard</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={inYard}
                      disabled={atDelivery || atLastLocation || atPickup}
                      onChange={(e) => {
                        const value = e.target.checked;

                        dispatch(setInYard(value));
                        if (!value) {
                          dispatch(setCurrentLocationName(""));
                          dispatch(setCurrentLocationAdd1(""));
                          dispatch(setCurrentLocationAdd2(""));
                          dispatch(setCurrentLocationCity(""));
                          dispatch(setCurrentLocationState(""));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Pickup</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="atlastLocation"
                      name="atlastLocation"
                      checked={atPickup}
                      disabled={atDelivery || atLastLocation || inYard}
                      onChange={(e) => {
                        const value = e.target.checked;

                        dispatch(setAtPickup(value));
                        if (!value) {
                          dispatch(setCurrentLocationName(""));
                          dispatch(setCurrentLocationAdd1(""));
                          dispatch(setCurrentLocationAdd2(""));
                          dispatch(setCurrentLocationCity(""));
                          dispatch(setCurrentLocationState(""));
                        }
                      }}
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
                      className="form-check-input p-0 "
                      id="atlastLocation"
                      name="atlastLocation"
                      checked={atLastLocation}
                      disabled={atDelivery || atPickup || inYard}
                      onChange={(e) => {
                        const value = e.target.checked;

                        dispatch(setAtLastLocation(value));
                        if (!value) {
                          dispatch(setCurrentLocationName(""));
                          dispatch(setCurrentLocationAdd1(""));
                          dispatch(setCurrentLocationAdd2(""));
                          dispatch(setCurrentLocationCity(""));
                          dispatch(setCurrentLocationState(""));
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
                      value={lastLocationName?.trim() || ""}
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
                      value={lastLocationCity?.trim() || ""}
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
                      value={lastLocationState?.trim() || ""}
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
                      checked={atDelivery}
                      disabled={atLastLocation || atPickup || inYard}
                      onChange={(e) => {
                        const value = e.target.checked;

                        dispatch(setAtDelivery(value));
                        if (!value) {
                          dispatch(setCurrentLocationName(""));
                          dispatch(setCurrentLocationAdd1(""));
                          dispatch(setCurrentLocationAdd2(""));
                          dispatch(setCurrentLocationCity(""));
                          dispatch(setCurrentLocationState(""));
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
                      className={`customFormControl ${
                        viewOnly && (atLastLocation || atPickup || inYard || atDelivery)
                          ? "borderBlack"
                          : !atLastLocation && !atPickup && !inYard && !atDelivery
                            ? currentLocationName
                              ? "borderGreen"
                              : "borderRed"
                            : ""
                      }`}
                      value={currentLocationName?.trim() || ""}
                      id="name"
                      name="name"
                      maxLength={30}
                      disabled={!viewOnly || atLastLocation || atPickup || inYard || atDelivery}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onInput={(e) => {
                        dispatch(setCurrentLocationName(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewOnly && (atLastLocation || atPickup || inYard || atDelivery)
                          ? "borderBlack"
                          : !atLastLocation && !atPickup && !inYard && !atDelivery
                            ? currentLocationAdd1
                              ? "borderGreen"
                              : "borderRed"
                            : ""
                      }`}
                      value={currentLocationAdd1?.trim() || ""}
                      disabled={!viewOnly || atLastLocation || atPickup || inYard || atDelivery}
                      id="ad1"
                      name="ad1"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setCurrentLocationAdd1(e.target.value));
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={currentLocationAdd2?.trim() || ""}
                      disabled={!viewOnly || atLastLocation || atPickup || inYard || atDelivery}
                      id="ad2"
                      name="ad2"
                      maxLength={30}
                      onInput={(e) => {
                        dispatch(setCurrentLocationAdd2(e.target.value));
                      }}
                      autoComplete="one-time-code"
                      spellCheck={false}
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
                <div style={{ marginTop: "-0.5rem" }}>
                  <PostalCodeComponent
                    disabled={!viewOnly || atLastLocation || atPickup || inYard || atDelivery}
                    city={currentLocationCity}
                    setCity={(city) => {
                      dispatch(setCurrentLocationCity(city));
                    }}
                    stateCode={currentLocationState}
                    setStateCode={(state) => {
                      dispatch(setCurrentLocationState(state));
                    }}
                    postalCode={currentLocationPostalCode}
                    setPostalCode={(postalCode) => {
                      dispatch(setCurrentLocationPostalCode(postalCode));
                    }}
                    setPostalValues={setPostalValues}
                    postalOptions={postalOptions}
                    postalCodePK={currentLocationPostalCodePK}
                    setPostalCodePK={(pk) => {
                      dispatch(setCurrentLocationPostalCodePK(pk));
                    }}
                    canadian={canadian}
                    setCanadian={setCanadian}
                  />
                </div>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Contact</Form.Label>
                  </Col>

                  <Col xs={8} md={7} sm={6} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="contact"
                      name="contact"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      value={contact}
                      onInput={(e) => {
                        dispatch(setContact(e.target.value));
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
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      value={Phone}
                      maxLength={14}
                      onChange={(e) => phoneFormatHandler(e)}
                      onInput={(e) => {
                        dispatch(setPhone(e.target.value));
                      }}
                      className={`customFormControl ${
                        viewOnly === 1
                          ? "borderBlack"
                          : !Phone || Phone?.trim() === ""
                            ? "borderRed"
                            : Phone?.length === 14
                              ? "borderGreen"
                              : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <DelayUnitCodeLookup
              show={showLookup}
              onHide={() => setShowLookup(false)}
              renderItemId={(item) => item.delayedUnitCodePK}
              MaintenanceProgram
              handleLookupSelection={handleDelayUnitCodeLookup}
              status={"damage"}
            />
            <DelayUnitCodeLookup
              show={showWeatherLookup}
              onHide={() => setShowWeatherLookup(false)}
              renderItemId={(item) => item.delayedUnitCodePK}
              MaintenanceProgram
              handleLookupSelection={handleWeatherUnitCodeLookup}
              status={"weather"}
            />
            <DelayUnitCodeLookup
              show={showRoadTypeLookup}
              onHide={() => setShowRoadTypeLookup(false)}
              renderItemId={(item) => item.delayedUnitCodePK}
              MaintenanceProgram
              handleLookupSelection={handleRoadTyperUnitCodeLookup}
              status={"roadType"}
            />
            <DelayUnitCodeLookup
              show={showRoadConditionLookup}
              onHide={() => setShowRoadConditionLookup(false)}
              renderItemId={(item) => item.delayedUnitCodePK}
              MaintenanceProgram
              handleLookupSelection={handleRoadConditionrUnitCodeLookup}
              status={"roadcondition"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default GeneralDamage;
