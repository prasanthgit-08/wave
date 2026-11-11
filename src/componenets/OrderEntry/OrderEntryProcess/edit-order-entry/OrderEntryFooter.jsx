import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonComponent from "../../../common/Button";
import OrderEntryService from "../../../../services/OrderEntryService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import {
  setUnitNumber,
  setVin,
  setDupLoadForOpenBal,
  setActiveKey,
  setDataReset,
  setIsSaving,
  setDupLoadForCreditCard,
  setEnableAppliedAmount,
  setChangeColor,
  setShowSingleUnitActivation,
  setOeUnitData,
  setEditPartialOrInCompleteOpenBalance,
  setSpecialCodeInput,
} from "../../../../redux/OrderEntryFilterSlice";
import { Modal, Button, Table } from "react-bootstrap";
import "./OrderConfirmation.css";
import LoadingIcon from "../../../common/LoadingIcon";
import UnitActivationSingleSelectionScreenModal from "./tabs/modal/UnitActivationSingleSelectionScreenModal";
import WarningModalPopUp from "../../../common/WarningModalPopUp";
import { setBrowseType } from "../../../../redux/UnitActivationSlice";

function OrderEntryFooter() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  // const userPK = loggedInUser?.userPK;

  // /**
  //  * Send Customer and Shuttle BOL Email when Order Entry exit screen or Customer change
  //  */

  // // This ref tracks if the user finished the task properly
  // const userCompletedAction = useRef(false);

  // const handleUnexpectedLeave = () => {
  //   if (userCompletedAction.current) return;
  //   OrderEntryService.sendNotificationMail("Bol");
  //   OrderEntryService.sendNotificationMail("Shuttle");
  // };

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     handleUnexpectedLeave();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     handleUnexpectedLeave(); // For route change
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // const handleComplete = () => {
  //   userCompletedAction.current = true; // Mark task as finished
  //   console.log("User finished task — no email will be sent");
  // };

  // const [showErrorMsg, setShowErrorMsg] = useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [validationTabString, setValidationTabString] = useState("Tab validation failed for ");
  // const [showCreditCardWarning, setShowCreditCardWarning] = useState(false); // for credit card warning message
  // const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  // const [localPickupDealer, setLocalPickupDealer] = useState(null);
  // const [localDeliveryDealer, setLocalDeliveryDealer] = useState(null);
  // const [localStateCodeInput, setLocalStateCodeInput] = useState("");
  // const [showOpenBalancesWarning, setShowOpenBalancesWarning] = useState(false); // for open balances warning message
  // const [preInvoiceResult, setPreInvoiceResult] = useState([]);
  // const [preInvoiceModal, setPreInvoiceModal] = useState(false);
  // const handleCreditCardWarning = () => setShowCreditCardWarning(false);
  // const handleOpenBalancesWarning = () => setShowOpenBalancesWarning(false);
  // //Batch Load
  // const [isLoading, setIsLoading] = useState(false);
  // const [fodInvoice, setFODInvoice] = useState(false);
  // const [fodInvoiceAmount, setFODInvoiceAmount] = useState(0);
  // // State to check whether the unit's delivery dealer is a fod dealer in customerdealers table
  // const fodDealer = useSelector((state) => state.orderEntryReducer.fodDealer);
  // // const [errorCnt ,setErrorCnt] = useState(0); //for showing tabs /tab msg
  // //for validation

  // //Customer Validation flag
  // const isCustomerTabValid = useSelector((state) => state.orderEntryReducer.isCustomerTabValid);
  // const duplicateLoad = useSelector((state) => state.orderEntryReducer.duplicateLoad);
  // const batchLoadCustomerTab = useSelector((state) => state.orderEntryReducer.batchLoadCustomerTab);
  // const firstBatchSequence = useSelector((state) => state.orderEntryReducer.firstBatchSequence);
  // const lastBatchSequence = useSelector((state) => state.orderEntryReducer.lastBatchSequence);
  // const totalBatchLoadCount = useSelector((state) => state.orderEntryReducer.totalBatchLoadCount);
  // const customerIndb = useSelector((state) => state.orderEntryReducer.customerData);
  // const selectedPickupDealer = useSelector((state) => state.orderEntryReducer.selectedPickupDealer);
  // const selectedDeliveryDealer = useSelector((state) => state.orderEntryReducer.selectedDeliveryDealer);
  // const specialCodeInput = useSelector((state) => state.orderEntryReducer.specialCodeInput);

  // //unit validation flag
  // const isUnitValid = useSelector((state) => state.orderEntryReducer.unitTabIsValid);
  // //Misc Customer Validation flag
  // const isMiscCustomerValid = useSelector((state) => state.orderEntryReducer.miscCustomerTabIsValid);

  // //Misc Pickup Tab Validation flag
  // const isMiscPickupDealerValid = useSelector((state) => state.orderEntryReducer.miscPickupDealerTabIsValid);
  // //Misc Delivery Tab validation flag
  // const isMiscDeliveryDealerValid = useSelector(
  //   (state) => state.orderEntryReducer.miscDeliveryDealerTabIsValid
  // );
  // //Miscellaneuous Delivery checkbox state in unit tab
  // const miscellaneousDelivery = useSelector((state) => state.orderEntryReducer.miscellaneousDelivery);
  // //driveby
  // const isDriveByValid = useSelector((state) => state.orderEntryReducer.driveByValidationFlag);
  // const enableDriveby = useSelector((state) => state.orderEntryReducer.hasDriveBy);
  // //overwidth
  // const isOverWidthValid = useSelector((state) => state.orderEntryReducer.overWidthValidationFlag);
  // //invoice hold

  // const invoiceHoldTabIsValid = useSelector((state) => state.orderEntryReducer.invoiceHoldTabIsValid);

  // const unitOverWidthPermits = useSelector((state) => state.orderEntryReducer.unitOverWidthPermitsData);
  // const unitDriveByObjects = useSelector((state) => state.orderEntryReducer.drivebyArray);
  // const miscCustomerData = useSelector((state) => state.orderEntryReducer.miscCustomerData);
  // const unitTabIsValid = useSelector((state) => state.orderEntryReducer.unitTabIsValid);
  // const saveTollsAndPermits = useSelector((state) => state.orderEntryReducer.saveTollsAndPermits);

  // //Contacts Tab
  // const contactsAssignedContacts = useSelector((state) => state.orderEntryReducer.assignedContacts);

  // //
  // const dataResetFlag = useSelector((state) => state.orderEntryReducer.dataReset);

  // const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  // const selectedCustomerBillingPlantId = useSelector(
  //   (state) => state.orderEntryReducer.selectedCustomerBillingPlantId
  // );
  // const isCustomerMisc = useSelector((state) => state.orderEntryReducer.isCustomerMisc);
  // const deliverToPlant = useSelector((state) => state.orderEntryReducer.deliverToPlant);
  // const deliveryCustomerPlantId = useSelector((state) => state.orderEntryReducer.deliveryCustomerPlantId);
  // const deliveryCustomerYardId = useSelector((state) => state.orderEntryReducer.deliveryCustomerYardId);
  // const shuttleFromYard = useSelector((state) => state.orderEntryReducer.shuttleFromYard);
  // const deliveryCustomerShuttleCityId = useSelector(
  //   (state) => state.orderEntryReducer.deliveryCustomerShuttleCityId
  // );
  // const pickupAtPlant = useSelector((state) => state.orderEntryReducer.pickupAtPlant);
  // const pickupCustomerPlantId = useSelector((state) => state.orderEntryReducer.pickupCustomerPlantId);
  // const shuttleToYard = useSelector((state) => state.orderEntryReducer.shuttleToYard);
  // const pickupCustomerYardId = useSelector((state) => state.orderEntryReducer.pickupCustomerYardId);
  // const pickupCustomerShuttleCityId = useSelector(
  //   (state) => state.orderEntryReducer.pickupCustomerShuttleCityId
  // );
  // const reload = useSelector((state) => state.orderEntryReducer.reload);
  // const returnRates = useSelector((state) => state.orderEntryReducer.returnRates);
  // const bulkUnits = useSelector((state) => state.orderEntryReducer.bulkUnits);
  // const checkPrepaid = useSelector((state) => state.orderEntryReducer.checkPrepaid);
  // const plantCode = useSelector((state) => state.orderEntryReducer.plantCode);
  // const noPickupPulloutFee = useSelector((state) => state.orderEntryReducer.noPickupPulloutFee);
  // const noDeliveryPulloutFee = useSelector((state) => state.orderEntryReducer.noDeliveryPulloutFee);
  // const bulkInvoiceFK = useSelector((state) => state.orderEntryReducer.bulkInvoiceFK);

  // //Misc Delivery Tab(getting misc delivery form data from redux)
  // const miscDeliveryDealerData = useSelector((state) => state.orderEntryReducer.miscDeliveryDealerFormData);
  // const miscPickupDealerData = useSelector((state) => state.orderEntryReducer.miscPickupDealerData);

  // //Notes Tab(Save in unit table)
  // const unitNotes = useSelector((state) => state.orderEntryReducer.notes);

  // const dispatchNotes = useSelector((state) => state.orderEntryReducer.dispatchNotesRedux);
  // //Invoice Hold Tab(Save in unit table)
  // const invoiceHoldNotes = useSelector((state) => state.orderEntryReducer.invoiceHoldNotes);

  // //Open Balance (to save data in unit open balance table)
  // const openBalanceObjArr = useSelector((state) => state.orderEntryReducer.openBalanceArray);

  // //overWidth flag
  // const overWidthLoadFromRedux = useSelector((state) => state.orderEntryReducer.overWidthLoad);

  // //onHold Tab Validation flag
  // const isOnHold = useSelector((state) => state.orderEntryReducer.onHoldTab);
  // const onHoldData = useSelector((state) => state.orderEntryReducer.formDataOnHold);

  // //Open balance tab
  // const isOpenBalanceValid = useSelector((state) => state.orderEntryReducer.isOpenBalanceValid);
  // const useOpenBalance = useSelector((state) => state.orderEntryReducer.useOpenBalance);

  // // credit card tab color

  // const chargeCreditCard = useSelector((state) => state.orderEntryReducer.chargeCreditCharge);
  // const creditCardData = useSelector((state) => state.orderEntryReducer.creditCardData);
  // const isMandatoryCreditCardTab = useSelector((state) => state.orderEntryReducer.isMandatoryCreditCardTab);
  // const isCreditCardDetailsInComplete = useSelector(
  //   (state) => state.orderEntryReducer.isCreditCardDetailsInComplete
  // ); // for credit card warning message

  // const isCreditCardDetailsPartial = useSelector(
  //   (state) => state.orderEntryReducer.isCreditCardDetailsPartial
  // ); // for credit card warning message

  // const isOpenBalancesDetailsInComplete = useSelector(
  //   (state) => state.orderEntryReducer.isOpenBalancesDetailsInComplete
  // ); // for open balances warning message

  // const isOpenBalancesDetailsPartial = useSelector(
  //   (state) => state.orderEntryReducer.isOpenBalancesDetailsPartial
  // ); // for open balances warning message

  // //unitRoutes
  // const unitRoutes = useSelector((state) => state.orderEntryReducer.unitRouteArray);
  // // Unit Tab
  // const unitNumber = useSelector((state) => state.orderEntryReducer.unitNumber);
  // const model = useSelector((state) => state.orderEntryReducer.model);
  // const modelCode = useSelector((state) => state.orderEntryReducer.modelCode);
  // const vin = useSelector((state) => state.orderEntryReducer.vin);
  // const serialNumber = useSelector((state) => state.orderEntryReducer.serialNumber);
  // const stockNumber = useSelector((state) => state.orderEntryReducer.stockNumber);
  // const unitTypesFK = useSelector((state) => state.orderEntryReducer.unitTypesFK);
  // const engineGas = useSelector((state) => state.orderEntryReducer.engineGas);
  // const engineDiesel = useSelector((state) => state.orderEntryReducer.engineDiesel);
  // const specialCodesFK = useSelector((state) => state.orderEntryReducer.specialCodesFK);
  // const pickupDealersFK = useSelector((state) => state.orderEntryReducer.pickupDealersFK);
  // const miscellaneousPickup = useSelector((state) => state.orderEntryReducer.miscellaneousPickup);
  // const deliveryDealersFK = useSelector((state) => state.orderEntryReducer.deliveryDealersFK);
  // const collectForCustomer = useSelector((state) => state.orderEntryReducer.collectForCustomer);
  // const poNumberRedux = useSelector((state) => state.orderEntryReducer.poNumberRedux);
  // const authorizedByUnit = useSelector((state) => state.orderEntryReducer.authorizedByUnit);
  // const projectCodeUnit = useSelector((state) => state.orderEntryReducer.projectCodeUnit);
  // const bankUnit = useSelector((state) => state.orderEntryReducer.bankUnit);
  // const clientUnit = useSelector((state) => state.orderEntryReducer.clientUnit);
  // const GVWRUnit = useSelector((state) => state.orderEntryReducer.GVWRUnit);
  // const shippingWeightUnit = useSelector((state) => state.orderEntryReducer.shippingWeightUnit);
  // const driverTollsUnit = useSelector((state) => state.orderEntryReducer.driverTollsUnit);
  // const driverPermitsUnit = useSelector((state) => state.orderEntryReducer.driverPermitsUnit);
  // const driverWashUnit = useSelector((state) => state.orderEntryReducer.driverWashUnit);

  // const portEscortFeeUnit = useSelector((state) => state.orderEntryReducer.portEscortFeeUnit);
  // const invoiceMiles = useSelector((state) => state.orderEntryReducer.invoiceMiles);
  // const driverMiles = useSelector((state) => state.orderEntryReducer.driverMiles);
  // const driverMilesBalance = useSelector((state) => state.orderEntryReducer.driverMilesBalance);
  // const invoiceFlatrate = useSelector((state) => state.orderEntryReducer.invoiceFlatrate);
  // const driverFlatrate = useSelector((state) => state.orderEntryReducer.driverFlatrate);
  // const invoiceFlatrate2 = useSelector((state) => state.orderEntryReducer.invoiceFlatrate2);
  // const driverFlatrate2 = useSelector((state) => state.orderEntryReducer.driverFlatrate2);
  // const commissionUnit = useSelector((state) => state.orderEntryReducer.commissionUnit);
  // const commissionDriverFK = useSelector((state) => state.orderEntryReducer.commissionDriverFK);

  // const freezePortOFEntryUnit = useSelector((state) => state.orderEntryReducer.freezePortOFEntryUnit);
  // const requiredCDLAUnit = useSelector((state) => state.orderEntryReducer.requiredCDLAUnit);
  // const tankerUnit = useSelector((state) => state.orderEntryReducer.tankerUnit);
  // const requiredTWICUnit = useSelector((state) => state.orderEntryReducer.requiredTWICUnit);
  // const requiredIFTAUnit = useSelector((state) => state.orderEntryReducer.requiredIFTAUnit);
  // const hasDriveBy = useSelector((state) => state.orderEntryReducer.hasDriveBy);
  // const DPUUnit = useSelector((state) => state.orderEntryReducer.DPUUnit);
  // const storageUnit = useSelector((state) => state.orderEntryReducer.storageUnit);
  // const onHold = useSelector((state) => state.orderEntryReducer.onHold);
  // const doNotInvoiceUnit = useSelector((state) => state.orderEntryReducer.doNotInvoiceUnit);
  // const doNotDispatchUnit = useSelector((state) => state.orderEntryReducer.doNotDispatchUnit);
  // const activateDispatchUnit = useSelector((state) => state.orderEntryReducer.activateDispatchUnit);
  // const invoice2as3Unit = useSelector((state) => state.orderEntryReducer.invoice2as3Unit);
  // const requireFlatbedUnit = useSelector((state) => state.orderEntryReducer.requireFlatbedUnit);
  // const contactDealerDelayUnit = useSelector((state) => state.orderEntryReducer.contactDealerDelayUnit);
  // const invoiceDealerBreakdownUnit = useSelector(
  //   (state) => state.orderEntryReducer.invoiceDealerBreakdownUnit
  // );
  // const invoiceHold = useSelector((state) => state.orderEntryReducer.invoiceHold);
  // const miscellaneousBolTextUnit = useSelector((state) => state.orderEntryReducer.miscellaneousBolTextUnit);
  // const miscellaneousBolTextUnit1 = useSelector((state) => state.orderEntryReducer.miscellaneousBolTextUnit1);
  // const miscellaneousBolTextUnit2 = useSelector((state) => state.orderEntryReducer.miscellaneousBolTextUnit2);
  // const miscellaneousBolTextUnit3 = useSelector((state) => state.orderEntryReducer.miscellaneousBolTextUnit3);
  // const miscellaneousBolTextUnit4 = useSelector((state) => state.orderEntryReducer.miscellaneousBolTextUnit4);
  // const miscellaneousBolTextUnit5 = useSelector((state) => state.orderEntryReducer.miscellaneousBolTextUnit5);
  // const miscellaneousBolTextUnit6 = useSelector((state) => state.orderEntryReducer.miscellaneousBolTextUnit6);
  // const miscellaneousBolTextUnit7 = useSelector((state) => state.orderEntryReducer.miscellaneousBolTextUnit7);
  // const orderDateUnit = useSelector((state) => state.orderEntryReducer.orderDateUnit);
  // const releaseDateUnit = useSelector((state) => state.orderEntryReducer.releaseDateUnit);
  // const deliveryByDateUnit = useSelector((state) => state.orderEntryReducer.deliveryByDateUnit);
  // const earliestPickUpDateUnit = useSelector((state) => state.orderEntryReducer.earliestPickUpDateUnit);
  // const latestPickUpDateUnit = useSelector((state) => state.orderEntryReducer.latestPickUpDateUnit);
  // const earliestDeliveryDateUnit = useSelector((state) => state.orderEntryReducer.earliestDeliveryDateUnit);
  // const latestDeliveryDateUnit = useSelector((state) => state.orderEntryReducer.latestDeliveryDateUnit);
  // const dealerConnectionFlatrateFK = useSelector(
  //   (state) => state.orderEntryReducer.dealerConnectionFlatrateFK
  // );
  // const rateType = useSelector((state) => state.orderEntryReducer.rateType);
  // const multiUnilLoad = useSelector((state) => state.orderEntryReducer.multiUnilLoad);
  // const multiUnitLoadData = useSelector((state) => state.orderEntryReducer.unitMultiLoads);
  // const brokerId = useSelector((state) => state.orderEntryReducer.brokerId);
  // const portOfEntryId = useSelector((state) => state.orderEntryReducer.portOfEntryId);
  // const canadianPickup = useSelector((state) => state.orderEntryReducer.canadianPickup);
  // const canadianDelivery = useSelector((state) => state.orderEntryReducer.canadianDelivery);
  // const unitsPerDispatchUnit = useSelector((state) => state.orderEntryReducer.unitsPerDispatchUnit);

  // const invoiceSupplementalRate = useSelector((state) => state.orderEntryReducer.invoiceSupplementalRate);

  // const invoiceSupplementalFuelSurchargeRate = useSelector(
  //   (state) => state.orderEntryReducer.invoiceSupplementalFuelSurchargeRate
  // );

  // const invoiceSupplementalDescription = useSelector(
  //   (state) => state.orderEntryReducer.invoiceSupplementalDescription
  // );

  // const driverSupplementalRate = useSelector((state) => state.orderEntryReducer.driverSupplementalRate);

  // const driverSupplementalFuelSurchargeRate = useSelector(
  //   (state) => state.orderEntryReducer.driverSupplementalFuelSurchargeRate
  // );

  // const driverSupplementalDescription = useSelector(
  //   (state) => state.orderEntryReducer.driverSupplementalDescription
  // );

  // const invoiceSpecialRate = useSelector((state) => state.orderEntryReducer.invoiceSpecialRate);

  // const invoiceSpecialFuelSurchargeRate = useSelector(
  //   (state) => state.orderEntryReducer.invoiceSpecialFuelSurchargeRate
  // );

  // const invoiceSpecialDescription = useSelector((state) => state.orderEntryReducer.invoiceSpecialDescription);

  // const driverSpecialRate = useSelector((state) => state.orderEntryReducer.driverSpecialRate);

  // const driverSpecialFuelSurchargeRate = useSelector(
  //   (state) => state.orderEntryReducer.driverSpecialFuelSurchargeRate
  // );

  // const driverSpecialDescription = useSelector((state) => state.orderEntryReducer.driverSpecialDescription);

  // const invoiceAdditionalRate = useSelector((state) => state.orderEntryReducer.invoiceAdditionalRate);

  // const invoiceAdditionalFuelSurchargeRate = useSelector(
  //   (state) => state.orderEntryReducer.invoiceAdditionalFuelSurchargeRate
  // );

  // const invoiceAdditionalDescription = useSelector(
  //   (state) => state.orderEntryReducer.invoiceAdditionalDescription
  // );

  // const driverAdditionalRate = useSelector((state) => state.orderEntryReducer.driverAdditionalRate);

  // const driverAdditionalFuelSurchargeRate = useSelector(
  //   (state) => state.orderEntryReducer.driverAdditionalFuelSurchargeRate
  // );

  // const driverAdditionalDescription = useSelector(
  //   (state) => state.orderEntryReducer.driverAdditionalDescription
  // );

  // const invoiceCanadianCharge = useSelector((state) => state.orderEntryReducer.invoiceCanadianCharge);

  // const driverCanadianCharge = useSelector((state) => state.orderEntryReducer.driverCanadianCharge);

  // const invoiceUSCharge = useSelector((state) => state.orderEntryReducer.invoiceUSCharge);

  // const driverUSCharge = useSelector((state) => state.orderEntryReducer.driverUSCharge);

  // const invoiceCDLARate = useSelector((state) => state.orderEntryReducer.invoiceCDLARate);

  // const driverCDLARate = useSelector((state) => state.orderEntryReducer.driverCDLARate);

  // const invoiceCDLAReturn = useSelector((state) => state.orderEntryReducer.invoiceCDLAReturn);

  // const driverCDLAReturn = useSelector((state) => state.orderEntryReducer.driverCDLAReturn);

  // const invoiceReturnFlatRate = useSelector((state) => state.orderEntryReducer.invoiceReturnFlatRate);

  // const driverReturnFlatRate = useSelector((state) => state.orderEntryReducer.driverReturnFlatRate);

  // const invoiceRate = useSelector((state) => state.orderEntryReducer.invoiceRate);

  // const driverRate = useSelector((state) => state.orderEntryReducer.driverRate);

  // const invoiceFuelSurchargeRate = useSelector((state) => state.orderEntryReducer.invoiceFuelSurchargeRate);

  // const driverFuelSurchargeRate = useSelector((state) => state.orderEntryReducer.driverFuelSurchargeRate);

  // const invoiceReturnRate = useSelector((state) => state.orderEntryReducer.invoiceReturnRate);

  // const driverReturnRate = useSelector((state) => state.orderEntryReducer.driverReturnRate);

  // const invoiceLengthRate = useSelector((state) => state.orderEntryReducer.invoiceLengthRate);

  // const driverLengthRate = useSelector((state) => state.orderEntryReducer.driverLengthRate);

  // const ELDRequiredRedux = useSelector((state) => state.orderEntryReducer.ELDRequiredRedux);

  // const invoiceELDFeeRedux = useSelector((state) => state.orderEntryReducer.invoiceELDFeeRedux);

  // const driverELDFeeRedux = useSelector((state) => state.orderEntryReducer.driverELDFeeRedux);

  // const invoiceELDDescription = useSelector((state) => state.orderEntryReducer.invoiceELDDescription);

  // const companyName = useSelector((state) => state.orderEntryReducer.companyName);

  // const DPUPickupOwnerRedux = useSelector((state) => state.orderEntryReducer.DPUPickupOwnerRedux);

  // const plantOrderNumber = useSelector((state) => state.orderEntryReducer.plantOrderNumber);

  // const isMilesLowBoyRedux = useSelector((state) => state.orderEntryReducer.isMilesLowBoyRedux);

  // const towableRedux = useSelector((state) => state.orderEntryReducer.towableRedux);
  // const invoiceCustomerRateFK = useSelector((state) => state.orderEntryReducer.invoiceCustomerRateFK);

  // const driverCustomerRateFK = useSelector((state) => state.orderEntryReducer.driverCustomerRateFK);

  // const preInvoiced = useSelector((state) => state.orderEntryReducer.preInvoiced);

  // const isFODInvoice = useSelector((state) => state.orderEntryReducer.isFODInvoice);

  // const invoiceAmount = useSelector((state) => state.orderEntryReducer.invoiceAmount);

  // const invoiceAdditionalFlatRate = useSelector((state) => state.orderEntryReducer.invoiceAdditionalFlatRate);

  // const driverAdditionalFlatRate = useSelector((state) => state.orderEntryReducer.driverAdditionalFlatRate);

  // const additionalFlatRateDescription = useSelector(
  //   (state) => state.orderEntryReducer.additionalFlatRateDescription
  // );
  // const invoiceMinimumRate = useSelector((state) => state.orderEntryReducer.invoiceMinimumRate);
  // const driverMinimumRate = useSelector((state) => state.orderEntryReducer.driverMinimumRate);

  // const brokerType = useSelector((state) => state.orderEntryReducer.brokerType);
  // const unitOverride = useSelector((state) => state.orderEntryReducer.unitOverride);

  // //Factory Release Process
  // const plantRelease = useSelector((state) => state.orderEntryReducer.plantRelease);
  // const plantReleaseDate = useSelector((state) => state.orderEntryReducer.plantReleaseDate);

  // const printBol = useSelector((state) => state.orderEntryReducer.printBol);
  // const bolPrinterFK = useSelector((state) => state.orderEntryReducer.bolPrinterFK);

  // const emailBOLAtOrderEntry = useSelector((state) => state.orderEntryReducer.emailBOLAtOrderEntry);

  // const batchEmailBOLAtOrderEntry = useSelector((state) => state.orderEntryReducer.batchEmailBOLAtOrderEntry);

  // const batchEmailBOLDaily = useSelector((state) => state.orderEntryReducer.batchEmailBOLDaily);
  // const allowedInvoicePercentageRedux = useSelector(
  //   (state) => state.orderEntryReducer.allowedInvoicePercentageRedux
  // );
  // // For Plants
  // const emailPlantBOLAtOrderEntry = useSelector((state) => state.orderEntryReducer.emailPlantBOLAtOrderEntry);

  // const emailPlantBOLAtOrderEntryDPU = useSelector(
  //   (state) => state.orderEntryReducer.emailPlantBOLAtOrderEntryDPU
  // );

  // const batchEmailPlantBOLAtOrderEntry = useSelector(
  //   (state) => state.orderEntryReducer.batchEmailPlantBOLAtOrderEntry
  // );

  // const batchEmailPlantBOLDaily = useSelector((state) => state.orderEntryReducer.batchEmailPlantBOLDaily);

  // const isCustomerDpu = useSelector((state) => state.orderEntryReducer.isCustomerDpu);
  // const specialCodeId = useSelector((state) => state.specialCodeLookup.specialCodeId);

  // //Unit Activation
  // const oeUnitData = useSelector((state) => state.orderEntryReducer.oeUnitData);
  // const [showUnitActivateModal, setShowUnitActivateModal] = useState(false);
  // // const [unitNumberUA, setUnitNumberUA] = useState('');
  // // const [Last5UA, setLast5UA] = useState('');
  // // const [unitIdOE, setUnitIdOE] = useState(null);
  // const [unitPKs, setstateKs] = useState([]);
  // const [unitCopy, setUnitCopy] = useState(null);
  // const showSingleUnitActivation = useSelector((state) => state.orderEntryReducer.showSingleUnitActivation);

  // const [savedUnits, setSavedUnits] = useState([]);
  // const [unSavedUnits, setUnSavedUnits] = useState([]);
  // const [emailBOl, setEmailBol] = useState([]);
  // const [emailTollsPermits, setEmailTollsPermits] = useState([]);
  // const [emailCreditHold, setEmailCreditHold] = useState([]);

  // const oeppUnitData = {
  //   companyName: companyName,
  //   //over width
  //   overWidthLoad: overWidthLoadFromRedux,
  //   unitOverWidthVO: unitOverWidthPermits,

  //   //drive bys
  //   driveByVO: unitDriveByObjects,

  //   customerAddressesVO: miscCustomerData,
  //   //Misc Pickup Dealer
  //   miscPickupDealerVO: miscPickupDealerData,
  //   //Misc Delivery
  //   miscDeliveryDealerVO: miscDeliveryDealerData,
  //   //miscDeliveryDealerVO:null,
  //   //onHold
  //   unitHolds: onHoldData,

  //   selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,

  //   //from Customer Tab
  //   customerFK: selectedCustomerId,
  //   customerPlantFK: selectedCustomerBillingPlantId,
  //   miscellaneousCustomer: isCustomerMisc,
  //   deliverToPlant: deliverToPlant,
  //   deliveryCustomerPlantFK: deliveryCustomerPlantId,
  //   shuttleFromYard: shuttleFromYard,
  //   deliveryYardFK: deliveryCustomerYardId,
  //   deliveryShuttleCityFK: deliveryCustomerShuttleCityId,
  //   noDeliveryPulloutFee: noDeliveryPulloutFee,
  //   pickupAtPlant: pickupAtPlant,
  //   pickupCustomerPlantFK: pickupCustomerPlantId,
  //   shuttleToYard: shuttleToYard,
  //   pickupYardFK: pickupCustomerYardId,
  //   pickupShuttleCityFK: pickupCustomerShuttleCityId,
  //   noPickupPulloutFee: noPickupPulloutFee,
  //   reload: reload,
  //   returnRates: returnRates,
  //   plantCode: plantCode,
  //   checkPrepaid: checkPrepaid,
  //   openBalancePrepaid: useOpenBalance,
  //   creditCardPrepaid: chargeCreditCard,
  //   bulkUnit: bulkUnits,
  //   bulkInvoiceFK: bulkInvoiceFK,
  //   printBOL: printBol,
  //   bolPrinterFK: bolPrinterFK,
  //   isCustomerDpu: isCustomerDpu,
  //   //batch loads
  //   batchLoads: batchLoadCustomerTab,
  //   firstBatchSequence: firstBatchSequence,
  //   lastBatchSequence: lastBatchSequence,

  //   // Unit Tab
  //   unitNumber: unitNumber,
  //   model: model,
  //   modelCode: modelCode,
  //   vin: vin,
  //   serialNumber: serialNumber,
  //   stockNumber: stockNumber,
  //   unitTypeFK: unitTypesFK,
  //   towable: towableRedux,
  //   diesel: engineDiesel,
  //   gas: engineGas,
  //   specialCodeFK: specialCodesFK,
  //   pickupDealerFK: pickupDealersFK,
  //   miscellaneousPickup: miscellaneousPickup,
  //   deliveryDealerFK: deliveryDealersFK,
  //   miscellaneousDelivery: miscellaneousDelivery,
  //   collectForCustomer: collectForCustomer > 0 ? collectForCustomer : 0,
  //   poNumber: poNumberRedux,
  //   authorizedBy: authorizedByUnit,
  //   projectCode: projectCodeUnit,
  //   bank: bankUnit,
  //   client: clientUnit,
  //   gvwr: GVWRUnit > 0 ? GVWRUnit : 0,
  //   shippingWeight: shippingWeightUnit || 0,
  //   maximumTolls: driverTollsUnit ? driverTollsUnit : 0,
  //   maximumPermits: driverPermitsUnit ? driverPermitsUnit : 0,
  //   maximumWash: driverWashUnit ? driverWashUnit : 0,
  //   invoiceMiles: invoiceMiles,
  //   driverMiles: driverMiles,
  //   driverMilesBalance: driverMilesBalance,
  //   invoiceFlatRate: invoiceFlatrate || invoiceFlatrate2,
  //   driverFlatRate: driverFlatrate || driverFlatrate2,
  //   commission: commissionUnit,
  //   commissionDriverFK: commissionDriverFK,
  //   freezePOE: freezePortOFEntryUnit,
  //   cdlaRequired: requiredCDLAUnit,
  //   tankerRequired: tankerUnit,
  //   TWICRequired: requiredTWICUnit,
  //   ifta: requiredIFTAUnit,
  //   hasDrivebys: hasDriveBy,
  //   dealerPickup: DPUUnit,
  //   storage: storageUnit,
  //   unitOnHold: onHold,
  //   noInvoice: doNotInvoiceUnit,
  //   doNotDispatch: doNotDispatchUnit,
  //   twoAsThree: invoice2as3Unit,
  //   requireFlatbed: unitsPerDispatchUnit > 2 ? false : requireFlatbedUnit,
  //   deliveryDelayContact: contactDealerDelayUnit,
  //   invoiceFODBreakdownToDealer: invoiceDealerBreakdownUnit,
  //   unitOnInvoiceHold: invoiceHold,
  //   miscellaneousBOLText: miscellaneousBolTextUnit,
  //   miscellaneousBOLText1: miscellaneousBolTextUnit1,
  //   miscellaneousBOLText2: miscellaneousBolTextUnit2,
  //   miscellaneousBOLText3: miscellaneousBolTextUnit3,
  //   miscellaneousBOLText4: miscellaneousBolTextUnit4,
  //   miscellaneousBOLText5: miscellaneousBolTextUnit5,
  //   miscellaneousBOLText6: miscellaneousBolTextUnit6,
  //   miscellaneousBOLText7: miscellaneousBolTextUnit7,
  //   orderDate: orderDateUnit,
  //   dispatchReleaseDate: releaseDateUnit,
  //   deliverByDate: deliveryByDateUnit,
  //   minimumPickupDate: earliestPickUpDateUnit,
  //   minimumDeliveryDate: earliestDeliveryDateUnit,
  //   maximumPickupDate: latestPickUpDateUnit,
  //   maximumDeliveryDate: latestDeliveryDateUnit,
  //   dealerConnectionFlatrateFK: dealerConnectionFlatrateFK,
  //   rateType: rateType,
  //   multiUnit: multiUnilLoad,
  //   unitMultiLoadsVO: multiUnitLoadData,
  //   brokerFK: brokerId,
  //   poeFK: portOfEntryId,
  //   canadianPickup: canadianPickup,
  //   canadianDelivery: canadianDelivery,
  //   unitsPerDispatchUnit: unitsPerDispatchUnit,
  //   invoiceSupplementalRate: invoiceFlatrate > 0 ? 0 : invoiceSupplementalRate,
  //   invoiceSupplementalFuelSurchargeRate: invoiceFlatrate > 0 ? 0 : invoiceSupplementalFuelSurchargeRate,
  //   invoiceSupplementalDescription: invoiceFlatrate > 0 ? "" : invoiceSupplementalDescription,
  //   driverSupplementalRate: driverFlatrate > 0 ? 0 : driverSupplementalRate,
  //   driverSupplementalFuelSurchargeRate: driverFlatrate > 0 ? 0 : driverSupplementalFuelSurchargeRate,
  //   driverSupplementalDescription: driverFlatrate > 0 ? "" : driverSupplementalDescription,
  //   invoiceSpecialRate: invoiceFlatrate > 0 ? 0 : invoiceSpecialRate,
  //   invoiceSpecialFuelSurchargeRate: invoiceFlatrate > 0 ? 0 : invoiceSpecialFuelSurchargeRate,
  //   invoiceSpecialDescription: invoiceFlatrate > 0 ? "" : invoiceSpecialDescription,
  //   driverSpecialRate: driverFlatrate > 0 ? 0 : driverSpecialRate,
  //   driverSpecialFuelSurchargeRate: driverFlatrate > 0 ? 0 : driverSpecialFuelSurchargeRate,
  //   driverSpecialDescription: driverFlatrate > 0 ? "" : driverSpecialDescription,
  //   invoiceAdditionalRate: invoiceFlatrate > 0 ? 0 : invoiceAdditionalRate,
  //   invoiceAdditionalFuelSurchargeRate: invoiceFlatrate > 0 ? 0 : invoiceAdditionalFuelSurchargeRate,
  //   invoiceAdditionalDescription: invoiceFlatrate > 0 ? "" : invoiceAdditionalDescription,
  //   invoiceAdditionalFlatRate: invoiceFlatrate > 0 ? 0 : invoiceAdditionalFlatRate,
  //   driverAdditionalRate: driverFlatrate > 0 ? 0 : driverAdditionalRate,
  //   driverAdditionalFuelSurchargeRate: driverFlatrate > 0 ? 0 : driverAdditionalFuelSurchargeRate,
  //   driverAdditionalDescription: driverFlatrate > 0 ? "" : driverAdditionalDescription,
  //   driverAdditionalFlatRate: driverFlatrate > 0 ? 0 : driverAdditionalFlatRate,
  //   additionalFlatRateDescription: additionalFlatRateDescription,
  //   invoiceCanadianCharge: invoiceFlatrate > 0 ? 0 : invoiceCanadianCharge,
  //   driverCanadianCharge: driverFlatrate > 0 ? 0 : driverCanadianCharge,
  //   invoiceUSCharge: invoiceFlatrate > 0 ? 0 : invoiceUSCharge,
  //   driverUSCharge: driverFlatrate > 0 ? 0 : driverUSCharge,
  //   invoiceCDLARate: invoiceFlatrate > 0 ? 0 : invoiceCDLARate,
  //   driverCDLARate: driverFlatrate > 0 ? 0 : driverCDLARate,
  //   invoiceCDLAReturn: invoiceFlatrate > 0 ? 0 : invoiceCDLAReturn,
  //   driverCDLAReturn: driverFlatrate > 0 ? 0 : driverCDLAReturn,
  //   invoiceReturnFlatRate: invoiceFlatrate > 0 ? 0 : invoiceReturnFlatRate,
  //   driverReturnFlatRate: driverFlatrate > 0 ? 0 : driverReturnFlatRate,
  //   driverReturnFlatRateBalance: driverFlatrate > 0 ? 0 : driverReturnFlatRate,
  //   driverFlatRateBalance: driverFlatrate || driverFlatrate2,
  //   invoiceRate: invoiceFlatrate > 0 ? 0 : invoiceRate,
  //   driverRate: driverFlatrate > 0 ? 0 : driverRate,
  //   invoiceFuelSurchargeRate: invoiceFlatrate > 0 ? 0 : invoiceFuelSurchargeRate,
  //   driverFuelSurchargeRate: driverFlatrate > 0 ? 0 : driverFuelSurchargeRate,
  //   invoiceReturnRate: invoiceFlatrate > 0 ? 0 : invoiceReturnRate,
  //   driverReturnRate: driverFlatrate > 0 ? 0 : driverReturnRate,
  //   invoiceLengthRate: invoiceFlatrate > 0 ? 0 : invoiceLengthRate,
  //   driverLengthRate: driverFlatrate > 0 ? 0 : driverLengthRate,
  //   ELDRequired: ELDRequiredRedux,
  //   invoiceELDFee: invoiceELDFeeRedux,
  //   driverELDFee: driverELDFeeRedux,
  //   invoiceELDDescription: invoiceELDDescription,
  //   customerDPUPickupsVO: DPUPickupOwnerRedux,
  //   plantOrderNumber: plantOrderNumber,
  //   isMilesLowBoy: isMilesLowBoyRedux,
  //   invoiceCustomerRateFK: invoiceFlatrate > 0 ? null : invoiceCustomerRateFK,
  //   driverCustomerRateFK: driverFlatrate > 0 ? null : driverCustomerRateFK,
  //   fodInvoice: fodInvoice,
  //   fodInvoiceAmount: fodInvoiceAmount,
  //   preInvoiced: preInvoiced,
  //   invoiceMinimumRate: invoiceMinimumRate,
  //   driverMinimumRate: driverMinimumRate,
  //   brokerType: brokerType,
  //   unitOverride: unitOverride,
  //   saveTollsAndPermits: saveTollsAndPermits,
  //   emailBOLAtOrderEntry: emailBOLAtOrderEntry,
  //   batchEmailBOLAtOrderEntry: batchEmailBOLAtOrderEntry,
  //   batchEmailBOLDaily: batchEmailBOLDaily,
  //   // invoicePercentage:  (allowedInvoicePercentageRedux / 100),
  //   invoicePercentage:
  //     allowedInvoicePercentageRedux > 1 ? allowedInvoicePercentageRedux / 100 : allowedInvoicePercentageRedux,

  //   // For Plants
  //   emailPlantBOLAtOrderEntry: emailPlantBOLAtOrderEntry,
  //   emailPlantBOLAtOrderEntryDPU: emailPlantBOLAtOrderEntryDPU,
  //   batchEmailPlantBOLAtOrderEntry: batchEmailPlantBOLAtOrderEntry,
  //   batchEmailPlantBOLDaily: batchEmailPlantBOLDaily,

  //   //Factory Release Process
  //   plantRelease: plantRelease,
  //   plantReleaseDate: plantReleaseDate,

  //   // Open balance tab
  //   hasOpenBalance: useOpenBalance,
  //   unitOpenBalanceVO: openBalanceObjArr,
  //   invoicePortEscortFee: portEscortFeeUnit ? portEscortFeeUnit : 0,

  //   //Contacts Tab
  //   unitContactsVO: contactsAssignedContacts,

  //   //Invoice Hold
  //   invoiceHoldReason: invoiceHoldNotes,

  //   //Notes
  //   notes: unitNotes,
  //   dispatchNotes: dispatchNotes,

  //   //credit card
  //   monetraChargesVOList: creditCardData,
  //   hasSelectedCreditCard: chargeCreditCard,

  //   //UnitRoutes
  //   unitRoutesVO: unitRoutes,
  // };

  // const addString = (msg) => {
  //   let newMsg = validationTabString + `${msg}`;
  //   setValidationTabString(newMsg);
  // };

  // const handleCreditCardWarningYes = () => {
  //   //for handling credit card warning
  //   setShowCreditCardWarning(false);
  //   dispatch(setActiveKey("creditcard"));
  // };

  // const handleOpenBalancesWarningYes = () => {
  //   //for handling credit card warning
  //   setShowOpenBalancesWarning(false);
  //   dispatch(setEnableAppliedAmount(false));
  //   dispatch(setEditPartialOrInCompleteOpenBalance(true));
  //   dispatch(setActiveKey("openbalances"));
  //   dispatch(setChangeColor(false));
  // };

  // let errorString = "";
  // let errorCnt = 0;
  // const validateOrderEntry = (source) => {
  //   // reset error string and error count .This is for displaying tab validation error message
  //   errorCnt = 0;
  //   errorString = errorString + "Tab validation failed for ";

  //   dispatch(setIsSaving(true)); //for open balance tab to unselect the selected data on the list on save
  //   //save if all tabs are valid else show error message
  //   let isAllValid = true;

  //   if (!isCustomerTabValid) {
  //     isAllValid = false;
  //     errorCnt = errorCnt + 1;
  //     errorString = errorString + "Customer ";
  //   }
  //   if (isCustomerTabValid) {
  //     if (!isUnitValid) {
  //       errorCnt = errorCnt + 1;
  //       isAllValid = false;
  //       errorString = errorString + "Unit ";
  //     }
  //   }

  //   if (isCustomerMisc) {
  //     if (!isMiscCustomerValid) {
  //       isAllValid = false;
  //       errorCnt = errorCnt + 1;
  //       errorCnt > 1
  //         ? (errorString = errorString + ",Misc Customer ")
  //         : (errorString = errorString + "Misc Customer ");
  //     }
  //   }

  //   if (miscellaneousDelivery) {
  //     if (!isMiscDeliveryDealerValid) {
  //       errorCnt = errorCnt + 1;
  //       errorCnt > 1
  //         ? (errorString = errorString + ",Misc Delivery ")
  //         : (errorString = errorString + "Misc Delivery ");

  //       isAllValid = false;
  //     }
  //   }
  //   if (miscellaneousPickup) {
  //     if (!isMiscPickupDealerValid) {
  //       errorCnt = errorCnt + 1;
  //       errorCnt > 1
  //         ? (errorString = errorString + ",Misc Pickup ")
  //         : (errorString = errorString + "Misc Pickup ");

  //       isAllValid = false;
  //     }
  //   }
  //   if (overWidthLoadFromRedux) {
  //     if (!isOverWidthValid) {
  //       errorCnt = errorCnt + 1;
  //       errorCnt > 1
  //         ? (errorString = errorString + ",Over Width ")
  //         : (errorString = errorString + "Over Width ");

  //       isAllValid = false;
  //     }
  //   }

  //   if (enableDriveby) {
  //     if (!isDriveByValid) {
  //       errorCnt = errorCnt + 1;
  //       errorCnt > 1
  //         ? (errorString = errorString + ",Drive By's ")
  //         : (errorString = errorString + "Drive By's ");

  //       isAllValid = false;
  //     }
  //   }

  //   if (onHold) {
  //     if (!isOnHold) {
  //       errorCnt = errorCnt + 1;
  //       errorCnt > 1 ? (errorString = errorString + ",On Hold ") : (errorString = errorString + "On Hold ");

  //       isAllValid = false;
  //     }
  //   }
  //   if (checkPrepaid || fodDealer) {
  //     setFODInvoice(true);
  //     let invoiceAmtLocal = invoiceAmount;
  //     setFODInvoiceAmount(invoiceAmtLocal);
  //   }
  //   if (useOpenBalance) {
  //     setFODInvoice(true);
  //     let invoiceAmtLocal = invoiceAmount;
  //     setFODInvoiceAmount(invoiceAmtLocal);
  //     if (!isOpenBalanceValid) {
  //       errorCnt = errorCnt + 1;
  //       errorCnt > 1
  //         ? (errorString = errorString + ",Open Balance ")
  //         : (errorString = errorString + "Open Balance ");

  //       isAllValid = false;
  //     }
  //   }
  //   if (chargeCreditCard && isCustomerTabValid) {
  //     setFODInvoice(true);
  //     let invoiceAmtLocal = invoiceAmount;
  //     setFODInvoiceAmount(invoiceAmtLocal);
  //     if (!isMandatoryCreditCardTab) {
  //       // errorCnt = errorCnt + 1;
  //       // errorCnt > 1
  //       //   ? (errorString = errorString + ",Credit Card ")
  //       //   : (errorString = errorString + "Credit Card ");
  //       // isAllValid = false;
  //     }
  //   }

  //   if (isFODInvoice) {
  //     setFODInvoice(true);
  //     let invoiceAmtLocal = invoiceAmount;
  //     setFODInvoiceAmount(invoiceAmtLocal);
  //   }

  //   if (invoiceHold) {
  //     if (!invoiceHoldTabIsValid) {
  //       errorCnt = errorCnt + 1;
  //       errorCnt > 1
  //         ? (errorString = errorString + ",Invoice Hold ")
  //         : (errorString = errorString + "Invoice Hold ");

  //       isAllValid = false;
  //     }
  //   }
  //   if (!unitTabIsValid) {
  //     isAllValid = false;
  //   }

  //   if (isAllValid) {
  //     if (chargeCreditCard && (isCreditCardDetailsInComplete || isCreditCardDetailsPartial)) {
  //       //for checking whether credit details entered are complete or not
  //       setShowCreditCardWarning(true); //Based on that a flag is used to show a warning message
  //     } else {
  //       saveOrderEntry();
  //     }
  //   } else {
  //     if ((isOpenBalancesDetailsInComplete || isOpenBalancesDetailsPartial) && source !== "openBalances") {
  //       setShowOpenBalancesWarning(true);
  //     }

  //     if (source === "openBalances") {
  //       if (Number(errorCnt) === 1 && errorString?.includes("Open Balance")) {
  //         saveOrderEntry();
  //       }
  //     }

  //     if (
  //       (!isOpenBalancesDetailsInComplete && !isOpenBalancesDetailsPartial) || // Open Balance valid
  //       ((isOpenBalancesDetailsInComplete || isOpenBalancesDetailsPartial) && Number(errorCnt) > 1) // Open Balance + other errors
  //     ) {
  //       let cleanedErrorCount = errorString?.includes("Open Balance") ? Number(errorCnt) - 1 : errorCnt;
  //       setShowErrorMsg(true);
  //       cleanedErrorCount > 1 ? (errorString = errorString + " tabs") : (errorString = errorString + " tab");
  //       const cleanedError = errorString?.replace(",Open Balance ", "");
  //       setErrorMsg(`${cleanedError}`);
  //     }
  //   }
  // };

  // const saveOrderEntry = () => {
  //   setShowOpenBalancesWarning(false);
  //   setShowCreditCardWarning(false);
  //   // if (orderDateUnit == "") oeppUnitData.orderDate = new Date();
  //   // console.log("order date",orderDateUnit)
  //   // console.log("order date in oeppUnitData",oeppUnitData.orderDate)
  //   //  setIsLoading(true);

  //   // At this point Order is ready to be saved from Front End
  //   // Handle Order Entry Save in Order Confirmation Modal
  //   // New Modal For Order Confirmation
  //   // Order Confirmation for single load
  //   // TODO: Order Confirmation for Batch Load
  //   // TODO: Order Confirmation for Duplicate load
  //   setShowOrderConfirmation(true);
  // };

  // const handleYes = () => {
  //   setShowErrorMsg(false);
  //   setShowSuccess(false);
  //   setErrorMsg("");
  // };
  // const handleSuccess = () => {
  //   setShowErrorMsg(false);
  //   setShowSuccess(false);
  //   setErrorMsg("");
  //   dispatch(setActiveKey("unit"));
  //   if (duplicateLoad) {
  //     dispatch(setUnitNumber(""));
  //     dispatch(setVin(""));
  //     dispatch(setDupLoadForOpenBal(true));
  //     dispatch(setDupLoadForCreditCard(true));
  //   } else {
  //     dispatch(setDupLoadForOpenBal(false));
  //     dispatch(setDupLoadForCreditCard(false));
  //     dispatch(setDataReset(true));
  //     //  window.location.reload(false);
  //   }
  //   // Added for unit activation
  //   if (activateDispatchUnit) {
  //     setShowUnitActivateModal(true);
  //     dispatch(setBrowseType("SingleUnits"));
  //   }
  // };

  // const handleCancel = () => {
  //   window.location.reload(false);
  //   window.scrollTo(0, 0);
  // };

  // const handleOrderConfirmationHide = () => {
  //   setShowOrderConfirmation(false);
  //   dispatch(setEnableAppliedAmount(true));
  // };
  // const handleOrderConfirmationSave = () => {
  //   // Hanlde all Save functions inside here temporarly..
  //   setIsLoading(true);
  //   setShowOrderConfirmation(false);
  //   if (orderDateUnit === "") oeppUnitData.orderDate = new Date();
  //   if (plantRelease) {
  //     oeppUnitData.plantReleaseDate = new Date();
  //     oeppUnitData.dispatchReleaseDate = releaseDateUnit ? releaseDateUnit : new Date();
  //   }
  //   //added for Factory Release Process by Preetha
  //   OrderEntryService.saveOrderEntry(oeppUnitData)
  //     .then((response) => {
  //       // Marking user action as complete
  //       handleComplete();

  //       setIsLoading(false);
  //       setFODInvoiceAmount(0);
  //       setFODInvoice(false);
  //       navigate("/order-entry");

  //       const data = response.data;
  //       setSavedUnits(data.SavedUnits);
  //       setEmailBol(data.EmailBOLTolls);
  //       setEmailTollsPermits(data.EmailTollsPermits);
  //       setEmailCreditHold(data.EmailCreditHold);
  //       setUnSavedUnits(data.UnsavedUnits);
  //       if (data?.InvoiceDetails?.[0].length) {
  //         setPreInvoiceResult(data?.InvoiceDetails[0]);
  //         setPreInvoiceModal(true);
  //       }

  //       // Added for unit activation
  //       if (activateDispatchUnit) {
  //         const unitPKs = data.UnitsForActivate;
  //         if (batchLoadCustomerTab) {
  //           const updatedObject = unitPKs.map((pk, index) => ({
  //             ...oeppUnitData,
  //             unitPK: pk,
  //             unitNumber: data.SavedUnits[index],
  //           }));
  //           dispatch(setOeUnitData(updatedObject));
  //         } else {
  //           const updatedObject = unitPKs.map((pk, index) => ({
  //             ...oeppUnitData,
  //             unitPK: pk,
  //           }));
  //           dispatch(setOeUnitData(updatedObject));
  //         }
  //       }

  //       if (!batchLoadCustomerTab) {
  //         toast.success("Order Saved");
  //       }
  //       if (batchLoadCustomerTab) {
  //         if (data.SavedUnits.length > 0 && data.UnsavedUnits.length === 0) {
  //           toast.success(`${data.SavedUnits.length} Total Orders Saved`);
  //           setSavedUnits([]);
  //           setUnSavedUnits([]);
  //         }
  //         if (data.UnsavedUnits.length > 0) {
  //           setShowOrderConfirmation(true);
  //         }
  //       }

  //       if (data.EmailBOLTolls && data.EmailBOLTolls.length > 0) {
  //         data.EmailBOLTolls.forEach((item) => {
  //           item.forEach((emailBolItem) => {
  //             OrderEntryService.generateEmailForUnitsBOL(
  //               emailBolItem.unitPK,
  //               emailBolItem.message,
  //               emailBolItem.email,
  //               emailBolItem.print,
  //               emailBolItem.objectkey,
  //               emailBolItem.emailObjectKey,
  //               emailBolItem.printerName,
  //               emailBolItem.pageCount,
  //               emailBolItem.duplex,
  //               emailBolItem.orientation,
  //               userPK
  //             )
  //               .then(() => console.log(`BOL Email sent for dispatchPK: ${emailBolItem.dispatchPK}`))
  //               .catch((error) =>
  //                 console.error(`Failed to send BOL email for dispatchPK: ${emailBolItem.dispatchPK}`, error)
  //               );
  //           });
  //         });
  //       }

  //       handleSuccess();
  //       window.scrollTo(0, 0);
  //     })
  //     .catch((error) => {
  //       let msg = "";
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.log(error.response.data);
  //         msg = error.response.data.errorMsg;
  //       }
  //       if (msg === null || msg === "" || msg === undefined) {
  //         // Something happened in setting up the request that triggered an Error
  //         msg = "Something went wrong !! Failed to create the order !!";
  //       }

  //       setShowErrorMsg(true);
  //       setErrorMsg(msg);
  //       setIsLoading(false);
  //     });
  //   // setShowOrderConfirmation(false)

  //   if (selectedPickupDealer && selectedDeliveryDealer) {
  //     setLocalPickupDealer(selectedPickupDealer);
  //     setLocalDeliveryDealer(selectedDeliveryDealer);
  //     setLocalStateCodeInput(specialCodeInput);
  //   }
  // };

  // // For clearing special code input on order confirmation

  // useEffect(() => {
  //   dispatch(setSpecialCodeInput(""));
  //   setLocalStateCodeInput("");
  // }, [dataResetFlag]);

  // const generateBatchUnits = (baseUnit, startSeq, endSeq) => {
  //   // if any required value is missing, bail out safely
  //   if (!baseUnit || !startSeq || !endSeq) return [];

  //   const prefixMatchStart = startSeq.match(/[A-Za-z]+/);
  //   const prefixMatchEnd = endSeq.match(/[A-Za-z]+/);
  //   const numMatchStart = startSeq.match(/\d+/);
  //   const numMatchEnd = endSeq.match(/\d+/);

  //   // bail out if regex didn’t match
  //   if (!prefixMatchStart || !numMatchStart || !numMatchEnd) return [];

  //   const prefix = prefixMatchStart[0]; // assume prefix stays same
  //   const startNum = parseInt(numMatchStart[0], 10);
  //   const endNum = parseInt(numMatchEnd[0], 10);

  //   if (isNaN(startNum) || isNaN(endNum) || endNum < startNum) return [];

  //   // Build the array
  //   return Array.from({ length: endNum - startNum + 1 }, (_, i) => {
  //     const num = startNum + i;
  //     return `${baseUnit}${prefix}${num}`;
  //   });
  // };

  // const renderOrderConfirmation = () => {
  //   const unitNumberList = generateBatchUnits(oeppUnitData.unitNumber, firstBatchSequence, lastBatchSequence);

  //   return (
  //     <>
  //       {batchLoadCustomerTab &&
  //       savedUnits?.length === 0 &&
  //       unSavedUnits?.length === 0 &&
  //       unitNumberList?.length > 0 ? (
  //         unitNumberList?.map((unitNumber, index) => (
  //           <tr key={index} onClick={() => {}}>
  //             <td>{index + 1}</td>
  //             <td>{customerIndb?.name}</td>
  //             <td>{selectedPickupDealer ? selectedPickupDealer?.name : localPickupDealer?.name || ""}</td>
  //             <td>
  //               {selectedDeliveryDealer ? selectedDeliveryDealer?.name : localDeliveryDealer?.name || ""}
  //             </td>
  //             <td>
  //               <span className={oeppUnitData.unitNumber ? "unitNumber" : ""}>{unitNumber}</span>
  //             </td>
  //             <td>
  //               <span className={specialCodeInput || localStateCodeInput ? "specialCode" : ""}>
  //                 {specialCodeInput ? specialCodeInput : localStateCodeInput || ""}
  //               </span>
  //             </td>
  //             <td>
  //               <span className={oeppUnitData.stockNumber ? "stockNumber" : ""}>
  //                 {oeppUnitData.stockNumber}
  //               </span>
  //             </td>
  //             {/* <td><span className="mileagePost"></span></td> */}
  //           </tr>
  //         ))
  //       ) : (
  //         <tr onClick={() => {}}>
  //           <td>1</td>
  //           <td>{customerIndb?.name}</td>
  //           <td>{selectedPickupDealer ? selectedPickupDealer?.name : localPickupDealer?.name || ""}</td>
  //           <td>{selectedDeliveryDealer ? selectedDeliveryDealer?.name : localDeliveryDealer?.name || ""}</td>
  //           <td>
  //             <span className={oeppUnitData.unitNumber ? "unitNumber" : ""}>{oeppUnitData.unitNumber}</span>
  //           </td>
  //           <td>
  //             <span className={specialCodeInput || localStateCodeInput ? "specialCode" : ""}>
  //               {specialCodeInput ? specialCodeInput : localStateCodeInput || ""}
  //             </span>
  //           </td>
  //           <td>
  //             <span className={oeppUnitData.stockNumber ? "stockNumber" : ""}>
  //               {oeppUnitData.stockNumber}
  //             </span>
  //           </td>
  //         </tr>
  //       )}
  //     </>
  //   );
  // };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <div className="d-flex align-items-center flex-wrap">
          {/* <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={validateOrderEntry}
            disabled={isLoading}
          >
            Save
          </button>

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            label={"Cancel"}
            onClick={handleCancel}
          />

          {isLoading ? (
            <LoadingIcon />
          ) : (
            <ModalComponent
              show={showErrorMsg}
              onHide={handleYes}
              title={"Warning !!"}
              body={errorMsg}
              handleYES={handleYes}
              handleNO={handleYes}
              showOK
              color="Red"
            />
          )}
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <Modal show={showSuccess} onHide={handleSuccess}>
              <Modal.Header closeButton>
                <Modal.Title>"Success !!"</Modal.Title>
              </Modal.Header>
              <Modal.Body className="font-14 h-100">
                {duplicateLoad && (
                  <p style={{ color: "green" }}>
                    Order has been saved successfully !!{" "}
                    <p>Duplicate load is set on customer tab . Please enter Unit Number & Vin </p>
                  </p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleSuccess}>
                  OK
                </Button>
              </Modal.Footer>
            </Modal>
          )} */}

          {/* {
            <Modal
              show={showCreditCardWarning}
              onHide={handleCreditCardWarning}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title className="font-18 h-100">Warning!!</Modal.Title>
              </Modal.Header>
              <Modal.Body className="font-14 h-100">
                {isCreditCardDetailsInComplete ? (
                  <p style={{ color: "red" }}>
                    Credit card details are not entered completely. Do you want to edit the details?{" "}
                  </p>
                ) : isCreditCardDetailsPartial ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    Credit card details are partially entered. Do you want to edit the details?{" "}
                  </p>
                ) : (
                  ""
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleCreditCardWarningYes}>
                  Yes
                </Button>

                <Button variant="secondary" onClick={saveOrderEntry}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          }

          {
            <Modal
              show={showOpenBalancesWarning}
              onHide={handleOpenBalancesWarning}
              backdrop="static"
              keyboard={false}
            >
              <div className="modal-content" style={{ width: "600px" }}>
                <Modal.Header closeButton>
                  <Modal.Title className="font-18 h-100">Warning!!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-14 h-100" style={{ width: "600px" }}>
                  {isOpenBalancesDetailsInComplete ? (
                    <p style={{ color: "red" }}>
                      Open Balances details are not entered completely. Do you want to edit the details?{" "}
                    </p>
                  ) : isOpenBalancesDetailsPartial ? (
                    <p style={{ color: "red" }}>
                      {" "}
                      Open Balances details are partially entered. Do you want to edit the details?{" "}
                    </p>
                  ) : (
                    ""
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleOpenBalancesWarningYes}>
                    Yes
                  </Button>

                  <Button
                    variant="secondary"
                    // onClick={saveOrderEntry}
                    onClick={() => {
                      handleOpenBalancesWarning();
                      // saveOrderEntry();
                      validateOrderEntry("openBalances");
                    }}
                  >
                    No
                  </Button>
                </Modal.Footer>
              </div>
            </Modal>
            // ) : null
          } */}

          {/* Order Confirmation Modal */}
          {/* <Modal
            show={showOrderConfirmation}
            onHide={handleOrderConfirmationHide}
            size="lg"
            className="order-confirmation-modal"
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {batchLoadCustomerTab ? "ORDER SUMMARY - BATCH LOAD" : "ORDER SUMMARY"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "157px",
                overflowY: "auto",
              }}
            >
              <Table bordered hover>
                // Table Header
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Billing Customer</th>
                    <th>Pickup Dealer</th>
                    <th>Delivery Dealer</th>
                    <th className="grey-text">Unit #</th>
                    <th className="grey-text">Special Code</th>
                    <th className="grey-text">Stock #</th>
                  </tr>
                </thead>
                <tbody>
                  // list single order
                  // map array for batch loads
                  {renderOrderConfirmation()}
                </tbody>
              </Table>

              {batchLoadCustomerTab && savedUnits.length > 0 && (
                <p className="alert alert-success text-center mt-3 orderSummaryInfo">
                  {savedUnits.length} Total Units in between sequence{" "}
                  {oeppUnitData.unitNumber + firstBatchSequence} to{" "}
                  {oeppUnitData.unitNumber + lastBatchSequence} are saved as part of this Order
                </p>
              )}

              {batchLoadCustomerTab && unSavedUnits.length > 0 && (
                <p className="alert alert-danger text-center mt-4 orderSummaryInfo mb-2">
                  {unSavedUnits.length} Units could not be saved due to duplicate Unit Numbers
                </p>
              )}

              {batchLoadCustomerTab && unSavedUnits.length > 0 && (
                <div className="w-50 mx-auto row mt-4">
                  <div className="col-6 text-end pe-3 mt-3 duplicateListLabel">
                    <span className="alert alert-warning mt-3">Duplicate Unit Numbers &gt;&gt;</span>
                  </div>
                  <div className="col-6">
                    <ul className="duplicateList" style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {unSavedUnits.map((unit) => (
                        <li className="duplicateListElement">{unit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button
                className={`btn-dark px-5 ${batchLoadCustomerTab && unSavedUnits.length > 0 ? "hide-elements" : ""}`}
                onClick={handleOrderConfirmationHide}
              >
                Edit
              </Button>
              <button
                type="button"
                className="btn px-5 text-light save-btn"
                onClick={handleOrderConfirmationSave}
                hidden={batchLoadCustomerTab && unSavedUnits.length > 0}
              >
                Save
              </button>
              {batchLoadCustomerTab && unSavedUnits.length > 0 && (
                <Button
                  className="btn-dark px-5"
                  onClick={() => {
                    handleOrderConfirmationHide();
                    setTimeout(() => {
                      setSavedUnits([]);
                      setUnSavedUnits([]);
                    }, 150);
                  }}
                >
                  Close
                </Button>
              )}
            </Modal.Footer>
          </Modal>
          // pre-invoice modal
          {preInvoiceModal && (
            <ModalComponent
              show={preInvoiceModal}
              onHide={() => {
                setPreInvoiceModal(false);
              }}
              title={"Pre-Invoice Generation Completed"}
              body={
                <div>
                  {preInvoiceResult?.length > 0 && (
                    <div style={{ maxHeight: "150px", overflowY: "auto" }} className="mt-4">
                      <table className="table table-bordered rounded">
                        <thead>
                          <tr>
                            <th className="fw-bolder">Unit Number</th>
                            <th className="fw-bolder">Invoice Number</th>
                          </tr>
                        </thead>
                        <tbody className="overflow-auto">
                          {preInvoiceResult?.map((invoice, index) => (
                            <tr key={index}>
                              <td>{invoice?.unitNumber}</td>
                              <td>{invoice?.invoiceNumber}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              }
              handleOK={() => {
                setPreInvoiceModal(false);
              }}
              showOK
            />
          )}
          // Unit Activation
          <WarningModalPopUp
            show={showUnitActivateModal}
            onHide={() => {
              setShowUnitActivateModal(false);
              // navigate("/edit-yard-unit-selection");
            }}
            title={"Unit Activation"}
            body={"Do you want to activate the selected unit?"}

            showYes={true}
            handleYES={() => {
              dispatch(setShowSingleUnitActivation(true));
              setShowUnitActivateModal(false);
            }}
            showNo={true}
            handleNO={() => {
              setShowUnitActivateModal(false);
            }}
          />
          <UnitActivationSingleSelectionScreenModal
            show={showSingleUnitActivation}
            onHide={() => {
              dispatch(setShowSingleUnitActivation(false));
            }}
            orderEntry
          /> */}
        </div>
      </div>
    </div>
  );
}

export default OrderEntryFooter;
