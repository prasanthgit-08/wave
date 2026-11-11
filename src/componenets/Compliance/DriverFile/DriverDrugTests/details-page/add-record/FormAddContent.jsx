import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAddTestData, setIsSaveEnabled } from "../../../../../../redux/DriverDrugTestsSlice";
import { useParams } from "react-router-dom";

const FormAddContent = () => {
  const dispatch = useDispatch();
  const { driverId, id } = useParams();

  const [isAlcohol, setIsAlcohol] = useState(false);
  const [isDrugTest, setIsDrugTest] = useState(false);
  const [notes, setNotes] = useState("");

  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const isSaveEnabled = useSelector((state) => state.driverDrugTests.isSaveEnabled);

  const driverDrugTestData = () => {
    dispatch(
      setAddTestData({
        driverDrugTestPK: id,
        driverId: driverId,
        SelectionUserFK: 2,
        selectionUserId: 2,
        notificationDate: null,
        notificationUserId: null,
        resultsDate: null,
        resultsUserId: null,
        testDate: null,
        source: "M",
        drugTest: isDrugTest,
        drugTestPositive: false,
        refusedDrugTest: false,
        refusedDrugTestReason: "",
        drugTestCanceled: false,
        drugCanceledReason: "",
        alcoholTest: isAlcohol,
        alcoholTestPositive: false,
        refusedAlcoholTest: false,
        refusedAlcoholTestReason: "",
        alcoholTestCanceled: false,
        alcoholCanceledReason: "",
        alcoholTestPlus: "",
        marijuana: false,
        cocaine: false,
        pcp: false,
        opiates: false,
        methamphetamine: false,
        adulterate: false,
        other: false,
        otherDescription: "",
        notTested: false,
        notTestedReason: "",
        clinic: "",
        caseNumber: "",
        invoiceDate: null,
        invoiceAmount: 0.0,
        invoiceNumber: "",
        datePaid: "",
        notes: notes,
      })
    );
  };

  useEffect(() => {
    driverDrugTestData();
    if (isAlcohol || isDrugTest) {
      dispatch(setIsSaveEnabled(true));
    } else {
      dispatch(setIsSaveEnabled(false));
    }
  }, [isAlcohol, isDrugTest, notes]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Drug Test</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0  ${
                        !isAlcohol && !isDrugTest
                          ? "borderRed form-check-input mt-0"
                          : "form-check-input mt-0"
                      }`}
                      checked={isDrugTest}
                      onChange={(e) => setIsDrugTest(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Alcohol Test</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0  ${
                        !isAlcohol && !isDrugTest
                          ? "borderRed form-check-input mt-0"
                          : "form-check-input mt-0"
                      }`}
                      checked={isAlcohol}
                      onChange={(e) => setIsAlcohol(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-5 m-b-10 align-items row  m-l-0 m-r-0 ">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Notes</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "600px" }}>
                    <textarea
                      id="notes"
                      className={`customFormControl h-100 `}
                      rows={8}
                      cols={12}
                      name="notes"
                      type="text"
                      value={notes}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setNotes(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddContent;
