import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
const DelayInstructions = () => {
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);
  const [instructionsData, setInstructionsData] = useState();
  const [loading, setLoading] = useState(false);
  const { unitfk, companyName } = useParams();
  //used to load instructions data
  const getNewDelayDetails = () => {
    setLoading(true);
    DelayProcessingService.fetchNewDelayDetails(unitfk, "DelayInstructions", companyName, 0, 10, "", false)
      .then((response) => {
        const data = response?.data[0];
        setInstructionsData(data?.DelayInstructions);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (unitfk) {
      getNewDelayDetails();
    }
  }, [unitfk]);
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
      {loading && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DelayInstructions;
