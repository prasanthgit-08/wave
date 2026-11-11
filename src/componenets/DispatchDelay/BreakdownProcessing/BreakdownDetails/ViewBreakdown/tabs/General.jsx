import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../../common/DateInputField";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../../../utils/dateUtils";
import LoadingIcon from "../../../../../common/LoadingIcon";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { setFeeDriverFK } from "../../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownFeesSlice";

const General = () => {
  const dispatch = useDispatch();

  const { breakdownFK } = useParams();
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const breakdownUnitFK = localStorage.getItem("breakdownUnitFK");

  const viewBreakdownActiveTab = useSelector((state) => state.delaybreakdown.viewBreakdownActiveTab);

  const [generalData, setGeneralData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetching general data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchGeneralData = () => {
      setLoading(true);
      BreakdownProcessingService.getBreakdownViewDetails(
        viewBreakdownActiveTab,
        breakdownFK,
        0,
        10,
        null,
        false,
        breakdownCompanyName
      )
        .then((response) => {
          const { data } = response;
          setGeneralData(data[0]);
          dispatch(setFeeDriverFK(data[0]?.DriverFK));
        })
        .catch((error) => {
          console.error("### Error fetching general data:", error);
          // Handle error appropriately
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (viewBreakdownActiveTab === "general") {
      fetchGeneralData();
    }
  }, [viewBreakdownActiveTab]);

  return (
    <Form>
      <div className="p-15 w-100">
        {loading && <LoadingIcon />}
        <Row className="m-0 p-0">
          <Col sm={6} md={6} xs={6}>
            <Form.Group className="mt-1 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">Driver</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="driver"
                  value={generalData?.DriverName || ""}
                  name="driver"
                  maxLength={30}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
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
              <Col sm={4} md={4} xs={4} className="p-0">
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
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">Odometer</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.Odometer || ""}
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
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">Breakdown Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField date={formatDate(generalData?.BreakdownDate) || ""} disabled={true} />
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
                  value={generalData?.BreakdownTime || ""}
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
                    checked={generalData?.BreakdownAMPM === "AM"}
                    style={{ marginRight: "1px" }}
                    disabled={true}
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
                    checked={generalData?.BreakdownAMPM === "PM"}
                    style={{ marginRight: "1px" }}
                    disabled={true}
                  />
                  &nbsp;PM
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">Reported Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField date={formatDate(generalData?.ReportDate) || ""} disabled={true} />
              </Col>
              <Col xs={2} md={2} sm={2} className="p-r-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  disabled={true}
                  id="reportedTime"
                  name="reportedTime"
                  value={generalData?.ReportDateTime || ""}
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
                    checked={generalData?.ReportDateAMPM === "AM"}
                    style={{ marginRight: "1px" }}
                    disabled={true}
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
                    checked={generalData?.ReportDateAMPM === "PM"}
                    style={{ marginRight: "1px" }}
                    disabled={true}
                  />
                  &nbsp;PM
                </Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">Breakdown Code</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.BreakdownCode || ""}
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
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">Customer Breakdown Contact</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.BreakdownContact || ""}
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
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">Customer Breakdown Phone</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.BreakdownContactPhone || ""}
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
                  value={generalData?.BreakdownExtension || ""}
                  maxLength={4}
                  disabled={true}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">Customer Breakdown FAX</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="delayFax"
                  name="delayFax"
                  maxLength={30}
                  value={generalData?.BreakdownFAX || ""}
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
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className=" customColFormLabel">Repaired</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="delay"
                  name="delay"
                  checked={!!generalData?.Repaired || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">Repair Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField date={generalData?.RepairedDate || ""} disabled />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className=" customColFormLabel">Further Repairs Required</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="delay"
                  name="delay"
                  checked={!!generalData?.FurtherRepairsRequired || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className=" customColFormLabel">Delivery Terminated</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="delay"
                  name="delay"
                  checked={!!generalData?.TerminateDelivery || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col sm={6} md={6} xs={6}>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Breakdown At Pickup</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="delay"
                  name="delay"
                  checked={!!generalData?.AtPickup || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Breakdown In Yard</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="delay"
                  name="delay"
                  checked={!!generalData?.InYards || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Breakdown Location</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.BrealdownLocationName || ""}
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
                  value={generalData?.BrealdownLocationAdd1 || ""}
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
                  value={generalData?.BrealdownLocationAdd2 || ""}
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
                hideLabel
                city={generalData?.BrealdownLocationCity || ""}
                stateCode={generalData?.BrealdownLocationState || ""}
                postalCode={generalData?.BrealdownLocationPostal || ""}
              />
            </div>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">At Repair Location</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="delay"
                  name="delay"
                  checked={!!generalData?.AtRepairLocation || false}
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Repair Location</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.RepairLocationName || ""}
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
                  value={generalData?.RepairLocationAdd1 || ""}
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
                  value={generalData?.RepairLocationAdd2 || ""}
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
                hideLabel
                city={generalData?.RepairLocationCity || ""}
                stateCode={generalData?.RepairLocationState || ""}
                postalCode={generalData?.RepairLocationPostal || ""}
              />
            </div>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Name Under</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.NameUnder || ""}
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
                <Form.Label className="customColFormLabel">Work Order Number</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.WorkOrderNumber || ""}
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
                <Form.Label className="customColFormLabel">Contact</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.Contact || ""}
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
                <Form.Label className="customColFormLabel">Phone</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="delayFax"
                  name="delayFax"
                  maxLength={30}
                  value={generalData?.Phone || ""}
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
