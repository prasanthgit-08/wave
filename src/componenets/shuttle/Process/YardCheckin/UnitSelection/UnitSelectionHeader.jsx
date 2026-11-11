import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setSelectedDriver } from "../../../../../redux/YardCheckinSlice";

function UnitSelectionHeader() {
  const navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();

  const handleOnClose = () => {
    dispatch(setSelectedDriver(""));
    navigate("/");
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          onClick={handleOnClose}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6"></div>
    </div>
  );
}

export default UnitSelectionHeader;
