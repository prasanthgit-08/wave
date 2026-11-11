import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../../common/Header";
import UnitDamageDetailsContent from "./UnitDamageDetailsContent";
import FooterDamage from "./FooterDamage";
import { resetUnitSelectionFilters } from "../../../../redux/EditMaster/UnitSelectionSlice";

const UnitDamageDetails = () => {
  const dispatch = useDispatch();
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Delay Processing"
          confirmClose={!viewOnly}
          closeHandler={() => {
            dispatch(resetUnitSelectionFilters());
          }}
          closeNavigationURL="/delay-processing/delayed-unit-browse"
        />
        <UnitDamageDetailsContent />
        <FooterDamage />
      </div>
    </div>
  );
};

export default UnitDamageDetails;
