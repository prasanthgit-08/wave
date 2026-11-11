import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetApproveHeld,
  setId,
  setPageNumber,
  setSearchCriteria,
} from "../../../../../redux/ApproveHeldSlice";

const ApproveHeldFormHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);

  const onHandleCloseShow = () => {
    setCloseShow(true);
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(setSearchCriteria("both"));
    dispatch(setPageNumber(0));
    dispatch(setId(null));
    dispatch(resetApproveHeld(true));
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onHandleCloseShow}
        >
          Close
        </button>
        <div>
          <ModalComponent
            show={closeShow}
            onHide={onHandleCloseNo}
            title={"Close Approve Held Shuttle Pay"}
            body="Please confirm you want to close the program without saving your changes"
            handleYES={onHandleCloseYes}
            handleNO={onHandleCloseNo}
          />
        </div>
      </div>
    </div>
  );
};

export default ApproveHeldFormHeader;
