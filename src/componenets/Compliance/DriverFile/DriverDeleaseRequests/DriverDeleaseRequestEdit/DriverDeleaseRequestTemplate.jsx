import React from "react";
import DriverDeleasRequestHeader from "./DriverDeleasRequestHeader";
import DriverDeleaseRequestFooter from "./DriverDeleaseRequestFooter";
import DriverDeleaseRequestContent from "./DriverDeleaseRequestContent";

const DriverDeleaseRequestTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DriverDeleasRequestHeader />
        <DriverDeleaseRequestContent />
        <DriverDeleaseRequestFooter />
      </div>
    </div>
  );
};

export default DriverDeleaseRequestTemplate;
