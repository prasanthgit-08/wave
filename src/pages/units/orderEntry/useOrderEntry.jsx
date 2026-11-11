import { parseLocalDate, toMoment } from "../../../utils/dateUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { buildOrderEntrySchema } from "./schemas";
import { useDispatch, useSelector } from "react-redux";
import { customerInitialState } from "./schemas/customer.schema";
import { notesInitailState } from "./schemas/notes.schema";
import { invoiceHoldInitailState } from "./schemas/invoiceHold.schema";
import { miscPickupInitailState } from "./schemas/miscPickup.schema";
import { onHoldInitailState } from "./schemas/onHold.schema";
import { miscCustomerInitialState } from "./schemas/miscCustomer.schema";
import { miscDeliveryInitailState } from "./schemas/miscDelivery.schema";
import { contactsInitailState } from "./schemas/contacts.schema";
import { unitInitailState } from "./schemas/unit.schema";
import toast from "react-hot-toast";
import { overWidthInitialState } from "./schemas/overWidth.schema";
import { openBalancesInitialState } from "./schemas/openBalances.schema";
import { creditCardInitailState } from "./schemas/creditCard.schema";
import { driveBysInitailState } from "./schemas/driveBys.schema";
import OrderEntryServices from "../../../service/orderEntry/orderEntry.service";
import { booleanToNumber, getCurrentCompany } from "../../../utils/utils";
import {
  setCreditCardTriggerKey,
  setDriverAmount,
  setInvoiceAmount,
  setMiscDeliveryID,
  setMiscPickupID,
  setOpenBalanceClear,
  setOpenBalanceTriggerKey,
  setOrderEntrySchemaConditions,
} from "../../../store/slices/unit.slice";

