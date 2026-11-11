import React from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import BulkEmailsHeader from "../BulkEmailsHeader";
import { BulkEmailsContent } from "./BulkEmailsContent";
import BulkEmailsFooter from "./BulkEmailsFooter";

const BulkEmailsScreenTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <BulkEmailsHeader />
      <BulkEmailsContent />
      <BulkEmailsFooter />
    </QuarterScreenWrapper>
  );
};

export default BulkEmailsScreenTemplate;
