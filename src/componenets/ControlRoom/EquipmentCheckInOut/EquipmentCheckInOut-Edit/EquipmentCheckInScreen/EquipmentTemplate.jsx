import React from "react";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import EquipmentCheckHeader from "../EquipmentCheckHeader";
import EquipmentCheckContent from "./EquipmentCheckContent";
import EquipmentCheckinFooter from "./EquipmentCheckinFooter";

const EquipmentTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EquipmentCheckHeader />
        <EquipmentCheckContent />
        <EquipmentCheckinFooter />
      </div>
    </div>
  );
};

export default EquipmentTemplate;
