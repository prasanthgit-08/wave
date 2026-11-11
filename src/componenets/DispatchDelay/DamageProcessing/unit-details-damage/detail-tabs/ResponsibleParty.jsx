import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import CommonFooter from "../../../../common/CommonFooter";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  setClaimsVO,
  setResponcibleAddress1,
  setResponcibleName,
  setResponcibleState,
  setShowResponsibleParty,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import { useNavigate, useParams } from "react-router-dom";

const ResponsibleParty = ({ show, onHide }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const params = useParams();
  const id = params.id;
  /******Responsible Name,Address field ******/
  const [responsibleAddress2, setResponcibleAddress2] = useState("");
  const [responcibleCity, setResponcibleCity] = useState("");
  const [responciblePostal, setResponciblePostal] = useState("");
  const [responciblePhone, setResponciblePhone] = useState("");
  const [responcibleFax, setResponcibleFax] = useState("");
  const [responcibleEmail, setResponcibleEmail] = useState("");
  const [responsibleContact, setResponcibleContact] = useState("");
  const [responsibleCanadian, setResponcibleCanadian] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState("");
  const [responciblePartyCustomerAddressFK, setResponciblePartyCustomerAddressFK] = useState(null);
  const [insuranceCustomerAddressFK, setInsuranceCustomerAddressFK] = useState(null);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const claimsTabData = useSelector((state) => state.delayDamage.claimsTabData);
  const viewDetail = useSelector((state) => state.delayDamage.viewDetail);
  const claimsVO = useSelector((state) => state.delayDamage.claimsVO);
  const responcibleName = useSelector((state) => state.delayDamage.responcibleName);
  const responcibleAddress1 = useSelector((state) => state.delayDamage.responcibleAddress1);
  const responcibleState = useSelector((state) => state.delayDamage.responcibleState);

  const handleSave = () => {
    dispatch(setShowResponsibleParty(false));
  };

  const handleCancel = () => {
    dispatch(setShowResponsibleParty(false));
    dispatch(setResponcibleName(""));
    dispatch(setResponcibleAddress1(""));
    setResponcibleAddress2("");
    setResponcibleCity("");
    setResponcibleCanadian("");
    dispatch(setResponcibleState(""));
    setResponciblePostal("");
    setResponciblePhone("");
    setResponcibleFax("");
    setResponcibleEmail("");
    setResponcibleContact("");
    setPostalCodePK(null);
  };

  /******
   * Save button Validation
   ******/
  useEffect(() => {
    if (
      responcibleName &&
      responcibleAddress1 &&
      (!responciblePhone || (responciblePhone?.match(phoneRegex) && responciblePhone?.length === 14)) &&
      (!responcibleFax || (responcibleFax?.length === 14 && responcibleFax?.match(phoneRegex))) &&
      postalCodePK &&
      (!responcibleEmail ||
        responcibleEmail?.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    responcibleName,
    responcibleAddress1,
    responciblePhone,
    responcibleFax,
    responcibleEmail,
    postalCodePK,
  ]);

  const buttons = [
    {
      label: "save",
      onClick: () => handleSave(),
      className: viewDetail ? "invisible" : "",
      disabled: viewDetail || claimsTabData?.ResponcibleParty || disableSave,
    },
    {
      label: "cancel",
      onClick: () => handleCancel(),
      className: viewDetail ? "invisible" : "",
      hidden: claimsTabData?.ResponcibleParty ? true : false,
    },
  ];
  useEffect(() => {
    if (claimsTabData !== null) {
      setResponciblePartyCustomerAddressFK(
        claimsTabData?.ResponciblePartyCustomerAddressFK
          ? claimsTabData?.ResponciblePartyCustomerAddressFK
          : ""
      );
      setInsuranceCustomerAddressFK(
        claimsTabData?.InsuranceCustomerAddressFK ? claimsTabData?.InsuranceCustomerAddressFK : null
      );
      setResponcibleName(claimsTabData?.Responsible_Name ? claimsTabData?.Responsible_Name : "");
      setResponcibleAddress1(claimsTabData?.Responsible_Address1 ? claimsTabData?.Responsible_Address1 : "");
      setResponcibleAddress1(claimsTabData?.Responsible_Address2 ? claimsTabData?.Responsible_Address2 : "");
      setResponcibleCity(claimsTabData?.Responsible_City ? claimsTabData?.Responsible_City : "");
      setResponcibleState(claimsTabData?.Responsible_Statecode ? claimsTabData?.Responsible_Statecode : "");
      setResponciblePostal(
        claimsTabData?.Responsible_PostalCode ? claimsTabData?.Responsible_PostalCode : ""
      );
      setResponciblePhone(claimsTabData?.Responsible_Phone ? claimsTabData?.Responsible_Phone?.trim() : "");
      setResponcibleFax(claimsTabData?.Responsible_FAX ? claimsTabData?.Responsible_FAX : "");
      setResponcibleEmail(claimsTabData?.Responsible_Email ? claimsTabData?.Responsible_Email : "");
      setResponcibleContact(claimsTabData?.Responsible_Contact ? claimsTabData?.Responsible_Contact : "");
    }
  }, [claimsTabData]);

  /***Set the Insurance Compaby Data****/
  const responcibleCompanyData = () => {
    dispatch(
      setClaimsVO({
        ...claimsVO,
        ResponsiblePartyName: responcibleName,
        ResponsiblePartyAddress1: responcibleAddress1,
        ResponsiblePartyAddress2: responsibleAddress2,
        ResponsiblePartyCity: responcibleCity,
        ResponsiblePartyStateCode: responcibleState,
        ResponsiblePartyPostCode: responciblePostal,
        ResponsiblePartyPhone: responciblePhone,
        ResponciblePartyFax: responcibleFax,
        ResponsiblePartyEmail: responcibleEmail,
        ResponsiblePartyContact: responsibleContact,
        ReponsiblePartyCanadian: responsibleCanadian ? 1 : 0,
      })
    );
  };

  useEffect(() => {
    responcibleCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    responcibleName,
    responcibleAddress1,
    responsibleAddress2,
    responcibleCity,
    responcibleState,
    responciblePostal,
    responciblePhone,
    responcibleFax,
    responcibleEmail,
    responsibleContact,
    responsibleCanadian,
  ]);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setResponciblePhone(formattedPhoneNumber);
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setResponcibleFax(formattedPhoneNumber);
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
                          <Form.Label className="col-form-label mt-4">Responsible Party</Form.Label>
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
                            value={responcibleName}
                            disabled={viewDetail || claimsTabData?.ResponcibleParty}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              dispatch(setResponcibleName(e.target.value));
                            }}
                            className={`customFormControl ${
                              viewDetail || claimsTabData?.ResponcibleParty
                                ? "borderBlack"
                                : responcibleName
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
                            value={responcibleAddress1}
                            disabled={viewDetail || claimsTabData?.ResponcibleParty}
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              dispatch(setResponcibleAddress1(e.target.value));
                            }}
                            className={`customFormControl ${
                              viewDetail || claimsTabData?.ResponcibleParty
                                ? "borderBlack"
                                : responcibleAddress1
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
                            value={responsibleAddress2}
                            disabled={viewDetail || claimsTabData?.ResponcibleParty}
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              setResponcibleAddress2(e.target.value);
                            }}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <PostalCodeComponent
                        labelColNumber={2}
                        hideLabel={true}
                        disabled={viewDetail || claimsTabData?.ResponcibleParty}
                        postalCode={responciblePostal}
                        stateCode={responcibleState}
                        city={responcibleCity}
                        setCity={setResponcibleCity}
                        setStateCode={(value) => dispatch(setResponcibleState(value))}
                        setPostalCode={setResponciblePostal}
                        setPostalValues={setPostalValues}
                        postalOptions={postalOptions}
                        postalCodePK={postalCodePK}
                        setPostalCodePK={setPostalCodePK}
                        canadian={responsibleCanadian}
                        setCanadian={setResponcibleCanadian}
                      />

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}>
                          <Form.Label className="col-form-label mt-1">Phone</Form.Label>
                        </Col>
                        <Col sm={2} md={2} xs={2} className="p-0">
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            maxLength={30}
                            value={responciblePhone}
                            disabled={viewDetail || claimsTabData?.ResponcibleParty}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            className={`customFormControl ${
                              viewDetail || !responciblePhone
                                ? ""
                                : responciblePhone?.length !== 14
                                  ? "borderRed"
                                  : "borderGreen"
                            }`}
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
                            id="fax"
                            name="fax"
                            maxLength={30}
                            value={responcibleFax}
                            disabled={viewDetail || claimsTabData?.ResponcibleParty}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            className={`customFormControl ${
                              viewDetail || !responcibleFax
                                ? ""
                                : responcibleFax?.length !== 14
                                  ? "borderRed"
                                  : "borderGreen"
                            }`}

                            onChange={(e) => faxFormatHandler(e)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}>
                          <Form.Label className="col-form-label mt-1">Email</Form.Label>
                        </Col>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <input
                            type="text"
                            className={`${
                              viewDetail || !responcibleEmail
                                ? ""
                                : /^[a-zA-Z0-9_.\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,4}$/.test(responcibleEmail)
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                            id="email"
                            name="email"
                            maxLength={50}
                            disabled={viewDetail || claimsTabData?.ResponcibleParty}
                            value={responcibleEmail}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              setResponcibleEmail(e.target.value);
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
                            className={`customFormControl`}
                            id="contact"
                            name="contact"
                            maxLength={30}
                            disabled={viewDetail || claimsTabData?.ResponcibleParty}
                            autoComplete="new-password"
                            aria-autocomplete="list"
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

export default ResponsibleParty;
