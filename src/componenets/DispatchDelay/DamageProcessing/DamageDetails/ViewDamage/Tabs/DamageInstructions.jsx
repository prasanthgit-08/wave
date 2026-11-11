import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";

const DamageInstructions = () => {
  const { damageFK } = useParams();
  const [loading, setLoading] = useState(false);
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const breakdownUnitFK = localStorage.getItem("breakdownUnitFK");
  const viewDamageActiveTab = useSelector((state) => state.damageReducer.viewDamageActiveTab);

  const [damageInstructionsData, setDamageInstructionsData] = useState(null);

  // Fetching delay instructions data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchDelayInstructionsData = () => {
      setLoading(true);
      DelayDamageService.getDelayDamageViewDetails(damageFK, "instructions", 0, 10, null, false)
        .then((response) => {
          const { data } = response;
          setDamageInstructionsData(data[0]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching delay instructions data:", error);
          // Handle error appropriately
        });
    };

    if (viewDamageActiveTab === "damageInstructions") {
      fetchDelayInstructionsData();
    }
  }, [viewDamageActiveTab]);

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col xs={12} sm={12} md={12} lg={12} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-1 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20"></label>

            <Col sm={12} md={12} className="p-0">
              <textarea
                rows={23}
                cols={10}
                type="BreakdownInstructions"
                className="customFormControl h-100 "
                name="BreakdownInstructions"
                value={damageInstructionsData?.DamageInstructions || ""}
                autoComplete="off"
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      {loading && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DamageInstructions;
