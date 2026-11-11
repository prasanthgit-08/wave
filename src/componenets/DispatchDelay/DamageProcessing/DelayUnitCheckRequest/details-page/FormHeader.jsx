import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetDelayUnitCheck,
  setCheckRequestid,
  setCompanyAmount,
  setDriverAmount,
  setIsCancelledClicked,
  setTotalAmount,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";
import ModalComponent from "../../../../common/ModalComponent";

function FormHeader() {
  const { checkRequestid, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.delayCheckRequest.viewDetail);

  /*****Close Button Operation****/
  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/damage-processing/view-damage/" + id);
      dispatch(resetDelayUnitCheck());
      dispatch(setTotalAmount(""));
      dispatch(setCompanyAmount(""));
      dispatch(setDriverAmount(""));
      dispatch(setCheckRequestid(null));
      dispatch(setIsCancelledClicked(false));
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/damage-processing/view-damage/" + id);
    dispatch(resetDelayUnitCheck());
    dispatch(setTotalAmount(""));
    dispatch(setCompanyAmount(""));
    dispatch(setDriverAmount(""));
    dispatch(setCheckRequestid(null));
    dispatch(setIsCancelledClicked(false));
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
        </button>
      </div>

      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Delay Unit Check Request"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
}

export default FormHeader;
