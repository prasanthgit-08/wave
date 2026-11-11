import React from "react";
import { Col, Form } from "react-bootstrap";

function InvoiceHolds({ data }) {
  const unitData = data?.data?.[0] || "";
  return (
    <div className="p-1 ps-2">
      <Col xs={10} style={{ marginLeft: "60px", marginRight: "60px" }}>
        <Form.Group
          className={`mt-5 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
        >
          <Col xs={2} className="p-0">
            <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
              Invoice Hold
            </Form.Label>
          </Col>

          <Col xs={1} className="p-0 h-25px d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input p-0"
              id="UnitOnInvoiceHold"
              name="UnitOnInvoiceHold"
              checked={unitData?.UnitOnInvoiceHold}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group
          className={`mt-3 form-group  align-items-start  row  m-l-0 m-r-0 ms-0
          `}
        >
          <Col xs={2} className="p-0">
            <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
              Invoice Hold Notes
            </Form.Label>
          </Col>

          <Col xs={9} className="p-0 mt-2">
            <textarea className="w-100" rows={24} value={unitData?.InvoiceHoldReason || ""} disabled />
          </Col>
        </Form.Group>
      </Col>
    </div>
  );
}

export default InvoiceHolds;
