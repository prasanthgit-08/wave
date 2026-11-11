import React from "react";
import MilesContent from "./MilesContent";
import MilesFooter from "./MilesFooter";
import DelayReturnHeader from "../DelayReturnHeader";

const DelayMilesTemplate = () => {
  return (
    <div className={`add-form-component p-0 customContainer`}>
      <div className={`border border-dark border-2 quarterScreenWidth`} style={{ margin: "1px" }}>
        <DelayReturnHeader />
        <MilesContent />
        <MilesFooter />
      </div>
    </div>
  );
};

export default DelayMilesTemplate;
