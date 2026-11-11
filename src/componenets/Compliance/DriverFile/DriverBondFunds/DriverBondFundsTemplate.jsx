import React from "react";
import DriverBondFundHeader from "./DriverBondFundHeader";
import DriverBondFundContent from "./DriverBondFundContent";
import DriverBondFundFooter from "./DriverBondFundFooter";

const DriverBondFundsTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DriverBondFundHeader />
        <DriverBondFundContent />
        <DriverBondFundFooter />
      </div>
    </div>
  );
};

export default DriverBondFundsTemplate;
