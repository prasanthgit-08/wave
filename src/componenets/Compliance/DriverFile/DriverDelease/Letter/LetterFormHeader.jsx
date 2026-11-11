import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import toast from "react-hot-toast";
import { setAdminFee, setChargeAdminFee, setDisablePrint } from "../../../../../redux/DriverDeleaseSlice";

const LetterFormHeader = () => {
  const [closeShow, setCloseShow] = useState(false);
  const { driverId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setCloseShow(true);
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/driver-delease/${driverId}/${id}`);
    dispatch(setChargeAdminFee(false));
    dispatch(setAdminFee(""));
    dispatch(setDisablePrint(false));
    setCloseShow(false);
    toast.success("Page Closed");
  };
  return (
    <div>
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={handleClose}
          >
            Close
          </button>
        </div>
        <div className="col-xs-6">
          <ModalComponent
            show={closeShow}
            onHide={handleCloseNo}
            title={"Close Driver Delease Letter"}
            body="Please confirm you want to close the program"
            handleYES={handleCloseYes}
            handleNO={handleCloseNo}
          />
        </div>
      </div>
    </div>
  );
};

export default LetterFormHeader;
