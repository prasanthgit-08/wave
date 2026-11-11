import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import {
  setPickupPlantIDForPlantToPlant,
  setPickupPlantNameForPlantToPlant,
  setPickupPlantCodeForPlantToPlant,
  setDeliveryPlantIDForPlantToPlant,
  setDeliveryPlantNameForPlantToPlant,
  setDeliveryPlantCodeForPlantToPlant,
  setShuttleDateForPlantToPlant,
  setShuttleAmountForPlantToPlant,
  setShuttleMilesForPlantToPlant,
  setIsPlantToPlantCombinationExist,
  setIsShuttleDateValid,
  setIsPlantToPlantRouteConfirmed,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import DateInputField from "../../../../common/DateInputField";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import LoadingIcon from "../../../../common/LoadingIcon";

function PlantToPlantContent() {
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
  const [pickupPlants, setPickupPlants] = useState([]);
  const [pickupPlantLookupShow, setPickupPlantLookupShow] = useState(false);
  const [deliveryPlants, setDeliveryPlants] = useState([]);
  const [deliveryPlantLookupShow, setDeliveryPlantLookupShow] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [modalPopup, setModalPopUp] = useState(false);
  const [isDPUCustomer, setIsDPUCustomer] = useState("");
  const [plant1Loading, setPlant1Loading] = useState(false);
  const [loading, setLoading] = useState(false);

  //Get Value From Redux
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const specialCodeOfSelectedUnit = useSelector(
    (state) => state.yardCheckinReducer.specialCodeOfSelectedUnit
  );
  const isSelectedUnitTowable = useSelector((state) => state.yardCheckinReducer.isSelectedUnitTowable);
  const isSelectedUnitMotorized = useSelector((state) => state.yardCheckinReducer.isSelectedUnitMotorized);
  const pickupPlantIDForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.pickupPlantIDForPlantToPlant
  );
  const pickupPlantNameForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.pickupPlantNameForPlantToPlant
  );
  const deliveryPlantIDForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryPlantIDForPlantToPlant
  );
  const deliveryPlantNameForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryPlantNameForPlantToPlant
  );
  const savedSuccessForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.savedSuccessForPlantToPlant
  );
  const isPlantToPlantRouteConfirmed = useSelector(
    (state) => state.yardCheckinReducer.isPlantToPlantRouteConfirmed
  );

  useEffect(() => {
    dispatch(setIsPlantToPlantRouteConfirmed(false));
  }, []);

  const confirmRoute = () => dispatch(setIsPlantToPlantRouteConfirmed(true));
  const customerFKForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.customerFKForPlantToPlant
  );
  const selectedId = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedId);
  const selectedObject = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedObject);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);
  const unitData = useSelector((state) => state.yardCheckinReducer.unitData);

  /***** Pickup Plant dropdown and lookup */
  //Service for getting all plants
  const fetchAllPlants = (searchString) => {
    setPlant1Loading(true);
    YardCheckinService.fetchPickupPlantdetailsByName(
      customerFKForPlantToPlant,
      isDPUCustomer,
      searchString,
      selectedUnitCompanyName
    )
      .then((response) => {
        const data = response.data.content;
        const plantList = data?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        setPickupPlants(plantList);
        setDeliveryPlants(plantList);
        setPlant1Loading(false);
      })
      .catch((err) => {
        setPlant1Loading(false);
      });
  };

  //Handle selection from pickup city dropdown
  const handlePickupPlantSelectionFromDropdown = (plant) => {
    if (pickupPlantIDForPlantToPlant !== "" && plant.customerPlantPK !== "") {
      isPlantToPlantCombinationExist(plant.customerPlantPK, deliveryPlantIDForPlantToPlant);
    }
    dispatch(setPickupPlantIDForPlantToPlant(plant.customerPlantPK));
    dispatch(setPickupPlantNameForPlantToPlant(plant.name));
    dispatch(setPickupPlantCodeForPlantToPlant(plant.sisterPlantCode));
    confirmRoute();
  };

  //Enable pickup plant lookup
  const handlePickupPlantLookupModalShow = () => {
    setPickupPlantLookupShow(true);
    confirmRoute();
  };

  //Disable pickup plant lookup
  const handlePickupPlantLookupModalHide = () => {
    setPickupPlantLookupShow(false);
  };

  //Handle selection from pickup plant look up screen
  const handlePickupPlantLookupSelection = (plant) => {
    if (pickupPlantIDForPlantToPlant !== "" && plant.customerPlantPK !== "") {
      isPlantToPlantCombinationExist(plant.customerPlantPK, deliveryPlantIDForPlantToPlant);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setPickupPlantIDForPlantToPlant(plant.customerPlantPK));
    dispatch(setPickupPlantNameForPlantToPlant(plant.name?.trim()));
    dispatch(setPickupPlantCodeForPlantToPlant(plant.sisterPlantCode));
    setPickupPlantLookupShow(false);
  };

  /***** Delivery Plant dropdown and lookup */

  //Handle selection from delivery plant dropdown
  const handleDeliveryPlantSelectionFromDropdown = (plant) => {
    if (pickupPlantIDForPlantToPlant !== "" && plant.customerPlantPK !== "") {
      isPlantToPlantCombinationExist(pickupPlantIDForPlantToPlant, plant.customerPlantPK);
    }
    dispatch(setDeliveryPlantIDForPlantToPlant(plant.customerPlantPK));
    dispatch(setDeliveryPlantNameForPlantToPlant(plant.name));
    dispatch(setDeliveryPlantCodeForPlantToPlant(plant.sisterPlantCode));
    confirmRoute();
  };

  //Enable delivery plant lookup
  const handleDeliveryPlantLookupModalShow = () => {
    setDeliveryPlantLookupShow(true);
    confirmRoute();
  };

  //Disable pickup plant lookup
  const handleDeliveryPlantLookupModalHide = () => {
    setDeliveryPlantLookupShow(false);
  };

  //Handle selection from pickup plant look up screen
  const handleDeliveryPlantLookupSelection = (plant) => {
    if (pickupPlantIDForPlantToPlant !== "" && plant.customerPlantPK !== "") {
      isPlantToPlantCombinationExist(pickupPlantIDForPlantToPlant, plant.customerPlantPK);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setDeliveryPlantIDForPlantToPlant(plant.customerPlantPK));
    dispatch(setDeliveryPlantNameForPlantToPlant(plant.name?.trim()));
    dispatch(setDeliveryPlantCodeForPlantToPlant(plant.sisterPlantCode));
    setDeliveryPlantLookupShow(false);
  };

  /**** Service to check the Plant To Plant combination  ****/
  const isPlantToPlantCombinationExist = (pickupPlant, deliveryPlant) => {
    if (pickupPlant != null && deliveryPlant != null) {
      setLoading(true);
      YardCheckinService.plantToPlantCombinationCheckForShuttle(
        pickupPlant,
        deliveryPlant,
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
          console.log("error in checking isExisting.....");
        })
        .finally(() => setLoading(false));
    }
  };

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

  // UseEffect for setting selected unit's special code and unit number in local state
  useEffect(() => {
    if (unitNumberSelected || specialCodeOfSelectedUnit) {
      setSelectedUnitNumber(unitNumberSelected);
      setSelectedUnitSpecialCode(specialCodeOfSelectedUnit);
    }
  }, [unitNumberSelected, specialCodeOfSelectedUnit]);

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setShuttleDateForPlantToPlant(shuttleDate));
    dispatch(setShuttleAmountForPlantToPlant(shuttleAmount));
    dispatch(setShuttleMilesForPlantToPlant(miles));
    dispatch(setIsPlantToPlantCombinationExist(warningMessage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuttleDate, shuttleAmount, miles, warningMessage]);

  //UseEffect for service call to check City-Yard combination
  useEffect(() => {
    if (pickupPlantIDForPlantToPlant !== "" && deliveryPlantIDForPlantToPlant !== "") {
      isPlantToPlantCombinationExist(pickupPlantIDForPlantToPlant, deliveryPlantIDForPlantToPlant);
    }
  }, []);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [pickupPlantIDForPlantToPlant]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [deliveryPlantIDForPlantToPlant]);

  useEffect(() => {
    if (unitNumberSelected === "") {
      setShuttleDate("");
      setSelectedUnitSpecialCode("");
      dispatch(setPickupPlantNameForPlantToPlant(""));
      dispatch(setDeliveryPlantNameForPlantToPlant(""));
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
    if (savedSuccessForPlantToPlant) {
      navigate("/yard-checkin-unit-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedSuccessForPlantToPlant]);

  useEffect(() => {
    if (warningMessage === "" || !pickupPlantIDForPlantToPlant || !deliveryPlantIDForPlantToPlant) {
      setModalPopUp(false);
    } else {
      setModalPopUp(true);
    }
  }, [warningMessage, deliveryPlantIDForPlantToPlant, pickupPlantIDForPlantToPlant]);

  useEffect(() => {
    if (selectedId) {
      dispatch(setPickupPlantNameForPlantToPlant(selectedObject?.PickupLocation));
      dispatch(setPickupPlantIDForPlantToPlant(selectedObject?.PickupCustomerPlantFK));
      dispatch(setDeliveryPlantNameForPlantToPlant(selectedObject?.DeliveryLocation));
      dispatch(setDeliveryPlantIDForPlantToPlant(selectedObject?.DeliveryCustomerPLantFK));
    }
  }, [selectedId]);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 mt-5 mb-5" xs={7}>
              {/* Driver */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
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

              {/* Unit Number */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col s={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="selectedUnitNumber"
                    value={selectedUnitNumber}
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
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

                <Col s={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="selectedUnitSpecialCode"
                    value={selectedUnitSpecialCode}
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
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

              {/* Pickup Plant */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Pickup Plant</Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={pickupPlants}
                    searchString={pickupPlantNameForPlantToPlant?.trim()}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    handleSearchString={(string) => dispatch(setPickupPlantNameForPlantToPlant(string))}
                    fetchDataBySearchString={fetchAllPlants}
                    onSelect={handlePickupPlantSelectionFromDropdown}
                    selectedId={pickupPlantIDForPlantToPlant}
                    clearInputCallback={() => {
                      dispatch(setPickupPlantIDForPlantToPlant(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    loading={plant1Loading}
                    className={`${
                      pickupPlantIDForPlantToPlant === "" ||
                      pickupPlantNameForPlantToPlant === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                    towardsTop={true}
                    handleInputOnClick={confirmRoute}
                  />
                  <LookupButton onClick={handlePickupPlantLookupModalShow} />
                </Col>

                <Col xs="auto" className="p-0 d-flex align-items-center">
                  <span className="ms-2">
                    <button
                      type="button"
                      className={`btn btn-sm ${isPlantToPlantRouteConfirmed ? "btn-success" : "btn-danger"}`}
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

              {/* Delivery Plant */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Delivery Plant</Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={deliveryPlants}
                    searchString={deliveryPlantNameForPlantToPlant}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    handleSearchString={(string) => dispatch(setDeliveryPlantNameForPlantToPlant(string))}
                    fetchDataBySearchString={fetchAllPlants}
                    onSelect={handleDeliveryPlantSelectionFromDropdown}
                    selectedId={deliveryPlantIDForPlantToPlant}
                    loading={plant1Loading}
                    clearInputCallback={() => {
                      dispatch(setDeliveryPlantIDForPlantToPlant(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    className={`${
                      deliveryPlantIDForPlantToPlant === "" ||
                      deliveryPlantNameForPlantToPlant === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                    towardsTop={true}
                    handleInputOnClick={confirmRoute}
                  />
                  <LookupButton onClick={handleDeliveryPlantLookupModalShow} />
                </Col>
              </Form.Group>
            </Col>
            {/* Pickup Plant Lookup Modal */}
            <CustomerPlantsLookup
              show={pickupPlantLookupShow}
              onHide={handlePickupPlantLookupModalHide}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handlePickupPlantLookupSelection}
              customerId={customerFKForPlantToPlant}
              isDPUCustomer={isDPUCustomer}
              shuttle
              selectedCompanyName={selectedUnitCompanyName}
            />
            {/* Delivery Plant Lookup Modal */}
            <CustomerPlantsLookup
              show={deliveryPlantLookupShow}
              onHide={handleDeliveryPlantLookupModalHide}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handleDeliveryPlantLookupSelection}
              customerId={customerFKForPlantToPlant}
              isDPUCustomer={isDPUCustomer}
              shuttle
              selectedCompanyName={selectedUnitCompanyName}
            />
            <WarningModalPopUp
              show={modalPopup}
              onHide={() => {
                setModalPopUp(false);
                dispatch(
                  setPickupPlantNameForPlantToPlant(
                    unitData?.pickupCustomerPlantName?.trim() || unitData?.customerPlantName?.trim() || ""
                  )
                );
                dispatch(
                  setPickupPlantIDForPlantToPlant(
                    unitData?.pickupCustomerPlantIntFK || unitData?.customerPlantIntFK || ""
                  )
                );
              }}
              title={"Error"}
              body={warningMessage}
              handleOK={() => {
                setModalPopUp(false);
                dispatch(
                  setPickupPlantNameForPlantToPlant(
                    unitData?.pickupCustomerPlantName?.trim() || unitData?.customerPlantName?.trim() || ""
                  )
                );
                dispatch(
                  setPickupPlantIDForPlantToPlant(
                    unitData?.pickupCustomerPlantIntFK || unitData?.customerPlantIntFK || ""
                  )
                );
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

export default PlantToPlantContent;
