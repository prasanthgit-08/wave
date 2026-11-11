import React from "react";
import ActivationDelayHeader from "./ActivationDelayHeader";
import ActivationDelayContent from "./ActivationDelayContent";
import ActivationDelayFooter from "./ActivationDelayFooter";

const ActivationDelayTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <ActivationDelayHeader />
        <ActivationDelayContent />
        <ActivationDelayFooter />
      </div>
    </div>
  );
};

export default ActivationDelayTemplate;
