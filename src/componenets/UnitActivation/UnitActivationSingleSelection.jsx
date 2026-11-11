import { parseLocalDate } from "../../utils/dateUtils";
import React, { useEffect, useMemo } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import LookupButton from "../common/LookupButton";
import UnitActivationFooter from "./UnitActivationFooter";
import UnitActivationHeader from "./UnitActivationHeader";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../common/AutoCompleteDropdown";
import UnitActivationService from "../../services/UnitActivationService";
import CompanyService from "../../services/CompanyService";
import {
  setActive,
  setActiveDispatch,
  setBrowseType,
  setCompanyFK,
  setCompanyName,
  setCurrentCompanyName,
  setDelay,
  setInProgress,
  setPostToSister,
  setSaveData,
  setSaveDisable,
  setSelectedCompanies,
  setSelectedUnit,
  setShowUnitActivationDelay,
  setShowUnitActivationSoftPost,
  setUnitId,
  setUnitNumber,
  setUnitNumberLastFive,
  setUnitSelected,
  setLoader,
  setCurrentCompanyData,
  setOeUnitIndex,
  setDispatchID,
  setNewDelayNavigation,
  setEnforceScalePlateWeights,
} from "../../redux/UnitActivationSlice";
import DateInputField from "../common/DateInputField";
import UnitSelectionLookup from "../LookupScreens/UnitSelection/UnitSelectionLookup";
import WarningModalPopUp from "../common/WarningModalPopUp";
import { setShowUnitActivationScreen, setStatusForPlantToYard } from "../../redux/YardCheckinSlice";
import toast from "react-hot-toast";
import DriverLookup from "../LookupScreens/Driver/DriverLookup";
import {
  setShowUnitActivationScreen as setShowUnitActivation,
  setActiveDispatch as setActivateUnit,
} from "../../redux/EditYardUnitSlice";
import LoadingIcon from "../common/LoadingIcon";
import UnitActivationSingleSelectionDelayModal from "./UnitActivationSingleSelectionDelayModal";
import UnitActivationSingleSoftPostModal from "./UnitActivationSingleSoftPostModal";
import { customFormatDate } from "../../utils/validation/DateFormatUtils";
import { setShowSingleUnitActivation } from "../../redux/OrderEntryFilterSlice";
import { getCurrentCompany, handleBeforeInputForInteger } from "../../utils/utils";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { usePermission } from "../../hooks/usePermission";
import { PROGRAMS } from "../../constants/permissionConstants";
import CommonModal from "../../components/common/commonModal";
import { lockScreens } from "../../constants/processLockConfig";
import AutoComplete from "../../components/common/autoComplete";
import CommonNormalLookup from "../../components/lookup/commonNormalLookup";
import { FormProvider, useForm } from "react-hook-form";
import OrderEntryServices from "../../service/orderEntry/orderEntry.service";

