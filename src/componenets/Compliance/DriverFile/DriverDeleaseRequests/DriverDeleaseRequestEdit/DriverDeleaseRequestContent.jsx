import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DriverDeleaseRequestsService from "../../../../../services/DriverDeleaseRequestsService";
import {
  setDisableSave,
  setDriverDeleaseRequestObject,
  setDriverDeleaseRequestsSaveObject,
  setEditFormData,
  setUserData,
  setViewDetail,
} from "../../../../../redux/DriverDeleaseRequestsSlice";
import UsersService from "../../../../../services/UsersService";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import Input from "../../../../../components/common/input";
import LoadingIcon from "../../../../common/LoadingIcon";

const DriverDeleaseRequestContent = () => {
  const [loader, setLoader] = useState(false);
  const [loginUserLoading, setLoginUserLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { driverId, deleaserequestPK } = useParams();
  const editFormData = useSelector((state) => state.driverDeleaseRequestsReducer.editFormData);
  const changesCancelled = useSelector((state) => state.driverDeleaseRequestsReducer.changesCancelled);
  const viewDetail = useSelector((state) => state.driverDeleaseRequestsReducer.viewDetail);
  const userData = useSelector((state) => state.driverDeleaseRequestsReducer.userData);
  const driverDeleaseRequestsSaveObject = useSelector(
    (state) => state.driverDeleaseRequestsReducer.driverDeleaseRequestsSaveObject
  );
  const isSettingDeleaseRequestProcessed = useSelector(
    (state) => state.driverDeleaseRequestsReducer.isSettingDeleaseRequestProcessed
  );
  const isDoubleClick = useSelector((state) => state.driverDeleaseRequestsReducer.isDoubleClick);
  const isDeleaseRequestEdit = useSelector(
    (state) => state.driverDeleaseRequestsReducer.isDeleaseRequestEdit
  );
  const [requestDate, setRequestDate] = useState("");
  const [requestUser, setRequestUser] = useState("");
  const [alreadyNotified, setAlreadyNotified] = useState(false);
  const [alreadyNotifiedDate, setAlreadyNotifiedDate] = useState("");
  const [driverRequested, setDriverRequested] = useState(false);
  const [notified, setNotified] = useState(false);
  const [notifiedDate, setNotifiedDate] = useState("");
  const [notifiedUser, setNotifiedUser] = useState("");
  const [notifiedUserFK, setNotifiedUserFK] = useState(null);
  const [processed, setProcessed] = useState(false);
  const [processedDate, setProcessedDate] = useState("");
  const [processedUser, setProcessedUser] = useState("");
  const [processuserfk, setProcessuserfk] = useState(null);
  const [canceled, setCanceled] = useState(false);
  const [alreadyCanceled, setAlreadyCanceled] = useState(false);
  const [alreadyCanceledDate, setAlreadyCanceledDate] = useState("");
  const [canceledDate, setCanceledDate] = useState("");
  const [canceledUser, setCanceledUser] = useState("");
  const [canceleduserfk, setCanceleduserfk] = useState(null);
  const [notes, setNotes] = useState("");
  const [reason, setReason] = useState("");
  const [isNotifiedDateValid, setIsNotifiedDateValid] = useState(true);
  const [isCanceledDateValid, setIsCanceledDateValid] = useState(true);

  /*****Fetch The record By Id ****/
  useEffect(() => {
    if (deleaserequestPK) {
      setLoader(true);
      DriverDeleaseRequestsService.getDriverDeleaseRequest(deleaserequestPK)
        .then((response) => {
          const { data } = response;
          dispatch(setEditFormData(data));
          dispatch(setDriverDeleaseRequestObject(data));
          dispatch(setViewDetail(true));
          setLoader(false);
        })
        .catch((err) => {
          navigate(`/driver-delease-requests/${driverId}`);
          setLoader(false);
        });
    }
  }, [deleaserequestPK]);

  /******Fetch the Current Login User */
  /****Fetch the user data to display the current user Name */
  const fetchCurrentLoginUser = () => {
    setLoginUserLoading(true);
    DriverDeleaseRequestsService.getCurrentLoginUser()
      .then(({ data }) => {
        dispatch(setUserData(data));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoginUserLoading(false));
  };

  /****Fetch the user data */
  useEffect(() => {
    fetchCurrentLoginUser();
  }, []);

  /***
   * Clear the Date and User name fields if the notified,
   * Completed,terminated
   *voided bits are false
   *****/
  useEffect(() => {
    if (!notified) {
      setNotifiedUser("");
      setNotifiedDate("");
    }
    if (!processed) {
      setProcessedDate("");
      setProcessedUser("");
    }
    if (!canceled) {
      setCanceledUser("");
      setCanceledDate("");
    }
  }, [notified, processed, canceled]);
  /*****
   * Set the Usera name only while add and edit operation for driver Delease
   * ******/
  useEffect(() => {
    if ((userData !== null && !deleaserequestPK) || (userData !== null && isDeleaseRequestEdit === true)) {
      setNotifiedUser(notified ? (editFormData?.notifiedUserFK ? NotifiedUser() : userData?.name) : null);
      setProcessedUser(processed ? (editFormData?.processuserfk ? ProcessedUser() : userData?.name) : null);
      setCanceledUser(canceled ? (editFormData?.canceleduserfk ? CanceledUser() : userData?.name) : null);
      setRequestUser(userData?.name);
    }
  }, [userData, notified, processed, canceled, isDeleaseRequestEdit]);

  /*****
   * Clear the fields on bits changed to false
   * ******/

  useEffect(() => {
    if (!notified) {
      setCanceled(false);
      setCanceledDate("");
      setCanceledUser("");
    }
  }, [notified]);
  /*****
   * Set the current date for the dates fields if corresponding bits are checked
   *
   * *****/
  useEffect(() => {
    if (notified) {
      setNotifiedDate(
        editFormData?.notifiedDate != null ? editFormData.notifiedDate : formatDatetimeToDate(new Date())
      );
    }
    if (processed) {
      setProcessedDate(
        editFormData?.processedDate != null ? editFormData.processedDate : formatDatetimeToDate(new Date())
      );
    }
    if (canceled) {
      setCanceledDate(
        editFormData?.canceledDate != null ? editFormData.canceledDate : formatDatetimeToDate(new Date())
      );
    }
  }, [notified, processed, canceled]);

  useEffect(() => {
    if (editFormData === null) {
      setRequestDate("");
      setRequestUser("");
      setDriverRequested(false);
      setNotified(false);
      setNotifiedDate("");
      setNotifiedUser("");
      setProcessed(false);
      setProcessedUser("");
      setProcessedDate("");
      setCanceled(false);
      setCanceledDate("");
      setCanceledUser("");
      setCanceleduserfk(null);
      setNotes("");
      setReason("");
    }
  }, [editFormData]);
  useEffect(() => {
    if ((editFormData !== null && isDoubleClick) || editFormData?.processed === true) {
      setRequestDate(editFormData.addDate ? editFormData.addDate : "");
      setRequestUser(editFormData.addUserFK ? RequestUser(editFormData.addUserFK) : "");
      setDriverRequested(editFormData.driverRequested ? editFormData.driverRequested : false);
      setNotified(editFormData.notified ? editFormData.notified : false);
      setNotifiedDate(editFormData.notifiedDate ? editFormData.notifiedDate : "");
      setAlreadyNotified(editFormData.notified ? editFormData.notified : false);
      setAlreadyNotifiedDate(editFormData.notifiedDate ? editFormData.notifiedDate : "");
      setNotifiedUser(editFormData.notifiedUserFK ? NotifiedUser(editFormData.notifiedUserFK) : "");
      setProcessed(editFormData.processed ? editFormData.processed : false);
      setProcessedDate(editFormData.processedDate ? editFormData.processedDate : "");
      setProcessedUser(editFormData.processuserfk ? ProcessedUser(editFormData.processuserfk) : "");
      setCanceled(editFormData.canceled ? editFormData.canceled : false);
      setCanceledDate(editFormData.canceledDate ? editFormData.canceledDate : "");
      setAlreadyCanceled(editFormData.canceled ? editFormData.canceled : false);
      setAlreadyCanceledDate(editFormData.canceledDate ? editFormData.canceledDate : "");
      setCanceledUser(editFormData.canceleduserfk ? CanceledUser(editFormData.canceleduserfk) : "");
      setNotes(editFormData.notes ? editFormData.notes : "");
      setReason(editFormData.reason ? editFormData.reason : "");
    } else {
      setRequestDate(formatDatetimeToDate(new Date()));
    }
  }, [editFormData, isDoubleClick, changesCancelled]);
  /******
   * Share one in-flight request per user id, so fields with the same user
   * (e.g. Requested By and Notified By) don't fetch it twice
   * *****/
  const userRequestsRef = useRef({});
  const fetchUserById = (userId) => {
    if (!userRequestsRef.current[userId]) {
      userRequestsRef.current[userId] = UsersService.fetchUserById(userId).finally(() => {
        delete userRequestsRef.current[userId];
      });
    }
    return userRequestsRef.current[userId];
  };
  /******
   * Fetch the requested User
   * *****/
  const RequestUser = () => {
    if (editFormData?.addUserFK) {
      fetchUserById(editFormData?.addUserFK)
        .then((res) => {
          setRequestUser(res.data.name);
        })
        .catch((err) => console.log(err));
    }
  };
  /*****
   * Fetch the Notified User
   * ******/
  const NotifiedUser = () => {
    if (editFormData?.notifiedUserFK) {
      fetchUserById(editFormData?.notifiedUserFK)
        .then((res) => {
          setNotifiedUser(res.data.name);
        })
        .catch((err) => console.log(err));
    }
  };
  /*****
   * Fetch the Canceled user Name
   *
   * ******/
  const CanceledUser = () => {
    if (editFormData?.canceleduserfk) {
      fetchUserById(editFormData?.canceleduserfk)
        .then((res) => {
          setCanceledUser(res.data.name);
        })
        .catch((err) => console.log(err));
    }
  };
  /*****
   * Fetch the Processed user Name
   *
   * ******/
  const ProcessedUser = () => {
    if (editFormData?.processuserfk) {
      fetchUserById(editFormData?.processuserfk)
        .then((res) => {
          setProcessedUser(res.data.name);
        })
        .catch((err) => console.log(err));
    }
  };
  /*******Save Validations For Driver Delease Request******/
  useEffect(() => {
    if (
      reason &&
      ((notified && notifiedDate && isNotifiedDateValid) || (!notified && !notifiedDate)) &&
      ((canceled && canceledDate && isCanceledDateValid) || (!canceled && !canceledDate))
    ) {
      /****enable save if all conditions****/
      dispatch(setDisableSave(false));
    } else {
      /****disable save****/
      dispatch(setDisableSave(true));
    }
  }, [reason, notified, notifiedDate, canceled, canceledDate, isNotifiedDateValid, isCanceledDateValid]);

  /*******Save Object Creation******/
  useEffect(() => {
    dispatch(
      setDriverDeleaseRequestsSaveObject({
        driverDeleaseRequestPK: deleaserequestPK,
        driverFK: driverId,
        driverRequested: driverRequested,
        notified: notified,
        notifiedDate: notifiedDate,
        notifiedUserFK: notified
          ? deleaserequestPK
            ? editFormData?.notifiedUserFK
              ? editFormData?.notifiedUserFK
              : userData?.userPK
            : userData?.userPK
          : "",
        canceled: canceled,
        canceledDate: canceledDate,
        canceleduserfk: canceled
          ? editFormData?.canceleduserfk
            ? editFormData?.canceleduserfk
            : userData?.userPK
          : "",
        reason: reason,
        notes: notes,
        addUserFK: deleaserequestPK ? editFormData?.addUserFK : userData?.userPK,
      })
    );
  }, [
    driverId,
    driverRequested,
    notified,
    notifiedDate,
    notifiedUserFK,
    canceled,
    canceledDate,
    canceleduserfk,
    reason,
    notes,
    userData,
    deleaserequestPK,
    editFormData,
  ]);

  return (
    <div>
      {(loader || loginUserLoading) && <LoadingIcon />}
      <div className="p-15 w-100">
        <Row className="m-0 p-0 ">
          <Col sm={7} md={7} lg={7} xl={7} xs={7}>
            {/* Requested By */}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Requested By</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <Input
                  type="text"
                  className="customFormControl"
                  id="requestUser"
                  name="requestUser"
                  value={requestUser}
                  maxLength={40}
                  disabled
                  onChange={(e) => {}}
                />
              </Col>
            </Form.Group>
            {/* Delease Request Date */}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Request Date</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                <DateInputField
                  date={requestDate}
                  name="requestDate"
                  className="customFormControl"
                  setDate={setRequestDate}
                  disabled
                />
              </Col>
            </Form.Group>
            {/* Driver Requested */}
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Driver Requested</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="driverRequested"
                  value={driverRequested}
                  checked={driverRequested}
                  disabled={viewDetail || deleaserequestPK}
                  onChange={(e) => {
                    setDriverRequested(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>
            {/* Driver Notified */}
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Driver Notified</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="driverNotified"
                  value={notified}
                  checked={notified}
                  disabled={viewDetail || processed || alreadyNotified}
                  onChange={(e) => {
                    const value = e.target.checked;
                    setNotified(value);
                    if (!value) {
                      setNotifiedDate("");
                      setNotifiedUser("");
                    }
                  }}
                />
              </Col>
            </Form.Group>
            {/*Driver Notified By */}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Notified By</Form.Label>
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
            {/* Notified Date */}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Notified Date</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                <DateInputField
                  date={notifiedDate}
                  name="notifiedDate"
                  className={`customFormControl ${
                    viewDetail === true || !notified || (alreadyNotified && alreadyNotifiedDate)
                      ? ""
                      : notifiedDate && isNotifiedDateValid
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  max={new Date()}
                  setIsDateValid={setIsNotifiedDateValid}
                  setDate={setNotifiedDate}
                  disabled={viewDetail || processed || (alreadyNotified && alreadyNotifiedDate) || !notified}
                />
              </Col>
            </Form.Group>
            {/* Processed */}
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Processed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="processed"
                  value={processed}
                  checked={processed}
                  disabled={viewDetail || deleaserequestPK || !deleaserequestPK}
                  onChange={(e) => {
                    setProcessed(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>
            {/*Processed By*/}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Processed By</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <Input
                  type="text"
                  className="customFormControl"
                  id="processedUser"
                  name="processedUser"
                  value={processedUser}
                  maxLength={40}
                  disabled
                  onChange={(e) => {}}
                />
              </Col>
            </Form.Group>
            {/* Processed Date */}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Processed Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                <DateInputField
                  date={processedDate}
                  name="processedDate"
                  className="customFormControl"
                  max={new Date()}
                  setDate={setProcessedDate}
                  disabled={viewDetail || deleaserequestPK || !deleaserequestPK}
                />
              </Col>
            </Form.Group>
            {/* Canceled*/}
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Canceled</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="canceled"
                  value={canceled}
                  checked={canceled}
                  disabled={viewDetail || !deleaserequestPK || processed || alreadyCanceled || !notified}
                  onChange={(e) => {
                    const value = e.target.checked;
                    setCanceled(value);
                    if (!value) {
                      setCanceledDate("");
                      setCanceledUser("");
                    }
                  }}
                />
              </Col>
            </Form.Group>
            {/*Canceled By*/}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Canceled By</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <Input
                  type="text"
                  className="customFormControl"
                  id="canceledUser"
                  name="canceledUser"
                  value={canceledUser}
                  maxLength={40}
                  disabled
                  onChange={(e) => {}}
                />
              </Col>
            </Form.Group>
            {/* Canceled Date */}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} sm={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Canceled Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                <DateInputField
                  date={canceledDate}
                  name="canceledDate"
                  className={`customFormControl ${
                    viewDetail === true || !canceled || (alreadyCanceled && alreadyCanceledDate)
                      ? ""
                      : canceledDate && isCanceledDateValid
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  setDate={setCanceledDate}
                  setIsDateValid={setIsCanceledDateValid}
                  disabled={
                    viewDetail ||
                    !deleaserequestPK ||
                    (alreadyCanceled && alreadyCanceledDate) ||
                    !notified ||
                    !canceled
                  }
                />
              </Col>
            </Form.Group>
          </Col>
          <Col sm={5} md={5} lg={5} xl={5} xs={5}>
            <Form.Group className="mt-2 row flex-column">
              <Col className="p-0 mb-2">
                <Form.Label className="col-form-label dealer-label">Reason For Delease Request</Form.Label>
              </Col>
              <Col xs={11} md={11} className="p-0 me-2">
                <textarea
                  rows={10}
                  cols={13}
                  type="text"
                  className={`customFormControl h-100 w-100 customFocusClass ${
                    viewDetail || deleaserequestPK
                      ? ""
                      : reason && reason.length >= 1
                        ? "borderGreen"
                        : "borderRed"
                  } `}
                  id="reason"
                  name="reason"
                  value={reason}
                  disabled={viewDetail || deleaserequestPK}
                  onChange={(e) => {
                    setReason(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                  }}
                />
              </Col>
            </Form.Group>
            {/* Request Notes */}
            <Form.Group className="mt-2 row flex-column">
              <Col className="p-0 mb-2">
                <Form.Label className="col-form-label dealer-label">Request Notes</Form.Label>
              </Col>

              <Col xs={11} md={11} className="p-0 me-2">
                <textarea
                  rows={10}
                  cols={13}
                  type="text"
                  className={`customFormControl h-100 w-100 customFocusClass  `}
                  id="notes"
                  name="notes"
                  value={notes}
                  disabled={viewDetail}
                  onChange={(e) => {
                    setNotes(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DriverDeleaseRequestContent;
