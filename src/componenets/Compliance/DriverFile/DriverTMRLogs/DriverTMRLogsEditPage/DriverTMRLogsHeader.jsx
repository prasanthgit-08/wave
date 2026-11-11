import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ModalComponent from "../../../../common/ModalComponent";
import { resetChanges } from "../../../../../redux/DriverTMRLogsSlice";

const DriverTMRLogsHeader = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.driverTMRLogsReducer.viewDetail);
  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate(`/driver-maintenance-add/${id}`);
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(resetChanges());
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate(`/driver-maintenance-add/${id}`);
    dispatch(resetChanges());
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6">
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Driver TMR Log Maintenance"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default DriverTMRLogsHeader;
