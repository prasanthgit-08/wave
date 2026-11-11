import React from "react";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import EquipmentCheckHeader from "../EquipmentCheckHeader";
import EquipmenCheckOutViewContent from "./EquipmenCheckOutViewContent";
import EquipmentCheckoutViewFooter from "./EquipmentCheckoutViewFooter";
const EquipmentCheckOutViewTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EquipmentCheckHeader />
        <EquipmenCheckOutViewContent />
        <EquipmentCheckoutViewFooter />
      </div>
    </div>
  );
};

export default EquipmentCheckOutViewTemplate;
