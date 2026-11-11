import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetUnitDetails } from "../../../../../../../redux/PostNoCheckinSlice";
import ModalComponent from "../../../../../../common/ModalComponent";

function PostNoCheckinHeader({ isDirty }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const driverFK = useSelector((state) => state.postNoCheckinReducer.driverFK);
  const dispatchPK = useSelector((state) => state.postNoCheckinReducer.dispatchPK);
  const handleClose = () => {
    if (isDirty) {
      setCloseShow(true);
    } else {
      setCloseShow(false);
      dispatch(resetUnitDetails());
      navigate(`/driver-service-selection/${driverFK}/form`);
      toast.success("Page Closed");
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate(`/driver-service-selection/${driverFK}/form`);
    dispatch(resetUnitDetails());
    toast.success("Page Closed");
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

        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Post No Checkin"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
}

export default PostNoCheckinHeader;
