import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetOutputconfirmationScreen,
  setBolFor,
  setRePrintBOL,
  setUnitConfirmationData,
} from "../../../redux/ReprintBolSlice";

const ReprintSelectionHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleCloseShow = () => {
    localStorage.removeItem("rePrint");
    navigate("/");
    dispatch(setRePrintBOL(false));
    dispatch(setBolFor("driver"));
    dispatch(setUnitConfirmationData(null));
    dispatch(resetOutputconfirmationScreen());
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2 ">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReprintSelectionHeader;
