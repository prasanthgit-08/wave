import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setActive,
  setDriverId,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSortType,
  setSortValue,
  setStatewiseList,
} from "../../../../../../../redux/DriverFlashSlice";
function DriverFlashHeader() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const onHandleCloseShow = () => {
    navigate(`/driver-service-selection/${driverId}/form`);
    setCloseShow(false);
    toast.success("Page Closed");
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setActive(null));
    dispatch(setDriverId(null));
    dispatch(setNormalSortFlag(true));
    dispatch(setNormalSortValue("stateName"));
    dispatch(setPageNumber(0));
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
    </div>
  );
}
export default DriverFlashHeader;
