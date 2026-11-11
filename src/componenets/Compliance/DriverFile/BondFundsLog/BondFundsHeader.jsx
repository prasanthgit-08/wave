import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  resetFields,
  setBeginningDate,
  setEndDate,
  setIsBeginningDateValid,
  setIsEndDateValid,
  setPageNumber,
} from "../../../../redux/BondFundsLogSlice";
import DateInputField from "../../../common/DateInputField";

const BondFundsHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId } = useParams();

  const beginningDate = useSelector((state) => state.bondFundsLog.beginningDate);
  const endDate = useSelector((state) => state.bondFundsLog.endDate);
  const isBeginningDateValid = useSelector((state) => state.bondFundsLog.isBeginningDateValid);
  const isEndDateValid = useSelector((state) => state.bondFundsLog.isEndDateValid);

  const onHandleCloseShow = () => {
    dispatch(resetFields());
    toast.success("Page Closed");
    navigate("/driver-maintenance-add/" + driverId + "/form");
  };

  return (
    <div className="border border-dark border-2 border-bottom-0 border-top-0 border-left-0">
      <div
        className="d-flex align-items-center justify-content-between border-dark border-2 px-3 py-1"
        style={{ minHeight: "48px" }}
      >
        {/* Left Section */}
        <div className="d-flex align-items-center ms-2">
          <label className="f-w-600 customLabel mb-0 me-2">Beginning Date</label>

          <DateInputField
            date={beginningDate}
            setDate={(value) => {
              dispatch(setBeginningDate(value));
              dispatch(setPageNumber(0));
            }}
            setIsDateValid={(value) => dispatch(setIsBeginningDateValid(value))}
            max={endDate ? parseLocalDate(endDate) : ""}
            className={isBeginningDateValid && beginningDate ? "" : "borderRed"}
          />

          <label className="f-w-600 customLabel mb-0 ms-4 me-2">Ending Date</label>

          <DateInputField
            date={endDate}
            setDate={(value) => {
              dispatch(setEndDate(value));
              dispatch(setPageNumber(0));
            }}
            setIsDateValid={(value) => dispatch(setIsEndDateValid(value))}
            min={beginningDate ? parseLocalDate(beginningDate) : ""}
            className={isEndDateValid && endDate ? "" : "borderRed"}
          />
        </div>
        <div className="d-flex align-items-center me-2">
          <button
            className="btn btn-secondary btn-sm font-12 customButtonMediumWidth"
            onClick={onHandleCloseShow}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BondFundsHeader;
