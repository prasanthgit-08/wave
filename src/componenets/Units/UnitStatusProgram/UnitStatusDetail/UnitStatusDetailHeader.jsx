import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetUnitSelectionFilters,
  resetUnitStatusInnerStates,
  setUnitSelectionData,
} from "../../../../redux/UnitStatus/UnitStatusSlice";
import toast from "react-hot-toast";

function UnitStatusDetailHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentStatus = useSelector((state) => state.unitStatusReducer.currentStatus);

  const onHandleCloseShow = () => {
    navigate("/");
    dispatch(resetUnitSelectionFilters());
    dispatch(resetUnitStatusInnerStates());
    dispatch(setUnitSelectionData(""));
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between p-t-10 px-3 p-b-5 flex-wrap border-bottom border-dark border-2">
        {/* Close */}
        <input type="text" value={currentStatus} disabled className="col-1" />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6">
        {/* <Modal show={closeShow} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100">Close Edit Master Express Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-14 h-100">
          Please confirm you want to close the program without saving your changes
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={onHandleCloseYes}>
            Yes
          </Button>
          <Button variant="secondary" onClick={onHandleCloseNo}>
            No
          </Button>
        </Modal.Footer>
      </Modal> */}
      </div>
    </div>
  );
}

export default UnitStatusDetailHeader;
