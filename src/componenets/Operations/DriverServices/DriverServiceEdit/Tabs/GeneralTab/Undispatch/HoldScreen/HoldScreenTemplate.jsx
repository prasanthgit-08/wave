import React from "react";
import UndispatchHeader from "../UndispatchHeader";
import UndispatchFooter from "../UndispatchFooter";
import HoldScreenContent from "./HoldScreenContent";
import HoldScreenFooter from "./HoldScreenFooter";

const HoldScreenTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <HoldScreenContent />
        <HoldScreenFooter />
      </div>
    </div>
  );
};

export default HoldScreenTemplate;
