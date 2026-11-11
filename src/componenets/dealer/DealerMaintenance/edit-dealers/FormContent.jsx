import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import GeneralTabs from "./tabs/GeneralTabs";
import SettingsTab from "./tabs/SettingsTab";
import BOLTextTab from "./tabs/BOLTextTab";
import DriverTabs from "./tabs/DriverTabs";
import ResourcesTabs from "./tabs/ResourcesTabs";
import DeliveryTab from "./tabs/DeliveryTab";
import PickupTab from "./tabs/PickupTab";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import DealerService from "../../../../services/DealerService";
import InCompleteDealerService from "../../../../services/InCompleteDealerService";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditDealer,
  setIsDealerLoading,
  setLastOrderDate,
  setViewDetail,
} from "../../../../redux/EditDealerSlice";
import { useState } from "react";
import LoadingIcon from "../../../common/LoadingIcon";

function FormContent() {
  const params = useParams();
  const dealerPK = params.id;
  const navigate = useNavigate();

  const inCompleteDealerPK = params.inCompleteDealerPK;

  const pageNumber = params.pageNumber;

  const dispatch = useDispatch();

  const tabIsValid = useSelector((state) => state.editDealerReducer.tabIsValid);
  const deactivateLoader = useSelector((state) => state.editDealerReducer.deActivateLoader);
  const activateLoader = useSelector((state) => state.editDealerReducer.activateLoader);
  const deleteDealerLoader = useSelector((state) => state.editDealerReducer.deleteDealerLoader);

  const resourceTabValidation = useSelector((state) => state.editDealerReducer.isResourcesTabVaild);

  const pickupTabValidation = useSelector((state) => state.editDealerReducer.isPickUpTabVaild);

  const settingsTabValidation = useSelector((state) => state.editDealerReducer.isSettingsTabVaild);

  const deliveryTabValidation = useSelector((state) => state.editDealerReducer.isDeliveryTabVaild);

  const bolTextTabValidation = useSelector((state) => state.editDealerReducer.isBolTextTabVaild);

  const viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);

  const [tabColor, setTabColor] = useState("");

  const [resourceTabColor, setResourceTabColor] = useState("");

  const [pickupTabColor, setPickupTabColor] = useState("");

  const [deliveryTabColor, setDeliveryTabColor] = useState("");

  const [settingsTabColor, setSettingsTabColor] = useState("");
  const [isSettingsTabRequired, setIsSettingsTabRequired] = useState(false);

  const [bolTextTabColor, setBolTextTabColor] = useState("");
  const dealerGroupInput = useSelector((state) => state.editDealerReducer.dealerGroupInput);
  const dealerGroupId = useSelector((state) => state.editDealerReducer.dealerGroupId);
  const masterDealerGroupInput = useSelector((state) => state.editDealerReducer.masterDealerGroupInput);
  const masterDealerGroupId = useSelector((state) => state.editDealerReducer.masterDealerGroupId);
  const brokerInput = useSelector((state) => state.editDealerReducer.brokerInput);
  const brokerId = useSelector((state) => state.editDealerReducer.brokerId);
  const customerInput = useSelector((state) => state.editDealerReducer.customerInput);
  const customerId = useSelector((state) => state.editDealerReducer.customerId);
  const dealer = useSelector((state) => state.editDealerReducer.dealer);
  const isDealerLoading = useSelector((state) => state.editDealerReducer.isDealerLoading);
  const faxBolAtOrderEntry = useSelector((state) => state.editDealerReducer.faxBolAtOrderEntry);
  const faxBolAtDispatch = useSelector((state) => state.editDealerReducer.faxBolAtDispatch);
  const bolAtDispatchOrFaxBolAtOrderEntry = useSelector(
    (state) => state.editDealerReducer.bolAtDispatchOrFaxBolAtOrderEntry
  );
  const closeBeginDateValid = useSelector((state) => state.editDealerReducer.closeBeginDateValid);
  const closeEndDateValid = useSelector((state) => state.editDealerReducer.closeEndDateValid);

  useEffect(() => {
    if (dealerPK === null || viewDetail === undefined || viewDetail === false) {
      if (tabIsValid === true) {
        setTabColor("color-green");
      } else {
        setTabColor("color-red");
      }
      if ((dealer?.masterDealer && !masterDealerGroupId) || (!dealerGroupId && dealerGroupInput)) {
        setTabColor("color-red");
      }

      if (resourceTabValidation === true) {
        setResourceTabColor("");
      } else {
        setResourceTabColor("color-red");
      }

      if (pickupTabValidation === true) {
        setPickupTabColor("color-green");
      } else {
        setPickupTabColor("color-red");
      }
      if (deliveryTabValidation === true) {
        setDeliveryTabColor("color-green");
      } else {
        setDeliveryTabColor("color-red");
      }

      //Settings
      if (settingsTabValidation === true || isDealerLoading) {
        setSettingsTabColor("");
      } else {
        setSettingsTabColor("color-red");
      }

      if (dealer?.payCustomerForWash || dealer?.canadian) {
        setIsSettingsTabRequired(true);
      } else {
        setIsSettingsTabRequired(false);
      }

      if (bolTextTabValidation === true) {
        setBolTextTabColor("color-green");
      } else {
        setBolTextTabColor("color-red");
      }
    } else {
      setTabColor("");
      setSettingsTabColor("");
      setResourceTabColor("");
      setBolTextTabColor("");
      setPickupTabColor("");
      setDeliveryTabColor("");
    }
  }, [
    tabIsValid,
    resourceTabValidation,
    pickupTabValidation,
    settingsTabValidation,
    bolTextTabValidation,
    viewDetail,
    masterDealerGroupId,
    masterDealerGroupInput,
    dealerGroupId,
    dealerGroupInput,
    brokerInput,
    brokerId,
    customerInput,
    customerId,
    dealer,
    deliveryTabValidation,
  ]);

  useEffect(() => {
    if (window.location.pathname === "/add-dealer/" + dealerPK + "/" + pageNumber) {
      getDealerById(dealerPK);
    }
    if (window.location.pathname === "/add-incompleteDealer/" + inCompleteDealerPK + "/" + pageNumber) {
      getincompleteDealerById(inCompleteDealerPK);
    }
  }, [inCompleteDealerPK, dealerPK]);

  const getDealerById = (id) => {
    dispatch(setLastOrderDate(null));

    if (id) {
      dispatch(setIsDealerLoading(true));
      DealerService.getDealerById(id)
        .then((response) => {
          const data = response.data;
          // dispatch(setLastOrderDate(data?.lastOrderDate));

          dispatch(setEditDealer(data));

          dispatch(setViewDetail(data.readOnly));

          setTimeout(() => {
            dispatch(setIsDealerLoading(false));
          }, 300);
        })
        .catch((error) => {
          navigate("/dealers");
          console.log(error);
          dispatch(setIsDealerLoading(false));
        });
    }
  };

  const getincompleteDealerById = (id) => {
    if (id) {
      dispatch(setIsDealerLoading(true));
      InCompleteDealerService.getInCompleteDealerById(id)
        .then((response) => {
          const data = response.data;

          dispatch(setEditDealer(data));

          dispatch(setViewDetail(data.readOnly));
          setTimeout(() => {
            dispatch(setIsDealerLoading(false));
          }, 300);
        })
        .catch((error) => {
          dispatch(setIsDealerLoading(false));
        });
    }
  };

  useEffect(() => {
    localStorage.setItem("recordKey", dealerPK);
  }, []);
  return (
    <div className="p-2">
      {(isDealerLoading || deactivateLoader || activateLoader || deleteDealerLoader) && <LoadingIcon />}
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight" /* m-t-10 m-b-10 */>
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-0">
          <Tab
            tabClassName={
              viewDetail
                ? ""
                : (faxBolAtDispatch || faxBolAtOrderEntry) && (!dealer?.fax || dealer?.fax?.trim() === "")
                  ? "color-red"
                  : isDealerLoading
                    ? ""
                    : tabColor
            }
            eventKey="general"
            title={t("edit.dealer.page.general.tab.heading.general")}
          >
            <GeneralTabs />
          </Tab>

          <Tab
            tabClassName={
              viewDetail
                ? ""
                : isDealerLoading
                  ? ""
                  : !closeBeginDateValid || !closeEndDateValid
                    ? "color-red"
                    : isSettingsTabRequired
                      ? settingsTabValidation
                        ? "color-green"
                        : "color-red"
                      : settingsTabValidation
                        ? ""
                        : "color-red"
            }
            eventKey="settings"
            title={t("edit.dealer.page.general.tab.heading.settings")}
          >
            <SettingsTab />
          </Tab>

          <Tab
            tabClassName={viewDetail ? "" : isDealerLoading ? "" : bolTextTabColor}
            eventKey="bol_text"
            title={t("edit.dealer.page.general.tab.heading.bol.text")}
          >
            <BOLTextTab />
          </Tab>

          <Tab eventKey="Drivers" title={t("edit.dealer.page.general.tab.heading.drivers")}>
            <DriverTabs />
          </Tab>

          <Tab
            tabClassName={viewDetail ? "" : isDealerLoading ? "" : deliveryTabColor}
            eventKey="Delivery"
            title={t("edit.dealer.page.general.tab.heading.delivery")}
          >
            <DeliveryTab />
          </Tab>

          <Tab
            tabClassName={viewDetail ? "" : isDealerLoading ? "" : pickupTabColor}
            eventKey="Pickup"
            title={t("edit.dealer.page.general.tab.heading.pickup")}
          >
            <PickupTab />
          </Tab>

          <Tab
            tabClassName={viewDetail ? "" : isDealerLoading ? "" : resourceTabColor}
            eventKey="Resources"
            title={t("edit.dealer.page.general.tab.heading.resources")}
          >
            <ResourcesTabs />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
export default FormContent;
