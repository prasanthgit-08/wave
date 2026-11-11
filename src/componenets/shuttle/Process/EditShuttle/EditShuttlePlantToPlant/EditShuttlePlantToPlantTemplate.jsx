import React from "react";
import EditShuttlePlantToPlantFooter from "./EditShuttlePlantToPlantFooter";
import EditShuttlePlantToPlantHeader from "./EditShuttlePlantToPlantHeader";
import EditShuttlePlantToPlantContent from "./EditShuttlePlantToPlantContent";

function EditShuttlePlantToPlantTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EditShuttlePlantToPlantHeader />
        <EditShuttlePlantToPlantContent />
        <EditShuttlePlantToPlantFooter />
      </div>
    </div>
  );
}

export default EditShuttlePlantToPlantTemplate;
