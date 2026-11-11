import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Holds from "./Tabs/Holds";
import ShuttleDelay from "./Tabs/ShuttleDelay";
import DispatchDelay from "./Tabs/DispatchDelay";
import Canceled from "./Tabs/Canceled";
import { Tab, Tabs } from "react-bootstrap";
import UnitStatusService from "../../../../../../services/Units/UnitStatusService";

function DelayHolds() {
  const [activeKey, setActiveKey] = useState("");
  const [tabData, setTabData] = useState({});
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);

  const handleTabServiceCall = (tab) => {
    switch (tab) {
      case "Delay/Holds-Holds":
        return UnitStatusService.getUnitStatusDataForHolds(
          selectedId,
          "Delay/Holds-Holds",
          0,
          100,
          "",
          false
        );
      case "Delay/Holds-ShuttleDelays":
        return Promise.resolve(null);
      case "Delay/Holds-ActivationDelays":
        return UnitStatusService.getUnitStatusDataForPaginationAndSort(
          selectedId,
          "Delay/Holds-ActivationDelays",
          0,
          100,
          "",
          false
        );
      case "Delay/Holds-Canceled":
        return UnitStatusService.getUnitStatusDataForPaginationAndSort(
          selectedId,
          "Delay/Holds-Canceled",
          0,
          100,
          "",
          false
        );
      default:
        console.warn("No service available for this tab:", tab);
        return Promise.resolve(null);
    }
  };

  const handleTabSelect = (key) => {
    // Set the active tab key
    setActiveKey(key);

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
    if (selectedId && activeTab === "Delay/Holds-Holds") {
      setActiveKey("Delay/Holds-Holds");
    }
  }, [activeTab]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border" style={{ height: "596px" }}>
        <Tabs activeKey={activeKey} onSelect={handleTabSelect}>
          {/* Unit Tab */}
          <Tab eventKey={"Delay/Holds-Holds"} title={"Holds"}>
            <Holds data={tabData["Delay/Holds-Holds"]} activeSubTab={activeKey} />
          </Tab>
          <Tab eventKey={"Delay/Holds-ShuttleDelays"} title={"Shuttle Delay"}>
            <ShuttleDelay data={tabData["Delay/Holds-ShuttleDelays"]} activeSubTab={activeKey} />
          </Tab>
          <Tab eventKey={"Delay/Holds-ActivationDelays"} title={"Activation Delay"}>
            <DispatchDelay data={tabData["Delay/Holds-ActivationDelays"]} activeSubTab={activeKey} />
          </Tab>
          <Tab eventKey={"Delay/Holds-Canceled"} title={"Canceled"}>
            <Canceled data={tabData["Delay/Holds-Canceled"]} activeSubTab={activeKey} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default DelayHolds;
