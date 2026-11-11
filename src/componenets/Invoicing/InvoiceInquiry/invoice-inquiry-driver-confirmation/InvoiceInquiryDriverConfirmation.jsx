import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoicePK,
  setViewDetail,
  setPreviousURL,
  resetFields,
  setNavigateToMainPage,
  setDriverFK,
  setSearchTerm,
  setSearchCriteria,
  setCompanyFK,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";
import InvoiceInquiryDriverConfirmationContent from "./InvoiceInquiryDriverConfirmationContent";

const InvoiceInquiryDriverConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const navigateToMainPage = useSelector((state) => state.invoiceInquiryReducer.navigateToMainPage);

  useEffect(() => {
    if (navigateToMainPage) {
      navigate("/invoice-inquiry/invoice-unit-selection");
    }
  }, []);

  useEffect(() => {
    dispatch(setPreviousURL(window.location.href));
  }, []);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            dispatch(setPreviousURL(""));
            navigate(`/`);
            dispatch(resetFields());
            dispatch(setNavigateToMainPage(true));
          }}
        >
          Close
        </button>
      </div>
      <>
        <InvoiceInquiryDriverConfirmationContent />
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
            onClick={() => navigate(`/invoice-inquiry/invoice-driver-selection`)}
          >
            Back
          </button>

          <ButtonComponent
            route={"/invoice-inquiry/invoice-unit-selection"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              dispatch(setPreviousURL(""));
              dispatch(setInvoicePK(null));
              dispatch(setDriverFK(null));
              dispatch(setSearchTerm(""));
              dispatch(setSearchCriteria(""));
              dispatch(setCompanyFK(null));
            }}
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default InvoiceInquiryDriverConfirmation;
