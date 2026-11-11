import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup } from "react-radio-group";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import { useNavigate, useParams } from "react-router-dom";
import {
  setAllAmountTaxable,
  setCompletedDriverFlatrate,
  setCompletedDriverMiles,
  setDispatchDriverFlatrate,
  setDispatchDriverMiles,
  setDriverAbandonedUnit,
  setDriverTotalFlatrate,
  setDriverTotalMiles,
  setFirstHalfDriverFlatrate,
  setFirstHalfDriverMiles,
  setHasSplitOverrridePermission,
  setInvoiceFlatrate,
  setInvoiceMiles,
  setIsFlatrated,
  setMilesNotUpdated,
  setOther,
  setOtherDescription,
  setPayRadioButton,
  setPermits,
  setSecondHalfActive,
  setSecondHalfDriverFlatrate,
  setSecondHalfDriverMiles,
  setSplitTripMilesData,
  setTolls,
} from "../../../../../../../../redux/UndispatchSlice";
import { PermissionKeyGeneratorUtil } from "../../../../../../../../utils/PermissionKeyGeneratorUtil";
const SplitTripMilesContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { delayedunitPK, driverId, dispatchId, companyName, unitfk } = useParams();
  const [saveFlag, setSaveFlag] = useState(false);
  const generalData = useSelector((state) => state.delayProcessing.generalData);

  const {
    invoiceMiles,
    driverTotalMiles,
    completedDriverMiles,
    dispatchDriverMiles,
    firstHalfDriverMiles,
    secondHalfDriverMiles,
    secondHalfActive,
    driverAbandonedUnit,
    invoiceFlatrate,
    driverTotalFlatrate,
    completedDriverFlatrate,
    dispatchDriverFlatrate,
    firstHalfDriverFlatrate,
    secondHalfDriverFlatrate,
    miscellaneousFormDealerData,
    tolls,
    permits,
    other,
    payRadioButton,
    otherDescription,
    isFlatrated,
    hasSplitOverrridePermission,
    splitTripMilesData,
    allAmountTaxable,
    undispatchFlag,
    milesNotUpdated,
  } = useSelector((state) => state.undispatchReducer);

  const driverReleased = localStorage.getItem("driverRelease") === "true";

  //validation and regex for First Half
  const handleFirstHalfInput = (value) => {
    if (
      value?.match(/^\d{0,5}$/) &&
      Number(value) <= Number(32767) &&
      Number(value) <= Number(dispatchDriverMiles)
    ) {
      dispatch(setMilesNotUpdated(false));
      dispatch(setFirstHalfDriverMiles(value));
    }
  };

  //validation and regex for First Half
  const handleSecondHalfInput = (value) => {
    const regexResult = /^\d{0,5}$/.test(value);
    const numValue = Number(value);
    const numDispatchMiles = Number(dispatchDriverMiles);
    if (
      regexResult &&
      numValue <= 32767 &&
      (numValue <= numDispatchMiles || hasSplitOverrridePermission || numValue < secondHalfDriverMiles)
    ) {
      dispatch(setMilesNotUpdated(false));
      dispatch(setSecondHalfDriverMiles(value));
    }
  };

  const isValidFlatrate = (value) => /^\d{0,5}(?:\.\d{0,2})?$|^\d+\.$/.test(value);

  const handleFlateRateOnBlur = (value, setter) => {
    if (value.endsWith(".")) {
      if (value?.trim() === ".") {
        dispatch(setter("0.0"));
      } else {
        dispatch(setter(`${value}0`));
      }
    } else if (!value.includes(".") && value) {
      dispatch(setter(`${value}.0`));
    } else if (!value) {
      dispatch(setter("0.0"));
    }
  };
  const updateFlatrates = (value, isFirstHalf) => {
    if (!isValidFlatrate(value)) return;
    if (isFirstHalf) {
      dispatch(setFirstHalfDriverFlatrate(value));
    } else {
      dispatch(setSecondHalfDriverFlatrate(value));
    }
  };

  const handleFirstHalfFlatrateInput = (value) => updateFlatrates(value, true);

  const handleSecondHalfFlatrateInput = (value) => updateFlatrates(value, false);

  const populateData = (data) => {
    dispatch(setInvoiceMiles(data?.invoiceMiles || "0"));
    dispatch(setDriverTotalMiles(data?.totalMiles || "0"));
    dispatch(setCompletedDriverMiles(data?.completedMiles || "0"));
    dispatch(setDispatchDriverMiles(data?.driverMiles || "0"));
    dispatch(setFirstHalfDriverMiles(data?.firstDriverMiles || "0"));
    dispatch(setSecondHalfDriverMiles(data?.secondDriverMiles || "0"));
    dispatch(setSecondHalfActive(data?.secondActive || false));
    dispatch(setDriverAbandonedUnit(data?.driverAbandoned || false));
    dispatch(setInvoiceFlatrate(data?.invoiceFlatrate || ""));
    dispatch(setDriverTotalFlatrate(data?.totalFlatrate || "0.0"));
    dispatch(setCompletedDriverFlatrate(data?.completedFlatrate || "0.0"));
    dispatch(setDispatchDriverFlatrate(data?.driverFlatrate || "0.0"));
    dispatch(setFirstHalfDriverFlatrate(data?.firstDriverFlatrate || "0.0"));
    dispatch(setSecondHalfDriverFlatrate(data?.secondDriverFlatrate || "0.0"));
    dispatch(setTolls(data?.tolls || "0.0"));
    dispatch(setPermits(data?.permits || "0.0"));
    dispatch(setOther(data?.other || "0.0"));
    dispatch(setPayRadioButton(data?.payType || "Pay"));
    dispatch(setOtherDescription(data?.otherDescription || ""));
    dispatch(setIsFlatrated(data?.flatrated || false));
    dispatch(setAllAmountTaxable(data?.allAmountTaxable || false));
  };

  useEffect(() => {
    if (!splitTripMilesData) {
      setSaveFlag(true);
      UndispatchService.getSplitTripMilesData(dispatchId, miscellaneousFormDealerData)
        .then(({ data }) => {
          dispatch(setMilesNotUpdated(true));
          dispatch(setSplitTripMilesData(data));
          populateData(data);
          setSaveFlag(false);
        })
        .catch((error) => {
          setSaveFlag(false);
        });
    }
  }, [miscellaneousFormDealerData]);

  useEffect(() => {
    if (!splitTripMilesData) {
      populateData(null);
    }
  }, []);

  useEffect(() => {
    if (!other || other == 0) {
      dispatch(setOtherDescription(""));
    }
  }, [other]);

  useEffect(() => {
    if (!undispatchFlag) {
      const isDelay =
        window.location.pathname ===
        `/releasedriver-splittrip-miles-screen/${driverId}/${delayedunitPK}/${dispatchId}/${companyName}`;
      if (!isDelay) {
        if (driverReleased) {
          navigate(
            `/delay-processing/delayed-details/${companyName}/${Number(unitfk)}/${Number(driverId)}/${Number(delayedunitPK)}`,
            { replace: true }
          );
        } else {
          navigate("/undispatch/" + driverId);
        }
      } else {
        navigate(
          "/delay-processing/delayed-details/" +
            companyName +
            "/" +
            Number(unitfk) +
            "/" +
            Number(driverId) +
            "/" +
            Number(delayedunitPK)
        );
      }
    }
  }, [undispatchFlag]);

  //used to set permission
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const splitOverridePermission = PermissionKeyGeneratorUtil("UNDISPATCHSPLITOVERRIDE", "new");
  useEffect(() => {
    if (deniedPermissions) {
      dispatch(setHasSplitOverrridePermission(!deniedPermissions.includes(splitOverridePermission)));
    }
  }, [deniedPermissions, splitOverridePermission]);
  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-5">
          <Col sm={4} md={4} lg={4} xl={4} xs={4}>
            <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Invoice Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  className="customFormControl"
                  value={invoiceMiles}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Total Driver Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  className="customFormControl"
                  value={driverTotalMiles}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Completed Driver Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  className="customFormControl"
                  value={completedDriverMiles}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Dispatch Driver Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  className="customFormControl"
                  value={dispatchDriverMiles}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">First Half Driver Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  className={`customFormControl ${
                    hasSplitOverrridePermission ||
                    Number(firstHalfDriverMiles) + Number(secondHalfDriverMiles) <=
                      Number(dispatchDriverMiles)
                      ? ""
                      : "borderRed"
                  }`}
                  value={firstHalfDriverMiles}
                  onInput={(e) => handleFirstHalfInput(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Second Half Driver Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  className={`customFormControl ${
                    hasSplitOverrridePermission ||
                    milesNotUpdated ||
                    Number(firstHalfDriverMiles) + Number(secondHalfDriverMiles) <=
                      Number(dispatchDriverMiles)
                      ? ""
                      : "borderRed"
                  }`}
                  value={secondHalfDriverMiles}
                  onInput={(e) => handleSecondHalfInput(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Second Half Active</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  value={secondHalfActive}
                  checked={secondHalfActive}
                  onChange={(e) => dispatch(setSecondHalfActive(e.target.checked))}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Driver Abandoned Unit</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAbandonedUnit}
                  value={driverAbandonedUnit}
                  onChange={(e) => dispatch(setDriverAbandonedUnit(e.target.checked))}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col sm={7} md={7} xs={7} className="">
            {
              <div classname={`${true ? "invisible" : ""}`}>
                <Form.Group
                  className={`mt-0 align-items-center row ${!invoiceFlatrate ? "invisible" : ""}  m-l-0 m-r-0`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Invoice Flatrate</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                    <input
                      type="text"
                      onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                      className="customFormControl"
                      value={invoiceFlatrate}
                      disabled
                    />
                  </Col>
                </Form.Group>
              </div>
            }
            {
              <div classname={`${isFlatrated ? "" : "visibility-hidden"}`}>
                {" "}
                <Form.Group
                  className={`mt-3 align-items-center row  m-l-0 m-r-0 ${!isFlatrated ? "invisible" : ""}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Total Driver Flatrate</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                    <input
                      type="text"
                      onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                      className="customFormControl"
                      value={driverTotalFlatrate}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 align-items-center row  m-l-0 m-r-0 ${!isFlatrated ? "invisible" : ""}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Completed Driver Flatrate</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                    <input
                      type="text"
                      onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                      className="customFormControl"
                      value={completedDriverFlatrate}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 align-items-center row  m-l-0 m-r-0 ${!isFlatrated ? "invisible" : ""}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Dispatch Driver Flatrate</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                    <input
                      type="text"
                      onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                      className="customFormControl"
                      value={dispatchDriverFlatrate}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 align-items-center row m-l-0 m-r-0 ${!isFlatrated ? "invisible" : ""}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      First Half Driver Flatrate
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                    <input
                      type="text"
                      onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                      className={`customFormControl ${
                        (hasSplitOverrridePermission ||
                          (Number(firstHalfDriverFlatrate) || 0) + (Number(secondHalfDriverFlatrate) || 0) <=
                            (Number(dispatchDriverFlatrate) || 0)) &&
                        !String(firstHalfDriverFlatrate)?.endsWith(".")
                          ? ""
                          : "borderRed"
                      }`}
                      value={firstHalfDriverFlatrate}
                      onInput={(e) => handleFirstHalfFlatrateInput(e.target.value)}
                      onBlur={(e) => handleFlateRateOnBlur(e.target.value, setFirstHalfDriverFlatrate)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 align-items-center row m-l-0 m-r-0 ${!isFlatrated ? "invisible" : ""}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Second Half Driver Flatrate
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                    <input
                      type="text"
                      onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                      className={`customFormControl ${
                        (hasSplitOverrridePermission ||
                          (Number(firstHalfDriverFlatrate) || 0) + (Number(secondHalfDriverFlatrate) || 0) <=
                            (Number(dispatchDriverFlatrate) || 0)) &&
                        !String(secondHalfDriverFlatrate)?.endsWith(".")
                          ? ""
                          : "borderRed"
                      }`}
                      value={secondHalfDriverFlatrate}
                      onInput={(e) => handleSecondHalfFlatrateInput(e.target.value)}
                      onBlur={(e) => handleFlateRateOnBlur(e.target.value, setSecondHalfDriverFlatrate)}
                    />
                  </Col>
                </Form.Group>
              </div>
            }

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Tolls</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  value={tolls}
                  onInput={(e) =>
                    e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/) && dispatch(setTolls(e.target.value))
                  }
                  className={`customFormControl ${
                    /^\d{0,5}(?:\.\d{0,2})?$/.test(tolls) && !String(tolls).endsWith(".") ? "" : "borderRed"
                  }`}
                  onBlur={(e) => handleFlateRateOnBlur(e.target.value, setTolls)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Permits</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  className={`customFormControl ${
                    /^\d{0,5}(?:\.\d{0,2})?$/.test(permits) && !String(permits).endsWith(".")
                      ? ""
                      : "borderRed"
                  }`}
                  value={permits}
                  onInput={(e) =>
                    e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/) && dispatch(setPermits(e.target.value))
                  }
                  onBlur={(e) => handleFlateRateOnBlur(e.target.value, setPermits)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Other</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  className={`customFormControl ${
                    /^\d{0,5}(?:\.\d{0,2})?$/.test(other) && !String(other).endsWith(".") ? "" : "borderRed"
                  }`}
                  value={other}
                  onInput={(e) =>
                    e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/) && dispatch(setOther(e.target.value))
                  }
                  onBlur={(e) => handleFlateRateOnBlur(e.target.value, setOther)}
                />
              </Col>
              <Col xs={1} md={1} sm={1} className="p-r-0 w-10px">
                <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0 d-flex align-items-center">
                {!allAmountTaxable && (
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={payRadioButton}
                    onChange={(option) => {
                      dispatch(setPayRadioButton(option));
                    }}
                    className="d-flex"
                  >
                    <div className="d-flex align-items-center me-4">
                      <Radio value="Pay" />
                      <label className="f-w-600 ms-2">Pay</label>
                    </div>
                    <div className="d-flex align-items-center">
                      <Radio value="Reimbursement" />
                      <label className="f-w-600 ms-2">Reimbursement</label>
                    </div>
                  </RadioGroup>
                )}
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Other Description</Form.Label>
              </Col>
              <Col xs={8} md={8} sm={8} className="p-0 ">
                <input
                  type="text"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  className={`customFormControl ${
                    other && other != 0 ? (otherDescription ? "borderGreen" : "borderRed") : ""
                  }`}
                  value={otherDescription}
                  onInput={(e) => dispatch(setOtherDescription(e.target.value.replace(/^\s+/g, "")))}
                  disabled={!other || other == 0}
                  maxLength={60}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
      {saveFlag && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitTripMilesContent;
