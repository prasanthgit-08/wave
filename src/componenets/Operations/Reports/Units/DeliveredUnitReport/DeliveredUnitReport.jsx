import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import ReportsFooter from "../../../../common/ReportsFooter";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import CustomerService from "../../../../../services/CustomerService";
import DealerService from "../../../../../services/DealerService";
import DealerLookup from "../../../../LookupScreens/Dealer/DealerLookup";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import PreviewPopup from "../../../../common/PreviewPopup";
import DeliveredUnitReportService from "../../../../../services/Reports/DeliveredUnitReportService";
import LoadingIcon from "../../../../common/LoadingIcon";
import { parseLocalDate, normalizeDate } from "../../../../../utils/dateUtils";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import ReportComponent from "../../../../common/ReportComponent";

const DeliveredUnitReport = () => {
  const [division, setDivision] = useState("All");
  const [source, setSource] = useState("Both");
  const [beginningDate, setBeginningDate] = useState(new Date());
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [endDate, setEndDate] = useState(new Date());
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [customersList, setCustomersList] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [customerInput, setCustomerInput] = useState("");
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [plantFK, setPlantFK] = useState(null);
  const [customerSisterCompanay, setCustomerSisterCompanay] = useState(null);
  const [plantName, setPlantName] = useState("");
  const [plantData, setPlantData] = useState([]);
  const [plantInput, setPlantInput] = useState("");
  const [isPlant, setIsPlant] = useState(false);
  const [isDpu, setIsDpu] = useState(false);
  const [showPlantLookup, setShowPlantLookup] = useState("");
  const [dealersList, setDealersList] = useState([]);
  const [dealerId, setDealerId] = useState(null);
  const [dealerInput, setDealerInput] = useState("");
  const [isMasterDealer, setIsMasterDealer] = useState(false);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [masterDealer, setMasterDealer] = useState(false);
  const [includeSisterDeliveredUnits, setIncludeSisterDeliveredUnits] = useState(false);
  const [includeSisterUnits, setIncludeSisterUnits] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [isTabValid, setIsTabValid] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [dealerLoading, setDealerLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);

  const DELIVERED_UNIT_REPORT_ID = process.env.REACT_APP_SP_DELIVERED_UNIT_REPORT;
  const fetchCustomersList = (string) => {
    setCustomerLoading(true);
    CustomerService.getAllCustomerByName(string)
      .then((response) => {
        const data = response.data;
        const customersList = data.content.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomersList(customersList);
      })
      .catch((err) => {})
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  const handleCustomerSelection = (customer) => {
    const sisterCompanyFK = customer.sisterCompanyFK ?? null;
    setCustomerInput(customer.name);
    setCustomerId(customer.customerPK);
    setCustomerSisterCompanay(sisterCompanyFK);
    setIncludeSisterDeliveredUnits(false);
    setIncludeSisterUnits(!!sisterCompanyFK);
    setIsPlant(customer.usePlants);
    setIsDpu(customer.dpuCustomer);
    setPlantFK(null);
    setPlantInput("");
    setShowCustomerLookup(false);
  };

  const getPlants = (string) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.getPlantsForCommonLookup({
      reportType: "Delivered Unit Report",
      customerPK: customerId || null,
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      pageSize: 100,
      sortValue: null,
      sortType: false,
      type: "Autocomplete",
    })
      .then((response) => {
        const data = response.data;
        setPlantData(data);
      })
      .catch((err) => {})
      .finally(() => {
        setPlantLoading(false);
      });
  };

  const handlePlantSelection = (item) => {
    setPlantFK(item?.customerPlantPK || item?.CustomerPlantPK);
    setPlantName(item?.name || item?.Name);
    setPlantInput(item.name?.trim() || item?.Name?.trim());
    setShowPlantLookup(false);
  };

  const fetchDealersList = (string) => {
    setDealerLoading(true);
    DealerService.getDealersForCommonLookup({
      reportType: "Delivered Unit Report",
      customerPK: customerId || null,
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: false,
      type: "Autocomplete",
    })
      .then((response) => {
        const data = response.data;
        setDealersList(data);
      })
      .catch((err) => {})
      .finally(() => {
        setDealerLoading(false);
      });
  };

  const handleDealerSelection = (dealer) => {
    setDealerInput(dealer.name?.trim());
    setDealerId(dealer.dealerPK);
    setIsMasterDealer(dealer.masterDealer);
    if (!dealer.masterDealer) {
      setMasterDealer(false);
    }
    setShowDealerLookup(false);
  };

  const returnFormData = (type) => {
    return {
      division,
      source,
      beginningDate,
      endDate,
      customerId,
      dealerId,
      masterDealer,
      includeSisterDeliveredUnits,
      includeSisterUnits,
      type: type,
    };
  };

  const resetVariables = () => {
    setDivision("All");
    setSource("Both");
    setBeginningDate(new Date());
    setIsBeginningDateValid(true);
    setEndDate(new Date());
    setIsEndDateValid(true);
    setCustomerId(null);
    setCustomerInput("");
    setPlantFK(null);
    setPlantInput("");
    setIsPlant(false);
    setIsDpu(false);
    setDealerId(null);
    setDealerInput("");
    setMasterDealer(false);
    setIncludeSisterDeliveredUnits(false);
    setIncludeSisterUnits(false);
    setCustomerSisterCompanay(null);
  };

  // Tab Validation
  useEffect(() => {
    if (
      beginningDate &&
      isBeginningDateValid &&
      endDate &&
      isEndDateValid &&
      normalizeDate(endDate) >= normalizeDate(beginningDate) &&
      (customerId || !customerInput) &&
      (dealerId || !dealerInput) &&
      (plantFK || !plantInput)
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [
    beginningDate,
    isBeginningDateValid,
    endDate,
    isEndDateValid,
    customerId,
    customerInput,
    dealerId,
    dealerInput,
    plantFK,
    plantInput,
  ]);

  const params = {
    divisionParam: division,
    sourceParam: source,
    beginningDate: beginningDate,
    endDate: endDate,
    customerFK: customerId,
    plantFK: plantFK,
    dealerFK: dealerId,
    masterDealer: masterDealer,
    includeSisterDelivered: includeSisterDeliveredUnits,
    includeSisterUnits: includeSisterUnits,
  };

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0">
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">Division</Form.Label>
                </Col>

                <Col xs={8} className="p-0">
                  <CustomRadioGroup
                    name="division"
                    horizontal
                    horizontalAlignmentClassName="pe-4"
                    options={["All", "Driveaway", "Towaway", "Single", "Flatbed", "Pop up", "Truck Camper"]}
                    selectedOption={division}
                    onChange={(value) => setDivision(value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">Source</Form.Label>
                </Col>

                <Col xs={8} className="p-0">
                  <CustomRadioGroup
                    name="source"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    options={["Both", "Outbound", "Reload"]}
                    selectedOption={source}
                    onChange={(value) => setSource(value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">Beginning Date</Form.Label>
                </Col>

                <Col xs={2} className="p-0" style={{ width: "95px" }}>
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

                <Col xs={2} className="p-0" style={{ width: "95px" }}>
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
                  <Form.Label className="customColFormLabel">Customer</Form.Label>
                </Col>

                <Col xs={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={customersList}
                    searchString={customerInput}
                    renderItemId={(customer) => customer.customerPK}
                    renderItemField={(customer) => customer.name}
                    handleSearchString={(string) => setCustomerInput(string)}
                    fetchDataBySearchString={fetchCustomersList}
                    onSelect={handleCustomerSelection}
                    selectedId={customerId}
                    clearInputCallback={() => {
                      setCustomerId(null);
                      setCustomerSisterCompanay(null);
                      setIncludeSisterUnits(false);
                      setIsPlant(false);
                      setIsDpu(false);
                    }}
                    className={customerId || !customerInput ? "" : "borderRed"}
                    maxHeight="226px"
                    loading={customerLoading}
                  />
                  <LookupButton onClick={() => setShowCustomerLookup(true)} />
                  <CustomerLookup
                    show={showCustomerLookup}
                    onHide={() => setShowCustomerLookup(false)}
                    renderItemId={(customer) => customer.customerPK}
                    handleLookupSelection={handleCustomerSelection}
                    MaintenanceProgram
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Plant</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={plantData}
                    searchString={plantInput}
                    renderItemId={(item) => item.CustomerPlantPK}
                    renderItemField={(item) => item.Name}
                    handleSearchString={(string) => setPlantInput(string)}
                    fetchDataBySearchString={getPlants}
                    onSelect={handlePlantSelection}
                    selectedId={plantFK}
                    clearInputCallback={() => {
                      setPlantFK(null);
                    }}
                    className={`${plantFK || !plantInput ? "" : "borderRed"}`}
                    maxHeight="180px"
                    loading={plantLoading}
                    disabled={!customerSisterCompanay && !!customerId && !isPlant && !isDpu}
                  />
                  <LookupButton
                    onClick={() => setShowPlantLookup(true)}
                    disabled={!customerSisterCompanay && !!customerId && !isPlant && !isDpu}
                  />
                  <CustomerPlantsLookup
                    show={showPlantLookup}
                    onHide={() => setShowPlantLookup(false)}
                    renderItemId={(plant) => plant.CustomerPlantPK}
                    renderItemField={(plant) => plant.Name}
                    handleLookupSelection={handlePlantSelection}
                    common
                    reportType={"Delivered Unit Report"}
                    customerId={customerId}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">Dealer</Form.Label>
                </Col>

                <Col xs={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={dealersList}
                    searchString={dealerInput}
                    renderItemId={(dealer) => dealer.dealerPK}
                    renderItemField={(dealer) => dealer.name?.trim()}
                    handleSearchString={(string) => setDealerInput(string)}
                    fetchDataBySearchString={fetchDealersList}
                    onSelect={handleDealerSelection}
                    selectedId={dealerId}
                    clearInputCallback={() => {
                      setDealerId(null);
                      setIsMasterDealer(false);
                      setMasterDealer(false);
                    }}
                    className={dealerId || !dealerInput ? "" : "borderRed"}
                    towardsTop
                    loading={dealerLoading}
                  />
                  <LookupButton onClick={() => setShowDealerLookup(true)} />
                  <DealerLookup
                    show={showDealerLookup}
                    onHide={() => setShowDealerLookup(false)}
                    renderItemId={(dealer) => dealer.dealerPK}
                    handleLookupSelection={handleDealerSelection}
                    common
                    customerId={customerId}
                    reportType={"Delivered Unit Report"}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">Master Dealer</Form.Label>
                </Col>

                <Col xs={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="masterDealer"
                    name="masterDealer"
                    checked={masterDealer}
                    onChange={(e) => setMasterDealer(e.target.checked)}
                    disabled={!isMasterDealer}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">Include Sister Delivered Units</Form.Label>
                </Col>

                <Col xs={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="includeSisterDeliveredUnits"
                    name="includeSisterDeliveredUnits"
                    checked={includeSisterDeliveredUnits}
                    disabled={!!customerSisterCompanay}
                    onChange={(e) => setIncludeSisterDeliveredUnits(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">Include Sister Units</Form.Label>
                </Col>

                <Col xs={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="includeSisterUnits"
                    name="includeSisterUnits"
                    disabled={!!customerSisterCompanay}
                    checked={includeSisterUnits}
                    onChange={(e) => setIncludeSisterUnits(e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        resetVariables();
      }}
      id={DELIVERED_UNIT_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};
export default DeliveredUnitReport;
