import React from "react";
import EditShuttleDriverContent from "./EditShuttleDriverContent";
import EditShuttleDriverFooter from "./EditShuttleDriverFooter";
import EditShuttleDriverHeader from "./EditShuttleDriverHeader";

function EditShuttleDriverTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EditShuttleDriverHeader />
        <EditShuttleDriverContent />
        <EditShuttleDriverFooter />
      </div>
    </div>
  );
}

export default EditShuttleDriverTemplate;
