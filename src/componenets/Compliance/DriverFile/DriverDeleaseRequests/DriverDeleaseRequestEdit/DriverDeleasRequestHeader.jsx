import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetDeleaseRequest,
  setActiveDriver,
  setDeleasedDriver,
  setEditFormData,
  setIsDeleaseProcess,
  setIsDeleaseRequestEdit,
  setIsSettingDeleaseRequestProcessed,
  setUserData,
} from "../../../../../redux/DriverDeleaseRequestsSlice";

const DriverDeleasRequestHeader = () => {
  const { driverId, deleaserequestPK } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.driverDeleaseRequestsReducer.viewDetail);
  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate(`/driver-maintenance-add/${driverId}`);
      dispatch(setActiveDriver(false));
      dispatch(setDeleasedDriver(false));
      dispatch(setEditFormData(null));
      dispatch(resetDeleaseRequest());
      dispatch(setIsDeleaseProcess(false));
      dispatch(setIsSettingDeleaseRequestProcessed(false));
      dispatch(setIsDeleaseRequestEdit(false));
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    dispatch(resetDeleaseRequest());
    dispatch(setActiveDriver(false));
    dispatch(setDeleasedDriver(false));
    dispatch(setEditFormData(null));
    dispatch(resetDeleaseRequest());
    dispatch(setIsDeleaseRequestEdit(false));
    navigate(`/driver-maintenance-add/${driverId}`);
    toast.success("Page Closed");
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
      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Driver Delease Request"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default DriverDeleasRequestHeader;
