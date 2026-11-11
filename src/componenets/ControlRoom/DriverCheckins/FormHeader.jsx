import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setDriverData1,
  setDriverId,
  setEpuScreen,
  setEtaScreen,
  setFirstName,
  setFormData,
  setIsCityState,
  setLastName,
  setNotes,
  setSortType,
  setSortType1,
  setSortValue,
  setSortValue2,
  setSortValueOfunit,
  setUnitId,
} from "../../../redux/DriverCheckinSlice";

function FormHeader() {
  const fromServiceCheckin = localStorage.getItem("fromServiceCheckin") === "true";
  const driverIdFromService = localStorage.getItem("driverId");

  const epuScreen = useSelector((state) => state.driverCheckinReducer.epuScreen);
  const etaScreen = useSelector((state) => state.driverCheckinReducer.etaScreen);
  const driverId = useSelector((state) => state.driverCheckinReducer.driverId);

  const isCityState = useSelector((state) => state.driverCheckinReducer.isCityState);

  const [closeShow, setCloseShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    if (!(etaScreen || epuScreen || isCityState)) {
      dispatch(setFormData(""));
      dispatch(setFirstName(""));
      dispatch(setLastName(""));
      dispatch(setDriverData1(""));
      dispatch(setDriverId(null));
      dispatch(setUnitId(null));
      dispatch(setDriverId(null));
      dispatch(setSortValue(null));
      dispatch(setSortValue2(null));
      dispatch(setSortType(false));
      dispatch(setSortType1(false));
      dispatch(setSortValueOfunit(null));
      dispatch(setEpuScreen(false));
      dispatch(setEtaScreen(false));
      dispatch(setIsCityState(false));
      dispatch(setEtaScreen(false));
      dispatch(setEpuScreen(false));
      dispatch(setNotes(""));
      if (fromServiceCheckin) {
        navigate(`/driver-service-selection/${driverIdFromService}/form`);
      } else {
        navigate(`/`);
      }
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    dispatch(setFormData(""));
    dispatch(setFirstName(""));
    dispatch(setLastName(""));
    dispatch(setDriverData1(""));
    dispatch(setDriverId(null));
    dispatch(setUnitId(null));
    dispatch(setDriverId(null));
    dispatch(setSortValue(null));
    dispatch(setSortValue2(null));
    dispatch(setSortType(false));
    dispatch(setSortType1(false));
    dispatch(setSortValueOfunit(null));
    dispatch(setEpuScreen(false));
    dispatch(setEtaScreen(false));
    dispatch(setIsCityState(false));

    if (fromServiceCheckin) {
      navigate(`/driver-service-selection/${driverIdFromService}/form`);
    } else {
      navigate(`/`);
    }
    toast.success("Page closed");
  };
  return (
    <div>
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div className="col-xs-6">
          <Modal show={closeShow} onHide={handleCloseNo} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">Close</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              Please confirm you want to close the program without saving your changes
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseYes();
                }}
              >
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
