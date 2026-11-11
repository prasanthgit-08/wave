import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DynamicTextFields from "../../../../../../../common/AutoWrapTextFields/DynamicTextFields";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../../../../../../utils/validation/Phonevalidation";

const DeliveryContent = () => {
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
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <div className="p-15 w-100">
          <Col>
            <Row className="m-0 p-0">
              {/* First Column */}
              <Col
                sm={dispatchData?.deliveryYard ? 5 : 4}
                md={dispatchData?.deliveryYard ? 5 : 4}
                lg={dispatchData?.deliveryYard ? 5 : 4}
                xl={dispatchData?.deliveryYard ? 5 : 4}
                xs={dispatchData?.deliveryYard ? 5 : 4}
              >
                {/* Name Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Name"}</Form.Label>
                  </Col>
                  <Col xs={8} md={8} sm={8} className="p-0">
                    <input
                      className="customFormControl"
                      disabled
                      name="Name"
                      type="text"
                      value={dispatchData?.deliveryName}
                    />
                  </Col>
                </Form.Group>

                {/* Address Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Address"}</Form.Label>
                  </Col>
                  <Col xs={8} md={8} sm={8} className="p-0">
                    <input
                      className="customFormControl"
                      disabled
                      name="ad1"
                      type="text"
                      value={dispatchData?.deliveryAddress1}
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
                  <Col xs={8} md={8} sm={8} className="p-0">
                    <input
                      className="customFormControl"
                      disabled
                      name="ad2"
                      type="text"
                      value={dispatchData?.deliveryAddress2}
                      autoComplete="one-time-code"
                      spellCheck={false}
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                {/* Delivery Postal Code */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"ZIP, City, State"}</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="ps-0 ">
                    <input
                      className="customFormControl"
                      name="deliveryZipcode"
                      type="text"
                      disabled={true}
                      value={dispatchData?.deliveryZipcode}
                    />
                  </Col>
                  <Col
                    xs={4}
                    md={4}
                    sm={4}
                    className="p-0"
                    style={{ width: `${!dispatchData?.deliveryYard ? "150px" : "200px"}` }}
                  >
                    <input
                      className="customFormControl"
                      name="deliveryCity"
                      type="text"
                      disabled={true}
                      value={dispatchData?.deliveryCity}
                    />
                  </Col>
                  <Col xs={1} md={1} sm={1} className="" style={{ width: "60px" }}>
                    <input
                      className="customFormControl"
                      name="deliveryState"
                      type="text"
                      disabled={true}
                      value={dispatchData?.deliveryState}
                    />
                  </Col>
                </Form.Group>
                {/* Phone Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Phone"}</Form.Label>
                  </Col>
                  <Col xs={8} md={8} sm={8} className="p-0">
                    <input
                      className="customFormControl"
                      disabled
                      name="Phone"
                      type="text"
                      value={formatPhoneNumber(dispatchData?.deliveryPhoneNumber)}
                    />
                  </Col>
                </Form.Group>

                {/* Hidden Field*/}
                <Form.Group className="mt-2 align-items-center visibility-hidden row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input className="customFormControl" name="customer" type="text" />
                  </Col>
                </Form.Group>

                {/* Contact Field*/}
                <Form.Group
                  className={`mt-2 align-items-center row  m-l-0 m-r-0 ${
                    dispatchData?.deliveryYard ? "visibility-hidden" : ""
                  }`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Contact"}</Form.Label>
                  </Col>
                  <Col xs={8} md={8} sm={8} className="p-0">
                    <input
                      className="customFormControl"
                      disabled
                      name="Contact"
                      type="text"
                      value={dispatchData?.deliveryContact}
                    />
                  </Col>
                </Form.Group>

                {/* Contact Phone Field*/}
                <Form.Group
                  className={`mt-2 align-items-center row  m-l-0 m-r-0 ${
                    dispatchData?.deliveryYard ? "visibility-hidden" : ""
                  }`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Contact Phone"}</Form.Label>
                  </Col>
                  <Col xs={8} md={8} sm={8} className="p-0">
                    <input
                      className="customFormControl"
                      disabled
                      name="Contact Phone"
                      type="text"
                      value={formatPhoneNumber(dispatchData?.deliveryContactPhone)}
                    />
                  </Col>
                </Form.Group>

                {/* Hidden Field*/}
                <Form.Group className="mt-2 align-items-center visibility-hidden row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input className="customFormControl" disabled name="customer" type="text" />
                  </Col>
                </Form.Group>
              </Col>

              {/* Second Column */}
              <Col
                sm={dispatchData?.deliveryYard ? 5 : 4}
                md={dispatchData?.deliveryYard ? 5 : 4}
                lg={dispatchData?.deliveryYard ? 5 : 4}
                xl={dispatchData?.deliveryYard ? 5 : 4}
                xs={dispatchData?.deliveryYard ? 5 : 4}
              >
                <Form.Group className="my-1 m-b-10 align-items-start row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"BOL Text - Hours"}</Form.Label>
                  </Col>
                  <Col xs={10} md={10} sm={10} className="p-0 mt-2">
                    <DynamicTextFields
                      numFields={3}
                      maxCharLimit={30}
                      inputValues={[dispatchData?.hours1, dispatchData?.hours2, dispatchData?.hours3]}
                      setInputValues={() => {}}
                      disabled={true}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="my-1 m-b-10 align-items-start row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"BOL Text - Directions"}</Form.Label>
                  </Col>
                  <Col xs={10} md={10} sm={10} className="p-0 mt-2">
                    <DynamicTextFields
                      numFields={3}
                      maxCharLimit={30}
                      inputValues={[
                        dispatchData?.directions1,
                        dispatchData?.directions2,
                        dispatchData?.directions3,
                        dispatchData?.directions4,
                        dispatchData?.directions5,
                        dispatchData?.directions6,
                        dispatchData?.directions7,
                      ]}
                      setInputValues={() => {}}
                      disabled={true}
                    />
                  </Col>
                </Form.Group>
              </Col>

              {/* Third Column */}
              {!dispatchData?.deliveryYard && (
                <Col sm={4} md={4} lg={4} xl={4} xs={4}>
                  <Form.Group className="my-1 m-b-10 align-items-start row m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {"BOL Text - Miscellaneous"}
                      </Form.Label>
                    </Col>
                    <Col xs={10} md={10} sm={10} className="p-0 mt-2">
                      <DynamicTextFields
                        numFields={3}
                        maxCharLimit={30}
                        inputValues={[
                          dispatchData?.miscellaneous1,
                          dispatchData?.miscellaneous2,
                          dispatchData?.miscellaneous3,
                        ]}
                        setInputValues={() => {}}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="my-1 m-b-10 align-items-start row m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {"BOL Text - Wash Instructions"}
                      </Form.Label>
                    </Col>
                    <Col xs={10} md={10} sm={10} className="p-0 mt-2">
                      <DynamicTextFields
                        numFields={3}
                        maxCharLimit={30}
                        inputValues={[
                          dispatchData?.washInstructions1,
                          dispatchData?.washInstructions2,
                          dispatchData?.washInstructions3,
                          dispatchData?.washInstructions4,
                          dispatchData?.washInstructions5,
                          dispatchData?.washInstructions6,
                        ]}
                        setInputValues={() => {}}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              )}
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
                      checked={dispatchData?.deliveryOpenSunday}
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
                      checked={dispatchData?.deliveryOpenMonday}
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
                      checked={dispatchData?.deliveryOpenTuesday}
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
                      disabled
                      className="form-check-input p-0 mt-2"
                      name="openwednesday"
                      checked={dispatchData?.deliveryOpenWednesday}
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
                      disabled
                      className="form-check-input p-0 mt-2"
                      name="openThursday"
                      checked={dispatchData?.deliveryOpenThursday}
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
                      disabled
                      className="form-check-input p-0 mt-2"
                      name="openfriday"
                      checked={dispatchData?.deliveryOpenFriday}
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
                      checked={dispatchData?.deliveryOpenSaturday}
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
                  <Col xs={12} md={12} sm={12} className="p-0  mt-2">
                    <textarea
                      rows={10}
                      cols={20}
                      type="text"
                      className="customFormControl h-100 "
                      name="hours"
                      value={dispatchData?.deliveryDriverEmailHours}
                      disabled
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
                  <Col xs={12} md={12} sm={12} className="p-0  mt-2">
                    <textarea
                      rows={10}
                      cols={20}
                      type="text"
                      className="customFormControl h-100 "
                      name="directions"
                      value={dispatchData?.deliveryDriverEmailDirections}
                      disabled
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={3} md={3} xs={3}>
                {/* Pickup Instructions Field*/}
                <Form.Group className="mt-2 align-items-center  row  m-l-0 m-r-0">
                  <Col sm={8} md={8} xs={8} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{`${
                      dispatchData?.deliveryYard ? "Delivery Instructions" : "Drivers Email Wash Instruction"
                    } `}</Form.Label>
                  </Col>
                  <Col xs={12} md={12} sm={12} className="p-0  mt-2">
                    <textarea
                      rows={10}
                      cols={20}
                      type="text"
                      className="customFormControl h-100 "
                      name="instructions"
                      value={dispatchData?.deliveryDriverEmailWashInstructions}
                      disabled
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

export default DeliveryContent;
