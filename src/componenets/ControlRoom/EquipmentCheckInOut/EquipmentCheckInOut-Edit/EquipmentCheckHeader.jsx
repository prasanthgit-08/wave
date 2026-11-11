import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetChanges, resetClose } from "../../../../redux/EquipmentCheckInOutSlice";
import ModalComponent from "../../../common/ModalComponent";
import { useSelector, useDispatch } from "react-redux";
const EquipmentCheckHeader = () => {
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkDetail = useSelector((state) => state.equipmentCheckInOutReducer.checkDetail);

  const handleCloseShow = () => {
    if (checkDetail === true) {
      setCloseShow(true);
    } else {
      navigate("/");
      toast.success("Page Closed");
      dispatch(resetChanges());
      dispatch(resetClose());
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    toast.success("Page Closed");
    dispatch(resetChanges());
    dispatch(resetClose());
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCloseShow}
        >
          Close
        </button>
      </div>
      <ModalComponent
        show={closeShow}
        onHide={onHandleCloseNo}
        title={"Close Equipment Check In/Out Program"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={onHandleCloseYes}
        handleNO={onHandleCloseNo}
      />
    </div>
  );
};

export default EquipmentCheckHeader;
