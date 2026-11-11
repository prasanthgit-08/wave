import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClaimsTabData } from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import ResponsibleParty from "./ResponsibleParty";
import InsuranceCompany from "./InsuranceCompany";
import LoadingIcon from "../../../../../common/LoadingIcon";

const Claim = () => {
  const dispatch = useDispatch();
  const { damageFK } = useParams();

  const viewDamageActiveTab = useSelector((state) => state.damageReducer.viewDamageActiveTab);

  const [claimTabData, setClaimTabData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showResponsibleParty, setShowResponsibleParty] = useState(false);
  const [showInsuranceCompany, setShowInsuranceCompany] = useState(false);

  // Fetching general data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchGeneralData = () => {
      setLoading(true);
      DelayDamageService.getDelayDamageViewDetails(damageFK, "claims", 0, 10, null, false)
        .then((response) => {
          const { data } = response;
          setClaimTabData(data[0]);
          dispatch(setClaimsTabData(data[0]));
        })
        .catch((error) => {
          console.error("### Error fetching general data:", error);
          // Handle error appropriately
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (viewDamageActiveTab === "claim") {
      fetchGeneralData();
    }
  }, [viewDamageActiveTab]);
  return (
    <Form>
      {loading && <LoadingIcon />}
      <div className={"p-15 w-100"}>
        <Row className="m-0 p-0">
          <Col xs={5} className="p-0">
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Damage Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  id="damageamount"
                  name="damageamount"
                  className={`customFormControl`}
                  value={claimTabData?.DamageAmount || 0}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Driver Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="DriverAmount"
                  name="driveramount"
                  value={claimTabData?.DriverAmount || 0}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Company Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="companyamount"
                  name="companyamount"
                  value={claimTabData?.CompanyAmount || 0}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Salvage Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  id="SalvageAmount"
                  name="SalvageAmount"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  className={`customFormControl`}
                  value={claimTabData?.SalvageAmount || 0}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  id="insuranceamount"
                  name="insuranceamount"
                  className={`customFormControl`}
                  value={claimTabData?.InsuranceAmount || 0}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Responsible Party Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  id="responciblepartyamount"
                  name="responciblepartyamount"
                  className={`customFormControl`}
                  value={claimTabData?.ResponciblePartyAmount || 0}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-65  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Reserve Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="reserveamount"
                  value={claimTabData?.ReserveAmount || 0}
                  name="reserveamount"
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Maximum Reserve Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="maxreservedamount"
                  name="maxreservedamount"
                  disabled
                  value={claimTabData?.MaximumReserveAmount || 0}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Accumulated bond</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="Accumulatedbond"
                  name="Accumulatedbond"
                  value={claimTabData?.AccumulatedBond || 0}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Total Bond</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="totalbond"
                  name="totalbond"
                  value={claimTabData?.TotalBond || 0}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-65 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Weather Code</Form.Label>
              </Col>

              <Col xs={7} className={`p-0 d-flex`}>
                <AutoCompleteDropdown
                  className={`customFormControl`}
                  searchString={claimTabData?.Weather || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Road Type Code</Form.Label>
              </Col>

              <Col xs={7} className={`p-0 d-flex`}>
                <AutoCompleteDropdown searchString={claimTabData?.RoadType || ""} disabled />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Road Condition Code</Form.Label>
              </Col>

              <Col xs={7} className={`p-0 d-flex`}>
                <AutoCompleteDropdown searchString={claimTabData?.RoadCondition || ""} disabled />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={2} className="p-0 m-l-3">
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver Reported</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={!!claimTabData?.DriverReported} //  ensures 1 or "1" becomes true
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver Responsible</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="DriverResponcible"
                  name="DriverResponcible"
                  checked={claimTabData?.DriverResponcible || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver At Fault</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="driveratfault"
                  name="driveratfault"
                  checked={!!claimTabData?.DriverAtFault || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Require Drug Test</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="rdrugtest"
                  name="requiredrugtest"
                  checked={!!claimTabData?.DrugTest || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Require Alcohol Test</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="alcoholTest"
                  name="alcoholTest"
                  checked={!!claimTabData?.AlcoholTest || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Major Damage</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="majordamage"
                  name="majordamage"
                  checked={!!claimTabData?.MajorDamage || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Unit Totaled</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="unittotaled"
                  name="unittotaled"
                  checked={!!claimTabData?.Totaled || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Accident</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="Accident"
                  name="Accident"
                  checked={!!claimTabData?.Accident || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Preventable</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="preventable"
                  name="preventable"
                  checked={!!claimTabData?.Preventable || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className="col-form-label dealer-label">Injuries</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="Injuries"
                  value={claimTabData?.Injuries ?? ""}
                  name="injuries"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">DOT Reportable</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="Dotraportable"
                  name="Dotraportable"
                  checked={!!claimTabData?.DOTReportable || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver Remedial</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="driverremedial"
                  name="driverremedial"
                  checked={!!claimTabData?.DriverRemedial || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className="col-form-label dealer-label">Store Code</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="storecode"
                  name="storecode"
                  value={claimTabData?.StoreCode || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className="col-form-label dealer-label">Action</Form.Label>
              </Col>
              <Col xs={2} className={`p-0 d-flex`}>
                <input
                  type="number"
                  className={`customFormControl`}
                  id="action"
                  value={claimTabData?.Action || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Factory</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="factory"
                  name="factory"
                  checked={claimTabData?.Factory || false}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={5} className="p-0 m-l-">
            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  Our Insurance Liability Number
                </Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={claimTabData?.OurInsuranceLiabilityNumber || ""}
                  name="insuranceliabilitynumber"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Our Insurance Claim Number</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={claimTabData?.OurInsuranceClaimNumber || ""}
                  name="insuranceclaimnumber"
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-75 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Responsible Party</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="Responcibleparty"
                  name="Responcibleparty"
                  checked={!!claimTabData?.ResponcibleParty || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Responsible Party</Form.Label>
              </Col>

              <Col xs={6} className={`p-0 d-flex`} style={{ width: "250px" }}>
                <input
                  type="text"
                  className={`customFormControl`}
                  id="ResponcibleParty"
                  name="ResponcibleParty"
                  value={claimTabData?.Responsible_Name || ""}
                  disabled
                />
                <LookupButton
                  onClick={() => setShowResponsibleParty(true)}
                  disabled={!claimTabData?.ResponcibleParty}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label"></Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "250px" }}>
                <input
                  type="text"
                  className={`customFormControl`}
                  id="ResponcibleParty"
                  name="ResponcibleParty"
                  value={claimTabData?.Responsible_Address1 || ""}
                  disabled
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-r-0">
                <input
                  className="customFormControl"
                  name="ResponcibleParty"
                  value={claimTabData?.Responsible_Statecode || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-75 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Insurance Company</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="InsuranceCompany"
                  name="Insurance Company"
                  checked={!!claimTabData?.InsuranceCompany || false}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Liability Number</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="insuranceliabilitybumber"
                  name="insuranceliabilitynumber"
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  value={claimTabData?.TheirInsuranceLiabilityNumber || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Company</Form.Label>
              </Col>

              <Col xs={6} className={`p-0 d-flex`} style={{ width: "250px" }}>
                <input
                  type="text"
                  className={`customFormControl`}
                  id="insuranceCompany"
                  name="insuranceCompany"
                  value={claimTabData?.Insurance_Name || ""}
                  disabled
                />
                <LookupButton
                  onClick={() => setShowInsuranceCompany(true)}
                  disabled={!claimTabData?.InsuranceCompany}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label"></Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "250px" }}>
                <input
                  type="text"
                  className={`customFormControl`}
                  id="ad1"
                  name="ad1"
                  disabled
                  value={claimTabData?.Insurance_Address1 || ""}
                  autoComplete="one-time-code"
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-r-0">
                <input
                  className="customFormControl"
                  name="insuranceState"
                  value={claimTabData?.Insurance_Statecode || ""}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Claim Number</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  className={`customFormControl`}
                  id="insuranceclaimnumber"
                  value={claimTabData?.TheirInsuranceClaimNumber}
                  maxLength={10}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
      <ResponsibleParty show={showResponsibleParty} onHide={() => setShowResponsibleParty(false)} />

      <InsuranceCompany show={showInsuranceCompany} onHide={() => setShowInsuranceCompany(false)} />
    </Form>
  );
};

export default Claim;
