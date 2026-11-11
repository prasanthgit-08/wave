import React from "react";
import DispatchDetailHeader from "./DispatchDetailHeader";
import DispatchDetailFooter from "./DispatchDetailFooter";
import DispatchDetailContent from "./DispatchDetailContent";
import ThreeFourthScreenWrapper from "../../../../../../../Templates/Screens/ThreeFourthScreenWrapper";

const DispatchDetailTemplate = () => {
  return (
    <ThreeFourthScreenWrapper>
      <DispatchDetailHeader />
      <DispatchDetailContent />
      <DispatchDetailFooter />
    </ThreeFourthScreenWrapper>
  );
};

export default DispatchDetailTemplate;
