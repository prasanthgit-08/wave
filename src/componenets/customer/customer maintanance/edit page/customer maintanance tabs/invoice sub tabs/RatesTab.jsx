import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import {
  setCustomerFormData,
  setIsInvoiceRatesTabValid,
  setRatesTabInitialColor,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import CustomerService from "../../../../../../services/CustomerService";
import { lastpointer } from "../../../../../../utils/utils";
import Input from "../../../../../../components/common/input";

function RatesTab() {
  const dispatch = useDispatch();

  const [eLDFee, setELDFee] = useState(false);
  const [invoiceEldFee, setInvoiceEldFee] = useState("");
  const [driverELDFee, setDriverELDFee] = useState("");
  const [allInsuranceSurcharge, setAllInsuranceSurcharge] = useState([]);
  const [insuranceSurcharge, setInsuranceSurcharge] = useState("N");
  const [flatRates, setFlatRates] = useState("");
  const [percentage, setPercentage] = useState("");
  const [invoiceDowntimeRate, setInvoiceDowntimeRate] = useState("");
  const [driverDowntimeRate, setDriverDowntimeRate] = useState("");
  const [invoiceBreakdownFee, setInvoiceBreakdownFee] = useState("");
  const [driverBreakdownFee, setDriverBreakdownFee] = useState("");
  const [invoicePercentage, setInvoicePercentage] = useState("");
  const [transportCompanyInvoicePercentage, setTransportCompanyInvoicePercentage] = useState("");
  const [invoiceUSSurcharge, setInvoiceUSSurcharge] = useState("");
  const [driverUSSurcharge, setDriverUSSurcharge] = useState("");
  const [uSSurchargeDescription, setUSSurchargeDescription] = useState("");
  const [invoiceCanadianSurcharge, setInvoiceCanadianSurcharge] = useState("");
  const [driverCanadianSurcharge, setDriverCanadianSurcharge] = useState("");
  const [canadianSurchargeDescription, setCanadianSurchargeDescription] = useState("");

  const [atleastOneError, setAtleastOneError] = useState(true);
  const [eldValid, setEldValid] = useState(false);

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  const percentageValidation = /^[0-9]*$/;

  const getInsuranceSurcharge = () => {
    CustomerService.getInsuranceSurcharge()
      .then((response) => {
        const data = response?.data;
        setAllInsuranceSurcharge(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (eLDFee === false) {
      setInvoiceEldFee("");
      setDriverELDFee("");
    }
  }, [eLDFee, invoiceEldFee, driverELDFee]);

  useEffect(() => {
    if (invoiceUSSurcharge?.length === 0 && driverUSSurcharge?.length === 0) {
      setUSSurchargeDescription("");
    }
  }, [invoiceUSSurcharge, driverUSSurcharge, uSSurchargeDescription]);

  useEffect(() => {
    if (invoiceCanadianSurcharge?.length === 0 && driverCanadianSurcharge?.length === 0) {
      setCanadianSurchargeDescription("");
    }
  }, [invoiceCanadianSurcharge, driverCanadianSurcharge, canadianSurchargeDescription]);

  useEffect(() => {
    getInsuranceSurcharge();
  }, []);

  useEffect(() => {
    if (eLDFee) {
      if (
        (invoiceEldFee?.length > 0 && Number(invoiceEldFee) > 0) ||
        (driverELDFee?.length > 0 && Number(driverELDFee) > 0)
      ) {
        setEldValid(true);
      } else setEldValid(false);
    }
  }, [eLDFee, invoiceEldFee, driverELDFee]);

  useEffect(() => {
    if (editCustomerData === null) {
      setELDFee(false);
      setInvoiceEldFee("");
      setInsuranceSurcharge("N");
      setDriverELDFee("");
      setFlatRates("");
      setPercentage("");
      setInvoiceDowntimeRate("");
      setDriverDowntimeRate("");
      setInvoiceBreakdownFee("");
      setDriverBreakdownFee("");
      setInvoicePercentage("");
      setTransportCompanyInvoicePercentage("");
      setInvoiceUSSurcharge("");
      setDriverUSSurcharge("");
      setUSSurchargeDescription("");
      setInvoiceCanadianSurcharge("");
      setDriverCanadianSurcharge("");
      setCanadianSurchargeDescription("");
    }
    if (editCustomerData !== null) {
      setELDFee(editCustomerData.eldFee != null ? editCustomerData.eldFee : "");
      setInvoiceEldFee(
        editCustomerData.invoiceELDAmount != null && editCustomerData.invoiceELDAmount > 0
          ? editCustomerData.invoiceELDAmount
          : ""
      );
      setInsuranceSurcharge(
        editCustomerData.invoiceInsuranceSurcharge != null ? editCustomerData.invoiceInsuranceSurcharge : "N"
      );
      setDriverELDFee(
        editCustomerData.driverELDAmount != null && editCustomerData.driverELDAmount > 0
          ? editCustomerData.driverELDAmount
          : ""
      );
      setFlatRates(
        editCustomerData.insuranceFlatRate !== null && editCustomerData.invoiceInsuranceSurcharge === "F"
          ? editCustomerData.insuranceFlatRate
          : ""
      );
      setPercentage(
        editCustomerData.insuranceRate != null &&
          editCustomerData.insuranceRate > 0 &&
          editCustomerData.invoiceInsuranceSurcharge === "P"
          ? editCustomerData.insuranceRate
          : ""
      );
      setInvoiceDowntimeRate(
        editCustomerData.invoiceDowntimeRate != null && editCustomerData.invoiceDowntimeRate > 0
          ? editCustomerData.invoiceDowntimeRate
          : ""
      );
      setDriverDowntimeRate(
        editCustomerData.driverDowntimeRate != null && editCustomerData.driverDowntimeRate > 0
          ? editCustomerData.driverDowntimeRate
          : ""
      );
      setInvoiceBreakdownFee(
        editCustomerData.invoiceBreakdownFee != null && editCustomerData.invoiceBreakdownFee > 0
          ? editCustomerData.invoiceBreakdownFee
          : ""
      );
      setDriverBreakdownFee(
        editCustomerData.driverBreakdownFee != null && editCustomerData.driverBreakdownFee > 0
          ? editCustomerData.driverBreakdownFee
          : ""
      );
      setInvoicePercentage(
        editCustomerData.invoicePercentage != null && editCustomerData.invoicePercentage > 0
          ? editCustomerData.invoicePercentage
          : ""
      );
      setTransportCompanyInvoicePercentage(
        editCustomerData.invoicePercentageTransportCompany != null &&
          editCustomerData.invoicePercentageTransportCompany > 0
          ? editCustomerData.invoicePercentageTransportCompany
          : ""
      );
      setInvoiceUSSurcharge(
        editCustomerData.invoiceUSSurcharge != null && editCustomerData.invoiceUSSurcharge > 0
          ? editCustomerData.invoiceUSSurcharge
          : ""
      );
      setDriverUSSurcharge(
        editCustomerData.driverUSSurcharge != null && editCustomerData.driverUSSurcharge > 0
          ? editCustomerData.driverUSSurcharge
          : ""
      );
      setUSSurchargeDescription(
        editCustomerData.usSurchargeDescription != null ? editCustomerData.usSurchargeDescription : ""
      );
      setInvoiceCanadianSurcharge(
        editCustomerData.invoiceCanadianSurcharge != null && editCustomerData.invoiceCanadianSurcharge > 0
          ? editCustomerData.invoiceCanadianSurcharge
          : ""
      );
      setDriverCanadianSurcharge(
        editCustomerData.driverCanadianSurcharge != null && editCustomerData.driverCanadianSurcharge > 0
          ? editCustomerData.driverCanadianSurcharge
          : ""
      );
      setCanadianSurchargeDescription(
        editCustomerData.canadianSurchargeDescription != null
          ? editCustomerData.canadianSurchargeDescription
          : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    ratesFormData();
  }, [
    eLDFee,
    invoiceEldFee,
    driverELDFee,
    insuranceSurcharge,
    flatRates,
    percentage,
    invoiceDowntimeRate,
    driverDowntimeRate,
    invoiceBreakdownFee,
    driverBreakdownFee,
    invoicePercentage,
    transportCompanyInvoicePercentage,
    invoiceUSSurcharge,
    driverUSSurcharge,
    uSSurchargeDescription,
    invoiceCanadianSurcharge,
    driverCanadianSurcharge,
    canadianSurchargeDescription,
  ]);

  const ratesFormData = () => {
    dispatch(
      setCustomerFormData({
        eldFee: eLDFee,
        invoiceELDAmount: invoiceEldFee,
        driverELDAmount: driverELDFee,
        invoiceInsuranceSurcharge: insuranceSurcharge,
        insuranceFlatRate: flatRates,
        insuranceRate: percentage,
        invoiceDowntimeRate: invoiceDowntimeRate,
        driverDowntimeRate: driverDowntimeRate,
        invoiceBreakdownFee: invoiceBreakdownFee,
        driverBreakdownFee: driverBreakdownFee,
        invoicePercentage: invoicePercentage,
        invoicePercentageTransportCompany: transportCompanyInvoicePercentage,
        invoiceUSSurcharge: invoiceUSSurcharge,
        driverUSSurcharge: driverUSSurcharge,
        usSurchargeDescription: uSSurchargeDescription,
        invoiceCanadianSurcharge: invoiceCanadianSurcharge,
        driverCanadianSurcharge: driverCanadianSurcharge,
        canadianSurchargeDescription: canadianSurchargeDescription,
      })
    );
  };

  useEffect(() => {
    if (
      eLDFee &&
      (lastpointer(invoiceEldFee) ||
        lastpointer(driverELDFee) ||
        !(
          (/^\d{0,5}(?:\.\d{0,2})?$/.test(invoiceEldFee) && Number(invoiceEldFee) > 0) ||
          (/^\d{0,5}(?:\.\d{0,2})?$/.test(driverELDFee) && Number(driverELDFee) > 0)
        ))
    ) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if (
      insuranceSurcharge === "F" &&
      (!/^\d{1,5}(?:\.\d{0,2})?$/.test(flatRates) || Number(flatRates) <= 0 || lastpointer(flatRates))
    ) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if (
      insuranceSurcharge === "P" &&
      (!/^\d{1,5}(?:\.\d{0,2})?$/.test(percentage) || Number(percentage) <= 0 || lastpointer(percentage))
    ) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if (lastpointer(invoiceDowntimeRate)) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if (lastpointer(driverDowntimeRate)) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if (lastpointer(invoiceBreakdownFee)) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if (lastpointer(driverBreakdownFee)) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if (lastpointer(invoiceUSSurcharge) || lastpointer(driverUSSurcharge)) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if ((invoiceUSSurcharge || driverUSSurcharge) && !uSSurchargeDescription) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if (lastpointer(invoiceCanadianSurcharge) || lastpointer(driverCanadianSurcharge)) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if ((invoiceCanadianSurcharge || driverCanadianSurcharge) && !canadianSurchargeDescription) {
      dispatch(setIsInvoiceRatesTabValid(false));
      dispatch(setRatesTabInitialColor(false));
    } else if (
      !eLDFee &&
      insuranceSurcharge === "N" &&
      !(invoiceUSSurcharge || invoiceCanadianSurcharge || driverUSSurcharge || driverCanadianSurcharge)
    ) {
      dispatch(setRatesTabInitialColor(true));
    } else {
      dispatch(setIsInvoiceRatesTabValid(true));
      dispatch(setRatesTabInitialColor(false));
    }
  }, [
    invoiceUSSurcharge,
    driverUSSurcharge,
    uSSurchargeDescription,
    eLDFee,
    invoiceEldFee,
    driverELDFee,
    invoiceDowntimeRate,
    driverDowntimeRate,
    invoiceBreakdownFee,
    driverBreakdownFee,
    invoiceCanadianSurcharge,
    driverCanadianSurcharge,
    canadianSurchargeDescription,
    flatRates,
    percentage,
    insuranceSurcharge,
  ]);

  // Atleast one required validation
  useEffect(() => {
    if (
      !eLDFee ||
      (invoiceEldFee !== "" &&
        String(invoiceEldFee)?.match(/^\d{0,5}(?:\.\d{0,2})?$/) &&
        invoiceEldFee > 0) ||
      (driverELDFee !== "" && String(driverELDFee)?.match(/^\d{0,5}(?:\.\d{0,2})?$/) && driverELDFee > 0)
    ) {
      setAtleastOneError(false);
    } else {
      setAtleastOneError(true);
    }
  }, [eLDFee, driverELDFee, invoiceEldFee]);

  const validationSchema = yup.object({
    uSSurchargeDescription: yup.string().when(["invoiceUSSurcharge", "driverUSSurcharge"], {
      is: (invoiceUSSurcharge, driverUSSurcharge) => {
        if (Number(invoiceUSSurcharge) > 0 || Number(driverUSSurcharge) > 0) {
          return true;
        } else {
          return false;
        }
      },
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
    canadianSurchargeDescription: yup.string().when(["invoiceCanadianSurcharge", "driverCanadianSurcharge"], {
      is: (invoiceCanadianSurcharge, driverCanadianSurcharge) => {
        if (Number(invoiceCanadianSurcharge) > 0 || Number(driverCanadianSurcharge) > 0) {
          return true;
        } else {
          return false;
        }
      },
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
  });

  useEffect(() => {
    if (insuranceSurcharge === "N") {
      setFlatRates("");
      setPercentage("");
    }
    if (insuranceSurcharge === "P") {
      setFlatRates("");
    }
    if (insuranceSurcharge === "F") {
      setPercentage("");
    }
  }, [insuranceSurcharge]);

  return (
    <Formik
      initialValues={{
        invoiceEldFee,
        driverELDFee,
        flatRates,
        percentage,
        invoiceDowntimeRate,
        driverDowntimeRate,
        invoiceBreakdownFee,
        driverBreakdownFee,
        invoicePercentage,
        transportCompanyInvoicePercentage,
        invoiceUSSurcharge,
        driverUSSurcharge,
        uSSurchargeDescription,
        invoiceCanadianSurcharge,
        driverCanadianSurcharge,
        canadianSurchargeDescription,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        invoiceEldFee: true,
        driverELDFee: true,
        flatRates: true,
        percentage: true,
        invoiceDowntimeRate: true,
        driverDowntimeRate: true,
        invoiceBreakdownFee: true,
        driverBreakdownFee: true,
        invoicePercentage: true,
        transportCompanyInvoicePercentage: true,
        invoiceUSSurcharge: true,
        driverUSSurcharge: true,
        uSSurchargeDescription: true,
        invoiceCanadianSurcharge: true,
        driverCanadianSurcharge: true,
        canadianSurchargeDescription: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/*ELD Fee*/}
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.eld.fee.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="eLDFee"
                      value={eLDFee}
                      checked={eLDFee}
                      disabled={viewDetail}
                      onChange={(e) => setELDFee(e.target.checked)}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice ELD Fee*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.invoice.eld.fee.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "70px" }}>
                    <Input
                      className={`customFormControl ${
                        viewDetail || eLDFee === false
                          ? ""
                          : lastpointer(invoiceEldFee) ||
                              (!Number(driverELDFee) &&
                                !(/^\d{0,5}(?:\.\d{0,2})?$/.test(invoiceEldFee) && invoiceEldFee > 0))
                            ? "borderRed"
                            : invoiceEldFee !== "" && Number(invoiceEldFee) > 0
                              ? "borderGreen"
                              : ""
                      }`}
                      name="invoiceEldFee"
                      value={invoiceEldFee}
                      maxLength={10}
                      disabled={viewDetail || eLDFee === false}
                      onChange={(e) => {
                        formik.handleChange(e);

                        if (e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                          setInvoiceEldFee(e.target.value);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Driver ELD Fee*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.driver.eld.fee.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "70px" }}>
                    <Input
                      className={`customFormControl ${
                        viewDetail === true || eLDFee === false
                          ? ""
                          : lastpointer(driverELDFee) ||
                              (!Number(invoiceEldFee) &&
                                !(/^\d{0,5}(?:\.\d{0,2})?$/.test(driverELDFee) && driverELDFee > 0))
                            ? "borderRed"
                            : driverELDFee !== "" && Number(driverELDFee) > 0
                              ? "borderGreen"
                              : ""
                      }`}
                      name="driverELDFee"
                      maxLength={10}
                      value={driverELDFee}
                      disabled={viewDetail || eLDFee === false}
                      onChange={(e) => {
                        formik.handleChange(e);

                        if (e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                          setDriverELDFee(e.target.value);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Row
                  className={`${!viewDetail && atleastOneError ? "hide-elements" : "hide-elements"} m-t-1`}
                >
                  <Col xs={3} md={3} sm={3}></Col>
                  <Col style={{ paddingLeft: "5px" }}>
                    <p className="mb-0 text-danger">Enter atleast Invoice ELD Fee or Driver ELD Fee</p>
                  </Col>
                </Row>

                {/*Insurance Surcharge*/}
                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.insurance.surcharge.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Select
                      className="customFormControl"
                      name="insuranceSurcharge"
                      value={insuranceSurcharge}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setInsuranceSurcharge(e.target.value);
                      }}
                    >
                      {/* <option value="select">--Select--</option> */}
                      {allInsuranceSurcharge?.map((item) => (
                        <option key={item.insuranceSurchargeID} value={item.insuranceSurchargeID}>
                          {item.insuranceSurchargeName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/*Flat Rates*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.flat.rates.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={2} sm={2} md={2} className="p-0">
                    <Input
                      className={`customFormControl ${
                        viewDetail || insuranceSurcharge !== "F"
                          ? "black"
                          : flatRates !== "" &&
                              /^\d{1,5}(\.\d{1,2})?$/.test(flatRates) &&
                              Number(flatRates) > 0 && //  greater than zero only
                              !formik.errors.flatRates
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="flatRates"
                      value={flatRates}
                      disabled={viewDetail || insuranceSurcharge === "N" || insuranceSurcharge === "P"}
                      maxLength={8}
                      onChange={(e) => {
                        let value = e.target.value;

                        formik.handleChange(e);

                        if (/^\d{0,5}(\.\d{0,2})?$/.test(value)) {
                          setFlatRates(value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Percentage*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.orders.sub.tab.detail.percentage.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "50px" }}>
                    <Input
                      type="text"
                      className={`customFormControl ${
                        viewDetail || insuranceSurcharge !== "P"
                          ? "black"
                          : percentage !== "" && Number(percentage) > 0 && !/\.$/.test(percentage)
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="percentage"
                      value={percentage}
                      maxLength={5}
                      disabled={viewDetail || insuranceSurcharge === "N" || insuranceSurcharge === "F"}
                      onChange={(e) => {
                        let value = e.target.value;

                        formik.handleChange(e);

                        if (/^\d{0,2}(?:\.\d{0,2})?$/.test(value)) {
                          setPercentage(value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice Downtime Rate*/}
                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.invoice.downtime.rate.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0">
                    <Input
                      className={`customFormControl ${lastpointer(invoiceDowntimeRate) ? "borderRed" : ""}`}
                      name="invoiceDowntimeRate"
                      value={invoiceDowntimeRate}
                      disabled={viewDetail}
                      maxLength={7}
                      onChange={(e) => {
                        let value = e.target.value;

                        formik.handleChange(e);

                        if (/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
                          setInvoiceDowntimeRate(value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Driver Downtime Rate*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.driver.downtime.rate.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0">
                    <Input
                      className={`customFormControl ${lastpointer(driverDowntimeRate) ? "borderRed" : ""}`}
                      name="driverDowntimeRate"
                      value={driverDowntimeRate}
                      disabled={viewDetail}
                      maxLength={7}
                      onChange={(e) => {
                        let value = e.target.value;

                        formik.handleChange(e);

                        if (/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
                          setDriverDowntimeRate(value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice Breakdown fee*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.invoice.breakdown.fee.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0">
                    <Input
                      className={`customFormControl ${lastpointer(invoiceBreakdownFee) ? "borderRed" : ""}`}
                      name="invoiceBreakdownFee"
                      value={invoiceBreakdownFee}
                      disabled={viewDetail}
                      maxLength={10}
                      onChange={(e) => {
                        let value = e.target.value;

                        formik.handleChange(e);

                        if (/^\d{0,5}(?:\.\d{0,2})?$/.test(value)) {
                          setInvoiceBreakdownFee(value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Driver Breakdown fee*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.driver.breakdwon.fee.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0">
                    <Input
                      className={`customFormControl ${lastpointer(driverBreakdownFee) ? "borderRed" : ""}`}
                      name="driverBreakdownFee"
                      value={driverBreakdownFee}
                      maxLength={10}
                      disabled={viewDetail}
                      onChange={(e) => {
                        let value = e.target.value;

                        formik.handleChange(e);

                        if (/^\d{0,5}(?:\.\d{0,2})?$/.test(value)) {
                          setDriverBreakdownFee(value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} md={6} xs={6}>
                {/*Invoice Percentage*/}
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.invoice.percentage.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
                    <Input
                      className="customFormControl"
                      name="invoicePercentage"
                      value={invoicePercentage}
                      maxLength={2}
                      disabled={viewDetail}
                      onChange={(e) => {
                        formik.handleChange(e);
                        e.target.value?.match(percentageValidation) && setInvoicePercentage(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Transport company Invoice Percentage*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t(
                        "customer.maintanance.invoice.sub.tab.rates.transport.company.invoice.percentage.field"
                      )}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
                    <Input
                      className="customFormControl"
                      name="transportCompanyInvoicePercentage"
                      value={transportCompanyInvoicePercentage}
                      maxLength={2}
                      disabled={viewDetail}
                      onChange={(e) => {
                        formik.handleChange(e);
                        e.target.value?.match(percentageValidation) &&
                          setTransportCompanyInvoicePercentage(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice US Surcharge*/}
                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.invoice.us.surcharge.field")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} sm={1} md={1} className="p-0">
                    <Input
                      className={`customFormControl ${lastpointer(invoiceUSSurcharge) ? "borderRed" : ""}`}
                      name="invoiceUSSurcharge"
                      value={invoiceUSSurcharge}
                      disabled={viewDetail}
                      onChange={(e) => {
                        let value = e.target.value;

                        formik.handleChange(e);

                        if (/^\d{0,5}(?:\.\d{0,2})?$/.test(value)) {
                          setInvoiceUSSurcharge(value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Driver US Surcharge*/}
                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.driver.us.surcharge.field")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} sm={1} md={1} className="p-0">
                    <Input
                      className={`customFormControl ${lastpointer(driverUSSurcharge) ? "borderRed" : ""}`}
                      name="driverUSSurcharge"
                      value={driverUSSurcharge}
                      disabled={viewDetail}
                      onChange={(e) => {
                        let value = e.target.value;

                        formik.handleChange(e);

                        if (/^\d{0,5}(?:\.\d{0,2})?$/.test(value)) {
                          setDriverUSSurcharge(value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*US Surcharge Description*/}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.us.surcharge.description.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} lg={6} xl={6} className="p-0">
                    <Input
                      name="uSSurchargeDescription"
                      type="text"
                      maxLength={50}
                      value={uSSurchargeDescription}
                      disabled={
                        viewDetail ||
                        (invoiceUSSurcharge?.length === 0 && driverUSSurcharge?.length === 0) ||
                        (Number(invoiceUSSurcharge) === 0 && Number(driverUSSurcharge) === 0)
                      }
                      onChange={(e) => {
                        formik.handleChange(e);
                        setUSSurchargeDescription(e.target.value);
                      }}
                      onBlur={formik.handleBlur}

                      className={`${"customFormControl"} ${
                        viewDetail === true ||
                        (invoiceUSSurcharge?.length === 0 && driverUSSurcharge?.length === 0) ||
                        (Number(invoiceUSSurcharge) === 0 && Number(driverUSSurcharge) === 0)
                          ? ""
                          : formik.errors.uSSurchargeDescription === undefined &&
                              uSSurchargeDescription != null &&
                              uSSurchargeDescription?.length >= 1
                            ? "borderGreen"
                            : formik.errors.uSSurchargeDescription !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice Canadian Surcharge*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.invoice.canadian.surcharge.field")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} sm={1} md={1} className="p-0">
                    <Input
                      className={`customFormControl ${
                        lastpointer(invoiceCanadianSurcharge) ? "borderRed" : ""
                      }`}
                      name="invoiceCanadianSurcharge"
                      value={invoiceCanadianSurcharge}
                      disabled={viewDetail}
                      onChange={(e) => {
                        let value = e.target.value;

                        formik.handleChange(e);

                        if (/^\d{0,5}(?:\.\d{0,2})?$/.test(value)) {
                          setInvoiceCanadianSurcharge(value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Driver Canadian Surcharge*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.driver.canadian.surcharge.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0">
                    <Input
                      className={`customFormControl ${lastpointer(driverCanadianSurcharge) ? "borderRed" : ""}`}
                      name="driverCanadianSurcharge"
                      value={driverCanadianSurcharge}
                      disabled={viewDetail}
                      onChange={(e) => {
                        formik.handleChange(e);

                        let value = e.target.value;

                        const pattern = /^(?:\d{0,5}(?:\.\d{0,2})?)?$/;

                        if (pattern.test(value)) {
                          setDriverCanadianSurcharge(value);
                        }
                      }}

                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Canadian Surcharge Description*/}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.rates.canadian.surcharge.description.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} lg={6} xl={6} className="p-0">
                    <Input
                      name="canadianSurchargeDescription"
                      type="text"
                      value={canadianSurchargeDescription}
                      maxLength={50}
                      disabled={
                        viewDetail ||
                        (invoiceCanadianSurcharge?.length === 0 && driverCanadianSurcharge?.length === 0) ||
                        (Number(invoiceCanadianSurcharge) === 0 && Number(driverCanadianSurcharge) === 0)
                      }
                      onChange={(e) => {
                        setCanadianSurchargeDescription(e.target.value);
                      }}
                      className={`${"customFormControl"} ${
                        viewDetail === true ||
                        (invoiceCanadianSurcharge?.length === 0 && driverCanadianSurcharge?.length === 0) ||
                        (Number(invoiceCanadianSurcharge) === 0 && Number(driverCanadianSurcharge) === 0)
                          ? ""
                          : formik.errors.canadianSurchargeDescription === undefined &&
                              canadianSurchargeDescription != null &&
                              canadianSurchargeDescription?.length >= 1
                            ? "borderGreen"
                            : formik.errors.canadianSurchargeDescription !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default RatesTab;
