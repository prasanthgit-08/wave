import React from "react";
import DryRunContent from "./DryRunContent";
import DryRunFooter from "./DryRunFooter";
import DryRunHeader from "./DryRunHeader";

function DryRunTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DryRunHeader />
        <DryRunContent />
        <DryRunFooter />
      </div>
    </div>
  );
}

export default DryRunTemplate;
