import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import DateInputField from "../../../../common/DateInputField";
import CustomerService from "../../../../../services/CustomerService";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import LoadingIcon from "../../../../common/LoadingIcon";
import ReportComponent from "../../../../common/ReportComponent";

function UnitListingByDate() {
  const [divisionStatus, setDivisionStatus] = useState("all");
  const [source, setSource] = useState("both");
  const [customerFK, setCustomerFK] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [customerInput, setCustomerInput] = useState("");
  const [showCustomerLookup, setShowCustomerLookup] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [isCurrentDateValid, setIsCurrentDateValid] = useState(true);
  const [plantFK, setPlantFK] = useState(null);
  const [plantData, setPlantData] = useState([]);
  const [plantInput, setPlantInput] = useState("");
  const [showPlantLookup, setShowPlantLookup] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [usePlants, setUsePlants] = useState(false);
  const [dpuCustomer, setDpuCustomer] = useState(false);

  const isPlantDisabled = !!customerFK && !usePlants && !dpuCustomer;

  const UNIT_LISTING_BY_DATE_REPORT_ID = process.env.REACT_APP_SP_REPORT_UNIT_LISTING_BY_DATE_REPORT;

  const getCustomers = (string) => {
    setCustomerLoading(true);
    CustomerService.getCustomersForCommonLookup({
      plantId: plantFK,
      searchTerms: string,
      pageSize: 100,
      selectedSearchCriteria: "Beginning",
    })
      .then((response) => {
        setCustomerData(response?.data);
      })
      .catch(() => {})
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  const getPlants = (string) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.getCustomerPlantsForReport(
      customerFK,
      "Beginning",
      string,
      0,
      null,
      false,
      "Autocomplete",
      100
    )
      .then((response) => {
        const data = response.data;
        setPlantData(data?.slice(0, response?.data?.length - 1));
      })
      .catch((err) => {})
      .finally(() => {
        setPlantLoading(false);
      });
  };

  const handleCustomerSelection = (customer) => {
    setCustomerFK(customer.CustomerPK);
    setCustomerInput(customer.Name?.trim() || customer.Description?.trim());
    setUsePlants(customer?.UsePlants);
    setDpuCustomer(customer?.DPUCustomer);
    setShowCustomerLookup(false);

    // Customer neither uses plants nor is a DPU customer, so clear the plant
    if (!customer?.UsePlants && !customer?.DPUCustomer) {
      setPlantFK(null);
      setPlantInput("");
    }
  };

  const handlePlantSelection = (item) => {
    setPlantFK(item?.customerPlantPK || item?.CustomerPlantPK);
    setPlantInput(item.name?.trim() || item?.Name?.trim());
  };

  const handleUserLookup = () => {
    setShowCustomerLookup(true);
  };

  const handlePlantLookup = () => {
    setShowPlantLookup(true);
  };

  const handlePlantLookupSelection = (item) => {
    setPlantFK(item.customerPlantPK);
    setPlantInput(item.name?.trim());
    setShowPlantLookup(false);
  };

  const returnFormData = (type) => {
    return {
      divisionParam: divisionStatus,
      sourceParam: source,
      reportDate: orderDate,
      customerId: customerFK || null,
      plantId: plantFK || null,
      type: type,
    };
  };

  const resetAllVariables = () => {
    setDivisionStatus("all");
    setSource("both");
    setOrderDate("");
    setCustomerFK(null);
    setCustomerInput("");
    setUsePlants(false);
    setDpuCustomer(false);
    setPlantFK(null);
    setPlantInput("");
  };

  // Tab Validation
  useEffect(() => {
    if (orderDate && isCurrentDateValid && (customerFK || !customerInput) && (plantFK || !plantInput)) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [orderDate, isCurrentDateValid, customerFK, customerInput, plantFK, plantInput]);

  const body = (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight  p-2">
        <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
          <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "210px" }}>
            <Form.Label htmlFor="name" className="col-form-label dealer-label">
              Division
            </Form.Label>
          </Col>

          <Col xs={8} md={8} sm={8} style={{ right: "300 px" }} className="px-0">
            <CustomRadioGroup
              name="divisionValue"
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

        <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
          <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "210px" }}>
            <Form.Label htmlFor="name" className="col-form-label dealer-label">
              Source
            </Form.Label>
          </Col>

          <Col xs={7} md={7} sm={7} style={{ right: "300 px" }} className="px-0">
            <CustomRadioGroup
              name="sourceValue"
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

        <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
          <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "210px" }}>
            <Form.Label className="col-form-label dealer-label">Date</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0 d-flex">
            <DateInputField
              name="orderDate"
              date={orderDate}
              setDate={setOrderDate}
              setIsDateValid={setIsCurrentDateValid}
              className={orderDate && isCurrentDateValid ? "borderGreen" : "borderRed"}
              max={new Date()}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
          <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "210px" }}>
            <Form.Label className="col-form-label dealer-label">Customer</Form.Label>
          </Col>

          <Col xs={4} md={4} sm={4} className="p-0 d-flex">
            <AutoCompleteDropdown
              className={`customFormControl ${customerFK || !customerInput ? "" : "borderRed"}`}
              arrayList={customerData}
              searchString={customerInput}
              handleSearchString={(string) => setCustomerInput(string)}
              renderItemId={(item) => item.CustomerPK}
              renderItemField={(item) => item.Description}
              fetchDataBySearchString={getCustomers}
              onSelect={handleCustomerSelection}
              selectedId={customerFK}
              maxHeight="180px"
              clearInputCallback={() => {
                setCustomerFK(null);
                setUsePlants(false);
                setDpuCustomer(false);
              }}
              loading={customerLoading}
            />
            <LookupButton onClick={handleUserLookup} />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
          <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "210px" }}>
            <Form.Label className="col-form-label dealer-label">Plant</Form.Label>
          </Col>

          <Col xs={4} md={4} sm={4} className="p-0 d-flex">
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
                setPlantFK("");
              }}
              className={`${plantFK === "" && plantInput !== "" && !isPlantDisabled ? "borderRed" : ""}`}
              maxHeight="202px"
              loading={plantLoading}
              disabled={isPlantDisabled}
            />
            <LookupButton onClick={handlePlantLookup} disabled={isPlantDisabled} />
          </Col>
        </Form.Group>

        <CustomerLookup
          show={showCustomerLookup}
          onHide={() => setShowCustomerLookup(false)}
          renderItemId={(customer) => customer.CustomerPK}
          renderItemField={(customer) => customer.Name}
          handleLookupSelection={handleCustomerSelection}
          plantId={plantFK}
          common
        />
        <CustomerPlantsLookup
          show={showPlantLookup}
          onHide={() => setShowPlantLookup(false)}
          renderItemId={(plant) => plant.customerPlantPK}
          renderItemField={(plant) => plant.name}
          handleLookupSelection={handlePlantLookupSelection}
          MaintenanceProgram
          customerId={customerFK}
        />
      </div>
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      id={UNIT_LISTING_BY_DATE_REPORT_ID}
      resetFormData={() => {
        resetAllVariables();
      }}
      isTabValid={isTabValid}
      payload={returnFormData()}
    />
  );
}

export default UnitListingByDate;
