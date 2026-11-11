import { useFormContext, useWatch } from "react-hook-form";
import useDebouncer from "../../../../../hooks/useDebouncer";
import {
  setInvoiceAmount,
  setAllowedInvoicePercentage,
  setDeliveryDealer,
  setDriverAmount,
  setOrderEntrySchemaConditions,
  setUnitRoutesListing,
  setPickupDealer,
  setSelectedUnitType,
  setSelectedMultiUnitLoad,
  setSelectedPickupDealer,
  setSelectedDeliveryDealer,
  setDriverRateStructure,
  setInvoiceRateStructure,
  setCustomerRateStructure,
  setIsInvoiceMileageRate,
  setIsDriverMileageRate,
  setSupplementalRateStructure,
  setSpecialRateStructure,
  setAdditionalRateStructure,
  setInvoiceRateObj,
  setDriverRateObj,
  setCdlCutoffs,
  setIsEngineNAVisible,
  setCustomerDealerList,
  setMultiUnitPopupLoad,
  setInvoiceRate,
  setDriverRate,
  setInvoiceFlat,
  setDriverFlat,
  setApportionedRate,
  setCalculateInvoiceLoading,
  setCalculateDriverLoading,
  setPcMilerVisible,
} from "../../../../../store/slices/unit.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import CustomerRatesServices from "../../../../../service/customerRates/customerRates.service";
import CustomerPlantServices from "../../../../../service/customerPlant/customerPlant.service";
import { useCDL } from "./hook/useCDL";
import { useCustomerRates } from "./hook/useCustomerRates";
import { useRateCalculator } from "./hook/useRateCalculator";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import pcMilerServices from "../../../../../service/pcMiler/pcMiler.service";
import {
  generateDriverPayload,
  generateInvoicePayload,
  generateUnitPayload,
  getCurrentCompany,
} from "../../../../../utils/utils";

