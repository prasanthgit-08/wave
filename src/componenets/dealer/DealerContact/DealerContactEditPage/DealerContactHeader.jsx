import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setPageNumber,
  setSearchCrit,
  setSearchTerm,
  setSelectedId,
  setSortType,
  setSortValue,
} from "../../../../redux/DealerContacts";

function DealerContactHeader() {
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  const pagenum = params.pageNumber;
  const navigate = useNavigate();

  const { editMode } = useSelector((state) => state.dealerContacts);

  const [closeShow, setCloseShow] = useState(false);

  const onHandleCloseNo = () => setCloseShow(false);

  const onHandleCloseShow = () => {
    if (!editMode) {
      navigate("/add-dealer/" + id + "/" + pagenum);
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(setPageNumber(0));
      dispatch(setSearchCrit("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setSelectedId(""));
      dispatch(setSortType(null));
      dispatch(setSortValue(null));
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseYes = () => {
    navigate("/add-dealer/" + id + "/" + pagenum);
    toast.success("Page Closed");
    dispatch(setPageNumber(0));
    dispatch(setSearchCrit("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setSelectedId(""));
    dispatch(setSortType(null));
    dispatch(setSortValue(null));
  };
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
            <Modal.Title className="font-18 h-100">Close Dealer Contact Changes</Modal.Title>
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

export default DealerContactHeader;
