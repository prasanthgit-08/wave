import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Form } from "react-bootstrap";
import CustomRadioGroup from "../../common/CustomRadioGroup";
import { setBolFor } from "../../../redux/ReprintBolSlice";

const ReprintSelectionContent = () => {
  const dispatch = useDispatch();
  const bolFor = useSelector((state) => state.reprintBolReducer.bolFor);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col className="p-5 mt-5 mb-3" xs={8}>
            <Form.Group className="form-group row m-l-0 m-r-0 justify-content-center">
              <Col xs={7} className="p-0" style={{ marginLeft: "170px", marginTop: "100px" }}>
                <div className="d-flex align-items-center">
                  <Form.Label className="customColFormLabel me-3 w-50px">
                    <span className="f-w-600"> BOL For</span>{" "}
                  </Form.Label>
                  <CustomRadioGroup
                    horizontal
                    name="bolFor"
                    selectedOption={bolFor}
                    options={[
                      { value: "driver", label: "Driver" },
                      { value: "Dispatches", label: "Dispatch" },
                      { value: "Units", label: "Unit" },
                      { value: "shuttle", label: "Shuttle" },
                    ]}
                    onChange={(value) => {
                      dispatch(setBolFor(value));
                    }}
                  />
                </div>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReprintSelectionContent;
