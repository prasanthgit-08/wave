import React from "react";
import EditShuttleYardToYardContent from "./EditShuttleYardToYardContent";
import EditShuttleYardToYardFooter from "./EditShuttleYardToYardFooter";
import EditShuttleYardToYardHeader from "./EditShuttleYardToYardHeader";

function EditShuttleYardToYardTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EditShuttleYardToYardHeader />
        <EditShuttleYardToYardContent />
        <EditShuttleYardToYardFooter />
      </div>
    </div>
  );
}

export default EditShuttleYardToYardTemplate;
