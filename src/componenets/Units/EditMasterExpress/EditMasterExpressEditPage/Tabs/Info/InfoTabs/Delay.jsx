import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../common/LookupButton";
import {
  setIsInfoDelaysTabActivationDelayValid,
  setIsInfoDelaysTabShuttleDelayValid,
  setIsInfoDelaysTabValid,
  setEditedUnitDataToSaveForInfoTab,
  setUnitOnActivationDelay,
  setUnitOnShuttleDelay,
} from "../../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import EditMasterExpressService from "../../../../../../../services/Units/EditMasterExpressService";
import UserLookup from "../../../../../../LookupScreens/User/UserLookup";
import DriverLookup from "../../../../../../LookupScreens/Driver/DriverLookup";
import DateInputField from "../../../../../../common/DateInputField";
import formatDatetimeToDate from "../../../../../../../utils/formatDateTimeToDate";

function Delay({ styles }) {
  const dispatch = useDispatch();

  //Local States
  const [onActivationDelay, setOnActivationDelay] = useState(false);
  const [delayReason, setDelayReason] = useState("");
  const [onShuttleDelay, setOnShuttleDelay] = useState(false);
  const [unitShuttleDelayPK, setUnitShuttleDelayPK] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [userLookUpshow, setUserLookUpshow] = useState(false);
  const [driverNames, setDriverNames] = useState([]);
  const [selectedDriverAsReportingDriver, setSelectedDriverAsReportingDriver] = useState(false);
  const [selectedDriverID, setSelectedDriverID] = useState("");
  const [driverNameInput, setDriverNameInput] = useState("");
  const [driverLookUpshow, setDriverLookUpshow] = useState(false);
  const [reportedBy, setReportedBy] = useState("");
  const [date, setDate] = useState("");
  const [isDateValid, setIsDateValid] = useState(true);
  const [notes, setNotes] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [driverLoading, setDriverLoading] = useState(true);

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const isInfoDelaysTabActivationDelayValid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isInfoDelaysTabActivationDelayValid
  );
  const isInfoDelaysTabShuttleDelayValid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isInfoDelaysTabShuttleDelayValid
  );

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setOnActivationDelay(selectedUnitData?.editMasterExpressInfoTabDTO?.delayDispatch || false);
      dispatch(
        setUnitOnActivationDelay(selectedUnitData?.editMasterExpressInfoTabDTO?.delayDispatch || false)
      );
      setDelayReason(selectedUnitData?.editMasterExpressInfoTabDTO?.delayDispatchReason || "");
      setOnShuttleDelay(selectedUnitData?.editMasterExpressInfoTabDTO?.unitOnShuttleDelay || false);
      dispatch(
        setUnitOnShuttleDelay(selectedUnitData?.editMasterExpressInfoTabDTO?.unitOnShuttleDelay || false)
      );
      setUnitShuttleDelayPK(selectedUnitData?.editMasterExpressInfoTabDTO?.unitShuttleDelayPK || "");
      setAuthorizedBy(selectedUnitData?.editMasterExpressInfoTabDTO?.shuttleDelayAuthorizedBy || "");
      setUserNameInput(selectedUnitData?.editMasterExpressInfoTabDTO?.shuttleDelayReportingUser || "");
      setSelectedUserID(selectedUnitData?.editMasterExpressInfoTabDTO?.reportingUserFK || "");
      setDriverNameInput(selectedUnitData?.editMasterExpressInfoTabDTO?.shuttleDelayReportingDriver || "");
      setSelectedDriverID(selectedUnitData?.editMasterExpressInfoTabDTO?.reportingDriverFK || "");
      setReportedBy(selectedUnitData?.editMasterExpressInfoTabDTO?.shuttleDelayReportedBy || "");
      setDate(formatDatetimeToDate(selectedUnitData?.editMasterExpressInfoTabDTO?.shuttleDelayDate) || "");
      setNotes(selectedUnitData?.editMasterExpressInfoTabDTO?.shuttleDelayReason || "");
    }
    // eslint-disable-next-line
  }, [selectedUnitData]);

  //Info - Delays Tab Validation
  // Activation Delay
  useEffect(() => {
    if (!onActivationDelay || (onActivationDelay && delayReason?.trim() !== "")) {
      dispatch(setIsInfoDelaysTabActivationDelayValid(true));
    } else {
      dispatch(setIsInfoDelaysTabActivationDelayValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onActivationDelay, delayReason]);

  // Shuttle Delay
  useEffect(() => {
    if (
      !onShuttleDelay ||
      (onShuttleDelay &&
        authorizedBy?.trim() !== "" &&
        (selectedUserID !== "" || selectedDriverID !== "" || reportedBy !== "") &&
        date &&
        isDateValid &&
        notes !== "")
    ) {
      dispatch(setIsInfoDelaysTabShuttleDelayValid(true));
    } else {
      dispatch(setIsInfoDelaysTabShuttleDelayValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onShuttleDelay, authorizedBy, selectedUserID, selectedDriverID, reportedBy, date, isDateValid, notes]);

  useEffect(() => {
    if (isInfoDelaysTabActivationDelayValid && isInfoDelaysTabShuttleDelayValid) {
      dispatch(setIsInfoDelaysTabValid(true));
    } else {
      dispatch(setIsInfoDelaysTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInfoDelaysTabActivationDelayValid, isInfoDelaysTabShuttleDelayValid]);

  /****** Reporting user dropdown and lookup ******/
  const fetchUsers = (string) => {
    setUserLoading(true);
    EditMasterExpressService.getAllUserData(string)
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
    setUserNameInput(user.name?.trim());
    setSelectedUserID(user.userPK);
    setUserLookUpshow(false);
  };

  //Handle selection from driver look up screen
  const handleUserLookupSelection = (user) => {
    setUserNameInput(user.name?.trim());
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

  //Service for getting all Driver names
  const fetchDriverByName = (string) => {
    setDriverLoading(true);
    EditMasterExpressService.fetchDriverDetailsByName(string)
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
    setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""));
    setSelectedUserID("");
    setReportedBy("");
  };

  //Handle selection from driver look up screen
  const handleDriverLookupSelection = (driver) => {
    setSelectedDriverID(driver.driverPK);
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

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForInfoTab({
        delayDispatch: onActivationDelay,
        delayDispatchReason: delayReason,
        unitOnShuttleDelay: onShuttleDelay,
        unitShuttleDelayPK: unitShuttleDelayPK,
        shuttleDelayAuthorizedBy: authorizedBy,
        reportingUserFK: selectedUserID,
        reportingDriverFK: selectedDriverID,
        reportedBy: reportedBy,
        delayDate: date,
        shuttleDelayReason: notes,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    onActivationDelay,
    delayReason,
    onShuttleDelay,
    unitShuttleDelayPK,
    authorizedBy,
    selectedUserID,
    selectedDriverID,
    reportedBy,
    date,
    notes,
  ]);
  //clearing value

  useEffect(() => {
    if (reportedBy !== "") {
      setDriverNameInput("");
      setUserNameInput("");
    }
  }, [reportedBy]);
  useEffect(() => {
    if (userNameInput !== "") {
      setDriverNameInput("");
      setReportedBy("");
    }
  }, [userNameInput]);

  useEffect(() => {
    if (driverNameInput !== "") {
      setUserNameInput("");
      setReportedBy("");
    }
  }, [driverNameInput]);
  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          {/* On Activation Delay */}
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>On Activation Delay</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null
                }
                value={onActivationDelay}
                checked={onActivationDelay}
                onChange={(e) => {
                  setOnActivationDelay(e.target.checked);
                  dispatch(setUnitOnActivationDelay(e.target.checked));
                  if (!e.target.checked) {
                    setDelayReason("");
                  }
                }}
              />
            </Col>
          </Form.Group>

          {/* Delay Reason */}
          <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Delay Reason</Form.Label>
            </Col>

            <Col sm={9} md={9} className="p-0 ">
              <textarea
                rows={13}
                className={`customFormControl h-100 ${
                  isUnitDataLoading ||
                  viewDetail ||
                  !onActivationDelay ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null
                    ? ""
                    : onActivationDelay && delayReason?.trim() !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="delayReason"
                value={delayReason}
                disabled={
                  viewDetail ||
                  !onActivationDelay ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setDelayReason(value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          {/* On Shuttle Delay */}
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>On Shuttle Delay</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail || selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                }
                value={onShuttleDelay}
                checked={onShuttleDelay}
                onChange={(e) => {
                  setOnShuttleDelay(e.target.checked);
                  dispatch(setUnitOnShuttleDelay(e.target.checked));
                  if (!e.target.checked) {
                    setAuthorizedBy("");
                    setSelectedUserID("");
                    setUserNameInput("");
                    setSelectedDriverID("");
                    setDriverNameInput("");
                    setReportedBy("");
                    setDate("");
                    setNotes("");
                  }
                }}
              />
            </Col>
          </Form.Group>

          {/* Authorized By */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Authorized By</Form.Label>
            </Col>
            <Col xs={4} className="p-0">
              <input
                className={`customFormControl ${
                  isUnitDataLoading ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? ""
                    : onShuttleDelay && authorizedBy !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                name="authorizedBy"
                type="text"
                value={authorizedBy}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[^a-zA-Z]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setAuthorizedBy(value);
                }}
              />
            </Col>
          </Form.Group>

          {/* Reporting User */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reporting User</Form.Label>
            </Col>
            <Col xs={6} className={`p-0 ${styles.selectContainer}`}>
              <AutoCompleteDropdown
                arrayList={userNames}
                searchString={userNameInput}
                renderItemId={(user) => user.userPK}
                renderItemField={(user) => user.name}
                handleSearchString={(string) => setUserNameInput(string)}
                fetchDataBySearchString={fetchUsers}
                onSelect={handleUserSelectionFromDropdown}
                selectedId={selectedUserID}
                loading={userLoading}
                clearInputCallback={() => {
                  setSelectedUserID("");
                }}
                disabled={
                  selectedDriverID ||
                  viewDetail ||
                  !onShuttleDelay ||
                  reportedBy ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? true
                    : false
                }
                className={`${
                  selectedDriverID ||
                  reportedBy ||
                  isUnitDataLoading ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? "black"
                    : onShuttleDelay && (selectedUserID === "" || userNameInput === "")
                      ? "borderRed"
                      : "borderGreen"
                }`}
                hidePlaceholder={
                  selectedDriverID ||
                  reportedBy ||
                  !onShuttleDelay ||
                  viewDetail ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? true
                    : false
                }
              />

              <LookupButton
                disabled={
                  selectedDriverID ||
                  reportedBy ||
                  isUnitDataLoading ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? true
                    : false
                }
                onClick={handleUserLookupModalShow}
              />
            </Col>
          </Form.Group>

          {/* Reporting Driver */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reporting Driver</Form.Label>
            </Col>
            <Col xs={6} className={`p-0 ${styles.selectContainer}`}>
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
                loading={driverLoading}
                className={`${
                  selectedUserID ||
                  viewDetail ||
                  !onShuttleDelay ||
                  reportedBy ||
                  selectedDriverAsReportingDriver ||
                  isUnitDataLoading ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? "black"
                    : onShuttleDelay && (selectedDriverID === "" || driverNameInput === "")
                      ? "borderRed"
                      : "borderGreen"
                }`}
                disabled={
                  selectedUserID ||
                  reportedBy ||
                  selectedDriverAsReportingDriver ||
                  isUnitDataLoading ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? true
                    : false
                }
                hidePlaceholder={
                  selectedUserID ||
                  reportedBy ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? true
                    : false
                }
              />
              <LookupButton
                disabled={
                  selectedUserID ||
                  reportedBy ||
                  selectedDriverAsReportingDriver ||
                  isUnitDataLoading ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? true
                    : false
                }
                onClick={handleDriverLookupModalShow}
              />
            </Col>
          </Form.Group>

          {/* Reported By */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reported By</Form.Label>
            </Col>
            <Col xs={4} className="p-0">
              <input
                className={`customFormControl ${
                  selectedDriverID ||
                  selectedUserID ||
                  isUnitDataLoading ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? "black"
                    : onShuttleDelay && reportedBy?.trim() === ""
                      ? "borderRed"
                      : "borderGreen"
                }`}
                name="reportedBy"
                type="text"
                value={reportedBy}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={
                  selectedDriverID ||
                  selectedUserID ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[^a-zA-Z]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setSelectedDriverID("");
                  setUserNameInput("");
                  setSelectedUserID("");
                  setDriverNameInput("");
                  setReportedBy(value);
                }}
              />
            </Col>
          </Form.Group>

          {/* Delay Date */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Delay Date</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <DateInputField
                date={date}
                setDate={setDate}
                disabled={
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                }
                setIsDateValid={setIsDateValid}
                max={new Date()}
                className={`customFormControl ${
                  isUnitDataLoading ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? ""
                    : onShuttleDelay && date !== "" && isDateValid
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>

          {/* Delay Reason */}
          <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Delay Reason</Form.Label>
            </Col>
            <Col sm={9} md={9} className="p-0 ">
              <textarea
                rows={13}
                className={`customFormControl h-100 ${
                  isUnitDataLoading ||
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                    ? ""
                    : onShuttleDelay && notes !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="notes"
                value={notes}
                disabled={
                  viewDetail ||
                  !onShuttleDelay ||
                  selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setNotes(value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <UserLookup
        show={userLookUpshow}
        onHide={handleUserLookupModalHide}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleUserLookupSelection}
        MaintenanceProgram
      />
      <DriverLookup
        show={driverLookUpshow}
        onHide={handleDriverLookupModalHide}
        renderItemId={(driver) => driver.driverPK}
        handleLookupSelection={handleDriverLookupSelection}
        MaintenanceProgram
      />
    </div>
  );
}

export default Delay;
