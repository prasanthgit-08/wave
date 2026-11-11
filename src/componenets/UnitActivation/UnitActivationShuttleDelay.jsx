/* eslint-disable react-hooks/exhaustive-deps */
import { formatForApi } from "../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UnitActivationFooter from "./UnitActivationFooter";
import UnitActivationHeader from "./UnitActivationHeader";
import LookupButton from "../common/LookupButton";
import AutoCompleteDropdown from "../common/AutoCompleteDropdown";
import UserLookup from "../LookupScreens/User/UserLookup";
import DateInputField from "../common/DateInputField";
import {
  resetSaveList,
  setAuthorizedBy,
  setDateReported,
  setDelay,
  setDelayArrayIndex,
  setLoader,
  setNewDelayNavigation,
  setNotes,
  setOeUnitIndex,
  setPageNumber,
  setReason,
  setReportedBy,
  setReportingDriverId,
  setReportingDriverName,
  setReportingUserId,
  setReportingUserName,
  setSaveData,
  setSaveDisable,
  setSelectedUnit,
  setShowUnitActivationDelay,
  setUnitId,
  setUnitNumber,
  setUnitNumberLastFive,
  setUnitSelected,
  updateShuttleDelayArrayList,
} from "../../redux/UnitActivationSlice";
import UnitActivationService from "../../services/UnitActivationService";
import { setShowUnitActivationScreen, setStatusForPlantToYard } from "../../redux/YardCheckinSlice";
import {
  setShowUnitActivationScreen as setShowUnitActivation,
  setActiveDispatch as setActivateUnit,
  setActiveDispatch,
} from "../../redux/EditYardUnitSlice";
import WarningModalPopUp from "../common/WarningModalPopUp";
import DriverLookup from "../LookupScreens/Driver/DriverLookup";
import toast from "react-hot-toast";
import DeleteComponent from "../common/DeleteComponent";
import { setShowSingleUnitActivation } from "../../redux/OrderEntryFilterSlice";
import { useAppNavigate } from "../../hooks/useAppNavigate";

