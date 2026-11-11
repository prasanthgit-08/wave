import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const GeneralTab = () => {
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
