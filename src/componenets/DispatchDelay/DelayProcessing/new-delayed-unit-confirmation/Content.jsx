import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { setUnitConfirmationData } from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { useDispatch, useSelector } from "react-redux";

const Content = () => {
  const dispatch = useDispatch();
  const { companyName, driverfk, unitfk } = useParams();
  const [loading, setLoading] = useState(false);
  const unitConfirmationData = useSelector((state) => state.delayProcessing.unitConfirmationData);

  const getConfirmationData = () => {
    setLoading(true);
    DelayProcessingService.fetchConfirmationScreenDetails(unitfk, companyName)
      .then((response) => {
        const data = response?.data[0];
        dispatch(setUnitConfirmationData(data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getConfirmationData();
  }, [unitfk, companyName]);

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
                  value={unitConfirmationData?.Driver}
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
                  value={unitConfirmationData?.UnitNumber}
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
                  value={unitConfirmationData?.Model}
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
                  value={unitConfirmationData?.VIN}
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
                  value={unitConfirmationData?.UnitType}
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
                  value={unitConfirmationData?.SpecialCode}
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
                  value={unitConfirmationData?.PickupName}
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
                  value={unitConfirmationData?.PickupCity}
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
                  value={unitConfirmationData?.PickupState}
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
                  value={unitConfirmationData?.DeliveryName}
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
                  value={unitConfirmationData?.DeliveryCity}
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
                  value={unitConfirmationData?.DeliveryState}
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
                  value={unitConfirmationData?.LastLocationName}
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
                  value={unitConfirmationData?.LastLocationCity}
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
                  value={unitConfirmationData?.LastLocationStateCode}
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
    </div>
  );
};

export default Content;
