import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverDrugTestData,
  setFormData,
  setIsDrugCondition,
  setIsDrugStateValidation,
  setIsDrugTabValid,
} from "../../../../../../../redux/DriverDrugTestsSlice";
import AlcoholTest from "./AlcoholTest";
import Input from "../../../../../../../components/common/input";

const DrugTest = () => {
  const dispatch = useDispatch();

  const [isDrugTestPositive, setIsDrugTestPositive] = useState(false);
  const [marijuana, setMarijuana] = useState(false);
  const [cocaine, setCocaine] = useState(false);
  const [pcp, setPcp] = useState(false);
  const [opiates, setOpiates] = useState(false);
  const [methamphetamine, setMethamphetamine] = useState(false);
  const [adulterate, setAdulterate] = useState(false);
  const [other, setOther] = useState(false);
  const [otherDescription, setOtherDescription] = useState("");
  const [isRefusedDrugTest, setIsRefusedDrugTest] = useState(false);
  const [refusedDrugTestReason, setRefusedDrugTestReason] = useState("");
  const [isDrugTestCanceled, setIsDrugTestCanceled] = useState(false);
  const [drugTestCanceledReason, setdrugTestCanceledReason] = useState("");

  const formData = useSelector((state) => state.driverDrugTests.formData);
  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const notTestedValue = useSelector((state) => state.driverDrugTests.notTestedValue);
  const resultClicked = useSelector((state) => state.driverDrugTests.resultClicked);
  const testDateCheck = useSelector((state) => state.driverDrugTests.testDateCheck);
  const overWritePermission = useSelector((state) => state.driverDrugTests.overWritePermission);

  useEffect(() => {
    if (formData != null) {
      setIsDrugTestPositive(formData?.drugTestPositive || false);
      setMarijuana(formData?.marijuana || false);
      setCocaine(formData?.cocaine || false);
      setPcp(formData?.pcp || false);
      setOpiates(formData?.opiates || false);
      setMethamphetamine(formData?.methamphetamine || false);
      setAdulterate(formData?.adulterate || false);
      setOther(formData?.other || false);
      setOtherDescription(formData?.otherDescription || "");
      setIsRefusedDrugTest(formData?.refusedDrugTest || false);
      setRefusedDrugTestReason(formData.refusedDrugTestReason || "");
      setIsDrugTestCanceled(formData?.drugTestCanceled || false);
      setdrugTestCanceledReason(formData?.drugCanceledReason || "");
    }
  }, [formData, viewDetail, resultClicked]);

  const drugTestTabData = () => {
    dispatch(
      setDriverDrugTestData({
        drugTestPositive: isDrugTestPositive,
        marijuana: marijuana,
        cocaine: cocaine,
        pcp: pcp,
        opiates: opiates,
        methamphetamine: methamphetamine,
        adulterate: adulterate,
        other: other,
        otherDescription: otherDescription,
        refusedDrugTest: isRefusedDrugTest,
        refusedDrugTestReason: refusedDrugTestReason,
        drugTestCanceled: isDrugTestCanceled,
        drugCanceledReason: drugTestCanceledReason,
      })
    );
  };

  useEffect(() => {
    drugTestTabData();
  }, [
    isDrugTestPositive,
    marijuana,
    cocaine,
    pcp,
    opiates,
    methamphetamine,
    adulterate,
    other,
    otherDescription,
    isRefusedDrugTest,
    refusedDrugTestReason,
    isDrugTestCanceled,
    drugTestCanceledReason,
  ]);

  useEffect(() => {
    if (isDrugTestPositive) {
      setIsRefusedDrugTest(false);
      setRefusedDrugTestReason("");
      setIsDrugTestCanceled(false);
      setdrugTestCanceledReason("");
    } else {
      setMarijuana(false);
      setCocaine(false);
      setPcp(false);
      setOpiates(false);
      setMethamphetamine(false);
      setAdulterate(false);
      setOther(false);
      setOtherDescription("");
    }
    if (isRefusedDrugTest) {
      setIsDrugTestPositive(false);
      setIsDrugTestCanceled(false);
      setdrugTestCanceledReason("");
    } else {
      setRefusedDrugTestReason("");
    }
    if (isDrugTestCanceled) {
      setIsDrugTestPositive(false);
      setIsRefusedDrugTest(false);
      setRefusedDrugTestReason("");
    } else {
      setdrugTestCanceledReason("");
    }
  }, [isDrugTestPositive, isDrugTestCanceled, isRefusedDrugTest]);

  useEffect(() => {
    if (isDrugTestPositive) {
      if (
        (marijuana || cocaine || pcp || opiates || methamphetamine || adulterate || other) &&
        (!other || (other && otherDescription))
      ) {
        dispatch(setIsDrugTabValid(true));
      } else {
        dispatch(setIsDrugTabValid(false));
      }
    } else {
      dispatch(setIsDrugTabValid(true));
    }
  }, [
    isDrugTestPositive,
    marijuana,
    cocaine,
    pcp,
    opiates,
    methamphetamine,
    adulterate,
    other,
    otherDescription,
  ]);

  useEffect(() => {
    if (isRefusedDrugTest) {
      if (refusedDrugTestReason) {
        dispatch(setIsDrugTabValid(true));
      } else {
        dispatch(setIsDrugTabValid(false));
      }
    } else {
      dispatch(setIsDrugTabValid(true));
    }
  }, [isRefusedDrugTest, refusedDrugTestReason]);

  useEffect(() => {
    if (isDrugTestCanceled) {
      if (drugTestCanceledReason) {
        dispatch(setIsDrugTabValid(true));
      } else {
        dispatch(setIsDrugTabValid(false));
      }
    } else {
      dispatch(setIsDrugTabValid(true));
    }
  }, [isDrugTestCanceled, drugTestCanceledReason]);

  useEffect(() => {
    if (notTestedValue) {
      setIsDrugTestPositive(false);
      setIsRefusedDrugTest(false);
      setIsDrugTestCanceled(false);
    }
  }, [notTestedValue]);

  useEffect(() => {
    if (!isDrugTestPositive && !isRefusedDrugTest && !isDrugTestCanceled) {
      dispatch(setIsDrugCondition(true));
    } else {
      dispatch(setIsDrugCondition(false));
    }
  }, [isDrugTestPositive, isRefusedDrugTest, isDrugTestCanceled]);

  useEffect(() => {
    if (isRefusedDrugTest || isDrugTestCanceled) {
      dispatch(setIsDrugStateValidation(true));
    } else {
      dispatch(setIsDrugStateValidation(false));
    }
  }, [isRefusedDrugTest, isDrugTestCanceled]);

  useEffect(() => {
    if (!testDateCheck) {
      setIsDrugTestPositive(false);
    }
  }, [testDateCheck]);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20">
        <Col sm={5} md={5} lg={5} xl={5} xs={5}>
          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Drug Test Positive</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={isDrugTestPositive}
                onChange={(e) => setIsDrugTestPositive(e.target.checked)}
                disabled={
                  (!resultClicked && viewDetail) ||
                  isRefusedDrugTest ||
                  isDrugTestCanceled ||
                  !testDateCheck ||
                  !overWritePermission
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Marijuana</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0  ${
                  (!viewDetail || resultClicked) &&
                  isDrugTestPositive &&
                  !cocaine &&
                  !pcp &&
                  !opiates &&
                  !adulterate &&
                  !methamphetamine &&
                  !other
                    ? !marijuana
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                checked={marijuana}
                onChange={(e) => setMarijuana(e.target.checked)}
                disabled={(!resultClicked && viewDetail) || !isDrugTestPositive || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Cocaine</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                disabled={(!resultClicked && viewDetail) || !isDrugTestPositive || !overWritePermission}
                className={`form-check-input p-0  ${
                  (!viewDetail || resultClicked) &&
                  isDrugTestPositive &&
                  !marijuana &&
                  !pcp &&
                  !opiates &&
                  !adulterate &&
                  !methamphetamine &&
                  !other
                    ? !cocaine
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                checked={cocaine}
                onChange={(e) => setCocaine(e.target.checked)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>PCP</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0  ${
                  (!viewDetail || resultClicked) &&
                  isDrugTestPositive &&
                  !marijuana &&
                  !cocaine &&
                  !opiates &&
                  !adulterate &&
                  !methamphetamine &&
                  !other
                    ? !pcp
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                checked={pcp}
                onChange={(e) => setPcp(e.target.checked)}
                disabled={(!resultClicked && viewDetail) || !isDrugTestPositive || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Opiates</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0  ${
                  (!viewDetail || resultClicked) &&
                  isDrugTestPositive &&
                  !marijuana &&
                  !cocaine &&
                  !pcp &&
                  !adulterate &&
                  !methamphetamine &&
                  !other
                    ? !opiates
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                checked={opiates}
                onChange={(e) => setOpiates(e.target.checked)}
                disabled={(!resultClicked && viewDetail) || !isDrugTestPositive || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Methamphetamine</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0  ${
                  (!viewDetail || resultClicked) &&
                  isDrugTestPositive &&
                  !marijuana &&
                  !cocaine &&
                  !pcp &&
                  !opiates &&
                  !adulterate &&
                  !other
                    ? !methamphetamine
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                checked={methamphetamine}
                onChange={(e) => setMethamphetamine(e.target.checked)}
                disabled={(!resultClicked && viewDetail) || !isDrugTestPositive || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Adulterate</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0  ${
                  (!viewDetail || resultClicked) &&
                  isDrugTestPositive &&
                  !marijuana &&
                  !cocaine &&
                  !pcp &&
                  !opiates &&
                  !methamphetamine &&
                  !other
                    ? !adulterate
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                checked={adulterate}
                onChange={(e) => setAdulterate(e.target.checked)}
                disabled={(!resultClicked && viewDetail) || !isDrugTestPositive || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Other</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0  ${
                  (!viewDetail || resultClicked) &&
                  isDrugTestPositive &&
                  !marijuana &&
                  !cocaine &&
                  !pcp &&
                  !opiates &&
                  !methamphetamine &&
                  !adulterate
                    ? !other
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                checked={other}
                onChange={(e) => setOther(e.target.checked)}
                disabled={(!resultClicked && viewDetail) || !isDrugTestPositive || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Other Description</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "170PX" }}>
              <Input
                type="text"
                value={otherDescription}
                className={`customFormControl  ${
                  overWritePermission && (!viewDetail || resultClicked) && other
                    ? !otherDescription
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                maxLength={30}
                onChange={(e) => setOtherDescription(e.target.value)}
                disabled={
                  (!resultClicked && viewDetail) || !isDrugTestPositive || !other || !overWritePermission
                }
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={7} md={7} lg={7} xl={7} xs={7}>
          <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Refused Drug Test</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={isRefusedDrugTest}
                onChange={(e) => setIsRefusedDrugTest(e.target.checked)}
                disabled={
                  (!resultClicked && viewDetail) ||
                  isDrugTestPositive ||
                  isDrugTestCanceled ||
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
                id="refusedDrugTestReason"
                className={`customFormControl h-100 w-100 customFocusClass ${
                  overWritePermission && (!viewDetail || resultClicked) && isRefusedDrugTest
                    ? !refusedDrugTestReason
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                rows={5}
                cols={8}
                name="refusedDrugTestReason"
                type="text"
                value={refusedDrugTestReason}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setRefusedDrugTestReason(e.target.value);
                }}
                disabled={(!resultClicked && viewDetail) || !isRefusedDrugTest || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Drug Test Canceled</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={isDrugTestCanceled}
                onChange={(e) => setIsDrugTestCanceled(e.target.checked)}
                disabled={
                  (!resultClicked && viewDetail) ||
                  isDrugTestPositive ||
                  isRefusedDrugTest ||
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
                id="drugTestCanceledReason"
                className={`customFormControl h-100 w-100 customFocusClass ${
                  overWritePermission && (!viewDetail || resultClicked) && isDrugTestCanceled
                    ? !drugTestCanceledReason
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                rows={5}
                cols={8}
                name="drugTestCanceledReason"
                type="text"
                value={drugTestCanceledReason}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setdrugTestCanceledReason(e.target.value);
                }}
                disabled={(!resultClicked && viewDetail) || !isDrugTestCanceled || !overWritePermission}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default DrugTest;
