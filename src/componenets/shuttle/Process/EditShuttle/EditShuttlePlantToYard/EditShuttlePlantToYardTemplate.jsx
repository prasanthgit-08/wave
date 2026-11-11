import React from "react";
import EditShuttlePlantToYardContent from "./EditShuttlePlantToYardContent";
import EditShuttlePlantToYardFooter from "./EditShuttlePlantToYardFooter";
import EditShuttlePlantToYardHeader from "./EditShuttlePlantToYardHeader";

function EditShuttleYardToPlantTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EditShuttlePlantToYardHeader />
        <EditShuttlePlantToYardContent />
        <EditShuttlePlantToYardFooter />
      </div>
    </div>
  );
}

export default EditShuttleYardToPlantTemplate;
