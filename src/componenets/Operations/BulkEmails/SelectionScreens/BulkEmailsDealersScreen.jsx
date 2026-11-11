import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import DateInputField from "../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../../redux/Operations/BulkEmailSlice";

const BulkEmailsDealersScreen = () => {
  const dispatch = useDispatch();

  const [validation, setValidation] = useState(false);

  const generalManager = useSelector((state) => state.bulkEmails.generalManager);
  const salesManager = useSelector((state) => state.bulkEmails.salesManager);
  const serviceManager = useSelector((state) => state.bulkEmails.serviceManager);
  const orderContact = useSelector((state) => state.bulkEmails.orderContact);
  const dispatchContact = useSelector((state) => state.bulkEmails.dispatchContact);
  const deliveryContact = useSelector((state) => state.bulkEmails.deliveryContact);
  const lastOrderDate = useSelector((state) => state.bulkEmails.lastOrderDate);
  const lastOrderDateValid = useSelector((state) => state.bulkEmails.lastOrderDateValid);
  const process = useSelector((state) => state.bulkEmails.process);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  useEffect(() => {
    if (
      generalManager ||
      serviceManager ||
      salesManager ||
      orderContact ||
      dispatchContact ||
      deliveryContact
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [generalManager, serviceManager, salesManager, orderContact, dispatchContact, deliveryContact]);

  return (
    <div>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Last Order Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "100px" }}>
          <DateInputField
            date={lastOrderDate}
            setDate={(val) => {
              updateData("lastOrderDate", val);
            }}
            setIsDateValid={(val) => {
              updateData("lastOrderDateValid", val);
            }}
            className={`customFormControl ${process !== "New" ? "" : !lastOrderDateValid || !lastOrderDate ? "borderRed" : "borderGreen"}`}
            disabled={process !== "New"}
          />
        </Col>
      </Form.Group>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">General Manager</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
            type="checkbox"
            disabled={process !== "New"}
            name="generalManager"
            checked={generalManager}
            onChange={(e) => {
              updateData("generalManager", e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Sales Manager</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            type="checkbox"
            disabled={process !== "New"}
            name="salesManager"
            checked={salesManager}
            onChange={(e) => {
              updateData("salesManager", e.target.checked);
            }}
            className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
          />
        </Col>
      </Form.Group>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Service Manager</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
            type="checkbox"
            disabled={process !== "New"}
            name="serviceManager"
            checked={serviceManager}
            onChange={(e) => {
              updateData("serviceManager", e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Order Contact</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
            type="checkbox"
            disabled={process !== "New"}
            name="orderContact"
            checked={orderContact}
            onChange={(e) => {
              updateData("orderContact", e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Dispatch Contact</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
            type="checkbox"
            disabled={process !== "New"}
            name="dispatchContact"
            checked={dispatchContact}
            onChange={(e) => {
              updateData("dispatchContact", e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Delivery Contact</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
            type="checkbox"
            disabled={process !== "New"}
            name="deliveryContact"
            checked={deliveryContact}
            onChange={(e) => {
              updateData("deliveryContact", e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default BulkEmailsDealersScreen;
