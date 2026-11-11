import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { Col, Form, Row } from "react-bootstrap";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import { setInstructionDamageData } from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";

const DamageInstructions = () => {
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);
  const { companyName } = useParams();
  const [instructionsData, setInstructionsData] = useState();

  const id = useParams().unitfk;
  const dispatch = useDispatch();
  const unitPK = useSelector((state) => state.delayDamage.unitPK);
  const instructionDamageData = useSelector((state) => state.delayDamage.instructionDamageData);

  useEffect(() => {
    const fetchEmailData = async () => {
      try {
        const response = await DelayDamageService.getDelayDamageDetails("DamageInstructions", id);
        if (response?.data) {
          dispatch(setInstructionDamageData(response?.data));
        } else {
          console.log("No Instruction Data Found");
        }
      } catch (error) {
        console.error("Error fetching Instruction data:", error);
      }
    };

    fetchEmailData();
  }, [unitPK]);

  return (
    <div className={viewOnly ? "p-15 w-100 disableInputElements" : "p-15 w-100"}>
      <Row className="m-0 p-0">
        <Col xs={12} sm={12} md={12} lg={12} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-1 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20"></label>

            <Col sm={12} md={12} className="p-0">
              <textarea
                rows={23}
                cols={10}
                type="damageInstructions"
                className="customFormControl h-100 "
                name="damageInstructions"
                value={instructionDamageData[0]?.DamageInstructions}
                autoComplete="off"
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default DamageInstructions;
