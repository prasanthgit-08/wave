import React from "react";
import EditDriverFileHeader from "./EditDriverFileHeader";
import EditDriverFileContent from "./EditDriverFileContent";
import EditDriverFileFooter from "./EditDriverFileFooter";

const EditDriverFileTemplate = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <EditDriverFileHeader />
        <EditDriverFileContent />
        <EditDriverFileFooter />
      </div>
    </div>
  );
};

export default EditDriverFileTemplate;
