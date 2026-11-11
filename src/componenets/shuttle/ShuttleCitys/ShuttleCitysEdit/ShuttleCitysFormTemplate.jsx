import React from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import ShuttleCitysFormFooter from "./ShuttleCitysFormFooter";
import ShuttleCitysFormContent from "./ShuttleCitysFormContent";
import ShuttleCitysFormHeader from "./ShuttleCitysFormHeader";
const ShuttleCitysFormTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <ShuttleCitysFormHeader />
        <ShuttleCitysFormContent />
        <ShuttleCitysFormFooter />
      </div>
    </div>
  );
};

export default ShuttleCitysFormTemplate;
