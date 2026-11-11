import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setAttemptedPickupAuthorizedBy,
  setAttemptedPickupDriver,
  setAttemptedPickupInvoice,
  setBreakdownFeeDriver,
  setBreakdownFeeInvoice,
  setData,
  setDispatchFK,
  setDriverAdditionalDriver,
  setDriverAdditionalMiles,
  setDriverAdditionalRate,
  setDriverFK,
  setDriverFlatrated,
  setDriverName,
  setDriverPaid,
  setDriversDownTimeDriver,
  setDriversDownTimeHours,
  setDriversDownTimeRate,
  setFuelCreditDriver,
  setFuelCreditGallons,
  setFuelCreditPrice,
  setInvoiceAdditionalInvoice,
  setInvoiceAdditionalMiles,
  setInvoiceAdditionalRate,
  setInvoiced,
  setInvoiceDownTimeHours,
  setInvoiceDownTimeInvoice,
  setInvoiceDownTimeRate,
  setInvoiceFlatrated,
  setIsValid,
  setPermitsDrivers,
  setPermitsInvoice,
  setSecondDriverDriver,
  setSecondDriverGallons,
  setSecondDriverPrice,
  setTollsDrivers,
  setTollsInvoice,
  setUnitFK,
  setViewDetail,
} from "../../../../redux/DelayUnitExpenseSlice";
import { useParams } from "react-router-dom";
import DelayUnitExpenseService from "../../../../services/DispatchDelay/BreakdownProcessing/DelayUnitExpenseService";

