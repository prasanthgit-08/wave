import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../../common/ModalComponent";
import {
  resetPaperworkProcessing,
  setInvoiceLineItems,
  toggleChangesCancelled,
  setCompanyFK,
  setIsDelayedUnit,
  setResponseMessage,
  setShowUnitInactiveModal,
  addArrayToSelected,
  setMultiUnitList,
  setPartialTripArray,
  setPartialTripIndex,
  setSelectedUnitsListIndex,
  setAdditionalAmountsList,
  setAmountsConfirmationDataList,
  setIsCopyingCompleted,
  setInvoiceSaveList,
  setPartialArrayForNavigation,
  setMissingPaperworkFlag,
  setMissingPaperworkDrivers,
  copyAdditionalAmountsFields,
  setSelectedDelayUnitBreakdownFK,
  setDriversEmailIndex,
  setEquipmentReturnList,
  setRealseHoldStatus,
  setReleaseHoldPermission,
  setUnitOnInvoiceHold,
  setSortTypeFeeTab,
  setSortValueFeeTab,
  setDriversEmailArray,
  setCreditCardArrayList,
  setTransIds,
  setMissingPaperworkAttachVideo,
  setIsDeliveryDateDefaultValue,
  setMissingPaperworkChargeEfee,
  setMissingPaperworkEmailText,
  setInvoiceHoldReason,
  setMissingPaperworkObject,
  setNotes,
  setEmailText,
  saveInvoiceHoldSnapshot,
  restoreInvoiceHoldSnapshot,
  clearInvoiceHoldSnapshot,
} from "../../../redux/Invoicing/PaperworkProcessingSlice";
import PaperworkProcessingService from "../../../services/Invoicing/PaperworkProcessingService";
import LoadingIcon from "../../common/LoadingIcon";
import OverrideCodeModalComponent from "../../common/OverrideCodeModalComponent";
import useArrayListNavigation from "../../../hooks/useArrayListNavigation";
import CreditCardComponent from "../../../modules/credit-card/CreditCardComponent";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { usePermission } from "../../../hooks/usePermission";

