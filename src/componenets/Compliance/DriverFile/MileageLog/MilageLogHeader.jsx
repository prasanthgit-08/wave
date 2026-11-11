import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDriverMileageLogs,
  setBeginningDate,
  setEndDate,
  setSelectionType,
  setIsBeginningDateValid,
  setIsEndDateValid,
  setPageNumber,
} from "../../../../redux/MileageLogSlice";
import { useNavigate, useParams } from "react-router-dom";
import DateInputField from "../../../common/DateInputField";
// import DateInputField from "...";

const MilageLogHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId } = useParams();

  const [selectedSearchCondition, setSelectedSearchCondition] = useState("safetyMiles");
  const beginningDate = useSelector((state) => state.driverMileageLogs.beginningDate);
  const endDate = useSelector((state) => state.driverMileageLogs.endDate);
  const isBeginningDateValid = useSelector((state) => state.driverMileageLogs.isBeginningDateValid);
  const isEndDateValid = useSelector((state) => state.driverMileageLogs.isEndDateValid);

  const handleSelectSearchOption = (event) => {
    setSelectedSearchCondition(event.target.value);
    dispatch(setSelectionType(event.target.value === "safetyMiles" ? "safety miles" : "load miles"));
  };

  const onHandleCloseShow = () => {
    dispatch(resetDriverMileageLogs());
    navigate(`/driver-maintenance-add/${driverId}/form`);
  };

  return (
    <div className="border border-dark border-2 border-bottom-0 border-top-0 border-left-0">
      <div className="d-flex align-items-center justify-content-between p-t-10 p-b-10 flex-wrap border-bottom border-dark border-2">
        {/* Left Section */}
        <div className="d-flex align-items-center" style={{ marginLeft: "50px" }}>
          {/* Safety Miles */}
          <Col className="p-2 d-flex justify-content-between align-items-center" style={{ width: "140px" }}>
            <label className="f-w-600 customLabel mb-0">Safety Miles</label>

            <input
              type="radio"
              name="milesOption"
              value="safetyMiles"
              checked={selectedSearchCondition === "safetyMiles"}
              onChange={handleSelectSearchOption}
            />
          </Col>

          {/* Loaded Miles */}
          <Col className="p-2 d-flex justify-content-between align-items-center" style={{ width: "140px" }}>
            <label className="f-w-600 customLabel mb-0">Loaded Miles</label>

            <input
              type="radio"
              name="milesOption"
              value="loadMiles"
              checked={selectedSearchCondition === "loadMiles"}
              onChange={handleSelectSearchOption}
            />
          </Col>

          {/* From Date */}
          <div className="d-flex align-items-center ms-4">
            <label className="f-w-600 customLabel me-2 mb-0">Beginning Date</label>

            <DateInputField
              date={beginningDate}
              setDate={(value) => {
                dispatch(setBeginningDate(value));
                dispatch(setPageNumber(0));
              }}
              setIsDateValid={(isValid) => dispatch(setIsBeginningDateValid(isValid))}
              max={endDate && parseLocalDate(endDate)}
              className={isBeginningDateValid && beginningDate ? "" : "borderRed"}
            />
          </div>

          {/* To Date */}
          <div className="d-flex align-items-center ms-3">
            <label className="f-w-600 customLabel me-2 mb-0">Ending Date</label>

            <DateInputField
              date={endDate}
              setDate={(value) => {
                dispatch(setEndDate(value));
                dispatch(setPageNumber(0));
              }}
              setIsDateValid={(isValid) => dispatch(setIsEndDateValid(isValid))}
              min={beginningDate && parseLocalDate(beginningDate)}
              className={isEndDateValid && endDate ? "" : "borderRed"}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-auto">
          <button
            className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
            onClick={onHandleCloseShow}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilageLogHeader;
