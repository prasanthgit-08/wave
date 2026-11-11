import React from "react";
import FormAddContent from "./FormAddContent";
import FormAddHeader from "./FormAddHeader";
import FormAddFooter from "./FormAddFooter";

const DriverDrugTestsAddForm = () => {
  return (
    <div className={`add-form-component p-0 customContainer`}>
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormAddHeader />
        <FormAddContent />
        <FormAddFooter />
      </div>
    </div>
  );
};

export default DriverDrugTestsAddForm;
