import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../../../common/DateInputField";

function DriversPay({ data, activeSubTab }) {
  const unitData = data?.data?.[0] || "";

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={4}>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver Miles
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DriverMiles || 0}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}></Col>
            <Col>
              <Form.Label className={` `} id="miscellaneousPickup">
                Fuel Surcharge
              </Form.Label>
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Base Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.baseRate || 0}
                disabled
              />
            </Col>
            <Col xs={1} className="p-0 ms-3 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.FuelSurcharge || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="pe-3 ps-0">
              <input
                className={`customFormControl
            `}
                name=""
                value={unitData?.SupplementalRateDescription || ""}
                disabled
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.SupplementalRate || 0}
                disabled
              />
            </Col>
            <Col xs={1} className="p-0 ms-3 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.SupplementalFuelSurchargeRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                CDL Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.CDLARate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Apportioned Rate
              </Form.Label>
            </Col>
            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.ApportionedRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Length Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.LengthRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="pe-3 ps-0">
              <input
                className={`customFormControl
            `}
                name=""
                value={unitData?.SpecialDescription || ""}
                disabled
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.SpecialRate || 0}
                disabled
              />
            </Col>
            <Col xs={1} className="p-0 ms-3 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.SpecialFuelSurchargeRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="pe-3 ps-0">
              <input
                className={`customFormControl
            `}
                name=""
                value={unitData?.AdditionalDescription || ""}
                disabled
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.AdditionalRate || 0}
                disabled
              />
            </Col>
            <Col xs={1} className="p-0 ms-3 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.AdditionalFuelSurchargeRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="pe-3 ps-0">
              <input
                className={`customFormControl
            `}
                name=""
                value={unitData?.DriverDescription || ""}
                disabled
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DriverRate || 0}
                disabled
              />
            </Col>
            <Col xs={1} className="p-0 ms-3 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DriverFuelSurchargeRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Half Ton Adjustment Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.HalfTonAdjustmentRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="pe-3 ps-0">
              <input
                className={`customFormControl
            `}
                name=""
                value={unitData?.LongUnitRateDescription || ""}
                disabled
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.LongUnitRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Safety Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.SafetyRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Bonus Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.CompanyBonusRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Sub Total
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.SubTotal || 0}
                disabled
              />
            </Col>
            <Col xs={1} className="p-0 ms-3 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.FuelSurchargeSubtotal || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Fuel Surcharge
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.FuelSurchargeRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Total Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.TotalRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver Pay = Pay Miles
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 " style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.PayMiles || 0}
                disabled
              />
            </Col>
            <Col xs={1} className="p-0 text-center">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                @
              </Form.Label>
            </Col>
            <Col xs={1} className="p-0 " style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.TextFieldforTotalRate || 0}
                disabled
              />
            </Col>
            <Col xs={1} className="p-0 text-center">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                =
              </Form.Label>
            </Col>
            <Col xs={1} className="p-0 " style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.TextFieldForDriversPay || 0}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Gross Pay
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.GrossPay || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Canadian Charge
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.CanadianCharge || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                US Charge
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.USCharge || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="pe-3 ps-0">
              <input
                className={`customFormControl
            `}
                name=""
                value={unitData?.AdditionalDescription || ""}
                disabled
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>

            <Col xs={1} className="p-0" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.AdditionalRate || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                ELD Fee
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DriverELDFee || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Pick Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.PickupPulloutFee || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Additional Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.AdditionalPulloutFee || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Delivery Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DeliveryPulloutFee || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver Qual
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DriverQual || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Net Pay
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.NetPay || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                {" "}
                Pay Balance{" "}
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.PayBalance || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
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
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver Delivery Bonus
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.DriverDeliveryBonus || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Invoice Delivery Bonus
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.InvoiceDeliveryBonus || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Description
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.Description || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>If Delivered By</Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={unitData?.IfDeliveredBy || ""}
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
            className={`mt-2 form-group  align-items-start  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0 text-left">
              <Form.Label className={` `} id="miscellaneousPickup">
                Reimbursements From Split Trip
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h">
              <input
                className={`customFormControl invisible 
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
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Tolls
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.Tolls || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Permits
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.Permits || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Wash
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.Wash || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Other Reimbursement
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.OtherReimbursments || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Other Pay
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "60px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.OtherPay || 0}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Other Description
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.OtherDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default DriversPay;
