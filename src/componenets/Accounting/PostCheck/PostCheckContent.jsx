import { formatForApi, parseLocalDate } from "../../../utils/dateUtils";
import React, { useEffect, useRef, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../common/DateInputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCheckService from "../../../services/PostCheckService";
import {
  setEditData,
  setReimbursement,
  setReimbursementBeginningCheckNumber,
  setReimbursementBeginningDate,
  setReimbursementEmailBatchAsExcel,
  setReimbursementEmailBatchAsPDF,
  setReimbursementEndingCheckNumber,
  setReimbursementEndingDate,
  setReimbursementPrintBatch,
  setReimbursementTotalAmount,
  setSaveFlag,
  setTaxable,
  setTaxableBeginningCheckNumber,
  setTaxableBeginningDate,
  setTaxableEmailBatchAsExcel,
  setTaxableEmailBatchAsPDF,
  setTaxableEndingCheckNumber,
  setTaxableEndingDate,
  setTaxablePrintBatch,
  setTaxableTotalAmount,
} from "../../../redux/PostCheckSlice";
import LoadingIcon from "../../common/LoadingIcon";
import Input from "../../../components/common/input";
const PostCheckContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isTaxableBeginningDateValid, setIsTaxableBeginningDateValid] = useState(true);
  const [isTaxableEndDateValid, setIsTaxableEndDateValid] = useState(true);
  const [isReimbursementBeginningDateValid, setIsReimbursementBeginningDateValid] = useState(true);
  const [isReimbursementEndDateValid, setIsReimbursementEndDateValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    taxable,
    reimbursement,
    taxableBeginningDate,
    taxableEndingDate,
    taxableBeginningCheckNumber,
    taxableEndingCheckNumber,
    taxableTotalAmount,
    taxablePrintBatch,
    taxableEmailBatchAsPDF,
    taxableEmailBatchAsExcel,
    reimbursementBeginningDate,
    reimbursementEndingDate,
    reimbursementBeginningCheckNumber,
    reimbursementEndingCheckNumber,
    reimbursementTotalAmount,
    reimbursementPrintBatch,
    reimbursementEmailBatchAsPDF,
    reimbursementEmailBatchAsExcel,
    editData,
  } = useSelector((state) => state.postCheckReducer);

  const getPostCheckData = () => {
    setLoading(true);
    PostCheckService.getPostCheckData(
      taxableBeginningCheckNumber,
      taxableEndingCheckNumber,
      taxableBeginningDate,
      taxableEndingDate,
      reimbursementBeginningCheckNumber,
      reimbursementEndingCheckNumber,
      reimbursementBeginningDate,
      reimbursementEndingDate,
      0,
      reimbursementPrintBatch,
      reimbursementEmailBatchAsPDF,
      reimbursementEmailBatchAsExcel,
      taxablePrintBatch,
      taxableEmailBatchAsPDF,
      taxableEmailBatchAsExcel
    )
      .then((response) => {
        const data = response.data;
        dispatch(setEditData(data));
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Beginning check dates the current data was loaded with, to skip the API when the date is unchanged
  const existingTaxableBeginningDate = useRef("");
  const existingReimbursementBeginningDate = useRef("");
  const isSameDate = (a, b) => formatForApi(a) === formatForApi(b);

  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (isFirstLoad.current || !editData) {
      isFirstLoad.current = false;
      getPostCheckData();
    }
  }, [editData]);

  //used to clear fields
  useEffect(() => {
    if (!taxable) {
      dispatch(setTaxableBeginningCheckNumber(""));
      dispatch(setTaxableEndingCheckNumber(""));
      dispatch(setTaxableBeginningDate(""));
      dispatch(setTaxableEndingDate(""));
      dispatch(setTaxableTotalAmount(""));
      dispatch(setTaxablePrintBatch(false));
      dispatch(setTaxableEmailBatchAsExcel(false));
      dispatch(setTaxableEmailBatchAsPDF(false));
    }
  }, [taxable]);

  useEffect(() => {
    if (!reimbursement) {
      dispatch(setReimbursementBeginningCheckNumber(""));
      dispatch(setReimbursementEndingCheckNumber(""));
      dispatch(setReimbursementBeginningDate(""));
      dispatch(setReimbursementEndingDate(""));
      dispatch(setReimbursementTotalAmount(""));
      dispatch(setReimbursementPrintBatch(false));
      dispatch(setReimbursementEmailBatchAsExcel(false));
      dispatch(setReimbursementEmailBatchAsPDF(false));
    }
  }, [reimbursement]);

  useEffect(() => {
    if (taxable && editData) {
      dispatch(setTaxableBeginningCheckNumber(editData?.taxableDetails[0]?.BeginningCheckNumber));
      dispatch(setTaxableEndingCheckNumber(editData?.taxableDetails[0]?.EndingCheckNumber));
      dispatch(setTaxableBeginningDate(editData?.taxableDetails[0]?.BeginningCheckDate));
      existingTaxableBeginningDate.current = editData?.taxableDetails[0]?.BeginningCheckDate;
      dispatch(setTaxableEndingDate(editData?.taxableDetails[0]?.EndingCheckDate));
      dispatch(setTaxableTotalAmount(editData?.taxableDetails[0]?.TotalAmount));
    }
  }, [taxable, editData]);

  useEffect(() => {
    if (reimbursement && editData) {
      dispatch(setReimbursementBeginningCheckNumber(editData?.reimbursementDetails[0]?.BeginningCheckNumber));
      dispatch(setReimbursementEndingCheckNumber(editData?.reimbursementDetails[0]?.EndingCheckNumber));
      dispatch(setReimbursementBeginningDate(editData?.reimbursementDetails[0]?.BeginningCheckDate));
      existingReimbursementBeginningDate.current = editData?.reimbursementDetails[0]?.BeginningCheckDate;
      dispatch(setReimbursementEndingDate(editData?.reimbursementDetails[0]?.EndingCheckDate));
      dispatch(setReimbursementTotalAmount(editData?.reimbursementDetails[0]?.TotalAmount));
    }
  }, [reimbursement, editData]);

  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");
    if (value) return number;
  };
  //save validation
  useEffect(() => {
    const isTaxableValid =
      taxable &&
      taxableBeginningCheckNumber &&
      taxableBeginningCheckNumber >= editData?.taxableDetails[0]?.BeginningCheckNumber &&
      taxableBeginningCheckNumber <= taxableEndingCheckNumber &&
      taxableBeginningDate &&
      isTaxableBeginningDateValid &&
      taxableEndingCheckNumber &&
      taxableEndingCheckNumber <= editData?.taxableDetails[0]?.EndingCheckNumber &&
      taxableEndingCheckNumber >= taxableBeginningCheckNumber &&
      taxableEndingDate &&
      isTaxableEndDateValid;

    const isReimbursementValid =
      reimbursement &&
      reimbursementBeginningCheckNumber &&
      reimbursementBeginningCheckNumber >= editData?.reimbursementDetails[0]?.BeginningCheckNumber &&
      reimbursementBeginningCheckNumber <= reimbursementEndingCheckNumber &&
      reimbursementBeginningDate &&
      isReimbursementBeginningDateValid &&
      isReimbursementEndDateValid &&
      reimbursementEndingCheckNumber &&
      reimbursementEndingDate &&
      reimbursementEndingCheckNumber <= editData?.reimbursementDetails[0]?.EndingCheckNumber &&
      reimbursementEndingCheckNumber >= reimbursementBeginningCheckNumber;

    if (
      (isTaxableValid && isReimbursementValid) ||
      (isTaxableValid && !reimbursement) ||
      (isReimbursementValid && !taxable)
    ) {
      dispatch(setSaveFlag(false));
    } else {
      dispatch(setSaveFlag(true));
    }
  }, [
    taxableBeginningCheckNumber,
    editData,
    taxableEndingCheckNumber,
    taxable,
    isTaxableBeginningDateValid,
    isTaxableEndDateValid,
    taxableBeginningDate,
    taxableEndingDate,
    reimbursement,
    reimbursementBeginningCheckNumber,
    reimbursementEndingCheckNumber,
    isReimbursementBeginningDateValid,
    isReimbursementEndDateValid,
    reimbursementBeginningDate,
    reimbursementEndingDate,
  ]);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="mt-2 mx-3">
              <Col xs={6}>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Taxable</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      disabled={!editData?.taxableDetails[0]?.TotalAmount}
                      checked={taxable}
                      onChange={(e) => {
                        const value = e.target.checked;
                        dispatch(setTaxable(value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Begining Check Number</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      type="input"
                      disabled={!taxable}
                      maxLength={10}
                      value={taxableBeginningCheckNumber}
                      onChange={(e) => {
                        const value = e.target.value;
                        dispatch(setTaxableBeginningCheckNumber(isNumber(value)));

                        if (value) {
                          dispatch(setTaxableBeginningDate(""));
                        }
                      }}
                      onBlur={(e) => getPostCheckData(e.target.value)}
                      className={`customFormControl ${
                        !taxable
                          ? ""
                          : taxableBeginningCheckNumber &&
                              taxableBeginningCheckNumber > 0 &&
                              taxableBeginningCheckNumber <= 2_147_483_647 &&
                              taxableBeginningCheckNumber >=
                                editData?.taxableDetails[0]?.BeginningCheckNumber &&
                              taxableBeginningCheckNumber <= taxableEndingCheckNumber
                            ? ""
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Begining Check Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={taxableBeginningDate}
                      min={
                        editData?.taxableDetails[0]?.BeginningCheckDate
                          ? parseLocalDate(editData?.taxableDetails[0]?.BeginningCheckDate)
                          : ""
                      }
                      max={
                        editData?.taxableDetails[0]?.EndingCheckDate
                          ? parseLocalDate(editData?.taxableDetails[0]?.EndingCheckDate)
                          : ""
                      }
                      disabled={!taxable}
                      reduxSetDate={(value) => {
                        dispatch(setTaxableBeginningDate(value));

                        if (value) {
                          dispatch(setTaxableBeginningCheckNumber(""));
                        }
                      }}
                      onBlur={() => {
                        if (isSameDate(taxableBeginningDate, existingTaxableBeginningDate.current)) return;
                        existingTaxableBeginningDate.current = taxableBeginningDate;
                        getPostCheckData();
                      }}
                      setIsDateValid={setIsTaxableBeginningDateValid}
                      className={`customFormControl ${
                        (isTaxableBeginningDateValid && taxableBeginningDate && taxable) ||
                        (isTaxableBeginningDateValid && !taxableBeginningDate && !taxable)
                          ? ""
                          : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Ending Check Number</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      type="input"
                      value={taxableEndingCheckNumber}
                      disabled={!taxable}
                      maxLength={10}
                      onChange={(e) => {
                        const value = e.target.value;
                        dispatch(setTaxableEndingCheckNumber(isNumber(value)));

                        if (value) {
                          dispatch(setTaxableEndingDate(""));
                        }
                      }}
                      onBlur={(e) => getPostCheckData(e.target.value)}
                      className={`customFormControl ${
                        !taxable
                          ? ""
                          : taxableEndingCheckNumber &&
                              taxableEndingCheckNumber > 0 &&
                              taxableEndingCheckNumber <= 2_147_483_647 &&
                              taxableEndingCheckNumber <= editData?.taxableDetails[0]?.EndingCheckNumber &&
                              taxableEndingCheckNumber >= taxableBeginningCheckNumber
                            ? ""
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Ending Check Date</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={taxableEndingDate}
                      reduxSetDate={(value) => {
                        dispatch(setTaxableEndingDate(value));

                        if (value) {
                          dispatch(setTaxableEndingCheckNumber(""));
                        }
                      }}
                      className={`customFormControl ${
                        (isTaxableEndDateValid && taxableEndingDate && taxable) ||
                        (isTaxableEndDateValid && !taxableEndingDate && !taxable)
                          ? ""
                          : "borderRed"
                      }`}
                      max={
                        editData?.taxableDetails[0]?.EndingCheckDate
                          ? parseLocalDate(editData?.taxableDetails[0]?.EndingCheckDate)
                          : ""
                      }
                      min={
                        editData?.taxableDetails[0]?.BeginningCheckDate
                          ? parseLocalDate(editData?.taxableDetails[0]?.BeginningCheckDate)
                          : ""
                      }
                      setIsDateValid={setIsTaxableEndDateValid}
                      disabled={!taxable}
                      onBlur={(e) => getPostCheckData(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Total Amount</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input type="input" className="customFormControl" value={taxableTotalAmount} disabled />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Print Batch</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      disabled={!taxable}
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={taxablePrintBatch}
                      onChange={(e) => {
                        dispatch(setTaxablePrintBatch(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Email Batch as PDF</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      disabled={!taxable}
                      checked={taxableEmailBatchAsPDF}
                      onChange={(e) => {
                        dispatch(setTaxableEmailBatchAsPDF(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Email Batch as Excel</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      disabled={!taxable}
                      checked={taxableEmailBatchAsExcel}
                      onChange={(e) => {
                        dispatch(setTaxableEmailBatchAsExcel(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Reimbursment</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={reimbursement}
                      onChange={(e) => {
                        const value = e.target.checked;
                        dispatch(setReimbursement(value));
                      }}
                      disabled={!editData?.reimbursementDetails[0]?.TotalAmount}
                      //
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Begining Check Number</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      type="input"
                      disabled={!reimbursement}
                      maxLength={10}
                      value={reimbursementBeginningCheckNumber}
                      onChange={(e) => {
                        const value = e.target.value;
                        dispatch(setReimbursementBeginningCheckNumber(isNumber(value)));

                        if (value) {
                          dispatch(setReimbursementBeginningDate(""));
                        }
                      }}
                      onBlur={(e) => getPostCheckData(e.target.value)}
                      className={`customFormControl ${
                        !reimbursement
                          ? ""
                          : reimbursementBeginningCheckNumber &&
                              reimbursementBeginningCheckNumber >=
                                editData?.reimbursementDetails[0]?.BeginningCheckNumber &&
                              reimbursementBeginningCheckNumber <= reimbursementEndingCheckNumber &&
                              reimbursementBeginningCheckNumber > 0 &&
                              reimbursementBeginningCheckNumber <= 2_147_483_647
                            ? ""
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Begining Check Date</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={reimbursementBeginningDate}
                      setIsDateValid={setIsReimbursementBeginningDateValid}
                      disabled={!reimbursement}
                      onBlur={() => {
                        if (
                          isSameDate(reimbursementBeginningDate, existingReimbursementBeginningDate.current)
                        )
                          return;
                        existingReimbursementBeginningDate.current = reimbursementBeginningDate;
                        getPostCheckData();
                      }}
                      min={
                        editData?.reimbursementDetails[0]?.BeginningCheckDate
                          ? parseLocalDate(editData?.reimbursementDetails[0]?.BeginningCheckDate)
                          : ""
                      }
                      max={
                        editData?.reimbursementDetails[0]?.EndingCheckDate
                          ? parseLocalDate(editData?.reimbursementDetails[0]?.EndingCheckDate)
                          : ""
                      }
                      reduxSetDate={(value) => {
                        dispatch(setReimbursementBeginningDate(value));

                        if (value) {
                          dispatch(setReimbursementBeginningCheckNumber(""));
                        }
                      }}
                      className={`customFormControl ${
                        (isReimbursementBeginningDateValid && reimbursementBeginningDate && reimbursement) ||
                        (isReimbursementBeginningDateValid && !reimbursementBeginningDate && !reimbursement)
                          ? ""
                          : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Ending Check Number</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      maxLength={10}
                      value={reimbursementEndingCheckNumber}
                      disabled={!reimbursement}
                      onChange={(e) => {
                        const value = e.target.value;
                        dispatch(setReimbursementEndingCheckNumber(isNumber(value)));

                        if (value) {
                          dispatch(setReimbursementEndingDate(""));
                        }
                      }}
                      onBlur={(e) => getPostCheckData(e.target.value)}
                      className={`customFormControl ${
                        !reimbursement
                          ? ""
                          : reimbursementEndingCheckNumber &&
                              reimbursementEndingCheckNumber <=
                                editData?.reimbursementDetails[0]?.EndingCheckNumber &&
                              reimbursementEndingCheckNumber >= reimbursementBeginningCheckNumber &&
                              reimbursementEndingCheckNumber > 0 &&
                              reimbursementEndingCheckNumber <= 2_147_483_647
                            ? ""
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Ending Check Date</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={reimbursementEndingDate}
                      reduxSetDate={(value) => {
                        dispatch(setReimbursementEndingDate(value));

                        if (value) {
                          dispatch(setReimbursementEndingCheckNumber(""));
                        }
                      }}
                      onBlur={(e) => getPostCheckData(e.target.value)}
                      setIsDateValid={setIsReimbursementEndDateValid}
                      x={new Date()}
                      disabled={!reimbursement}
                      max={
                        editData?.reimbursementDetails[0]?.EndingCheckDate
                          ? parseLocalDate(editData?.reimbursementDetails[0]?.EndingCheckDate)
                          : ""
                      }
                      min={
                        editData?.reimbursementDetails[0]?.BeginningCheckDate
                          ? parseLocalDate(editData?.reimbursementDetails[0]?.BeginningCheckDate)
                          : ""
                      }
                      className={`customFormControl ${
                        (isReimbursementEndDateValid && reimbursementEndingDate && reimbursement) ||
                        (isReimbursementEndDateValid && !reimbursementEndingDate && !reimbursement)
                          ? ""
                          : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Total Amount</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      type="input"
                      className="customFormControl"
                      value={reimbursementTotalAmount}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Print Batch</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      disabled={!reimbursement}
                      checked={reimbursementPrintBatch}
                      onChange={(e) => {
                        dispatch(setReimbursementPrintBatch(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Email Batch as PDF</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      disabled={!reimbursement}
                      checked={reimbursementEmailBatchAsPDF}
                      onChange={(e) => {
                        dispatch(setReimbursementEmailBatchAsPDF(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Email Batch as Excel</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      disabled={!reimbursement}
                      checked={reimbursementEmailBatchAsExcel}
                      onChange={(e) => {
                        dispatch(setReimbursementEmailBatchAsExcel(e.target.checked));
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

export default PostCheckContent;
