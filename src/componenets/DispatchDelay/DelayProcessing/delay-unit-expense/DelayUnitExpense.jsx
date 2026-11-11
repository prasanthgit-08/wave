import React from "react";
import DelayUnitExpenseHeader from "./DelayUnitExpenseHeader";
import DelayUnitExpenseFooter from "./DelayUnitExpenseFooter";
import DelayUnitExpenseContent from "./DelayUnitExpenseContent";
import HalfScreenWrapper from "../../../Templates/Screens/HalfScreenWrapper";

const DelayUnitExpense = () => {
  return (
    <HalfScreenWrapper>
      <DelayUnitExpenseHeader />
      <DelayUnitExpenseContent />
      <DelayUnitExpenseFooter />
    </HalfScreenWrapper>
  );
};

export default DelayUnitExpense;
