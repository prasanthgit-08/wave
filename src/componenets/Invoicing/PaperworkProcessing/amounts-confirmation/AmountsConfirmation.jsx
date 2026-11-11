import React from "react";
import AmountsConfirmationContent from "./AmountsConfirmationContent";
import Header from "../Header";
import Footer from "../Footer";

const AmountsConfirmation = () => {
  return (
    <div className="customContainer">
      <div className="border border-dark border-2 threeFourthScreenWidth" style={{ margin: "1px" }}>
        <Header />
        <AmountsConfirmationContent />
        <Footer amountsConfirmation />
      </div>
    </div>
  );
};

export default AmountsConfirmation;
