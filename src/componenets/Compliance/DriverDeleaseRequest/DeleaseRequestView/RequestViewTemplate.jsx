import React from "react";
import RequestViewHeader from "./RequestViewHeader";
import RequestViewContent from "./RequestViewContent";
import RequestViewFooter from "./RequestViewFooter";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";

function RequestViewTemplate() {
  return (
    <QuarterScreenWrapper>
      <RequestViewHeader />
      <RequestViewContent />
      <RequestViewFooter />
    </QuarterScreenWrapper>
  );
}

export default RequestViewTemplate;
