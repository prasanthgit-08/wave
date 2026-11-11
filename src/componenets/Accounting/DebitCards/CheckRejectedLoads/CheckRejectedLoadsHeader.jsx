import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import { resetChanges } from "../../../../redux/CheckRejectedLoadsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const CheckRejectedLoadsHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const resetList = useSelector((state) => state.checkRejectedLoadReducer.resetList);

  const handleClose = () => {
    if (resetList.length == 0) {
      navigate("/");
      dispatch(resetChanges());
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(resetChanges());
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleClose}
        >
          Close
        </button>{" "}
      </div>
      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Check Rejected Loads"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default CheckRejectedLoadsHeader;
