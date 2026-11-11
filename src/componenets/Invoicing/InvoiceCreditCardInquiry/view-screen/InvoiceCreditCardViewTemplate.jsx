import React, { useState } from "react";
import { InvoiceCreditCardView } from "./InvoiceCreditCardView";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import {
  updateField,
  updateMultipleFields,
  resetFields,
  setCreditCardEnquiryView,
} from "../../../../redux/Invoicing/CreditCardEnquirySlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReportsFooter from "../../../common/ReportsFooter";
import CreditCardEnquiryService from "../../../../services/Invoicing/CreditCardEnquiryService";
import PreviewPopup from "../../../common/PreviewPopup";

function InvoiceCreditCardViewTemplate() {
  const searchCriteria = useSelector((state) => state.creditCardEnquirySlice.searchCriteria);
  const selectedPK = useSelector((state) => state.creditCardEnquirySlice.selectedPK);
  const selectedId = useSelector((state) => state.creditCardEnquirySlice.selectedId);

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Cancel
  const handleCancelShow = () => {
    navigate(`/credit-card-enquiry/selection`);
    dispatch(resetFields());
    toast.success("Selection Cancelled");
  };

  // Close
  const handleClose = () => {
    navigate(`/`);
    dispatch(resetFields());
  };

  const getInvInqCreditCardReport = (type) => {
    setLoading(true);
    CreditCardEnquiryService.getReports(selectedPK, type, selectedId)
      .then((response) => {
        const { data } = response;
        if (data?.errorCode === 1) {
          toast.error(data?.errorMessage);
        } else {
          toast.success(data?.errorMessage);
          if (data?.fileContent) {
            setShowPreview(true);
            setBase64PDF(data?.fileContent);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      <>
        <InvoiceCreditCardView />
      </>
      <ReportsFooter
        hideDisplay
        emailExcelDisabled={loading}
        emailPdfDisabled={loading}
        printDisabled={loading}
        cancelDisabled={loading}
        onEmailExcelClick={() => getInvInqCreditCardReport("emailExcel")}
        onEmailPdfClick={() => getInvInqCreditCardReport("emailPdf")}
        onPrintClick={() => getInvInqCreditCardReport("display")}
        onCancelClick={handleCancelShow}
      />

      {loading && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
           
        </div>
      )}

      <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
    </QuarterScreenWrapper>
  );
}

export default InvoiceCreditCardViewTemplate;
