import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import DateInputField from "../../../common/DateInputField";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import ReportComponent from "../../../common/ReportComponent";
import formatDatetimeToDate from "../../../../utils/formatDateTimeToDate";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerListingReportService from "../../../../services/Reports/CustomerListingReportService";

const validationSchema = yup.object().shape({
  customerInput: yup.string(),
  customerPK: yup.string(),
  plantInput: yup.string(),
  plantPK: yup.string(),
  dateFrom: yup.string(),
  dateTo: yup.string(),
  customerState: yup.string(),
  projections: yup.boolean(),
  showPlant: yup.boolean(),
});

const CustomerListingReport = () => {
  const [isDateFromValid, setIsDateFromValid] = useState(true);
  const [isDateToValid, setIsDateToValid] = useState(true);

  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [plantList, setPlantList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPlantLookup, setShowPlantLookup] = useState(false);
  const [showUserLookup, setShowUserLookup] = useState(false);
  const [stateCodeList, setStateCodeList] = useState([]);
  const [clearDateTrigger, setClearDateTrigger] = useState(0);
  const [isTabValid, setIsTabValid] = useState(false);
  const CUSTOMER_LISTING_REPORT_ID = process.env.REACT_APP_SP_CUSTOMER_LISTING_REPORT;

  const formik = useFormik({
    initialValues: {
      customerInput: "",
      customerPK: null,
      plantInput: "",
      plantPK: null,
      accountManagerInput: "",
      accountManagerPK: null,
      dateFrom: "",
      dateTo: "",
      customerState: "",
      projections: false,
      showPlant: false,
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    customerInput,
    customerPK,
    plantInput,
    plantPK,
    accountManagerInput,
    accountManagerPK,
    dateFrom,
    dateTo,
    customerState,
    projections,
    showPlant,
  } = values;

  const params = {
    CustomerPK: customerPK || null,
    CustomerPlantFK: plantPK || null,
    AccountManagerFK: accountManagerPK || null,
    FromDate: formatDatetimeToDate(dateFrom) || null,
    ToDate: formatDatetimeToDate(dateTo) || null,
    CustomerState: customerState || null,
    Projection: projections || false,
    ShowPlant: showPlant || false,
  };

  const isFromMissingWhenToPresent = dateTo && !dateFrom;
  const isToMissingWhenFromPresent = dateFrom && !dateTo;

  const fetchCustomerList = (string) => {
    setAutoCompleteLoading(true);
    CustomerListingReportService.getCustomerList({
      searchTerm: string,
      plantPK: plantPK,
      accountManagerFK: accountManagerPK,
      customerState: customerState,
      pageSize: 100,
      type: "AutoComplete",
    })
      .then((response) => {
        const { data } = response;
        setCustomerList(data);
      })
      .finally(() => {
        setAutoCompleteLoading(false);
      });
  };

  const fetchPlantList = (string) => {
    setAutoCompleteLoading(true);
    CustomerListingReportService.getPlantList({
      searchTerm: string,
      customerPK: customerPK,
      accountManagerFK: accountManagerPK,
      customerState: customerState,
      pageSize: 100,
      type: "AutoComplete",
    })
      .then((response) => {
        const { data } = response;
        setPlantList(data);
      })
      .finally(() => {
        setAutoCompleteLoading(false);
      });
  };

  const fetchAccountManagerList = (searchTerm) => {
    setAutoCompleteLoading(true);

    CustomerListingReportService.getUserList({
      searchTerm,
      type: "LookUp",
      pageNumber: 0,
    })
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0 && data[0].Empty === true) {
          setUserList([]);
        } else {
          const userList = data?.map((user) => ({
            ...user,
            Name: user?.Name?.trim(),
          }));
          setUserList(userList || []);
        }
      })
      .finally(() => {
        setAutoCompleteLoading(false);
      });
  };
  const handleCustomerSelection = (item) => {
    setValues({
      ...values,
      customerPK: item.CustomerPK || item.customerPK,
      customerInput: item.Name?.trim() || item.Description?.trim() || item.description?.trim(),
    });
    setSelectedCustomer(item);
    if (!customerState) {
      setFieldValue("customerState", item?.StateCode || "");
    }

    if (item?.AccountManagerUserFK) {
      setFieldValue("accountManagerPK", item?.AccountManagerUserFK || null);
      setFieldValue("accountManagerInput", item?.AccountManagerName || "");
    }
    setShowCustomerLookup(false);
    setFieldValue("showPlant", false);
  };

  const handlePlantSelection = (item) => {
    setValues({
      ...values,
      plantPK: item.CustomerPlantPK || item.customerPlantPK,
      plantInput: item.Name?.trim() || item.name?.trim(),
    });
    setFieldValue("projections", false);
    setShowPlantLookup(false);
  };

  const handleUserSelection = (item) => {
    setValues({
      ...values,
      accountManagerPK: item.UserPK || item.userPK,
      accountManagerInput: item.Name?.trim() || item.name?.trim(),
      plantPK: null,
      plantInput: "",
    });
    setShowUserLookup(false);
  };

  useEffect(() => {
    const fetchStateCodes = () => {
      CustomerListingReportService.getCustomerStateCodeList({ customerPK })
        .then(({ data }) => {
          setStateCodeList(data);
        })
        .catch(() => {});
    };

    fetchStateCodes();
  }, []);

  // Tab validation
  useEffect(() => {
    if (
      isDateFromValid &&
      isDateToValid &&
      (customerPK || !customerInput) &&
      (plantPK || !plantInput) &&
      ((!dateFrom && isDateToValid) || (dateTo && isDateToValid)) &&
      (!dateFrom || dateTo) &&
      (!dateTo || dateFrom) &&
      (accountManagerPK || !accountManagerInput)
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [
    isDateFromValid,
    isDateToValid,
    dateFrom,
    dateTo,
    accountManagerPK,
    accountManagerInput,
    customerPK,
    customerInput,
    plantPK,
    plantInput,
  ]);

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0 m-l-5">
              {/* Dispatcher */}
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Customer</Form.Label>
                </Col>
                <Col xs={5} className="p-0 d-flex m-l-10 w-275px">
                  <AutoCompleteDropdown
                    arrayList={customerList}
                    searchString={customerInput}
                    renderItemId={(item) => item?.CustomerPK}
                    renderItemField={(item) => item?.Description}
                    handleSearchString={(string) => setFieldValue("customerInput", string)}
                    fetchDataBySearchString={fetchCustomerList}
                    onSelect={handleCustomerSelection}
                    selectedId={customerPK}
                    clearInputCallback={() => {
                      setFieldValue("customerPK", null);
                      setSelectedCustomer(null);
                      setFieldValue("customerState", "");
                    }}
                    handleAutoCompleteClose={() => {
                      setFieldValue("customerPK", null);
                      setSelectedCustomer(null);
                      setFieldValue("customerState", "");
                      setFieldValue("accountManagerPK", null);
                      setFieldValue("accountManagerInput", "");
                    }}
                    className={customerPK || !customerInput ? "" : "borderRed"}
                    loading={autoCompleteLoading}
                    maxHeight="200px"
                  />
                  <LookupButton onClick={() => setShowCustomerLookup(true)} />
                </Col>
              </Form.Group>
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Plant</Form.Label>
                </Col>
                <Col xs={5} className="p-0 d-flex m-l-10 w-275px">
                  <AutoCompleteDropdown
                    arrayList={plantList}
                    searchString={plantInput}
                    renderItemId={(item) => item.CustomerPlantPK}
                    renderItemField={(item) => item.Name}
                    handleSearchString={(string) => setFieldValue("plantInput", string)}
                    fetchDataBySearchString={fetchPlantList}
                    onSelect={handlePlantSelection}
                    selectedId={plantPK}
                    clearInputCallback={() => {
                      setFieldValue("plantPK", null);
                      setFieldValue("showPlant", false);
                    }}
                    handleAutoCompleteClose={() => setFieldValue("plantPK", null)}
                    loading={autoCompleteLoading}
                    maxHeight="200px"
                    className={plantPK || !plantInput ? "" : "borderRed"}
                    disabled={
                      (selectedCustomer && !selectedCustomer?.UsePlants) ||
                      (!selectedCustomer && accountManagerPK)
                    }
                  />
                  <LookupButton
                    onClick={() => setShowPlantLookup(true)}
                    disabled={
                      (selectedCustomer && !selectedCustomer?.UsePlants) ||
                      (!selectedCustomer && accountManagerPK)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Account Manager</Form.Label>
                </Col>
                <Col xs={5} className="p-0 d-flex m-l-10 w-275px">
                  <AutoCompleteDropdown
                    arrayList={userList}
                    searchString={accountManagerInput}
                    renderItemId={(item) => item?.UserPK}
                    renderItemField={(item) => item?.Name}
                    handleSearchString={(string) => setFieldValue("accountManagerInput", string)}
                    fetchDataBySearchString={fetchAccountManagerList}
                    onSelect={handleUserSelection}
                    selectedId={accountManagerPK}
                    clearInputCallback={() => setFieldValue("accountManagerPK", null)}
                    handleAutoCompleteClose={() => setFieldValue("accountManagerPK", null)}
                    className={accountManagerPK || !accountManagerInput ? "" : "borderRed"}
                    loading={autoCompleteLoading}
                    maxHeight="200px"
                    disabled={customerPK || plantPK}
                  />
                  <LookupButton onClick={() => setShowUserLookup(true)} disabled={customerPK || plantPK} />
                </Col>
              </Form.Group>

              <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Last Order Date From</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                  <DateInputField
                    name="dateFrom"
                    date={dateFrom}
                    max={dateTo ? parseLocalDate(dateTo) : new Date()}
                    setDate={(date) => setFieldValue("dateFrom", date)}
                    setIsDateValid={setIsDateFromValid}
                    clearDateTrigger={clearDateTrigger}
                    className={!isDateFromValid || isFromMissingWhenToPresent ? "borderRed" : ""}
                  />
                </Col>

                <Col xs={2} className="" style={{ width: "40px" }}>
                  to
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                  <DateInputField
                    name="dateTo"
                    min={dateFrom && parseLocalDate(dateFrom)}
                    max={new Date()}
                    date={dateTo}
                    setDate={(date) => setFieldValue("dateTo", date)}
                    setIsDateValid={setIsDateToValid}
                    clearDateTrigger={clearDateTrigger}
                    className={!isDateToValid || isToMissingWhenFromPresent ? "borderRed" : ""}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Customer State</Form.Label>
                </Col>
                <Col xs={3} className="p-0 d-flex m-l-10">
                  <Form.Select
                    className={`customFormControl`}
                    name="creditCardPayments"
                    value={customerState}
                    onChange={(e) => setFieldValue("customerState", e.target.value)}
                    disabled={customerPK || plantPK}
                  >
                    <option value="">--Select--</option>
                    {stateCodeList?.map((sc) => (
                      <option key={sc?.StateCode} value={sc?.StateCode}>
                        {sc?.StateName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group className={`form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3`}>
                <Col xs={2} className="p-0">
                  <Form.Label className=" customColFormLabel">Projections</Form.Label>
                </Col>

                <Col xs={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="projections"
                    name="projections"
                    checked={projections}
                    onChange={(e) => setFieldValue("projections", e.target.checked)}
                    disabled={plantPK || showPlant}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={`form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3`}>
                <Col xs={2} className="p-0">
                  <Form.Label className=" customColFormLabel">Show Plant</Form.Label>
                </Col>

                <Col xs={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="showPlant"
                    name="showPlant"
                    checked={showPlant}
                    onChange={(e) => {
                      setFieldValue("showPlant", e.target.checked);
                      setFieldValue("projections", false);
                    }}
                    disabled={selectedCustomer && !selectedCustomer?.UsePlants}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <CustomerLookup
        show={showCustomerLookup}
        onHide={() => setShowCustomerLookup(false)}
        renderItemId={(customer) => customer?.CustomerPK}
        handleLookupSelection={handleCustomerSelection}
        fetchFunction={(params) =>
          CustomerListingReportService.getCustomerList({
            type: "LookUp",
            plantPK: plantPK,
            accountManagerFK: accountManagerPK,
            customerState: customerPK ? "" : customerState,
            firstField: params?.advancedSortingOrder?.firstField,
            secondField: params?.advancedSortingOrder?.secondField,
            thirdField: params?.advancedSortingOrder?.thirdField,
            name: params?.advancedSearchObject?.name,
            city: params?.advancedSearchObject?.city,
            stateCode: params?.advancedSearchObject?.stateCode,
            ...params,
          })
        }
        renderCol1={(customer) => customer?.Name}
        renderCol2={(customer) => customer?.City}
        renderCol3={(customer) => customer?.StateCode}
      />
      <CustomerPlantsLookup
        show={showPlantLookup}
        onHide={() => setShowPlantLookup(false)}
        renderItemId={(plant) => plant?.CustomerPlantPK}
        handleLookupSelection={handlePlantSelection}
        fetchFunction={(params) =>
          CustomerListingReportService.getPlantList({
            type: "LookUp",
            customerPK: customerPK,
            accountManagerFK: accountManagerPK,
            customerState: customerState,
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
      <UserLookup
        show={showUserLookup}
        onHide={() => setShowUserLookup(false)}
        renderItemId={(user) => user?.UserPK}
        handleLookupSelection={handleUserSelection}
        fetchFunction={(params) =>
          CustomerListingReportService.getUserList({
            type: "LookUp",
            firstField: params?.advancedSortingOrder?.firstField,
            secondField: params?.advancedSortingOrder?.secondField,
            name: params?.advancedSearchObject?.name,
            login: params?.advancedSearchObject?.login,
            ...params,
          })
        }
        renderCol1={(user) => user?.Name}
        renderCol2={(user) => user?.Login}
      />
    </>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
        setFieldValue("dateFrom", "");
        setFieldValue("dateTo", "");
        setClearDateTrigger((s) => s + 1);
      }}
      id={CUSTOMER_LISTING_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default CustomerListingReport;
