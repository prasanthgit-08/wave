import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import CustomRadioGroup from "../../../../../../../common/CustomRadioGroup";
import AutoCompleteDropdown from "../../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../../common/LookupButton";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  setApuAuthorizedBy,
  setApuData,
  setAuthorizedBy,
  setBillingCustomer,
  setBillingCustomerId,
  setBillingCustomerInput,
  setChargeCreditcard,
  setCreditCardData,
  setCreditCardLoder,
  setCustomerId,
  setDriverAmount,
  setInvoiceAmount,
  setInvoiceBillingCustomerId,
  setInvoiceTrextArray,
  setUnitId,
} from "../../../../../../../../redux/UndispatchSlice";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import { useSelector } from "react-redux";
import DynamicTextFields from "../../../../../../../common/AutoWrapTextFields/DynamicTextFields";
import CustomerService from "../../../../../../../../services/CustomerService";
import DriverService from "../../../../../../../../services/DriverService";
import CustomerLookup from "../../../../../../../LookupScreens/Customer/CustomerLookup";
const APUScreenContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    driverAmount,
    invoiceAmount,
    billingCustomer,
    billingCustomerId,
    billingCustomerInput,
    chargeCreditcard,
    apuAuthorizedBy,
    invoiceTrextArray,
    apuData,
    invoicetext1,
    invoicetext2,
    invoicetext3,
    invoicetext4,
    apuBackButtonFlag,
    creditCardConfirmationFlag,
    creditCardData,
  } = useSelector((state) => state.undispatchReducer);
  const [invoiceTextInputValues, setInvoiceTextInputValues] = useState(Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [customerLookUpShow, setCustomerLookUpShow] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [creditCardDetails, setCreditCardDetails] = useState([]);
  const [creditCardFlag, setCreditCardFlag] = useState(false);
  const { driverId, dispatchId } = useParams();
  const [saveFlag, setSaveFlag] = useState(false);
  const searchTerms = useSelector((state) => state.customerLookupReducer.searchTerms);
  const advanceSortingOrder = useSelector((state) => state.customerLookupReducer.advanceSortingOrder);
  const selectedSearchCriteria = useSelector((state) => state.customerLookupReducer.selectedSearchCriteria);
  const searchedCustomer = useSelector((state) => state.customerLookupReducer.searchedCustomer);
  const pageNo = useSelector((state) => state.customerLookupReducer.pageNo);
  const sortFlag = useSelector((state) => state.customerLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.customerLookupReducer.normalSortValue);
  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);
  const dispatchData = useSelector((state) => state.undispatchReducer.dispatchData);
  const unitId = useSelector((state) => state.undispatchReducer.unitId);
  const customerId = useSelector((state) => state.undispatchReducer.customerId);

  useEffect(() => {
    if (!apuData) {
      setSaveFlag(true);
      UndispatchService.getAPUData(dispatchId)
        .then(({ data }) => {
          dispatch(setApuData(data));
          dispatch(setInvoiceAmount(data?.invoiceAmount || 0));
          dispatch(setDriverAmount(data?.driverAmount || 0));
          dispatch(setUnitId(data?.unitPK));
          dispatch(setCustomerId(data?.customerPK));
          setSaveFlag(false);
        })
        .catch(() => {
          setSaveFlag(false);
        });
    }
  }, [apuData]);

  useEffect(() => {
    if (billingCustomer === "Pickup") {
      dispatch(setBillingCustomerId(apuData?.pickupBillCustomerFK));
      dispatch(setBillingCustomerInput(apuData?.pickupBillCustomerName?.trim() || ""));
    } else if (billingCustomer === "Delivery") {
      dispatch(setBillingCustomerId(apuData?.deliveyBillCustomerFK));
      dispatch(setBillingCustomerInput(apuData?.deliveyBillCustomerName));
    } else if (billingCustomer === "No") {
      dispatch(setBillingCustomerId(apuData?.customerPK));
      dispatch(setBillingCustomerInput(dispatchData?.customer));
    }
  }, [billingCustomer, apuData, dispatchData]);

  /**
   * Fetch all Users
   * Used for  AlertCleared Users Autocomplete
   */
  const fetchCustomers = (string) => {
    setLoading(true);
    UndispatchService.getAllCustomerByName(
      string,
      apuData?.alternateAPUCustomerGroupFK,
      apuData?.customerPK,
      apuData?.companyName
    )
      .then((response) => {
        const data = response.data.content;

        const customerList = data?.map((customer) => ({
          ...customer,
          name: customer.name?.trim(),
        }));
        setCustomerData(customerList);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleCustomerSelection = (item) => {
    dispatch(setBillingCustomerId(item.customerPK));
    dispatch(setBillingCustomerInput(item.name?.trim()));
    setCustomerLookUpShow(false);
  };
  const handleCustomerLookup = () => {
    setCustomerLookUpShow(true);
  };
  useEffect(() => {
    if (invoiceTrextArray.length !== 0) {
      setInvoiceTextInputValues(invoiceTrextArray);
    }
  }, []);

  /***  edit/paste data passes to back end as array - invoice text ***/

  useEffect(() => {
    dispatch(setInvoiceTrextArray(invoiceTextInputValues));
  }, [invoiceTextInputValues]);

  useEffect(() => {
    if (!undispatchFlag) {
      navigate(`/undispatch/${driverId}`);
    }
  }, [undispatchFlag]);
  ///
  /******
   * Get the status of charge credit card
   *******/
  const getStatusForCreditCard = () => {
    if (apuData && billingCustomerId && unitId && !creditCardConfirmationFlag) {
      setSaveFlag(true);
      dispatch(setCreditCardLoder(true));
      UndispatchService.getCreditCardStatus(
        unitId,
        billingCustomerId,
        apuData?.companyPK,
        apuData?.isSisterCompany
      )
        .then((response) => {
          const creditCardStatus = response.data?.CreditCardStatus;

          dispatch(setInvoiceBillingCustomerId(creditCardStatus[0]?.BillingCustomer));
          setSaveFlag(false);

          dispatch(setCreditCardData(creditCardStatus[0]));
          dispatch(setCreditCardLoder(false));
        })
        .catch((error) => {
          setSaveFlag(false);
          dispatch(setCreditCardLoder(false));
        });
    }
  };

  useEffect(() => {
    getStatusForCreditCard();
  }, [unitId, billingCustomerId, apuData, creditCardConfirmationFlag]);

  useEffect(() => {
    if (!creditCardConfirmationFlag) {
      if (creditCardData?.Navigate === "P") {
        setCreditCardFlag(false);
        dispatch(setChargeCreditcard(false));
      } else if (
        creditCardData?.Navigate === "Y" &&
        (creditCardData?.Case === "Case1" ||
          creditCardData?.Case === "Case2" ||
          creditCardData?.Case === "Case3")
      ) {
        dispatch(setChargeCreditcard(true));
        setCreditCardFlag(true);
      }
      if (creditCardData?.Navigate === "N") {
        setCreditCardFlag(true);
        dispatch(setChargeCreditcard(false));
      }
    }
  }, [creditCardData, creditCardConfirmationFlag]);

  return (
    <div className="p-2">
      <Row className="m-0 p-10">
        <Col xs={12}>
          <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Invoice Amount</Form.Label>
            </Col>
            <Col xs={1} sm={1} md={1} className="p-0 w-80px">
              <input
                type="text"
                value={invoiceAmount}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={!apuData?.adjstedAttemptedPickupAmount}
                onInput={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && dispatch(setInvoiceAmount(e.target.value));
                }}

                className={`customFormControl ${
                  !apuData?.adjstedAttemptedPickupAmount
                    ? ""
                    : !invoiceAmount || invoiceAmount === "." || /^\d+\.$/.test(invoiceAmount)
                      ? "borderRed"
                      : "borderGreen"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Driver Amount</Form.Label>
            </Col>
            <Col xs={1} sm={1} md={1} className="p-0 w-80px">
              <input
                type="text"
                className={`customFormControl ${
                  !apuData?.adjstedAttemptedPickupAmount
                    ? ""
                    : !driverAmount || driverAmount === "." || /^\d+\.$/.test(driverAmount)
                      ? "borderRed"
                      : "borderGreen"
                }`}

                value={driverAmount}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={!apuData?.adjstedAttemptedPickupAmount}
                onInput={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && dispatch(setDriverAmount(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Bill Alternate Customer
              </Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  className="form-check-input p-0"
                  id="No"
                  name="radioGroup"
                  value="No"
                  checked={billingCustomer === "No"}
                  onChange={(e) => {
                    dispatch(setBillingCustomer(e.target.value));
                  }}
                  disabled={!apuData?.selectedAttemptedPickupCustomer}
                />
                <Col xs={1} md={1} sm={1} className="p-0"></Col>
                <Form.Label className="col-form-label me-2  w-60px">No</Form.Label>
              </div>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  className="form-check-input p-0"
                  id="Pickup"
                  name="radioGroup"
                  value="Pickup"
                  hidden={!apuData?.pickupFlag}
                  checked={billingCustomer === "Pickup"}
                  onChange={(e) => {
                    dispatch(setBillingCustomer(e.target.value));
                  }}
                  disabled={!apuData?.selectedAttemptedPickupCustomer}
                />
                <Col xs={1} md={1} sm={1} className="p-0 w-5px"></Col>
                <Form.Label className="col-form-label me-2 w-150px " hidden={!apuData?.pickupFlag}>
                  Pickup
                </Form.Label>
              </div>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-80px">
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  className="form-check-input p-0"
                  id="Delivery"
                  name="radioGroup"
                  value="Delivery"
                  hidden={!apuData?.deliveryFlag}
                  checked={billingCustomer === "Delivery"}
                  onChange={(e) => {
                    dispatch(setBillingCustomer(e.target.value));
                  }}
                  disabled={!apuData?.selectedAttemptedPickupCustomer}
                />
                <Col xs={1} md={1} sm={1} className="p-0 w-5px"></Col>
                <Form.Label className="col-form-label me-2 w-150px " hidden={!apuData?.deliveryFlag}>
                  Delivery
                </Form.Label>
              </div>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  className="form-check-input p-0"
                  id="Select"
                  name="radioGroup"
                  value="Select"
                  checked={billingCustomer === "Select"}
                  onChange={(e) => {
                    dispatch(setBillingCustomer(e.target.value));
                    dispatch(setBillingCustomerId(null));
                    dispatch(setBillingCustomerInput(""));
                  }}
                  disabled={!apuData?.selectedAttemptedPickupCustomer}
                />
                <Col xs={1} md={1} sm={1} className="p-0 w-5px"></Col>
                <Form.Label className="col-form-label me-2 w-150px ">Select</Form.Label>
              </div>
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                arrayList={customerData}
                searchString={billingCustomerInput}
                renderItemId={(item) => item.customerPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => dispatch(setBillingCustomerInput(string))}
                fetchDataBySearchString={fetchCustomers}
                onSelect={handleCustomerSelection}
                clearInputCallback={() => {
                  dispatch(setBillingCustomerId(null));
                }}
                selectedId={billingCustomerId}
                disabled={
                  !apuData?.selectedAttemptedPickupCustomer ||
                  billingCustomer === "Pickup" ||
                  billingCustomer === "Delivery" ||
                  billingCustomer === "No"
                }
                loading={loading}
                className={`${billingCustomer === "Select" ? (billingCustomerId === null ? "borderRed" : "borderGreen") : ""}`}
              />
              <LookupButton
                onClick={handleCustomerLookup}
                disabled={
                  !apuData?.selectedAttemptedPickupCustomer ||
                  billingCustomer === "Pickup" ||
                  billingCustomer === "Delivery" ||
                  billingCustomer === "No"
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Charge Credit Card</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={chargeCreditcard}
                disabled={creditCardFlag}
                onChange={(e) => {
                  dispatch(setChargeCreditcard(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Authorized By</Form.Label>
            </Col>
            <Col xs={4} sm={4} md={4} className="p-0 ">
              <input
                type="text"
                className={`customFormControl h-100 ${apuAuthorizedBy?.trim() ? "borderGreen" : "borderRed"} `}
                value={apuAuthorizedBy}

                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => dispatch(setApuAuthorizedBy(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")))}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <CustomerLookup
        show={customerLookUpShow}
        onHide={() => setCustomerLookUpShow(false)}
        renderItemId={(customer) => customer.customerPK}
        handleLookupSelection={handleCustomerSelection}
        customServiceCallback={() =>
          UndispatchService.getAllCustomersForLookup(
            pageNo,
            searchedCustomer,
            selectedSearchCriteria,
            advanceSortingOrder,
            searchTerms,
            sortValue,
            sortFlag,
            apuData?.alternateAPUCustomerGroupFK,
            apuData?.customerPK,
            apuData?.companyName
          )
        }
      />
      {saveFlag && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APUScreenContent;
