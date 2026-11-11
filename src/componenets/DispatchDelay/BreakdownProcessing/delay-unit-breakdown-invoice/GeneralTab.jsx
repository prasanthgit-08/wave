import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const GeneralTab = ({ data }) => {
  return (
    <div>
      <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-1">
        <Col sm={2} md={2} xs={2} className="p-0" />
        <Col xs={2} md={2} sm={2} className="p-0 ">
          <input
            name="label"
            id="label"
            type="text"
            className="customFormControl"
            maxLength={60}
            value={data?.driverName || ""}
            autoComplete="off"
            aria-autocomplete="list"
            disabled
          />
        </Col>
      </Form.Group>

      <Row className="mx-0 p-0 mt-2">
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} />
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Hours</Form.Label>
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Rate</Form.Label>
          </div>
          <div className="d-flex flex-shrink-0 w-120px">
            <Form.Label className="customColFormLabel ms-1">Invoice</Form.Label>
          </div>
          <div className="d-flex flex-shrink-0 w-120px">
            <Form.Label className="customColFormLabel ms-1">Driver</Form.Label>
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Invoice Downtime</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={data?.invoiceDowntimeHours || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={6}
              value={data?.invoiceDowntimeRate || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.invoiceDowntimeAmount || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Drivers Downtime</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={data?.driverDowntimeHours || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={6}
              value={data?.driverDowntimeRate || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px hide-elements" />
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.driverDowntimeAmount || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Attempted Pickup</Form.Label>
          </Col>
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.invoiceAPUAmount || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.driverAPUAmount || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Attempted Pickup Authorized By</Form.Label>
          </Col>
          <div className="d-flex flex-shrink-0 w-250">
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={data?.aPUAuthorizedBy || ""}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Permits</Form.Label>
          </Col>
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.invoicePermits || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.driverPermits || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Tolls</Form.Label>
          </Col>
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.invoiceTolls || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.driverTolls || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} />
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Gallons</Form.Label>
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Price</Form.Label>
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Fuel Credit</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={data?.driverFuelGallons || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={6}
              value={data?.fuelPricePerGallon || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px hide-elements" />
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.driverFuelCredit || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} />
          <div className={`d-flex flex-shrink-0 w-100px `}>
            <Form.Label className="customColFormLabel ms-1">Miles</Form.Label>
          </div>
          <div className={`d-flex flex-shrink-0 w-100px `}>
            <Form.Label className="customColFormLabel ms-1">Rate</Form.Label>
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Invoice Additional Miles</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px `}>
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={data?.additional_Inv_Miles || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className={`d-flex flex-shrink-0 w-100px `}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={data?.additional_Inv_Rate || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={data?.additional_Inv_Amount || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Driver Additional Miles</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px `}>
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={data?.additional_Driver_Miles || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className={`d-flex flex-shrink-0 w-100px `}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={data?.additional_Driver_Rate || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px hide-elements" />
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={data?.additional_Driver_Amount || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Breakdown Fee</Form.Label>
          </Col>
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.invoiceBreakdownFee || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.driverBreakdownFee || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col sm={2} md={2} xs={2} className="p-0" />
          <Col xs={2} md={2} sm={2} className="p-0 ">
            <input
              name="label"
              id="label"
              type="text"
              className="customFormControl"
              maxLength={60}
              value={data?.secondDriverName || ""}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </Col>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} />
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Gallons</Form.Label>
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Price</Form.Label>
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Fuel Charge</Form.Label>
          </Col>

          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={data?.nextDriverFuelGallons || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={6}
              value={data?.fuelPricePerGallon || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px hide-elements" />
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={data?.nextDriverFuelCharge || 0}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
      </Row>
    </div>
  );
};

export default GeneralTab;
