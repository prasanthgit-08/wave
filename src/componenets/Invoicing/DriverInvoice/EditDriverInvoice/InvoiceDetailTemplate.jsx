import React from "react";
import styles from "../../../../styles/QuarterScreen.module.css";
import Header from "./Header";
import Footer from "./Footer";
import FormContent from "./FormContent";

function InvoiceDetailTemplate() {
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

export default InvoiceDetailTemplate;
