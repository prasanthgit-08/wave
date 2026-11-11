import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DateInputField from "../../../../../common/DateInputField";
import UsersService from "../../../../../../services/UsersService";
import {
  setDriverData,
  setDriverDeleaseData,
  setIsDatesTabValid,
  setIsStatusChangingFromInactiveToTerminated,
  setUserData,
} from "../../../../../../redux/DriverDeleaseSlice";
import DriverServicesService from "../../../../../../services/DriverServicesService";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import DriverDeleaseService from "../../../../../../services/DriverDeleaseService";
import Input from "../../../../../../components/common/input";

const EMPTY_SAVED_USER_NAMES = { notified: "", completed: "", terminationLetter: "", voided: "" };

const DatesTab = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { driverId } = useParams();
  /******Used for Date Validation fields******/
  const [isNotifiedDateValid, setIsNotifiedDateValid] = useState(true);
  const [isCompletionDateValid, setIsCompletionDateValid] = useState(true);
  const [isTerminatLetterDateValid, setIsTerminatLetterDateValid] = useState(true);
  const [isVoidDateFormat, setIsVoidDateFormat] = useState(true);

  const [deleaseRequested, setDeleaseRequested] = useState(false);
  const [deleaseRequestDate, setDeleaseRequestDate] = useState("");
  const [deleaseRequestUser, setDeleaseRequestUser] = useState("");
  const [deleaseUser, setDeleaseUser] = useState("");
  const [driverDeleaseRequestFK, setDriverDeleaseRequestFK] = useState(null);
  const [requestReason, setRequestReason] = useState("");
  const [notified, setNotified] = useState(false);
  const [notifiedDate, setNotifiedDate] = useState("");
  const [notifiedUser, setNotifiedUser] = useState("");
  const [notifiedUserFK, setNotifiedUserFK] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [completedDate, setCompletedDate] = useState("");
  const [completedUser, setCompletedUser] = useState("");
  const [driverName, setDriverName] = useState("");

  const [completedUserFK, setCompletedUserFK] = useState(null);
  const [terminationLetter, setTerminationLetter] = useState(false);
  const [terminationLetterDate, setTerminationLetterDate] = useState("");
  const [terminationLetterUser, setTerminationLetterUser] = useState("");
  const [alreadyTerminated, setAlreadyTerminated] = useState(false);
  const [alreadyTerminatedDate, setAlreadyTerminatedDate] = useState("");
  const [alreadyNotified, setAlreadyNotified] = useState(false);
  const [alreadyNotifiedDate, setAlreadyNotifiedDate] = useState("");
  const [alreadyVoided, setAlreadyVoided] = useState(false);
  const [alreadyVoidedDate, setAlreadyVoidededDate] = useState("");
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [alreadyCompletedDate, setAlreadyCompletedDate] = useState("");
  const [terminationLetterUserFK, setTerminationLetterUserFK] = useState(null);
  const [voided, setVoided] = useState(false);
  const [voidedDate, setVoidedDate] = useState("");
  const [voidedUser, setVoidedUser] = useState("");
  const [voidedUserFK, setVoidedUserFK] = useState(null);
  const [voidedReason, setVoidedReason] = useState("");
  const viewDetail = useSelector((state) => state.driverDeleaseReducer.viewDetail);
  const userData = useSelector((state) => state.driverDeleaseReducer.userData);
  const editFormData = useSelector((state) => state.driverDeleaseReducer.editFormData);
  const driverData = useSelector((state) => state.driverDeleaseReducer.driverData);
  const isDatesTabValid = useSelector((state) => state.driverDeleaseReducer.isDatesTabValid);
  const changesCancelled = useSelector((state) => state.driverDeleaseReducer.changesCancelled);
  const completedCheckFlag = useSelector((state) => state.driverDeleaseReducer.completedCheckFlag);
  const allItemsCompletedFlag = useSelector((state) => state.driverDeleaseReducer.allItemsCompletedFlag);
  const itemsListingData = useSelector((state) => state.driverDeleaseReducer.itemsListingData);
  const incompletedriverDeleaseitems = useSelector(
    (state) => state.driverDeleaseReducer.incompletedriverDeleaseitems
  );
  const isStatusChangingFromInactiveToTerminated = useSelector(
    (state) => state.driverDeleaseReducer.isStatusChangingFromInactiveToTerminated
  );
  const status = useSelector((state) => state.driverDeleaseReducer.status);
  const driverDeleaseData = useSelector((state) => state.driverDeleaseReducer.driverDeleaseData);
  const isDeleaseProcess = useSelector((state) => state.driverDeleaseRequestsReducer.isDeleaseProcess);
  const driverDeleaseRequestObject = useSelector(
    (state) => state.driverDeleaseRequestsReducer.driverDeleaseRequestObject
  );
  /******States from Driver Delease Request in Compliance******/
  const isDeleaseCompliance = useSelector((state) => state.deleaseRequestReducer.isDeleaseCompliance);
  const deleaseRequestRecord = useSelector((state) => state.deleaseRequestReducer.deleaseRequestRecord);
  /******
   * Setting the fields from the DElease Request
   * record if delease button is clicked
   * from Delease Request Program
   * ****/
  useEffect(() => {
    if (isDeleaseProcess) {
      setDeleaseRequested(driverDeleaseRequestObject ? true : false);
      setDeleaseRequestDate(formatDatetimeToDate(driverDeleaseRequestObject?.addDate));
      setDeleaseRequestUser(fetchDeleaseRequestUserForDriverDelease(driverDeleaseRequestObject?.addUserFK));
      setNotified(driverDeleaseRequestObject?.notified);
      setNotifiedDate(driverDeleaseRequestObject?.notifiedDate);
      setRequestReason(driverDeleaseRequestObject?.reason);
      setDriverDeleaseRequestFK(driverDeleaseRequestObject?.driverDeleaseRequestPK);
    }
  }, [isDeleaseProcess, driverDeleaseRequestObject]);

  /******
   * Setting the fields from the Delease Request
   * record if delease button is clicked
   * from Delease Request Program in Compliance Program
   *****/
  useEffect(() => {
    if (isDeleaseCompliance) {
      setDeleaseRequested(true);
      setDeleaseRequestDate(formatDatetimeToDate(deleaseRequestRecord?.AddDate));
      setDeleaseRequestUser(deleaseRequestRecord?.AddedByUser);
      setRequestReason(deleaseRequestRecord?.reason);
      setDriverDeleaseRequestFK(deleaseRequestRecord?.driverDeleaseRequestPK);
    }
  }, [isDeleaseCompliance, deleaseRequestRecord]);

  /*****Clears the values if all the objects are null*****/
  useEffect(() => {
    if (editFormData === null && driverDeleaseRequestObject == null && deleaseRequestRecord === null) {
      setDeleaseRequested(false);
      setDeleaseRequestDate("");
      setDeleaseRequestUser("");
      setRequestReason("");
      setNotified(false);
      setNotifiedDate("");
      setNotifiedUser("");
      setCompleted(false);
      setCompletedDate("");
      setCompletedUser("");
      setTerminationLetter(false);
      setTerminationLetterDate("");
      setTerminationLetterUser("");
      setVoided(false);
      setVoidedDate("");
      setVoidedUser("");
      setVoidedReason("");
    }
  }, [editFormData, driverDeleaseRequestObject, deleaseRequestRecord]);
  useEffect(() => {
    if (editFormData !== null && id !== null) {
      setDeleaseRequested(editFormData.driverDeleaseRequestFK ? true : false);
      setDeleaseRequestDate(
        editFormData.driverDeleaseRequestFK ? editFormData.driverDeleaseRequest.addDate : ""
      );
      setDeleaseRequestUser(
        editFormData.driverDeleaseRequestFK
          ? editFormData.driverDeleaseRequest.driverRequested
            ? driverData
              ? driverData.name
              : ""
            : fetchDeleaseRequestUser(editFormData.driverDeleaseRequest.addUserFK)
          : ""
      );
      setRequestReason(editFormData.driverDeleaseRequestFK ? editFormData.driverDeleaseRequest.reason : "");
      setNotified(editFormData.notified ? editFormData.notified : false);
      setNotifiedDate(editFormData.notifiedDate ? editFormData.notifiedDate : "");
      setAlreadyNotified(editFormData.notified ? editFormData.notified : false);
      setAlreadyNotifiedDate(editFormData.notifiedDate ? editFormData.notifiedDate : "");
      setCompleted(editFormData.completed ? editFormData.completed : false);
      setCompletedDate(editFormData.completedDate ? editFormData.completedDate : "");
      setAlreadyCompleted(editFormData.completed ? editFormData.completed : false);
      setAlreadyCompletedDate(editFormData.completedDate ? editFormData.completedDate : "");
      setTerminationLetter(editFormData.terminationLetter ? editFormData.terminationLetter : false);
      setTerminationLetterDate(editFormData.terminationLetterDate ? editFormData.terminationLetterDate : "");
      setAlreadyTerminated(editFormData.terminationLetter ? editFormData.terminationLetter : false);
      setAlreadyTerminatedDate(editFormData.terminationLetterDate ? editFormData.terminationLetterDate : "");
      setVoided(editFormData.voided ? editFormData.voided : false);
      setVoidedDate(editFormData.voidedDate ? editFormData.voidedDate : "");
      setAlreadyVoided(editFormData.voided ? editFormData.voided : false);
      setAlreadyVoidededDate(editFormData.voidedDate ? editFormData.voidedDate : "");

      setVoidedReason(editFormData.voidedReason ? editFormData.voidedReason : "");
    }
  }, [editFormData, driverData, changesCancelled]);

  useEffect(() => {
    if (editFormData?.inactive === true && editFormData?.terminated === false && status === "terminated") {
      dispatch(setIsStatusChangingFromInactiveToTerminated(true));
    } else {
      dispatch(setIsStatusChangingFromInactiveToTerminated(false));
    }
  }, [editFormData, status]);
  /*****
   * Clear the Cmpleted and Related fields
   * when the status changed from Inactive to terminated
   * and completed is checked
   * *****/
  useEffect(() => {
    if (isStatusChangingFromInactiveToTerminated && completed) {
      setCompleted(false);
      setCompletedDate("");
      setCompletedUser("");
      setCompletedUserFK(null);
    }
  }, [isStatusChangingFromInactiveToTerminated, completed]);

  /****Fetch the user data to display the current user Name ****/
  const fetchDeleaseRequestUser = () => {
    UsersService.fetchUserById(editFormData.driverDeleaseRequest.addUserFK)
      .then((res) => {
        setDeleaseRequestUser(res.data.name);
      })
      .catch((err) => console.log(err));
  };
  /****
   * Fetch the user data to display the deleased user Name
   * from Driver delease Request Delease Program
   * ****/
  const fetchDeleaseRequestUserForDriverDelease = () => {
    UsersService.fetchUserById(driverDeleaseRequestObject.addUserFK)
      .then((res) => {
        setDeleaseRequestUser(res.data.name);
      })
      .catch((err) => console.log(err));
  };
  /****Fetch the user data to display the current user Name *****/
  const fetchCurrentLoginUser = () => {
    DriverDeleaseService.getCurrentLoginUser().then(({ data }) => {
      dispatch(setUserData(data));
    });
  };

  /****Fetch the user data */
  useEffect(() => {
    fetchCurrentLoginUser();
  }, [id]);

  /*****
   * Fetch the names of the users saved on the record
   * (Notified / Completed / Termination Letter / Voided).
   * Keyed on the user FKs so it runs once per record, and each
   * distinct user is fetched only once.
   *****/
  const [savedUserNames, setSavedUserNames] = useState(EMPTY_SAVED_USER_NAMES);
  const savedNotifiedUserFK = editFormData?.notifiedUserFK;
  const savedCompletedUserFK = editFormData?.completedUserFK;
  const savedTerminationLetterUserFK = editFormData?.terminationLetterUserFK;
  const savedVoidedUserFK = editFormData?.voidedUserFK;
  useEffect(() => {
    let cancelled = false;
    setSavedUserNames(EMPTY_SAVED_USER_NAMES);
    const userFKs = [
      ...new Set(
        [savedNotifiedUserFK, savedCompletedUserFK, savedTerminationLetterUserFK, savedVoidedUserFK].filter(
          Boolean
        )
      ),
    ];
    if (userFKs.length === 0) return undefined;

    Promise.all(
      userFKs.map((userFK) =>
        UsersService.fetchUserById(userFK)
          .then((res) => [userFK, res.data.name])
          .catch((err) => {
            console.log(err);
            return [userFK, ""];
          })
      )
    ).then((results) => {
      if (cancelled) return;
      const namesByFK = Object.fromEntries(results);
      setSavedUserNames({
        notified: namesByFK[savedNotifiedUserFK] ?? "",
        completed: namesByFK[savedCompletedUserFK] ?? "",
        terminationLetter: namesByFK[savedTerminationLetterUserFK] ?? "",
        voided: namesByFK[savedVoidedUserFK] ?? "",
      });
    });
    return () => {
      cancelled = true;
    };
  }, [savedNotifiedUserFK, savedCompletedUserFK, savedTerminationLetterUserFK, savedVoidedUserFK]);

  const fetchDriverDetails = () => {
    DriverServicesService.getDriverDetails(driverId)
      .then((res) => {
        dispatch(setDriverName(res.data.firstName));
      })
      .catch((err) => console.log(err));
  };

  /****
   * Set the User Name according to the bit set:
   * saved user's name if the record already has a user FK,
   * otherwise the current login user (who will be stamped on save)
   *****/
  useEffect(() => {
    if (userData !== null) {
      setNotifiedUser(notified ? (savedNotifiedUserFK ? savedUserNames.notified : userData?.name) : "");
      setCompletedUser(completed ? (savedCompletedUserFK ? savedUserNames.completed : userData?.name) : null);
      setTerminationLetterUser(
        terminationLetter
          ? savedTerminationLetterUserFK
            ? savedUserNames.terminationLetter
            : userData?.name
          : null
      );
      setVoidedUser(voided ? (savedVoidedUserFK ? savedUserNames.voided : userData?.name) : null);
    }
  }, [
    userData,
    id,
    notified,
    completed,
    terminationLetter,
    voided,
    savedUserNames,
    savedNotifiedUserFK,
    savedCompletedUserFK,
    savedTerminationLetterUserFK,
    savedVoidedUserFK,
  ]);

  /***
   * Clear the Date and User name fields if the notified,
   *Completed,terminated
   *voided bits are false
   *****/
  useEffect(() => {
    if (!notified) {
      setNotifiedUser("");
      setNotifiedDate("");
    }
    if (!completed) {
      setCompletedUser("");
      setCompletedDate("");
    }
    if (!terminationLetter) {
      setTerminationLetterUser("");
      setTerminationLetterDate("");
    }
    if (!voided) {
      setVoidedUser("");
      setVoidedDate("");
      setVoidedReason("");
    }
  }, [notified, completed, terminationLetter, voided]);
  /*****
   * Dates Tab form Data
   * Setting for  Save operation
   *
   * ****/
  const datesTabFormData = () => {
    dispatch(
      setDriverDeleaseData({
        driverFK: driverId,
        driverDeleaseRequestFK: isDeleaseCompliance
          ? deleaseRequestRecord?.DriverDeleaseRequestPK
          : isDeleaseProcess
            ? driverDeleaseRequestObject?.driverDeleaseRequestPK
            : id
              ? editFormData?.driverDeleaseRequestFK
              : null,

        notified: isDeleaseProcess
          ? driverDeleaseRequestObject?.notified
            ? driverDeleaseRequestObject.notified
            : false
          : notified,
        notifiedDate: isDeleaseProcess
          ? driverDeleaseRequestObject?.notifiedDate
            ? driverDeleaseRequestObject.notifiedDate
            : " "
          : notifiedDate,
        notifiedUserFK: isDeleaseProcess
          ? driverDeleaseRequestObject?.notifiedUserFK
            ? driverDeleaseRequestObject.notifiedUserFK
            : ""
          : notified
            ? id
              ? editFormData?.notifiedUserFK
                ? editFormData?.notifiedUserFK
                : userData?.userPK
              : userData?.userPK
            : "",
        completed: isStatusChangingFromInactiveToTerminated && editFormData.completed ? false : completed,
        completedDate:
          isStatusChangingFromInactiveToTerminated && editFormData.completed ? "" : completedDate,
        completedUserFK:
          isStatusChangingFromInactiveToTerminated && editFormData.completed
            ? ""
            : completed
              ? editFormData?.completedUserFK
                ? editFormData?.completedUserFK
                : userData?.userPK
              : "",
        terminationLetter: terminationLetter,
        terminationLetterDate: terminationLetterDate,
        terminationLetterUserFK: terminationLetter
          ? editFormData?.terminationLetterUserFK
            ? editFormData?.terminationLetterUserFK
            : userData?.userPK
          : "",
        voided: voided,
        voidedDate: voidedDate,
        voidedUserFK: voided
          ? editFormData?.voidedUserFK
            ? editFormData?.voidedUserFK
            : userData?.userPK
          : "",
        voidedReason: voidedReason,
        isStatusChangingFromInactiveToTerminated: isStatusChangingFromInactiveToTerminated,
      })
    );
  };

  /****
   * Save object Dates Tab
   * *****/
  useEffect(() => {
    datesTabFormData();
  }, [
    driverId,
    driverDeleaseRequestFK,
    notified,
    notifiedDate,
    notifiedUserFK,
    completed,
    completedDate,
    completedUserFK,
    terminationLetter,
    terminationLetterDate,
    terminationLetterUserFK,
    voided,
    voidedDate,
    voidedUserFK,
    voidedReason,
    userData,
    id,
    isStatusChangingFromInactiveToTerminated,
    isDeleaseProcess,
    driverDeleaseRequestObject,
    editFormData,
  ]);
  /*****
   * Dates Tab Validation
   * *******/
  useEffect(() => {
    if (
      ((notified && notifiedDate && isNotifiedDateValid) || (!notified && !notifiedDate)) &&
      ((notified && completed && completedDate && isCompletionDateValid) || (!completed && !completedDate)) &&
      ((notified && completed && terminationLetter && terminationLetterDate && isTerminatLetterDateValid) ||
        (notified && terminationLetter && terminationLetterDate && isTerminatLetterDateValid) ||
        (!terminationLetter && !terminationLetterDate)) &&
      ((voided && voidedDate && isVoidDateFormat && voidedReason) ||
        (!voided && !voidedDate && !voidedReason))
    ) {
      dispatch(setIsDatesTabValid(true));
    } else {
      dispatch(setIsDatesTabValid(false));
    }
  }, [
    notified,
    notifiedDate,
    completed,
    completedDate,
    terminationLetter,
    terminationLetterDate,
    voided,
    voidedDate,
    voidedReason,
    isNotifiedDateValid,
    isCompletionDateValid,
    isVoidDateFormat,
    isTerminatLetterDateValid,
  ]);
  /*****
   * Set the current date for the dates fields if
   * corresponding bits are checked
   * *****/
  useEffect(() => {
    if (notified) {
      setNotifiedDate(formatDatetimeToDate(new Date()));
    }
    if (id && completed) {
      setCompletedDate(
        editFormData?.completedDate != null ? editFormData.completedDate : formatDatetimeToDate(new Date())
      );
    }
    if (id && terminationLetter) {
      setTerminationLetterDate(
        editFormData?.terminationLetterDate != null
          ? editFormData.terminationLetterDate
          : formatDatetimeToDate(new Date())
      );
    }
    if (id && voided) {
      setVoidedDate(
        editFormData?.voidedDate != null ? editFormData.voidedDate : formatDatetimeToDate(new Date())
      );
    }
  }, [id, notified, completed, terminationLetter, voided]);

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0 ">
        <Col sm={7} md={7} lg={7} xl={7} xs={7}>
          {/* Delease Request */}
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Delease Requested</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 $`}
                name="deleaseRequested"
                value={deleaseRequested}
                checked={deleaseRequested}
                disabled
              />
            </Col>
          </Form.Group>
          {/* Delease Request Date */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Delease Request Date</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <DateInputField
                date={deleaseRequestDate}
                name="deleaseRequestDate"
                className="customFormControl"
                setDate={setDeleaseRequestDate}
                disabled
              />
            </Col>
          </Form.Group>
          {/* Delease Requested By */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Delease Requested By</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                className="customFormControl"
                id="deleaseRequestUser"
                name="deleaseRequestUser"
                value={deleaseRequestUser}
                maxLength={40}
                disabled
              />
            </Col>
          </Form.Group>
          {/* Driver Notified */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Driver Notified</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 $`}
                name="notified"
                value={notified}
                checked={notified}
                disabled={
                  viewDetail ||
                  voided ||
                  completed ||
                  terminationLetter ||
                  alreadyNotified ||
                  isDeleaseProcess
                }
                onChange={(e) => {
                  setNotified(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          {/* Notification Date */}
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Notification Date</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <DateInputField
                date={notifiedDate}
                name="notifiedDate"
                className={`customFormControl ${
                  viewDetail === true ||
                  !notified ||
                  voided ||
                  (alreadyNotified && alreadyNotifiedDate) ||
                  isDeleaseProcess
                    ? ""
                    : notifiedDate && isNotifiedDateValid
                      ? "borderGreen"
                      : "borderRed"
                }`}
                max={new Date()}
                setDate={setNotifiedDate}
                setIsDateValid={setIsNotifiedDateValid}
                disabled={
                  viewDetail || !notified || (alreadyNotified && alreadyNotifiedDate) || isDeleaseProcess
                }
              />
            </Col>
          </Form.Group>
          {/*Driver Notified By */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Driver Notified By</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                className="customFormControl"
                id="notifiedUser"
                name="notifiedUser"
                value={notifiedUser}
                maxLength={40}
                disabled

                onChange={(e) => {}}
              />
            </Col>
          </Form.Group>
          {/* Completed */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Completed</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 $`}
                name="completed"
                value={completed}
                checked={completed}
                disabled={
                  viewDetail ||
                  !notified ||
                  voided ||
                  terminationLetter ||
                  alreadyCompleted ||
                  !id ||
                  (completedCheckFlag === false && incompletedriverDeleaseitems.length !== 0) ||
                  (completedCheckFlag === false && itemsListingData.length !== 0)
                }
                onChange={(e) => {
                  setCompleted(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          {/* Completion Date */}
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Completion Date</Form.Label>
            </Col>
            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <DateInputField
                date={completedDate}
                name="completedDate"
                className={`customFormControl ${
                  viewDetail === true ||
                  !completed ||
                  !notified ||
                  voided ||
                  (alreadyCompleted && alreadyCompletedDate)
                    ? ""
                    : completedDate !== "" && isCompletionDateValid
                      ? "borderGreen"
                      : "borderRed"
                }`}
                max={new Date()}
                setDate={setCompletedDate}
                setIsDateValid={setIsCompletionDateValid}
                disabled={
                  viewDetail || !completed || !notified || (alreadyCompleted && alreadyCompletedDate) || !id
                }
              />
            </Col>
          </Form.Group>
          {/*Completed By */}
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Completed By</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                className="customFormControl"
                id="completedUser"
                name="completedUser"
                value={completedUser}
                maxLength={40}
                disabled

                onChange={(e) => {}}
              />
            </Col>
          </Form.Group>
          {/* Termination Letter Sent */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Termination Letter Sent</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 $`}
                name="terminationLetter"
                value={terminationLetter}
                checked={terminationLetter}
                disabled
                onChange={(e) => {
                  setTerminationLetter(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          {/* Termination Letter Date */}
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Termination Letter Date</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <DateInputField
                date={terminationLetterDate}
                name="terminationLetterDate"
                className={`customFormControl ${
                  viewDetail === true ||
                  !notified ||
                  !completed ||
                  !terminationLetter ||
                  voided ||
                  (alreadyTerminated && alreadyTerminatedDate)
                    ? ""
                    : terminationLetterDate !== "" && isTerminatLetterDateValid
                      ? "borderGreen"
                      : "borderRed"
                }`}
                setDate={setTerminationLetterDate}
                setIsDateValid={setIsTerminatLetterDateValid}
                max={new Date()}
                disabled
              />
            </Col>
          </Form.Group>
          {/*Termination Letter Sent By */}
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Termination Letter Sent By</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                className="customFormControl"
                id="terminationLetterUser"
                name="terminationLetterUser"
                value={terminationLetterUser}
                maxLength={40}
                disabled

                onChange={(e) => {}}
              />
            </Col>
          </Form.Group>
          {/* Voided */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Voided </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 $`}
                name="voided"
                value={voided}
                checked={voided}
                disabled={viewDetail || completed || alreadyVoided || !id}
                onChange={(e) => {
                  setVoided(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          {/* Void Date */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Void Date</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <DateInputField
                date={voidedDate}
                name="voidedDate"
                className={`customFormControl ${
                  viewDetail === true || !voided || (alreadyVoided && alreadyVoidedDate)
                    ? ""
                    : voidedDate !== "" && isVoidDateFormat
                      ? "borderGreen"
                      : "borderRed"
                }`}
                max={new Date()}
                setDate={setVoidedDate}
                setIsDateValid={setIsVoidDateFormat}
                disabled={viewDetail || !voided || (alreadyVoided && alreadyVoidedDate) || !id}
              />
            </Col>
          </Form.Group>
          {/*Voided By */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Voided By</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                className="customFormControl"
                id="voidedUser"
                name="voidedUser"
                value={voidedUser}
                maxLength={40}
                disabled

                onChange={(e) => {}}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={5} xs={5} md={5}>
          {/* Request Reason */}
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Request Reason</Form.Label>
            </Col>

            <Col xs={8} md={8} className="p-0 me-2">
              <textarea
                rows={5}
                cols={10}
                type="text"
                className={`customFormControl h-100 w-100 customFocusClass`}
                id="requestReason"
                name="requestReason"
                value={requestReason}
                disabled
                onChange={(e) => {
                  setRequestReason(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                }}
              />
            </Col>
          </Form.Group>
          {/* Void Reason */}
          <Form.Group className=" align-items row  m-l-0 m-r-0 m-t-310">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Void Reason</Form.Label>
            </Col>

            <Col xs={8} md={8} className="p-0 me-2">
              <textarea
                rows={5}
                cols={10}
                type="text"
                className={`customFormControl h-100 w-100 customFocusClass ${
                  viewDetail
                    ? ""
                    : voided
                      ? voidedReason && voidedReason.length >= 1
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                } `}
                id="voidedReason"
                name="voidedReason"
                value={voidedReason}
                disabled={viewDetail || !voided || !id}
                onInput={(e) => {
                  setVoidedReason(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default DatesTab;
