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
import { normalizeDate } from "../../../../../utils/dateUtils";

const UnitPickupExtensionReport = () => {
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

  const fetchCustomersList = (string) => {
    CustomerService.getAllCustomerByName(string)
      .then((response) => {
        const data = response.data;
        const customersList = data.content.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomersList(customersList);
      })
      .catch((err) => {});
  };

  const handleCustomerSelection = (customer) => {
    setCustomerInput(customer.name);
    setCustomerId(customer.customerPK);
    setIncludeSisterUnits(false);
    setShowCustomerLookup(false);
  };

  const fetchDealersList = (string) => {
    DealerService.fetchAllDealerDetailsByName(string)
      .then((response) => {
        const data = response.data;
        const dealerList = data.content?.map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
        setDealersList(dealerList);
      })
      .catch((err) => {});
  };

  const handleDealerSelection = (dealer) => {
    setDealerInput(dealer.name);
    setDealerId(dealer.dealerPK);
    if (dealer.masterDealer) {
      setIsMasterDealer(dealer.masterDealer);
    } else {
      setIsMasterDealer(dealer.masterDealer);
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

  const fetchDeliveredUnitReport = (type) => {
    setLoading(true);
    DeliveredUnitReportService.getDeliveredUnitReport(returnFormData(type))
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
      .finally(() => {
        setLoading(false);
      });
  };

  const resetFormData = () => {
    setDivision("All");
    setSource("Both");
    setBeginningDate(new Date());
    setIsBeginningDateValid(true);
    setEndDate(new Date());
    setIsEndDateValid(true);
    setCustomerId(null);
    setCustomerInput("");
    setDealerId(null);
    setDealerInput("");
    setMasterDealer(false);
    setIncludeSisterDeliveredUnits(false);
    setIncludeSisterUnits(false);
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
      (dealerId || !dealerInput)
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
  ]);

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
                      <Form.Label className="customColFormLabel">Yard</Form.Label>
                    </Col>

                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                      // arrayList={customersList}
                      // searchString={customerInput}
                      // renderItemId={(customer) => customer.customerPK}
                      // renderItemField={(customer) => customer.name}
                      // handleSearchString={(string) => setCustomerInput(string)}
                      // fetchDataBySearchString={fetchCustomersList}
                      // onSelect={handleCustomerSelection}
                      // selectedId={customerId}
                      // clearInputCallback={() => setCustomerId(null)}
                      // className={customerId || !customerInput ? '' : 'borderRed'}
                      // maxHeight='226px'
                      />
                      <LookupButton /* onClick={() => setShowCustomerLookup(true)} */ />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                    </Col>

                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                      // arrayList={dealersList}
                      // searchString={dealerInput}
                      // renderItemId={(dealer) => dealer.dealerPK}
                      // renderItemField={(dealer) => dealer.name}
                      // handleSearchString={(string) => setDealerInput(string)}
                      // fetchDataBySearchString={fetchDealersList}
                      // onSelect={handleDealerSelection}
                      // selectedId={dealerId}
                      // clearInputCallback={() => {
                      //   setDealerId(null);
                      //   setIsMasterDealer(false);
                      //   setMasterDealer(false);
                      // }}
                      // className={dealerId || !dealerInput ? '' : 'borderRed'}
                      // maxHeight='180px'
                      />
                      <LookupButton /* onClick={() => setShowDealerLookup(true)} */ />
                      {/* <DealerLookup
                        show={showDealerLookup}
                        onHide={() => setShowDealerLookup(false)}
                        renderItemId={(dealer) => dealer.dealerPK}
                        handleLookupSelection={handleDealerSelection}
                        MaintenanceProgram
                      /> */}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Driver</Form.Label>
                    </Col>

                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                      // arrayList={dealersList}
                      // searchString={dealerInput}
                      // renderItemId={(dealer) => dealer.dealerPK}
                      // renderItemField={(dealer) => dealer.name}
                      // handleSearchString={(string) => setDealerInput(string)}
                      // fetchDataBySearchString={fetchDealersList}
                      // onSelect={handleDealerSelection}
                      // selectedId={dealerId}
                      // clearInputCallback={() => {
                      //   setDealerId(null);
                      //   setIsMasterDealer(false);
                      //   setMasterDealer(false);
                      // }}
                      // className={dealerId || !dealerInput ? '' : 'borderRed'}
                      // maxHeight='180px'
                      />
                      <LookupButton /* onClick={() => setShowDealerLookup(true)} */ />
                      {/* <DealerLookup
                        show={showDealerLookup}
                        onHide={() => setShowDealerLookup(false)}
                        renderItemId={(dealer) => dealer.dealerPK}
                        handleLookupSelection={handleDealerSelection}
                        MaintenanceProgram
                      /> */}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Delivery States</Form.Label>
                    </Col>

                    <Col xs={5} className="p-0">
                      <input
                        className={`customFormControl`}
                        id="deliveryStates"
                        name="deliveryStates"
                        type="text"
                        // value={deliveryStates}
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        // onChange={(e) => {
                        //   setProjectCode(e.target.value);
                        // }}
                        // disabled={viewDetail}
                      />
                      {/* <DealerLookup
                        show={showDealerLookup}
                        onHide={() => setShowDealerLookup(false)}
                        renderItemId={(dealer) => dealer.dealerPK}
                        handleLookupSelection={handleDealerSelection}
                        MaintenanceProgram
                      /> */}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Customer</Form.Label>
                    </Col>

                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                      // arrayList={dealersList}
                      // searchString={dealerInput}
                      // renderItemId={(dealer) => dealer.dealerPK}
                      // renderItemField={(dealer) => dealer.name}
                      // handleSearchString={(string) => setDealerInput(string)}
                      // fetchDataBySearchString={fetchDealersList}
                      // onSelect={handleDealerSelection}
                      // selectedId={dealerId}
                      // clearInputCallback={() => {
                      //   setDealerId(null);
                      //   setIsMasterDealer(false);
                      //   setMasterDealer(false);
                      // }}
                      // className={dealerId || !dealerInput ? '' : 'borderRed'}
                      // maxHeight='180px'
                      />
                      <LookupButton /* onClick={() => setShowDealerLookup(true)} */ />
                      {/* <DealerLookup
                        show={showDealerLookup}
                        onHide={() => setShowDealerLookup(false)}
                        renderItemId={(dealer) => dealer.dealerPK}
                        handleLookupSelection={handleDealerSelection}
                        MaintenanceProgram
                      /> */}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Plants</Form.Label>
                    </Col>

                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                      // arrayList={dealersList}
                      // searchString={dealerInput}
                      // renderItemId={(dealer) => dealer.dealerPK}
                      // renderItemField={(dealer) => dealer.name}
                      // handleSearchString={(string) => setDealerInput(string)}
                      // fetchDataBySearchString={fetchDealersList}
                      // onSelect={handleDealerSelection}
                      // selectedId={dealerId}
                      // clearInputCallback={() => {
                      //   setDealerId(null);
                      //   setIsMasterDealer(false);
                      //   setMasterDealer(false);
                      // }}
                      // className={dealerId || !dealerInput ? '' : 'borderRed'}
                      // maxHeight='180px'
                      />
                      <LookupButton /* onClick={() => setShowDealerLookup(true)} */ />
                      {/* <DealerLookup
                        show={showDealerLookup}
                        onHide={() => setShowDealerLookup(false)}
                        renderItemId={(dealer) => dealer.dealerPK}
                        handleLookupSelection={handleDealerSelection}
                        MaintenanceProgram
                      /> */}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Select By</Form.Label>
                    </Col>

                    <Col xs={3} className="p-0">
                      <CustomRadioGroup
                        name="selectBy"
                        horizontal
                        horizontalAlignmentClassName="pe-3"
                        options={[
                          { value: "pickupDate", label: "Pickup Date" },
                          { value: "dispatchDate", label: "Dispatch Date" },
                        ]}
                      />
                    </Col>
                    <Col xs={2} className="p-0" style={{ marginLeft: "70px" }}>
                      <Form.Label className="customColFormLabel">Show Todays Dispatches</Form.Label>
                    </Col>
                    <div style={{ width: "40px" }} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="includeSisterDeliveredUnits"
                        name="includeSisterDeliveredUnits"
                        checked={includeSisterDeliveredUnits}
                        onChange={(e) => setIncludeSisterDeliveredUnits(e.target.checked)}
                      />
                    </div>
                    <div style={{ width: "90px" }} className="p-0">
                      <Form.Label className="customColFormLabel">Show Notes</Form.Label>
                    </div>
                    <Col xs={1} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="includeSisterUnits"
                        name="includeSisterUnits"
                        disabled={customerId}
                        checked={includeSisterUnits}
                        onChange={(e) => setIncludeSisterUnits(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>

                  {/* <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Show Todays Dispatches</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="includeSisterDeliveredUnits"
                        name="includeSisterDeliveredUnits"
                        checked={includeSisterDeliveredUnits}
                        onChange={(e) => setIncludeSisterDeliveredUnits(e.target.checked)}
                      />
                    </Col>
                  </Form.Group> */}

                  {/* <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Show Notes</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="includeSisterUnits"
                        name="includeSisterUnits"
                        disabled={customerId}
                        checked={includeSisterUnits}
                        onChange={(e) => setIncludeSisterUnits(e.target.checked)}
                      />
                    </Col>
                  </Form.Group> */}

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Dispatch Minimum Priority</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <input
                        type="number"
                        className="customFormControl"
                        id="dispatchMinimumPriority"
                        name="dispatchMinimumPriority"
                        // disabled={customerId}
                        // checked={includeSisterUnits}
                        // onChange={(e) => setIncludeSisterUnits(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
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
        onDisplayClick={() => fetchDeliveredUnitReport("display")}
        onEmailExcelClick={() => fetchDeliveredUnitReport("emailExcel")}
        onEmailPdfClick={() => fetchDeliveredUnitReport("emailPdf")}
        onPrintClick={() => fetchDeliveredUnitReport("display")}
        onCancelClick={() => resetFormData()}
      />
      <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
    </QuarterScreenWrapper>
  );
};

export default UnitPickupExtensionReport;
