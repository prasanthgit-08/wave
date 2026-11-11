import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import styles from "../../componenets/OrderEntry/OrderEntry.module.css";
import formatString from "../../utils/validation/ExpirationDate";
import CreditCardModalService from "../../services/CreditCardModalService";
import toast from "react-hot-toast";
import CustomerService from "../../services/CustomerService";
import LoadingIcon from "../../componenets/common/LoadingIcon";
import { formatDatetimeToDate, formatDateWithTime } from "../../utils/dateUtils";

const CreditCardComponent = ({
  show,
  onHide,
  programName,
  creditCardArrayList,
  setCreditCardArrayList,
  remainingAmountValue = 0,
  amountTitle,
  incomingAmount,
  source,
  customerId,
  unitPK,
  setRemainingAmount,
  dispatched,
  resetAmounts,
  setResetAmounts,
  checkingPreExistCredit,
}) => {
  const [chargeAmount, setChargeAmount] = useState(0);
  const [displayAmount, setDisplayAmount] = useState(0);
  const [remainingAmount, setRemainingAmountValue] = useState(remainingAmountValue);
  const [creditCardList, setCreditCardList] = useState([]);
  const [manuallyEnter, setManuallyEnter] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [enableDelete, setEnableDelete] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [enableCancel, setEnableCancel] = useState(false);
  const [enableCredit, setEnableCredit] = useState(false);
  const [enableVoid, setEnableVoid] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [unmaskedCardNumber, setUnmaskedCardNumber] = useState("");
  const [expDate, setExpDate] = useState(null);
  const [billAddress, setBillAddress] = useState("");
  const [billZipCode, setBillZipCode] = useState("");
  const [canadian, setCanadian] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [disableChargeAmount, setDisableChargeAmount] = useState(true);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [disableFields, setDisableFields] = useState(true);
  const [editChargeAmount, setEditChargeAmount] = useState(false);
  const [secCode, setSecCode] = useState("");
  const [dateErr, setDateErr] = useState(false);
  const [isZipValid, setIsZipValid] = useState(false);
  const [customerCreditCardPK, setCustomerCreditCardPK] = useState();
  const [normalZipValidationState, setNormalZipValidationState] = useState(null);
  const [canadianZipValidationState, setCanadianZipValidationState] = useState(null);
  const [authorizedCardData, setAuthorizedCardData] = useState(
    creditCardArrayList?.length ? creditCardArrayList : []
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [credit, setCredit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [autoPopulate, setAutoPopulate] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const authorizedCardsSum =
    authorizedCardData
      ?.filter((item) => !item?.preExisting)
      .reduce((sum, card) => {
        const amount = parseFloat(card?.amount) || 0;
        return card?.creditFlag ? sum - amount : sum + amount;
      }, 0) || 0;
  const balanceAmount =
    Number(authorizedCardsSum) === 0 ? incomingAmount : Number(incomingAmount) - authorizedCardsSum;

  const isEditMasterExpress = programName === "EditMasterExpress";

  // Sum of pre-existing (OE) payments voided in this session. Their amount was already counted in the
  // prepaid amount, so voiding them puts that money back on the invoice difference. (Bug 4139)
  const getVoidedPreExistingSum = (cards = []) =>
    (cards || []).reduce(
      (sum, card) => (card?.preExisting && card?.voidFlag ? sum + (Number(card?.amount) || 0) : sum),
      0
    );

  // Net effect of the new (non pre-existing) cards on the balance: charges reduce it, credits increase it,
  // and a voided card cancels itself out.
  const getNewCardsNetCharge = (cards = []) =>
    (cards || []).reduce((sum, card) => {
      if (card?.preExisting || card?.voidFlag) return sum;
      const amount = Number(card?.amount) || 0;
      return card?.creditFlag ? sum - amount : sum + amount;
    }, 0);

  // Edit Master Express: Remaining Amount is always derived from the card list, never accumulated,
  // so closing / reopening the modal cannot drift it into negative values. (Bug 4142)
  const computeEMXRemaining = (cards = []) =>
    Number(
      (Number(incomingAmount || 0) + getVoidedPreExistingSum(cards) - getNewCardsNetCharge(cards)).toFixed(2)
    );

  const invoiceDifference = isEditMasterExpress
    ? Number(incomingAmount || 0) + getVoidedPreExistingSum(authorizedCardData)
    : displayAmount;
  //Function for table row double click
  const onTableRowDOubleClick = (cardData, index) => {
    setCardInformation(cardData, true);
    setSelectedCardIndex(index);
    if (cardData?.preExisting || cardData?.processed) {
      setEnableEdit(false);
      setEnableDelete(false);
      setEnableCancel(true);
      if (cardData?.charged) {
        setEnableCredit(true);
      } else {
        setEnableCredit(false);
      }
      if (!cardData?.voided && !cardData?.charged) {
        setEnableVoid(true);
      } else {
        setEnableVoid(false);
      }
    } else {
      setEnableEdit(true);
      setEnableDelete(true);
      setEnableCancel(true);
      setEnableVoid(false);
      setEnableCredit(false);
    }
    setEnableSave(false);
    setDisableChargeAmount(true);
    setSelectedCardData(cardData);
    setDisableFields(true);
  };

  const resetCardDetails = () => {
    setCreditCardNumber("");
    setExpDate("");
    setBillAddress("");
    setBillZipCode("");
    setDefaultValue("00");
    setManuallyEnter(false);
    setSecCode("");
    setIsProcessed(false);
    if (canadian) {
      setCanadianZipValidationState(null);
    } else {
      setNormalZipValidationState(null);
    }
  };

  //setting the selected card information
  const setCardInformation = (cardData, isDoubleClick) => {
    setCreditCardNumber(cardData?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X"));
    setExpDate(cardData?.expirationDate ? cardData?.expirationDate : cardData?.creditCardExpirationDate);
    setBillAddress((cardData?.billingAddress ? cardData?.billingAddress : cardData?.creditCardAddress) || "");
    setBillZipCode(cardData?.billingZipcode ? cardData?.billingZipcode : cardData?.creditCardPostalCode);
    setSecCode(cardData?.securityCode);
    setDefaultValue(cardData?.customerCreditCardPK || "00");
    setManuallyEnter(false);
    setIsProcessed(cardData?.processed);
    let temp = cardData?.creditFlag ? -1 : 1;
    if (isDoubleClick) {
      setChargeAmount(Number(Number(cardData?.amount) * temp).toFixed(2));
    }
    setUnmaskedCardNumber(cardData?.unmaskedCardNumber);
    setIsZipValid(true);
  };

  const normalZipValidation = (e) => {
    let value = e.target.value;
    if (value.match(/^((\d{5}-\d{4})|(\d{5}))$/)) {
      setNormalZipValidationState(true);
    } else {
      setNormalZipValidationState(false);
    }
  };

  const canadianZipValidation = (e) => {
    let value = e.target.value;
    if (value.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/)) {
      setCanadianZipValidationState(true);
    } else {
      setCanadianZipValidationState(false);
    }
  };

  //zipcode validation
  const checkZipCode = (e) => {
    let uszip = "";
    if (canadian !== true && billZipCode.length > 5) {
      uszip = e.target.value.slice(0, 5);
    } else {
      uszip = e.target.value;
    }
    setLoading1(true);
    CreditCardModalService.isZipCodeExisting(uszip)
      .then((response) => {
        setIsZipValid(response.data);
        setLoading1(false);
      })
      .catch((err) => {
        setLoading1(false);
        console.error(err);
      });
  };

  const newHandler = () => {
    setDefaultValue("00");
    setIsZipValid(false);
    setChargeAmount(Number(remainingAmount).toFixed(2));
    setDisableFields(false);
    setDisableChargeAmount(false);
    resetCardDetails();
    setManuallyEnter(true);
    setEnableCancel(true);
  };

  //Edit button handler funtion
  const editHandler = () => {
    setEnableSave(true);
    setDisableChargeAmount(false);
    setEnableEdit(false);
    setEnableDelete(false);
    setEditChargeAmount(true);
  };

  const cancelHandler = () => {
    setEnableEdit(false);
    resetCardDetails();
    setChargeAmount(Number(remainingAmount).toFixed(2));
    setManuallyEnter(false);
    setEnableCancel(false);
    setEnableDelete(false);
    setEnableSave(false);
    setEnableCredit(false);
    setEnableVoid(false);
    setCredit(false);
    setSelectedCardData(null);
    setDisableFields(true);
    setIsZipValid(false);
    setDisableChargeAmount(true);
    setSelectedCardIndex(-1);
    setAutoPopulate(false);
  };

  const handlerExpDate = (e) => {
    const value = e.target.value;
    setExpDate(formatString(value));
    var dateObj = new Date();
    var currentMonth = dateObj.getUTCMonth() + 1; //months from 1-12
    var Yearstr = dateObj.getUTCFullYear().toString().slice(2);
    //convert year to number
    var currentYear = parseInt(Yearstr);
    var date = value.split("/");
    var month = parseInt(date[0]);
    var year = parseInt(date[1]);
    if (year < currentYear) {
      // expiration date has passed the current year
      setDateErr(true);
    } else if (year === currentYear && month < currentMonth) {
      // expiration month has passed the current month in the current year
      setDateErr(true);
    } else {
      setDateErr(false);
    }
  };

  // for showing authorized card details
  const renderAuthorizedDatas = authorizedCardData?.map((i, index) => {
    const amount = typeof i.amount === "number" ? i.amount.toFixed(2) : parseFloat(i.amount).toFixed(2);
    return (
      <tr
        onDoubleClick={(e) => onTableRowDOubleClick(i, index, e)}
        key={index}
        className={`${index === selectedCardIndex ? "tableSelected" : ""} `}
      >
        <td>{i?.creditCardNumber}</td>
        <td>{amount}</td>
        {programName === "EditMasterExpress" && <td>{i.charged ? "Yes" : "No"}</td>}
        {programName === "EditMasterExpress" && <td>{i.voided ? "Yes" : "No"}</td>}
      </tr>
    );
  });

  const renderDropData = creditCardList?.map((i, index) => (
    <option value={i?.customerCreditCardPK} key={index}>
      {i?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X")}
    </option>
  ));

  // card selection function
  const cardSelectHandler = (e) => {
    let value = e.target.value;

    if (value === "00") {
      setDefaultValue("00");
      resetCardDetails();
      setManuallyEnter(true);
    } else {
      let cardData = creditCardList?.find((i) => i.customerCreditCardPK === Number(value));
      if (cardData?.creditCardNumber) {
        setEnableSave(true);
        cardData = {
          ...cardData,
          unmaskedCardNumber: cardData?.creditCardNumber,
          securityCode: 999,
        };
      }
      setCardInformation(cardData);
      setCustomerCreditCardPK(cardData?.customerCreditCardPK);
    }
  };

  const deleteHandler = () => {
    setAuthorizedCardData(authorizedCardData?.filter((item, index) => index !== selectedCardIndex));
    resetCardDetails();
    // remove later if unused
    const amount = selectedCardData?.creditFlag
      ? -1 * Number(selectedCardData?.amount)
      : Number(selectedCardData?.amount);
    const newRemainAmt = Number(remainingAmount) + amount;
    setRemainingAmountValue(newRemainAmt);
    setChargeAmount(Math.max(Number(newRemainAmt), 0).toFixed(2));
    setManuallyEnter(false);
    setEnableEdit(false);
    setEnableCancel(false);
    setEnableDelete(false);
    setEnableSave(false);
    setEnableCredit(false);
    setEnableVoid(false);
    setCredit(false);
    setEditChargeAmount(false);
    setDisableFields(true);
    setDisableChargeAmount(true);
    setSelectedCardData(null);
    setSelectedCardIndex(-1);
  };

  const handleSuccessAuthorization = (response) => {
    const previousObject = authorizedCardData?.find((i, index) => index === selectedCardIndex);
    setAuthorizedCardData([
      ...authorizedCardData,
      {
        creditCardNumber: creditCardNumber,
        unmaskedCardNumber: unmaskedCardNumber,
        expirationDate: expDate,
        billingAddress: billAddress ? billAddress : String(),
        billingZipcode: billZipCode ? billZipCode : String(),
        amount: Math.abs(Number(chargeAmount)),
        source: source,
        customerCreditCardPK: !manuallyEnter ? customerCreditCardPK : null,
        cardType: response.data?.cardtype || "",
        cardHolderName: "",
        securityCode: secCode || String(),
        creditFlag: credit || Number(chargeAmount) <= 0,
        preExisting: false,
        edited: credit,
        voidFlag: false,
        purchaseFlag: (Number(chargeAmount) > 0 && !credit && dispatched) || false,
        preAuthFlag: Number(chargeAmount) > 0 && !credit && !dispatched,
        authCompleteFlag: false,
        customerPK: customerId ? customerId : 0,
        ttid: null,
        refundAmount: programName === "Reroute" ? incomingAmount : null,
      },
    ]);
    const newRemainingAmount = parseFloat(remainingAmount) - parseFloat(chargeAmount);
    setRemainingAmountValue(parseFloat(newRemainingAmount.toFixed(2)));
    setChargeAmount(parseFloat(newRemainingAmount.toFixed(2)));
    resetCardDetails();
    setDisableFields(true);
    setManuallyEnter(false);
    setDisableChargeAmount(true);
    setIsZipValid(false);
    setEnableCancel(false);
    setCredit(false);
    setSelectedCardIndex(-1);
    setAutoPopulate(false);
    toast.success("Credit Card Authorized");
  };

  // card select api calling
  const fetchCards = () => {
    setLoading2(true);
    CreditCardModalService.getCreditCardList(customerId)
      .then((res) => {
        const modfiedData = res?.data?.map((card) => ({ ...card, preExisting: true }));
        setCreditCardList(modfiedData);
        setLoading2(false);
      })
      .catch((err) => {
        setLoading2(false);
        console.error(err);
      });
  };

  const clearFields = () => {
    setCreditCardNumber("");
    setBillAddress("");
    setBillZipCode("");
    setExpDate("");
    setSecCode("");
    setChargeAmount(Number(remainingAmount).toFixed(2));
    setManuallyEnter(false);
    setDisableChargeAmount(true);
    setEnableEdit(false);
    setEnableSave(false);
    setEnableDelete(false);
    setEnableCancel(false);
  };
  // checking the customer is canadian or not for billing zipcode validation
  const checkCanadianCustomer = () => {
    CustomerService.getCustomerById(customerId).then((response) => {
      const data = response.data;
      setCanadian(data?.canadian);
    });
  };

  // Intial API calls & effects when Credit Card modal is opened
  useEffect(() => {
    if (show && customerId) {
      setSelectedCardIndex(-1);
      setDisableFields(true);
      setEnableCredit(false);
      setEnableVoid(false);
      clearFields();
      resetCardDetails();
      fetchCards();
      checkCanadianCustomer();
      const cardsOnOpen = creditCardArrayList?.length ? creditCardArrayList : [];
      setAuthorizedCardData(cardsOnOpen);

      if (isEditMasterExpress) {
        // Recalculate from the persisted card list instead of the previous (stale) state
        const value = computeEMXRemaining(cardsOnOpen);
        setRemainingAmountValue(value);
        setChargeAmount(Math.max(value, 0).toFixed(2));
        if (unitPK) fetchPreExistingCards();
      }
    }
  }, [show, customerId]);

  const fetchPreExistingCards = () => {
    if (creditCardArrayList?.length === 0) {
      setLoading1(true);
      CreditCardModalService.fetchPreExistingCards(unitPK)
        .then((response) => {
          setAuthorizedCardData(formatPreExistingCards(response.data));
        })
        .finally(() => {
          setLoading1(false);
        });
    }
  };

  /* Setting the pre-existing credit card information to an array */
  const formatPreExistingCards = (data = []) => {
    return data.map((card) => ({
      creditCardNumber: card?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X"),
      unmaskedCardNumber: card?.creditCardNumber,
      expirationDate: card?.expirationDate,
      billingAddress: card?.billingAddress?.trim(),
      billingZipcode: card?.billingZipcode?.trim(),
      amount: Number(card?.amount),
      source: programName === "Reroute" || programName === "Undispatches" ? source : card?.source,
      preExisting: card?.preExisting,
      charged: card?.charged,
      ttid: card?.ttid,
      monetraChargePK: card?.monetraChargePK,
      voided: card?.voided,
      edited: false,
      securityCode: card.securityCode,
      unitFK: unitPK,
      customerPK: customerId ? customerId : 0,
      addUserFk: card.addUserFk,
      addDate: formatDatetimeToDate(card.addDate),
    }));
  };

  const authorizeHandler = () => {
    if (loading) return; // Prevent multiple clicks during API calls
    setLoading(true); // Disable button
    let newArrData = null;
    newArrData = authorizedCardData?.find(
      (i) =>
        i.unmaskedCardNumber === unmaskedCardNumber &&
        (!i?.preExisting || programName !== "EditMasterExpress")
    );
    if (newArrData) {
      toast.error(manuallyEnter ? "Card Already Authorized" : "Card Already Exist");
      setLoading(false);
      return;
    }
    const enteredCreditCard = {
      creditCardNumber: unmaskedCardNumber,
      expirationDate: expDate,
      customerPK: customerId ? customerId : 0,
      amount: 0,
      securityCode: secCode || String(),
      cardholdername: "",
      street: billAddress || String(),
      zip: billZipCode || String(),
    };
    CreditCardModalService.verifyCardDetails(enteredCreditCard)
      .then((response) => {
        const data = response?.data;
        if (data?.transactionResponse?.responseCode === "1") {
          handleSuccessAuthorization(response);
          setLoading(false);
        } else if (data?.transactionResponse?.responseCode !== "1") {
          if (data?.transactionResponse?.errors[0].errorCode === "6") {
            toast.error("Card Verification Failed. Invalid Credit Card Number!");
          } else if (data?.transactionResponse?.errors[0].errorCode === "7") {
            toast.error("Card Verification Failed. Invalid Expiration Date!");
          } else if (data?.transactionResponse?.errors[0].errorCode === "8") {
            toast.error("Card Verification Failed. Card Expired Date!");
          } else {
            toast.error("Card Verification Failed!");
          }
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error("Error occured", e);
        toast.error("Card Verification Failed!");
        setLoading(false);
      });
  };

  const creditHandler = () => {
    if (selectedCardData) {
      setChargeAmount(-Math.abs(Number(selectedCardData?.amount).toFixed(2)));
      setDisableChargeAmount(false);
      setEnableCredit(false);
      setEnableSave(true);
      setSelectedCardData(null);
      setCredit(true);
    }
  };

  const chargeAmountValidation = (value, max, min) => {
    if (value == null || value === "" || value === undefined) {
      return ""; // return empty string if value is empty
    }
    // Allow only digits, period, and hyphen (for credit scenarios)
    let correctedValue = !credit ? value?.replace(/[^-\d.]/g, "") || "" : value?.replace(/[^\d.-]/g, "");
    // Ensure only one decimal point is allowed
    const decimalCount = (correctedValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      correctedValue = correctedValue.slice(0, correctedValue.lastIndexOf("."));
      return Number(correctedValue).toFixed(2);
    }
    // Split the value by the decimal point
    const parts = correctedValue.split(".");
    if (parts[0].length > 7) {
      correctedValue = correctedValue.slice(0, 7); // Limit integer part to 7 digits
      return Number(correctedValue).toFixed(2);
    }
    // Restrict the decimal part to a maximum of 2 digits
    if (parts.length === 2 && parts[1].length > 2) {
      correctedValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
      return Number(correctedValue).toFixed(2);
    }
    // Validate against the max limit
    if (Number(max) > 0 && Number(correctedValue) > Number(max)) {
      if (editChargeAmount) {
        return Number(selectedCardData?.amount);
      } else {
        return Number(max); // if the number exceeds the maximum, return the maximum
      }
    }
    // Refund (-ve) case
    if (Number(max) < 0) {
      if (Number(correctedValue) < Number(max) || Number(correctedValue) >= 0) {
        return Number(max).toFixed(2);
      }
      if (Number(correctedValue) > Number(max)) {
        return Number(correctedValue).toFixed(2);
      }
    }
    // Validate against the min limit (for credit scenarios)
    if (credit) {
      if (min && (Number(correctedValue) < Number(min) || Number(correctedValue) >= 0)) {
        return Number(min);
      } else {
        return Number(correctedValue).toFixed(2); // Return value for credit scenarios
      }
    }
    // Keep partial input as typed (e.g. "50.0", "50.", "5") so Backspace can edit/clear it; onBlur formats to 2 decimals
    if (/^\d*\.?\d{0,2}$/.test(correctedValue)) {
      return correctedValue;
    }
    return Number(correctedValue).toFixed(2); // Return the valid number
  };

  const handleChargeAmount = (e) => {
    let value = e.target.value;
    // Allow direct input for editing
    setChargeAmount(Number(selectedCardData?.amount).toFixed(2));
    if (value === "" || value === null || value === undefined) {
      setChargeAmount(credit ? "-" : "");
    } else {
      if (credit) {
        const previousObject = authorizedCardData?.find((i, index) => index === selectedCardIndex);
        let value = chargeAmountValidation(e.target.value, remainingAmount, -Math.abs(previousObject.amount));

        setChargeAmount(
          value == "-" ? Number(value).toFixed(2) : Number(Math.abs(Number(value)) * -1).toFixed(2)
        );
      } else if (editChargeAmount) {
        setChargeAmount(
          chargeAmountValidation(
            e.target.value,
            programName === "EditInvoice"
              ? Number(displayAmount)
              : Number(remainingAmount) + Number(selectedCardData?.amount)
          )
        );
      } else {
        setChargeAmount(chargeAmountValidation(e.target.value, remainingAmount));
      }
    }
  };

  const voidHandler = () => {
    if (selectedCardData && (selectedCardIndex || selectedCardIndex === 0)) {
      const previousValue = authorizedCardData[selectedCardIndex]?.amount;
      setAuthorizedCardData((state) =>
        state.map((item, index) =>
          index === selectedCardIndex ? { ...item, voidFlag: true, voided: true, edited: true } : item
        )
      );
      setChargeAmount(Number(remainingAmount).toFixed(2));
      resetCardDetails();
      setDisableFields(true);
      setManuallyEnter(false);
      setDisableChargeAmount(true);
      setIsZipValid(false);
      setEnableCancel(false);
      setCredit(false);
      setEnableVoid(false);
      setSelectedCardData(null);
      const newRemainAmt = Number(remainingAmount) + Number(previousValue);
      setRemainingAmountValue(newRemainAmt);
      setSelectedCardIndex(-1);
    } else {
      toast.error("Selected card not found in the list");
      console.error("Selected card not found in the list");
    }
  };

  const saveHandler = () => {
    setEnableEdit(false);
    setEnableSave(false);
    // const previousValue = authorizedCardData[selectedCardIndex]?.creditFlag? authorizedCardData[selectedCardIndex]?.amount*-1:authorizedCardData[selectedCardIndex]?.amount;
    const previousValue = authorizedCardData[selectedCardIndex]?.amount;
    if (previousValue && !credit) {
      const signedPeviousAmount = authorizedCardData[selectedCardIndex]?.creditFlag
        ? Number(previousValue) * -1
        : previousValue;
      let temp = Number(chargeAmount) < 0 ? Number(chargeAmount) * -1 : Number(chargeAmount);
      setAuthorizedCardData((card) =>
        card.map((item, index) =>
          index === selectedCardIndex
            ? {
                ...item,
                amount: temp,
                creditFlag: credit || !(Number(chargeAmount) > 0),
                edited: authorizedCardData[selectedCardIndex]?.edited || credit,
                voidFlag: false,
                purchaseFlag: (Number(chargeAmount) > 0 && !credit && dispatched) || false,
                preAuthFlag: Number(chargeAmount) > 0 && !credit && !dispatched,
                authCompleteFlag: false,
              }
            : item
        )
      );

      setDisableChargeAmount(true);
      setEnableSave(false);
      setEnableCancel(false);
      setEnableDelete(false);
      setIsZipValid(false);
      resetCardDetails();
      setSelectedCardData(null);
      setSelectedCardIndex(-1);
      const newRemainAmt = Number(remainingAmount) - Number(chargeAmount) + Number(signedPeviousAmount);
      setRemainingAmountValue(newRemainAmt);
      setChargeAmount(Number(newRemainAmt).toFixed(2));
      setLoading(false); // Re-enable button
    } else {
      setAuthorizedCardData([
        ...authorizedCardData,
        {
          creditCardNumber: creditCardNumber,
          unmaskedCardNumber: unmaskedCardNumber,
          expirationDate: expDate,
          billingAddress: billAddress ? billAddress : String(),
          billingZipcode: billZipCode ? billZipCode : String(),
          amount: Math.abs(Number(chargeAmount)),
          source: source,
          customerCreditCardPK: !manuallyEnter ? customerCreditCardPK : null,
          cardType: "",
          cardHolderName: "",
          securityCode: secCode || String(),
          creditFlag: credit || !(Number(chargeAmount) > 0),
          edited: credit,
          voidFlag: false,
          purchaseFlag: (Number(chargeAmount) > 0 && !credit && dispatched) || false,
          preAuthFlag: Number(chargeAmount) > 0 && !credit && !dispatched,
          authCompleteFlag: false,
          customerPK: customerId ? customerId : 0,
          ttid: null,
          refundAmount: programName === "Reroute" ? incomingAmount : null,
        },
      ]);

      const newRemainingAmount = parseFloat(remainingAmount) - parseFloat(chargeAmount);
      setRemainingAmountValue(parseFloat(newRemainingAmount.toFixed(2)));
      setChargeAmount(parseFloat(newRemainingAmount.toFixed(2)));
      resetCardDetails();
      setDisableFields(true);
      setManuallyEnter(false);
      setDisableChargeAmount(true);
      setIsZipValid(false);
      setEnableCancel(false);
      setCredit(false);
      setSelectedCardIndex(-1);
      setAutoPopulate(false);
    }
  };

  useEffect(() => {
    setCreditCardArrayList && show && setCreditCardArrayList(authorizedCardData);

    if (checkingPreExistCredit) {
      let check = authorizedCardData?.some((item) => item.edited) && Number(remainingAmount) != 0;
      checkingPreExistCredit(check);
    }
  }, [authorizedCardData]);

  useEffect(() => {
    setRemainingAmount && setRemainingAmount(remainingAmount);
  }, [remainingAmount]);

  //for setting amount
  useEffect(() => {
    if (!incomingAmount) {
      setDisplayAmount(0);
      setRemainingAmountValue(0);
    } else {
      setDisplayAmount(Number(incomingAmount).toFixed(2));
      if (source === "Reroute") {
        setAuthorizedCardData([]);
        setCreditCardArrayList([]);
        setRemainingAmountValue(Number(incomingAmount).toFixed(2));
        setChargeAmount(Number(incomingAmount).toFixed(2));
        return;
      }
      // Handling balanceAmount + ve case
      if (authorizedCardData?.length && balanceAmount > 0) {
        setRemainingAmountValue(Number(balanceAmount).toFixed(2));
        setChargeAmount(Number(balanceAmount).toFixed(2));
      } else if (authorizedCardData?.length && balanceAmount <= 0) {
        setRemainingAmountValue(Number(balanceAmount).toFixed(2));
        setChargeAmount(Number(0).toFixed(2));
      } else {
        setRemainingAmountValue(Number(incomingAmount).toFixed(2));
        setChargeAmount(Number(incomingAmount).toFixed(2));
      }
    }
  }, [incomingAmount]);

  // Edit Master Express: keep Remaining Amount in sync with the card list / invoice difference
  useEffect(() => {
    if (!isEditMasterExpress) return;
    setRemainingAmountValue(computeEMXRemaining(authorizedCardData));
  }, [authorizedCardData, incomingAmount]);

  useEffect(() => {
    if (resetAmounts && show) {
      setRemainingAmountValue(Number(incomingAmount.toFixed(2)));
      setChargeAmount(Number(incomingAmount).toFixed(2));
      setTimeout(() => {
        setResetAmounts && setResetAmounts(false);
      }, 200);
    }
  }, [resetAmounts, show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className="lookupModal creditCardModal"
      dialogClassName={`modal-left lookupFix`}
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-18 h-100">Credit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={`p-2 mb-0 ${styles.miscConatiner}`} style={{ minHeight: "700px" }}>
          <Row className={styles.creditCardTable}>
            <Col xs={6} className={" ps-0 p-l-10"}>
              <p className="mt-3 ">Credit Cards Authorized</p>
              <div className={`border border-secondary overflow-auto ${styles.plantNameTable}`}>
                <table className="table border-bottom  table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th className="col-6">Card Number</th>
                      <th className="col-4">Authorized Amount</th>
                      {programName === "EditMasterExpress" && <th className="col">Charged</th>}
                      {programName === "EditMasterExpress" && <th className="col">Voided</th>}
                    </tr>
                  </thead>
                  <tbody>{renderAuthorizedDatas}</tbody>
                </table>
                {authorizedCardData?.length === 0 && !(loading || loading1 || loading2) && (
                  <p className="pt-3" align="center" style={{ fontSize: "0.8rem" }}>
                    No Records Available
                  </p>
                )}
              </div>
              <Row className="d-flex justify-content-between">
                <Col></Col>
                <Col className="d-flex justify-content-end">
                  <div>
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <button
                          className="btn btn-secondary font-12 btn-sm btn-medium-with"
                          disabled={Number(remainingAmount) === 0 || selectedCardIndex >= 0 || !disableFields}
                          onClick={newHandler}
                        >
                          New
                        </button>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <button
                          className="btn btn-secondary font-12 btn-sm btn-medium-with"
                          disabled={!enableEdit}
                          onClick={editHandler}
                        >
                          Edit
                        </button>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <button
                          className="btn btn-secondary font-12 btn-sm btn-medium-with"
                          disabled={!enableSave || Number(chargeAmount) === 0}
                          onClick={saveHandler}
                        >
                          Save
                        </button>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <button
                          className="btn btn-secondary font-12 btn-sm btn-medium-with"
                          disabled={!enableCancel}
                          onClick={cancelHandler}
                        >
                          Cancel
                        </button>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <button
                          className="btn btn-secondary font-12 btn-sm btn-medium-with"
                          disabled={authorizedCardData?.length === 0 || !enableDelete}
                          onClick={deleteHandler}
                        >
                          Delete
                        </button>
                      </Col>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={5} sm={5} md={5} xs={5} className={"ps-0"}>
              <div className="ms-4">
                <div>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}>{amountTitle}</Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className="customFormControl"
                        id="invoiceamt"
                        name="invoiceamt"
                        type="search"
                        value={Number(invoiceDifference).toFixed(2)}
                        maxLength={30}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Remaining Amount</Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className="customFormControl"
                        id="remainamt"
                        name="remainamt"
                        type="search"
                        value={Number(remainingAmount).toFixed(2)}
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        disabled
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Charge Amount</Form.Label>
                    </Col>
                    <Col xs={4} md={4} className="p-0">
                      <input
                        className={`customFormControl`}
                        id="chargeamt"
                        name="chargeamt"
                        type="text"
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={chargeAmount}
                        disabled={disableChargeAmount}
                        onChange={handleChargeAmount}
                        onBlur={() => {
                          if (!isNaN(Number(chargeAmount)) && chargeAmount !== "") {
                            const temp = parseFloat(Number(chargeAmount)).toFixed(2);
                            setChargeAmount(temp);
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-t-30">
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Customer Credit Card</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className={`p-0 `}>
                      <Form.Select
                        className="customFormControl py-0"
                        name="custcredcard"
                        id="custcredcard"
                        onChange={cardSelectHandler}
                        disabled={disableFields}
                        value={defaultValue}
                      >
                        <option value="00">--Select--</option>
                        {renderDropData}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Credit Card Number</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        className={`customFormControl 
                       ${
                         manuallyEnter
                           ? creditCardNumber?.length >= 15
                             ? "borderGreen"
                             : remainingAmount === 0
                               ? ""
                               : "borderRed"
                           : ""
                       }`}
                        id="crecarnum"
                        name="crecarnum"
                        type="search"
                        maxLength={16}
                        autoComplete="one-time-code"
                        spellCheck={false}
                        aria-autocomplete="none"
                        value={creditCardNumber}
                        onBlur={(e) => {
                          setUnmaskedCardNumber(creditCardNumber);
                          setCreditCardNumber(creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X"));
                        }}
                        onInput={(e) => {
                          const cardNumber = e.target.value?.replace(/[^\d:.\d{1}]/g, "");
                          setCreditCardNumber(cardNumber);
                          setUnmaskedCardNumber(e.target.value);
                        }}
                        disabled={!manuallyEnter || disableFields}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group   align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Expiration Date</Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0 align-items-center d-flex">
                      <input
                        className={`customFormControl ${
                          manuallyEnter
                            ? remainingAmount === 0
                              ? ""
                              : expDate?.length > 4
                                ? dateErr
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                            : ""
                        }`}
                        id="expdate"
                        name="expdate"
                        type="text"
                        maxLength={5}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={expDate}
                        placeholder="mm/yy"
                        disabled={disableFields || !manuallyEnter}
                        onChange={handlerExpDate}
                      />
                      <p className="text-danger mb-0 ms-3 col-6 text-capitalize"> {dateErr}</p>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Billing Address</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className="customFormControl"
                        id="billadd"
                        name="billadd"
                        type="search"
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={billAddress}
                        disabled={disableFields || !manuallyEnter}
                        onChange={(e) => {
                          setBillAddress(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Billing Zipcode</Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        className={`customFormControl
                       ${
                         !billZipCode
                           ? ""
                           : autoPopulate
                             ? isZipValid
                               ? ""
                               : "borderRed"
                             : manuallyEnter
                               ? billZipCode
                                 ? canadian
                                   ? canadianZipValidationState == null
                                     ? ""
                                     : canadianZipValidationState
                                       ? !isZipValid
                                         ? "borderRed"
                                         : ""
                                       : "borderRed"
                                   : normalZipValidationState == null
                                     ? ""
                                     : normalZipValidationState
                                       ? !isZipValid
                                         ? "borderRed"
                                         : ""
                                       : "borderRed"
                                 : "borderRed"
                               : ""
                       }`}
                        id="billzip"
                        name="billzip"
                        type="search"
                        maxLength={canadian ? 7 : 10}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={billZipCode}
                        disabled={disableFields || !manuallyEnter}
                        onBlur={checkZipCode}
                        onChange={(e) => {
                          setIsZipValid(false);
                          canadian ? canadianZipValidation(e) : normalZipValidation(e);
                          let value = e.target.value;
                          if (canadian) {
                            value = value.toUpperCase()?.replace(/[^A-Z0-9 ]/g, "");
                            if (value?.length > 3 && value.indexOf(" ") === -1) {
                              value = value.slice(0, 3) + " " + value.slice(3);
                            }
                          } else {
                            value = value?.replace(/[^0-9\-]/g, "");
                            if (value?.length > 5 && value.indexOf("-") === -1) {
                              value = value.slice(0, 5) + "-" + value.slice(5);
                            }
                          }
                          setBillZipCode(value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Security Code</Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        className={`customFormControl ${
                          manuallyEnter
                            ? secCode?.length > 2 && secCode?.length < 5
                              ? "borderGreen"
                              : "borderRed"
                            : ""
                        }`}
                        id="seccode"
                        name="seccode"
                        disabled={disableFields || !manuallyEnter}
                        type="search"
                        maxLength={4}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={secCode}
                        onChange={(e) => {
                          const value = e.target.value;
                          // allow only digits
                          if (/^\d*$/.test(value)) {
                            setSecCode(value);
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <button
                        className="btn btn-secondary font-12 btn-sm btn-medium-with"
                        disabled={
                          !(
                            creditCardNumber?.length >= 15 &&
                            expDate?.length > 4 &&
                            !dateErr &&
                            remainingAmount !== 0 &&
                            (isZipValid || !billZipCode?.trim()) &&
                            String(chargeAmount)?.trim() !== "" &&
                            !isNaN(Number(chargeAmount)) &&
                            Number(chargeAmount) !== 0 &&
                            !selectedCardData &&
                            secCode?.length > 2 &&
                            !loading &&
                            !credit
                          )
                        }
                        onClick={authorizeHandler}
                      >
                        Authorize Card
                      </button>
                    </Col>
                  </Form.Group>
                  {programName === "EditMasterExpress" && (
                    <>
                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <button
                            className="btn btn-secondary font-12 btn-sm btn-medium-with"
                            disabled={!enableCredit}
                            onClick={creditHandler}
                          >
                            Credit
                          </button>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <button
                            className="btn btn-secondary font-12 btn-sm btn-medium-with"
                            disabled={!enableVoid}
                            onClick={voidHandler}
                          >
                            Void
                          </button>
                        </Col>
                      </Form.Group>
                    </>
                  )}
                </div>
              </div>
              <div></div>
              {(loading || loading1 || loading2) && <LoadingIcon />}
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreditCardComponent;
