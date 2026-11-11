import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";
import QuarterScreenWrapper from "../../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../../common/Header";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import CommonFooter from "../../../../../common/CommonFooter";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import {
  setClaimsVO,
  setEditSaveFormData,
  setInsuranceAddress1,
  setInsuranceName,
  setInsuranceState,
  setIsInsuranceClear,
  setshowInsuranceCompany,
} from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import { emailRegex } from "../../../../../../utils/validation/EmailRegex";
import { useNavigate, useParams } from "react-router-dom";

const InsuranceCompany = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const { damageFK } = useParams();
  const [insuranceAddress2, setInsuranceAddress2] = useState("");
  const [insuranceCity, setInsuranceCity] = useState("");
  const [insurancePostal, setInsurancePostal] = useState("");
  const [insurancePhone, setInsurancePhone] = useState("");
  const [insuranceFax, setInsuranceFax] = useState("");
  const [insuranceEmail, setInsuranceEmail] = useState("");
  const [insuranceContact, setInsuranceContact] = useState("");
  const [insuranceCanadian, setInsuranceCanadian] = useState(false);
  const claimsTabData = useSelector((state) => state.damageReducer.claimsTabData);
  const insuranceName = useSelector((state) => state.damageReducer.insuranceName);
  const insuranceAddress1 = useSelector((state) => state.damageReducer.insuranceAddress1);
  const insuranceState = useSelector((state) => state.damageReducer.insuranceState);
  const claimsVO = useSelector((state) => state.damageReducer.claimsVO);
  const [disableSave, setDisableSave] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState("");
  const [responciblePartyCustomerAddressFK, setResponciblePartyCustomerAddressFK] = useState(null);
  const [insuranceCustomerAddressFK, setInsuranceCustomerAddressFK] = useState(null);
  const isInsuranceClear = useSelector((state) => state.damageReducer.isInsuranceClear);

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);

  const handleSave = () => {
    dispatch(setshowInsuranceCompany(false));
  };
  const handleCancel = () => {
    dispatch(setIsInsuranceClear(true));
    dispatch(setshowInsuranceCompany(false));
  };

  /******Clear the states if the insurance is unchecked*****/
  useEffect(() => {
    if (isInsuranceClear) {
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
      dispatch(setIsInsuranceClear(false));
    }
  }, [isInsuranceClear]);

  const buttons = [
    {
      label: "Save",
      onClick: () => handleSave(),
      disabled: disableSave || claimsTabData?.InsuranceCompany,
    },
    {
      label: "Cancel",
      onClick: () => handleCancel(),
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
      (!insuranceFax || (insuranceFax?.length === 14 && insuranceFax?.match(phoneRegex))) &&
      postalCodePK &&
      (!insuranceEmail || insuranceEmail?.match(emailRegex))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [insuranceName, insuranceAddress1, insurancePhone, insuranceFax, insuranceEmail, postalCodePK]);

  /***Set the Insurance Compaby Data****/
  const insuranceCompanyData = () => {
    dispatch(
      setClaimsVO({
        ...claimsVO,
        insuranceCompanyName: insuranceName,
        insuranceCompanyAddress1: insuranceAddress1,
        insuranceCompanyAddress2: insuranceAddress2,
        insuranceCompanyCity: insuranceCity,
        insuranceCompanyStateCode: insuranceState,
        insuranceCompanyPostCode: insurancePostal,
        insuranceCompanyPhone: insurancePhone?.replace(/\s+/g, ""),
        insuranceCompanyFax: insuranceFax?.replace(/\s+/g, ""),
        insuranceCompanyEmail: insuranceEmail,
        insuranceCompanyContact: insuranceContact,
        insuranceCompanyCanadian: insuranceCanadian ? 1 : 0,
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
        claimsTabData?.InsuranceCustomerAddressFK ? claimsTabData.InsuranceCustomerAddressFK : null
      );
      dispatch(setInsuranceName(claimsTabData?.Insurance_Name ? claimsTabData.Insurance_Name : ""));
      dispatch(
        setInsuranceAddress1(claimsTabData?.Insurance_Address1 ? claimsTabData.Insurance_Address1 : "")
      );
      setInsuranceAddress2(claimsTabData?.Insurance_Address2 ? claimsTabData.Insurance_Address2 : "");
      setInsuranceCity(claimsTabData?.Insurance_City ? claimsTabData.Insurance_City : "");
      dispatch(
        setInsuranceState(claimsTabData?.Insurance_Statecode ? claimsTabData.Insurance_Statecode : "")
      );
      setInsurancePostal(claimsTabData?.Insurance_PostalCode ? claimsTabData.Insurance_PostalCode : "");
      setInsurancePhone(
        claimsTabData?.Insurance_Phone ? formatPhoneNumber(claimsTabData.Insurance_Phone) : ""
      );
      setInsuranceFax(claimsTabData?.Insurance_FAX ? formatPhoneNumber(claimsTabData.Insurance_FAX) : "");
      setInsuranceEmail(claimsTabData?.Insurance_Email ? claimsTabData.Insurance_Email?.trim() : "");
      setInsuranceContact(claimsTabData?.Insurance_Contact ? claimsTabData.Insurance_Contact : "");
      setPostalCodePK(claimsTabData?.Insurance_PostalCode);
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
  const handleClose = () => {
    dispatch(setIsInsuranceClear(true));
    onHide(); // closes modal
    navigate(`/damage-processing/edit-damage/${damageFK}`);
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="quarterScreenModal">
      <Modal.Body>
        <QuarterScreenWrapper>
          <Header closeHandler={handleClose} />
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
                            disabled={claimsTabData?.InsuranceCompany}
                            value={insuranceName}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              dispatch(setInsuranceName(e.target.value));
                            }}
                            className={`customFormControl ${
                              claimsTabData?.InsuranceCompany
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
                            disabled={claimsTabData?.InsuranceCompany}
                            value={insuranceAddress1}
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              dispatch(setInsuranceAddress1(e.target.value));
                            }}
                            className={`customFormControl ${
                              claimsTabData?.InsuranceCompany
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
                            disabled={claimsTabData?.InsuranceCompany}
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
                        disabled={claimsTabData?.InsuranceCompany}
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
                              !insurancePhone
                                ? ""
                                : formatPhoneNumber(insurancePhone).length === 14
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                            id="phone"
                            name="phone"
                            maxLength={30}
                            value={insurancePhone}
                            disabled={claimsTabData?.InsuranceCompany}
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
                              !insuranceFax
                                ? ""
                                : formatPhoneNumber(insuranceFax).length === 14
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                            id="fax"
                            name="fax"
                            maxLength={30}
                            value={insuranceFax}
                            disabled={claimsTabData?.InsuranceCompany}
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
                            className={`customFormControl ${
                              !insuranceEmail
                                ? ""
                                : insuranceEmail?.match(emailRegex)
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                            id="email"
                            name="emial"
                            maxLength={70}
                            value={insuranceEmail}
                            disabled={claimsTabData?.InsuranceCompany}
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
                            disabled={claimsTabData?.InsuranceCompany}
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
