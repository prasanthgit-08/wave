import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  setInvoiceAmount,
  setDriverAmount,
  setOrderEntrySchemaConditions,
  setPcMilerVisible,
} from "../../../../store/slices/unit.slice";
import useDebouncer from "../../../../hooks/useDebouncer";
import { useDispatch } from "react-redux";

const useFlatRate = () => {
  const [unitPercentage, setUnitPercentage] = useState(0);
  const [showOverrideButton, setShowOverrideButton] = useState(false);
  const {
    setValue,
    getValues,
    trigger,
    setError,
    clearErrors,

    formState: { errors },
  } = useFormContext();

  const dispatch = useDispatch();

  const selectedUnitType = useSelector((state) => state.unit.selectedUnitType);
  const selectedPickupDealer = useSelector((state) => state.unit.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);
  const orderEntrySchemaConditions = useSelector((state) => state.unit.orderEntrySchemaConditions);
  const allowedInvoicePercentage = useSelector((state) => state.unit.allowedInvoicePercentage);

  const unit = useWatch({ name: "unit" });

  const debounceUpdate = useDebouncer(() => {
    const unit = getValues("unit");
    dispatch(
      setOrderEntrySchemaConditions({
        unit: {
          ...orderEntrySchemaConditions?.unit,
          ...unit,
          selectedUnitType,
        },
      })
    );
  }, 150);

  // updating react hooks form values
  const updateUnitFields = (fields) => {
    Object.entries(fields).forEach(([key, value]) =>
      setValue(`unit.${key}`, value, { shouldValidate: false, shouldDirty: true })
    );
    debounceUpdate();
  };

  const handleAmountExceedsPercentage = () => {
    const unit = getValues("unit");
    dispatch(
      setOrderEntrySchemaConditions({
        allowedPercentage: false,
      })
    );

    const driverAmounts = Number(unit.driverFlatRate);
    const invoiceAmounts = Number(unit.invoiceFlatRate);

    if (!driverAmounts || !invoiceAmounts || !allowedInvoicePercentage) {
      setUnitPercentage(0);
      setShowOverrideButton(false);
      return;
    }

    const percentage = driverAmounts / invoiceAmounts;
    setUnitPercentage(percentage);

    const isExceeded = percentage > Number(allowedInvoicePercentage);

    dispatch(
      setOrderEntrySchemaConditions({
        allowedPercentage: isExceeded,
      })
    );

    setShowOverrideButton(isExceeded);
  };

  // debouncer
  const debounceHandleAmountExceedsPercentage = useDebouncer(handleAmountExceedsPercentage, 500);

  useEffect(() => {
    if (!selectedPickupDealer || !selectedDeliveryDealer) {
      dispatch(setPcMilerVisible(true));
      updateUnitFields({
        invoiceMiles: "0",
        driverMiles: "0",
        invoiceFlatRate: "0",
        driverFlatRate: "0",
        invoiceFlatRateVisible: false,
        driverFlatRateVisible: false,
      });
      dispatch(setInvoiceAmount(0));
      dispatch(setDriverAmount(0));

      return;
    }
  }, [selectedPickupDealer, selectedDeliveryDealer]);

  /**
   * Miles Overide Percentage
   */
  useEffect(() => {
    if (
      Number(unit.invoiceMiles) > 0 &&
      Number(unit.driverMiles) > 0 /*&& isDefaultInvoiceMiles*/ &&
      !unit.hasDrivebys
    ) {
      debounceHandleAmountExceedsPercentage();
    }
    if (unit.invoiceMiles == 0 || unit.driverMiles == 0) {
      setUnitPercentage(0);
      setShowOverrideButton(false);
    }
  }, [
    unit.invoiceMiles,
    unit.driverMiles,
    unitPercentage,
    unit.hasDrivebys,
    selectedDeliveryDealer,
    selectedPickupDealer,
  ]);

  return {
    updateUnitFields,
    debounceHandleAmountExceedsPercentage,
    showOverrideButton,
    unitPercentage,
  };
};

export default useFlatRate;
