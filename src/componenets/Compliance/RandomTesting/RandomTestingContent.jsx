import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setDisableProcess,
  setEmailSelection,
  setPrintSelection,
  setRandomTestingData,
} from "../../../redux/Compliance/RandomTestingSlice";
import DeleteComponent from "../../common/DeleteComponent";
import { useNavigate } from "react-router-dom";
import RandomTestingService from "../../../services/Compliance/RandomTestingService";
const RandomTestingContent = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const printSelection = useSelector((state) => state.randomTestingReducer.printSelection);
  const emailSelection = useSelector((state) => state.randomTestingReducer.emailSelection);
  const isValidateFlag = useSelector((state) => state.randomTestingReducer.isValidateFlag);

  /*****Set the Form data for Random Testing*****/
  useEffect(() => {
    dispatch(
      setRandomTestingData({
        printSelection: printSelection,
        emailSelection: emailSelection,
      })
    );
  }, [emailSelection, printSelection]);

  /******
   * Save Validation
   * *****/
  useEffect(() => {
    if (emailSelection || printSelection) {
      dispatch(setDisableProcess(false));
    } else {
      dispatch(setDisableProcess(true));
    }
  }, [emailSelection, printSelection]);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label dealer-label"> </Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Print Selection Letters</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 ${
                    !printSelection && !emailSelection && isValidateFlag ? "borderRed" : ""
                  }`}
                  name="printSelection"
                  value={printSelection}
                  checked={printSelection}
                  onChange={(e) => dispatch(setPrintSelection(e.target.checked))}
                  disabled={!isValidateFlag}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Email Selection Letters</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 ${
                    !printSelection && !emailSelection && isValidateFlag ? "borderRed" : ""
                  }`}
                  name="emailSelection"
                  value={emailSelection}
                  checked={emailSelection}
                  onChange={(e) => dispatch(setEmailSelection(e.target.checked))}
                  disabled={!isValidateFlag}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RandomTestingContent;
