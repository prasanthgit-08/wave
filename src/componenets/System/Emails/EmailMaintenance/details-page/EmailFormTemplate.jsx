import React from "react";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
const EmailFormTemplate = () => {
  return (
    <div className={`add-form-component p-0 ${QuarterScreen.container}`}>
      <div className={`border border-dark border-2 ${QuarterScreen.width}`} style={{ margin: "1px" }}>
        <FormHeader />
        <FormContent />
        <FormFooter />
      </div>
    </div>
  );
};

export default EmailFormTemplate;
