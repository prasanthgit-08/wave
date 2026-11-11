import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import ReportsFooter from "../../../../common/ReportsFooter";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import DateInputField from "../../../../common/DateInputField";
import LoadingIcon from "../../../../common/LoadingIcon";
import { parseLocalDate, formatDate, formatDatetimeToDate, normalizeDate } from "../../../../../utils/dateUtils";
import ReportsService from "../../../../../services/Reports/ReportsService";
import ModalComponent from "../../../../common/ModalComponent";
import { useSelector } from "react-redux";
import CommonFooter from "../../../../common/CommonFooter";

const ShuttleCollectionsReport = () => {
  const [division, setDivision] = useState("All");
  const [beginningDate, setBeginningDate] = useState(formatDatetimeToDate(new Date()));
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [endDate, setEndDate] = useState(formatDatetimeToDate(new Date()));
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [previewResponse, setPreviewResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);

  const loggedInUserData = useSelector((state) => state.auth.loggedInUserData);

  const buttons = [
    {
      label: "Display",
      onClick: () => {
        if (!loggedInUserData?.restrictedReportPermission) {
          setShowPreview(true);
        } else {
          fetchShuttleCollectionReport("display");
        }
      },
      disabled: loading || !isTabValid,
    },
    {
      label: "Cancel",
      onClick: () => {
        resetFormData();
      },
      disabled: loading,
    },
  ];

  const fetchShuttleCollectionReport = (type) => {
    setLoading(true);
    ReportsService.getShuttleCollectionsReport({
      division,
      beginningDate,
      endDate,
    })
      .then((response) => {
        const { data } = response;
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          setShowPreview(true);
          setPreviewResponse(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetFormData = () => {
    setDivision("All");
    setBeginningDate(formatDatetimeToDate(new Date()));
    setIsBeginningDateValid(true);
    setEndDate(formatDatetimeToDate(new Date()));
    setIsEndDateValid(true);
    setPreviewResponse(null);
  };

  // Tab Validation
  useEffect(() => {
    if (
      beginningDate &&
      isBeginningDateValid &&
      endDate &&
      isEndDateValid &&
      normalizeDate(endDate) >= normalizeDate(beginningDate)
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [beginningDate, isBeginningDateValid, endDate, isEndDateValid]);

  return (
    <QuarterScreenWrapper>
      <Header />
      {loading && <LoadingIcon />}
      {/* Form Contents */}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Beginning Date</Form.Label>
                    </Col>

                    <Col xs={2} className="p-0">
                      <DateInputField
                        date={beginningDate}
                        setDate={setBeginningDate}
                        setIsDateValid={setIsBeginningDateValid}
                        className={beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"}
                        max={endDate && parseLocalDate(endDate)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">End Date</Form.Label>
                    </Col>

                    <Col xs={2} className="p-0">
                      <DateInputField
                        date={endDate}
                        setDate={setEndDate}
                        setIsDateValid={setIsEndDateValid}
                        className={
                          endDate && isEndDateValid && normalizeDate(endDate) >= normalizeDate(beginningDate)
                            ? "borderGreen"
                            : "borderRed"
                        }
                        min={beginningDate && parseLocalDate(beginningDate)}
                        max={new Date()}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Division</Form.Label>
                    </Col>

                    <Col xs={8} className="p-0">
                      <CustomRadioGroup
                        name="division"
                        horizontal
                        horizontalAlignmentClassName="pe-4"
                        options={[
                          "All",
                          "Driveaway",
                          "Towaway",
                          "Single",
                          "Flatbed",
                          "Pop up",
                          "Truck Camper",
                        ]}
                        selectedOption={division}
                        onChange={(value) => setDivision(value)}
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
      <ModalComponent
        show={showPreview}
        onHide={() => setShowPreview(false)}
        showOK
        title={"Shuttle Collections Report"}
        body={
          <div>
            {!loggedInUserData?.restrictedReportPermission ? (
              <>
                <p>You don't have permission to view this report</p>
              </>
            ) : (
              <>
                <p>
                  Result of Shuttle Fees From {formatDate(beginningDate)} To {formatDate(endDate)}
                </p>

                <div>
                  Collected: {Number(previewResponse?.collectedAmount || 0).toFixed(2)} <br />
                  Paid: {Number(previewResponse?.paidAmount || 0).toFixed(2)}
                </div>
              </>
            )}
          </div>
        }
      />
    </QuarterScreenWrapper>
  );
};

export default ShuttleCollectionsReport;
