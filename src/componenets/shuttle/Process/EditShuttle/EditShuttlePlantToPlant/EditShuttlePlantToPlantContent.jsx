/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditShuttleService from "../../../../../services/shuttle/process/EditShuttleService";
import {
  setDeliveryPlantId,
  setDeliveryPlantSelection,
  setDropSisterPlantCode,
  setEditReason,
  setIsMotorizedUnit,
  setIsShuttleDateValid,
  setIsTowableUnit,
  setMiles,
  setPickupPlantId,
  setPickupPlantSelection,
  setPickupSisterPlantCode,
  setShuttleAmount,
  setShuttleDate,
  setWarningMessage,
} from "../../../../../redux/EditShuttleSlice";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";

function EditShuttlePlantToPlantContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [specialCode, setSpecialCode] = useState("");
  const [pickupPlantData, setPickupPlantData] = useState([]);
  const [pickupPlantInput, setPickupPlantInput] = useState("");
  const [deliveryPlantData, setDeliveryPlantData] = useState([]);
  const [deliveryPlantInput, setDeliveryPlantInput] = useState("");
  const [customerFK, setCutomerFK] = useState(null);
  const [isDPUCustomer, setIsDPUCustomer] = useState(false);
  const [modalPopup, setModalPopUp] = useState(false);
  const [plant1Loading, setPlant1Loading] = useState(false);
  const [plant2Loading, setPlant2Loading] = useState(false);

  const driverNameInput = useSelector((state) => state.editShuttleReducer.driverNameInput);
  const unitNumberInput = useSelector((state) => state.editShuttleReducer.unitNumberInput);
  const driverData = useSelector((state) => state.editShuttleReducer.driverData);
  const unitShuttleData = useSelector((state) => state.editShuttleReducer.unitShuttleData);
  const pickupPlantSelection = useSelector((state) => state.editShuttleReducer.pickupPlantSelection);
  const deliveryPlantSelection = useSelector((state) => state.editShuttleReducer.deliveryPlantSelection);
  const shuttleDate = useSelector((state) => state.editShuttleReducer.shuttleDate);
  const shuttleAmount = useSelector((state) => state.editShuttleReducer.shuttleAmount);
  const pickupPlantId = useSelector((state) => state.editShuttleReducer.pickupPlantId);
  const deliveryPlantId = useSelector((state) => state.editShuttleReducer.deliveryPlantId);
  const isTowableUnit = useSelector((state) => state.editShuttleReducer.isTowableUnit);
  const isMotorizedUnit = useSelector((state) => state.editShuttleReducer.isMotorizedUnit);
  const warningMessage = useSelector((state) => state.editShuttleReducer.warningMessage);
  const companyName = useSelector((state) => state.editShuttleReducer.companyName);
  const editReason = useSelector((state) => state.editShuttleReducer.editReason);
  const isShuttleDateValid = useSelector((state) => state.editShuttleReducer.isShuttleDateValid);
  /**
   * Fetch all Pickup Plants for Autocomplete
   */
  const fetchPickupPlantDetailsByName = (string) => {
    setPlant1Loading(true);
    EditShuttleService.fetchPlantDetailsByName(string, customerFK, isDPUCustomer, companyName)
      .then((response) => {
        const data = response.data.content;
        const plantList = data?.map((plants) => ({ ...plants, description: plants.name?.trim() }));
        setPickupPlantData(plantList);
        setPlant1Loading(false);
      })
      .catch((err) => {
        setPlant1Loading(false);
      });
  };

  /**
   * used for Pickup Plant Autocomplete Dropdown
   */
  const handlePickupPlantSelection = (plant) => {
    setPickupPlantInput(plant.name);
    dispatch(setPickupPlantId(plant.customerPlantPK));
    dispatch(setPickupSisterPlantCode(plant.sisterPlantCode));
  };

  /**
   * used for Pickup Plant selection Lookup - open
   */
  const handlePickupPlantLookupModalShow = () => {
    dispatch(setPickupPlantSelection(true));
  };
  /**
   * used for Pickup Plant selection Lookup - onSelect
   */
  const handlePickupPlantLookupSelection = (plant) => {
    dispatch(setPickupPlantId(plant.customerPlantPK));
    setPickupPlantInput(plant.name);
    dispatch(setPickupPlantSelection(false));
    dispatch(setPickupSisterPlantCode(plant.sisterPlantCode));
  };

  /**
   * used for Pickup Plant selection Lookup - close
   */
  const hidePickupPlantModal = () => {
    dispatch(setPickupPlantSelection(false));
  };

  /**
   * Fetch all Delivery Plants for Autocomplete
   */
  const fetchDeliveryPlantDetailsByName = (string) => {
    setPlant2Loading(true);
    EditShuttleService.fetchPlantDetailsByName(string, customerFK, isDPUCustomer, companyName)
      .then((response) => {
        const data = response.data.content;
        const plantList = data?.map((plants) => ({ ...plants, description: plants.name?.trim() }));
        setDeliveryPlantData(plantList);
        setPlant2Loading(false);
      })
      .catch((err) => {
        setPlant2Loading(false);
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
  const plantToPlantExistCheckForShuttle = () => {
    EditShuttleService.plantToPlantExistCheckForShuttle(
      pickupPlantId,
      deliveryPlantId,
      isTowableUnit,
      isMotorizedUnit,
      companyName
    )
      .then((res) => {
        const data = res.data;
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
          dispatch(setWarningMessage(""));
          dispatch(setMiles(data.miles));
        } else if (data.motorizedFee) {
          dispatch(setShuttleAmount(data.motorizedFee));
          dispatch(setWarningMessage(""));
          dispatch(setMiles(data.miles));
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (unitShuttleData) {
      setSpecialCode(unitShuttleData?.specialCode);
      dispatch(setShuttleAmount(unitShuttleData.amount));
      dispatch(setShuttleDate(formatDatetimeToDate(unitShuttleData.shuttleDate)));
      dispatch(setPickupPlantId(unitShuttleData.pickupCustomerPlantId));
      setPickupPlantInput(unitShuttleData.pickupCustomerPlantName?.trim());
      dispatch(setDeliveryPlantId(unitShuttleData.dropCustomerPlantId));
      setDeliveryPlantInput(unitShuttleData.deliveryCustomerPlantName?.trim());
      dispatch(setIsMotorizedUnit(unitShuttleData.unitTypeMotorized));
      dispatch(setIsTowableUnit(unitShuttleData.unitTypeTowable));
      setCutomerFK(unitShuttleData.customerId);
      setIsDPUCustomer(unitShuttleData.dpucustomer);
      dispatch(setEditReason(unitShuttleData.editReason?.trim()));
      dispatch(setMiles(unitShuttleData.miles));
      dispatch(setPickupSisterPlantCode(unitShuttleData.pickupSisterPlantCode));
      dispatch(setDropSisterPlantCode(unitShuttleData.dropSisterPlantCode));
    }
  }, [unitShuttleData]);

  useEffect(() => {
    if (pickupPlantId && deliveryPlantId) {
      plantToPlantExistCheckForShuttle();
    }
  }, [pickupPlantId, deliveryPlantId]);

  useEffect(() => {
    if (driverData === null || driverData === undefined || driverData.length === 0) {
      navigate("/edit-shuttle-driver");
    }
    if (unitShuttleData === null || unitShuttleData === undefined || unitShuttleData.length === 0) {
      navigate("/edit-shuttle-unit");
    }
  }, [unitShuttleData, driverData]);

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
            <Col className="p-15  mb-3" xs={7}>
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
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
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
              <Form.Group className="my-3  align-items-center row  m-l-0 m-r-0">
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
                    setDate={(value) => dispatch(setShuttleDate(value))}
                    className={`${shuttleDate === "" || !isShuttleDateValid ? "borderRed" : "borderGreen"}`}
                  />
                </div>
              </Form.Group>

              <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="customColFormLabel me-4">Pick Plant</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  {/* Pickup Plant Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={pickupPlantData}
                    searchString={pickupPlantInput}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    selectedId={pickupPlantId}
                    handleSearchString={(string) => setPickupPlantInput(string)}
                    fetchDataBySearchString={fetchPickupPlantDetailsByName}
                    onSelect={handlePickupPlantSelection}
                    loading={plant1Loading}
                    clearInputCallback={() => {
                      dispatch(setPickupPlantId(null));
                      dispatch(setWarningMessage(""));
                      dispatch(setShuttleAmount(""));
                    }}
                    className={`${
                      pickupPlantId === "" ||
                      pickupPlantId === null ||
                      pickupPlantInput === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                  />
                  <LookupButton onClick={handlePickupPlantLookupModalShow} />
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
                    handleSearchString={(string) => setDeliveryPlantInput(string)}
                    fetchDataBySearchString={fetchDeliveryPlantDetailsByName}
                    onSelect={handleDeliveryPlantSelection}
                    clearInputCallback={() => {
                      dispatch(setDeliveryPlantId(null));
                      dispatch(setWarningMessage(""));
                      dispatch(setShuttleAmount(""));
                    }}
                    loading={plant2Loading}
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
            {/* Pickup Plant Lookup Modal */}
            <CustomerPlantsLookup
              show={pickupPlantSelection}
              onHide={hidePickupPlantModal}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handlePickupPlantLookupSelection}
              customerId={customerFK}
              isDPUCustomer={isDPUCustomer}
              EditShuttle
              companyName
            />

            {/* Delivery Plant Lookup Modal */}
            <CustomerPlantsLookup
              show={deliveryPlantSelection}
              onHide={hideDeliveryPlantModal}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handleDeliveryPlantLookupSelection}
              customerId={customerFK}
              isDPUCustomer={isDPUCustomer}
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

export default EditShuttlePlantToPlantContent;