function UnitActivationSingleSelection(props) {
  const { shuttleYardcheckin, editYardUnit, orderEntry, unitNumberOE, unitIdOE, last5OE, show, onHide } =
    props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useAppNavigate();
  const { breakdownUnitFK } = useParams();
  const { checkPermission } = usePermission();

  const searchCriteria = "Beginning";
  const type = "Autocomplete";

  // const [dispatchID, setDispatchID] = useState(null);
  const [units, setUnits] = useState([]);
  const [restricted, setRestricted] = useState(false);
  const [dealerShuttle, setDealerShuttle] = useState(false);
  const [ads, setADS] = useState("no");
  const [priority, setPriority] = useState("");
  const [specialCodeId, setSpecialCodeId] = useState(null);
  const [specialCode, setSpecialCode] = useState("");
  const [additionalPay, setAdditionalPay] = useState("");
  const [noPickupFee, setNoPickupFee] = useState(false);
  const [noDeliveryFee, setNoDeliveryFee] = useState(false);
  const [hold, setHold] = useState(false);
  const [reason, setReason] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [notes, setNotes] = useState("");
  const [customer, setCustomer] = useState("");
  const [plant, setPlant] = useState("");
  const [pickup, setPickup] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [delivery, setDelivery] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [yard, setYard] = useState("");
  const [unitType, setUnitType] = useState("");
  const [miles, setMiles] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [deliverByDate, setDeliverByDate] = useState("");
  const [deliveryBonus, setDeliveryBonus] = useState(false);
  const [deliveryBonusDPM, setDeliveryBonusDPM] = useState(false);
  const [deliveryBonusAmount, setDeliveryBonusAmount] = useState("");
  const [invoiceBonusAmount, setInvoiceBonusAmount] = useState("");
  const [invoiceDescription, setInvoiceDescription] = useState("");
  const [bonusDeliveryByDate, setBonusDeliveryByDate] = useState("");
  const [reserveForDriver, setReserveForDriver] = useState(false);
  const [driverId, setDriverId] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [postedFrom, setPostedFrom] = useState(false);
  const [sisterId, setSisterId] = useState("");
  const [sisters, setSisters] = useState([]);
  const [canShuttle, setCanShuttle] = useState(false);
  const [showSpecialCodeLookUp, setShowSpecialCodeLookUp] = useState(false);
  // CommonNormalLookup -> SearchFilterSort -> RadioButton uses react-hook-form's <Controller>,
  // which needs a form context. This screen is not a react-hook-form screen, so we provide a
  // local form instance only for the lookup (Order Entry gets it from its page-level FormProvider).
  const lookupFormMethods = useForm();
  const [serverError, setServerError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [driverSelection, setDriverSelection] = useState(false);
  const [flatRated, setFlatRated] = useState(false);
  const [companyBonusPoolValid, setCompanyBonusPoolValid] = useState(false);
  const [saveMessage, setSaveMessage] = useState("Data Successfully saved.");
  const [unitsLoading, setUnitsLoading] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState(null);
  const [pars, setPars] = useState("");
  const [gvwr, setGvwr] = useState("");
  const [shippingWeight, setShippingWeight] = useState("");
  const [postingCompanyFK, setPostingCompanyFK] = useState(null);
  const [lockError, setLockError] = useState("");
  const [lockLoading, setLockLoading] = useState(false);
  const [alreadyActivated, setAlreadyActivated] = useState(false);
  const [isbonusDeliveryByDateValid, setIsbonusDeliveryByDateValid] = useState(
    !bonusDeliveryByDate ? true : false
  );
  const [unitSelectionLoading, setUnitSelectionLoading] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);

  // Get value from redux, Yard Check in
  const unitData = useSelector((state) => state.yardCheckinReducer.unitData);

  const editUnitData = useSelector((state) => state.editYardUnitsReducer.editUnitData);
  const oeUnitData = useSelector((state) => state.orderEntryReducer.oeUnitData);

  const isDelayUndispatch = useSelector((state) => state.delayProcessing.isDelayUndispatch);
  const dispatchID = useSelector((state) => state.unitActivationReducer.dispatchID);
  const sessionId = localStorage.getItem("sessionId") || null;
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");

  const {
    browseType,
    pageNumber,
    selectedUnit,
    saveData,
    unitSelected,
    unitId,
    unitNumber,
    delay,
    active,
    activeDispatch,
    unitNumberLastFive,
    showUnitActivationDelay,
    companyFK,
    companyName,
    currentCompanyFetch,
    postToSister,
    selectedCompanies,
    showUnitActivationSoftPost,
    currentCompanyData,
    oeUnitIndex,
    enforceScalePlateWeights,
  } = useSelector((state) => state.unitActivationReducer);

  /**
   *  Unit Number Autocomplete Fetch function
   **/
  const getAllUnitNumbers = (string, unitNumberLastFive, companyName) => {
    setUnitSelectionLoading(true);
    let last5 = unitNumberLastFive;
    if (unitId) {
      last5 = "";
    }
    UnitActivationService.getAllUnitNumbers(string, last5, 0, 100, companyName)
      .then((response) => {
        const data = response.data.content;
        const unitsList = data?.map((unit) => ({ ...unit, unitNumber: unit.unitNumber?.trim() }));
        setUnits(unitsList);
        if (last5?.length > 0) {
          if (unitsList?.length === 1) {
            dispatch(setUnitId(unitsList[0]?.unitPK));
            dispatch(setUnitNumber(unitsList[0]?.unitNumber));
            dispatch(setUnitSelected(unitsList[0]));
          } else {
            dispatch(setUnitId(null));
            dispatch(setUnitNumber(""));
            dispatch(setUnitSelected(null));
          }
        }
        setUnitSelectionLoading(false);
      })
      .catch((error) => {
        setUnitSelectionLoading(false);
      });
  };

  /**
   * Unit Number Autocomplete Handle function On select
   **/
  const handleUnitNumberSelection = (unit) => {
    dispatch(setUnitNumber(unit.unitNumber));
    dispatch(setUnitId(unit.unitPK));
    dispatch(setUnitSelected(unit));
    dispatch(setInProgress(true));
    setShowUnitSelectionLookup(false);
    dispatch(setSaveData(null));
  };

  const lockReleaseUnitActivation = async () => {
    try {
      if (!sessionId) return;
      const response = await UnitActivationService.lockReleaseUnitActivation({
        sessionId: sessionId,
        processName: lockScreens.UNIT_ACTIVATION,
      });

      if (response?.status === 200) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const lockUnitActivation = async () => {
    try {
      await lockReleaseUnitActivation();
      const id = unitIdOE || unitId;
      if (!id) return;

      const currentCompany = getCurrentCompany();
      setLockLoading(true);
      localStorage.setItem("recordKey", id);
      const response = await UnitActivationService.getUnitsForActivation({
        companyName: companyName || currentCompany?.name,
        unitPK: id,
      });

      if (response?.data?.unitsForActivation?.[0]?.ErrorCode === 1) {
        setLockError(response?.data?.unitsForActivation?.[0]?.ErrorMsg);
      } else {
        setLockError("");
      }

      const resData = response?.data?.unitsForActivation?.[0];
      const responseData = {
        ...resData,
        sisterCompanyPKList:
          typeof resData.sisterCompanyPKList === "string"
            ? resData.sisterCompanyPKList?.split(",")?.map(Number)
            : [],
        previousSisterCompanyPKList:
          typeof resData.previousSisterCompanyPKList === "string"
            ? resData.previousSisterCompanyPKList?.split(",")?.map(Number)
            : [],
      };

      dispatch(setSelectedUnit(responseData));
      localStorage.setItem("sessionId", response?.data?.sessionId);
    } catch (error) {
      console.error(error);
    } finally {
      setLockLoading(false);
    }
  };

  /**
   *  Fetch all active companies
   **/
  const getAllCompanyNames = () => {
    setCompanyLoading(true);
    CompanyService.getAllCompanyData()
      .then((response) => {
        const data = (response.data || []).map((company) => ({
          ...company,
          companyPK: company.CompanyPK,
          name: company.Name,
        }));
        setCompanyList(data);
        const breakdownCompany = data?.find((company) => company.name === breakdownCompanyName);
        if (breakdownCompany) {
          dispatch(setCurrentCompanyName(breakdownCompany.name));
          dispatch(setCompanyFK(breakdownCompany.companyPK));
          dispatch(setCompanyName(breakdownCompany.name));
          setCurrentCompanyId(breakdownCompany.companyPK);
          dispatch(setCurrentCompanyData(breakdownCompany));
          setCompanyLoading(false);
          let loacalCompany = getCurrentCompany();
          localStorage.setItem("breakdownCompanyName", loacalCompany?.name);
        } else {
          if (currentCompanyFetch) {
            const currentCompany = getCurrentCompany();
            dispatch(setCurrentCompanyName(currentCompany.name));
            dispatch(setCompanyFK(currentCompany.companyPK));
            dispatch(setCompanyName(currentCompany.name));
            setCurrentCompanyId(currentCompany.companyPK);
            dispatch(setCurrentCompanyData(currentCompany));
          }
          setCompanyLoading(false);
        }
      })
      .catch((error) => {
        setCompanyLoading(false);
      });
  };

  /**
   * Special code selection (shared by AutoComplete and Lookup)
   **/
  const handleSpecialCodeSelection = (code) => {
    setSpecialCodeId(code.specialCodePK);
    setSpecialCode(code.description?.trim() || "");
  };

  /**
   * Fetch Driver for Autocomplete
   */
  const fetchAllDrivers = (string) => {
    setDriverLoading(true);
    reserveForDriver &&
      UnitActivationService.getAllDrivers(pageNumber, searchCriteria, type, string, companyName)
        .then((response) => {
          const data = response.data.content;
          const driversList = data?.map((driver) => ({ ...driver, firstName: driver.firstName?.trim() }));
          setDrivers(driversList);
          setDriverLoading(false);
        })
        .catch((error) => {
          setDriverLoading(false);
        });
  };

  /**
   * used for Driver Autocomplete -Selection
   */
  const handleDriverSelection = (driver) => {
    setDriverId(driver.driverPK);
    setDriverName(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""));
    setDriverSelection(false);
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

  /**
   * used for listing sister companies
   * when hard post is selected
   */
  const fetchSisterCompany = () => {
    UnitActivationService.getAllSisterCompanies()
      .then((response) => {
        setSisters(response.data);
      })
      .catch((error) => {});
  };

  const isValidDecimalTwoFour = (value) => {
    var regexp = /^\d{0,2}(\.\d{1,4})?$/;
    if (regexp.test(value)) {
      return true;
    } else {
      return false;
    }
  };

  const isValidDecimalFiveTwo = (value) => {
    var regexp = /^\d{0,5}(\.\d{1,2})?$/;
    if (regexp.test(value)) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Check Company is allowed for soft post or hard post
   * depending upon unit type
   */
  // Derived (not stored) so it recomputes whenever the company data or the unit
  // finishes loading, regardless of which API call returns first.
  const { canSoftPost, canHardPost } = useMemo(() => {
    const company = currentCompanyData;
    const unit = selectedUnit;
    if (!company || !unit) return { canSoftPost: false, canHardPost: false };
    const canHardPost = !!(
      (company.hardPostTowableOutbound && unit.towable && !unit.reload) ||
      (company.hardPostDriveawayOutbound && unit.motorized && !unit.reload) ||
      (company.hardPostTowableReload && unit.towable && unit.reload) ||
      (company.hardPostDriveawayReload && unit.motorized && unit.reload)
    );
    const canSoftPost = !!(
      (company.softPostTowableOutbound && unit.towable && !unit.reload) ||
      (company.softPostDriveawayOutbound && unit.motorized && !unit.reload) ||
      (company.softPostTowableReload && unit.towable && unit.reload) ||
      (company.softPostDriveawayReload && unit.motorized && unit.reload)
    );
    return { canSoftPost, canHardPost };
  }, [currentCompanyData, selectedUnit]);

  /**
   * Save Handler
   * Same is used for YardCheckin (shuttleYardcheckin) &
   * Edit Yard Unit (EditYard)
   **/
  const saveHandler = () => {
    if (delay === "shuttle") {
      if (editYardUnit || shuttleYardcheckin || orderEntry) {
        dispatch(setShowUnitActivationDelay(true));
      } else {
        navigate("/unit-activation-shuttle-delay");
      }
    } else if (postToSister === "softSelect") {
      if (editYardUnit || shuttleYardcheckin || orderEntry) {
        dispatch(setShowUnitActivationSoftPost(true));
      } else {
        navigate("/unit-activation-single-soft-post");
      }
    } else {
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
            getAllCompanyNames();
            if (response.data?.unsavedList?.length !== 0) {
              setSaveMessage("Unit Activation Save failed");
              return;
            }
            if (activeDispatch && active && selectedUnit?.alreadyActivated) {
              setSaveMessage("Unit Activation updated successfully");
            } else if (activeDispatch && active && !selectedUnit?.alreadyActivated) {
              setSaveMessage("Unit Activation added successfully");
            } else if (!activeDispatch && active && selectedUnit?.alreadyActivated) {
              if (!selectedUnit.activeDispatch && delay !== "none") {
                if (delay === "dispatch") {
                  setSaveMessage("Unit Activation added successfully");
                } else {
                  setSaveMessage("Unit Delayed successfully");
                }
              }
              if (delay !== "none" && delay !== "dispatch") {
                setSaveMessage("Unit Deactivated and Delayed successfully");
              }
              if (delay !== "none" && delay === "dispatch") {
                setSaveMessage("Unit Deactivated successfully");
              } else if (!selectedUnit.activeDispatch && hold) {
                setSaveMessage("Unit on Hold saved successfully");
              } else if (hold) {
                setSaveMessage("Unit Deactivated and Unit on Hold saved successfully");
              } else if (!selectedUnit.activeDispatch) {
                setSaveMessage("Saved successfully");
              } else {
                setSaveMessage("Unit Deactivated successfully");
              }
            } else if (!activeDispatch && active && !selectedUnit?.alreadyActivated) {
              if (delay !== "none" && selectedUnit?.alreadyDelayed) {
                setSaveMessage("Unit Delay Updated successfully");
              } else if (delay !== "none" && !selectedUnit?.alreadyDelayed) {
                setSaveMessage("Unit Delayed successfully");
              } else if (delay === "none" && selectedUnit?.alreadyDelayed && hold) {
                setSaveMessage("Unit Delay removed and Unit on Hold saved successfully");
              } else if (delay === "none" && !selectedUnit?.alreadyDelayed && hold) {
                setSaveMessage("Unit on Hold saved successfully");
              }
            } else if (!activeDispatch && !active && selectedUnit?.alreadyActivated) {
              setSaveMessage("Unit Activation record is deleted successfully");
            } else if (!activeDispatch && !active && !selectedUnit?.alreadyActivated) {
              if (delay !== "none") {
                setSaveMessage("Unit Activation record is deleted and Delayed successfully");
              } else if (hold) {
                setSaveMessage("Unit Activation record is deleted and Unit on Hold saved successfully");
              } else {
                setSaveMessage("Unit Activation record is deleted successfully");
              }
            }
            dispatch(setDispatchID(null));
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
    }
  };

  /**
   * Close Handler
   * Same is used for YardCheckin (shuttleYardcheckin) &
   * Edit Yard Unit (editYardUnit) & orderEntry
   **/
  const closeHandler = () => {
    if (unitNumberOE) {
      onHide();
    }

    if (shuttleYardcheckin) {
      dispatch(setStatusForPlantToYard("inYard"));
      dispatch(setShowUnitActivationDelay(false));
      dispatch(setShowUnitActivationScreen(false));
      navigate("/yard-checkin-unit-selection");
    } else if (editYardUnit) {
      dispatch(setShowUnitActivationDelay(false));
      dispatch(setShowUnitActivation(false));
      dispatch(setActivateUnit(false));
      dispatch(setActiveDispatch(false));
      dispatch(setShowUnitActivation(false));
      navigate("/edit-yard-unit-selection");
    } else if (orderEntry) {
      if (oeUnitIndex === oeUnitData?.length - 1) {
        dispatch(setShowSingleUnitActivation(false));
      } else {
        dispatch(setOeUnitIndex(oeUnitIndex + 1));
      }
    } else {
      navigate("/");
      resetValues();
      dispatch(setUnitId(null));
      dispatch(setUnitNumber(""));
      dispatch(setUnitNumberLastFive(""));
      dispatch(setBrowseType(""));
    }
  };

  /**
   * Cancel Handler
   * Same is used for YardCheckin (shuttleYardcheckin) &
   * Edit Yard Unit (EditYard)
   **/
  const cancelHandler = () => {
    if (unitNumberOE) {
      onHide();
    }
    if (shuttleYardcheckin) {
      dispatch(setStatusForPlantToYard("inYard"));
      dispatch(setShowUnitActivationDelay(false));
      dispatch(setShowUnitActivationScreen(false));
      navigate("/yard-checkin-unit-selection");
    } else if (editYardUnit) {
      dispatch(setShowUnitActivationDelay(false));
      dispatch(setShowUnitActivation(false));
      dispatch(setActivateUnit(false));
      dispatch(setActiveDispatch(false));
      dispatch(setShowUnitActivation(false));
      navigate("/edit-yard-unit-selection");
    } else if (orderEntry) {
      if (oeUnitIndex === oeUnitData?.length - 1) {
        dispatch(setShowSingleUnitActivation(false));
      } else {
        dispatch(setOeUnitIndex(oeUnitIndex + 1));
      }
    } else {
      resetValues();
      dispatch(setUnitId(null));
      dispatch(setUnitNumber(""));
      dispatch(setUnitNumberLastFive(""));
      toast.success("Changes Cancelled");
      navigate("/unit-activation-selections");
    }
  };

  /**
   * Calls warning popup model
   * to show the status of operations
   **/
  const warningPopupModalHide = () => {
    if (saveError === true) {
      dispatch(setLoader(false));
      setSaveError(false);
      setErrorMessage("");
      setSaveMessage("");
      setModalPopUp(false);
      if (unitNumberOE) {
        onHide();
      }
    } else {
      setModalPopUp(false);
      dispatch(setSaveData(null));
      dispatch(setSelectedUnit(null));
      dispatch(setUnitSelected(null));
      dispatch(setUnitId(null));
      dispatch(setUnitNumber(""));
      dispatch(setUnitNumberLastFive(""));
      if (unitNumberOE) {
        onHide();
      }

      if (shuttleYardcheckin) {
        dispatch(setStatusForPlantToYard("inYard"));
        dispatch(setShowUnitActivationDelay(false));
        dispatch(setShowUnitActivationScreen(false));
        // navigate("/yard-checkin-unit-selection");
      } else if (editYardUnit) {
        dispatch(setShowUnitActivationDelay(false));
        dispatch(setShowUnitActivation(false));
        dispatch(setActiveDispatch(false));
        dispatch(setActivateUnit(false));
        dispatch(setShowUnitActivation(false));
        // navigate("/edit-yard-unit-selection");
      } else if (orderEntry) {
        if (oeUnitIndex === oeUnitData?.length - 1) {
          dispatch(setShowSingleUnitActivation(false));
        } else {
          dispatch(setOeUnitIndex(oeUnitIndex + 1));
        }
      }

      if (delay === "dispatch") {
        dispatch(
          setNewDelayNavigation({
            from: "delayDispatch",
            navigateTo: "/unit-activation-selections",
          })
        );
        navigate(`/delay-processing/new-delayed-unit-confirmation/${companyName}/${unitId}/0`, {
          state: { from: "delayDispatch" },
        });
      } else {
        if (shuttleYardcheckin) {
          navigate("/yard-checkin-unit-selection");
        }
        if (editYardUnit) navigate("/edit-yard-unit-selection");

        if (orderEntry) {
          if (oeUnitIndex === oeUnitData?.length - 1) {
            dispatch(setShowSingleUnitActivation(false));
          } else {
            dispatch(setOeUnitIndex(oeUnitIndex + 1));
          }
        }
      }

      resetValues();
    }
  };

  /**
   * reset values
   **/
  const resetValues = () => {
    setSpecialCodeId(null);
    setSpecialCode("");
    setNoPickupFee(false);
    setNoDeliveryFee(false);
    dispatch(setDelay("none"));
    setReason("");
    setCustomer("");
    setPlant("");
    setPickup("");
    setPickupState("");
    setDelivery("");
    setDeliveryState("");
    setYard("");
    setUnitType("");
    setMiles("");
    setADS("no");
    dispatch(setPostToSister("no"));

    dispatch(setDispatchID(null));
    setRestricted(false);
    dispatch(setActive(false));
    dispatch(setActiveDispatch(false));
    setReserveForDriver(false);
    setDriverId(null);
    setDriverName("");
    setSisterId("");
    setDealerShuttle(false);
    setAdditionalPay("");
    setDeliveryBonus(false);
    setDeliveryBonusDPM(false);
    setDeliveryBonusAmount("");
    setInvoiceBonusAmount("");
    setInvoiceDescription("");
    setBonusDeliveryByDate("");
    setPriority("");
    setOrderDate("");
    setDeliverByDate("");
    dispatch(setLoader(false));
    setPriority("");
    setHold(false);
    setReason("");
    setAuthorizedBy("");
    setNotes("");
    setPars("");
    setGvwr("");
    setShippingWeight("");
    setPostingCompanyFK(null);
  };

  /**
   * Sets values to fields when a unit is selected
   **/
  const setValues = (unit) => {
    dispatch(setUnitNumberLastFive(unit.unitNumberLast5 || ""));
    dispatch(setUnitId(unit.unitPK || null));
    dispatch(setUnitNumber(unit.unitNumber || ""));
    setSpecialCodeId(unit.specialCodeFK || null);
    setSpecialCode(unit.specialCode?.trim() || "");
    setNoPickupFee(unit.noPickupPulloutFee || false);
    setNoDeliveryFee(unit.noDeliveryPulloutFee || false);
    unit.delayDispatch ? dispatch(setDelay("activation")) : dispatch(setDelay("none"));
    setNotes(unit.delayDispatchReason || "");
    setCustomer(unit.customerName || "");
    setPlant(unit.customerPlantName || "");
    setPickup(unit.pickupDealerName || "");
    setPickupState(unit.pickupDealerState || "");
    setDelivery(unit.deliveryDealerName || "");
    setDeliveryState(unit.deliveryDealerState || "");
    setYard(unit.pickupYardName || "");
    setUnitType(unit.unitTypeDescription || "");
    setMiles(unit.miles != null ? unit.miles : "");
    setADS(unit.driverViewOnly ? "view" : unit.driverDispatch ? "dispatch" : "no");
    dispatch(setPostToSister(unit.postToSister || "no"));
    if (unit.postToSister === "hard") {
      setSisterId(unit.sisterCompanyPK || "");
    } else if (unit.postToSister === "softSelect") {
      dispatch(setSelectedCompanies(unit.sisterCompanyPKList));
    }
    setPostedFrom(unit.postedFrom);
    setCanShuttle(unit.canShuttle);
    (!editYardUnit || !shuttleYardcheckin) && dispatch(setDispatchID(unit.dispatchPK || null));
    setRestricted(!isDelayUndispatch ? unit.restrictedDispatch || false : true);
    dispatch(setActiveDispatch(!isDelayUndispatch ? unit.activeDispatch || false : true));
    setAlreadyActivated(unit.alreadyActivated);
    setReserveForDriver(unit.reserved || false);
    setDriverId(unit.driverFK || null);
    setDriverName(unit.reservedDriverName || "");
    setDealerShuttle(unit.dealerShuttle || false);
    setAdditionalPay(unit.bonusPoolRate || "");
    setDeliveryBonus(unit.deliveryBonus || "");
    setDeliveryBonusDPM(unit.deliveryBonusDPM || false);
    setDeliveryBonusAmount(unit.driverDeliveryBonus || "");
    setInvoiceBonusAmount(unit.invoiceDeliveryBonus || "");
    setInvoiceDescription(unit.deliveryBonusDescription || "");
    setBonusDeliveryByDate(
      unit.deliveryBonusDeliverByDate != null
        ? customFormatDate(unit.deliveryBonusDeliverByDate, "yyyy-MM-DD")
        : ""
    );
    if (!isDelayUndispatch) {
      if (unit.activeDispatch !== null) {
        dispatch(setActiveDispatch(unit.activeDispatch));
      } else {
        dispatch(setActiveDispatch(false));
      }
      dispatch(setActive(true));
    }
    setPriority(unit.priority || "");
    setOrderDate(unit.orderDate != null ? unit.orderDate : "");
    setDeliverByDate(unit.deliverByDate != null ? unit.deliverByDate : "");
    setFlatRated(unit.flatRated || false);
    setCompanyBonusPoolValid(unit.companyBonusPoolValid);
    dispatch(setLoader(false));
    setPars(unit.pars != null ? unit.pars : "");
    setGvwr(unit?.gvwr != null ? unit?.gvwr : "");
    setShippingWeight(unit?.shippingWeight != null ? unit?.shippingWeight : "");
    setPostingCompanyFK(unit.postingCompanyFK);
    dispatch(setEnforceScalePlateWeights(unit?.enforceScalePlateWeights));
  };

  /********** Used for Browser back and Intermediate cancel **********/
  const setSavedValues = (unit) => {
    dispatch(setUnitId(unit.unitPK));
    dispatch(setUnitNumber(unit.unitNumber));
    dispatch(setUnitNumberLastFive(unit.unitNumberLast5));
    dispatch(setDispatchID(unit.dispatchPK));
    dispatch(setActive(unit.active));
    dispatch(setActiveDispatch(unit.activeDispatch));
    setAlreadyActivated(unit.alreadyActivated);
    setRestricted(unit.restrictedDispatch);
    setDealerShuttle(unit.dealerShuttle);
    setADS(unit.ads);
    setPriority(unit.priority);
    setSpecialCodeId(unit.specialCodeFK);
    setSpecialCode(unit.specialCode);
    setAdditionalPay(unit.bonusPoolRate);
    setNoPickupFee(unit.noPickupPulloutFee);
    setNoDeliveryFee(unit.noDeliveryPulloutFee);
    dispatch(setDelay(unit.delay));
    setHold(unit.unitOnHold);
    setReason(unit.reason);
    setAuthorizedBy(unit.authorizedBy);
    setNotes(unit.notes);
    setCustomer(unit.customer);
    setPlant(unit.plant);
    setPickup(unit.pickup);
    setPickupState(unit.pickupState);
    setDelivery(unit.delivery);
    setDeliveryState(unit.deliveryState);
    setYard(unit.yard);
    setUnitType(unit.unitType);
    setMiles(unit.miles);
    setOrderDate(unit.orderDate !== null ? unit.orderDate : "");
    setDeliverByDate(unit.deliverByDate !== null ? unit.deliverByDate : "");
    setDeliveryBonus(unit.deliveryBonus);
    setDeliveryBonusDPM(unit.deliveryBonusDPM);
    setDeliveryBonusAmount(unit.driverDeliveryBonus);
    setInvoiceBonusAmount(unit.invoiceDeliveryBonus);
    setInvoiceDescription(unit.deliveryBonusDescription);
    setBonusDeliveryByDate(unit.deliveryBonusDeliverByDate !== null ? unit.deliveryBonusDeliverByDate : "");
    setReserveForDriver(unit.reserved);
    setDriverId(unit.reservedDriverFK);
    setDriverName(unit.driverName);
    dispatch(setPostToSister(unit.post));
    if (unit.postToSister === "hard") {
      setSisterId(unit.sisterCompanyPK || "");
    } else if (unit.postToSister === "softSelect") {
      dispatch(setSelectedCompanies(unit.sisterCompanyPKList));
    }
    setPostedFrom(unit.postedFrom);
    setFlatRated(unit.flatRated);
    setCompanyBonusPoolValid(unit.companyBonusPoolValid);
    setPars(unit.pars !== null ? unit.pars : "");
    setGvwr(unit?.gvwr !== null ? unit?.gvwr : "");
    setShippingWeight(unit?.shippingWeight !== null ? unit?.shippingWeight : "");
    setPostingCompanyFK(unit.postingCompanyFK);
    dispatch(setEnforceScalePlateWeights(unit?.enforceScalePlateWeights));
  };

  const isShippingWeightRequired = (unit, companyData) => {
    if (!unit) return false;
    if (unit.unitTypeMotorized) return false;
    if (unit.unitTypeTowable) {
      return !!(
        companyData?.EnforceScalePlateweights ||
        companyData?.enforceScalePlateweights ||
        companyData?.enforceScalePlateWeights
      );
    }
    return false;
  };

  const isGvwrRequired = (unit) => {
    if (!unit) return false;
    return !!(
      (unit.unitTypeMotorized && unit.multiUnit) ||
      unit.canadianDelivery ||
      unit.canadianPickup ||
      unit.unitTypeTowable
    );
  };

  // Populate value for unit number and last5 when coming from OE
  useEffect(() => {
    if (show && orderEntry && unitNumberOE) {
      dispatch(setUnitNumber(unitNumberOE));
      dispatch(setUnitId(unitIdOE));
      dispatch(setUnitNumberLastFive(last5OE));
    }
  }, [show]);

  /**
   * Calls whenever unit is changed
   * to populate the remaining fields
   **/
  useEffect(() => {
    if (saveData && saveData.unitPK !== null && unitId) {
      setSavedValues(saveData);
      setUnitsLoading(false);
    } else if (selectedUnit && (!saveData || saveData.unitPK === null)) {
      setValues(selectedUnit);
      setUnitsLoading(false);
    }
  }, [selectedUnit]);

  /**
   * Calls whenever unit is changed
   * to update the saveData
   **/
  useEffect(() => {
    if (selectedUnit || breakdownUnitFK)
      dispatch(
        setSaveData({
          unitPK: unitId,
          unitNumber: unitNumber,
          unitNumberLast5: unitNumberLastFive,
          dispatchPK: dispatchID,
          active: active,
          activeDispatch: activeDispatch,
          alreadyActivated: alreadyActivated,
          restrictedDispatch: restricted,
          dealerShuttle: dealerShuttle,
          ads: ads,
          priority: priority,
          specialCodeFK: specialCodeId,
          specialCode: specialCode,
          bonusPoolRate: additionalPay,
          noPickupPulloutFee: noPickupFee,
          noDeliveryPulloutFee: noDeliveryFee,
          delay: delay,
          unitOnHold: hold,
          reason: reason,
          authorizedBy: authorizedBy,
          notes: notes,
          customer: customer,
          plant: plant,
          pickup: pickup,
          pickupState: pickupState,
          delivery: delivery,
          deliveryState: deliveryState,
          yard: yard,
          unitType: unitType,
          miles: miles,
          deliveryBonus: deliveryBonus,
          deliveryBonusDPM: deliveryBonusDPM,
          driverDeliveryBonus: deliveryBonusAmount,
          invoiceDeliveryBonus: invoiceBonusAmount,
          deliveryBonusDescription: invoiceDescription,
          deliveryBonusDeliverByDate: bonusDeliveryByDate,
          reserved: reserveForDriver,
          reservedDriverFK: driverId,
          driverName: driverName,
          post: postToSister,
          sisterCompanyPKList: selectedCompanies,
          sisterCompanyFK: sisterId,
          postedFrom: postedFrom,
          flatRated: flatRated,
          companyBonusPoolValid: companyBonusPoolValid,
          pars: pars,
          gvwr: Number(gvwr),
          shippingWeight: Number(shippingWeight),
          postingCompanyFK: postingCompanyFK,
          companyName: companyName,
          enforceScalePlateWeights: enforceScalePlateWeights,
        })
      );

    if (unitId !== null) {
      if (sisters.length === 0 && postToSister === "hard") fetchSisterCompany();
      if (drivers.length === 0) fetchAllDrivers();
    }
    if (
      unitId !== null &&
      (activeDispatch ||
        (!activeDispatch && selectedUnit != null && selectedUnit.alreadyActivated && selectedUnit.active) ||
        delay === "shuttle" ||
        delay === "dispatch" ||
        (delay === "activation" && notes !== null) ||
        (delay === "none" && selectedUnit != null && selectedUnit.alreadyDelayed) ||
        hold) &&
      (specialCode !== "" ? specialCodeId !== null : true) &&
      (additionalPay !== "" || additionalPay !== null) &&
      isValidDecimalTwoFour(additionalPay) &&
      (selectedUnit !== null
        ? !selectedUnit?.canadianDelivery ||
          (selectedUnit?.canadianDelivery && pars && pars?.trim().length === 7)
        : true) &&
      (selectedUnit !== null ? !isGvwrRequired(selectedUnit) || Number(gvwr) > 0 : true) &&
      (selectedUnit !== null
        ? !isShippingWeightRequired(selectedUnit, currentCompanyData) || Number(shippingWeight) > 0
        : true) &&
      (delay === "activation" ? notes !== "" : true) &&
      (hold ? reason !== "" && authorizedBy !== "" && notes !== "" : true) &&
      (!deliveryBonus ||
        !(Number(deliveryBonusAmount) <= 0 || !isValidDecimalFiveTwo(deliveryBonusAmount))) &&
      (!invoiceBonusAmount ||
        Number(invoiceBonusAmount) === 0 ||
        (!(Number(invoiceBonusAmount) <= 0 || !isValidDecimalFiveTwo(invoiceBonusAmount)) &&
          invoiceDescription)) &&
      (reserveForDriver ? driverId !== null : true) &&
      (postToSister === "hard" ? sisterId !== "" : true) &&
      isbonusDeliveryByDateValid
    ) {
      dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    unitId,
    dispatchID,
    active,
    specialCode,
    specialCodeId,
    activeDispatch,
    restricted,
    dealerShuttle,
    ads,
    priority,
    additionalPay,
    noPickupFee,
    noDeliveryFee,
    delay,
    hold,
    reason,
    authorizedBy,
    notes,
    deliveryBonus,
    deliveryBonusDPM,
    deliveryBonusAmount,
    invoiceBonusAmount,
    invoiceDescription,
    bonusDeliveryByDate,
    reserveForDriver,
    driverId,
    postToSister,
    sisterId,
    unitNumber,
    unitNumberLastFive,
    customer,
    plant,
    pickup,
    pickupState,
    delivery,
    deliveryState,
    yard,
    unitType,
    miles,
    orderDate,
    deliverByDate,
    driverName,
    postedFrom,
    companyBonusPoolValid,
    flatRated,
    pars,
    gvwr,
    shippingWeight,
    postingCompanyFK,
    alreadyActivated,
    companyName,
    currentCompanyData,
    isbonusDeliveryByDateValid,
    enforceScalePlateWeights,
  ]);

  useEffect(() => {
    if ((unitSelected || unitNumberOE) && (unitId || unitIdOE)) {
      lockUnitActivation();
    }
  }, [unitSelected, unitNumberOE, unitIdOE]);

  /**
   * Fetch Unit details when coming from Breakdown Program
   **
   */
  useEffect(() => {
    if (breakdownUnitFK && companyName) {
      const getUnitsById = (breakdownUnitFK) => {
        setUnitsLoading(true);
        let last5 = unitNumberLastFive;
        if (unitId) {
          last5 = "";
        }
        UnitActivationService.getUnitByPk("", last5, 0, 100, companyName, breakdownUnitFK)
          .then((response) => {
            const { data } = response;
            dispatch(setUnitSelected(data));
          })
          .catch(() => {})
          .finally(() => {
            setUnitsLoading(false);
          });
      };
      getUnitsById(breakdownUnitFK);
    }
  }, [companyName]);

  /**
   * Fetch & Populate Unit details when coming from Breakdown Program
   */
  useEffect(() => {
    if (breakdownUnitFK && unitSelected) {
      lockUnitActivation();
    }
  }, [unitSelected]);

  useEffect(() => {
    if (shuttleYardcheckin && unitData) {
      dispatch(setUnitId(unitData.unitPK));
      dispatch(setUnitNumber(unitData.unitNumber));
      dispatch(setUnitSelected(unitData));
    }
  }, [unitData]);

  useEffect(() => {
    if (editYardUnit && editUnitData) {
      dispatch(setUnitId(editUnitData.unitPK));
      dispatch(setUnitNumber(editUnitData.unitNumber));
      dispatch(setUnitSelected({ ...editUnitData, dispatchPK: dispatchID }));
    }
  }, [editUnitData]);

  useEffect(() => {
    if (orderEntry && oeUnitData?.length > 0 && oeUnitIndex < oeUnitData?.length) {
      dispatch(setUnitId(oeUnitData[oeUnitIndex]?.unitPK));
      dispatch(setUnitNumber(oeUnitData[oeUnitIndex]?.unitNumber));
      dispatch(setUnitSelected(oeUnitData[oeUnitIndex]));
    }
  }, [oeUnitData, oeUnitIndex]);

  useEffect(() => {
    if (activeDispatch) {
      dispatch(setActive(true));
    }
  }, [activeDispatch]);

  useEffect(() => {
    if (!hold) {
      setReason("");
      setAuthorizedBy("");
      setNotes("");
    }
  }, [hold]);

  /********** Used for Browser back **********/
  useEffect(() => {
    dispatch(setDelay("none"));
  }, []);

  useEffect(() => {
    if (delay === "activation") {
      if (selectedUnit) setNotes(selectedUnit.delayDispatchReason);
    } else {
      setNotes("");
    }
  }, [delay]);

  useEffect(() => {
    if (reserveForDriver) {
      if (selectedUnit) {
        setDriverId(selectedUnit.reservedDriverFK);
        setDriverName(selectedUnit.reservedDriverName);
      }
    }
  }, [reserveForDriver]);

  useEffect(() => {
    if (deliveryBonus) {
      if (selectedUnit) {
        setDeliveryBonusAmount(selectedUnit.driverDeliveryBonus);
        setInvoiceBonusAmount(selectedUnit.invoiceDeliveryBonus);
        setInvoiceDescription(selectedUnit.deliveryBonusDescription);
        setBonusDeliveryByDate(
          selectedUnit.deliveryBonusDeliverByDate !== null
            ? customFormatDate(selectedUnit.deliveryBonusDeliverByDate, "yyyy-MM-DD")
            : ""
        );
      }
    }
  }, [deliveryBonus]);

  useEffect(() => {
    if (selectedUnit && postToSister === "hard" && sisters?.length === 1) {
      setSisterId(sisters?.[0]?.companyPK);
    } else {
      setSisterId("");
    }
  }, [postToSister, selectedUnit, sisters]);

  useEffect(() => {
    if (!browseType && !props.modal) {
      navigate("/unit-activation-selections");
      return;
    }
    getAllCompanyNames();
  }, [browseType]);

  useEffect(() => {
    if (deliveryBonus && Number(deliveryBonusAmount) > Number(invoiceBonusAmount)) {
      setDeliveryBonusDPM(true);
    } else {
      setDeliveryBonusDPM(false);
    }
  }, [deliveryBonus, deliveryBonusAmount, invoiceBonusAmount]);

  return (
    <div className={`${props.modal ? "" : "customContainer"}`}>
      {(companyLoading || unitsLoading || lockLoading) && <LoadingIcon />}
      <div
        className={`add-form-component ${props.modal ? "" : "threeFourthScreenWidth"}  border border-dark border-2`}
        style={{ margin: "1px" }}
      >
        <UnitActivationHeader closeButton={true} closeHandler={closeHandler} />
        <div className="p-2">
          <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
            <Row className="p-15 mb-3">
              <Col xs={6} className=" ps-4">
                <Form.Group className="mt-2 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  {/* Company */}
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="unit" className="col-form-label dealer-label">
                      Company
                    </Form.Label>
                  </Col>
                  <div className="p-0 col-5 d-flex">
                    <Form.Select
                      className="customFormControl"
                      value={`${companyFK}-${companyName}`}
                      onChange={(e) => {
                        const [companyId, companyName] = e.target.value.split("-");
                        dispatch(setCompanyFK(companyId));
                        dispatch(setCompanyName(companyName));
                        getAllUnitNumbers(unitNumber, unitNumberLastFive, companyName);
                        dispatch(setUnitNumberLastFive(""));
                        dispatch(setUnitId(null));
                        dispatch(setUnitNumber(""));
                      }}
                      style={{ textIndent: "4px" }}
                      disabled={
                        shuttleYardcheckin || editYardUnit || orderEntry
                          ? true
                          : false || isDelayUndispatch || breakdownUnitFK
                      }
                    >
                      {companyList?.map((item) => (
                        <option key={item.companyPK} value={`${item.companyPK}-${item.name}`}>
                          {item.name.toUpperCase()}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
                <Form.Group className="mt-2 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  {/* Last 5 */}
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Last 5
                    </Form.Label>
                  </Col>
                  <div className="p-0 col-1">
                    <input
                      className={` customFormControl`}
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      name="unitNumberLastFive"
                      id="unitNumberLastFive"
                      maxLength={5}
                      value={unitNumberLastFive}
                      disabled={
                        shuttleYardcheckin || editYardUnit || orderEntry || orderEntry
                          ? true
                          : false || isDelayUndispatch || breakdownUnitFK
                      }
                      onChange={(e) => {
                        dispatch(setUnitNumberLastFive(e.target.value));
                        dispatch(setUnitId(null));
                        dispatch(setInProgress(false));
                        dispatch(setUnitNumber(""));
                        getAllUnitNumbers(unitNumber, e.target.value, companyName);
                      }}
                      style={{ width: "75px" }}
                    />
                  </div>
                </Form.Group>
                {/* Unit */}
                <Form.Group className="mt-2 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="unit" className="col-form-label dealer-label">
                      Unit
                    </Form.Label>
                  </Col>
                  <div className="p-0 col-5 d-flex">
                    <AutoCompleteDropdown
                      arrayList={units}
                      searchString={unitNumber}
                      loading={unitSelectionLoading}
                      handleSearchString={(string) => dispatch(setUnitNumber(string))}
                      fetchDataBySearchString={(string) =>
                        getAllUnitNumbers(string, unitNumberLastFive, companyName)
                      }
                      renderItemId={(unit) => unit.unitPK}
                      renderItemField={(unit) => unit.unitNumber}
                      onSelect={handleUnitNumberSelection}
                      clearInputCallback={() => {
                        dispatch(setUnitId(null));
                        if (!editYardUnit || !shuttleYardcheckin) {
                          resetValues();
                        }
                        setPars("");
                        dispatch(setUnitNumberLastFive(""));
                        dispatch(setSelectedUnit(null));
                        dispatch(setSaveData(null));
                      }}
                      handleAutoCompleteClose={() => {
                        dispatch(setUnitId(null));
                        resetValues();
                        dispatch(setUnitNumberLastFive(""));
                        dispatch(setInProgress(false));
                        setPars("");
                      }}
                      selectedId={unitId}
                      searchPlaceholder="ENTER UNIT NUMBER"
                      className={`${
                        shuttleYardcheckin || editYardUnit || orderEntry || breakdownUnitFK
                          ? ""
                          : !unitId || unitNumber === ""
                            ? "borderRed"
                            : shuttleYardcheckin
                              ? ""
                              : "borderGreen"
                      }`}
                      disabled={
                        shuttleYardcheckin || editYardUnit || orderEntry
                          ? true
                          : false || isDelayUndispatch || breakdownUnitFK
                      }
                      inputTextIndent="4px"
                    />
                    <LookupButton
                      onClick={() => setShowUnitSelectionLookup(true)}
                      disabled={
                        shuttleYardcheckin || editYardUnit || orderEntry ? true : false || isDelayUndispatch
                      }
                    />
                  </div>
                </Form.Group>

                <Form.Group
                  className={`mt-3 align-items-center row m-l-0 m-r-0 ms-0 
              }`}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}></Form.Label>
                  </Col>

                  <Col xs={7} className={`p-0 d-flex`}>
                    {/* Active */}
                    <div className="d-flex w-130px align-items-center">
                      <label style={{ width: "100px" }} htmlFor="none">
                        Activate Dispatch
                      </label>{" "}
                      <input
                        type="checkbox"
                        id="activeDispatch"
                        name="activeDispatch"
                        checked={activeDispatch}
                        onChange={(e) => {
                          dispatch(setActiveDispatch(e.target.checked));
                          if (!e.target.checked) {
                            setRestricted(false);
                            setDealerShuttle(false);
                            setADS("no");
                            dispatch(setPostToSister("no"));
                            setDeliveryBonus(false);
                            if (!driverId) setReserveForDriver(false);
                          }
                        }}
                        disabled={
                          !unitId ||
                          delay !== "none" ||
                          hold ||
                          isDelayUndispatch ||
                          (selectedUnit?.restrictedDispatch &&
                            !checkPermission(PROGRAMS.UNIT_ACTIVATION_RESTRICTION, "edit"))
                        }
                      />{" "}
                    </div>
                    {/* Restricted */}
                    <div className="d-flex 10 w-100px me-3 align-items-center">
                      <label className="ms-2" style={{ width: "100px" }} htmlFor="none">
                        Restricted
                      </label>{" "}
                      <input
                        type="checkbox"
                        name="restricted"
                        id="restricted"
                        className="ms-3"
                        checked={restricted}
                        onChange={(e) => {
                          setRestricted(e.target.checked);
                          if (e.target.checked) {
                            setADS("no");
                            dispatch(setPostToSister("no"));
                          }
                        }}
                        disabled={
                          !unitId ||
                          !activeDispatch ||
                          dealerShuttle ||
                          postedFrom ||
                          isDelayUndispatch ||
                          !checkPermission(PROGRAMS.UNIT_ACTIVATION_RESTRICTION, "edit")
                        }
                      />{" "}
                    </div>
                    {/* Dealer Shuttle */}
                    <div className={`d-flex w-60px me-3 align-items-center}`}>
                      <label className="ms-2 " style={{ minWidth: "90px" }} htmlFor="activation">
                        Dealer Shuttle
                      </label>{" "}
                      <input
                        type="checkbox"
                        name="dealerShuttle"
                        id="dealerShuttle"
                        checked={dealerShuttle}
                        onChange={(e) => {
                          setDealerShuttle(e.target.checked);
                          if (e.target.checked) {
                            setRestricted(false);
                            setADS("no");
                            setReserveForDriver(false);
                            setDriverId(null);
                            setDriverName("");
                            dispatch(setPostToSister("no"));
                          }
                        }}
                        disabled={!unitId || !activeDispatch || restricted || !canShuttle || postedFrom}
                      />{" "}
                    </div>
                  </Col>
                </Form.Group>

                {/* Keep Inactive */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} className="p-0">
                    <div className="m-0 p-0 align-items-center d-flex">
                      <div className="p-0 me-3">
                        <Form.Label htmlFor="active" className="col-form-label dealer-label">
                          Keep Dispatch
                        </Form.Label>
                      </div>
                    </div>
                  </Col>
                  <Col xs={2} className="p-0 w-25px me-4 d-flex align-items-center ">
                    <input
                      type="checkbox"
                      id="active"
                      name="active"
                      checked={active}
                      onChange={(e) => {
                        dispatch(setActive(e.target.checked));
                        if (!e.target.checked) {
                          setRestricted(false);
                          setDealerShuttle(false);
                          setADS("no");
                          dispatch(setPostToSister("no"));
                          setReserveForDriver(false);
                          setDriverId(null);
                          setDriverName("");
                          dispatch(setActiveDispatch(false));
                          setDeliveryBonus(false);
                        }
                      }}
                      disabled={
                        !unitId ||
                        postedFrom ||
                        !selectedUnit?.dispatchPK ||
                        (selectedUnit?.restrictedDispatch &&
                          !checkPermission(PROGRAMS.UNIT_ACTIVATION_RESTRICTION, "edit"))
                      }
                    />
                  </Col>
                </Form.Group>

                {/* ADS */}
                <Form.Group
                  className={`mt-3 align-items-center row m-l-0 m-r-0 ms-0 ${!active && "hide-elements"}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>ADS</Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
                    <Col className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="adsNo"
                        id="adsNo"
                        checked={unitId && ads === "no" ? true : false}
                        onChange={(e) => {
                          e.target.checked && setADS("no");
                        }}
                        disabled={!unitId || !active}
                      />{" "}
                      <label htmlFor="adsNo" className="ms-2">
                        No
                      </label>{" "}
                    </Col>
                    <Col className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="adsView"
                        id="adsView"
                        checked={ads === "view"}
                        onChange={(e) => {
                          e.target.checked && setADS("view");
                        }}
                        disabled={
                          !unitId ||
                          restricted ||
                          reserveForDriver ||
                          !activeDispatch ||
                          dealerShuttle ||
                          postedFrom ||
                          postToSister === "hard"
                        }
                      />{" "}
                      <label className="ms-2" htmlFor="adsView">
                        View
                      </label>{" "}
                    </Col>
                    <Col className={`d-flex align-items-center}`}>
                      <input
                        type="radio"
                        name="adsDispatch"
                        id="adsDispatch"
                        checked={ads === "dispatch"}
                        onChange={(e) => {
                          e.target.checked && setADS("dispatch");
                        }}
                        disabled={
                          !unitId ||
                          restricted ||
                          reserveForDriver ||
                          !activeDispatch ||
                          dealerShuttle ||
                          postedFrom ||
                          postToSister === "hard"
                        }
                      />{" "}
                      <label className="ms-2" htmlFor="adsDispatch">
                        Dispatch
                      </label>{" "}
                    </Col>
                  </Col>
                </Form.Group>
                {/* Priority */}
                <Form.Group
                  className={`mt-2 align-items-center d-flex  m-l-0 m-r-0 ${!active && "hide-elements"}`}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="priority" className="col-form-label dealer-label">
                      Priority
                    </Form.Label>
                  </Col>

                  <div className="p-0 w-35px">
                    <input
                      className={` customFormControl`}
                      type="number"
                      name="priority"
                      id="priority"
                      autoComplete="off"
                      aria-autocomplete="list"
                      min={1}
                      max={9}
                      maxLength={1}
                      value={priority}
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
                          setPriority(e.target.value);
                        }
                      }}
                      onBlur={() => {
                        if (!priority) {
                          setPriority(selectedUnit.priority);
                        }
                      }}
                      disabled={!unitId}
                    />
                  </div>
                </Form.Group>

                {/* Special Code */}
                <Form.Group className="mt-2 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label className="col-form-label dealer-label">Special</Form.Label>
                  </Col>
                  <div className="p-0 col-5 d-flex">
                    <AutoComplete
                      searchString={specialCode}
                      handleSearchString={(string) => setSpecialCode(string)}
                      onSelect={handleSpecialCodeSelection}
                      disabled={!unitId || isDelayUndispatch}
                      selectedId={specialCodeId}
                      renderItemId={(code) => code.specialCodePK}
                      renderItemField={(code) => code.description?.trim()}
                      // companyName in the key so a sister company's codes are never served from cache
                      queryKey={["unitActivationSpecialCode", companyName]}
                      queryFn={(term) =>
                        OrderEntryServices.fetchSpecialCodedetails({
                          searchTerm: term || "",
                          isOEPP: "Lookup",
                        })
                      }

                      clearInputCallback={() => {
                        setSpecialCodeId(null);
                      }}
                      className={`${!specialCodeId && specialCode !== "" ? "borderRed" : ""}`}
                    />
                    <LookupButton
                      onClick={() => setShowSpecialCodeLookUp(true)}
                      disabled={!unitId || isDelayUndispatch}
                    />
                  </div>
                </Form.Group>
                {/* PARS */}
                <Form.Group
                  className={`mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0 ${
                    (!selectedUnit?.canadianDelivery || !active) && "hide-elements"
                  }`}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="pars" className="col-form-label dealer-label">
                      PARS
                    </Form.Label>
                  </Col>

                  <div className="p-0 w-120px">
                    <input
                      className={`customFormControl ${
                        !active && !selectedUnit?.canadianDelivery
                          ? ""
                          : pars === "" || pars === null || pars.length < 7
                            ? "borderRed"
                            : ""
                      }`}
                      type="text"
                      name="pars"
                      id="pars"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={7}
                      value={pars}
                      onChange={(e) => {
                        setPars(e.target.value);
                      }}
                      disabled={!unitId}
                    />
                  </div>
                </Form.Group>

                {/* GVWR */}
                <Form.Group className={`mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0 `}>
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="GVWR" className="col-form-label dealer-label">
                      GVWR
                    </Form.Label>
                  </Col>

                  <div className="p-0 w-120px">
                    <input
                      className={`customFormControl ${
                        isGvwrRequired(selectedUnit) && Number(gvwr) <= 0 ? "borderRed" : ""
                      }`}
                      type="text"
                      name="gvwr"
                      id="gvwr"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={10}
                      onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
                      value={gvwr}
                      onChange={(e) => {
                        setGvwr(e.target.value);
                      }}
                      disabled={!unitId}
                    />
                  </div>
                </Form.Group>

                {/* Shipping Weight */}
                <Form.Group className={`mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0 }`}>
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="Shipping Weight" className="col-form-label dealer-label">
                      Shipping Weight
                    </Form.Label>
                  </Col>

                  <div className="p-0 w-120px">
                    <input
                      className={`customFormControl ${
                        isShippingWeightRequired(selectedUnit, currentCompanyData) &&
                        Number(shippingWeight) <= 0
                          ? "borderRed"
                          : ""
                      }`}
                      type="text"
                      name="shippingWeight"
                      id="shippingWeight"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={10}
                      value={shippingWeight}
                      onChange={(e) => {
                        setShippingWeight(e.target.value);
                      }}
                      disabled={!unitId}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mt-2 mb-1 align-items-center d-flex  m-l-0 m-r-0"></Form.Group>
                {/* Delay */}
                <Form.Group
                  className={`mt-2 align-items-center row m-l-0 m-r-0 ms-0 
              }`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>Delay</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                    <div className="d-flex w-60px me-4 align-items-center">
                      <input
                        type="radio"
                        name="none"
                        id="none"
                        checked={unitId && delay === "none"}
                        onChange={(e) => {
                          dispatch(setDelay("none"));
                          setReason("");
                          setNotes("");
                        }}
                        disabled={!unitId}
                      />{" "}
                      <label className="ms-2" htmlFor="none">
                        None
                      </label>{" "}
                    </div>
                    <div className="d-flex w-80px me-4 align-items-center">
                      <input
                        type="radio"
                        name="activation"
                        id="activation"
                        checked={delay === "activation"}
                        onChange={(e) => {
                          dispatch(setDelay("activation"));
                          setHold(false);
                          dispatch(setPostToSister("no"));
                        }}
                        disabled={!unitId || postToSister !== "no" || hold || activeDispatch}
                      />{" "}
                      <label className="ms-2" htmlFor="activation">
                        Activation
                      </label>{" "}
                    </div>
                    <div className={`d-flex w-80px me-3 align-items-center}`}>
                      <input
                        type="radio"
                        name="shuttle"
                        id="shuttle"
                        checked={delay === "shuttle"}
                        onChange={(e) => {
                          dispatch(setDelay("shuttle"));
                          setHold(false);
                          dispatch(setPostToSister("no"));
                          setNotes("");
                        }}
                        disabled={
                          !unitId ||
                          postToSister !== "no" ||
                          hold ||
                          activeDispatch ||
                          selectedUnit?.plantPresent
                        }
                      />{" "}
                      <label className="ms-2" htmlFor="shuttle">
                        Shuttle
                      </label>{" "}
                    </div>
                    <div className={`d-flex w-80px align-items-center}`}>
                      <input
                        type="radio"
                        name="dispatch"
                        id="dispatch"
                        checked={delay === "dispatch"}
                        onChange={(e) => {
                          dispatch(setDelay("dispatch"));
                          setHold(false);
                          dispatch(setPostToSister("no"));
                          setNotes("");
                        }}
                        disabled={!unitId || postToSister !== "no" || hold || activeDispatch}
                      />{" "}
                      <label className="ms-2" htmlFor="dispatch">
                        Dispatch
                      </label>{" "}
                    </div>
                  </Col>
                </Form.Group>
                {/* Hold */}
                <Form.Group className=" align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <div className="p-0 col-3">
                    <Form.Label htmlFor="hold" className="col-form-label dealer-label">
                      Hold
                    </Form.Label>
                  </div>

                  <div className="p-0 w-60px">
                    <input
                      type="checkbox"
                      id="hold"
                      autoComplete="off"
                      checked={hold}
                      onChange={(e) => {
                        setHold(e.target.checked);
                        dispatch(setDelay("none"));
                        if (!e.target.checked) {
                          setReason("");
                          setAuthorizedBy("");
                          setNotes("");
                        }
                      }}
                      disabled={!unitId || postToSister !== "no" || delay !== "none" || activeDispatch}
                    />
                  </div>
                </Form.Group>
                {/* Hold Reason */}
                <Form.Group
                  className={`mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0 ${!hold && "hide-elements"}`}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="reason" className="col-form-label dealer-label">
                      Reason
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5">
                    <input
                      className={`customFormControl ${hold && reason === "" ? "borderRed" : "borderGreen"}`}
                      type="text"
                      id="reason"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={40}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      disabled={!unitId || !hold}
                    />
                  </div>
                </Form.Group>
                {/* Hold  Authorized By */}
                <Form.Group
                  className={`mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0 ${!hold && "hide-elements"}`}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="authorizedBy" className="col-form-label dealer-label">
                      Authorized By
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-4">
                    <input
                      className={`customFormControl ${
                        hold && authorizedBy === "" ? "borderRed" : "borderGreen"
                      }`}
                      type="text"
                      id="authorizedBy"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={authorizedBy}
                      onChange={(e) => setAuthorizedBy(e.target.value)}
                      disabled={!unitId || !hold}
                    />
                  </div>
                </Form.Group>
                {/* Hold Notes / Activation Reason */}
                <Form.Group
                  className={`mb-1 align-items-start d-flex mt-2 m-l-0 m-r-0 ${
                    !hold && delay !== "activation" && "hide-elements"
                  }`}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="notes" className="col-form-label dealer-label">
                      Notes
                    </Form.Label>
                  </Col>
                  <div className="p-0 col-8">
                    <textarea
                      className={`customFormControl customFocusClass w-95 h-100px ${
                        hold || delay === "activation"
                          ? notes === "" || notes === null
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      type="text"
                      id="notes"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={65535}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      disabled={!unitId || (!hold && delay !== "activation")}
                    />
                  </div>
                </Form.Group>
              </Col>
              {/* Customer */}
              <Col xs={6}>
                <Form.Group className=" mb-1 align-items-center d-flex mt-1 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="customer" className="col-form-label dealer-label">
                      Customer
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-4">
                    <input
                      className={` customFormControl`}
                      type="text"
                      id="customer"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={customer}
                      disabled
                    />
                  </div>
                </Form.Group>
                {/* Plant */}
                <Form.Group className=" mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="plant" className="col-form-label dealer-label">
                      Plant
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-4">
                    <input
                      className={` customFormControl`}
                      type="text"
                      id="plant"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={plant}
                      disabled
                    />
                  </div>
                </Form.Group>
                {/* Pickup */}
                <Form.Group className=" mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="pickup" className="col-form-label dealer-label">
                      Pickup
                    </Form.Label>
                  </Col>

                  <div className=" d-flex col-5 pe-0 pe-xl-2  max-w-357" style={{ width: "357px" }}>
                    <input
                      className={` customFormControl `}
                      type="text"
                      id="pickup"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={pickup}
                      disabled
                    />
                    <input
                      className="w-40px  ms-2 customFormControl"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={pickupState}
                      disabled
                    />
                  </div>
                </Form.Group>
                {/* Delivery */}
                <Form.Group className=" mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="delivery" className="col-form-label dealer-label">
                      Delivery
                    </Form.Label>
                  </Col>

                  <div className=" d-flex col-5 pe-0 pe-xl-2 max-w-357" style={{ width: "357px" }}>
                    <input
                      className={`customFormControl`}
                      type="text"
                      id="delivery"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={delivery}
                      disabled
                    />
                    <input
                      className="w-40px  ms-2 customFormControl"
                      type="text"
                      value={deliveryState}
                      disabled
                    />
                  </div>
                </Form.Group>
                {/* Yard */}
                <Form.Group className=" mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="yard" className="col-form-label dealer-label">
                      Yard
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-4">
                    <input
                      className={` customFormControl`}
                      type="text"
                      id="yard"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={yard}
                      disabled
                    />
                  </div>
                </Form.Group>
                {/* Unit Type */}
                <Form.Group className=" mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="unitType" className="col-form-label dealer-label">
                      Unit Type
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-4">
                    <input
                      className={` customFormControl`}
                      type="text"
                      id="unitType"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitType}
                      disabled
                    />
                  </div>
                </Form.Group>
                {/* Miles */}
                <Form.Group className=" mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="miles" className="col-form-label dealer-label">
                      Miles
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-1">
                    <input
                      className={` customFormControl`}
                      type="text"
                      id="miles"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={miles}
                      disabled
                    />
                  </div>
                </Form.Group>
                {/* Order Date */}
                <Form.Group className="mt-2 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="orderDate" className="col-form-label dealer-label">
                      Order Date
                    </Form.Label>
                  </Col>

                  <div className="d-flex flex-shrink-0 p-0 w-110px">
                    <Col xs={2} className="p-0 " style={{ width: "95px" }}>
                      <DateInputField
                        className="customFormControl"
                        name="orderDate"
                        id="orderDate"
                        date={orderDate}
                        disabled
                      />
                    </Col>
                  </div>
                  {/* Deliver By Date */}
                  <Col xs={2} className="p-0 " style={{ width: "95px" }}>
                    <Form.Label htmlFor="deliverByDate" className="col-form-label dealer-label">
                      Deliver By Date
                    </Form.Label>
                  </Col>

                  <div className="d-flex flex-shrink-0 p-0 w-110px">
                    <Col xs={2} className="p-0 " style={{ width: "95px" }}>
                      <DateInputField
                        className="customFormControl"
                        name="deliverByDate"
                        id="deliverByDate"
                        date={deliverByDate}
                        disabled
                      />
                    </Col>
                  </div>
                </Form.Group>

                {/* Additional Pay */}
                <Form.Group
                  className={`mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0 ${
                    (flatRated || !companyBonusPoolValid || !active || postToSister === "hard") &&
                    "hide-elements"
                  }`}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="additionalPay" className="col-form-label dealer-label">
                      Additional Pay
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-1">
                    <input
                      className={`customFormControl ${
                        additionalPay === "" || additionalPay === null
                          ? ""
                          : !isValidDecimalTwoFour(additionalPay)
                            ? "borderRed"
                            : ""
                      }`}
                      type="text"
                      name="additionalPay"
                      id="additionalPay"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={additionalPay}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) && setAdditionalPay(e.target.value);
                      }}
                      disabled={!unitId || !checkPermission(PROGRAMS.UNIT_ACTIVATION_ADDITIONALPAY, "edit")}
                    />
                  </div>
                </Form.Group>
                <Form.Group
                  className={`mt-3 align-items-center row m-l-0 m-r-0 ms-0 
                  ${!active && "hide-elements"}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}></Form.Label>
                  </Col>

                  <Col xs={9} md={9} sm={9} className={`p-0 d-flex`}>
                    {/* No Pickup Fee */}
                    <div className="d-flex w-120px align-items-center">
                      <label style={{ width: "100px" }} htmlFor="noPickupFee">
                        No Pickup Fee
                      </label>{" "}
                      <input
                        type="checkbox"
                        id="noPickupFee"
                        autoComplete="off"
                        checked={noPickupFee}
                        onChange={(e) => setNoPickupFee(e.target.checked)}
                        disabled={
                          !unitId || !checkPermission(PROGRAMS.UNIT_ACTIVATION_FEE_PERMISSION, "edit")
                        }
                      />
                    </div>
                    {/* No Delivery Fee */}
                    <div className="d-flex w-130px me-3 align-items-center">
                      <label className="ms-2" style={{ width: "110px" }} htmlFor="noDeliveryFee">
                        No Delivery Fee
                      </label>{" "}
                      <input
                        type="checkbox"
                        autoComplete="off"
                        checked={noDeliveryFee}
                        onChange={(e) => setNoDeliveryFee(e.target.checked)}
                        disabled={
                          !unitId || !checkPermission(PROGRAMS.UNIT_ACTIVATION_FEE_PERMISSION, "edit")
                        }
                      />
                    </div>
                  </Col>
                </Form.Group>
                {/* Delivery Bonus */}
                <Form.Group className=" align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <div className="p-0 col-3">
                    <Form.Label htmlFor="deliveryBonus" className="col-form-label dealer-label">
                      Delivery Bonus
                    </Form.Label>
                  </div>

                  <div className="p-0 w-60px">
                    <input
                      type="checkbox"
                      id="deliveryBonus"
                      autoComplete="off"
                      checked={deliveryBonus}
                      onChange={(e) => {
                        setDeliveryBonus(e.target.checked);
                        if (!e.target.checked) {
                          setDeliveryBonusAmount("");
                          setInvoiceBonusAmount("");
                          setInvoiceDescription("");
                          setBonusDeliveryByDate("");
                        }
                      }}
                      disabled={
                        !unitId ||
                        !active ||
                        !activeDispatch ||
                        !checkPermission(PROGRAMS.UNIT_ACTIVATION_ADDITIONALPAY, "edit")
                      }
                    />
                  </div>
                </Form.Group>
                {/* Charge DPM */}
                <Form.Group className=" align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <div className="p-0 col-3">
                    <Form.Label htmlFor="deliveryBonusDPM" className="col-form-label dealer-label">
                      Charge DPM
                    </Form.Label>
                  </div>

                  <div className="p-0 w-60px">
                    <input
                      type="checkbox"
                      id="deliveryBonusDPM"
                      autoComplete="off"
                      checked={deliveryBonusDPM}
                      disabled={
                        !deliveryBonus ||
                        Number(deliveryBonusAmount) <= Number(invoiceBonusAmount) ||
                        !checkPermission(PROGRAMS.UNIT_ACTIVATION_ADDITIONALPAY, "edit")
                      }
                      onChange={(e) => setDeliveryBonusDPM(e.target.checked)}
                    />
                  </div>
                </Form.Group>
                {/* Deliver Bonus Amount */}
                <Form.Group
                  className={` mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0 ${
                    !deliveryBonus ? "hide-elements" : ""
                  } `}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="deliveryBonusAmount" className="col-form-label dealer-label">
                      Deliver Bonus Amount
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-1">
                    <input
                      className={` customFormControl ${
                        deliveryBonus &&
                        (Number(deliveryBonusAmount) <= 0 || !isValidDecimalFiveTwo(deliveryBonusAmount))
                          ? "borderRed"
                          : "borderGreen"
                      } `}
                      type="text"
                      id="deliveryBonusAmount"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={deliveryBonusAmount}
                      onBeforeInput={(e) => {
                        // Regex to match any character that is not a number or a dot
                        const invalidChars = /[^\d.]/;
                        // Prevent input if it does not match the allowed characters
                        if (invalidChars.test(e.data)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        setDeliveryBonusAmount(e.target.value)
                      }
                      disabled={!unitId || !checkPermission(PROGRAMS.UNIT_ACTIVATION_ADDITIONALPAY, "edit")}
                    />
                  </div>
                </Form.Group>
                {/* Invoice Bonus Amount */}
                <Form.Group
                  className={` mb-1 align-items-center d-flex mt-2 m-l-0 m-r-0 
                  ${!deliveryBonus ? "hide-elements" : ""}
                  `}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="invoiceBonusAmount" className="col-form-label dealer-label">
                      Invoice Bonus Amount
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-1">
                    <input
                      className={` customFormControl ${
                        invoiceBonusAmount && !isValidDecimalFiveTwo(invoiceBonusAmount) ? "borderRed" : ""
                      } `}
                      type="text"
                      id="invoiceBonusAmount"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={invoiceBonusAmount}
                      onBeforeInput={(e) => {
                        // Regex to match any character that is not a number or a dot
                        const invalidChars = /[^\d.]/;
                        // Prevent input if it does not match the allowed characters
                        if (invalidChars.test(e.data)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          setInvoiceBonusAmount(e.target.value);
                        Number(e.target.value) <= 0 && setInvoiceDescription("");
                      }}
                      disabled={!unitId || !checkPermission(PROGRAMS.UNIT_ACTIVATION_ADDITIONALPAY, "edit")}
                    />
                  </div>
                </Form.Group>
                {/* Invoice Description */}
                <Form.Group
                  className={` mb-1 align-items-center d-flex mt-4 m-l-0 m-r-0 
                  ${!deliveryBonus ? "hide-elements" : ""}
                  `}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="invoiceDescription" className="col-form-label dealer-label">
                      Invoice Description
                    </Form.Label>
                  </Col>
                  <div className="p-0 col-5">
                    <input
                      className={`customFormControl ${
                        Number(invoiceBonusAmount) > 0
                          ? invoiceDescription
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      } `}
                      type="text"
                      id="invoiceDescription"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={50}
                      value={invoiceDescription}
                      onChange={(e) => setInvoiceDescription(e.target.value)}
                      disabled={
                        !unitId ||
                        Number(invoiceBonusAmount) <= 0 ||
                        !checkPermission(PROGRAMS.UNIT_ACTIVATION_ADDITIONALPAY, "edit")
                      }
                    />
                  </div>
                </Form.Group>
                {/* Bonus Deliver By Date */}
                <Form.Group
                  className={` mt-2 mb-1 align-items-center d-flex  m-l-0 m-r-0 
                  ${!deliveryBonus ? "hide-elements" : ""}
                  `}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="bonusDeliveryByDate" className="col-form-label dealer-label">
                      Bonus Deliver By Date
                    </Form.Label>
                  </Col>

                  <div className="d-flex flex-shrink-0 p-0 w-200px">
                    <DateInputField
                      className={!isbonusDeliveryByDateValid ? "borderRed" : ""}
                      name="bonusDeliveryByDate"
                      id="bonusDeliveryByDate"
                      date={bonusDeliveryByDate}
                      min={new Date()}
                      max={deliverByDate ? parseLocalDate(deliverByDate) : ""}
                      setDate={setBonusDeliveryByDate}
                      disabled={!unitId || !checkPermission(PROGRAMS.UNIT_ACTIVATION_ADDITIONALPAY, "edit")}
                      setIsDateValid={setIsbonusDeliveryByDateValid}
                    />
                  </div>
                </Form.Group>
                {/* Reserve For Driver */}
                <Form.Group className=" align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <div className="p-0 col-3">
                    <Form.Label htmlFor="reserveForDriver" className="col-form-label dealer-label">
                      Reserve For Driver
                    </Form.Label>
                  </div>

                  <div className="p-0 w-60px">
                    <input
                      type="checkbox"
                      id="reserveForDriver"
                      autoComplete="off"
                      checked={reserveForDriver}
                      onChange={(e) => {
                        setReserveForDriver(e.target.checked);
                        if (e.target.checked) {
                          dispatch(setPostToSister("no"));
                          setADS("no");
                        } else {
                          setDriverId(null);
                          setDriverName("");
                        }
                      }}
                      disabled={!unitId || !activeDispatch || dealerShuttle || postedFrom}
                    />
                  </div>
                </Form.Group>
                {/* Driver */}
                <Form.Group
                  className={`mt-2 mb-1 align-items-center d-flex  m-l-0 m-r-0 ${
                    !reserveForDriver ? "hide-elements" : ""
                  }`}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Driver
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5 d-flex">
                    <AutoCompleteDropdown
                      className={`${!activeDispatch ? "" : !driverId || driverName === "" ? "borderRed" : "borderGreen"}`}
                      arrayList={drivers}
                      searchString={driverName}
                      loading={driverLoading}
                      handleSearchString={(string) => setDriverName(string)}
                      fetchDataBySearchString={fetchAllDrivers}
                      renderItemId={(driver) => driver.driverPK}
                      renderItemField={(driver) =>
                        driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
                      }
                      onSelect={handleDriverSelection}
                      clearInputCallback={() => setDriverId(null)}
                      selectedId={driverId}
                      searchPlaceholder="ENTER DRIVER NAME"
                      hidden={!reserveForDriver}
                      towardsTop
                      inputTextIndent="4px"
                      disabled={!activeDispatch}
                    />
                    <LookupButton
                      onClick={handleDriverLookupModalShow}
                      hidden={!reserveForDriver || !activeDispatch}
                    />
                  </div>
                </Form.Group>

                {/*  Post To Sister */}
                <Form.Group
                  className={`mt-2 align-items-center row m-l-0 m-r-0 ms-0 
              }`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>Post To Sister</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                    <div className="d-flex w-80px ms-1 align-items-center">
                      <input
                        type="radio"
                        name="postToSister"
                        id="postToSister"
                        checked={unitId && postToSister === "no"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(setPostToSister("no"));
                            setSisterId("");
                          }
                        }}
                        disabled={
                          !unitId ||
                          !active ||
                          !checkPermission(PROGRAMS.UNIT_ACTIVATION_POSTTOSISTER, "edit")
                        }
                      />{" "}
                      <label className="ms-2" htmlFor="postToSister">
                        No
                      </label>{" "}
                    </div>
                    <div className="d-flex w-80px me-3 align-items-center">
                      <input
                        type="radio"
                        name="softAll"
                        id="softAll"
                        checked={postToSister === "softAll"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(setPostToSister("softAll"));
                            setHold(false);
                            dispatch(setDelay("none"));
                            setSisterId("");
                          }
                        }}
                        disabled={
                          !unitId ||
                          restricted ||
                          reserveForDriver ||
                          !activeDispatch ||
                          dealerShuttle ||
                          postedFrom ||
                          hold ||
                          delay !== "none" ||
                          !canSoftPost ||
                          !checkPermission(PROGRAMS.UNIT_ACTIVATION_POSTTOSISTER, "edit")
                        }
                      />{" "}
                      <label className="ms-2" htmlFor="softAll">
                        Soft All
                      </label>{" "}
                    </div>
                    <div className="d-flex w-80px me-3 align-items-center">
                      <input
                        type="radio"
                        name="softSelect"
                        id="softSelect"
                        checked={postToSister === "softSelect"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(setPostToSister("softSelect"));
                            setHold(false);
                            dispatch(setDelay("none"));
                            setSisterId("");
                          }
                        }}
                        disabled={
                          !unitId ||
                          restricted ||
                          reserveForDriver ||
                          !activeDispatch ||
                          dealerShuttle ||
                          postedFrom ||
                          hold ||
                          delay !== "none" ||
                          !canSoftPost ||
                          !checkPermission(PROGRAMS.UNIT_ACTIVATION_POSTTOSISTER, "edit")
                        }
                      />{" "}
                      <label className="ms-2" htmlFor="softSelect">
                        Soft Select
                      </label>{" "}
                    </div>
                    <div className="d-flex w-80px me-3 align-items-center">
                      <input
                        type="radio"
                        name="hard"
                        id="hard"
                        checked={postToSister === "hard"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(setPostToSister("hard"));
                            setHold(false);
                            dispatch(setDelay("none"));
                            setADS("no");
                          }
                        }}
                        disabled={
                          !unitId ||
                          restricted ||
                          reserveForDriver ||
                          !activeDispatch ||
                          dealerShuttle ||
                          postedFrom ||
                          hold ||
                          delay !== "none" ||
                          !canHardPost ||
                          !checkPermission(PROGRAMS.UNIT_ACTIVATION_POSTTOSISTER, "edit")
                        }
                      />{" "}
                      <label className="ms-2" htmlFor="hard">
                        Hard
                      </label>{" "}
                    </div>
                  </Col>
                </Form.Group>
                {/* Sister */}
                <Form.Group
                  className={`mt-2 mb-1 align-items-center d-flex  m-l-0 m-r-0 ${
                    postToSister !== "hard" ? "hide-elements" : ""
                  } `}
                >
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Sister
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5 d-flex">
                    <Form.Select
                      className={` customFormControl  ${
                        postToSister === "hard" ? (!sisterId ? "borderRed" : "borderGreen") : ""
                      }`}
                      name="sister"
                      id="sister"
                      value={sisterId}
                      onChange={(e) => {
                        setSisterId(e.target.value);
                      }}
                      disabled={!unitId || !checkPermission(PROGRAMS.UNIT_ACTIVATION_POSTTOSISTER, "edit")}
                    >
                      <option value={""}>{unitId ? "--SELECT--" : ""}</option>
                      {sisters.length > 0 &&
                        sisters.map((sister) => (
                          <option key={sister.companyPK} value={sister.companyPK}>
                            {sister.name.toUpperCase()}
                          </option>
                        ))}
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        {(editYardUnit || shuttleYardcheckin || orderEntry) &&
          (showUnitActivationDelay || showSpecialCodeLookUp || showUnitActivationSoftPost) && (
            <div className="outerModalOverlay" />
          )}

        <UnitActivationFooter
          saveButton
          cancelButton
          cancelHandler={cancelHandler}
          saveHandler={saveHandler}
        />

        <Modal show={serverError} onHide={() => setServerError(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Server Error</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setServerError(false);
                goBack();
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        {/* SpecialCode Lookup Modal */}
        {showSpecialCodeLookUp && (
          <FormProvider {...lookupFormMethods}>
            <CommonNormalLookup
              id={"specialCodePK"}
              selecedId={specialCodeId}
              show={showSpecialCodeLookUp}
              onHide={() => setShowSpecialCodeLookUp(false)}
              lookupTitle={"Special Code Selection"}
              columns={[
                { label: "Code", key: "code" },
                { label: "Description", key: "description" },
              ]}
              handleLookupSelection={handleSpecialCodeSelection}
              fetchFunction={(params) =>
                OrderEntryServices.fetchSpecialCodedetails({
                  searchTerm: params.searchTerms || "",
                  type: "Lookup",
                  ...params,
                })
              }
            />
          </FormProvider>
        )}
        <DriverLookup
          show={driverSelection}
          onHide={driverModalHide}
          renderItemId={(driver) => driver.driverPK}
          handleLookupSelection={handleDriverSelection}
          UnitActivation
        />
        <UnitSelectionLookup
          show={showUnitSelectionLookup}
          onHide={() => setShowUnitSelectionLookup(false)}
          UnitActivation
          companyName={companyName}
          handleLookupSelection={handleUnitNumberSelection}
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
        <UnitActivationSingleSelectionDelayModal
          show={showUnitActivationDelay}
          onHide={() => {
            dispatch(setShowUnitActivationDelay(false));
          }}
          editYardUnit={editYardUnit}
          shuttleYardcheckin={shuttleYardcheckin}
          orderEntry={orderEntry}
        />
        <UnitActivationSingleSoftPostModal
          show={showUnitActivationSoftPost}
          onHide={() => {
            dispatch(setShowUnitActivationSoftPost(false));
          }}
          editYardUnit={editYardUnit}
          shuttleYardcheckin={shuttleYardcheckin}
          orderEntry={orderEntry}
        />

        <CommonModal
          show={lockError}
          onHide={() => {
            setLockError("");
            dispatch(setUnitId(null));
            dispatch(setUnitNumberLastFive(""));
            dispatch(setSelectedUnit(null));
            dispatch(setUnitNumber(""));
          }}
          title={`Warning !!`}
          body={lockError}
          handleOK={() => {
            setLockError("");
            dispatch(setUnitId(null));
            dispatch(setUnitNumberLastFive(""));
            dispatch(setSelectedUnit(null));
            dispatch(setUnitNumber(""));
          }}
          showOK
          color={lockError ? "red" : ""}
        />
      </div>
    </div>
  );
}

export default UnitActivationSingleSelection;
