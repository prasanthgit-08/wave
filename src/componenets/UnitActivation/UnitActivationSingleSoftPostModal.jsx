import React from "react";
import { Col, Modal } from "react-bootstrap";
import UnitActivationSingleSoftPost from "./UnitActivationSingleSoftPost";

const UnitActivationSingleSoftPostModal = ({
  show,
  onHide,
  orderEntry,
  editYardUnit,
  shuttleYardcheckin,
}) => {
  return (
    <Col xs={12}>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        className="lookupModal"
        dialogClassName={`modal-left lookupFix my-0`}
      >
        <Modal.Header>
          <Modal.Title className="font-18 h-100">UnitActivation Single SoftPost</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnitActivationSingleSoftPost
            editYardUnit={editYardUnit}
            shuttleYardcheckin={shuttleYardcheckin}
            orderEntry={orderEntry}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default UnitActivationSingleSoftPostModal;
