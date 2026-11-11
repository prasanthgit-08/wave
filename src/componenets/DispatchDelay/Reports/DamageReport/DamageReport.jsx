import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";

import DateInputField from "../../../common/DateInputField";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import ReportComponent from "../../../common/ReportComponent";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import DamageReportService from "../../../../services/DamageReportService";
import UnitNumbersLookup from "../../../LookupScreens/UnitNumber/UnitNumbersLookup";
import ClaimNumberLookup from "../../../LookupScreens/ClaimNumber/ClaimNumberLookup";
import InputField from "../../../common/InputField";

const validationSchema = yup.object().shape({
  unitPK: yup.number().nullable(),
  unitInput: yup.string(),
  driverPK: yup.number().nullable(),
  driverInput: yup.string(),
  customerPK: yup.number().nullable(),
  customerInput: yup.string(),
  claimNumberPK: yup.number().nullable(),
  claimNumberInput: yup.string(),
  beginningDate: yup.date(),
  endDate: yup.date(),
  status: yup.string(),
  division: yup.string(),
  responcibleParty: yup.string(),
  driverChargeable: yup.string(),
  DOTReportable: yup.string(),
  reported: yup.string(),
  totaled: yup.string(),
  isSummary: yup.boolean(),
  includeInHouseComments: yup.boolean(),
});

