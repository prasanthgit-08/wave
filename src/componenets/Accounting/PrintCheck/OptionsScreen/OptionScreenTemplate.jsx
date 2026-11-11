import React from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import OptionScreenHeader from "../OptionScreenHeader";
import OptionScreenFooter from "./OptionScreenFooter";
import OptionScreenContent from "./OptionScreenContent";

const OptionScreenTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <OptionScreenHeader />
      <OptionScreenContent />
      <OptionScreenFooter />
    </QuarterScreenWrapper>
  );
};

export default OptionScreenTemplate;
