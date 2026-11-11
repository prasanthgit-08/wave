import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDriverNameInput, toggleCancelChanges } from "../../../../../redux/YardCheckinSlice";

function DriverSelectionFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const driverNameInput = useSelector((state) => state.yardCheckinReducer.driverNameInput);
  const selectedDriverFK = useSelector((state) => state.yardCheckinReducer.selectedDriverID);

  const handleCancelOnClick = () => {
    dispatch(setDriverNameInput(""));
    dispatch(toggleCancelChanges());
  };

  const handleProcessOnClick = () => {
    navigate("/yard-checkin-unit-selection");
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          disabled={driverNameInput !== "" && selectedDriverFK !== "" ? false : true}
          onClick={handleProcessOnClick}
        >
          Next
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          onClick={handleCancelOnClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DriverSelectionFooter;
