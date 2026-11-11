import React from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import OptionScreenHeader from "../OptionScreenHeader";
import DriversFooter from "./DriversFooter";
import DriversContent from "./DriversContent";

const PrintCheckDriversTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <OptionScreenHeader />
      <DriversContent />
      <DriversFooter />
    </QuarterScreenWrapper>
  );
};

export default PrintCheckDriversTemplate;
