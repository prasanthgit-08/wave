import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  resetEmailChanges,
  resetResourceList,
  setAddFlag,
  setDelayedUnitCodeID,
  setDelayedUnitCodeInput,
  setEditMode,
  setNewEmailList,
  setNotes,
  setResourceList,
  setSelectedIndex,
} from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import {
  resetEmailChanges as breakDownResetEmailChanges,
  resetResourceList as breakDownResetResourceList,
  resetBreakdowbBrowsePage,
  setAddFlag as setBreakDownAddFlag,
  setEditMode as setBreakdownEditMode,
  setNewEmailList as setBreakdownNewEmailList,
  setNotes as setBreakdownNotes,
  setResourceList as setBreakdownResourceList,
  setSelectedIndex as setBreakdownSelectedIndex,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import {
  resetDamageBrowsePage,
  resetEmailChanges as damageResetEmailChanges,
  resetResourceList as damageResetResourceList,
  setAddFlag as setDamageAddFlag,
  setEditMode as setDamageEditMode,
  setNewEmailList as setDamageNewEmailList,
  setNotes as setDamageNotes,
  setResourceList as setDamageResourceList,
  setSelectedIndex as setDamageSelectedIndex,
} from "../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import {
  resetSaveList,
  setDispatchDelayIndex,
  setNewDelayNavigation,
} from "../../../../redux/UnitActivationSlice";
import {
  setIsDelayBreakdown,
  setUndispatchBreakdownFlag,
  setUndispatchdelayFlag,
} from "../../../../redux/UndispatchSlice";
import { resetDriverCheckinState, setDriverId } from "../../../../redux/DriverCheckinSlice";

const FormFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { companyName, driverfk, unitfk } = useParams();
  const [disableDelay, setDisableDelay] = useState(true);
  const [disableBreakdown, setDisableBreakdown] = useState(false);
  const unitConfirmationData = useSelector((state) => state.delayProcessing.unitConfirmationData);
  const newDelayNavigation = useSelector((state) => state.unitActivationReducer.newDelayNavigation);
  const dispatchDelayIndex = useSelector((state) => state.unitActivationReducer.dispatchDelayIndex);
  const dispatchDelayArrayList = useSelector((state) => state.unitActivationReducer.dispatchDelayArrayList);
  const urlNavigation = JSON.parse(localStorage.getItem("urlNavigation")) || newDelayNavigation;

  const cameFrom = urlNavigation?.from;

  const delayedUnitPK = 0;
  //used to disable delay button
  useEffect(() => {
    if (
      !unitConfirmationData?.ActiveDispatch &&
      unitConfirmationData?.Active &&
      unitConfirmationData?.Dispatched &&
      !unitConfirmationData?.Delivered &&
      !unitConfirmationData?.DeliveryYardEntrance &&
      (unitConfirmationData?.Pickedup || unitConfirmationData.PickupYardExit)
    ) {
      setDisableDelay(false);
    } else {
      setDisableDelay(true);
    }
  }, [unitConfirmationData]);

  //used to disable breakdown button
  useEffect(() => {
    if (!unitConfirmationData?.Delivered && !unitConfirmationData?.DeliveryYardEntrance) {
      setDisableBreakdown(false);
    } else {
      setDisableBreakdown(true);
    }
  }, [unitConfirmationData]);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={() => {
            dispatch(setNewEmailList([]));
            dispatch(setResourceList([]));
            dispatch(resetEmailChanges());
            dispatch(setNotes(null));
            dispatch(setEditMode(false));
            dispatch(setSelectedIndex(null));
            dispatch(resetResourceList());
            dispatch(setAddFlag(false));
            dispatch(setDelayedUnitCodeID(""));
            dispatch(setDelayedUnitCodeInput(""));

            navigate(
              "/delay-processing/new-delay/" + companyName + "/" + Number(unitfk) + "/" + Number(driverfk),
              {
                state: {
                  ...state,
                  unitId: unitfk,
                  companyName,
                },
              }
            );
          }}
          type="button"
          disabled={disableDelay}
        >
          Delay
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={() => {
            dispatch(setBreakdownNewEmailList([]));
            dispatch(setBreakdownResourceList([]));
            dispatch(breakDownResetResourceList());
            dispatch(setBreakdownNotes(null));
            dispatch(setBreakdownEditMode(false));
            dispatch(setBreakdownSelectedIndex(null));
            dispatch(setBreakDownAddFlag(false));
            dispatch(resetBreakdowbBrowsePage());
            dispatch(breakDownResetEmailChanges());
            dispatch(setUndispatchBreakdownFlag(false));
            if (driverfk != null && driverfk != 0) {
              dispatch(setIsDelayBreakdown(true));
            }
            navigate(
              "/new-breakdown/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverfk) +
                "/" +
                delayedUnitPK,
              {
                state: {
                  ...state,
                  unitId: unitfk,
                  companyName,
                },
              }
            );
          }}
          disabled={disableBreakdown}
          type="button"
        >
          Breakdown
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            dispatch(setDamageNewEmailList([]));
            dispatch(setDamageResourceList([]));
            dispatch(damageResetResourceList());
            dispatch(setDamageNotes(null));
            dispatch(setDamageEditMode(false));
            dispatch(setDamageSelectedIndex(null));
            dispatch(setDamageAddFlag(false));
            dispatch(resetDamageBrowsePage());
            dispatch(damageResetEmailChanges());
            dispatch(setUndispatchdelayFlag(false));
            navigate(
              "/new-damage/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverfk) +
                "/" +
                delayedUnitPK,
              {
                state: {
                  ...state,
                  unitId: unitfk,
                  companyName,
                },
              }
            );
          }}
        >
          Damage
        </button>

        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            if (state?.origin === "CHECKIN") {
              toast.success("Page Cancelled");
              dispatch(resetDriverCheckinState());
              navigate(state.returnTo);
              return;
            }

            if (localStorage.getItem("editYardDelay") === "true") {
              toast.success("Page Cancelled");
              navigate("/edit-yard-unit-selection");
              return;
            }
            if (localStorage.getItem("checkinDelay") === "true") {
              toast.success("Page Cancelled");
              navigate("/driver-selection");
              dispatch(setDriverId(null));
              return;
            }
            if (cameFrom === "delayDispatchMulti") {
              if (dispatchDelayArrayList?.length > 0 && dispatchDelayIndex < dispatchDelayArrayList?.length) {
                // END looping for last unit
                if (dispatchDelayIndex === dispatchDelayArrayList?.length - 1) {
                  // TODO: clear states as required, show popup if rquired
                  dispatch(setDispatchDelayIndex(0));
                  toast.success("Page Cancelled");
                  navigate(urlNavigation?.navigateTo);
                  dispatch(setNewDelayNavigation(null));
                  dispatch(resetSaveList({ key: "all" }));
                } else {
                  // CONTINUE iteration, stay on same screen with next unit
                  toast.success("Page Cancelled");
                  const newIndex = dispatchDelayIndex + 1;
                  dispatch(setDispatchDelayIndex(newIndex));
                  navigate(
                    `/delay-processing/new-delayed-unit-confirmation/${
                      dispatchDelayArrayList?.[newIndex]?.company
                    }/${dispatchDelayArrayList?.[newIndex]?.unitPK}/${
                      dispatchDelayArrayList?.[newIndex]?.driverFK || 0
                    }`
                  );
                }
              }
            } else if (cameFrom === "delayDispatch") {
              toast.success("Page Cancelled");
              navigate(urlNavigation?.navigateTo);
              dispatch(setNewDelayNavigation(null));
              return;
            } else {
              const checkinDelay = localStorage.getItem("checkinDelay");
              //delay navigate from driver checkin unit selection screen
              if (checkinDelay === "true") {
                localStorage.setItem("checkinDelay", "false");
                navigate(`/unit-selection/${driverfk}`);
              } else {
                navigate("/delay-processing/new-delayed-unit-browse");
                toast.success("Changes Cancelled");
              }
            }
          }}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormFooter;
