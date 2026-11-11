import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { Col, Form, Row } from "react-bootstrap";

const ContentDamage = () => {
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [pickupArray, setPickupArray] = useState([]);
  const [deliveryArray, setDeliveryArray] = useState([]);
  const [driverName, setDriverName] = useState([]);
  const [lastLocation, setlastLocation] = useState([]);
  const { companyName, driverfk, unitfk } = useParams();

  /**
   *  Delay Fetch Driver function
   **/
  const getDriver = () => {
    let dispatchFk = null;
    if (rowData?.sisterDispatchFK) {
      dispatchFk = rowData?.sisterDispatchFK;
    } else {
      dispatchFk = 0;
    }
    DelayProcessingService.getUnitDriverName(companyName, driverfk, dispatchFk)
      .then((response) => {
        if (response?.data != null) {
          setDriverName(response?.data);
        } else {
          setDriverName(rowData?.transportCompany);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**
   *  Delay Fetch Unit Transport Company Name if exists
   **/
  const getTransportCompanyName = () => {
    DelayProcessingService.getTransportCompanyName(companyName, rowData?.transportCompany)
      .then((response) => {
        setDriverName(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   *  Delay Fetch Unit Last Location function
   **/
  const getLastLocation = () => {
    DelayProcessingService.getUnitLastLocation(companyName, unitfk)
      .then((response) => {
        const lastLocation = response?.data?.split(",");
        setlastLocation(lastLocation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const pickup = rowData.pickupByCityState?.split(",");
    setPickupArray(pickup);
    const delivery = rowData.deliveryByCityState?.split(",");
    setDeliveryArray(delivery);

    getLastLocation();
    if (rowData.driverFK == null && rowData?.transportCompany != null) {
      getTransportCompanyName();
    } else if (
      (rowData?.driverFK != null && rowData?.transportCompany == null) ||
      rowData?.sisterDispatchFK != null
    ) {
      getDriver();
    }
  }, []);

  return (
    <div className="p-2">
      <div className="shadow-sm p-2 rounded border quarterScreenFormContentHeight">
        <Row className="mx-0 p-0 mt-2">
          <Col xs={6}>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Driver</Form.Label>
              </Col>

              <Col xs={8} className="p-0">
                <input
                  name="driver"
                  id="driver"
                  type="text"
                  value={driverName}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>

            {/* Empty Tag for styling */}
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
              <Col xs={8} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Unit Number</Form.Label>
              </Col>

              <Col xs={5} className="p-0">
                <input
                  name="unitNumber"
                  id="unitNumber"
                  value={rowData?.unitNumber}
                  type="text"
                  className={`customFormControl`}
                  maxLength={5}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Model</Form.Label>
              </Col>

              <Col xs={5} className="p-0">
                <input
                  name="model"
                  id="model"
                  value={rowData?.model}
                  type="text"
                  className={`customFormControl`}
                  maxLength={5}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0">
                <Form.Label className="customColFormLabel">VIN</Form.Label>
              </Col>

              <Col xs={5} className="p-0">
                <input
                  name="vin"
                  id="vin"
                  type="text"
                  value={rowData?.vin}
                  className={`customFormControl`}
                  maxLength={5}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Unit Type</Form.Label>
              </Col>

              <Col xs={5} className="p-0">
                <input
                  name="unitType"
                  id="unitType"
                  type="text"
                  value={rowData?.unitType}
                  className={`customFormControl`}
                  maxLength={5}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Special Code</Form.Label>
              </Col>

              <Col xs={5} className="p-0">
                <input
                  name="specialCode"
                  id="specialCode"
                  type="text"
                  value={rowData?.specialCode}
                  className={`customFormControl`}
                  maxLength={5}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Pickup</Form.Label>
              </Col>
              <Col xs={6} className="p-0">
                <input
                  name="pickup"
                  id="pickup"
                  type="text"
                  value={rowData?.pickupByName}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0"></Col>
              <Col xs={6} className="p-0">
                <input
                  name="pickup2"
                  id="pickup2"
                  type="text"
                  value={pickupArray[0]}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
              <Col xs={1} className="w-50px">
                <input
                  name="pickup3"
                  id="pickup3"
                  type="text"
                  value={pickupArray[1]}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            {/* Empty Tag for styling */}
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
              <Col xs={8} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Delivery</Form.Label>
              </Col>
              <Col xs={6} className="p-0">
                <input
                  name="delivery"
                  id="delivery"
                  type="text"
                  value={rowData?.deliveryByName}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0"></Col>
              <Col xs={6} className="p-0">
                <input
                  name="delivery2"
                  id="delivery2"
                  type="text"
                  value={deliveryArray[0]}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
              <Col xs={1} className="w-50px">
                <input
                  name="delivery3"
                  id="delivery3"
                  type="text"
                  value={deliveryArray[1]}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            {/* Empty Tag for styling */}
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
              <Col xs={8} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Last Location</Form.Label>
              </Col>
              <Col xs={6} className="p-0">
                <input
                  name="lastLocation"
                  id="lastLocation"
                  type="text"
                  value={lastLocation[0]}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
              <Col xs={3} className="p-0"></Col>
              <Col xs={6} className="p-0">
                <input
                  name="lastLocation2"
                  id="lastLocation2"
                  type="text"
                  value={lastLocation[1]}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
              <Col xs={1} className="w-50px">
                <input
                  name="lastLocation3"
                  id="lastLocation3"
                  type="text"
                  value={lastLocation[2]}
                  className={`customFormControl`}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContentDamage;
