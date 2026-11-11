import React from "react";
import UndispatchHeader from "../UndispatchHeader";
import ActivationDelayContent from "./ActivationDelayContent";
import ActivationDelayFooter from "./ActivationDelayFooter";

const ActivationDelaysTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <ActivationDelayContent />
        <ActivationDelayFooter />
      </div>
    </div>
  );
};

export default ActivationDelaysTemplate;