const Footer = ({
  unitSelection = false,
  unitView = false,
  missingPaperwork = false,
  driversEmail = false,
  additionalAmounts = false,
  amountsConfirmation = false,
  scanPaperwork = false,
  breakdownDelay = false,
  splitTrip = false,
  equipmentReturn = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();
  const { checkPermission, getPermissionKey } = usePermission();
  const [loading, setLoading] = useState(false);

  /**Local States */
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [warningShow, setWarningShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [showInvoiceGenerationSuccess, setShowInvoiceGenerationSuccess] = useState(false);
  const [savingInvoice, setSavingInvoice] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [validOverride, setValidOverride] = useState(false);
  const [percentageToDisplay, setPercentageToDisplay] = useState(null);
  const [allowedApiLoading, setAllowedApiLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  const isDelayedUnit = useSelector((state) => state.paperworkProcessing.isDelayedUnit);
  const partialTripArray = useSelector((state) => state.paperworkProcessing.partialTripArray);
  const partialArrayForNavigation = useSelector(
    (state) => state.paperworkProcessing.partialArrayForNavigation
  );
  const partialTripIndex = useSelector((state) => state.paperworkProcessing.partialTripIndex);
  const selectedEquipmentReturnsList = useSelector(
    (state) => state.paperworkProcessing.selectedEquipmentReturnsList
  );
  const transIds = useSelector((state) => state.paperworkProcessing.transIds);

  /** Global States */
  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);
  const additionalAmountsList = useSelector((state) => state.paperworkProcessing.additionalAmountsList);
  const unitViewDisableNext = useSelector((state) => state.paperworkProcessing.unitViewDisableNext);
  const additionalAmountsDisableNext = useSelector(
    (state) => state.paperworkProcessing.additionalAmountsDisableNext
  );
  const breakdownDelayLoading = useSelector((state) => state.paperworkProcessing.breakdownDelayLoading);
  const scanPaperworkDisableSave = useSelector((state) => state.paperworkProcessing.scanPaperworkDisableSave);
  const isCurrentUnitValid = useSelector((state) => state.paperworkProcessing.isCurrentUnitValid);
  const inactiveDropzone = useSelector((state) => state.paperworkProcessing.inactiveDropzone);
  const breakdownDelayArray = useSelector((state) => state.paperworkProcessing.breakdownDelayArray);
  const totalBreakdownPermit = useSelector((state) => state.paperworkProcessing.totalBreakdownPermit);
  const totalBreakdownTolls = useSelector((state) => state.paperworkProcessing.totalBreakdownTolls);
  const enableAddLoadUnitButtons = useSelector((state) => state.paperworkProcessing.enableAddLoadUnitButtons);
  const multiUnitList = useSelector((state) => state.paperworkProcessing.multiUnitList);
  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const selectedUnitsListIndex = useSelector((state) => state.paperworkProcessing.selectedUnitsListIndex);
  const driverList = useSelector((state) => state.paperworkProcessing.driverList);
  const multiUnitSeperateInvoice = useSelector((state) => state.paperworkProcessing.multiUnitSeperateInvoice);
  const isCopyingCompleted = useSelector((state) => state.paperworkProcessing.isCopyingCompleted);
  const invoiceSaveList = useSelector((state) => state.paperworkProcessing.invoiceSaveList);
  const scanPaperworkSaveList = useSelector((state) => state.paperworkProcessing.scanPaperworkSaveList);
  const amountsConfirmationDataList = useSelector(
    (state) => state.paperworkProcessing.amountsConfirmationDataList
  );
  const feeDelayArray = useSelector((state) => state.paperworkProcessing.feeDelayArray);
  const missingPaperworkObject = useSelector((state) => state.paperworkProcessing.missingPaperworkObject);
  const missingPaperworkDrivers = useSelector((state) => state.paperworkProcessing.missingPaperworkDrivers);
  const missingPaperworkUnit = useSelector((state) => state.paperworkProcessing.missingPaperworkUnit);
  const emailText = useSelector((state) => state.paperworkProcessing.emailText);
  const companyFK = useSelector((state) => state.paperworkProcessing.companyFK);
  const companyName = useSelector((state) => state.paperworkProcessing.companyName);
  const [invoiceResponseList, setInvoiceResponseList] = useState([]);
  const arrayOfUnitIds = selectedUnitsList?.map((unit) => unit?.unitPK) || [];
  const driversEmailList = useSelector((state) => state.paperworkProcessing.driversEmailList);
  const driversEmailArray = useSelector((state) => state.paperworkProcessing.driversEmailArray);
  const driversEmailIndex = useSelector((state) => state.paperworkProcessing.driversEmailIndex);
  const creditCardArrayList = useSelector((state) => state.paperworkProcessing.creditCardArrayList);
  const [nextLoading, setNextLoading] = useState(false);
  const [addLoadLoading, setAddLoadLoading] = useState(false);
  const [unitAcLoading, setUnitAcLoading] = useState(false);
  const [unitDelayedLoading, setUnitDelayedLoading] = useState(false);
  const [missingPaperworkLoading, setMissingPaperworkLoading] = useState(false);
  const invoiceTotalAmntConf = useSelector((state) => state.paperworkProcessing.invoiceTotalAmntConf);
  const delayedUnitReturnFK = useSelector((state) => state.paperworkProcessing.delayedUnitReturnFK);
  const isReturn = useSelector((state) => state.paperworkProcessing.isReturn);
  const unitOnInvoiceHold = useSelector((state) => state.paperworkProcessing.unitOnInvoiceHold);
  const invoiceHoldReason = useSelector((state) => state.paperworkProcessing.invoiceHoldReason);

  const percentageCalculationPayload =
    amountsConfirmationDataList?.map((data) => ({
      unitId: data?.unitPK,
      unitNumber: data?.unitNumber,
      grossInvoiceAmount: data?.grossInvoiceAmount,
      returnGrossInvoiceAmount: data?.returnedGrossInvoiceAmount,
      fuelSurchargeAmount: data?.fuelSurchargeAmount,
      cdlaAmount: data?.CDLSurchargeAmount,
      apportionedAmount: data?.InvoiceApportionedAmount,
      additionalAmount: data?.invoiceAdditionalAmount,
      specialAmount: data?.invoiceSpecialAmount,
      driverAmount: data?.invoiceDriverAmount,
      companyName: companyName,
      companyId: companyFK,
    })) || [];
  const [percentageCaculationIndex, setPercentageCaculationIndex] = useState(0);

  const combinedArray = [...(breakdownDelayArray || []), ...(feeDelayArray || [])];

  const creditCardBreakdownCharge = (
    (breakdownDelayArray?.reduce(
      (sum, item) =>
        sum +
        (item?.invoiceDowntimeAmount || 0) +
        (item?.invoiceAPUAmount || 0) +
        (item?.invoiceAdditionalMilesAmount || 0) +
        (item?.invoiceBreakdownFee || 0),
      0
    ) || 0) + (feeDelayArray?.reduce((sum, item) => sum + (item?.invoiceAmount || 0), 0) || 0)
  )?.toFixed(2);

  // Filter unique records based on delayedUnitBreakdownFKInt
  const uniqueCombinedArray = Object?.values(
    combinedArray?.reduce((acc, item) => {
      // Use delayedUnitBreakdownFKInt as the key to ensure uniqueness
      acc[item?.delayedUnitBreakdownFKInt] = item;
      return acc;
    }, {}) || {}
  );

  const handleFurtherLoopingNavigation = (currentIndex) => {
    const isLastUnit =
      currentIndex === percentageCalculationPayload?.length - 1 || percentageCalculationPayload?.length === 1;
    if (!isLastUnit) {
      const nextIndex = currentIndex + 1;
      getPercentageCalculation(percentageCalculationPayload[nextIndex], nextIndex);
      setPercentageCaculationIndex(nextIndex);
    } else {
      navigate(`/paperwork-processing/scan-paperwork`);
    }
  };

  const getPercentageCalculation = (currentUnitPayload, currentIndex, overrideInputValue) => {
    setAllowedApiLoading(true);
    PaperworkProcessingService.getPercentageCalculation(currentUnitPayload, overrideInputValue)
      .then((response) => {
        setAllowedApiLoading(false);
        setPercentageToDisplay(response?.data?.percentage);
        const percentageComparison = response?.data?.message;
        if (percentageComparison === "initialyCriteriaTrue") {
          if (!multiUnitSeperateInvoice) {
            navigate(`/paperwork-processing/scan-paperwork`);
          } else {
            handleFurtherLoopingNavigation(currentIndex);
          }
        } else if (percentageComparison === "criteriaTrueWithUser") {
          setWarningShow(true);
        } else if (
          percentageComparison === "criteriaFalseWithUser" ||
          percentageComparison === "lowAmountForUser"
        ) {
          setValidOverride(false);
          setShowOverrideModal(true);
          setWarningShow(false);
        }
      })
      .catch((error) => {
        setAllowedApiLoading(false);
      });
  };

  const generateLineItemsArray = (unit, index, totalBreakdownCharge) => {
    let lineNumber = 0;
    let lineItemsList = [];
    const setLineItems = (payload) => {
      lineItemsList = [...lineItemsList, payload];
    };

    const unitList = Array.isArray(unit) ? unit : unit ? [unit] : [];

    // Find the matching unitPK from either breakdown or fee arrays
    const matchedUnitPK = unitList?.find(
      (u) =>
        breakdownDelayArray?.some((b) => b?.unitFKInt === u?.unitPK) ||
        feeDelayArray?.some((f) => f?.unitFKInt === u?.unitPK)
    )?.unitPK;

    // Filter arrays only when multi-unit separate invoice is enabled
    const filterByUnit = (arr) =>
      multiUnitSeperateInvoice && matchedUnitPK
        ? arr?.filter((item) => item?.unitFKInt === matchedUnitPK)
        : arr;

    // Apply filtering
    const filteredBreakdownArray = filterByUnit(breakdownDelayArray);
    const filteredFeeArray = filterByUnit(feeDelayArray);

    // Build mapped arrays
    const expenseListInvoiceAmounts =
      filteredBreakdownArray?.map((item) => ({
        totalInvoiceForEachUnit: item.totalInvoiceForEachUnit,
        delayedUnitExpensePK: item.delayedUnitExpensePK,
      })) || [];

    const feeDescriptionAndInvoiceAmount =
      filteredFeeArray?.map((item) => ({
        description: item.description,
        invoiceAmount: item.invoiceAmount,
        delayedUnitFeePK: item.delayedUnitFeePK,
      })) || [];

    // Set Line Item 1 - Gross Invoice
    let grossInvoice = {
      lineNumber: ++lineNumber,
      description: delayedUnitReturnFK && isReturn ? "Outbound Gross Invoice Amount" : "Gross Invoice Amount",
      mileageRate: unit?.invoiceRate || 0,
      miles: unit?.invoiceMiles || 0.0,
      totalAmount: unit?.grossInvoiceAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: true,
      sisterRate: unit?.sistergrossInvoiceRate || 0,
      sisterAmount: unit?.grossInvoiceAmountSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: delayedUnitReturnFK && isReturn ? true : false,
    };
    setLineItems(grossInvoice);

    // Set Line Item 1.b - Return Gross InvoiceAmount
    let returnGrossInvoiceAmount = {
      lineNumber: ++lineNumber,
      description: "Return Gross InvoiceAmount",
      mileageRate: unit?.returnedGrossInvoiceRate || 0,
      miles: unit?.returnedGrossInvoiceMiles || 0.0,
      totalAmount: unit?.returnedGrossInvoiceAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: true,
      sisterRate: unit?.delayedInvoiceReturnMilesSister || 0,
      sisterAmount: unit?.delayedInvoiceReturnAmountSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: true,
    };

    setLineItems(returnGrossInvoiceAmount);

    // Set Line Item 2 - Fuel Surcharge
    let fuelSurcharge = {
      lineNumber: ++lineNumber,
      description: "Fuel Surcharge",
      mileageRate: unit?.fuelSurchargeRate || 0.0,
      miles: unit?.invoiceMiles || 0.0,
      totalAmount: unit?.fuelSurchargeAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: true,
      sisterRate: unit?.fuelSurchargeRate || 0,
      sisterAmount: unit?.fuelSurchargeAmountSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: delayedUnitReturnFK && isReturn ? true : false,
    };

    setLineItems(fuelSurcharge);

    // Set Line Item 3 - CDL Surcharge
    let cdlSurcharge = {
      lineNumber: ++lineNumber,
      description: "CDL Surcharge",
      mileageRate: unit?.invoiceCDLARate || 0.0,
      miles: unit?.invoiceMiles || 0.0,
      totalAmount: unit?.CDLSurchargeAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: true,
      sisterRate: unit?.invoiceCDLARate || 0,
      sisterAmount: unit?.CdlaAmountSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: delayedUnitReturnFK && isReturn ? true : false,
    };
    setLineItems(cdlSurcharge);

    // Set Line Item 4.5 - Apportioned Surcharge - To be uncommented when received from SP.
    let apportionedSurcharge = {
      lineNumber: ++lineNumber,
      description: "Apportioned Surcharge",
      mileageRate: unit?.InvoiceApportionedRate || 0.0,
      miles: unit?.invoiceMiles || 0.0,
      totalAmount: unit?.InvoiceApportionedAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: true,
      sisterRate: unit?.InvoiceApportionedRate || 0,
      sisterAmount: unit?.ApportionedAmountSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: delayedUnitReturnFK && isReturn ? true : false,
    };

    setLineItems(apportionedSurcharge);

    // Set Line Item 4 - Additional Supplimental Rate
    let additionalRate = {
      lineNumber: ++lineNumber,
      description: unit?.invoiceAdditionalDescription || "",
      mileageRate: unit?.invoiceAdditionalRate || 0.0,
      miles: unit?.invoiceMiles || 0.0,
      totalAmount: unit?.invoiceAdditionalAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: true,
      sisterRate: unit?.invoiceAdditionalRate || 0,
      sisterAmount: unit?.additionalAmountSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: delayedUnitReturnFK && isReturn ? true : false,
    };
    setLineItems(additionalRate);

    // Set Line Item 5 - Special Supplimental Rate
    let specialRate = {
      lineNumber: ++lineNumber,
      description: unit?.invoiceSpecialDescription || "",
      mileageRate: unit?.invoiceSpecialRate || 0.0,
      miles: unit?.invoiceMiles || 0.0,
      totalAmount: unit?.specialAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: true,
      sisterRate: unit?.invoiceSpecialRate || 0,
      sisterAmount: unit?.specialAmountSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: delayedUnitReturnFK && isReturn ? true : false,
    };
    setLineItems(specialRate);

    // Set Line Item 6 - Driver Supplimental Rate
    let driverRate = {
      lineNumber: ++lineNumber,
      description: unit?.invoiceDriverDescription || "",
      mileageRate: unit?.invoiceDriverRate || 0.0,
      miles: unit?.invoiceMiles || 0.0,
      totalAmount: unit?.invoiceDriverAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: true,
      sisterRate: unit?.invoiceDriverRate || 0,
      sisterAmount: unit?.driverAmountSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: delayedUnitReturnFK && isReturn ? true : false,
    };
    setLineItems(driverRate);

    let currenUnit = additionalAmountsList?.[index];

    // Set Line Item 7 - Permits
    let permits = {
      lineNumber: ++lineNumber,
      description: "Permits",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: returnInvoicePermits(unit?.invoicePermitsAmntConfScreen || 0, unit),
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount:
        Number(currenUnit?.invoicePermitsAmount) === Number(currenUnit?.originalInvoicePermits) ||
        Number(unit?.invoicePermitsAmntConfScreen) === 0
          ? 0
          : Number(currenUnit?.invoicePermitsAmount) || 0,
      breakdown: false,
      tolls: false,
      permits: true,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(permits);

    // Set Line Item 8 - Tolls
    let tolls = {
      lineNumber: ++lineNumber,
      description: "Tolls",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: returnInvoiceTolls(unit?.invoiceTollsAmntConfScreen || 0, unit),
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount:
        Number(currenUnit?.invoiceTollsAmount) === Number(currenUnit?.originalInvoiceTolls) ||
        Number(unit?.invoiceTollsAmntConfScreen) === 0
          ? 0
          : Number(currenUnit?.invoiceTollsAmount) || 0,
      breakdown: false,
      tolls: true,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(tolls);

    // Set Line Item 9 - Wash
    let wash = {
      lineNumber: ++lineNumber,
      description: "Wash",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: returnInvoiceWash(unit?.invoiceWashAmntConfScreen || 0, unit),
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount:
        Number(currenUnit?.invoiceWashAmount) === Number(currenUnit?.originalInvoiceWash) ||
        Number(unit?.invoiceWashAmntConfScreen) === 0
          ? 0
          : Number(currenUnit?.invoiceWashAmount) || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(wash);

    // Set Line Item 10 - Additional Charge 1
    let additionalCharge1 = {
      lineNumber: ++lineNumber,
      description: unit?.charge1Description || "",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: unit?.invoiceCharge1 || 0,
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount:
        Number(currenUnit?.invoiceCharge1) !== Number(currenUnit?.originalInvoiceCharge1)
          ? Number(currenUnit?.invoiceCharge1) || 0
          : 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(additionalCharge1);

    // Set Line Item 11 - Additional Charge 2
    let additionalCharge2 = {
      lineNumber: ++lineNumber,
      description: unit?.charge2Description || "",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: unit?.invoiceCharge2 || 0,
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount:
        Number(currenUnit?.invoiceCharge2) !== Number(currenUnit?.originalInvoiceCharge2)
          ? Number(currenUnit?.invoiceCharge2) || 0
          : 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(additionalCharge2);

    // Set Line Item 12 - Additional Charge 3
    let additionalCharge3 = {
      lineNumber: ++lineNumber,
      description: unit?.charge3Description || "",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: unit?.invoiceCharge3 || 0,
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount:
        Number(currenUnit?.invoiceCharge3) !== Number(currenUnit?.originalInvoiceCharge3)
          ? Number(currenUnit?.invoiceCharge3) || 0
          : 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(additionalCharge3);

    // Set Line Item 13 - Canadian/Delivery Surcharge
    let canadianSurcharge = {
      lineNumber: ++lineNumber,
      description: unit?.canadianDeliveryDescription || "",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: unit?.canadianDeliveryAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount: unit?.canadianDeliveryAmount || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(canadianSurcharge);

    // Set Line Item 14 - Overwidth Permits
    let overwidthPermit = {
      lineNumber: ++lineNumber,
      description: "Overwidth Permits",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: unit?.overWidthPermitsAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount: unit?.overWidthPermitsAmount || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(overwidthPermit);

    // Set Line Item 15 - Port Escort Fee
    let portEscortFee = {
      lineNumber: ++lineNumber,
      description: "Port Escort Fee",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: unit?.portEscortFeeAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount: unit?.portEscortFeeAmount || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(portEscortFee);

    if (!unit?.invoiceStorageSeperate) {
      // Set Line Item 16 - Storage Fee
      let storageFee = {
        lineNumber: ++lineNumber,
        description: "Storage Fee",
        mileageRate: 0.0,
        miles: 0,
        totalAmount: unit?.storageFeeAmount || 0,
        subTotalAmount: 0.0,
        subTotalFlag: false,
        billAlternate: false,
        sisterRate: 0.0,
        sisterAmount: unit?.storageFeeAmount || 0,
        breakdown: false,
        tolls: false,
        permits: false,
        delayedUnitExpensePK: null,
        delayedUnitFeePK: null,
        isReturn: false,
      };
      setLineItems(storageFee);
    } else ++lineNumber;

    if (!unit?.invoiceStorageSeperate) {
      // Set Line Item 17 - startAndRunFee
      let startAndRunFee = {
        lineNumber: ++lineNumber,
        description: "Start And Run Fee",
        mileageRate: 0.0,
        miles: 0,
        totalAmount: unit?.startAndRunAmount || 0,
        subTotalAmount: 0.0,
        subTotalFlag: false,
        billAlternate: false,
        sisterRate: 0.0,
        sisterAmount: unit?.startAndRunAmount || 0,
        breakdown: false,
        tolls: false,
        permits: false,
        delayedUnitExpensePK: null,
        delayedUnitFeePK: null,
        isReturn: false,
      };
      setLineItems(startAndRunFee);
    } else ++lineNumber;

    // Set Line Item 18 - ELD Fee
    let eldFee = {
      lineNumber: ++lineNumber,
      description:
        unit?.invoiceELDDescription != null && unit?.invoiceELDDescription !== ""
          ? unit?.invoiceELDDescription
          : "ELD Fee",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: unit?.invoiceELDFee || 0,
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount: unit?.invoiceELDFeeSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(eldFee);

    // Set Line Item 19 - Insurance
    let insurance = {
      lineNumber: ++lineNumber,
      description: "Insurance",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: unit?.insuranceAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount: unit?.insuranceAmntConfSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(insurance);

    // Set Line Item 20 - Linehaul Discount
    let linehaulDiscount = {
      lineNumber: ++lineNumber,
      description: "Linehaul Discount",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: unit?.lineHaulAmount || 0,
      subTotalAmount: 0.0,
      subTotalFlag: true,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount: unit?.lineHaulAmntConfSister || 0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(linehaulDiscount);

    if (
      isDelayedUnit
      //  && (!unit?.invoiceBreakdownSeperately && !unit.fodInvoice)
    ) {
      // For breakdown charges (expenseListInvoiceAmounts)
      expenseListInvoiceAmounts?.forEach((item) => {
        const lineItem = {
          lineNumber: ++lineNumber,
          description: "Breakdown Charges",
          mileageRate: 0.0,
          miles: 0,
          totalAmount: item.totalInvoiceForEachUnit,
          subTotalAmount: 0.0,
          subTotalFlag: false,
          billAlternate: false,
          sisterRate: 0.0,
          sisterAmount: 0.0,
          breakdown: true,
          tolls: false,
          permits: false,
          delayedUnitExpensePK: item.delayedUnitExpensePK,
          delayedUnitFeePK: null,
          isReturn: false,
        };
        setLineItems(lineItem);
      });

      // For fee descriptions and amounts (feeDescriptionAndInvoiceAmount)
      feeDescriptionAndInvoiceAmount?.forEach((item) => {
        const lineItem = {
          lineNumber: ++lineNumber,
          description: item.description,
          mileageRate: 0.0,
          miles: 0,
          totalAmount: item.invoiceAmount,
          subTotalAmount: 0.0,
          subTotalFlag: false,
          billAlternate: false,
          sisterRate: 0.0,
          sisterAmount: 0.0,
          breakdown: true,
          tolls: false,
          permits: false,
          delayedUnitExpensePK: null,
          delayedUnitFeePK: item.delayedUnitFeePK,
          isReturn: false,
        };
        setLineItems(lineItem);
      });
    }

    // Set Line Item 24 - Invoice Other charge from split trip
    let invoiceOther = {
      lineNumber: ++lineNumber,
      description: "Other",
      mileageRate: 0.0,
      miles: 0,
      totalAmount: returnInvoiceOtherAmount(0, unit),
      subTotalAmount: 0.0,
      subTotalFlag: false,
      billAlternate: false,
      sisterRate: 0.0,
      sisterAmount: 0.0,
      breakdown: false,
      tolls: false,
      permits: false,
      delayedUnitExpensePK: null,
      delayedUnitFeePK: null,
      isReturn: false,
    };
    setLineItems(invoiceOther);

    return lineItemsList;
  };

  const returnInvoicePermits = (invoicePermitsAmntConfScreen, unit) => {
    let invoicePermits = invoicePermitsAmntConfScreen;
    if (isDelayedUnit && totalBreakdownPermit > 0 && !multiUnitSeperateInvoice) {
      invoicePermits = invoicePermits + totalBreakdownPermit;
    }
    if (multiUnitSeperateInvoice && breakdownDelayArray?.length > 0) {
      //  filter the array to get only the objects where unitFKInt of breakdown matches unitPK
      const filteredArray = breakdownDelayArray.filter((item) => item?.unitFKInt === unit?.unitPK);
      const invoicePermitsSumForEachUnit = filteredArray?.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem?.invoicePermits || 0);
      }, 0);
      invoicePermits = invoicePermits + (invoicePermitsSumForEachUnit || 0);
    }
    // case of single unit and multi unit-single invoice in split trip
    if (
      (partialTripArray?.length > 0 && !selectedUnit?.multiUnit) ||
      (partialTripArray?.length > 0 && selectedUnit?.multiUnit && !multiUnitSeperateInvoice)
    ) {
      const permitInvoiceSum = partialTripArray.reduce(
        (acc, obj) => acc + (Number(obj?.permitInvoice) || 0),
        0
      );
      invoicePermits = invoicePermits + permitInvoiceSum;
    }
    // case of multi unit multi invoice in split trip
    if (partialTripArray?.length > 0 && selectedUnit?.multiUnit && multiUnitSeperateInvoice) {
      const permitInvoiceSum = partialTripArray
        .filter((obj) => obj?.unitId === unit?.unitPK)
        .reduce((acc, obj) => acc + (Number(obj?.permitInvoice) || 0), 0);
      invoicePermits = invoicePermits + permitInvoiceSum;
    }
    return invoicePermits;
  };

  const returnInvoiceTolls = (invoiceTollsAmntConfScreen, unit) => {
    let invoiceTolls = invoiceTollsAmntConfScreen;
    if (isDelayedUnit && totalBreakdownTolls > 0 && !multiUnitSeperateInvoice) {
      invoiceTolls = invoiceTolls + totalBreakdownTolls;
    }
    if (multiUnitSeperateInvoice && breakdownDelayArray?.length > 0) {
      //  filter the array to get only the objects where unitFKInt of breakdown matches unitPK
      const filteredArray = breakdownDelayArray?.filter((item) => item?.unitFKInt === unit?.unitPK);
      const invoiceTollsSumForEachUnit = filteredArray?.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem?.invoiceTolls || 0);
      }, 0);
      invoiceTolls = invoiceTolls + (invoiceTollsSumForEachUnit || 0);
    }
    // case of single unit and multi unit-single invoice in split trip
    if (
      (partialTripArray?.length > 0 && !selectedUnit?.multiUnit) ||
      (partialTripArray?.length > 0 && selectedUnit?.multiUnit && !multiUnitSeperateInvoice)
    ) {
      const tollInvoiceSum = partialTripArray.reduce((acc, obj) => acc + (Number(obj?.tollInvoice) || 0), 0);
      invoiceTolls = invoiceTolls + tollInvoiceSum;
    }
    // case of multi unit multi-invoice in split trip
    if (partialTripArray?.length > 0 && selectedUnit?.multiUnit && multiUnitSeperateInvoice) {
      const tollInvoiceSum = partialTripArray
        .filter((obj) => obj?.unitId === unit?.unitPK)
        .reduce((acc, obj) => acc + (Number(obj?.tollInvoice) || 0), 0);
      invoiceTolls = invoiceTolls + tollInvoiceSum;
    }
    return invoiceTolls;
  };
  const returnInvoiceWash = (invoiceWashAmntConfScreen, unit) => {
    let invoiceWash = invoiceWashAmntConfScreen;
    // case of single unit and multi unit-single invoice in split trip
    if (
      (partialTripArray?.length > 0 && !selectedUnit?.multiUnit) ||
      (partialTripArray?.length > 0 && selectedUnit?.multiUnit && !multiUnitSeperateInvoice)
    ) {
      const washInvoiceSum = partialTripArray.reduce((acc, obj) => acc + (Number(obj?.washInvoice) || 0), 0);
      invoiceWash = invoiceWash + washInvoiceSum;
    }
    // case of multi unit multi-invoice in split trip
    if (partialTripArray?.length > 0 && selectedUnit?.multiUnit && multiUnitSeperateInvoice) {
      const washInvoiceSum = partialTripArray
        .filter((obj) => obj?.unitId === unit?.unitPK)
        .reduce((acc, obj) => acc + (Number(obj?.washInvoice) || 0), 0);
      invoiceWash = invoiceWash + washInvoiceSum;
    }
    return invoiceWash;
  };

  const returnInvoiceOtherAmount = (otherAmountConfScreen, unit) => {
    let otherAmount = otherAmountConfScreen;
    if (
      (partialTripArray?.length > 0 && !selectedUnit?.multiUnit) ||
      (partialTripArray?.length > 0 && selectedUnit?.multiUnit && !multiUnitSeperateInvoice)
    ) {
      const otherInvoiceSum = partialTripArray.reduce(
        (acc, obj) => acc + (Number(obj?.otherInvoice) || 0),
        0
      );
      otherAmount = otherAmount + otherInvoiceSum;
    }
    if (partialTripArray?.length > 0 && selectedUnit?.multiUnit && multiUnitSeperateInvoice) {
      const otherInvoiceSum = partialTripArray
        .filter((obj) => obj?.unitId === unit?.unitPK)
        .reduce((acc, obj) => acc + (Number(obj?.otherInvoice) || 0), 0);
      otherAmount = otherAmount + otherInvoiceSum;
    }
    return otherAmount;
  };

  // updating amount confirmation by looping through each unit
  const loopAmountsConfirmationList = (unit, index) => {
    let totalBreakdownCharge = 0;
    if (isDelayedUnit && !multiUnitSeperateInvoice && !selectedUnit?.multiUnit) {
      const filteredFeeArray = feeDelayArray?.filter((item) => item?.unitFKInt === unit?.unitPK);
      const totalFeeAmountForUnit =
        filteredFeeArray?.reduce((sum, item) => sum + (item?.invoiceAmount || 0), 0) || 0;
      totalBreakdownCharge =
        (breakdownDelayArray?.length > 0
          ? breakdownDelayArray[breakdownDelayArray?.length - 1]?.totalDelayInvAmnt || 0
          : 0) + totalFeeAmountForUnit;
    } else if (selectedUnit?.multiUnit && isDelayedUnit && multiUnitSeperateInvoice) {
      // Filter the array to get only the objects where unitFKInt of breakdown matches unitPK
      const filteredArray = breakdownDelayArray?.filter((item) => item?.unitFKInt === unit?.unitPK);
      // Get the last record from the filtered array
      const lastRecord = filteredArray?.[filteredArray?.length - 1];
      // Extract the totalInvoiceForEachUnit from the last record
      const totalInvoiceForEachUnit = lastRecord ? lastRecord.totalDelayInvAmnt || 0 : 0;
      totalBreakdownCharge = totalBreakdownCharge + totalInvoiceForEachUnit;
      if (feeDelayArray?.length > 0) {
        const filteredFeeArray = feeDelayArray?.filter((item) => item?.unitFKInt === unit?.unitPK);
        // Sum the invoiceAmount from all records in the fee array
        const totalFeeAmountForUnit =
          filteredFeeArray?.reduce((sum, item) => sum + (item?.invoiceAmount || 0), 0) || 0;
        totalBreakdownCharge = totalBreakdownCharge + totalFeeAmountForUnit;
      }
    } else if (selectedUnit?.multiUnit && !multiUnitSeperateInvoice && isDelayedUnit) {
      totalBreakdownCharge =
        totalBreakdownCharge +
        (breakdownDelayArray?.length > 0 ? breakdownDelayArray[0]?.totalAmountAllUnits || 0 : 0);
      if (feeDelayArray?.length > 0) {
        // Sum the invoiceAmount from all records in the fee array
        const totalFeeAmountForUnit =
          feeDelayArray?.reduce((sum, item) => sum + (item?.invoiceAmount || 0), 0) || 0;
        totalBreakdownCharge = totalBreakdownCharge + totalFeeAmountForUnit;
      }
    }

    const returnInvoiceAmount = (invoiceTotalAmntConf) => {
      let invoiceAmount = invoiceTotalAmntConf;
      // case of breakdown
      if (isDelayedUnit) {
        if (totalBreakdownPermit > 0 && !multiUnitSeperateInvoice) {
          invoiceAmount = invoiceAmount + totalBreakdownPermit;
        }
        if (totalBreakdownTolls > 0 && !multiUnitSeperateInvoice) {
          invoiceAmount = invoiceAmount + totalBreakdownTolls;
        }
        if (!unit?.invoiceBreakdownSeperately) {
          invoiceAmount = invoiceAmount + totalBreakdownCharge;
        }
      }

      // Check if selectedUnit.multiUnit, multiUnitSeperateInvoice, and breakdownDelayArray condition is true
      if (selectedUnit?.multiUnit && multiUnitSeperateInvoice && breakdownDelayArray?.length > 0) {
        // Filter the breakdownDelayArray to match the unitPK
        const filteredArray = breakdownDelayArray.filter((item) => item?.unitFKInt === unit?.unitPK);
        const invoicePermitsSumForEachUnit = filteredArray.reduce((accumulator, currentItem) => {
          return accumulator + (currentItem?.invoicePermits || 0);
        }, 0);
        const invoiceTollsSumForEachUnit = filteredArray.reduce((accumulator, currentItem) => {
          return accumulator + (currentItem?.invoiceTolls || 0);
        }, 0);
        invoiceAmount += invoicePermitsSumForEachUnit + invoiceTollsSumForEachUnit;
      }

      // case of seperate storage
      if (unit?.invoiceStorageSeperate) {
        const storageFeeAmntConf =
          unit?.startAndRunAmntConf && unit?.startAndRunAmntConf > 0
            ? unit?.storageFeeAmntConf + unit?.startAndRunAmntConf
            : unit?.storageFeeAmntConf || 0;
        invoiceAmount = invoiceAmount - storageFeeAmntConf;
      }

      if (
        (partialTripArray?.length > 0 && !selectedUnit?.multiUnit) ||
        (partialTripArray?.length > 0 && selectedUnit?.multiUnit && !multiUnitSeperateInvoice)
      ) {
        const tollInvoiceSum = partialTripArray.reduce(
          (acc, obj) => acc + (Number(obj?.tollInvoice) || 0),
          0
        );
        const permitInvoiceSum = partialTripArray.reduce(
          (acc, obj) => acc + (Number(obj?.permitInvoice) || 0),
          0
        );
        const washInvoiceSum = partialTripArray.reduce(
          (acc, obj) => acc + (Number(obj?.washInvoice) || 0),
          0
        );
        const otherInvoiceSum = partialTripArray.reduce(
          (acc, obj) => acc + (Number(obj?.otherInvoice) || 0),
          0
        );
        invoiceAmount = invoiceAmount + tollInvoiceSum + permitInvoiceSum + washInvoiceSum + otherInvoiceSum;
      }
      // case of multi unit multi invoice in split trip => adding values to total amount
      if (partialTripArray?.length > 0 && selectedUnit?.multiUnit && multiUnitSeperateInvoice) {
        const tollInvoiceSum = partialTripArray
          .filter((obj) => obj?.unitId === unit?.unitPK)
          .reduce((acc, obj) => acc + (Number(obj?.tollInvoice) || 0), 0);
        const permitInvoiceSum = partialTripArray
          .filter((obj) => obj?.unitId === unit?.unitPK)
          .reduce((acc, obj) => acc + (Number(obj?.permitInvoice) || 0), 0);
        const washInvoiceSum = partialTripArray
          .filter((obj) => obj?.unitId === unit?.unitPK)
          .reduce((acc, obj) => acc + (Number(obj?.washInvoice) || 0), 0);
        const otherInvoiceSum = partialTripArray
          .filter((obj) => obj?.unitId === unit?.unitPK)
          .reduce((acc, obj) => acc + (Number(obj?.otherInvoice) || 0), 0);
        invoiceAmount = invoiceAmount + tollInvoiceSum + permitInvoiceSum + washInvoiceSum + otherInvoiceSum;
      }
      return invoiceAmount;
    };

    const returnUnit = (unitId) => {
      return additionalAmountsList?.find((unit) => unit?.unitPK === unitId);
    };

    dispatch(
      setInvoiceSaveList({
        type: "update",
        payload: {
          index: index,
          element: {
            companyName: companyName,
            companyId: companyFK,
            monetraChargesVOList: creditCardArrayList,
            transIds: transIds,
            invoiceAmount: parseFloat(returnInvoiceAmount(unit?.invoiceTotal))?.toFixed(2) || 0.0,
            pay1Description: unit?.pay1DescriptionAmountConf || "",
            pay2Description: unit?.pay2DescriptionAmountConf || "",
            charge1DescriptionPaymentMode: unit?.charge1DescriptionPaymentMode || "",
            charge2DescriptionPaymentMode: unit?.charge2DescriptionPaymentMode || "",
            charge3DescriptionPaymentMode: unit?.charge3DescriptionPaymentMode || "",
            driver1Pay1PaymentMode: unit?.driver1Pay1PaymentMode || "",
            driver1Pay2PaymentMode: unit?.driver1Pay2PaymentMode || "",
            alternateCustomerFK: unit?.alternateCustomerFK,
            lineItems: generateLineItemsArray(unit, index, totalBreakdownCharge),
            checkDetails: !multiUnitSeperateInvoice
              ? driverList?.map((driver, index) => ({
                  unitFKInt: unit?.unitPK,
                  customerFKInt: 0, //Value passed as 0 as the Sp parameter is set accordingly and handled in SP.
                  driverFKInt: driver?.driverFK,
                  dispatchFKInt: returnUnit(unit?.unitPK)?.dispatchPK,
                  otherDescription1: unit?.charge1Description || "",
                  otherAmount1: unit?.driverList?.[index]?.charge1 || 0,
                  otherAmount2: unit?.driverList?.[index]?.charge2 || 0,
                  otherAmount3: unit?.driverList?.[index]?.charge3 || 0,
                  otherTaxable1:
                    returnUnit(unit?.unitPK)?.charge1DescriptionPaymentMode === "Pay" ? true : false,
                  otherDescription2: unit?.charge2Description || "",
                  otherTaxable2:
                    returnUnit(unit?.unitPK)?.charge2DescriptionPaymentMode === "Pay" ? true : false,
                  otherDescription3: unit?.charge3Description || "",
                  otherTaxable3:
                    returnUnit(unit?.unitPK)?.charge3DescriptionPaymentMode === "Pay" ? true : false,
                  payBalance: unit?.payBalance || 0,
                  netPay: unit?.netPay || 0,
                  driver1TollsAmntConfScreen: unit?.driverList?.[index]?.tolls || 0,
                  driver1PermitsAmntConfScreen: unit?.driverList?.[index]?.permits || 0,
                  driver1WashAmntConfScreen: unit?.driverList?.[index]?.wash || 0,
                }))
              : [
                  {
                    unitFKInt: unit?.unitPK,
                    customerFKInt: unit?.customerFK,
                    driverFKInt: unit?.driverList?.[0]?.driverFKInt,
                    dispatchFKInt: unit?.dispatchPK,
                    otherDescription1: unit?.charge1Description,
                    otherAmount1: unit?.driverList?.[0]?.charge1,
                    otherAmount2: unit?.driverList?.[0]?.charge2,
                    otherAmount3: unit?.driverList?.[0]?.charge3,
                    otherTaxable1:
                      returnUnit(unit?.unitPK)?.charge1DescriptionPaymentMode === "Pay" ? true : false,
                    otherDescription2: unit?.charge2Description,
                    otherTaxable2:
                      returnUnit(unit?.unitPK)?.charge2DescriptionPaymentMode === "Pay" ? true : false,
                    otherDescription3: unit?.charge3Description,
                    otherTaxable3:
                      returnUnit(unit?.unitPK)?.charge3DescriptionPaymentMode === "Pay" ? true : false,
                    payBalance: unit?.payBalance,
                    netPay: unit?.netPay,
                    driver1TollsAmntConfScreen: unit?.driverList?.[0]?.tolls,
                    driver1PermitsAmntConfScreen: unit?.driverList?.[0]?.permits,
                    driver1WashAmntConfScreen: unit?.driverList?.[0]?.wash,
                  },
                ],
            driverPayRequests: !multiUnitSeperateInvoice
              ? driverList?.map((unit) => ({
                  unitFKInt: unit?.unitPK,
                  driverFKInt: unit?.driverFK,
                  dispatchFKInt: unit?.dispatchPK,
                  otherAmount1:
                    returnUnit(unit?.unitPK)?.driver1Pay1PaymentMode === "Pay"
                      ? returnUnit(unit?.unitPK)?.driverList?.[0]?.pay1
                      : 0,
                  otherAmountDescription1:
                    returnUnit(unit?.unitPK)?.driver1Pay1PaymentMode === "Pay"
                      ? returnUnit(unit?.unitPK)?.pay1Description
                      : "",
                  otherAmount2:
                    returnUnit(unit?.unitPK)?.driver1Pay2PaymentMode === "Pay"
                      ? returnUnit(unit?.unitPK)?.driverList?.[0]?.pay2
                      : 0,
                  otherAmountDescription2:
                    returnUnit(unit?.unitPK)?.driver1Pay2PaymentMode === "Pay"
                      ? returnUnit(unit?.unitPK)?.pay2Description
                      : "",
                  otherReimbursmentAmount1:
                    returnUnit(unit?.unitPK)?.driver1Pay1PaymentMode === "Reimburse"
                      ? returnUnit(unit?.unitPK)?.driverList?.[0]?.pay1
                      : 0,
                  otherReimbursmentDescription1:
                    returnUnit(unit?.unitPK)?.driver1Pay1PaymentMode === "Reimburse"
                      ? returnUnit(unit?.unitPK)?.pay1Description
                      : "",
                  otherReimbursmentAmount2:
                    returnUnit(unit?.unitPK)?.driver1Pay2PaymentMode === "Reimburse"
                      ? returnUnit(unit?.unitPK)?.driverList?.[0]?.pay2
                      : 0,
                  otherReimbursmentDescription2:
                    returnUnit(unit?.unitPK)?.driver1Pay2PaymentMode === "Reimburse"
                      ? returnUnit(unit?.unitPK)?.pay2Description
                      : "",
                }))
              : [
                  {
                    unitFKInt: unit?.unitPK,
                    driverFKInt: unit?.driverList?.[0]?.driverFKInt,
                    dispatchFKInt: unit?.dispatchPK,
                    otherAmount1:
                      returnUnit(unit?.unitPK)?.driver1Pay1PaymentMode === "Pay"
                        ? returnUnit(unit?.unitPK)?.driverList?.[0]?.pay1
                        : 0,
                    otherAmountDescription1:
                      returnUnit(unit?.unitPK)?.driver1Pay1PaymentMode === "Pay"
                        ? returnUnit(unit?.unitPK)?.pay1Description
                        : "",
                    otherAmount2:
                      returnUnit(unit?.unitPK)?.driver1Pay2PaymentMode === "Pay"
                        ? returnUnit(unit?.unitPK)?.driverList?.[0]?.pay2
                        : 0,
                    otherAmountDescription2:
                      returnUnit(unit?.unitPK)?.driver1Pay2PaymentMode === "Pay"
                        ? returnUnit(unit?.unitPK)?.pay2Description
                        : "",
                    otherReimbursmentAmount1:
                      returnUnit(unit?.unitPK)?.driver1Pay1PaymentMode === "Reimburse"
                        ? returnUnit(unit?.unitPK)?.driverList?.[0]?.pay1
                        : 0,
                    otherReimbursmentDescription1:
                      returnUnit(unit?.unitPK)?.driver1Pay1PaymentMode === "Reimburse"
                        ? returnUnit(unit?.unitPK)?.pay1Description
                        : "",
                    otherReimbursmentAmount2:
                      returnUnit(unit?.unitPK)?.driver1Pay2PaymentMode === "Reimburse"
                        ? returnUnit(unit?.unitPK)?.driverList?.[0]?.pay2
                        : 0,
                    otherReimbursmentDescription2:
                      returnUnit(unit?.unitPK)?.driver1Pay2PaymentMode === "Reimburse"
                        ? returnUnit(unit?.unitPK)?.pay2Description
                        : "",
                  },
                ],
            // for saving breakdown driver charges
            breakdownList:
              (isDelayedUnit &&
                breakdownDelayArray
                  ?.filter((item) => (multiUnitSeperateInvoice ? item.unitFKInt === unit?.unitPK : true))
                  .map((element) => ({
                    driverAdditionalMilesAmount: element.driverAdditionalMilesAmount,
                    driverDowntimeAmount: element.driverDowntimeAmount,
                    driverFuelCredit: element.driverFuelCredit,
                    driverAPUAmount: element.driverAPUAmount,
                    driverBreakdownFee: element.driverBreakdownFee,
                    unitFKInt: element.unitFKInt,
                    dispatchFKInt: element.dispatchFKInt,
                    driverFKInt: element.driverFKInt,
                    customerId: element.customerFK,
                    delayedUnitBreakdownFKInt: element.delayedUnitBreakdownFKInt,
                    delayedUnitExpensePK: element.delayedUnitExpensePK,
                    driverTolls: element.driverTolls,
                    driverPermits: element.driverPermits,
                  }))) ||
              [],

            breakdownFeeList:
              feeDelayArray
                ?.filter((item) => (multiUnitSeperateInvoice ? item.unitFKInt === unit?.unitPK : true))
                .map((element) => ({
                  driverAmountFeeTab: element.driverAmount,
                  unitFKInt: element.unitFKInt,
                  description: element.description,
                  delayedUnitFeePK: element.delayedUnitFeePK,
                  driverId: element.driverId,
                  delayedUnitBreakdownFKInt: element.delayedUnitBreakdownFKInt,
                  dispatchId: element.dispatchId,
                  customerId: unit?.customerFK,
                  reimbursment: element.reimbursment,
                })) || [],

            // for saving split trip driver charges in check detail table
            partialTripArray:
              partialTripArray
                ?.filter((item) => (multiUnitSeperateInvoice ? item.unitId === unit?.unitPK : true))
                .map((element) => ({
                  driverSplitTrip: element.driverId,
                  splitTripCustomerFK: unit?.customerFK,
                  splitTripDispatchPK: element.dispatchPK,
                  driverSplitOtherPay: element.driverSplitOtherPay,
                  driverSplitOtherReimbursement: element.driverSplitOtherReimbursement,
                  driverSplitPermits: element.driverSplitPermits,
                  driverSplitTolls: element.driverSplitTolls,
                  driverSplitWash: element.driverSplitWash,
                  splitDriverName: element.firstName?.trim() + element.lastName?.trim(),
                  otherDescription: element.otherDescription,
                  splitTripUnitId: element.unitId,
                  splitUnitNumber: element.unitNumber,
                  payBalance: element.payBalance,
                })) || [],

            driverEmailList:
              driversEmailArray?.map((driver) => ({
                driverFK: driver?.driverFK,
                driverEmailText: driver?.driverEmailText,
                unitPK: driver?.unitPK,
              })) || [],

            listingData:
              selectedEquipmentReturnsList
                ?.filter((item) => item?.dispatchFK === unit?.dispatchPK)
                .map((element) => ({
                  description: element.description,
                  depositAmount: element.depositAmount,
                  equipmentHistoryId: element.equipmentHistoryPK,
                  companyName: companyName,
                })) || [],
          },
        },
      })
    );
  };

  const getAmountConfirmationDetailsPK = (additionalAmountsList, companyFK, companyName) => {
    setUnitAcLoading(true);
    PaperworkProcessingService.getUnitsAmountConfirmation(additionalAmountsList, companyFK, companyName)
      .then((response) => {
        setUnitAcLoading(false);
        const data = response?.data;
        dispatch(setAmountsConfirmationDataList(data));
        data?.forEach((element, index) => {
          loopAmountsConfirmationList(element, index);
        });
        navigate(`/paperwork-processing/amounts-confirmation`);
        setNextLoading(false);
        dispatch(setSelectedUnitsListIndex(0));
      })
      .catch((error) => {
        console.log(error);
        setUnitAcLoading(false);
      });
  };

  const fetchTableData = (companyFK, companyName) => {
    setLoading(true);
    PaperworkProcessingService.getEquipmentList(selectedUnitsList?.[0]?.dispatchPK, companyName, companyFK)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setEquipmentReturnList({ type: "set", payload: data }));
        if (data) {
          navigate(`/paperwork-processing/equipment-return`);
          setNextLoading(false);
        } else {
          getAmountConfirmationDetailsPK(additionalAmountsList, companyFK, companyName);
        }
      })
      .catch((error) => {
        setLoading(false);
        getAmountConfirmationDetailsPK(additionalAmountsList, companyFK, companyName);
      });
  };

  const checkEquipmentList = () => {
    setEquipmentLoading(true);
    PaperworkProcessingService.getEquipmentList(selectedUnitsList?.[0]?.dispatchPK, companyName, companyFK)
      .then((response) => {
        setEquipmentLoading(false);
        const { data } = response;
        if (data?.length > 0) {
          fetchTableData(companyFK, companyName);
        } else {
          getAmountConfirmationDetailsPK(additionalAmountsList, companyFK, companyName);
        }
      })
      .catch(() => {
        setEquipmentLoading(false);
        getAmountConfirmationDetailsPK(additionalAmountsList, companyFK, companyName);
      });
  };

  const isUnitDelayed = () => {
    setUnitDelayedLoading(true);
    PaperworkProcessingService.getIsUnitDelayed(arrayOfUnitIds, companyName)
      .then((response) => {
        setUnitDelayedLoading(false);
        const data = response?.data;
        dispatch(setIsDelayedUnit(data));

        if (data) {
          navigate(`/paperwork-processing/breakdown-delay`);
          setNextLoading(false);
        } else {
          checkEquipmentList();
        }
      })
      .catch((error) => {
        setUnitDelayedLoading(false);
      });
  };

  const getPartialTripData = (partialTripIds) => {
    if (partialTripIds) {
      if (partialArrayForNavigation?.length === 0) {
        PaperworkProcessingService.getPartialTrip(partialTripIds, companyName, companyFK)
          .then((response) => {
            const { data } = response;
            dispatch(setPartialArrayForNavigation(data));
            const modifiedData =
              data?.map((partialTrip) => ({
                ...partialTrip,
                tollInvoice: partialTrip?.tolls || 0,
                permitInvoice: partialTrip?.permits || 0,
                washInvoice: partialTrip?.wash || 0,
                otherInvoice: partialTrip?.otherReimbursments || partialTrip?.otherPay || 0,
              })) || [];
            dispatch(setPartialTripArray({ type: "set", payload: modifiedData }));
            if (modifiedData?.length > 0) {
              navigate(`/paperwork-processing/split-trip`);
              setNextLoading(false);
            } else {
              isUnitDelayed();
            }
          })
          .catch((error) => {});
      } else {
        navigate(`/paperwork-processing/split-trip`);
      }
    }
  };

  const fetchAllMultiUnitsLoads = () => {
    if (selectedUnit !== null && selectedUnit?.multiUnit && selectedUnit?.unitMultiLoadFK !== null) {
      setAddLoadLoading(true);
      PaperworkProcessingService.fetchAllMultiUnitsLoads({
        multiUnit: selectedUnit?.multiUnit,
        unitMultiLoadFK: selectedUnit?.unitMultiLoadFK,
        companyName: companyName,
        companyId: companyFK,
      })
        .then((response) => {
          const data = response?.data;
          if (data?.responseMessage == null && data?.multiUnitList?.length) {
            dispatch(setIsDeliveryDateDefaultValue(data?.multiUnitList));
            let arrayForSort = [...data.multiUnitList];
            let arrayToAdd = arrayForSort?.filter((element) =>
              selectedUnitsList?.every((item) => item?.unitPK !== element?.unitPK)
            );
            if (arrayToAdd?.length) {
              let arrayList = arrayToAdd?.map((unit) => ({ ...unit, emailDriver: false }));
              dispatch(addArrayToSelected(arrayList));
            }

            // future reference
            // dispatch(setEnableAddLoadUnitButtons(false));
          } else {
            dispatch(setShowUnitInactiveModal(true));
            dispatch(setResponseMessage(data?.responseMessage));
          }
        })
        .catch((error) => {})
        .finally(() => setAddLoadLoading(false));
    }
  };

  /**
   * Handle Button Functions
   */
  const handleWarningYes = () => {
    setWarningShow(false);
    setShowOverrideModal(false);

    if (!multiUnitSeperateInvoice) {
      navigate(`/paperwork-processing/scan-paperwork`);
    } else {
      handleFurtherLoopingNavigation(percentageCaculationIndex);
    }
  };
  const handleWarningNo = () => {
    setWarningShow(false);
    setShowOverrideModal(true);
    setValidOverride(false);
  };

  const handleCloseofWarning = () => {
    setWarningShow(false);
    setValidOverride(false);
    setShowOverrideModal(false);
  };

  const handleCancelShowYes = () => {
    setCancelShow(false);
    dispatch(resetPaperworkProcessing());
    dispatch(setCompanyFK(null));
    dispatch(setRealseHoldStatus(true));
    dispatch(setReleaseHoldPermission(true));
    dispatch(setUnitOnInvoiceHold(true));
    dispatch(toggleChangesCancelled());
    dispatch(setCreditCardArrayList([]));
    setRemainingAmount(0);
    navigate(`/paperwork-processing/unit-selection`);
  };
  const handleCancelShowNo = () => {
    setCancelShow(false);
  };

  const disableNext = () => {
    if (unitSelection) {
      if (selectedUnit === null || enableAddLoadUnitButtons || selectedUnitsList?.length === 0) return true;
      else return false;
    } else if (unitView) {
      return unitViewDisableNext;
    } else if (additionalAmounts) {
      return additionalAmountsDisableNext || nextLoading || breakdownDelayLoading;
    } else if (driversEmail) {
      if (driversEmailArray?.some((element) => !element?.driverEmailText?.trim())) {
        return true;
      } else {
        return false;
      }
    } else if (splitTrip) {
      return false;
    } else if (breakdownDelay) {
      if (selectedUnit?.fodInvoice && creditCardBreakdownCharge > 0 && !Number(remainingAmount) === 0) {
        return true;
      } else {
        return false;
      }
    } else if (amountsConfirmation) {
      if (invoiceTotalAmntConf <= 0) {
        return true; // disable next button
      } else {
        return false;
      }
    } else if (equipmentReturn) {
      return false;
    } else {
      return true;
    }
  };

  const copyAdditionalAmountsFieldsOnNext = () => {
    if (multiUnitSeperateInvoice && selectedUnitsListIndex === 0 && !isCopyingCompleted) {
      dispatch(
        copyAdditionalAmountsFields({
          invoiceWash: additionalAmountsList?.[selectedUnitsListIndex]?.invoiceWashAmount,
          driverWash: additionalAmountsList?.[selectedUnitsListIndex]?.driverList?.[0]?.wash,
          invoiceTexts: additionalAmountsList?.[selectedUnitsListIndex]?.invoiceText,
        })
      );
      dispatch(setIsCopyingCompleted(true));
    }
  };

  const handleAdditionalAmountsNext = () => {
    setNextLoading(true);
    dispatch(setSelectedUnitsListIndex(0));

    //to know if partial trip for any of the unit is true
    const isPartialTrip = selectedUnitsList?.some((unit) => unit?.partialTrip);
    //filter out the Ids of those units with partial trip true
    const partialTripIds =
      selectedUnitsList
        ?.filter((unit) => unit?.partialTrip) // Filter units with partialTrip set to true
        .map((unit) => unit?.unitPK) || []; // Extract unitPK from filtered units
    if (isPartialTrip) {
      getPartialTripData(partialTripIds);
    } else {
      isUnitDelayed();
    }

    copyAdditionalAmountsFieldsOnNext();
  };

  const handleAmountsConfirmationNext = () => {
    if (percentageCalculationPayload?.length > 0) {
      getPercentageCalculation(
        percentageCalculationPayload[percentageCaculationIndex],
        percentageCaculationIndex
      );
    }
  };

  const handleDriverEmail = () => {
    const distinctItems =
      driversEmailList
        ?.filter((item, index, self) => index === self?.findIndex((i) => i?.driverFK === item?.driverFK))
        .map((element) => ({
          unitPK: element?.unitPK,
          driverId: element?.driverFK,
        })) || [];

    PaperworkProcessingService.fetchDriverEmailDetails(distinctItems, companyName).then((response) => {
      const data = response?.data?.map((element) => ({ ...element, driverEmailText: "" })) || [];
      dispatch(
        setDriversEmailArray({
          type: "set",
          payload: data,
        })
      );
      navigate(`/paperwork-processing/drivers-email`);
    });
  };

  const handleNext = () => {
    if (unitSelection) {
      navigate(`/paperwork-processing/unit-view`);
    } else if (unitView) {
      if (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) {
        handleAdditionalAmountsNext();
      } else if (selectedUnitsList?.some((unit) => unit?.emailDriver)) {
        handleDriverEmail();
      } else {
        navigate(`/paperwork-processing/additional-amounts`);
      }
    } else if (driversEmail) {
      const driverEmailFinalList =
        driversEmailArray?.map((element) => ({
          unitPK: element?.unitPK,
          driverId: element?.driverFK,
          driverEmailText: element?.driverEmailText,
        })) || [];
      navigate(`/paperwork-processing/additional-amounts`);
    } else if (additionalAmounts) {
      handleAdditionalAmountsNext();
    } else if (equipmentReturn) {
      getAmountConfirmationDetailsPK(additionalAmountsList, companyFK, companyName);
    } else if (amountsConfirmation) {
      handleAmountsConfirmationNext();
    } else if (splitTrip) {
      isUnitDelayed();
    } else if (breakdownDelay) {
      checkEquipmentList();
    }
  };

  const handleBack = () => {
    if (missingPaperwork) {
      dispatch(restoreInvoiceHoldSnapshot());
    }
    goBack();

    if (unitView) {
      navigate(`/paperwork-processing/unit-selection`);
    } else if (missingPaperwork) {
      navigate(`/paperwork-processing/unit-view`);
    } else if (driversEmail) {
      // TODO
    } else if (additionalAmounts) {
      dispatch(setSelectedUnitsListIndex(0));
      navigate(`/paperwork-processing/unit-view`);
    } else if (amountsConfirmation) {
      // TODO
    } else if (scanPaperwork) {
      dispatch(setInvoiceLineItems());
      // TODO
    } else if (breakdownDelay) {
    } else if (equipmentReturn) {
    } else {
      // TODO
    }
    // dispatch(setSelectedUnitsListIndex(0));
  };

  const handleCancel = () => {
    if (
      unitSelection ||
      unitView ||
      driversEmail ||
      additionalAmounts ||
      amountsConfirmation ||
      breakdownDelay ||
      splitTrip ||
      equipmentReturn
    ) {
      dispatch(setCompanyFK(null));
      dispatch(resetPaperworkProcessing());
      dispatch(setRealseHoldStatus(true));
      dispatch(setReleaseHoldPermission(true));
      dispatch(setUnitOnInvoiceHold(true));
      navigate(`/paperwork-processing/unit-selection`);
      dispatch(toggleChangesCancelled());
      dispatch(setCreditCardArrayList([]));
      setRemainingAmount(0);
    } else if (scanPaperwork) {
      setCancelShow(true);
    } else if (missingPaperwork) {
      dispatch(setMissingPaperworkAttachVideo(false));
      dispatch(setMissingPaperworkEmailText(""));
      dispatch(setMissingPaperworkFlag(false));
      dispatch(setMissingPaperworkDrivers([]));
      dispatch(setEmailText(""));
      dispatch(setNotes(""));

      dispatch(setMissingPaperworkObject({}));
      dispatch(setMissingPaperworkChargeEfee(false));
      dispatch(restoreInvoiceHoldSnapshot());
      navigate(`/paperwork-processing/unit-view`);
    }
  };

  const disableSave = () => {
    if (missingPaperwork) {
      if (!emailText || !emailText?.trim()) {
        return true;
      }
      if (unitOnInvoiceHold && (!invoiceHoldReason || !invoiceHoldReason?.trim())) {
        return true;
      }
      return false;
    } else if (scanPaperwork) {
      return scanPaperworkDisableSave;
    } else if (breakdownDelay) {
      return true;
    }
  };

  const disableMissingPaperwork = () => {
    if (missingPaperworkDrivers?.length > 0) {
      const filteredArray = missingPaperworkDrivers?.filter((item) => item === missingPaperworkUnit?.driverFK);

      // Return true if filteredArray has any elements, meaning the driverId is in the array
      if (filteredArray?.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleMissingPaperworkSave = () => {
    setMissingPaperworkLoading(true);
    PaperworkProcessingService.saveMissingPaperwork(missingPaperworkObject)
      .then(() => {
        // Saved: the hold state now comes from what was just saved, not the pre-visit snapshot.
        dispatch(clearInvoiceHoldSnapshot());
        dispatch(setMissingPaperworkAttachVideo(false));
        dispatch(setMissingPaperworkFlag(true));
        dispatch(setMissingPaperworkDrivers(missingPaperworkObject?.driverId));
        dispatch(setCompanyFK(null));

        // Multi-unit with all units on the same driver: the Email Text just saved
        // already covers every unit's missing paperwork, so there's nothing left to
        // fill in for this dispatch - go straight back to Unit Selection like the
        // single-unit case. Multi-unit with different drivers still needs a separate
        // Missing Paperwork entry per driver, so stay on Unit Information for the rest.
        const allUnitsHaveSameDriver = selectedUnitsList?.every(
          (unit) => unit?.driverFK === selectedUnitsList?.[0]?.driverFK
        );

        if (selectedUnit?.multiUnit && !allUnitsHaveSameDriver) {
          navigate("/paperwork-processing/unit-view");
        } else {
          navigate("/paperwork-processing/unit-selection");
          dispatch(resetPaperworkProcessing());
        }
        toast.success("Missing Paperwork Saved");
      })
      .finally(() => setMissingPaperworkLoading(false));
  };

  const handleScanPaperworkSave = () => {
    setSavingInvoice(true);
    const singleInvoiceList = [{ ...invoiceSaveList?.[0], multiUnitList: multiUnitList }];

    PaperworkProcessingService.saveInvoiceWithSP(
      multiUnitSeperateInvoice ? invoiceSaveList : singleInvoiceList
    )
      .then((response) => {
        const saveInvoiceResponse = response?.data?.[0];

        if (String(saveInvoiceResponse?.errorCode) === "1") {
          // Hide the loader
          setTransIds(saveInvoiceResponse?.refTranID);
          setCreditCardArrayList((prevList) =>
            (prevList || []).map((card) =>
              saveInvoiceResponse?.completedCards?.includes(card?.unmaskedCardNumber)
                ? { ...card, processed: 1 }
                : card
            )
          );
          setSavingInvoice(false);
          toast.error("Credit Card Processing Failed. Cannot Save Invoice.");
        } else {
          setSavingInvoice(false);
          dispatch(setCompanyFK(null));

          // For Multi Unit Multi Invoice */
          const updatedScanPaperworkSaveList = scanPaperworkSaveList?.map((unit, index) => ({
            ...unit,
            invoiceNumber: saveInvoiceResponse?.[unit?.unitPK]?.invoiceNumber || 0,
            invoiceNumberPrimary: saveInvoiceResponse?.[unit?.unitPK]?.invoiceNumberPrimary || 0,
            invoiceFK: saveInvoiceResponse?.[unit?.unitPK]?.invoiceFK || 0,
          }));

          const responseList =
            response?.data?.flatMap((item) => {
              if (!item) return [];
              const [unitId] = Object.keys(item);
              const unitData = item[unitId];
              return (
                unitData?.Invoice?.map((inv) => ({
                  unitNumber: unitData?.unitNumber,
                  invoiceNumber: inv?.InvoiceNumber,
                  companyName: inv?.companyName,
                })) || []
              );
            }) || [];

          setInvoiceResponseList(responseList);
          setUploadingFiles(true);
          return PaperworkProcessingService.savePDFFileList(
            response?.data,
            updatedScanPaperworkSaveList,
            companyName,
            selectedUnitsList?.[0],
            companyFK
          )
            .then(() => {
              setUploadingFiles(false);
              setShowInvoiceGenerationSuccess(true);
            })
            .catch((error) => {
              setSavingInvoice(false);
              setUploadingFiles(false);
              setShowInvoiceGenerationSuccess(true);
              console.error("Error:", error);
            })
            .finally(() => {
              setSavingInvoice(false);
              setUploadingFiles(false);
            });
        }
      })
      .catch((error) => {
        setSavingInvoice(false);
        toast.error("Invoice generation failed!");
        console.error("Error:", error);
      });
  };

  const handleSave = () => {
    if (missingPaperwork) {
      handleMissingPaperworkSave();
    } else if (scanPaperwork) {
      handleScanPaperworkSave();
    } else if (breakdownDelay) {
      handleScanPaperworkSave();
    }
  };

  const handleAddLoad = () => {
    fetchAllMultiUnitsLoads();
  };

  const setMultiUnitsList = () => {
    if (selectedUnitsList?.length > 0) {
      let filteredList = selectedUnitsList?.filter((element) => element?.unitPK !== selectedUnit?.unitPK);

      let unitList = filteredList?.map((unit) => ({
        unitPK: unit?.unitPK,
        unitNumber: unit?.unitNumber,
        vin: unit?.vin?.trim(),
        model: unit?.model?.trim(),
        descriptionLong: unit?.descriptionLong,
        dispatchId: unit?.dispatchPK,
        driverFKInt: unit?.driverFK,
        driverEmailText:
          driversEmailArray?.filter((item) => item?.unitPK === unit?.unitPK)?.[0]?.driverEmailText || null,
      }));
      dispatch(setMultiUnitList(unitList));
    }
  };

  /**
   * Custom Hooks & useEffects
   * -------------------------
   */

  const additionalAmountsNavigation = useArrayListNavigation(
    selectedUnitsList?.length,
    selectedUnitsListIndex,
    (newIndex) => dispatch(setSelectedUnitsListIndex(newIndex))
  );

  const selectedUnitsListNavigation = useArrayListNavigation(
    selectedUnitsList?.length,
    selectedUnitsListIndex,
    (newIndex) => dispatch(setSelectedUnitsListIndex(newIndex))
  );
  const [uniqueArrayIndex, setUniqueArrayIndex] = useState(0);

  const delayNavigation = useArrayListNavigation(uniqueCombinedArray?.length, uniqueArrayIndex, (newIndex) =>
    setUniqueArrayIndex(newIndex)
  );

  useEffect(() => {
    dispatch(
      setSelectedDelayUnitBreakdownFK(uniqueCombinedArray[uniqueArrayIndex]?.delayedUnitBreakdownFKInt)
    );
  }, [uniqueArrayIndex, uniqueCombinedArray]);

  const driversEmailListNavigation = useArrayListNavigation(
    driversEmailArray?.length,
    driversEmailIndex,
    (newIndex) => dispatch(setDriversEmailIndex(newIndex))
  );

  useEffect(() => {
    if (additionalAmounts || amountsConfirmation || scanPaperwork) {
      dispatch(setSelectedUnitsListIndex(0));
    }
  }, []);

  useEffect(() => {
    if (
      unitView ||
      missingPaperwork ||
      driversEmail ||
      additionalAmounts ||
      amountsConfirmation ||
      scanPaperwork ||
      breakdownDelay ||
      splitTrip ||
      equipmentReturn
    ) {
      if (!selectedUnit) {
        navigate("/paperwork-processing/unit-selection");
      }
    }
  }, [selectedUnit]);

  useEffect(() => {
    if (scanPaperwork) {
      selectedUnit?.multiUnit && setMultiUnitsList();
    }
  }, []);

  /**
   * Initialize additionalAmountsList before Additional Amounts Screen
   */
  useEffect(() => {
    if (unitView && driverList?.length > 0) {
      const additionalAmountsList = selectedUnitsList?.map((unit) => ({
        unitPK: unit?.unitPK,
        unitId: unit?.unitPK,
        multiUnit: unit?.multiUnit,
        numberOfUnits: selectedUnitsList?.length || 0,
        invoiceTollsAmount: 0,
        invoicePermitsAmount: 0,
        invoiceWashAmount: 0,
        driverList: !multiUnitSeperateInvoice
          ? driverList?.map((unit) => ({
              driverFKInt: unit?.driverFK,
              tolls: 0,
              permits: 0,
              wash: 0,
              charge1: 0,
              charge2: 0,
              charge3: 0,
              pay1: 0,
              pay2: 0,
            }))
          : [
              {
                driverFKInt: unit?.driverFK,
                tolls: 0,
                permits: 0,
                wash: 0,
                charge1: 0,
                charge2: 0,
                charge3: 0,
                pay1: 0,
                pay2: 0,
              },
            ],
        invoiceCharge1: 0,
        invoiceCharge2: 0,
        invoiceCharge3: 0,
        charge1Description: "",
        charge2Description: "",
        charge3Description: "",
        pay1Description: "",
        pay2Description: "",
        invoiceText: Array(3).fill(""),
        charge1DescriptionPaymentMode: "Pay",
        charge2DescriptionPaymentMode: "Pay",
        charge3DescriptionPaymentMode: "Pay",
        driver1Pay1PaymentMode: "Pay",
        driver1Pay2PaymentMode: "Pay",
      }));

      dispatch(
        setAdditionalAmountsList({
          type: "set",
          payload: additionalAmountsList,
        })
      );
    }
  }, [driverList]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(nextLoading ||
        allowedApiLoading ||
        addLoadLoading ||
        savingInvoice ||
        uploadingFiles ||
        loading ||
        unitAcLoading ||
        equipmentLoading ||
        unitDelayedLoading ||
        missingPaperworkLoading ||
        breakdownDelayLoading) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {/* Credit Card */}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => setShowCreditCard(true)}

          disabled={!(selectedUnit?.fodInvoice && creditCardBreakdownCharge > 0)}
          hidden={!breakdownDelay}
        >
          Credit Card
        </button>
        {unitSelection && (
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            disabled={!enableAddLoadUnitButtons}
            onClick={() => handleAddLoad()}
          >
            Add Load
          </button>
        )}
        {unitView && (
          <Link to="/paperwork-processing/missing-paperwork">
            <button
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type="button"
              disabled={disableMissingPaperwork()}
              onClick={() => dispatch(saveInvoiceHoldSnapshot())}
            >
              Missing Paperwork
            </button>
          </Link>
        )}
        {breakdownDelay && (
          <>
            {uniqueCombinedArray?.length > 0 && (
              <>
                <button
                  className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
                  type="button"
                  onClick={() => {
                    delayNavigation.goToPrevious();
                    dispatch(setSortTypeFeeTab(false));
                    dispatch(setSortValueFeeTab(null));
                  }}
                  disabled={delayNavigation.isPreviousDisabled}
                >
                  Last Delay
                </button>
                <button
                  className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
                  type="button"
                  onClick={() => {
                    delayNavigation.goToNext();
                    dispatch(setSortTypeFeeTab(false));
                    dispatch(setSortValueFeeTab(null));
                  }}
                  disabled={delayNavigation.isNextDisabled}
                >
                  Next Delay
                </button>
              </>
            )}
          </>
        )}
        {(additionalAmounts || amountsConfirmation || scanPaperwork) && multiUnitSeperateInvoice && (
          <>
            <button
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type="button"
              onClick={() => {
                if (additionalAmounts) {
                  // Additional Amounts Unit Looping Navigation
                  additionalAmountsNavigation.goToPrevious();
                } else {
                  // Default Unit Looping Navigation using selectedUnitsList
                  selectedUnitsListNavigation.goToPrevious();
                }
              }}
              disabled={
                (additionalAmounts && additionalAmountsNavigation.isPreviousDisabled) ||
                (scanPaperwork && !inactiveDropzone) ||
                selectedUnitsListNavigation.isPreviousDisabled
              }
            >
              Last Unit
            </button>
            <button
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type=""
              onClick={() => {
                if (additionalAmounts) {
                  // Additional Amounts Unit Looping Navigation
                  additionalAmountsNavigation.goToNext();
                  copyAdditionalAmountsFieldsOnNext();
                } else {
                  // Default Unit Looping Navigation using selectedUnitsList
                  selectedUnitsListNavigation.goToNext();
                }
              }}
              disabled={
                (additionalAmounts && additionalAmountsNavigation.isNextDisabled) ||
                (scanPaperwork && (!isCurrentUnitValid || !inactiveDropzone)) ||
                selectedUnitsListNavigation.isNextDisabled
              }
            >
              Next Unit
            </button>
          </>
        )}
        {splitTrip && (
          <>
            <button
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type="button"
              onClick={() => {
                if (partialTripArray?.length > 0 && partialTripIndex > 0) {
                  dispatch(setPartialTripIndex(partialTripIndex - 1));
                }
              }}
              disabled={partialTripIndex === 0 || partialTripArray?.length === 1}
            >
              Last Split
            </button>
            <button
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type=""
              onClick={() => {
                if (partialTripArray?.length > 0 && partialTripIndex < partialTripArray?.length) {
                  dispatch(setPartialTripIndex(partialTripIndex + 1));
                }
              }}
              disabled={partialTripIndex === partialTripArray?.length - 1 || partialTripArray?.length === 1}
            >
              Next Split
            </button>
          </>
        )}
        {driversEmail && (
          <>
            <button
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type="button"
              onClick={() => {
                driversEmailListNavigation.goToPrevious();
              }}
              disabled={
                driversEmailListNavigation.isPreviousDisabled /*|| !driversEmailArray?.[driversEmailListNavigation.currentIndex]?.driverEmailText*/
              }
            >
              Last Email
            </button>
            <button
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type=""
              onClick={() => {
                driversEmailListNavigation.goToNext();
              }}
              disabled={
                driversEmailListNavigation.isNextDisabled ||
                !driversEmailArray?.[driversEmailListNavigation.currentIndex]?.driverEmailText?.trim()
              }
            >
              Next Email
            </button>
          </>
        )}
        {(unitView ||
          missingPaperwork ||
          driversEmail ||
          additionalAmounts ||
          amountsConfirmation ||
          scanPaperwork ||
          breakdownDelay ||
          splitTrip ||
          equipmentReturn) && (
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            onClick={() => handleBack()}
          >
            Back
          </button>
        )}
        {scanPaperwork && (
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            disabled={true}
            hidden
          >
            Scan
          </button>
        )}
        {(missingPaperwork || scanPaperwork) && (
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            disabled={disableSave()}
            onClick={() => handleSave()}
          >
            Save
          </button>
        )}
        {(unitSelection ||
          unitView ||
          driversEmail ||
          additionalAmounts ||
          amountsConfirmation ||
          breakdownDelay ||
          splitTrip ||
          equipmentReturn) && (
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            disabled={disableNext()}
            onClick={() => handleNext()}
          >
            Next
          </button>
        )}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        {/* used for amount conf screen */}
        <ModalComponent
          show={warningShow}
          onHide={() => {
            handleCloseofWarning();
          }}
          title={"Proceed Invoicing"}
          body={`Unit Number: ${percentageCalculationPayload[percentageCaculationIndex]?.unitNumber || "****"} does not meet invoicing percentage. Current Invoicing Percentage is: ${percentageToDisplay}. Allow to proceed?`}
          handleYES={() => {
            handleWarningYes();
          }}
          handleNO={() => {
            handleWarningNo();
          }}
        />

        <OverrideCodeModalComponent
          permissionObjectKey={getPermissionKey("INV_OVERRIDE", "edit")}
          show={showOverrideModal}
          onHide={() => {
            setShowOverrideModal(false);
          }}
          open={() => {
            setShowOverrideModal(true);
          }}
          permission={checkPermission("INV_OVERRIDE", "edit")}
          body={`User does not meet invoicing percentage. Do you want to Override with another user for Unit Number: ${percentageCalculationPayload[percentageCaculationIndex]?.unitNumber || "****"}`}
          className={""}
          handleYES={true}
          handleNO={true}
          validOverride={validOverride} // a boolean field which implies if the user has override permission.
          setValidOverride={setValidOverride}
          customAddonForOverride={(enteredOverrideCode) => {
            getPercentageCalculation(
              percentageCalculationPayload[percentageCaculationIndex],
              percentageCaculationIndex,
              enteredOverrideCode
            );
          }}
          color={""}
        />
        {/* Invoice Generation Success Modal */}
        <ModalComponent
          show={showInvoiceGenerationSuccess}
          onHide={() => {
            setShowInvoiceGenerationSuccess(false);
            navigate("/paperwork-processing/unit-selection");
            dispatch(resetPaperworkProcessing());
          }}
          title={"Invoice Generation Completed"}
          body={
            <div>
              {invoiceResponseList?.length > 0 && (
                <div style={{ maxHeight: "150px", overflowY: "auto" }} className="mt-4">
                  <table className="table table-bordered rounded">
                    <thead>
                      <tr>
                        <th className="fw-bolder">Unit Number</th>
                        <th className="fw-bolder">Invoice Number</th>
                        <th className="fw-bolder">Company</th>
                      </tr>
                    </thead>
                    <tbody className="overflow-auto">
                      {invoiceResponseList?.map((unit, index) => (
                        <tr key={index}>
                          <td>{unit?.unitNumber}</td>
                          <td>{unit?.invoiceNumber}</td>
                          <td>{unit?.companyName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          }
          handleOK={() => {
            setShowInvoiceGenerationSuccess(false);
            navigate("/paperwork-processing/unit-selection");
            dispatch(resetPaperworkProcessing());
          }}
          showOK
        />
        {/* cancel model for save*/}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelShowNo}
          title={"Cancel Invoicing"}
          body={"Do you want to Cancel Invoicing?"}
          handleYES={handleCancelShowYes}
          handleNO={handleCancelShowNo}
        />
        {/* Credit Card Modal */}
        <CreditCardComponent
          show={showCreditCard}
          onHide={() => setShowCreditCard(false)}
          customerId={invoiceSaveList?.[0]?.customerId}
          incomingAmount={creditCardBreakdownCharge}
          setCreditCardArrayList={(value) => dispatch(setCreditCardArrayList(value))}
          unitPK={invoiceSaveList?.[0]?.unitId}
          amountTitle={"Breakdown Charges Amount"}
          source={"Paperwork Processing"}
          programName={"PaperworkProcessing"}
          creditCardArrayList={creditCardArrayList}
          dispatched={true}
          setRemainingAmount={(value) => setRemainingAmount(value)}
          remainingAmountValue={remainingAmount}
        />
      </div>
    </div>
  );
};

export default Footer;
