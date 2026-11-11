import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDriverMileageLogs,
  resetFields,
  setBeginningDate,
  setEndDate,
  setSelectionType,
  setDescription,
  setIsBeginningDateValid,
  setIsEndDateValid,
  setPageNumber,
  setReserveFundId,
} from "../../../../redux/ReserveFundsLogSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DateInputField from "../../../common/DateInputField";
import AutoComplete from "../../../../components/common/autoComplete";
import ReserveFundsLogService from "../../../../services/ReserveFundsLogService";

const ReserveFundHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId } = useParams();

  const beginningDate = useSelector((state) => state.reserveFundsLog.beginningDate);
  const endDate = useSelector((state) => state.reserveFundsLog.endDate);
  const isBeginningDateValid = useSelector((state) => state.reserveFundsLog.isBeginningDateValid);
  const isEndDateValid = useSelector((state) => state.reserveFundsLog.isEndDateValid);
  const description = useSelector((state) => state.reserveFundsLog.description);
  const reserveFundId = useSelector((state) => state.reserveFundsLog.reserveFundId);

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
        <div className="d-flex align-items-center ms-2">
          <label className="f-w-600 text-nowrap customLabel mb-0 me-2">Beginning Date</label>

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

          <label className="f-w-600 text-nowrap customLabel mb-0 ms-4 me-2">Ending Date</label>

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

          <label className="f-w-600 text-nowrap customLabel mb-0 ms-4 me-2">Description</label>

          <Col xs={4} className="p-0">
            <AutoComplete
              searchString={description}
              handleSearchString={(string) => dispatch(setDescription(string))}
              onSelect={(item) => {
                dispatch(setDescription(item?.Description?.trim()));
                dispatch(setReserveFundId(item.DriverReserveFundPK));
                dispatch(setPageNumber(0));
              }}
              selectedId={reserveFundId}
              renderItemId={(dirver) => dirver.DriverReserveFundPK}
              renderItemField={(dirver) => dirver.Description}
              queryKey={["driverReserve"]}
              queryFn={(term) =>
                ReserveFundsLogService.getReserveFundLogRecords(
                  0,
                  "",
                  true,
                  driverId,
                  "autocomplete",
                  beginningDate,
                  endDate,
                  description
                )
              }
              className={`${description && !reserveFundId ? "borderRed" : ""}`}
              clearInputCallback={() => {
                dispatch(setReserveFundId(null));
              }}
            />
          </Col>
        </div>
        <div className="d-flex align-items-center me-2">
          <button
            className="btn btn-secondary btn-sm font-12 customButtonMediumWidth m-2"
            type=""
            onClick={onHandleCloseShow}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveFundHeader;
