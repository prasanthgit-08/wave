import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InvoiceInquiryUnitConfirmationContent from "./InvoiceInquiryUnitConfirmationContent";
import {
  setPreviousURL,
  setInvoicePK,
  setViewDetail,
  resetFields,
  setNavigateToMainPage,
  setInvoiceNumber,
  setInvoiceData,
  setSearchTerm,
  setUnitNumberLast5,
  setUnitNumber,
  setUnitId,
  setCompanyFK,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";

const InvoiceInquiryUnitConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const previousURL = useSelector((state) => state.invoiceInquiryReducer.previousURL);
  const navigateToMainPage = useSelector((state) => state.invoiceInquiryReducer.navigateToMainPage);

  const [previousURLLocal, setPreviousURLLocal] = useState("");
  useEffect(() => {
    let url = previousURL;
    setPreviousURLLocal(url);
    dispatch(setPreviousURL(window.location.href));
  }, []);

  useEffect(() => {
    if (navigateToMainPage) {
      navigate("/invoice-inquiry/invoice-unit-selection");
    }
  }, []);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate(`/`);
            dispatch(resetFields());
            dispatch(setNavigateToMainPage(true));
          }}
        >
          Close
        </button>
      </div>
      <>
        <InvoiceInquiryUnitConfirmationContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setViewDetail(true));
              navigate(`/invoice-inquiry-detail/${invoicePK}`);
            }}
          >
            Next
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              if (previousURLLocal?.includes("/invoice-inquiry/invoice-unit-selection")) {
                navigate(`/invoice-inquiry/invoice-unit-selection`);
              } else {
                navigate(`/invoice-inquiry/invoice-non-unit-selection`);
              }
            }}
          >
            Back
          </button>

          <ButtonComponent
            route={"/invoice-inquiry/invoice-unit-selection"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              dispatch(setPreviousURL(""));
              dispatch(setInvoicePK(null));
              dispatch(setInvoiceNumber(""));
              dispatch(setInvoiceData([]));
              dispatch(setSearchTerm(""));
              dispatch(setUnitNumberLast5(""));
              dispatch(setUnitNumber(""));
              dispatch(setUnitId(null));
              dispatch(setCompanyFK(null));
            }}
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default InvoiceInquiryUnitConfirmation;
