import { t } from "i18next";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import PostalCode from "../../../../common/PostalCode";
import OrderEntryService from "../../../../../services/OrderEntryService";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import MiscDealerLookup from "../../../../LookupScreens/MiscDealer/MiscDealerLookup";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import {
  setMiscDeliveryDealerFormData,
  setMiscDeliveryDealerSelection,
  setMiscDeliveryDealerTabIsValid,
  setOnCancel,
} from "../../../../../redux/OrderEntryFilterSlice";
import {
  resetSearchSettings,
  setMiscCity,
  setMiscStatecode,
  setMiscPostcode,
} from "../../../../../redux/LookupScreens/MiscDealerLookupSlice";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import LoadingIcon from "../../../../common/LoadingIcon";

const MiscDelivery = ({ styles }) => {
  const dispatch = useDispatch();

  //Local states for UI Fields
  //Col-1
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
  const [postalCodeOnChange, setPostalCodeOnChange] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [loading, setLoading] = useState(false);

  //Col-2
  const [bolText1, setBolText1] = useState("");
  const [bolText2, setBolText2] = useState("");
  const [bolText3, setBolText3] = useState("");
  const [bolText4, setBolText4] = useState("");
  const [bolText5, setBolText5] = useState("");
  const [bolText6, setBolText6] = useState("");
  const [bolText7, setBolText7] = useState("");

  const [directions1, setDirections1] = useState("");
  const [directions2, setDirections2] = useState("");
  const [directions3, setDirections3] = useState("");
  const [directions4, setDirections4] = useState("");
  const [directions5, setDirections5] = useState("");
  const [directions6, setDirections6] = useState("");
  const [directions7, setDirections7] = useState("");
  const [directions, setDirections] = useState("");

  //Col-3

  const [hours1, setHours1] = useState("");
  const [hours2, setHours2] = useState("");
  const [hours3, setHours3] = useState("");

  const [otherText1, setOtherText1] = useState("");
  const [otherText2, setOtherText2] = useState("");
  const [otherText3, setOtherText3] = useState("");

  const [washInstructions1, setWashInstructions1] = useState("");
  const [washInstructions2, setWashInstructions2] = useState("");
  const [washInstructions3, setWashInstructions3] = useState("");
  const [washInstructions4, setWashInstructions4] = useState("");
  const [washInstructions5, setWashInstructions5] = useState("");
  const [washInstructions, setWashInstructions] = useState("");

  const [bolTextHoursInputValues, setBolTextHoursInputValues] = useState(Array(3).fill(""));
  const [bolTextDirectionsInputValues, setBolTextDirectionsInputValues] = useState(Array(6).fill(""));
  const [bolTexMiscellaneousInputValues, setBolTexMiscellaneousInputValues] = useState(Array(4).fill(""));
  const [bolTextWashInstructions, setBolTextWashInstructions] = useState(Array(5).fill(""));
  const [bolTextOtherInputValues, setBolTextOtherInputValue] = useState(Array(3).fill(""));

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [zipIdChcek, setZipIdCheck] = useState("");

  const [miscellaneousDealer, setMiscellaneousDealer] = useState(null);

  const [viewDetail, setViewDetail] = useState(false);
  useEffect(() => {
    if (city && statecode && postalcode) {
      setViewDetail(false);
    }
  }, [city, statecode, postalcode]);

  //Miscellaneuous Delivery checkbox state in unit tab
  const miscellaneousDelivery = useSelector((state) => state.orderEntryReducer.miscellaneousDelivery);

  const id = useSelector((state) => state.orderEntryReducer.miscDeliveryID);

  const miscDealerSelection = useSelector((state) => state.orderEntryReducer.miscDeliveryDealerSelection);
  const onCancel = useSelector((state) => state.orderEntryReducer.onCancel);
  const handleMiscDealerSelection = () => {
    dispatch(resetSearchSettings());
    dispatch(setMiscDeliveryDealerSelection(true));
    dispatch(resetSearchSettings());
    setZipIdCheck(1);
  };

  const miscDealerModalHide = () => {
    dispatch(setMiscDeliveryDealerSelection(false));
    setZipIdCheck("lookup");
  };

  // Method to get a dealer by id
  const fetchMiscDealerById = async (id) => {
    if (id != null && id !== undefined && id !== "") {
      setLoading(true);
      await OrderEntryService.fetchMiscDealerById(id)
        .then((response) => {
          const data = response.data;
          setMiscellaneousDealer(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (miscellaneousDealer != null) {
      //Col-1
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
      //Col-2
      setBolText1(miscellaneousDealer.bolText1 != null ? miscellaneousDealer.bolText1?.trim() : "");
      setBolText2(miscellaneousDealer.bolText2 != null ? miscellaneousDealer.bolText2?.trim() : "");
      setBolText3(miscellaneousDealer.bolText3 != null ? miscellaneousDealer.bolText3?.trim() : "");
      setBolText4(miscellaneousDealer.bolText4 != null ? miscellaneousDealer.bolText4?.trim() : "");
      setBolText5(miscellaneousDealer.bolText5 != null ? miscellaneousDealer.bolText5?.trim() : "");
      setBolText6(miscellaneousDealer.bolText6 != null ? miscellaneousDealer.bolText6?.trim() : "");
      setBolText7(miscellaneousDealer.bolText7 != null ? miscellaneousDealer.bolText7?.trim() : "");

      setDirections1(miscellaneousDealer.directions1 != null ? miscellaneousDealer.directions1?.trim() : "");
      setDirections2(miscellaneousDealer.directions2 != null ? miscellaneousDealer.directions2?.trim() : "");
      setDirections3(miscellaneousDealer.directions3 != null ? miscellaneousDealer.directions3?.trim() : "");
      setDirections4(miscellaneousDealer.directions4 != null ? miscellaneousDealer.directions4?.trim() : "");
      setDirections5(miscellaneousDealer.directions5 != null ? miscellaneousDealer.directions5?.trim() : "");
      setDirections6(miscellaneousDealer.directions6 != null ? miscellaneousDealer.directions6?.trim() : "");
      setDirections7(miscellaneousDealer.directions7 != null ? miscellaneousDealer.directions7?.trim() : "");
      setDirections(miscellaneousDealer.directions != null ? miscellaneousDealer.directions?.trim() : "");
      //Col-3
      setHours1(miscellaneousDealer.hours1 != null ? miscellaneousDealer.hours1?.trim() : "");
      setHours2(miscellaneousDealer.hours2 != null ? miscellaneousDealer.hours2?.trim() : "");
      setHours3(miscellaneousDealer.hours3 != null ? miscellaneousDealer.hours3?.trim() : "");

      setOtherText1(miscellaneousDealer.otherText1 != null ? miscellaneousDealer.otherText1?.trim() : "");
      setOtherText2(miscellaneousDealer.otherText2 != null ? miscellaneousDealer.otherText2?.trim() : "");
      setOtherText3(miscellaneousDealer.otherText3 != null ? miscellaneousDealer.otherText3?.trim() : "");
      setWashInstructions1(
        miscellaneousDealer.washInstructions1 != null ? miscellaneousDealer.washInstructions1?.trim() : ""
      );
      setWashInstructions2(
        miscellaneousDealer.washInstructions2 != null ? miscellaneousDealer.washInstructions2?.trim() : ""
      );
      setWashInstructions3(
        miscellaneousDealer.washInstructions3 != null ? miscellaneousDealer.washInstructions3?.trim() : ""
      );
      setWashInstructions4(
        miscellaneousDealer.washInstructions4 != null ? miscellaneousDealer.washInstructions4?.trim() : ""
      );
      setWashInstructions5(
        miscellaneousDealer.washInstructions5 != null ? miscellaneousDealer.washInstructions5?.trim() : ""
      );
      setWashInstructions(
        miscellaneousDealer.washInstructions != null ? miscellaneousDealer.washInstructions?.trim() : ""
      );

      initialValue[0].city = miscellaneousDealer.city != null ? miscellaneousDealer.city?.trim() : "";
      initialValue[0].statecode =
        miscellaneousDealer.statecode != null ? miscellaneousDealer.statecode?.trim() : "";
      initialValue[0].postalcode =
        miscellaneousDealer.postalcode != null ? miscellaneousDealer.postalcode?.trim() : "";
      setPostalValues(initialValue);
      setPostalCodePK(miscellaneousDealer.postalCodePK ? miscellaneousDealer.postalCodePK : null);
    }
  }, [miscellaneousDealer]);

  useEffect(() => {
    if (id !== null) {
      fetchMiscDealerById(id);
    }
  }, [id]);

  useEffect(() => {
    if (miscellaneousDelivery === false) {
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
      setPostalCodePK(null);

      //Col-2

      setBolText1("");
      setBolText2("");
      setBolText3("");
      setBolText4("");
      setBolText5("");
      setBolText6("");
      setBolText7("");
      setBolTexMiscellaneousInputValues(Array(7).fill(""));
      setDirections1("");
      setDirections2("");
      setDirections3("");
      setDirections4("");
      setDirections5("");
      setDirections6("");
      setDirections7("");
      setBolTextDirectionsInputValues(Array(6).fill(""));
      setDirections("");

      //Col-3
      setHours1("");
      setHours2("");
      setHours3("");
      setBolTextHoursInputValues(Array(3).fill(""));

      setOtherText1("");
      setOtherText2("");
      setOtherText3("");
      setBolTextOtherInputValue(Array(3).fill(""));

      setWashInstructions1("");
      setWashInstructions2("");
      setWashInstructions3("");
      setWashInstructions4("");
      setWashInstructions5("");
      setBolTextWashInstructions(Array(5).fill(""));
      setWashInstructions("");
    }
  }, [miscellaneousDelivery]);

  //Method to save a miscellaneous Delivery Dealer
  function MiscDeliveryDealerFormData() {
    dispatch(
      setMiscDeliveryDealerFormData({
        //Col-1
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
        //Col-2

        bolText1: bolText1,
        bolText2: bolText2,
        bolText3: bolText3,
        bolText4: bolText4,
        bolText5: bolText5,
        bolText6: bolText6,
        bolText7: bolText7,
        bolTextMiscellaneous: bolTexMiscellaneousInputValues,

        directions1: directions1,
        directions2: directions2,
        directions3: directions3,
        directions4: directions4,
        directions5: directions5,
        directions6: directions6,
        directions7: directions7,
        bolTextDirections: bolTextDirectionsInputValues,
        directions: directions,
        //Col-3

        hours1: hours1,
        hours2: hours2,
        hours3: hours3,
        bolTextHours: bolTextHoursInputValues,

        otherText1: otherText1,
        otherText2: otherText2,
        otherText3: otherText3,
        bolTextOthers: bolTextOtherInputValues,

        washInstructions1: washInstructions1,
        washInstructions2: washInstructions2,
        washInstructions3: washInstructions3,
        washInstructions4: washInstructions4,
        washInstructions5: washInstructions5,
        bolTextWashInstructions: bolTextWashInstructions,
        washInstructions: washInstructions,
      })
    );
  }

  useEffect(() => {
    MiscDeliveryDealerFormData();
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
    bolText1,
    bolText2,
    bolText3,
    bolText4,
    bolText5,
    bolText6,
    bolText7,
    bolTexMiscellaneousInputValues,

    directions1,
    directions2,
    directions3,
    directions4,
    directions5,
    directions6,
    directions7,
    bolTextDirectionsInputValues,
    directions,
    hours,
    hours1,
    hours2,
    hours3,
    bolTextHoursInputValues,
    otherText1,
    otherText2,
    otherText3,
    bolTextOtherInputValues,

    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    bolTextWashInstructions,

    washInstructions,
    setMiscDeliveryDealerFormData,
  ]);

  //Validation
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const contactPhoneFormatHandler = (e) => {
    const formattedContactPhoneNumber = formatPhoneNumber(e.target.value);
    setContactPhone(formattedContactPhoneNumber);
  };

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

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
      dispatch(setMiscDeliveryDealerTabIsValid(true));
    } else {
      dispatch(setMiscDeliveryDealerTabIsValid(false));
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

  // edit/paste data passes to back end as array - BOL Text Hours
  useEffect(() => {
    const backendValues = [hours1, hours2, hours3];
    setBolTextHoursInputValues(backendValues);
  }, [hours1, hours2, hours3, miscellaneousDealer]);

  // edit/paste data passes to back end as array - BOL Text Other
  useEffect(() => {
    const backendValues = [otherText1, otherText2, otherText3];
    setBolTextOtherInputValue(backendValues);
  }, [otherText1, otherText2, otherText3, miscellaneousDealer]);

  // edit/paste data passes to back end as array - BOL Text Directions
  useEffect(() => {
    const backendValues = [
      directions1,
      directions2,
      directions3,
      directions4,
      directions5,
      directions6,
      directions7,
    ];
    setBolTextDirectionsInputValues(backendValues);
  }, [
    directions1,
    directions2,
    directions3,
    directions4,
    directions5,
    directions6,
    directions7,
    miscellaneousDealer,
  ]);

  // edit/paste data passes to back end as array - BOL Text Miscellaneous
  useEffect(() => {
    const backendValues = [bolText1, bolText2, bolText3, bolText4, bolText5, bolText6, bolText7];
    setBolTexMiscellaneousInputValues(backendValues);
  }, [bolText1, bolText2, bolText3, bolText4, bolText5, bolText6, bolText7, miscellaneousDealer]);

  // edit/paste data passes to back end as array - BOL Text Wash Instructions
  useEffect(() => {
    const backendValues = [
      washInstructions1,
      washInstructions2,
      washInstructions3,
      washInstructions4,
      washInstructions5,
    ];
    setBolTextWashInstructions(backendValues);
  }, [
    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    miscellaneousDealer,
  ]);

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
              {/* COL 1 */}
              <Col sm={6} xs={6}>
                <p>Miscellaneous Delivery Dealer</p>

                <div className="p-l-25">
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0" />
                    <Col sm={4} xs={4} className={`p-0 ${styles.selectContainer}`}>
                      <button
                        className={`customFormControl`}
                        name="miscCustomerSelection"
                        id="miscCustomerSelection"
                        // disabled
                        style={{ background: "#e9ecef" }}
                        onClick={handleMiscDealerSelection}
                        // MiscCustomerSelction Modal @ bottom
                      >
                        Miscellaneous Dealer Selection
                      </button>
                    </Col>
                  </Form.Group>

                  {/* Name */}
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>
                        {t("edit.dealer.page.general.tab.name")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail
                            ? "black"
                            : formik.errors.name === undefined && name.length >= 1
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
                        style={{
                          borderColor: viewDetail
                            ? "black"
                            : formik.errors.name === undefined && name.length >= 1
                              ? "green"
                              : "red",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* Address1 */}
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>
                        {t("edit.dealer.page.general.tab.address")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail
                            ? "black"
                            : formik.errors.address1 === undefined && address1.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="ad1"
                        name="ad1"
                        type="text"
                        value={address1}
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
                            : formik.errors.address1 === undefined && address1.length >= 1
                              ? "green"
                              : "red",
                        }}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>

                  {/* Address2 */}
                  <Form.Group className="mt-2 mb-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label
                        htmlFor="address2"
                        className={`col-form-label ${"customColFormLabel"} dealer-label`}
                      ></Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl `}
                        id="ad2"
                        name="ad2"
                        type="text"
                        maxLength={30}
                        value={address2}
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

                  {/* Phone */}
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
                        maxLength={14}
                        onChange={(e) => phoneFormatHandler(e)}
                        autoComplete="off"
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

                  {/* Email */}
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
                        autoComplete="off"
                        value={email}
                        disabled={viewDetail}
                        onInput={(e) => {
                          formik.handleChange(e);
                          setEmail(e.target.value);
                        }}
                        //aria-autocomplete="list"
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

                  {/* Contact */}
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
                        id="contact"
                        name="contact"
                        type="text"
                        value={contact}
                        maxLength={42}
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

                  {/* Contact Phone */}
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
                        id="contactPhone"
                        name="contactPhone"
                        type="text"
                        value={contactPhone}
                        maxLength={14}
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

              {/* COL 2 */}
              <Col sm={3} xs={3}>
                <p className={""}>BOL Text - Miscellaneous</p>

                <div>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={10} xs={10}>
                      <DynamicTextFields
                        numFields={7}
                        maxCharLimit={42}
                        inputValues={bolTexMiscellaneousInputValues}
                        setInputValues={setBolTexMiscellaneousInputValues}
                      />
                    </Col>
                  </Form.Group>
                </div>

                <p className={""}>BOL Text - Directions</p>

                <div>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={10} xs={10}>
                      <DynamicTextFields
                        numFields={6}
                        maxCharLimit={42}
                        inputValues={bolTextDirectionsInputValues}
                        setInputValues={setBolTextDirectionsInputValues}
                      />
                    </Col>
                  </Form.Group>
                </div>
              </Col>

              {/* COL 3 */}
              <Col sm={3} xs={3}>
                <p className={""}>BOL Text - Hours</p>

                <div>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={10} xs={10}>
                      <DynamicTextFields
                        numFields={3}
                        maxCharLimit={42}
                        inputValues={bolTextHoursInputValues}
                        setInputValues={setBolTextHoursInputValues}
                      />
                    </Col>
                  </Form.Group>
                </div>

                <p className={""}>BOL Text - Other</p>

                <div>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={10} xs={10}>
                      <DynamicTextFields
                        numFields={3}
                        maxCharLimit={42}
                        inputValues={bolTextOtherInputValues}
                        setInputValues={setBolTextOtherInputValue}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <p className={`${""} mt-4`}>BOL Text - Wash Instructions</p>

                <div>
                  <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                    <Col sm={10} xs={10}>
                      <DynamicTextFields
                        numFields={5}
                        maxCharLimit={42}
                        inputValues={bolTextWashInstructions}
                        setInputValues={setBolTextWashInstructions}
                      />
                    </Col>
                  </Form.Group>
                </div>
              </Col>
            </Row>

            {/* ROW 2 */}
            <Row>
              {/* COL 1 */}
              <Col sm={6} xs={6}>
                <Row className="p-l-25">
                  {/* Checkboxes */}
                  <Col sm={5} xs={5}>
                    <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                      <Col sm={7} xs={7} className="p-0">
                        <Form.Label className={`customColFormLabel`}>Open Sunday</Form.Label>
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
                          id="openSunday"
                          name="openSunday"
                          value={openSunday}
                          checked={openSunday}
                          onChange={(e) => setOpenSunday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                      <Col sm={7} xs={7} className="p-0">
                        <Form.Label className={`customColFormLabel`}>Open Monday</Form.Label>
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
                          id="openMonday"
                          name="openMonday"
                          value={openMonday}
                          checked={openMonday}
                          onChange={(e) => setOpenMonday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                      <Col sm={7} xs={7} className="p-0">
                        <Form.Label className={`customColFormLabel`}>Open Tuesday</Form.Label>
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
                          id="openTuesday"
                          name="openTuesday"
                          value={openTuesday}
                          checked={openTuesday}
                          onChange={(e) => setOpenTuesday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                      <Col sm={7} xs={7} className="p-0">
                        <Form.Label className={`customColFormLabel`}>Open Wednesday</Form.Label>
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
                          id="openWednesday"
                          name="openWednesday"
                          value={openWednesday}
                          checked={openWednesday}
                          onChange={(e) => setOpenWednesday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                      <Col sm={7} xs={7} className="p-0">
                        <Form.Label className={`customColFormLabel`}>Open Thursday</Form.Label>
                      </Col>
                      <Col sm={1} xs={1} className="">
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

                    <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                      <Col sm={7} xs={7} className="p-0">
                        <Form.Label className={`customColFormLabel`}>Open Friday</Form.Label>
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
                          id="openFriday"
                          name="openFriday"
                          value={openFriday}
                          checked={openFriday}
                          onChange={(e) => setOpenFriday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                      <Col sm={7} xs={7} className="p-0">
                        <Form.Label className={`customColFormLabel`}>Open Saturday</Form.Label>
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
                          id="openSaturday"
                          name="openSaturday"
                          value={openSaturday}
                          checked={openSaturday}
                          onChange={(e) => setOpenSaturday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col sm={7} xs={7} className="m-t-32">
                    <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                      <Col sm={12} xs={12} className="p-0">
                        <Form.Label className={`customColFormLabel`}>Drivers Email - Hours</Form.Label>
                      </Col>
                      <Col sm={10} xs={10} className="p-0">
                        <textarea
                          rows={8}
                          cols={20}
                          type="search"
                          className="customFormControl h-100"
                          id="hours"
                          name="hours"
                          value={hours}
                          onInput={(e) => setHours(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>

              {/* COL 2 */}
              <Col sm={3} xs={3} className="m-t-32">
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} xs={12} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Drivers Email - Directions</Form.Label>
                  </Col>
                  <Col sm={11} xs={11} className="p-0">
                    <textarea
                      rows={8}
                      cols={20}
                      type="search"
                      className="customFormControl h-100"
                      id="directions"
                      name="directions"
                      value={directions}
                      onInput={(e) => setDirections(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>

              {/* COL 3 */}
              <Col sm={3} xs={3} className="m-t-32">
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} xs={12} className="p-0">
                    <Form.Label className={`customColFormLabel`}>
                      Drivers Email - Wash Instructions
                    </Form.Label>
                  </Col>
                  <Col sm={11} xs={11} className="p-0">
                    <textarea
                      rows={8}
                      cols={20}
                      type="search"
                      className="customFormControl h-100"
                      id="washInstructions"
                      name="washInstructions"
                      value={washInstructions}
                      onInput={(e) => setWashInstructions(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* MiscCustomer Lookup Modal */}
          </div>
          <MiscDealerLookup
            show={miscDealerSelection}
            onHide={miscDealerModalHide}
            OEMiscDeliveryTab={true}
          />
        </div>
      )}
    </Formik>
  );
};

export default MiscDelivery;
