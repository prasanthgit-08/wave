import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

const Returns = () => {
  const [loading, setLoading] = useState(false);
  const { delayedUnitPK, companyName } = useParams();
  const viewDelayActiveTab = useSelector((state) => state.delayProcessing.viewDelayActiveTab);

  const [returnsData, setReturnsData] = useState(null);

  // Fetching returns data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchReturnsData = () => {
      setLoading(true);
      DelayProcessingService.fetchViewDelayDetails(delayedUnitPK, viewDelayActiveTab, companyName)
        .then((response) => {
          const { data } = response;
          setReturnsData(data[0]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching returns data:", error);
          // Handle error appropriately
        });
    };

    if (viewDelayActiveTab === "returns") {
      fetchReturnsData();
    }
  }, [viewDelayActiveTab]);

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col sm={6} md={6} xs={6}>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" customColFormLabel">Dealer Refused Delivery</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="dealerRefused"
                name="dealerRefused"
                checked={returnsData?.DealerRefusedDelivery}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="customColFormLabel">Unit At Delivery</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="dealerRefused"
                name="dealerRefused"
                checked={returnsData?.UnitAtDelivery}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" customColFormLabel">Unit At Current Location</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="dealerRefused"
                name="dealerRefused"
                checked={returnsData?.UnitAtCurrentLocation}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="customColFormLabel">Return Location</Form.Label>
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
                value={returnsData?.CurrentLocationName || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="customColFormLabel"></Form.Label>
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
                value={returnsData?.CurrentLocationAddress || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="customColFormLabel"></Form.Label>
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
                value={returnsData?.CurrentLocationAddress2 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="customColFormLabel"></Form.Label>
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
                value={returnsData?.CurrentLocationCity || ""}
                disabled
              />
            </Col>

            <Col sm={1} md={1} xs={1} className="p-r-0">
              <input
                className="customFormControl"
                name="extn"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
                value={returnsData?.CurrentLocationState || ""}
                disabled
              />
            </Col>
            <Col sm={2} md={2} xs={2} className="p-r-0">
              <input
                className="customFormControl"
                name="extn"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
                value={returnsData?.CurrentLocationPostalCode || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={6} md={6} xs={6}>
          <Form.Group className="mt-2 form-group  align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className=" customColFormLabel">Returned By Same Driver</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="outbound"
                name="outbound"
                checked={returnsData?.ReturnedBySameDriver || false}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0  m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className=" customColFormLabel">Returned To Pickup Location</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="outbound"
                name="outbound"
                checked={returnsData?.ReturnToPickupLocation || false}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 form-group  align-items-center row m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Return To Plant</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                value={returnsData?.ReturnToPlant || ""}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Return To Yard</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                value={returnsData?.ReturnToYard || ""}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Return To Dealer</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                value={returnsData?.ReturnToDealer || ""}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Return To Location</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="description"
                name="description"
                maxLength={30}
                value={returnsData?.ReturnToLocation || ""}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row   m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel"></Form.Label>
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
                value={returnsData?.ReturnToLocationAddress || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row   m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel"></Form.Label>
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
                value={returnsData?.ReturnToLocationAddress2 || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 form-group  align-items-center row   m-l-0 m-r-0 ">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel"></Form.Label>
            </Col>

            <Col sm={4} md={4} xs={4} className="p-0">
              <input
                className="customFormControl"
                name="zip"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
                value={returnsData?.ReturnToLocationCity || ""}
                disabled
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
                value={returnsData?.ReturnToLocationState || ""}
                disabled
              />
            </Col>

            <Col sm={2} md={2} xs={2} className="p-r-0">
              <input
                className="customFormControl"
                name="state"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
                value={returnsData?.ReturnToLocationPostalCode || ""}
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

export default Returns;
