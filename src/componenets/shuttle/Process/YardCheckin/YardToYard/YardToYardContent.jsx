import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LookupButton from "../../../../common/LookupButton";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import {
  setShuttleAmountForYardToYard,
  setShuttleMilesForYardToYard,
  setShuttleDateForYardToYard,
  setPickupYardIDForYardToYard,
  setPickupYardNameForYardToYard,
  setPickupYardCodeForYardToYard,
  setDeliveryYardIDForYardToYard,
  setDeliveryYardNameForYardToYard,
  setDeliveryYardCodeForYardToYard,
  setIsYardToYardCombinationExist,
  setRowForYardToYard,
  setPositionForYardToYard,
  setIsShuttleDateValid,
  setIsYardToYardRouteConfirmed,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import DateInputField from "../../../../common/DateInputField";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import LoadingIcon from "../../../../common/LoadingIcon";

function YardToYardContent() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Set today's date as Current Date.
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
  const [deliveryYards, setDeliveryYards] = useState([]);
  const [deliveryYardLookupShow, setDeliveryYardLookupShow] = useState(false);
  const [row, setRow] = useState("");
  const [position, setPosition] = useState("");
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
  const pickupYardNameForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.pickupYardNameForYardToYard
  );
  const pickupYardIDForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.pickupYardIDForYardToYard
  );
  const deliveryYardNameForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardNameForYardToYard
  );
  const deliveryYardIDForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardIDForYardToYard
  );
  const savedSuccessForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.savedSuccessForYardToYard
  );
  const isYardToYardRouteConfirmed = useSelector(
    (state) => state.yardCheckinReducer.isYardToYardRouteConfirmed
  );

  useEffect(() => {
    dispatch(setIsYardToYardRouteConfirmed(false));
  }, []);

  const confirmRoute = () => dispatch(setIsYardToYardRouteConfirmed(true));
  const selectedId = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedId);
  const selectedObject = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedObject);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);
  const unitData = useSelector((state) => state.yardCheckinReducer.unitData);
  const [yard1Loading, setYard1Loading] = useState(false);

  /****** Pickup Yard dropdown and lookup ******/
  //Service for getting all Yards by Name
  const fetchAllYards = (string) => {
    setYard1Loading(true);
    YardCheckinService.getShuttleYardByName(string, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setPickupYards(yardsList);
        setDeliveryYards(yardsList);
        setYard1Loading(false);
      })
      .catch((error) => {
        console.log(error);
        setYard1Loading(false);
      });
  };

  //Handle selection from pickup yard dropdown
  const handlePickupYardSelectionFromDropdown = (pickupYard) => {
    if (pickupYard.yardPK !== "" && deliveryYardIDForYardToYard !== "") {
      yardToYardCombinationExist(pickupYard.yardPK, deliveryYardIDForYardToYard);
    }
    dispatch(setPickupYardIDForYardToYard(pickupYard.yardPK));
    dispatch(setPickupYardNameForYardToYard(pickupYard.description));
    dispatch(setPickupYardCodeForYardToYard(pickupYard.sisterYardCode));
    confirmRoute();
  };

  //Handle selection from pickup yard lookup screen
  const handlePickupYardLookupSelection = (pickupYard) => {
    if (pickupYard.yardPK !== "" && deliveryYardIDForYardToYard !== "") {
      yardToYardCombinationExist(pickupYard.yardPK, deliveryYardIDForYardToYard);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setPickupYardIDForYardToYard(pickupYard.yardPK));
    dispatch(setPickupYardNameForYardToYard(pickupYard.description));
    dispatch(setPickupYardCodeForYardToYard(pickupYard.sisterYardCode));
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

  /****** Delivery Yard dropdown and lookup ******/
  //Handle selection from delivery yard dropdown
  const handleDeliveryYardSelectionFromDropdown = (deliveryYard) => {
    if (pickupYardIDForYardToYard !== "" && deliveryYard.yardPK !== "") {
      yardToYardCombinationExist(pickupYardIDForYardToYard, deliveryYard.yardPK);
    }
    dispatch(setDeliveryYardIDForYardToYard(deliveryYard.yardPK));
    dispatch(setDeliveryYardNameForYardToYard(deliveryYard.description));
    dispatch(setDeliveryYardCodeForYardToYard(deliveryYard.sisterYardCode));
    confirmRoute();
  };

  //Handle selection from delivery yard lookup screen
  const handleDeliveryYardLookupSelection = (deliveryYard) => {
    if (pickupYardIDForYardToYard !== "" && deliveryYard.yardPK !== "") {
      yardToYardCombinationExist(pickupYardIDForYardToYard, deliveryYard.yardPK);
    }
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
    dispatch(setDeliveryYardIDForYardToYard(deliveryYard.yardPK));
    dispatch(setDeliveryYardNameForYardToYard(deliveryYard.description));
    dispatch(setDeliveryYardCodeForYardToYard(deliveryYard.sisterYardCode));
    setDeliveryYardLookupShow(false);
  };

  //Enable pickup yard lookup
  const handleDeliveryYardLookupModalShow = () => {
    setDeliveryYardLookupShow(true);
    confirmRoute();
  };

  //Disable pickup yard lookup
  const handleDeliveryYardLookupModalHide = () => {
    setDeliveryYardLookupShow(false);
  };

  /**** Service to check the Yard to Yard combination  ****/
  const yardToYardCombinationExist = (pickupYard, deliveryYard) => {
    if (pickupYard != null && deliveryYard != null) {
      setLoading(true);
      YardCheckinService.yardToYardCombinationCheckForShuttle(
        pickupYard,
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
  // UseEffect for setting selected Driver Name in local state
  useEffect(() => {
    if (selectedDriverData) {
      const fullName = `${selectedDriverData.firstName ? selectedDriverData.firstName?.trim() : ""} ${
        selectedDriverData.lastName ? selectedDriverData.lastName?.trim() : ""
      }`;
      setSelectedDriverName(fullName?.trim());
    }
  }, [selectedDriverData]);

  //UseEffect for setting UnitNumber and Special Code
  useEffect(() => {
    if (unitNumberSelected || specialCodeOfSelectedUnit) {
      setSelectedUnitNumber(unitNumberSelected);
      setSelectedUnitSpecialCode(specialCodeOfSelectedUnit);
    }
  }, [unitNumberSelected, specialCodeOfSelectedUnit]);

  //UseEffect for service call to check Yard-Yard combination
  useEffect(() => {
    if (pickupYardIDForYardToYard !== "" && deliveryYardIDForYardToYard !== "") {
      yardToYardCombinationExist(pickupYardIDForYardToYard, deliveryYardIDForYardToYard);
    }
  }, []);

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setShuttleAmountForYardToYard(shuttleAmount));
    dispatch(setShuttleMilesForYardToYard(miles));
    dispatch(setShuttleDateForYardToYard(shuttleDate));
    dispatch(setIsYardToYardCombinationExist(warningMessage));
    dispatch(setRowForYardToYard(row));
    dispatch(setPositionForYardToYard(position));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warningMessage, row, shuttleAmount, miles, shuttleDate, position]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [pickupYardIDForYardToYard]);

  useEffect(() => {
    setWarningMessage("");
    setShuttleAmount("");
    setMiles("");
  }, [deliveryYardIDForYardToYard]);

  useEffect(() => {
    if (unitNumberSelected === "") {
      setShuttleDate("");
      setSelectedUnitSpecialCode("");
      dispatch(setPickupYardNameForYardToYard(""));
      dispatch(setDeliveryYardNameForYardToYard(""));
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
    if (savedSuccessForYardToYard) {
      navigate("/yard-checkin-unit-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedSuccessForYardToYard]);

  useEffect(() => {
    if (warningMessage === "" || !deliveryYardIDForYardToYard || !pickupYardIDForYardToYard) {
      setModalPopUp(false);
    } else {
      setModalPopUp(true);
    }
  }, [warningMessage, deliveryYardIDForYardToYard, pickupYardIDForYardToYard]);

  useEffect(() => {
    if (selectedId) {
      dispatch(setPickupYardNameForYardToYard(selectedObject?.PickupLocation));
      dispatch(setPickupYardIDForYardToYard(selectedObject?.PickupYardFK));
      dispatch(setDeliveryYardNameForYardToYard(selectedObject?.DeliveryLocation));
      dispatch(setDeliveryYardIDForYardToYard(selectedObject?.DeliveryYardFK));
    }
  }, [selectedId]);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 mt-3 mb-5" xs={7}>
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

                <Col s={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    value={selectedUnitNumber}
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
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    value={selectedUnitSpecialCode}
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
                    searchString={pickupYardNameForYardToYard}
                    renderItemId={(pickupYards) => pickupYards.yardPK}
                    renderItemField={(pickupYards) => pickupYards.description}
                    handleSearchString={(string) => dispatch(setPickupYardNameForYardToYard(string))}
                    fetchDataBySearchString={fetchAllYards}
                    onSelect={handlePickupYardSelectionFromDropdown}
                    loading={yard1Loading}
                    selectedId={pickupYardIDForYardToYard}
                    clearInputCallback={() => {
                      dispatch(setPickupYardIDForYardToYard(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    className={`${
                      pickupYardIDForYardToYard === "" ||
                      pickupYardNameForYardToYard === "" ||
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
                      className={`btn btn-sm ${isYardToYardRouteConfirmed ? "btn-success" : "btn-danger"}`}
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

              {/***  Delivery Yard ***/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Delivery Yard</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={deliveryYards}
                    searchString={deliveryYardNameForYardToYard}
                    renderItemId={(deliveryYards) => deliveryYards.yardPK}
                    renderItemField={(deliveryYards) => deliveryYards.description}
                    handleSearchString={(string) => dispatch(setDeliveryYardNameForYardToYard(string))}
                    fetchDataBySearchString={fetchAllYards}
                    loading={yard1Loading}
                    onSelect={handleDeliveryYardSelectionFromDropdown}
                    selectedId={deliveryYardIDForYardToYard}
                    clearInputCallback={() => {
                      dispatch(setDeliveryYardIDForYardToYard(""));
                      setWarningMessage("");
                      setShuttleAmount("");
                      setMiles("");
                    }}
                    className={`${
                      deliveryYardIDForYardToYard === "" ||
                      deliveryYardNameForYardToYard === "" ||
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

              {/***  Row / Position ***/}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Row / Position
                  </Form.Label>
                </Col>

                {/* Row */}
                <Col xs={1} md={1} sm={1} className="p-0 w-68px">
                  <input
                    className={`customFormControl ${row === "" ? "borderRed" : "borderGreen"}`}
                    name="row"
                    type="text"
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
                <Col xs={1} md={1} sm={1} className="p-0 w-68px ms-3">
                  <input
                    className="customFormControl"
                    name="position"
                    type="text"
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => {
                      const value = e.target.value;
                      // Regex pattern for 4-bit characters (letters and numbers)
                      const regex = /^[a-zA-Z0-9]{0,4}$/;
                      if (regex.test(value)) {
                        setPosition(value);
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
            {/* Pickup yard lookup screen */}
            <YardLookup
              show={pickupYardLookupShow}
              onHide={handlePickupYardLookupModalHide}
              renderItemId={(pickupYards) => pickupYards.yardPK}
              handleLookupSelection={handlePickupYardLookupSelection}
              shuttle
              selectedCompanyName={selectedUnitCompanyName}
            />
            {/* Delivery yard lookup screen */}
            <YardLookup
              show={deliveryYardLookupShow}
              onHide={handleDeliveryYardLookupModalHide}
              renderItemId={(deliveryYards) => deliveryYards.yardPK}
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

export default YardToYardContent;
