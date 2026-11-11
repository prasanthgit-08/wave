import React from "react";
import UndispatchHeader from "../UndispatchHeader";
import APUDocumentsFooter from "./APUDocumentsFooter";
import APUDocumentsContent from "./APUDocumentsContent";

const APUDocumentsTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <APUDocumentsContent />
        <APUDocumentsFooter />
      </div>
    </div>
  );
};

export default APUDocumentsTemplate;
