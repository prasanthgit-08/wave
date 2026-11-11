/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomerService from "../../../../services/CustomerService";
import InCompleteCustomerService from "../../../../services/InCompleteCustomerService";
import GeneralTabs from "./customer maintanance tabs/GeneralTab";
import BOLTextTabs from "./customer maintanance tabs/BolText";
import DetailSubTab from "./customer maintanance tabs/order sub tabs/DetailSubTab";
import SettingsSubTab from "./customer maintanance tabs/order sub tabs/SettingsSubTab";
import SettingsTabA from "./customer maintanance tabs/invoice sub tabs/SettingsTabA";
import SettingsTabB from "./customer maintanance tabs/invoice sub tabs/SettingsTabB";
import RatesTab from "./customer maintanance tabs/invoice sub tabs/RatesTab";
import PaymentsTab from "./customer maintanance tabs/invoice sub tabs/PaymentsTab";
import PaperworkTab from "./customer maintanance tabs/invoice sub tabs/Paperwork";
import StorageTab from "./customer maintanance tabs/StorageTab";
import DelayTabs from "./customer maintanance tabs/delays sub tabs/DelayTab";
import BreakdownTab from "./customer maintanance tabs/delays sub tabs/BreakdownTab";
import DamageTab from "./customer maintanance tabs/delays sub tabs/DamageTab";
import HotlineTab from "./customer maintanance tabs/delays sub tabs/HotlineTab";
import InvoiceGeneralSubTabs from "./customer maintanance tabs/invoice sub tabs/InvoiceGeneralSubTabs";
import {
  setViewDetail,
  setEditCustomerData,
  setIsCustomerLoading,
  setActiveTab,
} from "../../../../redux/CustomerMaintenanceSlice";
import DPUInstructionsTab from "./customer maintanance tabs/order sub tabs/DPUInstructionsTab";
import Projections from "./customer maintanance tabs/Projections";
import SubTabSettings from "./customer maintanance tabs/settings sub tabs/SubTabSettings";
import BondInfo from "./customer maintanance tabs/settings sub tabs/BondInfo";
import InstructionsTab from "./customer maintanance tabs/invoice sub tabs/InstructionsTab";
import MaintananceCondition from "./customer maintanance tabs/order sub tabs/MaintananceCondition";

function CustomerMaintananceFormContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const customerPk = params.id;
  const incompletecustomerPK = params.incompletecustomerPK;
  const pageNumber = params.pageNumber;

  const isGeneralTabValid = useSelector((state) => state.customerMaintenanceReducer.IsGeneralTabValid);
  const isSettingsTabValid = useSelector((state) => state.customerMaintenanceReducer.IsSettingsTabValid);
  const IsOrdersDetailsTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsOrdersDetailsTabValid
  );

  const settingNoValidation = useSelector((state) => state.customerMaintenanceReducer.settingNoValidation);
  const IsSettingsBondInfoValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsSettingsBondInfoValid
  );

  const IsOrdersSettingsTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsOrdersSettingsTabValid
  );

  const ordersSettingsTabInitialColor = useSelector(
    (state) => state.customerMaintenanceReducer.ordersSettingsTabInitialColor
  );

  const IsInvoiceGeneralTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceGeneralTabValid
  );

  const IsInvoiceRatesTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceRatesTabValid
  );

  const ratesTabInitialColor = useSelector((state) => state.customerMaintenanceReducer.ratesTabInitialColor);

  const IsInvoiceSettingsATabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceSettingsATabValid
  );
  const InvoiceSettingsATabNoValidation = useSelector(
    (state) => state.customerMaintenanceReducer.InvoiceSettingsATabNoValidation
  );
  const IsInvoiceSettingsBTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceSettingsBTabValid
  );

  const IsInvoicePaperworkTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoicePaperworkTabValid
  );

  const IsInvoiceStorageTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceStorageTabValid
  );
  const StorageInitailColor = useSelector((state) => state.customerMaintenanceReducer.StorageInitailColor);

  const IsDelaysDelayTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsDelaysDelayTabValid
  );

  const IsDelaysBreakdownTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsDelaysBreakdownTabValid
  );

  const IsDelaysDamageTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsDelaysDamageTabValid
  );

  const validInvoicePaymentTab = useSelector(
    (state) => state.customerMaintenanceReducer.validInvoicePaymentTab
  );

  const IsDelaysHotlineTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsDelaysHotlineTabValid
  );

  const delaysHotlineTabInitialColor = useSelector(
    (state) => state.customerMaintenanceReducer.delaysHotlineTabInitialColor
  );

  const StorageTabEnable = useSelector(
    (state) => state.customerMaintenanceReducer.storageInvoiceStorageUnits
  );

  const viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  const changesCancelled = useSelector((state) => state.customerMaintenanceReducer.changesCancelled);
  const isCustomerLoading = useSelector((state) => state.customerMaintenanceReducer.isCustomerLoading);
  const customerType = useSelector((state) => state.customerMaintenanceReducer.customerType);

  const [settingsSubTab, setSettingsSubTab] = useState("settings_sub");

  const handleTabSelect = (key) => {
    dispatch(setActiveTab(key));
  };

  // Bond Info is only reachable for Brokers; fall back to the Settings sub tab when it isn't.
  useEffect(() => {
    if (customerType !== "B") setSettingsSubTab("settings_sub");
  }, [customerType]);

  // A cancelled edit or a different record starts again on the Settings sub tab.
  useEffect(() => {
    setSettingsSubTab("settings_sub");
  }, [customerPk, incompletecustomerPK, changesCancelled]);

  useEffect(() => {
    if (params.id === undefined) dispatch(setViewDetail(false));
  }, [params.id]);

  useEffect(() => {
    if (window.location.pathname === "/add-customer/" + customerPk + "/" + pageNumber) {
      getCustomerById(customerPk);
    }
    if (window.location.pathname === "/add-incompleteCustomer/" + incompletecustomerPK + "/" + pageNumber) {
      getIncompleteCustomerById(incompletecustomerPK);
    }
  }, [incompletecustomerPK, customerPk, changesCancelled]);

  const getCustomerById = (id) => {
    if (id) {
      dispatch(setIsCustomerLoading(true));
      CustomerService.getCustomerMaintenanceData(id)
        .then((response) => {
          const data = response?.data;
          dispatch(setEditCustomerData(data));
          dispatch(setViewDetail(data?.readOnly));
          setTimeout(() => {
            dispatch(setIsCustomerLoading(false));
          }, 300);
        })
        .catch((error) => {
          navigate("/customer-browse-page");
          dispatch(setIsCustomerLoading(false));
        });
    }
  };

  const getIncompleteCustomerById = (id) => {
    if (id) {
      dispatch(setIsCustomerLoading(true));
      InCompleteCustomerService.getIncompleteCustomerById(id)
        .then((response) => {
          const data = response?.data;
          dispatch(setEditCustomerData(data));
          dispatch(setViewDetail(data?.readOnly));
          setTimeout(() => {
            dispatch(setIsCustomerLoading(false));
          }, 300);
        })
        .catch((error) => {
          dispatch(setIsCustomerLoading(false));
        });
    }
  };

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Tabs
          defaultActiveKey="general"
          id="uncontrolled-tab-example"
          className="m-b-2"
          onSelect={handleTabSelect}
        >
          <Tab
            tabClassName={
              isCustomerLoading || viewDetail ? "" : isGeneralTabValid ? "color-green" : "color-red"
            }
            eventKey="general"
            title={t("edit.dealer.page.general.tab.heading.general")}
          >
            <GeneralTabs />
          </Tab>

          <Tab
            eventKey="settings"
            title={t("edit.dealer.page.general.tab.heading.settings")}
            tabClassName={
              viewDetail || isCustomerLoading
                ? ""
                : isSettingsTabValid && (IsSettingsBondInfoValid || customerType !== "B")
                  ? "color-green"
                  : "color-red"
            }
          >
            <Tabs activeKey={settingsSubTab} onSelect={(key) => key && setSettingsSubTab(key)}>
              <Tab
                title="Settings"
                eventKey="settings_sub"
                tabClassName={
                  viewDetail || settingNoValidation ? "" : isSettingsTabValid ? "color-green" : "color-red"
                }
              >
                <SubTabSettings />
              </Tab>
              <Tab
                title="Bond Info"
                eventKey="bond_info"
                disabled={customerType !== "B"}
                tabClassName={
                  viewDetail || customerType !== "B"
                    ? ""
                    : IsSettingsBondInfoValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <BondInfo />
              </Tab>
            </Tabs>
          </Tab>

          <Tab eventKey="bol_text" title={t("edit.dealer.page.general.tab.heading.bol.text")}>
            <BOLTextTabs />
          </Tab>

          {/* Orders Tab */}
          <Tab
            eventKey="orders"
            title={t("customer.maintanance.tab.heading.orders")}
            tabClassName={
              isCustomerLoading
                ? ""
                : viewDetail
                  ? ""
                  : IsOrdersDetailsTabValid && IsOrdersSettingsTabValid
                    ? "color-green"
                    : "color-red"
            }
          >
            <Tabs defaultActiveKey="detail" id="uncontrolled-tab-example" className="m-b-10">
              <tab
                eventKey="detail"
                title={t("customer.maintanance.orders.tabs.sub.tabs.heading.details")}
                tabClassName={viewDetail ? "" : IsOrdersDetailsTabValid ? "color-green" : "color-red"}
              >
                <DetailSubTab />
              </tab>
              <tab
                eventKey="settings"
                title={t("customer.maintanance.orders.tabs.sub.tabs.heading.settings")}
                tabClassName={
                  viewDetail || ordersSettingsTabInitialColor
                    ? ""
                    : IsOrdersSettingsTabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <SettingsSubTab />
              </tab>
              <tab eventKey="dpuInstructions" title="DPU Instructions">
                <DPUInstructionsTab />
              </tab>
              <tab eventKey="conditions" title={"Conditions"}>
                <MaintananceCondition />
              </tab>
            </Tabs>
          </Tab>

          {/* Invoice Tab */}
          <Tab
            eventKey="invoice"
            title={t("customer.maintanance.tab.heading.invoice")}
            tabClassName={
              isCustomerLoading
                ? ""
                : viewDetail
                  ? ""
                  : IsInvoiceGeneralTabValid &&
                      IsInvoiceSettingsATabValid &&
                      (validInvoicePaymentTab === null || validInvoicePaymentTab) &&
                      (ratesTabInitialColor || IsInvoiceRatesTabValid) &&
                      IsInvoicePaperworkTabValid &&
                      IsInvoiceSettingsBTabValid
                    ? "color-green"
                    : "color-red"
            }
          >
            <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-10">
              <tab
                eventKey="general"
                title={t("edit.dealer.page.general.tab.heading.general")}
                tabClassName={viewDetail ? "" : IsInvoiceGeneralTabValid ? "color-green" : "color-red"}
              >
                <InvoiceGeneralSubTabs />
              </tab>
              <tab
                eventKey="settings a"
                title={t("customer.maintanance.invoice.tabs.sub.tabs.heading.settingsA")}
                tabClassName={
                  viewDetail || InvoiceSettingsATabNoValidation
                    ? ""
                    : IsInvoiceSettingsATabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <SettingsTabA />
              </tab>
              <tab
                eventKey="settings b"
                title={t("customer.maintanance.invoice.tabs.sub.tabs.heading.settingsB")}
                tabClassName={viewDetail ? "" : IsInvoiceSettingsBTabValid ? "color-green" : "color-red"}
              >
                <SettingsTabB />
              </tab>
              <tab
                eventKey="rates"
                title={t("customer.maintanance.invoice.tabs.sub.tabs.heading.rates")}
                tabClassName={
                  viewDetail || ratesTabInitialColor
                    ? ""
                    : IsInvoiceRatesTabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <RatesTab />
              </tab>
              <tab
                eventKey="payments"
                title={t("customer.maintanance.invoice.tabs.sub.tabs.heading.payments")}
                tabClassName={
                  viewDetail || validInvoicePaymentTab == null
                    ? ""
                    : validInvoicePaymentTab
                      ? "color-green"
                      : "color-red"
                }
              >
                <PaymentsTab />
              </tab>
              <tab
                eventKey="paperwork"
                title={t("customer.maintanance.invoice.tabs.sub.tabs.heading.paperwork")}
                tabClassName={viewDetail ? "" : IsInvoicePaperworkTabValid ? "color-green" : "color-red"}
              >
                <PaperworkTab />
              </tab>
              <tab eventKey="instructions" title={"Instructions"}>
                <InstructionsTab />
              </tab>
            </Tabs>
          </Tab>

          <Tab
            eventKey="storage"
            title={t("customer.maintanance.tab.heading.storage")}
            tabClassName={
              isCustomerLoading
                ? ""
                : viewDetail || StorageInitailColor
                  ? ""
                  : IsInvoiceStorageTabValid
                    ? "color-green"
                    : "color-red"
            }
            disabled={!viewDetail ? false : !StorageTabEnable}
          >
            {" "}
            <StorageTab />
          </Tab>

          {/* Delays Tab */}
          <Tab
            eventKey="delay"
            title={t("customer.maintanance.tab.heading.delays")}
            tabClassName={
              isCustomerLoading
                ? ""
                : viewDetail
                  ? ""
                  : IsDelaysDelayTabValid &&
                      IsDelaysBreakdownTabValid &&
                      IsDelaysDamageTabValid &&
                      (IsDelaysHotlineTabValid || delaysHotlineTabInitialColor)
                    ? "color-green"
                    : "color-red"
            }
          >
            <Tabs defaultActiveKey="delay" id="uncontrolled-tab-example" className="m-b-10">
              <tab
                eventKey="delay"
                title={t("customer.maintanance.delays.tabs.sub.tabs.heading.delay")}
                tabClassName={viewDetail ? "" : IsDelaysDelayTabValid ? "color-green" : "color-red"}
              >
                <DelayTabs />
              </tab>
              <tab
                eventKey="breakdown"
                title={t("customer.maintanance.delays.tabs.sub.tabs.heading.breakdown")}
                tabClassName={viewDetail ? "" : IsDelaysBreakdownTabValid ? "color-green" : "color-red"}
              >
                <BreakdownTab />
              </tab>
              <tab
                eventKey="damage"
                title={t("customer.maintanance.delays.tabs.sub.tabs.heading.damage")}
                tabClassName={viewDetail ? "" : IsDelaysDamageTabValid ? "color-green" : "color-red"}
              >
                <DamageTab />
              </tab>
              <tab
                eventKey="hotline"
                title={t("customer.maintanance.delays.tabs.sub.tabs.heading.hotline")}
                tabClassName={
                  viewDetail || delaysHotlineTabInitialColor
                    ? ""
                    : IsDelaysHotlineTabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <HotlineTab />
              </tab>
            </Tabs>
          </Tab>

          {/* Projections Tab */}
          <Tab eventKey="projections" title={"Projections"} tabClassName="">
            <Projections />
          </Tab>
        </Tabs>
        {isCustomerLoading && (
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
  );
}
export default CustomerMaintananceFormContent;
