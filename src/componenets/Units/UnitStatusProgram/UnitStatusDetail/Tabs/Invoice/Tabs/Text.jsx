import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import DynamicTextFields from "../../../../../../common/AutoWrapTextFields/DynamicTextFields";

/**
 * Invoice texts of the invoice selected on the Header tab - same number of fields as the unit invoice
 * text tabs (Miscellaneous Invoice TextTab, Edit Invoice Text), read only here. Unit Status invoices
 * always belong to a unit, so there is no non-unit layout.
 *
 * invoiceTextInputs is in stored order [InvoiceText1..4, MiscellaneousText1..10]; shown as
 *   not miscellaneous -> 4 fields:  invoice 1..4
 *   miscellaneous     -> 13 fields: misc 2..10 then invoice 1..4 (misc 1 is not used for unit invoices)
 */
const getVisibleInvoiceTexts = (storedTexts = [], isMiscellaneousInvoice, numFields) => {
  const invoiceTexts = Array.from({ length: 4 }, (_, i) => storedTexts[i] || "");
  const misc = Array.from({ length: 10 }, (_, i) => storedTexts[i + 4] || "");

  if (!isMiscellaneousInvoice) {
    return invoiceTexts;
  }

  return [...misc.slice(1), ...invoiceTexts].slice(0, numFields);
};

const Text = () => {
  const invoiceTextInputs = useSelector((state) => state.unitStatusReducer.invoiceTextInputs);
  const isMiscellaneousInvoice = useSelector((state) => state.unitStatusReducer.isMiscellaneousInvoice);
  const numFields = isMiscellaneousInvoice ? 13 : 4;

  const [invoiceTextInputValues, setInvoiceTextInputValues] = useState(Array(numFields).fill(""));

  /*****
   * Texts of the selected invoice in display order, padded to the number of fields.
   * Follows each Header row selection (the misc invoice fills once on mount).
   * *****/
  useEffect(() => {
    const padded = getVisibleInvoiceTexts(invoiceTextInputs, isMiscellaneousInvoice, numFields);
    while (padded?.length < numFields) padded.push("");
    setInvoiceTextInputValues(padded);
  }, [invoiceTextInputs, isMiscellaneousInvoice]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "500px" }}>
        {" "}
        <Col xs={12} className="ps-1">
          <Form.Group className="mt-1 row align-items-start m-l-0 m-r-0 ms-0">
            <Col xs={1} className="p-0 mx-4 w-110px text-end">
              <Form.Label className="customColFormLabel">Invoice Text</Form.Label>
            </Col>
            <Col xs={5}>
              <DynamicTextFields
                numFields={numFields}
                maxCharLimit={80}
                maxLimit={80}
                inputValues={invoiceTextInputValues}
                setInputValues={setInvoiceTextInputValues}
                invoice={true}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};

export default Text;
