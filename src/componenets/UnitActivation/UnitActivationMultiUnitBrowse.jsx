/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../common/PaginationComponent";
import UnitActivationFooter from "./UnitActivationFooter";
import UnitActivationHeader from "./UnitActivationHeader";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setUnitBrowseLoading,
  setPageNumber,
  setSaveDisable,
  setUnitBrowseList,
  setTotalElements,
  setTotalPages,
  updateUnitBrowseList,
  setLoader,
  resetSaveList,
  setUnitIndex,
  setDelay,
  persistMultiPageSelection,
  setBrowseType,
  setNewDelayNavigation,
  setSessionId,
  setEnforceScalePlateWeights,
} from "../../redux/UnitActivationSlice";
import UnitActivationService from "../../services/UnitActivationService";
import moment from "moment";
import DeleteComponent from "../common/DeleteComponent";
import LoadingIcon from "../common/LoadingIcon";
import WarningModalPopUp from "../common/WarningModalPopUp";
import { PROGRAMS } from "../../constants/permissionConstants";
import { usePermission } from "../../hooks/usePermission";
import CommonModal from "../../components/common/commonModal";
import { lockScreens } from "../../constants/processLockConfig";
import toast from "react-hot-toast";

function UnitActivationMultiUnitBrowse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkPermission } = usePermission();

  const [activationAddCount, setActivationAddCount] = useState(0);
  const [activationUpdateCount, setActivationUpdateCount] = useState(0);
  const [deActivationAddCount, setDeActivationAddCount] = useState(0);
  const [deActivationUpdateCount, setDeActivationUpdateCount] = useState(0);
  const [activationDelayAddCount, setActivationDelayAddCount] = useState(0);
  const [activationDelayUpdateCount, setActivationDelayUpdateCount] = useState(0);
  const [saveFailedList, setSaveFailedList] = useState([]);
  const [unDelayCount, setUnDelayCount] = useState(0);
  const [dispatchDelayCount, setDispatchDelayCount] = useState(0);
  const [postDeleteCount, setPostDeleteCount] = useState(0);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("Data Successfully saved.");
  const [isFormValid, setIsFormValid] = useState(true);
  const [lockError, setLockError] = useState("");
  const {
    browseType,
    pageNumber,
    totalPages,
    totalElements,
    unitBrowseFilter,
    unitBrowseList,
    unitBrowseLoading,
    viewOnly,
    holdArrayList,
    shuttleDelayArrayList,
    dispatchDelayArrayList,
    postArrayList,
    radioSelection,
    enforceScalePlateWeights,
  } = useSelector((state) => state.unitActivationReducer);
  const activationArrayList = useSelector((state) => state.unitActivationReducer.activationArrayList);
  const sessionId = localStorage.getItem("sessionId") || null;

  const getAllUnitNumbers = (string) => {
    dispatch(setUnitBrowseLoading(true));
    UnitActivationService.getUnitsForActivation({
      pageNumber: pageNumber,
      pageSize: 17,
      sortBy: unitBrowseFilter?.sortBy,
      active: unitBrowseFilter?.active,
      available: unitBrowseFilter?.available,
      adsView: unitBrowseFilter?.adsView,
      adsActive: unitBrowseFilter?.adsActive,
      reload: unitBrowseFilter?.reload,
      outbound: unitBrowseFilter?.outbound,
      motorized: unitBrowseFilter?.motorized,
      haulAndTow: unitBrowseFilter?.haulAndTow,
      flatbed: unitBrowseFilter?.flatbed,
      popup: unitBrowseFilter?.popup,
      truckCamper: unitBrowseFilter?.truckCamper,
      towable: unitBrowseFilter?.towable,
      customerFK: unitBrowseFilter?.customerId,
      plantFK: unitBrowseFilter?.plantId,
      yardFK: unitBrowseFilter?.yardId,
      unitTypeGroupFK: unitBrowseFilter?.unitTypeGroupId,
      lengthFrom: unitBrowseFilter?.lengthFrom,
      lengthTo: unitBrowseFilter?.lengthTo,
      orderDateFilter: unitBrowseFilter?.orderDate,
      canadaOnly: unitBrowseFilter?.canadaOnly,
      pickupState: unitBrowseFilter?.pickupState,
      deliveryState: unitBrowseFilter?.deliveryState,
      showDelay: radioSelection === "delay" ? true : false,
    })
      .then((response) => {
        if (response?.data?.unitsForActivation?.[0]?.ErrorCode === 1) {
          setLockError(response?.data?.unitsForActivation?.[0]?.ErrorMsg);
          dispatch(setUnitBrowseList([]));
        } else {
          setLockError("");
          const data = response?.data?.unitsForActivation;
          const unitsList = data?.map((unit) => ({
            ...unit,
            unitNumber: unit.unitNumber?.trim(),
            sisterCompanyPKList:
              typeof unit.sisterCompanyPKList === "string"
                ? unit.sisterCompanyPKList?.split(",")?.map(Number)
                : [], ////unit.sisterCompanyPKList || [],
            previousSisterCompanyPKList:
              typeof unit.previousSisterCompanyPKList === "string"
                ? unit.previousSisterCompanyPKList?.split(",")?.map(Number)
                : [],
            previousDelayDispatchReason: unit?.previousDelayDispatchReason || "",
            previousBonusPoolRate: unit?.bonusPoolRate || 0,
            previousGvwr: unit?.gvwr || 0,
            previousShippingWeight: unit?.shippingWeight || 0,
            previousDriverViewOnly: unit?.driverViewOnly || false,
            previousDriverDispatch: unit?.driverDispatch || false,
          }));
          localStorage.setItem("sessionId", response?.data?.sessionId);
          dispatch(setUnitBrowseList(unitsList || []));
          dispatch(setTotalElements(response.data.pagination?.[0]?.TotalElements));
          dispatch(setTotalPages(response.data.pagination?.[0]?.TotalPages));
          dispatch(setUnitBrowseLoading(false));
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => dispatch(setUnitBrowseLoading(false)));
  };

  const lockReleaseUnitActivation = async () => {
    try {
      if (!sessionId) return;
      const response = await UnitActivationService.lockReleaseUnitActivation({
        sessionId: sessionId,
        processName: lockScreens.UNIT_ACTIVATION,
      });

      if (response?.status === 200) {
        // localStorage.removeItem("sessionId");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFurtherNavigation = () => {
    if (shuttleDelayArrayList?.length > 0) {
      dispatch(setDelay("shuttle"));
      navigate("/unit-activation-shuttle-delay");
    } else if (holdArrayList?.length > 0) {
      navigate("/unit-activation-multi-unit-hold");
    } else if (postArrayList?.length > 0) {
      navigate("/unit-activation-multi-unit-sister-browse");
    } else if (dispatchDelayArrayList?.length > 0) {
      dispatch(setDelay("dispatch"));

      const obj = {
        from: "delayDispatchMulti",
        navigateTo: "/unit-activation-selections",
      };
      localStorage.setItem("urlNavigation", JSON.stringify(obj));
      navigate(
        `/delay-processing/new-delayed-unit-confirmation/${dispatchDelayArrayList?.[0]?.company}/${
          dispatchDelayArrayList?.[0]?.unitPK
        }/${dispatchDelayArrayList?.[0]?.driverFK || 0}`
      );
    } else {
      dispatch(
        resetSaveList({
          key: "all",
        })
      );
      navigate("/unit-activation-selections");
    }
  };

  const saveHandler = () => {
    dispatch(setLoader(true));

    const payload = {
      UnitActivationVO: activationArrayList.map((unit) => ({
        ...unit,
      })),
      SessionID: sessionId,
      isMultibrowse: true,
    };
    UnitActivationService.saveUnitActivation(payload)
      .then((response) => {
        dispatch(setLoader(false));
        if (response.data !== "") {
          const data = response.data?.unitActivationSave?.[0];
          setActivationAddCount(data.activationAddCount);
          setActivationUpdateCount(data.activationUpdateCount);
          setDeActivationAddCount(data.deActivationAddCount);
          setDeActivationUpdateCount(data.deActivationUpdateCount);
          setActivationDelayAddCount(data.activationDelayAddCount);
          setActivationDelayUpdateCount(data.activationDelayUpdateCount);
          setUnDelayCount(data.unDelayCount);
          setDispatchDelayCount(data.dispatchDelayCount);
          setPostDeleteCount(data.postDeleteCount);
          setSaveFailedList(
            response?.data?.unsavedList?.map((item) => `${item?.UnitNumber} - ${item?.failedUnits}`) || []
          );
          dispatch(setPageNumber(0));
          dispatch(
            resetSaveList({
              key: "activation",
            })
          );
          if (
            Number(data.activationAddCount) > 0 ||
            Number(data.activationUpdateCount) > 0 ||
            Number(data.deActivationAddCount) > 0 ||
            Number(data.deActivationUpdateCount) > 0 ||
            Number(data.activationDelayAddCount) > 0 ||
            Number(data.activationDelayUpdateCount) > 0 ||
            Number(data.unDelayCount) > 0 ||
            shuttleDelayArrayList?.length > 0 ||
            dispatchDelayArrayList?.length > 0 ||
            Number(data.postDeleteCount) > 0 ||
            response?.data.unsavedList?.length >= 0
          ) {
            handleShow();
          }
        }
      })
      .catch((err) => {
        dispatch(setLoader(false));
        if (err.response) {
          toast.error("something went wrong");
          if (err.response?.data?.dataObj) {
            setActivationAddCount(err?.response?.data?.dataObj?.activationAddCount);
            setActivationUpdateCount(err?.response?.data?.dataObj?.activationUpdateCount);
            setDeActivationAddCount(err?.response?.data?.dataObj?.deActivationAddCount);
            setDeActivationUpdateCount(err?.response?.data?.dataObj?.deActivationUpdateCount);
            setActivationDelayAddCount(err?.response?.data?.dataObj?.activationDelayAddCount);
            setActivationDelayUpdateCount(err?.response?.data?.dataObj?.activationDelayUpdateCount);
            setUnDelayCount(err?.response?.data?.dataObj?.unDelayCount);
            setDispatchDelayCount(err?.response?.data?.dataObj?.dispatchDelayCount);
            setPostDeleteCount(err?.response?.data?.dataObj?.postDeleteCount);
            setSaveFailedList(err?.response?.data?.dataObj?.saveFailed || []);
            dispatch(setPageNumber(0));
            dispatch(
              resetSaveList({
                key: "activation",
              })
            );
            if (
              Number(err?.response?.data?.dataObj?.activationAddCount) > 0 ||
              Number(err?.response?.data?.dataObj?.activationUpdateCount) > 0 ||
              Number(err?.response?.data?.dataObj?.deActivationAddCount) > 0 ||
              Number(err?.response?.data?.dataObj?.deActivationUpdateCount) > 0 ||
              Number(err?.response?.data?.dataObj?.activationDelayAddCount) > 0 ||
              Number(err?.response?.data?.dataObj?.activationDelayUpdateCount) > 0 ||
              Number(err?.response?.data?.dataObj?.unDelayCount) > 0 ||
              Number(err?.response?.data?.dataObj?.dispatchDelayCount) > 0 ||
              Number(err?.response?.data?.dataObj?.postDeleteCount) > 0 ||
              shuttleDelayArrayList?.length > 0 ||
              dispatchDelayArrayList?.length > 0 ||
              err?.response?.data?.dataObj?.unsavedList?.length > 0
            ) {
              handleShow();
            }
          } else {
            // The request was made and the server responded with a status code
            setSaveError(true);
            setErrorMessage(err.response?.data?.errorMsg || "Sorry, something went wrong.Please try again.");
            setModalPopUp(true);
          }
        } else if (err.request) {
          // The request was made but no response was received
          setSaveError(true);
          setErrorMessage("Sorry, it's unable to establish a connection to the remote service.");
          setModalPopUp(true);
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(err.response?.data?.errorMsg || "Sorry, something went wrong.Please try again.");
        }
        setSaveError(true);
      });
  };

  const cancelHandler = () => {
    dispatch(
      resetSaveList({
        key: "all",
      })
    );
    navigate("/unit-activation-selections");
    dispatch(setBrowseType(""));
  };

  /**
   * Used for popup message-multibrowse screen
   */
  const handleShow = () => setShow(true);
  const ShowMessage = () => {
    handleFurtherNavigation();
    setShow(false);
  };

  /**
   * Calls warning popup modal
   * to show the status of error
   **/
  const warningPopupModalHide = () => {
    if (saveError === true) {
      dispatch(setLoader(false));
      setSaveError(false);
      setErrorMessage("");
      setSaveMessage("");
      setModalPopUp(false);
    } else {
      setModalPopUp(false);
    }
  };

  const closeHandler = () => {
    dispatch(
      resetSaveList({
        key: "all",
      })
    );
    //Comment to be kept as a backup
    // navigate("/unit-activation-multi-unit");
    navigate("/");
    dispatch(setBrowseType(""));
  };

  const isValidDecimalTwoFour = (value) => {
    var regexp = /^\d{0,2}(\.\d{1,4})?$/;
    if (regexp.test(value)) {
      return true;
    } else {
      return false;
    }
  };

  const isRecordValid = (record) => {
    if (
      (!record.bonusPoolRate || isValidDecimalTwoFour(record.bonusPoolRate)) &&
      (!record.delayDispatch || (record.delayDispatch && record.delayDispatchReason !== ""))
    ) {
      return true; // Record is valid
    } else {
      return false; // Record is invalid
    }
  };

  useEffect(() => {
    dispatch(setUnitIndex(null));
  }, [pageNumber]);

  useEffect(() => {
    if (!browseType) return;
    dispatch(setUnitBrowseLoading(true));
    getAllUnitNumbers();
  }, [viewOnly, pageNumber]);

  useEffect(() => {
    if (browseType === "") {
      navigate("/unit-activation-selections");
    }
  }, []);

  useEffect(() => {
    const selectedArrayList = [
      ...activationArrayList,
      ...holdArrayList,
      ...shuttleDelayArrayList,
      ...postArrayList,
    ];
    const inValid = selectedArrayList.some((record) => !isRecordValid(record));
    setIsFormValid(!inValid ? true : false);
  }, [activationArrayList, holdArrayList, shuttleDelayArrayList, postArrayList]);

  /**
   * Reflect the changes in activationArrayList(also other arrayLists) to unitBrowseList in multiple pages
   * OR for remembering selection in multiple pages
   */
  useEffect(() => {
    if (!unitBrowseLoading) {
      // Compares activationArrayList <=> unitBrowseList && returns duplicate elements from activationArrayList
      let duplicateElementsFromActivation = activationArrayList?.filter((element) =>
        unitBrowseList?.some((data) => data.unitPK === element.unitPK && data.company === element.company)
      );

      let duplicateElementsFromHold = holdArrayList?.filter((element) =>
        unitBrowseList?.some((data) => data.unitPK === element.unitPK && data.company === element.company)
      );

      let duplicateElementsFromShuttle = shuttleDelayArrayList?.filter((element) =>
        unitBrowseList?.some((data) => data.unitPK === element.unitPK && data.company === element.company)
      );

      let duplicateElementsFromDispatch = dispatchDelayArrayList?.filter((element) =>
        unitBrowseList?.some((data) => data.unitPK === element.unitPK && data.company === element.company)
      );

      let duplicateElementsFromPost = postArrayList?.filter((element) =>
        unitBrowseList?.some((data) => data.unitPK === element.unitPK && data.company === element.company)
      );

      let duplicateElements = [
        ...duplicateElementsFromActivation,
        ...duplicateElementsFromHold,
        ...duplicateElementsFromShuttle,
        ...duplicateElementsFromDispatch,
        ...duplicateElementsFromPost,
      ];

      if (duplicateElements?.length > 0) {
        duplicateElements?.forEach((unit) => {
          const indexToUpdate = unitBrowseList.findIndex(
            (element) => element.unitPK === unit.unitPK && element.company === unit.company
          );
          dispatch(
            persistMultiPageSelection({
              index: indexToUpdate,
              element: unit,
            })
          );
        });
      }
    }
  }, [unitBrowseLoading, pageNumber]);

  useEffect(() => {
    if (
      !viewOnly &&
      (activationArrayList.length > 0 ||
        postArrayList.length > 0 ||
        holdArrayList.length > 0 ||
        shuttleDelayArrayList.length > 0 ||
        dispatchDelayArrayList.length > 0) &&
      isFormValid
    ) {
      dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(true));
    }
  }, [
    viewOnly,
    activationArrayList,
    postArrayList,
    holdArrayList,
    shuttleDelayArrayList,
    dispatchDelayArrayList,
    isFormValid,
  ]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: unitBrowseList,
  };

  return (
    <div className="UnitActivationSelectionMainCotainer">
      <div className="p-1 UnitActivationSelectionMultiBrowseCotainer" style={{ minWidth: "1600px" }}>
        <UnitActivationHeader closeButton={true} closeHandler={closeHandler} />
        {unitBrowseLoading && <LoadingIcon />}
        <div className="border-1 border border-dark border-top-0 border-bottom-0 border-right-0 flex-fill">
          <div className="p-r-0 p-l-0 h-100">
            <div className="d-flex h-100 border border">
              <div className="fixTableHead  flex-grow-1 h-100">
                <table className="table table-striped f-w-600 mb-0">
                  <thead>
                    <tr disabled>
                      <th className="f-w-600">Unit Number</th>
                      <th className="f-w-600">Active</th>
                      <th className="f-w-600">Pay</th>
                      <th className="f-w-600">Priority</th>
                      <th className="f-w-600">Post</th>
                      <th className="f-w-600">ADS Vie</th>
                      <th className="f-w-600">ADS Dis</th>
                      <th className="f-w-600">Hold</th>
                      {radioSelection === "delay" ? (
                        <>
                          <th className="f-w-600">A Delay</th>
                          <th className="f-w-600">S Delay</th>
                          <th className="f-w-600">D Delay</th>
                        </>
                      ) : (
                        <>
                          <th className="f-w-600">GVWR</th>
                          <th className="f-w-600">Weight</th>
                        </>
                      )}
                      <th className="f-w-600">Special</th>
                      <th className="f-w-600">Unit Type</th>
                      <th className="f-w-600">Customer</th>
                      <th className="f-w-600">Plant</th>
                      <th className="f-w-600">Pickup</th>
                      <th className="f-w-600">Dealer</th>
                      <th className="f-w-600">Del By Date </th>
                      <th className="f-w-600">Ordr Date</th>
                      <th className="f-w-600">Miles</th>
                    </tr>
                  </thead>

                  {unitBrowseLoading
                    ? null
                    : unitBrowseList?.length !== 0 && (
                        <tbody>
                          {unitBrowseList?.map((units, index) => (
                            <tr
                              id="rowId"
                              key={`${units.unitPK}-${units.company}`}
                              className={`${units?.alreadyDelayed ? "alreadyDelayed" : ""} ${
                                units?.alreadyActivated ? "alreadyReleased" : ""
                              } ${
                                !units?.delayDispatch
                                  ? ""
                                  : units?.delayDispatchReason === "" || units?.delayDispatchReason === null
                                    ? "invalidRecord"
                                    : ""
                              } ${id === `${units.unitPK}-${units.company}` ? "tableSelected" : ""}`}
                              onClick={(event) => {
                                dispatch(setUnitIndex(index));
                                dispatch(setChangeColor(true));
                                setId(`${units.unitPK}-${units.company}`);
                                dispatch(
                                  updateUnitBrowseList({
                                    key: "delayDispatchReason",
                                    index: index,
                                    value: units.delayDispatchReason || "",
                                  })
                                );
                              }}
                            >
                              <td className="f-w-600">{units.unitNumber}</td>
                              <td className="f-w-600">
                                <input
                                  type="checkbox"
                                  name="active"
                                  id="active"
                                  className="form-check-input"
                                  checked={units.activeDispatch ? units.activeDispatch : false}
                                  value={units.activeDispatch}
                                  onChange={(e) => {
                                    dispatch(
                                      updateUnitBrowseList({
                                        key: "active",
                                        index: index,
                                        value: e.target.checked,
                                      })
                                    );
                                  }}
                                  disabled={
                                    viewOnly ||
                                    units.delayDispatch ||
                                    units.underDelay ||
                                    units.unitOnShuttleDelay ||
                                    units.unitOnHold ||
                                    (units?.restrictedDispatch &&
                                      !checkPermission(PROGRAMS.UNIT_ACTIVATION_RESTRICTION, "edit"))
                                  }
                                />
                              </td>
                              <td className="f-w-600">
                                <input
                                  className={`customFormControl ${
                                    units.bonusPoolRate === "" || units.bonusPoolRate === null
                                      ? ""
                                      : !isValidDecimalTwoFour(units.bonusPoolRate)
                                        ? "borderRed"
                                        : ""
                                  }`}
                                  style={{ width: "55px" }}
                                  type="text"
                                  name="pay"
                                  id="pay"
                                  autoComplete="off"
                                  aria-autocomplete="list"
                                  value={units.bonusPoolRate || 0}
                                  onChange={(e) => {
                                    e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                                      dispatch(
                                        updateUnitBrowseList({
                                          key: "pay",
                                          index: index,
                                          value: e.target.value,
                                        })
                                      );
                                  }}
                                  disabled={
                                    viewOnly ||
                                    units.flatRated ||
                                    !units.companyBonusPoolValid ||
                                    !units.active ||
                                    units.hardPost
                                  }
                                />
                              </td>
                              <td className="f-w-600">
                                <input
                                  className={` customFormControl`}
                                  type="number"
                                  name="priority"
                                  id="priority"
                                  style={{ width: "40px" }}
                                  autoComplete="off"
                                  aria-autocomplete="list"
                                  min={1}
                                  max={9}
                                  maxLength={1}
                                  value={units.priority}
                                  onBeforeInput={(e) => {
                                    if (
                                      e.data === "+" ||
                                      e.data === "-" ||
                                      e.data === "." ||
                                      e.data === "e" ||
                                      e.data === "E" ||
                                      e.data === "0"
                                    )
                                      e.preventDefault();
                                  }}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (inputValue.match(/^\d{0,1}?$/)) {
                                      dispatch(
                                        updateUnitBrowseList({
                                          key: "priority",
                                          index: index,
                                          value: e.target.value,
                                        })
                                      );
                                    }
                                  }}
                                  onBlur={(e) => {
                                    if (!e.target.value?.trim()) {
                                      // If the value is empty, set the previous priority
                                      dispatch(
                                        updateUnitBrowseList({
                                          key: "priority",
                                          index: index,
                                          value: units.previousPriority,
                                        })
                                      );
                                    }
                                  }}
                                  disabled={viewOnly}
                                />
                              </td>
                              <td className="f-w-600">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="post"
                                  id="post"
                                  checked={units.postedTo}
                                  onChange={(e) => {
                                    dispatch(
                                      updateUnitBrowseList({
                                        key: "post",
                                        index: index,
                                        value: e.target.value,
                                      })
                                    );
                                  }}
                                  disabled={
                                    viewOnly ||
                                    units.postedFrom ||
                                    !units.activeDispatch ||
                                    (!units.canSoftPost && !units.canHardPost) ||
                                    !checkPermission(PROGRAMS.UNIT_ACTIVATION_POSTTOSISTER, "edit")
                                  }
                                />
                              </td>
                              <td className="f-w-600">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="adsView"
                                  id="adsView"
                                  checked={units.driverViewOnly}
                                  onChange={(e) => {
                                    dispatch(
                                      updateUnitBrowseList({
                                        key: "adsView",
                                        index: index,
                                        value: e.target.value,
                                      })
                                    );
                                  }}
                                  disabled={viewOnly || units.postedFrom || !units.activeDispatch}
                                />
                              </td>
                              <td className="f-w-600">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="adsDispatch"
                                  id="adsDispatch"
                                  checked={units.driverDispatch}
                                  onChange={(e) => {
                                    dispatch(
                                      updateUnitBrowseList({
                                        key: "adsDispatch",
                                        index: index,
                                        value: e.target.value,
                                      })
                                    );
                                  }}
                                  disabled={viewOnly || units.postedFrom || !units.activeDispatch}
                                />
                              </td>
                              <td className="f-w-600">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="hold"
                                  id="hold"
                                  checked={units.unitOnHold}
                                  onChange={(e) => {
                                    dispatch(
                                      updateUnitBrowseList({
                                        key: "hold",
                                        index: index,
                                        value: e.target.value,
                                      })
                                    );
                                  }}
                                  disabled={
                                    viewOnly ||
                                    units.activeDispatch ||
                                    units.delayDispatch ||
                                    units.underDelay ||
                                    units.unitOnShuttleDelay
                                  }
                                />
                              </td>
                              {radioSelection === "delay" ? (
                                <>
                                  {" "}
                                  <td className="f-w-600">
                                    <input
                                      type="checkbox"
                                      className={`form-check-input `}
                                      name="activationDelay"
                                      id="activationDelay"
                                      checked={units.delayDispatch}
                                      onChange={(e) => {
                                        dispatch(
                                          updateUnitBrowseList({
                                            key: "activationDelay",
                                            index: index,
                                            value: e.target.value,
                                          })
                                        );
                                      }}
                                      disabled={
                                        viewOnly ||
                                        units.activeDispatch ||
                                        units.underDelay ||
                                        units.unitOnShuttleDelay ||
                                        units.unitOnHold
                                      }
                                    />
                                  </td>
                                  <td className="f-w-600">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      name="shuttleDelay"
                                      id="shuttleDelay"
                                      checked={units.unitOnShuttleDelay}
                                      onChange={(e) => {
                                        dispatch(
                                          updateUnitBrowseList({
                                            key: "shuttleDelay",
                                            index: index,
                                            value: e.target.value,
                                          })
                                        );
                                      }}
                                      disabled={
                                        viewOnly ||
                                        units.activeDispatch ||
                                        units.delayDispatch ||
                                        units.underDelay ||
                                        units.unitOnHold ||
                                        units.plantPresent
                                      }
                                    />
                                  </td>
                                  <td className="f-w-600">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      name="dispatchDelay"
                                      id="dispatchDelay"
                                      checked={units.underDelay}
                                      onChange={(e) => {
                                        dispatch(
                                          updateUnitBrowseList({
                                            key: "dispatchDelay",
                                            index: index,
                                            value: e.target.value,
                                          })
                                        );
                                      }}
                                      disabled={
                                        viewOnly ||
                                        units.activeDispatch ||
                                        units.delayDispatch ||
                                        units.unitOnShuttleDelay ||
                                        units.unitOnHold
                                      }
                                    />
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="f-w-600">
                                    <input
                                      className={`customFormControl`}
                                      style={{ width: "55px" }}
                                      type="text"
                                      name="gvwr"
                                      id="gvwr"
                                      autoComplete="off"
                                      aria-autocomplete="list"
                                      maxLength={10}
                                      value={units.gvwr ?? 0}
                                      onChange={(e) => {
                                        e.target.value.match(/^\d{0,10}$/) &&
                                          dispatch(
                                            updateUnitBrowseList({
                                              key: "gvwr",
                                              index: index,
                                              value: Number(e.target.value),
                                            })
                                          );
                                      }}
                                      disabled={viewOnly}
                                    />
                                  </td>
                                  <td className="f-w-600">
                                    <input
                                      className={`customFormControl`}
                                      style={{ width: "55px" }}
                                      type="text"
                                      name="shippingWeight"
                                      id="shippingWeight"
                                      autoComplete="off"
                                      aria-autocomplete="list"
                                      maxLength={10}
                                      value={units.shippingWeight ?? 0}
                                      onChange={(e) => {
                                        e.target.value.match(/^\d{0,7}$/) &&
                                          dispatch(
                                            updateUnitBrowseList({
                                              key: "shippingWeight",
                                              index: index,
                                              value: e.target.value,
                                            })
                                          );
                                      }}
                                      disabled={viewOnly}
                                    />
                                  </td>
                                </>
                              )}
                              <td className="f-w-600">{units.specialCode}</td>
                              <td className="f-w-600">{units.unitType}</td>
                              <td className="f-w-600">{units.customer}</td>
                              <td className="f-w-600">{units.customerPlant}</td>
                              <td className="f-w-600">{units.pickupByName}</td>
                              <td className="f-w-600">{units.pickupDealerName}</td>
                              <td className="f-w-600">
                                {units.deliverByDate ? moment(units.deliverByDate).format("MM/DD/YY") : ""}
                              </td>
                              <td className="f-w-600">
                                {units.orderDate ? moment(units.orderDate).format("MM/DD/YY") : ""}
                              </td>
                              <td className="f-w-600">{units.miles}</td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                </table>
                {unitBrowseLoading
                  ? ""
                  : unitBrowseList?.length === 0 && (
                      <div className="noRecordsSmallerFont">No Records Available</div>
                    )}
              </div>
              <PaginationComponent
                {...paginationProps}
                firstPage
                lastPage
                singleArrowUp
                singleArrowDown
                hideBorderTop
                hideBorderBottom
              />
            </div>
          </div>
        </div>

        <UnitActivationFooter
          activationDelay={true}
          saveButton={true}
          saveHandler={saveHandler}
          cancelButton={true}
          cancelHandler={cancelHandler}
        />
        <DeleteComponent
          show={show}
          onHide={ShowMessage}
          title={"Multibrowse Activation Save"}
          body={
            <table style={{ borderCollapse: "collapse", width: "80%" }}>
              <tbody>
                <>
                  <tr>
                    <td style={{ padding: "5px" }}>Activated </td>
                    <td style={{ padding: "5px" }}>
                      New: <span style={{ color: "green" }}>{activationAddCount}</span>
                    </td>
                    <td style={{ padding: "5px" }}>
                      Updated: <span style={{ color: "green" }}>{activationUpdateCount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px" }}>Deactivated </td>
                    <td style={{ padding: "5px" }}>
                      New: <span style={{ color: "green" }}>{deActivationAddCount}</span>
                    </td>
                    <td style={{ padding: "5px" }}>
                      Updated: <span style={{ color: "green" }}>{deActivationUpdateCount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px" }}>Activation Delay </td>
                    <td style={{ padding: "5px" }}>
                      New: <span style={{ color: "green" }}>{activationDelayAddCount}</span>
                    </td>
                    <td style={{ padding: "5px" }}>
                      Updated: <span style={{ color: "green" }}>{activationDelayUpdateCount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px" }}>Undelayed </td>
                    <td style={{ padding: "5px", color: "green" }} colSpan={2}>
                      {unDelayCount}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px" }}>Dispatch Delay</td>
                    <td style={{ padding: "5px", color: "green" }} colSpan={2}>
                      {dispatchDelayArrayList?.length}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px" }}>Shuttle Delay</td>
                    <td style={{ padding: "5px", color: "green" }} colSpan={2}>
                      {shuttleDelayArrayList?.length}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px" }}>Posting Deleted </td>
                    <td style={{ padding: "5px", color: "green" }} colSpan={2}>
                      {postDeleteCount}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px" }}>Save Failed: </td>
                    <td style={{ padding: "5px", color: "red" }} colSpan={2}>
                      {saveFailedList?.join(",  ") || "None"}
                    </td>
                  </tr>
                </>
              </tbody>
            </table>
          }
          handleOK={ShowMessage}
        />
        <WarningModalPopUp
          show={modalPopup}
          onHide={warningPopupModalHide}
          title={saveError === true ? "Error" : "Success"}
          body={saveError === true ? errorMessage : saveMessage}
          handleOK={warningPopupModalHide}
          showOK={true}
          color={saveError === true ? "red" : "black"}
        />

        <CommonModal
          show={lockError}
          onHide={() => {
            setLockError("");
          }}
          title={`Warning !!`}
          body={lockError}
          handleOK={() => {
            setLockError("");
          }}
          showOK
          color={lockError ? "red" : ""}
        />
      </div>
    </div>
  );
}

export default UnitActivationMultiUnitBrowse;
