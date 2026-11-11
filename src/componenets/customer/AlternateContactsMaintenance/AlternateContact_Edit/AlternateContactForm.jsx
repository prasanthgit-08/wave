import React from "react";
import AlternateContactHeader from "./AlternateContactHeader";
import AlternateContactFooter from "./AlternateContactFooter";
import AlternateContactFormContent from "./AlternateContactFormContent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";

const AlternateContactForm = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <AlternateContactHeader />

        <AlternateContactFormContent />

        <AlternateContactFooter />
      </div>
    </div>
  );
};

export default AlternateContactForm;
