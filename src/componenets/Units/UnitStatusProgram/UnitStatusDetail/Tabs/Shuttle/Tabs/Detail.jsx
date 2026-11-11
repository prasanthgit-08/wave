import React from "react";
import { useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../../../common/DateInputField";

function Detail({ data }) {
  const unitShuttleDetailData = useSelector((state) => state.unitStatusReducer.unitShuttleDetailData);

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          <Form.Group
            className={`mt-2 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.Driver || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Unit Number
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.UnitNumber || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Company
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.Company || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Date Added</Form.Label>
            </Col>
            <Col xs={1} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitShuttleDetailData?.DateAdded ? unitShuttleDetailData?.DateAdded : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Source
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h" style={{ width: "90px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.Source || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` col-form-label  dealer-label`} id="engineType">
                Shuttle type
              </Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0 d-flex">
              {[
                { label: "Shuttle", value: "Shuttle" },
                { label: "Return", value: "Returned" },
                { label: "Dry Run", value: "Dry Run" },
                { label: "Bonus", value: "Bonus" },
              ].map(({ label, value }) => (
                <Col key={value} className="d-flex align-items-center">
                  <input
                    type="radio"
                    value={value}
                    checked={unitShuttleDetailData?.ShuttleType === value}
                    disabled
                  />
                  <label className="ms-2">{label}</label>
                </Col>
              ))}
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Additional Shuttle
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitShuttleDetailData?.PickupUser || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Additional Shuttle Added By
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.SecondShuttleUserFK || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Shuttle Amount
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.ShuttleAmount || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="pe-3 ps-0">
              <input
                className={`customFormControl
            `}
                name=""
                value={unitShuttleDetailData?.WhatPickupDynamic || ""}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.WhatPickup || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="pe-3 ps-0">
              <input
                className={`customFormControl
            `}
                name=""
                value={unitShuttleDetailData?.WhatDeliveryDynamic || ""}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>

            <Col xs={3} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.WhatDelivery || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Row/Position
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.YardRow || ""}
                disabled
              />
            </Col>
            <Col xs={1} className="p-0 ms-3 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.YardPosition || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-start  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Reason
              </Form.Label>
            </Col>

            <Col xs={9} className="p-0 h">
              <textarea
                className="w-100"
                rows={3}
                value={unitShuttleDetailData?.SecondShuttleReason || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
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
            className={`mt-1 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Posted By
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.Name || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Post Date</Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitShuttleDetailData?.PostDate ? unitShuttleDetailData?.PostDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
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
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Edited By
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.EditUserFK || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Edit Date</Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitShuttleDetailData?.EditDate ? unitShuttleDetailData?.EditDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center invisible   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
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
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Paid By
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.PaidUserFK || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Paid Date</Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitShuttleDetailData?.PaidDate || ""}
                disabled
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Denied By
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitShuttleDetailData?.DeniedUserFK ? unitShuttleDetailData?.DeniedUserFK : ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Date Denied</Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={unitShuttleDetailData?.DeniedDate ? unitShuttleDetailData?.DeniedDate : ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}

                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-4 form-group  align-items-start  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Reason Denied
              </Form.Label>
            </Col>

            <Col xs={9} className="p-0 h">
              <textarea
                className="w-100"
                rows={3}
                value={unitShuttleDetailData?.DeniedReason ? unitShuttleDetailData?.DeniedReason : ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Detail;
