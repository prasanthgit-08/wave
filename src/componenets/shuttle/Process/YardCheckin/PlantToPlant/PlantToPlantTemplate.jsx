import React from "react";
import PlantToPlantContent from "./PlantToPlantContent";
import PlantToPlantFooter from "./PlantToPlantFooter";
import PlantToPlantHeader from "./PlantToPlantHeader";

function PlantToPlantTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <PlantToPlantHeader />
        <PlantToPlantContent />
        <PlantToPlantFooter />
      </div>
    </div>
  );
}

export default PlantToPlantTemplate;
