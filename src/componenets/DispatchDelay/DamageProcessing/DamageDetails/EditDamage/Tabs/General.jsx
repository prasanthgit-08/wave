import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import { Formik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import DealerLookup from "../../../../../LookupScreens/Dealer/DealerLookup";
import CustomerPlantsLookup from "../../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import DelayUnitCodeLookup from "../../../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { useNavigate, useParams } from "react-router-dom";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import DriverService from "../../../../../../services/DriverService";
import DriverLookup from "../../../../../LookupScreens/Driver/DriverLookup";
import {
  setDriverFK,
  setEditGenerlTabValid,
  setEditSaveFormData,
  setGeneralLoading,
} from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import { formatDatetimeToDate } from "../../../../../../utils/dateUtils";
import { PermissionKeyGeneratorUtil } from "../../../../../../utils/PermissionKeyGeneratorUtil";

const validationSchema = yup.object({
  city: yup.string().required(),
  statecode: yup.string().max(2).min(2).required(),
  postalcode: yup.string().required(),
});
const General = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { damageFK } = useParams();
  const damageCompanyName = localStorage.getItem("damageCompanyName");
  const damageUnitFK = localStorage.getItem("damageUnitFK");
  const damageDriverFK = localStorage.getItem("damageDriverFK");
  const delayedUnitFK = localStorage.getItem("delayedUnitFK");
  // const delayedUnitDamagePK = 12;
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("DAMAGEEML", "edit");
  const [editIsDenied, seteditIsDenied] = useState(false);
  // const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  // const editPermission = PermissionKeyGeneratorUtil("BREAKNEW", "new");
  const [disableEmailPermission, setDisableEmailPermission] = useState(false);
  const [hasEmailSendPermission, setHasEmailSendPermission] = useState(false);
  const driverEditPermission = PermissionKeyGeneratorUtil("CHNGDRVR", "NEW");
  const [isDriverEditable, setIsDriverEditable] = useState(false);
  const [showLookup, setShowLookup] = useState(false);
  const [claimNumber, setClaimNumber] = useState(""); // Default to AM
  const [unitNumber, setUnitNumber] = useState("");
  const [vin, setVin] = useState("");
  const [delayUnitCodeArray, setDelayUnitCodeArray] = useState([]);
  const [delayedUnitCodeInput, setDelayedUnitCodeInput] = useState("");
  const [delayedUnitCodeID, setDelayedUnitCodeID] = useState("");
  const editGenerlTabValid = useSelector((state) => state.damageReducer.editGenerlTabValid);
  const generalLoading = useSelector((state) => state.damageReducer.generalLoading);
  const damageDetailFlag = useSelector((state) => state.damageReducer.damageDetailFlag);
  const repairPlantFlag = useSelector((state) => state.damageReducer.repairPlantFlag);
  const editSaveFormData = useSelector((state) => state.damageReducer.editSaveFormData);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const [loading, setLoading] = useState(false);
  const [newDamageData, setNewDamageData] = useState();
  const [driver, setDriver] = useState("");
  const [phone, setPhone] = useState();
  const [isSelectedDamageDateValid, setIsSelectedDamageDateValid] = useState(true);
  const [damagePeriod, setDamagePeriod] = useState("AM"); // Default to AM
  const [reportPeriod, setReportPeriod] = useState("AM"); // Default to AM
  const [selectedDamageTime, setSelectedDamageTime] = useState();
  const [selectedReportTime, setSelectedReportTime] = useState();
  const [selectedDamageDate, setSelectedDamageDate] = useState();
  const [selectedReportDate, setSelectedReportDate] = useState();
  const [damageDate, setDamageDate] = useState();
  const [reportedDate, setReportedDate] = useState();
  const [isSelectedReportDateValid, setIsSelectedReportDateValid] = useState(true);
  const [damageContact, setDamageContact] = useState("");
  const [damageContactPhone, setDamageContactPhone] = useState("");
  const [extn, setExtn] = useState("");
  const [damageFax, setDamageFax] = useState("");
  /*******Dealer AutoComplete and Lookup****/
  const [dealersList, setDealersList] = useState([]);
  const [dealerInput, setDealerInput] = useState("");
  const [dealerId, setDealerId] = useState("");
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  /*******Plant AutoComplete and Lookup****/
  const [plantList, setPlantList] = useState([]);
  const [plantInput, setPlantInput] = useState("");
  const [plantId, setPlantId] = useState("");
  const [showPlantLookUp, setshowPlantLookUp] = useState(false);
  const [repaired, setRepaired] = useState(false);
  const [repairedDate, setRepairedDate] = useState("");
  const [furtherRepair, setFurtherRepair] = useState(false);
  const [selectedRepairDate, setSelectedRepairDate] = useState(null);
  const [isSelectedRepairDateValid, setIsSelectedRepairDateValid] = useState(true);
  const [deliveryTerminated, setDeliveryTerminated] = useState(false);
  const [terminateAtCurrentLoc, setTerminateAtCurrentLoc] = useState(false);
  const [status, setStatus] = useState("");
  const [statusComment, setStatusComment] = useState("");
  const [activateUnit, setActivateUnit] = useState(false);
  const [atRepairLocation, setAtRepairLocation] = useState(false);
  const [repairLocationName, setRepairLocationName] = useState("");
  const [repairLocationAddress1, setRepairLocationAddress1] = useState("");
  const [repairLocationAddress2, setRepairLocationAddress2] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [canadian, setCanadian] = useState(false);
  const [nameUnder, setNameUnder] = useState("");
  const [workOrderNumber, setWorkOrderNumber] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkFlag, setCheckFlag] = useState(false);
  const [unitAddressId, setUnitAddressId] = useState(null);
  const [isDealerLoading, setIsDealerLoading] = useState(false);

  /*****Driver Autocomplete and lookupdata****/
  const [driverDropDownData, setDriverDropDownData] = useState([]);
  const [driverInput, setDriverInput] = useState("");
  const [driverId, setDriverId] = useState("");
  const [driverSelection, setDriverSelection] = useState(false);
  const [driverLoader, setDriverLoader] = useState(false);
  const [driverRelease, setDriverRelease] = useState(false);
  const [sendUpdateEmail, setSendUpdateEmail] = useState(false);
  const [odoMeter, setOdoMeter] = useState("");

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };
  const driverModalHide = () => {
    dispatch(setDriverSelection(false));
  };

  const { pageNumber, normalSortFlag, selectedSearchCriteria, normalSortValue, searchTerms } = useSelector(
    (state) => state.delayCodeUnitLookupReducer
  );
  //used for Plant lookup
  const plantSortFlag = useSelector((state) => state.customerPlantsLookupReducer.normalSortFlag);
  const plantSortValue = useSelector((state) => state.customerPlantsLookupReducer.normalSortValue);
  const searchedCustomerPlant = useSelector(
    (state) => state.customerPlantsLookupReducer.searchedCustomerPlant
  );
  const plantSelectedSearchCriteria = useSelector(
    (state) => state.customerPlantsLookupReducer.selectedSearchCriteria
  );
  const plantPageNumber = useSelector((state) => state.customerPlantsLookupReducer.pageNumber);
  const plantSearchTerms = useSelector((state) => state.customerPlantsLookupReducer.searchTerms);

  //used for dealer lookup

  const dealerPageNumber = useSelector((state) => state.dealerLookup.pageNumber);
  const dealerSelectedSearchCriteria = useSelector((state) => state.dealerLookup.selectedSearchCriteria);
  const searchedDealer = useSelector((state) => state.dealerLookup.searchedDealer);
  const dealerSortFlag = useSelector((state) => state.dealerLookup.normalSortFlag);
  const dealerSortValue = useSelector((state) => state.dealerLookup.normalSortValue);
  const advanceSortingOrder = useSelector((state) => state.dealerLookup.advanceSortingOrder);
  const dealerSearchTerm = useSelector((state) => state.dealerLookup.searchTerms);

  //check email permission

  useEffect(() => {
    if (deniedPermissions) {
      setHasEmailSendPermission(!deniedPermissions?.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);

  /*****
   * Permission to add or change the driver
   * ****/
  useEffect(() => {
    if (deniedPermissions) {
      setIsDriverEditable(!deniedPermissions?.includes(driverEditPermission));
    }
  }, [deniedPermissions, driverEditPermission]);

  const handleDriverLookupModalShow = () => {
    setDriverSelection(true);
  };

  const fetchDrivers = (string) => {
    setDriverLoader(true);
    DriverService.getDriverForAuto(string)
      .then((response) => {
        const data = response?.data?.content;
        const driverList = data?.map((item) => ({
          ...item,
          name: item.name?.trim(),
          firstName: item?.firstName,
          lastName: item?.lastName,
        }));

        setDriverDropDownData(driverList);
      })
      .catch((err) => {})
      .finally(() => {
        setDriverLoader(false);
      });
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDamageFax(formattedPhoneNumber);
  };
  const phoneFormatExtension = (e) => {
    const extenstion = e.target.value;
    setExtn(extenstion);
  };

  const getNewDamageData = () => {
    dispatch(setGeneralLoading(true));
    DelayDamageService.getDelayDamageViewDetails(damageFK, "GENERAL", 0, 10, null, false)
      .then((response) => {
        const data = response?.data[0];
        setNewDamageData(data);
        setDriverInput(data?.DriverName);
        dispatch(setDriverFK(data?.DriverFK));
        setDriverId(data?.DriverFK);
        setUnitNumber(data?.UnitNumber);
        setVin(data?.VIN);
        setOdoMeter(data?.Odometer || "");
        setSelectedDamageDate(formatDatetimeToDate(data?.DamageDate));
        setSelectedDamageTime(data?.DamageTime);
        setDamagePeriod(data?.DamageAMPM);
        setSelectedReportDate(formatDatetimeToDate(data?.ReportDate));
        setSelectedReportTime(data?.ReportDateTime);
        setReportPeriod(data?.ReportDateAMPM);
        setDamageDate(
          combineDateAndTime(formatDatetimeToDate(data?.DamageDate), data?.DamageTime, data?.DamageAMPM)
        );
        setReportedDate(
          combineDateAndTime(
            formatDatetimeToDate(data?.ReportDate),
            data?.ReportDateTime,
            data?.ReportDateAMPM
          )
        );
        setDelayedUnitCodeInput(data?.DamageCode);
        setDelayedUnitCodeID(data?.DamageCodeFK);
        setDamageContact(data?.DamageContact);
        setDamageContactPhone(
          data?.DamageContactPhone != null ? formatPhoneNumber(data?.DamageContactPhone) : ""
        );
        setExtn(data?.DamageExtension);
        setDamageFax(data?.DamageFAX != null ? formatPhoneNumber(data?.DamageFAX) : "");
        setRepaired(data?.Repaired);
        setRepairedDate(data?.RepairedDate);
        setFurtherRepair(data?.FurtherRepairsRequired);
        setDeliveryTerminated(data?.TerminateDelivery);
        setAtRepairLocation(data?.AtRepairLocation);
        setDealerId(data?.RepairDealerFK);
        setDealerInput(data?.RepairDealerFK ? data?.RepairLocationName : "");
        setPlantId(data?.RepairCustomerPlantFK);
        setPlantInput(data?.RepairCustomerPlantFK ? data?.RepairLocationName : "");
        setRepairLocationName(data?.RepairLocationName);
        setRepairLocationAddress1(data?.RepairLocationAdd1);
        setRepairLocationAddress2(data?.RepairLocationAdd2);
        setPostalCodePK(data?.RepairLocationPostalcodeFK);
        setPostalCode(data?.RepairLocationPostal);
        setCity(data?.RepairLocationCity);
        setStateCode(data?.RepairLocationState);
        setNameUnder(data?.NameUnder);
        setWorkOrderNumber(data?.WorkOrderNumber);
        setContact(data?.Contact);
        setSelectedRepairDate(data?.RepairedDate);
        setPhone(data?.Phone != null ? formatPhoneNumber(data?.Phone) : "");
        setUnitAddressId(data?.RepairUnitAddressFK);
        setClaimNumber(data?.ClaimNumber);
        setStatus(data?.Status);
        setStatusComment(data?.StatusComment);
        setDriverRelease(data?.DriverRelease);
        dispatch(setGeneralLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setGeneralLoading(false));
      });
  };
  /******
   * API to receive the Damage Data
   * *****/
  useEffect(() => {
    if (damageFK && damageDetailFlag) {
      getNewDamageData();
    }
  }, [damageFK, damageDetailFlag]);

  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setShowLookup(false);
    setDelayedUnitCodeInput(delayUnitCode?.description?.trim());
    setDelayedUnitCodeID(delayUnitCode?.delayedUnitCodePK);
  };

  const driverLookupSelection = (data) => {
    setDriverInput(data?.firstName?.trim() + (data?.lastName ? " " + data?.lastName?.trim() : ""));
    setDriverId(data?.driverPK);
    setDriverSelection(false);
  };

  const handleLookup = () => {
    setShowLookup(true);
  };

  // Used for Pickup Dealer selection AutoComplete
  const fetchDealerByName = (string) => {
    setIsDealerLoading(true);
    BreakdownProcessingService.geActiveRepairDealerForAutoComplete(string, damageCompanyName, damageUnitFK)
      .then((response) => {
        const data = response?.data;
        const listingData = data?.filter(
          (item) => item.Type !== "Pagination" && item.Type !== "plantEnabled"
        );

        const dealerList = (listingData || []).map((dealer) => ({
          ...dealer,
          name: dealer?.name?.trim() || "",
        }));
        setDealersList(dealerList);
        setIsDealerLoading(false);
      })
      .catch((err) => {
        setIsDealerLoading(false);
      });
  };

  const handleDealerSelection = (dealer) => {
    setShowDealerLookup(false);
    setDealerInput(dealer?.name);
    setDealerId(dealer.dealerPK);
    setRepairLocationName(dealer?.name);
    setRepairLocationAddress1(dealer?.address1);
    setRepairLocationAddress2(dealer?.address2);
    setPostalCode(dealer?.postalCode);
    setPostalCodePK(dealer?.postalCodePK);
    setCity(dealer?.city);
    setStateCode(dealer?.stateCode);
  };

  // Fetch all the customer plants for Autocomplete

  const fetchAllPlantdetailsByName = (string) => {
    setIsLoading(true);
    BreakdownProcessingService.geActiveRepairPlantForAutoComplete(string, damageCompanyName, damageUnitFK)
      .then((response) => {
        const data = response?.data;
        const listingData = data?.filter(
          (item) => item.Type !== "Pagination" && item.Type !== "plantEnabled"
        );

        const plantList = (listingData || []).map((plant) => ({
          ...plant,
          name: plant?.name?.trim() || "",
        }));

        setPlantList(plantList);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handlePlantSelection = (plant) => {
    setshowPlantLookUp(false);
    setPlantInput(plant?.name);
    setPlantId(plant.customerPlantPK);
    setRepairLocationName(plant?.name);
    setRepairLocationAddress1(plant?.address1);
    setRepairLocationAddress2(plant?.address2);
    setPostalCode(plant?.postalCode);
    setPostalCodePK(plant?.postalCodePK);
    setCity(plant?.city);
    setStateCode(plant?.stateCode);
  };

  /** used to get Damage code autocomplete**/
  const fetchDelayedUnitCode = (string) => {
    setIsLoading(true);
    DelayDamageService.getAutoCompleteForDamageCodes(string, damageCompanyName, null, "Damage")
      .then((response) => {
        const data = response?.data;
        setDelayUnitCodeArray(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const isValid12HourTime = (date, time) => Boolean(date && /^([0]?[1-9]|1[0-2]):[0-5][0-9]$/.test(time));

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
  const insertColonAfterTwoDigits = (input) => {
    if (!input || input?.includes(":")) return input;

    const cleaned = input?.replace(/\D/g, "");

    if (cleaned?.length <= 2) return cleaned;
    if (cleaned?.length <= 4) {
      return `${cleaned?.slice(0, 2)}:${cleaned?.slice(2)}`;
    }

    return cleaned?.slice(0, 2) + ":" + cleaned?.slice(2, 4); // truncate anything beyond 4 digits
  };

  // generaltabValidation
  useEffect(() => {
    const isTimeValid =
      selectedDamageTime &&
      typeof selectedDamageTime === "string" &&
      selectedDamageTime?.trim() !== "" &&
      /^([0]?[1-9]|1[0-2]):[0-5][0-9]$/.test(selectedDamageTime) &&
      damagePeriod;

    const isReportTimeValid =
      selectedReportTime &&
      typeof selectedReportTime === "string" &&
      selectedReportTime?.trim() !== "" &&
      /^([0]?[1-9]|1[0-2]):[0-5][0-9]$/.test(selectedReportTime) &&
      reportPeriod;

    if (
      delayedUnitCodeInput &&
      delayedUnitCodeID &&
      selectedDamageDate &&
      isSelectedDamageDateValid &&
      selectedReportDate &&
      isSelectedRepairDateValid &&
      damagePeriod &&
      reportPeriod &&
      //vin &&
      ((!newDamageData?.Motorized && (!odoMeter || odoMeter)) ||
        (newDamageData?.Motorized && odoMeter && odoMeter <= 32767)) &&
      contact &&
      phone &&
      phone?.match(phoneRegex) &&
      nameUnder &&
      damageContact &&
      damageContactPhone &&
      damageContactPhone?.match(phoneRegex) &&
      (!extn || (extn && extn?.length >= 3)) &&
      ((damageFax && damageFax?.match(phoneRegex)) || !damageFax) &&
      (!repaired || (repaired && selectedRepairDate && isSelectedRepairDateValid)) &&
      isTimeValid &&
      isReportTimeValid &&
      ((newDamageData?.DriverFK != null && driverId) ||
        (newDamageData?.DriverFK === null && !driverId && !driverInput) ||
        (newDamageData?.DriverFK === null && driverId && driverInput)) &&
      (!atRepairLocation ||
        (atRepairLocation &&
          (dealerId || plantId || (repairLocationAddress1 && repairLocationName && postalCodePK))))
    ) {
      dispatch(setEditGenerlTabValid(true));
    } else {
      {
        dispatch(setEditGenerlTabValid(false));
      }
    }
  }, [
    extn,
    selectedDamageTime,
    selectedReportTime,
    delayedUnitCodeInput,
    delayedUnitCodeID,
    selectedDamageDate,
    damagePeriod,
    isSelectedDamageDateValid,
    selectedReportDate,
    reportPeriod,
    isSelectedReportDateValid,
    damageContact,
    damageContactPhone,
    damageFax,
    furtherRepair,
    repaired,
    selectedRepairDate,
    isSelectedRepairDateValid,
    atRepairLocation,
    dealerId,
    dealerInput,
    plantId,
    plantInput,
    repairLocationName,
    repairLocationAddress1,
    postalCodePK,
    city,
    extn,
    statecode,
    nameUnder,
    contact,
    phone,
    workOrderNumber,
    //vin,
    damageContact,
    damageContactPhone,
    odoMeter,
    driverId,
    driverInput,
    newDamageData,
  ]);

  const generalTabData = () => {
    dispatch(
      setEditSaveFormData({
        unitFk: damageUnitFK,
        delayedUnitFk: delayedUnitFK,
        damageDate: damageDate ? damageDate?.replace(" ", "T") : null,
        reported: reportedDate ? reportedDate?.replace(" ", "T") : null,
        damageDelayedUnitCodeFk: delayedUnitCodeID,
        damageDealerFk: newDamageData?.DamageDealerFK,
        damagePk: damageFK,
        atPickup: false,
        inYard: false,
        atDelivery: false,
        phone: phone?.replace(/\s+/g, ""),
        contact: contact,
        damageUnitAddressFk: newDamageData?.DamageUnitAddressFK,
        damageUnitLocationFk: newDamageData?.DamageUnitLocationFK,
        damageFax: damageFax?.replace(/\s+/g, ""),
        status: status,
        statusComment: statusComment,
        repaired: repaired,
        atRepairLocation: atRepairLocation,
        repairDate: selectedRepairDate,
        repairDealerFk: dealerId,
        repairUnitAddressFk: unitAddressId,
        repairCustomerPlantFk: plantId,
        furtherRepairsRequired: furtherRepair,
        companyName: damageCompanyName,
        currentLocationName: null,
        currentLocationAddress1: null,
        currentLocationAddress2: null,
        currentLocationCity: null,
        currentLocationState: null,
        currentLocationPostal: null,
        terminateDelivery: deliveryTerminated,
        nameUnder: nameUnder,
        workOrderNumber: workOrderNumber,
        repairLocationName: repairLocationName,
        repairLocationAddress1: repairLocationAddress1,
        repairLocationAddress2: repairLocationAddress2,
        repairLocationCity: city,
        repairLocationState: statecode,
        repairLocationPostal: postalcode,
        disableEmail: hasEmailSendPermission,
        damageContacts: damageContact,
        damageContactPhone: damageContactPhone?.replace(/\s+/g, ""),
        damagePhoneExt: extn,
        dispatchPk: newDamageData?.DispatchFK,
        driverFK: driverId,
        driverRelease: driverRelease,
        sendUpdateEmail: sendUpdateEmail,
        odoMeter: odoMeter ? odoMeter : 0,
      })
    );
  };

  useEffect(() => {
    generalTabData();
  }, [
    damageUnitFK,
    unitAddressId,
    damageFax,
    damageContact,
    damageContactPhone,
    extn,
    hasEmailSendPermission,
    newDamageData,
    deliveryTerminated,
    driver,
    unitNumber,
    damageDate,
    selectedDamageDate,
    reportedDate,
    delayedUnitCodeInput,
    damageContact,
    damageContactPhone,
    damageFax,
    furtherRepair,
    selectedRepairDate,
    repaired,
    deliveryTerminated,
    atRepairLocation,
    dealerInput,
    dealerId,
    plantInput,
    plantId,
    repairLocationName,
    repairLocationAddress1,
    repairLocationAddress2,
    statecode,
    city,
    postalcode,
    postalCodePK,
    nameUnder,
    workOrderNumber,
    contact,
    phone,
    status,
    statusComment,
    driverId,
    driverRelease,
    sendUpdateEmail,
    odoMeter,
  ]);

  // ——— Initialize default time & period ———
  useEffect(() => {
    const now = new Date();
    let hrs = now.getHours();
    const mins = now.getMinutes();
    const pm = hrs >= 12 ? "PM" : "AM";
    if (hrs === 0) hrs = 12;
    else if (hrs > 12) hrs -= 12;
    const fmt = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

    setSelectedDamageTime(fmt);
    setDamagePeriod(pm);
    setSelectedReportTime(fmt);
    setReportPeriod(pm);
    setDamageDate(combineDateAndTime(selectedDamageDate, fmt, pm));
    setReportedDate(combineDateAndTime(selectedReportDate, fmt, pm));
  }, []);

  //used to set plant payload for lookup
  const breakdownCompanyName = damageCompanyName;
  const breakdownUnitFK = damageUnitFK;
  const plantPayload = {
    plantPageNumber,
    plantSortFlag,
    plantSortValue,
    searchedCustomerPlant,
    plantSelectedSearchCriteria,
    plantSearchTerms,
    breakdownCompanyName,
    breakdownUnitFK,
  };

  //used to set Dealer payload for lookup
  const dealerPayload = {
    dealerPageNumber,
    dealerSelectedSearchCriteria,
    searchedDealer,
    dealerSortFlag,
    dealerSortValue,
    advanceSortingOrder,
    dealerSearchTerm,
    breakdownCompanyName,
    breakdownUnitFK,
  };

  useEffect(() => {
    if (!damageDetailFlag) {
      navigate(`/damage-processing/view-damage/${damageFK}`);
    }
  }, [damageDetailFlag]);

  /******
   * Clear repair,further repair
   * and deliveryterminated
   * checkboxes on changing the
   * status to open or active
   * *****/
  useEffect(() => {
    if (status === "O" || status === "A") {
      setFurtherRepair(false);
      setRepaired(false);
      setDeliveryTerminated(false);
      setRepairedDate(null);
    }
  }, [status]);

  /***future use */

  // useEffect(() => {
  //   if (deniedPermissions) {
  //     seteditIsDenied(deniedPermissions.includes(editPermission));
  //   }
  // }, [deniedPermissions, editPermission]);

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
                <Form.Group className="mt-1 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Claim Number</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl  `}
                      id="claimNumber"
                      name="claimNumber"
                      maxLength={10}
                      value={claimNumber}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setClaimNumber(e.target.value)}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Driver</Form.Label>
                  </Col>

                  <Col xs={6} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      className={`customFormControl ${
                        generalLoading || (driverId && driverInput)
                          ? ""
                          : (!driverId && driverInput) || (newDamageData?.DriverFK != null && !driverId)
                            ? "borderRed"
                            : ""
                      }`}
                      arrayList={driverDropDownData}
                      searchString={driverInput}
                      renderItemId={(data) => data?.driverPK}
                      renderItemField={(data) => `${data?.firstName ?? ""} ${data?.lastName ?? ""}`?.trim()}
                      handleSearchString={(string) => setDriverInput(string)}
                      fetchDataBySearchString={fetchDrivers}
                      onSelect={driverLookupSelection}
                      selectedId={driverId}
                      clearInputCallback={() => {
                        setDriverId(null);
                      }}
                      loading={driverLoader}
                      towardsBottom
                      disabled={!isDriverEditable}
                    />
                    <LookupButton onClick={handleDriverLookupModalShow} disabled={!isDriverEditable} />{" "}
                  </Col>
                </Form.Group>

                <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 m-t-12 `}>
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Unit Number</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="unitNumber"
                      name="unitNumber"
                      maxLength={30}
                      value={unitNumber?.trim()}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> VIN</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="vin"
                      name="vin"
                      maxLength={30}
                      value={vin}
                      autoComplete="new-password"
                      disabled
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Odometer Reading</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        !newDamageData?.Motorized
                          ? ""
                          : odoMeter && odoMeter <= 32767
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      value={odoMeter}
                      id="odoMeter"
                      name="odoMeter"
                      maxLength={5}
                      disabled={!newDamageData?.Motorized}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        e.target.value?.match(/^\d{0,5}?$/) &&
                          e.target.value <= 32767 &&
                          setOdoMeter(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Damage Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      className={`customFormControl ${
                        generalLoading
                          ? ""
                          : selectedDamageDate && isSelectedDamageDateValid
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      max={new Date()}
                      date={generalLoading ? "" : selectedDamageDate}
                      setDate={(value) => {
                        setSelectedDamageDate(value);
                        setDamageDate(combineDateAndTime(value, selectedDamageTime, damagePeriod));
                      }}
                      setIsDateValid={setIsSelectedDamageDateValid}
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const newvalue = insertColonAfterTwoDigits(value);
                        setSelectedDamageTime(newvalue);
                        setDamageDate(combineDateAndTime(selectedDamageDate, newvalue, damagePeriod));
                      }}
                      type="text"
                      placeholder="HH:MM"
                      maxLength={5}
                      className={`customFormControl ${
                        generalLoading
                          ? ""
                          : isValid12HourTime(selectedDamageDate, selectedDamageTime)
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      value={generalLoading ? "" : selectedDamageTime}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" || e.key === ":") return;
                        if (!/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                      style={{ width: "65px" }}
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        name="delayTimePeriod"
                        value="AM"
                        checked={damagePeriod === "AM"}
                        onChange={(e) => {
                          setDamagePeriod(e.target.value);
                          setDamageDate(
                            combineDateAndTime(selectedDamageDate, selectedDamageTime, e.target.value)
                          );
                        }}
                        style={{ marginRight: "1px" }}
                      />{" "}
                      AM
                    </Form.Label>
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        name="delayTimePeriod"
                        value="PM"
                        checked={damagePeriod === "PM"}
                        onChange={(e) => {
                          setDamagePeriod(e.target.value);
                          setDamageDate(
                            combineDateAndTime(selectedDamageDate, selectedDamageTime, e.target.value)
                          );
                        }}
                        style={{ marginRight: "1px" }}
                      />{" "}
                      PM
                    </Form.Label>
                  </Col>
                </Form.Group>
                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Reported Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={generalLoading ? "" : selectedReportDate}
                      setDate={(value) => {
                        setSelectedReportDate(value);
                        setReportedDate(combineDateAndTime(value, selectedReportTime, reportPeriod));
                      }}
                      max={new Date()}
                      setIsDateValid={setIsSelectedReportDateValid}
                      className={`customFormControl ${
                        generalLoading
                          ? ""
                          : selectedReportDate && isSelectedReportDateValid
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      placeholder="HH:MM"
                      maxLength={5}
                      className={`customFormControl ${
                        generalLoading
                          ? ""
                          : isValid12HourTime(selectedReportDate, selectedReportTime)
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      value={generalLoading ? "" : selectedReportTime}
                      onChange={(e) => {
                        const value = e.target.value;
                        const newvalue = insertColonAfterTwoDigits(value);
                        setSelectedReportTime(newvalue);
                        setReportedDate(combineDateAndTime(selectedReportDate, newvalue, reportPeriod));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" || e.key === ":") return;
                        if (!/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                      style={{ width: "65px" }}
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        name="reportTimePeriod"
                        value="AM"
                        checked={reportPeriod === "AM"}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                          setReportedDate(
                            combineDateAndTime(selectedReportDate, selectedReportTime, e.target.value)
                          );
                        }}
                        style={{ marginRight: "1px" }}
                      />{" "}
                      AM
                    </Form.Label>
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        name="reportTimePeriod"
                        value="PM"
                        checked={reportPeriod === "PM"}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                          setReportedDate(
                            combineDateAndTime(selectedReportDate, selectedReportTime, e.target.value)
                          );
                        }}
                        style={{ marginRight: "1px" }}
                      />{" "}
                      PM
                    </Form.Label>
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Damage Code</Form.Label>
                  </Col>

                  <Col xs={6} className="p-0 d-flex">
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
                        generalLoading
                          ? ""
                          : delayedUnitCodeInput && delayedUnitCodeID
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      maxHeight="170px"
                      loading={isLoading}
                    />
                    <LookupButton onClick={handleLookup} />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Damage Contact</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        generalLoading ? "" : damageContact ? "borderGreen" : "borderRed"
                      }`}
                      id="damageContct"
                      name="damageContct"
                      maxLength={30}
                      style={{ width: "260px" }}
                      value={damageContact}
                      onChange={(e) => setDamageContact(e.target.value)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Damage Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        generalLoading
                          ? ""
                          : formatPhoneNumber(damageContactPhone).length === 14
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="damageContactPhone"
                      name="damageContactPhone"
                      maxLength={14}
                      value={damageContactPhone}
                      onChange={(e) => setDamageContactPhone(formatPhoneNumber(e.target.value))}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0" style={{ width: "11%" }}>
                    <input
                      type="text"
                      onChange={phoneFormatExtension}
                      id="extn"
                      name="extn"
                      maxLength={4}
                      value={extn}
                      disabled={!damageContactPhone}
                      onInput={(e) => {
                        setExtn(e.target.value);
                      }}
                      className={`customFormControl
                         ${
                           generalLoading || !damageContactPhone || !extn
                             ? ""
                             : extn && extn?.length < 3
                               ? "borderRed"
                               : ""
                         }
                      `}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Damage FAX</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      style={{
                        border:
                          String(damageFax).match(phoneRegex) || damageFax === ""
                            ? "black 1px solid"
                            : "red 2px solid",
                      }}
                      className="customFormControl"
                      id="damageFax"
                      name="damageFax"
                      maxLength={14}
                      value={damageFax}
                      onInput={(e) => setDamageFax(e.target.value)}
                      onChange={(e) => faxFormatHandler(e)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Repaired</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input ${""}`}
                      label="repaired"
                      id="repaired"
                      checked={repaired}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setRepaired(checked);
                        if (checked) {
                          setFurtherRepair(false);
                          setDeliveryTerminated(false);
                          setSelectedRepairDate(new Date());
                        } else {
                          setSelectedRepairDate(null);
                        }
                      }}
                      disabled={furtherRepair || deliveryTerminated || status === "A" || status === "O"}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Repair Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={furtherRepair || !repaired ? null : selectedRepairDate}
                      setDate={(value) => {
                        setSelectedRepairDate(value);
                      }}
                      setIsDateValid={setIsSelectedRepairDateValid}
                      className={`customFormControl ${
                        repaired
                          ? selectedRepairDate && isSelectedRepairDateValid
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      disabled={!repaired}
                      max={new Date()}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Further Repairs Required</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input ${""}`}
                      label="furtherRepair"
                      id="furtherRepair"
                      checked={furtherRepair}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFurtherRepair(checked);
                        if (checked) {
                          setRepaired(false);
                          setSelectedRepairDate(null);
                          setDeliveryTerminated(false);
                        }
                      }}
                      disabled={repaired || deliveryTerminated || status === "A" || status === "O"}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Delivery Terminated</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="deliveryTerminated"
                      name="deliveryTerminated"
                      checked={deliveryTerminated}
                      onChange={(e) => {
                        setDeliveryTerminated(e.target.checked);
                        const checked = e.target.checked;
                        if (checked) {
                          setFurtherRepair(false);
                          setRepaired(false);
                        }
                      }}
                      disabled={repaired || furtherRepair || status === "A" || status === "O"}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Status</Form.Label>
                  </Col>
                  <Col xs={3} className="p-0 d-flex">
                    <Form.Select
                      id="status"
                      className="customFormControl"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="O">Open</option>
                      <option value="C">Closed</option>
                      <option value="A">Active</option>
                      <option value="D">Dispute</option>
                      <option value="I">Invoice</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Status Comment</Form.Label>
                  </Col>
                  <input
                    type="text"
                    className={`customFormControl `}
                    id="statusComment"
                    name="statusComment"
                    maxLength={30}
                    style={{ width: "290px" }}
                    value={statusComment}
                    onChange={(e) => setStatusComment(e.target.value)}
                    autoComplete="new-password"
                    aria-autocomplete="new-password"
                  />
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
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
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0  ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Repair Location</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input `}
                      id="atRepair"
                      name="atRepair"
                      checked={atRepairLocation}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setAtRepairLocation(checked);

                        if (!checked) {
                          //   // Clear related fields when unchecked
                          setDealerId(null);
                          setDealerInput("");
                          setPlantId(null);
                          setPlantInput("");
                          setRepairLocationName("");
                          setRepairLocationAddress1("");
                          setRepairLocationAddress2("");
                          setPostalCode("");
                          setPostalCodePK(null);
                          setCity("");
                          setStateCode("");
                          setCanadian(false);
                          setCheckFlag(false);
                          setUnitAddressId(null);
                        } else {
                          setCheckFlag(true);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="form-group mt-2 form-group  m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`col-form-label dealer-label`}>Repair Dealer</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex" style={{ width: "275px" }}>
                    {/* Dealer Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={dealersList}
                      searchString={atRepairLocation ? dealerInput : ""}
                      renderItemId={(dealer) => dealer.dealerPK}
                      renderItemField={(dealer) => dealer.name}
                      selectedId={atRepairLocation ? dealerId : ""}
                      handleSearchString={(string) => setDealerInput(string)}
                      fetchDataBySearchString={fetchDealerByName}
                      onSelect={(e) => {
                        handleDealerSelection(e);
                      }}
                      clearInputCallback={() => {
                        setDealerId(null);
                        setRepairLocationName("");
                        setRepairLocationAddress1("");
                        setRepairLocationAddress2("");
                        setPostalCode("");
                        setPostalCodePK("");
                        setCity("");
                        setStateCode("");
                      }}
                      className={
                        !!plantId ||
                        !atRepairLocation ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK && !dealerId) ||
                        (!checkFlag && dealerId)
                          ? ""
                          : dealerId
                            ? "borderGreen"
                            : !plantId && !dealerId
                              ? "borderRed"
                              : ""
                      }
                      disabled={
                        !!plantId ||
                        !atRepairLocation ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK && !dealerId) ||
                        (!checkFlag && dealerId)
                      }
                      loading={isDealerLoading}
                    />
                    <LookupButton
                      onClick={() => setShowDealerLookup(true)}
                      disabled={
                        !!plantId ||
                        !atRepairLocation ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK && !dealerId) ||
                        (!checkFlag && dealerId)
                      }
                    />
                    {/* Dealer Lookup Modal */}
                    <DealerLookup
                      show={showDealerLookup}
                      onHide={() => setShowDealerLookup(false)}
                      renderItemId={(dealer) => dealer.dealerPK}
                      handleLookupSelection={handleDealerSelection}
                      customServiceCallback={() =>
                        BreakdownProcessingService.getAllDealersForLookup(dealerPayload)
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group mt-2 form-group  m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label>Repair Plant</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex" style={{ width: "275px" }}>
                    {/* Customer Plant Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={plantList}
                      searchString={atRepairLocation ? plantInput : ""}
                      renderItemId={(plant) => plant.customerPlantPK}
                      renderItemField={(plant) => plant.name}
                      selectedId={atRepairLocation ? plantId : ""}
                      handleSearchString={(string) => setPlantInput(string)}
                      fetchDataBySearchString={fetchAllPlantdetailsByName}
                      onSelect={handlePlantSelection}
                      clearInputCallback={() => {
                        setPlantId(null);
                        setRepairLocationName("");
                        setRepairLocationAddress1("");
                        setRepairLocationAddress2("");
                        setPostalCode("");
                        setPostalCodePK("");
                        setCity("");
                        setStateCode("");
                      }}
                      disabled={
                        !!dealerId ||
                        !atRepairLocation ||
                        repairPlantFlag === "N" ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK && !plantId) ||
                        (!checkFlag && plantId)
                      }
                      className={
                        !!dealerId ||
                        !atRepairLocation ||
                        repairPlantFlag === "N" ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK && !plantId) ||
                        (!checkFlag && plantId)
                          ? ""
                          : plantId
                            ? "borderGreen"
                            : !plantId && !dealerId
                              ? "borderRed"
                              : ""
                      }
                      loading={isLoading}
                    />
                    <LookupButton
                      onClick={() => setshowPlantLookUp(true)}
                      disabled={
                        !!dealerId ||
                        !atRepairLocation ||
                        repairPlantFlag === "N" ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK && !plantId) ||
                        (!checkFlag && plantId)
                      }
                    />
                    {/* Customer Plant Lookup Modal */}
                    <CustomerPlantsLookup
                      show={showPlantLookUp}
                      onHide={() => setshowPlantLookUp(false)}
                      renderItemId={(plant) => plant.customerPlantPK}
                      handleLookupSelection={handlePlantSelection}
                      customServiceCallback={() =>
                        BreakdownProcessingService.getAllActiveCustomerPlants(plantPayload)
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-85 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Repair Location</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        unitAddressId || generalLoading || !atRepairLocation || plantId || dealerId
                          ? ""
                          : atRepairLocation && !dealerId && !plantInput && repairLocationName
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="name"
                      name="name"
                      maxLength={30}
                      value={atRepairLocation ? repairLocationName : ""}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setRepairLocationName(e.target.value)}
                      disabled={!atRepairLocation || dealerId || plantId || unitAddressId}
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
                        unitAddressId || generalLoading || !atRepairLocation || plantId || dealerId
                          ? ""
                          : atRepairLocation && !dealerId && !plantInput && repairLocationAddress1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="ad1"
                      name="ad1"
                      maxLength={30}
                      value={atRepairLocation ? repairLocationAddress1 : ""}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => setRepairLocationAddress1(e.target.value)}
                      disabled={!atRepairLocation || dealerId || plantId || unitAddressId}
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
                      id="ad2"
                      name="ad2"
                      maxLength={30}
                      value={atRepairLocation ? repairLocationAddress2 : ""}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => setRepairLocationAddress2(e.target.value)}
                      disabled={!atRepairLocation || dealerId || plantId || unitAddressId}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <div style={{ marginTop: "-0.5rem" }}>
                  <PostalCodeComponent
                    disabled={!!(!atRepairLocation || dealerId || plantId || unitAddressId)}
                    hideLabel
                    city={atRepairLocation ? city : ""}
                    setCity={setCity}
                    stateCode={atRepairLocation ? statecode : ""}
                    setStateCode={setStateCode}
                    postalCode={atRepairLocation ? postalcode : ""}
                    setPostalCode={setPostalCode}
                    setPostalValues={setPostalValues}
                    postalOptions={postalOptions}
                    postalCodePK={atRepairLocation ? postalCodePK : ""}
                    setPostalCodePK={setPostalCodePK}
                    canadian={canadian}
                    setCanadian={setCanadian}
                  />
                </div>

                <Form.Group className="m-t-85 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Name Under</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        generalLoading ? "" : nameUnder ? "borderGreen" : "borderRed"
                      }`}
                      id="nameUnder"
                      name="nameUnder"
                      maxLength={30}
                      value={nameUnder}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setNameUnder(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Work Order Number</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="workOrderNumber"
                      name="workOrderNumber"
                      maxLength={10}
                      value={workOrderNumber}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setWorkOrderNumber(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Contact</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        generalLoading ? "" : contact ? "borderGreen" : "borderRed"
                      }`}
                      id="contact"
                      name="contact"
                      maxLength={30}
                      value={contact}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => setContact(e.target.value)}
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
                        generalLoading
                          ? ""
                          : phone !== "" && phone?.length == 14
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      onChange={(e) => phoneFormatHandler(e)}
                      id="phone"
                      name="phone"
                      maxLength={14}
                      value={phone}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onInput={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {generalLoading && (
              <div className="fade modal-backdrop show">
                {" "}
                <div className="pos-center">
                  {" "}
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </div>
          <DriverLookup
            show={driverSelection}
            onHide={() => dispatch(setDriverSelection(false))}
            renderItemId={(driver) => driver.driverPK}
            handleLookupSelection={driverLookupSelection}
            disabled={!isDriverEditable}
            MaintenanceProgram
          />
          <DelayUnitCodeLookup
            show={showLookup}
            onHide={() => setShowLookup(false)}
            renderItemId={(item) => item.delayedUnitCodePK}
            handleLookupSelection={handleDelayUnitCodeLookup}
            customServiceCallback={() =>
              DelayDamageService.getLookupForDamageCodes(
                selectedSearchCriteria,
                searchTerms,
                pageNumber,
                normalSortValue,
                normalSortFlag,
                damageCompanyName,
                null,
                "Damage"
              )
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default General;
