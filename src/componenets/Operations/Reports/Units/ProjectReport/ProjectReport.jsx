import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import SupplementalRatesService from "../../../../../services/SupplementalRatesService";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import ReportComponent from "../../../../common/ReportComponent";
import { removeLeadingWhitespace } from "../../../../../utils/utils";

function ProjectReport() {
  const [divisionStatus, setDivisionStatus] = useState("all");
  const [source, setSource] = useState("both");
  const [projectCode, setProjectCode] = useState("");
  const [customerFK, setCustomerFK] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [customerInput, setCustomerInput] = useState("");
  const [showCustomerLookup, setShowCustomerLookup] = useState("");
  const [showCost, setShowCost] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [showDriver, setShowDriver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);

  const PROJECT_REPORT_ID = process.env.REACT_APP_SP_PROJECT_REPORT;

  const getCustomers = (string) => {
    setCustomerLoading(true);
    SupplementalRatesService.fetchCustomerAutoComplete(string)
      .then((response) => {
        const data = response.data.content;
        const customerList = data?.map((customers) => ({
          ...customers,
          name: customers.name?.trim(),
        }));
        setCustomerData(customerList);
      })
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  const handleCustomerSelection = (item) => {
    setCustomerFK(item.customerPK);
    setCustomerName(item.name);
    setCustomerInput(item.name?.trim());
  };

  const resetCustomerVariables = () => {
    setCustomerFK(null);
    setCustomerName("");
  };

  const handleCustomerLookup = () => {
    setShowCustomerLookup(true);
  };

  const handleCustomerLookupSelection = (item) => {
    setCustomerFK(item.customerPK);
    setCustomerName(item.name);
    setCustomerInput(item.name?.trim());
    setShowCustomerLookup(false);
  };

  const returnFormData = () => {
    return {
      divisionParam: divisionStatus,
      sourceParam: source,
      projectCode: projectCode?.trim(),
      customerId: customerFK || null,
      showCost: showCost,
      canceled: canceled,
      showDriver: showDriver,
    };
  };

  const resetAllVariables = () => {
    setDivisionStatus("all");
    setSource("both");
    setCustomerFK(null);
    setCustomerName("");
    setShowCost(false);
    setShowDriver(false);
    setCanceled(false);
    setProjectCode("");
    setCustomerInput("");
  };

  // Tab Validation
  useEffect(() => {
    if (projectCode?.trim() && (customerFK || !customerInput)) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [projectCode, customerFK, customerInput]);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-5">
            <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mb-3 mt-3">
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Division</Form.Label>
              </Col>

              <Col xs={8} className="p-0 ">
                <CustomRadioGroup
                  name="division"
                  horizontal
                  horizontalAlignmentClassName="pe-4"
                  selectedOption={divisionStatus}
                  onChange={(value) => setDivisionStatus(value)}
                  options={[
                    { value: "all", label: "All", width: "70px" },
                    { value: "driveAway", label: "Driveaway", disabled: false },
                    { value: "towaway", label: "Towaway", disabled: false },
                    { value: "single", label: "Single", disabled: false },
                    { value: "flatBed", label: "Flatbed", disabled: false },
                    { value: "popup", label: "Pop Up", disabled: false },
                    { value: "truckcamper", label: "Truck Camper", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mb-3">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Source</Form.Label>
              </Col>

              <Col sm={8} md={8} xs={8} className="p-0 ">
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

            <Form.Group className={`m-b-10 align-items-center row m-l-5 m-r-0 m-t-3`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label">Project</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <input
                  className={`customFormControl ${!!projectCode ? "borderGreen" : "borderRed"}`}
                  id="projectCode"
                  name="projectCode"
                  type="text"
                  value={projectCode}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onInput={(e) => {
                    setProjectCode(removeLeadingWhitespace(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`m-b-10 align-items-center row m-l-5 m-r-0 mt-3`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label">Customer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={customerData}
                  searchString={customerInput}
                  renderItemId={(item) => item.customerPK}
                  renderItemField={(item) => item.name}
                  handleSearchString={(string) => setCustomerInput(string)}
                  fetchDataBySearchString={getCustomers}
                  onSelect={handleCustomerSelection}
                  selectedId={customerFK}
                  clearInputCallback={() => {
                    setCustomerFK("");
                  }}
                  handleAutoCompleteClose={resetCustomerVariables}
                  className={`customFormControl ${customerFK === "" && customerInput !== "" ? "borderRed" : ""}`}
                  loading={customerLoading}
                />
                <LookupButton onClick={handleCustomerLookup} />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mt-3">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label">Show Cost</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="showCost"
                  name="showCost"
                  checked={showCost}
                  onChange={(e) => {
                    setShowCost(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mt-3">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label">Canceled</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="canceled"
                  name="canceled"
                  checked={canceled}
                  onChange={(e) => {
                    setCanceled(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mt-3">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label">Show Driver</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="showDriver"
                  name="showDriver"
                  checked={showDriver}
                  onChange={(e) => {
                    setShowDriver(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <CustomerLookup
              show={showCustomerLookup}
              onHide={() => setShowCustomerLookup(false)}
              renderItemId={(customer) => customer.customerPK}
              renderItemField={(customer) => customer.name}
              handleLookupSelection={handleCustomerLookupSelection}
              MaintenanceProgram
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={resetAllVariables}
      id={PROJECT_REPORT_ID}
      isTabValid={isTabValid}
      payload={returnFormData()}
      useType={true}
    />
  );
}

export default ProjectReport;
