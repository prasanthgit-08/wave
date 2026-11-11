import React from "react";
import QuarterStyles from "../../../../styles/QuarterScreen.module.css";
import RoutesEditFormHeader from "./RoutesEditFormHeader";
import RoutesEditFormContent from "./RoutesEditFormContent";
import RoutesEditFormFooter from "./RoutesEditFormFooter";

const RoutesEditForm = () => {
  return (
    <div className={`add-form-component p-0 ${QuarterStyles.container}`}>
      <div className={`border border-dark border-2 ${QuarterStyles.width}`} style={{ margin: "1px" }}>
        <RoutesEditFormHeader />
        <RoutesEditFormContent />
        <RoutesEditFormFooter />
      </div>
    </div>
  );
};

export default RoutesEditForm;
