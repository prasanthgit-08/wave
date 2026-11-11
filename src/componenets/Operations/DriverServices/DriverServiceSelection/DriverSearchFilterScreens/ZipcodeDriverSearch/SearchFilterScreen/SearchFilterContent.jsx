import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import AutoCompleteDropdown from "../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../common/LookupButton";
import { set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  resetListing,
  resetSearch,
  setBusQualified,
  setCanadianOnly,
  setDealer,
  setDealerFK,
  setDispatchUserId,
  setDispatcher,
  setDricerCDL,
  setDriveawayScreen,
  setEldOnly,
  setFlatbedScreen,
  setHasBeenReloaded,
  setHasPintalHook,
  setHitchTowBar,
  setInitialScreen,
  setIsZipcodeValid,
  setMiles,
  setOutput,
  setSearchBy,
  setSelectedDivison,
  setTenorMore38,
  setTowawayScreen,
  setTransportation,
  setTruckCodeId,
  setTruckType,
  setTwicOnl,
  setTwicOnly,
  setZipcode,
  settractorQualified,
} from "../../../../../../../redux/DealerDriverSearchSlice";
import DriverSearchService from "../../../../../../../services/DriverSearchService";
import DealerLookup from "../../../../../../LookupScreens/Dealer/DealerLookup";
import { zipVal } from "../../../../../../../utils/validation/ZipCodeValidation";
import { useNavigate } from "react-router-dom";
import CustomRadioGroup from "../../../../../../common/CustomRadioGroup";

const SearchFilterContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDealerLookup, setShowDealerLookup] = useState(false);

  const [truckCodeList, setTruckCodeList] = useState([]);
  const [loadng, setLoadng] = useState(false);

  const selectedDivison = useSelector((state) => state.dealerDriverSearchSlice.selectedDivison);
  const initialScreen = useSelector((state) => state.dealerDriverSearchSlice.initialScreen);
  const dispatcher = useSelector((state) => state.dealerDriverSearchSlice.dispatcher);
  const driverCDL = useSelector((state) => state.dealerDriverSearchSlice.driverCDL);
  const flatbedScreen = useSelector((state) => state.dealerDriverSearchSlice.flatbedScreen);
  const towawayScreen = useSelector((state) => state.dealerDriverSearchSlice.towawayScreen);
  const driveawayScreen = useSelector((state) => state.dealerDriverSearchSlice.driveawayScreen);
  const dispatcherId = useSelector((state) => state.dealerDriverSearchSlice.dispatcherId);
  const miles = useSelector((state) => state.dealerDriverSearchSlice.miles);
  const zipcode = useSelector((state) => state.dealerDriverSearchSlice.zipcode);
  const twicOnly = useSelector((state) => state.dealerDriverSearchSlice.twicOnly);
  const truckType = useSelector((state) => state.dealerDriverSearchSlice.truckType);
  const canadianOnly = useSelector((state) => state.dealerDriverSearchSlice.canadianOnly);
  const truckCodeId = useSelector((state) => state.dealerDriverSearchSlice.truckCodeId);
  const eldOnly = useSelector((state) => state.dealerDriverSearchSlice.eldOnly);
  const hasPintalHook = useSelector((state) => state.dealerDriverSearchSlice.hasPintalHook);
  const transportation = useSelector((state) => state.dealerDriverSearchSlice.transportation);
  const busQualified = useSelector((state) => state.dealerDriverSearchSlice.busQualified);
  const tractorQualified = useSelector((state) => state.dealerDriverSearchSlice.tractorQualified);
  const tenorMore38 = useSelector((state) => state.dealerDriverSearchSlice.tenorMore38);
  const hitchTowBar = useSelector((state) => state.dealerDriverSearchSlice.hitchTowBar);
  const output = useSelector((state) => state.dealerDriverSearchSlice.output);
  const isZipcodesValid = useSelector((state) => state.dealerDriverSearchSlice.isZipcodesValid);
  const hasBeenReloaded = useSelector((state) => state.dealerDriverSearchSlice.hasBeenReloaded);
  const searchBy = useSelector((state) => state.dealerDriverSearchSlice.searchBy);

  const isValidZipcode = () => {
    setLoadng(true);
    DriverSearchService.isValidZipcode(zipcode)
      .then(({ data }) => {
        dispatch(setIsZipcodeValid(data));
      })
      .catch(() => {})
      .finally(() => {
        setLoadng(false);
      });
  };

  const handleDealerLookupSelection = (dealer) => {
    dispatch(setDealerFK(dealer.dealerPK));
    dispatch(setDealer(dealer.name?.trim()));
    setShowDealerLookup(false);
  };

  useEffect(() => {
    if (window.location.pathname === `/zipcode-driver-search/initial`) {
      dispatch(setInitialScreen(true));
    } else {
      dispatch(setInitialScreen(false));
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (initialScreen) {
      dispatch(setHasBeenReloaded(false));
      dispatch(setDriveawayScreen(false));
      dispatch(setTowawayScreen(false));
      dispatch(setFlatbedScreen(false));
      dispatch(resetListing());
      dispatch(resetSearch());
    }
  }, [initialScreen]);

  useEffect(() => {
    if (!initialScreen && hasBeenReloaded) {
      navigate("/zipcode-driver-search/initial");
    }
  }, []);

  useEffect(() => {
    if (selectedDivison === "driveaway") {
      dispatch(setDriveawayScreen(true));
      dispatch(setTowawayScreen(false));
      dispatch(setFlatbedScreen(false));
    } else if (selectedDivison === "towaway") {
      dispatch(setDriveawayScreen(false));
      dispatch(setTowawayScreen(true));
      dispatch(setFlatbedScreen(false));
    } else if (selectedDivison === "flatbed") {
      dispatch(setDriveawayScreen(false));
      dispatch(setTowawayScreen(false));
      dispatch(setFlatbedScreen(true));
    }
  }, [selectedDivison, initialScreen]);

  useEffect(() => {
    DriverSearchService.getDispachers()
      .then((response) => {
        dispatch(setDispatcher(response.data));
      })
      .catch(() => {});

    DriverSearchService.getTruckCode()
      .then((response) => {
        setTruckCodeList(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <Form>
      <div className="p-2">
        <div className="shadow-sm rounded border halfScreenFormContentHeight">
          <Col style={{ height: "500px" }}>
            {/* Division Selection */}
            <Form.Group className="mt-5 align-items-center row  m-l-10 m-r-0 ">
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Division
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <RadioGroup
                  name="Division Status"
                  className="d-flex"
                  selectedValue={selectedDivison}
                  onChange={(value) => {
                    dispatch(setSelectedDivison(value));
                  }}
                >
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="driveaway" disabled={!initialScreen} />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Driveaway
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="towaway" disabled={!initialScreen} />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Towaway
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="flatbed" disabled={!initialScreen} />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Flatbed
                      </label>
                    </div>
                  )}
                </RadioGroup>
              </Col>
            </Form.Group>

            {/* Driver CDL */}
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 " hidden={initialScreen}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Driver CDL
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <RadioGroup
                  name="Driver CDL"
                  className="d-flex"
                  selectedValue={driverCDL}
                  onChange={(value) => {
                    dispatch(setDricerCDL(value));
                  }}
                >
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="cdl" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        CDL
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="nonCDL" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        non CDL
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="both" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Both
                      </label>
                    </div>
                  )}
                </RadioGroup>
              </Col>
            </Form.Group>

            {/* Dispatcher */}
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 " hidden={initialScreen}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Dispatcher
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <Form.Select
                  name="Dispatcher"
                  id="Dispatcher"
                  className="customFormControl"
                  value={dispatcherId}
                  onChange={(e) => {
                    dispatch(setDispatchUserId(e.target.value));
                  }}
                >
                  <option value="" key="">
                    --Select--
                  </option>
                  {dispatcher?.map((item) => (
                    <option key={item.userPK} value={item.userPK}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Central Zipcode */}
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 " hidden={initialScreen}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Center Zipcode
                </Form.Label>
              </Col>

              <Col xs={1} md={1} sm={1} className="p-0 d-flex" style={{ width: "80px" }}>
                <input
                  type="text"
                  className={`customFormControl ${isZipcodesValid ? "borderGreen" : "borderRed"}`}
                  name="zipcode"
                  value={zipcode.toUpperCase()}
                  autoComplete="off"
                  onChange={(e) => {
                    if (
                      (e.target.value.charAt(0).match(/[a-zA-Z]/) && e.target.value?.length <= 7) ||
                      !e.target.value.charAt(0).match(/[a-zA-Z]/)
                    ) {
                      dispatch(setZipcode(zipVal(e.target.value)));
                      if (e.target.value !== "") {
                        dispatch(setIsZipcodeValid(true));
                      } else {
                        dispatch(setIsZipcodeValid(false));
                      }
                    }
                  }}
                  onBlur={() => {
                    isValidZipcode();
                  }}
                  maxLength={10}
                />
              </Col>
            </Form.Group>

            {/*  Radius Miles */}
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 " hidden={initialScreen}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Radius Miles
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex" style={{ width: "50px" }}>
                <input
                  type="text"
                  className={`customFormControl ${miles <= 0 ? "borderRed" : "borderGreen"}`}
                  name="miles"
                  value={miles}
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    /^[0-9]*$/.test(e.target.value) && dispatch(setMiles(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            {/* TWIC Only */}
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 " hidden={initialScreen}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  TWIC Only
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  name="twicOnly"
                  checked={twicOnly}
                  onChange={(e) => {
                    dispatch(setTwicOnly(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>

            {/* Canadian Only */}
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 " hidden={initialScreen}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Canadian Only
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  name="canadianOnly"
                  checked={canadianOnly}
                  onChange={(e) => {
                    dispatch(setCanadianOnly(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>

            {/* Truck Code */}
            <Form.Group
              className="mt-3 align-items-center row  m-l-10 m-r-0 "
              hidden={initialScreen || driveawayScreen || flatbedScreen}
            >
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Truck Code
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <Form.Select
                  name="truckCode"
                  id="truckCode"
                  className="customFormControl"
                  value={truckCodeId}
                  onChange={(e) => {
                    dispatch(setTruckCodeId(e.target.value));
                  }}
                >
                  <option value="">--Select--</option>
                  {truckCodeList?.map((item) => (
                    <option key={item.truckCodeId} value={item.truckCodeId}>
                      {item.truckCode}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Eld Only */}
            <Form.Group
              className="mt-3 align-items-center row  m-l-10 m-r-0 "
              hidden={initialScreen || driveawayScreen || flatbedScreen}
            >
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Eld Only
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  name="eldOnly"
                  checked={eldOnly}
                  onChange={(e) => {
                    dispatch(setEldOnly(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>

            {/* Has Pintal Hook */}
            <Form.Group
              className="mt-3 align-items-center row  m-l-10 m-r-0 "
              hidden={initialScreen || driveawayScreen || flatbedScreen}
            >
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Has Pintal Hook
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  name="hasPintalHook"
                  checked={hasPintalHook}
                  onChange={(e) => {
                    dispatch(setHasPintalHook(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>

            {/* Truck Type */}
            <Form.Group
              className="mt-3 align-items-center row  m-l-10 m-r-0 "
              hidden={initialScreen || driveawayScreen || towawayScreen}
            >
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Truck Type
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <RadioGroup
                  name="Truck Type"
                  className="d-flex"
                  selectedValue={truckType}
                  onChange={(value) => {
                    dispatch(setTruckType(value));
                  }}
                >
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="haul&Tow" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Haul&Tow
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="lowboy" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Lowboy
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="both" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Both
                      </label>
                    </div>
                  )}
                </RadioGroup>
              </Col>
            </Form.Group>

            {/* Transportation */}
            <Form.Group
              className="mt-3 align-items-center row  m-l-10 m-r-0 "
              hidden={initialScreen || towawayScreen || flatbedScreen}
            >
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Transportation
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <RadioGroup
                  name="Transportation"
                  className="d-flex"
                  selectedValue={transportation}
                  onChange={(value) => {
                    dispatch(setTransportation(value));
                  }}
                >
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="none" />
                      <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                        None
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="bus" />
                      <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                        Bus
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="pickup" />
                      <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                        Pickup
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="rentalcar" />
                      <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                        Rental
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="towcar" />
                      <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                        Tow Car
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="train" />
                      <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                        Train
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="airline" />
                      <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                        Airline
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="air&tow" />
                      <label className="f-w-600 m-l-5" style={{ width: "100px" }}>
                        Airline or Tow Car
                      </label>
                    </div>
                  )}
                </RadioGroup>
              </Col>
            </Form.Group>

            {/* Bus Qualified */}
            <Form.Group
              className="mt-3 align-items-center row  m-l-10 m-r-0 "
              hidden={initialScreen || towawayScreen || flatbedScreen}
            >
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Bus Qualified
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  name="busQualified"
                  checked={busQualified}
                  onChange={(e) => {
                    dispatch(setBusQualified(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>

            {/* Tractor Qualified */}
            <Form.Group
              className="mt-3 align-items-center row  m-l-10 m-r-0 "
              hidden={initialScreen || towawayScreen || flatbedScreen}
            >
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Tractor Qualified
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  name="tractorQualified"
                  checked={tractorQualified}
                  onChange={(e) => {
                    dispatch(settractorQualified(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>

            {/* 10 or More 38'+ Units */}
            <Form.Group
              className="mt-3 align-items-center row  m-l-10 m-r-0 "
              hidden={initialScreen || towawayScreen || flatbedScreen}
            >
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  10 or More 38'+ Units
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  name="hasPintalHook"
                  checked={tenorMore38}
                  onChange={(e) => {
                    dispatch(setTenorMore38(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>

            {/* Hitch Tow-Bar */}
            <Form.Group
              className="mt-3 align-items-center row  m-l-10 m-r-0 "
              hidden={initialScreen || towawayScreen || flatbedScreen}
            >
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Hitch Tow-Bar
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  name="hitchTowBar"
                  checked={hitchTowBar}
                  onChange={(e) => {
                    dispatch(setHitchTowBar(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 " hidden={initialScreen}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Select State By
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                <CustomRadioGroup
                  options={[
                    { value: "Both", disabled: false },
                    { value: "Delivery", disabled: false },
                    { value: "Driver", disabled: false },
                  ]}
                  selectedOption={searchBy}
                  onChange={(v) => dispatch(setSearchBy(v))}
                  horizontal={true}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col>
            {/* Output */}
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 " hidden={initialScreen}>
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Output
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <RadioGroup
                  name="Output"
                  className="d-flex"
                  selectedValue={output}
                  onChange={(value) => {
                    dispatch(setOutput(value));
                  }}
                >
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="Display" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Display
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="Print" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Print
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="Email PDF" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Email PDF
                      </label>
                    </div>
                  )}
                  {true && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="Email Excel" />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Email Excel
                      </label>
                    </div>
                  )}
                </RadioGroup>
              </Col>
            </Form.Group>
          </Col>
        </div>
        <DealerLookup
          show={showDealerLookup}
          onHide={() => {
            setShowDealerLookup(false);
          }}
          renderItemId={(dealer) => dealer.dealerPK}
          handleLookupSelection={handleDealerLookupSelection}
          MaintenanceProgram
        />
      </div>
    </Form>
  );
};

export default SearchFilterContent;
