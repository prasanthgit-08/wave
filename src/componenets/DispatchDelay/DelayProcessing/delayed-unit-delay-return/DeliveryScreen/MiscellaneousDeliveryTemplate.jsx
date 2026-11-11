import React from "react";
import DelayReturnHeader from "../DelayReturnHeader";
import DeliveryContent from "./DeliveryContent";
import DeliveryFooter from "./DeliveryFooter";

const MiscellaneousDeliveryTemplate = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DelayReturnHeader />
        <DeliveryContent />
        <DeliveryFooter />
      </div>
    </div>
  );
};

export default MiscellaneousDeliveryTemplate;
