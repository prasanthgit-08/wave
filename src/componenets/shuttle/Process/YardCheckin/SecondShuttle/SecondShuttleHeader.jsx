import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import {
  setListingData,
  setPageNumber,
  setPageSize,
  setSelectedId,
  setSortFlag,
  setSortValue,
} from "../../../../../redux/YardCheckinSecondShuttleSlice";
import { useDispatch } from "react-redux";
import { setSelectedDriver, setUnitNumberPK } from "../../../../../redux/YardCheckinSlice";

function SecondShuttleHeader() {
  const navigate = useNavigate();
  const pageSizeResetValue = 11;
  const dispatch = useDispatch();

  return (
    <Row className="border border-dark border-2 p-t-10 p-b-10">
      <Col md={12}>
        <Row className="m-0 p-0 justify-content-between">
          <Col md={15} sm={15} lg={15} xs={15} className="p-l-0 text-end align-items-center ">
            <button
              className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-6 `}
              type="button"
              onClick={() => {
                navigate("/");
                dispatch(setSelectedId(null));
                dispatch(setPageNumber(0));
                dispatch(setPageSize(pageSizeResetValue));
                dispatch(setListingData([]));
                dispatch(setSortValue(""));
                dispatch(setSortFlag(false));
                dispatch(setUnitNumberPK(null));
                dispatch(setSelectedDriver(""));
              }}
            >
              Close
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SecondShuttleHeader;
