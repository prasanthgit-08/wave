import { t } from "i18next";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import {
  setCreditCardPayments as setCreditCardPaymentsToRedux,
  setOpenBalancePayments as setOpenBalancePaymentsToRedux,
  setOpenBulkInvoices as setOpenBulkInvoicesToRedux,
  setBulkInvoices as setBulkInvoicesToRedux,
  setCustomerFormData,
  setValidInvoicePaymentTab,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import CustomerService from "../../../../../../services/CustomerService";
import Input from "../../../../../../components/common/input";

function PaymentsTab() {
  const dispatch = useDispatch();

  const [openBulkInvoices, setOpenBulkInvoices] = useState(false);
  const [allCreditCardPayments, setAllCreditCardPayments] = useState([]);
  const [filteredCreditCardPaymentsList, setFilteredCreditCardPaymentsList] = useState([]);
  const [filteredOpenBalancePaymentsList, setFilteredOpenBalancePaymentsList] = useState([]);
  const [filteredBulkInvoicesList, setFilteredBulkInvoicesList] = useState([]);
  const [creditCardPayments, setCreditCardPayments] = useState("");
  const [openBalancePayments, setOpenBalancePayments] = useState("");
  const [bulkInvoices, setBulkInvoices] = useState("");
  const [individualBulkUnitInvoice, setIndividualBulkUnitInvoice] = useState(false);
  const [nextBulkInvoiceDescription, setNextBulkInvoiceDescription] = useState("");

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  const allDealersFOD = useSelector((state) => state.customerMaintenanceReducer.settingsAllDealersFOD);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  const getCreditCardPayments = () => {
    CustomerService.getCreditCardPayments()
      .then((response) => {
        const data = response?.data;
        setAllCreditCardPayments(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    dispatch(setCreditCardPaymentsToRedux(creditCardPayments));
    dispatch(setOpenBalancePaymentsToRedux(openBalancePayments));
    dispatch(setOpenBulkInvoicesToRedux(openBulkInvoices));
    dispatch(setBulkInvoicesToRedux(bulkInvoices));
  }, [creditCardPayments, openBalancePayments, bulkInvoices, openBulkInvoices]);

  useEffect(() => {
    if (allDealersFOD === false) {
      setFilteredCreditCardPaymentsList(
        allCreditCardPayments?.filter((item) => item.creditCardPaymentsID !== "Y"),
        setFilteredOpenBalancePaymentsList(allCreditCardPayments)
      );
      setFilteredBulkInvoicesList(allCreditCardPayments);
    } else {
      setFilteredCreditCardPaymentsList(allCreditCardPayments);
      setFilteredOpenBalancePaymentsList(
        allCreditCardPayments?.filter(
          (item) => item.creditCardPaymentsID !== "A" && item.creditCardPaymentsID !== "Y"
        )
      );
      setFilteredBulkInvoicesList(
        allCreditCardPayments?.filter(
          (item) => item.creditCardPaymentsID !== "A" && item.creditCardPaymentsID !== "Y"
        )
      );
    }
  }, [allDealersFOD, allCreditCardPayments]);

  useEffect(() => {
    getCreditCardPayments();
  }, []);

  useEffect(() => {
    if (editCustomerData === null) {
      setCreditCardPayments("");
      setOpenBalancePayments("");
      setBulkInvoices("");
      setOpenBulkInvoices(false);
      setNextBulkInvoiceDescription("");
    }
    if (editCustomerData !== null) {
      setCreditCardPayments(
        editCustomerData.creditCardPayments != null ? editCustomerData.creditCardPayments : ""
      );
      setOpenBalancePayments(
        editCustomerData.openBalancePayments != null ? editCustomerData.openBalancePayments : ""
      );
      setBulkInvoices(editCustomerData.bulkInvoices != null ? editCustomerData.bulkInvoices : "");
      setOpenBulkInvoices(editCustomerData.openBulkInvoices != null ? editCustomerData.openBulkInvoices : "");
      setIndividualBulkUnitInvoice(
        editCustomerData.bulkUnitInvoices != null ? editCustomerData.bulkUnitInvoices : ""
      );
      setNextBulkInvoiceDescription(
        editCustomerData.bulkInvoiceSequence != null ? editCustomerData.bulkInvoiceSequence : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    if (/^[A-Za-z0-9]{0,28}-\d+$/.test(nextBulkInvoiceDescription)) {
      dispatch(setValidInvoicePaymentTab(true));
    } else if (!nextBulkInvoiceDescription && !openBulkInvoices) {
      dispatch(setValidInvoicePaymentTab(null));
    } else {
      dispatch(setValidInvoicePaymentTab(false));
    }
  }, [nextBulkInvoiceDescription, openBulkInvoices]);

  useEffect(() => {
    paymentsFormData();
    dispatch(setCreditCardPaymentsToRedux(creditCardPayments));
    dispatch(setBulkInvoicesToRedux(bulkInvoices));
    dispatch(setOpenBalancePaymentsToRedux(openBalancePayments));
    dispatch(setOpenBulkInvoicesToRedux(openBulkInvoices));
  }, [
    creditCardPayments,
    openBalancePayments,
    bulkInvoices,
    openBulkInvoices,
    individualBulkUnitInvoice,
    nextBulkInvoiceDescription,
  ]);
  useEffect(() => {
    if (bulkInvoices === "N" || !bulkInvoices) {
      setOpenBulkInvoices(false);
      setIndividualBulkUnitInvoice(false);
    }
  }, [bulkInvoices]);

  useEffect(() => {
    if (!openBulkInvoices) {
      setNextBulkInvoiceDescription("");
    }
  }, [openBulkInvoices]);

  const paymentsFormData = () => {
    dispatch(
      setCustomerFormData({
        creditCardPayments: creditCardPayments,
        openBalancePayments: openBalancePayments,
        bulkInvoices: bulkInvoices,
        openBulkInvoices: openBulkInvoices,
        bulkUnitInvoices: individualBulkUnitInvoice,
        bulkInvoiceSequence: nextBulkInvoiceDescription,
      })
    );
  };

  return (
    <div className="p-2 w-100">
      <Row className="m-0 p-0">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          {/*Credit Card Payments*/}
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.invoice.sub.tab.payments.credit.card.payments.field")}
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <Form.Select
                className="customFormControl"
                name="creditCardPayments"
                disabled={viewDetail}
                value={creditCardPayments}
                onChange={(e) => {
                  setCreditCardPayments(e.target.value);
                }}
              >
                <option value="">--Select--</option>

                {filteredCreditCardPaymentsList?.map((item) => (
                  <option key={item.creditCardPaymentsID} value={item.creditCardPaymentsID}>
                    {item.creditCardPaymentsName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          {/*Open Balance Payments*/}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.invoice.sub.tab.payments.open.balance.payments.field")}
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <Form.Select
                className="customFormControl"
                name="openBalancePayments"
                disabled={viewDetail}
                value={openBalancePayments}
                onChange={(e) => {
                  setOpenBalancePayments(e.target.value);
                }}
              >
                <option value="">--Select--</option>

                {filteredOpenBalancePaymentsList?.map((item) => (
                  <option key={item.creditCardPaymentsID} value={item.creditCardPaymentsID}>
                    {item.creditCardPaymentsName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          {/*Bulk Invoices*/}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.invoice.sub.tab.payments.bulk.invoices.field")}
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <Form.Select
                className="customFormControl"
                name="bulkInvoices"
                disabled={viewDetail}
                value={bulkInvoices}
                onChange={(e) => {
                  setBulkInvoices(e.target.value);
                }}
              >
                <option value="">--Select--</option>

                {filteredBulkInvoicesList?.map((item) => (
                  <option key={item.creditCardPaymentsID} value={item.creditCardPaymentsID}>
                    {item.creditCardPaymentsName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          {/*Open Bulk Invoices*/}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.invoice.sub.tab.payments.open.bulk.invoices.field")}
              </Form.Label>
            </Col>
            <Col xs={6} md={6} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="openBulkInvoices"
                value={openBulkInvoices}
                disabled={viewDetail || bulkInvoices === "N" || !bulkInvoices}
                checked={openBulkInvoices}
                onChange={(e) => setOpenBulkInvoices(e.target.checked)}
              />
            </Col>
          </Form.Group>

          {/*individual Unit Bulk Invoices*/}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Individual Unit Bulk Invoices</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="individualBulkUnitInvoice"
                value={individualBulkUnitInvoice}
                disabled={viewDetail || bulkInvoices === "N" || !bulkInvoices}
                checked={individualBulkUnitInvoice}
                onChange={(e) => setIndividualBulkUnitInvoice(e.target.checked)}
              />
            </Col>
          </Form.Group>

          {/* Next Bulk Invoice Description */}
          <Form.Group className="mt-3 mb-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Next Bulk Invoice Description</Form.Label>
            </Col>
            <Col xs={6} sm={6} md={6} className="p-0">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? openBulkInvoices
                      ? nextBulkInvoiceDescription?.match(/^[A-Za-z0-9]{0,28}-\d+$/)
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}

                name="nextBulkInvoiceDescription"
                value={nextBulkInvoiceDescription}
                disabled={viewDetail || !openBulkInvoices}
                maxLength={30}
                onChange={(e) => {
                  const value = e.target.value?.toUpperCase();
                  if (/^(?:[A-Za-z0-9]+(?:-)?(?:\d+)?|)$/.test(value)) {
                    setNextBulkInvoiceDescription(value);
                  }
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default PaymentsTab;
