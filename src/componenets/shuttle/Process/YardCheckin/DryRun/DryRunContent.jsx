import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import ShuttleCityLookup from "../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import DateInputField from "../../../../common/DateInputField";
import {
  setPickupCityIDForDryRun,
  setPickupCityNameForDryRun,
  setDeliveryYardIDForDryRun,
  setDeliveryYardNameForDryRun,
  setDeliveryYardCodeForDryRun,
  setShuttleAmountForDryRun,
  setShuttleMilesForDryRun,
  setShuttleDateForDryRun,
  setIsCityToYardCombinationExistForDryRun,
  setReasonForDryRun,
  setIsShuttleDateValid,
  setIsDryRunRouteConfirmed,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import LoadingIcon from "../../../../common/LoadingIcon";

function DryRunContent() {
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
  const [pickupCities, setPickupCities] = useState([]);
  const [show, setShow] = useState(false);
  const [deliveryYard, setDeliveryYard] = useState([]);
  const [deliveryYardLookupShow, setDeliveryYardLookupShow] = useState(false);
  const [reason, setReason] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [modalPopup, setModalPopUp] = useState(false);
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
  const pickupCityIDForDryRun = useSelector((state) => state.yardCheckinReducer.pickupCityIDForDryRun);
  const pickupCityNameForDryRun = useSelector((state) => state.yardCheckinReducer.pickupCityNameForDryRun);
  const deliveryYardIDForDryRun = useSelector((state) => state.yardCheckinReducer.deliveryYardIDForDryRun);
  const deliveryYardNameForDryRun = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardNameForDryRun
  );
  const savedSuccessForDryRun = useSelector((state) => state.yardCheckinReducer.savedSuccessForDryRun);
  const isDryRunRouteConfirmed = useSelector((state) => state.yardCheckinReducer.isDryRunRouteConfirmed);

  useEffect(() => {
    dispatch(setIsDryRunRouteConfirmed(false));
  }, []);

  const confirmRoute = () => dispatch(setIsDryRunRouteConfirmed(true));
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);

  const [pickupLoading, setPickupLoading] = useState(false);
  const [deliveryLoading, setDeliveryLoading] = useState(false);

  /****** Pickup City dropdown and lookup ******/
  //Service for getting all Pickup Cities
  const fetchPickupCities = (string) => {
    setPickupLoading(true);
    YardCheckinService.getShuttleCityByName(string, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data?.content;
        const cityList = data?.map((cities) => ({ ...cities, city: cities.city?.trim() }));
        setPickupCities(cityList);
      })
      .catch((error) => {
        setPickupLoading(false);
      })
      .finally(() => {
        setPickupLoading(false);
      });
  };

  //Handle selection from pickup city dropdown
  const handleShuttleCitySelectionFromDropdown = (shuttleCity) => {
    if (shuttleCity.shuttleCityPK !== "" && deliveryYardIDForDryRun !== "") {
      isCityYardCombinationExist(shuttleCity.shuttleCityPK, deliveryYardIDForDryRun);
    }

    dispatch(setPickupCityIDForDryRun(shuttleCity.shuttleCityPK));
    dispatch(setPickupCityNameForDryRun(shuttleCity.city));
    confirmRoute();
  };

  //Enable shuttle city lookup
  const handleShuttleCityLookupModalShow = () => {
    setShow(true);
    confirmRoute();
  };

  //Disable shuttle city lookup
  const handleShuttleCityLookupModalHide = () => {
    setShow(false);
  };

  //Handle selection from shuttle city look up screen
  const handleShuttleCityLookupSelection = (shuttleCity) => {
    if (shuttleCity.shuttleCityPK !== "" && deliveryYardIDForDryRun !== "") {
      isCityYardCombinationExist(shuttleCity.shuttleCityPK, deliveryYardIDForDryRun);
    }

    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setPickupCityIDForDryRun(shuttleCity.shuttleCityPK));
    dispatch(setPickupCityNameForDryRun(shuttleCity.city));
    setShow(false);
  };

  /****** Delivery Yard dropdown and lookup ******/
  //Service for getting all Yards
  const fetchDeliveryYard = (string) => {
    setDeliveryLoading(true);
    YardCheckinService.getShuttleYardByName(string, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setDeliveryYard(yardsList);
      })
      .catch((error) => {
        setDeliveryLoading(false);
      })
      .finally(() => {
        setDeliveryLoading(false);
      });
  };

  //Handle selection from delivery yard dropdown
  const handleDeliveryYardSelectionFromDropdown = (deliveryYard) => {
    if (pickupCityIDForDryRun !== "" && deliveryYard.yardPK !== "") {
      isCityYardCombinationExist(pickupCityIDForDryRun, deliveryYard.yardPK);
    }

    dispatch(setDeliveryYardIDForDryRun(deliveryYard.yardPK));
    dispatch(setDeliveryYardNameForDryRun(deliveryYard.description));
    dispatch(setDeliveryYardCodeForDryRun(deliveryYard.sisterYardCode));
    confirmRoute();
  };

  //Handle selection from delivery yard lookup screen
  const handleDeliveryYardLookupSelection = (deliveryYard) => {
    if (pickupCityIDForDryRun !== "" && deliveryYard.yardPK !== "") {
      isCityYardCombinationExist(pickupCityIDForDryRun, deliveryYard.yardPK);
    }

    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setDeliveryYardIDForDryRun(deliveryYard.yardPK));
    dispatch(setDeliveryYardNameForDryRun(deliveryYard.description));
    dispatch(setDeliveryYardCodeForDryRun(deliveryYard.sisterYardCode));
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
  const isCityYardCombinationExist = (city, yard) => {
    if (city != null && yard != null) {
      setLoading(true);
      YardCheckinService.cityToYardCombinationCheckForShuttle(
        city,
        yard,
        isSelectedUnitTowable,
        isSelectedUnitMotorized,
        selectedUnitCompanyName,
        true
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
  // UseEffect for setting selected Driver Name in local state
  useEffect(() => {
    if (selectedDriverData) {
      const fullName = `${selectedDriverData.firstName ? selectedDriverData.firstName?.trim() : ""} ${
        selectedDriverData.lastName ? selectedDriverData.lastName?.trim() : ""
      }`;
      setSelectedDriverName(fullName?.trim());
    }
  }, [selectedDriverData]);

  // UseEffect for setting selected Unit's UnitNumber and Specialcode
  useEffect(() => {
    if (unitNumberSelected || specialCodeOfSelectedUnit) {
      setSelectedUnitNumber(unitNumberSelected);
      setSelectedUnitSpecialCode(specialCodeOfSelectedUnit);
    }
  }, [unitNumberSelected, specialCodeOfSelectedUnit]);

  //UseEffect for service call to check City-Yard combination
  useEffect(() => {
    if (pickupCityIDForDryRun !== "" && deliveryYardIDForDryRun !== "") {
      isCityYardCombinationExist(pickupCityIDForDryRun, deliveryYardIDForDryRun);
    }
  }, []);

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setShuttleDateForDryRun(shuttleDate));
    dispatch(setShuttleAmountForDryRun(shuttleAmount));
    dispatch(setShuttleMilesForDryRun(miles));
    dispatch(setIsCityToYardCombinationExistForDryRun(warningMessage));
    dispatch(setReasonForDryRun(reason));
  }, [shuttleDate, shuttleAmount, miles, warningMessage, reason]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [pickupCityIDForDryRun]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [deliveryYardIDForDryRun]);

  useEffect(() => {
    if (unitNumberSelected === "") {
      setShuttleDate("");
      dispatch(setPickupCityNameForDryRun(""));
      dispatch(setDeliveryYardNameForDryRun(""));
      setSelectedUnitSpecialCode("");
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
    if (savedSuccessForDryRun) {
      navigate("/yard-checkin-unit-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedSuccessForDryRun]);

  useEffect(() => {
    if (warningMessage === "") {
      setModalPopUp(false);
    } else {
      setModalPopUp(true);
    }
  }, [warningMessage]);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 mb-5" xs={7}>
              {/* Driver */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
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
                    type="text"
                    value={selectedUnitNumber}
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

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    value={selectedUnitSpecialCode}
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
                    max={new Date()}
                  />
                </Col>
              </Form.Group>

              {/* Pickup  City */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Pickup City</Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={pickupCities}
                    searchString={pickupCityNameForDryRun}
                    renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
                    renderItemField={(shuttleCity) => shuttleCity.city?.trim()}
                    handleSearchString={(string) => dispatch(setPickupCityNameForDryRun(string))}
                    fetchDataBySearchString={fetchPickupCities}
                    onSelect={handleShuttleCitySelectionFromDropdown}
                    selectedId={pickupCityIDForDryRun}
                    loading={pickupLoading}
                    clearInputCallback={() => {
                      dispatch(setPickupCityIDForDryRun(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    className={`${
                      pickupCityIDForDryRun === "" || pickupCityNameForDryRun === "" || warningMessage !== ""
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
                      className={`btn btn-sm ${isDryRunRouteConfirmed ? "btn-success" : "btn-danger"}`}
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

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={deliveryYard}
                    searchString={deliveryYardNameForDryRun}
                    renderItemId={(deliveryYard) => deliveryYard.yardPK}
                    renderItemField={(deliveryYard) => deliveryYard.description?.trim()}
                    handleSearchString={(string) => dispatch(setDeliveryYardNameForDryRun(string))}
                    fetchDataBySearchString={fetchDeliveryYard}
                    onSelect={handleDeliveryYardSelectionFromDropdown}
                    selectedId={deliveryYardIDForDryRun}
                    loading={deliveryLoading}
                    clearInputCallback={() => {
                      dispatch(setDeliveryYardIDForDryRun(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    className={`${
                      deliveryYardIDForDryRun === "" ||
                      deliveryYardNameForDryRun === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                    towardsTop={true}
                  />
                  <LookupButton onClick={handleDeliveryYardLookupModalShow} />
                </Col>

                {/* <Row>
                  <Col sm={3} md={3} xs={3} className="p-0 text-start"></Col>
                  <Col style={{ paddingLeft: "5px" }}>
                    <p className="mb-0 text-danger" style={{ height: "7px" }}>
                      {warningMessage}
                    </p>
                  </Col>
                </Row> */}
              </Form.Group>

              <Form.Group className="form-group mt-2  align-items-start row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <label className="col-form-label me-4">Reason For Dry Run</label>
                </Col>

                <Col xs={9} md={9} className="p-0">
                  <textarea
                    rows={5}
                    cols={20}
                    type="search"
                    name="reasonfordryrun"
                    onInput={(e) => setReason(e.target.value)}
                    style={{
                      borderColor: reason?.trim() === "" || reason === " " ? "red" : "green",
                    }}
                    className={`customFormControl h-100  customFocusClass ${
                      reason?.trim() === "" ? "borderRed" : "borderGreen"
                    }`}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/* Shuttle city lookup screen */}
            <ShuttleCityLookup
              show={show}
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

export default DryRunContent;
