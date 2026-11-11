import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import DelayedUnitReportService from "../../../../services/DelayedUnitReportService";
import { parseLocalDate, formatDatetimeToDate } from "../../../../utils/dateUtils";
import LoadingIcon from "../../../common/LoadingIcon";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import SelectDropdown from "../../../common/SelectDropdown";
import LookupButton from "../../../common/LookupButton";
import DateInputField from "../../../common/DateInputField";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import UnitNumbersLookup from "../../../LookupScreens/UnitNumber/UnitNumbersLookup";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import DelayUnitCodeLookup from "../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
import ReportComponent from "../../../common/ReportComponent";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import { AdvancedLookupScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";

const validationSchema = yup.object().shape({
  unitNumberLast5: yup.string(),
  unitPK: yup.number().nullable(),
  unitInput: yup.string(),
  driverPK: yup.number().required(),
  driverInput: yup.string().required(),
  beginningDate: yup.date(),
  endDate: yup.date(),
  customerPK: yup.number(),
  customerInput: yup.string(),
  plantPK: yup.number(),
  plantInput: yup.string(),
  delayType: yup.string(),
  activeOnly: yup.boolean(),
  inHouse: yup.boolean(),
  vin: yup.string(),
  workOrder: yup.string(),
});

const DelayedUnitReport = () => {
  const [isTabValid, setIsTabValid] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitNumberList, setUnitNumberList] = useState([]);
  const [showUnitNumberLookUp, setShowUnitNumberLookUp] = useState(false);
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [driverList, setDriverList] = useState([]);
  const [showDriverLookUp, setShowDriverLookUp] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [showPlantLookUp, setShowPlantLookUp] = useState(false);
  const [dropDownLoading, setDropDownLoading] = useState(false);
  const [delayUnitCodeList, setDelayUnitCodeList] = useState([]);
  const [showDelayUnitCodeLookUp, setShowDelayUnitCodeLookUp] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [vinList, setVinList] = useState([]);
  const [workOrderList, setWorkOrderList] = useState([]);
  const [vinLoading, setVinLoading] = useState(false);
  const [workOrderLoading, setWorkOrderLoading] = useState(false);
  const DELAYED_UNIT_REPORT_ID = process.env.REACT_APP_SP_DELAYED_UNIT_REPORT;

  const formik = useFormik({
    initialValues: {
      unitNumberLast5: "",
      unitPK: null,
      unitInput: "",
      driverPK: null,
      driverInput: "",
      beginningDate: "",
      endDate: "",
      customerPK: null,
      customerInput: "",
      plantPK: null,
      plantInput: "",
      delayCodePK: null,
      delayCodeInput: "",
      delayType: "All",
      activeOnly: true,
      inHouse: false,
      vin: "",
      workOrder: "",
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    beginningDate,
    endDate,
    unitPK,
    unitInput,
    driverPK,
    driverInput,
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    delayCodePK,
    delayCodeInput,
    activeOnly,
    unitNumberLast5,
    delayType,
    inHouse,
    vin,
    workOrder,
  } = values;

  //unitNumber
  const fetchUnitNumberList = (params) => {
    setDropDownLoading(true);
    DelayedUnitReportService.getUnitNumbers({ searchTerm: params.searchTerm, ...params })
      .then((res) => {
        const updatedList = res?.data;
        setUnitNumberList(updatedList);
      })
      .catch((err) => {
        console.error(err);
        setUnitNumberList([]);
      })
      .finally(() => setDropDownLoading(false));
  };

  const handleUnitNumberSelection = (item) => {
    setSelectedUnit(item);
    setFieldValue("unitPK", item.UnitPk);
    setFieldValue("unitInput", item.UnitNumber?.trim());
    setFieldValue("plantPK", item?.CustomerPlantFK);
    setFieldValue("plantInput", item?.CustomerPlantName);
    setFieldValue("customerPK", item?.CustomerFK);
    setFieldValue("customerInput", item?.CustomerName);
    setFieldValue("vin", item?.VIN);
    setFieldValue("workOrder", item?.WorkOrderNumber);

    if (item && Number(item?.DriverCount) === 1) {
      setFieldValue("driverPK", item?.DriverFK);
      setFieldValue("driverInput", item?.DriverName?.trim());
    }

    if (item) {
      if (item?.IsDelay) {
        setFieldValue("delayType", "Delay");
      } else if (item?.IsDamage) {
        setFieldValue("delayType", "Damage");
      } else if (item?.IsBreakdown) {
        setFieldValue("delayType", "Breakdown");
      }

      if (item?.IsAll) {
        setFieldValue("delayType", "All");
      }
    }
  };

  //driver
  const fetchDriverList = (value) => {
    setDropDownLoading(true);
    DelayedUnitReportService.getDrivers({ searchTerm: value, unitFK: unitPK })
      .then((res) => {
        const updatedList = res?.data;
        setDriverList(updatedList);
      })
      .catch((err) => {
        console.error(err);
        setDriverList([]);
      })
      .finally(() => setDropDownLoading(false));
  };

  //Lookup Selection
  const handleDriverLookupSelection = (driver) => {
    setValues({
      ...values,
      driverPK: driver?.DriverPK || driver?.driverPK || null,
      driverInput: (driver?.DriverName || driver?.driverName || "")?.trim(),
    });
    setFieldValue("unitNumberLast5", "");

    setShowDriverLookUp(false);
    if (!customerPK) {
      setFieldValue("customerInput", "");
    }
    if (!plantPK) {
      setFieldValue("plantInput", "");
    }
  };

  //customer Api and selection handling
  const fetchCustomerList = (value) => {
    setDropDownLoading(true);
    DelayedUnitReportService.getCustomers({
      searchTerm: value,
      pageSize: 100,
      type: "Autocomplete",
      plantPK: plantPK,
    })
      .then((res) => {
        const updatedList = res?.data;
        setCustomerList(updatedList);
      })
      .catch((err) => {
        console.error(err);
        setCustomerList([]);
      })
      .finally(() => setDropDownLoading(false));
  };

  const fetchDelayCodeList = (value) => {
    setDropDownLoading(true);
    DelayedUnitReportService.getDelayCodes({ searchTerm: value })
      .then((res) => {
        const updatedList = res?.data?.slice(0, -1);
        setDelayUnitCodeList(updatedList);
      })
      .catch((err) => {
        console.error(err);
        setDelayUnitCodeList([]);
      })
      .finally(() => setDropDownLoading(false));
  };

  const fetchCustomerPlantList = (value) => {
    setDropDownLoading(true);
    DelayedUnitReportService.getCustomerPlants({ searchTerm: value, customerPK: customerPK })
      .then((res) => {
        const updatedList = res?.data?.slice(0, -1);
        setPlantList(updatedList);
      })
      .catch((err) => {
        console.error(err);
        setPlantList([]);
      })
      .finally(() => setDropDownLoading(false));
  };

  const handleCustomerSelection = (customer) => {
    setValues({
      ...values,
      customerPK: customer.CustomerPK,
      customerInput: customer.Name || customer.Description?.trim(),
    });
    setSelectedCustomer(customer);
    setShowCustomerLookUp(false);

    if (!plantPK) {
      setFieldValue("plantInput", "");
    }
    setShowPlantLookUp(false);
  };

  const handleCustomerPlantSelection = (plant) => {
    setValues({
      ...values,
      plantPK: plant?.CustomerPlantPK ?? null,
      plantInput: plant?.Name?.trim() ?? "",
    });
    setShowPlantLookUp(false);
  };

  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setValues({
      ...values,
      delayCodePK: delayUnitCode?.DelayedUnitCodePK ?? null,
      delayCodeInput: delayUnitCode?.Description?.trim() ?? "",
    });
    setShowDelayUnitCodeLookUp(false);
  };

  const handleDelayTypeChange = (value) => {
    setFieldValue("delayType", value);

    if (value === "Delay" || value === "Damage") {
      setFieldValue("vin", "");
      setFieldValue("workOrder", "");
    }
  };

  const params = {
    UnitFK: unitPK || null,
    DriverFK: driverPK || null,
    CustomerFK: customerPK || null,
    PlantFK: plantPK || null,
    UnitNumberLast5: unitNumberLast5 || null,
    // backend expects: A=All, D=Delay, M=Damage, B=Breakdown
    DelayType:
      delayType === "Delay" ? "D" : delayType === "Damage" ? "G" : delayType === "Breakdown" ? "B" : "A",
    DelayCodeFK: delayCodePK || null,
    BeginDate: beginningDate ? formatDatetimeToDate(beginningDate) : null,
    EndDate: endDate ? formatDatetimeToDate(endDate) : null,
    VIN: vin || null,
    WorkOrderNumber: workOrder || null,
    ActiveOnly: activeOnly ? 1 : 0,
    InHouse: inHouse ? 1 : 0,
  };

  useEffect(() => {
    const fetchVinList = () => {
      setVinLoading(true);
      DelayedUnitReportService.getVinList()
        .then(({ data }) => {
          setVinList(data);
        })
        .catch(() => {})
        .finally(() => setVinLoading(false));
    };

    const fetchWorkOrderList = () => {
      setWorkOrderLoading(true);
      DelayedUnitReportService.getWorkOrderList()
        .then(({ data }) => {
          setWorkOrderList(data);
        })
        .catch(() => {})
        .finally(() => setWorkOrderLoading(false));
    };

    fetchVinList();
    fetchWorkOrderList();
  }, []);

  useEffect(() => {
    const isUnitLast5Valid = !unitNumberLast5 || unitNumberLast5?.length === 5;

    const isUnitValid = !unitInput || unitPK;

    const isDriverValid = !driverInput || driverPK;

    const isCustomerValid = !customerInput || customerPK;

    const isPlantValid = !plantInput || plantPK;

    const isDelayCodeValid = !delayCodeInput || delayCodePK;

    const areDatesRequired = !!selectedUnit && Number(selectedUnit?.DelayedUnitCount) > 1;

    const isDatesValid =
      isBeginningDateValid && isEndDateValid && (!areDatesRequired || (!!beginningDate && !!endDate));

    if (
      isUnitLast5Valid &&
      isUnitValid &&
      isDriverValid &&
      isCustomerValid &&
      isPlantValid &&
      isDelayCodeValid &&
      isDatesValid
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [
    unitNumberLast5,
    unitInput,
    unitPK,
    driverPK,
    driverInput,
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    delayCodePK,
    delayCodeInput,
    isBeginningDateValid,
    isEndDateValid,
    selectedUnit,
    beginningDate,
    endDate,
  ]);

  const isPlantDisabled =
    values?.unitPK ||
    driverPK ||
    (selectedCustomer && !selectedCustomer?.UsePlants) ||
    (selectedCustomer && !selectedCustomer?.DPUCustomer && !selectedCustomer?.UsePlants) ||
    (selectedCustomer && selectedCustomer?.SisterCompany);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        {/* <LoadingIcon /> */}
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-10">
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Unit Number Last 5</Form.Label>
              </Col>
              <Col xs={1} className="p-0">
                <input
                  className={`customFormControl ${
                    unitNumberLast5?.length > 0 && unitNumberLast5?.length < 5
                      ? "borderRed"
                      : unitNumberLast5?.length === 5
                        ? ""
                        : ""
                  }`}
                  id="unitNumberLast5"
                  name="unitNumberLast5"
                  type="text"
                  value={unitNumberLast5}
                  maxLength={5}
                  onChange={(e) => setFieldValue("unitNumberLast5", e.target.value)}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled={driverPK}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col xs={2} className="p-0">
                <Form.Label className="col-form-label">Unit Number</Form.Label>
              </Col>
              <Col xs={4} className="d-flex p-0">
                <AutoCompleteDropdown
                  className={
                    unitNumberLast5?.length === 5 && !values?.unitPK
                      ? "borderRed"
                      : !values?.unitPK && values?.unitInput
                        ? "borderRed"
                        : ""
                  }
                  arrayList={unitNumberList}
                  searchString={unitInput}
                  handleSearchString={(string) => setFieldValue("unitInput", string)}
                  renderItemId={(item) => item.UnitPk}
                  renderItemField={(item) => item.UnitNumber}
                  fetchDataBySearchString={(value) =>
                    fetchUnitNumberList({ searchTerm: value, unitNumberLast5: unitNumberLast5 })
                  }
                  onSelect={(unit) => {
                    handleUnitNumberSelection(unit);
                  }}
                  selectedId={values.unitPK}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("unitPK", null);
                    if (!selectedUnit) return;
                    setFieldValue("driverInput", "");
                    setFieldValue("driverPK", null);
                    setFieldValue("plantPK", null);
                    setFieldValue("plantInput", "");
                    setFieldValue("customerPK", null);
                    setFieldValue("customerInput", "");
                    setFieldValue("vin", "");
                    setFieldValue("workOrder", "");
                    setFieldValue("beginningDate", "");
                    setFieldValue("endDate", "");
                    setIsBeginningDateValid(true);
                    setIsEndDateValid(true);

                    setSelectedUnit(null);
                    setFieldValue("delayType", "All");
                    if (unitNumberLast5?.length === 5) {
                      setFieldValue("driverInput", "");
                      setFieldValue("driverPK", null);
                    }
                  }}
                  loading={dropDownLoading}
                  disabled={!unitPK && !unitInput && driverPK}
                  handleAutoCompleteClose={() => {
                    setFieldValue("plantInput", "");
                    setFieldValue("customerInput", "");
                    setFieldValue("driverInput", "");
                    setFieldValue("driverPK", null);
                  }}
                />
                <LookupButton
                  onClick={() => {
                    setShowUnitNumberLookUp(true);
                  }}
                  disabled={!unitPK && !unitInput && driverPK}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col xs={2} className="p-0">
                <Form.Label className="col-form-label">Driver</Form.Label>
              </Col>
              <Col xs={4} className="d-flex p-0">
                {/*  Autocomplete */}
                <AutoCompleteDropdown
                  className={`customFormControl ${driverPK || !driverInput || values?.unitPK ? "" : "borderRed"}`}
                  arrayList={driverList}
                  searchString={driverInput}
                  handleSearchString={(string) => setFieldValue("driverInput", string)}
                  renderItemId={(item) => item?.DriverPK}
                  renderItemField={(item) => item?.DriverName}
                  fetchDataBySearchString={(value) => fetchDriverList(value)}
                  onSelect={handleDriverLookupSelection}
                  selectedId={driverPK}
                  clearInputCallback={() => {
                    setFieldValue("driverPK", null);
                  }}
                  loading={dropDownLoading}
                  disabled={values?.unitPK || (selectedUnit && Number(selectedUnit?.DriverCount) === 1)}
                />
                <LookupButton
                  onClick={() => setShowDriverLookUp(true)}
                  disabled={values?.unitPK || (selectedUnit && Number(selectedUnit?.DriverCount) === 1)}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0" style={{ maxWidth: "120px" }}>
                <DateInputField
                  date={beginningDate}
                  setDate={(value) => setFieldValue("beginningDate", value)}
                  max={(endDate && parseLocalDate(endDate)) || new Date()}
                  disabled={selectedUnit && Number(selectedUnit?.DelayedUnitCount) === 1}
                  setIsDateValid={setIsBeginningDateValid}
                  className={
                    selectedUnit && Number(selectedUnit?.DelayedUnitCount) > 1
                      ? beginningDate && isBeginningDateValid
                        ? "borerGreen"
                        : "borderRed"
                      : isBeginningDateValid
                        ? ""
                        : "borderRed"
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">End Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0" style={{ maxWidth: "120px" }}>
                <DateInputField
                  date={endDate}
                  setDate={(value) => setFieldValue("endDate", value)}
                  min={beginningDate && parseLocalDate(beginningDate)}
                  max={new Date()}
                  disabled={selectedUnit && Number(selectedUnit?.DelayedUnitCount) === 1}
                  setIsDateValid={setIsEndDateValid}
                  className={
                    selectedUnit && Number(selectedUnit?.DelayedUnitCount) > 1
                      ? endDate && isEndDateValid
                        ? "borerGreen"
                        : "borderRed"
                      : isEndDateValid
                        ? ""
                        : "borderRed"
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Customer</Form.Label>
              </Col>
              <Col xs={4} className="d-flex p-0">
                <AutoCompleteDropdown
                  className={customerPK || !customerInput || values?.unitPK || driverPK ? "" : "borderRed"}
                  arrayList={customerList}
                  searchString={customerInput}
                  handleSearchString={(string) => setFieldValue("customerInput", string)}
                  renderItemId={(item) => item?.CustomerPK}
                  renderItemField={(item) => item?.Description || item?.Name}
                  fetchDataBySearchString={(value) => fetchCustomerList(value)}
                  onSelect={(customer) => {
                    handleCustomerSelection(customer);
                  }}
                  selectedId={customerPK}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("customerPK", null);
                    setSelectedCustomer(null);
                  }}
                  loading={dropDownLoading}
                  disabled={values?.unitPK || driverPK}
                />
                <LookupButton
                  onClick={() => setShowCustomerLookUp(true)}
                  disabled={values?.unitPK || driverPK}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label">Plant</Form.Label>
              </Col>
              <Col xs={4} className="d-flex p-0">
                <AutoCompleteDropdown
                  className={plantPK || !plantInput || isPlantDisabled ? "" : "borderRed"}
                  arrayList={plantList}
                  searchString={plantInput}
                  renderItemId={(plant) => plant?.CustomerPlantPK}
                  renderItemField={(plant) => plant?.Name}
                  handleSearchString={(string) => setFieldValue("plantInput", string)}
                  fetchDataBySearchString={(value) => fetchCustomerPlantList(value)}
                  onSelect={handleCustomerPlantSelection}
                  selectedId={plantPK}
                  loading={dropDownLoading}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("plantPK", null);
                  }}
                  disabled={isPlantDisabled}
                  towardsTop
                />
                <LookupButton
                  onClick={() => setShowPlantLookUp(true)}
                  disabled={
                    values?.unitPK ||
                    driverPK ||
                    (selectedCustomer && !selectedCustomer?.UsePlants) ||
                    (selectedCustomer && !selectedCustomer?.DPUCustomer && !selectedCustomer?.UsePlants)
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Delay Type</Form.Label>
              </Col>

              <Col sm={8} md={8} xs={8} className="p-0">
                <CustomRadioGroup
                  name="delayType"
                  horizontal
                  horizontalAlignmentClassName="pe-3"
                  selectedOption={delayType}
                  onChange={handleDelayTypeChange}
                  options={[
                    {
                      value: "All",
                      label: "All",
                      width: "70px",
                      disabled: selectedUnit && !selectedUnit?.IsAll,
                    },
                    {
                      value: "Delay",
                      label: "Delay",
                      width: "95px",
                      disabled: selectedUnit && !selectedUnit?.IsDelay,
                    },
                    { value: "Damage", label: "Damage", disabled: selectedUnit && !selectedUnit?.IsDamage },
                    {
                      value: "Breakdown",
                      label: "Breakdown",
                      disabled: selectedUnit && !selectedUnit?.IsBreakdown,
                    },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col xs={2} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Delay Code</Form.Label>
              </Col>

              <Col xs={4} className={`p-0 d-flex`}>
                <AutoCompleteDropdown
                  arrayList={delayUnitCodeList}
                  searchString={delayCodeInput}
                  renderItemId={(item) => item?.DelayedUnitCodePK}
                  renderItemField={(item) => item?.Description}
                  handleSearchString={(string) => setFieldValue("delayCodeInput", string)}
                  fetchDataBySearchString={(value) => fetchDelayCodeList(value)}
                  onSelect={handleDelayUnitCodeLookup}
                  selectedId={delayCodePK}
                  clearInputCallback={() => {
                    setFieldValue("delayCodePK", null);
                  }}
                  style={`pointer:true`}
                  className={delayCodePK || !delayCodeInput ? "" : "borderRed"}
                  maxHeight="170px"
                  loading={dropDownLoading}
                />
                <LookupButton onClick={() => setShowDelayUnitCodeLookUp(true)} />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">Active Only</Form.Label>
              </Col>
              <Col xs={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="activeOnly"
                  name="activeOnly"
                  checked={activeOnly}
                  onChange={(e) => setFieldValue("activeOnly", e.target.checked)}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">In House</Form.Label>
              </Col>
              <Col xs={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="inHouse"
                  name="inHouse"
                  checked={inHouse}
                  onChange={(e) => setFieldValue("inHouse", e.target.checked)}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">VIN</Form.Label>
              </Col>
              <Col xs={4} className="p-0 d-flex">
                <SelectDropdown
                  arrayList={vinList}
                  selectedId={vin ? String(vin) : null}
                  renderItemId={(item) => String(item?.VIN)}
                  renderItemField={(item) => item?.VIN}
                  onSelect={(item) => setFieldValue("vin", item ? item.VIN : "")}
                  loading={vinLoading}
                  disabled={!(delayType === "All" || delayType === "Breakdown")}
                  maxHeight="170px"
                  towardsTop
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Work Order</Form.Label>
              </Col>
              <Col xs={4} className="p-0 d-flex">
                <SelectDropdown
                  arrayList={workOrderList}
                  selectedId={workOrder ? String(workOrder) : null}
                  renderItemId={(item) => String(item?.WorkOrderNumber)}
                  renderItemField={(item) => item?.WorkOrderNumber}
                  onSelect={(item) => setFieldValue("workOrder", item ? item.WorkOrderNumber : "")}
                  loading={workOrderLoading}
                  disabled={!(delayType === "All" || delayType === "Breakdown")}
                  maxHeight="170px"
                  towardsTop
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </div>

      <UnitNumbersLookup
        show={showUnitNumberLookUp}
        onHide={() => setShowUnitNumberLookUp(false)}
        renderItemId={(item) => item.UnitPk}
        customFetchFunction={(params) =>
          DelayedUnitReportService.getDelayedReportUnitNumbers({ ...params, unitNumberLast5 })
        }
        handleLookupSelection={handleUnitNumberSelection}
      />

      <DriverLookup
        show={showDriverLookUp}
        onHide={() => {
          setShowDriverLookUp(false);
        }}
        renderItemId={(driver) => driver.driverPK}
        renderItemField={(driver) => driver.driverName}
        fetchFunction={(params) =>
          DelayedUnitReportService.getDrivers({
            ...params,
            type: "LookUp",
            firstField: params?.advancedSortingOrder?.firstField,
            secondField: params?.advancedSortingOrder?.secondField,
            thirdField: params?.advancedSortingOrder?.thirdField,
            fourthField: params?.advancedSortingOrder?.fourthField,
            firstName: params?.advancedSearchObject?.firstName,
            lastName: params?.advancedSearchObject?.lastName,
            city: params?.advancedSearchObject?.city,
            state: params?.advancedSearchObject?.stateCode,
          })
        }
        renderCol1={(driver) => driver?.FirstName}
        renderCol2={(driver) => driver?.LastName}
        renderCol3={(driver) => driver?.City}
        renderCol4={(driver) => driver?.StateCode}
        handleLookupSelection={handleDriverLookupSelection}
      />

      <CustomerLookup
        show={showCustomerLookUp}
        onHide={() => setShowCustomerLookUp(false)}
        renderItemId={(customer) => customer?.CustomerPK}
        handleLookupSelection={handleCustomerSelection}
        fetchFunction={(params) =>
          DelayedUnitReportService.getCustomers({
            type: "LookUp",
            ...params?.advancedSortingOrder,
            ...params?.advancedSearchObject,
            ...params,
            pageSize: AdvancedLookupScreen_RecordsPerPage,
            plantPK: plantPK,
          })
        }
        renderCol1={(customer) => customer?.Name}
        renderCol2={(customer) => customer?.City}
        renderCol3={(customer) => customer?.StateCode}
      />

      <CustomerPlantsLookup
        show={showPlantLookUp}
        onHide={() => setShowPlantLookUp(false)}
        renderItemId={(plant) => plant?.CustomerPlantPK}
        handleLookupSelection={handleCustomerPlantSelection}
        fetchFunction={(params) =>
          DelayedUnitReportService.getCustomerPlants({
            type: "LookUp",
            customerPK: customerPK,
            firstField: params?.advancedSortingOrder?.firstField,
            secondField: params?.advancedSortingOrder?.secondField,
            thirdField: params?.advancedSortingOrder?.thirdField,
            name: params?.advancedSearchObject?.name,
            brand: params?.advancedSearchObject?.brand,
            productLine: params?.advancedSearchObject?.productLine,
            ...params,
          })
        }
        renderCol1={(plant) => plant?.Name}
        renderCol2={(plant) => plant?.Brand}
        renderCol3={(plant) => plant?.ProductLine}
      />

      <DelayUnitCodeLookup
        show={showDelayUnitCodeLookUp}
        onHide={() => {
          setShowDelayUnitCodeLookUp(false);
        }}
        renderItemId={(code) => code.DelayedUnitCodePK}
        handleLookupSelection={handleDelayUnitCodeLookup}
        fetchFunction={(params) => DelayedUnitReportService.getDelayCodes({ ...params, type: "LookUp" })}
        renderCol1={(delayCode) => delayCode?.Description}
      />
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
        setFieldValue("beginningDate", "");
        setFieldValue("endDate", "");
      }}
      id={DELAYED_UNIT_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default DelayedUnitReport;
