import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  resetChanges,
  resetClose,
  setAssignSortFlag,
  setAssignSortValue,
  setPermissionPageNumber,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import ModalComponent from "../../../../common/ModalComponent";
const FormHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [closeShow, setCloseShow] = useState(false);

  const viewDetail = useSelector((state) => state.permissionGroupsReducer.viewDetail);
  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      toast.success("Page Closed");
      setCloseShow(false);
      dispatch(setAssignSortFlag(false));
      dispatch(setAssignSortValue(null));
      dispatch(setPermissionPageNumber(0));
      dispatch(resetChanges());
      dispatch(resetClose());
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(resetClose());

    dispatch(resetChanges());
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Permission Group Changes"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default FormHeader;
