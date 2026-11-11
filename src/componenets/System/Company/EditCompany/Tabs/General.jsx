import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import CompanyService from "../../../../../services/CompanyService";
import PrinterLookup from "../../../../LookupScreens/Printer/PrinterLookup";
import * as yup from "yup";
import {
  setAllDriversPayTaxable,
  setIsGeneralTabValid,
  setReimbursementPrinterId,
  setReimbursementPrinterName,
  setSaveCompanyObject,
} from "../../../../../redux/CompanySlice";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import Input from "../../../../../components/common/input";

function General() {
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const dispatch = useDispatch();
  const [companyPK, setCompanyPK] = useState(null);
  const [canadian, setCanadian] = useState(false);
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [ccipAddress, setCcipAddress] = useState("");
  const [ccLoginUser, setCcLoginUser] = useState("");
  const [ccPasswords, setccPasswords] = useState("");

  const [emailServer, setemailServer] = useState("");
  const [checkPrinterName, setCheckPrinterName] = useState("");
  const [checkPrinterId, setCheckPrinterId] = useState(null);
  const [invoicePrinterName, setInvoicePrinterName] = useState("");
  const [invoicePrinterId, setInvoicePrinterId] = useState(null);
  const [labelPrinterName, setLabelPrinterName] = useState("");
  const [labelPrinterId, setLabelPrinterId] = useState(null);
  const [parsPapsLabelPrinterName, setParsPapsLabelPrinterName] = useState("");
  const [parsPapsLabelPrinterId, setParsPapsLabelPrinterId] = useState(null);
  const [checkPrinterData, setCheckPrinterData] = useState([]);
  const [reimbursementPrinterData, setReimbursementPrinterData] = useState([]);
  const [invoicePrinterData, setInvoicePrinterData] = useState([]);
  const [labelPrinterData, setLabelPrinterData] = useState([]);
  const [parsPapsLabelPrinterData, setParsPapsLabelPrinterData] = useState([]);
  const [showPrinterLookup, setShowPrinterLookup] = useState(false);
  const [selectPrinter, setSelectPrinter] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [printerLoading, setPrinterLoading] = useState(false);

  const postalCodeOnChange = useSelector((state) => state.companyReducer.postalCodeOnChange);
  const companyData = useSelector((state) => state.companyReducer.companyData);
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);
  let currentTab = useSelector((state) => state.companyReducer.currentTab);
  const loading = useSelector((state) => state.companyReducer.loading);
  const saveCompanyObject = useSelector((state) => state.companyReducer.saveCompanyObject);
  const reimbursementPrinterName = useSelector((state) => state.companyReducer.reimbursementPrinterName);
  const reimbursementPrinterId = useSelector((state) => state.companyReducer.reimbursementPrinterId);
  const ipRegex =
    /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/gm;

  const fetchPrinter = (string, label) => {
    setPrinterLoading(true);
    if (currentTab === "general" && !viewDetail) {
      CompanyService.fetchPrinters(string, "Autocomplete")
        .then((response) => {
          const data = response.data;
          const printerList = data.content?.map((data) => ({
            ...data,
            description: data.description?.trim(),
          }));
          if (label === "checkPrinter") {
            setCheckPrinterData(printerList);
          } else if (label === "reimbursementPrinter") {
            setReimbursementPrinterData(printerList);
          } else if (label === "invoicePrinter") {
            setInvoicePrinterData(printerList);
          } else if (label === "labelPrinter") {
            setLabelPrinterData(printerList);
          } else if (label === "parsPapsPrinter") {
            setParsPapsLabelPrinterData(printerList);
          }
          setPrinterLoading(false);
        })
        .catch((error) => {
          setPrinterLoading(false);
          console.error("error..");
        });
    }
  };

  const handlePrinterSelectionForLookup = (printer) => {
    if (selectPrinter === "checkPrinter") {
      setCheckPrinterName(printer.description?.trim());
      setCheckPrinterId(printer.printerPK);
    } else if (selectPrinter === "reimbursementPrinter") {
      dispatch(setReimbursementPrinterName(printer.description?.trim()));
      dispatch(setReimbursementPrinterId(printer.printerPK));
    } else if (selectPrinter === "invoicePrinter") {
      setInvoicePrinterName(printer.description?.trim());
      setInvoicePrinterId(printer.printerPK);
    } else if (selectPrinter === "labelPrinter") {
      setLabelPrinterName(printer.description?.trim());
      setLabelPrinterId(printer.printerPK);
    } else if (selectPrinter === "parsPapsPrinter") {
      setParsPapsLabelPrinterName(printer.description?.trim());
      setParsPapsLabelPrinterId(printer.printerPK);
    }
    setShowPrinterLookup(false);
  };

  const handleCheckPrinterSelection = (printer) => {
    setCheckPrinterName(printer.description?.trim());
    setCheckPrinterId(printer.printerPK);
    setShowPrinterLookup(false);
  };

  const handleReimbursementPrinterSelection = (printer) => {
    dispatch(setReimbursementPrinterName(printer.description?.trim()));
    dispatch(setReimbursementPrinterId(printer.printerPK));
    setShowPrinterLookup(false);
  };

  const handleInvoicePrinterSelection = (printer) => {
    setInvoicePrinterName(printer.description?.trim());
    setInvoicePrinterId(printer.printerPK);
    setShowPrinterLookup(false);
  };

  const handleLabelPrinterSelection = (printer) => {
    setLabelPrinterName(printer.description?.trim());
    setLabelPrinterId(printer.printerPK);
    setShowPrinterLookup(false);
  };

  const handleParsPapsLabelPrinterSelection = (printer) => {
    setParsPapsLabelPrinterName(printer.description?.trim());
    setParsPapsLabelPrinterId(printer.printerPK);
    setShowPrinterLookup(false);
  };

  useEffect(() => {
    if (!loading) {
      setCity(companyData ? companyData.city?.trim().toUpperCase() || "" : "");
      setStateCode(companyData ? companyData.state?.trim() || "" : "");
      setPostalCode(companyData ? companyData.zip?.trim() || "" : "");
      setCompanyPK(companyData ? companyData.companyPK || "" : "");
      setName(companyData ? companyData.name?.trim() || "" : "");
      setAddress1(companyData ? companyData.address1?.trim() || "" : "");
      setAddress2(companyData ? companyData.address2?.trim() || "" : "");
      setPhone(companyData ? companyData.phone?.slice(0, 5) + " " + companyData.phone.slice(5) || "" : "");
      setFax(companyData ? companyData.fax?.slice(0, 5) + " " + companyData.fax.slice(5) || "" : "");
      setCcipAddress(companyData ? companyData.ccipAddress?.trim() || "" : "");
      setCcLoginUser(companyData ? companyData.ccUser?.trim() || "" : "");
      setccPasswords(companyData ? companyData.ccPassword?.trim() || "" : "");

      setemailServer(companyData ? companyData.emailServer?.trim() || "" : "");

      setCheckPrinterId(companyData ? companyData?.checkPrinterId || "" : "");

      setInvoicePrinterId(companyData ? companyData?.invoicePrinterId || "" : "");
      setLabelPrinterId(companyData ? companyData?.labelPrinterId || "" : "");
      setParsPapsLabelPrinterId(companyData ? companyData?.parsPapsLabelPrinterId || "" : "");
      dispatch(setAllDriversPayTaxable(companyData ? companyData?.allDriversPayTaxable || false : false));
      if (companyData?.allDriversPayTaxable) {
        dispatch(setReimbursementPrinterId(null));
        dispatch(setReimbursementPrinterName(""));
      } else {
        dispatch(setReimbursementPrinterId(companyData ? companyData?.reimbursmentPrinterId || "" : ""));
        dispatch(
          setReimbursementPrinterName(companyData ? companyData?.reimbursmentPrinterDesc?.trim() || "" : "")
        );
      }
      setCheckPrinterName(companyData ? companyData.checkPrinterDescription?.trim() || "" : "");
      setInvoicePrinterName(companyData ? companyData.invoicePrinterDescription?.trim() || "" : "");
      setLabelPrinterName(companyData ? companyData.labelPrinterDescription?.trim() || "" : "");
      setParsPapsLabelPrinterName(
        companyData ? companyData.parsPapsLabelPrinterDescription?.trim() || "" : ""
      );
      initialValue[0].city = companyData?.city != null ? companyData?.city?.trim() : "";
      initialValue[0].statecode = companyData?.state != null ? companyData?.state?.trim() : "";
      initialValue[0].canadian = companyData?.canadian != null ? companyData?.canadian : false;
      initialValue[0].postalcode = companyData?.zip != null ? companyData?.zip?.trim() : "";
      setPostalValues(initialValue);
      setPostalCodePK(companyData?.postalCodePK);
    }
  }, [companyData, viewDetail]);

  useEffect(() => {
    dispatch(
      setSaveCompanyObject({
        companyPK: companyPK,
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        state: statecode,
        zip: postalcode,
        phone: phone?.replace(/\s+/g, ""),
        fax: fax?.replace(/\s+/g, ""),
        checkPrinterId: checkPrinterId,
        reimbursmentPrinterId: reimbursementPrinterId,
        invoicePrinterId: invoicePrinterId,
        labelPrinterId: labelPrinterId,
        parsPapsLabelPrinterId: parsPapsLabelPrinterId,
        ccipAddress: ccipAddress,
        ccUser: ccLoginUser,
        ccPassword: ccPasswords,

        emailServer: emailServer,
      })
    );
  }, [
    companyPK,
    name,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    phone,
    fax,
    checkPrinterId,
    reimbursementPrinterId,
    invoicePrinterId,
    labelPrinterId,
    parsPapsLabelPrinterId,
    ccipAddress,
    ccLoginUser,
    ccPasswords,
    emailServer,
  ]);

  //  for save validation of general tab
  useEffect(() => {
    if (
      name &&
      address1 &&
      city &&
      postalCodePK &&
      phone !== "" &&
      phone?.length === 14 &&
      phone.length > 0 &&
      fax &&
      fax?.length === 14 &&
      ccipAddress != null &&
      ccipAddress !== "" &&
      ccipAddress !== undefined &&
      ccipAddress?.trim().length > 0 &&
      ccipAddress?.trim().match(ipRegex) &&
      emailServer != null &&
      emailServer !== "" &&
      emailServer !== undefined &&
      emailServer?.trim().length > 0 &&
      ccLoginUser &&
      ccPasswords &&
      checkPrinterId &&
      (saveCompanyObject?.allDriversPayTaxable || reimbursementPrinterId) &&
      invoicePrinterId &&
      labelPrinterId &&
      parsPapsLabelPrinterId
    ) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }
  }, [
    name,
    address1,
    city,
    statecode,
    postalcode,
    phone,
    fax,
    ccipAddress,
    ccLoginUser,
    ccPasswords,
    saveCompanyObject?.allDriversPayTaxable,
    reimbursementPrinterId,
    invoicePrinterId,
    labelPrinterId,
    parsPapsLabelPrinterId,
    checkPrinterId,
    postalCodeOnChange,
    emailServer,
    postalCodePK,
  ]);

  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    ccipAddress: yup
      .string()
      ?.trim()
      .matches(
        /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/gm
      )
      .required(),
  });

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{
        city,
        statecode,
        postalcode,
        canadian,
        ccipAddress,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        city: true,
        statecode: true,
        postalcode: true,
        canadian: false,
        ccipAddress: true,
      }}
      on={on}
    >
      {(formik) => (
        <div className="p-2">
          <div className="d-flex">
            <Col xs={6}>
              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Name
                  </Form.Label>
                </Col>

                <Col xs={4} className="p-0">
                  <Input
                    className={`${"customFormControl"} ${
                      viewDetail ? "" : name !== "" ? "borderGreen" : "borderRed"
                    }`}
                    id="name"
                    value={name}
                    disabled={viewDetail}
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Address
                  </Form.Label>
                </Col>

                <Col xs={4} className="p-0">
                  <Input
                    className={`${"customFormControl"} ${
                      viewDetail ? "" : address1 !== "" ? "borderGreen" : "borderRed"
                    }`}
                    id="name"
                    value={address1}
                    disabled={viewDetail}
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      setAddress1(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-2 mb-3 align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} className="p-0">
                  <Input
                    className={`customFormControl `}
                    id="name"
                    value={address2}
                    name="name"
                    type="text"
                    disabled={viewDetail}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      setAddress2(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                    }}
                  />
                </Col>
              </Form.Group>
              <PostalCodeComponent
                disabled={viewDetail}
                city={viewDetail ? companyData?.city?.trim().toUpperCase() : city}
                setCity={setCity}
                stateCode={viewDetail ? companyData?.state?.trim() : statecode}
                setStateCode={setStateCode}
                postalCode={viewDetail ? companyData?.zip?.trim() : postalcode}
                setPostalCode={setPostalCode}
                setPostalValues={setPostalValues}
                postalOptions={postalOptions}
                postalCodePK={postalCodePK}
                setPostalCodePK={setPostalCodePK}
                canadian={canadian}
                setCanadian={setCanadian}
              />

              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Phone
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                  <Input
                    className={`${"customFormControl"} ${
                      viewDetail
                        ? ""
                        : (phone !== "" && phone.length > 0 && phone.length !== 14) || phone === ""
                          ? "borderRed"
                          : "borderGreen"
                    }`}
                    id="name"
                    value={phone}
                    name="phone"
                    type="tel"
                    maxLength={14}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      setPhone(formatPhoneNumber(e.target.value));
                    }}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    FAX
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                  <Input
                    className={`${"customFormControl"} ${
                      viewDetail
                        ? ""
                        : (fax !== "" && fax.length > 0 && fax.length !== 14) || fax === ""
                          ? "borderRed"
                          : "borderGreen"
                    }`}
                    id="fax"
                    value={fax}
                    name="fax"
                    type="tel"
                    maxLength={14}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      setFax(formatPhoneNumber(e.target.value));
                    }}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center invisible row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    FAX
                  </Form.Label>
                </Col>

                <Col xs={2} className="ps-0 pe-3">
                  <Input
                    className={`customFormControl`}
                    id="fax"
                    name="fax"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                    1099 check printer
                  </Form.Label>
                </Col>
                <Col xs={5} className="ps-0 pe-3 d-flex">
                  <AutoCompleteDropdown
                    arrayList={checkPrinterData}
                    searchString={checkPrinterName}
                    renderItemId={(printer) => printer.printerPK}
                    renderItemField={(printer) => printer.description}
                    handleSearchString={(string) => {
                      setCheckPrinterName(string);
                    }}
                    loading={printerLoading}
                    fetchDataBySearchString={(string) => fetchPrinter(string, "checkPrinter")}
                    onSelect={handleCheckPrinterSelection}
                    selectedId={checkPrinterId}
                    clearInputCallback={() => {
                      setCheckPrinterId(null);
                    }}
                    disabled={viewDetail}
                    className={`customFormControl ${
                      !viewDetail ? (!checkPrinterId ? "borderRed" : "borderGreen") : ""
                    }`}
                  />
                  <LookupButton
                    disabled={viewDetail}
                    onClick={() => {
                      setShowPrinterLookup(true);
                      setSelectPrinter("checkPrinter");
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                    Reimburse check printer
                  </Form.Label>
                </Col>

                <Col xs={5} className="ps-0 pe-3 d-flex">
                  <AutoCompleteDropdown
                    arrayList={reimbursementPrinterData}
                    searchString={reimbursementPrinterName}
                    renderItemId={(printer) => printer.printerPK}
                    renderItemField={(printer) => printer.description}
                    handleSearchString={(string) => {
                      dispatch(setReimbursementPrinterName(string));
                    }}
                    loading={printerLoading}
                    fetchDataBySearchString={(string) => fetchPrinter(string, "reimbursementPrinter")}
                    onSelect={handleReimbursementPrinterSelection}
                    selectedId={reimbursementPrinterId}
                    clearInputCallback={() => {
                      dispatch(setReimbursementPrinterId(null));
                    }}
                    disabled={viewDetail || saveCompanyObject?.allDriversPayTaxable}
                    className={`customFormControl ${
                      !viewDetail
                        ? !saveCompanyObject?.allDriversPayTaxable
                          ? !reimbursementPrinterId
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                        : ""
                    }`}
                  />
                  <LookupButton
                    disabled={viewDetail || saveCompanyObject?.allDriversPayTaxable}
                    onClick={() => {
                      setShowPrinterLookup(true);
                      setSelectPrinter("reimbursementPrinter");
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                    Invoice printer
                  </Form.Label>
                </Col>

                <Col xs={5} className="ps-0 pe-3 d-flex">
                  <AutoCompleteDropdown
                    arrayList={invoicePrinterData}
                    searchString={invoicePrinterName}
                    renderItemId={(printer) => printer.printerPK}
                    renderItemField={(printer) => printer.description}
                    handleSearchString={(string) => {
                      setInvoicePrinterName(string);
                    }}
                    loading={printerLoading}
                    fetchDataBySearchString={(string) => fetchPrinter(string, "invoicePrinter")}
                    onSelect={handleInvoicePrinterSelection}
                    selectedId={invoicePrinterId}
                    towardsTop
                    clearInputCallback={() => {
                      setInvoicePrinterId(null);
                    }}
                    disabled={viewDetail}
                    className={`customFormControl ${
                      !viewDetail ? (!invoicePrinterId ? "borderRed" : "borderGreen") : ""
                    }`}
                  />
                  <LookupButton
                    disabled={viewDetail}
                    onClick={() => {
                      setShowPrinterLookup(true);
                      setSelectPrinter("invoicePrinter");
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                    label printer
                  </Form.Label>
                </Col>

                <Col xs={5} className="ps-0 pe-3 d-flex">
                  <AutoCompleteDropdown
                    arrayList={labelPrinterData}
                    searchString={labelPrinterName}
                    renderItemId={(printer) => printer.printerPK}
                    renderItemField={(printer) => printer.description}
                    handleSearchString={(string) => {
                      setLabelPrinterName(string);
                    }}
                    loading={printerLoading}
                    fetchDataBySearchString={(string) => fetchPrinter(string, "labelPrinter")}
                    onSelect={handleLabelPrinterSelection}
                    selectedId={labelPrinterId}
                    clearInputCallback={() => {
                      setLabelPrinterId(null);
                    }}
                    disabled={viewDetail}
                    towardsTop
                    className={`customFormControl ${
                      !viewDetail ? (!labelPrinterId ? "borderRed" : "borderGreen") : ""
                    }`}
                  />
                  <LookupButton
                    disabled={viewDetail}
                    onClick={() => {
                      setShowPrinterLookup(true);
                      setSelectPrinter("labelPrinter");
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                    PARS/PAPS Label Printer
                  </Form.Label>
                </Col>

                <Col xs={5} className="ps-0 pe-3 d-flex">
                  <AutoCompleteDropdown
                    arrayList={parsPapsLabelPrinterData}
                    searchString={parsPapsLabelPrinterName}
                    renderItemId={(printer) => printer.printerPK}
                    renderItemField={(printer) => printer.description}
                    handleSearchString={(string) => {
                      setParsPapsLabelPrinterName(string);
                    }}
                    loading={printerLoading}
                    fetchDataBySearchString={(string) => fetchPrinter(string, "parsPapsPrinter")}
                    onSelect={handleParsPapsLabelPrinterSelection}
                    selectedId={parsPapsLabelPrinterId}
                    clearInputCallback={() => {
                      setParsPapsLabelPrinterId(null);
                    }}
                    disabled={viewDetail}
                    towardsTop
                    className={`customFormControl ${
                      !viewDetail ? (!parsPapsLabelPrinterId ? "borderRed" : "borderGreen") : ""
                    }`}
                  />
                  <LookupButton
                    disabled={viewDetail}
                    onClick={() => {
                      setShowPrinterLookup(true);
                      setSelectPrinter("parsPapsPrinter");
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    CC IP Address
                  </Form.Label>
                </Col>

                <Col xs={2} className="ps-0 pe-3">
                  <Input
                    className={`customFormControl ${
                      viewDetail
                        ? ""
                        : formik.errors.ccipAddress === undefined && ccipAddress.length > 1
                          ? "borderGreen"
                          : formik.errors.ccipAddress !== undefined
                            ? "borderRed"
                            : ""
                    }`}
                    id="ad1"
                    value={ccipAddress}
                    name="ccipAddress"
                    type="text"
                    maxLength={15}
                    autoComplete="one-time-code"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      formik.handleChange(e);
                      const inputValue = e.target.value.replace(/[^0-9.]/g, "");
                      setCcipAddress(inputValue);
                    }}
                    onBlur={formik.handleBlur}
                    style={{
                      borderColor: viewDetail
                        ? "black"
                        : formik.errors.ccipAddress === undefined && ccipAddress.length > 1
                          ? "green"
                          : formik.errors.ccipAddress !== undefined
                            ? "red"
                            : "",
                    }}
                    disabled={viewDetail}
                    spellCheck={false}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    CC Login User
                  </Form.Label>
                </Col>

                <Col xs={2} className="ps-0 pe-3">
                  <Input
                    className={`${"customFormControl"} ${
                      viewDetail ? "" : ccLoginUser !== "" ? "borderGreen" : "borderRed"
                    }`}
                    id="fax"
                    value={ccLoginUser}
                    name="fax"
                    type="text"
                    maxLength={10}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      setCcLoginUser(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                    }}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    CC Password
                  </Form.Label>
                </Col>

                <Col xs={2} className="ps-0 pe-3">
                  <Input
                    className={`${"customFormControl"} ${
                      viewDetail ? "" : ccPasswords !== "" ? "borderGreen" : "borderRed"
                    }`}
                    id="fax"
                    value={ccPasswords}
                    name="fax"
                    type="text"
                    maxLength={10}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail}
                    onChange={(e) => {
                      setccPasswords(e.target.value.replace(/[ .]/g, ""));
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center invisible  row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    CC password
                  </Form.Label>
                </Col>

                <Col xs={2} className="ps-0 pe-3">
                  <Input
                    className={`customFormControl`}
                    id="fax"
                    name="fax"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-2 align-items-center   row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Email Server
                  </Form.Label>
                </Col>

                <Col xs={4} className="ps-0 ">
                  <Input
                    className={`${"customFormControl"} ${
                      viewDetail ? "" : emailServer ? "borderGreen" : "borderRed"
                    }`}
                    id="fax"
                    value={emailServer}
                    name="fax"
                    type="text"
                    maxLength={100}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/^[^a-zA-Z0-9]+/, "");
                      setemailServer(inputValue);
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>

            <PrinterLookup
              show={showPrinterLookup}
              onHide={() => setShowPrinterLookup(false)}
              renderItemId={(printer) => printer.printerPK}
              handleLookupSelection={handlePrinterSelectionForLookup}
              MaintenanceProgram
            />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default General;