const DelayUnitExpenseContent = () => {
  const dispatch = useDispatch();

  const [driverReleased, setDriverReleased] = useState(false);
  const [atPickUp, setAtPickUp] = useState(false);
  const [inYard, setInYard] = useState(false);
  const [motorized, setMotorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const breakdownFK = useParams().breakdownFK;
  const delayedUnitId = useParams().delayedUnitPK;

  const delayedUnitExpsnseId = useSelector((state) => state.delayUnitExpenseSlice.delayedUnitExpsnseId);
  const driverName = useSelector((state) => state.delayUnitExpenseSlice.driverName);
  const driverFK = useSelector((state) => state.delayUnitExpenseSlice.driverFK);
  const invoiceDownTimeHours = useSelector((state) => state.delayUnitExpenseSlice.invoiceDownTimeHours);
  const invoiceDownTimeRate = useSelector((state) => state.delayUnitExpenseSlice.invoiceDownTimeRate);
  const invoiceDownTimeInvoice = useSelector((state) => state.delayUnitExpenseSlice.invoiceDownTimeInvoice);
  const driversDownTimeHours = useSelector((state) => state.delayUnitExpenseSlice.driversDownTimeHours);
  const driversDownTimeRate = useSelector((state) => state.delayUnitExpenseSlice.driversDownTimeRate);
  const driversDownTimeDriver = useSelector((state) => state.delayUnitExpenseSlice.driversDownTimeDriver);
  const attemptedPickupDriver = useSelector((state) => state.delayUnitExpenseSlice.attemptedPickupDriver);
  const attemptedPickupInvoice = useSelector((state) => state.delayUnitExpenseSlice.attemptedPickupInvoice);
  const attemptedPickupAuthorizedBy = useSelector(
    (state) => state.delayUnitExpenseSlice.attemptedPickupAuthorizedBy
  );
  const permitsInvoice = useSelector((state) => state.delayUnitExpenseSlice.permitsInvoice);
  const permitsDrivers = useSelector((state) => state.delayUnitExpenseSlice.permitsDrivers);
  const tollsInvoice = useSelector((state) => state.delayUnitExpenseSlice.tollsInvoice);
  const tollsDrivers = useSelector((state) => state.delayUnitExpenseSlice.tollsDrivers);
  const fuelCreditGallons = useSelector((state) => state.delayUnitExpenseSlice.fuelCreditGallons);
  const fuelCreditPrice = useSelector((state) => state.delayUnitExpenseSlice.fuelCreditPrice);
  const fuelCreditDriver = useSelector((state) => state.delayUnitExpenseSlice.fuelCreditDriver);
  const secondDriverGallons = useSelector((state) => state.delayUnitExpenseSlice.secondDriverGallons);
  const secondDriverPrice = useSelector((state) => state.delayUnitExpenseSlice.secondDriverPrice);
  const secondDriverDriver = useSelector((state) => state.delayUnitExpenseSlice.secondDriverDriver);
  const invoiceAdditionalMiles = useSelector((state) => state.delayUnitExpenseSlice.invoiceAdditionalMiles);
  const invoiceAdditionalRate = useSelector((state) => state.delayUnitExpenseSlice.invoiceAdditionalRate);
  const invoiceAdditionalInvoice = useSelector(
    (state) => state.delayUnitExpenseSlice.invoiceAdditionalInvoice
  );
  const driverAdditionalMiles = useSelector((state) => state.delayUnitExpenseSlice.driverAdditionalMiles);
  const driverAdditionalRate = useSelector((state) => state.delayUnitExpenseSlice.driverAdditionalRate);
  const driverAdditionalDriver = useSelector((state) => state.delayUnitExpenseSlice.driverAdditionalDriver);
  const breakdownFeeInvoice = useSelector((state) => state.delayUnitExpenseSlice.breakdownFeeInvoice);
  const breakdownFeeDriver = useSelector((state) => state.delayUnitExpenseSlice.breakdownFeeDriver);
  const invoiced = useSelector((state) => state.delayUnitExpenseSlice.invoiced);
  const driverPaid = useSelector((state) => state.delayUnitExpenseSlice.driverPaid);
  const viewDetail = useSelector((state) => state.delayUnitExpenseSlice.viewDetail);
  const invoiceFlatrated = useSelector((state) => state.delayUnitExpenseSlice.invoiceFlatrated);
  const driverFlatrated = useSelector((state) => state.delayUnitExpenseSlice.driverFlatrated);
  const data = useSelector((state) => state.delayUnitExpenseSlice.data);

  const isValidDecimalInput = (input, maxDigitsBeforeDecimal, maxDigitsAfterDecimal) => {
    if (input === "") return true;
    const regex = new RegExp(`^\\d{0,${maxDigitsBeforeDecimal}}(?:\\.\\d{0,${maxDigitsAfterDecimal}})?$`);
    return regex.test(input);
  };

  const isValidInteger = (input, length) => {
    const str = String(input);
    const regex = new RegExp(`^\\d{1,${length}}$`);
    return regex.test(str) || str === "";
  };

  const populateForEdit = () => {
    setLoading(true);
    DelayUnitExpenseService.getData("Edit", delayedUnitId, delayedUnitExpsnseId, breakdownFK, {})
      .then(({ data }) => {
        if (data?.ErrorCode === "0") {
          setEditData(data);
        }
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };
  const dispatchMultipliedValue = (intVal, decimalVal, action) => {
    const intNum = parseInt(intVal) || 0;
    const decNum = parseFloat(decimalVal) || 0;
    const result = (intNum * decNum).toFixed(2); // 2 decimal precision
    dispatch(action(result));
  };

  const setEditData = (data) => {
    dispatch(setDriverName(data?.DriverName || ""));
    dispatch(setDriverFK(data?.DriverFK || 0));
    dispatch(setBreakdownFeeDriver(data?.DriverBreakdownFee || "0.0"));
    dispatch(setBreakdownFeeInvoice(data?.InvoiceBreakdownFee || "0.0"));
    dispatch(setDriversDownTimeHours(data?.DriverDowntimeHours || "0.0"));
    dispatch(setDriversDownTimeRate(data?.DriverDowntimeRate || "0.0"));
    dispatch(setDriversDownTimeDriver(data?.DriverDowntimeAmount || "0.0"));

    dispatch(setInvoiceDownTimeHours(data?.InvoiceDowntimeHours || "0.0"));
    dispatch(setInvoiceDownTimeRate(data?.InvoiceDowntimeRate || "0.0"));
    dispatch(setInvoiceDownTimeInvoice(data?.InvoiceDowntimeAmount || "0.0"));

    dispatch(setPermitsDrivers(data?.DriverPermits || "0.0"));
    dispatch(setPermitsInvoice(data?.InvoicePermits || "0.0"));

    dispatch(setTollsDrivers(data?.DriverTolls || "0.0"));
    dispatch(setTollsInvoice(data?.InvoiceTolls || "0.0"));

    dispatch(setFuelCreditDriver(data?.DriverFuelCredit || "0.0"));
    dispatch(setFuelCreditGallons(data?.DriverFuelGallons || "0.0"));
    dispatch(setFuelCreditPrice(data?.FuelPricePerGallon || "0.0"));

    dispatch(setSecondDriverDriver(data?.NextDriverFuelCharge || ""));
    dispatch(setSecondDriverGallons(data?.NextDriverFuelGallons || "0.0"));
    dispatch(
      setSecondDriverPrice(Number(data?.NextDriverFuelCharge) / Number(data?.NextDriverFuelGallons) || "0.0")
    );

    dispatch(setDriverAdditionalDriver(data?.DriverFlatrate || "0.0"));
    data?.DriverFlatrated
      ? dispatch(setDriverAdditionalMiles("0.0"))
      : dispatch(setDriverAdditionalMiles(data?.DriverMiles || "0.0"));
    !data?.DriverFlatrated
      ? dispatch(setDriverAdditionalRate(Number(data?.DriverFlatrate) / Number(data?.DriverMiles) || "0.0"))
      : dispatch(setDriverAdditionalRate("0.0"));

    dispatch(setInvoiceAdditionalInvoice(data?.InvoiceFlatrate || "0.0"));
    !data?.InvoiceFlatrated
      ? dispatch(setInvoiceAdditionalMiles(data?.InvoiceMiles || "0.0"))
      : dispatch(setInvoiceAdditionalMiles("0.0"));
    !data?.InvoiceFlatrated
      ? dispatch(setInvoiceAdditionalRate(Number(data?.InvoiceFlatrate) / Number(data?.InvoiceMiles) || "0.0"))
      : dispatch(setInvoiceAdditionalRate("0.0"));

    dispatch(setInvoiceFlatrated(data?.InvoiceFlatrated || false));
    dispatch(setDriverFlatrated(data?.DriverFlatrated || false));

    dispatch(setDriverPaid(data?.DriverPaid || false));
    dispatch(setInvoiced(data?.Invoiced || false));
    dispatch(setDispatchFK(data?.DispatchFK || null));
    dispatch(setUnitFK(data?.UnitFK || null));
    dispatch(setData(data));
    setMotorized(data?.Motorized || false);
  };

  const populateForNew = () => {
    setLoading(true);
    DelayUnitExpenseService.getData("New", delayedUnitId, delayedUnitExpsnseId, breakdownFK, {})
      .then(({ data }) => {
        if (data?.ErrorCode === "0") {
          dispatch(setDriverName(data?.DriverName));
          dispatch(setDriverFK(data?.DriverFK));
          dispatch(setBreakdownFeeDriver(data?.DriverBreakdownFee || "0.0"));
          dispatch(setBreakdownFeeInvoice(data?.InvoiceBreakdownFee || "0.0"));
          dispatch(setDriversDownTimeRate(data?.DriverDowntimeRate || "0.0"));
          dispatch(setInvoiceDownTimeRate(data?.InvoiceDowntimeRate || "0.0"));
          dispatch(setDispatchFK(data?.DispatchFK || null));
          dispatch(setUnitFK(data?.UnitFK || null));
          setAtPickUp(data?.AtPickup);
          setInYard(data?.Inyard);
          setDriverReleased(data?.DriverReleased);
          setInvoiceFlatrated(data?.InvoiceFlatRate);
          setDriverFlatrated(data?.DriverFlatRate);
          setMotorized(data?.Motorized);
        }
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (delayedUnitExpsnseId && viewDetail) {
      dispatch(setViewDetail(true));
      populateForEdit();
    } else {
      dispatch(setViewDetail(false));
      populateForNew();
    }
  }, []);

  useEffect(() => {
    if (viewDetail && delayedUnitExpsnseId && data) {
      setEditData(data);
    }
  }, [viewDetail]);

  useEffect(() => {
    if (
      isValidDecimalInput(invoiceDownTimeInvoice, 5, 2) &&
      isValidDecimalInput(driversDownTimeDriver, 5, 2) &&
      isValidDecimalInput(fuelCreditDriver, 5, 2) &&
      isValidDecimalInput(secondDriverDriver, 5, 2) &&
      isValidDecimalInput(driverAdditionalDriver, 5, 2) &&
      isValidDecimalInput(invoiceAdditionalInvoice, 5, 2) &&
      (attemptedPickupAuthorizedBy ||
        ((!attemptedPickupDriver || attemptedPickupDriver === "0" || attemptedPickupDriver === "0.0") &&
          (!attemptedPickupInvoice || attemptedPickupInvoice === "0" || attemptedPickupInvoice === "0.0")))
    ) {
      dispatch(setIsValid(false));
    } else {
      dispatch(setIsValid(true));
    }
  }, [
    invoiceAdditionalInvoice,
    driverAdditionalDriver,
    attemptedPickupDriver,
    attemptedPickupInvoice,
    attemptedPickupAuthorizedBy,
    driversDownTimeDriver,
    invoiceDownTimeInvoice,
    fuelCreditDriver,
    secondDriverDriver,
  ]);

  return (
    <Form>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border halfScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="mx-0 p-0 mt-2">
                <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-2">
                  <Col Col xs={3} md={3} sm={3} className="p-0 " />
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">First Driver</Form.Label>
                  </Col>
                  <Col Col xs={1} md={1} sm={1} className="p-0 " />
                  <Col xs={3} md={3} sm={3} className="p-0 ">
                    <input
                      name="label"
                      id="label"
                      type="text"
                      className={`customFormControl ${""}`}
                      maxLength={160}
                      value={driverName}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mx-0 p-0 mt-2">
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} />
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <Form.Label className="customColFormLabel ms-1">Hours</Form.Label>
                  </div>
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <Form.Label className="customColFormLabel ms-1">Rate</Form.Label>
                  </div>
                  <div className="d-flex flex-shrink-0 w-120px">
                    <Form.Label className="customColFormLabel ms-1">Invoice</Form.Label>
                  </div>
                  <div className="d-flex flex-shrink-0 w-120px">
                    <Form.Label className="customColFormLabel ms-1">Driver</Form.Label>
                  </div>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Invoice Downtime</Form.Label>
                  </Col>
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(invoiceDownTimeInvoice, 5, 2) ? "" : "borderRed"}`}
                      maxLength={3}
                      value={invoiceDownTimeHours}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || invoiced}
                      onChange={({ target }) => {
                        if (isValidInteger(target.value, 3)) {
                          dispatchMultipliedValue(
                            target.value,
                            invoiceDownTimeRate,
                            setInvoiceDownTimeInvoice
                          );
                          dispatch(setInvoiceDownTimeHours(target.value));
                        }
                      }}
                    />
                  </div>

                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(invoiceDownTimeInvoice, 5, 2) ? "" : "borderRed"}`}
                      maxLength={6}
                      value={invoiceDownTimeRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || invoiced}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 3, 2)) {
                          dispatchMultipliedValue(
                            invoiceDownTimeHours,
                            target.value,
                            setInvoiceDownTimeInvoice
                          );
                          dispatch(setInvoiceDownTimeRate(target.value));
                        }
                      }}
                    />
                  </div>

                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl `}
                      maxLength={8}
                      value={invoiceDownTimeInvoice}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setInvoiceDownTimeInvoice(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Drivers Downtime</Form.Label>
                  </Col>
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(driversDownTimeDriver, 5, 2) ? "" : "borderRed"}`}
                      maxLength={3}
                      value={driversDownTimeHours}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || driverPaid || !driverFK}
                      onChange={({ target }) => {
                        if (isValidInteger(target.value, 3)) {
                          dispatchMultipliedValue(
                            target.value,
                            driversDownTimeRate,
                            setDriversDownTimeDriver
                          );
                          dispatch(setDriversDownTimeHours(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(driversDownTimeDriver, 5, 2) ? "" : "borderRed"}`}
                      maxLength={6}
                      value={driversDownTimeRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || driverPaid || !driverFK}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 3, 2)) {
                          dispatchMultipliedValue(
                            driversDownTimeHours,
                            target.value,
                            setDriversDownTimeDriver
                          );
                          dispatch(setDriversDownTimeRate(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className="d-flex flex-shrink-0 w-120px hide-elements" />
                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl `}
                      maxLength={8}
                      value={driversDownTimeDriver}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setDriversDownTimeDriver(target.value));
                        }
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Attempted Pickup</Form.Label>
                  </Col>
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />

                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${""}`}
                      maxLength={8}
                      value={attemptedPickupInvoice}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || atPickUp || !driverReleased || invoiced}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setAttemptedPickupInvoice(target.value));
                        }
                      }}
                    />
                  </div>

                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl ${""}`}
                      maxLength={8}
                      value={attemptedPickupDriver}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || atPickUp || !driverReleased || driverPaid || !driverFK}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setAttemptedPickupDriver(target.value));
                        }
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Attempted Pickup Authorized By</Form.Label>
                  </Col>
                  <div className="d-flex flex-shrink-0 w-250">
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${(!(attemptedPickupDriver?.trim() || attemptedPickupDriver === "0" || attemptedPickupDriver === "0.0") || !(attemptedPickupInvoice?.trim() || attemptedPickupInvoice === "0" || attemptedPickupInvoice === "0.0")) && !attemptedPickupAuthorizedBy && !viewDetail ? "borderRed" : ""}`}
                      maxLength={30}
                      value={attemptedPickupAuthorizedBy}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={
                        viewDetail || atPickUp || !driverReleased || (driverPaid && invoiced) || !driverFK
                      }
                      onChange={({ target }) => {
                        dispatch(setAttemptedPickupAuthorizedBy(target.value));
                      }}
                    />
                  </div>

                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Permits</Form.Label>
                  </Col>
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />

                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${""}`}
                      maxLength={8}
                      value={permitsInvoice}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || atPickUp || inYard || invoiced}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setPermitsInvoice(target.value));
                        }
                      }}
                    />
                  </div>

                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl ${""}`}
                      maxLength={8}
                      value={permitsDrivers}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || inYard || atPickUp || driverPaid || !driverFK}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setPermitsDrivers(target.value));
                        }
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Tolls</Form.Label>
                  </Col>
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />

                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${""}`}
                      maxLength={8}
                      value={tollsInvoice}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || atPickUp || inYard || invoiced}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setTollsInvoice(target.value));
                        }
                      }}
                    />
                  </div>

                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl ${""}`}
                      maxLength={8}
                      value={tollsDrivers}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || atPickUp || inYard || driverPaid || !driverFK}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setTollsDrivers(target.value));
                        }
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} />
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <Form.Label className="customColFormLabel ms-1">Gallons</Form.Label>
                  </div>
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <Form.Label className="customColFormLabel ms-1">Price</Form.Label>
                  </div>
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Fuel Credit</Form.Label>
                  </Col>
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(fuelCreditDriver, 5, 2) ? "" : "borderRed"}`}
                      maxLength={5}
                      value={fuelCreditGallons}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || !motorized || driverPaid || driverReleased || !driverFK}
                      onChange={({ target }) => {
                        if (isValidInteger(3, target.value)) {
                          dispatchMultipliedValue(target.value, fuelCreditPrice, setFuelCreditDriver);
                          dispatch(setFuelCreditGallons(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(fuelCreditDriver, 5, 2) ? "" : "borderRed"}`}
                      maxLength={6}
                      value={fuelCreditPrice}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || !motorized || driverPaid || driverReleased || !driverFK}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 3, 2)) {
                          dispatchMultipliedValue(fuelCreditGallons, target.value, setFuelCreditDriver);
                          dispatch(setFuelCreditPrice(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className="d-flex flex-shrink-0 w-120px hide-elements" />
                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl `}
                      maxLength={8}
                      value={fuelCreditDriver}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setFuelCreditDriver(target.value));
                        }
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Second Driver Fuel Charge</Form.Label>
                  </Col>
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(secondDriverDriver, 5, 2) ? "" : "borderRed"}`}
                      maxLength={5}
                      value={secondDriverGallons}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || !motorized || driverPaid || driverReleased || !driverFK}
                      onChange={({ target }) => {
                        if (isValidInteger(3, target.value)) {
                          dispatchMultipliedValue(target.value, secondDriverPrice, setSecondDriverDriver);
                          dispatch(setSecondDriverGallons(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className={`d-flex flex-shrink-0 w-100px`}>
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(secondDriverDriver, 5, 2) ? "" : "borderRed"}`}
                      maxLength={6}
                      value={secondDriverPrice}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || !motorized || driverPaid || driverReleased || !driverFK}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 3, 2)) {
                          dispatchMultipliedValue(secondDriverGallons, target.value, setSecondDriverDriver);
                          dispatch(setSecondDriverPrice(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className="d-flex flex-shrink-0 w-120px hide-elements" />
                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl `}
                      maxLength={8}
                      value={secondDriverDriver}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setSecondDriverDriver(target.value));
                        }
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} />
                  <div className={`d-flex flex-shrink-0 w-100px ${1 > 0 || 2 > 0 ? "" : "hide-elements"}`}>
                    <Form.Label className="customColFormLabel ms-1">Miles</Form.Label>
                  </div>
                  <div className={`d-flex flex-shrink-0 w-100px ${1 > 0 || 2 > 0 ? "" : "hide-elements"}`}>
                    <Form.Label className="customColFormLabel ms-1">Rate</Form.Label>
                  </div>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Invoice Additional Miles</Form.Label>
                  </Col>
                  <div className={`d-flex flex-shrink-0 w-100px ${2 > 0 ? "" : "hide-elements"}`}>
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(invoiceAdditionalInvoice, 5, 2) ? "" : "borderRed"}`}
                      maxLength={5}
                      value={invoiceAdditionalMiles}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || invoiced || invoiceFlatrated}
                      onChange={({ target }) => {
                        if (isValidInteger(target.value, 3)) {
                          dispatchMultipliedValue(
                            target.value,
                            invoiceAdditionalRate,
                            setInvoiceAdditionalInvoice
                          );
                          dispatch(setInvoiceAdditionalMiles(target.value));
                        }
                      }}
                    />
                  </div>

                  <div className={`d-flex flex-shrink-0 w-100px ${1 > 0 ? "" : "hide-elements"}`}>
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(invoiceAdditionalInvoice, 5, 2) ? "" : "borderRed"}`}
                      maxLength={30}
                      value={invoiceAdditionalRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || invoiced || invoiceFlatrated}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 3, 2)) {
                          dispatchMultipliedValue(
                            invoiceAdditionalMiles,
                            target.value,
                            setInvoiceAdditionalInvoice
                          );
                          dispatch(setInvoiceAdditionalRate(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl `}
                      maxLength={30}
                      value={invoiceAdditionalInvoice}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || invoiced || !invoiceFlatrated}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setInvoiceAdditionalInvoice(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Driver Additional Miles</Form.Label>
                  </Col>
                  <div className={`d-flex flex-shrink-0 w-100px ${1 > 0 ? "" : "hide-elements"}`}>
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(driverAdditionalDriver, 5, 2) ? "" : "borderRed"}`}
                      maxLength={5}
                      value={driverAdditionalMiles}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || driverFlatrated || driverPaid || !driverFK}
                      onChange={({ target }) => {
                        if (isValidInteger(target.value, 3)) {
                          dispatchMultipliedValue(
                            target.value,
                            driverAdditionalRate,
                            setDriverAdditionalDriver
                          );
                          dispatch(setDriverAdditionalMiles(target.value));
                        }
                      }}
                    />
                  </div>

                  <div className={`d-flex flex-shrink-0 w-100px ${2 > 0 ? "" : "hide-elements"}`}>
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${isValidDecimalInput(driverAdditionalDriver, 5, 2) ? "" : "borderRed"}`}
                      maxLength={30}
                      value={driverAdditionalRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || driverPaid || driverFlatrated || !driverFK}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 3, 2)) {
                          dispatchMultipliedValue(
                            driverAdditionalMiles,
                            target.value,
                            setDriverAdditionalDriver
                          );
                          dispatch(setDriverAdditionalRate(target.value));
                        }
                      }}
                    />
                  </div>
                  <div className="d-flex flex-shrink-0 w-120px hide-elements" />
                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl `}
                      maxLength={30}
                      value={driverAdditionalDriver}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || driverPaid || !driverFlatrated || !driverFK}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setDriverAdditionalDriver(target.value));
                        }
                      }}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Breakdown Fee</Form.Label>
                  </Col>
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />
                  <div className="d-flex flex-shrink-0 w-100px hide-elements" />

                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="invoiceMiles"
                      id="invoiceMiles"
                      type="text"
                      className={`customFormControl ${""}`}
                      maxLength={8}
                      value={breakdownFeeInvoice}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || invoiced}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setBreakdownFeeInvoice(target.value));
                        }
                      }}
                    />
                  </div>

                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      name="customer"
                      id="customer"
                      type="text"
                      className={`customFormControl ${""}`}
                      maxLength={8}
                      value={breakdownFeeDriver}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || driverPaid || !driverFK}
                      onChange={({ target }) => {
                        if (isValidDecimalInput(target.value, 5, 2)) {
                          dispatch(setBreakdownFeeDriver(target.value));
                        }
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group
                  className={`form-group align-items-center row m-l-0 m-r-0 mb-2 ${viewDetail ? "" : "visibility-hidden"}`}
                >
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Invoiced</Form.Label>
                  </Col>
                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      type="checkbox"
                      value="excel"
                      checked={invoiced}
                      className="form-check-input"
                      disabled
                    />
                  </div>
                </Form.Group>
                <Form.Group
                  className={`form-group align-items-center row m-l-0 m-r-0 mb-2 ${viewDetail ? "" : "visibility-hidden"}`}
                >
                  <Col xs={4} className="text-end">
                    <Form.Label className="customColFormLabel">Driver Paid</Form.Label>
                  </Col>
                  <div className="d-flex flex-shrink-0 w-120px">
                    <input
                      type="checkbox"
                      value="excel"
                      checked={driverPaid}
                      className="form-check-input"
                      disabled
                    />
                  </div>
                </Form.Group>
              </Row>
            </div>
            {loading && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default DelayUnitExpenseContent;
