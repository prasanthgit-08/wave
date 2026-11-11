import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setViewDetail } from "../../../../../../redux/DriverTrailersSlice";
import toast from "react-hot-toast";
import {
  resetDriverDrugTestData,
  resetDriverDrugTests,
  setChangeColor,
  setIsDrugTestForm,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedId,
  setSortFlag,
  setSortValue,
} from "../../../../../../redux/DriverDrugTestsSlice";

const FormAddHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { driverId } = useParams();
  const [closeShow, setCloseShow] = useState(false);

  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const isDrugTestForm = useSelector((state) => state.driverDrugTests.isDrugTestForm);
  const handleCloseYes = () => {
    navigate(`/driver-maintenance-add/${driverId}`);
    toast.success("Page Closed");
    dispatch(resetDriverDrugTests);
    dispatch(resetDriverDrugTestData);
    dispatch(resetDriverDrugTests);
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("All"));
    dispatch(setSearchTerm(""));
    dispatch(setSortFlag(false));
    dispatch(setSortValue(null));
    dispatch(setChangeColor(false));
    dispatch(setSelectedId(null));
    dispatch(setIsDrugTestForm(false));
  };
  const handleCloseNo = () => {
    setCloseShow(false);
  };

  const handleClose = () => {
    if (viewDetail) {
      setCloseShow(false);
      handleCloseYes();
    } else {
      setCloseShow(true);
    }
  };

  useEffect(() => {
    if (isDrugTestForm === false) {
      navigate(`/driver-maintenance-add/${driverId}`);
    }
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      <div className="col-xs-6">
        <Modal show={closeShow} onHide={handleCloseNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">Close Driver Drug Test </Modal.Title>
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

export default FormAddHeader;
