import React from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import BulkEmailsHeader from "../BulkEmailsHeader";
import EmailTextScreenFooter from "./EmailTextScreenFooter";
import EmailTextScreenContent from "./EmailTextScreenContent";

const EmailTextScreenTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <BulkEmailsHeader />
      <EmailTextScreenContent />
      <EmailTextScreenFooter />
    </QuarterScreenWrapper>
  );
};

export default EmailTextScreenTemplate;
