import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSwitchesTabValid,
  setSaveCompanyObject,
  setAllDriversPayTaxable,
  setReimbursementPrinterId,
  setReimbursementPrinterName,
  setNextReimbursmentCheckNumber,
  setTowableBonusProgram,
  setHaltInvoicing,
  setChargeEfee,
} from "../../../../../redux/CompanySlice";
import Input from "../../../../../components/common/input";

function Switches() {
  const dispatch = useDispatch();
  const [companyPK, setCompanyPK] = useState(null);
  const allDriversPayTaxable = useSelector((state) => state.companyReducer.allDriversPayTaxable);
  const towableBonusProgram = useSelector((state) => state.companyReducer.towableBonusProgram);
  const [hardPostTowableOutbound, setHardPostTowableOutbound] = useState(false);
  const [hardPostTowableReload, setHardPostTowableReload] = useState(false);
  const [softPostTowableOutbound, setSoftPostTowableOutbound] = useState(false);
  const [softPostTowableReload, setSoftPostTowableReload] = useState(false);
  const [hardPostDriveawayOutbound, setHardPostDriveawayOutbound] = useState(false);
  const [hardPostDriveawayReload, setHardPostDriveawayReload] = useState(false);
  const [softPostDriveawayOutbound, setSoftPostDriveawayOutbound] = useState(false);
  const [softPostDriveawayReload, setSoftPostDriveawayReload] = useState(false);
  const [sistersAsUs, setSistersAsUs] = useState(false);
  const [singleDispatchTowable, setSingleDispatchTowable] = useState(false);
  const [singleDispatchTowableOutbound, setSingleDispatchTowableOutbound] = useState(false);
  const [singleDispatchTowableReload, setSingleDispatchTowableReload] = useState(false);
  const [singleDispatchMotorized, setSingleDispatchMotorized] = useState(false);
  const [singleDispatchMotorizedOutbound, setSingleDispatchMotorizedOutbound] = useState(false);
  const [singleDispatchMotorizedReload, setSingleDispatchMotorizedReload] = useState(false);
  const [enforceScalePlateWeights, setEnforceScalePlateWeights] = useState(false);

  const [processDriverDeleases, setProcessDriverDeleases] = useState(false);
  const [processDriverInactivation, setProcessDriverInactivation] = useState(false);
  const [aDSSingleDispatch, setADSSingleDispatch] = useState(false);
  const [requirePlantReleases, setRequirePlantReleases] = useState(false);
  const [approveAdditionalShuttlePay, setApproveAdditionalShuttlePay] = useState(false);
  const [processShuttlePay, setProcessShuttlePay] = useState(false);
  const [invoicingHaltBegin, setInvoicingHaltBegin] = useState("");
  const [invoicingHaltEnd, setInvoicingHaltEnd] = useState("");
  const [timeValid, setTimeValid] = useState(false);
  const [efee, setEfee] = useState(0);
  const [useFODInvoiceNumbers, setUseFODInvoiceNumbers] = useState(false);
  const [postSettlementImeadiately, setPostSettlementImeadiately] = useState(false);
  const [invoiceSubTotals, setInvoiceSubTotals] = useState(false);
  const [freezePOEDispatchMotorizedOutbound, setFreezePOEDispatchMotorizedOutbound] = useState(false);
  const [freezePOEDispatchMotorizedReload, setFreezePOEDispatchMotorizedReload] = useState(false);
  const [freezePOEDispatchTowableOutbound, setFreezePOEDispatchTowableOutbound] = useState(false);
  const [freezePOEDispatchTowableReload, setFreezePOEDispatchTowableReload] = useState(false);
  const [isEfeeValid, setIsEfeeValid] = useState(true);
  const companyData = useSelector((state) => state.companyReducer.companyData);
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);
  const haltInvoicing = useSelector((state) => state.companyReducer.haltInvoicing);
  const chargeEfee = useSelector((state) => state.companyReducer.chargeEfee);
  const loading = useSelector((state) => state.companyReducer.loading);

  useEffect(() => {
    setCompanyPK(companyData ? companyData.companyPK || "" : "");
    dispatch(setAllDriversPayTaxable(companyData ? companyData.allDriversPayTaxable || false : false));
    setHardPostTowableOutbound(companyData ? companyData.hardPostTowableOutbound || false : false);
    setHardPostTowableReload(companyData ? companyData.hardPostTowableReload || false : false);
    setSoftPostTowableOutbound(companyData ? companyData.softPostTowableOutbound || false : false);
    setSoftPostTowableReload(companyData ? companyData.softPostTowableReload || false : false);
    setHardPostDriveawayOutbound(companyData ? companyData.hardPostDriveawayOutbound || false : false);
    setHardPostDriveawayReload(companyData ? companyData.hardPostDriveawayReload || false : false);
    setSoftPostDriveawayOutbound(companyData ? companyData.softPostDriveawayOutbound || false : false);
    setSoftPostDriveawayReload(companyData ? companyData.softPostDriveawayReload || false : false);
    dispatch(setTowableBonusProgram(companyData ? companyData.towableBonusProgram || false : false));
    setSingleDispatchTowable(companyData ? companyData.singleDispatchTowable || false : false);
    setSingleDispatchTowableOutbound(
      companyData ? companyData.singleDispatchTowableOutbound || false : false
    );
    setSingleDispatchTowableReload(companyData ? companyData.singleDispatchTowableReload || false : false);
    setSingleDispatchMotorized(companyData ? companyData.singleDispatchMotorized || false : false);
    setSingleDispatchMotorizedOutbound(
      companyData ? companyData.singleDispatchMotorizedOutbound || false : false
    );
    setSingleDispatchMotorizedReload(
      companyData ? companyData.singleDispatchMotorizedReload || false : false
    );
    setEnforceScalePlateWeights(companyData ? companyData.enforceScalePlateWeights || false : false);

    setProcessDriverDeleases(companyData ? companyData.processDriverDelease || false : false);
    setProcessDriverInactivation(companyData ? companyData.processDriverInactive || false : false);

    setADSSingleDispatch(companyData ? companyData.adssingleDispatch || false : false);
    setRequirePlantReleases(companyData ? companyData.requirePlantReleases || false : false);
    setApproveAdditionalShuttlePay(companyData ? companyData.approveAdditionalShuttlePay || false : false);
    setProcessShuttlePay(companyData ? companyData.processShuttlePay || false : false);
    dispatch(setHaltInvoicing(companyData ? companyData.haltInvoicing || false : false));
    setInvoicingHaltBegin(companyData ? companyData.invoicingHaltBegin || "00:00" : "");
    setInvoicingHaltEnd(companyData ? companyData.invoicingHaltEnd || "00:00" : "");
    setSistersAsUs(companyData ? companyData.sistersAsUs || false : false);
    dispatch(setChargeEfee(companyData ? companyData.chargeEfee || false : false));
    setEfee(companyData ? companyData.efee || "0" : "0");
    setUseFODInvoiceNumbers(companyData ? companyData.useFODInvoiceNumbers || false : false);
    setPostSettlementImeadiately(companyData ? companyData.postSettlementImeadiately || false : false);
    setInvoiceSubTotals(companyData ? companyData.invoiceSubTotals || false : false);
    setFreezePOEDispatchMotorizedOutbound(
      companyData ? companyData.freezePOEDispatchMotorizedOutbound || false : false
    );
    setFreezePOEDispatchMotorizedReload(
      companyData ? companyData.freezePOEDispatchMotorizedReload || false : false
    );
    setFreezePOEDispatchTowableOutbound(
      companyData ? companyData.freezePOEDispatchTowableOutbound || false : false
    );
    setFreezePOEDispatchTowableReload(
      companyData ? companyData.freezePOEDispatchTowableReload || false : false
    );
  }, [companyData, viewDetail]);

  useEffect(() => {
    dispatch(
      setSaveCompanyObject({
        allDriversPayTaxable: allDriversPayTaxable,
        hardPostTowableOutbound: hardPostTowableOutbound,
        hardPostTowableReload: hardPostTowableReload,
        softPostTowableOutbound: softPostTowableOutbound,
        softPostTowableReload: softPostTowableReload,
        hardPostDriveawayOutbound: hardPostDriveawayOutbound,
        hardPostDriveawayReload: hardPostDriveawayReload,
        softPostDriveawayOutbound: softPostDriveawayOutbound,
        softPostDriveawayReload: softPostDriveawayReload,
        towableBonusProgram: towableBonusProgram,
        singleDispatchTowable: singleDispatchTowable,
        singleDispatchTowableOutbound: singleDispatchTowableOutbound,
        singleDispatchTowableReload: singleDispatchTowableReload,
        singleDispatchMotorized: singleDispatchMotorized,
        singleDispatchMotorizedOutbound: singleDispatchMotorizedOutbound,
        singleDispatchMotorizedReload: singleDispatchMotorizedReload,
        enforceScalePlateWeights: enforceScalePlateWeights,
        adsSingleDispatch: aDSSingleDispatch,
        requirePlantReleases: requirePlantReleases,
        approveAdditionalShuttlePay: approveAdditionalShuttlePay,
        processShuttlePay: processShuttlePay,
        haltInvoicing: haltInvoicing,
        invoicingHaltBegin: invoicingHaltBegin,
        invoicingHaltEnd: invoicingHaltEnd,
        sistersAsUs: sistersAsUs,
        useFODInvoiceNumbers: useFODInvoiceNumbers,
        postSettlementImeadiately: postSettlementImeadiately,
        invoiceSubTotals: invoiceSubTotals,
        freezePOEDispatchMotorizedOutbound: freezePOEDispatchMotorizedOutbound,
        freezePOEDispatchMotorizedReload: freezePOEDispatchMotorizedReload,
        freezePOEDispatchTowableOutbound: freezePOEDispatchTowableOutbound,
        freezePOEDispatchTowableReload: freezePOEDispatchTowableReload,
        efee: efee,
        chargeEfee: chargeEfee,
        processDriverDelease: processDriverDeleases,
        processDriverInactive: processDriverInactivation,
      })
    );
  }, [
    processDriverInactivation,
    processDriverDeleases,
    allDriversPayTaxable,
    hardPostTowableOutbound,
    hardPostTowableReload,
    softPostTowableOutbound,
    softPostTowableReload,
    hardPostDriveawayOutbound,
    hardPostDriveawayReload,
    softPostDriveawayOutbound,
    softPostDriveawayReload,
    towableBonusProgram,
    singleDispatchTowable,
    singleDispatchTowableOutbound,
    singleDispatchTowableReload,
    singleDispatchMotorized,
    singleDispatchMotorizedOutbound,
    singleDispatchMotorizedReload,
    enforceScalePlateWeights,
    aDSSingleDispatch,
    requirePlantReleases,
    approveAdditionalShuttlePay,
    processShuttlePay,
    haltInvoicing,
    invoicingHaltBegin,
    invoicingHaltEnd,
    sistersAsUs,
    useFODInvoiceNumbers,
    postSettlementImeadiately,
    invoiceSubTotals,
    freezePOEDispatchMotorizedOutbound,
    freezePOEDispatchMotorizedReload,
    freezePOEDispatchTowableOutbound,
    freezePOEDispatchTowableReload,
    efee,
    chargeEfee,
  ]);

  useEffect(() => {
    if (chargeEfee === false) {
      setEfee(0);
    }
  }, [chargeEfee, efee]);

  useEffect(() => {
    const [h1, m1] = invoicingHaltBegin.split(":").map(Number);
    const [h2, m2] = invoicingHaltEnd.split(":").map(Number);
    if ((h1 > 0 || (h1 === 0 && m1 > 0)) && (h2 > 0 || (h2 === 0 && m2 > 1))) {
      setTimeValid(true);
    } else {
      setTimeValid(false);
    }
  }, [invoicingHaltBegin, invoicingHaltEnd]);

  // for save validation
  useEffect(() => {
    const isEfeeValid = chargeEfee
      ? parseFloat(efee) > 0.0 && efee && efee !== "." && !/^\d*\.$/.test(efee)
        ? true
        : false
      : true;

    if (
      (!haltInvoicing && !chargeEfee) ||
      (invoicingHaltBegin && invoicingHaltEnd && timeValid && !chargeEfee) ||
      (!haltInvoicing && isEfeeValid) ||
      (invoicingHaltBegin && invoicingHaltEnd && timeValid && isEfeeValid)
    ) {
      dispatch(setIsSwitchesTabValid(true));
    } else {
      dispatch(setIsSwitchesTabValid(false));
    }
  }, [haltInvoicing, invoicingHaltBegin, invoicingHaltEnd, timeValid, chargeEfee, efee, isEfeeValid]);

  const endTimeChange = (invoicingHaltBegin) => {
    let timeOne = invoicingHaltBegin?.split(":");
    let timeTwo = invoicingHaltEnd?.split(":");
    let minutes = (Number(timeOne[1]) + 1).toString();
    let hour = (Number(timeOne[0]) + 1).toString();

    if (timeOne[0] > timeTwo[0]) {
      if (minutes < 60) {
        setInvoicingHaltEnd(timeOne[0] + ":" + (minutes.length === 2 ? minutes : "0" + minutes));
      } else {
        if (hour === "24") {
          setInvoicingHaltBegin("23:58");
          setInvoicingHaltEnd("23:59");
        } else {
          setInvoicingHaltEnd((hour.length === 2 ? hour : "0" + hour) + ":00");
        }
      }
    } else if (timeOne[0] === timeTwo[0]) {
      if (timeOne[1] >= timeTwo[1]) {
        if (minutes < 60) {
          setInvoicingHaltEnd(timeOne[0] + ":" + (minutes.length === 2 ? minutes : "0" + minutes));
        } else {
          if (hour === "24") {
            setInvoicingHaltBegin("23:58");
            setInvoicingHaltEnd("23:59");
          } else {
            setInvoicingHaltEnd((hour.length === 2 ? hour : "0" + hour) + ":00");
          }
        }
      }
    }
  };

  const startTimeChange = (invoicingHaltEnd) => {
    let timeOne = invoicingHaltBegin?.split(":");
    let timeTwo = invoicingHaltEnd?.split(":");
    let hour = (Number(timeTwo[0]) - 1).toString();
    let minutes = (Number(timeTwo[1]) - 1).toString();

    if (timeOne[0] > timeTwo[0]) {
      if (minutes >= 0) {
        setInvoicingHaltBegin(timeTwo[0] + ":" + (minutes.length === 2 ? minutes : "0" + minutes));
      } else {
        if (hour < 0) {
          setInvoicingHaltBegin("00:00");
          setInvoicingHaltEnd("00:01");
        } else {
          setInvoicingHaltBegin((hour.length === 2 ? hour : "0" + hour) + ":59");
        }
      }
    } else if (timeOne[0] === timeTwo[0]) {
      if (timeOne[1] >= timeTwo[1]) {
        if (minutes >= 0) {
          setInvoicingHaltBegin(timeTwo[0] + ":" + (minutes.length === 2 ? minutes : "0" + minutes));
        } else {
          if (hour < 0) {
            setInvoicingHaltBegin("00:00");
            setInvoicingHaltEnd("00:01");
          } else {
            setInvoicingHaltBegin((hour.length === 2 ? hour : "0" + hour) + ":59");
          }
        }
      }
    }
  };

  useEffect(() => {
    if (haltInvoicing === false) {
      setInvoicingHaltBegin("00:00");
      setInvoicingHaltEnd("00:00");
    }
  }, [haltInvoicing]);

  return (
    <div className="p-2">
      <div className="d-flex">
        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                all drivers pay taxable
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" allDriversPayTaxable"
                name=" allDriversPayTaxable"
                value={allDriversPayTaxable}
                checked={allDriversPayTaxable}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setAllDriversPayTaxable(e.target.checked));
                  if (!allDriversPayTaxable) {
                    dispatch(setReimbursementPrinterId(null));
                    dispatch(setReimbursementPrinterName(""));
                    dispatch(setNextReimbursmentCheckNumber(""));
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row invisible  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                all drivers pay taxable
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" invoiceHoldCheckbox"
                name=" invoiceHoldCheckbox"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                hard post towable outbound
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" hardPostTowableOutbound"
                name=" hardPostTowableOutbound"
                value={hardPostTowableOutbound}
                checked={hardPostTowableOutbound}
                disabled={viewDetail}
                onChange={(e) => {
                  setHardPostTowableOutbound(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                soft post towable outbound
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" softPostTowableOutbound"
                name=" softPostTowableOutbound"
                value={softPostTowableOutbound}
                checked={softPostTowableOutbound}
                disabled={viewDetail}
                onChange={(e) => {
                  setSoftPostTowableOutbound(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                hard post towable reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" hardPostTowableReload"
                name=" hardPostTowableReload"
                value={hardPostTowableReload}
                checked={hardPostTowableReload}
                disabled={viewDetail}
                onChange={(e) => {
                  setHardPostTowableReload(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                soft post towable reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" softPostTowableReload"
                name=" softPostTowableReload"
                value={softPostTowableReload}
                checked={softPostTowableReload}
                disabled={viewDetail}
                onChange={(e) => {
                  setSoftPostTowableReload(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                hard post driveaway outbound
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" hardPostDriveawayOutbound"
                name=" hardPostDriveawayOutbound"
                value={hardPostDriveawayOutbound}
                checked={hardPostDriveawayOutbound}
                disabled={viewDetail}
                onChange={(e) => {
                  setHardPostDriveawayOutbound(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                soft post driveaway outbound
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" softPostDriveawayOutbound"
                name=" softPostDriveawayOutbound"
                value={softPostDriveawayOutbound}
                checked={softPostDriveawayOutbound}
                disabled={viewDetail}
                onChange={(e) => {
                  setSoftPostDriveawayOutbound(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                hard post driveaway reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" hardPostDriveawayReload"
                name=" hardPostDriveawayReload"
                value={hardPostDriveawayReload}
                checked={hardPostDriveawayReload}
                disabled={viewDetail}
                onChange={(e) => {
                  setHardPostDriveawayReload(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                soft post driveaway reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" softPostDriveawayReload"
                name=" softPostDriveawayReload"
                value={softPostDriveawayReload}
                checked={softPostDriveawayReload}
                disabled={viewDetail}
                onChange={(e) => {
                  setSoftPostDriveawayReload(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-1 align-items-center row invisible m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                sisters as us
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" softPostDriveawayReload"
                name=" softPostDriveawayReload"
                value={sistersAsUs}
                checked={sistersAsUs}
                disabled={viewDetail}
                onChange={(e) => {
                  setSistersAsUs(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-1 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                sisters as us
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" softPostDriveawayReload"
                name=" softPostDriveawayReload"
                value={sistersAsUs}
                checked={sistersAsUs}
                disabled={viewDetail}
                onChange={(e) => {
                  setSistersAsUs(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-1 align-items-center row invisible  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                soft post driveaway reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" invoiceHoldCheckbox"
                name=" invoiceHoldCheckbox"
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-1 align-items-center row   m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                towable bonus program
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" towableBonusProgram"
                name=" towableBonusProgram"
                value={towableBonusProgram}
                checked={towableBonusProgram}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setTowableBonusProgram(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                single dispatch towable
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" singleDispatchTowable"
                name=" singleDispatchTowable"
                value={singleDispatchTowable}
                checked={singleDispatchTowable}
                disabled={viewDetail}
                onChange={(e) => {
                  setSingleDispatchTowable(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                single dispatch towable outbound
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" singleDispatchTowableOutbound"
                name=" singleDispatchTowableOutbound"
                value={singleDispatchTowableOutbound}
                checked={singleDispatchTowableOutbound}
                disabled={viewDetail}
                onChange={(e) => {
                  setSingleDispatchTowableOutbound(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                single dispatch towable reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" singleDispatchTowableReload"
                name=" singleDispatchTowableReload"
                value={singleDispatchTowableReload}
                checked={singleDispatchTowableReload}
                disabled={viewDetail}
                onChange={(e) => {
                  setSingleDispatchTowableReload(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                single dispatch motorized
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" singleDispatchMotorized"
                name=" singleDispatchMotorized"
                value={singleDispatchMotorized}
                checked={singleDispatchMotorized}
                disabled={viewDetail}
                onChange={(e) => {
                  setSingleDispatchMotorized(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                single dispatch motorized outbound
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" singleDispatchMotorizedOutbound"
                name=" singleDispatchMotorizedOutbound"
                value={singleDispatchMotorizedOutbound}
                checked={singleDispatchMotorizedOutbound}
                disabled={viewDetail}
                onChange={(e) => {
                  setSingleDispatchMotorizedOutbound(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                single dispatch motorized reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" singleDispatchMotorizedReload"
                name=" singleDispatchMotorizedReload"
                value={singleDispatchMotorizedReload}
                checked={singleDispatchMotorizedReload}
                disabled={viewDetail}
                onChange={(e) => {
                  setSingleDispatchMotorizedReload(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row invisible m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                single dispatch motorized reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" invoiceHoldCheckbox"
                name=" invoiceHoldCheckbox"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                ADS Single Dispatch
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" aDSSingleDispatch"
                name=" aDSSingleDispatch"
                value={aDSSingleDispatch}
                checked={aDSSingleDispatch}
                disabled={viewDetail}
                onChange={(e) => {
                  setADSSingleDispatch(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Enforce Scale/Plate Weights
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" enforceScalePlateWeights"
                name=" enforceScalePlateWeights"
                value={enforceScalePlateWeights}
                checked={enforceScalePlateWeights}
                disabled={viewDetail}
                onChange={(e) => {
                  setEnforceScalePlateWeights(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Process Driver Deleases
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="processDriverDeleases"
                name=" processDriverDeleases"
                value={processDriverDeleases}
                checked={processDriverDeleases}
                disabled={viewDetail}
                onChange={(e) => {
                  setProcessDriverDeleases(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Process Driver Inactivation
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" processDriverInactivation"
                name=" processDriverInactivation"
                value={processDriverInactivation}
                checked={processDriverInactivation}

                disabled={viewDetail}
                onChange={(e) => {
                  setProcessDriverInactivation(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row invisible m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                single dispatch motorized reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" invoiceHoldCheckbox"
                name=" invoiceHoldCheckbox"
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                required plant release
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" requirePlantReleases"
                name=" requirePlantReleases"
                value={requirePlantReleases}
                checked={requirePlantReleases}
                disabled={viewDetail}
                onChange={(e) => {
                  setRequirePlantReleases(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                approve additional shuttle pay
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" approveAdditionalShuttlePay"
                name=" approveAdditionalShuttlePay"
                value={approveAdditionalShuttlePay}
                checked={approveAdditionalShuttlePay}
                disabled={viewDetail}
                onChange={(e) => {
                  setApproveAdditionalShuttlePay(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                process shuttle pay
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" processShuttlePay"
                name=" processShuttlePay"
                value={processShuttlePay}
                checked={processShuttlePay}
                disabled={viewDetail}
                onChange={(e) => {
                  setProcessShuttlePay(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row invisible m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                single dispatch motorized reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" invoiceHoldCheckbox"
                name=" invoiceHoldCheckbox"
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Charge EFee
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" chargeEfee"
                name=" chargeEfee"
                value={chargeEfee}
                checked={chargeEfee}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setChargeEfee(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                EFee
              </Form.Label>
            </Col>

            <div className="p-0 w-75px">
              <Input
                className={`customFormControl ${
                  !viewDetail && chargeEfee
                    ? parseFloat(efee) <= 0.0 || (!efee && chargeEfee) || efee === "." || /^\d*\.$/.test(efee)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={efee}
                maxLength={8}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || !chargeEfee}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setEfee(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Use FOD Invoice Numbers
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" useFODInvoiceNumbers"
                name=" useFODInvoiceNumbers"
                value={useFODInvoiceNumbers}
                checked={useFODInvoiceNumbers}
                disabled={viewDetail}
                onChange={(e) => {
                  setUseFODInvoiceNumbers(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Post Settlement Immediately
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" postSettlementImeadiately"
                name=" postSettlementImeadiately"
                value={postSettlementImeadiately}
                checked={postSettlementImeadiately}
                disabled={viewDetail}
                onChange={(e) => {
                  setPostSettlementImeadiately(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                use invoice subtotals
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" invoiceSubTotals"
                name=" invoiceSubTotals"
                value={invoiceSubTotals}
                checked={invoiceSubTotals}
                disabled={viewDetail}
                onChange={(e) => {
                  setInvoiceSubTotals(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                halt invoicing
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" haltInvoicing"
                name=" haltInvoicing"
                value={haltInvoicing}
                checked={haltInvoicing}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setHaltInvoicing(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                stop invoicing at
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`${"customFormControl"} ${viewDetail || !haltInvoicing ? "" : invoicingHaltBegin !== "" && timeValid ? "borderGreen" : "borderRed"}`}
                id="invoicingHaltBegin"
                name="invoicingHaltBegin"
                type="time"
                maxLength={5}
                value={invoicingHaltBegin}
                disabled={viewDetail || !haltInvoicing}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  setInvoicingHaltBegin(e.target.value);
                }}
                onBlur={(e) => {
                  endTimeChange(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                resume invoicing at
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`${"customFormControl"} ${viewDetail || !haltInvoicing ? "" : invoicingHaltEnd !== "" && timeValid ? "borderGreen" : "borderRed"}`}
                id="invoicingHaltEnd"
                name="invoicingHaltEnd"
                type="time"
                value={invoicingHaltEnd}
                disabled={viewDetail || !haltInvoicing}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  setInvoicingHaltEnd(e.target.value);
                }}
                onBlur={(e) => {
                  startTimeChange(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center invisible row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                process shuttle pay
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" invoiceHoldCheckbox"
                name=" invoiceHoldCheckbox"
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Freeze POE Motorized Outbound
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" freezePOEDispatchMotorizedOutbound"
                name=" freezePOEDispatchMotorizedOutbound"
                value={freezePOEDispatchMotorizedOutbound}
                checked={freezePOEDispatchMotorizedOutbound}
                disabled={viewDetail}
                onChange={(e) => {
                  setFreezePOEDispatchMotorizedOutbound(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Freeze POE Motorized Reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" freezePOEDispatchMotorizedReload"
                name=" freezePOEDispatchMotorizedReload"
                value={freezePOEDispatchMotorizedReload}
                checked={freezePOEDispatchMotorizedReload}
                disabled={viewDetail}
                onChange={(e) => {
                  setFreezePOEDispatchMotorizedReload(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Freeze POE Towable Outbound
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" freezePOEDispatchTowableOutbound"
                name=" freezePOEDispatchTowableOutbound"
                value={freezePOEDispatchTowableOutbound}
                checked={freezePOEDispatchTowableOutbound}
                disabled={viewDetail}
                onChange={(e) => {
                  setFreezePOEDispatchTowableOutbound(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                Freeze POE Towable Reload
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                id=" freezePOEDispatchTowableReload"
                name=" freezePOEDispatchTowableReload"
                value={freezePOEDispatchTowableReload}
                checked={freezePOEDispatchTowableReload}
                disabled={viewDetail}
                onChange={(e) => {
                  setFreezePOEDispatchTowableReload(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
}

export default Switches;
