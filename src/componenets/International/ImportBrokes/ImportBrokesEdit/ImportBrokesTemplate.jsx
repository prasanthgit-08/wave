import React from "react";
import ImportBrokersContent from "./ImportBrokersContent";
import ImportBrokersFooter from "./ImportBrokersFooter";
import ImportBrokersHeader from "./ImportBrokersHeader";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";

function ImportBrokesTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <ImportBrokersHeader />
        <ImportBrokersContent />
        <ImportBrokersFooter />
      </div>
    </div>
  );
}

export default ImportBrokesTemplate;
