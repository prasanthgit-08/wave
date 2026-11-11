import React from "react";
import BreakdownDelayContent from "./BreakdownDelayContent";
import Header from "../Header";
import Footer from "../Footer";

const BreakdownDelay = () => {
  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header />
        <BreakdownDelayContent />
        <Footer breakdownDelay />
      </div>
    </div>
  );
};

export default BreakdownDelay;
