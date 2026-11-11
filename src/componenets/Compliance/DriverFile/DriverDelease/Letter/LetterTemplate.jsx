import React from "react";
import LetterFormHeader from "./LetterFormHeader";
import LetterFormContent from "./LetterFormContent";
import LetterFormFooter from "./LetterFormFooter";

const LetterTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <LetterFormHeader />
        <LetterFormContent />
        <LetterFormFooter />
      </div>
    </div>
  );
};

export default LetterTemplate;
