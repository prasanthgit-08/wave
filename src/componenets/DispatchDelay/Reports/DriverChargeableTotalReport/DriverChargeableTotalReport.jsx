import React, { useState } from "react";
import ReportComponent from "../../../common/ReportComponent";

const DriverChargeableTotalReport = () => {
  const [isTabValid, setIsTabValid] = useState(true);
  const DRIVER_CHARGEABLE_TOTALS_REPORT_ID = process.env.REACT_APP_SP_DRIVER_CHARGEABLE_TOTALS_REPORT;

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
      cancelDisabled={true}
      id={DRIVER_CHARGEABLE_TOTALS_REPORT_ID}
      isTabValid={isTabValid}
    />
  );
};

export default DriverChargeableTotalReport;
