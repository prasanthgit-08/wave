import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setBreakdownDelayIndex,
  setBreakdownUnitFK,
  setDelayedUnitBreakdownFKInt,
  setDelayedUnitExpensePK,
  setInvoicePermitsDelayedExpenses,
  setInvoiceTollsDelayedExpenses,
  setTotalBreakdownDriverPermit,
  setTotalBreakdownDriverTolls,
  setTotalBreakdownPermit,
  setTotalBreakdownTolls,
  setTotalInvoiceForEachUnit,
} from "../../../../../redux/Invoicing/PaperworkProcessingSlice";

const GeneralTab = () => {
  const dispatch = useDispatch();

  const breakdownDelayArray = useSelector((state) => state.paperworkProcessing.breakdownDelayArray);
  const breakdownDelayIndex = useSelector((state) => state.paperworkProcessing.breakdownDelayIndex);
  const invoiceTollsDelayedExpenses = useSelector(
    (state) => state.paperworkProcessing.invoiceTollsDelayedExpenses
  );
  const invoicePermitsDelayedExpenses = useSelector(
    (state) => state.paperworkProcessing.invoicePermitsDelayedExpenses
  );
  const [firstNameDriverDelayed, setFirstNameDriverDelayed] = useState("");
  const [lastNameDriverDelayed, setLastNameDriverDelayed] = useState("");
  const [invoiceDowntimeHours, setInvoiceDowntimeHours] = useState(0);
  const [invoiceDowntimeRate, setInvoiceDowntimeRate] = useState(0);
  const [invoiceDowntimeAmount, setInvoiceDowntimeAmount] = useState(0);
  const [driverDowntimeHours, setDriverDowntimeHours] = useState(0);
  const [driverDowntimeRate, setDriverDowntimeRate] = useState(0);
  const [driverDowntimeAmount, setDriverDowntimeAmount] = useState(0);
  const [driverAPUAmount, setDriverAPUAmount] = useState(0);
  const [invoiceAPUAmount, setInvoiceAPUAmount] = useState(0);
  const [apuAuthorizedBy, setApuAuthorizedBy] = useState("");
  const [driverPermitsDelayedExpenses, setDriverPermitsDelayedExpenses] = useState(0);
  const [driverTollsDelayedExpenses, setDriverTollsDelayedExpenses] = useState(0);
  const [driverFuelGallons, setDriverFuelGallons] = useState(0);
  const [fuelPricePerGallon, setFuelPricePerGallon] = useState(0);
  const [driverFuelCredit, setDriverFuelCredit] = useState(0);
  const [invoiceMilesDelayedExpenses, setInvoiceMilesDelayedExpenses] = useState(0);
  const [invoiceRateSum, setInvoiceRateSum] = useState(0);
  const [invoiceAdditionalMilesAmount, setInvoiceAdditionalMilesAmount] = useState(0);
  const [driverMiles, setDriverMiles] = useState(0);
  const [driverRateSum, setDriverRateSum] = useState(0);
  const [driverAdditionalMilesAmount, setDriverAdditionalMilesAmount] = useState(0);
  const [invoiceBreakdownFee, setInvoiceBreakdownFee] = useState(0);
  const [driverBreakdownFee, setDriverBreakdownFee] = useState(0);
  const [firstNameNextDriverDelayed, setFirstNameNextDriverDelayed] = useState("");
  const [lastNameNextDelayed, setLastNameNextDelayed] = useState("");
  const [nextDriverFuelGallons, setNextDriverFuelGallons] = useState(0);
  const [nextDriverFuelCharge, setNextDriverFuelCharge] = useState(0);
  const [unitNumber, setUnitNumber] = useState("");
  const selectedDelayUnitBreakdownFK = useSelector(
    (state) => state.paperworkProcessing.selectedDelayUnitBreakdownFK
  );

  useEffect(() => {
    const currentItem = breakdownDelayArray.find(
      (item) => item.delayedUnitBreakdownFKInt === selectedDelayUnitBreakdownFK
    );
    if (breakdownDelayArray?.length > 0 && breakdownDelayIndex < breakdownDelayArray?.length) {
      dispatch(setDelayedUnitExpensePK(currentItem?.delayedUnitExpensePK || null));
      dispatch(setBreakdownUnitFK(currentItem?.unitFKInt || null));
      setFirstNameDriverDelayed(currentItem?.driverFirstName?.trim() || "");
      setLastNameDriverDelayed(currentItem?.driverLastName?.trim() || "");
      setInvoiceDowntimeHours(currentItem?.invoiceDowntimeHours || 0);
      setInvoiceDowntimeRate(currentItem?.invoiceDowntimeRate || 0);
      setInvoiceDowntimeAmount(currentItem?.invoiceDowntimeAmount || 0);
      setDriverDowntimeHours(currentItem?.driverDowntimeHours || 0);
      setDriverDowntimeRate(currentItem?.driverDowntimeRate || 0);
      setDriverDowntimeAmount(currentItem?.driverDowntimeAmount || 0);
      setDriverAPUAmount(currentItem?.driverAPUAmount || 0);
      setInvoiceAPUAmount(currentItem?.invoiceAPUAmount || 0);
      setApuAuthorizedBy(currentItem?.apuAuthorizedBy || "");
      dispatch(setInvoicePermitsDelayedExpenses(currentItem?.invoicePermits || 0));
      setDriverPermitsDelayedExpenses(currentItem?.driverPermits || 0);
      dispatch(setInvoiceTollsDelayedExpenses(currentItem?.invoiceTolls || 0));
      setDriverTollsDelayedExpenses(currentItem?.driverTolls || 0);
      setDriverFuelGallons(currentItem?.driverFuelGallons || 0);
      setFuelPricePerGallon(currentItem?.fuelPricePerGallon || 0);
      setDriverFuelCredit(currentItem?.driverFuelCredit || 0);
      setInvoiceMilesDelayedExpenses(currentItem?.invoiceMiles || 0);
      setInvoiceRateSum(currentItem?.invoiceRateSum || 0);
      setInvoiceAdditionalMilesAmount(currentItem?.invoiceAdditionalMilesAmount || 0);
      setDriverMiles(currentItem?.driverMiles || 0);
      setDriverRateSum(currentItem?.driverRateSum || 0);
      setDriverAdditionalMilesAmount(currentItem?.driverAdditionalMilesAmount || 0);
      setInvoiceBreakdownFee(currentItem?.invoiceBreakdownFee || 0);
      setDriverBreakdownFee(currentItem?.driverBreakdownFee || 0);
      setFirstNameNextDriverDelayed(currentItem?.nextDriverFirstName?.trim() || "");
      setLastNameNextDelayed(currentItem?.nextDriverLastName?.trim() || "");
      setNextDriverFuelGallons(currentItem?.nextDriverFuelGallons || 0);
      setNextDriverFuelCharge(currentItem?.nextDriverFuelCharge || 0);
      dispatch(
        setTotalBreakdownPermit(
          breakdownDelayArray[breakdownDelayArray?.length - 1].totalBreakdownPermit || 0
        )
      );
      dispatch(
        setTotalBreakdownTolls(breakdownDelayArray[breakdownDelayArray?.length - 1].totalBreakdownTolls || 0)
      );
      dispatch(
        setTotalBreakdownDriverPermit(
          breakdownDelayArray[breakdownDelayArray?.length - 1].totalBreakdownDriverPermit || 0
        )
      );
      dispatch(
        setTotalBreakdownDriverTolls(
          breakdownDelayArray[breakdownDelayArray?.length - 1].totalBreakdownDriverTolls || 0
        )
      );
      dispatch(setTotalInvoiceForEachUnit(currentItem?.totalInvoiceForEachUnit || 0));
      dispatch(setDelayedUnitBreakdownFKInt(currentItem?.delayedUnitBreakdownFKInt || null));
      setUnitNumber(currentItem?.unitNumber?.trim() || "");
    }
  }, [breakdownDelayArray, breakdownDelayIndex, selectedDelayUnitBreakdownFK]);

  useEffect(() => {
    dispatch(setBreakdownDelayIndex(0));
  }, []);

  return (
    <div>
      <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-1">
        <Col sm={2} md={2} xs={2} className="p-0 text-end">
          <Form.Label className="customColFormLabel me-4">Unit Number</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 ">
          <input
            name="unitNumber"
            id="unitNumber"
            type="text"
            className={`customFormControl`}
            value={unitNumber}
            disabled
            maxLength={30}
            autoComplete="off"
            aria-autocomplete="list"
          />
        </Col>
      </Form.Group>

      <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-1">
        <Col sm={2} md={2} xs={2} className="p-0" />
        <Col xs={2} md={2} sm={2} className="p-0 ">
          <input
            name="label"
            id="label"
            type="text"
            className="customFormControl"
            maxLength={60}
            value={firstNameDriverDelayed + " " + lastNameDriverDelayed}
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
              value={invoicePermitsDelayedExpenses}
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
              value={driverPermitsDelayedExpenses}
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
              value={invoiceTollsDelayedExpenses}
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
              value={driverTollsDelayedExpenses}
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
          <div
            className={`d-flex flex-shrink-0 w-100px ${driverMiles > 0 || invoiceMilesDelayedExpenses > 0 ? "" : "hide-elements"}`}
          >
            <Form.Label className="customColFormLabel ms-1">Miles</Form.Label>
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${invoiceRateSum > 0 || driverRateSum > 0 ? "" : "hide-elements"}`}
          >
            <Form.Label className="customColFormLabel ms-1">Rate</Form.Label>
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
          <Col xs={4} className="text-end">
            <Form.Label className="customColFormLabel">Invoice Additional Miles</Form.Label>
          </Col>
          <div
            className={`d-flex flex-shrink-0 w-100px ${invoiceMilesDelayedExpenses > 0 ? "" : "hide-elements"}`}
          >
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={invoiceMilesDelayedExpenses}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className={`d-flex flex-shrink-0 w-100px ${invoiceRateSum > 0 ? "" : "hide-elements"}`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={invoiceRateSum}
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
              value={invoiceAdditionalMilesAmount}
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
          <div className={`d-flex flex-shrink-0 w-100px ${driverMiles > 0 ? "" : "hide-elements"}`}>
            <input
              name="customer"
              id="customer"
              type="text"
              className="customFormControl"
              maxLength={5}
              value={driverMiles}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>

          <div className={`d-flex flex-shrink-0 w-100px ${driverRateSum > 0 ? "" : "hide-elements"}`}>
            <input
              name="invoiceMiles"
              id="invoiceMiles"
              type="text"
              className="customFormControl"
              maxLength={30}
              value={driverRateSum}
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
              value={driverAdditionalMilesAmount}
              autoComplete="off"
              aria-autocomplete="list"
              disabled
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
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
              value={firstNameNextDriverDelayed + " " + lastNameNextDelayed}
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
