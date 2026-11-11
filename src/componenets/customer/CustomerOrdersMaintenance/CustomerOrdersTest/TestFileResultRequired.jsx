import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useSelector } from "react-redux";
const TestFileResultRequired = () => {
  const testResponse = useSelector((state) => state.customerOrdersReducer.testResponse);
  const requiredTabData = testResponse?.FinalXML[0] || null;

  return (
    <div className="p-15 w-100  ">
      <div className="m-b-5">
        <div className="p-15 w-100">
          <Col md={6} xs={6}>
            <Form.Group className={`mt-4 m-b-20 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Customer
                </Form.Label>
              </Col>
              <Col xs={7} md={7} className="p-0">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  value={requiredTabData?.Customer}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-2 m-b-20 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Unit Number
                </Form.Label>
              </Col>
              <Col xs={7} md={7} className="p-0">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  value={requiredTabData?.UnitNumber}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-2 m-b-20 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Pickup Plant
                </Form.Label>
              </Col>
              <Col xs={7} md={7} className="p-0">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  value={requiredTabData?.PickupCustomer}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-2 m-b-20 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Delivery Dealer
                </Form.Label>
              </Col>
              <Col xs={7} md={7} className="p-0">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  value={requiredTabData?.DeliveryDealer}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-2 m-b-20 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Unit Type
                </Form.Label>
              </Col>
              <Col xs={7} md={7} className="p-0">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  value={requiredTabData?.UnitType}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default TestFileResultRequired;
