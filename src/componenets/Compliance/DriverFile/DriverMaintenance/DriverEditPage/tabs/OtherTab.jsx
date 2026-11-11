import { formatForApi, parseLocalDate } from "../../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setDriverAlert,
  setDriverAlertClear,
  setIsOthersTabValid,
  setSaveFormData,
} from "../../../../../../redux/DriverMaintenanceSlice";
import UserLookup from "../../../../../LookupScreens/User/UserLookup";
import DriverService from "../../../../../../services/DriverService";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import { useParams } from "react-router-dom";
import Input from "../../../../../../components/common/input";
const OtherTab = () => {
  const params = useParams();
  const id = params.id;
  const [checkInUserFK, setcheckInUserFK] = useState("");
  const [checkInUserInput, setcheckInUserInput] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInDispatchFK, setCheckInDispatchFK] = useState("");
  const [checkInDispatchInput, setCheckInDispatchInput] = useState("");
  const [checkInDispatchDate, setCheckInDispatchDate] = useState("");
  const [yesterdayCheckInDispatchFK, setYesterdayCheckInDispatchFK] = useState("");
  const [yesterdayCheckInDispatchInput, setYesterdayCheckInDispatchInput] = useState("");
  const [yesterdayheckInDispatchDate, setYesterdayheckInDispatchDate] = useState("");
  const [alertDriver, setAlertDriver] = useState(false);
  const [alertDate, setAlertDate] = useState("");
  const [isAlertDateValidation, setIsAlertDateValidation] = useState(true);
  const [alertCleared, setAlertCleared] = useState(false);
  const [alertClearedDate, setAlertClearedDate] = useState("");
  const [isAlertClearedDateValidation, setIsAlertClearedDateValidation] = useState(true);
  const [alertInformation, setAlertInformation] = useState("");
  const [alertUserId, setAlertUserId] = useState(null);
  const [alertUserInput, setAlertUserInput] = useState("");
  const [alertUserData, setAlertUserData] = useState([]);
  const [alertUserLookUpShow, setAlertUserLookUpShow] = useState(false);
  const [alertClearedUserId, setAlertClearedUserId] = useState(null);
  const [alertClearedUserInput, setAlertClearedUserInput] = useState("");
  const [alertClearedUserData, setAlertClearedUserData] = useState([]);
  const [alertClearedUserLookUpShow, setAlertClearedUserLookUpShow] = useState(false);
  const [alertUserLoading, setAlertUserLoad] = useState(false);
  const [alertClearedUserLoading, setAlertClearedUserLoading] = useState(false);
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const displayFlag = useSelector((state) => state.driverMaintenanceReducer.displayFlag);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));

  /**
   * Fetch all Users
   * Used for  AlertUsers Autocomplete
   */
  const fetchAlertUsers = (string) => {
    setAlertUserLoad(true);
    let active = true;
    DriverService.getAllUserData(string, active)
      .then((response) => {
        const data = response.data.content;

        const userList = data?.map((user) => ({
          ...user,
          name: user.name?.trim(),
        }));
        setAlertUserData(userList);
        setAlertUserLoad(false);
      })
      .catch((err) => {
        setAlertUserLoad(false);
        console.log(err);
      });
  };

  const handlerAlertUserLookupSelection = (item) => {
    setAlertUserId(item.userPK);
    setAlertUserInput(item.name?.trim());
    setAlertUserLookUpShow(false);
  };
  const handlAlertUserLookup = () => {
    setAlertUserLookUpShow(true);
  };

  /**
   * Fetch all Users
   * Used for  AlertCleared Users Autocomplete
   */
  const fetchAlerClearedtUsers = (string) => {
    setAlertClearedUserLoading(true);
    let active = true;
    DriverService.getAllUserData(string, active)
      .then((response) => {
        const data = response.data.content;

        const userList = data?.map((user) => ({
          ...user,
          name: user.name?.trim(),
        }));
        setAlertClearedUserData(userList);
        setAlertClearedUserLoading(false);
      })
      .catch((err) => {
        setAlertClearedUserLoading(false);
        console.log(err);
      });
  };

  const handlerAlertClearedUserLookupSelection = (item) => {
    setAlertClearedUserId(item.userPK);
    setAlertClearedUserInput(item.name?.trim());
    setAlertClearedUserLookUpShow(false);
  };
  const handlAlertClearedUserLookup = () => {
    setAlertClearedUserLookUpShow(true);
  };

  const setOthersTabData = (formData, source) => {
    if (formData?.checkInUserFK) {
      setcheckInUserFK(formData?.checkInUserFK);
    }
    setCheckInDate(formData?.checkInDate || "");
    if (formData?.checkInDispatchFK) {
      setCheckInDispatchFK(formData?.checkInDispatchFK);
    }

    setCheckInDispatchDate(formData?.checkInDispatchDate || "");
    if (formData?.yesterdayCheckInDispatchFK) {
      setYesterdayCheckInDispatchFK(formData?.yesterdayCheckInDispatchFK);
    }

    setYesterdayheckInDispatchDate(formData?.yesterdayheckInDispatchDate || "");
    setAlertDriver(formData?.alertDriver || false);
    setAlertDate(formData?.alertDate || "");
    setAlertUserId(formData?.alertUserFK || null);
    setAlertCleared(formData?.alertCleared || false);
    setAlertClearedDate(formData?.alertClearedDate || "");
    setAlertClearedUserId(formData?.alertClearedUserFK || null);
    setAlertInformation(formData?.alertInformation?.trim() || "");
  };

  useEffect(() => {
    if (viewDetail && editFormData != null) {
      setOthersTabData(editFormData, "backend");
      setcheckInUserInput(editFormData?.driverFileData?.CheckInUserName);
      setCheckInDispatchInput(editFormData?.driverFileData?.CheckInDispatchName);
      setYesterdayCheckInDispatchInput(editFormData?.driverFileData?.YesterdayCheckInDispatchName);
      setAlertClearedUserInput(editFormData?.driverFileData?.AlertClearedUserName);
      setAlertUserInput(editFormData?.driverFileData?.AlertUserName);
    }
    if (!viewDetail && saveFormData !== null && displayFlag) {
      setOthersTabData(saveFormData, "frontend");
      setcheckInUserInput(saveFormData?.checkInUserInput);
      setCheckInDispatchInput(saveFormData?.checkInDispatchInput);
      setYesterdayCheckInDispatchInput(saveFormData?.yesterdayCheckInDispatchInput);
      setAlertClearedUserInput(saveFormData?.alertClearedUserInput);
      setAlertUserInput(saveFormData?.alertUserInput);
    }
  }, [editFormData, viewDetail, displayFlag]);

  const othersTabData = () => {
    dispatch(
      setSaveFormData({
        checkInDate: checkInDate,
        checkInDispatchFK: checkInDispatchFK,
        checkInUserFK: checkInUserFK,
        yesterdayCheckInDispatchFK: yesterdayCheckInDispatchFK,
        checkInDispatchDate: checkInDispatchDate,
        yesterdayheckInDispatchDate: yesterdayheckInDispatchDate,
        alertDriver: alertDriver,
        alertDate: alertDate ? addCurrentTimeToDate(alertDate) : null,
        alertUserFK: alertUserId,
        alertCleared: alertCleared,
        alertClearedDate: alertClearedDate ? addCurrentTimeToDate(alertClearedDate) : null,
        alertClearedUserFK: alertClearedUserId,
        alertInformation: alertInformation,
        checkInDispatchInput,
        checkInUserInput,
        yesterdayCheckInDispatchInput,
        alertClearedUserInput,
        alertUserInput,
      })
    );
  };

  useEffect(() => {
    othersTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkInDate,
    checkInDispatchDate,
    yesterdayheckInDispatchDate,
    alertDriver,
    alertDate,
    alertUserId,
    alertCleared,
    alertClearedDate,
    alertClearedUserId,
    alertInformation,
    checkInUserFK,
    checkInDispatchFK,
    yesterdayCheckInDispatchFK,
    checkInDispatchInput,
    checkInUserInput,
    yesterdayCheckInDispatchInput,
    alertClearedUserInput,
    alertUserInput,
  ]);

  useEffect(() => {
    dispatch(setDriverAlert(alertDriver));
    dispatch(setDriverAlertClear(alertCleared));
  }, [alertCleared, alertDriver]);

  /**
   * Used for Setting values when alertDriver=true
   */
  const handleAlertDriverOnCheck = () => {
    setAlertCleared(false);
    setAlertClearedUserId(null);
    setAlertClearedUserInput("");
    setAlertClearedDate("");
    setAlertUserId(null);
    setAlertUserInput("");
    setAlertDate(formatDatetimeToDate(new Date()));
    setAlertInformation("");
    if (!editFormData?.previousAlertDriver) {
      setAlertUserId(loggedInUser?.userPK);
      setAlertUserInput(loggedInUser?.name?.trim());
    }
  };
  /**
   * Used for Setting values when alertDriver=false
   */
  const handleAlertDriverOnUnCheck = () => {
    if (editFormData?.previousAlertDriver || editFormData?.previousAlertCleared) {
      setAlertCleared(true);
      setAlertClearedDate(editFormData?.alertClearedDate);
      setAlertClearedUserId(editFormData?.alertClearedUserFK || null);
      setAlertClearedUserInput(editFormData?.driverFileData?.AlertClearedUserName?.trim());
      setAlertDate(editFormData?.alertDate || "");
      setAlertUserId(editFormData?.alertUserFK || null);
      setAlertUserInput(editFormData?.driverFileData?.AlertUserName?.trim());
      setAlertInformation(editFormData?.alertInformation?.trim() || "");
    } else {
      setAlertUserId(null);
      setAlertUserInput("");
      setAlertDate("");
      setAlertInformation("");
    }
  };
  /**
   * Used for Setting values when alertCleared=true
   */
  const handlAlertClearOnCheck = () => {
    setAlertDriver(false);
    setAlertClearedDate(formatDatetimeToDate(new Date()));
    if (!editFormData?.previousAlertCleared) {
      setAlertClearedUserId(loggedInUser?.userPK);
      setAlertClearedUserInput(loggedInUser?.name?.trim());
    }
    if (editFormData?.previousAlertDriver || editFormData?.previousAlertCleared) {
      setAlertDate(editFormData?.alertDate || null);
      setAlertUserId(editFormData?.alertUserFK || null);
      setAlertUserInput(editFormData?.driverFileData?.AlertUserName?.trim());
      setAlertInformation(editFormData?.alertInformation?.trim() || null);
    }
  };
  /**
   * Used for Setting values when alertCleared=false
   */
  const handlAlertClearOnUnCheck = () => {
    setAlertDriver(true);
    setAlertClearedDate("");
    setAlertClearedUserId(null);
    setAlertClearedUserInput("");
  };

  /**
   * Tab Validation
   *
   */
  useEffect(() => {
    if (
      (!alertDriver ||
        (alertDriver &&
          alertDate &&
          alertUserId &&
          alertUserInput &&
          alertInformation &&
          isAlertDateValidation)) &&
      (!alertCleared ||
        (alertCleared &&
          alertClearedUserId &&
          alertClearedUserInput &&
          alertClearedDate &&
          isAlertClearedDateValidation))
    ) {
      dispatch(setIsOthersTabValid(true));
    } else {
      dispatch(setIsOthersTabValid(false));
    }
  }, [
    alertCleared,
    alertClearedDate,
    alertClearedUserId,
    alertClearedUserInput,
    alertDate,
    alertUserId,
    alertDriver,
    alertUserInput,
    alertInformation,
    isAlertClearedDateValidation,
    isAlertDateValidation,
  ]);

  /**
   * Append current time (HH:mm:ss) to a given date.
   * @param {string|Date|null} dateValue - Date string or Date object
   * @returns {string|null} DateTime string (YYYY-MM-DDTHH:mm:ss) or null if input is null
   */
  function addCurrentTimeToDate(dateValue) {
    if (!dateValue) return null;

    const uiDate = parseLocalDate(dateValue);
    const onlyDate = formatForApi(uiDate); // YYYY-MM-DD

    const now = new Date();
    const currentTime = now.toTimeString().split(" ")[0]; // HH:mm:ss

    return `${onlyDate}T${currentTime}`;
  }
  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Checkin User</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={checkInUserInput}
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Checkin Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={checkInDate} setDate={setCheckInDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Checkin Dispatch</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={checkInDispatchInput}
                maxLength={30}

                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Checkin Dispatch Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={checkInDispatchDate} setDate={setCheckInDispatchDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Yesterday Checkin Dispatch</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={yesterdayCheckInDispatchInput}
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Yesterday Checkin Dispatch Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={yesterdayheckInDispatchDate}
                setDate={setYesterdayheckInDispatchDate}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>

        <Col sm={6} md={6} xs={6} className="ps-lg-1">
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Alert Driver</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={alertDriver}
                checked={alertDriver}
                disabled={viewDetail || (editFormData?.previousAlertDriver && !alertCleared)}
                onChange={(e) => {
                  const value = e.target.checked;
                  setAlertDriver(value);

                  if (value) {
                    handleAlertDriverOnCheck();
                  } else {
                    handleAlertDriverOnUnCheck();
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Alert Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={alertDate}
                setIsDateValid={setIsAlertDateValidation}
                setDate={setAlertDate}
                disabled={
                  viewDetail ||
                  !alertDriver ||
                  alertCleared ||
                  (editFormData?.previousAlertDriver &&
                    alertDriver &&
                    alertInformation &&
                    alertUserId &&
                    alertUserInput)
                }
                className={`customFormControl ${
                  viewDetail ||
                  !alertDriver ||
                  (alertDriver &&
                    alertInformation &&
                    alertUserId &&
                    alertUserInput &&
                    id &&
                    isAlertDateValidation)
                    ? ""
                    : alertDriver && alertDate && isAlertDateValidation
                      ? "borderGreen"
                      : "borderRed"
                } `}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Alert User</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                arrayList={alertUserData}
                searchString={alertUserInput}
                renderItemId={(item) => item.userPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => setAlertUserInput(string)}
                fetchDataBySearchString={fetchAlertUsers}
                onSelect={handlerAlertUserLookupSelection}
                clearInputCallback={() => {
                  setAlertUserId(null);
                }}
                loading={alertUserLoading}
                selectedId={alertUserId}
                className={`customFormControl ${
                  viewDetail ||
                  !alertDriver ||
                  (alertDriver && alertInformation && alertUserId && alertUserInput && id)
                    ? ""
                    : alertDriver && alertUserInput && alertUserId
                      ? "borderGreen"
                      : "borderRed"
                } `}
                disabled={
                  viewDetail ||
                  !alertDriver ||
                  (editFormData?.previousAlertDriver &&
                    alertDriver &&
                    alertInformation &&
                    alertUserId &&
                    alertUserInput)
                }
              />
              <LookupButton
                onClick={handlAlertUserLookup}
                disabled={
                  viewDetail ||
                  !alertDriver ||
                  (editFormData?.previousAlertDriver &&
                    alertDriver &&
                    alertInformation &&
                    alertUserId &&
                    alertUserInput)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Alert Cleared</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={alertCleared}
                checked={alertCleared}
                disabled={
                  viewDetail ||
                  (!editFormData?.previousAlertDriver && !editFormData?.previousAlertCleared) ||
                  editFormData?.previousAlertCleared
                }
                onChange={(e) => {
                  const value = e.target.checked;

                  setAlertCleared(value);
                  if (value) {
                    handlAlertClearOnCheck();
                  } else {
                    handlAlertClearOnUnCheck();
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Alert Cleared Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={alertClearedDate}
                setDate={setAlertClearedDate}
                setIsDateValid={setIsAlertClearedDateValidation}
                disabled={viewDetail || !alertCleared || editFormData?.previousAlertCleared}
                className={`customFormControl ${
                  viewDetail || !alertCleared || editFormData?.previousAlertCleared
                    ? ""
                    : alertCleared && alertClearedDate && isAlertClearedDateValidation
                      ? "borderGreen"
                      : "borderRed"
                } `}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Alert Cleared User</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                arrayList={alertClearedUserData}
                searchString={alertClearedUserInput}
                renderItemId={(item) => item.userPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => setAlertClearedUserInput(string)}
                fetchDataBySearchString={fetchAlerClearedtUsers}
                onSelect={handlerAlertClearedUserLookupSelection}
                clearInputCallback={() => {
                  setAlertClearedUserId(null);
                }}
                loading={alertClearedUserLoading}
                selectedId={alertClearedUserId}
                className={`customFormControl ${
                  viewDetail || !alertCleared || editFormData?.previousAlertCleared
                    ? ""
                    : alertCleared && alertClearedUserId && alertClearedUserInput
                      ? "borderGreen"
                      : "borderRed"
                } `}
                disabled={viewDetail || !alertCleared || editFormData?.previousAlertCleared}
              />
              <LookupButton onClick={handlAlertClearedUserLookup} disabled={viewDetail || !alertCleared} />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <label className="col-form-label dealer-label p-0 m-b-20">Alert Information</label>
            </Col>

            <Col sm={10} md={10} className="p-0">
              <textarea
                rows={10}
                cols={20}
                type="text"
                name="notes"
                value={alertInformation}
                disabled={viewDetail || alertCleared || !alertDriver}
                onInput={(e) => {
                  setAlertInformation(e.target.value);
                }}
                className={`customFormControl h-100 ${
                  viewDetail || !alertDriver
                    ? ""
                    : alertDriver && alertInformation
                      ? "borderGreen"
                      : "borderRed"
                } `}
                autoComplete="newpassword"
                aria-autocomplete="none"
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <UserLookup
        show={alertUserLookUpShow}
        onHide={() => setAlertUserLookUpShow(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handlerAlertUserLookupSelection}
        MaintenanceProgram
      />
      <UserLookup
        show={alertClearedUserLookUpShow}
        onHide={() => setAlertClearedUserLookUpShow(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handlerAlertClearedUserLookupSelection}
        MaintenanceProgram
      />
    </div>
  );
};

export default OtherTab;
