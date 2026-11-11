import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import {
  resetDeleaseRequest,
  setDeleaseRequestRecord,
  setFlagStatus,
} from "../../../../redux/Compliance/DriverDeleaseRequestSlice";

function RequestViewHeader() {
  const { deleaserequestPK } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const [viewDetail, setviewDetail] = useState(false);
  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      dispatch(setFlagStatus(""));
      dispatch(setDeleaseRequestRecord(null));
      navigate(`/`);
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate(`/`);
    dispatch(resetDeleaseRequest());
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleCloseShow}
        >
          Close
        </button>{" "}
      </div>
      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Driver Delease Request"}
          body="Please confirm you want to close the program"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
}

export default RequestViewHeader;
