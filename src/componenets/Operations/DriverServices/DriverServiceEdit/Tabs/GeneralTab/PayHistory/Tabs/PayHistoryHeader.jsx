import { parseLocalDate } from "../../../../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DateInputField from "../../../../../../../common/DateInputField";
import {
  setToDate,
  setFromDate,
  setFromDateDetailsTab,
  setToDateDetailsTab,
  setIsFromDateValid,
  setIsToDateValid,
  resetDriverPayHistory,
  setDateLoading,
} from "../../../../../../../../redux/DriverPayHistorySlice";
import DriverPayHistoryService from "../../../../../../../../services/DriverPayHistoryService";
import formatDatetimeToDate from "../../../../../../../../utils/formatDateTimeToDate";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function PayHistoryHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkHeaderList = useSelector((state) => state.driverPayHistoryReducer.checkHeaderList);
  const driverId = useSelector((state) => state.driverPayHistoryReducer.driverId);
  const fromDate = useSelector((state) => state.driverPayHistoryReducer.fromDate);
  const toDate = useSelector((state) => state.driverPayHistoryReducer.toDate);
  const loader = useSelector((state) => state.driverPayHistoryReducer.dateLoading);

  const [selectedDriverHiredDate, setSelectedDriverHiredDate] = useState("");
  const [isFromDateValidation, setIsFromDateValidation] = useState(true);
  const [isToDateValidation, setIsToDateValidation] = useState(true);

  const handleClose = () => {
    const closingDriverId = driverId;
    dispatch(resetDriverPayHistory());
    navigate(`/driver-service-selection/${closingDriverId}/form`);
    toast.success("Page Closed");
  };

  const getDriverHiredDate = (id) => {
    if (id) {
      dispatch(setDateLoading(true));
      DriverPayHistoryService.getDriverHiredDate(id)
        .then((response) => {
          const { data } = response;
          if (data) {
            dispatch(setFromDate(formatDatetimeToDate(data)));
            dispatch(setToDate(formatDatetimeToDate(new Date())));
            dispatch(setFromDateDetailsTab(formatDatetimeToDate(data)));
            dispatch(setToDateDetailsTab(formatDatetimeToDate(new Date())));
          }
        })
        .catch((error) => {})
        .finally(() => {
          dispatch(setDateLoading(false));
        });
    }
  };
  useEffect(() => {
    getDriverHiredDate(driverId);
  }, [driverId]);

  useEffect(() => {
    setSelectedDriverHiredDate(checkHeaderList[0]?.driver?.hireDate);
  }, [checkHeaderList]);

  useEffect(() => {
    dispatch(setIsFromDateValid(isFromDateValidation));
    dispatch(setIsToDateValid(isToDateValidation));
  }, [isFromDateValidation, isToDateValidation]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
      {/* Centered Date Fields (Shifted to Left) */}
      <div className="d-flex align-items-center" style={{ flexGrow: 1, paddingLeft: "50px" }}>
        <Form.Label className="customColFormLabel w-50px me-2">From</Form.Label>
        {/* a fixed width keeps the field from shrinking when the fetched date replaces the placeholder */}
        <div style={{ width: "110px" }}>
          <DateInputField
            date={fromDate}
            setIsDateValid={setIsFromDateValidation}
            reduxSetDate={(value) => {
              dispatch(setFromDate(value));
              dispatch(setFromDateDetailsTab(value));
            }}
            max={toDate ? parseLocalDate(toDate) : ""}
            min={selectedDriverHiredDate ? parseLocalDate(formatDatetimeToDate(selectedDriverHiredDate)) : ""}
            className={`customFormControl ${loader || (fromDate && isFromDateValidation) ? "" : "borderRed"}`}
          />
        </div>
        <span className="mx-3">To</span>
        <div style={{ width: "110px" }}>
          <DateInputField
            date={toDate}
            reduxSetDate={(value) => {
              dispatch(setToDate(value));
              dispatch(setToDateDetailsTab(value));
            }}
            min={fromDate ? parseLocalDate(fromDate) : ""}
            setIsDateValid={setIsToDateValidation}
            className={`customFormControl ${loader || (toDate && isToDateValidation) ? "" : "borderRed"}`}
          />
        </div>
      </div>

      {/* Close Button (Right Side) */}
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PayHistoryHeader;
