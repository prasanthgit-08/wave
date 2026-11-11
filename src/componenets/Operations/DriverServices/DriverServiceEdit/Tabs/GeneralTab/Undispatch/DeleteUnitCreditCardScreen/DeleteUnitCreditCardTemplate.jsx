import React from "react";
import UndispatchHeader from "../UndispatchHeader";
import DeleteUnitCreditCardContent from "./DeleteUnitCreditCardContent";
import DeleteUnitCreditCardFooter from "./DeleteUnitCreditCardFooter";

const DeleteUnitCreditCardTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <DeleteUnitCreditCardContent />
        <DeleteUnitCreditCardFooter />
      </div>
    </div>
  );
};

export default DeleteUnitCreditCardTemplate;
