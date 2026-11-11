import React from "react";
import CustomerDelaerEditContent from "./CustomerDelaerEditContent";
import CustomerDelaerEditFooter from "./CustomerDelaerEditFooter";
import CustomerDelaerEditHeader from "./CustomerDelaerEditHeader";

function CustomerDelaerEditTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <CustomerDelaerEditHeader />
        <CustomerDelaerEditContent />
        <CustomerDelaerEditFooter />
      </div>
    </div>
  );
}

export default CustomerDelaerEditTemplate;
