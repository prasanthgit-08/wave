import React from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import styles from "../../../../styles/QuarterScreen.module.css";

const CustomerDPURestrictionsForm = () => {
  return (
    <div className={`add-form-component p-0 ${styles.container}`}>
      <div className={`border border-dark border-2 ${styles.width}`} style={{ margin: "1px" }}>
        <FormHeader styles={styles} />
        <FormContent styles={styles} />
        <FormFooter styles={styles} />
      </div>
    </div>
  );
};

export default CustomerDPURestrictionsForm;
