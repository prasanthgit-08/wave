import { t, use } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import CustomerService from "../../../../../../services/CustomerService";
import {
  setCustomerFormData,
  setIsInvoicePaperworkTabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import Input from "../../../../../../components/common/input";

function PaperworkTab() {
  const dispatch = useDispatch();

  const [mailInvoice, setMailInvoice] = useState(false);
  const [printMailingLabel, setPrintMailingLabel] = useState(false);
  const [allEmailInvoice, setAllEmailInvoice] = useState([]);
  const [emailInvoice, setEmailInvoice] = useState("");
  const [batchEmailInvoices, setBatchEmailInvoices] = useState(false);
  const [noInvoiceDetail, setNoInvoiceDetail] = useState(false);
  const [requireOriginalDocuments, setRequireOriginalDocuments] = useState(false);
  const [printAndRescanDocuments, setPrintAndRescanDocuments] = useState(false);

  const [documentAsTIFF, setDocumentAsTIFF] = useState(false);
  const [emailDocuments, setEmailDocuments] = useState(false);
  const [singleEmailAttachment, setSingleEmailAttachment] = useState(false);
  const [faxInvoice, setFaxInvoice] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [scanDAFSeperate, setScanDAFSeperate] = useState(false);
  const [emailDAFSeperate, setEmailDAFSeperate] = useState(false);
  const [batchEmailDAF, setBatchEmailDAF] = useState(false);
  const [faxDaf, setFaxDaf] = useState(false);
  const [dafFaxNumber, setDafFaxNumber] = useState("");
  const [scanBOLSeperate, setScanBOLSeperate] = useState(false);
  const [emailBOLSeperate, setEmailBOLSeperate] = useState(false);
  const [batchEmailBOL, setBatchEmailBOL] = useState(false);
  const [faxBOL, setFaxBOL] = useState(false);
  const [bolFaxNumber, setBolFaxNumber] = useState("");

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  const getEmailInvoice = () => {
    CustomerService.getEmailInvoice()
      .then((response) => {
        const data = response?.data;
        setAllEmailInvoice(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (faxDaf === false) {
      setDafFaxNumber("");
    }
  }, [faxDaf, bolFaxNumber]);

  useEffect(() => {
    if (faxBOL === false) {
      setBolFaxNumber("");
    }
  }, [faxBOL, dafFaxNumber]);

  useEffect(() => {
    getEmailInvoice();
  }, []);

  useEffect(() => {
    if (!mailInvoice) {
      setPrintMailingLabel(false);
    }
  }, [mailInvoice]);

  useEffect(() => {
    if (editCustomerData === null) {
      setMailInvoice(false);
      setEmailInvoice("");
      setBatchEmailInvoices(false);
      setNoInvoiceDetail(false);
      setPrintMailingLabel(false);
      setRequireOriginalDocuments(false);
      setPrintAndRescanDocuments(false);
      setDocumentAsTIFF(false);
      setEmailDocuments(false);
      setSingleEmailAttachment(false);
      setFaxInvoice("");
      setFaxNumber("");
      setScanDAFSeperate(false);
      setEmailDAFSeperate(false);
      setBatchEmailDAF(false);
      setFaxDaf(false);
      setDafFaxNumber("");
      setScanBOLSeperate(false);
      setEmailBOLSeperate(false);
      setBatchEmailBOL(false);
      setFaxBOL(false);
      setBolFaxNumber("");
    }
    if (editCustomerData !== null) {
      setMailInvoice(editCustomerData.mailInvoice != null ? editCustomerData.mailInvoice : "");
      setPrintMailingLabel(
        editCustomerData.printInvoiceLabel != null ? editCustomerData.printInvoiceLabel : false
      );
      setEmailInvoice(editCustomerData.emailInvoice != null ? editCustomerData.emailInvoice?.trim() : "");
      setBatchEmailInvoices(
        editCustomerData.batchEmailInvoice != null ? editCustomerData.batchEmailInvoice : ""
      );
      setNoInvoiceDetail(editCustomerData.noInvoiceDetail != null ? editCustomerData.noInvoiceDetail : "");
      setRequireOriginalDocuments(
        editCustomerData.requireOriginalDocuments != null ? editCustomerData.requireOriginalDocuments : ""
      );
      setPrintAndRescanDocuments(
        editCustomerData.printAndRescanDocuments != null ? editCustomerData.printAndRescanDocuments : ""
      );
      setDocumentAsTIFF(
        editCustomerData.emailInvoiceAsTIFF != null ? editCustomerData.emailInvoiceAsTIFF : ""
      );
      setEmailDocuments(
        editCustomerData.emailPaperworkWithInvoice != null ? editCustomerData.emailPaperworkWithInvoice : ""
      );
      setSingleEmailAttachment(
        editCustomerData.singleInvoiceFile != null ? editCustomerData.singleInvoiceFile : ""
      );

      setFaxInvoice(editCustomerData.faxInvoice != null ? editCustomerData.faxInvoice?.trim() : "");
      setFaxNumber(
        editCustomerData.invoiceFAXNumber != null ? formatPhoneNumber(editCustomerData.invoiceFAXNumber) : ""
      );
      setScanDAFSeperate(
        editCustomerData.invoiceScanDAFSeperate != null ? editCustomerData.invoiceScanDAFSeperate : ""
      );
      setEmailDAFSeperate(
        editCustomerData.invoiceEmailDAFSeperate != null ? editCustomerData.invoiceEmailDAFSeperate : ""
      );
      setBatchEmailDAF(editCustomerData.batchEmailDAF != null ? editCustomerData.batchEmailDAF : "");
      setFaxDaf(editCustomerData.invoiceFAXDAF != null ? editCustomerData.invoiceFAXDAF : "");
      setDafFaxNumber(
        editCustomerData.dafFAXPhoneNumber != null
          ? formatPhoneNumber(editCustomerData.dafFAXPhoneNumber)
          : ""
      );
      setScanBOLSeperate(
        editCustomerData.invoiceScanBOLSeperate != null ? editCustomerData.invoiceScanBOLSeperate : ""
      );
      setEmailBOLSeperate(
        editCustomerData.invoiceEmailBOLSeperate != null ? editCustomerData.invoiceEmailBOLSeperate : ""
      );
      setBatchEmailBOL(editCustomerData.batchEmailBOL != null ? editCustomerData.batchEmailBOL : "");
      setFaxBOL(editCustomerData.invoiceFAXBOL != null ? editCustomerData.invoiceFAXBOL : "");
      setBolFaxNumber(
        editCustomerData.bolFAXPhoneNumber != null
          ? formatPhoneNumber(editCustomerData.bolFAXPhoneNumber)
          : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    paperworkFormData();
  }, [
    mailInvoice,
    emailInvoice,
    batchEmailInvoices,
    noInvoiceDetail,
    requireOriginalDocuments,
    printAndRescanDocuments,
    documentAsTIFF,
    emailDocuments,
    singleEmailAttachment,
    faxInvoice,
    faxNumber,
    scanDAFSeperate,
    emailDAFSeperate,
    batchEmailDAF,
    faxDaf,
    dafFaxNumber,
    scanBOLSeperate,
    emailBOLSeperate,
    batchEmailBOL,
    faxBOL,
    bolFaxNumber,
    printMailingLabel,
  ]);

  const paperworkFormData = () => {
    dispatch(
      setCustomerFormData({
        mailInvoice: mailInvoice,
        printInvoiceLabel: printMailingLabel,
        emailInvoice: emailInvoice?.trim(),
        batchEmailInvoice: batchEmailInvoices,
        noInvoiceDetail: noInvoiceDetail,
        requireOriginalDocuments: requireOriginalDocuments,
        printAndRescanDocuments: printAndRescanDocuments,
        emailInvoiceAsTIFF: documentAsTIFF,
        emailPaperworkWithInvoice: emailDocuments,
        singleInvoiceFile: singleEmailAttachment,
        faxInvoice: faxInvoice?.trim(),
        invoiceFAXNumber: faxNumber.replace(/\s+/g, ""),
        invoiceScanDAFSeperate: scanDAFSeperate,
        invoiceEmailDAFSeperate: emailDAFSeperate,
        batchEmailDAF: batchEmailDAF,
        invoiceFAXDAF: faxDaf,
        dafFAXPhoneNumber: dafFaxNumber.replace(/\s+/g, ""),
        invoiceScanBOLSeperate: scanBOLSeperate,
        invoiceEmailBOLSeperate: emailBOLSeperate,
        batchEmailBOL: batchEmailBOL,
        invoiceFAXBOL: faxBOL,
        bolFAXPhoneNumber: bolFaxNumber.replace(/\s+/g, ""),
      })
    );
  };

  useEffect(() => {
    if (!scanBOLSeperate) {
      setBatchEmailBOL(false);
      setEmailBOLSeperate(false);
    }
  }, [scanBOLSeperate]);
  useEffect(() => {
    if (!emailInvoice) {
      dispatch(setIsInvoicePaperworkTabValid(false));
    } else if (!faxInvoice) {
      dispatch(setIsInvoicePaperworkTabValid(false));
    } else if ((faxInvoice !== "N" || faxNumber) && !faxNumber?.match(phoneRegex)) {
      dispatch(setIsInvoicePaperworkTabValid(false));
    } else if ((faxDaf || dafFaxNumber) && !dafFaxNumber?.match(phoneRegex)) {
      dispatch(setIsInvoicePaperworkTabValid(false));
    } else if ((faxBOL || bolFaxNumber) && !bolFaxNumber?.match(phoneRegex)) {
      dispatch(setIsInvoicePaperworkTabValid(false));
    } else {
      dispatch(setIsInvoicePaperworkTabValid(true));
    }
  }, [emailInvoice, faxInvoice, faxNumber, faxDaf, dafFaxNumber, faxBOL, bolFaxNumber]);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    emailInvoice: yup.string().required(),
    faxInvoice: yup.string().required(),
    faxNumber: yup.string().when("faxInvoice", {
      is: (faxInvoice) => {
        if (faxInvoice != "N") {
          return true;
        } else {
          return false;
        }
      },
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
    faxDaf: yup.boolean(),
    dafFaxNumber: yup.string().when("faxDaf", {
      is: true,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
    faxBOL: yup.boolean(),
    bolFaxNumber: yup.string().when("faxBOL", {
      is: true,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
  });

  const faxNumberFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFaxNumber(formattedPhoneNumber);
  };

  const dafFaxNumberFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDafFaxNumber(formattedPhoneNumber);
  };

  const bolFaxNumberFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setBolFaxNumber(formattedPhoneNumber);
  };

  return (
    <Formik
      initialValues={{
        emailInvoice,
        faxNumber,
        dafFaxNumber,
        bolFaxNumber,
        faxInvoice,
        faxDaf,
        faxBOL,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        emailInvoice: true,
        faxNumber: true,
        dafFaxNumber: true,
        bolFaxNumber: true,
        faxInvoice: true,
        faxDaf: false,
        faxBOL: false,
      }}
    >
      {(formik) => (
        <div className="p-2 w-100">
          <Row className="m-0 p-0">
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              {/*Mail Invoice*/}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.mail.invoice.field")}
                  </Form.Label>
                </Col>
                <Col xs={5} md={3} sm={3} lg={3} xl={3} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="mailInvoice"
                    value={mailInvoice}
                    checked={mailInvoice}
                    disabled={viewDetail}
                    onChange={(e) => setMailInvoice(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Print Mailing Label*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Print Mailing Label</Form.Label>
                </Col>
                <Col xs={5} md={3} sm={3} lg={3} xl={3} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="printMailingLabel"
                    value={printMailingLabel}
                    checked={printMailingLabel}
                    disabled={viewDetail || !mailInvoice}
                    onChange={(e) => setPrintMailingLabel(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Email Invoice*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.email.invoice.field")}
                  </Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <Form.Select
                    className="customFormControl"
                    name="emailInvoice"
                    disabled={viewDetail}
                    value={emailInvoice}
                    onChange={(e) => {
                      setEmailInvoice(e.target.value);
                    }}
                    style={{
                      border:
                        viewDetail === true
                          ? "black 1px solid"
                          : formik.errors.emailInvoice === undefined &&
                              emailInvoice?.length > 0 &&
                              emailInvoice != null
                            ? "green 2px solid"
                            : formik.errors.emailInvoice !== undefined || emailInvoice === ""
                              ? "red 2px solid"
                              : "green 2px solid",
                    }}
                  >
                    <option value="">---Select---</option>
                    {allEmailInvoice?.map((item) => (
                      <option key={item.emailInvoiceID} value={item.emailInvoiceID}>
                        {item.emailInvoiceName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/*Batch Mail Invoices*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Batch Email Invoices"}</Form.Label>
                </Col>
                <Col xs={5} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="batchEmailInvoices"
                    value={batchEmailInvoices}
                    checked={batchEmailInvoices}
                    disabled={viewDetail}
                    onChange={(e) => setBatchEmailInvoices(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*No Invoice Detail*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.no.invoice.detail.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="noInvoiceDetail"
                    value={noInvoiceDetail}
                    checked={noInvoiceDetail}
                    disabled={viewDetail}
                    onChange={(e) => setNoInvoiceDetail(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Require Original Documents*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.require.original.documents.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requireOriginalDocuments"
                    value={requireOriginalDocuments}
                    checked={requireOriginalDocuments}
                    disabled={viewDetail}
                    onChange={(e) => setRequireOriginalDocuments(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Print & Rescan Documents */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Print & Rescan Documents</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="printAndRescanDocuments"
                    value={printAndRescanDocuments}
                    checked={printAndRescanDocuments}
                    disabled={viewDetail}
                    onChange={(e) => setPrintAndRescanDocuments(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Document as TIFF*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.document.as.tiff.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="documentAsTIFF"
                    value={documentAsTIFF}
                    checked={documentAsTIFF}
                    disabled={viewDetail}
                    onChange={(e) => setDocumentAsTIFF(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Email Documents*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.email.documents.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="emailDocuments"
                    value={emailDocuments}
                    checked={emailDocuments}
                    disabled={viewDetail}
                    onChange={(e) => setEmailDocuments(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Single Email Attachment*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.single.email.attachment.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={4} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="singleEmailAttachment"
                    value={singleEmailAttachment}
                    checked={singleEmailAttachment}
                    disabled={viewDetail}
                    onChange={(e) => setSingleEmailAttachment(e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col sm={6} md={6} xs={6}>
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.fax.invoice.field")}
                  </Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <Form.Select
                    className="customFormControl"
                    name="faxInvoice"
                    value={faxInvoice}
                    disabled={viewDetail}
                    onChange={(e) => {
                      setFaxInvoice(e.target.value);
                    }}
                    style={{
                      border:
                        viewDetail === true
                          ? "black 1px solid"
                          : formik.errors.faxInvoice === undefined &&
                              faxInvoice != null &&
                              faxInvoice?.length > 0
                            ? "green 2px solid"
                            : formik.errors.faxInvoice !== undefined || faxInvoice === ""
                              ? "red 2px solid"
                              : "green 2px solid",
                    }}
                  >
                    <option value="">---Select---</option>

                    {allEmailInvoice?.map((item) => (
                      <option key={item.emailInvoiceID} value={item.emailInvoiceID}>
                        {item.emailInvoiceName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/*FAX Number*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.fax.number.field")}
                  </Form.Label>
                </Col>
                <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "110px" }}>
                  <Input
                    className="customFormControl"
                    name="faxNumber"
                    value={faxNumber}
                    maxLength={14}
                    disabled={viewDetail}
                    onChange={(e) => {
                      formik.handleChange(e);
                      faxNumberFormatHandler(e);
                    }}
                    onBlur={formik.handleBlur}
                    style={{
                      border:
                        viewDetail === true ||
                        (faxInvoice === "N" && (faxNumber?.match(phoneRegex) || !faxNumber))
                          ? "black 1px solid"
                          : formik.errors.faxNumber === undefined &&
                              faxNumber != null &&
                              faxNumber?.length > 0
                            ? "green 2px solid"
                            : (!faxNumber?.match(phoneRegex) && faxNumber !== "") || faxInvoice
                              ? "red 2px solid"
                              : "",
                    }}
                  />
                </Col>
              </Form.Group>
              {/*FAX Invoice*/}

              {/*Scan DAF Seperate*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.scan.daf.seperate.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="scanDAFSeperate"
                    value={scanDAFSeperate}
                    checked={scanDAFSeperate}
                    disabled={viewDetail}
                    onChange={(e) => setScanDAFSeperate(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Email DAF Seperate*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.email.daf.seperate.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="emailDAFSeperate"
                    value={emailDAFSeperate}
                    checked={emailDAFSeperate}
                    disabled={viewDetail}
                    onChange={(e) => setEmailDAFSeperate(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Batch Email DAF*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.batch.email.daf.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="batchEmailDAF"
                    value={batchEmailDAF}
                    checked={batchEmailDAF}
                    disabled={viewDetail}
                    onChange={(e) => setBatchEmailDAF(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*FAX DAF*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.fax.daf.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="faxDaf"
                    value={faxDaf}
                    checked={faxDaf}
                    disabled={viewDetail}
                    onChange={(e) => setFaxDaf(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* DAF FAX Number*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.daf.fax.number.field")}
                  </Form.Label>
                </Col>
                <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "110px" }}>
                  <Input
                    className="customFormControl"
                    name="dafFaxNumber"
                    value={dafFaxNumber}
                    maxLength={14}
                    disabled={viewDetail}
                    onChange={(e) => {
                      formik.handleChange(e);
                      dafFaxNumberFormatHandler(e);
                    }}
                    onBlur={formik.handleBlur}
                    style={{
                      border:
                        viewDetail === true || (dafFaxNumber === "" && (!faxDaf || viewDetail))
                          ? "black 1px solid"
                          : formik.errors.dafFaxNumber === undefined &&
                              dafFaxNumber != null &&
                              dafFaxNumber?.length > 0
                            ? faxDaf
                              ? "green 2px solid"
                              : "black 1px solid"
                            : !phoneRegex?.test(dafFaxNumber) || (faxDaf && !phoneRegex?.test(dafFaxNumber))
                              ? "red 2px solid"
                              : "",
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Scan BOL Seperate*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.scan.bol.seperate.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="scanBOLSeperate"
                    value={scanBOLSeperate}
                    checked={scanBOLSeperate}
                    disabled={viewDetail}
                    onChange={(e) => setScanBOLSeperate(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Email BOL Seperate*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.email.bol.seperate.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="emailBOLSeperate"
                    value={emailBOLSeperate}
                    checked={emailBOLSeperate}
                    disabled={viewDetail || !scanBOLSeperate}
                    onChange={(e) => setEmailBOLSeperate(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Batch Email BOL*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.batch.email.bol.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="batchEmailBOL"
                    value={batchEmailBOL}
                    checked={batchEmailBOL}
                    disabled={viewDetail || !scanBOLSeperate}
                    onChange={(e) => setBatchEmailBOL(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*FAX BOL*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.fax.bol.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="faxBOL"
                    value={faxBOL}
                    checked={faxBOL}
                    disabled={viewDetail}
                    onChange={(e) => setFaxBOL(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* BOL FAX Number*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.paperwork.bol.fax.number.field")}
                  </Form.Label>
                </Col>
                <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "110px" }}>
                  <Input
                    className="customFormControl"
                    name="bolFaxNumber"
                    value={bolFaxNumber}
                    maxLength={14}
                    disabled={viewDetail || !faxBOL}
                    onChange={(e) => {
                      formik.handleChange(e);
                      bolFaxNumberFormatHandler(e);
                    }}
                    onBlur={formik.handleBlur}
                    style={{
                      border:
                        viewDetail === true
                          ? "black 1px solid"
                          : formik.errors.bolFaxNumber === undefined &&
                              bolFaxNumber != null &&
                              bolFaxNumber?.length > 0
                            ? "green 2px solid"
                            : formik.errors.bolFaxNumber !== undefined
                              ? "red 2px solid"
                              : "",
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </div>
      )}
    </Formik>
  );
}

export default PaperworkTab;
