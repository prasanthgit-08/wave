import React from "react";

import styles from "../../../styles/ThreeQuarterScreen.module.css";
import UnitTypeHeader from "./UnitTypeHeader";
import UnitTypeFooter from "./UnitTypeFooter";
import UnitTypeContent from "./UnitTypeContent";

function UnitTypeTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <UnitTypeHeader />
        <UnitTypeContent styles={styles} />
        <UnitTypeFooter />
      </div>
    </div>
  );
}

export default UnitTypeTemplate;
