import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import {
  setCustomerNotes,
  setDelayCustomerNotes,
  setDelayInHouseNotes,
  setInHouseNotes,
  setCommentsTabData,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";

const CommentsTab = () => {
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  const viewOnly = useSelector((state) => state.delaybreakdown.viewOnly);
  const user = useSelector((state) => state.delaybreakdown.user);
  const customerNotes = useSelector((state) => state.delaybreakdown.customerNotes);
  const inHouseNotes = useSelector((state) => state.delaybreakdown.inHouseNotes);
  const dispatch = useDispatch();

  const getRecordBasedPnUnit = () => {
    BreakdownProcessingService.getDelayBreakdownDetails("Comments", 23761, selectedCompanyName, 0)
      .then((res) => {
        const data = res?.data?.breakdownDetails;

        dispatch(setCommentsTabData(data[0]));
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getRecordBasedPnUnit();
  }, []);
  return (
    <div className={"p-15 w-100"}>
      <Row className="m-0 p-0">
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">In House Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={25}
                cols={12}
                type="comments"
                className="customFormControl h-100 "
                name="comments"
                value={inHouseNotes}
                autoComplete="off"
                onChange={(e) => {
                  dispatch(setInHouseNotes(e.target.value));
                  dispatch(
                    setDelayInHouseNotes(
                      `${inHouseNotes}\n${e.target.value}\n[${new Date().toISOString()}]\t${user}`
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
                rows={25}
                cols={12}
                type="customerComents"
                className="customFormControl h-100 "
                name="customerComents"
                value={customerNotes}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  dispatch(setCustomerNotes(e.target.value));
                  dispatch(
                    setDelayCustomerNotes(
                      `${customerNotes}\n${e.target.value}\n[${new Date().toISOString()}]\t${user}`
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

export default CommentsTab;
