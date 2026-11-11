import React, { useState } from "react";
import ModalComponent from "../../../../../../common/ModalComponent";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetData } from "../../../../../../../redux/DriverReportCardSlice";

const ReportCardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { driverId } = useParams();

  const onHandleCloseShow = () => {
    if (window.location.pathname === `/compliance-report-card/${driverId}`) {
      navigate(`/driver-maintenance-add/${driverId}/0`);
    } else {
      navigate(`/driver-service-selection/${driverId}/form`);
    }
    dispatch(resetData());
    toast.success("Page Closed");
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
      <button
        className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
        onClick={onHandleCloseShow}
      >
        Close
      </button>
    </div>
  );
};

export default ReportCardHeader;
