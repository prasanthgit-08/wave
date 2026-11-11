import { t } from "i18next";
import { Formik, Field } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import {
  setActive,
  setAddress1,
  setAddress2,
  setAlternatePhone,
  setCanadianRedux,
  setCity,
  setDispatchEmail,
  setDispatchEmailValid,
  setDispatcher,
  setDispatcherCellPhone,
  setDispatcherEmail,
  setDispatcherEmailValid,
  setDispatcherPhone,
  setEditFormData,
  setEIN,
  setEinFormat,
  setEmail,
  setEmailFormat,
  setFAXNumber,
  setHaulAndTow,
  setInsuranceAddress1,
  setInsuranceAddress2,
  setInsuranceCanadian,
  setInsuranceCity,
  setInsuranceCompany,
  setInsuranceContact,
  setInsuranceEmail,
  setInsuranceFAX,
  setInsuranceNotes,
  setInsurancePhone,
  setInsurancePolicyNumber,
  setInsurancePostalCode,
  setInsurancePostalCodePK,
  setInsuranceStateCode,
  setIsEinExist,
  setIsNameExist,
  setLowboy,
  setMotorized,
  setName,
  setOnCancel,
  setPhone,
  setPopup,
  setPostalCode,
  setPostalCodeCity,
  setPostalCodeOnChange,
  setPostalCodePKS,
  setPostalCodeStateCode,
  setStateCode,
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
import DealerService from "../../../../services/DealerService";
import LoadingIcon from "../../../common/LoadingIcon";

function General() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [city, setCitys] = useState("");
  const [stateCode, setStateCodes] = useState("");
  const [postalCode, setPostalCodes] = useState("");

  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", stateCode: "", postalCode: "", canadian: false }];
  const initialValues = [{ city: "", stateCode: "", postalCode: "", canadian: false }];

  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();

  const [zipIdChcek, setZipIdCheck] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [loader, setLoader] = useState(false);

  const dispatchEmailValid = useSelector((state) => state.transportCompaniesReducer.dispatchEmailValid);
  const dispatcherEmailValid = useSelector((state) => state.transportCompaniesReducer.dispatcherEmailValid);
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
  const einFormat = useSelector((state) => state.transportCompaniesReducer.einFormat);
  const emailFormat = useSelector((state) => state.transportCompaniesReducer.emailFormat);
  const canadianRedux = useSelector((state) => state.transportCompaniesReducer.canadianRedux);
  const isNameExist = useSelector((state) => state.transportCompaniesReducer.isNameExist);

  const isEinExist = useSelector((state) => state.transportCompaniesReducer.isEinExist);

  let viewDetail = useSelector((state) => state.transportCompaniesReducer.viewDetail);

  const phoneNumberValidation = (value) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");

    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };
  const dispatcherFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setDispatcherPhone(formattedPhoneNumber));
  };
  const dispatcherCellHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setDispatcherCellPhone(formattedPhoneNumber));
  };

  const alternateFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setAlternatePhone(formattedPhoneNumber));
  };

  const tollfreeFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setAlternatePhone(formattedPhoneNumber));
  };
  const isAnySelected = towaway || haulAndTow || lowboy || popup || truckCamper || motorized;

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    dispatch(setFAXNumber(formattedPhoneNumber));
  };
  const fetchRecord = (id) => {
    setLoader(true);
    TransportCompanysService.getRecord(id)
      .then((res) => {
        const data = res.data;
        dispatch(setViewDetail(true));
        dispatch(setEditFormData(data));
      })
      .catch((err) => {
        navigate(`/transport-companies`);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const hanldeCheckname = (string) => {
    TransportCompanysService.checknameExist(name, id)
      .then((res) => {
        dispatch(setIsNameExist(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hanldeCheckEin = (string) => {
    TransportCompanysService.checkEinExist(ein, id)
      .then((res) => {
        dispatch(setIsEinExist(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    dispatch(setIsEinExist(true));
    dispatch(setIsNameExist(true));
  }, []);

  useEffect(() => {
    if (editFormData != null && id != null) {
      const safeTrim = (value) => (value || "")?.trim();

      dispatch(setTransportCompanyPK(editFormData.transportCompanyPK || null));
      dispatch(setName(editFormData.name || ""));
      dispatch(setAddress1(editFormData.address1 || ""));
      dispatch(setAddress2(editFormData.address2 || ""));
      dispatch(setPhone(editFormData.phone || ""));
      dispatch(setAlternatePhone(editFormData.alternatePhone || ""));
      dispatch(setFAXNumber(editFormData.faxNumber || ""));
      dispatch(setEIN(editFormData.ein || ""));
      dispatch(setEmail(editFormData.email || ""));
      dispatch(setDispatcher(editFormData.dispatcher || ""));
      dispatch(setDispatcherPhone(editFormData.dispatcherPhone || ""));
      dispatch(setDispatcherCellPhone(editFormData.dispatcherCellPhone || ""));
      dispatch(setDispatcherEmail(editFormData.dispatcherEmail || ""));
      dispatch(setDispatchEmail(editFormData.dispatcherEmail || ""));
      dispatch(setTowaway(editFormData.towaway || false));
      dispatch(setHaulAndTow(editFormData.haulAndTow || false));
      dispatch(setLowboy(editFormData.lowboy || false));
      dispatch(setPopup(editFormData.popup || false));
      dispatch(setTruckCamper(editFormData.truckCamper || false));
      dispatch(setMotorized(editFormData.motorized || false));
      dispatch(setInsurancePhone((editFormData.insurancePhone || "")?.trim()));
      dispatch(setInsuranceCanadian(editFormData.insuranceCanadian || false));
      setCitys(editFormData.city != null ? editFormData.city?.trim() : "");
      setStateCodes(editFormData.stateCode != null ? editFormData.stateCode?.trim() : "");

      dispatch(setCity(editFormData.city || ""));
      dispatch(setStateCode(editFormData.stateCode || ""));
      dispatch(setPostalCode(editFormData.postalCode || ""));
      dispatch(setDispatchEmail(editFormData?.dispatchEmail || ""));
      dispatch(setActive(editFormData?.active || false));

      initialValue[0].city = editFormData.city != null ? editFormData.city?.trim() : "";
      initialValue[0].stateCode = editFormData.stateCode != null ? editFormData.stateCode?.trim() : "";
      initialValue[0].canadian = editFormData.canadian != null ? editFormData.canadian : false;
      initialValue[0].postalCode = editFormData.postalCode != null ? editFormData.postalCode?.trim() : "";
      initialValues[0].insuranceCity =
        editFormData.insuranceCity != null ? editFormData.insuranceCity?.trim() : "";
      initialValues[0].insuranceStateCode =
        editFormData.insuranceStateCode != null ? editFormData.insuranceStateCode?.trim() : "";
      initialValues[0].insuranceCanadian =
        editFormData.insuranceCanadian != null ? editFormData.insuranceCanadian : false;
      initialValues[0].insurancePostalCode =
        editFormData.insurancePostalCode != null ? editFormData.insurancePostalCode?.trim() : "";
      setPostalValues(initialValue);
      dispatch(setCanadianRedux(editFormData?.canadian || false));
      setPostalCodePK(editFormData?.postalCodePK || null);
      setCitys(editFormData.city?.trim() || "");
      setStateCodes(editFormData.stateCode?.trim() || "");
      setPostalCodes(editFormData.postalCode?.trim() || "");

      dispatch(setInsuranceCompany(safeTrim(editFormData.insuranceCompany)));
      dispatch(setInsuranceAddress1(safeTrim(editFormData.insuranceAddress1)));
      dispatch(setInsuranceAddress2(safeTrim(editFormData.insuranceAddress2)));
      dispatch(setInsuranceCity(safeTrim(editFormData.insuranceCity)));
      dispatch(setInsuranceStateCode(safeTrim(editFormData.insuranceStateCode)));
      dispatch(setInsurancePostalCode(safeTrim(editFormData.insurancePostalCode)));
      dispatch(setInsuranceContact(safeTrim(editFormData.insuranceContact)));
      dispatch(setInsuranceEmail(safeTrim(editFormData.insuranceEmail)));
      dispatch(setInsuranceFAX(safeTrim(editFormData.insuranceFAX)));
      dispatch(setInsurancePolicyNumber(safeTrim(editFormData.insurancePolicyNumber)));
      dispatch(setInsuranceNotes(safeTrim(editFormData.notes)));
    }
  }, [editFormData, changesCancelled, id]);

  useEffect(() => {
    dispatch(setEinFormat(true));
  }, []);
  useEffect(() => {
    if (id) fetchRecord(id);
  }, [id]);

  useEffect(() => {
    dispatch(setPostalCodePKS(postalCodePK));

    dispatch(setStateCode(stateCode));
    dispatch(setCity(city));
    dispatch(setPostalCode(postalCode));
  }, [postalCodePK]);

  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };
  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const validateEmail = (email) => {
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
    return emailRegex.test(email);
  };
  function formatPhone(phoneNumber) {
    const str = phoneNumber.toString();
    if (str.length !== 10) return "";
    return `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(6)}`;
  }
  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;

  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    tollfreephone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
    email: yup.string().matches(emailRegex),
    dispatcherEmail: yup.string().matches(emailRegex),
    dispatchEmail: yup.string().matches(emailRegex),

    login: yup.string(),
    password: yup.string().when("login", {
      is: (login) => login !== undefined && login.length > 0,
      then: yup.string().required(),
    }),
  });

  useEffect(() => {
    dispatch(setCanadianRedux(canadian));
  }, [canadian]);

  useEffect(() => {
    const canadianRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const isCanadian = canadianRegex.test(postalCode?.trim());

    if (canadian !== isCanadian) {
      setCanadian(isCanadian);
    }

    if (canadianRedux !== isCanadian) {
      dispatch(setCanadianRedux(isCanadian));
    }
  }, [postalCode]);

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
        email: true,
        dispatchEmail: true,
        dispatcherEmail: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="w-100" onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
            {loader && <LoadingIcon />}

            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.name")}
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      autoComplete="new-name"
                      className={`customFormControl ${
                        viewDetail ? "" : name && isNameExist ? "borderGreen" : "borderRed"
                      }`}
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      maxLength={30}
                      disabled={viewDetail}
                      onBlur={(e) => {
                        hanldeCheckname(e.target.value);
                      }}
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setName(e.target.value));
                        dispatch(setIsNameExist(true));
                      }}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
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
                    <input
                      autoComplete="one-time-code"
                      className={`customFormControl ${viewDetail ? "" : address1 ? "borderGreen" : "borderRed"}`}
                      id="ad1"
                      name="ad1"
                      type="text"
                      value={address1}
                      maxLength={30}
                      disabled={viewDetail}
                      aria-autocomplete="list"
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        dispatch(setAddress1(e.target.value));
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
                      autoComplete="one-time-code"
                      className={`customFormControl`}
                      id="ad2"
                      name="ad2"
                      type="text"
                      value={address2}
                      maxLength={30}
                      disabled={viewDetail}
                      aria-autocomplete="list"
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        dispatch(setAddress2(e.target.value));
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <PostalCodeComponent
                  disabled={viewDetail}
                  setPostalCode={setPostalCodes}
                  city={viewDetail ? editFormData?.city?.trim() : city}
                  setCity={setCitys}
                  postalCode={viewDetail ? editFormData?.postalCode : postalCode}
                  stateCode={viewDetail ? editFormData?.stateCode?.trim() : stateCode}
                  setStateCode={setStateCodes}
                  //
                  postalOptions={postalOptions}
                  setPostalValues={setPostalValues}
                  canadian={viewDetail ? editFormData?.canadian : canadian}
                  setCanadian={setCanadian}
                  stateInputWidth={"50px"}
                  postalCodePK={postalCodePK}
                  setPostalCodePK={setPostalCodePK}
                />
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Phone</Form.Label>
                  </Col>

                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <input
                      autoComplete="new-phone"

                      className={`customFormControl ${
                        viewDetail ? "" : phone && phone.length === 13 ? "borderGreen" : "borderRed"
                      }`}
                      control="input"
                      name="phone"
                      value={phone}
                      maxLength={13}
                      disabled={viewDetail}
                      onChange={(e) => phoneFormatHandler(e)}
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setPhone(e.target.value));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Alternate Phone</Form.Label>
                  </Col>

                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : alternatePhone
                            ? alternatePhone.length === 13
                              ? ""
                              : "borderRed"
                            : ""
                      }`}
                      control="input"
                      name="phone"
                      value={alternatePhone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => alternateFormatHandler(e)}
                      autoComplete="new-alternatePhone"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        dispatch(setAlternatePhone(e.target.value));
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
                        viewDetail ? "" : fAXNumber ? (fAXNumber.length === 13 ? "" : "borderRed") : ""
                      }`}
                      type="fax"
                      name="fax"
                      value={fAXNumber}
                      onChange={(e) => faxFormatHandler(e)}
                      maxLength={14}
                      disabled={viewDetail}
                      autoComplete="new-fAXNumber"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        dispatch(setFAXNumber(e.target.value));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="customColFormLabel">Email</Form.Label>
                  </Col>
                  <Col xs={9} md={9} sm={9} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail ? "" : !email ? "" : emailFormat && email ? "borderGreen" : "borderRed"
                      }`}
                      id="email"
                      name="email"
                      value={email}
                      maxLength={70}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        const emailValue = e.target.value;
                        const isValidEmail1 = validateEmail(emailValue);
                        dispatch(setEmail(emailValue));
                        dispatch(setEmailFormat(isValidEmail1));
                      }}
                      onInput={(e) => {
                        dispatch(setEmail(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">EIN </Form.Label>
                  </Col>

                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "90px" }}>
                    <input
                      autoComplete="new-ein"

                      type="text"
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : einFormat && ein && isEinExist && ein.length === 10
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="pcmilercounty"
                      id="pcmilercounty"
                      value={ein}
                      maxLength={10}
                      disabled={viewDetail}
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setEIN(e.target.value));
                        dispatch(setIsEinExist(true));
                      }}
                      onBlur={(e) => {
                        hanldeCheckEin(e.target.value);
                      }}
                      onChange={(e) => {
                        const value = e.target.value;

                        const formattedValue = value.replace(/\D/g, "");
                        let einFormatted = "";
                        if (formattedValue.length > 2) {
                          einFormatted = `${formattedValue.slice(0, 2)}-${formattedValue.slice(2, 9)}`;
                        } else {
                          einFormatted = formattedValue;
                        }

                        const isValidFormat = /^\d{2}-\d{7}$/.test(einFormatted);

                        dispatch(setEIN(einFormatted));
                        dispatch(setEinFormat(isValidFormat));
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

                <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="customColFormLabel"> Dispatch Email</Form.Label>
                  </Col>
                  <Col xs={9} md={9} sm={9} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail ? "" : !dispatchEmail || !dispatchEmailValid ? "borderRed" : "borderGreen"
                      }`}
                      id="email"
                      name="email"
                      value={dispatchEmail}
                      maxLength={70}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        const emailValue = e.target.value;
                        const isValidEmail1 = validateEmail(emailValue);
                        dispatch(setDispatchEmail(emailValue));
                        dispatch(setDispatchEmailValid(isValidEmail1));
                      }}
                      onInput={(e) => {
                        dispatch(setDispatchEmail(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={5} md={6} xs={4} className="ps-lg-5">
                <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={3} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Dispatcher </Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail ? "" : dispatcher ? "borderGreen" : "borderRed"
                      }`}
                      id="dispatcher"
                      name="dispatcher"
                      value={dispatcher}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        dispatch(setDispatcher(e.target.value));
                      }}
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
                        !viewDetail
                          ? dispatcherPhone && dispatcherPhone?.length === 13
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      name="phone"
                      value={dispatcherPhone}
                      maxLength={13}
                      disabled={viewDetail}
                      onChange={(e) => dispatcherFormatHandler(e)}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setDispatcherPhone(e.target.value));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Cell Phone</Form.Label>
                  </Col>

                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : dispatcherCellPhone
                            ? dispatcherCellPhone.length === 13
                              ? ""
                              : "borderRed"
                            : ""
                      }`}
                      control="input"
                      name="phone"
                      value={dispatcherCellPhone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => dispatcherCellHandler(e)}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setDispatcherCellPhone(e.target.value));
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
                        viewDetail
                          ? ""
                          : !dispatcherEmail || !dispatcherEmailValid
                            ? "borderRed"
                            : "borderGreen"
                      }`}
                      id="email"
                      name="email"
                      value={dispatcherEmail}
                      maxLength={70}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        const emailValue = e.target.value;

                        // Validate email1 format
                        const isValidEmail1 = validateEmail(emailValue);

                        // Dispatch email1 and its format status
                        dispatch(setDispatcherEmail(emailValue));
                        dispatch(setDispatcherEmailValid(isValidEmail1));
                      }}
                      onInput={(e) => {
                        dispatch(setDispatcherEmail(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Row className={"hide-elements"}>
                  <Col xs={2} md={2} sm={2}></Col>
                  <Col style={{ paddingLeft: "3px" }}>
                    <p className="p-0 text-danger alert" style={{ height: "10px" }}></p>
                  </Col>
                </Row>

                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={3} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Towaway</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !isAnySelected ? "borderRed" : towaway ? "borderGreen" : ""
                      }`}
                      id="towaway"
                      name="towaway"
                      checked={towaway}
                      disabled={viewDetail}
                      onChange={(e) => dispatch(setTowaway(e.target.checked))}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={3} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Haul & Tow</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !isAnySelected ? "borderRed" : haulAndTow ? "borderGreen" : ""
                      }`}
                      id="haulAndTow"
                      name="haulAndTow"
                      checked={haulAndTow}
                      disabled={viewDetail}
                      onChange={(e) => dispatch(setHaulAndTow(e.target.checked))}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={3} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Lowboy</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !isAnySelected ? "borderRed" : lowboy ? "borderGreen" : ""
                      }`}
                      id="lowboy"
                      name="lowboy"
                      checked={lowboy}
                      disabled={viewDetail}
                      onChange={(e) => dispatch(setLowboy(e.target.checked))}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={3} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Popup</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !isAnySelected ? "borderRed" : popup ? "borderGreen" : ""
                      }`}
                      id="popup"
                      name="popup"
                      checked={popup}
                      disabled={viewDetail}
                      onChange={(e) => dispatch(setPopup(e.target.checked))}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={3} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Truck Camper</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !isAnySelected ? "borderRed" : truckCamper ? "borderGreen" : ""
                      }`}
                      id="truckCamper"
                      name="truckCamper"
                      checked={truckCamper}
                      disabled={viewDetail}
                      onChange={(e) => dispatch(setTruckCamper(e.target.checked))}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={3} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Motorized</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !isAnySelected ? "borderRed" : motorized ? "borderGreen" : ""
                      }`}
                      id="motorized"
                      name="motorized"
                      checked={motorized}
                      disabled={viewDetail}
                      onChange={(e) => dispatch(setMotorized(e.target.checked))}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default General;
