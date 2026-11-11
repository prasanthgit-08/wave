import React from "react";
import HalfScreenWrapper from "../../../../../../../Templates/Screens/HalfScreenWrapper";
import PickupHeader from "./PickupHeader";
import PickupFooter from "./PickupFooter";
import PickupContent from "./PickupContent";

const PickupTemplate = () => {
  return (
    <HalfScreenWrapper>
      <PickupHeader />
      <PickupContent />
      <PickupFooter />
    </HalfScreenWrapper>
  );
};

export default PickupTemplate;
