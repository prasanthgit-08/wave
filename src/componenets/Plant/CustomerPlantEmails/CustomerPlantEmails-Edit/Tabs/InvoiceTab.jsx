import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import {
  setCreditCardCharges,
  setInvoiceBOLOnly,
  setInvoiceDAFOnly,
  setInvoices,
  setSaveFormData,
} from "../../../../../redux/CustomerPlantEmailSlice";

const InvoiceTab = () => {
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantEmailReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerPlantEmailReducer.editFormData);
  const invoices = useSelector((state) => state.customerPlantEmailReducer.invoices);
  const invoiceBOLOnly = useSelector((state) => state.customerPlantEmailReducer.invoiceBOLOnly);
  const invoiceDAFOnly = useSelector((state) => state.customerPlantEmailReducer.invoiceDAFOnly);

  const creditCardCharges = useSelector((state) => state.customerPlantEmailReducer.creditCardCharges);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setInvoices(editFormData.invoices ? editFormData.invoices : ""));
      dispatch(setInvoiceBOLOnly(editFormData.invoiceBOLOnly ? editFormData.invoiceBOLOnly : ""));
      dispatch(setInvoiceDAFOnly(editFormData.invoiceDAFOnly ? editFormData.invoiceDAFOnly : ""));
      dispatch(setCreditCardCharges(editFormData.creditCardCharges ? editFormData.creditCardCharges : ""));
    }
  }, [editFormData]);
  const InvoiceTabData = () => {
    dispatch(
      setSaveFormData({
        invoices,
        invoiceBOLOnly,
        invoiceDAFOnly,

        creditCardCharges,
      })
    );
  };
  useEffect(() => {
    InvoiceTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoices, invoiceBOLOnly, invoiceDAFOnly, creditCardCharges]);
  return (
    <div className="p-15 w-100">
      <Row
        className="m-0 p-0 justify-content-start
    "
      >
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.invoice.tab.invoices")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="invoices"
                name="invoices"
                disabled={viewDetail}
                checked={invoices}
                onChange={(e) => {
                  dispatch(setInvoices(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.invoice.tab.bol.only")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="invoiceBOLOnly"
                name="invoiceBOLOnly"
                disabled={viewDetail}
                checked={invoiceBOLOnly}
                onChange={(e) => {
                  dispatch(setInvoiceBOLOnly(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.invoice.tab.daf.only")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="invoiceDAFOnly"
                name="invoiceDAFOnly"
                disabled={viewDetail}
                checked={invoiceDAFOnly}
                onChange={(e) => {
                  dispatch(setInvoiceDAFOnly(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.invoice.tab.credit.card.charges")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="creditCardCharges"
                name="creditCardCharges"
                disabled={viewDetail}
                checked={creditCardCharges}
                onChange={(e) => {
                  dispatch(setCreditCardCharges(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceTab;
