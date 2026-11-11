import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import Shuttle from "./Tabs/Shuttle";
import Detail from "./Tabs/Detail";
import { setUnitRouteListingData } from "../../../../../../redux/UnitStatusSlice";
import UnitStatusService from "../../../../../../services/Units/UnitStatusService";
import styles from "../../../../../OrderEntry/OrderEntry.module.css";

function ShuttleTemplate({ data }) {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const [activeKey, setActiveKey] = useState("");
  const [tabData, setTabData] = useState({});
  const UnitShuttlePK = useSelector((state) => state.unitStatusReducer.UnitShuttlePK);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const unitShuttleDetailData = useSelector((state) => state.unitStatusReducer.unitShuttleDetailData);

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
      case "Shuttles-Shuttle":
        return UnitStatusService.getUnitStatusDataForOpenBalance(
          selectedId,
          "Shuttles-Shuttle",
          0,
          7,
          "",
          false
        );

      default:
        console.warn("No service available for this tab:", tab);
        return Promise.resolve(null);
    }
  };

  useEffect(() => {
    if (activeTab === "Shuttles-Shuttle") {
      setActiveKey("shuttle");
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
          {/* Unit Tab */}
          <Tab eventKey={"shuttle"} title={"Shuttle"}>
            <Shuttle styles={styles} data={tabData["Shuttles-Shuttle"]} activeSubTab={activeKey} />
          </Tab>

          <Tab eventKey={"Shuttles-Detail"} title={"Detail"} disabled={!unitShuttleDetailData}>
            <Detail activeSubTab={activeKey} />
            {/* <Detail  styles={styles} data={tabData["Shuttles-Detail"]}/> */}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ShuttleTemplate;
