import React from "react";
import SelectionPageHeader from "./SelectionPageHeader";
import SelectionPageContent from "./SelectionPageContent";
import SelectionPageFooter from "./SelectionPageFooter";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";

const SelectionPageTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <SelectionPageHeader />
      <SelectionPageContent />
      <SelectionPageFooter />
    </QuarterScreenWrapper>
  );
};

export default SelectionPageTemplate;
