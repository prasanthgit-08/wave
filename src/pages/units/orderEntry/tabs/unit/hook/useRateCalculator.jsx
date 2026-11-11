import { useEffect } from "react";

export const useRateCalculator = ({
  rateStructure,
  miles,
  flatrate,
  isDefaultFlatrate,

  pickupAtPlant,
  pickupDealersFK,
  deliverToPlant,
  deliveryDealersFK,

  calculateDebouncer,
  calculateFn,

  resetAmount,
  dependencies = [],
}) => {
  const canCalculate =
    // rateStructure !== "" &&
    // (flatrate === 0 || flatrate === "") &&
    // miles > 0 &&
    // !isDefaultFlatrate &&
    (pickupAtPlant || pickupDealersFK !== null) && (deliverToPlant || deliveryDealersFK !== null);

  useEffect(
    () => {
      if (canCalculate) {
        calculateDebouncer();
      } else {
        // resetAmount();
      }
    },
    dependencies
    // flatrate
  );
};
