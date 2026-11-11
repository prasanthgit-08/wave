import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import ReportComponent from "../../../../common/ReportComponent";
import CustomerService from "../../../../../services/CustomerService";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import DealerLookup from "../../../../LookupScreens/Dealer/DealerLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import UsersService from "../../../../../services/UsersService";
import DealerService from "../../../../../services/DealerService";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import LoadingIcon from "../../../../common/LoadingIcon";

const validationSchema = yup.object().shape({
  division: yup.string(),
  source: yup.string(),
  selectedBy: yup.string(),
  dispatcherPK: yup.string(),
  dispatcherInput: yup.string(),
  customerPK: yup.number(),
  customerInput: yup.string(),
  plantPK: yup.number(),
  plantInput: yup.string(),
  dealerPK: yup.number(),
  dealerInput: yup.string(),
  includeBrkdownDamageDelay: yup.boolean(),
  onlyOnRoadUnits: yup.boolean(),
  usePlants: yup.boolean(),
  isDpu: yup.boolean(),
});

const OnRoadNotDeliveredReport = () => {
  const [isTabValid, setIsTabValid] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [plantLoading, setplantLoading] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [showPlantLookUp, setShowPlantLookUp] = useState(false);
  const [dealerLoading, setDealerLoading] = useState(false);
  const [dealerList, setDealerList] = useState([]);
  const [showDealerLookUp, setShowDealerLookUp] = useState(false);
  const [dispatcherLoader, setDispatcherLoader] = useState(false);
  const [permissionLoader, setPermissionLoader] = useState(false);
  const [dispatchUserData, setDispatchUserData] = useState([]);
  const [showDispatcherLookUp, setShowDispatcherLookUp] = useState(false);
  const [dispatcherdata, setDispatcherdata] = useState(false);
  const ON_ROAD_NOT_DELIVERED_REPORT_ID = process.env.REACT_APP_SP_ON_ROAD_NOT_DELIVERED_REPORT;

  const formik = useFormik({
    initialValues: {
      division: "ALL",
      source: "Both",
      pickupYardPK: null,
      pickupYardInput: "",
      dispatcherPK: null,
      dispatcherInput: "",
      customerPK: null,
      customerInput: "",
      plantPK: null,
      plantInput: "",
      dealerPK: null,
      dealerInput: "",
      includeBrkdownDamageDelay: false,
      onlyOnRoadUnits: false,
      usePlants: true,
      isDpu: true,
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    division,
    source,
    dispatcherPK,
    dispatcherInput,
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    dealerPK,
    dealerInput,
    includeBrkdownDamageDelay,
    onlyOnRoadUnits,
    usePlants,
    isDpu,
  } = values;

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  const getDispatchUserByPermission = () => {
    setPermissionLoader(true);
    UsersService.getDispatcherUserByPermission(userPK)
      .then((res) => {
        const response = res?.data;
        setDispatcherdata(response[0]?.IsDispatcher);
        if (response[0]?.IsDispatcher) {
          setFieldValue("dispatcherPK", loggedInUser?.userPK);
          setFieldValue("dispatcherInput", loggedInUser?.name?.trim());
        }
      })
      .catch(() => {})
      .finally(() => {
        setPermissionLoader(false);
      });
  };

  //dispatcher
  const getDispatchUser = (string) => {
    setDispatcherLoader(true);
    UsersService.getAllDispatchUser({ searchTerm: string, pageSize: 100 })
      .then((response) => {
        const data = response?.data;
        const backendList = data?.map((users) => ({
          ...users,
          name: users?.Name?.trim(),
          login: users?.Login?.trim(),
        }));
        let dispatcherList = backendList;
        setDispatchUserData(dispatcherList);
      })
      .finally(() => {
        setDispatcherLoader(false);
      });
  };

  const handleDispatcherSelection = (item) => {
    setValues({
      ...values,
      dispatcherPK: item.UserPK || item.userPK,
      dispatcherInput: item.Name?.trim() || item.name?.trim(),
    });
    setShowDispatcherLookUp(false);
  };

  //customer Api and selection handling
  const fetchCustomerList = (string) => {
    setCustomerLoading(true);
    CustomerService.getAllCustomersForOnRoadNotDelivered(
      plantPK,
      0,
      100,
      "Beginning",
      string,
      null,
      false,
      "Autocomplete"
    )
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
      customerInput: customer.Name?.trim() || customer.Description?.trim(),
      usePlants: customer?.UsePlants,
      isDpu: customer?.DPUCustomer,
      plantInput: plantPK ? plantInput : "",
    });
    setShowCustomerLookUp(false);
  };

  //CustomerPlant
  const fetchPickupPlantAuto = (string) => {
    setplantLoading(true);
    CustomerPlantMaintenanceService.getPlantsForOnRoadNotDeliveredReport(
      customerPK,
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
    });
    setShowPlantLookUp(false);
  };

  //dealer
  const fetchDealerByName = (string) => {
    setDealerLoading(true);
    DealerService.getDealersForOnRoadNotDelivered(0, string, "", false, "Beginning", "AutoComplete", 100)
      .then((response) => {
        const data = response.data;
        setDealerList(data);
      })
      .catch((error) => {})
      .finally(() => {
        setDealerLoading(false);
      });
  };

  const handleDealerSelection = (code) => {
    setValues({
      ...values,
      dealerPK: code.DealerPK,
      dealerInput: code.Name?.trim(),
    });
    setShowDealerLookUp(false);
  };

  // Based on Permission & logged in user, set default user
  useEffect(() => {
    getDispatchUserByPermission();
  }, []);

  const params = {
    Division: division,
    Source: source,
    DispatcherFK: dispatcherPK,
    CustomerFK: customerPK,
    PlantFK: plantPK,
    MasterDealerFK: dealerPK,
    IncludeBDD: includeBrkdownDamageDelay,
    OnlyOnRoadUnits: onlyOnRoadUnits,
  };

  useEffect(() => {
    if (
      (dispatcherPK || !dispatcherInput) &&
      (customerPK || !customerInput) &&
      (plantPK || !plantInput) &&
      (dealerPK || !dealerInput)
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [dispatcherPK, dispatcherInput, customerPK, customerInput, plantPK, plantInput, dealerPK, dealerInput]);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        {permissionLoader && <LoadingIcon />}
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
            <Form.Group className="form-group align-items-center row m-l-10 m-r-0  mt-4">
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
              </Col>
              <Col xs={4} className="p-0 d-flex m-l-0">
                <AutoCompleteDropdown
                  arrayList={dispatchUserData}
                  searchString={dispatcherInput}
                  renderItemId={(item) => item.UserPK}
                  renderItemField={(item) => item.Name}
                  handleSearchString={(string) => setFieldValue("dispatcherInput", string)}
                  fetchDataBySearchString={getDispatchUser}
                  onSelect={handleDispatcherSelection}
                  selectedId={dispatcherPK}
                  clearInputCallback={() => setFieldValue("dispatcherPK", null)}
                  handleAutoCompleteClose={() => setFieldValue("dispatcherPK", null)}
                  className={dispatcherPK || !dispatcherInput ? "" : "borderRed"}
                  loading={dispatcherLoader}
                  maxHeight="200px"
                />
                <LookupButton
                  onClick={() => {
                    setShowDispatcherLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Customer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex p-0">
                <AutoCompleteDropdown
                  className={`customFormControl ${customerPK || !customerInput ? "" : "borderRed"} `}
                  arrayList={customerList}
                  searchString={customerInput}
                  handleSearchString={(string) => setFieldValue("customerInput", string)}
                  renderItemId={(item) => item.CustomerPK}
                  renderItemField={(item) => item.Description}
                  fetchDataBySearchString={(value) => fetchCustomerList(value)}
                  onSelect={(customer) => {
                    handleCustomerSelection(customer);
                  }}
                  selectedId={customerPK}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("customerPK", null);
                    setFieldValue("usePlants", true);
                    setFieldValue("isDpu", true);
                  }}
                  loading={customerLoading}
                />
                <LookupButton
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

              <Col xs={4} md={4} sm={4} className="d-flex p-0">
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
                  disabled={!usePlants && !isDpu}
                />
                <LookupButton
                  onClick={() => {
                    setShowPlantLookUp(true);
                  }}
                  disabled={!usePlants && !isDpu}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 m-b-10 align-items-center row  m-l-10 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label m-l-0 ">Master Dealer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex p-0 m-l-0">
                <AutoCompleteDropdown
                  arrayList={dealerList}
                  searchString={dealerInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(code) => code.DealerPK}
                  renderItemField={(code) => code.Name}
                  selectedId={dealerPK}
                  handleSearchString={(string) => setFieldValue("dealerInput", string)}
                  fetchDataBySearchString={fetchDealerByName}
                  onSelect={handleDealerSelection}
                  maxHeight="170px"
                  clearInputCallback={() => {
                    setFieldValue("dealerPK", null);
                  }}
                  loading={dealerLoading}
                  className={`customFormControl ${dealerPK || !dealerInput ? "" : "borderRed"} `}
                />
                <LookupButton
                  onClick={() => {
                    setShowDealerLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`  align-items-center row  m-l-10 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">Include Breakdowns/ Damage/Delays</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                <input
                  type="checkbox"
                  // hidden={companyName === 'Wave'}
                  className="form-check-input p-0"
                  id="includeBrkdownDamageDelay"
                  name="includeBrkdownDamageDelay"
                  checked={includeBrkdownDamageDelay}
                  onChange={(e) => setFieldValue("includeBrkdownDamageDelay", e.target.checked)}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`  align-items-center row  m-l-10 m-r-0 mt-4 `}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">Only On Road Units</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="onlyOnRoadUnits"
                  name="onlyOnRoadUnits"
                  checked={onlyOnRoadUnits}
                  onChange={(e) => setFieldValue("onlyOnRoadUnits", e.target.checked)}
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
        onRoadNotDeliveredReport
        plantId={plantPK}
      />
      <DealerLookup
        show={showDealerLookUp}
        onHide={() => {
          setShowDealerLookUp(false);
        }}
        renderItemId={(code) => code.DealerPK}
        handleLookupSelection={handleDealerSelection}
        onRoadNotDeliveredReport
      />

      <CustomerPlantsLookup
        show={showPlantLookUp}
        onHide={() => {
          setShowPlantLookUp(false);
        }}
        renderItemId={(plant) => plant.CustomerPlantPK}
        handleLookupSelection={handlePickupPlantLookupSelection}
        onRoadNotDeliveredReport
        customerId={customerPK}
      />

      <UserLookup
        show={showDispatcherLookUp}
        onHide={() => setShowDispatcherLookUp(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleDispatcherSelection}
        DriverDispatchUser
      />
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        if (dispatcherdata) {
          setValues({
            ...initialValues,
            dispatcherPK: loggedInUser?.userPK,
            dispatcherInput: loggedInUser?.name?.trim(),
          });
        } else {
          setValues(initialValues);
        }
      }}
      id={ON_ROAD_NOT_DELIVERED_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default OnRoadNotDeliveredReport;
