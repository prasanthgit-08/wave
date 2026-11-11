import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setDupInstructionValid,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSelectId,
  setUnitNumberInput,
  setUnitNumberLast5,
  setUnitNumberPK,
} from "../../../../redux/DpuInstructionsSlice";
import { toast } from "react-hot-toast";

function DpuInstructionsViewHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dupInstructionValid = useSelector((state) => state.dpuInstructionsReducer.dupInstructionValid);
  const selectId = useSelector((state) => state.dpuInstructionsReducer.selectId);
  const pageNumber = useSelector((state) => state.dpuInstructionsReducer.pageNumber);
  const handleClose = () => {
    toast.success("Page Closed");
    navigate(`/`);
    dispatch(setUnitNumberPK(""));
    dispatch(setSelectId(""));
    dispatch(setUnitNumberInput(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setPageNumber(0));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setDupInstructionValid(false));
    localStorage.removeItem("dpuInstructionSelectedId");
  };

  useEffect(() => {
    if (dupInstructionValid === false) {
      navigate(`/dpu-view-screen/${selectId}/${pageNumber}`);
    }
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default DpuInstructionsViewHeader;
