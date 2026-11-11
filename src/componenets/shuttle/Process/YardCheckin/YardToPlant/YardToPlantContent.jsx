import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import ShuttleCityLookup from "../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import {
  setShuttleAmountForYardToPlant,
  setShuttleMilesForYardToPlant,
  setShuttleDateForYardToPlant,
  setIsYardCityCombinationExist,
  setPickupYardIDForYardToPlant,
  setPickupYardNameForYardToPlant,
  setPickupYardCodeForYardToPlant,
  setDeliveryCityIDForYardToPlant,
  setDeliveryCityNameForYardToPlant,
  setDeliveryPlantIDForYardToPlant,
  setDeliveryPlantNameForYardToPlant,
  setDeliveryPlantCodeForYardToPlant,
  setIsShuttleDateValid,
  setIsYardToPlantRouteConfirmed,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import DateInputField from "../../../../common/DateInputField";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import LoadingIcon from "../../../../common/LoadingIcon";

function YardToPlantContent() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Setting Current Date
  const todayDate = formatForApi(new Date());

  //Local State Declaration
  const [selectedDriverName, setSelectedDriverName] = useState("");
  const [selectedUnitNumber, setSelectedUnitNumber] = useState("");
  const [selectedUnitSpecialCode, setSelectedUnitSpecialCode] = useState("");
  const [shuttleAmount, setShuttleAmount] = useState("");
  const [miles, setMiles] = useState("");
  const [shuttleDate, setShuttleDate] = useState(todayDate);
  const [pickupYards, setPickupYards] = useState([]);
  const [pickupYardLookupShow, setPickupYardLookupShow] = useState(false);
  const [deliveryCities, setDeliveryCities] = useState([]);
  const [deliveryCityLookupShow, setDeliveryCityLookupShow] = useState(false);
  const [deliveryPlants, setDeliveryPlants] = useState([]);
  const [deliveryPlantLookupShow, setDeliveryPlantLookupShow] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [isDPUCustomer, setIsDPUCustomer] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [modalPopup, setModalPopUp] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);
  const [plant1Loading, setPlant1Loading] = useState(false);

  //Get Value From Redux
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const specialCodeOfSelectedUnit = useSelector(
    (state) => state.yardCheckinReducer.specialCodeOfSelectedUnit
  );
  const isSelectedUnitTowable = useSelector((state) => state.yardCheckinReducer.isSelectedUnitTowable);
  const isSelectedUnitMotorized = useSelector((state) => state.yardCheckinReducer.isSelectedUnitMotorized);
  const pickupYardIDForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.pickupYardIDForYardToPlant
  );
  const pickupYardNameForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.pickupYardNameForYardToPlant
  );
  const deliveryCityIDForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryCityIDForYardToPlant
  );
  const deliveryCityNameForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryCityNameForYardToPlant
  );
  const deliveryPlantIDForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryPlantIDForYardToPlant
  );
  const deliveryPlantNameForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryPlantNameForYardToPlant
  );
  const savedSuccessForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.savedSuccessForYardToPlant
  );
  const isYardToPlantRouteConfirmed = useSelector(
    (state) => state.yardCheckinReducer.isYardToPlantRouteConfirmed
  );

  useEffect(() => {
    dispatch(setIsYardToPlantRouteConfirmed(false));
  }, []);

  const confirmRoute = () => dispatch(setIsYardToPlantRouteConfirmed(true));

  const customerFKForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.customerFKForPlantToPlant
  );
  const unitPickupCustomerPlantFK = useSelector(
    (state) => state.yardCheckinReducer.unitPickupCustomerPlantFK
  );
  const selectedId = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedId);
  const selectedObject = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedObject);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);

  /****** Pickup Yard dropdown and lookup ******/
  //Service for getting all Yards by Name
  const fetchPickupYards = (string) => {
    setYardLoading(true);
    YardCheckinService.getShuttleYardByName(string, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setPickupYards(yardsList);
        setYardLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setYardLoading(false);
      });
  };

  //Handle selection from pickup yard dropdown
  const handlePickupYardSelectionFromDropdown = (pickupYard) => {
    if (pickupYard.yardPK !== "" && deliveryCityIDForYardToPlant !== "") {
      isYardCityCombinationExist(pickupYard.yardPK, deliveryCityIDForYardToPlant);
    }
    dispatch(setPickupYardIDForYardToPlant(pickupYard.yardPK));
    dispatch(setPickupYardNameForYardToPlant(pickupYard.description));
    dispatch(setPickupYardCodeForYardToPlant(pickupYard.sisterYardCode));
    confirmRoute();
  };

  //Handle selection from pickup yard lookup screen
  const handlePickupYardLookupSelection = (pickupYard) => {
    if (pickupYard.yardPK !== "" && deliveryCityIDForYardToPlant !== "") {
      isYardCityCombinationExist(pickupYard.yardPK, deliveryCityIDForYardToPlant);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setPickupYardIDForYardToPlant(pickupYard.yardPK));
    dispatch(setPickupYardNameForYardToPlant(pickupYard.description));
    dispatch(setPickupYardCodeForYardToPlant(pickupYard.sisterYardCode));
    setPickupYardLookupShow(false);
  };

  //Enable pickup yard lookup
  const handlePickupYardLookupModalShow = () => {
    setPickupYardLookupShow(true);
    confirmRoute();
  };

  //Disable pickup yard lookup
  const handlePickupYardLookupModalHide = () => {
    setPickupYardLookupShow(false);
  };

  /**** Delivery City dropdown and lookup ****/
  // Fetch all delivery cities
  const fetchDeliveryCities = (string) => {
    setPlantLoading(true);
    YardCheckinService.getShuttleCityByName(string, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data?.content;
        const cityList = data?.map((cities) => ({ ...cities, city: cities.city?.trim() }));
        setDeliveryCities(cityList);
        setPlantLoading(false);
      })
      .catch((error) => {
        setPlantLoading(false);
      });
  };

  //Handle selection from delivery city dropdown
  const handleDeliveryCitySelectionFromDropdown = (shuttleCity) => {
    if (pickupYardIDForYardToPlant !== "" && shuttleCity.shuttleCityPK !== "") {
      isYardCityCombinationExist(pickupYardIDForYardToPlant, shuttleCity.shuttleCityPK);
    }
    dispatch(setDeliveryCityIDForYardToPlant(shuttleCity.shuttleCityPK));
    dispatch(setDeliveryCityNameForYardToPlant(shuttleCity.city));
    confirmRoute();
  };

  //Enable delivery city lookup
  const handleDeliveryCityLookupModalShow = () => {
    setDeliveryCityLookupShow(true);
    confirmRoute();
  };

  //Disable delivery city lookup
  const handleDeliveryCityLookupModalHide = () => {
    setDeliveryCityLookupShow(false);
  };

  //Handle selection from delivery city look up screen
  const handleDeliveryCityLookupSelection = (shuttleCity) => {
    if (pickupYardIDForYardToPlant !== "" && shuttleCity.shuttleCityPK !== "") {
      isYardCityCombinationExist(pickupYardIDForYardToPlant, shuttleCity.shuttleCityPK);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setDeliveryCityIDForYardToPlant(shuttleCity.shuttleCityPK));
    dispatch(setDeliveryCityNameForYardToPlant(shuttleCity.city));
    setDeliveryCityLookupShow(false);
  };

  /****** Delivery plant dropdown and lookup ******/
  //Service for getting all Plants by Name
  const fetchAllPlants = (searchString) => {
    setPlant1Loading(true);
    YardCheckinService.fetchPickupPlantdetailsByName(
      customerId,
      isDPUCustomer,
      searchString,
      selectedUnitCompanyName
    )
      .then((response) => {
        const data = response.data?.content;
        const plantList = data?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        setDeliveryPlants(plantList);
        setPlant1Loading(false);
      })
      .catch((err) => {
        setPlant1Loading(false);
      });
  };

  //Handle selection from delivery plant dropdown
  const handleDeliveryPlantSelectionFromDropdown = (plant) => {
    dispatch(setDeliveryPlantIDForYardToPlant(plant.customerPlantPK));
    dispatch(setDeliveryPlantNameForYardToPlant(plant.name));
    dispatch(setDeliveryPlantCodeForYardToPlant(plant.sisterPlantCode));
    confirmRoute();
  };

  //Handle selection from pickup yard lookup screen
  const handleDeliveryPlantLookupSelection = (plant) => {
    dispatch(setDeliveryPlantIDForYardToPlant(plant.customerPlantPK));
    dispatch(setDeliveryPlantNameForYardToPlant(plant.name?.trim()));
    dispatch(setDeliveryPlantCodeForYardToPlant(plant.sisterPlantCode));
    setDeliveryPlantLookupShow(false);
  };

  //Enable Plant  lookup
  const handlePlantLookupModalShow = () => {
    setDeliveryPlantLookupShow(true);
    confirmRoute();
  };

  //Disable Plant lookup
  const handlePlantLookupModalHide = () => {
    setDeliveryPlantLookupShow(false);
  };

  /**** Service to check the Yard-City combination  ****/
  const isYardCityCombinationExist = (pickupYard, deliveryCityID) => {
    if (pickupYard != null && deliveryCityID != null) {
      setLoading(true);
      YardCheckinService.cityToYardCombinationCheckForShuttle(
        deliveryCityID,
        pickupYard,
        isSelectedUnitTowable,
        isSelectedUnitMotorized,
        selectedUnitCompanyName
      )
        .then((res) => {
          const data = res.data;
          if (data.combinationExists) {
            setWarningMessage(data.combinationExists);
          } else if (data.error) {
            setWarningMessage(data.error);
          }
          if (data.towableFee) {
            setShuttleAmount(data.towableShuttleReturn);
            setMiles(data.miles);
          } else if (data.motorizedFee) {
            setShuttleAmount(data.motorizedShuttleReturn);
            setMiles(data.miles);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  };

  /*** UseEffects ***/
  // UseEffect for setting selected Driver Name in local state
  useEffect(() => {
    if (selectedDriverData) {
      const fullName = `${selectedDriverData.firstName ? selectedDriverData.firstName?.trim() : ""} ${
        selectedDriverData.lastName ? selectedDriverData.lastName?.trim() : ""
      }`;
      setSelectedDriverName(fullName?.trim());
    }
  }, [selectedDriverData]);

  useEffect(() => {
    if (unitNumberSelected || specialCodeOfSelectedUnit) {
      setSelectedUnitNumber(unitNumberSelected);
      setSelectedUnitSpecialCode(specialCodeOfSelectedUnit);
    }
  }, [unitNumberSelected, specialCodeOfSelectedUnit]);

  //UseEffect for service call to check Yard-City combination
  useEffect(() => {
    if (pickupYardIDForYardToPlant !== "" && deliveryCityIDForYardToPlant !== "") {
      isYardCityCombinationExist(pickupYardIDForYardToPlant, deliveryCityIDForYardToPlant);
    }
    // eslint-disable-next-line
    //warningMessage - Multiple API calls
  }, []);

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setShuttleAmountForYardToPlant(shuttleAmount));
    dispatch(setShuttleMilesForYardToPlant(miles));
    dispatch(setShuttleDateForYardToPlant(shuttleDate));
    dispatch(setIsYardCityCombinationExist(warningMessage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuttleAmount, shuttleDate, miles, warningMessage]);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriverData === "") {
      navigate("/yard-checkin-driver-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverData]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupYardIDForYardToPlant]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [deliveryCityIDForYardToPlant]);

  useEffect(() => {
    if (unitNumberSelected === "") {
      setShuttleDate("");
      setSelectedUnitSpecialCode("");
      dispatch(setPickupYardNameForYardToPlant(""));
      dispatch(setDeliveryCityNameForYardToPlant(""));
      setWarningMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberSelected]);

  useEffect(() => {
    if (savedSuccessForYardToPlant) {
      navigate("/yard-checkin-unit-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedSuccessForYardToPlant]);

  //Service for getting selected customer details
  const getSelectedUnitCustomerDetails = (customerFKForPlantToPlant, selectedCompanyName) => {
    if (customerFKForPlantToPlant !== "") {
      YardCheckinService.getCustomerById(customerFKForPlantToPlant, selectedCompanyName)
        .then((response) => {
          const data = response.data;
          setIsDPUCustomer(
            data?.usePlants === false && data?.dpuCustomer === true ? data?.dpuCustomer : false
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (customerFKForPlantToPlant) {
      getSelectedUnitCustomerDetails(customerFKForPlantToPlant, selectedUnitCompanyName);
    }
  }, [customerFKForPlantToPlant, selectedUnitCompanyName]);

  useEffect(() => {
    if (isDPUCustomer === true) {
      setCustomerId(unitPickupCustomerPlantFK);
    } else {
      setCustomerId(customerFKForPlantToPlant);
    }
  }, [isDPUCustomer]);

  useEffect(() => {
    if (warningMessage === "" || !deliveryCityIDForYardToPlant || !pickupYardIDForYardToPlant) {
      setModalPopUp(false);
    } else {
      setModalPopUp(true);
    }
  }, [warningMessage, deliveryCityIDForYardToPlant, pickupYardIDForYardToPlant]);

  useEffect(() => {
    if (selectedId) {
      dispatch(setPickupYardNameForYardToPlant(selectedObject?.PickupLocation));
      dispatch(setPickupYardIDForYardToPlant(selectedObject?.PickupYardFK));
      dispatch(setDeliveryPlantNameForYardToPlant(selectedObject?.DeliveryLocation));
      dispatch(setDeliveryPlantIDForYardToPlant(selectedObject?.DeliveryCustomerPLantFK));
      dispatch(setDeliveryCityNameForYardToPlant(selectedObject?.DeliveryShuttleName));
      dispatch(setDeliveryCityIDForYardToPlant(selectedObject?.DeliveryShuttleCityFK));
      if (selectedObject?.DeliveryShuttleCityFK === null) {
        dispatch(setDeliveryCityNameForYardToPlant(""));
        dispatch(setDeliveryCityIDForYardToPlant(null));
      }
    }
  }, [selectedId, selectedObject]);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 mt-5 mb-5" xs={7}>
              {/*** Driver ***/}
              <Form.Group className="mt-1  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Driver
                  </Form.Label>
                </Col>

                <Col s={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    id="selectedDriverName"
                    name="selectedDriverName"
                    value={selectedDriverName}
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              {/*** Unit Number ***/}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col s={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    maxLength={30}
                    value={selectedUnitNumber}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              {/***  Special Code ***/}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Special Code
                  </Form.Label>
                </Col>

                <Col s={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    maxLength={30}
                    value={selectedUnitSpecialCode}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              {/*** Shuttle Amount ***/}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Shuttle Amount
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "65px" }}>
                  <input
                    className="customFormControl"
                    name="shuttleAmount"
                    type="text"
                    value={shuttleAmount}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              {/***  Shuttle Date ***/}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Shuttle Date
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "100px" }}>
                  <DateInputField
                    date={shuttleDate}
                    setIsDateValid={(value) => dispatch(setIsShuttleDateValid(value))}
                    name="shuttleDate"
                    setDate={setShuttleDate}
                    className={`customFormControl ${
                      shuttleDate === "" || !isShuttleDateValid ? "borderRed" : "borderGreen"
                    }`}
                  />
                </Col>
              </Form.Group>

              {/***  Pickup Yard ***/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Pickup Yard</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={pickupYards}
                    searchString={pickupYardNameForYardToPlant}
                    renderItemId={(pickupYards) => pickupYards.yardPK}
                    renderItemField={(pickupYards) => pickupYards.description}
                    handleSearchString={(string) => dispatch(setPickupYardNameForYardToPlant(string))}
                    fetchDataBySearchString={fetchPickupYards}
                    loading={yardLoading}
                    onSelect={handlePickupYardSelectionFromDropdown}
                    selectedId={pickupYardIDForYardToPlant}
                    clearInputCallback={() => {
                      dispatch(setPickupYardIDForYardToPlant(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                      dispatch(setPickupYardCodeForYardToPlant(""));
                    }}
                    className={`${
                      pickupYardIDForYardToPlant === "" ||
                      pickupYardNameForYardToPlant === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                    towardsTop={true}
                    handleInputOnClick={confirmRoute}
                  />
                  <LookupButton onClick={handlePickupYardLookupModalShow} />
                </Col>

                <Col xs="auto" className="p-0 d-flex align-items-center">
                  <span className="ms-2">
                    <button
                      type="button"
                      className={`btn btn-sm ${isYardToPlantRouteConfirmed ? "btn-success" : "btn-danger"}`}
                      style={{
                        padding: "0 8px",
                        height: "24px",
                        lineHeight: "22px",
                        fontSize: "12px",
                      }}
                      onClick={confirmRoute}
                    >
                      OK
                    </button>
                  </span>
                </Col>
              </Form.Group>

              {/*** Delivery City ***/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Delivery City</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={deliveryCities}
                    searchString={deliveryCityNameForYardToPlant}
                    renderItemId={(deliveryCity) => deliveryCity.shuttleCityPK}
                    renderItemField={(deliveryCity) => deliveryCity.city}
                    handleSearchString={(string) => dispatch(setDeliveryCityNameForYardToPlant(string))}
                    fetchDataBySearchString={fetchDeliveryCities}
                    loading={plantLoading}
                    onSelect={handleDeliveryCitySelectionFromDropdown}
                    selectedId={deliveryCityIDForYardToPlant}
                    clearInputCallback={() => {
                      dispatch(setDeliveryCityIDForYardToPlant(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    className={`${
                      deliveryCityIDForYardToPlant === "" ||
                      deliveryCityNameForYardToPlant === "" ||
                      warningMessage !== "" ||
                      (selectedId && !deliveryCityIDForYardToPlant)
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                    towardsTop={true}
                    handleInputOnClick={confirmRoute}
                  />
                  <LookupButton onClick={handleDeliveryCityLookupModalShow} />
                </Col>
              </Form.Group>
              {/* Delivery Plant */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Delivery Plant</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={deliveryPlants}
                    searchString={deliveryPlantNameForYardToPlant}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    handleSearchString={(string) => dispatch(setDeliveryPlantNameForYardToPlant(string))}
                    fetchDataBySearchString={fetchAllPlants}
                    loading={plant1Loading}
                    onSelect={handleDeliveryPlantSelectionFromDropdown}
                    selectedId={deliveryPlantIDForYardToPlant}
                    clearInputCallback={() => {
                      dispatch(setDeliveryPlantIDForYardToPlant(""));
                    }}
                    className={`${
                      deliveryPlantIDForYardToPlant === "" && deliveryPlantNameForYardToPlant !== ""
                        ? "borderRed"
                        : ""
                    }`}
                    towardsTop={true}
                    handleInputOnClick={confirmRoute}
                  />
                  <LookupButton onClick={handlePlantLookupModalShow} />
                </Col>
              </Form.Group>
            </Col>
            {/* Pickup yard lookup screen */}
            <YardLookup
              show={pickupYardLookupShow}
              onHide={handlePickupYardLookupModalHide}
              renderItemId={(pickupYards) => pickupYards.yardPK}
              handleLookupSelection={handlePickupYardLookupSelection}
              shuttle
              selectedCompanyName={selectedUnitCompanyName}
            />

            {/* Delivery city lookup screen */}
            <ShuttleCityLookup
              show={deliveryCityLookupShow}
              onHide={handleDeliveryCityLookupModalHide}
              renderItemId={(deliveryCity) => deliveryCity.shuttleCityPK}
              handleLookupSelection={handleDeliveryCityLookupSelection}
              shuttle
              selectedCompanyName={selectedUnitCompanyName}
            />

            {/* Plant Lookup Modal */}
            <CustomerPlantsLookup
              show={deliveryPlantLookupShow}
              onHide={handlePlantLookupModalHide}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handleDeliveryPlantLookupSelection}
              customerId={customerId}
              isDPUCustomer={isDPUCustomer}
              shuttle
              selectedCompanyName={selectedUnitCompanyName}
            />
            <WarningModalPopUp
              show={modalPopup}
              onHide={() => {
                setModalPopUp(false);
              }}
              title={"Error"}
              body={warningMessage}
              handleOK={() => {
                setModalPopUp(false);
              }}
              showOK={true}
              color={"red"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YardToPlantContent;
