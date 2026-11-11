import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import UnitExportContent from "./UnitExportContent";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetFields,
  setDetailChange,
  setInvoiceData,
  setEmail,
  setInvoicePK,
  setNavigateToMainPage,
  setInvoiceNumber,
  setUnitNumberLast5,
  setUnitNumber,
  setUnitId,
  setSearchTerm,
  setIncludeCustomerDocument,
  setIncludeCompanyDocument,
  setEmailToCustomer,
  setPrint,
  setEmailToUser,
} from "../../../../../redux/Invoicing/InvoiceInquirySlice";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import InvoiceInquiryService from "../../../../../services/Invoicing/InvoiceInquiryService";
import PreviewPopup from "../../../../common/PreviewPopup";
import LoadingIcon from "../../../../common/LoadingIcon";

const UnitExport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const invoiceDetailsData = useSelector((state) => state.invoiceInquiryReducer.invoiceDetailsData);
  const navigateToMainPage = useSelector((state) => state.invoiceInquiryReducer.navigateToMainPage);

  const print = useSelector((state) => state.invoiceInquiryReducer.print);
  const emailToCustomer = useSelector((state) => state.invoiceInquiryReducer.emailToCustomer);
  const includeCompanyDocument = useSelector((state) => state.invoiceInquiryReducer.includeCompanyDocument);
  const emailToUser = useSelector((state) => state.invoiceInquiryReducer.emailToUser);
  const includeCustomerDocument = useSelector((state) => state.invoiceInquiryReducer.includeCustomerDocument);
  const emailArray = useSelector((state) => state.invoiceInquiryReducer.emailArray);
  const companyFK = useSelector((state) => state.invoiceInquiryReducer.companyFK);
  const exportFlag = useSelector((state) => state.invoiceInquiryReducer.exportFlag);

  const [cancelShow, setCancelShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const changedArray = invoiceDetailsData?.filter(
      (invoice) =>
        invoice.description !== invoice.previousDescription ||
        invoice?.totalAmount !== invoice?.previousTotalAmount
    );
    dispatch(setDetailChange(changedArray));
  }, [invoiceDetailsData]);

  //cancel
  const handleCancelShow = () => {
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    toast.success("Changes Cancelled");
    dispatch(setEmail(""));
    dispatch(setInvoicePK(null));
    dispatch(setSearchTerm(""));
    dispatch(setInvoiceNumber(""));
    dispatch(setInvoiceData([]));
    dispatch(setUnitNumber(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setUnitId(null));

    dispatch(setIncludeCustomerDocument(false));
    dispatch(setEmailToUser(false));
    dispatch(setIncludeCompanyDocument(false));
    dispatch(setEmailToCustomer(false));
    dispatch(setPrint(false));
    setCancelShow(false);

    navigate("/invoice-inquiry/invoice-unit-selection");
  };

  const onHandleCloseShow = () => {
    setCloseShow(true);
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    toast.success("Page Closed");
    dispatch(resetFields());
    dispatch(setNavigateToMainPage(true));
  };

  useEffect(() => {
    if (navigateToMainPage) {
      navigate("/invoice-inquiry/invoice-unit-selection");
    }
  }, []);

  //save
  const payload = {
    print,
    emailToCustomer,
    emailToUser,
    isCompanyDocument: includeCompanyDocument,
    isCustomerDocument: includeCustomerDocument,
    emailArray,
    companyFK,
    primaryKey: invoicePK,
  };

  const onEXport = () => {
    setLoading(true);
    InvoiceInquiryService.export(payload)
      .then((response) => {
        if (print) {
          const attachments = response?.data[0]?.attachments;

          if (attachments && typeof attachments === "object") {
            const firstFileKey = Object.keys(attachments)[0];
            const fileBase64 = attachments[firstFileKey];
            if (fileBase64) {
              setFileContent(response?.data[0]?.attachments[firstFileKey]);
              setShowPreview(true);
              toast.success("Export successful, preview generated");
            } else {
              toast.error("No file content found");
            }
          } else {
            toast.error("Invalid Data");
          }
        } else {
          toast.success("Export successful");
          dispatch(setInvoiceData([]));
          dispatch(resetFields());
          navigate("/invoice-inquiry/invoice-unit-selection");
        }
      })
      .catch((error) => {
        dispatch(resetFields());
        console.error("Export failed:", error);
        toast.error("Export failed.");
      })
      .finally(() => setLoading(false));
  };

  const hidepopup = () => {
    setShowPreview(false);
    dispatch(setInvoiceData([]));
    dispatch(resetFields());
    navigate("/invoice-inquiry/invoice-unit-selection");
  };

  return (
    <QuarterScreenWrapper>
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""

          onClick={() => {
            dispatch(setEmail(""));
            onHandleCloseShow();
          }}
        >
          Close
        </button>
      </div>
      <>
        <UnitExportContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={onEXport}

            disabled={exportFlag}
          >
            Export
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setEmail(""));
              navigate(`/invoice-inquiry-detail/${invoicePK}`);
            }}
          >
            Back
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              handleCancelShow();
            }}
          >
            Cancel
          </button>

          <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} />

          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Invoice Inquiry"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />

          <ModalComponent
            show={closeShow}
            onHide={onHandleCloseNo}
            title={"Close Invoice Inquiry"}
            body="Please confirm you want to close the program without saving your changes"
            handleYES={onHandleCloseYes}
            handleNO={onHandleCloseNo}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default UnitExport;
