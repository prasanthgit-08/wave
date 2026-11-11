import React from "react";
import DpuInstructionsSelectionContent from "./DpuInstructionsSelectionContent";
import DpuInstructionsSelectionHeader from "./DpuInstructionsSelectionHeader";
import DpuInstructionsSelectionFooter from "./DpuInstructionsSelectionFooter";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";

function DpuInstructionsSelectionTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DpuInstructionsSelectionHeader />
        <DpuInstructionsSelectionContent />
        <DpuInstructionsSelectionFooter />
      </div>
    </div>
  );
}
export default DpuInstructionsSelectionTemplate;
