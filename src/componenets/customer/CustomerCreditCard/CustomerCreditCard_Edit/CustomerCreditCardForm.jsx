import React from "react";
import CustomerCreditCardHeader from "./CustomerCreditCardHeader";
import CustomerCreditCardFormContent from "./CustomerCreditCardFormContent";
import CustomerCreditCardFooter from "./CustomerCreditCardFooter";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
const CustomerCreditCardForm = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <CustomerCreditCardHeader />
        <CustomerCreditCardFormContent QuarterScreen={QuarterScreen} />
        <CustomerCreditCardFooter />
      </div>
    </div>
  );
};

export default CustomerCreditCardForm;
