import React from "react";
import EditShuttleYardToPlantContent from "./EditShuttleYardToPlantContent";
import EditShuttleYardToPlantFooter from "./EditShuttleYardToPlantFooter";
import EditShuttleYardToPlantHeader from "./EditShuttleYardToPlantHeader";

function EditShuttleYardToPlantTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EditShuttleYardToPlantHeader />
        <EditShuttleYardToPlantContent />
        <EditShuttleYardToPlantFooter />
      </div>
    </div>
  );
}

export default EditShuttleYardToPlantTemplate;
