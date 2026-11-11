import React from "react";
import { FormHeader } from "./FormHeader";
import FormFooter from "./FormFooter";
import EmailAttachmentFormContent from "./EmailAttachmentFormContent";

const EmailAttachmentForm = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        <EmailAttachmentFormContent />
        <FormFooter />
      </div>
    </div>
  );
};

export default EmailAttachmentForm;
