import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import {
  setReasonForShuttleDelay,
  setAuthorizedByForShuttleDelay,
  setDriverFKForShuttleDelay,
  setReportingDriverName,
  setUserFKForShuttleDelay,
  setReportingUsername,
  setReportedByForShuttleDelay,
  setDateReportedForShuttleDelay,
  setNotesForShuttleDelay,
  setIsShuttleDateValid,
} from "../../../../../redux/YardCheckinSlice";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import DateInputField from "../../../../common/DateInputField";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";

function ShuttleDelayContent() {
  //Dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Setting Current Date
  const todayDate = formatForApi(new Date());

  //Local State Declaration
  const [reason, setReason] = useState("");
  const [AuthorizedBy, setAuthorizedBy] = useState("");
  const [driverNames, setDriverNames] = useState([]);
  const [selectedDriverName, setSelectedDriverName] = useState("");
  const [selectedDriverAsReportingDriver, setSelectedDriverAsReportingDriver] = useState(false);
  const [selectedDriverID, setSelectedDriverID] = useState("");
  const [driverNameInput, setDriverNameInput] = useState("");
  const [driverLookUpshow, setDriverLookUpshow] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [userLookUpshow, setUserLookUpshow] = useState(false);
  const [reportedBy, setReportedBy] = useState("");
  const [date, setDate] = useState(todayDate);
  const [notes, setNotes] = useState("");
  const [driverLoading, setDriverLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  //Get Value From Redux
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const selectedDriverFK = useSelector((state) => state.yardCheckinReducer.selectedDriverID);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const savedSuccessForShuttleDelay = useSelector(
    (state) => state.yardCheckinReducer.savedSuccessForShuttleDelay
  );
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);

  /****** Reporting Driver dropdown and lookup ******/
  //Service for getting all Driver names
  const fetchDriverByName = (string) => {
    setDriverLoading(true);
    YardCheckinService.fetchDriverDetailsByName(string, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data.content;
        const driversList = data?.map((driver) => ({ ...driver, firstName: driver.firstName?.trim() }));
        setDriverNames(driversList);
      })
      .catch((error) => {
        console.log("error");
      })
      .finally(() => {
        setDriverLoading(false);
      });
  };

  //Handle selection from reporting driver dropdown
  const handleDriverSelectionFromDropdown = (driver) => {
    setSelectedDriverID(driver.driverPK);
    dispatch(
      setReportingDriverName(
        driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
      )
    );
    setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""));
    setSelectedUserID("");
    setReportedBy("");
  };

  //Handle selection from driver look up screen
  const handleDriverLookupSelection = (driver) => {
    setSelectedDriverID(driver.driverPK);
    dispatch(
      setReportingDriverName(
        driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
      )
    );
    setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""));
    setDriverLookUpshow(false);
  };

  //Enable driver lookup
  const handleDriverLookupModalShow = () => {
    setDriverLookUpshow(true);
  };

  //Disable driver lookup
  const handleDriverLookupModalHide = () => {
    setDriverLookUpshow(false);
  };

  /****** Reporting user dropdown and lookup ******/
  const fetchUsers = (string) => {
    setUserLoading(true);
    YardCheckinService.getAllUserData(string, selectedUnitCompanyName)
      .then((response) => {
        const { data } = response;
        const userList = data.content?.map((user) => ({ ...user, name: user.name?.trim() }));
        setUserNames(userList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  //Handle selection from reporting user dropdown
  const handleUserSelectionFromDropdown = (user) => {
    setUserNameInput(user.name);
    dispatch(setReportingUsername(user.name));
    setSelectedUserID(user.userPK);
    setUserLookUpshow(false);
  };

  //Handle selection from driver look up screen
  const handleUserLookupSelection = (user) => {
    setUserNameInput(user.name?.trim());
    dispatch(setReportingUsername(user.name));
    setSelectedUserID(user.userPK);
    setUserLookUpshow(false);
  };

  //Enable user lookup
  const handleUserLookupModalShow = () => {
    setUserLookUpshow(true);
  };

  //Disable user lookup
  const handleUserLookupModalHide = () => {
    setUserLookUpshow(false);
  };

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setReasonForShuttleDelay(reason));
    dispatch(setAuthorizedByForShuttleDelay(AuthorizedBy));
    dispatch(setDriverFKForShuttleDelay(selectedDriverID));
    dispatch(setUserFKForShuttleDelay(selectedUserID));
    dispatch(setReportedByForShuttleDelay(reportedBy));
    dispatch(setDateReportedForShuttleDelay(date));
    dispatch(setNotesForShuttleDelay(notes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reason, AuthorizedBy, selectedDriverID, selectedUserID, reportedBy, date, notes]);

  useEffect(() => {
    if (selectedDriverAsReportingDriver === true) {
      setDriverNameInput(selectedDriverName);
      setSelectedDriverID(selectedDriverFK);
      dispatch(setReportingDriverName(selectedDriverName));
    } else {
      setDriverNameInput("");
      setSelectedDriverID("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverAsReportingDriver, selectedDriverName, selectedDriverFK]);

  useEffect(() => {
    setUserNameInput("");
  }, [driverNameInput]);

  useEffect(() => {
    setDriverNameInput("");
  }, [userNameInput]);

  useEffect(() => {
    if (unitNumberSelected === "") {
      setDate("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberSelected]);

  // UseEffect for setting selected Driver Name in local state
  useEffect(() => {
    if (selectedDriverData) {
      const fullName = `${selectedDriverData.firstName ? selectedDriverData.firstName?.trim() : ""} ${
        selectedDriverData.lastName ? selectedDriverData.lastName?.trim() : ""
      }`;
      setSelectedDriverName(fullName?.trim());
    }
  }, [selectedDriverData]);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriverData === "") {
      navigate("/yard-checkin-driver-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverData]);

  useEffect(() => {
    if (savedSuccessForShuttleDelay) {
      navigate("/yard-checkin-unit-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedSuccessForShuttleDelay]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15  mb-5" xs={7}>
              {/* Unit */}
              <Form.Group className="  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start w-250px">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Unit
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="unit"
                    type="text"
                    aria-autocomplete="list"
                    value={unitNumberSelected}
                    disabled
                  />
                </Col>
              </Form.Group>

              {/* Reason*/}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start w-250px">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Reason
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className={`customFormControl ${reason?.trim() === "" ? "borderRed" : "borderGreen"}`}
                    type="text"
                    name="reason"
                    maxLength={40}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              {/* Authorized By */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start w-250px">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Authorized By
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className={`customFormControl ${AuthorizedBy?.trim() === "" ? "borderRed" : "borderGreen"}`}
                    type="text"
                    name="AuthorizedBy"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => {
                      setAuthorizedBy(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              {/* Reporting Driver Check Box */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start w-250px">
                  <Form.Label htmlFor="setReportingDriver" className="col-form-label me-4">
                    Reporting Driver Same As Selected Driver
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <Form.Check
                    type="checkbox"
                    name="selectedDriverAsReportingDriver"
                    value={selectedDriverAsReportingDriver}
                    disabled={selectedUserID || reportedBy ? true : false}
                    onChange={(e) => {
                      setSelectedDriverAsReportingDriver(e.target.checked);
                    }}
                  />
                </Col>
              </Form.Group>

              {/* Reporting Driver */}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start w-250px">
                  <Form.Label className="col-form-label me-4">Reporting Driver</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={driverNames}
                    searchString={driverNameInput}
                    renderItemId={(driver) => driver.driverPK}
                    renderItemField={(driver) =>
                      driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
                    }
                    handleSearchString={(string) => setDriverNameInput(string)}
                    fetchDataBySearchString={fetchDriverByName}
                    onSelect={handleDriverSelectionFromDropdown}
                    selectedId={selectedDriverID}
                    clearInputCallback={() => {
                      setSelectedDriverID("");
                      setSelectedDriverAsReportingDriver(false);
                    }}
                    className={`${
                      selectedUserID || reportedBy || selectedDriverAsReportingDriver
                        ? "black"
                        : selectedDriverID === "" || driverNameInput === ""
                          ? "borderRed"
                          : "borderGreen"
                    }`}
                    disabled={selectedUserID || reportedBy || selectedDriverAsReportingDriver ? true : false}
                    hidePlaceholder={selectedUserID || reportedBy ? true : false}
                    loading={driverLoading}
                  />
                  <LookupButton
                    disabled={selectedUserID || reportedBy || selectedDriverAsReportingDriver ? true : false}
                    onClick={handleDriverLookupModalShow}
                  />
                </Col>
              </Form.Group>

              {/* Reporting User */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start w-250px">
                  <Form.Label className="col-form-label me-4">Reporting User</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={userNames}
                    searchString={userNameInput}
                    renderItemId={(user) => user.userPK}
                    renderItemField={(user) => user.name}
                    handleSearchString={(string) => setUserNameInput(string)}
                    fetchDataBySearchString={fetchUsers}
                    onSelect={handleUserSelectionFromDropdown}
                    selectedId={selectedUserID}
                    clearInputCallback={() => {
                      setSelectedUserID("");
                    }}
                    disabled={selectedDriverID || reportedBy ? true : false}
                    className={`${
                      selectedDriverID || reportedBy
                        ? "black"
                        : selectedUserID === "" || userNameInput === ""
                          ? "borderRed"
                          : "borderGreen"
                    }`}
                    hidePlaceholder={selectedDriverID || reportedBy ? true : false}
                    loading={userLoading}
                  />

                  <LookupButton
                    disabled={selectedDriverID || reportedBy ? true : false}
                    onClick={handleUserLookupModalShow}
                  />
                </Col>
              </Form.Group>

              {/* Reported By*/}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start w-250px">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Reported By
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className={`customFormControl ${
                      selectedDriverID || selectedUserID
                        ? "black"
                        : reportedBy?.trim() === ""
                          ? "borderRed"
                          : "borderGreen"
                    }`}
                    type="text"
                    name="reportedBy"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      setSelectedDriverID("");
                      setUserNameInput("");
                      setSelectedUserID("");
                      setDriverNameInput("");
                      setReportedBy(e.target.value);
                    }}
                    disabled={selectedDriverID || selectedUserID}
                  />
                </Col>
              </Form.Group>

              {/* Date Reported */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start w-250px">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Date Reported
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "100px" }}>
                  <DateInputField
                    date={date}
                    setIsDateValid={(value) => dispatch(setIsShuttleDateValid(value))}
                    name="date"
                    setDate={setDate}
                    className={`customFormControl ${
                      date === "" || !isShuttleDateValid ? "borderRed" : "borderGreen"
                    }`}
                    max={new Date()}
                  />
                </Col>
              </Form.Group>

              {/*Notes*/}
              <Form.Group className="form-group mt-2  align-items-start row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start w-250px">
                  <label className="col-form-label me-4">Notes</label>
                </Col>

                <Col xs={6} md={6} className="p-0">
                  <textarea
                    rows={5}
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
                </Col>
              </Form.Group>
            </Col>
            <DriverLookup
              companyName={selectedUnitCompanyName}
              show={driverLookUpshow}
              onHide={handleDriverLookupModalHide}
              renderItemId={(driver) => driver.driverPK}
              handleLookupSelection={handleDriverLookupSelection}
              YardCheckin
            />
            <UserLookup
              show={userLookUpshow}
              showActiveOnly
              onHide={handleUserLookupModalHide}
              renderItemId={(user) => user.userPK}
              handleLookupSelection={handleUserLookupSelection}
              companyName={selectedUnitCompanyName}
              YardCheckin
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShuttleDelayContent;
