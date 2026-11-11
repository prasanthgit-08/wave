import React from "react";
import DriverBrowseHeader from "./DriverBrowseHeader";
import DriverBrowseFooter from "./DriverBrowseFooter";
import DriverListing from "./DriverListing";

const DriverListingForm = () => {
  return (
    <div
      className="customContainer threeFourthScreenWidth border border-dark border-2 "
      style={{ margin: "1px" }}
    >
      <div className="add-form-component ">
        <DriverBrowseHeader />
        <DriverListing />
        <DriverBrowseFooter />
      </div>
    </div>
  );
};

export default DriverListingForm;
