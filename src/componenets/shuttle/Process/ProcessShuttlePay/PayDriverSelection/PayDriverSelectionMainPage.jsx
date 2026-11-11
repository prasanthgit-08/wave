import React from "react";
import PayDriverSelectionContent from "./PayDriverSelectionContent";
import PayDriverSelectionFooter from "./PayDriverSelectionFooter";
import PayDriverSelectionHeader from "./PayDriverSelectionHeader";

function PayDriverSelectionMainPage() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <PayDriverSelectionHeader />
        <PayDriverSelectionContent />
        <PayDriverSelectionFooter />
      </div>
    </div>
  );
}

export default PayDriverSelectionMainPage;
