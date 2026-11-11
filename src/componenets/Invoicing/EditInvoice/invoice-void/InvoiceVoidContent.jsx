import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSaveEditInvoice } from "../../../../redux/Invoicing/EditInvoiceSlice";

const InvoiceVoidContent = () => {
  const invoiceById = useSelector((state) => state.editInvoiceReducer.invoiceById);
  const [voidedReason, setVoidedReason] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setSaveEditInvoice({
        key: "voidedReason",
        payload: { voidedReason, voidFlag: true },
      })
    );
  }, [voidedReason]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "432px" }}>
        <Col className="ps-3">
          <Form.Group className="mt-5 align-items-start row  m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label htmlFor="name" className={`col-form-label  dealer-label`}>
                Reason For Void
              </Form.Label>
            </Col>

            <Col xs={9} md={9} sm={9} className="p-0">
              <textarea
                rows={10}
                type="text"
                id="voidReason"
                name="voidReason"
                className={`customFormControl h-100 w-100 customFocusClass  ${
                  voidedReason !== "" && voidedReason?.length >= 1 ? "borderGreen" : "borderRed"
                } `}
                value={voidedReason}
                onChange={(e) => setVoidedReason(e.target.value.replace(/^\s+/, ""))}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};

export default InvoiceVoidContent;
