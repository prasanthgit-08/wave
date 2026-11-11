//when trying to delete a primary credit card, DeleteComponent used to give message for user
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteComponent = ({ show, onHide, title, body, handleOK }) => (
  <div className="col-xs-6">
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="font-18 h-100">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="font-14 h-100">{body}</Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleOK}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export default DeleteComponent;
