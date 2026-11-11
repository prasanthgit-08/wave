import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverDrugTestData,
  setIsAlcoholCondition,
  setIsAlcoholStateValidation,
  setIsAlcoholTabValid,
} from "../../../../../../../redux/DriverDrugTestsSlice";

const AlcoholTest = () => {
  const dispatch = useDispatch();

  const [isAlcoholTestPositive, setIsAlcoholTestPositive] = useState(false);
  const [isRefusedAlcoholTest, setIsRefusedAlcoholTest] = useState(false);
  const [reasonRefused, setReasonRefused] = useState("");
  const [isAlcoholTestCanceled, setIsAlcoholTestCanceled] = useState(false);
  const [reasonCanceled, setReasonCanceled] = useState("");
  const [alcoholTestPlus, setAlcoholTestPlus] = useState("0");
  const [alcoholTestOver, setAlcoholTestOver] = useState(false);

  const formData = useSelector((state) => state.driverDrugTests.formData);
  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const notTestedValue = useSelector((state) => state.driverDrugTests.notTestedValue);
  const resultClicked = useSelector((state) => state.driverDrugTests.resultClicked);
  const testDateCheck = useSelector((state) => state.driverDrugTests.testDateCheck);
  const overWritePermission = useSelector((state) => state.driverDrugTests.overWritePermission);

  useEffect(() => {
    if (formData != null) {
      setIsAlcoholTestPositive(formData?.alcoholTestPositive || false);
      setIsRefusedAlcoholTest(formData?.refusedAlcoholTest || false);
      setReasonRefused(formData?.refusedAlcoholTestReason || "");
      setIsAlcoholTestCanceled(formData?.alcoholTestCanceled || false);
      setReasonCanceled(formData?.alcoholCanceledReason || "");
      setAlcoholTestOver(formData?.alcoholTestPlus === "4");
    }
  }, [formData, viewDetail, resultClicked]);

  const alcoholTestTabData = () => {
    dispatch(
      setDriverDrugTestData({
        alcoholTestPositive: isAlcoholTestPositive,
        refusedAlcoholTest: isRefusedAlcoholTest,
        refusedAlcoholTestReason: reasonRefused,
        alcoholTestCanceled: isAlcoholTestCanceled,
        alcoholCanceledReason: reasonCanceled,
        alcoholTestPlus: alcoholTestPlus,
      })
    );
  };

  useEffect(() => {
    alcoholTestTabData();
  }, [
    isAlcoholTestPositive,
    isRefusedAlcoholTest,
    reasonRefused,
    isAlcoholTestCanceled,
    reasonCanceled,
    alcoholTestPlus,
  ]);

  useEffect(() => {
    if (isAlcoholTestPositive) {
      if (alcoholTestOver) {
        setAlcoholTestPlus("4");
      } else {
        setAlcoholTestPlus("2");
      }
    } else {
      setAlcoholTestPlus("0");
      setAlcoholTestOver(false);
    }
  }, [alcoholTestOver, isAlcoholTestPositive]);

  useEffect(() => {
    if (isAlcoholTestPositive) {
      setIsAlcoholTestCanceled(false);
      setIsRefusedAlcoholTest(false);
      setReasonCanceled("");
      setReasonRefused("");
    }
    if (isRefusedAlcoholTest) {
      setIsAlcoholTestCanceled(false);
      setReasonCanceled("");

      setIsAlcoholTestPositive(false);
    } else {
      setReasonRefused("");
    }
    if (isAlcoholTestCanceled) {
      setIsAlcoholTestPositive(false);
      setIsRefusedAlcoholTest(false);
      setReasonRefused("");
    } else {
      setReasonCanceled("");
    }
  }, [isAlcoholTestCanceled, isRefusedAlcoholTest, isAlcoholTestPositive]);

  useEffect(() => {
    if (isRefusedAlcoholTest) {
      if (reasonRefused) {
        dispatch(setIsAlcoholTabValid(true));
      } else {
        dispatch(setIsAlcoholTabValid(false));
      }
    } else {
      dispatch(setIsAlcoholTabValid(true));
    }
  }, [isRefusedAlcoholTest, reasonRefused]);

  useEffect(() => {
    if (isAlcoholTestCanceled) {
      if (reasonCanceled) {
        dispatch(setIsAlcoholTabValid(true));
      } else {
        dispatch(setIsAlcoholTabValid(false));
      }
    } else {
      dispatch(setIsAlcoholTabValid(true));
    }
  }, [isAlcoholTestCanceled, reasonCanceled]);

  useEffect(() => {
    if (notTestedValue) {
      setIsAlcoholTestPositive(false);
      setIsAlcoholTestCanceled(false);
      setIsRefusedAlcoholTest(false);
    }
  }, [notTestedValue]);

  useEffect(() => {
    if (!isAlcoholTestPositive && !isRefusedAlcoholTest && !isAlcoholTestCanceled) {
      dispatch(setIsAlcoholCondition(true));
    } else {
      dispatch(setIsAlcoholCondition(false));
    }
  }, [isAlcoholTestPositive, isRefusedAlcoholTest, isAlcoholTestCanceled]);

  useEffect(() => {
    if (isRefusedAlcoholTest || isAlcoholTestCanceled) {
      dispatch(setIsAlcoholStateValidation(true));
    } else {
      dispatch(setIsAlcoholStateValidation(false));
    }
  }, [isRefusedAlcoholTest, isAlcoholTestCanceled]);

  useEffect(() => {
    if (!testDateCheck) {
      setIsAlcoholTestPositive(false);
    }
  }, [testDateCheck]);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20">
        <Col sm={5} md={5} lg={5} xl={5} xs={5}>
          <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Alcohol Test Positive</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={isAlcoholTestPositive}
                onChange={(e) => {
                  setIsAlcoholTestPositive(e.target.checked);
                }}
                disabled={
                  (!resultClicked && viewDetail) ||
                  isRefusedAlcoholTest ||
                  isAlcoholTestCanceled ||
                  !testDateCheck ||
                  !overWritePermission
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Alcohol Test Over 2%</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={alcoholTestOver}
                onChange={(e) => setAlcoholTestOver(e.target.checked)}
                disabled={(viewDetail && !resultClicked) || !isAlcoholTestPositive || !overWritePermission}
              />
            </Col>
          </Form.Group>
        </Col>

        <Col sm={7} md={7} lg={7} xl={7} xs={7}>
          <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Refused Alcohol Test</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={isRefusedAlcoholTest}
                onChange={(e) => setIsRefusedAlcoholTest(e.target.checked)}
                disabled={
                  (!resultClicked && viewDetail) ||
                  isAlcoholTestPositive ||
                  isAlcoholTestCanceled ||
                  testDateCheck ||
                  !overWritePermission
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className=" mt-3 m-b-10 align-items row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label dealer-label">Reason Refused</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "350px" }}>
              <textarea
                id="reasonRefused"
                className={`customFormControl h-100 w-100 customFocusClass ${
                  overWritePermission && (!viewDetail || resultClicked) && isRefusedAlcoholTest
                    ? !reasonRefused
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                rows={5}
                cols={8}
                name="reasonRefused"
                type="text"
                value={reasonRefused}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setReasonRefused(e.target.value);
                }}
                disabled={(!resultClicked && viewDetail) || !isRefusedAlcoholTest || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Alcohol Test Canceled</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={isAlcoholTestCanceled}
                onChange={(e) => setIsAlcoholTestCanceled(e.target.checked)}
                disabled={
                  (!resultClicked && viewDetail) ||
                  isRefusedAlcoholTest ||
                  isAlcoholTestPositive ||
                  testDateCheck ||
                  !overWritePermission
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className=" mt-3 m-b-10 align-items row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label dealer-label">Reason Canceled</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "350px" }}>
              <textarea
                id="reasonCanceled"
                className={`customFormControl h-100 w-100 customFocusClass ${
                  overWritePermission && (!viewDetail || resultClicked) && isAlcoholTestCanceled
                    ? !reasonCanceled
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                rows={5}
                cols={8}
                name="reasonCanceled"
                type="text"
                value={reasonCanceled}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setReasonCanceled(e.target.value);
                }}
                disabled={(!resultClicked && viewDetail) || !isAlcoholTestCanceled || !overWritePermission}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default AlcoholTest;
