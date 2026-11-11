import React from "react";
import DriverTMRLogsHeader from "./DriverTMRLogsHeader";
import DriverTMRLogsContent from "./DriverTMRLogsContent";
import DriverTMRLogsFooter from "./DriverTMRLogsFooter";

function DriverTMRLogsTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DriverTMRLogsHeader />
        <DriverTMRLogsContent />
        <DriverTMRLogsFooter />
      </div>
    </div>
  );
}
export default DriverTMRLogsTemplate;
