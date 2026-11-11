import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScanInvoiceNonUnitSelectionContent from "./ScanInvoiceNonUnitSelectionContent";
import {
  resetFields,
  setUnitSelectionReset,
  updateField,
} from "../../../../redux/Invoicing/ScanInvoiceSlice";

const ScanInvoiceNonUnitSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyName, pageNumberNonUnit, companyFK, invoicePK, nonUnitData, unitSelectionReset } =
    useSelector((state) => state.scanInvoiceReducer);

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
            navigate(`/`);
            dispatch(resetFields());
            dispatch(setUnitSelectionReset(false));
          }}
        >
          Close
        </button>
      </div>
      <>
        <ScanInvoiceNonUnitSelectionContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              updateEditData("miscellaniousFlag", true);
              updateEditData("viewDetail", true);
              updateEditData("companyFK", companyFK);
              updateEditData("companyName", companyName);
              updateEditData("invoiceData", []);
              navigate(`/scan-invoice/add/non-unit/${invoicePK}/${pageNumberNonUnit}`);
            }}
            disabled={!invoicePK || nonUnitData?.length === 0}
          >
            Next
          </button>

          <ButtonComponent
            route={"/scan-invoice/invoice-unit-selection"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              updateEditData("nonUnitCancel", true);
              updateEditData("nonUnitData", []);
              updateEditData("invoiceById", []);
              updateEditData("invoiceData", []);
              updateEditData("invoicePK", null);
              updateEditData("unitNumber", "");
              updateEditData("invoiceNumber", "");
              updateEditData("unitNumberLast5", "");
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
export default ScanInvoiceNonUnitSelection;
