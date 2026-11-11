import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import CreditCardListing from "./CreditCardListing";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import ButtonComponent from "../../../../../common/Button";

function CreditCardContent({ styles }) {
  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          <p>Credit Card Authorized</p>
          <CreditCardListing />
        </Col>
        <Col>
          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Invoice Difference
              </Form.Label>
            </Col>

            <Col xs={3} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Remaining Amount
              </Form.Label>
            </Col>

            <Col xs={3} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Charge Amount
              </Form.Label>
            </Col>

            <Col xs={3} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Customer Credit Card
              </Form.Label>
            </Col>

            <Col xs={6} className={`p-0 ${styles.selectContainer}`}>
              <AutoCompleteDropdown
                disabled={true}
                arrayList={[]}
                searchString={""}
                renderItemId={() => {}}
                renderItemField={() => {}}
                handleSearchString={() => {}}
                fetchDataBySearchString={() => {}}
                onSelect={() => {}}
                matchContains
                selectedId={""}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Charge Amount
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Credit Card Number
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="one-time-code"
                spellCheck={false}
                aria-autocomplete="none"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Expiration Date
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Billing Address
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Billing Zipcode
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Security Code
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                <ButtonComponent
                  route={""}
                  className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                  label={"Authorize"}
                />
              </Form.Label>
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                <ButtonComponent
                  route={""}
                  className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                  label={"Credit"}
                />
              </Form.Label>
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                <ButtonComponent
                  route={""}
                  className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                  label={"Void"}
                />
              </Form.Label>
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default CreditCardContent;
