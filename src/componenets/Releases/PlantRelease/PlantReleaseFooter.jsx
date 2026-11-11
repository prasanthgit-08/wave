import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PlantReleaseService from "../../../services/PlantReleaseService";
import DeleteComponent from "../../common/DeleteComponent";
import {
  delayResetChanges,
  removeFromSelectedDataArray,
  resetBatchChanges,
  resetChanges,
  setBrowseData,
  setBrowseUnits,
  setContinueCheckFlag,
  setDataResetFlag,
  setDelay,
  setDelayInputArray,
  setDisableFlag,
  setLast5,
  setPageNumber,
  setRelease,
  setSelectedDataArray,
  setUnitInUse,
  updateBrowseDataElement,
  updateSelectedDataArray,
  updateSelectedDataArrayElement,
} from "../../../redux/PlantReleaseSlice";
import ModalComponent from "../../common/ModalComponent";

const PlantReleaseFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [continueFlag, setContinueFlag] = useState(false);
  const [resetContinue, setResetContinue] = useState(false);
  const [browseFlag, setBrowseFlag] = useState(false);
  const [optionFlag, setOptionFlag] = useState(false);
  const [saveMultibrowseFlag, setSaveMultibrowseFlag] = useState(false);
  const [delayFlag, setDelayFlag] = useState(false);
  const [releaseArrayLength, setReleaseArrayLength] = useState(0);
  const [undelayArrayLength, setUnDelayArrayLength] = useState(0);
  const [unreleaseArrayLength, setUnreleaseArrayLength] = useState(0);
  const [lockedUnits, setLockedUnits] = useState("");
  const [statusChangedUnits, setStatusChangedUnits] = useState("");
  const unitId = useSelector((state) => state.plantReleaseReducer.unitId);
  const unitInput = useSelector((state) => state.plantReleaseReducer.unitInput);
  const [cancelFlag, setCancelFlag] = useState(false);
  const [displayFlag, setDisplayFlag] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [show, setShow] = useState(false);
  const [singleShow, setSingleShow] = useState(false);
  const [isSingleUnitRelease, setIsSingleUnitRelease] = useState("");
  const [isSingleUnitUnrelease, setIsSingleUnitUnrelease] = useState("");
  const [isSingleUnitUndelay, setIsSingleUnitUndelay] = useState("");
  const [changedArray, setChangedArray] = useState([]);
  const [lookupFlag, setLookupFlag] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ title: "", body: "" });
  const disableFlag = useSelector((state) => state.plantReleaseReducer.disableFlag);
  const browseUnits = useSelector((state) => state.plantReleaseReducer.browseUnits);
  const singleUnits = useSelector((state) => state.plantReleaseReducer.singleUnits);
  const importList = useSelector((state) => state.plantReleaseReducer.importList);
  const browseData = useSelector((state) => state.plantReleaseReducer.browseData);
  const release = useSelector((state) => state.plantReleaseReducer.release);
  const delay = useSelector((state) => state.plantReleaseReducer.delay);
  const singleReleaseFormData = useSelector((state) => state.plantReleaseReducer.singleReleaseFormData);
  const delayFormData = useSelector((state) => state.plantReleaseReducer.delayFormData);
  const viewOnly = useSelector((state) => state.plantReleaseReducer.viewOnly);
  const outbound = useSelector((state) => state.plantReleaseReducer.outbound);
  const reload = useSelector((state) => state.plantReleaseReducer.reload);
  const motorized = useSelector((state) => state.plantReleaseReducer.motorized);
  const towable = useSelector((state) => state.plantReleaseReducer.towable);
  const yardId = useSelector((state) => state.plantReleaseReducer.yardId);
  const customerId = useSelector((state) => state.plantReleaseReducer.customerId);
  const customerInput = useSelector((state) => state.plantReleaseReducer.customerInput);
  const plantId = useSelector((state) => state.plantReleaseReducer.plantId);
  const plantInput = useSelector((state) => state.plantReleaseReducer.plantInput);
  const yardInput = useSelector((state) => state.plantReleaseReducer.yardInput);
  const totalElements = useSelector((state) => state.plantReleaseReducer.totalElements);
  const dataResetFlag = useSelector((state) => state.plantReleaseReducer.dataResetFlag);
  const alreadyDelayed = useSelector((state) => state.plantReleaseReducer.alreadyDelayed);
  const alreadyReleased = useSelector((state) => state.plantReleaseReducer.alreadyReleased);
  const delayInputArray = useSelector((state) => state.plantReleaseReducer.delayInputArray);
  const plantCustomerId = useSelector((state) => state.plantReleaseReducer.plantCustomerId);
  const plantCustomerInput = useSelector((state) => state.plantReleaseReducer.plantCustomerInput);
  const continueCheckFlag = useSelector((state) => state.plantReleaseReducer.continueCheckFlag);
  const selectedDataArray = useSelector((state) => state.plantReleaseReducer.selectedDataArray);
  const pageNumber = useSelector((state) => state.plantReleaseReducer.pageNumber);
  const loading = useSelector((state) => state.plantReleaseReducer.loading);
  const unitData = useSelector((state) => state.plantReleaseReducer.unitData);
  const [load, setLoad] = useState(false);

  const [uncheckedArrayList, setUncheckedArrayList] = useState([]);
  const [checkedArrayList, setCheckedArrayList] = useState([]);
  const [inverseOperationArrayList, setInverseOperationArrayList] = useState([]);
  const [crossStateArrayList, setCrossStateArrayList] = useState([]);
  const date1Valid = useSelector((state) => state.plantReleaseReducer.date1Valid);
  const date2Valid = useSelector((state) => state.plantReleaseReducer.date2Valid);

  /**
   *Used Selection screen-for hide/disable footer buttons
   */
  useEffect(() => {
    if (window.location.pathname === "/plant-release-selection-screen") {
      setCancelFlag(true);
      setContinueFlag(true);
      dispatch(setDataResetFlag(false));
      dispatch(setContinueCheckFlag(false));
    }
  }, [window.location.pathname]);

  /**
   *Used Option screen-for hide/disable footer buttons
   */
  useEffect(() => {
    if (window.location.pathname === "/plant-release-option-screen") {
      setCancelFlag(false);
      setContinueFlag(true);
      setDisplayFlag(true);

      dispatch(setContinueCheckFlag(false));
    }
  }, [window.location.pathname]);

  //For disable Next button on Option screeen
  useEffect(() => {
    if (window.location.pathname === "/plant-release-dealy-screen") {
      setDelayFlag(true);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (
      window.location.pathname === "/plant-release-option-screen" &&
      (browseData == null || browseData == undefined)
    ) {
      setBrowseFlag(true);
    } else {
      setBrowseFlag(false);
    }
  }, [window.location.pathname, browseData]);

  useEffect(() => {
    if (
      !date1Valid ||
      !date2Valid ||
      (window.location.pathname === "/plant-release-option-screen" &&
        !((outbound || reload) && (motorized || towable))) ||
      (customerId === "" && customerInput !== "") ||
      (plantId === "" && plantInput !== "") ||
      (yardId === "" && yardInput !== "") ||
      (plantCustomerId === "" && plantCustomerInput !== "") ||
      browseData === null
    ) {
      setOptionFlag(true);
    } else if (dataResetFlag === false) {
      setOptionFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    reload,
    outbound,
    motorized,
    towable,
    window.location.pathname,
    totalElements,
    dataResetFlag,
    browseData,
    customerId,
    customerInput,
    plantId,
    plantInput,
    yardId,
    yardInput,
    plantCustomerInput,
    plantCustomerId,
    date1Valid,
    date2Valid,
  ]);

  /**
   *single screen- Next button - enable/disable/hide
   */
  useEffect(() => {
    if (window.location.pathname === "/plant-release-single-screen") {
      setContinueFlag(true);
      dispatch(setDataResetFlag(false));
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (window.location.pathname === "/plant-release-selection-screen") {
      setOptionFlag(false);
    }
  }, [window.location.pathname]);

  /**
   * Used for disable save in single screen
   */

  useEffect(() => {
    if (singleUnits == true && unitId && unitInput) {
      setDisableSave(false);
      setSaveMultibrowseFlag(false);
    } else {
      setDisableSave(true);
    }
  }, [singleUnits, unitId, unitInput]);

  /**
   * save disable for mutibrowse screen
   */
  useEffect(() => {
    if (browseUnits === true) {
      setDisableSave(false);
      dispatch(setDisableFlag(false));
    }
  }, [browseUnits]);

  useEffect(() => {
    if (browseUnits === true) {
      if (selectedDataArray.length === 0) {
        setSaveMultibrowseFlag(true);
      } else {
        setSaveMultibrowseFlag(false);
      }
    }
  }, [selectedDataArray]);
  //Used for filtering changed units from the multibrowse screen
  useEffect(() => {
    if (browseData) {
      const changedArray = browseData.filter(
        (item) =>
          (item.plantRelease === true && item.alreadyReleased === false) ||
          (item.plantRelease === false && item.alreadyReleased === true) ||
          (item.unitOnShuttleDelay === false && item.alreadyDelayed === true) ||
          (item.unitOnShuttleDelay === true && !item.alreadyDelayed)
      );
      setChangedArray(changedArray);
    }
  }, [browseData]);

  /**
   * Plant Release Multi Browse Selection Implementation
   * ****************************************************
   */

  useEffect(() => {
    // Reducing payload size before sending data to backend
    let reducedBrowseData = browseData?.map((item) => ({
      unitPK: item.unitPK,
      unitNumber: item.unitNumber,
      plantRelease: item.plantRelease,
      unitOnShuttleDelay: item.unitOnShuttleDelay,
      alreadyReleased: item.alreadyReleased,
      alreadyDelayed: item.alreadyDelayed,
    }));

    // Array with changes in Frontend
    let changedArray = reducedBrowseData?.filter(
      (item) =>
        // Release Array condition
        (item.plantRelease === true && item.alreadyReleased === false) ||
        // Unrelease Array condition
        (item.plantRelease === false && item.alreadyReleased === true) ||
        // Delay Array condition
        (item.unitOnShuttleDelay === true && item.alreadyDelayed === false) ||
        // Undelay Array condition
        (item.unitOnShuttleDelay === false && item.alreadyDelayed === true)
    );
    const uncheckedArrayList = browseData?.filter(
      (item) =>
        !item.plantRelease && !item.alreadyReleased && !item.unitOnShuttleDelay && !item.alreadyDelayed
    );
    const checkedArrayList = browseData?.filter(
      (item) =>
        (item.plantRelease && item.alreadyReleased) || (item.unitOnShuttleDelay && item.alreadyDelayed)
    );
    const inverseOperationArrayList = browseData?.filter(
      (item) =>
        (item.alreadyReleased && item.unitOnShuttleDelay) || (item.alreadyDelayed && item.plantRelease)
    );
    const crossStateArrayList = browseData?.filter(
      (item) =>
        (item.alreadyReleased || item.alreadyDelayed) && !item.plantRelease && !item.unitOnShuttleDelay
    );
    setUncheckedArrayList(uncheckedArrayList);
    setCheckedArrayList(checkedArrayList);
    setInverseOperationArrayList(inverseOperationArrayList);
    setCrossStateArrayList(crossStateArrayList);

    // Compares changedArray <=> selectedDataArray && returns unique elements from changedArray
    const arrayToAdd = changedArray?.filter((item) =>
      selectedDataArray?.every((data) => data.unitPK !== item.unitPK)
    );
    if (arrayToAdd?.length > 0) {
      dispatch(updateSelectedDataArray(arrayToAdd));
    }
  }, [browseData]);

  useEffect(() => {
    // Compares selectedDataArray <=> uncheckedArrayList && returns duplicate elements from selectedDataArray
    const arrayToRemove = selectedDataArray?.filter((item) =>
      uncheckedArrayList?.some((data) => data.unitPK === item.unitPK)
    );
    if (arrayToRemove?.length > 0) {
      dispatch(removeFromSelectedDataArray(arrayToRemove));
    }
  }, [uncheckedArrayList]);

  useEffect(() => {
    // Compares selectedDataArray <=> checkedArrayList && returns duplicate elements from selectedDataArray
    const arrayToRemove = selectedDataArray?.filter((item) =>
      checkedArrayList?.some((data) => data.unitPK === item.unitPK)
    );
    if (arrayToRemove?.length > 0) {
      dispatch(removeFromSelectedDataArray(arrayToRemove));
    }
  }, [checkedArrayList]);

  useEffect(() => {
    // Compares inverseOperationArrayList <=> selectedDataArray && returns duplicate elements from inverseOperationArrayList
    let duplicateElements = inverseOperationArrayList?.filter((item) =>
      selectedDataArray?.some((data) => data.unitPK === item.unitPK)
    );
    if (duplicateElements?.length > 0) {
      duplicateElements?.forEach((unit) => {
        const indexToUpdate = selectedDataArray.findIndex((element) => element.unitPK === unit.unitPK);
        dispatch(
          updateSelectedDataArrayElement({
            index: indexToUpdate,
            element: unit,
          })
        );
      });
    }
  }, [inverseOperationArrayList]);

  useEffect(() => {
    // Compares crossStateArrayList <=> selectedDataArray && returns duplicate elements from crossStateArrayList
    let duplicateElements = crossStateArrayList?.filter((item) =>
      selectedDataArray?.some((data) => data.unitPK === item.unitPK)
    );
    if (duplicateElements?.length > 0) {
      duplicateElements?.forEach((unit) => {
        const indexToUpdate = selectedDataArray?.findIndex((element) => element.unitPK === unit.unitPK);
        dispatch(
          updateSelectedDataArrayElement({
            index: indexToUpdate,
            element: unit,
          })
        );
      });
    }
  }, [crossStateArrayList]);

  /**
   * Reflect the changes in selectedDataArray to browseData in multiple pages
   * OR for remembering selection in multiple pages
   */
  useEffect(() => {
    if (!loading) {
      // Compares selectedDataArray <=> browseData && returns duplicate elements from selectedDataArray
      let duplicateElements = selectedDataArray?.filter((item) =>
        browseData?.some((data) => data.unitPK === item.unitPK)
      );
      if (duplicateElements?.length > 0) {
        duplicateElements?.forEach((unit) => {
          const indexToUpdate = browseData.findIndex((element) => element.unitPK === unit.unitPK);
          dispatch(
            updateBrowseDataElement({
              index: indexToUpdate,
              element: unit,
            })
          );
        });
      }
    }
  }, [loading, pageNumber]);

  // ***********************************************************************

  /**
   * Used for Next button-navigation
   */

  const onHandleSingleReleaseContinue = () => {
    if (window.location.pathname === "/plant-release-single-screen" && delay === true) {
      dispatch(delayResetChanges());
      navigate("/plant-release-dealy-screen");
    } else if (window.location.pathname === "/plant-release-option-screen") {
      navigate("/plant-release-multibrowse-screen");
    }
  };

  /**
   * Cancel
   */
  const onHandleCancelShow = () => {
    if (window.location.pathname === "/plant-release-single-screen") {
      navigate("/plant-release-selection-screen");
      toast.success("Changes Cancelled");
      dispatch(resetChanges(""));
    } else if (window.location.pathname === "/plant-release-option-screen") {
      navigate("/plant-release-selection-screen");
      toast.success("Changes Cancelled");
      dispatch(resetBatchChanges(""));
    } else if (window.location.pathname === "/plant-release-multibrowse-screen") {
      navigate("/plant-release-option-screen");
      toast.success("Changes Cancelled");
      dispatch(setPageNumber(0));
    }
  };
  /**
   * Used for popup message-multibrowse screen
   */
  const handleShow = () => setShow(true);
  const handleStatusInfo = () => {
    setShow(false);

    const blockedUnits = [...(lockedUnits || "").split(","), ...(statusChangedUnits || "").split(",")]
      .map((u) => u.trim())
      .filter(Boolean);

    const unitNumber = delayInputArray?.[0]?.unitNumber;
    const isBlockedUnit = blockedUnits.includes(unitNumber);

    const shouldGoToDelayScreen =
      delayInputArray.length > 1 || (delayInputArray.length === 1 && !isBlockedUnit);

    if (shouldGoToDelayScreen) {
      navigate("/plant-release-dealy-screen");
    } else {
      dispatch(setSelectedDataArray([]));
      dispatch(setDelayInputArray([]));
      navigate("/plant-release-option-screen");
    }

    setLockedUnits("");
    setStatusChangedUnits("");
  };

  /**
   * Used for popup message-single unit screen
   */
  const handleMessageShow = () => setSingleShow(true);

  const handleReset = () => {
    dispatch(resetChanges(""));
    navigate("/plant-release-single-screen");
  };

  const showSingleMessage = () => {
    setSingleShow(false);
    handleReset();
  };

  const handleErrorHide = () => {
    setShowError(false);
    setErrorMsg(null);

    if (singleUnits === true) {
      if (lockedUnits) {
        handleReset();
      }
    }
  };

  const releasedUnitIds = localStorage.getItem("releasedUnitIds") || "";

  /**
   * Save
   */
  const savePlantRelease = () => {
    if (singleUnits === true) {
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
      };
      setLoad(true);
      PlantReleaseService.savePlantRelease(payload)
        .then(({ data }) => {
          if (data?.error?.errorCode !== "0") {
            toast.error("Save Failed");
            handleReset();

            return;
          }

          const lockedUnits = data?.response?.saveResult?.[0]?.LockedUnits || "";
          setLockedUnits(lockedUnits);
          const statusChanged = data?.response?.saveResult?.[0]?.StatusChanged || "";
          setStatusChangedUnits(statusChanged);

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

          const releasedStatus = data?.response?.saveResult?.[0]?.ReleasedStatus;
          const undelayedStatus = data?.response?.saveResult?.[0]?.UndelayedStatus;
          const unreleasedStatus = data?.response?.saveResult?.[0]?.UnreleasedStatus;

          setIsSingleUnitUnrelease(unreleasedStatus);
          setIsSingleUnitRelease(releasedStatus);
          setIsSingleUnitUndelay(undelayedStatus);

          if (releasedStatus === true) {
            let newUnitIds = [];

            if (typeof unitId === "string") {
              newUnitIds = unitId.split(",").map((id) => id?.trim());
            } else if (Array.isArray(unitId)) {
              newUnitIds = unitId.map((id) => String(id));
            } else {
              newUnitIds = [String(unitId)];
            }

            // Get existing string
            const existing = localStorage.getItem("releasedUnitIds");

            const existingUnits = existing ? existing.split(",") : [];

            // Merge without duplicates
            const updatedUnits = [...new Set([...existingUnits, ...newUnitIds])];

            // Store back as comma-separated string
            localStorage.setItem("releasedUnitIds", updatedUnits.join(","));
          }
          if (unreleasedStatus === true || releasedStatus === true || undelayedStatus === true) {
            handleMessageShow();
          }
        })
        .catch((error) => {
          toast.error("Single Unit not Updated");
          handleReset();
        })
        .finally(() => setLoad(false));
    } else if (browseUnits === true) {
      const releaseArray = selectedDataArray.filter(
        (item) => item.plantRelease === true && item.alreadyReleased === false
      );

      const unreleaseArray = selectedDataArray.filter(
        (item) => item.plantRelease === false && item.alreadyReleased === true
      );

      const delayArray = selectedDataArray.filter(
        (item) => item.unitOnShuttleDelay === true && item.alreadyDelayed === false
      );

      const undelayArray = selectedDataArray.filter(
        (item) => item.unitOnShuttleDelay === false && item.alreadyDelayed === true
      );

      dispatch(setDelayInputArray(delayArray));
      if (selectedDataArray.length > 0) {
        setLoad(true);
        const payload = {
          units: selectedDataArray?.map((item) => ({
            unitPK: item?.unitPK,
            origPlantRelease: item?.alreadyReleased ? 1 : 0,
            origUnitOnShuttleDelay: item?.alreadyDelayed ? 1 : 0,
            plantRelease: item?.plantRelease ? 1 : 0,
            unitOnShuttleDelay: item?.unitOnShuttleDelay ? 1 : 0,
          })),
          isSingle: false,
        };
        PlantReleaseService.savePlantRelease(payload)
          .then(({ data }) => {
            setLoad(false);

            if (data?.error?.errorCode !== "0") {
              toast.error("Save Failed");
              return;
            }

            const lockedUnits = data?.response?.saveResult?.[0]?.LockedUnits || "";
            setLockedUnits(lockedUnits);

            const statusChangedUnits = data?.response?.saveResult?.[0]?.StatusChanged || "";
            setStatusChangedUnits(statusChangedUnits);

            const unitsReleased = data?.response?.saveResult?.[0]?.ReleasedUnits;
            const unitsUnreleased = data?.response?.saveResult?.[0]?.UnreleasedUnits;
            const unitsUndelayed = data?.response?.saveResult?.[0]?.UndelayedUnits;
            const unitList = data?.response?.unitList;

            if (unitList?.length > 0) {
              unitList?.forEach((unit) => {
                const indexToUpdate = selectedDataArray?.findIndex((item) => item.unitPK === unit?.UnitPK);
                const unitToUpdate = selectedDataArray?.find((item) => item?.unitPK === unit?.UnitPK) || null;
                dispatch(
                  updateSelectedDataArrayElement({
                    index: indexToUpdate,
                    elementToUpdate: {
                      ...unitToUpdate,
                      alreadyReleased: unit?.PlantRelease,
                      alreadyDelayed: unit?.UnitOnShuttleDelay,
                    },
                  })
                );
              });
            }

            // Filter units with plantRelease = true
            const newUnitIds = selectedDataArray
              .filter((unit) => unit.plantRelease === true)
              .map((unit) => String(unit.unitPK));

            // Get existing string
            const existing = localStorage.getItem("releasedUnitIds");

            // Convert to array
            const existingUnits = existing ? existing.split(",") : [];

            // Merge (NO duplicate removal)
            const updatedUnits = [...existingUnits, ...newUnitIds];

            // Save back as string
            localStorage.setItem("releasedUnitIds", updatedUnits.join(","));
            //releasedUnitIds - used to send email
            setReleaseArrayLength(unitsReleased);
            setUnreleaseArrayLength(unitsUnreleased);
            setUnDelayArrayLength(unitsUndelayed);
            dispatch(setPageNumber(0));

            ///modal condition

            if (
              Number(unitsReleased) > 0 ||
              Number(unitsUnreleased) > 0 ||
              Number(unitsUndelayed) > 0 ||
              lockedUnits ||
              statusChangedUnits
            ) {
              handleShow();
            } else if (
              Number(unitsReleased) === 0 &&
              Number(unitsUnreleased) === 0 &&
              Number(unitsUndelayed) === 0 &&
              !lockedUnits &&
              !statusChangedUnits &&
              delayArray.length > 0
            ) {
              navigate("/plant-release-dealy-screen");
            }
          })
          .catch(() => toast.error("Save Failed"))
          .finally(() => setLoad(false));
      }
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/plant-release-dealy-screen") {
      setDelayFlag(true);
    }
  }, [window.location.pathname]);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onHandleSingleReleaseContinue}

          disabled={optionFlag || dataResetFlag || continueCheckFlag || browseFlag}
          hidden={!continueFlag || delayFlag}
        >
          Next
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={savePlantRelease}
          disabled={viewOnly || disableSave || disableFlag || saveMultibrowseFlag}
          hidden={cancelFlag || displayFlag}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onHandleCancelShow}
          hidden={cancelFlag || delayFlag}
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
        show={show}
        onHide={handleStatusInfo}
        title={"Success"}
        body={
          <div>
            {lockedUnits && <p> {"Units Locked by another user: " + lockedUnits} </p>}
            {statusChangedUnits && <p> {"Units Already updated:" + statusChangedUnits} </p>}
            <p> {"Released Units: " + releaseArrayLength} </p>
            <p> {"Unreleased Units: " + unreleaseArrayLength}</p>
            <p> {"Undelayed Units: " + undelayArrayLength}</p>
            <p> {"Units To Be Delayed: " + delayInputArray?.length}</p>
          </div>
        }
        handleOK={handleStatusInfo}
      />
      <DeleteComponent
        show={singleShow}
        onHide={showSingleMessage}
        title={
          <div>
            {isSingleUnitUndelay && isSingleUnitRelease ? "Unit Undelayed & Released" + "-" + unitInput : ""}
            {!(isSingleUnitUndelay && isSingleUnitRelease) && isSingleUnitRelease
              ? " Unit Released" + "-" + unitInput
              : ""}
            {isSingleUnitUnrelease ? " Unit Unreleased" + "-" + unitInput : ""}
            {!(isSingleUnitUndelay && isSingleUnitRelease) && isSingleUnitUndelay
              ? "Unit Undelayed" + "-" + unitInput
              : ""}
          </div>
        }
        body={
          <div>
            {isSingleUnitUndelay && isSingleUnitRelease ? "Unit Undelayed & Released" : ""}
            {!(isSingleUnitUndelay && isSingleUnitRelease) && isSingleUnitRelease ? " Unit Released" : ""}
            {isSingleUnitUnrelease ? " Unit Unreleased" : ""}
            {!(isSingleUnitUndelay && isSingleUnitRelease) && isSingleUnitUndelay ? "Unit Undelayed" : ""}
          </div>
        }
        handleOK={showSingleMessage}
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

export default PlantReleaseFooter;
