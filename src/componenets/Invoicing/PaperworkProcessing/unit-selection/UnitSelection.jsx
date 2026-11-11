import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../PaperworkProcessing.css";
import UnitSelectionContent from "./UnitSelectionContent";

const UnitSelection = () => {
  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header />
        <UnitSelectionContent />
        <Footer unitSelection />
      </div>
    </div>
  );
};

export default UnitSelection;
