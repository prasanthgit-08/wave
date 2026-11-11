import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { t } from "i18next";
import { useParams, useNavigate } from "react-router-dom";
import GeneralTabs from "./tabs/GeneralTabs";
import SettingsTab from "./tabs/SettingsTab";
import PickupLotTab from "./tabs/PickupLotTab";
import BOLTextTab from "./tabs/BOLTextTab";
import DetailSubTab from "./tabs/order-sub-tabs/DetailSubTab";
import SettingsSubTab from "./tabs/order-sub-tabs/SettingsSubTab";
import InvoiceFeesTab from "./tabs/invoice-sub-tabs/InvoiceFeesTab";
import InvoiceSettingsTab from "./tabs/invoice-sub-tabs/InvoiceSettingsTab";
import DelaysDamage from "./tabs/delay-sub-tabs/DelaysDamage";
import DelaysBreakdown from "./tabs/delay-sub-tabs/DelaysBreakdown";
import DelaysHotline from "./tabs/delay-sub-tabs/DelaysHotline";
import { useDispatch, useSelector } from "react-redux";
import DelayTab from "./tabs/delay-sub-tabs/DelayTab";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import InCompleteCustomerPlantService from "../../../../services/InCompleteCustomerPlantService";
import {
  setEditPlantData,
  setViewDetail,
  setSettingMotorized,
  setSettingTowable,
  setIsCustomerPlantLoading,
  setCustomerPlantSpecialCondition,
} from "../../../../redux/CustomerPlantMaintenanceSlice";
import CustomerSubTab from "./tabs/order-sub-tabs/CustomerSubTab";
import PlantConditions from "./tabs/order-sub-tabs/PlantConditions";
const CustomerPlantFormContent = () => {
  const params = useParams();
  const plantPK = params.id;
  const incompletePlantPK = params.incompleteplantPK;
  const customerId = params.customerId;
  const pageNumber = params.pageNumber;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const changesCancelled = useSelector((state) => state.customerPlantmaintanceReducer.changesCancelled);

  const [isLoading, setIsLoading] = useState(false);
  ////Tabs Validation
  const IsGeneralTabValid = useSelector((state) => state.customerPlantmaintanceReducer.IsGeneralTabValid);
  const IsSettingsTabValid = useSelector((state) => state.customerPlantmaintanceReducer.IsSettingsTabValid);
  const IsOrderDetailTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsOrderDetailTabValid
  );
  const IsOrderSettingTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsOrderSettingTabValid
  );
  const IsInvoiceSettingTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsInvoiceSettingTabValid
  );
  const IsDelaysDelayTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysDelayTabValid
  );
  const IsDelaysBreakdownTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysBreakdownTabValid
  );
  const IsDelaysDamageTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysDamageTabValid
  );
  const IsDelaysHotlineTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysHotlineTabValid
  );
  const IsInvoiceFeesTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsInvoiceFeesTabValid
  );
  const IsOrderSettingTabRequired = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsOrderSettingTabRequired
  );
  const IsInvoiceFeesTabRequired = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsInvoiceFeesTabRequired
  );
  const IsDelaysHotlineTabRequired = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysHotlineTabRequired
  );
  const IsPickupTabValid = useSelector((state) => state.customerPlantmaintanceReducer.IsPickupTabValid);
  const IsPickupTabRequired = useSelector((state) => state.customerPlantmaintanceReducer.IsPickupTabRequired);
  const IsCustomerOrderTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsCustomerOrderTabValid
  );
  const orderPlantCodeNew = useSelector((state) => state.customerPlantmaintanceReducer.orderPlantCodeNew);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  const settingInvoiceDpuPickup = useSelector(
    (state) => state.customerPlantmaintanceReducer.settingInvoiceDpuPickup
  );
  const isCustomerPlantLoading = useSelector(
    (state) => state.customerPlantmaintanceReducer.isCustomerPlantLoading
  );

  let settingLongUnitRestriction = useSelector(
    (state) => state.customerPlantmaintanceReducer.settingLongUnitRestriction
  );
  const isSettingPlantLoading = useSelector(
    (state) => state.customerPlantmaintanceReducer.isSettingPlantLoading
  );
  const isSettingLongUnitLoading = useSelector(
    (state) => state.customerPlantmaintanceReducer.isSettingLongUnitLoading
  );
  const isSettingQualifyingLongLoading = useSelector(
    (state) => state.customerPlantmaintanceReducer.isSettingQualifyingLongLoading
  );
  const orderEmailShuttleDelays = useSelector(
    (state) => state.customerPlantmaintanceReducer.orderEmailShuttleDelays
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.pathname === `/add-customer-plant/${customerId}/${pageNumber}/${plantPK}`) {
      getPlantById(plantPK);
    }
    if (
      window.location.pathname ===
      "/add-incomplete-customer-plant/" + customerId + "/" + pageNumber + "/" + incompletePlantPK
    ) {
      getincompletePlantById(incompletePlantPK);
    }
  }, [customerId, incompletePlantPK, pageNumber, plantPK]);

  const getPlantById = (id) => {
    if (id) {
      setLoading(true);
      dispatch(setIsCustomerPlantLoading(true));
      CustomerPlantMaintenanceService.getcompleteCustomerPlantsById(id)
        .then((response) => {
          //  dispatch(setIsLoading(true));
          const data = response.data;
          dispatch(setEditPlantData(data));
          dispatch(setViewDetail(true));
          dispatch(setSettingMotorized(data.motorized));
          dispatch(setSettingTowable(data.towable));
          dispatch(setCustomerPlantSpecialCondition(data?.ordersSpecialConditions));

          setLoading(false);
          setTimeout(() => {
            dispatch(setIsCustomerPlantLoading(false));
          }, 100);
        })
        .catch((error) => {
          navigate("/plant-browse-page/" + customerId + "/" + pageNumber);
          setLoading(false);
          dispatch(setIsCustomerPlantLoading(false));
        });
    }
  };

  const getincompletePlantById = (id) => {
    if (id) {
      setLoading(true);
      dispatch(setIsCustomerPlantLoading(true));
      InCompleteCustomerPlantService.getincompletePlantById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setEditPlantData(data));
          dispatch(setViewDetail(data.readOnly));
          dispatch(setSettingMotorized(data.motorized));
          dispatch(setSettingTowable(data.towable));
          setLoading(false);
          setTimeout(() => {
            dispatch(setIsCustomerPlantLoading(false));
          }, 100);
        })
        .catch((error) => {
          dispatch(setIsCustomerPlantLoading(false));
          setLoading(false);
          console.error("Failed to fetch Incomplete Plant");
        });
    }
  };

  useEffect(() => {
    if (params.id === undefined) dispatch(setViewDetail(false));
  }, [params.id]);

  useEffect(() => {
    if (customerId === null || viewDetail === undefined || viewDetail === false) {
      if (IsGeneralTabValid === true) {
        setGeneralTabColor("color-green");
      } else {
        setGeneralTabColor("color-red");
      }
    } else {
      setGeneralTabColor("");
    }
  }, [IsGeneralTabValid, viewDetail]);

  const [generalTabColor, setGeneralTabColor] = useState("");

  useEffect(() => {
    localStorage.setItem("recordKey", params.id);
  }, []);

  return (
    <div className="p-2">
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
          <Tab
            tabClassName={isCustomerPlantLoading ? "" : generalTabColor}
            eventKey="general"
            title={t("edit.customer.plant.page.tab.heading.general")}
          >
            <GeneralTabs />
          </Tab>
          <Tab
            eventKey="settings"
            title={t("edit.customer.plant.page.tab.heading.settings")}
            tabClassName={
              !viewDetail
                ? //|| isCustomerPlantLoading
                  IsSettingsTabValid ||
                  (IsSettingsTabValid &&
                    (isSettingLongUnitLoading || isSettingPlantLoading || isSettingQualifyingLongLoading))
                  ? settingInvoiceDpuPickup || settingLongUnitRestriction
                    ? "color-green"
                    : ""
                  : "color-red"
                : ""
            }
          >
            <SettingsTab />
          </Tab>
          <Tab eventKey="bol_text" title={t("edit.customer.plant.page.tab.heading.boltext")}>
            <BOLTextTab />
          </Tab>
          <Tab
            eventKey="orders"
            title={t("edit.customer.plant.page.tab.heading.orders")}
            tabClassName={
              viewDetail || isCustomerPlantLoading
                ? ""
                : IsOrderDetailTabValid && IsOrderSettingTabValid && IsCustomerOrderTabValid
                  ? "color-green"
                  : "color-red"
            }
          >
            <Tabs defaultActiveKey="detail" id="uncontrolled-tab-example" className="m-b-10">
              <tab
                eventKey="detail"
                title={t("edit.customer.plant.page.tab.heading.orders.detail")}
                tabClassName={
                  viewDetail || isCustomerPlantLoading
                    ? ""
                    : IsOrderDetailTabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <DetailSubTab />
              </tab>
              <tab
                eventKey="settings"
                title={t("edit.customer.plant.page.tab.heading.settings")}
                tabClassName={
                  viewDetail || isCustomerPlantLoading ? "" : IsOrderSettingTabValid ? "" : "color-red"
                }
              >
                <SettingsSubTab />
              </tab>
              <tab
                eventKey="customer"
                title={"Customer"}
                tabClassName={
                  !viewDetail || isCustomerPlantLoading
                    ? IsCustomerOrderTabValid
                      ? orderPlantCodeNew !== ""
                        ? "color-green"
                        : ""
                      : "color-red"
                    : ""
                }
              >
                <CustomerSubTab />
              </tab>
              <tab eventKey="conditions" title={"Conditions"}>
                <PlantConditions />
              </tab>
            </Tabs>
          </Tab>
          <Tab
            eventKey="invoice"
            title={t("customer.maintanance.tab.heading.invoice")}
            tabClassName={
              viewDetail || isCustomerPlantLoading
                ? ""
                : IsInvoiceSettingTabValid && IsInvoiceFeesTabValid
                  ? "color-green"
                  : "color-red"
            }
          >
            <Tabs defaultActiveKey="settings" id="uncontrolled-tab-example" className="m-b-10">
              <tab
                eventKey="settings"
                title={t("edit.customer.plant.page.tab.heading.settings")}
                tabClassName={
                  viewDetail || isCustomerPlantLoading
                    ? ""
                    : IsInvoiceSettingTabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <InvoiceSettingsTab />
              </tab>
              <tab
                eventKey="fees"
                title={t("edit.customer.plant.page.tab.heading.invoice.fees")}
                tabClassName={
                  !viewDetail || isCustomerPlantLoading
                    ? IsInvoiceFeesTabValid
                      ? IsInvoiceFeesTabRequired
                        ? "color-green"
                        : ""
                      : "color-red"
                    : ""
                }
              >
                <InvoiceFeesTab />
              </tab>
            </Tabs>
          </Tab>
          <Tab
            eventKey="delay"
            title={t("customer.maintanance.tab.heading.delays")}
            tabClassName={
              viewDetail || isCustomerPlantLoading
                ? ""
                : IsDelaysDelayTabValid &&
                    IsDelaysBreakdownTabValid &&
                    IsDelaysDamageTabValid &&
                    IsDelaysHotlineTabValid
                  ? "color-green"
                  : "color-red"
            }
          >
            <Tabs defaultActiveKey="delay" id="uncontrolled-tab-example" className="m-b-10">
              <tab
                eventKey="delay"
                title={t("customer.maintanance.delays.tabs.sub.tabs.heading.delay")}
                tabClassName={
                  viewDetail || isCustomerPlantLoading
                    ? ""
                    : IsDelaysDelayTabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <DelayTab />
              </tab>
              <tab
                eventKey="breakdown"
                title={t("customer.maintanance.delays.tabs.sub.tabs.heading.breakdown")}
                tabClassName={
                  viewDetail || isCustomerPlantLoading
                    ? ""
                    : IsDelaysBreakdownTabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <DelaysBreakdown />
              </tab>
              <tab
                eventKey="damage"
                title={t("customer.maintanance.delays.tabs.sub.tabs.heading.damage")}
                tabClassName={
                  viewDetail || isCustomerPlantLoading
                    ? ""
                    : IsDelaysDamageTabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <DelaysDamage />
              </tab>
              <tab
                eventKey="hotline"
                title={t("customer.maintanance.delays.tabs.sub.tabs.heading.hotline")}
                tabClassName={
                  !viewDetail || isCustomerPlantLoading
                    ? IsDelaysHotlineTabValid
                      ? IsDelaysHotlineTabRequired
                        ? "color-green"
                        : ""
                      : "color-red"
                    : ""
                }
              >
                <DelaysHotline />
              </tab>
            </Tabs>
          </Tab>
          <Tab
            eventKey="pickuplot"
            title={t("edit.customer.plant.page.tab.heading.pickupLot")}
            tabClassName={
              !viewDetail || isCustomerPlantLoading
                ? IsPickupTabValid
                  ? IsPickupTabRequired
                    ? ""
                    : ""
                  : "color-red"
                : ""
            }
          >
            <PickupLotTab />
          </Tab>
        </Tabs>
        {isLoading ? (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CustomerPlantFormContent;
