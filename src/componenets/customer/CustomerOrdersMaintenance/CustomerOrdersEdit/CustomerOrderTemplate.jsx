import React from "react";
import CustomerOrderHeader from "./CustomerOrderHeader";
import CustomerOrderFooter from "./CustomerOrderFooter";
import CustomerOrderContent from "./CustomerOrderContent";

function CustomerOrderTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <CustomerOrderHeader />
        <CustomerOrderContent />
        <CustomerOrderFooter />
      </div>
    </div>
  );
}

export default CustomerOrderTemplate;
