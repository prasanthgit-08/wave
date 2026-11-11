import React from "react";
import {
  resetApuArrays,
  resetApuScreen,
  resetUndispatchDetails,
  setApuFiles,
  setCreditCardConfirmationFlag,
  setUndispatchFlag,
} from "../../../../../../../../redux/UndispatchSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const APUDocumentsFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId, dispatchId } = useParams();

  const apuSave = useSelector((state) => state.undispatchReducer.apuSave);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          disabled={!apuSave}
          onClick={() => {
            navigate(`/undispatch-confirmation/${driverId}/${dispatchId}`);
          }}
        >
          Next
        </button>{" "}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate(`/undispatch-apu-screen/${driverId}/${dispatchId}`);
          }}
        >
          Back
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/undispatch/" + driverId);
            dispatch(resetUndispatchDetails());
            dispatch(setApuFiles({ actionType: "clear" }));
            dispatch(resetApuScreen());
            dispatch(setUndispatchFlag(false));
            dispatch(setCreditCardConfirmationFlag(false));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default APUDocumentsFooter;
