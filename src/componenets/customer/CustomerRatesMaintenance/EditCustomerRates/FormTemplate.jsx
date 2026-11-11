import React from "react";

import RatesContent from "./RatesContent";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

const FormTemplate = () => {
  return (
    <div className="customMaintenanceFormWidthContainer">
      <div className="add-form-component customMaintenanceFormWidth p-20">
        <FormHeader />
        <RatesContent />
        <FormFooter />
      </div>
    </div>
  );
};

export default FormTemplate;
