import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceMiles,
  setInvoicePercentage,
  setOverInvoicePercentage,
  setInvoiceFlatrate,
  setFlatRateReturn,
  setInvoiceMinimumRate,
  setFodInvoice,
  setFodInvoiceAmount,
  setPrepaidAmount,
  setBillTolls,
  setMaximumTolls,
  setBillPermits,
  setMaximumPermits,
  setBillWash,
  setMaximumWash,
  setBaseRate,
  setReturnRate,
  setFuelSurchargeRate,
  setCdlRate,
  setCdlReturn,
  setInvoiceApportionedReturn,
  setInvoiceApportionedRate,
  setSupplementalRate,
  setSupplementalFuelSurchargeRate,
  setSupplementalRateReturn,
  setSupplementalRateDescription,
  setLengthRate,
  setLengthRateReturn,
  setAdditionalRate,
  setAdditionalFuelSurchargeRate,
  setAdditionalRateReturn,
  setAdditionalRateDescription,
  setSpecialRate,
  setSpecialFuelSurchargeRate,
  setSpecialRateReturn,
  setSpecialRateDescription,
  setDriverRate,
  setDriverFuelSurchargeRate,
  setDriverRateReturn,
  setDriverRateDescription,
  setInvoiceCanadianCharge,
  setInvoiceUsCharge,
  setInvoicePortEscortFee,
  setInvoiceELDFee,
  setEldFeeDescription,
  setPreInvoiced,
  setInvoiceTabData,
  setInvoiceAdditionalFlatRate,
  setTriggeringAmountCalculation,
  setCanadianDelivery,
  setCanadianPickup,
  setIsTowableSingle,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressInvoiceTabSlice";
import { setInvoiceAmountForOpenBalances } from "../../../../../../redux/EditMasterExpress/EditMasterExpressOpenBalancesTabSlice";
import { correctDecimalInputOnBlur, lastpointer } from "../../../../../../utils/utils";
import { setFlagChanged } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import Input from "../../../../../../components/common/input";

