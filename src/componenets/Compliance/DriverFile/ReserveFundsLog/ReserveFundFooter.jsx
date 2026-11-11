import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ExportModal from "../../../common/ExportModal";
import ReserveFundsLogService from "../../../../services/ReserveFundsLogService";
import { useParams } from "react-router-dom";
import PreviewPopup from "../../../common/PreviewPopup";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ReserveFundFooter = () => {
  const { driverId } = useParams();
  const [exportShow, setExportShow] = useState(false);
  const [option1, setOption1] = useState(""); // For Select Print or Email
  const [option2, setOption2] = useState(""); // For select User or Driver
  const [excelSelectionOption, setExcelSelectionOption] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [loader, setLoader] = useState(false);

  const listingData = useSelector((state) => state.reserveFundsLog.listingData);
  const beginningDate = useSelector((state) => state.reserveFundsLog.beginningDate);
  const endDate = useSelector((state) => state.reserveFundsLog.endDate);
  const isBeginningDateValid = useSelector((state) => state.reserveFundsLog.isBeginningDateValid);
  const isEndDateValid = useSelector((state) => state.reserveFundsLog.isEndDateValid);
  const description = useSelector((state) => state.reserveFundsLog.description);
  const reserveFundId = useSelector((state) => state.reserveFundsLog.reserveFundId);

  const handleOption1Change = (event) => {
    const { value } = event.target;
    setOption1(event.target.value);
    if (value === "print") {
      setOption2("");
      handleExcelSelection();
      setExcelSelectionOption(false);
    }
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const handleExcelSelection = (event) => {
    if (option1 === "print") {
      setExcelSelectionOption(false);
    } else {
      setExcelSelectionOption((prevChecked) => !prevChecked);
    }
  };

  const handlePrint = () => {
    setExportShow(true);
  };

  const setDataForEmail = () => {
    const type = option1 === "email" ? (excelSelectionOption ? "emailExcel" : "emailPdf") : "display";
    const emailTo = option1 === "email" ? (option2 === "user" ? "user" : "driver") : "";

    setTimeout(() => {
      ReserveFundsLogService.setReserveFundLogRecords(
        driverId,
        type,
        emailTo,
        -1,
        beginningDate,
        endDate,
        description
      )
        .then(({ data }) => {
          if (data.errorCode === 1) {
            toast.error(data.errorMessage);
          } else {
            toast.success(data.errorMessage);
            if (type === "display") {
              setShowPreview(true);
              setBase64PDF(data.fileContent);
            }
            setOption1("");
            setOption2("");
          }
        })
        .finally(() => {
          setLoader(false);
        });
    }, 50);
  };

  const handleExport = () => {
    setLoader(true);
    setDataForEmail();
    setExportShow(false);
    setOption1("");
    setOption2("");
    setExcelSelectionOption(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border border-dark border-2 border-bottom-0  border-left-0">
      <div className="d-flex align-items-center flex-wrap m-r-10" style={{ height: "36px" }}></div>
      <div className="d-flex align-items-center flex-wrap">
        <div md={2} className="d-flex align-items-center justify-content-end  flex-wrap">
          <button
            className="btn btn-secondary btn-sm font-12 customButtonMediumWidth  btn-sm m-l-0 m-r-15 m-b-0"
            type=""
            onClick={handlePrint}
            disabled={
              !listingData.length ||
              !isBeginningDateValid ||
              !isEndDateValid ||
              !beginningDate ||
              !endDate ||
              (description && !reserveFundId)
            }
          >
            Export
          </button>
        </div>

        <ExportModal
          show={exportShow}
          title="Export Option"
          onHide={() => {
            setExportShow(false);
            setOption1("");
            setOption2("");
            setExcelSelectionOption(false);
          }}
          option1={option1}
          option2={option2}
          excelSelectionOption={excelSelectionOption}
          onOption1Change={handleOption1Change}
          onOption2Change={handleOption2Change}
          handleExcelSelection={handleExcelSelection}
          isExcelselectionEnabled={true}
          exportHandler={handleExport}
          disabled={!option1 || (option1 !== "print" && !option2)}
        />
        <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReserveFundFooter;
