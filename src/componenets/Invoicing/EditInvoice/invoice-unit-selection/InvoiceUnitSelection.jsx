import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import InvoiceUnitSelectionContent from "./InvoiceUnitSelectionContent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceData,
  setInvoicePK,
  setNonUnitData,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
  resetFields,
  setUnitSelectionReset,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberId,
  setInvoiceNumber,
  setSortValue,
  setSortType,
  setPageNumber,
  setSelectedCompanyName,
  setCompanyFK,
  toggleCancelChanges,
} from "../../../../redux/Invoicing/EditInvoiceSlice";

const InvoiceUnitSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const pageNumber = useSelector((state) => state.editInvoiceReducer.pageNumber);
  const invoiceData = useSelector((state) => state.editInvoiceReducer.invoiceData);
  const unitSelectionReset = useSelector((state) => state.editInvoiceReducer.unitSelectionReset);
  useEffect(() => {
    if (!unitSelectionReset) {
      navigate(`/edit-invoice/invoice-unit-selection`);
    }
  }, [unitSelectionReset]);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate(`/`);
            dispatch(resetFields());
          }}
        >
          Close
        </button>
      </div>
      <InvoiceUnitSelectionContent />
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => {
              dispatch(setInvoicePK(null));
              navigate(`/edit-invoice/invoice-non-unit-selection`);
              dispatch(setUnitSelectionReset(true));
            }}
          >
            Non Unit
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setViewDetail(true));
              dispatch(setNonUnitData([]));
              dispatch(setUnitSelectionReset(true));
              navigate(`/edit-invoice/add/${invoicePK}/${pageNumber}`);
            }}
            disabled={!invoicePK || invoiceData?.length === 0}
          >
            Next
          </button>

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              dispatch(setInvoicePK(null));
              dispatch(setInvoiceData([]));
              dispatch(setSearchTerm(""));
              dispatch(setSearchCriteria(""));
              dispatch(setUnitNumber(""));
              dispatch(setUnitNumberLast5(""));
              dispatch(setUnitNumberId(null));
              dispatch(setInvoiceNumber(""));
              dispatch(setNonUnitData([]));
              dispatch(setSortValue(""));
              dispatch(setSortType(false));
              dispatch(setPageNumber(0));
              dispatch(setSelectedCompanyName(""));
              dispatch(setCompanyFK(null));
              dispatch(toggleCancelChanges());
            }}
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default InvoiceUnitSelection;
