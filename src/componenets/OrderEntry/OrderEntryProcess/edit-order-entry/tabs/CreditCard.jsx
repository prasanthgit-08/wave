import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CustomerCreditCardService from "../../../../../services/CustomerCreditCardService";
import OrderEntryCreditCardServices from "../../../../../services/OrderEntryCreditCardServices";
import formatString from "../../../../../utils/validation/ExpirationDate";
import {
  setIsMandatoryCreditCardTab,
  setCreditCardData,
  setChargeCreditCard,
  setIsCreditCardDetailsInComplete,
  setIsCreditCardDetailsPartial,
  setDupLoadForCreditCard,
  setChargePerUnitCreditCard,
  setTotalBatchLoadCount,
} from "../../../../../redux/OrderEntryFilterSlice";
import CustomerService from "../../../../../services/CustomerService";
import CreditCardModalService from "../../../../../services/CreditCardModalService";

function CreditCard({ styles }) {
  const dispatch = useDispatch();
  const [chargeAmount, setChargeAmount] = useState(0);
  const [unitsPerCharge, setUnitsPerCharge] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [billAddress, setBillAddress] = useState("");
  const [billZipCode, setBillZipCode] = useState("");
  const [cardDatas, setCardDatas] = useState([]);
  const [dateErr, setDateErr] = useState(false);
  const [defaultValue, setDefaultValue] = useState("00");
  const [cardNumberManually, setCardNumberManually] = useState("");
  const [manuallyEnter, setManuallyEnter] = useState(false);
  const [secCode, setSecCode] = useState("");
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const [cardTest, setCardTest] = useState(true);
  const [authorizedCardDatas, setAuthorizedCardDatas] = useState([]);
  const [checkZip, setCheckZip] = useState(false);
  const [invalidChargeAmount, setInvalidChargeAmount] = useState(false);
  const [chargeAmountLength, setChargeAmountLength] = useState(10);
  const [normalZipValidationState, setNormalZipValidationState] = useState(null);
  const [canadianZipValidationState, setCanadianZipValidationState] = useState(null);
  const [authorizedFlag, setAuthorizedFlag] = useState(false);
  const [authRemUnits, setAuthRemUnits] = useState(false);
  const [remainingUnits, setRemainingUnits] = useState(0);
  const [authorizedUnits, setAuthorizedUnits] = useState(0);
  const [disableChargeAmount, setDisableChargeAmount] = useState(true);
  const [disableUnitsPerCharge, setDisableUnitsPerCharge] = useState(false);
  const [chargeAmountFlag, setChargeAmountFlag] = useState(false);
  const [unitsPerChargeFlag, setUnitsPerChargeFlag] = useState(false);
  const [canadian, setCanadian] = useState("");
  const [enteredCreditCard, setEnteredCreditCard] = useState(null);
  const [unmaskedCardNumber, setUnmaskedCardNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [enableDelete, setEnableDelete] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [enableCancel, setEnableCancel] = useState(false);
  const [disableFields, setDisableFields] = useState(true);
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [isZipValid, setIsZipValid] = useState(false);
  const [enableAuthorizeCard, setEnableAuthorizeCard] = useState(false);
  const [customerCreditCardPK, setCustomerCreditCardPK] = useState("");
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [editChargeAmount, setEditChargeAmount] = useState(false);

  const totalBatchLoadCount = useSelector((state) => state.orderEntryReducer.totalBatchLoadCount);
  const dataResetFlag = useSelector((state) => state.orderEntryReducer.dataReset);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const creditCardData = useSelector((state) => state.orderEntryReducer.creditCardData);
  const isMandatoryCreditCardTab = useSelector((state) => state.orderEntryReducer.isMandatoryCreditCardTab);
  const isCreditCardDetailsInComplete = useSelector(
    (state) => state.orderEntryReducer.isCreditCardDetailsInComplete
  );
  const isCreditCardDetailsPartial = useSelector(
    (state) => state.orderEntryReducer.isCreditCardDetailsPartial
  );
  const batchLoadCustomerTab = useSelector((state) => state.orderEntryReducer.batchLoadCustomerTab);
  const chargeCreditCard = useSelector((state) => state.orderEntryReducer.chargeCreditCharge);
  const dupLoadForCreditCard = useSelector((state) => state.orderEntryReducer.dupLoadForCreditCard);
  const unitTypesFK = useSelector((state) => state.orderEntryReducer.unitTypesFK);
  const invoiceFlatRateFromUnit = useSelector((state) => state.orderEntryReducer.invoiceFlatrate);
  const invoiceAmountFromUnit = useSelector((state) => state.orderEntryReducer.invoiceAmount);
  const invoiceAmountBackend = useSelector((state) => state.orderEntryReducer.invoiceAmountBackend);
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [remainAmount, setRemainAmount] = useState(invoiceAmount);

  const authorizedCardsSum =
    authorizedCardDatas?.reduce((sum, card) => sum + parseFloat(card?.amount), 0) || 0;

  const balanceAmount =
    Number(authorizedCardsSum) === 0 ? invoiceAmount : Number(invoiceAmount) - authorizedCardsSum;

  useEffect(() => {
    if (selectedCustomerId != null) {
      checkCanadianCustomer();
    }
  }, [selectedCustomerId]);

  useEffect(() => {
    setInvoiceAmount(invoiceAmountFromUnit);
  }, [invoiceAmountFromUnit]);

  //for setting invoice amount received from unit tab
  useEffect(() => {
    if (
      isNaN(invoiceAmountFromUnit) ||
      invoiceAmountFromUnit === undefined ||
      invoiceAmountFromUnit === "" ||
      invoiceAmountFromUnit === null
    ) {
      setInvoiceAmount(0);
      setRemainAmount(0);
    } else {
      // For Invoice Amount Credit Card issue test case
      if (Number(invoiceAmountBackend) >= 0) {
        // setInvoiceAmount(Number(invoiceAmountFromUnit).toFixed(2));
        // setRemainAmount(Number(invoiceAmountFromUnit).toFixed(2));
        // dispatch(setChargePerUnitCreditCard(invoiceAmountFromUnit)); //setting the amount for a single unit
        setInvoiceAmount(Number(invoiceAmountBackend).toFixed(2));
        setRemainAmount(Number(invoiceAmountBackend).toFixed(2));
        dispatch(setChargePerUnitCreditCard(invoiceAmountBackend)); //setting the amount for a single unit
      }
    }
  }, [/* invoiceAmountFromUnit, */ invoiceAmountBackend, batchLoadCustomerTab]);

  // Setting Remaining & Charge Amount based on balance amount
  useEffect(() => {
    if (authorizedCardDatas?.length && balanceAmount > 0) {
      setRemainAmount(Number(balanceAmount).toFixed(2) || 0);
      setChargeAmount(Number(balanceAmount).toFixed(2) || 0);
    }
    if (authorizedCardDatas?.length && balanceAmount <= 0) {
      setRemainAmount(Number(balanceAmount).toFixed(2) || 0);

      setChargeAmount(Number(0).toFixed(2));
    }
  }, [authorizedCardDatas]);

  //for handling duplicate loads
  useEffect(() => {
    if (dupLoadForCreditCard) {
      fetchCards();
      setChargeCreditCard(false);
      setAuthorizedCardDatas([]);
      setRemainAmount(invoiceAmount);

      setChargeAmount(Number(remainAmount).toFixed(2));
      setSecCode("");
      dispatch(setDupLoadForCreditCard(false));
      if (canadian) {
        setCanadianZipValidationState(null);
      } else {
        setNormalZipValidationState(null);
      }
      setDefaultValue("00");
      dispatch(setCreditCardData([]));
      dispatch(setIsMandatoryCreditCardTab(false));
    }
  }, [dupLoadForCreditCard]);

  //for handling tab colour validation and both incomplete and partial save conditions
  useEffect(() => {
    const totalAmount = authorizedCardDatas.reduce((acc, curr) => Number(acc) + Number(curr.amount), 0);

    if (Number(totalAmount) !== 0 && Number(totalAmount) < Number(invoiceAmount)) {
      setChargeAmountFlag(false);
      dispatch(setIsMandatoryCreditCardTab(false));
      dispatch(setIsCreditCardDetailsPartial(true));
      dispatch(setIsCreditCardDetailsInComplete(false));
    } else if (Number(totalAmount) === 0) {
      setChargeAmountFlag(false);
      dispatch(setIsMandatoryCreditCardTab(false));
      dispatch(setIsCreditCardDetailsInComplete(true));
      dispatch(setIsCreditCardDetailsPartial(false));
    } else if (Number(totalAmount) === Number(invoiceAmount)) {
      setChargeAmountFlag(true);
      dispatch(setIsMandatoryCreditCardTab(true));
      dispatch(setIsCreditCardDetailsPartial(false));
      dispatch(setIsCreditCardDetailsInComplete(false));
    } else {
      setChargeAmountFlag(false);
      dispatch(setIsMandatoryCreditCardTab(false));
      dispatch(setIsCreditCardDetailsInComplete(false));
    }
  }, [
    authorizedCardDatas,
    remainAmount,
    isCreditCardDetailsInComplete,
    isCreditCardDetailsPartial,
    unitsPerCharge,
  ]);

  // remaining amount calculation
  const calculateRemainingAmount = (invAmount, charAmount) => {
    const remainAmount = invAmount - charAmount;
    setRemainAmount(Number(remainAmount.toFixed(2)));
  };

  //for setting charge amount input field based on user selecting whether batchload or singleunit
  useEffect(() => {
    if (!batchLoadCustomerTab) {
      setChargeAmount(Number(remainAmount).toFixed(2));
    } else {
      setChargeAmount(Number(invoiceAmountFromUnit * unitsPerCharge).toFixed(2));
    }
  }, [
    remainAmount,
    selectedCustomerId,
    batchLoadCustomerTab,
    unitsPerCharge,
    unitTypesFK,
    authorizedCardDatas,
  ]);

  //for setting the authorized card details and to pass as a single object to backend
  useEffect(() => {
    if (remainAmount != 0) {
      if (
        cardNumber?.length !== 16 &&
        expDate?.length !== 4 &&
        chargeAmount &&
        !dateErr &&
        authorizedCardDatas?.length > 0
      ) {
        dispatch(setCreditCardData(authorizedCardDatas));
      }
    } else {
      dispatch(setCreditCardData(authorizedCardDatas));
    }
  }, [cardNumber, chargeAmount, expDate, dateErr, remainAmount]);

  //for single units
  useEffect(() => {
    if (selectedCustomerId && chargeCreditCard && !batchLoadCustomerTab && unitTypesFK !== null) {
      fetchCards();
      setChargeCreditCard(false);
      setAuthorizedCardDatas([]);
      setRemainAmount(invoiceAmount);

      setChargeAmount(Number(remainAmount).toFixed(2));
      setSecCode("");
      if (canadian) {
        setCanadianZipValidationState(null);
      } else {
        setNormalZipValidationState(null);
      }
      setDefaultValue("00");
      dispatch(setIsMandatoryCreditCardTab(false));
      dispatch(setCreditCardData([]));
    }
  }, [selectedCustomerId, dataResetFlag, chargeCreditCard, batchLoadCustomerTab, unitTypesFK, invoiceAmount]);

  //for batchloads
  useEffect(() => {
    if (selectedCustomerId && batchLoadCustomerTab && chargeCreditCard && unitTypesFK !== null) {
      fetchCards();
      setChargeCreditCard(false);
      setAuthorizedCardDatas([]);
      if (Number(invoiceAmountBackend) === 0) {
        setInvoiceAmount(0);
        setRemainAmount(0);
      } else if (
        (typeof invoiceAmountFromUnit === "number" || typeof invoiceAmountFromUnit === "string") &&
        !isNaN(invoiceAmountFromUnit)
      ) {
        setInvoiceAmount(Number(totalBatchLoadCount) * parseFloat(Number(invoiceAmountFromUnit).toFixed(2)));
        setRemainAmount(Number(totalBatchLoadCount) * parseFloat(Number(invoiceAmountFromUnit).toFixed(2)));

        setChargeAmount((Number(invoiceAmountFromUnit) * unitsPerCharge).toFixed(2));
      } else {
        setInvoiceAmount(Number(totalBatchLoadCount) * parseFloat(0));
        setRemainAmount(Number(totalBatchLoadCount) * parseFloat(0));

        setChargeAmount((0 * unitsPerCharge).toFixed(2));
      }

      remainingUnits !== 0 ? setUnitsPerCharge(remainingUnits) : setUnitsPerCharge(totalBatchLoadCount);
      setSecCode("");
      if (canadian) {
        setCanadianZipValidationState(null);
      } else {
        setNormalZipValidationState(null);
      }
      dispatch(setIsMandatoryCreditCardTab(false));
      setDefaultValue("00");
      setDisableUnitsPerCharge(false);
      setAuthorizedFlag(false);
      dispatch(setCreditCardData([]));
    }
  }, [
    selectedCustomerId,
    batchLoadCustomerTab,
    invoiceAmountFromUnit,
    dataResetFlag,
    chargeCreditCard,
    unitTypesFK,
    totalBatchLoadCount,
    invoiceAmount,
    invoiceFlatRateFromUnit,
    invoiceAmountBackend,
  ]);

  //for setting primary card in customer credit card dropdown
  useEffect(() => {
    setCardNumber("");
    setExpDate("");
    setBillAddress("");
    setBillZipCode("");
  }, [cardDatas]);

  //for updating chargeAmount and units per charge
  useEffect(() => {
    setChargeAmount(Number(remainAmount).toFixed(2));
    setUnitsPerCharge(remainingUnits);
    if (remainAmount === 0 && batchLoadCustomerTab) {
      setChargeAmount("0.00");
      setUnitsPerCharge(0);
      setAuthorizedFlag(false);
    }
  }, [authorizedFlag, remainAmount, remainingUnits]);

  // card selection function
  const cardSelectHandler = (e) => {
    let value = e.target.value;
    setCardNumberValid(false);
    if (value === "00") {
      resetCardDetails();
      setDefaultValue("00");
      setManuallyEnter(true);
    } else {
      let cardData = cardDatas?.find((i) => i.customerCreditCardPK == value);

      if (cardData?.creditCardNumber) {
        cardData = {
          ...cardData,
          unmaskedCardNumber: cardData?.creditCardNumber,
        };
      }
      setCardInformation(cardData);
      setCustomerCreditCardPK(cardData?.customerCreditCardPK);
    }
  };

  //setting the selected card information
  const setCardInformation = (cardData, isDoubleClick) => {
    setCardNumber(cardData?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X"));
    setExpDate(cardData?.expirationDate ? cardData?.expirationDate : cardData?.creditCardExpirationDate);
    setBillAddress((cardData?.billingAddress ? cardData?.billingAddress : cardData?.creditCardAddress) || "");
    setBillZipCode(cardData?.billingZipcode ? cardData?.billingZipcode : cardData?.creditCardPostalCode);
    setSecCode(cardData?.securityCode);
    setDefaultValue(cardData?.customerCreditCardPK || "00");
    setManuallyEnter(false);
    if (isDoubleClick) {
      setChargeAmount(Number(cardData?.transactionAmount).toFixed(2));
    }
    setUnmaskedCardNumber(cardData?.unmaskedCardNumber);
    setEnableAuthorizeCard(true);
    setCheckZip(true);
  };

  //checking the customer is canadian or not for billing zipcode validation
  const checkCanadianCustomer = () => {
    CustomerService.getCustomerById(selectedCustomerId).then((response) => {
      const data = response.data;
      setCanadian(data.canadian);
    });
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

  const handleChargeAmount = (e) => {
    let value = e.target.value;
    if (value === "" || value === null || value === undefined) {
      // if the value is empty, set chargeAmount to an empty string
      setChargeAmount("");

      setInvalidChargeAmount(true);
      return;
    }
    if (value >= remainAmount) {
      setInvalidChargeAmount(false);
    } else {
      setInvalidChargeAmount(true);
    }

    setChargeAmount(chargeAmountVal(e.target.value, remainAmount));
  };

  const chargeAmountVal = (value, max) => {
    if (!value) {
      return ""; // return empty string if value is empty
    }

    const number = value?.replace(/[^\d.]/g, ""); // remove any characters that are not digits or a period
    const parts = number.split("."); // split the number by the period

    // check if there are more than 2 parts or if the first part has more than 7 digits
    if (parts?.length > 2 || parts[0]?.length > 7) {
      return number.slice(0, -1); // remove the last entered character
    }

    // check if there is a second part and if it has more than 2 digits
    if (parts?.length === 2 && parts[1]?.length > 2) {
      return number.slice(0, -1); // remove the last entered character
    }

    if (Number(number) > Number(max)) {
      if (Number(max) > 0) {
        return max; // if the number exceeds the maximum, return the maximum
      } else {
        return number; // return the valid number
      }
    } else {
      return number; // return the valid number
    }
  };

  //for calculating total no of units remaining after authorization
  useEffect(() => {
    const totalAuthorizedUnits = authorizedCardDatas.reduce((total, data) => total + data.numberOfUnits, 0);
    setAuthorizedUnits(totalAuthorizedUnits);
    setRemainingUnits(totalBatchLoadCount - authorizedUnits);
    if (totalBatchLoadCount === totalAuthorizedUnits) {
      setUnitsPerChargeFlag(true);
    }
  }, [authorizedUnits, remainingUnits, authorizedCardDatas]);

  //function for restricting the no: of units to be entered in the units per charge field after every authorization
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

  //units per charge validation
  const handleUnitsPerCharge = (e) => {
    const unitsPerChargeValidation = handleBatchUnits(e.target.value);
    setUnitsPerCharge(unitsPerChargeValidation);
  };

  useEffect(() => {
    setEnteredCreditCard({
      billingZipcode: billZipCode || String(),
      expirationDate: expDate,
      securityCode: secCode || String(),
      cardHolderName: "",
      transactionAmount: chargeAmount,
      unmaskedCardNumber: unmaskedCardNumber,
    });
  }, [unmaskedCardNumber, expDate, billAddress, billZipCode, secCode]);

  const handleSuccessAuthorization = (data) => {
    setAuthorizedCardDatas([
      ...authorizedCardDatas,
      {
        creditCardNumber: cardNumber,
        unmaskedCardNumber: unmaskedCardNumber,
        expirationDate: expDate,
        billingAddress: billAddress ? billAddress : String(),
        billingZipcode: billZipCode ? billZipCode : String(),
        transactionAmount: Number(chargeAmount),
        source: "Order Entry",

        cardType: data?.cardtype,
        cardHolderName: "",
        securityCode: secCode || String(),
        charged: false,
      },
    ]);
    setAuthorizedFlag(true);

    const newRemainingAmount = parseFloat(remainAmount) - parseFloat(chargeAmount);
    setRemainAmount(parseFloat(newRemainingAmount.toFixed(2)));

    setChargeAmount(Number(newRemainingAmount.toFixed(2)) || 0);

    resetCardDetails();
    setDisableFields(true);
    setManuallyEnter(false);
    setDisableChargeAmount(true);
    setCheckZip(false);
    setEnableCancel(false);
    setSelectedCardIndex(-1);
    toast.success("Credit Card Authorized");
  };

  const isValidDecimal = (value) => {
    if (value === "" || value === "0") return true;

    // 1–5 digits with optional .xx  OR  leading dot with 1–2 digits
    const regexp = /^(?:\d{1,5}(?:\.\d{1,2})?|\.\d{1,2})$/;
    return regexp.test(value);
  };

  const authorizedCard = () => {
    let newArrData = authorizedCardDatas?.find((i) => i.creditCardNumber == cardNumber);

    if (true) {
      if (newArrData) {
        toast.error("Card Already Authorized");
        setLoading(false);
        return;
      } else {
        CreditCardModalService.verifyCardDetails(enteredCreditCard)
          .then((response) => {
            const data = response?.data;
            if (data?.code === "AUTH") {
              CreditCardModalService.checkCardBalance(enteredCreditCard)
                .then((response) => {
                  if (Number(response.data?.balance) >= chargeAmount) {
                    handleSuccessAuthorization(response);
                  } else {
                    toast.error("Insufficient Balance");
                  }
                  setLoading(false);
                })
                .catch(() => {
                  toast.error("SYSTEM_NOT_AVAILABLE");
                  setLoading(false);
                  setCheckZip(false);
                });
            } else if (data?.code === "DENY") {
              if (data?.msoft_code === "DATA_ACCOUNT") {
                toast.error("Card Verification Failed. Invalid Credit Card Number!");
              } else if (data?.msoft_code === "DATA_EXPDATE") {
                toast.error("Card Verification Failed. Invalid Expiration Date!");
              } else {
                toast.error("Card Verification Failed!");
              }
              setLoading(false);
            }
          })
          .catch(() => {
            setLoading(false);
            setCheckZip(false);
          })
          .finally(() => {
            setCardNumber("");
            setExpDate("");
            setBillAddress("");
            setBillZipCode("");
            setCardNumberValid(false);
            setDefaultValue("00");
            setManuallyEnter(true);
            setSecCode("");
            if (canadian) {
              setCanadianZipValidationState(null);
            } else {
              setNormalZipValidationState(null);
            }
          });
      }
    } else {
      let newArrData = authorizedCardDatas?.find((i) => i.creditCardNumber === cardNumber);

      if (newArrData) {
        toast.error("Card Already Exist");
        setLoading(false);
      } else {
        CreditCardModalService.checkCardBalance(enteredCreditCard)
          .then((response) => {
            if (Number(response.data?.balance) >= chargeAmount) {
              handleSuccessAuthorization(response);
            } else {
              toast.error("Insufficient Balance");
            }
            setLoading(false);
          })
          .catch(() => {
            toast.error("SYSTEM_NOT_AVAILABLE");

            setLoading(false);
            setCheckZip(false);
          })
          .finally(() => {
            setCardNumber("");
            setExpDate("");
            setBillAddress("");
            setBillZipCode("");
            setCardNumberValid(false);
            setDefaultValue("00");

            if (remainAmount > 0) setManuallyEnter(true);
            else setManuallyEnter(false);
            setSecCode("");
            if (canadian) {
              setCanadianZipValidationState(null);
            } else {
              setNormalZipValidationState(null);
            }
          });
      }
    }
    CreditCardModalService.handleTransaction([enteredCreditCard], 1)
      .then(({ data }) => {
        if (data.messages?.resultCode === "Ok") {
          handleSuccessAuthorization(data);
        }
      })
      .catch(() => {});
  };

  //zipcode validation
  const checkZipCode = (e) => {
    if (canadian !== true && billZipCode?.length > 5) {
      const uszip = e.target.value.slice(0, 5);

      CustomerCreditCardService.isZipCodeExisting(uszip)
        .then((response) => {
          setCheckZip(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const uszip = e.target.value == "" ? null : e.target.value;
      CustomerCreditCardService.isZipCodeExisting(uszip)
        .then((response) => {
          setCheckZip(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //Validating credicard using Luhns Validation
  const lunhsValidation = (e) => {
    CustomerCreditCardService.isCreditCardNumberValid(e.target.value)
      .then((response) => {
        setCardTest(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // card select api calling
  const fetchCards = () => {
    OrderEntryCreditCardServices.getMapping(selectedCustomerId)
      .then((res) => {
        setCardDatas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for handling expiration date validation
  const HandlerExpDate = (e) => {
    const value = e.target.value;
    setExpDate(formatString(value));

    var dateObj = new Date();
    var currentMonth = dateObj.getUTCMonth() + 1; //months from 1-12 // number
    var Yearstr = dateObj.getUTCFullYear().toString().slice(2);

    //convert year to number
    var currentYear = parseInt(Yearstr); // number

    var date = value.split("/");
    var month = parseInt(date[0]); //number
    var year = parseInt(date[1]); //number

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

  //reset the card details
  const resetCardDetails = () => {
    setCardNumber("");
    setExpDate("");
    setBillAddress("");
    setBillZipCode("");
    setDefaultValue("00");
    setManuallyEnter(false);
    setSecCode("");
    if (canadian) {
      setCanadianZipValidationState(null);
    } else {
      setNormalZipValidationState(null);
    }
  };

  const newHandler = () => {
    setDefaultValue("00");
    setCheckZip(false);

    setChargeAmount(Number(remainAmount).toFixed(2));
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

    setChargeAmount(Number(remainAmount).toFixed(2));
    setManuallyEnter(false);
    setEnableCancel(false);
    setEnableDelete(false);
    setEnableSave(false);
    setSelectedCardData(null);
    setDisableFields(true);
    setCheckZip(false);
    setDisableChargeAmount(true);
    setSelectedCardIndex(-1);
  };

  const saveHandler = () => {
    setEnableEdit(false);
    CreditCardModalService.handleTransaction([enteredCreditCard], 1)
      .then(({ data }) => {
        if (data.messages?.resultCode === "Ok") {
          setAuthorizedCardDatas((card) =>
            card.map((item, index) =>
              index === selectedCardIndex ? { ...item, transactionAmount: chargeAmount } : item
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
        }
      })
      .catch(() => {
        toast.error("SYSTEM_NOT_AVAILABLE");

        setLoading(false);
        setCheckZip(false);
      });
  };

  const deleteHandler = () => {
    setAuthorizedCardDatas(authorizedCardDatas?.filter((item, index) => index !== selectedCardIndex));
    resetCardDetails();
    // remove later if unused
    const newRemainAmt = Number(remainAmount) + Number(selectedCardData?.transactionAmount);
    setRemainAmount(newRemainAmt);

    setChargeAmount(Number(newRemainAmt).toFixed(2));
    setManuallyEnter(false);
    setEnableEdit(false);
    setEnableCancel(false);
    setEnableDelete(false);
    setSelectedCardData(null);
    setSelectedCardIndex(-1);
  };

  //Function for table row double click
  const onTableRowDOubleClick = (cardData, index) => {
    setCardInformation(cardData, true);
    setSelectedCardIndex(index);
    if (cardData?.preExisting) {
      setEnableEdit(false);
      setEnableDelete(false);
      setEnableCancel(true);
    } else {
      setEnableEdit(true);
      setEnableDelete(true);
      setEnableCancel(true);
    }

    setEnableSave(false);

    setDisableChargeAmount(true);
    setSelectedCardData(cardData);
    setDisableFields(true);
  };

  // for showing authorized card details
  const renderAuthorizedDatas = authorizedCardDatas?.map((i, index) => {
    const amount =
      typeof i.transactionAmount === "number"
        ? i.transactionAmount.toFixed(2)
        : parseFloat(i.transactionAmount).toFixed(2);
    return (
      <tr
        onDoubleClick={(e) => onTableRowDOubleClick(i, index, e)}
        key={index}
        className={`${index === selectedCardIndex ? "tableSelected" : ""} `}
      >
        <td>{i?.creditCardNumber}</td>
        <td>{amount}</td>
      </tr>
    );
  });

  const renderDropData = cardDatas?.map((i, index) => (
    <option value={i.customerCreditCardPK} key={index}>
      {i.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X")}
    </option>
  ));

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      <Row className={styles.creditCardTable}>
        <Col lg={5} xl={5} sm={5} md={5} xs={5} className={" ps-0 p-l-10"}>
          <p className="mt-3 ">Credit Cards Authorized</p>
          <div className={`border border-secondary overflow-auto ${styles.plantNameTable}`}>
            <table className="table border-bottom  table-striped f-w-600">
              <thead>
                <tr disabled>
                  <th className="col-6">Card Number</th>

                  <th className="col-4">Authorized Amount</th>
                </tr>
              </thead>

              <tbody>{renderAuthorizedDatas}</tbody>
            </table>
            {authorizedCardDatas?.length == 0 && (
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
                      disabled={Number(remainAmount) === 0 || selectedCardIndex >= 0 || !disableFields}
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
                      disabled={!enableSave}
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
                      disabled={authorizedCardDatas?.length === 0 || !enableDelete}
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
                  <Form.Label className={`customColFormLabel`}>Invoice Amount</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "95px" }}>
                  <input
                    className="customFormControl"
                    id="invoiceamt"
                    name="invoiceamt"
                    type="search"
                    value={Number(invoiceAmount).toFixed(2)}
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

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "95px" }}>
                  <input
                    className="customFormControl"
                    id="remainamt"
                    name="remainamt"
                    type="search"
                    value={Number(remainAmount).toFixed(2)}
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

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "95px" }}>
                  <input
                    className={`customFormControl ${!isValidDecimal(chargeAmount) || !chargeAmount ? "borderRed" : ""}`}
                    id="chargeamt"
                    name="chargeamt"
                    type="text"
                    maxLength={chargeAmountLength}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={chargeAmount}

                    disabled={disableChargeAmount}
                    onChange={handleChargeAmount}
                    onInput={(event) => {}}
                  />
                </Col>
              </Form.Group>
              {batchLoadCustomerTab ? (
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Units Per Charge</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      className={`customFormControl ${
                        unitsPerCharge
                          ? !unitsPerChargeFlag && (unitsPerCharge === "" || unitsPerCharge === null)
                            ? "borderRed"
                            : unitsPerChargeFlag
                              ? "borderGreen"
                              : ""
                          : ""
                      }`}

                      id="unitprchrg"
                      name="unitprchrg"
                      type="search"
                      maxLength={30}
                      value={batchLoadCustomerTab ? unitsPerCharge : ""}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={!batchLoadCustomerTab || disableUnitsPerCharge}
                      onChange={handleUnitsPerCharge}
                      onInput={(event) => {
                        setUnitsPerCharge(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              ) : null}
            </div>
            <div className="p-t-30">
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Customer Credit Card</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className={`p-0 `}>
                  <Form.Select
                    defaultValue="00"
                    className="customFormControl py-0"
                    name="custcredcard"
                    id="custcredcard"
                    onChange={cardSelectHandler}
                    disabled={disableFields}
                    value={defaultValue}
                  >
                    {cardDatas[0]?.isPrimary === false && <option value="1"></option>}
                    {renderDropData}
                    <option value="00">Enter Manually</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Credit Card Number</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    className={`customFormControl ${
                      !cardNumberValid ? "" : cardNumberValid ? "borderRed" : "borderGreen"
                    }
                     ${
                       manuallyEnter && !disableFields
                         ? cardNumber?.length === 16
                           ? "borderGreen"
                           : remainAmount === 0
                             ? ""
                             : "borderRed"
                         : ""
                     }`}
                    id="crecarnum"
                    name="crecarnum"

                    type="text"
                    maxLength={16}
                    autoComplete="one-time-code"
                    spellCheck={false}
                    aria-autocomplete="none"
                    value={cardNumber}
                    onBlur={(e) => {
                      setUnmaskedCardNumber(cardNumber);
                      setCardNumber(cardNumber?.replace(/[0-9](?=.*.{4})/gim, "X"));
                    }}
                    onInput={(e) => {
                      const cardNumber = e.target.value?.replace(/[^\d:.\d{1}]/g, "");
                      setCardNumber(cardNumber);
                      setCardNumberManually(e.target.value);
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
                      manuallyEnter && !disableFields
                        ? remainAmount === 0
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
                    style={{ width: "55px" }}
                    disabled={!manuallyEnter || disableFields}
                    onChange={HandlerExpDate}
                  />
                  <p className="text-danger mb-0 ms-3 col-6 text-capitalize"> {dateErr && "card error"}</p>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Billing Address</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    className="customFormControl"
                    id="billadd"
                    name="billadd"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={billAddress}
                    disabled={!manuallyEnter || disableFields}
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
                        manuallyEnter && !disableFields
                          ? billZipCode
                            ? canadian
                              ? canadianZipValidationState == null
                                ? ""
                                : canadianZipValidationState
                                  ? !checkZip
                                    ? "borderRed"
                                    : "borderGreen"
                                  : "borderRed"
                              : normalZipValidationState == null
                                ? ""
                                : normalZipValidationState
                                  ? !checkZip
                                    ? "borderRed"
                                    : "borderGreen"
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
                    style={{ width: "77px" }}
                    value={billZipCode}
                    disabled={!manuallyEnter || disableFields}
                    onBlur={checkZipCode}
                    onChange={(e) => {
                      canadian ? canadianZipValidation(e) : normalZipValidation(e);
                    }}
                    onInput={(e) => {
                      let value = e.target.value;
                      if (canadian) {
                        value = value?.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
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
                    className="customFormControl"
                    id="seccode"
                    name="seccode"
                    disabled={!manuallyEnter || disableFields}
                    type="search"
                    maxLength={30}
                    style={{ width: "77px" }}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={secCode}
                    onChange={(e) => {
                      setSecCode(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              {}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    disabled={
                      cardNumber?.length === 16 &&
                      expDate?.length > 4 &&
                      !dateErr &&
                      checkZip &&
                      remainAmount !== 0 &&
                      chargeAmount > 0 &&
                      !selectedCardData &&
                      !loading
                        ? false
                        : true
                    }
                    // onClick={authorizeHandler}
                    onClick={() => {
                      authorizedCard();
                    }}
                  >
                    {loading === true ? (
                      <div className="loader-container">
                        <div className="loader_YardCheckin"></div>
                      </div>
                    ) : (
                      "Authorize Card"
                    )}
                  </button>
                </Col>
              </Form.Group>
            </div>
          </div>
          <div></div>
        </Col>
      </Row>
    </div>
  );
}

export default CreditCard;
