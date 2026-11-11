import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../../../common/Button";
import {
  setActive,
  setSearchCriteria,
  setFirstName,
  setLastName,
  setDriverId,
  setSortType,
  setSortValue,
  setPageNumber,
  setActiveString,
  setDeleased,
  setDriverPictureId,
} from "../../../../../redux/DriverServiceSlice";
import { useNavigate } from "react-router-dom";
import { resetListing, resetSearch, setSelectedDivison } from "../../../../../redux/DealerDriverSearchSlice";

function DriverSelectionfooter() {
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const { driverId } = useSelector((state) => state.driverServicesSlice);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          //route={}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            localStorage.setItem("previousRoute", window.location.pathname);
            naviagte("/reload-drivers-search");
          }}
        >
          Reload
        </button>

        <ButtonComponent
          onClick={() => {
            dispatch(resetListing());
            dispatch(resetSearch());
            dispatch(setSelectedDivison("driveaway"));
          }}
          route={"/state-driver-search/initial"}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"State"}
        />

        <ButtonComponent
          onClick={() => {
            dispatch(resetListing());
            dispatch(resetSearch());
            dispatch(setSelectedDivison("driveaway"));
          }}
          route={"/zipcode-driver-search/initial"}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Zip Code"}
        />

        <ButtonComponent
          onClick={() => {
            dispatch(resetListing());
            dispatch(resetSearch());
            dispatch(setSelectedDivison("driveaway"));
          }}
          route={"/dealer-driver-search/initial"}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Dealer"}
        />
      </div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          //route={}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            naviagte("/driver-service-selection/" + driverId + "/form");
          }}
          disabled={driverId ? false : true}
        >
          Continue
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setActiveString("All"));
            dispatch(setActive(null));
            dispatch(setDeleased(null));
            dispatch(setFirstName(""));
            dispatch(setLastName(""));
            dispatch(setDriverId(null));
            dispatch(setSortType(null));
            dispatch(setSortValue(null));
            dispatch(setPageNumber(0));
            dispatch(setDriverPictureId(null));
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DriverSelectionfooter;
