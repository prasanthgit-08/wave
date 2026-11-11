import React from "react";
import { Modal, Button } from "react-bootstrap";
import CustomRadioGroup from "./CustomRadioGroup"; // adjust import path if needed

const ReceiverSelectionModal = ({ show, onHide, reciver, setReciver, handleExport, body }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName="custom-centered-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Selection Screen</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-center align-items-center flex-column">{body}</Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            handleExport("");
            onHide();
          }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiverSelectionModal;
