/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import EditShuttleService from "../../../../../services/shuttle/process/EditShuttleService";
import {
  setDeliveryCityId,
  setDeliveryCityInput,
  setDeliveryPlantId,
  setDeliveryPlantSelection,
  setDropSisterPlantCode,
  setEditReason,
  setIsMotorizedUnit,
  setIsShuttleDateValid,
  setIsTowableUnit,
  setMiles,
  setPickupSisterYardCode,
  setPickupYardId,
  setShuttleAmount,
  setShuttleCitySelection,
  setShuttleDate,
  setWarningMessage,
  setYardSelection,
} from "../../../../../redux/EditShuttleSlice";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import ShuttleCityLookup from "../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import { useEffect } from "react";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";

function EditShuttleYardToPlantContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [specialCode, setSpecialCode] = useState("");
  const [pickupYardsData, setPickupYardsData] = useState([]);
  const [pickupYardInput, setPickupYardInput] = useState("");
  const [deliveryCityData, setDeliveryCityData] = useState([]);
  const [deliveryPlantData, setDeliveryPlantData] = useState([]);
  const [deliveryPlantInput, setDeliveryPlantInput] = useState("");
  const [customerFK, setCustomerFK] = useState(null);
  const [isDPUCustomer, setIsDPUCustomer] = useState(false);
  const [modalPopup, setModalPopUp] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);

  const driverNameInput = useSelector((state) => state.editShuttleReducer.driverNameInput);
  const unitNumberInput = useSelector((state) => state.editShuttleReducer.unitNumberInput);
  const driverData = useSelector((state) => state.editShuttleReducer.driverData);
  const unitShuttleData = useSelector((state) => state.editShuttleReducer.unitShuttleData);
  const yardSelection = useSelector((state) => state.editShuttleReducer.yardSelection);
  const shuttleCitySelection = useSelector((state) => state.editShuttleReducer.shuttleCitySelection);
  const shuttleDate = useSelector((state) => state.editShuttleReducer.shuttleDate);
  const shuttleAmount = useSelector((state) => state.editShuttleReducer.shuttleAmount);
  const pickupYardId = useSelector((state) => state.editShuttleReducer.pickupYardId);
  const deliveryCityId = useSelector((state) => state.editShuttleReducer.deliveryCityId);
  const isTowableUnit = useSelector((state) => state.editShuttleReducer.isTowableUnit);
  const isMotorizedUnit = useSelector((state) => state.editShuttleReducer.isMotorizedUnit);
  const warningMessage = useSelector((state) => state.editShuttleReducer.warningMessage);
  const companyName = useSelector((state) => state.editShuttleReducer.companyName);
  const editReason = useSelector((state) => state.editShuttleReducer.editReason);
  const deliveryCityInput = useSelector((state) => state.editShuttleReducer.deliveryCityInput);
  const deliveryPlantSelection = useSelector((state) => state.editShuttleReducer.deliveryPlantSelection);
  const deliveryPlantId = useSelector((state) => state.editShuttleReducer.deliveryPlantId);
  const pickupCustomerFK = useSelector((state) => state.editShuttleReducer.pickupCustomerFK);
  const isShuttleDateValid = useSelector((state) => state.editShuttleReducer.isShuttleDateValid);

  /**
   * Fetch all Pickup Yards for Autocomplete
   */
  const fetchPickupYardDetailsByName = (string) => {
    setYardLoading(true);
    EditShuttleService.fetchYardByName(string, companyName)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setPickupYardsData(yardsList);
        setYardLoading(false);
      })
      .catch((err) => {
        setYardLoading(false);
      });
  };

  /**
   * used for Pickup Yard Autocomplete Dropdown
   */
  const handlePickupYardSelection = (yard) => {
    setPickupYardInput(yard.description);
    dispatch(setPickupYardId(yard.yardPK));
    dispatch(setPickupSisterYardCode(yard.sisterYardCode));
  };

  /**
   * used for Pickup Yard selection Lookup - open
   */
  const handlePickupYardLookupModalShow = () => {
    dispatch(setYardSelection(true));
  };
  /**
   * used for Pickup Yard selection Lookup - onSelect
   */
  const handlePickupYardLookupSelection = (yard) => {
    dispatch(setPickupYardId(yard.yardPK));
    setPickupYardInput(yard.description);
    dispatch(setYardSelection(false));
    dispatch(setPickupSisterYardCode(yard.sisterYardCode));
  };

  /**
   * used for Pickup Yard selection Lookup - close
   */
  const hidePickupYardModal = () => {
    dispatch(setYardSelection(false));
  };

  /**
   * Fetch all Delivery Shuttle Citys for Autocomplete
   */
  const fetchDeliveryCityDetailsByName = (string) => {
    setCityLoading(true);
    EditShuttleService.fetchCityDetailsByName(string, companyName)
      .then((response) => {
        const data = response.data.content;
        const cityList = data?.map((city) => ({ ...city, city: city.city?.trim() }));
        setDeliveryCityData(cityList);
        setCityLoading(false);
      })
      .catch((err) => {
        setCityLoading(false);
      });
  };

  /**
   * used for Delivery City Autocomplete Dropdown
   */
  const handleDeliveryCitySelection = (city) => {
    dispatch(setDeliveryCityInput(city.city));
    dispatch(setDeliveryCityId(city.shuttleCityPK));
  };

  /**
   * used for Delivery Shuttle City selection Lookup - open
   */
  const handleDeliveryShuttleCityLookupModalShow = () => {
    dispatch(setShuttleCitySelection(true));
  };
  /**
   * used for Delivery Shuttle City selection Lookup - onSelect
   */
  const handleDeliveryShuttleCityLookupSelection = (city) => {
    dispatch(setDeliveryCityInput(city.city));
    dispatch(setDeliveryCityId(city.shuttleCityPK));
    dispatch(setShuttleCitySelection(false));
  };

  /**
   * used for Delivery Shuttle City selection Lookup - close
   */
  const deliveryShuttleCityModalHide = () => {
    dispatch(setShuttleCitySelection(false));
  };

  /**
   * Check whether City to yard Combination exist or not
   **/
  const cityToYardExistCheckForShuttle = () => {
    EditShuttleService.cityToYardExistCheckForShuttle(
      pickupYardId,
      deliveryCityId,
      isTowableUnit,
      isMotorizedUnit,
      companyName,
      "YardToPlant"
    )
      .then((response) => {
        const data = response.data;
        if (data.combinationExists) {
          dispatch(setWarningMessage(data.combinationExists));
          if (data.combinationExists !== "") {
            dispatch(setShuttleAmount(""));
            dispatch(setMiles(0));
          }
        } else if (data.error) {
          dispatch(setWarningMessage(data.error));
          dispatch(setShuttleAmount(""));
          dispatch(setMiles(0));
        }
        if (data.towableFee) {
          dispatch(setShuttleAmount(data.towableFee));
          dispatch(setMiles(data.miles));
          dispatch(setWarningMessage(""));
        } else if (data.motorizedFee) {
          dispatch(setShuttleAmount(data.motorizedFee));
          dispatch(setMiles(data.miles));
          dispatch(setWarningMessage(""));
        }
      })
      .catch((err) => {});
  };

  /**
   * Fetch all Delivery Plants for Autocomplete
   */
  const fetchDeliveryPlantDetailsByName = (string) => {
    setPlantLoading(true);
    let customerId = customerFK;
    if (isDPUCustomer) {
      customerId = pickupCustomerFK;
    }
    EditShuttleService.fetchPlantDetailsByName(string, customerId, false, companyName)
      .then((response) => {
        const data = response.data.content;
        const plantList = data?.map((plants) => ({ ...plants, description: plants.name?.trim() }));
        setDeliveryPlantData(plantList);
        setPlantLoading(false);
      })
      .catch((err) => {
        setPlantLoading(false);
      });
  };

  /**
   * used for Delivery Plant Autocomplete Dropdown
   */
  const handleDeliveryPlantSelection = (plant) => {
    setDeliveryPlantInput(plant.name);
    dispatch(setDeliveryPlantId(plant.customerPlantPK));
    dispatch(setDropSisterPlantCode(plant.sisterPlantCode));
  };

  /**
   * used for Delivery Plant selection Lookup - open
   */
  const handleDeliveryPlantLookupModalShow = () => {
    dispatch(setDeliveryPlantSelection(true));
  };

  /**
   * used for Delivery Plant selection Lookup - onSelect
   */
  const handleDeliveryPlantLookupSelection = (plant) => {
    dispatch(setDeliveryPlantId(plant.customerPlantPK));
    setDeliveryPlantInput(plant.name);
    dispatch(setDeliveryPlantSelection(false));
    dispatch(setDropSisterPlantCode(plant.sisterPlantCode));
  };

  /**
   * used for Delivery Plant selection Lookup - close
   */
  const hideDeliveryPlantModal = () => {
    dispatch(setDeliveryPlantSelection(false));
  };

  useEffect(() => {
    if (unitShuttleData) {
      setSpecialCode(unitShuttleData?.specialCode);
      dispatch(setShuttleAmount(unitShuttleData.amount));
      dispatch(setShuttleDate(formatDatetimeToDate(unitShuttleData.shuttleDate)));
      dispatch(setPickupYardId(unitShuttleData.pickupYardId));
      setPickupYardInput(unitShuttleData.pickupYardName);
      dispatch(setDeliveryCityId(unitShuttleData.dropShuttleCityId));
      dispatch(setDeliveryCityInput(unitShuttleData.deliveryShuttleCityName));
      dispatch(setDeliveryPlantId(unitShuttleData.dropCustomerPlantId));
      setDeliveryPlantInput(unitShuttleData.deliveryCustomerPlantName?.trim());
      dispatch(setIsMotorizedUnit(unitShuttleData.unitTypeMotorized));
      dispatch(setIsTowableUnit(unitShuttleData.unitTypeTowable));
      dispatch(setEditReason(unitShuttleData.editReason?.trim()));
      dispatch(setMiles(unitShuttleData.miles));
      dispatch(setPickupSisterYardCode(unitShuttleData.pickupYardCode));
      dispatch(setDropSisterPlantCode(unitShuttleData.dropSisterPlantCode));
      setIsDPUCustomer(unitShuttleData.dpucustomer);
      if (!unitShuttleData.dpucustomer) {
        setCustomerFK(unitShuttleData.customerId);
      } else {
        setCustomerFK(pickupCustomerFK);
      }
    }
  }, [unitShuttleData]);

  useEffect(() => {
    if (unitShuttleData) {
      if (!unitShuttleData.dpucustomer) {
        setCustomerFK(unitShuttleData.customerId);
      } else {
        setCustomerFK(pickupCustomerFK);
      }
    }
  }, [unitShuttleData, pickupCustomerFK]);

  useEffect(() => {
    if (driverData === null || driverData === undefined || driverData.length === 0) {
      navigate("/edit-shuttle-driver");
    }
    if (unitShuttleData === null || unitShuttleData === undefined || unitShuttleData.length === 0) {
      navigate("/edit-shuttle-unit");
    }
  }, [unitShuttleData, driverData]);

  useEffect(() => {
    if (pickupYardId && deliveryCityId) {
      cityToYardExistCheckForShuttle();
    }
  }, [pickupYardId, deliveryCityId]);

  useEffect(() => {
    if (warningMessage === "") {
      setModalPopUp(false);
    } else {
      setModalPopUp(true);
    }
  }, [warningMessage]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 " xs={7}>
              <Form.Group className=" align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Driver
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    id="driver"
                    name="driver"
                    type="text"
                    value={driverNameInput}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    id="unit"
                    name="unit"
                    type="text"
                    value={unitNumberInput}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Special Code
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    id="specialCode"
                    name="specialCode"
                    type="text"
                    maxLength={30}
                    value={specialCode}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Shuttle Amount
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    value={shuttleAmount}
                    onChange={(e) => {
                      dispatch(setShuttleAmount(e.target.value));
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                    className={`customFormControl`}
                    disabled
                    readOnly
                    style={{ width: "60px" }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="my-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Shuttle Date
                  </Form.Label>
                </Col>

                <div className="d-flex flex-shrink-0 p-0 w-200px">
                  <DateInputField
                    date={shuttleDate}
                    setIsDateValid={(value) => dispatch(setIsShuttleDateValid(value))}
                    reduxSetDate={(value) => dispatch(setShuttleDate(value))}
                    className={`${shuttleDate === "" || !isShuttleDateValid ? "borderRed" : "borderGreen"}`}
                  />
                </div>
              </Form.Group>

              <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="customColFormLabel me-4">Pick Yard</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  {/* Pickup Yard Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={pickupYardsData}
                    searchString={pickupYardInput}
                    renderItemId={(yard) => yard.yardPK}
                    renderItemField={(yard) => yard.description}
                    selectedId={pickupYardId}
                    loading={yardLoading}
                    handleSearchString={(string) => setPickupYardInput(string)}
                    fetchDataBySearchString={fetchPickupYardDetailsByName}
                    onSelect={handlePickupYardSelection}
                    clearInputCallback={() => {
                      dispatch(setPickupYardId(null));
                      dispatch(setWarningMessage(""));
                      dispatch(setShuttleAmount(""));
                    }}
                    className={`${
                      pickupYardId === "" ||
                      pickupYardId === null ||
                      pickupYardInput === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                  />
                  <LookupButton onClick={handlePickupYardLookupModalShow} />
                </Col>
              </Form.Group>
              <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="customColFormLabel me-4">Delivery City</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  {/* Delivery City Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={deliveryCityData}
                    searchString={deliveryCityInput}
                    renderItemId={(city) => city.shuttleCityPK}
                    renderItemField={(city) => city.city}
                    loading={cityLoading}
                    selectedId={deliveryCityId}
                    handleSearchString={(string) => dispatch(setDeliveryCityInput(string))}
                    fetchDataBySearchString={fetchDeliveryCityDetailsByName}
                    onSelect={handleDeliveryCitySelection}
                    clearInputCallback={() => {
                      dispatch(setDeliveryCityId(null));
                      dispatch(setWarningMessage(""));
                      dispatch(setShuttleAmount(""));
                    }}
                    className={`${
                      deliveryCityId === "" ||
                      deliveryCityId === null ||
                      deliveryCityInput === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                  />
                  <LookupButton onClick={handleDeliveryShuttleCityLookupModalShow} />
                </Col>
              </Form.Group>
              <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="customColFormLabel me-4">Delivery Plant</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  {/* Delivery Plant Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={deliveryPlantData}
                    searchString={deliveryPlantInput}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    selectedId={deliveryPlantId}
                    loading={plantLoading}
                    handleSearchString={(string) => setDeliveryPlantInput(string)}
                    fetchDataBySearchString={fetchDeliveryPlantDetailsByName}
                    onSelect={handleDeliveryPlantSelection}
                    towardsTop
                    clearInputCallback={() => {
                      dispatch(setDeliveryPlantId(null));
                      dispatch(setWarningMessage(""));
                      dispatch(setShuttleAmount(""));
                    }}
                    className={`${
                      deliveryPlantId === "" ||
                      deliveryPlantId === null ||
                      deliveryPlantInput === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                  />
                  <LookupButton onClick={handleDeliveryPlantLookupModalShow} />
                </Col>
              </Form.Group>
              <Form.Group className="my-3  row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Reason
                  </Form.Label>
                </Col>
                <Col xs={9} md={9} sm={9} className="p-0">
                  <textarea
                    name="reason"
                    id="reason"
                    rows="4"
                    cols="120"
                    value={editReason}
                    onChange={(e) => {
                      dispatch(setEditReason(e.target.value));
                    }}
                    className={` customFormControl h-100 customFocusClass ${
                      !editReason ? "borderRed" : "borderGreen"
                    }`}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/* Pickup Yard Lookup Modal */}
            <YardLookup
              show={yardSelection}
              onHide={hidePickupYardModal}
              renderItemId={(yard) => yard.yardPK}
              handleLookupSelection={handlePickupYardLookupSelection}
              EditShuttle
              selectedCompanyName={companyName}
            />

            {/* Delivery Shuttle City Lookup Modal */}
            <ShuttleCityLookup
              show={shuttleCitySelection}
              onHide={deliveryShuttleCityModalHide}
              renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
              handleLookupSelection={handleDeliveryShuttleCityLookupSelection}
              EditShuttle
              selectedCompanyName={companyName}
            />
            {/* Delivery Plant Lookup Modal */}
            <CustomerPlantsLookup
              show={deliveryPlantSelection}
              onHide={hideDeliveryPlantModal}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handleDeliveryPlantLookupSelection}
              customerId={customerFK}
              isDPUCustomer={false}
              EditShuttle
              companyName
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

export default EditShuttleYardToPlantContent;
