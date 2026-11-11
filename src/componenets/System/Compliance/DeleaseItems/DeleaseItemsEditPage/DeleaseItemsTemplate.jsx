import React from "react";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import DeleaseItemsFormContent from "./DeleaseItemsFormContent";
import DeleaseItemsFormFooter from "./DeleaseItemsFormFooter";
import DeleaseItemsFormHeader from "./DeleaseItemsFormHeader";

const DeleaseItemsTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DeleaseItemsFormHeader />
        <DeleaseItemsFormContent />
        <DeleaseItemsFormFooter />
      </div>
    </div>
  );
};

export default DeleaseItemsTemplate;
