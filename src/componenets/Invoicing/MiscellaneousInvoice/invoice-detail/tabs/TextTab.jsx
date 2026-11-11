import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import {
  setInvoiceTextInputs,
  setMiscInvoiceFormData,
} from "../../../../../redux/Invoicing/MiscInvoiceSlice";

const TextTab = () => {
  const dispatch = useDispatch();
  const invoiceTextInputs = useSelector((state) => state.miscInvoiceReducer.invoiceTextInputs);
  const isNonUnitInvoice = useSelector((state) => state.miscInvoiceReducer.isNonUnitInvoice);
  const [invoiceTextInputValues, setInvoiceTextInputValues] = useState(
    Array(isNonUnitInvoice ? 14 : 13).fill("")
  );
  const numFields = isNonUnitInvoice ? 14 : 13;

  /****
   * Set the Save Form data for Invoice
   * *****/
  const invoiceTextFormData = () => {
    let tempArray = [];
    if (isNonUnitInvoice) {
      tempArray = invoiceTextInputValues;
    } else {
      tempArray = [null, ...invoiceTextInputValues];
    }
    dispatch(
      setMiscInvoiceFormData({
        invoiceTextArray: tempArray,
      })
    );
  };

  /*****
   * edit/paste data passes to back end as array - Invoice Text
   *
   * *****/

  useEffect(() => {
    if (invoiceTextInputs?.length !== 0) {
      const padded = [...invoiceTextInputs];
      while (padded?.length < numFields) padded.push("");
      setInvoiceTextInputValues(padded);
    }
  }, []);

  useEffect(() => {
    dispatch(setInvoiceTextInputs(invoiceTextInputValues));
  }, [invoiceTextInputValues]);

  useEffect(() => {
    invoiceTextFormData();
  }, [invoiceTextInputValues, invoiceTextInputs]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "500px" }}>
        {" "}
        <Col xs={12} className="ps-1">
          <Form.Group className="mt-1 row align-items-start m-l-0 m-r-0 ms-0">
            <Col xs={1} className="p-0 mx-4 w-110px text-end">
              <Form.Label className="customColFormLabel">Invoice Text</Form.Label>
            </Col>
            <Col xs={8}>
              <DynamicTextFields
                numFields={isNonUnitInvoice ? 14 : 13}
                maxCharLimit={80}
                maxLimit={80}
                inputValues={invoiceTextInputValues}
                setInputValues={setInvoiceTextInputValues}
                invoice={true}
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};

export default TextTab;
