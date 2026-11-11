import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerDealer } from "../../../../../redux/EditCustomerDealerSlice";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";

function CustomerDelaerEditBolText() {
  const dispatch = useDispatch();

  const editDetails = useSelector((state) => state.editcustomerDealers.editDetails);
  const customerDealer = useSelector((state) => state.editcustomerDealers.customerDealerData);

  const [bolText, setBolText] = useState(Array(7).fill(""));
  const [driverPickupInstruction, setDriverPickupInstruction] = useState("");
  const [driverDeliveryInstruction, setDriverDeliveryInstruction] = useState("");

  const [bOL1, setBOL1] = useState("");
  const [bOL2, setBOL2] = useState("");
  const [bOL3, setBOL3] = useState("");
  const [bOL4, setBOL4] = useState("");
  const [bOL5, setBOL5] = useState("");
  const [bOL6, setBOL6] = useState("");
  const [bOL7, setBOL7] = useState("");

  const changeData = () => {
    dispatch(
      setCustomerDealer({
        pickupNotes: driverPickupInstruction,
        deliveryNotes: driverDeliveryInstruction,
        boltext1: bolText[0],
        boltext2: bolText[1],
        boltext3: bolText[2],
        boltext4: bolText[3],
        boltext5: bolText[4],
        boltext6: bolText[5],
        boltext7: bolText[6],
      })
    );
  };

  useEffect(() => {
    setDriverPickupInstruction(customerDealer.pickupNotes);
    setDriverDeliveryInstruction(customerDealer.deliveryNotes);
    setBOL1(customerDealer.boltext1 ? customerDealer.boltext1 : "");
    setBOL2(customerDealer.boltext2 ? customerDealer.boltext2 : "");
    setBOL3(customerDealer.boltext3 ? customerDealer.boltext3 : "");
    setBOL4(customerDealer.boltext4 ? customerDealer.boltext4 : "");
    setBOL5(customerDealer.boltext5 ? customerDealer.boltext5 : "");
    setBOL6(customerDealer.boltext6 ? customerDealer.boltext6 : "");
    setBOL7(customerDealer.boltext7 ? customerDealer.boltext7 : "");
  }, [customerDealer, editDetails]);

  useEffect(() => {
    const bolVal = [bOL1, bOL2, bOL3, bOL4, bOL5, bOL6, bOL7];
    setBolText(bolVal);
  }, [bOL1, bOL2, bOL3, bOL4, bOL5, bOL6, bOL7]);

  useEffect(() => {
    changeData();
  }, [bolText, driverDeliveryInstruction, driverPickupInstruction]);

  return (
    <div className="px-3 py-2">
      <div className="d-flex pt-2">
        <div className="col-6">
          <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0" style={{ height: "230px" }}>
              <Form.Label className="col-form-label ">BOL Text</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0">
              <DynamicTextFields
                numFields={5}
                maxCharLimit={42}
                inputValues={bolText}
                setInputValues={setBolText}
                disabled={!editDetails}
              />
            </Col>
          </Form.Group>
        </div>
        <div className="col-6">
          <Form.Group className="  align-items-start   m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0 mb-2">
              <Form.Label className="col-form-label w-100 pe-5">Driver Pickup Instructions</Form.Label>
            </Col>
            <Col xs={8} md={8} sm={8} className="p-0">
              <textarea
                name=""
                id=""
                cols="30"
                rows="14"
                className="w-100"
                value={driverPickupInstruction}
                onChange={(e) => {
                  if (e.target.value === " ") {
                    setDriverPickupInstruction("");
                  } else {
                    setDriverPickupInstruction(e.target.value);
                  }
                }}
                disabled={!editDetails}
              ></textarea>
            </Col>
          </Form.Group>
          <Form.Group className="mt-3  align-items-start   m-l-0 m-r-0 ">
            <Col sm={5} md={5} xs={5} className="p-0 mb-2 d-flex">
              <Form.Label className="col-form-label w-100 pe-5 ">Driver Delivery Instructions</Form.Label>
            </Col>
            <Col xs={8} md={8} sm={8} className="p-0">
              <textarea
                name=""
                id=""
                cols="30"
                rows="14"
                className="w-100"
                value={driverDeliveryInstruction}
                onChange={(e) => {
                  if (e.target.value === " ") {
                    setDriverDeliveryInstruction("");
                  } else {
                    setDriverDeliveryInstruction(e.target.value);
                  }
                }}
                disabled={!editDetails}
              ></textarea>
            </Col>
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default CustomerDelaerEditBolText;
