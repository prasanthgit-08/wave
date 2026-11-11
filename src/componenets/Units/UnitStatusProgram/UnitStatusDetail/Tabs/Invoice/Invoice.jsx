import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Header from "./Tabs/Header";
import Text from "./Tabs/Text";
import Detail from "./Tabs/Detail";
import { useSelector, useDispatch } from "react-redux";
import { setUnitRouteListingData } from "../../../../../../redux/UnitStatusSlice";
import UnitStatusService from "../../../../../../services/Units/UnitStatusService";
import styles from "../../../../../OrderEntry/OrderEntry.module.css";

function Invoice() {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("");
  const [tabData, setTabData] = useState({});
  const invoicePK = useSelector((state) => state.unitStatusReducer.invoicePK);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const handleTabSelect = (key) => {
    // Set the active tab key
    setActiveKey(key);

    // Fetch data only for the selected tab and reset the tabData state
    handleTabServiceCall(key)
      .then((data) => {
        // Update Redux store for "Unit Route" tab
        if (key === "UnitRoute") {
          dispatch(setUnitRouteListingData(data.data));
          // Dispatch the data to Redux
        }
        // Keep only the current tab's data
        setTabData({ [key]: data });
      })
      .catch((error) => {
        console.error(`Error fetching data for tab: ${key}`, error);
      });
  };

  const handleTabServiceCall = (tab) => {
    switch (tab) {
      case "header":
        return Promise.resolve(null);
      case "Invoices-Text":
        return Promise.resolve(null);
      case "Invoices-Detail":
        return Promise.resolve(null);

      default:
        console.warn("No service available for this tab:", tab);
        return Promise.resolve(null);
    }
  };

  useEffect(() => {
    if (activeTab === "invoice") {
      setActiveKey("header");
    }
  }, [activeTab]);

  return (
    <div className="p-2">
      <div
        // className="shadow-sm rounded border threeFourthScreenFormContentHeight" /* m-t-10 m-b-10 */
        className="shadow-sm rounded border"
        style={{ minHeight: "596px" }}
      >
        <Tabs activeKey={activeKey} onSelect={handleTabSelect}>
          {/* Unit Tab */}
          <Tab eventKey={"header"} title={"Header"}>
            <Header styles={styles} data={tabData["Invoices-Header"]} activeSubTab={activeKey} />
          </Tab>
          <Tab eventKey={"Invoices-Text"} title={"Text"}>
            <Text />
          </Tab>
          <Tab eventKey={"Invoices-Detail"} title={"Detail"}>
            <Detail styles={styles} data={tabData["Invoices-Detail"]} activeSubTab={activeKey} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Invoice;
