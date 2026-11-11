import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setActive,
  setActiveKey,
  setActiveString,
  setDeleased,
  setDriverId,
  setDriverPictureId,
  setFirstName,
  setIsProcessedBit,
  setLastName,
  setPageNumber,
  setSearchCriteria,
  setSortType,
  setSortValue,
  setTrailerSearch,
  setTruckSearch,
} from "../../../../redux/DriverServiceSlice";

function DriverServiceHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/");
            dispatch(setActiveKey("general"));
            dispatch(setTrailerSearch(""));
            dispatch(setTruckSearch(""));
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
            dispatch(setIsProcessedBit(false));
            dispatch(setDriverPictureId(null));
          }}
        >
          Close
        </button>

        {/* edit Cancel Confirmation Modal */}
      </div>
    </div>
  );
}

export default DriverServiceHeader;
