import React from "react";
import ReportComponent from "../../../common/ReportComponent";

const ClosedClaimsReserveReport = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const CLOSED_CLAIMS_REPORT_ID = process.env.REACT_APP_SP_CLOSED_CLAIMS_REPORT;

  const params = {
    userPK: userPK,
  };

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight"></div>
      </div>
    </>
  );
  return (
    <ReportComponent
      Body={body}
      id={CLOSED_CLAIMS_REPORT_ID}
      // isDisplayDisabled={}
      isTabValid={true}
      payload={params}
      cancelDisabled={true}
    />
  );
};

export default ClosedClaimsReserveReport;
