import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetBatchChanges,
  resetChanges,
  resetImportChanges,
  resetSelection,
  setBrowseData,
  setBrowseUnits,
  setDelayInputArray,
  setImportList,
  setSelectedDataArray,
  setSelectionRadioValue,
  setSingleUnits,
} from "../../../redux/PlantReleaseSlice";

const PlantReleaseHeader = () => {
  let delayNumber = useSelector((state) => state.plantReleaseReducer.delayNumber);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleCloseShow = () => {
    navigate("/");
    dispatch(setSelectedDataArray([]));
    dispatch(setDelayInputArray([]));
    dispatch(resetChanges());
    dispatch(resetBatchChanges());
    dispatch(setSelectionRadioValue(null));
    dispatch(resetSelection());
    dispatch(setBrowseData([]));
    //clear import states
    dispatch(resetImportChanges());
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2 ">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PlantReleaseHeader;
