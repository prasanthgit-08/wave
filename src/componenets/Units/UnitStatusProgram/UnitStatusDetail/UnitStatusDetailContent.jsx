import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import Unit from "./Tabs/Unit";
import styles from "../../../OrderEntry/OrderEntry.module.css";
import Customer from "./Tabs/Customer";
import MiscCustomer from "./Tabs/MiscCustomer";
import MiscPickup from "./Tabs/MiscPickup";
import MiscDelivery from "./Tabs/MiscDelivery";
import OverWidth from "./Tabs/OverWidth";
import UnitRoutes from "./Tabs/UnitRoutes";
import UnitLocation from "./Tabs/UnitLocation";
import DriveBys from "./Tabs/DriveBys";
import DelayHolds from "./Tabs/DelayHolds/DelayHolds";
import CreditCard from "./Tabs/CreditCard";
import OpenBalance from "./Tabs/OpenBalance";
import Contacts from "./Tabs/Contacts";
import Notes from "./Tabs/Notes";
import InvoiceHolds from "./Tabs/InvoiceHolds";
import Documents from "./Tabs/Documents";
import ReRoutes from "./Tabs/ReRoutes";
import Dispatches from "./Tabs/Dispatches/Dispatches";
import UnitStatusService from "../../../../services/Units/UnitStatusService";
import Invoice from "./Tabs/Invoice/Invoice";
import DriversPay from "./Tabs/DriversPay";
import ShuttleTemplate from "./Tabs/Shuttle/ShuttleTemplate";
import UnitChanges from "./Tabs/UnitCharges";
import { useParams } from "react-router-dom";
import {
  resetUnitSelectionFilters,
  resetUnitStatusInnerStates,
  setActiveTab,
  setCurrentStatus,
  setHasDriveBy,
  setIsCreditCardPrepaid,
  setIsOpenBalancePrepaid,
  setIsUnitTypeOverWidth,
  setMiscellaneousCustomer,
  setMiscellaneousDelivery,
  setMiscellaneousPickup,
  setSelectedId,
} from "../../../../redux/UnitStatus/UnitStatusSlice";
import { setId } from "../../../../redux/DealerSearchFilterSlice";
import { useNavigate } from "react-router-dom";
function UnitStatusDetailContent() {
  const [activeKey, setActiveKey] = useState("unit");
  const [tabData, setTabData] = useState({});
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const unitRoutePageNumber = useSelector((state) => state.UnitStatusSlice.unitRoutePageNumber);
  const unitRouteSortType = useSelector((state) => state.UnitStatusSlice.unitRouteSortType);
  const unitRouteSortValue = useSelector((state) => state.UnitStatusSlice.unitRouteSortValue);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);

  const isUnitTypeOverWidth = useSelector((state) => state.unitStatusReducer.isUnitTypeOverWidth);
  const isCreditCardPrepaid = useSelector((state) => state.unitStatusReducer.isCreditCardPrepaid);
  const isOpenBalancePrepaid = useSelector((state) => state.unitStatusReducer.isOpenBalancePrepaid);
  const hasDriveBy = useSelector((state) => state.unitStatusReducer.hasDriveBy);
  const miscellaneousCustomer = useSelector((state) => state.unitStatusReducer.miscellaneousCustomer);
  const miscellaneousPickup = useSelector((state) => state.unitStatusReducer.miscellaneousPickup);
  const miscellaneousDelivery = useSelector((state) => state.unitStatusReducer.miscellaneousDelivery);
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleTabSelect = (key) => {
    // Set the active tab key
    setActiveKey(key);
    dispatch(setActiveTab(key));
    // Fetch data only for the selected tab and reset the tabData state
    handleTabServiceCall(key)
      .then((data) => {
        // Update Redux store for "Unit Route" tab

        // Keep only the current tab's data
        setTabData({ [key]: data });
      })
      .catch((error) => {
        console.error(`Error fetching data for tab: ${key}`, error);
      });
  };

  useEffect(() => {
    dispatch(setSelectedId(id));
  }, [id]);

  const handleTabServiceCall = (tab) => {
    setLoader(true);

    let apiCall;
    if (id) {
      switch (tab) {
        case "unit":
          apiCall = UnitStatusService.getUnitStatusData(id, "unit");
          break;
        case "customer":
          apiCall = UnitStatusService.getUnitStatusData(id, "customer");
          break;
        case "miscCustomer":
          apiCall = UnitStatusService.getUnitStatusData(id, "miscCustomer");
          break;
        case "miscPickup":
          apiCall = UnitStatusService.getUnitStatusData(id, "MiscPickup");
          break;
        case "miscDelivery":
          apiCall = UnitStatusService.getUnitStatusData(id, "MiscDelivery");
          break;
        case "UnitRoute":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "OverWidth":
          apiCall = UnitStatusService.getUnitStatusData(id, "OverWidth");
          break;
        case "UnitLocations":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "DriveBys":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "CreditCard":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "OpenBalance":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "Contacts":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "Notes":
          apiCall = UnitStatusService.getUnitStatusData(id, "Notes");
          break;
        case "InvoiceHolds":
          apiCall = UnitStatusService.getUnitStatusData(id, "InvoiceHolds");
          break;
        case "Documents":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "Delay/Holds-Holds":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "UnitReroutes":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "Dispatches-General":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "Invoices-Header":
          apiCall = UnitStatusService.getUnitStatusDataForOpenBalance(id, "Invoices-Header", 0, 5, "", false);
          break;
        case "DriversPay":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "Shuttles-Shuttle":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        case "UnitNumberChanges":
          apiCall = Promise.resolve(null); // or any dummy data if needed
          break;
        default:
          console.warn("No service available for this tab:", tab);
          setLoader(false);
          return Promise.resolve(null);
      }
    }

    return apiCall.finally(() => {
      setLoader(false);
    });
  };

  useEffect(() => {
    if (id) {
      handleTabServiceCall("unit")
        .then((data) => {
          setTabData({ unit: data });
          dispatch(setCurrentStatus(data.data[0]?.CurrentStatus));
          dispatch(setIsUnitTypeOverWidth(data.data[0].OverWidthLoad));
          dispatch(setIsCreditCardPrepaid(data.data[0].CreditCardPrepaid));
          dispatch(setIsOpenBalancePrepaid(data.data[0].OpenBalancePrepaid));
          dispatch(setHasDriveBy(data.data[0].hasDriveBys));
          dispatch(setMiscellaneousCustomer(data.data[0].MiscellaneousCustomer));
          dispatch(setMiscellaneousPickup(data.data[0].miscellaneousPickup));
          dispatch(setMiscellaneousDelivery(data.data[0].miscellaneousDelivery));
        })
        .catch((error) => {
          console.error("Error fetching data for the initial tab:", error);
        });
    }
  }, [id]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Tabs activeKey={activeKey} onSelect={handleTabSelect}>
          <Tab eventKey="unit" title="Unit">
            <Unit styles={styles} data={tabData["unit"]} />
          </Tab>
          <Tab eventKey="customer" title="Customer">
            <Customer styles={styles} data={tabData["customer"]} />
          </Tab>
          <Tab eventKey={"miscCustomer"} title={"Misc Customer"} disabled={!miscellaneousCustomer}>
            <MiscCustomer styles={styles} data={tabData["miscCustomer"]} />
          </Tab>
          <Tab eventKey={"miscPickup"} title={"Misc Pickup"} disabled={!miscellaneousPickup}>
            <MiscPickup data={tabData["miscPickup"]} />
          </Tab>
          <Tab eventKey={"miscDelivery"} title={"Misc Delivery"} disabled={!miscellaneousDelivery}>
            <MiscDelivery styles={styles} data={tabData["miscDelivery"]} />
          </Tab>
          <Tab eventKey="OverWidth" title="Over Width" disabled={!isUnitTypeOverWidth}>
            <OverWidth styles={styles} data={tabData["OverWidth"]} />
          </Tab>
          <Tab eventKey={"UnitRoute"} title={"Unit Route"}>
            <UnitRoutes styles={styles} data={tabData["UnitRoute"]} />
          </Tab>
          <Tab eventKey="UnitLocations" title="Unit Location">
            <UnitLocation styles={styles} data={tabData["UnitLocations"]} />
          </Tab>
          <Tab eventKey={"DriveBys"} title={"Drive By's"} disabled={!hasDriveBy}>
            <DriveBys styles={styles} data={tabData["DriveBys"]} />
          </Tab>
          <Tab eventKey={"Delay/Holds-Holds"} title={"Delay Holds"}>
            <DelayHolds styles={styles} data={tabData["Delay/Holds-Holds"]} />
          </Tab>
          <Tab eventKey={"CreditCard"} title={" Credit Cards"} disabled={!isCreditCardPrepaid}>
            <CreditCard styles={styles} data={tabData["CreditCard"]} />
          </Tab>
          <Tab eventKey={"OpenBalance"} title={" Open Balance"} disabled={!isOpenBalancePrepaid}>
            <OpenBalance styles={styles} data={tabData["OpenBalance"]} />
          </Tab>
          <Tab eventKey={"Contacts"} title={" Contacts"}>
            <Contacts styles={styles} data={tabData["Contacts"]} />
          </Tab>
          <Tab eventKey={"Notes"} title={" Notes"}>
            <Notes styles={styles} data={tabData["Notes"]} />
          </Tab>
          <Tab eventKey={"InvoiceHolds"} title={" Invoice Hold"}>
            <InvoiceHolds styles={styles} data={tabData["InvoiceHolds"]} />
          </Tab>
          <Tab eventKey={"Documents"} title={"Documents"}>
            <Documents styles={styles} data={tabData["Documents"]} />
          </Tab>
          <Tab eventKey={"UnitReroutes"} title={"Reroutes"}>
            <ReRoutes data={tabData["UnitReroutes"]} />
          </Tab>
          <Tab eventKey={"Dispatches-General"} title={"Dispatches"}>
            <Dispatches styles={styles} data={tabData["Dispatches-General"]} />
          </Tab>

          <Tab eventKey={"invoice"} title={"Invoice"}>
            <Invoice styles={styles} data={tabData["Invoices-Header"]} />
          </Tab>

          <Tab eventKey={"DriversPay"} title={"Drivers Pay"}>
            <DriversPay styles={styles} data={tabData["DriversPay"]} />
          </Tab>

          <Tab eventKey={"Shuttles-Shuttle"} title={"Shuttle"}>
            <ShuttleTemplate styles={styles} data={tabData["Shuttles-Shuttle"]} />
          </Tab>
          <Tab eventKey={"UnitNumberChanges"} title={"Unit Number Changes"}>
            <UnitChanges styles={styles} data={tabData["UnitNumberChanges"]} />
          </Tab>
          {/*
          
          */}
        </Tabs>
        {loader && (
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

export default UnitStatusDetailContent;
