import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedDriver } from "../../../../../redux/YardCheckinSlice";

function AdditionalShuttleHeader() {
  //navigate
  const navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();

  //Onclick function for Close Button
  const onHandleClose = () => {
    dispatch(setSelectedDriver(""));
    navigate("/");
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        {/* Close */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleClose}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6"></div>
    </div>
  );
}

export default AdditionalShuttleHeader;
