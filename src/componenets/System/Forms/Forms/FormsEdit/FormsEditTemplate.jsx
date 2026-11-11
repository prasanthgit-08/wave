import React from "react";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import FormsEditContent from "./FormsEditContent";
import FormsEditFooter from "./FormsEditFooter";
import FormsEditHeader from "./FormsEditHeader";

function FormsEditTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <FormsEditHeader />
        <FormsEditContent />
        <FormsEditFooter />
      </div>
    </div>
  );
}

export default FormsEditTemplate;
