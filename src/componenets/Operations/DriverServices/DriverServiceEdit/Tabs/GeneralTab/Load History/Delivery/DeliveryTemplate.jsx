import React from "react";
import PropTypes from "prop-types";
import ThreeFourthScreenWrapper from "../../../../../../../Templates/Screens/ThreeFourthScreenWrapper";
import DeliveryHeader from "./DeliveryHeader";
import DeliveryContent from "./DeliveryContent";
import DeliveryFooter from "./DeliveryFooter";

const DeliveryTemplate = (props) => {
  return (
    <ThreeFourthScreenWrapper>
      <DeliveryHeader />
      <DeliveryContent />
      <DeliveryFooter />
    </ThreeFourthScreenWrapper>
  );
};

export default DeliveryTemplate;
