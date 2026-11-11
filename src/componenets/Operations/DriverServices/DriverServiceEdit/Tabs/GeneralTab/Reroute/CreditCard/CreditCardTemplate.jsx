import React from "react";
import Header from "../RerouteHeader";
import Footer from "../RerouteFooter";
import QuarterScreenWrapper from "../../../../../../../Templates/Screens/QuarterScreenWrapper";
import CreditCardContent from "./CreditCardContent";

function CreditCardTemplate() {
  return (
    <QuarterScreenWrapper>
      <Header />
      <CreditCardContent />
      <Footer />
    </QuarterScreenWrapper>
  );
}

export default CreditCardTemplate;
