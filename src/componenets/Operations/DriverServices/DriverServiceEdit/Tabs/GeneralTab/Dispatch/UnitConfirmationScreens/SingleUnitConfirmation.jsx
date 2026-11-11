import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import UnitConfirmationFooter from "./UnitConfirmationFooter";
import DispatchesService from "../../../../../../../../services/DispatchesService";
import UnitDates from "./UnitDates";
import { useSelector, useDispatch } from "react-redux";
import {
  setDispatchViewObject,
  setUnitDatesFlag,
  setTotalFee,
  setSelectedTruckPK,
  setGvwrEligibleTrucks,
  setPickupDate,
  setDeliveryDate,
  setRatePerMile,
  setRateObj,
  setSelectedTrailerPK,
  setEligibleTrailers,
  setTrailerDisable,
  setRequireFlatbedFromBackEnd,
  setRequiredFlatBed,
  setDisableDispatch,
  setFlatRated,
  setReloadDispatchPKSWithOutbound,
  setHasCodriverOrBobtaildriverPassport,
} from "../../../../../../../../redux/DispatchesSlice";
import DispatchHeader from "../DriverDispatchHeader";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../../../../../../componenets/common/ModalComponent";
import LoadingIcon from "../../../../../../../../componenets/common/LoadingIcon";

