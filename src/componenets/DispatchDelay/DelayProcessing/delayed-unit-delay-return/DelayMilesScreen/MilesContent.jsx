import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllDriversPayTaxable,
  setCreditCardArrayList,
  setReturnLocationUpdated,
  setReturnRateCalc,
  setMileBalance,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import toast from "react-hot-toast";

const MilesContent = () => {
  const returnDetails = useSelector((state) => state.delayProcessing.returnDetails);
  const miscPickupDetails = useSelector((state) => state.delayProcessing.miscPickupDetails);
  const miscDeliveryDetails = useSelector((state) => state.delayProcessing.miscDeliveryDetails);
  const returnRateCalc = useSelector((state) => state.delayProcessing.returnRateCalc);
  const delayReturnByDriver = useSelector((state) => state.delayProcessing.delayReturnByDriver);
  const allDriversPayTaxable = useSelector((state) => state.delayProcessing.allDriversPayTaxable);
  const data = useSelector((state) => state.delayProcessing.data);
  const returnLocationUpdated = useSelector((state) => state.delayProcessing.returnLocationUpdated);

  const [outboundInvoiceMiles, setoutboundInvoiceMiles] = useState();
  const [returnInvoiceMiles, setreturnInvoiceMiles] = useState();
  const [outboundDriverMiles, setoutboundDriverMiles] = useState();
  const [returnDriverMiles, setreturnDriverMiles] = useState();
  const [returnActive, setreturnActive] = useState(false);
  const [outboundInvoiceFlatrate, setoutboundInvoiceFlatrate] = useState();
  const [returnInvoiceFlatrate, setreturnInvoiceFlatrate] = useState();
  const [outboundDriverFlatrate, setoutboundDriverFlatrate] = useState();
  const [returnDriverFlatrate, setreturnDriverFlatrate] = useState();
  const [outboundtolls, setoutboundtolls] = useState();
  const [outboundpermits, setoutboundpermits] = useState();
  const [outboundother, setoutboundother] = useState();
  const [payRadioButton, setpayRadioButton] = useState("Pay");
  const [outboundOtherDesc, setoutboundOtherDesc] = useState();
  const [milesRatesDefaulted, setmilesRatesDefaulted] = useState();
  const [outboundRatesDefaulted, setoutboundRatesDefaulted] = useState();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (returnRateCalc) {
      setoutboundInvoiceMiles(returnRateCalc?.outboundInvoiceMiles);
      setreturnInvoiceMiles(returnRateCalc?.returnInvoiceMiles);
      setoutboundDriverMiles(returnRateCalc?.outboundDriverMiles);
      setreturnDriverMiles(returnRateCalc?.returnDriverMiles);
      !delayReturnByDriver && setreturnActive(returnRateCalc?.returnActive);
      setoutboundInvoiceFlatrate(returnRateCalc?.outboundInvoiceFlatrate);
      setreturnInvoiceFlatrate(returnRateCalc?.returnInvoiceFlatrate);
      setoutboundDriverFlatrate(returnRateCalc?.outboundDriverFlatrate);
      setreturnDriverFlatrate(returnRateCalc?.returnDriverFlatrate);
      setoutboundtolls(returnRateCalc?.outboundtolls);
      setoutboundpermits(returnRateCalc?.outboundpermits);
      setoutboundother(returnRateCalc?.outboundother);
      setpayRadioButton(returnRateCalc?.payRadioButton);
      setoutboundOtherDesc(returnRateCalc?.outboundOtherDesc);
    }
  }, []);

  useEffect(() => {
    // debugger;
    if (returnDetails?.dealerRefused && returnDetails?.isPickupLocationChecked) {
      setmilesRatesDefaulted(true);
    }
    if (returnLocationUpdated) {
      dispatch(setCreditCardArrayList([]));
      if (returnDetails?.dealerRefused && returnDetails?.isPickupLocationChecked) {
        setoutboundInvoiceMiles(data?.InvoiceMiles || 0);
        setreturnInvoiceMiles(data?.InvoiceMiles || 0);
        setmilesRatesDefaulted(true);
        setoutboundInvoiceFlatrate(data?.InvoiceFlatRate || 0);
        setreturnInvoiceFlatrate(data?.InvoiceReturnFlatRate || 0);
        setreturnDriverMiles(data?.DriverMiles || 0);
        setreturnDriverFlatrate(data?.DriverReturnFlatRate || 0);
        setoutboundDriverMiles(data?.DispatchMiles || 0);
        setoutboundDriverFlatrate(data?.DispatchFlatrate || 0);
        dispatch(setCreditCardArrayList([]));
      } else if (returnDetails?.dealerRefused && !returnDetails?.isPickupLocationChecked) {
        setoutboundInvoiceMiles(data?.InvoiceMiles || 0);
        setoutboundInvoiceFlatrate(data?.InvoiceFlatRate || 0);
        setoutboundDriverMiles(data?.DispatchMiles || 0);
        setoutboundDriverFlatrate(data?.DispatchFlatrate || 0);
        setoutboundRatesDefaulted(true);
        dispatch(setCreditCardArrayList([]));
        const from = (returnDetails?.city || "") + "," + (returnDetails?.stateCode || "");
        let to = null;
        if (miscDeliveryDetails) {
          to = (miscDeliveryDetails?.city || "") + "," + (miscDeliveryDetails?.stateCode || "");
        } else {
          to = (returnDetails?.pickupcity || "") + "," + (returnDetails?.pickupstatecode || "");
        }
        setLoading(true);
        DelayProcessingService.getDistance(from, to)
          .then((response) => {
            const distance = Math.round(Number(response?.data?.distance));
            setreturnInvoiceMiles(distance || 0);
            setreturnDriverMiles(distance || 0);
            const returnInvoiceFlatrate = prorateFlatrate(
              data?.InvoiceReturnFlatRate,
              data?.InvoiceMiles,
              Number(distance || 0)
            );

            const returnDriverFlatrate = prorateFlatrate(
              data?.DispatchFlatrate,
              data?.DispatchMiles,
              Number(distance || 0)
            );

            setreturnInvoiceFlatrate(returnInvoiceFlatrate || 0);
            setreturnDriverFlatrate(returnDriverFlatrate || 0);
          })
          .catch((error) => {
            toast.error("Error occured while fetching miles.");
            setreturnInvoiceFlatrate(0);
            setreturnDriverFlatrate(0);
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (!returnDetails?.dealerRefused) {
        let from = null;
        let to = null;
        if (miscDeliveryDetails) {
          const pickupunitaddress = miscDeliveryDetails;
          to = (pickupunitaddress.city || "") + "," + (pickupunitaddress.stateCode || "");
        } else {
          to = (returnDetails?.city || "") + "," + (returnDetails?.stateCode || "");
        }
        from = (data?.PickupCity || "") + "," + (data?.PickupStateCode || "");

        setLoading1(true);
        DelayProcessingService.getDistance(from, to)
          .then((response) => {
            const distance = Math.round(Number(response?.data?.distance));
            setoutboundInvoiceMiles(distance || 0);
            setoutboundDriverMiles(distance || 0);
            setoutboundInvoiceFlatrate(
              prorateFlatrate(data?.InvoiceFlatRate, data?.InvoiceMiles, Number(distance || 0))
            );
            setoutboundDriverFlatrate(
              prorateFlatrate(data?.DispatchFlatrate, data?.DispatchMiles, Number(distance || 0))
            );
          })
          .catch((error) => {
            toast.error("Error occured while fetching miles.");
            setoutboundInvoiceFlatrate(0);
            setoutboundDriverFlatrate(0);
          })
          .finally(() => {
            setLoading1(false);
          });
        if (miscDeliveryDetails) {
          to = (miscDeliveryDetails.city || "") + "," + (miscDeliveryDetails.stateCode || "");
        } else {
          to = (returnDetails?.pickupcity || "") + "," + (returnDetails?.pickupstatecode || "");
        }
        if (miscPickupDetails) {
          from = (miscPickupDetails?.city || "") + "," + (miscPickupDetails?.stateCode || "");
        } else {
          from = (returnDetails?.city || "") + "," + (returnDetails?.stateCode || "");
        }

        setLoading2(true);
        DelayProcessingService.getDistance(from, to)
          .then((response) => {
            const distance = Math.round(Number(response?.data?.distance));
            setreturnInvoiceMiles(distance || 0);
            setreturnDriverMiles(distance || 0);
            setreturnInvoiceFlatrate(
              prorateFlatrate(data?.InvoiceReturnFlatRate, data?.InvoiceMiles, Number(distance || 0))
            );

            setreturnDriverFlatrate(
              prorateFlatrate(data?.DriverReturnFlatRate, data?.DispatchMiles, Number(distance || 0))
            );
          })
          .catch((error) => {
            toast.error("Error occured while fetching miles.");
            setreturnInvoiceFlatrate(0);
            setreturnDriverFlatrate(0);
          })
          .finally(() => {
            setLoading2(false);
          });
      }
      if (returnDetails?.isPickupLocationChecked) {
        dispatch(setMileBalance(data?.DispatchMiles || 0));
      } else {
        let from = null;
        let to = null;
        to = (data?.PickupCity || "") + "," + (data?.PickupStateCode || "");
        if (miscPickupDetails) {
          from = (miscPickupDetails?.city || "") + "," + (miscPickupDetails?.stateCode || "");
        } else {
          from = (returnDetails?.city || "") + "," + (returnDetails?.stateCode || "");
        }

        setLoading2(true);
        DelayProcessingService.getDistance(from, to)
          .then((response) => {
            const distance = Math.round(Number(response?.data?.distance));
            dispatch(setMileBalance(distance || 0));
          })
          .catch(() => {
            dispatch(setMileBalance(0));
          })
          .finally(() => {
            setLoading2(false);
          });
      }
      setTimeout(() => {
        dispatch(setReturnLocationUpdated(false));
      }, 200);
    }
  }, []);

  const prorateFlatrate = (totalRate, totalMiles, usedMiles) => {
    if (!totalRate || !totalMiles || !usedMiles) return 0;
    return Math.round((totalRate / totalMiles) * usedMiles);
  };

  useEffect(() => {
    generalTabFormData();
  }, [
    outboundInvoiceMiles,
    returnInvoiceMiles,
    outboundDriverMiles,
    returnDriverMiles,
    returnActive,
    outboundInvoiceFlatrate,
    returnInvoiceFlatrate,
    outboundDriverFlatrate,
    returnDriverFlatrate,
    outboundtolls,
    outboundpermits,
    outboundother,
    outboundOtherDesc,
    payRadioButton,
  ]);

  const generalTabFormData = () => {
    dispatch(
      setReturnRateCalc({
        outboundInvoiceMiles: outboundInvoiceMiles,
        returnInvoiceMiles: returnInvoiceMiles,
        outboundDriverMiles: outboundDriverMiles,
        returnDriverMiles: returnDriverMiles,
        returnActive: returnActive,
        outboundInvoiceFlatrate: outboundInvoiceFlatrate,
        returnInvoiceFlatrate: returnInvoiceFlatrate,
        outboundDriverFlatrate: outboundDriverFlatrate,
        returnDriverFlatrate: returnDriverFlatrate,
        outboundtolls: outboundtolls,
        outboundpermits: outboundpermits,
        outboundother: outboundother,
        payRadioButton: payRadioButton,
        outboundOtherDesc: outboundOtherDesc,
      })
    );
  };

  useEffect(() => {
    if (!returnRateCalc && returnDetails?.dealerRefused) {
      setoutboundtolls("");
      setoutboundpermits("");
      setoutboundother("");
      setoutboundOtherDesc("");
      setpayRadioButton("Pay");
    }
  }, [returnRateCalc]);

  useEffect(() => {
    if (delayReturnByDriver) {
      setreturnActive(true);
    }
  }, [delayReturnByDriver]);

  useEffect(() => {
    DelayProcessingService.getpaytype()
      .then(({ data }) => {
        dispatch(setAllDriversPayTaxable(data));
      })
      .catch(() => {
        dispatch(setAllDriversPayTaxable(true));
      });
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-5">
          <Col sm={4} md={4} lg={4} xl={4} xs={4}>
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Outbound Invoice Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  onInput={(e) =>
                    e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/) && setoutboundInvoiceMiles(e.target.value)
                  }
                  className={`customFormControl ${
                    loading || loading1 || loading2 || milesRatesDefaulted || outboundRatesDefaulted
                      ? ""
                      : outboundInvoiceMiles === "." ||
                          /^\d*\.$/.test(outboundInvoiceMiles) ||
                          Number(outboundInvoiceMiles) <= 0
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  value={outboundInvoiceMiles}
                  disabled={milesRatesDefaulted || outboundRatesDefaulted}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Return Invoice Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  disabled={milesRatesDefaulted}
                  onInput={(e) =>
                    e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/) && setreturnInvoiceMiles(e.target.value)
                  }
                  className={`customFormControl ${
                    loading || loading1 || loading2 || milesRatesDefaulted || outboundRatesDefaulted
                      ? ""
                      : returnInvoiceMiles === "." ||
                          /^\d*\.$/.test(returnInvoiceMiles) ||
                          Number(returnInvoiceMiles) <= 0
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  value={returnInvoiceMiles}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Outbound Driver Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  disabled={milesRatesDefaulted || outboundRatesDefaulted}
                  onInput={(e) =>
                    e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/) && setoutboundDriverMiles(e.target.value)
                  }
                  className={`customFormControl ${
                    loading || loading1 || loading2 || milesRatesDefaulted || outboundRatesDefaulted
                      ? ""
                      : outboundDriverMiles === "." ||
                          /^\d*\.$/.test(outboundDriverMiles) ||
                          Number(outboundDriverMiles) <= 0
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  value={outboundDriverMiles}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Return Driver Miles</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="text"
                  disabled={milesRatesDefaulted}
                  onInput={(e) =>
                    e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/) && setreturnDriverMiles(e.target.value)
                  }
                  className={`customFormControl ${
                    loading || loading1 || loading2 || milesRatesDefaulted
                      ? ""
                      : returnDriverMiles === "." ||
                          /^\d*\.$/.test(returnDriverMiles) ||
                          Number(returnDriverMiles) <= 0
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  value={returnDriverMiles}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
              <Col sm={6} md={6} xs={6} className="p-0">
                <Form.Label className="col-form-label dealer-label">Return Active</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={returnActive}
                  disabled={delayReturnByDriver}
                  onChange={(e) => setreturnActive(e.target.checked)}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col sm={7} md={7} xs={7} className={`ps-lg-1`}>
            <Form.Group
              className={`mt-2 align-items-center row  m-l-0 m-r-0  ${!data?.InvoiceFlatRated ? "invisible" : ""}`}
            >
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Outbound Invoice Flatrate</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  type="text"
                  disabled={milesRatesDefaulted || outboundRatesDefaulted}
                  onInput={(e) => {
                    if (e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                      setoutboundInvoiceFlatrate(e.target.value);
                    }
                  }}
                  className={`customFormControl ${
                    loading || loading1 || loading2 || milesRatesDefaulted || outboundRatesDefaulted
                      ? ""
                      : outboundInvoiceFlatrate === "." ||
                          /^\d*\.$/.test(outboundInvoiceFlatrate) ||
                          Number(outboundInvoiceFlatrate) === 0
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  value={outboundInvoiceFlatrate}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group
              className={`mt-3 align-items-center row  m-l-0 m-r-0 ${!(Number(data?.InvoiceReturnRate) === 0) ? "invisible" : ""}`}
            >
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Return Invoice Flatrate</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  type="text"
                  disabled={milesRatesDefaulted}
                  onInput={(e) => {
                    if (e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                      dispatch(setCreditCardArrayList([]));
                      setreturnInvoiceFlatrate(e.target.value);
                    }
                  }}
                  className={`customFormControl ${
                    loading || loading1 || loading2 || milesRatesDefaulted
                      ? ""
                      : returnInvoiceFlatrate === "." ||
                          /^\d*\.$/.test(returnInvoiceFlatrate) ||
                          (Number(returnInvoiceFlatrate) === 0 && !milesRatesDefaulted)
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  value={returnInvoiceFlatrate}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-5 align-items-center row  m-l-0 m-r-0 ${!data?.DispatchFlatrated ? "invisible" : ""}`}
            >
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Outbound Driver Flatrate</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  type="text"
                  disabled={milesRatesDefaulted || outboundRatesDefaulted}
                  onInput={(e) =>
                    e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/) &&
                    setoutboundDriverFlatrate(e.target.value)
                  }
                  className={`customFormControl ${
                    loading || loading1 || loading2 || milesRatesDefaulted || outboundRatesDefaulted
                      ? ""
                      : outboundDriverFlatrate === "." ||
                          /^\d*\.$/.test(outboundDriverFlatrate) ||
                          Number(outboundDriverFlatrate) === 0
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  value={outboundDriverFlatrate}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-3 align-items-center row  m-l-0 m-r-0 ${!(Number(data?.DispatchReturnRate) === 0) ? "invisible" : ""}`}
            >
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Return Driver Flatrate</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  type="text"
                  disabled={milesRatesDefaulted}
                  onInput={(e) => {
                    if (e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                      setreturnDriverFlatrate(e.target.value);
                      dispatch(setCreditCardArrayList([]));
                    }
                  }}
                  className={`customFormControl ${
                    loading || loading1 || loading2 || milesRatesDefaulted
                      ? ""
                      : returnDriverFlatrate === "." ||
                          /^\d*\.$/.test(returnDriverFlatrate) ||
                          (Number(returnDriverFlatrate) === 0 && !milesRatesDefaulted)
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  value={returnDriverFlatrate}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Outbound Tolls</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  className={`customFormControl ${
                    outboundtolls === "." || /^\d*\.$/.test(outboundtolls) ? "borderRed" : ""
                  }`}
                  type="text"
                  onInput={(e) =>
                    e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/) && setoutboundtolls(e.target.value)
                  }
                  value={outboundtolls}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Outbound Permits</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  type="text"
                  onInput={(e) =>
                    e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/) && setoutboundpermits(e.target.value)
                  }
                  className={`customFormControl ${
                    outboundpermits === "." || /^\d*\.$/.test(outboundpermits) ? "borderRed" : ""
                  }`}
                  value={outboundpermits}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Outbound Other</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                <input
                  type="text"
                  onInput={(e) => {
                    if (e.target.value?.trim() === "") {
                      setoutboundOtherDesc("");
                    }
                    e.target.value.match(/^\d{0,5}(?:\.\d{0,2})?$/) && setoutboundother(e.target.value);
                  }}
                  className={`customFormControl ${
                    outboundother === "." || /^\d*\.$/.test(outboundother) ? "borderRed" : ""
                  }`}
                  value={outboundother}
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
              <Col xs={1} md={1} sm={1} className="p-r-0 w-10px">
                <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
              </Col>

              {!allDriversPayTaxable && (
                <Col xs={4} md={4} sm={4} className="p-0 d-flex align-items-center">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={payRadioButton}
                    onChange={(option) => {
                      setpayRadioButton(option);
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
                </Col>
              )}
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Outbound Other Description</Form.Label>
              </Col>
              <Col xs={8} md={8} sm={8} className="p-0 ">
                <input
                  type="text"
                  className={`customFormControl ${
                    !outboundother ? "" : !outboundOtherDesc ? "borderRed" : "borderGreen"
                  }`}
                  value={outboundOtherDesc}
                  onInput={(e) => {
                    setoutboundOtherDesc(e.target.value);
                  }}
                  maxLength={30}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {(loading || loading1 || loading2) && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MilesContent;
