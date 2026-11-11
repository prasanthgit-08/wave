import React from "react";

import RatesContent from "./RatesContent";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

const RatesFormTemplate = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <FormHeader />
        <RatesContent />
        <FormFooter />
      </div>
    </div>
  );
};

export default RatesFormTemplate;
