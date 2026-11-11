import React, { useEffect } from "react";
import InvoiceUnitConfirmationContent from "./InvoiceUnitConfirmationContent";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceById,
  setInvoiceData,
  setInvoiceNumber,
  setNonUnitData,
  setUnitNumber,
  setUnitNumberLast5,
  setViewDetail,
  resetFields,
  setUnitSelectionReset,
} from "../../../../redux/Invoicing/EditInvoiceSlice";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";

const InvoiceUnitConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useAppNavigate();
  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const unitSelectionReset = useSelector((state) => state.editInvoiceReducer.unitSelectionReset);

  const location = useLocation();
  const isNonUnit = location?.pathname?.includes("non-unit");

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
        <InvoiceUnitConfirmationContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              goBack();
            }}
          >
            Back
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setViewDetail(true));
              navigate(`/edit-invoice-information/${invoicePK}`);
            }}
          >
            Next
          </button>

          <ButtonComponent
            route={
              !isNonUnit ? "/edit-invoice/invoice-unit-selection" : "/edit-invoice/invoice-non-unit-selection"
            }
            onClick={() => {
              if (!isNonUnit) {
                dispatch(setInvoiceNumber(""));
                dispatch(setUnitNumber(""));
                dispatch(setUnitNumberLast5(""));
                dispatch(setInvoiceData([]));
                dispatch(setInvoiceById([]));
                dispatch(setNonUnitData([]));
                dispatch(resetFields());
                dispatch(setUnitSelectionReset(false));
              } else {
                dispatch(resetFields());
              }
            }}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default InvoiceUnitConfirmation;
