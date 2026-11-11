import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import UnitViewContent from "./UnitViewContent";

const UnitView = () => {
  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header />
        <UnitViewContent />
        <Footer unitView />
      </div>
    </div>
  );
};

export default UnitView;
