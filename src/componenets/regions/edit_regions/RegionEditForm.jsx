import React from "react";
import RegionEditFormHeader from "./RegionEditFormHeader";
import RegionEditFormContent from "./RegionEditFormContent";
import RegionEditFormFooter from "./RegionEditFormFooter";

const RegionEditForm = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <RegionEditFormHeader />
        <RegionEditFormContent />
        <RegionEditFormFooter />
      </div>
    </div>
  );
};

export default RegionEditForm;
