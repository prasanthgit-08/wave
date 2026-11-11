import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCompanyFK,
  setCompanyName,
  setDriverNameInput,
  setSelectedDriverID,
} from "../../../../../redux/ProcessPaySlice";
import toast from "react-hot-toast";

function PayDriverSelectionHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`/`);
    dispatch(setSelectedDriverID(""));
    dispatch(setDriverNameInput(""));
    dispatch(setCompanyName(""));
    dispatch(setCompanyFK(null));
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <div></div>
    </div>
  );
}

export default PayDriverSelectionHeader;
