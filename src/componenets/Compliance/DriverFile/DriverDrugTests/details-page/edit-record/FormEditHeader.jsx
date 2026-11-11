import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  resetDriverDrugTestData,
  resetDriverDrugTests,
  setChangeColor,
  setIsDrugTestForm,
  setIsTabIdentify,
  setNotify,
  setOnCancel,
  setOverWritePermission,
  setPageNumber,
  setResultClicked,
  setSearchCriteria,
  setSearchTerm,
  setSelectedId,
  setSortFlag,
  setSortValue,
  setViewDetail,
} from "../../../../../../redux/DriverDrugTestsSlice";

const FormEditHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { driverId } = useParams();
  const [closeShow, setCloseShow] = useState(false);

  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const resultClicked = useSelector((state) => state.driverDrugTests.resultClicked);
  const isDrugTestForm = useSelector((state) => state.driverDrugTests.isDrugTestForm);
  const isCloseButtonPopUp = useSelector((state) => state.driverDrugTests.isCloseButtonPopUp);
  const handleCloseYes = () => {
    navigate(`/driver-maintenance-add/${driverId}`);
    toast.success("Page closed");
    dispatch(resetDriverDrugTestData());
    dispatch(setIsDrugTestForm(false));
    dispatch(resetDriverDrugTests());
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
    if (viewDetail && !resultClicked) {
      navigate(`/driver-maintenance-add/${driverId}`);
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(resetDriverDrugTests());
      dispatch(setPageNumber(0));
      dispatch(setSearchCriteria("All"));
      dispatch(setSearchTerm(""));
      dispatch(setSortFlag(false));
      dispatch(setSortValue(null));
      dispatch(setChangeColor(false));
      dispatch(setSelectedId(null));
      dispatch(setIsDrugTestForm(false));
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
        <Modal show={closeShow} onHide={() => setCloseShow(false)} backdrop="static" keyboard={false}>
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

export default FormEditHeader;
