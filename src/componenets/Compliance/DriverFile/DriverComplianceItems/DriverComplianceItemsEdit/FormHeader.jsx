import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setDriverComplianceItemFK,
  setDriverFK,
  setNormalSortFlag,
  setNormalSortValue,
  setNumber,
  setPageNumber,
  setPageNumberOfdriver,
  setSearchCriteria,
  setSearchTerm,
} from "../../../../../redux/DriverComplianceItemsSlice";

function FormHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId, id } = useParams();
  const [closeShow, setCloseShow] = useState(false);
  const pageNumberForDriverComplianceItem = localStorage.getItem("pageNumberForDriverComplianceItem");

  const viewDetail = useSelector((state) => state.DriverComplianceItemsReducer.viewDetail);

  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/driver-maintenance-add/${driverId}/${pageNumberForDriverComplianceItem}`);

      dispatch(setSearchTerm(""));
      dispatch(setSearchCriteria("Biginning"));
      dispatch(setDriverComplianceItemFK(null));
      dispatch(setPageNumber(0));
      dispatch(setNumber(0));
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/driver-maintenance-add/${driverId}/${pageNumberForDriverComplianceItem}`);
    dispatch(setSearchTerm(""));
    dispatch(setSearchCriteria("Biginning"));
    dispatch(setDriverComplianceItemFK(null));
    dispatch(setPageNumber(0));
    dispatch(setNumber(0));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    toast.success("Page closed");
  };

  useEffect(() => {
    const driverComplianceFromDriver = localStorage.getItem("driverComplianceFromDriver");
    if (driverComplianceFromDriver === "true") {
      const pageNumberForDriverComplianceItem = localStorage.getItem("pageNumberForDriverComplianceItem");
      if (pageNumberForDriverComplianceItem) {
        dispatch(setPageNumberOfdriver(pageNumberForDriverComplianceItem));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setDriverFK(driverId));
  }, [driverId, dispatch]);
  return (
    <div>
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type=""
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div className="col-xs-6">
          <Modal show={closeShow} onHide={handleCloseNo} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">Close Driver Compliance Item </Modal.Title>
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
    </div>
  );
}

export default FormHeader;
