import React from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import OptionScreenHeader from "../OptionScreenHeader";
import CheckStubFooter from "./CheckStubFooter";
import CheckStubContent from "./CheckStubContent";
import HalfScreenWrapper from "../../../Templates/Screens/HalfScreenWrapper";

const CheckStubTemplate = () => {
  return (
    <HalfScreenWrapper>
      <OptionScreenHeader />
      <CheckStubContent />
      <CheckStubFooter />
    </HalfScreenWrapper>
  );
};

export default CheckStubTemplate;
