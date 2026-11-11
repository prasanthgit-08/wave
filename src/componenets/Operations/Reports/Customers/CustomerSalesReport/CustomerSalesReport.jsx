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
import UnitTypeGroupsLookup from "../../../../LookupScreens/UnitTypeGroups/UnitTypeGroupsLookup";
import CustomerGroupsLookup from "../../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";
import CustomerGroupService from "../../../../../services/CustomerGroupService";
import { parseLocalDate, formatDatetimeToDate } from "../../../../../utils/dateUtils";

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
  unitTypeGroupPK: yup.number(),
  unitTypeGroupInput: yup.string(),
  customerGroupPK: yup.number(),
  customerGroupInput: yup.string(),
  showPlant: yup.boolean(),
  isPlant: yup.boolean(),
  isDpu: yup.boolean(),
});

const CustomerSalesReport = () => {
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
  const [unitTypeGroupList, setUnitTypeGroupList] = useState([]);
  const [unitTypeGroupLoading, setUnitTypeGroupLoading] = useState(false);
  const [showUnitTypeGroupLookUp, setShowUnitTypeGroupLookUp] = useState(false);
  const [customerGroupLoading, setCustomerGroupLoading] = useState(false);
  const [customerGroupList, setCustomerGroupList] = useState([]);
  const [showCustomerGroupLookUp, setShowCustomerGroupLookUp] = useState(false);
  const CUSTOMER_SALES_REPORT_ID = process.env.REACT_APP_SP_CUSTOMER_SALES_REPORT;

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
      unitTypeGroupPK: null,
      unitTypeGroupInput: "",
      customerGroupPK: null,
      customerGroupInput: "",
      showPlant: false,
      isDpu: false,
      isPlant: false,
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
    unitTypeGroupPK,
    unitTypeGroupInput,
    customerGroupPK,
    customerGroupInput,
    showPlant,
    isPlant,
    isDpu,
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
      customerGroupInput: customerGroupPK ? customerGroupInput : "",
      customerGroupPK: customerGroupPK ? customerGroupPK : null,
      plantInput: plantPK ? plantInput : "",
    });
    setShowUserLookUp(false);
  };

  //customer Api and selection handling
  const fetchCustomerList = (string) => {
    setCustomerLoading(true);
    CustomerService.getAllCustomersForCustomerSalesReport({
      plantPK,
      searchTerms: string,
      accountManagerPK: userPK,
      pageSize: 100,
    })
      .then((response) => {
        const data = response?.data;
        setCustomerList(data);
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
      isPlant: customer?.UsePlants,
      isDpu: customer?.DPUCustomer,
      // Populate Account Manager
      userPK: customer?.AccountManagerUserFK,
      userInput: customer?.AccountManagerName || "",
      plantInput: plantPK ? plantInput : "",
      customerGroupInput: customerGroupPK ? customerGroupInput : "",
    });
    setShowCustomerLookUp(false);
    if (!isPlant && !isDpu) {
      setFieldValue("plantPK", null);
      setFieldValue("plantInput", "");
    }
  };

  //CustomerPlant
  const fetchPickupPlantAuto = (string) => {
    setplantLoading(true);
    CustomerPlantMaintenanceService.getPlantsForCustomerSalesReport({
      customerPK: customerPK,
      searchTerms: string,
      pageSize: 100,
    })
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
    });
    setShowPlantLookUp(false);
  };

  //unitTypeGroup
  const getAllUnitTypeGroupsByName = (string) => {
    setUnitTypeGroupLoading(true);
    CustomerService.getAllUnitTypeGroupsForCustomer({ searchTerms: string, pageSize: 100 })
      .then((response) => {
        const data = response.data;
        setUnitTypeGroupList(data);
      })
      .finally(() => {
        setUnitTypeGroupLoading(false);
      });
  };

  const handleUnitTypeGroupsSelection = (unitTypeGroups) => {
    setValues({
      ...values,
      unitTypeGroupPK: unitTypeGroups.UnitTypeGroupPK,
      unitTypeGroupInput: unitTypeGroups.Description?.trim(),
    });
    setShowUnitTypeGroupLookUp(false);
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
      customerInput: customerPK ? customerInput : "",
      plantInput: plantPK ? plantInput : "",
      userInput: userPK ? userInput : "",
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
    accountManagerFK: userPK,
    customerGroupFK: customerGroupPK,
    unitTypeGroupFK: unitTypeGroupPK,
    showPlant: showPlant,
  };

  useEffect(() => {
    // If Plant is selected and both Customer and Customer Group are selected
    if (plantPK && customerPK && customerGroupPK) {
      // Clear Customer Group (keep Customer)
      setFieldValue("customerGroupPK", null);
      setFieldValue("customerGroupInput", "");
    }
  }, [plantPK, customerPK, customerGroupPK]);

  useEffect(() => {
    if (
      (customerPK || !customerInput) &&
      (plantPK || !plantInput) &&
      (userPK || !userInput) &&
      (customerGroupPK || !customerGroupInput) &&
      (unitTypeGroupPK || !unitTypeGroupInput) &&
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
    unitTypeGroupPK,
    unitTypeGroupInput,
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
            <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
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

            <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3">
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
                <Form.Label className="col-form-label  ">Beginning Invoice Date</Form.Label>
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
                <Form.Label className="col-form-label  ">Ending Invoice Date</Form.Label>
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
                  disabled={!!customerPK || !!plantPK}
                />
                <LookupButton
                  disabled={!!customerPK || !!plantPK}
                  onClick={() => {
                    setShowUserLookUp(true);
                  }}
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
                    setFieldValue("plantPk", null);
                    setFieldValue("plantInput", "");
                  }}
                  loading={customerLoading}
                  disabled={(!!plantPK && !!customerGroupPK) || (customerGroupPK && userPK)}
                />
                <LookupButton
                  disabled={(!!plantPK && !!customerGroupPK) || (customerGroupPK && userPK)}
                  onClick={() => {
                    setShowCustomerLookUp(true);
                  }}
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
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("plantPK", null);
                  }}
                  disabled={
                    customerGroupPK ||
                    (userPK && (!customerPK || (!isPlant && !isDpu))) ||
                    (!!customerPK && !isPlant && !isDpu)
                  }
                  towardsTop
                />
                <LookupButton
                  onClick={() => {
                    setShowPlantLookUp(true);
                  }}
                  disabled={
                    customerGroupPK ||
                    (userPK && (!customerPK || (!isPlant && !isDpu))) ||
                    (!!customerPK && !isPlant && !isDpu)
                  }
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
                  disabled={!!customerPK || !!userPK || (!!plantPK && !!customerPK)}
                  className={`customFormControl ${customerGroupPK || !customerGroupInput ? "" : "borderRed"} `}
                  towardsTop
                />
                <LookupButton
                  onClick={() => {
                    setShowCustomerGroupLookUp(true);
                  }}
                  disabled={!!customerPK || !!userPK || (!!plantPK && !!customerPK)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-10 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Unit Type Group</Form.Label>
              </Col>
              <Col xs={4} sm={4} md={4} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={unitTypeGroupList}
                  searchString={unitTypeGroupInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(unitType) => unitType.UnitTypeGroupPK}
                  renderItemField={(unitType) => unitType.Description}
                  handleSearchString={(string) => setFieldValue("unitTypeGroupInput", string)}
                  fetchDataBySearchString={getAllUnitTypeGroupsByName}
                  onSelect={handleUnitTypeGroupsSelection}
                  clearInputCallback={() => {
                    setFieldValue("unitTypeGroupPK", null);
                  }}
                  // disabled={viewDetail || !longUnitRestriction}
                  className={`customFormControl ${unitTypeGroupPK || !unitTypeGroupInput ? "" : "borderRed"} `}
                  selectedId={unitTypeGroupPK}
                  loading={unitTypeGroupLoading}
                  towardsTop
                />
                <LookupButton
                  onClick={() => {
                    setShowUnitTypeGroupLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`  align-items-center row  m-l-10 m-r-0 mt-4 `}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">Show Plant</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="showPlant"
                  name="showPlant"
                  checked={showPlant}
                  onChange={(e) => setFieldValue("showPlant", e.target.checked)}
                  disabled={(customerPK && plantPK) || (customerPK && !plantPK && !isPlant && !isDpu)}
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
        renderItemId={(customer) => customer?.CustomerPK}
        renderItemField={(customer) => customer.Name}
        handleLookupSelection={handleCustomerSelection}
        plantId={plantPK}
        accountManagerId={userPK}
        customerSalesReport
      />

      <CustomerPlantsLookup
        show={showPlantLookUp}
        onHide={() => {
          setShowPlantLookUp(false);
        }}
        renderItemId={(plant) => plant?.CustomerPlantPK}
        handleLookupSelection={handlePickupPlantLookupSelection}
        customerId={customerPK}
        customerSalesReport
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
      <UnitTypeGroupsLookup
        show={showUnitTypeGroupLookUp}
        onHide={() => {
          setShowUnitTypeGroupLookUp(false);
        }}
        renderItemId={(unitTypeGroups) => unitTypeGroups?.UnitTypeGroupPK}
        handleLookupSelection={handleUnitTypeGroupsSelection}
        commonSp
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
      id={CUSTOMER_SALES_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default CustomerSalesReport;
