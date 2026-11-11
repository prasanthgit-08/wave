import React from "react";

import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";

function AddFormTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <FormHeader />
        <FormContent />
        <FormFooter />
      </div>
    </div>
  );
}

export default AddFormTemplate;
