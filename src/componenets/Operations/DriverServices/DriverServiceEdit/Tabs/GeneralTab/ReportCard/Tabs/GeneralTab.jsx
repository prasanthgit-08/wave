import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import ReportCardService from "../../../../../../../../services/ReportCardService";
import { useParams } from "react-router-dom";
import { setFormData } from "../../../../../../../../redux/DriverReportCardSlice";
import formatDatetimeToDate from "../../../../../../../../utils/formatDateTimeToDate";
import Input from "../../../../../../../../components/common/input";

const GeneralTab = () => {
  const dispatch = useDispatch();

  const { driverId } = useParams();

  const [isFromDateValid, setIsFromDateValid] = useState(true);
  const [isToDateValid, setIsToDateValid] = useState(true);

  const formData = useSelector((state) => state.driverReportCard.formData);

  const mergeObjects = (obj1, obj2) => {
    const result = { ...obj1 };
    for (const key in obj2) {
      if (obj2[key] !== null) {
        result[key] = obj2[key];
      }
    }
    return result;
  };

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    if (to || from) {
      ReportCardService.updateByFromAndTo(driverId, to || formData.to, from || formData.from).then(
        ({ data }) => {
          dispatch(setFormData(mergeObjects(formData, data)));
        }
      );
    }
  }, [from, to]);

  return (
    <div>
      {formData.length !== 0 && (
        <Form>
          <Row className="m-0 p-0">
            {/* First Column */}
            <Col sm={5} md={5} lg={5} xl={5} xs={5}>
              {/* Original Hire Date */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Original Hire Date</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="hireDate" date={formData.hireDate} disabled />
                </Col>
              </Form.Group>

              {/* Last Hire Date */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Last Hire Date</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="lastHireDate" date={formData.reHireDate} disabled />
                </Col>
              </Form.Group>

              {/*Driver Qual*/}
              <Form.Group className=" form-group mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Driver Qual</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "80px" }}>
                  <input
                    disabled={true}
                    className="customFormControl"
                    name="driverQual"
                    value={formData.driverQual}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>

              {/* Safety School */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Safety School</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="safetySchool" date={formData.safetySchool} disabled />
                </Col>
              </Form.Group>

              {/* Smart Simulator */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Smart Simulator</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="smartSimulator" date={formData.smartSimulator} disabled />
                </Col>
              </Form.Group>

              {/* DOT Physcial */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">DOT Physcial</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="dotPhysical" date={formData.dotPhysical} disabled />
                </Col>
              </Form.Group>

              {/* Annual Review */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Annual Review</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="annualReview" date={formData.annualReview} disabled />
                </Col>
              </Form.Group>

              {/* Last MVR */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Last MVR</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="lastMvr" date={formData.lastMVR} disabled />
                </Col>
              </Form.Group>

              {/* Plate Expire */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Plate Expire</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="expirePlate" date={formData.plateExpire} disabled />
                </Col>
              </Form.Group>

              {/* Last Adverse Inspection */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Last Adverse Inspection</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField
                    name="lastAdverseInspection"
                    date={formData.lastAdverseInspection}
                    disabled
                  />
                </Col>
              </Form.Group>

              {/* Last Chargable Damage */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Last Chargable Damage</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="lastChargeableDamage" date={formData.lastChargableDamage} disabled />
                </Col>
              </Form.Group>
            </Col>

            {/* Second Column */}
            <Col sm={7} md={7} lg={7} xl={7} xs={7}>
              {/* Last Damage Claim */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">Last Damage Claim</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="lastDamageClaim" date={formData.lastDamageClaim} disabled />
                </Col>
              </Form.Group>

              {/* Damage Claims Last 30D */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">Damage Claims Last 30D</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "50px" }}>
                  <Input
                    disabled={true}
                    className="customFormControl"
                    name="damageClaimsLast30D"
                    value={formData.damageClaimsLast30D}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>

              {/*Damage Claims Last 12M*/}
              <Form.Group className=" form-group mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">Damage Claims Last 12M</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "50px" }}>
                  <Input
                    disabled={true}
                    className="customFormControl"
                    name="damageClaimsLast12M"
                    value={formData.damageClaimsLast12M}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>

              {/* Last Bad DOT */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">Last Bad DOT</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "112.5px" }}>
                  <DateInputField name="lastBadDOT" date={formData.lastBadDOT} disabled />
                </Col>
              </Form.Group>

              {/* Bad DOT Last 30D */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">Bad DOT Last 30D</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "50px" }}>
                  <Input
                    disabled={true}
                    className="customFormControl"
                    name="badDOTLast30D"
                    value={formData.badDOTLast30D}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>

              {/* Bad DOT Last 12M */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">Bad DOT Last 12M</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "50px" }}>
                  <Input
                    disabled={true}
                    className="customFormControl"
                    name="badDOTLast12M"
                    value={formData.badDOTLast12M}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>

              <Row className="d-flex">
                <Col xs={7} md={7} sm={7} className="d-flex">
                  {/* From */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 ">
                    <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                      <Form.Label className="col-form-label dealer-label">From</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "112.5px" }}>
                      <DateInputField
                        name="from"
                        date={from ? from : formData.from}
                        setDate={setFrom}
                        setIsDateValid={setIsFromDateValid}
                        handleCalendarOnChange={(e) => {
                          dispatch(setFormData({ ...formData, from: e.target.value }));
                        }}
                        className={`${(from || formData.from) && isFromDateValid ? "borderGreen" : "borderRed"}`}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col xs={5} md={5} sm={5} className="d-flex">
                  {/* To */}
                  <Form.Group className="mt-2 align-items-center row  ">
                    <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "40px" }}>
                      <Form.Label className="col-form-label dealer-label">To</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "112.5px" }}>
                      <DateInputField
                        name="to"
                        date={to ? to : formatDatetimeToDate(formData.to)}
                        setDate={setTo}
                        setIsDateValid={setIsToDateValid}
                        handleCalendarOnChange={(e) => {
                          dispatch(setFormData({ ...formData, to: e.target.value }));
                        }}
                        className={`${(to || formData.to) && isToDateValid ? "borderGreen" : "borderRed"}`}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              {/* Damage Claims  */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">Damage Claims</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "50px" }}>
                  <Input
                    disabled={true}
                    className="customFormControl"
                    name="damageClaims"
                    value={formData.damageClaims}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>

              {/* Company Paid */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">Company Paid</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "80px" }}>
                  <Input
                    disabled={true}
                    className="customFormControl"
                    name="companyPaid"
                    value={formData.companyPaid}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>

              {/* Bad DOT Inspections */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">Bad DOT Inspections</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "50px" }}>
                  <Input
                    disabled={true}
                    className="customFormControl"
                    name="badDOTInspections"
                    value={formData.badDOTs}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>

              {/* DOT Fines */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "135px" }}>
                  <Form.Label className="col-form-label dealer-label">DOT Fines</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "80px" }}>
                  <Input
                    disabled={true}
                    className="customFormControl"
                    name="dotFines"
                    value={formData.dotfines}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default GeneralTab;
