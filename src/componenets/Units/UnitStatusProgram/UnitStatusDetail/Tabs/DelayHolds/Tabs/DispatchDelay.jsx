import React from "react";
import { Col, Form } from "react-bootstrap";

function DispatchDelay({ data, activeSubTab }) {
  const unitData = data?.data?.[0] || "";

  return (
    <div className="p-4 ps-5">
      <Col xs={12}>
        <Form.Group
          className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
        >
          <Col sm={1} md={1} xs={1} className="p-0">
            <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
              Delay Dispatch
            </Form.Label>
          </Col>

          <Col xs={1} className="p-0 h-25px d-flex align-items-center">
            <input
              type="checkbox"
              checked={unitData.DelayDispatch}
              className="form-check-input  p-0"
              disabled
            />
          </Col>
        </Form.Group>
        <div className="mt-2">
          <Form.Group
            className={`mt-2 form-group  align-items-start  row  m-l-0 m-r-0 ms-0
      `}
          >
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Reason
              </Form.Label>
            </Col>

            <Col xs={8} className="p-0 h">
              <textarea rows={10} value={unitData?.DelayDispatchReason} className="w-100" disabled />
            </Col>
          </Form.Group>
        </div>
      </Col>
    </div>
  );
}

export default DispatchDelay;