const useOrderEntry = () => {
  const [tab, setTab] = useState("customer");
  const [saveLoading, setSaveLoading] = useState(false);
  const [savedUnits, setSavedUnits] = useState([]);
  const [unSavedUnits, setUnSavedUnits] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [transIds, setTransIds] = useState("");
  const [preInvoiceModal, setPreInvoiceModal] = useState(false);
  const [preInvoiceResult, setPreInvoiceResult] = useState([]);
  const [unitActivation, setUnitActivation] = useState(false);
  const [unitActivationObj, setUnitActivationObj] = useState({});
  const [lockError, setLockError] = useState("");

  const dispatch = useDispatch();

  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [pendingValues, setPendingValues] = useState(null);

  const orderEntrySchemaConditions = useSelector((state) => state.unit.orderEntrySchemaConditions);
  const overWidthLoad = useSelector((state) => state.unit.orderEntrySchemaConditions?.unit?.overWidth);
  const isOpenBalancesDetailsPartial = useSelector((state) => state.unit.isOpenBalancesDetailsPartial);
  const isOpenBalancesDetailsInComplete = useSelector((state) => state.unit.isOpenBalancesDetailsInComplete);
  const unitRoutesListing = useSelector((state) => state.unit.unitRoutesListing);
  const driveBysListing = useSelector((state) => state.unit.driveBysListing);
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const selectedUnitType = useSelector((state) => state.unit.selectedUnitType);
  const selectedMultiUnitLoad = useSelector((state) => state.unit.selectedMultiUnitLoad);
  const selectedPickupDealer = useSelector((state) => state.unit.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);
  const isCreditCardDetailsInComplete = useSelector((state) => state.unit.isCreditCardDetailsInComplete);
  const isCreditCardDetailsPartial = useSelector((state) => state.unit.isCreditCardDetailsPartial);
  const invoiceRateObj = useSelector((state) => state.unit.invoiceRateObj);
  const driverRateObj = useSelector((state) => state.unit.driverRateObj);
  const driverRateStructure = useSelector((state) => state.unit.driverRateStructure);
  const invoiceRateStructure = useSelector((state) => state.unit.invoiceRateStructure);
  const allowedInvoicePercentage = useSelector((state) => state.unit.allowedInvoicePercentage);
  const invoiceAmount = useSelector((state) => state.unit.invoiceAmount);
  const unitOverride = useSelector((state) => state.unit.unitOverride);
  const multiUnitPopupLoad = useSelector((state) => state.unit.multiUnitPopupLoad);
  const miscPickupID = useSelector((state) => state.unit.miscPickupID);
  const miscDeliveryID = useSelector((state) => state.unit.miscDeliveryID);
  const customerDealerList = useSelector((state) => state.unit.customerDealerList);
  const invoiceRate = useSelector((state) => state.unit.invoiceRate);
  const driverRate = useSelector((state) => state.unit.driverRate);
  const apportionedRate = useSelector((state) => state.unit.apportionedRate);
  const selectedCustomerPickupPlant = useSelector((state) => state.unit.selectedCustomerPickupPlant);

  //isCreditCardRequired: false,

  const [showOpenBalancesWarning, setShowOpenBalancesWarning] = useState(false); // for open balances warning message
  const [showCreditCardWarning, setShowCreditCardWarning] = useState(false); // for creditcard warning message
  const schema = useMemo(
    () => buildOrderEntrySchema(orderEntrySchemaConditions),
    [orderEntrySchemaConditions]
  );

  const reactHookForm = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customer: customerInitialState,
      miscCustomer: miscCustomerInitialState,
      unit: unitInitailState,
      notes: notesInitailState,
      invoiceHolds: invoiceHoldInitailState,
      miscPickup: miscPickupInitailState,
      onHold: onHoldInitailState,
      miscDelivery: miscDeliveryInitailState,
      overWidth: overWidthInitialState,
      openBalances: openBalancesInitialState,
      contacts: contactsInitailState,
      creditCard: creditCardInitailState,
      driveBys: driveBysInitailState,
    },
    mode: "onChange",
  });

  const hasErrors = (tabName) => !!reactHookForm.formState?.errors[tabName];

  const generateBatchUnits = (baseUnit, startSeq, endSeq) => {
    // Safeguards
    if (!baseUnit || !startSeq || !endSeq) return [];

    // Sequences must be the same length and within the allowed max length (1–5).
    if (startSeq.length !== endSeq.length || startSeq.length === 0 || startSeq.length > 5) return [];

    const length = startSeq.length;

    // Build per-position "radix" (10 for digits, 26 for letters) and type map,
    // enforcing that both sequences have the same letter/number pattern.
    const radices = [];
    const types = []; // 'digit' | 'letter'

    for (let i = 0; i < length; i++) {
      const sChar = startSeq[i];
      const eChar = endSeq[i];

      const sIsLetter = /[A-Za-z]/.test(sChar);
      const eIsLetter = /[A-Za-z]/.test(eChar);
      const sIsDigit = /\d/.test(sChar);
      const eIsDigit = /\d/.test(eChar);

      // If one is letter and the other is digit, pattern is invalid.
      if (sIsLetter !== eIsLetter || sIsDigit !== eIsDigit) {
        return [];
      }

      if (sIsDigit) {
        radices.push(10);
        types.push("digit");
      } else if (sIsLetter) {
        radices.push(26);
        types.push("letter");
      } else {
        // Should not happen because upstream validation restricts to letters/numbers only.
        return [];
      }
    }

    // Ensure each sequence has at least one number somewhere.
    if (!/\d/.test(startSeq) || !/\d/.test(endSeq)) return [];

    // Convert a sequence into a mixed‑radix integer index.
    const seqToIndex = (seq) => {
      let index = 0;

      for (let i = 0; i < length; i++) {
        const ch = seq[i];
        const radix = radices[i];
        let value;

        if (types[i] === "digit") {
          value = parseInt(ch, 10);
          if (Number.isNaN(value) || value < 0 || value >= radix) return null;
        } else {
          // letter
          const upper = ch.toUpperCase();
          value = upper.charCodeAt(0) - "A".charCodeAt(0);
          if (value < 0 || value >= radix) return null;
        }

        index = index * radix + value;
      }

      return index;
    };

    // Convert a mixed‑radix integer index back into a sequence string.
    const indexToSeq = (index) => {
      const chars = new Array(length);

      for (let i = length - 1; i >= 0; i--) {
        const radix = radices[i];
        const value = index % radix;
        index = Math.floor(index / radix);

        if (types[i] === "digit") {
          chars[i] = String(value);
        } else {
          chars[i] = String.fromCharCode("A".charCodeAt(0) + value);
        }
      }

      const result = chars.join("");

      // BUSINESS RULE:
      // If trailing numeric block becomes all zeros → convert to 01

      const match = result.match(/(\d+)$/); // get trailing digits

      if (match) {
        const trailing = match[1];

        if (/^0+$/.test(trailing)) {
          const fixed = "0".repeat(trailing.length - 1) + "1";

          return result.slice(0, -trailing.length) + fixed;
        }
      }

      return result;
    };

    const startIndex = seqToIndex(startSeq);
    const endIndex = seqToIndex(endSeq);

    if (startIndex === null || endIndex === null || endIndex < startIndex) return [];

    return Array.from({ length: endIndex - startIndex + 1 }, (_, i) => {
      const seq = indexToSeq(startIndex + i);
      return `${baseUnit}${seq}`;
    });
  };

  const validateBusinessRules = (values) => {
    const { customer, unit, creditCard, onHold } = values;

    if (customer.openBalancePrepaid && (isOpenBalancesDetailsPartial || isOpenBalancesDetailsInComplete)) {
      return { type: "OPEN_BALANCE_WARNING" };
    }

    if (customer.creditCardPrepaid && (isCreditCardDetailsInComplete || isCreditCardDetailsPartial)) {
      return { type: "CREDIT_CARD_INVALID" };
    }

    if (unit.unitOnHold && !onHold?.authorizedBy) {
      return { type: "UNIT_HOLD_INVALID" };
    }

    return { type: "OK" };
  };

  const resetTabsDatas = (customerValues) => {
    let obj = {};
    if (customerValues?.duplicateLoads) {
      dispatch(setOpenBalanceTriggerKey());

      obj = { ...pendingValues?.unit, unitNumber: "", vin: "" };
    } else {
      dispatch(setInvoiceAmount(0));
      dispatch(setDriverAmount(0));
      dispatch(setOpenBalanceClear(true)); // for clearing creditcard tab fields
      dispatch(setMiscDeliveryID(null));
      dispatch(setMiscPickupID(null));
      dispatch(
        setOrderEntrySchemaConditions({ invoiceFlatRateRequired: true, driverFlatRateRequired: true })
      );
      let preventUnitObjData = {};
      if (pendingValues?.customer?.bulkInvoiceFK) {
        preventUnitObjData.projectCode = pendingValues?.unit?.projectCode;
        preventUnitObjData.poNumber = pendingValues?.unit?.poNumber;
      }

      if (selectedCustomer?.authorizedBy) {
        preventUnitObjData.authorizedBy = pendingValues?.unit?.authorizedBy;
      }

      if (selectedCustomer?.miscellaneous1) {
        preventUnitObjData.miscellaneousBOLText = pendingValues?.unit?.miscellaneousBOLText;
      }
      obj = { ...unitInitailState, ...preventUnitObjData };
    }
    if (pendingValues?.customer?.creditCardPrepaid) {
      dispatch(setCreditCardTriggerKey(true));
    }
    reactHookForm.reset({
      customer: customerValues,
      miscCustomer: selectedCustomer?.miscellaneousCustomer
        ? pendingValues?.miscCustomer
        : miscCustomerInitialState,
      unit: obj,
      notes: notesInitailState,
      invoiceHolds: invoiceHoldInitailState,
      miscPickup: miscPickupInitailState,
      onHold: onHoldInitailState,
      miscDelivery: miscDeliveryInitailState,
      overWidth: overWidthInitialState,
      openBalances: openBalancesInitialState,
      contacts: contactsInitailState,
      creditCard: creditCardInitailState,
      driveBys: driveBysInitailState,
    });

    if (pendingValues?.customer?.duplicateLoads) reactHookForm.trigger("unit");
  };

  const handlePreSubmit = (values) => {
    const result = validateBusinessRules(values);

    switch (result.type) {
      case "OPEN_BALANCE_WARNING":
        setPendingValues(values);
        setShowOpenBalancesWarning(true);
        break;

      case "CREDIT_CARD_INVALID":
        setPendingValues(values);
        setShowCreditCardWarning(true);
        break;

      case "UNIT_HOLD_INVALID":
        toast.error("Authorization is required for Unit Hold");
        break;

      case "OK":
        setPendingValues(values);
        setShowOrderConfirmation(true);
        break;

      default:
        break;
    }
  };

  const toBool = (val) => (val ? 1 : 0);

  const contactFormat = (datas = []) => {
    const userContactFK = JSON.parse(localStorage.getItem("loggedInUserData"))?.userPK || null;
    return datas?.map((item) => {
      const {
        alternateContactPK,
        customerContactPK,
        name,
        phone,
        fax,
        useOnBol,
        delayContact,
        customerPlantContactPK,
        dealerContactPK,
        ...rest
      } = item;
      return {
        alternateContactFK: item?.alternateContactPK,
        customerContactFK: item?.customerContactPK,
        customerPlantContactFK: item?.customerPlantContactPK,
        dealerContactFK: item?.dealerContactPK,
        contactName: item?.name,
        contactPhone: item?.phone,
        bolFAX: item?.fax,
        userContactFK: item?.frontendRecord ? null : userContactFK,
        master: toBool(item?.useOnBol),
        deliveryDelayContact: toBool(item?.delayContact),
        description: item?.contact,
        ...rest,
      };
    });
  };
  const buildPayloadNew = (values) => {
    const {
      customer,
      unit,
      miscCustomer,
      notes,
      invoiceHolds,
      miscPickup,
      miscDelivery,
      onHold,
      overWidth,
      contacts,
      creditCard,
      openBalances,
    } = values;

    // Helper to safely format numbers or return defaults
    const toNumStr = (val, decimals = 2) => (val ? Number(val).toFixed(decimals) : (0).toFixed(decimals));

    const isInvoiceFlatrated = !!Number(unit?.invoiceFlatRate);
    const isDriverFlatrated = !!Number(unit?.driverFlatRate);
    const company = getCurrentCompany();
    const plantRelease =
      customer?.pickupAtPlant && selectedCustomer?.requireFactoryRelease && company?.requirePlantReleases
        ? unit.plantRelease
        : true;

    return {
      OrderEntryInfo: {
        UnitsList: {
          Unit: {
            unitNumber: unit.unitNumber,
            unitOverride: toBool(unitOverride),
            model: unit.model,
            vin: unit.vin,
            printBOL: toBool(customer.printBOL),
            bolPrinterFK: customer.bolPrinterFk || 0,
            serialNumber: unit.serialNumber,
            stockNumber: unit.stockNumber,
            modelCode: unit.modelCode,
            customerFK: customer.customerDataId,
            customerPlantFK: customer.customerPlantId || 0,
            miscellaneousDelivery: toBool(unit.miscellaneousDelivery),
            deliverToPlant: toBool(customer.deliverToPlant),
            deliveryCustomerPlantFK: customer.deliverToPlant ? customer.deliveryCustomerPlantFK : null,
            shuttleFromYard: customer.deliverToPlant ? toBool(customer.shuttleFromYard) : 0,
            deliveryYardFK:
              customer.deliverToPlant && customer.shuttleFromYard ? customer.deliveryYardFK : null,
            deliveryShuttleCityFK:
              customer.deliverToPlant && customer.shuttleFromYard ? customer.deliveryShuttleCityFK : null,
            noDeliveryPulloutFee:
              customer.deliverToPlant && customer.shuttleFromYard ? toBool(customer.noDeliveryPulloutFee) : 0,
            pickupDealerFK: unit.pickupDealerFK,
            miscellaneousPickup: toBool(unit.miscellaneousPickup),
            pickupAtPlant: toBool(customer.pickupAtPlant),
            pickupCustomerPlantFK: customer.pickupAtPlant ? customer.pickupCustomerPlantFK : null,
            pickupCustomerFK: null,
            shuttleToYard: customer.pickupAtPlant ? toBool(customer.shuttleToYard) : 0,
            pickupYardFK: customer.pickupAtPlant && customer.shuttleToYard ? customer.pickupYardFK : null,
            pickupShuttleCityFK:
              customer.pickupAtPlant && customer.shuttleToYard ? customer.pickupShuttleCityFK : null,
            unitTypeFK: unit.unitTypeFK,
            specialCodeFK: unit.specialCodeFK,
            authorizedBy: unit.authorizedBy,
            collectForCustomer: unit.collectForCustomer || 0,
            reload: toBool(customer.reload),
            returnRates: toBool(customer.returnRates),
            creditCardPrepaid: toBool(customer.creditCardPrepaid),
            bulkUnit: toBool(customer.bulkUnit),
            bulkInvoiceFK: customer.bulkInvoiceFK,
            checkPrepaid: toBool(customer.checkPrepaid),
            openBalancePrepaid: toBool(customer.openBalancePrepaid),
            prepaidAmount: "0.00",
            dealerPickup: toBool(unit.dealerPickup),
            storage: toBool(unit.storage),
            // local wall-clock, no UTC shift (toISOString would send 05:00 for an Indiana midnight)
            orderDate: unit.orderDate ? toMoment(unit.orderDate).format("YYYY-MM-DDTHH:mm:ss") : "",
            plantRelease: toBool(plantRelease),
            plantCode: customer.pickupAtPlant && customer.pickupCustomerPlantFK ? customer.plantCode : null,
            dispatchReleaseDate: unit.dispatchReleaseDate,
            deliverByDate: unit.deliverByDate,
            minimumPickupDate: unit.minimumPickupDate,
            maximumPickupDate: unit.maximumPickupDate,
            minimumDeliveryDate: unit.minimumDeliveryDate,
            maximumDeliveryDate: unit.maximumDeliveryDate,
            miscellaneousBOLText1: unit.miscellaneousBOLText?.[0] ?? "",
            miscellaneousBOLText2: unit.miscellaneousBOLText?.[1] ?? "",
            miscellaneousBOLText3: unit.miscellaneousBOLText?.[2] ?? "",
            miscellaneousBOLText4: unit.miscellaneousBOLText?.[3] ?? "",
            miscellaneousBOLText5: unit.miscellaneousBOLText?.[4] ?? "",
            miscellaneousBOLText6: unit.miscellaneousBOLText?.[5] ?? "",
            miscellaneousBOLText7: unit.miscellaneousBOLText?.[6] ?? "",
            invoiceMiles: unit.invoiceMiles,
            driverMiles: unit.driverMiles,
            invoiceFlatRate: isInvoiceFlatrated
              ? toNumStr(unit.invoiceFlatRate)
              : toNumStr(invoiceRateObj?.invoiceFlatrate),
            driverFlatRate: isDriverFlatrated
              ? toNumStr(unit.driverFlatRate)
              : toNumStr(driverRateObj?.driverFlatrate),
            invoicePortEscortFee: unit.invoicePortEscortFee || 0,
            invoiceELDFee: unit.invoiceELDFee || 0,
            driverELDFee: unit.driverELDFee || 0,
            fodInvoiceAmount: customer.fodInvoice ? invoiceAmount : 0,
            fodInvoice: customer.fodInvoice ? 1 : 0,
            invoiceFODBreakdownToDealer: toBool(unit.invoiceFODBreakdownToDealer),
            unitOnInvoiceHold: invoiceHolds.invoiceHold === true ? "1" : "0",
            invoiceHoldReason: invoiceHolds.invoiceHoldNotes,
            noPickupPulloutFee:
              customer.pickupAtPlant && customer.shuttleToYard ? toBool(customer.noPickupPulloutFee) : 0,
            multiUnit: toBool(unit.multiUnit),
            unitMultiLoadPK: unit.unitMultiLoadPK || null,
            popup: toBool(multiUnitPopupLoad),
            requireFlatbed: toBool(unit.unitsPerDispatchUnit > 2 ? 0 : unit.requireFlatbed),
            twoAsThree: toBool(unit.twoAsThree),
            unitsPerDispatch: unit.multiUnit ? unit.unitsPerDispatchUnit : 1,
            notes: notes.unitNotes,
            dispatchNotes: notes.dispatchNotes,
            diesel: toBool(selectedUnitType?.towable ? 1 : unit.gas === "enginediesel"),
            gas: toBool(selectedUnitType?.towable ? 0 : unit.gas === "enginegas"),
            ifta: toBool(unit.ifta),
            unitOnHold: toBool(unit.unitOnHold),
            doNotDispatch: toBool(unit.doNotDispatch),
            poNumber: unit.poNumber,
            plantOrderNumber: unit.plantOrderNumber,
            invoiceCustomerRateFK: Number(unit.invoiceFlatRate)
              ? null
              : invoiceRateStructure?.customerRatePK || null,
            driverCustomerRateFK: Number(unit.driverFlatRate)
              ? null
              : driverRateStructure?.customerRatePK || null,
            twicRequired: toBool(unit.TWICRequired),
            tankerRequired: toBool(unit.tankerRequired),
            cdlaRequired: toBool(unit.cdlaRequired),
            overWidthLoad: toBool(overWidthLoad),
            bank: unit.bank,
            client: unit.client,
            hasDrivebys: toBool(unit.hasDrivebys),
            brokerFK: unit.brokerFK,
            poeFK: unit.poeFK,
            freezePOE: toBool(unit.freezePOE),
            deliveryDelayContact: toBool(unit.deliveryDelayContact),
            overInvoicePercentage: allowedInvoicePercentage,
            gvwr: unit.gvwr,
            shippingWeight: unit.shippingWeight,
            commission: unit.commission,
            projectCode: unit.projectCode,
            driverTolls: unit.maximumTolls || 0,
            driverPermits: unit.maximumPermits,
            maximumWash: customerDealerList?.driverMaxWashAmount || 0,
            deliveryDealerFK: unit.deliveryDealerFK,
            customerDPUPickupFK: unit.customerDPUPickupsVO?.customerDPUPickupFK || 0,
            deliveryUnitAddressFK: miscDeliveryID || 0,
            pickupUnitAddressFK: miscPickupID || 0,
            customerAddressFK: unit.customerAddressFK || 0,
            batchLoads: customer.batchLoads ? 1 : 0,
            firstBatchSequence: customer.firstBatchSequence?.toUpperCase(),
            lastBatchSequence: customer.lastBatchSequence?.toUpperCase(),
            noInvoice: toBool(unit.noInvoice),
          },
        },
        CustomerAddresses: {
          name: miscCustomer?.name,
          address1: miscCustomer?.address1,
          address2: miscCustomer?.address2,
          city: miscCustomer?.city,
          stateCode: miscCustomer?.stateCode,
          postalCode: miscCustomer?.postalCode,
          phone: miscCustomer?.phone?.replace(/\s+/g, ""),
          fax: miscCustomer?.fax?.replace(/\s+/g, ""),
          email: miscCustomer?.email,
          contact: miscCustomer?.contact,
          quickPayTerms: miscCustomer?.quickPayTerms,
        },
        CustomerDPUPickups: { owner: unit.customerDPUPickupsVO || "" },
        PickupUnitAddresses: {
          name: miscPickup.name,
          address1: miscPickup.address1,
          address2: miscPickup.address2,
          city: miscPickup.city,
          stateCode: miscPickup.stateCode,
          postalCode: miscPickup.postalCode,
          phone: miscPickup.phone?.replace(/\s+/g, ""),
          email: miscPickup.email,
          deliveryContact: miscPickup.contact,
          deliveryContactPhone: miscPickup.contactPhone?.replace(/\s+/g, ""),
          hours: miscPickup.driverEmailHours,
          directions: miscPickup.driverEmailDirections,
          openSunday: toBool(miscPickup.openSunday),
          openMonday: toBool(miscPickup.openMonday),
          openTuesday: toBool(miscPickup.openTuesday),
          openWednesday: toBool(miscPickup.openWednesday),
          openThursday: toBool(miscPickup.openThursday),
          openFriday: toBool(miscPickup.openFriday),
          openSaturday: toBool(miscPickup.openSaturday),
        },
        DeliveryUnitAddresses: {
          name: miscDelivery.name,
          address1: miscDelivery.address1,
          address2: miscDelivery.address2,
          city: miscDelivery.city,
          stateCode: miscDelivery.stateCode,
          postalCode: miscDelivery.postalCode,
          phone: miscDelivery.phone?.replace(/\s+/g, ""),
          email: miscDelivery.email,
          deliveryContact: miscDelivery.contact,
          deliveryContactPhone: miscDelivery.contactPhone?.replace(/\s+/g, ""),
          hours: miscDelivery.driverEmailHours,
          directions: miscDelivery.driverEmailDirections,
          washInstructions: miscDelivery.driverEmailWashInstructions,
          bolTextHours1: miscDelivery?.bolTextHoursInputValues?.[0] ?? "",
          bolTextHours2: miscDelivery?.bolTextHoursInputValues?.[1] ?? "",
          bolTextHours3: miscDelivery?.bolTextHoursInputValues?.[2] ?? "",
          bolTextDirections1: miscDelivery?.bolTextDirectionsInputValues?.[0] ?? "",
          bolTextDirections2: miscDelivery?.bolTextDirectionsInputValues?.[1] ?? "",
          bolTextDirections3: miscDelivery?.bolTextDirectionsInputValues?.[2] ?? "",
          bolTextDirections4: miscDelivery?.bolTextDirectionsInputValues?.[3] ?? "",
          bolTextDirections5: miscDelivery?.bolTextDirectionsInputValues?.[4] ?? "",
          bolTextDirections6: miscDelivery?.bolTextDirectionsInputValues?.[5] ?? "",
          bolTextDirections7: miscDelivery?.bolTextDirectionsInputValues?.[6] ?? "",
          washInstructions1: miscDelivery?.bolTextWashInstructionsInputValues?.[0] ?? "",
          washInstructions2: miscDelivery?.bolTextWashInstructionsInputValues?.[1] ?? "",
          washInstructions3: miscDelivery?.bolTextWashInstructionsInputValues?.[2] ?? "",
          washInstructions4: miscDelivery?.bolTextWashInstructionsInputValues?.[3] ?? "",
          washInstructions5: miscDelivery?.bolTextWashInstructionsInputValues?.[4] ?? "",
          bolTextOtherText1: miscDelivery?.bolTextOtherInputValues?.[0] ?? "",
          bolTextOtherText2: miscDelivery?.bolTextOtherInputValues?.[1] ?? "",
          bolTextOtherText3: miscDelivery?.bolTextOtherInputValues?.[2] ?? "",
          bolTextMiscellaneous1: miscDelivery?.bolTextMiscellaneousInputValues?.[0] ?? "",
          bolTextMiscellaneous2: miscDelivery?.bolTextMiscellaneousInputValues?.[1] ?? "",
          bolTextMiscellaneous3: miscDelivery?.bolTextMiscellaneousInputValues?.[2] ?? "",
          bolTextMiscellaneous4: miscDelivery?.bolTextMiscellaneousInputValues?.[3] ?? "",
          bolTextMiscellaneous5: miscDelivery?.bolTextMiscellaneousInputValues?.[4] ?? "",
          bolTextMiscellaneous6: miscDelivery?.bolTextMiscellaneousInputValues?.[5] ?? "",
          bolTextMiscellaneous7: miscDelivery?.bolTextMiscellaneousInputValues?.[6] ?? "",
          openSunday: toBool(miscDelivery.openSunday),
          openMonday: toBool(miscDelivery.openMonday),
          openTuesday: toBool(miscDelivery.openTuesday),
          openWednesday: toBool(miscDelivery.openWednesday),
          openThursday: toBool(miscDelivery.openThursday),
          openFriday: toBool(miscDelivery.openFriday),
          openSaturday: toBool(miscDelivery.openSaturday),
        },
        PickupUnitShuttles: {
          pickupCustomerPlantFK: customer.pickupAtPlant ? customer.pickupCustomerPlantFK : null,
          pickupShuttleCityFK: customer.pickupAtPlant ? customer.pickupShuttleCityFK : null,
          dropYardFK: customer.pickupAtPlant ? customer.pickupYardFK : null,
          plantToYard: customer.pickupAtPlant ? toBool(customer.shuttleToYard) : 0,
        },
        DeliveryUnitShuttles: {
          dropCustomerPlantFK: customer.deliverToPlant ? customer.deliveryCustomerPlantFK : null,
          dropShuttleCityFK: customer.deliverToPlant ? customer.deliveryShuttleCityFK : null,
          pickupYardFK: customer.deliverToPlant ? customer.deliveryYardFK : null,
          yardToPlant: customer.deliverToPlant ? toBool(customer.shuttleFromYard) : 0,
        },
        UnitHolds: {
          authorizedBy: onHold.authorizedBy,
          holdReleaseDate: onHold.releaseDate,
          reason: onHold.reasonForHold,
          notes: onHold.notes,
        },
        UnitDriveBysList: {
          UnitDriveBy: unit.hasDrivebys ? (booleanToNumber(driveBysListing) ?? []) : [],
          __text: "-- Same for both units",
        },
        UnitOverWidthPermits: {
          trailerOnly: toBool(overWidth?.trailerOnly),
          trailerMake: overWidth?.trailerMake,
          trailerVIN: overWidth?.trailerVIN,
          trailerYear: overWidth?.trailerYear,
          trailerLengthFoot: overWidth?.trailerLengthFoot,
          trailerLengthInch: overWidth?.trailerLengthInch,
          trailerWidthFoot: overWidth?.trailerWidthFoot,
          trailerWidthInch: overWidth?.trailerWidthInch,
          trailerHeightFoot: overWidth?.trailerHeightFoot,
          trailerHeightInch: overWidth?.trailerHeightInch,
          trailerAxles: overWidth?.trailerAxles,
          axleSpreadFoot: overWidth?.axleSpreadFoot,
          axleSpreadInch: overWidth?.axleSpreadInch,
          trailerOverhangs: toBool(overWidth?.trailerOverhangs),
          trailerOverhangFoot: overWidth?.trailerOverhangFoot,
          trailerOverhangInch: overWidth?.trailerOverhangInch,
          boatMake: overWidth?.boatMake,
          hullId: overWidth?.hullId,
          boatLengthFoot: overWidth?.boatLengthFoot,
          boatLengthInch: overWidth?.boatLengthInch,
          boatWidthFoot: overWidth?.boatWidthFoot,
          boatWidthInch: overWidth?.boatWidthInch,
          boatHeightFoot: overWidth?.boatHeightFoot,
          boatHeightInch: overWidth?.boatHeightInch,
          totalHeightFoot: overWidth?.totalHeightFoot,
          totalHeightInch: overWidth?.totalHeightInch,
          permitAmount: overWidth?.permitAmount,
          invoiceAmount: overWidth?.invoiceAmount,
          permitInvoiceNumber: overWidth?.permitInvoiceNumber,
        },
        UnitContactsList: {
          Contact: contactFormat(contacts?.assignedContactsArray),
        },
        UnitOpenBalances: {
          OpenBalance: openBalances.openBalancesArray?.filter((item) => item.applied > 0),
          __text: "-- Only for first entry",
        },

        MonetraCharges: {
          Charges: booleanToNumber(creditCard.creditCardArray) || [],
        },

        UnitRoutesList: {
          Route: booleanToNumber(unitRoutesListing),
        },
        Rates: {
          Rate: {
            unitNumber: unit.unitNumber,
            invoiceCDLARate: !isInvoiceFlatrated ? invoiceRateObj?.invoiceCDLARate || 0 : 0,
            invoiceCDLAReturn: !isInvoiceFlatrated ? toBool(invoiceRateObj?.invoiceCDLAReturn) || 0 : 0,
            invoiceSupplementalRate: !isInvoiceFlatrated ? invoiceRateObj?.invoiceSupplementalRate || 0 : 0,
            invoiceSupplementalFuelSurchargeRate: !isInvoiceFlatrated
              ? invoiceRateObj?.invoiceSupplementalFuelSurchargeRate || 0
              : 0,
            invoiceSupplementalDescription: !isInvoiceFlatrated
              ? invoiceRateObj?.invoiceSupplementalDescription
              : "",
            invoiceSupplementalReturn: !isInvoiceFlatrated
              ? toBool(invoiceRateObj?.invoiceSupplementalReturn)
              : 0,
            invoiceLengthRate: !isInvoiceFlatrated ? invoiceRateObj?.invoiceLengthRate || 0 : 0,
            invoiceLengthReturn: !isInvoiceFlatrated ? toBool(invoiceRateObj?.invoiceLengthReturn) : 0,
            invoiceSpecialRate: !isInvoiceFlatrated ? invoiceRateObj?.invoiceSpecialRate || 0 : 0,
            invoiceSpecialFuelSurchargeRate: !isInvoiceFlatrated
              ? invoiceRateObj?.invoiceSpecialFuelSurchargeRate || 0
              : 0,
            invoiceSpecialDescription: !isInvoiceFlatrated ? invoiceRateObj?.invoiceSpecialDescription : "",
            invoiceSpecialReturn: !isInvoiceFlatrated ? toBool(invoiceRateObj?.invoiceSpecialReturn) : 0,
            invoiceAdditionalRate: !isInvoiceFlatrated ? invoiceRateObj?.invoiceAdditionalRate || 0 : 0,
            invoiceAdditionalFuelSurchargeRate: !isInvoiceFlatrated
              ? invoiceRateObj?.invoiceAdditionalFuelSurchargeRate || 0
              : 0,
            invoiceAdditionalDescription: !isInvoiceFlatrated
              ? invoiceRateObj?.invoiceAdditionalDescription
              : "",
            invoiceAdditionalFlatRate: !isInvoiceFlatrated
              ? invoiceRateObj?.invoiceAdditionalFlatRate || 0
              : 0,
            invoiceAdditionalReturn: !isInvoiceFlatrated
              ? toBool(invoiceRateObj?.invoiceAdditionalReturn)
              : 0,
            invoiceCanadianCharge: !isInvoiceFlatrated ? invoiceRateObj?.invoiceCanadianCharge || 0 : 0,
            invoiceUSCharge: !isInvoiceFlatrated ? invoiceRateObj?.invoiceUSCharge || 0 : 0,
            driverSupplementalRate: !isDriverFlatrated ? driverRateObj?.driverSupplementalRate || 0 : 0,
            driverSupplementalFuelSurchargeRate: !isDriverFlatrated
              ? driverRateObj?.driverSupplementalFuelSurchargeRate || 0
              : 0,
            driverSupplementalDescription: !isDriverFlatrated
              ? driverRateObj?.driverSupplementalDescription
              : "",
            driverSupplementalReturn: !isDriverFlatrated
              ? toBool(driverRateObj?.driverSupplementalReturn)
              : 0,
            driverCDLARate: !isDriverFlatrated ? driverRateObj?.driverCDLARate || 0 : 0,
            driverCDLAReturn: !isDriverFlatrated ? toBool(driverRateObj?.driverCDLAReturn) : 0,
            driverLengthRate: !isDriverFlatrated ? driverRateObj?.driverLengthRate || 0 : 0,
            driverLengthReturn: !isDriverFlatrated ? toBool(driverRateObj?.driverLengthReturn) : 0,
            driverSpecialRate: !isDriverFlatrated ? driverRateObj?.driverSpecialRate || 0 : 0,
            driverSpecialFuelSurchargeRate: !isDriverFlatrated
              ? driverRateObj?.driverSpecialFuelSurchargeRate || 0
              : 0,
            driverSpecialDescription: !isDriverFlatrated ? driverRateObj?.driverSpecialDescription : "",
            driverSpecialReturn: !isDriverFlatrated ? toBool(driverRateObj?.driverSpecialReturn) : 0,
            driverAdditionalRate: !isDriverFlatrated ? driverRateObj?.driverAdditionalRate || 0 : 0,
            driverAdditionalFuelSurchargeRate: !isDriverFlatrated
              ? driverRateObj?.driverAdditionalFuelSurchargeRate || 0
              : 0,
            driverAdditionalDescription: !isDriverFlatrated ? driverRateObj?.driverAdditionalDescription : "",
            driverAdditionalFlatRate: !isDriverFlatrated ? driverRateObj?.driverAdditionalFlatRate || 0 : 0,
            driverAdditionalReturn: !isDriverFlatrated ? toBool(driverRateObj?.driverAdditionalReturn) : 0,
            halfTonAdjustmentRate: 0,
            driverCanadianCharge: !isDriverFlatrated ? driverRateObj?.driverCanadianCharge || 0 : 0,
            driverUSCharge: !isDriverFlatrated ? driverRateObj?.driverUSCharge || 0 : 0,
            // Actual values from state
            invoiceFlatRate: isInvoiceFlatrated
              ? toNumStr(unit.invoiceFlatRate)
              : toNumStr(invoiceRateObj?.invoiceFlatrate),
            driverFlatRate: isDriverFlatrated
              ? toNumStr(unit.driverFlatRate)
              : toNumStr(driverRateObj?.driverFlatrate),
            invoiceRate: Number(unit.invoiceFlatRate) ? 0 : invoiceRate || 0,
            driverRate: Number(unit.driverFlatRate) ? 0 : driverRate || 0,
            invoiceApportionedRate: Number(unit.invoiceFlatRate) ? 0 : apportionedRate?.Invoice?.Amount || 0,
            invoiceApportionedReturn:
              Number(unit.invoiceFlatRate) || !apportionedRate?.Invoice?.Amount
                ? 0
                : toBool(apportionedRate?.Invoice?.UseApportionedReturns),
            driverApportionedRate: Number(unit.driverFlatRate) ? 0 : apportionedRate?.Driver?.Amount || 0,
            driverApportionedReturn:
              Number(unit.driverFlatRate) || !apportionedRate?.Driver?.Amount
                ? 0
                : toBool(apportionedRate?.Driver?.UseApportionedReturns),
            invoiceReturnRate: Number(unit.invoiceFlatRate) ? 0 : invoiceRateObj?.invoiceReturnRate || 0,
            driverReturnRate: Number(unit.driverFlatRate) ? 0 : driverRateObj?.driverReturnRate || 0,
            invoiceReturnFlatRate: invoiceRateObj?.invoiceReturnFlatRate || 0,
            driverReturnFlatRate: driverRateObj?.driverReturnFlatRate || 0,
            invoiceFuelSurchargeRate: !isInvoiceFlatrated ? invoiceRateObj?.invoiceFuelSurchargeRate || 0 : 0,
            driverFuelSurchargeRate: !isDriverFlatrated ? driverRateObj?.driverFuelSurchargeRate || 0 : 0,
          },
        },
      },
      transIds: transIds || "",
    };
  };

  const saveOrder = async (values) => {
    const payload = buildPayloadNew(values);
    return OrderEntryServices.saveOrderEntryNew(payload);
  };

  const handleOrderConfirmationSave = async () => {
    try {
      setSaveLoading(true);
      if (pendingValues?.customer?.creditCardPrepaid) {
        dispatch(setCreditCardTriggerKey(false));
      }
      dispatch(setOpenBalanceClear(false));
      const res = await saveOrder(pendingValues);
      handleComplete();
      const data = res?.data;

      const errorCode = data?.ErrorResponse?.[0]?.ErrorCode;

      if (errorCode === 1 || errorCode === 2) {
        setLockError(data?.ErrorResponse?.[0]?.ErrorMsg);
        return;
      }
      if (data) {
        setSavedUnits(data.SavedUnits);
        setUnSavedUnits(data.UnsavedUnits);
        if (data?.InvoiceDetails?.[0]?.length) {
          setPreInvoiceResult(data?.InvoiceDetails[0]);
          setPreInvoiceModal(true);
        }
        if (data.SavedUnits?.length === 0) {
          toast.error("Order not saved");
          return;
        }

        if (data.SavedUnits?.length > 0 && data.UnsavedUnits?.length === 0) {
          setSuccessMsg("Order has been saved successfully !!");
          setShowSuccess(true);
          if (pendingValues?.unit?.activateDispatch) {
            setUnitActivation(true);
            const obj = {
              unitNumber: data.SavedUnits[0],
              last5: data.SavedUnits[0]?.slice(-5),
              unitIdOE: data.UnitsForActivate[0],
            };
            setUnitActivationObj(obj);
          }
          toast.success("Order saved successfully");

          if (pendingValues?.customer?.duplicateLoads) {
            setSuccessMsg(
              "Order has been saved successfully !!\nDuplicate load is set on customer tab. Please enter Unit Number & Vin"
            );
          }
        }

        if (pendingValues?.customer?.batchLoads) {
          if (data.SavedUnits?.length > 0 && data.UnsavedUnits?.length === 0) {
            setSavedUnits([]);
            setUnSavedUnits([]);
          }
          if (data.UnsavedUnits?.length > 0) {
            setShowOrderConfirmation(true);
          }
        } else {
          setSavedUnits([]);
          setUnSavedUnits([]);
        }

        const userPK = JSON.parse(localStorage.getItem("loggedInUserData"))?.userPK || null;

        if (data?.EmailBOLTolls?.length > 0) {
          data.EmailBOLTolls.forEach((item) => {
            item.forEach((emailBolItem) => {
              OrderEntryServices.generateEmailForUnitsBOL({
                unitPK: emailBolItem?.unitPK,
                email: emailBolItem?.email,
                print: emailBolItem?.print,
                emailObjectKey: emailBolItem?.emailObjectKey,
                printerName: emailBolItem?.printerName?.trim(),
                userPK: userPK,
              })
                .then(() => console.log(`BOL Email sent for dispatchPK: ${emailBolItem.dispatchPK}`))
                .catch((error) =>
                  console.error(`Failed to send BOL email for dispatchPK: ${emailBolItem.dispatchPK}`, error)
                );
            });
          });
        }

        if (String(data?.CreditCardResponse?.[0].errorCode) === "1") {
          setTransIds(data?.CreditCardResponse?.[0]?.refTranID || "");

          const arr = pendingValues?.creditCard?.creditCardArray?.map((card) =>
            data?.CreditCardResponse?.[0]?.completedCards?.includes(card?.unmaskedCardNumber)
              ? { ...card, processed: true }
              : card
          );
          reactHookForm.setValue("creditCard.creditCardArray", arr);
        }
      }
      setTab("unit");
      if (String(data?.CreditCardResponse?.[0]?.errorCode) === "1") return;
      resetTabsDatas(pendingValues?.customer);
    } catch (err) {
      setShowError(true);
      setErrorMsg("Something went wrong !! Failed to create the order !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const onValidationFailed = (errors) => {
    // Show error message
    const firstErrorKey = Object.keys(errors)?.map((key) =>
      key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
    );
    // const Error = `please validate these tabs: ${firstErrorKey.join(", ")}`;
    setShowError(true);
    setErrorMsg(
      `Tab validation failed for ${firstErrorKey?.join(", ")} ${firstErrorKey?.length > 1 ? "tabs" : "tab"}`
    );
  };

  useEffect(() => {
    reactHookForm.trigger();
  }, [schema]);

  /**
   * Send Customer and Shuttle BOL Email when Order Entry exit screen or Customer change
   */

  // This ref tracks if the user finished the task properly
  const userCompletedAction = useRef(false);

  const handleUnexpectedLeave = () => {
    if (userCompletedAction.current) return;
    OrderEntryServices.sendNotificationMail("Bol");
    OrderEntryServices.sendNotificationMail("Shuttle");
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      handleUnexpectedLeave();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      handleUnexpectedLeave(); // For route change
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleComplete = () => {
    userCompletedAction.current = true; // Mark task as finished
  };

  return {
    tab,
    setTab,
    reactHookForm,
    handlePreSubmit,
    hasErrors,
    onValidationFailed,
    showOpenBalancesWarning,
    setShowOpenBalancesWarning,
    handleOrderConfirmationSave,
    showOrderConfirmation,
    setShowOrderConfirmation,
    saveLoading,
    savedUnits,
    setSavedUnits,
    unSavedUnits,
    setUnSavedUnits,
    generateBatchUnits,
    setShowError,
    setErrorMsg,
    errorMsg,
    showError,
    showSuccess,
    setShowSuccess,
    successMsg,
    setSuccessMsg,
    showCreditCardWarning,
    setShowCreditCardWarning,
    preInvoiceModal,
    setPreInvoiceModal,
    preInvoiceResult,
    setUnitActivation,
    unitActivation,
    setUnitActivationObj,
    unitActivationObj,
    lockError,
    setLockError,
  };
};

export default useOrderEntry;
