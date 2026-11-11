import { parseLocalDate } from "../../../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../../../styles/ThreeQuarterScreen.module.css";
import DateInputField from "../../../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverDrugTestData,
  setNotTestedValue,
  setIsGeneralTabValid,
  setTestDateCheck,
  setResultuser,
} from "../../../../../../../redux/DriverDrugTestsSlice";
import { useParams } from "react-router-dom";
import formatDatetimeToDate from "../../../../../../../utils/formatDateTimeToDate";
import DriverDrugTestsService from "../../../../../../../services/DriverDrugTestsService";
import Input from "../../../../../../../components/common/input";

const General = () => {
  const [source, setSource] = useState("");
  const [selectionDate, setSelectionDate] = useState("");
  const [selectionDateValid, setSelectionDateValid] = useState(true);
  const [selectedBy, setSelectedBy] = useState("");
  const [notifiedDate, setNotifiedDate] = useState("");
  const [notifiedDateValid, setNotifiedDateValid] = useState(true);
  const [notifiedBy, setNotifiedBy] = useState("");
  const [testDate, setTestDate] = useState("");
  const [testDateValid, setTestDateValid] = useState(true);
  const [resultDate, setResultDate] = useState("");
  const [resultDateValid, setResultDateValid] = useState(true);
  const [resultEnteredBy, setResultEnteredBy] = useState("");
  const [drugTest, setDrugTest] = useState(false);
  const [alcoholTest, setAlcoholTest] = useState(false);
  const [notTested, setNotTested] = useState(false);
  const [reasonNotTested, setReasonNotTested] = useState("");
  const [checkDates, setCheckDates] = useState(false); // For checking if "No Tested" can be checked or not

  const dispatch = useDispatch();
  const { driverId, id } = useParams();

  const formData = useSelector((state) => state.driverDrugTests.formData);
  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const resultClicked = useSelector((state) => state.driverDrugTests.resultClicked);
  const overWritePermission = useSelector((state) => state.driverDrugTests.overWritePermission);
  const isDrugStateValidation = useSelector((state) => state.driverDrugTests.isDrugStateValidation); // For enable test and fesult date based on refused drug test and drug test canceled
  const isAlcoholStateValidation = useSelector((state) => state.driverDrugTests.isAlcoholStateValidation); // // For enable test and fesult date based on refused alcohol test and alcohol test canceled
  const resultUser = useSelector((state) => state.driverDrugTests.resultUser);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const [selectionUser, setSelectionUser] = useState(0);
  const [notifyUser, setNotifyUser] = useState(0);

  useEffect(() => {
    setSource(formData?.source || "");
    setSelectionDate(formatDatetimeToDate(formData?.selectionDate || "") || "");
    setSelectedBy(formData?.selectionUser || "");
    setNotifiedDate(formatDatetimeToDate(formData?.notificationDate || "") || "");
    setNotifiedBy(formData?.notifiedBy || "");
    setTestDate(formatDatetimeToDate(formData?.testDate || "") || "");
    setResultDate(formatDatetimeToDate(formData?.resultsDate || "") || "");

    setResultEnteredBy(formData?.testDate && formData?.resultsDate ? formData?.resultsEnteredBy : "");
    setDrugTest(formData?.drugTest || false);
    setAlcoholTest(formData?.alcoholTest || false);
    setNotTested(formData?.notTested || false);
    setReasonNotTested(formData?.notTestedReason || "");
    setSelectionUser(formData?.selectionUserId || null);
    setNotifyUser(formData?.notificationUserId || null);

    dispatch(setResultuser(formData?.resultsUserId || resultUser));
  }, [formData, viewDetail, resultClicked]);

  useEffect(() => {
    if ((testDate || resultDate) && formData?.testDate && formData?.resultsDate) {
      setCheckDates(true);
    } else {
      setCheckDates(false);
    }
  }, [testDate, resultDate]);

  useEffect(() => {
    if (
      formData != null &&
      resultClicked &&
      !formData?.isRefusedDrugTest &&
      !formData?.drugTestCanceled &&
      !formData?.refusedAlcoholTest &&
      !formData?.alcoholTestCanceled
    ) {
      setTestDate(formatDatetimeToDate(formData?.testDate) || formatDatetimeToDate(new Date()));
      setResultDate(formatDatetimeToDate(formData?.resultsDate) || formatDatetimeToDate(new Date()));
    }
  }, [resultClicked]);

  const generalTabData = () => {
    if (!resultDate) {
      dispatch(
        setDriverDrugTestData({
          driverDrugTestPK: id,
          driverId: driverId,
          selectionDate: selectionDate,
          SelectionUserFK: selectionUser,
          selectionUserId: selectionUser,
          notificationDate: notifiedDate,
          notificationUserId: notifyUser,
          resultsDate: resultDate,
          resultsUserId: testDate && resultDate ? resultUser : "",
          testDate: testDate,
          source: source,
          drugTest: drugTest,
          drugTestPositive: false,
          refusedDrugTest: false,
          refusedDrugTestReason: "",
          drugTestCanceled: false,
          drugCanceledReason: "",
          alcoholTest: alcoholTest,
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
          notTested: notTested,
          notTestedReason: reasonNotTested,
        })
      );
    } else {
      dispatch(
        setDriverDrugTestData({
          driverDrugTestPK: id,
          driverId: driverId,
          source: source,
          selectionDate: selectionDate,
          SelectionUserFK: selectionUser,
          selectionUserId: selectionUser,
          notificationDate: notifiedDate,
          notificationUserId: notifyUser,
          resultsDate: resultDate,
          resultsUserId: resultUser,
          testDate: testDate,
          drugTest: drugTest,
          alcoholTest: alcoholTest,
          notTested: notTested,
          notTestedReason: reasonNotTested,
        })
      );
    }
  };

  useEffect(() => {
    generalTabData();
  }, [
    source,
    selectionDate,
    selectedBy,
    notifiedDate,
    notifiedBy,
    testDate,
    resultDate,
    resultEnteredBy,
    drugTest,
    alcoholTest,
    notTested,
    reasonNotTested,
  ]);

  useEffect(() => {
    if (!notTested) {
      dispatch(setNotTestedValue(false));
      setReasonNotTested("");
    } else {
      dispatch(setNotTestedValue(true));
      setResultEnteredBy("");
    }
  }, [notTested]);

  useEffect(() => {
    if (notTested) {
      if (reasonNotTested) {
        dispatch(setIsGeneralTabValid(true));
      } else {
        dispatch(setIsGeneralTabValid(false));
      }
      setTestDate("");
      setResultDate("");
    } else {
      const isValid =
        selectionDateValid &&
        notifiedDateValid &&
        testDateValid &&
        resultDateValid &&
        !((resultDate || testDate) && !notifiedDate) &&
        selectionDate &&
        !(resultDate && !testDate) &&
        !(!resultDate && testDate) &&
        source;

      dispatch(setIsGeneralTabValid(isValid));
    }
  }, [
    notTested,
    reasonNotTested,
    selectionDate,
    selectionDateValid,
    notifiedDate,
    notifiedDateValid,
    testDate,
    testDateValid,
    resultDate,
    resultDateValid,
    source,
  ]);

  useEffect(() => {
    if (testDate) {
      dispatch(setTestDateCheck(true));
    } else {
      dispatch(setTestDateCheck(false));
    }
  }, [testDate]);

  useEffect(() => {
    if ((testDate || resultDate) && !resultEnteredBy) {
      setResultEnteredBy(loggedInUser?.name?.trim());
    } else if (!(testDate || resultDate)) {
      setResultEnteredBy("");
    }
  }, [resultClicked, viewDetail, testDate, resultDate]);

  useEffect(() => {
    if (selectionDate && !selectedBy) {
      DriverDrugTestsService.getCurrentLoggedUser()
        .then((response) => {
          const data = response.data;
          setSelectedBy(data.name);
        })
        .catch((error) => {
          console.log("Error in find user", error);
        });
    } else if (!selectionDate) {
      setSelectedBy("");
    }
  }, [selectionDate]);

  useEffect(() => {
    if (notifiedDate && !notifiedBy) {
      DriverDrugTestsService.getCurrentLoggedUser()
        .then((response) => {
          const data = response.data;
          setNotifiedBy(data.name);
        })
        .catch((error) => {
          console.log("Error in find user", error);
        });
    } else if (!notifiedDate) {
      setNotifiedBy("");
    }
  }, [notifiedDate]);

  useEffect(() => {
    if (notifiedDate === null || notifiedDate === "") {
      setNotifyUser(null);
    }
  }, [notifiedDate]);

  useEffect(() => {
    if (selectionDate && !selectionUser) {
      setSelectionUser(userPK);
    }

    if (notifiedDate && !notifyUser) {
      setNotifyUser(userPK);
    }

    if ((resultDate || testDate) && !resultUser) {
      dispatch(setResultuser(userPK));
    }
  }, [selectionDate, notifiedDate, resultDate, testDate, selectionUser, notifyUser, resultUser]);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Source</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "200px" }}>
              <Input
                type="text"
                maxLength={1}
                className={`customFormControl ${
                  viewDetail || !overWritePermission ? "" : source ? "borderGreen" : "borderRed"
                }`}
                value={source}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  // Allow only M, P, R, D characters
                  if (/^[MPRD]*$/.test(value)) {
                    setSource(value);
                  }
                }}
                disabled={viewDetail || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Selection Date</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={selectionDate}
                setDate={setSelectionDate}
                max={notifiedDate ? new Date(parseLocalDate(formatDatetimeToDate(notifiedDate))) : ""}
                setIsDateValid={setSelectionDateValid}
                disabled={viewDetail || !overWritePermission}
                onChange={() => {
                  if (selectionDate) {
                    setSelectionUser(userPK);
                  } else {
                    setSelectionUser(null);
                  }
                }}

                className={`customFormControl ${
                  viewDetail || !overWritePermission
                    ? ""
                    : selectionDateValid && selectionDate
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Selected By</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "200px" }}>
              <Input
                type="text"
                className="customFormControl"
                value={selectedBy}
                onChange={(e) => setSelectedBy(e.target.value)}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Notified Date</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={notifiedDate}
                max={testDate ? new Date(parseLocalDate(formatDatetimeToDate(testDate))) : ""}
                min={selectionDate ? new Date(parseLocalDate(formatDatetimeToDate(selectionDate))) : ""}
                setDate={setNotifiedDate}
                isDateValid={notifiedDateValid}
                setIsDateValid={setNotifiedDateValid}
                disabled={viewDetail || !overWritePermission}
                onChange={() => {
                  if (notifiedDate) {
                    setNotifyUser(userPK);
                  } else {
                    setNotifyUser(null);
                  }
                }}
                className={`customFormControl ${
                  viewDetail && !resultClicked
                    ? ""
                    : !notifiedDateValid || (!notifiedDate && testDate) || (!notifiedDate && resultDate)
                      ? "borderRed"
                      : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Notified By</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "200px" }}>
              <Input
                type="text"
                className="customFormControl"
                value={notifiedBy}
                onChange={(e) => setNotifiedBy(e.target.value)}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Test Date</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={testDate}
                max={resultDate ? new Date(parseLocalDate(formatDatetimeToDate(resultDate))) : ""}
                min={notifiedDate ? new Date(parseLocalDate(formatDatetimeToDate(notifiedDate))) : ""}
                setDate={setTestDate}
                setIsDateValid={setTestDateValid}
                disabled={
                  (!resultClicked && viewDetail) ||
                  notTested ||
                  !overWritePermission ||
                  isDrugStateValidation ||
                  isAlcoholStateValidation
                }
                className={`customFormControl ${
                  viewDetail && !resultClicked
                    ? ""
                    : !testDateValid || (!testDate && resultDate)
                      ? "borderRed"
                      : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Results Date</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={resultDate}
                min={testDate ? new Date(parseLocalDate(formatDatetimeToDate(testDate))) : ""}
                setDate={setResultDate}
                setIsDateValid={setResultDateValid}
                disabled={
                  (!resultClicked && viewDetail) ||
                  notTested ||
                  !overWritePermission ||
                  isDrugStateValidation ||
                  isAlcoholStateValidation
                }
                className={`customFormControl ${
                  viewDetail && !resultClicked
                    ? ""
                    : !resultDateValid || (testDate && !resultDate)
                      ? "borderRed"
                      : ""
                }`}
                onChange={() => {
                  if (resultDate) {
                    dispatch(setResultuser(userPK));
                  } else {
                    dispatch(setResultuser(null));
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Results Entered By</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "200px" }}>
              <Input type="text" className="customFormControl" value={resultEnteredBy} disabled />
            </Col>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Drug Test</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={drugTest}
                onChange={(e) => setDrugTest(e.target.checked)}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Alcohol Test</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={alcoholTest}
                onChange={(e) => setAlcoholTest(e.target.checked)}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Not Tested</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={notTested}
                onChange={(e) => setNotTested(e.target.checked)}
                disabled={checkDates || (!resultClicked && viewDetail) || !overWritePermission}
              />
            </Col>
          </Form.Group>

          <Form.Group className=" mt-3 m-b-10 align-items row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label dealer-label">Reason Not Tested</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "300px" }}>
              <textarea
                id="reasonNotTested"
                className={`customFormControl h-100 w-100 customFocusClass ${
                  overWritePermission && (!viewDetail || resultClicked) && notTested
                    ? !reasonNotTested
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                rows={8}
                cols={8}
                name="reasonNotTested"
                type="text"
                value={reasonNotTested}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setReasonNotTested(e.target.value);
                }}
                disabled={(!resultClicked && viewDetail) || !notTested || !overWritePermission}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default General;
