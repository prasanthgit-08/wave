import React from "react";
import ShuttleInquiryDetailContent from "./ShuttleInquiryDetailContent";

function ShuttleInquiryDetailTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <ShuttleInquiryDetailContent />
      </div>
    </div>
  );
}

export default ShuttleInquiryDetailTemplate;
