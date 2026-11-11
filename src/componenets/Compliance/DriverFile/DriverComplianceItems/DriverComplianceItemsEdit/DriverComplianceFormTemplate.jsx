import React, { useState } from "react";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import FormContent from "./FormContent";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
const DriverComplianceFormTemplate = () => {
  const [check, setCheck] = useState(false); // temperory bug fix
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        <FormContent QuarterScreen={QuarterScreen} check={check} />
        <FormFooter setCheck={setCheck} />
      </div>
    </div>
  );
};

export default DriverComplianceFormTemplate;
