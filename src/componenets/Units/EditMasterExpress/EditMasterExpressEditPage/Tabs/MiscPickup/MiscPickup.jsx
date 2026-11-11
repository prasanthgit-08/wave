import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import {
  setIsMiscPickupTabValid,
  setEditedUnitDataToSaveForMiscPickupTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";

function MiscPickup({ styles }) {
  const dispatch = useDispatch();

  //Local States - Start
  const [miscellaneousPickupDealerPK, setMiscellaneousPickupDealerPK] = useState("");
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
  const [postalCodePK, setPostalCodePK] = useState(null);

  const [zipIdChcek, setZipIdCheck] = useState("");

  //Local States - End

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const miscPickupDealerPostalCodeOnChange = useSelector(
    (state) => state.editMasterExpress.miscPickupDealerPostalCodeOnChange
  );

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData !== null) {
      setMiscellaneousPickupDealerPK(
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerPK || ""
      );
      setName(selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerName?.trim() || "");
      setAddress1(
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerAddress1?.trim() || ""
      );
      setAddress2(
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerAddress2 !== null
          ? selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerAddress2?.trim()
          : ""
      );
      setPostalCode(
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerPostalCode?.trim() || ""
      );
      setCity(selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerCity?.trim() || "");
      setStateCode(
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerStateCode?.trim() || ""
      );
      setCanadian(
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerCanadian || false
      );
      setPostalCodePK(
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerPostalCodeFK || null
      );
      initialValue[0].city =
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerCity?.trim() || "";
      initialValue[0].statecode =
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerStateCode?.trim() || "";
      initialValue[0].postalcode =
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerPostalCode?.trim() || "";
      setPostalValues(initialValue);
      setPhone(
        formatPhoneNumber(selectedUnitData.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerPhone) ||
          ""
      );
      setEmail(
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerEmail?.trim() || ""
      );
      setContact(
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerContact?.trim() || ""
      );
      setContactPhone(
        formatPhoneNumber(
          selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerContactPhone
        ) || ""
      );
      setOpenSunday(selectedUnitData?.editMasterExpressMiscPickupDTO?.openSunday || false);
      setOpenMonday(selectedUnitData?.editMasterExpressMiscPickupDTO?.openMonday || false);
      setOpenTuesday(selectedUnitData?.editMasterExpressMiscPickupDTO?.openTuesday || false);
      setOpenWednesday(selectedUnitData?.editMasterExpressMiscPickupDTO?.openWednesday || false);
      setOpenThursday(selectedUnitData?.editMasterExpressMiscPickupDTO?.openThursday || false);
      setOpenFriday(selectedUnitData?.editMasterExpressMiscPickupDTO?.openFriday || false);
      setOpenSaturday(selectedUnitData?.editMasterExpressMiscPickupDTO?.openSaturday || false);
      setHours(selectedUnitData?.editMasterExpressMiscPickupDTO?.hours?.trim() || "");
      setDirections(selectedUnitData?.editMasterExpressMiscPickupDTO?.directions?.trim() || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitData, viewDetail]);

  // Field Validation - Start
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const contactPhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setContactPhone(formattedPhoneNumber);
  };

  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/gm;
  const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    email: yup.string().matches(emailRegex),
  });

  const days = [openSunday, openMonday, openTuesday, openWednesday, openThursday, openFriday, openSaturday];
  const daysValidation = days.some((day) => day === true);

  //Misc Pickup Tab Validation
  useEffect(() => {
    if (
      name !== "" &&
      address1 !== "" &&
      postalCodePK != null &&
      phone !== "" &&
      phone.match(phoneRegex) &&
      (email === "" || email.match(emailRegex)) &&
      contact !== "" &&
      contactPhone !== "" &&
      contactPhone.match(phoneRegex) &&
      daysValidation
    ) {
      dispatch(setIsMiscPickupTabValid(true));
    } else {
      dispatch(setIsMiscPickupTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    name,
    address1,
    postalCodePK,
    phone,
    email,
    contact,
    contactPhone,
    miscPickupDealerPostalCodeOnChange,
    daysValidation,
  ]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForMiscPickupTab({
        unitAddressPK: miscellaneousPickupDealerPK,
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
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    miscellaneousPickupDealerPK,
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

  return (
    <Formik
      initialValues={{
        city,
        statecode,
        postalcode,
        canadian,
        email,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        city: true,
        statecode: true,
        postalcode: true,
        canadian: false,
        email: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-1 ps-2">
            <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0"></Form.Group>
            <p>Miscellaneous Pickup Dealer</p>
            <Row>
              <Col xs={7}>
                {/* ********************* */}
                {/* Name */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Name</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className={`customFormControl ${
                        isUnitDataLoading || viewDetail
                          ? ""
                          : name?.trim() !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="firstName"
                      type="text"
                      value={name}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail}

                      onInput={(e) => {
                        setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                    />
                  </Col>
                </Form.Group>
                {/* ********************* */}

                {/* Address - 1 */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Address</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className={`customFormControl ${
                        isUnitDataLoading || viewDetail
                          ? ""
                          : address1?.trim() !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="ad1"
                      value={address1}
                      type="text"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      disabled={viewDetail}
                      onInput={(e) => {
                        let value = e.target.value;
                        if (value !== "") {
                          if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                            value = value.substring(1);
                          }
                        }
                        setAddress1(value);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                {/* ********************* */}

                {/* Address - 2 */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}></Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className={`customFormControl`}
                      name="ad2"
                      value={address2}
                      type="text"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      disabled={viewDetail}
                      onInput={(e) => {
                        let value = e.target.value;
                        if (value !== "") {
                          if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                            value = value.substring(1);
                          }
                        }
                        setAddress2(value);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/* ZIP,City,Statecode */}
                <PostalCodeComponent
                  //   cityColNumber={6}
                  disabled={viewDetail || isUnitDataLoading}
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
                  zipInputWidth={"100px"}
                />

                {/* ********************* */}
                {/* Phone */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Phone</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0 w-100px">
                    <input
                      className={`customFormControl ${
                        viewDetail || isUnitDataLoading
                          ? ""
                          : phone !== "" && phone?.length === 14
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="phone"
                      type="text"
                      maxLength={14}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={phone}
                      disabled={viewDetail}
                      onChange={(e) => phoneFormatHandler(e)}
                      onInput={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* ********************* */}
                {/* Email */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Email</Form.Label>
                  </Col>
                  <Col xs={7} md={7} sm={7} className="p-0">
                    <input
                      className={`customFormControl ${
                        isUnitDataLoading || viewDetail || email === ""
                          ? ""
                          : formik.errors.email === undefined
                            ? ""
                            : "borderRed"
                      }`}
                      name="email"
                      type="text"
                      maxLength={70}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={email}
                      disabled={viewDetail}
                      onInput={(e) => {
                        let value = e.target.value;
                        if (value !== "") {
                          if (/^\s/.test(value)) {
                            value = value.substring(1);
                          }
                        }
                        setEmail(value);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* ********************* */}
                {/* Contact */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Contact</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className={`customFormControl ${
                        isUnitDataLoading || viewDetail
                          ? ""
                          : contact?.trim() !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="contact"
                      type="text"
                      value={contact}
                      maxLength={42}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail}

                      onInput={(e) => {
                        setContact(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* ********************* */}
                {/* Contact Phone */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Contact Phone</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0 w-100px">
                    <input
                      className={`customFormControl ${
                        viewDetail || isUnitDataLoading
                          ? ""
                          : contactPhone !== "" && contactPhone?.length === 14
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="contactPhone"
                      type="text"
                      maxLength={14}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={contactPhone}
                      disabled={viewDetail}
                      onChange={(e) => contactPhoneFormatHandler(e)}
                      onInput={(e) => {
                        setContactPhone(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* ********************* */}
            <div className="mt-5">
              <Row>
                <Col xs={3}>
                  {/* Open Sunday */}
                  <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Open Sunday</Form.Label>
                    </Col>

                    <Col
                      xs={2}
                      style={{ marginLeft: "88px" }}
                      className="p-0 d-flex align-items-center h-25px "
                    >
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${daysValidation ? "" : "borderRed"}`}
                        name="openSunday"
                        value={openSunday}
                        checked={openSunday}
                        disabled={viewDetail}
                        onChange={(e) => setOpenSunday(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  {/* ********************* */}

                  {/* Open Monday */}
                  <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Open Monday</Form.Label>
                    </Col>
                    <Col
                      xs={2}
                      style={{ marginLeft: "88px" }}
                      className="p-0 d-flex align-items-center h-25px "
                    >
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${daysValidation ? "" : "borderRed"}`}
                        disabled={viewDetail}
                        name="openMonday"
                        value={openMonday}
                        checked={openMonday}
                        onChange={(e) => setOpenMonday(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  {/* ********************* */}

                  {/* Open Tuesday */}
                  <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Open Tuesday</Form.Label>
                    </Col>
                    <Col
                      xs={2}
                      style={{ marginLeft: "88px" }}
                      className="p-0 d-flex align-items-center h-25px "
                    >
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${daysValidation ? "" : "borderRed"}`}
                        disabled={viewDetail}
                        name="openTuesday"
                        value={openTuesday}
                        checked={openTuesday}
                        onChange={(e) => setOpenTuesday(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  {/* ********************* */}

                  {/* Open Wednesday */}
                  <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Open Wednesday</Form.Label>
                    </Col>
                    <Col
                      xs={2}
                      style={{ marginLeft: "88px" }}
                      className="p-0 d-flex align-items-center h-25px "
                    >
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${daysValidation ? "" : "borderRed"}`}
                        disabled={viewDetail}
                        name="openWednesday"
                        value={openWednesday}
                        checked={openWednesday}
                        onChange={(e) => setOpenWednesday(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  {/* ********************* */}

                  {/* Open Thursday */}
                  <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Open Thursday</Form.Label>
                    </Col>
                    <Col
                      xs={2}
                      style={{ marginLeft: "88px" }}
                      className="p-0 d-flex align-items-center h-25px "
                    >
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${daysValidation ? "" : "borderRed"}`}
                        disabled={viewDetail}
                        name="openThursday"
                        value={openThursday}
                        checked={openThursday}
                        onChange={(e) => setOpenThursday(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  {/* ********************* */}

                  {/* Open Friday */}
                  <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Open Friday</Form.Label>
                    </Col>
                    <Col
                      xs={2}
                      style={{ marginLeft: "88px" }}
                      className="p-0 d-flex align-items-center h-25px "
                    >
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${daysValidation ? "" : "borderRed"}`}
                        disabled={viewDetail}
                        name="openFriday"
                        value={openFriday}
                        checked={openFriday}
                        onChange={(e) => setOpenFriday(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  {/* ********************* */}

                  {/* Open Saturday */}
                  <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Open Saturday</Form.Label>
                    </Col>
                    <Col
                      xs={2}
                      style={{ marginLeft: "88px" }}
                      className="p-0 d-flex align-items-center h-25px "
                    >
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${daysValidation ? "" : "borderRed"}`}
                        disabled={viewDetail}
                        name="openSaturday"
                        value={openSaturday}
                        checked={openSaturday}
                        onChange={(e) => setOpenSaturday(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  {/* ********************* */}
                </Col>
                <Col xs={3}>
                  <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}></Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl`}
                        type="text"
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  {/* ********************* */}
                  {/* Drivers Email-Hours */}
                  <Form.Group className="mt-2 align-items-center   m-l-0 m-r-0 ms-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel mb-1`}>Drivers Email-Hours</Form.Label>
                    </Col>

                    <Col sm={12} md={12} className="p-0 ">
                      <textarea
                        rows={11}
                        cols={24}

                        className={`customFormControl h-100`}
                        type="text"
                        autoComplete="off"
                        aria-autocomplete="list"
                        name="hours"
                        value={hours}
                        disabled={viewDetail}
                        onInput={(e) => {
                          let value = e.target.value;
                          if (value !== "") {
                            if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                              value = value.substring(1);
                            }
                          }
                          setHours(value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  {/* ********************* */}
                </Col>
                <Col xs={3}>
                  <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}></Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl`}
                        type="text"
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>
                  {/* ********************* */}
                  {/* Drivers Email-Direction */}
                  <Form.Group className="mt-2 align-items-center   m-l-0 m-r-0 ms-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`customColFormLabel mb-1`}>Drivers Email-Directions</Form.Label>
                    </Col>

                    <Col sm={12} md={12} className="p-0 ">
                      <textarea
                        rows={11}
                        cols={24}

                        className={`customFormControl h-100`}
                        type="text"
                        autoComplete="off"
                        aria-autocomplete="list"
                        name="directions"
                        value={directions}
                        disabled={viewDetail}
                        onInput={(e) => {
                          let value = e.target.value;
                          if (value !== "") {
                            if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                              value = value.substring(1);
                            }
                          }
                          setDirections(value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default MiscPickup;
