import React, { useEffect, useRef, useState } from "react";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";
import styles from "../../../../../../../../styles/QuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderEntryService from "../../../../../../../../services/OrderEntryService";
import {
  setAllowedInvoicePercentageRedux,
  setDefaultDriverMiles,
  setDefaultInvoiceMiles,
  setDriverAmount,
  setDriverFlatrate,
  setDriverFlatrate2,
  setDriverMiles,
  setFlatRateErrorMsg,
  setInvoiceAmount,
  setInvoiceFlatrate,
  setInvoiceFlatrate2,
  setInvoiceMiles,
  setIsDefaultDriverMilesRedux,
  setIsDefaultInvoiceMilesRedux,
  setIsDriverFlatrateVisible,
  setIsInvoiceFlatrateVisible,
  setPcMilerError,
  setRateObj,
  setRateType,
  setShowOverrideButton,
  setDisableRerouteButton,
  setUpdatedPickupMiscDealerData,
  setSendDriverPaperwork,
} from "../../../../../../../../redux/RerouteSlice";
import numberValidation from "../../../../../../../../utils/validation/NumberValidation";
import PcMilerService from "../../../../../../../../services/PcMilerService";
import BigDecimal from "js-big-decimal";
import RerouteService from "../../../../../../../../services/RerouteService";
import LoadingIcon from "../../../../../../../common/LoadingIcon";
import toast from "react-hot-toast";

