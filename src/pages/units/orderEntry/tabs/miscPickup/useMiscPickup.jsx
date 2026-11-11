import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import useDebouncer from "../../../../../hooks/useDebouncer";

import {
  setMiscPickupID,
  setOrderEntrySchemaConditions,
  setSelectedPickupDealer,
  setUnitRoutesListing,
} from "../../../../../store/slices/unit.slice";

import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";

const useMiscPickup = () => {
  const dispatch = useDispatch();

  /* ------------------------------------------------------------------
     Local State
  ------------------------------------------------------------------ */

  const [deliveryDealerModel, setDeliveryDealerModel] = useState(false);
  const [dealerloading, setDealerloading] = useState(false);
  const [selectedMiscDealerData, setSelectedMiscDealerData] = useState(null);

  /* ------------------------------------------------------------------
     React Hook Form
  ------------------------------------------------------------------ */

  const {
    setValue,
    getValues,
    reset,
    formState: { defaultValues },
  } = useFormContext();

  const unitMiscellaneousPickup = useWatch({
    name: "unit.miscellaneousPickup",
  });

  /* ------------------------------------------------------------------
     Control Flags
  ------------------------------------------------------------------ */

  const shouldSyncRef = useRef(false);
  const isResettingRef = useRef(false);
  const lastSyncedRef = useRef(null);

  useEffect(() => {
    shouldSyncRef.current = unitMiscellaneousPickup === true;
  }, [unitMiscellaneousPickup]);

  /* ------------------------------------------------------------------
     Debounced Redux Sync (Manual + API)
  ------------------------------------------------------------------ */

  const debounceSyncMiscPickup = useDebouncer(() => {
    if (!shouldSyncRef.current) return;
    if (isResettingRef.current) return;

    const miscPickup = getValues("miscPickup");
    if (!miscPickup) return;

    const hasAnyValue = Object.values(miscPickup).some((v) => v !== null && v !== undefined && v !== "");
    if (!hasAnyValue) return;

    const serialized = JSON.stringify(miscPickup);
    if (lastSyncedRef.current === serialized) return;

    lastSyncedRef.current = serialized;

    dispatch(
      setSelectedPickupDealer({
        ...miscPickup,
        isPickup: true,
        isMiscPickup: true,
      })
    );

    dispatch(
      setUnitRoutesListing({
        actionType: "addPickup",
        payload: {
          ...miscPickup,
          unitAddressFK: miscPickup.unitAddressId || null,
          isCanadian: miscPickup?.canadian || false,
          isPickup: true,
          isMiscPickup: true,
        },
      })
    );

    dispatch(
      setOrderEntrySchemaConditions({
        miscPickup: { ...miscPickup },
      })
    );
  }, 300);

  /* ------------------------------------------------------------------
     Update miscPickup fields (API helper)
  ------------------------------------------------------------------ */

  const updateMisDealerFields = (fields) => {
    Object.entries(fields).forEach(([key, value]) => {
      setValue(`miscPickup.${key}`, value, {
        shouldDirty: false,
        shouldTouch: false,
      });
    });

    debounceSyncMiscPickup();
  };

  /* ------------------------------------------------------------------
     Dealer Selection
  ------------------------------------------------------------------ */

  const handleMiscellanousDealerSelection = async (item) => {
    setDeliveryDealerModel(false);

    if (item?.unitAddressPK) {
      setSelectedMiscDealerData(null);
      dispatch(setMiscPickupID(item.unitAddressPK));
      await findMiscellanousDealer(item.unitAddressPK);
    }
  };

  const findMiscellanousDealer = async (id) => {
    try {
      setDealerloading(true);
      const response = await OrderEntryServices.fetchMiscDealerById(id);
      setSelectedMiscDealerData(response.data);
      setDealerloading(false);
    } catch (err) {
      setDealerloading(false);
      console.error("Error fetching miscellaneous dealer:", err);
    }
  };

  /* ------------------------------------------------------------------
     Populate Form When API Data Arrives
  ------------------------------------------------------------------ */

  useEffect(() => {
    if (!selectedMiscDealerData) return;

    isResettingRef.current = true;

    updateMisDealerFields({
      name: selectedMiscDealerData?.name?.trim(),
      address1: selectedMiscDealerData?.address1?.trim(),
      address2: selectedMiscDealerData?.address2?.trim(),
      city: selectedMiscDealerData?.city?.trim(),
      stateCode: selectedMiscDealerData?.stateCode?.trim(),
      postalCode: selectedMiscDealerData?.postalCode?.trim(),
      phone: formatPhoneNumber(selectedMiscDealerData?.phone),
      email: selectedMiscDealerData?.email?.trim(),
      contact: selectedMiscDealerData?.deliveryContact?.trim(),
      contactPhone: formatPhoneNumber(selectedMiscDealerData?.deliveryContactPhone),

      openSunday: selectedMiscDealerData?.openSunday,
      openMonday: selectedMiscDealerData?.openMonday,
      openTuesday: selectedMiscDealerData?.openTuesday,
      openWednesday: selectedMiscDealerData?.openWednesday,
      openThursday: selectedMiscDealerData?.openThursday,
      openFriday: selectedMiscDealerData?.openFriday,
      openSaturday: selectedMiscDealerData?.openSaturday,

      driverEmailHours: selectedMiscDealerData?.hours?.trim(),
      driverEmailDirections: selectedMiscDealerData?.directions?.trim(),

      postalCodePK: selectedMiscDealerData?.postalCodePK,
      unitAddressId: selectedMiscDealerData?.unitAddressPK,
      canadian: selectedMiscDealerData?.canadian,
    });

    dispatch(
      setUnitRoutesListing({
        actionType: "addPickup",
        payload: {
          ...selectedMiscDealerData,
          isCanadian: selectedMiscDealerData?.canadian || false,
          isPickup: true,
          isMiscPickup: true,
        },
      })
    );

    setTimeout(() => {
      isResettingRef.current = false;
    }, 0);
  }, [selectedMiscDealerData?.unitAddressPK]);

  /* ------------------------------------------------------------------
     Reset When Misc Pickup Disabled
  ------------------------------------------------------------------ */

  useEffect(() => {
    if (unitMiscellaneousPickup) return;

    isResettingRef.current = true;
    lastSyncedRef.current = null;

    setSelectedMiscDealerData(null);

    reset(
      {
        ...getValues(),
        miscPickup: defaultValues?.miscPickup,
      },
      { keepDefaultValues: true }
    );

    dispatch(setSelectedPickupDealer(null));

    setTimeout(() => {
      isResettingRef.current = false;
    }, 0);
  }, [unitMiscellaneousPickup]);

  /* ------------------------------------------------------------------ */

  return {
    updateMisDealerFields,
    handleMiscellanousDealerSelection,
    dealerloading,
    deliveryDealerModel,
    setDeliveryDealerModel,
  };
};

export default useMiscPickup;
