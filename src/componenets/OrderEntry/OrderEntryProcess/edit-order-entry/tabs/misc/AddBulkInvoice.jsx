import React, { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import BulkFormContent from "../../../../../customer/BulkInvoices/EditBulkInvoices/BulkFormContent";
import BulkFormFooter from "../../../../../customer/BulkInvoices/EditBulkInvoices/BulkFormFooter";

const AddBulkInvoice = ({ show, onHide, setBulkInvoiceSave }) => {
  const [checkDesc, setCheckDesc] = useState("");
  const [checkProjectCode, setCheckProjectCode] = useState("");

  return (
    <Col xs={12} className="halfScreenWidth">
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} className="orderModal ">
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100 ">Add BulkInvoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BulkFormContent
            setCheckDesc={setCheckDesc}
            checkDesc={checkDesc}
            checkProjectCode={checkProjectCode}
            setCheckProjectCode={setCheckProjectCode}
            OECustomerTab={true}
          />
          <BulkFormFooter
            setCheckDesc={setCheckDesc}
            checkDesc={checkDesc}
            checkProjectCode={checkProjectCode}
            setCheckProjectCode={setCheckProjectCode}
            onHide={onHide}
            setBulkInvoiceSave={setBulkInvoiceSave}
            OECustomerTab={true}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default AddBulkInvoice;
