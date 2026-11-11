import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverId,
  setFormData,
  setEpuScreen,
  setEtaScreen,
  setIsDelay,
  setIsCityState,
  setDispatchId,
  setUnitId,
  setSortType,
  setSortType1,
  setSortValue,
  setSortValue2,
  setSortValueOfunit,
  setWithoutunit,
  setFirstName,
  setLastName,
  setCityStateCheck,
  setNotes,
  setPageNumber,
  setCheckinAdv,
  setCompanyFK,
  setCompanyName,
  setCompanyNames,
  setSaveType,
  setUnitCompanyList,
  setUnitData,
  setPageNumberForUnitSelection,
  setCurrentLocationCity,
  setCurrentLocationStateCode,
  setDriverData,
} from "../../../redux/DriverCheckinSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import styles from "../../../styles/QuarterScreen.module.css";
import DriverCheckinService from "../../../services/DriverCheckinService";
import { PermissionKeyGeneratorUtil } from "../../../utils/PermissionKeyGeneratorUtil";
import LoadingIcon from "../../common/LoadingIcon";
import CommonModal from "../../../components/common/commonModal";
import { validateCheckinDateTime } from "./checkinDateTimeUtils";
import { formatForApi } from "../../../utils/dateUtils";
import useDebouncer from "../../../hooks/useDebouncer";

// saved from the Save button of the city/state advance screen instead of the saveType effect
const ADV_SAVE_TYPES = ["YARDEXIT", "PICKUPADV", "CHECKINADV", "DELIVERYADV", "YARDEXITADV"];
// EPU/ETA entry does not take a checkin date and time
const NO_CHECKIN_DATE_SAVE_TYPES = ["EPU", "ETA"];

