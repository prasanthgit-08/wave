import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../../../common/DateInputField";

function Dates({ data, activeSubTab }) {
  const unitData = data?.data?.[0] || "";
  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Release Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.DispatchReleaseDate ? unitData.DispatchReleaseDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Deliver By Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.DeliverByDate ? unitData.DeliverByDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Minimum Pickup Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.MinimumPickupDate ? unitData.MinimumPickupDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Maximum Pickup Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.MaximumPickupDate ? unitData.MaximumPickupDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Minimum Delivery Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.MinimumDeliveryDate ? unitData.MinimumDeliveryDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Maximum Delivery Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.MaximumDeliveryDate ? unitData?.MaximumDeliveryDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row invisible   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Dispatch Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.DispatchDate ? unitData.DispatchDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Dispatched By
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DispatchUser || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row invisible   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Estimated Pickup Date</Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.EstimatedPickupDate ? unitData.EstimatedPickupDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Estimated Delivery Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.EstimatedDeliveryDate ? unitData.EstimatedDeliveryDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group
            className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Picked up
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" checked={unitData.PickedUp} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Pickup Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.PickupDate ? unitData.PickupDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                User
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.PickupUser || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
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
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Pickup Yard Exited
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.PickupYardExit}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Yard Exit Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.PickupYardExitDate ? unitData.PickupYardExitDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                User
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.PickupYardExitUser || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Yard Gate Code
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.PickupYardGateCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
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
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Delivered
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" checked={unitData.Delivered} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Delivery Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.DeliveredDate ? unitData.DeliveredDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                User
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DeliveredUser ? unitData.DeliveredUser : ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
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
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Delivery Yard Entrance
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.DeliveryYardEntrance}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Yard Entrance Date </Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.DeliveryYardEntranceDate ? unitData.DeliveryYardEntranceDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                User
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DeliveryYardEntranceUser || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Yard Gate Code
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DeliveryYardGateCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group
            className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Undispatched
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.Undispatched}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData.Undispatched ? unitData.UndispatchDate : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Undispatch</Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitData?.UndispatchDate ? unitData.UndispatchDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData.Undispatched ? unitData.UndispatchUser : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                User
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.UndispatchUser || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData.Undispatched ? unitData.UndispatchPayback : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Payback
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.UndispatchPayback || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData.Undispatched ? unitData.UndispatchReason : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Reason
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0 h">
              <textarea className="w-100" rows={9} value={unitData?.UndispatchReason || ""} disabled />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Dates;
