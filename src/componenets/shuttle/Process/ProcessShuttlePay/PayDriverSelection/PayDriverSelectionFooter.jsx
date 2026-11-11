import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSelection,
  setChangeColor,
  setCompanyFK,
  setCompanyName,
  setDriverNameInput,
  setPageNumber,
  setSelectedDriverID,
} from "../../../../../redux/ProcessPaySlice";
import { useNavigate } from "react-router-dom";

function PayDriverSelectionFooter() {
  const selectedDriverID = useSelector((state) => state.processShuttlePayReducer.selectedDriverID);
  const companyName = useSelector((state) => state.processShuttlePayReducer.companyName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={!selectedDriverID || !companyName}

          onClick={() => {
            navigate("/shuttle-process-pay-driver-browse");
            dispatch(setPageNumber(0));
            dispatch(resetSelection());
          }}
        >
          Continue
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => {
            dispatch(setSelectedDriverID(""));
            dispatch(setDriverNameInput(""));
            dispatch(setCompanyName(""));
            dispatch(setChangeColor(false));
            dispatch(setCompanyFK(null));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PayDriverSelectionFooter;
