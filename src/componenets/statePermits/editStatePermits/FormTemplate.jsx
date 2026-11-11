import React from "react";

import styles from "../../../styles/ThreeQuarterScreen.module.css";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";

function FormTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        <FormContent styles={styles} />
        <FormFooter />
      </div>
    </div>
  );
}

export default FormTemplate;
