import React from "react";
import DriverBrowseHeader from "./DriverBrowseHeader";
import DriverBrowseFooter from "./DriverBrowseFooter";
import DriverListing from "./DriverListing";

const ZipcodeDriverListingForm = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DriverBrowseHeader />
        <DriverListing />
        <DriverBrowseFooter />
      </div>
    </div>
  );
};

export default ZipcodeDriverListingForm;
