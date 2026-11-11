import React from "react";
import UndispatchHeader from "../UndispatchHeader";
import EquipmentReturnContent from "./EquipmentReturnContent";
import EquipmentReturnFooter from "./EquipmentReturnFooter";

const EquipmentReturnTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <EquipmentReturnContent />
        <EquipmentReturnFooter />
      </div>
    </div>
  );
};

export default EquipmentReturnTemplate;
