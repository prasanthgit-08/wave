import React from "react";
import QuarterStyles from "../../../../../styles/QuarterScreen.module.css";
import DelayResourcesEditFormHeader from "./DelayResourcesEditFormHeader";
import DelayResourcesEditFormFooter from "./DelayResourcesEditFormFooter";
import DelayResourcesEdtFormContent from "./DelayResourcesEdtFormContent";

const DelayResourcesEditForm = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DelayResourcesEditFormHeader />
        <DelayResourcesEdtFormContent />
        <DelayResourcesEditFormFooter />
      </div>
    </div>
  );
};

export default DelayResourcesEditForm;
