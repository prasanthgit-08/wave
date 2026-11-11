import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../../../styles/ThreeQuarterScreen.module.css";
import DateInputField from "../../../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverDrugTestData,
  setIsClinicCondition,
  setIsClinicTabValid,
} from "../../../../../../../redux/DriverDrugTestsSlice";
import { formatDate, formatDatetimeToDate } from "../../../../../../../utils/dateUtils";
import { updateField } from "../../../../../../../utils/stateUtils";
import { correctDecimalInputOnBlur, isOnlyDot } from "../../../../../../../utils/utils";
import Input from "../../../../../../../components/common/input";
const Clinic = () => {
  const [clinic, setClinic] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState({
    date: "",
    dateInput: "",
    isDateValid: true,
  });
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isInvoiceDate, setIsInvoiceDate] = useState(true);
  const [invoicePaid, setInvoicePaid] = useState("");
  const [invoicePaidValid, setInvoicePaidValid] = useState(true);

  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const formData = useSelector((state) => state.driverDrugTests.formData);
  const resultClicked = useSelector((state) => state.driverDrugTests.resultClicked);

  const dispatch = useDispatch();

  useEffect(() => {
    if (formData != null) {
      setClinic(formData?.clinic || "");
      setCaseNumber(formData?.caseNumber || "");
      setInvoiceDate({
        date: formatDatetimeToDate(formData?.invoiceDate),
        dateInput: formatDate(formData?.invoiceDate),
        isDateValid: true,
      });
      setInvoiceAmount(formData?.invoiceAmount || "");
      setInvoiceNumber(formData?.invoiceNumber || "");
      setInvoicePaid(formatDatetimeToDate(formData?.datePaid || "") || "");
    }
  }, [viewDetail, formData, resultClicked]);

  const clinicTabData = () => {
    dispatch(
      setDriverDrugTestData({
        clinic: clinic,
        caseNumber: caseNumber,
        invoiceDate: invoiceDate?.date,
        invoiceAmount: invoiceAmount,
        invoiceNumber: invoiceNumber,
        datePaid: invoicePaid,
      })
    );
  };

  useEffect(() => {
    clinicTabData();
  }, [clinic, caseNumber, invoiceDate, invoiceAmount, invoiceNumber, invoicePaid]);

  useEffect(() => {
    if (invoicePaidValid && invoiceDate?.isDateValid && !isOnlyDot(invoiceAmount)) {
      dispatch(setIsClinicTabValid(true));
    } else {
      dispatch(setIsClinicTabValid(false));
    }
  }, [invoiceDate, isInvoiceDate, invoicePaidValid, invoicePaid, invoiceAmount]);

  useEffect(() => {
    if (!invoiceDate && isInvoiceDate && invoicePaid && invoicePaidValid) {
      dispatch(setIsClinicCondition(true));
    } else {
      dispatch(setIsClinicCondition(false));
    }
  }, [isInvoiceDate, invoicePaidValid, invoiceDate, invoicePaid]);

  const isDecimal = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");
    if (value) return number;
  };

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20">
        <Col sm={7} md={7} lg={7} xl={7} xs={7}>
          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Clinic</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "200px" }}>
              <Input
                type="text"
                className="customFormControl"
                value={clinic}
                maxLength={30}
                onChange={(e) => setClinic(e.target.value)}
                disabled={viewDetail && !resultClicked}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Case Number</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "100px" }}>
              <Input
                type="text"
                className="customFormControl"
                value={caseNumber}
                maxLength={10}
                onChange={(e) => setCaseNumber(e.target.value)}
                disabled={viewDetail && !resultClicked}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Invoice Date</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={invoiceDate.date}
                dateInput={invoiceDate.dateInput}
                setDate={(value) => updateField(setInvoiceDate, { date: value })}
                setDateInput={(value) => updateField(setInvoiceDate, { dateInput: value })}
                setIsDateValid={(value) => updateField(setInvoiceDate, { isDateValid: value })}
                disabled={!resultClicked && viewDetail}
                className={`customFormControl ${
                  viewDetail && !resultClicked ? "" : invoiceDate.isDateValid ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Invoice Amount</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "100px" }}>
              <Input
                type="text"
                className={`customFormControl ${isOnlyDot(invoiceAmount) ? "borderRed" : ""}`}
                value={invoiceAmount}
                maxLength={8}
                onChange={(e) => {
                  const val = e.target.value;
                  // Updated regex to allow starting with dot
                  if (val.match(/^(\d{0,5}(\.\d{0,2})?|\.\d{0,2})$/)) {
                    setInvoiceAmount(isDecimal(val));
                  }
                }}
                onBlur={(e) => setInvoiceAmount(correctDecimalInputOnBlur(e.target.value))}
                disabled={viewDetail && !resultClicked}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Invoice Number</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "100px" }}>
              <Input
                type="text"
                className="customFormControl"
                value={invoiceNumber}
                maxLength={10}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                disabled={viewDetail && !resultClicked}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Invoice Paid</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={invoicePaid}
                setDate={setInvoicePaid}
                setIsDateValid={setInvoicePaidValid}
                disabled={!resultClicked && viewDetail}
                className={`customFormControl ${
                  viewDetail && !resultClicked ? "" : invoicePaidValid ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Clinic;
