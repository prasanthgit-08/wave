import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setBaseRate,
  setDriverAdditionalDescription,
  setDriverAdditionalFlatRate,
  setDriverAdditionalFuelSurchargeRate,
  setDriverAdditionalPulloutFee,
  setDriverAdditionalRate,
  setDriverAdditionalReturn,
  setDriverApportionedRate,
  setDriverApportionedReturn,
  setDriverBonusRate,
  setDriverCanadianCharge,
  setDriverCDLARate,
  setDriverCDLAReturn,
  setDriverDeliveryPulloutFee,
  setDriverELDFee,
  setDriverFlatRate,
  setDriverFlatRateBalance,
  setDriverFuelSurchargeRate,
  setDriverLengthRate,
  setDriverLengthReturn,
  setDriverMiles,
  setDriverMilesBalance,
  setDriverPickupPulloutFee,
  setDriverReturnFlatRate,
  setDriverReturnFlatRateBalance,
  setDriverSpecialDescription,
  setDriverSpecialFuelSurchargeRate,
  setDriverSpecialRate,
  setDriverSpecialReturn,
  setDriverSupplementalDescription,
  setDriverSupplementalFuelSurchargeRate,
  setDriverSupplementalRate,
  setDriverSupplementalReturn,
  setDriverTabData,
  setDriverUSCharge,
  setFodPermits,
  setFodTolls,
  setHalfTonAdjustmentRate,
  setNoDeliveryPulloutFee,
  setNoPickupPulloutFee,
  setPayPermits,
  setPayTolls,
  setPayWash,
  setReturnRates,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressDriverTabSlice";
