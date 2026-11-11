import React from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setPictureFile } from "../../../../../../redux/DriverMaintenanceSlice";
import PictureScreenContent from "./PictureScreenContent";

const PictureScreenModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const documentFile = useSelector((state) => state.driverMaintenanceReducer.documentFile);

  const handleClose = () => {
    // an existing driver with a saved picture drops a picked but unsaved one
    if (id && documentFile) {
      dispatch(setPictureFile([]));
    }
    onHide();
    toast.success("Page Closed");
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="font-18">Driver Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <PictureScreenContent onSave={onHide} onClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default PictureScreenModal;
