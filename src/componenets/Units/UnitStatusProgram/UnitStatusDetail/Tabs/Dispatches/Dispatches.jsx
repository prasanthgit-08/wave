import React, { useState, useEffect } from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../../services/constants/applicationConstants";
import { setPageNumber } from "../../../../../../redux/CustomerPlantSearchFilterSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../../../OrderEntry/OrderEntry.module.css";
import General from "./Tabs/General";
import DriversPay from "./Tabs/DriversPay";
import Settings from "./Tabs/Settings";
import Dates from "./Tabs/Dates";
import Notes from "./Tabs/Notes";
import UnitStatusService from "../../../../../../services/Units/UnitStatusService";
import { setUnitRouteListingData } from "../../../../../../redux/UnitStatusSlice";

function Dispatches() {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("");
  const [tabData, setTabData] = useState({});
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
      case "Dispatches-General":
        return UnitStatusService.getUnitStatusDataForOpenBalance(
          selectedId,
          "Dispatches-General",
          0,
          7,
          "",
          false
        );

      case "Dispatches-DriversPay":
        return UnitStatusService.getUnitStatusData(selectedId, "Dispatches-DriversPay");
      case "Dispatches-Settings":
        return UnitStatusService.getUnitStatusData(selectedId, "Dispatches-Settings");
      case "Dispatches-Dates":
        return UnitStatusService.getUnitStatusData(selectedId, "Dispatches-Dates");
      case "Dispatches-Notes":
        return UnitStatusService.getUnitStatusData(selectedId, "Dispatches-Notes");

      default:
        console.warn("No service available for this tab:", tab);
        return Promise.resolve(null);
    }
  };

  useEffect(() => {
    if (activeTab === "Dispatches-General") {
      setActiveKey("general");
      handleTabServiceCall("unit")
        .then((data) => {
          setTabData({ unit: data });
        })
        .catch((error) => {
          console.error("Error fetching data for the initial tab:", error);
        });
    }
  }, [activeTab]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border" style={{ minHeight: "596px" }}>
        <Tabs activeKey={activeKey} onSelect={handleTabSelect}>
          {/* General Tab */}
          <Tab eventKey={"general"} title={"General"}>
            <General styles={styles} data={tabData["Dispatches-General"]} activeSubTab={activeKey} />
          </Tab>
          <Tab eventKey={"Dispatches-DriversPay"} title={"Drivers Pay"}>
            <DriversPay styles={styles} data={tabData["Dispatches-DriversPay"]} activeSubTab={activeKey} />
          </Tab>
          <Tab eventKey="Dispatches-Settings" title="Settings">
            <Settings styles={styles} data={tabData["Dispatches-Settings"]} activeSubTab={activeKey} />
          </Tab>
          <Tab eventKey={"Dispatches-Dates"} title={"Dates"}>
            <Dates styles={styles} data={tabData["Dispatches-Dates"]} activeSubTab={activeKey} />
          </Tab>
          <Tab eventKey={"Dispatches-Notes"} title={"Notes"}>
            <Notes styles={styles} data={tabData["Dispatches-Notes"]} activeSubTab={activeKey} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Dispatches;
