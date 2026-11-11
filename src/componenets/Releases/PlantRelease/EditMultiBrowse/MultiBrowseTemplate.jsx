import React from "react";
import PlantReleaseFooter from "../PlantReleaseFooter";
import PlantReleaseHeader from "../PlantReleaseHeader";
import MultiBrowseContent from "./MultiBrowseContent";
const MultiBrowseTemplate = () => {
  return (
    <div className="customPlantReleaseContainer">
      <div className="add-form-component p-20 customPlantRelaseWidth">
        <PlantReleaseHeader />
        <MultiBrowseContent />
        <PlantReleaseFooter />
      </div>
    </div>
  );
};

export default MultiBrowseTemplate;
