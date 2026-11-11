import { parseLocalDate, formatForApi } from "../../../../utils/dateUtils";
import React, { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import {
  setViewDetail,
  setSelectedUnitData,
} from "../../../../redux/EditMasterExpress/EditMasterExpressUnitSelectionSlice";
import {
  setEnableSave,
  resetSelectedUnitData,
  setShowEditMasterExpressShuttle,
  setCancelledEdit,
  setContactEditMode,
  setDisableNew,
  setSelectedContact,
  setContactDescription,
  setBolContactName,
  setBolContactPhone,
  setContactEmail,
  setBolFaxNumber,
  setDescriptionSearch,
  setBolContactNameSearch,
} from "../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import EditMasterExpressService from "../../../../services/Units/EditMasterExpressService";
import CreditCard from "../../../../modules/credit-card/CreditCard";
import EditMasterExpressShuttle from "../EditMasterExpressShuttle/EditMasterExpressShuttle";
import {
  resetFields,
  updateField,
} from "../../../../redux/EditMasterExpress/EditMasterExpressDispatchDriverPayTabSlice";
import {
  setDispatchPK,
  setDriverFK,
  setUnitFK,
  setRerouteType,
  setIsPartialTrip,
  setPickupDealerFK,
  setPickupUnitAddressFK,
  setDeliveryDealerFK,
  setDeliveryUnitAddressFK,
  setMiscellaneousPickup,
  setSelectedUnitInfo,
  setFromEditMasterExpress,
  setCompanyId,
  setMiscellaneousDelivery,
  setNavigatedFromRerouteBrowse,
} from "../../../../redux/RerouteSlice";
import {
  setChangeColor,
  setClickedOpenBalancesWarningYes,
  setEnableAppliedAmount,
  setIsOpenBalancesDetailsInComplete,
  setUpdatOpenBalanceArray,
  setisOpenBalancesDetailsPartial,
} from "../../../../redux/EditMasterExpress/EditMasterExpressOpenBalancesTabSlice";
import { Button, Modal } from "react-bootstrap";
import { setPrepaidAmount } from "../../../../redux/EditMasterExpress/EditMasterExpressInvoiceTabSlice";
import CreditCardComponent from "../../../../modules/credit-card/CreditCardComponent";
import Loading from "../../../../components/common/loading";
import { buildChangedPayload, isSameValue } from "../../../../utils/payloadDiff";

// How each part of the save payload is reduced to changed data (see utils/payloadDiff).
// `keep` keys are always sent with a changed VO so the backend can identify the record.
// `required` keys are sent on every save, even when the VO is unchanged.
const SAVE_DIFF_CONFIG = {
  editMasterExpressUnitTabVO: { keep: ["unitNumber", "oldUnitNumber"], required: ["unitPK"] },
  editMasterExpressMiscCustomerTabVO: { keep: ["customerAddressPK"] },
  editMasterExpressMiscPickupTabVO: { keep: ["unitAddressPK"] },
  editMasterExpressMiscDeliveryTabVO: { keep: ["unitAddressPK"] },
  editMasterExpressReroutesTabVO: { keep: ["unitReroutePK"] },
  editMasterExpressDispatchesTabVO: { keep: ["dispatchPK"] },
  editMasterExpressUnitOverWidthTabVO: { keep: ["unitOverWidthPermitPK"] },
  editMasterExpressInfoTabVO: { keep: ["unitHoldPK", "unitShuttleDelayPK"] },
  driverPayTabData: { keep: ["dispatchPK"] },
  editMasterExpressDriveBysTabVO: { mode: "whole" },
  editMasterExpressContactsTabVO: { mode: "whole" },
  editMasterOpenBalanceVO: { mode: "whole" },
  monetraChargesVOList: { mode: "always" },
  transIds: { mode: "always" },
};

// Save payload keys owned by each tab that can be disabled; a disabled tab's data is not sent.
const TAB_PAYLOAD_KEYS = {
  miscCustomer: ["editMasterExpressMiscCustomerTabVO"],
  miscPickup: ["editMasterExpressMiscPickupTabVO"],
  miscDelivery: ["editMasterExpressMiscDeliveryTabVO"],
  overWidth: ["editMasterExpressUnitOverWidthTabVO"],
  driveBys: ["editMasterExpressDriveBysTabVO"],
  openBalance: ["editMasterOpenBalanceVO"],
  reRoutes: ["editMasterExpressReroutesTabVO"],
  dispatches: ["editMasterExpressDispatchesTabVO", "driverPayTabData"],
};

const omitDisabledTabs = (payload, disabledTabs = {}) => {
  const result = { ...payload };
  Object.keys(TAB_PAYLOAD_KEYS).forEach((tab) => {
    if (disabledTabs[tab]) TAB_PAYLOAD_KEYS[tab].forEach((key) => delete result[key]);
  });
  return result;
};

// Contacts to send on save: new contacts (no unitAlternateContactPK), saved contacts that changed,
// and saved contacts that were removed (sent with deletedContact: true). Unchanged contacts are left out.
const getChangedContacts = (current = [], original = []) => {
  const currentByPK = new Map(
    current.filter((item) => item?.unitAlternateContactPK).map((item) => [item.unitAlternateContactPK, item])
  );
  const originalByPK = new Map(
    original.filter((item) => item?.unitAlternateContactPK).map((item) => [item.unitAlternateContactPK, item])
  );

  const addedOrUpdated = current.filter((item) => {
    const originalItem = item?.unitAlternateContactPK && originalByPK.get(item.unitAlternateContactPK);
    return !originalItem || !isSameValue(item, originalItem);
  });
  const deleted = [...originalByPK.values()]
    .filter((item) => !currentByPK.has(item.unitAlternateContactPK))
    .map((item) => ({ ...item, deletedContact: true }));

  return [...addedOrUpdated, ...deleted];
};

function EditMasterExpressEditPageFooter({ invoiceTabValid }) {
  const params = useParams();
  const id = params.id;
  const pageNum = params.pageNumber;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local States
  const [cancelShow, setCancelShow] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [creditCardArrayList, setCreditCardArrayList] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [isProcessCompleted, setIsProcessCompleted] = useState(false);

  const [showOpenBalancesWarning, setShowOpenBalancesWarning] = useState(false); // for open balances warning message
  const [showCreditCardWarning, setShowCreditCardWarning] = useState(false); // for credit card warning message
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [shuttleFlag, setShuttleFlag] = useState(true);
  const [shuttleButtonFlag, setShuttleButtonFlag] = useState(true);
  const [enableRerouteButton, setEnableRerouteButton] = useState(false);
  const [checkingPreExistValid, setCheckingPreExistValid] = useState(false);
  const [transIds, setTransIds] = useState("");
  const [approvedCharges, setApprovedCharges] = useState(null);
  let errorString = "";
  let errorCnt = 0;
  //Loader
  const [loader, setLoader] = useState(false);
  // Snapshot of the save payload taken when the user clicks Edit, used to send only changed fields
  const originalPayloadRef = useRef(null);

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const enableSave = useSelector((state) => state.editMasterExpressTabsReducer.enableSave);
  const unitOverWidthLoadRequired = useSelector(
    (state) => state.editMasterExpressTabsReducer.unitOverWidthLoadRequired
  );
  const contactEditMode = useSelector((state) => state.editMasterExpressTabsReducer.contactEditMode);
  const disabledTabs = useSelector((state) => state.editMasterExpressTabsReducer.disabledTabs);
  const showEditMasterExpressShuttle = useSelector(
    (state) => state.editMasterExpressTabsReducer.showEditMasterExpressShuttle
  );

  //Redux states for setting edited fields in VO
  const editedUnitDataToSaveForUnitTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForUnitTab
  );
  const editedUnitDataToSaveForSettingsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForSettingsTab
  );
  const editedUnitDataToSaveForCustomerTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForCustomerTab
  );
  const editedUnitDataToSaveForMiscCustomerTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForMiscCustomerTab
  );
  const editedUnitDataToSaveForMiscPickupTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForMiscPickupTab
  );
  const editedUnitDataToSaveForMiscDeliveryTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForMiscDeliveryTab
  );
  const editedUnitDataToSaveForOverWidthTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForOverWidthTab
  );
  const unitRoutesListing = useSelector((state) => state.editMasterExpressTabsReducer.unitRoutesListing);
  const editedUnitDataToSaveForContactsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.assignedContacts
  );
  const editedUnitDataToSaveForInfoTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForInfoTab
  );
  const invoiceTabData = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceTabData);

  const editedUnitDataToSaveForRerouteTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForRerouteTab
  );
  const editedUnitDispatchDataToSaveForDispatchesTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDispatchDataToSaveForDispatchesTab
  );
  const isDatesTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isDatesTabValid);

  const openBalanceObjArr = useSelector((state) => state.editMasterExpressOpenBalances.openBalancesArrayList);

  //Save button validation
  const isUnitTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isUnitTabValid);
  const isSettingsTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isSettingsTabValid);
  const isCustomerTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isCustomerTabValid);
  const isMiscCustomerTabValid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isMiscCustomerTabValid
  );
  const isMiscPickupTabValid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isMiscPickupTabValid
  );
  const isMiscDeliveryTabValid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isMiscDeliveryTabValid
  );
  const isOverWidthTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isOverWidthTabValid);
  const isDriveBysTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isDriveBysTabValid);
  const isContactTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isContactTabValid);
  const isInfoTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isInfoTabValid);
  const isRerouteTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isRerouteTabValid);
  const isDispatchTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isDispatchTabValid);
  const driverTabData = useSelector((state) => state.editMasterExpressDriverTabReducer.driverTabData);
  const invoiceMiles = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceMiles);
  const driverMiles = useSelector((state) => state.editMasterExpressDriverTabReducer.driverMiles);
  const invoiceFlatrate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceFlatrate);
  const baseRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.baseRate);
  const driverFlatRate = useSelector((state) => state.editMasterExpressDriverTabReducer.driverFlatRate);
  const driverBaseRate = useSelector((state) => state.editMasterExpressDriverTabReducer.baseRate);

  // fields from invoice tab for credit card invoice difference calculation
  const fodInvoiceAmount = useSelector((state) => state.editMasterExpressInvoiceTabReducer.fodInvoiceAmount);
  const prepaidAmount = useSelector((state) => state.editMasterExpressInvoiceTabReducer.prepaidAmount);

  const { driverPayTabData, deliveryBonusDeliverByDateValid } = useSelector(
    (state) => state.editMasterExpressDispatchDriverPayTabSlice
  );

  //Open balance tab
  const isOpenBalancesDetailsInComplete = useSelector(
    (state) => state.editMasterExpressOpenBalances.isOpenBalancesDetailsInComplete
  );
  const isOpenBalancesDetailsPartial = useSelector(
    (state) => state.editMasterExpressOpenBalances.isOpenBalancesDetailsPartial
  );
  const invoiceAmountForOpenBalances = useSelector(
    (state) => state.editMasterExpressOpenBalances.invoiceAmountForOpenBalances
  );
  const remainingAmt = useSelector((state) => state.editMasterExpressOpenBalances.remainingAmt);
  const isOpenBalanceValid = useSelector((state) => state.orderEntryReducer.isOpenBalanceValid);

  const editedUnitDataToSaveForDriveBysTab = unitRoutesListing?.map((item, index) => ({
    ...item,
    unitFK: id,
    sequence: index,
  }));

  const editedUnitDataInfo = {
    editMasterExpressUnitTabVO: editedUnitDataToSaveForUnitTab,
    editMasterExpressSettingsTabVO: editedUnitDataToSaveForSettingsTab,
    editMasterExpressCustomerTabVO: editedUnitDataToSaveForCustomerTab,
    editMasterExpressMiscCustomerTabVO: editedUnitDataToSaveForMiscCustomerTab,
    editMasterExpressMiscPickupTabVO: editedUnitDataToSaveForMiscPickupTab,
    editMasterExpressMiscDeliveryTabVO: editedUnitDataToSaveForMiscDeliveryTab,
    editMasterExpressUnitOverWidthTabVO: {
      ...editedUnitDataToSaveForOverWidthTab,
      hullId: editedUnitDataToSaveForOverWidthTab?.hullId || "",
    },
    editMasterExpressDriveBysTabVO: editedUnitDataToSaveForDriveBysTab,
    editMasterExpressContactsTabVO: editedUnitDataToSaveForContactsTab,
    monetraChargesVOList: creditCardArrayList,
    editMasterExpressInfoTabVO: {
      ...editedUnitDataToSaveForInfoTab,
      delayDate: editedUnitDataToSaveForInfoTab.delayDate
        ? formatForApi(editedUnitDataToSaveForInfoTab.delayDate)
        : "",
      holdDate: editedUnitDataToSaveForInfoTab.holdDate
        ? formatForApi(editedUnitDataToSaveForInfoTab.holdDate)
        : "",
    },
    editMasterExpressInvoiceRatesVO: invoiceTabData ? invoiceTabData : "",
    editMasterExpressReroutesTabVO: editedUnitDataToSaveForRerouteTab,
    driverPayTabData: driverPayTabData,
    editMasterExpressDispatchesTabVO: {
      ...driverPayTabData,
      ...editedUnitDispatchDataToSaveForDispatchesTab,
      deliveredDate: editedUnitDispatchDataToSaveForDispatchesTab?.deliveredDate
        ? formatForApi(editedUnitDispatchDataToSaveForDispatchesTab?.deliveredDate)
        : "",
      deliveryYardEntranceDate: editedUnitDispatchDataToSaveForDispatchesTab?.deliveryYardEntranceDate
        ? formatForApi(editedUnitDispatchDataToSaveForDispatchesTab?.deliveryYardEntranceDate)
        : "",
      pickupDate: editedUnitDispatchDataToSaveForDispatchesTab?.pickupDate
        ? formatForApi(editedUnitDispatchDataToSaveForDispatchesTab?.pickupDate)
        : "",
      pickupYardExitDate: editedUnitDispatchDataToSaveForDispatchesTab?.pickupYardExitDate
        ? formatForApi(editedUnitDispatchDataToSaveForDispatchesTab?.pickupYardExitDate)
        : "",
    },
    editMasterExpressDriverTabVO: driverTabData ? driverTabData : "",
    editMasterOpenBalanceVO: { unitOpenBalancesVOList: openBalanceObjArr },
    transIds: transIds || "",
  };

  const handleOpenBalancesWarningYes = () => {
    //for handling credit card warning
    // setShowSuccess(false);
    setShowOpenBalancesWarning(false);
    dispatch(setEnableAppliedAmount(false));
    //dispatch(setActiveKey("openbalances"));
    dispatch(setChangeColor(false));
    dispatch(setClickedOpenBalancesWarningYes(true));
  };

  const handleOpenBalancesWarningNo = () => {
    setShowOpenBalancesWarning(false);
    saveEditedUnitData();
  };

  const updateContactTabData = (data) => {
    return data.map((item) => ({
      ...item,
      contact: item.contact?.trim() || item.description || "",
    }));
  };

  const saveEditedUnitData = () => {
    let editedUnitDataInfoLocal = editedUnitDataInfo;
    var openBalnceDuplicate = [...openBalanceObjArr];
    var i = 0;
    if (selectedUnitData?.editMasterExpressCustomerTabDTO?.openBalancePayment === true) {
      openBalanceObjArr.forEach(function (obj, index) {
        let currentObj = {
          ...obj,
          prepaidAmount: Number(invoiceAmountForOpenBalances) - Number(remainingAmt),
          fodInvoiceAmount: invoiceAmountForOpenBalances,
        };
        openBalnceDuplicate[i] = currentObj;
        i = i + 1;
      });
      dispatch(setUpdatOpenBalanceArray(openBalnceDuplicate));
      const updatedUnitInfo = {
        ...editedUnitDataInfo,
        editMasterOpenBalanceVO: {
          ...editedUnitDataInfo.editMasterOpenBalanceVO,
          unitOpenBalancesVOList: openBalnceDuplicate,
        },
      };

      editedUnitDataInfoLocal = updatedUnitInfo;
    }

    editedUnitDataInfoLocal = {
      ...editedUnitDataInfoLocal,
      editMasterExpressContactsTabVO: updateContactTabData(
        editedUnitDataInfoLocal.editMasterExpressContactsTabVO
      ),
    };

    let cardEdited = creditCardArrayList?.some((card) => card?.edited);

    if (!cardEdited) {
      editedUnitDataInfoLocal.monetraChargesVOList = creditCardArrayList?.filter(
        (card) => !card?.preExisting
      );
    }

    if (approvedCharges) {
      editedUnitDataInfoLocal.approvedCharges = approvedCharges;
    }

    const changedPayload = omitDisabledTabs(
      buildChangedPayload(editedUnitDataInfoLocal, originalPayloadRef.current, SAVE_DIFF_CONFIG),
      disabledTabs
    );
    if (originalPayloadRef.current) {
      const changedContacts = getChangedContacts(
        editedUnitDataInfoLocal.editMasterExpressContactsTabVO,
        originalPayloadRef.current.editMasterExpressContactsTabVO
      );
      if (changedContacts?.length > 0) changedPayload.editMasterExpressContactsTabVO = changedContacts;
      else delete changedPayload.editMasterExpressContactsTabVO;
    }

    // Show the loader
    setLoader(true);
    EditMasterExpressService.saveEditedUnitData(changedPayload)
      .then(({ data }) => {
        setLoader(false);
        if (String(data?.errorCode) === "1") {
          toast.error("Failed to update edited unit data.");
          setTransIds(data?.refTranID);
          if (data?.approvedCharges?.length > 0) {
            setApprovedCharges(data?.approvedCharges);
          }
          setCreditCardArrayList((prevList) =>
            prevList.map((card) =>
              data?.completedCards?.includes(card?.unmaskedCardNumber) ? { ...card, processed: 1 } : card
            )
          );
        } else {
          originalPayloadRef.current = null;
          toast.success("Edited unit data updated.");
          // Leave the edit page first, then clear its state (same as Dealer). Clearing first made the
          // still-visible page re-validate against empty data, so tabs/fields turned red while saving.
          // flushSync makes the route change commit before the resets below. Bug 4328.
          flushSync(() => navigate("/edit-master-express-unit-selection"));
          dispatch(resetFields());
          dispatch(setPrepaidAmount(Number(invoiceAmountForOpenBalances) - Number(remainingAmt)));
          dispatch(resetSelectedUnitData());
          dispatch(setClickedOpenBalancesWarningYes(false));
          //used clear  Customer Contact
          dispatch(setContactEditMode(false));
          dispatch(setDisableNew(false));
          dispatch(setSelectedContact(null));
          dispatch(setContactDescription(""));
          dispatch(setBolContactName(""));
          dispatch(setBolContactPhone(""));
          dispatch(setContactEmail(""));
          dispatch(setBolFaxNumber(""));
          dispatch(setDescriptionSearch(""));
          dispatch(setBolContactNameSearch(""));
        }
      })
      .catch((error) => {
        // Hide the loader
        setLoader(false);
        console.log(error);
        toast.error("Failed to update edited unit data.");
      })
      .finally(() => {
        dispatch(setSelectedUnitData(""));
        dispatch(setIsOpenBalancesDetailsInComplete(false));
        dispatch(setisOpenBalancesDetailsPartial(false));
        dispatch(updateField("driverPayTabData", {}));
      });
  };

  const handleOpenBalancesWarning = () => setShowOpenBalancesWarning(false);
  const handleSave = () => {
    errorCnt = 0;
    errorString = errorString + "Tab validation failed for ";

    if (
      !disabledTabs?.openBalance &&
      (isOpenBalancesDetailsInComplete || isOpenBalancesDetailsPartial) &&
      selectedUnitData?.editMasterExpressCustomerTabDTO?.openBalancePayment
    ) {
      setShowOpenBalancesWarning(true);
      return;
    }
    const totalCardAmount = creditCardArrayList?.reduce((acc, card) => (acc += Number(card?.amount) || 0), 0);
    let balanceAmount = fodInvoiceAmount - prepaidAmount;
    if (
      (selectedUnitData?.editMasterExpressUnitTabDTO?.creditCardPrepaid &&
        ((balanceAmount && !creditCardArrayList.length) ||
          (balanceAmount && totalCardAmount !== balanceAmount))) ||
      checkingPreExistValid
    ) {
      if (remainingAmount === 0) {
        setShowCreditCardWarning(false);
      } else {
        setShowCreditCardWarning(true);
        return;
      }
    }

    saveEditedUnitData();
  };

  //Handle Cancel Button - Start
  const handleCancelShow = () => {
    originalPayloadRef.current = null;
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCreditCardArrayList([]);
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(resetFields());
      dispatch(setClickedOpenBalancesWarningYes(false));
      dispatch(setIsOpenBalancesDetailsInComplete(false));
      dispatch(setisOpenBalancesDetailsPartial(false));
      navigate("/edit-master-express-unit-selection");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
    dispatch(setViewDetail(false));
  };

  const handleCancelYes = () => {
    if (id) {
      setCreditCardArrayList([]);
      setCancelShow(false);
      dispatch(setCancelledEdit(true));
      dispatch(resetSelectedUnitData());
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      setCreditCardArrayList([]);
      dispatch(setViewDetail(false));
      dispatch(setSelectedUnitData(""));
      dispatch(resetFields());
      toast.success("Changes Cancelled");
    }
    dispatch(setClickedOpenBalancesWarningYes(false));
    dispatch(setIsOpenBalancesDetailsInComplete(false));
    dispatch(setisOpenBalancesDetailsPartial(false));
    navigate("/edit-master-express-unit-selection");
  };

  const onHandleChangeView = () => {
    // Capture the unedited payload (same shaping as at save) as the baseline for the changed-fields diff
    originalPayloadRef.current = JSON.parse(
      JSON.stringify({
        ...editedUnitDataInfo,
        editMasterExpressContactsTabVO: updateContactTabData(
          editedUnitDataInfo.editMasterExpressContactsTabVO || []
        ),
      })
    );
    dispatch(setViewDetail(false));
  };

  //Handle Cancel Button - Ends

  // Save Button Validation

  const driverpk = selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.driverPK;
  useEffect(() => {
    const openBalanceValidation = selectedUnitData?.editMasterExpressUnitTabDTO?.openBalancePrepaid
      ? !driverpk || Number(remainingAmt) === 0
      : true;
    if (
      isUnitTabValid &&
      isSettingsTabValid &&
      isCustomerTabValid &&
      (!selectedUnitData?.editMasterExpressCustomerTabDTO?.miscellaneousCustomer ||
        (selectedUnitData?.editMasterExpressCustomerTabDTO?.miscellaneousCustomer &&
          isMiscCustomerTabValid)) &&
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousPickup ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousPickup && isMiscPickupTabValid)) &&
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDelivery ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDelivery && isMiscDeliveryTabValid)) &&
      (!unitOverWidthLoadRequired || (unitOverWidthLoadRequired && isOverWidthTabValid)) &&
      (!contactEditMode || (contactEditMode && isContactTabValid)) &&
      isInfoTabValid &&
      isDriveBysTabValid &&
      (selectedUnitData?.editMaserExpressReroutesTabDTO === null ||
        (selectedUnitData?.editMaserExpressReroutesTabDTO !== null && isRerouteTabValid)) &&
      (!driverpk || openBalanceValidation) &&
      (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null ||
        (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO !== null && isDispatchTabValid)) &&
      ((driverPayTabData?.deliveryBonus &&
        driverPayTabData?.deliveryBonusDescription &&
        driverPayTabData?.deliveryBonusDeliverByDate &&
        deliveryBonusDeliverByDateValid &&
        driverPayTabData?.invoiceDeliveryBonus &&
        driverPayTabData?.driverDeliveryBonus &&
        driverPayTabData?.invoiceDeliveryBonus != 0 &&
        driverPayTabData?.driverDeliveryBonus != 0) ||
        !driverPayTabData?.deliveryBonus) &&
      isDatesTabValid
    ) {
      dispatch(setEnableSave(true));
    } else {
      dispatch(setEnableSave(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    //Fields Related Tabs
    isUnitTabValid,
    isSettingsTabValid,
    isCustomerTabValid,
    isMiscCustomerTabValid,
    isMiscPickupTabValid,
    isMiscDeliveryTabValid,
    isOverWidthTabValid,
    isDriveBysTabValid,
    isContactTabValid,
    isInfoTabValid,
    isRerouteTabValid,
    isDispatchTabValid,
    //Other Fields
    unitOverWidthLoadRequired,
    contactEditMode,
    driverPayTabData,
    isDatesTabValid,
    remainingAmt,
  ]);

  // Reroute Integration In Edit Master Express, Following fields needs to be set for reroute program, reroute slice is used here
  const onHandleReroute = () => {
    dispatch(setFromEditMasterExpress(true));
    localStorage.setItem("RerouteSource", "EditMaster");
    let unitInfo = {
      unitPK: selectedUnitData?.editMasterExpressUnitTabDTO?.unitPK,
      pickupCustomerPlantFK: selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantPK,
      pickupDealerFK: selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerPK,
      pickupUnitAddressFK: selectedUnitData?.editMasterExpressUnitTabDTO?.pickupUnitAddressPK,
      usePlants: selectedUnitData?.editMasterExpressUnitTabDTO?.usePlants,
      miscellaneousCustomer: selectedUnitData?.editMasterExpressCustomerTabDTO?.miscellaneousCustomer,
      deliveryCustomerPlantFK: selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantPK,
      deliveryDealerFK: selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerPK,
      deliveryUnitAddressFK: selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryUnitAddressPK,
      billingCustomerPlantFK: selectedUnitData?.editMasterExpressCustomerTabDTO?.billingCustomerPlantPK,
      customerFK: selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPK,
      pickupAddress1:
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantAddress1 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerAddress1 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerAddress1,
      pickupAddress2:
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantAddress2 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerAddress2 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerAddress2,
      pickupCity:
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantCity ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerCity ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerCity,
      pickupStateCode:
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantStateCode ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerStateCode ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerStateCode,
      pickupPostalCode:
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantPostalCode ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerPostalCode ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerPostalCode,
      deliveryAddress1:
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantAddress1 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerAddress1 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerAddress1,
      deliveryAddress2:
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantAddress2 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerAddress2 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerAddress2,

      deliveryCity:
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantCity ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerCity ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerCity,

      deliveryStateCode:
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantStateCode ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerStateCode ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerStateCode,
      deliveryPostalCode:
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantPostalCode ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerPostalCode ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerPostalCode,
      multiUnit: selectedUnitData?.editMasterExpressSettingsTabDTO?.multiUnit,
      pickupName:
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantName ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerName ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerName,
      deliveryName:
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantName ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerName ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerName,
      invoiceRate: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceRate,
      invoiceAdditionalFlatRate:
        selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceAdditionalFlatRate,
      invoiceAdditionalRate: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceAdditionalRate,
      invoiceLengthRate: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceLengthRate,
      invoiceCDLARate: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceCdlRate,
      invoiceUSCNSurcharge:
        selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceUSCharge > 0
          ? selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceUSCharge
          : selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceCanadianCharge,
      invoicePortEscortFee: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoicePortEscortFee,
      invoiceELDFee: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceELDFee,
      invoiceSpecialRate: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceSpecialRate,
      driverAdditionalFlatRate: selectedUnitData?.dispatchDriverPayTab?.additionalFlatRate,
      driverAdditionalRate: selectedUnitData?.dispatchDriverPayTab?.additionalRate,
      driverLengthRate: selectedUnitData?.dispatchDriverPayTab?.lengthRate || 0,
      driverCDLARate: selectedUnitData?.dispatchDriverPayTab?.cDLARate
        ? selectedUnitData?.dispatchDriverPayTab?.cDLARate
        : selectedUnitData?.editMasterExpressUnitTabDTO?.driverCDLARate,
      driverUSCNSurcharge:
        selectedUnitData?.dispatchDriverPayTab?.uSCharge > 0
          ? selectedUnitData?.dispatchDriverPayTab?.uSCharge
          : selectedUnitData?.dispatchDriverPayTab?.canadianCharge,
      driverELDFee: selectedUnitData?.dispatchDriverPayTab?.driverELDFee,
      driverSpecialRate: selectedUnitData?.dispatchDriverPayTab?.specialRate,
      reload: selectedUnitData?.editMasterExpressSettingsTabDTO?.reload,
      invoicePercentage: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoicePercentage,
      creditCardPrepaid: selectedUnitData?.editMasterExpressUnitTabDTO?.creditCardPrepaid,
      invoiceMiles: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceMiles,
      driverMiles: selectedUnitData?.editMasterExpressDriverTabDTO?.driverMiles,
      invoiceFlatRate: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceFlatRate,
      driverFlatRate: selectedUnitData?.editMasterExpressDriverTabDTO?.driverFlatRate,
      driverRate: selectedUnitData?.editMasterExpressDriverTabDTO?.driverRate,
      longUnitRate: selectedUnitData?.dispatchDriverPayTab?.longUnitRate || 0,
      halfTonAdjustmentRate: selectedUnitData?.dispatchDriverPayTab?.halfTonAdjustmentRate || 0,
      driverFuelSurcharge: selectedUnitData?.dispatchDriverPayTab?.driverFuelSurchargeRate || 0,
      invoiceDriverRate: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceDriverRate,
      invoiceDriverFuelSurchargeRate:
        selectedUnitData?.editMasterExpressInvoiceRatesData?.driverFuelSurchargeRate,
      pickedUp:
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickedUp === true ||
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardExit === true
          ? true
          : false,
      pickupLocationCanadian: selectedUnitData?.editMasterExpressInvoiceRatesData?.canadianPickup,
      phone: selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupLoactionPhone,
      contact: selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupLoationContact,
      pickupPostalCodePK: selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupPostalCodePK,
    };
    dispatch(setSelectedUnitInfo(unitInfo));
    dispatch(setDispatchPK(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchPK || null));
    dispatch(setUnitFK(selectedUnitData?.editMasterExpressUnitTabDTO?.unitPK));
    dispatch(setPickupDealerFK(unitInfo.pickupDealerFK));
    dispatch(setPickupUnitAddressFK(unitInfo.pickupUnitAddressFK));
    dispatch(setDeliveryDealerFK(unitInfo.deliveryDealerFK));
    dispatch(setDeliveryUnitAddressFK(unitInfo.deliveryUnitAddressFK));
    dispatch(setCompanyId(selectedUnitData?.editMasterExpressUnitTabDTO?.companyPK || null));
    if (
      selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.partialTrip ||
      (selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerPK === null &&
        selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerPK === null &&
        (selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerPK !== null ||
          selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerPK !== null))
    ) {
      dispatch(setRerouteType("Delivery"));
      dispatch(setIsPartialTrip(true));
    } else {
      if (
        (selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerPK !== null ||
          selectedUnitData?.editMasterExpressMiscPickupDTO?.miscellaneousPickupDealerPK !== null) &&
        (selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerPK !== null ||
          selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.miscellaneousDeliveryDealerPK !== null)
      ) {
        dispatch(setRerouteType("Delivery"));
      } else {
        dispatch(setRerouteType("Pickup"));
      }
    }
    if (selectedUnitData?.editMasterExpressUnitTabDTO?.pickupUnitAddressPK !== null) {
      dispatch(setMiscellaneousPickup(true));
    }
    if (selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryUnitAddressPK !== null) {
      dispatch(setMiscellaneousDelivery(true));
    }
    dispatch(setNavigatedFromRerouteBrowse(true));
    localStorage.setItem("driverId", selectedUnitData?.dispatchDriverPayTab?.driverFK?.driverPK);
    localStorage.setItem("unitfk", selectedUnitData?.editMasterExpressUnitTabDTO?.unitPK);
    navigate("/reroutes-detail-screen");
  };

  /**Used disable Shuttle button**/
  useEffect(() => {
    if (id) {
      EditMasterExpressService.getShuttleButtonStatus(id).then((response) => {
        const data = response.data;

        setShuttleFlag(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (
      selectedUnitData?.editMasterExpressUnitTabDTO?.plantRelease &&
      (selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupAtPlant ||
        selectedUnitData?.editMasterExpressCustomerTabDTO?.deliverToPlant) &&
      (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchPK ||
        (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchPK && shuttleFlag))
    ) {
      setShuttleButtonFlag(false);
    } else {
      setShuttleButtonFlag(true);
    }
  }, [selectedUnitData, shuttleFlag]);

  useEffect(() => {
    const editUnit = selectedUnitData?.editMasterExpressUnitTabDTO;
    const editDispatch = selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO;

    if (
      (editUnit?.pickupCustomerPlantPK && editUnit?.deliveryCustomerPlantPK) ||
      (editDispatch?.pickedUp && editUnit?.deliveryCustomerPlantFK)
    ) {
      setEnableRerouteButton(false); // disabled
    } else if (!editDispatch || (editDispatch && !editDispatch?.delivered)) {
      setEnableRerouteButton(true); // enabled
    } else {
      setEnableRerouteButton(false); // default to disabled
    }
  }, [selectedUnitData]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          {/* Shuttle */}
          {loader && <Loading />}
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={!id || viewDetail === false}
            onClick={() => {
              dispatch(setShowEditMasterExpressShuttle(true));
            }}
            disabled={shuttleButtonFlag}
          >
            Shuttle
          </button>

          <EditMasterExpressShuttle
            show={showEditMasterExpressShuttle}
            onHide={() => dispatch(setShowEditMasterExpressShuttle(false))}
            unitPK={selectedUnitData?.editMasterExpressUnitTabDTO?.unitPK}
          />

          {/* Reroute */}
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={!id || viewDetail === false}
            disabled={!enableRerouteButton}
            onClick={onHandleReroute}
          >
            {/* {isUnitDataLoading ? (
              <div className="loader-container">
                <div className="loader_YardCheckin"></div>
              </div>
            ) : (
              "Reroute"
            )} */}
            Reroute
          </button>

          {/* Credit Card */}
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            hidden={viewDetail}
            disabled={viewDetail || !selectedUnitData?.editMasterExpressUnitTabDTO?.creditCardPrepaid}
            onClick={() => setShowCreditCard(true)}
          >
            Credit Card
          </button>

          {/* Edit */}
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={!id || viewDetail === false}
            onClick={onHandleChangeView}
          >
            Edit
          </button>

          {/* Cancel - Save */}
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={viewDetail === false}
            onClick={handleCancelShow}
          >
            Cancel
          </button>

          {/* Save */}
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            hidden={viewDetail === true}
            disabled={
              isUnitDataLoading ||
              !enableSave ||
              loader ||
              !(Number(invoiceMiles) > 0) ||
              !(Number(driverMiles) > 0) ||
              !(Number(invoiceFlatrate) > 0 || Number(baseRate) > 0) ||
              !(Number(driverFlatRate) > 0 || Number(driverBaseRate) > 0)
            }
            onClick={handleSave}
          >
            Save
          </button>

          {/* Cancel - Edit*/}
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            hidden={viewDetail === true}
            type="button"
            onClick={handleCancelShow}
          >
            Cancel
          </button>
        </div>
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Edit Master Express Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <CreditCardComponent
          show={showCreditCard}
          onHide={() => setShowCreditCard(false)}
          amountTitle={"Invoice Difference"}
          source={"Edit Master Express"}
          programName={"EditMasterExpress"}
          checkingPreExistCredit={(check) => setCheckingPreExistValid(!!check)}
          creditCardArrayList={creditCardArrayList}
          incomingAmount={fodInvoiceAmount - prepaidAmount}
          setCreditCardArrayList={(value) => setCreditCardArrayList(value)}
          unitPK={id}
          customerId={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPK}
          dispatched={!!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchPK || false}
          remainingAmountValue={remainingAmount}
          setRemainingAmount={setRemainingAmount}
        />

        {/* Credit Card Modal */}
        <CreditCard
          viewDetail={viewDetail}
          onHide={() => setShowCreditCard(false)}
          customerId={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPK}
          incomingAmount={fodInvoiceAmount - prepaidAmount}
          unitPK={id}
          amountTitle={"Invoice Difference"}
          source={"Edit Master Express"}
          programName={"EditMasterExpress"}
          unitTypeFK={editedUnitDataToSaveForUnitTab?.unitTypeFK}
          creditCardArrayList={creditCardArrayList}
          setCreditCardArrayList={(value) => setCreditCardArrayList(value)}
          setIsProcessCompleted={(value) => setIsProcessCompleted(value)}
        />
        {/* Open Balances Partial Or Incomplete save Modal */}
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
              {isOpenBalancesDetailsInComplete ? ( // prepaidamount = 0
                <p style={{ color: "red" }}>
                  Open Balances details are not entered completely. Do you want to edit the details?{" "}
                </p>
              ) : isOpenBalancesDetailsPartial ? ( // invoiceamount != prepaidamount
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

              <Button variant="secondary" onClick={handleOpenBalancesWarningNo}>
                No
              </Button>
            </Modal.Footer>
          </div>
        </Modal>

        <Modal
          show={showCreditCardWarning}
          onHide={() => setShowCreditCardWarning(false)}
          backdrop="static"
          keyboard={false}
        >
          <div className="modal-content" style={{ width: "600px" }}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">Warning!!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100" style={{ width: "600px" }}>
              <p style={{ color: "red" }}>
                {`${
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched
                    ? "The credit card payment is incomplete. Please complete the full payment before dispatch."
                    : "The credit card payment is incomplete. Would you like to update the payment details?"
                }`}{" "}
              </p>
            </Modal.Body>
            {selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched ? (
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowCreditCardWarning(false);
                  }}
                >
                  Ok
                </Button>
              </Modal.Footer>
            ) : (
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowCreditCardWarning(false);
                  }}
                >
                  Yes
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowCreditCardWarning(false);
                    saveEditedUnitData();
                  }}
                >
                  No
                </Button>
              </Modal.Footer>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default EditMasterExpressEditPageFooter;
