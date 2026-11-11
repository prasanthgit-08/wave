import React from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import OptionScreenHeader from "../OptionScreenHeader";
import TransportCompanyContent from "./TransportCompanyContent";
import TransportCompanyFooter from "./TransportCompanyFooter";

const TransportCompanyTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <OptionScreenHeader />
      <TransportCompanyContent />
      <TransportCompanyFooter />
    </QuarterScreenWrapper>
  );
};

export default TransportCompanyTemplate;
