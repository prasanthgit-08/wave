import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import { setSaveInvoiceInquiry, setTextChange } from "../../../../../redux/Invoicing/InvoiceInquirySlice";

const Text = ({ invoiceById }) => {
  const viewDetail = useSelector((state) => state.invoiceInquiryReducer.viewDetail);
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const saveEditInvoice = useSelector((state) => state.invoiceInquiryReducer.saveEditInvoice);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const invoice = invoiceById?.[0] || {};

  // Regular Freight Invoice
  const isDriverOrMisc = invoice.driverFK != null || invoice.miscellaneous === true;

  // Driver/Miscellaneous WITHOUT Unit
  const isNonUnit =
    invoice.unitFK == null && invoice.sisterUnitFK == null && invoice.miscellaneousUnit != null;

  // Field count
  const fieldCount = !isDriverOrMisc ? 4 : isNonUnit ? 14 : 13;

  const [invoiceTextsCombined, setInvoiceTextsCombined] = useState(Array(fieldCount).fill(""));

  useEffect(() => {
    if (!invoicePK) {
      navigate("/invoice-inquiry/invoice-unit-selection");
    }
  }, [invoicePK, navigate]);

  useEffect(() => {
    if (!invoiceById?.length) return;

    let values = [];

    if (!isDriverOrMisc) {
      values = [
        invoice.invoiceText1 || "",
        invoice.invoiceText2 || "",
        invoice.invoiceText3 || "",
        invoice.invoiceText4 || "",
      ];
    } else {
      const temp = isNonUnit
        ? [invoice.miscellaneousText1 || "", invoice.miscellaneousText2 || ""]
        : [invoice.miscellaneousText2 || ""];

      values = [
        ...temp,
        invoice.miscellaneousText3 || "",
        invoice.miscellaneousText4 || "",
        invoice.miscellaneousText5 || "",
        invoice.miscellaneousText6 || "",
        invoice.miscellaneousText7 || "",
        invoice.miscellaneousText8 || "",
        invoice.miscellaneousText9 || "",
        invoice.miscellaneousText10 || "",
        invoice.invoiceText1 || "",
        invoice.invoiceText2 || "",
        invoice.invoiceText3 || "",
        invoice.invoiceText4 || "",
      ];
    }

    setInvoiceTextsCombined(values);
  }, [invoiceById, isDriverOrMisc, isNonUnit]);

  useEffect(() => {
    if (!invoiceById?.length) return;

    let original = [];

    if (!isDriverOrMisc) {
      original = [
        invoice.invoiceText1 || "",
        invoice.invoiceText2 || "",
        invoice.invoiceText3 || "",
        invoice.invoiceText4 || "",
      ];
    } else {
      const temp = isNonUnit
        ? [invoice.miscellaneousText1 || "", invoice.miscellaneousText2 || ""]
        : [invoice.miscellaneousText2 || ""];

      original = [
        ...temp,
        invoice.miscellaneousText3 || "",
        invoice.miscellaneousText4 || "",
        invoice.miscellaneousText5 || "",
        invoice.miscellaneousText6 || "",
        invoice.miscellaneousText7 || "",
        invoice.miscellaneousText8 || "",
        invoice.miscellaneousText9 || "",
        invoice.miscellaneousText10 || "",
        invoice.invoiceText1 || "",
        invoice.invoiceText2 || "",
        invoice.invoiceText3 || "",
        invoice.invoiceText4 || "",
      ];
    }

    dispatch(setTextChange(JSON.stringify(original) !== JSON.stringify(invoiceTextsCombined)));
  }, [invoiceTextsCombined, invoiceById, isDriverOrMisc, isNonUnit]);

  useEffect(() => {
    dispatch(
      setSaveInvoiceInquiry({
        key: "invoiceText",
        payload: invoiceTextsCombined,
      })
    );
  }, [invoiceTextsCombined]);

  return (
    <div className="m-1">
      {" "}
      <div className="shadow-sm rounded border p-1">
        <Col xs={10} className="ps-3" style={{ height: "495px" }}>
          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0 ms-0">
            {" "}
            <Col xs={3} className="p-0 align-self-start">
              <Form.Label htmlFor="name" className="col-form-label dealer-label" id="invoiceText4">
                Invoice Text
              </Form.Label>{" "}
            </Col>
            <Col xs={8} className="p-0">
              <DynamicTextFields
                numFields={fieldCount}
                maxCharLimit={80}
                maxLimit={80}
                inputValues={invoiceTextsCombined}
                setInputValues={setInvoiceTextsCombined}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};

export default Text;
