import React from "react";
import Header from "../../../common/Header";
import UnitDetailsContent from "./UnitDetailsContent";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { resetUnitSelectionFilters } from "../../../../redux/EditMaster/UnitSelectionSlice";

const UnitDetails = () => {
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
        <UnitDetailsContent />
        <Footer />
      </div>
    </div>
  );
};

export default UnitDetails;
