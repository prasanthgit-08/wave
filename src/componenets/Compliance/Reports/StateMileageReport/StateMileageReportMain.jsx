import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import LoadingIcon from "../../../common/LoadingIcon";
import { Col, Form } from "react-bootstrap";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DateInputField from "../../../common/DateInputField";
import ReportsFooter from "../../../common/ReportsFooter";
import PreviewPopup from "../../../common/PreviewPopup";
import StateMileageReportService from "../../../../services/Reports/StateMileageReportService";
import { parseLocalDate, formatDatetimeToDate } from "../../../../utils/dateUtils";

const StateMileageReportMain = () => {
  const [division, setDivision] = useState("all");
  const [source, setSource] = useState("both");
  const [beginningDate, setBeginningDate] = useState(new Date());
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [endDate, setEndDate] = useState(formatDatetimeToDate(new Date()));
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isBeginningDateModified, setIsBeginningDateModified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();

  useEffect(() => {
    if (!isBeginningDateModified) {
      const newBeginningdate = parseLocalDate(endDate);
      newBeginningdate.setDate(newBeginningdate.getDate() - 30);
      setBeginningDate(formatDatetimeToDate(newBeginningdate));
    }
  }, []);

  const returnFormData = (type) => {
    return {
      division,
      source,
      beginningDate: beginningDate ? beginningDate : null,
      endDate: endDate ? endDate : null,
      type: type,
    };
  };

  const fetchStateMileageReport = (type) => {
    setLoading(true);
    StateMileageReportService.getStateMileageReport(returnFormData(type))
      .then((response) => {
        const { data } = response;
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.errorMessage);
          if (data.fileContent) {
            setShowPreview(true);
            setBase64PDF(data.fileContent);
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const resetFormData = () => {
    setDivision("all");
    setSource("both");
    const newBeginningdate = parseLocalDate(endDate);
    newBeginningdate.setDate(newBeginningdate.getDate() - 30);
    setBeginningDate(formatDatetimeToDate(newBeginningdate));
    setIsBeginningDateValid(true);
    setEndDate(formatDatetimeToDate(new Date()));
    setIsEndDateValid(true);
  };

  //tab validation

  useEffect(() => {
    if (beginningDate && isBeginningDateValid && endDate && isEndDateValid) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [beginningDate, isBeginningDateValid, endDate, isEndDateValid]);
  return (
    <QuarterScreenWrapper>
      <Header />
      {loading && <LoadingIcon />}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0 m-l-5">
              <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Division</Form.Label>
                </Col>

                <Col xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="division"
                    horizontal
                    horizontalAlignmentClassName="pe-4"
                    selectedOption={division}
                    onChange={(value) => setDivision(value)}
                    options={[
                      { value: "all", label: "All", width: "70px" },
                      { value: "driveaway", label: "Driveaway", disabled: false },
                      { value: "towaway", label: "Towaway", disabled: false },
                      { value: "single", label: "Single", disabled: false },
                      { value: "flatbed", label: "Flatbed", disabled: false },
                      { value: "popUp", label: "Pop Up    ", disabled: false },
                      { value: "truckCamper", label: "Truck Camper", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mb-3">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Source</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="source"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={source}
                    onChange={(value) => setSource(value)}
                    options={[
                      { value: "both", label: "Both", width: "70px" },
                      { value: "outbound", label: "Outbound", width: "95px" },
                      { value: "reload", label: "Reload", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-4 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                  <DateInputField
                    date={beginningDate}
                    max={endDate ? parseLocalDate(endDate) : ""}
                    setDate={(date) => {
                      setBeginningDate(formatDatetimeToDate(date));
                      setIsBeginningDateModified(true);
                    }}
                    setIsDateValid={setIsBeginningDateValid}
                    className={beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-4 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">End Date</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                  <DateInputField
                    min={beginningDate ? parseLocalDate(beginningDate) : ""}
                    date={endDate}
                    setDate={(date) => setEndDate(formatDatetimeToDate(date))}
                    setIsDateValid={setIsEndDateValid}
                    className={endDate && isEndDateValid ? "borderGreen" : "borderRed"}
                    max={new Date()}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <ReportsFooter
        displayDisabled={loading || !isTabValid}
        emailExcelDisabled={loading || !isTabValid}
        emailPdfDisabled={loading || !isTabValid}
        printDisabled={loading || !isTabValid}
        cancelDisabled={loading}
        onDisplayClick={() => fetchStateMileageReport("display")}
        onEmailExcelClick={() => fetchStateMileageReport("emailExcel")}
        onEmailPdfClick={() => fetchStateMileageReport("emailPdf")}
        onPrintClick={() => fetchStateMileageReport("display")}
        onCancelClick={() => resetFormData()}
      />

      <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
    </QuarterScreenWrapper>
  );
};

export default StateMileageReportMain;
