import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import DateInputField from "../../../../common/DateInputField";
import {
  setHasDriveBy,
  setIsCreditCardPrepaid,
  setIsOpenBalancePrepaid,
  setIsUnitTypeOverWidth,
  setMiscellaneousCustomer,
  setMiscellaneousDelivery,
  setMiscellaneousPickup,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";

function Unit({ styles, data }) {
  const dispatch = useDispatch();
  const unitData = data?.data?.[0] || "";

  return (
    <div className="p-1 ps-2">
      <Row>
        {/********************** First Column Starts *********************** */}
        <Col xs={4}>
          {/* ********************* */}
          {/* Unit Number */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Unit Number</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                name="unitNumber"
                value={unitData?.unitNumber || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Model */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Model</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} name="model" value={unitData?.model || ""} disabled />
            </Col>
          </Form.Group>

          {/* Model Code */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Model Code</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl`}
                name="modelCode"
                value={unitData?.modelCode || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* VIN */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>VIN</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} name="vin" value={unitData?.VIN || ""} disabled />
            </Col>
          </Form.Group>

          {/* Serial Number */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Serial Number</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={unitData?.serialNumber || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Stock Number */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Stock Number</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={unitData?.stockNumber || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* unit type */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Unit Type</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={unitData?.UnitTypeDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Engine Type */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Engine Type</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
              <CustomRadioGroup
                horizontal
                options={[
                  { value: "Gas", label: "Gas" },
                  { value: "diesel", label: "Diesel" },
                  { value: "", label: "NA" },
                ]}
                disabled
                selectedOption={unitData?.EngineType}
              />
            </Col>
          </Form.Group>

          {/* Special Code */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Special Code</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={unitData?.SpecialCodeDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Pickup Location */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Pickup Location</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}

                value={unitData?.PickUpName || ""}
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
                className={`customFormControl`}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.PickUpAddress1 || ""}
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
                className={`customFormControl`}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.PickUpAddress2 || ""}
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
                className={`customFormControl`}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.PickUpCity || ""}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={unitData?.PickUpstate || ""}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={unitData?.PickUpZip || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Miscellaneous pickup */}

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                Miscellaneous pickup
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={unitData?.miscellaneousPickup || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          {/* Delivery Dealer */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Delivery Dealer</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.DeliveryName || ""}
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
                className={`customFormControl`}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.DeliveryAddress1 || ""}
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
                className={`customFormControl`}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.DeliveryAddress2 || ""}
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
                className={`customFormControl`}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                value={unitData?.DeliveryCity || ""}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={unitData?.DeliveryStateCode || ""}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={unitData?.DeliveryPostalCode || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousCustomer">
                Miscellaneous Delivery
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={unitData?.miscellaneousDelivery || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>
        </Col>

        {/********************** First Column Ends *********************** */}

        <Col xs={3}>
          {/* Collect For Customers */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Collect For Customers</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                value={unitData?.collectForCustomer || ""}
                disabled
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>PO Number</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                value={unitData?.PONumber || ""}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Authorized By</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}

                value={unitData?.authorizedBy || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Project Code</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.projectCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.plantOrderNumber ? unitData.plantOrderNumber : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Plant Order Number</Form.Label>
            </Col>
            <Col xs={4} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.plantOrderNumber || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.bank ? unitData.bank : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Bank</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.bank || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.client ? unitData.client : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Client</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.client || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>GVWR</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.GVWR || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Shipping Weight</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.shippingWeight || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.MaximumTolls ? unitData.MaximumTolls : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Driver Tolls</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MaximumTolls || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.MaximumPermits ? unitData.MaximumPermits : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Driver Permits</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MaximumPermits || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.invoicePortEscortFee ? unitData.invoicePortEscortFee : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Port Escort Fee</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.invoicePortEscortFee || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.invoiceMiles ? unitData.invoiceMiles : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Invoice Miles</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.invoiceMiles || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.driverMiles ? unitData.driverMiles : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Driver Miles</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.driverMiles || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.invoiceFlatRate ? unitData.invoiceFlatRate : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Invoice Flatrate</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.invoiceFlatRate || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.driverFlatRate ? unitData.driverFlatRate : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Driver Flatrate</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.driverFlatRate || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.commission ? unitData.commission : "hide-elements"}`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Commission</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.commission || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Needs to change when sp changes */}
          <Form.Group className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 `} hidden={!unitData?.Broker}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Broker</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.Broker || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 `}
            hidden={!unitData?.PortsOfEntry}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Port of Entry</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.PortsOfEntry || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={2} className="px-0">
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.CDLARequired ? unitData.CDLARequired : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Required CDL-A
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                checked={unitData?.CDLARequired || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.tankerRequired ? unitData.tankerRequired : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Tanker
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData?.tankerRequired || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.TWICRequired ? unitData.TWICRequired : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Required TWIC
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData?.TWICRequired || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Required IFTA Reporting
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                checked={unitData?.IFTA || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Has Driveby's
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                checked={unitData?.hasDriveBys || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.dealerPickup ? unitData.dealerPickup : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Dealer Pickup
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData?.dealerPickup || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.storage ? unitData.storage : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Storage
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData?.storage || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.PlantRelease ? unitData.PlantRelease : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Factory Release
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData?.PlantRelease || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Do Not Invoice
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData?.noInvoice || ""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Needs to Change when sp change */}
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.MultiUnit ? unitData.MultiUnit : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Multi Unit Load
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData?.MultiUnit || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.MultiUnitLoadCity ? unitData.MultiUnitLoadCity : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Multi Unit Load
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 ">
              <input
                type="text"
                style={{ width: "185px" }}
                name="MultiUnitLoad"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MultiUnitLoadCity || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.Invoice2as3 ? unitData.Invoice2as3 : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Invoice 2 as 3
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                checked={unitData?.Invoice2as3 || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Required Flatbed
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                checked={unitData?.requireFlatbed || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.DeliveryDelayContact ? unitData.DeliveryDelayContact : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Contact Dealer For Delays
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                checked={unitData?.DeliveryDelayContact || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.invoiceFODBreakdownToDealer ? unitData.invoiceFODBreakdownToDealer : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Invoice Dealer For Break Down
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                checked={unitData?.invoiceFODBreakdownToDealer || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.freezePOE ? unitData.freezePOE : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Freeze Port of Entry
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                checked={unitData?.freezePOE || ""}
                disabled
                className="form-check-input p-0"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.freezePOE ? unitData.freezePOE : "hide-elements"}`}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Freeze Port of Entry
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input type="checkbox" className="form-check-input p-0" />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Freeze Port of Entry
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input type="checkbox" className="form-check-input p-0" />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-1 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Entered By
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 ">
              <input type="text" className="w-200" value={unitData?.EnteredBy || ""} disabled />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={3} className="ps-5">
          <Col xs={12} className="p-0">
            <Form.Label className={`customColFormLabel mt-2 `}>Miscellaneous BOL Text</Form.Label>
          </Col>
          {/* <div style={{ maxHeight: "100px", overflowY: "auto", marginTop: "10px" }}> */}
          <Form.Group
            className="mt-1 align-items-center row  m-l-0 m-r-0 ms-0"
            style={{ maxHeight: "100px", overflowY: "auto", marginTop: "10px" }}
          >
            <Col sm={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MiscellaneousBOLText1 || ""}
                disabled
              />
            </Col>
            <Col sm={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MiscellaneousBOLText2 || ""}
                disabled
              />
            </Col>
            <Col sm={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MiscellaneousBOLText3 || ""}
                disabled
              />
            </Col>

            <Col sm={12} className="p-0 mt-2">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MiscellaneousBOLText4 || ""}
                disabled
              />
            </Col>
            <Col sm={12} className="p-0 mt-3">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MiscellaneousBOLText5 || ""}
                disabled
              />
            </Col>
            <Col sm={12} className="p-0 mt-3">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MiscellaneousBOLText6 || ""}
                disabled
              />
            </Col>
            <Col sm={12} className="p-0 mt-3">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.MiscellaneousBOLText7 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          {/* </div> */}
          <Form.Group
            className={`mt-4 align-items-center row  m-l-0 m-r-0 ms-0  ${unitData?.dealerPickup ? unitData.dealerPickup : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              {/* <Form.Label className={`customColFormLabel`}>Invoice ELD Fee</Form.Label> */}
            </Col>
            <Col sm={8} className="p-0 mt-3">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.invoiceELDFee ? unitData.invoiceELDFee : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Invoice ELD Fee</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.invoiceELDFee || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.driverELDFee ? unitData.driverELDFee : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Driver ELD Fee</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
                value={unitData?.driverELDFee || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Do Not Dispatch
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                checked={unitData?.doNotDispatch || ""}
                disabled
                className="form-check-input  p-0"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Units per Dispatch</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}

                value={unitData?.unitsPerDispatch || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                className={`customFormControl 
          `}
                name="unitNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={21}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.plantReleaseDate ? unitData.plantReleaseDate : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Release Date</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <DateInputField
                date={unitData?.plantReleaseDate || ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.DeliveryDate ? unitData.DeliveryDate : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Deliver By Date</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <DateInputField
                date={unitData?.DeliveryDate || ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.minimumPickupDate ? unitData.minimumPickupDate : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Earliest Pickup Date</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <DateInputField
                date={unitData?.minimumPickupDate || ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                disabled
                className={""}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.maximumPickupDate ? unitData.maximumPickupDate : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Latest Pickup Date</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <DateInputField
                date={unitData?.maximumPickupDate || ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                disabled
                className={""}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.minimumDeliveryDate ? unitData.minimumDeliveryDate : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Earliest Delivery Date</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <DateInputField
                date={unitData?.minimumDeliveryDate || ""}
                min={""}
                reduxSetDate={(value) => {}}
                disabled
                setIsDateValid={""}
                className={""}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.MaximumDeliveryDate ? unitData.MaximumDeliveryDate : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Latest Delivery Date</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <DateInputField
                date={unitData?.MaximumDeliveryDate || ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${unitData?.OrderDate ? unitData.OrderDate : "hide-elements"}`}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}>Order Date</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <DateInputField
                date={unitData?.OrderDate || ""}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Last Edit - shown only when the unit has an update user */}
          {unitData?.UpdateUserFK != null && (
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className={`customColFormLabel`}>Last Edit</Form.Label>
              </Col>
              <Col xs={4} className="p-0">
                <input className={`customFormControl`} type="text" value={unitData?.Name || ""} disabled />
              </Col>
              <Col xs={3} className="p-1 ">
                <DateInputField
                  date={unitData?.UpdateDate || ""}
                  min={""}
                  reduxSetDate={(value) => {}}
                  setIsDateValid={""}
                  className={""}
                  disabled
                />
              </Col>
            </Form.Group>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Unit;
