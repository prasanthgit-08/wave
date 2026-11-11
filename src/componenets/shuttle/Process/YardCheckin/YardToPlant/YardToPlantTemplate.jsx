import React from "react";
import YardToPlantContent from "./YardToPlantContent";
import YardToPlantFooter from "./YardToPlantFooter";
import YardToPlantHeader from "./YardToPlantHeader";

function YardToPlantTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <YardToPlantHeader />
        <YardToPlantContent />
        <YardToPlantFooter />
      </div>
    </div>
  );
}

export default YardToPlantTemplate;
