import React from "react";
import UndispatchHeader from "../UndispatchHeader";
import SplitTripLocationFooter from "./SplitTripLocationFooter";
import SplitTripLocationContent from "./SplitTripLocationContent";

const SplitTripLocationTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <SplitTripLocationContent />
        <SplitTripLocationFooter />
      </div>
    </div>
  );
};

export default SplitTripLocationTemplate;
