import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InvoiceInquiryNonUnitSelectionContent from "./InvoiceInquiryNonUnitSelectionContent";
import {
  setPreviousURL,
  resetFields,
  setCompanyFK,
  setCompanyName,
  setInvoiceById,
  setInvoiceData,
  setInvoicePK,
  setMiscellaniousFlag,
  setNonUnitCancel,
  setNonUnitData,
  setViewDetail,
  setPageNumberNonUnit,
  setNavigateToMainPage,
  setInvoiceNumber,
  setUnitNumberLast5,
  setUnitNumber,
  setUnitId,
  setSearchCriteria,
  setSearchTerm,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";

const InvoiceInquiryNonUnitSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const pageNumberNonUnit = useSelector((state) => state.invoiceInquiryReducer.pageNumberNonUnit);
  const companyName = useSelector((state) => state.invoiceInquiryReducer.companyName);
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
    <QuarterScreenWrapper style={{ height: "500px" }}>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate(`/`);
            dispatch(resetFields());
            dispatch(setPreviousURL(""));
            dispatch(setNavigateToMainPage(true));
          }}
        >
          Close
        </button>
      </div>
      <>
        <InvoiceInquiryNonUnitSelectionContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setMiscellaniousFlag(true));
              dispatch(setViewDetail(true));
              dispatch(setCompanyName(companyName));
              navigate(`/invoice-inquiry/unit-confirmation/${invoicePK}/${pageNumberNonUnit}`);
              dispatch(setInvoicePK(invoicePK));
            }}
            disabled={!invoicePK}
          >
            Next
          </button>

          <ButtonComponent
            route={"/invoice-inquiry/invoice-unit-selection"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            // hidden={!id || viewDetail === false}
            onClick={() => {
              dispatch(setNonUnitCancel(true));
              dispatch(setNonUnitData([]));
              dispatch(setInvoiceById([]));
              dispatch(setInvoiceData([]));
              dispatch(setInvoicePK(null));
              dispatch(setInvoiceNumber(""));
              dispatch(setUnitNumberLast5(""));
              dispatch(setUnitNumber(""));
              dispatch(setUnitId(null));
              dispatch(setPreviousURL(""));
              dispatch(setPageNumberNonUnit(0));
              dispatch(setSearchCriteria(""));
              dispatch(setSearchTerm(""));
              dispatch(setCompanyFK(null));
            }}
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};
export default InvoiceInquiryNonUnitSelection;
