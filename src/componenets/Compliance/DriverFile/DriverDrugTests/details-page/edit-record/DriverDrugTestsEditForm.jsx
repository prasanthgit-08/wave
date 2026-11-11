import React from "react";
import FormEditHeader from "./FormEditHeader";
import FormEditContent from "./FormEditContent";
import FormEditFooter from "./FormEditFooter";

const DriverDrugTestsEditForm = () => {
  return (
    <div className={`add-form-component p-0 customContainer`}>
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormEditHeader />
        <FormEditContent />
        <FormEditFooter />
      </div>
    </div>
  );
};

export default DriverDrugTestsEditForm;
