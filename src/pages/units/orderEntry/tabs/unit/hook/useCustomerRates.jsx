import { useState } from "react";
import OrderEntryServices from "../../../../../../service/orderEntry/orderEntry.service";

export const useCustomerRates = ({
  customerId,
  selectedUnitType,
  selectedCustomerBillingPlantId,
  multiUnit,
  unitsPerDispatch,
  invoice2as3,
  returnRates,
  reload,
}) => {
  // ----------------------------
  // API fetcher (internal)
  // ----------------------------
  const fetchRates = async (mode) => {
    if (!customerId || !selectedUnitType?.unitTypePK) return null;
    const { data } = await OrderEntryServices.fetchCustomerRates({
      customerFK: customerId,
      unitTypeFK: selectedUnitType?.unitTypePK,
      selectedCustomerBillingPlantId,
      multiUnit,
      unitsPerDispatch,
      twoAsThree: invoice2as3,
    });

    return data;
  };

  // ----------------------------
  // Base rate resolver
  // ----------------------------
  const hasValidRate = (data, type) => {
    if (!data) return false;

    let rate;

    if (type === "invoice") {
      rate = returnRates ? data.invoiceReturnRate1 : data.invoiceRate1;
    } else {
      rate = returnRates ? data.driverReturnRate1 : data.driverRate1;
    }

    return Number(rate) > 0;
  };

  // ----------------------------
  // Public API
  // ----------------------------
  const resolveCustomerRates = async () => {
    let res = await fetchRates();

    return res;
  };

  // SUPPLEMENTAL RATES
  const fetchSupplementalRates = async ({ unitTypeFK, deliveryDealerFK, stateCode }) => {
    if (!unitTypeFK || !customerId || !deliveryDealerFK) return null;

    const res = await OrderEntryServices.fetchSupplementalRates({
      unitTypeFK,
      customerFK: customerId,
      selectedCustomerBillingPlantId,
      deliveryDealerFK,
      stateCode,
      reload,
      returns: returnRates,
    });

    return res?.data || null;
  };

  // SPECIAL RATES
  const fetchSpecialRates = async ({ unitTypeFK, specialCodeFK }) => {
    if (!unitTypeFK || !customerId || !specialCodeFK) return null;

    const res = await OrderEntryServices.fetchSpecialRates({
      unitTypeFK,
      customerFK: customerId,
      selectedCustomerBillingPlantId,
      specialCodeFK,
      reload,
      returns: returnRates,
    });

    return res?.data || null;
  };

  // ADDITIONAL RATES
  const fetchAdditionalRates = async ({ unitTypeFK }) => {
    if (!unitTypeFK || !customerId) return null;

    const res = await OrderEntryServices.fetchAdditionalRates({
      customerFK: customerId,
      unitTypeFK,
      selectedCustomerBillingPlantId,
      reload,
      returns: returnRates,
    });

    return res?.data || null;
  };

  return {
    resolveCustomerRates,
    fetchSupplementalRates,
    fetchSpecialRates,
    fetchAdditionalRates,
  };
};
