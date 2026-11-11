import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PayDebitcardInvoiceService from "../../../../services/PayDebitcardInvoiceService";
import {
  resetChanges,
  setDriverpayCheckNumber,
  setReimbursementCheckNumber,
  setSaveData,
  setSaveFlag,
} from "../../../../redux/PayDebitcardInvoiceSlice";
import DeleteComponent from "../../../common/DeleteComponent";
import { formatForApi } from "../../../../utils/dateUtils";
const DebitCardFooter = () => {
  const [postedDate, setPostedDate] = useState(
    formatForApi(new Date(new Date().setDate(new Date().getDate() - 1))) // yesterday, local
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const saveData = useSelector((state) => state.payDebitcardInvoiceReducer.saveData);
  const processFlag = useSelector((state) => state.payDebitcardInvoiceReducer.processFlag);
  const saveFlag = useSelector((state) => state.payDebitcardInvoiceReducer.saveFlag);
  const DeletePrimaryOk = () => {
    setShow(false);

    navigate("/pay-debit-card-invoice");
    dispatch(resetChanges(""));
  };

  const process = () => {
    dispatch(setSaveFlag(true));

    const tempSaveFormData = {
      ...saveData,
      flag: true,
    };

    PayDebitcardInvoiceService.processDebitCardInvoice(tempSaveFormData)
      .then((response) => {
        const amountDetails = response.data.amountDetails;

        dispatch(setDriverpayCheckNumber(amountDetails[0].driverPayCheckNumber));
        dispatch(setReimbursementCheckNumber(amountDetails[0].reimbursementCheckNumber));
        dispatch(setSaveFlag(false));
        navigate("/pay-debit-card-invoice");
        //  dispatch(resetChanges(""));
        toast.success("Pay Debitcard Invoice records added successfully");
      })
      .catch((error) => {
        dispatch(setSaveFlag(false));

        // Check if the error message contains "No printer details found in the response."
        if (
          error.response &&
          error.response.data &&
          error.response.data.message &&
          (error.response.data.message.includes("Printer not found") ||
            error.response.data.message.includes("No printer details found in the response."))
        ) {
          setShow(true); // Show the popup
        } else {
          dispatch(resetChanges(""));
          dispatch(setSaveData(null));
          navigate("/pay-debit-card-invoice");
          toast.error("Failed to add pay debitcard invoice records");
        }
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={!processFlag}
          onClick={process}
        >
          Process
        </button>
      </div>
      {saveFlag && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
      <DeleteComponent
        show={show}
        onHide={DeletePrimaryOk}
        title={<span style={{ color: "red" }}>Warning:</span>}
        body={"Failed To Connnect with Printer"}
        handleOK={DeletePrimaryOk}
      />
    </div>
  );
};

export default DebitCardFooter;
