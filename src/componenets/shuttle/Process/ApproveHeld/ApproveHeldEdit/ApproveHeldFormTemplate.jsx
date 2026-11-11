import React from "react";
import ApproveHeldFormContent from "./ApproveHeldFormContent";
import ApproveHeldFormFooter from "./ApproveHeldFormFooter";
import ApproveHeldFormHeader from "./ApproveHeldFormHeader";

function ApproveHeldFormTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <ApproveHeldFormHeader />
        <ApproveHeldFormContent />
        <ApproveHeldFormFooter />
      </div>
    </div>
  );
}

export default ApproveHeldFormTemplate;
