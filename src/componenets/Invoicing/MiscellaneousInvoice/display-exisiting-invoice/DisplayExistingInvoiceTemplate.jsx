import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import DisplayExistingInvoiceContent from "./DisplayExistingInvoiceContent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  resetCreditCardStates,
  resetCustomerDealer,
  resetDetailsandTextTabValues,
  resetExistingMiscellaneous,
  setChangeColor,
  setCompanyName,
  setCompanyPaperworkFiles,
  setCustomerPaperworkFiles,
  setId,
  setInvoiceSisterCustomer,
  setIsLocalCompany,
  setIsNonUnitNumberPresent,
  setIsRequirePO,
  setIsSisterCompany,
  setMiscInvoiceData,
  setMiscInvoiceFiles,
  setMiscInvoiceFormData,
  setNotCrossCompany,
  setNotCrossCompanydata2,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedOption,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberPK,
  setViewDetail,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";

function DisplayExistingInvoiceTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const viewDetail = useSelector((state) => state.miscInvoiceReducer.viewDetail);
  const isSisterCompany = useSelector((state) => state.miscInvoiceReducer.isSisterCompany);
  const localCompanyName = useSelector((state) => state.miscInvoiceReducer.localCompanyName);
  const notCrossCompany = useSelector((state) => state.miscInvoiceReducer.notCrossCompany);

  /****
   * used to solve the isse related to close and back button
   * *****/
  window.addEventListener("popstate", () => {
    navigate(`/misc-invoice-unitselection`);
  });

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={(e) => {
            navigate(`/`);
            dispatch(setId(null));
            dispatch(setViewDetail(false));
            dispatch(setPageNumber(0));
            dispatch(setSearchTerm(""));
            dispatch(setUnitNumberPK(null));
            dispatch(setUnitNumber(""));
            dispatch(setSearchCriteria(""));
            dispatch(setUnitNumberLast5(""));
            dispatch(resetCustomerDealer());
            dispatch(setCustomerPaperworkFiles([]));
            dispatch(setCompanyPaperworkFiles([]));
            dispatch(setViewDetail(false));
            dispatch(setMiscInvoiceFormData(null));
            dispatch(setMiscInvoiceData([]));
            dispatch(resetDetailsandTextTabValues());
            dispatch(setIsSisterCompany(false));
            dispatch(setInvoiceSisterCustomer(false));
            dispatch(resetChanges());
            dispatch(resetCreditCardStates());
            dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
            dispatch(setIsLocalCompany(false));
            dispatch(setNotCrossCompany([]));
            dispatch(setCompanyName(localCompanyName));
            dispatch(resetExistingMiscellaneous());
            dispatch(setSelectedOption("Customer"));
            dispatch(setNotCrossCompanydata2([]));
          }}
        >
          Close
        </button>
      </div>
      <>
        <DisplayExistingInvoiceContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              navigate(`/misc-invoice-details/${id}`);
            }}
          >
            Next
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              if (id && !isSisterCompany && notCrossCompany.ScreenId === 2) {
                navigate(`/misc-invoice-unitcon-nocross-noalter/${id}`);
              } else if (id && !isSisterCompany && notCrossCompany.ScreenId === 1) {
                navigate(`/misc-invoice-not-cross-alternate-customer/${id}`);
              } else if (id && isSisterCompany) {
                navigate(`/misc-invoice-unitcon-cross/${id}`);
              }
            }}
          >
            Back
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              dispatch(setViewDetail(false));
              dispatch(resetDetailsandTextTabValues());
              dispatch(resetCustomerDealer());
              dispatch(setIsNonUnitNumberPresent(false));
              dispatch(resetExistingMiscellaneous());
              dispatch(resetCreditCardStates());
              dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
              dispatch(setSelectedOption("Customer"));
              navigate(`/misc-invoice-unitselection`);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </QuarterScreenWrapper>
  );
}

export default DisplayExistingInvoiceTemplate;