function DriveawayUnitConfirmation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [driverPulloutFee, setDriverPulloutFee] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [selectedTruck, setSelectedTruck] = useState("");

  const unitDates = useSelector((state) => state.dispatchesReducer.unitDatesFlag);
  const dispatchPK = useSelector((state) => state.dispatchesReducer.selectedDispatchPK);
  const dispatchViewData = useSelector((state) => state.dispatchesReducer.dispatchViewObject);
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const divisionStatus = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const region = useSelector((state) => state.dispatchesReducer.regionStatus);
  const gvwrEligibleTrucks = useSelector((state) => state.dispatchesReducer.gvwrEligibleTrucks);
  const eligibleTrailerPKS = useSelector((state) => state.dispatchesReducer.eligibleTrailerPKS);
  const division = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const selectedTruckPK = useSelector((state) => state.dispatchesReducer.selectedTruckPK);
  const eligibleTrailers = useSelector((state) => state.dispatchesReducer.eligibleTrailers);
  const selectedTrailerPK = useSelector((state) => state.dispatchesReducer.selectedTrailerPK);
  const complianceEligibleTrucks = useSelector((state) => state.dispatchesReducer.eligibleTruckPKS);
  const isFlatRatedFrmRedux = useSelector((state) => state.dispatchesReducer.flatRated);
  const rateFromRedux = useSelector((state) => state.dispatchesReducer.ratePerMile);
  const requireFlatbed = useSelector((state) => state.dispatchesReducer.isFlatBedRequired);
  const requireFlatbedFromBackEnd = useSelector((state) => state.dispatchesReducer.requireFlatbedFromBackEnd);

  const rateObjFrmRedux = useSelector((state) => state.dispatchesReducer.rateObj);
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const disableTrailer = useSelector((state) => state.dispatchesReducer.isTrailerDisable);

  // Dates belong to the dispatch, so clear them only when the dispatch changes, not when the truck changes
  const datesClearedForRef = useRef(null);
  useEffect(() => {
    if (dispatchPK) {
      const dispatchKey = `${dispatchPK}-${divisionStatus}`;
      if (datesClearedForRef.current !== dispatchKey) {
        datesClearedForRef.current = dispatchKey;
        dispatch(setPickupDate(null));
        dispatch(setDeliveryDate(null));
      }
      setLoadingIcon(true);
      let halftonRateAdded = false;
      DispatchesService.fetchByID(
        driverData?.driverPK,
        dispatchPK,
        division,
        eligibleTrailerPKS,
        complianceEligibleTrucks
      ).then(({ data }) => {
        const obj = JSON.parse(data[0]?.dispatchesRateData);

        dispatch(setFlatRated(obj?.Flatrated));
        dispatch(setRateObj(obj));
        dispatch(setReloadDispatchPKSWithOutbound(data[0]?.reloadDispatchPKsWithOutbound));
        dispatch(setHasCodriverOrBobtaildriverPassport(data[0]?.hasCodriverOrBobtailDriverPassport));
        if (obj?.HalftonRate) {
          halftonRateAdded = true;
        }
        DispatchesService.getDispatchesViewData(
          dispatchPK,
          driverData?.payPickupFee,
          driverData,
          division,
          region,
          selectedTruck || complianceEligibleTrucks[0] || "",
          complianceEligibleTrucks,
          obj,
          rateFromRedux,
          halftonRateAdded,
          requireFlatbed,
          eligibleTrailerPKS
        )
          .then((response) => {
            const data = response.data;
            setLoadingIcon(false);
            let dispatchViewObject = null;
            if (data !== null) {
              dispatchViewObject = data;
              setDriverPulloutFee(data.totalPulloutFee);
              let totalCharges =
                Number(data.amount || 0) +
                Number(data.additionalFee || 0) -
                (Number(data.totalPulloutFee || 0) + Number(data.driverQual || 0));
              setTotalFee(totalCharges);
              //Set total value, flat rated flag and rate. Whether a unit is Flatrated or not is found out in the Unit browse page.
              if (isFlatRatedFrmRedux === false && dispatchViewObject?.adjustedRate !== 0) {
                dispatch(setRatePerMile(dispatchViewObject.adjustedRate));
                dispatch(
                  setRateObj({
                    ...rateObjFrmRedux,
                    halfTonAdjustmentRate: dispatchViewObject.halftonAdjustmentRate,
                  })
                );
              }
              dispatch(
                setDispatchViewObject({
                  ...dispatchViewObject,
                  totalCharges,
                  flatRated: isFlatRatedFrmRedux,
                  rate: rateFromRedux,
                })
              );
              //If requirefltbed is unchecked, both units required and not required flatbeds are listed.
              //If we select a unit having flatbed required, flatbed conditions should work.
              if (
                dispatchViewObject.flatbedRequired !== null &&
                dispatchViewObject.flatbedRequired !== undefined &&
                dispatchViewObject.flatbedRequired
              ) {
                dispatch(setRequireFlatbedFromBackEnd(true));
                dispatch(setTrailerDisable(dispatchViewObject.haulAndTowTruck));
              } else {
                dispatch(setRequireFlatbedFromBackEnd(false));
                dispatch(setTrailerDisable(true));
              }
              if (data?.eligibleTrucks) {
                dispatch(setGvwrEligibleTrucks(Object.entries(data.eligibleTrucks)));
                setSelectedTruck(data.defaultTruckPK);
                dispatch(setSelectedTruckPK(data.defaultTruckPK));
              } else {
                dispatch(setGvwrEligibleTrucks(null));
              }
              if (data?.eligibleTrailers) {
                dispatch(setEligibleTrailers(Object.entries(data.eligibleTrailers)));
                const defaultTrailer = dispatchViewObject.defaultTrailerPK;
                //if hauland tow truck is selected, trailer should be disabled
                if (dispatchViewObject.haulAndTowTruck) dispatch(setSelectedTrailerPK(null));
                else if (defaultTrailer) {
                  dispatch(setSelectedTrailerPK(defaultTrailer));
                } else if (defaultTrailer === null || defaultTrailer === undefined) {
                  // Get the first key from the object
                  const firstKey = Object.keys(data.eligibleTrailers)[0];
                  dispatch(setSelectedTrailerPK(firstKey));
                }
              } else {
                dispatch(setEligibleTrailers(null));
              }
            }
          })
          .catch((err) => {
            console.log(err);
            setLoadFailed(true);
            setLoadingIcon(false);
          });
      });
    }
  }, [dispatchPK, divisionStatus, selectedTruck]);

  // Event handler for Truck dropdown change
  const handleDropdownChange = (event) => {
    setSelectedTruck(event.target.value);
    dispatch(setSelectedTruckPK(event.target.value));
  };
  // Event handler for Truck dropdown change
  const handleTrailerDropdownChange = (event) => {
    dispatch(setSelectedTrailerPK(event.target.value));
  };

  const handleWarning = () => {
    setLoadFailed(false);
    if (division === "reload") {
      navigate("/reload-unit-browse");
    } else {
      navigate("/outbound-unit-browse");
    }
  };

  return (
    <div className="customContainer ">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DispatchHeader />
        <div className="shadow-sm rounded border threeFourthScreenFormContentHeight p-2">
          <Row>
            <Col xs={6}>
              <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Pickup
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.pickupName}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.pickupAddress1}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.pickupAddress2}
                    disabled={true}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <div className="col-7">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData?.pickupCity}
                      disabled={true}
                    />
                  </div>
                  <div className="col-1 mx-4">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData?.pickupStateCode}
                      disabled={true}
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData?.pickupPostalCode}
                      disabled={true}
                    />
                  </div>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Pickup Hours
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <textarea
                    className="customTextAreaDriver"
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    value={dispatchViewData?.pickupHours}
                    disabled={true}
                  ></textarea>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.unitNumber}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Model
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.model}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Unit Type
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.unitTypeDescription}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Special
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.specialCodeDescription}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Miles
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex align-items-center">
                  <div className="col-1">
                    <input
                      type="text"
                      className="customFormControl"
                      value={dispatchViewData?.payMiles}
                      disabled={true}
                      style={{ width: "150%" }}
                    />
                  </div>
                  <p className="mx-2 mb-0 col-form-label" style={{ position: "relative", left: "20px" }}>
                    @
                  </p>
                  <div className="col-1">
                    <input
                      type="text"
                      className="customFormControl"
                      value={
                        loadingIcon || isFlatRatedFrmRedux || dispatchViewData?.minimumPayFlatRate
                          ? ""
                          : rateFromRedux
                      }
                      disabled={true}
                      style={{ position: "relative", left: "20px", width: "150%" }}
                    />
                  </div>
                  <p className="mx-2 mb-0 col-form-label" style={{ position: "relative", left: "40px" }}>
                    =
                  </p>
                  <div className="col-1">
                    <input
                      type="text"
                      className="customFormControl"
                      value={dispatchViewData?.amount}
                      disabled={true}
                      style={{ position: "relative", left: "42px", width: "150%" }}
                    />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Pickup Fee
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex align-items-center">
                  <div className="col-1">
                    <input type="text" className="customFormControl invisible" />
                  </div>
                  <p className="mx-2 mb-0 col-form-label invisible">@</p>
                  <div className="col-1">
                    <input type="text" className="customFormControl invisible" />
                  </div>
                  <p className="ms-2 me-2 mb-0 col-form-label" style={{ position: "relative", left: "42px" }}>
                    -
                  </p>
                  <div className="col-1">
                    <input
                      type="text"
                      className="customFormControl"
                      value={driverPulloutFee}
                      disabled={true}
                      style={{ position: "relative", left: "45px", width: "150%" }}
                    />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Driver Qual
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex align-items-center">
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="mx-2 mb-0 col-form-label invisible">@</p>
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="ms-2 me-2 mb-0 col-form-label" style={{ position: "relative", left: "42px" }}>
                    -
                  </p>
                  <div className="col-1">
                    <input
                      type="text"
                      className="customFormControl"
                      value={dispatchViewData?.driverQual}
                      disabled={true}
                      style={{ position: "relative", left: "45px", width: "150%" }}
                    />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Additional
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex align-items-center">
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="mx-2 mb-0 col-form-label invisible">@</p>
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="ms-2 me-2 mb-0 col-form-label" style={{ position: "relative", left: "42px" }}>
                    +
                  </p>
                  <div className="col-1">
                    <input
                      type="text"
                      className="customFormControl"
                      value={dispatchViewData?.additionalFee}
                      disabled={true}
                      style={{ position: "relative", left: "43px", width: "150%" }}
                    />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Total Fee
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex align-items-center">
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="mx-2 mb-0 col-form-label invisible">@</p>
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="mx-2 mb-0 col-form-label " style={{ position: "relative", left: "43px" }}>
                    =
                  </p>
                  <div className="col-1">
                    <input
                      type="text"
                      className="customFormControl"
                      value={totalFee}
                      disabled={true}
                      style={{ position: "relative", left: "44px", width: "150%" }}
                    />
                  </div>
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Delivery
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.deliveryName}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.deliveryAddress1}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    type="text"
                    className="customFormControl"
                    value={dispatchViewData?.deliveryAddress2}
                    disabled={true}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <div className="col-7">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData?.deliveryCity}
                      disabled={true}
                    />
                  </div>
                  <div className="col-1 mx-4">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData?.deliveryStateCode}
                      disabled={true}
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData?.deliveryPostalCode}
                      disabled={true}
                    />
                  </div>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Delivery Hours
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <textarea
                    className="customTextAreaDriver"
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    value={dispatchViewData?.deliveryHours}
                    disabled={true}
                  ></textarea>
                </Col>
              </Form.Group>

              <Form.Group className="mt-2 align-items-start row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Dispatch Notes
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <textarea
                    className="customTextAreaDriver"
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    value={dispatchViewData?.dispatchNotes}
                    disabled={true}
                  ></textarea>
                </Col>
              </Form.Group>

              <div
                className={
                  divisionStatus === "towaway" &&
                  requireFlatbed === false &&
                  requireFlatbedFromBackEnd === false
                    ? ""
                    : "hide-elements"
                }
              >
                <Form.Group className="mt-0 align-items-center invisible row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                    <div className="col-3">
                      <p className="mb-0">Truck</p>
                    </div>
                    <div className="col-3 mx-4">
                      <p className="mb-0">Trailer</p>
                    </div>
                    <div className="col-3">
                      <p className="mb-0">Total</p>
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                    <div className="col-3">
                      <p className="mb-0">Truck</p>
                    </div>
                    <div className="col-3 mx-4">
                      <p className="mb-0">Trailer</p>
                    </div>
                    <div className="col-3">
                      <p className="mb-0">Total</p>
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      GVWR
                    </Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                    <div className="col-3">
                      <input
                        disabled
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData?.truckGVWR}
                      />
                    </div>
                    <div className="col-3 mx-4">
                      <input
                        disabled
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData?.unitGVWR}
                      />
                    </div>
                    <div className="col-3">
                      <input
                        disabled
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData?.totalGVWR}
                      />
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Scale Weight
                    </Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                    <div className="col-3">
                      <input
                        disabled
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData?.truckScaleWt}
                      />
                    </div>
                    <div className="col-3 mx-4">
                      <input
                        disabled
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData?.unitShippingWt}
                      />
                    </div>
                    <div className="col-3">
                      <input
                        disabled
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData?.totalWeight}
                      />
                    </div>
                  </Col>
                </Form.Group>
              </div>
              {divisionStatus === "towaway" && (
                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={1} md={1} xs={1} className="p-0 w-110px" style={{ width: "105px" }}>
                    <div className="p-0 w-75px">
                      <Form.Label className="col-form-label dealer-label m-l-0">Truck</Form.Label>
                    </div>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="d-flex">
                    <Form.Select
                      className="customFormControl"
                      name="truckDropdown"
                      id="truckDropdown"
                      value={selectedTruckPK}
                      onChange={handleDropdownChange}
                    >
                      {gvwrEligibleTrucks?.map(([key, value]) => (
                        <option key={key} value={key} selected={key == selectedTruckPK}>
                          {value.toUpperCase()}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              )}
              <div className={requireFlatbed || requireFlatbedFromBackEnd ? "" : "hide-elements"}>
                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={1} md={1} xs={1} className="p-0 w-105px">
                    <div className="p-0 w-75px">
                      <Form.Label className="col-form-label dealer-label m-l-0">Trailer</Form.Label>
                    </div>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="d-flex">
                    <Form.Select
                      className="customFormControl"
                      name="trailerDropdown"
                      id="trailerDropdown"
                      value={selectedTrailerPK}
                      onChange={handleTrailerDropdownChange}
                      disabled={disableTrailer}
                    >
                      {disableTrailer ? (
                        <option value=""> </option>
                      ) : (
                        eligibleTrailers?.map(([key, value]) => (
                          <option key={key} value={key} selected={key == selectedTrailerPK}>
                            {value.toUpperCase()}
                          </option>
                        ))
                      )}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>
              <div className="d-flex mt-2">
                <div className="col-5">
                  <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0 w-118px">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Reimburse Tolls
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <input type="checkbox" checked={dispatchViewData?.reimburseTolls} disabled={true} />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0 w-118px">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Reimburse Permits
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <input type="checkbox" checked={dispatchViewData?.reimbursePermits} disabled={true} />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0 w-118px">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Reimburse wash
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <input type="checkbox" checked={dispatchViewData?.reimburseWash} disabled={true} />
                    </Col>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Maximum Tolls
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                      <input
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData?.maximumTolls}
                        disabled={true}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Maximum Permits
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                      <input
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData?.maximumPermits}
                        disabled={true}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Maximum Wash
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                      <input
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData?.maximumWash}
                        disabled={true}
                      />
                    </Col>
                  </Form.Group>
                </div>
              </div>
            </Col>
            {<UnitDates unitdate={unitDates} />}
          </Row>
          <ModalComponent
            show={loadFailed}
            onHide={handleWarning}
            title={"Error"}
            body={"Could not fetch the dispatch record"}
            okayButton
            showError
            handleOK={handleWarning}
          />
        </div>
        <UnitConfirmationFooter />
        {loadingIcon === true && <LoadingIcon />}
      </div>
    </div>
  );
}

export default DriveawayUnitConfirmation;
