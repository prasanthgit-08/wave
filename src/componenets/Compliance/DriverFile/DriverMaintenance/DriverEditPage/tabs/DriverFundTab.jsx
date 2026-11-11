import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import { setIsDriverFundTabValid, setSaveFormData } from "../../../../../../redux/DriverMaintenanceSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserLookup from "../../../../../LookupScreens/User/UserLookup";
import DriverService from "../../../../../../services/DriverService";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import Input from "../../../../../../components/common/input";
const DriverFundTab = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [accumulatedBond, setAccumulatedBond] = useState(0.0);
  const [bondDraws, setBondDraws] = useState(0.0);
  const [bondDrawAmount, setBondDrawAmount] = useState(0);
  const [bondLastDrawDate, setBondLastDrawDate] = useState("");
  const [bondRate, setBondRate] = useState("");
  const [totalBond, setTotalBond] = useState("");
  const [bondExempt, setBondExempt] = useState(false);
  const [prepaidBond, setPrepaidBond] = useState(false);
  const [accumulatedReserve, setAccumulatedReserve] = useState(0);
  const [reserveDraws, setReserveDraws] = useState(0);
  const [reserveDrawAmount, setReserveDrawAmount] = useState(0);
  const [reserveLastDrawDate, setReserveLastDrawDate] = useState("");
  const [totalReserve, setTotalReserve] = useState(0);
  const [ytd1099Amount, setYtd1099Amount] = useState(0);
  const [payPickupFee, setPayPickupFee] = useState(false);
  const [inBonusProgram, setInBonusProgram] = useState(false);
  const [holdPay, setHoldPay] = useState(false);
  const [holdPayDate, setHoldPayDate] = useState("");
  const [isHoldPayDateValidation, setIsHoldPayDateValidation] = useState(true);
  const [holdPayReason, setHoldPayReason] = useState("");
  const [hasDebitCard, setHasDebitCard] = useState(false);
  const [prepaidBondAmount, setPrepaidBondAmount] = useState("");
  const [formattedPrepaidBondAmount, setFormattedPBondAmount] = useState("");
  const [debitCardID, setDebitCardID] = useState("");
  const [debitCardUnitNumber, setDebitCardUnitNumber] = useState("");
  const [debitCardNumber, setDebitCardNumber] = useState("");
  const [debitCardDirectDeposit, setDebitCardDirectDeposit] = useState(false);
  const [holdPayUserId, setHoldPayUserId] = useState(null);
  const [holdPayUserInput, setHoldPayUserInput] = useState("");
  const [holdPayUserData, setHoldPayUserData] = useState([]);
  const [holdPayUserLookUpShow, setHoldPayUserLookUpShow] = useState(false);
  const [debitcardIssuedId, setDebitcardIssuedId] = useState(null);
  const [debitcardIssuedInput, setDebitcardIssuednput] = useState("");
  const [debitcardIssuedData, setDebitcardIssuedData] = useState([]);
  const [debitCardValid, setDebitCardValid] = useState(true);
  const [debitcardProcessCards, setDebitcardProcessCards] = useState(false);
  const [activeDebitCard, setActiveDebitCard] = useState(false);
  const [dateFlag, setDateFlag] = useState(false);
  const [debitCardExpirationDate, setDebitCardExpirationDate] = useState("");
  const mmYYFormat = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const mmYYYYFormat = /^(0[1-9]|1[0-2])\/\d{4}$/;
  const dispatch = useDispatch();
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);

  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const companyData = useSelector((state) => state.driverMaintenanceReducer.companyData);
  const displayFlag = useSelector((state) => state.driverMaintenanceReducer.displayFlag);
  const [userLoading, setUserLoading] = useState(false);
  const [debitcardLoading, setDebitcardLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [checkDebitcardUnitNumber, setCheckDebitcardUnitNumber] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));

  const setDriverFundTabValues = (formData, source) => {
    const formatNumber = (value) => {
      const number = Number(value);
      return !isNaN(number) ? number.toFixed(2) : "0.00";
    };
    setAccumulatedBond(formatNumber(formData?.accumulatedBond));

    setPrepaidBondAmount(formatNumber(formData?.prepaidBondAmount));
    setBondDrawAmount(formatNumber(formData?.bondDrawAmount));
    setAccumulatedReserve(formatNumber(formData?.accumulatedReserve));
    setReserveDrawAmount(formatNumber(formData?.reserveDrawAmount));
    setTotalReserve(formatNumber(formData?.totalReserve));
    setBondExempt(formData?.bondExempt || false);
    setPrepaidBond(formData?.prepaidBond || false);
    setBondDraws(formData?.bondDraws);
    setBondLastDrawDate(formData?.bondLastDrawDate);
    setReserveDraws(formData?.reserveDraws);
    setReserveLastDrawDate(formData?.reserveLastDrawDate);
    setBondRate(formData?.bondRate);
    setTotalBond(formatNumber(formData?.totalBond));

    setYtd1099Amount(formData?.yTD1099Amount);
    setPayPickupFee(formData?.payPickupFee || false);
    setInBonusProgram(formData?.inBonusProgram || false);
    setHoldPay(formData?.holdPay || false);
    setHoldPayDate(formData?.holdPayDate || "");
    setHoldPayReason(formData?.holdPayReason?.trim() || "");
    setHoldPayUserId(formData?.holdPayUserFK || null);
    setHasDebitCard(formData?.hasDebitCard);
    setDebitCardID(formData?.debitCardID || "");
    setDebitCardUnitNumber(formData?.debitCardUnitNumber || "");
    setDebitCardNumber(formData?.debitCardNumber || "");
    setDebitCardDirectDeposit(formData?.debitCardDirectDeposit || false);
    setDebitcardIssuedId(formData?.debitCardFK);
    setDebitCardExpirationDate(formData?.debitCardExpire);
  };

  useEffect(() => {
    if (viewDetail && editFormData != null) {
      setDriverFundTabValues(editFormData, "backend");
      setHoldPayUserInput(editFormData?.driverFileData?.HoldPayUserName?.trim() || null);
      setDebitcardIssuednput(editFormData?.driverFileData?.DebitCardProvider?.trim() || null);
      setActiveDebitCard(editFormData?.driverFileData?.DebitCardActive);
      setDebitcardProcessCards(editFormData?.driverFileData?.DebitCardProcessCards);
    }
    if (!viewDetail && saveFormData !== null && displayFlag) {
      setDriverFundTabValues(saveFormData, "frontend");
      setHoldPayUserInput(saveFormData?.holdPayUserInput?.trim() || null);
      setDebitcardIssuednput(saveFormData?.debitcardIssuedInput?.trim() || null);
    }
  }, [editFormData, viewDetail, displayFlag]);

  const formatDateForBackend = (dateString) => {
    if (!dateString) return null;

    if (dateString.includes("T")) {
      return dateString;
    }

    return `${dateString}T00:00:00`;
  };
  const driverFundTabData = () => {
    dispatch(
      setSaveFormData({
        accumulatedBond: accumulatedBond ? accumulatedBond : 0,
        bondDraws: bondDraws,
        bondDrawAmount: bondDrawAmount,
        bondLastDrawDate: bondLastDrawDate,
        bondRate: bondRate,
        totalBond: totalBond,
        bondExempt: bondExempt,
        prepaidBond: prepaidBond,
        accumulatedReserve: accumulatedReserve,
        reserveDraws: reserveDraws,
        reserveDrawAmount: reserveDrawAmount,
        reserveLastDrawDate: reserveLastDrawDate,
        totalReserve: totalReserve,
        yTD1099Amount: ytd1099Amount,
        payPickupFee: payPickupFee,
        inBonusProgram: inBonusProgram,
        holdPay: holdPay,
        holdPayDate: holdPayDate ? formatDateForBackend(holdPayDate) : "",
        holdPayReason: holdPayReason,
        hasDebitCard: hasDebitCard,
        debitCardID: debitCardID,
        debitCardUnitNumber: debitCardUnitNumber ? debitCardUnitNumber : null,
        debitCardNumber: debitCardNumber,
        debitCardDirectDeposit: debitCardDirectDeposit,
        holdPayUserFK: holdPayUserId,
        prepaidBondAmount: prepaidBondAmount ? prepaidBondAmount : 0.0,
        debitCardFK: debitcardIssuedId,
        debitCardExpire: debitCardExpirationDate,
        holdPayUserInput,
        debitcardIssuedInput,
      })
    );
  };
  useEffect(() => {
    driverFundTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accumulatedBond,
    bondDraws,
    bondDrawAmount,
    bondLastDrawDate,
    bondRate,
    totalBond,
    bondExempt,
    prepaidBond,
    accumulatedReserve,
    reserveDraws,
    reserveDrawAmount,
    reserveLastDrawDate,
    totalReserve,
    inBonusProgram,
    payPickupFee,
    holdPay,
    holdPayDate,
    holdPayReason,
    hasDebitCard,
    debitCardID,
    debitCardUnitNumber,
    debitCardNumber,
    debitCardDirectDeposit,
    holdPayUserId,
    prepaidBondAmount,
    debitcardIssuedId,
    debitCardExpirationDate,
    holdPayUserInput,
    debitcardIssuedInput,
  ]);

  const isDays = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");
    if (value) return number;
  };
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };

  /**
   * Fetch Mentoring Debitcard for Autocomplete
   **/

  const fetchDebitCards = (string) => {
    let active = true;
    setDebitcardLoading(true);
    DriverService.getAllDebitCardData(string, active)
      .then((response) => {
        const data = response.data.content;
        setDebitcardLoading(false);
        const cardList = data
          ?.filter((card) => card.active === true && card.processCards === true)
          .map((card) => ({
            ...card,
            name: card.provider?.trim(),
          }));
        setDebitcardIssuedData(cardList);
      })
      .catch((err) => {
        console.log(err);
        setDebitcardLoading(false);
      });
  };
  /**
   * used for Debitcard  Autocomplete -Selection
   */
  const handlerDebitCardSelection = (item) => {
    setDebitcardIssuedId(item.debitCardPK);
    setDebitcardIssuednput(item.provider?.trim());
    setActiveDebitCard(item.active);
    setDebitcardProcessCards(item?.processCards);
  };

  /**
   * Fetch all Users
   * Used for
   */
  const fetchHoldPayUsers = (string) => {
    let active = true;
    setUserLoading(true);
    DriverService.getAllUserData(string, active)
      .then((response) => {
        const data = response.data.content;

        const userList = data?.map((user) => ({
          ...user,
          name: user.name?.trim(),
        }));
        setUserLoading(false);
        setHoldPayUserData(userList);
      })
      .catch((err) => {
        console.log(err);
        setUserLoading(false);
      });
  };

  const handlerHoldPayUserLookupSelection = (item) => {
    setHoldPayUserId(item.userPK);
    setHoldPayUserInput(item.name?.trim());
    setHoldPayUserLookUpShow(false);
  };
  const handleHoldPayUserLookup = () => {
    setHoldPayUserLookUpShow(true);
  };

  const isCapsCharacterOrDigits = (value) => {
    if (!value) return value;

    return value.replace(/[^A-Z0-9]/g, "");
  };

  /**
   * used for Seting Values
   */
  useEffect(() => {
    if (!id && (companyData?.bondFundPercentage !== 0 || companyData?.bondFund !== 0) && !displayFlag) {
      setBondRate(companyData?.bondFundPercentage ? companyData?.bondFundPercentage * 100 : "");
      setTotalBond(companyData?.bondFund ? companyData?.bondFund : "");
    }
  }, [id, companyData, displayFlag]);

  /**
   * Validating DebitCrad using Luhns Validation
   */
  const lunhsValidation = (debitCardNumber) => {
    if (debitCardNumber.length !== 16) return;
    DriverService.checkDebitCardValidOrNot(debitCardNumber)
      .then((response) => {
        setDebitCardValid(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandlerExpDate = (e) => {
    const value = e.target.value;
    var dateObj = new Date();
    var currentMonth = dateObj.getUTCMonth() + 1; //months from 1-12 // number

    if (mmYYFormat.test(value)) {
      // For mm/yy format, take only the last two digits of the year
      var Yearstr = dateObj.getUTCFullYear().toString().slice(2);
    } else if (mmYYYYFormat.test(value)) {
      // For mm/yyyy format, use the full year
      var Yearstr = dateObj.getUTCFullYear().toString();
    }
    var currentYear = parseInt(Yearstr); // number
    var date = value.split("/");
    var month = parseInt(date[0]); //number
    var year = parseInt(date[1]); //number

    if (year < currentYear) {
      // expiration date has passed the current year

      setDateFlag(true);
    } else if (year === currentYear && month < currentMonth) {
      setDateFlag(true);
    } else {
      setDateFlag(false);
    }
  };

  const formatExpirationDateValidation = (event) => {
    return event
      .replace(
        /[^0-9]/g,
        "" // Allow only numbers
      )
      .replace(
        /^([2-9])$/g,
        "0$1" // Handle 3 > 03 for months
      )
      .replace(
        /^(1{1})([3-9]{1})$/g,
        "0$1/$2" // Handle invalid months like 13 > 01/3
      )
      .replace(
        /^0{1,}/g,
        "0" // Handle multiple leading zeros 00 > 0
      )
      .replace(
        /^([0-1]{1}[0-9]{1})([0-9]{1,4}).*/g,
        "$1/$2" // Handle both mm/yy and mm/yyyy formats
      );
  };
  /**
   * Tab Validation
   */
  useEffect(() => {
    if (
      (bondExempt || (!bondExempt && bondRate && bondRate > 0)) &&
      (bondExempt || (!bondExempt && totalBond && totalBond > 0)) &&
      (!prepaidBond ||
        (!id &&
          !bondExempt &&
          prepaidBond &&
          prepaidBondAmount &&
          prepaidBondAmount <= totalBond - accumulatedBond &&
          prepaidBondAmount > 0) ||
        (!id && bondExempt && prepaidBond && prepaidBondAmount && prepaidBondAmount > 0) ||
        (id && !bondExempt && prepaidBond && prepaidBondAmount) ||
        (bondExempt && prepaidBond && prepaidBondAmount && id)) &&
      (!holdPay ||
        (holdPay &&
          holdPayDate &&
          holdPayUserId &&
          holdPayUserInput &&
          holdPayReason &&
          isHoldPayDateValidation)) &&
      (!hasDebitCard ||
        (hasDebitCard &&
          ((debitcardIssuedInput && debitcardIssuedId && !id) ||
            (debitcardIssuedInput &&
              debitcardIssuedId &&
              id &&
              ((debitcardProcessCards && !activeDebitCard) || (debitcardProcessCards && activeDebitCard)))) &&
          debitCardUnitNumber &&
          !checkDebitcardUnitNumber &&
          debitCardNumber &&
          debitCardNumber?.length === 16 &&
          debitCardValid &&
          !dateFlag &&
          debitCardExpirationDate &&
          (debitCardExpirationDate.match(mmYYFormat) || debitCardExpirationDate.match(mmYYYYFormat))))
    ) {
      dispatch(setIsDriverFundTabValid(true));
    } else {
      dispatch(setIsDriverFundTabValid(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    bondRate,
    prepaidBond,
    prepaidBondAmount,
    totalBond,
    accumulatedBond,
    holdPay,
    holdPayDate,
    holdPayReason,
    holdPayUserId,
    holdPayUserInput,
    debitCardID,
    debitcardIssuedId,
    debitcardIssuedInput,
    activeDebitCard,
    debitcardProcessCards,
    id,
    hasDebitCard,
    debitCardNumber,
    debitCardUnitNumber,
    debitCardValid,
    bondExempt,
    isHoldPayDateValidation,
    debitCardExpirationDate,
    dateFlag,
    checkDebitcardUnitNumber,
  ]);

  /**Fetch the company data*/

  const getNextDebitCardNumbers = async () => {
    setLoad(true);

    try {
      const response = await DriverService.updateCompanyNextDebitCardNumber(1);

      if (response?.data) {
        const nextDriverNumber = response.data[0];
        const nextUnitNumber = response.data[1];

        setDebitCardID(String(nextDriverNumber).padStart(10, "0"));

        setDebitCardUnitNumber(String(nextUnitNumber));
      }
    } catch (error) {
      console.error("Error getting next debit card numbers:", error);
    } finally {
      setLoad(false);
    }
  };

  /**
   * Checking checknumber  in unique or not
   */
  const handleCheckNumber = (debitCardUnitNumber) => {
    DriverService.isDebitcardUnitnumberExist(debitCardUnitNumber, id)
      .then((res) => {
        setCheckDebitcardUnitNumber(res?.data);
      })
      .catch((err) => {
        console.log(err);
        navigate(`/driver-maintenance`);
      });
  };
  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-labelt dealer-label">Accumulated Bond</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={accumulatedBond}
                maxLength={8}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Number of Bond Draws</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-60px">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={bondDraws}
                maxLength={14}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Bond Draw Amount</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={bondDrawAmount}
                maxLength={8}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Last Bond Draw</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={bondLastDrawDate} setDate={setBondDrawAmount} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Deduction Percentage</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  viewDetail || bondExempt
                    ? ""
                    : !bondExempt && bondRate && bondRate > 0
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={bondRate}
                maxLength={2}
                disabled={viewDetail || bondExempt}
                onChange={(e) => {
                  setBondRate(isNumber(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Total Bond</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail || bondExempt
                    ? ""
                    : !bondExempt && totalBond && totalBond > 0
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={totalBond}
                maxLength={14}
                disabled={viewDetail || bondExempt}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setTotalBond(isNumber(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Bond Exempt</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={bondExempt}
                checked={bondExempt}
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.checked;
                  setBondExempt(value);
                  if (value) {
                    setBondRate(0);
                    setTotalBond(0);
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Prepaid Bond</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={prepaidBond}
                checked={prepaidBond}
                disabled={viewDetail || id}
                onChange={(e) => {
                  const value = e.target.checked;
                  setPrepaidBond(value);
                  if (!value) {
                    setPrepaidBondAmount("");
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Prepaid Bond Amount</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                id="customer"
                name="customer"
                type="customer"
                value={prepaidBondAmount}
                disabled={viewDetail || id || !prepaidBond}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                    setPrepaidBondAmount(isNumber(e.target.value));
                }}
                className={`customFormControl ${
                  viewDetail === true || !prepaidBond || id
                    ? ""
                    : (!id &&
                          !bondExempt &&
                          prepaidBond &&
                          prepaidBondAmount &&
                          prepaidBondAmount <= totalBond - accumulatedBond &&
                          prepaidBondAmount > 0) ||
                        (!id && bondExempt && prepaidBond && prepaidBondAmount && prepaidBondAmount > 0) ||
                        (id && !bondExempt && prepaidBond && prepaidBondAmount) ||
                        (bondExempt && prepaidBond && prepaidBondAmount && id)
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Accumulated Reserves</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={accumulatedReserve}
                maxLength={14}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Number of Reserve Draws</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-60px">
              <Input type="text" className="customFormControl" value={reserveDraws} maxLength={14} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Reserve Draw Amount</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={reserveDrawAmount}
                maxLength={14}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Last Reserve Draw</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={reserveLastDrawDate} setDate={setReserveLastDrawDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Total Reserves</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={totalReserve}
                maxLength={14}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={8} md={8} xs={8} className="ps-lg-2">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">YTD 1099 Amount</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={ytd1099Amount}
                maxLength={14}
                disabled
              />
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0"></Col>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Has Debit Card</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={hasDebitCard}
                disabled={viewDetail}
                checked={hasDebitCard}
                onChange={(e) => {
                  const value = e.target.checked;
                  setHasDebitCard(value);
                  if (value) {
                    getNextDebitCardNumbers();
                  } else {
                    setDebitCardNumber("");
                    setDebitCardUnitNumber("");
                    setDebitCardID("");
                    setDebitCardDirectDeposit(false);
                    setDebitcardIssuedId(null);
                    setDebitcardIssuednput("");
                    setDebitCardExpirationDate("");
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">No Pickup Fees</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={payPickupFee}
                checked={payPickupFee}
                disabled={viewDetail}
                onChange={(e) => {
                  setPayPickupFee(e.target.checked);
                }}
              />
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0"></Col>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Debit Card Issued By</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className={`p-0 d-flex w-250px`}>
              <AutoCompleteDropdown
                arrayList={debitcardIssuedData}
                searchString={debitcardIssuedInput}
                renderItemId={(item) => item.debitCardPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => setDebitcardIssuednput(string)}
                fetchDataBySearchString={fetchDebitCards}
                onSelect={handlerDebitCardSelection}
                clearInputCallback={() => {
                  setDebitcardIssuedId(null);
                }}
                loading={debitcardLoading}
                selectedId={debitcardIssuedId}
                disabled={viewDetail || !hasDebitCard}
                className={`customFormControl ${
                  viewDetail === true || !hasDebitCard
                    ? ""
                    : (hasDebitCard && debitcardIssuedInput && debitcardIssuedId && !id) ||
                        (hasDebitCard &&
                          debitcardIssuedInput &&
                          debitcardIssuedId &&
                          id &&
                          ((debitcardProcessCards && !activeDebitCard) ||
                            (debitcardProcessCards && activeDebitCard)))
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">In Bonus Program</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={inBonusProgram}
                checked={inBonusProgram}
                disabled={viewDetail}
                onChange={(e) => {
                  setInBonusProgram(e.target.checked);
                }}
              />
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0"></Col>

            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Debit Card User ID</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0 w-150px">
              <input
                className={`customFormControl`}
                id="customer"
                name="customer"
                type="customer"
                value={debitCardID}
                maxLength={10}
                disabled
                onChange={(e) => {
                  setDebitCardID(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input type="checkbox" className="form-check-input p-0 " hidden={id || !id} />
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0"></Col>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Debit Card Unit Number</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true || !hasDebitCard
                    ? ""
                    : hasDebitCard && debitCardUnitNumber && !checkDebitcardUnitNumber
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={debitCardUnitNumber}
                maxLength={4}
                disabled={viewDetail || !hasDebitCard}
                onChange={(e) => {
                  setDebitCardUnitNumber(isCapsCharacterOrDigits(e.target.value));
                }}

                onBlur={(e) => {
                  const value = e.target.value?.trim();

                  if (value) {
                    handleCheckNumber(value);
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input type="checkbox" className="form-check-input p-0 " hidden={id || !id} />
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0"></Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Debit Card Number</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true || !hasDebitCard
                    ? ""
                    : hasDebitCard && debitCardNumber?.length === 16 && debitCardValid
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="dbCdNo"
                name="dbCdNo"
                type="text"
                value={debitCardNumber}
                maxLength={16}
                autoComplete="one-time-code"
                spellCheck={false}
                aria-autocomplete="none"
                disabled={viewDetail || !hasDebitCard}
                onChange={(e) => {
                  setDebitCardNumber(isDays(e.target.value));
                  setDebitCardValid(true);
                }}
                onBlur={(e) => lunhsValidation(e.target.value?.trim())}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input type="checkbox" className="form-check-input p-0 " hidden={id || !id} />
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0"></Col>

            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Debit Card Expiration Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-75px">
              <Input
                type="input"
                maxLength={7}
                className={`customFormControl ${
                  viewDetail === true || !hasDebitCard
                    ? ""
                    : hasDebitCard &&
                        !dateFlag &&
                        debitCardExpirationDate &&
                        (debitCardExpirationDate.match(mmYYFormat) ||
                          debitCardExpirationDate.match(mmYYYYFormat))
                      ? "borderGreen"
                      : "borderRed"
                }`}
                value={debitCardExpirationDate}
                disabled={viewDetail || !hasDebitCard}
                onChange={(e) => {
                  setDebitCardExpirationDate(formatExpirationDateValidation(e.target.value));
                  HandlerExpDate(e);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input type="checkbox" className="form-check-input p-0 " hidden={id || !id} />
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0"></Col>

            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Debit Card Direct Deposit</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={debitCardDirectDeposit}
                checked={debitCardDirectDeposit}
                disabled={viewDetail || !hasDebitCard}
                onChange={(e) => {
                  setDebitCardDirectDeposit(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0 m-t-100">
            <Col xs={2} md={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Hold Pay</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={holdPay}
                checked={holdPay}
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.checked;
                  setHoldPay(value);
                  if (!value) {
                    setHoldPayDate("");
                    setHoldPayReason("");
                    setHoldPayUserId(null);
                    setHoldPayUserInput("");
                  } else {
                    setHoldPayUserId(loggedInUser?.userPK);
                    setHoldPayUserInput(loggedInUser?.name?.trim());
                    setHoldPayDate(formatDatetimeToDate(new Date()));
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={2} md={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Hold Pay Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={holdPayDate}
                setDate={setHoldPayDate}
                disabled={viewDetail || !holdPay}
                setIsDateValid={setIsHoldPayDateValidation}
                className={`customFormControl ${
                  viewDetail || !holdPay
                    ? ""
                    : holdPay && holdPayDate && isHoldPayDateValidation
                      ? "borderGreen"
                      : "borderRed"
                } `}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={2} md={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Hold Pay User</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                arrayList={holdPayUserData}
                searchString={holdPayUserInput}
                renderItemId={(item) => item.userPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => setHoldPayUserInput(string)}
                fetchDataBySearchString={fetchHoldPayUsers}
                onSelect={handlerHoldPayUserLookupSelection}
                loading={userLoading}
                clearInputCallback={() => {
                  setHoldPayUserId(null);
                }}
                towardsTop
                selectedId={holdPayUserId}
                className={`customFormControl ${
                  viewDetail || !holdPay
                    ? ""
                    : holdPay && holdPayUserId && holdPayUserInput
                      ? "borderGreen"
                      : "borderRed"
                } `}
                disabled={viewDetail || !holdPay}
              />
              <LookupButton onClick={handleHoldPayUserLookup} disabled={viewDetail || !holdPay} />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <label className="col-form-label dealer-label p-0 m-b-20">Hold Pay Reason</label>
            </Col>

            <Col sm={7} md={7} className="p-0">
              <textarea
                rows={7}
                cols={6}
                type="text"
                className={`customFormControl h-100 ${
                  viewDetail === true || !holdPay
                    ? ""
                    : holdPay && holdPayReason
                      ? "borderGreen"
                      : "borderRed"
                }`}
                name="notes"
                value={holdPayReason}
                autoComplete="newpassword"
                aria-autocomplete="none"
                disabled={viewDetail || !holdPay}
                onInput={(e) => setHoldPayReason(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <UserLookup
        show={holdPayUserLookUpShow}
        onHide={() => setHoldPayUserLookUpShow(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handlerHoldPayUserLookupSelection}
        MaintenanceProgram
      />
      {load && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverFundTab;
