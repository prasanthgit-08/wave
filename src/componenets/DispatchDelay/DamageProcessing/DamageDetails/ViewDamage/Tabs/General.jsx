import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../../common/DateInputField";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../../../../../../utils/dateUtils";
import LoadingIcon from "../../../../../common/LoadingIcon";
import { useDispatch } from "react-redux";
import { setReserveBondFundFK } from "../../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";

const General = () => {
  const { damageFK } = useParams();
  const viewDamageActiveTab = useSelector((state) => state.damageReducer.viewDamageActiveTab);
  const [generalData, setGeneralData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // Fetching general data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchGeneralData = () => {
      setLoading(true);
      DelayDamageService.getDelayDamageViewDetails(damageFK, "GENERAL", 0, 10, null, false)
        .then((response) => {
          const { data } = response;
          setGeneralData(data[0]);
          dispatch(setReserveBondFundFK(data[0]?.ReserveDriverBondFundFK));
        })
        .catch((error) => {
          console.error("### Error fetching general data:", error);
          // Handle error appropriately
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (viewDamageActiveTab === "general") {
      fetchGeneralData();
    }
  }, [viewDamageActiveTab]);

  return (
    <Form>
      {loading && <LoadingIcon />}
      <div className={"p-2 w-100"}>
        <Row className="m-0 p-0">
          <Col sm={6} md={6} xs={6}>
            <Form.Group className="mt-1 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Claim Number</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  value={generalData?.ClaimNumber || ""}
                  maxLength={30}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Driver</Form.Label>
              </Col>
              <Col xs={7} className="d-flex p-0">
                <input
                  type="text"
                  className="customFormControl"
                  value={generalData?.DriverName || ""}
                  maxLength={30}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel"> Unit Number</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  value={generalData?.UnitNumber || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel"> VIN</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input type="text" className="customFormControl" value={generalData?.VIN || ""} disabled />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Odometer Reading</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.Odometer || ""}
                  disabled={true}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Damage Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField date={formatDate(generalData?.DamageDate) || ""} disabled />
              </Col>
              <Col xs={2} md={2} sm={2} className="p-r-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="delayTime"
                  name="delayTime"
                  value={generalData?.DamageTime || ""}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  style={{ width: "65px" }}
                  placeholder="HH:MM"
                  maxLength={5}
                  disabled
                />
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  <input
                    type="radio"
                    name="delayAMtimePeriod"
                    value="AM"
                    checked={generalData?.DamageAMPM === "AM"}
                    style={{ marginRight: "1px" }}
                    disabled
                  />
                  &nbsp;AM
                </Form.Label>
              </Col>

              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  <input
                    type="radio"
                    name="delayPMtimePeriod"
                    value="PM"
                    checked={generalData?.DamageAMPM === "PM"}
                    style={{ marginRight: "1px" }}
                    disabled
                  />
                  &nbsp;PM
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Reported Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField date={formatDate(generalData?.ReportDate) || ""} disabled />
              </Col>
              <Col xs={2} md={2} sm={2} className="p-r-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="reportedTime"
                  name="reportedTime"
                  value={generalData?.ReportDateTime || ""}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  disabled
                  placeholder="HH:MM"
                  style={{ width: "65px" }}
                  maxLength={5}
                />
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  <input
                    type="radio"
                    name="reportedAMtimePeriod"
                    value="AM"
                    checked={generalData?.ReportDateAMPM === "AM"}
                    style={{ marginRight: "1px" }}
                    disabled
                  />
                  &nbsp;AM
                </Form.Label>
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  <input
                    type="radio"
                    name="reportedPMtimePeriod"
                    value="PM"
                    checked={generalData?.ReportDateAMPM === "PM"}
                    style={{ marginRight: "1px" }}
                    disabled
                  />
                  &nbsp;PM
                </Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Damage Code</Form.Label>
              </Col>
              <Col className={`p-0 d-flex`} xs={5} md={5} sm={5}>
                <input
                  type="text"
                  className={`customFormControl`}
                  id="unitCode"
                  name="unitCode"
                  maxLength={30}
                  value={generalData?.DamageCode || ""}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Customer Damage Contact</Form.Label>
              </Col>

              <Col className="p-0" xs={5}>
                <input
                  type="text"
                  className="customFormControl"
                  value={generalData?.DamageContact || ""}
                  maxLength={30}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Customer Damage Phone</Form.Label>
              </Col>

              <Col className="p-0" xs={2}>
                <input
                  type="text"
                  className="customFormControl"
                  value={generalData?.DamageContactPhone || ""}
                  disabled
                />
              </Col>

              <Col className="p-0 ms-2" xs={1} style={{ width: "50px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={generalData?.DamageExtension || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Customer Damage FAX</Form.Label>
              </Col>

              <Col className="p-0" xs={2}>
                <input
                  type="text"
                  className="customFormControl"
                  value={generalData?.DamageFAX || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Repaired</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  checked={!!generalData?.Repaired || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Repair Date</Form.Label>
              </Col>

              <Col className="p-0" xs={2}>
                <DateInputField date={formatDate(generalData?.RepairedDate) || ""} disabled />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Further Repairs Required</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="email"
                  name="email"
                  checked={!!generalData?.FurtherRepairsRequired || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Delivery Terminated</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="email"
                  name="email"
                  checked={!!generalData?.TerminateDelivery || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Status</Form.Label>
              </Col>

              <Col className="p-0" xs={3}>
                <input
                  type="text"
                  className="customFormControl"
                  value={
                    {
                      A: "Active",
                      C: "Closed",
                      D: "Dispute",
                      I: "Invoice",
                      O: "Open",
                    }[generalData?.Status] || ""
                  }
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Status Comment</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  value={generalData?.StatusComment || ""}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>

          <Col sm={6} md={6} xs={6}>
            {/* Empty Tag for Styling */}
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 invisible">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel"></Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="driverName"
                  name="driverName"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>

            <>
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className=" customColFormLabel">Damage At Pickup</Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    checked={!!generalData?.AtPickup || false}
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className=" customColFormLabel">Damage In Yard</Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    checked={!!generalData?.InYards || false}
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">Damage Location</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    type="text"
                    className={`customFormControl`}
                    id="description"
                    value={generalData?.DamageName || ""}
                    name="description"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
                <Col sm={3} md={3} xs={3} className="p-0" />
                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    type="text"
                    className={`customFormControl`}
                    id="description"
                    name="description"
                    maxLength={30}
                    autoComplete="new-password"
                    aria-autocomplete="new-password"
                    value={generalData?.DamageAdd1 || ""}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
                <Col sm={3} md={3} xs={3} className="p-0" />

                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    type="text"
                    className={`customFormControl`}
                    id="description"
                    name="description"
                    value={generalData?.DamageAdd2 || ""}
                    disabled
                  />
                </Col>
              </Form.Group>

              <PostalCodeComponent
                hideLabel
                disabled
                city={generalData?.DamageCity || ""}
                stateCode={generalData?.DamageState || ""}
                postalCode={generalData?.DamagePostal || ""}
              />
            </>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">At Repair Location</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={!!generalData?.AtRepairLocation || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Repair Location</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="description"
                  name="description"
                  value={generalData?.RepairLocationName || ""}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0" />
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="description"
                  name="description"
                  value={generalData?.RepairLocationAdd1 || ""}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0" />

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="description"
                  name="description"
                  value={generalData?.RepairLocationAdd2 || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <PostalCodeComponent
              hideLabel
              disabled={true}
              city={generalData?.RepairLocationCity || ""}
              stateCode={generalData?.RepairLocationState || ""}
              postalCode={generalData?.RepairLocationPostal || ""}
            />

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Name Under</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  value={generalData?.NameUnder || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Work Order Number</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.WorkOrderNumber || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Contact</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.Contact || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Phone</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={generalData?.Phone || ""}
                  disabled
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
