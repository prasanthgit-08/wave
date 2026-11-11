import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

const DelayInstructions = () => {
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);
  const { companyName } = useParams();
  const [instructionsData, setInstructionsData] = useState();

  /**
   *  Delay Fetch DelayInstructions function
   **/
  const getDelayInstructions = () => {
    let unitNumber = null;
    let customerplantfk = null;
    let customerfk = null;
    if (rowData?.delayedUnitPK) {
      unitNumber = rowData?.delayedUnitPK;
      customerplantfk = rowData?.unit?.customerPlantFK;
      customerfk = rowData?.unit?.customerFK;
    }
    if (rowData?.unitPK) {
      unitNumber = rowData?.unitPK;
      customerplantfk = rowData?.customerPlantIntFK;
      customerfk = rowData?.customerIntFK;
    }
    DelayProcessingService.getDelayInstructions(companyName, unitNumber, customerplantfk, customerfk)
      .then((response) => {
        if (response?.data != null) {
          setInstructionsData(response?.data);
        } else {
          console.log("No Delay Instructions Data Found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDelayInstructions();
  }, []);

  return (
    <div className={viewOnly ? "p-15 w-100 disableInputElements" : "p-15 w-100"}>
      <Row className="m-0 p-0">
        <Col xs={12} sm={12} md={12} lg={12} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-1 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20"></label>

            <Col sm={12} md={12} className="p-0">
              <textarea
                rows={23}
                cols={10}
                type="delayInstructions"
                className="customFormControl h-100 "
                name="delayInstructions"
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

export default DelayInstructions;
