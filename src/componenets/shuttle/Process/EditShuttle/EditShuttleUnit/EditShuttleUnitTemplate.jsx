import React from "react";
import EditShuttleUnitContent from "./EditShuttleUnitContent";
import EditShuttleUnitFooter from "./EditShuttleUnitFooter";
import EditShuttleUnitHeader from "./EditShuttleUnitHeader";
import "../EditShuttle.css";

function EditShuttleUnitTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EditShuttleUnitHeader />
        <EditShuttleUnitContent />
        <EditShuttleUnitFooter />
      </div>
    </div>
  );
}

export default EditShuttleUnitTemplate;
