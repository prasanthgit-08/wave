import React from "react";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import CheckPayToFormContent from "./CheckPayToFormContent";
import CheckPayToFormFooter from "./CheckPayToFormFooter";
import CheckPayToFormHeader from "./CheckPayToFormHeader";

const CheckPayToTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <CheckPayToFormHeader />
        <CheckPayToFormContent />
        <CheckPayToFormFooter />
      </div>
    </div>
  );
};

export default CheckPayToTemplate;
