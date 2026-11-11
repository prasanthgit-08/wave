import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import {
  handleSelectAll,
  resetSelection,
  setCompanyFK,
  setCompanyName,
  setDriverNameInput,
  setSelectedDriverID,
} from "../../../../../redux/ProcessPaySlice";
import ModalComponent from "../../../../common/ModalComponent";

function PayDriverBrowseFilter() {
  const [closeShow, setCloseShow] = useState(false);
  const processPayData = useSelector((state) => state.processShuttlePayReducer.processPayData);
  const driverNameInput = useSelector((state) => state.processShuttlePayReducer.driverNameInput);
  const pageNumber = useSelector((state) => state.processShuttlePayReducer.pageNumber);
  const companyName = useSelector((state) => state.processShuttlePayReducer.companyName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Row className="border border-dark border-2 p-t-10 p-b-10">
      <Col md={12}>
        <Row className="m-0 p-0 justify-content-between">
          <Col md={9} sm={9} lg={9} xs={9} className="p-l-0">
            <div className="d-flex align-items-center justify-content-start">
              <span className="p-r-10">
                <button
                  type="button"
                  className={`btn btn-secondary btn-sm font-12 px-3`}
                  onClick={() => dispatch(handleSelectAll())}
                  disabled={(pageNumber === 0 && processPayData?.length === 1) || processPayData?.length < 1}
                >
                  Select All
                </button>
              </span>

              <span className="p-l-10 col-3">
                <input
                  type="search"
                  name="searchTerms"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={driverNameInput}
                  disabled
                  autocomplete="autocomplete_off_randString"
                  className="w-100 h-25px"
                />
              </span>
              <span className="p-l-10 col-3">
                <input
                  type="search"
                  name="searchTerms"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={companyName}
                  disabled
                  autocomplete="autocomplete_off_randString"
                  className="w-100 h-25px"
                />
              </span>
            </div>
          </Col>

          <Col md={2} sm={2} lg={2} xs={2} className="p-l-0 text-end align-items-center ">
            <button
              className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-6 `}
              type="button"
              onClick={() => setCloseShow(true)}
            >
              Close
            </button>

            <ModalComponent
              show={closeShow}
              onHide={() => setCloseShow(false)}
              title={"Close Process Shuttle Pay"}
              body={"Please confirm you want to close the program without saving your changes"}
              handleYES={() => {
                navigate("/");
                dispatch(setSelectedDriverID(""));
                dispatch(setDriverNameInput(""));
                dispatch(resetSelection());
                dispatch(setCompanyName(""));
                dispatch(setCompanyFK(null));
              }}
              handleNO={() => setCloseShow(false)}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default PayDriverBrowseFilter;
