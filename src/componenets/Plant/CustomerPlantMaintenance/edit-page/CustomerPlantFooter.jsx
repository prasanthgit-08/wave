import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setEditPlantData,
  setPlantFormData,
  setViewDetail,
  setSettingTowable,
  setSettingMotorized,
  resetChanges,
  toggleChangesCancelled,
  setOnCancel,
  setOutbound,
  setIsSettingQualifyingLongLoading,
} from "../../../../redux/CustomerPlantMaintenanceSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import InCompleteCustomerPlantService from "../../../../services/InCompleteCustomerPlantService";
import { Colors } from "../../../../styles/values/colors";
import {
  setIsGeneralTabValid,
  setIsSettingsTabValid,
  setIsOrderDetailTabValid,
  setIsOrderSettingTabValid,
  setIsInvoiceSettingTabValid,
  setIsDelaysDelayTabValid,
  setIsDelaysBreakdownTabValid,
  setIsDelaysDamageTabValid,
  setIsDelaysHotlineTabValid,
  setIsInvoiceFeesTabValid,
  setIsInvoiceFeesTabRequired,
  setIsOrderSettingTabRequired,
  setIsDelaysHotlineTabRequired,
  setIsPickupTabRequired,
  setIsPickupTabValid,
} from "../../../../redux/CustomerPlantMaintenanceSlice";
import { Modal, Button } from "react-bootstrap";
import { resetClose } from "../../../../redux/CustomerPlantDelaySlice";
import { resetClose as resetCloseEmail } from "../../../../redux/CustomerPlantEmailSlice";
import { resetClose as resetCloseContact } from "../../../../redux/CustomerPlantContactSlice";
import CommonLockServices from "../../../../service/commonLock/commonLock.service";
import { lockScreens, processConfigs } from "../../../../constants/processLockConfig";
import CommonModal from "../../../../components/common/commonModal";

