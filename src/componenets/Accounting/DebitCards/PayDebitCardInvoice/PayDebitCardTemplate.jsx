import React from "react";
import PayDebitCardHeader from "./PayDebitCardHeader";
import PayDebitCardContent from "./PayDebitCardContent";
import DebitCardFooter from "./DebitCardFooter";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";

const PayDebitCardTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <PayDebitCardHeader />
      <PayDebitCardContent />
      <DebitCardFooter />
    </QuarterScreenWrapper>
  );
};

export default PayDebitCardTemplate;