function Invoice({ styles }) {
  const dispatch = useDispatch();

  const [customerId, setCustomerId] = useState(null);
  const [customerRateFK, setCustomerRateFK] = useState(null);
  const [reload, setReload] = useState(false);
  const [flatRated, setFlatRated] = useState(false);
  const [driverId, setDriverId] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [invoiceRate, setInvoiceRate] = useState(null);
  const [invoiceEmail, setInvoiceEmail] = useState("");
  const [deliveryDealerId, setDeliveryDealerId] = useState(null);
  const [billingCustomerPlantId, setBillingCustomerPlantId] = useState(null);
  const [motorized, setMotorized] = useState(false);
  const [customerPlantId, setCustomerPlantId] = useState(null);
  const [unitTypeId, setUnitTypeId] = useState(null);
  const [pickupAtPlant, setPickupAtPlant] = useState(false);
  const [mileageRate, setMileageRate] = useState(null);

  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const amountCalculationData = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.amountCalculationData
  );

  const preInvoiced = useSelector((state) => state.editMasterExpressInvoiceTabReducer.preInvoiced);
  const invoiceMiles = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceMiles);
  const invoicePercentage = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoicePercentage
  );
  const overInvoicePercentage = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.overInvoicePercentage
  );
  const invoiceFlatrate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceFlatrate);
  const flatRateReturn = useSelector((state) => state.editMasterExpressInvoiceTabReducer.flatRateReturn);
  const invoiceMinimumRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoiceMinimumRate
  );
  const fodInvoice = useSelector((state) => state.editMasterExpressInvoiceTabReducer.fodInvoice);
  const fodInvoiceAmount = useSelector((state) => state.editMasterExpressInvoiceTabReducer.fodInvoiceAmount);
  const prepaidAmount = useSelector((state) => state.editMasterExpressInvoiceTabReducer.prepaidAmount);
  const billTolls = useSelector((state) => state.editMasterExpressInvoiceTabReducer.billTolls);
  const maximumTolls = useSelector((state) => state.editMasterExpressInvoiceTabReducer.maximumTolls);
  const billPermits = useSelector((state) => state.editMasterExpressInvoiceTabReducer.billPermits);
  const maximumPermits = useSelector((state) => state.editMasterExpressInvoiceTabReducer.maximumPermits);
  const billWash = useSelector((state) => state.editMasterExpressInvoiceTabReducer.billWash);
  const maximumWash = useSelector((state) => state.editMasterExpressInvoiceTabReducer.maximumWash);
  const returnRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.returnRate);
  const fuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.fuelSurchargeRate
  );
  const cdlRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.cdlRate);
  const cdlReturn = useSelector((state) => state.editMasterExpressInvoiceTabReducer.cdlReturn);
  const invoiceApportionedRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoiceApportionedRate
  );
  const invoiceApportionedReturn = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoiceApportionedReturn
  );
  const supplementalRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.supplementalRate);
  const supplementalFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.supplementalFuelSurchargeRate
  );
  const supplementalRateReturn = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.supplementalRateReturn
  );
  const supplementalRateDescription = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.supplementalRateDescription
  );
  const lengthRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.lengthRate);
  const lengthRateReturn = useSelector((state) => state.editMasterExpressInvoiceTabReducer.lengthRateReturn);
  const additionalRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.additionalRate);
  const additionalFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.additionalFuelSurchargeRate
  );
  const additionalRateReturn = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.additionalRateReturn
  );
  const additionalRateDescription = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.additionalRateDescription
  );
  const specialRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.specialRate);
  const specialFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.specialFuelSurchargeRate
  );
  const specialRateReturn = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.specialRateReturn
  );
  const specialRateDescription = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.specialRateDescription
  );
  const driverRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.driverRate);
  const driverFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.driverFuelSurchargeRate
  );
  const driverRateReturn = useSelector((state) => state.editMasterExpressInvoiceTabReducer.driverRateReturn);
  const driverRateDescription = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.driverRateDescription
  );
  const invoiceCanadianCharge = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoiceCanadianCharge
  );
  const invoiceUsCharge = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceUsCharge);
  const invoicePortEscortFee = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoicePortEscortFee
  );
  const invoiceELDFee = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceELDFee);
  const eldFeeDescription = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.eldFeeDescription
  );
  const invoiceAdditionalFlatRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoiceAdditionalFlatRate
  );
  const baseRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.baseRate);

  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const candianDelivery = useSelector((state) => state.editMasterExpressInvoiceTabReducer.candianDelivery);
  const isTowableSingle = useSelector((state) => state.editMasterExpressInvoiceTabReducer.isTowableSingle);
  const isUnitReload = useSelector((state) => state.editMasterExpressTabsReducer.isUnitReload);
  const handleNull = (value) => {
    return value === null || String(value)?.trim() === "" ? 0 : value;
  };

  const updateInvoiceValues = (data) => {
    setUnitId(data?.unitPK || null);

    // Dispatching data to Redux
    dispatch(setPreInvoiced(data?.preInvoiced || false));
    dispatch(setInvoiceMiles(data?.invoiceMiles || 0));
    dispatch(setInvoicePercentage(data?.invoicePercentage || 0));
    dispatch(setOverInvoicePercentage(data?.overInvoicePercentage || 0));
    dispatch(setInvoiceFlatrate(data?.invoiceFlatrate || data?.invoiceFlatRate || 0));
    dispatch(setFlatRateReturn(data?.invoiceReturnFlatRate || 0));
    dispatch(setInvoiceMinimumRate(data?.invoiceMinimumRate || false));
    dispatch(setFodInvoice(data?.fodinvoice || false));
    dispatch(setFodInvoiceAmount(data?.fodinvoiceAmount || 0));
    dispatch(setPrepaidAmount(data?.prepaidAmount || 0));
    dispatch(setBillTolls(data?.billTolls || false));
    dispatch(setMaximumTolls(data?.maximumTolls || 0));
    dispatch(setBillPermits(data?.billPermits || false));
    dispatch(setMaximumPermits(data?.maximumPermits || 0));
    dispatch(setBillWash(data?.billWash || false));
    dispatch(setMaximumWash(data?.maximumWash || 0));
    dispatch(setBaseRate(data?.baseRate || 0));
    dispatch(setReturnRate(data?.invoiceReturnRate || 0));
    dispatch(setFuelSurchargeRate(data?.invoiceFuelSurchargeRate || 0));
    dispatch(setCdlRate(data?.invoiceCdlRate || 0));
    dispatch(setCdlReturn(data?.invoiceCDLAReturn || false));
    dispatch(setInvoiceApportionedRate(data?.invoiceApportionedRate || 0));
    dispatch(setInvoiceApportionedReturn(data?.invoiceApportionedReturn || false));
    dispatch(setSupplementalRate(data?.invoiceSupplementalRate || 0));
    dispatch(setSupplementalFuelSurchargeRate(data?.invoiceSupplementalFuelSurchargeRate || 0));
    dispatch(setSupplementalRateReturn(data?.invoiceSupplementalReturn || false));
    dispatch(setSupplementalRateDescription(data?.invoiceSupplementalDescription || ""));
    dispatch(setLengthRate(data?.invoiceLengthRate || 0));
    dispatch(setLengthRateReturn(data?.invoiceLengthReturn || false));
    dispatch(setAdditionalRate(data?.invoiceAdditionalRate || 0));
    dispatch(setAdditionalFuelSurchargeRate(data?.invoiceAdditionalFuelSurchargeRate || 0));
    dispatch(setAdditionalRateReturn(data?.invoiceAdditionalReturn || false));
    dispatch(setAdditionalRateDescription(data?.invoiceAdditionalDescription || ""));
    dispatch(setSpecialRate(data?.invoiceSpecialRate || 0));
    dispatch(setSpecialFuelSurchargeRate(data?.invoiceSpecialFuelSurchargeRate || 0));
    dispatch(setSpecialRateReturn(data?.invoiceSpecialReturn || false));
    dispatch(setSpecialRateDescription(data?.invoiceSpecialDescription || ""));
    dispatch(setDriverRate(data?.invoiceDriverRate || 0));
    dispatch(setDriverFuelSurchargeRate(data?.invoiceDriverFuelSurchargeRate || 0));
    dispatch(setDriverRateReturn(data?.invoiceDriverReturn || false));
    dispatch(setDriverRateDescription(data?.invoiceDriverDescription || ""));
    dispatch(setInvoiceCanadianCharge(data?.invoiceCanadianCharge || 0));
    dispatch(setInvoiceUsCharge(data?.invoiceUSCharge || 0));
    dispatch(setInvoicePortEscortFee(data?.invoicePortEscortFee || 0));
    dispatch(setInvoiceELDFee(data?.invoiceELDFee || 0));
    dispatch(setEldFeeDescription(data?.invoiceELDDescription || ""));
    dispatch(setInvoiceAdditionalFlatRate(data?.invoiceAdditionalFlatRate || 0));
    dispatch(setBaseRate(data?.invoiceRate || 0));
    setCustomerRateFK(data?.invoiceCustomerRateId || null);
    setCustomerId(data?.customerId || null);
    setReload(data?.reload || false);
    setFlatRated(!!data?.invoiceFlatRate);
    dispatch(setIsTowableSingle(data?.isTowableSingle || false));
    setDriverId(data?.driverId || null);
    setInvoiceRate(data?.invoiceRate || 0);
    setInvoiceEmail(data?.invoiceMiles || 0);
    setDeliveryDealerId(data?.deliveryDealerId || null);
    setCustomerPlantId(data?.customerPlantId || null);
    setMotorized(data?.motorized || false);
    setUnitTypeId(data?.unitTypeId || null);
    setPickupAtPlant(data?.pickupAtPlant || false);
    setMileageRate(data?.mileageRate || 0);
    dispatch(setCanadianDelivery(data?.canadianDelivery || false));
    dispatch(setCanadianPickup(data?.canadianPickup || false));
    dispatch(
      setInvoiceAmountForOpenBalances(
        data?.fodinvoiceAmount > 0
          ? data?.fodinvoiceAmount
          : data?.invoiceMiles *
              (data?.invoiceRate +
                data?.invoiceSupplementalRate +
                (data?.invoiceAdditionalFlatRate > 0
                  ? data?.invoiceAdditionalFlatRate
                  : data?.invoiceAdditionalRate) +
                data?.invoiceSpecialRate +
                data?.invoiceLengthRate +
                (data?.invoiceUSCharge > 0 ? data?.invoiceUSCharge : data?.invoiceCanadianCharge) +
                data?.invoicePortEscortFee +
                data?.invoiceELDFee +
                (data?.invoiceFuelSurchargeRate +
                  data?.invoiceAdditionalFuelSurchargeRate +
                  data?.invoiceSpecialFuelSurchargeRate +
                  data?.invoiceSupplementalFuelSurchargeRate))
      )
    );
  };

  const mapInvoiceRatesToRedux = () => {
    dispatch(
      setInvoiceTabData({
        preInvoiced: handleNull(preInvoiced),
        invoiceMiles: handleNull(invoiceMiles),
        customerId: handleNull(customerId),
        customerFK: handleNull(customerId),
        invoicePercentage: handleNull(invoicePercentage),
        overInvoicePercentage: handleNull(overInvoicePercentage),
        invoiceFlatrate: handleNull(invoiceFlatrate),
        invoiceReturnFlatRate: handleNull(flatRateReturn),
        invoiceMinimumRate: handleNull(invoiceMinimumRate),
        fodInvoice: handleNull(fodInvoice),
        fodInvoiceAmount: handleNull(fodInvoiceAmount),
        mileageRate: handleNull(fodInvoiceAmount),
        prepaidAmount: handleNull(prepaidAmount),
        billTolls: handleNull(billTolls),
        maximumTolls: handleNull(maximumTolls),
        billPermits: handleNull(billPermits),
        maximumPermits: handleNull(maximumPermits),
        billWash: handleNull(billWash),
        maximumWash: handleNull(maximumWash),
        invoiceRate: handleNull(baseRate),
        invoiceReturnRate: handleNull(returnRate),
        invoiceFuelSurchargeRate: handleNull(fuelSurchargeRate),
        invoiceCDLARate: handleNull(cdlRate),
        invoiceCDLAReturn: handleNull(cdlReturn),
        invoiceApportionedRate: handleNull(invoiceApportionedRate),
        invoiceApportionedReturn: handleNull(invoiceApportionedReturn),
        invoiceSupplementalRate: handleNull(supplementalRate),
        invoiceSupplementalFuelSurchargeRate: handleNull(supplementalFuelSurchargeRate),
        invoiceSupplementalReturn: handleNull(supplementalRateReturn),
        invoiceSupplementalDescription: supplementalRateDescription,
        invoiceLengthRate: handleNull(lengthRate),
        invoiceLengthReturn: handleNull(lengthRateReturn),
        invoiceAdditionalRate: handleNull(additionalRate),
        invoiceAdditionalFuelSurchargeRate: handleNull(additionalFuelSurchargeRate),
        invoiceAdditionalReturn: handleNull(additionalRateReturn),
        invoiceAdditionalDescription: additionalRateDescription,
        invoiceAdditionalFlatRateDescription: additionalRateDescription,

        invoiceSpecialRate: handleNull(specialRate),
        invoiceSpecialFuelSurchargeRate: handleNull(specialFuelSurchargeRate),
        invoiceSpecialReturn: handleNull(specialRateReturn),
        invoiceSpecialDescription: specialRateDescription,
        invoiceDriverRate: handleNull(driverRate),
        driverFuelSurchargeRate: handleNull(driverFuelSurchargeRate),
        invoiceDriverReturn: handleNull(driverRateReturn),
        invoiceDriverDescription: driverRateDescription,
        invoiceCanadianCharge: handleNull(invoiceCanadianCharge),
        invoiceUSCharge: handleNull(invoiceUsCharge),
        invoicePortEscortFee: handleNull(invoicePortEscortFee),
        invoiceELDFee: handleNull(invoiceELDFee),
        invoiceELDDescription: eldFeeDescription,
        reload: handleNull(isUnitReload),
        customerRateFK: customerRateFK,
        invoiceCustomerRateId: customerRateFK,
        invoiceCustomerRateFK: customerRateFK,
        invoiceAdditionalFlatRate: handleNull(invoiceAdditionalFlatRate),
        flatRated: handleNull(flatRated),
        driverFK: driverId,
        unitPK: Number(unitId),
        deliveryDealerId: deliveryDealerId,
        deliveryDealerFK: deliveryDealerId,
        billingCustomerPlantId: billingCustomerPlantId,
        motorized: handleNull(motorized),
        customerPlantId: customerPlantId,
        customerPlantFK: billingCustomerPlantId,
        unitTypeId: unitTypeId,
        unitTypeFK: unitTypeId,
        pickupAtPlant: handleNull(pickupAtPlant),
      })
    );
  };

  const decimalRegex = /^-?\d{1,5}(\.\d{0,2})?$/;
  const longDecimalRegex = /^-?\d{1,2}(\.\d{0,4})?$/;
  const shortDecimalRegex = /^-?\d{1,2}(\.\d{0,2})?$/;
  const integerRegex = /^-?\d{1,4}$/;

  const validateDecimal = (value) => {
    return value === "" || decimalRegex.test(value);
  };
  const validateInteger = (value) => {
    return value === "" || integerRegex.test(value);
  };
  const validateShortDecimal = (value) => {
    return value === "" || shortDecimalRegex.test(value);
  };
  const validateLongDecimal = (value) => {
    return value === "" || longDecimalRegex.test(value);
  };

  const clearMileageRateFields = () => {
    dispatch(setBaseRate(0));
    dispatch(setReturnRate(0));
    dispatch(setFuelSurchargeRate(0));
    dispatch(setCdlRate(0));
    dispatch(setCdlReturn(false));
    dispatch(setInvoiceApportionedRate(0));
    dispatch(setInvoiceApportionedReturn(false));
    dispatch(setSupplementalRate(0));
    dispatch(setSupplementalFuelSurchargeRate(0));
    dispatch(setSupplementalRateReturn(false));
    dispatch(setSupplementalRateDescription(""));
    dispatch(setLengthRate(0));
    dispatch(setLengthRateReturn(false));
    dispatch(setAdditionalRate(0));
    dispatch(setAdditionalFuelSurchargeRate(0));
    dispatch(setInvoiceAdditionalFlatRate(0));
    dispatch(setAdditionalRateReturn(false));
    dispatch(setAdditionalRateDescription(""));
    dispatch(setSpecialRate(0));
    dispatch(setSpecialFuelSurchargeRate(0));
    dispatch(setSpecialRateReturn(false));
    dispatch(setSpecialRateDescription(""));
    dispatch(setDriverRate(0));
    dispatch(setDriverFuelSurchargeRate(0));
    dispatch(setDriverRateReturn(false));
    dispatch(setDriverRateDescription(""));
    dispatch(setInvoiceCanadianCharge(0));
    dispatch(setInvoiceUsCharge(0));
    dispatch(setInvoicePortEscortFee(0));
    dispatch(setInvoiceELDFee(0));
    dispatch(setEldFeeDescription(""));
  };

  useEffect(() => {
    if (unitId != null) mapInvoiceRatesToRedux();
  }, [
    preInvoiced,
    invoiceMiles,
    invoicePercentage,
    overInvoicePercentage,
    invoiceFlatrate,
    flatRateReturn,
    invoiceMinimumRate,
    fodInvoice,
    fodInvoiceAmount,
    prepaidAmount,
    billTolls,
    maximumTolls,
    billPermits,
    maximumPermits,
    billWash,
    maximumWash,
    returnRate,
    fuelSurchargeRate,
    cdlRate,
    cdlReturn,
    invoiceApportionedRate,
    invoiceApportionedReturn,
    supplementalRate,
    supplementalFuelSurchargeRate,
    supplementalRateReturn,
    supplementalRateDescription,
    lengthRate,
    lengthRateReturn,
    additionalRate,
    additionalFuelSurchargeRate,
    additionalRateReturn,
    additionalRateDescription,
    specialRate,
    specialFuelSurchargeRate,
    specialRateReturn,
    specialRateDescription,
    driverRate,
    driverFuelSurchargeRate,
    driverRateReturn,
    driverRateDescription,
    invoiceCanadianCharge,
    invoiceUsCharge,
    invoicePortEscortFee,
    invoiceELDFee,
    eldFeeDescription,
    selectedUnitData,
    unitId,
    baseRate,
    billingCustomerPlantId,
    motorized,
    customerId,
    isUnitReload,
    invoiceAdditionalFlatRate,
  ]);

  useEffect(() => {
    if (selectedUnitData != null) {
      updateInvoiceValues(selectedUnitData?.editMasterExpressInvoiceRatesData);
    }
  }, [selectedUnitData, viewDetail]);
  useEffect(() => {
    if (amountCalculationData) {
      updateInvoiceValues({
        ...selectedUnitData?.editMasterExpressInvoiceRatesData,
        ...amountCalculationData,
        fodinvoice: amountCalculationData?.fodInvoice,
        fodinvoiceAmount: amountCalculationData?.fodInvoice
          ? amountCalculationData?.invoiceFlatrate || amountCalculationData?.invoiceMileageAmount
          : 0,
        invoiceCdlRate: amountCalculationData?.invoiceCDLARate,
        invoiceCDLAReturn: amountCalculationData?.invoiceCDLAReturn,
        invoiceCustomerRateId: amountCalculationData?.invoiceCustomerRateFK,
        invoiceFlatRate: amountCalculationData?.invoiceFlatrate,
      });
    }
  }, [amountCalculationData]);

  return (
    <div className="p-1 ps-2 p-t-19">
      <Row>
        <Col xs={4}>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>PreInvoiced</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={preInvoiced}
                disabled
                onChange={(e) => {
                  dispatch(setPreInvoiced(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Miles
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl ${viewDetail ? "" : Number(invoiceMiles) > 0 ? "borderGreen" : "borderRed"}`}
                type="text"
                value={invoiceMiles}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onInput={(e) => {
                  if (!validateInteger(e.target.value)) return;
                  dispatch(setInvoiceMiles(e.target.value));
                  setTimeout(() => {
                    dispatch(setTriggeringAmountCalculation());
                    dispatch(setFlagChanged("invoiceRateChanged"));
                  }, 0);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Invoice Percentage
              </Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <Input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                allowNegative={false}
                disabled={viewDetail}
                value={invoicePercentage}
                onInput={(e) => {
                  validateShortDecimal(e.target.value) && dispatch(setInvoicePercentage(e.target.value));
                }}
                onBlur={(e) => dispatch(setInvoicePercentage(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Over Invoice Percentage
              </Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <Input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                allowNegative={false}
                value={overInvoicePercentage}
                disabled={viewDetail}
                onChange={(e) => {
                  validateShortDecimal(e.target.value) && dispatch(setOverInvoicePercentage(e.target.value));
                }}
                onBlur={(e) => dispatch(setOverInvoicePercentage(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Flat Rate
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className={`customFormControl ${viewDetail ? "" : Number(invoiceFlatrate) > 0 || Number(baseRate) > 0 ? "borderGreen" : "borderRed"}`}
                type="text"
                value={invoiceFlatrate}
                autoComplete="off"
                allowNegative={false}
                disabled={viewDetail}
                onInput={(e) => {
                  if (!validateDecimal(e.target.value)) return;

                  if (Number(e.target.value) > 0) {
                    clearMileageRateFields();
                  }

                  dispatch(setInvoiceFlatrate(e.target.value));
                  fodInvoice && dispatch(setFodInvoiceAmount(e.target.value));
                  fodInvoice && dispatch(setInvoiceAmountForOpenBalances(Number(e.target.value)));
                }}
                onBlur={(e) => dispatch(setInvoiceFlatrate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Flat Rate Return
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={flatRateReturn}
                disabled={viewDetail || !flatRateReturn}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setFlatRateReturn(e.target.value));
                }}
                onBlur={(e) => dispatch(setFlatRateReturn(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Minimum Charge</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={invoiceMinimumRate}
                disabled
                onChange={(e) => {
                  dispatch(setInvoiceMinimumRate(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>FOD Invoice</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={fodInvoice}
                disabled={viewDetail || invoiceEmail !== "F"}
                onChange={(e) => {
                  dispatch(setFodInvoice(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                FOD Invoice Amount
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={fodInvoiceAmount}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setFodInvoiceAmount(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Prepaid Amount
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={prepaidAmount}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setPrepaidAmount(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Bill Tolls</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={billTolls}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setBillTolls(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Maximum Tolls
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={maximumTolls}
                disabled={viewDetail || !billTolls}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setMaximumTolls(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Bill Permits</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={billPermits}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setBillPermits(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Maximum Permits
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={maximumPermits}
                disabled={viewDetail || !billPermits}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setMaximumPermits(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Bill Wash</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={billWash}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setBillWash(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Maximum Wash
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={maximumWash}
                disabled={viewDetail || !billWash}
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setMaximumWash(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Base Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${viewDetail || invoiceFlatrate ? "" : Number(baseRate) > 0 ? "borderGreen" : "borderRed"}`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={baseRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setBaseRate(e.target.value));
                  dispatch(setInvoiceFlatrate(0));
                }}
                onBlur={(e) => dispatch(setBaseRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Return Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={returnRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setReturnRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setReturnRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Fuel Surcharge Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={fuelSurchargeRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setFuelSurchargeRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setFuelSurchargeRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                CDL Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={cdlRate}
                disabled={viewDetail || invoiceFlatrate || !isTowableSingle}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setCdlRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setCdlRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>CDL Return</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={cdlReturn}
                disabled={viewDetail || invoiceFlatrate || !isTowableSingle}
                onChange={(e) => {
                  dispatch(setCdlReturn(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Apportioned Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={invoiceApportionedRate}
                disabled={viewDetail || invoiceFlatrate || !isTowableSingle}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setInvoiceApportionedRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setInvoiceApportionedRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Apportioned Return</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={invoiceApportionedReturn}
                disabled={viewDetail || invoiceFlatrate || !isTowableSingle}
                onChange={(e) => {
                  dispatch(setInvoiceApportionedReturn(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Supplemental Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={supplementalRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setSupplementalRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setSupplementalRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Supplemental Fuel Surcharge Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={supplementalFuelSurchargeRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) &&
                    dispatch(setSupplementalFuelSurchargeRate(e.target.value));
                }}
                onBlur={(e) =>
                  dispatch(setSupplementalFuelSurchargeRate(correctDecimalInputOnBlur(e.target.value)))
                }
              />
            </div>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Supplemental Rate Return</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={supplementalRateReturn}
                disabled={viewDetail || invoiceFlatrate}
                onChange={(e) => {
                  dispatch(setSupplementalRateReturn(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Supplemental Rate Description
              </Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={supplementalRateDescription}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  dispatch(setSupplementalRateDescription(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Length Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={lengthRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setLengthRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setLengthRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Length Rate Return</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={lengthRateReturn}
                disabled={viewDetail || invoiceFlatrate}
                onChange={(e) => {
                  dispatch(setLengthRateReturn(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Additional Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={additionalRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setAdditionalRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setAdditionalRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Additional Fuel Surcharge Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={additionalFuelSurchargeRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) &&
                    dispatch(setAdditionalFuelSurchargeRate(e.target.value));
                }}
                onBlur={(e) =>
                  dispatch(setAdditionalFuelSurchargeRate(correctDecimalInputOnBlur(e.target.value)))
                }
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Additional Flatrate
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={invoiceAdditionalFlatRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setInvoiceAdditionalFlatRate(e.target.value));
                }}
                onBlur={(e) =>
                  dispatch(setInvoiceAdditionalFlatRate(correctDecimalInputOnBlur(e.target.value)))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Additional Rate Return</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={additionalRateReturn}
                disabled={viewDetail || invoiceFlatrate}
                onChange={(e) => {
                  dispatch(setAdditionalRateReturn(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Additional Rate Description
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={additionalRateDescription}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  dispatch(setAdditionalRateDescription(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Special Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={specialRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setSpecialRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setSpecialRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Special Fuel Surcharge Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={specialFuelSurchargeRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) &&
                    dispatch(setSpecialFuelSurchargeRate(e.target.value));
                }}
                onBlur={(e) =>
                  dispatch(setSpecialFuelSurchargeRate(correctDecimalInputOnBlur(e.target.value)))
                }
              />
            </div>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Special Rate Return</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={specialRateReturn}
                disabled={viewDetail || invoiceFlatrate}
                onChange={(e) => {
                  dispatch(setSpecialRateReturn(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Special Rate Description
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={specialRateDescription}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  dispatch(setSpecialRateDescription(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Driver Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) && dispatch(setDriverRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setDriverRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Driver Fuel Surcharge Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverFuelSurchargeRate}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateLongDecimal(e.target.value) &&
                    dispatch(setDriverFuelSurchargeRate(Number(e.target.value)));
                }}
                onBlur={(e) =>
                  dispatch(setDriverFuelSurchargeRate(correctDecimalInputOnBlur(e.target.value)))
                }
              />
            </div>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Driver Rate Return</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={driverRateReturn}
                disabled={viewDetail || invoiceFlatrate}
                onChange={(e) => {
                  dispatch(setDriverRateReturn(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Driver Rate Description
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverRateDescription}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  dispatch(setDriverRateDescription(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Canadian Charge
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={candianDelivery ? invoiceCanadianCharge : 0}
                disabled={viewDetail || invoiceFlatrate || !candianDelivery}
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setInvoiceCanadianCharge(e.target.value));
                }}
                onBlur={(e) => dispatch(setInvoiceCanadianCharge(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                US Charge
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={!candianDelivery ? invoiceUsCharge : 0}
                disabled={viewDetail || invoiceFlatrate || candianDelivery}
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setInvoiceUsCharge(e.target.value));
                }}
                onBlur={(e) => dispatch(setInvoiceUsCharge(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Port Escort Fee
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={invoicePortEscortFee}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setInvoicePortEscortFee(e.target.value));
                }}
                onBlur={(e) => dispatch(setInvoicePortEscortFee(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                ELD Fee
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={invoiceELDFee}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  validateDecimal(e.target.value) && dispatch(setInvoiceELDFee(e.target.value));
                }}
                onBlur={(e) => dispatch(setInvoiceELDFee(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                ELD Fee Description
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={eldFeeDescription}
                disabled={viewDetail || invoiceFlatrate}
                onInput={(e) => {
                  dispatch(setEldFeeDescription(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Invoice;
