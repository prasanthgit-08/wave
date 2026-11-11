import React, { useEffect, useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditFormData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSelectId,
  setUnitNumberInput,
  setUnitNumberLast5,
  setViewDetail,
} from "../../../../redux/DpuInstructionsSlice";
import { t } from "i18next";
import { toast } from "react-hot-toast";

function DpuInstructionsSelectionFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.dpuInstructionsReducer.pageNumber);
  const unitDetails = useSelector((state) => state.dpuInstructionsReducer.unitDetails);
  const selectId = useSelector((state) => state.dpuInstructionsReducer.selectId);

  //cancel
  const handleCancelShow = () => {
    localStorage.removeItem("dpuInstructionSelectedId");
    dispatch(setSelectId(""));
    dispatch(setUnitNumberInput(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setPageNumber(0));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(""));
    toast.success("Selection Cancelled");
  };

  return (
    <div>
      <div className="d-flex  align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            disabled={!selectId || unitDetails.length === 0}
            onClick={() => {
              dispatch(setViewDetail(true));
              navigate(`/dpu-view-screen/${selectId}/${pageNumber}`);
              dispatch(setEditFormData(null));
            }}
          >
            View
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            label={t("cancel.button")}
            type="button"
            onClick={handleCancelShow}
          >
            Cancel
          </button>

          <ModalComponent
            show={false}
            onHide={""}
            title={"Cancel  Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={""}
            handleNO={""}
          />
        </div>
      </div>
    </div>
  );
}

export default DpuInstructionsSelectionFooter;
