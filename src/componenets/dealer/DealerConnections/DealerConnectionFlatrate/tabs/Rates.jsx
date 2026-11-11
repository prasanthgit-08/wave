import React, { useEffect, useMemo } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setIsRatesTabValid } from "../../../../../redux/DealerFlatRateConnectionSlice";

const Rates = ({ formData, setFormData, viewDetail }) => {
  const dispatch = useDispatch();

  const requiredFields = [
    "invoiceFlatrateTowable",
    "driverFlatrateTowable",
    "invoiceFlatrateTowableCDLA",
    "driverFlatrateTowableCDLA",
    "commission",
    "invoiceFlatrateHaulTow",
    "driverFlatarteHaulTow",
    "invoiceFlatRateFlatbed",
    "driverFlatRateFlatbed",
    "invoiceFlatrateMotorized",
    "driverFlatrateMotorized",
  ];

  const ratePairs = [
    ["invoiceFlatrateMotorized", "driverFlatrateMotorized"],
    ["invoiceFlatrateTowable", "driverFlatrateTowable"],
    ["invoiceFlatrateTowableCDLA", "driverFlatrateTowableCDLA"],
    ["invoiceFlatrateHaulTow", "driverFlatarteHaulTow"],
    ["invoiceFlatRateFlatbed", "driverFlatRateFlatbed"],
  ];

  const { TollFlag, PermitFlag, WashFlag, CommissionFlag } = formData || {};

  const isValidDecimal = (v) => /^(\d{0,5})(\.\d{0,2})?$/.test(v);

  const handleChange = (f, v) => {
    let val = v;
    // if (v === ".") val = "0.";

    if (val === "" || isValidDecimal(val)) {
      setFormData((p) => ({ ...p, [f]: val }));
    }
  };

  const handleBlur = (f, v) => {};

  const isPositive = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  };

  const getPairedField = (field) => {
    return ratePairs.find(([invoice, driver]) => invoice === field || driver === field);
  };

  const hasPositiveValue = useMemo(
    () =>
      requiredFields.some((k) => {
        const val = formData?.[k];
        const strVal = String(val === undefined || val === null ? "" : val);
        if (strVal.endsWith(".")) return false;
        const v = parseFloat(strVal);
        return !isNaN(v) && v > 0; // Strictly > 0
      }),
    [formData]
  );

  const hasInvalidInvoiceDriverPair = useMemo(() => {
    return ratePairs.some(([invoiceField, driverField]) => {
      const invoiceValue = parseFloat(formData?.[invoiceField]) || 0;
      const driverValue = parseFloat(formData?.[driverField]) || 0;

      return (invoiceValue > 0 && driverValue <= 0) || (driverValue > 0 && invoiceValue <= 0);
    });
  }, [formData]);

  const optionalFields = ["driverMaxTollsAmount", "maximumPermits", "maximumWash"];

  const hasIncompleteDecimal = useMemo(
    () => [...requiredFields, ...optionalFields].some((k) => String(formData?.[k] || "").endsWith(".")),
    [formData]
  );

  useEffect(() => {
    const isValid = hasPositiveValue && !hasIncompleteDecimal && !hasInvalidInvoiceDriverPair;
    dispatch(setIsRatesTabValid(isValid));
  }, [hasPositiveValue, hasIncompleteDecimal, hasInvalidInvoiceDriverPair]);

  const getInputClass = (field) => {
    if (viewDetail) return "customFormControl";

    const val = formData?.[field];
    const strVal = String(val === undefined || val === null ? "" : val);

    if (strVal.endsWith(".")) return "customFormControl borderRed";

    const pair = getPairedField(field);

    if (pair) {
      const [invoiceField, driverField] = pair;

      const invoiceHasValue = isPositive(formData?.[invoiceField]);
      const driverHasValue = isPositive(formData?.[driverField]);

      if (invoiceHasValue && !driverHasValue && field === driverField) {
        return "customFormControl borderRed";
      }
      if (!invoiceHasValue && driverHasValue && field === invoiceField) {
        return "customFormControl borderRed";
      }

      if (isPositive(strVal)) {
        return "customFormControl borderGreen";
      }
    }

    if (!requiredFields.includes(field)) return "customFormControl";

    if (hasPositiveValue) {
      if (isPositive(strVal)) return "customFormControl borderGreen";
      return "customFormControl";
    }

    return "customFormControl borderRed";
  };

  return (
    <div className="p-2">
      <Row className="mt-4">
        <Col xs={2}></Col>
        <Col xs={2}>Invoice Flatrate</Col>
        <Col xs={2}>Driver Flatrate</Col>
      </Row>

      {/* ================= MOTOROZED + TOLLS ================= */}
      <Form.Group className="row align-items-center mt-3 m-l-10">
        <Col xs={2}>
          <Form.Label>Motorized</Form.Label>
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.invoiceFlatrateMotorized ?? ""}
            disabled={viewDetail}
            className={getInputClass("invoiceFlatrateMotorized")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("invoiceFlatrateMotorized", e.target.value)}
            onBlur={(e) => handleBlur("invoiceFlatrateMotorized", e.target.value)}
          />
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.driverFlatrateMotorized ?? ""}
            disabled={viewDetail}
            className={getInputClass("driverFlatrateMotorized")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("driverFlatrateMotorized", e.target.value)}
            onBlur={(e) => handleBlur("driverFlatrateMotorized", e.target.value)}
          />
        </Col>

        <Col xs={2}>
          <Form.Label className="m-l-30" style={{ visibility: TollFlag === "Y" ? "visible" : "hidden" }}>
            Maximum Tolls
          </Form.Label>
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.driverMaxTollsAmount ?? ""}
            disabled={viewDetail || TollFlag !== "Y"}
            className={getInputClass("driverMaxTollsAmount")}
            style={{
              width: "80px",
              visibility: TollFlag === "Y" ? "visible" : "hidden",
            }}
            onChange={(e) => handleChange("driverMaxTollsAmount", e.target.value)}
            onBlur={(e) => handleBlur("driverMaxTollsAmount", e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* ================= PERMITS ================= */}
      <Form.Group className="row align-items-center mt-3 m-l-10">
        <Col xs={6}></Col>
        <Col xs={2}>
          <Form.Label className="m-l-30" style={{ visibility: PermitFlag === "Y" ? "visible" : "hidden" }}>
            Maximum Permits
          </Form.Label>
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.maximumPermits ?? ""}
            disabled={viewDetail || PermitFlag !== "Y"}
            className={getInputClass("maximumPermits")}
            style={{
              width: "80px",
              visibility: PermitFlag === "Y" ? "visible" : "hidden",
            }}
            onChange={(e) => handleChange("maximumPermits", e.target.value)}
            onBlur={(e) => handleBlur("maximumPermits", e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* ================= WASH ================= */}
      <Form.Group className="row align-items-center mt-3 m-l-10">
        <Col xs={6}></Col>
        <Col xs={2}>
          <Form.Label className="m-l-30" style={{ visibility: WashFlag === "Y" ? "visible" : "hidden" }}>
            Maximum Wash
          </Form.Label>
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.maximumWash ?? ""}
            disabled={viewDetail || WashFlag !== "Y"}
            className={getInputClass("maximumWash")}
            style={{
              width: "80px",
              visibility: WashFlag === "Y" ? "visible" : "hidden",
            }}
            onChange={(e) => handleChange("maximumWash", e.target.value)}
            onBlur={(e) => handleBlur("maximumWash", e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* ================= TOWABLE ================= */}
      <Form.Group className="row align-items-center mt-3 m-l-10">
        <Col xs={2}>
          <Form.Label>Towable</Form.Label>
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.invoiceFlatrateTowable ?? ""}
            disabled={viewDetail}
            className={getInputClass("invoiceFlatrateTowable")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("invoiceFlatrateTowable", e.target.value)}
            onBlur={(e) => handleBlur("invoiceFlatrateTowable", e.target.value)}
          />
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.driverFlatrateTowable ?? ""}
            disabled={viewDetail}
            className={getInputClass("driverFlatrateTowable")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("driverFlatrateTowable", e.target.value)}
            onBlur={(e) => handleBlur("driverFlatrateTowable", e.target.value)}
          />
        </Col>
        <Col xs={2}></Col>
        <Col xs={2}></Col>
      </Form.Group>

      {/* ================= TOWABLE CDL + COMMISSION ================= */}
      <Form.Group className="row align-items-center mt-3 m-l-10">
        <Col xs={2}>
          <Form.Label>Towable CDL</Form.Label>
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.invoiceFlatrateTowableCDLA ?? ""}
            disabled={viewDetail}
            className={getInputClass("invoiceFlatrateTowableCDLA")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("invoiceFlatrateTowableCDLA", e.target.value)}
            onBlur={(e) => handleBlur("invoiceFlatrateTowableCDLA", e.target.value)}
          />
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.driverFlatrateTowableCDLA ?? ""}
            disabled={viewDetail}
            className={getInputClass("driverFlatrateTowableCDLA")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("driverFlatrateTowableCDLA", e.target.value)}
            onBlur={(e) => handleBlur("driverFlatrateTowableCDLA", e.target.value)}
          />
        </Col>

        <Col xs={2}>
          <Form.Label
            className="m-l-30"
            style={{ visibility: CommissionFlag === "Y" ? "visible" : "hidden" }}
          >
            Commission
          </Form.Label>
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.commission ?? ""}
            disabled={viewDetail || CommissionFlag !== "Y"}
            className={getInputClass("commission")}
            style={{
              width: "80px",
              visibility: CommissionFlag === "Y" ? "visible" : "hidden",
            }}
            onChange={(e) => handleChange("commission", e.target.value)}
            onBlur={(e) => handleBlur("commission", e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* ================= HAUL & TOW ================= */}
      <Form.Group className="row align-items-center mt-3 m-l-10">
        <Col xs={2}>
          <Form.Label>Haul & Tow</Form.Label>
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.invoiceFlatrateHaulTow ?? ""}
            disabled={viewDetail}
            className={getInputClass("invoiceFlatrateHaulTow")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("invoiceFlatrateHaulTow", e.target.value)}
            onBlur={(e) => handleBlur("invoiceFlatrateHaulTow", e.target.value)}
          />
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.driverFlatarteHaulTow ?? ""}
            disabled={viewDetail}
            className={getInputClass("driverFlatarteHaulTow")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("driverFlatarteHaulTow", e.target.value)}
            onBlur={(e) => handleBlur("driverFlatarteHaulTow", e.target.value)}
          />
        </Col>
        <Col xs={2}></Col>
        <Col xs={2}></Col>
      </Form.Group>

      {/* ================= FLATBED ================= */}
      <Form.Group className="row align-items-center mt-3 m-l-10">
        <Col xs={2}>
          <Form.Label>Flatbed</Form.Label>
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.invoiceFlatRateFlatbed ?? ""}
            disabled={viewDetail}
            className={getInputClass("invoiceFlatRateFlatbed")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("invoiceFlatRateFlatbed", e.target.value)}
            onBlur={(e) => handleBlur("invoiceFlatRateFlatbed", e.target.value)}
          />
        </Col>
        <Col xs={2}>
          <input
            type="text"
            value={formData?.driverFlatRateFlatbed ?? ""}
            disabled={viewDetail}
            className={getInputClass("driverFlatRateFlatbed")}
            style={{ width: "80px" }}
            onChange={(e) => handleChange("driverFlatRateFlatbed", e.target.value)}
            onBlur={(e) => handleBlur("driverFlatRateFlatbed", e.target.value)}
          />
        </Col>
        <Col xs={2}></Col>
        <Col xs={2}></Col>
      </Form.Group>
    </div>
  );
};

export default Rates;
