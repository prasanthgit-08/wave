import { t } from "i18next";
import React from "react";
import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import OrderEntryService from "../../../../../services/OrderEntryService";
import PostalCode from "../../../../common/PostalCode";
import {
  setIsCustomerMisc,
  setMiscCustomerData,
  setMiscCustomerTabIsValid,
  setSelectedCustomerId,
  setQuickPayCustomer,
  setMiscCustomerSelection,
  setMiscCustomerId,
  setPostalCodeOnChange,
  setOnCancel,
} from "../../../../../redux/OrderEntryFilterSlice";
import { useDispatch } from "react-redux";
import MiscCustomerLookup from "../../../../LookupScreens/MiscCustomer/MiscCustomerLookup";
import {
  setPageNumber,
  resetSearchSettings,
  setMiscCity,
  setMiscPostalCode,
  setMiscStateCode,
} from "../../../../../redux/LookupScreens/MiscCustomerLookupSlice";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import LoadingIcon from "../../../../common/LoadingIcon";

const MiscCustomer = ({ styles }) => {
  const dispatch = useDispatch();

  /********************************************* Local variable declaration starts here *********************************************/
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [quickPayTerms, setQuickPayTerms] = useState("");

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [viewDetail, setViewDetail] = useState(false);

  const [zipIdChcek, setZipIdCheck] = useState("");
  const [postalCodeOnChange, setPostalCodeOnChange] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [loading, setLoading] = useState(false);

  /********************************************* Local variable declaration ends here ***********************************************/

  /********************************************* Redux variable declaration starts here *********************************************/

  const customerData = useSelector((state) => state.orderEntryReducer.customerData);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const isCustomerMisc = useSelector((state) => state.orderEntryReducer.isCustomerMisc);
  const quickPayCustomer = useSelector((state) => state.orderEntryReducer.quickPayCustomer);
  const id = useSelector((state) => state.orderEntryReducer.miscCustomerId);
  const miscCustomerSelection = useSelector((state) => state.orderEntryReducer.miscCustomerSelection);
  const onCancel = useSelector((state) => state.orderEntryReducer.onCancel);
  /********************************************* Redux variable declaration ends here ************************************************/

  /**********************************************  Function Definitions starts here  ***************************************************/

  // eslint-disable-next-line react-hooks/exhaustive-deps
  /**
   * set values to CustomerAddressVO
   */
  function setMiscCustomerRequestData() {
    dispatch(
      setMiscCustomerData({
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
  }
  /**
   * fetch Misc customer by id and set the values
   */
  const fetchMiscCustomersById = (id) => {
    setLoading(true);
    OrderEntryService.fetchMiscCustomersById(id)
      .then((response) => {
        const data = response.data;

        setName(data.name != null ? data.name?.trim() : "");
        setAddress1(data.address1 != null ? data.address1?.trim() : "");
        setAddress2(data.address2 != null ? data.address2?.trim() : "");
        setCity(data.city != null ? data.city?.trim() : "");
        setStateCode(data.stateCode != null ? data.stateCode?.trim() : "");
        setPostalCode(data.postalCode != null ? data.postalCode?.trim() : "");
        setCanadian(data.canadian != null ? data.canadian : "");
        setPhone(data.phone != null ? formatPhoneNumber(data.phone) : "");
        setFax(data.fax != null ? formatPhoneNumber(data.fax) : "");
        setEmail(data.email != null ? data.email?.trim() : "");
        setContact(data.contact != null ? data.contact?.trim() : "");
        setQuickPayTerms(data.quickPayTerms != null ? data.quickPayTerms?.trim() : "");
        initialValue[0].city = data.city != null ? data.city?.trim() : "";
        initialValue[0].statecode = data.statecode != null ? data.statecode?.trim() : "";
        initialValue[0].postalcode = data.postalcode != null ? data.postalcode?.trim() : "";
        setPostalValues(initialValue);
        setPostalCodePK(data.postalCodePK ? data.postalCodePK : null);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  /************************************************  Function Definitions ends here  ************************************************/

  /****************************************************  Handles for Evevnts starts here  ********************************************/
  /**
   * used for Misc Customer selection Lookup - onSelect
   */
  const handleMiscCustomerSelection = () => {
    dispatch(setPageNumber(0));
    dispatch(setMiscCustomerSelection(true));
    dispatch(resetSearchSettings());
    setZipIdCheck("zipValidId");
  };
  /**
   * used for Misc Customer selection Lookup - onClose
   */
  const miscCustomerModalHide = () => {
    dispatch(setMiscCustomerSelection(false));
    setZipIdCheck("lookup");
  };
  /****************************************************  Handles for Evevnts ends here  ********************************************/

  /***************************************************  UseEffects starts here  ****************************************************/
  /**
   * set Misc Customer flag in redux
   */
  useEffect(() => {
    if (customerData !== null) {
      dispatch(setIsCustomerMisc(customerData?.miscellaneousCustomer));
    }
  }, [customerData]);

  /**
   * clear data when selected customer id changes
   */
  useEffect(() => {
    if (selectedCustomerId === null) {
      dispatch(setMiscCustomerId(null));
      setName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setStateCode("");
      setPostalCode("");
      setCanadian(false);
      setPhone("");
      setFax("");
      setEmail("");
      setContact("");
      setQuickPayTerms("");
      setViewDetail(false);
      dispatch(setMiscCustomerData(null));
    }
  }, [selectedCustomerId]);
  /**
   * calls Misc customer by id
   */
  useEffect(() => {
    if (id !== null && id !== "" && id !== undefined) {
      fetchMiscCustomersById(id);
    }
  }, [id]);
  /**
   * set data for save
   */
  useEffect(() => {
    setMiscCustomerRequestData();
  }, [
    name,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    canadian,
    phone,
    email,
    fax,
    contact,
    quickPayTerms,
  ]);
  /**
   * Misc customer tab validation
   */
  useEffect(() => {
    if (
      name !== "" &&
      address1 !== "" &&
      contact !== "" &&
      postalCodePK &&
      phone !== "" &&
      phone.match(phoneRegex) &&
      (fax === "" || fax.match(phoneRegex)) &&
      (email === "" || email.match(emailRegex)) &&
      ((quickPayCustomer === true && quickPayTerms !== "") ||
        (quickPayCustomer === false && quickPayTerms === ""))
    ) {
      dispatch(setMiscCustomerTabIsValid(true));
    } else {
      dispatch(setMiscCustomerTabIsValid(false));
    }
  }, [
    name,
    address1,
    statecode,
    canadian,
    postalcode,
    phone,
    fax,
    email,
    contact,
    quickPayCustomer,
    quickPayTerms,
    postalCodeOnChange,
    postalCodePK,
  ]);

  /**
   * set data for postal code
   */
  useEffect(() => {
    if (city && statecode && postalcode) {
      setViewDetail(false);
    }
  }, [city, statecode, postalcode]);
  /*****************************************************  UseEffects ends here  ******************************************************/
  //Validation
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };
  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
  const notCanadianPostalCode = /^((\d{5}-\d{4})|(\d{5}))$/;
  const canadianPostalCode = /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/;

  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    contact: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    fax: yup.string().matches(phoneRegex),
    email: yup.string().matches(emailRegex),
  });

  return (
    <Formik
      initialValues={{
        name,
        address1,
        city,
        statecode,
        postalcode,
        canadian,
        contact,
        phone,
        fax,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        name: true,
        address1: true,
        city: true,
        statecode: true,
        postalcode: true,
        canadian: false,
        contact: true,
        phone: true,
      }}
    >
      {(formik) => (
        <div>
          {loading && <LoadingIcon />}
          <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
            <Row>
              <Col sm={6} xs={6}>
                <p className="">Miscellaneous Customer</p>

                <div className="p-l-25">
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0" />
                    <Col xs={4} md={4} sm={4} className={`p-0 ${styles.selectContainer}`}>
                      <button
                        className={`customFormControl`}
                        name="miscCustomerSelection"
                        id="miscCustomerSelection"
                        style={{ background: "#e9ecef" }}
                        onClick={handleMiscCustomerSelection}
                      >
                        Miscellaneous Customer Selection
                      </button>
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className={`customColFormLabel`}>
                        {t("edit.dealer.page.general.tab.name")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail
                            ? "black"
                            : formik.errors.name === undefined && name?.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setName(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="address1" className={`customColFormLabel`}>
                        {t("edit.dealer.page.general.tab.address")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail
                            ? "black"
                            : formik.errors.address1 === undefined && address1?.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="ad1"
                        name="ad1"
                        type="text"
                        value={address1}
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setAddress1(e.target.value);
                        }}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-2  mb-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="address2" className={`customColFormLabel`}></Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl `}
                        id="ad2"
                        name="ad2"
                        type="text"
                        value={address2}
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        onInput={(e) => setAddress2(e.target.value)}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>

                  <PostalCodeComponent
                    disabled={viewDetail}
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
                  />

                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>
                        {t("edit.dealer.page.general.tab.phone")}
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-105px">
                      <input
                        className={`customFormControl  ${
                          viewDetail === true
                            ? "black"
                            : formik.errors.phone === undefined && phone != null && phone?.length >= 1
                              ? "borderGreen"
                              : formik.errors.phone !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        control="input"
                        name="phone"
                        maxLength={14}
                        value={phone}
                        onChange={(e) => phoneFormatHandler(e)}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setPhone(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>
                        {t("edit.dealer.page.general.tab.fax")}
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-105px">
                      <input
                        className={`customFormControl  ${
                          viewDetail === true
                            ? "black"
                            : formik.errors.fax === undefined && fax != null && fax?.length >= 1
                              ? ""
                              : formik.errors.fax !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        type="fax"
                        name="fax"
                        maxLength={14}
                        value={fax}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onChange={(e) => faxFormatHandler(e)}
                        onInput={(e) => setFax(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Email</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail === true
                            ? "black"
                            : formik.errors.email === undefined && email != null && email?.length >= 1
                              ? ""
                              : formik.errors.email !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        type="email"
                        name="email"
                        maxLength={70}
                        value={email}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setEmail(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Contact</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail
                            ? "black"
                            : formik.errors.contact === undefined && contact?.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        type="contact"
                        name="contact"
                        maxLength={42}
                        value={contact}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setContact(e.target.value);
                        }}
                        style={{
                          borderColor: viewDetail
                            ? "black"
                            : formik.errors.contact === undefined && contact?.length >= 1
                              ? "green"
                              : "red",
                        }}
                      />
                    </Col>
                  </Form.Group>
                  {quickPayCustomer && (
                    <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className={`customColFormLabel`}>Quick Pay Terms</Form.Label>
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0">
                        <input
                          type="quickPayTerms"
                          name="quickPayTerms"
                          maxLength={30}
                          value={quickPayTerms}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => setQuickPayTerms(e.target.value)}
                          className={`customFormControl  ${
                            quickPayCustomer
                              ? quickPayTerms === "" || quickPayTerms === null
                                ? "borderRed"
                                : "borderGreen"
                              : ""
                          }`}
                        />
                      </Col>
                    </Form.Group>
                  )}
                </div>
              </Col>
            </Row>
          </div>

          {/* MiscCustomer Lookup Modal */}
          <MiscCustomerLookup
            show={miscCustomerSelection}
            onHide={miscCustomerModalHide}
            OEMiscCustomerTab={true}
          />
        </div>
      )}
    </Formik>
  );
};

export default MiscCustomer;
