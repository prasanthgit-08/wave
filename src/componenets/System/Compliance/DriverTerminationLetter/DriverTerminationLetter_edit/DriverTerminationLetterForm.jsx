import React from "react";
import Styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import DriverTerminationLetterFormHeader from "./DriverTerminationLetterFormHeader";
import DriverTerminationLetterFormFooter from "./DriverTerminationLetterFormFooter";
import DriverTerminationLetterFormContent from "./DriverTerminationLetterFormContent";

const DriverTerminationLetterForm = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DriverTerminationLetterFormHeader />
        <DriverTerminationLetterFormContent />
        <DriverTerminationLetterFormFooter />
      </div>
    </div>
  );
};

export default DriverTerminationLetterForm;