function FormFooter() {
  const params = useParams();
  const { state, pathname } = useLocation();
  const unitIdFromParams = params.unitId;
  const driverIdFromParams = params.driverId;

  const currentURL = window.location.pathname;
  const fromServiceCheckin = localStorage.getItem("fromServiceCheckin") === "true";
  const fromControlRoom = localStorage.getItem("fromControlRoom") === "true";
  const driverIdFromService = localStorage.getItem("driverId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [delayShow, setDelayShow] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [unitShow, setUnitShow] = useState(false);
  const [driverShow, setDriverShow] = useState(false);
  const [inTransitShow, setInTransitShow] = useState(false);
  const [inTransit, setInTransit] = useState(false);
  const [pickedUp, setPickedUp] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [lateYardExitNotes, setLateYardExitNotes] = useState("");
  const [lateYardExitNotePoupup, setLateYardExitNotePopup] = useState(false);
  const [inTransitSave, setInTransitSave] = useState(false);
  const [pickedUpSave, setPickedUpSave] = useState(false);
  const [deliverySave, setDeliverySave] = useState(false);
  const [yardDrop, setYardDrop] = useState(false);
  const [plantDrop, setPlantDrop] = useState(false);
  const [isYardExit, setIsYardExit] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);

  const driverId = useSelector((state) => state.driverCheckinReducer.driverId);
  const unitId = useSelector((state) => state.driverCheckinReducer.unitId);
  const unitData = useSelector((state) => state.driverCheckinReducer.unitData);
  const formData = useSelector((state) => state.driverCheckinReducer.formData);
  const epuDate = useSelector((state) => state.driverCheckinReducer.epuDate);
  const etaDate = useSelector((state) => state.driverCheckinReducer.etaDate);
  const epuScreen = useSelector((state) => state.driverCheckinReducer.epuScreen);
  const etaScreen = useSelector((state) => state.driverCheckinReducer.etaScreen);
  const isCityState = useSelector((state) => state.driverCheckinReducer.isCityState);
  const withoutunit = useSelector((state) => state.driverCheckinReducer.withoutunit);
  const cityStateCheck = useSelector((state) => state.driverCheckinReducer.cityStateCheck);
  const companyName = useSelector((state) => state.driverCheckinReducer.companyName);
  const companyFK = useSelector((state) => state.driverCheckinReducer.companyFK);
  const checkinAdv = useSelector((state) => state.driverCheckinReducer.checkinAdv);
  const saveType = useSelector((state) => state.driverCheckinReducer.saveType);
  const advanceAmount = useSelector((state) => state.driverCheckinReducer.advanceAmount);
  const notes = useSelector((state) => state.driverCheckinReducer.notes);
  const currentLocationCity = useSelector((state) => state.driverCheckinReducer.currentLocationCity);
  const currentLocationStateCode = useSelector(
    (state) => state.driverCheckinReducer.currentLocationStateCode
  );
  const checkinDate = useSelector((state) => state.driverCheckinReducer.checkinDate);
  const checkinTime = useSelector((state) => state.driverCheckinReducer.checkinTime);
  const checkinDateValid = useSelector((state) => state.driverCheckinReducer.checkinDateValid);
  const lastCheckinEntryDate = useSelector((state) => state.driverCheckinReducer.lastCheckinEntryDate);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData"));

  const scndAdvPermsn = PermissionKeyGeneratorUtil("DRCKN", "SCADP");

  const hasPermission = (loggedInUserData?.master ?? 0) || !deniedPermissions?.includes(scndAdvPermsn);
  const payCondition = formData?.payBalance !== 0 && formData?.payBalance === formData?.netPay;

  const canEnable = advanceAmount > 0 && (hasPermission || payCondition);
  const [loading, setLoading] = useState(false);

  const fetchUnitDetails = (unitId, companyName, companyFK) => {
    if (unitId && companyFK && companyName) {
      setLoading(true);
      DriverCheckinService.getRecord(unitId, companyName, companyFK)

        .then((res) => {
          dispatch(setFormData(res.data));
          dispatch(setDispatchId(res.data.dispatchId));
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  const debouncerFetchUnitDetails = useDebouncer(fetchUnitDetails, 300);

  const needsCheckinDateTime = (type) => !NO_CHECKIN_DATE_SAVE_TYPES.includes(type);

  /** Checkin date/time error message, or "" when valid / not needed for the save type */
  const getCheckinDateTimeError = (type = saveType) => {
    if (!needsCheckinDateTime(type)) return "";
    // an invalid/out of range typed date is not pushed to checkinDate by DateInputField
    return checkinDateValid
      ? validateCheckinDateTime(checkinDate, checkinTime, lastCheckinEntryDate)
      : "Please enter a valid Checkin date";
  };

  // disables the buttons that save a checkin while the checkin date/time is empty or invalid
  const checkinDateTimeInvalid = !!getCheckinDateTimeError("CHECKIN");

  /** Shows the checkin date/time error, if any, and returns whether it is valid */
  const isCheckinDateTimeValid = (type = saveType) => {
    const error = getCheckinDateTimeError(type);
    if (error) {
      toast.error(error);
      return false;
    }
    return true;
  };

  const saveRecord = () => {
    if (driverId && unitId) {
      if (!isCheckinDateTimeValid()) {
        // clear it so clicking the same button triggers the saveType effect again
        if (!ADV_SAVE_TYPES.includes(saveType)) {
          dispatch(setSaveType(""));
        }
        return;
      }
      setSaveLoader(true);
      DriverCheckinService.createRecord(saveData)
        .then((res) => {
          const result = Array.isArray(res.data) ? res.data[0] : {};
          if (result.Message === 1) {
            dispatch(setFormData(""));
            dispatch(setCheckinAdv(false));
            dispatch(setCurrentLocationCity(""));
            dispatch(setCurrentLocationStateCode(""));
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
            dispatch(setPageNumberForUnitSelection(0));
            dispatch(setPageNumber(0));

            if (fromServiceCheckin) {
              navigate(`/driver-service-selection/${driverIdFromService}/form`);
            } else {
              navigate(`/driver-selection`);
            }

            toast.success("Driver Check-in Created");
          } else {
            toast.error(result.Err || "Save failed");
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setSaveLoader(false);
        });
    }
  };

  const handlingCancel = () => {
    dispatch(setFormData(null));
    dispatch(setCheckinAdv(false));
    dispatch(setUnitId(null));
    dispatch(setDriverId(null));
    dispatch(setSortValue2(null));
    dispatch(setSortType1(false));
    dispatch(setSortValueOfunit(null));
    dispatch(setEpuScreen(false));
    dispatch(setEtaScreen(false));
    dispatch(setIsCityState(false));
    dispatch(setEtaScreen(false));
    dispatch(setEpuScreen(false));
    dispatch(setNotes(""));
    dispatch(setCurrentLocationCity(""));
    dispatch(setCurrentLocationStateCode(""));
    if (fromServiceCheckin && currentURL === `/unit-selection/${driverIdFromParams}`) {
      dispatch(setCompanyName(""));
      dispatch(setCompanyFK(null));
      dispatch(setCompanyNames([]));
      dispatch(setUnitCompanyList([]));
      dispatch(setUnitData([]));

      navigate(`/driver-service-selection/${driverIdFromParams}/form`);
    } else if (fromServiceCheckin) {
      navigate(`/unit-selection/${driverIdFromParams}`);
    } else {
      if (currentURL === `/unit-selection/${driverId}`) {
        if (fromControlRoom) {
          navigate(`/driver-selection`);
        }
      } else {
        navigate(`/unit-selection/${driverIdFromParams}`);
      }
    }
  };
  const saveData = {
    unitId: unitId,
    driverId: driverId,
    dispatchFK: formData?.dispatchId,
    etaDate: saveType === "ETA" ? etaDate : null,
    epuDate: saveType === "EPU" ? epuDate : null,
    lateYardExitNotes: saveType === "YARDEXIT" || saveType === "YARDEXITADV" ? lateYardExitNotes : "",
    city: currentLocationCity || formData?.pickupCity,
    stateCode: currentLocationStateCode || formData?.pickupState,
    companyId: companyFK,
    type: saveType,
    advanceAmount: advanceAmount ? advanceAmount : 0,
    notes: notes,
    // Checkin date/time is the user's wall-clock; users are always in Indiana, the application
    // time zone, so it is stored as entered - no UTC conversion (see checkinDateTimeUtils).
    driverCheckinDate: needsCheckinDateTime(saveType) ? formatForApi(checkinDate) : null,
    driverCheckinTime: needsCheckinDateTime(saveType) ? checkinTime : null,
  };
  useEffect(() => {
    if (formData?.underDelay === true && formData?.damaged === true) {
      setPopupMsg("Currently the unit is in  Damaged ,do you want to proceed?");
    } else if (formData?.underDelay === true && formData?.delayed === true) {
      setPopupMsg("Currently the unit is in  Delayed  ,do you want to proceed?");
    } else if (formData?.underDelay === true && formData?.breakdown === true) {
      setPopupMsg("Currently the unit is in  Breakdown ,do you want to proceed?");
    }
  }, [formData]);

  useEffect(() => {
    if (unitIdFromParams) return;
    if (unitId && companyFK && driverId) {
      debouncerFetchUnitDetails(unitId, companyName, companyFK);
    }
  }, [driverId, unitId]);

  useEffect(() => {
    if (saveType && !ADV_SAVE_TYPES.includes(saveType)) {
      saveRecord();
    }
  }, [saveType]);

  useEffect(() => {
    if (!fromServiceCheckin)
      if (!unitId && !driverId) {
      }
  }, []);
  useEffect(() => {
    localStorage.setItem("checkinDelay", "false");
  }, []);

  useEffect(() => {
    const onAdvanceScreen = pathname.startsWith("/city-state-checkin-adv");
    const onCityStateScreen = !onAdvanceScreen && pathname.startsWith("/city-state-checkin");
    if (pathname.startsWith("/epu-eta")) {
      if (state?.screen === "EPU" || state?.screen === "ETA") {
        dispatch(setEpuScreen(state.screen === "EPU"));
        dispatch(setEtaScreen(state.screen === "ETA"));
      }
    } else {
      dispatch(setEpuScreen(false));
      dispatch(setEtaScreen(false));
    }

    dispatch(setIsCityState(onCityStateScreen));
    dispatch(setCheckinAdv(onAdvanceScreen));

    if (onAdvanceScreen && state?.advType) {
      dispatch(setSaveType(state.advType));
    }

    if (!onAdvanceScreen && !onCityStateScreen) {
      setLateYardExitNotePopup(false);
      setLateYardExitNotes("");
      dispatch(setCityStateCheck(false));
      dispatch(setCurrentLocationCity(""));
      dispatch(setCurrentLocationStateCode(""));
    }
  }, [pathname]);

  const renderButtonText = (type, label) => {
    return saveLoader && saveType === type ? (
      <div className="loader-container">
        <div className="loader_YardCheckin"></div>
      </div>
    ) : (
      label
    );
  };

  return (
    <div className="p-t-10 p-b-5 border-top border-dark border-2 ">
      {loading && <LoadingIcon />}
      <div className="d-flex justify-content-between align-items-center">
        <div className="">
          {formData?.inTrnsitScreen ||
          formData?.yardExitScreen ||
          formData?.pickupScreen ||
          (etaScreen && !epuScreen) ? (
            <button
              route={`/epu/${driverId}/${unitId}`}
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5  m-b-5 `}
              onClick={() => {
                dispatch(setEpuScreen(true));
                dispatch(setEtaScreen(false));
                navigate(`/epu-eta/${driverId}/${unitId}`, { state: { screen: "EPU" } });
              }}
              hidden={
                currentURL === "/driver-selection" ||
                currentURL === `/unit-selection/${driverId}` ||
                epuScreen ||
                etaScreen ||
                checkinAdv
              }
            >
              EPU
            </button>
          ) : (
            ""
          )}
          {formData?.inTrnsitScreen ||
          formData?.yardExitScreen ||
          formData?.pickupScreen ||
          (!(epuScreen || etaScreen) && formData?.deliveryScreen) ||
          (!(epuScreen || etaScreen) && formData?.yardDeliveryScreen) ||
          (!(epuScreen || etaScreen) && formData?.plantDeliveryScreen) ||
          (!(epuScreen || etaScreen) && formData?.plantWithYardDelveryScreen) ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 `}
              onClick={() => {
                dispatch(setEtaScreen(true));
                dispatch(setEpuScreen(false));
                navigate(`/epu-eta/${driverId}/${unitId}`, { state: { screen: "ETA" } });
              }}
              hidden={
                currentURL === "/driver-selection" ||
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/city-state-checkin/${driverId}/${unitId}` ||
                isCityState ||
                etaScreen ||
                epuScreen ||
                checkinAdv
              }
            >
              ETA
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="">
          <button
            className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={() => {
              localStorage.setItem("checkinDelay", "true");

              navigate(
                `/delay-processing/new-delayed-unit-confirmation/${companyName}/${unitId}/${driverId}`,
                {
                  state: {
                    ...state,
                    unitId,
                    companyName,
                  },
                }
              );
            }}
            hidden={currentURL !== `/unit-selection/${driverId}`}
            disabled={!unitId}
          >
            Delay
          </button>

          {formData?.delayScreen && !(epuScreen || etaScreen) ? (
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              hidden={currentURL === `/unit-selection/${driverId}` || currentURL === `/driver-selection`}
              onClick={() => {
                if (formData?.delayed) {
                  dispatch(setSaveType("DELAY"));
                } else if (formData?.breakdown) {
                  dispatch(setSaveType("BREAKDOWN"));
                } else if (formData?.damaged) {
                  dispatch(setSaveType("DAMAGE"));
                }
              }}
              disabled={(!unitId && !driverId) || checkinDateTimeInvalid}
            >
              {renderButtonText("CHECKIN", "Checkin")}
            </button>
          ) : (
            ""
          )}
          {(formData?.plantWithYardDelveryScreen && !isCityState && !(epuScreen || etaScreen)) ||
          (!(epuScreen || etaScreen) && formData?.yardDeliveryScreen) ||
          (!(epuScreen || etaScreen) && formData?.plantDeliveryScreen) ||
          (!(epuScreen || etaScreen) && formData?.deliveryScreen) ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                isCityState ||
                checkinAdv
              }
              disabled={!unitId && !driverId}
              onClick={() => {
                dispatch(setIsCityState(true));
                navigate(`/city-state-checkin/${driverId}/${unitId}`);
              }}
            >
              Checkin
            </button>
          ) : (
            ""
          )}
          {!(epuScreen || etaScreen) && (formData?.inTrnsitScreen || formData?.pickupScreen) ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                checkinAdv
              }
              onClick={() => {
                setInTransit(true);
                setInTransitSave(true);
                dispatch(setSaveType("INTRANSIT"));
              }}
              disabled={(!unitId && !driverId) || checkinDateTimeInvalid}
            >
              {renderButtonText("INTRANSIT", "In Transit")}
            </button>
          ) : (
            ""
          )}
          {!(epuScreen || etaScreen) && formData?.pickupScreen ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                checkinAdv
              }
              onClick={() => {
                setPickedUpSave(true);
                dispatch(setSaveType("PICKUP"));
              }}
              disabled={(!unitId && !driverId) || checkinDateTimeInvalid}
            >
              {renderButtonText("PICKUP", "Pickup")}
            </button>
          ) : (
            ""
          )}
          {!(epuScreen || etaScreen) && formData?.pickupScreen ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                checkinAdv
              }
              onClick={() => {
                dispatch(setCheckinAdv(true));
                dispatch(setSaveType("PICKUPADV"));
                navigate(`/city-state-checkin-adv/${driverId}/${unitId}`, {
                  state: { advType: "PICKUPADV" },
                });
              }}
              disabled={!canEnable}
            >
              {renderButtonText("PICKUPADV", "Pickup Adv")}
            </button>
          ) : (
            ""
          )}
          {(!(epuScreen || etaScreen) && formData?.plantWithYardDelveryScreen && !isCityState) ||
          (!(epuScreen || etaScreen) && formData?.deliveryScreen) ||
          (!(epuScreen || etaScreen) && formData?.yardDeliveryScreen) ||
          (!(epuScreen || etaScreen) && formData?.plantDeliveryScreen) ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                isCityState ||
                checkinAdv
              }
              disabled={!canEnable}

              onClick={() => {
                dispatch(setCheckinAdv(true));
                dispatch(setSaveType("CHECKINADV"));

                navigate(`/city-state-checkin-adv/${driverId}/${unitId}`, {
                  state: { advType: "CHECKINADV" },
                });
              }}
            >
              {renderButtonText("CHECKINADV", "Check In Adv")}
            </button>
          ) : (
            ""
          )}
          {(!(epuScreen || etaScreen) && formData?.plantWithYardDelveryScreen && !isCityState) ||
          (!(epuScreen || etaScreen) && formData?.yardDeliveryScreen) ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                isCityState ||
                checkinAdv
              }
              disabled={(!unitId && !driverId) || checkinDateTimeInvalid}
              onClick={() => {
                setYardDrop(true);
                dispatch(setSaveType("YARDDROP"));
              }}
            >
              {renderButtonText("YARDDROP", "Yard Drop")}
            </button>
          ) : (
            ""
          )}

          {(!(epuScreen || etaScreen) && formData?.plantWithYardDelveryScreen && !isCityState) ||
          (!(epuScreen || etaScreen) && formData?.plantDeliveryScreen) ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              disabled={(!unitId && !driverId) || checkinDateTimeInvalid}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                isCityState ||
                checkinAdv
              }
              onClick={() => {
                setPlantDrop(true);
                dispatch(setSaveType("PLANTDROP"));
              }}
            >
              {renderButtonText("PLANTDROP", "Plant Drop")}
            </button>
          ) : (
            ""
          )}

          {(!(epuScreen || etaScreen) && formData?.pickupScreen) ||
          (!(epuScreen || etaScreen) && formData?.deliveryScreen && !isCityState) ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              disabled={(!unitId && !driverId) || checkinDateTimeInvalid}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                checkinAdv
              }
              onClick={() => {
                setPickedUp(true);
                setDelivery(true);
                setDeliverySave(true);
                dispatch(setSaveType("DELIVERY"));
              }}
            >
              {renderButtonText("DELIVERY", "Delivery")}
            </button>
          ) : (
            ""
          )}
          {formData?.yardExitScreen && !etaScreen && !epuScreen ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                checkinAdv
              }
              onClick={() => {
                dispatch(setSaveType("YARDEXIT"));
                if (isCheckinDateTimeValid("YARDEXIT")) {
                  setLateYardExitNotePopup(true);
                }
              }}
              disabled={(!unitId && !driverId) || checkinDateTimeInvalid}
            >
              {renderButtonText("YARDEXIT", "Yard Exit")}
            </button>
          ) : (
            ""
          )}
          {formData?.yardExitScreen && !etaScreen && !epuScreen ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              hidden={
                currentURL === `/unit-selection/${driverId}` ||
                currentURL === `/driver-selection` ||
                checkinAdv
              }
              onClick={() => {
                dispatch(setCheckinAdv(true));
                dispatch(setSaveType("YARDEXITADV"));

                navigate(`/city-state-checkin-adv/${driverId}/${unitId}`, {
                  state: { advType: "YARDEXITADV" },
                });
              }}
              disabled={!canEnable}
            >
              {renderButtonText("YARDEXITADV", "Yard Exit Adv")}
            </button>
          ) : (
            ""
          )}

          {epuScreen || etaScreen || isCityState || (checkinAdv && formData?.yardExitScreen) || checkinAdv ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              hidden={currentURL === `/unit-selection/${driverId}` || currentURL === `/driver-selection`}
              disabled={
                (((!unitId && !driverId) ||
                  (isCityState && !cityStateCheck) ||
                  (checkinAdv && !cityStateCheck)) &&
                  !formData?.yardExitScreen &&
                  !formData?.pickupScreen) ||
                (!epuScreen && !etaScreen && checkinDateTimeInvalid)
              }
              onClick={() => {
                if (epuScreen) {
                  dispatch(setSaveType("EPU"));
                } else if (etaScreen) {
                  dispatch(setSaveType("ETA"));
                } else if (isCityState) {
                  dispatch(setSaveType(checkinAdv ? saveType : "CHECKIN"));
                } else if (checkinAdv) {
                  if (saveType === "YARDEXITADV") {
                    if (isCheckinDateTimeValid()) {
                      setLateYardExitNotePopup(true);
                    }
                  } else {
                    saveRecord();
                  }
                }
              }}
            >
              {renderButtonText(epuScreen ? "EPU" : etaScreen ? "ETA" : "CHECKIN", "Save")}
            </button>
          ) : (
            ""
          )}
          {currentURL === `/unit-selection/${driverId}` ||
          currentURL === "/driver-selection" ||
          currentURL === `/unit-selection/${driverIdFromService}` ? (
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              disabled={
                (currentURL === "/driver-selection" && !driverId) ||
                (currentURL === `/unit-selection/${driverId}` && !unitId)
              }
              onClick={() => {
                if (!driverId) {
                  dispatch(setDriverId(driverIdFromService));
                }
                if (unitData.length === null || unitData.length === 0) {
                  setDriverShow(true);
                }
                if (unitData.length > 1 && currentURL === "/driver-selection") {
                  navigate(`/unit-selection/${driverId}`);
                  localStorage.setItem("fromControlRoom", "true");
                }
                if (
                  unitData.length > 1 &&
                  currentURL === "/driver-selection" &&
                  (formData?.delayScreen === true ||
                    formData?.pickupScreen ||
                    formData?.inTrnsitScreen === true ||
                    formData?.yardExitScreen ||
                    formData?.plantWithYardDelveryScreen ||
                    formData?.yardDeliveryScreen ||
                    formData?.plantDeliveryScreen ||
                    formData?.deliveryScreen)
                ) {
                  navigate(`/unit-selection/${driverId}`);
                } else if (formData?.delayScreen === true && withoutunit) {
                  setUnitShow(true);
                } else if (formData?.delayScreen) {
                  setUnitShow(true);
                }
                if (formData?.pickupScreen && withoutunit) {
                  navigate(`/pickup/${driverId}/${unitId}`);
                } else if (formData?.pickupScreen) {
                  navigate(`/pickup/${driverId}/${unitId}`);
                }
                if (formData?.inTrnsitScreen === true && withoutunit) {
                  setInTransitShow(true);
                } else if (formData?.inTrnsitScreen) {
                  setInTransitShow(true);
                }
                if (formData?.plantWithYardDelveryScreen === true && withoutunit) {
                  navigate(`/plant-with-yard-delivery/${driverId}/${unitId}`);
                } else if (formData?.plantWithYardDelveryScreen) {
                  navigate(`/plant-with-yard-delivery/${driverId}/${unitId}`);
                }
                if (formData?.yardExitScreen === true && withoutunit) {
                  setIsYardExit(true);
                  navigate(`/yard-exit/${driverId}/${unitId}`);
                } else if (formData?.yardExitScreen === true) {
                  setIsYardExit(true);
                  navigate(`/yard-exit/${driverId}/${unitId}`);
                }
                if (formData?.yardDeliveryScreen === true && withoutunit) {
                  dispatch(setIsCityState(false));
                  navigate(`/yard-delivery/${driverId}/${unitId}`);
                } else if (formData?.yardDeliveryScreen === true) {
                  dispatch(setIsCityState(false));
                  navigate(`/yard-delivery/${driverId}/${unitId}`);
                }
                if (formData?.plantDeliveryScreen && withoutunit) {
                  navigate(`/plant-delivery/${driverId}/${unitId}`);
                } else if (formData?.plantDeliveryScreen) {
                  navigate(`/plant-delivery/${driverId}/${unitId}`);
                }
                if (formData?.deliveryScreen && withoutunit) {
                  navigate(`/delivery/${driverId}/${unitId}`);
                } else if (formData?.deliveryScreen) {
                  navigate(`/delivery/${driverId}/${unitId}`);
                }
              }}
            >
              Next
            </button>
          ) : (
            ""
          )}

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            hidden={currentURL === `/driver-selection`}
            onClick={() => {
              handlingCancel();
            }}
          >
            Cancel
          </button>

          {currentURL === `/driver-selection` ? (
            <button
              className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
              onClick={() => {
                dispatch(setDriverId(null));
                dispatch(setFirstName(""));
                dispatch(setLastName(""));
                dispatch(setPageNumber(0));
                dispatch(setSortValue(null));
                dispatch(setSortType(false));
                dispatch(setDriverId(null));
                dispatch(setCompanyName(""));
                dispatch(setCompanyFK(null));
                dispatch(setUnitCompanyList([]));
                dispatch(setCompanyNames([]));
                dispatch(setDriverData([]));
                dispatch(setUnitData([]));
              }}
            >
              Cancel
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <Modal show={delayShow} onHide={() => setDelayShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100 temp-red-color"></Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-14 h-100">Delay Maintenance program</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDelayShow(false);
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <CommonModal
        show={unitShow}
        onHide={() => setUnitShow(false)}
        title={"Warning"}
        body={popupMsg}
        handleYES={() => {
          dispatch(setIsDelay(true));
          navigate(`/delay-checkin/${driverId}/${unitId}`);
        }}
        handleNO={() => setUnitShow(false)}
      />

      <Modal show={inTransitShow} onHide={() => setInTransitShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100 temp-red-color"></Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-14 h-100">This unit is not scheduled to be picked up yet.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              navigate(`/intransit-checkin/${driverId}/${unitId}`);
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={lateYardExitNotePoupup}
        onHide={() => setLateYardExitNotePopup(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100 temp-black-color">
            {" "}
            Please enter the Late Yard Exit Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-14 h-100">
          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
            <Col xs={3} sm={3} md={3} className="p-0" style={{ height: "120px" }}>
              <Form.Label className="col-form-label dealer-label">Late Yard Exit Note</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="p-0">
              <textarea
                type="text"
                name="lateYardExitNote"
                id="lateYardExitNote"
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "120px",
                  minWidth: "210px",
                  boxShadow: "none",
                  fontSize: "12px",
                  outline: "none",
                }}
                className={`${styles.formControl} ${!lateYardExitNotes ? "borderRed" : "borderGreen"}`}
                value={lateYardExitNotes}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setLateYardExitNotes(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={!lateYardExitNotes || checkinDateTimeInvalid}
            onClick={() => {
              if (!isCheckinDateTimeValid()) {
                return;
              }
              if (lateYardExitNotes && lateYardExitNotes?.trim() !== "") {
                setSaveLoader(true); // optional: show loader
                DriverCheckinService.createRecord(saveData)
                  .then((res) => {
                    const result = Array.isArray(res.data) ? res.data[0] : {};

                    if (result.Message === 1) {
                      // Success
                      dispatch(setFormData(null));
                      dispatch(setCheckinAdv(false));
                      dispatch(setCurrentLocationCity(""));
                      dispatch(setCurrentLocationStateCode(""));
                      dispatch(setDriverId(null));
                      dispatch(setUnitId(null));
                      dispatch(setWithoutunit(false));
                      dispatch(setIsCityState(false));
                      dispatch(setCityStateCheck(false));
                      dispatch(setEtaScreen(false));
                      dispatch(setEpuScreen(false));
                      setLateYardExitNotePopup(false);
                      dispatch(setPageNumberForUnitSelection(0));
                      dispatch(setPageNumber(0));

                      if (fromServiceCheckin) {
                        navigate(`/driver-service-selection/${driverIdFromService}/form`);
                      } else {
                        navigate(`/driver-selection`);
                      }

                      toast.success("Driver Check-in Created");
                    } else {
                      toast.error(result.Err || "Save failed");
                    }
                  })
                  .catch(() => {
                    toast.error("Something went wrong");
                  })
                  .finally(() => {
                    setSaveLoader(false);
                  });
              } else {
                toast.error("Please enter a Late Yard Exit Note");
              }
            }}
          >
            {saveLoader === true ? (
              <div className="loader-container">
                <div className="loader_YardCheckin"></div>
              </div>
            ) : (
              "Save"
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setLateYardExitNotes("");
              setLateYardExitNotePopup(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={driverShow} onHide={() => setDriverShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100 temp-red-color">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-14 h-100">
          Driver does not currently have any undelivered units enter check calls for.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDriverShow(false);
              dispatch(setDriverId(null));
              dispatch(setFirstName(""));
              dispatch(setLastName(""));
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormFooter;
