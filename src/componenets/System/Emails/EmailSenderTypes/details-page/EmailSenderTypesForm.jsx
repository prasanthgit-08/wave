import React from "react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import FormContent from "./FormContent";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";

const EmailSenderTypesForm = () => {
  return (
    <QuarterScreenWrapper>
      <FormHeader />
      <FormContent />
      <FormFooter />
    </QuarterScreenWrapper>
  );
};

export default EmailSenderTypesForm;
