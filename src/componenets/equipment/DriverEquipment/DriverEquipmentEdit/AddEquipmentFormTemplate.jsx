import React from "react";
import styles from "../../../../styles/QuarterScreen.module.css";
import AddEquipmentFooter from "./AddEquipmentFooter";
import AddEquipmentHeader from "./AddEquipmentHeader";
import AddEquipmentContent from "./AddEquipmentContent";

function AddEquipmentFormTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <AddEquipmentHeader />
        <AddEquipmentContent styles={styles} />
        <AddEquipmentFooter />
      </div>
    </div>
  );
}

export default AddEquipmentFormTemplate;
