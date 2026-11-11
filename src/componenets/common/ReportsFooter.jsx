import React from "react";

/**
 * ReportsFooter Component
 *
 * A flexible footer component with customizable buttons for displaying, emailing, printing,
 * and canceling actions. Each button can be individually enabled/disabled and shown/hidden based on props.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.displayDisabled - Disables the Display button if true
 * @param {boolean} props.emailExcelDisabled - Disables the Email Excel button if true
 * @param {boolean} props.emailPdfDisabled - Disables the Email PDF button if true
 * @param {boolean} props.printDisabled - Disables the Print button if true
 * @param {boolean} props.cancelDisabled - Disables the Cancel button if true
 * @param {function} props.onDisplayClick - Callback function for Display button click
 * @param {function} props.onEmailExcelClick - Callback function for Email Excel button click
 * @param {function} props.onEmailPdfClick - Callback function for Email PDF button click
 * @param {function} props.onPrintClick - Callback function for Print button click
 * @param {function} props.onCancelClick - Callback function for Cancel button click
 * @param {React.ReactNode} props.MiscellaneousContent - Additional content to display before the buttons
 * @param {boolean} [props.hideDisplay=false] - Hides the Display button if true
 * @param {boolean} [props.hideEmailExcel=false] - Hides the Email Excel button if true
 * @param {boolean} [props.hideEmailPdf=false] - Hides the Email PDF button if true
 * @param {boolean} [props.hidePrint=false] - Hides the Print button if true
 * @param {boolean} [props.hideCancel=false] - Hides the Cancel button if true
 *
 * @returns {JSX.Element} The ReportsFooter component
 */
const ReportsFooter = ({
  displayDisabled,
  emailExcelDisabled,
  emailPdfDisabled,
  printDisabled,
  cancelDisabled,
  onDisplayClick,
  onEmailExcelClick,
  onEmailPdfClick,
  onPrintClick,
  onCancelClick,
  MiscellaneousContent = null,
  hideDisplay = false,
  hideEmailExcel = false,
  hideEmailPdf = false,
  hidePrint = false,
  hideCancel = false,
}) => {
  /**
   * Example Usage:
   *
   * <ReportsFooter
   *   displayDisabled={isDisplayDisabled}
   *   emailExcelDisabled={isEmailExcelDisabled}
   *   emailPdfDisabled={isEmailPdfDisabled}
   *   printDisabled={isPrintDisabled}
   *   cancelDisabled={isCancelDisabled}
   *   onDisplayClick={handleDisplay}
   *   onEmailExcelClick={() => sendAvailableDriverList("emailExcel")}
   *   onEmailPdfClick={() => sendAvailableDriverList("emailPdf")}
   *   onPrintClick={() => sendAvailableDriverList("print")}
   *   onCancelClick={handleCancel}
   *   // Optional props
   *   MiscellaneousContent={<span>Additional Content Here</span>}
   *   hideDisplay={false}      // Show the Display button
   *   hideEmailExcel={true}     // Hide the Email Excel button
   *   hideEmailPdf={false}      // Show the Email PDF button
   *   hidePrint={false}         // Show the Print button
   *   hideCancel={false}        // Show the Cancel button
   * />
   */

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>
      <div className="d-flex align-items-center flex-wrap">
        {MiscellaneousContent}

        <button
          disabled={displayDisabled}
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 ${!hideDisplay ? "" : "invisible"}`}
          type="button"
          onClick={onDisplayClick}
        >
          Display
        </button>

        <button
          disabled={emailExcelDisabled}
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 ${!hideEmailExcel ? "" : "invisible"}`}
          type="button"
          onClick={onEmailExcelClick}
        >
          Email Excel
        </button>

        <button
          disabled={emailPdfDisabled}
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 ${!hideEmailPdf ? "" : "invisible"}`}
          type="button"
          onClick={onEmailPdfClick}
        >
          Email PDF
        </button>

        <button
          disabled={printDisabled}
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 ${!hidePrint ? "" : "invisible"}`}
          type="button"
          onClick={onPrintClick}
          hidden={hidePrint}
        >
          Print
        </button>

        <button
          disabled={cancelDisabled}
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 ${!hideCancel ? "" : "invisible"}`}
          type="button"
          onClick={onCancelClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReportsFooter;
