import React from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import CustomerPlantDelayResourcesContent from "./CustomerPlantDelayResourcesContent";
import CustomerPlantDelayResourcesFooter from "./CustomerPlantDelayResourcesFooter";
import CustomerPlantDelayResourcesHeader from "./CustomerPlantDelayResourcesHeader";
const CustomerPlantDelayResourcesTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <CustomerPlantDelayResourcesHeader />
        <CustomerPlantDelayResourcesContent />
        <CustomerPlantDelayResourcesFooter />
      </div>
    </div>
  );
};

export default CustomerPlantDelayResourcesTemplate;
