import React from "react";

import FormPrinterHeader from "./FormPrinterHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";

function PrinterAddFormTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <FormPrinterHeader />
        <FormContent />
        <FormFooter />
      </div>
    </div>
  );
}

export default PrinterAddFormTemplate;
