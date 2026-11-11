import React from "react";
import { Modal, Button } from "react-bootstrap";

function WarningModalPopUp({
  show,
  onHide,
  title,
  body,
  handleOK,
  handleYES,
  handleNO,
  showOK,
  color,
  showYes,
  showNo,
}) {
  return (
    <div className="col-xs-6">
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title
            className="font-18 h-100"
            style={{ color: color, display: "flex", alignItems: "center" }}
          >
            {title} <span style={{ marginRight: "10px" }}></span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-14 h-100" style={{ color: color }}>
          {body}
        </Modal.Body>

        <Modal.Footer>
          {showOK && (
            <Button variant="secondary" onClick={handleOK}>
              OK
            </Button>
          )}

          <>
            {showYes && (
              <Button variant="primary" onClick={handleYES}>
                Yes
              </Button>
            )}
            {showNo && (
              <Button variant="secondary" onClick={handleNO}>
                No
              </Button>
            )}
          </>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WarningModalPopUp;
