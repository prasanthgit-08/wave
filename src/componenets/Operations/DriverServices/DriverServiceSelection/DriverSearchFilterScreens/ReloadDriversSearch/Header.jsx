import {
  setCancelbtn,
  setDivisionStatus,
  setDriverCdlStatus,
  setIsDeliveryStatesValid,
  setListOfSelectedStates,
  setMiles,
  setSelectedCustomerId,
  setUnitId,
  setPageNumber,
  setChangeColor,
  setPageNumberOfdriver,
  setSortValue,
  setSortType,
  setDriverId,
} from "../../../../../../redux/DriverSearchFilterSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Header() {
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setUnitId(null));
    dispatch(setIsDeliveryStatesValid(false));
    dispatch(setCancelbtn(false));
    dispatch(setMiles(""));
    dispatch(setListOfSelectedStates([]));
    dispatch(setDivisionStatus("driveaway"));
    dispatch(setDriverCdlStatus("cdl"));
    dispatch(setIsDeliveryStatesValid(false));
    dispatch(setSelectedCustomerId(null));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
    dispatch(setPageNumberOfdriver(0));
    dispatch(setSortValue(""));
    dispatch(setSortType(false));
    dispatch(setDriverId(null));
    dispatch(setUnitId(null));
    navigate(`/driver-service-selection`);
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Header;
