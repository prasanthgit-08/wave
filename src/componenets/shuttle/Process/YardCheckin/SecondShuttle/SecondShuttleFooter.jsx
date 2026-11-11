import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ButtonComponent from "../../../../common/Button";
import {
  setSavedSuccessForPlantToPlant,
  setSavedSuccessForPlantToYard,
  setSavedSuccessForYardToPlant,
  setSavedSuccessForYardToYard,
} from "../../../../../redux/YardCheckinSlice";
import {
  setListingData,
  setPageNumber,
  setPageSize,
  setSelectedId,
  setSortFlag,
  setSortValue,
} from "../../../../../redux/YardCheckinSecondShuttleSlice";

function SecondShuttleFooter() {
  const selectedId = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedId);
  const unitShuttleData = useSelector((state) => state.yardCheckinReducer.unitShuttleData);
  const selectedObject = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedObject);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageSizeResetValue = 11;

  const handleNext = () => {
    if (selectedId !== null) {
      if (selectedObject?.PickupYardFK != null && selectedObject?.DeliveryCustomerPLantFK != null) {
        navigate("/yard-to-plant-shuttle");
      } else if (selectedObject?.PickupCustomerPlantFK != null && selectedObject?.DeliveryYardFK != null) {
        navigate("/plant-to-yard-shuttle");
      } else if (
        selectedObject?.PickupCustomerPlantFK != null &&
        selectedObject?.DeliveryCustomerPLantFK != null
      ) {
        navigate("/plant-to-plant-shuttle");
      } else if (selectedObject?.PickupYardFK != null && selectedObject?.DeliveryYardFK != null) {
        navigate("/yard-to-yard-shuttle-process");
      }
    } else {
      if (unitShuttleData) {
        if (
          unitShuttleData.pickupShuttleCityFK?.shuttleCityPK !== undefined &&
          unitShuttleData.dropYardFK?.yardPK !== undefined
        ) {
          dispatch(setSavedSuccessForPlantToYard(false));
          navigate("/plant-to-yard-shuttle");
        } else if (
          unitShuttleData.pickupYardFK?.yardPK !== undefined &&
          unitShuttleData.dropShuttleCityFK?.shuttleCityPK !== undefined
        ) {
          dispatch(setSavedSuccessForYardToPlant(false));
          navigate("/yard-to-plant-shuttle");
        } else {
          dispatch(setSavedSuccessForPlantToYard(false));
          dispatch(setSavedSuccessForYardToPlant(false));
          dispatch(setSavedSuccessForYardToYard(false));
          dispatch(setSavedSuccessForPlantToPlant(false));
          navigate("/additional-shuttle");
        }
      } else {
        dispatch(setSavedSuccessForPlantToYard(false));
        dispatch(setSavedSuccessForYardToPlant(false));
        dispatch(setSavedSuccessForYardToYard(false));
        dispatch(setSavedSuccessForPlantToPlant(false));
        navigate("/additional-shuttle");
      }
    }
  };

  const handleCancel = () => {
    navigate("/yard-checkin-unit-selection");
    toast.success("Changes Cancelled");
    dispatch(setSelectedId(null));
    dispatch(setPageNumber(0));
    dispatch(setPageSize(pageSizeResetValue));
    dispatch(setListingData([]));
    dispatch(setSortValue(""));
    dispatch(setSortFlag(false));
  };

  return (
    <div className=" d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => {
            handleNext();
          }}
        >
          Next
        </button>

        <ButtonComponent
          route={"/yard-checkin-unit-selection"}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Cancel"}
          onClick={handleCancel}
        />
      </div>
    </div>
  );
}

export default SecondShuttleFooter;
