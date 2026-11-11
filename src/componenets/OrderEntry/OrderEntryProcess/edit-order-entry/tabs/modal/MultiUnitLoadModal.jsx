import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

function MultiUnitModal({
  show,
  onHide,
  title,
  body,
  handleYES,
  handleNO,
  showOK,
  color,
  moreInfo,
  showMoreInfo,
  handleToggleShowMoreInfo,
  multiUnitLoadError,
  isPopupLoad,
}) {
  return (
    <div className="col-xs-6">
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title
            className="font-18 h-100"
            style={{ color: "red", display: "flex", alignItems: "center" }}
          >
            {title} <span style={{ marginRight: "10px" }}>!</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-14 h-100" style={{ color: color }}>
          {body}
        </Modal.Body>
        {showMoreInfo && (
          <Modal.Body className="font-14 h-100" style={{ color: color }}>
            <Row>
              <Col xs={4} className="blue-text">
                Pickup Locations:
              </Col>
              <Col xs={8} className="text-right">
                {moreInfo?.pickupCity?.split(",")[0] || ""},{" "}
                {moreInfo?.pickupCity?.split(",")[1]?.substring(0, 2) || ""}
              </Col>
            </Row>
            <Row>
              <Col xs={4} className="blue-text">
                Delivery Locations:
              </Col>
              <Col xs={8} className="text-right">
                {moreInfo?.cityWithStateCode}
              </Col>
            </Row>
            <Row>
              <Col xs={4} className="blue-text">
                Total Units:
              </Col>
              <Col xs={8} className="text-right">
                {moreInfo?.totalUnits}
              </Col>
            </Row>
            <Row>
              <Col xs={4} className="blue-text">
                Current Units:
              </Col>
              <Col xs={8} className="text-right">
                {moreInfo?.currentUnits}
              </Col>
            </Row>
          </Modal.Body>
        )}
        <Modal.Footer>
          {showMoreInfo ? (
            <Button variant="link" onClick={handleToggleShowMoreInfo}>
              Show Less
            </Button>
          ) : (
            !multiUnitLoadError &&
            !isPopupLoad && (
              <Button variant="link" onClick={handleToggleShowMoreInfo}>
                More Info
              </Button>
            )
          )}
          {showOK ? (
            <Button variant="secondary" onClick={handleNO}>
              OK
            </Button>
          ) : (
            <>
              <Button variant="primary" onClick={handleYES}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleNO}>
                No
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MultiUnitModal;
