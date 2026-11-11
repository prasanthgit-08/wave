import React from "react";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
import styles from "../../../styles/ThreeQuarterScreen.module.css";

function YardFormTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <FormHeader />
        <FormContent />
        <FormFooter />
      </div>
    </div>
  );
}

export default YardFormTemplate;
