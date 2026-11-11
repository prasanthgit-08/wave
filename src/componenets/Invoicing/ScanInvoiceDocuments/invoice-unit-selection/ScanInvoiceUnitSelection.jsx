import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScanInvoiceUnitSelectionContent from "./ScanInvoiceUnitSelectionContent";
import {
  resetFields,
  setUnitSelectionReset,
  toggleCancelChanges,
  updateField,
} from "../../../../redux/Invoicing/ScanInvoiceSlice";

const ScanInvoiceUnitSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageNumber, invoicePK, invoiceData, unitSelectionReset } = useSelector(
    (state) => state.scanInvoiceReducer
  );

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
            dispatch(resetFields());
            navigate(`/`);
          }}
        >
          Close
        </button>
      </div>
      <ScanInvoiceUnitSelectionContent />
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => {
              updateEditData("nonUnitData", []);
              updateEditData("invoicePK", null);
              updateEditData("nonUnitInvoiceNumber", "");
              updateEditData("nonUnitUnitnumber", "");
              updateEditData("nonUnitPONumber", "");
              updateEditData("customerName", "");
              updateEditData("dealerId", null);
              updateEditData("dealerName", "");
              updateEditData("selectedCustomerId", null);
              dispatch(setUnitSelectionReset(true));
              navigate(`/scan-invoice/invoice-non-unit-selection`);
            }}
          >
            Non Unit
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              updateEditData("viewDetail", true);
              dispatch(setUnitSelectionReset(true));
              navigate(`/scan-invoice/add/${invoicePK}/${pageNumber}`);
            }}
            disabled={!invoicePK || invoiceData?.length === 0}
          >
            Next
          </button>

          <ButtonComponent
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              // updateEditData("cancelTrue", true);
              updateEditData("invoicePK", null);
              updateEditData("invoiceData", []);
              updateEditData("unitNumber", "");
              updateEditData("last5", "");
              updateEditData("invoiceNumber", "");
              updateEditData("searchTerm", "");
              updateEditData("searchCriteria", "");
              updateEditData("pageNumber", 0);
              updateEditData("sortValue", "");
              updateEditData("sortType", false);
              updateEditData("nonUnitData", []);
              updateEditData("unitNumberId", null);
              updateEditData("unitNumberLast5", "");
              updateEditData("selectedCompanyName", "");
              updateEditData("companyFK", null);
              // setTimeout(() => {
              // updateEditData("cancelTrue", false);
              // }, 20);
              dispatch(toggleCancelChanges());
            }}
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default ScanInvoiceUnitSelection;
