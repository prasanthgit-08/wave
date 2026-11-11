import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../../../../common/ModalComponent";

function DriverAddNotesHeader() {
  const { driverId } = useParams();
  const navigate = useNavigate();

  const [closeShow, setCloseShow] = useState(false);

  // Original data fetched from API
  const driverAddNotes = useSelector((state) => state.driverAddNotesReducer.driverAddNotes);

  // Current values
  const driverServicesNotes = useSelector((state) => state.driverAddNotesReducer.driverServicesNotes);

  const dispatchNotes = useSelector((state) => state.driverAddNotesReducer.dispatchNotes);

  const onHandleCloseShow = () => {
    const notesChanged = (driverServicesNotes || "").trim() !== "";
    const originalDispatchNotes = (driverAddNotes?.dispatchNotes || "").trim();
    const currentDispatchNotes = (dispatchNotes || "").trim();
    const dispatchChanged = originalDispatchNotes !== currentDispatchNotes;
    if (notesChanged || dispatchChanged) {
      setCloseShow(true);
    } else {
      navigate(`/driver-service-selection/${driverId}/form`);
      toast.success("Page Closed");
    }
  };

  const onHandleCloseNo = () => {
    setCloseShow(false);
  };

  const onHandleCloseYes = () => {
    setCloseShow(false);
    navigate(`/driver-service-selection/${driverId}/form`);
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={onHandleCloseNo}
        title="Close Driver Add Notes Changes"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={onHandleCloseYes}
        handleNO={onHandleCloseNo}
      />
    </div>
  );
}

export default DriverAddNotesHeader;
