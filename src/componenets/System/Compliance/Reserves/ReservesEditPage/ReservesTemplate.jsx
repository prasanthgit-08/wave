import React from "react";

import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import ReservesFormHeader from "./ReservesFormHeader";
import ReservesFormContent from "./ReservesFormContent";
import ReservesFormFooter from "./ReservesFormFooter";

function ReservesFormTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <ReservesFormHeader />
        <ReservesFormContent styles={styles} />
        <ReservesFormFooter />
      </div>
    </div>
  );
}

export default ReservesFormTemplate;
