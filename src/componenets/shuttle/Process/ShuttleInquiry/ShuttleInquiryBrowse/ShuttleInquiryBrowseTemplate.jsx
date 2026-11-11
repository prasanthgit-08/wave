import React from "react";
import ShuttleInquiryBrowseContent from "./ShuttleInquiryBrowseContent";

function ShuttleInquiryBrowseTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <ShuttleInquiryBrowseContent />
      </div>
    </div>
  );
}

export default ShuttleInquiryBrowseTemplate;
