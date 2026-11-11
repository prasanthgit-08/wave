import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../../common/LookupButton";
import DateInputField from "../../../../../../../common/DateInputField";

function CreditCardContent() {
  return (
    <div className="h-448px px p-1">
      <div className=" h-430px w-950px  shadow-sm rounded border">
        <Row>
          <Col xs={6} md={6} sm={6}>
            <div className="d-flex border border-1 border-dark m-t-70">
              <div className="flex-grow-1">
                <div className="fixTableHead h-210px">
                  <table className="table table-striped f-w-600">
                    <thead>
                      <tr disabled>
                        <th>Card Number</th>
                        <th>Authorized Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="f-w-600"> unit-123 </td>
                        <td className="f-w-600"> dsjfgsdg </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={6} md={6} sm={6}>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                Reroute Amount{" "}
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={""}
                  autoComplete="one-time-code"
                  disabled={""}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                Remining Amount{" "}
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={""}
                  autoComplete="one-time-code"
                  disabled={""}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={4} md={4} sm={4} className="p-0">
                Charge Amount{" "}
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={""}
                  autoComplete="one-time-code"
                  disabled={""}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label ">Customer Credit Card</Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="d-flex align-items-center p-0">
                <AutoCompleteDropdown
                  arrayList={[]}
                  searchString={""}
                  onSelect={(selectedItem) => {}}
                  className="custom-autocomplete"
                  disabled={false}
                />
                <LookupButton onClick={() => {}} disabled={false} />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                Credit Card Number{" "}
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={""}
                  autoComplete="one-time-code"
                  spellCheck={false}
                  aria-autocomplete="list"
                  disabled={""}
                  onInput={""}
                  onBlur={""}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Expiration Date</Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0">
                <DateInputField date={""} reduxSetDate={""} disabled placeholder=" " />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                Billing Zipcode{" "}
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={""}
                  autoComplete="one-time-code"
                  disabled={""}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                Billing Address{" "}
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={""}
                  autoComplete="one-time-code"
                  disabled={""}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                Security Code
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={""}
                  autoComplete="one-time-code"
                  disabled={""}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Col xs={4} md={4} sm={4}>
              <button
                className="btn btn-secondary font-12 btn-sm mt-1 "
                type=""
                hidden={""}
                disabled={""}
                onClick={""}
              >
                Authorize Card
              </button>
            </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CreditCardContent;
