import { t } from "i18next";
import React, { useEffect, useState, useRef } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CustomerDelaerEditBolText from "./tabs/CustomerDelaerEditBolText";
import CustomerDelaerEditFlatRates from "./tabs/CustomerDelaerEditFlatRates";
import CustomerDelaerEditGeneral from "./tabs/CustomerDelaerEditGeneral";
import CustomerDelaerEditPOE from "./tabs/CustomerDelaerEditPOE";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomerDealersService from "../../../../services/CustomerDealersService";
import {
  setActiveTab,
  setAskPermits,
  setAskTolls,
  setAskWash,
  setBroker,
  setCustomerCity,
  setCustomerStateCode,
  setCustomerStoreCode,
  setData,
  setDealerCity,
  setDealerName,
  setDealerStateCode,
  setEditDetails,
  setFreezePOE,
  setIsCanadian,
  setSelectionGroup,
  setSelectionId,
  setSelectionName,
  setShowCommission,
} from "../../../../redux/EditCustomerDealerSlice";
import LoadingText from "../../../common/LoadingText";

function CustomerDelaerEditContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const [generalTabColor, setGeneralTabColor] = useState("");
  const [flatrateTabColor, setFlatRatesTabColor] = useState("");
  const [pOETabColor, setPOETabColor] = useState("");

  // Prevent duplicate API calls
  const dealerRequestRef = useRef(null);
  const customerDealerRequestRef = useRef(null);

  const id = params.dealerId;
  const selectionId = params.selectionId;
  const group = params.group;

  // Normalize Plant Group values
  const normalizedGroup = group === "PlantGroup" || group === "Plant-Group" ? "Plant Group" : group;

  const activeTab = useSelector((state) => state.editcustomerDealers.activeTab);

  const selectionGroup = useSelector((state) => state.editcustomerDealers.selectionGroup);

  const isCanadian = useSelector((state) => state.editcustomerDealers.isCanadian);

  const groupId = useSelector((state) => state.editcustomerDealers.selectionId);

  const validGeneralTab = useSelector((state) => state.editcustomerDealers.validGeneralTab);

  const validFlatratesTab = useSelector((state) => state.editcustomerDealers.validFlatratesTab);

  const validPOETab = useSelector((state) => state.editcustomerDealers.validPOETab);

  const editDetails = useSelector((state) => state.editcustomerDealers.editDetails);

  // Set the normalized selection group
  useEffect(() => {
    dispatch(setSelectionGroup(normalizedGroup));
  }, [normalizedGroup, dispatch]);

  useEffect(() => {
    if (editDetails) {
      if (validGeneralTab) {
        setGeneralTabColor("color-green");
      } else {
        setGeneralTabColor("color-red");
      }

      if (validFlatratesTab) {
        setFlatRatesTabColor("");
      } else {
        setFlatRatesTabColor("color-red");
      }

      if (isCanadian) {
        if (validPOETab) {
          setPOETabColor("color-green");
        } else {
          setPOETabColor("color-red");
        }
      } else {
        setPOETabColor("");
      }
    } else {
      setGeneralTabColor("");
      setPOETabColor("");
    }
  }, [isCanadian, validGeneralTab, editDetails, validPOETab, validFlatratesTab]);

  useEffect(() => {
    // Fetch dealer details only once for the same dealer ID
    if (dealerRequestRef.current !== id) {
      dealerRequestRef.current = id;

      CustomerDealersService.fetchDealerById(id).then(({ data }) => {
        dispatch(setDealerName(data?.name));
        dispatch(setIsCanadian(data?.canadian));
        dispatch(setBroker(data?.brokerfk));
        dispatch(setDealerStateCode(data?.stateCode));
        dispatch(setDealerCity(data?.city));
      });
    }

    // Wait until Redux has the normalized selection group
    if (!selectionGroup || selectionGroup !== normalizedGroup) {
      return;
    }

    if (window.location.pathname === "/edit-customer-dealer/" + group + "/" + id + "/" + selectionId) {
      // Unique key for the current API request
      const requestKey = `${normalizedGroup}-${selectionId}-${id}`;

      // Prevent duplicate fetchCustomerDealer calls
      if (customerDealerRequestRef.current !== requestKey) {
        customerDealerRequestRef.current = requestKey;

        setLoading(true);

        CustomerDealersService.fetchCustomerDealer(normalizedGroup, selectionId, id)
          .then((response) => {
            dispatch(setData(response?.data));

            if (normalizedGroup === "Customer") {
              dispatch(setAskPermits(response?.data?.askPermits));
              dispatch(setAskTolls(response?.data?.askTolls));
              dispatch(setAskWash(response?.data?.askWash));
              dispatch(setShowCommission(response?.data?.showCommision));
              dispatch(setSelectionName(response?.data?.customerName));
              dispatch(setSelectionId(response?.data?.customerId));
              dispatch(setFreezePOE(response?.data?.freezePOE));
              dispatch(setCustomerCity(response?.data?.customerCity));
              dispatch(setCustomerStateCode(response?.data?.customerStateCode));
              dispatch(setCustomerStoreCode(response?.data?.customerDealerCode));
            } else if (normalizedGroup === "Plant") {
              dispatch(setAskPermits(response?.data?.askPermits));
              dispatch(setAskTolls(response?.data?.askTolls));
              dispatch(setAskWash(response?.data?.askWash));
              dispatch(setShowCommission(response?.data?.showCommision));
              dispatch(setSelectionName(response?.data?.plantName));
              dispatch(setSelectionId(response?.data?.customerPlantId));
              dispatch(setFreezePOE(response?.data?.freezePOE));
              dispatch(setCustomerCity(response?.data?.customerCity));
              dispatch(setCustomerStateCode(response?.data?.customerStateCode));
              dispatch(setCustomerStoreCode(response?.data?.customerDealerCode));
            } else if (normalizedGroup === "Plant Group") {
              dispatch(setAskPermits(response?.data?.askPermits));
              dispatch(setAskTolls(response?.data?.askTolls));
              dispatch(setAskWash(response?.data?.askWash));
              dispatch(setShowCommission(response?.data?.showCommision));
              dispatch(setSelectionName(response?.data?.plantGroupDescription));
              dispatch(setSelectionId(response?.data?.customerPlantGroupId));
              dispatch(setFreezePOE(response?.data?.freezePOE));
              dispatch(setCustomerStoreCode(response?.data?.customerDealerCode));
            }

            setLoading(false);
          })
          .catch((error) => {
            customerDealerRequestRef.current = null;
            setLoading(false);
            navigate("/customer-dealers-browse/" + id + "/0");
          });
      }

      dispatch(setEditDetails(false));
    } else {
      dispatch(setEditDetails(true));

      if (isCanadian) {
      }

      if (groupId) {
        if (normalizedGroup === "Customer") {
          CustomerDealersService.fetchCustomerById(groupId).then((response) => {
            dispatch(setAskPermits(response?.data?.askPermits));
            dispatch(setAskTolls(response?.data?.askTolls));
            dispatch(setAskWash(response?.data?.askWash));
            dispatch(setShowCommission(response?.data?.showCommision));
            dispatch(setSelectionName(response?.data?.name));
            dispatch(setFreezePOE(response?.data?.freezePOE));
          });
        } else if (normalizedGroup === "Plant") {
          CustomerDealersService.fetchPlantById(groupId).then((response) => {
            dispatch(setAskPermits(response?.data?.askPermits));
            dispatch(setAskTolls(response?.data?.askTolls));
            dispatch(setAskWash(response?.data?.askWash));
            dispatch(setShowCommission(response?.data?.showCommision));
            dispatch(setSelectionName(response?.data?.plantName));
            dispatch(setFreezePOE(response?.data?.freezePOE));
          });
        } else if (normalizedGroup === "Plant Group") {
          CustomerDealersService.fetchPlantGroupById(groupId).then((response) => {
            dispatch(setAskPermits(response?.data?.askPermits));
            dispatch(setAskTolls(response?.data?.askTolls));
            dispatch(setAskWash(response?.data?.askWash));
            dispatch(setShowCommission(response?.data?.showCommision));
            dispatch(setSelectionName(response?.data?.plantGroupDescription));
            dispatch(setFreezePOE(response?.data?.freezePOE));
          });
        }
      } else {
        navigate("/add-customer-dealers/" + id + "/0");
      }
    }
  }, [selectionGroup, id, selectionId]);

  useEffect(() => {
    dispatch(setActiveTab("general"));
  }, []);

  return (
    <div className="p-2">
      {loading && (
        <div className="shadow-sm threeFourthScreenFormContentHeight rounded border ">
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <div className="shadow-sm threeFourthScreenFormContentHeight rounded border">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => dispatch(setActiveTab(k))}
            defaultActiveKey="general"
            id="uncontrolled-tab-example"
            className="m-b-2"
          >
            <Tab
              tabClassName={generalTabColor}
              eventKey="general"
              title={t("edit.dealer.page.general.tab.heading.general")}
            >
              <CustomerDelaerEditGeneral />
            </Tab>

            <Tab eventKey="flatrate" title={"Flat Rates"} tabClassName={flatrateTabColor}>
              <CustomerDelaerEditFlatRates />
            </Tab>

            <Tab eventKey="bol_text" title={t("edit.dealer.page.general.tab.heading.bol.text")}>
              <CustomerDelaerEditBolText />
            </Tab>

            <Tab eventKey="poe" title={"POE"} tabClassName={pOETabColor} disabled={!isCanadian}>
              <CustomerDelaerEditPOE />
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default CustomerDelaerEditContent;
