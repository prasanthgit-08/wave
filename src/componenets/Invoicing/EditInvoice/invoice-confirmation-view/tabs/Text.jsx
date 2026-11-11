import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import { setSaveEditInvoice, setTextChange } from "../../../../../redux/Invoicing/EditInvoiceSlice";
import { useNavigate } from "react-router-dom";

const areInvoiceTextsEqual = (current, next) =>
  current?.length === next?.length && current?.every((value, index) => (value || "") === (next[index] || ""));

// Stored order is always [invoiceText1..4, miscellaneousText1..10].
// Display order puts the miscellaneous texts first and the invoice texts below them:
//   unit + miscellaneous     -> misc 2..10 then invoice 1..4
//   non unit + miscellaneous -> misc 1..10 then invoice 1..4
//   not miscellaneous        -> invoice 1..4 only
const getVisibleInvoiceTexts = (row = {}, isMiscellaneous, isNonUnit, numFields) => {
  let invoiceTexts;
  let misc;

  if (Array.isArray(row)) {
    invoiceTexts = Array.from({ length: 4 }, (_, i) => row[i] || "");
    misc = Array.from({ length: 10 }, (_, i) => row[i + 4] || "");
  } else {
    invoiceTexts = Array.from({ length: 4 }, (_, i) => row[`invoiceText${i + 1}`] || "");
    misc = Array.from({ length: 10 }, (_, i) => row[`miscellaneousText${i + 1}`] || "");
  }

  if (!isMiscellaneous) {
    return invoiceTexts;
  }

  const visibleMisc = (isNonUnit ? misc : misc?.slice(1)) || [];
  return [...visibleMisc, ...(invoiceTexts || [])].slice(0, numFields);
};

const Text = () => {
  const invoiceById = useSelector((state) => state.editInvoiceReducer.invoiceById);
  const viewDetail = useSelector((state) => state.editInvoiceReducer.viewDetail);
  const navigate = useNavigate();
  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const dispatch = useDispatch();
  const saveEditInvoice = useSelector((state) => state.editInvoiceReducer.saveEditInvoice);
  const nonUnitData = useSelector((state) => state.editInvoiceReducer.nonUnitData);

  const isMiscellaneous = invoiceById?.[0]?.miscellaneous === true;
  const isNonUnit = nonUnitData?.length > 0;
  const numFields = !isMiscellaneous ? 4 : isNonUnit ? 14 : 13;

  const [invoiceTextsCombined, setInvoiceTextsCombined] = useState(Array(numFields).fill(""));
  const [hasLoadedInvoiceTexts, setHasLoadedInvoiceTexts] = useState(false);

  useEffect(() => {
    if (!invoicePK) {
      navigate(`/edit-invoice/invoice-unit-selection`);
    }
  }, [invoicePK, navigate]);

  useEffect(() => {
    let nextInvoiceTexts;
    if (saveEditInvoice?.invoiceTextsCombined) {
      nextInvoiceTexts = getVisibleInvoiceTexts(
        saveEditInvoice.invoiceTextsCombined,
        isMiscellaneous,
        isNonUnit,
        numFields
      );
    } else if (invoiceById) {
      nextInvoiceTexts = getVisibleInvoiceTexts(invoiceById?.[0], isMiscellaneous, isNonUnit, numFields);
    }

    if (nextInvoiceTexts) {
      setHasLoadedInvoiceTexts(true);
      setInvoiceTextsCombined((prev) =>
        areInvoiceTextsEqual(prev, nextInvoiceTexts) ? prev : nextInvoiceTexts
      );
    }
  }, [invoiceById, saveEditInvoice?.invoiceTextsCombined, isMiscellaneous, isNonUnit, numFields]);

  //To check if any chamges were made to text
  useEffect(() => {
    const row = invoiceById?.[0] || {};
    const original = getVisibleInvoiceTexts(row, isMiscellaneous, isNonUnit, numFields);
    const changeInText = original?.some((val, idx) => (val || "") !== (invoiceTextsCombined[idx] || ""));
    dispatch(setTextChange(changeInText));
  }, [invoiceTextsCombined, invoiceById, isMiscellaneous, isNonUnit, numFields, dispatch]);
  useEffect(() => {
    if (!hasLoadedInvoiceTexts) {
      return;
    }

    // Map the displayed order (misc first, invoice below) back to the stored
    // order [invoiceText1..4, miscellaneousText1..10].
    const texts = invoiceTextsCombined || [];
    let payload;
    if (!isMiscellaneous) {
      payload = [...texts.slice(0, 4), ...Array(10).fill(null)];
    } else if (!isNonUnit) {
      payload = [...texts.slice(9), null, ...texts.slice(0, 9)];
    } else {
      payload = [...texts.slice(10), ...texts.slice(0, 10)];
    }
    dispatch(
      setSaveEditInvoice({
        key: "invoiceText",
        payload,
      })
    );
  }, [invoiceTextsCombined, hasLoadedInvoiceTexts, isMiscellaneous, isNonUnit, dispatch]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "500px" }}>
        <Col xs={12} className="ps-3">
          <Form.Group className="mt-2 row align-items-start m-l-0 m-r-0 ms-0">
            <Col xs={1} className="p-0 mx-4 w-110px text-end">
              <Form.Label className="customColFormLabel">Invoice Text</Form.Label>
            </Col>

            <Col xs={7}>
              <DynamicTextFields
                numFields={numFields}
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
