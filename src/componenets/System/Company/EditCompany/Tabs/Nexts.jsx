import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllDriversPayTaxable,
  setIsNextsTabValid,
  setNextReimbursmentCheckNumber,
  setSaveCompanyObject,
} from "../../../../../redux/CompanySlice";
import Input from "../../../../../components/common/input";

function Nexts() {
  const dispatch = useDispatch();
  const [nextInvoice, setNextInvoice] = useState("");
  const [nextFodInvoice, setNextFodInvoice] = useState("");
  const [nextStatement, setNextStatement] = useState("");
  const [nextLoad, setNextLoad] = useState("");
  const [nextMultiUnitLoad, setNextMultiUnitLoad] = useState("");
  const [nextBol, setNextBol] = useState("");
  const [nextDelayCase, setNextDelayCase] = useState("");
  const [nextTowableClaim, setNextTowableClaim] = useState("");
  const [nextMotorizedClaim, setNextMotorizedClaim] = useState("");
  const [nextCheckNumber, setNextCheckNumber] = useState("");
  const [nextDebitCardBatch, setNextDebitCardBatch] = useState("");
  const [nextDebitCardReference, setNextDebitCardReference] = useState("");
  const [nextparsNumber, setNextparsNumber] = useState("");
  const [nextpapsNumber, setNextpapsNumber] = useState("");
  const [nextDebitCardDriverNumber, setNextDebitCardDriverNumber] = useState("");
  const [nextDebitCardUnitNumber, setNextDebitCardUnitNumber] = useState("");
  const [nextRealworldBatch, setNextRealworldBatch] = useState("");
  const companyData = useSelector((state) => state.companyReducer.companyData);
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);
  const saveCompanyObject = useSelector((state) => state.companyReducer.saveCompanyObject);
  const nextReimbursmentCheckNumber = useSelector(
    (state) => state.companyReducer.nextReimbursmentCheckNumber
  );

  useEffect(() => {
    setNextInvoice(companyData ? companyData.nextInvoice || "" : "");
    setNextFodInvoice(companyData ? companyData.nextFodInvoice || "" : "");
    setNextStatement(companyData ? companyData.nextStatement || "" : "");
    setNextLoad(companyData ? companyData.nextLoad || "" : "");
    setNextMultiUnitLoad(companyData ? companyData.nextMultiUnitLoad || "" : "");
    setNextBol(companyData ? companyData.nextBol || "" : "");
    setNextDelayCase(companyData ? companyData.nextDelayCase || "" : "");
    setNextTowableClaim(companyData ? companyData.nextTowableClaim || "" : "");
    setNextMotorizedClaim(companyData ? companyData.nextMotorizedClaim || "" : "");
    setNextCheckNumber(companyData ? companyData.nextCheckNumber || "" : "");
    dispatch(setAllDriversPayTaxable(companyData ? companyData.allDriversPayTaxable || false : false));
    if (companyData?.allDriversPayTaxable) {
      dispatch(setNextReimbursmentCheckNumber(0));
    } else {
      dispatch(setNextReimbursmentCheckNumber(companyData?.nextReimbursmentCheckNumber ?? 0));
    }
    setNextDebitCardBatch(companyData ? companyData.nextDebitCardBatch || "" : "");
    setNextDebitCardReference(companyData ? companyData.nextDebitCardReference || "" : "");
    setNextparsNumber(companyData ? companyData.nextparsNumber || "" : "");
    setNextpapsNumber(companyData ? companyData.nextPapsNumber || "" : "");
    setNextDebitCardDriverNumber(companyData ? companyData.nextDebitCardDriverNumber || "" : "");
    setNextDebitCardUnitNumber(companyData ? companyData.nextDebitCardUnitNumber || "" : "");
    setNextRealworldBatch(companyData ? companyData.nextRealworldBatch || "" : "");
  }, [companyData, viewDetail]);

  useEffect(() => {
    dispatch(
      setSaveCompanyObject({
        nextInvoice: nextInvoice,
        nextFodInvoice: nextFodInvoice,
        nextStatement: nextStatement,
        nextLoad: nextLoad,
        nextMultiUnitLoad: nextMultiUnitLoad,
        nextBol: nextBol,
        nextDelayCase: nextDelayCase,
        nextTowableClaim: nextTowableClaim,
        nextMotorizedClaim: nextMotorizedClaim,
        nextCheckNumber: nextCheckNumber,
        nextReimbursmentCheckNumber:
          nextReimbursmentCheckNumber === "" ||
          nextReimbursmentCheckNumber === null ||
          nextReimbursmentCheckNumber === undefined
            ? 0
            : Number(nextReimbursmentCheckNumber),
        nextDebitCardBatch: nextDebitCardBatch,
        nextDebitCardReference: nextDebitCardReference,
        nextparsNumber: nextparsNumber,
        nextpapsNumber: nextpapsNumber,
        nextDebitCardDriverNumber: nextDebitCardDriverNumber,
        nextDebitCardUnitNumber: nextDebitCardUnitNumber,
        nextRealworldBatch: nextRealworldBatch,
      })
    );
  }, [
    nextInvoice,
    nextFodInvoice,
    nextStatement,
    nextLoad,
    nextMultiUnitLoad,
    nextBol,
    nextDelayCase,
    nextTowableClaim,
    nextMotorizedClaim,
    nextCheckNumber,
    nextReimbursmentCheckNumber,
    nextDebitCardBatch,
    nextDebitCardReference,
    nextparsNumber,
    nextpapsNumber,
    nextDebitCardDriverNumber,
    nextDebitCardUnitNumber,
    nextRealworldBatch,
  ]);

  useEffect(() => {
    if (
      parseInt(nextInvoice) > 999999 ||
      parseInt(nextInvoice) < 100000 ||
      nextInvoice === "" ||
      nextInvoice === null ||
      nextInvoice === undefined ||
      parseInt(nextFodInvoice) > 99999 ||
      parseInt(nextFodInvoice) < 10000 ||
      nextFodInvoice === "" ||
      nextFodInvoice === null ||
      nextFodInvoice === undefined ||
      parseInt(nextStatement) > 99999 ||
      parseInt(nextStatement) < 10000 ||
      nextStatement === "" ||
      nextStatement === null ||
      nextStatement === undefined ||
      parseInt(nextLoad) < 1 ||
      nextLoad === "" ||
      nextLoad === null ||
      nextLoad === undefined ||
      parseInt(nextMultiUnitLoad) < 1 ||
      nextMultiUnitLoad === "" ||
      nextMultiUnitLoad === null ||
      nextMultiUnitLoad === undefined ||
      parseInt(nextBol) < 1 ||
      nextBol === "" ||
      nextBol === null ||
      nextBol === undefined ||
      parseInt(nextDelayCase) < 1 ||
      parseInt(nextDelayCase) > 2147483647 ||
      nextDelayCase === "" ||
      nextDelayCase === null ||
      nextDelayCase === undefined ||
      parseInt(nextTowableClaim) < 1 ||
      parseInt(nextTowableClaim) > 32767 ||
      nextTowableClaim === "" ||
      nextTowableClaim === null ||
      nextTowableClaim === undefined ||
      parseInt(nextMotorizedClaim) < 1 ||
      parseInt(nextMotorizedClaim) > 32767 ||
      nextMotorizedClaim === "" ||
      nextMotorizedClaim === null ||
      nextMotorizedClaim === undefined ||
      parseInt(nextCheckNumber) < 1 ||
      parseInt(nextCheckNumber) > 2147483647 ||
      nextCheckNumber === "" ||
      nextCheckNumber === null ||
      nextCheckNumber === undefined ||
      (!saveCompanyObject?.allDriversPayTaxable &&
        (Number(nextReimbursmentCheckNumber) < 1 || Number(nextReimbursmentCheckNumber) > 2147483647)) ||
      parseInt(nextDebitCardBatch) < 1 ||
      parseInt(nextDebitCardBatch) > 2147483647 ||
      nextDebitCardBatch === "" ||
      nextDebitCardBatch === null ||
      nextDebitCardBatch === undefined ||
      parseInt(nextDebitCardReference) < 1 ||
      parseInt(nextDebitCardReference) > 2147483647 ||
      nextDebitCardReference === "" ||
      nextDebitCardReference === null ||
      nextDebitCardReference === undefined ||
      parseInt(nextparsNumber) > 9999999 ||
      parseInt(nextparsNumber) < 1 ||
      nextparsNumber === "" ||
      nextparsNumber === null ||
      nextparsNumber === undefined ||
      parseInt(nextpapsNumber) > 9999999 ||
      parseInt(nextpapsNumber) < 1 ||
      nextpapsNumber === "" ||
      nextpapsNumber === null ||
      nextpapsNumber === undefined ||
      parseInt(nextDebitCardDriverNumber) > 999999 ||
      parseInt(nextDebitCardDriverNumber) < 1 ||
      nextDebitCardDriverNumber === "" ||
      nextDebitCardDriverNumber === null ||
      nextDebitCardDriverNumber === undefined ||
      parseInt(nextDebitCardUnitNumber) > 999999 ||
      parseInt(nextDebitCardUnitNumber) < 1 ||
      nextDebitCardUnitNumber === "" ||
      nextDebitCardUnitNumber === null ||
      nextDebitCardUnitNumber === undefined ||
      parseInt(nextRealworldBatch) < 1 ||
      parseInt(nextRealworldBatch) > 2147483647 ||
      nextRealworldBatch === "" ||
      nextRealworldBatch === null ||
      nextRealworldBatch === undefined
    ) {
      dispatch(setIsNextsTabValid(false));
    } else {
      dispatch(setIsNextsTabValid(true));
    }
  }, [
    nextInvoice,
    nextFodInvoice,
    nextStatement,
    nextLoad,
    nextMultiUnitLoad,
    nextBol,
    nextDelayCase,
    nextTowableClaim,
    nextMotorizedClaim,
    nextCheckNumber,
    nextReimbursmentCheckNumber,
    nextDebitCardBatch,
    nextDebitCardReference,
    nextparsNumber,
    nextpapsNumber,
    nextDebitCardDriverNumber,
    nextDebitCardUnitNumber,
    saveCompanyObject?.allDriversPayTaxable,
    nextRealworldBatch,
  ]);

  return (
    <div className="p-2">
      <div className="d-flex">
        <Col xs={6}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                invoice
              </Form.Label>
            </Col>

            <Col className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextInvoice) > 999999 ||
                      parseInt(nextInvoice) < 100000 ||
                      nextInvoice === "" ||
                      nextInvoice === null ||
                      nextInvoice === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="nextInvoice"
                name="nextInvoice"
                type="text"
                value={nextInvoice}
                disabled={viewDetail}
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextInvoice(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                FOD invoice
              </Form.Label>
            </Col>

            <Col className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextFodInvoice) > 99999 ||
                      parseInt(nextFodInvoice) < 10000 ||
                      nextFodInvoice === "" ||
                      nextFodInvoice === null ||
                      nextFodInvoice === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={nextFodInvoice}
                disabled={viewDetail}
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextFodInvoice(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                statement
              </Form.Label>
            </Col>

            <Col className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextStatement) > 99999 ||
                      parseInt(nextStatement) < 10000 ||
                      nextStatement === "" ||
                      nextStatement === null ||
                      nextStatement === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextStatement}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextStatement(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                load
              </Form.Label>
            </Col>

            <Col className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextLoad) < 1 || nextLoad === "" || nextLoad === null || nextLoad === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextLoad}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextLoad(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                multi unit load
              </Form.Label>
            </Col>

            <Col className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextMultiUnitLoad) < 1 ||
                      nextMultiUnitLoad === "" ||
                      nextMultiUnitLoad === null ||
                      nextMultiUnitLoad === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextMultiUnitLoad}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextMultiUnitLoad(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                BOL
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextBol) < 1 ||
                      parseInt(nextBol) > 2147483647 ||
                      nextBol === "" ||
                      nextBol === null ||
                      nextBol === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextBol}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextBol(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Delay case
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextDelayCase) < 1 ||
                      parseInt(nextDelayCase) > 2147483647 ||
                      nextDelayCase === "" ||
                      nextDelayCase === null ||
                      nextDelayCase === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextDelayCase}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextDelayCase(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                towable claim
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextTowableClaim) < 1 ||
                      parseInt(nextTowableClaim) > 32767 ||
                      nextTowableClaim === "" ||
                      nextTowableClaim === null ||
                      nextTowableClaim === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextTowableClaim}
                disabled={viewDetail}
                type="text"
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextTowableClaim(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driveaway claim
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextMotorizedClaim) < 1 ||
                      parseInt(nextMotorizedClaim) > 32767 ||
                      nextMotorizedClaim === "" ||
                      nextMotorizedClaim === null ||
                      nextMotorizedClaim === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextMotorizedClaim}
                disabled={viewDetail}
                type="text"
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextMotorizedClaim(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                check number
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextCheckNumber) < 1 ||
                      parseInt(nextCheckNumber) > 2147483647 ||
                      nextCheckNumber === "" ||
                      nextCheckNumber === null ||
                      nextCheckNumber === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextCheckNumber}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextCheckNumber(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                reimbursment check
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? !saveCompanyObject?.allDriversPayTaxable
                      ? parseInt(nextReimbursmentCheckNumber) < 1 ||
                        parseInt(nextReimbursmentCheckNumber) > 2147483647 ||
                        nextReimbursmentCheckNumber === "" ||
                        nextReimbursmentCheckNumber === null ||
                        nextReimbursmentCheckNumber === undefined
                        ? "borderRed"
                        : "borderGreen"
                      : ""
                    : ""
                }`}
                id="name"
                name="name"
                value={nextReimbursmentCheckNumber}
                disabled={viewDetail || saveCompanyObject?.allDriversPayTaxable}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  dispatch(setNextReimbursmentCheckNumber(e.target.value.replace(/[^\d]/g, "")));
                }}
              />
            </div>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                debit card batch
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextDebitCardBatch) < 1 ||
                      parseInt(nextDebitCardBatch) > 2147483647 ||
                      nextDebitCardBatch === "" ||
                      nextDebitCardBatch === null ||
                      nextDebitCardBatch === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextDebitCardBatch}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextDebitCardBatch(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                debit card reference
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextDebitCardReference) < 1 ||
                      parseInt(nextDebitCardReference) > 2147483647 ||
                      nextDebitCardReference === "" ||
                      nextDebitCardReference === null ||
                      nextDebitCardReference === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextDebitCardReference}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextDebitCardReference(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                PARS number
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 ">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextparsNumber) > 9999999 ||
                      parseInt(nextparsNumber) < 1 ||
                      nextparsNumber === "" ||
                      nextparsNumber === null ||
                      nextparsNumber === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextparsNumber}
                disabled={viewDetail}
                type="text"
                maxLength={7}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextparsNumber(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                PAPS number
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 ">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextpapsNumber) > 9999999 ||
                      parseInt(nextpapsNumber) < 1 ||
                      nextpapsNumber === "" ||
                      nextpapsNumber === null ||
                      nextpapsNumber === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextpapsNumber}
                disabled={viewDetail}
                type="text"
                maxLength={7}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextpapsNumber(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                debit card driver number
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 ">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextDebitCardDriverNumber) > 999999 ||
                      parseInt(nextDebitCardDriverNumber) < 1 ||
                      nextDebitCardDriverNumber === "" ||
                      nextDebitCardDriverNumber === null ||
                      nextDebitCardDriverNumber === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextDebitCardDriverNumber}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextDebitCardDriverNumber(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                debit card unit number
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 ">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextDebitCardUnitNumber) > 999999 ||
                      parseInt(nextDebitCardUnitNumber) < 1 ||
                      nextDebitCardUnitNumber === "" ||
                      nextDebitCardUnitNumber === null ||
                      nextDebitCardUnitNumber === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextDebitCardUnitNumber}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextDebitCardUnitNumber(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-1 align-items-center row invisible m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label"></Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" softPostDriveawayReload"
                name=" softPostDriveawayReload"
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Passport Batch
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(nextRealworldBatch) < 1 ||
                      parseInt(nextRealworldBatch) > 2147483647 ||
                      nextRealworldBatch === "" ||
                      nextRealworldBatch === null ||
                      nextRealworldBatch === undefined
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                value={nextRealworldBatch}
                disabled={viewDetail}
                type="text"
                maxLength={6}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setNextRealworldBatch(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
}

export default Nexts;
