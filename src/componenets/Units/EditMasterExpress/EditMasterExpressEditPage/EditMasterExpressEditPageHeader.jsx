import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { resetUnitSelectionFilters } from "../../../../redux/EditMaster/UnitSelectionSlice";
import { resetFields } from "../../../../redux/EditMasterExpress/EditMasterExpressDispatchDriverPayTabSlice";

function EditMasterExpressEditPageHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local States
  const [closeShow, setCloseShow] = useState(false);
  const onHandleCloseNo = () => setCloseShow(false);

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      setCloseShow(false);
      dispatch(resetFields());
      toast.success("Page Closed");
      dispatch(resetUnitSelectionFilters());
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseYes = () => {
    navigate("/");
    toast.success("Page Closed");
    dispatch(resetFields());
    dispatch(resetUnitSelectionFilters());
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        {/* Close */}
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
        </Modal>
      </div>
    </div>
  );
}

export default EditMasterExpressEditPageHeader;
