import { useEffect, useState } from "react";
import OrderEntryServices from "../../../../../../service/orderEntry/orderEntry.service";
import { useDispatch, useSelector } from "react-redux";
import useDebouncer from "../../../../../../hooks/useDebouncer";
import { setRequiredCDLA } from "../../../../../../store/slices/unit.slice";

export const useCDL = ({ unit, selectedUnitType, customerReload, customerReturnRates, pickupAtPlant }) => {
  const [requiredCDLAHidden, setRequiredCDLAHidden] = useState(false);
  const [invoiceCDLASurcharge, setInvoiceCDLASurcharge] = useState(0);
  const [driverCDLASurcharge, setDriverCDLASurcharge] = useState(0);

  const unitTypeTowable = useSelector((state) => state.unit.selectedUnitType?.towable);
  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);
  const invoiceRateStructure = useSelector((state) => state.unit.invoiceRateStructure);
  const driverRateStructure = useSelector((state) => state.unit.driverRateStructure);
  const isDriverMileageRate = useSelector((state) => state.unit.isDriverMileageRate);
  const requiredCDLA = useSelector((state) => state.unit.requiredCDLA);

  const dispatch = useDispatch();

  const handleCDLRateFetch = ({
    type,
    gvwr = 0,
    length = 0,
    invoiceCustomerRateFK = 0,
    driverCustomerRateFK = 0,
    reload,
    returnBit,
    requireCDLA,
    canadian,
  }) => {
    OrderEntryServices.getCDLARate({
      gvwr,
      length,
      invoiceCustomerRateFK,
      driverCustomerRateFK,
      reload,
      returnBit,
      requireCDLA,
      canadian,
    }).then((res) => {
      const { Invoice, Driver } = res.data;
      type === "Invoice" ? setInvoiceCDLASurcharge(Invoice) : setDriverCDLASurcharge(Driver);
    });
  };

  const meetsCDLCutoff = (gvwrCutoff, lengthCutoff) =>
    (gvwrCutoff && unit.gvwr && Number(unit.gvwr) >= gvwrCutoff) ||
    (lengthCutoff && selectedUnitType?.length >= lengthCutoff);

  const fetchCDL = (type, invoicePK = 0, driverPK = 0) => {
    handleCDLRateFetch({
      type,
      gvwr: unit.gvwr,
      length: selectedUnitType?.length,
      invoiceCustomerRateFK: invoicePK,
      driverCustomerRateFK: driverPK,
      reload: customerReload,
      returnBit: customerReturnRates,
      requireCDLA: unit.cdlaRequired,
      canadian: selectedDeliveryDealer?.canadian,
    });
  };

  const handleInvoiceCDL = () => {
    if (!invoiceRateStructure || !selectedDeliveryDealer) {
      setInvoiceCDLASurcharge(0);
      return;
    }
    const cutoffMet = meetsCDLCutoff(
      invoiceRateStructure.invoiceCDLGVWRCutoff,
      invoiceRateStructure.invoiceCDLLengthCutoff
    );

    if (cutoffMet) {
      fetchCDL("Invoice", invoiceRateStructure.customerRatePK);
    }
  };

  const handleDriverCDL = () => {
    if (!driverRateStructure || !selectedDeliveryDealer) {
      setDriverCDLASurcharge(0);
      return;
    }

    const cutoffMet = meetsCDLCutoff(
      driverRateStructure.driverCDLGVWRCutoff,
      driverRateStructure.driverCDLLengthCutoff
    );

    if (cutoffMet) {
      fetchCDL("Driver", 0, driverRateStructure.customerRatePK);
    }
  };

  const setCDLSurchargesForRates = () => {
    handleInvoiceCDL();
    handleDriverCDL();
  };

  const setRequiredCDLAVisibility = () => {
    // Default state
    let hidden = true;
    let required = false;

    if (!selectedUnitType) {
      setRequiredCDLAHidden(true);
      return;
    }

    // -------------------------
    // Motorized
    // -------------------------
    if (!unitTypeTowable) {
      if (!customerReload || (customerReload && pickupAtPlant)) {
        hidden = true;
        required = false;
      } else {
        hidden = false;
      }
    }

    // -------------------------
    // Towable
    // -------------------------
    if (unitTypeTowable) {
      if (!isDriverMileageRate) {
        hidden = false;
      } else {
        const isReloadCase = customerReload && !pickupAtPlant;

        if (driverCDLASurcharge > 0) {
          hidden = true;
          required = true;

          if (isReloadCase) {
            if (!driverRateStructure?.useCDLReload) {
              required = false;
            }
            if (customerReturnRates && !driverRateStructure?.useCDLReturns) {
              required = false;
            }
          }
        } else {
          // surcharge == 0
          if (isReloadCase) {
            if (!driverRateStructure?.useCDLReload) {
              hidden = true;
              required = false;
            }
            if (customerReturnRates && !driverRateStructure?.useCDLReturns) {
              hidden = true;
              required = false;
            }
          } else {
            hidden = false;
            required = false;
          }
        }
      }
    }

    // Single state update
    setRequiredCDLAHidden(hidden);
    dispatch(setRequiredCDLA(required));
  };

  const debounceSetCDLSurchargesForRates = useDebouncer(setCDLSurchargesForRates, 500);

  useEffect(() => {
    if (!unit.miscellaneousPickup && !unit.miscellaneousDelivery) {
      debounceSetCDLSurchargesForRates();
    }
  }, [
    requiredCDLA,
    requiredCDLAHidden,
    selectedDeliveryDealer,
    customerReturnRates,
    unit.cdlaRequired,
    unit.gvwr,
    customerReload,
    selectedUnitType?.unitTypePK,
  ]);

  useEffect(() => {
    setRequiredCDLAVisibility();
  }, [
    selectedUnitType,
    customerReturnRates,
    customerReload,
    unitTypeTowable,
    driverCDLASurcharge,
    isDriverMileageRate,
    pickupAtPlant,
    driverRateStructure,
  ]);

  return { requiredCDLAHidden, invoiceCDLASurcharge, driverCDLASurcharge };
};
