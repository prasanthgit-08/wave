import React from "react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import FormContent from "./FormContent";
import EmailRecipientsContent from "./EmailRecipientsContent";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
const RecipientsTemplate = () => {
  return (
    <div className={`add-form-component p-0 ${QuarterScreen.container}`}>
      <div className={`border border-dark border-2 ${QuarterScreen.width}`} style={{ margin: "1px" }}>
        <FormHeader />
        <EmailRecipientsContent />
        <FormFooter />
      </div>
    </div>
  );
};

export default RecipientsTemplate;
