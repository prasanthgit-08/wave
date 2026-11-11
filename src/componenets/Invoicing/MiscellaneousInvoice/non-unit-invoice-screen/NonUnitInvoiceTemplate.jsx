import React, { useEffect } from "react";
import NonUnitInvoiceContent from "./NonUnitInvoiceContent";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  resetCreditCardStates,
  resetCustomerDealer,
  resetDetailsandTextTabValues,
  resetExistingMiscellaneous,
  setCompanyPaperworkFiles,
  setCustomerPaperworkFiles,
  setId,
  setIsNonUnitNumberPresent,
  setIsRequirePO,
  setMiscInvoiceData,
  setMiscInvoiceFiles,
  setMiscInvoiceFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberPK,
  setViewDetail,
  setInvoiceSisterCustomer,
  setIsSisterCompany,
  setCompanyName,
  setSelectedOption,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";

function NonUnitInvoiceTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.miscInvoiceReducer.customerId);
  const dealerId = useSelector((state) => state.miscInvoiceReducer.dealerId);
  const isNonUnitNumberPresent = useSelector((state) => state.miscInvoiceReducer.isNonUnitNumberPresent);
  const isRequirePO = useSelector((state) => state.miscInvoiceReducer.isRequirePO);
  const nonUnitNumber = useSelector((state) => state.miscInvoiceReducer.nonUnitNumber);
  const poNumber = useSelector((state) => state.miscInvoiceReducer.poNumber);
  const viewDetail = useSelector((state) => state.miscInvoiceReducer.viewDetail);
  const localCompanyName = useSelector((state) => state.miscInvoiceReducer.localCompanyName);
  useEffect(() => {
    if (!viewDetail) {
      navigate(`/misc-invoice-unitselection`);
    }
  }, [viewDetail]);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={(e) => {
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
            dispatch(setIsNonUnitNumberPresent(false));
            dispatch(setIsRequirePO(false));
            dispatch(resetCreditCardStates());
            dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
            dispatch(setIsSisterCompany(false));
            dispatch(setInvoiceSisterCustomer(false));
            dispatch(setCompanyName(localCompanyName));
            dispatch(resetChanges());
            dispatch(setSelectedOption("Customer"));
            navigate(`/`);
          }}
        >
          Close
        </button>
      </div>
      <>
        <NonUnitInvoiceContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              navigate(`/misc-invoice-details`);
            }}
            disabled={!customerId || !dealerId || !isNonUnitNumberPresent || (isRequirePO && !poNumber)}
          >
            Next
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              navigate(`/misc-invoice-unitselection`);
            }}
          >
            Back
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              dispatch(setIsNonUnitNumberPresent(false));
              dispatch(setIsRequirePO(false));
              dispatch(resetDetailsandTextTabValues());
              dispatch(resetExistingMiscellaneous());
              dispatch(setViewDetail(false));
              dispatch(resetCustomerDealer());
              dispatch(setCustomerPaperworkFiles([]));
              dispatch(setCompanyPaperworkFiles([]));
              dispatch(setMiscInvoiceFormData(null));
              dispatch(resetCreditCardStates());
              dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
              dispatch(setIsSisterCompany(false));
              dispatch(setInvoiceSisterCustomer(false));
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

export default NonUnitInvoiceTemplate;
