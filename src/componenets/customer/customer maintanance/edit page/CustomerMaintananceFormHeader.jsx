import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { setViewDetail, setEditMode } from "../../../../redux/CustomerMaintenanceSlice";
import { resetSearch } from "../../../../redux/CustomerSearchFilterSlice";
import { setPageNumber } from "../../../../redux/PaginationSlice";

function CustomerMaintananceFormHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const [closeShow, setCloseShow] = useState(false);

  const onHandleCloseNo = () => setCloseShow(false);

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      dispatch(setEditMode(false));
      navigate("/");
      setCloseShow(false);
      dispatch(resetSearch());
      dispatch(setPageNumber(0));
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseYes = () => {
    dispatch(setViewDetail(true));
    dispatch(setEditMode(false));
    navigate("/");
    dispatch(resetSearch());
    dispatch(setPageNumber(0));
    toast.success("Page Closed");
  };

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6">
        <Modal show={closeShow} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">Close Customer Changes</Modal.Title>
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
        </Modal>
      </div>
    </div>
  );
}

export default CustomerMaintananceFormHeader;
