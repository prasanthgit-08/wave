import React from "react";
import PortsOfEntryContent from "./PortsOfEntryContent";
import PortsOfEntryFooter from "./PortsOfEntryFooter";
import PortsOfEntryHeader from "./PortsOfEntryHeader";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";

function PortsOfEntryTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <PortsOfEntryHeader />
        <PortsOfEntryContent />
        <PortsOfEntryFooter />
      </div>
    </div>
  );
}

export default PortsOfEntryTemplate;
