import React from "react";
import ReportComponent from "../../../common/ReportComponent";

const YardCapacityReport = () => {
  const YARD_CAPACITY_REPORT_ID = process.env.REACT_APP_SP_YARD_CAPACITY_REPORT;

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight"></div>
      </div>
    </>
  );

  return <ReportComponent Body={body} id={YARD_CAPACITY_REPORT_ID} isTabValid={true} cancelDisabled={true} />;
};

export default YardCapacityReport;
