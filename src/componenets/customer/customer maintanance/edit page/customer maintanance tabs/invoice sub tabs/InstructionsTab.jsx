import { t } from "i18next";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerFormData } from "../../../../../../redux/CustomerMaintenanceSlice";
import { removeLeadingWhitespace } from "../../../../../../utils/utils";

const InstructionsTab = () => {
  const dispatch = useDispatch();

  const [invoiceInstructions, setInvoiceInstructions] = useState("");

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  useEffect(() => {
    if (editCustomerData === null) {
      setInvoiceInstructions("");
    }
    if (editCustomerData !== null) {
      setInvoiceInstructions(
        editCustomerData.invoiceInstructions != null ? editCustomerData.invoiceInstructions : ""
      );
    }
  }, [editCustomerData, viewDetail]);
  useEffect(() => {
    dispatch(
      setCustomerFormData({
        invoiceInstructions: invoiceInstructions,
      })
    );
  }, [invoiceInstructions]);

  return (
    <div className="p-2 w-100" style={{ minHeight: "400px" }}>
      <Row>
        <Col xs={2} sm={2} md={2} />
        <div className="col-6">
          <Col lg={12} sm={12} md={12} xs={12}>
            {/* Invoice Instructions */}
            <Form.Group className="form-group mt-5 align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">
                  {t("customer.maintanance.invoice.sub.tab.paperwork.invoice.instructions.field")}
                </label>
              </Col>

              <Col lg={12} xs={12} md={12} sm={12} className="p-0">
                <textarea
                  rows={13}
                  cols={70}
                  type="text"
                  className="customFormControl h-100 "
                  name=" invoiceInstructions "
                  value={invoiceInstructions}
                  disabled={viewDetail}

                  onInput={(e) => {
                    const cleanedValue = removeLeadingWhitespace(e.target.value);
                    setInvoiceInstructions(cleanedValue);
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default InstructionsTab;
