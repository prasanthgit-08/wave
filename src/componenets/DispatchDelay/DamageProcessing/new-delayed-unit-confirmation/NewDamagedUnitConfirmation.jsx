import React from "react";
import Header from "../../../common/Header";
import Content from "./Content";
import Footer from "./Footer";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import { useDispatch } from "react-redux";
import { resetUnitSelectionFilters } from "../../../../redux/EditMaster/UnitSelectionSlice";

const NewDelayedUnitConfirmation = (DelayedUnit) => {
  const dispatch = useDispatch();
  return (
    <QuarterScreenWrapper>
      <Header
        programName="Damage Processing"
        closeHandler={() => {
          dispatch(resetUnitSelectionFilters());
        }}
        closeNavigationURL="/delay-processing/delayed-unit-browse"
      />
      <Content />
      <Footer />
    </QuarterScreenWrapper>
  );
};

export default NewDelayedUnitConfirmation;
