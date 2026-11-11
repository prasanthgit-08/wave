import { formatForApi } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import DateInputField from "../../../common/DateInputField";
import PostalCode from "../../../common/PostalCode";
import { emailRegex } from "../../../../utils/validation/EmailRegex";
import {
  resetStates,
  setAddress1,
  setAddress2,
  setCallBack,
  setCanandianNew,
  setCheckName,
  setCityNew,
  setCommodityType,
  setContact,
  setCurrentTransporter,
  setCustomerProspectsPostalCodePK,
  setEditFormData,
  setEmail,
  setIsCallDateValid,
  setLastUpdate,
  setLoadingFlag,
  setLoadsPerYear,
  setManagerId,
  setManagerInput,
  setMilesPerLoad,
  setName,
  setNotes,
  setOnCancel,
  setPhone,
  setPostalCodeNew,
  setPostalCodeOnChange,
  setSaveData,
  setStateCodeNew,
  setViewDetail,
  setWebsite,
  setZipPostLengthNew,
} from "../../../../redux/CustomerProspectsSlice";
import {
  setDealerCity,
  setDealerPostcode,
  setDealerStatecode,
  setDealerZipPostLenght,
} from "../../../../redux/EditDealerSlice";
import CustomerProspectsSevice from "../../../../services/CustomerProspectsSevice";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import PostalCodeComponent from "../../../common/PostalCodeComponent";

const CustomerProspectsContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];

  //Setting Current Date
  const todayDate = formatForApi(new Date());
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [managerData, setManagerData] = useState([]);
  const [showLookup, setShowLookup] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const navigate = useNavigate();
  const name = useSelector((state) => state.customerProspectsReducer.name);
  const [canadian, setCanadian] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const managerId = useSelector((state) => state.customerProspectsReducer.managerId);
  const managerInput = useSelector((state) => state.customerProspectsReducer.managerInput);
  const address1 = useSelector((state) => state.customerProspectsReducer.address1);
  const address2 = useSelector((state) => state.customerProspectsReducer.address2);

  const phone = useSelector((state) => formatPhoneNumber(state.customerProspectsReducer.phone));
  const email = useSelector((state) => state.customerProspectsReducer.email);
  const contact = useSelector((state) => state.customerProspectsReducer.contact);
  const website = useSelector((state) => state.customerProspectsReducer.website);

  const commodityType = useSelector((state) => state.customerProspectsReducer.commodityType);
  const currentTransporter = useSelector((state) => state.customerProspectsReducer.currentTransporter);
  const callBack = useSelector((state) => state.customerProspectsReducer.callBack);
  const lastUpdate = useSelector((state) => state.customerProspectsReducer.lastUpdate);
  const loadsPerYear = useSelector((state) => state.customerProspectsReducer.loadsPerYear);
  const milesPerLoad = useSelector((state) => state.customerProspectsReducer.milesPerLoad);
  const notes = useSelector((state) => state.customerProspectsReducer.notes);
  const checkName = useSelector((state) => state.customerProspectsReducer.checkName);

  const editFormData = useSelector((state) => state.customerProspectsReducer.editFormData);

  const viewDetail = useSelector((state) => state.customerProspectsReducer.viewDetail);

  const isCallDateValid = useSelector((state) => state.customerProspectsReducer.isCallDateValid);
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };
  const postalCodeOnChange = useSelector((state) => state.customerProspectsReducer.postalCodeOnChange);
  const loadingFlag = useSelector((state) => state.customerProspectsReducer.loadingFlag);
  const fetchRecordById = (id) => {
    dispatch(setLoadingFlag(true));
    CustomerProspectsSevice.getRecordById(id)
      .then((response) => {
        const { data } = response;

        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        setTimeout(() => {
          dispatch(setLoadingFlag(false));
        }, 100);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingFlag(false));
        navigate("/customer-prospects/");
      });
  };

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setName(editFormData.name != null ? editFormData.name?.trim() : ""));

      dispatch(setAddress1(editFormData.address1 != null ? editFormData.address1?.trim() : ""));
      dispatch(setAddress2(editFormData.address2 != null ? editFormData.address2?.trim() : ""));

      setCity(editFormData.city != null ? editFormData.city?.trim() : "");

      setStateCode(editFormData.stateCode != null ? editFormData.stateCode?.trim() : "");

      setPostalCode(editFormData.postalCode != null ? editFormData.postalCode?.trim() : "");

      setCanadian(editFormData.canadian != null ? editFormData.canadian : "");

      dispatch(setPhone(editFormData.phone ? editFormData.phone : ""));
      dispatch(setEmail(editFormData.email != null ? editFormData.email : ""));
      dispatch(setContact(editFormData.contact != null ? editFormData.contact : ""));
      dispatch(setWebsite(editFormData.website != null ? editFormData.website : ""));

      dispatch(setCommodityType(editFormData.commodityType != null ? editFormData.commodityType : ""));

      dispatch(setNotes(editFormData.notes != null ? editFormData.notes?.trim() : ""));
      dispatch(
        setCurrentTransporter(editFormData.currentTransporter != null ? editFormData.currentTransporter : "")
      );
      dispatch(setCallBack(editFormData.callBackDate != null ? editFormData.callBackDate : ""));
      dispatch(setLastUpdate(editFormData.lastUpdate != null ? editFormData.lastUpdate : ""));
      dispatch(setMilesPerLoad(editFormData.milesPerLoad != null ? editFormData.milesPerLoad : ""));
      dispatch(setLoadsPerYear(editFormData.loadsPerYear != null ? editFormData.loadsPerYear : ""));

      initialValue[0].city = editFormData.city != null ? editFormData.city?.trim() : "";
      initialValue[0].statecode = editFormData.statecode != null ? editFormData.statecode?.trim() : "";
      initialValue[0].postalcode = editFormData.postalcode != null ? editFormData.postalcode?.trim() : "";
      setPostalValues(initialValue);
      dispatch(setManagerInput(editFormData.accountManagerUserFK.name?.trim()));
      dispatch(setManagerId(editFormData.accountManagerUserFK.userPK));
      setPostalCodePK(editFormData.postalCodePK ? editFormData.postalCodePK : null);
    }

    if (!viewDetail) {
      dispatch(setLastUpdate(todayDate));
    }
  }, [editFormData, viewDetail]);

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };
  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };
  //for save
  const formData = () => {
    dispatch(
      setSaveData({
        customerProspectPK: id,
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        email: email,
        website: website,
        phone: phone?.replace(/\s+/g, ""),
        contact: contact,
        notes: notes,
        lastUpdate: todayDate,
        milesPerLoad: milesPerLoad,
        loadsPerYear: loadsPerYear,
        callBackDate: callBack,
        commodityType: commodityType,
        currentTransporter: currentTransporter,
        userId: managerId,
        canadian: canadian,
      })
    );
  };

  /**
   * Fetch all Users
   * Used for Manager Autocomplete
   */
  const fetchUserManager = (string) => {
    setIsLoading(true);
    CustomerProspectsSevice.getAllUserData(string)
      .then((response) => {
        const data = response?.data?.content;
        const managerList = data?.map((managers) => ({
          ...managers,
          name: managers.name?.trim(),
        }));
        setManagerData(managerList);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const handleManagerLookupSelection = (item) => {
    dispatch(setManagerId(item.userPK));
    dispatch(setManagerInput(item.name?.trim()));
    setShowLookup(false);
  };

  const handleManagerLookup = () => {
    setShowLookup(true);
  };
  const handleCheckName = (name) => {
    CustomerProspectsSevice.nameExistCheck(name, id)
      .then((res) => {
        dispatch(setCheckName(res?.data));
      })
      .catch((err) => {
        dispatch(setCheckName(false));
      });
  };
  useEffect(() => {
    if (editFormData == null || editFormData === undefined) {
      dispatch(resetStates());
    }
  }, [editFormData]);
  useEffect(() => {
    formData();
  }, [
    name,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    canadian,
    phone,
    lastUpdate,
    email,
    website,
    callBack,
    commodityType,
    currentTransporter,
    milesPerLoad,
    loadsPerYear,
    managerId,
    notes,
    canadian,
  ]);
  useEffect(() => {
    dispatch(setDealerZipPostLenght(zipPostLenght));
    dispatch(setCanandianNew(canadian));
    dispatch(setStateCodeNew(statecode));
    dispatch(setPostalCodeNew(postalcode));
    dispatch(setZipPostLengthNew(zipPostLenght));
    dispatch(setCityNew(city));
    dispatch(setCustomerProspectsPostalCodePK(postalCodePK));
  }, [zipPostLenght, statecode, postalcode, city, canadian, city, postalCodePK]);

  // only number function

  const isNumber = (value) => {
    if (!value) return value;

    const phoneNumber = value?.replace(/[^\d]/g, "");

    if (value) return phoneNumber;
  };
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),

    email: yup.string().matches(emailRegex),
    managerInput: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    contact: yup.string().required(),
    commodityType: yup.string().required(),
  });
  useEffect(() => {
    setStateCode("");
    setPostalCode("");
    setCity("");
    dispatch(setCheckName(false));
  }, []);

  return (
    <Formik
      initialValues={{
        name,
        address1,
        city,
        postalcode,
        statecode,
        email,
        managerInput,
        phone,
        contact,
        commodityType,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        name: true,
        address1: true,
        city: true,
        postalcode: true,
        statecode: true,
        email: true,
        managerInput: true,
        phone: true,
        contact: true,
        commodityType: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="shadow-sm rounded border halfScreenFormContentHeight">
            <div className="p-15 w-100 ">
              <Row className="m-0 p-0 ">
                <Col sm={7} md={7} lg={7} xl={7} xs={7}>
                  <Form.Group className=" mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className=" col-form-label dealer-label">Account Manager</Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className={`p-0 d-flex w-315`}>
                      {/*Manager Autocomplete */}

                      <AutoCompleteDropdown
                        arrayList={managerData}
                        searchString={managerInput}
                        renderItemId={(item) => item.userPK}
                        renderItemField={(item) => item.name}
                        handleSearchString={(string) => dispatch(setManagerInput(string))}
                        fetchDataBySearchString={fetchUserManager}
                        onSelect={handleManagerLookupSelection}
                        selectedId={managerId}
                        clearInputCallback={() => {
                          dispatch(setManagerId(null));
                        }}
                        disabled={viewDetail}
                        className={`${styles.formControl}  ${
                          viewDetail || loadingFlag
                            ? ""
                            : formik.errors.managerInput || managerId === null
                              ? "borderRed"
                              : "borderGreen"
                        }
                              `}
                        loading={isLoading}
                      />

                      <LookupButton onClick={handleManagerLookup} disabled={viewDetail} />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>
                        {t("edit.yard.page.general.tab.name")}
                      </Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        name="name"
                        type="text"
                        className={`${styles.formControl}  ${
                          viewDetail || loadingFlag
                            ? ""
                            : formik.errors.name === undefined && name?.length >= 1
                              ? checkName
                                ? "borderRed"
                                : "borderGreen"
                              : "borderRed"
                        }
                              `}
                        maxLength={30}
                        id="name"
                        value={name}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onChange={(e) => {
                          dispatch(setName(e.target.value?.replace(/^[^a-zA-Z0-9]+/, "")));
                          dispatch(setCheckName(false));
                        }}
                        onBlur={(e) => handleCheckName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-2 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>
                        {t("edit.yard.page.general.tab.address")}
                      </Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        type="text"
                        className={`${styles.formControl} ${
                          viewDetail === true || loadingFlag
                            ? ""
                            : formik.errors.address1 === undefined &&
                                address1 != null &&
                                address1?.length >= 1
                              ? "borderGreen"
                              : formik.errors.address1 !== undefined
                                ? "borderRed"
                                : ""
                        }
                              `}
                        id="ad1"
                        name="ad1"
                        value={address1}
                        disabled={viewDetail}
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          dispatch(setAddress1(e.target.value?.replace(/^\s+/g, "")));
                        }}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-2 mb-3  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}></Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        type="text"
                        className={styles.formControl}
                        id="ad2"
                        name="ad2"
                        maxLength={30}
                        value={address2}
                        disabled={viewDetail}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          dispatch(setAddress2(e.target.value?.replace(/^\s+/g, "")));
                        }}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>
                  <PostalCodeComponent
                    disabled={viewDetail || loadingFlag}
                    city={viewDetail ? editFormData?.city?.trim() : city}
                    setCity={setCity}
                    stateCode={viewDetail ? editFormData?.stateCode?.trim() : statecode}
                    setStateCode={setStateCode}
                    postalCode={viewDetail ? editFormData?.postalCode?.trim() : postalcode}
                    setPostalCode={setPostalCode}
                    setPostalValues={setPostalValues}
                    postalOptions={postalOptions}
                    postalCodePK={postalCodePK}
                    setPostalCodePK={setPostalCodePK}
                    canadian={canadian}
                    setCanadian={setCanadian}
                  />

                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Contact</Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        type="text"
                        className={`${styles.formControl} ${
                          viewDetail === true || loadingFlag
                            ? ""
                            : formik.errors.contact === undefined && contact != null && contact?.length >= 1
                              ? "borderGreen"
                              : formik.errors.contact !== undefined
                                ? "borderRed"
                                : ""
                        }
                              `}
                        id="contact"
                        name="contact"
                        value={contact}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          dispatch(setContact(e.target.value?.replace(/^\s+/g, "")));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>
                        {t("edit.yard.page.general.tab.phone")}
                      </Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                      <input
                        type="text"
                        className={`${styles.formControl}  ${
                          viewDetail === true || loadingFlag
                            ? ""
                            : formik.errors.phone === undefined && phone != null && phone?.length >= 1
                              ? "borderGreen"
                              : formik.errors.phone !== undefined
                                ? "borderRed"
                                : ""
                        }
                              `}
                        id="phone"
                        name="phone"
                        value={phone}
                        maxLength={14}
                        onChange={(e) => phoneFormatHandler(e)}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          dispatch(setPhone(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Email</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        type="text"
                        className={`${styles.formControl}  ${
                          viewDetail === true
                            ? ""
                            : formik.errors.email === undefined && email != null && email?.length > 1
                              ? ""
                              : formik.errors.email !== undefined
                                ? "borderRed"
                                : ""
                        }
                              `}
                        id="email"
                        name="email"
                        value={email}
                        maxLength={70}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          dispatch(setEmail(e.target.value?.replace(/^[^a-zA-Z0-9]+/, "")));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Website</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        type="text"
                        className={`${styles.formControl}`}
                        id="website"
                        name="website"
                        value={website}
                        maxLength={70}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          dispatch(setWebsite(e.target.value?.replace(/^\s+/g, "")));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Commodity Type</Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        className={`${styles.formControl} ${
                          viewDetail === true || loadingFlag
                            ? ""
                            : formik.errors.commodityType === undefined &&
                                commodityType != null &&
                                commodityType?.length >= 1
                              ? "borderGreen"
                              : formik.errors.commodityType !== undefined
                                ? "borderRed"
                                : ""
                        }
                            `}
                        type="text"
                        id="commodityType"
                        name="commodityType"
                        value={commodityType}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          dispatch(setCommodityType(e.target.value?.replace(/^\s+/g, "")));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Current Transporter</Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        type="text"
                        className={`${styles.formControl}`}
                        id="currentTransporter"
                        name="currentTransporter"
                        value={currentTransporter}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          dispatch(setCurrentTransporter(e.target.value?.replace(/^\s+/g, "")));
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={5}>
                  <Form.Group className=" mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Call Back</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                      <DateInputField
                        date={callBack}
                        setDate={(value) => dispatch(setCallBack(value))}
                        disabled={viewDetail}
                        format={"MM/DD/YY"}
                        setIsDateValid={(value) => dispatch(setIsCallDateValid(value))}
                        className={`customFormControl ${
                          viewDetail === true ? "" : isCallDateValid ? "" : "borderRed"
                        }`}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Last Update</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                      <DateInputField
                        date={loadingFlag ? "" : lastUpdate ? lastUpdate : new Date()}
                        setDate={(value) => dispatch(setLastUpdate(value))}
                        disabled
                        className={styles.formControl}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Loads per Year</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-50px">
                      <input
                        type="text"
                        className={`${styles.formControl}`}
                        id=" loadsPerYear"
                        name=" loadsPerYear"
                        value={loadsPerYear}
                        maxLength={4}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          dispatch(setLoadsPerYear(isNumber(e.target.value)));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Miles per Load</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-50px">
                      <input
                        type="text"
                        className={`${styles.formControl}`}
                        id="milesPerLoad"
                        name="milesPerLoad"
                        value={milesPerLoad}
                        disabled={viewDetail}
                        maxLength={4}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          dispatch(setMilesPerLoad(isNumber(e.target.value)));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Notes</Form.Label>
                    </Col>
                    <Col sm={10} md={10} className="p-0 m-t-10">
                      <textarea
                        rows={12}
                        cols={30}
                        type="text"
                        className={`${styles.formControl} h-100 `}
                        id="notes"
                        name="notes"
                        value={notes}
                        disabled={viewDetail}
                        onInput={(e) => dispatch(setNotes(e.target.value?.replace(/^\s+/g, "")))}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              {loadingFlag && (
                <div className="fade modal-backdrop show">
                  {" "}
                  <div className="pos-center">
                    {" "}
                    <div className="loader"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <UserLookup
            show={showLookup}
            onHide={() => setShowLookup(false)}
            renderItemId={(user) => user.userPK}
            handleLookupSelection={handleManagerLookupSelection}
            MaintenanceProgram
          />
        </Form>
      )}
    </Formik>
  );
};

export default CustomerProspectsContent;
