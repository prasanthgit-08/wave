import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setPageNumber,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setShuttleAmountForPlantToYard,
  setShuttleMilesForPlantToYard,
  setShuttleDateForPlantToYard,
  setStatusForPlantToYard,
  setPickupCityIDForPlantToYard,
  setPickupCityNameForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setDeliveryYardNameForPlantToYard,
  setDeliveryYardCodeForPlantToYard,
  setIsCityYardCombinationExist,
  setRowForPlantToYard,
  setPositionForPlantToYard,
  setGvwrForPlantToYard,
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitNumberInput,
  setUnitShuttlesPK,
  setSecondShuttle,
  setDispatchShuttle,
  setTypeOfShuttle,
  setAdditionalReason,
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setChangeColor,
  setShowUnitActivationScreen,
  setSavedSuccessForPlantToYard,
  setIsToPlant,
} from "../../../../../redux/YardCheckinSlice";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import UnitActivationSingleSelectionScreenModal from "./UnitActivationSingleSelectionScreenModal";
import { setBrowseType, setCompanyName } from "../../../../../redux/UnitActivationSlice";
import { setListingData, setSelectedId } from "../../../../../redux/YardCheckinSecondShuttleSlice";

function PlantToYardFooter() {
  const navigate = useNavigate();
  //navigate, dispatch
  const dispatch = useDispatch();

  const todayDate = formatForApi(new Date());

  //Get value from redux
  const unitShuttlesPK = useSelector((state) => state.yardCheckinReducer.unitShuttlesPK);
  const driverDefaultCompanyName = useSelector((state) => state.yardCheckinReducer.driverDefaultCompanyName);
  const selectedDriverCompany = useSelector(
    (state) => state.yardCheckinReducer.companyNameForDriverSelection
  );
  const selectedDriverFK = useSelector((state) => state.yardCheckinReducer.selectedDriverID);
  const selectedDriverCompanyFK = useSelector(
    (state) => state.yardCheckinReducer.companyNameFKForDriverSelection
  );
  const selectedDriverCompanyDetails = useSelector(
    (state) => state.yardCheckinReducer.selectedDriverCompanyDetails
  );
  const unitNumberFK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const selectedUnitCompanyFK = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyFK);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const isSelectedUnitTowable = useSelector((state) => state.yardCheckinReducer.isSelectedUnitTowable);
  const secondShuttle = useSelector((state) => state.yardCheckinReducer.secondShuttle);
  const additionalReason = useSelector((state) => state.yardCheckinReducer.additionalReason);
  const pickupCityID = useSelector((state) => state.yardCheckinReducer.pickupCityIDForPlantToYard);
  const pickupCityNameForPlantToYard = useSelector(
    (state) => state.yardCheckinReducer.pickupCityNameForPlantToYard
  );
  const deliveryYardID = useSelector((state) => state.yardCheckinReducer.deliveryYardIDForPlantToYard);
  const isPlantToYardRouteConfirmed = useSelector(
    (state) => state.yardCheckinReducer.isPlantToYardRouteConfirmed
  );
  const dropSisterYardCode = useSelector((state) => state.yardCheckinReducer.deliveryYardCodeForPlantToYard);
  const shuttleDate = useSelector((state) => state.yardCheckinReducer.shuttleDateForPlantToYard);
  const shuttleAmount = useSelector((state) => state.yardCheckinReducer.shuttleAmountForPlantToYard);
  const shuttleMilesForPlantToYard = useSelector(
    (state) => state.yardCheckinReducer.shuttleMilesForPlantToYard
  );
  const row = useSelector((state) => state.yardCheckinReducer.rowForPlantToYard);
  const position = useSelector((state) => state.yardCheckinReducer.positionForPlantToYard);
  const status = useSelector((state) => state.yardCheckinReducer.statusForPlantToYard);
  const gvwr = useSelector((state) => state.yardCheckinReducer.gvwrForPlantToYard);
  const isCityYardCombinationExist = useSelector(
    (state) => state.yardCheckinReducer.isCityYardCombinationExist
  );
  const showUnitActivationScreen = useSelector((state) => state.yardCheckinReducer.showUnitActivationScreen);
  const statusForPlantToYard = useSelector((state) => state.yardCheckinReducer.statusForPlantToYard);
  const dispatchShuttle = useSelector((state) => state.yardCheckinReducer.dispatchShuttle);
  const selectedId = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedId);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);

  //modal pop up
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Unit Activation
  const [showUnitActivateModal, setShowUnitActivateModal] = useState(false);

  //Activation Delay Modal
  const [showActivationDelayModal, setShowActivationDelayModal] = useState(false);

  //Loader
  const [loader, setLoader] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [dispatchId, setDispatchId] = useState(false);

  const unitShuttlesVO = {
    unitShuttlePK: unitShuttlesPK,
    driverFK: {
      driverPK: selectedDriverFK,
    },
    driverCompanyFKInt: selectedDriverCompanyFK,
    unitFKInt: unitNumberFK,
    sisterUnitFK: driverDefaultCompanyName === selectedUnitCompanyName ? "" : unitNumberFK,
    unitCompanyFKInt: selectedUnitCompanyFK,
    posted: true,
    postDate: todayDate,
    secondShuttle: secondShuttle,
    secondShuttleHold: selectedDriverCompanyDetails?.approveAdditionalShuttlePay,
    secondShuttleReason: additionalReason,
    plantToYard: true,
    pickupShuttleCityFK: {
      shuttleCityPK: pickupCityID,
    },
    dropYardFK: {
      yardPK: deliveryYardID,
    },
    pickupCity: pickupCityNameForPlantToYard,
    dropSisterYardCode: dropSisterYardCode,
    amount: shuttleAmount,
    miles: shuttleMilesForPlantToYard,
    towable: isSelectedUnitTowable,
    shuttleDate: shuttleDate,
    yardRow: row,
    yardPosition: position,
    status: status,
    gvwr: gvwr !== "" ? gvwr : 0,
    source: "Shuttle Record",
    dispatchShuttle: dispatchShuttle,
    selectedDriverCompanyName: selectedDriverCompany,
    selectedUnitCompanyName: selectedUnitCompanyName,
    checkCrossDB:
      driverDefaultCompanyName === selectedDriverCompany && selectedDriverCompany === selectedUnitCompanyName
        ? false
        : true,
    defaultCompanyName: driverDefaultCompanyName,
    dispatchId: selectedId,
  };

  useEffect(() => {
    dispatch(setCompanyName(selectedUnitCompanyName));
  }, [selectedUnitCompanyName]);

  const saveUnitShuttlesRecord = () => {
    // Show the loader
    setLoader(true);
    YardCheckinService.saveUnitShuttlesRecord(unitShuttlesVO)
      .then((res) => {
        // Hide the loader
        setLoader(false);
        if (res.data !== "") {
          setModalPopUp(true);
        }
      })
      .catch((err) => {
        // Hide the loader
        setLoader(false);
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
        dispatch(setSelectedId(null));
        dispatch(setListingData([]));
      });
  };

  //Onclick function for Save Button
  const handleSaveOnClick = () => {
    saveUnitShuttlesRecord();
  };

  //Onclick function for Cancel Button
  const handleCancelOnClick = () => {
    if (selectedId) {
      navigate("/yard-checkin-second-shuttle");
    } else {
      reset();
      navigate("/yard-checkin-unit-selection");
    }
    setCancelShow(false);
    toast.success("Changes Cancelled");
  };

  const reset = () => {
    dispatch(setPageNumber(0));
    dispatch(setSelectedUnitCompanyName(""));
    dispatch(setSelectedUnitCompanyFK(""));
    //Clear selected unit
    dispatch(setUnitNumberLast5(""));
    dispatch(setChangeColor(false));
    dispatch(setUnitNumberPK(""));
    dispatch(setUnitNumberInput(""));
    dispatch(setSpecialCodeOfSelectedUnit(""));
    dispatch(setIsSelectedUnitTowable(""));
    dispatch(setIsSelectedUnitMotorized(""));
    dispatch(setUnitShuttlesPK(""));
    dispatch(setSecondShuttle(false));
    dispatch(setDispatchShuttle(false));
    dispatch(setTypeOfShuttle(""));
    dispatch(setAdditionalReason(""));
    //Clear Plant to Yard data
    dispatch(setShuttleAmountForPlantToYard(""));
    dispatch(setShuttleMilesForPlantToYard(""));
    dispatch(setShuttleDateForPlantToYard(""));
    dispatch(setStatusForPlantToYard("inYard"));
    dispatch(setPickupCityIDForPlantToYard(""));
    dispatch(setPickupCityNameForPlantToYard(""));
    dispatch(setDeliveryYardIDForPlantToYard(""));
    dispatch(setDeliveryYardNameForPlantToYard(""));
    dispatch(setDeliveryYardCodeForPlantToYard(""));
    dispatch(setIsCityYardCombinationExist(""));
    dispatch(setRowForPlantToYard(""));
    dispatch(setPositionForPlantToYard(""));
    dispatch(setGvwrForPlantToYard(""));
    dispatch(setSelectedId(null));
    dispatch(setListingData([]));
  };

  //modal pop up
  const warningPopupModalHide = () => {
    if (saveError === true) {
      setLoader(false);
      setSaveError(false);
      setErrorMessage("");
      setModalPopUp(false);
    } else {
      setModalPopUp(false);
      if (statusForPlantToYard === "activeDispatch") {
        setShowUnitActivateModal(true);
        dispatch(setBrowseType("SingleUnits"));
      } else if (statusForPlantToYard === "delay") {
        dispatch(setStatusForPlantToYard("inYard"));
        setShowActivationDelayModal(true);
      } else {
        reset();
        dispatch(setSavedSuccessForPlantToYard(true));
        navigate("/yard-checkin-unit-selection");
      }
    }
  };

  const getDispatchFK = () => {
    YardCheckinService.getUnitsDispatch(
      unitNumberFK,
      driverDefaultCompanyName === selectedUnitCompanyName ? "" : unitNumberFK,
      selectedUnitCompanyFK
    )
      .then((res) => {
        if (res.data !== "") {
          setDispatchId(res.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getDispatchFK();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {/* To Plant Button */}
        {!secondShuttle && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => {
              dispatch(setIsToPlant(true));
              navigate("/plant-to-plant-shuttle");
            }}
          >
            To Plant
          </button>
        )}
        {/* Save Button */}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          disabled={
            unitNumberFK !== "" &&
            pickupCityID !== "" &&
            deliveryYardID !== "" &&
            shuttleDate !== "" &&
            isShuttleDateValid &&
            row !== "" &&
            isCityYardCombinationExist === "" &&
            isPlantToYardRouteConfirmed &&
            loader === false
              ? false
              : true
          }
          onClick={handleSaveOnClick}
        >
          {loader === true ? (
            <div className="loader-container">
              <div className="loader_YardCheckin"></div>
            </div>
          ) : (
            "Save"
          )}
        </button>
        {/* Cancel Button */}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => setCancelShow(true)}
        >
          Cancel
        </button>
      </div>
      <WarningModalPopUp
        show={modalPopup}
        onHide={warningPopupModalHide}
        title={saveError === true ? "Error" : "Success"}
        body={saveError === true ? errorMessage : "Plant To Yard shuttle data saved successfully."}
        handleOK={warningPopupModalHide}
        showOK={true}
        color={saveError === true ? "red" : "Black"}
      />
      {/* Unit Activation */}
      <WarningModalPopUp
        show={showUnitActivateModal}
        onHide={() => {
          setShowUnitActivateModal(false);
          reset();
          navigate("/yard-checkin-unit-selection");
        }}
        title={"Unit Activation"}
        body={"Do you want to activate the selected unit?"}
        showYes={true}
        handleYES={() => {
          dispatch(setShowUnitActivationScreen(true));
          setShowUnitActivateModal(false);
        }}
        showNo={true}
        handleNO={() => {
          setShowUnitActivateModal(false);
          reset();
          navigate("/yard-checkin-unit-selection");
        }}
      />
      <UnitActivationSingleSelectionScreenModal
        shuttleYardcheckin
        show={showUnitActivationScreen}
        onHide={() => {
          reset();
          dispatch(setShowUnitActivationScreen(false));
          navigate("/yard-checkin-unit-selection");
        }}
      />
      {/* Activation Delay Modal */}
      <WarningModalPopUp
        show={showActivationDelayModal}
        onHide={() => {
          setShowActivationDelayModal(false);
          reset();
          navigate("/yard-checkin-unit-selection");
        }}
        title={"Activation Delay"}
        body={"Do you want to delay the activation of the selected unit?"}
        showYes={true}
        handleYES={() => {
          navigate("/yard-checkin-activation-delay");
        }}
        showNo={true}
        handleNO={() => {
          setShowActivationDelayModal(false);
          reset();
          navigate("/yard-checkin-unit-selection");
        }}
      />
      <WarningModalPopUp
        show={cancelShow}
        onHide={() => {
          setCancelShow(false);
        }}
        title={"Cancel Plant To Yard Shuttle Changes"}
        body={"Please confirm you want to cancel your changes."}
        showYes={true}
        handleYES={handleCancelOnClick}
        showNo={true}
        handleNO={() => {
          setCancelShow(false);
        }}
      />
    </div>
  );
}

export default PlantToYardFooter;
