import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  delayResetChanges,
  resetChanges,
  setDelayArrayIndex,
  setDelayInputArray,
  setDelayNumber,
  setSelectedDataArray,
  setUnitInput,
  setUnitNumberValue,
  setRelease,
  setDelay,
  setUnitInUse,
} from "../../../../redux/PlantReleaseSlice";
import DeleteComponent from "../../../common/DeleteComponent";
import ModalComponent from "../../../common/ModalComponent";
const DelayEntryFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableSave, setDisableSave] = useState(true);
  const [delayShow, setDelayShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ title: "", body: "" });
  const [multiDelayShow, setMultiDelayShow] = useState(false);
  const [unreleaseShow, setUneleaseShow] = useState(false);
  const [releaseStatus, setReleaseStatus] = useState("");
  const [delayStatus, setDelayStatus] = useState("");
  const [noDelayShow, setNoDelayShow] = useState(false);
  const [show, setShow] = useState(false);
  const [cancelmessageShow, setCancelmessageShow] = useState(false);
  const [load, setLoad] = useState(false);

  const delayFormData = useSelector((state) => state.plantReleaseReducer.delayFormData);
  let delayNumber = useSelector((state) => state.plantReleaseReducer.delayNumber);
  const unitInput = useSelector((state) => state.plantReleaseReducer.unitInput);
  const reason = useSelector((state) => state.plantReleaseReducer.reason);
  const authorizedBy = useSelector((state) => state.plantReleaseReducer.authorizedBy);
  const unitId = useSelector((state) => state.plantReleaseReducer.unitId);
  const userId = useSelector((state) => state.plantReleaseReducer.userId);
  const delayDate = useSelector((state) => state.plantReleaseReducer.delayDate);
  const delayEntry = useSelector((state) => state.plantReleaseReducer.delayEntry);
  const delayArrayIndex = useSelector((state) => state.plantReleaseReducer.delayArrayIndex);
  const delayInputArray = useSelector((state) => state.plantReleaseReducer.delayInputArray);
  const selectedDataArray = useSelector((state) => state.plantReleaseReducer.selectedDataArray);
  const browseUnits = useSelector((state) => state.plantReleaseReducer.browseUnits);
  const singleUnits = useSelector((state) => state.plantReleaseReducer.singleUnits);
  const singleFormData = useSelector((state) => state.plantReleaseReducer.singleFormData);
  const driverInput = useSelector((state) => state.plantReleaseReducer.driverInput);
  const userInput = useSelector((state) => state.plantReleaseReducer.userInput);
  const unitData = useSelector((state) => state.plantReleaseReducer.unitData);

  const driverId = useSelector((state) => state.plantReleaseReducer.driverId);
  const reportedBy = useSelector((state) => state.plantReleaseReducer.reportedBy);
  const alreadyReleased = useSelector((state) => state.plantReleaseReducer.alreadyReleased);
  const release = useSelector((state) => state.plantReleaseReducer.release);
  const delay = useSelector((state) => state.plantReleaseReducer.delay);
  const delayUnitId = useSelector((state) => state.plantReleaseReducer.delayUnitId);
  const unitPk = useSelector((state) => state.plantReleaseReducer.unitPk);
  const delayDateValid = useSelector((state) => state.plantReleaseReducer.delayDateValid);
  const unitInUse = useSelector((state) => state.plantReleaseReducer.unitInUse);
  /**
   * Save delay
   */

  const saveUnrelease = () => {
    setLoad(true);
    const payload = {
      units: [
        {
          unitPK: unitId || null,
          plantRelease: release ? 1 : 0,
          unitOnShuttleDelay: delay ? 1 : 0,
          origPlantRelease: unitData.plantRelease ? 1 : 0,
          origUnitOnShuttleDelay: unitData.unitOnShuttleDelay ? 1 : 0,
        },
      ],
      isSingle: true,
      authorizedBy: singleFormData?.authorizedBy || "",
      delayDate: singleFormData?.delayDate || "",
      notes: singleFormData?.notes || "",
      reason: singleFormData?.reason || "",
      reportedBy: singleFormData?.reportedBy || "",
      reportingDriverFK: singleFormData?.reportingDriverFK || null,
      reportingUserFK: singleFormData?.reportingUserFK || null,
    };
    PlantReleaseService.savePlantRelease(payload)
      .then(({ data }) => {
        if (data?.error?.errorCode !== "0") {
          toast.error("Save Failed");

          if (singleUnits === true) {
            handleReset();
          }

          return;
        }

        const lockedUnits = data?.response?.saveResult?.[0]?.LockedUnits || "";
        const statusChanged = data?.response?.saveResult?.[0]?.StatusChanged || "";

        if (lockedUnits) {
          setShowError(true);
          setErrorMsg({ title: "Unit in Use", body: "This unit is currently in locked by another user" });

          return;
        }

        if (statusChanged) {
          setShowError(true);
          setErrorMsg({ title: "Unit in Use", body: "This unit has already been updated by another user" });

          dispatch(setUnitInUse(true));

          return;
        }

        const delayedStatus = data?.response?.saveResult?.[0]?.DelayedStatus;
        const unreleasedStatus = data?.response?.saveResult?.[0]?.UnreleasedStatus;

        if (unreleasedStatus && delayedStatus) {
          handleUnreleaseShow();
        }
        if (!unreleasedStatus && delayedStatus) {
          handleShow();
        }
      })
      .catch(() => {
        toast.error("Save Failed");

        if (singleUnits === true) {
          handleReset();
        }
      })
      .finally(() => setLoad(false));
  };
  const unitNumberValue = useSelector((state) => state.plantReleaseReducer.unitNumberValue);

  const saveDelay = () => {
    if (browseUnits === true) {
      if (delayInputArray?.length > 0 && delayArrayIndex < delayInputArray?.length) {
        setLoad(true);
        const unit = selectedDataArray?.find((item) => item.unitPK === delayFormData?.unitFK);
        const delayPayload = {
          units: [
            {
              unitPK: delayFormData?.unitFK || null,
              origPlantRelease: unit?.alreadyReleased ? 1 : 0,
              origUnitOnShuttleDelay: unit?.alreadyDelayed ? 1 : 0,
              plantRelease: unit?.plantRelease ? 1 : 0,
              unitOnShuttleDelay: 1,
            },
          ],
          isSingle: false,
          authorizedBy: delayFormData?.authorizedBy || "",
          delayDate: delayFormData?.delayDate || "",
          notes: delayFormData?.notes || "",
          reason: delayFormData?.reason || "",
          reportedBy: delayFormData?.reportedBy || "",
          reportingDriverFK: delayFormData?.reportingDriverFK || null,
          reportingUserFK: delayFormData?.reportingUserFK || null,
        };
        PlantReleaseService.savePlantRelease(delayPayload)
          .then(({ data }) => {
            setLoad(false);

            if (data?.error?.errorCode !== "0") {
              toast.error("Save Failed");
              return;
            }

            const unitsDelayed = data?.response?.saveResult?.[0]?.DelayedUnits;
            const lockedUnits = data?.response?.saveResult?.[0]?.LockedUnits || "";
            const statusChanged = data?.response?.saveResult?.[0]?.StatusChanged || "";

            if (lockedUnits) {
              setShowError(true);
              setErrorMsg({ title: "Unit in Use", body: "This unit is currently in locked by another user" });

              return;
            }

            if (statusChanged) {
              setShowError(true);
              setErrorMsg({
                title: "Unit in Use",
                body: "This unit has already been updated by another user",
              });

              return;
            }

            if (Number(unitsDelayed) > 0) {
              dispatch(setDelayNumber(delayNumber + 1));
            }

            dispatch(delayResetChanges());

            if (delayArrayIndex === delayInputArray?.length - 1) {
              dispatch(setDelayArrayIndex(0));
              dispatch(setUnitInput(""));
              handleDelayShow();
            } else {
              toast.success("Delay Saved");
              navigate("/plant-release-dealy-screen");
              dispatch(setDelayArrayIndex(delayArrayIndex + 1));
            }
          })
          .catch(() => toast.error("Save Failed"))
          .finally(() => setLoad(false));
      }
    }

    if (singleUnits === true) {
      if (release === false && alreadyReleased === false) {
        setLoad(true);
        const delayPayload = {
          units: [
            {
              unitPK: singleFormData?.unitFK || null,
              plantRelease: release ? 1 : 0,
              unitOnShuttleDelay: delay ? 1 : 0,
              origPlantRelease: unitData.plantRelease ? 1 : 0,
              origUnitOnShuttleDelay: unitData.unitOnShuttleDelay ? 1 : 0,
            },
          ],
          isSingle: true,
          authorizedBy: singleFormData?.authorizedBy || "",
          delayDate: singleFormData?.delayDate || "",
          notes: singleFormData?.notes || "",
          reason: singleFormData?.reason || "",
          reportedBy: singleFormData?.reportedBy || "",
          reportingDriverFK: singleFormData?.reportingDriverFK || null,
          reportingUserFK: singleFormData?.reportingUserFK || null,
        };
        PlantReleaseService.savePlantRelease(delayPayload)
          .then(({ data }) => {
            setLoad(false);

            if (data?.error?.errorCode !== "0") {
              toast.error("Save Failed");
              return;
            }

            const lockedUnits = data?.response?.saveResult?.[0]?.LockedUnits || "";
            const statusChanged = data?.response?.saveResult?.[0]?.StatusChanged || "";

            if (lockedUnits) {
              setShowError(true);
              setErrorMsg({ title: "Unit in Use", body: "This unit is currently in locked by another user" });

              return;
            }

            if (statusChanged) {
              setShowError(true);
              setErrorMsg({
                title: "Unit in Use",
                body: "This unit has already been updated by another user",
              });

              dispatch(setUnitInUse(true));

              return;
            }

            const status = data?.response?.saveResult?.[0]?.DelayedStatus;
            if (status === true) {
              handleShow();
            }
          })
          .catch(() => toast.error("Save Failed"))
          .finally(() => setLoad(false));
      }
      if (alreadyReleased === true && release === false) {
        saveUnrelease();
      }
    }
  };
  /**
   * Disable save
   */
  useEffect(() => {
    if (
      (driverId !== "" || userId !== "" || reportedBy !== "") &&
      reason !== "" &&
      authorizedBy !== "" &&
      delayDateValid
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [userId, reason, authorizedBy, driverId, driverInput, userInput, reportedBy, delayDateValid]);
  /**
   *Used for popup message-Save
   */

  const handleReset = () => {
    dispatch(delayResetChanges());
    dispatch(resetChanges());
    navigate("/plant-release-single-screen");
  };

  const handleUnreleaseShow = () => setUneleaseShow(true);
  const unreleaseMessage = () => {
    setUneleaseShow(false);
    handleReset();
  };
  const handleShow = () => setDelayShow(true);

  const delayShowMessage = () => {
    setDelayShow(false);
    handleReset();
  };
  const handleDelayShow = () => {
    dispatch(setUnitInput(""));
    dispatch(delayResetChanges());
    setMultiDelayShow(true);
  };
  const delayMessage = () => {
    dispatch(setUnitInput(""));
    dispatch(setDelayNumber(0));
    setMultiDelayShow(false);
    dispatch(delayResetChanges());
    navigate("/plant-release-option-screen");
  };

  const handleErrorHide = () => {
    setShowError(false);
    setErrorMsg(null);

    if (singleUnits === true) {
      if (!unitInUse) {
        handleReset();
      } else {
        navigate("/plant-release-single-screen");
      }
    }

    // In case of Unit Lock & Unit Status change, iterate to next unit
    if (browseUnits === true) {
      if (delayInputArray?.length > 0 && delayArrayIndex < delayInputArray?.length) {
        // dispatch(setDelayNumber(delayNumber + 1));
        dispatch(delayResetChanges());

        if (delayArrayIndex === delayInputArray?.length - 1) {
          dispatch(setDelayArrayIndex(0));
          dispatch(setUnitInput(""));
          handleDelayShow();
        } else {
          navigate("/plant-release-dealy-screen");
          dispatch(setDelayArrayIndex(delayArrayIndex + 1));
        }
      }
    }
  };

  /**
   *Used for popup message-Cancel
   */
  const onClickCancel = () => {
    if (singleUnits === true) {
      if (release === false && alreadyReleased === false) {
        handleCancelShow();
      } else if (alreadyReleased === true && release === false) {
        const payload = {
          units: [
            {
              unitPK: unitPk || null,
              plantRelease: release ? 1 : 0,
              unitOnShuttleDelay: 0,
              origPlantRelease: unitData.plantRelease ? 1 : 0,
              origUnitOnShuttleDelay: unitData.unitOnShuttleDelay ? 1 : 0,
            },
          ],
          isSingle: true,
        };
        PlantReleaseService.savePlantRelease(payload)
          .then(({ data }) => {
            const lockedUnits = data?.response?.saveResult?.[0]?.LockedUnits || "";
            const unreleasedStatus = data?.response?.saveResult?.[0]?.UnreleasedStatus;
            const statusChanged = data?.response?.saveResult?.[0]?.StatusChanged || "";

            if (lockedUnits) {
              setShowError(true);
              setErrorMsg({ title: "Unit in Use", body: "This unit is currently in locked by another user" });

              return;
            }

            if (statusChanged) {
              setShowError(true);
              setErrorMsg({
                title: "Unit in Use",
                body: "This unit has already been updated by another user",
              });

              dispatch(setUnitInUse(true));

              return;
            }

            if (unreleasedStatus) {
              handleDelayUnrelease();
            }
          })
          .catch(() => toast.error("Unrelease Failed"));
      }
    }
    if (browseUnits === true) {
      // eslint-disable-next-line no-lone-blocks
      {
        dispatch(delayResetChanges());
        dispatch(setDelayArrayIndex(delayArrayIndex + 1));
        navigate("/plant-release-dealy-screen");
        if (delayArrayIndex === delayInputArray?.length - 1) {
          dispatch(setDelayArrayIndex(0));
          cancelShowNew();
        }

        if (
          delayInputArray[delayArrayIndex].alreadyReleased &&
          delayInputArray[delayArrayIndex].unitOnShuttleDelay
        ) {
          PlantReleaseService.releasePlant(delayUnitId, true, false);
        }
      }
    }
  };
  const handleCancelShow = () => {
    setNoDelayShow(true);
  };
  const nodelayMessage = () => {
    dispatch(setUnitNumberValue(unitInput));
    setNoDelayShow(false);
    dispatch(delayResetChanges());
    dispatch(resetChanges());
    toast.success("Changes Cancelled");
    navigate("/plant-release-single-screen");
  };

  const cancelShowNew = () => {
    dispatch(setUnitInput(""));
    setShow(true);
  };
  const cancelMessage = () => {
    dispatch(delayResetChanges());
    dispatch(setSelectedDataArray([]));
    dispatch(setDelayInputArray([]));
    dispatch(setDelayNumber(0));
    dispatch(delayResetChanges());
    setShow(false);
    toast.success("Delay Cancelled");
    navigate("/plant-release-option-screen");
  };

  const handleDelayUnrelease = () => {
    setCancelmessageShow(true);
  };
  const message = () => {
    setCancelmessageShow(false);
    dispatch(resetChanges());
    dispatch(delayResetChanges());
    navigate("/plant-release-single-screen");
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={saveDelay}
          disabled={disableSave}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onClickCancel}
        >
          Cancel
        </button>
      </div>
      <ModalComponent
        showError
        showOK
        show={showError}
        onHide={() => handleErrorHide()}
        title={errorMsg?.title}
        body={errorMsg?.body}
      />
      <DeleteComponent
        show={delayShow}
        onHide={delayShowMessage}
        title={"Unit Delayed" + "-" + unitInput}
        body={"Delay Saved Sucessfully"}
        handleOK={delayShowMessage}
      />
      <DeleteComponent
        show={multiDelayShow}
        onHide={delayMessage}
        title={"Success"}
        body={"Delayed Units:" + delayNumber}
        handleOK={delayMessage}
      />
      <DeleteComponent
        show={unreleaseShow}
        onHide={unreleaseMessage}
        title={"Unit Unreleased & Delayed" + "-" + unitInput}
        body={"Unit Unreleased & Delayed"}
        handleOK={unreleaseMessage}
      />
      <DeleteComponent
        show={noDelayShow}
        onHide={nodelayMessage}
        title={"Delay Cancelled" + "-" + unitInput}
        body={"Delay Cancelled"}
        handleOK={nodelayMessage}
      />
      <DeleteComponent
        show={show}
        onHide={cancelMessage}
        title={"Success"}
        body={" Delayed Units:" + delayNumber}
        handleOK={cancelMessage}
      />
      <DeleteComponent
        show={cancelmessageShow}
        onHide={message}
        title={" Unrelease & Delay Cancelled" + "-" + unitInput}
        body={"Unrelease & Delay Cancelled"}
        handleOK={message}
      />
      {load && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DelayEntryFooter;
