import React from "react";
import QuarterScreen from "../../../../../../../styles/QuarterScreen.module.css";
import FormHeader from "./FormHeader";
import SettlementFormContent from "./SettlementFormContent";
import FormFooter from "./FormFooter";

const SettlementFormTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        <SettlementFormContent QuarterScreen={QuarterScreen} />
        <FormFooter />
      </div>
    </div>
  );
};

export default SettlementFormTemplate;
