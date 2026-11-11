import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import CustomerService from "../../../../../../services/CustomerService";
import {
  setCustomerFormData,
  setOrderEntryUsers as setOrderEntryUsersToRedux,
  setIsOrdersDetailsTabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import numberValidation from "../../../../../../utils/validation/NumberValidation";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import Input from "../../../../../../components/common/input";
import LookupButton from "../../../../../common/LookupButton";
import BrokerLookup from "../../../../../LookupScreens/Broker/BrokerLookup";
import DealerLookup from "../../../../../LookupScreens/Dealer/DealerLookup";
import SpecialCodeLookup from "../../../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import CheckPayToLookup from "../../../../../LookupScreens/CheckPayTo/CheckPayToLookup";
import DriverLookup from "../../../../../LookupScreens/Driver/DriverLookup";
import { lastpointer, removeLeadingWhitespace } from "../../../../../../utils/utils";

function DetailSubTab() {
  const dispatch = useDispatch();

  const [allGenerateCommission, setAllGenerateCommission] = useState([]);
  const [generateCommission, setGenerateCommission] = useState("N");
  const [payCommisionToDriver, setPayCommisionToDriver] = useState(false);
  const [orderUntilCommission, setOrderUntilCommission] = useState("");
  const [commissionDriverFK, setCommissionDriverFK] = useState(null);
  const [commissionDriverInput, setCommissionDriverInput] = useState("");
  const [driverNames, setDriversName] = useState([]);
  const [flatRate, setFlatRate] = useState("");
  const [mileage, setMileage] = useState("");
  const [percentage, setPercentage] = useState("");
  const [dispatcher, setDispatcher] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [brokerList, setBrokerList] = useState([]);
  const [brokerInput, setBrokerInput] = useState("");
  const [brokerId, setBrokerId] = useState(null);
  const [defaultDealer, setDefaultDealer] = useState([]);
  const [defaultDealerFK, setDefaultDealerFK] = useState(null);
  const [defaultDealerInput, setDefaultDealerInput] = useState("");
  const [defaultSpecialCode, setDefaultSpecialCode] = useState([]);
  const [defaultSpecialCodeFK, setDefaultSpecialCodeFK] = useState(null);
  const [defaultSpecialCodeInput, setDefaultSpecialCodeInput] = useState("");
  const [orderEntryUserType, setOrderEntryUserType] = useState([]);
  const [orderEntryUsers, setOrderEntryUsers] = useState("");
  const [orderEntryInstructions, setOrderEntryInstructions] = useState("");

  const [checkPayToList, setCheckPayToList] = useState([]);
  const [checkPayToFK, setCheckPayToFK] = useState(null);
  const [checkPayToInput, setCheckPayToInput] = useState("");

  const [showReturnBrokerLookup, setshowReturnBrokerLookup] = useState(false);
  const [showDriverLookup, setshowDriverLookup] = useState(false);
  const [showDefaultDealerLookup, setShowDefaultDealerLookup] = useState(false);
  const [showDefaultSpecialCode, setShowDefaultSpecialCode] = useState(false);
  const [showCheckPayToLookup, setShowCheckPayToLookup] = useState(false);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const percentageValidation = /^[0-9]*$/;

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  let activeTab = useSelector((state) => state.customerMaintenanceReducer.activeTab);

  const [checkPayLoading, setCheckPayLoading] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);
  const [defaultLoading, setDefaultLoading] = useState(false);
  const [defaultSpecialLoading, setDefaultSpecialLoading] = useState(false);
  const [returnBrolerLoading, setReturnBrolerLoading] = useState(false);

  const fetchDriverByName = (string) => {
    if (activeTab === "orders") {
      setDriverLoading(true);
      CustomerService.fetchDriverByName(string)
        .then((response) => {
          const data = response?.data;
          const driverList = (data?.content || []).map((driver) => ({
            ...driver,
            firstName: driver.firstName?.trim(),
          }));
          setDriversName(driverList);
        })
        .finally(() => {
          setDriverLoading(false);
        });
    }
  };

  /************** CheckPay To Fetch function ***************/

  const fetchCheckPayToByName = (string) => {
    setCheckPayLoading(true);
    CustomerService.fetchCheckPayToByName(string)
      .then(({ data }) => {
        setCheckPayToList(data?.content);
      })
      .finally(() => {
        setCheckPayLoading(false);
      });
  };

  /************** Driver Autocomplete Handle function On select ***************/
  const handleDriverSelection = (driver) => {
    if (driver.lastName) {
      setCommissionDriverInput(driver.firstName?.trim() + " " + driver.lastName?.trim());
      setCommissionDriverFK(driver.driverPK);
    } else {
      setCommissionDriverInput(driver.firstName?.trim());
      setCommissionDriverFK(driver.driverPK);
    }
  };

  /************** Driver Lookup Show ***************/
  const handleDriverLookupModalshow = () => {
    setshowDriverLookup(true);
  };

  /************** Driver Lookup Handle function ***************/
  const handleDriverLookupSelection = (driver) => {
    setCommissionDriverInput(driver.firstName?.trim());
    setCommissionDriverFK(driver.driverPK);
    setshowDriverLookup(false);
    if (driver.lastName) {
      setCommissionDriverInput(driver.firstName?.trim() + " " + driver.lastName?.trim());
      setCommissionDriverFK(driver.driverPK);
      setshowDriverLookup(false);
    } else {
      setCommissionDriverInput(driver.firstName?.trim());
      setCommissionDriverFK(driver.driverPK);
      setshowDriverLookup(false);
    }
  };

  /************** Driver Lookup Hide ***************/
  const hideDriverModal = () => {
    setshowDriverLookup(false);
  };

  /************** Return Broker Autocomplete Fetch function ***************/
  const fetchBrokerByName = (string) => {
    setReturnBrolerLoading(true);
    CustomerService.fetchBrokerByName(string)
      .then((response) => {
        const data = response?.data;
        const brokerList = (data?.content || []).map((broker) => ({
          ...broker,
          description: broker.description?.trim(),
        }));
        setBrokerList(brokerList);
      })
      .finally(() => {
        setReturnBrolerLoading(false);
      });
  };

  /************** Return Broker Autocomplete Default setting in Edit Mode ***************/
  const fetchInputValueforReturnBroker = (brokerFK, brokerName) => {
    if (brokerFK && brokerName) {
      setBrokerInput(brokerName.trim());
    } else if (brokerFK) {
      CustomerService.getBrokerById(brokerFK)
        .then((response) => {
          const data = response?.data;
          setBrokerInput(data?.description?.trim());
        })
        .catch((err) => {});
    } else {
      setBrokerInput("");
    }
  };

  /************** Return Broker Autocomplete Handle function On select ***************/
  const handleBrokerSelection = (broker) => {
    setBrokerInput(broker.description?.trim());
    setBrokerId(broker.importBrokerPK);
  };

  /************** Return Broker Lookup Show ***************/
  const handleReturnBrokerLookupModalshow = () => {
    setshowReturnBrokerLookup(true);
  };

  /************** Return Broker Lookup Handle function ***************/
  const handleReturnBrokerLookupSelection = (broker) => {
    setBrokerInput(broker.description?.trim());
    setBrokerId(broker.importBrokerPK);
    setshowReturnBrokerLookup(false);
  };

  /************** Return Broker Lookup Hide ***************/
  const hideReturnBrokerModal = () => {
    setshowReturnBrokerLookup(false);
  };

  /************** Default Dealer Autocomplete Fetch function ***************/
  const fetchDealerByName = (string) => {
    setDefaultLoading(true);
    CustomerService.fetchDealerByName(string)
      .then((response) => {
        const data = response?.data;
        const dealerList = (data?.content || []).map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
        setDefaultDealer(dealerList);
      })
      .finally(() => {
        setDefaultLoading(false);
      });
  };

  /************** Default Dealer Autocomplete Handle function On select ***************/
  const handleDefaultDealerSelection = (dealer) => {
    setDefaultDealerFK(dealer.dealerPK);
    setDefaultDealerInput(dealer.name?.trim());
  };

  /************** Default Dealer Lookup Show ***************/
  const handleDefaultDealerLookupModalshow = () => {
    setShowDefaultDealerLookup(true);
  };

  /************** Default Dealer Lookup Handle function ***************/
  const handleDefaultDealerLookupSelection = (dealer) => {
    setDefaultDealerFK(dealer.dealerPK);
    setDefaultDealerInput(dealer.name?.trim());
    setShowDefaultDealerLookup(false);
  };

  /************** Default Dealer Lookup Hide ***************/
  const hideDefaultDealerModal = () => {
    setShowDefaultDealerLookup(false);
  };

  /************** Driver Lookup Hide ***************/

  const driverSelectionModalHide = () => {
    setshowDriverLookup(false);
  };

  /************** Default Special Code Autocomplete Fetch function ***************/
  const fetchSpecialCodeByName = (string) => {
    setDefaultSpecialLoading(true);
    CustomerService.fetchSpecialCodeByName(string)
      .then((response) => {
        const data = response?.data;
        const codeList = (data?.content || []).map((code) => ({ ...code, description: code.description?.trim() }));
        setDefaultSpecialCode(codeList);
      })
      .finally(() => {
        setDefaultSpecialLoading(false);
      });
  };
  /************** Default Special Code Autocomplete Handle function On select ***************/
  const handleDefaultSpecialCodeSelection = (code) => {
    setDefaultSpecialCodeFK(code.specialCodePK);
    setDefaultSpecialCodeInput(code.description?.trim());
  };

  /************** Default Special Code Lookup Show ***************/
  const handleDefaultSpecialCodeLookupModalshow = () => {
    setShowDefaultSpecialCode(true);
  };

  /************** Default Special Code Lookup Handle function ***************/
  const handleDefaultSpecialCodeLookupSelection = (code) => {
    setDefaultSpecialCodeFK(code.specialCodePK);
    setDefaultSpecialCodeInput(code.description?.trim());
    setShowDefaultSpecialCode(false);
  };

  /************** Default Special Code Lookup Hide ***************/
  const hideDefaultSpecialCodeModal = () => {
    setShowDefaultSpecialCode(false);
  };

  /************** Check Pay To Lookup Show **************/
  const handleCheckPayToLookupModalShow = () => {
    setShowCheckPayToLookup(true);
  };

  /************** Check Pay To Lookup Handle function ***************/
  const handleCheckPayToLookupSelection = (checkPayTo) => {
    setCheckPayToFK(checkPayTo.id);
    setCheckPayToInput(checkPayTo.description?.trim());
    setShowCheckPayToLookup(false);
  };

  /************** Check Pay To Lookup Hide ***************/
  const hideCheckPayToLookup = () => {
    setShowCheckPayToLookup(false);
  };

  const getGenerateCommission = () => {
    CustomerService.getGenerateCommission()
      .then((response) => {
        const data = response?.data;
        setAllGenerateCommission(data);
      })
      .catch((error) => {});
  };
  const getOrderEntryUsers = () => {
    CustomerService.getOrderEntryUsers()
      .then((response) => {
        const data = response?.data;
        setOrderEntryUserType(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (payCommisionToDriver === false) {
      setCommissionDriverFK(null);
      setCommissionDriverInput("");
    }
  }, [payCommisionToDriver]);

  useEffect(() => {
    if (generateCommission === "N") {
      setPayCommisionToDriver(false);
      setFlatRate("");
      setMileage("");
      setPercentage("");
      setCommissionDriverFK(null);
      setCommissionDriverInput("");
      setCheckPayToFK(null);
      setCheckPayToInput("");
    }
  }, [generateCommission, payCommisionToDriver, flatRate, mileage, percentage]);

  useEffect(() => {
    if (generateCommission === "F") {
      setMileage("");
      setPercentage("");
    }
  }, [mileage, percentage, flatRate, generateCommission]);

  useEffect(() => {
    if (generateCommission === "P") {
      setMileage("");
      setFlatRate("");
    }
  }, [mileage, percentage, flatRate, generateCommission]);

  useEffect(() => {
    if (generateCommission === "M") {
      setPercentage("");
      setFlatRate("");
    }
  }, [mileage, percentage, flatRate, generateCommission]);

  useEffect(() => {
    getGenerateCommission();
    getOrderEntryUsers();
  }, []);

  useEffect(() => {
    if (editCustomerData === null) {
      setGenerateCommission("N");
      setCommissionDriverFK(null);
      setCommissionDriverInput("");
      setPayCommisionToDriver(false);
      setOrderUntilCommission("");
      setFlatRate("");
      setMileage("");
      setPercentage("");
      setDispatcher("");
      setPhone("");
      setFax("");
      setEmail("");
      setBrokerId(null);
      setBrokerInput("");
      setDefaultDealerFK(null);
      setDefaultDealerInput("");
      setDefaultSpecialCodeFK(null);
      setDefaultSpecialCodeInput("");
      setOrderEntryUsers("");
      setOrderEntryInstructions("");
    }
    if (editCustomerData !== null) {
      setGenerateCommission(
        editCustomerData.generateCommision != null ? editCustomerData.generateCommision : "N"
      );
      setCommissionDriverFK(
        editCustomerData.commissionDriverFK != null ? editCustomerData.commissionDriverFK : null
      );
      setPayCommisionToDriver(
        editCustomerData.payCommissionToDriver != null ? editCustomerData.payCommissionToDriver : ""
      );
      setOrderUntilCommission(
        editCustomerData.ordersUntilCommission != null ? editCustomerData.ordersUntilCommission : ""
      );
      setFlatRate(
        editCustomerData.commissionFlat != null && editCustomerData.generateCommision === "F"
          ? editCustomerData.commissionFlat
          : ""
      );
      setMileage(
        editCustomerData.commissionMilage != null && editCustomerData.generateCommision === "M"
          ? editCustomerData.commissionMilage
          : ""
      );
      setPercentage(
        editCustomerData.commissionPercentage != null && editCustomerData.generateCommision === "P"
          ? editCustomerData.commissionPercentage
          : ""
      );
      setDispatcher(editCustomerData.dispatcher != null ? editCustomerData.dispatcher : "");
      setPhone(
        editCustomerData.dispatcherPhone != null ? formatPhoneNumber(editCustomerData.dispatcherPhone) : ""
      );
      setFax(editCustomerData.dispatcherFAX != null ? formatPhoneNumber(editCustomerData.dispatcherFAX) : "");
      setEmail(editCustomerData.dispatcherEmail != null ? editCustomerData.dispatcherEmail : "");
      setCommissionDriverInput(editCustomerData.commissionDriverName?.trim() || "");
      setBrokerId(editCustomerData.importBrokerFK != null ? editCustomerData.importBrokerFK : "");
      fetchInputValueforReturnBroker(editCustomerData.importBrokerFK, editCustomerData.importBrokerName);
      setDefaultDealerFK(editCustomerData.deliveryDealerFK != null ? editCustomerData.deliveryDealerFK : "");
      setCheckPayToFK(editCustomerData.checkPayToFK != null ? editCustomerData.checkPayToFK : null);
      setCheckPayToInput(editCustomerData.checkPayToName?.trim() || "");
      setDefaultDealerInput(editCustomerData.deliveryDealerName?.trim() || "");
      setDefaultSpecialCodeFK(
        editCustomerData.specialcodeIntFK != null ? editCustomerData.specialcodeIntFK : ""
      );
      setDefaultSpecialCodeInput(editCustomerData.specialCodeName?.trim() || "");
      setOrderEntryUsers(
        editCustomerData.orderEntryUsers != null ? editCustomerData.orderEntryUsers?.trim() : ""
      );
      setOrderEntryInstructions(
        editCustomerData.orderEntryInstructions != null ? editCustomerData.orderEntryInstructions : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    detailsSubTabFormData();
  }, [
    generateCommission,
    payCommisionToDriver,
    orderUntilCommission,
    commissionDriverFK,
    flatRate,
    mileage,
    percentage,
    dispatcher,
    phone,
    fax,
    email,
    brokerId,
    defaultDealerFK,
    defaultSpecialCodeFK,
    orderEntryUsers,
    orderEntryInstructions,
    checkPayToFK,
  ]);

  const detailsSubTabFormData = () => {
    dispatch(
      setCustomerFormData({
        generateCommision: generateCommission,
        payCommissionToDriver: payCommisionToDriver,
        ordersUntilCommission: orderUntilCommission,
        commissionDriverFK: commissionDriverFK,
        commissionFlat: flatRate,
        commissionMilage: mileage,
        commissionPercentage: percentage,
        dispatcher: dispatcher,
        dispatcherPhone: phone?.replace(/\s+/g, ""),
        dispatcherFAX: fax?.replace(/\s+/g, ""),
        dispatcherEmail: email,
        importBrokerFK: brokerId,
        deliveryDealerFK: defaultDealerFK,
        specialcodeIntFK: defaultSpecialCodeFK,
        orderEntryUsers: orderEntryUsers,
        orderEntryInstructions: orderEntryInstructions,
        checkPayToFK: checkPayToFK,
      })
    );
  };

  useEffect(() => {
    if (generateCommission === "M" && !(mileage !== "" || String(mileage?.match(/^\d{0,1}(?:\.\d{1,4})?$/)))) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (generateCommission === "P" && percentage === "") {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (generateCommission !== "N" && !payCommisionToDriver && !(checkPayToFK && checkPayToInput)) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (lastpointer(flatRate)) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (lastpointer(mileage)) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (fax && !fax?.match(phoneRegex)) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (!phone?.match(phoneRegex) || !phone) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (dispatcher === "") {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (defaultDealerInput && !defaultDealerFK) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (defaultSpecialCodeInput && !defaultSpecialCodeFK) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (brokerInput && !brokerId) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (email && !email?.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else if (payCommisionToDriver && (!commissionDriverFK || !orderUntilCommission)) {
      dispatch(setIsOrdersDetailsTabValid(false));
    } else {
      dispatch(setIsOrdersDetailsTabValid(true));
    }
  }, [
    dispatcher,
    generateCommission,
    mileage,
    flatRate,
    percentage,
    brokerId,
    brokerInput,
    dispatcher,
    phone,
    fax,
    email,
    defaultDealerFK,
    defaultDealerInput,
    defaultSpecialCodeFK,
    defaultSpecialCodeInput,
    payCommisionToDriver,
    commissionDriverFK,
    commissionDriverInput,
    orderUntilCommission,
    checkPayToFK,
    checkPayToInput,
  ]);
  useEffect(() => {
    dispatch(setOrderEntryUsersToRedux(orderEntryUsers));
  }, [orderEntryUsers]);

  useEffect(() => {
    if (payCommisionToDriver === false) {
      setDriversName([]);
      setOrderUntilCommission("");
      setCommissionDriverFK(null);
      setCommissionDriverInput("");
    } else {
      setCheckPayToFK(null);
      setCheckPayToInput("");
    }
  }, [payCommisionToDriver]);

  const validationSchema = yup.object({
    dispatcher: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    fax: yup.string().matches(phoneRegex),
    email: yup.string().matches(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/),
    percentage: yup.string().matches(percentageValidation),
  });

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };

  const isInvalidFlatRate = (value) => {
    if (value === "0.") return true;
    const pattern = /^\d{1,5}(\.\d{1,2})?$/;
    if (value === "" || value === null) return false;
    return !pattern.test(value);
  };

  return (
    <Formik
      initialValues={{
        dispatcher,
        phone,
        fax,
        email,
        orderUntilCommission,
        flatRate,
        mileage,
        percentage,
      }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnMount
      initialTouched={{
        dispatcher: true,
        phone: true,
        fax: true,
        email: true,
        flatRate: true,
        mileage: true,
        percentage: true,
      }}
    >
      {(formik) => (
        <div className="p-2 w-100">
          <Row className="m-0 p-0">
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              {/*Generate Commission*/}

              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.generate.commision.field")}
                  </Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <Form.Select
                    className="customFormControl"
                    name="generateCommission"
                    id="generateCommission"
                    value={generateCommission}
                    disabled={viewDetail}
                    onChange={(e) => {
                      setGenerateCommission(e.target.value);
                    }}
                  >
                    {allGenerateCommission?.map((item) => (
                      <option key={item.generateCommissionId} value={item.generateCommissionId}>
                        {item.generateCommissionName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/*Pay Commission to Driver*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.pay.commision.to.driver.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="payCommisionToDriver"
                    value={"payCommisionToDriver"}
                    checked={payCommisionToDriver}
                    style={{ backgroundColor: generateCommission === "N" ? "grey" : "" }}
                    disabled={viewDetail || generateCommission === "N"}
                    onChange={(e) => setPayCommisionToDriver(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Driver*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.driver.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={driverNames}
                    searchString={commissionDriverInput}
                    customFormatSearchString={(searchString) => searchString}
                    renderItemId={(driver) => driver.driverPK}
                    renderItemField={(driver) =>
                      driver.lastName
                        ? driver.firstName?.trim() + " " + driver.lastName
                        : driver.firstName?.trim()
                    }

                    handleSearchString={(string) => setCommissionDriverInput(string)}
                    fetchDataBySearchString={fetchDriverByName}
                    onSelect={handleDriverSelection}
                    selectedId={commissionDriverFK}
                    loading={driverLoading}
                    clearInputCallback={() => {
                      setCommissionDriverFK(null);
                    }}
                    disabled={viewDetail || !payCommisionToDriver}
                    className={`${
                      !viewDetail
                        ? payCommisionToDriver
                          ? commissionDriverFK !== null && commissionDriverInput
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                        : ""
                    }`}
                  />
                  <LookupButton
                    onClick={handleDriverLookupModalshow}
                    disabled={viewDetail || !payCommisionToDriver}
                  />
                </Col>
              </Form.Group>

              {/*Check Pay To*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Check Pay To</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={checkPayToList}
                    searchString={checkPayToInput}
                    customFormatSearchString={(searchString) => searchString}
                    renderItemId={(checkPayTo) => checkPayTo.id}
                    renderItemField={(checkPayTo) => checkPayTo.description}
                    handleSearchString={(string) => setCheckPayToInput(string)}
                    fetchDataBySearchString={fetchCheckPayToByName}
                    onSelect={handleCheckPayToLookupSelection}
                    clearInputCallback={() => {
                      setCheckPayToFK(null);
                    }}
                    disabled={viewDetail || payCommisionToDriver || generateCommission === "N"}

                    className={`${
                      viewDetail || generateCommission === "N" || payCommisionToDriver
                        ? ""
                        : checkPayToFK
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    selectedId={checkPayToFK}

                    loading={checkPayLoading}
                  />
                  <LookupButton
                    onClick={handleCheckPayToLookupModalShow}
                    disabled={viewDetail || payCommisionToDriver || generateCommission === "N"}
                  />
                </Col>
              </Form.Group>

              {/*Orders Until Commission*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.order.until.commission.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "80px" }}>
                  <Input
                    className="customFormControl"
                    name="orderUntilCommission"
                    type="text"
                    value={orderUntilCommission}
                    maxLength={9}
                    disabled={viewDetail || generateCommission === "N" || payCommisionToDriver === false}
                    onChange={(e) => {
                      formik.handleChange(e);
                      e.target.value?.match(/^[0-9]*$/) && setOrderUntilCommission(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    style={{
                      border:
                        viewDetail || !payCommisionToDriver
                          ? ""
                          : payCommisionToDriver && orderUntilCommission !== ""
                            ? "green 2px solid"
                            : "red 2px solid",
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Flat Rate*/}
              <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.flat.rate.field")}
                  </Form.Label>
                </Col>

                <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "80px" }}>
                  <Input
                    className={`customFormControl ${isInvalidFlatRate(flatRate) ? "borderRed" : ""}`}
                    name="flatRate"
                    value={flatRate}
                    maxLength={8}
                    disabled={
                      viewDetail ||
                      generateCommission === "N" ||
                      generateCommission === "M" ||
                      generateCommission === "P"
                    }
                    onChange={(e) => {
                      let value = e.target.value;

                      const pattern = /^\d{0,5}(\.\d{0,2})?$/;
                      if (pattern.test(value)) {
                        setFlatRate(value);
                        formik.setFieldValue("flatRate", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              {/*Mileage*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.mileage.field")}
                  </Form.Label>
                </Col>

                <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
                  <Input
                    className={`customFormControl ${
                      viewDetail || generateCommission !== "M"
                        ? "black"
                        : mileage !== "" &&
                            !formik.errors.mileage &&
                            String(mileage).match(/^\d{0,1}(?:\.\d{1,4})?$/)
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    name="mileage"
                    value={mileage}
                    maxLength={10}
                    disabled={
                      viewDetail ||
                      generateCommission === "N" ||
                      generateCommission === "F" ||
                      generateCommission === "P"
                    }
                    onChange={(e) => {
                      let val = e.target.value;

                      formik.handleChange(e);
                      if (/^\d{0,1}(?:\.\d{0,4})?$/.test(val)) {
                        setMileage(val);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              {/*Percentage*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.percentage.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
                  <Input
                    className={`customFormControl ${
                      viewDetail || generateCommission !== "P"
                        ? "black"
                        : percentage !== ""
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    name="percentage"
                    value={percentage}
                    maxLength={2}
                    disabled={
                      viewDetail ||
                      generateCommission === "N" ||
                      generateCommission === "F" ||
                      generateCommission === "M"
                    }
                    onChange={(e) => {
                      formik.handleChange(e);
                      e.target.value?.match(/^[0-9]*$/) && setPercentage(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>
              {/*Dispatcher*/}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.dispatcher.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <Input
                    type="text"
                    className="customFormControl"
                    name="dispatcher"
                    maxLength={30}
                    value={dispatcher}
                    disabled={viewDetail}
                    onChange={(e) => {
                      const cleanedValue = removeLeadingWhitespace(e.target.value);
                      setDispatcher(cleanedValue);
                    }}
                    style={{
                      border:
                        viewDetail === true
                          ? "black 1px solid"
                          : formik.errors.dispatcher === undefined && dispatcher?.length > 0
                            ? "green 2px solid"
                            : formik.errors.dispatcher !== undefined
                              ? "red 2px solid"
                              : "",
                    }}
                  />
                </Col>
              </Form.Group>

              {/* Phone Field */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
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
                        viewDetail === true
                          ? "black 1px solid"
                          : formik.errors.phone === undefined && phone != null && phone?.length > 0
                            ? "green 2px solid"
                            : formik.errors.phone !== undefined
                              ? "red 2px solid"
                              : "",
                    }}
                  />
                </Col>
              </Form.Group>

              {/* Fax Field */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
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
                        viewDetail === true || fax === ""
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

              {/*Email*/}
              <Form.Group className="mt-3 mb-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.email.field")}
                  </Form.Label>
                </Col>
                <Col xs={8} sm={8} md={8} className="p-0">
                  <Input
                    className="customFormControl"
                    type="text"
                    name="email"
                    maxLength={70}
                    value={email}
                    disabled={viewDetail}
                    onChange={(e) => {
                      if (e.target.value === " ") {
                        setEmail("");
                        formik.setFieldValue("email", "");
                      } else {
                        setEmail(e.target.value);
                        formik.setFieldValue("email", e.target.value);
                      }
                    }}

                    style={{
                      border:
                        viewDetail === true
                          ? "black 1px solid"
                          : formik.errors.email === undefined && email != null && email?.length > 0
                            ? ""
                            : formik.errors.email !== undefined
                              ? "red 2px solid"
                              : "",
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col sm={6} md={6} xs={6}>
              {/*Default Dealer*/}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.default.dealer.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={defaultDealer}
                    searchString={defaultDealerInput}
                    customFormatSearchString={(searchString) => searchString}
                    renderItemId={(dealer) => dealer.dealerPK}
                    renderItemField={(dealer) => dealer.name}
                    handleSearchString={(string) => setDefaultDealerInput(string)}
                    fetchDataBySearchString={fetchDealerByName}
                    onSelect={handleDefaultDealerSelection}
                    selectedId={defaultDealerFK}
                    loading={defaultLoading}
                    clearInputCallback={() => {
                      setDefaultDealerFK(null);
                    }}
                    disabled={viewDetail}
                    className={`${defaultDealerFK === null && defaultDealerInput !== "" ? "borderRed" : ""}`}
                  />
                  <LookupButton onClick={handleDefaultDealerLookupModalshow} disabled={viewDetail} />
                </Col>
              </Form.Group>

              {/*Default Special Code*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.default.special.code.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={defaultSpecialCode}
                    searchString={defaultSpecialCodeInput}
                    customFormatSearchString={(searchString) => searchString}
                    renderItemId={(code) => code.specialCodePK}
                    renderItemField={(code) => code.description}
                    handleSearchString={(string) => setDefaultSpecialCodeInput(string)}
                    fetchDataBySearchString={fetchSpecialCodeByName}
                    onSelect={handleDefaultSpecialCodeSelection}
                    selectedId={defaultSpecialCodeFK}
                    loading={defaultSpecialLoading}
                    clearInputCallback={() => {
                      setDefaultSpecialCodeFK(null);
                    }}
                    disabled={viewDetail}
                    className={`${defaultSpecialCodeFK === null && defaultSpecialCodeInput !== "" ? "borderRed" : ""}`}
                  />
                  <LookupButton onClick={handleDefaultSpecialCodeLookupModalshow} disabled={viewDetail} />
                </Col>
              </Form.Group>

              {/*Order Entry Users*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.order.entry.users.field")}
                  </Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <Form.Select
                    className="customFormControl"
                    name="orderEntryUsers"
                    id="orderEntryUsers"
                    value={orderEntryUsers}
                    disabled={viewDetail}
                    onChange={(e) => {
                      setOrderEntryUsers(e.target.value);
                    }}
                  >
                    <option value="">--Select--</option>
                    {orderEntryUserType?.map((item) => (
                      <option key={item.orderEntryUserTypeId} value={item.orderEntryUserTypeId}>
                        {item.orderEntryUserTypeName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/*Return Broker*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.detail.return.broker.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={brokerList}
                    searchString={brokerInput}
                    customFormatSearchString={(searchString) => searchString}
                    renderItemId={(broker) => broker.importBrokerPK}
                    renderItemField={(broker) => broker.description}
                    handleSearchString={(string) => setBrokerInput(string)}
                    fetchDataBySearchString={fetchBrokerByName}
                    onSelect={handleBrokerSelection}

                    clearInputCallback={() => {
                      setBrokerId(null);
                    }}
                    disabled={viewDetail}
                    className={`${brokerId === null && brokerInput !== "" ? "borderRed" : ""}`}
                    selectedId={brokerId}
                    loading={returnBrolerLoading}
                  />
                  <LookupButton onClick={handleReturnBrokerLookupModalshow} disabled={viewDetail} />
                </Col>
              </Form.Group>

              {/*Order Entry Instructins*/}
              <Form.Group className="form-group mt-5 align-items-center row  m-l-0 m-r-0">
                <Col sm={12} md={12} xs={12} className="p-0">
                  <label className="col-form-label dealer-label p-0 m-b-20">
                    {t("customer.maintanance.orders.sub.tab.detail.order.entry.instructions.field")}
                  </label>
                </Col>
                <Col sm={10} md={10} className="p-0">
                  <textarea
                    rows={13}
                    cols={20}
                    type="text"
                    className="customFormControl h-100 "
                    name="orderEntryInstructions"
                    autoComplete="off"
                    value={orderEntryInstructions}
                    disabled={viewDetail}

                    onInput={(e) => {
                      const cleanedValue = removeLeadingWhitespace(e.target.value);
                      setOrderEntryInstructions(cleanedValue);
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <DriverLookup
            show={showDriverLookup}
            onHide={driverSelectionModalHide}
            renderItemId={(driver) => driver.driverPK}
            handleLookupSelection={handleDriverLookupSelection}
            MaintenanceProgram
          />

          {/* Return Broker Lookup Modal */}
          <BrokerLookup
            show={showReturnBrokerLookup}
            onHide={hideReturnBrokerModal}
            renderItemId={(broker) => broker.importBrokerPK}
            handleLookupSelection={handleReturnBrokerLookupSelection}
            brokerType="import"
            MaintenanceProgram
          />
          {/* Default Dealer Lookup Modal */}
          <DealerLookup
            show={showDefaultDealerLookup}
            onHide={hideDefaultDealerModal}
            renderItemId={(dealer) => dealer.dealerPK}
            handleLookupSelection={handleDefaultDealerLookupSelection}
            MaintenanceProgram
          />

          {/* Default Special Code Lookup Modal */}
          <SpecialCodeLookup
            show={showDefaultSpecialCode}
            onHide={hideDefaultSpecialCodeModal}
            renderItemId={(code) => code.specialCodePK}
            handleLookupSelection={handleDefaultSpecialCodeLookupSelection}
            MaintenanceProgram
          />
          <CheckPayToLookup
            show={showCheckPayToLookup}
            onHide={hideCheckPayToLookup}
            renderItemId={(checkPayTo) => checkPayTo.id}
            MaintenanceProgram
            handleLookupSelection={handleCheckPayToLookupSelection}
          />
        </div>
      )}
    </Formik>
  );
}
export default DetailSubTab;
