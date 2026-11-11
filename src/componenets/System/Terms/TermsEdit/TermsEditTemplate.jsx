import React from "react";
import styles from "../../../../styles/QuarterScreen.module.css";
import TermsEditContent from "./TermsEditContent";
import TermsEditFooter from "./TermsEditFooter";
import TermsEditHeader from "./TermsEditHeader";

function TermsEditTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <TermsEditHeader styles={styles} />
        <TermsEditContent styles={styles} />
        <TermsEditFooter styles={styles} />
      </div>
    </div>
  );
}

export default TermsEditTemplate;