import {
  setEldFeeDescription,
  setTriggeringAmountCalculation,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressInvoiceTabSlice";
import {
  updateDriverPayTabData,
  updateField,
  updateMultipleFields,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressDispatchDriverPayTabSlice";
import { correctDecimalInputOnBlur } from "../../../../../../utils/utils";
import { setFlagChanged } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

function Driver({ styles }) {
  const dispatch = useDispatch();
  const [unitId, setUnitId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [customerRateFK, setCustomerRateFK] = useState(null);
  const [reload, setReload] = useState(false);
  const [flatRated, setFlatRated] = useState(false);
  const [driverId, setDriverId] = useState(null);
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

  const driverAmountCalculationData = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverAmountCalculationData
  );
  const driverMiles = useSelector((state) => state.editMasterExpressDriverTabReducer.driverMiles);
  const driverMilesBalance = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverMilesBalance
  );
  const driverFlatRate = useSelector((state) => state.editMasterExpressDriverTabReducer.driverFlatRate);
  const driverFlatRateBalance = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverFlatRateBalance
  );
  const driverReturnFlatRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverReturnFlatRate
  );
  const driverReturnFlatRateBalance = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverReturnFlatRateBalance
  );
  const driverMinimumRate = useSelector((state) => state.editMasterExpressDriverTabReducer.driverMinimumRate);
  const payTolls = useSelector((state) => state.editMasterExpressDriverTabReducer.payTolls);
  const fodTolls = useSelector((state) => state.editMasterExpressDriverTabReducer.fodTolls);
  const payPermits = useSelector((state) => state.editMasterExpressDriverTabReducer.payPermits);
  const fodPermits = useSelector((state) => state.editMasterExpressDriverTabReducer.fodPermits);
  const payWash = useSelector((state) => state.editMasterExpressDriverTabReducer.payWash);
  const baseRate = useSelector((state) => state.editMasterExpressDriverTabReducer.baseRate);
  const returnRates = useSelector((state) => state.editMasterExpressDriverTabReducer.returnRates);
  const driverFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverFuelSurchargeRate
  );
  const driverCDLARate = useSelector((state) => state.editMasterExpressDriverTabReducer.driverCDLARate);
  const driverCDLAReturn = useSelector((state) => state.editMasterExpressDriverTabReducer.driverCDLAReturn);
  const driverApportionedRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverApportionedRate
  );
  const driverApportionedReturn = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverApportionedReturn
  );
  const driverSupplementalRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverSupplementalRate
  );
  const driverSupplementalFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverSupplementalFuelSurchargeRate
  );
  const driverSupplementalReturn = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverSupplementalReturn
  );
  const driverSupplementalDescription = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverSupplementalDescription
  );
  const driverLengthRate = useSelector((state) => state.editMasterExpressDriverTabReducer.driverLengthRate);
  const driverLengthReturn = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverLengthReturn
  );
  const driverAdditionalRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverAdditionalRate
  );
  const driverAdditionalFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverAdditionalFuelSurchargeRate
  );
  const driverAdditionalFlatRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverAdditionalFlatRate
  );
  const driverAdditionalReturn = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverAdditionalReturn
  );
  const driverAdditionalDescription = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverAdditionalDescription
  );
  const driverSpecialRate = useSelector((state) => state.editMasterExpressDriverTabReducer.driverSpecialRate);
  const driverSpecialFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverSpecialFuelSurchargeRate
  );
  const driverSpecialReturn = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverSpecialReturn
  );
  const driverSpecialDescription = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverSpecialDescription
  );
  const halfTonAdjustmentRate = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.halfTonAdjustmentRate
  );
  const driverBonusRate = useSelector((state) => state.editMasterExpressDriverTabReducer.driverBonusRate);
  const driverPickupPulloutFee = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverPickupPulloutFee
  );
  const driverAdditionalPulloutFee = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverAdditionalPulloutFee
  );
  const noPickupPulloutFee = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.noPickupPulloutFee
  );
  const driverDeliveryPulloutFee = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverDeliveryPulloutFee
  );
  const noDeliveryPulloutFee = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.noDeliveryPulloutFee
  );
  const driverUSCharge = useSelector((state) => state.editMasterExpressDriverTabReducer.driverUSCharge);
  const driverELDFee = useSelector((state) => state.editMasterExpressDriverTabReducer.driverELDFee);
  const eldFeeDescription = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.eldFeeDescription
  );
  const driverCanadianCharge = useSelector(
    (state) => state.editMasterExpressDriverTabReducer.driverCanadianCharge
  );

  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const candianDelivery = useSelector((state) => state.editMasterExpressInvoiceTabReducer.candianDelivery);

  const isTowableSingle = useSelector((state) => state.editMasterExpressInvoiceTabReducer.isTowableSingle);

  const { driverPayTabData, driverFK } = useSelector(
    (state) => state.editMasterExpressDispatchDriverPayTabSlice
  );

  const handleNull = (value) => {
    return value === null || String(value)?.trim() === "" ? 0 : value;
  };

  const updateDriverTabValues = (data) => {
    // Redux state dispatch
    dispatch(setDriverMiles(data?.driverMiles || 0));
    dispatch(setDriverMilesBalance(data?.driverMilesBalance || 0));
    dispatch(setDriverFlatRate(data?.driverFlatRate || 0));
    dispatch(setDriverFlatRateBalance(data?.driverFlatRateBalance || 0));
    dispatch(setDriverReturnFlatRate(data?.driverReturnFlatRate || 0));
    dispatch(setDriverReturnFlatRateBalance(data?.driverReturnFlatRateBalance || 0));
    dispatch(setBaseRate(data?.driverRate || 0));
    dispatch(setReturnRates(data?.driverReturnRate || 0));
    dispatch(setDriverFuelSurchargeRate(data?.driverFuelSurchargeRate || 0));
    dispatch(setDriverCDLARate(data?.driverCDLARate || 0));
    dispatch(setDriverCDLAReturn(data?.driverCDLAReturn || false));
    dispatch(setDriverApportionedRate(data?.driverApportionedRate || 0));
    dispatch(setDriverApportionedReturn(data?.driverApportionedReturn || 0));
    dispatch(setDriverSupplementalRate(data?.driverSupplementalRate || 0));
    dispatch(setDriverSupplementalFuelSurchargeRate(data?.driverSupplementalFuelSurchargeRate || 0));
    dispatch(setDriverSupplementalReturn(data?.driverSupplementalReturn || false));
    dispatch(setDriverSupplementalDescription(data?.driverSupplementalDescription || ""));
    dispatch(setDriverLengthRate(data?.driverLengthRate || 0));
    dispatch(setDriverLengthReturn(data?.driverLengthReturn || false));
    dispatch(setDriverAdditionalRate(data?.driverAdditionalRate || 0));
    dispatch(setDriverAdditionalFuelSurchargeRate(data?.driverAdditionalFuelSurchargeRate || 0));
    dispatch(setDriverAdditionalFlatRate(data?.driverAdditionalFlatRate || 0));
    dispatch(setDriverAdditionalReturn(data?.driverAdditionalReturn || false));
    dispatch(setDriverSpecialRate(data?.driverSpecialRate || 0));
    dispatch(setDriverSpecialFuelSurchargeRate(data?.driverSpecialFuelSurchargeRate || 0));
    dispatch(setDriverSpecialReturn(data?.driverSpecialReturn || false));
    dispatch(setDriverSpecialDescription(data?.driverSpecialDescription || ""));
    dispatch(setHalfTonAdjustmentRate(data?.halfTonAdjustmentRate || 0));
    dispatch(setDriverBonusRate(data?.driverBonusRate || 0));
    dispatch(setDriverPickupPulloutFee(data?.driverPickupPulloutFee || 0));
    dispatch(setDriverAdditionalPulloutFee(data?.driverAdditionalPulloutFee || 0));
    dispatch(setNoPickupPulloutFee(data?.noPickupPulloutFee || false));
    dispatch(setDriverDeliveryPulloutFee(data?.driverDeliveryPulloutFee || 0));
    dispatch(setNoDeliveryPulloutFee(data?.noDeliveryPulloutFee || false));
    dispatch(setDriverUSCharge(data?.driverUSCharge || 0));
    dispatch(setDriverELDFee(data?.driverELDFee || 0));
    dispatch(setDriverCanadianCharge(data?.driverCanadianCharge || 0));
    dispatch(setPayTolls(data?.payTolls || false));
    dispatch(setFodTolls(data?.fodTolls || false));
    dispatch(setPayPermits(data?.payPermits || false));
    dispatch(setFodPermits(data?.fodPermits || false));
    dispatch(setPayWash(data?.payWash || false));
    dispatch(setDriverAdditionalDescription(data?.driverAdditionalDescription || ""));

    // Local state updates
    setUnitId(data?.unitPK);
    setDeliveryDealerId(data?.deliveryDealerId || null);
    setCustomerPlantId(data?.customerPlantId || null);
    setMotorized(data?.motorized || false);
    setCustomerId(data?.customerId || null);
    setUnitTypeId(data?.unitTypeId || null);
    setPickupAtPlant(data?.pickupAtPlant || false);
    setMileageRate(data?.RatePerMile || 0);
  };

  const mapDriverTabDataToRedux = () => {
    dispatch(
      setDriverTabData({
        driverMiles: handleNull(driverMiles),
        driverMilesBalance: handleNull(driverMilesBalance),
        driverFlatRate: handleNull(driverFlatRate),
        driverFlatrate: handleNull(driverFlatRate),
        driverFlatRateBalance: handleNull(driverFlatRateBalance),
        driverReturnFlatRate: handleNull(driverReturnFlatRate),
        driverReturnFlatRateBalance: handleNull(driverReturnFlatRateBalance),
        driverMinimumRate: handleNull(driverMinimumRate),
        payTolls: handleNull(payTolls),
        FODTolls: handleNull(fodTolls),
        payPermits: handleNull(payPermits),
        FODPermits: handleNull(fodPermits),
        payWash: handleNull(payWash),
        driverRate: handleNull(baseRate),
        driverReturnRate: handleNull(returnRates),
        driverFuelSurchargeRate: handleNull(driverFuelSurchargeRate),
        driverCDLARate: handleNull(driverCDLARate),
        driverCDLAReturn: handleNull(driverCDLAReturn),
        driverApportionedRate: handleNull(driverApportionedRate),
        driverApportionedReturn: handleNull(driverApportionedReturn),
        driverSupplementalRate: handleNull(driverSupplementalRate),
        driverSupplementalFuelSurchargeRate: handleNull(driverSupplementalFuelSurchargeRate),
        driverSupplementalReturn: handleNull(driverSupplementalReturn),
        driverSupplementalDescription: driverSupplementalDescription,
        driverLengthRate: handleNull(driverLengthRate),
        driverLengthReturn: handleNull(driverLengthReturn),
        driverAdditionalRate: handleNull(driverAdditionalRate),
        driverAdditionalFuelSurchargeRate: handleNull(driverAdditionalFuelSurchargeRate),
        driverAdditionalFlatRate: handleNull(driverAdditionalFlatRate),
        driverAdditionalReturn: handleNull(driverAdditionalReturn),
        driverAdditionalDescription: driverAdditionalDescription,
        driverAdditionalFlatRateDescription: driverAdditionalDescription,
        driverSpecialRate: handleNull(driverSpecialRate),
        driverSpecialFuelSurchargeRate: handleNull(driverSpecialFuelSurchargeRate),
        driverSpecialReturn: handleNull(driverSpecialReturn),
        driverSpecialDescription: driverSpecialDescription,
        halfTonAdjustmentRate: handleNull(halfTonAdjustmentRate),
        driverBonusRate: handleNull(driverBonusRate),
        driverPickupPulloutFee: handleNull(driverPickupPulloutFee),
        driverAdditionalPulloutFee: handleNull(driverAdditionalPulloutFee),
        noPickupPulloutFee: handleNull(noPickupPulloutFee),
        driverDeliveryPulloutFee: handleNull(driverDeliveryPulloutFee),
        noDeliveryPulloutFee: handleNull(noDeliveryPulloutFee),
        driverUSCharge: handleNull(driverUSCharge),
        driverELDFee: handleNull(driverELDFee),
        eldFeeDescription: eldFeeDescription,
        driverCanadianCharge: handleNull(driverCanadianCharge),
        unitPK: unitId,
        driverFK: driverId,
        deliveryDealerId: deliveryDealerId,
        billingCustomerPlantId: billingCustomerPlantId,
        motorized: handleNull(motorized),
        customerPlantId: customerPlantId,
        unitTypeId: unitTypeId,
        pickupAtPlant: handleNull(pickupAtPlant),
        driverCustomerRateFK: selectedUnitData?.editMasterExpressDriverTabDTO?.driverCustomerRateFK,
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
    dispatch(setReturnRates(0));
    dispatch(setDriverFuelSurchargeRate(0));
    dispatch(setDriverCDLARate(0));
    dispatch(setDriverCDLAReturn(false));
    dispatch(setDriverApportionedRate(0));
    dispatch(setDriverApportionedReturn(false));
    dispatch(setDriverSupplementalRate(0));
    dispatch(setDriverSupplementalFuelSurchargeRate(0));
    dispatch(setDriverSupplementalReturn(false));
    dispatch(setDriverSupplementalDescription(""));
    dispatch(setDriverLengthRate(0));
    dispatch(setDriverLengthReturn(false));
    dispatch(setDriverAdditionalRate(0));
    dispatch(setDriverAdditionalFuelSurchargeRate(0));
    dispatch(setDriverAdditionalFlatRate(0));
    dispatch(setDriverAdditionalReturn(false));
    dispatch(setDriverAdditionalDescription(""));
    dispatch(setDriverSpecialRate(0));
    dispatch(setDriverSpecialFuelSurchargeRate(0));
    dispatch(setDriverSpecialReturn(false));
    dispatch(setDriverSpecialDescription(""));
    dispatch(setDriverCanadianCharge(0));
    dispatch(setDriverUSCharge(0));
    dispatch(setDriverELDFee(0));
    dispatch(setEldFeeDescription(""));
  };

  useEffect(() => {
    if (unitId != null) mapDriverTabDataToRedux();
  }, [
    driverMiles,
    driverMilesBalance,
    driverFlatRate,
    driverFlatRateBalance,
    driverReturnFlatRate,
    driverReturnFlatRateBalance,
    driverMinimumRate,
    payTolls,
    fodTolls,
    payPermits,
    fodPermits,
    payWash,
    baseRate,
    returnRates,
    driverFuelSurchargeRate,
    driverCDLARate,
    driverCDLAReturn,
    driverApportionedReturn,
    driverApportionedRate,
    driverSupplementalRate,
    driverSupplementalFuelSurchargeRate,
    driverSupplementalReturn,
    driverSupplementalDescription,
    driverLengthRate,
    driverLengthReturn,
    driverAdditionalRate,
    driverAdditionalFuelSurchargeRate,
    driverAdditionalFlatRate,
    driverAdditionalReturn,
    driverAdditionalDescription,
    driverSpecialRate,
    driverSpecialFuelSurchargeRate,
    driverSpecialReturn,
    driverSpecialDescription,
    halfTonAdjustmentRate,
    driverBonusRate,
    driverPickupPulloutFee,
    driverAdditionalPulloutFee,
    noPickupPulloutFee,
    driverDeliveryPulloutFee,
    noDeliveryPulloutFee,
    driverUSCharge,
    driverELDFee,
    eldFeeDescription,
    driverCanadianCharge,
    unitId,
  ]);

  useEffect(() => {
    if (!driverFK) {
      const data = {
        miles: handleNull(driverMiles),
        baseRate: handleNull(baseRate),
        fuelSurchargeRate: handleNull(driverFuelSurchargeRate),
        cDLA: handleNull(driverCDLARate),
        apportionedRate: handleNull(driverApportionedRate),
        apportionedReturn: handleNull(driverApportionedReturn),
        supplementalRate: handleNull(driverSupplementalRate),
        supplementalFuelSurchargeRate: handleNull(driverSupplementalFuelSurchargeRate),
        supplementalDescription: driverSupplementalDescription,
        lengthRate: handleNull(driverLengthRate),
        additionalRate: handleNull(driverAdditionalRate),
        additionalFuelSurchargeRate: handleNull(driverAdditionalFuelSurchargeRate),
        additionalFlatRate: handleNull(driverAdditionalFlatRate),
        additionalFlatRateDescription: handleNull(driverAdditionalFlatRate),
        additionalDescription: driverAdditionalDescription,
        specialRate: handleNull(driverSpecialRate),
        specialFuelSurchargeRate: handleNull(driverSpecialFuelSurchargeRate),
        specialDescription: driverSpecialDescription,
        driverRate: 0,
        driverFuelSurchargeRate: 0,
        driverDescription: "",
        halfTonAdjustmentRate: 0,
        longUnitRateDescription: "",
        longUnitRate: 0,
        safety: 0,
        bonusRate: handleNull(driverBonusRate),
        pickupPulloutFee: handleNull(driverPickupPulloutFee),
        additionalPulloutFee: handleNull(driverAdditionalPulloutFee),
        noPickupPulloutFee: handleNull(noPickupPulloutFee),
        deliveryPulloutFee: handleNull(driverDeliveryPulloutFee),
        noDeliveryPulloutFee: handleNull(noDeliveryPulloutFee),
        uSCharge: handleNull(driverUSCharge),
        canadianCharge: handleNull(driverCanadianCharge),
        driverQual: 0, //Update these.
      };
      const updatedData = { ...driverPayTabData, ...data };
      dispatch(updateMultipleFields(updatedData));
      dispatch(updateField({ driverPayTabData: updatedData }));
      dispatch(updateDriverPayTabData(data));
    }
  }, [
    driverFK,
    driverMiles,
    driverMilesBalance,
    driverFlatRate,
    driverFlatRateBalance,
    driverReturnFlatRate,
    driverReturnFlatRateBalance,
    driverMinimumRate,
    payTolls,
    fodTolls,
    payPermits,
    fodPermits,
    payWash,
    baseRate,
    returnRates,
    driverFuelSurchargeRate,
    driverCDLARate,
    driverCDLAReturn,
    driverApportionedRate,
    driverApportionedReturn,
    driverSupplementalRate,
    driverSupplementalFuelSurchargeRate,
    driverSupplementalReturn,
    driverSupplementalDescription,
    driverLengthRate,
    driverLengthReturn,
    driverAdditionalRate,
    driverAdditionalFuelSurchargeRate,
    driverAdditionalFlatRate,
    driverAdditionalReturn,
    driverAdditionalDescription,
    driverSpecialRate,
    driverSpecialFuelSurchargeRate,
    driverSpecialReturn,
    driverSpecialDescription,
    halfTonAdjustmentRate,
    driverBonusRate,
    driverPickupPulloutFee,
    driverAdditionalPulloutFee,
    noPickupPulloutFee,
    driverDeliveryPulloutFee,
    noDeliveryPulloutFee,
    driverUSCharge,
    driverELDFee,
    eldFeeDescription,
    driverCanadianCharge,
  ]);

  useEffect(() => {
    if (selectedUnitData != null) {
      updateDriverTabValues(selectedUnitData?.editMasterExpressDriverTabDTO);
    }
  }, [selectedUnitData, , viewDetail]);

  useEffect(() => {
    if (driverAmountCalculationData) {
      updateDriverTabValues({
        ...selectedUnitData?.editMasterExpressDriverTabDTO,
        ...driverAmountCalculationData,
        driverFlatRate: driverAmountCalculationData?.driverFlatrate,
        driverMilesBalance: driverAmountCalculationData?.driverMiles,
      });
    }
  }, [driverAmountCalculationData]);

  return (
    <div className="p-1 ps-2 p-t-19">
      <Row>
        <Col xs={4}>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Miles
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl ${viewDetail ? "" : Number(driverMiles) > 0 ? "borderGreen" : "borderRed"}`}
                type="text"
                autoComplete="off"
                value={driverMiles}
                disabled={viewDetail}
                aria-autocomplete="list"
                onChange={(e) => {
                  if (!validateInteger(e.target.value)) return;

                  dispatch(setDriverMiles(e.target.value));
                  setTimeout(() => {
                    dispatch(setTriggeringAmountCalculation());
                    dispatch(setFlagChanged("driverRateChanged"));
                  }, 0);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Miles Balance
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                value={driverMilesBalance}
                disabled={viewDetail}
                aria-autocomplete="list"
                onChange={(e) =>
                  validateInteger(e.target.value) && dispatch(setDriverMilesBalance(e.target.value))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={2} className="p-0">
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
                Flat Rate
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl ${viewDetail ? "" : Number(driverFlatRate) > 0 || Number(baseRate) > 0 ? "borderGreen" : "borderRed"}`}
                type="text"
                value={driverFlatRate}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  if (!validateDecimal(e.target.value)) return;

                  if (Number(e.target.value) > 0) {
                    clearMileageRateFields();
                  }

                  dispatch(setDriverFlatRate(e.target.value));
                }}
                onBlur={(e) => dispatch(setDriverFlatRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Flat Rate Balance
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                value={driverFlatRateBalance}
                disabled={viewDetail || !driverFlatRate}
                aria-autocomplete="list"
                onChange={(e) =>
                  validateDecimal(e.target.value) && dispatch(setDriverFlatRateBalance(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverFlatRateBalance(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Flat Rate Return
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                value={driverReturnFlatRate}
                disabled={viewDetail || !(driverReturnFlatRate || driverFlatRate)}
                aria-autocomplete="list"
                onChange={(e) =>
                  validateDecimal(e.target.value) && dispatch(setDriverReturnFlatRate(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverReturnFlatRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Flat Rate Return Balance
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                value={driverReturnFlatRateBalance}
                disabled={viewDetail || !(driverReturnFlatRate || driverFlatRate)}
                aria-autocomplete="list"
                onChange={(e) =>
                  validateDecimal(e.target.value) && dispatch(setDriverReturnFlatRateBalance(e.target.value))
                }
                onBlur={(e) =>
                  dispatch(setDriverReturnFlatRateBalance(correctDecimalInputOnBlur(e.target.value)))
                }
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  invisible align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Minimum Charge</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input type="checkbox" className="form-check-input p-0" disabled={driverFK} />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Pay Tolls</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={payTolls}
                disabled={viewDetail}
                onChange={(e) => dispatch(setPayTolls(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>FOD Tolls</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={fodTolls}
                disabled={viewDetail}
                onChange={(e) => dispatch(setFodTolls(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Pay Permits</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={payPermits}
                disabled={viewDetail}
                onChange={(e) => dispatch(setPayPermits(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>FOD Permits</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={fodPermits}
                disabled={viewDetail}
                onChange={(e) => dispatch(setFodPermits(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>Pay Wash</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={payWash}
                disabled={viewDetail}
                onChange={(e) => dispatch(setPayWash(e.target.checked))}
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

            <div className="p-0  w-60px">
              <input
                className={`customFormControl ${viewDetail || driverFlatRate ? "" : Number(baseRate) > 0 ? "borderGreen" : "borderRed"}`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={baseRate}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) => validateLongDecimal(e.target.value) && dispatch(setBaseRate(e.target.value))}
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

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={returnRates}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) && dispatch(setReturnRates(e.target.value))
                }
                onBlur={(e) => dispatch(setReturnRates(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Fuel Surcharge Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverFuelSurchargeRate}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) && dispatch(setDriverFuelSurchargeRate(e.target.value))
                }
                onBlur={(e) =>
                  dispatch(setDriverFuelSurchargeRate(correctDecimalInputOnBlur(e.target.value)))
                }
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                CDL Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverCDLARate}
                disabled={viewDetail || driverFlatRate || !isTowableSingle}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) && dispatch(setDriverCDLARate(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverCDLARate(correctDecimalInputOnBlur(e.target.value)))}
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
                checked={driverCDLAReturn}
                disabled={viewDetail || driverFlatRate || !isTowableSingle}
                onChange={(e) => dispatch(setDriverCDLAReturn(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Apportioned Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverApportionedRate}
                disabled={viewDetail || driverFlatRate || !isTowableSingle}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) && dispatch(setDriverApportionedRate(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverApportionedRate(correctDecimalInputOnBlur(e.target.value)))}
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
                checked={driverApportionedReturn}
                disabled={viewDetail || driverFlatRate || !isTowableSingle}
                onChange={(e) => dispatch(setDriverApportionedReturn(e.target.checked))}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Supplemental Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverSupplementalRate}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) && dispatch(setDriverSupplementalRate(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverSupplementalRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Supplemental Fuel Surcharge Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverSupplementalFuelSurchargeRate}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) &&
                  dispatch(setDriverSupplementalFuelSurchargeRate(e.target.value))
                }
                onBlur={(e) =>
                  dispatch(setDriverSupplementalFuelSurchargeRate(correctDecimalInputOnBlur(e.target.value)))
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
                checked={driverSupplementalReturn}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) => dispatch(setDriverSupplementalReturn(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Supplemental Rate Description
              </Form.Label>
            </Col>

            <Col xs={7} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverSupplementalDescription}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) => dispatch(setDriverSupplementalDescription(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Length Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverLengthRate}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) && dispatch(setDriverLengthRate(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverLengthRate(correctDecimalInputOnBlur(e.target.value)))}
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
                checked={driverLengthReturn}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) => dispatch(setDriverLengthReturn(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Additional Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverAdditionalRate}
                disabled={viewDetail || driverFlatRate || Number(driverAdditionalFlatRate)}
                onChange={(e) => {
                  if (validateLongDecimal(e.target.value)) {
                    dispatch(setDriverAdditionalRate(e.target.value));
                    dispatch(setDriverAdditionalFlatRate("0"));
                  }
                }}
                onBlur={(e) => dispatch(setDriverAdditionalRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Additional Fuel Surcharge Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverAdditionalFuelSurchargeRate}
                disabled={viewDetail || driverFlatRate || Number(driverAdditionalFlatRate)}
                onChange={(e) => {
                  if (validateLongDecimal(e.target.value)) {
                    dispatch(setDriverAdditionalFuelSurchargeRate(e.target.value));
                    dispatch(setDriverAdditionalFlatRate("0"));
                  }
                }}
                onBlur={(e) =>
                  dispatch(setDriverAdditionalFuelSurchargeRate(correctDecimalInputOnBlur(e.target.value)))
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
                value={driverAdditionalFlatRate}
                disabled={
                  viewDetail ||
                  driverFlatRate ||
                  Number(driverAdditionalRate || driverAdditionalFuelSurchargeRate)
                }
                onChange={(e) => {
                  if (validateLongDecimal(e.target.value)) {
                    dispatch(setDriverAdditionalFuelSurchargeRate("0"));
                    dispatch(setDriverAdditionalRate("0"));
                    dispatch(setDriverAdditionalFlatRate(e.target.value));
                  }
                }}
                onBlur={(e) =>
                  dispatch(setDriverAdditionalFlatRate(correctDecimalInputOnBlur(e.target.value)))
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
                checked={driverAdditionalReturn}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) => dispatch(setDriverAdditionalReturn(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Additional Rate Description
              </Form.Label>
            </Col>

            <Col xs={7} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverAdditionalDescription}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) => dispatch(setDriverAdditionalDescription(e.target.value))}
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

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverSpecialRate}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) && dispatch(setDriverSpecialRate(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverSpecialRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Special Fuel Surcharge Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverSpecialFuelSurchargeRate}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) &&
                  dispatch(setDriverSpecialFuelSurchargeRate(e.target.value))
                }
                onBlur={(e) =>
                  dispatch(setDriverSpecialFuelSurchargeRate(correctDecimalInputOnBlur(e.target.value)))
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
                checked={driverSpecialReturn}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) => dispatch(setDriverSpecialReturn(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Special Rate Description
              </Form.Label>
            </Col>

            <Col xs={7} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverSpecialDescription}
                disabled={viewDetail || driverFlatRate}
                onChange={(e) => dispatch(setDriverSpecialDescription(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Half Ton Adjustment Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={halfTonAdjustmentRate}
                disabled={viewDetail || driverFlatRate || !isTowableSingle}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) && dispatch(setHalfTonAdjustmentRate(e.target.value))
                }
                onBlur={(e) => dispatch(setHalfTonAdjustmentRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Bonus Rate
              </Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverBonusRate}
                disabled={viewDetail}
                onChange={(e) =>
                  validateLongDecimal(e.target.value) && dispatch(setDriverBonusRate(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverBonusRate(correctDecimalInputOnBlur(e.target.value)))}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
            </Col>

            <div className="p-0  w-60px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Pickup Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverPickupPulloutFee}
                disabled={viewDetail || noPickupPulloutFee}
                onChange={(e) =>
                  validateDecimal(e.target.value) && dispatch(setDriverPickupPulloutFee(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverPickupPulloutFee(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Additional Pickup Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverAdditionalPulloutFee}
                disabled={viewDetail || noPickupPulloutFee}
                onChange={(e) =>
                  validateDecimal(e.target.value) && dispatch(setDriverAdditionalPulloutFee(e.target.value))
                }
                onBlur={(e) =>
                  dispatch(setDriverAdditionalPulloutFee(correctDecimalInputOnBlur(e.target.value)))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>No Pickup PullOut Fee</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={noPickupPulloutFee}
                disabled={viewDetail}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(setDriverAdditionalPulloutFee(0));
                    dispatch(setDriverPickupPulloutFee(0));
                  }
                  dispatch(setNoPickupPulloutFee(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Delivery Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverDeliveryPulloutFee}
                disabled={viewDetail || noDeliveryPulloutFee}
                onChange={(e) =>
                  validateDecimal(e.target.value) && dispatch(setDriverDeliveryPulloutFee(e.target.value))
                }
                onBlur={(e) =>
                  dispatch(setDriverDeliveryPulloutFee(correctDecimalInputOnBlur(e.target.value)))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`}>No Delivery PullOut Fee</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={noDeliveryPulloutFee}
                disabled={viewDetail}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(setDriverDeliveryPulloutFee(0));
                  }
                  dispatch(setNoDeliveryPulloutFee(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Canadian Charge
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={candianDelivery ? driverCanadianCharge : 0}
                disabled={viewDetail || !candianDelivery}
                onChange={(e) =>
                  validateDecimal(e.target.value) && dispatch(setDriverCanadianCharge(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverCanadianCharge(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                US Charge
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={!candianDelivery ? driverUSCharge : 0}
                disabled={viewDetail || candianDelivery}
                onChange={(e) =>
                  validateDecimal(e.target.value) && dispatch(setDriverUSCharge(e.target.value))
                }
                onBlur={(e) => dispatch(setDriverUSCharge(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                ELD Fee
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverELDFee}
                disabled={viewDetail}
                onChange={(e) => validateDecimal(e.target.value) && dispatch(setDriverELDFee(e.target.value))}
                onBlur={(e) => dispatch(setDriverELDFee(correctDecimalInputOnBlur(e.target.value)))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                ELD Fee Description
              </Form.Label>
            </Col>

            <Col xs={7} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={eldFeeDescription}
                disabled={viewDetail}
                onChange={(e) => dispatch(setEldFeeDescription(e.target.value))}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Driver;
