import React from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";

import DpuInstructionsViewContent from "./DpuInstructionsViewContent";
import DpuInstructionsViewHeader from "./DpuInstructionsViewHeader";
import DpuInstructionsViewFooter from "./DpuInstructionsViewFooter";

function DpuInstructionsViewTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DpuInstructionsViewHeader />
        <DpuInstructionsViewContent />
        <DpuInstructionsViewFooter />
      </div>
    </div>
  );
}
export default DpuInstructionsViewTemplate;
