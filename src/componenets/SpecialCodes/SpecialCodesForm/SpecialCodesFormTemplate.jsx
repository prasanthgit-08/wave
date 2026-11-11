import React from "react";
import SpecialCodesFormContent from "./SpecialCodesFormContent";
import SpecialCodesFormFooter from "./SpecialCodesFormFooter";
import SpecialCodesFormHeader from "./SpecialCodesFormHeader";
import QuarterScreen from "../../../styles/QuarterScreen.module.css";

function SpecialCodesFormTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <SpecialCodesFormHeader />
        <SpecialCodesFormContent />
        <SpecialCodesFormFooter />
      </div>
    </div>
  );
}
export default SpecialCodesFormTemplate;
