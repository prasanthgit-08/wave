import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import InvoiceVoidContent from "./InvoiceVoidContent";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import EditInvoiceService from "../../../../services/Invoicing/EditInvoiceService";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  setCancelTrue,
  setInvoiceById,
  setInvoiceData,
  setInvoiceDetailsData,
  setInvoicePK,
  setNonUnitData,
  setSaveEditInvoice,
  resetFields,
  setUnitSelectionReset,
  toggleCancelChanges,
} from "../../../../redux/Invoicing/EditInvoiceSlice";
import ModalComponent from "../../../common/ModalComponent";
import LoadingIcon from "../../../common/LoadingIcon";

const InvoiceVoid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const saveEditInvoice = useSelector((state) => state.editInvoiceReducer.saveEditInvoice);
  const invoiceById = useSelector((state) => state.editInvoiceReducer.invoiceById);
  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const [cancelShow, setCancelShow] = useState(false);
  const unitSelectionReset = useSelector((state) => state.editInvoiceReducer.unitSelectionReset);
  const [loader, setLoader] = useState(false);

  const handleFinalSave = () => {
    setLoader(true);
    EditInvoiceService.saveNewInvoice(saveEditInvoice)
      .then((response) => {
        toast.success("Invoice is Created");
        dispatch(resetFields());
        dispatch(setInvoiceById([]));
        dispatch(setInvoiceDetailsData([]));
        dispatch(setInvoicePK(null));
        dispatch(setInvoiceData([]));
        dispatch(setNonUnitData([]));
        dispatch(toggleCancelChanges());
        navigate("/edit-invoice/invoice-unit-selection");
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        dispatch(setInvoiceById([]));
      });
    setSaveEditInvoice(null);
    dispatch(setUnitSelectionReset(false));
  };

  useEffect(() => {
    dispatch(
      setSaveEditInvoice({
        key: "invoiceById",
        payload: { invoiceById },
      })
    );
  }, [invoiceById]);

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setNonUnitData([]));
    dispatch(setInvoiceById([]));
    navigate("/edit-invoice/invoice-unit-selection");
    toast.success("Changes Cancelled");
    setCancelShow(false);
    dispatch(setCancelTrue(true));
    dispatch(setInvoicePK(null));
    dispatch(setInvoiceData([]));
    dispatch(setUnitSelectionReset(false));

    // Set cancelTrue back to false after a short delay
    setTimeout(() => {
      dispatch(setCancelTrue(false));
      dispatch(setNonUnitData([]));
    }, 0);
    dispatch(setNonUnitData([]));
    dispatch(resetFields());
  };

  //cancel
  const handleCancelShow = () => {
    setCancelShow(true);
  };

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
        <InvoiceVoidContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              handleFinalSave();
            }}
            disabled={!saveEditInvoice?.voidedReason}
          >
            Save
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              navigate(`/edit-invoice-information/${invoicePK}`);
            }}
          >
            Back
          </button>

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={handleCancelShow}
            label={"Cancel"}
          />

          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Void"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />
          {loader && <LoadingIcon />}
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default InvoiceVoid;
