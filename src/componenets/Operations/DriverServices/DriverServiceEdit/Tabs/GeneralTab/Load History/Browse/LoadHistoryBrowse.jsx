import React from "react";
import LoadHistoryHeader from "./LoadHistoryHeader";
import LoadHistoryContent from "./LoadHistoryContent";
import LoadHistoryFooter from "./LoadHistoryFooter";

function LoadHistoryBrowse() {
  return (
    <div className="customMaintenanceFormWidthContainer">
      <div
        className="add-form-component customMaintenanceFormWidth   border border-dark border-2 "
        style={{ minWidth: "1800px" }}
      >
        <LoadHistoryHeader />
        <LoadHistoryContent />
        <LoadHistoryFooter />
      </div>
    </div>
  );
}

export default LoadHistoryBrowse;
