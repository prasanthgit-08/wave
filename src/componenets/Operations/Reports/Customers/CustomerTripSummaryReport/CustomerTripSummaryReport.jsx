import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import ReportComponent from "../../../../common/ReportComponent";
import CustomerService from "../../../../../services/CustomerService";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import DateInputField from "../../../../common/DateInputField";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import UsersService from "../../../../../services/UsersService";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import CustomerGroupsLookup from "../../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";
import CustomerGroupService from "../../../../../services/CustomerGroupService";
import { parseLocalDate, formatDatetimeToDate } from "../../../../../utils/dateUtils";
import CustomerPlantGroupsLookup from "../../../../LookupScreens/CustomerPlantGroups/CustomerPlantGroupsLookup";

const validationSchema = yup.object().shape({
  division: yup.string(),
  source: yup.string(),
  beginningDate: yup.date(),
  endDate: yup.date(),
  customerPK: yup.number(),
  customerInput: yup.string(),
  plantPK: yup.number(),
  plantInput: yup.string(),
  dealerPK: yup.number(),
  dealerInput: yup.string(),
  userPK: yup.number(),
  userInput: yup.string(),
  plantGroupPK: yup.number(),
  plantGroupInput: yup.string(),
  customerGroupPK: yup.number(),
  customerGroupInput: yup.string(),
  status: yup.string(),
  orderByUnits: yup.string(),
  isPlant: yup.boolean(),
  isDpu: yup.boolean(),
});

const CustomerTripSummaryReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isTabValid, setIsTabValid] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [plantLoading, setplantLoading] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [showPlantLookUp, setShowPlantLookUp] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [userList, setuserList] = useState([]);
  const [showUserLookUp, setShowUserLookUp] = useState(false);
  const [plantGroupList, setPlantGroupList] = useState([]);
  const [plantGroupLoading, setPlantGroupLoading] = useState(false);
  const [showplantGroupLookUp, setShowPlantGroupLookUp] = useState(false);
  const [customerGroupLoading, setCustomerGroupLoading] = useState(false);
  const [customerGroupList, setCustomerGroupList] = useState([]);
  const [showCustomerGroupLookUp, setShowCustomerGroupLookUp] = useState(false);
  const CUSTOMER_TRIP_SUMMARY_REPORT_ID = process.env.REACT_APP_SP_REPORT_CUSTOMER_TRIP_SUMMARY_REPORT;
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const loginUserPK = loggedInUser?.userPK;

  const formik = useFormik({
    initialValues: {
      division: "ALL",
      source: "Both",
      beginningDate: null,
      endDate: null,
      customerPK: null,
      customerInput: "",
      plantPK: null,
      plantInput: "",
      userPK: null,
      userInput: "",
      plantGroupPK: null,
      plantGroupInput: "",
      customerGroupPK: null,
      customerGroupInput: "",
      status: "Both",
      orderByUnits: "Units",
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    division,
    source,
    beginningDate,
    endDate,
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    userPK,
    userInput,
    plantGroupPK,
    plantGroupInput,
    customerGroupPK,
    customerGroupInput,
    status,
    orderByUnits,
  } = values;

  //Account Manager
  const fetchUser = (string) => {
    setUserLoading(true);
    UsersService.getAllUsersForTripListing({ searchTerm: string, pageSize: 100 })
      .then((response) => {
        const data = response.data;
        setuserList(data);
      })
      .catch((error) => {})
      .finally(() => {
        setUserLoading(false);
      });
  };

  const handleUserSelection = (code) => {
    setValues({
      ...values,
      userPK: code.UserPK,
      userInput: code.Name?.trim(),
      customerInput: customerPK ? customerInput : "",
      customerGroupInput: customerGroupPK ? customerGroupInput : "",
      plantInput: plantPK ? plantInput : "",
      plantGroupInput: plantGroupPK ? plantGroupInput : "",
    });
    setShowUserLookUp(false);
  };

  //customer Api and selection handling
  const fetchCustomerList = (string) => {
    setCustomerLoading(true);
    CustomerService.getAllCustomersForUndispatchedLookup(
      "Active",
      0,
      "Beginning",
      string,
      null,
      false,
      "Autocomplete"
    )
      .then((response) => {
        const data = response?.data;
        if (data[0]?.errorCode === "1") {
          setCustomerList([]);
        } else {
          setCustomerList(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  const handleCustomerSelection = (customer) => {
    setValues({
      ...values,
      customerPK: customer.CustomerPK,
      customerInput: customer.Name || customer.Description,
      // Populate Account Manager
      userPK: customer?.AccountManagerUserFK,
      userInput: customer?.AccountManagerName || "",
      customerGroupInput: customerGroupPK ? customerGroupInput : "",
      plantInput: plantPK ? plantInput : "",
      plantGroupInput: plantGroupPK ? plantGroupInput : "",
    });
    setShowCustomerLookUp(false);
  };

  //CustomerPlant
  const fetchPickupPlantAuto = (string) => {
    setplantLoading(true);
    CustomerPlantMaintenanceService.getPlantsForTripListingReport(
      "Beginning",
      string,
      0,
      "",
      false,
      "AutoComplete",
      100
    )
      .then((response) => {
        const data = response?.data;
        setPlantList(data);
      })
      .catch((err) => {})
      .finally(() => {
        setplantLoading(false);
      });
  };

  const handlePickupPlantLookupSelection = (plant) => {
    setValues({
      ...values,
      plantPK: plant.CustomerPlantPK,
      plantInput: plant.Name?.trim(),
      userInput: userPK ? userInput : "",
      customerGroupInput: customerGroupPK ? customerGroupInput : "",
      plantGroupInput: plantGroupPK ? plantGroupInput : "",
      customerInput: customerPK ? customerInput : "",
    });
    setShowPlantLookUp(false);
  };

  //plantGroup
  const getAllplantGroupsByName = (string) => {
    setPlantGroupLoading(true);
    CustomerService.getAllCustomerPlantGroupsForTripSummary({
      searchTerms: string,
      pageSize: 100,
      type: "AutoComplete",
    })
      .then((response) => {
        const data = response.data;
        setPlantGroupList(data);
      })
      .finally(() => {
        setPlantGroupLoading(false);
      });
  };

  const handlePlantGroupsSelection = (plantGroups) => {
    setValues({
      ...values,
      plantGroupPK: plantGroups.CustomerPlantGroupPK,
      plantGroupInput: plantGroups.Description?.trim(),
      userInput: userPK ? userInput : "",
      customerGroupInput: customerGroupPK ? customerGroupInput : "",
      plantInput: plantPK ? plantInput : "",
      customerInput: customerPK ? customerInput : "",
    });
    setShowPlantGroupLookUp(false);
  };

  //customerGroup
  const getCustomerGroupsByName = (string) => {
    setCustomerGroupLoading(true);
    CustomerGroupService.getAllCustomerGroupsForCustomer({ searchTerms: string, pageSize: 100 })

      .then((response) => {
        const data = response.data;
        setCustomerGroupList(data);
      })
      .finally(() => {
        setCustomerGroupLoading(false);
      });
  };

  const handleCustomerGroupsSelection = (customerGroups) => {
    setValues({
      ...values,
      customerGroupPK: customerGroups.CustomerGroupPK,
      customerGroupInput: customerGroups.Description?.trim(),
      userInput: userPK ? userInput : "",
      plantGroupInput: plantGroupPK ? plantGroupInput : "",
      plantInput: plantPK ? plantInput : "",
      customerInput: customerPK ? customerInput : "",
    });
    setShowCustomerGroupLookUp(false);
  };

  const params = {
    Division: division,
    Source: source,
    beginningDate: beginningDate ? formatDatetimeToDate(beginningDate) : null,
    endDate: endDate ? formatDatetimeToDate(endDate) : null,
    CustomerFK: customerPK,
    PlantFK: plantPK,
    AccountManagerUserFK: userPK,
    CustomerGroupFK: customerGroupPK,
    plantGroupFK: plantGroupPK,
    Status: status,
    OrderBy: orderByUnits,
    UserFK: loginUserPK,
  };

  useEffect(() => {
    if (
      (customerPK || !customerInput) &&
      (plantPK || !plantInput) &&
      (userPK || !userInput) &&
      (customerGroupPK || !customerGroupInput) &&
      (plantGroupPK || !plantGroupInput) &&
      isBeginningDateValid &&
      isEndDateValid
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    plantGroupPK,
    plantGroupInput,
    userPK,
    userInput,
    customerGroupPK,
    customerGroupInput,
    beginningDate,
    isBeginningDateValid,
    endDate,
    isEndDateValid,
  ]);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-10">
            <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mt-2">
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Division</Form.Label>
              </Col>

              <Col xs={8} className="p-0 ">
                <CustomRadioGroup
                  name="division"
                  horizontal
                  horizontalAlignmentClassName="pe-4"
                  selectedOption={division}
                  onChange={(value) => setFieldValue("division", value)}
                  options={[
                    { value: "ALL", label: "All", width: "70px" },
                    { value: "Driveaway", label: "Driveaway", disabled: false },
                    { value: "Towaway", label: "Towaway", disabled: false },
                    { value: "Single", label: "Single", disabled: false },
                    { value: "Flatbed", label: "Flatbed", disabled: false },
                    { value: "PopUp", label: "Pop Up    ", disabled: false },
                    { value: "TruckCamper", label: "Truck Camper", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mt-2">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Source</Form.Label>
              </Col>

              <Col sm={8} md={8} xs={8} className="p-0 ">
                <CustomRadioGroup
                  name="source"
                  horizontal
                  horizontalAlignmentClassName="pe-3"
                  selectedOption={source}
                  onChange={(value) => setFieldValue("source", value)}
                  options={[
                    { value: "Both", label: "Both", width: "70px" },
                    { value: "Outbound", label: "Outbound", width: "95px" },
                    { value: "Reload", label: "Reload", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>
            <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0 w-100px">
                <DateInputField
                  date={beginningDate}
                  max={endDate ? endDate && parseLocalDate(endDate) : new Date()}
                  setDate={(date) => {
                    setFieldValue("beginningDate", date);
                  }}
                  setIsDateValid={setIsBeginningDateValid}
                  className={isBeginningDateValid ? "" : "borderRed"}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Ending Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0 w-100px">
                <DateInputField
                  min={beginningDate && parseLocalDate(beginningDate)}
                  max={new Date()}
                  date={endDate}
                  setDate={(date) => setFieldValue("endDate", date)}
                  setIsDateValid={setIsEndDateValid}
                  className={isEndDateValid ? "" : "borderRed"}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Customer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex p-0 ">
                <AutoCompleteDropdown
                  className={`customFormControl ${customerPK || !customerInput ? "" : "borderRed"} `}
                  arrayList={customerList}
                  searchString={customerInput}
                  handleSearchString={(string) => setFieldValue("customerInput", string)}
                  renderItemId={(item) => item.CustomerPK}
                  renderItemField={(item) => item.Description}
                  fetchDataBySearchString={(value) => fetchCustomerList(value)}
                  onSelect={handleCustomerSelection}
                  selectedId={customerPK}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("customerPK", null);
                    setFieldValue("userPK", null);
                    setFieldValue("userInput", "");
                  }}
                  loading={customerLoading}
                  disabled={
                    !!customerGroupPK ||
                    !!plantPK ||
                    !!plantGroupPK ||
                    (customerPK && !userPK) ||
                    (!customerPK && userPK)
                  }
                />
                <LookupButton
                  disabled={
                    !!customerGroupPK ||
                    !!plantPK ||
                    !!plantGroupPK ||
                    (customerPK && !userPK) ||
                    (!customerPK && userPK)
                  }
                  onClick={() => {
                    setShowCustomerLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-10 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Customer group</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={customerGroupList}
                  searchString={customerGroupInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(customer) => customer.CustomerGroupPK}
                  renderItemField={(customer) => customer.Description}
                  handleSearchString={(string) => setFieldValue("customerGroupInput", string)}
                  fetchDataBySearchString={getCustomerGroupsByName}
                  onSelect={handleCustomerGroupsSelection}
                  selectedId={customerGroupPK}
                  loading={customerGroupLoading}
                  clearInputCallback={() => {
                    setFieldValue("customerGroupPK", null);
                  }}
                  disabled={!!customerPK || !!plantPK || !!plantGroupPK || !!userPK}
                  className={`customFormControl ${customerGroupPK || !customerGroupInput ? "" : "borderRed"} `}
                  maxHeight={"200px"}
                />
                <LookupButton
                  onClick={() => {
                    setShowCustomerGroupLookUp(true);
                  }}
                  disabled={!!customerPK || !!plantPK || !!plantGroupPK || !!userPK}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-3 m-b-10 align-items-center row  m-l-10 m-r-0 `}>
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label m-l-0 ">Plants</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="d-flex p-0 ">
                <AutoCompleteDropdown
                  className={`customFormControl ${plantPK || !plantInput ? "" : "borderRed"} `}
                  arrayList={plantList}
                  searchString={plantInput}
                  renderItemId={(plant) => plant.CustomerPlantPK}
                  renderItemField={(plant) => plant.Name}
                  handleSearchString={(string) => setFieldValue("plantInput", string)}
                  fetchDataBySearchString={fetchPickupPlantAuto}
                  onSelect={handlePickupPlantLookupSelection}
                  selectedId={plantPK}
                  loading={plantLoading}
                  maxHeight="200px"
                  clearInputCallback={() => {
                    setFieldValue("plantPK", null);
                  }}
                  disabled={!!customerPK || !!customerGroupPK || !!plantGroupPK || !!userPK}
                  towardsTop
                />
                <LookupButton
                  onClick={() => {
                    setShowPlantLookUp(true);
                  }}
                  disabled={!!customerPK || !!customerGroupPK || !!plantGroupPK || !!userPK}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-10 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Plant Group</Form.Label>
              </Col>
              <Col xs={4} sm={4} md={4} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={plantGroupList}
                  searchString={plantGroupInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(item) => item.CustomerPlantGroupPK}
                  renderItemField={(item) => item.Description}
                  handleSearchString={(string) => setFieldValue("plantGroupInput", string)}
                  fetchDataBySearchString={getAllplantGroupsByName}
                  onSelect={handlePlantGroupsSelection}
                  clearInputCallback={() => {
                    setFieldValue("plantGroupPK", null);
                  }}
                  // disabled={viewDetail || !longUnitRestriction}
                  className={`customFormControl ${plantGroupPK || !plantGroupInput ? "" : "borderRed"} `}
                  selectedId={plantGroupPK}
                  loading={plantGroupLoading}
                  towardsTop
                  disabled={!!customerPK || !!customerGroupPK || !!plantPK || !!userPK}
                />
                <LookupButton
                  onClick={() => {
                    setShowPlantGroupLookUp(true);
                  }}
                  disabled={!!customerPK || !!customerGroupPK || !!plantPK || !!userPK}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-10 m-r-0">
              <Col xs={2} sm={2} className="p-0">
                <Form.Label className="customColFormLabel">Account Manager</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={userList}
                  searchString={userInput}
                  renderItemId={(yard) => yard.UserPK}
                  renderItemField={(yard) => yard.Name}
                  selectedId={userPK}
                  loading={userLoading}
                  handleSearchString={(string) => setFieldValue("userInput", string)}
                  fetchDataBySearchString={fetchUser}
                  onSelect={handleUserSelection}
                  maxHeight="175px"
                  clearInputCallback={() => {
                    setFieldValue("userPK", null);
                  }}
                  className={`customFormControl ${!userPK && userInput ? "borderRed" : ""} `}
                  disabled={!!customerPK || !!customerGroupPK || !!plantPK || !!plantGroupPK}
                  towardsTop
                />
                <LookupButton
                  disabled={!!customerPK || !!customerGroupPK || !!plantPK || !!plantGroupPK}
                  onClick={() => {
                    setShowUserLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mt-3">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Status</Form.Label>
              </Col>

              <Col sm={8} md={8} xs={8} className="p-0 ">
                <CustomRadioGroup
                  name="status"
                  horizontal
                  horizontalAlignmentClassName="pe-3"
                  selectedOption={status}
                  onChange={(value) => setFieldValue("status", value)}
                  options={[
                    { value: "Both", label: "Both", width: "70px" },
                    { value: "Active", label: "Active", width: "95px" },
                    { value: "History", label: "History", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mt-2">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Order By Units/ Customer</Form.Label>
              </Col>

              <Col sm={8} md={8} xs={8} className="p-0 ">
                <CustomRadioGroup
                  name="orderByUnits"
                  horizontal
                  horizontalAlignmentClassName="pe-3"
                  selectedOption={orderByUnits}
                  onChange={(value) => setFieldValue("orderByUnits", value)}
                  options={[
                    { value: "Units", label: "Units", width: "70px" },
                    { value: "Customer", label: "Customer", width: "95px" },
                  ]}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </div>

      <CustomerLookup
        show={showCustomerLookUp}
        onHide={() => {
          setShowCustomerLookUp(false);
        }}
        renderItemId={(customer) => customer.CustomerPK}
        renderItemField={(customer) => customer.Name}
        handleLookupSelection={handleCustomerSelection}
        undispatchedListing
      />

      <CustomerPlantsLookup
        show={showPlantLookUp}
        onHide={() => {
          setShowPlantLookUp(false);
        }}
        renderItemId={(plant) => plant.CustomerPlantPK}
        handleLookupSelection={handlePickupPlantLookupSelection}
        tripListingByCustomer
      />

      <UserLookup
        show={showUserLookUp}
        onHide={() => {
          setShowUserLookUp(false);
        }}
        renderItemId={(user) => user?.UserPK}
        handleLookupSelection={handleUserSelection}
        tripListing
      />
      <CustomerPlantGroupsLookup
        show={showplantGroupLookUp}
        onHide={() => {
          setShowPlantGroupLookUp(false);
        }}
        renderItemId={(plantGroups) => plantGroups?.CustomerPlantGroupPK}
        handleLookupSelection={handlePlantGroupsSelection}
        customerTripSummary
      />
      <CustomerGroupsLookup
        show={showCustomerGroupLookUp}
        onHide={() => {
          setShowCustomerGroupLookUp(false);
        }}
        renderItemId={(customerGroups) => customerGroups?.customerGroupPK}
        handleLookupSelection={handleCustomerGroupsSelection}
        commonSp
      />
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
        setFieldValue("beginningDate", null);
        setFieldValue("endDate", null);
      }}
      id={CUSTOMER_TRIP_SUMMARY_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default CustomerTripSummaryReport;
