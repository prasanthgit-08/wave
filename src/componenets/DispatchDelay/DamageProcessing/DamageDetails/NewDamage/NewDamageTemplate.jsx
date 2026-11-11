import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFooter from "../../../../common/CommonFooter";
import Header from "../../../../common/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import NewDamgeContent from "./NewDamgeContent";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetDamageBrowsePage,
  resetEmailChanges,
  resetResourceList,
  setAddFlag,
  setEditMode,
  setNewEmailList,
  setNotes,
  setResourceList,
  setSelectedIndex,
} from "../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import {
  resetSaveList,
  setDispatchDelayIndex,
  setNewDelayNavigation,
} from "../../../../../redux/UnitActivationSlice";
import { setReserveBondFundFK } from "../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";
import {
  resetSplitTripLocation,
  setSplitTripFiles,
  setSplitTripMilesData,
  setUndispatchFlag,
  setUndispatchdelayFlag,
} from "../../../../../redux/UndispatchSlice";
import { setDriverReleased } from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { resetDriverCheckinState, setDriverId } from "../../../../../redux/DriverCheckinSlice";

const NewDamageTemplate = () => {
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [load, setLoad] = useState(false);
  const driverNum = Number(driverfk);
  const [cancelShow, setCancelShow] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const newGenerlTabValid = useSelector((state) => state.damageReducer.newGenerlTabValid);
  const newEmailTabValid = useSelector((state) => state.damageReducer.newEmailTabValid);
  const saveFormData = useSelector((state) => state.damageReducer.saveFormData);
  const documentsTabRedisKeys = useSelector((state) => state.damageReducer.documentsTabRedisKeys);

  const newDelayNavigation = useSelector((state) => state.unitActivationReducer.newDelayNavigation);
  const dispatchDelayIndex = useSelector((state) => state.unitActivationReducer.dispatchDelayIndex);
  const dispatchDelayArrayList = useSelector((state) => state.unitActivationReducer.dispatchDelayArrayList);
  const selectedDelayUnit = useSelector((state) => state.delayProcessing.selectedDelayUnit);
  const dispatchFK = useSelector((state) => state.delayProcessing.dispatchFK);
  const DriverFK = localStorage.getItem("delayProcess_driverFK");
  const delayedunitFK = localStorage.getItem("delayProcess_unitFK");
  const undispatchdelayFlag = useSelector((state) => state.undispatchReducer.undispatchdelayFlag);

  const releaseDispatchPK = useSelector((state) => state.undispatchReducer.releaseDispatchPK);
  const delayedUnitReleaseDriver = useSelector((state) => state.undispatchReducer.delayedUnitReleaseDriver);
  const urlNavigation = JSON.parse(localStorage.getItem("urlNavigation")) || newDelayNavigation;

  const cameFrom = urlNavigation?.from;
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
        //use to call damage save- before navigationg to release driver
        saveReleaseDriverDamage();
      },
      hidden: driverNum === 0 || driverNum === null || !releaseDispatchPK,
      disabled: saveFlag || delayedUnitReleaseDriver || isDriverWithDamageorBreakdown,
    },
    {
      label: "Save",
      onClick: () => saveNewDamage(),
      disabled: saveFlag,
    },
    {
      label: "Cancel",
      onClick: () => onCancel(),
    },
  ];

  /**
   * Used for Driver Release Program
   * save new  Damage before calling relese driver
   **/
  const saveReleaseDriverDamage = () => {
    setLoad(true);
    const payload = {
      ...saveFormData,
      redisKeys: documentsTabRedisKeys,
    };
    DelayDamageService.saveDelayDamge(payload)
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
        const delayedUnitFK = res?.data?.[0]?.DelayedunitFk;
        const finalDelayedUnitPK =
          delayedUnitPK != null && Number(delayedUnitPK) !== 0
            ? Number(delayedUnitPK)
            : Number(delayedUnitFK);
        //navigates to Driver release program
        navigate(
          `/releasedriver-splittrip-location-screen/${Number(driverfk)}/${finalDelayedUnitPK}/${Number(releaseDispatchPK)}/${Number(unitfk)}/${companyName}`
        );
        toast.success("Damage record added");
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
          "/damage-browse/" +
            companyName +
            "/" +
            Number(unitfk) +
            "/" +
            Number(driverfk) +
            "/" +
            Number(delayedUnitPK)
        );
        dispatch(resetDamageBrowsePage());
        dispatch(setDriverReleased(false));
        localStorage.removeItem("driverRelease");
        toast.error("Failed to add damage record");
      });
  };
  /**
   * save new  damage
   **/
  const saveNewDamage = () => {
    setLoad(true);
    const payload = {
      ...saveFormData,
      redisKeys: documentsTabRedisKeys,
    };
    DelayDamageService.saveDelayDamge(payload)
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
        if (state?.origin === "CHECKIN") {
          toast.success("Damage record added");
          dispatch(resetDriverCheckinState());
          dispatch(resetDamageBrowsePage());
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
              toast.success("Damage record added");
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
        } else if (cameFrom === "delayDispatch") {
          // Handle Unit Activation Single Delay Dispatch
          navigate(urlNavigation?.navigateTo);
          toast.success("Damage record added");
        }
        //used to set navigation back to undispatch main page
        else if (undispatchdelayFlag) {
          navigate("/undispatch/" + driverfk);
          toast.success("Damage record added");
          dispatch(setUndispatchFlag(false));
          dispatch(setUndispatchdelayFlag(false));
        } else {
          toast.success("Damage record added");
          if (delayedUnitPK != 0) {
            navigate(
              "/damage-browse/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverfk) +
                "/" +
                Number(delayedUnitPK)
            );
            dispatch(resetDamageBrowsePage());
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
        if (cameFrom === "delayDispatchMulti") {
          if (dispatchDelayArrayList?.length > 0 && dispatchDelayIndex < dispatchDelayArrayList?.length) {
            // END looping for last unit
            if (dispatchDelayIndex === dispatchDelayArrayList?.length - 1) {
              // TODO: clear states as required, show popup if rquired
              dispatch(setDispatchDelayIndex(0));
              toast.loading("Damage Failed, All Dispatch Delays Processed");
              navigate(urlNavigation?.navigateTo);
              dispatch(setNewDelayNavigation(null));
              dispatch(resetSaveList({ key: "all" }));
            } else {
              // CONTINUE iteration, stay on same screen with next unit
              toast.error(" Falied to add Damage record ");
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
        } else if (cameFrom === "delayDispatch") {
          // Handle Unit Activation Single Delay Dispatch
          toast.error(" Falied to add Damage record ");
          navigate(urlNavigation?.navigateTo);
        }
        //used to set navigation back to undispatch main page
        else if (undispatchdelayFlag) {
          navigate("/undispatch/" + driverfk);
          toast.error(" Falied to add Damage record ");
          dispatch(setUndispatchFlag(false));
          dispatch(setUndispatchdelayFlag(false));
        } else {
          if (delayedUnitPK != 0) {
            navigate(
              "/damage-browse/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverfk) +
                "/" +
                Number(delayedUnitPK)
            );
            dispatch(resetDamageBrowsePage());
          } else {
            navigate("/delay-processing/delayed-unit-browse");
          }
          toast.error(" Falied to add Damage record ");
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
    else if (undispatchdelayFlag) {
      navigate("/undispatch/" + driverfk);
      dispatch(setUndispatchFlag(false));
      dispatch(setUndispatchdelayFlag(false));
    } else {
      if (delayedUnitPK != 0) {
        navigate(
          "/damage-browse/" +
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
    toast.success("Changes cancelled");
  };

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Damage Processing"
          closeNavigationURL={
            undispatchdelayFlag
              ? `/driver-service-selection/${driverfk}/form`
              : cameFrom === "delayDispatchMulti" || cameFrom === "delayDispatch"
                ? `/delay-processing/new-delayed-unit-confirmation/${companyName}/${unitfk}/${driverfk}`
                : delayedUnitPK == 0
                  ? `/delay-processing/new-delayed-unit-confirmation/${companyName}/${unitfk}/${driverfk}`
                  : `/delay-processing/delayed-details/${companyName}/${Number(unitfk)}/${Number(driverfk)}/${Number(
                      delayedUnitPK
                    )}`
          }
          confirmClose
          closeModalTitle="Close Damage Changes"
          closeModalBody="Please confirm you want to close the program without saving your changes"
          closeConfirmationHandler={() => {
            dispatch(setNewEmailList([]));
            dispatch(setResourceList([]));
            dispatch(resetEmailChanges());
            dispatch(setNotes(null));
            dispatch(setEditMode(false));
            dispatch(setSelectedIndex(null));
            dispatch(setAddFlag(false));
            dispatch(resetResourceList(false));
            if (delayedUnitPK) {
              dispatch(resetDamageBrowsePage());
            }
            if (undispatchdelayFlag) {
              dispatch(setUndispatchFlag(false));
              dispatch(setUndispatchdelayFlag(false));
            }
            dispatch(setReserveBondFundFK(null));
          }}
        />
        <NewDamgeContent />
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
          title={"Cancel Damage Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default NewDamageTemplate;
