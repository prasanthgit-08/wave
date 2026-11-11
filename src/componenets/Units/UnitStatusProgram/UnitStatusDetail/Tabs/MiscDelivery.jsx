import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function MiscDelivery({ data }) {
  const unitData = data?.data?.[0] || "";

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={5}>
          <p>Miscellaneous Pickup Dealer</p>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Name
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={unitData?.Name}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Address
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Address1}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Address2}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={unitData?.City} readOnly />
            </Col>
            {/* <Col xs={}>
        </Col> */}
            <div className="p-0 w-30px mx-1">
              <input className={`customFormControl `} type="text" value={unitData?.StateCode} readOnly />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`customFormControl w-80px`}
                type="text"
                value={unitData?.PostalCode}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Phone
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Phone}
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Email
              </Form.Label>
            </Col>

            <Col xs={8} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Email}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Contact
              </Form.Label>
            </Col>

            <Col xs={7} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.DeliveryContact}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Contact Phone
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.DeliveryContactPhone}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row invisible  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row invisible  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Row>
            <Col xs={4}>
              <Form.Group
                className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
              >
                <Col xs={7} className="p-0">
                  <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                    Open Sunday
                  </Form.Label>
                </Col>

                <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={unitData?.OpenSunday}
                    className="form-check-input  p-0"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
              >
                <Col xs={7} className="p-0">
                  <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                    Open Monday
                  </Form.Label>
                </Col>

                <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={unitData?.OpenMonday}
                    className="form-check-input  p-0"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
              >
                <Col xs={7} className="p-0">
                  <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                    Open Tuesday
                  </Form.Label>
                </Col>

                <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={unitData?.OpenTuesday}
                    className="form-check-input  p-0"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
              >
                <Col xs={7} className="p-0">
                  <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                    Open Wednesday
                  </Form.Label>
                </Col>

                <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={unitData?.OpenWednesday}
                    className="form-check-input  p-0"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
              >
                <Col xs={7} className="p-0">
                  <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                    Open Thursday
                  </Form.Label>
                </Col>

                <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={unitData?.OpenThursday}
                    className="form-check-input  p-0"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
              >
                <Col xs={7} className="p-0">
                  <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                    Open Friday
                  </Form.Label>
                </Col>

                <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={unitData?.OpenFriday}
                    className="form-check-input  p-0"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
              >
                <Col xs={7} className="p-0">
                  <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                    Open Saturday
                  </Form.Label>
                </Col>

                <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={unitData?.OpenSaturday}
                    className="form-check-input  p-0"
                    disabled
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={8}>
              <Form.Group
                className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
              >
                <Col xs={4} className="p-0">
                  <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
                </Col>

                <Col xs={1} className="p-0 h-25px d-flex align-items-center">
                  <input type="checkbox" className="form-check-input  p-0" disabled />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
              >
                <Col xs={12} className="p-0">
                  <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                    Driver Email - Hours{" "}
                  </Form.Label>
                </Col>

                <Col xs={12} className="p-0 ">
                  <textarea rows={9} cols={60} value={unitData?.Hours} disabled />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col xs={3} className="px-5">
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                BOL Text - Hours
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Hours1}
                readOnly
              />
            </Col>

            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Hours2}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Hours3}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                BOL Text - Directions
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Directions1}
                readOnly
              />
            </Col>

            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Directions2}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Directions3}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Directions4}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Directions5}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Directions6}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.Directions7}
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver Email - Directions{" "}
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 ">
              <textarea className="w-100" rows={9} value={unitData?.Directions} disabled />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={3} className="px-5">
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                BOL Text - Miscellaneous
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.MiscellaneousBOLText1}
                readOnly
              />
            </Col>

            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.MiscellaneousBOLText2}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.MiscellaneousBOLText3}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                BOL Text - Wash Instructions
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.WashInstructions1}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.WashInstructions2}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.WashInstructions3}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.WashInstructions4}
                readOnly
              />
            </Col>
            <Col xs={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.WashInstructions5}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={12} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver Email - Directions{" "}
              </Form.Label>
            </Col>

            <Col xs={12} className="p-0 ">
              <textarea className="w-100" rows={9} value={unitData?.WashInstructions} disabled />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default MiscDelivery;
