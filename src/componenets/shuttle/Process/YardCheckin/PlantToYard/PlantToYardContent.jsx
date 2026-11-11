import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LookupButton from "../../../../common/LookupButton";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import ShuttleCityLookup from "../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import {
  setSpecialCodeOfSelectedUnit,
  setShuttleAmountForPlantToYard,
  setShuttleMilesForPlantToYard,
  setShuttleDateForPlantToYard,
  setStatusForPlantToYard,
  setPickupCityIDForPlantToYard,
  setPickupCityNameForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setDeliveryYardNameForPlantToYard,
  setDeliveryYardCodeForPlantToYard,
  setIsCityYardCombinationExist,
  setRowForPlantToYard,
  setPositionForPlantToYard,
  setGvwrForPlantToYard,
  setIsShuttleDateValid,
  setIsPlantToYardRouteConfirmed,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import DateInputField from "../../../../common/DateInputField";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import LoadingIcon from "../../../../common/LoadingIcon";

function PlantToYardContent() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Setting Current Date
  const todayDate = formatForApi(new Date());

  //Local State Declaration
  const [selectedDriverName, setSelectedDriverName] = useState("");
  const [shuttleAmount, setShuttleAmount] = useState("");
  const [miles, setMiles] = useState("");
  const [shuttleDate, setShuttleDate] = useState(todayDate);
  const [pickupCities, setPickupCities] = useState([]);
  const [pickupCityLookupShow, setPickupCityLookupShow] = useState(false);
  const [deliveryYard, setDeliveryYard] = useState([]);
  const [deliveryYardLookupShow, setDeliveryYardLookupShow] = useState(false);
  const [row, setRow] = useState("");
  const [position, setPosition] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [modalPopup, setModalPopUp] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  //Unit Activation
  const [unitActivateStatus, setUnitActivateStatus] = useState(false);

  //Get Value From Redux
  const driverDefaultCompanyName = useSelector((state) => state.yardCheckinReducer.driverDefaultCompanyName);
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const unitNumberFK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const specialCodeOfSelectedUnit = useSelector(
    (state) => state.yardCheckinReducer.specialCodeOfSelectedUnit
  );
  const isSelectedUnitTowable = useSelector((state) => state.yardCheckinReducer.isSelectedUnitTowable);
  const isSelectedUnitMotorized = useSelector((state) => state.yardCheckinReducer.isSelectedUnitMotorized);
  const pickupCityIDForPlantToYard = useSelector(
    (state) => state.yardCheckinReducer.pickupCityIDForPlantToYard
  );
  const selectedId = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedId);
  const selectedObject = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedObject);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);

  const pickupCityNameForPlantToYard = useSelector(
    (state) => state.yardCheckinReducer.pickupCityNameForPlantToYard
  );

  const deliveryYardIDForPlantToYard = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardIDForPlantToYard
  );
  const deliveryYardNameForPlantToYard = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardNameForPlantToYard
  );
  const gvwrForPlantToYard = useSelector((state) => state.yardCheckinReducer.gvwrForPlantToYard);
  const statusForPlantToYard = useSelector((state) => state.yardCheckinReducer.statusForPlantToYard);
  const savedSuccessForPlantToYard = useSelector(
    (state) => state.yardCheckinReducer.savedSuccessForPlantToYard
  );
  const isPlantToYardRouteConfirmed = useSelector(
    (state) => state.yardCheckinReducer.isPlantToYardRouteConfirmed
  );

  useEffect(() => {
    dispatch(setIsPlantToYardRouteConfirmed(false));
  }, []);

  const confirmRoute = () => dispatch(setIsPlantToYardRouteConfirmed(true));

  //Require inspection
  const customerFK = useSelector((state) => state.yardCheckinReducer.customerFKForPlantToPlant);
  const [customerData, setCustomerData] = useState("");

  const isEligibleForDelay = useSelector((state) => state.yardCheckinReducer.isEligibleForDelay);

  // function to handle radio button selection
  const handleOptionChange = (e) => {
    dispatch(setStatusForPlantToYard(e.target.value));
  };

  /****** Pickup City dropdown and lookup ******/
  // Fetch all pickup cities
  const fetchPickupCities = (string) => {
    setPlantLoading(true);
    YardCheckinService.getShuttleCityByName(string, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data?.content;
        const cityList = data?.map((cities) => ({ ...cities, city: cities.city?.trim() }));
        setPickupCities(cityList);
        setPlantLoading(false);
      })
      .catch((error) => {
        setPlantLoading(false);
      });
  };

  //Handle selection from pickup city dropdown
  const handleShuttleCitySelectionFromDropdown = (shuttleCity) => {
    if (shuttleCity.shuttleCityPK !== "" && deliveryYardIDForPlantToYard !== "") {
      isCityYardCombinationExist(shuttleCity.shuttleCityPK, deliveryYardIDForPlantToYard);
    }
    dispatch(setPickupCityIDForPlantToYard(shuttleCity.shuttleCityPK));
    dispatch(setPickupCityNameForPlantToYard(shuttleCity.city));
    confirmRoute();
  };

  //Enable shuttle city lookup
  const handleShuttleCityLookupModalShow = () => {
    setPickupCityLookupShow(true);
    confirmRoute();
  };

  //Disable shuttle city lookup
  const handleShuttleCityLookupModalHide = () => {
    setPickupCityLookupShow(false);
  };

  //Handle selection from shuttle city look up screen
  const handleShuttleCityLookupSelection = (shuttleCity) => {
    if (shuttleCity.shuttleCityPK !== "" && deliveryYardIDForPlantToYard !== "") {
      isCityYardCombinationExist(shuttleCity.shuttleCityPK, deliveryYardIDForPlantToYard);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setPickupCityIDForPlantToYard(shuttleCity.shuttleCityPK));
    dispatch(setPickupCityNameForPlantToYard(shuttleCity.city));
    setPickupCityLookupShow(false);
  };

  /****** Delivery Yard dropdown and lookup ******/
  //Service for getting all Yards
  const fetchDeliveryYard = (string) => {
    setYardLoading(true);
    YardCheckinService.getShuttleYardByName(string, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setDeliveryYard(yardsList);
        setYardLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setYardLoading(false);
      });
  };

  //Handle selection from delivery yard dropdown
  const handleDeliveryYardSelectionFromDropdown = (deliveryYard) => {
    if (pickupCityIDForPlantToYard !== "" && deliveryYard.yardPK !== "") {
      isCityYardCombinationExist(pickupCityIDForPlantToYard, deliveryYard.yardPK);
    }
    dispatch(setDeliveryYardIDForPlantToYard(deliveryYard.yardPK));
    dispatch(setDeliveryYardNameForPlantToYard(deliveryYard.description));
    dispatch(setDeliveryYardCodeForPlantToYard(deliveryYard.sisterYardCode));
    confirmRoute();
  };

  //Handle selection from delivery yard lookup screen
  const handleDeliveryYardLookupSelection = (deliveryYard) => {
    if (pickupCityIDForPlantToYard !== "" && deliveryYard.yardPK !== "") {
      isCityYardCombinationExist(pickupCityIDForPlantToYard, deliveryYard.yardPK);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setDeliveryYardIDForPlantToYard(deliveryYard.yardPK));
    dispatch(setDeliveryYardNameForPlantToYard(deliveryYard.description));
    dispatch(setDeliveryYardCodeForPlantToYard(deliveryYard.sisterYardCode));
    setDeliveryYardLookupShow(false);
  };

  //Enable delivery yard lookup
  const handleDeliveryYardLookupModalShow = () => {
    setDeliveryYardLookupShow(true);
    confirmRoute();
  };

  //Disable delivery yard lookup
  const handleDeliveryYardLookupModalHide = () => {
    setDeliveryYardLookupShow(false);
  };

  /**** Service to check the City to Yard combination  ****/
  const isCityYardCombinationExist = (pickupShuttlecity, deliveryYard) => {
    if (pickupShuttlecity != null && deliveryYard != null) {
      setLoading(true);
      YardCheckinService.cityToYardCombinationCheckForShuttle(
        pickupShuttlecity,
        deliveryYard,
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
            setShuttleAmount(data.towableFee);
            setMiles(data.miles);
          } else if (data.motorizedFee) {
            setShuttleAmount(data.motorizedFee);
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
  // UseEffect for service call to check City-Yard combination
  useEffect(() => {
    if (pickupCityIDForPlantToYard !== "" && deliveryYardIDForPlantToYard !== "") {
      isCityYardCombinationExist(pickupCityIDForPlantToYard, deliveryYardIDForPlantToYard);
    }
    // eslint-disable-next-line
  }, []);

  // UseEffect for setting selected Driver Name in local state
  useEffect(() => {
    if (selectedDriverData) {
      const fullName = `${selectedDriverData.firstName ? selectedDriverData.firstName?.trim() : ""} ${
        selectedDriverData.lastName ? selectedDriverData.lastName?.trim() : ""
      }`;
      setSelectedDriverName(fullName?.trim());
    }
  }, [selectedDriverData]);

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setShuttleAmountForPlantToYard(shuttleAmount));
    dispatch(setShuttleMilesForPlantToYard(miles));
    dispatch(setShuttleDateForPlantToYard(shuttleDate));
    dispatch(setStatusForPlantToYard(statusForPlantToYard));
    dispatch(setIsCityYardCombinationExist(warningMessage));
    dispatch(setRowForPlantToYard(row));
    dispatch(setPositionForPlantToYard(position));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warningMessage, row, shuttleAmount, miles, shuttleDate, statusForPlantToYard, position]);

  //Service for getting selected customer details
  const getCustomerInfo = () => {
    if (customerFK !== "") {
      YardCheckinService.getCustomerById(customerFK, selectedUnitCompanyName)
        .then((response) => {
          const data = response.data;
          setCustomerData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getCustomerInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerFK]);

  // Unit Activation Status
  const checkUnitActivationStatus = () => {
    if (unitNumberFK != null) {
      YardCheckinService.checkUnitActivationStatus(unitNumberFK)
        .then((response) => {
          const data = response.data;
          setUnitActivateStatus(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    checkUnitActivationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [pickupCityIDForPlantToYard]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryYardIDForPlantToYard]);

  useEffect(() => {
    if (unitNumberSelected === "") {
      setShuttleDate("");
      dispatch(setSpecialCodeOfSelectedUnit(""));
      dispatch(setPickupCityNameForPlantToYard(""));
      dispatch(setDeliveryYardNameForPlantToYard(""));
      setWarningMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberSelected]);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriverData === "") {
      navigate("/yard-checkin-driver-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverData]);

  useEffect(() => {
    if (savedSuccessForPlantToYard) {
      navigate("/yard-checkin-unit-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedSuccessForPlantToYard]);

  useEffect(() => {
    if (warningMessage === "" || !deliveryYardIDForPlantToYard || !pickupCityIDForPlantToYard) {
      setModalPopUp(false);
    } else {
      setModalPopUp(true);
    }
  }, [warningMessage, deliveryYardIDForPlantToYard, pickupCityIDForPlantToYard]);

  useEffect(() => {
    if (selectedId) {
      dispatch(setDeliveryYardNameForPlantToYard(selectedObject?.DeliveryLocation));
      dispatch(setDeliveryYardIDForPlantToYard(selectedObject?.DeliveryYardFK));
      dispatch(setPickupCityNameForPlantToYard(selectedObject?.PickupShuttleCityName));
      dispatch(setPickupCityIDForPlantToYard(selectedObject?.PickupShuttleCityFK));
      if (selectedObject?.PickupShuttleCityFK === null) {
        dispatch(setPickupCityNameForPlantToYard(""));
        dispatch(setPickupCityIDForPlantToYard(null));
      }
    }
  }, [selectedId, selectedObject]);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 mt-0 mb-5" xs={9}>
              {/* Driver */}
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
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
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="selectedUnitNumber"
                    value={unitNumberSelected}
                    disabled
                  />
                </Col>
              </Form.Group>

              {/* Special Code */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Special Code
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="selectedUnitSpecialCode"
                    value={specialCodeOfSelectedUnit}
                    disabled
                  />
                </Col>
              </Form.Group>

              {/* Shuttle Amount */}
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

              {/* Shuttle Date */}
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

              {/* Status */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label className={` col-form-label me-4`}>Status</Form.Label>
                </Col>

                <Col xs={9} md={9} sm={9} className={`p-0 d-flex`}>
                  {/* In Yard */}
                  <div className="d-flex align-items-center me-4">
                    <input
                      type="radio"
                      name="status"
                      value="inYard"
                      checked={statusForPlantToYard === "inYard"}
                      onChange={handleOptionChange}
                      disabled={
                        customerData.requirePDIMotorizedOutbound ||
                        customerData.requirePDIMotorizedReload ||
                        customerData.requirePDITowableOutbound ||
                        customerData.requirePDITowableReload
                      }
                    />
                    <label className="ms-2" htmlFor="">
                      In Yard
                    </label>
                  </div>
                  {isEligibleForDelay && (
                    <div className="d-flex align-items-center me-4">
                      <input
                        type="radio"
                        name="status"
                        value="delay"
                        checked={statusForPlantToYard === "delay"}
                        onChange={handleOptionChange}
                        disabled={
                          customerData.requirePDIMotorizedOutbound ||
                          customerData.requirePDIMotorizedReload ||
                          customerData.requirePDITowableOutbound ||
                          customerData.requirePDITowableReload
                        }
                      />
                      <label className="ms-2" htmlFor="">
                        Delay
                      </label>
                    </div>
                  )}
                  {/* Active Dispatch */}
                  {driverDefaultCompanyName === selectedUnitCompanyName && unitActivateStatus && (
                    <div className="d-flex align-items-center me-4">
                      <input
                        type="radio"
                        name="status"
                        value="activeDispatch"
                        checked={statusForPlantToYard === "activeDispatch"}
                        onChange={handleOptionChange}
                        disabled={
                          customerData.requirePDIMotorizedOutbound ||
                          customerData.requirePDIMotorizedReload ||
                          customerData.requirePDITowableOutbound ||
                          customerData.requirePDITowableReload
                        }
                      />
                      <label className="ms-2" htmlFor="">
                        Active Dispatch
                      </label>
                    </div>
                  )}
                  {/* Require Inspection */}
                  {customerData && customerData.requirePDI === true && (
                    <Col className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="status"
                        value="requireInspection"
                        checked={
                          (isSelectedUnitTowable &&
                            (customerData.requirePDITowableOutbound ||
                              customerData.requirePDITowableReload)) ||
                          (isSelectedUnitMotorized &&
                            (customerData.requirePDIMotorizedOutbound ||
                              customerData.requirePDIMotorizedReload)) ||
                          statusForPlantToYard === "requireInspection"
                        }
                        onChange={handleOptionChange}
                      />
                      <label className="ms-2" htmlFor="">
                        Require Inspection
                      </label>
                    </Col>
                  )}
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
                    searchString={pickupCityNameForPlantToYard}
                    renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
                    renderItemField={(shuttleCity) => shuttleCity.city}
                    handleSearchString={(string) => dispatch(setPickupCityNameForPlantToYard(string))}
                    fetchDataBySearchString={fetchPickupCities}
                    onSelect={handleShuttleCitySelectionFromDropdown}
                    selectedId={pickupCityIDForPlantToYard}
                    loading={plantLoading}
                    clearInputCallback={() => {
                      dispatch(setPickupCityIDForPlantToYard(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    className={`${
                      pickupCityIDForPlantToYard === "" ||
                      pickupCityNameForPlantToYard === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                    towardsTop={true}
                    handleInputOnClick={confirmRoute}
                  />
                  <LookupButton onClick={handleShuttleCityLookupModalShow} />
                </Col>

                <Col xs="auto" className="p-0 d-flex align-items-center">
                  <span className="ms-2">
                    <button
                      type="button"
                      className={`btn btn-sm ${isPlantToYardRouteConfirmed ? "btn-success" : "btn-danger"}`}
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

              {/* Delivery Yard */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Delivery Yard</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={deliveryYard}
                    searchString={deliveryYardNameForPlantToYard}
                    renderItemId={(deliveryYard) => deliveryYard.yardPK}
                    renderItemField={(deliveryYard) => deliveryYard.description}
                    handleSearchString={(string) => dispatch(setDeliveryYardNameForPlantToYard(string))}
                    fetchDataBySearchString={fetchDeliveryYard}
                    onSelect={handleDeliveryYardSelectionFromDropdown}
                    selectedId={deliveryYardIDForPlantToYard}
                    loading={yardLoading}
                    clearInputCallback={() => {
                      dispatch(setDeliveryYardIDForPlantToYard(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                      dispatch(setDeliveryYardCodeForPlantToYard(""));
                    }}
                    className={`${
                      deliveryYardIDForPlantToYard === "" ||
                      deliveryYardNameForPlantToYard === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                    towardsTop={true}
                    handleInputOnClick={confirmRoute}
                  />
                  <LookupButton onClick={handleDeliveryYardLookupModalShow} />
                </Col>
              </Form.Group>

              {/* Row/Position */}
              <Form.Group className="mt-9  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Row / Position
                  </Form.Label>
                </Col>
                {/* Row */}
                <Col xs={1} md={1} sm={1} className="p-0 mt-3 w-68px">
                  <input
                    className={`customFormControl ${row === "" ? "borderRed" : "borderGreen"}`}
                    name="row"
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
                <Col xs={4} md={1} sm={1} className=" mt-3 p-0 w-68px ms-3">
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

              {/* GVWR */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    GVWR
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0 w-68px">
                  <input
                    className="customFormControl"
                    name="gvwrForPlantToYard"
                    type="text"
                    maxLength={9}
                    autoComplete="off"
                    aria-autocomplete="list"
                    defaultValue={gvwrForPlantToYard}
                    onInput={(e) => {
                      const value = e.target.value;
                      // Regex pattern for numbers only
                      const regex = /^[0-9]+$/;
                      if (regex.test(value)) {
                        dispatch(setGvwrForPlantToYard(e.target.value));
                      } else {
                        // Remove non-numeric characters from the input value
                        const sanitizedValue = value.replace(/[^0-9]/g, "");
                        e.target.value = sanitizedValue;
                      }
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/* Shuttle city lookup screen */}
            <ShuttleCityLookup
              show={pickupCityLookupShow}
              onHide={handleShuttleCityLookupModalHide}
              renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
              handleLookupSelection={handleShuttleCityLookupSelection}
              shuttle
              selectedCompanyName={selectedUnitCompanyName}
            />
            {/* Delivery yard lookup screen */}
            <YardLookup
              show={deliveryYardLookupShow}
              onHide={handleDeliveryYardLookupModalHide}
              renderItemId={(deliveryYard) => deliveryYard.yardPK}
              handleLookupSelection={handleDeliveryYardLookupSelection}
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

export default PlantToYardContent;
