import React from "react";
import Header from "../../../common/Header";
import FormContent from "./FormContent";
import CommonFooter from "../../../common/CommonFooter";

const DelayUnitBreakdownSettlement = () => {
  const buttons = [{ label: "Next", onClick: () => console.log("Next clicked"), disabled: false }];

  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header />
        <FormContent />
        <CommonFooter buttons={buttons} />
      </div>
    </div>
  );
};

export default DelayUnitBreakdownSettlement;
