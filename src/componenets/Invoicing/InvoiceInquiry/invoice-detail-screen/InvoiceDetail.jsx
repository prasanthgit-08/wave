import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  setAmountForCreditCard,
  setInvoiceDetailPK,
  setLastName,
  setFirstName,
  setInvoiceDetailsData,
  setViewDetail,
  setPreviousURL,
  setInvoicePK,
  setNavigateToMainPage,
  setInvoiceNumber,
  setInvoiceData,
  setSearchTerm,
  setUnitNumberLast5,
  setUnitNumber,
  setUnitId,
  setDriverFK,
  setCompanyFK,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import InvoiceDetailContent from "./InvoiceDetailContent";

const InvoiceDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.invoiceInquiryReducer.viewDetail);
  const invoiceDetailPK = useSelector((state) => state.invoiceInquiryReducer.invoiceDetailPK);
  const invoiceDetailsData = useSelector((state) => state.invoiceInquiryReducer.invoiceDetailsData);
  const invoiceById = useSelector((state) => state.invoiceInquiryReducer.invoiceById);
  const [cancelShow, setCancelShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);
  const previousURL = useSelector((state) => state.invoiceInquiryReducer.previousURL);

  //cancel
  const handleCancelShow = () => {
    if (viewDetail) {
      dispatch(setInvoiceDetailPK(null));
      dispatch(setInvoicePK(null));
      dispatch(setInvoiceNumber(""));
      dispatch(setUnitNumberLast5(""));
      dispatch(setUnitNumber(""));
      dispatch(setUnitId(null));
      dispatch(setFirstName(""));
      dispatch(setLastName(""));
      dispatch(setDriverFK(""));
      dispatch(setInvoiceData([]));
      dispatch(setSearchTerm(""));
      dispatch(setInvoiceDetailsData([]));
      navigate("/invoice-inquiry/invoice-unit-selection");
      setCancelShow(false);
      dispatch(setPreviousURL(""));
      dispatch(setCompanyFK(null));
    } else {
      setCancelShow(true);
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setViewDetail(true));
    toast.success("Changes Cancelled");
    setCancelShow(false);
  };

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(resetFields());
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    toast.success("Page Closed");
    dispatch(resetFields());
    dispatch(setPreviousURL(""));
  };

  useEffect(() => {
    const totalAmountSum = invoiceDetailsData?.reduce((sum, record) => {
      const amount = Number(record.totalAmount) || 0; // Convert to number or default to 0
      return sum + amount;
    }, 0);
    dispatch(setAmountForCreditCard(totalAmountSum - invoiceById[0]?.invoiceAmount));
  }, [invoiceDetailsData]);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={onHandleCloseShow}
          >
            Close
          </button>
        </div>
        <>
          <InvoiceDetailContent />
        </>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
          <div className="d-flex align-items-center flex-wrap">
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type="button"
              onClick={() => {
                if (previousURL?.includes("unit-confirmation")) {
                  navigate(`/invoice-inquiry-unit-export`);
                } else {
                  navigate(`/invoice-inquiry-driver-export`);
                }
                dispatch(setNavigateToMainPage(false));
              }}
            >
              Next
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              onClick={handleCancelShow}
            >
              Cancel
            </button>

            <ModalComponent
              show={cancelShow}
              onHide={handleCancelNo}
              title={"Cancel Editing Invoice Inquiry"}
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
      </div>
    </div>
  );
};

export default InvoiceDetail;
