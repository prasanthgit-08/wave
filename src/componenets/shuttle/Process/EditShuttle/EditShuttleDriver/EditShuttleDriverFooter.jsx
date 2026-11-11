import React from "react";
import ButtonComponent from "../../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetUnitDetails,
  setDriverId,
  setDriverNameInput,
  setFromDate,
  setToDate,
  setViewDetail,
} from "../../../../../redux/EditShuttleSlice";

function EditShuttleDriverFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const driverId = useSelector((state) => state.editShuttleReducer.driverId);
  const fromDate = useSelector((state) => state.editShuttleReducer.fromDate);
  const toDate = useSelector((state) => state.editShuttleReducer.toDate);
  const isDateValid = useSelector((state) => state.editShuttleReducer.isDateValid);

  //Onclick function for Cancel Button
  const handleCancelOnClick = () => {
    dispatch(setDriverNameInput(""));
    dispatch(setDriverId(null));
    dispatch(setFromDate(""));
    dispatch(setToDate(""));
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {/* Continue Button */}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            dispatch(resetUnitDetails());
            dispatch(setViewDetail(true));
            setTimeout(() => {
              navigate("/edit-shuttle-unit");
            }, 100);
          }}
          disabled={!driverId || fromDate === "" || toDate === "" || !isDateValid}
        >
          Continue
        </button>

        {/* Cancel Button */}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancelOnClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditShuttleDriverFooter;
