import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setCurrentLocation,
  setDelayContact,
  setDelayContactExtension,
  setDelayContactFAX,
  setDelayContactPhone,
  setDelayDate,
  setDelayedUnitCodeFK,
  setDelayedUnitCodeID,
  setDelayedUnitCodeInput,
  setDelayUnitLocationFK,
  setIsCurrentLocEmpty,
  setIsPostal,
  setLocationContact,
  setLocationPhone,
  setReported,
  setReturnDetails,
  setSendNotificationEmails,
  setSendUpdateEmails,
  setViewOnly,
  setWorkingUnitLocationFK,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import phoneExtension from "../../../../../utils/validation/PhoneExtension";
import numberValidation from "../../../../../utils/validation/NumberValidation";
import LookupButton from "../../../../common/LookupButton";
import DelayUnitCodeLookup from "../../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import {
  setDealerCity,
  setDealerPostcode,
  setDealerStatecode,
  setOnCancel,
  setPostalCodeOnChange,
} from "../../../../../redux/EditDealerSlice";
import {
  formatForApi,
  parseLocalDate,
  formatDate,
  formatDatetimeToDate,
} from "../../../../../utils/dateUtils";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
const General = () => {
  let dealerPost = useSelector((state) => state.editDealerReducer.dealerPostcode);
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const utcTime = new Date().toISOString(); // Current time in UTC
  const options = { hour: "2-digit", minute: "2-digit", hour12: false };
  const localTime = parseLocalDate(utcTime).toLocaleTimeString("en-US", options);
  const breakdownData = useSelector((state) => state.delayProcessing.breakdown);
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);
  const damageData = useSelector((state) => state.delayProcessing.damage);
  const delayContact = useSelector((state) => state.delayProcessing.delayContact);
  const delayContactFAX = useSelector((state) => state.delayProcessing.delayContactFAX);
  const delayContactExtension = useSelector((state) => state.delayProcessing.delayContactExtension);
  const delayContactPhone = useSelector((state) => state.delayProcessing.delayContactPhone);
  const locationContact = useSelector((state) => state.delayProcessing.locationContact);
  const locationPhone = useSelector((state) => state.delayProcessing.locationPhone);
  const isEditable = useSelector((state) => state.delayProcessing.deliveryCheck);
  const [pickupArray, setPickupArray] = useState([]);
  const [deliveryArray, setDeliveryArray] = useState([]);
  const [deliveryAddrArray, setDeliveryAddrArray] = useState([]);
  const [driverName, setDriverName] = useState([]);
  const [selectedDelayDate, setSelectedDelayDate] = useState();
  const [selectedDelayDateInput, setSelectedDelayDateInput] = useState("");
  const [isSelectedDelayDateValid, setIsSelectedDelayDateValid] = useState(true);
  const [selectedDelayTime, setSelectedDelayTime] = useState();
  const [selectedReportDate, setSelectedReportDate] = useState();
  const [selectedReportDateInput, setSelectedReportDateInput] = useState("");
  const [isSelectedReportDateValid, setIsSelectedReportDateValid] = useState(true);
  const [selectedReportTime, setSelectedReportTime] = useState();
  const [contact, setContact] = useState();
  const [phone, setPhone] = useState();
  const [ext, setExt] = useState("");
  const [fax, setFax] = useState();
  const [lastLocation, setlastLocation] = useState([]);
  const { companyName, driverfk, unitfk } = useParams();
  const [delaycodeList, setDelayCodeList] = useState([]);
  const [isChecked, setChecked] = useState(true);
  const [isDelayChecked, setIsDelayChecked] = useState(false);
  const [isDeliveryChecked, setDeliveryChecked] = useState(false);
  const [showLookup, setShowLookup] = useState(false);
  const delayedUnitCodeID = useSelector((state) => state.delayProcessing.delayedUnitCodeID);
  const delayedUnitCodeInput = useSelector((state) => state.delayProcessing.delayedUnitCodeInput);
  const delayedUnitCode = useSelector((state) => state.delayProcessing.delayedUnitCodeFK);
  const reportedDate = useSelector((state) => state.delayProcessing.reported);
  const delayDate = useSelector((state) => state.delayProcessing.delayDate);
  const [delayUnitCodeArray, setDelayUnitCodeArray] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  const initialForm = {
    name: "",
    address1: "",
    address2: "",
    city: "",
    stateCode: "",
    postalCode: "",
  };
  const [currentLoc, setCurrentLoc] = useState(initialForm);
  const [postalcode, setPostalCode] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [canadian, setCanadian] = useState(false);

  const [zipIdChcek, setZipIdCheck] = useState("");
  const [delayPeriod, setDelayPeriod] = useState("AM"); // Default to AM
  const [reportPeriod, setReportPeriod] = useState("AM"); // Default to AM
  const [sendNotificationEmail, setSendNotificationEmail] = useState(false);
  const [sendUpdateOfNotificationEmail, setSendUpdateOfNotificationEmail] = useState(false);
  const [addrPresentFlag, setaddrPresentFlag] = useState();
  const [namePresentFlag, setnamePresentFlag] = useState();

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    if (!isChecked && !isDeliveryChecked) {
      setCurrentLoc(() => ({
        ...currentLoc,
        [name]: value,
      }));

      if (name === "name") {
        if (value === "") {
          setnamePresentFlag(false);
        } else {
          setnamePresentFlag(true);
        }
      } else if (name === "address1") {
        if (value === "") {
          setaddrPresentFlag(false);
        } else {
          setaddrPresentFlag(true);
        }
      }
    } else {
      dispatch(setCurrentLocation(initialForm));
    }
  };

  useEffect(() => {
    dispatch(setCurrentLocation(currentLoc));
    dispatch(setWorkingUnitLocationFK(null));
  }, [currentLoc]);

  useEffect(() => {
    if (namePresentFlag || addrPresentFlag) {
      setCurrentLoc(() => ({
        ...currentLoc,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
      }));
    }
  }, [postalcode]);

  useEffect(() => {
    if (!isChecked && !isDeliveryChecked) {
      if (addrPresentFlag && namePresentFlag) {
        dispatch(setIsCurrentLocEmpty(false));
      } else {
        dispatch(setIsCurrentLocEmpty(true));
      }
    }
  }, [addrPresentFlag, namePresentFlag]);

  const handlePhoneChange = (e) => {
    dispatch(setDelayContactPhone(formatPhoneNumber(e.target.value)));
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handlePhoneExtnChange = (e) => {
    dispatch(setDelayContactExtension(phoneExtension(numberValidation(e.target.value))));
    setExt(phoneExtension(numberValidation(e.target.value)));
  };

  const handleFaxChange = (e) => {
    dispatch(setDelayContactFAX(formatPhoneNumber(e.target.value)));
    setFax(formatPhoneNumber(e.target.value));
  };

  const handleContactPhone = (e) => {
    dispatch(setLocationPhone(formatPhoneNumber(e.target.value)));
  };

  /**
   *  Delay Fetch Driver function
   **/
  const getDriver = () => {
    let dispatchFk = null;
    let sisterunitfk = null;
    if (rowData?.dispatchPK) {
      dispatchFk = rowData?.dispatchPK;
      sisterunitfk = rowData?.unitFK;
    } else {
      dispatchFk = 0;
      sisterunitfk = 0;
    }
    DelayProcessingService.getUnitDriverName(companyName, driverfk, dispatchFk, sisterunitfk)
      .then((response) => {
        if (response?.data != null) {
          setDriverName(response?.data);
        } else {
          setDriverName(rowData.transportCompany);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTransportCompanyName = () => {
    DelayProcessingService.getTransportCompanyName(companyName, rowData.transportCompany)
      .then((response) => {
        setDriverName(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   *  Delay Fetch Unit Last Location function
   **/
  const getLastLocation = () => {
    DelayProcessingService.getUnitLastLocation(companyName, unitfk)
      .then((response) => {
        const lastLocation = response?.data?.replace(/null/g, "")?.split(",");
        setlastLocation(lastLocation);
        setContact(lastLocation[7]);
        dispatch(setLocationContact(contact));
        dispatch(setLocationPhone(lastLocation[8]));
        dispatch(setWorkingUnitLocationFK(lastLocation[6]));
        setPostalCode(!lastLocation[5]?.trim() ? "" : lastLocation[5]?.trim());
        setCity(!lastLocation[1]?.trim() ? "" : lastLocation[1]?.trim());
        setStateCode(!lastLocation[2]?.trim() ? "" : lastLocation[2]?.trim());
        setPostalCodePK(lastLocation[9]?.trim() ? lastLocation[9]?.trim() : null);

        const lastLocationForm = {
          name: lastLocation[0]?.trim(),
          address1: lastLocation[3]?.trim(),
          address2: lastLocation[4]?.trim(),
          city: !lastLocation[1]?.trim() ? "" : lastLocation[1]?.trim(),
          stateCode: !lastLocation[2]?.trim() ? "" : lastLocation[2]?.trim(),
          postalCode: !lastLocation[5]?.trim() ? "" : lastLocation[5]?.trim(),
        };
        dispatch(setCurrentLocation(lastLocationForm));

        setChecked(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   *   Fetch list of delay code for new delay
   **/
  const getListofDelayCodes = () => {
    DelayProcessingService.getListofDelayCodes(companyName)
      .then((response) => {
        const delayCodeList = response?.data;
        setDelayCodeList(delayCodeList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   *   Fetch Delivery Location for new delay
   **/
  const getDeliveryLocation = () => {
    DelayProcessingService.getDeliveryLocationDetails(
      companyName,
      rowData.deliveryCustomerPlantIntFK,
      rowData.deliveryYardFK,
      rowData.deliveryUnitAddrFK,
      rowData.delDealerFK
    )
      .then((response) => {
        const deliveryAddr = response?.data;
        const addrArray = deliveryAddr?.split(",");
        setDeliveryAddrArray(deliveryAddr?.split(","));
        dispatch(setWorkingUnitLocationFK(null));
        const deliveryForm = {
          name: addrArray[0],
          address1: addrArray[1],
          address2: addrArray[2],
          city: addrArray[3],
          stateCode: addrArray[4],
          postalCode: addrArray[5],
          plantfk: rowData.deliveryCustomerPlantIntFK,
          yardfk: rowData.deliveryYardFK,
          unitAddressfk: rowData.deliveryUnitAddrFK,
          dealerfk: rowData.delDealerFK,
          unitDriveByFK: rowData.UnitDriveByPK,
        };
        dispatch(setLocationPhone(""));
        dispatch(setCurrentLocation(deliveryForm));
        setPostalCode(response?.data?.split(",")[5]?.trim());
        setCity(response?.data?.split(",")[3]?.trim());
        setStateCode(response?.data?.split(",")[4]?.trim());
        setPostalCodePK(response?.data?.split(",")[6]?.trim());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**Validation city,state,zip */
  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
  });

  const shouldHideButton = (keyword) => pathname?.includes(keyword);

  const handleCheckboxChange = (event) => {
    dispatch(setDelayUnitLocationFK(lastLocation[6]));
    dispatch(setIsPostal(!event.target.checked));

    if (event.target.checked) {
      dispatch(setIsCurrentLocEmpty(false));
      getLastLocation();
      dispatch(setLocationPhone(lastLocation[8]));
    } else {
      setPostalCode("");
      setCity("");
      setStateCode("");
      setPostalCodePK("");
      dispatch(setIsCurrentLocEmpty(true));
      dispatch(setLocationPhone(null));
    }
    dispatch(setCurrentLocation(initialForm));
    setCurrentLoc(initialForm);
    setChecked(event.target.checked);
    setDeliveryChecked(false);
  };

  const getCustomerDelayInfo = () => {
    DelayProcessingService.getCustomerDelayInfo(companyName, rowData?.customerIntFK)
      .then((response) => {
        const delayContactList = response?.data;
        dispatch(setDelayContact(delayContactList?.delayContact));
        dispatch(setDelayContactPhone(delayContactList?.delayPhone));
        dispatch(setDelayContactExtension(delayContactList?.delayPhoneExtension));
        dispatch(setDelayContactFAX(delayContactList?.delayFAXNumber));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (postalcode?.length === 0) {
      dispatch(setDealerCity(""));
      dispatch(setDealerPostcode(""));
      dispatch(setDealerStatecode(""));
    }
    dispatch(setDealerPostcode(postalcode));
  }, [postalcode]);

  useEffect(() => {
    if (postalCodePK) {
      dispatch(setIsPostal(true));
    } else {
      dispatch(setIsPostal(false));
    }
  }, [postalcode, city, statecode, postalCodePK]);

  useEffect(() => {
    if (!viewOnly) {
      dispatch(setDelayedUnitCodeInput(rowData?.delayedUnitCode?.description?.trim()));
      dispatch(setDelayedUnitCodeID(rowData?.delayedUnitCode?.delayedUnitCodePK));
      dispatch(setDelayedUnitCodeFK(rowData?.delayedUnitCode?.delayedUnitCodePK));
    } else {
      dispatch(setDelayedUnitCodeInput(""));
      dispatch(setDelayedUnitCodeID(""));
      dispatch(setDelayedUnitCodeFK(""));
    }
  }, [viewOnly]);

  useEffect(() => {
    if (rowData?.delayContactPhone !== null) {
      dispatch(setDelayContactPhone(rowData?.delayContactPhone));
      setPhone(rowData?.delayContactPhone);
    }
    if (rowData?.reported) {
      setSelectedReportDate(rowData?.reported?.slice(0, 10));
    }

    if (rowData?.delayDate) {
      setSelectedDelayDate(formatDatetimeToDate(rowData?.delayDate?.slice(0, 10)));
    }

    if (rowData?.delayDate?.substring(11, 19)) {
      setSelectedDelayTime(rowData?.delayDate?.substring(11, 19));
    }

    if (rowData?.reported?.substring(11, 19)) {
      setSelectedReportTime(rowData?.reported?.substring(11, 19));
    }
    if (rowData?.delayContactFAX !== null) {
      dispatch(setDelayContactFAX(rowData?.delayContactFAX));
      setFax(rowData?.delayContactFAX);
    }
    if (rowData?.delayContactExtension !== null) {
      dispatch(setDelayContactExtension(rowData?.delayContactExtension));
    } else {
      dispatch(setDelayContactExtension(null));
    }

    if (rowData?.delayContact !== null) {
      dispatch(setDelayContact(rowData?.delayContact?.trim()));
    }

    if (pathname?.includes("unit-details")) {
      setSelectedDelayDate(formatForApi(new Date()));
      setSelectedReportDate(formatForApi(new Date()));
      setSelectedDelayTime(convertTo12Hour(localTime, "delayed"));
      setSelectedReportTime(convertTo12Hour(localTime, "reported"));
      dispatch(setDelayDate(formatForApi(new Date()) + "T" + localTime));
      dispatch(setReported(formatForApi(new Date()) + "T" + localTime));
      dispatch(setViewOnly(false));
      const pickup = rowData?.pickupByCityState?.split(",");
      setPickupArray(pickup);
      const delivery = rowData?.deliveryByCityState?.split(",");
      setDeliveryArray(delivery);

      getLastLocation();
      getCustomerDelayInfo();
    }
    if (pathname?.includes("delayed-details")) {
      dispatch(setViewOnly(true));
      const pickup = rowData?.unit?.pickupByCityState?.split(",");
      setPickupArray(pickup);
      const delivery = rowData?.unit?.deliveryByCityState?.split(",");
      setDeliveryArray(delivery);
      getListofDelayCodes();
      if (rowData?.workingUnitLocationDetails?.postalCode) {
        setPostalCode(rowData?.workingUnitLocationDetails?.postalCode?.trim());
      }

      if (rowData?.workingUnitLocationDetails?.city) {
        setCity(rowData?.workingUnitLocationDetails?.city?.trim());
      }

      if (rowData?.workingUnitLocationDetails?.stateCode) {
        setStateCode(rowData?.workingUnitLocationDetails?.stateCode?.trim());
      }
    }

    if (rowData?.driverFK == null && rowData?.transportCompany != null) {
      getTransportCompanyName();
    } else if (
      (rowData?.driverFK != null && rowData?.transportCompany == null) ||
      rowData?.postedTo === true
    ) {
      getDriver();
    }
  }, [rowData]);

  useEffect(() => {
    if (rowData?.reported && viewOnly) {
      setSelectedReportDate(rowData?.reported?.slice(0, 10));
      setSelectedReportDateInput(formatDate(rowData?.delayDate?.slice(0, 10)));
      setIsSelectedReportDateValid(true);
      setSelectedReportTime(convertTo12Hour(rowData?.reported?.substring(11, 19), "reported"));
    }

    if (rowData?.delayDate && viewOnly) {
      setSelectedDelayDate(rowData?.delayDate?.slice(0, 10));
      setSelectedDelayDateInput(formatDate(rowData?.delayDate?.slice(0, 10)));
      setIsSelectedDelayDateValid(true);
      setSelectedDelayTime(convertTo12Hour(rowData?.delayDate?.substring(11, 19), "delayed"));
    }

    if (viewOnly) {
      setPhone(rowData?.delayContactPhone);
      setExt(rowData?.delayContactExtension);
      setFax(rowData?.delayContactFAX);
    }
  }, [delayDate, reportedDate, viewOnly]);

  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setShowLookup(false);
    dispatch(setDelayedUnitCodeInput(delayUnitCode.description?.trim()));
    dispatch(setDelayedUnitCodeID(delayUnitCode.delayedUnitCodePK));
    dispatch(setDelayedUnitCodeFK(delayUnitCode.delayedUnitCodePK));
  };

  const handleLookup = () => {
    setShowLookup(true);
  };

  const fetchDelayedUnitCode = (string) => {
    DelayProcessingService.getDelayUnitCodesForAutoComplete(string, companyName).then((response) => {
      const data = response?.data?.content;
      const delayUnitCodeList = data?.map((codeList) => ({
        ...codeList,
        description: codeList.description?.trim(),
      }));
      setDelayUnitCodeArray(delayUnitCodeList);
    });
  };

  const convertTo12Hour = (time24, date) => {
    const [hours, minutes] = time24?.split(":")?.map(Number) || [];
    const suffix = hours >= 12 ? "PM" : "AM";
    if (date === "delayed") {
      setDelayPeriod(suffix);
    }
    if (date === "reported") {
      setReportPeriod(suffix);
    }
    const hours12 = hours % 12 || 12;
    return `${hours12 < 10 ? "0" + hours12 : hours12}:${String(minutes).padStart(2, "0")}`;
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
    const [hour, minute] = time?.split(":")?.map(Number) || [];
    let convertedHour = hour % 12;
    if (period === "PM") {
      if (hour === 12) {
        convertedHour = 12;
      } else {
        convertedHour += 12;
      }
    } else if (period === "AM" && hour === 12) {
      convertedHour = 0;
    }

    const formattedDate =
      selectedDelayDate +
      "T" +
      `${convertedHour < 10 ? "0" + convertedHour : convertedHour}:${minute < 10 ? "0" + minute : minute}:00`;

    dispatch(setDelayDate(formattedDate));
  };

  const updateReportedDateTime = (time, period) => {
    const [hour, minute] = time?.split(":")?.map(Number) || [];
    let convertedHour = hour % 12;
    if (period === "PM") {
      if (hour === 12) {
        convertedHour = 12;
      } else {
        convertedHour += 12;
      }
    } else if (period === "AM" && hour === 12) {
      convertedHour = 0;
    }

    const formattedDate =
      selectedReportDate +
      "T" +
      `${convertedHour < 10 ? "0" + convertedHour : convertedHour}:${minute < 10 ? "0" + minute : minute}:00`;

    dispatch(setReported(formattedDate));
  };

  useEffect(() => {
    dispatch(setSendNotificationEmails(sendNotificationEmail));
  }, [sendNotificationEmail]);

  useEffect(() => {
    dispatch(setSendUpdateEmails(sendUpdateOfNotificationEmail));
  }, [sendUpdateOfNotificationEmail]);

  /** used to get delay new tabs**/
  const getNewDelayDetails = () => {
    DelayProcessingService.fetchNewDelayDetails(unitfk, "general")
      .then((response) => {
        const data = response?.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNewDelayDetails();
  }, [unitfk]);

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
          <div
            className={viewOnly ? "p-15 w-100 disableInputElements" : "p-15 w-100"}
            onClick={handleMouseEventMain}
            onFocus={handleMouseEventMain}
          >
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
                      value={
                        rowData?.delayedUnitDriverDetails
                          ? rowData?.delayedUnitDriverDetails.firstName?.trim()
                          : driverName
                      }
                      name="driverName"
                      maxLength={30}
                      disabled={viewOnly === false ? true : false}
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

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("unit-details")}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Driver Released</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="outbound"
                      name="outbound"
                      value={rowData?.driverReleased}
                      checked={rowData?.driverReleased}
                      disabled={viewOnly === false ? true : false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="form-group mt-2 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0"
                  hidden={shouldHideButton("unit-details")}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Driver Release Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField date={rowData?.driverReleaseDate} disabled />
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
                      value={rowData?.unit ? rowData?.unit.unitNumber?.trim() : rowData?.unitNumber?.trim()}
                      id="description"
                      name="description"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewOnly === false ? true : false}
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
                      value={rowData?.unit ? rowData?.unit.model?.trim() : rowData?.model?.trim()}
                      id="model"
                      name="model"
                      maxLength={30}
                      // value={}
                      disabled={viewOnly === false ? true : false}
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
                      value={rowData?.unit ? rowData?.unit.vin?.trim() : rowData?.vin?.trim()}
                      id="vin"
                      name="vin"
                      maxLength={30}
                      disabled={viewOnly === false ? true : false}
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
                      value={
                        rowData?.unit
                          ? rowData?.unit.unitType.descriptionShort?.trim()
                          : rowData?.unitType?.trim()
                      }
                      id="untType"
                      name="unitType"
                      maxLength={30}
                      disabled={viewOnly === false ? true : false}
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
                      value={
                        rowData?.unit
                          ? rowData?.unit.specialCodeDescription?.trim()
                          : rowData?.specialCode?.trim()
                      }
                      id="specialCode"
                      name="specialCode"
                      maxLength={30}
                      disabled={viewOnly === false ? true : false}
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
                        !isSelectedDelayDateValid || !selectedDelayDate
                          ? "borderRed"
                          : viewOnly
                            ? { border: "black 1px solid" }
                            : "borderGreen"
                      }
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      className={`customFormControl  ${
                        isNaN(parseLocalDate(delayDate).getTime())
                          ? "borderRed"
                          : viewOnly
                            ? { border: "black 1px solid" }
                            : "borderGreen"
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
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      <input
                        type="radio"
                        name="delayAMtimePeriod"
                        value="AM"
                        checked={delayPeriod === "AM"}
                        onClick={(e) => {
                          if (viewOnly) {
                            e.preventDefault();
                            return;
                          }
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
                        name="delayPMtimePeriod"
                        value="PM"
                        checked={delayPeriod === "PM"}
                        onClick={(e) => {
                          if (viewOnly) {
                            e.preventDefault();
                            return;
                          }
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
                  <Col sm={3} md={3} xs={3} className="p-0">
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
                        !isSelectedReportDateValid || !selectedReportDate
                          ? "borderRed"
                          : viewOnly
                            ? { border: "black 1px solid" }
                            : "borderGreen"
                      }
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      className={`customFormControl  ${
                        isNaN(parseLocalDate(reportedDate).getTime())
                          ? "borderRed"
                          : viewOnly
                            ? { border: "black 1px solid" }
                            : "borderGreen"
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
                    <Form.Label className="col-form-label dealer-label"> Delay Code</Form.Label>
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
                      arrayList={delayUnitCodeArray}
                      searchString={delayedUnitCodeInput}
                      renderItemId={(item) => item.delayedUnitCodePK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setDelayedUnitCodeInput(string))}
                      fetchDataBySearchString={fetchDelayedUnitCode}
                      onSelect={handleDelayUnitCodeLookup}
                      selectedId={delayedUnitCodeID}
                      clearInputCallback={() => {
                        setDelayedUnitCodeID("");
                        dispatch(setDelayedUnitCodeFK(null));
                      }}
                      hidden={shouldHideButton("delayed-details") && viewOnly}
                      style={`pointer:true`}
                      disabled={shouldHideButton("delayed-details") && viewOnly}
                      className={`customFormControl ${
                        delayedUnitCodeInput && delayedUnitCodeID && delayedUnitCode !== null
                          ? "borderGreen"
                          : "borderRed"
                      }`}
                      maxHeight="170px"
                    />
                    <LookupButton
                      onClick={handleLookup}
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

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("delayed-details")}
                >
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
                      onChange={(e) => {
                        setSendNotificationEmail(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={
                    (shouldHideButton("delayed-details") && viewOnly) || shouldHideButton("unit-details")
                  }
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Send Update Email</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="updateEmail"
                      name="updateEmail"
                      value={sendUpdateOfNotificationEmail}
                      checked={sendUpdateOfNotificationEmail}
                      onChange={(e) => {
                        setSendUpdateOfNotificationEmail(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("unit-details") || !viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Delay</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="delay"
                      name="delay"
                      value={rowData?.delay}
                      checked={rowData?.delay}
                      onChange={(e) => {
                        setIsDelayChecked(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("unit-details") || !viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Breakdown</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="outbound"
                      name="outbound"
                      value={rowData?.breakdown}
                      checked={rowData?.breakdown}
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <Form.Label className="col-form-label dealer-label w-15px text-center">Active</Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="outbound"
                      name="outbound"
                      checked={
                        rowData?.breakdown &&
                        breakdownData &&
                        breakdownData?.some((item) => !item.repaired || !item.furtherRepairsRequired)
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("unit-details") || !viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Damage</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="outbound"
                      name="outbound"
                      value={rowData?.damage}
                      checked={rowData?.damage}
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <Form.Label className="col-form-label dealer-label w-15px text-center">Active</Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="outbound"
                      name="outbound"
                      checked={rowData?.damage && damageData ? damageData.status !== "C" : false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("unit-details") || !viewOnly}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Returned</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="outbound"
                      name="outbound"
                      checked={rowData?.returned}
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
                      value={
                        rowData?.unit ? rowData?.unit.pickupByName?.trim() : rowData?.pickupByName?.trim()
                      }
                      id="pickupName"
                      name="pickupName"
                      maxLength={30}
                      disabled={viewOnly === false ? true : false}
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
                      value={pickupArray ? (pickupArray[0] ? pickupArray[0]?.trim() : "") : ""}
                      id="pickupAddr1"
                      name="pickupAddr1"
                      maxLength={30}
                      disabled={viewOnly === false ? true : false}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <input
                      className="customFormControl"
                      name="pickupaddr2"
                      value={pickupArray ? (pickupArray[1] ? pickupArray[1]?.trim() : "") : ""}
                      maxLength={4}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewOnly === false ? true : false}
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
                      value={
                        rowData?.unit ? rowData?.unit.deliveryByName?.trim() : rowData?.deliveryByName?.trim()
                      }
                      id="delName"
                      name="delName"
                      maxLength={30}
                      disabled={viewOnly === false ? true : false}
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
                      value={deliveryArray ? (deliveryArray[0] ? deliveryArray[0]?.trim() : "") : ""}
                      id="deliveryName"
                      name="deliveryName"
                      maxLength={30}
                      disabled={viewOnly === false ? true : false}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <input
                      className="customFormControl"
                      name="deliveryAddr1"
                      value={deliveryArray ? (deliveryArray[1] ? deliveryArray[1]?.trim() : "") : ""}
                      maxLength={4}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewOnly === false ? true : false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("delayed-details")}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">At Last Location</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      className="form-check-input p-0 "
                      id="atlastLocation"
                      name="atlastLocation"
                      onClick={(e) => {
                        setCurrentLoc(initialForm);
                        setPostalCode("");
                        setCity("");
                        setStateCode("");
                        setPostalCodePK("");
                        handleCheckboxChange(e);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="form-group align-items-center row m-l-0 m-r-0 my-3"
                  hidden={shouldHideButton("delayed-details")}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Last Location</Form.Label>
                  </Col>
                  <Col xs={5} className="p-0">
                    <input
                      name="lastLocation"
                      id="lastLocation"
                      type="text"
                      value={lastLocation[0]?.trim()}
                      className={`customFormControl`}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewOnly === false ? true : false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="form-group align-items-center row m-l-0 m-r-0 my-3"
                  hidden={shouldHideButton("delayed-details")}
                >
                  <Col xs={3} className="p-0"></Col>
                  <Col xs={5} className="p-0">
                    <input
                      name="lastLocation2"
                      id="lastLocation2"
                      type="text"
                      value={lastLocation[1]?.trim()}
                      className={`customFormControl`}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewOnly === false ? true : false}
                    />
                  </Col>
                  <Col xs={1} className="w-60px">
                    <input
                      name="lastLocation3"
                      id="lastLocation3"
                      type="text"
                      value={lastLocation[2]?.trim()}
                      className={`customFormControl`}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewOnly === false ? true : false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("delayed-details")}
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
                      disabled={isChecked}
                      checked={isDeliveryChecked}
                      onChange={(e) => {
                        setDeliveryChecked(e.target.checked);
                        dispatch(setIsPostal(!e.target.checked));
                        dispatch(setIsCurrentLocEmpty(true));
                        setPostalCode("");
                        setCity("");
                        setStateCode("");
                        setPostalCodePK("");

                        if (!isDeliveryChecked) {
                          dispatch(setWorkingUnitLocationFK(null));
                          dispatch(setIsCurrentLocEmpty(false));
                          setCurrentLoc(initialForm);
                          getDeliveryLocation();
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
                      className={`customFormControl`}
                      value={
                        rowData?.workingUnitLocationDetails
                          ? rowData?.workingUnitLocationDetails.name?.trim()
                          : isChecked
                            ? !lastLocation[0]?.trim()
                              ? ""
                              : lastLocation[0]?.trim()
                            : isDeliveryChecked
                              ? deliveryAddrArray[0]?.trim()
                              : currentLoc.name?.trim()
                      }
                      id="name"
                      name="name"
                      maxLength={30}
                      disabled={(isDeliveryChecked && !viewOnly) || isEditable || (!viewOnly && isChecked)}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        handleAddressChange(e);
                      }}
                      style={
                        !isDeliveryChecked && !isChecked && currentLoc.name?.length === 0
                          ? {
                              border: "red 2px solid",
                            }
                          : isDeliveryChecked || isChecked
                            ? { border: "black 1px solid" }
                            : { border: "green 2px solid" }
                      }
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
                      value={
                        rowData?.workingUnitLocationDetails
                          ? rowData?.workingUnitLocationDetails.address1?.trim()
                          : isChecked
                            ? !lastLocation[3]?.trim()
                              ? ""
                              : lastLocation[3]?.trim()
                            : isDeliveryChecked
                              ? deliveryAddrArray[1]?.trim()
                              : currentLoc.address1?.trim()
                      }
                      id="ad1"
                      name="ad1"
                      maxLength={30}
                      disabled={(isDeliveryChecked && !viewOnly) || isEditable || (!viewOnly && isChecked)}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        handleAddressChange(e);
                      }}
                      style={
                        !isDeliveryChecked && !isChecked && currentLoc.address1?.length === 0
                          ? {
                              border: "red 2px solid",
                            }
                          : isDeliveryChecked || isChecked
                            ? { border: "black 1px solid" }
                            : { border: "green 2px solid" }
                      }
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
                      value={
                        rowData?.workingUnitLocationDetails
                          ? rowData?.workingUnitLocationDetails.address2?.trim()
                          : isChecked
                            ? !lastLocation[4]?.trim()
                              ? ""
                              : lastLocation[4]?.trim()
                            : isDeliveryChecked
                              ? deliveryAddrArray[2]?.trim()
                              : currentLoc.address2?.trim()
                      }
                      id="ad2"
                      name="ad2"
                      maxLength={30}
                      disabled={(isDeliveryChecked && !viewOnly) || isEditable || (!viewOnly && isChecked)}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        handleAddressChange(e);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <div style={{ marginTop: "-0.5rem" }}>
                  <PostalCodeComponent
                    disabled={viewOnly ? true : isDeliveryChecked || isEditable || isChecked}
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
                </div>

                <Form.Group
                  className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("delayed-details")}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Contact</Form.Label>
                  </Col>

                  <Col xs={8} md={7} sm={6} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="contact"
                      name="contact"
                      value={locationContact ? locationContact?.trim() : contact?.trim()}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        dispatch(setLocationContact(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("delayed-details")}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Phone</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="phone"
                      name="phone"
                      value={locationPhone ? locationPhone : ""}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        handleContactPhone(e);
                      }}
                      style={
                        !viewOnly
                          ? {
                              border:
                                formatPhoneNumber(locationPhone)?.length === 14
                                  ? "green 2px solid"
                                  : "red 2px solid",
                              width: "100px",
                            }
                          : { border: "black 1px solid", width: "100px" }
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("unit-details") || rowData?.delay === false}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Delay Contact</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={delayContact}
                      id="delayContact"
                      name="delayContact"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        dispatch(setDelayContact(e.target.value));
                        if (delayContact == null) {
                          dispatch(setDelayContact(" "));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("unit-details") || rowData?.delay === false}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Delay Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={
                        delayContactPhone
                          ? formatPhoneNumber(delayContactPhone)
                          : phone
                            ? formatPhoneNumber(phone?.trim()) || ""
                            : ""
                      }
                      id="delayContactPhone"
                      name="delayContactPhone"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        handlePhoneChange(e);
                      }}
                      style={
                        !viewOnly
                          ? {
                              border:
                                formatPhoneNumber(delayContactPhone)?.length === 14
                                  ? "green 2px solid"
                                  : "red 2px solid",
                            }
                          : { border: "black 1px solid" }
                      }
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0" style={{ width: "11%" }}>
                    <input
                      className={`${"customFormControl"} ${
                        !viewOnly && delayContactExtension?.trim()?.length !== 4
                          ? !delayContactExtension || delayContactExtension?.length < 4
                            ? "borderRed"
                            : delayContactExtension?.trim()?.length === 4
                              ? "borderGreen"
                              : "borderRed"
                          : viewOnly
                            ? { border: "black 1px solid" }
                            : "borderGreen"
                      }`}
                      name="extn"
                      value={
                        delayContactExtension
                          ? phoneExtension(numberValidation(delayContactExtension?.trim()))
                          : ext
                            ? ext?.trim() || ""
                            : ""
                      }
                      maxLength={4}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        handlePhoneExtnChange(e);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 "
                  hidden={shouldHideButton("unit-details") || rowData?.delay === false}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Customer Delay FAX</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="delayFax"
                      name="delayFax"
                      maxLength={30}
                      value={delayContactFAX ? delayContactFAX : fax ? fax?.trim() || "" : ""}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      onChange={(e) => {
                        handleFaxChange(e);
                      }}
                      style={
                        !viewOnly
                          ? {
                              border:
                                formatPhoneNumber(delayContactFAX)?.length === 14
                                  ? "green 2px solid"
                                  : "red 2px solid",
                            }
                          : { border: "black 1px solid" }
                      }
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
              status={"delay"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default General;
