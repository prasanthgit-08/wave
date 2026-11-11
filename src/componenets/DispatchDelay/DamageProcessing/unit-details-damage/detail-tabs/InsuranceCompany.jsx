import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import CommonFooter from "../../../../common/CommonFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  setClaimsVO,
  setInsuranceAddress1,
  setInsuranceName,
  setInsuranceState,
  setshowInsuranceCompany,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import * as yup from "yup";

const InsuranceCompany = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  // const [insuranceName, setInsuranceName] = useState("");
  // const [insuranceAddress1, setInsuranceAddress1] = useState("");
  const [insuranceAddress2, setInsuranceAddress2] = useState("");
  const [insuranceCity, setInsuranceCity] = useState("");
  // const [insuranceState, setInsuranceState] = useState("");
  const [insurancePostal, setInsurancePostal] = useState("");
  const [insurancePhone, setInsurancePhone] = useState("");
  const [insuranceFax, setInsuranceFax] = useState("");
  const [insuranceEmail, setInsuranceEmail] = useState("");
  const [insuranceContact, setInsuranceContact] = useState("");
  const claimsTabData = useSelector((state) => state.delayDamage.claimsTabData);
  const viewDetail = useSelector((state) => state.delayDamage.viewDetail);
  const claimsVO = useSelector((state) => state.delayDamage.claimsVO);

  const insuranceName = useSelector((state) => state.delayDamage.insuranceName);
  const insuranceAddress1 = useSelector((state) => state.delayDamage.insuranceAddress1);
  const insuranceState = useSelector((state) => state.delayDamage.insuranceState);
  const [insuranceCanadian, setInsuranceCanadian] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState("");
  const [responciblePartyCustomerAddressFK, setResponciblePartyCustomerAddressFK] = useState(null);
  const [insuranceCustomerAddressFK, setInsuranceCustomerAddressFK] = useState(null);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);

  const handleSave = () => {
    dispatch(setshowInsuranceCompany(false));
  };

  const handleCancel = () => {
    dispatch(setshowInsuranceCompany(false));
    dispatch(setInsuranceName(""));
    dispatch(setInsuranceAddress1(""));
    setInsuranceAddress2("");
    setInsuranceCity("");
    setInsuranceCanadian("");
    dispatch(setInsuranceState(""));
    setInsurancePostal("");
    setInsurancePhone("");
    setInsuranceFax("");
    setInsuranceEmail("");
    setInsuranceContact("");
    setPostalCodePK(null);
  };

  const buttons = [
    {
      label: "save",
      onClick: () => handleSave(),
      className: viewDetail ? "invisible" : "",
      disabled: viewDetail || claimsTabData?.InsuranceCompany,
    },
    {
      label: "cancel",
      onClick: () => handleCancel(),
      className: viewDetail ? "invisible" : "",
      hidden: claimsTabData?.InsuranceCompany ? true : false,
    },
  ];
  /******
   * Save button Validation for Insurance Company
   ******/
  useEffect(() => {
    if (
      insuranceName &&
      insuranceAddress1 &&
      (!insurancePhone || (insurancePhone?.match(phoneRegex) && insurancePhone?.length === 14)) &&
      postalCodePK &&
      (!insuranceFax || (insuranceFax?.length === 14 && insuranceFax?.match(phoneRegex))) &&
      postalCodePK &&
      (!insuranceEmail ||
        insuranceEmail?.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [insuranceName, insuranceAddress1, insurancePhone, insuranceFax, insuranceEmail]);
  /***Set the Insurance Compaby Data****/
  const insuranceCompanyData = () => {
    dispatch(
      setClaimsVO({
        ...claimsVO,
        InsuranceCompanyName: insuranceName,
        InsuranceCompanyAddress1: insuranceAddress1,
        InsuranceCompanyAddress2: insuranceAddress2,
        InsuranceCompanyCity: insuranceCity,
        InsuranceCompanyStateCode: insuranceState,
        InsuranceCompanyPostCode: insurancePostal,
        InsuranceCompanyPhone: insurancePhone?.replace(/\s+/g, ""),
        InsuranceCompanyFax: insuranceFax?.replace(/\s+/g, ""),
        InsuranceCompanyEmail: insuranceEmail,
        InsuranceCompanyContact: insuranceContact,
        InsuranceCompanyCanadian: insuranceCanadian ? 1 : 0,
      })
    );
  };

  useEffect(() => {
    insuranceCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    insuranceName,
    insuranceAddress1,
    insuranceAddress2,
    insuranceCity,
    insuranceState,
    insurancePostal,
    insurancePhone,
    insuranceFax,
    insuranceEmail,
    insuranceContact,
    insuranceCanadian,
  ]);

  /*****Get the details to populate in the Model Pop Up*****/
  useEffect(() => {
    if (claimsTabData !== null) {
      setInsuranceCustomerAddressFK(
        claimsTabData.InsuranceCustomerAddressFK ? claimsTabData.InsuranceCustomerAddressFK : null
      );
      setInsuranceName(claimsTabData.Insurance_Name ? claimsTabData.Insurance_Name : "");
      setInsuranceAddress1(claimsTabData.Insurance_Address1 ? claimsTabData.Insurance_Address1 : "");
      setInsuranceAddress2(claimsTabData.Insurance_Address2 ? claimsTabData.Insurance_Address2 : "");
      setInsuranceCity(claimsTabData.Insurance_City ? claimsTabData.Insurance_City : "");
      setInsuranceState(claimsTabData.Insurance_Statecode ? claimsTabData.Insurance_Statecode : "");
      setInsurancePostal(claimsTabData.Insurance_PostalCode ? claimsTabData.Insurance_PostalCode : "");
      setInsurancePhone(claimsTabData.Insurance_Phone ? claimsTabData.Insurance_Phone?.trim() : "");
      setInsuranceFax(claimsTabData.Insurance_FAX ? claimsTabData.Insurance_FAX : "");
      setInsuranceEmail(claimsTabData.Insurance_Email ? claimsTabData.Insurance_Email : "");
      setInsuranceContact(claimsTabData.Insurance_Contact ? claimsTabData.Insurance_Contact : "");
    }
  }, [claimsTabData]);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setInsurancePhone(formattedPhoneNumber);
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setInsuranceFax(formattedPhoneNumber);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} className="quarterScreenModal">
      <Modal.Body>
        <QuarterScreenWrapper>
          <Header closeHandler={onHide} preventNavigation />
          {/* form content */}

          <div className="w-100 p-2">
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Row>
                    <Col sm={2} md={2} xs={2}></Col>
                    <Col sm={10} md={10} xs={10}>
                      <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={4} md={4} xs={4}>
                          <Form.Label className="col-form-label mt-4">Insurance Party</Form.Label>
                        </Col>
                        <Col sm={8} md={8} xs={8}></Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}>
                          <Form.Label className="col-form-label mt-1">Name</Form.Label>
                        </Col>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            maxLength={30}
                            disabled={viewDetail || claimsTabData?.InsuranceCompany}
                            value={insuranceName}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              dispatch(setInsuranceName(e.target.value));
                            }}
                            className={`customFormControl ${
                              viewDetail || claimsTabData?.InsuranceCompany
                                ? "borderBlack"
                                : insuranceName
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}>
                          <Form.Label className="col-form-label mt-1">Address</Form.Label>
                        </Col>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <input
                            type="text"
                            id="ad1"
                            name="ad1"
                            maxLength={30}
                            disabled={viewDetail || claimsTabData?.InsuranceCompany}
                            value={insuranceAddress1}
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              dispatch(setInsuranceAddress1(e.target.value));
                            }}
                            className={`customFormControl ${
                              viewDetail || claimsTabData?.InsuranceCompany
                                ? "borderBlack"
                                : insuranceAddress1
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}></Col>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <input
                            type="text"
                            className={`customFormControl`}
                            id="ad2"
                            name="ad2"
                            maxLength={30}
                            value={insuranceAddress2}
                            disabled={viewDetail || claimsTabData?.InsuranceCompany}
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              setInsuranceAddress2(e.target.value);
                            }}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <PostalCodeComponent
                        labelColNumber={2}
                        hideLabel={true}
                        disabled={viewDetail || claimsTabData?.InsuranceCompany}
                        postalCode={insurancePostal}
                        stateCode={insuranceState}
                        city={insuranceCity}
                        setCity={setInsuranceCity}
                        setStateCode={(value) => dispatch(setInsuranceState(value))}
                        setPostalCode={setInsurancePostal}
                        setPostalValues={setPostalValues}
                        postalOptions={postalOptions}
                        postalCodePK={postalCodePK}
                        setPostalCodePK={setPostalCodePK}
                        canadian={insuranceCanadian}
                        setCanadian={setInsuranceCanadian}
                      />

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}>
                          <Form.Label className="col-form-label mt-1">Phone</Form.Label>
                        </Col>
                        <Col sm={2} md={2} xs={2} className="p-0">
                          <input
                            type="text"
                            className={`${"customFormControl"} ${
                              viewDetail || !insurancePhone
                                ? ""
                                : insurancePhone?.length !== 14
                                  ? "borderRed"
                                  : "borderGreen"
                            }`}
                            id="phone"
                            name="phone"
                            maxLength={30}
                            value={insurancePhone}
                            disabled={viewDetail || claimsTabData?.InsuranceCompany}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => phoneFormatHandler(e)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}>
                          <Form.Label className="col-form-label mt-1">FAX</Form.Label>
                        </Col>
                        <Col sm={2} md={2} xs={2} className="p-0">
                          <input
                            type="text"
                            className={`${"customFormControl"} ${
                              viewDetail || !insuranceFax
                                ? ""
                                : insuranceFax?.length !== 14
                                  ? "borderRed"
                                  : "borderGreen"
                            }`}
                            id="fax"
                            name="fax"
                            maxLength={30}
                            value={insuranceFax}
                            disabled={viewDetail || claimsTabData?.InsuranceCompany}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => faxFormatHandler(e)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}>
                          <Form.Label className="col-form-label mt-1">Email</Form.Label>
                        </Col>
                        <Col sm={8} md={8} xs={8} className="p-0">
                          <input
                            type="text"
                            className={`${
                              viewDetail || !insuranceEmail
                                ? ""
                                : /^[a-zA-Z0-9_.\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,4}$/.test(insuranceEmail)
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                            id="email"
                            name="emial"
                            maxLength={30}
                            value={insuranceEmail}
                            disabled={viewDetail || claimsTabData?.InsuranceCompany}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              setInsuranceEmail(e.target.value);
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}>
                          <Form.Label className="col-form-label mt-1">Contact</Form.Label>
                        </Col>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <input
                            type="text"
                            id="contact"
                            name="contact"
                            maxLength={30}
                            value={insuranceContact}
                            disabled={viewDetail || claimsTabData?.InsuranceCompany}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              setInsuranceContact(e.target.value);
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>

          <CommonFooter buttons={buttons} />
        </QuarterScreenWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default InsuranceCompany;
