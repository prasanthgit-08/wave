import React from "react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import FormContent from "./FormContent";

const DriverDispatchHoldForm = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        <FormContent />
        <FormFooter />
      </div>
    </div>
  );
};

export default DriverDispatchHoldForm;
