import React from "react";
import DelayEntryContent from "./DelayEntryContent";
import DelayEntryFooter from "./DelayEntryFooter";
import DelayEntryHeader from "./DelayEntryHeader";
const DelayEntryTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <DelayEntryHeader />
        <DelayEntryContent />
        <DelayEntryFooter />
      </div>
    </div>
  );
};

export default DelayEntryTemplate;
