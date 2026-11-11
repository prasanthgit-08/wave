import React from "react";
import styles from "../../../../../../../styles/QuarterScreen.module.css";
import DriverFlashHeader from "./DriverFlashHeader";
import DriverFlashContent from "./DriverFlashContent";
import DriverFlashFooter from "./DriverFlashFooter";
function DriverFlashTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DriverFlashHeader styles={styles} />
        <DriverFlashContent styles={styles} />
        <DriverFlashFooter styles={styles} />
      </div>
    </div>
  );
}
export default DriverFlashTemplate;
