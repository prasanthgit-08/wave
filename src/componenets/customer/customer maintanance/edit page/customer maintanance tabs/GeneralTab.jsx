import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerService from "../../../../../services/CustomerService";
import PostalCode from "../../../../common/PostalCode";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import CustomerGroupsLookup from "../../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";
import {
  setCustomerFormData,
  setCustomerName,
  setCustomerNameExistCheck,
  setCustomerGroupsSelection,
  setIsGeneralTabValid,
  setCustomerPostalCode,
  setCustomerCity,
  setCustomerStateCode,
  setOnCancel,
} from "../../../../../redux/CustomerMaintenanceSlice";

import {
  setDealerCity,
  setDealerStatecode,
  setDealerPostcode,
  setDealerZipPostLenght,
} from "../../../../../redux/EditDealerSlice";
import LookupButton from "../../../../common/LookupButton";
import DateInputField from "../../../../common/DateInputField";
import Input from "../../../../../components/common/input";
import { useParams } from "react-router-dom";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import { removeLeadingWhitespace } from "../../../../../utils/utils";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import useDebouncer from "../../../../../hooks/useDebouncer";
import LoadingIcon from "../../../../common/LoadingIcon";

function GeneralTabs() {
  const params = useParams();
  const customerId = params.id;
  const incompletecustomerId = params.incompletecustomerPK;

  const [customerPK, setCustomerPK] = useState("");
  const [incompleteCustomerPK, setIncompleteCustomerPK] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [dba, setDba] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [phone, setPhone] = useState("");
  const [tollfreephone, setTollFreePhone] = useState("");
  const [fax, setFax] = useState("");
  const [fieldRepresentative, setFieldRepresentative] = useState("");
  const [lastOrderDate, setLastOrderDate] = useState("");
  const [pastDueAmount, setPastDueAmount] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [lastPaymentDate, setLastPaymentDate] = useState("");
  const [lastPaymentAmount, setLastPaymentAmount] = useState("");
  const [notes, setNotes] = useState("");
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [customerGroupsFK, setCustomerGroupsFK] = useState(null);
  const [customerGroupsInput, setCustomerGroupsInput] = useState("");
  const [allCustomerGroups, setAllCustomerGroups] = useState([]);
  const [message, setMessage] = useState("");
  const [atleastOneGeneralError, setAtleastOneGeneralError] = useState(false);
  const [active, setActive] = useState(false);
  const [sisterCompany, setSisterCompany] = useState([]);
  const [hasSisterCompany, setHasSisterCompany] = useState(false);
  const [sisterCompanyName, setSisterCompanyName] = useState("");
  const [sisterCompanyID, setSisterCompanyId] = useState("");
  const [postalCodeOnChange, setPostalCodeOnChange] = useState(false);
  const [totalUnits, setTotalUnits] = useState("");
  const [yTDUnits, setYTDUnits] = useState("");
  const [estimatedUnits, setEstimatedUnits] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);

  const [loading, setLoading] = useState(false);
  const [codriverLoading, setcodriverLoading] = useState(false);

  let customerPhone = useSelector((state) => state.customerMaintenanceReducer.customerPhone);
  let customerTollPhone = useSelector((state) => state.customerMaintenanceReducer.customerTollPhone);

  const customerGroupsSelection = useSelector(
    (state) => state.customerMaintenanceReducer.customerGroupsSelection
  );
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const dispatch = useDispatch();

  const { incompletecustomerPK } = useParams();

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  let activeTab = useSelector((state) => state.customerMaintenanceReducer.activeTab);

  const onCancel = useSelector((state) => state.customerMaintenanceReducer.onCancel);
  const isCustomerLoading = useSelector((state) => state.customerMaintenanceReducer.isCustomerLoading);
  const customerNameExistCheck = useSelector(
    (state) => state.customerMaintenanceReducer.customerNameExistCheck
  );

  const tollfreeFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setTollFreePhone(formattedPhoneNumber);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };

  const hanldeNameExistCheck = useDebouncer((e) => {
    if (e.target.value?.trim() === "") return;
    setLoading(true);
    CustomerService.nameExistCheck(e.target.value, customerPK, incompleteCustomerPK)
      .then((res) => {
        const data = res?.data;
        setMessage(data);
        dispatch(setCustomerNameExistCheck(res?.data));
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, 300);

  const getCustomerGroupsByName = (string) => {
    setcodriverLoading(true);
    CustomerService.getCustomerGroupsByName(string)

      .then((response) => {
        const data = response?.data;
        const customersGroupList = (data?.content || [])?.map((customer) => ({
          ...customer,
          description: customer?.description?.trim(),
        }));
        setAllCustomerGroups(customersGroupList);
      })
      .finally(() => {
        setcodriverLoading(false);
      });
  };
  const fetchInputValueforCustomerGroups = (customerGroupFK, customerGroupName) => {
    if (customerGroupFK !== null && customerGroupName) {
      setCustomerGroupsInput(customerGroupName.trim());
    } else if (customerGroupFK !== null) {
      setLoading(true);
      CustomerService.getCustomerGroupsById(customerGroupFK)
        .then((response) => {
          const data = response?.data;
          setCustomerGroupsInput(data?.description?.trim());
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    } else {
      setCustomerGroupsInput("");
    }
  };

  const handleCustomerGroupsSelection = (customerGroups) => {
    setCustomerGroupsFK(customerGroups?.customerGroupPK);
    setCustomerGroupsInput(customerGroups?.description?.trim());
  };

  const handleCustomerGroupsLookupModalshow = () => {
    dispatch(setCustomerGroupsSelection(true));
  };

  const handleCustomerGroupsLookupSelection = (customerGroups) => {
    setCustomerGroupsFK(customerGroups?.customerGroupPK);
    setCustomerGroupsInput(customerGroups?.description?.trim());
    dispatch(setCustomerGroupsSelection(false));
  };

  const hideDCustomerGroupsModal = () => {
    dispatch(setCustomerGroupsSelection(false));
  };

  useEffect(() => {
    if (viewDetail || name === "") {
      setMessage("");
      dispatch(setCustomerNameExistCheck(""));
    }
  }, [viewDetail, name]);

  useEffect(() => {
    dispatch(
      setCustomerFormData({
        customerPK: customerPK,
        incompletecustomerPK: incompleteCustomerPK,
        description: description,
        name: name,
        dba: dba,
        address1: address1,
        address2: address2,
        sisterCompany: hasSisterCompany,
        sisterCompanyFK: sisterCompanyID,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        canadian: canadian,
        phone: phone?.replace(/\s+/g, ""),
        tollFreePhone: tollfreephone?.replace(/\s+/g, ""),
        fax: fax?.replace(/\s+/g, ""),
        customerGroupFK: customerGroupsFK,
        notes: notes,
        fieldRepresentative: fieldRepresentative,
        lastOrderDate: lastOrderDate,
        pastDueAmount: pastDueAmount,
        currentBalance: currentBalance,
        lastPaymentDate: lastPaymentDate,
        lastPaymentAmount: lastPaymentAmount,
        active: active,
        estimatedUnits: estimatedUnits,
        totalUnits: totalUnits,
      })
    );
  }, [
    customerPK,
    incompleteCustomerPK,
    description,
    name,
    dba,
    address1,
    address2,
    city,
    statecode,
    estimatedUnits,
    postalcode,
    canadian,
    phone,
    tollfreephone,
    fax,
    customerGroupsFK,
    hasSisterCompany,
    sisterCompanyID,
    notes,
    fieldRepresentative,
    lastOrderDate,
    pastDueAmount,
    currentBalance,
    lastPaymentDate,
    lastPaymentAmount,
    active,
  ]);

  useEffect(() => {
    if (!name || !description || !address1 || !postalCodePK) {
      dispatch(setIsGeneralTabValid(false));
    } else if (postalCodeOnChange) {
      dispatch(setIsGeneralTabValid(false));
    } else if ((phone && !phone?.match(phoneRegex)) || (tollfreephone && !tollfreephone?.match(phoneRegex))) {
      dispatch(setIsGeneralTabValid(false));
    } else if (!(phone || tollfreephone)) {
      dispatch(setIsGeneralTabValid(false));
    } else if (message) {
      dispatch(setIsGeneralTabValid(false));
    } else if (fax && !fax?.match(phoneRegex)) {
      dispatch(setIsGeneralTabValid(false));
    } else if (!customerGroupsFK && customerGroupsInput) {
      dispatch(setIsGeneralTabValid(false));
    } else if (hasSisterCompany && (!sisterCompanyID || sisterCompanyID === "select")) {
      dispatch(setIsGeneralTabValid(false));
    } else {
      dispatch(setIsGeneralTabValid(true));
    }
  }, [
    description,
    name,
    address1,
    phone,
    canadian,
    tollfreephone,
    fax,
    postalCodePK,
    customerGroupsFK,
    customerGroupsInput,
    sisterCompanyID,
    hasSisterCompany,
    description,
    message,
    postalCodeOnChange,
  ]);

  useEffect(() => {
    if (editCustomerData === null) {
      setDescription("");
      setName("");
      setDba("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setStateCode("");
      setPostalCode("");
      setCanadian("");
      setPhone("");
      setTollFreePhone("");
      setFax("");
      setCustomerGroupsFK(null);
      setCustomerGroupsInput("");
      setFieldRepresentative("");
      setLastOrderDate("");
      setNotes("");
      setIncompleteCustomerPK(null);
      setCustomerPK(null);
      setPostalValues(initialValue);
    }

    if (editCustomerData != null) {
      setSisterCompany(
        (editCustomerData.SisterCompany || []).map((company) => ({
          companyPK: company.CompanyPK,
          name: company.CompanyName,
        }))
      );
      setDescription(editCustomerData.description?.trim());
      setName(editCustomerData.name?.trim());
      setDba(editCustomerData.dba != null ? editCustomerData.dba?.trim() : "");
      setAddress1(editCustomerData.address1 != null ? editCustomerData.address1?.trim() : "");
      setAddress2(editCustomerData.address2 != null ? editCustomerData.address2?.trim() : "");
      setCity(editCustomerData.city != null ? editCustomerData.city?.trim() : "");
      setStateCode(editCustomerData.stateCode != null ? editCustomerData.stateCode?.trim() : "");
      setPostalCode(editCustomerData.postalCode != null ? editCustomerData.postalCode?.trim() : "");
      setCanadian(editCustomerData.canadian != null ? editCustomerData.canadian : "");
      setPostalCodePK(editCustomerData.postalCodePK ? editCustomerData.postalCodePK : null);
      setPhone(editCustomerData.phone != null ? formatPhoneNumber(editCustomerData.phone) : "");
      setTollFreePhone(
        editCustomerData.tollFreePhone != null ? formatPhoneNumber(editCustomerData.tollFreePhone) : ""
      );
      setHasSisterCompany(editCustomerData.sisterCompany);
      setSisterCompanyId(
        editCustomerData.sisterCompany && editCustomerData.sisterCompanyFK != null
          ? editCustomerData.sisterCompanyFK
          : ""
      );
      setFax(editCustomerData.fax != null ? formatPhoneNumber(editCustomerData.fax) : "");
      setCustomerGroupsFK(editCustomerData.customerGroupFK != null ? editCustomerData.customerGroupFK : "");
      fetchInputValueforCustomerGroups(editCustomerData.customerGroupFK, editCustomerData.customerGroupName);
      setFieldRepresentative(
        editCustomerData.fieldRepresentative != null ? editCustomerData.fieldRepresentative?.trim() : ""
      );
      setLastOrderDate(editCustomerData.lastOrderDate != null ? editCustomerData.lastOrderDate?.trim() : "");
      setNotes(editCustomerData.notes != null ? editCustomerData.notes?.trim() : "");
      setTotalUnits(editCustomerData.totalUnits ? editCustomerData.totalUnits : "");
      setYTDUnits(editCustomerData.ytdunits ? editCustomerData.ytdunits : "");
      setEstimatedUnits(editCustomerData.estimatedUnits ? editCustomerData.estimatedUnits : "");
      setActive(editCustomerData.active != null ? editCustomerData.active : "");
      if (null != editCustomerData.incompletecustomerPK) {
        setIncompleteCustomerPK(editCustomerData.incompletecustomerPK);
      } else if (null != editCustomerData.customerPK) {
        setCustomerPK(editCustomerData.customerPK);
      }
      initialValue[0].city = editCustomerData.city != null ? editCustomerData.city?.trim() : "";
      initialValue[0].statecode =
        editCustomerData.stateCode != null ? editCustomerData.stateCode?.trim() : "";
      initialValue[0].postalcode =
        editCustomerData.postalCode != null ? editCustomerData.postalCode?.trim() : "";
      setPostalValues(initialValue);
    }
  }, [editCustomerData, viewDetail]);

  // Atleast one required validation
  useEffect(() => {
    if (
      (customerPhone !== "" && customerPhone?.match(phoneRegex)) ||
      (customerTollPhone !== "" && customerTollPhone?.match(phoneRegex))
    ) {
      setAtleastOneGeneralError(true);
    } else {
      setAtleastOneGeneralError(false);
    }
  }, [customerPhone, customerTollPhone]);

  const validationSchema = yup.object({
    description: yup.string().required(),
    name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),

    postalcode: yup.string().required(),

    phone: yup.string().matches(phoneRegex),
    tollfreephone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
  });

  useEffect(() => {
    dispatch(setCustomerName(name));
  }, [name]);

  const getSisterCompanies = () => {
    setLoading(true);
    CustomerService.getSisterCompany(customerId, incompletecustomerId)
      .then(({ data }) => {
        setSisterCompany(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!customerId && !incompletecustomerId) getSisterCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasSisterCompany) {
      setSisterCompanyId("");
    }
  }, [hasSisterCompany]);
  useEffect(() => {
    dispatch(setCustomerPostalCode(postalcode));
    dispatch(setCustomerCity(city));
    dispatch(setCustomerStateCode(statecode));
  }, [postalcode, city, statecode]);

  return (
    <Formik
      initialValues={{
        description,
        name,
        address1,
        city,
        statecode,
        phone,
        tollfreephone,
        fax,
        postalcode,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        description: true,
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
          {loading && <LoadingIcon />}
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/* Description Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.general.tab.description.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      className="customFormControl"
                      name="description"
                      type="text"
                      value={description}
                      maxLength={30}
                      disabled={viewDetail}
                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        formik.setFieldValue("description", cleanedValue);
                        setDescription(cleanedValue);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail || isCustomerLoading
                            ? "black 1px solid"
                            : description?.length > 0
                              ? "green 2px solid"
                              : "red 2px solid",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Name Field */}
                <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.name")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      className="customFormControl"
                      name="name"
                      type="text"
                      value={name}
                      disabled={viewDetail}
                      maxLength={30}

                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        formik.setFieldValue("name", cleanedValue);
                        setName(cleanedValue);
                        hanldeNameExistCheck(e);
                      }}
                      style={{
                        border:
                          viewDetail || isCustomerLoading
                            ? "black 1px solid"
                            : formik.errors.name === undefined && name?.length > 0
                              ? message
                                ? "red 2px solid"
                                : "green 2px solid"
                              : "red 2px solid",
                      }}
                    />

                    <Row className={`${message ? "" : "hide-elements"} m-t-1`}>
                      <Col xs={2} md={2} sm={2}></Col>
                      <p className="mb-0 text-danger"> {message ? message : "error"}</p>
                    </Row>
                  </Col>
                </Form.Group>

                {/* DBA Field */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.dba")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      type="text"
                      className="customFormControl"
                      name="dba"
                      value={dba}
                      disabled={viewDetail}
                      maxLength={30}
                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        formik.setFieldValue("dba", cleanedValue);
                        setDba(cleanedValue);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Address Field-1*/}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.address")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      className="customFormControl"
                      name="ad1"
                      type="text"
                      maxLength={30}
                      value={address1}
                      disabled={viewDetail}
                      spellCheck={false}
                      aria-autocomplete="list"
                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        formik.setFieldValue("address1", cleanedValue);
                        setAddress1(cleanedValue);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail || isCustomerLoading
                            ? "black 1px solid  "
                            : formik.errors.address1 === undefined && address1?.length > 0
                              ? "green 2px solid"
                              : formik.errors.address1 !== undefined
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Address Field-2 */}
                <Form.Group className="mt-2 mb-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      className="customFormControl"
                      name="ad2"
                      value={address2}
                      type="text"
                      maxLength={30}
                      disabled={viewDetail}
                      spellCheck={false}
                      aria-autocomplete="list"
                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        formik.setFieldValue("address2", cleanedValue);
                        setAddress2(cleanedValue);
                      }}
                    />
                  </Col>
                </Form.Group>

                <PostalCodeComponent
                  disabled={viewDetail || isCustomerLoading}
                  city={viewDetail ? editCustomerData?.city?.trim() : city}
                  setCity={setCity}
                  stateCode={viewDetail ? editCustomerData?.stateCode?.trim() : statecode}
                  setStateCode={setStateCode}
                  postalCode={viewDetail ? editCustomerData?.postalCode?.trim() : postalcode}
                  setPostalCode={setPostalCode}
                  setPostalValues={setPostalValues}
                  postalOptions={postalOptions}
                  postalCodePK={postalCodePK}
                  setPostalCodePK={setPostalCodePK}
                  canadian={canadian}
                  setCanadian={setCanadian}
                />
                {/*Future reference*/}
                {/* {false&&(<PostalCode                  
                  city={viewDetail ? editCustomerData?.city?.trim() : city}
                  setCity={setCity}                  
                  statecode={viewDetail ? editCustomerData?.stateCode?.trim()  : statecode}
                  setStateCode={setStateCode}                  
                  postalcode={viewDetail ? editCustomerData?.postalCode?.trim()  : postalcode}
                  setPostalCode={setPostalCode}                  
                  canadian={canadian}
                  setCanadian={setCanadian}                  
                  postalOptions={postalOptions}
                  setPostalValues={setPostalValues}                  
                  Disabled={viewDetail || isCustomerLoading}                  
                  setReduxCity={setDealerCity}
                  setReduxStatecode={setDealerStatecode}
                  setReduxPostcode={setDealerPostcode}                  
                  setzipPostLenght={setzipPostLenght}
                  setcityLength={setcityLength}
                  cityLength={cityLength}
                  zipPostLenght={zipPostLenght}                  
                  formik={formik}
                  id={incompletecustomerPK}
                  loading={isCustomerLoading}
                  zipIdChcek={zipIdChcek}
                  postalCodeOnChange={postalCodeOnChange}
                  setPostalCodeOnChange={setPostalCodeOnChange}
                  onCancel={onCancel}
                  setOnCancel={setOnCancel}
                />)} */}

                {/* Phone Field */}
                <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.phone")}
                    </Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                    <Input
                      className="customFormControl"
                      name="phone"
                      value={phone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => {
                        formik.handleChange(e);
                        phoneFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail || isCustomerLoading
                            ? ""
                            : phone === "" && tollfreephone === ""
                              ? "red 2px solid"
                              : String(phone)?.match(phoneRegex)
                                ? "green 2px solid"
                                : String(tollfreephone)?.match(phoneRegex) && phone !== ""
                                  ? "red 2px solid"
                                  : String(tollfreephone)?.match(phoneRegex) && phone === ""
                                    ? "black 1px solid"
                                    : "red 2px solid",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* TollFree Phone Field */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.toll.free.phone")}
                    </Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                    <Input
                      className="customFormControl"
                      type="tollfreephone"
                      name="tollfreephone"
                      disabled={viewDetail}
                      value={tollfreephone}
                      onChange={(e) => {
                        formik.handleChange(e);
                        tollfreeFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      maxLength={14}
                      style={{
                        border:
                          viewDetail || isCustomerLoading
                            ? ""
                            : phone === "" && tollfreephone === ""
                              ? "red 2px solid"
                              : String(tollfreephone)?.match(phoneRegex)
                                ? "green 2px solid"
                                : String(phone)?.match(phoneRegex) && tollfreephone !== ""
                                  ? "red 2px solid"
                                  : String(phone)?.match(phoneRegex) && tollfreephone === ""
                                    ? "black 1px solid"
                                    : "red 2px solid",
                      }}
                    />
                  </Col>
                </Form.Group>

                <Row
                  className={`${
                    !viewDetail &&
                    !String(phone)?.match(phoneRegex) &&
                    !String(tollfreephone)?.match(phoneRegex)
                      ? "hide-elements"
                      : "hide-elements"
                  } m-t-1`}
                >
                  <Col xs={3} md={3} sm={3}></Col>
                  <Col style={{ paddingLeft: "5px" }}>
                    <p className="mb-0 text-danger">Enter atleast Phone or Tollfree Phone</p>
                  </Col>
                </Row>

                {/* Fax Field */}
                <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.fax")}
                    </Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                    <Input
                      className="customFormControl"
                      type="fax"
                      name="fax"
                      value={fax}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => {
                        formik.handleChange(e);
                        faxFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true || isCustomerLoading || fax === ""
                            ? "black 1px solid"
                            : formik.errors.fax === undefined && fax != null && fax?.length > 0
                              ? ""
                              : !phoneRegex.test(fax)
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Billing Customer Group AutoComplete*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.general.tab.billing.customer.group.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      arrayList={allCustomerGroups}
                      searchString={customerGroupsInput}
                      customFormatSearchString={(searchString) => searchString}
                      renderItemId={(customer) => customer.customerGroupPK}
                      renderItemField={(customer) => customer.description}
                      handleSearchString={(string) => setCustomerGroupsInput(string)}
                      fetchDataBySearchString={getCustomerGroupsByName}
                      onSelect={handleCustomerGroupsSelection}
                      selectedId={customerGroupsFK}
                      loading={codriverLoading}
                      clearInputCallback={() => {
                        setCustomerGroupsFK(null);
                      }}
                      disabled={viewDetail}
                      className={`${customerGroupsFK === null && customerGroupsInput !== "" ? "borderRed" : ""}`}
                    />
                    <LookupButton onClick={handleCustomerGroupsLookupModalshow} disabled={viewDetail} />
                  </Col>
                </Form.Group>

                {/*Field Representative*/}
                <Form.Group className=" form-group mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.general.tab.field.representative.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      className="customFormControl"
                      name="fieldRepresentative"
                      value={fieldRepresentative}
                      maxLength={30}
                      disabled={viewDetail}

                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        formik.setFieldValue("fieldRepresentative", cleanedValue);
                        setFieldRepresentative(cleanedValue);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} md={6} xs={6}>
                <Row>
                  <Col sm={6} md={6} xs={6}>
                    {/* Last Order Field */}
                    <Form.Group className=" form-group mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="col-form-label dealer-label">
                          {t("customer.maintanance.general.tab.last.order.field")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "79px" }}>
                        <DateInputField
                          name="lastOrderDate"
                          date={lastOrderDate}
                          setDate={setLastOrderDate}
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    {/* Total Units */}
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="col-form-label dealer-label">Total Units</Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "79px" }}>
                        <Input
                          type="text"
                          className="customFormControl"
                          name="pastDueAmount"
                          maxLength={5}
                          disabled
                          value={totalUnits}
                        />
                      </Col>
                    </Form.Group>

                    {/* YTD Units */}
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="col-form-label dealer-label">YTD Units</Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "79px" }}>
                        <Input
                          type="text"
                          className="customFormControl"
                          name="pastDueAmount"
                          maxLength={5}
                          disabled
                          value={yTDUnits}
                        />
                      </Col>
                    </Form.Group>

                    {/* Estimated Units */}
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="col-form-label dealer-label">Estimated Units</Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "79px" }}>
                        <Input
                          type="text"
                          className="customFormControl"
                          name="pastDueAmount"
                          maxLength={5}
                          disabled={viewDetail}
                          value={estimatedUnits}
                          onChange={(e) => {
                            e.target.value?.match(/^\d{0,5}?$/) &&
                              e.target.value <= 32767 &&
                              setEstimatedUnits(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={6} md={6} xs={6}>
                    {/* Current Balance Field */}
                    <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="col-form-label dealer-label">
                          {t("customer.maintanance.general.tab.current.balance.field")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "79px" }}>
                        <Input
                          className="customFormControl"
                          value={editCustomerData?.currentBalance}
                          name="currentBalance"
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    {/* Past Due Amount Field */}
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="col-form-label dealer-label">
                          {t("customer.maintanance.general.tab.past.due.amount.field")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "79px" }}>
                        <Input
                          type="text"
                          className="customFormControl"
                          name="pastDueAmount"
                          value={editCustomerData?.pastDueAmount}
                          maxLength={50}
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    {/* Last Payment Field*/}
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="col-form-label dealer-label">
                          {t("customer.maintanance.general.tab.last.payment.field")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "79px" }}>
                        <DateInputField
                          name="lastPayment"
                          disabled
                          date={editCustomerData?.lastPaymentDate || ""}
                        />
                      </Col>
                    </Form.Group>

                    {/*Last Payment Amount Field*/}
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="col-form-label dealer-label">
                          {t("customer.maintanance.general.tab.last.payment.amount.field")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "79px" }}>
                        <Input
                          className="customFormControl"
                          value={editCustomerData?.lastPaymentAmount}
                          name="lastPaymentAmount"
                          disabled
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mt-5 form-group align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Sister Company</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                    <Col xs={1} md={1} sm={1} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 mt-2"
                        name="hasSisterCompany"
                        checked={hasSisterCompany}
                        disabled={viewDetail}
                        onChange={(e) => {
                          setHasSisterCompany(e.target.checked);
                        }}
                      />
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <Form.Select
                        name="SisterCompany"
                        id="SisterCompany"
                        disabled={viewDetail || !hasSisterCompany}
                        value={sisterCompanyID}
                        onChange={(e) => {
                          setSisterCompanyId(e.target.value);
                        }}
                        className={`customFormControl ${
                          viewDetail || !hasSisterCompany
                            ? ""
                            : sisterCompanyID && sisterCompanyID !== "select"
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                      >
                        <option value="select">--Select--</option>
                        {sisterCompany?.map((item) => (
                          <option key={item.companyPK} value={item.companyPK}>
                            {item.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Col>
                </Form.Group>

                {/* Notes */}

                <Form.Group className="m-t-15 row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Notes</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "410px" }}>
                    <textarea
                      rows={7}
                      cols={200}
                      type="text"
                      style={{
                        resize: "none",
                        display: "fixed",
                        maxWidth: "520px",
                        boxShadow: "none",
                        fontSize: "12px",
                      }}
                      className={`customFormControl h-100`}
                      name="notes"
                      value={notes}
                      disabled={viewDetail}
                      autoComplete="off"
                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setNotes(cleanedValue);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {/* Customer Groups Lookup Modal */}
            <CustomerGroupsLookup
              show={customerGroupsSelection}
              onHide={hideDCustomerGroupsModal}
              renderItemId={(customerGroups) => customerGroups.customerGroupPK}
              handleLookupSelection={handleCustomerGroupsLookupSelection}
              MaintenanceProgram
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default GeneralTabs;
