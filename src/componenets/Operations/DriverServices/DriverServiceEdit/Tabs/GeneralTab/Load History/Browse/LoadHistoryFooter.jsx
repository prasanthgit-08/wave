import React, { useState } from "react";
import ButtonComponent from "../../../../../../../common/Button";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadHistoryService from "../../../../../../../../services/LoadHistoryService";
import PreviewPopup from "../../../../../../../common/PreviewPopup";
import toast from "react-hot-toast";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function LoadHistoryFooter() {
  const { driverId } = useParams();
  const historyData = useSelector((state) => state.loadHistory.historyData);
  const toDate = useSelector((state) => state.loadHistory.toDate);
  const fromDate = useSelector((state) => state.loadHistory.fromDate);
  const toDateValid = useSelector((state) => state.loadHistory.toDateValid);
  const fromDateValid = useSelector((state) => state.loadHistory.fromDateValid);

  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [loading, setLoading] = useState(false);

  const disabled = historyData?.length < 1 || !(toDate && fromDate && toDateValid && fromDateValid);
  const generate = (type) => {
    setLoading(true);
    LoadHistoryService.generateReport(driverId, type, toDate, fromDate)
      .then(({ data }) => {
        if (data.errorCode === 0) {
          if (type === "display") {
            setShowPreview(true);
            setBase64PDF(data?.content);
          } else {
            toast.success("Mail sent Successfully");
          }
        } else {
          toast.error("Error while generating report.");
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Error while generating report.");
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          disabled={disabled}
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 `}
          type="button"
          onClick={() => {
            generate("display");
          }}
        >
          Display
        </button>

        <button
          disabled={disabled}
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 `}
          type="button"
          onClick={() => {
            generate("emailExcel");
          }}
        >
          Email Excel
        </button>

        <button
          disabled={disabled}
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 `}
          type="button"
          onClick={() => {
            generate("emailPdf");
          }}
        >
          Email PDF
        </button>
        {loading && <LoadingIcon></LoadingIcon>}
        <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
      </div>
    </div>
  );
}

export default LoadHistoryFooter;
