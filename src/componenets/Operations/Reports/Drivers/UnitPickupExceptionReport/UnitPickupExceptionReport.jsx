import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import CustomerService from "../../../../../services/CustomerService";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import UsersService from "../../../../../services/UsersService";
import LoadingIcon from "../../../../common/LoadingIcon";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import YardService from "../../../../../services/YardService";
import DriverService from "../../../../../services/DriverService";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import PreviewPopup from "../../../../common/PreviewPopup";
import ReportsFooter from "../../../../common/ReportsFooter";
import CommonReportService from "../../../../../services/Reports/CommonReportService";
import toast from "react-hot-toast";
import Header from "../../../../common/Header";
import { useNavigate } from "react-router-dom";
import {
  setDivision,
  setSource,
  setSelectedBy,
  setPickupYardPK,
  setPickupYardInput,
  setDispatcherPK,
  setDispatcherInput,
  setDriver,
  setDriverInput,
  setCustomerPK,
  setCustomerInput,
  setPlantPK,
  setPlantInput,
  setDeliveryStates,
  setMinimumPriority,
  setShowTodaysDispatches,
  setShowNotes,
  setReportType,
  setIsDpu,
  setIsPlant,
  setDispatcherDefaulted,
  resetStates,
} from "../../../../../redux/Reports/UnitPickupExceptionSlice";
import { resetChanges } from "../../../../../redux/CustomerPlantMaintenanceSlice";

const UnitPickupExceptionReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const division = useSelector((state) => state.unitPickupException.division);
  const source = useSelector((state) => state.unitPickupException.source);
  const selectedBy = useSelector((state) => state.unitPickupException.selectedBy);
  const pickupYardPK = useSelector((state) => state.unitPickupException.pickupYardPK);
  const pickupYardInput = useSelector((state) => state.unitPickupException.pickupYardInput);
  const dispatcherPK = useSelector((state) => state.unitPickupException.dispatcherPK);
  const dispatcherInput = useSelector((state) => state.unitPickupException.dispatcherInput);
  const driver = useSelector((state) => state.unitPickupException.driver);
  const driverInput = useSelector((state) => state.unitPickupException.driverInput);
  const customerPK = useSelector((state) => state.unitPickupException.customerPK);
  const customerInput = useSelector((state) => state.unitPickupException.customerInput);
  const plantPK = useSelector((state) => state.unitPickupException.plantPK);
  const plantInput = useSelector((state) => state.unitPickupException.plantInput);
  const dealerPK = useSelector((state) => state.unitPickupException.dealerPK);
  const dealerInput = useSelector((state) => state.unitPickupException.dealerInput);
  const userPK = useSelector((state) => state.unitPickupException.userPK);
  const userInput = useSelector((state) => state.unitPickupException.userInput);
  const deliveryStates = useSelector((state) => state.unitPickupException.deliveryStates);
  const minimumPriority = useSelector((state) => state.unitPickupException.minimumPriority);
  const showTodaysDispatches = useSelector((state) => state.unitPickupException.showTodaysDispatches);
  const showNotes = useSelector((state) => state.unitPickupException.showNotes);
  const reportFlag = useSelector((state) => state.unitPickupException.reportFlag);
  const isDpu = useSelector((state) => state.unitPickupException.isDpu);
  const isPlant = useSelector((state) => state.unitPickupException.isPlant);
  const dispatcherDefaulted = useSelector((state) => state.unitPickupException.dispatcherDefaulted);

  // Local UI state (not form data â€” stays local)
  const [isTabValid, setIsTabValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [showPlantLookUp, setShowPlantLookUp] = useState(false);
  const [pickupYardData, setPickupYardData] = useState([]);
  const [pickupYardLoader, setPickupYardLoader] = useState(false);
  const [showPickupYardLookup, setShowPickupYardLookup] = useState(false);
  const [dispatcherLoader, setDispatcherLoader] = useState(false);
  const [dispatchUserData, setDispatchUserData] = useState([]);
  const [showDispatcherLookUp, setShowDispatcherLookUp] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [showDriverLookup, setShowDriverLookup] = useState(false);
  const [driverLoader, setDriverLoader] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [permissionLoader, setPermissionLoader] = useState(false);
  const [dispatchUserFlag, setDispatchUserFlag] = useState([]);
  const id = 38;

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userID = loggedInUser?.userPK;

  const getDispatchUserByPermission = () => {
    setPermissionLoader(true);
    UsersService.getDispatcherUserByPermission(userID)
      .then((res) => {
        const response = res?.data;
        setDispatchUserFlag(response[0]?.IsDispatcher);
        if (response[0]?.IsDispatcher) {
          dispatch(setDispatcherPK(loggedInUser?.userPK));
          dispatch(setDispatcherInput(loggedInUser?.name?.trim()));
        }
      })
      .catch(() => {})
      .finally(() => {
        setPermissionLoader(false);
        dispatch(setDispatcherDefaulted(true));
      });
  };

  // Pickup Yard
  const fetchPickupYard = (string) => {
    setPickupYardLoader(true);
    YardService.getPickupYardForUnitException("Beginning", string, 0, "", false, 100, "AutoComplete")
      .then((response) => {
        setPickupYardData(response.data);
      })
      .catch(() => {})
      .finally(() => {
        setPickupYardLoader(false);
      });
  };

  const handlePickupYardSelection = (yard) => {
    dispatch(setPickupYardPK(yard.YardPK));
    dispatch(setPickupYardInput(yard.Description?.trim()));
    setShowPickupYardLookup(false);
  };

  // Dispatcher
  const fetchDispatcherForUnitException = (string) => {
    setDispatcherLoader(true);
    UsersService.getDispatcherForUnitException({ searchTerm: string, pageSize: 100 })
      .then((response) => {
        setDispatchUserData(response.data);
      })
      .catch(() => {})
      .finally(() => {
        setDispatcherLoader(false);
      });
  };

  const handleUserSelection = (user) => {
    dispatch(setDispatcherPK(user.UserPK));
    dispatch(setDispatcherInput(user.Name?.trim()));
    setShowDispatcherLookUp(false);
  };

  // Driver
  const fetchDriverList = (string) => {
    setDriverLoader(true);
    DriverService.getDriverForForUnitException({
      searchTerm: string,
      pageSize: 100,
      searchCriteria: "Beginning",
      pageNumber: 0,
    })
      .then((response) => {
        setDriverList(response?.data);
      })
      .catch(() => {})
      .finally(() => {
        setDriverLoader(false);
      });
  };

  const handleDriverLookupSelection = (selectedDriver) => {
    dispatch(setDriver(selectedDriver?.DriverPK || selectedDriver?.driverPK));
    const lookupName = [selectedDriver?.firstName, selectedDriver?.lastName].filter(Boolean).join(" ");
    dispatch(setDriverInput(selectedDriver?.DriverName || selectedDriver?.FirstName || lookupName));
    setShowDriverLookup(false);
  };

  // Customer
  const fetchCustomerList = (string) => {
    setCustomerLoading(true);
    CustomerService.getCustomersForUnitExceptionReport({
      plantId: plantPK,
      searchTerms: string,
      pageSize: 100,
      selectedSearchCriteria: "Beginning",
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
    dispatch(setCustomerPK(customer.CustomerPK));
    dispatch(setCustomerInput(customer.Name?.trim() || customer.Description?.trim()));
    dispatch(setIsDpu(customer?.DPUCustomer));
    dispatch(setIsPlant(customer?.UsePlants));
    setShowCustomerLookUp(false);
  };

  // Customer Plant
  const fetchPickupPlantAuto = (string) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.getPlantsForUnitExceptionReport({
      customerPK: customerPK,
      searchTerms: string,
      pageSize: 100,
      selectedSearchCriteria: "Beginning",
    })
      .then((response) => {
        const data = response?.data;
        setPlantList(data?.slice(0, data?.length - 1));
      })
      .catch(() => {})
      .finally(() => {
        setPlantLoading(false);
      });
  };

  const handlePickupPlantLookupSelection = (plant) => {
    dispatch(setPlantPK(plant.CustomerPlantPK));
    dispatch(setPlantInput(plant.Name?.trim()));
    setShowPlantLookUp(false);
  };

  const params = {
    Division: division,
    Source: source,
    YardFK: pickupYardPK,
    DispatchUserFK: dispatcherPK,
    DriverFK: driver,
    DeliveryStates: deliveryStates,
    CustomerFK: customerPK,
    PlantFK: plantPK,
    SelectedBy: selectedBy,
    MinPriority: Number(minimumPriority),
    ShowTodaysDispatches: showTodaysDispatches,
    ShowNotes: showNotes,
  };

  const resetChanges = () => {
    window.location.reload();
  };

  const isDeliveryStatesValid =
    !deliveryStates ||
    (!deliveryStates.endsWith(",") &&
      deliveryStates.split(",").every((s) => s?.trim().length === 0 || s?.trim().length === 2));

  useEffect(() => {
    if (!dispatcherDefaulted) {
      getDispatchUserByPermission();
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      dispatch(resetStates());
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (
      (driver || !driverInput) &&
      (customerPK || !customerInput) &&
      (plantPK || !plantInput) &&
      (dispatcherPK || !dispatcherInput) &&
      (pickupYardPK || !pickupYardInput) &&
      isDeliveryStatesValid
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [
    driver,
    driverInput,
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    dealerPK,
    dealerInput,
    userPK,
    userInput,
    deliveryStates,
  ]);

  const typecheck = {
    display: 1,
    emailExcel: 2,
    emailPdf: 1,
  };

  const fetchReport = (type) => {
    if (type) {
      dispatch(setReportType(type));
    }
    setLoading(true);
    let processedParam = params;
    processedParam = { ...params, Type: typecheck[type] };
    CommonReportService.getReport(id, processedParam, type)
      .then(({ data }) => {
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

  const handleDisplayClick = () => {
    dispatch(setReportType(null));
    navigate("/unit-pickup-exception-browse-screen");
  };

  const minimumPriorityValue = (value) => {
    if (!value) return value;

    const number = value.replace(/[^\d:.\d{1}]/g, "");

    // Make sure the number contains only 10 digits
    const numberWithTenDigits = number.slice(0, 1);

    return numberWithTenDigits;
  };

  return (
    <QuarterScreenWrapper>
      <Header />
      {(loading || permissionLoader) && <LoadingIcon />}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0 m-l-10">
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Division</Form.Label>
                </Col>
                <Col xs={8} className="p-0">
                  <CustomRadioGroup
                    name="division"
                    horizontal
                    horizontalAlignmentClassName="pe-4"
                    selectedOption={division}
                    onChange={(value) => dispatch(setDivision(value))}
                    options={[
                      { value: "ALL", label: "All", width: "70px" },
                      { value: "Driveaway", label: "Driveaway" },
                      { value: "Towaway", label: "Towaway" },
                      { value: "Single", label: "Single" },
                      { value: "Flatbed", label: "Flatbed" },
                      { value: "PopUp", label: "Pop Up" },
                      { value: "TruckCamper", label: "Truck Camper" },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Source</Form.Label>
                </Col>
                <Col xs={8} className="p-0">
                  <CustomRadioGroup
                    name="source"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={source}
                    onChange={(value) => dispatch(setSource(value))}
                    options={[
                      { value: "Both", label: "Both", width: "70px" },
                      { value: "Outbound", label: "Outbound", width: "95px" },
                      { value: "Reload", label: "Reload" },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Row>
                <Col xs={6}>
                  <Form.Group className="mt-2 form-group align-items-center row m-r-0 m-l-10">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Yard</Form.Label>
                    </Col>
                    <Col xs={7} className="p-0 d-flex m-l-5">
                      <AutoCompleteDropdown
                        arrayList={pickupYardData}
                        searchString={pickupYardInput}
                        renderItemId={(yard) => yard.YardPK}
                        renderItemField={(yard) => yard.Description}
                        selectedId={pickupYardPK}
                        loading={pickupYardLoader}
                        handleSearchString={(string) => dispatch(setPickupYardInput(string))}
                        fetchDataBySearchString={fetchPickupYard}
                        onSelect={handlePickupYardSelection}
                        maxHeight="175px"
                        clearInputCallback={() => dispatch(setPickupYardPK(null))}
                        className={`customFormControl ${pickupYardPK || !pickupYardInput ? "" : "borderRed"}`}
                      />
                      <LookupButton onClick={() => setShowPickupYardLookup(true)} />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mt-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                    </Col>
                    <Col xs={7} className="p-0 d-flex m-l-5">
                      <AutoCompleteDropdown
                        arrayList={dispatchUserData}
                        searchString={dispatcherInput}
                        renderItemId={(item) => item.UserPK}
                        renderItemField={(item) => item.Name}
                        handleSearchString={(string) => dispatch(setDispatcherInput(string))}
                        fetchDataBySearchString={fetchDispatcherForUnitException}
                        onSelect={handleUserSelection}
                        selectedId={dispatcherPK}
                        clearInputCallback={() => dispatch(setDispatcherPK(null))}
                        handleAutoCompleteClose={() => dispatch(setDispatcherPK(null))}
                        className={dispatcherPK || !dispatcherInput ? "" : "borderRed"}
                        loading={dispatcherLoader}
                        maxHeight="200px"
                      />
                      <LookupButton onClick={() => setShowDispatcherLookUp(true)} />
                    </Col>
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group className="align-items-center row m-l-15 m-r-0 mt-2">
                    <Col xs={4} className="p-0 d-flex">
                      <Form.Label className="col-form-label">Show Todays Dispatches</Form.Label>
                    </Col>
                    <Col xs={1}>
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="showTodaysDispatches"
                        name="showTodaysDispatches"
                        checked={showTodaysDispatches}
                        onChange={(e) => dispatch(setShowTodaysDispatches(e.target.checked))}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="align-items-center row m-l-15 m-r-0 mt-4">
                    <Col xs={4} className="p-0 d-flex">
                      <Form.Label className="col-form-label">Show Notes</Form.Label>
                    </Col>
                    <Col xs={1}>
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="showNotes"
                        name="showNotes"
                        checked={showNotes}
                        onChange={(e) => dispatch(setShowNotes(e.target.checked))}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="align-items-center row m-l-10 m-r-0 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="col-form-label">Driver</Form.Label>
                </Col>
                <Col xs={4} className="d-flex w-260px m-l-0 p-0">
                  <AutoCompleteDropdown
                    className={`customFormControl ${driver || !driverInput ? "" : "borderRed"}`}
                    arrayList={driverList}
                    searchString={driverInput}
                    handleSearchString={(string) => dispatch(setDriverInput(string))}
                    renderItemId={(item) => item?.DriverPK}
                    renderItemField={(item) => item?.DriverName || item?.FirstName}
                    fetchDataBySearchString={fetchDriverList}
                    onSelect={handleDriverLookupSelection}
                    selectedId={driver}
                    clearInputCallback={() => dispatch(setDriver(null))}
                    loading={driverLoader}
                    maxHeight={"170px"}
                  />
                  <LookupButton onClick={() => setShowDriverLookup(true)} />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-3 align-items-center row m-l-10 m-r-0">
                <Col xs={2} className="p-0">
                  <Form.Label className="col-form-label">Delivery States</Form.Label>
                </Col>
                <Col xs={3} className="p-0" style={{ width: "220px" }}>
                  <input
                    type="text"
                    className={`customFormControl ${
                      deliveryStates && !isDeliveryStatesValid ? "borderRed" : ""
                    }`}
                    id="deliveryStates"
                    name="deliveryStates"
                    maxLength={30}
                    value={deliveryStates}
                    autoComplete="off"
                    onChange={(e) => dispatch(setDeliveryStates(e.target.value.toUpperCase()))}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-0 m-b-10 align-items-center row m-l-10 m-r-0 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="col-form-label">Customer</Form.Label>
                </Col>
                <Col xs={4} className="d-flex p-0 w-260px">
                  <AutoCompleteDropdown
                    className={`customFormControl ${customerPK || !customerInput ? "" : "borderRed"}`}
                    arrayList={customerList}
                    searchString={customerInput}
                    handleSearchString={(string) => dispatch(setCustomerInput(string))}
                    renderItemId={(item) => item.CustomerPK}
                    renderItemField={(item) => item.Description}
                    fetchDataBySearchString={fetchCustomerList}
                    onSelect={handleCustomerSelection}
                    selectedId={customerPK}
                    maxHeight="180px"
                    clearInputCallback={() => {
                      dispatch(setCustomerPK(null));
                      dispatch(setIsDpu(true));
                      dispatch(setIsPlant(true));
                    }}
                    loading={customerLoading}
                    towardsTop
                  />
                  <LookupButton onClick={() => setShowCustomerLookUp(true)} />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 m-b-10 align-items-center row m-l-10 m-r-0">
                <Col xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Plants</Form.Label>
                </Col>
                <Col xs={4} className="d-flex p-0 w-260px">
                  <AutoCompleteDropdown
                    className={`customFormControl ${plantPK || !plantInput ? "" : "borderRed"}`}
                    arrayList={plantList}
                    searchString={plantInput}
                    renderItemId={(plant) => plant.CustomerPlantPK}
                    renderItemField={(plant) => plant.Name}
                    handleSearchString={(string) => dispatch(setPlantInput(string))}
                    fetchDataBySearchString={fetchPickupPlantAuto}
                    onSelect={handlePickupPlantLookupSelection}
                    selectedId={plantPK}
                    loading={plantLoading}
                    maxHeight="200px"
                    clearInputCallback={() => dispatch(setPlantPK(null))}
                    towardsTop
                    disabled={!isPlant && !isDpu}
                  />
                  <LookupButton onClick={() => setShowPlantLookUp(true)} disabled={!isPlant && !isDpu} />
                </Col>
              </Form.Group>

              <Form.Group className="align-items-center row m-r-0 mt-3 m-l-10">
                <Col xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Dispatch Minimum Priority</Form.Label>
                </Col>
                <Col xs={5} className="d-flex p-0 w-60px">
                  <input
                    className="customFormControl"
                    id="minimumPriority"
                    name="minimumPriority"
                    type="number"
                    value={minimumPriority}
                    onChange={(e) => dispatch(setMinimumPriority(minimumPriorityValue(e.target.value)))}
                    onBeforeInput={(e) => {
                      if (e.data === "+" || e.data === "e" || !/^[1-9]*$/.test(e.data)) {
                        e.preventDefault();
                      }
                    }}
                    min={1}
                    max={9}
                    autoComplete="off"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Selected By</Form.Label>
                </Col>
                <Col xs={8} className="p-0">
                  <CustomRadioGroup
                    name="selectedBy"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={selectedBy}
                    onChange={(value) => dispatch(setSelectedBy(value))}
                    options={[
                      { value: "P", label: "Pickup Date", width: "110px" },
                      { value: "D", label: "Dispatch Date", width: "95px" },
                    ]}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>

        <YardLookup
          show={showPickupYardLookup}
          onHide={() => setShowPickupYardLookup(false)}
          renderItemId={(yard) => yard.YardPK}
          handleLookupSelection={handlePickupYardSelection}
          unitException
        />

        <DriverLookup
          show={showDriverLookup}
          onHide={() => setShowDriverLookup(false)}
          showActiveOnly
          renderItemId={(d) => d.DriverPK}
          renderItemField={(d) => d.FirstName}
          handleLookupSelection={handleDriverLookupSelection}
          unitException
        />

        <CustomerLookup
          show={showCustomerLookUp}
          onHide={() => setShowCustomerLookUp(false)}
          renderItemId={(customer) => customer.CustomerPK}
          renderItemField={(customer) => customer.Name}
          handleLookupSelection={handleCustomerSelection}
          plantId={plantPK}
          unitException
        />

        <CustomerPlantsLookup
          show={showPlantLookUp}
          onHide={() => setShowPlantLookUp(false)}
          renderItemId={(plant) => plant.CustomerPlantPK}
          handleLookupSelection={handlePickupPlantLookupSelection}
          unitException
          customerId={customerPK}
        />

        <UserLookup
          show={showDispatcherLookUp}
          onHide={() => setShowDispatcherLookUp(false)}
          renderItemId={(user) => user.UserPK}
          handleLookupSelection={handleUserSelection}
          unitException
        />
      </div>

      <ReportsFooter
        displayDisabled={loading || !isTabValid}
        emailExcelDisabled={loading || !isTabValid}
        emailPdfDisabled={loading || !isTabValid}
        printDisabled={loading || !isTabValid}
        cancelDisabled={loading}
        onDisplayClick={handleDisplayClick}
        onEmailExcelClick={() => fetchReport("emailExcel")}
        onEmailPdfClick={() => fetchReport("emailPdf")}
        onPrintClick={() => fetchReport("display")}
        onCancelClick={() => {
          dispatch(resetStates());
          if (dispatchUserFlag) {
            getDispatchUserByPermission();
          }
        }}
      />

      <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
    </QuarterScreenWrapper>
  );
};

export default UnitPickupExceptionReport;
