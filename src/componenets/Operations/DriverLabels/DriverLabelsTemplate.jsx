import React from "react";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import DriverLabelsHeader from "./DriverLabelsHeader";
import DriverLabelsFooter from "./DriverLabelsFooter";
import DriverLabelsContent from "./DriverLabelsContent";

const DriverLabelsTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <DriverLabelsHeader />
      <DriverLabelsContent />
      <DriverLabelsFooter />
    </QuarterScreenWrapper>
  );
};

export default DriverLabelsTemplate;
