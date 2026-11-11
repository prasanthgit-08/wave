import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function MiscPickup({ data }) {
  const unitData = data?.data?.[0] || "";

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={5}>
          <p>Miscellaneous Pickup Dealer</p>

          {/* Name */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Name
              </Form.Label>
            </Col>
            <Col xs={6} className="p-0 h">
              <input className={`customFormControl`} value={unitData?.name || ""} disabled />
            </Col>
          </Form.Group>

          {/* Address-1 */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Address
              </Form.Label>
            </Col>
            <Col xs={6} className="p-0 h">
              <input className={`customFormControl`} value={unitData?.address1 || ""} disabled />
            </Col>
          </Form.Group>

          {/* Address-2 */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>
            <Col xs={6} className="p-0 h">
              <input className={`customFormControl`} value={unitData?.address2 || ""} disabled />
            </Col>
          </Form.Group>

          {/* City,State,ZIP */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={unitData?.city || ""} disabled />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input
                className={`customFormControl `}
                type="text"
                value={unitData?.stateCode || ""}
                disabled
              />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`customFormControl w-80px`}
                type="text"
                value={unitData?.postalCode || ""}
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
              <input className={`customFormControl`} value={unitData?.phone || ""} disabled />
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
              <input className={`customFormControl`} value={unitData?.email || ""} disabled />
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
              <input className={`customFormControl`} value={unitData?.deliveryContact || ""} disabled />
            </Col>
          </Form.Group>

          {/* Contact Phone */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Contact Phone
              </Form.Label>
            </Col>
            <Col xs={2} className="p-0 h">
              <input className={`customFormControl`} value={unitData?.deliveryContactPhone || ""} disabled />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-5">
        <Row>
          <Col xs={2}>
            {/* Open Sunday */}
            <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
              <Col xs={5} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Open Sunday
                </Form.Label>
              </Col>
              <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input  p-0"
                  checked={unitData?.openSunday || false}
                  disabled
                />
              </Col>
            </Form.Group>
            {/* Open Monday */}
            <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
              <Col xs={5} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Open Monday
                </Form.Label>
              </Col>
              <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input  p-0"
                  checked={unitData?.openMonday || false}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* Open Tuesday */}
            <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
              <Col xs={5} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Open Tuesday
                </Form.Label>
              </Col>
              <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input  p-0"
                  checked={unitData?.opentuesday || false}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* Open Wednesday */}
            <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
              <Col xs={5} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Open Wednesday
                </Form.Label>
              </Col>
              <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input  p-0"
                  checked={unitData?.openwednesday || false}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* Open Thursday */}
            <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
              <Col xs={5} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Open Thursday
                </Form.Label>
              </Col>
              <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input  p-0"
                  checked={unitData?.openthursday || false}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* Open Friday */}
            <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
              <Col xs={5} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Open Friday
                </Form.Label>
              </Col>
              <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input  p-0"
                  checked={unitData?.openfriday || false}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* Open Saturday */}
            <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
              <Col xs={5} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Open Saturday
                </Form.Label>
              </Col>
              <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input  p-0"
                  checked={unitData?.opensaturday || false}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={3}>
            <Form.Group className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0`}>
              <Col xs={4} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
              </Col>
              <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                <input type="checkbox" className="form-check-input  p-0" />
              </Col>
            </Form.Group>

            {/* Driver Email - Hours */}
            <Form.Group className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
              <Col xs={12} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Driver Email - Hours
                </Form.Label>
              </Col>
              <Col xs={12} className="p-0 ">
                <textarea className="w-100" rows={10} value={unitData?.hours || ""} disabled />
              </Col>
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0`}>
              <Col xs={4} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
              </Col>
              <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                <input type="checkbox" className="form-check-input  p-0" />
              </Col>
            </Form.Group>

            {/* Driver Email - Directions */}
            <Form.Group className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
              <Col xs={12} className="p-0">
                <Form.Label className={` customColFormLabel`}>Driver Email - Directions</Form.Label>
              </Col>
              <Col xs={12} className="p-0 ">
                <textarea className="w-100" rows={10} value={unitData?.directions || ""} disabled />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MiscPickup;
