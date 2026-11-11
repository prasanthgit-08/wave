import React from "react";
import ShuttleDelayContent from "./ShuttleDelayContent";
import ShuttleDelayFooter from "./ShuttleDelayFooter";
import ShuttleDelayHeader from "./ShuttleDelayHeader";

function ShuttleDelayTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <ShuttleDelayHeader />
        <ShuttleDelayContent />
        <ShuttleDelayFooter />
      </div>
    </div>
  );
}

export default ShuttleDelayTemplate;
