import React from "react";
import ShuttleInquirySelectionContent from "./ShuttleInquirySelectionContent";

function ShuttleInquirySelectionTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        {/* {<ShuttleInquirySelectionHeader/> */}

        <ShuttleInquirySelectionContent />
        {
          // <ShuttleInquirySelectionFooter/>
        }
      </div>
    </div>
  );
}

export default ShuttleInquirySelectionTemplate;
