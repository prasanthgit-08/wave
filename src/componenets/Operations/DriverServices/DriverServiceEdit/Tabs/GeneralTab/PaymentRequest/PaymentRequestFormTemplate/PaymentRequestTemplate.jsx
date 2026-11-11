import React from "react";
import Footer from "./Footer";
import FormContent from "./FormContent";
import Header from "./Header";
const PaymentRequestTemplate = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <Header />
        <FormContent />
        <Footer />
      </div>
    </div>
  );
};

export default PaymentRequestTemplate;
