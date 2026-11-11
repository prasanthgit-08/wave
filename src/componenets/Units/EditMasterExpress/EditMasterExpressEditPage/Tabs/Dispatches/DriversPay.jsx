import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  updateDriverPayTabData,
  updateField,
  updateMultipleFields,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressDispatchDriverPayTabSlice";
import DateInputField from "../../../../../common/DateInputField";
import { correctDecimalInputOnBlur, isOnlyDot } from "../../../../../../utils/utils";
import { setTriggeringAmountCalculation } from "../../../../../../redux/EditMasterExpress/EditMasterExpressInvoiceTabSlice";
import { setFlagChanged } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

function DriversPay({ styles }) {
  const dispatch = useDispatch();

  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);

  const {
    miles,
    payMiles,
    flatRate,
    baseRate,
    fuelSurchargeRate,
    cDLARate,
    apportionedRate,
    supplementalRate,
    supplementalFuelSurchargeRate,
    supplementalDescription,
    lengthRate,
    additionalRate,
    additionalFuelSurchargeRate,
    additionalFlatRate,
    additionalFlatRateDescription,
    additionalDescription,
    specialRate,
    specialFuelSurchargeRate,
    specialDescription,
    driverRate,
    driverFuelSurchargeRate,
    driverDescription,
    halfTonAdjustmentRate,
    longUnitRateDescription,
    longUnitRate,
    safetyRate,
    bonusPoolRate,
    subTotal,
    subTotalFuelSurcharge,
    fuelSurcharge,
    totalRate,
    grossPay,
    pickupPulloutFee,
    additionalPulloutFee,
    deliveryPulloutFee,
    uSCharge,
    canadianCharge,
    bondFee,
    netPay,
    payBalance,
    flatRated,
    driverELDFee,
    deliveryBonus,
    driverDeliveryBonus,
    invoiceDeliveryBonus,
    deliveryBonusDescription,
    deliveryBonusDeliverByDate,
    deliveryBonusDeliverByDateValid,
    candianDelivery,
  } = useSelector((state) => state.editMasterExpressDispatchDriverPayTabSlice);

  const editedUnitDispatchDataToSaveForDispatchesTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDispatchDataToSaveForDispatchesTab
  );

  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);

  const updateValue = (field, value) => {
    dispatch(updateField({ field, value }));
    const data = { [field]: value };
    dispatch(updateDriverPayTabData(data));
  };

  const updateTabEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const updateDriverPayTab = (field, value) => {
    const data = { [field]: value };
    dispatch(updateDriverPayTabData(data));
  };

  useEffect(() => {
    const dispatchDriverPayTab = selectedUnitData?.dispatchDriverPayTab;
    if (dispatchDriverPayTab) {
      setTimeout(() => {
        updateTabEditData("driverPayTabData", dispatchDriverPayTab);
        dispatch(updateMultipleFields(dispatchDriverPayTab));
      }, 15);
    }
  }, [selectedUnitData, viewDetail]);

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

  useEffect(() => {
    if (!deliveryBonus) {
      updateValue("deliveryBonusDescription", "");
      updateValue("invoiceDeliveryBonus", 0);
      updateValue("driverDeliveryBonus", 0);
      updateValue("deliveryBonusDeliverByDate", null);
    }
  }, [deliveryBonus]);

  useEffect(() => {
    updateDriverPayTab("cDLARate", cDLARate);
    updateDriverPayTab("apportionedRate", apportionedRate);
  }, [cDLARate, apportionedRate]);

  useEffect(() => {
    const newSubTotalRate =
      (+baseRate || 0) +
      (+cDLARate || 0) +
      (+apportionedRate || 0) +
      (+supplementalRate || 0) +
      (+lengthRate || 0) +
      (+additionalRate || 0) +
      (+specialRate || 0) +
      (+driverRate || 0) +
      (+halfTonAdjustmentRate || 0) +
      (+longUnitRate || 0) +
      (+safetyRate || 0) +
      (+bonusPoolRate || 0);

    const newSubTotalFlatRate =
      (+supplementalFuelSurchargeRate || 0) +
      (+additionalFuelSurchargeRate || 0) +
      (+specialFuelSurchargeRate || 0) +
      (+driverFuelSurchargeRate || 0) +
      (+fuelSurchargeRate || 0);

    const newTotalRate = newSubTotalRate + newSubTotalFlatRate + (+fuelSurcharge || 0);
    const roundedTotalRate = parseFloat(newTotalRate.toFixed(4));
    const roundedSubTotalFlatRate = parseFloat(newSubTotalFlatRate.toFixed(4));
    const roundedSubTotalRate = parseFloat(newSubTotalRate.toFixed(4));
    const newGrossPay = (+newTotalRate || 0) * (+payMiles || 0);
    const roundedGrossPay = parseFloat(newGrossPay.toFixed(2));
    const payDiff = (+netPay || 0) - (+payBalance || 0);
    const newNetPay =
      (+newGrossPay || +grossPay || 0) +
      (+canadianCharge || 0) +
      (+uSCharge || 0) +
      (+additionalFlatRate || 0) +
      (editedUnitDispatchDataToSaveForDispatchesTab?.noPickupPulloutFee
        ? (-pickupPulloutFee || 0) + (-additionalPulloutFee || 0)
        : 0) +
      (-editedUnitDispatchDataToSaveForDispatchesTab?.noDeliveryPulloutFee ? +deliveryPulloutFee || 0 : 0) +
      (-bondFee || 0) +
      (+driverELDFee || 0);
    const newPayBalance = newNetPay - payDiff;

    if (!flatRated) {
      updateValue("totalRate", roundedTotalRate);
      updateValue("grossPay", roundedGrossPay);
      updateValue("subTotal", roundedSubTotalRate);
      updateValue("subTotalFuelSurcharge", roundedSubTotalFlatRate);
    }
    const pay = newNetPay || newPayBalance;
    const roundedNetPay = parseFloat(pay.toFixed(2));
    const roundedPayBalance = parseFloat(newPayBalance.toFixed(2));
    updateValue("netPay", roundedNetPay);
    updateValue("payBalance", roundedPayBalance);
  }, [
    baseRate,
    fuelSurchargeRate,
    netPay,
    payBalance,
    fuelSurcharge,
    cDLARate,
    supplementalRate,
    supplementalFuelSurchargeRate,
    lengthRate,
    additionalRate,
    additionalFuelSurchargeRate,
    additionalFlatRate,
    driverELDFee,
    specialRate,
    specialFuelSurchargeRate,
    driverRate,
    driverFuelSurchargeRate,
    halfTonAdjustmentRate,
    longUnitRate,
    safetyRate,
    bonusPoolRate,
    miles,
    payMiles,
    flatRated,
    flatRate,
    canadianCharge,
    uSCharge,
    pickupPulloutFee,
    additionalPulloutFee,
    deliveryPulloutFee,
    bondFee,
    additionalFlatRate,
    netPay,
    payBalance,
  ]);

  useEffect(() => {
    if (!editedUnitDispatchDataToSaveForDispatchesTab?.noPickupPulloutFee) {
      updateValue("pickupPulloutFee", 0);
      updateValue("additionalPulloutFee", 0);
    }
    if (!editedUnitDispatchDataToSaveForDispatchesTab?.noDeliveryPulloutFee) {
      updateValue("deliveryPulloutFee", 0);
    }
  }, [
    editedUnitDispatchDataToSaveForDispatchesTab?.noPickupPulloutFee,
    editedUnitDispatchDataToSaveForDispatchesTab?.noDeliveryPulloutFee,
  ]);

  useEffect(() => {
    if (
      (!additionalFlatRate || additionalFlatRate == 0) &&
      (!additionalFuelSurchargeRate || additionalFuelSurchargeRate == 0) &&
      (!additionalRate || additionalRate == 0)
    ) {
      updateValue("additionalDescription", "");
    }
  }, [additionalFlatRate, additionalFuelSurchargeRate, additionalRate, additionalDescription]);

  const handleNull = (value) => {
    return value === null || String(value)?.trim() === "" ? 0 : value;
  };

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Driver Miles
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl ${viewDetail ? "" : Number(miles) > 0 ? "borderGreen" : "borderRed"}`}
                type="text"
                autoComplete="off"
                disabled={viewDetail}
                aria-autocomplete="list"
                value={miles}
                onChange={(e) => {
                  if (!validateInteger(e.target.value)) return;

                  updateValue("miles", e.target.value);
                  setTimeout(() => {
                    dispatch(setTriggeringAmountCalculation());
                    dispatch(setFlagChanged("dispatchRateChanged"));
                  }, 0);
                }}
                onBlur={(e) => {
                  updateValue("miles", handleNull(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Pay Miles
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={payMiles}
                disabled
                onChange={(e) => {
                  validateInteger(e.target.value) && updateValue("payMiles", e.target.value);
                }}
                onBlur={(e) => {
                  updateValue("payMiles", handleNull(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <p className="m-b-2 text-center">Fuel Surcharge</p>
          <Form.Group className=" align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Base Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl ${isOnlyDot(baseRate) ? "borderRed" : ""}`}
                disabled={viewDetail || flatRated}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={baseRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("baseRate", e.target.value);
                }}
                onBlur={(e) => updateValue("baseRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                disabled={viewDetail || flatRated}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={fuelSurchargeRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("fuelSurchargeRate", e.target.value);
                }}
                onBlur={(e) => updateValue("fuelSurchargeRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Col sm={10}>
                <input
                  className={`customFormControl`}
                  disabled={viewDetail || flatRated}
                  type="text"
                  maxLength={50}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={supplementalDescription}
                  onChange={(e) => {
                    updateValue("supplementalDescription", e.target.value !== " " ? e.target.value : "");
                  }}
                />
              </Col>
            </Col>

            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || flatRated}
                autoComplete="off"
                aria-autocomplete="list"
                value={supplementalRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("supplementalRate", e.target.value);
                }}
                onBlur={(e) => updateValue("supplementalRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || flatRated}
                autoComplete="off"
                aria-autocomplete="list"
                value={supplementalFuelSurchargeRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) &&
                    updateValue("supplementalFuelSurchargeRate", e.target.value);
                }}
                onBlur={(e) =>
                  updateValue("supplementalFuelSurchargeRate", correctDecimalInputOnBlur(e.target.value))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                CDL Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || flatRated}
                autoComplete="off"
                aria-autocomplete="list"
                value={cDLARate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("cDLARate", e.target.value);
                }}
                onBlur={(e) => updateValue("cDLARate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Apportioned Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || flatRated}
                autoComplete="off"
                aria-autocomplete="list"
                value={apportionedRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("apportionedRate", e.target.value);
                }}
                onBlur={(e) => updateValue("apportionedRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Length Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || flatRated}
                autoComplete="off"
                aria-autocomplete="list"
                value={lengthRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("lengthRate", e.target.value);
                }}
                onBlur={(e) => updateValue("lengthRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Col sm={10}>
                <input
                  className={`customFormControl`}
                  type="text"
                  disabled={viewDetail || flatRated}
                  maxLength={50}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={specialDescription}
                  onChange={(e) => {
                    updateValue("specialDescription", e.target.value !== " " ? e.target.value : "");
                  }}
                />
              </Col>
            </Col>

            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || flatRated}
                autoComplete="off"
                aria-autocomplete="list"
                value={specialRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("specialRate", e.target.value);
                }}
                onBlur={(e) => updateValue("specialRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                disabled={viewDetail || flatRated}
                aria-autocomplete="list"
                value={specialFuelSurchargeRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) &&
                    updateValue("specialFuelSurchargeRate", e.target.value);
                }}
                onBlur={(e) =>
                  updateValue("specialFuelSurchargeRate", correctDecimalInputOnBlur(e.target.value))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Col sm={10}>
                <input
                  className={`customFormControl`}
                  type="text"
                  maxLength={50}
                  autoComplete="off"
                  disabled={
                    viewDetail ||
                    flatRated ||
                    additionalFlatRate ||
                    ((!additionalRate || additionalRate == 0) &&
                      (!additionalFuelSurchargeRate || additionalFuelSurchargeRate == 0))
                  }
                  aria-autocomplete="list"
                  value={(!additionalFlatRate && additionalDescription) || ""}
                  onChange={(e) => {
                    if (additionalRate || additionalFuelSurchargeRate) {
                      updateValue("additionalDescription", e.target.value !== " " ? e.target.value : "");
                    }
                  }}
                />
              </Col>
            </Col>

            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || flatRated || additionalFlatRate}
                value={additionalRate}
                onChange={(e) => {
                  if (validateLongDecimal(e.target.value)) {
                    updateValue("additionalRate", e.target.value);
                    updateValue("additionalFlatRate", 0);
                  }
                }}
                onBlur={(e) => updateValue("additionalRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || flatRated || additionalFlatRate}
                value={additionalFuelSurchargeRate}
                onChange={(e) => {
                  if (validateLongDecimal(e.target.value)) {
                    updateValue("additionalFuelSurchargeRate", e.target.value);
                    updateValue("additionalFlatRate", 0);
                  }
                }}
                onBlur={(e) =>
                  updateValue("additionalFuelSurchargeRate", correctDecimalInputOnBlur(e.target.value))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Col sm={10}>
                <input
                  className={`customFormControl`}
                  type="text"
                  maxLength={50}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled={viewDetail || flatRated}
                  value={driverDescription}
                  onChange={(e) => {
                    updateValue("driverDescription", e.target.value !== " " ? e.target.value : "");
                  }}
                />
              </Col>
            </Col>

            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || flatRated}
                value={driverRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("driverRate", e.target.value);
                }}
                onBlur={(e) => updateValue("driverRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || flatRated}
                value={driverFuelSurchargeRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) &&
                    updateValue("driverFuelSurchargeRate", e.target.value);
                }}
                onBlur={(e) =>
                  updateValue("driverFuelSurchargeRate", correctDecimalInputOnBlur(e.target.value))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Half Ton Adjustment Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || flatRated}
                autoComplete="off"
                aria-autocomplete="list"
                value={halfTonAdjustmentRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("halfTonAdjustmentRate", e.target.value);
                }}
                onBlur={(e) =>
                  updateValue("halfTonAdjustmentRate", correctDecimalInputOnBlur(e.target.value))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Col sm={10}>
                <input
                  className={`customFormControl`}
                  maxLength={50}
                  type="text"
                  disabled={viewDetail || flatRated}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={longUnitRateDescription}
                  onChange={(e) => {
                    updateValue("longUnitRateDescription", e.target.value !== " " ? e.target.value : "");
                  }}
                />
              </Col>
            </Col>

            <Col xs={1} className="p-0 ">
              <input
                className={`customFormControl`}
                disabled={viewDetail || flatRated}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={longUnitRate}
                onChange={(e) => {
                  validateShortDecimal(e.target.value) && updateValue("longUnitRate", e.target.value);
                }}
                onBlur={(e) => updateValue("longUnitRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Safety Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                disabled={viewDetail || flatRated}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={safetyRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("safetyRate", e.target.value);
                }}
                onBlur={(e) => updateValue("safetyRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Bonus Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                disabled={viewDetail || flatRated}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={bonusPoolRate}
                onChange={(e) => {
                  validateLongDecimal(e.target.value) && updateValue("bonusPoolRate", e.target.value);
                }}
                onBlur={(e) => updateValue("bonusPoolRate", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Sub Total
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                disabled
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={subTotal}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("subTotal", e.target.value);
                }}
              />
            </Col>
            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                disabled
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={subTotalFuelSurcharge}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("subTotalFuelSurcharge", e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Fuel Surcharge
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                disabled={viewDetail || flatRated}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={fuelSurcharge}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("fuelSurcharge", e.target.value);
                }}
                onBlur={(e) => updateValue("fuelSurcharge", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Total Rate
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                disabled
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={totalRate}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("totalRate", e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Drivers Pay = Pay Miles
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                type="text"
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={totalRate || ""}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("totalRate", e.target.value);
                }}
              />
            </Col>
            <Col className="col-1 pb-0">@</Col>
            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                type="text"
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={payMiles}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("payMiles", e.target.value);
                }}
              />
            </Col>
            <Col className="col-1 pb-0">=</Col>
            <Col xs={1} className="p-0 me-3">
              <input
                className={`customFormControl`}
                type="text"
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={grossPay || flatRate}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("driverAmount", e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Gross Pay
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                disabled={viewDetail || !flatRated}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={grossPay}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("grossPay", e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Canadian Charge
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                disabled={viewDetail || !candianDelivery}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={canadianCharge}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("canadianCharge", e.target.value);
                }}
                onBlur={(e) => {
                  updateValue("canadianCharge", handleNull(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Us Charge
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || candianDelivery}
                autoComplete="off"
                aria-autocomplete="list"
                value={uSCharge}
                onChange={(e) => {
                  // Keep the raw text while typing (like the other amount fields); converting with
                  // `+value || 0` turned an emptied field back into 0 and dropped a typed ".".
                  validateDecimal(e.target.value) && updateValue("uSCharge", e.target.value);
                }}
                onBlur={(e) => {
                  // Empty -> 0, "1." -> "1", ".5" -> "0.5"
                  updateValue("uSCharge", correctDecimalInputOnBlur(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Col sm={10}>
                <input
                  className={`customFormControl`}
                  type="text"
                  maxLength={50}
                  autoComplete="off"
                  disabled={
                    viewDetail ||
                    additionalRate ||
                    additionalFuelSurchargeRate ||
                    !additionalFlatRate ||
                    additionalFlatRate == 0
                  }
                  aria-autocomplete="list"
                  value={(additionalFlatRate && additionalDescription) || ""}
                  onChange={(e) => {
                    if (additionalFlatRate) {
                      updateValue("additionalDescription", e.target.value !== " " ? e.target.value : "");
                    }
                  }}
                />
              </Col>
            </Col>

            <Col xs={1} className="p-0 ">
              <input
                className={`customFormControl`}
                type="text"
                disabled={
                  viewDetail ||
                  (additionalRate && additionalRate != 0) ||
                  (additionalFuelSurchargeRate && additionalFuelSurchargeRate != 0)
                }
                autoComplete="off"
                aria-autocomplete="list"
                value={additionalFlatRate}
                onChange={(e) => {
                  if (validateDecimal(e.target.value)) {
                    updateValue("additionalFlatRate", e.target.value);
                    updateField("additionalRate", 0);
                    updateField("additionalFuelSurchargeRate", 0);
                  }
                }}
                onBlur={(e) => {
                  updateValue("additionalFlatRate", handleNull(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                ELD Fee
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                value={driverELDFee}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("driverELDFee", e.target.value);
                }}
                onBlur={(e) => updateValue("driverELDFee", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Pickup Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || !editedUnitDispatchDataToSaveForDispatchesTab?.noPickupPulloutFee}
                autoComplete="off"
                aria-autocomplete="list"
                value={pickupPulloutFee}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("pickupPulloutFee", e.target.value);
                }}
                onBlur={(e) => updateValue("pickupPulloutFee", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Additional Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || !editedUnitDispatchDataToSaveForDispatchesTab?.noPickupPulloutFee}
                autoComplete="off"
                aria-autocomplete="list"
                value={additionalPulloutFee}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("additionalPulloutFee", e.target.value);
                }}
                onBlur={(e) => updateValue("additionalPulloutFee", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Delivery Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail || !editedUnitDispatchDataToSaveForDispatchesTab?.noDeliveryPulloutFee}
                autoComplete="off"
                aria-autocomplete="list"
                value={deliveryPulloutFee}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("deliveryPulloutFee", e.target.value);
                }}
                onBlur={(e) => updateValue("deliveryPulloutFee", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Driver Qual
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                value={bondFee}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("bondFee", e.target.value);
                }}
                onBlur={(e) => updateValue("bondFee", correctDecimalInputOnBlur(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Net Pay
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={netPay}
                onChange={(e) => {}}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Pay Balance
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={payBalance}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("payBalance", e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Delivery Bonus</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                disabled={viewDetail}
                className="form-check-input p-0"
                checked={deliveryBonus}
                onClick={(e) => {
                  updateValue("deliveryBonus", e.target.checked);
                }}
                onBlur={(e) => {
                  updateValue("deliveryBonus", handleNull(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Driver Delivery Bonus
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl ${
                  deliveryBonus && !viewDetail
                    ? !driverDeliveryBonus || driverDeliveryBonus == 0
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                disabled={viewDetail || !deliveryBonus}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={driverDeliveryBonus}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("driverDeliveryBonus", e.target.value);
                }}
                onBlur={(e) => {
                  updateValue("driverDeliveryBonus", handleNull(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Invoice Delivery Bonus
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className={`customFormControl ${
                  deliveryBonus && !viewDetail
                    ? !invoiceDeliveryBonus || invoiceDeliveryBonus == 0
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                disabled={viewDetail || !deliveryBonus}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={invoiceDeliveryBonus}
                onChange={(e) => {
                  validateDecimal(e.target.value) && updateValue("invoiceDeliveryBonus", e.target.value);
                }}
                onBlur={(e) => {
                  updateValue("invoiceDeliveryBonus", handleNull(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Description
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className={`customFormControl ${
                  deliveryBonus && !viewDetail
                    ? !deliveryBonusDescription
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                maxLength={50}
                disabled={viewDetail || !deliveryBonus}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                value={deliveryBonusDescription}
                onChange={(e) => {
                  updateValue("deliveryBonusDescription", e.target.value !== " " ? e.target.value : "");
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                If Delivered By
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              {/* <input className={`customFormControl`} type="date" disabled} autoComplete="off" aria-autocomplete="list" value={deliveryBonusDeliverByDate}  onChange={(e)=>{
                validateDecimal(e.target.value)&&updateValue( 'deliverByDate' ,e.target.value)
              }}/> */}
              <DateInputField
                disabled={viewDetail || !deliveryBonus}
                date={deliveryBonusDeliverByDate}
                min={new Date()}
                setDate={(value) => {
                  updateValue("deliveryBonusDeliverByDate", value);
                }}
                setIsDateValid={(value) => {
                  updateValue("deliveryBonusDeliverByDateValid", value);
                }}
                className={`customFormControl ${
                  deliveryBonus && !viewDetail
                    ? !(deliveryBonusDeliverByDate && deliveryBonusDeliverByDateValid)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default DriversPay;
