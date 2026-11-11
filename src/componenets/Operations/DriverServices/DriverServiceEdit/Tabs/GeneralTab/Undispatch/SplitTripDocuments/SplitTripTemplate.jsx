import React from "react";
import SplitTripContent from "./SplitTripContent";
import UndispatchHeader from "../UndispatchHeader";

import SplitTripFooter from "./SplitTripFooter";

const SplitTripTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <SplitTripContent />
        <SplitTripFooter />
      </div>
    </div>
  );
};

export default SplitTripTemplate;
