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
  setEditSaveFormData,
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
  const params = useParams();
  const id = params.id;
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
                            value={claimsTabData?.Responsible_Name}
                            autoComplete="new-password"
                            aria-autocomplete="list"
                            className="customFormControl"
                            disabled
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
                            value={claimsTabData?.Responsible_Address1}
                            className="customFormControl"
                            disabled
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={2} md={2} xs={2}></Col>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <input
                            type="text"
                            id="ad2"
                            name="ad2"
                            maxLength={30}
                            className="customFormControl"
                            disabled
                            value={responcibleAddress2}
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <PostalCodeComponent
                        labelColNumber={2}
                        hideLabel={true}
                        disabled={true}
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
                            className="customFormControl"
                            disabled
                            autoComplete="new-password"
                            aria-autocomplete="list"
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
                            className="customFormControl"
                            disabled
                            autoComplete="new-password"
                            aria-autocomplete="list"
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
                            className="customFormControl"
                            disabled
                            id="email"
                            name="email"
                            maxLength={70}
                            value={responcibleEmail}
                            autoComplete="new-password"
                            aria-autocomplete="list"
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
                            className="customFormControl"
                            disabled
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
        </QuarterScreenWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default ResponsibleParty;
