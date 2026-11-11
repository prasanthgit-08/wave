import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import { setSaveFormData } from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";

const Comments = () => {
  const dispatch = useDispatch();
  const [customerNotes, setCustomerNotes] = useState("");
  const [inHouseNotes, setInHouseNotes] = useState("");

  //save paylod
  const commentsTabData = () => {
    dispatch(
      setSaveFormData({
        customerNotes: customerNotes ? `${customerNotes}\n` : null,
        inhouseNotes: inHouseNotes ? `${inHouseNotes}\n` : null,
      })
    );
  };

  useEffect(() => {
    commentsTabData();
  }, [customerNotes, inHouseNotes]);
  return (
    <div className={"p-15 w-100"}>
      <Row className="m-0 p-0">
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">In House Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={20}
                cols={12}
                type="comments"
                className="customFormControl h-100 "
                name="comments"
                value={inHouseNotes}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onChange={(e) => {
                  setInHouseNotes(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">Customer Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={20}
                cols={12}
                className="customFormControl h-100 "
                name="customerComents"
                value={customerNotes}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onChange={(e) => {
                  setCustomerNotes(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Comments;
