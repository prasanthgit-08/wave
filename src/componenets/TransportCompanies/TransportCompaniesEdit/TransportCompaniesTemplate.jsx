import React from "react";
import styles from "../../../styles/QuarterScreen.module.css";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";

function TransportCompaniesTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <FormHeader styles={styles} />
        <FormContent styles={styles} />
        <FormFooter styles={styles} />
      </div>
    </div>
  );
}

export default TransportCompaniesTemplate;
