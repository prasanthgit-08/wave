import React from "react";
import DelayReturnHeader from "../DelayReturnHeader";
import DelayDocumentContent from "./DelayDocumentContent";
import DelayDocumentFooter from "./DelayDocumentFooter";

const DelayDocumentTemplate = () => {
  return (
    <div className={`add-form-component p-0 customContainer`}>
      <div className={`border border-dark border-2 quarterScreenWidth`} style={{ margin: "1px" }}>
        <DelayReturnHeader />
        <DelayDocumentContent />
        <DelayDocumentFooter />
      </div>
    </div>
  );
};

export default DelayDocumentTemplate;
