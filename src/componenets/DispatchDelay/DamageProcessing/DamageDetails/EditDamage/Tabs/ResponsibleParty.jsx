import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import QuarterScreenWrapper from "../../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../../common/Header";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import CommonFooter from "../../../../../common/CommonFooter";
import {
  setClaimsVO,
  setEditSaveFormData,
  setIsResponcibleClear,
  setResponcibleAddress1,
  setResponcibleName,
  setResponcibleState,
  setShowResponsibleParty,
} from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import { emailRegex } from "../../../../../../utils/validation/EmailRegex";

const ResponsibleParty = ({ show, onHide }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const { damageFK } = useParams();

  /******Responsible Name,Address field ******/

  const [responcibleAddress2, setResponcibleAddress2] = useState("");
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
  const claimsTabData = useSelector((state) => state.damageReducer.claimsTabData);
  const responcibleName = useSelector((state) => state.damageReducer.responcibleName);
  const responcibleAddress1 = useSelector((state) => state.damageReducer.responcibleAddress1);
  const responcibleState = useSelector((state) => state.damageReducer.responcibleState);
  const editSaveFormData = useSelector((state) => state.damageReducer.editSaveFormData);
  const claimsVO = useSelector((state) => state.damageReducer.claimsVO);
  const isResponcibleClear = useSelector((state) => state.damageReducer.isResponcibleClear);

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
      label: "Save",
      onClick: () => handleSave(),
      disabled: claimsTabData?.ResponcibleParty || disableSave,
    },
    {
      label: "Cancel",
      onClick: () => handleCancel(),
      hidden: claimsTabData?.ResponcibleParty ? true : false,
    },
  ];

  const handleSave = () => {
    dispatch(setShowResponsibleParty(false));
  };

  const handleCancel = () => {
    dispatch(setShowResponsibleParty(false));
    dispatch(setIsResponcibleClear(true));
  };

  /******Clear the states if the responsible is unchecked*****/
  useEffect(() => {
    if (isResponcibleClear) {
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
      dispatch(setIsResponcibleClear(false));
    }
  }, [isResponcibleClear]);

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
      dispatch(setResponcibleName(claimsTabData?.Responsible_Name ? claimsTabData?.Responsible_Name : ""));
      dispatch(
        setResponcibleAddress1(claimsTabData?.Responsible_Address1 ? claimsTabData?.Responsible_Address1 : "")
      );
      setResponcibleAddress2(claimsTabData?.Responsible_Address2 ? claimsTabData?.Responsible_Address2 : "");
      setResponcibleCity(claimsTabData?.Responsible_City ? claimsTabData?.Responsible_City : "");
      dispatch(
        setResponcibleState(claimsTabData?.Responsible_Statecode ? claimsTabData?.Responsible_Statecode : "")
      );
      setResponciblePostal(
        claimsTabData?.Responsible_PostalCode ? claimsTabData?.Responsible_PostalCode : ""
      );
      setResponciblePhone(
        claimsTabData?.Responsible_Phone ? formatPhoneNumber(claimsTabData?.Responsible_Phone) : ""
      );
      setResponcibleFax(
        claimsTabData?.Responsible_FAX ? formatPhoneNumber(claimsTabData?.Responsible_FAX) : ""
      );
      setResponcibleEmail(claimsTabData?.Responsible_Email ? claimsTabData?.Responsible_Email?.trim() : "");
      setResponcibleContact(claimsTabData?.Responsible_Contact ? claimsTabData?.Responsible_Contact : "");
      setPostalCodePK(claimsTabData?.Responsible_PostalCode);
    }
  }, [claimsTabData]);

  /***Set the Responcible Compaby Data****/
  const responcibleCompanyData = () => {
    dispatch(
      setClaimsVO({
        ...claimsVO,
        responsiblePartyName: responcibleName,
        responsiblePartyAddress1: responcibleAddress1,
        responsiblePartyAddress2: responcibleAddress2,
        responsiblePartyCity: responcibleCity,
        responsiblePartyStateCode: responcibleState,
        responsiblePartyPostCode: responciblePostal,
        responsiblePartyPhone: responciblePhone,
        responsiblePartyFax: responcibleFax,
        responsiblePartyEmail: responcibleEmail,
        responsiblePartyContact: responsibleContact,
        responsiblePartyCanadian: responsibleCanadian ? 1 : 0,
      })
    );
  };

  useEffect(() => {
    responcibleCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    responcibleName,
    responcibleAddress1,
    responcibleAddress2,
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
  const handleClose = () => {
    dispatch(setIsResponcibleClear(true));
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
                            disabled={claimsTabData?.ResponcibleParty}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              dispatch(setResponcibleName(e.target.value));
                            }}
                            className={`customFormControl ${
                              claimsTabData?.ResponcibleParty
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
                            disabled={claimsTabData?.ResponcibleParty}
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              dispatch(setResponcibleAddress1(e.target.value));
                            }}
                            className={`customFormControl ${
                              claimsTabData?.ResponcibleParty
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
                            value={responcibleAddress2}
                            disabled={claimsTabData?.ResponcibleParty}
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
                        disabled={claimsTabData?.ResponcibleParty}
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
                            disabled={claimsTabData?.ResponcibleParty}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            className={`customFormControl ${
                              !responciblePhone
                                ? ""
                                : formatPhoneNumber(responciblePhone).length === 14
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                            onChange={(e) => setResponciblePhone(formatPhoneNumber(e.target.value))}
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
                            disabled={claimsTabData?.ResponcibleParty}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            className={`customFormControl ${
                              !responcibleFax
                                ? ""
                                : formatPhoneNumber(responcibleFax).length === 14
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
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
                              !responcibleEmail
                                ? ""
                                : responcibleEmail?.match(emailRegex)
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                            id="email"
                            name="email"
                            maxLength={70}
                            disabled={claimsTabData?.ResponcibleParty}
                            value={responcibleEmail}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onInput={(e) => {
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
                            disabled={claimsTabData?.ResponcibleParty}
                            value={responsibleContact}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            onChange={(e) => {
                              setResponcibleContact(e.target.value);
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

export default ResponsibleParty;
