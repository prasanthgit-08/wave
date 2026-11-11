import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetArrays,
  resetSplitTripLocation,
  resetUndispatchDetails,
  setCreditCardConfirmationFlag,
  setSplitTripFiles,
  setSplitTripFlag,
  setSplitTripMilesData,
  setUndispatchFlag,
} from "../../../../../../../redux/UndispatchSlice";
import { useDispatch } from "react-redux";

const UndispatchFooter = () => {
  const { driverId } = useParams();
  const { dispatchId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/undispatch-details-screen/" + driverId + "/" + dispatchId);
            dispatch(resetUndispatchDetails());
            dispatch(setCreditCardConfirmationFlag(false));
          }}
        >
          Undispatch
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/undispatch-splittrip-location-screen/" + driverId + "/" + dispatchId);
            dispatch(resetSplitTripLocation());
            dispatch(setSplitTripFiles({ actionType: "clear" }));
            dispatch(setSplitTripMilesData(null));
          }}
        >
          Split Trip
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            toast.success("Changes Cancelled");
            navigate("/undispatch/" + driverId);
            dispatch(setUndispatchFlag(false));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UndispatchFooter;
