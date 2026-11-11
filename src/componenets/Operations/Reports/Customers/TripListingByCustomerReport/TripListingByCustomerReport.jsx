import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import ReportComponent from "../../../../common/ReportComponent";
import CustomerService from "../../../../../services/CustomerService";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import DealerLookup from "../../../../LookupScreens/Dealer/DealerLookup";
import DateInputField from "../../../../common/DateInputField";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import UsersService from "../../../../../services/UsersService";
import dealerService from "../../../../../service/dealer/dealer.service";
import DealerService from "../../../../../services/DealerService";
import LoadingIcon from "../../../../common/LoadingIcon";
import { date } from "zod";

const validationSchema = yup.object().shape({
  beginningDate: yup.date(),
  endDate: yup.date(),
  useReleaseDate: yup.boolean(),
  customerPK: yup.number(),
  customerInput: yup.string(),
  plantPK: yup.number(),
  plantInput: yup.string(),
  dealerPK: yup.number(),
  dealerInput: yup.string(),
  userPK: yup.number(),
  userInput: yup.string(),
  includeHistoryData: yup.boolean(),
  includeBackHaulData: yup.boolean(),
});

const TripListingByCustomerReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isTabValid, setIsTabValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [plantLoading, setplantLoading] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [showPlantLookUp, setShowPlantLookUp] = useState(false);
  const [dealerLoading, setDealerLoading] = useState(false);
  const [dealerList, setDealerList] = useState([]);
  const [showDealerLookUp, setShowDealerLookUp] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [userList, setuserList] = useState([]);
  const [showUserLookUp, setShowUserLookUp] = useState(false);
  const [plantReleaseFlag, setPlantReleaseFlag] = useState(true);
  const [releaseLoading, setreleaseLoading] = useState(false);
  const TRIP_LISTING_BY_CUSTOMER_REPORT_ID = process.env.REACT_APP_SP_TRIP_LISTING_BY_CUSTOMER_REPORT;

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const logUserPK = loggedInUser?.userPK;

  const formik = useFormik({
    initialValues: {
      beginningDate: new Date(),
      endDate: new Date(),
      useReleaseDate: false,
      customerPK: null,
      customerInput: "",
      plantPK: null,
      plantInput: "",
      dealerPK: null,
      dealerInput: "",
      userPK: null,
      userInput: "",
      includeHistoryData: true,
      includeBackHaulData: true,
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    beginningDate,
    endDate,
    useReleaseDate,
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    dealerPK,
    dealerInput,
    userPK,
    userInput,
    includeHistoryData,
    includeBackHaulData,
  } = values;

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
      customerInput: customer.Name || customer.Description?.trim(),
      userInput: customer?.AccountManagerName,
      userPK: customer?.AccountManagerUserFK,
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
    });
    setShowPlantLookUp(false);
  };

  //dealer
  const fetchDealerByName = (string) => {
    setDealerLoading(true);
    DealerService.getDealersForTripListingLookup(0, string, "", false, "Beginning", "AutoComplete", 100)
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
    });
    setShowUserLookUp(false);
  };

  //releaseFlag
  const fetchPlantReleaseFlag = () => {
    setreleaseLoading(true);
    CustomerPlantMaintenanceService.getPlantReleaseFlag()
      .then((response) => {
        const data = response.data[0];
        setPlantReleaseFlag(data?.RequirePlantReleases);
      })
      .catch((error) => {})
      .finally(() => {
        setreleaseLoading(false);
      });
  };

  const params = {
    BeginningDate: formatDatetimeToDate(beginningDate),
    EndDate: formatDatetimeToDate(endDate),
    UseReleaseDate: useReleaseDate,
    CustomerFK: customerPK,
    PlantFK: plantPK,
    DealerFK: dealerPK,
    UserPK: logUserPK,
    AccountManagerFK: userPK,
    IncludeHistory: includeHistoryData,
    IncludeBackHaul: includeBackHaulData,
  };

  useEffect(() => {
    fetchPlantReleaseFlag();
  }, []);

  useEffect(() => {
    if (
      beginningDate &&
      isBeginningDateValid &&
      endDate &&
      isEndDateValid &&
      (customerPK || !customerInput) &&
      (plantPK || !plantInput) &&
      (dealerPK || !dealerInput) &&
      (userPK || !userInput)
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
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    dealerPK,
    dealerInput,
    userPK,
    userInput,
  ]);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        {releaseLoading && <LoadingIcon />}
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-10">
            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                <DateInputField
                  date={beginningDate}
                  max={endDate && parseLocalDate(endDate)}
                  setDate={(date) => {
                    setFieldValue("beginningDate", date);
                  }}
                  setIsDateValid={setIsBeginningDateValid}
                  className={beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">End Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                <DateInputField
                  min={beginningDate && parseLocalDate(beginningDate)}
                  max={new Date()}
                  date={endDate}
                  setDate={(date) => setFieldValue("endDate", date)}
                  setIsDateValid={setIsEndDateValid}
                  className={endDate && isEndDateValid ? "borderGreen" : "borderRed"}
                />
              </Col>
            </Form.Group>
            {plantReleaseFlag && (
              <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-4 `}>
                <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                  <Form.Label className=" col-form-label">Use Release Date</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="useReleaseDate"
                    name="useReleaseDate"
                    checked={useReleaseDate}
                    onChange={(e) => setFieldValue("useReleaseDate", e.target.checked)}
                  />
                </Col>
              </Form.Group>
            )}

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Customer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex p-0 m-l-10">
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
                    setFieldValue("userPK", null);
                    setFieldValue("userInput", "");
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

            <Form.Group className={`mt-3 m-b-10 align-items-center row  m-l-5 m-r-0 `}>
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label m-l-0 ">Pickup Plant</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="d-flex p-0 m-l-10">
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
                />
                <LookupButton
                  onClick={() => {
                    setShowPlantLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 m-b-10 align-items-center row  m-l-5 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label m-l-0 ">Delivery Dealer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex p-0 m-l-10">
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

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-5 m-r-0">
              <Col xs={2} sm={2} className="p-0">
                <Form.Label className="customColFormLabel">Account Manager</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex m-l-10">
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
                  towardsTop
                  className={`customFormControl ${userPK || !userInput ? "" : "borderRed"} `}
                  disabled={customerPK}
                />
                <LookupButton
                  onClick={() => {
                    setShowUserLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-0 m-r-0 mt-4 `}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">Include History Data</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  // hidden={companyName === 'Wave'}
                  className="form-check-input p-0"
                  id="includeHistoryData"
                  name="includeHistoryData"
                  checked={includeHistoryData}
                  onChange={(e) => setFieldValue("includeHistoryData", e.target.checked)}
                />
              </Col>
            </Form.Group>
            <Form.Group className={` m-b-10 align-items-center row  m-l-0 m-r-0 mt-4 `}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">Include Backhaul Data</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="includeBackHaulData"
                  name="includeBackHaulData"
                  checked={includeBackHaulData}
                  onChange={(e) => setFieldValue("includeBackHaulData", e.target.checked)}
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

      <DealerLookup
        show={showDealerLookUp}
        onHide={() => {
          setShowDealerLookUp(false);
        }}
        renderItemId={(code) => code.DealerPK}
        handleLookupSelection={handleDealerSelection}
        tripListing
      />

      <UserLookup
        show={showUserLookUp}
        onHide={() => {
          setShowUserLookUp(false);
        }}
        renderItemId={(user) => user.UserPK}
        handleLookupSelection={handleUserSelection}
        tripListing
      />

      {loading && <LoadingIcon />}
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
        setFieldValue("beginningDate", new Date());
        setFieldValue("endDate", new Date());
      }}
      id={TRIP_LISTING_BY_CUSTOMER_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
      useType
    />
  );
};

export default TripListingByCustomerReport;
