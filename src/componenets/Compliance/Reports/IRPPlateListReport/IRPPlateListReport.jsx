import React from "react";
import ReportComponent from "../../../common/ReportComponent";

const IRPPlateListReport = () => {
  const IRP_PLATE_LIST_REPORT_ID = process.env.REACT_APP_SP_IRP_PLATE_LIST_REPORT_REPORT;
  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight"></div>
      </div>
    </>
  );

  return <ReportComponent Body={body} id={IRP_PLATE_LIST_REPORT_ID} isTabValid={true} cancelDisabled />;
};

export default IRPPlateListReport;
