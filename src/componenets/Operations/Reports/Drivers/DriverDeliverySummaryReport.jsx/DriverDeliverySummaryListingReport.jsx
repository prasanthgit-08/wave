import { parseLocalDate } from "../../../../../utils/dateUtils";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import CustomerService from "../../../../../services/CustomerService";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import { Col, Form } from "react-bootstrap";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import ReportComponent from "../../../../common/ReportComponent";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";

const validationSchema = yup.object().shape({
  Division: yup.string().required(),
  Source: yup.string().required(),
  ForDate: yup.string().required(),
  SummarizeBy: yup.string().required(),
  Customer: yup.number().nullable(),
  customerInput: yup.string(),
  Plant: yup.number().nullable(),
  plantInput: yup.string(),
  IncludeSisterUnits: yup.boolean(),
  IncludeSisterDispatches: yup.boolean(),
});

const DriverDeliverySummaryListingReport = () => {
  const formik = useFormik({
    initialValues: {
      Division: "all",
      Source: "both",
      ForDate: "delivery",
      SummarizeBy: "date",
      customer: null,
      customerInput: "",
      Plant: null,
      plantInput: "",
      IncludeSisterUnits: false,
      IncludeSisterDispatches: false,
    },
    validationSchema: validationSchema,
  });

  const companyName = process.env.REACT_APP_COMPANY_NAME;
  const [customerLoading, setCustomerLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [showPlantLookUp, setShowPlantLookUp] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [beginningDate, setBeginningDate] = useState(formatDatetimeToDate(new Date()));
  const [endDate, setendDate] = useState(formatDatetimeToDate(new Date()));
  const DRIVER_DELIVERY_SUMMARY_REPORT_ID = process.env.REACT_APP_SP_DRIVER_DELIVERY_SUMMARY_REPORT;

  const { values, errors, setValues, setFieldValue, initialValues, resetForm } = formik;

  const {
    Division,
    Source,
    ForDate,
    SummarizeBy,
    Customer,
    customerInput,
    Plant,
    plantInput,
    IncludeSisterDispatches,
    IncludeSisterUnits,
  } = values;

  //customer Api and selection handling
  const fetchCustomerList = (string) => {
    setCustomerLoading(true);
    CustomerService.getAllCustomerByName(string)
      .then((response) => {
        setCustomerList(response?.data?.content);
      })
      .catch(() => {})
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  const handleCustomerSelection = (customer) => {
    setValues({
      ...values,
      Customer: customer.customerPK,
      customerInput: customer.name,
    });
    setShowCustomerLookUp(false);
  };

  const fetchPickupPlantdetailsByName = (string) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.getAllPlantsByCustomerAuto(string)
      .then((response) => {
        const data = response.data;
        const plantList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        setPlantList(plantList);
      })
      .catch((err) => {})
      .finally(() => {
        setPlantLoading(false);
      });
  };

  const handlePlantSelection = (plant) => {
    setValues({
      ...values,
      Plant: plant.customerPlantPK,
      plantInput: plant.name,
    });
    setShowPlantLookUp(false);
  };

  const handleReset = () => {
    resetForm();
    setBeginningDate("");
    setendDate("");
    setTimeout(() => {
      setBeginningDate(formatDatetimeToDate(new Date()));
      setendDate(formatDatetimeToDate(new Date()));
    }, 0);
    setIsBeginningDateValid(true); // Reset validation states
    setIsEndDateValid(true);
  };

  //buttonValidation
  useEffect(() => {
    if (
      beginningDate &&
      isBeginningDateValid &&
      endDate &&
      isEndDateValid &&
      Division &&
      Source &&
      ForDate &&
      SummarizeBy &&
      !(!Customer && customerInput) &&
      !(!Plant && plantInput)
    ) {
      setIsButtonValid(true);
    } else {
      setIsButtonValid(false);
    }
  }, [
    beginningDate,
    isBeginningDateValid,
    endDate,
    isEndDateValid,
    Division,
    Source,
    ForDate,
    SummarizeBy,
    Customer,
    customerInput,
    Plant,
    plantInput,
  ]);

  const params = {
    Division,
    Source,
    BeginingDate: beginningDate,
    endDate,
    CustomerPK: Customer || null,
    PlantPK: Plant || null,
    ForDate,
    SummarizeBy,
    IncludeSisterDispatches: IncludeSisterDispatches ? 1 : 0,
    IncludeSisterUnits: IncludeSisterUnits ? 1 : 0,
  };

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0 m-l-10">
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Form.Label className="customColFormLabel">Division</Form.Label>
                </Col>

                <Col xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="Division"
                    horizontal
                    horizontalAlignmentClassName="pe-4"
                    selectedOption={Division}
                    onChange={(value) => setFieldValue("Division", value)}

                    options={[
                      { value: "all", label: "All", width: "" },
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

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Source</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="Source"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={Source}
                    onChange={(value) => setFieldValue("Source", value)}
                    options={[
                      { value: "both", label: "Both", width: "57px" },
                      { value: "outbound", label: "Outbound", width: "96px" },
                      { value: "reload", label: "Reload", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
                </Col>
                <Col xs={3} md={5} sm={5} style={{ width: "138px" }}>
                  <DateInputField
                    date={beginningDate}
                    name="beginningDate"
                    value={beginningDate}
                    setDate={(value) => {
                      setBeginningDate(value);
                    }}
                    setIsDateValid={setIsBeginningDateValid}
                    className={`customFormControl ${beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"}`}
                    max={endDate && parseLocalDate(endDate)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">End Date</Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} style={{ width: "138px" }}>
                  <DateInputField
                    date={endDate}
                    name="endDate"
                    value={endDate}
                    setIsDateValid={setIsEndDateValid}
                    setDate={(value) => {
                      setendDate(value);
                    }}
                    className={`customFormControl ${endDate && isEndDateValid ? "borderGreen" : "borderRed"}`}
                    min={beginningDate && parseLocalDate(beginningDate)}
                    max={new Date()}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">For Date</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="ForDate"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={ForDate}
                    onChange={(value) => setFieldValue("ForDate", value)}
                    options={[
                      { value: "delivery", label: "Delivery" },
                      { value: "dispatch", label: "Dispatch" },
                      { value: "yardExit", label: "Yard Exit" },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Summarize By</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="SummarizeBy"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={SummarizeBy}
                    onChange={(value) => setFieldValue("SummarizeBy", value)}
                    options={[
                      { value: "date", label: "Date", width: "77px" },
                      { value: "state", label: "State", width: "96px" },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">Customer</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="d-flex ">
                  {/*  Autocomplete */}
                  <AutoCompleteDropdown
                    className={`customFormControl ${Customer || !customerInput ? "" : "borderRed"} `}
                    arrayList={customerList}
                    searchString={customerInput}
                    handleSearchString={(string) => setFieldValue("customerInput", string)}
                    renderItemId={(item) => item.customerPK}
                    renderItemField={(item) => item.name}
                    fetchDataBySearchString={(value) => fetchCustomerList(value)}
                    onSelect={(customer) => {
                      handleCustomerSelection(customer);
                      // Clear and disable plant when customer is chosen
                      setFieldValue("Plant", null);
                      setFieldValue("plantInput", "");
                    }}
                    selectedId={Customer}
                    disabled={Plant}
                    maxHeight="155px"
                    clearInputCallback={() => {
                      setFieldValue("Customer", null);
                    }}
                    loading={customerLoading}
                  />
                  <LookupButton
                    onClick={() => {
                      setShowCustomerLookUp(true);
                    }}
                    disabled={Plant}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">Plant</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="d-flex ">
                  {/*  Autocomplete */}
                  <AutoCompleteDropdown
                    className={`customFormControl ${Plant || !plantInput ? "" : "borderRed"} `}
                    arrayList={plantList}
                    searchString={plantInput}
                    handleSearchString={(string) => setFieldValue("plantInput", string)}
                    renderItemId={(item) => item.customerPlantPK}
                    renderItemField={(item) => item.name}
                    fetchDataBySearchString={(value) => fetchPickupPlantdetailsByName(value)}
                    onSelect={(plant) => {
                      handlePlantSelection(plant);
                      // Clear and disable customer when plant is chosen
                      setFieldValue("Customer", null);
                      setFieldValue("customerInput", "");
                    }}
                    selectedId={Plant}
                    disabled={Customer}
                    clearInputCallback={() => {
                      setFieldValue("Plant", null);
                    }}
                    loading={plantLoading}
                    maxHeight="120px"
                  />
                  <LookupButton
                    onClick={() => {
                      setShowPlantLookUp(true);
                    }}
                    disabled={Customer}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className={` m-b-10 align-items-center row  m-l-0 m-r-0 mt-4 ${companyName === "Wave" ? "hide-elements" : ""}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                  <Form.Label className=" col-form-label">Include Sister Units</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    hidden={companyName === "Wave"}
                    className="form-check-input p-0"
                    id="IncludeSisterUnits"
                    name="IncludeSisterUnits"
                    checked={IncludeSisterUnits}
                    onChange={(e) => setFieldValue("IncludeSisterUnits", e.target.checked)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className={` m-b-10 align-items-center row  m-l-0 m-r-0 mt-4 ${companyName === "Wave" ? "hide-elements" : ""} `}
              >
                <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                  <Form.Label className=" col-form-label">Include Sister Dispatches</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    hidden={companyName === "Wave"}
                    className="form-check-input p-0"
                    id="IncludeSisterDispatches"
                    name="IncludeSisterDispatches"
                    checked={IncludeSisterDispatches}
                    onChange={(e) => setFieldValue("IncludeSisterDispatches", e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <CustomerLookup
        show={showCustomerLookUp}
        onHide={() => {
          setShowCustomerLookUp(false);
        }}
        renderItemId={(customer) => customer.customerPK}
        renderItemField={(customer) => customer.name}
        handleLookupSelection={handleCustomerSelection}
        MaintenanceProgram
      />
      <CustomerPlantsLookup
        show={showPlantLookUp}
        onHide={() => {
          setShowPlantLookUp(false);
        }}
        renderItemId={(plant) => plant.customerPlantPK}
        renderItemField={(plant) => plant.name}
        handleLookupSelection={handlePlantSelection}
        MaintenanceProgram
      />
    </>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={handleReset}
      id={DRIVER_DELIVERY_SUMMARY_REPORT_ID}
      isTabValid={isButtonValid}
      payload={params}
    />
  );
};

export default DriverDeliverySummaryListingReport;
