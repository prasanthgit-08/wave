import React from "react";
import DeleteUnitContent from "./DeleteUnitContent";
import UndispatchHeader from "../UndispatchHeader";
import DeleteUnitFooter from "./DeleteUnitFooter";

const DeleteUnitTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <DeleteUnitContent />
        <DeleteUnitFooter />
      </div>
    </div>
  );
};

export default DeleteUnitTemplate;
