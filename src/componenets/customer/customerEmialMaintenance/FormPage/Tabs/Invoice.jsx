import React from "react";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import { t } from "i18next";
import {
  setInvoices,
  setInvoiceBOLOnly,
  setInvoiceDAFOnly,
  setStatements,
  setCreditCardCharges,
} from "../../../../../redux/CustomerEmailMaintenanceSlice";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";

function Invoice() {
  const invoices = useSelector((state) => state.customerEmailMaintenance.invoices);
  const bolOnly = useSelector((state) => state.customerEmailMaintenance.invoiceBOLOnly);
  const dafOnly = useSelector((state) => state.customerEmailMaintenance.invoiceDAFOnly);
  const statements = useSelector((state) => state.customerEmailMaintenance.statements);
  const creditCardCharges = useSelector((state) => state.customerEmailMaintenance.creditCardCharges);

  const EditMode = useSelector((state) => state.customerEmailMaintenance.editMode);

  const dispatch = useDispatch();

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
                disabled={EditMode}

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
                id="bolOnly"
                name="bolOnly"
                disabled={EditMode}

                checked={bolOnly}

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
                id="dafOnly"
                name="dafOnly"
                disabled={EditMode}

                checked={dafOnly}

                onChange={(e) => {
                  dispatch(setInvoiceDAFOnly(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.invoice.tab.statements")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="statements"
                disabled={EditMode}

                name="statements"
                checked={statements}

                onChange={(e) => {
                  dispatch(setStatements(e.target.checked));
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
                disabled={EditMode}

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
}

export default Invoice;
