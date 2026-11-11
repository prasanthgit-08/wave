import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  resetFields,
  setInvoiceById,
  setInvoicePK,
  setInvoiceData,
  setInvoiceNumber,
  setUnitId,
  setUnitNumber,
  setUnitNumberLast5,
  setSearchTerm,
  setSearchCriteria,
  setDriverFK,
  setFirstName,
  setLastName,
  setEmailArray,
} from "../../../../../redux/Invoicing/InvoiceInquirySlice";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import DriverExportContent from "./DriverExportContent";
import ModalComponent from "../../../../common/ModalComponent";
import { setEmail } from "../../../../../redux/Invoicing/InvoiceInquirySlice";
import InvoiceInquiryService from "../../../../../services/Invoicing/InvoiceInquiryService";
import PreviewPopup from "../../../../common/PreviewPopup";
import LoadingIcon from "../../../../common/LoadingIcon";

const DriverExport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);

  const printDriver = useSelector((state) => state.invoiceInquiryReducer.printDriver);
  const emailToDriver = useSelector((state) => state.invoiceInquiryReducer.emailToDriver);
  const emailArrayDriver = useSelector((state) => state.invoiceInquiryReducer.emailArrayDriver);
  const emailToUserDriver = useSelector((state) => state.invoiceInquiryReducer.emailToUserDriver);
  const companyFK = useSelector((state) => state.invoiceInquiryReducer.companyFK);
  const driverExportFlag = useSelector((state) => state.invoiceInquiryReducer.driverExportFlag);
  const [cancelShow, setCancelShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(false);

  //cancel
  const handleCancelShow = () => {
    setCancelShow(true);
  };

  window.addEventListener("popstate", () => {
    dispatch(setInvoiceData([]));
    dispatch(setInvoicePK(null));
    dispatch(setInvoiceNumber(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setUnitNumber(""));
    dispatch(setUnitId(null));
    dispatch(setInvoiceById([]));
    dispatch(setSearchCriteria(""));
    dispatch(setSearchTerm(""));
    dispatch(setDriverFK(null));
    dispatch(setFirstName(""));
    dispatch(setLastName(""));

    navigate("/invoice-inquiry/invoice-unit-selection");
  });

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    toast.success("Changes Cancelled");
    dispatch(setInvoiceData([]));
    dispatch(setInvoicePK(null));
    dispatch(setInvoiceNumber(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setUnitNumber(""));
    dispatch(setUnitId(null));
    dispatch(setInvoiceById([]));
    dispatch(setSearchCriteria(""));
    dispatch(setSearchTerm(""));
    dispatch(setDriverFK(null));
    dispatch(setFirstName(""));
    dispatch(setLastName(""));
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
  };
  //save
  const payload = {
    print: printDriver,
    emailToDriver,
    emailToCustomer: false,
    emailToUser: emailToUserDriver,
    emailArray: emailArrayDriver,
    companyFK,
    primaryKey: invoicePK,
  };

  const onEXport = () => {
    setLoading(true);
    InvoiceInquiryService.export(payload)
      .then((response) => {
        if (printDriver) {
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
          navigate("/invoice-inquiry/invoice-unit-selection");
          dispatch(resetFields());
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(resetFields());
        console.error("Export failed:", error);
        toast.error("Export failed.");
      });
  };

  const hidepopup = () => {
    setShowPreview(false);
    toast.success("Export successful");
    navigate("/invoice-inquiry/invoice-unit-selection");
    dispatch(resetFields());
  };

  return (
    <QuarterScreenWrapper>
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            dispatch(setEmailArray(""));
            onHandleCloseShow();
          }}
        >
          Close
        </button>
      </div>
      <>
        <DriverExportContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={onEXport}
            disabled={driverExportFlag}
          >
            Export
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setEmailArray(""));
              navigate(`/invoice-inquiry-detail/${invoicePK}`);
            }}
          >
            Back
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              dispatch(setEmailArray(""));
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
            body={"Please confirm you want to cancel your cahnges "}
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

export default DriverExport;
