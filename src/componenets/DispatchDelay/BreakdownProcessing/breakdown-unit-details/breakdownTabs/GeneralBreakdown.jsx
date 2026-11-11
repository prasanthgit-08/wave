import { formatForApi, parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import { Formik } from "formik";
import * as yup from "yup";
import {
  setDelayDate,
  setDelayedUnitCodeFK,
  setDelayedUnitCodeID,
  setDelayedUnitCodeInput,
  setReported,
  setViewOnly,
  setGeneralTabData,
  setRepairedDate,
  setBreakdownData,
  setEditFlag,
  setBreakdownSaveFlag,
  setEmailTabVisible,
  setActivateUnit,
  setEditTabData,
  setInHouseNotes,
  setCustomerNotes,
  setSendEmail,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import LookupButton from "../../../../common/LookupButton";
import DelayUnitCodeLookup from "../../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { setPostalCodeOnChange } from "../../../../../redux/EditDealerSlice";
import {
  setCustomerPlantId,
  setCustomerPlantInput,
  setDealerId,
  setDealerInput,
  setPageNumber,
} from "../../../../../redux/EditMaster/UnitSelectionSlice";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import DealerLookup from "../../../../LookupScreens/Dealer/DealerLookup";
import { customerPlant } from "../../../../../redux/CustomerPlantEmailSlice";
import { setFeeDriverFK } from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownFeesSlice";
const GeneralBreakdown = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  const user = useSelector((state) => state.delaybreakdown.user);
  const [dispatchPk, setDispatchPk] = useState();
  const [unitFk, setUnitFk] = useState();
  const [driverFk, setDriverFk] = useState();
  const [driver, setDriver] = useState();
  const [unitNumber, setUnitNumber] = useState();
  const [model, setModel] = useState();
  const [vin, setVin] = useState();
  const [unitTypeDescription, setUnitTypeDescription] = useState();
  const [odometer, setOdometer] = useState(0);
  const [specialCodeDescription, setSpecialCodeDescription] = useState();
  const [lastLocationName, setLastLocationName] = useState();
  const [lastLocationCity, setLastLocationCity] = useState();
  const [lastLocationState, setLastLocationState] = useState();
  const [lastLocationAddress1, setLastLocationAddress1] = useState();
  const [lastLocationAddress2, setLastLocationAddress2] = useState();
  const [delayedUnitCodeFk, setDelayedUnitCodeFk] = useState();
  const [breakDownCode, setBreakDownCode] = useState();
  const [pickUpName, setPickUpName] = useState();
  const [pickUpCity, setPickUpCity] = useState();
  const [pickUpState, setPickUpState] = useState();
  const [transportCompanyFk, setTransportCompanyFk] = useState();
  const [deliveryName, setDeliveryName] = useState();
  const [deliveryCity, setDeliveryCity] = useState();
  const [deliveryState, setDeliveryState] = useState();

  const [pickupDealerFk, setPickupDealerFk] = useState();
  const [pickupUnitAddressFk, setPickupUnitAddressFk] = useState();
  const [pickupCustomerPlantFk, setPickupCustomerPlantFk] = useState();
  const [deliveryDealerFk, setDeliveryDealerFk] = useState();
  const [deliveryUnitAddressFk, setDeliveryUnitAddressFk] = useState();
  const [deliveryCustomerPlantFk, setDeliveryCustomerPlantFk] = useState();
  const [deliveryYardFk, setDeliveryYardFk] = useState();
  const [pickupyardfk, setPickupyardfk] = useState();
  const [breakdownfk, setBreakdownfk] = useState();
  const [contact, setContact] = useState();
  const [phone, setPhone] = useState();
  const [currentLocationName, setCurrentLocationName] = useState();
  const [currentLocationCity, setCurrentLocationCity] = useState();
  const [currentLocationState, setCurrentLocationState] = useState();
  const [currentLocationPostal, setCurrentLocationPostal] = useState();
  const [currentLocationAddress1, setCurrentLocationAddress1] = useState();
  const [currentLocationAddress2, setCurrentLocationAddress2] = useState();

  const [breakdownDate, setBreakdownDate] = useState();
  const [breakdownTime, setbreakdownTime] = useState();
  const [breakdownAM, setbreakdownAM] = useState(false);
  const [breakdownPM, setbreakdownPM] = useState(false);
  const [reportedDate, setReportedDate] = useState();
  const [reportedTime, setReportedTime] = useState();
  const [reportedAM, setReportedAM] = useState(false);
  const [reportedPM, setReportedPM] = useState(false);
  const [unitCode, setUnitCode] = useState();
  const [breakdownContact, setbreakdownContact] = useState();
  const [breakdownContactPhone, setbreakdownContactPhone] = useState();
  const [extn, setExtn] = useState();
  const [breakdownFax, setbreakdownFax] = useState();
  const [email, setEmail] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [repaired, setRepaired] = useState(false);
  const [furtherRepairs, setFurtherRepairs] = useState(false);
  const [deliveryTerminated, setDeliveryTerminated] = useState(false);
  const [terminateAtCurrentLoc, setterminateAtCurrentLoc] = useState(false);
  const [showLookup, setShowLookup] = useState(false);
  const [repairDealerFk, setrepairDealerFk] = useState();
  const [repairCustomerPlantFk, setrepairCustomerPlantFk] = useState();
  const [selectedDelayDate, setSelectedDelayDate] = useState();
  const [selectedDelayDateInput, setSelectedDelayDateInput] = useState("");
  const [isSelectedDelayDateValid, setIsSelectedDelayDateValid] = useState(true);
  const [selectedDelayTime, setSelectedDelayTime] = useState();
  const [selectedReportDate, setSelectedReportDate] = useState();
  const [selectedReportDateInput, setSelectedReportDateInput] = useState("");
  const [isSelectedReportDateValid, setIsSelectedReportDateValid] = useState(true);
  const [selectedReportTime, setSelectedReportTime] = useState();
  const [selectedRepairDate, setSelectedRepairDate] = useState();
  const [selectedRepairDateInput, setSelectedRepairDateInput] = useState("");
  const [isSelectedRepairDateValid, setIsSelectedRepairDateValid] = useState(true);

  const [delayPeriod, setDelayPeriod] = useState("AM"); // Default to AM
  const [reportPeriod, setReportPeriod] = useState("AM"); // Default to AM

  const delayDate = useSelector((state) => state.delaybreakdown.delayDate);
  const reported = useSelector((state) => state.delaybreakdown.reported);
  const repairedDate = useSelector((state) => state.delaybreakdown.repairedDate);
  const sendEmail = useSelector((state) => state.delaybreakdown.sendEmail);
  const updateEmailbreakdown = useSelector((state) => state.delaybreakdown.updateEmail);

  const [breakdownAtPickup, setBreakdownAtPickup] = useState(false);
  const [breakdownInYard, setBreakdownInYard] = useState(false);
  const [atPickup, setAtPickup] = useState(false);
  const [inYard, setInYard] = useState(false);
  const [atDelivery, setatDelivery] = useState(false);
  const [breakdownAtLastLoc, setbreakdownAtLastLoc] = useState(false);
  const [breakdownLocationName, setBreakdownLocationName] = useState();
  const [breakdownLocationAddress1, setBreakdownLocationAddress1] = useState();
  const [breakdownLocationAddress2, setBreakdownLocationAddress2] = useState();
  const [breakdownLocationCity, setBreakdownLocationCity] = useState();
  const [breakdownLocationState, setBreakdownLocationState] = useState();
  const [breakdownLocationPostal, setBreakdownLocationPostal] = useState();
  const [atRepairLocation, setAtRepairLocation] = useState(false);
  const [repairLocationName, setRepairLocationName] = useState();
  const [repairLocationAddress1, setRepairLocationAddress1] = useState();
  const [repairLocationAddress2, setRepairLocationAddress2] = useState();
  const [repairLocationCity, setRepairLocationCity] = useState();
  const [repairLocationState, setRepairLocationState] = useState();
  const [repairLocationPostal, setRepairLocationPostal] = useState();
  const [nameUnder, setNameUnder] = useState();
  const [workOrderNumber, setWorkOrderNumber] = useState();
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [currentpostalOptions, setCurrentPostalValues] = useState(initialValue);
  const [breakdownpostalOptions, setBreakdownPostalValues] = useState(initialValue);
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [breakdownUnitCodeArray, setbreakdownUnitCodeArray] = useState([]);
  const [canadian, setCanadian] = useState(false);
  const [showCustomerPlantLookup, setShowCustomerPlantLookup] = useState(false);
  const [plantsList, setPlantsList] = useState([]);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [dealersList, setDealersList] = useState([]);
  const generalTabData = useSelector((state) => state.delaybreakdown.generalTabData);
  const editTabData = useSelector((state) => state.delaybreakdown.editTabData);
  const viewOnly = useSelector((state) => state.delaybreakdown.viewOnly);
  const breakdownUnitCodeInput = useSelector((state) => state.delaybreakdown.delayedUnitCodeInput);
  const breakdownUnitCodeID = useSelector((state) => state.delaybreakdown.delayedUnitCodeID);
  const breakdownUnitCode = useSelector((state) => state.delaybreakdown.delayedUnitCodeFK);
  const inhousenotes = useSelector((state) => state.delaybreakdown.inHouseNotes);
  const customerNotes = useSelector((state) => state.delaybreakdown.customerNotes);
  const emailData = useSelector((state) => state.delaybreakdown.emailData);
  const activateUnit = useSelector((state) => state.delaybreakdown.activateUnit);
  const breakdownbrowseClicked = useSelector((state) => state.delaybreakdown.breakdownbrowseClicked);
  const editFlag = useSelector((state) => state.delaybreakdown.editFlag);
  const editBrkdownOfExistingDelayUnitFlag = useSelector(
    (state) => state.delaybreakdown.editBrkdownOfExistingDelayUnitFlag
  );
  const customerPlantInput = useSelector((state) => state.unitSelection.customerPlantInput);
  const dealerInput = useSelector((state) => state.unitSelection.dealerInput);
  const customerPlantId = useSelector((state) => state.unitSelection.customerPlantId);
  const dealerId = useSelector((state) => state.unitSelection.dealerId);
  const motorized = rowData?.unitTypeMotorized ? rowData.unitTypeMotorized : rowData?.unit?.motorized;

  /**Validation city,state,zip */
  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
  });

  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const getRecordBasedPnUnit = () => {
    let unitId = null;
    if (rowData?.unitPK) {
      unitId = rowData?.unitPK;
    }
    if (rowData?.unitFK) {
      unitId = rowData?.unitFK;
    }

    BreakdownProcessingService.getDelayBreakdownDetails("General", unitId, selectedCompanyName, 0)
      .then((res) => {
        const data = res?.data?.breakdownDetails;

        dispatch(setGeneralTabData(data[0]));
      })
      .catch((err) => {});
  };

  const fetchDelayedUnitCode = (string) => {
    BreakdownProcessingService.getBreakdownUnitCodesForAutoComplete(string).then((response) => {
      const data = response?.data?.content;
      const breakdownUnitCodeList = data?.map((codeList) => ({
        ...codeList,
        description: codeList.description?.trim(),
      }));
      setbreakdownUnitCodeArray(breakdownUnitCodeList);
    });
  };

  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setShowLookup(false);
    dispatch(setDelayedUnitCodeInput(delayUnitCode?.description?.trim()));
    dispatch(setDelayedUnitCodeID(delayUnitCode?.delayedUnitCodePK));
    dispatch(setDelayedUnitCodeFK(delayUnitCode?.delayedUnitCodePK));
  };

  const handleLookup = () => {
    setShowLookup(true);
  };
  const convertTo12Hour = (time24, date) => {
    if (time24) {
      const [hours, minutes] = time24?.split(":")?.map(Number);
      const suffix = hours >= 12 ? "PM" : "AM";
      if (date === "delayed") {
        setDelayPeriod(suffix);
      }
      if (date === "reported") {
        setReportPeriod(suffix);
      }
      const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      return `${hours12 < 10 ? "0" + hours12 : hours12}:${String(minutes).padStart(2, "0")}`;
    }
  };

  const handleAMChange = (value) => {
    setDelayPeriod(value);
    updateDelayDateTime(selectedDelayTime, value);
  };

  const handleAM1Change = (value) => {
    setReportPeriod(value);
    updateReportedDateTime(selectedReportTime, value);
  };

  const updateDelayDateTime = (time, period) => {
    const [hour, minute] = time?.split(":")?.map(Number);
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
      selectedDelayDate +
      "T" +
      `${convertedHour < 10 ? "0" + convertedHour : convertedHour}:${minute < 10 ? "0" + minute : minute}:00`;

    dispatch(setDelayDate(formattedDate));
  };

  const updateReportedDateTime = (time, period) => {
    const [hour, minute] = time?.split(":")?.map(Number);
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

  useEffect(() => {
    if (generalTabData != null) {
      setDispatchPk(generalTabData?.DispatchPk || null);
      setUnitFk(generalTabData?.UnitFk || generalTabData?.SisterUnitFk || null);
      setDriverFk(generalTabData?.DriverFk || null);
      setDriver(generalTabData?.Driver?.trim() || "");
      setUnitNumber(generalTabData?.UnitNumber?.trim() || "");
      setModel(generalTabData?.Model?.trim() || "");
      setVin(!breakdownbrowseClicked ? generalTabData?.VIN?.trim() || "" : editTabData?.VIN);
      setUnitTypeDescription(generalTabData?.UnitType_Description?.trim() || "");
      setSpecialCodeDescription(generalTabData?.SpecialCode_Description?.trim() || "");
      setLastLocationName(generalTabData?.LastLocation_Name?.trim() || "");
      setLastLocationCity(generalTabData?.LastLocation_City?.trim() || "");
      setLastLocationState(generalTabData?.LastLocation_State?.trim() || "");
      setLastLocationAddress1(generalTabData?.LastLocation_Address1?.trim() || "");
      setLastLocationAddress2(generalTabData?.LastLocation_Address2?.trim() || "");
      setDelayedUnitCodeFk(generalTabData?.DelayedUnitCodeFK || null);
      setPickUpName(generalTabData?.PickUp_Name?.trim() || "");
      setPickUpCity(generalTabData?.PickUp_City?.trim() || "");
      setPickUpState(generalTabData?.PickUp_State?.trim() || "");
      setTransportCompanyFk(generalTabData?.TransportCompanyFK || null);
      setDeliveryName(generalTabData?.Delivery_Name?.trim() || "");
      setDeliveryCity(generalTabData?.Delivery_City?.trim() || "");
      setDeliveryState(generalTabData?.Delivery_State?.trim() || "");
      setPickupDealerFk(generalTabData?.PickupDealerFK || null);
      setPickupUnitAddressFk(generalTabData?.PickupUnitAddressFK || null);
      setPickupCustomerPlantFk(generalTabData?.PickupCustomerPlantFK || null);
      setDeliveryDealerFk(generalTabData?.DeliveryDealerFK || null);
      setDeliveryUnitAddressFk(generalTabData?.DeliveryUnitAddressFK || null);
      setDeliveryCustomerPlantFk(generalTabData?.DeliveryCustomerPlantFK || null);
      setDeliveryYardFk(generalTabData?.DeliveryYardFK || null);
      setPickupyardfk(generalTabData?.pickupyardfk || null);
      setCurrentLocationName(generalTabData?.LastLocation_Name?.trim() || "");
      setCurrentLocationCity(generalTabData?.LastLocation_City?.trim() || "");
      setCurrentLocationState(generalTabData?.LastLocation_State?.trim() || "");
      setCurrentLocationAddress1(generalTabData?.LastLocation_Address1?.trim() || "");
      setCurrentLocationAddress2(generalTabData?.LastLocation_Address2?.trim() || "");
      setCurrentLocationPostal(generalTabData?.LastLocation_PostCode?.trim() || "");
      setBreakdownDate(generalTabData?.BreakdownDate?.trim() || null);
      setbreakdownTime(generalTabData?.DelayTime?.trim() || "");
      setbreakdownAM(generalTabData?.DelayAM || false);
      setbreakdownPM(generalTabData?.DelayPM || false);
      setReportedDate(generalTabData?.ReportedDate?.trim() || null);
      setReportedTime(generalTabData?.ReportedTime?.trim() || "");
      setReportedAM(generalTabData?.ReportedAM || false);
      setReportedPM(generalTabData?.ReportedPM || false);
      setUnitCode(generalTabData?.UnitCode?.trim() || "");
      setBreakdownAtPickup(generalTabData?.BreakdownAtPickup || false);
      setBreakdownInYard(generalTabData?.BreakdownInYard || false);
      setExtn(!breakdownbrowseClicked ? generalTabData?.Extn?.trim() || "" : editTabData.Extn?.trim() || "");
      setContact(
        !breakdownbrowseClicked ? generalTabData?.Contact?.trim() || "" : editTabData.Contact?.trim() || ""
      );
      setPhone(
        !breakdownbrowseClicked ? generalTabData?.Phone?.trim() || "" : editTabData.Phone?.trim() || ""
      );
      setAtRepairLocation(
        !breakdownbrowseClicked
          ? generalTabData?.AtRepairLocation || false
          : editTabData?.AtRepairLocation || false
      );
      setbreakdownAtLastLoc(true);
    }
  }, [generalTabData]);

  useEffect(() => {
    if (editTabData) {
      setSelectedDelayDate(editTabData?.BreakdownDate?.trim()?.slice(0, 10) || null);
      setSelectedReportDate(editTabData?.Reported?.trim()?.slice(0, 10) || null);
      setSelectedReportTime(convertTo12Hour(editTabData?.Reported?.substring(11, 19), "reported"));
      setSelectedDelayTime(convertTo12Hour(editTabData?.BreakdownDate?.substring(11, 19), "delayed"));
      setSelectedRepairDate(editTabData?.RepairDate?.trim()?.slice(0, 10) || null);
      setbreakdownContact(editTabData?.BreakdownContact?.trim() || "");
      setbreakdownContactPhone(editTabData?.BreakdownContactPhone?.trim() || "");
      setExtn(editTabData?.BreakdownContactExtension?.trim() || "");
      setbreakdownFax(editTabData?.BreakdownContactFAX?.trim() || "");
      setRepaired(editTabData?.Repaired || false);
      setFurtherRepairs(editTabData?.FurtherRepairsRequired || false);
      setDeliveryTerminated(editTabData?.TerminateDelivery || false);
      setBreakdownfk(breakdownbrowseClicked ? editTabData?.DelayedUnitBreakdownPK : null);
      setBreakdownAtPickup(editTabData?.AtPickup || false);
      setBreakdownInYard(editTabData?.InYard || false);
      setBreakdownLocationName(generalTabData?.BreakdownLocationName?.trim() || "");
      setBreakdownLocationAddress1(generalTabData?.BreakdownLocationAddress1?.trim() || "");
      setBreakdownLocationAddress2(generalTabData?.BreakdownLocationAddress2?.trim() || "");
      setAtRepairLocation(editTabData?.AtRepairLocation || false);
      setNameUnder(editTabData?.NameUnder?.trim() || "");
      setWorkOrderNumber(editTabData?.WorkOrderNumber?.trim() || "");
      setVin(editTabData?.VIN?.trim() || "");
      setExtn(generalTabData?.Extn?.trim() || "");
      setContact(editTabData?.Contact?.trim() || "");
      setPhone(editTabData?.Phone?.trim() || "");
      setOdometer(editTabData?.OdoMeter || "");
      setBreakDownCode(editTabData?.BreakdownDelayUnit_Description);
      if (editTabData?.BreakdownUnitLocationFK) {
        setBreakdownLocationName(editTabData?.BreakdownUnitLocation_Name?.trim());
        setBreakdownLocationAddress1(editTabData?.BreakdownUnitLocation_Address1?.trim());
        setBreakdownLocationAddress2(editTabData?.BreakdownUnitLocation_Address2?.trim());
        setBreakdownLocationCity(editTabData?.BreakdownUnitLocation_City);
        setBreakdownLocationState(editTabData?.BreakdownUnitLocation_StateCode);
        setBreakdownLocationPostal(editTabData?.BreakdownUnitLocation_PostalCode);
      } else if (editTabData?.BreakdownDealerFK) {
        setBreakdownLocationName(editTabData?.BreakdownDealer_Name?.trim());
        setBreakdownLocationAddress1(editTabData?.BreakdownDealer_Address1?.trim());
        setBreakdownLocationAddress2(editTabData?.BreakdownDealer_Address2?.trim());
        setBreakdownLocationCity(editTabData?.BreakdownDealer_City);
        setBreakdownLocationState(editTabData?.BreakdownDealer_StateCode);
        setBreakdownLocationPostal(editTabData?.BreakdownDealer_PostalCode);
      } else if (editTabData?.BreakdownUnitAddressFK) {
        setBreakdownLocationName(editTabData?.BreakdownUnit_Name?.trim());
        setBreakdownLocationAddress1(editTabData?.BreakdownUnit_Address1?.trim());
        setBreakdownLocationAddress2(editTabData?.BreakdownUnit_Address2?.trim());
        setBreakdownLocationCity(editTabData?.BreakdownUnit_City);
        setBreakdownLocationState(editTabData?.BreakdownUnit_StateCode);
        setBreakdownLocationPostal(editTabData?.BreakdownUnit_PostalCode);
      }

      if (editTabData?.RepairDealerFK) {
        setRepairLocationName(editTabData?.RepairDealer_Name?.trim());
        setRepairLocationAddress1(editTabData?.RepairDealer_Address1?.trim());
        setRepairLocationAddress2(editTabData?.RepairDealer_Address2?.trim());
        setRepairLocationCity(editTabData?.RepairDealer_City);
        setRepairLocationState(editTabData?.RepairDealer_StateCode);
        setRepairLocationPostal(editTabData?.RepairDealer_PostalCode);
        dispatch(setDealerInput(editTabData?.RepairDealer_Name?.trim()));
        dispatch(setDealerId(editTabData?.RepairDealerFK));
      } else if (editTabData?.RepairUnitAddressFK) {
        setRepairLocationName(editTabData?.RepairUnit_Name?.trim());
        setRepairLocationAddress1(editTabData?.RepairUnit_Address1?.trim());
        setRepairLocationAddress2(editTabData?.RepairUnit_Address2)?.trim();
        setRepairLocationCity(editTabData?.RepairUnit_City);
        setRepairLocationState(editTabData?.RepairUnit_StateCode);
        setRepairLocationPostal(editTabData?.RepairUnit_PostalCode);
      } else if (editTabData?.RepairCustomerPlantFK) {
        setRepairLocationName(editTabData?.RepairCustomer_Name?.trim());
        setRepairLocationAddress1(editTabData?.RepairCustomer_Address1?.trim());
        setRepairLocationAddress2(editTabData?.RepairCustomer_Address2?.trim());
        setRepairLocationCity(editTabData?.RepairCustomer_City);
        setRepairLocationState(editTabData?.RepairCustomer_StateCode);
        setRepairLocationPostal(editTabData?.RepairCustomer_PostalCode);
        dispatch(setCustomerPlantInput(editTabData?.RepairCustomer_Name?.trim()));
        dispatch(setCustomerPlantId(editTabData?.RepairCustomerPlantFK));
      }
    }
  }, [editTabData]);

  const generalBreakdownData = () => {
    dispatch(
      setBreakdownData({
        unitFk: unitFk,
        delayedUnitFk: rowData?.delayedUnitPK || null,
        breakdownDate: delayDate,
        reported: reported,
        breakDownDelayedUnitCodeFk: breakdownUnitCode,
        breakdownYardFk: inYard ? generalTabData?.pickupyardfk : null,
        breakdownDealerFk: atDelivery
          ? generalTabData?.DeliveryDealerFK
          : atPickup
            ? generalTabData?.PickupDealerFK
            : null,
        inHouseNotes: inhousenotes?.trim()
          ? inhousenotes?.trim() + `\n[${new Date().toISOString()}]\t${user}`
          : "",
        customerNotes: customerNotes?.trim()
          ? customerNotes?.trim() + `\n[${new Date().toISOString()}]\t${user}`
          : "",
        breakdownPk: breakdownfk,
        atPickup: atPickup,
        inYard: inYard,
        atDelivery: atDelivery,
        phone: phone?.replace(/\s+/g, ""),
        contact: contact,
        vin: vin,
        odoMeter: odometer || 0,
        breakdownUnitAddressFk: null,
        breakdownUnitLocationFk: breakdownAtLastLoc ? generalTabData?.LastLocationFK : null,
        repaired: repaired,
        atRepairLocation: atRepairLocation,
        repairDate: selectedRepairDate,
        repairDealerFk: repairDealerFk,
        repairUnitAddressFk: null,
        repairCustomerPlantFk: repairCustomerPlantFk,
        furtherRepairsRequired: furtherRepairs,
        xmlData: emailData,
        company: selectedCompanyName,
        currentLocationName: currentLocationName,
        currentLocationAddress1: currentLocationAddress1,
        currentLocationAddress2: currentLocationAddress2,
        currentLocationCity: currentLocationCity,
        currentLocationState: currentLocationState,
        currentLocationPostal: currentLocationPostal,
        terminateDelivery: terminateAtCurrentLoc,
        nameUnder: nameUnder,
        workOrderNumber: workOrderNumber,
        repairLocationName: repairLocationName,
        repairLocationAddress1: repairLocationAddress1,
        repairLocationAddress2: repairLocationAddress2,
        repairLocationCity: repairLocationCity,
        repairLocationState: repairLocationState,
        repairLocationPostal: repairLocationPostal,
      })
    );

    const locationNameValid = editBrkdownOfExistingDelayUnitFlag
      ? !!breakdownLocationName
      : !!currentLocationName;

    const addressValid = editBrkdownOfExistingDelayUnitFlag
      ? !!breakdownLocationAddress1
      : !!currentLocationAddress1;

    const postalValid = editBrkdownOfExistingDelayUnitFlag
      ? !!breakdownLocationPostal
      : !!currentLocationPostal;

    const phoneValid = formatPhoneNumber(phone)?.length === 14;

    const allFieldsValid =
      delayDate &&
      reported &&
      phoneValid &&
      (breakDownCode || breakdownUnitCodeInput) &&
      locationNameValid &&
      addressValid &&
      postalValid;
    const motorized = rowData?.unitTypeMotorized ? rowData.unitTypeMotorized : rowData?.unit?.motorized;
    const isValidVin = motorized && vin && odometer;

    if (allFieldsValid) {
      dispatch(setBreakdownSaveFlag(true));
      motorized
        ? !isValidVin
          ? dispatch(setBreakdownSaveFlag(false))
          : dispatch(setBreakdownSaveFlag(true))
        : vin
          ? dispatch(setBreakdownSaveFlag(true))
          : dispatch(setBreakdownSaveFlag(false));
    } else {
      dispatch(setBreakdownSaveFlag(false));
    }
    if (editBrkdownOfExistingDelayUnitFlag) {
      if (((motorized && isValidVin) || (!motorized && vin)) && delayDate && reported) {
        dispatch(setBreakdownSaveFlag(true));
      } else {
        dispatch(setBreakdownSaveFlag(false));
      }
      if (repaired || furtherRepairs) {
        if (
          isSelectedRepairDateValid &&
          (customerPlantInput || dealerInput) &&
          repairLocationName &&
          repairLocationAddress1 &&
          repairLocationCity &&
          repairLocationState &&
          repairLocationPostal &&
          nameUnder &&
          workOrderNumber &&
          contact &&
          (motorized ? isValidVin : vin) &&
          delayDate &&
          reported &&
          phoneValid
        ) {
          dispatch(setBreakdownSaveFlag(true));
        } else {
          dispatch(setBreakdownSaveFlag(false));
        }
      } else {
        dispatch(setBreakdownSaveFlag(false));
      }
    }
  };

  useEffect(() => {
    generalBreakdownData();
  }, [
    furtherRepairs,
    unitFk,
    rowData?.delayedUnitPK,
    delayDate,
    reported,
    breakdownUnitCodeID,
    inYard,
    inhousenotes,
    customerNotes,
    atPickup,
    atDelivery,
    repaired,
    atRepairLocation,
    emailData,
    selectedCompanyName,
    currentLocationName,
    currentLocationAddress1,
    currentLocationAddress2,
    currentLocationCity,
    currentLocationState,
    currentLocationPostal,
    odometer,
    contact,
    phone,
    vin,
    isSelectedRepairDateValid,
    selectedRepairDate,
    repairedDate,
    terminateAtCurrentLoc,
    nameUnder,
    workOrderNumber,
    customerPlantInput,
    dealerInput,
  ]);

  const resetLocation = () => {
    setCurrentLocationName("");
    setCurrentLocationCity("");
    setCurrentLocationState("");
    setCurrentLocationPostal("");
    setCurrentLocationAddress1("");
    setCurrentLocationAddress2("");
  };

  useEffect(() => {
    getRecordBasedPnUnit();
    if (!editBrkdownOfExistingDelayUnitFlag) {
      setSelectedDelayDate(formatForApi(new Date()));
      setSelectedReportDate(formatForApi(new Date()));
      const utcTime = new Date().toISOString(); // Current time in UTC
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };
      const localTime = parseLocalDate(utcTime).toLocaleTimeString("en-US", options);
      setSelectedDelayTime(convertTo12Hour(localTime, "delayed"));
      setSelectedReportTime(convertTo12Hour(localTime, "reported"));
      dispatch(setDelayDate(formatForApi(new Date()) + "T" + localTime));
      dispatch(setReported(formatForApi(new Date()) + "T" + localTime));
      dispatch(setDealerInput(""));
      dispatch(setCustomerPlantInput(""));
    }
  }, []);

  useEffect(() => {
    if (editBrkdownOfExistingDelayUnitFlag && !atRepairLocation) {
      setWorkOrderNumber("");
      setNameUnder("");
      setContact(editTabData?.Contact ? editTabData?.Contact : "");
      setPhone(editTabData?.Phone ? editTabData?.Phone : "");
      dispatch(setDealerInput(""));
      dispatch(setCustomerPlantInput(""));
      resetLoc();
    }
  }, [atRepairLocation]);

  useEffect(() => {
    if (generalTabData && breakdownAtLastLoc) {
      setCurrentLocationName(generalTabData?.LastLocation_Name?.trim() || "");
      setCurrentLocationCity(generalTabData?.LastLocation_City?.trim() || "");
      setCurrentLocationState(generalTabData?.LastLocation_State?.trim() || "");
      setCurrentLocationPostal(generalTabData?.LastLocation_PostCode?.trim() || "");
      setCurrentLocationAddress1(generalTabData?.LastLocation_Address1?.trim() || "");
      setCurrentLocationAddress2(generalTabData?.LastLocation_Address2?.trim() || "");
      setInYard(false);
      setAtPickup(false);
      setatDelivery(false);
    } else {
      if (!inYard && !atDelivery && !atPickup) {
        resetLocation();
      }
    }
  }, [breakdownAtLastLoc]);

  useEffect(() => {
    if (generalTabData && inYard) {
      setCurrentLocationName(generalTabData?.Yard_CurLocation_Name?.trim() || "");
      setCurrentLocationCity(generalTabData?.Yard_CurLocation_City?.trim() || "");
      setCurrentLocationState(generalTabData?.Yard_CurLocation_State?.trim() || "");
      setCurrentLocationPostal(generalTabData?.Yard_CurLocation_PostCode?.trim() || "");
      setCurrentLocationAddress1(generalTabData?.Yard_CurLocation_Add1?.trim() || "");
      setCurrentLocationAddress2(generalTabData?.Yard_CurLocation_Add2?.trim() || "");
      setbreakdownAtLastLoc(false);
      setAtPickup(false);
      setatDelivery(false);
    } else {
      if (!breakdownAtLastLoc && !atDelivery && !atPickup) {
        resetLocation();
      }
    }
  }, [inYard]);

  useEffect(() => {
    if (generalTabData && atPickup) {
      setCurrentLocationName(generalTabData?.PickUp_CurLocation_Name?.trim() || "");
      setCurrentLocationCity(generalTabData?.PickUp_CurLocation_City?.trim() || "");
      setCurrentLocationState(generalTabData?.PickUp_CurLocation_State?.trim() || "");
      setCurrentLocationPostal(generalTabData?.PickUp_CurLocation_PostCode?.trim() || "");
      setCurrentLocationAddress1(generalTabData?.PickUp_CurLocation_Add1?.trim() || "");
      setCurrentLocationAddress2(generalTabData?.PickUp_CurLocation_Add2?.trim() || "");
      setbreakdownAtLastLoc(false);
      setInYard(false);
      setatDelivery(false);
    } else {
      if (!breakdownAtLastLoc && !atDelivery && !inYard) {
        resetLocation();
      }
    }
  }, [atPickup]);

  useEffect(() => {
    if (generalTabData && atDelivery) {
      setCurrentLocationName(generalTabData?.Delivery_Name?.trim() || "");
      setCurrentLocationCity(generalTabData?.Delivery_City?.trim() || "");
      setCurrentLocationState(generalTabData?.Delivery_State?.trim() || "");
      setCurrentLocationPostal(generalTabData?.Delivery_PostCode?.trim() || "");
      setCurrentLocationAddress1(generalTabData?.Delivery_Address1?.trim() || "");
      setCurrentLocationAddress2(generalTabData?.Delivery_Address2?.trim() || "");
      setbreakdownAtLastLoc(false);
      setInYard(false);
      setAtPickup(false);
    } else {
      if (!breakdownAtLastLoc && !atPickup && !inYard) {
        resetLocation();
      }
    }
  }, [atDelivery]);

  useEffect(() => {
    if (!selectedRepairDate && repaired) {
      setSelectedRepairDate(formatForApi(new Date()));
    }
  }, [repaired]);

  useEffect(() => {
    if (pathname?.includes("breakdown-details")) {
      dispatch(setViewOnly(false));
      dispatch(setEditFlag(true));
      setOdometer("");
      dispatch(setDelayedUnitCodeInput(""));
      setVin("");
      dispatch(setInHouseNotes(""));
      dispatch(setCustomerNotes(""));
      dispatch(setBreakdownSaveFlag(false));
      setEmail(sendEmail);
    }

    if (pathname?.includes("view-breakdown")) {
      setUpdateEmail(updateEmailbreakdown);
    }

    fetchBreakdown();
  }, []);

  const fetchBreakdown = () => {
    if (pathname?.includes("view-breakdown")) {
      dispatch(setViewOnly(true));
      dispatch(setEditFlag(false));
      const payload = {
        company: selectedCompanyName,
        breakdownPk: breakdownFK,
      };
      BreakdownProcessingService.getBreakdownInfo(payload)
        .then((response) => {
          if (response && response?.data) {
            const breakdownDetails = response?.data?.breakdownDetails;
            dispatch(setEditTabData(breakdownDetails[0]));
          }
        })
        .catch((err) => {
          console.error("Error fetching breakdown data:", err);
        });
    }
  };

  const resetLoc = () => {
    setRepairLocationName("");
    setRepairLocationAddress1("");
    setRepairLocationAddress2("");
    setRepairLocationCity("");
    setRepairLocationState("");
    setRepairLocationPostal("");
    setPostalCodePK(null);
  };

  /**
   * Used for Pickup Dealer selection AutoComplete
   */
  const fetchDealerByName = (string) => {
    BreakdownProcessingService.fetchAllDealerDetailsByName(string, selectedCompanyName)
      .then((response) => {
        const data = response?.data;
        const dealerList = data?.content?.map((dealer) => ({
          ...dealer,
          name: dealer?.name?.trim(),
        }));
        setDealersList(dealerList);
      })
      .catch((err) => {});
  };

  /**
   * used for Dealer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleDealerSelection = (dealer) => {
    dispatch(setDealerInput(dealer?.name || ""));
    dispatch(setDealerId(dealer?.dealerPK || ""));
    setrepairDealerFk(dealer?.dealerPK);
    dispatch(setPageNumber(0));
    setShowDealerLookup(false);
    setRepairLocationName(dealer?.name || "");
    setRepairLocationCity(dealer?.city || "");
    setRepairLocationState(dealer?.stateCode || "");
    setRepairLocationPostal(dealer?.postalCode || "");
    setRepairLocationAddress1(dealer?.address1 || "");
    setRepairLocationAddress2(dealer?.address2 || "");
    setPostalCodePK(dealer?.postalCodePK);
  };

  /**
   * Fetch all the customer plants for Autocomplete
   */
  const fetchAllPlantdetailsByName = (string) => {
    BreakdownProcessingService.fetchAllPlantdetailsByName(string, selectedCompanyName)
      .then((response) => {
        const data = response?.data;
        const plantList = data?.content?.map((plant) => ({
          ...plant,
          name: plant?.name?.trim(),
        }));
        setPlantsList(plantList);
      })
      .catch((err) => {});
  };
  /**
   * used for Plant selection Autocomplete & Lookup - onSelect
   */
  const handleCustomerPlantSelection = (plant) => {
    dispatch(setCustomerPlantInput(plant?.name || ""));
    dispatch(setCustomerPlantId(plant?.customerPlantPK || ""));
    dispatch(setPageNumber(0));
    setrepairCustomerPlantFk(plant?.customerPlantPK);
    setShowCustomerPlantLookup(false);
    setRepairLocationName(plant?.name || "");
    setRepairLocationCity(plant?.city || "");
    setRepairLocationState(plant?.stateCode || "");
    setRepairLocationPostal(plant?.postalCode || "");
    setRepairLocationAddress1(plant?.address1 || "");
    setRepairLocationAddress2(plant?.address2 || "");
    setPostalCodePK(plant?.postalCodePK);
  };

  useEffect(() => {
    if (editBrkdownOfExistingDelayUnitFlag) {
      if (repaired || furtherRepairs) {
        dispatch(setEmailTabVisible(true));
      } else {
        dispatch(setEmailTabVisible(false));

        resetLoc();
      }
    } else {
      fetchBreakdown();
    }
  }, [editBrkdownOfExistingDelayUnitFlag, repaired, furtherRepairs]);

  useEffect(() => {
    dispatch(setFeeDriverFK(generalTabData?.DriverFk));
  }, [generalTabData]);

  return (
    <Formik
      initialValues={{
        currentLocationCity,
        currentLocationState,
        currentLocationPostal,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        currentLocationCity: true,
        currentLocationState: true,
        currentLocationPostal: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div>
            <Row className="m-0 p-0">
              <Col sm={6} md={6} xs={6}>
                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Driver</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="driverName"
                      name="driverName"
                      maxLength={30}
                      value={driver}
                      onChange={(e) => setDriver(e.target.value)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`form-group align-items-center row m-l-0 m-r-0 ${
                    pathname?.includes("breakdown-details") ? "mt-4" : "mt-2"
                  }`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Unit Number</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="description"
                      name="description"
                      maxLength={30}
                      value={unitNumber}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Model</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="model"
                      name="model"
                      maxLength={30}
                      value={model}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Unit Type</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="untType"
                      name="unitType"
                      maxLength={30}
                      value={unitTypeDescription}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Special Code</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="specialCode"
                      name="specialCode"
                      maxLength={30}
                      value={specialCodeDescription}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`form-group align-items-center row m-l-0 m-r-0 ${
                    pathname?.includes("breakdown-details") ? "mt-4" : "mt-2"
                  }`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> VIN</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        !viewOnly || (editBrkdownOfExistingDelayUnitFlag && (repaired || furtherRepairs))
                          ? !vin
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      id="vin"
                      name="vin"
                      maxLength={21}
                      value={vin}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        setVin(e.target.value);
                      }}
                      disabled={
                        !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!motorized}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Odometer</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 w-70px">
                    <input
                      type="text"
                      className={`customFormControl
                         ${
                           (editBrkdownOfExistingDelayUnitFlag &&
                             (repaired || furtherRepairs) &&
                             (rowData?.unitTypeMotorized || rowData?.unit?.motorized)) ||
                           (!viewOnly && (rowData?.unitTypeMotorized || rowData?.unit?.motorized))
                             ? !odometer
                               ? "borderRed"
                               : "borderGreen"
                             : ""
                         }`}
                      id="odometer"
                      name="odometer"
                      maxLength={30}
                      value={odometer}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={
                        !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                      }
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}?$/) &&
                          e.target.value <= 32767 &&
                          setOdometer(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Breakdown Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={selectedDelayDate}
                      setDate={(value) => {
                        setSelectedDelayDate(value);
                        dispatch(setDelayDate(value + "T" + selectedDelayTime));
                      }}
                      dateInput={selectedDelayDateInput}
                      setDateInput={(value) => {
                        setSelectedDelayDateInput(value);
                      }}
                      setIsDateValid={(value) => {
                        if (!value) {
                          dispatch(setDelayDate(""));
                        }
                        setIsSelectedDelayDateValid(value);
                      }}
                      className={
                        !viewOnly || (editBrkdownOfExistingDelayUnitFlag && (repaired || furtherRepairs))
                          ? !isSelectedDelayDateValid || !selectedDelayDate
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }
                      disabled={
                        !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                      }
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      className={`customFormControl  ${
                        !viewOnly || (editBrkdownOfExistingDelayUnitFlag && (repaired || furtherRepairs))
                          ? isNaN(parseLocalDate(delayDate).getTime())
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      id="delayTime"
                      name="delayTime"
                      value={selectedDelayTime}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        setSelectedDelayTime(e.target.value);
                        const [hour, minute] = e.target.value.split(":").map(Number);
                        if (
                          isNaN(hour) ||
                          isNaN(minute) ||
                          hour < 1 ||
                          hour > 12 ||
                          minute < 0 ||
                          minute > 59
                        ) {
                          dispatch(setDelayDate(""));
                        } else {
                          dispatch(setDelayDate(selectedDelayDate + "T" + selectedDelayTime));
                          setDelayPeriod(delayPeriod);
                          updateDelayDateTime(e.target.value, delayPeriod);
                        }
                      }}
                      style={{ width: "65px" }}
                      onKeyDown={(event) => {
                        // Allow backspace and other control keys
                        if (event.key === "Backspace" || event.key === ":") {
                          return; // Do nothing
                        }

                        // Prevent input of invalid characters (not a number or colon)
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      placeholder="HH:MM"
                      maxLength={5}
                      disabled={
                        !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                      }
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        disabled={
                          !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                        }
                        name="delayAMtimePeriod"
                        value="AM"
                        checked={delayPeriod === "AM"}
                        onClick={(e) => {
                          const [hour, minute] = selectedDelayTime?.split(":")?.map(Number) || [];
                          if (
                            isNaN(hour) ||
                            isNaN(minute) ||
                            hour < 1 ||
                            hour > 12 ||
                            minute < 0 ||
                            minute > 59
                          ) {
                            dispatch(setDelayDate(""));
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
                        disabled={
                          !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                        }
                        name="delayPMtimePeriod"
                        value="PM"
                        checked={delayPeriod === "PM"}
                        onClick={(e) => {
                          const [hour, minute] = selectedDelayTime?.split(":")?.map(Number) || [];
                          if (
                            isNaN(hour) ||
                            isNaN(minute) ||
                            hour < 1 ||
                            hour > 12 ||
                            minute < 0 ||
                            minute > 59
                          ) {
                            dispatch(setDelayDate(""));
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
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Reported Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={selectedReportDate}
                      setDate={(value) => {
                        setSelectedReportDate(value);
                        dispatch(setReported(value + "T" + selectedReportTime));
                      }}
                      dateInput={selectedReportDateInput}
                      setDateInput={(value) => {
                        setSelectedReportDateInput(value);
                      }}
                      setIsDateValid={(value) => {
                        if (!value) {
                          dispatch(setReported(""));
                        }
                        setIsSelectedReportDateValid(value);
                      }}
                      className={
                        !viewOnly || (editBrkdownOfExistingDelayUnitFlag && (repaired || furtherRepairs))
                          ? !isSelectedReportDateValid || !selectedReportDate
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }
                      disabled={
                        !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                      }
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      className={`customFormControl  ${
                        !viewOnly || (editBrkdownOfExistingDelayUnitFlag && (repaired || furtherRepairs))
                          ? isNaN(parseLocalDate(reported).getTime())
                            ? "borderRed"
                            : "borderGreen"
                          : ""
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
                        // Allow backspace and other control keys
                        if (event.key === "Backspace" || event.key === ":") {
                          return; // Do nothing
                        }

                        // Prevent input of invalid characters (not a number or colon)
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      placeholder="HH:MM"
                      style={{ width: "65px" }}
                      maxLength={5}
                      disabled={
                        !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                      }
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        disabled={
                          !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                        }
                        name="reportedAMtimePeriod"
                        value="AM"
                        checked={reportPeriod === "AM"}
                        onClick={(e) => {
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
                        disabled={
                          !editFlag || (editBrkdownOfExistingDelayUnitFlag && !repaired && !furtherRepairs)
                        }
                        name="reportedPMtimePeriod"
                        value="PM"
                        checked={reportPeriod === "PM"}
                        onClick={(e) => {
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

                <Form.Group className="mt-2 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Breakdown Code</Form.Label>
                  </Col>

                  {viewOnly ? (
                    <Col className="p-0" xs={5}>
                      <input
                        type="text"
                        className="customFormControl"
                        id="unitCode"
                        name="unitCode"
                        maxLength={30}
                        autoComplete="new-password"
                        value={breakDownCode}
                        disabled
                      />
                    </Col>
                  ) : (
                    <Col xs={6} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        arrayList={breakdownUnitCodeArray}
                        searchString={breakdownUnitCodeInput}
                        renderItemId={(item) => item.delayedUnitCodePK}
                        renderItemField={(item) => item.description}
                        handleSearchString={(string) => dispatch(setDelayedUnitCodeInput(string))}
                        fetchDataBySearchString={fetchDelayedUnitCode}
                        onSelect={handleDelayUnitCodeLookup}
                        selectedId={breakdownUnitCodeID}
                        clearInputCallback={() => {
                          dispatch(setDelayedUnitCodeID(""));
                          dispatch(setDelayedUnitCodeFK(null));
                        }}
                        style="pointer:true"
                        disabled={viewOnly}
                        className={`customFormControl ${
                          breakdownUnitCodeInput && breakdownUnitCodeID && breakdownUnitCode !== null
                            ? "borderGreen"
                            : "borderRed"
                        }`}
                        maxHeight="170px"
                      />
                      <LookupButton onClick={handleLookup} />
                    </Col>
                  )}
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Customer Breakdown Contact
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="breakdownContact"
                      name="breakdownContact"
                      maxLength={30}
                      value={breakdownContact}
                      onChange={(e) => setbreakdownContact(e.target.value)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Breakdown Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="breakdownContactPhone"
                      name="breakdownContactPhone"
                      maxLength={30}
                      value={breakdownContactPhone}
                      onChange={(e) => setbreakdownContactPhone(e.target.value)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0" style={{ width: "11%" }}>
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="extn"
                      name="extn"
                      maxLength={30}
                      value={extn}
                      onChange={(e) => setExtn(e.target.value)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Breakdown FAX</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="breakdownFax"
                      name="breakdownFax"
                      maxLength={30}
                      value={breakdownFax}
                      onChange={(e) => setbreakdownFax(e.target.value)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Send Notification Email</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      label="Email"
                      id="email"
                      checked={email}
                      onChange={(e) => {
                        setEmail(e.target.checked);
                        dispatch(setSendEmail(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly || !editFlag}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Send Update Email</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      label="Update Email"
                      id="updateEmail"
                      checked={updateEmail}
                      onChange={(e) => {
                        setUpdateEmail(e.target.checked);
                        dispatch(setUpdateEmail(e.target.checked));
                      }}
                      disabled={!editFlag || (!repaired && !furtherRepairs)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Repaired</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input ${
                        editFlag ? (repaired || furtherRepairs ? "" : "borderRed") : ""
                      }`}
                      label="Repaired"
                      id="repaired"
                      checked={repaired}
                      onChange={(e) => {
                        const value = e.target.checked;
                        setRepaired(value);
                        if (!value) {
                          setSelectedRepairDate(value);
                          dispatch(setRepairedDate(""));
                          setDeliveryTerminated(false);
                          setActivateUnit(false);
                          setAtRepairLocation(false);
                          setterminateAtCurrentLoc(false);
                        }
                      }}
                      disabled={!editFlag}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Repair Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={selectedRepairDate}
                      setDate={(value) => {
                        setSelectedRepairDate(value);
                        dispatch(setRepairedDate(value));
                      }}
                      dateInput={selectedRepairDateInput}
                      setDateInput={(value) => {
                        setSelectedRepairDateInput(value);
                      }}
                      setIsDateValid={(value) => {
                        if (!value) {
                          dispatch(setRepairedDate(""));
                        } else {
                          dispatch(setRepairedDate(value));
                        }
                        setIsSelectedRepairDateValid(value);
                      }}
                      className={
                        editFlag && (repaired || furtherRepairs)
                          ? !isSelectedRepairDateValid || !selectedRepairDate
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }
                      disabled={!editFlag || (!repaired && !furtherRepairs)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Further Repairs Required</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      label="Further Repairs"
                      id="furtherRepairs"
                      checked={furtherRepairs}
                      className={`form-check-input ${
                        editFlag ? (repaired || furtherRepairs ? "" : "borderRed") : ""
                      }`}
                      onChange={(e) => {
                        const value = e.target.checked;
                        setFurtherRepairs(value);
                        if (!value) {
                          setSelectedRepairDate(value);
                          dispatch(setRepairedDate(""));
                          setDeliveryTerminated(false);
                          setActivateUnit(false);
                          setAtRepairLocation(false);
                          setterminateAtCurrentLoc(false);
                        }
                      }}
                      disabled={!editFlag}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Delivery Terminated</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="outbound"
                      name="outbound"
                      checked={deliveryTerminated}
                      onChange={(e) => setDeliveryTerminated(e.target.checked)}
                      disabled={!editFlag || (!repaired && !furtherRepairs) || activateUnit}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly || !editFlag}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      Terminate At Current Location
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="outbound"
                      name="outbound"
                      checked={terminateAtCurrentLoc}
                      onChange={(e) => setterminateAtCurrentLoc(e.target.checked)}
                      disabled={!editFlag || !deliveryTerminated}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly || !editFlag}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Activate Unit</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="outbound"
                      name="outbound"
                      checked={activateUnit}
                      onChange={(e) => dispatch(setActivateUnit(e.target.checked))}
                      disabled={!editFlag || (!repaired && !furtherRepairs) || deliveryTerminated}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} md={6} xs={6}>
                <Form.Group
                  className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Pickup</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="name"
                      name="name"
                      maxLength={30}
                      value={pickUpName}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setPickUpName(e.target.value)}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 `}
                  hidden={viewOnly}
                >
                  <Col xs={3} sm={3} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="pickup"
                      name="pickup"
                      value={pickUpCity}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setPickUpCity(e.target.value);
                      }}
                    />
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 d-flex" style={{ marginLeft: "10px" }}>
                    <input
                      type="text"
                      style={{ width: "30px" }}
                      className="customFormControl ml-2"
                      id="pickup"
                      name="pickup"
                      value={pickUpState}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setPickUpState(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Delivery</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="name"
                      name="name"
                      maxLength={30}
                      value={deliveryName}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setDeliveryName(e.target.value)}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 `}
                  hidden={viewOnly}
                >
                  <Col xs={3} sm={3} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="pickup"
                      name="pickup"
                      value={deliveryCity}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setDeliveryCity(e.target.value);
                      }}
                    />
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 d-flex" style={{ marginLeft: "10px" }}>
                    <input
                      type="text"
                      style={{ width: "30px" }}
                      className="customFormControl ml-2"
                      id="pickup"
                      name="pickup"
                      value={deliveryState}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setDeliveryState(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">In Yard</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="inyard"
                      name="inyard"
                      checked={inYard}
                      onChange={(e) => setInYard(e.target.checked)}
                      disabled={atPickup || breakdownAtLastLoc || atDelivery || !rowData?.pickupYardFK}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Pickup</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="atpickup"
                      name="atpickup"
                      checked={atPickup}
                      onChange={(e) => setAtPickup(e.target.checked)}
                      disabled={inYard || breakdownAtLastLoc || atDelivery}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Last Location</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="atlastLocation"
                      name="atlastLocation"
                      checked={breakdownAtLastLoc}
                      onChange={(e) => setbreakdownAtLastLoc(e.target.checked)}
                      disabled={inYard || atPickup || atDelivery}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly || editFlag}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Breakdown At Pickup</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      id="atlastLocation"
                      name="atlastLocation"
                      checked={breakdownAtPickup}
                      onChange={(e) => setBreakdownAtPickup(e.target.checked)}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Last Location</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="name"
                      name="name"
                      maxLength={30}
                      value={lastLocationName}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setLastLocationName(e.target.value)}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 `}
                  hidden={viewOnly}
                >
                  <Col xs={3} sm={3} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="pickup"
                      name="pickup"
                      value={lastLocationCity}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setLastLocationCity(e.target.value);
                      }}
                    />
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 d-flex" style={{ marginLeft: "10px" }}>
                    <input
                      type="text"
                      style={{ width: "30px" }}
                      className="customFormControl ml-2"
                      id="pickup"
                      name="pickup"
                      value={lastLocationState}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setLastLocationState(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
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
                      onChange={(e) => setatDelivery(e.target.checked)}
                      disabled={inYard || atPickup || breakdownAtLastLoc}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Current Location</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="name"
                      name="name"
                      maxLength={30}
                      value={currentLocationName}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setCurrentLocationName(e.target.value)}
                      disabled={inYard || atPickup || breakdownAtLastLoc || atDelivery}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="ad1"
                      name="ad1"
                      maxLength={30}
                      value={currentLocationAddress1}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => setCurrentLocationAddress1(e.target.value)}
                      disabled={inYard || atPickup || breakdownAtLastLoc || atDelivery}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="ad2"
                      name="ad2"
                      maxLength={30}
                      value={currentLocationAddress2}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => setCurrentLocationAddress2(e.target.value)}
                      disabled={inYard || atPickup || breakdownAtLastLoc || atDelivery}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <div style={{ marginTop: "-0.5rem" }} hidden={viewOnly}>
                  <PostalCodeComponent
                    disabled={inYard || atPickup || breakdownAtLastLoc || atDelivery}
                    city={currentLocationCity}
                    setCity={setCurrentLocationCity}
                    stateCode={currentLocationState}
                    setStateCode={setCurrentLocationState}
                    postalCode={currentLocationPostal}
                    setPostalCode={setCurrentLocationPostal}
                    setPostalValues={setCurrentPostalValues}
                    postalOptions={currentpostalOptions}
                    postalCodePK={postalCodePK}
                    setPostalCodePK={setPostalCodePK}
                    canadian={canadian}
                    setCanadian={setCanadian}
                  />
                </div>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly || editFlag}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Breakdown in Yard</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      id="atlastLocation"
                      name="atlastLocation"
                      checked={breakdownInYard}
                      onChange={(e) => setBreakdownInYard(e.target.checked)}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly || editFlag}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Breakdown Location</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="name"
                      name="name"
                      maxLength={30}
                      value={breakdownLocationName}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setBreakdownLocationName(e.target.value)}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly || editFlag}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="ad1"
                      name="ad1"
                      maxLength={30}
                      value={breakdownLocationAddress1}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => setBreakdownLocationAddress1(e.target.value)}
                      disabled
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly || editFlag}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="ad2"
                      name="ad2"
                      maxLength={30}
                      value={breakdownLocationAddress2}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => setBreakdownLocationAddress2(e.target.value)}
                      disabled
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <div style={{ marginTop: "-0.5rem" }} hidden={!viewOnly || editFlag}>
                  <PostalCodeComponent
                    disabled
                    city={breakdownLocationCity}
                    setCity={setBreakdownLocationCity}
                    stateCode={breakdownLocationState}
                    setStateCode={setBreakdownLocationState}
                    postalCode={breakdownLocationPostal}
                    setPostalCode={setBreakdownLocationPostal}
                    setPostalValues={setBreakdownPostalValues}
                    postalOptions={breakdownpostalOptions}
                    postalCodePK={postalCodePK}
                    setPostalCodePK={setPostalCodePK}
                    canadian={canadian}
                    setCanadian={setCanadian}
                  />
                </div>

                <Form.Group
                  className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 h-50px "
                  hidden={!viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Repair Location</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input ${
                        editFlag
                          ? repaired || furtherRepairs
                            ? atRepairLocation
                              ? ""
                              : "borderRed"
                            : ""
                          : ""
                      }`}
                      id="atdelivery"
                      name="atdelivery"
                      checked={atRepairLocation}
                      onChange={(e) => setAtRepairLocation(e.target.checked)}
                      disabled={!editFlag || (!repaired && !furtherRepairs)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="form-group m-t-20 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0"
                  hidden={!viewOnly || !editFlag}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Dealer</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex" style={{ width: "275px" }}>
                    {/* Dealer Autocomplete */}
                    <AutoCompleteDropdown
                      disabled={
                        !dealerId &&
                        (customerPlantInput ||
                          !atRepairLocation ||
                          (repairLocationName && repairLocationAddress1 && postalCodePK))
                      }
                      arrayList={dealersList}
                      searchString={dealerInput}
                      renderItemId={(dealer) => dealer.dealerPK}
                      renderItemField={(dealer) => dealer.name}
                      selectedId={dealerId}
                      handleSearchString={(string) => dispatch(setDealerInput(string))}
                      fetchDataBySearchString={fetchDealerByName}
                      onSelect={handleDealerSelection}
                      clearInputCallback={() => {
                        dispatch(setDealerId(null));
                        dispatch(setPageNumber(0));
                        if (editBrkdownOfExistingDelayUnitFlag) {
                          resetLoc();
                        }
                      }}
                      className={`${
                        !customerPlantId &&
                        atRepairLocation &&
                        (!repairLocationName || !repairLocationAddress1 || !postalCodePK)
                          ? !dealerId
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                    />
                    <LookupButton
                      onClick={() => setShowDealerLookup(true)}
                      disabled={
                        customerPlantInput ||
                        !atRepairLocation ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK)
                      }
                    />
                    {/* Dealer Lookup Modal */}
                    <DealerLookup
                      show={showDealerLookup}
                      onHide={() => setShowDealerLookup(false)}
                      renderItemId={(dealer) => dealer.dealerPK}
                      handleLookupSelection={handleDealerSelection}
                      delay
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="m-t-20 align-items-center row m-l-0 m-r-0"
                  hidden={!viewOnly || !editFlag}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Plant</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex" style={{ width: "275px" }}>
                    {/* Customer Plant Autocomplete */}
                    <AutoCompleteDropdown
                      disabled={
                        !customerPlantId &&
                        (dealerInput ||
                          !atRepairLocation ||
                          (repairLocationName && repairLocationAddress1 && postalCodePK))
                      }
                      arrayList={plantsList}
                      searchString={customerPlantInput}
                      renderItemId={(plant) => plant.customerPlantPK}
                      renderItemField={(plant) => plant.name}
                      selectedId={customerPlantId}
                      handleSearchString={(string) => dispatch(setCustomerPlantInput(string))}
                      fetchDataBySearchString={fetchAllPlantdetailsByName}
                      onSelect={handleCustomerPlantSelection}
                      clearInputCallback={() => {
                        dispatch(setCustomerPlantId(null));
                        dispatch(setPageNumber(0));
                        if (editBrkdownOfExistingDelayUnitFlag) {
                          resetLoc();
                        }
                      }}
                      className={`${
                        !dealerId &&
                        atRepairLocation &&
                        (!repairLocationName || !repairLocationAddress1 || !postalCodePK)
                          ? !customerPlantId
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                    />
                    <LookupButton
                      onClick={() => setShowCustomerPlantLookup(true)}
                      disabled={
                        dealerInput ||
                        !atRepairLocation ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK)
                      }
                    />
                    {/* Customer Plant Lookup Modal */}
                    <CustomerPlantsLookup
                      show={showCustomerPlantLookup}
                      onHide={() => setShowCustomerPlantLookup(false)}
                      renderItemId={(plant) => plant.customerPlantPK}
                      handleLookupSelection={handleCustomerPlantSelection}
                      yardCheckin
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Repair Location</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        atRepairLocation &&
                        editBrkdownOfExistingDelayUnitFlag &&
                        !dealerInput &&
                        !customerPlantInput
                          ? repairLocationName
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      id="name"
                      name="name"
                      maxLength={30}
                      value={repairLocationName}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setRepairLocationName(e.target.value)}
                      disabled={!editFlag || !atRepairLocation || dealerInput || customerPlantInput}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        atRepairLocation &&
                        editBrkdownOfExistingDelayUnitFlag &&
                        !dealerInput &&
                        !customerPlantInput
                          ? repairLocationAddress1
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      id="ad1"
                      name="ad1"
                      maxLength={30}
                      value={repairLocationAddress1}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => setRepairLocationAddress1(e.target.value)}
                      disabled={!editFlag || !atRepairLocation || dealerInput || customerPlantInput}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="ad2"
                      name="ad2"
                      maxLength={30}
                      value={repairLocationAddress2}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => setRepairLocationAddress2(e.target.value)}
                      disabled={!editFlag || !atRepairLocation || dealerInput || customerPlantInput}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <div style={{ marginTop: "-0.5rem" }} hidden={!viewOnly}>
                  <PostalCodeComponent
                    disabled={!editFlag || !atRepairLocation || dealerInput || customerPlantInput}
                    city={repairLocationCity}
                    setCity={setRepairLocationCity}
                    stateCode={repairLocationState}
                    setStateCode={setRepairLocationState}
                    postalCode={repairLocationPostal}
                    setPostalCode={setRepairLocationPostal}
                    setPostalValues={setPostalValues}
                    postalOptions={postalOptions}
                    postalCodePK={postalCodePK}
                    setPostalCodePK={setPostalCodePK}
                    canadian={canadian}
                    setCanadian={setCanadian}
                    isOptional={dealerInput || customerPlantInput}
                  />
                </div>

                <Form.Group
                  className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Name Under</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        editBrkdownOfExistingDelayUnitFlag && atRepairLocation
                          ? nameUnder
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      id="nameUnder"
                      name="nameUnder"
                      maxLength={30}
                      value={nameUnder}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setNameUnder(e.target.value)}
                      disabled={!editFlag || !atRepairLocation}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={!viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Work Order Number</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        editBrkdownOfExistingDelayUnitFlag && atRepairLocation
                          ? workOrderNumber
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      id="workOrderNumber"
                      name="workOrderNumber"
                      maxLength={10}
                      value={workOrderNumber}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setWorkOrderNumber(e.target.value)}
                      disabled={!editFlag || !atRepairLocation}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Contact</Form.Label>
                  </Col>

                  <Col xs={8} md={7} sm={6} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        editBrkdownOfExistingDelayUnitFlag && atRepairLocation
                          ? contact
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      id="contact"
                      name="contact"
                      maxLength={30}
                      value={contact}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setContact(e.target.value)}
                      disabled={viewOnly && (!editFlag || !atRepairLocation)}
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
                      className={`customFormControl ${
                        !viewOnly || (editBrkdownOfExistingDelayUnitFlag && atRepairLocation)
                          ? formatPhoneNumber(phone)?.length === 14
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      id="phone" //formatPhoneNumber(locationPhone)?.length === 14
                      name="phone"
                      maxLength={30}
                      value={formatPhoneNumber(phone)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setPhone(formatPhoneNumber(e.target.value)?.trim())}
                      disabled={viewOnly && (!editFlag || !atRepairLocation)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <DelayUnitCodeLookup
              show={showLookup}
              onHide={() => setShowLookup(false)}
              renderItemId={(item) => item.delayedUnitCodePK}
              BreakdownProgram
              handleLookupSelection={handleDelayUnitCodeLookup}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default GeneralBreakdown;
