import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFooter from "../../../../common/CommonFooter";
import Header from "../../../../common/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import NewBreakdownContent from "./NewBreakdownContent";
import {
  resetEmailChanges,
  resetResourceList,
  setAddFlag,
  setEditMode,
  setNewEmailList,
  setNotes,
  setResourceList,
  setSelectedIndex,
  resetBreakdowbBrowsePage,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import ModalComponent from "../../../../common/ModalComponent";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import {
  resetSaveList,
  setDispatchDelayIndex,
  setNewDelayNavigation,
} from "../../../../../redux/UnitActivationSlice";
import { setDriverReleased } from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import {
  resetSplitTripLocation,
  setIsDelayBreakdown,
  setSplitTripFiles,
  setSplitTripMilesData,
  setUndispatchBreakdownFlag,
  setUndispatchFlag,
} from "../../../../../redux/UndispatchSlice";
import { resetDriverCheckinState, setDriverId } from "../../../../../redux/DriverCheckinSlice";
const NewBreakdownTemplate = () => {
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [load, setLoad] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const driverNum = Number(driverfk);

  const newGenerlTabValid = useSelector((state) => state.delaybreakdown.newGenerlTabValid);
  const newEmailTabValid = useSelector((state) => state.delaybreakdown.newEmailTabValid);
  const saveFormData = useSelector((state) => state.delaybreakdown.saveFormData);
  const documentsTabRedisKeys = useSelector((state) => state.delaybreakdown.documentsTabRedisKeys);

  const newDelayNavigation = useSelector((state) => state.unitActivationReducer.newDelayNavigation);
  const dispatchDelayIndex = useSelector((state) => state.unitActivationReducer.dispatchDelayIndex);
  const dispatchDelayArrayList = useSelector((state) => state.unitActivationReducer.dispatchDelayArrayList);
  const undispatchBreakdownFlag = useSelector((state) => state.undispatchReducer.undispatchBreakdownFlag);
  const urlNavigation = JSON.parse(localStorage.getItem("urlNavigation")) || newDelayNavigation;
  const cameFrom = urlNavigation?.from;
  const selectedDelayUnit = useSelector((state) => state.delayProcessing.selectedDelayUnit);
  const DriverFK = localStorage.getItem("delayProcess_driverFK");
  const delayedunitFK = localStorage.getItem("delayProcess_unitFK");
  const releaseDispatchPK = useSelector((state) => state.undispatchReducer.releaseDispatchPK);
  const delayedUnitReleaseDriver = useSelector((state) => state.undispatchReducer.delayedUnitReleaseDriver);
  const delayedUnitbreakdownFlag = useSelector((state) => state.undispatchReducer.delayedUnitbreakdownFlag);
  const delayedUnitdamageFlag = useSelector((state) => state.undispatchReducer.delayedUnitdamageFlag);
  const isDelayedWithBreakdown = delayedunitFK && delayedUnitbreakdownFlag;
  const isDelayedWithDamage = delayedunitFK && delayedUnitdamageFlag;
  const isDriverWithDamageorBreakdown = driverfk && (isDelayedWithBreakdown || isDelayedWithDamage);
  const buttons = [
    {
      label: "Release",
      onClick: () => {
        dispatch(setDriverReleased(true));
        localStorage.setItem("driverRelease", true);
        //use to call breakdown save- before navigationg to release driver
        saveReleaseDriverBreakdown();
      },
      hidden: driverNum === 0 || driverNum === null || !releaseDispatchPK,
      disabled: saveFlag || delayedUnitReleaseDriver || isDriverWithDamageorBreakdown,
    },
    {
      label: "Save",
      onClick: () => saveNewBreakdown(),
      disabled: saveFlag,
    },
    {
      label: "Cancel",
      onClick: () => onCancel(),
    },
  ];

  /**
   * Used for Driver Release Program
   * save new  breakdown before calling relese driver
   **/

  const saveReleaseDriverBreakdown = () => {
    setLoad(true);
    const payload = {
      ...saveFormData,
      redisKeys: documentsTabRedisKeys,
    };

    BreakdownProcessingService.saveBreakdown(payload)
      .then((res) => {
        setLoad(false);
        setCancelShow(false);
        dispatch(setNewEmailList([]));
        dispatch(setResourceList([]));
        dispatch(resetResourceList([]));
        dispatch(resetEmailChanges());
        dispatch(setNotes(null));
        dispatch(setEditMode(false));
        dispatch(setSelectedIndex(null));
        dispatch(setAddFlag(false));
        const delayedUnitFK = res?.data?.result?.[0]?.DelayedUnitFK;
        //navigates to Driver release program
        const finalDelayedUnitPK =
          delayedUnitPK != null && Number(delayedUnitPK) !== 0
            ? Number(delayedUnitPK)
            : Number(delayedUnitFK);
        navigate(
          `/releasedriver-splittrip-location-screen/${Number(driverfk)}/${finalDelayedUnitPK}/${Number(releaseDispatchPK)}/${Number(unitfk)}/${companyName}`
        );
        toast.success("Breakdown record added");
        dispatch(setUndispatchFlag(true));
        dispatch(resetSplitTripLocation());
        dispatch(setSplitTripFiles({ actionType: "clear" }));
        dispatch(setSplitTripMilesData(null));
      })
      .catch((err) => {
        setLoad(false);
        setCancelShow(false);
        dispatch(setNewEmailList([]));
        dispatch(setResourceList([]));
        dispatch(resetResourceList([]));
        dispatch(resetEmailChanges());
        dispatch(setNotes(null));
        dispatch(setEditMode(false));
        dispatch(setSelectedIndex(null));
        dispatch(setAddFlag(false));
        navigate(
          `/breakdown/browse/${companyName}/${Number(unitfk)}/${Number(driverfk)}/${Number(delayedUnitPK)}`
        );
        dispatch(resetBreakdowbBrowsePage());
        dispatch(setDriverReleased(false));
        localStorage.removeItem("driverRelease");
        toast.error("Failed to add breakdown record");
      });
  };

  /**
   * save new  breakdown
   **/
  const saveNewBreakdown = () => {
    setLoad(true);
    const payload = {
      ...saveFormData,
      redisKeys: documentsTabRedisKeys,
    };
    BreakdownProcessingService.saveBreakdown(payload)
      .then((res) => {
        setLoad(false);
        setCancelShow(false);
        dispatch(setNewEmailList([]));
        dispatch(setResourceList([]));
        dispatch(resetResourceList([]));
        dispatch(resetEmailChanges());
        dispatch(setNotes(null));
        dispatch(setEditMode(false));
        dispatch(setSelectedIndex(null));
        dispatch(setAddFlag(false));
        dispatch(setIsDelayBreakdown(false));
        if (state?.origin === "CHECKIN") {
          toast.success("Breakdown record added");

          dispatch(resetDriverCheckinState());
          dispatch(resetBreakdowbBrowsePage());
          navigate(state?.returnTo);
        } else if (cameFrom === "delayDispatchMulti") {
          if (dispatchDelayArrayList?.length > 0 && dispatchDelayIndex < dispatchDelayArrayList?.length) {
            // END looping for last unit
            if (dispatchDelayIndex === dispatchDelayArrayList?.length - 1) {
              // TODO: clear states as required, show popup if rquired
              dispatch(setDispatchDelayIndex(0));
              toast.success("All Dispatch Delays Processed");
              navigate(urlNavigation?.navigateTo);
              dispatch(setNewDelayNavigation(null));
              dispatch(resetSaveList({ key: "all" }));
            } else {
              // CONTINUE iteration, stay on same screen with next unit
              toast.success("Breakdown record added");
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
        } else if (localStorage.getItem("editYardDelay") === "true") {
          navigate("/edit-yard-unit-selection");
        } else if (localStorage.getItem("checkinDelay") === "true") {
          navigate("/driver-selection");
          dispatch(setDriverId(null));
        }
        //used to set navigation back to undispatch main page
        else if (undispatchBreakdownFlag) {
          navigate("/undispatch/" + driverfk);
          toast.success("Breakdown record added");
          dispatch(setUndispatchFlag(false));
          dispatch(setUndispatchBreakdownFlag(false));
        } else if (cameFrom === "delayDispatch") {
          // Handle Unit Activation Single Delay Dispatch
          toast.success("Breakdown record added");
          navigate(urlNavigation?.navigateTo);
        } else {
          // Handle Default Case
          toast.success("Breakdown record added");
          if (delayedUnitPK != 0) {
            navigate(
              "/breakdown/browse/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverfk) +
                "/" +
                Number(delayedUnitPK)
            );
            dispatch(resetBreakdowbBrowsePage());
          } else {
            navigate("/delay-processing/delayed-unit-browse");
          }
        }
      })
      .catch((err) => {
        setLoad(false);
        setCancelShow(false);
        dispatch(setNewEmailList([]));
        dispatch(setResourceList([]));
        dispatch(resetResourceList([]));
        dispatch(resetEmailChanges());
        dispatch(setNotes(null));
        dispatch(setEditMode(false));
        dispatch(setSelectedIndex(null));
        dispatch(setAddFlag(false));
        dispatch(setIsDelayBreakdown(false));
        if (cameFrom === "delayDispatchMulti") {
          if (dispatchDelayArrayList?.length > 0 && dispatchDelayIndex < dispatchDelayArrayList?.length) {
            // END looping for last unit
            if (dispatchDelayIndex === dispatchDelayArrayList?.length - 1) {
              // TODO: clear states as required, show popup if rquired
              dispatch(setDispatchDelayIndex(0));
              toast.loading("Breakdown Failed, All Dispatch Delays Processed");
              navigate(urlNavigation?.navigateTo);
              dispatch(setNewDelayNavigation(null));
              dispatch(resetSaveList({ key: "all" }));
            } else {
              // CONTINUE iteration, stay on same screen with next unit
              toast.error(" Falied to add Breakdown record ");
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
        } else if (localStorage.getItem("editYardDelay") === "true") {
          navigate("/edit-yard-unit-selection");
        } else if (localStorage.getItem("checkinDelay") === "true") {
          navigate("/driver-selection");
        } else if (cameFrom === "delayDispatch") {
          // Handle Unit Activation Single Delay Dispatch
          toast.error(" Falied to add Breakdown record ");
          navigate(urlNavigation?.navigateTo);
        } else if (undispatchBreakdownFlag) {
          navigate("/undispatch/" + driverfk);
          toast.error(" Falied to add Breakdown record ");
          dispatch(setUndispatchFlag(false));
          dispatch(setUndispatchBreakdownFlag(false));
        } else {
          if (delayedUnitPK != 0) {
            navigate(
              "/breakdown/browse/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverfk) +
                "/" +
                Number(delayedUnitPK)
            );
            dispatch(resetBreakdowbBrowsePage());
          } else {
            navigate("/delay-processing/delayed-unit-browse");
          }
          toast.error(" Falied to add Breakdown record ");
        }
      });
  };

  /**
   * save validation
   **/
  useEffect(() => {
    if (newEmailTabValid && newGenerlTabValid) {
      setSaveFlag(false);
    } else {
      setSaveFlag(true);
    }
  }, [newEmailTabValid, newGenerlTabValid]);

  /**
   * cancel button
   **/
  const onCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (cameFrom === "delayDispatchMulti" || cameFrom === "delayDispatch") {
      navigate(`/delay-processing/new-delayed-unit-confirmation/${companyName}/${unitfk}/${driverfk}`);
    }
    //used to set navigation back to undispatch main page
    else if (undispatchBreakdownFlag) {
      navigate("/undispatch/" + driverfk);
      dispatch(setUndispatchFlag(false));
      dispatch(setUndispatchBreakdownFlag(false));
    } else {
      if (delayedUnitPK != 0) {
        navigate(
          "/breakdown/browse/" +
            companyName +
            "/" +
            Number(unitfk) +
            "/" +
            Number(driverfk) +
            "/" +
            Number(delayedUnitPK)
        );
      } else {
        navigate(
          "/delay-processing/new-delayed-unit-confirmation/" + companyName + "/" + unitfk + "/" + driverfk
        );
      }
    }

    setCancelShow(false);
    dispatch(setNewEmailList([]));
    dispatch(setResourceList([]));
    dispatch(resetResourceList([]));
    dispatch(resetEmailChanges());
    dispatch(setNotes(null));
    dispatch(setEditMode(false));
    dispatch(setSelectedIndex(null));
    dispatch(setAddFlag(false));
    dispatch(setIsDelayBreakdown(false));
    toast.success("Changes cancelled");
  };

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Breakdown Processing"
          closeNavigationURL={
            undispatchBreakdownFlag
              ? `/driver-service-selection/${driverfk}/form`
              : cameFrom === "delayDispatchMulti" || cameFrom === "delayDispatch"
                ? `/delay-processing/new-delayed-unit-confirmation/${encodeURIComponent(companyName)}/${unitfk}/${driverfk}`
                : delayedUnitPK == 0
                  ? `/delay-processing/new-delayed-unit-confirmation/${encodeURIComponent(companyName)}/${unitfk}/${driverfk}`
                  : `/delay-processing/delayed-details/${encodeURIComponent(companyName)}/${Number(unitfk)}/${Number(driverfk)}/${Number(delayedUnitPK)}`
          }
          confirmClose
          closeModalTitle="Close Breakdown Changes"
          closeModalBody="Please confirm you want to close the program without saving your changes"
          closeConfirmationHandler={() => {
            dispatch(setNewEmailList([]));
            dispatch(setResourceList([]));
            dispatch(resetEmailChanges());
            dispatch(setNotes(null));
            dispatch(setEditMode(false));
            dispatch(setSelectedIndex(null));
            dispatch(setAddFlag(false));
            dispatch(setIsDelayBreakdown(false));
            dispatch(resetResourceList(false));
            if (delayedUnitPK) {
              dispatch(resetBreakdowbBrowsePage());
            }
            if (undispatchBreakdownFlag) {
              dispatch(setUndispatchFlag(false));
              dispatch(setUndispatchBreakdownFlag(false));
            }
          }}
        />
        <NewBreakdownContent />
        <CommonFooter buttons={buttons} />
        {load && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
        <ModalComponent
          show={cancelShow}
          ModalComponent
          onHide={handleCancelNo}
          title={"Cancel Breakdown Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default NewBreakdownTemplate;
