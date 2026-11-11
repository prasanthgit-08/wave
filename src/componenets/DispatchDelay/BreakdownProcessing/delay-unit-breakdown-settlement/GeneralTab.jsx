import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  setGeneralTabData,
  setGeneralTabFormData,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/SettlementSlice";
import { useDispatch, useSelector } from "react-redux";
import SettlementDelayService from "../../../../services/DispatchDelay/BreakdownProcessing/SettlementDelayService";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../../common/LoadingIcon";

const GeneralTab = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const delayedUnitPK = params.delayedUnitPK;
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const [driverName, setDriverName] = useState("");
  const [loader, setLoader] = useState(false);

  const [invoiceDowntimeHours, setInvoiceDowntimeHours] = useState(0);
  const [invoiceDowntimeRate, setInvoiceDowntimeRate] = useState(0);
  const [invoiceDowntimeAmount, setInvoiceDowntimeAmount] = useState(0);
  const [driverDowntimeHours, setDriverDowntimeHours] = useState(0);
  const [driverDowntimeRate, setDriverDowntimeRate] = useState(0);
  const [driverDowntimeAmount, setDriverDowntimeAmount] = useState(0);
  const [invoiceAPUAmount, setInvoiceAPUAmount] = useState(0);
  const [driverAPUAmount, setDriverAPUAmount] = useState(0);
  const [apuAuthorizedBy, setApuAuthorizedBy] = useState("");
  const [invoicePermits, setInvoicePermits] = useState(0);
  const [driverPermits, setDriverPermits] = useState(0);
  const [invoiceTolls, setInvoiceTolls] = useState(0);
  const [driverTolls, setDriverTolls] = useState(0);
  const [fuelPricePerGallon, setFuelPricePerGallon] = useState(0);
  const [driverFuelGallons, setDriverFuelGallons] = useState(0);
  const [driverFuelCredit, setDriverFuelCredit] = useState(0);
  const [additionalInvMiles, setAdditionalInvMiles] = useState(0);
  const [additionalInvRate, setAdditionalInvRate] = useState(0);
  const [additionalInvAmount, setAdditionalInvAmount] = useState(0);
  const [additionalDriverMiles, setAdditionalDriverMiles] = useState(0);
  const [additionalDriverRate, setAdditionalDriverRate] = useState(0);
  const [additionalDriverAmount, setAdditionalDriverAmount] = useState(0);
  const [invoiceBreakdownFee, setInvoiceBreakdownFee] = useState(0);
  const [driverBreakdownFee, setDriverBreakdownFee] = useState(0);
  const [nextDriverFuelGallons, setNextDriverFuelGallons] = useState(0);
  const [nextDriverFuelCharge, setNextDriverFuelCharge] = useState(0);
  const [secondDriverName, setSecondDriverName] = useState("");
  const [delayedUnitExpensePK, setDelayedUnitExpensePK] = useState(null);

  const delayedUnitBreakDownFK = useSelector((state) => state.settlementReducer.delayedUnitBreakDownFK);
  const sortValueFeeTab = useSelector((state) => state.settlementReducer.sortValueFeeTab);
  const sortTypeFeeTab = useSelector((state) => state.settlementReducer.sortTypeFeeTab);
  const pageNumber = useSelector((state) => state.settlementReducer.pageNumber);
  const generalTabFormData = useSelector((state) => state.settlementReducer.generalTabFormData);
  const feeData = useSelector((state) => state.settlementReducer.feeData);

  const fetchRecordById = () => {
    SettlementDelayService.getSettlementRecordById(delayedUnitBreakDownFK, breakdownCompanyName)
      .then((response) => {
        const data = response?.data;
        dispatch(setGeneralTabFormData(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(
      setGeneralTabData({
        delayedUnitExpensePK: delayedUnitExpensePK,
        driverName: driverName,
        invoiceDowntimeHours: invoiceDowntimeHours,
        invoiceDowntimeRate: invoiceDowntimeRate,
        invoiceDowntimeAmount: invoiceDowntimeAmount,
        driverDowntimeHours: driverDowntimeHours,
        driverDowntimeRate: driverDowntimeRate,
        driverDowntimeAmount: driverDowntimeAmount,
        invoiceAPUAmount: invoiceAPUAmount,
        driverAPUAmount: driverAPUAmount,
        apuAuthorizedBy: apuAuthorizedBy,
        invoicePermits: invoicePermits,
        driverPermits: driverPermits,
        invoiceTolls: invoiceTolls,
        driverTolls: driverTolls,
        fuelPricePerGallon: fuelPricePerGallon,
        driverFuelGallons: driverFuelGallons,
        driverFuelCredit: driverFuelCredit,
        additionalInvMiles: additionalInvMiles,
        additionalInvRate: additionalInvRate,
        additionalInvAmount: additionalInvAmount,
        additionalDriverMiles: additionalDriverMiles,
        additionalDriverRate: additionalDriverRate,
        additionalDriverAmount: additionalDriverAmount,
        invoiceBreakdownFee: invoiceBreakdownFee,
        driverBreakdownFee: driverBreakdownFee,
        nextDriverFuelGallons: nextDriverFuelGallons,
        nextDriverFuelCharge: nextDriverFuelCharge,
        secondDriverName: secondDriverName,
      })
    );
  }, [
    driverName,
    invoiceDowntimeHours,
    invoiceDowntimeRate,
    invoiceDowntimeAmount,
    driverDowntimeHours,
    driverDowntimeRate,
    driverDowntimeAmount,
    invoiceAPUAmount,
    driverAPUAmount,
    apuAuthorizedBy,
    invoicePermits,
    driverPermits,
    invoiceTolls,
    driverTolls,
    fuelPricePerGallon,
    driverFuelGallons,
    driverFuelCredit,
    additionalInvMiles,
    additionalInvRate,
    additionalInvAmount,
    additionalDriverMiles,
    additionalDriverRate,
    additionalDriverAmount,
    invoiceBreakdownFee,
    driverBreakdownFee,
    nextDriverFuelGallons,
    nextDriverFuelCharge,
    secondDriverName,
  ]);

  useEffect(() => {
    if (generalTabFormData != null) {
      const data = generalTabFormData;
      setDriverName(data?.driverName || "");
      setInvoiceDowntimeHours(data?.invoiceDowntimeHours || 0);
      setInvoiceDowntimeRate(data?.invoiceDowntimeRate || 0);
      setInvoiceDowntimeAmount(data?.invoiceDowntimeAmount || 0);
      setDriverDowntimeHours(data?.driverDowntimeHours || 0);
      setDriverDowntimeRate(data?.driverDowntimeRate || 0);
      setDriverDowntimeAmount(data?.driverDowntimeAmount || 0);
      setInvoiceAPUAmount(data?.invoiceAPUAmount || 0);
      setDriverAPUAmount(data?.driverAPUAmount || 0);
      setApuAuthorizedBy(data?.aPUAuthorizedBy || "");
      setInvoicePermits(data?.invoicePermits || 0);
      setDriverPermits(data?.driverPermits || 0);
      setInvoiceTolls(data?.invoiceTolls || 0);
      setDriverTolls(data?.driverTolls || 0);
      setFuelPricePerGallon(data?.fuelPricePerGallon || 0);
      setDriverFuelGallons(data?.driverFuelGallons || 0);
      setDriverFuelCredit(data?.driverFuelCredit || 0);
      setAdditionalInvMiles(data?.additional_Inv_Miles || 0);
      setAdditionalInvRate(data?.additional_Inv_Rate || 0);
      setAdditionalInvAmount(data?.additional_Inv_Amount || 0);
      setAdditionalDriverMiles(data?.additional_Driver_Miles || 0);
      setAdditionalDriverRate(data?.additional_Driver_Rate || 0);
      setAdditionalDriverAmount(data?.additional_Driver_Amount || 0);
      setInvoiceBreakdownFee(data?.invoiceBreakdownFee || 0);
      setDriverBreakdownFee(data?.driverBreakdownFee || 0);
      setNextDriverFuelGallons(data?.nextDriverFuelGallons || 0);
      setNextDriverFuelCharge(data?.nextDriverFuelCharge || 0);
      setSecondDriverName(data?.secondDriverName || "");
      setDelayedUnitExpensePK(data?.delayedUnitExpensePK || null);
    }
  }, [generalTabFormData]);

  useEffect(() => {
    if (delayedUnitBreakDownFK) fetchRecordById();
  }, [delayedUnitBreakDownFK, breakdownCompanyName]);

  return (
    <div>
      <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-1">
        <Col sm={2} md={2} xs={2} className="p-0" />
        <Col xs={2} md={2} sm={2} className="p-0 ">
          <input
            name="label"
            id="label"
            type="text"
            className="customFormControl"
            maxLength={60}
            value={driverName}
            autoComplete="off"
            aria-autocomplete="list"
            disabled
          />
        </Col>
      </Form.Group>

      <Row className="mx-0 p-0 mt-2">
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
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

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Invoice Downtime</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={invoiceDowntimeHours}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={6}
              value={invoiceDowntimeRate}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={invoiceDowntimeAmount}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Drivers Downtime</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={driverDowntimeHours}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={6}
              value={driverDowntimeRate}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px hide-elements" />
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={driverDowntimeAmount}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
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
              className="customFormControl"
              maxLength={8}
              value={invoiceAPUAmount}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={driverAPUAmount}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Attempted Pickup Authorized By</Form.Label>
          </Col>
          <div className="d-flex flex-shrink-0 w-250">
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={apuAuthorizedBy}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
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
              className="customFormControl"
              maxLength={8}
              value={invoicePermits}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={driverPermits}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
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
              className="customFormControl"
              maxLength={8}
              value={invoiceTolls}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={driverTolls}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} />
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Gallons</Form.Label>
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Price</Form.Label>
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Fuel Credit</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={driverFuelGallons}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={6}
              value={fuelPricePerGallon}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px hide-elements" />
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={driverFuelCredit}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} />
          <div className={`d-flex flex-shrink-0 w-100px `}>
            <Form.Label className="customColFormLabel ms-1">Miles</Form.Label>
          </div>
          <div className={`d-flex flex-shrink-0 w-100px `}>
            <Form.Label className="customColFormLabel ms-1">Rate</Form.Label>
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Invoice Additional Miles</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px `}>
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={additionalInvMiles}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className={`d-flex flex-shrink-0 w-100px `}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={additionalInvRate}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={additionalInvAmount}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-100px hide-elements" />
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Driver Additional Miles</Form.Label>
          </Col>
          <div className={`d-flex flex-shrink-0 w-100px `}>
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={additionalDriverMiles}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className={`d-flex flex-shrink-0 w-100px `}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={additionalDriverRate}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px hide-elements" />
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={additionalDriverAmount}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
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
              className="customFormControl"
              maxLength={8}
              value={invoiceBreakdownFee}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={driverBreakdownFee}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col sm={2} md={2} xs={2} className="p-0" />
          <Col xs={2} md={2} sm={2} className="p-0 ">
            <input
              name="label"
              id="label"
              type="text"
              className="customFormControl"
              maxLength={60}
              value={secondDriverName}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </Col>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} />
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Gallons</Form.Label>
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <Form.Label className="customColFormLabel ms-1">Price</Form.Label>
          </div>
        </Form.Group>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Fuel Charge</Form.Label>
          </Col>

          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={nextDriverFuelGallons}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className={`d-flex flex-shrink-0 w-100px`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={6}
              value={fuelPricePerGallon}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
          <div className="d-flex flex-shrink-0 w-120px hide-elements" />
          <div className="d-flex flex-shrink-0 w-120px">
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={8}
              value={nextDriverFuelCharge}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>
      </Row>
    </div>
  );
};

export default GeneralTab;
