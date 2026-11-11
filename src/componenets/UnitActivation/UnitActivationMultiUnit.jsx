/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import LookupButton from "../common/LookupButton";
import UnitActivationFooter from "./UnitActivationFooter";
import UnitActivationHeader from "./UnitActivationHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSaveList,
  setBrowseType,
  setUnitBrowseFilter,
  setViewOnly,
} from "../../redux/UnitActivationSlice";
import AutoCompleteDropdown from "../common/AutoCompleteDropdown";
import UnitActivationService from "../../services/UnitActivationService";
import CustomerLookup from "../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import YardLookup from "../LookupScreens/Yard/YardLookup";
import UnitTypeGroupsLookup from "../LookupScreens/UnitTypeGroups/UnitTypeGroupsLookup";
import DateInputField from "../common/DateInputField";

function UnitActivationMultiUnit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [available, setAvailable] = useState(true);
  const [active, setActive] = useState(false);
  const [adsView, setAdsView] = useState(false);
  const [adsActive, setAdsActive] = useState(false);

  const [outbound, setOutbound] = useState(false);
  const [reload, setReload] = useState(false);

  const [motorized, setMotorized] = useState(false);
  const [towable, setTowable] = useState(false);
  const [haulAndTow, setHaulAndTow] = useState(false);
  const [flatbed, setFlatbed] = useState(false);
  const [popup, setPopup] = useState(false);
  const [truckCamper, setTruckCamper] = useState(false);

  const [sortBy, setSortBy] = useState("unit");

  const [customerDropdownData, setCustomerDropdownData] = useState([]);
  const [plantsDropdownData, setPlantsDropdownData] = useState([]);
  const [yardsDropdownData, setYardsDropdownData] = useState([]);
  const [unitTypeDropdownData, setUnitTypesDropdownData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [customerSelection, setCustomerSelection] = useState(false);
  const [isCustomerDpu, setIsCustomerDpu] = useState(false);
  const [customerSisterCompnanyFK, setCustomerSisterCompnanyFK] = useState(null);
  const [plantName, setPlantName] = useState("");
  const [plantId, setPlantId] = useState(null);
  const [plantCode, setPlantCode] = useState("");
  const [plantSelection, setPlantSelection] = useState(false);
  const [yardName, setYardName] = useState("");
  const [yardId, setYardId] = useState(null);
  const [yardCode, setYardCode] = useState("");
  const [yardSelection, setYardSelection] = useState(false);
  const [unitTypeGroupDescription, setUnitTypeGroupDescription] = useState("");
  const [unitTypeGroupId, setUnitTypeGroupId] = useState(null);
  const [unitTypeGroupSelection, setUnitTypeGroupSelection] = useState(false);

  const [lengthFrom, setLengthFrom] = useState("");
  const [lengthTo, setLengthTo] = useState("");
  const [validLength, setValidLength] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [isOrderDateValid, setIsOrderDateValid] = useState(!orderDate ? true : false);
  const [canadaOnly, setCanadaOnly] = useState(false);
  const [pickupState, setPickupState] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [pickupStateValid, setPickupStateValid] = useState(true);
  const [deliveryStateValid, setDeliveryStateValid] = useState(true);
  const [validStateCodeList, setValidStateCodeList] = useState([]);
  const [continueDisable, setContinueDisable] = useState(false);
  const [unitTypeLoading, setUnitTypeLoading] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);
  const [customerPlantLoading, setCustomerPlantLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);

  const { browseType, viewOnly } = useSelector((state) => state.unitActivationReducer);

  /**
   * Fetch all the customers.
   * Used for Customer Autocomplete
   */
  const fetchCustomerDetails = (string) => {
    setCustomerLoading(true);
    UnitActivationService.getCustomerDetails(string)
      .then((response) => {
        const data = response.data;
        const customersList = data.content?.map((customer) => ({
          ...customer,
          name: customer.name?.trim(),
        }));
        setCustomerDropdownData(customersList);
        setCustomerLoading(false);
      })
      .catch((err) => {
        setCustomerLoading(false);
      });
  };

  /**
   * used for Customer selection Autocomplete & Lookup - onSelect
   */
  const handleCustomerSelection = (customer) => {
    setCustomerName(customer.name);
    setCustomerId(customer.customerPK);
    setCustomerSelection(false);
    setIsCustomerDpu(
      customer?.usePlants === false && customer?.dpuCustomer === true ? customer?.dpuCustomer : false
    );
    setCustomerSisterCompnanyFK(customer?.sisterCompanyFK);
    setPlantName("");
    setPlantId(null);
    setPlantCode("");
  };

  /**
   * Fetch all the  active customer plants for the selected customer if any.
   * Otherwise fetch all active plants
   * Used for Plants Autocomplete
   */
  const fetchPlantdetails = (string) => {
    setCustomerPlantLoading(true);
    UnitActivationService.fetchPlantdetails(customerId, isCustomerDpu, string)
      .then((response) => {
        const data = response.data.content;
        const customerPlantsList = data?.map((plants) => ({
          ...plants,
          name: plants.name?.trim(),
        }));
        setPlantsDropdownData(customerPlantsList);
        setCustomerPlantLoading(false);
      })
      .catch((err) => {
        setCustomerPlantLoading(false);
      });
  };

  /**
   * used for Plant Autocomplete & Lookup - onSelect
   */
  const handlePlantSelection = (plant) => {
    setPlantName(plant.name);
    setPlantId(plant.customerPlantPK);
    setPlantCode(plant.sisterPlantCode);
    setPlantSelection(false);
  };

  /**
   * Fetch all active Yards.
   * Used for Yards Autocomplete
   */
  const fetchYardDetails = (string) => {
    setYardLoading(true);
    UnitActivationService.fetchYardDetails(string)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({
          ...yards,
          description: yards.description?.trim(),
        }));
        setYardsDropdownData(yardsList);
        setYardLoading(false);
      })
      .catch((err) => {
        setYardLoading(false);
      });
  };

  /**
   * used for Yard Autocomplete & Lookup - onSelect
   */
  const handleYardSelection = (yard) => {
    setYardId(yard.yardPK);
    setYardName(yard.description);
    setYardSelection(false);
    setYardCode(yard.sisterYardCode);
  };

  /**
   * Fetch all Unit Type Groups.
   * Used for Unit Type Groups autocomplete.
   */
  const fetchAllUnitTypeGroups = (string) => {
    setUnitTypeLoading(true);
    UnitActivationService.fetchAllUnitTypeGroups(string)
      .then((response) => {
        const data = response.data;
        const unitTypeGroupList = data.content?.map((unitType) => ({
          ...unitType,
          description: unitType.description?.trim(),
        }));
        setUnitTypesDropdownData(unitTypeGroupList);
        setUnitTypeLoading(false);
      })
      .catch((error) => {
        setUnitTypeLoading(false);
      });
  };

  /**
   * used for Unit Type Groups Autocomplete & Lookup - onSelect
   */
  const handleUnitTypeGroupsSelection = (unitTypeGroups) => {
    setUnitTypeGroupDescription(unitTypeGroups.description);
    setUnitTypeGroupId(unitTypeGroups.unitTypeGroupPK);
    setUnitTypeGroupSelection(false);
  };

  const closeHandler = () => {
    dispatch(
      resetSaveList({
        key: "all",
      })
    );
    navigate("/");
    dispatch(setBrowseType(""));
  };

  const continueHandler = () => {
    dispatch(
      resetSaveList({
        key: "all",
      })
    );
    navigate("/unit-activation-multi-unit-browse");
  };

  const cancelHandler = () => {
    dispatch(
      resetSaveList({
        key: "all",
      })
    );
    navigate("/unit-activation-selections");
    dispatch(setBrowseType(""));
  };

  const isStateInputValid = (states) => {
    if (states === "" || /^[A-Za-z]{2}(, ?[A-Za-z]{2})*$/.test(states)) {
      return true;
    } else {
      return false;
    }
  };

  const getAllStateCodes = () => {
    UnitActivationService.getAllStateCodes()
      .then((response) => {
        const { data } = response;
        if (data !== "") {
          setValidStateCodeList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const isValidStateList = (stateList) => {
    for (let stateCode of stateList) {
      if (!validStateCodeList.includes(stateCode?.toUpperCase())) {
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    if (browseType === "") {
      navigate("/unit-activation-selections");
    }
    dispatch(setViewOnly(false));
    getAllStateCodes();
  }, []);

  useEffect(() => {
    if (
      (lengthFrom === "" && lengthTo === "") ||
      (lengthFrom !== "" &&
        lengthTo !== "" &&
        Number(lengthTo) >= Number(lengthFrom) &&
        lengthFrom <= 32767 &&
        lengthTo <= 32767 &&
        Number(lengthTo) !== 0 &&
        Number(lengthFrom) !== 0)
    ) {
      setValidLength(true);
    } else {
      setValidLength(false);
    }
  }, [lengthFrom, lengthTo]);

  useEffect(() => {
    dispatch(
      setUnitBrowseFilter({
        viewOnly,
        sortBy,
        available,
        active,
        adsView,
        adsActive,
        reload,
        outbound,
        motorized,
        towable,
        haulAndTow,
        flatbed,
        popup,
        truckCamper,
        customerId,
        plantId,
        yardId,
        unitTypeGroupId,
        lengthFrom,
        lengthTo,
        orderDate,
        canadaOnly,
        pickupState,
        deliveryState,
      })
    );
  }, [
    sortBy,
    active,
    adsView,
    adsActive,
    available,
    reload,
    outbound,
    motorized,
    towable,
    haulAndTow,
    flatbed,
    popup,
    truckCamper,
    customerId,
    plantId,
    yardId,
    unitTypeGroupId,
    lengthFrom,
    lengthTo,
    orderDate,
    canadaOnly,
    viewOnly,
    pickupState,
    deliveryState,
  ]);

  useEffect(() => {
    if (
      (available || active) &&
      (outbound || reload) &&
      (motorized || towable || haulAndTow || flatbed || popup || truckCamper) &&
      sortBy &&
      (customerName === "" || (customerName !== "" && customerId !== null)) &&
      (plantName === "" || (plantName !== "" && plantId !== null)) &&
      (yardName === "" || (yardName !== "" && yardId !== null)) &&
      (unitTypeGroupDescription === "" || (unitTypeGroupDescription !== "" && unitTypeGroupId !== null)) &&
      validLength &&
      isOrderDateValid &&
      pickupStateValid &&
      deliveryStateValid
    ) {
      setContinueDisable(false);
    } else {
      setContinueDisable(true);
    }
  }, [
    viewOnly,
    available,
    active,
    outbound,
    reload,
    motorized,
    towable,
    haulAndTow,
    flatbed,
    popup,
    truckCamper,
    sortBy,
    customerName,
    customerId,
    plantName,
    plantId,
    yardName,
    yardId,
    unitTypeGroupDescription,
    unitTypeGroupId,
    validLength,
    isOrderDateValid,
    pickupStateValid,
    deliveryStateValid,
  ]);

  useEffect(() => {
    if (isStateInputValid(pickupState) && pickupState !== "") {
      const stateCodes = pickupState.split(",").map((state) => state?.trim());
      setPickupStateValid(isValidStateList(stateCodes));
    } else {
      if (pickupState === "") {
        setPickupStateValid(true);
      } else {
        setPickupStateValid(false);
      }
    }
  }, [pickupState]);

  useEffect(() => {
    if (isStateInputValid(deliveryState) && deliveryState !== "") {
      const stateCodes = deliveryState.split(",").map((state) => state?.trim());
      setDeliveryStateValid(isValidStateList(stateCodes));
    } else {
      if (deliveryState === "") {
        setDeliveryStateValid(true);
      } else {
        setDeliveryStateValid(false);
      }
    }
  }, [deliveryState]);

  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <UnitActivationHeader closeButton={true} closeHandler={closeHandler} />
        <div className="p-2">
          <div className="shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="p-15 mb-3">
              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col sm={10} className="p-0">
                  <div className="m-0 p-0 align-items-center d-flex">
                    {/* View Only */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">View Only</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px d-flex me-5 align-items-center">
                      <input
                        type="checkbox"
                        name="viewOnly"
                        id="viewOnly"
                        checked={viewOnly}
                        onChange={(e) => {
                          dispatch(setViewOnly(e.target.checked));
                        }}
                      />
                    </Col>

                    {/* Available */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Available</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px me-5 d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="available"
                        id="available"
                        className={`form-check-input p-0 ${!(available || active) ? "borderRed" : ""}`}
                        checked={available}
                        onChange={(e) => {
                          setAvailable(e.target.checked);
                        }}
                      />
                    </Col>

                    {/* Active */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Active</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px me-5 d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="active"
                        id="active"
                        className={`form-check-input p-0 ${!(available || active) ? "borderRed" : ""}`}
                        checked={active}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setActive(checked);
                          // ADS View / ADS Active only apply when Active is checked.
                          if (!checked) {
                            setAdsView(false);
                            setAdsActive(false);
                          }
                        }}
                      />
                    </Col>

                    {/* ADS View */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">ADS View</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px me-5 d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="adsView"
                        id="adsView"
                        checked={adsView}
                        disabled={!active}
                        onChange={(e) => {
                          setAdsView(e.target.checked);
                        }}
                      />
                    </Col>

                    {/* ADS Active */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">ADS Active</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        name="adsActive"
                        id="adsActive"
                        checked={adsActive}
                        disabled={!active}
                        onChange={(e) => {
                          setAdsActive(e.target.checked);
                        }}
                      />
                    </Col>
                  </div>
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col sm={10} className="p-0">
                  <div className="m-0 p-0 align-items-center d-flex">
                    {/* Outbound */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Outbound</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px d-flex me-5 align-items-center">
                      <input
                        type="checkbox"
                        name="outbound"
                        id="outbound"
                        className={`form-check-input p-0 ${!(outbound || reload) ? "borderRed" : ""}`}
                        checked={outbound}
                        onChange={(e) => {
                          setOutbound(e.target.checked);
                        }}
                      />
                    </Col>

                    {/* Reloads */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Reloads</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px me-5 d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="reload"
                        id="reload"
                        className={`form-check-input p-0 ${!(outbound || reload) ? "borderRed" : ""}`}
                        checked={reload}
                        onChange={(e) => {
                          setReload(e.target.checked);
                        }}
                      />
                    </Col>
                  </div>
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col sm={10} className="p-0">
                  <div className="m-0 p-0 align-items-center d-flex">
                    {/* Motorized */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Motorized</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px d-flex me-5 align-items-center">
                      <input
                        type="checkbox"
                        name="motorized"
                        id="motorized"
                        className={`form-check-input p-0 ${
                          !(motorized || towable || haulAndTow || flatbed || popup || truckCamper)
                            ? "borderRed"
                            : ""
                        }`}
                        checked={motorized}
                        onChange={(e) => {
                          setMotorized(e.target.checked);
                        }}
                      />
                    </Col>

                    {/* Towable */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Towable</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px me-5 d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="towable"
                        id="towable"
                        className={`form-check-input p-0 ${
                          !(motorized || towable || haulAndTow || flatbed || popup || truckCamper)
                            ? "borderRed"
                            : ""
                        }`}
                        checked={towable}
                        onChange={(e) => {
                          setTowable(e.target.checked);
                        }}
                      />
                    </Col>

                    {/* Haul & Tow */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Haul & Tow</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px me-5 d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="haulAndTow"
                        id="haulAndTow"
                        className={`form-check-input p-0 ${
                          !(motorized || towable || haulAndTow || flatbed || popup || truckCamper)
                            ? "borderRed"
                            : ""
                        }`}
                        checked={haulAndTow}
                        onChange={(e) => {
                          setHaulAndTow(e.target.checked);
                        }}
                      />
                    </Col>

                    {/* Flatbed */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Flatbed</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px me-5 d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="flatbed"
                        id="flatbed"
                        checked={flatbed}
                        className={`form-check-input p-0 ${
                          !(motorized || towable || haulAndTow || flatbed || popup || truckCamper)
                            ? "borderRed"
                            : ""
                        }`}
                        onChange={(e) => {
                          setFlatbed(e.target.checked);
                        }}
                      />
                    </Col>

                    {/* Popup */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Popup</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px d-flex me-5 align-items-center">
                      <input
                        type="checkbox"
                        name="popup"
                        id="popup"
                        checked={popup}
                        className={`form-check-input p-0 ${
                          !(motorized || towable || haulAndTow || flatbed || popup || truckCamper)
                            ? "borderRed"
                            : ""
                        }`}
                        onChange={(e) => {
                          setPopup(e.target.checked);
                        }}
                      />
                    </Col>

                    {/* Truck Camper */}
                    <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                      <Form.Label className="col-form-label dealer-label">Truck Camper</Form.Label>
                    </Col>
                    <Col xs={1} className="p-0 w-25px d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="truckCamper"
                        id="truckCamper"
                        checked={truckCamper}
                        className={`form-check-input p-0 ${
                          !(motorized || towable || haulAndTow || flatbed || popup || truckCamper)
                            ? "borderRed"
                            : ""
                        }`}
                        onChange={(e) => {
                          setTruckCamper(e.target.checked);
                        }}
                      />
                    </Col>
                  </div>
                </Col>
              </Form.Group>

              <Form.Group className={`mt-4 align-items-center row m-l-0 m-r-0 ms-0`}>
                <Col sm={8} className="px-0 d-flex">
                  <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                    <Form.Label className={` col-form-label  dealer-label`}>Sort By</Form.Label>
                  </Col>

                  {/* Unit */}
                  <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
                    <Col className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="unit"
                        id="unit"
                        checked={sortBy === "unit" ? true : false}
                        onChange={(e) => {
                          e.target.checked && setSortBy("unit");
                        }}
                      />{" "}
                      <label htmlFor="adsNo" className="ms-2">
                        Unit
                      </label>{" "}
                    </Col>

                    {/* Last 5 */}
                    <Col className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="last5"
                        id="last5"
                        checked={sortBy === "last5" ? true : false}
                        onChange={(e) => {
                          e.target.checked && setSortBy("last5");
                        }}
                      />{" "}
                      <label className="ms-2" htmlFor="last5s">
                        Last 5
                      </label>{" "}
                    </Col>

                    {/* State */}
                    <Col className={`d-flex align-items-center}`}>
                      <input
                        type="radio"
                        name="state"
                        id="state"
                        checked={sortBy === "state" ? true : false}
                        onChange={(e) => {
                          e.target.checked && setSortBy("state");
                        }}
                      />{" "}
                      <label className="ms-2" htmlFor="state">
                        State
                      </label>{" "}
                    </Col>

                    {/* Yard */}
                    <Col className={`d-flex align-items-center}`}>
                      <input
                        type="radio"
                        name="yard"
                        id="yard"
                        checked={sortBy === "yard" ? true : false}
                        onChange={(e) => {
                          e.target.checked && setSortBy("yard");
                        }}
                      />{" "}
                      <label className="ms-2" htmlFor="yard">
                        Yard
                      </label>{" "}
                    </Col>
                  </Col>
                </Col>
              </Form.Group>

              <div className="d-flex">
                <Col xs={6}>
                  {/* Customer */}
                  <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                    <Col xs={3} className="p-0 ">
                      <Form.Label htmlFor="customer" className="col-form-label dealer-label">
                        Customer
                      </Form.Label>
                    </Col>
                    <div className="p-0 col-5 d-flex">
                      <AutoCompleteDropdown
                        arrayList={customerDropdownData}
                        searchString={customerName}
                        loading={customerLoading}
                        renderItemId={(customer) => customer.customerPK}
                        renderItemField={(customer) => customer.name}
                        selectedId={customerId}
                        handleSearchString={(string) => setCustomerName(string)}
                        fetchDataBySearchString={fetchCustomerDetails}
                        onSelect={handleCustomerSelection}
                        clearInputCallback={() => {
                          setCustomerId(null);
                        }}
                        className={`${
                          (customerId === "" || customerId === null) && customerName !== "" ? "borderRed" : ""
                        }`}
                      />
                      <LookupButton onClick={() => setCustomerSelection(true)} />
                    </div>
                  </Form.Group>

                  {/* Plant */}
                  <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                    <Col xs={3} className="p-0 ">
                      <Form.Label htmlFor="Plant" className="col-form-label dealer-label">
                        Plant
                      </Form.Label>
                    </Col>

                    <div className="p-0 col-5 d-flex">
                      {/* Plant Autocomplete */}
                      <AutoCompleteDropdown
                        arrayList={plantsDropdownData}
                        loading={customerPlantLoading}
                        searchString={plantName}
                        renderItemId={(plant) => plant.customerPlantPK}
                        renderItemField={(plant) => plant.name}
                        selectedId={plantId}
                        handleSearchString={(string) => setPlantName(string)}
                        fetchDataBySearchString={fetchPlantdetails}
                        onSelect={handlePlantSelection}
                        clearInputCallback={() => {
                          setPlantId(null);
                        }}
                        className={`${
                          (plantId === "" || plantId === null) && plantName !== "" ? "borderRed" : ""
                        }`}
                        disabled={customerSisterCompnanyFK}
                      />
                      <LookupButton
                        onClick={() => setPlantSelection(true)}
                        disabled={customerSisterCompnanyFK}
                      />
                    </div>
                  </Form.Group>

                  {/* Yard */}
                  <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                    <Col xs={3} className="p-0 ">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Yard
                      </Form.Label>
                    </Col>

                    <div className="p-0 col-5 d-flex">
                      {/* Pickup Yard Autocomplete */}
                      <AutoCompleteDropdown
                        arrayList={yardsDropdownData}
                        searchString={yardName}
                        loading={yardLoading}
                        renderItemId={(yard) => yard.yardPK}
                        renderItemField={(yard) => yard.description}
                        selectedId={yardId}
                        handleSearchString={(string) => setYardName(string)}
                        fetchDataBySearchString={fetchYardDetails}
                        onSelect={handleYardSelection}
                        clearInputCallback={() => {
                          setYardId(null);
                        }}
                        className={`${
                          (yardId === "" || yardId === null) && yardName !== "" ? "borderRed" : ""
                        }`}
                      />
                      <LookupButton onClick={() => setYardSelection(true)} />
                    </div>
                  </Form.Group>

                  {/* Unit Type Group */}
                  <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                    <Col xs={3} className="p-0 ">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Unit Type Group
                      </Form.Label>
                    </Col>

                    <div className="p-0 col-5 d-flex">
                      <AutoCompleteDropdown
                        arrayList={unitTypeDropdownData}
                        loading={unitTypeLoading}
                        searchString={unitTypeGroupDescription}
                        customFormatSearchString={(searchString) => searchString}
                        renderItemId={(unitType) => unitType.unitTypeGroupPK}
                        renderItemField={(unitType) => unitType.description}
                        handleSearchString={(string) => setUnitTypeGroupDescription(string)}
                        fetchDataBySearchString={fetchAllUnitTypeGroups}
                        onSelect={handleUnitTypeGroupsSelection}
                        clearInputCallback={() => {
                          setUnitTypeGroupId(null);
                        }}
                        className={`${
                          (unitTypeGroupId === "" || unitTypeGroupId === null) &&
                          unitTypeGroupDescription !== ""
                            ? "borderRed"
                            : ""
                        }`}
                        selectedId={unitTypeGroupId}
                        maxHeight={"200px"}
                      />
                      <LookupButton onClick={() => setUnitTypeGroupSelection(true)} />
                    </div>
                  </Form.Group>

                  <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                    <Col xs={3} className="p-0 ">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Length
                      </Form.Label>
                    </Col>

                    <div className="p-0 d-flex align-items-center ">
                      <input
                        className={` customFormControl w-50px ${
                          lengthFrom === "" ? "" : !validLength ? "borderRed" : ""
                        }`}
                        type="text"
                        autoComplete="off"
                        aria-autocomplete="list"
                        maxLength={5}
                        value={lengthFrom}
                        onBeforeInput={(e) => {
                          if (
                            e.data === "+" ||
                            e.data === "e" ||
                            !/^[0-9]*$/.test(e.data) ||
                            (e.target.value === "" && e.data === "0")
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => setLengthFrom(e.target.value)}
                      />

                      <div className="mx-2">To</div>
                      <input
                        className={` customFormControl w-50px ${
                          lengthTo === "" ? "" : !validLength ? "borderRed" : ""
                        }`}
                        type="text"
                        autoComplete="off"
                        aria-autocomplete="list"
                        maxLength={5}
                        value={lengthTo}
                        onBeforeInput={(e) => {
                          if (
                            e.data === "+" ||
                            e.data === "e" ||
                            !/^[0-9]*$/.test(e.data) ||
                            (e.target.value === "" && e.data === "0")
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => setLengthTo(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                    <Col xs={3} className="p-0 ">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Order Date
                      </Form.Label>
                    </Col>

                    <div className="p-0 col-2">
                      <DateInputField
                        className={!isOrderDateValid ? "borderRed" : ""}
                        name="orderDate"
                        id="orderDate"
                        date={orderDate}
                        setDate={setOrderDate}
                        setIsDateValid={setIsOrderDateValid}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className=" align-items-center d-flex mt-4 m-l-0 m-r-0">
                    <div className="p-0 col-3">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Canada Only
                      </Form.Label>
                    </div>

                    <div className="p-0 w-60px">
                      <input
                        type="checkbox"
                        name="canadaOnly"
                        id="canadaOnly"
                        checked={canadaOnly}
                        onChange={(e) => {
                          setCanadaOnly(e.target.checked);
                        }}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className=" mb-1 align-items-center d-flex mt-4 m-l-0 m-r-0">
                    <Col xs={3} className="p-0 ">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Pickup State
                      </Form.Label>
                    </Col>

                    <div className="p-0 col-2">
                      <input
                        className={`customFormControl ${!pickupStateValid ? "borderRed" : ""}`}
                        type="text"
                        name="pickupState"
                        id="pickupState"
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={pickupState?.toUpperCase()}
                        onChange={(e) => {
                          setPickupState(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className=" mb-1 align-items-center d-flex mt-4 m-l-0 m-r-0">
                    <Col xs={3} className="p-0 ">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Delivery State
                      </Form.Label>
                    </Col>

                    <div className="p-0 col-2">
                      <input
                        className={`customFormControl ${!deliveryStateValid ? "borderRed" : ""}`}
                        type="text"
                        name="deliveryState"
                        id="deliveryState"
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={deliveryState?.toUpperCase()}
                        onChange={(e) => {
                          setDeliveryState(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </div>
            </Row>
          </div>
        </div>
        <UnitActivationFooter
          continueButton={true}
          cancelButton={true}
          continueDisable={continueDisable}
          continueHandler={continueHandler}
          cancelHandler={cancelHandler}
        />
        {/* Customer Lookup Modal */}
        <CustomerLookup
          show={customerSelection}
          onHide={() => {
            setCustomerSelection(false);
          }}
          renderItemId={(customer) => customer.customerPK}
          handleLookupSelection={handleCustomerSelection}
          MaintenanceProgram
        />
        {/* Plant Lookup Modal */}
        <CustomerPlantsLookup
          customerId={customerId}
          show={plantSelection}
          onHide={() => {
            setPlantSelection(false);
          }}
          renderItemId={(plant) => plant.customerPlantPK}
          handleLookupSelection={handlePlantSelection}
          OrderEntry
        />
        {/* Pickup Yard Lookup Modal */}
        <YardLookup
          show={yardSelection}
          onHide={() => {
            setYardSelection(false);
          }}
          renderItemId={(yard) => yard.yardPK}
          handleLookupSelection={handleYardSelection}
          MaintenanceProgram
        />
        {/* Unit Type Groups Lookup Modal */}
        <UnitTypeGroupsLookup
          show={unitTypeGroupSelection}
          onHide={() => {
            setUnitTypeGroupSelection(false);
          }}
          renderItemId={(unitTypeGroups) => unitTypeGroups.unitTypeGroupPK}
          handleLookupSelection={handleUnitTypeGroupsSelection}
          MaintenanceProgram
        />
      </div>
    </div>
  );
}

export default UnitActivationMultiUnit;
