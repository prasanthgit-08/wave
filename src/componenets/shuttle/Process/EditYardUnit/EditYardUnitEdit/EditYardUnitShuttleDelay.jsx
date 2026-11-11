import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditYardUnitEditFooter from "./EditYardUnitEditFooter";
import EditYardUnitEditHeader from "./EditYardUnitEditHeader";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import DateInputField from "../../../../common/DateInputField";
import {
  setSaveData,
  setSaveDisable,
  setShuttleSave,
  setViewDetail,
} from "../../../../../redux/EditYardUnitSlice";
import EditYardUnitService from "../../../../../services/shuttle/process/EditYardUnitService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import { useAppNavigate } from "../../../../../hooks/useAppNavigate";

function EditYardUnitShuttleDelay(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();

  const { saveData } = useSelector((state) => state.editYardUnitsReducer);

  const searchCriteria = "Beginning";
  const type = "Autocomplete";
  //Setting Current Date
  const todayDate = formatForApi(new Date());

  const [unitPK, setUnitPK] = useState(null);
  const [reason, setReason] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [reportingDriverId, setReportingDriverId] = useState(null);
  const [reportingDriverName, setReportingDriverName] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [reportingUserId, setReportingUserId] = useState(null);
  const [reportingUserName, setReportingUserName] = useState("");
  const [users, setusers] = useState([]);
  const [userLookup, setUserLookup] = useState(false);
  const [reportedBy, setReportedBy] = useState("");
  const [dateReported, setDateReported] = useState(todayDate);
  const [notes, setNotes] = useState("");
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [driverSelection, setDriverSelection] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [isDateValidation, setIsDateValidation] = useState(true);

  const unitNumberInput = useSelector((state) => state.editYardUnitsReducer.unitNumberInput);
  const unitShuttleDelayData = useSelector((state) => state.editYardUnitsReducer.unitShuttleDelayData);
  const editUnitData = useSelector((state) => state.editYardUnitsReducer.editUnitData);
  const delay = useSelector((state) => state.editYardUnitsReducer.delay);
  const viewDetail = useSelector((state) => state.editYardUnitsReducer.viewDetail);

  const noDelayHandler = () => {
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
    goBack();
  };

  const saveHandler = () => {
    EditYardUnitService.saveEditYardUnit(saveData)
      .then((response) => {
        if (response.data !== "") {
          setModalPopUp(true);
        }
      })
      .catch((err) => {
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
      });
  };

  /**
   * Calls warning popup model
   * to show the status of operations
   **/
  const warningPopupModalHide = () => {
    if (saveError === true) {
      setSaveError(false);
      setErrorMessage("");
      setModalPopUp(false);
    } else {
      setModalPopUp(false);
      navigate("/edit-yard-unit-selection");
    }
  };

  /**
   * used for Driver Autocomplete Dropdown - fetch
   */
  const fetchDrivers = (string) => {
    setDriverLoading(true);
    EditYardUnitService.getAllDrivers(0, searchCriteria, type, string)
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
    setReportingDriverId(driver?.driverPK);
    setReportingDriverName(
      driver.firstName?.trim() + (driver?.lastName ? " " + driver?.lastName?.trim() : "")
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
    EditYardUnitService.getReportingUsers(0, searchCriteria, string)
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

    if (
      reason !== "" &&
      authorizedBy !== "" &&
      (reportingDriverId !== null || reportingUserId !== null || reportedBy !== "") &&
      dateReported !== "" &&
      isDateValidation
    ) {
      dispatch(setSaveDisable(false));
      dispatch(setShuttleSave(true));
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
    isDateValidation,
  ]);

  useEffect(() => {
    if (delay === "none") {
      if (unitPK) {
        navigate("/edit-yard-unit/" + unitPK);
        dispatch(setViewDetail(false));
        dispatch(setShuttleSave(false));
      }
    }
  }, [delay, unitPK]);

  useEffect(() => {
    if (editUnitData === null || editUnitData === undefined || editUnitData.length === 0) {
      navigate("/edit-yard-unit-selection");
    }
    if (editUnitData) {
      setUnitPK(editUnitData.unitPK);
    }
  }, [editUnitData]);

  useEffect(() => {
    if (reportingDriverId) setReportingUserName("");
  }, [reportingDriverId]);

  useEffect(() => {
    if (reportingUserId) setReportingDriverName("");
  }, [reportingUserId]);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <EditYardUnitEditHeader />
        {/* EditYardUnitShuttleDelay Content */}
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="p-15 mb-3">
              <Col md={6} className="ps-4">
                <Form.Group className="margin-box-1 mt-3 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  {/* <Form.Group className="  align-items-center row  m-l-0 m-r-0"> */}
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Unit
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-6">
                    <input
                      className={` ${styles.formControl}`}
                      type="text"
                      value={unitNumberInput}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled
                    />
                  </div>
                </Form.Group>
                <Form.Group className="margin-box-1 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  {/* <Form.Group className="  align-items-center row  mt-3 m-l-0 m-r-0"> */}
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="reason" className="col-form-label dealer-label">
                      Reason
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-6">
                    <input
                      className={` ${styles.formControl} ${reason === "" ? "borderRed" : "borderGreen"}`}
                      type="text"
                      id="reason"
                      name="reason"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={40}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="margin-box-1 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="authorizedBy" className="col-form-label dealer-label">
                      Authorized By
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-6">
                    <input
                      className={` ${styles.formControl} ${
                        authorizedBy === "" ? "borderRed" : "borderGreen"
                      }`}
                      type="text"
                      id="authorizedBy"
                      name="authorizedBy"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={authorizedBy}
                      onChange={(e) => setAuthorizedBy(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="margin-box-1 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Reporting Driver
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-6 d-flex">
                    <AutoCompleteDropdown
                      className={`customFormControl p-0 ${
                        reportingDriverId
                          ? "borderGreen"
                          : !reportingUserId && reportedBy === ""
                            ? "borderRed"
                            : ""
                      }`}
                      arrayList={drivers}
                      searchString={reportingDriverName}
                      handleSearchString={(string) => setReportingDriverName(string)}
                      fetchDataBySearchString={fetchDrivers}
                      renderItemId={(driver) => driver.driverPK}
                      renderItemField={(driver) =>
                        driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
                      }
                      onSelect={handleDriverSelection}
                      clearInputCallback={() => setReportingDriverId(null)}
                      selectedId={reportingDriverId}
                      disabled={reportingUserId || reportedBy ? true : false}
                      loading={driverLoading}
                      hidePlaceholder
                    />
                    <LookupButton
                      disabled={reportingUserId || reportedBy ? true : false}
                      onClick={handleDriverLookupModalShow}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="margin-box-1 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Reporting User
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-6 d-flex">
                    <AutoCompleteDropdown
                      className={`customFormControl p-0  ${
                        reportingUserId
                          ? "borderGreen"
                          : !reportingDriverId && reportedBy === ""
                            ? "borderRed"
                            : ""
                      }`}
                      arrayList={users}
                      searchString={reportingUserName}
                      handleSearchString={(string) => setReportingUserName(string)}
                      fetchDataBySearchString={fetchReportingUsers}
                      renderItemId={(user) => user.userPK}
                      renderItemField={(user) => user.name}
                      onSelect={(user) => {
                        setReportingUserId(user.userPK);
                        setReportingUserName(user.name);
                      }}
                      clearInputCallback={() => setReportingUserId(null)}
                      selectedId={reportingUserId}
                      disabled={reportingDriverId || reportedBy ? true : false}
                      loading={userLoading}
                      hidePlaceholder
                    />
                    <LookupButton
                      onClick={() => setUserLookup(true)}
                      disabled={reportingDriverId || reportedBy ? true : false}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="margin-box-1 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="reportedBy" className="col-form-label dealer-label">
                      Reported By
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-6">
                    <input
                      className={`${styles.formControl}  ${
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
                        setReportedBy(e.target.value);
                        setReportingDriverId(null);
                        setReportingDriverName("");
                        setReportingUserId(null);
                        setReportingUserName("");
                      }}
                      disabled={reportingDriverId || reportingUserId}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="margin-box-1 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="dateReported" className="col-form-label dealer-label">
                      Date Reported
                    </Form.Label>
                  </Col>

                  <div className="d-flex flex-shrink-0 p-0 w-200px">
                    <DateInputField
                      id="dateReported "
                      name="dateReported "
                      date={dateReported}
                      setIsDateValid={setIsDateValidation}
                      setDate={setDateReported}
                      max={new Date()}
                      className={`${styles.formControl}  ${
                        dateReported !== "" && isDateValidation ? "" : "borderRed"
                      }`}
                    />
                  </div>
                </Form.Group>
                <Form.Group className={"mb-1 align-items-start d-flex mt-4 m-l-0 m-r-0"}>
                  <Col xs={3} className="p-0">
                    <Form.Label htmlFor="notes" className="col-form-label dealer-label">
                      Notes
                    </Form.Label>
                  </Col>
                  <div className="p-0 col-9">
                    <textarea
                      rows={7}
                      cols={20}
                      type="search"
                      style={{
                        resize: "none",
                        display: "fixed",
                        minHeight: "100px",
                        minWidth: "350px",
                        boxShadow: "none",
                        fontSize: "12px",
                      }}
                      className="customFormControl h-100 customFocusClass"
                      onInput={(e) => {
                        setNotes(e.target.value);
                      }}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <EditYardUnitEditFooter saveButton={true} saveHandler={saveHandler} />
        <DriverLookup
          show={driverSelection}
          onHide={driverModalHide}
          renderItemId={(driver) => driver.driverPK}
          handleLookupSelection={handleDriverSelection}
          EditYardUnit
        />
        <UserLookup
          show={userLookup}
          onHide={() => setUserLookup(false)}
          renderItemId={(user) => user.userPK}
          handleLookupSelection={(user) => {
            setReportingUserId(user.userPK);
            setReportingUserName(user.name);
            setUserLookup(false);
          }}
          EditYardUnit
        />
        <WarningModalPopUp
          show={modalPopup}
          onHide={warningPopupModalHide}
          title={saveError === true ? "Error" : "Success"}
          body={saveError === true ? errorMessage : "Unit Shuttle delay Successfully saved."}
          handleOK={warningPopupModalHide}
          showOK={true}
          color={saveError === true ? "red" : "green"}
        />
      </div>
    </div>
  );
}

export default EditYardUnitShuttleDelay;
