import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import formatString from "../../../../../utils/validation/ExpirationDate";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import creditCardService from "../../../../../service/creditCard/creditCard.service";
import { getCurrentCompany } from "../../../../../utils/utils";
import {
  setOrderEntrySchemaConditions,
  setIsCreditCardDetailsPartial,
  setCreditCardDetailsInComplete,
  setIsCreditCardRequired,
} from "../../../../../store/slices/unit.slice";
import useDebouncer from "../../../../../hooks/useDebouncer";

const useCreditCard = () => {
  const dispatch = useDispatch();

  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const invoiceAmount = useSelector((state) => state.unit.invoiceAmount);
  const creditCardTriggerKey = useSelector((state) => state.unit.creditCardTriggerKey);

  const { watch, setValue, trigger, getValues } = useFormContext();
  const customerValue = getValues("customer");
  const [chargeAmount, setChargeAmount] = useState(0);
  const [unitsPerCharge, setUnitsPerCharge] = useState(1);
  const [unitsPerChargeFlag, setUnitsPerChargeFlag] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [unmaskedCardNumber, setUnMaskedCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [billAddress, setBillAddress] = useState("");
  const [billZipCode, setBillZipCode] = useState("");
  const [cardDatas, setCardDatas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [totalBatchLoadCount, setTotalBatchLoadCount] = useState(0);
  const [disableSave, setDisableSave] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [normalZipValidationState, setNormalZipValidationState] = useState(null);
  const [canadianZipValidationState, setCanadianZipValidationState] = useState(null);
  const [checkZip, setCheckZip] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [securityCode, setSecurityCode] = useState("");
  const [remainAmount, setRemainAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disableChargeAmount, setDisableChargeAmount] = useState(true);
  const [disableUnitperCharge, setDisableUnitperCharge] = useState(true);
  const [remainingUnits, setRemainingUnits] = useState(0);
  const [authorizedUnits, setAuthorizedUnits] = useState(0);
  const [defaultValue, setDefaultValue] = useState("00");
  // for handling expiration date validation
  const [authorizedCardDatas, setAuthorizedCardDatas] = useState([]);

  const authorizedCardsSum =
    authorizedCardDatas
      ?.filter((item) => !item?.preExisting)
      .reduce((sum, card) => sum + parseFloat(card?.amount), 0) || 0;

  const balanceAmount =
    Number(authorizedCardsSum) === 0 ? invoiceAmount : Number(invoiceAmount) - authorizedCardsSum;

  const customer = useWatch({ name: "customer" });

  // A new card picked from the Customer Credit Card dropdown is saved without authorizing;
  // only manually entered cards are authorized (Bug 4145)
  const isCustomerCardSelected = editMode && selectedIndex === null && !!defaultValue && defaultValue !== "00";

  /**
   *  used to set Expire date validation
   **/
  const HandlerExpDate = (e) => {
    const value = e.target.value;
    setExpDate(formatString(value));

    var dateObj = new Date();
    var currentMonth = dateObj.getUTCMonth() + 1; //months from 1-12 // number
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

  /**
   *  used to set zip validation
   **/
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

  /**
   *  used to check zipcode exist or not
   **/
  const checkZipCodeExist = (e) => {
    let uszip = e.target.value;

    // If NOT Canadian and length > 5 → take only first 5 digits
    if (!selectedCustomer?.canadian && billZipCode?.length > 5) {
      uszip = uszip.slice(0, 5);
    }

    // If empty, send null
    if (uszip === "") {
      uszip = null;
    }

    OrderEntryServices.isZipCodeExisting(uszip)
      .then((response) => {
        setCheckZip(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   *  used to showing authorized card details
   **/

  const renderAuthorizedDatas = authorizedCardDatas?.map((i, index) => {
    const amount = typeof i.amount === "number" ? i.amount.toFixed(2) : parseFloat(i.amount).toFixed(2);
    return (
      <tr
        onDoubleClick={(e) => onTableRowDOubleClick(i, index, e)}
        key={index}
        className={`${index === selectedIndex ? "tableSelected" : ""} `}
      >
        <td>{i?.creditCardNumber}</td>
        <td>{amount}</td>
      </tr>
    );
  });

  /**
   * Function for table row double click
   **/

  const onTableRowDOubleClick = (cardData, index) => {
    setDisableChargeAmount(true);
    setDisableUnitperCharge(true);
    fetchCardData(cardData, true);
    setSelectedIndex(index);
    setEditMode(false);
    setCardNumber(cardData?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X"));
    setExpDate(cardData?.expirationDate ? cardData?.expirationDate : cardData?.creditCardExpirationDate);
    setBillAddress((cardData?.billingAddress ? cardData?.billingAddress : cardData?.creditCardAddress) || "");
    setBillZipCode(cardData?.billingZipcode ? cardData?.billingZipcode : cardData?.creditCardPostalCode);
    setSecurityCode(cardData?.securityCode);
    setDefaultValue(cardData?.customerCreditCardPK || "00");
  };

  /**
   * card selection function
   **/
  const cardSelectHandler = (e) => {
    let value = e.target.value;
    if (value === "00") {
      resetCardDetails();
      setDefaultValue("00");
    } else {
      let cardData = cardDatas?.find((i) => i.customerCreditCardPK == value);

      if (cardData?.creditCardNumber) {
        cardData = {
          ...cardData,
          unmaskedCardNumber: cardData?.creditCardNumber,
        };
      }
      resetCardDetails();
      fetchCardData(cardData);
    }
  };

  /**
   * setting the selected card information
   **/
  const fetchCardData = (cardData, isDoubleClick) => {
    setUnMaskedCardNumber(cardData?.creditCardNumber);
    setCardNumber(cardData?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X"));
    setExpDate(cardData?.expirationDate ? cardData?.expirationDate : cardData?.creditCardExpirationDate);
    setBillAddress((cardData?.billingAddress ? cardData?.billingAddress : cardData?.creditCardAddress) || "");
    setBillZipCode(cardData?.billingZipcode ? cardData?.billingZipcode : cardData?.creditCardPostalCode);
    setSecurityCode(cardData?.cardCode);
    setDefaultValue(cardData?.customerCreditCardPK || "00");
    if (isDoubleClick) {
      if (customer.batchLoads) {
        const count = Number(cardData?.amount) / Number(invoiceAmount);
        setChargeAmount(Number(cardData?.amount).toFixed(2));
        setUnitsPerCharge(count);
      } else {
        setChargeAmount(Number(cardData?.amount).toFixed(2));
      }
    }

    setCheckZip(true);
  };

  /**
   *  used to save record
   **/
  const saveHandler = () => {
    if (isCustomerCardSelected) {
      addCardToList();
      return;
    }
    setAuthorizedCardDatas((card) =>
      card.map((item, index) =>
        index === selectedIndex
          ? { ...item, amount: Number(chargeAmount), amountBatchCount: unitsPerCharge }
          : item
      )
    );

    if (customer.batchLoads) {
      const unitCount = Number(remainingUnits);
      const remainAmt = (unitCount - Number(unitsPerCharge)) * Number(invoiceAmount);
      const remainUnitCount = Number(chargeAmount) / Number(invoiceAmount);
      const currentUnitsPerCharge = Number(remainingUnits) - remainUnitCount;
      setRemainAmount(remainAmt.toFixed(2));
      setRemainingUnits((prev) => prev - remainUnitCount);
      setChargeAmount(remainAmt.toFixed(2));
      setUnitsPerCharge(currentUnitsPerCharge);
    } else {
      setChargeAmount(Number(0).toFixed(2));
    }

    setDisableChargeAmount(true);
    setDisableUnitperCharge(true);
    setDisableSave(false);
    resetCardDetails();
    setSelectedIndex(null);
  };

  /**
   * fetch creditcards of selected customer
   **/
  const fetchCards = () => {
    OrderEntryServices.fetchcustomercreditcarddetails(selectedCustomer.customerPK)
      .then((res) => {
        setCardDatas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!customer.creditCardPrepaid) return;
    const invoice = Number(invoiceAmount || 0);
    cancelHandler();
    if (customer.batchLoads) {
      const totalAmount = totalBatchLoadCount * invoice;

      setUnitsPerCharge(totalBatchLoadCount);
      setChargeAmount(totalAmount.toFixed(2));
      setRemainAmount(totalAmount.toFixed(2));
      setRemainingUnits(totalBatchLoadCount);
    } else {
      setChargeAmount(invoice.toFixed(2));
      setRemainAmount(invoice);
    }
  }, [invoiceAmount, customer.batchLoads, totalBatchLoadCount, customer.creditCardPrepaid]);

  useEffect(() => {
    if (customerValue.creditCardPrepaid) {
      fetchCards();
    }
  }, [customerValue.creditCardPrepaid]);

  /**
   * reset the card details
   **/
  const resetCardDetails = () => {
    setCardNumber("");
    setExpDate("");
    setBillAddress("");
    setBillZipCode("");
    setDefaultValue("00");
    setCheckZip(false);
    setDateErr(false);
    setSecurityCode("");
    if (selectedCustomer?.canadian) {
      setCanadianZipValidationState(null);
    } else {
      setNormalZipValidationState(null);
    }
  };

  /**
   * used to set expiry date to yyyy-mm format
   **/
  const formatExpiryDate = (value) => {
    if (!value) return "";

    const match = value.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return "";

    const month = match[1];
    const year = match[2];

    // basic month validation
    if (Number(month) < 1 || Number(month) > 12) return "";

    return `20${year}-${month}`;
  };

  /**
   *Entered card details
   **/
  const currentCompany = getCurrentCompany();

  const enteredCreditCard = {
    creditCardNumber: unmaskedCardNumber,
    expirationDate: formatExpiryDate(expDate),
    amount: chargeAmount,
    securityCode: securityCode,
    company: currentCompany?.name,

    customerPk: selectedCustomer.customerPK,
  };

  /**
   *Used to to verify card details
   **/
  const authorizeHandler = () => {
    if (loading) return; // Prevent multiple clicks during API calls
    setLoading(true); // Disable button
    creditCardService
      .verifyCardDetails(enteredCreditCard)
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
      .catch(() => {
        toast.error("Card Verification Failed!");
        setLoading(false);
      })
      .finally(() => {
        resetCardDetails();
        setLoading(false);
      });
  };

  /**
   *add card details to table
   **/
  const handleSuccessAuthorization = (response) => {
    addCardToList(response.data?.cardtype);
    toast.success("Credit Card Authorized");
  };

  /**
   *add card to table (authorized manual card or saved customer card)
   **/
  const addCardToList = (cardType = "") => {
    setAuthorizedCardDatas([
      ...authorizedCardDatas,
      {
        creditCardNumber: cardNumber,
        unmaskedCardNumber: unmaskedCardNumber,
        expirationDate: expDate,
        billingAddress: billAddress ? billAddress : String(),
        billingZipcode: billZipCode ? billZipCode : String(),
        amount: Number(chargeAmount),
        source: "Order Entry",
        customerCreditCardPK: isCustomerCardSelected ? defaultValue : null,
        cardType: cardType,
        cardHolderName: "",
        amountBatchCount: Number(unitsPerCharge),
        securityCode: securityCode || String(),
        charged: false,
        preAuthFlag: true,
        processed: false,
        authCompleteFlag: false,
        purchaseFlag: false,
        customerPK: selectedCustomer.customerPK,
      },
    ]);
    // setAuthorizedFlag(true);
    setEditMode(false);

    if (customer.batchLoads) {
      const batchCount = remainingUnits - unitsPerCharge;
      const chargeAmt = Number(chargeAmount);
      const remainingAmt = remainAmount - chargeAmt;

      setRemainingUnits(batchCount);

      setRemainAmount(remainingAmt.toFixed(2));

      setChargeAmount(remainingAmt.toFixed(2));
      setUnitsPerCharge(batchCount);
    } else {
      const newRemainingAmount = parseFloat(remainAmount) - parseFloat(chargeAmount);
      setRemainAmount(parseFloat(newRemainingAmount.toFixed(2)));
      setChargeAmount(Number(newRemainingAmount.toFixed(2)) || 0);
    }

    resetCardDetails();
    setDisableChargeAmount(true);
    setDisableUnitperCharge(true);
    setSelectedIndex(null);
  };

  /**
   *Edit button handler funtion
   **/
  const editHandler = () => {
    setDisableSave(true);
    setEditMode(false);
    if (customer.batchLoads) {
      setDisableUnitperCharge(false);
      const cardTotalBatchCount =
        authorizedCardDatas
          ?.filter((item) => !item?.preExisting)
          .reduce((sum, card) => sum + parseFloat(card?.amountBatchCount), 0) || 0;
      const selectedCardBatchCount = authorizedCardDatas[selectedIndex]?.amountBatchCount || 0;

      const currentRemainUnitsCount = totalBatchLoadCount - cardTotalBatchCount + selectedCardBatchCount;
      setRemainingUnits(currentRemainUnitsCount);
    } else {
      setDisableChargeAmount(false);
    }
  };

  /**
   *Cancel button handler funtion
   **/
  const cancelHandler = () => {
    setEditMode(false);
    resetCardDetails();
    if (customer.batchLoads) {
      setChargeAmount(Number(remainAmount).toFixed(2));
      setUnitsPerCharge(remainingUnits);
    } else {
      setChargeAmount(Number(remainAmount).toFixed(2));
    }
    setDisableSave(false);
    setCheckZip(false);
    setDisableChargeAmount(true);
    setDisableUnitperCharge(true);
    setSelectedIndex(null);
  };

  /**
   *Delete button handler funtion
   **/
  const deleteHandler = () => {
    const remain = Number(remainAmount) || 0;
    const amount = Number(authorizedCardDatas[selectedIndex]?.amount) || 0;
    if (customer.batchLoads) {
      const cardTotalBatchCount =
        authorizedCardDatas
          ?.filter((item) => !item?.preExisting)
          .reduce((sum, card) => sum + parseFloat(card?.amountBatchCount), 0) || 0;

      const selectedCardBatchCount = authorizedCardDatas[selectedIndex]?.amountBatchCount || 0;
      const currentRemainUnitsCount = totalBatchLoadCount - cardTotalBatchCount + selectedCardBatchCount;
      setRemainingUnits(currentRemainUnitsCount);

      const currentRemain = remain + Number(authorizedCardDatas[selectedIndex]?.amount) || 0;
      setRemainAmount(currentRemain.toFixed(2));
      setChargeAmount(currentRemain.toFixed(2));
      setUnitsPerCharge(currentRemainUnitsCount);
    } else {
      const newRemainAmt = remain + amount;
      setRemainAmount(newRemainAmt);
      setChargeAmount(newRemainAmt.toFixed(2));
    }
    setAuthorizedCardDatas(authorizedCardDatas?.filter((_, index) => index !== selectedIndex));
    setSelectedIndex(null);
    resetCardDetails();
  };

  /**
   *New button handler funtion
   **/
  const newHandler = () => {
    setEditMode(true);
    setDisableChargeAmount(false);
    setDefaultValue("00");
    setCheckZip(false);
    resetCardDetails();
    if (customer.batchLoads) {
      setDisableUnitperCharge(false);
      if (Number(remainAmount)) {
        setChargeAmount(Number(remainAmount).toFixed(2));
        setUnitsPerCharge(remainingUnits);
      }
      return;
    }
    setChargeAmount(Number(remainAmount).toFixed(2));
  };

  /**
   *used for  charge amount decimal validation
   **/
  const handleChargeAmount = (e) => {
    const value = e.target.value;
    if (!value) {
      setChargeAmount("");
      return;
    }
    setChargeAmount(chargeAmountVal(value, remainAmount));
  };

  const chargeAmountVal = (value) => {
    // keep only digits and dot
    let max = 0;
    if (selectedIndex >= 0) {
      max = authorizedCardDatas.reduce((sum, item, index) => {
        if (index === selectedIndex) return sum; // skip selected index
        return sum + item.amount;
      }, 0);
      max = invoiceAmount - max;
    }
    let number = value.replace(/[^\d.]/g, "");
    const [intPart, decimalPart] = number.split(".");

    // max 7 digits before decimal
    if (intPart?.length > 7) {
      return number.slice(0, -1);
    }

    // max 2 digits after decimal
    if (decimalPart?.length > 2) {
      return number.slice(0, -1);
    }
    // limit to remaining amount
    if (Number(number) > Number(max)) {
      return max >= 0 ? String(max) : number;
    }

    return number;
  };

  /**
   *  used to set creditcard array to schema
   **/
  useEffect(() => {
    setValue("creditCard.creditCardArray", authorizedCardDatas);
  }, [authorizedCardDatas]);

  //Debounce function
  const debounceUpdate = useDebouncer(() => {
    const creditCard = getValues("creditCard");

    dispatch(
      setOrderEntrySchemaConditions({
        creditCard: { ...creditCard },
      })
    );
  }, 100);
  //Updating invoiceHolds fields dynamically
  const updateCreditCardFields = (fields) => {
    Object.entries(fields).forEach(([key, value]) => {
      setValue(`creditCard.${key}`, value, { shouldValidate: false, shouldDirty: true });
    });

    debounceUpdate();
  };

  /**
   * function for restricting the no: of units to be entered in the units per charge field after every authorization

   **/
  function handleBatchUnits(value) {
    if (!value || isNaN(value)) return "";
    if (authorizedUnits === 0) {
      const count = remainingUnits;
      if (value > count) return parseInt(count);
      return parseInt(value);
    } else {
      if (value > remainingUnits) return parseInt(remainingUnits);
      return parseInt(value);
    }
  }

  /**
   * units per charge validation

   **/
  const handleUnitsPerCharge = (e) => {
    const unitsPerChargeValidation = handleBatchUnits(e.target.value);
    if (customer.batchLoads) {
      const value = Number(unitsPerChargeValidation) * Number(invoiceAmount);
      setChargeAmount(value.toFixed(2));
    }
    setUnitsPerCharge(unitsPerChargeValidation);
  };

  /**
   * Call function to get total number of units in batch load
   */
  useEffect(() => {
    if (
      customer.creditCardPrepaid &&
      customer.batchLoads &&
      customer.firstBatchSequence &&
      customer.lastBatchSequence &&
      customer.firstBatchSequence.length === customer.lastBatchSequence.length &&
      customer.isBatchLoadValid
    ) {
      getTotalUnitsForBatchLoad(customer.firstBatchSequence, customer.lastBatchSequence);
    } else {
      setTotalBatchLoadCount(0);
    }
  }, [
    customer.lastBatchSequence,
    customer.firstBatchSequence,
    customer.batchLoads,
    customer.creditCardPrepaid,
    customer.isBatchLoadValid,
  ]);

  /**
   * For finding the total no: of units in Batch Load
   */
  const getTotalUnitsForBatchLoad = () => {
    OrderEntryServices.batchLoadsUnitsCount(customer.firstBatchSequence, customer.lastBatchSequence)
      .then((response) => {
        const data = response.data;
        setTotalBatchLoadCount(data);
      })
      .catch((err) => {
        setValue("customer.isBatchLoadValid", false, { shouldValidate: true, shouldDirty: true });
        setTotalBatchLoadCount(0);
      });
  };

  /**
   * For calculating total no of units remaining after authorization
   */
  useEffect(() => {
    const totalAuthorizedUnits = authorizedCardDatas.reduce((total, data) => total + data.numberOfUnits, 0);

    setAuthorizedUnits(totalAuthorizedUnits);
    if (!customer.batchLoads) {
      setRemainingUnits(totalBatchLoadCount - authorizedUnits);
    }
    if (totalBatchLoadCount === totalAuthorizedUnits) {
      setUnitsPerChargeFlag(true);
    }
  }, [authorizedUnits, remainingUnits, authorizedCardDatas, totalBatchLoadCount]);

  /**
   * For handling tab colour validation and both incomplete and partial save conditions
   */
  useEffect(() => {
    if (!Number(invoiceAmount)) {
      updateCreditCardFields({
        creditCardTabRequired: true,
      });
      dispatch(setIsCreditCardRequired(false));
      return;
    }
    const totalAmount = authorizedCardDatas.reduce((acc, curr) => Number(acc) + Number(curr.amount), 0);

    if (customer.batchLoads) {
      if (!Number(remainAmount) && totalBatchLoadCount) {
        dispatch(setIsCreditCardRequired(true));
        updateCreditCardFields({
          creditCardTabRequired: true,
        });
      } else {
        dispatch(setIsCreditCardRequired(false));
        updateCreditCardFields({
          creditCardTabRequired: false,
        });
      }
      const partialCheck = Number(totalAmount) === Number(totalBatchLoadCount) * Number(invoiceAmount);
      dispatch(setIsCreditCardDetailsPartial(false));
      dispatch(setCreditCardDetailsInComplete(false));
      updateCreditCardFields({
        creditCardTabRequired: !partialCheck,
      });
      return;
    }

    updateCreditCardFields({
      creditCardTabRequired: false,
    });

    if (Number(totalAmount) !== 0 && Number(totalAmount) < Number(invoiceAmount)) {
      // setChargeAmountFlag(false);
      dispatch(setIsCreditCardRequired(false));
      dispatch(setIsCreditCardDetailsPartial(true));
      dispatch(setCreditCardDetailsInComplete(false));
    } else if (Number(totalAmount) === 0) {
      //   setChargeAmountFlag(false);
      dispatch(setIsCreditCardRequired(false));
      dispatch(setCreditCardDetailsInComplete(true));
      dispatch(setIsCreditCardDetailsPartial(false));
    } else if (Number(totalAmount) === Number(invoiceAmount) && !customer.batchLoads) {
      //  setChargeAmountFlag(true);
      dispatch(setIsCreditCardRequired(true));
      dispatch(setIsCreditCardDetailsPartial(false));
      dispatch(setCreditCardDetailsInComplete(false));
    } else {
      //   setChargeAmountFlag(false);
      dispatch(setIsCreditCardRequired(false));
      dispatch(setCreditCardDetailsInComplete(false));
    }
  }, [
    authorizedCardDatas,
    remainAmount,
    unitsPerCharge,
    totalBatchLoadCount,
    invoiceAmount,
    customer.batchLoads,
  ]);

  /**
   * Used to clear fields when creditCardPrepaid=false
   */
  useEffect(() => {
    if (!customer.creditCardPrepaid || creditCardTriggerKey) {
      resetCardDetails();
      setAuthorizedCardDatas([]);
      dispatch(setIsCreditCardRequired(false));
      dispatch(setIsCreditCardDetailsPartial(false));
      dispatch(setCreditCardDetailsInComplete(false));
      if (invoiceAmount) {
        setRemainAmount(invoiceAmount);
      } else {
        setRemainAmount(Number(0).toFixed(2));
      }
      setChargeAmount(Number(0).toFixed(2));
    }
  }, [customer.creditCardPrepaid, creditCardTriggerKey]);

  // Setting Remaining & Charge Amount based on balance amount
  useEffect(() => {
    if (customer.batchLoads) return;

    if (authorizedCardDatas?.length && balanceAmount > 0) {
      setRemainAmount(Number(balanceAmount).toFixed(2));
      setChargeAmount(Number(balanceAmount).toFixed(2));
    }
    if (authorizedCardDatas?.length && balanceAmount <= 0) {
      setRemainAmount(Number(balanceAmount).toFixed(2));
      setChargeAmount(Number(0).toFixed(2));
    }
  }, [authorizedCardDatas]);

  useEffect(() => {
    setAuthorizedCardDatas([]);
    dispatch(setIsCreditCardDetailsPartial(true));
  }, [invoiceAmount, customer.batchLoads]);

  return {
    invoiceAmount,
    remainAmount,
    selectedIndex,
    setSelectedIndex,
    cardNumber,
    setCardNumber,
    expDate,
    setExpDate,
    billAddress,
    setBillAddress,
    billZipCode,
    setBillZipCode,
    editMode,
    setEditMode,
    unmaskedCardNumber,
    setUnMaskedCardNumber,
    HandlerExpDate,
    normalZipValidation,
    canadianZipValidation,
    normalZipValidationState,
    canadianZipValidationState,
    checkZipCodeExist,
    checkZip,
    dateErr,
    setDateErr,
    securityCode,
    setSecurityCode,
    authorizedCardDatas,
    setAuthorizedCardDatas,
    renderAuthorizedDatas,
    saveHandler,
    deleteHandler,
    cardDatas,
    defaultValue,
    setDefaultValue,
    chargeAmount,
    authorizeHandler,
    editHandler,
    disableSave,
    cancelHandler,
    setChargeAmount,
    disableChargeAmount,
    setDisableChargeAmount,
    disableUnitperCharge,
    newHandler,
    handleChargeAmount,
    cardSelectHandler,
    loading,
    unitsPerCharge,
    setUnitsPerCharge,
    handleUnitsPerCharge,
    unitsPerChargeFlag,
    isCustomerCardSelected,
  };
};

export default useCreditCard;
