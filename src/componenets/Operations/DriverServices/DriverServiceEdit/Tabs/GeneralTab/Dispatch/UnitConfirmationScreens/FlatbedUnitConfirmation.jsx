import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import UnitConfirmationFooter from "./UnitConfirmationFooter";
import DispatchesService from "../../../../../../../../services/DispatchesService";
import UnitDates from "./UnitDates";
import { useSelector, useDispatch } from "react-redux";
import {
  setDispatchViewObject,
  setSelectedTruckPK,
  setGvwrEligibleTrucks,
  setPickupDate,
  setDeliveryDate,
  setRatePerMile,
  setRateObj,
  setIsMultiUnitDispatch,
  setNextIndex,
  setIndex,
  setHasNext,
  setHasPrevious,
  setIsPrevious,
  setIsNext,
  setSelectedTrailerPK,
  setEligibleTrailerPKSMap,
  setIndividualUnitSaveVOList,
  setTrailerDisable,
  setDisableDispatch,
} from "../../../../../../../../redux/DispatchesSlice";
import DispatchHeader from "../DriverDispatchHeader";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../../../../../../componenets/common/ModalComponent";
import LoadingIcon from "../../../../../../../../componenets/common/LoadingIcon";

function FlatbedUnitConfirmation() {
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
  const division = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const selectedTruckPK = useSelector((state) => state.dispatchesReducer.selectedTruckPK);
  const complianceEligibleTrucks = useSelector((state) => state.dispatchesReducer.eligibleTruckPKS);
  const isFlatRatedFrmRedux = useSelector((state) => state.dispatchesReducer.flatRated);
  const rateFromRedux = useSelector((state) => state.dispatchesReducer.ratePerMile);
  const rateObjFrmRedux = useSelector((state) => state.dispatchesReducer.rateObj);
  const isPrevious = useSelector((state) => state.dispatchesReducer.isPrevious);
  const isNext = useSelector((state) => state.dispatchesReducer.isNext);
  const index = useSelector((state) => state.dispatchesReducer.index);
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const hasPrevious = useSelector((state) => state.dispatchesReducer.hasPrevious);
  const hasNext = useSelector((state) => state.dispatchesReducer.hasNext);
  const individualUnitConfirmationVOList = useSelector(
    (state) => state.dispatchesReducer.individualUnitConfirmationVOList
  );
  const complianceEligibleTrailers = useSelector((state) => state.dispatchesReducer.eligibleTrailerPKS);
  const selectedTrailerPK = useSelector((state) => state.dispatchesReducer.selectedTrailerPK);
  const eligibleTrailerPKSMap = useSelector((state) => state.dispatchesReducer.eligibleTrailerPKSMap);
  const individualUnitSaveVOList = useSelector((state) => state.dispatchesReducer.individualUnitSaveVOList);
  const multiUnitBrowseDataMap = useSelector((state) => state.dispatchesReducer.multiUnitBrowseDataMap);
  let selectedDispatchPKList = useSelector((state) => state.dispatchesReducer.selectedDispatchPKList);
  const disableTrailer = useSelector((state) => state.dispatchesReducer.isTrailerDisable);
  const hasFlatbedTrailer = useSelector((state) => state.dispatchesReducer.hasFlatbedTrailer);
  useEffect(() => {
    dispatch(setIsMultiUnitDispatch(true));
    dispatch(setPickupDate(null));
    dispatch(setDeliveryDate(null));
    setLoadingIcon(true);
    if ((!isPrevious && !isNext) || (isNext && hasNext) || (isPrevious && hasPrevious)) {
      const timeoutId = setTimeout(() => {
        const str = selectedDispatchPKList.join(",");
        DispatchesService.fetchByID(
          driverData?.driverPK,
          str,
          division,
          complianceEligibleTrailers,
          complianceEligibleTrucks
        ).then(({ data }) => {
          const obj = JSON.parse(data[0]?.dispatchesRateData);
          const originalArray = data;
          const responseData = data;
          const newArray = originalArray.map((item) => {
            const rateData = JSON.parse(item.dispatchesRateData);
            return {
              additionalFlatRate: null,
              dispatchPK: item.dispatchPK,
              flatRate: rateData.Flatrate ?? 0,
              flatRated: !!rateData.Flatrated,
              halftonRateAdded: !!rateData.HalftonRate,
              ratePerMile: (rateData?.Flatrate || rateData?.Rate) / rateData.PayMiles || 0,
              rateVO: rateData || {},
            };
          });
          DispatchesService.getDispatchesViewDataForFlatbed(
            newArray,
            driverData?.payPickupFee,
            driverData,
            division,
            region,
            selectedTruck,
            complianceEligibleTrucks,
            complianceEligibleTrailers,
            index,
            selectedDispatchPKList,
            hasFlatbedTrailer
          )
            .then((response) => {
              const data = response.data;
              setLoadingIcon(false);
              let dispatchViewObject = null;
              if (data !== null && data) {
                dispatchViewObject = data;
                setDriverPulloutFee(data[index].totalPulloutFee);
                let totalCharges =
                  Number(data[index].amount || 0) +
                  Number(data[index].additionalFee || 0) -
                  (Number(data[index].totalPulloutFee || 0) + Number(data[index].driverQual || 0));
                setTotalFee(totalCharges);
                dispatch(setDispatchViewObject(dispatchViewObject));
                let individualUnitSaveVOListLocal = individualUnitSaveVOList;
                dispatchViewObject.forEach((dispatchView) => {
                  const currentdispatch = newArray.filter(
                    (disp) => dispatchView.dispatchPK === disp.dispatchPK
                  );
                  const dispatchesRateData = currentdispatch[0]?.rateVO;
                  let totalCharges1 =
                    Number(dispatchView.amount || 0) +
                    Number(dispatchView.additionalFee || 0) -
                    (Number(dispatchView.totalPulloutFee || 0) + Number(dispatchView.driverQual || 0));

                  if (
                    !individualUnitSaveVOListLocal.some(
                      (individualUnitSaveVO) => individualUnitSaveVO.dispatchPK === dispatchView.dispatchPK
                    )
                  ) {
                    let totalChargesForIndividualUnit =
                      Number(dispatchView.amount || 0) +
                      Number(dispatchView.additionalFee || 0) -
                      (Number(dispatchView.totalPulloutFee || 0) + Number(dispatchView.driverQual || 0));
                    let individualUnitSaveVO = {
                      dispatchPK: dispatchView.dispatchPK,
                      unitFK: dispatchView.selectedUnitFK,
                      miles: dispatchView.miles,
                      payMiles: dispatchView.payMiles,
                      reload: dispatchView.reload,
                      city: dispatchView.pickupCity,
                      stateCode: dispatchView.pickupStateCode,
                      totalFee: totalChargesForIndividualUnit,
                      rate: dispatchView.rate,
                      rateVO: dispatchesRateData,
                      flatRated: dispatchesRateData?.FlatRated,
                      flatRate: dispatchView.flatRate,
                      minimumPayMiles: dispatchView.minimumPayMiles,
                      minimumPayFlatRate: dispatchView.minimumPayFlatRate,
                      grossPay: dispatchView.amount,
                      bonusPoolIn: dispatchView.bonusPoolIn,
                      bonusPoolOut: dispatchView.bonusPoolOut,
                      driverQual: dispatchView.driverQual,
                      deductedBondAmt: totalCharges1,
                    };
                    individualUnitSaveVOListLocal = [...individualUnitSaveVOListLocal, individualUnitSaveVO];
                  }
                });
                dispatch(setIndividualUnitSaveVOList(individualUnitSaveVOListLocal));
                if (data[index]?.eligibleTrucks) {
                  dispatch(setGvwrEligibleTrucks(Object.entries(data[index].eligibleTrucks)));
                  dispatch(setSelectedTruckPK(data[index].defaultTruckPK));
                }
                if (data[index]?.eligibleTrailers) {
                  const defaultTrailer = data[index].defaultTrailerPK;
                  dispatch(setEligibleTrailerPKSMap(Object.entries(data[index].eligibleTrailers)));
                  if (data[index].haulAndTowTruck) {
                    dispatch(setSelectedTrailerPK(null));
                    dispatch(setDisableDispatch(false));
                  } else if (defaultTrailer) {
                    dispatch(setSelectedTrailerPK(defaultTrailer));
                    dispatch(setDisableDispatch(false));
                  } else if (defaultTrailer === null || defaultTrailer === undefined) {
                    const firstKey = Object.keys(data[index].eligibleTrailers)[0];
                    dispatch(setSelectedTrailerPK(firstKey));
                    if (!firstKey) {
                      dispatch(setDisableDispatch(true));
                    } else {
                      dispatch(setDisableDispatch(false));
                    }
                  }
                } else {
                }
                dispatch(setHasNext(data[index].hasNext));
                dispatch(setHasPrevious(data[index].hasPrevious));
              } else {
                dispatch(setHasNext(false));
                dispatch(setHasPrevious(true));
              }
              dispatch(setTrailerDisable(data[index].haulAndTowTruck));
            })
            .catch((err) => {
              console.log(err);
              setLoadFailed(true);
              setLoadingIcon(false);
            });
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [dispatchPK, divisionStatus, selectedTruck, isPrevious, isNext]);
  useEffect(() => {
    if (isPrevious) {
      dispatch(setIsPrevious(false));
    }
    if (isNext) {
      dispatch(setIsNext(false));
    }
  });

  const handleDropdownChange = (event) => {
    setSelectedTruck(event.target.value);
    dispatch(setSelectedTruckPK(event.target.value));
  };

  const handleDropdownChangeForTrailer = (event) => {
    dispatch(setSelectedTrailerPK(event.target.value));
  };

  const handleWarning = () => {
    setLoadFailed(false);
    navigate("/reload-unit-browse");
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
                    value={dispatchViewData ? dispatchViewData[index]?.pickupName : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.pickupAddress1 : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.pickupAddress2 : ""}
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
                      value={dispatchViewData ? dispatchViewData[index]?.pickupCity : ""}
                      disabled={true}
                    />
                  </div>
                  <div className="col-1 mx-4">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData ? dispatchViewData[index]?.pickupStateCode : ""}
                      disabled={true}
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData ? dispatchViewData[index]?.pickupPostalCode : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.pickupHours : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.unitNumber : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.model : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.unitTypeDescription : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.specialCodeDescription : ""}
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
                      value={dispatchViewData ? dispatchViewData[index]?.payMiles : ""}
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
                        loadingIcon ||
                        isFlatRatedFrmRedux ||
                        (dispatchViewData && dispatchViewData[index]?.minimumPayFlatRate)
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
                      value={dispatchViewData ? dispatchViewData[index]?.amount : ""}
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
                      value={dispatchViewData ? dispatchViewData[index]?.driverQual : ""}
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
                      value={dispatchViewData ? dispatchViewData[index]?.additionalFee : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.deliveryName : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.deliveryAddress1 : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.deliveryAddress2 : ""}
                    disabled={true}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex"></Col>
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
                      value={dispatchViewData ? dispatchViewData[index]?.deliveryCity : ""}
                      disabled={true}
                    />
                  </div>
                  <div className="col-1 mx-4">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData ? dispatchViewData[index]?.deliveryStateCode : ""}
                      disabled={true}
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className="customFormControl "
                      value={dispatchViewData ? dispatchViewData[index]?.deliveryPostalCode : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.deliveryHours : ""}
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
                    value={dispatchViewData ? dispatchViewData[index]?.dispatchNotes : ""}
                    disabled={true}
                  ></textarea>
                </Col>
              </Form.Group>

              <div className={divisionStatus !== "driveaway" ? "" : "hide-elements"}>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={1} md={1} xs={1} className="p-0 w-100px">
                    <div className="p-0 w-75px">
                      <Form.Label className="col-form-label dealer-label m-l-0">Truck</Form.Label>
                    </div>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="d-flex">
                    <Form.Select
                      className={`customFormControl`}
                      style={{ marginLeft: "5px" }}
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
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0 w-100px">
                    <div className="p-0 w-75px">
                      <Form.Label className="col-form-label dealer-label m-l-0">Trailer</Form.Label>
                    </div>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="d-flex">
                    <Form.Select
                      className={`customFormControl`}
                      style={{ marginLeft: "5px" }}
                      name="trailerDropdown"
                      id="trailerDropdown"
                      value={selectedTrailerPK}
                      onChange={handleDropdownChangeForTrailer}
                      disabled={disableTrailer}
                    >
                      {disableTrailer ? (
                        <option value=""> </option>
                      ) : (
                        eligibleTrailerPKSMap?.map(([key, value]) => (
                          <option key={key} value={key} selected={key == selectedTrailerPK}>
                            {value.toUpperCase()}
                          </option>
                        ))
                      )}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </div>

              <div className="d-flex">
                <div className="col-5">
                  <Form.Group className=" align-items-center row  m-l-0 m-r-0" style={{ marginTop: "50px" }}>
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Reimburse Tolls
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <input
                        type="checkbox"
                        checked={dispatchViewData ? dispatchViewData[index]?.reimburseTolls : ""}
                        disabled={true}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Reimburse Permits
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <input
                        type="checkbox"
                        checked={dispatchViewData ? dispatchViewData[index]?.reimbursePermits : ""}
                        disabled={true}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Reimburse wash
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <input
                        type="checkbox"
                        checked={dispatchViewData ? dispatchViewData[index]?.reimburseWash : ""}
                        disabled={true}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className=" align-items-center row  m-l-0 m-r-0" style={{ marginTop: "50px" }}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Maximum Tolls
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                      <input
                        type="text"
                        className="customFormControl"
                        value={dispatchViewData ? dispatchViewData[index]?.maximumTolls : ""}
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
                        value={dispatchViewData ? dispatchViewData[index]?.maximumPermits : ""}
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
                        value={dispatchViewData ? dispatchViewData[index]?.maximumWash : ""}
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

export default FlatbedUnitConfirmation;
