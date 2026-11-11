import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerDealer,
  setCustomerStoreCode,
  setValidGeneralTab,
} from "../../../../../redux/EditCustomerDealerSlice";
import { useEffect } from "react";
import PcMilerService from "../../../../../services/PcMilerService";
import toast from "react-hot-toast";
import PcMilerCalculation from "../../../../../components/common/pcMilerCalculation";

function CustomerDelaerEditGeneral() {
  const dispatch = useDispatch();

  const [invoiceMiles, setInvoiceMiles] = useState("");
  const [loader, setLoader] = useState(false);
  const [driverMiles, setDriverMiles] = useState("");
  const [invoiceMilesLowboy, setInvoiceMilesLowboy] = useState("");
  const [driverMilesLowboy, setDriverMilesLowboy] = useState("");
  const [invoiceTolls, setInvoiceTolls] = useState("");
  const [invoicePermits, setInvoicePermits] = useState("");
  const [invoiceWash, setInvoiceWash] = useState("");
  const [driverTolls, setDriverTolls] = useState("");
  const [driverPermits, setDriverPermits] = useState("");
  const [driverWash, setDriverWash] = useState("");
  const [notes, setNotes] = useState("");
  const [fODDealer, setFODDealer] = useState(false);
  const [doNotWash, setDoNotWash] = useState(false);
  const [useDefinedRuote, setUseDefinedRuote] = useState(false);
  const [outboundFlagsAndSigns, setOutboundFlagsAndSigns] = useState(false);
  const [changeDriverMiles, setChangeDriverMiles] = useState(true);
  const [changeDriverMilesLowboy, setChangeDriverMilesLowboy] = useState(true);

  const dealerCity = useSelector((state) => state.editcustomerDealers.dealerCity);
  const dealerStateCode = useSelector((state) => state.editcustomerDealers.dealerStateCode);
  const customerCity = useSelector((state) => state.editcustomerDealers.customerCity);
  const customerStateCode = useSelector((state) => state.editcustomerDealers.customerStateCode);
  const dstCity = useSelector((state) => state.editcustomerDealers.dstCity);
  const dstStateCode = useSelector((state) => state.editcustomerDealers.dstStateCode);
  const dealerName = useSelector((state) => state.editcustomerDealers.dealerName);
  const selectionGroup = useSelector((state) => state.editcustomerDealers.selectionGroup);
  const selectionName = useSelector((state) => state.editcustomerDealers.selectionName);
  const customerDealer = useSelector((state) => state.editcustomerDealers.customerDealerData);
  const customerStoreCode = useSelector((state) => state.editcustomerDealers.customerStoreCode);
  const decimalNumericRegex = /^\d{0,5}(\.\d{0,2})?$/;
  const numericRegex = /^([0-9]\d*)$/;
  const leadingZero = /^0+/;
  const onlyZeros = /^(0+)$/;

  const editDetails = useSelector((state) => state.editcustomerDealers.editDetails);

  const ChangeData = () => {
    dispatch(
      setCustomerDealer({
        invoiceMiles: invoiceMiles,
        driverMiles: driverMiles,
        driverMilesLowboy: driverMilesLowboy,
        invoiceMilesLowboy: invoiceMilesLowboy,
        invoiceTollsAmount: invoiceTolls,
        invoicePermitsAmount: invoicePermits,
        invoiceWashAmount: invoiceWash,
        driverTollsAmount: driverTolls,
        driverPermitsAmount: driverPermits,
        driverWashAmount: driverWash,
        foddealer: fODDealer,
        doNotWash: doNotWash,
        useDefinedRoute: useDefinedRuote,
        outboundFlagsAndSigns: outboundFlagsAndSigns,
        notes: notes,
      })
    );
  };

  const calculateDistance = () => {
    let pickupDeliverylocation = {
      src: {
        city: dealerCity || "",
        stateCode: dealerStateCode || "",
      },
      dst: {
        city: customerCity || "",
        stateCode: customerStateCode || "",
      },
    };
    setLoader(true);
    PcMilerService.calculateDistance(pickupDeliverylocation)
      .then((res) => {
        if (res != null && res?.data !== "") {
          const data = res?.data;
          let distance = data?.distance ? Math.round(data?.distance) : 0;
          setDriverMiles(distance);
          setInvoiceMiles(distance);
          setLoader(false);
        }
      })
      .catch((err) => {
        toast.error("PC Miler is not available");
        setLoader(false);
      });
  };

  useEffect(() => {
    ChangeData();
  }, [
    invoiceMiles,
    driverMiles,
    invoiceMilesLowboy,
    driverMilesLowboy,
    invoiceTolls,
    invoicePermits,
    invoiceWash,
    driverTolls,
    driverPermits,
    driverWash,
    fODDealer,
    doNotWash,
    useDefinedRuote,
    outboundFlagsAndSigns,
    notes,
  ]);

  useEffect(() => {
    if (customerDealer && customerDealer?.length !== 0) {
      setInvoiceMiles(customerDealer.invoiceMiles);
      setDriverMiles(customerDealer.driverMiles);
      if (customerDealer.invoiceTollsAmount === 0 || customerDealer.invoiceTollsAmount === "0") {
        setInvoiceTolls("0.0");
      } else {
        setInvoiceTolls(customerDealer.invoiceTollsAmount || "0.0");
      }
      if (customerDealer.invoicePermitsAmount === 0 || customerDealer.invoicePermitsAmount === "0") {
        setInvoicePermits("0.0");
      } else {
        setInvoicePermits(customerDealer.invoicePermitsAmount || "0.0");
      }
      if (customerDealer.invoiceWashAmount === 0 || customerDealer.invoiceWashAmount === "0") {
        setInvoiceWash("0.0");
      } else {
        setInvoiceWash(customerDealer.invoiceWashAmount);
      }
      if (customerDealer.driverTollsAmount === 0 || customerDealer.driverTollsAmount === "0") {
        setDriverTolls("0.0");
      } else {
        setDriverTolls(customerDealer.driverTollsAmount || "0.0");
      }
      if (customerDealer.driverPermitsAmount === 0 || customerDealer.driverPermitsAmount === "0") {
        setDriverPermits("0.0");
      } else {
        setDriverPermits(customerDealer.driverPermitsAmount || "0.0");
      }
      if (customerDealer.driverWashAmount === 0 || customerDealer.driverWashAmount === "0") {
        setDriverWash("0.0");
      } else {
        setDriverWash(customerDealer.driverWashAmount || "0.0");
      }
      setInvoiceMilesLowboy(customerDealer.invoiceMilesLowboy ? customerDealer.invoiceMilesLowboy : "");
      setDriverMilesLowboy(customerDealer.driverMilesLowboy ? customerDealer.driverMilesLowboy : "");
      setNotes(customerDealer.notes);
      setFODDealer(customerDealer.foddealer);
      setDoNotWash(customerDealer.doNotWash);
      setOutboundFlagsAndSigns(customerDealer.outboundFlagsAndSigns);
      setUseDefinedRuote(customerDealer.useDefinedRoute);
    } else {
    }
  }, [customerDealer, editDetails]);

  useEffect(() => {
    if (!(invoiceMiles < 0 || invoiceMiles)) {
      dispatch(setValidGeneralTab(false));
    } else if (!(driverMiles < 0 || driverMiles)) {
      dispatch(setValidGeneralTab(false));
    } else if (driverMilesLowboy && Number(driverMilesLowboy) < Number(driverMiles)) {
      dispatch(setValidGeneralTab(false));
    } else if (invoiceMilesLowboy && Number(invoiceMilesLowboy) < Number(invoiceMiles)) {
      dispatch(setValidGeneralTab(false));
    } else if (
      String(invoiceTolls)?.endsWith(".") ||
      String(invoicePermits)?.endsWith(".") ||
      String(invoiceWash)?.endsWith(".") ||
      String(driverTolls)?.endsWith(".") ||
      String(driverPermits)?.endsWith(".") ||
      String(driverWash)?.endsWith(".")
    ) {
      dispatch(setValidGeneralTab(false));
    } else {
      dispatch(setValidGeneralTab(true));
    }
  }, [
    invoiceMiles,
    driverMiles,
    invoiceMilesLowboy,
    driverMilesLowboy,
    invoicePermits,
    invoiceTolls,
    driverPermits,
    driverTolls,
    driverWash,
    invoiceWash,
  ]);

  useEffect(() => {
    if (!(driverMiles === "0" || driverMiles === "" || driverMiles === 0)) {
      setChangeDriverMiles(true);
    }
  }, []);

  useEffect(() => {
    if (!(driverMilesLowboy === "0" || driverMilesLowboy === "" || driverMilesLowboy === 0)) {
      setChangeDriverMilesLowboy(true);
    }
  }, []);

  return (
    <div className="px-3 py-2 d-flex">
      <div className="col-6">
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label ">Dealer</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0">
            <input
              className="customFormControl"
              name=""
              type="text"
              maxLength={30}
              autoComplete="off"
              value={dealerName}
              disabled={true}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label w-100 pe-5">{selectionGroup}</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0">
            <input
              className="customFormControl"
              name="description"
              type="text"
              maxLength={30}
              autoComplete="off"
              disabled={true}
              value={selectionName}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Invoice Miles</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl ${
                editDetails
                  ? !numericRegex.test(invoiceMiles) || invoiceMiles <= 0
                    ? "borderRed"
                    : "borderGreen"
                  : "borderBlack"
              }`}
              name="description"
              type="text"
              maxLength={9}
              autoComplete="off"
              value={invoiceMiles}
              onChange={(e) => {
                const temp = e.target.value;
                if (driverMiles === "" || driverMiles === "0" || driverMiles === 0) {
                  setChangeDriverMiles(true);
                }

                if (numericRegex.test(e.target.value) || e.target.value === "") {
                  if (onlyZeros.test(e.target.value)) {
                    setInvoiceMiles(e.target.value);
                  } else if (leadingZero.test(e.target.value)) {
                    const newValue = e.target.value?.replace(/^0+/, "");
                    setInvoiceMiles(newValue);
                  } else {
                    setInvoiceMiles(e.target.value);
                  }
                }
                if (changeDriverMiles) {
                  if (temp > driverMiles) {
                    setDriverMiles(temp);
                  } else {
                    setChangeDriverMiles(false);
                  }
                }
              }}
              disabled={!editDetails}
            />
          </Col>
          <Col className="p-0 ms-4" xs={1} md={1} sm={1}>
            <PcMilerCalculation
              calculateService={PcMilerService.calculateDistance}
              className="w-80px"
              payload={{
                src: {
                  city: dealerCity || "",
                  stateCode: dealerStateCode || "",
                },
                dst: {
                  city: dstCity || "",
                  stateCode: dstStateCode || "",
                },
              }}
              disabled={!editDetails || selectionGroup === "Plant Group"}
              onSuccess={(distance) => {
                setDriverMiles(distance);
                setInvoiceMiles(distance);
              }}
              onError={(err) => {
                console.log("errr", err);
                toast.error("PC Miler is not available");
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Invoice Miles Lowboy</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl
                ${
                  editDetails
                    ? invoiceMilesLowboy && invoiceMiles
                      ? Number(invoiceMilesLowboy) >= Number(invoiceMiles)
                        ? ""
                        : "borderRed"
                      : ""
                    : ""
                }
                `}
              type="text"
              maxLength={9}
              autoComplete="off"
              value={invoiceMilesLowboy}
              disabled={!editDetails}
              onChange={(e) => {
                const temp = e.target.value;
                if (driverMilesLowboy === "" || driverMilesLowboy === "0" || driverMilesLowboy === 0) {
                  setChangeDriverMilesLowboy(true);
                }
                if (numericRegex.test(e.target.value) || e.target.value === "") {
                  if (onlyZeros.test(e.target.value)) {
                    setInvoiceMilesLowboy(e.target.value);
                  } else if (leadingZero.test(e.target.value)) {
                    const newValue = e.target.value?.replace(/^0+/, "");
                    setInvoiceMilesLowboy(newValue);
                  } else {
                    setInvoiceMilesLowboy(e.target.value);
                  }
                  if (changeDriverMilesLowboy) {
                    if (temp > driverMilesLowboy) {
                      setDriverMilesLowboy(temp);
                    } else {
                      setChangeDriverMilesLowboy(false);
                    }
                  }
                }
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Driver Miles</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl ${
                editDetails
                  ? !numericRegex.test(driverMiles) || driverMiles <= 0
                    ? "borderRed"
                    : "borderGreen"
                  : "borderBlack"
              }`}
              name="description"
              type="text"
              maxLength={9}
              autoComplete="off"
              value={driverMiles}
              onChange={(e) => {
                setChangeDriverMiles(false);
                if (numericRegex.test(e.target.value) || e.target.value === "") {
                  if (onlyZeros.test(e.target.value)) {
                    setDriverMiles(e.target.value);
                  } else if (leadingZero.test(e.target.value)) {
                    const newValue = e.target.value?.replace(/^0+/, "");
                    setDriverMiles(newValue);
                  } else {
                    setDriverMiles(e.target.value);
                  }
                  if (e.target.value === "" || e.target.value === "0" || e.target.value === 0) {
                    setChangeDriverMiles(true);
                  }
                }
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Driver Miles Lowboy</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl
             ${
               editDetails
                 ? driverMilesLowboy && driverMiles
                   ? Number(driverMilesLowboy) >= Number(driverMiles)
                     ? ""
                     : "borderRed"
                   : " "
                 : ""
             }
           
                `}
              type="text"
              maxLength={9}
              autoComplete="off"
              value={driverMilesLowboy}
              disabled={!editDetails}
              onChange={(e) => {
                setChangeDriverMilesLowboy(false);
                if (numericRegex.test(e.target.value) || e.target.value === "") {
                  if (onlyZeros.test(e.target.value)) {
                    setDriverMilesLowboy(e.target.value);
                  } else if (leadingZero.test(e.target.value)) {
                    const newValue = e.target.value?.replace(/^0+/, "");
                    setDriverMilesLowboy(newValue);
                  } else {
                    setDriverMilesLowboy(e.target.value);
                  }
                  if (e.target.value === "" || e.target.value === "0") {
                    setChangeDriverMilesLowboy(true);
                  }
                }
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Invoice Tolls</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl
                ${!editDetails || !String(invoiceTolls)?.endsWith(".") ? "" : "borderRed"}`}
              name="description"
              type="text"
              maxLength={10}
              autoComplete="off"
              value={invoiceTolls}
              onChange={(e) => {
                if (decimalNumericRegex.test(e.target.value) || e.target.value === "") {
                  if (e.target.value === ".") {
                    setInvoiceTolls("0.");
                  } else {
                    setInvoiceTolls(e.target.value);
                  }
                }
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Invoice Permits</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl
                ${!editDetails || !String(invoicePermits)?.endsWith(".") ? "" : "borderRed"}`}
              name="description"
              type="text"
              maxLength={10}
              autoComplete="off"
              value={invoicePermits}
              onChange={(e) => {
                if (decimalNumericRegex.test(e.target.value) || e.target.value === "") {
                  if (e.target.value === ".") {
                    setInvoicePermits("0.");
                  } else {
                    setInvoicePermits(e.target.value);
                  }
                }
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Invoice Wash</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl
                  ${!editDetails || !String(invoiceWash)?.endsWith(".") ? "" : "borderRed"}`}
              name="description"
              type="text"
              maxLength={10}
              autoComplete="off"
              value={invoiceWash}
              onChange={(e) => {
                if (decimalNumericRegex.test(e.target.value) || e.target.value === "") {
                  if (e.target.value !== "0") {
                    setInvoiceWash(e.target.value);
                  }
                }
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Driver Tolls</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl
                  ${!editDetails || !String(driverTolls)?.endsWith(".") ? "" : "borderRed"}`}
              name="description"
              type="text"
              maxLength={10}
              autoComplete="off"
              value={driverTolls}
              onChange={(e) => {
                if (decimalNumericRegex.test(e.target.value) || e.target.value === "") {
                  if (e.target.value !== "0") {
                    setDriverTolls(e.target.value);
                  }
                }
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Driver Permits</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl
                  ${!editDetails || !String(driverPermits)?.endsWith(".") ? "" : "borderRed"}`}
              name="description"
              type="text"
              maxLength={10}
              autoComplete="off"
              value={driverPermits}
              onChange={(e) => {
                if (decimalNumericRegex.test(e.target.value) || e.target.value === "") {
                  if (e.target.value !== "0") {
                    setDriverPermits(e.target.value);
                  }
                }
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Driver Wash</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl
                  ${!editDetails || !String(driverWash)?.endsWith(".") ? "" : "borderRed"}`}
              name="description"
              type="text"
              maxLength={10}
              autoComplete="off"
              value={driverWash}
              onChange={(e) => {
                if (decimalNumericRegex.test(e.target.value) || e.target.value === "") {
                  if (e.target.value !== "0") {
                    setDriverWash(e.target.value);
                  }
                }
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
      </div>
      <div className="col-6">
        <Form.Group className="mt-3  align-items-center row visibility-hidden m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label ">Driver</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0">
            <input
              className="customFormControl"
              name="description"
              type="text"
              maxLength={30}
              autoComplete="off"
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label w-100 pe-5">FOD Dealer</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0">
            <input
              type="checkbox"
              className="form-check-input p-0"
              id="bulkUnits"
              name="bulkUnits"
              checked={fODDealer}
              onChange={(e) => {
                setFODDealer(e.target.checked);
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label w-100 pe-5">Do Not Wash</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0">
            <input
              type="checkbox"
              className="form-check-input p-0"
              id="bulkUnits"
              name="bulkUnits"
              checked={doNotWash}
              onChange={(e) => {
                setDoNotWash(e.target.checked);
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label w-100 pe-5">Use Defined Route</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0">
            <input
              type="checkbox"
              className="form-check-input p-0"
              id="bulkUnits"
              name="bulkUnits"
              checked={useDefinedRuote}
              onChange={(e) => {
                setUseDefinedRuote(e.target.checked);
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label w-100 pe-5">Outbound Flags & Signs</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0">
            <input
              type="checkbox"
              className="form-check-input p-0"
              id="bulkUnits"
              name="bulkUnits"
              checked={outboundFlagsAndSigns}
              onChange={(e) => {
                setOutboundFlagsAndSigns(e.target.checked);
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label  w-100 pe-5">Customer Store Code</Form.Label>
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ minWidth: "77px" }}>
            <input
              className={`customFormControl`}
              name="customerStoreCode"
              type="text"
              maxLength={10}
              autoComplete="off"
              value={customerStoreCode}
              onInput={(e) => dispatch(setCustomerStoreCode(e.target.value))}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-5  align-items-start row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label w-100 pe-5">Notes</Form.Label>
          </Col>
          <Col xs={8} md={8} sm={8} className="p-0">
            <textarea
              name=""
              id=""
              cols="30"
              rows="14"
              className="w-100"
              value={notes}
              onChange={(e) => {
                if (e.target.value === " ") {
                  setNotes("");
                } else {
                  setNotes(e.target.value);
                }
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
      </div>
    </div>
  );
}

export default CustomerDelaerEditGeneral;
