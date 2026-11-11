import React, { useState } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import DriverRserveFooter from "./DriverRserveFooter";
import DriverRserveHeader from "./DriverRserveHeader";
import DriverRserveContent from "./DriverRserveContent";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";

function DriverRserveTemplate() {
  return (
    <QuarterScreenWrapper>
      <DriverRserveHeader />
      <DriverRserveContent />
      <DriverRserveFooter />
    </QuarterScreenWrapper>
  );
}

export default DriverRserveTemplate;
