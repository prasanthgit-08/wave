import React from "react";
import EditYardUnitEditContent from "./EditYardUnitEditContent";
import EditYardUnitEditFooter from "./EditYardUnitEditFooter";
import EditYardUnitEditHeader from "./EditYardUnitEditHeader";
import { useParams } from "react-router-dom";

function EditYardUnitEditTemplate() {
  const params = useParams();
  const selectedId = params.id;

  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <EditYardUnitEditHeader />
        <EditYardUnitEditContent />
        <EditYardUnitEditFooter />
      </div>
    </div>
  );
}

export default EditYardUnitEditTemplate;
