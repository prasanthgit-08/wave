/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Col, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import DriverSelectionLookupFilter from "./DriverSelectionLookupFilter";

function DriverSelectionLookupTemplate({
  companyName,
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  ShuttleProcess,
}) {
  const lookupProps = {
    renderItemId,
    companyName,
    handleLookupSelection,
    MaintenanceProgram,
    ShuttleProcess,
  };

  const dispatch = useDispatch();

  return (
    <Col xs={12}>
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} className="orderModal ">
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100">Driver Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid table-bordered lookup-container">
            <div className="row">
              <div className="border border-dark border-2 px-0 lookup-width">
                {/* Pass required states & functions as properties to this common component */}
                <DriverSelectionLookupFilter onHide={onHide} />
                <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0"></div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Col>
  );
}

export default DriverSelectionLookupTemplate;
