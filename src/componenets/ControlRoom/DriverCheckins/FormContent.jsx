import { parseLocalDate } from "../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import styles from "../../../styles/QuarterScreen.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DriverCheckinService from "../../../services/DriverCheckinService";
import {
  setDeliveryCity,
  setDeliveryName,
  setDeliveryState,
  setDriverId,
  setEpuDate,
  setEpuScreen,
  setEtaDate,
  setEtaScreen,
  setFormData,
  setModel,
  setNotes,
  setPickupCity,
  setPickupName,
  setPickupState,
  setPosition,
  setRow,
  setSpecialCode,
  setUnitNumber,
  setUnitType,
  setYard,
  setCurrentLocationCity,
  setCurrentLocationStateCode,
  setCityStateCheck,
  setSisterDispatchFK,
  setUnitId,
  setWithoutunit,
  setIsCityState,
  setFirstName,
  setLastName,
  setCityStateComination,
  setCityToYardShuttlePopup,
  setPickupAddress1,
  setPickupAddress2,
  setPickupPostalCode,
  setPickupPhone,
  setDeliveryAddress1,
  setDeliveryAddress2,
  setDeliveryPostalCode,
  setDeliveryPhone,
  setCurrentLocationPostalCode,
  setAdvanceAmount,
  setMasterUser,
  setCheckinDate,
  setCheckinTime,
  setCheckinDateValid,
} from "../../../redux/DriverCheckinSlice";
import {
  CHECKIN_DATE_FORMAT,
  CHECKIN_TIME_FORMAT,
  combineCheckinDateTime,
  getCurrentCheckinDateTime,
  getMinCheckinMoment,
  validateCheckinDateTime,
} from "./checkinDateTimeUtils";
import formatDatetimeToDate from "../../../utils/formatDateTimeToDate";
import DriverCheckinsTableListing from "./DriverCheckinsTableListing";
import LoadingIcon from "../../common/LoadingIcon";
import PostalCodeComponent from "../../common/PostalCodeComponent";
import DateInputField from "../../common/DateInputField";
import { usePermission } from "../../../hooks/usePermission";
import { PROGRAMS } from "../../../constants/permissionConstants";

