import React from "react";
import DelayReturnHeader from "../DelayReturnHeader";
import PickupContent from "./PickupContent";
import PickupFooter from "./PickupFooter";

const DelayPickupTemplate = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DelayReturnHeader />
        <PickupContent />
        <PickupFooter />
      </div>
    </div>
  );
};

export default DelayPickupTemplate;
