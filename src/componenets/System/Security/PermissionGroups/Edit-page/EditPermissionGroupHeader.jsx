import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  resetChanges,
  resetClose,
  resetNormalSort,
  setAssignSortFlag,
  setAssignSortValue,
  setChangesInPermissioneSelection,
  setReverseFlag,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import ModalComponent from "../../../../common/ModalComponent";

const EditPermissionGroupHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [closeShow, setCloseShow] = useState(false);

  const handleCloseNew = () => {
    setCloseShow(true);
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
    dispatch(setChangesInPermissioneSelection(false));
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleCloseNew}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title={"Close Permission Changes"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default EditPermissionGroupHeader;
