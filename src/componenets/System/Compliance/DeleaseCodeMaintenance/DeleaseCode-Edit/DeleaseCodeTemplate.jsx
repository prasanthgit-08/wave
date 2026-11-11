import React from "react";
import DeleaseCodeContent from "./DeleaseCodeContent";
import DeleaseCodeFooter from "./DeleaseCodeFooter";
import DeleaseCodeHeader from "./DeleaseCodeHeader";
const DeleaseCodeTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DeleaseCodeHeader />

        <DeleaseCodeContent />

        <DeleaseCodeFooter />
      </div>
    </div>
  );
};

export default DeleaseCodeTemplate;
