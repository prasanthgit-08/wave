import React from "react";
import { Col, Form } from "react-bootstrap";

function Notes({ data }) {
  const unitData = data?.data?.[0] || "";

  return (
    <div className="p-1 ps-2">
      <Col xs={10}>
        <Form.Group
          className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
        >
          <Col xs={12} className="p-0">
            <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
              Unit Notes
            </Form.Label>
          </Col>

          <Col xs={12} className="p-0 mt-2">
            {/* <textarea className="w-100" rows={10} value={unitData?.Notes || ""} disabled /> */}
            <textarea
              className="w-100"
              rows={10}
              value={(unitData?.Notes || "").replace(
                /(\d{2})-(\d{2})-(\d{4}) (\d{2}:\d{2}:\d{2})/,
                (_, mm, dd, yyyy, time) => `${mm}/${dd}/${yyyy.slice(-2)} ${time}`
              )}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group
          className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
        >
          <Col xs={12} className="p-0">
            <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
              Dispatch Notes
            </Form.Label>
          </Col>

          <Col xs={12} className="p-0 mt-2">
            <textarea
              className="w-100"
              rows={10}
              value={(unitData?.DispatchNotes || "").replace(
                /(\d{2})-(\d{2})-(\d{4}) (\d{2}:\d{2}:\d{2})/,
                (_, mm, dd, yyyy, time) => `${mm}/${dd}/${yyyy.slice(-2)} ${time}`
              )}
              disabled
            />
          </Col>
        </Form.Group>
      </Col>
    </div>
  );
}

export default Notes;
