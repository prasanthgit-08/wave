import React from "react";
import Header from "./Header";
import FormContent from "./FormContent";
import Footer from "./Footer";
import styles from "../../../../../../../../styles/QuarterScreen.module.css";

function DispatchRestrictionFormTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <Header styles={styles} />
        <FormContent styles={styles} />
        <Footer styles={styles} />
      </div>
    </div>
  );
}

export default DispatchRestrictionFormTemplate;
