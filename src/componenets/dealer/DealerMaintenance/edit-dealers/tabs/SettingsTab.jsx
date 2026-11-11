/* eslint-disable react-hooks/exhaustive-deps */
import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import {
  setDealer,
  setBeginDate,
  setEndDate,
  setBrokerSelection,
  setBrokerInput,
  setBrokerId,
  setCustomerSelection,
  setCustomerInput,
  setCustomerId,
  setViewDetail,
  setBolAtDispatchOrFaxBolAtOrderEntry,
  setLastOrderDate,
  setCloseBeginDateValid,
  setCloseEndDateValid,
  setFaxBolAtOrderEntry,
  setFaxBolAtDispatch,
} from "../../../../../redux/EditDealerSlice";
import { t } from "i18next";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import BrokerLookup from "../../../../LookupScreens/Broker/BrokerLookup";
import DealerService from "../../../../../services/DealerService";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import DateInputField from "../../../../common/DateInputField";
import { updateField } from "../../../../../utils/stateUtils";
import { useParams } from "react-router-dom";

const SettingsTab = () => {
  const { id } = useParams();

  const [brokerData, setBrokerData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  const [exportBroker, setExportBroker] = useState("");
  const [rvDealer, setRvDealer] = useState(false);
  const [twicrequired, setTwicRequired] = useState(false);

  const [doNotWash, setDoNotWash] = useState(false);
  const [customerWashOverride, setCustomerWashOverride] = useState(false);
  const [payCustomerForWash, setPayCustomerForWash] = useState(false);
  const [washCustomer, setWashCustomer] = useState("");
  const [storecode, setStoreCode] = useState("");
  const [holdOutboundDispatches, setHoldOutboundDispatches] = useState(false);
  const [holdReloadDispatches, setHoldReloadDispatches] = useState(false);
  const [holdDispatchNotes, setHoldDispatchNotes] = useState("");
  const [closedBeginDate, setClosedBeginDate] = useState("");
  const [closedEndDate, setClosedEndDate] = useState("");
  const [closednotes, setClosedNotes] = useState("");
  const [canadianValid, setCanadianValid] = useState(false);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);

  const dealerData = useSelector((state) => state.editDealerReducer.dealerData);
  const searchCriteria = useSelector((state) => state.editDealerReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.editDealerReducer.pageNumber);
  let viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);
  const dealer = useSelector((state) => state.editDealerReducer.dealer);
  const brokerSelection = useSelector((state) => state.editDealerReducer.brokerSelection);
  const brokerInput = useSelector((state) => state.editDealerReducer.brokerInput);
  const brokerId = useSelector((state) => state.editDealerReducer.brokerId);
  const customerSelection = useSelector((state) => state.editDealerReducer.customerSelection);
  const customerInput = useSelector((state) => state.editDealerReducer.customerInput);
  const customerId = useSelector((state) => state.editDealerReducer.customerId);
  const lastOrderDate = useSelector((state) => state.editDealerReducer.lastOrderDate);
  const closeBeginDateValid = useSelector((state) => state.editDealerReducer.closeBeginDateValid);
  const closeEndDateValid = useSelector((state) => state.editDealerReducer.closeEndDateValid);
  const faxBolAtOrderEntry = useSelector((state) => state.editDealerReducer.faxBolAtOrderEntry);
  const faxBolAtDispatch = useSelector((state) => state.editDealerReducer.faxBolAtDispatch);

  const dispatch = useDispatch();

  const settingsTabFormData = () => {
    dispatch(
      setDealer({
        lastOrderDate: lastOrderDate,
        brokerId: brokerId,
        rvDealer: rvDealer,
        twicRequired: twicrequired,
        faxBolAtOrderEntry: faxBolAtOrderEntry,
        faxBolAtDispatch: faxBolAtDispatch,
        doNotWash: doNotWash,
        customerWashOverride: customerWashOverride,
        payCustomerForWash: payCustomerForWash,
        washCustomerfk: customerId,
        storeCode: storecode,
        closedBeginDate: closedBeginDate,
        closedEndDate: closedEndDate,
        closedNotes: closednotes,
        holdOutboundDispatches: holdOutboundDispatches,
        holdReloadDispatches: holdReloadDispatches,
        holdDispatchNotes: holdDispatchNotes,
      })
    );
  };
  const isInvalidDateFormat = (dateStr) => {
    if (!dateStr) return false;
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/;
    return !regex.test(dateStr);
  };
  //for lookup
  const handleBrokerLookupModelShow = () => {
    dispatch(setBrokerSelection(true));
  };
  const BrokerLookupSelection = (broker) => {
    dispatch(setBrokerInput(broker.name?.trim()));
    dispatch(setBrokerId(broker.exportBrokerPK));

    dispatch(setBrokerSelection(false));
  };
  const hideBrokerModel = () => {
    dispatch(setBrokerSelection(false));
  };

  const fetchBroker = (string) => {
    setAutoCompleteLoading(true);
    DealerService.fetchBrokerAutoComplete(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response.data;
        const brokersList = data.content?.map((broker) => ({ ...broker, name: broker.name?.trim() }));
        setBrokerData(brokersList);
      })
      .catch((err) => {})
      .finally(() => {
        setAutoCompleteLoading(false);
      });
  };

  const setBrokerValue = (brokerId) => {
    if (brokerId) {
      let brokerElement = brokerData.find((state) => state.exportBrokerPK === brokerId);

      if (brokerElement !== undefined) {
        dispatch(setBrokerInput(brokerElement.name?.trim()));
      } else {
        DealerService.getRecordExportBroker(brokerId)
          .then((response) => {
            const data = response.data;
            dispatch(setBrokerInput(data.name?.trim()));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      dispatch(setBrokerInput(""));
    }
  };
  const setCustomerValue = (customerId) => {
    if (customerId) {
      let CustomerElement = customerData.find((state) => state.customerPK === customerId);

      if (CustomerElement !== undefined) {
        dispatch(setCustomerInput(CustomerElement.name));
      } else {
        DealerService.getCustomerById(customerId)
          .then((response) => {
            const data = response.data;
            dispatch(setCustomerInput(data.name));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      dispatch(setCustomerInput(""));
    }
  };

  const fetchCustomer = (string) => {
    setAutoCompleteLoading(true);
    DealerService.fetchCustomerAutoComplete(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response.data;
        const customersList = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomerData(customersList);
      })
      .catch((err) => {})
      .finally(() => {
        setAutoCompleteLoading(false);
      });
  };
  const handleCustomerLookupModalShow = () => {
    dispatch(setCustomerSelection(true));
  };
  const handleCustomerLookupSelection = (customer) => {
    dispatch(setCustomerInput(customer.name));
    dispatch(setCustomerId(customer.customerPK));

    dispatch(setCustomerSelection(false));
  };
  const hideCustomerModel = () => {
    dispatch(setCustomerSelection(false));
  };

  useEffect(() => {
    if (dealerData != null) {
      dispatch(setLastOrderDate(dealerData.lastOrderDate != null ? dealerData.lastOrderDate : ""));
      setExportBroker(dealerData.brokerfk !== null ? dealerData.brokerfk : "");
      dispatch(setBrokerId(dealerData.brokerfk?.exportBrokerPK || null));
      setBrokerValue(dealerData.brokerfk?.exportBrokerPK);
      setCustomerValue(dealerData.washCustomerfk);
      dispatch(setCustomerId(dealerData.washCustomerfk));
      setRvDealer(dealerData.rvDealer);
      dispatch(setFaxBolAtOrderEntry(dealerData.faxBolAtOrderEntry));
      dispatch(setFaxBolAtDispatch(dealerData.faxBolAtDispatch));
      setDoNotWash(dealerData.doNotWash);
      setCustomerWashOverride(dealerData.customerWashOverride);
      setPayCustomerForWash(dealerData.payCustomerForWash);
      setWashCustomer(dealerData.washCustomerfk);
      setClosedBeginDate(dealerData.closedBeginDate != null ? dealerData.closedBeginDate : "");
      setClosedEndDate(dealerData.closedEndDate != null ? dealerData.closedEndDate : "");
      setTwicRequired(dealerData.twicRequired !== null ? dealerData.twicRequired : "");
      setClosedNotes(dealerData.closedNotes !== null ? dealerData.closedNotes : "");
      setStoreCode(dealerData.storeCode != null ? dealerData.storeCode?.trim() : "");
      setHoldOutboundDispatches(dealerData.holdOutboundDispatches || false);
      setHoldReloadDispatches(dealerData.holdReloadDispatches || false);
      setHoldDispatchNotes(dealerData.holdDispatchNotes || "");
      setCanadianValid(dealerData.canadian || false);
    }
  }, [dealerData, viewDetail]);

  useEffect(() => {
    settingsTabFormData();
  }, [
    lastOrderDate,
    exportBroker,
    brokerId,
    customerId,
    rvDealer,
    twicrequired,
    faxBolAtOrderEntry,
    faxBolAtDispatch,
    doNotWash,
    customerWashOverride,
    payCustomerForWash,
    washCustomer,
    storecode,
    closedBeginDate,
    closedEndDate,
    closednotes,
    holdOutboundDispatches,
    holdReloadDispatches,
    holdDispatchNotes,
  ]);

  useEffect(() => {
    dispatch(setBeginDate(closedBeginDate));
    dispatch(setEndDate(closedEndDate));
  }, [closedBeginDate, closedEndDate]);
  useEffect(() => {
    if (!canadianValid) {
      dispatch(setBrokerInput(""));
    }
  }, [id, dealer, canadianValid]);

  useEffect(() => {
    if (!payCustomerForWash) {
      dispatch(setCustomerId(null));
      dispatch(setCustomerInput(""));
    }
  }, [payCustomerForWash]);

  useEffect(() => {
    if (dealer?.canadian) {
      setCanadianValid(true);
    } else {
      setCanadianValid(false);
    }
  }, [dealer, canadianValid]);

  useEffect(() => {
    if (faxBolAtDispatch || faxBolAtOrderEntry) {
      dispatch(setBolAtDispatchOrFaxBolAtOrderEntry(true));
    } else {
      dispatch(setBolAtDispatchOrFaxBolAtOrderEntry(false));
    }
  }, [faxBolAtDispatch, faxBolAtOrderEntry]);

  return (
    <div className="p-2 w-100">
      <Row className="m-0 p-0">
        {/* COL 1 */}
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.lastOrderDate")}
              </Form.Label>
            </Col>

            <Col xs={3} sm={3} md={3} className="p-0 " style={{ width: "95px" }}>
              {" "}
              <DateInputField
                date={lastOrderDate}
                name="lastOrderDate"
                className="customFormControl"
                setDate={(value) => dispatch(setLastOrderDate(value))}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.exportBroker")}
              </Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0 d-flex">
              <AutoCompleteDropdown
                className={`${
                  !viewDetail && dealer?.canadian
                    ? dealer?.canadian && !brokerId
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}

                arrayList={brokerData}
                searchString={brokerInput}
                handleSearchString={(string) => dispatch(setBrokerInput(string))}
                fetchDataBySearchString={fetchBroker}
                renderItemId={(broker) => broker.exportBrokerPK}
                renderItemField={(broker) => broker.name}
                onSelect={BrokerLookupSelection}
                selectedId={brokerId}
                disabled={viewDetail || !dealer?.canadian}
                loading={autoCompleteLoading}
                clearInputCallback={() => {
                  dispatch(setBrokerId(null));
                }}
              />
              <LookupButton
                onClick={handleBrokerLookupModelShow}
                disabled={viewDetail || !dealer?.canadian}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.rvDealer")}
              </Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="rvDealer"
                name="rvDealer"
                value={rvDealer}
                checked={rvDealer}
                disabled={viewDetail}
                onChange={(e) => setRvDealer(e.target.checked)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.twicRequired")}
              </Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="twicequired"
                name="twicequired"
                value={twicrequired}
                checked={twicrequired}
                disabled={viewDetail}
                onChange={(e) => setTwicRequired(e.target.checked)}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.orders.sub.tab.settings.fax.bol.at.order.entry.field")}
              </Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="faxBolAtOrderEntry"
                name="faxBolAtOrderEntry"
                value={faxBolAtOrderEntry}
                checked={faxBolAtOrderEntry}
                disabled={viewDetail}
                onChange={(e) => dispatch(setFaxBolAtOrderEntry(e.target.checked))} // Dispatch Redux action
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.faxBolAtDispatch")}
              </Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="faxBolAtDispatch"
                name="faxBolAtDispatch"
                value={faxBolAtDispatch}
                checked={faxBolAtDispatch}
                disabled={viewDetail}
                onChange={(e) => dispatch(setFaxBolAtDispatch(e.target.checked))} // Dispatch Redux action
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.doNotWash")}
              </Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="doNotWash"
                name="doNotWash"
                value={doNotWash}
                checked={doNotWash}
                disabled={viewDetail}
                onChange={(e) => setDoNotWash(e.target.checked)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.customerWashOverride")}
              </Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="customerWashOverride"
                name="customerWashOverride"
                value={customerWashOverride}
                checked={customerWashOverride}
                disabled={viewDetail}
                onChange={(e) => setCustomerWashOverride(e.target.checked)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className=" col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.payCustomerForWash")}
              </Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="payCustomerForWash"
                name="payCustomerForWash"
                value={payCustomerForWash}
                checked={payCustomerForWash}
                disabled={viewDetail}
                onChange={(e) => setPayCustomerForWash(e.target.checked)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.washCustomer")}
              </Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0 d-flex">
              <AutoCompleteDropdown
                className={`${
                  !viewDetail && payCustomerForWash
                    ? payCustomerForWash && !customerId
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                arrayList={customerData}
                searchString={customerInput}
                handleSearchString={(string) => dispatch(setCustomerInput(string))}
                fetchDataBySearchString={fetchCustomer}
                renderItemId={(customer) => customer.customerPK}
                renderItemField={(customer) => customer.name}
                onSelect={handleCustomerLookupSelection}
                selectedId={customerId}
                disabled={viewDetail || !payCustomerForWash}
                loading={autoCompleteLoading}
                clearInputCallback={() => {
                  dispatch(setCustomerId(null));
                }}
              />
              <LookupButton
                onClick={handleCustomerLookupModalShow}
                disabled={viewDetail || !payCustomerForWash}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.storeCode")}
              </Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <input
                type="text"
                className="customFormControl"
                id="storecode"
                name="storecode"
                value={storecode.toUpperCase()}

                maxLength={4}
                disabled={viewDetail}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => setStoreCode(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>

        {/* COL 2 */}
        <Col sm={6} md={6} lg={6} xl={6} xs={6} className="ps-lg-5">
          <Form.Group className="form-group mt-4 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Hold Outbound Dispatches</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="holdOutboundDispatches"
                name="holdOutboundDispatches"
                value={holdOutboundDispatches}
                checked={holdOutboundDispatches}
                disabled={viewDetail}
                onChange={(e) => setHoldOutboundDispatches(e.target.checked)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group mt-3  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Hold Reload Dispatches</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="holdReloadDispatches"
                name="holdReloadDispatches"
                value={holdReloadDispatches}
                checked={holdReloadDispatches}
                disabled={viewDetail}
                onChange={(e) => setHoldReloadDispatches(e.target.checked)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group mt-3  align-items-center row  m-l-0 m-r-0">
            <Col xs={12} sm={12} className="p-0">
              <Form.Label className="col-form-label dealer-label p-0 m-b-10">Hold Notes</Form.Label>
            </Col>
            <Col sm={12} md={10} className="p-0">
              <textarea
                rows={10}
                cols={50}
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "180px",
                  minWidth: "610px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                className="customFormControl h-100 textarea-height textAreaWidthTwoRow"
                id="holdNotes"
                name="holdNotes"
                value={holdDispatchNotes}
                disabled={viewDetail}
                onInput={(e) => setHoldDispatchNotes(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group mt-3  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.closedBeginDate")}
              </Form.Label>
            </Col>

            <Col xs={3} sm={3} md={3} className="p-0 m-l-15" style={{ width: "95px" }}>
              <DateInputField
                date={closedBeginDate}
                name="closedBeginDate"
                className={`customFormControl ${
                  !closeBeginDateValid ||
                  (closedEndDate !== null && closedEndDate?.length > 0 && closedBeginDate?.length < 1) ||
                  (closedBeginDate === null && closedEndDate !== null)
                    ? "borderRed"
                    : ""
                }`}
                setDate={setClosedBeginDate}
                max={closedEndDate ? parseLocalDate(closedEndDate) : ""}
                setIsDateValid={(value) => dispatch(setCloseBeginDateValid(value))}

                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group mt-3  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.dealer.page.settings.tab.closedEndDate")}
              </Form.Label>
            </Col>

            <Col xs={3} sm={3} md={3} className="p-0 m-l-15" style={{ width: "95px" }}>
              <DateInputField
                date={closedEndDate}
                name="closedEndDate"
                className={`customFormControl ${
                  !closeEndDateValid ||
                  (closedBeginDate !== null && closedBeginDate?.length > 0 && closedEndDate?.length < 1) ||
                  (closedBeginDate !== null && closedEndDate === null)
                    ? "borderRed"
                    : ""
                }`}
                setIsDateValid={(value) => dispatch(setCloseEndDateValid(value))}

                setDate={setClosedEndDate}
                disabled={viewDetail}
                min={closedBeginDate ? parseLocalDate(closedBeginDate) : ""}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group mt-3  align-items-center row  m-l-0 m-r-0">
            <Col xs={12} sm={12} className="p-0">
              <Form.Label className="col-form-label dealer-label p-0 m-b-10">
                {t("edit.dealer.page.settings.tab.closedNotes")}
              </Form.Label>
            </Col>
            <Col sm={12} md={10} className="p-0">
              <textarea
                rows={10}
                cols={50}
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "180px",
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
                id="closednotes"
                name="closednotes"
                value={closednotes}
                disabled={viewDetail}
                onInput={(e) => setClosedNotes(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <BrokerLookup
        brokerType={"export"}
        show={brokerSelection}
        onHide={hideBrokerModel}
        renderItemId={(broker) => broker.exportBrokerPK}
        renderItemField={(broker) => broker.name}
        handleLookupSelection={BrokerLookupSelection}
        MaintenanceProgram
      />
      <CustomerLookup
        show={customerSelection}
        onHide={hideCustomerModel}
        renderItemId={(customer) => customer.customerPK}
        renderItemField={(customer) => customer.name}
        handleLookupSelection={handleCustomerLookupSelection}
        MaintenanceProgram
      />
    </div>
  );
};

export default SettingsTab;
