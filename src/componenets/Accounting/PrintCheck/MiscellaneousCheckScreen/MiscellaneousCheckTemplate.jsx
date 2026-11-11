import React from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import MiscellaneousCheckContent from "./MiscellaneousCheckContent";
import OptionScreenHeader from "../OptionScreenHeader";
import MiscellaneousCheckFooter from "./MiscellaneousCheckFooter";

const MiscellaneousCheckTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <OptionScreenHeader />
      <MiscellaneousCheckContent />
      <MiscellaneousCheckFooter />
    </QuarterScreenWrapper>
  );
};

export default MiscellaneousCheckTemplate;