function RerouteConfirmationContent() {
  const miscellaneousPickup = useSelector((state) => state.rerouteReducer.miscellaneousPickup);
  const miscellaneousDelivery = useSelector((state) => state.rerouteReducer.miscellaneousDelivery);
  const rerouteSource = localStorage.getItem("RerouteSource");
  const selectedNewPickupMiscellneousDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewPickupMiscellneousDealerData
  );
  const selectedNewDeliveryMiscellneousDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewDeliveryMiscellneousDealerData
  );
  const selectedNewPickupNormalDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewPickupNormalDealerData
  );
  const selectedNewDeliveryNormalDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewDeliveryNormalDealerData
  );
  const companyId = useSelector((state) => state.rerouteReducer.companyId);
  const invoiceFlatrate = useSelector((state) => state.rerouteReducer.invoiceFlatrate);
  const driverFlatrate = useSelector((state) => state.rerouteReducer.driverFlatrate);
  const errorMsgFromRedux = useSelector((state) => state.rerouteReducer.flatRateErrorMsg);
  const [errorFlag, setErrorFlag] = useState(false);
  const dispatch = useDispatch();
  const [isDefaultInvoiceMiles, setIsDefaultInvoiceMiles] = useState(false);
  const [isDefaultDriverMiles, setIsDefaultDriverMiles] = useState(false);
  const [isDriverMileageRate, setIsDriverMileageRate] = useState(false);
  const [isInvoiceMileageRate, setIsInvoiceMileageRate] = useState(false);
  const [invoiceFlatrates, setInvoiceFlatrates] = useState(0);
  const pickUpMiscellaneousDealerData = useSelector((state) => state.rerouteReducer.miscellaneousDealerData);
  const pickUpNormalDealerData = useSelector((state) => state.rerouteReducer.normalDealerData);
  const pickupDealerFK = useSelector((state) => state.rerouteReducer.pickupDealerFK);
  const deliveryDealerFK = useSelector((state) => state.rerouteReducer.deliveryDealerFK);
  const sendDriverPaperwork = useSelector((state) => state.rerouteReducer.sendDriverPaperwork);
  const currentDeliveryMiscellaneousDealerData = useSelector(
    (state) => state.rerouteReducer.currentDeliveryMiscellaneousDealerData
  );
  const updatedDeliveryMiscDealerData = useSelector(
    (state) => state.rerouteReducer.updatedDeliveryMiscDealerData
  );
  const updatedPickupMiscDealerData = useSelector(
    (state) => state.rerouteReducer.updatedPickupMiscDealerData
  );
  const currentDeliveryNormalDealerData = useSelector(
    (state) => state.rerouteReducer.currentDeliveryNormalDealerData
  );

  const selectedUnitInfo = useSelector((state) => state.rerouteReducer.selectedUnitInfo);
  const rerouteType = useSelector((state) => state.rerouteReducer.rerouteType);
  let pickupDealerFKLocal = !miscellaneousPickup
    ? selectedNewPickupNormalDealerData.DealerPK || pickUpNormalDealerData.DealerPK || pickupDealerFK || null
    : null;
  let deliveryDealerFKLocal = !miscellaneousDelivery
    ? selectedNewDeliveryNormalDealerData.DealerPK ||
      currentDeliveryNormalDealerData.DealerPK ||
      deliveryDealerFK ||
      null
    : null;
  // Miles and flatrates default from the values stored in the unit when
  // Case 3: existing and new combinations each have exactly one miscellaneous dealer
  // Case 5: existing and new combinations both have two miscellaneous dealers
  const existingMiscDealerCount =
    (selectedUnitInfo?.pickupUnitAddressFK ? 1 : 0) + (selectedUnitInfo?.deliveryUnitAddressFK ? 1 : 0);
  // Only the rerouted side can change, the other side keeps the existing location
  const isNewPickupMisc =
    rerouteType === "Pickup" ? miscellaneousPickup : Boolean(selectedUnitInfo?.pickupUnitAddressFK);
  const isNewDeliveryMisc =
    rerouteType === "Delivery" ? miscellaneousDelivery : Boolean(selectedUnitInfo?.deliveryUnitAddressFK);
  const newMiscDealerCount = (isNewPickupMisc ? 1 : 0) + (isNewDeliveryMisc ? 1 : 0);
  const useUnitMilesAndFlatrates =
    rerouteSource === "EditMaster" &&
    ((existingMiscDealerCount === 1 && newMiscDealerCount === 1) ||
      (existingMiscDealerCount === 2 && newMiscDealerCount === 2));
  // Case 1: existing and new combinations have no miscellaneous dealers
  // Case 2: existing combination has one miscellaneous dealer, new combination has none
  // Miles found in DealerConnections / CustomerDealers / PlantToPlantConnection are populated and disabled
  // Applies to Edit Master, Operations and Delay reroutes
  const useConnectionMiles = existingMiscDealerCount <= 1 && newMiscDealerCount === 0;
  const invoiceMiles = useSelector((state) => state.rerouteReducer.invoiceMiles);
  const driverMiles = useSelector((state) => state.rerouteReducer.driverMiles);
  // Holds the miles value when the field gets focus, so the rates API is skipped on blur if nothing changed
  const milesOnFocusRef = useRef(null);
  const mileagErrorMsgFromRedux = useSelector((state) => state.rerouteReducer.mileagedErrorMsg);
  const invoiceAmount = useSelector((state) => state.rerouteReducer.invoiceAmount);
  const driverAmount = useSelector((state) => state.rerouteReducer.driverAmount);
  const allowedInvoicePercentageRedux = useSelector(
    (state) => state.rerouteReducer.allowedInvoicePercentageRedux
  );
  const isDriverFlatrateVisible = useSelector((state) => state.rerouteReducer.isDriverFlatrateVisible);
  const isInvoiceFlatrateVisible = useSelector((state) => state.rerouteReducer.isInvoiceFlatrateVisible);
  const driverFlatrate2 = useSelector((state) => state.rerouteReducer.driverFlatrate2);
  const invoiceFlatrate2 = useSelector((state) => state.rerouteReducer.invoiceFlatrate2);
  const showOverrideButton = useSelector((state) => state.rerouteReducer.showOverrideButton);
  const dispatchPK = useSelector((state) => state.rerouteReducer.dispatchPK);
  const selectedPickupDealer = useSelector((state) => state.rerouteReducer.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.rerouteReducer.selectedDeliveryDealer);
  const unitFK = useSelector((state) => state.rerouteReducer.unitFK);
  const rateObj = useSelector((state) => state.rerouteReducer.rateObj);
  const hasChangedDeliveryMiscDealer = useSelector(
    (state) => state.rerouteReducer.hasChangedDeliveryMiscDealer
  );
  const hasChangedPickupMiscDealer = useSelector((state) => state.rerouteReducer.hasChangedPickupMiscDealer);
  const hasClearedDeliveryDealerAutoComplete = useSelector(
    (state) => state.rerouteReducer.hasClearedDeliveryDealerAutoComplete
  );
  const hasClearedPickupDealerAutoComplete = useSelector(
    (state) => state.rerouteReducer.hasClearedPickupDealerAutoComplete
  );
  const hasChangedDeliveryMiscDealerStateCode = useSelector(
    (state) => state.rerouteReducer.hasChangedDeliveryMiscDealerStateCode
  );
  const hasChangedPickupMiscDealerStateCode = useSelector(
    (state) => state.rerouteReducer.hasChangedPickupMiscDealerStateCode
  );
  const previousURL = useSelector((state) => state.rerouteReducer.previousURL);
  const [showPCMilerModal, setShowPCMilerModal] = useState(false);
  const [showPCMilerErrorModal, setShowPCMilerErrorModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isDefaultDriverFlatrates, setIsDefaultDriverFlatrates] = useState(false);
  const [isDefaultInvoiceFlatrates, setIsDefaultInvoiceFlatrates] = useState(false);
  const [driverFlatrates, setDriverFlatrates] = useState(0);
  const [showFlatRateModal, setShowFlatRateModal] = useState(false);
  const [unitPercentage, setUnitPercentage] = useState(0);
  const [userName, setUserName] = useState("");
  const [userCode, setUserCode] = useState("");
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [showOverrideErrorMessage, setShowOverrideErrorMessage] = useState("");
  const [showOverrideErrorModal, setShowOverrideErrorModal] = useState(false);

  const [orderEntryApiLoading, setOrderEntryApiLoading] = useState(false);
  const [rerouteApiLoading, setRerouteApiLoading] = useState(false);
  // Case 3 / 5: hide the miles and flatrates until the unit values are applied on first load
  const [isUnitDefaultsPending, setIsUnitDefaultsPending] = useState(useUnitMilesAndFlatrates);

  const handleFlatRateCancel = () => {
    setShowFlatRateModal(false);
  };

  const handleOverideButton = () => {
    setShowFlatRateModal(true);
  };

  const handleOverrideCancel = () => {
    setShowOverrideModal(false);
  };

  const handleOverrideOK = () => {
    // To be done : get override percentage of selected user
    //if override percentage is less than customers allowed percentage , show error
    //if the entered value is more than allowed what should we do ?

    let overrideValue;

    setOrderEntryApiLoading(true);
    OrderEntryService.getOverInvoiceAmt(userCode)
      .then((res) => {
        overrideValue = res.data;

        //if no record present in the db with the given details
        if (
          overrideValue === null ||
          overrideValue === undefined ||
          overrideValue === "" ||
          overrideValue === 0
        ) {
          setShowOverrideErrorModal(true);
          setShowOverrideErrorMessage("Invalid code !!");
          setShowOverrideModal(false);
        } else {
          //record is present but, find the sum
          let newOverrideVal = Number(overrideValue / 100) + Number(selectedUnitInfo.invoicePercentage / 100);

          if (newOverrideVal < 100) {
            if (unitPercentage > newOverrideVal) {
              setShowOverrideErrorModal(true);
              setShowOverrideErrorMessage(
                "New invoice percentage is insufficient !! Please try another code."
              );
            } else {
              dispatch(setAllowedInvoicePercentageRedux(newOverrideVal));
              dispatch(setFlatRateErrorMsg(""));
              setShowOverrideModal(false);
            }
          } else {
            setShowOverrideErrorMessage("Override Percentage is greater than 100");
            setShowOverrideErrorModal(true);
            setShowOverrideModal(false);
          }
        }
      })
      .catch((err) => {})
      .finally(() => setOrderEntryApiLoading(false));
  };

  const handleInputValue = (e, setValue) => {
    let value = e.target.value;
    let indexOfDecimal = value.indexOf(".");

    if (value.length === 6 && indexOfDecimal === -1) {
      value = value.slice(0, 5) + "." + value.slice(5);
    } else if (indexOfDecimal === 5 && value.length === 6) {
    } else {
      value = value.replace(/[^\d\.]/g, "");
    }

    if (e.inputType === "deleteContentBackward" && value[indexOfDecimal - 1] === ".") {
      value = value.slice(0, indexOfDecimal - 1) + value.slice(indexOfDecimal);
      e.target.value = value;
      return;
    }

    e.target.value = value;
    setValue(e.target.value);
  };

  const isValidDecimal = (value) => {
    if (value === "" || value === null) return false;

    // Must be a positive decimal (no negatives, no leading ".")
    const regexp = /^(?!0+(\.0+)?$)\d{1,5}(\.\d{1,2})?$/;

    return regexp.test(value);
  };

  const handleAmountExceedsPercentage = () => {
    let unitPercentage = Number(driverAmount) / Number(invoiceAmount);
    if (driverAmount > 0) {
      if (invoiceAmount > 0) {
        if (Number(unitPercentage) > Number(allowedInvoicePercentageRedux)) {
          dispatch(setFlatRateErrorMsg("Unit Percentage exceeds Allowed percentage"));
          dispatch(setShowOverrideButton(true));
        } else {
          dispatch(setFlatRateErrorMsg(""));
          dispatch(setShowOverrideButton(false));
        }
      }
    }
  };

  const checkInvoicePercentage = () => {
    let userInvoicePercentage = 0;
    let allowedInvoicePercentage1 = 0;

    OrderEntryService.getUserInvoicePercentage(12).then((res) => {
      if (res !== null && res.data !== "") {
        userInvoicePercentage = res.data;
        allowedInvoicePercentage1 =
          userInvoicePercentage / 100 + (selectedUnitInfo?.invoicePercentage || 0) / 100;
        dispatch(setAllowedInvoicePercentageRedux(allowedInvoicePercentage1));
      }
    });
  };

  function handleBeforeInputForInteger(e, maxValue) {
    const currentValue = e.target.value;
    const inputChar = e.data;

    if (inputChar !== null && !/^[0-9+e]*$/.test(inputChar)) {
      e.preventDefault();
      return;
    }

    const newValue = parseInt(currentValue + inputChar, 10);
    if (newValue > maxValue) {
      e.preventDefault();
      return;
    }
  }

  const handlePCMiler = () => {
    handlePCMilerOK();
  };

  const handlePCMilerOK = () => {
    calculateDistance();
  };

  const calculateDistance = () => {
    let pickupCity =
      rerouteType === "Pickup"
        ? selectedNewPickupNormalDealerData?.City || updatedPickupMiscDealerData.city
        : selectedUnitInfo.pickupCity;
    let pickupStateCode =
      rerouteType === "Pickup"
        ? selectedNewPickupNormalDealerData?.StateCode || updatedPickupMiscDealerData.stateCode
        : selectedUnitInfo.pickupStateCode;
    let deliveryCity =
      rerouteType === "Delivery"
        ? selectedNewDeliveryNormalDealerData?.City || updatedDeliveryMiscDealerData?.city || ""
        : selectedUnitInfo.deliveryCity;
    let deliveryStateCode =
      rerouteType === "Delivery"
        ? selectedNewDeliveryNormalDealerData?.StateCode || updatedDeliveryMiscDealerData?.stateCode || ""
        : selectedUnitInfo.deliveryStateCode;
    let pickupDeliverylocation = {
      src: {
        city: pickupCity || "",
        stateCode: pickupStateCode || "",
      },
      dst: {
        city: deliveryCity || "",
        stateCode: deliveryStateCode || "",
      },
    };
    setLoader(true);
    PcMilerService.calculateDistance(pickupDeliverylocation)
      .then((res) => {
        if (res != null && res.data !== "") {
          const data = res.data;
          let distance = data.distance ? Math.round(data.distance) : 0;
          dispatch(setInvoiceMiles(Number(distance)));
          dispatch(setDriverMiles(distance));
          setShowPCMilerErrorModal(false);
          dispatch(setPcMilerError(""));
          setLoader(false);
        }
      })
      .catch((err) => {
        setShowPCMilerErrorModal(true);
        dispatch(setPcMilerError("PC Miler is not available"));
        setLoader(false);
      });
  };

  const fetchRates = async (invoiceMilesValue = invoiceMiles, driverMilesValue = driverMiles) => {
    try {
      setRerouteApiLoading(true);

      const pickupStateCode =
        rerouteType === "Pickup"
          ? selectedNewPickupNormalDealerData?.StateCode || updatedPickupMiscDealerData.stateCode
          : selectedUnitInfo?.pickupStateCode;

      const deliveryStateCode =
        rerouteType === "Delivery"
          ? selectedNewDeliveryNormalDealerData?.StateCode || updatedDeliveryMiscDealerData?.stateCode || ""
          : selectedUnitInfo?.deliveryStateCode;

      const res = await RerouteService.fetchRates(
        companyId,
        pickupDealerFKLocal,
        deliveryDealerFKLocal,
        invoiceMilesValue || (useUnitMilesAndFlatrates ? selectedUnitInfo?.invoiceMiles : 0) || 0,
        driverMilesValue || (useUnitMilesAndFlatrates ? selectedUnitInfo?.driverMiles : 0) || 0,
        selectedUnitInfo?.pickupCustomerPlantFK,
        selectedUnitInfo.deliveryCustomerPlantFK,
        unitFK,
        dispatchPK,
        selectedUnitInfo.billingCustomerPlantFK,
        selectedUnitInfo.customerFK,
        pickupStateCode,
        deliveryStateCode
      );
      if (res?.data && res.data.length > 0) {
        const data = res.data;
        dispatch(setRateObj(data[0]));

        if (useUnitMilesAndFlatrates) {
          // Keep the miles and flatrates defaulted from the unit (or as edited by the user)
        } else if (useConnectionMiles) {
          const connectionInvoiceMiles = Number(data[0].invoiceMiles) || 0;
          const connectionDriverMiles = Number(data[0].driverMiles) || 0;
          if (connectionInvoiceMiles > 0) {
            dispatch(setInvoiceMiles(connectionInvoiceMiles));
          }
          if (connectionDriverMiles > 0) {
            dispatch(setDriverMiles(connectionDriverMiles));
          }
          setIsDefaultInvoiceMiles(connectionInvoiceMiles > 0);
          setIsDefaultDriverMiles(connectionDriverMiles > 0);
          if (Number(data[0].invoiceFlatRate) > 0) {
            dispatch(setInvoiceFlatrate(data[0].invoiceFlatRate || 0));
          }
          if (Number(data[0].driverFlatRate) > 0) {
            dispatch(setDriverFlatrate(data[0].driverFlatRate || 0));
          }
        } else if (selectedUnitInfo?.pickupUnitAddressFK || selectedUnitInfo?.deliveryUnitAddressFK) {
          dispatch(setInvoiceFlatrate(0));
          dispatch(setDriverFlatrate(0));
          if (selectedUnitInfo?.pickupUnitAddressFK) {
            const deliverynotChanged =
              rerouteType === "Pickup" ||
              (selectedUnitInfo?.deliveryUnitAddressFK && !hasChangedDeliveryMiscDealerStateCode) ||
              selectedUnitInfo?.deliveryCustomerPlantFK ||
              (deliveryDealerFKLocal && selectedUnitInfo?.deliveryDealerFK === deliveryDealerFKLocal);
            if (!hasChangedPickupMiscDealerStateCode && deliverynotChanged && !pickupDealerFKLocal) {
              if (
                (!invoiceMiles && !driverMiles) ||
                deliveryDealerFKLocal ||
                hasChangedDeliveryMiscDealerStateCode
              ) {
                dispatch(setInvoiceMiles(data[0].InvoiceMiles_Unit || 0));
                dispatch(setDriverMiles(data[0].DriverMiles_Unit || 0));
              }
              if (Number(data[0].InvoiceFlatRate_Unit) > 0) {
                dispatch(setInvoiceFlatrate(data[0].InvoiceFlatRate_Unit || 0));
              }
              if (Number(data[0].DriverFlatRate_Unit) > 0) {
                dispatch(setDriverFlatrate(data[0].DriverFlatRate_Unit || 0));
              }
            } else {
              if (!invoiceMiles && !driverMiles) {
                dispatch(setInvoiceMiles(data[0].invoiceMiles || 0));
                dispatch(setDriverMiles(data[0].driverMiles || 0));
              }
              if (Number(data[0].invoiceFlatRate) > 0) {
                dispatch(setInvoiceFlatrate(data[0].invoiceFlatRate || 0));
              }
              if (Number(data[0].driverFlatRate) > 0) {
                dispatch(setDriverFlatrate(data[0].driverFlatRate || 0));
              }
            }
          } else {
            const pickupNotChanged =
              rerouteType === "Delivery" ||
              (selectedUnitInfo?.pickupUnitAddressFK && !hasChangedPickupMiscDealerStateCode) ||
              selectedUnitInfo?.pickupCustomerPlantFK ||
              (pickupDealerFKLocal && selectedUnitInfo?.pickupDealerFK === pickupDealerFKLocal);
            if (!hasChangedDeliveryMiscDealerStateCode && pickupNotChanged && !deliveryDealerFKLocal) {
              if (
                (!invoiceMiles && !driverMiles) ||
                pickupDealerFKLocal ||
                hasChangedPickupMiscDealerStateCode
              ) {
                dispatch(setInvoiceMiles(data[0].InvoiceMiles_Unit || 0));
                dispatch(setDriverMiles(data[0].DriverMiles_Unit || 0));
              }
              if (Number(data[0].InvoiceFlatRate_Unit) > 0) {
                dispatch(setInvoiceFlatrate(data[0].InvoiceFlatRate_Unit || 0));
              }
              if (Number(data[0].DriverFlatRate_Unit) > 0) {
                dispatch(setDriverFlatrate(data[0].DriverFlatRate_Unit || 0));
              }
            } else {
              if (!invoiceMiles && !driverMiles) {
                dispatch(setInvoiceMiles(data[0].invoiceMiles));
                dispatch(setDriverMiles(data[0].driverMiles));
              }

              if (Number(data[0].invoiceFlatRate) > 0) {
                dispatch(setInvoiceFlatrate(data[0].invoiceFlatRate || 0));
              }
              if (Number(data[0].driverFlatRate) > 0) {
                dispatch(setDriverFlatrate(data[0].driverFlatRate || 0));
              }
            }
          }
        } else {
          if (!invoiceMiles && !driverMiles) {
            dispatch(setInvoiceMiles(data[0].invoiceMiles || 0));
            dispatch(setDriverMiles(data[0].driverMiles || 0));
          }
          if (Number(data[0].invoiceFlatRate) > 0) {
            dispatch(setInvoiceFlatrate(data[0].invoiceFlatRate || 0));
          }
          if (Number(data[0].driverFlatRate) > 0) {
            dispatch(setDriverFlatrate(data[0].driverFlatRate || 0));
          }
        }

        // ---------- Invoice Calculation ----------
        let invoiceAmount = 0;
        let additionalInvoiceAmount =
          new BigDecimal(data[0].invoiceAdditionalFlatRate).compareTo(new BigDecimal(0)) > 0
            ? data[0].invoiceAdditionalFlatRate
            : data[0].invoiceAdditionalRate;

        let invoiceSupplementalRate = data[0].invoiceSupplementalRate;

        if (data[0].invoiceFlatRate > 0) {
          invoiceAmount = data[0].invoiceFlatRate + selectedUnitInfo.invoiceUSCNSurcharge;
          setIsInvoiceMileageRate(false);
          dispatch(setIsInvoiceFlatrateVisible(true));
          setIsDefaultInvoiceFlatrates(true);
          if (Number(data[0].invoiceFlatRateFromCustomerRate) > 0) {
            dispatch(setInvoiceFlatrate2(data[0].invoiceFlatRateFromCustomerRate));
            setIsInvoiceMileageRate(false);
          } else {
            dispatch(setInvoiceFlatrate2(0));
            if (data[0].invoiceRateFromCustomerRate > 0) {
              setIsInvoiceMileageRate(true);
            }
          }
        } else {
          dispatch(setIsInvoiceFlatrateVisible(true));

          if (Number(data[0].invoiceFlatRateFromCustomerRate) > 0) {
            dispatch(setInvoiceFlatrate2(data[0].invoiceFlatRateFromCustomerRate));
            setIsInvoiceMileageRate(false);
          } else {
            dispatch(setInvoiceFlatrate2(0));
            if (data[0].invoiceRateFromCustomerRate > 0) {
              setIsInvoiceMileageRate(true);
            }
          }

          invoiceAmount =
            data[0].invoiceRate +
            invoiceSupplementalRate +
            additionalInvoiceAmount +
            selectedUnitInfo.invoiceCDLARate +
            data[0].invoiceSpecialRate +
            selectedUnitInfo.invoiceLengthRate +
            selectedUnitInfo.invoicePortEscortFee +
            selectedUnitInfo.invoiceELDFee;

          dispatch(setInvoiceAmount(invoiceAmount));
        }

        // ---------- Driver Calculation ----------
        let driverAmount = 0;
        let driverSupplementalRate = data[0].driverSupplementalRate;

        let additionalDriverAmount =
          new BigDecimal(data[0].driverAdditionalFlatRate).compareTo(new BigDecimal(0)) > 0
            ? data[0].driverAdditionalFlatRate
            : data[0].driverAdditionalRate;

        if (data[0].driverFlatrate > 0) {
          driverAmount = data[0].driverFlatrate + selectedUnitInfo.driverUSCNSurcharge;
          setIsDriverMileageRate(false);
          dispatch(setIsDriverFlatrateVisible(true));
          setIsDefaultDriverFlatrates(true);
          if (data[0].driverFlatRateFromCustomerRate > 0) {
            dispatch(setDriverFlatrate2(data[0].driverFlatRateFromCustomerRate));
            setIsDriverMileageRate(false);
          } else {
            dispatch(setDriverFlatrate2(0));
            if (data[0].driverRateFromCustomerRate > 0) {
              setIsDriverMileageRate(true);
            }
          }
        } else {
          dispatch(setIsDriverFlatrateVisible(true));

          driverAmount =
            data[0].driverRate +
            driverSupplementalRate +
            additionalDriverAmount +
            selectedUnitInfo.driverCDLARate +
            data[0].driverSpecialRate +
            selectedUnitInfo.driverLengthRate +
            selectedUnitInfo.invoicePortEscortFee +
            selectedUnitInfo.invoiceELDFee;

          if (data[0].driverFlatRateFromCustomerRate > 0) {
            dispatch(setDriverFlatrate2(data[0].driverFlatRateFromCustomerRate));
            setIsDriverMileageRate(false);
          } else {
            dispatch(setDriverFlatrate2(0));
            if (data[0].driverRateFromCustomerRate > 0) {
              setIsDriverMileageRate(true);
            }
          }
        }

        dispatch(setDriverAmount(driverAmount));
      } else {
        // No data case
        dispatch(setIsInvoiceFlatrateVisible(true));
        dispatch(setIsDriverFlatrateVisible(true));
        setIsDefaultInvoiceMiles(false);
        setIsDefaultDriverMiles(false);
        if (!useUnitMilesAndFlatrates) {
          dispatch(setInvoiceMiles(0));
          dispatch(setDriverMiles(0));
          dispatch(setInvoiceFlatrate(0));
          dispatch(setDriverFlatrate(0));
        }
        dispatch(setInvoiceFlatrate2(0));
        dispatch(setDriverFlatrate2(0));
      }
    } catch (error) {
      // Handle error gracefully
      dispatch(setIsInvoiceFlatrateVisible(true));
      dispatch(setIsDriverFlatrateVisible(true));
    } finally {
      // Case 3 / 5: unit values are shown only after the rates have loaded
      if (isUnitDefaultsPending) {
        applyUnitMilesAndFlatrates();
      }
      setRerouteApiLoading(false);
    }
  };

  const applyUnitMilesAndFlatrates = () => {
    dispatch(setInvoiceMiles(selectedUnitInfo?.invoiceMiles || 0));
    dispatch(setDriverMiles(selectedUnitInfo?.driverMiles || 0));
    dispatch(setInvoiceFlatrate(selectedUnitInfo?.invoiceFlatRate || 0));
    dispatch(setDriverFlatrate(selectedUnitInfo?.driverFlatRate || 0));
    setIsUnitDefaultsPending(false);
  };

  const handleFlatRateOK = () => {
    setUserName("");
    setUserCode("");
    setShowOverrideErrorMessage("");
    setShowFlatRateModal(false);
    setShowOverrideModal(true);
  };

  const handleOverrideErrorCancel = () => {
    setShowOverrideErrorModal(false);
  };

  useEffect(() => {
    if (errorMsgFromRedux === null || errorMsgFromRedux === undefined || errorMsgFromRedux === "") {
      setErrorFlag(false);
    } else {
      setErrorFlag(true);
    }
  }, [errorMsgFromRedux]);

  useEffect(() => {
    if (
      !rateObj ||
      (invoiceFlatrate === 0 && driverFlatrate === 0 && invoiceMiles !== 0 && driverMiles !== 0) ||
      (rerouteType === "Pickup" && hasChangedPickupMiscDealer && !miscellaneousPickup) ||
      (rerouteType === "Delivery" && hasChangedDeliveryMiscDealer && !miscellaneousDelivery) ||
      (rerouteType === "Pickup" && hasClearedPickupDealerAutoComplete && miscellaneousPickup) ||
      (rerouteType === "Delivery" && hasClearedDeliveryDealerAutoComplete && miscellaneousDelivery) ||
      (rerouteType === "Delivery" && hasChangedDeliveryMiscDealerStateCode) ||
      (rerouteType === "Pickup" && hasChangedPickupMiscDealerStateCode)
    ) {
      fetchRates();
    } else if (isUnitDefaultsPending) {
      applyUnitMilesAndFlatrates();
    }
  }, [pickupDealerFKLocal, deliveryDealerFKLocal]);

  useEffect(() => {
    checkInvoicePercentage();
  }, [selectedUnitInfo?.customerFK]);

  useEffect(() => {
    if (invoiceMiles > 0 && driverMiles > 0 && isDefaultInvoiceMiles) {
      handleAmountExceedsPercentage();
    }
    if (invoiceMiles == 0 || driverMiles == 0) {
      // checkInvoicePercentage();
      dispatch(setFlatRateErrorMsg(""));
      setShowFlatRateModal(false);
      setUnitPercentage(0);
      dispatch(setShowOverrideButton(false));
    }
  }, [invoiceMiles, driverMiles, unitPercentage, isDefaultInvoiceMiles]);

  useEffect(() => {
    if (driverAmount > 0) {
      if (invoiceAmount > 0) {
        let unitPercentage = Number(driverAmount) / Number(invoiceAmount);
        setUnitPercentage(unitPercentage);
      }
    }
  }, [invoiceAmount, driverAmount]);

  const isValidInvoiceFlatrate = () => {
    if (isInvoiceMileageRate) {
      return (
        invoiceFlatrate === "" || // optional
        isValidDecimal(invoiceFlatrate) ||
        !errorFlag
      );
    } else {
      return (
        Number(invoiceFlatrate2) > 0 ||
        (Number(invoiceFlatrate) > 0 &&
          invoiceFlatrate !== "" &&
          isValidDecimal(invoiceFlatrate) &&
          !errorFlag)
      );
    }
  };

  const isValidDriverFlatrate = () => {
    if (isDriverMileageRate) {
      return (
        driverFlatrate === "" || // optional
        isValidDecimal(driverFlatrate) ||
        !errorFlag
      );
    } else {
      return (
        Number(driverFlatrate2) !== 0 ||
        (Number(driverFlatrate) !== 0 &&
          driverFlatrate !== "" &&
          isValidDecimal(driverFlatrate) &&
          !errorFlag)
      );
    }
  };

  useEffect(() => {
    const flatrateValid = isValidInvoiceFlatrate();
    const driverFlatrateValid = isValidDriverFlatrate();

    if (
      invoiceMiles >= 1 &&
      mileagErrorMsgFromRedux === "" &&
      driverMiles >= 1 &&
      mileagErrorMsgFromRedux === "" &&
      flatrateValid &&
      driverFlatrateValid
    ) {
      dispatch(setDisableRerouteButton(false));
    } else {
      dispatch(setDisableRerouteButton(true));
    }
  }, [invoiceMiles, driverMiles, mileagErrorMsgFromRedux, isValidInvoiceFlatrate, isValidDriverFlatrate]);

  return (
    <div className="w-100 p-2">
      {(orderEntryApiLoading || rerouteApiLoading || loader) && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight ps-3">
        <Row>
          <Col xs={6} md={6} sm={6}>
            <Form.Group className="mt-5 align-items-center row  m-l-5 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Pickup </Form.Label>
              </Col>
              <Col xs={8} md={8} sm={8} className="p-0" style={{ marginLeft: "-4px", width: "200px" }}>
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={
                    rerouteType === "Pickup"
                      ? miscellaneousPickup
                        ? updatedPickupMiscDealerData?.name
                        : selectedNewPickupNormalDealerData?.Name
                      : selectedUnitInfo?.pickupName
                  }
                  autoComplete="one-time-code"
                  disabled={true}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0"></Col>
              <Col xs={8} md={8} sm={8} className="p-0" style={{ width: "200px" }}>
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={
                    rerouteType === "Pickup"
                      ? miscellaneousPickup
                        ? updatedPickupMiscDealerData?.address1
                        : selectedNewPickupNormalDealerData?.Address1
                      : selectedUnitInfo?.pickupAddress1
                  }
                  autoComplete="one-time-code"
                  disabled={true}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            {/* Address Field-2 */}
            <Form.Group className="mt-3 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0"></Col>
              <Col xs={8} md={8} sm={8} className="p-0" style={{ width: "200px" }}>
                <input
                  className="customFormControl"
                  name="ad2"
                  value={
                    rerouteType === "Pickup"
                      ? miscellaneousPickup
                        ? updatedPickupMiscDealerData?.address2
                        : selectedNewPickupNormalDealerData?.Address2
                      : selectedUnitInfo?.pickupAddress2
                  }
                  type="text"
                  maxLength={30}
                  disabled={true}
                  autoComplete="one-time-code"
                  onInput={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            {/* City,State, Zip */}
            <Form.Group className="form-group align-items-center row m-0 mb-3">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-2"></Form.Label>
              </Col>

              {/* City */}
              <Col xs={3} md={3} sm={3} className="p-0 w-200px">
                <input
                  className="customFormControl  "
                  name="city"
                  type="text"
                  disabled
                  value={
                    rerouteType === "Pickup"
                      ? miscellaneousPickup
                        ? updatedPickupMiscDealerData?.city
                        : selectedNewPickupNormalDealerData?.City
                      : selectedUnitInfo?.pickupCity
                  }
                />
              </Col>
              {/* State Code */}
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  className="w-30px ms-1 customFormControl"
                  name="stateCode"
                  type="text"
                  disabled
                  value={
                    rerouteType === "Pickup"
                      ? miscellaneousPickup
                        ? updatedPickupMiscDealerData?.stateCode
                        : selectedNewPickupNormalDealerData?.StateCode
                      : selectedUnitInfo?.pickupStateCode
                  }
                />
              </Col>

              {/* Zip */}
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className="w-85px ms-2 customFormControl"
                  name="postalCode"
                  type="text"
                  disabled
                  value={
                    rerouteType === "Pickup"
                      ? miscellaneousPickup
                        ? updatedPickupMiscDealerData?.postalCode
                        : selectedNewPickupNormalDealerData?.PostalCode
                      : selectedUnitInfo?.pickupPostalCode
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-55 align-items-center row  m-l-5 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Delivery </Form.Label>
              </Col>
              <Col xs={8} md={8} sm={8} className="p-0" style={{ marginLeft: "-4px", width: "200px" }}>
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={
                    rerouteType === "Delivery"
                      ? miscellaneousDelivery
                        ? updatedDeliveryMiscDealerData?.name || ""
                        : selectedNewDeliveryNormalDealerData?.Name
                      : selectedUnitInfo?.deliveryName
                  }
                  autoComplete="one-time-code"
                  disabled={true}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0"></Col>
              <Col xs={8} md={8} sm={8} className="p-0" style={{ width: "200px" }}>
                <input
                  className="customFormControl"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  value={
                    rerouteType === "Delivery"
                      ? miscellaneousDelivery
                        ? updatedDeliveryMiscDealerData?.address1 || ""
                        : selectedNewDeliveryNormalDealerData?.Address1 || ""
                      : selectedUnitInfo?.deliveryAddress1
                  }
                  autoComplete="one-time-code"
                  disabled={true}
                  onInput={""}
                  onBlur={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            {/* Address Field-2 */}
            <Form.Group className="mt-3 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0"></Col>
              <Col xs={8} md={8} sm={8} className="p-0" style={{ width: "200px" }}>
                <input
                  className="customFormControl"
                  name="ad2"
                  value={
                    rerouteType === "Delivery"
                      ? miscellaneousDelivery
                        ? updatedDeliveryMiscDealerData?.address2 || ""
                        : selectedNewDeliveryNormalDealerData?.Address2 || ""
                      : selectedUnitInfo?.deliveryAddress2
                  }
                  type="text"
                  maxLength={30}
                  disabled={true}
                  autoComplete="one-time-code"
                  onInput={""}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            {/* City,State, Zip */}
            <Form.Group className="form-group align-items-center row m-0 mb-3">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-2"></Form.Label>
              </Col>

              {/* City */}
              <Col xs={3} md={3} sm={3} className="p-0 w-200px">
                <input
                  className="customFormControl  "
                  name="city"
                  type="text"
                  disabled
                  value={
                    rerouteType === "Delivery"
                      ? miscellaneousDelivery
                        ? updatedDeliveryMiscDealerData?.city || ""
                        : selectedNewDeliveryNormalDealerData?.City || ""
                      : selectedUnitInfo?.deliveryCity
                  }
                />
              </Col>
              {/* State Code */}
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  className="w-30px ms-1 customFormControl"
                  name="stateCode"
                  type="text"
                  disabled
                  value={
                    rerouteType === "Delivery"
                      ? miscellaneousDelivery
                        ? updatedDeliveryMiscDealerData?.stateCode || ""
                        : selectedNewDeliveryNormalDealerData?.StateCode || ""
                      : selectedUnitInfo?.deliveryStateCode
                  }
                />
              </Col>

              {/* Zip */}
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className=" ms-2 customFormControl"
                  style={{ width: "81px" }}
                  name="postalCode"
                  type="text"
                  disabled
                  value={
                    rerouteType === "Delivery"
                      ? miscellaneousDelivery
                        ? updatedDeliveryMiscDealerData?.postalCode || ""
                        : selectedNewDeliveryNormalDealerData?.PostalCode || ""
                      : selectedUnitInfo?.deliveryPostalCode
                  }
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={6} md={6} sm={6}>
            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                Invoice Miles
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className={`customFormControl ${
                    orderEntryApiLoading || rerouteApiLoading || isDefaultInvoiceMiles
                      ? ""
                      : invoiceMiles >= 1 && mileagErrorMsgFromRedux === ""
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  name="ad1"
                  type="text"
                  maxLength={4}
                  value={isUnitDefaultsPending ? "" : invoiceMiles}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  disabled={isDefaultInvoiceMiles || rerouteApiLoading}
                  onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
                  onChange={(e) => {
                    const value = numberValidation(e.target.value);
                    dispatch(setDefaultInvoiceMiles(value));
                    dispatch(setInvoiceMiles(value));
                  }}
                  onFocus={() => {
                    milesOnFocusRef.current = Number(invoiceMiles) || 0;
                  }}
                  onBlur={(e) => {
                    handleAmountExceedsPercentage();
                    const value = Number(numberValidation(e.target.value));
                    dispatch(setDefaultInvoiceMiles(numberValidation(value)));
                    dispatch(setInvoiceMiles(numberValidation(value)));

                    let newDriverMiles = Number(driverMiles);
                    if (!driverMiles && e.target.value) {
                      newDriverMiles = value;
                      dispatch(setDefaultDriverMiles(value));
                      dispatch(setDriverMiles(value));
                    }
                    // Call the rates API only when invoice miles changed and both miles have a value
                    if (value !== milesOnFocusRef.current && value > 0 && newDriverMiles > 0) {
                      fetchRates(value, newDriverMiles);
                    }
                  }}
                  spellCheck={false}
                />
              </Col>

              <Col xs={2} md={2} sm={2}>
                <button
                  className="btn btn-secondary font-12 btn-sm w-70px"
                  type=""
                  hidden={""}
                  onClick={handlePCMiler}
                >
                  PC Miler
                </button>
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                Driver Miles
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className={`customFormControl ${
                    orderEntryApiLoading || rerouteApiLoading || isDefaultDriverMiles
                      ? ""
                      : driverMiles >= 1 && mileagErrorMsgFromRedux === ""
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  name="ad1"
                  type="text"
                  maxLength={4}
                  value={isUnitDefaultsPending ? "" : driverMiles}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
                  disabled={isDefaultDriverMiles || rerouteApiLoading}
                  onChange={(e) => {
                    const value = numberValidation(e.target.value);
                    dispatch(setDefaultDriverMiles(value));
                    dispatch(setDriverMiles(value));
                  }}
                  onFocus={() => {
                    milesOnFocusRef.current = Number(driverMiles) || 0;
                  }}
                  onBlur={(e) => {
                    handleAmountExceedsPercentage();
                    const value = Number(numberValidation(e.target.value));
                    dispatch(setDefaultDriverMiles(value));
                    dispatch(setDriverMiles(value));

                    // Call the rates API only when driver miles changed and both miles have a value
                    if (value !== milesOnFocusRef.current && Number(invoiceMiles) > 0 && value > 0) {
                      fetchRates(Number(invoiceMiles), value);
                    }
                  }}
                  spellCheck={false}
                />
              </Col>
              <Col
                xs={3}
                md={3}
                sm={3}
                className={`${showOverrideButton && errorMsgFromRedux ? "" : "hide-elements"}`}
              >
                <button
                  type="button"
                  className={`btn btn-secondary font-12 btn-sm w-70px `}
                  onClick={handleOverideButton}
                >
                  Override
                </button>
              </Col>
            </Form.Group>

            <Form.Group
              className={`mt-5 align-items-center row  m-l-0 m-r-0 ${!isInvoiceFlatrateVisible ? "hide-elements" : ""}`}
            >
              <Col sm={4} md={4} xs={4} className="p-0">
                Invoice Flatrate
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className={`customFormControl ${
                    orderEntryApiLoading || rerouteApiLoading
                      ? ""
                      : isInvoiceMileageRate
                        ? invoiceFlatrate !== "" && !isValidDecimal(invoiceFlatrate) && errorFlag
                          ? "borderRed"
                          : ""
                        : ((Number(invoiceFlatrate) > 0 &&
                              invoiceFlatrate !== "" &&
                              isValidDecimal(invoiceFlatrate)) ||
                              Number(invoiceFlatrate2) > 0) &&
                            !errorFlag
                          ? Number(invoiceFlatrate2) > 0
                            ? ""
                            : "borderGreen"
                          : "borderRed"
                  }
            
            `}
                  name="ad1"
                  type="text"
                  maxLength={8}
                  value={isUnitDefaultsPending ? "" : invoiceFlatrate}
                  disabled={rerouteApiLoading}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    if (e.target.value !== ".") {
                      handleInputValue(e, setInvoiceFlatrates);
                      dispatch(setInvoiceFlatrate(numberValidation(e.target.value)));
                    }
                  }}
                  onBlur={handleAmountExceedsPercentage}
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <Form.Group
              className={`mt-3 align-items-center row  m-l-0 m-r-0 ${!isDriverFlatrateVisible ? "hide-elements" : ""}`}
            >
              <Col sm={4} md={4} xs={4} className="p-0">
                Driver Flatrate
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className={`customFormControl ${
                    orderEntryApiLoading || rerouteApiLoading
                      ? ""
                      : isDriverMileageRate
                        ? driverFlatrate !== "" && !isValidDecimal(driverFlatrate) && errorFlag
                          ? "borderRed"
                          : ""
                        : ((Number(driverFlatrate) > 0 &&
                              driverFlatrate !== "" &&
                              isValidDecimal(driverFlatrate)) ||
                              Number(driverFlatrate2) > 0) &&
                            !errorFlag
                          ? Number(driverFlatrate2) > 0
                            ? ""
                            : "borderGreen"
                          : "borderRed"
                  }
                    `}
                  name="ad1"
                  type="text"
                  maxLength={8}
                  value={isUnitDefaultsPending ? "" : driverFlatrate}
                  disabled={rerouteApiLoading}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    if (e.target.value !== ".") {
                      handleInputValue(e, setDriverFlatrates);
                      dispatch(setDriverFlatrate(numberValidation(e.target.value)));
                    }
                  }}
                  onBlur={handleAmountExceedsPercentage}
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <Form.Group
              className={`mt-2 p-t-50 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
            >
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Send Driver PaperWork</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="Reroute Multi Unit Load"
                  name="Reroute Multi Unit Load"
                  disabled={rerouteSource === "EditMaster"}
                  checked={sendDriverPaperwork}
                  onChange={(e) => {
                    dispatch(setSendDriverPaperwork(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {/*Invoice flatrate modal*/}
        <Modal show={showFlatRateModal} onHide={handleFlatRateCancel} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Warning !!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            <p>
              <p>
                Invoice Amount : {invoiceAmount}, Driver Amount : {driverAmount}{" "}
              </p>
              <p>
                Unit Percentage : {Math.round(unitPercentage * 100)} %, Allowed percentage :{" "}
                {Math.round(allowedInvoicePercentageRedux * 100)} %
              </p>

              <p>{errorMsgFromRedux}</p>
              <p>Do you want to override the allowed percentage ? </p>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleFlatRateOK}>
              YES
            </Button>
            <Button variant="secondary" onClick={handleFlatRateCancel}>
              NO
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Override flatrate modal*/}
        <Modal show={showOverrideModal} onHide={handleOverrideCancel} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Please enter the details for overriding the rate</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            <p>
              <div hidden="true">
                <Form.Group className="margin-box-5  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={` col-form-label ${styles.orderLabel}`}>Name</Form.Label>
                  </Col>
                  <Col sm={6} xs={6} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl  `}
                      id="userName"
                      name="userName"
                      type="text"
                      hidden="true"
                      value={userName}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => setUserName("Mark")}
                    />
                  </Col>
                </Form.Group>
              </div>
              <Form.Group className="margin-box-5  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={` col-form-label ${styles.orderLabel}`}> Code</Form.Label>
                </Col>
                <Col sm={6} xs={6} className="p-0 flex-shrink-0">
                  <input
                    className={`customFormControl  `}
                    id="userCode"
                    name="userCode"
                    type="password"
                    value={userCode}
                    maxLength={20}
                    autoComplete="new-password"
                    aria-autocomplete="list"
                    onInput={(e) => setUserCode(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleOverrideOK}>
              OVERRIDE
            </Button>
            <Button variant="secondary" onClick={handleOverrideCancel}>
              NO
            </Button>
          </Modal.Footer>
        </Modal>
        {/*Override Error modal*/}
        <Modal
          show={showOverrideErrorModal}
          onHide={handleOverrideErrorCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Warning !!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            <p className="mb-0 text-danger">{showOverrideErrorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleOverrideErrorCancel}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default RerouteConfirmationContent;
