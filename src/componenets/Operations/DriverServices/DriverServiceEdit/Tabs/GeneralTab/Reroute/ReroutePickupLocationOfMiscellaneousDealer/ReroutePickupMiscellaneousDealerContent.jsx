import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import styles from "../../../../../../../../styles/QuarterScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MiscDealerLookup from "../../../../../../../LookupScreens/MiscDealer/MiscDealerLookup";
import RerouteService from "../../../../../../../../services/RerouteService";
import * as yup from "yup";
import { emailRegex } from "../../../../../../../../utils/validation/EmailRegex";
import {
  setDriverFlatrate,
  setDriverMiles,
  setHasChangedPickupMiscDealerStateCode,
  setInvoiceFlatrate,
  setInvoiceMiles,
  setIsDriverFlatrateVisible,
  setIsInvoiceFlatrateVisible,
  setIsMiscPickupDealerValid,
  setMiscPickupID,
  setSelectedNewPickupMiscellneousDealerData,
  setUpdatedPickupMiscDealerData,
} from "../../../../../../../../redux/RerouteSlice";

import { Formik } from "formik";
import PostalCodeComponent from "../../../../../../../common/PostalCodeComponent";
import { formatPhoneNumber } from "../../../../../../../../utils/validation/Phonevalidation";
import LoadingIcon from "../../../../../../../common/LoadingIcon";
import {
  resetSearchSettings,
  setPageNumber,
  setSelectedId,
} from "../../../../../../../../redux/LookupScreens/MiscDealerLookupSlice";

