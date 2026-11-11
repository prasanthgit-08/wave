import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import DynamicTextFields from "../../../../../../../common/AutoWrapTextFields/DynamicTextFields";
import {
  setInvoiceText1,
  setInvoiceText3,
  setInvoiceTrextArray,
  setMiscellaneousInvoiceTextArray,
} from "../../../../../../../../redux/UndispatchSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const APUTextContent = () => {
  const dispatch = useDispatch();

  const {
    miscellaneousInvoiceTextArray,
    apuAuthorizedBy,
    driverName,

    invoiceTrextArray,
  } = useSelector((state) => state.undispatchReducer);

  const [miscInvoiceTextInputValues, setMiscInvoiceTextInputValues] = useState(Array(9).fill(""));
  const [invoiceTextInputValues, setInvoiceTextInputValues] = useState(Array(4).fill(""));

  useEffect(() => {
    dispatch(setMiscellaneousInvoiceTextArray(miscInvoiceTextInputValues));
  }, [miscInvoiceTextInputValues]);

  useEffect(() => {
    if (miscellaneousInvoiceTextArray.length !== 0) {
      setMiscInvoiceTextInputValues(miscellaneousInvoiceTextArray);
    }
  }, []);

  useEffect(() => {
    dispatch(setInvoiceTrextArray(invoiceTextInputValues));
  }, [invoiceTextInputValues]);
  useEffect(() => {
    if (invoiceTrextArray.length !== 0) {
      setInvoiceTextInputValues(invoiceTrextArray);
    }
  }, []);
  useEffect(() => {
    setInvoiceTextInputValues((prev) => [
      "ATTEMPTED PICKUP BY DRIVER",
      ` ${driverName || ""}`,
      `Authorized By ${apuAuthorizedBy || ""}`,
      prev[3],
    ]);
  }, [apuAuthorizedBy, driverName]);

  return (
    <div className="p-2">
      <Col xs={12} className="ps-1">
        <Form.Group className="mt-0 align-items row  m-l-0 m-r-0">
          <Col sm={2} md={2} xs={2} className="p-0">
            <Form.Label className="col-form-label dealer-label">Invoice Text</Form.Label>
          </Col>
          <Col xs={7} sm={7} md={7} className="p-0 ">
            <DynamicTextFields
              numFields={9}
              maxCharLimit={80}
              maxLimit={80}
              inputValues={miscInvoiceTextInputValues}
              setInputValues={setMiscInvoiceTextInputValues}
              invoice
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-0 align-items row  m-l-0 m-r-0">
          <Col sm={2} md={2} xs={2} className="p-0">
            <Form.Label className="col-form-label dealer-label"></Form.Label>
          </Col>
          <Col xs={7} sm={7} md={7} className="p-0 ">
            <DynamicTextFields
              numFields={4}
              maxCharLimit={80}
              maxLimit={80}
              inputValues={invoiceTextInputValues}
              setInputValues={setInvoiceTextInputValues}
              invoice
            />
          </Col>
        </Form.Group>
      </Col>
    </div>
  );
};

export default APUTextContent;
