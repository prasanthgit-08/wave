import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import { resetDriverReserves } from "../../../../../redux/DriverReserveSlice";

function DriverRserveHeader() {
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverFK } = useParams();
  const viewDetail = useSelector((state) => state.driverReserveReducer.viewDetail);

  const handleClose = () => {
    if (viewDetail) {
      navigate(`/driver-maintenance-add/${driverFK}`);
      dispatch(resetDriverReserves());
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/driver-maintenance-add/${driverFK}`);
    dispatch(resetDriverReserves());
    toast.success("Page closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <div>
        <ModalComponent
          show={closeShow}
          onHide={handleCloseNo}
          title={"Close Driver Reserve Changes"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
}

export default DriverRserveHeader;
