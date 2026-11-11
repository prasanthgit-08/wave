import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import LookupButton from "../../../../common/LookupButton";
import ShuttleCityLookup from "../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import {
  setSelectedUnitCompanyNameONE,
  setSelectedUnitCompanyFKONE,
  setUnitNumberForOrderNotEnter,
  setUnitTypeMotorized,
  setUnitTypeTowable,
  setCustomerSelectedForOrderNotEnter,
  setPlantSelectedForOrderNotEnter,
  setShuttleDateForOrderNotEnter,
  setShuttleAmountForOrderNotEnter,
  setShuttleMilesForOrderNotEnter,
  setPickupCityForOrderNotEnter,
  setPickupCityNameForOrderNotEnter,
  setDeliveryYardForOrderNotEnter,
  setDeliveryYardCodeForOrderNotEnter,
  setIsCityYardCombinationExistForOrderNotEnter,
  setRowForOrderNotEnter,
  setPositionForOrderNotEnter,
  setIsSelectedCustomerDPU,
  setIsShuttleDateValid,
  setIsUnitShuttleONEUnique,
} from "../../../../../redux/YardCheckinSlice";
import DateInputField from "../../../../common/DateInputField";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import LoadingIcon from "../../../../common/LoadingIcon";

function OrderNotEnterContent() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Setting Current Date
  const todayDate = formatForApi(new Date());

  //Local State Declaration
  const [selectedDriverName, setSelectedDriverName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isSelectedUnitTowable, setIsSelectedUnitTowable] = useState(true);
  const [isSelectedUnitMotorized, setIsSelectedUnitMotorized] = useState(false);
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [companyNameFK, setCompanyNameFK] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customerNameInput, setCustomerNameInput] = useState("");
  const [selectedCustomerID, setSelectedCustomerID] = useState("");
  const [customerLookupShow, setCustomerLookupShow] = useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState("");
  const [isCustomerDpu, setIsCustomerDpu] = useState(false);
  const [customerPlants, setCustomerPlants] = useState([]);
  const [customerPlantNameInput, setCustomerPlantNameInput] = useState("");
  const [selectedCustomerPlantId, setSelectedCustomerPlantId] = useState("");
  const [customerPlantLookupShow, setCustomerPlantLookupShow] = useState(false);
  const [pickupCities, setPickupCities] = useState([]);
  const [pickupCityInput, setPickupCityInput] = useState("");
  const [selectedPickupCityID, setSelectedPickupCityID] = useState("");
  const [pickupCityLookupShow, setPickupCityLookupShow] = useState(false);
  const [shuttleAmount, setShuttleAmount] = useState("");
  const [miles, setMiles] = useState("");
  const [shuttleDate, setShuttleDate] = useState(todayDate);
  const [deliveryYard, setDeliveryYard] = useState([]);
  const [deliveryYardInput, setDeliveryYardInput] = useState("");
  const [selectedDeliveryYardID, setSelectedDeliveryYardID] = useState("");
  const [deliveryYardLookupShow, setDeliveryYardLookupShow] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [modalPopup, setModalPopUp] = useState(false);
  const [loadCustomer, setLoadCustomer] = useState(false);
  const [loadPlant, setLoadPlant] = useState(false);
  const [loadCity, setLoadCity] = useState(false);
  const [loadYard, setLoadYard] = useState(false);
  const [loading, setLoading] = useState(false);

  const [row, setRow] = useState("");
  const [position, setPosition] = useState("");

  //Get Value From Redux
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const savedSuccessForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.savedSuccessForOrderNotEnter
  );
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);
  const isUnitShuttleONEUnique = useSelector((state) => state.yardCheckinReducer.isUnitShuttleONEUnique);

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);

    // Set the values based on the selected option
    if (selectedOption === "towable") {
      setIsSelectedUnitTowable(true);
      setIsSelectedUnitMotorized(false);
    } else if (selectedOption === "motorized") {
      setIsSelectedUnitTowable(false);
      setIsSelectedUnitMotorized(true);
    }
  };

  /****** Company Names dropdown******/
  //Fetch all company names
  const getCompanyNames = (companyNameInput = "") => {
    YardCheckinService.getCompanyByName(companyNameInput)
      .then((response) => {
        const data = response.data;
        setCompanyNames(data);
      })
      .catch((error) => {});
  };

  //Fetch current company name
  const getCurrentCompanyName = () => {
    YardCheckinService.getCurrentCompanyName()
      .then((response) => {
        const data = response.data;
        setCompanyNameFK(data.companyPK);
        setSelectedCompanyName(data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCompanyNames(selectedCompanyName);
    getCurrentCompanyName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /****** Customer dropdown and lookup ******/
  //Service for getting all cutomers
  const fetchAllCustomers = (string) => {
    setLoadCustomer(true);
    YardCheckinService.getCustomerDetailsForAutocomplete(string, selectedCompanyName)
      .then((response) => {
        const data = response.data.content;
        const customerList = data?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomers(customerList);
        setLoadCustomer(false);
      })
      .catch((error) => {
        setLoadCustomer(false);
      });
  };

  //Handle selection from customer dropdown
  const handleCustomerSelectionFromDropdown = (customer) => {
    setSelectedCustomerID(customer.customerPK);
    setCustomerNameInput(customer.name);
  };

  //Enable customer lookup
  const handleCustomerLookupModalShow = () => {
    setCustomerLookupShow(true);
  };

  //Disable customer lookup
  const handleCustomerLookupModalHide = () => {
    setCustomerLookupShow(false);
  };

  //Handle selection from Customer look up screen
  const handleCustomerLookupSelection = (customer) => {
    setSelectedCustomerID(customer.customerPK);
    setCustomerNameInput(customer.name);
    setCustomerLookupShow(false);
  };

  /***** Cutomer Plant dropdown and lookup */
  //Service for getting selected customer details
  const getSelectedCustomerDetails = (selectedCustomerID, selectedCompanyName) => {
    if (selectedCustomerID !== "") {
      YardCheckinService.getCustomerById(selectedCustomerID, selectedCompanyName)
        .then((response) => {
          const data = response.data;
          setSelectedCustomerData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //Service for getting Selected customer's plants
  const fetchCustomerPlantdetailForAutocomplete = (string) => {
    setLoadPlant(true);
    YardCheckinService.fetchBillingPlantdetailsByName(
      selectedCustomerID,
      isCustomerDpu,
      string,
      selectedCompanyName
    )
      .then((response) => {
        const data = response.data.content;
        const plantList = data?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        setCustomerPlants(plantList);
        setLoadPlant(false);
      })
      .catch((err) => {
        setLoadPlant(false);
      });
  };

  //Handle selection from customer plant dropdown
  const handleCustomerPlantSelectionFromDropdown = (plant) => {
    setSelectedCustomerPlantId(plant.customerPlantPK);
    setCustomerPlantNameInput(plant.name);
  };

  //Enable customer plant lookup
  const handleCustomerPlantLookupModalShow = () => {
    setCustomerPlantLookupShow(true);
  };

  //Disable customer plant lookup
  const handleCustomerPlantLookupModalHide = () => {
    setCustomerPlantLookupShow(false);
  };

  //Handle selection from customer plant look up screen
  const handleCustomerPlantLookupSelection = (plant) => {
    setSelectedCustomerPlantId(plant.customerPlantPK);
    setCustomerPlantNameInput(plant.name);
    setCustomerPlantLookupShow(false);
  };

  /****** Pickup City dropdown and lookup ******/
  //Service for getting all Pickup Cities
  const fetchPickupCities = (string) => {
    setLoadCity(true);
    YardCheckinService.getShuttleCityByName(string, selectedCompanyName)
      .then((response) => {
        const data = response.data?.content;
        const cityList = data?.map((cities) => ({ ...cities, city: cities.city?.trim() }));
        setPickupCities(cityList);
        setLoadCity(false);
      })
      .catch((error) => {
        setLoadCity(false);
      });
  };

  //Handle selection from pickup city dropdown
  const handleShuttleCitySelectionFromDropdown = (shuttleCity) => {
    if (shuttleCity.shuttleCityPK !== "" && selectedDeliveryYardID !== "") {
      isCityYardCombinationExist(shuttleCity.shuttleCityPK, selectedDeliveryYardID);
    }
    setSelectedPickupCityID(shuttleCity.shuttleCityPK);
    setPickupCityInput(shuttleCity.city);
    dispatch(setPickupCityNameForOrderNotEnter(shuttleCity.city));
  };

  //Enable shuttle city lookup
  const handleShuttleCityLookupModalShow = () => {
    setPickupCityLookupShow(true);
  };

  //Disable shuttle city lookup
  const handleShuttleCityLookupModalHide = () => {
    setPickupCityLookupShow(false);
  };

  //Handle selection from shuttle city look up screen
  const handleShuttleCityLookupSelection = (shuttleCity) => {
    if (shuttleCity.shuttleCityPK !== "" && selectedDeliveryYardID !== "") {
      isCityYardCombinationExist(shuttleCity.shuttleCityPK, selectedDeliveryYardID);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    setSelectedPickupCityID(shuttleCity.shuttleCityPK);
    setPickupCityInput(shuttleCity.city);
    dispatch(setPickupCityNameForOrderNotEnter(shuttleCity.city));
    setPickupCityLookupShow(false);
  };

  /****** Delivery Yard dropdown and lookup ******/
  //Service for getting all Yards
  const fetchDeliveryYard = (string) => {
    setLoadYard(true);
    YardCheckinService.getShuttleYardByName(string, selectedCompanyName)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setDeliveryYard(yardsList);
        setLoadYard(false);
      })
      .catch((error) => {
        setLoadYard(false);
      });
  };

  //Handle selection from delivery yard dropdown
  const handleDeliveryYardSelectionFromDropdown = (deliveryYard) => {
    if (selectedPickupCityID !== "" && deliveryYard.yardPK !== "") {
      isCityYardCombinationExist(selectedPickupCityID, deliveryYard.yardPK);
    }
    setSelectedDeliveryYardID(deliveryYard.yardPK);
    setDeliveryYardInput(deliveryYard.description);
    dispatch(setDeliveryYardCodeForOrderNotEnter(deliveryYard.sisterYardCode));
  };

  //Handle selection from delivery yard lookup screen
  const handleDeliveryYardLookupSelection = (deliveryYard) => {
    if (selectedPickupCityID !== "" && deliveryYard.yardPK !== "") {
      isCityYardCombinationExist(selectedPickupCityID, deliveryYard.yardPK);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    setSelectedDeliveryYardID(deliveryYard.yardPK);
    setDeliveryYardInput(deliveryYard.description);
    dispatch(setDeliveryYardCodeForOrderNotEnter(deliveryYard.sisterYardCode));
    setDeliveryYardLookupShow(false);
  };

  //Enable delivery yard lookup
  const handleDeliveryYardLookupModalShow = () => {
    setDeliveryYardLookupShow(true);
  };

  //Disable delivery yard lookup
  const handleDeliveryYardLookupModalHide = () => {
    setDeliveryYardLookupShow(false);
  };

  /**** Service to check the City to Yard combination  ****/
  const isCityYardCombinationExist = (pickupCity, deliveryYard) => {
    if (pickupCity != null && deliveryYard != null) {
      setLoading(true);
      YardCheckinService.cityToYardCombinationCheckForShuttle(
        pickupCity,
        deliveryYard,
        isSelectedUnitTowable,
        isSelectedUnitMotorized,
        selectedCompanyName
      )
        .then((res) => {
          const data = res.data;
          if (data.combinationExists) {
            setWarningMessage(data.combinationExists);
          } else if (data.error) {
            setWarningMessage(data.error);
          }
          if (data.towableFee) {
            setShuttleAmount(data.towableFee);
            setMiles(data.miles);
          } else if (data.motorizedFee) {
            setShuttleAmount(data.motorizedFee);
            setMiles(data.miles);
          }
        })
        .catch((err) => {
          console.log("error in checking isExisting.....");
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

  //UseEffect for service call to check City-Yard combination
  useEffect(() => {
    if (selectedPickupCityID !== "" && selectedDeliveryYardID !== "") {
      isCityYardCombinationExist(selectedPickupCityID, selectedDeliveryYardID);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSelectedCustomerDetails(selectedCustomerID);
  }, [selectedCustomerID]);

  useEffect(() => {
    if (
      selectedCustomerData !== null &&
      (selectedCustomerData?.usePlants || selectedCustomerData?.dpuCustomer)
    ) {
      setIsCustomerDpu(
        selectedCustomerData?.usePlants === false && selectedCustomerData?.dpuCustomer === true
          ? selectedCustomerData?.dpuCustomer
          : false
      );
    }
  }, [selectedCustomerData]);

  useEffect(() => {
    dispatch(setIsSelectedCustomerDPU(isCustomerDpu));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomerDpu]);

  //UseEffect for setting Unitnumber
  useEffect(() => {
    if (unitNumberSelected) {
      setUnitNumber(unitNumberSelected);
    }
  }, [unitNumberSelected]);

  useEffect(() => {
    if (unitNumberSelected === "") {
      setSelectedCompanyName("");
      setCompanyNameFK("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberSelected]);

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setUnitNumberForOrderNotEnter(unitNumber));
    dispatch(setUnitTypeMotorized(isSelectedUnitMotorized));
    dispatch(setUnitTypeTowable(isSelectedUnitTowable));
    dispatch(setSelectedUnitCompanyNameONE(selectedCompanyName));
    dispatch(setSelectedUnitCompanyFKONE(companyNameFK));
    dispatch(setCustomerSelectedForOrderNotEnter(selectedCustomerID));
    dispatch(setPlantSelectedForOrderNotEnter(selectedCustomerPlantId));
    dispatch(setShuttleDateForOrderNotEnter(shuttleDate));
    dispatch(setShuttleAmountForOrderNotEnter(shuttleAmount));
    dispatch(setShuttleMilesForOrderNotEnter(miles));
    dispatch(setPickupCityForOrderNotEnter(selectedPickupCityID));
    dispatch(setDeliveryYardForOrderNotEnter(selectedDeliveryYardID));
    dispatch(setIsCityYardCombinationExistForOrderNotEnter(warningMessage));
    dispatch(setRowForOrderNotEnter(row));
    dispatch(setPositionForOrderNotEnter(position));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    unitNumber,
    isSelectedUnitMotorized,
    isSelectedUnitTowable,
    companyNameFK,
    selectedCompanyName,
    selectedCustomerID,
    selectedCustomerPlantId,
    shuttleDate,
    shuttleAmount,
    miles,
    selectedPickupCityID,
    selectedDeliveryYardID,
    warningMessage,
    row,
    position,
  ]);

  useEffect(() => {
    setCustomers([]);
    setCustomerNameInput("");
    setSelectedCustomerID("");
    setCustomerPlants("");
    setCustomerPlantNameInput("");
    setSelectedCustomerPlantId("");
    setPickupCities([]);
    setPickupCityInput("");
    setSelectedPickupCityID("");
    setDeliveryYard([]);
    setDeliveryYardInput("");
    setSelectedDeliveryYardID("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanyName]);

  useEffect(() => {
    setCustomerPlantNameInput("");
    setSelectedCustomerPlantId("");
  }, [selectedCustomerID]);

  useEffect(() => {
    setSelectedPickupCityID("");
    setPickupCityInput("");
    setSelectedDeliveryYardID("");
    setDeliveryYardInput("");
    setShuttleAmount("");
    setMiles("");
    setWarningMessage("");
  }, [selectedOption]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [selectedPickupCityID]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [selectedDeliveryYardID]);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriverData === "") {
      navigate("/yard-checkin-driver-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverData]);

  useEffect(() => {
    if (savedSuccessForOrderNotEnter) {
      navigate("/yard-checkin-unit-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedSuccessForOrderNotEnter]);

  useEffect(() => {
    if (warningMessage === "") {
      setModalPopUp(false);
    } else {
      setModalPopUp(true);
    }
  }, [warningMessage]);

  const unitShuttleOneUniqueCheck = () => {
    YardCheckinService.checkUnitSHuttleOneUniqueness(unitNumber)
      .then((response) => {
        dispatch(setIsUnitShuttleONEUnique(response.data));
      })
      .catch((err) => {
        console.log("error in checking uniqueness of ONE unit number....");
      });
  };

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 mb-5" xs={7}>
              {/* Driver */}
              <Form.Group className=" align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Driver
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
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

              {/* Unit Number */}
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className={`customFormControl ${
                      (unitNumber !== "" && unitNumber.length < 5) ||
                      unitNumber === "" ||
                      (unitNumber !== "" && unitNumber.length >= 5 && !isUnitShuttleONEUnique)
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                    type="text"
                    value={unitNumber}
                    maxLength={21}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      dispatch(setIsUnitShuttleONEUnique(true));
                      setUnitNumber(e.target.value.toUpperCase().replace(/^\s+/, ""));
                    }}
                    onBlur={(e) => {
                      if (unitNumber.length >= 5) {
                        unitShuttleOneUniqueCheck();
                      }
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label className={` col-form-label me-4`}>Unit Type</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                  {/* Motorized */}
                  <Col className="d-flex align-items-center">
                    <input
                      className={`form-check-input ${selectedOption === "" ? "borderRed" : ""}`}
                      type="radio"
                      name="motorized"
                      value="motorized"
                      checked={selectedOption === "motorized"}
                      onChange={handleOptionChange}
                    />
                    <label className="ms-2" htmlFor="">
                      Motorized
                    </label>
                  </Col>
                  {/* Towable */}
                  <Col className="d-flex align-items-center">
                    <input
                      className={`form-check-input ${selectedOption === "" ? "borderRed" : ""}`}
                      type="radio"
                      name="towable"
                      value="towable"
                      checked={selectedOption === "towable"}
                      onChange={handleOptionChange}
                    />
                    <label className="ms-2" htmlFor="">
                      Towable
                    </label>
                  </Col>
                </Col>
              </Form.Group>

              <Form.Group className="form-group  align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label className={` col-form-label me-4`}></Form.Label>
                </Col>
              </Form.Group>

              {/* Company */}
              <Form.Group className="mt-1 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Company</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <Form.Select
                    className="customFormControl p-"
                    name="companyNameFK"
                    id="companyNameFK"
                    value={`${companyNameFK}-${selectedCompanyName}`}
                    onChange={(e) => {
                      const [companyId, companyName] = e.target.value.split("-");
                      setCompanyNameFK(companyId);
                      setSelectedCompanyName(companyName);
                    }}
                  >
                    {/* <option value="select">--Select--</option> */}
                    {companyNames?.map((item) => (
                      <option key={item.companyPK} value={`${item.companyPK}-${item.name}`}>
                        {item.name.toUpperCase()}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Customer */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Customer</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={customers}
                    searchString={customerNameInput}
                    renderItemId={(customer) => customer.customerPK}
                    renderItemField={(customer) => customer.name?.trim()}
                    handleSearchString={(string) => setCustomerNameInput(string)}
                    fetchDataBySearchString={fetchAllCustomers}
                    onSelect={handleCustomerSelectionFromDropdown}
                    selectedId={selectedCustomerID}
                    loading={loadCustomer}
                    clearInputCallback={() => {
                      setSelectedCustomerID("");
                      setSelectedCustomerPlantId("");
                    }}
                    className={`${
                      selectedCustomerID === "" || customerNameInput === "" ? "borderRed" : "borderGreen"
                    }`}
                  />
                  <LookupButton onClick={handleCustomerLookupModalShow} />
                </Col>
              </Form.Group>

              {/* Plant */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Plant</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={customerPlants}
                    searchString={customerPlantNameInput}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name?.trim()}
                    handleSearchString={(string) => setCustomerPlantNameInput(string)}
                    fetchDataBySearchString={fetchCustomerPlantdetailForAutocomplete}
                    onSelect={handleCustomerPlantSelectionFromDropdown}
                    selectedId={selectedCustomerPlantId}
                    loading={loadPlant}
                    clearInputCallback={() => {
                      setSelectedCustomerPlantId("");
                    }}
                    className={`${
                      selectedCustomerID === ""
                        ? "black"
                        : selectedCustomerPlantId === "" || customerPlantNameInput === ""
                          ? "borderRed"
                          : "borderGreen"
                    }`}
                    disabled={selectedCustomerID === "" ? true : false}
                    hidePlaceholder={selectedCustomerID === "" ? true : false}
                  />
                  <LookupButton
                    disabled={selectedCustomerID === "" ? true : false}
                    onClick={handleCustomerPlantLookupModalShow}
                  />
                </Col>
              </Form.Group>

              {/* Shuttle Amount */}
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
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

              {/* Shuttle Date */}
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
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

              {/* Pickup  City */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Pickup City</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={pickupCities}
                    searchString={pickupCityInput}
                    renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
                    renderItemField={(shuttleCity) => shuttleCity.city?.trim()}
                    handleSearchString={(string) => setPickupCityInput(string)}
                    fetchDataBySearchString={fetchPickupCities}
                    onSelect={handleShuttleCitySelectionFromDropdown}
                    selectedId={selectedPickupCityID}
                    loading={loadCity}
                    clearInputCallback={() => {
                      setSelectedPickupCityID("");
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    className={`${
                      selectedOption === ""
                        ? "black"
                        : selectedPickupCityID === "" || pickupCityInput === "" || warningMessage !== ""
                          ? "borderRed"
                          : "borderGreen"
                    }`}
                    disabled={selectedOption === "" ? true : false}
                    hidePlaceholder={selectedOption === "" ? true : false}
                    towardsTop={true}
                  />
                  <LookupButton
                    disabled={selectedOption === "" ? true : false}
                    onClick={handleShuttleCityLookupModalShow}
                  />
                </Col>
              </Form.Group>

              {/* Delivery Yard */}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Delivery Yard</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={deliveryYard}
                    searchString={deliveryYardInput}
                    renderItemId={(deliveryYard) => deliveryYard.yardPK}
                    renderItemField={(deliveryYard) => deliveryYard.description?.trim()}
                    handleSearchString={(string) => setDeliveryYardInput(string)}
                    fetchDataBySearchString={fetchDeliveryYard}
                    onSelect={handleDeliveryYardSelectionFromDropdown}
                    selectedId={selectedDeliveryYardID}
                    loading={loadYard}
                    clearInputCallback={() => {
                      setSelectedDeliveryYardID("");
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    className={`${
                      selectedOption === ""
                        ? "black"
                        : selectedDeliveryYardID === "" || deliveryYardInput === "" || warningMessage !== ""
                          ? "borderRed"
                          : "borderGreen"
                    }`}
                    disabled={selectedOption === "" ? true : false}
                    hidePlaceholder={selectedOption === "" ? true : false}
                    towardsTop={true}
                  />
                  <LookupButton
                    disabled={selectedOption === "" ? true : false}
                    onClick={handleDeliveryYardLookupModalShow}
                  />
                </Col>
              </Form.Group>

              {/* Row/Position */}
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Row / Position
                  </Form.Label>
                </Col>
                {/* Row */}
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    className={`customFormControl ${row === "" ? "borderRed" : "borderGreen"}`}
                    name="row"
                    type="text"
                    maxLength={4}
                    // style={{width:"65px"} }
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => {
                      const value = e.target.value;
                      // Regex pattern for 4-bit characters (letters and numbers)
                      const regex = /^[a-zA-Z0-9]{0,4}$/;
                      if (regex.test(value)) {
                        setRow(value);
                      } else {
                        // Remove special characters from the input value
                        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "");
                        e.target.value = sanitizedValue;
                      }
                    }}
                  />
                </Col>
                {/* Position */}
                <Col xs={1} md={1} sm={1} className="p-0 ms-3">
                  <input
                    className="customFormControl"
                    name="position"
                    type="text"
                    // style={{width:"65px"} }
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => {
                      const value = e.target.value;
                      // Regex pattern for 4-bit characters (letters and numbers)
                      const regex = /^[a-zA-Z0-9]{0,4}$/;
                      if (regex.test(value)) {
                        setPosition(e.target.value);
                      } else {
                        // Remove special characters from the input value
                        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "");
                        e.target.value = sanitizedValue;
                      }
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/* Customer Lookup Modal */}
            <CustomerLookup
              show={customerLookupShow}
              onHide={handleCustomerLookupModalHide}
              renderItemId={(customer) => customer.customerPK}
              handleLookupSelection={handleCustomerLookupSelection}
              shuttle
              selectedCompanyName={selectedCompanyName}
            />
            {/* Plant Lookup Modal */}
            <CustomerPlantsLookup
              customerId={selectedCustomerID}
              show={customerPlantLookupShow}
              onHide={handleCustomerPlantLookupModalHide}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handleCustomerPlantLookupSelection}
              isDPUCustomer={isCustomerDpu}
              shuttle
              selectedCompanyName={selectedCompanyName}
            />
            {/* Shuttle city lookup screen */}
            <ShuttleCityLookup
              show={pickupCityLookupShow}
              onHide={handleShuttleCityLookupModalHide}
              renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
              handleLookupSelection={handleShuttleCityLookupSelection}
              shuttle
              selectedCompanyName={selectedCompanyName}
            />
            {/* Delivery yard lookup screen */}
            <YardLookup
              show={deliveryYardLookupShow}
              onHide={handleDeliveryYardLookupModalHide}
              renderItemId={(deliveryYard) => deliveryYard.yardPK}
              handleLookupSelection={handleDeliveryYardLookupSelection}
              shuttle
              selectedCompanyName={selectedCompanyName}
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

export default OrderNotEnterContent;
