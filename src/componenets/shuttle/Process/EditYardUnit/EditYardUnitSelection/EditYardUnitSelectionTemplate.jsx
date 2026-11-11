import React, { useEffect } from "react";
import EditYardUnitSelectionContent from "./EditYardUnitSelectionContent";
import EditYardUnitSelectionFooter from "./EditYardUnitSelectionFooter";
import EditYardUnitSelectionHeader from "./EditYardUnitSelectionHeader";
import "../EditYardUnit.css";

function EditYardUnitSelectionTemplate() {
  useEffect(() => {
    localStorage.removeItem("editYardDelay");
  }, []);

  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <EditYardUnitSelectionHeader />
        <EditYardUnitSelectionContent />
        <EditYardUnitSelectionFooter />
      </div>
    </div>
  );
}

export default EditYardUnitSelectionTemplate;
