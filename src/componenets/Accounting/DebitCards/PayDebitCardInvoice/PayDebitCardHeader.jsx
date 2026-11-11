import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import ModalComponent from "../../../common/ModalComponent";
import { resetChanges, setSaveData } from "../../../../redux/PayDebitcardInvoiceSlice";

const PayDebitCardHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [closeShow, setCloseShow] = useState(false);
  const saveFlag = useSelector((state) => state.payDebitcardInvoiceReducer.saveFlag);
  const processFlag = useSelector((state) => state.payDebitcardInvoiceReducer.processFlag);

  const handleClose = () => {
    if (!processFlag) {
      navigate("/");
      dispatch(resetChanges(""));
      dispatch(setSaveData(null));
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(resetChanges(""));
    dispatch(setSaveData(null));
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleClose}
          disabled={saveFlag}
        >
          Close
        </button>{" "}
      </div>
      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Pay Debitcard Invoice"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default PayDebitCardHeader;
