/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import ReportsFooter from "../../../../common/ReportsFooter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDriverListingReportPayload } from "../../../../../redux/Reports/DriverListingReportSlice";
import CommonFooter from "../../../../common/CommonFooter";

const DriverListingReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [driverOrTrucks, setDriverOrTrucks] = useState("Drivers");
  const [driverStatus, setDriverStatus] = useState("Both");
  const [isTabValid, setIsTabValid] = useState(false);
  const [navigateToNext, setNavigateToNext] = useState(false);

  const buttons = [
    {
      label: "Next",
      onClick: () => {
        setNavigateToNext(true);
      },
      disabled: !isTabValid,
    },
    { label: "Cancel", onClick: () => resetForm() },
  ];

  const driverListingReportPayload = useSelector(
    (state) => state.driverListingReport.driverListingReportPayload
  );

  const resetForm = () => {
    setDriverOrTrucks("Drivers");
    setDriverStatus("Both");
  };

  // Persist previous state
  useEffect(() => {
    if (driverListingReportPayload) {
      setDriverOrTrucks(driverListingReportPayload?.driverOrTrucks);
      setDriverStatus(driverListingReportPayload?.driverStatus);
    }
  }, [driverListingReportPayload]);

  // Update Payload object for API call
  useEffect(() => {
    if (navigateToNext) {
      dispatch(
        setDriverListingReportPayload({
          driverOrTrucks,
          driverStatus,
          navigateToNext,
        })
      );
      navigate("/driver-listing-report-view");
    }
  }, [driverOrTrucks, driverStatus, navigateToNext]);

  // Tab Validation
  useEffect(() => {
    if (driverOrTrucks) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [driverOrTrucks]);

  return (
    <QuarterScreenWrapper>
      <Header closeHandler={() => dispatch(setDriverListingReportPayload())} />
      {/* Form Contents */}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Driver or Trucks</Form.Label>
                    </Col>

                    <Col xs={8} className="p-0">
                      <CustomRadioGroup
                        name="divisionValue"
                        horizontal
                        horizontalAlignmentClassName="pe-4"
                        defaultWidth={"75px"}
                        options={[
                          { value: "Drivers", label: "Drivers" },
                          { value: "DriverTrucks", label: "Trucks" },
                        ]}
                        selectedOption={driverOrTrucks}
                        onChange={(value) => setDriverOrTrucks(value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Driver Status</Form.Label>
                    </Col>

                    <Col xs={8} className="p-0">
                      <CustomRadioGroup
                        name="driverStatus"
                        horizontal
                        horizontalAlignmentClassName="pe-4"
                        defaultWidth={"75px"}
                        options={["Both", "Active", "Inactive"]}
                        selectedOption={driverStatus}
                        onChange={(value) => setDriverStatus(value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter buttons={buttons} />
    </QuarterScreenWrapper>
  );
};

export default DriverListingReport;
