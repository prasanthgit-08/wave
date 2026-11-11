import React, { useRef } from "react";
import { Radio, RadioGroup } from "react-radio-group";
import { Col, Form, Row } from "react-bootstrap";
import DispatchFooter from "./DriverDispatchFooter";
import DispatchHeader from "./DriverDispatchHeader";
import styles from "../../../../../../../styles/ThreeQuarterScreen.module.css";
import AutoCompleteDropdown from "../../../../../../../componenets/common/AutoCompleteDropdown";
import LookupButton from "../../../../../../../componenets/common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DispatchesService from "../../../../../../../services/DispatchesService";
import { useEffect } from "react";
import { useState } from "react";
import YardLookup from "../../../../../../../componenets/LookupScreens/Yard/YardLookup";
import YardService from "../../../../../../../services/YardService";
import CustomerLookup from "../../../../../../../componenets/LookupScreens/Customer/CustomerLookup";
import CustomerService from "../../../../../../../services/CustomerService";
import CustomerPlantsLookup from "../../../../../../../componenets/LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantMaintenanceService from "../../../../../../../services/CustomerPlantMaintenanceService";
import {
  setCustomerNameInput,
  setDeliveryYardsInput,
  setDispatchPKS,
  setDivisionStatus,
  setDriverData,
  setDriverFK,
  setDriverTrailerData,
  setDriverTruckData,
  setEnteredUnitNumber,
  setIsValidationSuccess,
  setPickupPlantInput,
  setPickupStateCodes,
  setRigionStatus,
  setSelectedCustomerPK,
  setSelectedPlantPK,
  setSelectedYardPK,
  setRequiredFlatBed,
} from "../../../../../../../redux/DispatchesSlice";
import { setCustomerPlantFKList } from "../../../../../../../redux/LookupScreens/CustomerPlantsLookupSlice";
import LoadingIcon from "../../../../../../common/LoadingIcon";
import { PROGRAMS } from "../../../../../../../constants/permissionConstants";
import { usePermission } from "../../../../../../../hooks/usePermission";
import toast from "react-hot-toast";

