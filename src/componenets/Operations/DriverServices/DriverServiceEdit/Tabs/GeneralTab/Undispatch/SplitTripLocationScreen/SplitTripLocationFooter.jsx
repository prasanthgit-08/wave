import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetSplitTripLocation,
  setBackButtonFlag,
  setUndispatchFlag,
} from "../../../../../../../../redux/UndispatchSlice";

const SplitTripLocationFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { delayedunitPK, driverId, dispatchId, companyName, unitfk } = useParams();
  const splittripScreenValid = useSelector((state) => state.undispatchReducer.splittripScreenValid);
  const driverReleased = useSelector((state) => state.delayProcessing.driverReleased);
  const releaseAtPickupLocation = useSelector((state) => state.undispatchReducer.releaseAtPickupLocation);
  const generalData = useSelector((state) => state.delayProcessing.generalData);
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          disabled={!splittripScreenValid && !releaseAtPickupLocation}
          onClick={() => {
            if (driverReleased) {
              if (releaseAtPickupLocation) {
                navigate(
                  `/releasedriver-splittrip-document-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`,
                  { replace: true }
                );
              } else {
                navigate(
                  `/releasedriver-splittrip-miles-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`,
                  { replace: true }
                );
              }
            } else {
              if (releaseAtPickupLocation) {
                navigate(`/undispatch-splittrip-document-screen/${driverId}/${dispatchId}`);
              } else {
                navigate("/undispatch-splittrip-miles-screen/" + driverId + "/" + dispatchId);
              }
            }
          }}
        >
          Next
        </button>{" "}
        {driverReleased && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            hidden={driverReleased}
            onClick={() => {
              navigate(`undispatch-unit-confirmation-screen/${driverId}/${dispatchId}`);
            }}
          >
            Back
          </button>
        )}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            if (!driverReleased) {
              navigate("/undispatch/" + driverId);
              dispatch(setUndispatchFlag(false));
            } else {
              navigate(
                `/releasedriver-splittrip-location-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`
              );
              localStorage.removeItem("");
            }
            dispatch(resetSplitTripLocation(""));
            dispatch(setBackButtonFlag(false));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SplitTripLocationFooter;
