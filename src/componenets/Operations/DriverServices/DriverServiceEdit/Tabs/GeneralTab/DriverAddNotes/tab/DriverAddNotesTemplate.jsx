import React from "react";

import DriverAddNotesHeader from "./DriverAddNotesHeader";
import DriverAddNotesFooter from "./DriverAddNotesFooter";
import DriverAddNotesContent from "./DriverAddNotesContent";
import styles from "../../../../../../../../styles/QuarterScreen.module.css";

function DriverAddNotesTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DriverAddNotesHeader styles={styles} />
        <DriverAddNotesContent styles={styles} />
        <DriverAddNotesFooter styles={styles} />
      </div>
    </div>
  );
}

export default DriverAddNotesTemplate;
