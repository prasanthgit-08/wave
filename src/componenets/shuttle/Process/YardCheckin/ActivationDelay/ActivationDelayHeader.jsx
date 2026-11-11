import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  setTypeOfShuttle,
  setAdditionalReason,
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setChangeColor,
} from "../../../../../redux/YardCheckinSlice";

const ActivationDelayHeader = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={() => {
            reset();
            navigate("/yard-checkin-unit-selection");
          }}
        >
          NoDelay
        </button>
      </div>
    </div>
  );
};

export default ActivationDelayHeader;
