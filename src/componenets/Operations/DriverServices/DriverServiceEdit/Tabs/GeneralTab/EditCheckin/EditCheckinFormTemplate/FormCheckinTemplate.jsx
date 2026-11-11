import React from "react";
import FormContent from "./FormContent";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import styles from "../../../../../../../../styles/ThreeQuarterScreen.module.css";

function FormCheckinTemplate() {
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

export default FormCheckinTemplate;
