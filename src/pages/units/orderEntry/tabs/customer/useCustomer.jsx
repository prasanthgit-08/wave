import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import { useFormContext, useWatch } from "react-hook-form";
import useDebouncer from "../../../../../hooks/useDebouncer";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setBatchLoadCount,
  setCustomerRateStructure,
  setDriverAmount,
  setDriverRateObj,
  setDriverRateStructure,
  setInvoiceAmount,
  setInvoiceRateObj,
  setInvoiceRateStructure,
  setOrderEntrySchemaConditions,
  setSelectedCustomer,
  setSelectedCustomerPickupPlant,
  setSelectedDeliveryPlant,
  setSelectedPickupYard,
  setSelectedPlant,
} from "../../../../../store/slices/unit.slice";
import { useQuery } from "@tanstack/react-query";
import CustomerPlantServices from "../../../../../service/customerPlant/customerPlant.service";
import { resetTabsDatas } from "../../schemas";

const useCustomer = () => {
  const [customerPlantList, setCustomerPlantList] = useState([]);
  const [cutomerPlantLoading, setCutomerPlantLoading] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const prevSelection = useRef({ plantSelection: null, customerSelection: null });
  const dispatch = useDispatch();
  // react hooks form methods
  const {
    reset,
    watch,
    setValue,
    trigger,
    getValues,
    getFieldState,
    formState: { errors },
  } = useFormContext();

  const customer = useWatch({ name: "customer" });
  // debounced search text drives the customer query key, so each search/page fetches only once
  const [debouncedSearch, setDebouncedSearch] = useState(
    customer.customerDataId ? "" : customer.customerDataName || ""
  );
  const typing = !customer.customerDataId && (customer.customerDataName || "") !== debouncedSearch;

  // const orderEntrySchemaConditions = useSelector((state) => state.unit.orderEntrySchemaConditions);
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const selectedPlant = useSelector((state) => state.unit.selectedPlant);
  const selectedDeliveryPlant = useSelector((state) => state.unit.selectedDeliveryPlant);
  const customerDealerList = useSelector((state) => state.unit.customerDealerList);
  const selectedCustomerPickupPlant = useSelector((state) => state.unit.selectedCustomerPickupPlant);

  const buildValidationConditions = () => ({
    ...getValues("customer"),
    ...selectedCustomer,
    selectedDeliveryPlant,
    selectedCustomerPickupPlant,
  });

  const debouncedCustomerUpdate = useCallback(
    (datas) => {
      dispatch(
        setOrderEntrySchemaConditions({
          customer: datas,
        })
      );
    },
    [dispatch, selectedCustomerPickupPlant]
  );

  // updating validation needed conditions and using trigger to validate
  const debounceUpdate = useDebouncer(debouncedCustomerUpdate, 150);

  // updating react hooks form values
  const updateCustomerFields = (fields) => {
    Object.entries(fields).forEach(([key, value]) =>
      setValue(`customer.${key}`, value, { shouldValidate: false, shouldDirty: true })
    );

    // debounceUpdate();
    debounceUpdate(buildValidationConditions());
  };

  const handleCustomerDataSelection = (item) => {
    if (
      customer.customerDataId &&
      prevSelection.current?.customerSelection &&
      prevSelection.current?.customerSelection === item.customerPK
    )
      return;
    if (customer.customerDataId) {
      resetTabsDatas(reset);
    }
    dispatch(setInvoiceRateStructure(null));
    dispatch(setDriverRateStructure(null));
    dispatch(setCustomerRateStructure(null));
    dispatch(
      setOrderEntrySchemaConditions({
        invoiceFlatRateRequired: true,
        driverFlatRateRequired: true,
      })
    );
    dispatch(setInvoiceAmount(0));
    dispatch(setDriverAmount(0));
    dispatch(setInvoiceRateObj(null));
    dispatch(setDriverRateObj(null));

    prevSelection.current.customerSelection = item.customerPK;

    dispatch(setSelectedCustomer(item));
    dispatch(setSelectedPlant(null));

    updateCustomerFields({
      customerDataId: item.customerPK,
      customerDataName: item.name?.trim(),
      bulkUnit: item?.bulkInvoices === "Y" ? true : false,
      creditCardPrepaid: item?.creditCardPayments === "Y" ? true : false,
      openBalancePrepaid: item?.openBalancePayments === "Y" ? true : false,
    });

    //update unit schema
    setValue(
      "unit.invoiceELDFee",
      selectedCustomer?.invoiceELDAmount > 0 ? selectedCustomer.invoiceELDAmount : 0
    );
    setValue(
      "unit.driverELDFee",
      selectedCustomer?.invoiceELDAmount > 0 ? selectedCustomer.invoiceELDAmount : 0
    );
  };

  // billing plant selection
  const handleCustomerPlantSelection = (item) => {
    if (
      customer.customerPlantId &&
      prevSelection.current?.plantSelection &&
      prevSelection.current?.plantSelection === item.customerPlantPK
    )
      return;
    prevSelection.current.plantSelection = item.customerPlantPK;

    updateCustomerFields({
      customerPlantId: item.customerPlantPK,
      customerPlantName: item.name?.trim(),
      pickupCustomerPlantName: item.name?.trim(),
      pickupCustomerPlantFK: item.customerPlantPK,
      deliveryCustomerPlantFK: item.customerPlantPK,
      deliveryCustomerPlantName: item.name?.trim(),
      plantCode: item?.plantNumber?.trim(),
      shuttleToYard: !!item.yardFK,
      shuttleFromYard: false,
      deliverToPlant: false,
    });
    dispatch(setSelectedCustomerPickupPlant(item));
    dispatch(setSelectedDeliveryPlant(item));
    dispatch(setSelectedPlant(item));
    updateCustomerFields({
      pickupYardName: "",
      pickupYardFK: null,
      pickupShuttleCityFK: null,
      pickupShuttleCityName: "",
      deliveryYardName: "",
      deliveryYardFK: null,
      deliveryShuttleCityFK: null,
      deliveryShuttleCityName: "",
    });

    CustomerPlantServices.fetchPlantById(item.customerPlantPK).then((res) => {
      if (res.data) {
        dispatch(setSelectedPlant(res.data));
        dispatch(setSelectedCustomerPickupPlant(res.data));
        dispatch(setSelectedDeliveryPlant(res.data));
        debounceUpdate({ ...buildValidationConditions(), selectedCustomerPickupPlant: res.data });
      }
    });

    if (item.yardFK) {
      fetchYardById(item.yardFK).then((res) => {
        updateCustomerFields({
          pickupYardName: res?.data?.description?.trim() || "",
          pickupYardFK: res?.data?.yardPK || null,
          deliveryYardName: res?.data?.description?.trim() || "",
          deliveryYardFK: res?.data?.yardPK || null,
          hasprinter: res?.data?.hasPrinters || false,
          bolPrinterFk: res?.data?.bolPrinterFK || null,
          printBOL: res?.data?.hasPrinters === true && res?.data?.bolPrinterFK ? true : false,
        });
      });
    }

    if (item.shuttleCityFK) {
      fetchCityById(item.shuttleCityFK).then((res) => {
        updateCustomerFields({
          pickupShuttleCityFK: res?.data?.shuttleCityPK || null,
          pickupShuttleCityName: res?.data?.city || "",
          deliveryShuttleCityFK: res?.data?.shuttleCityPK || null,
          deliveryShuttleCityName: res?.data?.city || "",
        });
      });
    }
  };

  // plant selection
  const handlePickupCustomerPlantSelection = (item) => {
    updateCustomerFields({
      pickupCustomerPlantFK: item.customerPlantPK,
      pickupCustomerPlantName: item.name?.trim(),
      pickupYardName: "",
      shuttleToYard: Boolean(item?.yardFK || item?.shuttleCityFK),
      pickupYardFK: null,
      pickupShuttleCityFK: null,
      pickupShuttleCityName: "",
      plantCode: item?.plantNumber?.trim(),
    });
    dispatch(setSelectedCustomerPickupPlant(item));
    updateCustomerFields({
      pickupCustomerPlantFK: item.customerPlantPK,
      pickupCustomerPlantName: item.name?.trim(),
      pickupYardName: "",
      pickupYardFK: null,
      pickupShuttleCityFK: null,
      pickupShuttleCityName: "",
      plantCode: item?.plantNumber?.trim(),
    });

    CustomerPlantServices.fetchPlantById(item.customerPlantPK).then((res) => {
      if (res.data) {
        dispatch(setSelectedCustomerPickupPlant(res.data));
        debounceUpdate({ ...buildValidationConditions(), selectedCustomerPickupPlant: res.data });
      }
    });

    if (item.yardFK) {
      fetchYardById(item.yardFK).then((res) => {
        updateCustomerFields({
          pickupYardName: res?.data?.description?.trim() || "",
          pickupYardFK: res?.data?.yardPK || 0,
          printBOL: customer.shuttleToYard && res?.data?.hasPrinters > 0 && res?.data?.bolPrinterFK > 0,
          hasprinter: res?.data?.hasPrinters || false,
          bolPrinterFk: res?.data?.bolPrinterFK || 0,
        });
      });
    }

    if (item.shuttleCityFK) {
      fetchCityById(item.shuttleCityFK).then((res) => {
        updateCustomerFields({
          pickupShuttleCityFK: res?.data?.shuttleCityPK || 0,
          pickupShuttleCityName: res?.data?.city || "",
        });
      });
    }
  };

  const handlePickupCustmrYardSelection = (item) => {
    dispatch(setSelectedPickupYard(item));
    updateCustomerFields({
      pickupYardFK: item.yardPK,
      pickupYardName: item.description,
      printBOL: customer.shuttleToYard ? item?.hasPrinters && item?.bolPrinterFK != null : false,
      hasprinter: item?.hasPrinters || false,
      bolPrinterFk: item?.bolPrinterFK || 0,
    });
  };

  const handleShuttleCitySelection = (item) => {
    updateCustomerFields({
      pickupShuttleCityFK: item.shuttleCityPK,
      pickupShuttleCityName: item.city,
    });
  };
  const handleDeliveryShuttleCitySelection = (item) => {
    updateCustomerFields({
      deliveryShuttleCityFK: item.shuttleCityPK,
      deliveryShuttleCityName: item.city,
    });
  };

  const handleDeliveryPlantSelection = (item) => {
    dispatch(setSelectedDeliveryPlant(item));
    updateCustomerFields({
      deliveryCustomerPlantFK: item.customerPlantPK || 0,
      deliveryCustomerPlantName: item.name?.trim() || "",
      shuttleFromYard: Boolean(item?.yardFK || item?.selectYard),
      deliveryYardName: "",
      deliveryYardFK: null,
      deliveryShuttleCityFK: null,
      deliveryShuttleCityName: "",
    });

    CustomerPlantServices.fetchPlantById(item.customerPlantPK).then((res) => {
      if (res.data) {
        dispatch(setSelectedDeliveryPlant(res.data));
        debounceUpdate({ ...buildValidationConditions(), selectedDeliveryPlant: res.data });
      }
    });

    if (item.yardFK) {
      fetchYardById(item.yardFK).then((res) => {
        updateCustomerFields({
          deliveryYardName: res?.data?.description?.trim() || "",
          deliveryYardFK: res?.data?.yardPK || 0,
        });
      });
    }
    if (item.shuttleCityFK) {
      fetchCityById(item.shuttleCityFK).then((res) => {
        updateCustomerFields({
          deliveryShuttleCityFK: res?.data?.shuttleCityPK || 0,
          deliveryShuttleCityName: res?.data?.city || "",
        });
      });
    }
  };

  const handleDeliveryYardSelection = (item) => {
    updateCustomerFields({
      deliveryYardFK: item.yardPK,
      deliveryYardName: item.description,
    });
  };

  const handleBulkInvoiceSelection = (item) => {
    updateCustomerFields({
      bulkInvoiceFK: item.bulkInvoicePK,
      bulkInvoiceName: item.description,
    });
    setValue("unit.projectCode", item.projectCode);
    setValue("unit.poNumber", item.poNumber);
  };

  const { data, isFetching } = useQuery({
    queryKey: ["customerData", debouncedSearch, pageNumber],
    queryFn: () =>
      OrderEntryServices.getCustomerData({
        searchText: debouncedSearch,
        pageNumber,
        pageSize: 15,
      }),
  });

  const getPlantDataByName = async ({ text, billingPlant }) => {
    if (customer.customerDataId) {
      setCutomerPlantLoading(true);
      try {
        const res = await OrderEntryServices.getPlantDetails({
          customerFK: customer.customerDataId,
          isDPUCustomer: selectedCustomer.dpuCustomer,
          searchTerms: text,
          billingPlant: billingPlant,
        });
        setCustomerPlantList(res.data.content);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setCutomerPlantLoading(false);
      }
    }
  };

  const fetchYardById = async (id) => {
    try {
      const res = await OrderEntryServices.getYardById(id);
      return res;
    } catch (error) {}
  };

  const fetchCityDetails = async (data) => {
    try {
      const { lookup, searchTerms, ...rest } = data;
      let payload = {
        customerFK: customer.customerDataId,
        customerPlantPK: customer.customerPlantId,
        outbound: selectedCustomerPickupPlant?.outbound,
        reload: !selectedCustomerPickupPlant?.outbound,
      };
      if (lookup) {
        payload = { ...rest, searchTerm: searchTerms, ...payload };
      } else {
        payload.searchTerm = data;
        payload.isOEPP = "Autocomplete";
      }
      const res = await OrderEntryServices.getShuttleCityDetails(payload);

      return res;
    } catch (error) {}
  };

  const validateBatchSequence = (first, last) => {
    const errors = [];

    // Allow only letters and numbers, max 5 chars
    const pattern = /^[A-Za-z0-9]{1,5}$/;

    if (!pattern.test(first)) {
      errors.push(
        "First Batch Sequence must be 1 to 5 characters long and contain only letters and numbers."
      );
    }

    if (!pattern.test(last)) {
      errors.push("Last Batch Sequence must be 1 to 5 characters long and contain only letters and numbers.");
    }

    // Stop further checks if base pattern already invalid
    if (errors.length > 0) {
      return {
        isValid: false,
        errors,
      };
    }

    // Length must match
    if (first.length !== last.length) {
      errors.push("First and Last Batch Sequence must have the same length.");
    }

    // Each field must contain at least one number in any position
    if (!/\d/.test(first)) {
      errors.push("First Batch Sequence must contain at least one number.");
    }

    if (!/\d/.test(last)) {
      errors.push("Last Batch Sequence must contain at least one number.");
    }

    // Pattern of letters and numbers must match position by position
    const minLength = Math.min(first.length, last.length);

    for (let i = 0; i < minLength; i++) {
      const fChar = first[i];
      const lChar = last[i];
      const isFirstLetter = /[A-Za-z]/.test(fChar);
      const isSecondLetter = /[A-Za-z]/.test(lChar);

      // If one is a letter and the other is a number, it's invalid
      if (isFirstLetter !== isSecondLetter) {
        errors.push(
          `Character type mismatch at position ${i + 1}. Both fields must have either a letter or a number at this position.`
        );
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const checkSequenceString = (value) => {
    const word = value?.trim();
    if (Number(word) <= 0) {
      return false;
    }
    const first = word[0];
    const second = word[word.length - 1];
    const isLetter = (char) => /^[A-Za-z]$/.test(char);
    const isNumber = (char) => /^[0-9]$/.test(char);

    if (isNumber(first) && isLetter(second)) {
      toast.error("Batch sequence cannot start with a number and end with a letter.");
      return false;
    }

    if (isLetter(first) && isLetter(second)) {
      toast.error("Batch sequence cannot start and end with a letter.");
      return false;
    }

    return true;
  };

  /**
   * used for Batchload sequence validation
   */
  const handleCheckBatchLoadValues = (firstBatchSequence, lastBatchSequence) => {
    if (firstBatchSequence && lastBatchSequence && firstBatchSequence.length === lastBatchSequence.length) {
      if (!checkSequenceString(firstBatchSequence) || !checkSequenceString(lastBatchSequence)) {
        updateCustomerFields({ isBatchLoadValid: false });
        return;
      }
      if (firstBatchSequence.length === 1 && lastBatchSequence.length === 1) {
        let firstBatchSequenceType = Number.isInteger(parseInt(firstBatchSequence)) ? "number" : "string";
        let lastBatchSequenceType = Number.isInteger(parseInt(lastBatchSequence)) ? "number" : "string";

        if (firstBatchSequenceType === lastBatchSequenceType && firstBatchSequence < lastBatchSequence) {
          updateCustomerFields({ isBatchLoadValid: true });
        } else {
          updateCustomerFields({ isBatchLoadValid: false });
        }
      } else {
        let check = validateBatchSequence(firstBatchSequence, lastBatchSequence);
        if (!check.isValid) {
          updateCustomerFields({ isBatchLoadValid: false });
          return;
        }
        validateBatchLoadSequenceNumber(firstBatchSequence, lastBatchSequence);
      }
    } else {
      updateCustomerFields({ isBatchLoadValid: false });
    }
  };

  /**
   * Validate Batchload Sequence Number
   */
  const validateBatchLoadSequenceNumber = (firstBatchSequence, lastBatchSequence) => {
    OrderEntryServices.validateSequence(firstBatchSequence, lastBatchSequence)
      .then((response) => {
        const { data } = response;
        if (data === true) {
          updateCustomerFields({ isBatchLoadValid: true });
        } else {
          updateCustomerFields({ isBatchLoadValid: false });
        }
      })
      .catch((err) => {
        updateCustomerFields({ isBatchLoadValid: false });
      });
  };

  // useEffect start here

  useEffect(() => {
    if (customer.customerDataId) return;

    const debounce = setTimeout(() => {
      // both updates are batched into one key change -> one api call
      setDebouncedSearch(customer.customerDataName || "");
      setPageNumber(0);
    }, 500);
    return () => clearTimeout(debounce);
  }, [customer.customerDataName]);

  const fetchCityById = async (id) => {
    try {
      const res = await OrderEntryServices.getCityById(id);

      return res;
    } catch (error) {}
  };

  const handleInputCallBackDeliveryCustomerplant = () => {
    dispatch(setSelectedDeliveryPlant({}));
    updateCustomerFields({ deliveryCustomerPlantFK: null });
  };
  const handleInputCallBackPickupCustomerplant = () => {
    dispatch(setSelectedCustomerPickupPlant(null));
    updateCustomerFields({
      pickupCustomerPlantFK: null,
      hasprinter: false,
      bolPrinterFk: 0,
      shuttleToYard: false,
    });
  };
  const getBulkInvoiceDetailsLastElement = async () => {
    try {
      const res = await OrderEntryServices.fetchBulkUnitdetails({
        customerFK: customer.customerDataId,
        searchTerms: "",
      });
      const result = res?.data?.content?.pop();
      handleBulkInvoiceSelection(result);
    } catch (error) {}
  };

  const getTotalUnitsForBatchLoad = () => {
    OrderEntryServices.batchLoadsUnitsCount(customer.firstBatchSequence, customer.lastBatchSequence)
      .then((response) => {
        const data = response.data;
        dispatch(setBatchLoadCount(data));
      })
      .catch((err) => {
        updateCustomerFields({ isBatchLoadValid: false });
        dispatch(setBatchLoadCount(0));
      });
  };

  useEffect(() => {
    if (data) {
      if (!customer.customerDataId) dispatch(setSelectedCustomer({}));
      setTableList(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    }
  }, [data]);

  useEffect(() => {
    updateCustomerFields({ customerPlantId: null, customerPlantName: "" });

    setCustomerPlantList([]);

    if (selectedCustomer.usePlants) {
      getPlantDataByName({ text: "", billingPlant: true });
    }
  }, [selectedCustomer.customerPK]); //selectedCustomerPickupPlant.customerPlantPK

  useEffect(() => {
    if (customer.customerPlantId) {
      updateCustomerFields({ pickupAtPlant: true });
    } else {
      updateCustomerFields({ pickupAtPlant: false });
    }
  }, [customer.customerPlantId, customer.customerDataId]);

  useEffect(() => {
    if (customer.customerDataId) {
      OrderEntryServices.sendNotificationMail("Bol");
    }
  }, [customer.customerDataId]);

  useEffect(() => {
    if (customer.pickupCustomerPlantFK) {
      OrderEntryServices.sendNotificationMail("Shuttle");
    }
  }, [customer.pickupCustomerPlantFK]);

  /**
   * Used to setFODInvoice
   */
  useEffect(() => {
    if (
      customer.creditCardPrepaid ||
      customer.openBalancePrepaid ||
      selectedCustomer?.allDealersFOD ||
      selectedCustomer?.miscellaneousCustomer
    ) {
      updateCustomerFields({
        fodInvoice: true,
      });
    } else {
      updateCustomerFields({
        fodInvoice: false,
      });
    }
  }, [customer.creditCardPrepaid, customer.openBalancePrepaid, selectedCustomer]);

  useEffect(() => {
    if (
      customer.batchLoads &&
      customer.firstBatchSequence &&
      customer.lastBatchSequence &&
      customer.firstBatchSequence.length === customer.lastBatchSequence.length &&
      customer.isBatchLoadValid
    ) {
      getTotalUnitsForBatchLoad();
    }
  }, [
    customer.lastBatchSequence,
    customer.firstBatchSequence,
    customer.batchLoads,
    customer.isBatchLoadValid,
  ]);

  return {
    loading: isFetching || typing,
    tableList,
    customerPlantList,
    cutomerPlantLoading,
    pageNumber,
    setPageNumber,
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    selectedCustomerPickupPlant,
    selectedDeliveryPlant,
    handleCustomerDataSelection,
    handleCustomerPlantSelection,
    handlePickupCustomerPlantSelection,
    handlePickupCustmrYardSelection,
    fetchCityDetails,
    handleShuttleCitySelection,
    handleDeliveryShuttleCitySelection,
    handleDeliveryPlantSelection,
    selectedPlant,
    handleDeliveryYardSelection,
    updateCustomerFields,
    setCustomerPlantList,
    setCutomerPlantLoading,
    handleBulkInvoiceSelection,
    handleCheckBatchLoadValues,
    getBulkInvoiceDetailsLastElement,
    handleInputCallBackPickupCustomerplant,
    handleInputCallBackDeliveryCustomerplant,
  };
};

export default useCustomer;
