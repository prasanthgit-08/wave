import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import { Formik } from "formik";
import * as yup from "yup";
import {
  setIsMiscDeliveryTabValid,
  setEditedUnitDataToSaveForMiscDeliveryTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";

const MiscDeliveryTabColumn1 = ({ styles }) => {
  const dispatch = useDispatch();

  //Local State
  const [miscDeliveryDealerPK, setMiscDeliveryDealerPK] = useState("");
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

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [postalCodePK, setPostalCodePK] = useState(null);

  const [zipIdChcek, setZipIdCheck] = useState("");

  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData !== null) {
      setMiscDeliveryDealerPK(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerPK || ""
      );
      setName(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerName?.trim() || ""
      );
      setAddress1(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerAddress1?.trim() ||
          ""
      );
      setAddress2(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerAddress2 !== null
          ? selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerAddress2?.trim()
          : ""
      );
      setPostalCode(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerPostalCode?.trim() ||
          ""
      );
      setCity(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerCity?.trim() || ""
      );
      setStateCode(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerStateCode?.trim() ||
          ""
      );
      setCanadian(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerCanadian || false
      );
      setPostalCodePK(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerPostalCodeFK || null
      );
      initialValue[0].city =
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerCity?.trim() || "";
      initialValue[0].statecode =
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerStateCode?.trim() ||
        "";
      initialValue[0].postalcode =
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerPostalCode?.trim() ||
        "";
      setPostalValues(initialValue);
      setPhone(
        formatPhoneNumber(
          selectedUnitData.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerPhone
        ) || ""
      );
      setEmail(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerEmail?.trim() || ""
      );
      setContact(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerContact?.trim() ||
          ""
      );
      setContactPhone(
        formatPhoneNumber(
          selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerContactPhone
        ) || ""
      );
      setOpenSunday(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.openSunday || false);
      setOpenMonday(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.openMonday || false);
      setOpenTuesday(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.openTuesday || false);
      setOpenWednesday(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.openWednesday || false);
      setOpenThursday(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.openThursday || false);
      setOpenFriday(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.openFriday || false);
      setOpenSaturday(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.openSaturday || false);
      setHours(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.hours?.trim() || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitData, viewDetail]);

  // Field Validation - Start
  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/gm;
  const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  const notCanadianPostalCode = /^((\d{5}-\d{4})|(\d{5}))$/;
  const canadianPostalCode = /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/;

  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    email: yup.string().matches(emailRegex),
  });

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const contactPhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setContactPhone(formattedPhoneNumber);
  };

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
      contactPhone.match(phoneRegex)
    ) {
      dispatch(setIsMiscDeliveryTabValid(true));
    } else {
      dispatch(setIsMiscDeliveryTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, address1, postalCodePK, phone, email, contact, contactPhone]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForMiscDeliveryTab({
        unitAddressPK: miscDeliveryDealerPK,
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
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    miscDeliveryDealerPK,
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
        <Col xs={5} className="ps-3 m-l-2">
          <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0"></Form.Group>
          <p>Miscellaneous Delivery Dealer</p>
          <Form.Group className="mt-1 align-items-center row invisible m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Name</Form.Label>
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
          {/* Name */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Name</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl ${
                  isUnitDataLoading || viewDetail ? "" : name?.trim() !== "" ? "borderGreen" : "borderRed"
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
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl ${
                  isUnitDataLoading || viewDetail ? "" : address1?.trim() !== "" ? "borderGreen" : "borderRed"
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
          {/* Address -2 */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
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
            className={"postalCodeRefThird"}
            stateInputWidth={"60px"}
            cityInputWidth={"260px"}
          />
          {/* ********************* */}
          {/* Phone */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Phone</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
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
            <Col xs={8} md={8} sm={8} className="p-0">
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
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl ${
                  isUnitDataLoading || viewDetail ? "" : contact?.trim() !== "" ? "borderGreen" : "borderRed"
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
            <Col xs={2} md={2} sm={2} className="p-0">
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

          <Form.Group className="mt-4 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          {/* ********************* */}
          <div className="">
            <Row>
              <Col xs={5}>
                {/* Open Sunday */}
                <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                  <Col sm={6} md={6} xs={6} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Open Sunday</Form.Label>
                  </Col>
                  {/* <Col xs={2} style={{ marginLeft: "50px" }} className="p-0 d-flex align-items-center h-25px "> */}
                  <Col
                    xs={2}
                    style={{ marginLeft: "35px" }}
                    className="p-0 d-flex align-items-center h-25px "
                  >
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
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
                  <Col sm={6} md={6} xs={6} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Open Monday</Form.Label>
                  </Col>
                  <Col
                    xs={2}
                    style={{ marginLeft: "35px" }}
                    className="p-0 d-flex align-items-center h-25px "
                  >
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
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
                  <Col sm={6} md={6} xs={6} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Open Tuesday</Form.Label>
                  </Col>
                  <Col
                    xs={2}
                    style={{ marginLeft: "35px" }}
                    className="p-0 d-flex align-items-center h-25px "
                  >
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
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
                  <Col sm={6} md={6} xs={6} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Open Wednesday</Form.Label>
                  </Col>
                  <Col
                    xs={2}
                    style={{ marginLeft: "35px" }}
                    className="p-0 d-flex align-items-center h-25px "
                  >
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
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
                  <Col sm={6} md={6} xs={6} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Open Thursday</Form.Label>
                  </Col>
                  <Col
                    xs={2}
                    style={{ marginLeft: "35px" }}
                    className="p-0 d-flex align-items-center h-25px "
                  >
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
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
                  <Col sm={6} md={6} xs={6} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Open Friday</Form.Label>
                  </Col>
                  <Col
                    xs={2}
                    style={{ marginLeft: "35px" }}
                    className="p-0 d-flex align-items-center h-25px "
                  >
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
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
                  <Col sm={6} md={6} xs={6} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Open Saturday</Form.Label>
                  </Col>
                  <Col
                    xs={2}
                    style={{ marginLeft: "35px" }}
                    className="p-0 d-flex align-items-center h-25px "
                  >
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      disabled={viewDetail}
                      name="openSaturday"
                      value={openSaturday}
                      checked={openSaturday}
                      onChange={(e) => setOpenSaturday(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
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
                <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
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
                {/*  Drivers Email-Hours */}
                <Form.Group className="mt-4 align-items-center   m-l-0 m-r-0 ms-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className={`customColFormLabel mb-1`}>Drivers Email - Hours</Form.Label>
                  </Col>
                  <Col xs={12} className="p-0">
                    <textarea
                      rows={5}
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
              </Col>
            </Row>
          </div>
        </Col>
      )}
    </Formik>
  );
};

export default MiscDeliveryTabColumn1;
