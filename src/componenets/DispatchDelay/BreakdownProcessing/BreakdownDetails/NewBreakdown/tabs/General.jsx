import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import DateInputField from "../../../../../common/DateInputField";
import LookupButton from "../../../../../common/LookupButton";
import DelayUnitCodeLookup from "../../../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import { PermissionKeyGeneratorUtil } from "../../../../../../utils/PermissionKeyGeneratorUtil";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import {
  setNewGenerlTabValid,
  setSaveFormData,
} from "../../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import { formatDatetimeToDate } from "../../../../../../utils/dateUtils";
import {
  setBreakdownFlag,
  setDelayedUnitbreakdownFlag,
  setDelayedUnitdamageFlag,
  setDelayedUnitReleaseDriver,
  setReleaseDispatchPK,
} from "../../../../../../redux/UndispatchSlice";
import { trim } from "zod";
const General = () => {
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const [showLookup, setShowLookup] = useState(false);
  const [delayUnitCodeArray, setDelayUnitCodeArray] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const [delayPeriod, setDelayPeriod] = useState("AM"); // Default to AM
  const [reportPeriod, setReportPeriod] = useState("AM"); // Default to AM

  const [sendUpdateOfNotificationEmail, setSendUpdateOfNotificationEmail] = useState(false);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const [newBreakdownData, setNewBreakdownData] = useState(null);
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
  const [atPickup, setAtPickup] = useState(false);
  const [inYard, setInYard] = useState(false);
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
  const [delayDate, setDelayDate] = useState();
  const [reported, setReported] = useState();
  const [odoMeter, setOdoMeter] = useState("");
  const [vin, setVin] = useState("");
  const [yardDisableFlag, setYardDisableFlag] = useState(false);
  const [pickupDisableFlag, setPickupDisableFlag] = useState(false);
  const [checkDisableFlag, setCheckDisableFlag] = useState(false);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const [sendNotificationEmail, setSendNotificationEmail] = useState(true);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("BREAKNEW", "new");
  const [disableEmailPermission, setDisableEmailPermission] = useState(false);
  const [delayedUnitCodeID, setDelayedUnitCodeID] = useState("");
  const [delayedUnitCodeInput, setDelayedUnitCodeInput] = useState("");

  const [inYardDisabled, setInYardDisabled] = useState(true);
  const [atPickupDisabled, setAtPickupDisabled] = useState(true);
  const unitConfirmationData = useSelector((state) => state.delaybreakdown.unitConfirmationData);
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

  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setShowLookup(false);
    setDelayedUnitCodeInput(delayUnitCode.description?.trim());
    setDelayedUnitCodeID(delayUnitCode.delayedUnitCodePK);
  };

  const handleLookup = () => {
    setShowLookup(true);
  };
  const insertColonAfterTwoDigits = (input) => {
    if (!input || input?.includes(":")) return input;

    const cleaned = input?.replace(/\D/g, "");

    if (cleaned?.length <= 2) return cleaned;
    if (cleaned?.length <= 4) {
      return `${cleaned?.slice(0, 2)}:${cleaned?.slice(2)}`;
    }

    return cleaned?.slice(0, 2) + ":" + cleaned?.slice(2, 4); // truncate anything beyond 4 digits
  };

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

  const fetchDelayedUnitCode = (string) => {
    setIsLoading(true);
    BreakdownProcessingService.getAutoCompleteForBreakdownCodes(string, companyName, null)
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

  /** used to get delay new tabs**/

  const getNewBreakdownData = () => {
    setLoading(true);
    BreakdownProcessingService.getDelayBreakdownDetails("General", unitfk, companyName, 0, 0, 10, null, false)
      .then((response) => {
        const data = response?.data[0];
        setNewBreakdownData(data);
        setVin(data?.VIN);
        //used for release driver
        dispatch(setReleaseDispatchPK(data?.DispatchPk));
        dispatch(setDelayedUnitReleaseDriver(data?.DriverReleased));
        dispatch(setDelayedUnitbreakdownFlag(data?.Breakdown));
        dispatch(setDelayedUnitdamageFlag(data?.Damage));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (unitfk) {
      getNewBreakdownData();
    }
  }, [unitfk]);

  //used to set atpickup and inyard

  //case1:unit without Dispatch record
  //case 2:dispatch with active=1,activedispatch=1,dispatched=0 and no driver
  useEffect(() => {
    setInYard(false);
    setAtPickup(false);
    if (newBreakdownData) {
      const setYardLocation = () => {
        setInYard(true);
        setYardDisableFlag(true);
        setCurrentLocaionName(newBreakdownData?.Yard_CurrentLocation_Name?.trim());
        setCurrentLocaionAddress1(newBreakdownData?.Yard_CurrentLocation_Address1?.trim() || "");
        setCurrentLocaionAddress2(
          newBreakdownData?.Yard_CurrentLocation_Address2 &&
            newBreakdownData?.Yard_CurrentLocation_Address2 !== "null"
            ? newBreakdownData?.Yard_CurrentLocation_Address2?.trim()
            : ""
        );
        setCity(newBreakdownData?.Yard_CurrentLocation_City?.trim());
        setStateCode(newBreakdownData?.Yard_CurrentLocation_State?.trim());
        setPostalCode(newBreakdownData?.Yard_CurrentLocation_PostalCode?.trim());
        setContact("");
        setPhone(
          newBreakdownData?.Yard_CurrentLocation_Phone != null
            ? formatPhoneNumber(newBreakdownData?.Yard_CurrentLocation_Phone)
            : ""
        );
      };

      const setPickupLocation = () => {
        setAtPickup(true);
        setPickupDisableFlag(true);
        setCurrentLocaionName(newBreakdownData?.PickUp_CurLocation_Name?.trim());
        setCurrentLocaionAddress1(newBreakdownData?.PickUp_CurLocation_Add1?.trim() || "");
        setCurrentLocaionAddress2(
          newBreakdownData?.PickUp_CurLocation_Add2 && newBreakdownData?.PickUp_CurLocation_Add2 !== "null"
            ? newBreakdownData?.PickUp_CurLocation_Add2?.trim()
            : ""
        );
        setCity(newBreakdownData?.PickUp_CurLocation_City?.trim());
        setPostalCode(newBreakdownData?.PickUp_CurLocation_PostCode?.trim());
        setStateCode(newBreakdownData?.PickUp_CurLocation_State?.trim());
        setContact(newBreakdownData?.PickUp_Contact?.trim());
        setPhone(
          newBreakdownData?.PickUp_Phone != null ? formatPhoneNumber(newBreakdownData?.PickUp_Phone) : ""
        );
      };

      const isCase1 = newBreakdownData?.DispatchPk == null;
      const isCase2 =
        newBreakdownData?.DispatchPk &&
        !newBreakdownData?.DriverFk &&
        newBreakdownData?.ActiveUnit &&
        !newBreakdownData?.Dispatched;

      if (isCase1 || isCase2) {
        newBreakdownData?.PickupYardFK ? setYardLocation() : setPickupLocation();
      }
    }
  }, [newBreakdownData]);

  const [yardFlag, setYardFlag] = useState(true);
  useEffect(() => {
    const hasDispatchAndDriver = newBreakdownData?.DispatchPk;
    //newBreakdownData?.DispatchPk && newBreakdownData?.DriverFk;

    const pickedUp = newBreakdownData?.PickedUp === 1;
    const pickupYardExit = newBreakdownData?.PickupYardExit === 1;

    if (hasDispatchAndDriver) {
      setCheckDisableFlag(true);
      if (hasDispatchAndDriver && !newBreakdownData?.PickupYardFK) {
        setYardFlag(false);
      }
      if (!pickedUp && !pickupYardExit) {
        //Case: PickedUp = 0 and PickupYardExit = 0
        setInYardDisabled(false);
        setAtPickupDisabled(false);
      } else if (pickupYardExit) {
        // Only PickupYardExit = 1
        setInYardDisabled(false);
        setAtPickupDisabled(true);
      } else if (pickedUp) {
        //  Only PickedUp = 1
        setInYardDisabled(true);
        setAtPickupDisabled(false);
      }
    } else {
      // No dispatch or driver: disable all
      setCheckDisableFlag(false);
      setInYardDisabled(true);
      setAtPickupDisabled(true);
    }
  }, [newBreakdownData]);

  /**
   * general tab validation
   **/
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
      vin &&
      ((!newBreakdownData?.Motorized && (!odoMeter || odoMeter)) ||
        (newBreakdownData?.Motorized && odoMeter && odoMeter <= 32767)) &&
      isSelectedDelayDateValid &&
      selectedReportDate &&
      isSelectedReportDateValid &&
      isTimeValid &&
      isReportTimeValid &&
      (atLastLOcation ||
        atDelivery ||
        atPickup ||
        inYard ||
        (!atLastLOcation &&
          !atDelivery &&
          !atPickup &&
          !inYard &&
          currentLocaionName &&
          currentLocaionAddress1 &&
          postalCodePK)) &&
      contact &&
      phone &&
      phone?.match(phoneRegex)
    ) {
      dispatch(setNewGenerlTabValid(true));
    } else {
      {
        dispatch(setNewGenerlTabValid(false));
      }
    }
  }, [
    newBreakdownData,
    selectedDelayTime,
    selectedReportTime,
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
    vin,
    odoMeter,
    atPickup,
    inYard,
  ]);

  /**
   * set save object
   **/
  const generalTabData = () => {
    dispatch(
      setSaveFormData({
        unitFk: unitfk,
        delayedUnitFk: delayedUnitPK !== 0 ? delayedUnitPK : null,
        breakdownDate: delayDate,
        reported: reported,
        breakDownDelayedUnitCodeFk: delayedUnitCodeID,
        breakdownYardFk: inYard ? newBreakdownData?.pickupyardfk : null,
        breakdownDealerFk: atDelivery
          ? newBreakdownData?.DeliveryDealerFK
          : atPickup
            ? newBreakdownData?.PickupDealerFK
            : null,
        breakdownPk: null,
        atPickup: atPickup,
        inYard: inYard,
        atDelivery: atDelivery,
        phone: phone?.replace(/\s+/g, ""),
        contact: contact,
        vin: vin,
        odoMeter: odoMeter,
        breakdownUnitAddressFk: null,
        breakdownUnitLocationFk: atLastLOcation ? newBreakdownData?.LastLocationFK : null,
        repaired: false,
        atRepairLocation: null,
        repairDate: null,
        repairDealerFk: null,
        repairUnitAddressFk: null,
        repairCustomerPlantFk: null,
        furtherRepairsRequired: false,
        company: companyName,
        currentLocationName: currentLocaionName,
        currentLocationAddress1: currentLocaionAddress1,
        currentLocationAddress2: currentLocaionAddress2,
        currentLocationCity: city,
        currentLocationState: statecode,
        currentLocationPostal: postalcode,
        terminateDelivery: null,
        nameUnder: null,
        workOrderNumber: null,
        repairLocationName: null,
        repairLocationAddress1: null,
        repairLocationAddress2: null,
        repairLocationCity: null,
        repairLocationState: null,
        repairLocationPostal: null,
        disableEmail: disableEmailPermission,
        atLastLocation: atLastLOcation,
        dispatchFK: newBreakdownData?.DispatchPk,
        driverReleased: newBreakdownData?.DriverRelease === 1,
        customerDescription: newBreakdownData?.CustomerDescription?.trim(),
        motorized: Number(newBreakdownData?.Motorized) === 1,
        driverFK: newBreakdownData?.DriverFk,
      })
    );
  };

  useEffect(() => {
    generalTabData();
  }, [
    delayedUnitPK,
    atLastLOcation,
    disableEmailPermission,
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
    reported,
    unitfk,
    companyName,
    atPickup,
    atDelivery,
    inYard,
    atLastLOcation,
    vin,
    odoMeter,
    newBreakdownData,
    unitConfirmationData,
  ]);

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
    setDelayDate(combineDateAndTime(selectedDelayDate, fmt, pm));
    setReported(combineDateAndTime(selectedReportDate, fmt, pm));
  }, []);

  //check permission
  useEffect(() => {
    if (deniedPermissions) {
      setDisableEmailPermission(!deniedPermissions?.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);

  const clearCurrentLocationFields = () => {
    setCurrentLocaionName("");
    setCurrentLocaionAddress1("");
    setCurrentLocaionAddress2("");
    setCity("");
    setPostalCode("");
    setStateCode("");
    setPostalCodePK("");
    setContact("");
    setPhone("");
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
                      value={newBreakdownData?.Driver?.trim()}
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
                    <Form.Label className="col-form-label dealer-label"> Cell Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      maxLength={14}
                      disabled
                      className={`customFormControl`}
                      value={newBreakdownData?.CellPhone}
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
                      value={newBreakdownData?.UnitNumber?.trim()}
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
                      value={newBreakdownData?.Model?.trim()}
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
                    <Form.Label className="col-form-label dealer-label"> Unit Type</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={newBreakdownData?.UnitType_Description?.trim()}
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
                      value={newBreakdownData?.SpecialCode_Description?.trim()}
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
                    <Form.Label className="col-form-label dealer-label"> VIN</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      value={vin}
                      id="vin"
                      name="vin"
                      maxLength={21}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onInput={(e) => {
                        setVin(e.target.value);
                      }}
                      className={`customFormControl ${vin ? "borderGreen" : "borderRed"}`}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Odometer</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        !newBreakdownData?.Motorized
                          ? ""
                          : odoMeter && odoMeter <= 32767
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      value={odoMeter}
                      id="vin"
                      name="vin"
                      maxLength={5}
                      disabled={!newBreakdownData?.Motorized}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}?$/) &&
                          e.target.value <= 32767 &&
                          setOdoMeter(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Breakdown Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      date={selectedDelayDate}
                      setDate={(value) => {
                        setSelectedDelayDate(value);
                        setDelayDate(combineDateAndTime(value, selectedDelayTime, delayPeriod));
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
                        setDelayDate(combineDateAndTime(selectedDelayDate, newvalue, delayPeriod));
                      }}
                      // onChange={onDelayTimeChange}
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
                          setDelayDate(
                            combineDateAndTime(selectedDelayDate, selectedDelayTime, e.target.value)
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
                          setDelayDate(
                            combineDateAndTime(selectedDelayDate, selectedDelayTime, e.target.value)
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
                      setDate={(value) => {
                        setSelectedReportDate(value);
                        setReported(combineDateAndTime(value, selectedReportTime, reportPeriod));
                      }}
                      max={new Date()}
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
                        setReported(combineDateAndTime(selectedReportDate, newvalue, reportPeriod));
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
                          setReported(
                            combineDateAndTime(selectedReportDate, selectedReportTime, e.target.value)
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
                          setReported(
                            combineDateAndTime(selectedReportDate, selectedReportTime, e.target.value)
                          );
                        }}
                      />{" "}
                      PM
                    </label>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Breakdown Code</Form.Label>
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
                        loading ? "" : delayedUnitCodeInput && delayedUnitCodeID ? "borderGreen" : "borderRed"
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
                      value={newBreakdownData?.PickUp_Name?.trim()}
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
                      value={newBreakdownData?.PickUp_City?.trim()}
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
                      value={newBreakdownData?.PickUp_State}
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
                      value={newBreakdownData?.Delivery_Name?.trim()}
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
                      value={newBreakdownData?.Delivery_City?.trim()}
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
                      value={newBreakdownData?.Delivery_State?.trim()}
                      maxLength={4}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">In Yard </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      checked={inYard}
                      className="form-check-input p-0 "
                      id="atlastLocation"
                      name="atlastLocation"
                      disabled={
                        atDelivery ||
                        atLastLOcation ||
                        atPickup ||
                        yardDisableFlag ||
                        !checkDisableFlag ||
                        inYardDisabled ||
                        !yardFlag
                      }
                      onChange={(e) => {
                        const value = e.target.checked;

                        setInYard(value);
                        if (value) {
                          setCurrentLocaionName(newBreakdownData?.Yard_CurrentLocation_Name?.trim());
                          setCurrentLocaionAddress1(
                            newBreakdownData?.Yard_CurrentLocation_Address1?.trim() || ""
                          );
                          setCurrentLocaionAddress2(
                            newBreakdownData?.Yard_CurrentLocation_Address2 &&
                              newBreakdownData?.Yard_CurrentLocation_Address2 !== "null"
                              ? newBreakdownData?.Yard_CurrentLocation_Address2?.trim()
                              : ""
                          );
                          setCity(newBreakdownData?.Yard_CurrentLocation_City?.trim());
                          setStateCode(newBreakdownData?.Yard_CurrentLocation_State?.trim());
                          setPostalCode(newBreakdownData?.Yard_CurrentLocation_PostalCode?.trim());
                          setContact("");
                          setPhone(
                            newBreakdownData?.Yard_CurrentLocation_Phone != null
                              ? formatPhoneNumber(newBreakdownData?.Yard_CurrentLocation_Phone)
                              : ""
                          );
                        } else {
                          clearCurrentLocationFields();
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Pickup </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      checked={atPickup}
                      className="form-check-input p-0 "
                      id="atlastLocation"
                      name="atlastLocation"
                      disabled={
                        atDelivery ||
                        atLastLOcation ||
                        inYard ||
                        pickupDisableFlag ||
                        !checkDisableFlag ||
                        atPickupDisabled
                      }
                      onChange={(e) => {
                        const value = e.target.checked;

                        setAtPickup(value);
                        if (value) {
                          setCurrentLocaionName(newBreakdownData?.PickUp_CurLocation_Name?.trim() || "");
                          setCurrentLocaionAddress1(newBreakdownData?.PickUp_CurLocation_Add1?.trim() || "");
                          setCurrentLocaionAddress2(
                            newBreakdownData?.PickUp_CurLocation_Add2 &&
                              newBreakdownData?.PickUp_CurLocation_Add2 !== "null"
                              ? newBreakdownData?.PickUp_CurLocation_Add2?.trim()
                              : ""
                          );
                          setCity(newBreakdownData?.PickUp_CurLocation_City?.trim() || "");
                          setPostalCode(newBreakdownData?.PickUp_CurLocation_PostCode?.trim() || "");
                          setStateCode(newBreakdownData?.PickUp_CurLocation_State?.trim() || "");
                          setContact(newBreakdownData?.PickUp_Contact?.trim());
                          setPhone(
                            newBreakdownData?.PickUp_Phone != null
                              ? formatPhoneNumber(newBreakdownData?.PickUp_Phone)
                              : ""
                          );
                        } else {
                          clearCurrentLocationFields();
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
                      checked={atLastLOcation}
                      className="form-check-input p-0 "
                      id="atlastLocation"
                      name="atlastLocation"
                      disabled={atPickup || atDelivery || inYard || !checkDisableFlag}
                      onChange={(e) => {
                        const value = e.target.checked;

                        setAtLastLOcation(value);
                        if (value) {
                          setCurrentLocaionName("");
                          setCurrentLocaionAddress1("");
                          setCurrentLocaionAddress2("");
                          setCity("");
                          setPostalCode("");
                          setStateCode("");
                          setPostalCodePK("");
                          setContact(newBreakdownData?.LastLocation_Contact?.trim());
                          setPhone(
                            newBreakdownData?.LastLocation_Phone != null
                              ? formatPhoneNumber(newBreakdownData?.LastLocation_Phone)
                              : ""
                          );
                        } else {
                          clearCurrentLocationFields();
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
                      value={atLastLOcation ? newBreakdownData?.LastLocation_Name : ""}
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
                      value={atLastLOcation ? newBreakdownData?.LastLocation_City : ""}
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
                      value={atLastLOcation ? newBreakdownData?.LastLocation_State : ""}
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
                      disabled={atPickup || atLastLOcation || inYard || !checkDisableFlag}
                      checked={atDelivery}
                      onChange={(e) => {
                        const value = e.target.checked;
                        setAtDelivery(value);
                        if (value) {
                          setCurrentLocaionName(newBreakdownData?.Delivery_CurLocation_Name?.trim() || "");
                          setCurrentLocaionAddress1(newBreakdownData?.Delivery_CurLocation_Add1 || "");
                          setCurrentLocaionAddress2(
                            newBreakdownData?.Delivery_CurLocation_Add2 &&
                              newBreakdownData.Delivery_CurLocation_Add2 !== "null"
                              ? newBreakdownData.Delivery_CurLocation_Add2
                              : ""
                          );
                          setCity(newBreakdownData?.Delivery_CurLocation_City || "");
                          setPostalCode(newBreakdownData?.Delivery_CurLocation_PostCode || "");
                          setStateCode(newBreakdownData?.Delivery_CurLocation_State || "");
                          setContact(newBreakdownData?.Delivery_Contact?.trim());
                          setPhone(
                            newBreakdownData?.Delivery_Phone != null
                              ? formatPhoneNumber(newBreakdownData?.Delivery_Phone)
                              : ""
                          );
                        } else {
                          clearCurrentLocationFields();
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
                      disabled={atLastLOcation || atDelivery || inYard || atPickup}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        setCurrentLocaionName(e.target.value);
                      }}
                      className={`customFormControl ${
                        atLastLOcation || atDelivery || inYard || atPickup
                          ? ""
                          : currentLocaionName
                            ? "borderGreen"
                            : "borderRed"
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
                        atLastLOcation || atDelivery || inYard || atPickup
                          ? ""
                          : currentLocaionAddress1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      value={currentLocaionAddress1}
                      disabled={atLastLOcation || atDelivery || inYard || atPickup}
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
                      className={`customFormControl
                      `}
                      value={currentLocaionAddress2}
                      disabled={atLastLOcation || atDelivery || inYard || atPickup}
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
                  disabled={atLastLOcation || atDelivery || inYard || atPickup}
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
                        phone !== "" && phone?.length == 14 ? "borderGreen" : "borderRed"
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
                BreakdownProcessingService.getLookupForBreakdownCodes(
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
