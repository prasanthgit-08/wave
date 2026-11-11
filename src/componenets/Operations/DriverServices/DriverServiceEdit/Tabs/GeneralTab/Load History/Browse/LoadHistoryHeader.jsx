import { formatForApi, parseLocalDate } from "../../../../../../../../utils/dateUtils";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBrowse,
  setDateLoading,
  setFromDate,
  setFromDateValid,
  setToDate,
  setToDateValid,
} from "../../../../../../../../redux/LoadHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import DateInputField from "../../../../../../../common/DateInputField";
import { Col, Form } from "react-bootstrap";
import DriverService from "../../../../../../../../services/DriverService";

function LoadHistoryHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { driverId } = useParams();

  const toDate = useSelector((state) => state.loadHistory.toDate);
  const fromDate = useSelector((state) => state.loadHistory.fromDate);
  const toDateValid = useSelector((state) => state.loadHistory.toDateValid);
  const fromDateValid = useSelector((state) => state.loadHistory.fromDateValid);

  const onHandleCloseShow = () => {
    dispatch(resetBrowse());
    navigate("/driver-service-selection/" + driverId + "/form");
  };
  useEffect(() => {
    if (fromDate && toDate) return;
    dispatch(setDateLoading(true));
    DriverService.getHireDateById(driverId)
      .then(({ data }) => {
        dispatch(setFromDate(formatForApi(parseLocalDate(data))));
      })
      .catch(() => dispatch(setFromDate(formatForApi(new Date()))))
      .finally(() => dispatch(setDateLoading(false)));

    dispatch(setToDate(formatForApi(new Date())));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between border-bottom border-dark border-2 align-items-center">
        <div className="ms-5 d-flex">
          <Form.Group className=" d-flex justify-content-between align-items-center col  ms-4 m-r-0">
            <Col xs={3} className="p-0 me-2">
              <Form.Label className="customColFormLabel">From:</Form.Label>
            </Col>
            <Col xs={3} className="p-0 w-95px">
              <DateInputField
                date={fromDate}
                name="requestDate"
                reduxSetDate={(value) => {
                  dispatch(setFromDate(value));
                }}
                setIsDateValid={(e) => {
                  dispatch(setFromDateValid(e));
                }}
                className={`customFormControl ${fromDateValid && fromDate ? "" : "borderRed"}`}
                max={new Date()}
              />
            </Col>
          </Form.Group>
          <Form.Group className="d-flex justify-content-between  align-items-center col  ms-4 m-r-0">
            <Col xs={3} className="p-0">
              <Form.Label className="customColFormLabel">To:</Form.Label>
            </Col>
            <Col xs={3} className="p-0 w-95px">
              <DateInputField
                date={toDate}
                name="requestDate"
                reduxSetDate={(value) => {
                  dispatch(setToDate(value));
                }}
                setIsDateValid={(e) => {
                  dispatch(setToDateValid(e));
                }}
                className={`customFormControl ${toDateValid && toDate ? "" : "borderRed"}`}
                max={new Date()}
              />
            </Col>
          </Form.Group>
        </div>

        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap ">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={onHandleCloseShow}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoadHistoryHeader;
