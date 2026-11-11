import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreditCard from "../../../../../modules/credit-card/CreditCard";
import { useDispatch, useSelector } from "react-redux";
import {
  resetReturn,
  setCreditCardArrayList,
  setDelayReturnByDriver,
  setMiscDeliveryDetails,
  setMiscPickupDetails,
  setReturnDetails,
  setReturnRateCalc,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import toast from "react-hot-toast";
import CreditCardComponent from "../../../../../modules/credit-card/CreditCardComponent";
import { useAppNavigate } from "../../../../../hooks/useAppNavigate";

const MilesFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useAppNavigate();

  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const data = useSelector((state) => state.delayProcessing.data);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [returnBal, setReturnBal] = useState();
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [nextFlag, setnextFlag] = useState(false);
  const returnRateCalc = useSelector((state) => state.delayProcessing.returnRateCalc);
  const creditCardArrayList = useSelector((state) => state.delayProcessing.creditCardArrayList);

  const [reset, setReset] = useState(false);

  const delayReturnByDriver = useSelector((state) => state.delayProcessing.delayReturnByDriver);

  const returnDetails = useSelector((state) => state.delayProcessing.returnDetails);

  const returnMilageRate =
    data?.InvoiceReturnRate +
    data?.InvoiceFuelSurchargeRate +
    data?.InvoiceSupplementalRate +
    data?.InvoiceSupplementalFuelSurchargeRate +
    data?.InvoiceLengthRate +
    data?.InvoiceSpecialRate +
    data?.InvoiceSpecialFuelSurchargeRate +
    data?.InvoiceAdditionalRate +
    data?.InvoiceAdditionalFuelSurchargeRate +
    data?.InvoiceCanadianCharge +
    data?.InvoiceUSCharge;
  const invoiceMilageRate =
    data?.InvoiceRate +
    data?.InvoiceFuelSurchargeRate +
    data?.InvoiceSupplementalRate +
    data?.InvoiceSupplementalFuelSurchargeRate +
    data?.InvoiceLengthRate +
    data?.InvoiceSpecialRate +
    data?.InvoiceSpecialFuelSurchargeRate +
    data?.InvoiceAdditionalRate +
    data?.InvoiceAdditionalFuelSurchargeRate +
    data?.InvoiceCanadianCharge +
    data?.InvoiceUSCharge;

  const newRate =
    (Number(returnRateCalc?.returnInvoiceFlatrate) ||
      returnMilageRate * returnRateCalc?.returnInvoiceMiles ||
      0) +
    (Number(returnRateCalc?.outboundInvoiceFlatrate) ||
      invoiceMilageRate * returnRateCalc?.outboundInvoiceMiles ||
      0);

  const handleCancelYes = () => {
    dispatch(setReturnRateCalc(null));
    dispatch(resetReturn());
    dispatch(setMiscPickupDetails(null));
    dispatch(setMiscDeliveryDetails(null));
    dispatch(setReturnDetails(null));
    dispatch(setDelayReturnByDriver(false));
    toast.success("Changes Cancelled");
    navigate(
      "/delay-return-details/" +
        companyName +
        "/" +
        Number(unitfk) +
        "/" +
        Number(driverfk) +
        "/" +
        delayedUnitPK
    );
  };
  const milesRatesDefaulted = returnDetails?.dealerRefused && returnDetails?.isPickupLocationChecked;

  useEffect(() => {
    const invoiceoutboundFlatRate = data?.InvoiceFlatRate;
    const invoiceReturnFlatRate = data?.InvoiceReturnFlatRate;
    const creditCardUser = data?.CreditCardPrePaid;
    const fodInvoiceAmt = data?.FODInvoiceAmount;
    const invoiceRate = data?.InvoiceRate;
    const invoiceReturnRate = data?.InvoiceReturnRate;
    const invoiceFuelSurchargeRate = data?.InvoiceFuelSurchargeRate;
    const invoiceCDLARate = data?.InvoiceCDLARate;
    const invoiceSupplementalRate = data?.InvoiceSupplementalRate;
    const invoiceSupplementalFuelSurchargeRate = data?.InvoiceSupplementalFuelSurchargeRate;
    const invoiceLengthRate = data?.InvoiceLengthRate;
    const invoiceSpecialRate = data?.InvoiceSpecialRate;
    const invoiceSpecialFuelSurchargeRate = data?.InvoiceSupplementalFuelSurchargeRate;
    const invoiceAdditionalRate = data?.InvoiceAdditionalRate;
    const invoiceAdditionalFuelSurchargeRate = data?.InvoiceAdditionalFuelSurchargeRate;
    const invoiceCanadianCharge = data?.InvoiceCanadianCharge;
    const invoiceUSCharge = data?.InvoiceUSCharge;
    const invoicePortEscortFee = data?.InvoicePortEscortFee;
    const invoiceELDFee = data?.InvoiceELDFee;
    const totalCommonRates =
      invoiceFuelSurchargeRate +
      invoiceCDLARate +
      invoiceSupplementalRate +
      invoiceSupplementalFuelSurchargeRate +
      invoiceLengthRate +
      invoiceSpecialRate +
      invoiceSpecialFuelSurchargeRate +
      invoiceAdditionalRate +
      invoiceAdditionalFuelSurchargeRate;
    const totalCharges = invoiceCanadianCharge + invoiceUSCharge + invoicePortEscortFee + invoiceELDFee;
    const totalOutboundInvoiceRates =
      (totalCommonRates + invoiceRate) * returnRateCalc?.outboundInvoiceMiles + totalCharges;
    const totalReturnInvoiceRates =
      (totalCommonRates + invoiceReturnRate) * returnRateCalc?.returnInvoiceMiles;
    if (creditCardUser) {
      if (invoiceoutboundFlatRate || invoiceReturnFlatRate) {
        setReturnBal(
          returnRateCalc?.outboundInvoiceFlatrate + returnRateCalc?.returnInvoiceFlatrate - fodInvoiceAmt
        );
      } else {
        setReturnBal(totalOutboundInvoiceRates + totalReturnInvoiceRates - fodInvoiceAmt);
      }
    }
  }, []);

  useEffect(() => {
    if (!data) {
      navigate(
        "/delay-return-details/" +
          companyName +
          "/" +
          Number(unitfk) +
          "/" +
          Number(driverfk) +
          "/" +
          delayedUnitPK
      );
    }
  }, [data]);

  useEffect(() => {
    setReset(true);
  }, [newRate]);

  useEffect(() => {
    const {
      outboundInvoiceMiles,
      returnInvoiceMiles,
      outboundDriverMiles,
      returnDriverMiles,
      outboundInvoiceFlatrate,
      returnInvoiceFlatrate,
      outboundDriverFlatrate,
      returnDriverFlatrate,
      outboundtolls,
      outboundpermits,
      outboundother,
      outboundOtherDesc,
    } = returnRateCalc || {};

    const temp = [
      outboundInvoiceMiles,
      returnInvoiceMiles,
      outboundDriverMiles,
      returnDriverMiles,
      outboundInvoiceFlatrate,
      returnInvoiceFlatrate,
      outboundDriverFlatrate,
      returnDriverFlatrate,
    ].every((value) => value !== "." && (!value || value === "" || !/^\d*\.$/.test(value)));

    if (
      [
        outboundInvoiceMiles,
        returnInvoiceMiles,
        outboundDriverMiles,
        returnDriverMiles,
        outboundInvoiceFlatrate,
        returnInvoiceFlatrate,
        outboundDriverFlatrate,
        returnDriverFlatrate,
      ].every((value) => value !== "." && (!value || value === "" || !/^\d*\.$/.test(value))) &&
      (!outboundother || (outboundother && outboundOtherDesc?.trim())) &&
      [outboundtolls, outboundpermits, outboundother].every(
        (value) => value !== "." && !/^\d*\.$/.test(value)
      ) &&
      (!data?.CreditCardPrePaid || data?.DriverAtFault || Number(remainingAmount) === 0) &&
      (Number(data?.InvoiceFlatRate) === 0 || milesRatesDefaulted || Number(outboundInvoiceFlatrate) !== 0) &&
      (Number(data?.DispatchFlatrate) === 0 || milesRatesDefaulted || Number(outboundDriverFlatrate) !== 0) &&
      (Number(data?.InvoiceReturnRate) !== 0 || Number(returnInvoiceFlatrate) != 0 || milesRatesDefaulted) &&
      (Number(data?.DispatchReturnRate) !== 0 || Number(returnDriverFlatrate) != 0 || milesRatesDefaulted) &&
      Number(returnDriverMiles) !== 0 &&
      Number(returnInvoiceMiles) !== 0 &&
      Number(outboundDriverMiles) !== 0 &&
      Number(outboundInvoiceMiles) !== 0
    ) {
      setnextFlag(true);
    } else {
      setnextFlag(false);
    }
  }, [returnRateCalc, remainingAmount]);

  useEffect(() => {
    if (creditCardArrayList?.length <= 0) {
      setRemainingAmount(newRate);
    }
  }, [creditCardArrayList]);

  useEffect(() => {
    // Check if the page was reloaded
    if (sessionStorage.getItem("reloaded") === "true") {
      // If it's a reload, navigate to the return page
      navigate(
        "/delay-return-details/" +
          companyName +
          "/" +
          Number(unitfk) +
          "/" +
          Number(driverfk) +
          "/" +
          delayedUnitPK
      );
    } else {
      // Mark that the page has been loaded
      sessionStorage.setItem("reloaded", "true");
    }

    // Cleanup sessionStorage when the component unmounts
    return () => {
      sessionStorage.removeItem("reloaded");
    };
  }, [navigate]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => setShowCreditCard(true)}
          disabled={!data?.CreditCardPrePaid || Number(newRate) === 0 || data?.DriverAtFault}
        >
          Credit Card
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={!nextFlag}
          onClick={() => {
            navigate(
              "/delay-return-documents/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverfk) +
                "/" +
                delayedUnitPK
            );
          }}
        >
          Next
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            goBack();
          }}
        >
          Back
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            handleCancelYes();
          }}
        >
          Cancel
        </button>

        <CreditCardComponent
          show={showCreditCard}
          onHide={() => setShowCreditCard(false)}
          customerId={data?.CustomerFK}
          unitPK={unitfk}
          amountTitle={"Return Balance"}
          source={"Return Credit Card"}
          programName={"DelayReturn"}
          creditCardArrayList={creditCardArrayList}
          setCreditCardArrayList={(value) => dispatch(setCreditCardArrayList(value))}
          remainingAmountValue={remainingAmount}
          setRemainingAmount={(value) => setRemainingAmount(value)}
          incomingAmount={Number(newRate)}
          dispatched={true}
          resetAmounts={reset}
          setResetAmounts={setReset}
        />
      </div>
    </div>
  );
};

export default MilesFooter;
