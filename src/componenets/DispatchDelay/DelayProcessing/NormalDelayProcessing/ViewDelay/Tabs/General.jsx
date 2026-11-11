import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../../common/DateInputField";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import { useDispatch, useSelector } from "react-redux";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../../../utils/dateUtils";
import LoadingIcon from "../../../../../common/LoadingIcon";
import {
  setActiveDisable,
  setDelayActive,
  setDispatchFK,
  setGeneralData,
  setViewLoading,
} from "../../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";

const General = () => {
  const dispatch = useDispatch();
  const { delayedUnitPK, companyName } = useParams();
  const viewDelayActiveTab = useSelector((state) => state.delayProcessing.viewDelayActiveTab);
  const generalData = useSelector((state) => state.delayProcessing.generalData);
  const viewLoading = useSelector((state) => state.delayProcessing.viewLoading);

  // Fetching general data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchGeneralData = () => {
      dispatch(setGeneralData(null));
      dispatch(setViewLoading(true));
      // DelayProcessingService.fetchViewDelayDetails(delayedUnitPK, viewDelayActiveTab,companyName,0,10,null,false)

      DelayProcessingService.fetchViewDelayDetails(delayedUnitPK, viewDelayActiveTab, companyName)
        .then((response) => {
          const { data } = response;
          dispatch(setGeneralData(data[0]));
          dispatch(setDelayActive(data[0]?.Active));
          dispatch(setDispatchFK(data[0]?.DispatchFK));
          if (data[0]?.Disabled === "Y") {
            dispatch(setActiveDisable(true));
          } else {
            dispatch(setActiveDisable(false));
          }
        })
        .catch((error) => {
          console.error("### Error fetching general data:", error);
          // Handle error appropriately
        })
        .finally(() => {
          dispatch(setViewLoading(false));
        });
    };

    if (viewDelayActiveTab === "general") {
      fetchGeneralData();
    }
  }, [viewDelayActiveTab]);

  return (
    <Form>
      <div className="p-15 w-100">
        {viewLoading && <LoadingIcon />}
        <Row className="m-0 p-0">
          <Col sm={6} md={6} xs={6}>
            <Form.Group className="mt-1 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Driver</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="driver"
                  value={generalData?.Driver || ""}
                  name="driver"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
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
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Driver Released</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="driverReleased"
                  name="driverReleased"
                  value={generalData?.DriverReleased || false}
                  checked={generalData?.DriverReleased || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group mt-2 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Driver Release Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField date={generalData?.DriverReleaseDate || ""} disabled />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Unit Number</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.UnitNumber || ""}
                  id="unitNumber"
                  name="unitNumber"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Model</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.Model || ""}
                  id="model"
                  name="model"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">VIN</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.VIN || ""}
                  id="vin"
                  name="vin"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Unit Type</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.UnitType || ""}
                  id="unitType"
                  name="unitType"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Special Code</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.SpecialCode || ""}
                  id="specialCode"
                  name="specialCode"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
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
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Delay Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField date={formatDate(generalData?.DelayDate) || ""} disabled={true} />
              </Col>
              <Col xs={2} md={2} sm={2} className="p-r-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="delayTime"
                  name="delayTime"
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  value={generalData?.DelayTimeOnly || ""}
                  style={{ width: "65px" }}
                  placeholder="HH:MM"
                  maxLength={5}
                />
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="customColFormLabel">
                  <input
                    type="radio"
                    name="delayAMtimePeriod"
                    value="AM"
                    checked={generalData?.DelayAMPM === "AM"}
                    style={{ marginRight: "1px" }}
                  />
                  &nbsp;AM
                </Form.Label>
              </Col>

              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="customColFormLabel">
                  <input
                    type="radio"
                    name="delayPMtimePeriod"
                    value="PM"
                    checked={generalData?.DelayAMPM === "PM"}
                    style={{ marginRight: "1px" }}
                  />
                  &nbsp;PM
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Reported Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField date={formatDate(generalData?.Reported) || ""} disabled={true} />
              </Col>
              <Col xs={2} md={2} sm={2} className="p-r-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  disabled={true}
                  id="reportedTime"
                  name="reportedTime"
                  value={generalData?.ReportedTimeOnly || ""}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  placeholder="HH:MM"
                  style={{ width: "65px" }}
                  maxLength={5}
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="customColFormLabel">
                  <input
                    type="radio"
                    name="reportedAMtimePeriod"
                    value="AM"
                    checked={generalData?.ReportedAMPM === "AM"}
                    style={{ marginRight: "1px" }}
                  />
                  &nbsp;AM
                </Form.Label>
              </Col>

              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="customColFormLabel">
                  <input
                    type="radio"
                    name="reportedPMtimePeriod"
                    value="PM"
                    checked={generalData?.ReportedAMPM === "PM"}
                    style={{ marginRight: "1px" }}
                  />
                  &nbsp;PM
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel"> Delay Code</Form.Label>
              </Col>

              <Col className="p-0" xs={5}>
                <input
                  type="text"
                  className={`customFormControl`}
                  id="unitCode"
                  name="unitCode"
                  maxLength={30}
                  value={generalData?.DelayCode || ""}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
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
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Delay</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="delay"
                  name="delay"
                  checked={generalData?.Delay || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Breakdown</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="outbound"
                  name="outbound"
                  value={generalData?.Breakdown || false}
                  checked={generalData?.Breakdown || false}
                  disabled={true}
                />
              </Col>
              <Col sm={1} md={1} xs={1} className="p-r-0">
                <Form.Label className="customColFormLabel w-15px text-center">Active</Form.Label>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="outbound"
                  name="outbound"
                  value={generalData?.BreakdownActive || false}
                  checked={generalData?.BreakdownActive || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Damage</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="outbound"
                  name="outbound"
                  value={generalData?.Damage || false}
                  checked={generalData?.Damage || false}
                  disabled={true}
                />
              </Col>
              <Col sm={1} md={1} xs={1} className="p-r-0">
                <Form.Label className="customColFormLabel w-15px text-center">Active</Form.Label>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="outbound"
                  name="outbound"
                  value={generalData?.DamageActive || false}
                  checked={generalData?.DamageActive || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Returned</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="outbound"
                  name="outbound"
                  checked={generalData?.Returned || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col sm={6} md={6} xs={6}>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Pickup</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.PickupName || ""}
                  id="pickupName"
                  name="pickupName"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
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
                  value={generalData?.PickupCity || ""}
                  id="pickupAddr1"
                  name="pickupAddr1"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-r-0">
                <input
                  className="customFormControl"
                  name="pickupaddr2"
                  value={generalData?.PickupState || ""}
                  maxLength={4}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  disabled={true}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Delivery</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.DeliveryName || ""}
                  id="delName"
                  name="delName"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
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
                  value={generalData?.DeliveryCity || ""}
                  id="deliveryName"
                  name="deliveryName"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-r-0">
                <input
                  className="customFormControl"
                  name="deliveryAddr1"
                  value={generalData?.DeliveryState || ""}
                  maxLength={4}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Current Location</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.CurrentLocationName || ""}
                  id="name"
                  name="name"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
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
                  value={generalData?.CurrentLocationAddress1 || ""}
                  id="ad1"
                  name="ad1"
                  maxLength={30}
                  disabled={true}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  spellCheck={false}
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
                  id="ad2"
                  name="ad2"
                  value={generalData?.CurrentLocationAddress2 || ""}
                  maxLength={30}
                  disabled={true}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <div style={{ marginTop: "-0.5rem" }}>
              <PostalCodeComponent
                disabled={true}
                city={generalData?.CurrentLocationCity || ""}
                stateCode={generalData?.CurrentLocationStateCode || ""}
                postalCode={generalData?.CurrentLocationPostalCode || ""}
              />
            </div>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel"> Contact</Form.Label>
              </Col>

              <Col xs={8} md={7} sm={6} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="contact"
                  name="contact"
                  value={generalData?.Contact || ""}
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel"> Phone</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="phone"
                  name="phone"
                  value={generalData?.Phone || ""}
                  disabled={true}
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Customer Delay Contact</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.DelayContact || ""}
                  disabled={true}
                  id="delayContact"
                  name="delayContact"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Customer Delay Phone</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.DelayContactPhone || ""}
                  disabled={true}
                  id="delayContactPhone"
                  name="delayContactPhone"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-r-0" style={{ width: "11%" }}>
                <input
                  className={`customFormControl`}
                  name="extn"
                  value={generalData?.DelayContactExtension || ""}
                  maxLength={4}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Customer Delay FAX</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="delayFax"
                  name="delayFax"
                  maxLength={30}
                  value={generalData?.DelayContactFAX || ""}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default General;
