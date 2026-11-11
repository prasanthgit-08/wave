import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setIsDefaultsTabValid, setSaveCompanyObject } from "../../../../../redux/CompanySlice";
import Input from "../../../../../components/common/input";

function Default() {
  const dispatch = useDispatch();
  const [invoicePercent, setInvoicePercent] = useState("");
  const [parsCode, setParsCode] = useState("");
  const [papsCode, setPapsCode] = useState("");
  const [eldFee, setEldFee] = useState("");
  const [eldDescription, setEldDescription] = useState("");
  const [creditcardCancelFee, setCreditcardCancelFee] = useState("");
  const [multiUnitCutoffLength, setMultiUnitCutoffLength] = useState("");
  const [priority, setPriority] = useState("");
  const [sisterRateAdjustment, setSisterRateAdjustment] = useState("");
  const [sisterFlatRateAdjustment, setSisterFlatRateAdjustment] = useState("");
  const [realWorldCompanyCode, setRealWorldCompanyCode] = useState("");
  const [passportCustomerCode, setpassportCustomerCode] = useState("");
  const [drugRandomPercentage, setDrugRandomPercentage] = useState("");
  const [cdldrugRandomPercentage, setCdldrugRandomPercentage] = useState("");
  const [alcoholRandomPercentage, setAlcoholRandomPercentage] = useState("");
  const [realWorldUser, setRealWorldUser] = useState("");
  const [realWorldGLAccount, setRealWorldGLAccount] = useState("");
  const [realWorldTaxCode, setRealWorldTaxCode] = useState("");
  const [driveawayInvoiceAPU, setDriveawayInvoiceAPU] = useState("");
  const [driveawayDriverAPU, setDriveawayDriverAPU] = useState("");
  const [towableInvoiceAPU, setTowableInvoiceAPU] = useState("");
  const [towableDriverAPU, setTowableDriverAPU] = useState("");

  const companyData = useSelector((state) => state.companyReducer.companyData);
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);

  useEffect(() => {
    setInvoicePercent(Math.floor(companyData ? companyData.invoicePercent * 100 || "" : ""));
    setParsCode(companyData ? companyData.parsCode || "" : "");
    setPapsCode(companyData ? companyData.papsCode || "" : "");
    setEldFee(companyData ? companyData.eldFee || "0" : "");
    setEldDescription(companyData ? companyData.eldDescription || "" : "");
    setCreditcardCancelFee(companyData ? companyData.creditcardCancelFee || "0" : "");
    setMultiUnitCutoffLength(companyData ? companyData.multiUnitCutoffLength || "0" : "");
    setPriority(companyData ? companyData.priority || "" : "");
    setSisterRateAdjustment(companyData ? companyData.sisterRateAdjustment || "0" : "");
    setSisterFlatRateAdjustment(companyData ? companyData.sisterFlatRateAdjustment || "0" : "");
    setRealWorldCompanyCode(companyData ? companyData.realWorldCompanyCode?.trim() || "" : "");
    setpassportCustomerCode(companyData ? companyData.realWorldCustomerCode?.trim() || "" : "");
    setDrugRandomPercentage(Math.floor(companyData ? companyData.drugRandomPercentage * 100 || "" : ""));
    setCdldrugRandomPercentage(
      Math.floor(companyData ? companyData.cdldrugRandomPercentage * 100 || "" : "")
    );
    setAlcoholRandomPercentage(
      Math.floor(companyData ? companyData.alcoholRandomPercentage * 100 || "" : "")
    );
    setRealWorldUser(companyData ? companyData.realWorldUser?.trim() || "" : "");
    setRealWorldGLAccount(companyData ? companyData.realWorldGLAccount?.trim() || "" : "");
    setRealWorldTaxCode(companyData ? companyData.realWorldTaxCode?.trim() || "" : "");
    setDriveawayInvoiceAPU(companyData ? companyData.driveawayInvoiceAPU || "0" : "");
    setDriveawayDriverAPU(companyData ? companyData.driveawayDriverAPU || "0" : "");
    setTowableInvoiceAPU(companyData ? companyData.towableInvoiceAPU || "0" : "");
    setTowableDriverAPU(companyData ? companyData.towableDriverAPU || "0" : "");
  }, [companyData, viewDetail]);

  useEffect(() => {
    dispatch(
      setSaveCompanyObject({
        invoicePercent: invoicePercent / 100,
        parsCode: parsCode,
        papsCode: papsCode,
        eldFee: eldFee,
        eldDescription: eldDescription,
        creditcardCancelFee: creditcardCancelFee,
        multiUnitCutoffLength: multiUnitCutoffLength,
        priority: priority,
        sisterRateAdjustment: sisterRateAdjustment ? sisterRateAdjustment : 0,
        sisterFlatRateAdjustment: sisterFlatRateAdjustment ? sisterFlatRateAdjustment : 0,
        realWorldCompanyCode: realWorldCompanyCode,
        realWorldCustomerCode: passportCustomerCode,
        drugRandomPercentage: drugRandomPercentage / 100,
        cdldrugRandomPercentage: cdldrugRandomPercentage / 100,
        alcoholRandomPercentage: alcoholRandomPercentage / 100,
        realWorldUser: realWorldUser,
        realWorldGLAccount: realWorldGLAccount,
        realWorldTaxCode: realWorldTaxCode,
        driveawayInvoiceAPU: driveawayInvoiceAPU,
        driveawayDriverAPU: driveawayDriverAPU,
        towableInvoiceAPU: towableInvoiceAPU,
        towableDriverAPU: towableDriverAPU,
      })
    );
  }, [
    invoicePercent,
    parsCode,
    papsCode,
    eldFee,
    eldDescription,
    creditcardCancelFee,
    multiUnitCutoffLength,
    priority,
    sisterRateAdjustment,
    sisterFlatRateAdjustment,
    realWorldCompanyCode,
    passportCustomerCode,
    drugRandomPercentage,
    cdldrugRandomPercentage,
    alcoholRandomPercentage,
    realWorldUser,
    realWorldGLAccount,
    realWorldTaxCode,
    driveawayInvoiceAPU,
    driveawayDriverAPU,
    towableInvoiceAPU,
    towableDriverAPU,
  ]);

  //  for save validation of defaults tab
  useEffect(() => {
    if (
      parseInt(invoicePercent) > 99 ||
      parseInt(invoicePercent) <= 0 ||
      !invoicePercent ||
      parseInt(parsCode.length) < 4 ||
      !parsCode ||
      parseInt(papsCode.length) < 4 ||
      !papsCode ||
      parseFloat(eldFee) < 0.0 ||
      eldFee === "." ||
      /^\d*\.$/.test(eldFee) ||
      (parseFloat(eldFee) > 0.0 && eldDescription === "") ||
      parseFloat(creditcardCancelFee) < 0.0 ||
      creditcardCancelFee === "." ||
      /^\d*\.$/.test(creditcardCancelFee) ||
      parseFloat(driveawayInvoiceAPU) < 0.0 ||
      driveawayInvoiceAPU === "." ||
      /^\d*\.$/.test(driveawayInvoiceAPU) ||
      parseFloat(driveawayDriverAPU) < 0.0 ||
      driveawayDriverAPU === "." ||
      /^\d*\.$/.test(driveawayDriverAPU) ||
      parseFloat(towableInvoiceAPU) < 0.0 ||
      towableInvoiceAPU === "." ||
      /^\d*\.$/.test(towableInvoiceAPU) ||
      parseFloat(towableDriverAPU) < 0.0 ||
      towableDriverAPU === "." ||
      /^\d*\.$/.test(towableDriverAPU) ||
      parseInt(multiUnitCutoffLength) > 32767 ||
      parseInt(multiUnitCutoffLength) < 0 ||
      priority === "" ||
      priority < 1 ||
      priority > 9 ||
      parseFloat(sisterRateAdjustment) > 0.0 ||
      sisterRateAdjustment === "." ||
      sisterRateAdjustment === "-" ||
      /^(-?\d*\.)$/.test(sisterRateAdjustment) ||
      parseFloat(sisterFlatRateAdjustment) > 0.0 ||
      sisterFlatRateAdjustment === "." ||
      sisterFlatRateAdjustment === "-" ||
      /^(-?\d*\.)$/.test(sisterFlatRateAdjustment) ||
      !realWorldCompanyCode ||
      realWorldCompanyCode.length < 2 ||
      !passportCustomerCode ||
      passportCustomerCode.length < 2 ||
      !realWorldUser ||
      realWorldUser.length < 3 ||
      !realWorldGLAccount ||
      realWorldGLAccount.length < 8 ||
      !realWorldTaxCode ||
      realWorldTaxCode.length < 3 ||
      parseInt(drugRandomPercentage) > 99 ||
      parseInt(drugRandomPercentage) <= 0 ||
      !drugRandomPercentage ||
      parseInt(cdldrugRandomPercentage) > 99 ||
      parseInt(cdldrugRandomPercentage) <= 0 ||
      !cdldrugRandomPercentage ||
      parseInt(alcoholRandomPercentage) > 99 ||
      parseInt(alcoholRandomPercentage) <= 0 ||
      !alcoholRandomPercentage
    ) {
      dispatch(setIsDefaultsTabValid(false));
    } else {
      dispatch(setIsDefaultsTabValid(true));
    }
  }, [
    invoicePercent,
    parsCode,
    papsCode,
    eldFee,
    eldDescription,
    creditcardCancelFee,
    multiUnitCutoffLength,
    priority,
    sisterRateAdjustment,
    sisterFlatRateAdjustment,
    realWorldCompanyCode,
    passportCustomerCode,
    realWorldUser,
    realWorldGLAccount,
    realWorldTaxCode,
    drugRandomPercentage,
    cdldrugRandomPercentage,
    alcoholRandomPercentage,
    driveawayInvoiceAPU,
    driveawayDriverAPU,
    towableInvoiceAPU,
    towableDriverAPU,
  ]);

  const handlePassportValidation = (e) => {
    const input = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .substring(0, 10);
    setpassportCustomerCode(input);
  };

  return (
    <div className="p-2">
      <div className="d-flex">
        <Col xs={6}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                invoice percentage
              </Form.Label>
            </Col>

            <div xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(invoicePercent) > 99 || parseInt(invoicePercent) <= 0 || !invoicePercent
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="invoicePercent"
                name="invoicePercent"
                type="text"
                maxLength={2}
                value={invoicePercent}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setInvoicePercent(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                dispatch priority
              </Form.Label>
            </Col>

            <div xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? priority === "" || priority < 1 || priority > 9
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="priority"
                name="priority"
                type="number"
                maxLength={1}
                min={1}
                max={9}
                value={priority}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onBeforeInput={(e) => {
                  if (
                    e.data === "+" ||
                    e.data === "-" ||
                    e.data === "." ||
                    e.data === "e" ||
                    e.data === "E" ||
                    e.data === "0"
                  )
                    e.preventDefault();
                }}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue.match(/^\d{0,1}?$/)) {
                    setPriority(e.target.value);
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                company PARS code
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(parsCode.length) < 4 || !parsCode
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="parsCode"
                name="parsCode"
                type="text"
                maxLength={4}
                value={parsCode}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setParsCode(e.target.value.replace(/[^a-zA-Z\d]/g, "").toUpperCase());
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                company PAPS code
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(papsCode.length) < 4 || !papsCode
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="papsCode"
                name="papsCode"
                type="text"
                maxLength={4}
                value={papsCode}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setPapsCode(e.target.value.replace(/[^a-zA-Z\d]/g, "").toUpperCase());
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                invoice ELD fee
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(eldFee) < 0.0 || eldFee === "." || /^\d*\.$/.test(eldFee)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="eldFee"
                name="eldFee"
                type="text"
                maxLength={8}
                value={eldFee}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setEldFee(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                invoice ELD Description
              </Form.Label>
            </Col>

            <div className="p-0 col-4">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(eldFee) > 0.0
                      ? eldDescription === ""
                        ? "borderRed"
                        : "borderGreen"
                      : ""
                    : ""
                }`}
                id="eldDescription"
                name="eldDescription"
                type="text"
                maxLength={50}
                value={eldDescription}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setEldDescription(e.target.value.replace(/[ .]/g, ""));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                credit card cancel fee
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(creditcardCancelFee) < 0.0 ||
                      creditcardCancelFee === "." ||
                      /^\d*\.$/.test(creditcardCancelFee)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="creditcardCancelFee"
                name="creditcardCancelFee"
                type="text"
                maxLength={8}
                value={creditcardCancelFee}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setCreditcardCancelFee(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                multi unit cutoff length
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(multiUnitCutoffLength) > 32767 || parseInt(multiUnitCutoffLength) < 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="multiUnitCutoffLength"
                name="multiUnitCutoffLength"
                type="text"
                maxLength={5}
                value={multiUnitCutoffLength}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setMultiUnitCutoffLength(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Invoice Motorized APU Amount
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(driveawayInvoiceAPU) < 0.0 ||
                      driveawayInvoiceAPU === "." ||
                      /^\d*\.$/.test(driveawayInvoiceAPU)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="driveawayInvoiceAPU"
                name="driveawayInvoiceAPU"
                type="text"
                maxLength={8}
                value={driveawayInvoiceAPU}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriveawayInvoiceAPU(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Driver Motorized APU Amount
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(driveawayDriverAPU) < 0.0 ||
                      driveawayDriverAPU === "." ||
                      /^\d*\.$/.test(driveawayDriverAPU)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="driveawayDriverAPU"
                name="driveawayDriverAPU"
                type="text"
                maxLength={8}
                value={driveawayDriverAPU}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriveawayDriverAPU(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Invoice Towable APU Amount
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(towableInvoiceAPU) < 0.0 ||
                      towableInvoiceAPU === "." ||
                      /^\d*\.$/.test(towableInvoiceAPU)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="towableInvoiceAPU"
                name="towableInvoiceAPU"
                type="text"
                maxLength={8}
                value={towableInvoiceAPU}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setTowableInvoiceAPU(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Driver Towable APU Amount
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(towableDriverAPU) < 0.0 ||
                      towableDriverAPU === "." ||
                      /^\d*\.$/.test(towableDriverAPU)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="towableDriverAPU"
                name="towableDriverAPU"
                type="text"
                maxLength={8}
                value={towableDriverAPU}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setTowableDriverAPU(e.target.value);
                }}
              />
            </div>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                sister rate adjustment
              </Form.Label>
            </Col>

            <div className="p-0 col-1 w-68px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(sisterRateAdjustment) > 0.0 ||
                      sisterRateAdjustment === "." ||
                      sisterRateAdjustment === "-" ||
                      /^(-?\d*\.)$/.test(sisterRateAdjustment)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="sisterRateAdjustment"
                name="sisterRateAdjustment"
                type="text"
                maxLength={8}
                value={sisterRateAdjustment}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  e.target.value.match(/^(-)?\d{0,2}(\.\d{0,4})?$/) &&
                    setSisterRateAdjustment(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                sister flatRate adjustment
              </Form.Label>
            </Col>

            <div className="p-0 col-1 w-68px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(sisterFlatRateAdjustment) > 0.0 ||
                      sisterFlatRateAdjustment === "." ||
                      sisterFlatRateAdjustment === "-" ||
                      /^(-?\d*\.)$/.test(sisterFlatRateAdjustment)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="sisterFlatRateAdjustment"
                name="sisterFlatRateAdjustment"
                type="text"
                maxLength={9}
                value={sisterFlatRateAdjustment}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  e.target.value.match(/^(-)?\d{0,5}(\.\d{0,2})?$/) &&
                    setSisterFlatRateAdjustment(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center invisible row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                invoice ELD fee
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl `}
                id="name"
                name="name"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                random drug test percentage
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(drugRandomPercentage) > 99 ||
                      parseInt(drugRandomPercentage) <= 0 ||
                      !drugRandomPercentage
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="drugRandomPercentage"
                name="drugRandomPercentage"
                type="text"
                maxLength={2}
                value={drugRandomPercentage}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setDrugRandomPercentage(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                CDL random drug test percentage
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(cdldrugRandomPercentage) > 99 ||
                      parseInt(cdldrugRandomPercentage) <= 0 ||
                      !cdldrugRandomPercentage
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="cdldrugRandomPercentage"
                name="cdldrugRandomPercentage"
                type="text"
                maxLength={2}
                value={cdldrugRandomPercentage}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setCdldrugRandomPercentage(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                random alcohol test percentage
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(alcoholRandomPercentage) > 99 ||
                      parseInt(alcoholRandomPercentage) <= 0 ||
                      !alcoholRandomPercentage
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="alcoholRandomPercentage"
                name="alcoholRandomPercentage"
                type="text"
                maxLength={2}
                value={alcoholRandomPercentage}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setAlcoholRandomPercentage(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row invisible  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                invoice percentage
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl `}
                id="name"
                name="name"
                type="text"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Passport Company Code
              </Form.Label>
            </Col>

            <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
              <input
                className={`${"customFormControl"} ${
                  viewDetail
                    ? ""
                    : realWorldCompanyCode !== "" && realWorldCompanyCode.length === 2
                      ? "borderGreen"
                      : "borderRed"
                }`}
                value={realWorldCompanyCode}
                id="realWorldCompanyCode"
                name="realWorldCompanyCode"
                type="text"
                maxLength={2}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const input = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .substring(0, 2);
                  setRealWorldCompanyCode(input);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Passport Customer Code
              </Form.Label>
            </Col>

            <Col xs={2} className="ps-0 pe-3">
              <input
                className={`${"customFormControl"} ${
                  viewDetail
                    ? ""
                    : passportCustomerCode !== "" && passportCustomerCode.length >= 2
                      ? "borderGreen"
                      : "borderRed"
                }`}
                value={passportCustomerCode}
                id="passportCustomerCode"
                name="passportCustomerCode"
                type="text"
                maxLength={10}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const input = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .substring(0, 10);
                  setpassportCustomerCode(input);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Passport User Code
              </Form.Label>
            </Col>

            <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
              <input
                className={`${"customFormControl"} ${
                  viewDetail
                    ? ""
                    : realWorldUser !== "" && realWorldUser.length === 3
                      ? "borderGreen"
                      : "borderRed"
                }`}
                value={realWorldUser}
                id="realWorldUser"
                name="realWorldUser"
                type="text"
                maxLength={3}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const input = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z]/g, "")
                    .substring(0, 10);
                  setRealWorldUser(input);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Passport GL Account
              </Form.Label>
            </Col>

            <Col xs={2} className="ps-0 pe-3">
              <input
                className={`${"customFormControl"} ${
                  viewDetail
                    ? ""
                    : realWorldGLAccount !== "" && realWorldGLAccount.length === 8
                      ? "borderGreen"
                      : "borderRed"
                }`}
                value={realWorldGLAccount}
                id="realWorldGLAccount"
                name="realWorldGLAccount"
                type="text"
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const input = e.target.value.replace(/[^0-9]/g, "").substring(0, 8);
                  setRealWorldGLAccount(input);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Passport Tax Code
              </Form.Label>
            </Col>

            <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
              <input
                className={`${"customFormControl"} ${
                  viewDetail
                    ? ""
                    : realWorldTaxCode !== "" && realWorldTaxCode.length === 3
                      ? "borderGreen"
                      : "borderRed"
                }`}
                value={realWorldTaxCode}
                id="realWorldTaxCode"
                name="realWorldTaxCode"
                type="text"
                maxLength={3}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const input = e.target.value
                    .toUpperCase()
                    .replace(/[^0-9]/g, "")
                    .substring(0, 10);
                  setRealWorldTaxCode(input);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
}

export default Default;
