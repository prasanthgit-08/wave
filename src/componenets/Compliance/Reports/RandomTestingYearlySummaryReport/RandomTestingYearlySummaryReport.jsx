import { useEffect, useState } from "react";
import Select from "react-select";
import ReportsService from "../../../../services/Reports/ReportsService";
import toast from "react-hot-toast";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import LoadingIcon from "../../../common/LoadingIcon";
import { Col, Row, Form } from "react-bootstrap";
import ReportsFooter from "../../../common/ReportsFooter";
import PreviewPopup from "../../../common/PreviewPopup";
import CustomRadioGroup from "../../../common/CustomRadioGroup";

const RandomTestingYearlySummaryReport = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [driversToInclude, setDriversToInclude] = useState("Both");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState(null);
  const [isTabValid, setIsTabValid] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setSelectedYear({ value: currentYear, label: currentYear.toString() });
  }, []);

  useEffect(() => {
    setIsTabValid(selectedYear !== null);
  }, [selectedYear]);

  const returnFormData = (type) => ({
    year: selectedYear?.value,
    driversToInclude: driversToInclude,
    type: type,
  });

  const getSummeryReport = (type) => {
    setLoading(true);
    setBase64PDF(null);
    ReportsService.getSummeryReport(returnFormData(type))
      .then((response) => {
        const { data } = response;
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.errorMessage);
          if (data.content) {
            if (type === "display") {
              setShowPreview(true);
              setBase64PDF(data.content);
            }
          }
        }
      })
      .catch((err) => {
        toast.error("Something went wrong while generating report.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetAllVariables = () => {
    const currentYear = new Date().getFullYear();
    setSelectedYear({ value: currentYear, label: currentYear.toString() });
    setDriversToInclude("Both");
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 11 }, (_, i) => {
      const year = currentYear - i;
      return { value: year, label: year.toString() };
    });
  };

  return (
    <QuarterScreenWrapper>
      <Header />
      {loading && <LoadingIcon />}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10 p-15 w-100">
            <Row className="m-0 p-10">
              <Col xs={11}>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Year</Form.Label>
                  </Col>
                  <Col xs={5} className="p-0 d-flex">
                    <Select
                      options={generateYearOptions()}
                      value={selectedYear}
                      onChange={(option) => setSelectedYear(option)}
                      placeholder="Select Year"
                      className="w-100"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Drivers To Include</Form.Label>
                  </Col>

                  <Col xs={8} className="p-0">
                    <CustomRadioGroup
                      name="driversToInclude"
                      horizontal
                      horizontalAlignmentClassName="pe-4"
                      defaultWidth={"85px"}
                      options={[
                        { value: "Both", label: "Both" },
                        { value: "CDL", label: "CDL" },
                        { value: "NonCDL", label: "Non-CDL" },
                      ]}
                      selectedOption={driversToInclude}
                      onChange={(value) => {
                        setDriversToInclude(value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <ReportsFooter
        displayDisabled={loading || !isTabValid}
        emailExcelDisabled={loading || !isTabValid}
        emailPdfDisabled={loading || !isTabValid}
        printDisabled={loading || !isTabValid}
        cancelDisabled={false}
        onDisplayClick={() => getSummeryReport("display")}
        onEmailExcelClick={() => getSummeryReport("emailExcel")}
        onEmailPdfClick={() => getSummeryReport("emailPdf")}
        onPrintClick={() => getSummeryReport("display")}
        onCancelClick={resetAllVariables}
      />

      <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
    </QuarterScreenWrapper>
  );
};

export default RandomTestingYearlySummaryReport;
