import { t } from "i18next";
import React from "react";
import { useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import PostalCode from "../../../../common/PostalCode";
import OrderEntryService from "../../../../../services/OrderEntryService";
import {
  setMiscPickupDealerData,
  setMiscPickupDealerSelection,
  setMiscPickupDealerTabIsValid,
  setOnCancel,
} from "../../../../../redux/OrderEntryFilterSlice";
import { useDispatch } from "react-redux";
import MiscDealerLookup from "../../../../LookupScreens/MiscDealer/MiscDealerLookup";
import {
  setPageNumber,
  resetSearchSettings,
  setPickupCity,
  setPickupStateCode,
  setPickupPostalCode,
} from "../../../../../redux/LookupScreens/MiscDealerLookupSlice";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import LoadingIcon from "../../../../common/LoadingIcon";

const MiscPickup = ({ styles }) => {
  const dispatch = useDispatch();

  /********************************************* Local variable declaration starts here *********************************************/
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [contactPhone, setContactPhone] = useState("");
  const [openSunday, setOpenSunday] = useState(false);
  const [openMonday, setOpenMonday] = useState(false);
  const [openTuesday, setOpenTuesday] = useState(false);
  const [openWednesday, setOpenWednesday] = useState(false);
  const [openThursday, setOpenThursday] = useState(false);
  const [openFriday, setOpenFriday] = useState(false);
  const [openSaturday, setOpenSaturday] = useState(false);

  const [hours, setHours] = useState("");
  const [directions, setDirections] = useState("");

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [postalCodeOnChange, setPostalCodeOnChange] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);

  /********************************************* Local variable declaration ends here ***********************************************/

  /********************************************* Redux variable declaration starts here *********************************************/

  const miscPickupID = useSelector((state) => state.orderEntryReducer.miscPickupID);
  const miscDealerSelection = useSelector((state) => state.orderEntryReducer.miscPickupDealerSelection);

  //Miscellaneuous pickup checkbox state in unit tab
  const miscellaneousPickup = useSelector((state) => state.orderEntryReducer.miscellaneousPickup);
  const onCancel = useSelector((state) => state.orderEntryReducer.onCancel);
  const [miscellaneousDealer, setMiscellaneousDealer] = useState(null);
  const [loading, setLoading] = useState(false);

  /********************************************* Redux variable declaration ends here ************************************************/

  /**********************************************  Function Definitions starts here  ***************************************************/
  /**
   * set values to UnitAddressVO
   */
  function setMiscDealerRequestData() {
    dispatch(
      setMiscPickupDealerData({
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        canadian: canadian,
        phone: phone.replace(/\s+/g, ""),
        email: email,
        deliveryContact: contact,
        deliveryContactPhone: contactPhone.replace(/\s+/g, ""),
        openSunday: openSunday,
        openMonday: openMonday,
        openTuesday: openTuesday,
        openWednesday: openWednesday,
        openThursday: openThursday,
        openFriday: openFriday,
        openSaturday: openSaturday,
        hours: hours,
        directions: directions,
      })
    );
  }
  /**
   * fetch Misc dealer by id
   */
  const fetchMiscDealerById = async (miscPickupID) => {
    if (miscPickupID != null && miscPickupID !== undefined && miscPickupID !== "") {
      setLoading(true);
      await OrderEntryService.fetchMiscDealerById(miscPickupID)
        .then((response) => {
          const data = response.data;
          setMiscellaneousDealer(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };
  /************************************************  Function Definitions ends here  ************************************************/

  /****************************************************  Handles for Evevnts starts here  ********************************************/
  /**
   * used for Misc Dealer selection Lookup - onSelect
   */
  const handleMiscDealerSelection = () => {
    dispatch(setPageNumber(0));
    dispatch(setMiscPickupDealerSelection(true));
    dispatch(resetSearchSettings());
    setZipIdCheck("zipValidId");
  };
  /**
   * used for Misc Dealer selection Lookup - onClose
   */
  const miscDealerModalHide = () => {
    dispatch(setMiscPickupDealerSelection(false));
    setZipIdCheck("lookup");
  };

  /****************************************************  Handles for Evevnts ends here  ********************************************/

  /***************************************************  UseEffects starts here  ****************************************************/
  /**
   * used for setting Misc dealer details from lookup
   */
  useEffect(() => {
    if (miscellaneousDealer !== null) {
      setName(miscellaneousDealer.name != null ? miscellaneousDealer.name?.trim() : "");
      setAddress1(miscellaneousDealer.address1 != null ? miscellaneousDealer.address1?.trim() : "");
      setAddress2(miscellaneousDealer.address2 != null ? miscellaneousDealer.address2?.trim() : "");
      setCity(miscellaneousDealer.city != null ? miscellaneousDealer.city?.trim() : "");
      setStateCode(miscellaneousDealer.stateCode != null ? miscellaneousDealer.stateCode?.trim() : "");
      setPostalCode(miscellaneousDealer.postalCode != null ? miscellaneousDealer.postalCode?.trim() : "");
      setCanadian(miscellaneousDealer.canadian != null ? miscellaneousDealer.canadian : "");
      setPhone(miscellaneousDealer.phone != null ? formatPhoneNumber(miscellaneousDealer.phone) : "");
      setEmail(miscellaneousDealer.email != null ? miscellaneousDealer.email?.trim() : "");
      setContact(
        miscellaneousDealer.deliveryContact != null ? miscellaneousDealer.deliveryContact?.trim() : ""
      );
      setContactPhone(
        miscellaneousDealer.deliveryContactPhone != null
          ? formatPhoneNumber(miscellaneousDealer.deliveryContactPhone)
          : ""
      );
      setOpenSunday(miscellaneousDealer.openSunday != null ? miscellaneousDealer.openSunday : "");
      setOpenMonday(miscellaneousDealer.openMonday != null ? miscellaneousDealer.openMonday : "");
      setOpenTuesday(miscellaneousDealer.openTuesday != null ? miscellaneousDealer.openTuesday : "");
      setOpenWednesday(miscellaneousDealer.openWednesday != null ? miscellaneousDealer.openWednesday : "");
      setOpenThursday(miscellaneousDealer.openThursday != null ? miscellaneousDealer.openThursday : "");
      setOpenFriday(miscellaneousDealer.openFriday != null ? miscellaneousDealer.openFriday : "");
      setOpenSaturday(miscellaneousDealer.openSaturday != null ? miscellaneousDealer.openSaturday : "");
      setHours(miscellaneousDealer.hours != null ? miscellaneousDealer.hours?.trim() : "");
      setDirections(miscellaneousDealer.directions != null ? miscellaneousDealer.directions?.trim() : "");

      initialValue[0].city = miscellaneousDealer.city != null ? miscellaneousDealer.city?.trim() : "";
      initialValue[0].statecode =
        miscellaneousDealer.statecode != null ? miscellaneousDealer.statecode?.trim() : "";
      initialValue[0].postalcode =
        miscellaneousDealer.postalcode != null ? miscellaneousDealer.postalcode?.trim() : "";
      setPostalValues(initialValue);
      setPostalCodePK(miscellaneousDealer.postalCodePK ? miscellaneousDealer.postalCodePK : null);
    }
  }, [miscellaneousDealer]);

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  /**
   * call function Misc dealer by id
   */
  useEffect(() => {
    if (miscPickupID !== null) {
      fetchMiscDealerById(miscPickupID);
    }
  }, [miscPickupID]);
  /**
   * clear data when miscellaneous pickup checkbox is unchecked
   */
  useEffect(() => {
    if (miscellaneousPickup === false) {
      setName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setStateCode("");
      setPostalCode("");
      setCanadian(false);
      setPhone("");
      setEmail("");
      setContact("");
      setContactPhone("");
      setOpenSunday(false);
      setOpenMonday(false);
      setOpenTuesday(false);
      setOpenWednesday(false);
      setOpenThursday(false);
      setOpenFriday(false);
      setOpenSaturday(false);
      setHours("");
      setDirections("");
      setPostalCodePK(null);
    }
  }, [miscellaneousPickup]);

  /**
   * set data for save
   */
  useEffect(() => {
    setMiscDealerRequestData();
  }, [
    name,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    canadian,
    phone,
    email,
    contact,
    contactPhone,
    openSunday,
    openMonday,
    openTuesday,
    openWednesday,
    openThursday,
    openFriday,
    openSaturday,
    hours,
    directions,
  ]);
  //Tab Validation
  useEffect(() => {
    if (
      name !== "" &&
      address1 !== "" &&
      postalCodePK &&
      phone !== "" &&
      phone.match(phoneRegex) &&
      (email === "" || email.match(emailRegex)) &&
      contact !== "" &&
      contactPhone.match(phoneRegex) &&
      (openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday)
    ) {
      dispatch(setMiscPickupDealerTabIsValid(true));
    } else {
      dispatch(setMiscPickupDealerTabIsValid(false));
    }
  }, [
    name,
    address1,
    statecode,
    canadian,
    postalcode,
    phone,
    email,
    contact,
    contactPhone,
    postalCodeOnChange,
    postalCodePK,
    openSunday,
    openMonday,
    openTuesday,
    openWednesday,
    openThursday,
    openFriday,
    openSaturday,
  ]);

  /*****************************************************  UseEffects ends here  ******************************************************/

  //Validation

  const [viewDetail, setViewDetail] = useState(false);
  useEffect(() => {
    if (city && statecode && postalcode) {
      setViewDetail(false);
    }
  }, [city, statecode, postalcode]);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };
  const contactPhoneFormatHandler = (e) => {
    const formattedContactPhoneNumber = formatPhoneNumber(e.target.value);
    setContactPhone(formattedContactPhoneNumber);
  };
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

  return (
    <Formik
      initialValues={{
        name,
        address1,
        city,
        statecode,
        postalcode,
        canadian,
        contact,
        phone,
        contactPhone,
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
        canadian: false,
        contact: true,
        phone: true,
        contactPhone: true,
      }}
    >
      {(formik) => (
        <div>
          {loading && <LoadingIcon />}
          <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
            {/* ROW 1 */}
            <Row>
              <Col sm={6} xs={6}>
                <p className="">Miscellaneous Pickup Dealer</p>

                <div className="p-l-25">
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className={`p-0 ${styles.selectContainer}`}>
                      <button
                        className={`customFormControl`}
                        name="miscCustomerSelection"
                        id="miscCustomerSelection"
                        style={{ background: "#e9ecef" }}
                        onClick={handleMiscDealerSelection}
                      >
                        Miscellaneous Dealer Selection
                      </button>
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className={`customColFormLabel`}>
                        {t("edit.dealer.page.general.tab.name")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail
                            ? "black"
                            : formik.errors.name === undefined && name?.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setName(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="address1" className={`customColFormLabel`}>
                        {t("edit.dealer.page.general.tab.address")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail
                            ? "black"
                            : formik.errors.address1 === undefined && address1?.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="ad1"
                        name="ad1"
                        value={address1}
                        type="text"
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setAddress1(e.target.value);
                        }}
                        style={{
                          borderColor: viewDetail
                            ? "black"
                            : formik.errors.address1 === undefined && address1?.length >= 1
                              ? "green"
                              : "red",
                        }}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-2 mb-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="address2" className={`customColFormLabel`}></Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl `}
                        id="ad2"
                        name="ad2"
                        type="text"
                        value={address2}
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        onInput={(e) => setAddress2(e.target.value)}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>
                  <PostalCodeComponent
                    disabled={viewDetail}
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

                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>
                        {t("edit.dealer.page.general.tab.phone")}
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-105px">
                      <input
                        className={`customFormControl  ${
                          viewDetail === true
                            ? "black"
                            : formik.errors.phone === undefined && phone != null && phone.length >= 1
                              ? "borderGreen"
                              : formik.errors.phone !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        control="input"
                        name="phone"
                        value={phone}
                        onChange={(e) => phoneFormatHandler(e)}
                        maxLength={14}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setPhone(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        style={{
                          borderColor:
                            viewDetail === true
                              ? "black"
                              : formik.errors.phone === undefined && phone != null && phone.length >= 1
                                ? "green"
                                : formik.errors.phone !== undefined
                                  ? "red"
                                  : "",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Email</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail === true
                            ? "black"
                            : formik.errors.email === undefined && email != null && email.length >= 1
                              ? ""
                              : formik.errors.email !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        type="email"
                        name="email"
                        maxLength={70}
                        value={email}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setEmail(e.target.value);
                        }}
                        style={{
                          borderColor:
                            viewDetail === true
                              ? "black"
                              : formik.errors.email === undefined && email != null && email.length >= 1
                                ? ""
                                : formik.errors.email !== undefined
                                  ? "red"
                                  : "",
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Contact</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail
                            ? "black"
                            : formik.errors.contact === undefined && contact.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        type="contact"
                        name="contact"
                        maxLength={42}
                        value={contact}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setContact(e.target.value);
                        }}
                        style={{
                          borderColor: viewDetail
                            ? "black"
                            : formik.errors.contact === undefined && contact.length >= 1
                              ? "green"
                              : "red",
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Contact Phone</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-105px">
                      <input
                        className={`customFormControl  ${
                          viewDetail
                            ? "black"
                            : formik.errors.contactPhone === undefined && contactPhone.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        type="contactPhone"
                        name="contactPhone"
                        maxLength={14}
                        value={contactPhone}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onChange={(e) => contactPhoneFormatHandler(e)}
                        onInput={(e) => setContactPhone(e.target.value)}
                        style={{
                          borderColor: viewDetail
                            ? "black"
                            : formik.errors.contactPhone === undefined && contactPhone.length >= 1
                              ? "green"
                              : "red",
                        }}
                      />
                    </Col>
                  </Form.Group>
                </div>
              </Col>
            </Row>

            {/* ROW 2 */}
            <Row>
              <Col sm={12} xs={12}>
                <div className="p-l-25 mt-5">
                  <Row>
                    <Col xs={3}>
                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0">
                          <Form.Label className={` customColFormLabel`}>Open Sunday</Form.Label>
                        </Col>

                        <Col xs={1} md={1} sm={1} className="p-l-30">
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
                            id="openSunday"
                            name="openSunday"
                            value={openSunday}
                            checked={openSunday}
                            onChange={(e) => setOpenSunday(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0">
                          <Form.Label className={` customColFormLabel`}>Open Monday</Form.Label>
                        </Col>

                        <Col xs={1} md={1} sm={1} className="p-l-30">
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
                            id="openMonday"
                            name="openMonday"
                            value={openMonday}
                            checked={openMonday}
                            onChange={(e) => setOpenMonday(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0">
                          <Form.Label className={` customColFormLabel`}>Open Tuesday</Form.Label>
                        </Col>

                        <Col xs={1} md={1} sm={1} className="p-l-30">
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
                            id="openTuesday"
                            name="openTuesday"
                            value={openTuesday}
                            checked={openTuesday}
                            onChange={(e) => setOpenTuesday(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0">
                          <Form.Label className={` customColFormLabel`}>Open Wednesday</Form.Label>
                        </Col>

                        <Col xs={1} md={1} sm={1} className="p-l-30">
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
                            id="openWednesday"
                            name="openWednesday"
                            value={openWednesday}
                            checked={openWednesday}
                            onChange={(e) => setOpenWednesday(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0">
                          <Form.Label className={` customColFormLabel`}>Open Thursday</Form.Label>
                        </Col>

                        <Col xs={1} md={1} sm={1} className="p-l-30">
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
                            id="openThursday"
                            name="openThursday"
                            value={openThursday}
                            checked={openThursday}
                            onChange={(e) => setOpenThursday(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0">
                          <Form.Label className={` customColFormLabel`}>Open Friday</Form.Label>
                        </Col>

                        <Col xs={1} md={1} sm={1} className="p-l-30">
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
                            id="openFriday"
                            name="openFriday"
                            value={openFriday}
                            checked={openFriday}
                            onChange={(e) => setOpenFriday(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0">
                          <Form.Label className={` customColFormLabel`}>Open Saturday</Form.Label>
                        </Col>
                        <Col xs={1} md={1} sm={1} className="p-l-30">
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
                            id="openSaturday"
                            name="openSaturday"
                            value={openSaturday}
                            checked={openSaturday}
                            onChange={(e) => setOpenSaturday(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col xs={4}>
                      <Form.Label className={` customColFormLabel mt-4`}>Drivers Email - Hours</Form.Label>

                      <Col sm={11} className="p-0">
                        <textarea
                          rows={10}
                          cols={20}
                          type="search"
                          className="customFormControl h-100"
                          id="hours"
                          name="hours"
                          value={hours}
                          onInput={(e) => setHours(e.target.value)}
                        />
                      </Col>
                    </Col>
                    <Col xs={4}>
                      <Form.Label className={` customColFormLabel mt-4`}>
                        Drivers Email - Directions
                      </Form.Label>

                      <Col sm={11}>
                        <textarea
                          rows={10}
                          cols={20}
                          type="search"
                          className="customFormControl h-100"
                          id="directions"
                          name="directions"
                          value={directions}
                          onInput={(e) => setDirections(e.target.value)}
                        />
                      </Col>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            {/* MiscCustomer Lookup Modal */}
          </div>
          <MiscDealerLookup show={miscDealerSelection} onHide={miscDealerModalHide} OEMiscPickupTab={true} />
        </div>
      )}
    </Formik>
  );
};

export default MiscPickup;
