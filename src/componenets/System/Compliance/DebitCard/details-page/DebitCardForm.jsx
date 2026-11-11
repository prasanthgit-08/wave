import React from "react";
import DebitCardHeaders from "./DebitCardHeaders";
import DebitCardContent from "./DebitCardContent";
import DebitCardFooter from "./DebitCardFooter";

const DebitCardForm = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DebitCardHeaders />
        <DebitCardContent />
        <DebitCardFooter />
      </div>
    </div>
  );
};
export default DebitCardForm;