function FormContent(loading) {
  const { driverId, unitId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fromServiceCheckin = localStorage.getItem("fromServiceCheckin") === "true";
  const driverIdFromService = localStorage.getItem("driverId");

  const { checkPermission } = usePermission();

  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [maximumPickupDate, setMaximumPickupDate] = useState("");
  const [minimumPickupDate, setMinimumPickupDate] = useState("");
  const [holidays, setHolidays] = useState([]); //disabling holidays in calender
  const [dealerOpenDays, setDealerOpenDays] = useState([]);
  const [minimumDeliveyDate, setMinimumDeliveryDate] = useState("");
  const [maximumDeliveyDate, setMaximumDeliveryDate] = useState("");
  const [etaHavePermission, setEtaHavePermission] = useState(false);
  const [showEpuPermissionPopup, setShowEpuPermissionPopup] = useState(false);
  const [showEtaPermissionPopup, setShowEtaPermissionPopup] = useState(false);
  const [epuHavePermission, setEpuHavePermission] = useState(false);
  const [overRideEpu, setOverRideEpu] = useState(false);
  const [overrideCode, setOverrideCode] = useState("");
  const [notOverridedEpu, setNotOverridedEpu] = useState(false);
  const [isoverrideExist, setIsOverrideExist] = useState(false);
  const [isUsStateTrue, setIsStateTrue] = useState(false);
  const [currentLocationPostalOptions, setCurrentLocationPostalOptions] = useState([]);
  const [overRideLoader, setOverRideLoader] = useState(false);

  const unitNumber = useSelector((state) => state.driverCheckinReducer.unitNumber);
  const model = useSelector((state) => state.driverCheckinReducer.model);
  const unitType = useSelector((state) => state.driverCheckinReducer.unitType);
  const specialCode = useSelector((state) => state.driverCheckinReducer.specialCode);
  const yard = useSelector((state) => state.driverCheckinReducer.yard);
  const row = useSelector((state) => state.driverCheckinReducer.row);
  const position = useSelector((state) => state.driverCheckinReducer.position);
  const pickupName = useSelector((state) => state.driverCheckinReducer.pickupName);
  const pickupCity = useSelector((state) => state.driverCheckinReducer.pickupCity);
  const pickupState = useSelector((state) => state.driverCheckinReducer.pickupState);
  const deliveryName = useSelector((state) => state.driverCheckinReducer.deliveryName);
  const deliveryCity = useSelector((state) => state.driverCheckinReducer.deliveryCity);
  const deliveryState = useSelector((state) => state.driverCheckinReducer.deliveryState);
  const epuDate = useSelector((state) => state.driverCheckinReducer.epuDate);
  const etaDate = useSelector((state) => state.driverCheckinReducer.etaDate);
  const formData = useSelector((state) => state.driverCheckinReducer.formData);
  const notes = useSelector((state) => state.driverCheckinReducer.notes);
  const epuScreen = useSelector((state) => state.driverCheckinReducer.epuScreen);
  const etaScreen = useSelector((state) => state.driverCheckinReducer.etaScreen);
  const isCityState = useSelector((state) => state.driverCheckinReducer.isCityState);
  const currentLocationCity = useSelector((state) => state.driverCheckinReducer.currentLocationCity);
  const currentLocationStateCode = useSelector(
    (state) => state.driverCheckinReducer.currentLocationStateCode
  );
  const currentLocationPostalCode = useSelector(
    (state) => state.driverCheckinReducer.currentLocationPostalCode
  );
  const companyName = useSelector((state) => state.driverCheckinReducer.companyName);
  const checkinAdv = useSelector((state) => state.driverCheckinReducer.checkinAdv);
  const companyFK = useSelector((state) => state.driverCheckinReducer.companyFK);
  const cityStateComination = useSelector((state) => state.driverCheckinReducer.cityStateComination);
  const cityToYardShuttlePopup = useSelector((state) => state.driverCheckinReducer.cityToYardShuttlePopup);
  const viewDetail = useSelector((state) => state.driverCheckinReducer.viewDetail);
  const advanceAmount = useSelector((state) => state.driverCheckinReducer.advanceAmount);
  const dispatchId = useSelector((state) => state.driverCheckinReducer.dispatchId);
  const checkinDate = useSelector((state) => state.driverCheckinReducer.checkinDate);
  const checkinTime = useSelector((state) => state.driverCheckinReducer.checkinTime);
  const checkinDateValid = useSelector((state) => state.driverCheckinReducer.checkinDateValid);
  const lastCheckinEntryDate = useSelector((state) => state.driverCheckinReducer.lastCheckinEntryDate);

  const { pathname, key: locationKey } = useLocation();

  // EPU/ETA is opened from the unit detail page, so declining the override goes back there;
  // fall back to unit selection when the page was opened directly (no history entry)
  const returnToUnitDetail = () => {
    if (locationKey !== "default") {
      navigate(-1);
    } else {
      navigate(`/unit-selection/${fromServiceCheckin ? driverIdFromService : driverId}`);
    }
  };

  const resetEpuEtaDates = () => {
    dispatch(setEpuDate(formData?.epu != null ? formatDatetimeToDate(formData?.epu) : ""));
    dispatch(setEtaDate(formData?.eta != null ? formatDatetimeToDate(formData?.eta) : ""));
  };
  // current time, refreshed at every minute so the max checkin date/time keeps up with the clock
  const [now, setNow] = useState(() => new Date());
  const showCheckinDateTime = !epuScreen && !etaScreen;
  const minCheckin = getMinCheckinMoment(lastCheckinEntryDate);
  const checkinError = checkinDateValid
    ? validateCheckinDateTime(checkinDate, checkinTime, lastCheckinEntryDate)
    : "Please enter a valid Checkin date";

  useEffect(() => {
    if (!unitId)
      if (fromServiceCheckin) {
        navigate(`/driver-service-selection/${driverIdFromService}/form`);
      } else {
        navigate(`/driver-selection`);
      }
  }, []);

  const setCurrentLocationValid = (isValid) => {
    setIsStateTrue(isValid);
    dispatch(setCityStateCheck(!!isValid));
  };

  const fetchCurrentLocationOptions = (cityValue, stateValue) =>
    DriverCheckinService.checkCityStateCode(cityValue?.trim(), stateValue).then((response) => ({
      ...response,
      data: (response.data || []).map((item) => ({
        city: item.city ?? item.City,
        stateCode: item.stateCode ?? item.StateCode,
        postalCode: item.postalCode ?? item.PostalCode,
        canadian: item.canadian ?? item.Canadian,
        postalCodePK: item.postalCodePK ?? item.PostalCodePK,
      })),
    }));

  const advanceAmountCalculation = (dispatchId, driverId) => {
    if (dispatchId && driverId) {
      DriverCheckinService.getAdvanceAmount(dispatchId, driverId)
        .then((res) => {
          dispatch(setAdvanceAmount(res?.data?.[0]?.AdvanceAmount ?? 0));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const checkOverrideCode = () => {
    setOverRideLoader(true);
    return DriverCheckinService.checkOverride(overrideCode)
      .then((res) => {
        setIsOverrideExist(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
      .finally(() => {
        setOverRideLoader(false);
      });
  };

  const fetchHolidayDatas = () => {
    DriverCheckinService.getHolidayData()
      .then((response) => {
        const { data } = response;

        const holidays = data.content?.map((holiday) => {
          const raw = parseLocalDate(formatDatetimeToDate(holiday.date));
          const midnight = new Date(raw.getFullYear(), raw.getMonth(), raw.getDate(), 0, 0, 0, 0);
          return midnight;
        });

        setHolidays(holidays);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (formData?.pickupDealerFK != null) {
      setDealerOpenDays(true);
    }
    if (formData?.tempEpuPermission) {
      setEpuHavePermission(true);
    }
    if (formData?.tempEtaPermission) {
      setEtaHavePermission(true);
    }
  }, [unitId]);

  useEffect(() => {
    advanceAmountCalculation(dispatchId, driverId);
  }, [dispatchId]);

  useEffect(() => {
    if (formData != null) {
      dispatch(setUnitNumber(formData?.unitNumber || ""));
      dispatch(setModel(formData?.model || ""));
      dispatch(setUnitType(formData?.unitTypedes || ""));
      dispatch(setSpecialCode(formData?.specialCodeDes || ""));
      dispatch(setYard(formData?.pickupYard || ""));
      dispatch(setRow(formData?.row || ""));
      dispatch(setPosition(formData?.position || ""));
      dispatch(setPickupName(formData?.pickupName || ""));
      dispatch(setPickupCity(formData?.pickupCity || ""));
      dispatch(setPickupState(formData?.pickupState || ""));
      dispatch(setEpuDate(formData?.epu != null ? formatDatetimeToDate(formData?.epu) : ""));
      dispatch(setDeliveryName(formData?.deliveryName || ""));
      dispatch(setDeliveryCity(formData?.deliveryCity || ""));
      dispatch(setDeliveryState(formData?.deliveryState || ""));
      dispatch(setEtaDate(formData?.eta != null ? formatDatetimeToDate(formData?.eta) : ""));
      setMaximumPickupDate(
        formData?.maximumPickupDate != null ? formatDatetimeToDate(formData?.maximumPickupDate) : ""
      );
      setMinimumPickupDate(
        formData?.minimumPickupDate != null ? formatDatetimeToDate(formData?.minimumPickupDate) : ""
      );
      setMinimumDeliveryDate(
        formData?.minimumDeliveyDate != null ? formatDatetimeToDate(formData?.minimumDeliveyDate) : ""
      );
      setMaximumDeliveryDate(
        formData?.maximumDeliveryDate != null ? formatDatetimeToDate(formData?.maximumDeliveryDate) : ""
      );
      setDriverFirstName(formData?.firstName || "");
      setDriverLastName(formData?.lastName || "");
      dispatch(setCityStateComination(formData?.cityYardCombination));
      dispatch(setPickupAddress1(formData?.pickupAddress1?.trim()));
      dispatch(setPickupAddress2(formData?.pickupAddress2?.trim()));
      dispatch(setPickupPostalCode(formData?.pickupPostalCode?.trim()));
      dispatch(setPickupPhone(formData?.pickupPhone?.trim()));
      dispatch(setDeliveryAddress1(formData?.deliveryAddress1?.trim()));
      dispatch(setDeliveryAddress2(formData?.deliveryAddress2?.trim()));
      dispatch(setDeliveryPostalCode(formData?.deliveryPostalCode?.trim()));
      dispatch(setDeliveryPhone(formData?.deliveryPhone?.trim()));
      dispatch(setMasterUser(formData?.masterUser));
    }
  }, [formData]);

  // Unit details (getDriverCheckinDataId) are fetched by FormFooter, which also
  // sets dispatchId and shows the loader; fetching here too duplicated the call.

  useEffect(() => {
    if (!companyFK && !companyName)
      if (fromServiceCheckin) {
        navigate(`/unit-selection/${driverIdFromService}`);
      } else {
        navigate(`/driver-selection`);
      }
  }, []);
  useEffect(() => {
    fetchHolidayDatas();
  }, [unitId]);

  // Checkin date/time defaults to the current date and time on every checkin screen
  useEffect(() => {
    const { date, time } = getCurrentCheckinDateTime();
    dispatch(setCheckinDate(date));
    dispatch(setCheckinTime(time));
    dispatch(setCheckinDateValid(true));
  }, [unitId, pathname]);

  // tick on the minute boundary first, then every minute
  useEffect(() => {
    let intervalId;
    const timeoutId = setTimeout(
      () => {
        setNow(new Date());
        intervalId = setInterval(() => setNow(new Date()), 60000);
      },
      60000 - (Date.now() % 60000)
    );
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  // lastCheckinEntryDate (earliest allowed checkin date/time) is set by
  // DriverCheckinsTableListing from its getAllRecordByDispatchFK response

  // DateInputField gives the date as "YYYY-MM-DD" ("" when cleared)
  const handleCheckinDateChange = (date) => {
    if (!date) {
      dispatch(setCheckinDate(""));
      return;
    }
    const newDate = moment(parseLocalDate(date)).format(CHECKIN_DATE_FORMAT);
    dispatch(setCheckinDate(newDate));

    // keep the time inside the allowed range of the newly selected date
    if (checkinTime) {
      const selected = combineCheckinDateTime(newDate, checkinTime);
      if (selected.isAfter(moment())) {
        dispatch(setCheckinTime(moment().format(CHECKIN_TIME_FORMAT)));
      } else if (minCheckin && selected.isBefore(minCheckin)) {
        dispatch(setCheckinTime(minCheckin.format(CHECKIN_TIME_FORMAT)));
      }
    }
  };

  const getCheckinTimeBounds = () => {
    const current = moment(now);
    const day = checkinDate ? moment(checkinDate, CHECKIN_DATE_FORMAT) : current.clone();
    const minTime =
      minCheckin && day.isSame(minCheckin, "day") ? minCheckin.clone() : day.clone().startOf("day");
    const maxTime = day.isSame(current, "day") ? current : day.clone().endOf("day");
    return { minTime: minTime.toDate(), maxTime: maxTime.toDate() };
  };

  const renderCheckinDateTime = () => {
    const { minTime, maxTime } = getCheckinTimeBounds();
    return (
      <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
        <Col xs={3} sm={3} md={3} className="p-0">
          <Form.Label className="col-form-label dealer-label m-l-0">Checkin</Form.Label>
        </Col>
        <Col xs={2} md={2} lg={2} sm={2} className="p-0 w-95px" title={checkinError}>
          <DateInputField
            id="checkinDate"
            name="checkinDate"
            date={checkinDate}
            setDate={handleCheckinDateChange}
            setIsDateValid={(isValid) => dispatch(setCheckinDateValid(isValid))}
            min={minCheckin ? minCheckin.clone().startOf("day").toDate() : undefined}
            max={now}
            className={checkinError ? "borderRed" : ""}
            disabled={viewDetail}
          />
        </Col>
        <Col xs={2} md={2} lg={2} sm={2} className="p-0" style={{ marginLeft: "10px" }} title={checkinError}>
          <ReactDatePicker
            className={`customFormControl ${checkinError ? "borderRed" : ""}`}
            id="checkinTime"
            name="checkinTime"
            placeholderText="HH:mm"
            selected={checkinTime ? moment(checkinTime, CHECKIN_TIME_FORMAT).toDate() : null}
            onChange={(time) =>
              dispatch(setCheckinTime(time ? moment(time).format(CHECKIN_TIME_FORMAT) : ""))
            }
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={1}
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            timeCaption="Time"
            minTime={minTime}
            maxTime={maxTime}
            injectTimes={[minTime, maxTime]}
            // render the dropdown at body level so the listing table's sticky header doesn't cover it
            portalId="driver-checkin-time-portal"
            autoComplete="off"
            disabled={viewDetail}
          />
        </Col>
      </Form.Group>
    );
  };

  return (
    <div className="p-2  ">
      {overRideLoader && <LoadingIcon />}
      <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight" style={{ height: "601px" }}>
        <Form>
          <div className="p-15 w-100 ">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                      Driver
                    </Form.Label>
                  </Col>
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <input
                      className={"customFormControl"}
                      id="driver"
                      name="driver"
                      type="text"
                      maxLength={50}
                      value={driverFirstName?.trim() + " " + driverLastName?.trim()}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setDriverFirstName(e.target.value));
                      }}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                      Unit Number
                    </Form.Label>
                  </Col>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <input
                      className={"customFormControl"}
                      id="unitNumber"
                      name="unitNumber"
                      type="text"
                      maxLength={21}
                      value={unitNumber}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setUnitNumber(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                      Model
                    </Form.Label>
                  </Col>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <input
                      className={"customFormControl"}
                      id="model"
                      name="model"
                      type="text"
                      maxLength={50}
                      value={model}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setModel(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                      Unit Type
                    </Form.Label>
                  </Col>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <input
                      className={"customFormControl"}
                      id="unitType"
                      name="unitType"
                      type="text"
                      maxLength={50}
                      value={unitType}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setUnitType(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                      Special Code
                    </Form.Label>
                  </Col>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <input
                      className={"customFormControl"}
                      id="specialCode"
                      name="specialCode"
                      type="text"
                      maxLength={50}
                      value={specialCode}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setSpecialCode(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                      Yard
                    </Form.Label>
                  </Col>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <input
                      className={"customFormControl"}
                      id="yard"
                      name="yard"
                      type="text"
                      maxLength={50}
                      value={yard}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setYard(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                      Row/Position
                    </Form.Label>
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <input
                      className={"customFormControl"}
                      id="rowPosition"
                      name="rowPosition"
                      type="text"
                      maxLength={50}
                      value={row}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setRow(e.target.value));
                      }}
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-0" style={{ marginLeft: "30px" }}>
                    <input
                      className={"customFormControl"}
                      id="rowPosition"
                      name="rowPosition"
                      type="text"
                      maxLength={50}
                      value={position}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setPosition(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                {(isCityState || checkinAdv) && (
                  <PostalCodeComponent
                    hideZip
                    label="Current Location"
                    disabled={viewDetail || formData?.pickupScreen || formData?.yardExitScreen}
                    labelColNumber={3}
                    cityColNumber={5}
                    stateColNumber={1}
                    city={
                      formData?.pickupScreen || formData?.yardExitScreen ? pickupCity : currentLocationCity
                    }
                    setCity={(value) => dispatch(setCurrentLocationCity(value))}
                    stateCode={
                      formData?.pickupScreen || formData?.yardExitScreen
                        ? pickupState
                        : currentLocationStateCode
                    }
                    setStateCode={(value) => dispatch(setCurrentLocationStateCode(value))}
                    postalCode={currentLocationPostalCode}
                    setPostalCode={(value) => dispatch(setCurrentLocationPostalCode(value))}
                    postalCodePK={isUsStateTrue}
                    setPostalCodePK={setCurrentLocationValid}
                    postalOptions={currentLocationPostalOptions}
                    setPostalValues={setCurrentLocationPostalOptions}
                    setCanadian={() => {}}
                    fetchPostalOptions={fetchCurrentLocationOptions}
                    className="driverCheckinCurrentLocationPostalCode"
                  />
                )}

                {(isCityState || checkinAdv) && showCheckinDateTime && renderCheckinDateTime()}

                {checkinAdv ? (
                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                        Advance Amount
                      </Form.Label>
                    </Col>
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <input
                        className={"customFormControl"}
                        id="advanceAmount"
                        name="advanceAmount"
                        type="text"
                        maxLength={10}
                        value={advanceAmount}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          dispatch(setAdvanceAmount(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                ) : (
                  ""
                )}
              </Col>
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} sm={3} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Pickup</Form.Label>
                  </Col>
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="pickup"
                      name="pickup"
                      value={pickupName}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setPickupName(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} sm={3} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="pickup"
                      name="pickup"
                      value={pickupCity}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setPickupCity(e.target.value));
                      }}
                    />
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 d-flex" style={{ marginLeft: "10px" }}>
                    <input
                      type="text"
                      style={{ width: "30px" }}
                      className="customFormControl ml-2"
                      id="pickup"
                      name="pickup"
                      value={pickupState}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setPickupState(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">EPU</Form.Label>
                  </Col>

                  <Col xs={2} md={2} lg={2} sm={2} className="p-0">
                    <ReactDatePicker
                      className="customFormControl"
                      selected={epuDate ? parseLocalDate(epuDate) : epuDate}
                      onChange={(date) => {
                        if (maximumPickupDate && parseLocalDate(maximumPickupDate) < new Date()) {
                          date = new Date();
                        }

                        const adjustedDate = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                          12,
                          0,
                          0,
                          0
                        );

                        dispatch(setEpuDate(adjustedDate));

                        if (
                          (minimumPickupDate && date > parseLocalDate(minimumPickupDate)) ||
                          (maximumPickupDate && date < parseLocalDate(maximumPickupDate))
                        ) {
                          setShowEpuPermissionPopup(false);
                        } else {
                          setShowEpuPermissionPopup(true);
                        }
                      }}
                      onFocus={(e) => {
                        setOverRideEpu(false);
                        setOverrideCode("");
                        setIsOverrideExist(false);
                        setOverrideCode(false);
                        setNotOverridedEpu(false);
                      }}
                      dateFormat="MM/dd/yy"
                      excludeDates={holidays}
                      minDate={
                        minimumPickupDate
                          ? new Date(
                              new Date(Math.max(parseLocalDate(minimumPickupDate), new Date())).getFullYear(),
                              new Date(Math.max(parseLocalDate(minimumPickupDate), new Date())).getMonth(),
                              new Date(Math.max(parseLocalDate(minimumPickupDate), new Date())).getDate(),
                              12,
                              0,
                              0,
                              0
                            )
                          : new Date()
                      }
                      maxDate={parseLocalDate(minimumDeliveyDate)}
                      filterDate={(date) => {
                        let pickupDays = date.getDay();
                        switch (pickupDays) {
                          case 0:
                            return formData?.openSunday || formData?.sundayPickup;
                          case 1:
                            return formData?.openMonday || formData?.mondayPickup;
                          case 2:
                            return formData?.openTuesday || formData?.tuesdayPickup;
                          case 3:
                            return formData?.openWednesday || formData?.wednesdayPickup;
                          case 4:
                            return formData?.openThursday || formData?.thursdayPickup;
                          case 5:
                            return formData?.openFriday || formData?.fridayPickup;
                          case 6:
                            return formData?.openSaturday || formData?.saturdayPickup;
                          default:
                            return false;
                        }
                      }}
                      // disabled={!epuScreen && !showEpuPermissionPopup}
                      disabled={
                        (!epuScreen && !showEpuPermissionPopup) ||
                        !checkPermission(PROGRAMS.DRIVER_CHECKIN_EPU, "EDIT")
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} sm={3} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Delivery</Form.Label>
                  </Col>
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="delivery"
                      name="delivery"
                      value={deliveryName}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setDeliveryName(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} sm={3} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="delivery"
                      name="delivery"
                      value={deliveryCity}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setDeliveryCity(e.target.value));
                      }}
                    />
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 d-flex" style={{ marginLeft: "10px" }}>
                    <input
                      type="text"
                      className="customFormControl ml-2"
                      id="delivery"
                      style={{ width: "30px" }}
                      name="delivery"
                      value={deliveryState}
                      maxLength={30}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setDeliveryState(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">ETA</Form.Label>
                  </Col>

                  <Col xs={2} md={2} lg={2} sm={2} className="p-0">
                    <ReactDatePicker
                      className="customFormControl"
                      selected={etaDate ? parseLocalDate(etaDate) : etaDate}
                      onChange={(date) => {
                        if (maximumDeliveyDate && parseLocalDate(maximumDeliveyDate) < new Date()) {
                          date = new Date();
                        }

                        const adjustedDate = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                          12,
                          0,
                          0,
                          0
                        );

                        dispatch(setEtaDate(adjustedDate));

                        if (
                          maximumDeliveyDate &&
                          minimumDeliveyDate &&
                          date > parseLocalDate(minimumDeliveyDate) &&
                          date < parseLocalDate(maximumDeliveyDate)
                        ) {
                          setShowEtaPermissionPopup(false);
                        } else {
                          setShowEtaPermissionPopup(true);
                        }
                      }}
                      dateFormat="MM/dd/yy"
                      timeIntervals={15}
                      excludeDates={holidays}
                      minDate={
                        epuDate > minimumDeliveyDate
                          ? parseLocalDate(epuDate)
                          : parseLocalDate(minimumDeliveyDate)
                      }
                      maxDate={
                        maximumDeliveyDate && parseLocalDate(maximumDeliveyDate) <= new Date()
                          ? undefined
                          : undefined
                      }
                      onFocus={(e) => {
                        setOverRideEpu(false);
                        setOverrideCode("");
                        setIsOverrideExist(false);
                        setOverrideCode(false);
                        setNotOverridedEpu(false);
                      }}
                      filterDate={(date) => {
                        const deliveryDays = date.getDay();
                        switch (deliveryDays) {
                          case 0:
                            return formData?.sundayDelivery || formData?.openSunday;
                          case 1:
                            return formData?.mondayDelivery || formData?.openMonday;
                          case 2:
                            return formData?.tuesdayDelivery || formData?.openTuesday;
                          case 3:
                            return formData?.wednesdayDelivery || formData?.openWednesday;
                          case 4:
                            return formData?.thursdayDelivery || formData?.openThursday;
                          case 5:
                            return formData?.fridayDelivery || formData?.openFriday;
                          case 6:
                            return formData?.saturdayDelivery || formData?.openSaturday;
                          default:
                            return false;
                        }
                      }}
                      disabled={
                        (!etaScreen && !showEtaPermissionPopup) ||
                        !checkPermission(PROGRAMS.DRIVER_CHECKIN_ETA, "EDIT")
                      }
                    />
                  </Col>
                </Form.Group>
                {!isCityState && !checkinAdv && showCheckinDateTime && renderCheckinDateTime()}
                {epuScreen || etaScreen ? (
                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col xs={3} sm={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label" style={{ height: "200px" }}>
                        Reason
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} lg={2} sm={2} className="p-0">
                      <textarea
                        rows={10}
                        cols={20}
                        type="text"
                        className={"customFormControl"}
                        id="notes"
                        name="notes"
                        value={notes}
                        style={{
                          resize: "none",
                          display: "fixed",
                          minHeight: "190px",
                          minWidth: "450px",
                          boxShadow: "none",
                          fontSize: "12px",
                        }}
                        onInput={(e) => {
                          dispatch(setNotes(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            {!epuScreen && !etaScreen && !isCityState && !checkinAdv ? (
              <div className="  p-15" style={{ Height: "200px" }}>
                <div className="d-flex border border-1 border-dark">
                  <div className="flex-grow-1">
                    <DriverCheckinsTableListing loader={loading} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </Form>
        <Modal
          show={showEpuPermissionPopup}
          onHide={() => {
            setShowEpuPermissionPopup(false);
            dispatch(setEpuScreen(true));
            setNotOverridedEpu(true);
            setOverRideEpu(false);
            setOverrideCode("");
            resetEpuEtaDates();
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">
              {!epuHavePermission && overRideEpu && !notOverridedEpu ? "Override! " : "Override! "}
            </Modal.Title>
          </Modal.Header>
          {epuHavePermission && (
            <Modal.Body className="font-14 h-100">
              {`This date is outside the pickup window, Do you want to change the date?`}
            </Modal.Body>
          )}
          {!epuHavePermission && !overRideEpu && (
            <Modal.Body className="font-14 h-100">
              {`This date is outside the pickup window, Do you want to Override the date?`}
            </Modal.Body>
          )}
          {!epuHavePermission && overRideEpu && !isoverrideExist && notOverridedEpu && (
            <Modal.Body
              style={{ color: "red" }}
              className="font-14 h-100 "
            >{`Invalid Override Code. Do you want to try again `}</Modal.Body>
          )}
          {!epuHavePermission && overRideEpu && !notOverridedEpu && (
            <Modal.Body className="font-14 h-100">
              <Form.Group
                className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col xs={3} sm={3} md={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Override Code</Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className="customFormControl"
                    id="overideCode"
                    name="overideCode"
                    aria-autocomplete="list"
                    type="password"
                    autoComplete="one-time-code"
                    spellCheck={false}
                    value={overrideCode}
                    maxLength={30}
                    onInput={(e) => {
                      setOverrideCode(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
            </Modal.Body>
          )}
          <Modal.Footer>
            {epuHavePermission && (
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setEpuScreen(true));
                  setShowEpuPermissionPopup(false);
                  setOverRideEpu(false);
                  setOverrideCode("");
                }}
              >
                Yes
              </Button>
            )}

            {!epuHavePermission && !overRideEpu && !isoverrideExist && (
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setEpuScreen(true));
                  setShowEpuPermissionPopup(true);
                  setOverRideEpu(true);
                  setOverrideCode("");
                  if (epuHavePermission) {
                    setShowEpuPermissionPopup(false);
                  }
                }}
              >
                Yes
              </Button>
            )}
            {!epuHavePermission && overRideEpu && !isoverrideExist && notOverridedEpu && (
              <Button
                variant="primary"
                onClick={() => {
                  setOverrideCode("");
                  setIsOverrideExist(false);
                  setNotOverridedEpu(false);
                }}
              >
                Yes
              </Button>
            )}
            {!epuHavePermission && overRideEpu && !notOverridedEpu && (
              <Button
                variant="primary"
                onClick={() => {
                  checkOverrideCode().then((exists) => {
                    if (!exists) {
                      setShowEpuPermissionPopup(true);
                      setNotOverridedEpu(true);
                    } else {
                      setEpuHavePermission(false);
                      setShowEpuPermissionPopup(false);
                      setOverRideEpu(false);
                      setOverrideCode("");
                      setIsOverrideExist(false);
                      setNotOverridedEpu(false);
                    }
                  });
                }}
              >
                Override
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(setEpuScreen(false));
                setShowEpuPermissionPopup(false);
                setOverRideEpu(false);
                setOverrideCode("");
                setIsOverrideExist(false);
                setEtaHavePermission(false);
                setNotOverridedEpu(true);
                resetEpuEtaDates();
                returnToUnitDetail();
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        {/* //eta date Modal */}
        <Modal
          show={showEtaPermissionPopup}
          onHide={() => {
            setShowEtaPermissionPopup(false);
            dispatch(setEpuScreen(false));
            dispatch(setEtaScreen(true));

            setNotOverridedEpu(true);
            setOverRideEpu(false);
            setOverrideCode("");
            resetEpuEtaDates();
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">
              {!etaHavePermission && overRideEpu && !notOverridedEpu ? "Override! " : "Override!"}
            </Modal.Title>
          </Modal.Header>

          {etaHavePermission && (
            <Modal.Body className="font-14 h-100">
              {`This date is outside the Delivery window,  Do you want to change the date?`}
            </Modal.Body>
          )}
          {!etaHavePermission && !overRideEpu && (
            <Modal.Body className="font-14 h-100">
              {`This date is outside the delivery window, Do you want to Override the date?`}
            </Modal.Body>
          )}
          {!etaHavePermission && overRideEpu && !isoverrideExist && notOverridedEpu && (
            <Modal.Body
              style={{ color: "red" }}
              className="font-14 h-100 "
            >{`Invalid Override Code. Do you want to try again `}</Modal.Body>
          )}

          {!etaHavePermission && overRideEpu && !notOverridedEpu && (
            <Modal.Body className="font-14 h-100">
              <Form.Group
                className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col xs={3} sm={3} md={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Override Code</Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className="customFormControl"
                    id="overideCode"
                    name="overideCode"
                    aria-autocomplete="list"
                    type="password"
                    autoComplete="one-time-code"
                    spellCheck={false}
                    value={overrideCode}
                    maxLength={30}
                    onInput={(e) => {
                      setOverrideCode(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
            </Modal.Body>
          )}

          <Modal.Footer>
            {etaHavePermission && (
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setEtaScreen(true));
                  dispatch(setEpuScreen(false));
                  setShowEtaPermissionPopup(false);
                  setOverRideEpu(false);
                  setOverrideCode("");
                }}
              >
                Yes
              </Button>
            )}
            {!etaHavePermission && !overRideEpu && !isoverrideExist && (
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setEtaScreen(true));
                  dispatch(setEpuScreen(false));
                  setShowEtaPermissionPopup(true);
                  setOverRideEpu(true);
                  setOverrideCode("");
                  if (etaHavePermission) {
                    setShowEpuPermissionPopup(false);
                  }
                }}
              >
                Yes
              </Button>
            )}
            {!etaHavePermission && overRideEpu && !isoverrideExist && notOverridedEpu && (
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setEtaScreen(true));
                  dispatch(setEpuScreen(false));
                  setOverrideCode("");
                  setIsOverrideExist(false);
                  setNotOverridedEpu(false);
                }}
              >
                Yes
              </Button>
            )}
            {!etaHavePermission && overRideEpu && !notOverridedEpu && (
              <Button
                variant="primary"
                onClick={() => {
                  checkOverrideCode().then((exists) => {
                    if (!exists) {
                      setShowEtaPermissionPopup(true);
                      setNotOverridedEpu(true);
                    } else {
                      setEtaHavePermission(false);
                      setShowEtaPermissionPopup(false);
                      setOverRideEpu(false);
                      setOverrideCode("");
                      setIsOverrideExist(false);
                      setNotOverridedEpu(false);
                    }
                  });
                }}
              >
                Override
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(setEtaScreen(false));
                dispatch(setEpuScreen(false));
                setShowEtaPermissionPopup(false);
                setOverRideEpu(false);
                setOverrideCode("");
                setIsOverrideExist(false);
                setEpuHavePermission(false);
                setNotOverridedEpu(true);
                resetEpuEtaDates();
                returnToUnitDetail();
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={cityToYardShuttlePopup}
          onHide={() => {
            dispatch(setCityToYardShuttlePopup(false));
          }}
          backdrop={true} // or just remove this prop (default is true)
          keyboard={true}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Error</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100 temp-red-color">
            {`The City to Yard combination does not exist`}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                dispatch(setFormData(""));
                dispatch(setDriverId(null));
                dispatch(setUnitId(null));
                dispatch(setWithoutunit(false));
                dispatch(setIsCityState(false));
                dispatch(setCityStateCheck(false));
                dispatch(setEpuScreen(false));
                dispatch(setEtaScreen(false));
                dispatch(setNotes(""));
                dispatch(setFirstName(""));
                dispatch(setLastName(""));
                navigate("/driver-selection");
                dispatch(setCityToYardShuttlePopup(false));
              }}
            >
              Ok
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(setCityToYardShuttlePopup(false));
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default FormContent;
