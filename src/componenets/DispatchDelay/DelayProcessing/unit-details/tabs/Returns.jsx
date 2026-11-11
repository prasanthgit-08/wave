import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
const Returns = () => {
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [name, setName] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [postalcode, setPostalCode] = useState();

  const [nameOfReturnAtLoc, setNameOfReturnAtLoc] = useState();
  const [address1OfReturnAtLoc, setAddress1OfReturnAtLoc] = useState();
  const [address2OfReturnAtLoc, setAddress2OfReturnAtLoc] = useState();
  const [cityOfReturnAtLoc, setCityOfReturnAtLoc] = useState();
  const [stateOfReturnAtLoc, setStateOfReturnAtLoc] = useState();
  const [postalcodeOfReturnAtLoc, setPostalCodeOfReturnAtLoc] = useState();

  const setAddressDetails = (location) => {
    setName(location?.name);
    setAddress1(location?.address1);
    setAddress2(location?.address2);
    setCity(location?.city);
    setState(location?.stateCode);
    setPostalCode(location?.postalCode);
  };

  const setReturnAtAddressDetails = (location) => {
    setNameOfReturnAtLoc(location?.name);
    setAddress1OfReturnAtLoc(location?.address1);
    setAddress2OfReturnAtLoc(location?.address2);
    setCityOfReturnAtLoc(location?.city);
    setStateOfReturnAtLoc(location?.stateCode);
    setPostalCodeOfReturnAtLoc(location?.postalCode);
  };

  useEffect(() => {
    if (rowData.delayedUnitReturnsDetails?.deliveryCustomerPlantFK) {
      setAddressDetails(rowData.delayedUnitReturnsDetails?.customerPlant);
    } else if (rowData.delayedUnitReturnsDetails?.deliveryYardFK) {
      setAddressDetails(rowData.delayedUnitReturnsDetails?.yard);
    } else if (rowData.delayedUnitReturnsDetails?.deliveryDealerFK) {
      setAddressDetails(rowData.delayedUnitReturnsDetails?.dealer);
    } else if (rowData.delayedUnitReturnsDetails?.deliveryUnitAddressFK) {
      setAddressDetails(rowData.delayedUnitReturnsDetails?.miscUser);
    } else {
      console.log("No data available for Return to Location");
    }

    if (rowData.delayedUnitReturnsDetails?.returnCustomerPlantFK) {
      setReturnAtAddressDetails(rowData.delayedUnitReturnsDetails?.returnCustomerPlant);
    } else if (rowData.delayedUnitReturnsDetails?.returnDealerFK) {
      setReturnAtAddressDetails(rowData.delayedUnitReturnsDetails?.returnDealer);
    } else if (rowData.delayedUnitReturnsDetails?.returnUnitAddressFK) {
      setReturnAtAddressDetails(rowData.delayedUnitReturnsDetails?.returnUnitAddress);
    } else {
      console.log("No data available for Return At Location");
    }
  }, []);

  return (
    <div className={viewOnly ? "p-15 w-100 disableInputElements" : "p-15 w-100"}>
      <Row className="m-0 p-0">
        <Col sm={6} md={6} xs={6}>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label dealer-label">Dealer Refused Delivery</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="dealerRefused"
                name="dealerRefused"
                checked={rowData?.refused}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Returned At Location</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={nameOfReturnAtLoc}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={address1OfReturnAtLoc}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={address2OfReturnAtLoc}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={cityOfReturnAtLoc}
              />
            </Col>

            <Col sm={1} md={1} xs={1} className="p-r-0">
              <input
                className="customFormControl"
                name="extn"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
                value={stateOfReturnAtLoc}
              />
            </Col>
            <Col sm={2} md={2} xs={2} className="p-r-0">
              <input
                className="customFormControl"
                name="extn"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
                value={postalcodeOfReturnAtLoc}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={6} md={6} xs={6}>
          <Form.Group className="mt-2 form-group  align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className=" col-form-label dealer-label">Returned By Same Driver</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="outbound"
                name="outbound"
                checked={rowData?.returnedBySameDriver}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0  m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className=" col-form-label dealer-label">Returned To Pickup Location</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="outbound"
                name="outbound"
                checked={rowData?.returnedToPickupLocation}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 form-group  align-items-center row m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Return To Plant</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                value={rowData?.delayedUnitReturnsDetails?.customerPlant?.name}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Return To Yard</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                value={rowData?.delayedUnitReturnsDetails?.yard?.name}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Return To Dealer</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                value={rowData?.delayedUnitReturnsDetails?.dealer?.name}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Return To Location</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                value={name}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row   m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={address1}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row   m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={address2}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row   m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col sm={4} md={4} xs={4} className="p-0">
              <input
                className="customFormControl"
                name="zip"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
                value={city}
              />
            </Col>

            <Col xs={1} md={1} sm={1} className="p-r-0">
              <input
                type="text"
                className={`customFormControl`}
                id="city"
                name="city"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={state}
              />
            </Col>

            <Col sm={2} md={2} xs={2} className="p-r-0">
              <input
                className="customFormControl"
                name="state"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
                value={postalcode}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Returns;