const useUnit = () => {
  const {
    setValue,
    getValues,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const dispatch = useDispatch();
  const [customerRatesList, setCustomerRatesList] = useState([]);
  const [multiUnitRawList, setMultiUnitRawList] = useState([]);
  const [multiUnitFilteredList, setMultiUnitFilteredList] = useState([]);
  const [defaultLoaded, setDefaultLoaded] = useState(false);

  const [flaterateLoading, setFlaterateLoading] = useState(false);
  const [unitNumberOverRide, setUnitNumberOverRide] = useState("");
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidDateError, setInvalidDateError] = useState("");
  const [invalidEarliestDeliveryDate, setInvalidEarliestDeliveryDate] = useState(false);
  const [invalidEarliestDeliveryDateError, setInvalidEarliestDeliveryDateError] = useState("");
  const [invalidLatestDeliveryDate, setInvalidLatestDeliveryDate] = useState(false);
  const [invalidLatestDeliveryDateError, setInvalidLatestDeliveryDateError] = useState("");
  const [invalidEarliestPickupDate, setInvalidEarliestPickupDate] = useState(false);
  const [invalidEarliestPickupDateError, setInvalidEarliestPickupDateError] = useState("");
  const [invalidLatestPickupDate, setInvalidLatestPickupDate] = useState(false);
  const [invalidLatestPickupDateError, setInvalidLatestPickupDateError] = useState("");
  const [cityMaxLimit, setCityMaxLimit] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [multiUnitLoadData, setMultiUnitLoadData] = useState("");
  const [multiLoadPcMilerDistance, setMultiLoadPcMilerDistance] = useState(null);
  const [showMultiLoadDistance, setShowMultiLoadDistance] = useState(false);
  const [citiesWithStatecode, setCitiesWithStatecode] = useState("");
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ratesLoading, setRatesLoading] = useState(false);

  const delerSelection = useRef({ pickupDealer: null, deliveryDealer: null });

  const unit = useWatch({ name: "unit" });
  const customerPlantId = useWatch({ name: "customer.customerPlantId" });
  const customerReload = useWatch({ name: "customer.reload" });
  const customerReturnRates = useWatch({ name: "customer.returnRates" });
  const pickupCustomerPlantFK = useWatch({ name: "customer.pickupCustomerPlantFK" });
  const deliveryCustomerPlantFK = useWatch({ name: "customer.deliveryCustomerPlantFK" });
  const pickupAtPlant = useWatch({ name: "customer.pickupAtPlant" });
  const deliverToPlant = useWatch({ name: "customer.deliverToPlant" });
  const deliveryYardFK = useWatch({ name: "customer.deliveryYardFK" });
  const batchLoads = useWatch({ name: "customer.batchLoads" });
  const selectedCustomerCustomerPK = useSelector((state) => state.unit.selectedCustomer.customerPK);
  const selectedCustomerInvoiceCanadianSurcharge = useSelector(
    (state) => state.unit.selectedCustomer.invoiceCanadianSurcharge
  );
  const selectedMultiUnitLoad = useSelector((state) => state.unit.selectedMultiUnitLoad);

  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const selectedCustomerSpecialCodeFK = selectedCustomer?.specialcodefk?.specialCodePK;
  const selectedCustomerSpecialCodeName = selectedCustomer?.specialcodefk?.description?.trim();
  const selectedCustomerDriverCanadianSurcharge = useSelector(
    (state) => state.unit.selectedCustomer.driverCanadianSurcharge
  );
  const deliveryDealer = useSelector((state) => state.unit.deliveryDealer);
  const pickupDealer = useSelector((state) => state.unit.pickupDealer);
  const selectedUnitType = useSelector((state) => state.unit.selectedUnitType);
  const selectedCustomerInvoicePercentage = useSelector(
    (state) => state.unit.selectedCustomer.invoicePercentage
  );
  const driverRateStructure = useSelector((state) => state.unit.driverRateStructure);
  const invoiceRateStructure = useSelector((state) => state.unit.invoiceRateStructure);

  const selectedPlant = useSelector((state) => state.unit.selectedPlant);
  const selectedPickupDealer = useSelector((state) => state.unit.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);
  const supplementalRateStructure = useSelector((state) => state.unit.supplementalRateStructure);
  const specialRateStructure = useSelector((state) => state.unit.specialRateStructure);
  const additionalRateStructure = useSelector((state) => state.unit.additionalRateStructure);
  const customerRateStructure = useSelector((state) => state.unit.customerRateStructure);
  const customerDealerList = useSelector((state) => state.unit.customerDealerList);
  const miscPickupID = useSelector((state) => state.unit.miscPickupID);
  const multiUnitPopupLoad = useSelector((state) => state.unit.multiUnitPopupLoad);
  const invoiceFlat = useSelector((state) => state.unit.invoiceFlat);
  const driverFlat = useSelector((state) => state.unit.driverFlat);
  const calculateRatesTriggerKey = useSelector((state) => state.unit.calculateRatesTriggerKey);
  const driveBysListing = useSelector((state) => state.unit.driveBysListing);
  const apportionedRate = useSelector((state) => state.unit.apportionedRate);
  const deliveryDealerTWICRequired = useSelector((state) => state.unit.selectedDeliveryDealer?.twicRequired);

  const { requiredCDLAHidden, invoiceCDLASurcharge, driverCDLASurcharge } = useCDL({
    unit,
    selectedUnitType,
    customerReload,
    customerReturnRates,
    pickupAtPlant,
  });

  const { resolveCustomerRates, fetchSupplementalRates, fetchSpecialRates, fetchAdditionalRates } =
    useCustomerRates({
      selectedCustomerBillingPlantId: selectedPlant?.customerPlantPK || null,
      multiUnit: unit.multiUnit,
      unitsPerDispatch: unit.unitsPerDispatchUnit,
      invoice2as3: unit.twoAsThree,
      returnRates: customerReturnRates,
      selectedUnitType: selectedUnitType,
      customerId: selectedCustomerCustomerPK,
      reload: customerReload,
    });

  // updating validation needed conditions and using trigger to validate
  const debounceUpdate = useDebouncer(() => {
    const unit = getValues("unit");
    const obj = {
      ...unit,
      pickupDealer,
      deliveryDealer,
      ...delerSelection.current,
      selectedUnitType: selectedUnitType ?? null,
    };
    dispatch(
      setOrderEntrySchemaConditions({
        unit: { ...obj },
      })
    );
  }, 150);

  // updating react hooks form values
  const updateUnitFields = (fields) => {
    const current = getValues("unit");

    if (!fields?.hasDrivebys) {
      // Commenting out as causing issue in POE update & DriveBys
      // dispatch(setUnitRoutesListing({ actionType: "clearDriveBys" }));
    }

    setValue("unit", { ...current, ...fields }, { shouldValidate: false, shouldDirty: true });

    debounceUpdate();
  };

  const handleUnitTypeSelection = (unitType) => {
    dispatch(
      setOrderEntrySchemaConditions({
        allowedPercentage: false,
      })
    );
    dispatch(setSelectedUnitType(unitType));
    updateUnitFields({ unitTypeFK: unitType.unitTypePK, unitTypeName: unitType.descriptionLong?.trim() });
    if (unitType?.allowPopup) {
      dispatch(setMultiUnitPopupLoad(true));
    } else {
      dispatch(setMultiUnitPopupLoad(false));
    }
  };

  const handleSpecialCodeSelection = (item) => {
    updateUnitFields({ specialCodeFK: item.specialCodePK, specialCodeName: item.description?.trim() });
  };
  const handlePickupDealerSelection = (item) => {
    dispatch(setSelectedPickupDealer(item));
    dispatch(setPickupDealer(item));
    updateUnitFields({ pickupDealerFK: item.dealerPK, pickupDealerName: item.name?.trim() });
    dispatch(
      setUnitRoutesListing({
        actionType: "addPickup",
        payload: { ...item, dealerFK: item.dealerPK, isCanadian: item?.canadian || false, isPickup: true },
      })
    );
  };

  const handleDeliveryDealerSelection = (item) => {
    dispatch(setSelectedDeliveryDealer(item));
    dispatch(setDeliveryDealer(item));
    updateUnitFields({ deliveryDealerFK: item.dealerPK, deliveryDealerName: item.name?.trim() });
    dispatch(
      setUnitRoutesListing({
        actionType: "addDelivery",
        payload: { ...item, dealerFK: item.dealerPK, isCanadian: item?.canadian || false, isDelivery: true },
      })
    );
  };
  const handleBrokerSelection = (item) => {
    updateUnitFields({ brokerFK: item.importBrokerPK || item.exportBrokerPK, brokerName: item.name?.trim() });
  };

  const handlePortDetailsSelection = (item) => {
    updateUnitFields({ poeFK: item.poePK, poeName: item.usCity?.trim() });
    dispatch(
      setUnitRoutesListing({
        actionType: "addPortOfEntry",
        payload: {
          poeFK: item.poePK,
          name: "POE",
          usCity: item?.usCity || "",
          canadianCity: item?.canadianCity || "",
          address1: item?.address1 || "",
          address2: item?.address2 || "",
          city: item?.usCity || item?.canadianCity || "",
          stateCode: item?.stateCode || "",
          postalCode: item?.postalCode || "",
          canadian: item?.canadian || false,
          isPoe: true,
        },
      })
    );
  };

  const handleCityMaxLimitClose = () => {
    setCityMaxLimit(false);
    setShowMoreInfo(false);

    setMultiUnitLoadData("");
    setCitiesWithStatecode("");
    setShowMultiLoadDistance(false);
    setMultiLoadPcMilerDistance(null);

    updateUnitFields({ unitMultiLoadPK: null, unitMultiLoadName: "" });
  };

  const calculateDistance = () => {
    let pickupDeliverylocation = {
      src: {
        city: selectedPickupDealer.city || "",
        stateCode: selectedPickupDealer.stateCode || "",
      },
      dst: {
        city: selectedDeliveryDealer.city || "",
        stateCode: selectedDeliveryDealer.stateCode || "",
      },
    };
    setDistanceLoading(true);
    pcMilerServices
      .calculateDistance(pickupDeliverylocation)
      .then((response) => {
        const { data } = response;
        setMultiLoadPcMilerDistance(Number(data?.distance) || 0);
        if (Number(data?.distance) > 15) {
          setShowMultiLoadDistance(true);
        }
      })
      .catch((err) => {
        setShowMultiLoadDistance(true);
        setMultiLoadPcMilerDistance(null);
      })
      .finally(() => setDistanceLoading(false));
  };

  const distanceConfirmationYes = () => {
    setShowMultiLoadDistance(false);
    setCitiesWithStatecode("");
    setShowMoreInfo(false);
  };

  const handleMultiUnitLoadSelection = (item) => {
    dispatch(setSelectedMultiUnitLoad(item));
    updateUnitFields({ unitMultiLoadPK: item.unitMultiLoadPK, unitMultiLoadName: item.city?.trim() });

    setMultiUnitLoadData(item);
    setCitiesWithStatecode(item?.cityWithStateCode || "");

    const cityWithStateCode = item?.city
      ?.trim()
      .split("--")
      .map((cityState) => cityState.replace(/\s/g, ""));
    const deliveryDealerCity = `${selectedDeliveryDealer?.city?.trim().replace(/\s/g, "")}`;
    const isCityStateAvailable = cityWithStateCode.includes(deliveryDealerCity?.trim());

    if (!isCityStateAvailable) {
      if (cityWithStateCode.length === 3) {
        setCityMaxLimit(true);
      } else {
        if (item?.city?.trim() !== "Add New Record") {
          calculateDistance();
        }
      }
    } else {
      setCityMaxLimit(false);
    }
  };

  const checkUnitNumberUniqe = async (value) => {
    try {
      if (!value || value.length < 5) return;

      dispatch(setOrderEntrySchemaConditions({ unitNumberValidity: null }));

      const res = await OrderEntryServices.checkUnitNumberUnique({
        customerFK: selectedCustomerCustomerPK,
        unitNumber: value,
        selectedCustomerBillingPlantId: selectedPlant?.customerPlantPK,
      });
      if (res.data) {
        const { errorCode, overrideFlag, validityMessage } = res.data;
        if (errorCode === 1 && overrideFlag) {
          setUnitNumberOverRide(validityMessage);
        }

        dispatch(setOrderEntrySchemaConditions({ unitNumberValidity: res.data }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyCustomerRates = (res) => {
    const InvoiceRate = res.data.invoiceCustomerRates;
    const DriverRate = res.data.driverCustomerRates;

    if (!InvoiceRate && !DriverRate) {
      dispatch(setIsInvoiceMileageRate(false));
      dispatch(setIsDriverMileageRate(false));
      return;
    }

    // INVOICE
    if (InvoiceRate) {
      dispatch(setCustomerRateStructure(InvoiceRate));
      dispatch(setInvoiceRateStructure(InvoiceRate));
      dispatch(setIsInvoiceMileageRate(true));
    } else {
      dispatch(setIsInvoiceMileageRate(false));
    }

    // DRIVER
    if (DriverRate) {
      if (!InvoiceRate) dispatch(setCustomerRateStructure(DriverRate));
      dispatch(setDriverRateStructure(DriverRate));
      dispatch(setIsDriverMileageRate(true));
    } else {
      dispatch(setIsDriverMileageRate(false));
    }
  };

  const fetchCustomerRates = async () => {
    try {
      setLoading(true);
      const res = await CustomerRatesServices.getCustomerRatesDataByCustomerId(selectedCustomerCustomerPK);
      if (res.data) {
        setCustomerRatesList(res.data);
      }
    } catch (error) {
      console.error("Error fetching customer rates:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const checkInvoicePercentage = async () => {
    try {
      const res = await OrderEntryServices.getUserInvoicePercentage();

      let percentage = 0;
      let userInvoicePercentage = res.data;

      if (userInvoicePercentage > 0) {
        percentage = Number(userInvoicePercentage / 100) + Number(selectedCustomerInvoicePercentage);
      } else if (selectedCustomerInvoicePercentage > 0) {
        percentage = Number(selectedCustomerInvoicePercentage);
      }
      dispatch(setAllowedInvoicePercentage(percentage));
    } catch (error) {
      console.error("Error fetching customer rates:", error);
      throw error;
    }
  };

  const fetchCommission = (params) => {
    OrderEntryServices.fetchCommission({
      selectedCustomerId: selectedCustomerCustomerPK,
      selectedCustomerBillingPlantId: selectedPlant?.customerPlantPK,
      ...params,
    }).then((res) => {
      const data = res.data;
      if (data) {
        if (data.commission) {
          updateUnitFields({ commission: data.commission, commissionVisible: false });
        } else {
          updateUnitFields({ commissionVisible: true });
        }
      }
    });
  };

  const buildCalculateRatesPayload = () => {
    const { unit: unitValues = {}, customer = {} } = getValues();

    const isMilesLowBoy =
      unit.unitsPerDispatchUnit &&
      unit.multiUnit &&
      !selectedUnitType?.allowPopup &&
      !selectedUnitType?.allowTruckCamper &&
      (!selectedMultiUnitLoad ||
        selectedMultiUnitLoad?.city === "Add New Record" ||
        (!selectedMultiUnitLoad?.popupLoad && !selectedMultiUnitLoad?.truckCamperLoad));

    const source = {
      ...unitValues,
      ...customer,
      pickUpYardFK: customer.pickupYardFK,
      customerFK: selectedCustomerCustomerPK,
      unitTypeFK: selectedUnitType?.unitTypePK,
      unitTypeLength: selectedUnitType?.length,
      pickupDealerFK: selectedPickupDealer?.dealerPK,
      pickUpUnitAddressFK: selectedPickupDealer?.unitAddressId,
      deliveryDealerFK: selectedDeliveryDealer?.dealerPK,
      deliveryUnitAddressFK: selectedDeliveryDealer?.unitAddressId,
      pickUpCustomerPlantFK: pickupAtPlant ? pickupCustomerPlantFK : null,
      deliveryCustomerPlantFK: deliverToPlant ? deliveryCustomerPlantFK : null,
      customerPlantFK: customerPlantId,
      gas: unitValues.gas === "enginegas",
      diesel: unitValues.gas === "enginediesel",
      GVWR: unitValues.gvwr,
      isMilesLowBoy: isMilesLowBoy,
      unitsPerDispatch: unit.unitsPerDispatchUnit,
      motorized: selectedUnitType?.motorized,
      pickUpCity: selectedPickupDealer?.city,
      pickUpState: selectedPickupDealer?.stateCode,
      pickUpZIP: selectedPickupDealer?.postalCode,
      deliveryCity: selectedDeliveryDealer?.city,
      deliveryState: selectedDeliveryDealer?.stateCode,
      deliveryZIP: selectedDeliveryDealer?.postalCode,
      canadianDelivery: selectedDeliveryDealer?.canadian,
      canadianPickup: selectedPickupDealer?.canadian,
      gvwrChanged: true,
      unitTypeChanged: true,
      specialCodeChanged: true,
      invoiceRateChanged: true,
      driverRateChanged: true,
      dispatchRateChanged: true,
      shippingWeightChanged: true,
    };

    return {
      Unit: generateUnitPayload(source),
      Invoice: generateInvoicePayload(source),
      Driver: generateDriverPayload(source),
    };
  };

  const fetchCalculateRates = () => {
    if (!selectedPickupDealer || !selectedDeliveryDealer || !selectedUnitType?.unitTypePK) return;

    if (
      invoiceRateStructure !== "" &&
      !Number(unit.invoiceFlatRate) &&
      (pickupAtPlant || unit.pickupDealerFK !== null) &&
      (deliverToPlant || unit.deliveryDealerFK !== null)
    ) {
      dispatch(
        setOrderEntrySchemaConditions({
          invoiceFlatRateRequired: true,
        })
      );
    }

    if (
      driverRateStructure !== "" &&
      !Number(unit.driverFlatRate) &&
      (pickupAtPlant || unit.pickupDealerFK !== null) &&
      (deliverToPlant || unit.deliveryDealerFK !== null)
    ) {
      dispatch(
        setOrderEntrySchemaConditions({
          driverFlatRateRequired: true,
        })
      );
    }
    setRatesLoading(true);
    dispatch(setCalculateInvoiceLoading(true));
    dispatch(setPcMilerVisible(true));
    OrderEntryServices.getCalculateRates(buildCalculateRatesPayload())
      .then((res) => {
        const invoice = res.data.invoice;
        const driver = res.data.driver;
        const apportionRate = {
          Invoice: {
            Amount: invoice?.invoiceApportionedRate,
            UseApportionedReturns: invoice?.invoiceApportionedReturn,
          },
          Driver: {
            Amount: driver?.driverApportionedRate,
            UseApportionedReturns: driver?.driverApportionedReturn,
          },
        };

        dispatch(setApportionedRate(apportionRate));

        applyCustomerRates(res);
        updateUnitFields({
          invoiceFlatRateVisible: true,
          driverFlatRateVisible: true,
        });

        if (invoice?.milesFrom === "Connection") {
          dispatch(setPcMilerVisible(false));
        } else {
          dispatch(setPcMilerVisible(true));
        }

        if (invoice?.invoiceMiles) updateUnitFields({ invoiceMiles: String(invoice?.invoiceMiles) });
        if (driver?.driverMiles) updateUnitFields({ driverMiles: String(driver?.driverMiles) });

        dispatch(
          setOrderEntrySchemaConditions({
            invoiceFlatRateRequired: !(
              invoice?.invoiceAmount ||
              (invoice?.invoiceFlatrate && invoice?.invoiceCustomerRateFK !== null)
            ),
          })
        );

        dispatch(
          setOrderEntrySchemaConditions({
            driverFlatRateRequired: !(
              driver?.driverAmount ||
              (driver?.driverFlatrate && driver?.driverCustomerRateFK !== null)
            ),
          })
        );

        if (invoice?.invoiceFlatrate && invoice?.invoiceCustomerRateFK === null) {
          updateUnitFields({
            invoiceFlatRate: String(invoice?.invoiceFlatrate || 0),
          });
          dispatch(setInvoiceAmount(invoice?.invoiceFlatrate));
        } else {
          if (!invoiceFlat && invoice?.invoiceAmount) {
            updateUnitFields({
              invoiceFlatRate: "0",
            });
          }
        }
        if (driver?.driverFlatrate && driver?.driverCustomerRateFK === null) {
          updateUnitFields({
            driverFlatRate: String(driver?.driverFlatrate || 0),
          });
          dispatch(setDriverAmount(driver?.driverFlatrate));
        } else {
          if (!driverFlat && driver?.driverAmount) {
            updateUnitFields({
              driverFlatRate: "0",
            });
          }
        }

        dispatch(setInvoiceRate(invoice?.invoiceRate || 0));
        dispatch(setDriverRate(driver?.driverRate || 0));

        dispatch(setDriverRateObj(driver));
        dispatch(setInvoiceRateObj(invoice));

        if (!driverFlat) {
          dispatch(setDriverAmount(driver?.driverFlatrate || driver?.driverAmount || 0));
        }

        if (!invoiceFlat) {
          dispatch(setInvoiceAmount(invoice?.invoiceFlatrate || invoice?.invoiceAmount || 0));
        }

        if (invoice?.rateType === "F") {
          if (invoice?.invoiceAmount > 0) {
            if (!invoiceFlat) {
              dispatch(setInvoiceAmount(invoice?.invoiceFlatrate || invoice?.invoiceAmount));
            }
          }
          setIsInvoiceMileageRate(false);
        } else {
          if (invoice?.invoiceAmount > 0) {
          } else {
            setIsInvoiceMileageRate(false);
          }
        }

        if (
          (pickupAtPlant && pickupCustomerPlantFK && unit.deliveryDealerFK) ||
          (deliverToPlant && deliveryCustomerPlantFK && unit.pickupDealerFK) ||
          (pickupAtPlant && pickupCustomerPlantFK && deliverToPlant && deliveryCustomerPlantFK)
        ) {
          if (invoice?.invoiceFlatrate && invoice?.invoiceCustomerRateFK === null) {
            updateUnitFields({ invoiceFlatRateVisible: false });
          } else {
            updateUnitFields({ invoiceFlatRateVisible: true });
          }
          if (driver?.driverFlatrate && driver?.driverCustomerRateFK === null) {
            updateUnitFields({ driverFlatRateVisible: false });
          } else {
            updateUnitFields({ driverFlatRateVisible: true });
          }
        }

        if (driver?.rateType === "F") {
          if (driver?.driverAmount > 0) {
            if (!driverFlat) {
              dispatch(setDriverAmount(driver?.driverFlatrate || driver?.driverAmount));
            }
          }
          dispatch(setIsDriverMileageRate(false));
        } else {
          if (!(driver?.rateType == "M" || driver?.rateType == "N")) return;
          if (driver?.driverAmount > 0) {
          } else {
            dispatch(setIsDriverMileageRate(false));
          }
        }

        if (unit.pickupDealerFK && unit.deliveryDealerFK && unit.unitsPerDispatchUnit) {
          updateUnitFields({ invoiceFlatRateVisible: true, driverFlatRateVisible: true });
        }
      })
      .catch(() => {})
      .finally(() => {
        setRatesLoading(false);
        dispatch(setCalculateInvoiceLoading(false));
      });
  };

  const fetchDefaultMultiUnitData = async () => {
    const city = getValues("miscDelivery.city");
    const stateCode = getValues("miscDelivery.stateCode");
    const pickupCity = getValues("miscPickup.city");
    const pickupStateCode = getValues("miscPickup.stateCode");

    const res = await OrderEntryServices.getUnitMultiLoad({
      customerFK: selectedCustomerCustomerPK || -1,
      selectedCustomerBillingPlantId: customerPlantId || -1,
      pickupDealerFK: unit.pickupDealerFK || -1,
      pickupCustomerPlantFK: pickupCustomerPlantFK || -1,
      deliveryDealerFK: unit.deliveryDealerFK || -1,
      deliveryUnitAddressFK: selectedDeliveryDealer?.unitAddressId || -1,
      deliveryCustomerPlantFK: selectedDeliveryDealer?.customerPlantPK || -1,
      pickupUnitAddressFK: selectedPickupDealer?.unitAddressId || -1,
      city: selectedDeliveryDealer?.unitAddressId ? city : "",
      stateCode: selectedDeliveryDealer?.unitAddressId ? stateCode : "",
      pickupCity: miscPickupID ? pickupCity : "",
      pickupStateCode: miscPickupID ? pickupStateCode : "",
    });

    if (!res?.data) return;

    const defaultPK = res.data.UnitMultiLoadPK;

    const matched = multiUnitFilteredList.find((rec) => rec.unitMultiLoadPK === defaultPK);

    if (matched) {
      updateUnitFields({
        unitMultiLoadPK: matched.unitMultiLoadPK,
        unitMultiLoadName: matched.city?.trim(),
      });
    }

    setDefaultLoaded(true);
  };

  const fetchPlantById = () => {
    dispatch(setSelectedPickupDealer(null));
    CustomerPlantServices.fetchPlantById(pickupCustomerPlantFK)
      .then((res) => {
        const { data } = res;
        dispatch(setSelectedPickupDealer(data));
        const pickupDealer = {
          name: data?.name?.trim(),
          address1: data?.address1?.trim(),
          address2: data?.address2?.trim(),
          city: data?.city?.trim(),
          stateCode: data?.stateCode?.trim(),
          postalCode: data?.postalCode?.trim(),
          phone: formatPhoneNumber(data?.phone),
          contact: data?.deliveryContact?.trim() || "",
          canadian: data?.canadian,
          customerPlantFK: data?.customerPlantPK || null,
        };
        dispatch(
          setUnitRoutesListing({
            actionType: "addPickup",
            payload: { ...pickupDealer, isCanadian: pickupDealer?.canadian || false, isPickup: true },
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const debounceFetchMultiUnitLoadData = useDebouncer(fetchDefaultMultiUnitData, 500);
  const fetchCalculateRatesDebouncer = useDebouncer(() => fetchCalculateRates(), 1000);
  const fetchPlantByIdDebouncer = useDebouncer(() => fetchPlantById(), 500);

  useRateCalculator({
    // rateStructure: invoiceRateStructure,
    miles: unit.invoiceMiles || unit.driverMiles,
    flatrate: Number(unit.invoiceFlatRate) || Number(unit.driverFlatRate),

    pickupAtPlant,
    pickupDealersFK: unit.pickupDealerFK,
    deliverToPlant,
    deliveryDealersFK: unit.deliveryDealerFK,

    calculateDebouncer: fetchCalculateRatesDebouncer,

    dependencies: [
      unit.gas,
      pickupAtPlant,
      unit.pickupDealerFK,
      deliverToPlant,
      unit.deliveryDealerFK,
      pickupCustomerPlantFK,
      deliveryCustomerPlantFK,
      selectedUnitType?.unitTypePK,
      unit.multiUnit,
      selectedMultiUnitLoad?.unitMultiLoadPK,
      unit.unitsPerDispatchUnit,
      selectedMultiUnitLoad?.twoAsThree,
      unit.gvwr,
      selectedPickupDealer,
      selectedDeliveryDealer,
      customerReload,
      unit.specialCodeFK,
      customerReturnRates,
      unit.shippingWeight,
    ],
  });

  const fetchCommissionAmount = () => {
    /* Dealer to Dealer**/
    if (unit.pickupDealerFK && unit.deliveryDealerFK) {
      fetchCommission({
        pickupDealerFK: unit.pickupDealerFK,
        deliveryDealerFK: unit.deliveryDealerFK,
        pickupCustomerPlantFK: null,
        deliveryCustomerPlantFK: null,
      });
    }

    /*Plant to Dealer */
    if (pickupAtPlant && pickupCustomerPlantFK && selectedPlant?.customerPlantPK && unit.deliveryDealerFK) {
      fetchCommission({
        pickupDealerFK: null,
        deliveryDealerFK: unit.deliveryDealerFK,
        pickupCustomerPlantFK: pickupCustomerPlantFK,
        deliveryCustomerPlantFK: null,
      });
    }
    /*Dealer to Plant*/
    if (unit.pickupDealerFK && deliverToPlant && unit.deliveryDealerFK && selectedPlant?.customerPlantPK) {
      fetchCommission({
        pickupDealerFK: unit.pickupDealerFK,
        deliveryDealerFK: null,
        pickupCustomerPlantFK: null,
        deliveryCustomerPlantFK: selectedPlant?.customerPlantPK,
      });
    }
    /*DPU Customer - Plant to Dealer */
    if (pickupAtPlant && pickupCustomerPlantFK && !selectedPlant?.customerPlantPK && unit.deliveryDealerFK) {
      fetchCommission({
        pickupDealerFK: null,
        deliveryDealerFK: unit.deliveryDealerFK,
        pickupCustomerPlantFK: pickupCustomerPlantFK,
        deliveryCustomerPlantFK: null,
      });
    }
    /*Plant to Plant */
    if (
      pickupAtPlant &&
      pickupCustomerPlantFK &&
      selectedPlant?.customerPlantPK &&
      deliverToPlant &&
      deliveryCustomerPlantFK
    ) {
      fetchCommission({
        pickupDealerFK: null,
        deliveryDealerFK: null,
        pickupCustomerPlantFK: pickupCustomerPlantFK,
        deliveryCustomerPlantFK: deliveryCustomerPlantFK,
      });
    }
  };
  const fetchCustomerDealerData = () => {
    dispatch(setCustomerDealerList(null));
    OrderEntryServices.getCustomerDealerData({
      selectedCustomerId: selectedCustomerCustomerPK,
      deliveryDealerFK: selectedDeliveryDealer?.dealerPK,
      pickupDealerFK: selectedPickupDealer?.dealerPK,
    })
      .then((res) => {
        if (res?.data?.length) {
          let value = res?.data[0];
          dispatch(setCustomerDealerList(value));
          if (!selectedPickupDealer?.canadian && selectedDeliveryDealer?.canadian) {
            updateUnitFields({ brokerType: "export" });
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // useEffect started here
  useEffect(() => {
    if (selectedCustomerCustomerPK) {
      updateUnitFields({
        invoiceELDFee: selectedCustomer.invoiceELDAmount || 0,
        driverELDFee: selectedCustomer.driverELDAmount || 0,
        authorizedBy: selectedCustomer.authorizedBy || "",
      });
      if (selectedCustomer) {
        const {
          miscellaneous1,
          miscellaneous2,
          miscellaneous3,
          miscellaneous4,
          miscellaneous5,
          miscellaneous6,
          miscellaneous7,
        } = selectedCustomer;

        updateUnitFields({
          miscellaneousBOLText: [
            miscellaneous1?.trim(),
            miscellaneous2?.trim(),
            miscellaneous3?.trim(),
            miscellaneous4?.trim(),
            miscellaneous5?.trim(),
            miscellaneous6?.trim(),
            miscellaneous7?.trim(),
          ],
        });
      }
      fetchCustomerRates();
      if (selectedCustomerSpecialCodeFK) {
        updateUnitFields({
          specialCodeFK: selectedCustomerSpecialCodeFK,
          specialCodeName: selectedCustomerSpecialCodeName,
        });
      }
    }
  }, [selectedCustomerCustomerPK]);

  useEffect(() => {
    if (selectedCustomerCustomerPK && selectedUnitType?.unitTypePK) {
      checkInvoicePercentage();
    }
  }, [selectedUnitType?.unitTypePK]);

  // getPickup dealer data
  useEffect(() => {
    if (pickupCustomerPlantFK && pickupAtPlant && selectedUnitType?.unitTypePK) {
      fetchPlantByIdDebouncer();
    }
  }, [pickupCustomerPlantFK, pickupAtPlant, selectedUnitType?.unitTypePK]);

  // getDelivery dealer data
  useEffect(() => {
    if (deliveryCustomerPlantFK && deliverToPlant && selectedUnitType?.unitTypePK) {
      dispatch(setSelectedDeliveryDealer(null));
      CustomerPlantServices.fetchPlantById(deliveryCustomerPlantFK).then((res) => {
        const { data } = res;
        dispatch(setSelectedDeliveryDealer(data));
        const deliveryDealer = {
          name: data?.name?.trim(),
          address1: data?.address1?.trim(),
          address2: data?.address2?.trim(),
          city: data?.city?.trim(),
          stateCode: data?.stateCode?.trim(),
          postalCode: data?.postalCode?.trim(),
          phone: formatPhoneNumber(data?.phone),
          contact: data?.deliveryContact?.trim() || "",
          canadian: data?.canadian,
          customerPlantFK: data?.customerPlantPK || null,
        };
        dispatch(
          setUnitRoutesListing({
            actionType: "addDelivery",
            payload: { ...deliveryDealer, isCanadian: deliveryDealer?.canadian || false, isDelivery: true },
          })
        );
      });
    }
  }, [deliveryCustomerPlantFK, deliverToPlant, selectedUnitType?.unitTypePK]);

  useEffect(() => {
    if (!selectedPickupDealer || !selectedDeliveryDealer || !selectedUnitType?.unitTypePK) return;

    fetchCommissionAmount();
  }, [unit.pickupDealerFK, unit.deliveryDealerFK, pickupCustomerPlantFK, deliveryCustomerPlantFK]);

  // Recalculate rates when triggered from Unit Routes (PC Miler / Optimize)
  useEffect(() => {
    if (!calculateRatesTriggerKey) return;
    fetchCalculateRatesDebouncer();
  }, [calculateRatesTriggerKey]);

  useEffect(() => {
    const company = getCurrentCompany();
    const requirePlantReleases = company?.requirePlantReleases;
    if (!pickupAtPlant) {
      updateUnitFields({ plantRelease: true });
    } else {
      let result = selectedCustomer?.requireFactoryRelease && requirePlantReleases;
      updateUnitFields({ plantRelease: !result });
    }
  }, [selectedCustomerCustomerPK, pickupAtPlant, selectedUnitType?.unitTypePK]);
  useEffect(() => {
    updateUnitFields({
      pickupDealerFK: selectedPickupDealer?.dealerPK,
      pickupDealerName: selectedPickupDealer?.name?.trim(),
    });
  }, [selectedPickupDealer?.dealerPK]);

  useEffect(() => {
    updateUnitFields({
      deliveryDealerFK: selectedDeliveryDealer?.dealerPK,
      deliveryDealerName: selectedDeliveryDealer?.name?.trim(),
    });
  }, [selectedDeliveryDealer?.dealerPK]);

  const gvwrValue = Number(unit.gvwr);

  useEffect(() => {
    if (gvwrValue >= 32000) {
      setValue("unit.ifta", true, { shouldValidate: false, shouldDirty: true });
    } else {
      setValue("unit.ifta", false, { shouldValidate: false, shouldDirty: true });
    }
  }, [gvwrValue]);
  //used to set invalied message for deliverbydate
  useEffect(() => {
    if (!unit.deliverByDateValid || !unit.deliverByDate) return;
    if (
      unit.deliveryDealerFK ||
      (unit.miscellaneousDelivery && selectedDeliveryDealer) ||
      (deliverToPlant && deliveryCustomerPlantFK && !deliveryYardFK)
    ) {
      OrderEntryServices.checkDateValid({
        selectedDate: unit.deliverByDate,
        deliveryDealerFK: unit.deliveryDealerFK,
        miscellaneousDelivery: unit.miscellaneousDelivery,
        selectedUnitAddress: selectedDeliveryDealer,
        deliveryCustomerPlantFK: deliveryCustomerPlantFK,
        deliverToPlant: deliverToPlant,
      }).then((res) => {
        if (res?.data?.errorMsg) {
          setInvalidDate(true);
          setInvalidDateError(res?.data?.errorMsg);
        }
      });
    }
  }, [unit.deliverByDate]);

  //used to set invalied message for Earliest delivery date
  useEffect(() => {
    if (!unit?.minimumDeliveryDateValid || !unit.minimumDeliveryDate) return;
    if (
      unit.deliveryDealerFK ||
      (unit.miscellaneousDelivery && selectedDeliveryDealer) ||
      (deliverToPlant && deliveryCustomerPlantFK)
    ) {
      OrderEntryServices.checkDateValid({
        selectedDate: unit.minimumDeliveryDate,
        deliveryDealerFK: unit.deliveryDealerFK,
        miles: unit.driverMiles,
        pickupDate: unit.minimumPickupDate,
        miscellaneousDelivery: unit.miscellaneousDelivery,
        selectedUnitAddress: selectedDeliveryDealer,
        deliveryCustomerPlantFK: deliveryCustomerPlantFK,
        deliverToPlant: deliverToPlant,
      }).then((res) => {
        if (res?.data?.errorMsg) {
          setInvalidEarliestDeliveryDate(true);
          setInvalidEarliestDeliveryDateError(res?.data?.errorMsg);
        }
      });
    }
  }, [unit.minimumDeliveryDate]);

  //used to set invalied message for latest delivery date

  useEffect(() => {
    if (!unit?.maximumDeliveryDateValid || !unit.maximumDeliveryDate) return;
    if (unit.pickupDealerFK || (unit.miscellaneousPickup && selectedPickupDealer)) {
      OrderEntryServices.checkDateValid({
        selectedDate: unit.maximumDeliveryDate,
        pickupDealerFK: unit.pickupDealerFK,
        miscellaneousPickup: unit.miscellaneousPickup,
        selectedUnitAddress: selectedPickupDealer,
      }).then((res) => {
        const data = res?.data?.errorMsg;
        if (res?.data?.errorMsg) {
          setInvalidLatestDeliveryDate(true);
          setInvalidLatestDeliveryDateError(data);
        }
      });
    }
  }, [unit.maximumDeliveryDate]);
  //used to set invalied message for earliest pickup date

  useEffect(() => {
    if (!unit?.minimumPickupDateValid || !unit.minimumPickupDate) return;
    if (unit.pickupDealerFK || (unit.miscellaneousPickup && selectedPickupDealer)) {
      OrderEntryServices.checkDateValid({
        selectedDate: unit.minimumPickupDate,
        pickupDealerFK: unit.pickupDealerFK,
        miscellaneousPickup: unit.miscellaneousPickup,
        selectedUnitAddress: selectedPickupDealer,
      }).then((res) => {
        const data = res?.data?.errorMsg;
        if (res?.data?.errorMsg) {
          setInvalidEarliestPickupDate(true);
          setInvalidEarliestPickupDateError(data);
        }
      });
    }
  }, [unit.minimumPickupDate]);

  //used to set invalied message for   latest pickup date

  useEffect(() => {
    if (!unit?.maximumPickupDateValid || !unit.maximumPickupDate) return;
    if (unit.pickupDealerFK || (unit.miscellaneousPickup && selectedPickupDealer)) {
      OrderEntryServices.checkDateValid({
        selectedDate: unit.maximumPickupDate,
        pickupDealerFK: unit.pickupDealerFK,
        miscellaneousPickup: unit.miscellaneousPickup,
        selectedUnitAddress: selectedPickupDealer,
      }).then((res) => {
        const data = res?.data?.errorMsg;
        if (res?.data?.errorMsg) {
          setInvalidLatestPickupDate(true);
          setInvalidLatestPickupDateError(data);
        }
      });
    }
  }, [unit.maximumPickupDate]);

  useEffect(() => {
    if (!customerRateStructure) {
      dispatch(setCdlCutoffs(false));
      dispatch(setIsEngineNAVisible(true));
      return;
    }

    const {
      invoiceFuelSurchargeGas,
      invoiceFuelSurchargeDiesel,
      driverFuelSurchargeGas,
      driverFuelSurchargeDiesel,
      invoiceCDLGVWRCutoff,
      invoiceCDLLengthCutoff,
      driverCDLGVWRCutoff,
      driverCDLLengthCutoff,
    } = customerRateStructure;

    const hasAnyFuelSurcharge =
      invoiceFuelSurchargeGas > 0 ||
      invoiceFuelSurchargeDiesel > 0 ||
      driverFuelSurchargeGas > 0 ||
      driverFuelSurchargeDiesel > 0;

    const hasAllCdlCutoffs =
      invoiceCDLGVWRCutoff > 0 &&
      invoiceCDLLengthCutoff > 0 &&
      driverCDLGVWRCutoff > 0 &&
      driverCDLLengthCutoff > 0;

    dispatch(setIsEngineNAVisible(!hasAnyFuelSurcharge));
    dispatch(setCdlCutoffs(hasAllCdlCutoffs));
  }, [customerRateStructure]);

  useEffect(() => {
    if (unit.brokerType === "default") {
      updateUnitFields({ poeFK: null, poeName: "", brokerFK: null, brokerName: "" });
    }
  }, [unit.brokerType]);

  useEffect(() => {
    if (!selectedPickupDealer || !selectedDeliveryDealer) {
      updateUnitFields({ brokerType: "default" });
      return;
    }

    if (selectedPickupDealer?.canadian && !selectedDeliveryDealer?.canadian) {
      updateUnitFields({ brokerType: "import" });
    } else if (!selectedPickupDealer?.canadian && selectedDeliveryDealer?.canadian) {
      updateUnitFields({ brokerType: "export" });
    } else {
      updateUnitFields({ brokerType: "default" });
    }
  }, [selectedDeliveryDealer?.canadian, selectedPickupDealer?.canadian]);

  useEffect(() => {
    if (
      selectedPickupDealer &&
      selectedDeliveryDealer &&
      !unit.miscellaneousPickup &&
      !unit.miscellaneousDelivery
    ) {
      fetchCustomerDealerData();
    }
  }, [selectedUnitType?.unitTypePK, selectedPickupDealer?.dealerPK, selectedDeliveryDealer?.dealerPK]);

  const fetchGetMultiUnitLoadData = async () => {
    if (!unit.multiUnit || batchLoads) {
      updateUnitFields({ unitsPerDispatchUnit: 2, unitMultiLoadName: "", unitMultiLoadPK: null });
      return;
    }
    const city = getValues("miscPickup.city");
    const stateCode = getValues("miscPickup.stateCode");

    const result = await OrderEntryServices.fetchMultiUnitLoadsDetails({
      customerFK: selectedCustomerCustomerPK,
      customerPlantFK: customerPlantId,
      miscPickupID: miscPickupID || null,
      pickupCustomerPlantFK: pickupAtPlant ? pickupCustomerPlantFK : null,
      pickupDealerFK: unit.pickupDealerFK,
      city: miscPickupID ? city : null,
      stateCode: miscPickupID ? stateCode : null,
    });

    if (result?.data) {
      setMultiUnitRawList(result.data);
    }
  };

  useEffect(() => {
    if (
      unit.multiUnit &&
      unit.unitsPerDispatchUnit &&
      multiUnitFilteredList.length &&
      !defaultLoaded &&
      (unit.deliveryDealerFK ||
        selectedDeliveryDealer?.unitAddressId ||
        selectedDeliveryDealer?.customerPlantPK ||
        selectedPickupDealer?.unitAddressId)
    ) {
      debounceFetchMultiUnitLoadData();
    }
  }, [unit.multiUnit, unit.unitsPerDispatchUnit, multiUnitFilteredList, defaultLoaded]);

  useEffect(() => {
    if (!unit.multiUnit || !unit.unitsPerDispatchUnit) {
      setMultiUnitFilteredList([]);
      setDefaultLoaded(false);
      updateUnitFields({ unitMultiLoadPK: null, unitMultiLoadName: "" });
      return;
    }
    if (selectedUnitType?.allowTruckCamper) {
      const filtered = multiUnitRawList.filter(
        (item) => item.totalUnits === Number(unit.unitsPerDispatchUnit) && item.truckCamperLoad
      );
      setMultiUnitFilteredList(filtered);
    } else if (multiUnitPopupLoad) {
      const filtered = multiUnitRawList.filter(
        (item) => item.totalUnits === Number(unit.unitsPerDispatchUnit) && item.popupLoad
      );
      setMultiUnitFilteredList(filtered);
    } else {
      const filtered = multiUnitRawList.filter(
        (item) =>
          item.totalUnits === Number(unit.unitsPerDispatchUnit) && !item.popupLoad && !item.truckCamperLoad
      );
      setMultiUnitFilteredList(filtered);
    }
    setDefaultLoaded(false); // allow default reload on change
  }, [unit.unitsPerDispatchUnit, unit.multiUnit, multiUnitRawList]);

  useEffect(() => {
    updateUnitFields({ brokerFK: null, brokerName: "", poeFK: null, poeName: "" });

    if (!selectedPickupDealer?.canadian && selectedDeliveryDealer?.canadian) {
      if (customerDealerList?.brokerFK) {
        updateUnitFields({
          brokerFK: customerDealerList?.brokerFK?.exportBrokerPK || null,
          brokerName: customerDealerList?.brokerFK?.name || "",
        });
      } else if (selectedDeliveryDealer?.brokerfk) {
        updateUnitFields({
          brokerFK: selectedDeliveryDealer?.brokerfk?.exportBrokerPK || null,
          brokerName: selectedDeliveryDealer?.brokerfk?.name || "",
        });
      }

      if (customerDealerList?.poefk) {
        updateUnitFields({
          poeFK: customerDealerList?.poefk?.poePK || null,
          poeName: customerDealerList?.poefk?.usCity || "",
        });
      }
    }

    if (selectedPickupDealer?.canadian && !selectedDeliveryDealer?.canadian) {
      if (selectedCustomer?.importBrokerFK) {
        updateUnitFields({
          brokerFK: selectedCustomer?.importBrokerFK?.importBrokerFK || null,
          brokerName: selectedCustomer?.importBrokerFK?.name || "",
        });
      }
    }
  }, [selectedPickupDealer, selectedDeliveryDealer, customerDealerList]);

  useEffect(() => {
    fetchGetMultiUnitLoadData();
  }, [unit.multiUnit, batchLoads]);

  useEffect(() => {
    if (
      selectedCustomer.maximumLengthHaulAndTow > 0 &&
      selectedUnitType.length <= selectedCustomer.maximumLengthHaulAndTow
    ) {
      updateUnitFields({ multiUnit: true });
    } else {
      updateUnitFields({ multiUnit: false });
    }
  }, [selectedUnitType, pickupAtPlant, unit.deliveryDealerFK]);

  useEffect(() => {
    setValue("driveBys.driveBysTabRequired", unit.hasDrivebys && driveBysListing.length === 0, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [unit.hasDrivebys, driveBysListing.length]);

  useEffect(() => {
    updateUnitFields({
      invoiceFlatRate: "0",
      driverFlatRate: "0",
      invoiceMiles: "0",
      driverMiles: "0",
      multiUnit: false,
    });

    dispatch(setInvoiceFlat(0));
    dispatch(setDriverFlat(0));
    dispatch(setInvoiceAmount(0));
    dispatch(setDriverAmount(0));
  }, [selectedDeliveryDealer, selectedPickupDealer, unit.unitTypeFK]);

  useEffect(() => {
    if (deliveryDealerTWICRequired) {
      updateUnitFields({ TWICRequired: true });
    } else {
      updateUnitFields({ TWICRequired: false });
    }
  }, [deliveryDealerTWICRequired]);

  return {
    updateUnitFields,
    handleUnitTypeSelection,
    checkUnitNumberUniqe,
    handleSpecialCodeSelection,
    handlePickupDealerSelection,
    handleDeliveryDealerSelection,
    handleBrokerSelection,
    handlePortDetailsSelection,
    handleMultiUnitLoadSelection,
    customerRatesList,
    flaterateLoading,
    requiredCDLAHidden,
    invalidDate,
    setInvalidDate,
    invalidDateError,
    unitNumberOverRide,
    setUnitNumberOverRide,
    multiUnitFilteredList,
    invalidEarliestDeliveryDate,
    setInvalidEarliestDeliveryDate,
    invalidEarliestDeliveryDateError,
    invalidLatestDeliveryDate,
    setInvalidLatestDeliveryDate,
    invalidLatestDeliveryDateError,
    invalidEarliestPickupDate,
    setInvalidEarliestPickupDate,
    invalidEarliestPickupDateError,
    invalidLatestPickupDate,
    setInvalidLatestPickupDate,
    invalidLatestPickupDateError,
    cityMaxLimit,
    setCityMaxLimit,
    showMoreInfo,
    setShowMoreInfo,
    multiUnitLoadData,
    handleCityMaxLimitClose,
    multiLoadPcMilerDistance,
    showMultiLoadDistance,
    setShowMultiLoadDistance,
    citiesWithStatecode,
    distanceConfirmationYes,
    distanceLoading,
    loading,
    ratesLoading,
    fetchCalculateRatesDebouncer,
  };
};

export default useUnit;
