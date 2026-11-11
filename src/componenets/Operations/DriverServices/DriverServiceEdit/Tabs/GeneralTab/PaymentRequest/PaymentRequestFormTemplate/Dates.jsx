import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DateInputField from "../../../../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import { setDriversPayTabData } from "../../../../../../../../redux/PaymentRequestSlice";

const Dates = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [dateEntered, setDateEntered] = useState("");
  const [enteredBy, setEnteredBy] = useState("");
  const [paid, setPaid] = useState("");
  const [datePaid, setDatePaid] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [denied, setDenied] = useState("");
  const [dateDenied, setDateDenied] = useState("");
  const [dateBy, setDateBy] = useState("");

  const [reasonDenied, setReasonDenied] = useState("");
  const editFormData = useSelector((state) => state.paymentRequestSlice.editFormData);
  const viewDetail = useSelector((state) => state.paymentRequestSlice.viewDetail);
  useEffect(() => {
    dispatch(
      setDriversPayTabData({
        dateEntered: dateEntered,
        enteredBy: enteredBy,
        paid: paid,
        datePaid: datePaid,
        paidBy: paidBy,
        denied: denied,
        dateDenied: dateDenied,
        dateBy: dateBy,
        reasonDenied: reasonDenied,
      })
    );
  }, [
    dateEntered,
    enteredBy,
    paid,
    datePaid,
    paidBy,
    denied,
    dateDenied,
    dateBy,
    reasonDenied,
    editFormData,
  ]);

  useEffect(() => {
    if (editFormData) {
      setDateEntered(editFormData.DateEntered || null);
      setEnteredBy(editFormData.EnteredBy || false);
      setPaid(editFormData.Paid || false);
      setDatePaid(editFormData.DatePaid || "");
      setPaidBy(editFormData.PaidBy || "");
      setDenied(editFormData.Denied || false);
      setDateDenied(editFormData.DateDenied || "");
      setReasonDenied(editFormData.ReasonDenied || "");
      setDateBy(editFormData?.DeniedBy);
    }
  }, [editFormData]);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20">
        <Col xs={12}>
          <Form.Group className="mt-2 mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Date Entered</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={dateEntered}
                name="hireDate"
                className="customFormControl"
                setDate={setDateEntered}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className="customColFormLabel pe-3">Entered By</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                name="enteredBy"
                id="enteredBy"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={enteredBy}
                onChange={(e) => setEnteredBy(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Paid</Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                maxLength={30}
                className={`className=" me-2 p-0 `}
                checked={paid}
                onChange={(e) => setPaid(e.target.checked)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className="customColFormLabel pe-3">Date Paid</Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={datePaid}
                name="hireDate"
                className="customFormControl"
                setDate={setDatePaid}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Paid By</Form.Label>
            </Col>

            <Col xs={3} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className="customColFormLabel pe-3">Denied</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                name="denied"
                id="denied"
                type="checkbox"
                className={`className=" me-2 p-0 "
`}
                autoComplete="off"
                checked={denied}
                onChange={(e) => setDenied(e.target.checked)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className="customColFormLabel pe-3">Date By</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                name="dateDenied"
                id="dateDenied"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={dateBy}
                onChange={(e) => setDateBy(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Date Denied</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                date={dateDenied}
                name="hireDate"
                className="customFormControl"
                setDate={setDateDenied}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0 d-flex align-self-start">
              <Form.Label className={`customColFormLabel`}>Reason Denied</Form.Label>
            </Col>

            <Col xs={9} className="p-0">
              <textarea
                name="reasonDenied"
                id="reasonDenied"
                style={{ width: "100%" }}
                rows="9"
                className={`customFocusClass `}
                maxLength={300}
                value={reasonDenied}
                onChange={(e) => setReasonDenied(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Dates;
