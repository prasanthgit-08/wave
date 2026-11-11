import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ScanPaperworkContent from "./ScanPaperworkContent";

const ScanPaperwork = () => {
  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header scanPaperwork />
        <ScanPaperworkContent />
        <Footer scanPaperwork />
      </div>
    </div>
  );
};

export default ScanPaperwork;
