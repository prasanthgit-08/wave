import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetApuScreen,
  resetBrowsePage,
  resetSplitTripLocation,
  resetUndispatchDetails,
  setBackButtonFlag,
  setReleaseAtPickupLocation,
  setCreditCardConfirmationFlag,
  setSplitTripFiles,
  setUndispatchFlag,
  setIsDelayBreakdown,
  setDriverName,
} from "../../../../../../../redux/UndispatchSlice";
import ModalComponent from "../../../../../../common/ModalComponent";
import { useSelector } from "react-redux";
import { setDriverReleased } from "../../../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";

const UndispatchHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activationStatus = useSelector((state) => state.undispatchReducer.activationStatus);
  const equipment = useSelector((state) => state.undispatchReducer.equipment);
  const deleteUnit = useSelector((state) => state.undispatchReducer.deleteUnit);
  const unitOnHold = useSelector((state) => state.undispatchReducer.unitOnHold);
  const attemptedPickup = useSelector((state) => state.undispatchReducer.attemptedPickup);
  const undispatchReason = useSelector((state) => state.undispatchReducer.undispatchReason);

  const [closeShow, setCloseShow] = useState(false);

  const { driverId, dispatchId, delayedunitPK, companyName, unitfk } = useParams();
  const [disable, setDisable] = useState(false);
  // const driverReleased = useSelector((state) => state.delayProcessing.driverReleased);
  const driverReleased = localStorage.getItem("driverRelease") === "true";
  const handleClose = () => {
    if (driverReleased) {
      if (
        decodeURIComponent(window.location.pathname) ===
        `/releasedriver-splittrip-document-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`
      ) {
        setCloseShow(true);
      } else {
        dispatch(setReleaseAtPickupLocation(false));
        dispatch(resetSplitTripLocation());
        dispatch(setSplitTripFiles({ actionType: "clear" }));
        dispatch(setDriverReleased(false));
        dispatch(setIsDelayBreakdown(false));
        localStorage.removeItem("driverRelease");
        toast.success("Page Closed");
        navigate(
          `/delay-processing/delayed-details/${companyName}/${Number(unitfk)}/${Number(driverId)}/${Number(delayedunitPK)}`,
          { replace: true }
        );
      }
    } else {
      if (
        disable ||
        (!attemptedPickup &&
          !unitOnHold &&
          !deleteUnit &&
          activationStatus != "Delay" &&
          equipment !== "Checkin" &&
          undispatchReason != "")
      ) {
        setCloseShow(true);
      } else {
        dispatch(resetBrowsePage());
        dispatch(resetUndispatchDetails());
        dispatch(resetSplitTripLocation(""));
        dispatch(setSplitTripFiles({ actionType: "clear" }));
        dispatch(setUndispatchFlag(false));
        dispatch(setBackButtonFlag(false));
        toast.success("Page Closed");
        navigate("/driver-service-selection/" + driverId + "/form");
      }
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    if (driverReleased) {
      dispatch(setReleaseAtPickupLocation(false));
      localStorage.removeItem("driverRelease");
      dispatch(setDriverReleased(false));
      dispatch(resetSplitTripLocation());
      dispatch(setSplitTripFiles({ actionType: "clear" }));
      toast.success("Page Closed");

      navigate(
        `/delay-processing/delayed-details/${companyName}/${unitfk}/${Number(driverId)}/${Number(delayedunitPK)}`
      );
    } else {
      dispatch(resetUndispatchDetails());
      dispatch(resetSplitTripLocation(""));
      dispatch(setSplitTripFiles({ actionType: "clear" }));
      dispatch(resetApuScreen());
      dispatch(setDriverName(""));
      dispatch(setUndispatchFlag(false));
      dispatch(resetBrowsePage());
      dispatch(setBackButtonFlag(false));
      dispatch(setCreditCardConfirmationFlag(false));
      toast.success("Page Closed");
      navigate("/driver-service-selection/" + driverId + "/form");
    }
  };

  useEffect(() => {
    if (window.location.pathname === `/undispatch-confirmation/${driverId}/${dispatchId}`) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [window]);
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
      <button
        className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
        type=""
        onClick={handleClose}
      >
        Close
      </button>

      <ModalComponent
        show={closeShow}
        onHide={onHandleCloseNo}
        title={driverReleased ? "Close Release Driver" : "Close Undispatch"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={onHandleCloseYes}
        handleNO={onHandleCloseNo}
      />
    </div>
  );
};

export default UndispatchHeader;
