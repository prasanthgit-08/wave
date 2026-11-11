/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import { useDispatch, useSelector } from "react-redux";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import {
  setAdditionalAmountsDisableNext,
  setAdditionalAmountsList,
  setPartialTrip,
  setSelectedUnitsListIndex,
  setCurrentDriverList,
  setInvoiceSaveList,
  setBreakdownDelayArray,
  setFeeDelayArray,
  setTotalElements,
  setTotalPages,
  setBreakdownDelayLoading,
} from "../../../../../redux/Invoicing/PaperworkProcessingSlice";
import numberValidation from "../../../../../utils/validation/NumberValidation";
import OrderEntryService from "../../../../../services/OrderEntryService";
import useGroupedElementsClick from "../../../../../hooks/useGroupedElementsClick";
import PaperworkProcessingService from "../../../../../services/Invoicing/PaperworkProcessingService";
import ModalComponent from "../../../../common/ModalComponent";
import LoadingIcon from "../../../../common/LoadingIcon";

const Amounts = () => {
  const dispatch = useDispatch();

  /* Global States */
  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);
  // Pre-invoiced unit that also has a return: the return leg can still carry additional charges,
  // so the invoice charge fields stay editable even for FOD units.
  const isPreInvoicedReturn = Boolean(
    selectedUnit?.preInvoiced && selectedUnit?.delayedUnitReturnFK && selectedUnit?.isReturn
  );
  const driverList = useSelector((state) => state.paperworkProcessing.driverList);
  const multiUnitSeperateInvoice = useSelector((state) => state.paperworkProcessing.multiUnitSeperateInvoice);
  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const selectedUnitsListIndex = useSelector((state) => state.paperworkProcessing.selectedUnitsListIndex);
  const additionalAmountsList = useSelector((state) => state.paperworkProcessing.additionalAmountsList);
  const currentDriverList = useSelector((state) => state.paperworkProcessing.currentDriverList);
  const arrayOfUnitIds = selectedUnitsList?.map((unit) => unit.unitPK);
  const invoiceSaveList = useSelector((state) => state.paperworkProcessing.invoiceSaveList);
  const companyName = useSelector((state) => state.paperworkProcessing.companyName);

  /* Local States */
  const [maximumTolls, setMaximumTolls] = useState(null);
  const [maximumPermits, setMaximumPermits] = useState(null);
  const [maximumWash, setMaximumWash] = useState(null);
  const [driver, setDriver] = useState("");
  const [invoiceTolls, setInvoiceTolls] = useState(0);
  const [invoicePermits, setInvoicePermits] = useState(0);
  const [invoiceWash, setInvoiceWash] = useState(0);
  const [originalInvoiceTolls, setOriginalInvoiceTolls] = useState(0);
  const [originalInvoicePermits, setOriginalInvoicePermits] = useState(0);
  const [originalInvoiceWash, setOriginalInvoiceWash] = useState(0);
  const [driver1Tolls, setDriver1Tolls] = useState(0);
  const [driver1Permits, setDriver1Permits] = useState(0);
  const [driver1Wash, setDriver1Wash] = useState(0);
  const [driver2Tolls, setDriver2Tolls] = useState(0);
  const [driver2Permits, setDriver2Permits] = useState(0);
  const [driver2Wash, setDriver2Wash] = useState(0);
  const [driver3Tolls, setDriver3Tolls] = useState(0);
  const [driver3Permits, setDriver3Permits] = useState(0);
  const [driver3Wash, setDriver3Wash] = useState(0);
  const [invoiceCharge1, setInvoiceCharge1] = useState(0);
  const [originalInvoiceCharge1, setOriginalInvoiceCharge1] = useState(0);
  const [invoiceCharge2, setInvoiceCharge2] = useState(0);
  const [originalInvoiceCharge2, setOriginalInvoiceCharge2] = useState(0);
  const [invoiceCharge3, setInvoiceCharge3] = useState(0);
  const [originalInvoiceCharge3, setOriginalInvoiceCharge3] = useState(0);
  const [driver1Charge1, setDriver1Charge1] = useState(0);
  const [driver1Charge2, setDriver1Charge2] = useState(0);
  const [driver1Charge3, setDriver1Charge3] = useState(0);
  const [driver2Charge1, setDriver2Charge1] = useState(0);
  const [driver2Charge2, setDriver2Charge2] = useState(0);
  const [driver2Charge3, setDriver2Charge3] = useState(0);
  const [driver3Charge1, setDriver3Charge1] = useState(0);
  const [driver3Charge2, setDriver3Charge2] = useState(0);
  const [driver3Charge3, setDriver3Charge3] = useState(0);
  const [charge1Description, setCharge1Description] = useState("");
  const [charge2Description, setCharge2Description] = useState("");
  const [charge3Description, setCharge3Description] = useState("");
  const [driver1Pay1, setDriver1Pay1] = useState(0);
  const [driver1Pay2, setDriver1Pay2] = useState(0);
  const [driver2Pay1, setDriver2Pay1] = useState(0);
  const [driver2Pay2, setDriver2Pay2] = useState(0);
  const [driver3Pay1, setDriver3Pay1] = useState(0);
  const [driver3Pay2, setDriver3Pay2] = useState(0);
  const [pay1Description, setPay1Description] = useState("");
  const [pay2Description, setPay2Description] = useState("");
  const [charge1DescriptionPaymentMode, setCharge1DescriptionPaymentMode] = useState("Pay");
  const [charge2DescriptionPaymentMode, setCharge2DescriptionPaymentMode] = useState("Pay");
  const [charge3DescriptionPaymentMode, setCharge3DescriptionPaymentMode] = useState("Pay");
  const [driver1Pay1PaymentMode, setDriver1Pay1PaymentMode] = useState("Pay");
  const [driver1Pay2PaymentMode, setDriver1Pay2PaymentMode] = useState("Pay");
  const [invoiceTextInputValues, setInvoiceTextInputValues] = useState(Array(3).fill(""));
  const [invoiceTollsActive, setInvoiceTollsActive] = useState(true);
  const [invoicePermitsActive, setInvoicePermitsActive] = useState(true);
  const [invoiceWashActive, setInvoiceWashActive] = useState(true);
  const [driver1TollsActive, setDriver1TollsActive] = useState(true);
  const [driver1PermitsActive, setDriver1PermitsActive] = useState(true);
  const [driver1WashActive, setDriver1WashActive] = useState(true);
  const [isPayReimburseInvisible, setIsPayReimburseInvisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const size = useSelector((state) => state.paperworkProcessing.size);
  const pageNumber = useSelector((state) => state.paperworkProcessing.pageNumber);
  const sortValueFeeTab = useSelector((state) => state.paperworkProcessing.sortValueFeeTab);
  const sortTypeFeeTab = useSelector((state) => state.paperworkProcessing.sortTypeFeeTab);

  const [show4thDriverModal, setShow4thDriverModal] = useState(false);

  /* Handler Functions */

  const handleInputValue = (e, setValue) => {
    let value = e.target.value;
    let indexOfDecimal = value?.indexOf(".");

    if (value?.length === 6 && indexOfDecimal === -1) {
      value = value?.slice(0, 5) + "." + value?.slice(5);
    } else if (indexOfDecimal === 5 && value?.length === 6) {
    } else {
      value = value?.replace(/[^\d\.]/g, "");
    }

    if (e.inputType === "deleteContentBackward" && value[indexOfDecimal - 1] === ".") {
      value = value?.slice(0, indexOfDecimal - 1) + value?.slice(indexOfDecimal);
      e.target.value = value;
      return;
    }

    if (value?.length > 1 && value[0] === "0" && value[1] !== ".") {
      value = value?.replace(/^0+/, "") || "0";
    }

    e.target.value = value;
    setValue(e.target.value);
  };

  const fetchCompanyDetails = () => {
    setLoading(true);
    OrderEntryService.fetchCompanyDetails("Horizon Transport")
      .then((res) => {
        if (res !== null && res?.data !== "") {
          const data = res?.data;
          if (data?.allDriversPayTaxable) setIsPayReimburseInvisible(true);
          else setIsPayReimburseInvisible(false);
        } else setIsPayReimburseInvisible(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setInvoiceAndDriverTolls = (selectedUnit) => {
    // Set Invoice
    if (selectedUnit.invoiceTollsAmount !== null && selectedUnit.invoiceTollsAmount > 0) {
      setInvoiceTolls(selectedUnit?.invoiceTollsAmount);
      setOriginalInvoiceTolls(selectedUnit?.invoiceTollsAmount);
      setInvoiceTollsActive(false);
    } else if (selectedUnit.invoiceTollsAmount !== null && selectedUnit.invoiceTollsAmount < 0) {
      setInvoiceTolls(0);
      setOriginalInvoiceTolls(0);
      setInvoiceTollsActive(false);
    } else {
      setOriginalInvoiceTolls(0);
      setInvoiceTollsActive(true);
    }

    // Set Driver
    if (selectedUnit.driverTollsAmount !== null && selectedUnit.driverTollsAmount > 0) {
      setDriver1Tolls(selectedUnit?.driverTollsAmount);
      setDriver1TollsActive(false);
    } else if (selectedUnit.driverTollsAmount !== null && selectedUnit.driverTollsAmount < 0) {
      setDriver1Tolls(0);
      setDriver1TollsActive(false);
    } else {
      setDriver1TollsActive(true);
    }
  };

  const setInvoiceAndDriverPermits = (selectedUnit) => {
    // Invoice
    if (selectedUnit.invoicePermitsAmount !== null && selectedUnit.invoicePermitsAmount > 0) {
      setInvoicePermits(selectedUnit?.invoicePermitsAmount);
      setOriginalInvoicePermits(selectedUnit?.invoicePermitsAmount);
      setInvoicePermitsActive(false);
    } else if (selectedUnit.invoicePermitsAmount !== null && selectedUnit.invoicePermitsAmount < 0) {
      setInvoicePermits(0);
      setOriginalInvoicePermits(0);
      setInvoicePermitsActive(false);
    } else {
      setOriginalInvoicePermits(0);
      setInvoicePermitsActive(true);
    }

    // Driver
    if (selectedUnit.driverPermitsAmount !== null && selectedUnit.driverPermitsAmount > 0) {
      setDriver1Permits(selectedUnit?.driverPermitsAmount);
      setDriver1PermitsActive(false);
    } else if (selectedUnit.driverPermitsAmount !== null && selectedUnit.driverPermitsAmount < 0) {
      setDriver1Permits(0);
      setDriver1PermitsActive(false);
    } else {
      setDriver1PermitsActive(true);
    }
  };
  const setInvoiceAndDriverWash = (selectedUnit) => {
    // Invoice
    if (selectedUnit.invoiceWashAmount !== null && selectedUnit.invoiceWashAmount > 0) {
      setInvoiceWash(selectedUnit?.invoiceWashAmount);
      setOriginalInvoiceWash(selectedUnit?.invoiceWashAmount);
      setInvoiceWashActive(false);
    } else if (selectedUnit.invoiceWashAmount !== null && selectedUnit.invoiceWashAmount < 0) {
      setInvoiceWash(0);
      setOriginalInvoiceWash(0);
      setInvoiceWashActive(false);
    } else {
      setOriginalInvoiceWash(0);
      setInvoiceWashActive(true);
    }

    // Driver
    if (selectedUnit.driverWashAmount !== null && selectedUnit.driverWashAmount > 0) {
      setDriver1Wash(selectedUnit.driverWashAmount);
      setDriver1WashActive(false);
    } else if (selectedUnit.driverWashAmount !== null && selectedUnit.driverWashAmount < 0) {
      setDriver1Wash(0);
      setDriver1WashActive(false);
    } else {
      setDriver1WashActive(true);
    }
  };

  const handleDriverClick = (index) => {
    if (driverList?.length > index) {
      const unitPK = driverList[index]?.unitPK;
      const driverUnit = selectedUnitsList?.find((unit) => unit?.unitPK === unitPK);
      if (driverUnit) {
        const fullName = `${driverUnit.firstName?.trim() || ""} ${driverUnit.lastName?.trim() || ""}`?.trim();
        setDriver(fullName);
      }
    }
  };

  useGroupedElementsClick("driver1Input", () => handleDriverClick(0));
  useGroupedElementsClick("driver2Input", () => handleDriverClick(1));
  useGroupedElementsClick("driver3Input", () => handleDriverClick(2));

  useEffect(() => {
    dispatch(setSelectedUnitsListIndex(0));
  }, []);

  // For data clearing bugfix
  useEffect(() => {
    return () => {
      dispatch(setSelectedUnitsListIndex(0));
    };
  }, []);

  /**
   * For disabling tolls-permits for the second unit of the same driver
   */
  useEffect(() => {
    const currentDriverFK = selectedUnitsList[selectedUnitsListIndex]?.driverFK;
    const isDuplicateDriver = currentDriverList?.find((driverFK) => driverFK === currentDriverFK);

    if (!isDuplicateDriver) {
      dispatch(
        setInvoiceSaveList({
          type: "update",
          payload: {
            index: selectedUnitsListIndex,
            element: {
              isFirstUnitForDriver: true,
            },
          },
        })
      );
      dispatch(setCurrentDriverList(currentDriverFK));
    }
  }, [selectedUnitsListIndex]);
  // For clearing the tolls-permits disable feature when leaving page
  useEffect(() => {
    return () => {
      dispatch(setCurrentDriverList());
    };
  }, []);

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  // Populate local states from additionalAmountsList / persist data
  useEffect(() => {
    if (
      additionalAmountsList?.length > 0 /* && 
      (additionalAmountsList[selectedUnitsListIndex]?.unitId === selectedUnit.unitPK) */
    ) {
      setInvoiceTolls(additionalAmountsList[selectedUnitsListIndex]?.invoiceTollsAmount);
      setInvoicePermits(additionalAmountsList[selectedUnitsListIndex]?.invoicePermitsAmount);
      setInvoiceWash(additionalAmountsList[selectedUnitsListIndex]?.invoiceWashAmount);

      setInvoiceCharge1(additionalAmountsList[selectedUnitsListIndex]?.invoiceCharge1);
      setInvoiceCharge2(additionalAmountsList[selectedUnitsListIndex]?.invoiceCharge2);
      setInvoiceCharge3(additionalAmountsList[selectedUnitsListIndex]?.invoiceCharge3);

      setCharge1Description(additionalAmountsList[selectedUnitsListIndex]?.charge1Description);
      setCharge2Description(additionalAmountsList[selectedUnitsListIndex]?.charge2Description);
      setCharge3Description(additionalAmountsList[selectedUnitsListIndex]?.charge3Description);

      const driverName = `${selectedUnitsList[selectedUnitsListIndex].firstName?.trim()} ${
        selectedUnitsList[selectedUnitsListIndex].lastName?.trim() || ""
      }`;
      setDriver(driverName);

      // Setting values for driver 1
      setDriver1Tolls(additionalAmountsList[selectedUnitsListIndex]?.driverList[0]?.tolls);
      setDriver1Permits(additionalAmountsList[selectedUnitsListIndex]?.driverList[0]?.permits);
      setDriver1Wash(additionalAmountsList[selectedUnitsListIndex]?.driverList[0]?.wash);
      setDriver1Charge1(
        selectedUnit?.dealerShuttle
          ? Number(0)
          : additionalAmountsList[selectedUnitsListIndex]?.driverList[0]?.charge1
      );
      setDriver1Charge2(
        selectedUnit?.dealerShuttle
          ? Number(0)
          : additionalAmountsList[selectedUnitsListIndex]?.driverList[0]?.charge2
      );
      setDriver1Charge3(
        selectedUnit?.dealerShuttle
          ? Number(0)
          : additionalAmountsList[selectedUnitsListIndex]?.driverList[0]?.charge3
      );
      setDriver1Pay1(additionalAmountsList[selectedUnitsListIndex]?.driverList[0]?.pay1);
      setDriver1Pay2(additionalAmountsList[selectedUnitsListIndex]?.driverList[0]?.pay2);

      // Setting values for driver 2
      if (!multiUnitSeperateInvoice && driverList?.length > 1) {
        setDriver2Tolls(additionalAmountsList[selectedUnitsListIndex]?.driverList[1]?.tolls);
        setDriver2Permits(additionalAmountsList[selectedUnitsListIndex]?.driverList[1]?.permits);
        setDriver2Wash(additionalAmountsList[selectedUnitsListIndex]?.driverList[1]?.wash);
        setDriver2Charge1(additionalAmountsList[selectedUnitsListIndex]?.driverList[1]?.charge1);
        setDriver2Charge2(additionalAmountsList[selectedUnitsListIndex]?.driverList[1]?.charge2);
        setDriver2Charge3(additionalAmountsList[selectedUnitsListIndex]?.driverList[1]?.charge3);
        setDriver2Pay1(additionalAmountsList[selectedUnitsListIndex]?.driverList[1]?.pay1);
        setDriver2Pay2(additionalAmountsList[selectedUnitsListIndex]?.driverList[1]?.pay2);
      }

      // Setting values for driver 3
      if (!multiUnitSeperateInvoice && driverList?.length > 2) {
        setDriver3Tolls(additionalAmountsList[selectedUnitsListIndex]?.driverList[2]?.tolls);
        setDriver3Permits(additionalAmountsList[selectedUnitsListIndex]?.driverList[2]?.permits);
        setDriver3Wash(additionalAmountsList[selectedUnitsListIndex]?.driverList[2]?.wash);
        setDriver3Charge1(additionalAmountsList[selectedUnitsListIndex]?.driverList[2]?.charge1);
        setDriver3Charge2(additionalAmountsList[selectedUnitsListIndex]?.driverList[2]?.charge2);
        setDriver3Charge3(additionalAmountsList[selectedUnitsListIndex]?.driverList[2]?.charge3);
        setDriver3Pay1(additionalAmountsList[selectedUnitsListIndex]?.driverList[2]?.pay1);
        setDriver3Pay2(additionalAmountsList[selectedUnitsListIndex]?.driverList[2]?.pay2);
      }

      setPay1Description(additionalAmountsList[selectedUnitsListIndex]?.pay1Description);
      setPay2Description(additionalAmountsList[selectedUnitsListIndex]?.pay2Description);
      setCharge1DescriptionPaymentMode(
        additionalAmountsList[selectedUnitsListIndex]?.charge1DescriptionPaymentMode
      );
      setCharge2DescriptionPaymentMode(
        additionalAmountsList[selectedUnitsListIndex]?.charge2DescriptionPaymentMode
      );
      setCharge3DescriptionPaymentMode(
        additionalAmountsList[selectedUnitsListIndex]?.charge3DescriptionPaymentMode
      );
      setDriver1Pay1PaymentMode(additionalAmountsList[selectedUnitsListIndex]?.driver1Pay1PaymentMode);
      setDriver1Pay2PaymentMode(additionalAmountsList[selectedUnitsListIndex]?.driver1Pay2PaymentMode);

      if (
        additionalAmountsList[selectedUnitsListIndex]?.invoiceText[0] === "" &&
        additionalAmountsList[selectedUnitsListIndex]?.invoiceText[1] === "" &&
        additionalAmountsList[selectedUnitsListIndex]?.invoiceText[2] === ""
      ) {
        setInvoiceTextInputValues(Array(3).fill(""));
      } else {
        const invoiceText = [
          additionalAmountsList[selectedUnitsListIndex]?.invoiceText[0],
          additionalAmountsList[selectedUnitsListIndex]?.invoiceText[1],
          additionalAmountsList[selectedUnitsListIndex]?.invoiceText[2],
        ];
        setInvoiceTextInputValues(invoiceText);
      }
    }
  }, [selectedUnitsListIndex]);

  /**
   * For Setting default values
   */
  useEffect(() => {
    const setRowCharges = (description, invoiceAmount, driverAmount, rowNumber) => {
      switch (rowNumber) {
        case 1:
          setCharge1Description(description);
          setInvoiceCharge1(invoiceAmount);
          setOriginalInvoiceCharge1(invoiceAmount);
          setDriver1Charge1(selectedUnit?.dealerShuttle ? Number(0) : driverAmount);
          break;
        case 2:
          setCharge2Description(description);
          setInvoiceCharge2(invoiceAmount);
          setOriginalInvoiceCharge2(invoiceAmount);
          setDriver1Charge2(selectedUnit?.dealerShuttle ? Number(0) : driverAmount);
          break;
        case 3:
          setCharge3Description(description);
          setInvoiceCharge3(invoiceAmount);
          setOriginalInvoiceCharge3(invoiceAmount);
          setDriver1Charge3(selectedUnit?.dealerShuttle ? Number(0) : driverAmount);
          break;
        default:
          break;
      }
    };

    const setAdditionalCharges = (currentUnit) => {
      const hasDeliveryBonus = currentUnit?.deliveryBonus;
      const hasAdditionalFlatRate = currentUnit?.additionalFlatRate;

      const defaultedChargeFields = additionalAmountsList[selectedUnitsListIndex]?.defaultedChargeFields;

      const deliveryBonusDescription = currentUnit?.deliveryBonusDescription;
      const deliveryBonusInvoiceAmount = currentUnit?.invoiceDeliveryBonus;
      const deliveryBonusDriverAmount = currentUnit?.driverDeliveryBonus;

      const additionalFlatRateDescription = currentUnit?.additionalFlatRateDescription;
      const additionalFlatRateInvoiceAmount = currentUnit?.invoiceAdditionalFlatRate;
      const additionalFlatRateDriverAmount = currentUnit?.additionalFlatRate;

      if (!defaultedChargeFields) {
        let rowNumber = 1;

        if (hasDeliveryBonus) {
          if (Number(deliveryBonusInvoiceAmount) > 0) {
            setRowCharges(
              deliveryBonusDescription,
              deliveryBonusInvoiceAmount,
              deliveryBonusDriverAmount,
              rowNumber
            );
            rowNumber++;
          } else if (Number(deliveryBonusDriverAmount) > 0) {
            // if only driver amount is present, set value to pay fields
            driver1Pay1
              ? setDriver1Pay2(deliveryBonusDriverAmount)
              : setDriver1Pay1(deliveryBonusDriverAmount);
            pay1Description
              ? setPay2Description(deliveryBonusDescription)
              : setPay1Description(deliveryBonusDescription);
          }
        }

        if (hasAdditionalFlatRate) {
          setRowCharges(
            additionalFlatRateDescription,
            additionalFlatRateInvoiceAmount,
            additionalFlatRateDriverAmount,
            rowNumber
          );
          rowNumber++;
        }
      }

      dispatch(
        setAdditionalAmountsList({
          type: "update",
          payload: {
            index: selectedUnitsListIndex,
            element: {
              defaultedChargeFields: true,
            },
          },
        })
      );
    };

    if (selectedUnitsList?.length > 0 && selectedUnitsList[selectedUnitsListIndex]) {
      dispatch(setPartialTrip(selectedUnitsList[selectedUnitsListIndex]?.partialTrip || false));
      setMaximumTolls(selectedUnitsList[selectedUnitsListIndex]?.maximumTolls);
      setMaximumPermits(selectedUnitsList[selectedUnitsListIndex]?.maximumPermits);
      setMaximumWash(selectedUnitsList[selectedUnitsListIndex]?.maximumWash);
      setDriver(
        selectedUnitsList[selectedUnitsListIndex]?.firstName?.trim() +
          " " +
          (selectedUnitsList[selectedUnitsListIndex]?.lastName?.trim() || "")
      );

      /**
       * Set default to Tolls, Permits, Wash fields If Single Unit
       * Single Unit Check  */
      if (!selectedUnitsList[selectedUnitsListIndex]?.multiUnit) {
        // Plant to Dealer
        if (
          selectedUnitsList[selectedUnitsListIndex]?.pickupAtPlant &&
          selectedUnitsList[selectedUnitsListIndex]?.pickupCustomerPlantFK !== null &&
          !selectedUnitsList[selectedUnitsListIndex]?.deliverToPlant &&
          selectedUnitsList[selectedUnitsListIndex]?.deliveryDealerFK !== null
        ) {
          setInvoiceAndDriverTolls(selectedUnitsList[selectedUnitsListIndex]);
          setInvoiceAndDriverPermits(selectedUnitsList[selectedUnitsListIndex]);
          setInvoiceAndDriverWash(selectedUnitsList[selectedUnitsListIndex]);

          // Dealer To Plant
        } else if (
          selectedUnitsList[selectedUnitsListIndex]?.deliverToPlant &&
          selectedUnitsList[selectedUnitsListIndex]?.deliveryCustomerPlantFK !== null &&
          !selectedUnitsList[selectedUnitsListIndex]?.pickupAtPlant &&
          selectedUnitsList[selectedUnitsListIndex]?.pickupDealerFK !== null
        ) {
          // Set default to Tolls, Permits fields
          setInvoiceAndDriverTolls(selectedUnitsList[selectedUnitsListIndex]);
          setInvoiceAndDriverPermits(selectedUnitsList[selectedUnitsListIndex]);
        }
      }
      setAdditionalCharges(selectedUnitsList[selectedUnitsListIndex]);
    }
  }, [selectedUnitsListIndex]);

  useEffect(() => {
    const getBreakdownDelayDetails = (arrayOfUnitIds, companyName) => {
      if (arrayOfUnitIds) {
        dispatch(setBreakdownDelayLoading(true));
        PaperworkProcessingService.getBreakdownDelayDetails(arrayOfUnitIds, companyName)
          .then((response) => {
            const data = response?.data;
            dispatch(setBreakdownDelayArray(data));
          })
          .catch((error) => {})
          .finally(() => dispatch(setBreakdownDelayLoading(false)));
      }
    };

    getBreakdownDelayDetails(arrayOfUnitIds, companyName);
  }, []);

  const getFeeDelayDetails = (arrayOfUnitIds) => {
    if (arrayOfUnitIds) {
      PaperworkProcessingService.getFeesDetailsForExpense(
        arrayOfUnitIds,
        size,
        pageNumber,
        sortValueFeeTab,
        sortTypeFeeTab,
        null,
        companyName
      )

        .then((response) => {
          const data = response?.data;
          setLoader(false);
          dispatch(setFeeDelayArray(data?.content || []));
          dispatch(setTotalElements(data?.totalElements));
          dispatch(setTotalPages(data?.totalPages));
        })
        .catch((error) => {
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    getFeeDelayDetails(arrayOfUnitIds);
  }, []);

  // Update the current element of additionalAmountsList
  useEffect(() => {
    dispatch(
      setAdditionalAmountsList({
        type: "update",
        payload: {
          index: selectedUnitsListIndex,
          element: {
            arrayOfUnitIds: arrayOfUnitIds,
            invoiceTollsAmount: invoiceTolls,
            originalInvoiceTolls: originalInvoiceTolls,
            invoicePermitsAmount: invoicePermits,
            originalInvoicePermits: originalInvoicePermits,
            invoiceWashAmount: invoiceWash,
            originalInvoiceWash: originalInvoiceWash,
            invoiceCharge1: invoiceCharge1,
            originalInvoiceCharge1: originalInvoiceCharge1,
            invoiceCharge2: invoiceCharge2,
            originalInvoiceCharge2: originalInvoiceCharge2,
            invoiceCharge3: invoiceCharge3,
            originalInvoiceCharge3: originalInvoiceCharge3,
            charge1Description: charge1Description,
            charge2Description: charge2Description,
            charge3Description: charge3Description,
            pay1Description: pay1Description,
            pay2Description: pay2Description,
            invoiceText: invoiceTextInputValues,
            charge1DescriptionPaymentMode: charge1DescriptionPaymentMode,
            charge2DescriptionPaymentMode: charge2DescriptionPaymentMode,
            charge3DescriptionPaymentMode: charge3DescriptionPaymentMode,
            driver1Pay1PaymentMode: driver1Pay1PaymentMode,
            driver1Pay2PaymentMode: driver1Pay2PaymentMode,
            dispatchPK: selectedUnit?.dispatchPK,
          },
        },
      })
    );
  }, [
    selectedUnit?.unitPK,
    selectedUnit?.dispatchPK,
    invoiceTolls,
    invoicePermits,
    invoiceWash,
    invoiceCharge1,
    invoiceCharge2,
    invoiceCharge3,
    charge1Description,
    charge2Description,
    charge3Description,
    pay1Description,
    pay2Description,
    invoiceTextInputValues,
    charge1DescriptionPaymentMode,
    charge2DescriptionPaymentMode,
    charge3DescriptionPaymentMode,
    driver1Pay1PaymentMode,
    driver1Pay2PaymentMode,
    originalInvoiceTolls,
    originalInvoicePermits,
    originalInvoiceWash,
    originalInvoiceCharge1,
    originalInvoiceCharge2,
    originalInvoiceCharge3,
  ]);

  // Update invoiceSaveList with Invoice Text fields
  useEffect(() => {
    dispatch(
      setInvoiceSaveList({
        type: "update",
        payload: {
          index: selectedUnitsListIndex,
          element: {
            invoiceTexts: invoiceTextInputValues,
          },
        },
      })
    );
  }, [invoiceTextInputValues]);

  // Update additionalAmountsList with driver 1 object
  useEffect(() => {
    dispatch(
      setAdditionalAmountsList({
        key: "driver1",
        payload: {
          index: selectedUnitsListIndex,
          element: {
            tolls: driver1Tolls,
            permits: driver1Permits,
            wash: driver1Wash,
            charge1: driver1Charge1,
            charge2: driver1Charge2,
            charge3: driver1Charge3,
            pay1: driver1Pay1,
            pay2: driver1Pay2,
          },
        },
      })
    );
  }, [
    driver1Tolls,
    driver1Permits,
    driver1Wash,
    driver1Charge1,
    driver1Charge2,
    driver1Charge3,
    driver1Pay1,
    driver1Pay2,
  ]);

  // Update additionalAmountsList with driver 2 object
  useEffect(() => {
    if (!multiUnitSeperateInvoice && driverList?.length > 1) {
      dispatch(
        setAdditionalAmountsList({
          key: "driver2",
          payload: {
            index: selectedUnitsListIndex,
            element: {
              tolls: driver2Tolls,
              permits: driver2Permits,
              wash: driver2Wash,
              charge1: driver2Charge1,
              charge2: driver2Charge2,
              charge3: driver2Charge3,
              pay1: driver2Pay1,
              pay2: driver2Pay2,
            },
          },
        })
      );
    }
  }, [
    driver2Tolls,
    driver2Permits,
    driver2Wash,
    driver2Charge1,
    driver2Charge2,
    driver2Charge3,
    driver2Pay1,
    driver2Pay2,
  ]);

  // Update additionalAmountsList with driver 3 object
  useEffect(() => {
    if (!multiUnitSeperateInvoice && driverList?.length > 2) {
      dispatch(
        setAdditionalAmountsList({
          key: "driver3",
          payload: {
            index: selectedUnitsListIndex,
            element: {
              tolls: driver3Tolls,
              permits: driver3Permits,
              wash: driver3Wash,
              charge1: driver3Charge1,
              charge2: driver3Charge2,
              charge3: driver3Charge3,
              pay1: driver3Pay1,
              pay2: driver3Pay2,
            },
          },
        })
      );
    }
  }, [
    driver3Tolls,
    driver3Permits,
    driver3Wash,
    driver3Charge1,
    driver3Charge2,
    driver3Charge3,
    driver3Pay1,
    driver3Pay2,
  ]);

  // Show 4th Driver Modal if more than 3 drivers are present
  useEffect(() => {
    if (driverList?.length > 3) {
      setShow4thDriverModal(true);
    }
  }, [driverList]);

  // Additional Amounts Next Validation
  useEffect(() => {
    if (
      ((invoiceCharge1 || driver1Charge1) &&
        !charge1Description &&
        !(Number(invoiceCharge1) === 0 && Number(driver1Charge1) === 0)) ||
      ((invoiceCharge2 || driver1Charge2) &&
        !charge2Description &&
        !(Number(invoiceCharge2) === 0 && Number(driver1Charge2) === 0)) ||
      ((invoiceCharge3 || driver1Charge3) &&
        !charge3Description &&
        !(Number(invoiceCharge3) === 0 && Number(driver1Charge3) === 0)) ||
      (driver1Pay1 && !pay1Description && !(Number(driver1Pay1) === 0)) ||
      (driver1Pay2 && !pay2Description && !(Number(driver1Pay2) === 0))
    ) {
      dispatch(setAdditionalAmountsDisableNext(true));
    } else {
      dispatch(setAdditionalAmountsDisableNext(false));
    }
  }, [
    invoiceCharge1,
    driver1Charge1,
    charge1Description,
    invoiceCharge2,
    driver1Charge2,
    charge2Description,
    invoiceCharge3,
    driver1Charge3,
    charge3Description,
    driver1Pay1,
    pay1Description,
    driver1Pay2,
    pay2Description,
  ]);

  const renderUnitListing = () =>
    selectedUnitsList?.map((unit) => (
      <tr key={unit?.tempId} onClick={() => {}}>
        <td className="f-w-600"> {unit?.unitNumber} </td>
        <td className="f-w-600"> {unit?.name} </td>
        <td className="f-w-600"> {unit?.customerPlantName} </td>
      </tr>
    ));

  return (
    <div className="p-2 w-100">
      <ModalComponent
        show={show4thDriverModal}
        onHide={() => setShow4thDriverModal(false)}
        title={"Additional Driver Warning"}
        body={`There are more than 3 drivers. For 4th driver onwards additional charges must be done manually`}
        showOK
      />
      <Row className="mx-0 p-0 mt-2">
        {loading && <LoadingIcon />}

        {/* Render Unit Listing or Unit Fields conditionally */}
        <div className="position-relative">
          {/* Table Listing */}
          {!multiUnitSeperateInvoice && selectedUnit?.multiUnit && (
            <div
              className={`border border-secondary fixTableHead position-absolute top-0 start-0`}
              style={{ overflowY: "auto", height: "180px", width: "380px" }}
            >
              <table className="table border-bottom table-striped f-w-600">
                <thead>
                  <tr>
                    <th className="col-3">Unit Number</th>
                    <th className="col-5">Customer</th>
                    <th className="col-4">Plant</th>
                  </tr>
                </thead>
                <tbody>{renderUnitListing()}</tbody>
              </table>
            </div>
          )}
          {/* Unit Fields */}
          {(multiUnitSeperateInvoice || !selectedUnit?.multiUnit) && (
            <div className="position-absolute top-0 start-0" style={{ width: "380px" }}>
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} className="p-0 me-2 text-end">
                  <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                </Col>
                <Col className="">
                  <input
                    name="unitNumber"
                    id="unitNumber"
                    type="text"
                    className={`customFormControl`}
                    value={selectedUnitsList[selectedUnitsListIndex]?.unitNumber}
                    disabled
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} className="p-0 me-2 text-end">
                  <Form.Label className="customColFormLabel">Customer</Form.Label>
                </Col>
                <Col className="">
                  <input
                    name="unitCustomer"
                    id="unitCustomer"
                    type="text"
                    className={`customFormControl`}
                    disabled
                    value={selectedUnitsList[selectedUnitsListIndex]?.name}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`form-group align-items-center row m-l-0 m-r-0 mb-3 ${
                  selectedUnitsList[selectedUnitsListIndex]?.customerPlantName ? "" : "hide-elements"
                }`}
              >
                <Col xs={3} className="p-0 me-2 text-end">
                  <Form.Label className="customColFormLabel">Plant</Form.Label>
                </Col>
                <Col className="">
                  <input
                    name="unitPlant"
                    id="unitPlant"
                    type="text"
                    className={`customFormControl`}
                    disabled
                    value={selectedUnitsList[selectedUnitsListIndex]?.customerPlantName}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
            </div>
          )}
        </div>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
          <Col xs={1} className="p-0 me-5 amountsScreenCustomerWidthFix" />
          <div className="d-flex flex-shrink-0 w-100px ps-3">
            <Form.Label className="customColFormLabel">Customer</Form.Label>
          </div>
          {/* <div className="d-flex flex-shrink-0 col-2"> */}
          <div className={`d-flex flex-shrink-0 col-2 ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}>
            <input
              name="customer"
              id="customer"
              type="text"
              value={driver}
              disabled={true}
              maxLength={30}
              className={`customFormControl`}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
          <Col xs={1} className="p-0 me-5 amountsScreenWidthFix" />
          <Col xs={1} className="w-120px text-end">
            <Form.Label
              className={`customColFormLabel ${!maximumTolls || maximumTolls === 0 ? "hide-elements" : ""}`}
            >
              Maximum Tolls
            </Form.Label>
          </Col>

          <Col
            xs={1}
            className={`d-flex flex-shrink-0 ${!maximumTolls || maximumTolls === 0 ? "hide-elements" : ""}`}
          >
            <div className="w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                value={maximumTolls}
                className={`customFormControl w-100`}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Col>

          <Col xs={1} className="w-60px text-end">
            <Form.Label className="customColFormLabel">Tolls</Form.Label>
          </Col>
          <div className="d-flex flex-shrink-0 w-100px">
            <input
              name="invoiceTolls"
              id="invoiceTolls"
              type="text"
              className={`customFormControl`}
              value={invoiceTolls}
              onChange={(e) => {
                handleInputValue(e, setInvoiceTolls);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                  setInvoiceTolls(numberValidation(e.target.value));
              }}
              onBlur={(e) => {
                if (!invoiceTolls) {
                  setInvoiceTolls(numberValidation(0));
                }

                if (!driver1Tolls && e.target.value && driverList?.length === 1) {
                  setDriver1Tolls(numberValidation(e.target.value));
                }
              }}
              disabled={
                !invoiceTollsActive ||
                selectedUnit?.fodInvoice ||
                (multiUnitSeperateInvoice && selectedUnitsListIndex !== 0) ||
                (selectedUnit?.preInvoiced && !(selectedUnit?.delayedUnitReturnFK && selectedUnit?.isReturn))
              }
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver1Tolls"
              id="driver1Tolls"
              type="text"
              className={`customFormControl driver1Input`}
              value={driver1Tolls}
              onChange={(e) => {
                handleInputValue(e, setDriver1Tolls);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver1Tolls(e.target.value);
              }}
              onBlur={(e) => {
                if (!driver1Tolls) {
                  setDriver1Tolls(numberValidation(0));
                }
              }}
              disabled={!driver1TollsActive || !invoiceSaveList[selectedUnitsListIndex]?.isFirstUnitForDriver}
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver2Tolls"
              id="driver2Tolls"
              type="text"
              className={`customFormControl driver2Input`}
              value={driver2Tolls}
              onChange={(e) => {
                handleInputValue(e, setDriver2Tolls);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver2Tolls(e.target.value);
              }}
              hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver3Tolls"
              id="driver3Tolls"
              type="text"
              className={`customFormControl driver3Input`}
              value={driver3Tolls}
              onChange={(e) => {
                handleInputValue(e, setDriver3Tolls);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver3Tolls(e.target.value);
              }}
              hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
          <Col xs={1} className="p-0 me-5 amountsScreenWidthFix" />
          <Col xs={1} className="w-120px text-end">
            <Form.Label
              className={`customColFormLabel ${!maximumPermits || maximumPermits === 0 ? "hide-elements" : ""}`}
            >
              Maximum Permits
            </Form.Label>
          </Col>
          <Col
            xs={1}
            className={`d-flex flex-shrink-0 ${!maximumPermits || maximumPermits === 0 ? "hide-elements" : ""}`}
          >
            <div className="w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                className={`customFormControl w-100`}
                value={maximumPermits}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Col>

          <Col xs={1} className="w-60px text-end">
            <Form.Label className="customColFormLabel">Permits</Form.Label>
          </Col>
          <div className="d-flex flex-shrink-0 w-100px">
            <input
              name="invoicePermits"
              id="invoicePermits"
              type="text"
              className={`customFormControl`}
              value={invoicePermits}
              onChange={(e) => {
                handleInputValue(e, setInvoicePermits);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setInvoicePermits(e.target.value);
              }}
              onBlur={(e) => {
                if (!invoicePermits) {
                  setInvoicePermits(numberValidation(0));
                }

                if (!driver1Permits && e.target.value && driverList?.length === 1) {
                  setDriver1Permits(numberValidation(e.target.value));
                }
              }}
              disabled={
                !invoicePermitsActive ||
                selectedUnit?.fodInvoice ||
                (multiUnitSeperateInvoice && selectedUnitsListIndex !== 0) ||
                (selectedUnit?.preInvoiced && !(selectedUnit?.delayedUnitReturnFK && selectedUnit?.isReturn))
              }
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver1Permits"
              id="driver1Permits"
              type="text"
              className={`customFormControl driver1Input`}
              value={driver1Permits}
              onChange={(e) => {
                handleInputValue(e, setDriver1Permits);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver1Permits(e.target.value);
              }}
              onBlur={(e) => {
                if (!driver1Permits) {
                  setDriver1Permits(numberValidation(0));
                }
              }}
              disabled={
                !driver1PermitsActive || !invoiceSaveList[selectedUnitsListIndex]?.isFirstUnitForDriver
              }
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver2Permits"
              id="driver2Permits"
              type="text"
              className={`customFormControl driver2Input`}
              value={driver2Permits}
              onChange={(e) => {
                handleInputValue(e, setDriver2Permits);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver2Permits(e.target.value);
              }}
              hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver3Permits"
              id="driver3Permits"
              type="text"
              className={`customFormControl driver3Input`}
              value={driver3Permits}
              onChange={(e) => {
                handleInputValue(e, setDriver3Permits);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver3Permits(e.target.value);
              }}
              hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
          <Col xs={1} className="p-0 me-5 amountsScreenWidthFix" />
          <Col xs={1} className="w-120px text-end">
            <Form.Label
              className={`customColFormLabel ${!maximumWash || maximumWash === 0 ? "hide-elements" : ""}`}
            >
              Maximum Wash
            </Form.Label>
          </Col>
          <Col
            xs={1}
            className={`d-flex flex-shrink-0 ${!maximumWash || maximumWash === 0 ? "hide-elements" : ""}`}
          >
            <div className="w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                value={maximumWash}
                className={`customFormControl w-100`}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Col>

          <Col xs={1} className="w-60px text-end">
            <Form.Label className="customColFormLabel">Wash</Form.Label>
          </Col>
          <div className="d-flex flex-shrink-0 w-100px">
            <input
              name="invoiceWash"
              id="invoiceWash"
              type="text"
              className={`customFormControl`}
              value={invoiceWash}
              onChange={(e) => {
                handleInputValue(e, setInvoiceWash);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setInvoiceWash(e.target.value);
              }}
              onBlur={(e) => {
                if (!invoiceWash) {
                  setInvoiceWash(numberValidation(0));
                }

                if (!driver1Wash && e.target.value && driverList?.length === 1) {
                  setDriver1Wash(numberValidation(e.target.value));
                }
              }}
              disabled={
                !invoiceWashActive ||
                selectedUnit?.fodInvoice ||
                (selectedUnit?.preInvoiced && !(selectedUnit?.delayedUnitReturnFK && selectedUnit?.isReturn))
              }
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver1Wash"
              id="driver1Wash"
              type="text"
              className={`customFormControl driver1Input`}
              value={driver1Wash}
              onChange={(e) => {
                handleInputValue(e, setDriver1Wash);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver1Wash(e.target.value);
              }}
              onBlur={(e) => {
                if (!driver1Wash) {
                  setDriver1Wash(numberValidation(0));
                }
              }}
              disabled={!driver1WashActive}
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver2Wash"
              id="driver2Wash"
              type="text"
              className={`customFormControl driver2Input`}
              value={driver2Wash}
              onChange={(e) => {
                handleInputValue(e, setDriver2Wash);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver2Wash(e.target.value);
              }}
              hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver3Wash"
              id="driver3Wash"
              type="text"
              className={`customFormControl driver3Input`}
              value={driver3Wash}
              onChange={(e) => {
                handleInputValue(e, setDriver3Wash);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver3Wash(e.target.value);
              }}
              hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
        </Form.Group>
      </Row>

      <Row className="mx-0 p-0 mt-5">
        <Form.Group
          className={`form-group align-items-center row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
        >
          <Col xs={1} className="p-0 me-5 w-150px" />
          <Col xs={1} className="p-0 mx-4 w-110px text-end">
            <Form.Label className="customColFormLabel">Additional Charge #1</Form.Label>
          </Col>
          <Col xs={3} className="">
            <input
              name="additionalCharge#1"
              id="additionalCharge#1"
              type="text"
              className={`customFormControl ${
                (invoiceCharge1 || driver1Charge1) && !charge1Description
                  ? Number(invoiceCharge1) === 0 && Number(driver1Charge1) === 0
                    ? ""
                    : "borderRed"
                  : ""
              }`}
              value={charge1Description}
              onChange={(e) => setCharge1Description(e.target.value)}
              maxLength={60}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </Col>
          <div className="d-flex flex-shrink-0 w-100px">
            <input
              name="invoiceCharge1"
              id="invoiceCharge1"
              type="text"
              className={`customFormControl`}
              value={invoiceCharge1}
              onChange={(e) => {
                handleInputValue(e, setInvoiceCharge1);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setInvoiceCharge1(e.target.value);
              }}
              onBlur={(e) => {
                if (!invoiceCharge1) {
                  setInvoiceCharge1(numberValidation(0));
                }

                if (!driver1Charge1 && e.target.value && driverList?.length === 1) {
                  setDriver1Charge1(
                    selectedUnit?.dealerShuttle ? Number(0) : numberValidation(e.target.value)
                  );
                }
              }}
              disabled={
                (selectedUnit?.fodInvoice && !isPreInvoicedReturn) ||
                (selectedUnit?.preInvoiced && !isPreInvoicedReturn)
              }
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver1Charge1"
              id="driver1Charge1"
              type="text"
              className={`customFormControl driver1Input`}
              value={driver1Charge1}
              onChange={(e) => {
                handleInputValue(e, setDriver1Charge1);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver1Charge1(e.target.value);
              }}
              onBlur={(e) => {
                if (!driver1Charge1) {
                  setDriver1Charge1(numberValidation(0));
                }
              }}
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver2Charge1"
              id="driver2Charge1"
              type="text"
              className={`customFormControl driver2Input`}
              value={driver2Charge1}
              onChange={(e) => {
                handleInputValue(e, setDriver2Charge1);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver2Charge1(e.target.value);
              }}
              hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver3Charge1"
              id="driver3Charge1"
              type="text"
              className={`customFormControl driver3Input`}
              value={driver3Charge1}
              onChange={(e) => {
                handleInputValue(e, setDriver3Charge1);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver3Charge1(e.target.value);
              }}
              hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <Col xs={1} className={`${isPayReimburseInvisible ? "hide-elements" : ""}`}>
            <CustomRadioGroup
              horizontal
              name="charge1DescriptionPaymentMode"
              options={["Pay", "Reimburse"]}
              selectedOption={charge1DescriptionPaymentMode}
              onChange={(value) => setCharge1DescriptionPaymentMode(value)}
            />
          </Col>
        </Form.Group>

        <Form.Group
          className={`form-group align-items-center row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
        >
          <Col xs={1} className="p-0 me-5 w-150px" />
          <Col xs={1} className="p-0 mx-4 w-110px text-end">
            <Form.Label className="customColFormLabel">Additional Charge #2</Form.Label>
          </Col>
          <Col xs={3} className="">
            <input
              name="additionalCharge#1"
              id="additionalCharge#1"
              type="text"
              className={`customFormControl ${
                (invoiceCharge2 || driver1Charge2) && !charge2Description
                  ? Number(invoiceCharge2) === 0 && Number(driver1Charge2) === 0
                    ? ""
                    : "borderRed"
                  : ""
              }`}
              value={charge2Description}
              onChange={(e) => setCharge2Description(e.target.value)}
              maxLength={60}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </Col>
          <div className="d-flex flex-shrink-0 w-100px">
            <input
              name="invoiceCharge2"
              id="invoiceCharge2"
              type="text"
              className={`customFormControl`}
              value={invoiceCharge2}
              onChange={(e) => {
                handleInputValue(e, setInvoiceCharge2);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setInvoiceCharge2(e.target.value);
              }}
              onBlur={(e) => {
                if (!invoiceCharge2) {
                  setInvoiceCharge2(numberValidation(0));
                }

                if (!driver1Charge2 && e.target.value && driverList?.length === 1) {
                  setDriver1Charge2(
                    selectedUnit?.dealerShuttle ? Number(0) : numberValidation(e.target.value)
                  );
                }
              }}
              disabled={
                (selectedUnit?.fodInvoice && !isPreInvoicedReturn) ||
                (selectedUnit?.preInvoiced && !isPreInvoicedReturn)
              }
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver1Charge2"
              id="driver1Charge2"
              type="text"
              className={`customFormControl driver1Input`}
              value={driver1Charge2}
              onChange={(e) => {
                handleInputValue(e, setDriver1Charge2);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver1Charge2(e.target.value);
              }}
              onBlur={(e) => {
                if (!driver1Charge2) {
                  setDriver1Charge2(numberValidation(0));
                }
              }}
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver2Charge2"
              id="driver2Charge2"
              type="text"
              className={`customFormControl driver2Input`}
              value={driver2Charge2}
              onChange={(e) => {
                handleInputValue(e, setDriver2Charge2);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver2Charge2(e.target.value);
              }}
              hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver3Charge2"
              id="driver3Charge2"
              type="text"
              className={`customFormControl driver3Input`}
              value={driver3Charge2}
              onChange={(e) => {
                handleInputValue(e, setDriver3Charge2);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver3Charge2(e.target.value);
              }}
              hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <Col xs={1} className={`${isPayReimburseInvisible ? "hide-elements" : ""}`}>
            <CustomRadioGroup
              horizontal
              name="charge2DescriptionPaymentMode"
              options={["Pay", "Reimburse"]}
              selectedOption={charge2DescriptionPaymentMode}
              onChange={(value) => setCharge2DescriptionPaymentMode(value)}
            />
          </Col>
        </Form.Group>

        <Form.Group
          className={`form-group align-items-center row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
        >
          <Col xs={1} className="p-0 me-5 w-150px" />
          <Col xs={1} className="p-0 mx-4 w-110px text-end">
            <Form.Label className="customColFormLabel">Additional Charge #3</Form.Label>
          </Col>
          <Col xs={3} className="">
            <input
              name="additionalCharge#1"
              id="additionalCharge#1"
              type="text"
              className={`customFormControl ${
                (invoiceCharge3 || driver1Charge3) && !charge3Description
                  ? Number(invoiceCharge3) === 0 && Number(driver1Charge3) === 0
                    ? ""
                    : "borderRed"
                  : ""
              }`}
              value={charge3Description}
              onChange={(e) => setCharge3Description(e.target.value)}
              maxLength={60}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </Col>
          <div className="d-flex flex-shrink-0 w-100px">
            <input
              name="invoiceCharge3"
              id="invoiceCharge3"
              type="text"
              className={`customFormControl`}
              value={invoiceCharge3}
              onChange={(e) => {
                handleInputValue(e, setInvoiceCharge3);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setInvoiceCharge3(e.target.value);
              }}
              onBlur={(e) => {
                if (!invoiceCharge3) {
                  setInvoiceCharge3(numberValidation(0));
                }

                if (!driver1Charge3 && e.target.value && driverList?.length === 1) {
                  setDriver1Charge3(
                    selectedUnit?.dealerShuttle ? Number(0) : numberValidation(e.target.value)
                  );
                }
              }}
              disabled={
                (selectedUnit?.fodInvoice && !isPreInvoicedReturn) ||
                (selectedUnit?.preInvoiced && !isPreInvoicedReturn)
              }
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver1Charge3"
              id="driver1Charge3"
              type="text"
              className={`customFormControl driver1Input`}
              value={driver1Charge3}
              onChange={(e) => {
                handleInputValue(e, setDriver1Charge3);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver1Charge3(e.target.value);
              }}
              onBlur={(e) => {
                if (!driver1Charge3) {
                  setDriver1Charge3(numberValidation(0));
                }
              }}
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver2Charge3"
              id="driver2Charge3"
              type="text"
              className={`customFormControl driver2Input`}
              value={driver2Charge3}
              onChange={(e) => {
                handleInputValue(e, setDriver2Charge3);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver2Charge3(e.target.value);
              }}
              hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <input
              name="driver3Charge3"
              id="driver3Charge3"
              type="text"
              className={`customFormControl driver3Input`}
              value={driver3Charge3}
              onChange={(e) => {
                handleInputValue(e, setDriver3Charge3);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver3Charge3(e.target.value);
              }}
              hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <Col xs={1} className={`${isPayReimburseInvisible ? "hide-elements" : ""}`}>
            <CustomRadioGroup
              horizontal
              name="charge3DescriptionPaymentMode"
              options={["Pay", "Reimburse"]}
              selectedOption={charge3DescriptionPaymentMode}
              onChange={(value) => setCharge3DescriptionPaymentMode(value)}
            />
          </Col>
        </Form.Group>

        <Form.Group
          className={`form-group align-items-center row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
        >
          <Col xs={1} className="p-0 me-5 w-150px" />
          <Col
            xs={1}
            className={`p-0 mx-4 w-110px text-end  ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}
          >
            <Form.Label className="customColFormLabel">Additional Pay #1</Form.Label>
          </Col>
          <Col xs={3} className={` ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}>
            <input
              name="pay11Description"
              id="pay11Description"
              type="text"
              className={`customFormControl ${
                driver1Pay1 && !pay1Description ? (Number(driver1Pay1) === 0 ? "" : "borderRed") : ""
              }`}
              value={pay1Description}
              onChange={(e) => setPay1Description(e.target.value)}
              maxLength={60}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </Col>
          <div className="d-flex flex-shrink-0 w-100px hide-elements">
            <input className={`customFormControl`} />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}
          >
            <input
              name="driver1Pay1"
              id="driver1Pay1"
              type="text"
              className={`customFormControl driver1Input`}
              value={driver1Pay1}
              onChange={(e) => {
                handleInputValue(e, setDriver1Pay1);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver1Pay1(e.target.value);
              }}
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}
          >
            <input
              name="driver2Pay1"
              id="driver2Pay1"
              type="text"
              className={`customFormControl driver2Input`}
              value={driver2Pay1}
              onChange={(e) => {
                handleInputValue(e, setDriver2Pay1);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver2Pay1(e.target.value);
              }}
              hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}
          >
            <input
              name="driver3Pay1"
              id="driver3Pay1"
              type="text"
              className={`customFormControl driver3Input`}
              value={driver3Pay1}
              onChange={(e) => {
                handleInputValue(e, setDriver3Pay1);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver3Pay1(e.target.value);
              }}
              hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <Col
            xs={1}
            className={`${isPayReimburseInvisible || selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <CustomRadioGroup
              horizontal
              name="driver1Pay1PaymentMode"
              options={["Pay", "Reimburse"]}
              selectedOption={driver1Pay1PaymentMode}
              onChange={(value) => setDriver1Pay1PaymentMode(value)}
            />
          </Col>
        </Form.Group>

        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
          <Col xs={1} className="p-0 me-5 w-150px" />
          <Col
            xs={1}
            className={`p-0 mx-4 w-110px text-end  ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}
          >
            <Form.Label className="customColFormLabel">Additional Pay #2</Form.Label>
          </Col>
          <Col xs={3} className={` ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}>
            <input
              name="pay2Description"
              id="pay2Description"
              type="text"
              className={`customFormControl ${
                driver1Pay2 && !pay2Description ? (Number(driver1Pay2) === 0 ? "" : "borderRed") : ""
              }`}
              value={pay2Description}
              onChange={(e) => setPay2Description(e.target.value)}
              maxLength={60}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </Col>
          <div className="d-flex flex-shrink-0 w-100px hide-elements">
            <input className={`customFormControl`} />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}
          >
            <input
              name="driver1Pay2"
              id="driver1Pay2"
              type="text"
              className={`customFormControl driver1Input`}
              value={driver1Pay2}
              onChange={(e) => {
                handleInputValue(e, setDriver1Pay2);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver1Pay2(e.target.value);
              }}
              maxLength={8}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}
          >
            <input
              name="driver2Pay2"
              id="driver2Pay2"
              type="text"
              className={`customFormControl driver2Input`}
              value={driver2Pay2}
              onChange={(e) => {
                handleInputValue(e, setDriver2Pay2);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver2Pay2(e.target.value);
              }}
              hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <div
            className={`d-flex flex-shrink-0 w-100px ${!selectedUnit?.dealerShuttle ? "" : "hide-elements"}`}
          >
            <input
              name="driver3Pay2"
              id="driver3Pay2"
              type="text"
              className={`customFormControl driver3Input`}
              value={driver3Pay2}
              onChange={(e) => {
                handleInputValue(e, setDriver3Pay2);
                e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriver3Pay2(e.target.value);
              }}
              hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
            />
          </div>
          <Col
            xs={1}
            className={`${isPayReimburseInvisible || selectedUnit?.dealerShuttle ? "hide-elements" : ""}`}
          >
            <CustomRadioGroup
              horizontal
              name="driver1Pay2PaymentMode"
              options={["Pay", "Reimburse"]}
              selectedOption={driver1Pay2PaymentMode}
              onChange={(value) => setDriver1Pay2PaymentMode(value)}
            />
          </Col>
        </Form.Group>

        {/* Invoice Text */}
        <Form.Group
          className={`form-group align-items-start row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
        >
          <Col xs={1} className="p-0 me-5 w-150px" />
          <Col xs={1} className="p-0 mx-4 w-110px text-end">
            <Form.Label className="customColFormLabel">Invoice Text</Form.Label>
          </Col>
          <Col xs={7} className="">
            <DynamicTextFields
              numFields={3}
              maxCharLimit={58}
              maxLimit={58}
              inputValues={invoiceTextInputValues}
              invoice={true}
              setInputValues={setInvoiceTextInputValues}
            />
          </Col>
        </Form.Group>
      </Row>
    </div>
  );
};

export default Amounts;
