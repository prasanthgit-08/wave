import React from "react";
import CustomerPlantFooter from "./CustomerPlantFooter";
import { CustomerPlantHeader } from "./CustomerPlantHeader";
import CustomerPlantFormContent from "./CustomerPlantFormContent";

const CustomerPlantFormTemplate = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <CustomerPlantHeader />
        <CustomerPlantFormContent />
        <CustomerPlantFooter />
      </div>
    </div>
  );
};

export default CustomerPlantFormTemplate;
