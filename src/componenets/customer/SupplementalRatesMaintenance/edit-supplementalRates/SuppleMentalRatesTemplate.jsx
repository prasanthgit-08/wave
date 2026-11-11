import React from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import styles from "../../../../styles/QuarterScreen.module.css";

function SuppleMentalRatesTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        {" "}
        <FormHeader />
        <FormContent styles={styles} />
        <FormFooter />
      </div>
    </div>
  );
}

export default SuppleMentalRatesTemplate;
