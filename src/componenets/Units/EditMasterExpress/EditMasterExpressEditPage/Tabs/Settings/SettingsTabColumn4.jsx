import { formatForApi, parseLocalDate, toMoment } from "../../../../../../utils/dateUtils";
import React, { useState, useEffect, useRef } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DateInputField from "../../../../../common/DateInputField";
import {
  setIsSettingsTabColumn4Valid,
  setDispatchReleaseDateSettingsTab,
  setDeliverByDateSettingsTab,
  setMinimumPickupDateSettingsTab,
  setMaximumPickupDateSettingsTab,
  setMinimumDeliveryDateSettingsTab,
  setMaximumDeliveryDateSettingsTab,
  setEditedUnitDataToSaveForSettingsTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import OrderEntryService from "../../../../../../services/OrderEntryService";
import ModalComponent from "../../../../../common/ModalComponent";

// Calendar-day check of a date against its related dates; empty dates/bounds are not checked here
const isDateInRange = (date, min, max) => {
  const day = toMoment(date);
  if (!day.isValid()) return true;
  const minDay = toMoment(min);
  const maxDay = toMoment(max);
  if (minDay.isValid() && day.isBefore(minDay, "day")) return false;
  if (maxDay.isValid() && day.isAfter(maxDay, "day")) return false;
  return true;
};

const SettingsTabColumn4 = ({ styles }) => {
  const dispatch = useDispatch();

  //Local State
  const [entryDate, setEntryDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [isOrderDateValid, setIsOrderDateValid] = useState(true);
  const [plantRelease, setPlantRelease] = useState(false);
  const [plantReleaseDate, setPlantReleaseDate] = useState("");
  const [isPlantReleaseDateValid, setIsPlantReleaseDateValid] = useState(true);
  const [dispatchReleaseDate, setDispatchReleaseDate] = useState("");
  const [isDispatchReleaseDateValid, setIsDispatchReleaseDateValid] = useState(true);
  const [deliverByDate, setDeliverByDate] = useState("");
  const [isDeliverByDateValid, setIsDeliverByDateValid] = useState(true);
  const [minimumPickupDate, setMinimumPickupDate] = useState("");
  const [isMinimumPickupDateValid, setIsMinimumPickupDateValid] = useState("");
  const [maximumPickupDate, setMaximumPickupDate] = useState("");
  const [isMaximumPickupDateValid, setIsMaximumPickupDateValid] = useState("");
  const [minimumDeliveryDate, setMinimumDeliveryDate] = useState("");
  const [isMinimumDeliveryDateValid, setIsMinimumDeliveryDateValid] = useState("");
  const [maximumDeliveryDate, setMaximumDeliveryDate] = useState("");
  const [isMaximumDeliveryDateValid, setIsMaximumDeliveryDateValid] = useState("");
  const [inPickupYard, setInPickupYard] = useState(false);
  const [inPickupYardDate, setInPickupYardDate] = useState("");
  const [isInPickupYardDateValid, setIsInPickupYardDateValid] = useState(true);
  const [inDeliveryYard, setInDeliveryYard] = useState(false);
  const [inDeliveryYardDate, setInDeliveryYardDate] = useState("");
  const [isInDeliveryYardDateValid, setIsInDeliveryYardDateValid] = useState(true);
  const [delivered, setDelivered] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isDeliveryDateValid, setIsDeliveryDateValid] = useState(true);

  //Date Validation
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidDateError, setInvalidDateError] = useState("");
  const [invalidDateLabel, setInvalidDateLabel] = useState("");
  const [isLatestPickupDateDefault, setIsLatestPickupDateDefault] = useState(false);
  const [isLatestDeliveryDateDefault, setIsLatestDeliveryDateDefault] = useState(false);
  const [latestPickUpDateDefault, setLatestPickUpDateDefault] = useState("");
  const [latestDeliveryDateDefault, setLatestDeliveryDateDefault] = useState("");
  const lastCheckedLatestDeliveryRef = useRef("");
  const lastCheckedEarliestDeliveryRef = useRef("");
  const lastCheckedDeliverByRef = useRef("");

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const isUnitReload = useSelector((state) => state.editMasterExpressTabsReducer.isUnitReload);

  // Related min/max checks - re-evaluated whenever either side changes (DateInputField only checks while typing)
  // Order Date: on/after Entry Date and no future dates
  const isOrderDateInRange = isDateInRange(orderDate, entryDate, new Date());
  const isPlantReleaseDateInRange = isDateInRange(plantReleaseDate, orderDate);
  // Release Date: optional, on/after Order Date (future dates allowed)
  const isDispatchReleaseDateInRange = isDateInRange(dispatchReleaseDate, orderDate);
  const isDeliverByDateInRange = isDateInRange(deliverByDate, dispatchReleaseDate);
  const isMinimumPickupDateInRange = isDateInRange(
    minimumPickupDate,
    "",
    minimumDeliveryDate || maximumPickupDate
  );
  const isMaximumPickupDateInRange = isDateInRange(maximumPickupDate, minimumPickupDate, maximumDeliveryDate);
  const isMinimumDeliveryDateInRange = isDateInRange(
    minimumDeliveryDate,
    minimumPickupDate,
    maximumDeliveryDate
  );
  const isMaximumDeliveryDateInRange = isDateInRange(
    maximumDeliveryDate,
    minimumDeliveryDate || maximumPickupDate
  );
  const isInPickupYardDateInRange = isDateInRange(inPickupYardDate, dispatchReleaseDate);
  const isDeliveryDateInRange = isDateInRange(deliveryDate, minimumPickupDate);

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData) {
      setEntryDate(formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.entryDate) || "");
      setOrderDate(formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.orderDate) || "");
      setPlantRelease(selectedUnitData?.editMasterExpressSettingsTabDTO?.plantRelease || false);
      setPlantReleaseDate(
        selectedUnitData?.editMasterExpressSettingsTabDTO?.plantRelease
          ? formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.plantReleaseDate)
          : ""
      );
      setDispatchReleaseDate(
        formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.dispatchReleaseDate) || ""
      );
      setDeliverByDate(
        formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverByDate) || ""
      );
      setMinimumPickupDate(
        formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.minimumPickupDate) || ""
      );
      setMaximumPickupDate(
        formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.maximumPickupDate) || ""
      );
      setMinimumDeliveryDate(
        formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.minimumDeliveryDate) || ""
      );
      setMaximumDeliveryDate(
        formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.maximumDeliveryDate) || ""
      );
      setInPickupYard(selectedUnitData?.editMasterExpressSettingsTabDTO?.inPickupYard || false);
      setInPickupYardDate(
        formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.inPickupYardDate) || ""
      );
      setInDeliveryYard(selectedUnitData?.editMasterExpressSettingsTabDTO?.inDeliveryYard || false);
      setInDeliveryYardDate(
        formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.inDeliveryYardDate) || ""
      );
      setDelivered(selectedUnitData?.editMasterExpressSettingsTabDTO?.delivered || false);
      setDeliveryDate(
        formatDatetimeToDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDate) || ""
      );
      // No pending edit for the Dispatches > Dates tab on a freshly loaded unit
      dispatch(setDispatchReleaseDateSettingsTab(null));
      dispatch(setDeliverByDateSettingsTab(null));
    }
  }, [selectedUnitData]);

  // User edits of Release / Deliver By Date are mirrored to the Dispatches > Dates tab via redux.
  // Only edits are pushed (not the loaded values), so the Dates tab keeps its own data until the user changes these.
  const handleDispatchReleaseDateChange = (value) => {
    setDispatchReleaseDate(value);
    dispatch(setDispatchReleaseDateSettingsTab(value));
  };

  const handleDeliverByDateChange = (value) => {
    setDeliverByDate(value);
    dispatch(setDeliverByDateSettingsTab(value));
  };

  useEffect(() => {
    if (isUnitReload && !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant) {
      setDispatchReleaseDate("");
      setDeliverByDate("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnitReload]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForSettingsTab({
        orderDate: orderDate,
        plantRelease: plantRelease,
        plantReleaseDate: plantReleaseDate,
        dispatchReleaseDate: dispatchReleaseDate,
        deliverByDate: deliverByDate,
        minimumPickupDate: minimumPickupDate,
        maximumPickupDate: maximumPickupDate,
        minimumDeliveryDate: minimumDeliveryDate,
        maximumDeliveryDate: maximumDeliveryDate,
        inPickupYard: inPickupYard,
        inPickupYardDate: inPickupYardDate,
        inDeliveryYard: inDeliveryYard,
        inDeliveryYardDate: inDeliveryYardDate,
        delivered: delivered,
        deliveryDate: deliveryDate,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderDate,
    plantRelease,
    plantReleaseDate,
    dispatchReleaseDate,
    deliverByDate,
    minimumPickupDate,
    maximumPickupDate,
    minimumDeliveryDate,
    maximumDeliveryDate,
    inPickupYard,
    inPickupYardDate,
    inDeliveryYard,
    inDeliveryYardDate,
    delivered,
    deliveryDate,
  ]);

  //Date Validation
  const handleInvalidDateClose = () => {
    switch (invalidDateLabel) {
      case "earliestPickUpDate":
        setMinimumPickupDate("");
        break;
      case "latestPickUpDate":
        setMaximumPickupDate("");
        break;
      case "latestDeliveryDate":
        setMaximumDeliveryDate("");
        break;
      case "earliestDeliveryDate":
        setMinimumDeliveryDate("");
        break;

      case "deliveryByDate":
        handleDeliverByDateChange("");
        break;

      default:
        break;
    }
    setInvalidDate(false);
  };

  useEffect(() => {
    if (
      deliverByDate !== "" &&
      (selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK !== null ||
        (selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousDelivery &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousDeliveryDealerPK !== null) ||
        (selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverToPlant &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryCustomerPlantPK !== null &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryYardPK == null))
    ) {
      // Same guard as Latest Delivery Date - skip a date already checked, never re-check the API's own date
      const checkKey = formatForApi(deliverByDate);
      if (lastCheckedDeliverByRef.current === checkKey) return;
      lastCheckedDeliverByRef.current = checkKey;

      let isStale = false;
      OrderEntryService.checkDateValid({
        selectedDate: deliverByDate,
        deliveryDealerFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK,
        miscellaneousDelivery: selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousDelivery,
        selectedUnitAddress: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK,
        deliveryCustomerPlantFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryCustomerPlantPK,
        deliverToPlant: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverToPlant,
      }).then((res) => {
        if (isStale) return;
        const data = res.data;
        if (data.errorMsg) {
          lastCheckedDeliverByRef.current = "";
          if (!viewDetail) {
            setInvalidDate(true);
            setInvalidDateError(data.errorMsg);
            setInvalidDateLabel("deliveryByDate");
          }
        }
      });
      return () => {
        isStale = true;
        if (lastCheckedDeliverByRef.current === checkKey) lastCheckedDeliverByRef.current = "";
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliverByDate]);

  useEffect(() => {
    if (
      selectedUnitData?.editMasterExpressSettingsTabDTO?.reloadDays > 0 &&
      (selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupDealerPK !== null ||
        (selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousPickup &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK !== null)) &&
      !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant &&
      isUnitReload
    ) {
      if (
        selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK?.openMonday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK?.openTuesday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK?.openWednesday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK?.openThursday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK?.openFriday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK?.openSaturday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK?.openSunday
      ) {
        const defaultLatestPickupDate = new Date();
        defaultLatestPickupDate.setDate(
          defaultLatestPickupDate.getDate() + selectedUnitData?.editMasterExpressSettingsTabDTO?.reloadDays
        );
        setIsLatestPickupDateDefault(true);
        setLatestPickUpDateDefault(defaultLatestPickupDate);

        OrderEntryService.checkDefaultDateValid({
          selectedDate: formatForApi(defaultLatestPickupDate),
          pickupDealerFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupDealerPK,
          miscellaneousPickup: selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousPickup,
          selectedUnitAddress: selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK,
        }).then((res) => {
          const data = res.data;
          // setMaximumPickupDate(data.selectedPickupDate);
          setIsLatestPickupDateDefault(false);
          setLatestPickUpDateDefault(data.selectedPickupDate);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    //selectedPickupDealer,
    isUnitReload,
  ]);

  useEffect(() => {
    if (
      selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverByDays > 0 &&
      (selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK !== "" ||
        (selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousDelivery &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK !== null)) &&
      !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant &&
      isUnitReload
    ) {
      if (
        selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK?.openMonday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK?.openTuesday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK?.openWednesday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK?.openThursday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK?.openFriday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK?.openSaturday ||
        selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK?.openSunday
      ) {
        const defaultLatestDeliveryDate = new Date();
        defaultLatestDeliveryDate.setDate(
          defaultLatestDeliveryDate.getDate() +
            selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverByDays
        );
        setIsLatestDeliveryDateDefault(true);
        setLatestDeliveryDateDefault(defaultLatestDeliveryDate);

        OrderEntryService.checkDefaultDateValid({
          selectedDate: formatForApi(defaultLatestDeliveryDate),
          deliveryDealerFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK,
          miles: selectedUnitData?.editMasterExpressSettingsTabDTO?.driverMiles,
          pickupDate: maximumPickupDate,
          miscellaneousDelivery: selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousDelivery,
          selectedUnitAddress: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK,
        }).then((res) => {
          const data = res.data;
          // setMaximumDeliveryDate(data.selectedDeliveryDate);
          setIsLatestDeliveryDateDefault(false);
          setLatestDeliveryDateDefault(data.selectedDeliveryDate);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    //selectedDeliveryDealer,
    //driverMiles,
    isUnitReload,
  ]);

  useEffect(() => {
    if (
      selectedUnitData?.editMasterExpressSettingsTabDTO?.reloadDays > 0 &&
      selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupDealerPK !== null &&
      !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant &&
      isUnitReload
    ) {
      const defaultLatestPickupDate = new Date();
      defaultLatestPickupDate.setDate(
        defaultLatestPickupDate.getDate() + selectedUnitData?.editMasterExpressSettingsTabDTO?.reloadDays
      );
      setIsLatestPickupDateDefault(true);
      setLatestPickUpDateDefault(defaultLatestPickupDate);

      OrderEntryService.checkDefaultDateValid({
        selectedDate: formatForApi(defaultLatestPickupDate),
        pickupDealerFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupDealerPK,
      }).then((res) => {
        const data = res.data;
        // setMaximumPickupDate(data.selectedPickupDate);
        setIsLatestPickupDateDefault(false);
        setLatestPickUpDateDefault(data.selectedPickupDate);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    //pickupDealerFK,
    isUnitReload,
  ]);

  useEffect(() => {
    if (
      selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverByDays > 0 &&
      selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK !== null &&
      !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant &&
      isUnitReload
    ) {
      const defaultLatestDeliveryDate = new Date();
      defaultLatestDeliveryDate.setDate(
        defaultLatestDeliveryDate.getDate() + selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverByDays
      );
      setIsLatestDeliveryDateDefault(true);
      setLatestDeliveryDateDefault(defaultLatestDeliveryDate);

      OrderEntryService.checkDefaultDateValid({
        selectedDate: formatForApi(defaultLatestDeliveryDate),
        deliveryDealerFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK,
        miles: selectedUnitData?.editMasterExpressSettingsTabDTO?.driverMiles,
        pickupDate: maximumPickupDate,
      }).then((res) => {
        const data = res.data;
        // setMaximumDeliveryDate(data.selectedDeliveryDate);
        setIsLatestDeliveryDateDefault(false);
        setLatestDeliveryDateDefault(data.selectedDeliveryDate);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    //deliveryDealerFK,
    //driverMiles,
    isUnitReload,
  ]);

  useEffect(() => {
    if (
      maximumPickupDate !== "" &&
      (selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupDealerPK !== null ||
        (selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousPickup &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK !== null)) &&
      !isLatestPickupDateDefault
    ) {
      OrderEntryService.checkDateValid({
        selectedDate: maximumPickupDate,
        pickupDealerFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupDealerPK,
        miscellaneousPickup: selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousPickup,
        selectedUnitAddress: selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK,
      }).then((res) => {
        const data = res.data;

        if (data.errorMsg) {
          if (!viewDetail) {
            setInvalidDate(true);
            setInvalidDateError(data.errorMsg);
            setInvalidDateLabel("latestPickUpDate");
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximumPickupDate]);

  useEffect(() => {
    if (
      minimumPickupDate !== "" &&
      (selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupDealerPK !== null ||
        (selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousPickup &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK !== null))
    ) {
      OrderEntryService.checkDateValid({
        selectedDate: minimumPickupDate,
        pickupDealerFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupDealerPK,
        miscellaneousPickup: selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousPickup,
        selectedUnitAddress: selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupUnitAddressFK,
      }).then((res) => {
        const data = res.data;

        if (data.errorMsg) {
          if (!viewDetail) {
            setInvalidDate(true);
            setInvalidDateError(data.errorMsg);
            setInvalidDateLabel("earliestPickUpDate");
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minimumPickupDate]);

  useEffect(() => {
    if (
      maximumDeliveryDate !== "" &&
      (selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK !== "" ||
        (selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousDelivery &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK !== null) ||
        (selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverToPlant &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryCustomerPlantPK !== null)) &&
      !isLatestDeliveryDateDefault
    ) {
      // Skip a date / pickup date pair already checked - the API's own corrected date is not re-checked,
      // otherwise a reformatted or shifted response re-triggers this effect endlessly
      const checkKey = `${formatForApi(maximumDeliveryDate)}|${formatForApi(maximumPickupDate)}`;
      if (lastCheckedLatestDeliveryRef.current === checkKey) return;
      lastCheckedLatestDeliveryRef.current = checkKey;

      let isStale = false;
      OrderEntryService.checkDateValid({
        selectedDate: maximumDeliveryDate,
        deliveryDealerFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK,
        miles: selectedUnitData?.editMasterExpressSettingsTabDTO?.driverMiles,
        pickupDate: maximumPickupDate,
        miscellaneousDelivery: selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousDelivery,
        selectedUnitAddress: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK,
        deliveryCustomerPlantFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryCustomerPlantPK,
        deliverToPlant: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverToPlant,
      }).then((res) => {
        // the date changed while this request was pending - a newer check owns the result
        if (isStale) return;
        const data = res.data;
        if (data.errorMsg) {
          // allow the same pair to be checked again once the user picks it again
          lastCheckedLatestDeliveryRef.current = "";
          if (!viewDetail) {
            setInvalidDate(true);
            setInvalidDateError(data.errorMsg);
            setInvalidDateLabel("latestDeliveryDate");
          }
        }
      });
      return () => {
        isStale = true;
        // the cancelled check never finished, so the next run must not skip it
        if (lastCheckedLatestDeliveryRef.current === checkKey) lastCheckedLatestDeliveryRef.current = "";
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    maximumDeliveryDate,
    maximumPickupDate,
    //driverMiles
  ]);

  useEffect(() => {
    if (
      minimumDeliveryDate !== "" &&
      (selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK !== null ||
        (selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousDelivery &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK !== null &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.deliverToPlant &&
          selectedUnitData?.deliverToPlant?.editMasterExpressSettingsTabDTO?.deliveryCustomerPlantPK !==
            null))
    ) {
      // Same guard as Latest Delivery Date - skip a pair already checked, never re-check the API's own date
      const checkKey = `${formatForApi(minimumDeliveryDate)}|${formatForApi(minimumPickupDate)}`;
      if (lastCheckedEarliestDeliveryRef.current === checkKey) return;
      lastCheckedEarliestDeliveryRef.current = checkKey;

      let isStale = false;
      OrderEntryService.checkDateValid({
        selectedDate: minimumDeliveryDate,
        deliveryDealerFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerPK,
        miles: selectedUnitData?.editMasterExpressSettingsTabDTO?.driverMiles,
        pickupDate: minimumPickupDate,
        miscellaneousDelivery: selectedUnitData?.editMasterExpressSettingsTabDTO?.miscellaneousDelivery,
        selectedUnitAddress: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryUnitAddressFK,
        deliveryCustomerPlantFK: selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryCustomerPlantPK,
        deliverToPlant: selectedUnitData?.deliveryCustomerPlantPK?.deliverToPlant,
      }).then((res) => {
        if (isStale) return;
        const data = res.data;
        if (data.errorMsg) {
          lastCheckedEarliestDeliveryRef.current = "";
          if (!viewDetail) {
            setInvalidDate(true);
            setInvalidDateError(data.errorMsg);
            setInvalidDateLabel("earliestDeliveryDate");
          }
        }
      });
      return () => {
        isStale = true;
        if (lastCheckedEarliestDeliveryRef.current === checkKey) lastCheckedEarliestDeliveryRef.current = "";
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    minimumDeliveryDate,
    minimumPickupDate,
    //driverMiles
  ]);

  // Tab Validation
  useEffect(() => {
    if (
      isOrderDateValid &&
      isOrderDateInRange &&
      orderDate !== "" &&
      (!plantRelease ||
        (plantRelease && plantReleaseDate !== "" && isPlantReleaseDateValid && isPlantReleaseDateInRange)) &&
      isDispatchReleaseDateValid &&
      isDispatchReleaseDateInRange &&
      isDeliverByDateValid &&
      isDeliverByDateInRange &&
      (!isUnitReload ||
        (isUnitReload && selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant) ||
        (isUnitReload && isMinimumPickupDateValid && isMinimumPickupDateInRange)) &&
      (!isUnitReload ||
        (isUnitReload && selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant) ||
        (isUnitReload && isMaximumPickupDateValid && isMaximumPickupDateInRange)) &&
      (!isUnitReload ||
        (isUnitReload && selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant) ||
        (isUnitReload && isMinimumDeliveryDateValid && isMinimumDeliveryDateInRange)) &&
      (!isUnitReload ||
        (isUnitReload && selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant) ||
        (isUnitReload && isMaximumDeliveryDateValid && isMaximumDeliveryDateInRange)) &&
      (!inPickupYard ||
        (inPickupYard && inPickupYardDate !== "" && isInPickupYardDateValid && isInPickupYardDateInRange)) &&
      (!inDeliveryYard || (inDeliveryYard && inDeliveryYardDate !== "" && isInDeliveryYardDateValid)) &&
      (!delivered || (delivered && deliveryDate !== "" && isDeliveryDateValid && isDeliveryDateInRange))
    ) {
      dispatch(setIsSettingsTabColumn4Valid(true));
    } else {
      dispatch(setIsSettingsTabColumn4Valid(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedUnitData,
    isUnitReload,
    orderDate,
    isOrderDateValid,
    plantRelease,
    plantReleaseDate,
    isPlantReleaseDateValid,
    isDispatchReleaseDateValid,
    isDeliverByDateValid,
    isMinimumPickupDateValid,
    isMaximumPickupDateValid,
    isMinimumDeliveryDateValid,
    isMaximumDeliveryDateValid,
    inPickupYard,
    inPickupYardDate,
    isInPickupYardDateValid,
    inDeliveryYard,
    inDeliveryYardDate,
    isInDeliveryYardDateValid,
    delivered,
    deliveryDate,
    isDeliveryDateValid,
    isOrderDateInRange,
    isPlantReleaseDateInRange,
    isDispatchReleaseDateInRange,
    isDeliverByDateInRange,
    isMinimumPickupDateInRange,
    isMaximumPickupDateInRange,
    isMinimumDeliveryDateInRange,
    isMaximumDeliveryDateInRange,
    isInPickupYardDateInRange,
    isDeliveryDateInRange,
  ]);

  useEffect(() => {
    dispatch(setMinimumPickupDateSettingsTab(minimumPickupDate));
    dispatch(setMaximumPickupDateSettingsTab(maximumPickupDate));
    dispatch(setMinimumDeliveryDateSettingsTab(minimumDeliveryDate));
    dispatch(setMaximumDeliveryDateSettingsTab(maximumDeliveryDate));
  }, [minimumPickupDate, maximumPickupDate, minimumDeliveryDate, maximumDeliveryDate]);

  return (
    <Col xs={3}>
      {/* ********************* */}
      {/* Entry Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Entry Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField date={entryDate} disabled />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Order Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Order Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={orderDate}
            setDate={setOrderDate}
            disabled={viewDetail}
            min={entryDate ? parseLocalDate(entryDate) : undefined}
            max={new Date()}
            setIsDateValid={setIsOrderDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail
                ? ""
                : isOrderDateValid && isOrderDateInRange && orderDate !== ""
                  ? "borderGreen"
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Plat Release */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Plant Release</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || selectedUnitData?.editMasterExpressSettingsTabDTO?.plantRelease}
            value={plantRelease || false}
            checked={plantRelease || false}
            onChange={(e) => {
              setPlantRelease(e.target.checked);
              if (!e.target.checked) {
                setPlantReleaseDate("");
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Plant Release Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${plantRelease ? "" : "hide-elements"}`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Plant Release Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={plantReleaseDate}
            setDate={setPlantReleaseDate}
            disabled={viewDetail}
            min={orderDate ? parseLocalDate(orderDate) : new Date()}
            setIsDateValid={setIsPlantReleaseDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail
                ? ""
                : isPlantReleaseDateValid && isPlantReleaseDateInRange && plantReleaseDate !== ""
                  ? "borderGreen"
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Release Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          !isUnitReload || (isUnitReload && selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant)
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Release Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={dispatchReleaseDate}
            setDate={handleDispatchReleaseDateChange}
            disabled={viewDetail}
            min={orderDate ? parseLocalDate(orderDate) : undefined}
            setIsDateValid={setIsDispatchReleaseDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail
                ? ""
                : isDispatchReleaseDateValid && isDispatchReleaseDateInRange
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Deliver By Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0  ${
          !isUnitReload || (isUnitReload && selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant)
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Deliver By Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={deliverByDate}
            setDate={handleDeliverByDateChange}
            disabled={viewDetail}
            min={dispatchReleaseDate ? parseLocalDate(dispatchReleaseDate) : new Date()}
            setIsDateValid={setIsDeliverByDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail
                ? ""
                : isDeliverByDateValid && isDeliverByDateInRange
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Earliest Pickup Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          isUnitReload && !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Earliest Pickup Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={minimumPickupDate}
            setDate={setMinimumPickupDate}
            disabled={viewDetail}
            min={entryDate ? parseLocalDate(entryDate) : undefined}
            max={new Date()}
            setIsDateValid={setIsMinimumPickupDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail
                ? ""
                : isMinimumPickupDateValid && isMinimumPickupDateInRange
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Latest Pickup Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          isUnitReload && !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Latest Pickup Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={maximumPickupDate}
            setDate={setMaximumPickupDate}
            disabled={viewDetail}
            min={minimumPickupDate ? parseLocalDate(minimumPickupDate) : new Date()}
            max={maximumDeliveryDate && parseLocalDate(maximumDeliveryDate)}
            setIsDateValid={setIsMaximumPickupDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail
                ? ""
                : isMaximumPickupDateValid && isMaximumPickupDateInRange
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Earliest Delivery Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          isUnitReload && !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Earliest Delivery Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={minimumDeliveryDate}
            setDate={setMinimumDeliveryDate}
            disabled={viewDetail}
            min={minimumPickupDate ? parseLocalDate(minimumPickupDate) : new Date()}
            max={maximumDeliveryDate && parseLocalDate(maximumDeliveryDate)}
            setIsDateValid={setIsMinimumDeliveryDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail
                ? ""
                : isMinimumDeliveryDateValid && isMinimumDeliveryDateInRange
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Latest Delivery Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          isUnitReload && !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            Latest Delivery Date
          </Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={maximumDeliveryDate}
            setDate={setMaximumDeliveryDate}
            disabled={viewDetail}
            min={
              minimumDeliveryDate
                ? parseLocalDate(minimumDeliveryDate)
                : maximumPickupDate
                  ? parseLocalDate(maximumPickupDate)
                  : new Date()
            }
            setIsDateValid={setIsMaximumDeliveryDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail
                ? ""
                : isMaximumDeliveryDateValid && isMaximumDeliveryDateInRange
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* In Pickup Yard */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>In Pickup Yard</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || inDeliveryYard || delivered}
            value={inPickupYard || false}
            checked={inPickupYard || false}
            onChange={(e) => {
              setInPickupYard(e.target.checked);
              if (!e.target.checked) {
                setInPickupYardDate("");
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* In Pick Yard Date */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>In Pickup Yard Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={inPickupYardDate}
            setDate={setInPickupYardDate}
            disabled={
              viewDetail ||
              (inDeliveryYard && inPickupYardDate !== "") ||
              (delivered && inPickupYardDate !== "") ||
              !inPickupYard
            }
            min={dispatchReleaseDate ? parseLocalDate(dispatchReleaseDate) : new Date()}
            setIsDateValid={setIsInPickupYardDateValid}
            className={`customFormControl ${
              isUnitDataLoading ||
              viewDetail ||
              !inPickupYard ||
              (inDeliveryYard && inPickupYardDate !== "") ||
              (delivered && deliveryDate !== "")
                ? ""
                : inPickupYardDate !== "" && isInPickupYardDateValid && isInPickupYardDateInRange
                  ? "borderGreen"
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* In Delivery Yard */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>In Delivery Yard</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={inDeliveryYard || false}
            checked={inDeliveryYard || false}
            onChange={(e) => {
              setInDeliveryYard(e.target.checked);
              if (!e.target.checked) {
                setInDeliveryYardDate("");
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* In Delivery Yard Date */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>In Delivery Yard Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={inDeliveryYardDate}
            setDate={setInDeliveryYardDate}
            disabled={viewDetail || !inDeliveryYard}
            min={new Date()}
            setIsDateValid={setIsInDeliveryYardDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail || !inDeliveryYard
                ? ""
                : inDeliveryYard && isInDeliveryYardDateValid && inDeliveryYardDate !== ""
                  ? "borderGreen"
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivered */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Delivered</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={delivered || false}
            checked={delivered || false}
            onChange={(e) => {
              setDelivered(e.target.checked);
              if (!e.target.checked) {
                setDeliveryDate("");
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Delivery Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={deliveryDate}
            setDate={setDeliveryDate}
            disabled={viewDetail || !delivered}
            min={minimumPickupDate ? parseLocalDate(minimumPickupDate) : new Date()}
            setIsDateValid={setIsDeliveryDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail || !delivered
                ? ""
                : delivered && isDeliveryDateValid && isDeliveryDateInRange && deliveryDate !== ""
                  ? "borderGreen"
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Date Validation Error Modal */}
      <ModalComponent
        show={invalidDate}
        onHide={() => {
          handleInvalidDateClose();
        }}
        title={"Warning! Invalid Date!"}
        showError={true}
        body={invalidDateError}
        closeButton
        handleClose={handleInvalidDateClose}
      />
    </Col>
  );
};

export default SettingsTabColumn4;
