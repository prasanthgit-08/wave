import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetSplitTripLocation,
  resetUndispatchDetails,
  setBackButtonFlag,
  setSplitTripMilesData,
  setUndispatchFlag,
} from "../../../../../../../../redux/UndispatchSlice";

const SplitTripMilesFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { delayedunitPK, driverId, dispatchId, companyName, unitfk } = useParams();

  const [disableNext, setDisableNext] = useState(true);

  const {
    other,
    otherDescription,
    dispatchDriverMiles,
    firstHalfDriverMiles,
    secondHalfDriverMiles,
    dispatchDriverFlatrate,
    firstHalfDriverFlatrate,
    secondHalfDriverFlatrate,
    hasSplitOverrridePermission,
    milesNotUpdated,
    tolls,
    permits,
  } = useSelector((state) => state.undispatchReducer);

  const driverReleased = useSelector((state) => state.delayProcessing.driverReleased);

  useEffect(() => {
    const validMiles =
      Number(firstHalfDriverMiles) + Number(secondHalfDriverMiles) <= Number(dispatchDriverMiles);
    const validFlatRate =
      Number(firstHalfDriverFlatrate) + Number(secondHalfDriverFlatrate) <= Number(dispatchDriverFlatrate) &&
      !String(firstHalfDriverFlatrate).endsWith(".") &&
      !String(secondHalfDriverFlatrate).endsWith(".") &&
      !String(dispatchDriverFlatrate).endsWith(".");
    const isOtherEmpty = !other || other?.trim() === "";
    const parsedOther = parseFloat(other);
    const isOtherNumeric = !isNaN(parsedOther);
    const endsWithDot = String(other).endsWith(".");
    //tolls field validation
    const isTollsempty = !tolls || tolls?.trim() === "";
    const parsedTolls = parseFloat(tolls);
    const isTollsNumeric = !isNaN(parsedTolls);
    //permits field validation
    const isPermitsempty = !permits || permits?.trim() === "";
    const parsedPermits = parseFloat(permits);
    const isPermitsNumeric = !isNaN(parsedPermits);
    // Case 1: allow if empty
    const isOtherEmptyOrZero = isOtherEmpty || (isOtherNumeric && parsedOther === 0 && !endsWithDot);
    // Case 2: non-zero => must have otherDescription
    const isOtherNonZeroWithDescription =
      isOtherNumeric && parsedOther !== 0 && !endsWithDot && otherDescription?.trim() !== "";
    const isTollsEmptyOrZero = isTollsempty || (isTollsNumeric && !String(tolls).endsWith("."));
    const isPermitsEmptyOrZero = isPermitsempty || (isPermitsNumeric && !String(permits).endsWith("."));

    // Final flag
    const shouldEnableNext =
      (isOtherEmptyOrZero || isOtherNonZeroWithDescription) &&
      isTollsEmptyOrZero &&
      isPermitsEmptyOrZero &&
      !String(secondHalfDriverFlatrate).endsWith(".") &&
      !String(firstHalfDriverFlatrate).endsWith(".") &&
      (hasSplitOverrridePermission || (validFlatRate && validMiles));
    setDisableNext(!shouldEnableNext);
  }, [
    other,
    otherDescription,
    firstHalfDriverFlatrate,
    firstHalfDriverMiles,
    secondHalfDriverFlatrate,
    secondHalfDriverMiles,
    dispatchDriverFlatrate,
    dispatchDriverMiles,
    milesNotUpdated,
    hasSplitOverrridePermission,
    tolls,
    permits,
  ]);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={disableNext}
          onClick={() => {
            if (!driverReleased) {
              navigate(`/undispatch-splittrip-document-screen/${driverId}/${dispatchId}`);
            } else {
              navigate(
                `/releasedriver-splittrip-document-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`
              );
            }
          }}
        >
          Next
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            dispatch(setBackButtonFlag(true));
            if (!driverReleased) {
              navigate("/undispatch-splittrip-location-screen/" + driverId + "/" + dispatchId);
            } else {
              navigate(
                `/releasedriver-splittrip-location-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`
              );
            }
          }}
        >
          Back
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            if (!driverReleased) {
              navigate("/undispatch/" + driverId);
              dispatch(setUndispatchFlag(false));
              dispatch(setBackButtonFlag(false));
            } else {
              navigate(
                `/releasedriver-splittrip-location-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`
              );
            }
            dispatch(resetSplitTripLocation(""));
            dispatch(resetUndispatchDetails());
            dispatch(setSplitTripMilesData(null));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SplitTripMilesFooter;
