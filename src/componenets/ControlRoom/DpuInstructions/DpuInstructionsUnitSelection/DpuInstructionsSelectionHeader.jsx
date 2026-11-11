import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSelectId,
  setUnitNumberInput,
  setUnitNumberLast5,
  setUnitNumberPK,
} from "../../../../redux/DpuInstructionsSlice";

function DpuInstructionsSelectionHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(`/`);
    dispatch(setUnitNumberPK(""));
    dispatch(setSelectId(""));
    dispatch(setUnitNumberInput(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setPageNumber(0));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(""));
    localStorage.removeItem("dpuInstructionSelectedId");
  };

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

export default DpuInstructionsSelectionHeader;
