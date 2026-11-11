import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCancelTrue,
  setInvoiceData,
  setInvoicePK,
  setViewDetail,
  setPreviousURL,
  setFirstName,
  setLastName,
  resetFields,
  setNavigateToMainPage,
  setCompanyFK,
  setSearchTerm,
  setSearchCriteria,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";
import InvoiceInquiryDriverSelectionContent from "./InvoiceInquiryDriverSelectionContent";

const InvoiceInquiryDriverSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const pageNumber = useSelector((state) => state.invoiceInquiryReducer.pageNumber);
  const navigateToMainPage = useSelector((state) => state.invoiceInquiryReducer.navigateToMainPage);

  useEffect(() => {
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
            dispatch(setPreviousURL(""));
            navigate(`/`);
            dispatch(resetFields());
            dispatch(setNavigateToMainPage(true));
          }}
        >
          Close
        </button>
      </div>
      <InvoiceInquiryDriverSelectionContent />
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setViewDetail(true));
              navigate(`/invoice-inquiry/driver-confirmation/${invoicePK}/${pageNumber}`);
              dispatch(setNavigateToMainPage(false));
            }}
            disabled={!invoicePK}
          >
            Next
          </button>

          <ButtonComponent
            route={"/invoice-inquiry/invoice-unit-selection"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              dispatch(setCancelTrue(true));
              dispatch(setInvoicePK(null));
              dispatch(setInvoiceData([]));
              dispatch(setPreviousURL(""));
              dispatch(setFirstName(""));
              dispatch(setLastName(""));
              dispatch(setCompanyFK(null));
              dispatch(setSearchCriteria(""));
              dispatch(setSearchTerm(""));
              // Set cancelTrue back to false after a short delay
              setTimeout(() => {
                dispatch(setCancelTrue(false));
              }, 0);
            }}
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default InvoiceInquiryDriverSelection;