function UnitActivationShuttleDelay(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();
  const { shuttleYardcheckin, editYardUnit, orderEntry } = props;
  const [userLoading, setUserLoading] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);

  const {
    browseType,
    saveData,
    pageNumber,
    reason,
    authorizedBy,
    reportingDriverId,
    reportingDriverName,
    reportingUserId,
    reportingUserName,
    reportedBy,
    dateReported,
    notes,
    unitNumber,
    delay,
    activeDispatch,
    active,
    companyName,
    shuttleDelayArrayList,
    delayArrayIndex,
    holdArrayList,
    postArrayList,
    oeUnitIndex,
  } = useSelector((state) => state.unitActivationReducer);

  const oeUnitData = useSelector((state) => state.orderEntryReducer.oeUnitData);
  const dispatchDelayArrayList = useSelector((state) => state.unitActivationReducer.dispatchDelayArrayList);

  const searchCriteria = "Beginning";
  const type = "Autocomplete";
  //Setting Current Date
  const todayDate = formatForApi(new Date());

  const [drivers, setDrivers] = useState([]);
  const [users, setusers] = useState([]);
  const [userLookup, setUserLookup] = useState(false);
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [driverSelection, setDriverSelection] = useState(false);
  const [saveMessage, setSaveMessage] = useState("Data Successfully saved.");
  const [shuttleDelayCount, setShuttleDelayCount] = useState(0);
  const [noDelayCount, setNoDelayCount] = useState(0);
  const [show, setShow] = useState(false);
  const [saveBrowseData, setSaveBrowseData] = useState(false);
  const [saveFailedList, setSaveFailedList] = useState([]);
  const [isDateReportedValid, setIsDateReportedValid] = useState(!dateReported ? true : false);
  const [deactivationCount, setDeactivationCount] = useState(0);
  const sessionId = localStorage.getItem("sessionId") || null;

  const noDelayHandler = () => {
    if (browseType === "BrowseUnits") {
      dispatch(
        updateShuttleDelayArrayList({
          key: "noDelay",
          index: delayArrayIndex,
        })
      );
      setNoDelayCount(noDelayCount + 1);
      dispatch(setReason(""));
      dispatch(setAuthorizedBy(""));
      dispatch(setNotes(""));
      dispatch(setReportingDriverId(null));
      dispatch(setReportingDriverName(""));
      dispatch(setReportingUserId(null));
      dispatch(setReportingUserName(""));
      dispatch(setReportedBy(""));
      dispatch(setDateReported(todayDate));
      toast.success("No Delay Saved");
      if (delayArrayIndex === shuttleDelayArrayList?.length - 1) {
        dispatch(setLoader(true));
        setSaveBrowseData(true);
      } else {
        dispatch(setDelayArrayIndex(delayArrayIndex + 1));
      }
    } else if (browseType === "SingleUnits") {
      dispatch(
        setSaveData({
          ...saveData,
          reason: "",
          authorizedBy: "",
          reportingDriverFK: null,
          reportingUserFK: null,
          reportedBy: "",
          delayDate: "",
          notes: "",
          delay: "none",
        })
      );
      dispatch(setDelay("none"));
      dispatch(setReason(""));
      dispatch(setAuthorizedBy(""));
      dispatch(setReportingDriverId(null));
      dispatch(setReportingDriverName(""));
      dispatch(setReportingUserId(null));
      dispatch(setReportingUserName(""));
      dispatch(setReportedBy(""));
      dispatch(setDateReported(""));
      dispatch(setNotes(""));
      if (editYardUnit || shuttleYardcheckin || orderEntry) {
        dispatch(setShowUnitActivationDelay(false));
      } else {
        goBack();
      }
    }
  };

  const saveHandler = () => {
    if (browseType === "SingleUnits") {
      dispatch(setLoader(true));

      const payload = { UnitActivationVO: [saveData], SessionID: sessionId, isMultibrowse: false };
      UnitActivationService.saveUnitActivation(payload)
        .then((response) => {
          dispatch(setLoader(false));
          let err = response?.data?.unsavedList?.[0];
          if (err) {
            setSaveError(true);
            setErrorMessage(`${err?.UnitNumber} - ${err.failedUnits}`);
            setModalPopUp(true);
            return;
          }

          if (response.data !== "") {
            if (!activeDispatch && active) {
              if (delay === "shuttle" && saveData?.alreadyActivated) {
                setSaveMessage("Unit Deactivated and Delayed successfully");
              } else if (delay === "shuttle" && !saveData?.alreadyActivated) {
                setSaveMessage("Unit Delayed successfully");
              }
            } else if (!activeDispatch && !active) {
              if (delay === "shuttle") {
                setSaveMessage("Unit Activation record is deleted and Delayed successfully");
              }
            }
            setModalPopUp(true);
          }
        })
        .catch((err) => {
          dispatch(setLoader(false));
          if (err.response) {
            // The request was made and the server responded with a status code
            setSaveError(true);
            setErrorMessage(err.response.data.errorMsg || "Sorry, something went wrong.Please try again.");
            setModalPopUp(true);
          } else if (err.request) {
            // The request was made but no response was received
            setSaveError(true);
            setErrorMessage("Sorry, it's unable to establish a connection to the remote service.");
            setModalPopUp(true);
          } else {
            // Something happened in setting up the request that triggered an Error
            setErrorMessage(err.response.data.errorMsg || "Sorry, something went wrong.Please try again.");
          }
          setSaveError(true);
        })
        .finally(() => {
          dispatch(setLoader(false));
        });
    } else if (browseType === "BrowseUnits") {
      if (shuttleDelayArrayList.length > 0) {
        if (delayArrayIndex === shuttleDelayArrayList?.length - 1) {
          dispatch(setLoader(true));
          setSaveBrowseData(true);
        } else {
          dispatch(setDelayArrayIndex(delayArrayIndex + 1));
          dispatch(setReason(""));
          dispatch(setAuthorizedBy(""));
          dispatch(setReportingDriverId(null));
          dispatch(setReportingDriverName(""));
          dispatch(setReportingUserId(null));
          dispatch(setReportingUserName(""));
          dispatch(setReportedBy(""));
          dispatch(setDateReported(todayDate));
          dispatch(setNotes(""));
          toast.success("Shuttle Delay Saved");
          navigate("/unit-activation-shuttle-delay");
        }
      } else {
        handleFurtherNavigation();
      }
    }
  };

  const saveUnitOnShuttleDelayBrowse = () => {
    const payload = { UnitActivationVO: shuttleDelayArrayList, SessionID: sessionId, isMultibrowse: true };

    UnitActivationService.saveUnitActivation(payload)
      .then((response) => {
        dispatch(setLoader(false));
        if (response.data !== "") {
          const data = response.data?.unitActivationSave?.[0];
          setShuttleDelayCount(data.shuttleDelayCount);
          setSaveFailedList(
            response?.data?.unsavedList?.map((item) => `${item?.UnitNumber} - ${item?.failedUnits}`) || []
          );
          setDeactivationCount(data.deActivationAddCount);
          dispatch(
            resetSaveList({
              key: "shuttleDelay",
            })
          );
          if (
            Number(data.shuttleDelayCount) > 0 ||
            Number(noDelayCount) > 0 ||
            response?.data?.unsavedList?.length > 0
          ) {
            handleShow();
          }
        }
        dispatch(setDelayArrayIndex(0));
        dispatch(setReason(""));
        dispatch(setAuthorizedBy(""));
        dispatch(setReportingDriverId(null));
        dispatch(setReportingDriverName(""));
        dispatch(setReportingUserId(null));
        dispatch(setReportingUserName(""));
        dispatch(setReportedBy(""));
        dispatch(setDateReported(""));
        dispatch(setNotes(""));
        dispatch(setUnitNumber(""));
      })
      .catch((err) => {
        dispatch(setLoader(false));
        if (err.response) {
          if (err?.response?.data?.dataObj) {
            setShuttleDelayCount(err?.response?.data?.dataObj?.shuttleDelayCount);
            setSaveFailedList(err?.response?.data?.dataObj?.saveFailed);
            dispatch(
              resetSaveList({
                key: "shuttleDelay",
              })
            );
            if (
              Number(err?.response?.data?.dataObj?.shuttleDelayCount) > 0 ||
              Number(noDelayCount) > 0 ||
              err?.response?.data?.dataObj?.saveFailed?.length > 0
            ) {
              handleShow();
            }
            dispatch(setDelayArrayIndex(0));
            dispatch(setReason(""));
            dispatch(setAuthorizedBy(""));
            dispatch(setReportingDriverId(null));
            dispatch(setReportingDriverName(""));
            dispatch(setReportingUserId(null));
            dispatch(setReportingUserName(""));
            dispatch(setReportedBy(""));
            dispatch(setDateReported(""));
            dispatch(setNotes(""));
            dispatch(setUnitNumber(""));
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
          setErrorMessage(err?.response?.data?.errorMsg || "Sorry, something went wrong.Please try again.");
        }
        setSaveError(true);
      });
  };
  /**
   * Calls warning popup modal
   * to show the status of operations
   **/
  const warningPopupModalHide = () => {
    if (saveError === true) {
      dispatch(setLoader(false));
      setSaveError(false);
      setErrorMessage("");
      setModalPopUp(false);
    } else {
      dispatch(setUnitId(null));
      dispatch(setUnitNumber(""));
      dispatch(setUnitNumberLastFive(""));
      setModalPopUp(false);
      dispatch(setSaveData(null));
      dispatch(setSelectedUnit(null));
      dispatch(setUnitSelected(null));
      dispatch(setDelay("none"));
      dispatch(setReason(""));
      dispatch(setAuthorizedBy(""));
      dispatch(setReportingDriverId(null));
      dispatch(setReportingDriverName(""));
      dispatch(setReportingUserId(null));
      dispatch(setReportingUserName(""));
      dispatch(setReportedBy(""));
      dispatch(setDateReported(""));
      dispatch(setNotes(""));

      if (shuttleYardcheckin) {
        dispatch(setStatusForPlantToYard("inYard"));
        dispatch(setShowUnitActivationDelay(false));
        dispatch(setShowUnitActivationScreen(false));
        navigate("/yard-checkin-unit-selection");
      } else if (editYardUnit) {
        dispatch(setShowUnitActivationDelay(false));
        dispatch(setShowUnitActivation(false));
        dispatch(setActiveDispatch(false));
        dispatch(setActivateUnit(false));
        dispatch(setShowUnitActivation(false));
        navigate("/edit-yard-unit-selection");
      } else if (orderEntry) {
        if (oeUnitIndex === oeUnitData?.length - 1) {
          dispatch(setShowUnitActivationDelay(false));
          dispatch(setShowSingleUnitActivation(false));
        } else {
          dispatch(setShowUnitActivationDelay(false));
          dispatch(setOeUnitIndex(oeUnitIndex + 1));
        }
      } else {
        navigate("/unit-activation-single-selection");
      }
    }
  };
  const handleFurtherNavigation = () => {
    if (holdArrayList.length > 0) {
      navigate("/unit-activation-multi-unit-hold");
    } else if (postArrayList.length > 0) {
      navigate("/unit-activation-multi-unit-sister-browse");
    } else if (dispatchDelayArrayList?.length > 0) {
      dispatch(setDelay("dispatch"));
      dispatch(
        setNewDelayNavigation({
          from: "delayDispatchMulti",
          navigateTo: "/unit-activation-selections",
        })
      );
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

  /**
   * Used for popup message-multibrowse screen
   */
  const handleShow = () => setShow(true);
  const ShowMessage = () => {
    handleFurtherNavigation();
    setShow(false);
  };
  /**
   * used for Driver Autocomplete Dropdown - fetch
   */
  const fetchDrivers = (string) => {
    setDriverLoading(true);
    UnitActivationService.getAllDrivers(pageNumber, searchCriteria, type, string, companyName)
      .then((response) => {
        const data = response.data.content;
        const driversList = data?.map((driver) => ({
          ...driver,
          firstName: driver.firstName?.trim(),
        }));
        setDrivers(driversList);
        setDriverLoading(false);
      })
      .catch((error) => {
        setDriverLoading(false);
      });
  };
  /**
   * used for Driver Autocomplete & Lookup -Selection
   */
  const handleDriverSelection = (driver) => {
    setDriverSelection(false);
    dispatch(setReportingDriverId(driver.driverPK));
    dispatch(
      setReportingDriverName(
        driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
      )
    );
  };

  /**
   * used for Driver selection Lookup - open
   */
  const handleDriverLookupModalShow = () => {
    setDriverSelection(true);
  };

  /**
   * used for Driver selection Lookup - close
   */
  const driverModalHide = () => {
    setDriverSelection(false);
  };
  const fetchReportingUsers = (string) => {
    setUserLoading(true);
    UnitActivationService.getReportingUsers(pageNumber, searchCriteria, string, companyName)
      .then((response) => {
        const data = response.data.content;
        const usersList = data?.map((user) => ({
          ...user,
          name: user.name?.trim(),
        }));
        setusers(usersList);
        setUserLoading(false);
      })
      .catch((error) => {
        setUserLoading(false);
      });
  };

  useEffect(() => {
    if (browseType === "SingleUnits") {
      dispatch(
        setSaveData({
          ...saveData,
          reason: reason,
          authorizedBy: authorizedBy,
          reportingDriverFK: reportingDriverId,
          reportingUserFK: reportingUserId,
          reportedBy: reportedBy,
          delayDate: dateReported,
          notes: notes,
        })
      );
    }
    if (
      reason !== "" &&
      authorizedBy !== "" &&
      (reportingDriverId !== null || reportingUserId !== null || reportedBy !== "") &&
      dateReported !== "" &&
      isDateReportedValid
    ) {
      dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    reason,
    authorizedBy,
    reportingDriverId,
    reportingUserId,
    reportedBy,
    dateReported,
    notes,
    isDateReportedValid,
  ]);

  useEffect(() => {
    if (reportingDriverId) dispatch(setReportingUserName(""));
  }, [reportingDriverId]);

  useEffect(() => {
    if (reportingUserId) dispatch(setReportingDriverName(""));
  }, [reportingUserId]);

  useEffect(() => {
    dispatch(setDateReported(todayDate));
  }, []);

  useEffect(() => {
    if (browseType === "SingleUnits" && delay === "none") {
      dispatch(setReason(""));
      dispatch(setAuthorizedBy(""));
      dispatch(setReportingDriverId(null));
      dispatch(setReportingDriverName(""));
      dispatch(setReportingUserId(null));
      dispatch(setReportingUserName(""));
      dispatch(setReportedBy(""));
      dispatch(setDateReported(""));
      dispatch(setNotes(""));
      if (!editYardUnit && !shuttleYardcheckin && !orderEntry) {
        navigate("/unit-activation-single-selection");
      }
    }
    if (browseType === "") {
      navigate("/unit-activation-selections");
    }
  }, [browseType, delay]);

  /**
   * Used for setting  unitNumber
   */
  useEffect(() => {
    if (browseType === "BrowseUnits") {
      if (shuttleDelayArrayList?.length > 0 && delayArrayIndex < shuttleDelayArrayList?.length) {
        dispatch(setUnitNumber(shuttleDelayArrayList[delayArrayIndex].unitNumber));
      }
    }
  }, [browseType, delayArrayIndex, shuttleDelayArrayList]);

  useEffect(() => {
    if (
      shuttleDelayArrayList?.length > 0 &&
      delayArrayIndex < shuttleDelayArrayList?.length &&
      reason !== "" &&
      authorizedBy !== "" &&
      (reportingDriverId !== null || reportingUserId !== null || reportedBy !== "") &&
      dateReported !== ""
    ) {
      dispatch(
        updateShuttleDelayArrayList({
          key: "save",
          index: delayArrayIndex,
          reason: reason,
          authorizedBy: authorizedBy,
          reportingDriverFK: reportingDriverId,
          reportingUserFK: reportingUserId,
          reportedBy: reportedBy,
          delayDate: dateReported,
          notes: notes,
        })
      );
    }
  }, [
    delayArrayIndex,
    reason,
    authorizedBy,
    notes,
    reportingDriverId,
    reportingUserId,
    reportedBy,
    dateReported,
  ]);

  useEffect(() => {
    if (saveBrowseData) {
      saveUnitOnShuttleDelayBrowse();
    }
  }, [saveBrowseData]);

  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        {(editYardUnit || shuttleYardcheckin || orderEntry) && (driverSelection || userLookup) && (
          <div className="outerModalOverlay" />
        )}
        {/* <div className="add-form-component customMaintenanceFormWidth p-20"> */}
        <UnitActivationHeader noDelayButton={true} delayHandler={noDelayHandler} />
        <div className="p-2">
          <div className="shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="p-15 mb-3">
              <Col xs={6} className="ps-4">
                <Form.Group className=" mb-1 align-items-center d-flex mt-5 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Unit
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5">
                    <input
                      className={"customFormControl"}
                      type="text"
                      value={unitNumber}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled
                    />
                  </div>
                </Form.Group>
                <Form.Group className="  mb-1 align-items-center d-flex mt-4 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="reason" className="col-form-label dealer-label">
                      Reason
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5">
                    <input
                      className={` customFormControl ${reason === "" ? "borderRed" : "borderGreen"}`}
                      type="text"
                      id="reason"
                      name="reason"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={40}
                      value={reason}
                      onChange={(e) => dispatch(setReason(e.target.value))}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="authorizedBy" className="col-form-label dealer-label">
                      Authorized By
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5">
                    <input
                      className={` customFormControl ${authorizedBy === "" ? "borderRed" : "borderGreen"}`}
                      type="text"
                      id="authorizedBy"
                      name="authorizedBy"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={authorizedBy}
                      onChange={(e) => dispatch(setAuthorizedBy(e.target.value))}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Reporting Driver
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5 d-flex">
                    <AutoCompleteDropdown
                      className={`customFormControl p-0 d-flex ${
                        reportingDriverId
                          ? "borderGreen"
                          : !reportingUserId && reportedBy === ""
                            ? "borderRed"
                            : ""
                      }`}
                      arrayList={drivers}
                      loading={driverLoading}
                      searchString={reportingDriverName}
                      handleSearchString={(string) => dispatch(setReportingDriverName(string))}
                      fetchDataBySearchString={fetchDrivers}
                      renderItemId={(driver) => driver.driverPK}
                      renderItemField={(driver) =>
                        driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
                      }
                      onSelect={handleDriverSelection}
                      clearInputCallback={() => dispatch(setReportingDriverId(null))}
                      selectedId={reportingDriverId}
                      disabled={reportingUserId || reportedBy ? true : false}
                      hidePlaceholder
                      inputTextIndent="4px"
                    />
                    <LookupButton
                      disabled={reportingUserId || reportedBy ? true : false}
                      onClick={handleDriverLookupModalShow}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Reporting User
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5 d-flex">
                    <AutoCompleteDropdown
                      className={`customFormControl p-0  ${
                        reportingUserId
                          ? "borderGreen"
                          : !reportingDriverId && reportedBy === ""
                            ? "borderRed"
                            : ""
                      }`}
                      arrayList={users}
                      loading={userLoading}
                      searchString={reportingUserName}
                      handleSearchString={(string) => dispatch(setReportingUserName(string))}
                      fetchDataBySearchString={fetchReportingUsers}
                      renderItemId={(user) => user.userPK}
                      renderItemField={(user) => user.name}
                      onSelect={(user) => {
                        dispatch(setReportingUserId(user.userPK));
                        dispatch(setReportingUserName(user.name));
                      }}
                      clearInputCallback={() => dispatch(setReportingUserId(null))}
                      selectedId={reportingUserId}
                      disabled={reportingDriverId || reportedBy ? true : false}
                      hidePlaceholder
                      inputTextIndent="4px"
                    />
                    <LookupButton
                      onClick={() => setUserLookup(true)}
                      disabled={reportingDriverId || reportedBy ? true : false}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="reportedBy" className="col-form-label dealer-label">
                      Reported By
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5">
                    <input
                      className={`customFormControl  ${
                        reportedBy !== ""
                          ? "borderGreen"
                          : !reportingUserId && !reportingDriverId
                            ? "borderRed"
                            : ""
                      }`}
                      type="text"
                      id="reportedBy"
                      name="reportedBy"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={reportedBy}
                      onChange={(e) => {
                        dispatch(setReportedBy(e.target.value));
                        dispatch(setReportingDriverId(null));
                        dispatch(setReportingDriverName(""));
                        dispatch(setReportingUserId(null));
                        dispatch(setReportingUserName(""));
                      }}
                      disabled={reportingDriverId || reportingUserId}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="dateReported" className="col-form-label dealer-label">
                      Date Reported
                    </Form.Label>
                  </Col>

                  <div className="d-flex flex-shrink-0 p-0 w-200px">
                    <DateInputField
                      id="dateReported"
                      name="dateReported"
                      date={dateReported || new Date()}
                      setDate={(value) => dispatch(setDateReported(value))}
                      max={new Date()}
                      className={`customFormControl ${!isDateReportedValid ? "borderRed" : ""}`}
                      setIsDateValid={setIsDateReportedValid}
                      // className={!isOrderDateValid ? "borderRed" : ""}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group
                  className="mb-1 align-items-center h-100 m-l-0 m-r-0"
                  style={{ marginTop: "120px" }}
                >
                  <Col xs={12} className="p-0 d-block">
                    <Form.Label htmlFor="notes" className="col-form-label dealer-label">
                      Notes
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-10 mt-2 d-block h-100">
                    <textarea
                      className="customFormControl customFocusClass w-100 d-block h-100px"
                      type="text"
                      id="notes"
                      name="notes"
                      maxLength={65535}
                      value={notes}
                      onChange={(e) => dispatch(setNotes(e.target.value))}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <UnitActivationFooter saveButton={true} saveHandler={saveHandler} />
        <DriverLookup
          show={driverSelection}
          onHide={driverModalHide}
          renderItemId={(driver) => driver.driverPK}
          handleLookupSelection={handleDriverSelection}
          UnitActivation
          companyName={companyName}
        />
        <UserLookup
          show={userLookup}
          onHide={() => setUserLookup(false)}
          renderItemId={(user) => user.userPK}
          handleLookupSelection={(user) => {
            dispatch(setReportingUserId(user.userPK));
            dispatch(setReportingUserName(user.name));
            setUserLookup(false);
          }}
          UnitActivation
          companyName={companyName}
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
        <DeleteComponent
          show={show}
          onHide={ShowMessage}
          title={"Multibrowse Shuttle Delay Save"}
          body={
            <table style={{ borderCollapse: "collapse", width: "50%" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "5px" }}>Shuttle Delayed: </td>
                  <td style={{ padding: "5px", color: "green" }}>{shuttleDelayCount}</td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>No Delayed: </td>
                  <td style={{ padding: "5px", color: "green" }}>{noDelayCount}</td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>Unit Deactivated: </td>
                  <td style={{ padding: "5px", color: "green" }}>{deactivationCount}</td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>Save Failed: </td>
                  <td style={{ padding: "5px", color: "red" }} colSpan={2}>
                    {saveFailedList?.join(", ") || "None"}
                  </td>
                </tr>
              </tbody>
            </table>
          }
          handleOK={ShowMessage}
        />
      </div>
    </div>
  );
}

export default UnitActivationShuttleDelay;
