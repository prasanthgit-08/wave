import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { setInstructionsTabData } from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";

const BreakdownInstructions = () => {
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

  const [instructionsData, setInstructionsData] = useState();
  const dispatch = useDispatch();

  const getRecordBasedPnUnit = () => {
    let unitId = null;
    if (rowData?.unitPK) {
      unitId = rowData?.unitPK;
    }
    if (rowData?.unitFK) {
      unitId = rowData?.unitFK;
    }
    BreakdownProcessingService.getDelayBreakdownDetails("Instructions", unitId, selectedCompanyName, 0)
      .then((res) => {
        const data = res?.data?.breakdownDetails;
        setInstructionsData(data[0].DelayInstructions);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getRecordBasedPnUnit();
  }, []);

  return (
    <div className={viewOnly ? "p-15 w-100 disableInputElements" : "p-15 w-100"}>
      <Row className="m-0 p-0">
        <Col xs={12} sm={12} md={12} lg={12} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-1 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20"></label>

            <Col sm={12} md={12} className="p-0">
              <textarea
                rows={26}
                cols={10}
                type="breakdownInstructions"
                className="customFormControl h-100 "
                name="breakdownInstructions"
                value={instructionsData}
                autoComplete="off"
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default BreakdownInstructions;
