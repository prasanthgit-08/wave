import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  setTypeOfShuttle,
  setAdditionalReason,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setPickupCityIDForPlantToYard,
  setPickupCityNameForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setDeliveryYardNameForPlantToYard,
  setDeliveryYardCodeForPlantToYard,
  setPickupYardIDForYardToPlant,
  setPickupYardNameForYardToPlant,
  setPickupYardCodeForYardToPlant,
  setDeliveryCityIDForYardToPlant,
  setDeliveryCityNameForYardToPlant,
  setPickupPlantIDForPlantToPlant,
  setPickupPlantNameForPlantToPlant,
  setPickupPlantCodeForPlantToPlant,
  setDeliveryPlantIDForPlantToPlant,
  setDeliveryPlantNameForPlantToPlant,
  setDeliveryPlantCodeForPlantToPlant,
  setDispatchShuttle,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";

function AdditionalShuttleContent() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local State Declaration
  const [selectedDriverName, setSelectedDriverName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [selectedTypeOfShuttle, setSelectedTypeOfShuttle] = useState("");
  const [dispatchShuttleData, setDispatchShuttleData] = useState(null);
  const [isDispatchShuttle, setIsDispatchShuttle] = useState(false);
  const [shuttleCityName, setShuttleCityName] = useState("");
  const [reason, setReason] = useState("");

  //Fetch value from redux
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const unitNumberPK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);

  // function to handle radio button selection
  const handleOptionChange = (e) => {
    setSelectedTypeOfShuttle(e.target.value);
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

  useEffect(() => {
    if (unitNumberSelected) {
      setUnitNumber(unitNumberSelected);
    }
  }, [unitNumberSelected]);

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setTypeOfShuttle(selectedTypeOfShuttle));
    dispatch(setAdditionalReason(reason));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypeOfShuttle, reason]);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriverData === "") {
      navigate("/yard-checkin-driver-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverData]);

  useEffect(() => {
    if (unitNumberSelected === "") {
      dispatch(setSelectedUnitCompanyName(""));
      dispatch(setSelectedUnitCompanyFK(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberSelected]);

  /*** Dispatch Shuttle - Additional Shuttle Screen ***/

  const getDispatchShuttleForAdditonalShuttle = () => {
    if (unitNumberPK !== "") {
      YardCheckinService.getDispatchShuttleForAdditonalShuttle(unitNumberPK, selectedUnitCompanyName)
        .then((response) => {
          const data = response;
          if (data.data != null) {
            setDispatchShuttleData(data.data ?? null);
            setIsDispatchShuttle(true);
          }
        })
        .catch((error) => {});
    }
  };

  /*** call functions on page load ***/
  useEffect(() => {
    getDispatchShuttleForAdditonalShuttle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberPK]);

  useEffect(() => {
    if (dispatchShuttleData != null) {
      if (dispatchShuttleData.pickupCustomerPlantFK != null && dispatchShuttleData.deliveryYardFK != null) {
        setSelectedTypeOfShuttle("plantToYard");

        setShuttleCityName(dispatchShuttleData.pickupCustomerPlant?.city ?? "");
        dispatch(setPickupCityNameForPlantToYard(dispatchShuttleData.pickupCustomerPlant?.city ?? ""));
        dispatch(setDeliveryYardIDForPlantToYard(dispatchShuttleData.deliveryYardFK ?? ""));
        dispatch(setDeliveryYardNameForPlantToYard(dispatchShuttleData.deliveryYard?.city ?? ""));
        dispatch(setDeliveryYardCodeForPlantToYard(dispatchShuttleData.deliveryYard?.sisterYardCode ?? ""));
        dispatch(setDispatchShuttle(true));
      }

      if (dispatchShuttleData.pickupYardFK != null && dispatchShuttleData.deliveryCustomerPlantFK != null) {
        setSelectedTypeOfShuttle("yardToPlant");
        dispatch(setPickupYardIDForYardToPlant(dispatchShuttleData.pickupYardFK ?? ""));
        dispatch(setPickupYardNameForYardToPlant(dispatchShuttleData.pickupYard?.city ?? ""));
        dispatch(setPickupYardCodeForYardToPlant(dispatchShuttleData.pickupYard?.sisterYardCode ?? ""));
        setShuttleCityName(dispatchShuttleData.deliveryCustomerPlant?.city ?? "");
        dispatch(setDeliveryCityNameForYardToPlant(dispatchShuttleData.deliveryCustomerPlant?.city ?? ""));
        dispatch(setDispatchShuttle(true));
      }
      if (
        dispatchShuttleData.pickupCustomerPlantFK != null &&
        dispatchShuttleData.deliveryCustomerPlantFK != null
      ) {
        setSelectedTypeOfShuttle("plantToPlant");
        dispatch(setPickupPlantIDForPlantToPlant(dispatchShuttleData.pickupCustomerPlantFK ?? ""));
        dispatch(setPickupPlantNameForPlantToPlant(dispatchShuttleData.pickupCustomerPlant?.name ?? ""));
        dispatch(
          setPickupPlantCodeForPlantToPlant(dispatchShuttleData.pickupCustomerPlant?.sisterPlantCode ?? "")
        );
        dispatch(setDeliveryPlantIDForPlantToPlant(dispatchShuttleData.deliveryCustomerPlantFK ?? ""));
        dispatch(setDeliveryPlantNameForPlantToPlant(dispatchShuttleData.deliveryCustomerPlant?.name ?? ""));
        dispatch(
          setDeliveryPlantCodeForPlantToPlant(
            dispatchShuttleData.deliveryCustomerPlant?.sisterPlantCode ?? ""
          )
        );
        dispatch(setDispatchShuttle(true));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchShuttleData]);

  const getShuttleCityPK = () => {
    YardCheckinService.getShuttleCityPK(shuttleCityName, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data;
        dispatch(setPickupCityIDForPlantToYard(data.shuttleCityPK ?? ""));
        dispatch(setDeliveryCityIDForYardToPlant(data.shuttleCityPK ?? ""));
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (isDispatchShuttle === true && dispatchShuttleData !== null && dispatchShuttleData !== "") {
      getShuttleCityPK();
    }
  }, [isDispatchShuttle]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            {/* Driver */}
            <Col className="p-15 mt-2 mb-5" xs={7}>
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

              {/* Company */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Company
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    disabled
                    value={selectedUnitCompanyName}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
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
                    value={unitNumber}
                    disabled
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              {/* Radio Button  - Type Of Shuttle*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label className={` col-form-label me-4`}></Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className={`p-0 `}>
                  {/* PickUp From Plant */}
                  <Col className="d-flex align-items-center mb-2">
                    <input
                      className={`form-check-input ${selectedTypeOfShuttle === "" ? "borderRed" : ""}`}
                      type="radio"
                      name="shuttleType"
                      value="plantToYard"
                      checked={selectedTypeOfShuttle === "plantToYard"}
                      onChange={handleOptionChange}
                      disabled={
                        dispatchShuttleData != "" &&
                        selectedTypeOfShuttle !== "" &&
                        selectedTypeOfShuttle !== "plantToYard"
                      }
                    />
                    <label className="ms-2" htmlFor="">
                      Pickup From Plant
                    </label>
                  </Col>
                  {/* Return To Plant */}
                  <Col className="d-flex align-items-center mb-2">
                    <input
                      className={`form-check-input ${selectedTypeOfShuttle === "" ? "borderRed" : ""}`}
                      type="radio"
                      name="shuttleType"
                      value="yardToPlant"
                      checked={selectedTypeOfShuttle === "yardToPlant"}
                      onChange={handleOptionChange}
                      disabled={
                        dispatchShuttleData != "" &&
                        selectedTypeOfShuttle !== "" &&
                        selectedTypeOfShuttle !== "yardToPlant"
                      }
                    />
                    <label className="ms-2" htmlFor="">
                      Return To Plant
                    </label>
                  </Col>
                  {/* Yard To Yard Transfer */}
                  <Col className="d-flex align-items-center mb-2">
                    <input
                      className={`form-check-input ${selectedTypeOfShuttle === "" ? "borderRed" : ""}`}
                      type="radio"
                      name="shuttleType"
                      value="yardToYard"
                      checked={selectedTypeOfShuttle === "yardToYard"}
                      onChange={handleOptionChange}
                      disabled={
                        dispatchShuttleData != "" &&
                        selectedTypeOfShuttle !== "" &&
                        selectedTypeOfShuttle !== "yardToYard"
                      }
                    />
                    <label className="ms-2" htmlFor="">
                      Yard To Yard Transfer
                    </label>
                  </Col>
                  {/* Plant To Plant Transfer */}
                  <Col className="d-flex align-items-center mb-2">
                    <input
                      className={`form-check-input ${selectedTypeOfShuttle === "" ? "borderRed" : ""}`}
                      type="radio"
                      name="shuttleType"
                      value="plantToPlant"
                      checked={selectedTypeOfShuttle === "plantToPlant"}
                      onChange={handleOptionChange}
                      disabled={
                        dispatchShuttleData != "" &&
                        selectedTypeOfShuttle !== "" &&
                        selectedTypeOfShuttle !== "plantToPlant"
                      }
                    />
                    <label className="ms-2" htmlFor="">
                      Plant To Plant Transfer
                    </label>{" "}
                  </Col>
                </Col>
              </Form.Group>
              {/* Additional Reason */}
              <Form.Group className="form-group mt-3  align-items-start row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <label className="col-form-label me-4">Additional Reason</label>
                </Col>

                <Col xs={9} md={9} className="p-0">
                  <textarea
                    rows={7}
                    cols={20}
                    type="search"
                    name="additionalReason"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalShuttleContent;
