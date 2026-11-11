import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { t } from "i18next";
import { setYardFormData } from "../../../../redux/YardMaintenanceSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
function Instructions() {
  const [pickupInstruction, setPickupInstruction] = useState("");
  const [deliveryInstruction, setDeliveryInstruction] = useState("");
  const viewDetail = useSelector((state) => state.yardMaintenanceReducer.viewDetail);
  const dispatch = useDispatch();
  const editYardData = useSelector((state) => state.yardMaintenanceReducer.editYardData);
  useEffect(() => {
    if (editYardData != null) {
      setPickupInstruction(editYardData.pickupInstructions ? editYardData.pickupInstructions : "");
      setDeliveryInstruction(editYardData.deliveryInstructions ? editYardData.deliveryInstructions : "");
    }
  }, [editYardData, viewDetail]);

  // to backend
  const instructionTab = () => {
    dispatch(
      setYardFormData({
        deliveryInstructions: deliveryInstruction,
        pickupInstructions: pickupInstruction,
      })
    );
  };
  useEffect(() => {
    instructionTab();
  }, [deliveryInstruction, pickupInstruction]);
  return (
    <div className="p-15 w-100 ">
      <Form.Group className=" form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
        <Col sm={3} md={3} xs={3} className="p-0">
          <Form.Label className={`${styles.colFormLabel}`}>
            {t("edit.yard.page.bol.tab.pickupInstructions")}
          </Form.Label>
        </Col>
        <Col xs={12} md={12} sm={12} className="p-0">
          <textarea
            className="w-100 border-1 border-dark "
            name="pickupInstruction"
            id="pickupInstruction"
            cols={30}
            rows={8}
            type="text"
            value={pickupInstruction}
            disabled={viewDetail}
            onInput={(e) => {
              setPickupInstruction(e.target.value.replace(/^\s+/g, ""));
            }}
          />
        </Col>
      </Form.Group>
      <Col className="mt-5">
        <label className="mb-2" htmlFor="">
          {t("edit.yard.page.bol.tab.deliveryInstructions")}
        </label>
        <Col xs={12} md={12} sm={12} className="p-0">
          <textarea
            className="w-100 border-1 border-dark "
            name="deliveryInstruction"
            type="text"
            id="deliveryInstruction"
            cols={30}
            rows={8}
            value={deliveryInstruction}
            disabled={viewDetail}
            onInput={(e) => {
              setDeliveryInstruction(e.target.value.replace(/^\s+/g, ""));
            }}
          />
        </Col>
      </Col>
    </div>
  );
}

export default Instructions;
