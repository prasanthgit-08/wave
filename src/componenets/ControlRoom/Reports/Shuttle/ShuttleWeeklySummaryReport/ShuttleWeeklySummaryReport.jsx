import React, { useState } from "react";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import toast from "react-hot-toast";
import PreviewPopup from "../../../../common/PreviewPopup";
import { useNavigate } from "react-router-dom";
import CommonReportService from "../../../../../services/Reports/CommonReportService";
import ReportsFooter from "../../../../common/ReportsFooter";
import LoadingIcon from "../../../../common/LoadingIcon";

const ShuttleWeeklySummaryReport = () => {
  const [base64PDF, setBase64PDF] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRecord = (type, columnName) => {
    setLoading(true);
    CommonReportService.getReport(7, { columnNames: columnName }, type)
      .then(({ data }) => {
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.errorMessage);
          if (data.fileContent) {
            setShowPreview(true);
            setBase64PDF(data.fileContent);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <QuarterScreenWrapper>
        <Header />
        <div className="w-100 p-2 ">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            {loading && <LoadingIcon />}
            <div className="m-b-10 ">
              <div className="p-10 w-100 d-flex flex-wrap justify-content-center m-t-175"></div>
            </div>
          </div>
        </div>
        <ReportsFooter
          onDisplayClick={() => {
            fetchRecord("display", true);
          }}
          onEmailExcelClick={() => {
            fetchRecord("emailExcel", false);
          }}
          onEmailPdfClick={() => {
            fetchRecord("emailPdf", true);
          }}
          onPrintClick={() => {
            fetchRecord("display", true);
          }}
          cancelDisabled={true}
        />
        <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
      </QuarterScreenWrapper>
    </>
  );
};

export default ShuttleWeeklySummaryReport;
