import React from "react";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";

function PostalCodeFormTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />

        <FormContent />
        <FormFooter />
      </div>
    </div>
  );
}

export default PostalCodeFormTemplate;
