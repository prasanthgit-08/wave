import React from "react";
import UndispatchHeader from "../UndispatchHeader";
import UndispatchFooter from "../UndispatchFooter";
import UnitConfirmationContent from "./UnitConfirmationContent";

const UnitConfirmationTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <UnitConfirmationContent />
        <UndispatchFooter />
      </div>
    </div>
  );
};

export default UnitConfirmationTemplate;
