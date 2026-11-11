import { Col, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceHoldTabIsValid,
  setInvoiceHoldNotes,
  setInvoiceHold,
} from "../../../../../redux/OrderEntryFilterSlice";

const InvoiceHold = ({ styles }) => {
  const dispatch = useDispatch();
  const [invoiceHoldCheckbox, setInvoiceHoldCheckbox] = useState(false);
  const [invoiceHoldNotesField, setInvoiceHoldNotesField] = useState("");
  const dataResetFlag = useSelector((state) => state.orderEntryReducer.dataReset);

  const invoiceHold = useSelector((state) => state.orderEntryReducer.invoiceHold);

  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);

  //Dispatch invoiceHoldNotesField
  useEffect(() => {
    dispatch(setInvoiceHold(invoiceHoldCheckbox));
    dispatch(setInvoiceHoldNotes(invoiceHoldNotesField));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceHoldNotesField, invoiceHoldCheckbox]);

  //Tab Validation
  useEffect(() => {
    if (invoiceHold && invoiceHoldNotesField !== "") {
      dispatch(setInvoiceHoldTabIsValid(true));
    } else {
      dispatch(setInvoiceHoldTabIsValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceHoldNotesField, invoiceHold]);

  useEffect(() => {
    if (invoiceHold === false || selectedCustomerId) {
      setInvoiceHoldNotesField("");
    }
  }, [invoiceHold, selectedCustomerId, dataResetFlag]);

  useEffect(() => {
    if (dataResetFlag) {
      dispatch(setInvoiceHold(false));
      setInvoiceHoldCheckbox(false);
      dispatch(setInvoiceHoldTabIsValid(false));
    }
  }, [dataResetFlag]);

  useEffect(() => {
    dispatch(setInvoiceHold(false));
    setInvoiceHoldCheckbox(false);
    dispatch(setInvoiceHoldTabIsValid(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCustomerId]);

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      <div className="col-8 m-auto">
        <Col lg={12} sm={12} md={12} xs={12}>
          <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`}>Invoice Hold</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0 align-items-left">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" invoiceHoldCheckbox"
                name=" invoiceHoldCheckbox"
                value={invoiceHoldCheckbox}
                checked={invoiceHoldCheckbox}
                onChange={(e) => {
                  setInvoiceHoldCheckbox(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group row ms-0">
            <Col sm={2} xs={2} className="p-0 mt-1">
              <Form.Label className={` customColFormLabel`}>Invoice Hold Notes</Form.Label>
            </Col>
            <Col lg={9} xs={9} md={9} sm={9} className="p-0 mt-1">
              <textarea
                rows={10}
                cols={70}
                type="text"
                className={`form-control h-400px ${invoiceHold ? (invoiceHoldNotesField === "" ? "borderRed" : "borderGreen") : ""}`}
                id="invoiceHoldNotesField"
                name="invoiceHoldNotesField"
                autoComplete="off"
                aria-autocomplete="list"
                value={invoiceHoldNotesField}
                disabled={!invoiceHoldCheckbox}
                onInput={(e) => {
                  setInvoiceHoldNotesField(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};

export default InvoiceHold;
