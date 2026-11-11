import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import { resetChanges } from "../../../redux/EditPrinterSlice";
import {
  setChangeColor,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSortType,
  setSortValue,
} from "../../../redux/PrinterSearchFilterSlice";

function FormPrinterHeader() {
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const onHandleCloseNo = () => setCloseShow(false);
  const dispatch = useDispatch();

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(setPageNumber(0));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSearchTerms(""));
      dispatch(setChangeColor(false));
      dispatch(setSortType(false));
      dispatch(setSortValue(""));
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(resetChanges());
    toast.success("Page Closed");
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerms(""));
    dispatch(setChangeColor(false));
    dispatch(setSortType(false));
    dispatch(setSortValue(""));
  };

  let viewDetail = useSelector((state) => state.editPrinterReducer.viewDetail);

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
            <Modal.Title className="font-18 h-100">Close Printer Changes</Modal.Title>
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

export default FormPrinterHeader;
