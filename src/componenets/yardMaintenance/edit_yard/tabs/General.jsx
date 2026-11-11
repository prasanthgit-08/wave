import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import {
  setYardDescription,
  setYardFormData,
  setCheckDEscriptionExist,
  setYardCanadian,
  setYardZipLength,
  setYardAddress,
  setYardFax,
  setYardName,
  setYardCity,
  setYardStatecode,
  setYardPostcode,
  setYardPhone,
  setYardCityLength,
  setShowDealerLookup,
  setDealerInput,
  setDealerLookupFK,
  setUserLookupFK,
  setUserInput,
  setUserManagerInput,
  setUserManagerFK,
  setShowSupervisorLookup,
  setShowManagerLookup,
  setPostalCodeOnChange,
  setOnCancel,
  setYardSisterCode,
  setCheckYardCode,
  setYardPostalCodePK,
} from "../../../../redux/YardMaintenanceSlice";
import YardService from "../../../../services/YardService";
import PostalCodeUS from "../../../common/PostalCodeUS";
import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import DealerService from "../../../../services/DealerService";

import LookupButton from "../../../common/LookupButton";
import PostalCodeComponent from "../../../common/PostalCodeComponent";
import Input from "../../../../components/common/input";

const General = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const yardPK = params.id;
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [sisterCompanyCode, setSisterCompanyCode] = useState("");
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [fax, setFax] = useState("");
  const [phone, setPhone] = useState("");
  const [dealer, setDealer] = useState("");
  const [manager, setManager] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [dealerData, setDealerData] = useState([]);
  const [supervisorData, setSupervisorData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [managerLoading, setManagerLoading] = useState(false);
  const [dealerLoading, setDealerLoading] = useState(false);
  const [supervisorLoading, setSupervisorLoading] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  let checkCanadian = /[a-z]/i;
  const [zipIdChcek, setZipIdCheck] = useState("");
  const viewDetail = useSelector((state) => state.yardMaintenanceReducer.viewDetail);
  const editYardData = useSelector((state) => state.yardMaintenanceReducer.editYardData);
  const showDealerLookup = useSelector((state) => state.yardMaintenanceReducer.showDealerLookup);
  const dealerInput = useSelector((state) => state.yardMaintenanceReducer.dealerInput);
  const yardLoading = useSelector((state) => state.yardMaintenanceReducer.yardLoading);
  const dealerLookupFK = useSelector((state) => state.yardMaintenanceReducer.dealerLookupFK);
  const userLookupFK = useSelector((state) => state.yardMaintenanceReducer.userLookupFK);
  const userInput = useSelector((state) => state.yardMaintenanceReducer.userInput);
  const userManagerInput = useSelector((state) => state.yardMaintenanceReducer.userManagerInput);
  const userManagerFK = useSelector((state) => state.yardMaintenanceReducer.userManagerFK);
  const showSupervisorLookup = useSelector((state) => state.yardMaintenanceReducer.showSupervisorLookup);
  const showManagerLookup = useSelector((state) => state.yardMaintenanceReducer.showManagerLookup);
  const checkYardCode = useSelector((state) => state.yardMaintenanceReducer.checkYardCode);
  const postalCodeOnChange = useSelector((state) => state.yardMaintenanceReducer.postalCodeOnChange);
  const onCancel = useSelector((state) => state.yardMaintenanceReducer.onCancel);

  const isFirstRun = useRef(true);

  //set dealer value
  const setDealerValue = (id) => {
    if (id != null) {
      DealerService.getDealerById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setDealerInput(data.name?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setDealerInput(""));
    }
  };

  //set Supervisor value
  const setSupervisorValue = (id) => {
    if (id !== null && editYardData != null) {
      YardService.getUserById(id)
        .then((response) => {
          const data = response.data;

          dispatch(setUserInput(data.name?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setUserInput(""));
    }
  };
  //set Manager value
  const setManagerValue = (id) => {
    if (id !== null && editYardData != null) {
      YardService.getUserById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setUserManagerInput(data.name?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setUserManagerInput(""));
    }
  };

  useEffect(() => {
    //reset old values
    if (editYardData === undefined) {
      setDescription("");
      setMessage("");
      setName("");
      setAddress1("");
      setAddress2("");
      setStateCode("");
      setCity("");
      setPostalCode("");
      setFax("");
      setPhone("");
      dispatch(setDealerInput(""));
      dispatch(setUserInput(""));
      dispatch(setUserManagerInput(""));
      setDealer("");
      setSupervisor("");
      setManager("");
      setDealerInput("");
      setUserInput("");
      setUserManagerInput("");
      setSisterCompanyCode("");
    }
    if (editYardData != null) {
      setDescription(editYardData.description ? editYardData.description?.trim() : "");

      setName(editYardData.name != null ? editYardData.name?.trim() : "");
      setAddress1(editYardData.address1 != null ? editYardData.address1?.trim() : "");
      setAddress2(editYardData.address2 != null ? editYardData.address2?.trim() : "");
      setStateCode(editYardData.stateCode != null ? editYardData.stateCode?.trim() : "");
      setCity(editYardData.city != null ? editYardData.city?.trim() : "");
      setPostalCode(editYardData.postalCode != null ? editYardData.postalCode?.trim() : "");
      setFax(editYardData.fax != null ? formatPhoneNumber(editYardData.fax) : "");
      setPhone(editYardData.phone != null ? formatPhoneNumber(editYardData.phone) : "");

      // On mount with an id, editYardData is the previous record and FormContent is refetching it,
      // so the name lookups wait for the fresh record instead of running twice
      const isStaleRecord = isFirstRun.current && id;

      dispatch(setDealerLookupFK(editYardData.yardDealerFK != null ? editYardData.yardDealerFK : ""));
      //set Dealer value
      if (!isStaleRecord) setDealerValue(editYardData.yardDealerFK);

      dispatch(setUserLookupFK(editYardData.supervisorUserFK != null ? editYardData.supervisorUserFK : ""));
      //set Supervisor value
      if (!isStaleRecord) setSupervisorValue(editYardData.supervisorUserFK);
      dispatch(setUserManagerFK(editYardData.managerUserFK ? editYardData.managerUserFK : ""));
      //set Manager Value
      if (!isStaleRecord) setManagerValue(editYardData.managerUserFK);

      setSisterCompanyCode(editYardData.sisterYardCode != null ? editYardData.sisterYardCode : "");
      setPostalCodePK(editYardData?.postalCodePK);
    }
    isFirstRun.current = false;
  }, [editYardData]);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };
  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };

  // to backend
  const generalTabData = () => {
    dispatch(
      setYardFormData({
        yardPK: yardPK,
        name: name,
        address1: address1,
        address2: address2,
        description: description,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        phone: phone.replace(/\s+/g, ""),
        fax: fax.replace(/\s+/g, ""),
        yardDealerFK: dealerLookupFK,
        supervisorUserFK: userLookupFK,
        managerUserFK: userManagerFK,
        sisterYardCode: sisterCompanyCode ? sisterCompanyCode : null,
      })
    );
  };

  //check unique description exist
  const checkDescriptionExist = (description) => {
    YardService.descriptionExistCheck(description, yardPK)
      .then((res) => {
        const data = res.data;
        setMessage(data);
        dispatch(setCheckDEscriptionExist(res.data));
      })
      .catch((err) => {});
  };

  const checkSisterYardCodeExist = (sisterCompanyCode) => {
    YardService.checkYardCode(sisterCompanyCode, yardPK)
      .then((res) => {
        const data = res.data;

        dispatch(setCheckYardCode(res.data));
      })
      .catch((err) => {});
  };

  /**
   * Fetch all Dealers
   * Used for Dealer Autocomplete
   */
  const fetchDealer = (string) => {
    setDealerLoading(true);
    YardService.getAllDealers(string)
      .then((response) => {
        const data = response.data.content;
        const dealerList = data?.map((dealer) => ({
          ...dealer,
          name: dealer.name?.trim(),
        }));
        setDealerData(dealerList);
        setDealerLoading(false);
      })
      .catch((err) => {
        setDealerLoading(false);
      });
  };
  /**
   * Fetch all Users
   * Used for Supervisor Autocomplete
   */
  const fetchSupervisorUser = (string) => {
    setSupervisorLoading(true);
    YardService.getAllUserData(string)
      .then((response) => {
        const data = response.data.content;
        const supervisorList = data?.map((supervisors) => ({
          ...supervisors,
          name: supervisors.name?.trim(),
        }));
        setSupervisorData(supervisorList);
        setSupervisorLoading(false);
      })
      .catch((err) => {
        setSupervisorLoading(false);
      });
  };

  /**
   * Fetch all Users
   * Used for Manager Autocomplete
   */
  const fetchUserManager = (string) => {
    setManagerLoading(true);
    YardService.getAllUserData(string)
      .then((response) => {
        const data = response.data.content;
        const managerList = data?.map((managers) => ({
          ...managers,
          name: managers.name?.trim(),
        }));
        setManagerData(managerList);
        setManagerLoading(false);
      })
      .catch((err) => {
        setManagerLoading(false);
      });
  };
  /**
   * used for Dealer selection Lookup
   */
  const handleDealerLookup = () => {
    dispatch(setShowDealerLookup(true));
  };

  const handleDealerLookupSelection = (dealer) => {
    dispatch(setDealerInput(dealer.name?.trim()));
    dispatch(setDealerLookupFK(dealer.dealerPK));
    dispatch(setShowDealerLookup(false));
  };

  /**
   * used for Supervisor selection Lookup
   */
  const handleSupervisorLookup = () => {
    dispatch(setShowSupervisorLookup(true));
  };
  const handleSupervisorLookupSelection = (item) => {
    dispatch(setUserLookupFK(item.userPK));
    dispatch(setUserInput(item.name?.trim()));
    dispatch(setShowSupervisorLookup(false));
  };

  /**
   * used for Manager selection Lookup
   */
  const handleManagerLookup = () => {
    dispatch(setShowManagerLookup(true));
  };
  const handleManagerLookupSelection = (item) => {
    dispatch(setUserManagerFK(item.userPK));
    dispatch(setUserManagerInput(item.name?.trim()));
    dispatch(setShowManagerLookup(false));
  };

  /**
   * used for Dealer Autocomplete
   */

  const handleDealerSelection = (item) => {
    dispatch(setDealerLookupFK(item.dealerPK));
    dispatch(setDealerInput(item.name?.trim()));
  };
  /**
   * used for Supervisor Autocomplete
   */

  const handleSupervisorSelection = (item) => {
    dispatch(setUserLookupFK(item.userPK));
    dispatch(setUserInput(item.name?.trim()));
  };
  /**
   * used for Manager Autocomplete
   */

  const handleManagerSelection = (item) => {
    dispatch(setUserManagerFK(item.userPK));
    dispatch(setUserManagerInput(item.name?.trim()));
  };

  useEffect(() => {
    generalTabData();
  }, [
    yardPK,
    name,
    address1,
    address2,
    description,
    city,
    postalcode,
    phone,
    fax,
    statecode,
    dealerLookupFK,
    userLookupFK,
    userManagerFK,
    sisterCompanyCode,
  ]);
  useEffect(() => {
    if (viewDetail) {
      setMessage("");
    }
  }, [viewDetail]);

  useEffect(() => {
    dispatch(setYardCanadian(canadian));
    dispatch(setYardName(name));
    dispatch(setYardAddress(address1));
    dispatch(setYardCity(city));
    dispatch(setYardStatecode(statecode));
    dispatch(setYardPostcode(postalcode));
    dispatch(setYardPhone(phone));
    dispatch(setYardDescription(description));
    dispatch(setYardFax(fax));
    dispatch(setYardZipLength(zipPostLenght));
    dispatch(setYardCityLength(cityLength));
    dispatch(setYardSisterCode(sisterCompanyCode));
    dispatch(setYardPostalCodePK(postalCodePK));
  }, [
    name,
    address1,
    city,
    statecode,
    postalcode,
    phone,
    description,
    fax,
    cityLength,
    zipPostLenght,
    sisterCompanyCode,
    postalCodePK,
  ]);
  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  //Validation
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    phone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
    description: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().required(),
    postalcode: yup
      .string()
      .required()
      .when("canadian", {
        is: true,
        then: yup.string().matches(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/),
        otherwise: yup.string().matches(/^((\d{5}-\d{4})|(\d{5}))$/),
      }),
  });

  return (
    <Formik
      initialValues={{
        description,
        name,
        address1,
        phone,
        fax,
        city,
        statecode,
        postalcode,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        description: true,
        phone: true,
        fax: true,
        name: true,
        address1: true,
        city: true,
        statecode: true,
        postalcode: true,
        canadian: false,
      }}
      //  on={on}
    >
      {(formik) => (
        <Form className="p-3">
          <div className="p-15 w-100" onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
            <Row className="m-0 p-0 ">
              <Col sm={7} md={7} lg={7} xl={7} xs={7}>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>
                      {t("yard.list.page.table.heading")}
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`${styles.formControl}  ${
                        viewDetail
                          ? ""
                          : formik.errors.description === undefined && description.length >= 1
                            ? message
                              ? "borderRed"
                              : "borderGreen"
                            : "borderRed"
                      }
                            `}
                      id="description"
                      name="description"
                      maxLength={30}
                      value={description}
                      disabled={viewDetail}
                      onInput={(e) => {
                        setDescription(e.target.value.replace(/^\s+/g, ""));
                        dispatch(setCheckDEscriptionExist(""));
                        setMessage("");
                      }}
                      onBlur={(e) => checkDescriptionExist(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>
                      {t("edit.yard.page.general.tab.name")}
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      name="name"
                      type="text"
                      className={`${styles.formControl}  ${
                        viewDetail === true
                          ? ""
                          : formik.errors.name === undefined && name != null && name.length >= 1
                            ? "borderGreen"
                            : formik.errors.name !== undefined
                              ? "borderRed"
                              : ""
                      }
                            `}
                      maxLength={30}
                      id="name"
                      value={name}
                      disabled={viewDetail}
                      onInput={(e) => {
                        setName(e.target.value.replace(/^\s+/g, ""));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5  form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>
                      {t("edit.yard.page.general.tab.address")}
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`${styles.formControl} ${
                        viewDetail === true
                          ? ""
                          : formik.errors.address1 === undefined && address1 != null && name.length >= 1
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
                      onInput={(e) => {
                        setAddress1(e.target.value.replace(/^\s+/g, ""));
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
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
                      onInput={(e) => {
                        setAddress2(e.target.value.replace(/^\s+/g, ""));
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <PostalCodeComponent
                  labelColNumber={2}
                  disabled={viewDetail}
                  city={viewDetail ? editYardData?.city?.trim() : city}
                  setCity={setCity}
                  stateCode={viewDetail ? editYardData?.stateCode?.trim() : statecode}
                  setStateCode={setStateCode}
                  postalCode={viewDetail ? editYardData?.postalCode?.trim() : String(postalcode)}
                  setPostalCode={setPostalCode}
                  setPostalValues={setPostalValues}
                  postalOptions={postalOptions}
                  postalCodePK={postalCodePK}
                  setPostalCodePK={setPostalCodePK}
                  canadian={canadian}
                  setCanadian={setCanadian}
                  isUSOnly={true}
                  loading={yardLoading}
                />
                <Row className={`${checkCanadian.test(postalcode) ? "" : "hide-elements"} m-t-1`}>
                  <Col xs={2} md={2} sm={2}></Col>
                  <Col style={{ paddingLeft: "5 px" }}>
                    <p className="p-0 text-danger alert" style={{ height: "7px" }}>
                      Canadian Zip Not Allowed
                    </p>
                  </Col>
                </Row>
                <Form.Group className="form-group m-t-0 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>
                      {t("edit.yard.page.general.tab.phone")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`${styles.formControl}  ${
                        viewDetail === true
                          ? ""
                          : formik.errors.phone === undefined && phone != null && phone.length > 1
                            ? ""
                            : formik.errors.phone !== undefined
                              ? "borderRed"
                              : ""
                      }
                            `}
                      id="phone"
                      name="phone"
                      value={phone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => phoneFormatHandler(e)}
                      onInput={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>
                      {t("edit.yard.page.general.tab.fax")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`${styles.formControl}  ${
                        viewDetail === true
                          ? ""
                          : formik.errors.fax === undefined && fax != null && fax.length > 1
                            ? ""
                            : formik.errors.fax !== undefined
                              ? "borderRed"
                              : ""
                      }
                            `}
                      id="fax"
                      name="fax"
                      value={fax}
                      maxLength={14}
                      onChange={(e) => faxFormatHandler(e)}
                      disabled={viewDetail}
                      onInput={(e) => {
                        setFax(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={5} xs={5} md={5}>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={` col-form-label ${styles.orderLabel} dealer-label`}>
                      {t("edit.yard.page.general.tab.manager")}
                    </Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                    {/*Manager Autocomplete */}

                    <AutoCompleteDropdown
                      arrayList={managerData}
                      searchString={userManagerInput}
                      renderItemId={(item) => item.userPK}
                      renderItemField={(item) => item.name}
                      handleSearchString={(string) => dispatch(setUserManagerInput(string))}
                      fetchDataBySearchString={fetchUserManager}
                      onSelect={handleManagerSelection}
                      selectedId={userManagerFK}
                      clearInputCallback={() => {
                        dispatch(setUserManagerFK(""));
                      }}
                      disabled={viewDetail}
                      className={`${userManagerFK === "" && userManagerInput != "" ? "borderRed" : ""}`}
                      loading={managerLoading}
                    />

                    <LookupButton
                      onClick={handleManagerLookup}
                      disabled={viewDetail}
                      // Manager lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>
                      {t("edit.yard.page.general.tab.supervisor")}
                    </Form.Label>
                  </Col>
                  <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                    {/*Supervisor Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={supervisorData}
                      searchString={userInput}
                      renderItemId={(item) => item.userPK}
                      renderItemField={(item) => item.name}
                      handleSearchString={(string) => dispatch(setUserInput(string))}
                      fetchDataBySearchString={fetchSupervisorUser}
                      onSelect={handleSupervisorSelection}
                      selectedId={userLookupFK}
                      clearInputCallback={() => {
                        dispatch(setUserLookupFK(""));
                      }}
                      disabled={viewDetail}
                      className={`${userLookupFK === "" && userInput !== "" ? "borderRed" : ""}`}
                      loading={supervisorLoading}
                    />

                    <LookupButton
                      onClick={handleSupervisorLookup}
                      disabled={viewDetail}
                      // Supervisor lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>
                      {t("edit.yard.page.general.tab.dealer")}
                    </Form.Label>
                  </Col>
                  <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                    {/*Dealer Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={dealerData}
                      searchString={dealerInput}
                      renderItemId={(item) => item.dealerPK}
                      renderItemField={(item) => item.name}
                      handleSearchString={(string) => dispatch(setDealerInput(string))}
                      fetchDataBySearchString={fetchDealer}
                      onSelect={handleDealerSelection}
                      selectedId={dealerLookupFK}
                      clearInputCallback={() => {
                        dispatch(setDealerLookupFK(""));
                      }}
                      disabled={viewDetail}
                      className={`${dealerLookupFK === "" && dealerInput !== "" ? "borderRed" : ""}`}
                      loading={dealerLoading}
                    />

                    <LookupButton
                      onClick={handleDealerLookup}
                      disabled={viewDetail}
                      // Dealer lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Sister Company Code</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-100px">
                    <input
                      type="text"

                      className={`${styles.formControl}  ${
                        viewDetail === true || !sisterCompanyCode
                          ? ""
                          : sisterCompanyCode && checkYardCode
                            ? "borderRed"
                            : ""
                      }`}
                      id="sisterCompanyCode"
                      name="sisterCompanyCode"
                      maxLength={10}
                      value={sisterCompanyCode.toUpperCase()}
                      disabled={viewDetail}
                      onInput={(e) => {
                        setSisterCompanyCode(e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase());
                        dispatch(setCheckYardCode(false));
                      }}

                      onBlur={(e) => checkSisterYardCodeExist(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {/* Dealer Lookup Modal */}
          <DealerLookup
            show={showDealerLookup}
            onHide={() => dispatch(setShowDealerLookup(false))}
            renderItemId={(dealer) => dealer.dealerPK}
            handleLookupSelection={handleDealerLookupSelection}
            MaintenanceProgram
          />
          {/*User Lookup Modal */}
          <UserLookup
            show={showSupervisorLookup}
            onHide={() => dispatch(setShowSupervisorLookup(false))}
            renderItemId={(user) => user.userPK}
            handleLookupSelection={handleSupervisorLookupSelection}
            MaintenanceProgram
          />
          {/*User Lookup Modal */}
          <UserLookup
            show={showManagerLookup}
            onHide={() => dispatch(setShowManagerLookup(false))}
            renderItemId={(user) => user.userPK}
            handleLookupSelection={handleManagerLookupSelection}
            MaintenanceProgram
          />
        </Form>
      )}
    </Formik>
  );
};

export default General;
