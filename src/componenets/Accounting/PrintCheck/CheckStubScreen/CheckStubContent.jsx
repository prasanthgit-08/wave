import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DynamicTextFields from "../../../common/AutoWrapTextFields/DynamicTextFields";
import { setTextArray } from "../../../../redux/PrintCheckSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CheckStubContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkStubInputValues, setCheckStubInputValues] = useState(Array(15).fill(""));
  const textArray = useSelector((state) => state.printCheckReducer.textArray);
  const printCheckFlag = useSelector((state) => state.printCheckReducer.printCheckFlag);

  useEffect(() => {
    if (textArray.length !== 0) {
      setCheckStubInputValues(textArray);
    }
  }, []);

  useEffect(() => {
    dispatch(setTextArray(checkStubInputValues));
  }, [checkStubInputValues]);

  useEffect(() => {
    if (!printCheckFlag) {
      navigate(`/print-check-options-screen`);
    }
  }, [printCheckFlag]);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}>
            <Form.Group className="mt-0 align-items- row  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">Check Stub</Form.Label>
              </Col>
              <Col xs={7} md={7} lg={7} className="p-0">
                <DynamicTextFields
                  numFields={15}
                  maxCharLimit={70}
                  maxLimit={70}
                  inputValues={checkStubInputValues}
                  setInputValues={setCheckStubInputValues}
                  invoice
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CheckStubContent;
