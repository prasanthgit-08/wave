import React, { useEffect, useState } from "react";
import Header from "../../../common/Header";
import FormContent from "./FormContent";
import CommonFooter from "../../../common/CommonFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  setBolFileAdded,
  setBreakdownInvoiceFiles,
  setCreditCardArrayList,
  setDispatchStatus,
  setFeesTabNormalSortFlag,
  setFeesTabNormalSortValue,
  setRemainingAmount,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CreditCardComponent from "../../../../modules/credit-card/CreditCardComponent";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";

const DelayUnitBreakdownInvoice = () => {
  const [showCreditCard, setShowCreditCard] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const navigate = useNavigate();

  const creditCardArrayList = useSelector((state) => state.delaybreakdown.creditCardArrayList);
  const remainingAmount = useSelector((state) => state.delaybreakdown.remainingAmount);
  const breakdownInvoiceDetails = useSelector((state) => state.delaybreakdown.breakdownInvoiceDetails);
  const feesTabLisiting = useSelector((state) => state.delaybreakdown.feesTabLisiting);
  const creditCardPayment = useSelector((state) => state.delaybreakdown.creditCardPayment);
  const unitFK = useSelector((state) => state.delaybreakdown.unitFK);
  const customerFK = useSelector((state) => state.delaybreakdown.customerFK);
  const navigateToInvoice = useSelector((state) => state.delaybreakdown.navigateToInvoice);
  const creditCardFlag = useSelector((state) => state.delaybreakdown.creditCardFlag);
  const dispatchStatus = useSelector((state) => state.delaybreakdown.dispatchStatus);
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");

  let totalFeesAmount = feesTabLisiting?.reduce((sum, item) => {
    return sum + (item.invoiceAmount || 0);
  }, 0);

  let totalAmountCreditCard =
    (breakdownInvoiceDetails[0]?.invoiceDowntimeAmount || 0) +
    (breakdownInvoiceDetails[0]?.invoiceAPUAmount || 0) +
    (breakdownInvoiceDetails[0]?.invoicePermits || 0) +
    (breakdownInvoiceDetails[0]?.invoiceTolls || 0) +
    (breakdownInvoiceDetails[0]?.additional_Inv_Amount || 0) +
    (breakdownInvoiceDetails[0]?.invoiceBreakdownFee || 0) +
    totalFeesAmount;

  const handleNext = () => {
    navigate(`/delayed-unit-breakdown-invoice-scan/${breakdownFK}`);
  };
  const handleCancel = () => {
    dispatch(setFeesTabNormalSortValue(""));
    dispatch(setFeesTabNormalSortFlag(true));
    navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
    toast.success("Changes Cancelled");
  };

  const buttons = [
    {
      label: "Credit Card",
      onClick: () => setShowCreditCard(true),
      disabled:
        creditCardPayment === "N" ||
        (Number(totalAmountCreditCard) === 0 &&
          !creditCardFlag &&
          (creditCardPayment === "A" || creditCardPayment === "Y")) ||
        (creditCardFlag && Number(totalAmountCreditCard) === 0),
    },

    {
      label: "Next",
      onClick: () => handleNext(),
      disabled:
        creditCardPayment === "N" || creditCardPayment === "" || creditCardPayment === null || !creditCardFlag
          ? false
          : (Number(remainingAmount) !== 0 &&
              creditCardPayment === "A" &&
              creditCardArrayList?.length > 0 &&
              Number(totalAmountCreditCard) !== 0) ||
            (Number(remainingAmount) !== 0 &&
              creditCardPayment === "Y" &&
              Number(totalAmountCreditCard) !== 0),
    },
  ];

  useEffect(() => {
    if (!navigateToInvoice) {
      dispatch(setFeesTabNormalSortValue(""));
      dispatch(setFeesTabNormalSortFlag(true));
      navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
    }
  }, [navigateToInvoice]);

  const onClose = () => {
    dispatch(setCreditCardArrayList([]));
    dispatch(setBreakdownInvoiceFiles({ actionType: "clear" }));
    dispatch(setBolFileAdded(false));
    dispatch(setFeesTabNormalSortValue(""));
    dispatch(setFeesTabNormalSortFlag(true));
  };

  useEffect(() => {
    if (unitFK !== null && breakdownCompanyName !== "") {
      MiscInvoiceService.getDispatchStatus(unitFK, breakdownCompanyName).then((response) => {
        const data = response?.data;
        dispatch(setDispatchStatus(data?.content));
      });
    }
  }, [unitFK, breakdownCompanyName]);

  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          closeConfirmationHandler={onClose}
          closeNavigationURL={`/breakdown-processing/view-breakdown/${breakdownFK}`}
        />
        <FormContent />
        <CommonFooter buttons={buttons} />
      </div>

      <CreditCardComponent
        show={showCreditCard}
        onHide={() => setShowCreditCard(false)}
        amountTitle={"Breakdown Charges Amount"}
        source={"BreakdownInvoice"}
        programName={"Breakdown Invoice"}
        creditCardArrayList={creditCardArrayList}
        incomingAmount={totalAmountCreditCard}
        setCreditCardArrayList={(value) => dispatch(setCreditCardArrayList(value))}
        unitPK={unitFK}
        customerId={customerFK}
        dispatched={dispatchStatus || false}
        remainingAmountValue={remainingAmount}
        setRemainingAmount={(value) => dispatch(setRemainingAmount(value))}
      />
    </div>
  );
};

export default DelayUnitBreakdownInvoice;
