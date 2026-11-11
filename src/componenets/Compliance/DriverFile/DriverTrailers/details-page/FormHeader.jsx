import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  resetDriverTrailers,
  setChangeColor,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedId,
  setSelectedStatus,
  setSortFlag,
  setSortValue,
  setViewDetail,
} from "../../../../../redux/DriverTrailersSlice";
import { Button, Modal } from "react-bootstrap";

const FormHeader = () => {
  const viewDetail = useSelector((state) => state.driverTrailers.viewDetail);
  const isTrailerForm = useSelector((state) => state.driverTrailers.isTrailerForm);
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId } = useParams();
  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/driver-maintenance-add/${driverId}/0`);
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(resetDriverTrailers());
      dispatch(setPageNumber(0));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setSortFlag(false));
      dispatch(setSortValue(null));
      dispatch(setChangeColor(false));
      dispatch(setSelectedId(null));
      dispatch(setSelectedStatus("Active"));
      dispatch(setViewDetail(true));
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => {
    setCloseShow(false);
  };
  const handleCloseYes = () => {
    navigate(`/driver-maintenance-add/${driverId}/0`);
    toast.success("Page closed");
    dispatch(resetDriverTrailers());
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setSortFlag(false));
    dispatch(setSortValue(null));
    dispatch(setChangeColor(false));
    dispatch(setSelectedId(null));
    dispatch(setViewDetail(true));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-6 m-r-5 m-b-5 `}
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6">
        <Modal show={closeShow} onHide={handleCloseNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">Close Trailer Maintenance Changes </Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            Please confirm you want to close the program without saving your changes
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseYes}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleCloseNo}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FormHeader;
