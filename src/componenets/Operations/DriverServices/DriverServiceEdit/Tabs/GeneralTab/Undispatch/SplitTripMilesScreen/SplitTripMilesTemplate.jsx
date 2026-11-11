import React from "react";
import SplitTripMilesContent from "./SplitTripMilesContent";
import SplitTripMilesFooter from "./SplitTripMilesFooter";
import UndispatchHeader from "../UndispatchHeader";

const SplitTripMilesTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <SplitTripMilesContent />
        <SplitTripMilesFooter />
      </div>
    </div>
  );
};

export default SplitTripMilesTemplate;
