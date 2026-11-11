import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import InvoiceNonUnitSelectionContent from "./InvoiceNonUnitSelectionContent";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  setCompanyFK,
  setCompanyName,
  setInvoiceById,
  setInvoiceData,
  setInvoiceNumber,
  setInvoicePK,
  setMiscellaniousFlag,
  setNonUnitCancel,
  setNonUnitData,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitSelectionReset,
  setViewDetail,
} from "../../../../redux/Invoicing/EditInvoiceSlice";

const InvoiceNonUnitSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const pageNumberNonUnit = useSelector((state) => state.editInvoiceReducer.pageNumberNonUnit);
  const companyName = useSelector((state) => state.editInvoiceReducer.companyName);
  const companyFK = useSelector((state) => state.editInvoiceReducer.companyFK);
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
            dispatch(setUnitSelectionReset(false));
          }}
        >
          Close
        </button>
      </div>
      <>
        <InvoiceNonUnitSelectionContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setMiscellaniousFlag(true));
              dispatch(setViewDetail(true));
              dispatch(setCompanyFK(companyFK));
              dispatch(setCompanyName(companyName));
              dispatch(setInvoiceData([]));
              navigate(`/edit-invoice/add/non-unit/${invoicePK}/${pageNumberNonUnit}`);
            }}
            disabled={!invoicePK}
          >
            Next
          </button>

          <ButtonComponent
            route={"/edit-invoice/invoice-unit-selection"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              dispatch(setNonUnitCancel(true));
              dispatch(setNonUnitData([]));
              dispatch(setInvoiceById([]));
              dispatch(setInvoiceData([]));
              dispatch(setInvoicePK(null));
              dispatch(setUnitNumber(""));
              dispatch(setInvoiceNumber(""));
              dispatch(setUnitNumberLast5(""));
              dispatch(resetFields());
              dispatch(setUnitSelectionReset(false));
            }}
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};
export default InvoiceNonUnitSelection;
