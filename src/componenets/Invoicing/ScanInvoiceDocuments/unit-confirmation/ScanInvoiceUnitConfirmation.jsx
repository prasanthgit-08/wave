import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScanInvoiceUnitConfirmationContent from "./ScanInvoiceUnitConfirmationContent";
import {
  setUnitSelectionReset,
  updateField,
  resetFields,
} from "../../../../redux/Invoicing/ScanInvoiceSlice";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";

const ScanInvoiceUnitConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useAppNavigate();
  const { invoicePK, nonUnitData, unitSelectionReset } = useSelector((state) => state.scanInvoiceReducer);

  const location = useLocation();
  const isNonUnit = location?.pathname?.includes("non-unit");

  const updateEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  useEffect(() => {
    if (!unitSelectionReset) {
      navigate(`/scan-invoice/invoice-unit-selection`);
    }
  }, [unitSelectionReset]);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            updateEditData("nonUnitData", []);
            updateEditData("invoiceData", []);
            updateEditData("invoicePK", null);
            dispatch(setUnitSelectionReset(false));
            dispatch(resetFields());
            navigate(`/`);
          }}
        >
          Close
        </button>
      </div>
      <>
        <ScanInvoiceUnitConfirmationContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              updateEditData("viewDetail", true);
              navigate(`/scan-invoice-save`);
            }}
          >
            Next
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              goBack();
            }}
          >
            Back
          </button>

          <ButtonComponent
            route={
              !isNonUnit ? `/scan-invoice/invoice-unit-selection` : `/scan-invoice/invoice-non-unit-selection`
            }
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            label={"Cancel"}
            onClick={() => {
              if (!isNonUnit) {
                updateEditData("nonUnitData", []);
                updateEditData("invoiceData", []);
                updateEditData("invoicePK", null);
                dispatch(resetFields());
                dispatch(setUnitSelectionReset(false));
              } else {
                dispatch(resetFields());
              }
            }}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default ScanInvoiceUnitConfirmation;
