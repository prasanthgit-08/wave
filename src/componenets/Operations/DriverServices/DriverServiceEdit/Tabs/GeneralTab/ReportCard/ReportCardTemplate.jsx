import React from "react";
import ReportCardHeader from "./ReportCardHeader";
import ReportCardFooter from "./ReportCardFooter";
import ReportCardContent from "./ReportCardContent";

const ReportCardTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <ReportCardHeader />
        <ReportCardContent />
        <ReportCardFooter />
      </div>
    </div>
  );
};

export default ReportCardTemplate;
