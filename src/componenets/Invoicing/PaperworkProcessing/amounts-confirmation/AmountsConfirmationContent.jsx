import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setDelayedUnitReturnFK,
  setInvoiceTotalAmntConf,
  setIsReturn,
  setPartialTripArraySum,
  setUnitPK,
} from "../../../../redux/Invoicing/PaperworkProcessingSlice";

const AmountsConfirmationContent = () => {
  const dispatch = useDispatch();
  const [milesForAmountConfirmation, setMilesForAmountConfirmation] = useState(0);
  const [grossInvoiceRate, setGrossInvoiceRate] = useState(0);
  const [grossInvoiceAmount, setGrossInvoiceAmount] = useState(0);
  const [returnGrossInvoiceRate, setReturnGrossInvoiceRate] = useState(0);
  const [returnGrossInvoiceAmount, setReturnGrossInvoiceAmount] = useState(0);
  const [returnGrossMiles, setReturnGrossMiles] = useState(0);
  const [outboundGrossMiles, setOutboundGrossMiles] = useState(0);
  const [delayedInvoiceSupplementalMiles, setDelayedInvoiceSupplementalMiles] = useState(0);
  const [delayedFuelSurchargeMiles, setDelayedFuelSurchargeMiles] = useState(0);
  const [delayedCdlaMiles, setDelayedCdlaMiles] = useState(0);
  const [delayedApportionedMiles, setDelayedApportionedMiles] = useState(0);
  const [delayedInvoiceSpecialMiles, setDelayedInvoiceSpecialMiles] = useState(0);
  const [delayedInvoiceDriverMiles, setDelayedInvoiceDriverMiles] = useState(0);
  const [fuelSurchargeRate, setFuelSurchargeRate] = useState(0);
  const [fuelSurchargeAmount, setFuelSurchargeAmount] = useState(0);
  const [cdlaRate, setCdlaRate] = useState(0);
  const [apportionedSurcharge, setApportionedSurcharge] = useState(0);
  const [cdlaAmount, setCdlaAmount] = useState(0);
  const [apportionedSurchargeAmount, setApportionedSurchargeAmount] = useState(0);
  const [invoiceAdditionalDescription, setInvoiceAdditionalDescription] = useState(null);
  const [invoiceAdditionalRate, setInvoiceAdditionalRate] = useState(0);
  const [additionalAmount, setAdditionalAmount] = useState(0);
  const [invoiceSpecialDescription, setInvoiceSpecialDescription] = useState(null);
  const [invoiceSpecialRate, setInvoiceSpecialRate] = useState(0);
  const [specialAmount, setSpecialAmount] = useState(0);
  const [invoiceDriverDescription, setInvoiceDriverDescription] = useState(null);
  const [invoiceDriverRate, setInvoiceDriverRate] = useState(0);
  const [driverAmount, setDriverAmount] = useState(0);
  const [invoicePermitsAmntConfScreen, setInvoicePermitsAmntConfScreen] = useState(0);
  const [invoiceTollsAmntConfScreen, setInvoiceTollsAmntConfScreen] = useState(0);
  const [invoiceWashAmntConfScreen, setInvoiceWashAmntConfScreen] = useState(0);
  const [driver1PermitsAmntConfScreen, setDriver1PermitsAmntConfScreen] = useState(0);
  const [driver1TollsAmntConfScreen, setDriver1TollsAmntConfScreen] = useState(0);
  const [driver1WashAmntConfScreen, setDriver1WashAmntConfScreen] = useState(0);
  const [invoiceCharge1, setInvoiceCharge1] = useState(0);
  const [invoiceCharge2, setInvoiceCharge2] = useState(0);
  const [invoiceCharge3, setInvoiceCharge3] = useState(0);
  const [driver1Charge1, setDriver1Charge1] = useState(0);
  const [driver1Charge2, setDriver1Charge2] = useState(0);
  const [driver1Charge3, setDriver1Charge3] = useState(0);
  const [charge1Description, setCharge1Description] = useState(null);
  const [charge2Description, setCharge2Description] = useState(null);
  const [charge3Description, setCharge3Description] = useState(null);
  const [surChargeAmntConf, setSurChargeAmntConf] = useState(0);
  const [surChargeDescription, setSurChargeDescription] = useState(null);
  const [overWidthPermitAmntConf, setOverWidthPermitAmntConf] = useState(0);
  const [invoicePortEscortFee, setInvoicePortEscortFee] = useState(0);
  const [storageFeeAmntConf, setStorageFeeAmntConf] = useState(0);
  const [startAndRunAmntConf, setStartAndRunAmntConf] = useState(0);
  const [invoiceELDFee, setInvoiceELDFee] = useState(0);
  const [invoiceELDDescription, setInvoiceELDDescription] = useState(null);
  const [insuranceAmntConf, setInsuranceAmntConf] = useState(0);
  const [lineHaulAmntConf, setLineHaulAmntConf] = useState(0);
  const [driver1Pay1AmountConf, setDriver1Pay1AmountConf] = useState(0);
  const [driver1Pay2AmountConf, setDriver1Pay2AmountConf] = useState(0);
  const [pay11DescriptionAmountConf, setPay11DescriptionAmountConf] = useState(null);
  const [pay2DescriptionAmountConf, setPay2DescriptionAmountConf] = useState(null);
  const [charge1DescriptionPaymentMode, setCharge1DescriptionPaymentMode] = useState("");
  const [charge2DescriptionPaymentMode, setCharge2DescriptionPaymentMode] = useState("");
  const [charge3DescriptionPaymentMode, setCharge3DescriptionPaymentMode] = useState("");
  const [driver1Pay1PaymentMode, setDriver1Pay1PaymentMode] = useState("");
  const [driver1Pay2PaymentMode, setDriver1Pay2PaymentMode] = useState("");
  const [invoiceStorageSeperate, setInvoiceStorageSeperate] = useState(false);
  const [invoiceBreakdownSeperately, setInvoiceBreakdownSeperately] = useState(false);
  const [driver2Tolls, setDriver2Tolls] = useState(0);
  const [driver2Permits, setDriver2Permits] = useState(0);
  const [driver2Wash, setDriver2Wash] = useState(0);
  const [driver3Tolls, setDriver3Tolls] = useState(0);
  const [driver3Permits, setDriver3Permits] = useState(0);
  const [driver3Wash, setDriver3Wash] = useState(0);
  const [driver2Charge1, setDriver2Charge1] = useState(0);
  const [driver2Charge2, setDriver2Charge2] = useState(0);
  const [driver2Charge3, setDriver2Charge3] = useState(0);
  const [driver3Charge1, setDriver3Charge1] = useState(0);
  const [driver3Charge2, setDriver3Charge2] = useState(0);
  const [driver3Charge3, setDriver3Charge3] = useState(0);
  const [driver2Pay1, setDriver2Pay1] = useState(0);
  const [driver2Pay2, setDriver2Pay2] = useState(0);
  const [driver3Pay1, setDriver3Pay1] = useState(0);
  const [driver3Pay2, setDriver3Pay2] = useState(0);
  const [fodInvoice, setFodInvoice] = useState(false);
  const [quickPayCustomer, setQuickPayCustomer] = useState(false);
  const [payBalance, setPayBalance] = useState(0);
  const [netPay, setNetPay] = useState(0);

  const amountsConfirmationDataList = useSelector(
    (state) => state.paperworkProcessing.amountsConfirmationDataList
  );
  const isDelayedUnit = useSelector((state) => state.paperworkProcessing.isDelayedUnit);
  const breakdownDelayArray = useSelector((state) => state.paperworkProcessing.breakdownDelayArray);
  const partialTripArray = useSelector((state) => state.paperworkProcessing.partialTripArray);
  const partialTripArraySum = useSelector((state) => state.paperworkProcessing.partialTripArraySum);
  const driverList = useSelector((state) => state.paperworkProcessing.driverList);
  const totalBreakdownPermit = useSelector((state) => state.paperworkProcessing.totalBreakdownPermit);
  const totalBreakdownTolls = useSelector((state) => state.paperworkProcessing.totalBreakdownTolls);
  const selectedUnitsListIndex = useSelector((state) => state.paperworkProcessing.selectedUnitsListIndex);
  const multiUnitSeperateInvoice = useSelector((state) => state.paperworkProcessing.multiUnitSeperateInvoice);
  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);
  const delayedUnitReturnFK = useSelector((state) => state.paperworkProcessing.delayedUnitReturnFK);
  const isReturn = useSelector((state) => state.paperworkProcessing.isReturn);
  const invoiceTotalAmntConf = useSelector((state) => state.paperworkProcessing.invoiceTotalAmntConf);

  // in case of split trip, finding the sum of tolls, permits,wash and other
  useEffect(() => {
    // case of single unit and multi unit-single invoice in split trip
    if (
      (partialTripArray?.length > 0 && !selectedUnit.multiUnit) ||
      (partialTripArray?.length > 0 && selectedUnit.multiUnit && !multiUnitSeperateInvoice)
    ) {
      const tollInvoiceSum = partialTripArray.reduce((acc, obj) => acc + (Number(obj?.tollInvoice) || 0), 0);
      const permitInvoiceSum = partialTripArray.reduce(
        (acc, obj) => acc + (Number(obj?.permitInvoice) || 0),
        0
      );
      const washInvoiceSum = partialTripArray.reduce((acc, obj) => acc + (Number(obj?.washInvoice) || 0), 0);
      const otherInvoiceSum = partialTripArray.reduce(
        (acc, obj) => acc + (Number(obj?.otherInvoice) || 0),
        0
      );

      dispatch(
        setPartialTripArraySum({
          tollInvoiceSum,
          permitInvoiceSum,
          washInvoiceSum,
          otherInvoiceSum,
        })
      );
    }
    // case of multi unit multi invoice in split trip
    if (partialTripArray?.length > 0 && selectedUnit.multiUnit && multiUnitSeperateInvoice) {
      const tollInvoiceSum = partialTripArray
        .filter((obj) => obj?.unitId === amountsConfirmationDataList[selectedUnitsListIndex]?.unitPK)
        .reduce((acc, obj) => acc + (Number(obj?.tollInvoice) || 0), 0);
      const permitInvoiceSum = partialTripArray
        .filter((obj) => obj?.unitId === amountsConfirmationDataList[selectedUnitsListIndex]?.unitPK)
        .reduce((acc, obj) => acc + (Number(obj?.permitInvoice) || 0), 0);
      const washInvoiceSum = partialTripArray
        .filter((obj) => obj?.unitId === amountsConfirmationDataList[selectedUnitsListIndex]?.unitPK)
        .reduce((acc, obj) => acc + (Number(obj?.washInvoice) || 0), 0);
      const otherInvoiceSum = partialTripArray
        .filter((obj) => obj?.unitId === amountsConfirmationDataList[selectedUnitsListIndex]?.unitPK)
        .reduce((acc, obj) => acc + (Number(obj?.otherInvoice) || 0), 0);

      dispatch(
        setPartialTripArraySum({
          tollInvoiceSum,
          permitInvoiceSum,
          washInvoiceSum,
          otherInvoiceSum,
        })
      );
    }
  }, [partialTripArray, selectedUnitsListIndex, amountsConfirmationDataList]);

  // setting data from backend
  useEffect(() => {
    if (amountsConfirmationDataList?.length > 0) {
      // updating additional charges if there is an 'other charge' form split screen
      const setUpdatedInvoiceCharge = () => {
        if (
          amountsConfirmationDataList[selectedUnitsListIndex].invoiceCharge1 === 0 &&
          amountsConfirmationDataList[selectedUnitsListIndex].driverList[0]?.charge1 === 0
        ) {
          setInvoiceCharge1(partialTripArraySum?.otherInvoiceSum || 0);
          setCharge1Description("Other");
        } else if (
          amountsConfirmationDataList[selectedUnitsListIndex].invoiceCharge2 === 0 &&
          amountsConfirmationDataList[selectedUnitsListIndex].driverList[0]?.charge2 === 0
        ) {
          setInvoiceCharge2(partialTripArraySum?.otherInvoiceSum || 0);
          setCharge2Description("Other");
        } else if (
          amountsConfirmationDataList[selectedUnitsListIndex].invoiceCharge3 === 0 &&
          amountsConfirmationDataList[selectedUnitsListIndex].driverList[0]?.charge3 === 0
        ) {
          setInvoiceCharge3(partialTripArraySum?.otherInvoiceSum || 0);
          setCharge3Description("Other");
        } else {
          setInvoiceCharge1(
            partialTripArraySum?.otherInvoiceSum +
              amountsConfirmationDataList[selectedUnitsListIndex].invoiceCharge1 || 0
          );
        }
      };

      // updating tolls and permits if there is breakdown tolls and permits from breakdwon screen for single unit
      const setUpdatedInvoiceTollsAndPermits = (invoicePermitsAmntConfScreen, invoiceTollsAmntConfScreen) => {
        if (totalBreakdownPermit > 0 && !multiUnitSeperateInvoice && !selectedUnit.multiUnit) {
          setInvoicePermitsAmntConfScreen(invoicePermitsAmntConfScreen + totalBreakdownPermit);
        }
        if (totalBreakdownTolls > 0 && !multiUnitSeperateInvoice && !selectedUnit.multiUnit) {
          setInvoiceTollsAmntConfScreen(invoiceTollsAmntConfScreen + totalBreakdownTolls);
        }

        // case of multi unit single invoice in breakdown
        if (selectedUnit.multiUnit && !multiUnitSeperateInvoice && breakdownDelayArray.length > 0) {
          setInvoicePermitsAmntConfScreen(
            invoicePermitsAmntConfScreen + breakdownDelayArray[0]?.totalPermitsInvoiceAllUnits
          );
          setInvoiceTollsAmntConfScreen(
            invoiceTollsAmntConfScreen + breakdownDelayArray[0]?.totalTollsInvoiceAllUnits
          );
        }

        //case for multi unit multi invoice in breakdown
        if (selectedUnit.multiUnit && multiUnitSeperateInvoice && breakdownDelayArray.length > 0) {
          //  filter the array to get only the objects where unitFKInt of breakdown matches unitPK
          const filteredArray = breakdownDelayArray.filter(
            (item) => item.unitFKInt === amountsConfirmationDataList[selectedUnitsListIndex]?.unitPK
          );
          //  sum of breakdown invoicePermits
          const invoicePermitsSumForEachUnit = filteredArray.reduce((accumulator, currentItem) => {
            // Add the value of invoicePermits to the accumulator
            return accumulator + currentItem.invoicePermits;
          }, 0); // Start with an initial value of 0 for the accumulator
          setInvoicePermitsAmntConfScreen(invoicePermitsAmntConfScreen + invoicePermitsSumForEachUnit);
          // sum of breakdown invoicetolls
          const invoiceTollsSumForEachUnit = filteredArray.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.invoiceTolls;
          }, 0);
          setInvoiceTollsAmntConfScreen(invoiceTollsAmntConfScreen + invoiceTollsSumForEachUnit);
        }
      };

      //update total amount based on different charges from breakdown and split trip
      const updateTotalAmount = () => {
        let newInvoiceTotalAmntConf =
          (amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceTotal || 0) +
          (partialTripArraySum?.tollInvoiceSum || 0) +
          (partialTripArraySum?.permitInvoiceSum || 0) +
          (partialTripArraySum?.washInvoiceSum || 0) +
          (partialTripArraySum?.otherInvoiceSum || 0) +
          (selectedUnit.multiUnit && totalBreakdownPermit > 0 && !multiUnitSeperateInvoice
            ? totalBreakdownPermit
            : 0) +
          (selectedUnit.multiUnit && totalBreakdownTolls > 0 && !multiUnitSeperateInvoice
            ? totalBreakdownTolls
            : 0) +
          (!selectedUnit.multiUnit && breakdownDelayArray.length > 0 ? totalBreakdownPermit : 0) +
          (!selectedUnit.multiUnit && breakdownDelayArray.length > 0 ? totalBreakdownTolls : 0);

        // Check if selectedUnit.multiUnit, multiUnitSeperateInvoice, and breakdownDelayArray condition is true
        if (selectedUnit.multiUnit && multiUnitSeperateInvoice && breakdownDelayArray.length > 0) {
          // Filter the breakdownDelayArray to match the unitPK
          const filteredArray = breakdownDelayArray.filter(
            (item) => item.unitFKInt === amountsConfirmationDataList[selectedUnitsListIndex]?.unitPK
          );

          // Calculate the sum of invoicePermits for each unit
          const invoicePermitsSumForEachUnit = filteredArray.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.invoicePermits;
          }, 0);

          // Calculate the sum of invoiceTolls for each unit
          const invoiceTollsSumForEachUnit = filteredArray.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.invoiceTolls;
          }, 0);

          // Add these sums to the invoiceTotalAmntConf
          newInvoiceTotalAmntConf += invoicePermitsSumForEachUnit + invoiceTollsSumForEachUnit;
        }

        // Finally, update the invoice total amount confirmation state
        dispatch(setInvoiceTotalAmntConf(newInvoiceTotalAmntConf));
      };

      dispatch(setUnitPK(amountsConfirmationDataList[selectedUnitsListIndex]?.unitPK || ""));
      setInvoiceBreakdownSeperately(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceBreakdownSeperately || false
      );
      setMilesForAmountConfirmation(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceMiles);
      setGrossInvoiceRate(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceRate || 0);
      setGrossInvoiceAmount(amountsConfirmationDataList[selectedUnitsListIndex]?.grossInvoiceAmount || 0);
      setFuelSurchargeRate(amountsConfirmationDataList[selectedUnitsListIndex]?.fuelSurchargeRate || 0);
      setFuelSurchargeAmount(amountsConfirmationDataList[selectedUnitsListIndex]?.fuelSurchargeAmount || 0);
      setCdlaRate(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceCDLARate || 0);
      setCdlaAmount(amountsConfirmationDataList[selectedUnitsListIndex]?.CDLSurchargeAmount || 0);
      setApportionedSurcharge(
        amountsConfirmationDataList[selectedUnitsListIndex]?.InvoiceApportionedRate || 0
      );
      setApportionedSurchargeAmount(
        amountsConfirmationDataList[selectedUnitsListIndex]?.InvoiceApportionedAmount || 0
      );

      setInvoiceAdditionalDescription(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceAdditionalDescription || ""
      );
      setInvoiceAdditionalRate(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceAdditionalRate || 0
      );
      setAdditionalAmount(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceAdditionalAmount || 0);
      setInvoiceSpecialDescription(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceSpecialDescription || ""
      );
      setInvoiceSpecialRate(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceSpecialRate || 0);
      setSpecialAmount(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceSpecialAmount || 0);
      setInvoiceDriverDescription(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceDriverDescription || ""
      );
      setInvoiceDriverRate(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceDriverRate || 0);
      setDriverAmount(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceDriverAmount || 0);
      const localInvoicePermitsAmntConfScreen =
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoicePermitsAmntConfScreen +
          (partialTripArraySum?.permitInvoiceSum || 0) || 0;
      setInvoicePermitsAmntConfScreen(localInvoicePermitsAmntConfScreen);

      const localInvoiceTollsAmntConfScreen =
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceTollsAmntConfScreen +
          (partialTripArraySum?.tollInvoiceSum || 0) || 0;
      setInvoiceTollsAmntConfScreen(localInvoiceTollsAmntConfScreen);

      setInvoiceWashAmntConfScreen(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceWashAmntConfScreen +
          (partialTripArraySum?.washInvoiceSum || 0) || 0
      );

      setDriver1PermitsAmntConfScreen(
        amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[0]?.permits || 0
      );
      setDriver1TollsAmntConfScreen(
        amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[0]?.tolls || 0
      );
      setDriver1WashAmntConfScreen(
        amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[0]?.wash || 0
      );

      if (isDelayedUnit) {
        setUpdatedInvoiceTollsAndPermits(
          localInvoicePermitsAmntConfScreen,
          localInvoiceTollsAmntConfScreen,
          invoiceTotalAmntConf
        );
      }
      setDriver2Permits(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[1]?.permits || 0);
      setDriver2Tolls(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[1]?.tolls || 0);
      setDriver2Wash(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[1]?.wash || 0);
      setDriver3Permits(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[2]?.permits || 0);
      setDriver3Tolls(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[2]?.tolls || 0);
      setDriver3Wash(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[2]?.wash || 0);
      setInvoiceCharge1(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceCharge1 || 0);
      setInvoiceCharge2(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceCharge2 || 0);
      setInvoiceCharge3(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceCharge3 || 0);
      setDriver1Charge1(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[0]?.charge1 || 0);
      setDriver1Charge2(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[0]?.charge2 || 0);
      setDriver1Charge3(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[0]?.charge3 || 0);
      setDriver2Charge1(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[1]?.charge1 || 0);
      setDriver2Charge2(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[1]?.charge2 || 0);
      setDriver2Charge3(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[1]?.charge3 || 0);
      setDriver3Charge1(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[2]?.charge1 || 0);
      setDriver3Charge2(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[2]?.charge2 || 0);
      setDriver3Charge3(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[2]?.charge3 || 0);
      setCharge1Description(amountsConfirmationDataList[selectedUnitsListIndex]?.charge1Description || "");
      setCharge2Description(amountsConfirmationDataList[selectedUnitsListIndex]?.charge2Description || "");
      setCharge3Description(amountsConfirmationDataList[selectedUnitsListIndex]?.charge3Description || "");
      if (partialTripArray[partialTripArray?.length - 1]) {
        setUpdatedInvoiceCharge();
      }
      setSurChargeAmntConf(amountsConfirmationDataList[selectedUnitsListIndex]?.canadianDeliveryAmount || 0);
      setSurChargeDescription(
        amountsConfirmationDataList[selectedUnitsListIndex]?.canadianDeliveryDescription || ""
      );
      setOverWidthPermitAmntConf(
        amountsConfirmationDataList[selectedUnitsListIndex]?.overWidthPermitsAmount || 0
      );
      setInvoicePortEscortFee(amountsConfirmationDataList[selectedUnitsListIndex]?.portEscortFeeAmount || 0);
      setStartAndRunAmntConf(amountsConfirmationDataList[selectedUnitsListIndex]?.startAndRunAmount || 0);
      setStorageFeeAmntConf(
        amountsConfirmationDataList[selectedUnitsListIndex]?.startAndRunAmount &&
          amountsConfirmationDataList[selectedUnitsListIndex]?.startAndRunAmount > 0
          ? amountsConfirmationDataList[selectedUnitsListIndex]?.storageFeeAmount +
              amountsConfirmationDataList[selectedUnitsListIndex]?.startAndRunAmount
          : amountsConfirmationDataList[selectedUnitsListIndex]?.storageFeeAmount || 0
      );
      setInvoiceELDFee(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceELDFee || 0);
      setInvoiceELDDescription(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceELDDescription || "ELD Fee"
      );
      setInsuranceAmntConf(amountsConfirmationDataList[selectedUnitsListIndex]?.insuranceAmount || 0);
      setLineHaulAmntConf(amountsConfirmationDataList[selectedUnitsListIndex]?.lineHaulAmount || 0);

      updateTotalAmount();

      setDriver1Pay1AmountConf(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[0]?.pay1 || 0);
      setDriver1Pay2AmountConf(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[0]?.pay2 || 0);
      setDriver2Pay1(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[1]?.pay1 || 0);
      setDriver2Pay2(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[1]?.pay2 || 0);
      setDriver3Pay1(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[2]?.pay1 || 0);
      setDriver3Pay2(amountsConfirmationDataList[selectedUnitsListIndex]?.driverList[2]?.pay2 || 0);
      setPay11DescriptionAmountConf(
        amountsConfirmationDataList[selectedUnitsListIndex]?.pay1DescriptionAmountConf || ""
      );
      setPay2DescriptionAmountConf(
        amountsConfirmationDataList[selectedUnitsListIndex]?.pay2DescriptionAmountConf || ""
      );
      setCharge1DescriptionPaymentMode(
        amountsConfirmationDataList[selectedUnitsListIndex]?.charge1DescriptionPaymentMode || ""
      );
      setCharge2DescriptionPaymentMode(
        amountsConfirmationDataList[selectedUnitsListIndex]?.charge2DescriptionPaymentMode || ""
      );
      setCharge3DescriptionPaymentMode(
        amountsConfirmationDataList[selectedUnitsListIndex]?.charge3DescriptionPaymentMode || ""
      );
      setDriver1Pay1PaymentMode(
        amountsConfirmationDataList[selectedUnitsListIndex]?.driver1Pay1PaymentMode || ""
      );
      setDriver1Pay2PaymentMode(
        amountsConfirmationDataList[selectedUnitsListIndex]?.driver1Pay2PaymentMode || ""
      );
      setInvoiceStorageSeperate(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceStorageSeperate || false
      );
      setFodInvoice(amountsConfirmationDataList[selectedUnitsListIndex]?.fodInvoice || false);
      setQuickPayCustomer(amountsConfirmationDataList[selectedUnitsListIndex]?.quickPayCustomer || false);
      setPayBalance(amountsConfirmationDataList[selectedUnitsListIndex]?.payBalance || 0);
      setNetPay(amountsConfirmationDataList[selectedUnitsListIndex]?.netPay || 0);
      dispatch(setIsReturn(amountsConfirmationDataList[selectedUnitsListIndex]?.isReturn || ""));
      dispatch(
        setDelayedUnitReturnFK(amountsConfirmationDataList[selectedUnitsListIndex]?.delayedUnitReturnFK || "")
      );
      setOutboundGrossMiles(
        amountsConfirmationDataList[selectedUnitsListIndex]?.outBoundGrossInvoiceMiles || 0
      );
      setReturnGrossInvoiceRate(
        amountsConfirmationDataList[selectedUnitsListIndex]?.returnedGrossInvoiceRate || 0
      );
      setReturnGrossMiles(
        amountsConfirmationDataList[selectedUnitsListIndex]?.returnedGrossInvoiceMiles || 0
      );
      setReturnGrossInvoiceAmount(
        amountsConfirmationDataList[selectedUnitsListIndex]?.returnedGrossInvoiceAmount || 0
      );
      setDelayedFuelSurchargeMiles(
        amountsConfirmationDataList[selectedUnitsListIndex]?.fuelSurchargeMiles || 0
      );
      setDelayedCdlaMiles(amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceCDLAMiles || 0);
      setDelayedApportionedMiles(
        amountsConfirmationDataList[selectedUnitsListIndex]?.InvoiceApportionedMiles || 0
      );
      setDelayedInvoiceSupplementalMiles(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceAdditionalMiles || 0
      );
      setDelayedInvoiceSpecialMiles(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceSpecialMiles || 0
      );
      setDelayedInvoiceDriverMiles(
        amountsConfirmationDataList[selectedUnitsListIndex]?.invoiceDriverMiles || 0
      );
    }
  }, [selectedUnitsListIndex, partialTripArraySum]);

  return (
    <div className="p-2">
      <div
        className="shadow-sm rounded border threeFourthScreenFormContentHeight" /* paperworkProcessingHeight */
      >
        <Row className="mx-0 p-0 mt-2">
          {multiUnitSeperateInvoice && (
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col xs={1} className="p-0 me-5 w-110px">
                <Form.Label className="customColFormLabel">Unit Number</Form.Label>
              </Col>
              <Col xs={3} className="">
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
          )}

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
            <Col xs={4} />
            <div className="d-flex flex-shrink-0 w-100px">
              <Form.Label className="customColFormLabel ms-1">Rate</Form.Label>
            </div>
            <div className="d-flex flex-shrink-0 w-100px">
              <Form.Label className="customColFormLabel ms-1">Miles</Form.Label>
            </div>
            <div className="d-flex flex-shrink-0 w-120px">
              <Form.Label className="customColFormLabel ms-1">Amount</Form.Label>
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">
                {delayedUnitReturnFK && isReturn ? "Outbound Gross Invoice Amount" : "Gross Invoice Amount"}
              </Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={grossInvoiceRate}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="invoiceMiles"
                id="invoiceMiles"
                type="text"
                className="customFormControl"
                value={delayedUnitReturnFK && isReturn ? outboundGrossMiles : milesForAmountConfirmation}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={grossInvoiceAmount}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group
            className={`form-group align-items-center row m-l-0 m-r-0 mb-1`}
            hidden={returnGrossInvoiceAmount <= 0}
          >
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">
                {delayedUnitReturnFK && isReturn ? "Return Gross Invoice Amount" : "hide-elements"}
              </Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={returnGrossInvoiceRate}
                hidden={!(delayedUnitReturnFK && isReturn)}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="returnGrossMiles"
                id="returnGrossMiles"
                type="text"
                className="customFormControl"
                value={returnGrossMiles}
                hidden={!(delayedUnitReturnFK && isReturn)}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={returnGrossInvoiceAmount}
                hidden={!(delayedUnitReturnFK && isReturn)}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Fuel Surcharge</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={fuelSurchargeRate}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={
                  delayedUnitReturnFK && isReturn ? delayedFuelSurchargeMiles : milesForAmountConfirmation
                }
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={fuelSurchargeAmount}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">CDL Surcharge</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={cdlaRate}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={delayedUnitReturnFK && isReturn ? delayedCdlaMiles : milesForAmountConfirmation}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={cdlaAmount}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Apportioned Surcharge</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={apportionedSurcharge}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-100px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={delayedUnitReturnFK && isReturn ? delayedApportionedMiles : milesForAmountConfirmation}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={apportionedSurchargeAmount}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group
            className={`form-group align-items-center row m-l-0 m-r-0 mb-1 ${additionalAmount > 0 ? "" : "hide-elements"}`}
          >
            <Col
              xs={4}
              className={`text-end  ${invoiceAdditionalRate > 0 || milesForAmountConfirmation > 0 || additionalAmount > 0 ? "" : "hide-elements"}`}
            >
              <Form.Label className="customColFormLabel">{invoiceAdditionalDescription}</Form.Label>
            </Col>

            <div
              className={`d-flex flex-shrink-0 w-100px ${invoiceAdditionalRate > 0 ? "" : "hide-elements"}`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceAdditionalRate}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div
              className={`d-flex flex-shrink-0 w-100px ${delayedInvoiceSupplementalMiles > 0 || milesForAmountConfirmation > 0 ? "" : "hide-elements"}`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={
                  delayedUnitReturnFK && isReturn
                    ? delayedInvoiceSupplementalMiles
                    : milesForAmountConfirmation
                }
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className={`d-flex flex-shrink-0 w-120px ${additionalAmount > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={additionalAmount}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group
            className={`form-group align-items-center row m-l-0 m-r-0 mb-1 ${specialAmount > 0 ? "" : "hide-elements"}`}
          >
            <Col
              xs={4}
              className={`text-end  ${invoiceSpecialRate > 0 || milesForAmountConfirmation > 0 || delayedInvoiceSpecialMiles > 0 || specialAmount > 0 ? "" : "hide-elements"}`}
            >
              <Form.Label className="customColFormLabel">{invoiceSpecialDescription}</Form.Label>
            </Col>

            <div className={`d-flex flex-shrink-0 w-100px ${invoiceSpecialRate > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceSpecialRate}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div
              className={`d-flex flex-shrink-0 w-100px ${delayedInvoiceSpecialMiles > 0 || milesForAmountConfirmation ? "" : "hide-elements"}`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={
                  delayedUnitReturnFK && isReturn ? delayedInvoiceSpecialMiles : milesForAmountConfirmation
                }
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div className={`d-flex flex-shrink-0 w-120px ${specialAmount > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={specialAmount}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>
          <Form.Group
            className={`form-group align-items-center row m-l-0 m-r-0 mb-1 ${driverAmount >= 0 ? "" : "hide-elements"}`}
          >
            <Col
              xs={4}
              className={`text-end  ${invoiceDriverRate > 0 || milesForAmountConfirmation > 0 || driverAmount > 0 || delayedInvoiceDriverMiles > 0 ? "" : "hide-elements"}`}
            >
              <Form.Label className="customColFormLabel"> {invoiceDriverDescription}</Form.Label>
            </Col>

            <div
              className={`d-flex flex-shrink-0 w-100px ${invoiceDriverRate > 0 || driverAmount > 0 ? "" : "hide-elements"}`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceDriverRate}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div
              className={`d-flex flex-shrink-0 w-100px ${milesForAmountConfirmation <= 0 || driverAmount <= 0 || (delayedUnitReturnFK && isReturn && delayedInvoiceDriverMiles <= 0) ? "hide-elements" : ""}`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"

                value={
                  delayedUnitReturnFK && isReturn ? delayedInvoiceDriverMiles : milesForAmountConfirmation
                }
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
            <div
              className={`d-flex flex-shrink-0 w-120px ${driverAmount > 0 || driverAmount > 0 ? "" : "hide-elements"}`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={driverAmount}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div className="d-flex flex-shrink-0 w-120px">
              <Form.Label
                className={`customColFormLabel ms-1 ${
                  (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                    ? "hide-elements"
                    : ""
                }`}
                style={{ position: "relative", bottom: "-2px" }}
              >
                Driver
              </Form.Label>
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Permits</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoicePermitsAmntConfScreen}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div
              className={`d-flex flex-shrink-0 w-120px ${
                (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                  ? "hide-elements"
                  : ""
              }`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={driver1PermitsAmntConfScreen}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div
              className={`d-flex flex-shrink-0 w-120px ${
                (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                  ? "hide-elements"
                  : ""
              }`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
                value={driver2Permits}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div
              className={`d-flex flex-shrink-0 w-120px ${
                (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                  ? "hide-elements"
                  : ""
              }`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
                value={driver3Permits}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Tolls</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceTollsAmntConfScreen}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div
              className={`d-flex flex-shrink-0 w-120px ${
                (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                  ? "hide-elements"
                  : ""
              }`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={driver1TollsAmntConfScreen}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div
              className={`d-flex flex-shrink-0 w-120px ${
                (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                  ? "hide-elements"
                  : ""
              }`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
                disabled
                value={driver2Tolls}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>

            <div
              className={`d-flex flex-shrink-0 w-120px ${
                (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                  ? "hide-elements"
                  : ""
              }`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
                disabled
                value={driver3Tolls}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Wash</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceWashAmntConfScreen}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div
              className={`d-flex flex-shrink-0 w-120px ${
                (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                  ? "hide-elements"
                  : ""
              }`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={driver1WashAmntConfScreen}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div
              className={`d-flex flex-shrink-0 w-120px ${
                (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                  ? "hide-elements"
                  : ""
              }`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 2 || multiUnitSeperateInvoice}
                disabled
                value={driver2Wash}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>

            <div
              className={`d-flex flex-shrink-0 w-120px ${
                (selectedUnit?.isShuttle && selectedUnit?.invoiceShuttle) || selectedUnit?.dealerShuttle
                  ? "hide-elements"
                  : ""
              }`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 3 || multiUnitSeperateInvoice}
                disabled
                value={driver3Wash}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col
              xs={4}
              className={`text-end  ${
                invoiceCharge1 > 0 || driver1Charge1 > 0 || driver2Charge1 > 0 || driver3Charge1 > 0
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Form.Label className="customColFormLabel">{charge1Description}</Form.Label>
            </Col>

            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />

            <div className={`d-flex flex-shrink-0 w-120px ${invoiceCharge1 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceCharge1}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div className={`d-flex flex-shrink-0 w-120px ${driver1Charge1 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={driver1Charge1}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div className={`d-flex flex-shrink-0 w-120px ${driver2Charge1 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 2}
                disabled
                value={driver2Charge1}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
            <div className={`d-flex flex-shrink-0 w-120px ${driver3Charge1 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 3}
                disabled
                value={driver3Charge1}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col
              xs={4}
              className={`text-end  ${
                invoiceCharge2 > 0 || driver1Charge2 > 0 || driver2Charge2 > 0 || driver3Charge2 > 0
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Form.Label className="customColFormLabel">{charge2Description}</Form.Label>
            </Col>

            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />

            <div className={`d-flex flex-shrink-0 w-120px ${invoiceCharge2 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceCharge2}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div className={`d-flex flex-shrink-0 w-120px ${driver1Charge2 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={driver1Charge2}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div className={`d-flex flex-shrink-0 w-120px ${driver2Charge2 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 2}
                disabled
                value={driver2Charge2}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
            <div className={`d-flex flex-shrink-0 w-120px ${driver3Charge2 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 3}
                disabled
                value={driver3Charge2}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col
              xs={4}
              className={`text-end  ${
                invoiceCharge3 > 0 || driver1Charge3 > 0 || driver2Charge3 > 0 || driver3Charge3 > 0
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Form.Label className="customColFormLabel">{charge3Description}</Form.Label>
            </Col>

            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />

            <div className={`d-flex flex-shrink-0 w-120px ${invoiceCharge3 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceCharge3}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div className={`d-flex flex-shrink-0 w-120px ${driver1Charge3 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={driver1Charge3}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div className={`d-flex flex-shrink-0 w-120px ${driver2Charge3 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 2}
                disabled
                value={driver2Charge3}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
            <div className={`d-flex flex-shrink-0 w-120px ${driver3Charge3 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 3}
                disabled
                value={driver3Charge3}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className={`text-end  ${surChargeAmntConf > 0 ? "" : "hide-elements"}`}>
              <Form.Label className="customColFormLabel">{surChargeDescription}</Form.Label>
            </Col>

            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />

            <div className={`d-flex flex-shrink-0 w-120px ${surChargeAmntConf > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={surChargeAmntConf}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Overwidth Permits</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={overWidthPermitAmntConf}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Port Escort Fee</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoicePortEscortFee}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Storage Fee</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={storageFeeAmntConf}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className={`text-end  ${invoiceELDFee > 0 ? "" : "hide-elements"}`}>
              <Form.Label className="customColFormLabel">{invoiceELDDescription}</Form.Label>
            </Col>

            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />

            <div className={`d-flex flex-shrink-0 w-120px ${invoiceELDFee > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceELDFee}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Insurance</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={insuranceAmntConf}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Linehaul Discount</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={Number(lineHaulAmntConf) === 0 ? lineHaulAmntConf : "-" + lineHaulAmntConf}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col xs={4} className="text-end">
              <Form.Label className="customColFormLabel">Invoice Total</Form.Label>
            </Col>
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px">
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={invoiceTotalAmntConf.toFixed(2)}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col
              xs={4}
              className={`text-end  ${
                driver1Pay1AmountConf > 0 || driver2Pay1 > 0 || driver3Pay1 > 0
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Form.Label className="customColFormLabel">{pay11DescriptionAmountConf}</Form.Label>
            </Col>

            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px hide-elements" />

            <div
              className={`d-flex flex-shrink-0 w-120px ${driver1Pay1AmountConf > 0 ? "" : "hide-elements"}`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={driver1Pay1AmountConf}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div className={`d-flex flex-shrink-0 w-120px ${driver2Pay1 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 2}
                disabled
                value={driver2Pay1}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
            <div className={`d-flex flex-shrink-0 w-120px ${driver3Pay1 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 3}
                disabled
                value={driver3Pay1}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-1">
            <Col
              xs={4}
              className={`text-end  ${
                driver1Pay2AmountConf > 0 || driver2Pay2 > 0 || driver3Pay2 > 0
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Form.Label className="customColFormLabel">{pay2DescriptionAmountConf}</Form.Label>
            </Col>

            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-100px hide-elements" />
            <div className="d-flex flex-shrink-0 w-120px hide-elements" />

            <div
              className={`d-flex flex-shrink-0 w-120px ${driver1Pay2AmountConf > 0 ? "" : "hide-elements"}`}
            >
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                value={driver1Pay2AmountConf}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </div>

            <div className={`d-flex flex-shrink-0 w-120px ${driver2Pay2 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 2}
                disabled
                value={driver2Pay2}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
            <div className={`d-flex flex-shrink-0 w-120px ${driver3Pay2 > 0 ? "" : "hide-elements"}`}>
              <input
                name="customer"
                id="customer"
                type="text"
                className="customFormControl"
                maxLength={30}
                hidden={driverList?.length < 3}
                disabled
                value={driver3Pay2}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>
        </Row>
      </div>
    </div>
  );
};

export default AmountsConfirmationContent;
