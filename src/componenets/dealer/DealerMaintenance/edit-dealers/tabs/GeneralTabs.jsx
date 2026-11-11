import { t } from "i18next";
import { Formik, Field } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import {
  setDealer,
  setDealerName,
  setDealerAddress,
  setDealerCity,
  setDealerStatecode,
  setDealerPostcode,
  setDealerPhone,
  setDealerTollPhone,
  setDealerFax,
  setDealerLogin,
  setDealerPassword,
  setDealerZipPostLenght,
  setDealerGroupSelection,
  setDealerGroupId,
  setDealerGroupInput,
  setMasterDealerGroupInput,
  setMasterDealerGroupId,
  setMasterDealerGroupSelection,
  setEditDealer,
  setPostalCodeOnChange,
  setOnCancel,
  setDealerPostalCodePK,
  setBolAtDispatchOrFaxBolAtOrderEntry,
  setTotalUnits,
  setYtdUnits,
} from "../../../../../redux/EditDealerSlice";
import PostalCode from "../../../../common/PostalCode";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import DealerGroupsLookup from "../../../../LookupScreens/DealerGroups/DealerGroupsLookup";
import DealerGroupService from "../../../../../services/DealerGroupService";
import { setDealerData } from "../../../../../redux/DealerSearchFilterSlice";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import { faL } from "@fortawesome/free-solid-svg-icons";
import DateInputField from "../../../../common/DateInputField";
import { text } from "@fortawesome/fontawesome-svg-core";
function GeneralTabs() {
  const params = useParams();
  const id = params.id;
  const navigation = useNavigate();

  const [dealerPK, setDealerPK] = useState("");
  const [incompletedealerPK, setIncompletedealerPK] = useState("");
  const [dealerGroupData, setDealerGroupData] = useState([]);
  const [masterDealerGroupData, setMasterDealerGroupData] = useState([]);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);

  const [zipIdChcek, setZipIdCheck] = useState("");

  const [name, setName] = useState("");
  const [dba, setDba] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [pcmilercity, setPcMilerCity] = useState("");
  const [pcmilercounty, setPcMilerCounty] = useState("");
  const [phone, setPhone] = useState("");
  const [tollfreephone, setTollFreePhone] = useState("");
  const [fax, setFax] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [masterdealer, setMasterDealer] = useState(false);
  const [dealerGroupFk, setdealerGroupFk] = useState("");
  const [notes, setNotes] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [orderDate, setOrderDate] = useState(null);

  const dealerZipPostLenght = useSelector((state) => state.editDealerReducer.dealerZipPostLenght);
  const dealerData = useSelector((state) => state.editDealerReducer.dealerData);
  let viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);
  const dealerGroupSelection = useSelector((state) => state.editDealerReducer.dealerGroupSelection);
  const dealerGroupInput = useSelector((state) => state.editDealerReducer.dealerGroupInput);
  const dealerGroupId = useSelector((state) => state.editDealerReducer.dealerGroupId);
  const masterDealerGroupSelection = useSelector(
    (state) => state.editDealerReducer.masterDealerGroupSelection
  );
  const masterDealerGroupInput = useSelector((state) => state.editDealerReducer.masterDealerGroupInput);
  const masterDealerGroupId = useSelector((state) => state.editDealerReducer.masterDealerGroupId);
  const postalCodeOnChange = useSelector((state) => state.editDealerReducer.postalCodeOnChange);
  const onCancel = useSelector((state) => state.editDealerReducer.onCancel);
  const isDealerLoading = useSelector((state) => state.editDealerReducer.isDealerLoading);
  const bolAtDispatchOrFaxBolAtOrderEntry = useSelector(
    (state) => state.editDealerReducer.bolAtDispatchOrFaxBolAtOrderEntry
  );
  const lastOrder = useSelector((state) => state.editDealerReducer.lastOrder);
  const totalUnits = useSelector((state) => state.editDealerReducer.totalUnits);
  const ytdUnits = useSelector((state) => state.editDealerReducer.ytdUnits);
  const faxBolAtOrderEntry = useSelector((state) => state.editDealerReducer.faxBolAtOrderEntry);
  const faxBolAtDispatch = useSelector((state) => state.editDealerReducer.faxBolAtDispatch);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);

    setPhone(formattedPhoneNumber);
  };

  const tollfreeFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setTollFreePhone(formattedPhoneNumber);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };
  const hideDealerGroupModel = () => {
    dispatch(setDealerGroupSelection(false));
  };
  const hideMasterDealerGroupModel = () => {
    dispatch(setMasterDealerGroupSelection(false));
  };
  const handleDealerGroupLookupSelection = (data) => {
    dispatch(setDealerGroupInput(data.description));
    dispatch(setDealerGroupId(data.dealerGroupPK));

    dispatch(setDealerGroupSelection(false));
  };
  const handleMasterDealerGroupLookupSelection = (data) => {
    dispatch(setMasterDealerGroupInput(data.description));
    dispatch(setMasterDealerGroupId(data.dealerGroupPK));

    dispatch(setMasterDealerGroupSelection(false));
  };

  const handleDealerGroupLookupModalShow = () => {
    dispatch(setDealerGroupSelection(true));
  };
  const handleMasterDealerGroupLookupModalShow = () => {
    dispatch(setMasterDealerGroupSelection(true));
  };
  const fetchDealerGroups = (string) => {
    setAutoCompleteLoading(true);
    DealerGroupService.getDealerGroupsForAuto(string)
      .then((response) => {
        const data = response.data;
        const dealerGroupList = data.content?.map((dealer) => ({
          ...dealer,
          description: dealer.description?.trim(),
        }));
        setDealerGroupData(dealerGroupList);
      })
      .catch((err) => {})
      .finally(() => {
        setAutoCompleteLoading(false);
      });
  };

  const fetchMasterDealerGroups = (string) => {
    setAutoCompleteLoading(true);
    DealerGroupService.getDealerGroupsForAuto(string)
      .then((response) => {
        const data = response.data;
        const dealersList = data.content?.map((dealer) => ({
          ...dealer,
          description: dealer.description?.trim(),
        }));
        setMasterDealerGroupData(dealersList);
      })
      .catch((err) => {})
      .finally(() => {
        setAutoCompleteLoading(false);
      });
  };

  const setDealerGroupValue = (dealerGroupId) => {
    if (dealerGroupId) {
      let dealerGroupElement = dealerGroupData.find((state) => state.dealerGroupPK === dealerGroupId);

      if (dealerGroupElement !== undefined) {
        dispatch(setDealerGroupInput(dealerGroupElement.description));
      } else {
        DealerGroupService.getDealerGroupById(dealerGroupId)
          .then((response) => {
            const data = response.data;
            dispatch(setDealerGroupInput(data.description));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      dispatch(setDealerGroupInput(""));
    }
  };

  const setMasterDealerGroupValue = (masterDealerGroupId) => {
    if (masterDealerGroupId) {
      let dealerGroupElement = masterDealerGroupData.find(
        (state) => state.dealerGroupPK === masterDealerGroupId
      );

      if (dealerGroupElement !== undefined) {
        dispatch(setMasterDealerGroupInput(dealerGroupElement.description));
      } else {
        DealerGroupService.getDealerGroupById(masterDealerGroupId)
          .then((response) => {
            const data = response.data;
            dispatch(setMasterDealerGroupInput(data.description));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      dispatch(setMasterDealerGroupInput(""));
    }
  };

  useEffect(() => {
    if (bolAtDispatchOrFaxBolAtOrderEntry) {
      if (fax && fax.length === 14) {
        dispatch(setBolAtDispatchOrFaxBolAtOrderEntry(false));
      } else if (!fax) {
        dispatch(setBolAtDispatchOrFaxBolAtOrderEntry(true));
      }
    }
  }, [fax, bolAtDispatchOrFaxBolAtOrderEntry]);

  useEffect(() => {
    if (dealerData != null) {
      setPostalCodePK(dealerData.postalCodePK ? dealerData.postalCodePK : null);
      setName(dealerData.name?.trim());
      setDba(dealerData.dba != null ? dealerData.dba?.trim() : "");
      setAddress1(dealerData.address1 != null ? dealerData.address1?.trim() : "");
      setAddress2(dealerData.address2 != null ? dealerData.address2?.trim() : "");
      dispatch(setDealerGroupId(dealerData.dealerGroupFK));
      setMasterDealerGroupValue(dealerData.masterDealerGroupFK);
      setDealerGroupValue(dealerData.dealerGroupFK);
      dispatch(setMasterDealerGroupId(dealerData.masterDealerGroupFK));

      setCity(dealerData.city != null ? dealerData.city?.trim() : "");
      setStateCode(dealerData.stateCode != null ? dealerData.stateCode?.trim() : "");
      setPostalCode(dealerData.postalCode != null ? dealerData.postalCode?.trim() : "");
      setCanadian(dealerData.canadian || false);
      setPcMilerCity(dealerData.pcMilerCity != null ? dealerData.pcMilerCity?.trim() : "");
      setPcMilerCounty(dealerData.pcMilerCounty != null ? dealerData.pcMilerCounty?.trim() : "");
      setPhone(dealerData.phone != null ? formatPhoneNumber(dealerData.phone) : "");
      setTollFreePhone(dealerData.tollFreePhone != null ? formatPhoneNumber(dealerData.tollFreePhone) : "");
      setFax(dealerData.fax != null ? formatPhoneNumber(dealerData.fax) : "");
      dealerData.login !== null ? setLogin(dealerData.login?.trim()) : setLogin("");
      dealerData.password !== null ? setPassword(dealerData.password?.trim()) : setPassword("");
      setMasterDealer(dealerData.masterDealer != null ? dealerData.masterDealer : "");
      setNotes(dealerData.notes != null ? dealerData.notes?.trim() : "");
      dispatch(setTotalUnits(dealerData.totalUnits != null ? dealerData.totalUnits : 0));
      dispatch(setYtdUnits(dealerData.ytdUnits != null ? dealerData.ytdUnits : 0));

      setOrderDate(dealerData.lastOrderDate != null ? dealerData.lastOrderDate : "");

      if (null != dealerData.incompletedealerPK) {
        setIncompletedealerPK(dealerData.incompletedealerPK);
      } else if (null != dealerData.dealerPK) {
        setDealerPK(dealerData.dealerPK);
      }
      initialValue[0].city = dealerData.city != null ? dealerData.city?.trim() : "";
      initialValue[0].statecode = dealerData.stateCode != null ? dealerData.stateCode?.trim() : "";
      initialValue[0].canadian = dealerData.canadian != null ? dealerData.canadian : false;
      initialValue[0].postalcode = dealerData.postalCode != null ? dealerData.postalCode?.trim() : "";
      setPostalValues(initialValue);
    }
  }, [dealerData, viewDetail]);

  useEffect(() => {
    dispatch(setDealerName(name));
    dispatch(setDealerAddress(address1));
    dispatch(setDealerCity(city));
    dispatch(setDealerStatecode(statecode));
    dispatch(setDealerPostcode(postalcode));
    dispatch(setDealerPhone(phone));
    dispatch(setDealerTollPhone(tollfreephone));
    dispatch(setDealerFax(fax));
    dispatch(setDealerLogin(login));
    dispatch(setDealerPassword(password));
    dispatch(setDealerZipPostLenght(zipPostLenght));
    dispatch(setDealerPostalCodePK(postalCodePK));
  }, [
    name,
    address1,
    city,
    statecode,
    postalcode,
    phone,
    tollfreephone,
    fax,
    login,
    password,
    cityLength,
    zipPostLenght,
    postalCodePK,
  ]);

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  useEffect(() => {
    generalTabFormData();
  }, [
    dealerPK,
    incompletedealerPK,
    name,
    dba,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    canadian,
    pcmilercity,
    pcmilercounty,
    phone,
    tollfreephone,
    fax,
    login,
    password,
    masterdealer,
    dealerGroupFk,
    notes,
    dealerGroupId,
    masterDealerGroupId,
  ]);

  const dispatch = useDispatch();

  const generalTabFormData = () => {
    dispatch(
      setDealer({
        dealerPK: dealerPK,
        incompletedealerPK: incompletedealerPK,
        name: name,
        dba: dba,
        address1: address1,
        address2: address2,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        canadian: canadian,
        pcMilerCity: pcmilercity,
        pcMilerCounty: pcmilercounty,
        phone: phone?.replace(/\s+/g, ""),
        tollFreePhone: tollfreephone?.replace(/\s+/g, ""),
        fax: fax?.replace(/\s+/g, ""),
        login: login,
        password: password,
        masterDealer: masterdealer,
        dealerGroupFK: dealerGroupId,
        masterDealerGroupFK: masterDealerGroupId,
        notes: notes,
      })
    );
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
    password: yup.string().when("login", {
      is: (login) => login !== undefined && login.length > 0,
      then: yup.string().required(),
    }),
  });

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };
  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };

  const handlePhoneKeyDown = (e) => {
    const input = e.target;

    if (e.key === "Backspace") {
      const cursorPosition = input.selectionStart;

      if (cursorPosition !== input.value.length) {
        e.preventDefault();
        setTimeout(() => {
          input.setSelectionRange(input.value.length, input.value.length);
        }, 0);
      }
    }
  };

  useEffect(() => {
    if (!masterdealer) {
      dispatch(setMasterDealerGroupId(null));
      dispatch(setMasterDealerGroupInput(""));
    }
  }, [masterdealer, masterDealerGroupId]);

  return (
    <Formik
      initialValues={{
        name,
        address1,
        city,
        statecode,
        phone,
        tollfreephone,
        fax,
        postalcode,
        login,
        password,
      }}
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
      on={on}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.name")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Field
                      className={`customFormControl ${
                        viewDetail === true || isDealerLoading
                          ? ""
                          : name?.trim().length > 0
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="name"
                      name="name"
                      type="search"
                      value={name}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setName(e.target.value);
                      }}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.dba")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="search"
                      className="customFormControl"
                      id="dba"
                      name="dba"
                      value={dba}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => setDba(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="address1" className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.address")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Field
                      className={`customFormControl ${
                        viewDetail === true || isDealerLoading
                          ? ""
                          : address1?.trim().length > 0
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="ad1"
                      name="ad1"
                      type="search"
                      value={address1}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="one-time-code"
                      spellCheck={false}
                      aria-autocomplete="list"
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setAddress1(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 mb-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="address2" className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Field
                      className="customFormControl"
                      id="ad2"
                      name="ad2"
                      type="search"
                      value={address2}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="one-time-code"
                      spellCheck={false}
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setAddress2(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <PostalCodeComponent
                  disabled={viewDetail || isDealerLoading}
                  city={viewDetail ? dealerData?.city?.trim() : city}
                  setCity={setCity}
                  stateCode={viewDetail ? dealerData?.stateCode?.trim() : statecode}
                  setStateCode={setStateCode}
                  postalCode={viewDetail ? dealerData?.postalCode?.trim() : postalcode}
                  setPostalCode={setPostalCode}
                  setPostalValues={setPostalValues}
                  postalOptions={postalOptions}
                  postalCodePK={postalCodePK}
                  setPostalCodePK={setPostalCodePK}
                  canadian={canadian}
                  setCanadian={setCanadian}
                />

                <Form.Group className="mt-3 row  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.pc.miler.city")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="search"
                      className="customFormControl"
                      name="pcmilercity"
                      id="pcmilercity"
                      maxLength={30}
                      value={pcmilercity}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => setPcMilerCity(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.pc.miler.county")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="search"
                      className="customFormControl"
                      name="pcmilercounty"
                      id="pcmilercounty"
                      value={pcmilercounty}
                      maxLength={30}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => setPcMilerCounty(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.phone")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        viewDetail === true || isDealerLoading
                          ? ""
                          : formik.errors.phone === undefined && phone != null && phone.length > 1
                            ? "borderGreen"
                            : formik.errors.phone !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      control="input"
                      name="phone"
                      value={phone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => phoneFormatHandler(e)}
                      onKeyDown={handlePhoneKeyDown}
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
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.toll.free.phone")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        !viewDetail || isDealerLoading
                          ? tollfreephone.length !== 0 && !tollfreephone?.match(phoneRegex)
                            ? "borderRed"
                            : ""
                          : ""
                      }`}
                      type="tollfreephone"
                      name="tollfreephone"
                      disabled={viewDetail}
                      value={tollfreephone}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => tollfreeFormatHandler(e)}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setTollFreePhone(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      maxLength={14}
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
                        viewDetail
                          ? ""
                          : (fax && !fax.match(phoneRegex)) ||
                              (isDealerLoading && fax.length !== 0) ||
                              ((faxBolAtDispatch || faxBolAtOrderEntry) && (!fax || fax?.trim() === ""))
                            ? "borderRed"
                            : (faxBolAtDispatch || faxBolAtOrderEntry) && fax && fax.match(phoneRegex)
                              ? "borderGreen"
                              : ""
                      }`}
                      type="fax"
                      name="fax"
                      value={fax}
                      onChange={(e) => faxFormatHandler(e)}
                      maxLength={14}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setFax(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} md={6} xs={6} className="ps-lg-1">
                {id && (
                  <>
                    {/* Last Order */}
                    <Form.Group className="mt-4 form-group align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label">Last Order</Form.Label>
                      </Col>
                      <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "95px" }}>
                        {" "}
                        <DateInputField
                          date={orderDate}
                          setDate={(value) => setOrderDate(value)}
                          className={`customFormControl`}
                          disabled
                        />
                      </Col>
                      <Col xs={1} md={1} sm={1} style={{ width: "75px" }}></Col>
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label">
                          {t("edit.dealer.page.general.tab.website.login")}
                        </Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="p-0">
                        <input
                          type="search"
                          className="customFormControl"
                          id="login"
                          name="login"
                          value={login}
                          maxLength={50}
                          disabled={viewDetail}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onChange={(e) => {
                            setLogin(e.target.value);
                            if (e.target.value === "") {
                              setPassword("");
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>

                    {/* Total Units */}
                    <Col xs={1} md={1} sm={1}></Col>

                    <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label">Total Units</Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                        <input
                          type="text"
                          disabled
                          value={totalUnits}
                          name="totalUnits"
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            dispatch(setTotalUnits(e.target.value));
                          }}
                          onBlur={formik.handleBlur}
                          maxLength={14}
                          className={`customFormControl`}
                        />
                      </Col>
                      <Col xs={1} md={1} sm={1} style={{ width: "75px" }}></Col>
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label">
                          {t("edit.dealer.page.general.tab.website.password")}
                        </Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="p-0">
                        <input
                          className={`customFormControl ${
                            viewDetail || !login ? "" : login && !password ? "borderRed" : ""
                          }`}
                          id="wbPswd"
                          name="wbPswd"
                          value={password}
                          maxLength={20}
                          disabled={viewDetail || login === ""}
                          aria-autocomplete="list"
                          type="password"
                          autoComplete="one-time-code"
                          spellCheck={false}
                          onInput={(e) => {
                            formik.handleChange(e);
                            setPassword(e.target.value);
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>

                    {/* YTD Units */}
                    <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label">YTD Units</Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                        <input
                          type="text"
                          disabled
                          value={ytdUnits}
                          name="ytdUnits"
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            dispatch(setYtdUnits(e.target.value));
                          }}
                          onBlur={formik.handleBlur}
                          maxLength={14}
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                  </>
                )}
                <Col xs={1} md={1} sm={1} className="w-10px"></Col>
                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label" hidden>
                      {" "}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 ">
                    <input hidden />{" "}
                  </Col>
                  <Col xs={1} md={1} sm={1}></Col>
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.master.dealer")}
                    </Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="masterdealer"
                      name="masterdealer"
                      value={masterdealer}
                      checked={masterdealer}
                      disabled={viewDetail}
                      onChange={(e) => setMasterDealer(e.target.checked)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label" hidden>
                      {" "}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 ">
                    <input hidden />{" "}
                  </Col>
                  <Col xs={1} md={1} sm={1}></Col>
                  <Col sm={2} md={2} xs={2} className="p-0 ">
                    <Form.Label className="col-form-label dealer-label">Master Dealer Group</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      className={`${
                        !viewDetail &&
                        masterdealer &&
                        (masterDealerGroupId !== null ? "borderGreen" : "borderRed")
                      }`}
                      arrayList={masterDealerGroupData}
                      searchString={masterDealerGroupInput}
                      handleSearchString={(string) => dispatch(setMasterDealerGroupInput(string))}
                      fetchDataBySearchString={fetchMasterDealerGroups}
                      renderItemId={(data) => data.dealerGroupPK}
                      renderItemField={(data) => data.description}
                      onSelect={handleMasterDealerGroupLookupSelection}
                      selectedId={masterDealerGroupId}
                      disabled={viewDetail || !masterdealer}
                      loading={autoCompleteLoading}
                      clearInputCallback={() => {
                        dispatch(setMasterDealerGroupId(null));
                      }}
                    />
                    <LookupButton
                      onClick={handleMasterDealerGroupLookupModalShow}
                      disabled={viewDetail || !masterdealer}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label" hidden>
                      {" "}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 ">
                    <input hidden />{" "}
                  </Col>
                  <Col xs={1} md={1} sm={1}></Col>
                  <Col sm={2} md={2} xs={2} className="p-0 ">
                    <Form.Label className="col-form-label dealer-label">Dealer Group </Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      className={`${
                        !viewDetail && !dealerGroupId && dealerGroupInput
                          ? "borderRed"
                          : "" && dealerGroupId
                            ? ""
                            : ""
                      }`}
                      arrayList={dealerGroupData}
                      searchString={dealerGroupInput}
                      handleSearchString={(string) => dispatch(setDealerGroupInput(string))}
                      fetchDataBySearchString={fetchDealerGroups}
                      renderItemId={(data) => data.dealerGroupPK}
                      renderItemField={(data) => data.description}
                      loading={autoCompleteLoading}
                      onSelect={handleDealerGroupLookupSelection}
                      selectedId={dealerGroupId}
                      disabled={viewDetail}
                      clearInputCallback={() => {
                        dispatch(setDealerGroupId(null));
                      }}
                    />
                    <LookupButton onClick={handleDealerGroupLookupModalShow} disabled={viewDetail} />{" "}
                  </Col>
                </Form.Group>

                <Form.Group className="form-group mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <label className="col-form-label dealer-label p-0 m-b-10">Notes</label>
                  </Col>

                  <Col sm={12} md={10} className="p-0">
                    <textarea
                      rows={10}
                      cols={20}
                      style={{
                        resize: "none",
                        display: "fixed",
                        minHeight: "210px",
                        minWidth: "610px",
                        boxShadow: "none",
                        fontSize: "12px",
                      }}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      type="text"
                      className="customFormControl h-100 textarea-height textAreaWidthTwoRow"
                      id="notes"
                      name="notes"
                      value={notes}
                      disabled={viewDetail}
                      onInput={(e) => setNotes(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <DealerGroupsLookup
              show={dealerGroupSelection}
              onHide={hideDealerGroupModel}
              renderItemId={(data) => data.dealerGroupPK}
              renderItemField={(data) => data.description}
              handleLookupSelection={handleDealerGroupLookupSelection}
              MaintenanceProgram
            />
            <DealerGroupsLookup
              show={masterDealerGroupSelection}
              onHide={hideMasterDealerGroupModel}
              renderItemId={(data) => data.dealerGroupPK}
              renderItemField={(data) => data.description}
              handleLookupSelection={handleMasterDealerGroupLookupSelection}
              MaintenanceProgram
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default GeneralTabs;
