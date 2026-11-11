import React from "react";
import { Col, Modal } from "react-bootstrap";
import UnitActivationShuttleDelay from "./UnitActivationShuttleDelay";

const UnitActivationSingleSelectionDelayModal = ({
  show,
  onHide,
  editYardUnit,
  shuttleYardcheckin,
  orderEntry,
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
          <Modal.Title className="font-18 h-100">Unit Activation Shuttle Delay</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnitActivationShuttleDelay
            editYardUnit={editYardUnit}
            shuttleYardcheckin={shuttleYardcheckin}
            orderEntry={orderEntry}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default UnitActivationSingleSelectionDelayModal;
