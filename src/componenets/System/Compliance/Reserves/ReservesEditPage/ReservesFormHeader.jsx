import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedId,
  setSelectedStatus,
} from "../../../../../redux/ReservesSlice";

function ReservesFormHeader() {
  const viewDetail = useSelector((state) => state.reservesReducer.viewDetail);
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/`);
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(setPageNumber(0));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setChangeColor(false));
      dispatch(setSelectedId(null));
      dispatch(setSelectedStatus("Active"));
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/`);
    toast.success("Page closed");
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setChangeColor(false));
    dispatch(setSelectedId(null));
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
              <Modal.Title className="font-18 h-100">Close Reserve Changes </Modal.Title>
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

export default ReservesFormHeader;
