import React from "react";
import DelayCreditCardContent from "./DelayCreditCardContent";
import DelayReturnHeader from "../DelayReturnHeader";
import DelayCreditCardFooter from "./DelayCreditCardFooter";

const DelayCreditCardTemplate = () => {
  return (
    <div className={`add-form-component p-0 customContainer`}>
      <div className={`border border-dark border-2 quarterScreenWidth`} style={{ margin: "1px" }}>
        <DelayReturnHeader />
        <DelayCreditCardContent />
        <DelayCreditCardFooter />
      </div>
    </div>
  );
};

export default DelayCreditCardTemplate;
