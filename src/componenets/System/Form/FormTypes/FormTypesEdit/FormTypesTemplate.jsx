import React from "react";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import FormTypesContent from "./FormTypesContent";
import FormTypesFooter from "./FormTypesFooter";
import FormTypesHeader from "./FormTypesHeader";

function FormTypesTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormTypesHeader />
        <FormTypesContent />
        <FormTypesFooter />
      </div>
    </div>
  );
}

export default FormTypesTemplate;
