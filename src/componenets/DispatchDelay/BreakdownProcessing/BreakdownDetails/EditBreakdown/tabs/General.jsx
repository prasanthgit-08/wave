import { Formik } from "formik";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import DateInputField from "../../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import DealerLookup from "../../../../../LookupScreens/Dealer/DealerLookup";
import CustomerPlantsLookup from "../../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import DelayUnitCodeLookup from "../../../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
import { useParams } from "react-router-dom";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditGenerlTabValid,
  setEditSaveFormData,
  setGeneralLoading,
} from "../../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
import { PermissionKeyGeneratorUtil } from "../../../../../../utils/PermissionKeyGeneratorUtil";
import { formatDatetimeToDate } from "../../../../../../utils/dateUtils";

const validationSchema = yup.object({
  city: yup.string().required(),
  statecode: yup.string().max(2).min(2).required(),
  postalcode: yup.string().required(),
});

const General = () => {
  const { breakdownFK } = useParams();
  const dispatch = useDispatch();
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const breakdownUnitFK = localStorage.getItem("breakdownUnitFK");
  const delayedUnitFK = localStorage.getItem("delayedUnitFK");
  const [showLookup, setShowLookup] = useState(false);
  const [breakdownPeriod, setBreakdownPeriod] = useState("AM"); // Default to AM
  const [reportPeriod, setReportPeriod] = useState("AM"); // Default to AM
  const [delayUnitCodeArray, setDelayUnitCodeArray] = useState([]);
  const [delayedUnitCodeInput, setDelayedUnitCodeInput] = useState("");
  const [delayedUnitCodeID, setDelayedUnitCodeID] = useState("");
  const editGenerlTabValid = useSelector((state) => state.delaybreakdown.editGenerlTabValid);
  const generalLoading = useSelector((state) => state.delaybreakdown.generalLoading);
  const breakdownDetailFlag = useSelector((state) => state.delaybreakdown.breakdownDetailFlag);
  const repairPlantFlag = useSelector((state) => state.delaybreakdown.repairPlantFlag);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const [newBreakdownData, setNewBreakdownData] = useState();
  const [driver, setDriver] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [phone, setPhone] = useState();
  const [vin, setVin] = useState("");
  const [odoMeter, setOdoMeter] = useState("");
  const [selectedBreakdownDate, setSelectedBreakdownDate] = useState();
  const [breakdownDate, setBreakdownDate] = useState();
  const [isSelectedBreakdownDateValid, setIsSelectedBreakdownDateValid] = useState(true);
  const [selectedBreakdownTime, setSelectedBreakdownTime] = useState();
  const [selectedReportTime, setSelectedReportTime] = useState();

  const [selectedReportDate, setSelectedReportDate] = useState();
  const [reportedDate, setReportedDate] = useState();
  const [isSelectedReportDateValid, setIsSelectedReportDateValid] = useState(true);
  const [breakdownContact, setBreakdownContact] = useState("");
  const [breakdownContactPhone, setBreakdownContactPhone] = useState("");
  const [extn, setExtn] = useState("");
  const [breakdownFax, setBreakdownFax] = useState("");
  const [dealersList, setDealersList] = useState([]);
  const [dealerInput, setDealerInput] = useState("");
  const [dealerId, setDealerId] = useState("");
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [plantInput, setPlantInput] = useState("");
  const [plantId, setPlantId] = useState("");
  const [showPlantLookUp, setshowPlantLookUp] = useState(false);
  const [furtherRepair, setFurtherRepair] = useState();
  const [repaired, setRepaired] = useState(false);
  const [selectedRepairDate, setSelectedRepairDate] = useState(null);
  const [isSelectedRepairDateValid, setIsSelectedRepairDateValid] = useState(true);
  const [deliveryTerminated, setDeliveryTerminated] = useState(false);
  const [terminateAtCurrentLoc, setTerminateAtCurrentLoc] = useState(false);
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
  const [isDealerLoading, setDealerLoading] = useState(false);
  const [sendUpdateEmail, setSendUpdateEmail] = useState(false);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  //used for custom delay unitcode lookup
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
  //permission
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("BREAKNEW", "new");
  const [disableEmailPermission, setDisableEmailPermission] = useState(false);
  useEffect(() => {
    if (deniedPermissions) {
      setDisableEmailPermission(!deniedPermissions?.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setBreakdownFax(formattedPhoneNumber);
  };
  const phoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);
    setExtn(extenstion);
  };
  const getNewBreakdownData = () => {
    dispatch(setGeneralLoading(true));
    BreakdownProcessingService.getBreakdownViewDetails(
      "General",
      breakdownFK,
      0,
      10,
      null,
      false,
      breakdownCompanyName
    )
      .then((response) => {
        const data = response?.data[0];
        setNewBreakdownData(data);
        setDriver(data?.DriverName);
        setUnitNumber(data?.UnitNumber);
        setVin(data?.VIN);
        setOdoMeter(data?.Odometer || "");
        setSelectedBreakdownDate(formatDatetimeToDate(data?.BreakdownDate));
        setSelectedBreakdownTime(data?.BreakdownTime);
        setBreakdownPeriod(data?.BreakdownAMPM);
        setSelectedReportDate(formatDatetimeToDate(data?.ReportDate));
        setSelectedReportTime(data?.ReportDateTime);
        setReportPeriod(data?.ReportDateAMPM);
        setBreakdownDate(
          combineDateAndTime(
            formatDatetimeToDate(data?.BreakdownDate),
            data?.BreakdownTime,
            data?.BreakdownAMPM
          )
        );
        setReportedDate(
          combineDateAndTime(
            formatDatetimeToDate(data?.ReportDate),
            data?.ReportDateTime,
            data?.ReportDateAMPM
          )
        );
        setDelayedUnitCodeInput(data?.BreakdownCode);
        setDelayedUnitCodeID(data?.BreakdownCodeFK);
        setBreakdownContact(data?.BreakdownContact);
        setBreakdownContactPhone(
          data?.BreakdownContactPhone != null ? formatPhoneNumber(data?.BreakdownContactPhone) : ""
        );
        setExtn(data?.BreakdownExtension);
        setBreakdownFax(data?.BreakdownFAX != null ? formatPhoneNumber(data?.BreakdownFAX) : "");
        setFurtherRepair(data?.FurtherRepairsRequired);
        setRepaired(data?.Repaired);
        setDeliveryTerminated(data?.TerminateDelivery);
        setTerminateAtCurrentLoc(data?.TerminateDelivery);
        setActivateUnit(data?.ActivateUnit);
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
        dispatch(setGeneralLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setGeneralLoading(false));
      });
  };

  useEffect(() => {
    if (breakdownUnitFK && breakdownDetailFlag) {
      getNewBreakdownData();
    }
  }, [breakdownUnitFK, breakdownDetailFlag]);

  //used to get bREakdown Code
  const fetchDelayedUnitCode = (string) => {
    setIsLoading(true);
    BreakdownProcessingService.getAutoCompleteForBreakdownCodes(string, breakdownCompanyName, breakdownFK)
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

  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setShowLookup(false);
    setDelayedUnitCodeInput(delayUnitCode?.description?.trim());
    setDelayedUnitCodeID(delayUnitCode?.delayedUnitCodePK);
  };

  const handleLookup = () => {
    setShowLookup(true);
  };

  // Used for Pickup Dealer selection AutoComplete
  const fetchDealerByName = (string) => {
    setDealerLoading(true);
    BreakdownProcessingService.geActiveRepairDealerForAutoComplete(
      string,
      breakdownCompanyName,
      breakdownUnitFK
    )
      .then((response) => {
        setDealerLoading(false);

        const data = response?.data;
        const listingData = data?.filter(
          (item) => item.Type !== "Pagination" && item.Type !== "plantEnabled"
        );

        const dealerList = (listingData || []).map((dealer) => ({
          ...dealer,
          name: dealer?.name?.trim() || "",
        }));
        setDealersList(dealerList);
      })
      .catch((err) => {
        setDealerLoading(false);
      });
  };

  const handleDealerSelection = (dealer) => {
    setShowDealerLookup(false);
    setDealerInput(dealer?.name);
    setDealerId(dealer?.dealerPK);
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
    BreakdownProcessingService.geActiveRepairPlantForAutoComplete(
      string,
      breakdownCompanyName,
      breakdownUnitFK
    )
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
      selectedBreakdownTime &&
      typeof selectedBreakdownTime === "string" &&
      selectedBreakdownTime?.trim() !== "" &&
      /^([0]?[1-9]|1[0-2]):[0-5][0-9]$/.test(selectedBreakdownTime) &&
      breakdownPeriod;

    const isReportTimeValid =
      selectedReportTime &&
      typeof selectedReportTime === "string" &&
      selectedReportTime?.trim() !== "" &&
      /^([0]?[1-9]|1[0-2]):[0-5][0-9]$/.test(selectedReportTime) &&
      reportPeriod;

    if (
      delayedUnitCodeInput &&
      delayedUnitCodeID &&
      selectedBreakdownDate &&
      isSelectedBreakdownDateValid &&
      selectedReportDate &&
      isSelectedRepairDateValid &&
      breakdownPeriod &&
      reportPeriod &&
      vin &&
      contact &&
      phone &&
      phone?.match(phoneRegex) &&
      nameUnder &&
      ((!newBreakdownData?.Motorized && (!odoMeter || odoMeter)) ||
        (newBreakdownData?.Motorized && odoMeter && odoMeter <= 32767)) &&
      breakdownContact &&
      breakdownContactPhone &&
      breakdownContactPhone?.match(phoneRegex) &&
      (!extn || (extn && extn?.length >= 3)) &&
      ((breakdownFax && breakdownFax?.match(phoneRegex)) || !breakdownFax) &&
      (!repaired || (repaired && selectedRepairDate && isSelectedRepairDateValid)) &&
      isTimeValid &&
      isReportTimeValid &&
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
    newBreakdownData,
    extn,
    selectedBreakdownTime,
    selectedReportTime,
    delayedUnitCodeInput,
    delayedUnitCodeID,
    selectedBreakdownDate,
    breakdownPeriod,
    isSelectedBreakdownDateValid,
    selectedReportDate,
    reportPeriod,
    isSelectedReportDateValid,
    breakdownContact,
    breakdownContactPhone,
    breakdownFax,
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
    vin,
    odoMeter,
    breakdownContact,
    breakdownContactPhone,
  ]);

  const generalTabData = () => {
    dispatch(
      setEditSaveFormData({
        unitFk: breakdownUnitFK,
        delayedUnitFk: delayedUnitFK,
        breakdownDate: breakdownDate,
        reported: reportedDate,
        breakDownDelayedUnitCodeFk: delayedUnitCodeID,
        breakdownYardFk: newBreakdownData?.BreakdownYardFK,
        breakdownDealerFk: newBreakdownData?.BreakdownDealerFK,
        breakdownPk: breakdownFK,
        atPickup: false,
        inYard: false,
        atDelivery: false,
        phone: phone?.replace(/\s+/g, ""),
        contact: contact,
        vin: vin,
        odoMeter: odoMeter,
        breakdownUnitAddressFk: newBreakdownData?.BreakdownUnitAddressFK,
        breakdownUnitLocationFk: newBreakdownData?.BreakdownUnitLocationFK,
        breakdowmFax: breakdownFax,
        repaired: repaired,
        activateUnit: activateUnit,
        atRepairLocation: atRepairLocation,
        repairDate: selectedRepairDate,
        repairDealerFk: dealerId,
        repairUnitAddressFk: unitAddressId,
        repairCustomerPlantFk: plantId,
        furtherRepairsRequired: furtherRepair,
        company: breakdownCompanyName,
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
        disableEmail: disableEmailPermission,
        breakdownContact: breakdownContact,
        breakdownContactPhone: breakdownContactPhone?.replace(/\s+/g, ""),
        breakdownContactExtension: extn,
        breakdownContactFAX: breakdownFax?.replace(/\s+/g, ""),
        dispatchFK: newBreakdownData?.DispatchFK,
        driverReleased: newBreakdownData?.DriverRelease === 1,
        customerDescription: newBreakdownData?.CustomerDescription?.trim(),
        sendUpdateEmail: sendUpdateEmail,
      })
    );
  };

  useEffect(() => {
    generalTabData();
  }, [
    breakdownUnitFK,
    unitAddressId,
    breakdownFax,
    breakdownContact,
    breakdownContactPhone,
    extn,
    disableEmailPermission,
    newBreakdownData,
    deliveryTerminated,
    driver,
    unitNumber,
    vin,
    odoMeter,
    breakdownDate,
    reportedDate,
    delayedUnitCodeInput,
    breakdownContact,
    breakdownContactPhone,
    breakdownFax,
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
    activateUnit,
    sendUpdateEmail,
  ]);

  //used to set plant payload for lookup
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
                <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
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
                      value={driver?.trim()}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
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
                      id="description"
                      name="description"
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
                      className={`customFormControl ${generalLoading ? "" : !vin ? "borderRed" : "borderGreen"}`}
                      id="vin"
                      name="vin"
                      maxLength={30}
                      value={vin}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        setVin(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Odometer</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        !newBreakdownData?.Motorized || generalLoading
                          ? ""
                          : odoMeter && odoMeter <= 32767
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      value={odoMeter}
                      id="odometer"
                      name="odometer"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}?$/) &&
                          e.target.value <= 32767 &&
                          setOdoMeter(e.target.value);
                      }}
                      disabled={!newBreakdownData?.Motorized}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Breakdown Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      className={`customFormControl ${
                        generalLoading
                          ? ""
                          : selectedBreakdownDate && isSelectedBreakdownDateValid
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      max={new Date()}
                      date={generalLoading ? "" : selectedBreakdownDate}
                      setDate={(value) => {
                        setSelectedBreakdownDate(value);
                        setBreakdownDate(combineDateAndTime(value, selectedBreakdownTime, breakdownPeriod));
                      }}
                      setIsDateValid={setIsSelectedBreakdownDateValid}
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const newvalue = insertColonAfterTwoDigits(value);
                        setSelectedBreakdownTime(newvalue);
                        setBreakdownDate(
                          combineDateAndTime(selectedBreakdownDate, newvalue, breakdownPeriod)
                        );
                      }}
                      type="text"
                      placeholder="HH:MM"
                      maxLength={5}
                      className={`customFormControl ${
                        generalLoading
                          ? ""
                          : isValid12HourTime(selectedBreakdownDate, selectedBreakdownTime)
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      value={generalLoading ? "" : selectedBreakdownTime}
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
                        checked={breakdownPeriod === "AM"}
                        onChange={(e) => {
                          setBreakdownPeriod(e.target.value);
                          setBreakdownDate(
                            combineDateAndTime(selectedBreakdownDate, selectedBreakdownTime, e.target.value)
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
                        checked={breakdownPeriod === "PM"}
                        onChange={(e) => {
                          setBreakdownPeriod(e.target.value);
                          setBreakdownDate(
                            combineDateAndTime(selectedBreakdownDate, selectedBreakdownTime, e.target.value)
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
                    <Form.Label className="col-form-label dealer-label">Breakdown Code</Form.Label>
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
                    <Form.Label className="col-form-label dealer-label">
                      Customer Breakdown Contact
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        generalLoading ? "" : breakdownContact ? "borderGreen" : "borderRed"
                      }`}
                      id="breakdownContact"
                      name="breakdownContact"
                      maxLength={30}
                      style={{ width: "260px" }}
                      value={breakdownContact}
                      onChange={(e) => setBreakdownContact(e.target.value)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Breakdown Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        generalLoading
                          ? ""
                          : formatPhoneNumber(breakdownContactPhone).length === 14
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="breakdownContactPhone"
                      name="breakdownContactPhone"
                      maxLength={14}
                      value={breakdownContactPhone}
                      onChange={(e) => setBreakdownContactPhone(formatPhoneNumber(e.target.value))}
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
                      disabled={!breakdownContactPhone}
                      onInput={(e) => {
                        setExtn(e.target.value);
                      }}
                      className={`customFormControl ${
                        generalLoading || !breakdownContactPhone || !extn
                          ? ""
                          : extn && extn?.length < 3
                            ? "borderRed"
                            : ""
                      }`}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Breakdown FAX</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      style={{
                        border:
                          String(breakdownFax).match(phoneRegex) || breakdownFax === ""
                            ? "black 1px solid"
                            : "red 2px solid",
                      }}
                      className="customFormControl"
                      id="breakdownFax"
                      name="breakdownFax"
                      maxLength={14}
                      value={breakdownFax}
                      onInput={(e) => setBreakdownFax(e.target.value)}
                      onChange={(e) => faxFormatHandler(e)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Further Repairs Required</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input ${""}`}
                      label="furtherRepaired"
                      id="furtherRepaired"
                      checked={furtherRepair}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFurtherRepair(checked);
                        if (checked) {
                          setRepaired(false);
                          setSelectedRepairDate(null);
                          setDeliveryTerminated(false);
                          setTerminateAtCurrentLoc(false);
                          setActivateUnit(false);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
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

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Repaired</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input ${""}`}
                      label="Repaired"
                      id="repaired"
                      checked={repaired}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setRepaired(checked);
                        if (checked) {
                          setFurtherRepair(false);
                          setSelectedRepairDate(new Date());
                        } else {
                          setSelectedRepairDate(null);
                          setDeliveryTerminated(false);
                          setTerminateAtCurrentLoc(false);
                          setActivateUnit(false);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
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
                      onChange={(e) => {
                        setDeliveryTerminated(e.target.checked);
                        const checked = e.target.checked;
                        if (!checked) {
                          setTerminateAtCurrentLoc(false);
                        }
                      }}
                      disabled={(!repaired && !furtherRepair) || activateUnit}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
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
                      onChange={(e) => setTerminateAtCurrentLoc(e.target.checked)}
                      disabled={!deliveryTerminated}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
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
                      onChange={(e) => {
                        setActivateUnit(e.target.checked);
                      }}
                      disabled={
                        (!repaired && !furtherRepair) ||
                        deliveryTerminated ||
                        newBreakdownData?.DriverReleased ||
                        newBreakdownData?.ActiveUnitFlag === "N"
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="m-t-12 form-group  align-items-center row  m-l-0 m-r-0 ">
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
                <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0  ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Repair Location</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input `}
                      id="atdelivery"
                      name="atdelivery"
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
            <DelayUnitCodeLookup
              show={showLookup}
              onHide={() => setShowLookup(false)}
              renderItemId={(item) => item.delayedUnitCodePK}
              handleLookupSelection={handleDelayUnitCodeLookup}
              customServiceCallback={() =>
                BreakdownProcessingService.getLookupForBreakdownCodes(
                  selectedSearchCriteria,
                  searchTerms,
                  pageNumber,
                  normalSortValue,
                  normalSortFlag,
                  breakdownCompanyName,
                  breakdownFK
                )
              }
            />
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
        </Form>
      )}
    </Formik>
  );
};

export default General;
