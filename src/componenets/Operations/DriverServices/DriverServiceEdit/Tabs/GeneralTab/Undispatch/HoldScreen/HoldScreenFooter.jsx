import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetUndispatchDetails, setUndispatchFlag } from "../../../../../../../../redux/UndispatchSlice";
import toast from "react-hot-toast";

const HoldScreenFooter = () => {
  const { driverId, dispatchId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const holdReason = useSelector((state) => state.undispatchReducer.holdReason);
  const holdNote = useSelector((state) => state.undispatchReducer.holdNote);
  const holdAuthorizedBy = useSelector((state) => state.undispatchReducer.holdAuthorizedBy);
  const attemptedPickup = useSelector((state) => state.undispatchReducer.attemptedPickup);
  const equipment = useSelector((state) => state.undispatchReducer.equipment);
  const checkEquipment = useSelector((state) => state.undispatchReducer.checkEquipment);
  const handleNext = () => {
    if (attemptedPickup) {
      navigate(`/undispatch-apu-screen/${driverId}/${dispatchId}`);
    } else {
      navigate(`/undispatch-confirmation/${driverId}/${dispatchId}`);
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleNext}
          disabled={!(holdReason && holdAuthorizedBy && holdNote)}
        >
          Next
        </button>{" "}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            if (equipment === "Checkin" && checkEquipment) {
              navigate(`/undispatch-equipment-return-screen/${driverId}/${dispatchId}`);
            } else {
              navigate(`/undispatch-details-screen/${driverId}/${dispatchId}`);
            }
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
            dispatch(setUndispatchFlag(false));
            toast.success("Changes Cancelled");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HoldScreenFooter;
