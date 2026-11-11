import { t } from "i18next";
import { Formik, Field } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import {
  setAddress1,
  setAddress2,
  setAlternatePhone,
  setDispatchEmail,
  setDispatcher,
  setDispatcherCellPhone,
  setDispatcherEmail,
  setDispatcherPhone,
  setEditFormData,
  setEIN,
  setEmail,
  setFAXNumber,
  setHaulAndTow,
  setInsuranceAddress1,
  setInsuranceAddress2,
  setInsuranceCanadian,
  setInsuranceCity,
  setInsuranceCompany,
  setInsuranceContact,
  setInsuranceEmail,
  setInsuranceEmailValid,
  setInsuranceFAX,
  setInsurancePhone,
  setInsurancePolicyNumber,
  setInsurancePostalCode,
  setInsurancePostalCodePKS,
  setInsuranceStateCode,
  setLowboy,
  setMotorized,
  setName,
  setOnCancel,
  setPhone,
  setPopup,
  setPostalCodeCity,
  setPostalCodeOnChange,
  setPostalCodeStateCode,
  setTowaway,
  setTransportCompanyPK,
  setTransportCompanyPostalCode,
  setTruckCamper,
  setViewDetail,
} from "../../../../redux/TransportCompaniesSlice";
import TransportCompanysService from "../../../../services/TransportCompanysService";
import PostalCode from "../../../common/PostalCode";
import { emailRegex } from "../../../../utils/validation/EmailRegex";
import PostalCodeComponent from "../../../common/PostalCodeComponent";

