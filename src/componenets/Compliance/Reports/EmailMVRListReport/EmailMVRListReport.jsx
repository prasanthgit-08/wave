import React from "react";
import ReportComponent from "../../../common/ReportComponent";

const EmailMVRListReport = () => {
  const EMAIL_MVR_LIST_REPORT = process.env.REACT_APP_SP_EMAIL_MVR_LIST_REPORT;
  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight"></div>
      </div>
    </>
  );

  return (
    <ReportComponent Body={body} id={EMAIL_MVR_LIST_REPORT} isTabValid={true} cancelDisabled useType={true} />
  );
};
export default EmailMVRListReport;