const CustomerPlantFooter = () => {
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const params = useParams();
  const id = params.id;
  const pageNum = params.pageNumber;
  const navigate = useNavigate();
  const incompletePlantPK = params.incompleteplantPK;
  const [disableSave, setdisableSave] = useState(true);
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const handleActiveShow = () => setActiveShow(true);
  const handleActiveClose = () => setActiveShow(false);
  const [deleteCustomerPopUp, setDeleteCustomerPlant] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setsaveLoading] = useState(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);
  const [activateLoading, setActivateLoading] = useState(false);
  const [lockError, setLockError] = useState("");

  const selectedCustomerPlantStatus = useSelector(
    (state) => state.customerPlantSearchFilterReducer.selectedCustomerPlantStatus
  );
  const DealerZipPostLenght = useSelector((state) => state.customerPlantmaintanceReducer.DealerZipPostLenght);
  const postalCodeOnChange = useSelector((state) => state.customerPlantmaintanceReducer.postalCodeOnChange);
  const status = selectedCustomerPlantStatus;
  const customerId = params.customerId;
  const pageNumber = useSelector((state) => state.customerPlantSearchFilterReducer.pageNumber);

  let plantFormData = useSelector((state) => state.customerPlantmaintanceReducer.plantFormData);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  const [name, setName] = useState("");
  //General Tab
  const plantCheckName = useSelector((state) => state.customerPlantmaintanceReducer.plantCheckName);
  let plantName = useSelector((state) => state.customerPlantmaintanceReducer.plantName);
  let plantAddress = useSelector((state) => state.customerPlantmaintanceReducer.plantAddress);
  let plantCity = useSelector((state) => state.customerPlantmaintanceReducer.plantCity);

  let plantStateCode = useSelector((state) => state.customerPlantmaintanceReducer.plantStateCode);

  let plantEstimatedUnit = useSelector((state) => state.customerPlantmaintanceReducer.plantEstimatedUnit);

  let plantytdunit = useSelector((state) => state.customerPlantmaintanceReducer.plantytdunit);

  let plantPhone = useSelector((state) => state.customerPlantmaintanceReducer.plantPhone);

  let plantFax = useSelector((state) => state.customerPlantmaintanceReducer.plantFax);
  let plantCanadian = useSelector((state) => state.customerPlantmaintanceReducer.plantCanadian);
  let plantPostCode = useSelector((state) => state.customerPlantmaintanceReducer.plantPostCode);
  let postalPK = useSelector((state) => state.customerPlantmaintanceReducer.postalPK);

  //Settings Tab
  let settingReloadDays = useSelector((state) => state.customerPlantmaintanceReducer.settingReloadDays);
  let settingInvoiceDpuPickupFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.settingInvoiceDpuPickupFee
  );
  let settingTowable = useSelector((state) => state.customerPlantmaintanceReducer.settingTowable);
  let settingMotorized = useSelector((state) => state.customerPlantmaintanceReducer.settingMotorized);
  let settingLongUnitRestriction = useSelector(
    (state) => state.customerPlantmaintanceReducer.settingLongUnitRestriction
  );
  let settingLongUnitRestrictionUnits = useSelector(
    (state) => state.customerPlantmaintanceReducer.settingLongUnitRestrictionUnits
  );

  let settingLongUnitRateUnits = useSelector(
    (state) => state.customerPlantmaintanceReducer.settingLongUnitRateUnits
  );
  let settingLongUnitRate = useSelector((state) => state.customerPlantmaintanceReducer.settingLongUnitRate);
  let settingLongUnitRateDescription = useSelector(
    (state) => state.customerPlantmaintanceReducer.settingLongUnitRateDescription
  );
  let unitTypeGroupInput = useSelector((state) => state.customerPlantmaintanceReducer.unitTypeGroupInput);
  let unitTypeGroupFK = useSelector((state) => state.customerPlantmaintanceReducer.unitTypeGroupFK);
  const plantGroupFK = useSelector((state) => state.customerPlantmaintanceReducer.plantGroupFK);
  const plantGroupInput = useSelector((state) => state.customerPlantmaintanceReducer.plantGroupInput);
  const plantLogin = useSelector((state) => state.customerPlantmaintanceReducer.plantLogin);
  const plantPassword = useSelector((state) => state.customerPlantmaintanceReducer.plantPassword);
  const settingInvoiceDpuPickup = useSelector(
    (state) => state.customerPlantmaintanceReducer.settingInvoiceDpuPickup
  );
  const qualifyingUnitTypeGroupInput = useSelector(
    (state) => state.customerPlantmaintanceReducer.qualifyingUnitTypeGroupInput
  );
  const qualifyingUnitTypeGroupId = useSelector(
    (state) => state.customerPlantmaintanceReducer.qualifyingUnitTypeGroupId
  );
  const checkPlantCode = useSelector((state) => state.customerPlantmaintanceReducer.checkPlantCode);
  const settingsisterPlantCode = useSelector(
    (state) => state.customerPlantmaintanceReducer.settingsisterPlantCode
  );
  //Order/Details

  let orderDetailsDispatcher = useSelector(
    (state) => state.customerPlantmaintanceReducer.orderDetailsDispatcher
  );
  let orderDetailsPhone = useSelector((state) => state.customerPlantmaintanceReducer.orderDetailsPhone);
  let orderDetailsFAX = useSelector((state) => state.customerPlantmaintanceReducer.orderDetailsFAX);
  let orderDetailsEmail = useSelector((state) => state.customerPlantmaintanceReducer.orderDetailsEmail);
  const brockerInput = useSelector((state) => state.customerPlantmaintanceReducer.brockerInput);
  const brockerFK = useSelector((state) => state.customerPlantmaintanceReducer.brockerFK);
  //Order/Settings
  const shuttleCityInput = useSelector((state) => state.customerPlantmaintanceReducer.shuttleCityInput);
  const shuttleCityFK = useSelector((state) => state.customerPlantmaintanceReducer.shuttleCityFK);
  let orderSettingsFAXBolAtOrderEntry = useSelector(
    (state) => state.customerPlantmaintanceReducer.orderSettingsFAXBolAtOrderEntry
  );
  let alternateYardInput = useSelector((state) => state.customerPlantmaintanceReducer.alternateYardInput);
  let orderSettingsFAXbolatOrderEntryDPU = useSelector(
    (state) => state.customerPlantmaintanceReducer.orderSettingsFAXbolatOrderEntryDPU
  );
  let orderSettingsFAXBOLAtDispatch = useSelector(
    (state) => state.customerPlantmaintanceReducer.orderSettingsFAXBOLAtDispatch
  );
  let orderSettingsFAXBOLAtDispatchDPU = useSelector(
    (state) => state.customerPlantmaintanceReducer.orderSettingsFAXBOLAtDispatchDPU
  );
  let orderSettingsBOLFaxNumber = useSelector(
    (state) => state.customerPlantmaintanceReducer.orderSettingsBOLFaxNumber
  );
  let orderSettingsPrintintBOLAtAlternateYard = useSelector(
    (state) => state.customerPlantmaintanceReducer.orderSettingsPrintintBOLAtAlternateYard
  );
  const yardInput = useSelector((state) => state.customerPlantmaintanceReducer.yardInput);
  const settingYardFK = useSelector((state) => state.customerPlantmaintanceReducer.settingYardFK);
  const alternateYardFK = useSelector((state) => state.customerPlantmaintanceReducer.alternateYardFK);
  const orderEmailShuttleDelays = useSelector(
    (state) => state.customerPlantmaintanceReducer.orderEmailShuttleDelays
  );

  //Invoice//settings
  let invoiceELDSettingsFeeCheckbox = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceELDSettingsFeeCheckbox
  );

  let invoiceSettingsELDFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsELDFee
  );

  let invoiceSettingsDriverELDFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsDriverELDFee
  );

  let invoiceSettingsAskFlagsAndSignsCheckbox = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsAskFlagsAndSignsCheckbox
  );

  let invoiceSettingsInvoiceFlagsAndSigns = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsInvoiceFlagsAndSigns
  );

  let invoiceSettingsDriverFlagsAndSigns = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsDriverFlagsAndSigns
  );

  let invoiceSettingsInvoiceAttemptedPickup = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsInvoiceAttemptedPickup
  );
  let invoiceSettingsDriverAttemptedPickup = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsDriverAttemptedPickup
  );
  let invoiceSettingsInvoicePercentage = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsInvoicePercentage
  );
  let invoiceSettingsPercentageTruckingCompany = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceSettingsPercentageTruckingCompany
  );
  //Invoice/Fees

  let invoiceFeesInvoice2unitUnloadFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesInvoice2unitUnloadFee
  );
  let invoiceFeesDriver2UnitUnloadFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesDriver2UnitUnloadFee
  );
  let invoiceFeesUnit2UnloadFeeDescription = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesUnit2UnloadFeeDescription
  );
  let invoiceFeesInvoice3PlusUnitUnloadFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesInvoice3PlusUnitUnloadFee
  );
  let invoiceFeesDriver3PlusUnitUnloadFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesDriver3PlusUnitUnloadFee
  );
  let invoiceFeesPlus3UnitUnloadFeeDescription = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesPlus3UnitUnloadFeeDescription
  );
  let invoiceFeesInvoicePopupUnloadFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesInvoicePopupUnloadFee
  );
  let invoiceFeesDriverPopupUnloadFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesDriverPopupUnloadFee
  );
  let invoiceFeesPopupUnloadFeeDescription = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesPopupUnloadFeeDescription
  );
  let invoiceFeesInvoiceUSSurcharge = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesInvoiceUSSurcharge
  );
  let invoiceFeesDriverUSSurcharge = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesDriverUSSurcharge
  );
  let invoiceFeesUsSurchargeDescription = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesUsSurchargeDescription
  );
  let invoiceFeesInvoiceSplitDropUnloadFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesInvoiceSplitDropUnloadFee
  );
  let invoiceFeesDriverSplitDropUnloadFee = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesDriverSplitDropUnloadFee
  );
  let invoiceFeesPopupSplitDropFeeDescription = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesPopupSplitDropFeeDescription
  );

  let invoiceFeesInvoiceCanadianSurcharge = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesInvoiceCanadianSurcharge
  );
  let invoiceFeesDriverCanadianSurcharge = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesDriverCanadianSurcharge
  );
  let invoiceFeesCanadianSurchargeDescription = useSelector(
    (state) => state.customerPlantmaintanceReducer.invoiceFeesCanadianSurchargeDescription
  );
  //Delays//delay
  let delaysDelayContact = useSelector((state) => state.customerPlantmaintanceReducer.delaysDelayContact);
  let delaysDelayPhone = useSelector((state) => state.customerPlantmaintanceReducer.delaysDelayPhone);
  let delaysDelayFAXDelayUpdates = useSelector(
    (state) => state.customerPlantmaintanceReducer.delaysDelayFAXDelayUpdates
  );
  let delaysDelayFAX = useSelector((state) => state.customerPlantmaintanceReducer.delaysDelayFAX);
  let delaysDelayPhoneExtn = useSelector((state) => state.customerPlantmaintanceReducer.delaysDelayPhoneExtn);
  //Delays/Breakdown
  let delaysBreakdown = useSelector((state) => state.customerPlantmaintanceReducer.delaysBreakdown);
  let delaysBreakdownPhone = useSelector((state) => state.customerPlantmaintanceReducer.delaysBreakdownPhone);
  let delaysbreakdownPhoneExtension = useSelector(
    (state) => state.customerPlantmaintanceReducer.delaysbreakdownPhoneExtension
  );

  let delaysBreakdownFAXbreakdownUpdates = useSelector(
    (state) => state.customerPlantmaintanceReducer.delaysBreakdownFAXbreakdownUpdates
  );
  let delaysBreakdownFAX = useSelector((state) => state.customerPlantmaintanceReducer.delaysBreakdownFAX);

  //Delays/Damage
  let delaysDamageContact = useSelector((state) => state.customerPlantmaintanceReducer.delaysDamageContact);
  let delaysDamagePhone = useSelector((state) => state.customerPlantmaintanceReducer.delaysDamagePhone);
  let delaysFaxDamageUpdates = useSelector(
    (state) => state.customerPlantmaintanceReducer.delaysFaxDamageUpdates
  );
  let delaysDamageFAX = useSelector((state) => state.customerPlantmaintanceReducer.delaysDamageFAX);
  let delaysDamagePhoneExtension = useSelector(
    (state) => state.customerPlantmaintanceReducer.delaysDamagePhoneExtension
  );
  //Delays/Hotline
  let delaysHotlineDescription = useSelector(
    (state) => state.customerPlantmaintanceReducer.delaysHotlineDescription
  );
  let delayHotlinePhone = useSelector((state) => state.customerPlantmaintanceReducer.delayHotlinePhone);
  //PickupLot

  let pickupLotSupervisorPhone = useSelector(
    (state) => state.customerPlantmaintanceReducer.pickupLotSupervisorPhone
  );
  let pickupLotSupervisorEmail = useSelector(
    (state) => state.customerPlantmaintanceReducer.pickupLotSupervisorEmail
  );
  let pickupLotPointContactEmail = useSelector(
    (state) => state.customerPlantmaintanceReducer.pickupLotPointContactEmail
  );
  let pickupLotPointContactPhone = useSelector(
    (state) => state.customerPlantmaintanceReducer.pickupLotPointContactPhone
  );
  let pickupLotPointContactPhoneExtn = useSelector(
    (state) => state.customerPlantmaintanceReducer.pickupLotPointContactPhoneExtn
  );
  let pickupLotSupervisorPhoneExtn = useSelector(
    (state) => state.customerPlantmaintanceReducer.pickupLotSupervisorPhoneExtn
  );
  //Tabs Validation
  const IsGeneralTabValid = useSelector((state) => state.customerPlantmaintanceReducer.IsGeneralTabValid);
  const IsSettingsTabValid = useSelector((state) => state.customerPlantmaintanceReducer.IsSettingsTabValid);
  const IsOrderDetailTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsOrderDetailTabValid
  );
  const IsOrderSettingTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsOrderSettingTabValid
  );
  const IsOrderSettingTabRequired = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsOrderSettingTabRequired
  );
  const IsInvoiceSettingTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsInvoiceSettingTabValid
  );
  const IsDelaysDelayTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysDelayTabValid
  );
  const IsDelaysBreakdownTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysBreakdownTabValid
  );
  const IsDelaysDamageTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysDamageTabValid
  );
  const IsDelaysHotlineTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysHotlineTabValid
  );
  const IsInvoiceFeesTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsInvoiceFeesTabValid
  );
  const IsPickupTabValid = useSelector((state) => state.customerPlantmaintanceReducer.IsPickupTabValid);
  const IsInvoiceFeesTabRequired = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsInvoiceFeesTabRequired
  );
  const IsDelaysHotlineTabRequired = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsDelaysHotlineTabRequired
  );
  const IsPickupTabRequired = useSelector((state) => state.customerPlantmaintanceReducer.IsPickupTabRequired);
  const IsCustomerOrderTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsCustomerOrderTabValid
  );
  const lastOrderDateValid = useSelector((state) => state.customerPlantmaintanceReducer.lastOrderDateValid);
  const customerPlantSpecialCondition = useSelector(
    (state) => state.customerPlantmaintanceReducer.customerPlantSpecialCondition
  );
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  const FeeValidation = /^(?:\d{1,5}(\.\d{1,2})?|\.\d{1,2})$/;

  // const unitValidation = /^\d{1,4}(\.\d{1,2})?$/;
  const unitValidation = /^(\d{1,4}(\.\d{1,2})?|\.\d{1,2})$/;
  const MAX_INT_32 = 2147483647;

  const cancellEditLock = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const recordKey = localStorage.getItem("recordKey");
      const payload = processConfigs[lockScreens.CUSTOMER_PLANTS];
      if (!sessionId) return;
      const res = await CommonLockServices.commonLockRelease({
        ...payload,
        sessionId,
        recordKey,
        lockType: "CancelEdit",
        eventName: "Edit",
      });
    } catch (error) {}
  };

  const AddEditLock = async (lockType, eventName) => {
    try {
      setsaveLoading(true);
      const sessionId = localStorage.getItem("sessionId");
      const recordKey = localStorage.getItem("recordKey");
      const payload = processConfigs[lockScreens.CUSTOMER_PLANTS];
      if (!sessionId) return;
      const res = await CommonLockServices.addOrEditDealerMaintenanceLock({
        ...payload,
        sessionId,
        recordKey,
        lockType: lockType,
        eventName: eventName,
      });

      if (res.data?.Result?.[0].ErrorCode === 1) {
        setLockError(res.data?.Result?.[0].ErrorMsg);
        return false;
      }

      return true;
    } catch (error) {
      return false;
    } finally {
      setsaveLoading(false);
    }
  };

  //Tabs Validation-General Tab
  useEffect(() => {
    if (
      plantName !== "" &&
      !plantCheckName &&
      plantAddress !== "" &&
      postalPK &&
      plantPhone !== "" &&
      plantPhone.match(phoneRegex) &&
      (plantFax === "" || plantFax.match(phoneRegex)) &&
      plantEstimatedUnit !== "" &&
      plantEstimatedUnit <= MAX_INT_32
    ) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    postalPK,
    plantName,
    plantCheckName,
    plantAddress,
    plantCity,
    plantCanadian,
    plantPostCode,
    plantCity,
    plantStateCode,
    plantPhone,
    plantFax,
    plantytdunit,
    plantEstimatedUnit,
    postalCodeOnChange,
    lastOrderDateValid,
  ]);
  //Tabs Validation Settings Tab
  useEffect(() => {
    if (
      (!settingInvoiceDpuPickup ||
        (settingInvoiceDpuPickupFee !== "" && String(settingInvoiceDpuPickupFee).match(FeeValidation))) &&
      !checkPlantCode &&
      ((plantGroupFK === "" && plantGroupInput === "") || (plantGroupFK !== "" && plantGroupInput !== "")) &&
      ((plantLogin === "" && plantPassword === "") || (plantLogin !== "" && plantPassword != "")) &&
      (settingReloadDays === "" || (settingReloadDays >= 1 && settingReloadDays <= 32767)) &&
      (!settingLongUnitRestriction ||
        (unitTypeGroupInput !== "" &&
          unitTypeGroupFK != "" &&
          qualifyingUnitTypeGroupInput !== "" &&
          qualifyingUnitTypeGroupId != null &&
          settingLongUnitRestrictionUnits !== "" &&
          settingLongUnitRestrictionUnits <= 32767 &&
          settingLongUnitRateUnits !== "" &&
          settingLongUnitRateUnits <= 32767 &&
          (parseInt(settingLongUnitRateUnits) === 0 ||
            parseInt(settingLongUnitRateUnits) >= parseInt(settingLongUnitRestrictionUnits)) &&
          ((parseInt(settingLongUnitRateUnits) === 0 && settingLongUnitRate === "") ||
            (settingLongUnitRate !== "" &&
              unitValidation.test(settingLongUnitRate) && //  better than .match
              settingLongUnitRateDescription !== ""))))
    ) {
      dispatch(setIsSettingsTabValid(true));
    } else {
      dispatch(setIsSettingsTabValid(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settingInvoiceDpuPickupFee,
    settingMotorized,
    settingTowable,
    settingLongUnitRate,
    settingLongUnitRateUnits,
    settingLongUnitRateDescription,
    settingLongUnitRestriction,
    settingLongUnitRestrictionUnits,
    unitTypeGroupInput,
    unitTypeGroupFK,
    plantGroupFK,
    plantGroupInput,
    settingReloadDays,
    plantLogin,
    plantPassword,
    settingInvoiceDpuPickup,
    qualifyingUnitTypeGroupInput,
    qualifyingUnitTypeGroupId,
    checkPlantCode,
  ]);
  //Order-Detail Tab Valiadation
  useEffect(() => {
    if (
      ((brockerFK === "" && brockerInput === "") || (brockerFK !== "" && brockerInput !== "")) &&
      orderDetailsDispatcher !== "" &&
      orderDetailsPhone !== "" &&
      orderDetailsPhone.match(phoneRegex) &&
      (orderDetailsFAX === "" || orderDetailsFAX.match(phoneRegex)) &&
      (orderDetailsEmail === "" || orderDetailsEmail.match(emailRegex))
    ) {
      dispatch(setIsOrderDetailTabValid(true));
    } else {
      dispatch(setIsOrderDetailTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderDetailsDispatcher,
    orderDetailsEmail,
    orderDetailsPhone,
    orderDetailsFAX,
    brockerFK,
    brockerInput,
  ]);

  //Order-Settings -Optionally required field validation

  useEffect(() => {
    if (
      (!orderSettingsFAXBolAtOrderEntry ||
        (orderSettingsBOLFaxNumber !== "" && orderSettingsBOLFaxNumber.match(phoneRegex))) &&
      (!orderSettingsFAXbolatOrderEntryDPU ||
        (orderSettingsBOLFaxNumber !== "" && orderSettingsBOLFaxNumber.match(phoneRegex))) &&
      (!orderSettingsFAXBOLAtDispatch ||
        (orderSettingsBOLFaxNumber !== "" && orderSettingsBOLFaxNumber.match(phoneRegex))) &&
      (!orderSettingsFAXBOLAtDispatchDPU ||
        (orderSettingsBOLFaxNumber !== "" && orderSettingsBOLFaxNumber.match(phoneRegex))) &&
      (orderSettingsBOLFaxNumber === "" || orderSettingsBOLFaxNumber.match(phoneRegex)) &&
      (!orderSettingsPrintintBOLAtAlternateYard || alternateYardFK !== "") &&
      ((shuttleCityFK === "" && shuttleCityInput === "") ||
        (shuttleCityFK !== "" && shuttleCityInput !== "")) &&
      ((settingYardFK === "" && yardInput === "") || (settingYardFK !== "" && yardInput !== ""))
    ) {
      dispatch(setIsOrderSettingTabValid(true));
    } else {
      dispatch(setIsOrderSettingTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderSettingsBOLFaxNumber,
    orderSettingsFAXBOLAtDispatch,
    orderSettingsFAXBOLAtDispatchDPU,
    orderSettingsFAXBolAtOrderEntry,
    orderSettingsFAXbolatOrderEntryDPU,
    orderSettingsPrintintBOLAtAlternateYard,
    alternateYardInput,
    shuttleCityFK,
    shuttleCityInput,
    settingYardFK,
    alternateYardFK,
    yardInput,
  ]);

  //invoice -Settings Tab validation
  useEffect(() => {
    if (
      invoiceSettingsDriverAttemptedPickup !== "" &&
      String(invoiceSettingsDriverAttemptedPickup).match(FeeValidation) &&
      invoiceSettingsInvoiceAttemptedPickup !== "" &&
      String(invoiceSettingsInvoiceAttemptedPickup).match(FeeValidation) &&
      invoiceSettingsInvoicePercentage !== "" &&
      invoiceSettingsInvoicePercentage <= 99 &&
      invoiceSettingsPercentageTruckingCompany !== "" &&
      invoiceSettingsPercentageTruckingCompany <= 99 &&
      (!invoiceELDSettingsFeeCheckbox ||
        (invoiceSettingsELDFee !== "" && String(invoiceSettingsELDFee).match(FeeValidation)) ||
        (invoiceSettingsDriverELDFee !== "" && String(invoiceSettingsDriverELDFee).match(FeeValidation))) &&
      (!invoiceSettingsAskFlagsAndSignsCheckbox ||
        (invoiceSettingsInvoiceFlagsAndSigns !== "" &&
          String(invoiceSettingsInvoiceFlagsAndSigns).match(FeeValidation)) ||
        (invoiceSettingsDriverFlagsAndSigns !== "" &&
          String(invoiceSettingsDriverFlagsAndSigns).match(FeeValidation)))
    )
      if (
        invoiceSettingsInvoiceFlagsAndSigns == "" ||
        String(invoiceSettingsInvoiceFlagsAndSigns).match(FeeValidation)
      ) {
        dispatch(setIsInvoiceSettingTabValid(true));

        if (
          invoiceSettingsDriverFlagsAndSigns == "" ||
          String(invoiceSettingsDriverFlagsAndSigns).match(FeeValidation)
        ) {
          if (invoiceSettingsELDFee == "" || String(invoiceSettingsELDFee).match(FeeValidation)) {
            if (
              invoiceSettingsDriverELDFee == "" ||
              String(invoiceSettingsDriverELDFee).match(FeeValidation)
            ) {
              dispatch(setIsInvoiceSettingTabValid(true));
            } else {
              dispatch(setIsInvoiceSettingTabValid(false));
            }
          } else {
            dispatch(setIsInvoiceSettingTabValid(false));
          }
        } else {
          dispatch(setIsInvoiceSettingTabValid(false));
        }
      } else {
        dispatch(setIsInvoiceSettingTabValid(false));
      }
    else {
      dispatch(setIsInvoiceSettingTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    invoiceSettingsInvoiceAttemptedPickup,
    invoiceSettingsDriverAttemptedPickup,
    invoiceSettingsInvoicePercentage,
    invoiceSettingsPercentageTruckingCompany,
    invoiceELDSettingsFeeCheckbox,
    invoiceSettingsELDFee,
    invoiceSettingsDriverELDFee,
    invoiceSettingsAskFlagsAndSignsCheckbox,
    invoiceSettingsInvoiceFlagsAndSigns,
    invoiceSettingsDriverFlagsAndSigns,
  ]);
  //Invoice/Fees Tab Validation
  useEffect(() => {
    // Validate the flag for `setIsInvoiceFeesTabValid`
    if (
      //invoiceFeesUsSurchargeDescription of any of value is not null
      ((invoiceFeesUsSurchargeDescription &&
        (!invoiceFeesInvoiceUSSurcharge || invoiceFeesInvoiceUSSurcharge.match(FeeValidation)) &&
        (!invoiceFeesDriverUSSurcharge || invoiceFeesDriverUSSurcharge.match(FeeValidation))) ||
        (!invoiceFeesUsSurchargeDescription &&
          parseFloat(invoiceFeesInvoiceUSSurcharge || 0) === 0.0 &&
          parseFloat(invoiceFeesDriverUSSurcharge || 0) === 0.0)) &&
      //invoiceFeesCanadianSurchargeDescription
      ((invoiceFeesCanadianSurchargeDescription &&
        (!invoiceFeesInvoiceCanadianSurcharge || invoiceFeesInvoiceCanadianSurcharge.match(FeeValidation)) &&
        (!invoiceFeesDriverCanadianSurcharge || invoiceFeesDriverCanadianSurcharge.match(FeeValidation))) ||
        (!invoiceFeesCanadianSurchargeDescription &&
          parseFloat(invoiceFeesInvoiceCanadianSurcharge || 0) === 0.0 &&
          parseFloat(invoiceFeesDriverCanadianSurcharge || 0) === 0.0)) &&
      //invoiceFeesPopupSplitDropFeeDescription
      ((invoiceFeesPopupSplitDropFeeDescription &&
        (!invoiceFeesInvoiceSplitDropUnloadFee ||
          invoiceFeesInvoiceSplitDropUnloadFee.match(FeeValidation)) &&
        (!invoiceFeesDriverSplitDropUnloadFee || invoiceFeesDriverSplitDropUnloadFee.match(FeeValidation))) ||
        (!invoiceFeesPopupSplitDropFeeDescription &&
          parseFloat(invoiceFeesInvoiceSplitDropUnloadFee || 0) === 0.0 &&
          parseFloat(invoiceFeesDriverSplitDropUnloadFee || 0) === 0.0)) &&
      //invoiceFeesUnit2UnloadFeeDescription
      ((invoiceFeesUnit2UnloadFeeDescription &&
        // condition is valid only if both are either 0/null or pass FeeValidation
        (!invoiceFeesInvoice2unitUnloadFee || invoiceFeesInvoice2unitUnloadFee.match(FeeValidation)) &&
        (!invoiceFeesDriver2UnitUnloadFee || invoiceFeesDriver2UnitUnloadFee.match(FeeValidation))) ||
        (!invoiceFeesUnit2UnloadFeeDescription &&
          parseFloat(invoiceFeesInvoice2unitUnloadFee || 0) === 0.0 &&
          parseFloat(invoiceFeesDriver2UnitUnloadFee || 0) === 0.0)) &&
      //invoiceFeesPlus3UnitUnloadFeeDescription
      ((invoiceFeesPlus3UnitUnloadFeeDescription &&
        // condition is valid only if both are either 0/null or pass FeeValidation
        (!invoiceFeesInvoice3PlusUnitUnloadFee ||
          invoiceFeesInvoice3PlusUnitUnloadFee.match(FeeValidation)) &&
        (!invoiceFeesDriver3PlusUnitUnloadFee || invoiceFeesDriver3PlusUnitUnloadFee.match(FeeValidation))) ||
        (!invoiceFeesPlus3UnitUnloadFeeDescription &&
          parseFloat(invoiceFeesInvoice3PlusUnitUnloadFee || 0) === 0.0 &&
          parseFloat(invoiceFeesDriver3PlusUnitUnloadFee || 0) === 0.0)) &&
      //invoiceFeesPopupUnloadFeeDescription
      ((invoiceFeesPopupUnloadFeeDescription &&
        (!invoiceFeesInvoicePopupUnloadFee || invoiceFeesInvoicePopupUnloadFee.match(FeeValidation)) &&
        (!invoiceFeesDriverPopupUnloadFee || invoiceFeesDriverPopupUnloadFee.match(FeeValidation))) ||
        (!invoiceFeesPopupUnloadFeeDescription &&
          parseFloat(invoiceFeesInvoicePopupUnloadFee || 0) === 0.0 &&
          parseFloat(invoiceFeesDriverPopupUnloadFee || 0) === 0.0))
    ) {
      dispatch(setIsInvoiceFeesTabValid(true)); // Set the flag as valid

      // Check if `setIsInvoiceFeesTabRequired` should be true
      if (
        (invoiceFeesInvoiceUSSurcharge !== "" &&
          parseFloat(invoiceFeesInvoiceUSSurcharge) > 0 &&
          invoiceFeesInvoiceUSSurcharge.match(FeeValidation)) ||
        (invoiceFeesDriverUSSurcharge !== "" &&
          parseFloat(invoiceFeesDriverUSSurcharge) > 0 &&
          invoiceFeesDriverUSSurcharge.match(FeeValidation)) ||
        (invoiceFeesInvoiceCanadianSurcharge !== "" &&
          parseFloat(invoiceFeesInvoiceCanadianSurcharge) > 0 &&
          invoiceFeesInvoiceCanadianSurcharge.match(FeeValidation)) ||
        (invoiceFeesDriverCanadianSurcharge !== "" &&
          parseFloat(invoiceFeesDriverCanadianSurcharge) > 0 &&
          invoiceFeesDriverCanadianSurcharge.match(FeeValidation)) ||
        (invoiceFeesInvoiceSplitDropUnloadFee !== "" &&
          parseFloat(invoiceFeesInvoiceSplitDropUnloadFee) > 0 &&
          invoiceFeesInvoiceSplitDropUnloadFee.match(FeeValidation)) ||
        (invoiceFeesDriverSplitDropUnloadFee !== "" &&
          parseFloat(invoiceFeesDriverSplitDropUnloadFee) > 0 &&
          invoiceFeesDriverSplitDropUnloadFee.match(FeeValidation)) ||
        (invoiceFeesInvoice2unitUnloadFee !== "" &&
          parseFloat(invoiceFeesInvoice2unitUnloadFee) > 0 &&
          invoiceFeesInvoice2unitUnloadFee.match(FeeValidation)) ||
        (invoiceFeesDriver2UnitUnloadFee !== "" &&
          parseFloat(invoiceFeesDriver2UnitUnloadFee) > 0 &&
          invoiceFeesDriver2UnitUnloadFee.match(FeeValidation)) ||
        (invoiceFeesInvoice3PlusUnitUnloadFee !== "" &&
          parseFloat(invoiceFeesInvoice3PlusUnitUnloadFee) > 0 &&
          invoiceFeesInvoice3PlusUnitUnloadFee.match(FeeValidation)) ||
        (invoiceFeesDriver3PlusUnitUnloadFee !== "" &&
          parseFloat(invoiceFeesDriver3PlusUnitUnloadFee) > 0 &&
          invoiceFeesDriver3PlusUnitUnloadFee.match(FeeValidation)) ||
        (invoiceFeesInvoicePopupUnloadFee !== "" &&
          parseFloat(invoiceFeesInvoicePopupUnloadFee) > 0 &&
          invoiceFeesInvoicePopupUnloadFee.match(FeeValidation)) ||
        (invoiceFeesDriverPopupUnloadFee !== "" &&
          parseFloat(invoiceFeesDriverPopupUnloadFee) > 0 &&
          invoiceFeesDriverPopupUnloadFee.match(FeeValidation))
      ) {
        dispatch(setIsInvoiceFeesTabRequired(true));
      } else {
        dispatch(setIsInvoiceFeesTabRequired(false));
      }
    } else {
      dispatch(setIsInvoiceFeesTabValid(false)); // Set the flag as invalid
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    invoiceFeesInvoiceUSSurcharge,
    invoiceFeesDriverUSSurcharge,
    invoiceFeesUsSurchargeDescription,
    invoiceFeesInvoiceCanadianSurcharge,
    invoiceFeesDriverCanadianSurcharge,
    invoiceFeesCanadianSurchargeDescription,
    invoiceFeesInvoice2unitUnloadFee,
    invoiceFeesDriver2UnitUnloadFee,
    invoiceFeesUnit2UnloadFeeDescription,
    invoiceFeesInvoice3PlusUnitUnloadFee,
    invoiceFeesDriver3PlusUnitUnloadFee,
    invoiceFeesPlus3UnitUnloadFeeDescription,
    invoiceFeesInvoicePopupUnloadFee,
    invoiceFeesDriverPopupUnloadFee,
    invoiceFeesPopupUnloadFeeDescription,
    invoiceFeesInvoiceSplitDropUnloadFee,
    invoiceFeesDriverSplitDropUnloadFee,
    invoiceFeesPopupSplitDropFeeDescription,
  ]);
  // Delays / Delay Tab
  useEffect(() => {
    if (
      delaysDelayContact !== "" &&
      delaysDelayPhone !== "" &&
      delaysDelayPhone.match(phoneRegex) &&
      (!delaysDelayPhoneExtn || (delaysDelayPhoneExtn && delaysDelayPhoneExtn.length >= 3)) &&
      (!delaysDelayFAXDelayUpdates || (delaysDelayFAX !== "" && delaysDelayFAX.match(phoneRegex)))
    ) {
      dispatch(setIsDelaysDelayTabValid(true));
    } else {
      dispatch(setIsDelaysDelayTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    delaysDelayContact,
    delaysDelayPhone,
    delaysDelayFAXDelayUpdates,
    delaysDelayFAX,
    delaysDelayPhoneExtn,
  ]);

  //Delays/Breakdown Tab
  useEffect(() => {
    if (
      delaysBreakdown !== "" &&
      delaysBreakdownPhone !== "" &&
      delaysBreakdownPhone.match(phoneRegex) &&
      (!delaysbreakdownPhoneExtension ||
        (delaysbreakdownPhoneExtension && delaysbreakdownPhoneExtension.length >= 3)) &&
      (!delaysBreakdownFAXbreakdownUpdates ||
        (delaysBreakdownFAX !== "" && delaysBreakdownFAX.match(phoneRegex)))
    ) {
      dispatch(setIsDelaysBreakdownTabValid(true));
    } else {
      dispatch(setIsDelaysBreakdownTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    delaysBreakdownFAX,
    delaysBreakdown,
    delaysBreakdownFAXbreakdownUpdates,
    delaysBreakdownPhone,
    delaysbreakdownPhoneExtension,
  ]);

  // Delays/Damage Tab
  useEffect(() => {
    if (
      delaysDamageContact !== "" &&
      delaysDamagePhone !== "" &&
      delaysDamagePhone.match(phoneRegex) &&
      (!delaysDamagePhoneExtension ||
        (delaysDamagePhoneExtension && delaysDamagePhoneExtension.length >= 3)) &&
      (!delaysFaxDamageUpdates || (delaysDamageFAX !== "" && delaysDamageFAX.match(phoneRegex)))
    ) {
      dispatch(setIsDelaysDamageTabValid(true));
    } else {
      dispatch(setIsDelaysDamageTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    delaysDamagePhone,
    delaysDamageFAX,
    delaysFaxDamageUpdates,
    delaysDamageContact,
    delaysDamagePhoneExtension,
  ]);

  //Delays/Hotline Tab

  useEffect(() => {
    if (
      (delaysHotlineDescription === "" ||
        (delayHotlinePhone !== "" && delayHotlinePhone.match(phoneRegex))) &&
      (delayHotlinePhone === "" || delayHotlinePhone.match(phoneRegex))
    ) {
      dispatch(setIsDelaysHotlineTabValid(true));
      if (delaysHotlineDescription !== "") {
        dispatch(setIsDelaysHotlineTabRequired(true));
      } else {
        dispatch(setIsDelaysHotlineTabRequired(false));
      }
    } else {
      dispatch(setIsDelaysHotlineTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delaysHotlineDescription, delayHotlinePhone]);

  //Pickup
  useEffect(() => {
    if (
      (pickupLotPointContactPhone === "" || pickupLotPointContactPhone.match(phoneRegex)) &&
      (pickupLotPointContactPhoneExtn === "" ||
        (pickupLotPointContactPhoneExtn && pickupLotPointContactPhoneExtn.length >= 3)) &&
      (pickupLotPointContactEmail === "" || pickupLotPointContactEmail.match(emailRegex)) &&
      (pickupLotSupervisorPhone === "" || pickupLotSupervisorPhone.match(phoneRegex)) &&
      (pickupLotSupervisorPhoneExtn === "" ||
        (pickupLotSupervisorPhoneExtn && pickupLotSupervisorPhoneExtn.length >= 3)) &&
      (pickupLotSupervisorEmail === "" || pickupLotSupervisorEmail.match(emailRegex))
    ) {
      dispatch(setIsPickupTabValid(true));
      if (
        pickupLotPointContactPhone !== "" ||
        pickupLotSupervisorEmail !== "" ||
        pickupLotSupervisorPhone !== "" ||
        pickupLotPointContactEmail !== ""
      ) {
        dispatch(setIsPickupTabRequired(true));
      } else {
        dispatch(setIsPickupTabRequired(false));
      }
    } else {
      dispatch(setIsPickupTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pickupLotPointContactPhone,
    pickupLotSupervisorEmail,
    pickupLotSupervisorPhone,
    pickupLotPointContactEmail,
    pickupLotPointContactPhoneExtn,
    pickupLotSupervisorPhoneExtn,
  ]);

  //save will enable after individual tabs validation
  useEffect(() => {
    if (
      IsGeneralTabValid === true &&
      IsSettingsTabValid === true &&
      IsOrderDetailTabValid === true &&
      IsOrderSettingTabValid === true &&
      IsInvoiceSettingTabValid === true &&
      IsInvoiceFeesTabValid === true &&
      IsDelaysDelayTabValid === true &&
      IsDelaysBreakdownTabValid === true &&
      IsDelaysDamageTabValid === true &&
      IsDelaysHotlineTabValid === true &&
      IsPickupTabValid === true &&
      IsCustomerOrderTabValid === true
    ) {
      setdisableSave(false);
    } else {
      setdisableSave(true);
    }
  }, [
    IsGeneralTabValid,
    IsSettingsTabValid,
    IsOrderDetailTabValid,
    IsOrderSettingTabValid,
    IsInvoiceSettingTabValid,
    IsDelaysDelayTabValid,
    IsDelaysBreakdownTabValid,
    IsDelaysDamageTabValid,
    IsDelaysHotlineTabValid,
    IsInvoiceFeesTabValid,
    IsPickupTabValid,
    IsInvoiceFeesTabRequired,
    IsOrderSettingTabRequired,
    IsPickupTabRequired,
    IsDelaysHotlineTabRequired,
    IsCustomerOrderTabValid,
  ]);

  //Save or update completeplant
  const saveOrUpdateCompletePlant = (e) => {
    setsaveLoading(true);
    CustomerPlantMaintenanceService.createCustomer({ ...plantFormData, customerPlantSpecialCondition })
      .then((response) => {
        if (id) {
          toast.success("Customer Plant Updated");
        } else {
          toast.success("Customer Plant Created");
        }
        dispatch(setOutbound(false));
        setsaveLoading(false);
        navigate("/plant-browse-page/" + customerId + "/" + pageNumber);
      })
      .catch((error) => {
        setsaveLoading(false);
        navigate("/plant-browse-page/" + customerId + "/" + pageNumber);
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setsaveLoading(false);
      });
  };
  const onHandleChangeEditMode = async () => {
    const res = await AddEditLock("EditLock", "Edit");
    if (!res) {
      return;
    }

    if (editPlantData?.qualifyingUnitUnitTypeGroupFK) {
      dispatch(setIsSettingQualifyingLongLoading(true));
    }
    dispatch(setViewDetail(false));
    setName("");
  };

  //Save or Update incompleteCustomer

  const saveOrUpdateIncompletePlant = (e) => {
    setLoading(true);
    InCompleteCustomerPlantService.createCustomer(plantFormData)
      .then((response) => {
        if (incompletePlantPK) {
          toast.success("Incomplete Customer Plant Updated");
        } else {
          toast.success("Incomplete Customer Plant Created");
        }
        dispatch(setOutbound(false));
        setLoading(false);
        navigate("/plant-browse-page/" + customerId + "/" + pageNumber);
      })
      .catch((error) => {
        setLoading(false);
        navigate("/plant-browse-page/" + customerId + "/" + pageNumber);
        toast.error("Something Went Wrong");
        console.error("Failed to save or Update Plant");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (editPlantData != null && null != editPlantData.active) {
      setActive(editPlantData.active);
    }
  }, [
    editPlantData,
    //formIsValid
  ]);

  //Active-Deactivate
  const handleActiveSave = async (e) => {
    const res = await AddEditLock("ActiveLock", "Activate");
    if (!res) {
      return;
    }
    setActiveShow(false);
    if (active === true) {
      deActivateCustomerPlant();
    } else {
      activateCustomerPlant();
    }
  };

  const activateCustomerPlant = () => {
    setActivateLoading(true);
    let pk = editPlantData.customerPlantPK;
    CustomerPlantMaintenanceService.activateCustomerPlant(pk)
      .then(() => {
        setActiveShow(false);
        setActive(true);
        toast.success("Customer Plant Activated");
      })
      .catch((error) => {})
      .finally(() => {
        setActivateLoading(false);
      });
  };

  const deActivateCustomerPlant = () => {
    setDeactivateLoading(true);
    let pk = editPlantData.customerPlantPK;

    CustomerPlantMaintenanceService.deactivateCustomerPlant(pk)
      .then(() => {
        setActiveShow(false);
        setActive(false);
        toast.success("Customer Plant Deactivated");
      })
      .catch((error) => {})
      .finally(() => {
        setDeactivateLoading(false);
      });
  };
  //DELETE
  const handleDelete = () => setDeleteCustomerPlant(true);
  const handleDeleteNo = () => setDeleteCustomerPlant(false);
  const handleDeleteYes = () => {
    CustomerPlantMaintenanceService.deleteCustomerPlant(editPlantData.customerPlantPK)
      .then((response) => {
        navigate("/plant-browse-page/" + customerId + "/" + pageNumber);
        toast.success("Customer Plant Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteCustomerPlant(false);
  };
  //Cancel
  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      navigate("/plant-browse-page/" + customerId + "/" + pageNumber, {
        state: { item: id, navValue: true, navPage: pageNumber },
      });

      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
    dispatch(setViewDetail(false));
  };
  const handleCancelYes = () => {
    cancellEditLock();
    dispatch(setViewDetail(true));
    if (id && status === "Complete") {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      dispatch(setPlantFormData(null));
      dispatch(setOnCancel(true));
      CustomerPlantMaintenanceService.getcompleteCustomerPlantsById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setEditPlantData(data));
          dispatch(setViewDetail(true));

          dispatch(setSettingMotorized(data.motorized));
          dispatch(setSettingTowable(data.towable));
        })
        .catch((error) => {
          navigate("/plant-browse-page/" + customerId + "/" + pageNumber);
        });
      toast.success("Changes Cancelled");
    } else {
      navigate("/plant-browse-page/" + customerId + "/" + pageNumber);
      dispatch(setPlantFormData(null));
      dispatch(setOnCancel(true));
      toast.success("Changes Cancelled");
    }
  };
  // checksaveuniqness(name,code,customerId ,pk,incompletePlantPK)
  const validateAndSave = () => {
    setLoading(true);
    if (settingsisterPlantCode != "") {
      // Check uniqueness of the plant code
      CustomerPlantMaintenanceService.checksaveuniqness(
        plantName,
        settingsisterPlantCode,
        customerId,
        id,
        incompletePlantPK
      )
        .then((response) => {
          if (response.data) {
            // If uniqueness check fails, disable the save
            setdisableSave(response.data);
          } else {
            // If the check passes, proceed with save or update
            saveOrUpdateCompletePlant();
          }
        })
        .catch((err) => {
          // Handle error and disable save button
          console.error("Error during plant code check:", err);
          setdisableSave(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Check name existence if plant code isn't set
      CustomerPlantMaintenanceService.checkNameExist(plantName, customerId, id, incompletePlantPK)
        .then((response) => {
          if (response.data) {
            // If name exists, disable the save button
            setdisableSave(true);
          } else {
            // If the name doesn't exist, proceed with save or update
            saveOrUpdateCompletePlant();
          }
        })
        .catch((err) => {
          // Handle error and disable save button
          console.error("Error during name existence check:", err);
          setdisableSave(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    cancellEditLock();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(loading || saveLoading || deactivateLoading || activateLoading) && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <div className="d-flex align-items-center flex-wrap m-r-10">
        <ButtonComponent
          route={"/customer-plant-contacts/" + customerId + "/" + id + "/" + pageNum}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          hidden={!id || viewDetail === false || status === "InComplete"}
          label={"Contacts"}
          onClick={() => {
            dispatch(resetCloseContact());
          }}
        />
        <ButtonComponent
          route={"/customer-plant-emails/" + customerId + "/" + id + "/" + pageNum}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          hidden={!id || viewDetail === false || status === "InComplete"}
          label={"Email"}
          onClick={() => {
            dispatch(resetCloseEmail());
          }}
        />
        <ButtonComponent
          route={"/customer-plant-delay-resources/" + customerId + "/" + id + "/" + pageNum}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          hidden={!id || viewDetail === false || status === "InComplete"}
          label={"Resources"}
          onClick={() => {
            dispatch(resetClose());
          }}
        />
      </div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          hidden={viewDetail === true}
          disabled={plantName === "" || (id !== undefined && status === "Complete") || plantCheckName !== ""}
          onClick={() => {
            saveOrUpdateIncompletePlant();
          }}
        >
          Incomplete
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          hidden={viewDetail === true}
          disabled={disableSave}
          type="button"
          onClick={validateAndSave}
        >
          Save
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Active"}
          hidden={!id || status === "InComplete" || viewDetail === false}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          hidden={!id || viewDetail === false || status === "InComplete"}
          onClick={onHandleChangeEditMode}
          label={"Edit"}
        />
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          hidden={!id || viewDetail === false || status === "InComplete"}
          onClick={handleDelete}
          label={"Delete"}
        />
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Plant Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Customer Plant" : "Activate Customer Plant"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Customer Plant"
              : " Please confirm you want to Activate this Customer Plant"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteCustomerPopUp}
          onHide={handleDeleteNo}
          title={"Delete Customer Plant"}
          body={"Please confirm you want to Delete this Customer Plant"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        {/*Lock Modal */}
        <CommonModal
          show={lockError}
          onHide={() => {
            setLockError("");
          }}
          title={`Warning !!`}
          body={lockError}
          handleOK={() => {
            setLockError("");
          }}
          showOK
          color={lockError ? "red" : ""}
        />

        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => setErrorShow(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CustomerPlantFooter;