function DriverDispatchReload() {
  const params = useParams();
  const dispatch = useDispatch();

  const driverId = params.driverId;

  const [isDriveAwayVisible, setIsDriveAwayVisible] = useState(false);
  const [isTowAwayVisible, setIsTowAwayVisible] = useState(false);

  const [isFlatbedVisible, setIsFlatbedVisible] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [isTruckCamperVisible, setIsTruckCamperVisible] = useState(false);
  const pickupStateCodes = useSelector((state) => state.dispatchesReducer.pickupStateCodes);
  const [yardPKList, setYardPKList] = useState();
  const [customerPKList, setCustomerPKList] = useState();
  const [yardLookUp, setYardLookUp] = useState(false);
  const [customerLookup, setCustomerLookup] = useState(false);
  const [PlantLookUp, setPlantLookUp] = useState(false);
  const [deliveryYardsData, setDeliveryYardsData] = useState();
  const [customerData, setCustomerData] = useState();
  const [customerPlantData, setCustomerPlantData] = useState();
  const deliveryYardsId = useSelector((state) => state.dispatchesReducer.selectedYardPK);
  const selectedCustomerId = useSelector((state) => state.dispatchesReducer.selectedCustomerPK);
  const pickupCustomerPlantId = useSelector((state) => state.dispatchesReducer.selectedPlantPK);
  const deliveryYardsInput = useSelector((state) => state.dispatchesReducer.deliveryYardsInput);
  const customerNameInput = useSelector((state) => state.dispatchesReducer.customerNameInput);
  const pickupPlantInput = useSelector((state) => state.dispatchesReducer.pickupPlantInput);
  const [customerPlantFKS, setCustomerPlantFKS] = useState();
  const unitNumber = useSelector((state) => state.dispatchesReducer.enteredUnitNumber);
  const driverFK = useSelector((state) => state.dispatchesReducer.driverFK);

  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const driverTrailerData = useSelector((state) => state.dispatchesReducer.driverTrailerData);

  const driverTruckData = useSelector((state) => state.dispatchesReducer.driverTruckData);

  const hasValidFlatbedTruck = useSelector((state) => state.dispatchesReducer.validFlatbedTruck);
  const hasValidFlatbedTrailer = useSelector((state) => state.dispatchesReducer.validFlatbedTrailer);
  const hasHaulAndTow = useSelector((state) => state.dispatchesReducer.validHaulAndTowTruck);

  const [isPalntAvailableForCustomer, setIsPalntAvailableForCustomer] = useState();

  const [regionStatus, setRegionStatus] = useState("reload");
  const divisionStatus = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const [isDispatcherStatesChecked, setIsDispatcherStatesChecked] = useState(false);
  const [isValidDeliveryStates, setIsValidDeliveryStates] = useState(true);
  const [yardAutocompleteLoading, setYardAutocompleteLoading] = useState(true);
  const [customerAutocompleteLoading, setCustomerAutocompleteLoading] = useState(true);
  const [customerPlantAutocompleteLoading, setCustomerPlantAutocompleteLoading] = useState(true);
  const [allowedStates, setAllowedStates] = useState([]);
  const [checkboxPosition, setCheckboxPosition] = useState(-110);
  const [hasCustomerThePlants, setHasCustomerThePlants] = useState();
  const [warningMessageForPlant, setWarningMessageForPlant] = useState();
  const [loader, setLoader] = useState(true);
  const [enableDispathersStatesButton, setEnableDispatchersStatesButton] = useState(false);
  const requireFlatbedFromRedux = useSelector((state) => state.dispatchesReducer.isFlatBedRequired); // Added for single towable required flat bed scenario

  const { checkPermission } = usePermission();

  const stringAndNumber = (value) => {
    if (!value) return value;

    // Remove all characters except numbers and letters
    const filteredValue = value.replace(/[^0-9a-zA-Z]/g, "");

    return filteredValue;
  };

  const handleDeliveryYardLookupSelection = (yard) => {
    dispatch(setSelectedYardPK(yard.yardPK));
    dispatch(setDeliveryYardsInput(yard.description?.trim()));
    setYardLookUp(false);
  };

  const handleDeliveryYardSelection = (yard) => {
    dispatch(setDeliveryYardsInput(yard.description?.trim()));
    dispatch(setSelectedYardPK(yard.yardPK));
  };

  const handleCustomerLookupSelection = (customer) => {
    dispatch(setCustomerNameInput(customer.name?.trim()));
    dispatch(setSelectedCustomerPK(customer.customerPK));
    setCustomerLookup(false);
  };
  const handleCustomerAutoSelection = (customer) => {
    dispatch(setCustomerNameInput(customer.name?.trim()));
    dispatch(setSelectedCustomerPK(customer.customerPK));
  };

  const handlePlantAutoSelection = (plant) => {
    dispatch(setPickupPlantInput(plant.name?.trim()));
    dispatch(setSelectedPlantPK(plant.customerPlantPK));
  };

  const handlePickupPlantLookupSelection = (plant) => {
    dispatch(setPickupPlantInput(plant.name?.trim()));
    dispatch(setSelectedPlantPK(plant.customerPlantPK));
    setPlantLookUp(false);
  };

  const driverDataList = () => {
    DispatchesService.getAllDrivers(driverId)
      .then((response) => {
        const { data } = response;
        if (data !== null) {
          dispatch(setDriverData(data));
        }
      })
      .catch((err) => console.log(err));
  };
  //this function is for fetching Driver FK data in Driver Truck Table
  const DriverTruckDataList = () => {
    DispatchesService.getAllDriverTruckData(driverId)
      .then((response) => {
        const { data } = response;
        if (data !== null) {
          dispatch(setDriverTruckData(data.content));
        }
      })
      .catch((err) => console.log(err));
  };
  //this function is for fetching Driver FK data in Driver Trailer Table

  const DriverTrailerDataList = () => {
    DispatchesService.getAllDriverTrailer(driverId)
      .then((response) => {
        const { data } = response;
        if (data !== null) {
          dispatch(setDriverTrailerData(data.content));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isPalntAvailableForCustomer === false && hasCustomerThePlants === true) {
      setWarningMessageForPlant("Invalid Plant!");
    } else if (hasCustomerThePlants === false) {
      setWarningMessageForPlant("Selected Customer has no plants");
    }
  }, [isPalntAvailableForCustomer, hasCustomerThePlants]);

  const fetchDispatchOutboundData = () => {
    var driverflatbed = driverData?.flatbed ? driverData.flatbed : false;
    var isrequireFlatbedVisible =
      driverflatbed && ((hasValidFlatbedTruck && hasValidFlatbedTrailer) || hasHaulAndTow);

    DispatchesService.getDispatchSearchFilterData(
      isDispatcherStatesChecked,
      params.driverId,
      selectedCustomerId,
      pickupCustomerPlantId,
      regionStatus,
      divisionStatus,
      null,
      null,
      requireFlatbedFromRedux,
      isrequireFlatbedVisible
    )
      .then((res) => {
        let data = res.data;
        if (
          data.stateCodeList != null &&
          (data.stateCodeList?.length !== 0 ||
            data.stateCodeList?.length === 0 ||
            pickupStateCodes?.length === 0)
        ) {
          setIsValidDeliveryStates(true);
        }
        if (data.stateCodeList != null && data.stateCodeList?.length !== 0) {
          dispatch(setPickupStateCodes(data.stateCodeList));
        } else if (isDispatcherStatesChecked) {
          toast.error("No states available.");
        }
        setYardPKList(data.pickupYardPKS);
        setCustomerPKList(data.customerPKS);
        setIsPalntAvailableForCustomer(data.isPlantAvailableForCustomer);
        setCustomerPlantFKS(data.customerPlantPKS);
        setAllowedStates(data.allowedstateCodeList);
        setHasCustomerThePlants(data.hasCustomerThePlants);
        dispatch(setCustomerPlantFKList(data.customerPlantPKS));
        dispatch(setDispatchPKS(data.dispatchPKS));
        setEnableDispatchersStatesButton(checkPermission(PROGRAMS.DISPATCH, "DSPCHR"));
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const fetchDeliveryYardDetailsByName = (string) => {
    if (yardPKList?.length > 0) {
      setYardAutocompleteLoading(true);
      YardService.getAllYards("Beginning", string, 0, "Active", null, false, yardPKList)
        .then((response) => {
          const data = response.data.content;
          setDeliveryYardsData(data);
          setYardAutocompleteLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setYardAutocompleteLoading(false);
        });
    } else {
      setYardAutocompleteLoading(false);
    }
  };

  const fetchCustomerDetailsByName = (string) => {
    setCustomerAutocompleteLoading(true);
    if (customerPKList?.length > 0) {
      CustomerService.getAllCustomers(
        "Active",
        0,
        null,
        "Beginning",
        null,
        string,
        null,
        false,
        "Complete",
        customerPKList,
        "Autocomplete"
      )
        .then((response) => {
          const data = response.data.content;
          setCustomerData(data);
          setCustomerAutocompleteLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCustomerAutocompleteLoading(false);
        });
    } else {
      setCustomerAutocompleteLoading(false);
    }
  };
  const fetchPlantdetailsByName = (string) => {
    if (customerPlantFKS?.length > 0) {
      setCustomerPlantAutocompleteLoading(true);
      CustomerPlantMaintenanceService.getAllPlantsByCustomer(
        "Complete",
        "Active",
        "Beginning",
        null,
        0,
        string,
        selectedCustomerId,
        customerPlantFKS,
        null,
        false
      )
        .then((response) => {
          const data = response.data.content;
          setCustomerPlantData(data);
          setCustomerPlantAutocompleteLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCustomerPlantAutocompleteLoading(false);
        });
    } else {
      setCustomerPlantAutocompleteLoading(false);
    }
  };

  const handleDeliveryStates = (e) => {
    const alphabeticRegex = /^[a-zA-Z,]+$/;
    const array = e.target.value.toUpperCase().split(",");
    setIsValidDeliveryStates(
      !e.target.value ||
        (alphabeticRegex.test(e.target.value.toUpperCase()) &&
          array?.every((element) => allowedStates.includes(element)))
    );
    if (e.target.value.length === 0) {
      dispatch(setPickupStateCodes([]));
      setIsDispatcherStatesChecked(false);
    } else {
      dispatch(setPickupStateCodes(array));
    }
  };

  const textareaRef = useRef(null);
  const adjustTextareaWidth = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.width = `200px`; // Reset width
      textarea.style.width = `${textarea.scrollWidth}px`; // Set width based on content
      // Calculate the new checkbox position based on the length of the text
      setCheckboxPosition(textarea.scrollWidth - 310);
    }
  };

  useEffect(() => {
    if (
      !isValidDeliveryStates ||
      (deliveryYardsInput && !deliveryYardsId) ||
      (customerNameInput && !selectedCustomerId) ||
      (pickupPlantInput && !pickupCustomerPlantId) ||
      isPalntAvailableForCustomer == false ||
      hasCustomerThePlants == false
    ) {
      dispatch(setIsValidationSuccess(false));
    } else {
      // All invalid cases are handled above; stale empty autocomplete results must not keep Continue disabled
      dispatch(setIsValidationSuccess(true));
    }
  }, [
    isValidDeliveryStates,
    deliveryYardsInput,
    deliveryYardsId,
    deliveryYardsData,
    selectedCustomerId,
    customerNameInput,
    customerData,
    pickupCustomerPlantId,
    pickupPlantInput,
    customerPlantData,
    hasCustomerThePlants,
    isPalntAvailableForCustomer,
  ]);

  useEffect(() => {
    driverDataList();
  }, [driverId, driverFK]);

  useEffect(() => {
    fetchDispatchOutboundData();
  }, [pickupCustomerPlantId, selectedCustomerId, isDispatcherStatesChecked]);

  useEffect(() => {
    if (driverData) {
      if (driverData.motorized && driverData.towable === false) {
        setIsDriveAwayVisible(true);
        setIsFlatbedVisible(false);
        setIsPopupVisible(false);
        setIsTowAwayVisible(false);
        setIsTruckCamperVisible(false);
      } else {
        if (driverData.towable) {
          setIsTowAwayVisible(true);
          setIsDriveAwayVisible(driverData.motorized);

          if (driverTruckData !== "") {
            if (
              driverTruckData.some((data) => data.active) &&
              driverTruckData.some((data) => data.haulAndTow)
            ) {
              setIsFlatbedVisible(true);
            } else {
              setIsFlatbedVisible(false);
            }

            if (driverTrailerData !== "") {
              if (
                driverTruckData.every((data) => data.active) &&
                !driverTruckData.some((data) => data.haulAndTow)
              ) {
                if (
                  driverTruckData.some(
                    (data) =>
                      data.active &&
                      (data.semiTractor || (!data.semiTractor && !data.halfTon && !data.haulAndTow))
                  ) &&
                  driverTrailerData.some((data) => !data.popupTrailer && !data.truckCamperTrailer)
                ) {
                  setIsFlatbedVisible(true);
                } else {
                  setIsFlatbedVisible(false);
                }
              }
              if (
                driverTruckData.some(
                  (data) =>
                    data.active &&
                    (data.semiTractor || (!data.semiTractor && !data.halfTon && !data.haulAndTow))
                ) &&
                driverTrailerData.some((data) => data.active && data.popupTrailer)
              ) {
                setIsPopupVisible(true);
              } else {
                setIsPopupVisible(false);
              }

              if (
                driverTruckData.some(
                  (data) =>
                    data.active &&
                    (data.semiTractor || (!data.semiTractor && !data.halfTon && !data.haulAndTow))
                ) &&
                driverTrailerData.some((data) => data.active && data.truckCamperTrailer)
              ) {
                setIsTruckCamperVisible(true);
              } else {
                setIsTruckCamperVisible(false);
              }
            }
          }
        }
      }
    }
  }, [driverData, driverFK, driverTruckData, driverTrailerData, driverId]);

  return (
    <div className="customMaintenanceFormWidthContainer threeFourthScreenWidth" style={{ margin: "1px" }}>
      <div className="add-form-component customMaintenanceFormWidth border border-dark border-2">
        <DispatchHeader />
        <div className="p-1">
          <div className="shadow-sm rounded border threeFourthScreenFormContentHeight  p-2">
            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
              <Col sm={1} md={1} xs={1} className="p-0 w-138px">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Division
                </Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} style={{ right: "300 px" }}>
                <Row>
                  <Col>
                    <RadioGroup name="" className="d-flex " disabled>
                      <div className={`d-flex align-items-center me-4 m-b-5 `}>
                        <Radio value="driveaway" checked={divisionStatus == "driveaway"} />
                        <label className="fw-600 m-l-5">Driveaway</label>
                      </div>
                      <div className={`d-flex align-items-center me-4 m-b-5  style={{ marginRight: "5px" }}`}>
                        <Radio
                          value="towaway"
                          checked={divisionStatus == "towaway"}
                          style={{ marginLeft: "2px" }}
                        />
                        <label className="fw-600 m-l-5">Towaway</label>
                      </div>
                      <div className={`d-flex align-items-center me-4 m-b-5  `}>
                        <Radio value="flatbed" checked={divisionStatus == "flatbed"} />
                        <label className="f-w-600 m-l-5">Flatbed</label>
                      </div>
                      <div className={`d-flex align-items-center me-4 m-b-5 `}>
                        <Radio value="popup" checked={divisionStatus == "popup"} />
                        <label className="fw-600 m-l-5" style={{ width: "40px" }}>
                          Pop Up
                        </label>
                      </div>

                      <div className={`d-flex align-items-center me-4 m-b-5 `}>
                        <Radio value="truckCamper" checked={divisionStatus == "truckCamper"} />
                        <label className="fw-600 m-l-5" style={{ width: "80px" }}>
                          Truck Camper
                        </label>
                      </div>
                    </RadioGroup>
                  </Col>
                  <Col className="d-flex align-items-center p-0">
                    {((hasValidFlatbedTruck && hasValidFlatbedTrailer) || hasHaulAndTow) &&
                      driverData?.flatbed &&
                      divisionStatus === "towaway" && (
                        <div className="d-flex align-items-center ml-4" style={{ width: "170px" }}>
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            checked={requireFlatbedFromRedux}
                            disabled={!(divisionStatus === "towaway")}
                            value={requireFlatbedFromRedux}
                            onChange={(e) => {
                              dispatch(setRequiredFlatBed(e.target.checked));
                            }}
                          />
                          <label className="f-w-600 ms-2">Flatbed Required Only</label>
                        </div>
                      )}
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "150px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Region
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <RadioGroup name="regionStatus" className="d-flex" disabled>
                  <div className="d-flex align-items-center me-4 m-b-5">
                    <Radio value="outbound" checked={regionStatus === "outbound"} />
                    <label className="f-w-600 m-l-5">Outbound</label>
                  </div>
                  <div className="d-flex align-items-center me-4 m-b-5" style={{ marginRight: "5px" }}>
                    <Radio value="reload" checked={regionStatus === "reload"} style={{ marginLeft: "3px" }} />
                    <label className="f-w-600 m-l-5">Reload</label>
                  </div>
                </RadioGroup>
              </Col>
            </Form.Group>
            {/* <Row> */}
            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "138px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Pickup States
                </Form.Label>
              </Col>

              <Col xs={3} md={3}>
                <input
                  className={isValidDeliveryStates ? "customFormControl" : "customFormControl borderRed"}
                  id=""
                  name=""
                  type="search"
                  value={pickupStateCodes}
                  maxLength={78}
                  style={{ minWidth: "207px", right: "100px", width: "207px" }}
                  disabled={""}
                  autoComplete="off"
                  aria-autocomplete="list"
                  ref={textareaRef}
                  onChange={(e) => {
                    handleDeliveryStates(e);
                    adjustTextareaWidth();
                  }}
                />
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0" style={{ marginLeft: `${checkboxPosition}px` }}>
                <button
                  className="btn btn-secondary"
                  onClick={(e) => {
                    if (isDispatcherStatesChecked) {
                      fetchDispatchOutboundData();
                    } else {
                      setIsDispatcherStatesChecked(true);
                    }
                  }}
                  disabled={!enableDispathersStatesButton}
                >
                  Dispatchers States
                </button>
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "138px" }}>
                <Form.Label
                  htmlFor="name"
                  className="col-form-label dealer-label"
                  style={{ minWidth: "200px" }}
                >
                  Unit Number or Partial
                </Form.Label>
              </Col>

              <Col xs={2} md={2} style={{ right: "100px" }}>
                <input
                  className={"customFormControl"}
                  id=""
                  name=""
                  type="search"
                  value={unitNumber}
                  maxLength={21}
                  disabled={""}
                  style={{ minWidth: "207px", right: "100px", width: "207px" }}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    dispatch(setEnteredUnitNumber(e.target.value));
                  }}
                  clearInputCallback={() => {
                    dispatch(setEnteredUnitNumber(null));
                  }}
                />
              </Col>
            </Form.Group>

            <Col md={6} xs={6}>
              <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "138px" }}>
                  <div className="p-0">
                    <Form.Label className=" dealer-label m-l-0">Pickup Yard</Form.Label>
                  </div>
                </Col>

                <Col xs={6} md={6} sm={6} className="d-flex">
                  {/*  Autocomplete */}

                  <AutoCompleteDropdown
                    arrayList={deliveryYardsData}
                    searchString={deliveryYardsInput}
                    renderItemId={(yard) => yard.yardPK}
                    renderItemField={(yard) => yard.description}
                    handleSearchString={(string) => dispatch(setDeliveryYardsInput(string))}
                    fetchDataBySearchString={fetchDeliveryYardDetailsByName}
                    onSelect={handleDeliveryYardSelection}
                    selectedId={deliveryYardsId}
                    clearInputCallback={() => {
                      dispatch(setSelectedYardPK(null));
                    }}
                    className={`customFormControl ${deliveryYardsInput && !deliveryYardsId ? "borderRed" : ""}`}
                    loading={yardAutocompleteLoading}
                  />
                  <LookupButton
                    onClick={() => {
                      setYardLookUp(true);
                    }}
                    disabled={""}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md={6} xs={6}>
              <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0 " style={{ width: "138px" }}>
                  <div className="p-0 ">
                    <Form.Label className="col-form-label dealer-label m-l-0">Customer</Form.Label>
                  </div>
                </Col>

                <Col xs={6} md={6} sm={6} className="d-flex">
                  {/*  Autocomplete */}
                  <AutoCompleteDropdown
                    className={`customFormControl    ${customerNameInput && !selectedCustomerId ? "borderRed" : ""}`}
                    arrayList={customerData}
                    searchString={customerNameInput}
                    renderItemId={(customer) => customer.customerPK}
                    renderItemField={(customer) => customer.name}
                    handleSearchString={(string) => dispatch(setCustomerNameInput(string))}
                    fetchDataBySearchString={fetchCustomerDetailsByName}
                    onSelect={handleCustomerAutoSelection}
                    clearInputCallback={() => {
                      dispatch(setSelectedCustomerPK(null));
                    }}
                    loading={customerAutocompleteLoading}
                    selectedId={selectedCustomerId}
                  />
                  <LookupButton onClick={() => setCustomerLookup(true)} disabled={""} />
                </Col>
              </Form.Group>
            </Col>
            <Col md={6} xs={6}>
              <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0 " style={{ width: "138px" }}>
                  <div className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0">Plant</Form.Label>
                  </div>
                </Col>

                <Col xs={6} md={6} sm={6} className="d-flex">
                  {/*  Autocomplete */}
                  <AutoCompleteDropdown
                    className={`customFormControl ${pickupPlantInput && !pickupCustomerPlantId ? "borderRed" : ""} ${(isPalntAvailableForCustomer == false || hasCustomerThePlants == false) && "borderRed"}`}
                    arrayList={customerPlantData}
                    searchString={pickupPlantInput}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    handleSearchString={(string) => dispatch(setPickupPlantInput(string))}
                    fetchDataBySearchString={fetchPlantdetailsByName}
                    onSelect={handlePlantAutoSelection}
                    selectedId={pickupCustomerPlantId}
                    clearInputCallback={() => {
                      dispatch(setSelectedPlantPK(null));
                    }}
                    loading={customerPlantAutocompleteLoading}
                  />
                  <LookupButton onClick={() => setPlantLookUp(true)} disabled={""} />
                </Col>
              </Form.Group>
              <Row>
                <Col sm={1} md={1} xs={1} className="p-0"></Col>
                <Col
                  className={`p-0 text-danger alert ${isPalntAvailableForCustomer === false || hasCustomerThePlants === false ? "" : "hide-elements"}`}
                  style={{ left: "15px", paddingLeft: "75px" }}
                >
                  <p style={{ marginLeft: "84px", height: "1px" }}>{warningMessageForPlant}</p>
                </Col>
              </Row>
            </Col>
            <div style={{ marginBottom: "250px" }}></div>
          </div>
        </div>
        <DispatchFooter />
      </div>

      <YardLookup
        show={yardLookUp}
        onHide={() => setYardLookUp(false)}
        renderItemId={(yard) => yard.yardPK}
        handleLookupSelection={handleDeliveryYardLookupSelection}
        DriverDispatch={yardPKList ? yardPKList : false}
      />

      <CustomerLookup
        show={customerLookup}
        onHide={() => setCustomerLookup(false)}
        renderItemId={(customer) => customer.customerPK}
        handleLookupSelection={handleCustomerLookupSelection}
        DriverDispatch={customerPKList ? customerPKList : false}
      />

      <CustomerPlantsLookup
        customerId={selectedCustomerId}
        show={PlantLookUp}
        onHide={() => setPlantLookUp(false)}
        renderItemId={(plant) => plant.customerPlantPK}
        handleLookupSelection={handlePickupPlantLookupSelection}
        MaintenanceProgram
      />
      {loader ? <LoadingIcon /> : ""}
    </div>
  );
}

export default DriverDispatchReload;
