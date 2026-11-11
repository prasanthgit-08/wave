import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import {
  setCustomerNotes,
  setDelayCustomerNotes,
  setDelayInHouseNotes,
  setInHouseNotes,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";

const Comments = () => {
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);
  const user = useSelector((state) => state.delayProcessing.user);
  const customerNotes = useSelector((state) => state.delayProcessing.customerNotes);
  const inHouseNotes = useSelector((state) => state.delayProcessing.inHouseNotes);
  const dispatch = useDispatch();
  return (
    <div className={viewOnly ? "p-15 w-100 disableInputElements" : "p-15 w-100"}>
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
                value={
                  rowData?.inHouseNotes
                    ? rowData?.inHouseNotes?.replace(/<DelayNotes>|<BreakdownNotes>/g, "")
                    : inHouseNotes
                }
                autoComplete="off"
                disabled={viewOnly}
                onChange={(e) => {
                  dispatch(setInHouseNotes(e.target.value));
                  dispatch(
                    setDelayInHouseNotes(
                      rowData?.delayInHouseNotes
                        ? `${rowData?.delayInHouseNotes?.replace(/<DelayNotes>|<BreakdownNotes>/g, "")}\n${
                            e.target.value
                          }\n[${new Date().toISOString()}]\t${user}`
                        : `${e.target.value}\n[${new Date().toISOString()}]\t${user}`
                    )
                  );
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
                type="customerComents"
                disabled={viewOnly}
                className="customFormControl h-100 "
                name="customerComents"
                value={
                  rowData?.customerNotes
                    ? rowData?.customerNotes?.replace(/<DelayNotes>|<BreakdownNotes>/g, "")
                    : customerNotes
                }
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  dispatch(setCustomerNotes(e.target.value));
                  dispatch(
                    setDelayCustomerNotes(
                      rowData?.delayCustomerNotes
                        ? `${rowData?.delayCustomerNotes?.replace(/<DelayNotes>|<BreakdownNotes>/g, "")}\n${
                            e.target.value
                          }\n[${new Date().toISOString()}]\t${user}`
                        : `${e.target.value}\n[${new Date().toISOString()}]\t${user}`
                    )
                  );
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
