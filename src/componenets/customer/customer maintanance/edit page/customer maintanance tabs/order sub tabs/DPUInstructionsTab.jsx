import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerFormData } from "../../../../../../redux/CustomerMaintenanceSlice";
import { removeLeadingWhitespace } from "../../../../../../utils/utils";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";

const DPUInstructionsTab = () => {
  const dispatch = useDispatch();
  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);
  const [dpuInstructions, setDpuInstructions] = useState("");

  useEffect(() => {
    if (editCustomerData === null) {
      setDpuInstructions("");
    }
    if (editCustomerData != null) {
      setDpuInstructions(editCustomerData.dpuInstructions != null ? editCustomerData.dpuInstructions : "");
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    dpuInstructionsTabFormData();
  }, [dpuInstructions]);

  const dpuInstructionsTabFormData = () => {
    dispatch(
      setCustomerFormData({
        dpuInstructions: dpuInstructions,
      })
    );
  };

  return (
    <div className="p-2 w-100" style={{ minHeight: "400px" }}>
      <Row>
        <Col xs={2} sm={2} md={2} />
        <div className="col-6">
          <Col lg={12} sm={12} md={12} xs={12}>
            <Form.Group className="m-t-15 row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>DPU Instructions</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "410px" }}>
                <textarea
                  rows={7}
                  cols={200}
                  type="text"
                  style={{
                    resize: "none",
                    display: "fixed",
                    maxWidth: "520px",
                    boxShadow: "none",
                    fontSize: "12px",
                  }}
                  className={`customFormControl h-100`}
                  name="notes"
                  value={dpuInstructions}
                  disabled={viewDetail}
                  autoComplete="off"
                  onInput={(e) => {
                    const cleanedValue = removeLeadingWhitespace(e.target.value);
                    setDpuInstructions(cleanedValue);
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

export default DPUInstructionsTab;
