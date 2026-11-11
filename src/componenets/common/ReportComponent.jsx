import { useState } from "react";
import QuarterScreenWrapper from "../Templates/Screens/QuarterScreenWrapper";
import Header from "./Header";
import PreviewPopup from "./PreviewPopup";
import ReportsFooter from "./ReportsFooter";
import CommonReportService from "../../services/Reports/CommonReportService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ReportComponent = ({
  Body,
  resetFormData,
  id,
  isTabValid,
  payload,
  handleDisplay,
  hideDisplay = false,
  hideEmailExcel = false,
  hideEmailPdf = false,
  hidePrint = false,
  hideCancel = false,
  isDisplayDisabled = false,
  isEmailExcelDisabled = false,
  isEmailPdfDisabled = false,
  isPrintDisabled = false,
  cancelDisabled,
  useType,
  print,
  pageRedirection,
}) => {
  const navigate = useNavigate();

  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [loading, setLoading] = useState(false);

  const fetchReport = (type) => {
    setLoading(true);
    let processedParam = payload;
    if (useType) {
      processedParam = { ...payload, Type: print && type === "display" ? "print" : type };
    }
    CommonReportService.getReport(id, processedParam, type)
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
    <QuarterScreenWrapper>
      <Header
        closeHandler={() => {
          resetFormData && resetFormData();
        }}
      />
      {Body}
      <ReportsFooter
        displayDisabled={loading || !isTabValid || isDisplayDisabled}
        emailExcelDisabled={loading || !isTabValid || isEmailExcelDisabled}
        emailPdfDisabled={loading || !isTabValid || isEmailPdfDisabled}
        printDisabled={loading || !isTabValid || isPrintDisabled}
        cancelDisabled={loading || cancelDisabled}
        onDisplayClick={() =>
          handleDisplay
            ? handleDisplay("display")
            : pageRedirection
              ? navigate(pageRedirection)
              : fetchReport("display")
        }
        onEmailExcelClick={() => fetchReport("emailExcel")}
        onEmailPdfClick={() => fetchReport("emailPdf")}
        onPrintClick={() => fetchReport("display")}
        onCancelClick={() => resetFormData && resetFormData()}
        hideDisplay={hideDisplay}
        hideEmailExcel={hideEmailExcel}
        hideEmailPdf={hideEmailPdf}
        hidePrint={hidePrint}
        hideCancel={hideCancel}
      />
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
    </QuarterScreenWrapper>
  );
};

export default ReportComponent;
