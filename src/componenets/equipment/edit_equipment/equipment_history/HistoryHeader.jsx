import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setPageNumber,
  setPageNumberHistory,
  setSortFlag,
  setSortValue,
} from "../../../../redux/EquipmentsSlice";

//this file is need for  equipment history in future
function HistoryHeader() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const viewDetail = useSelector((state) => state.equipmentReducer.viewDetail);
  const pageNumber = useSelector((state) => state.equipmentReducer.pageNumberHistory);

  const [closeShow, setCloseShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    if (viewDetail === true) {
      dispatch(setSortValue(""));
      dispatch(setSortFlag(false));
      dispatch(setPageNumberHistory(0));
      navigate(`/equipment-maintenance-edit/${id}/${pageNumber}`);
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/equipment-maintenance-edit/${id}/${pageNumber}`);
    toast.success("Page closed");
  };
  return (
    <div>
      <div>
        <div className="d-flex  justify-content-end p-t-10 p-b-5 flex-wrap border-bottom">
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
              <Modal.Title className="font-18 h-100">Close Equipment History</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">Please confirm you want to close the program</Modal.Body>

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

export default HistoryHeader;
