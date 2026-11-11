import React from "react";
import { Col, Modal } from "react-bootstrap";
import UnitActivationSingleSelection from "../../../../UnitActivation/UnitActivationSingleSelection";

const UnitActivationSingleSelectionScreenModal = ({ show, onHide, shuttleYardcheckin }) => {
  return (
    <Col xs={12}>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        className="threeFourthScreenLookupModal p-0"
        dialogClassName={`modal-left lookupFix my-0`}
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100">Unit Activation Single Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnitActivationSingleSelection modal shuttleYardcheckin={shuttleYardcheckin} />
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default UnitActivationSingleSelectionScreenModal;
