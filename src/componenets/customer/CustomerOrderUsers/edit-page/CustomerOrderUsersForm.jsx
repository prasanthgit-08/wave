import React from "react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import FormContent from "./FormContent";
import styles from "../../../../styles/QuarterScreen.module.css";

const CustomerOrderUsersForm = () => {
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

export default CustomerOrderUsersForm;
