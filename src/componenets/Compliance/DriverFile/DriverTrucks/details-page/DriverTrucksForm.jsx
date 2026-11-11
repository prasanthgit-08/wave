import React from "react";
import TruckFormHeader from "./TruckFormHeader";
import TruckFormContent from "./TruckFormContent";
import TruckFormFooter from "./TruckFormFooter";
const DriverTrucksForm = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <TruckFormHeader />
        <TruckFormContent />
        <TruckFormFooter />
      </div>
    </div>
  );
};

export default DriverTrucksForm;