function Insurance() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cityOfInsurance, setCityOfInsurance] = useState("");
  const [statecodeOfInsurance, setStatecodeOfInsurance] = useState("");
  const [postalcodeOfInsurance, setPostalcodeOfInsurance] = useState("");
  const initialValues = [
    { insuranceCity: "", insuranceStateCode: "", insurancePostalCode: "", insuranceCanadian: false },
  ];

  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValues);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [insurancePostalCodePk, setInsurancePostalCodePk] = useState();

  const [zipIdChcek, setZipIdCheck] = useState("");

  const editFormData = useSelector((state) => state.transportCompaniesReducer.editFormData);
  const name = useSelector((state) => state.transportCompaniesReducer.name);
  const address1 = useSelector((state) => state.transportCompaniesReducer.address1);
  const address2 = useSelector((state) => state.transportCompaniesReducer.address2);
  const phone = useSelector((state) => state.transportCompaniesReducer.phone);
  const alternatePhone = useSelector((state) => state.transportCompaniesReducer.alternatePhone);
  const fAXNumber = useSelector((state) => state.transportCompaniesReducer.fAXNumber);
  const ein = useSelector((state) => state.transportCompaniesReducer.ein);
  const email = useSelector((state) => state.transportCompaniesReducer.email);
  const dispatcher = useSelector((state) => state.transportCompaniesReducer.dispatcher);
  const dispatcherPhone = useSelector((state) => state.transportCompaniesReducer.dispatcherPhone);
  const dispatcherCellPhone = useSelector((state) => state.transportCompaniesReducer.dispatcherCellPhone);
  const dispatcherEmail = useSelector((state) => state.transportCompaniesReducer.dispatcherEmail);
  const dispatchEmail = useSelector((state) => state.transportCompaniesReducer.dispatchEmail);
  const towaway = useSelector((state) => state.transportCompaniesReducer.towaway);
  const haulAndTow = useSelector((state) => state.transportCompaniesReducer.haulAndTow);
  const lowboy = useSelector((state) => state.transportCompaniesReducer.lowboy);
  const popup = useSelector((state) => state.transportCompaniesReducer.popup);
  const truckCamper = useSelector((state) => state.transportCompaniesReducer.truckCamper);
  const motorized = useSelector((state) => state.transportCompaniesReducer.motorized);
  const changesCancelled = useSelector((state) => state.transportCompaniesReducer.changesCancelled);
  const onCancel = useSelector((state) => state.transportCompaniesReducer.onCancel);
  const postalCodeOnChange = useSelector((state) => state.transportCompaniesReducer.postalCodeOnChange);

  const insurancePolicyNumber = useSelector((state) => state.transportCompaniesReducer.insurancePolicyNumber);
  const insuranceEmail = useSelector((state) => state.transportCompaniesReducer.insuranceEmail);
  const insuranceFAX = useSelector((state) => state.transportCompaniesReducer.insuranceFAX);
  const insurancePhone = useSelector((state) => state.transportCompaniesReducer.insurancePhone);
  const insuranceContact = useSelector((state) => state.transportCompaniesReducer.insuranceContact);
  const insuranceAddress1 = useSelector((state) => state.transportCompaniesReducer.insuranceAddress1);
  const insuranceAddress2 = useSelector((state) => state.transportCompaniesReducer.insuranceAddress2);
  const insuranceCanadian = useSelector((state) => state.transportCompaniesReducer.insuranceCanadian);
  const insurancePostalCode = useSelector((state) => state.transportCompaniesReducer.insurancePostalCode);
  const insuranceStateCode = useSelector((state) => state.transportCompaniesReducer.insuranceStateCode);
  const insuranceCity = useSelector((state) => state.transportCompaniesReducer.insuranceCity);
  const insurance = useSelector((state) => state.transportCompaniesReducer.insuranceCity);
  const insuranceCompany = useSelector((state) => state.transportCompaniesReducer.insuranceCompany);
  const insuranceEmailValid = useSelector((state) => state.transportCompaniesReducer.insuranceEmailValid);

  let viewDetail = useSelector((state) => state.transportCompaniesReducer.viewDetail);
  const phoneNumberValidation = (value) => {
    if (!value) return value;

    // Remove any non-digit characters
    const phoneNumber = value.replace(/[^\d]/g, "");

    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3)}`; // Removed space after ')'
    }

    return `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`; // Removed space after ')'
  };
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };

  const insuranceContactFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setInsuranceContact(formattedPhoneNumber));
  };

  const insuranceFaxFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setInsuranceFAX(formattedPhoneNumber));
  };

  const insurancephoneFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setInsurancePhone(formattedPhoneNumber));
  };

  const tollfreeFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setAlternatePhone(formattedPhoneNumber));
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setFAXNumber(formattedPhoneNumber));
  };
  const fetchRecord = (id) => {
    TransportCompanysService.getRecord(id)
      .then((res) => {
        const data = res.data;

        dispatch(setEditFormData(res.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/transport-companies`);
      });
  };

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setTransportCompanyPK(editFormData.transportCompanyPK || null));

      initialValues[0].insuranceCity =
        editFormData.insuranceCity != null ? editFormData.insuranceCity?.trim() : "";
      initialValues[0].insuranceStateCode =
        editFormData.insuranceStateCode != null ? editFormData.insuranceStateCode?.trim() : "";
      initialValues[0].insuranceCanadian =
        editFormData.insuranceCanadian != null ? editFormData.insuranceCanadian : false;
      initialValues[0].insurancePostalCode =
        editFormData.insurancePostalCode != null ? editFormData.insurancePostalCode?.trim() : "";
      setPostalValues(initialValues);
      setCityOfInsurance(editFormData.insuranceCity != null ? editFormData.insuranceCity?.trim() : "");
      setStatecodeOfInsurance(
        editFormData.insuranceStateCode != null ? editFormData.insuranceStateCode?.trim() : ""
      );
      setPostalcodeOfInsurance(
        editFormData.insurancePostalCode != null ? editFormData.insurancePostalCode?.trim() : ""
      );
      setInsurancePostalCodePk(editFormData?.insurancePostalCodePK);
      dispatch(setInsuranceCanadian(editFormData?.insuranceCanadian));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    dispatch(setName(""));
    dispatch(setAddress1(""));
    dispatch(setAddress2(""));
    dispatch(setPhone(""));
    dispatch(setAlternatePhone(""));
    dispatch(setFAXNumber(""));
    dispatch(setEIN(""));
    dispatch(setEmail(""));
    dispatch(setDispatcher(""));
    dispatch(setDispatcherPhone());
    dispatch(setDispatcherCellPhone(""));
    dispatch(setDispatcherEmail(""));
    dispatch(setTowaway(false));
    dispatch(setHaulAndTow(false));
    dispatch(setLowboy(false));
    dispatch(setPopup(false));
    dispatch(setTruckCamper(false));
    dispatch(setMotorized(false));
  }, []);

  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };
  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const validateEmail = (email) => {
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
    return emailRegex.test(email); // Returns true if the email matches the regex
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    tollfreephone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
    login: yup.string(),
    insuranceEmail: yup.string().matches(emailRegex),

    password: yup.string().when("login", {
      is: (login) => login !== undefined && login.length > 0,
      then: yup.string().required(),
    }),
  });

  useEffect(() => {
    dispatch(setInsurancePostalCodePKS(insurancePostalCodePk));
  }, [insurancePostalCodePk, statecodeOfInsurance, cityOfInsurance, postalcodeOfInsurance]);

  useEffect(() => {
    dispatch(setInsuranceStateCode(statecodeOfInsurance));
    dispatch(setInsuranceCity(cityOfInsurance));
    dispatch(setInsurancePostalCode(postalcodeOfInsurance));
    dispatch(setInsuranceCanadian(insuranceCanadian));
  }, [
    insurancePostalCodePk,
    statecodeOfInsurance,
    cityOfInsurance,
    postalcodeOfInsurance,
    insuranceCanadian,
  ]);
  return (
    <Formik
      initialValues={{}}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        name: true,
        address1: true,
        city: true,
        statecode: true,
        lastOrderDate: true,
        phone: true,
        tollfreephone: true,
        fax: true,
        postalcode: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-15 w-100" onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Insurance Company Name{" "}
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <Field
                      className={`customFormControl`}
                      id="name"
                      name="name"
                      type="text"
                      value={insuranceCompany}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setInsuranceCompany(e.target.value));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="address1" className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.address")}
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <Field
                      className={`customFormControl`}
                      id="ad1"
                      name="ad1"
                      type="text"
                      value={insuranceAddress1}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setInsuranceAddress1(e.target.value));
                      }}
                      onBlur={formik.handleBlur}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 mb-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="address2" className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <Field
                      className="customFormControl"
                      id="ad2"
                      name="ad2"
                      type="text"
                      value={insuranceAddress2}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setInsuranceAddress2(e.target.value));
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <PostalCodeComponent
                  //passing postalcode statevalue
                  postalCode={viewDetail ? editFormData?.insurancePostalCode?.trim() : postalcodeOfInsurance}
                  setPostalCode={setPostalcodeOfInsurance}
                  // passing city state value
                  city={viewDetail ? editFormData?.insuranceCity?.trim() : cityOfInsurance}
                  setCity={setCityOfInsurance}
                  // passing statecode eg 'NY IN' state value
                  stateCode={viewDetail ? editFormData?.insuranceStateCode?.trim() : statecodeOfInsurance}
                  setStateCode={setStatecodeOfInsurance}
                  //
                  postalOptions={postalOptions}
                  setPostalValues={setPostalValues}
                  canadian={viewDetail ? editFormData?.canadian : insuranceCanadian}
                  setCanadian={setInsuranceCanadian}
                  // setting input disable for edit mode
                  disabled={viewDetail}
                  // setting redux reduces for city, statecode and postalcode
                  stateInputWidth={"50px"}
                  postalCodePK={insurancePostalCodePk}
                  setPostalCodePK={setInsurancePostalCodePk}

                  // loading={isDealerLoading}
                  //for  formik validation
                  // new Functionality , validate only if zip id not passed
                  className={"postalCodeRefSeco"}
                  isOptional
                />
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Contact</Form.Label>
                  </Col>

                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : insuranceContact && insuranceContact?.trim()
                            ? insuranceContact.length === 13
                              ? ""
                              : "borderRed"
                            : ""
                      }`}
                      control="input"
                      name="phone"
                      value={insuranceContact}
                      onBeforeInput={(e) => {
                        if (e.data?.trim() === "" || e.data?.length === 0) {
                          e.preventDefault();
                        }
                      }}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => insuranceContactFormatHandler(e)}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setInsuranceContact(e.target.value));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Phone</Form.Label>
                  </Col>

                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : insurancePhone && insurancePhone?.trim()
                            ? insurancePhone.length === 13
                              ? ""
                              : "borderRed"
                            : ""
                      }`}
                      onBeforeInput={(e) => {
                        if (e.data?.trim() === "" || e.data?.length === 0) {
                          e.preventDefault();
                        }
                      }}
                      control="input"
                      name="phone"
                      value={insurancePhone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => insurancephoneFormatHandler(e)}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        dispatch(setInsurancePhone(e.target.value));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.fax")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        viewDetail ? "" : insuranceFAX ? (insuranceFAX.length === 13 ? "" : "borderRed") : ""
                      }`}
                      control="input"
                      type="fax"
                      name="fax"
                      value={insuranceFAX}
                      onChange={(e) => insuranceFaxFormatHandler(e)}
                      maxLength={14}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        dispatch(setInsuranceFAX(e.target.value));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="customColFormLabel">Email</Form.Label>
                  </Col>
                  <Col xs={9} md={9} sm={9} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail ? "" : insuranceEmail && !insuranceEmailValid ? "borderRed" : ""
                      }`}
                      id="email"
                      name="email"
                      value={insuranceEmail}
                      maxLength={70}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        const emailValue = e.target.value;
                        const isValidEmail1 = validateEmail(emailValue);
                        dispatch(setInsuranceEmail(emailValue));
                        dispatch(setInsuranceEmailValid(isValidEmail1));
                      }}
                      onInput={(e) => {
                        dispatch(setInsuranceEmail(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Policy Number </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      name="insurancePolicyNumber"
                      id="insurancePolicyNumber"
                      value={insurancePolicyNumber}
                      onBeforeInput={(e) => {
                        if (e.data?.trim() === "" || e.data?.length === 0) {
                          e.preventDefault();
                        }
                      }}

                      maxLength={20}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setInsurancePolicyNumber(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Row className={"hide-elements"}>
                  <Col xs={2} md={2} sm={2}></Col>
                  <Col style={{ paddingLeft: "3px" }}>
                    <p className="p-0 text-danger alert" style={{ height: "5px" }}></p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default Insurance;
