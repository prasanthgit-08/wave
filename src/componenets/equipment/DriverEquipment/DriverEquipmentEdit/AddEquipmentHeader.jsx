import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSelectedId,
  setSelectedStatus,
  setSortFlag1,
} from "../../../../redux/DriverEquipmentSlice";

function AddEquipmentHeader() {
  const [closeShow, setCloseShow] = useState(false);
  const currentURL = window.location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const driverFK = useSelector((state) => state.driverEquipmentReducer.driverFK);
  const viewDetail = useSelector((state) => state.driverEquipmentReducer.viewDetail);
  const pageNumber = useSelector((state) => state.driverEquipmentReducer.pageNumber);
  const params = useParams();
  const driverId = params.driverId;
  const id = params.id;

  const handleClose = () => {
    if (viewDetail === true) {
      if (currentURL === `/add-driver-equipment-content/${driverId}/${id}`) {
        navigate(`/assigned-equipment/${driverId}`);
      } else {
        navigate(`/driver-maintenance-add/${driverId}`);
      }
      dispatch(setSelectedId(null));

      dispatch(setSearchTerms(""));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setChangeColor(false));
      dispatch(setSelectedStatus("Active"));
      dispatch(setPageNumber(0));

      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      navigate(`/assigned-equipment/${driverId}`);

      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/assigned-equipment/${driverFK}`);
    dispatch(setSelectedId(null));
    dispatch(setSearchTerms(""));
    dispatch(setSortFlag1(false));

    dispatch(setSearchCriteria("Beginning"));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setChangeColor(false));
    dispatch(setSelectedStatus("Active"));
    dispatch(setPageNumber(0));
    toast.success("Page closed");
    dispatch(resetChanges());
  };
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
              <Modal.Title className="font-18 h-100">Close Equipment </Modal.Title>
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

export default AddEquipmentHeader;
