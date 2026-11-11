import React from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import CustomerPlantEmailsContent from "./CustomerPlantEmailsContent";
import CustomerPlantEmailsFooter from "./CustomerPlantEmailsFooter";
import CustomerPlantEmailsHeader from "./CustomerPlantEmailsHeader";

const CustomerPlantEmailTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <CustomerPlantEmailsHeader />

        <CustomerPlantEmailsContent />

        <CustomerPlantEmailsFooter />
      </div>
    </div>
  );
};

export default CustomerPlantEmailTemplate;
