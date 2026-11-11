import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCancelTrue,
  setViewDetail,
  setPreviousURL,
  setCancelUnitSelection,
  setNavigateToMainPage,
  setNonUnitData,
  setInvoiceNumberNonUnit,
  setUnitNumberNonUnit,
  setPoNumber,
  setDealerId,
  setSelectedCustomerId,
  setSortValueNonUnit,
  setSortTypeNonUnit,
  setCustomerName,
  setDealerName,
  setInvoiceNumberForDriverInvoice,
  setUnitNumberForDriverInvoice,
  setUnitLast5ForDriverInvoice,
  setNonUnitNumberForDriverInvoice,
  setFirstName,
  setLastName,
  setDriverFK,
  setUnitIdForDriverInvoice,
  setSearchCriteriaForDriverInvoice,
  setSearchTermForDriverInvoice,
  setCompanyFK,
  setInvoicePK,
  setSearchTerm,
  setSearchCriteria,
  setInvoiceData,
  setSelectedCompanyName,
  setLocalCompany,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";
import InvoiceInquiryUnitSelectionContent from "./InvoiceInquiryUnitSelectionContent";
import { getCurrentCompany } from "../../../../utils/utils";

const InvoiceInquiryUnitSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const pageNumber = useSelector((state) => state.invoiceInquiryReducer.pageNumber);
  const invoiceVoided = useSelector((state) => state.invoiceInquiryReducer.invoiceVoided);
  const invoiceCorrected = useSelector((state) => state.invoiceInquiryReducer.invoiceCorrected);

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
            navigate(`/`);
            dispatch(setCompanyFK(null));
          }}
        >
          Close
        </button>
      </div>
      <InvoiceInquiryUnitSelectionContent />
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => {
              navigate(`/invoice-inquiry/invoice-driver-selection`);
              dispatch(setNavigateToMainPage(false));
              dispatch(setNonUnitData([]));
              dispatch(setInvoiceNumberNonUnit(""));
              dispatch(setUnitNumberNonUnit(""));
              dispatch(setPoNumber(""));
              dispatch(setDealerId(null));
              dispatch(setSelectedCustomerId(null));
              dispatch(setSortValueNonUnit(""));
              dispatch(setSortTypeNonUnit(false));
              dispatch(setCustomerName(""));
              dispatch(setDealerName(""));
              dispatch(setInvoiceNumberForDriverInvoice(""));
              dispatch(setUnitNumberForDriverInvoice(""));
              dispatch(setUnitLast5ForDriverInvoice(""));
              dispatch(setNonUnitNumberForDriverInvoice(""));
              dispatch(setFirstName(""));
              dispatch(setLastName(""));
              dispatch(setDriverFK(null));
              dispatch(setUnitIdForDriverInvoice(null));
              dispatch(setSearchCriteriaForDriverInvoice(""));
              dispatch(setSearchTermForDriverInvoice(""));
            }}
          >
            Driver
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => {
              navigate(`/invoice-inquiry/invoice-non-unit-selection`);
              dispatch(setNavigateToMainPage(false));
              dispatch(setNonUnitData([]));
              dispatch(setInvoiceNumberNonUnit(""));
              dispatch(setUnitNumberNonUnit(""));
              dispatch(setPoNumber(""));
              dispatch(setDealerId(null));
              dispatch(setSelectedCustomerId(null));
              dispatch(setSortValueNonUnit(""));
              dispatch(setSortTypeNonUnit(false));
              dispatch(setCustomerName(""));
              dispatch(setDealerName(""));
              dispatch(setInvoiceNumberForDriverInvoice(""));
              dispatch(setUnitNumberForDriverInvoice(""));
              dispatch(setUnitLast5ForDriverInvoice(""));
              dispatch(setNonUnitNumberForDriverInvoice(""));
              dispatch(setFirstName(""));
              dispatch(setLastName(""));
              dispatch(setDriverFK(null));
              dispatch(setUnitIdForDriverInvoice(null));
            }}
          >
            Non Unit
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setViewDetail(true));
              navigate(`/invoice-inquiry/unit-confirmation/${invoicePK}/${pageNumber}`);
              dispatch(setNavigateToMainPage(false));
            }}
            disabled={!invoicePK}
          >
            Next
          </button>

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              dispatch(setCancelTrue(true));
              dispatch(setCancelUnitSelection());
              let currentCompany = getCurrentCompany();
              dispatch(setSelectedCompanyName(currentCompany?.name));
              dispatch(setLocalCompany(currentCompany?.localCompany));
              dispatch(setCompanyFK(currentCompany?.companyPK));

              dispatch(setInvoicePK(null));
              dispatch(setSearchTerm(""));
              dispatch(setSearchCriteria(""));
              dispatch(setInvoiceData([]));
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

export default InvoiceInquiryUnitSelection;