const DamageReport = () => {
  const [dropDownLoading, setDropDownLoading] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [claimNumberList, setClaimNumberList] = useState([]);
  const [unitNumberList, setUnitNumberList] = useState([]);
  const [showDriverLookUp, setShowDriverLookUp] = useState(false);
  const [showCustomerLookUp, setShowCustomerLookup] = useState(false);
  const [showUnitNumberLookUp, setShowUnitNumberLookup] = useState(false);
  const [showClaimNumberLookUp, setShowClaimNumberLookup] = useState(false);
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [claimNumberValid, setClaimNumberValid] = useState(true);
  const [claimNumberCount, setClaimNumberCount] = useState(1);
  const DELAYED_UNIT_DAMAGE_REPORT_ID = process.env.REACT_APP_SP_DELAYED_UNIT_DAMAGE_REPORT;

  const formik = useFormik({
    initialValues: {
      unitPK: null,
      unitInput: "",
      driverPK: null,
      driverInput: "",
      customerPK: null,
      customerInput: "",
      claimNumberPK: null,
      claimNumberInput: "",
      beginningDate: "",
      endDate: "",
      status: "All",
      division: "B",
      responcibleParty: "A",
      driverChargeable: "A",
      DOTReportable: "A",
      reported: "A",
      totaled: "A",
      isSummary: false,
      includeInHouseComments: false,
    },
    validationSchema: validationSchema,
  });
  const { values, setFieldValue, initialValues, isValid, setValues, setFieldError, errors } = formik;

  const tabValid =
    !isEndDateValid ||
    !isBeginningDateValid ||
    (!values.unitPK && values.unitInput) ||
    (!values.driverPK && values.driverInput) ||
    (!values.customerPK && values.customerInput) ||
    !(claimNumberValid && (values?.claimNumberInput?.length === 8 || values?.claimNumberInput?.length === 0));

  const isOnlyClaimSearch =
    !values.unitPK &&
    !values.driverPK &&
    !values.customerPK &&
    !values.beginningDate &&
    !values.endDate &&
    values.status === "All" &&
    values.division === "B" &&
    values.responcibleParty === "A" &&
    values.driverChargeable === "A" &&
    values.DOTReportable === "A" &&
    values.reported === "A" &&
    values.totaled === "A" &&
    !values.isSummary &&
    !values.includeInHouseComments;

  const enableClaimNumber = isOnlyClaimSearch || (values.unitPK && claimNumberCount > 1);

  const handleDriverSelection = (driver) => {
    setFieldValue("driverPK", driver.DriverPK);
    setFieldValue(
      "driverInput",
      driver.DriverName
        ? driver.DriverName
        : driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
    );
    setShowDriverLookUp(false);
  };
  const handleCustomerSelection = (customer) => {
    setFieldValue("customerPK", customer.CustomerPK);
    setFieldValue("customerInput", customer.Name?.trim());
    setShowCustomerLookup(false);
  };
  const handleUnitNumberSelection = (item) => {
    setClaimNumberCount(item.ClaimNumberCount);
    setFieldValue("unitPK", item.UnitPk);
    setFieldValue("unitInput", item.UnitNumber?.trim());
    if (!values.customerPK) {
      setFieldValue("customerInput", "");
    }
    if (!isBeginningDateValid) {
      setFieldValue("beginningDate", "");
    }
    if (!isEndDateValid) {
      setFieldValue("endDate", "");
    }
    if (!(
      claimNumberValid &&
      (values.claimNumberInput?.length === 8 || values.claimNumberInput?.length === 0)
    )) {
      setFieldValue("claimNumberInput", "");
      setClaimNumberValid(true);
    }
  };
  const handleClaimNumberSelection = (item) => {
    setFieldValue("claimNumberPK", item?.DelayedUnitDamagePK);
    setFieldValue("claimNumberInput", item?.ClaimNumber?.trim());
    setClaimNumberValid(true);
  };

  const checkUniqeClaimNumber = () => {
    DamageReportService.getDamageReportClaimNumbers({
      type: "Claimnumber",
      unitFK: values?.unitPK,
      claimNumber: values?.claimNumberInput,
    })
      .then((res) => {
        if (res?.data?.[0]?.ClaimNumberExists === 1) {
          setClaimNumberValid(true);
        } else {
          setClaimNumberValid(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const fetchDriverList = (value) => {
    setDropDownLoading(true);
    DamageReportService.getDamgeReportDrivers({ searchTerm: value })
      .then((res) => {
        setDriverList(res?.data);
      })
      .catch((err) => {
        console.error(err);
        setDriverList([]);
      })
      .finally(() => setDropDownLoading(false));
  };
  const fetchUnitNumberList = (params) => {
    setDropDownLoading(true);
    DamageReportService.getDamageReportUnitNumbers({ searchTerm: params.searchTerm, ...params })
      .then((res) => {
        setUnitNumberList(res?.data);
      })
      .catch((err) => {
        console.error(err);
        setUnitNumberList([]);
      })
      .finally(() => setDropDownLoading(false));
  };

  const fetchClaimNumberList = (value) => {
    setDropDownLoading(true);
    DamageReportService.getDamageReportClaimNumbers({ searchTerm: value })
      .then((res) => {
        setClaimNumberList(res?.data);
      })
      .catch((err) => {
        console.error(err);
        setClaimNumberList([]);
      })
      .finally(() => setDropDownLoading(false));
  };
  const fetchCustomerList = (value) => {
    setDropDownLoading(true);
    DamageReportService.getDamageReportCustomers({ searchTerm: value })
      .then((res) => {
        setCustomerList(res?.data);
      })
      .catch((err) => {
        console.error(err);
        setCustomerList([]);
      })
      .finally(() => setDropDownLoading(false));
  };

  useEffect(() => {
    if (!enableClaimNumber) {
      setFieldValue("claimNumberPK", null);
      setFieldValue("claimNumberInput", "");
      setClaimNumberValid(true);
    }
  }, [enableClaimNumber]);

  const params = {
    UnitFK: values.unitPK,
    DriverFK: values.driverPK,
    CustomerFK: values.customerPK,
    BeginDate: values.beginningDate || null,
    EndDate: values.endDate || null,
    ClaimNumber: values.claimNumberInput || null,
    Status: values.status,
    Division: values.division,
    ResponcibleParty: values.responcibleParty,
    DriverChargeable: values.driverChargeable,
    DOTReportable: values.DOTReportable,
    Reported: values.reported,
    Totaled: values.totaled,
    IsSummary: values.isSummary,
    IncludeInHouseComments: values.includeInHouseComments,
  };

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="mt-2 mx-3">
              <Col>
                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
                  <Col xs={4} className="p-0">
                    <Form.Label className="col-form-label  ">Unit Number</Form.Label>
                  </Col>
                  <Col xs={7} className="d-flex p-0">
                    <AutoCompleteDropdown
                      className={`customFormControl ${!values?.unitPK && values?.unitInput ? "borderRed" : ""} `}
                      arrayList={unitNumberList}
                      searchString={values?.unitInput}
                      handleSearchString={(string) => setFieldValue("unitInput", string)}
                      renderItemId={(item) => item.UnitPk}
                      renderItemField={(item) => item.UnitNumber}
                      fetchDataBySearchString={(value) => fetchUnitNumberList({ searchTerm: value })}
                      onSelect={(customer) => {
                        handleUnitNumberSelection(customer);
                      }}
                      selectedId={values?.unitPK}
                      maxHeight="180px"
                      clearInputCallback={() => {
                        setFieldValue("unitPK", null);
                        setClaimNumberCount(1);
                      }}
                      loading={dropDownLoading}
                    />
                    <LookupButton
                      onClick={() => {
                        setShowUnitNumberLookup(true);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
                  <Col xs={4} className="p-0">
                    <Form.Label className="col-form-label  ">Driver</Form.Label>
                  </Col>
                  <Col xs={7} className="d-flex p-0">
                    <AutoCompleteDropdown
                      className={`customFormControl ${!values?.driverPK && values?.driverInput ? "borderRed" : ""} `}
                      arrayList={driverList}
                      searchString={values?.driverInput}
                      handleSearchString={(string) => setFieldValue("driverInput", string)}
                      renderItemId={(item) => item.DriverPK}
                      renderItemField={(item) => item.DriverName}
                      fetchDataBySearchString={(value) => fetchDriverList(value)}
                      onSelect={(driver) => {
                        handleDriverSelection(driver);
                      }}
                      disabled={values?.unitPK && claimNumberCount === 1}
                      selectedId={values?.driverPK}
                      maxHeight="180px"
                      clearInputCallback={() => {
                        setFieldValue("driverPK", null);
                      }}
                      loading={dropDownLoading}
                    />
                    <LookupButton
                      disabled={values?.unitPK && claimNumberCount === 1}
                      onClick={() => {
                        setShowDriverLookUp(true);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
                  <Col xs={4} className="p-0">
                    <Form.Label className="col-form-label">Customer</Form.Label>
                  </Col>
                  <Col xs={7} className="d-flex p-0">
                    <AutoCompleteDropdown
                      className={`customFormControl ${!values?.customerPK && values?.customerInput ? "borderRed" : ""} `}
                      arrayList={customerList}
                      searchString={values?.customerInput}
                      handleSearchString={(string) => setFieldValue("customerInput", string)}
                      renderItemId={(item) => item.CustomerPK}
                      renderItemField={(item) => item.Name}
                      fetchDataBySearchString={(value) => fetchCustomerList(value)}
                      onSelect={(customer) => {
                        handleCustomerSelection(customer);
                      }}
                      disabled={values?.unitPK}
                      selectedId={values?.customerPK}
                      maxHeight="180px"
                      clearInputCallback={() => {
                        setFieldValue("customerPK", null);
                      }}
                      loading={dropDownLoading}
                    />
                    <LookupButton
                      disabled={values?.unitPK}
                      onClick={() => {
                        setShowCustomerLookup(true);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-5 m-r-0 mt-3">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Begining Date</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={values.beginningDate}
                      setDate={(value) => setFieldValue("beginningDate", value)}
                      disabled={values.unitPK ? !(values.unitPK && claimNumberCount > 1) : false}
                      max={values.endDate ? parseLocalDate(values.endDate) : new Date()}
                      setIsDateValid={setIsBeginningDateValid}
                      className={isBeginningDateValid ? "" : "borderRed"}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-5 m-r-0 mt-3">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Ending Date</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={values.endDate}
                      setDate={(value) => setFieldValue("endDate", value)}
                      disabled={values.unitPK ? !(values.unitPK && claimNumberCount > 1) : false}
                      min={values.beginningDate ? parseLocalDate(values.beginningDate) : ""}
                      max={new Date()}
                      setIsDateValid={setIsEndDateValid}
                      className={isEndDateValid ? "" : "borderRed"}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
                  <Col xs={4} className="p-0">
                    <Form.Label className="col-form-label  ">Claim Number</Form.Label>
                  </Col>
                  <Col xs={7} className="d-flex p-0">
                    <InputField
                      type="text"
                      name="searchTerms"
                      width={"100%"}
                      maxLength={8}
                      disabled={!enableClaimNumber}
                      value={values.claimNumberInput}
                      onChange={(e) => {
                        setFieldValue("claimNumberInput", e.target.value?.trim());
                        setClaimNumberValid(true);
                      }}
                      onBlur={(e) => {
                        if (e.target.value.length === 8) {
                          checkUniqeClaimNumber();
                        }
                      }}
                      autoComplete="off"
                      aria-autocomplete="list"
                      className={`customFormControl ${claimNumberValid && (values?.claimNumberInput?.length === 8 || values?.claimNumberInput?.length === 0) ? "" : "borderRed"}`}
                      autocomplete="autocomplete_off_randString"
                    />
                    <LookupButton
                      disabled={!enableClaimNumber}
                      onClick={() => setShowClaimNumberLookup(true)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-5 m-r-0 mt-3">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Status</Form.Label>
                  </Col>
                  <Col xs={3} className="p-0">
                    <Form.Select
                      className="customFormControl"
                      name="status"
                      id="status"
                      value={values.status}
                      disabled={values.claimNumberInput}
                      onChange={(e) => {
                        setFieldValue("status", e.target.value);
                      }}
                    >
                      <option value="All">All</option>
                      <option value="O">Open</option>
                      <option value="C">Closed</option>
                      <option value="D">Disputed</option>
                      <option value="I">Invoiced</option>
                      <option value="A">Active</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Division</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <CustomRadioGroup
                      name="division"
                      horizontal
                      horizontalAlignmentClassName="pe-3"
                      selectedOption={values.division}
                      disabled={values.claimNumberInput}
                      onChange={(value) => setFieldValue("division", value)}
                      options={[
                        { value: "B", label: "Both", width: "70px" },
                        { value: "M", label: "Motorized", width: "95px" },
                        { value: "T", label: "Towable", disabled: false },
                      ]}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Responsible Party</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <CustomRadioGroup
                      name="responcibleParty"
                      horizontal
                      horizontalAlignmentClassName="pe-3"
                      selectedOption={values.responcibleParty}
                      disabled={values.claimNumberInput}
                      onChange={(value) => setFieldValue("responcibleParty", value)}
                      options={[
                        { value: "A", label: "All", width: "70px" },
                        { value: "Y", label: "Yes", width: "95px" },
                        { value: "N", label: "No", disabled: false },
                      ]}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Driver Chargable</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <CustomRadioGroup
                      name="driverChargeable"
                      horizontal
                      horizontalAlignmentClassName="pe-3"
                      selectedOption={values.driverChargeable}
                      disabled={values.claimNumberInput}
                      onChange={(value) => setFieldValue("driverChargeable", value)}
                      options={[
                        { value: "A", label: "All", width: "70px" },
                        { value: "Y", label: "Yes", width: "95px" },
                        { value: "N", label: "No", disabled: false },
                      ]}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">DOT Reportable</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <CustomRadioGroup
                      name="DOTReportable"
                      horizontal
                      horizontalAlignmentClassName="pe-3"
                      selectedOption={values.DOTReportable}
                      disabled={values.claimNumberInput}
                      onChange={(value) => setFieldValue("DOTReportable", value)}
                      options={[
                        { value: "A", label: "All", width: "70px" },
                        { value: "Y", label: "Yes", width: "95px" },
                        { value: "N", label: "No", disabled: false },
                      ]}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Reported</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <CustomRadioGroup
                      name="reported"
                      horizontal
                      horizontalAlignmentClassName="pe-3"
                      selectedOption={values.reported}
                      disabled={values.claimNumberInput}
                      onChange={(value) => setFieldValue("reported", value)}
                      options={[
                        { value: "A", label: "All", width: "70px" },
                        { value: "Y", label: "Yes", width: "95px" },
                        { value: "N", label: "No", disabled: false },
                      ]}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Totaled</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <CustomRadioGroup
                      name="totaled"
                      horizontal
                      horizontalAlignmentClassName="pe-3"
                      selectedOption={values.totaled}
                      disabled={values.claimNumberInput}
                      onChange={(value) => setFieldValue("totaled", value)}
                      options={[
                        { value: "A", label: "All", width: "70px" },
                        { value: "Y", label: "Yes", width: "95px" },
                        { value: "N", label: "No", disabled: false },
                      ]}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Summary</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={values.isSummary}
                      disabled={values.claimNumberInput}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFieldValue("isSummary", checked);
                        if (checked) {
                          setFieldValue("includeInHouseComments", false);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Include In Houser Comments
                    </Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      disabled={values.isSummary || values.claimNumberInput}
                      checked={values.includeInHouseComments}
                      onChange={(e) => {
                        setFieldValue("includeInHouseComments", e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <DriverLookup
              show={showDriverLookUp}
              onHide={() => setShowDriverLookUp(false)}
              renderItemId={(driver) => driver.driverPK}
              handleLookupSelection={handleDriverSelection}
              DamageReport
            />

            <CustomerLookup
              show={showCustomerLookUp}
              onHide={() => setShowCustomerLookup(false)}
              renderItemId={(customer) => customer?.CustomerPK}
              handleLookupSelection={handleCustomerSelection}
              fetchFunction={(params) =>
                DamageReportService.getDamageReportCustomers({
                  type: "LookUp",
                  pageSize: 15,
                  ...params?.advancedSortingOrder,
                  ...params?.advancedSearchObject,
                  ...params,
                })
              }
              renderCol1={(customer) => customer?.Name}
              renderCol2={(customer) => customer?.City}
              renderCol3={(customer) => customer?.StateCode}
            />

            <UnitNumbersLookup
              show={showUnitNumberLookUp}
              onHide={() => setShowUnitNumberLookup(false)}
              renderItemId={(item) => item?.UnitPk}
              customFetchFunction={DamageReportService.getDamageReportUnitNumbers}
              handleLookupSelection={handleUnitNumberSelection}
            />

            <ClaimNumberLookup
              show={showClaimNumberLookUp}
              onHide={() => setShowClaimNumberLookup(false)}
              renderItemId={(item) => item?.DelayedUnitDamagePK}
              customFetchFunction={(params) =>
                DamageReportService.getDamageReportClaimNumbers({ unitFK: values.unitPK, ...params })
              }
              handleLookupSelection={handleClaimNumberSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      id={DELAYED_UNIT_DAMAGE_REPORT_ID}
      isEmailExcelDisabled={!values.isSummary}
      isTabValid={!tabValid}
      payload={params}
    />
  );
};

export default DamageReport;
