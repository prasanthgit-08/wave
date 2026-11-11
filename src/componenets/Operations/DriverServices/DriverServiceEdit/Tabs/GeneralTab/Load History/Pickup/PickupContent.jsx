import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../../../../../../utils/validation/Phonevalidation";

const PickupContent = () => {
  const navigate = useNavigate();

  const { driverId, dispatchId } = useParams();

  const dispatchData = useSelector((state) => state.loadHistory.dispatchData);

  useEffect(() => {
    if (!dispatchData) {
      navigate("/load-history-detail/" + driverId + "/" + dispatchId);
    }
  }, []);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <div className="p-15 w-100">
          <Col>
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/* Name Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Name"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className="customFormControl"
                      name="Name"
                      type="text"
                      disabled
                      value={dispatchData?.pickupName}
                    />
                  </Col>
                </Form.Group>

                {/* Address Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Address"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className="customFormControl"
                      name="ad1"
                      type="text"
                      disabled
                      value={dispatchData?.pickupAddress1}
                      autoComplete="one-time-code"
                      spellCheck={false}
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
                {/* Address 2 Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{""}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className="customFormControl"
                      name="ad2"
                      type="text"
                      disabled
                      value={dispatchData?.pickupAddress2}
                      autoComplete="one-time-code"
                      spellCheck={false}
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                {/* Pickup Postal Code */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"ZIP, City, State"}</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="ps-0 ">
                    <input
                      className="customFormControl"
                      name="pickupZipcode"
                      type="text"
                      disabled={true}
                      value={dispatchData?.pickupZipcode}
                    />
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className="customFormControl"
                      name="pickupCity"
                      type="text"
                      disabled={true}
                      value={dispatchData?.pickupCity}
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="" style={{ width: "75px" }}>
                    <input
                      className="customFormControl"
                      name="pickupState"
                      type="text"
                      disabled={true}
                      value={dispatchData?.pickupState}
                    />
                  </Col>
                </Form.Group>
                {/* Phone Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Phone"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className="customFormControl"
                      name="Phone"
                      type="text"
                      disabled
                      value={formatPhoneNumber(dispatchData?.pickupPhoneNumber)}
                    />
                  </Col>
                </Form.Group>

                {/* Hidden Field*/}
                <Form.Group className="mt-2 align-items-center visibility-hidden row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input className="customFormControl" name="customer" type="text" disabled />
                  </Col>
                </Form.Group>

                {/* Contact Field*/}
                <Form.Group
                  className={`mt-2 align-items-center row  m-l-0 m-r-0 ${
                    dispatchData?.pickupYard ? "visibility-hidden" : ""
                  }`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Contact"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className="customFormControl"
                      name="Contact"
                      type="text"
                      disabled
                      value={dispatchData?.pickupContact}
                    />
                  </Col>
                </Form.Group>

                {/* Contact Phone Field*/}
                <Form.Group
                  className={`mt-2 align-items-center row  m-l-0 m-r-0 ${
                    dispatchData?.pickupYard ? "visibility-hidden" : ""
                  }`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Contact Phone"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className="customFormControl"
                      name="Contact Phone"
                      type="text"
                      disabled
                      value={formatPhoneNumber(dispatchData?.pickupContactPhone)}
                    />
                  </Col>
                </Form.Group>

                {/* Hidden Field*/}
                <Form.Group className="mt-2 align-items-center visibility-hidden row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input className="customFormControl" name="customer" type="text" disabled />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-0 p-0">
              <Col sm={3} md={3} xs={3} style={{ width: "250px" }}>
                {/* Open Sunday Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} style={{ width: "150px" }} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Open Sunday"}</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} style={{ width: "50px" }} className="p-0">
                    <input
                      type="checkbox"
                      disabled
                      className="form-check-input p-0 mt-2"
                      name="openSunday"
                      checked={dispatchData?.pickupOpenSunday}
                    />
                  </Col>
                </Form.Group>
                {/* Open Monday Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} style={{ width: "150px" }} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Open Monday"}</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} style={{ width: "50px" }} className="p-0">
                    <input
                      type="checkbox"
                      disabled
                      className="form-check-input p-0 mt-2"
                      name="openMonday"
                      checked={dispatchData?.pickupOpenMonday}
                    />
                  </Col>
                </Form.Group>
                {/* Open Tuesday Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} style={{ width: "150px" }} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Open Tuesday"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "50px" }}>
                    <input
                      type="checkbox"
                      disabled
                      className="form-check-input p-0 mt-2"
                      name="openTuesday"
                      checked={dispatchData?.pickupOpenTuesday}
                    />
                  </Col>
                </Form.Group>
                {/* Open Wednesday Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} style={{ width: "150px" }} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Open Wednesday"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "50px" }}>
                    <input
                      type="checkbox"
                      className="form-check-input p-0 mt-2"
                      disabled
                      name="openwednesday"
                      checked={dispatchData?.pickupOpenWednesday}
                    />
                  </Col>
                </Form.Group>
                {/* Open Thursday Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} style={{ width: "150px" }} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Open Thursday"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "50px" }}>
                    <input
                      type="checkbox"
                      className="form-check-input p-0 mt-2"
                      disabled
                      name="openThursday"
                      checked={dispatchData?.pickupOpenThursday}
                    />
                  </Col>
                </Form.Group>
                {/* Open Friday Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} style={{ width: "150px" }} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Open Friday"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "50px" }}>
                    <input
                      type="checkbox"
                      className="form-check-input p-0 mt-2"
                      disabled
                      name="openfriday"
                      checked={dispatchData?.pickupOpenFriday}
                    />
                  </Col>
                </Form.Group>
                {/* Open Saturday Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} style={{ width: "150px" }} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Open Saturday"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "50px" }}>
                    <input
                      type="checkbox"
                      disabled
                      className="form-check-input p-0 mt-2"
                      name="openSaturday"
                      checked={dispatchData?.pickupOpenSaturday}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={3} md={3} xs={3}>
                {/* Drivers Email - Hours Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={8} md={8} xs={8} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Drivers Email - Hours"}</Form.Label>
                  </Col>
                  <Col xs={12} md={12} sm={12} className="p-0 mt-2">
                    <textarea
                      disabled
                      rows={10}
                      cols={20}
                      type="text"
                      className="customFormControl h-100 "
                      name="directions"
                      value={dispatchData?.pickupDriverEmailHours}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={3} md={3} xs={3}>
                {/* Drivers Email - Directions Field*/}
                <Form.Group className="mt-2 align-items-center  row  m-l-0 m-r-0">
                  <Col sm={8} md={8} xs={8} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {"Drivers Email - Directions"}
                    </Form.Label>
                  </Col>
                  <Col xs={12} md={12} sm={12} className="p-0 mt-2">
                    <textarea
                      disabled
                      rows={10}
                      cols={20}
                      type="text"
                      className="customFormControl h-100 "
                      name="directions"
                      value={dispatchData?.pickupDriverEmailDirections}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={3} md={3} xs={3}>
                {/* Pickup Instructions Field*/}
                <Form.Group
                  className={`mt-2 align-items-center row  m-l-0 m-r-0 ${
                    !dispatchData?.pickupYard ? "visibility-hidden" : ""
                  }`}
                >
                  <Col sm={8} md={8} xs={8} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Pickup Instructions "}</Form.Label>
                  </Col>
                  <Col xs={12} md={12} sm={12} className="p-0 mt-2">
                    <textarea
                      disabled
                      rows={10}
                      cols={20}
                      type="text"
                      className="customFormControl h-100 "
                      name="pickupInstruction"
                      value={dispatchData?.pickupInstructions}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default PickupContent;
