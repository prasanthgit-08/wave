import React, { useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import UnitMainPage from "./Tabs/Unit/UnitMainPage.jsx";
import styles from "../../../OrderEntry/OrderEntry.module.css";
import MiscCustomer from "./Tabs/MiscCustomer/MiscCustomer.jsx";
import SettingsMainPage from "./Tabs/Settings/SettingsMainPage.jsx";
import CustomerMainPage from "./Tabs/Customer/CustomerMainPage.jsx";
import MiscPickup from "./Tabs/MiscPickup/MiscPickup.jsx";
import OverWidth from "./Tabs/OverWidth/OverWidth.jsx";
import Invoice from "./Tabs/Invoice/Invoice.jsx";
import { MiscDeliveryMainPage } from "./Tabs/MiscDelivery/MiscDeliveryMainPage.jsx";
import ContactsMainPage from "./Tabs/Contacts/ContactsMainPage.jsx";
import InfoContent from "./Tabs/Info/InfoContent.jsx";
import Driver from "./Tabs/Driver/Driver.jsx";
import Reroutes from "./Tabs/Reroutes/Reroutes.jsx";
import DispatchesContent from "./Tabs/Dispatches/DispatchesContent.jsx";
import DriveByMainpage from "./Tabs/DriveBy's/DriveByMainpage.jsx";
import OpenBalances from "./Tabs/OpenBalances/OpenBalances.jsx";
import OpenBalancesPrevious from "./Tabs/OpenBalances/OpenBalances.jsx";
import { setInvoiceAmountForOpenBalances } from "../../../../redux/EditMasterExpress/EditMasterExpressOpenBalancesTabSlice.js";
import {
  generateDriverPayload,
  generateInvoicePayload,
  generateUnitPayload,
  lastpointer,
} from "../../../../utils/utils.js";
import EditMasterExpressService from "../../../../services/Units/EditMasterExpressService.js";
import {
  setAmountCalculationData,
  setTriggeringAmountCalculation,
} from "../../../../redux/EditMasterExpress/EditMasterExpressInvoiceTabSlice.js";
import useDebouncer from "../../../../hooks/useDebouncer.jsx";
import { setDriverAmountCalculationData } from "../../../../redux/EditMasterExpress/EditMasterExpressDriverTabSlice.js";
import {
  updateMultipleFields,
  resetFields,
  updateField,
} from "../../../../redux/EditMasterExpress/EditMasterExpressDispatchDriverPayTabSlice.js";
import {
  setDisabledTabs,
  setFlagChanged,
} from "../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice.js";
import Loading from "../../../../components/common/loading/index.jsx";

function EditMasterExpressEditPageContent({ invoiceTabValid }) {
  const [activeKey, setActiveKey] = useState("unit");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const unitOverWidthLoadRequired = useSelector(
    (state) => state.editMasterExpressTabsReducer.unitOverWidthLoadRequired
  );
  const isUnitTypeOverWidth = useSelector((state) => state.editMasterExpressTabsReducer.isUnitTypeOverWidth);
  const contactEditMode = useSelector((state) => state.editMasterExpressTabsReducer.contactEditMode);

  //Tab Validation
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
  const isContactTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isContactTabValid);
  const isInfoTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isInfoTabValid);
  const isDriveBysTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isDriveBysTabValid);
  const isRerouteTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isRerouteTabValid);
  const isDispatchTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isDispatchTabValid);

  //Tab Validation - Other Fields
  const infoCancelledFlag = useSelector((state) => state.editMasterExpressTabsReducer.infoCancelledFlag);
  const infoOnInvoiceHoldFlag = useSelector(
    (state) => state.editMasterExpressTabsReducer.infoOnInvoiceHoldFlag
  );
  const infoOnUnitHold = useSelector((state) => state.editMasterExpressTabsReducer.infoOnUnitHold);
  const unitOnActivationDelay = useSelector(
    (state) => state.editMasterExpressTabsReducer.unitOnActivationDelay
  );
  const unitOnShuttleDelay = useSelector((state) => state.editMasterExpressTabsReducer.unitOnShuttleDelay);
  const unitRoutesListing = useSelector((state) => state.editMasterExpressTabsReducer.unitRoutesListing);
  const isOpenBalanceValid = useSelector((state) => state.editMasterExpressOpenBalances.isOpenBalanceValid);
  const editedUnitDataToSaveForSettingsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForSettingsTab
  );
  const [remainingAmtLocal, setRemainingAmtLocal] = useState(0);
  const invoiceAmountForOpenBalances = useSelector(
    (state) => state.editMasterExpressOpenBalances.invoiceAmountForOpenBalances
  );

  const invoiceMiles = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceMiles);
  const driverMiles = useSelector((state) => state.editMasterExpressDriverTabReducer.driverMiles);

  const specialCodeFKReduxValue = useSelector(
    (state) => state.editMasterExpressTabsReducer.specialCodeFKReduxValue
  );
  const flagChanged = useSelector((state) => state.editMasterExpressTabsReducer.flagChanged);
  const triggeringAmountCalculation = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.triggeringAmountCalculation
  );
  const invoiceTabData = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceTabData);

  const editedUnitDispatchDataToSaveForDispatchesTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDispatchDataToSaveForDispatchesTab
  );
  const editedUnitDataToSaveForUnitTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForUnitTab
  );
  const candianDelivery = useSelector((state) => state.editMasterExpressInvoiceTabReducer.candianDelivery);
  const candianPickup = useSelector((state) => state.editMasterExpressInvoiceTabReducer.candianPickup);
  const unitTypeLength = useSelector((state) => state.editMasterExpressTabsReducer.unitTypeLength);
  const driverTabData = useSelector((state) => state.editMasterExpressDriverTabReducer.driverTabData);
  const payMiles = useSelector((state) => state.editMasterExpressDispatchDriverPayTabSlice.payMiles);
  const miles = useSelector((state) => state.editMasterExpressDispatchDriverPayTabSlice.miles);
  const invoiceFlatrate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceFlatrate);
  const baseRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.baseRate);

  const driverFlatRate = useSelector((state) => state.editMasterExpressDriverTabReducer.driverFlatRate);
  const driverBaseRate = useSelector((state) => state.editMasterExpressDriverTabReducer.baseRate);

  const driverPayTabData = useSelector(
    (state) => state.editMasterExpressDispatchDriverPayTabSlice.driverPayTabData
  );

  const updateTabEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };
  const commonFields = {
    ...editedUnitDataToSaveForUnitTab,
    GVWR: Number(editedUnitDataToSaveForUnitTab?.gvwr) || 0,
    dispatchFK: editedUnitDispatchDataToSaveForDispatchesTab?.dispatchPK,
    canadianPickup: candianPickup,
    customerPlantFK: selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantPK,
    canadianDelivery: candianDelivery,
    requireCDLA: editedUnitDataToSaveForSettingsTab?.cdlaRequired,
    returnRates: editedUnitDataToSaveForSettingsTab?.returns,
    reload: editedUnitDataToSaveForSettingsTab?.reload,
    twoAsThree: editedUnitDataToSaveForSettingsTab?.twoAsThree,
    multiUnit: selectedUnitData?.editMasterExpressSettingsTabDTO?.multiUnit,
    unitsPerDispatch: selectedUnitData?.editMasterExpressSettingsTabDTO?.unitsPerDispatch,
    unitTypeLength: unitTypeLength,
    pickupDealerFK: selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerPK,
    pickUpCustomerPlantFK: selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantPK,
    deliveryState: selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerStateCode,
    deliveryCity: selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerCity,
    deliveryZIP: selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerPostalCode,
    deliveryCustomerPlantFK: selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantPK,
    deliveryUnitAddressFK: selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryUnitAddressPK,
    deliveryYardFK: selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryYardPK,
    pickUpCity: selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerCity,
    pickUpState: selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerStateCode,
    pickUpZIP: selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerPostalCode,
    pickUpUnitAddressFK: selectedUnitData?.editMasterExpressUnitTabDTO?.pickupUnitAddressPK,
    pickUpYardFK: selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardPK,
    driverAdditionalPulloutFee: driverTabData?.driverAdditionalPulloutFee,
    driverDeliveryPulloutFee: driverTabData?.driverDeliveryPulloutFee,
    driverPickupPulloutFee: driverTabData?.driverPickupPulloutFee,
    driverBonusRate: driverTabData?.driverBonusRate,
    noPickupPulloutFee: driverTabData?.noPickupPulloutFee,
    noDeliveryPulloutFee: driverTabData?.noDeliveryPulloutFee,
    dispatchMiles: miles,
    isMilesLowBoy: false,
    gvwrChanged:
      flagChanged === "gvwrChanged" || flagChanged === "reloadChanged" || flagChanged === "returnChanged",
    unitTypeChanged:
      flagChanged === "unitTypeChanged" || flagChanged === "reloadChanged" || flagChanged === "returnChanged",
    specialCodeChanged:
      flagChanged === "specialCodeChanged" ||
      flagChanged === "reloadChanged" ||
      flagChanged === "returnChanged",
    invoiceRateChanged:
      flagChanged === "invoiceRateChanged" ||
      flagChanged === "reloadChanged" ||
      flagChanged === "returnChanged",
    driverRateChanged:
      flagChanged === "driverRateChanged" ||
      flagChanged === "reloadChanged" ||
      flagChanged === "returnChanged",
    dispatchRateChanged:
      flagChanged === "dispatchRateChanged" ||
      flagChanged === "reloadChanged" ||
      flagChanged === "returnChanged",
    shippingWeightChanged:
      flagChanged === "shippingWeightChanged" ||
      flagChanged === "reloadChanged" ||
      flagChanged === "returnChanged",
  };
  const isOpenBalancesDisabled =
    Number(invoiceAmountForOpenBalances) === Number(0) ||
    selectedUnitData?.editMasterExpressCustomerTabDTO?.openBalancePayment === false ||
    Number(remainingAmtLocal) === Number(0) ||
    selectedUnitData?.editMasterExpressInvoiceRatesData?.fodinvoiceAmount ===
      selectedUnitData?.editMasterExpressInvoiceRatesData?.prepaidAmount;

  // Disabled state of each tab; shared via redux so the footer can leave these tabs out of the save payload
  const disabledTabs = {
    miscCustomer: !selectedUnitData?.editMasterExpressCustomerTabDTO?.miscellaneousCustomer,
    miscPickup: !selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousPickup,
    miscDelivery: !selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDelivery,
    overWidth: !unitOverWidthLoadRequired || !isUnitTypeOverWidth,
    driveBys: !editedUnitDataToSaveForSettingsTab?.hasDrivebys,
    openBalance: !selectedUnitData?.editMasterExpressUnitTabDTO?.openBalancePrepaid || isOpenBalancesDisabled,
    reRoutes: !selectedUnitData?.editMaserExpressReroutesTabDTO,
    dispatches: selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null,
  };
  const disabledTabsKey = JSON.stringify(disabledTabs);

  useEffect(() => {
    dispatch(setDisabledTabs(disabledTabs));
  }, [disabledTabsKey]);

  //function to calculate the applied amount sum for calculating remaining amount
  function getSum() {
    let sum = 0;
    let openBalanceObjArr = selectedUnitData?.editMasterExpressOpenBlancesTabDTO?.openBalanceDTOList;
    let existingTotalAmountFullyPaidFromOpenBalancesLocal = 0;
    if (openBalanceObjArr && openBalanceObjArr.length > 0) {
      openBalanceObjArr.forEach(function (item, index) {
        let appliedAmt = Number(item.applied);
        //If Applied Amount is empty, explicitly set amt as 0;
        if (isNaN(item.applied)) {
          appliedAmt = 0;
        }
        if (isNaN(sum)) {
          sum = 0;
        }
        sum = Number(sum) + Number(appliedAmt);
        existingTotalAmountFullyPaidFromOpenBalancesLocal = item.existingTotalAmountFullyPaidFromOpenBalances;
      });
    }
    sum = Number(sum) + Number(existingTotalAmountFullyPaidFromOpenBalancesLocal);
    return sum.toFixed(2);
  }

  const payload = {
    Unit: generateUnitPayload({ ...invoiceTabData, ...commonFields }),

    Invoice: generateInvoicePayload({ ...invoiceTabData, invoiceMiles }),

    Driver: generateDriverPayload({ ...driverTabData, driverMiles, payMiles: payMiles }),
  };

  const getRateCalculation = () => {
    if (
      !Number(invoiceMiles) ||
      !Number(driverMiles) ||
      (flagChanged === "shippingWeightChanged" && !isUnitTabValid) ||
      (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchPK &&
        (!Number(miles) ||
          (flagChanged === "dispatchRateChanged" &&
            !(
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.driverPK ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.transportCompanyFK ||
              (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.postedTo &&
                selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchCompanyFK)
            ))))
    )
      return;

    setLoading(true);
    EditMasterExpressService.rateCalculation(payload)
      .then((res) => {
        if (res?.data?.response) {
          const datas = res?.data?.response;

          dispatch(setAmountCalculationData(datas?.invoiceRates?.[0] || null));
          dispatch(setDriverAmountCalculationData(datas?.driverRates?.[0] || null));
          dispatch(resetFields());
          setTimeout(() => {
            updateTabEditData("driverPayTabData", datas?.dispatchRates?.[0]);
            dispatch(updateMultipleFields(datas?.dispatchRates?.[0]));
          }, 0);
        }
      })
      .catch((error) => {
        console.error("Error calculating amount: ", error);
      })
      .finally(() => setLoading(false));
  };

  const handleRemainingAmt = (invoiceAmount) => {
    let appliedSum = getSum();
    let remainingAmt = 0;

    if ((typeof invoiceAmount === "number" || typeof invoiceAmount === "string") && !isNaN(invoiceAmount)) {
      remainingAmt = Number(invoiceAmount).toFixed(2) - Number(appliedSum);
    } else {
      remainingAmt = 0;
    }

    if (isNaN(remainingAmt)) {
      remainingAmt = 0;
    }
    setRemainingAmtLocal(remainingAmt);
  };

  const debouncedGetRateCalculation = useDebouncer(getRateCalculation, 500);

  useEffect(() => {
    if (selectedUnitData) {
      const editMasterExpressInvoiceRatesData = selectedUnitData?.editMasterExpressInvoiceRatesData;
      let invoiceAmountLocal =
        editMasterExpressInvoiceRatesData?.fodinvoiceAmount > 0
          ? editMasterExpressInvoiceRatesData?.fodinvoiceAmount
          : editMasterExpressInvoiceRatesData?.invoiceMiles *
            (editMasterExpressInvoiceRatesData?.invoiceRate +
              editMasterExpressInvoiceRatesData?.invoiceSupplementalRate +
              (editMasterExpressInvoiceRatesData?.invoiceAdditionalFlatRate > 0
                ? editMasterExpressInvoiceRatesData?.invoiceAdditionalFlatRate
                : editMasterExpressInvoiceRatesData?.invoiceAdditionalRate) +
              editMasterExpressInvoiceRatesData?.invoiceSpecialRate +
              editMasterExpressInvoiceRatesData?.invoiceLengthRate +
              (editMasterExpressInvoiceRatesData?.invoiceUSCharge > 0
                ? editMasterExpressInvoiceRatesData?.invoiceUSCharge
                : editMasterExpressInvoiceRatesData?.invoiceCanadianCharge) +
              editMasterExpressInvoiceRatesData?.invoicePortEscortFee +
              editMasterExpressInvoiceRatesData?.invoiceELDFee +
              (editMasterExpressInvoiceRatesData?.invoiceFuelSurchargeRate +
                editMasterExpressInvoiceRatesData?.invoiceAdditionalFuelSurchargeRate +
                editMasterExpressInvoiceRatesData?.invoiceSpecialFuelSurchargeRate +
                editMasterExpressInvoiceRatesData?.invoiceSupplementalFuelSurchargeRate));

      dispatch(setInvoiceAmountForOpenBalances(invoiceAmountLocal));
      handleRemainingAmt(invoiceAmountLocal);
    }
  }, [selectedUnitData]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (!editedUnitDataToSaveForUnitTab?.unitTypeFK) return;
    debouncedGetRateCalculation();
  }, [triggeringAmountCalculation, specialCodeFKReduxValue, flagChanged]);

  useEffect(() => {
    if (!editedUnitDataToSaveForUnitTab?.unitTypeFK) return;
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (!specialCodeFKReduxValue) {
      setTimeout(() => {
        dispatch(setTriggeringAmountCalculation());

        dispatch(setFlagChanged("specialCodeChanged"));
      }, 0);
    }
  }, [specialCodeFKReduxValue]);

  return (
    <div className="p-2">
      {(loading || isUnitDataLoading) && <Loading />}
      {/* <div className={styles.orderTabs}> */}
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight" /* m-t-10 m-b-10 */>
        <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          {/* Unit Tab */}
          <Tab
            eventKey={"unit"}
            title={"Unit"}
            tabClassName={isUnitDataLoading || viewDetail ? "" : isUnitTabValid ? "color-green" : "color-red"}
          >
            <UnitMainPage styles={styles} />
          </Tab>
          {/* Settings Tab */}
          <Tab
            eventKey={"settings"}
            title={"Settings"}
            tabClassName={
              isUnitDataLoading || viewDetail ? "" : isSettingsTabValid ? "color-green" : "color-red"
            }
          >
            <SettingsMainPage styles={styles} />
          </Tab>
          {/* Customer Tab */}
          <Tab
            eventKey={"customer"}
            title={"Customer"}
            tabClassName={
              isUnitDataLoading || viewDetail ? "" : isCustomerTabValid ? "color-green" : "color-red"
            }
          >
            <CustomerMainPage styles={styles} />
          </Tab>
          {/* Misc Customer Tab */}
          <Tab
            eventKey={"miscCustomer"}
            title={"Misc Customer"}
            tabClassName={
              isUnitDataLoading ||
              viewDetail ||
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.miscellaneousCustomer
                ? ""
                : isMiscCustomerTabValid
                  ? "color-green"
                  : "color-red"
            }
            disabled={disabledTabs.miscCustomer}
          >
            <MiscCustomer styles={styles} />
          </Tab>
          {/* Misc Pickup Tab */}
          <Tab
            eventKey={"miscPickup"}
            title={"Misc Pickup"}
            tabClassName={
              isUnitDataLoading ||
              viewDetail ||
              !selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousPickup
                ? ""
                : isMiscPickupTabValid
                  ? "color-green"
                  : "color-red"
            }
            disabled={disabledTabs.miscPickup}
          >
            <MiscPickup styles={styles} />
          </Tab>
          {/* Misc Delivery Tab */}
          <Tab
            eventKey={"miscDelivery"}
            title={"Misc Delivery"}
            tabClassName={
              isUnitDataLoading ||
              viewDetail ||
              !selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDelivery
                ? ""
                : isMiscDeliveryTabValid
                  ? "color-green"
                  : "color-red"
            }
            disabled={disabledTabs.miscDelivery}
          >
            <MiscDeliveryMainPage styles={styles} />
          </Tab>
          {/* Invoice Tab */}
          <Tab
            eventKey={"invoice"}
            title={"Invoice"}
            tabClassName={
              isUnitDataLoading ||
              viewDetail ||
              (Number(invoiceMiles) > 0 && (Number(invoiceFlatrate) > 0 || Number(baseRate) > 0))
                ? ""
                : "color-red"
            }
          >
            <Invoice styles={styles} disabled={viewDetail} />
          </Tab>
          {/* Driver Tab */}
          <Tab
            eventKey={"driver"}
            title={"Driver"}
            tabClassName={
              isUnitDataLoading ||
              viewDetail ||
              (Number(driverMiles) > 0 && (Number(driverBaseRate) > 0 || Number(driverFlatRate) > 0))
                ? ""
                : "color-red"
            }
          >
            <Driver styles={styles} disabled={viewDetail} />
          </Tab>
          {/* Over width Tab */}
          <Tab
            eventKey={"overWidth"}
            title={"Over Width"}
            tabClassName={
              isUnitDataLoading || viewDetail || !unitOverWidthLoadRequired || !isUnitTypeOverWidth
                ? ""
                : isOverWidthTabValid
                  ? "color-green"
                  : "color-red"
            }
            disabled={disabledTabs.overWidth}
          >
            <OverWidth styles={styles} />
          </Tab>
          {/* Drive Bys Tab */}
          <Tab
            eventKey={"driveBys"}
            title={"Drive By's"}
            tabClassName={
              isUnitDataLoading ||
              viewDetail ||
              unitRoutesListing?.length === 0 ||
              !editedUnitDataToSaveForSettingsTab?.hasDrivebys
                ? ""
                : isDriveBysTabValid
                  ? "color-green"
                  : "color-red"
            }
            disabled={disabledTabs.driveBys}
          >
            <DriveByMainpage styles={styles} />
          </Tab>
          {/* Open Balance Tab */}
          <Tab
            eventKey={"openBalance"}
            title={"Open Balances"}
            tabClassName={
              isUnitDataLoading || viewDetail
                ? ""
                : isOpenBalanceValid ||
                    selectedUnitData?.editMasterExpressInvoiceRatesData?.fodinvoiceAmount ===
                      selectedUnitData?.editMasterExpressInvoiceRatesData?.prepaidAmount
                  ? isOpenBalancesDisabled
                    ? ""
                    : "color-green"
                  : !selectedUnitData?.editMasterExpressUnitTabDTO?.openBalancePrepaid
                    ? ""
                    : "color-red"
            }
            disabled={disabledTabs.openBalance}
          >
            <OpenBalances styles={styles} />
            {/* <OpenBalancesPrevious styles={styles} /> */}
          </Tab>
          {/* Contacts Tab */}
          <Tab
            eventKey={"contacts"}
            title={"Contacts"}
            tabClassName={
              isUnitDataLoading || viewDetail || !contactEditMode
                ? ""
                : isContactTabValid
                  ? "color-green"
                  : "color-red"
            }
          >
            <ContactsMainPage styles={styles} />
          </Tab>
          {/* Info Tab */}
          <Tab
            eventKey={"info"}
            title={"Info"}
            tabClassName={
              isUnitDataLoading ||
              viewDetail ||
              (!infoCancelledFlag &&
                !infoOnInvoiceHoldFlag &&
                !infoOnUnitHold &&
                !unitOnActivationDelay &&
                !unitOnShuttleDelay)
                ? ""
                : isInfoTabValid
                  ? "color-green"
                  : "color-red"
            }
          >
            <InfoContent styles={styles} />
          </Tab>
          {/* Reroutes Tab*/}
          <Tab
            eventKey={"reRoutes"}
            title={"Reroutes"}
            disabled={disabledTabs.reRoutes}
            tabClassName={
              isUnitDataLoading || viewDetail || !selectedUnitData?.editMaserExpressReroutesTabDTO
                ? ""
                : isRerouteTabValid
                  ? "color-green"
                  : "color-red"
            }
          >
            <Reroutes styles={styles} />
          </Tab>
          {/* Dispatch Tab*/}
          <Tab
            eventKey={"dispatches"}
            title={"Dispatches"}
            disabled={disabledTabs.dispatches}
            tabClassName={
              isUnitDataLoading ||
              viewDetail ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null
                ? ""
                : isDispatchTabValid
                  ? "color-green"
                  : "color-red"
            }
          >
            <DispatchesContent styles={styles} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default EditMasterExpressEditPageContent;
