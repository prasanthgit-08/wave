import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

function MiscCustomer({ styles, data }) {
  const dispatch = useDispatch();
  const MisccustomerData = data?.data?.[0] || "";

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={5}>
          <p>Miscellaneous Customer</p>

          {/* Name */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Name
              </Form.Label>
            </Col>
            <Col xs={6} className="p-0 h">
              <input className={`customFormControl`} value={MisccustomerData?.name || ""} disabled />
            </Col>
          </Form.Group>

          {/* Address -1 */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Address
              </Form.Label>
            </Col>
            <Col xs={6} className="p-0 h">
              <input className={`customFormControl`} value={MisccustomerData?.Address1 || ""} disabled />
            </Col>
          </Form.Group>

          {/* Address -2 */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>
            <Col xs={6} className="p-0 h">
              <input className={`customFormControl`} value={MisccustomerData?.Address2 || ""} disabled />
            </Col>
          </Form.Group>

          {/* City,State,ZIP */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} value={MisccustomerData?.city || ""} disabled />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input className={`customFormControl `} value={MisccustomerData?.stateCode || ""} disabled />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`customFormControl w-80px`}
                value={MisccustomerData?.postalCode || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Phone */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Phone
              </Form.Label>
            </Col>
            <Col xs={2} className="p-0 h">
              <input className={`customFormControl`} value={MisccustomerData?.phone || ""} disabled />
            </Col>
          </Form.Group>

          {/* FAX */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                FAX
              </Form.Label>
            </Col>
            <Col xs={2} className="p-0 h">
              <input className={`customFormControl`} value={MisccustomerData?.fax || ""} disabled />
            </Col>
          </Form.Group>

          {/* Email */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Email
              </Form.Label>
            </Col>
            <Col xs={8} className="p-0 h">
              <input className={`customFormControl`} value={MisccustomerData?.email || ""} disabled />
            </Col>
          </Form.Group>

          {/* Contact */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Contact
              </Form.Label>
            </Col>
            <Col xs={7} className="p-0 h">
              <input className={`customFormControl`} value={MisccustomerData?.contact || ""} disabled />
            </Col>
          </Form.Group>

          {/* Quick Pay Terms */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Quick Pay Terms
              </Form.Label>
            </Col>
            <Col xs={6} className="p-0 h">
              <input className={`customFormControl`} value={MisccustomerData?.quickPayTerms || ""} disabled />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default MiscCustomer;
