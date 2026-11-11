import React from "react";
import EquipmentContent from "./EquipmentContent";
import EquipmentFooter from "./EquipmentFooter";
import EquipmentHeader from "./EquipmentHeader";
import styles from "../../../styles/QuarterScreen.module.css";

function EquipmentFormTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EquipmentHeader />
        <EquipmentContent styles={styles} />
        <EquipmentFooter />
      </div>
    </div>
  );
}

export default EquipmentFormTemplate;
