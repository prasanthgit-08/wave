import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetListing, resetSearch } from "../../../../../../../redux/DealerDriverSearchSlice";

const DriverBrowseFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDriverId = useSelector((state) => state.dealerDriverSearchSlice.selectedDriverId);

  const handleCancel = () => {
    navigate("/driver-service-selection");
    dispatch(resetListing());
  };

  const handleContinue = () => {
    navigate("/driver-service-selection/" + selectedDriverId + "/form");
    setTimeout(() => {
      dispatch(resetListing());
      dispatch(resetSearch());
    }, 10);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap m-r-10">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => handleContinue()}
          disabled={!selectedDriverId}
        >
          Continue
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DriverBrowseFooter;
