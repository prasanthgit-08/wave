import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

function Customer({ styles, data }) {
  const dispatch = useDispatch();
  const customerData = data?.data?.[0] || "";

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={4}>
          {/* Miscellaneous customer */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                Miscellaneous Customer
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.MiscellaneousCustomer || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          {/*  customer */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}> Customer</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                name="model"
                value={customerData?.CustomerName || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                value={customerData?.CustomerAddress1 || ""}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={customerData?.CustomerAddress2 || ""}
                disabled
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.CustomerCity || ""}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.CustomerStateCode || ""}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.CustomerPostalCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>

          {/*  Pickup At Plant */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Pickup At Plant</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.PickupPlantName || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.PickupPlantAddress1 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.PickupPlantAddress2 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.PickupPlantCity || ""}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.PickupPlantStateCode || ""}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.PickupPlantPostalCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>

          {/*   Pickup Yard */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Pickup Yard</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.PickupYardName || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.PickupYardAddress1 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.PickupYardAddress2 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.PickupYardCity || ""}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.PickupYardStateCode || ""}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.PickupYardPostalCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>

          {/*   No Pickup Fee */}

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                No Pickup Fee
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.noPickupPulloutFee || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          {/*  Pickup City */}

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}> Pickup City</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                name="model"
                value={customerData?.PickupCity || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>

          {/*   Billing Plant */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Billing Plant</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.BillingPlantName || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.BillingPlantAddress1 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.BillingPlantAddress2 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.BillingPlantCity || ""}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.BillingPlantStateCode || ""}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.BillingPlantPostalCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>

          {/*    Deliver To PLant */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Deliver To PLant</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.DeliveryPlantName || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.DeliveryPlantAddress1 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.DeliveryPlantAddress2 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.DeliveryPlantCity || ""}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.DeliveryPlantStateCode || ""}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.DeliveryPlantPostalCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>

          {/*    Delivery Yard */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Delivery Yard</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.DeliveryYardName || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.DeliveryYardAddress1 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.DeliveryYardAddress2 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.DeliveryYardCity || ""}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.DeliveryYardStateCode || ""}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={customerData?.DeliveryYardPostalCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>

          {/*    No Delivery Fee */}

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                No Delivery Fee
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.noDeliveryPulloutFee || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}> Delivery City</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                name="model"
                value={customerData?.DeliveryCity || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
            `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>

          {/* Reload */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                Reload
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.reload || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          {/*  Return Rates*/}

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                Return Rates
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.ReturnRates || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}> Plant Code</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                name="plantcode"
                value={customerData?.PlantCode || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Charge Credit Card */}

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                Charge Credit Card
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.creditCardPrepaid || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          {/* Check Prepaid */}

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                Check Prepaid
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.checkPrepaid || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                Use Open Balance
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.openBalancePrepaid || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          {/* FOD Invoice */}

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                FOD Invoice
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.FODInvoice || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          {/* Bulk Unit Invoice */}

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                Bulk Unit Invoice
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={customerData?.BulkUnit || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={8} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={customerData?.BulkDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Customer;
