import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setSelectedDriver } from "../../../../../redux/YardCheckinSlice";
import { useDispatch } from "react-redux";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";

function OrderNotEnterHeader() {
  //navigate
  const navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);

  const onHandleCloseNo = () => setCloseShow(false);

  //Onclick function for Close Button
  const onHandleCloseYes = () => {
    dispatch(setSelectedDriver(""));
    navigate("/");
    setCloseShow(false);
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        {/* Close */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => setCloseShow(true)}
        >
          Close
        </button>
      </div>
      <div className="col-xs-6"></div>
      <WarningModalPopUp
        show={closeShow}
        onHide={onHandleCloseNo}
        title={"Close Order Not Enter Unit Changes"}
        body={"Please confirm you want to close the program without saving your changes"}
        showYes={true}
        handleYES={() => {
          onHandleCloseYes();
        }}
        showNo={true}
        handleNO={() => {
          onHandleCloseNo();
        }}
      />
    </div>
  );
}

export default OrderNotEnterHeader;
