import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerDealer, setValidFlatratesTab } from "../../../../../redux/EditCustomerDealerSlice";
import { useEffect } from "react";
import { useState } from "react";

function CustomerDelaerEditFlatRates() {
  const dispatch = useDispatch();

  const [invoiceOutbondMotorized, setInvoiceOutbondMotorized] = useState("0.00");
  const [invoiceOutbondTowableSingle, setInvoiceOutbondTowableSingle] = useState("0.00");
  const [invoiceOutbondTowableCDLA, setInvoiceOutbondTowableCDLA] = useState("0.00");
  const [invoiceOutbondTowable2Units, setInvoiceOutbondTowable2Units] = useState("0.00");
  const [invoiceOutbondTowableFlatbed, setInvoiceOutbondTowableFlatbed] = useState("0.00");
  const [driverOutbondMotorized, setDriverOutbondMotorized] = useState("0.00");
  const [driverOutbondTowableSingle, setDriverOutbondTowableSingle] = useState("0.00");
  const [driverOutbondTowableCDLA, setDriverOutbondTowableCDLA] = useState("0.00");
  const [driverOutbondTowable2Units, setDriverOutbondTowable2Units] = useState("0.00");
  const [driverOutbondTowableFlatbed, setDriverOutbondTowableFlatbed] = useState("0.00");
  const [invoiceReloadMotorized, setInvoiceReloadMotorized] = useState("0.00");
  const [invoiceReloadTowableSingle, setInvoiceReloadTowableSingle] = useState("0.00");
  const [invoiceReloadTowableCDLA, setInvoiceReloadTowableCDLA] = useState("0.00");
  const [invoiceReloadTowable2Units, setInvoiceReloadTowable2Units] = useState("0.00");
  const [invoiceReloadTowableFlatbed, setInvoiceReloadTowableFlatbed] = useState("0.00");
  const [driverReloadMotorized, setDriverReloadMotorized] = useState("0.00");
  const [driverReloadTowableSingle, setDriverReloadTowableSingle] = useState("0.00");
  const [driverReloadTowableCDLA, setDriverReloadTowableCDLA] = useState("0.00");
  const [driverReloadTowable2Units, setDriverReloadTowable2Units] = useState("0.00");
  const [driverReloadTowableFlatbed, setDriverReloadTowableFlatbed] = useState("0.00");

  const [invoiceReturnMotorized, setInvoiceReturnMotorized] = useState("0.00");
  const [invoiceReturnTowableSingle, setInvoiceReturnTowableSingle] = useState("0.00");
  const [invoiceReturnTowableCDLA, setInvoiceReturnTowableCDLA] = useState("0.00");
  const [invoiceReturnTowable2Units, setInvoiceReturnTowable2Units] = useState("0.00");
  const [invoiceReturnTowableFlatbed, setInvoiceReturnTowableFlatbed] = useState("0.00");
  const [driverReturnMotorized, setDriverReturnMotorized] = useState("0.00");
  const [driverReturnTowableSingle, setDriverReturnTowableSingle] = useState("0.00");
  const [driverReturnTowableCDLA, setDriverReturnTowableCDLA] = useState("0.00");
  const [driverReturnTowable2Units, setDriverReturnTowable2Units] = useState("0.00");
  const [driverReturnTowableFlatbed, setDriverReturnTowableFlatbed] = useState("0.00");

  const [maxDriverWash, setMaxDriverWash] = useState("0.00");
  const [maxDriverTolls, setMaxDriverTolls] = useState("0.00");
  const [maxDriverPermits, setMaxDriverPermits] = useState("0.00");
  const [commision, setCommision] = useState("0.00");

  const editDetails = useSelector((state) => state.editcustomerDealers.editDetails);
  const customerDealer = useSelector((state) => state.editcustomerDealers.customerDealerData);
  const askTolls = useSelector((state) => state.editcustomerDealers.askTolls);
  const askPermit = useSelector((state) => state.editcustomerDealers.askPermit);
  const askWash = useSelector((state) => state.editcustomerDealers.askWash);
  const showCommision = useSelector((state) => state.editcustomerDealers.showCommision);

  const numericRegex = /^\d{0,5}(\.\d{0,2})?$/;
  const leadingZero = /^0+/;
  const onlyZeros = /^(0+)$/;

  const changeData = () => {
    const data = getData();
    dispatch(setCustomerDealer(data));
  };
  const getData = () => {
    return {
      invoiceFlatrateTowable: invoiceOutbondTowableSingle,
      invoiceFlatrateMotorized: invoiceOutbondMotorized,
      invoiceFlatrateTowableCDLA: invoiceOutbondTowableCDLA,
      invoiceFlatrateTowable2Units: invoiceOutbondTowable2Units,
      invoiceFlatrateTowableLowboy: invoiceOutbondTowableFlatbed,
      driverFlatrateMotorized: driverOutbondMotorized,
      driverFlatrateTowable: driverOutbondTowableSingle,
      driverFlatrateTowableCDLA: driverOutbondTowableCDLA,
      driverFlatrateTowable2Units: driverOutbondTowable2Units,
      driverFlatrateTowableLowboy: driverOutbondTowableFlatbed,
      invoiceReturnMotorized: invoiceReturnMotorized,
      invoiceReturnTowable: invoiceReturnTowableSingle,
      invoiceReturnTowableCDLA: invoiceReturnTowableCDLA,
      invoiceReturnTowable2Units: invoiceReturnTowable2Units,
      invoiceReturnTowableLowboy: invoiceReturnTowableFlatbed,
      driverReturnMotorized: driverReturnMotorized,
      driverReturnTowable: driverReturnTowableSingle,
      driverReturnTowableCDLA: driverReturnTowableCDLA,
      driverReturnTowable2Units: driverReturnTowable2Units,
      driverReturnTowableLowboy: driverReturnTowableFlatbed,
      invoiceReloadMotorized: invoiceReloadMotorized,
      invoiceReloadTowable: invoiceReloadTowableSingle,
      invoiceReloadTowableCDLA: invoiceReloadTowableCDLA,
      invoiceReloadTowable2Units: invoiceReloadTowable2Units,
      invoiceReloadTowableLowboy: invoiceReloadTowableFlatbed,
      driverReloadMotorized: driverReloadMotorized,
      driverReloadTowable: driverReloadTowableSingle,
      driverReloadTowableCDLA: driverReloadTowableCDLA,
      driverReloadTowable2Units: driverReloadTowable2Units,
      driverReloadTowableLowboy: driverReloadTowableFlatbed,
      driverMaxTollsAmount: maxDriverTolls,
      driverMaxPermitsAmount: maxDriverPermits,
      driverMaxWashAmount: maxDriverWash,
      commission: commision,
    };
  };

  useEffect(() => {
    if (customerDealer) {
      setInvoiceOutbondMotorized(
        customerDealer.invoiceFlatrateMotorized ? customerDealer.invoiceFlatrateMotorized : "0.00"
      );
      setInvoiceOutbondTowableSingle(
        customerDealer.invoiceFlatrateTowable ? customerDealer.invoiceFlatrateTowable : "0.00"
      );
      setInvoiceOutbondTowableCDLA(
        customerDealer.invoiceFlatrateTowableCDLA ? customerDealer.invoiceFlatrateTowableCDLA : "0.00"
      );
      setInvoiceOutbondTowable2Units(
        customerDealer.invoiceFlatrateTowable2Units ? customerDealer.invoiceFlatrateTowable2Units : "0.00"
      );
      setInvoiceOutbondTowableFlatbed(
        customerDealer.invoiceFlatrateTowableLowboy ? customerDealer.invoiceFlatrateTowableLowboy : "0.00"
      );
      setDriverOutbondMotorized(
        customerDealer.driverFlatrateMotorized ? customerDealer.driverFlatrateMotorized : "0.00"
      );
      setDriverOutbondTowableSingle(
        customerDealer.driverFlatrateTowable ? customerDealer.driverFlatrateTowable : "0.00"
      );
      setDriverOutbondTowableCDLA(
        customerDealer.driverFlatrateTowableCDLA ? customerDealer.driverFlatrateTowableCDLA : "0.00"
      );
      setDriverOutbondTowable2Units(
        customerDealer.driverFlatrateTowable2Units ? customerDealer.driverFlatrateTowable2Units : "0.00"
      );
      setDriverOutbondTowableFlatbed(
        customerDealer.driverFlatrateTowableLowboy ? customerDealer.driverFlatrateTowableLowboy : "0.00"
      );
      setInvoiceReloadMotorized(
        customerDealer.invoiceReloadMotorized ? customerDealer.invoiceReloadMotorized : "0.00"
      );
      setInvoiceReloadTowableSingle(
        customerDealer.invoiceReloadTowable ? customerDealer.invoiceReloadTowable : "0.00"
      );
      setInvoiceReloadTowableCDLA(
        customerDealer.invoiceReloadTowableCDLA ? customerDealer.invoiceReloadTowableCDLA : "0.00"
      );
      setInvoiceReloadTowable2Units(
        customerDealer.invoiceReloadTowable2Units ? customerDealer.invoiceReloadTowable2Units : "0.00"
      );
      setInvoiceReloadTowableFlatbed(
        customerDealer.invoiceReloadTowableLowboy ? customerDealer.invoiceReloadTowableLowboy : "0.00"
      );
      setDriverReloadMotorized(
        customerDealer.driverReloadMotorized ? customerDealer.driverReloadMotorized : "0.00"
      );
      setDriverReloadTowableSingle(
        customerDealer.driverReloadTowable ? customerDealer.driverReloadTowable : "0.00"
      );
      setDriverReloadTowableCDLA(
        customerDealer.driverReloadTowableCDLA ? customerDealer.driverReloadTowableCDLA : "0.00"
      );
      setDriverReloadTowable2Units(
        customerDealer.driverReloadTowable2Units ? customerDealer.driverReloadTowable2Units : "0.00"
      );
      setDriverReloadTowableFlatbed(
        customerDealer.driverReloadTowableLowboy ? customerDealer.driverReloadTowableLowboy : "0.00"
      );
      setInvoiceReturnMotorized(
        customerDealer.invoiceReturnMotorized ? customerDealer.invoiceReturnMotorized : "0.00"
      );
      setInvoiceReturnTowableSingle(
        customerDealer.invoiceReturnTowable ? customerDealer.invoiceReturnTowable : "0.00"
      );
      setInvoiceReturnTowableCDLA(
        customerDealer.invoiceReturnTowableCDLA ? customerDealer.invoiceReturnTowableCDLA : "0.00"
      );
      setInvoiceReturnTowable2Units(
        customerDealer.invoiceReturnTowable2Units ? customerDealer.invoiceReturnTowable2Units : "0.00"
      );
      setInvoiceReturnTowableFlatbed(
        customerDealer.invoiceReturnTowableLowboy ? customerDealer.invoiceReturnTowableLowboy : "0.00"
      );
      setDriverReturnMotorized(
        customerDealer.driverReturnMotorized ? customerDealer.driverReturnMotorized : "0.00"
      );
      setDriverReturnTowableSingle(
        customerDealer.driverReturnTowable ? customerDealer.driverReturnTowable : "0.00"
      );
      setDriverReturnTowableCDLA(
        customerDealer.driverReturnTowableCDLA ? customerDealer.driverReturnTowableCDLA : "0.00"
      );
      setDriverReturnTowable2Units(
        customerDealer.driverReturnTowable2Units ? customerDealer.driverReturnTowable2Units : "0.00"
      );
      setDriverReturnTowableFlatbed(
        customerDealer.driverReturnTowableLowboy ? customerDealer.driverReturnTowableLowboy : "0.00"
      );
      askPermit &&
        setMaxDriverPermits(
          customerDealer.driverMaxPermitsAmount ? customerDealer.driverMaxPermitsAmount : "0.00"
        );
      askTolls &&
        setMaxDriverTolls(customerDealer.driverMaxTollsAmount ? customerDealer.driverMaxTollsAmount : "0.00");
      askWash &&
        setMaxDriverWash(customerDealer.driverMaxWashAmount ? customerDealer.driverMaxWashAmount : "0.00");
      showCommision && setCommision(customerDealer.commission ? customerDealer.commission : "0.00");
    }
  }, [customerDealer, editDetails, askPermit, askTolls, askWash, showCommision]);

  useEffect(() => {
    changeData();
  }, [
    invoiceOutbondTowableSingle,
    invoiceOutbondMotorized,
    invoiceOutbondTowableCDLA,
    invoiceOutbondTowable2Units,
    invoiceOutbondTowableFlatbed,
    driverOutbondMotorized,
    driverOutbondTowableSingle,
    driverOutbondTowableCDLA,
    driverOutbondTowable2Units,
    driverOutbondTowableFlatbed,
    invoiceReloadMotorized,
    invoiceReloadTowableSingle,
    invoiceReloadTowableCDLA,
    invoiceReloadTowable2Units,
    driverReloadMotorized,
    driverReloadTowableSingle,
    driverReloadTowableCDLA,
    driverReloadTowable2Units,
    driverReloadTowableFlatbed,
    invoiceReturnMotorized,
    invoiceReturnTowableSingle,
    invoiceReturnTowableCDLA,
    invoiceReturnTowable2Units,
    driverReturnMotorized,
    driverReturnTowableSingle,
    driverReturnTowableCDLA,
    driverReturnTowable2Units,
    driverReturnTowableFlatbed,
    maxDriverTolls,
    maxDriverPermits,
    maxDriverWash,
    commision,
  ]);

  useEffect(() => {
    if (String(invoiceOutbondMotorized)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverOutbondMotorized)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReloadMotorized)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReloadMotorized)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReturnMotorized)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReturnMotorized)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceOutbondTowableSingle)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverOutbondTowableSingle)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReloadTowableSingle)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReloadTowableSingle)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReturnTowableSingle)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReturnTowableSingle)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceOutbondTowableCDLA)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverOutbondTowableCDLA)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReloadTowableCDLA)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReloadTowableCDLA)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReturnTowableCDLA)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReturnTowableCDLA)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceOutbondTowable2Units)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverOutbondTowable2Units)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReloadTowable2Units)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReloadTowable2Units)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReturnTowable2Units)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReturnTowable2Units)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceOutbondTowableFlatbed)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverOutbondTowableFlatbed)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReloadTowableFlatbed)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReloadTowableFlatbed)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(invoiceReturnTowableFlatbed)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (String(driverReturnTowableFlatbed)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (commision && String(commision)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (maxDriverWash && String(maxDriverWash)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (maxDriverPermits && String(maxDriverPermits)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else if (maxDriverTolls && String(maxDriverTolls)?.endsWith(".")) {
      dispatch(setValidFlatratesTab(false));
    } else {
      dispatch(setValidFlatratesTab(true));
    }
  }, [
    invoiceOutbondTowableSingle,
    invoiceOutbondMotorized,
    invoiceOutbondTowableCDLA,
    invoiceOutbondTowable2Units,
    invoiceOutbondTowableFlatbed,
    driverOutbondMotorized,
    driverOutbondTowableSingle,
    driverOutbondTowableCDLA,
    driverOutbondTowable2Units,
    driverOutbondTowableFlatbed,
    invoiceReloadMotorized,
    invoiceReloadTowableSingle,
    invoiceReloadTowableCDLA,
    invoiceReloadTowable2Units,
    invoiceReturnTowableFlatbed,
    invoiceReloadTowableFlatbed,
    driverReloadMotorized,
    driverReloadTowableSingle,
    driverReloadTowableCDLA,
    driverReloadTowable2Units,
    driverReloadTowableFlatbed,
    invoiceReturnMotorized,
    invoiceReturnTowableSingle,
    invoiceReturnTowableCDLA,
    invoiceReturnTowable2Units,
    driverReturnMotorized,
    driverReturnTowableSingle,
    driverReturnTowableCDLA,
    driverReturnTowable2Units,
    driverReturnTowableFlatbed,
    maxDriverTolls,
    maxDriverPermits,
    maxDriverWash,
    commision,
  ]);

  return (
    <div className="px-3 py-2 p-l-30">
      <div>
        <div className="d-flex mt-5">
          <div className="col-2" style={{ width: "200px" }}></div>
          <div className="col-2" style={{ width: "200px" }}>
            Invoice Outbound
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            Driver Outbound
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            Invoice Reload
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            Driver Reload
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            Invoice Return
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            Driver Return
          </div>
        </div>
        <div className="d-flex mt-4">
          <div className="col-2" style={{ width: "200px" }}>
            Motorized
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceOutbondMotorized)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceOutbondMotorized}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceOutbondMotorized(e.target.value);
                    } else if (
                      leadingZero.test(e.target.value) &&
                      !(e.target.value !== ".") &&
                      !(e.target.value !== ".")
                    ) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceOutbondMotorized(newValue);
                    } else {
                      setInvoiceOutbondMotorized(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceOutbondMotorized("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverOutbondMotorized)?.endsWith(".") ? "" : "borderRed"}`}
                name="description"
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverOutbondMotorized}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverOutbondMotorized(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverOutbondMotorized(newValue);
                    } else {
                      setDriverOutbondMotorized(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverOutbondMotorized("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReloadMotorized)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReloadMotorized}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReloadMotorized(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReloadMotorized(newValue);
                    } else {
                      setInvoiceReloadMotorized(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReloadMotorized("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReloadMotorized)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReloadMotorized}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReloadMotorized(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReloadMotorized(newValue);
                    } else {
                      setDriverReloadMotorized(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReloadMotorized("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReturnMotorized)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReturnMotorized}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReturnMotorized(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReturnMotorized(newValue);
                    } else {
                      setInvoiceReturnMotorized(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReturnMotorized("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReturnMotorized)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReturnMotorized}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReturnMotorized(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReturnMotorized(newValue);
                    } else {
                      setDriverReturnMotorized(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReturnMotorized("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
        </div>
        <div className="d-flex mt-4">
          <div className="col-2" style={{ width: "200px" }}>
            Towable Single
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceOutbondTowableSingle)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceOutbondTowableSingle}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceOutbondTowableSingle(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceOutbondTowableSingle(newValue);
                    } else {
                      setInvoiceOutbondTowableSingle(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceOutbondTowableSingle("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverOutbondTowableSingle)?.endsWith(".") ? "" : "borderRed"}`}
                name="description"
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverOutbondTowableSingle}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverOutbondTowableSingle(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverOutbondTowableSingle(newValue);
                    } else {
                      setDriverOutbondTowableSingle(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverOutbondTowableSingle("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReloadTowableSingle)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReloadTowableSingle}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReloadTowableSingle(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReloadTowableSingle(newValue);
                    } else {
                      setInvoiceReloadTowableSingle(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReloadTowableSingle("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReloadTowableSingle)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReloadTowableSingle}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReloadTowableSingle(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReloadTowableSingle(newValue);
                    } else {
                      setDriverReloadTowableSingle(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReloadTowableSingle("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReturnTowableSingle)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReturnTowableSingle}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReturnTowableSingle(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReturnTowableSingle(newValue);
                    } else {
                      setInvoiceReturnTowableSingle(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReturnTowableSingle("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReturnTowableSingle)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReturnTowableSingle}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReturnTowableSingle(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReturnTowableSingle(newValue);
                    } else {
                      setDriverReturnTowableSingle(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReturnTowableSingle("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
        </div>
        <div className="d-flex mt-4">
          <div className="col-2" style={{ width: "200px" }}>
            Towable CDLA
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceOutbondTowableCDLA)?.endsWith(".") ? "" : "borderRed"}`}
                name="description"
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceOutbondTowableCDLA}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceOutbondTowableCDLA(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceOutbondTowableCDLA(newValue);
                    } else {
                      setInvoiceOutbondTowableCDLA(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceOutbondTowableCDLA("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverOutbondTowableCDLA)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverOutbondTowableCDLA}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverOutbondTowableCDLA(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverOutbondTowableCDLA(newValue);
                    } else {
                      setDriverOutbondTowableCDLA(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverOutbondTowableCDLA("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReloadTowableCDLA)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReloadTowableCDLA}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReloadTowableCDLA(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReloadTowableCDLA(newValue);
                    } else {
                      setInvoiceReloadTowableCDLA(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReloadTowableCDLA("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReloadTowableCDLA)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReloadTowableCDLA}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReloadTowableCDLA(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReloadTowableCDLA(newValue);
                    } else {
                      setDriverReloadTowableCDLA(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReloadTowableCDLA("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReturnTowableCDLA)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReturnTowableCDLA}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReturnTowableCDLA(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReturnTowableCDLA(newValue);
                    } else {
                      setInvoiceReturnTowableCDLA(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReturnTowableCDLA("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReturnTowableCDLA)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReturnTowableCDLA}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReturnTowableCDLA(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReturnTowableCDLA(newValue);
                    } else {
                      setDriverReturnTowableCDLA(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReturnTowableCDLA("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
        </div>
        <div className="d-flex mt-4">
          <div className="col-2" style={{ width: "200px" }}>
            Towable 2 Units
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceOutbondTowable2Units)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceOutbondTowable2Units}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceOutbondTowable2Units(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceOutbondTowable2Units(newValue);
                    } else {
                      setInvoiceOutbondTowable2Units(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceOutbondTowable2Units("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverOutbondTowable2Units)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverOutbondTowable2Units}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverOutbondTowable2Units(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverOutbondTowable2Units(newValue);
                    } else {
                      setDriverOutbondTowable2Units(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverOutbondTowable2Units("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReloadTowable2Units)?.endsWith(".") ? "" : "borderRed"}`}
                name="description"
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReloadTowable2Units}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReloadTowable2Units(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReloadTowable2Units(newValue);
                    } else {
                      setInvoiceReloadTowable2Units(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReloadTowable2Units("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReloadTowable2Units)?.endsWith(".") ? "" : "borderRed"}`}
                name="description"
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReloadTowable2Units}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReloadTowable2Units(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReloadTowable2Units(newValue);
                    } else {
                      setDriverReloadTowable2Units(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReloadTowable2Units("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReturnTowable2Units)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReturnTowable2Units}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReturnTowable2Units(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReturnTowable2Units(newValue);
                    } else {
                      setInvoiceReturnTowable2Units(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReturnTowable2Units("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReturnTowable2Units)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReturnTowable2Units}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReturnTowable2Units(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReturnTowable2Units(newValue);
                    } else {
                      setDriverReturnTowable2Units(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReturnTowable2Units("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
        </div>
        <div className="d-flex mt-4">
          <div className="col-2" style={{ width: "200px" }}>
            Towable Flatbed
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceOutbondTowableFlatbed)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceOutbondTowableFlatbed}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceOutbondTowableFlatbed(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceOutbondTowableFlatbed(newValue);
                    } else {
                      setInvoiceOutbondTowableFlatbed(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceOutbondTowableFlatbed("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverOutbondTowableFlatbed)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverOutbondTowableFlatbed}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverOutbondTowableFlatbed(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverOutbondTowableFlatbed(newValue);
                    } else {
                      setDriverOutbondTowableFlatbed(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverOutbondTowableFlatbed("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReloadTowableFlatbed)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReloadTowableFlatbed}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReloadTowableFlatbed(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReloadTowableFlatbed(newValue);
                    } else {
                      setInvoiceReloadTowableFlatbed(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReloadTowableFlatbed("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReloadTowableFlatbed)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReloadTowableFlatbed}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReloadTowableFlatbed(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReloadTowableFlatbed(newValue);
                    } else {
                      setDriverReloadTowableFlatbed(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReloadTowableFlatbed("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(invoiceReturnTowableFlatbed)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={invoiceReturnTowableFlatbed}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setInvoiceReturnTowableFlatbed(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setInvoiceReturnTowableFlatbed(newValue);
                    } else {
                      setInvoiceReturnTowableFlatbed(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setInvoiceReturnTowableFlatbed("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(driverReturnTowableFlatbed)?.endsWith(".") ? "" : "borderRed"}`}
                type="text"
                maxLength={9}
                autoComplete="off"
                value={driverReturnTowableFlatbed}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setDriverReturnTowableFlatbed(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setDriverReturnTowableFlatbed(newValue);
                    } else {
                      setDriverReturnTowableFlatbed(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setDriverReturnTowableFlatbed("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 visibility-hidden">t</div>
        <div className={`d-flex mt-5 ${askTolls ? "" : "visibility-hidden"}`}>
          <div className="col-2" style={{ width: "200px" }}>
            Maximum Driver Tolls
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(maxDriverTolls)?.endsWith(".") ? "" : "borderRed"}`}
                name="description"
                type="text"
                maxLength={9}
                autoComplete="off"
                value={maxDriverTolls}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setMaxDriverTolls(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setMaxDriverTolls(newValue);
                    } else {
                      setMaxDriverTolls(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setMaxDriverTolls("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
        </div>
        <div className={`d-flex mt-4 ${askPermit ? "" : "visibility-hidden"}`}>
          <div className="col-2" style={{ width: "200px" }}>
            Maximum Driver Permits
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(maxDriverPermits)?.endsWith(".") ? "" : "borderRed"}`}
                name="description"
                type="text"
                hidden={!askPermit}
                maxLength={9}
                autoComplete="off"
                value={maxDriverPermits}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setMaxDriverPermits(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setMaxDriverPermits(newValue);
                    } else {
                      setMaxDriverPermits(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setMaxDriverPermits("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
        </div>
        <div className={`d-flex mt-4 ${askWash ? "" : "visibility-hidden"}`}>
          <div className="col-2" style={{ width: "200px" }}>
            Maximum Driver Wash
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(maxDriverWash)?.endsWith(".") ? "" : "borderRed"}`}
                name="description"
                type="text"
                hidden={!askWash}
                maxLength={9}
                autoComplete="off"
                value={maxDriverWash}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setMaxDriverWash(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setMaxDriverWash(newValue);
                    } else {
                      setMaxDriverWash(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setMaxDriverWash("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
        </div>
        <div className={`d-flex mt-4 ${showCommision ? "" : "visibility-hidden"}`}>
          <div className="col-2" style={{ width: "200px" }}>
            Commission
          </div>
          <div className="col-2" style={{ width: "200px" }}>
            <div className="col-4">
              <input
                className={`customFormControl
                ${!editDetails || !String(commision)?.endsWith(".") ? "" : "borderRed"}`}
                name="description"
                type="text"
                maxLength={9}
                autoComplete="off"
                value={commision}
                onChange={(e) => {
                  if (numericRegex.test(e.target.value) || e.target.value === "") {
                    if (onlyZeros.test(e.target.value)) {
                      setCommision(e.target.value);
                    } else if (leadingZero.test(e.target.value) && !(e.target.value !== ".")) {
                      const newValue = e.target.value?.replace(/^0+/, "");
                      setCommision(newValue);
                    } else {
                      setCommision(e.target.value);
                    }
                  }
                }}
                onBlur={({ target }) => {
                  if (!target.value || target.value == 0) {
                    setCommision("0.00");
                  }
                }}
                disabled={!editDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDelaerEditFlatRates;
