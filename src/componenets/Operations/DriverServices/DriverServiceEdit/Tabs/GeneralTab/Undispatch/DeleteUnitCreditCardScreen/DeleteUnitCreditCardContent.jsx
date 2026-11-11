import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../../../common/AutoCompleteDropdown";
const DeleteUnitCreditCardContent = ({ styles }) => {
  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-0 ">
          <Col lg={6} xl={6} sm={6} md={6} xs={6} className={" ps-0 p-l-10"}>
            <div className="fixTableHead ">
              <p className="mt-1 ">Credit Cards Authorized</p>
              <div className={`border border-secondary overflow-auto h-175px`}>
                <table className="table border-bottom  table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th className="col-6">Card Number</th>

                      <th className="col-4">Authorized Amount</th>
                    </tr>
                  </thead>

                  <tbody>{}</tbody>
                </table>
              </div>{" "}
            </div>

            <Col xs={3} sm={3} md={3} lg={3} style={{ marginLeft: "340px" }}>
              <div className="d-flex justify-content-end h-100">
                <div className="d-flex flex-column justify-content-center">
                  <span className="p-1">
                    <button className="btn btn-secondary font-12 btn-sm btn-medium-with">New</button>
                  </span>
                  <span className="p-1">
                    <button className="btn btn-secondary font-12 btn-sm btn-medium-with" type="button">
                      Edit
                    </button>
                  </span>

                  <span className="p-1">
                    <button className="btn btn-secondary font-12 btn-sm btn-medium-with" type="button">
                      Save
                    </button>
                  </span>

                  <span className="p-1">
                    <button className="btn btn-secondary font-12 btn-sm btn-medium-with" type="button">
                      Cancel
                    </button>
                  </span>

                  <span className="p-1">
                    <button className="btn btn-secondary font-12 btn-sm btn-medium-with" type="button">
                      Delete
                    </button>
                  </span>
                </div>
              </div>
            </Col>
          </Col>

          <Col sm={6} md={6} lg={6} xl={6} xs={6}>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Invoice Return Amount</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  className={`customFormControl`}
                  type="text"
                  name="payBalance"
                  autoComplete="off"
                  aria-autocomplete="list"
                  maxLength={7}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Remaining Amount</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  className={`customFormControl`}
                  type="text"
                  name="payBalance"
                  autoComplete="off"
                  aria-autocomplete="list"
                  maxLength={7}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Charge Amount</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  className={`customFormControl`}
                  type="text"
                  name="payBalance"
                  autoComplete="off"
                  aria-autocomplete="list"
                  maxLength={7}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Customer Credit Card</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                <AutoCompleteDropdown />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Credit Card Number</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0 ">
                <input
                  className={`customFormControl`}
                  type="text"
                  name="payBalance"
                  autoComplete="one-time-code"
                  spellCheck={false}
                  aria-autocomplete="none"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Expiration Date</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  className={`customFormControl`}
                  type="text"
                  name="payBalance"
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Billing Zipcode</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0 ">
                <input
                  className={`customFormControl`}
                  type="text"
                  name="payBalance"
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Billing Address</Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0 ">
                <input
                  className={`customFormControl`}
                  type="text"
                  name="payBalance"
                  autoComplete="off"
                  aria-autocomplete="list"
                  maxLength={7}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Security Code</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  className={`customFormControl`}
                  type="text"
                  name="payBalance"
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <button className="mt-3 btn btn-secondary btn-medium-with btn-sm m-l- m-r-5 m-b-5" type="">
              Authorize Card
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DeleteUnitCreditCardContent;
