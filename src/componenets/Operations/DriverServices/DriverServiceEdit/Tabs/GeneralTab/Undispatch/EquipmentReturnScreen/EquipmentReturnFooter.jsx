import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetUndispatchDetails, setUndispatchFlag } from "../../../../../../../../redux/UndispatchSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const EquipmentReturnFooter = () => {
  const { driverId, dispatchId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activationStatus = useSelector((state) => state.undispatchReducer.activationStatus);
  const deleteUnit = useSelector((state) => state.undispatchReducer.deleteUnit);
  const unitOnHold = useSelector((state) => state.undispatchReducer.unitOnHold);
  const attemptedPickup = useSelector((state) => state.undispatchReducer.attemptedPickup);
  const handleNext = () => {
    if (activationStatus === "Delay") {
      navigate(`/undispatch-activation-delay-screen/${driverId}/${dispatchId}`);
    } else if (unitOnHold) {
      navigate(`/undispatch-hold-screen/${driverId}/${dispatchId}`);
    } else if (attemptedPickup) {
      navigate(`/undispatch-apu-screen/${driverId}/${dispatchId}`);
    } else if (deleteUnit) {
      navigate(`/undispatch-delete-unit-screen/${driverId}/${dispatchId}`);
    } else {
      navigate(`/undispatch-confirmation/${driverId}/${dispatchId}`);
      // navigate(`/undispatch-details-screen/${driverId}/${dispatchId}`);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"

          onClick={handleNext}
        >
          Next
        </button>{" "}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/undispatch-details-screen/" + driverId + "/" + dispatchId);
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
            toast.success("Changes Cancelled");
            dispatch(setUndispatchFlag(false));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EquipmentReturnFooter;
