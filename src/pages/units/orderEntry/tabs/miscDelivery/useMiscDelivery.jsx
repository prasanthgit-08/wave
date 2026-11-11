import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import useDebouncer from "../../../../../hooks/useDebouncer";

import {
  setMiscDeliveryID,
  setOrderEntrySchemaConditions,
  setSelectedDeliveryDealer,
  setUnitRoutesListing,
} from "../../../../../store/slices/unit.slice";

import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";

const useMiscDelivery = () => {
  const dispatch = useDispatch();

  /* ------------------------------------------------------------------
     Local State
  ------------------------------------------------------------------ */

  const [miscDealerModel, setMiscDealerModel] = useState(false);
  const [deliveryDealerloading, setDeliveryDealerloading] = useState(false);
  const [selectedDeliveryDealers, setSelectedDeliveryDealers] = useState(null);

  /* ------------------------------------------------------------------
     React Hook Form
  ------------------------------------------------------------------ */

  const {
    setValue,
    getValues,
    reset,
    formState: { defaultValues },
  } = useFormContext();

  const unitMiscellaneousDelivery = useWatch({
    name: "unit.miscellaneousDelivery",
  });

  /* ------------------------------------------------------------------
     Control Flags
  ------------------------------------------------------------------ */

  const shouldSyncRef = useRef(false);
  const isResettingRef = useRef(false);
  const lastSyncedRef = useRef(null);

  useEffect(() => {
    shouldSyncRef.current = unitMiscellaneousDelivery === true;
  }, [unitMiscellaneousDelivery]);

  /* ------------------------------------------------------------------
     Debounced Redux Sync (Manual typing + API)
  ------------------------------------------------------------------ */

  const debounceSyncMiscDelivery = useDebouncer(() => {
    if (!shouldSyncRef.current) return;
    if (isResettingRef.current) return;

    const miscDelivery = getValues("miscDelivery");
    if (!miscDelivery) return;

    const hasAnyValue = Object.values(miscDelivery).some((v) => v !== null && v !== undefined && v !== "");
    if (!hasAnyValue) return;

    const serialized = JSON.stringify(miscDelivery);
    if (lastSyncedRef.current === serialized) return;

    lastSyncedRef.current = serialized;

    dispatch(
      setSelectedDeliveryDealer({
        ...miscDelivery,
        isDelivery: true,
        isMiscDelivery: true,
      })
    );

    dispatch(
      setUnitRoutesListing({
        actionType: "addDelivery",
        payload: {
          ...miscDelivery,
          unitAddressFK: miscDelivery.unitAddressId || null,
          isCanadian: miscDelivery?.canadian || false,
          isDelivery: true,
          isMiscDelivery: true,
        },
      })
    );
    dispatch(
      setOrderEntrySchemaConditions({
        miscDelivery: { ...miscDelivery },
      })
    );
  }, 300);

  /* ------------------------------------------------------------------
     Update miscDelivery fields (API helper)
  ------------------------------------------------------------------ */

  const updateMiscDeliveryDealerFields = (fields) => {
    Object.entries(fields).forEach(([key, value]) => {
      setValue(`miscDelivery.${key}`, value, {
        shouldDirty: false,
        shouldTouch: false,
      });
    });

    debounceSyncMiscDelivery();
  };

  /* ------------------------------------------------------------------
     Dealer Selection
  ------------------------------------------------------------------ */

  const handleDeliveryDealerSelection = async (item) => {
    setMiscDealerModel(false);
    if (item?.unitAddressPK) {
      setSelectedDeliveryDealers(null);
      dispatch(setMiscDeliveryID(item.unitAddressPK));
      await findMiscellanousDealer(item.unitAddressPK);
    }
  };

  const findMiscellanousDealer = async (id) => {
    try {
      setDeliveryDealerloading(true);
      const response = await OrderEntryServices.fetchMiscDealerById(id);
      setSelectedDeliveryDealers(response.data);
      setDeliveryDealerloading(false);
    } catch (err) {
      setDeliveryDealerloading(false);
      console.error("Error fetching miscellaneous delivery dealer:", err);
    }
  };

  /* ------------------------------------------------------------------
     Populate Form When API Data Arrives
  ------------------------------------------------------------------ */

  useEffect(() => {
    if (!selectedDeliveryDealers) return;

    isResettingRef.current = true;

    updateMiscDeliveryDealerFields({
      name: selectedDeliveryDealers?.name?.trim(),
      address1: selectedDeliveryDealers?.address1?.trim(),
      address2: selectedDeliveryDealers?.address2?.trim(),
      city: selectedDeliveryDealers?.city?.trim(),
      stateCode: selectedDeliveryDealers?.stateCode?.trim(),
      postalCode: selectedDeliveryDealers?.postalCode?.trim(),
      phone: formatPhoneNumber(selectedDeliveryDealers?.phone),
      email: selectedDeliveryDealers?.email?.trim(),
      contact: selectedDeliveryDealers?.deliveryContact?.trim(),
      contactPhone: formatPhoneNumber(selectedDeliveryDealers?.deliveryContactPhone),

      openSunday: selectedDeliveryDealers?.openSunday,
      openMonday: selectedDeliveryDealers?.openMonday,
      openTuesday: selectedDeliveryDealers?.openTuesday,
      openWednesday: selectedDeliveryDealers?.openWednesday,
      openThursday: selectedDeliveryDealers?.openThursday,
      openFriday: selectedDeliveryDealers?.openFriday,
      openSaturday: selectedDeliveryDealers?.openSaturday,

      driverEmailHours: selectedDeliveryDealers?.hours?.trim(),
      driverEmailDirections: selectedDeliveryDealers?.directions?.trim(),
      driverEmailWashInstructions: selectedDeliveryDealers?.washInstructions?.trim(),

      postalCodePK: selectedDeliveryDealers?.postalCodePK,
      unitAddressId: selectedDeliveryDealers?.unitAddressPK,

      bolTextMiscellaneousInputValues: [
        selectedDeliveryDealers?.bolText1 || "",
        selectedDeliveryDealers?.bolText2 || "",
        selectedDeliveryDealers?.bolText3 || "",
        selectedDeliveryDealers?.bolText4 || "",
        selectedDeliveryDealers?.bolText5 || "",
        selectedDeliveryDealers?.bolText6 || "",
        selectedDeliveryDealers?.bolText7 || "",
      ],

      bolTextDirectionsInputValues: [
        selectedDeliveryDealers?.directions1 || "",
        selectedDeliveryDealers?.directions2 || "",
        selectedDeliveryDealers?.directions3 || "",
        selectedDeliveryDealers?.directions4 || "",
        selectedDeliveryDealers?.directions5 || "",
        selectedDeliveryDealers?.directions6 || "",
        selectedDeliveryDealers?.directions7 || "",
      ],

      bolTextHoursInputValues: [
        selectedDeliveryDealers?.hours1 || "",
        selectedDeliveryDealers?.hours2 || "",
        selectedDeliveryDealers?.hours3 || "",
      ],

      bolTextWashInstructionsInputValues: [
        selectedDeliveryDealers?.washInstructions1 || "",
        selectedDeliveryDealers?.washInstructions2 || "",
        selectedDeliveryDealers?.washInstructions3 || "",
        selectedDeliveryDealers?.washInstructions4 || "",
        selectedDeliveryDealers?.washInstructions5 || "",
      ],

      bolTextOtherInputValues: [
        selectedDeliveryDealers?.otherText1 || "",
        selectedDeliveryDealers?.otherText2 || "",
        selectedDeliveryDealers?.otherText3 || "",
      ],
    });

    dispatch(
      setUnitRoutesListing({
        actionType: "addDelivery",
        payload: {
          ...selectedDeliveryDealers,
          isCanadian: selectedDeliveryDealers?.canadian || false,
          isDelivery: true,
          isMiscDelivery: true,
        },
      })
    );

    setTimeout(() => {
      isResettingRef.current = false;
    }, 0);
  }, [selectedDeliveryDealers?.unitAddressPK]);

  /* ------------------------------------------------------------------
     Reset When Misc Delivery Disabled
  ------------------------------------------------------------------ */

  useEffect(() => {
    if (unitMiscellaneousDelivery) return;

    isResettingRef.current = true;
    lastSyncedRef.current = null;

    setSelectedDeliveryDealers(null);

    reset(
      {
        ...getValues(),
        miscDelivery: defaultValues?.miscDelivery,
      },
      { keepDefaultValues: true }
    );

    dispatch(setSelectedDeliveryDealer(null));

    setTimeout(() => {
      isResettingRef.current = false;
    }, 0);
  }, [unitMiscellaneousDelivery]);

  /* ------------------------------------------------------------------ */

  return {
    updateMiscDeliveryDealerFields,
    handleDeliveryDealerSelection,
    deliveryDealerloading,
    miscDealerModel,
    setMiscDealerModel,
  };
};

export default useMiscDelivery;