function ReroutePickupMiscellaneousDealerContent() {
  const dispatch = useDispatch();
  const [dealerName, setDealerName] = useState("");
  const [dealerAddress1, setDealerAddress1] = useState("");
  const [dealerAddress2, setDealerAddress2] = useState("");
  const [dealerCity, setDealerCity] = useState("");
  const [dealerStateCode, setDealerStateCode] = useState("");
  const [dealerPostalCode, setDealerPostalCode] = useState("");
  const [dealerPhone, setDealerPhone] = useState("");
  const [dealerContact, setDealerContact] = useState("");
  const [dealerContactPhone, setDealerContactPhone] = useState("");
  const [dealerEmail, setDealerEmail] = useState("");
  const [openSunday, setOpenSunday] = useState(false);
  const [openMonday, setOpenMonday] = useState(false);
  const [openTuesday, setOpenTuesday] = useState(false);
  const [openWednesday, setOpenWednesday] = useState(false);
  const [openThursday, setOpenThursday] = useState(false);
  const [openFriday, setOpenFriday] = useState(false);
  const [openSaturday, setOpenSaturday] = useState(false);
  const [hours, setHours] = useState("");
  const [driverEmailDirections, setDriverEmailDirections] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [canadian, setCanadian] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);

  const pickupMiscellaneousDealerFK = useSelector(
    (state) => state.rerouteReducer.pickupMiscellaneousDealerFK
  );
  const pickUpMiscellaneousDealerData = useSelector((state) => state.rerouteReducer.miscellaneousDealerData);
  const selectedNewPickupMiscellneousDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewPickupMiscellneousDealerData
  );
  const miscPickupID = useSelector((state) => state.rerouteReducer.miscPickupID);
  const companyId = useSelector((state) => state.rerouteReducer.companyId);
  const updatedPickupMiscDealerData = useSelector(
    (state) => state.rerouteReducer.updatedPickupMiscDealerData
  );
  const selectedUnitInfo = useSelector((state) => state.rerouteReducer.selectedUnitInfo);

  //Local State Declaration
  const [miscellaneousDealerLookupShow, setMiscellaneousDealerLookupShow] = useState(false);
  const [selectedMiscDealer, setSelectedMiscDealer] = useState(false);
  const handleMiscDealerSelection = (miscDealer) => {
    if (Number(miscPickupID) !== Number(miscDealer.unitAddressPK)) {
      dispatch(setInvoiceFlatrate(0));
      dispatch(setDriverFlatrate(0));
    }
    dispatch(setInvoiceMiles(0));
    dispatch(setDriverMiles(0));
    dispatch(setMiscPickupID(miscDealer.unitAddressPK));
    setSelectedMiscDealer(true);
    setMiscellaneousDealerLookupShow(false);
    fetchMiscellaneousDealerById(miscPickupID, companyId);
  };

  //Get Miscellaneous Dealer By Id
  const fetchMiscellaneousDealerById = (id, companyId) => {
    if (id && id !== pickupMiscellaneousDealerFK) {
      setLoading(true);
      RerouteService.fetchMiscellaneousDealerById(id, companyId)
        .then((response) => {
          const data = response.data;
          dispatch(setSelectedNewPickupMiscellneousDealerData(data[0]));
          setHours(data[0]?.Hours?.trim() || "");
          setDealerName(data[0].Name?.trim() || "");
          setDealerAddress1(data[0].Address1?.trim() || "");
          setDealerAddress2(data[0].Address2?.trim() || "");
          setDealerCity(data[0].City?.trim() || "");
          setDealerStateCode(data[0].StateCode?.trim() || "");
          setDealerPostalCode(data[0].PostalCode?.trim() || "");
          setCanadian(data[0].Canadian);
          setDealerPhone(data[0].Phone ? formatPhoneNumber(data[0].Phone?.trim()) : "");
          setDealerEmail(data[0].Email?.trim() || "");
          setDealerContact(data[0].DeliveryContact?.trim() || "");

          setDealerContactPhone(
            data[0].DeliveryContactPhone ? formatPhoneNumber(data[0].DeliveryContactPhone?.trim()) : ""
          );
          setOpenSunday(data[0].OpenSunday || false);
          setOpenMonday(data[0].OpenMonday || false);
          setOpenTuesday(data[0].OpenTuesday || false);
          setOpenWednesday(data[0].OpenWednesday || false);
          setOpenThursday(data[0].OpenThursday || false);
          setOpenFriday(data[0].OpenFriday || false);
          setOpenSaturday(data[0].OpenSaturday || false);
          setDriverEmailDirections(data[0].Directions?.trim() || "");
          setPostalCodePK(data[0]?.PostalCodePK);
        })
        .catch((error) => {})
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (
      selectedUnitInfo?.pickupUnitAddressFK &&
      updatedPickupMiscDealerData &&
      selectedUnitInfo?.pickupStateCode?.trim() !== dealerStateCode?.trim()
    ) {
      dispatch(setInvoiceMiles(0));
      dispatch(setDriverMiles(0));
      dispatch(setHasChangedPickupMiscDealerStateCode(true));
    } else {
      dispatch(setHasChangedPickupMiscDealerStateCode(false));
    }
  }, [dealerStateCode]);

  //Useeffect - service to get miscellaneous dealer by id
  useEffect(() => {
    if (miscPickupID && (!updatedPickupMiscDealerData || selectedMiscDealer)) {
      fetchMiscellaneousDealerById(miscPickupID, companyId);
    }
  }, [miscPickupID]);

  useEffect(() => {
    if (!updatedPickupMiscDealerData) {
      setHours(pickUpMiscellaneousDealerData?.Hours?.trim() || "");
      setDealerName(pickUpMiscellaneousDealerData?.Name?.trim() || "");
      setDealerAddress1(pickUpMiscellaneousDealerData?.Address1?.trim() || "");
      setDealerAddress2(pickUpMiscellaneousDealerData?.Address2?.trim() || "");
      setDealerCity(pickUpMiscellaneousDealerData?.City?.trim() || "");
      setDealerStateCode(pickUpMiscellaneousDealerData?.StateCode?.trim() || "");
      setDealerPostalCode(pickUpMiscellaneousDealerData?.PostalCode?.trim() || "");
      setCanadian(pickUpMiscellaneousDealerData?.Canadian);
      setDealerPhone(formatPhoneNumber(pickUpMiscellaneousDealerData?.Phone?.trim()) || "");
      setDealerEmail(pickUpMiscellaneousDealerData?.Email?.trim() || "");
      setDealerContact(pickUpMiscellaneousDealerData?.DeliveryContact?.trim() || "");

      setDealerContactPhone(
        formatPhoneNumber(pickUpMiscellaneousDealerData?.DeliveryContactPhone?.trim()) || ""
      );
      setOpenSunday(pickUpMiscellaneousDealerData?.OpenSunday || false);
      setOpenMonday(pickUpMiscellaneousDealerData?.OpenMonday || false);
      setOpenTuesday(pickUpMiscellaneousDealerData?.OpenTuesday || false);
      setOpenWednesday(pickUpMiscellaneousDealerData?.OpenWednesday || false);
      setOpenThursday(pickUpMiscellaneousDealerData?.OpenThursday || false);
      setOpenFriday(pickUpMiscellaneousDealerData?.OpenFriday || false);
      setOpenSaturday(pickUpMiscellaneousDealerData?.OpenSaturday || false);
      setDriverEmailDirections(pickUpMiscellaneousDealerData?.Directions?.trim() || "");
      setPostalCodePK(pickUpMiscellaneousDealerData?.PostalCodePK);
    } else {
      setHours(updatedPickupMiscDealerData?.hours?.trim() || "");
      setDealerName(updatedPickupMiscDealerData?.name?.trim() || "");
      setDealerAddress1(updatedPickupMiscDealerData?.address1?.trim() || "");
      setDealerAddress2(updatedPickupMiscDealerData?.address2?.trim() || "");
      setDealerCity(updatedPickupMiscDealerData?.city?.trim() || "");
      setDealerStateCode(updatedPickupMiscDealerData?.stateCode?.trim() || "");
      setDealerPostalCode(updatedPickupMiscDealerData?.postalCode?.trim() || "");
      setCanadian(updatedPickupMiscDealerData?.canadian);
      setDealerPhone(formatPhoneNumber(updatedPickupMiscDealerData?.phone?.trim()) || "");
      setDealerEmail(updatedPickupMiscDealerData?.email?.trim() || "");
      setDealerContact(updatedPickupMiscDealerData?.deliveryContact?.trim() || "");

      setDealerContactPhone(
        formatPhoneNumber(updatedPickupMiscDealerData?.deliveryContactPhone?.trim()) || ""
      );
      setOpenSunday(updatedPickupMiscDealerData?.openSunday || false);
      setOpenMonday(updatedPickupMiscDealerData?.openMonday || false);
      setOpenTuesday(updatedPickupMiscDealerData?.openTuesday || false);
      setOpenWednesday(updatedPickupMiscDealerData?.openWednesday || false);
      setOpenThursday(updatedPickupMiscDealerData?.openThursday || false);
      setOpenFriday(updatedPickupMiscDealerData?.openFriday || false);
      setOpenSaturday(updatedPickupMiscDealerData?.openSaturday || false);
      setDriverEmailDirections(updatedPickupMiscDealerData?.directions?.trim() || "");
      setPostalCodePK(updatedPickupMiscDealerData?.postalCodePK);
    }
  }, []);

  useEffect(() => {
    if (
      dealerName &&
      dealerAddress1 &&
      postalCodePK &&
      dealerPhone &&
      dealerPhone?.length === 14 &&
      (!dealerEmail || dealerEmail?.match(emailRegex)) &&
      dealerContact &&
      dealerContactPhone &&
      dealerContactPhone?.length === 14 &&
      (openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday)
    ) {
      dispatch(setIsMiscPickupDealerValid(true));
    } else {
      dispatch(setIsMiscPickupDealerValid(false));
    }
  }, [
    dealerName,
    dealerAddress1,
    postalCodePK,
    dealerPhone,
    dealerEmail,
    dealerContact,
    dealerContactPhone,
    openSunday,
    openMonday,
    openTuesday,
    openWednesday,
    openThursday,
    openFriday,
    openSaturday,
  ]);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    contact: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    email: yup.string().matches(emailRegex),

    contactPhone: yup.string().matches(phoneRegex).required(),
  });
  useEffect(() => {
    if (
      dealerName ||
      dealerAddress1 ||
      dealerAddress2 ||
      dealerCity ||
      dealerStateCode ||
      dealerPostalCode ||
      dealerPhone ||
      dealerEmail ||
      dealerContact ||
      dealerContactPhone ||
      openSunday ||
      openMonday ||
      openTuesday ||
      openWednesday ||
      openThursday ||
      openFriday ||
      openSaturday ||
      postalCodePK
    ) {
      let updatedMiscPickupDealerData = {
        name: dealerName,
        address1: dealerAddress1,
        address2: dealerAddress2,
        city: dealerCity,
        stateCode: dealerStateCode,
        postalCode: dealerPostalCode,
        phone: dealerPhone,
        email: dealerEmail,
        deliveryContact: dealerContact,
        deliveryContactPhone: dealerContactPhone,
        openSunday: openSunday,
        openMonday: openMonday,
        openTuesday: openTuesday,
        openWednesday: openWednesday,
        openThursday: openThursday,
        openFriday: openFriday,
        openSaturday: openSaturday,
        postalCodePK: postalCodePK,
        canadian: canadian,
        hours: hours,
        directions: driverEmailDirections,
      };
      dispatch(setUpdatedPickupMiscDealerData(updatedMiscPickupDealerData));
    }
  }, [
    dealerName,
    dealerAddress1,
    dealerAddress2,
    dealerCity,
    dealerStateCode,
    dealerPostalCode,
    dealerPhone,
    dealerEmail,
    dealerContact,
    dealerContactPhone,
    openSaturday,
    openSunday,
    openMonday,
    openTuesday,
    openWednesday,
    openThursday,
    openFriday,
    postalCodePK,
    canadian,
    hours,
    driverEmailDirections,
  ]);

  useEffect(() => {
    if (!isInitialized) {
      if (!updatedPickupMiscDealerData) {
        setDealerContact(pickUpMiscellaneousDealerData?.DeliveryContact?.trim() || "");
        setDealerContactPhone(
          formatPhoneNumber(pickUpMiscellaneousDealerData?.DeliveryContactPhone?.trim()) || ""
        );
      } else {
        setDealerContact(updatedPickupMiscDealerData?.deliveryContact?.trim() || "");
        setDealerContactPhone(
          formatPhoneNumber(updatedPickupMiscDealerData?.deliveryContactPhone?.trim()) || ""
        );
      }
      setIsInitialized(true);
    }
  }, [updatedPickupMiscDealerData, pickUpMiscellaneousDealerData, isInitialized]);

  return (
    <Formik
      initialValues={{
        name: dealerName,
        address1: dealerAddress1,
        city: dealerCity,
        stateCode: dealerStateCode,
        postalCode: dealerPostalCode,
        contact: dealerContact,
        phone: dealerPhone,
        contactPhone: dealerContactPhone,
        email: dealerEmail,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        name: true,
        address1: true,
        city: true,
        statecode: true,
        postalcode: true,
        contact: true,
        phone: true,
        contactPhone: true,
        email: true,
      }}
    >
      {(formik) => (
        <div className="p-2 ">
          {loading && <LoadingIcon />}
          <div className=" shadow-sm rounded border fullScreenFormContentHeight">
            <Row className="ps-2 ">
              <Col xs={6} md={6} sm={6}>
                <p className="mt-2">Miscellaneous Pickup Dealer</p>

                <div className="p-l-25">
                  {/* Miscellaneous Pickup Dealer */}
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0 " style={{ marginLeft: "8px" }}>
                      <Form.Label className="col-form-label dealer-label "></Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 mt-1 w-200" /* style={{ width: '170px' }} */>
                      <button
                        className={`customFormControl ${styles.orderLabel}`}
                        name="miscCustomerSelection"
                        id="miscCustomerSelection"
                        style={{ background: "#e9ecef" }}
                        onClick={() => {
                          dispatch(setPageNumber(0));
                          dispatch(resetSearchSettings());
                          setMiscellaneousDealerLookupShow(true);
                          dispatch(setSelectedId(""));
                        }}
                      >
                        Miscellaneous Dealer Selection
                      </button>
                    </Col>
                  </Form.Group>
                  {/* Name */}
                  <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Name</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0 mt-1">
                      <input style={{ display: "none" }} autoComplete="off" />
                      <input
                        className={`customFormControl ${dealerName ? "borderGreen" : "borderRed"} `}
                        name="name_1"
                        type="text"
                        onChange={(e) => {
                          setDealerName(e.target.value);
                        }}
                        value={dealerName}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        maxLength={30}
                      />
                    </Col>
                  </Form.Group>
                  {/* Address1 */}
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Address </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0 mt-1">
                      <input
                        className={`customFormControl ${
                          formik.errors.address1 === undefined && dealerAddress1.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                        }`}
                        name="ad1"
                        type="text"
                        onChange={(e) => {
                          setDealerAddress1(e.target.value);
                        }}
                        value={dealerAddress1}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        maxLength={30}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>
                  {/* Address1 */}
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0"></Col>
                    <Col xs={6} md={6} sm={6} className="p-0 mt-1" /* style={{ width: '275px' }} */>
                      <input
                        className="customFormControl"
                        name="ad2"
                        type="text"
                        onChange={(e) => {
                          setDealerAddress2(e.target.value);
                        }}
                        value={dealerAddress2}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        maxLength={30}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>

                  <PostalCodeComponent
                    stateInputWidth={"55px"}
                    zipInputWidth={"118px"}
                    cityInputWidth={"250px"}
                    city={dealerCity}
                    setCity={setDealerCity}
                    stateCode={dealerStateCode}
                    setStateCode={setDealerStateCode}
                    postalCode={dealerPostalCode}
                    setPostalCode={setDealerPostalCode}
                    setPostalValues={setPostalValues}
                    postalOptions={postalOptions}
                    postalCodePK={postalCodePK}
                    setPostalCodePK={(val) => {
                      dispatch(setInvoiceMiles(""));
                      dispatch(setDriverMiles(""));
                      dispatch(setIsInvoiceFlatrateVisible(false));
                      dispatch(setIsDriverFlatrateVisible(false));
                      setPostalCodePK(val);
                    }}
                    canadian={canadian}
                    setCanadian={setCanadian}
                  />

                  {/* Phone */}
                  <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Phone</Form.Label>
                    </Col>
                    <Col xs={2} className="p-0 w-100px">
                      <input
                        name="phone_no_auto_suggest"
                        type="text"
                        className={`customFormControl  ${
                          dealerPhone && dealerPhone?.length === 14 ? "borderGreen" : "borderRed"
                        }`}
                        value={dealerPhone}
                        onChange={(e) => setDealerPhone(formatPhoneNumber(e.target.value))}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                      />
                    </Col>
                  </Form.Group>
                  {/* Email */}
                  <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Email</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0 w-300px">
                      <input
                        name="email_no_auto_suggest"
                        type="text"
                        className={`customFormControl ${
                          !dealerEmail || dealerEmail?.match(emailRegex) ? "" : "borderRed  "
                        }`}
                        value={dealerEmail}
                        onChange={(e) => setDealerEmail(e.target.value)}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        maxLength={70}
                      />
                    </Col>
                  </Form.Group>
                  {/* Contact */}
                  <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Contact</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl ${
                          formik.errors.contact === undefined && dealerContact.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                        }`}
                        name="contact_no_auto_suggest"
                        type="text"
                        value={dealerContact}
                        onChange={(e) => setDealerContact(e.target.value)}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        maxLength={42}
                      />
                    </Col>
                  </Form.Group>
                  {/* Contact Phone */}
                  <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Contact Phone</Form.Label>
                    </Col>
                    <Col xs={2} className="p-0 w-100px">
                      <input
                        name="contact_phone"
                        type="text"
                        className={`customFormControl ${
                          dealerContactPhone && dealerContactPhone?.length === 14
                            ? "borderGreen"
                            : "borderRed"
                        }`}
                        value={dealerContactPhone}
                        onChange={(e) => setDealerContactPhone(formatPhoneNumber(e.target.value))}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                      />
                    </Col>
                  </Form.Group>
                  <Row className="mt-5">
                    <Col xs={5} md={5} sm={5} className="p-0 mt-4" style={{ minWidth: "180px" }}>
                      <Form.Group className="mt-1  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          {/* Open Sunday */}
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Sunday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openSunday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openSunday"
                            onChange={(e) => {
                              setOpenSunday(e.target.checked);
                            }}
                            checked={openSunday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Monday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Monday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openMonday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openMonday"
                            onChange={(e) => {
                              setOpenMonday(e.target.checked);
                            }}
                            checked={openMonday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Tuesday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Tuesday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openTuesday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openTuesday"
                            onChange={(e) => {
                              setOpenTuesday(e.target.checked);
                            }}
                            checked={openTuesday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Wednesday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0" style={{ minWidth: "90px" }}>
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Wednesday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openWednesday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openWednesday"
                            onChange={(e) => {
                              setOpenWednesday(e.target.checked);
                            }}
                            checked={openWednesday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Thursday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0 flex-nowrap">
                        <Col sm={7} xs={7} className="p-0 flex-shrink-0">
                          <Form.Label
                            className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15 m-l-15`}
                            style={{ whiteSpace: "nowrap", minWidth: "100px" }}
                          >
                            Open Thursday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="flex-shrink-0">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openThursday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openThursday"
                            onChange={(e) => {
                              setOpenThursday(e.target.checked);
                            }}
                            checked={openThursday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Friday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Friday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openFriday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openFriday"
                            onChange={(e) => {
                              setOpenFriday(e.target.checked);
                            }}
                            checked={openFriday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Saturday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Saturday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openSaturday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openSaturday"
                            onChange={(e) => {
                              setOpenSaturday(e.target.checked);
                            }}
                            checked={openSaturday}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    {/* Drivers Email-Hours */}
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Group
                        className={`mt-0 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                      >
                        <Form.Label htmlFor="notes" style={{ marginTop: "0px" }}>
                          Drivers Email-Hours
                        </Form.Label>
                        <Col sm={12} md={12} xs={12} className="p-0">
                          <textarea
                            rows={8}
                            cols={10}
                            className="customFormControl"
                            name="hours"
                            onChange={(e) => {
                              setHours(e.target.value);
                            }}
                            autoComplete="new-password"
                            aria-autocomplete="none"
                            value={hours}
                            style={{
                              resize: "none",
                              display: "fixed",
                              minHeight: "185px",
                              minWidth: "260px",
                              boxShadow: "none",
                              fontSize: "12px",
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* Drivers Email-Directions */}
              <Col xs={6} md={6} sm={6}>
                <Row>
                  <Col xs={1} />
                  <Col xs={7} md={7} sm={7}>
                    <div className="" style={{ minHeight: "378px" }}></div>
                    <Col xs={12} md={12} sm={12} style={{ marginTop: "60px" }}>
                      <Form.Group
                        className={`mt-0 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                      >
                        <Form.Label htmlFor="notes" style={{ marginTop: "0px" }}>
                          Drivers Email-Directions
                        </Form.Label>

                        <Col sm={12} md={12} xs={12} className="p-0">
                          <textarea
                            rows={8}
                            cols={10}
                            className="customFormControl"
                            name="directions"
                            onChange={(e) => {
                              setDriverEmailDirections(e.target.value);
                            }}
                            value={driverEmailDirections}
                            style={{
                              resize: "none",
                              display: "fixed",
                              minHeight: "186px",
                              minWidth: "240px",
                              boxShadow: "none",
                              fontSize: "12px",
                            }}
                            autoComplete="new-password"
                            aria-autocomplete="none"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
            <MiscDealerLookup
              show={miscellaneousDealerLookupShow}
              onHide={() => setMiscellaneousDealerLookupShow(false)}
              Reroute
              companyPK={companyId}
              renderItemId={(dealer) => dealer.unitAddressPK}
              handleLookupSelection={handleMiscDealerSelection}
            />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default ReroutePickupMiscellaneousDealerContent;
