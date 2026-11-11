import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setEmailCondition } from "../../../../../redux/EmailRecipientSlice";

const EmailCondition = () => {
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.emailRecipient.viewDetail);
  const emailCondition = useSelector((state) => state.emailRecipient.emailCondition);
  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border " style={{ height: "400px" }}>
        <div className="m-b-10">
          <div className="p-1 w-100">
            <Row className="m-0 p-10">
              <Form.Group className=" mt-5 m-b-10 align-items row  m-l-0 m-r-0 ">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className=" col-form-label dealer-label">Email Condition</Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="p-0">
                  <textarea
                    rows={30}
                    cols={30}
                    style={{
                      resize: "none",
                      display: "fixed",
                      minHeight: "300px",
                      minWidth: "600px", // increase this
                      maxHeight: "300px",
                      maxWidth: "800px", // increase this too
                      boxShadow: "none",
                      fontSize: "12px",
                    }}
                    type="text"
                    className={`customFormControl h-100 textarea-height customFocusClass`}
                    name="emailCondition"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={emailCondition}
                    disabled={viewDetail}
                    onChange={(e) => {
                      dispatch(setEmailCondition(e.target.value));
                    }}
                  />
                </Col>
              </Form.Group>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCondition;
