import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitNumberInput,
  setUnitShuttlesPK,
  setPickupCityIDForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setSecondShuttle,
  setTypeOfShuttle,
  setAdditionalReason,
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setChangeColor,
  setPageNumber,
  setPickupCityNameForPlantToYard,
  setDeliveryYardNameForPlantToYard,
  setDeliveryYardCodeForPlantToYard,
  setPickupYardIDForYardToPlant,
  setPickupYardNameForYardToPlant,
  setPickupYardCodeForYardToPlant,
  setDeliveryCityIDForYardToPlant,
  setDeliveryCityNameForYardToPlant,
  setPickupPlantIDForPlantToPlant,
  setPickupPlantNameForPlantToPlant,
  setPickupPlantCodeForPlantToPlant,
  setDeliveryPlantIDForPlantToPlant,
  setDeliveryPlantNameForPlantToPlant,
  setDeliveryPlantCodeForPlantToPlant,
  setDispatchShuttle,
} from "../../../../../redux/YardCheckinSlice";
import { setListingData, setSelectedId } from "../../../../../redux/YardCheckinSecondShuttleSlice";

function AdditionalShuttleFooter() {
  const navigate = useNavigate();

  //navigate, dispatch
  const dispatch = useDispatch();

  //Local State
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const typeOfShuttle = useSelector((state) => state.yardCheckinReducer.typeOfShuttle);
  const additionalReason = useSelector((state) => state.yardCheckinReducer.additionalReason);

  //handleProcessOnClick
  // Screen Navigations based on Type of Shuttle
  const handleProcessOnClick = () => {
    switch (typeOfShuttle) {
      case "plantToYard":
        navigate("/plant-to-yard-shuttle");
        break;

      case "yardToPlant":
        navigate("/yard-to-plant-shuttle");
        break;

      case "yardToYard":
        navigate("/yard-to-yard-shuttle-process");
        break;

      case "plantToPlant":
        navigate("/plant-to-plant-shuttle");
        break;

      default:
        navigate("/");
        break;
    }
  };

  const handleCancelOnClick = () => {
    dispatch(setSelectedUnitCompanyName(""));
    dispatch(setSelectedUnitCompanyFK(""));
    //Clear selected unit
    dispatch(setUnitNumberLast5(""));
    dispatch(setChangeColor(false));
    dispatch(setUnitNumberPK(""));
    dispatch(setUnitNumberInput(""));
    dispatch(setPageNumber(0));
    dispatch(setSpecialCodeOfSelectedUnit(""));
    dispatch(setIsSelectedUnitTowable(""));
    dispatch(setIsSelectedUnitMotorized(""));
    dispatch(setUnitShuttlesPK(""));
    dispatch(setPickupCityIDForPlantToYard(""));
    dispatch(setDeliveryYardIDForPlantToYard(""));
    dispatch(setSecondShuttle(false));
    dispatch(setTypeOfShuttle(""));
    dispatch(setAdditionalReason(""));
    dispatch(setPickupCityIDForPlantToYard(""));
    dispatch(setPickupCityNameForPlantToYard(""));
    dispatch(setDeliveryYardIDForPlantToYard(""));
    dispatch(setDeliveryYardNameForPlantToYard(""));
    dispatch(setDeliveryYardCodeForPlantToYard(""));
    dispatch(setPickupYardIDForYardToPlant(""));
    dispatch(setPickupYardNameForYardToPlant(""));
    dispatch(setPickupYardCodeForYardToPlant(""));
    dispatch(setDeliveryCityIDForYardToPlant(""));
    dispatch(setDeliveryCityNameForYardToPlant(""));
    dispatch(setPickupPlantIDForPlantToPlant(""));
    dispatch(setPickupPlantNameForPlantToPlant(""));
    dispatch(setPickupPlantCodeForPlantToPlant(""));
    dispatch(setDeliveryPlantIDForPlantToPlant(""));
    dispatch(setDeliveryPlantNameForPlantToPlant(""));
    dispatch(setDeliveryPlantCodeForPlantToPlant(""));
    dispatch(setDispatchShuttle(false));
    dispatch(setSelectedId(null));
    dispatch(setListingData([]));
    navigate("/yard-checkin-unit-selection");
    toast.success("Changes Cancelled");
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {/* Process */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          disabled={
            unitNumberSelected !== "" && typeOfShuttle !== "" && additionalReason?.trim() !== ""
              ? false
              : true
          }
          onClick={handleProcessOnClick}
        >
          Next
        </button>

        {/* Cancel */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancelOnClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AdditionalShuttleFooter;
