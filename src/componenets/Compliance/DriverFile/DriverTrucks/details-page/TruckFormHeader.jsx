import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import ModalComponent from "../../../../common/ModalComponent";
import { resetOrderUsers } from "../../../../../redux/CheckPayToSlice";
import { resetDriverTrucks } from "../../../../../redux/DriverTrucksSlice";

const TruckFormHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [closeShow, setCloseShow] = useState(false);
  const { driverId, recordId } = useParams();
  const id = recordId;
  const viewDetails = useSelector((state) => state.driverTrucks.viewDetails);
  const onHandleCloseShow = () => {
    if (viewDetails === true) {
      navigate(`/driver-maintenance-add/${driverId}/0`);
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
    dispatch(resetDriverTrucks());
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate(`/driver-maintenance-add/${driverId}/0`);
    dispatch(resetDriverTrucks());
    dispatch(resetOrderUsers());
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
          title={"Close Truck Maintenance"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default TruckFormHeader;
