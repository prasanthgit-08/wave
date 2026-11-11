import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuaterScreen from "../../../../styles/QuarterScreen.module.css";
import ModalComponent from "../../../common/ModalComponent";
import { resetChanges, resetPortsOfEntry } from "../../../../redux/PortsOfEntrySlice";

function PortsOfEntryHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.portsOfEntryReducer.viewDetail);

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      dispatch(resetPortsOfEntry());
      dispatch(resetChanges());
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(resetPortsOfEntry());
    dispatch(resetChanges());
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary ${QuaterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Ports Of Entry"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
}

export default PortsOfEntryHeader;
