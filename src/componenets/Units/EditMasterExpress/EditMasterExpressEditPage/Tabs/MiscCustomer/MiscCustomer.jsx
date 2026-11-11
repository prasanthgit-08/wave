import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import {
  setIsMiscCustomerTabValid,
  setEditedUnitDataToSaveForMiscCustomerTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";

function MiscCustomer({ styles }) {
  const dispatch = useDispatch();
  //Local State - Start
  const [customerAddressPK, setCustomerAddressPK] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [quickPayTerms, setQuickPayTerms] = useState("");

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [zipIdChcek, setZipIdCheck] = useState("");

  //Local State - End

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const postalCodeOnChange = useSelector((state) => state.editMasterExpressTabsReducer.postalCodeOnChange);

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setCustomerAddressPK(selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.customerAddressPK || "");
      setName(selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerName?.trim() || "");
      setAddress1(selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerAddress1?.trim() || "");
      setAddress2(
        selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerAddress2 !== null
          ? selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerAddress2?.trim()
          : ""
      );
      setPostalCode(
        selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerPostalCode?.trim() || ""
      );

      //  setCity(selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerCity?.trim() || "");
      setCity(
        selectedUnitData
          ? selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerCity?.trim() || ""
          : ""
      );
      setStateCode(
        selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerStateCode?.trim() || ""
      );
      setCanadian(selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerCanadian || false);
      setPostalCodePK(
        selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerPostalCodeFK || null
      );
      initialValue[0].city =
        selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerCity?.trim() || "";
      initialValue[0].statecode =
        selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerStateCode?.trim() || "";
      initialValue[0].postalcode =
        selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerPostalCode?.trim() || "";
      setPostalValues(initialValue);
      setPhone(
        formatPhoneNumber(selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerPhone?.trim()) ||
          ""
      );
      setFax(
        formatPhoneNumber(selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerFax?.trim()) ||
          ""
      );
      setEmail(selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerEmail?.trim() || "");
      setContact(selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerContact?.trim() || "");
      setQuickPayTerms(
        selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.miscCustomerQuickPayTerms?.trim() || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitData, viewDetail]);

  // Field Validation - Start
  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/gm;
  const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    email: yup.string().matches(emailRegex),
  });

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };

  // Field Validation - End

  //Misc Customer Tab Validation
  useEffect(() => {
    if (
      name !== "" &&
      address1 !== "" &&
      !postalCodeOnChange &&
      postalCodePK != null &&
      phone !== "" &&
      phone.match(phoneRegex) &&
      (fax === "" || fax.match(phoneRegex)) &&
      (email === "" || (email !== "" && email.match(emailRegex))) &&
      contact !== "" &&
      ((selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.quickPayCustomer && quickPayTerms !== "") ||
        (!selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.quickPayCustomer && quickPayTerms === ""))
    ) {
      dispatch(setIsMiscCustomerTabValid(true));
    } else {
      dispatch(setIsMiscCustomerTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, address1, postalCodePK, phone, fax, email, contact, quickPayTerms, postalCodeOnChange]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForMiscCustomerTab({
        customerAddressPK: customerAddressPK,
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        canadian: canadian,
        phone: phone.replace(/\s+/g, ""),
        email: email,
        contact: contact,
        fax: fax.replace(/\s+/g, ""),
        quickPayTerms: quickPayTerms,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    customerAddressPK,
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
    fax,
    quickPayTerms,
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
          <div className="pt-1 ps-2 w-100">
            <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0"></Form.Group>

            <p>Miscellaneous Customer</p>
            <Row>
              <Col xs={7}>
                {/* ********************* */}
                {/* Name */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
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
                {/* Address-1*/}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
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
                {/* Address-2*/}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
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
                  className={"postalCodeRefSeco"}
                />
                {/* ********************* */}
                {/* Phone */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
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
                {/* Fax */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>FAX</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0 w-100px">
                    <input
                      className={`customFormControl ${
                        viewDetail || isUnitDataLoading || fax === ""
                          ? ""
                          : fax.match(phoneRegex)
                            ? ""
                            : "borderRed"
                      }`}
                      name="fax"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={fax}
                      disabled={viewDetail}
                      maxLength={14}
                      onChange={(e) => faxFormatHandler(e)}
                      onInput={(e) => {
                        setFax(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/* Email */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
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
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Contact</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className={`customFormControl ${
                        isUnitDataLoading || viewDetail
                          ? ""
                          : contact?.trim() !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      type="contact"
                      name="contact"
                      maxLength={42}
                      value={contact}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail}
                      onInput={(e) => {
                        let value = e.target.value;
                        if (value !== "") {
                          if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                            value = value.substring(1);
                          }
                        }
                        setContact(value);
                      }}
                    />
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/* Quick Pay Terms */}
                {selectedUnitData?.editMasterExpressMiscCustomerTabDTO?.quickPayCustomer && (
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Quick Pay Terms</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        className={`customFormControl ${
                          isUnitDataLoading || viewDetail
                            ? ""
                            : quickPayTerms?.trim() !== ""
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        type="quickPayTerms"
                        name="quickPayTerms"
                        maxLength={30}
                        value={quickPayTerms}
                        disabled={viewDetail}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          let value = e.target.value;
                          if (value !== "") {
                            if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                              value = value.substring(1);
                            }
                          }
                          setQuickPayTerms(value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                )}
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default MiscCustomer;
