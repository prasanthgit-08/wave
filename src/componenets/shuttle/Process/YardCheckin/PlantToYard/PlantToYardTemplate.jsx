import React from "react";
import PlantToYardContent from "./PlantToYardContent";
import PlantToYardFooter from "./PlantToYardFooter";
import PlantToYardHeader from "./PlantToYardHeader";

function PlantToYardTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <PlantToYardHeader />
        <PlantToYardContent />
        <PlantToYardFooter />
      </div>
    </div>
  );
}

export default PlantToYardTemplate;
