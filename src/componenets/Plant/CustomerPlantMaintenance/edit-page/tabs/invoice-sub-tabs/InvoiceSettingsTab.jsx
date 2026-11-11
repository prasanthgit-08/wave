import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlantFormData,
  setInvoiceSettingsELDFeeCheckbox,
  setInvoiceSettingsELDFee,
  setInvoiceSettingsDriverELDFee,
  setInvoiceSettingsAskFlagsAndSignsCheckbox,
  setInvoiceSettingsInvoiceFlagsAndSigns,
  setInvoiceSettingsDriverFlagsAndSigns,
  setInvoiceSettingsInvoiceAttemptedPickup,
  setInvoiceSettingsDriverAttemptedPickup,
  setInvoiceSettingsInvoicePercentage,
  setInvoiceSettingsPercentageTruckingCompany,
} from "../../../../../../redux/CustomerPlantMaintenanceSlice";
const InvoiceSettingsTab = () => {
  const [invoiceAttemptedPickup, setInvoiceAttemptedPickup] = useState("");
  const [driverAttemptedPickup, setDriverAttemptedPickup] = useState("");
  const [adjustAttemptedPickup, setAdjustAttemptedPickup] = useState("");
  const [askFlagsAndSigns, setAskFlagsAndSigns] = useState(false);
  const [invoiceFlagsAndSignsAmount, setInvoiceFlagsAndSignsAmount] = useState("");
  const [driverFlagsAndSignsAmount, setDriverFlagsAndSignsAmount] = useState("");
  const [eldFee, setEldFee] = useState(false);
  const [invoiceELDAmount, setInvoiceELDAmount] = useState("");
  const [driverELDAmount, setDriverELDAmount] = useState("");
  const [invoicePercentage, setInvoicePercentage] = useState("");
  const [invoicePercentageTransportCompany, setInvoicePercentageTransportCompany] = useState("");
  const [invoiceInstructions, setInvoiceInstructions] = useState("");
  const [atleastOneError, setAtleastOneError] = useState(true);
  const [atleastOneRequired, setAtleastOneRequired] = useState(true);

  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);

  let invoiceELDSettingsFeeCheckbox = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceELDSettingsFeeCheckbox
  );

  let invoiceSettingsELDFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsELDFee
  );

  let invoiceSettingsDriverELDFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsDriverELDFee
  );

  let invoiceSettingsAskFlagsAndSignsCheckbox = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsAskFlagsAndSignsCheckbox
  );

  let invoiceSettingsInvoiceFlagsAndSigns = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsInvoiceFlagsAndSigns
  );

  let invoiceSettingsDriverFlagsAndSigns = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsDriverFlagsAndSigns
  );

  useEffect(() => {
    if (editPlantData != null) {
      setInvoiceAttemptedPickup(editPlantData.invoiceAttemptedPickup?.toFixed(2));

      setDriverAttemptedPickup(editPlantData.driverAttemptedPickup?.toFixed(2));
      setAdjustAttemptedPickup(
        editPlantData.adjustAttemptedPickup != null ? editPlantData.adjustAttemptedPickup : ""
      );
      setAskFlagsAndSigns(editPlantData.askFlagsAndSigns != null ? editPlantData.askFlagsAndSigns : "");
      setInvoiceFlagsAndSignsAmount(editPlantData.invoiceFlagsAndSignsAmount?.toFixed(2));
      setDriverFlagsAndSignsAmount(editPlantData.driverFlagsAndSignsAmount?.toFixed(2));
      setEldFee(editPlantData.eldFee != null ? editPlantData.eldFee : "");
      setInvoiceELDAmount(editPlantData.invoiceELDAmount?.toFixed(2));
      setDriverELDAmount(editPlantData.driverELDAmount?.toFixed(2));
      setInvoicePercentage(
        editPlantData.invoicePercentage != null && editPlantData.invoicePercentage > 0
          ? editPlantData.invoicePercentage
          : ""
      );
      setInvoicePercentageTransportCompany(
        editPlantData.invoicePercentageTransportCompany != null &&
          editPlantData.invoicePercentageTransportCompany > 0
          ? editPlantData.invoicePercentageTransportCompany
          : ""
      );
      setInvoiceInstructions(
        editPlantData.invoiceInstructions != null ? editPlantData.invoiceInstructions : ""
      );
    }
  }, [editPlantData, viewDetail]);
  useEffect(() => {
    invoiceSettingsFormData();
  }, [
    invoiceAttemptedPickup,
    driverAttemptedPickup,
    adjustAttemptedPickup,
    askFlagsAndSigns,
    invoiceFlagsAndSignsAmount,
    driverFlagsAndSignsAmount,
    eldFee,
    invoiceELDAmount,
    driverELDAmount,
    invoicePercentage,
    invoicePercentageTransportCompany,
    invoiceInstructions,
  ]);

  const invoiceSettingsFormData = () => {
    dispatch(
      setPlantFormData({
        invoiceAttemptedPickup: invoiceAttemptedPickup,
        driverAttemptedPickup: driverAttemptedPickup,
        adjustAttemptedPickup: adjustAttemptedPickup,
        askFlagsAndSigns: askFlagsAndSigns,
        invoiceFlagsAndSignsAmount: invoiceFlagsAndSignsAmount,
        driverFlagsAndSignsAmount: driverFlagsAndSignsAmount,
        eldFee: eldFee,
        invoiceELDAmount: invoiceELDAmount,
        driverELDAmount: driverELDAmount,
        invoicePercentage: invoicePercentage,
        invoicePercentageTransportCompany: invoicePercentageTransportCompany,
        invoiceInstructions: invoiceInstructions,
      })
    );
  };
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };
  const isNumberBetween1And99 = (value) => {
    if (!value) return ""; // empty input
    // Remove non-digit characters
    const digitsOnly = value.replace(/[^\d]/g, "");

    // Convert to number
    const num = parseInt(digitsOnly, 10);

    // Allow only 1–99
    if (num >= 1 && num <= 99) return num.toString();
    return ""; // invalid numbers
  };

  const feeValidation = /^(?:\d{1,5}(\.\d{1,2})?|\.\d{1,2})$/;

  const percentageValidation = /^\d{0,5}(\.\d{0,4})?$/;
  const validationSchema = yup.object({
    driverAttemptedPickup: yup.string().required().matches(feeValidation),
    invoiceAttemptedPickup: yup.string().required().matches(feeValidation),

    invoicePercentage: yup.number().min(0).max(99).required(),

    invoicePercentageTransportCompany: yup.number().min(0).max(99).required(),
    driverELDAmount: yup.string().matches(feeValidation),
    invoiceELDAmount: yup.string().matches(feeValidation),
    invoiceFlagsAndSignsAmount: yup.string().matches(feeValidation),
    driverFlagsAndSignsAmount: yup.string().matches(feeValidation),
  });
  useEffect(() => {
    if (eldFee === false) {
      setInvoiceELDAmount("");
      setDriverELDAmount("");
    }
  }, [eldFee, invoiceELDAmount, driverELDAmount]);

  useEffect(() => {
    dispatch(setInvoiceSettingsELDFeeCheckbox(eldFee));
    dispatch(setInvoiceSettingsELDFee(invoiceELDAmount));
    dispatch(setInvoiceSettingsDriverELDFee(driverELDAmount));
    dispatch(setInvoiceSettingsAskFlagsAndSignsCheckbox(askFlagsAndSigns));
    dispatch(setInvoiceSettingsInvoiceFlagsAndSigns(invoiceFlagsAndSignsAmount));
    dispatch(setInvoiceSettingsDriverFlagsAndSigns(driverFlagsAndSignsAmount));
    dispatch(setInvoiceSettingsInvoiceAttemptedPickup(invoiceAttemptedPickup));
    dispatch(setInvoiceSettingsDriverAttemptedPickup(driverAttemptedPickup));
    dispatch(setInvoiceSettingsInvoicePercentage(invoicePercentage));
    dispatch(setInvoiceSettingsPercentageTruckingCompany(invoicePercentageTransportCompany));
  }, [
    askFlagsAndSigns,
    invoiceFlagsAndSignsAmount,
    driverFlagsAndSignsAmount,
    eldFee,
    invoiceELDAmount,
    driverELDAmount,
    invoiceAttemptedPickup,
    driverAttemptedPickup,
    invoicePercentage,
    invoicePercentageTransportCompany,
  ]);

  useEffect(() => {
    if (askFlagsAndSigns === false) {
      setInvoiceFlagsAndSignsAmount("");
      setDriverFlagsAndSignsAmount("");
    }
  }, [askFlagsAndSigns, driverFlagsAndSignsAmount, invoiceFlagsAndSignsAmount]);

  return (
    <Formik
      initialValues={{
        invoiceAttemptedPickup,
        driverAttemptedPickup,
        driverFlagsAndSignsAmount,
        invoiceFlagsAndSignsAmount,
        invoiceELDAmount,
        driverELDAmount,
        invoicePercentage,
        invoicePercentageTransportCompany,
        askFlagsAndSigns,
        eldFee,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        invoiceAttemptedPickup: true,
        driverAttemptedPickup: true,
        driverFlagsAndSignsAmount: true,
        invoiceFlagsAndSignsAmount: true,

        invoiceELDAmount: true,
        driverELDAmount: true,
        invoicePercentage: true,
        invoicePercentageTransportCompany: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="m-b-5">
            <div className="p-15 w-100">
              <Row className="m-0 p-8">
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.invoiceAttemptedPickup")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : (formik.errors.invoiceAttemptedPickup === undefined &&
                                  invoiceAttemptedPickup != null) ||
                                (invoiceAttemptedPickup.length >= 1 &&
                                  feeValidation.test(invoiceAttemptedPickup))
                              ? "borderGreen"
                              : formik.errors.invoiceAttemptedPickup !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        id="customer"
                        name="customer"
                        type="text"
                        maxLength={8}
                        value={invoiceAttemptedPickup}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setInvoiceAttemptedPickup(isNumber(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.driverAttemptedPickup")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : (formik.errors.driverAttemptedPickup === undefined &&
                                  driverAttemptedPickup != null) ||
                                (driverAttemptedPickup.length >= 1 &&
                                  feeValidation.test(driverAttemptedPickup))
                              ? "borderGreen"
                              : formik.errors.driverAttemptedPickup !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        id="name"
                        name="name"
                        type="text"
                        maxLength={8}
                        value={driverAttemptedPickup}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setDriverAttemptedPickup(isNumber(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.adjustAttemptedPickup")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name=" adjustAttemptedPickup"
                        value={adjustAttemptedPickup}
                        checked={adjustAttemptedPickup}
                        disabled={viewDetail}
                        onChange={(e) => setAdjustAttemptedPickup(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-4 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.askFlagsAndSigns")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="askFlagsAndSigns"
                        value={askFlagsAndSigns}
                        checked={askFlagsAndSigns}
                        disabled={viewDetail}
                        onChange={(e) => setAskFlagsAndSigns(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.invoiceFlagsAndSigns")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true || askFlagsAndSigns === false
                            ? ""
                            : formik.errors.invoiceFlagsAndSignsAmount === undefined &&
                                invoiceFlagsAndSignsAmount != null &&
                                invoiceFlagsAndSignsAmount.length >= 1
                              ? "borderGreen"
                              : formik.errors.invoiceFlagsAndSignsAmount !== undefined ||
                                  (invoiceFlagsAndSignsAmount === "" && driverFlagsAndSignsAmount === "")
                                ? "borderRed"
                                : ""
                        }`}
                        id="invoiceFlagsAndSignsAmount"
                        name="invoiceFlagsAndSignsAmount"
                        type="text"
                        value={invoiceFlagsAndSignsAmount}
                        maxLength={8}
                        disabled={viewDetail === true || askFlagsAndSigns === false}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setInvoiceFlagsAndSignsAmount(isNumber(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.driverFlagsAndSigns")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true || askFlagsAndSigns === false
                            ? ""
                            : formik.errors.driverFlagsAndSignsAmount === undefined &&
                                driverFlagsAndSignsAmount != null &&
                                driverFlagsAndSignsAmount.length >= 1
                              ? "borderGreen"
                              : formik.errors.driverFlagsAndSignsAmount !== undefined ||
                                  (invoiceFlagsAndSignsAmount === "" && driverFlagsAndSignsAmount === "")
                                ? "borderRed"
                                : ""
                        }`}
                        id="driverFlagsAndSignsAmount"
                        name="driverFlagsAndSignsAmount"
                        type="text"
                        value={driverFlagsAndSignsAmount}
                        maxLength={8}
                        disabled={viewDetail || askFlagsAndSigns === false}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setDriverFlagsAndSignsAmount(isNumber(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                   
                  <Form.Group className="mt-4 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.eldFee")}
                      </Form.Label>
                    </Col>
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="eldFee"
                        value={eldFee}
                        checked={eldFee}
                        disabled={viewDetail}
                        onChange={(e) => setEldFee(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.invoiceEldFee")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true || eldFee === false
                            ? ""
                            : formik.errors.invoiceELDAmount === undefined &&
                                invoiceELDAmount != null &&
                                invoiceELDAmount.length >= 1
                              ? "borderGreen"
                              : formik.errors.invoiceELDAmount !== undefined ||
                                  (invoiceELDAmount === "" && driverELDAmount === "")
                                ? "borderRed"
                                : ""
                        }`}
                        id="invoiceELDAmount"
                        name="invoiceELDAmountr"
                        type="text"
                        value={invoiceELDAmount}
                        maxLength={8}
                        disabled={viewDetail || eldFee === false}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setInvoiceELDAmount(isNumber(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.driverEldFee")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true || eldFee === false
                            ? ""
                            : formik.errors.driverELDAmount === undefined &&
                                driverELDAmount != null &&
                                driverELDAmount.length >= 1
                              ? "borderGreen"
                              : formik.errors.driverELDAmount !== undefined ||
                                  (invoiceELDAmount === "" && driverELDAmount === "")
                                ? "borderRed"
                                : ""
                        }`}
                        id="driverELDAmount"
                        name="driverELDAmount"
                        type="text"
                        value={driverELDAmount}
                        maxLength={8}
                        disabled={viewDetail || eldFee === false}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setDriverELDAmount(isNumber(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={6} md={6} xs={6} className="ps-lg-5">
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.invoicePercentage")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-0 w-40px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : formik.errors.invoicePercentage === undefined &&
                                invoicePercentage != null &&
                                invoicePercentage.length >= 1
                              ? "borderGreen"
                              : formik.errors.invoicePercentage !== undefined
                                ? "borderRed"
                                : "borderGreen"
                        }`}
                        id=" invoicePercentage"
                        name=" invoicePercentage"
                        type="text"
                        value={invoicePercentage}
                        maxLength={2}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setInvoicePercentage(isNumberBetween1And99(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.invoicePercentageTruckingCompany")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-0 w-40px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : formik.errors.invoicePercentageTransportCompany === undefined &&
                                invoicePercentageTransportCompany != null &&
                                invoicePercentageTransportCompany.length >= 1
                              ? "borderGreen"
                              : formik.errors.invoicePercentageTransportCompany !== undefined
                                ? "borderRed"
                                : "borderGreen"
                        }`}
                        id="customer"
                        name="customer"
                        type="text"
                        value={invoicePercentageTransportCompany}
                        maxLength={2}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setInvoicePercentageTransportCompany(isNumberBetween1And99(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-4 align-items  row  m-l-0 m-r-0">
                    <Col xs={2} md={2} sm={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.settings.tab.invoiceInstructions")}
                      </Form.Label>
                    </Col>

                    <Col sm={10} md={10} className="p-0">
                      <textarea
                        rows={10}
                        cols={20}
                        type="text"
                        className="customFormControl h-100 "
                        name="notes"
                        value={invoiceInstructions}
                        disabled={viewDetail}
                        onInput={(e) => setInvoiceInstructions(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InvoiceSettingsTab;
