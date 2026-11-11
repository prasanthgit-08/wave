import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import AdditionalAmountsContent from "./AdditionalAmountsContent";

const AdditionalAmounts = () => {
  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header />
        <AdditionalAmountsContent />
        <Footer additionalAmounts />
      </div>
    </div>
  );
};

export default AdditionalAmounts;
