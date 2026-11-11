import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetState } from "../../../../redux/DelayUnitExpenseSlice";

const DelayUnitExpenseHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewDetail = useSelector((state) => state.delayUnitExpenseSlice.viewDetail);
  const breakdownFK = useSelector((state) => state.delayUnitExpenseSlice.breakdownFK);

  const [showClose, setShowClose] = useState(false);

  const onHandleCloseShow = () => {
    if (!viewDetail) {
      setShowClose(true);
    } else {
      toast.success("Page Closed");
      navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
      dispatch(resetState());
    }
  };

  const handleCloseNo = () => {
    setShowClose(false);
  };

  const handleCloseYes = () => {
    toast.success("Page Closed");
    navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
    setShowClose(false);
    dispatch(resetState());
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={() => {
            onHandleCloseShow();
          }}
        >
          Close
        </button>
      </div>

      <div>
        <ModalComponent
          show={showClose}
          onHide={handleCloseNo}
          title={"Close Delay Unit Expense"}
          body="Please confirm you want to close the program."
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
};

export default DelayUnitExpenseHeader;
