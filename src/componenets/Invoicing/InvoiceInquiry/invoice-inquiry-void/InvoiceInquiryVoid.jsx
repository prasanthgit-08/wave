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
  setInvoiceNumber,
  setInvoicePK,
  setNonUnitData,
  setsetSaveInvoiceInquiry,
  setUnitId,
  setUnitNumber,
  setUnitNumberLast5,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";
import ModalComponent from "../../../common/ModalComponent";

const InvoiceVoid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const saveEditInvoice = useSelector((state) => state.invoiceInquiryReducer.saveEditInvoice);
  const invoiceById = useSelector((state) => state.invoiceInquiryReducer.invoiceById);
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const [cancelShow, setCancelShow] = useState(false);
  const handleFinalSave = () => {
    EditInvoiceService.saveNewInvoice(saveEditInvoice)
      .then((response) => {
        toast.success("The record is processed");
        navigate("invoice-inquiry/invoice-unit-selection");
        dispatch(setInvoiceById([]));
        dispatch(setInvoiceDetailsData([]));
        dispatch(setInvoicePK(null));
        dispatch(setInvoiceData([]));
        dispatch(setNonUnitData([]));
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        dispatch(setInvoiceById([]));
      });
    dispatch(setsetSaveInvoiceInquiry(null));
  };

  useEffect(() => {
    dispatch(
      setsetSaveInvoiceInquiry({
        key: "invoiceById",
        payload: { invoiceById },
      })
    );
  }, [invoiceById]);

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate("invoice-inquiry/invoice-unit-selection");
    toast.success("Changes Cancelled");
    setCancelShow(false);
    dispatch(setCancelTrue(true));
    dispatch(setInvoicePK(null));
    dispatch(setInvoiceData([]));
    dispatch(setInvoiceNumber(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setUnitNumber(""));
    dispatch(setUnitId(null));

    // Set cancelTrue back to false after a short delay
    setTimeout(() => {
      dispatch(setCancelTrue(false));
    }, 0);
  };

  //cancel
  const handleCancelShow = () => {
    setCancelShow(true);
  };

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate(`/`);
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
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default InvoiceVoid;
