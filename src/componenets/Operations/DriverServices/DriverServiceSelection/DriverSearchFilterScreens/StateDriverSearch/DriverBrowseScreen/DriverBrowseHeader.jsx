import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetListing, resetSearch } from "../../../../../../../redux/DealerDriverSearchSlice";

const DriverBrowseHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/driver-service-selection");
            toast.success("Page Closed");
            dispatch(resetListing());
            dispatch(resetSearch());
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DriverBrowseHeader;
