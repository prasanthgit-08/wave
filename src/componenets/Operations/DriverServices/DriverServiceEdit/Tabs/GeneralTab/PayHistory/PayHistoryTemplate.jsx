import React from "react";
import PayHistoryHeader from "./Tabs/PayHistoryHeader";
import DriverPayHistoryBrowsePage from "./DriverPayHistoryBrowsePage";
import PayHistoryFooter from "./Tabs/PayHistoryFooter";

const PayHistoryTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <PayHistoryHeader />
        <DriverPayHistoryBrowsePage />
        <PayHistoryFooter />
      </div>
    </div>
  );
};

export default PayHistoryTemplate;
