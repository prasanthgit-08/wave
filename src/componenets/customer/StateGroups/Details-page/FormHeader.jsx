import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetChanges,
  resetClose,
  resetNormalSort,
  setAssignedPageNo,
  setAssignSortFlag,
  setAssignSortValue,
  setChangesInStatesSelection,
  setReverseFlag,
} from "../../../../redux/StateGroupsSlice";
import ModalComponent from "../../../common/ModalComponent";

const FormHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.stateGroupReducer.viewDetail);
  const [closeShow, setCloseShow] = useState(false);

  const handleClose = () => {
    if (viewDetail === true) {
      navigate("/");
      setCloseShow(false);
      dispatch(resetClose());
      dispatch(resetChanges());
      dispatch(resetNormalSort());
      dispatch(setAssignSortFlag(false));
      dispatch(setAssignSortValue(null));
      dispatch(setReverseFlag(false));
      dispatch(setChangesInStatesSelection(false));
      dispatch(setAssignedPageNo(0));
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/");
    setCloseShow(false);
    dispatch(resetClose());
    dispatch(resetChanges());
    dispatch(setReverseFlag(false));
    dispatch(resetNormalSort());
    dispatch(setAssignSortFlag(false));
    dispatch(setAssignSortValue(null));
    dispatch(setChangesInStatesSelection(false));
    dispatch(setAssignedPageNo(0));
    toast.success("Page closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <button className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5" onClick={handleClose}>
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title={"Close State Group Changes"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default FormHeader;
