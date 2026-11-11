import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function Notes({ data, activeSubTab }) {
  const unitData = data?.data?.[0] || "";
  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0 mb-3">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Late Yard Exit Notes
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 h">
              <textarea className="w-100" rows={10} value={unitData?.LateYardExitNotes || ""} disabled />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0 mb-3">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Dispatch Notes
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 h">
              <textarea className="w-100" rows={10} value={unitData?.Notes || ""} disabled />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0 mb-3">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Late Paperwork Notes
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 h">
              <textarea className="w-100" rows={10} value={unitData?.LatePaperworkNotes || ""} disabled />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0 mb-3">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Missing Paperwork Notes
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 h">
              <textarea className="w-100" rows={10} value={unitData?.MissingPaperworkNotes || ""} disabled />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Notes;
