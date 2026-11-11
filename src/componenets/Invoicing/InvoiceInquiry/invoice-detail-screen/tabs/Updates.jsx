import React from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import DateInputField from "../../../../common/DateInputField";

const Updates = () => {
  const invoice = useSelector((state) => state.invoiceInquiryReducer.invoiceById?.[0]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1">
        <Col xs={10} className="ps-3" style={{ height: "495px" }}>
          {/* Corrected Section */}
          {invoice?.invoiceCorrected && (
            <>
              <Form.Group className="mt-3 align-items-start row m-l-0 m-r-0 ms-0">
                <Col xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Correction Date</Form.Label>
                </Col>

                <Col xs={2} className="p-0" style={{ width: "100px" }}>
                  <DateInputField
                    className="customFormControl"
                    date={invoice.correctedDate}
                    disabled={true}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-start row m-l-0 m-r-0 ms-0">
                <Col xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Corrected By</Form.Label>
                </Col>

                <Col xs={9} className="p-0">
                  <input
                    className="customFormControl"
                    value={invoice.correctedBy || ""}
                    disabled
                    style={{ width: "250px" }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-start row m-l-0 m-r-0 ms-0">
                <Col xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Reason</Form.Label>
                </Col>

                <Col xs={8} className="p-0">
                  <textarea
                    rows={5}
                    className="customFormControl h-125px w-100 customFocusClass"
                    value={invoice.correctedReason || ""}
                    disabled
                  />
                </Col>
              </Form.Group>
            </>
          )}

          {/* Voided Section */}
          {invoice?.invoiceVoided && (
            <>
              <Form.Group className="mt-4 align-items-start row m-l-0 m-r-0 ms-0">
                <Col xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Voided Date</Form.Label>
                </Col>

                <Col xs={2} className="p-0" style={{ width: "100px" }}>
                  <DateInputField className="customFormControl" date={invoice.voidedDate} disabled={true} />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-start row m-l-0 m-r-0 ms-0">
                <Col xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Voided By</Form.Label>
                </Col>

                <Col xs={9} className="p-0">
                  <input
                    className="customFormControl"
                    value={invoice.voidedUserName || ""}
                    disabled
                    style={{ width: "250px" }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-start row m-l-0 m-r-0 ms-0">
                <Col xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Reason</Form.Label>
                </Col>

                <Col xs={8} className="p-0">
                  <textarea
                    rows={5}
                    className="customFormControl h-125px w-100 customFocusClass"
                    value={invoice.voidedReason || ""}
                    disabled
                  />
                </Col>
              </Form.Group>
            </>
          )}
        </Col>
      </div>
    </div>
  );
};

export default Updates;
