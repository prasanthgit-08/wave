import React from "react";
import CheckRejectedLoadsHeader from "./CheckRejectedLoadsHeader";
import CheckRejectedLoadsContent from "./CheckRejectedLoadsContent";
import CheckRejectedLoadsFooter from "./CheckRejectedLoadsFooter";

const CheckRejectedLoadsTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <CheckRejectedLoadsHeader />
        <CheckRejectedLoadsContent />
        <CheckRejectedLoadsFooter />
      </div>
    </div>
  );
};

export default CheckRejectedLoadsTemplate;
