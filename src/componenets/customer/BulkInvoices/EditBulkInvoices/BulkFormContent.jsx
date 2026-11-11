import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import CustomerBulkInvoice from "../../../../services/CustomerBulkInvoice";
import formatString from "../../../../utils/validation/ExpirationDate";
import numberValidation from "../../../../utils/validation/NumberValidation";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import CustomerCreditCardService from "../../../../services/CustomerCreditCardService";
import CustomerService from "../../../../services/CustomerService";
import { setCheckCardNumber, setCardTest } from "../../../../redux/CustomerCreditCardSlice";
import {
  setChargeCreditCard,
  setCreditCardAddress,
  setCreditCardExpirationDate,
  setCreditCardNumber,
  setCreditCardPostalCode,
  setDescription,
  setNotes,
  setPoNumber,
  setProjectCode,
  setCreditCardName,
  setEditModeRedux,
  setCheckZip,
  setIsConfiguredCustomer,
  setIsCardValid,
  setIsInvalidDate,
  setInvoiced,
  setCheckDesExist,
  setCheckProCodeExist,
  setIsNormalZipValid,
  setIsCanadianZipValid,
  setCVV,
  setUnMaskedCreditCardNumber,
  setDateErr,
} from "../../../../redux/CustomerBulkInvoiceSlice";
import { removeLeadingWhitespace } from "../../../../utils/utils";
import LoadingIcon from "../../../common/LoadingIcon";
import Input from "../../../../components/common/input";

const BulkFormContent = (props) => {
  const { checkDesc, setCheckDesc, checkProjectCode, setCheckProjectCode, OECustomerTab } = props;
  const navigation = useNavigate();
  const params = useParams();
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const id = OECustomerTab ? selectedCustomer?.customerPK : params?.cpk;
  const pageNum = params?.pageNumber;
  const bipk = params?.bipk;
  const dispatch = useDispatch();
  const [chargeCredit, setCreditFields] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [descriptions, setDescriptions] = useState("");
  const [projectCde, setProjectCde] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpirationDate, setCardExpirationDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardAddress, setCardAddress] = useState("");
  const [onBlur, setOnBlur] = useState(false);
  const [cardZip, setCardZip] = useState("");
  const [creditCardList, setCreditCardList] = useState([]);
  const [creditCardIndex, setCreditCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCredit, setSelectCredit] = useState(false);
  const [canadian, setCanadian] = useState("");
  const [normalZipValidationState, setNormalZipValidationState] = useState(true);
  const [canadianZipValidationState, setCanadianZipValidationState] = useState(true);

  const dateErr = useSelector((state) => state.customerBulkInvoice.dateErr);

  const [expDate, setExpDate] = useState("");
  const validationSchema = yup.object({
    descriptions: yup.string().required(),
    projectCde: yup.string(),
    chargeCredit: yup.boolean(),
    cardNumber: yup.string().when("chargeCredit", {
      is: true,
      then: yup.string().max(16).min(16).required(),
    }),
    cardExpirationDate: yup.string().when("chargeCredit", {
      is: true,
      then: yup.string().required(),
    }),
    cardZip: yup.string().when("canadian", {
      is: true,
      then: yup.string().matches(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/),
      otherwise: yup.string().matches(/^((\d{5}-\d{4})|(\d{5}))$/),
    }),
  });

  const {
    description,
    poNumber,
    projectCode,
    chargeCreditCard,
    notes,
    creditCardNumber,
    creditCardExpirationDate,
    creditCardName,
    creditCardAddress,
    creditCardPostalCode,
    editModeRedux,
    checkZip,
    invoiced,
    cvv,
  } = useSelector((state) => state.customerBulkInvoice);

  const isCardValid = useSelector((state) => state.customerBulkInvoice.isCardValid);
  const checkDesExist = useSelector((state) => state.customerBulkInvoice.checkDesExist);
  const checkProCodeExist = useSelector((state) => state.customerBulkInvoice.checkProCodeExist);

  useEffect(() => {
    setCheckDesc("");
    setCheckProjectCode("");
  }, [editModeRedux]);

  useEffect(() => {
    if (chargeCredit && isConfigured) {
      CustomerCreditCardService.listCustomerCreditCardsByCustomerId(id)
        .then((res) => {
          setCreditCardList(res?.data || []);
        })
        .catch((e) => {
          console.log("error while fetching cards", e);
        });
    }
  }, [chargeCredit]);

  useEffect(() => {
    getCanadian();
    if (!OECustomerTab) {
      if (bipk) {
        setOnBlur(true);
        dispatch(setEditModeRedux(true));
        CustomerBulkInvoice.getBulkInvoicesEdit(bipk)
          .then((res) => {
            const data = res?.data;
            dispatch(setDescription(data?.description));
            dispatch(setPoNumber(data?.poNumber));
            dispatch(setProjectCode(data?.projectCode));
            dispatch(setChargeCreditCard(data?.chargeCreditCard));
            dispatch(setNotes(data?.notes));
            dispatch(setCreditCardNumber(data?.creditCardNumber || ""));
            dispatch(setUnMaskedCreditCardNumber(data?.creditCardNumber?.trim()));
            dispatch(setCreditCardExpirationDate(data?.creditCardExpirationDate?.trim()));
            dispatch(setCreditCardName(data?.creditCardName));
            dispatch(setCreditCardAddress(data?.creditCardAddress));
            dispatch(setCreditCardPostalCode(data?.creditCardPostalCode?.trim()));
            dispatch(setCVV(data?.creditCardSecurityCode?.trim()));
            if (data?.invoiceDate !== null)
              dispatch(setInvoiced(moment(data?.invoiceDate?.split("T")[0]).format("MM/DD/YY")));
            setCreditFields(data?.chargeCreditCard);

            if (chargeCredit && isConfigured) {
              CustomerCreditCardService.listCustomerCreditCardsByCustomerId(id).then((res) => {
                setCreditCardList(res?.data || []);
              });
            }
          })
          .catch((err) => {
            console.log(err);
            navigation("/bulk-invoices/" + id + "/" + pageNum);
          });
      }
    }
  }, []);

  //checking the customer is canadian or not for validation
  const getCanadian = () => {
    setIsLoading(true);
    CustomerService.getCustomerById(id)
      .then((response) => {
        const data = response?.data;
        setCanadian(data?.canadian);
        if (data?.creditcardpayments == "N") {
          setIsConfigured(false);
          dispatch(setIsConfiguredCustomer(false));
        } else {
          setIsConfigured(true);
          dispatch(setIsConfiguredCustomer(true));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const normalZipValidation = (e) => {
    let value = e.target.value;
    if (value.match(/^((\d{5}-\d{4})|(\d{5}))$/)) {
      setNormalZipValidationState(true);
      dispatch(setIsNormalZipValid(true));
    } else {
      setNormalZipValidationState(false);
      dispatch(setIsNormalZipValid(false));
    }
  };
  const canadianZipValidation = (e) => {
    let value = e.target.value;
    if (value.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/)) {
      setCanadianZipValidationState(true);
      dispatch(setIsCanadianZipValid(true));
    } else {
      setCanadianZipValidationState(false);
      dispatch(setIsCanadianZipValid(false));
    }
  };

  const checkZipCode = (creditCardPostalCode) => {
    if (creditCardPostalCode?.length >= 5) {
      if (!canadian && creditCardPostalCode?.length >= 5) {
        const uszip = creditCardPostalCode?.slice(0, 5);

        CustomerCreditCardService.checkZipCode(uszip)
          .then((response) => {
            dispatch(setCheckZip(response?.data));
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (canadian && creditCardPostalCode?.length == 7) {
        CustomerCreditCardService.checkZipCode(creditCardPostalCode)
          .then((response) => {
            dispatch(setCheckZip(response?.data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (creditCardPostalCode?.length < 5) {
      dispatch(setCheckZip(""));
    }
  };

  // Check Description already exists for a customer
  const handleCheckdesc = (e) => {
    CustomerBulkInvoice.checkDescriptionExist(bipk, e.target.value, id)
      .then((res) => {
        setCheckDesc(res?.data);
        dispatch(setCheckDesExist(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Check Project Code already exists for a customer
  const handleCheckProjectCode = (e) => {
    if (projectCode) {
      CustomerBulkInvoice.checkProjectCodeExist(bipk, e.target.value, id)
        .then((res) => {
          setCheckProjectCode(res?.data);
          dispatch(setCheckProCodeExist(res?.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCheckProjectCode("");
      dispatch(setCheckProCodeExist(""));
    }
  };

  const handleCreditCard = (value) => {
    if (value == "Select") {
      setCardNumber("");
      dispatch(setCreditCardNumber(""));
      dispatch(setUnMaskedCreditCardNumber(""));

      setCardExpirationDate("");
      dispatch(setCreditCardExpirationDate(""));

      setCardName("");
      dispatch(setCreditCardName(""));

      dispatch(setCreditCardAddress(""));
      setCardAddress("");

      setCardZip("");
      dispatch(setCreditCardPostalCode(""));
      dispatch(setCVV(""));
      dispatch(setIsInvalidDate(true));
      setSelectCredit(false);
    } else {
      dispatch(setCheckZip(""));
      dispatch(setIsInvalidDate(true));
      setNormalZipValidationState(true);
      setCanadianZipValidationState(true);
      const cardData = creditCardList.find((item) => item.customerCreditCardPK == value);

      setCardNumber(cardData?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X"));
      dispatch(setCreditCardNumber(cardData?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X")));
      dispatch(setUnMaskedCreditCardNumber(cardData?.creditCardNumber));

      setCardExpirationDate(cardData?.creditCardExpirationDate);
      dispatch(setCreditCardExpirationDate(cardData?.creditCardExpirationDate));
      validateExpDate(cardData.creditCardExpirationDate);

      setCardName(cardData?.creditCardName);
      dispatch(setCreditCardName(cardData?.creditCardName));

      setCardAddress(cardData?.creditCardAddress);
      dispatch(setCreditCardAddress(cardData?.creditCardAddress));

      setCardZip(cardData?.creditCardPostalCode);
      dispatch(setCreditCardPostalCode(cardData?.creditCardPostalCode));
      dispatch(setCVV(cardData?.cardCode?.trim()));
      setSelectCredit(true);
    }
  };

  const validateExpDate = (value) => {
    if (!value) return;

    const now = new Date();
    const currentMonth = now.getUTCMonth() + 1;
    const currentYear = parseInt(now.getUTCFullYear().toString().slice(2));

    const [monthStr, yearStr] = value.split("/");
    const month = parseInt(monthStr);
    const year = parseInt(yearStr);

    let isInvalid = true;

    if (year > currentYear || (year === currentYear && month >= currentMonth)) {
      isInvalid = false;
    }

    dispatch(setIsInvalidDate(isInvalid));
  };

  // Add this function to validate expiration date
  const validateExpirationDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 5 || !dateStr.includes("/")) {
      return { isValid: false, isExpired: false, message: "Invalid format" };
    }

    try {
      const [monthStr, yearStr] = dateStr.split("/");
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10);

      // Basic validation
      if (isNaN(month) || isNaN(year)) {
        return { isValid: false, isExpired: false, message: "Invalid date" };
      }

      if (month < 1 || month > 12) {
        return { isValid: false, isExpired: false, message: "Invalid month" };
      }

      // Get current date
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // 1-12
      const currentYear = now.getFullYear() % 100; // Last 2 digits

      // Check if date is in the future
      const isExpired = year < currentYear || (year === currentYear && month < currentMonth);
      const isValid = !isExpired;

      return {
        isValid,
        isExpired,
        message: isExpired ? "Card is expired" : "Valid expiration date",
      };
    } catch (error) {
      return { isValid: false, isExpired: false, message: "Invalid date format" };
    }
  };

  const HandlerExpDate = (e) => {
    const value = formatString(e.target.value);
    setExpDate(value);
    dispatch(setCreditCardExpirationDate(value));

    if (value && value.length === 5) {
      const validation = validateExpirationDate(value);
      dispatch(setDateErr(validation.isExpired));
      dispatch(setIsInvalidDate(validation.isExpired));
    } else {
      dispatch(setDateErr(false));
      dispatch(setIsInvalidDate(false));
    }
  };

  useEffect(() => {
    if (creditCardPostalCode !== null) checkZipCode(creditCardPostalCode);
  }, [creditCardPostalCode]);

  useEffect(() => {
    if (editModeRedux) {
      setNormalZipValidationState(true);
      setCanadianZipValidationState(true);
      dispatch(setIsNormalZipValid(true));
      dispatch(setIsCanadianZipValid(true));
      dispatch(setCheckZip(""));
    }
  }, [editModeRedux]);

  useEffect(() => {
    if (!chargeCreditCard) {
      setCardNumber("");
      dispatch(setCreditCardNumber(""));
      dispatch(setUnMaskedCreditCardNumber(""));

      setCardExpirationDate("");
      dispatch(setCreditCardExpirationDate(""));

      setCardName("");
      dispatch(setCreditCardName(""));

      dispatch(setCreditCardAddress(""));
      setCardAddress("");

      setCardZip("");
      dispatch(setCreditCardPostalCode(""));

      setSelectCredit(false);

      setCreditCardIndex(null);
      dispatch(setCVV(""));
    }
  }, [chargeCreditCard]);

  const renderCreditCardData = creditCardList?.map((i, index) => {
    return (
      <option value={i.customerCreditCardPK}>{i.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X")}</option>
    );
  });

  return (
    <Formik
      initialValues={{
        descriptions,
        projectCde,
        chargeCredit,
        cardNumber,
        cardExpirationDate,
        cardZip,
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      initialTouched={{
        descriptions: true,
        projectCde: true,
        chargeCredit: true,
        cardNumber: true,
        cardExpirationDate: true,
        cardZip: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="w-100 p-2  ">
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Row className="m-0 p-0">
                    <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0 text-end">
                          <Form.Label htmlFor="name" className="col-form-label me-4">
                            {t("bulkinvoice.page.edit.discription")}
                          </Form.Label>
                        </Col>
                        <Col xs={6} md={6} sm={6} className="p-0">
                          <Input
                            className={`${styles.formControl} ${
                              editModeRedux
                                ? ""
                                : description?.length >= 1
                                  ? checkDesc || checkDesExist
                                    ? "borderRed"
                                    : "borderGreen"
                                  : "borderRed"
                            }`}
                            id="description"
                            name="description"
                            type="text"
                            value={description}
                            disabled={editModeRedux}
                            maxLength={30}
                            onBlur={handleCheckdesc}
                            onChange={(e) => {
                              formik.handleChange(e);
                              setDescriptions(removeLeadingWhitespace(e.target.value));
                              dispatch(setDescription(removeLeadingWhitespace(e.target.value)));
                              setCheckDesc("");
                              dispatch(setCheckDesExist(""));
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0 text-end">
                          <Form.Label htmlFor="name" className="col-form-label me-4">
                            {t("bulkinvoice.page.edit.ponumber")}
                          </Form.Label>
                        </Col>
                        <Col xs={6} md={6} sm={6} className="p-0">
                          <Input
                            type="text"
                            className={styles.formControl}
                            id="ponumber"
                            name="ponumber"
                            value={poNumber}
                            maxLength={30}
                            disabled={editModeRedux}
                            onChange={(e) => {
                              dispatch(setPoNumber(removeLeadingWhitespace(e.target.value)));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0 text-end">
                          <Form.Label htmlFor="projectcode" className="col-form-label me-4">
                            {t("bulkinvoice.page.edit.projectcode")}
                          </Form.Label>
                        </Col>
                        <Col xs={6} md={6} sm={6} className="p-0">
                          <Input
                            className={`${styles.formControl} ${
                              editModeRedux
                                ? "borderBlack"
                                : checkProjectCode || checkProCodeExist
                                  ? "borderRed"
                                  : "borderBlack"
                            }`}
                            id="projectcode"
                            name="projectcode"
                            type="search"
                            value={projectCode}
                            disabled={editModeRedux}
                            maxLength={30}
                            onBlur={handleCheckProjectCode}
                            onChange={(e) => {
                              formik.handleChange(e);
                              setProjectCde(removeLeadingWhitespace(e.target.value));
                              dispatch(setProjectCode(removeLeadingWhitespace(e.target.value)));
                              setCheckProjectCode("");
                              dispatch(setCheckProCodeExist(""));
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0 text-end">
                          <Form.Label htmlFor="address1" className="col-form-label me-4">
                            {t("bulkinvoice.page.edit.invoiced")}
                          </Form.Label>
                        </Col>
                        <Col xs={3} md={3} sm={3} className="p-0">
                          <Input
                            className={styles.formControl}
                            id="invoiced"
                            name="invoiced"
                            type="search"
                            value={invoiced}
                            maxLength={30}
                            disabled={editModeRedux || true}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0 text-start">
                          <label className="col-form-label dealer-label p-0 m-b-0">
                            {t("bulkinvoice.page.edit.notes")}
                          </label>
                        </Col>
                      </Form.Group>
                      <Form.Group className="margin-box-5 mt-2  m-b-10 align-items-center row  m-l-0 m-r-0">
                        <Col xs={10} md={10} sm={10} className="p-0 h-125px">
                          <textarea
                            rows={20}
                            cols={40}
                            type="text"
                            disabled={editModeRedux}
                            className="form-control h-100 "
                            id="notes"
                            value={notes}
                            onChange={(e) => {
                              dispatch(setNotes(removeLeadingWhitespace(e.target.value)));
                            }}
                            name="notes"
                          />
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col
                      sm={6}
                      md={6}

                      xs={6}
                    >
                      <Form.Group className="margin-box-5 form-group m-t-32 m-b-10 align-items-center row  m-l-0 m-r-0">
                        <Col
                          sm={5}
                          md={5}
                          xs={5}

                          className="p-0 text-end"
                        >
                          <Form.Label className=" col-form-label me-2">
                            {t("bulkinvoice.page.edit.chargecredit")}
                          </Form.Label>
                        </Col>
                        <Col xs={1} md={1} sm={1} className="p-0">
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            id="chargecredit"
                            checked={chargeCreditCard}
                            disabled={editModeRedux}
                            onChange={(e) => {
                              const value = e.target.checked;
                              dispatch(setChargeCreditCard(value));
                              setCreditFields(value);
                              if (!value) {
                                setCreditCardList([]);
                                dispatch(setUnMaskedCreditCardNumber(""));
                                dispatch(setCreditCardNumber(""));
                              }
                            }}
                            name="chargecredit"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col
                          sm={5}
                          md={5}
                          xs={5}

                          className="p-0 text-end"
                        >
                          <Form.Label className="col-form-label me-4">
                            {t("bulkinvoice.page.edit.creditcards")}
                          </Form.Label>
                        </Col>
                        <Col xs={6} md={6} sm={6} className="p-0">
                          <Form.Select
                            className={styles.formControl}
                            name="creditCards"
                            disabled={editModeRedux || !chargeCredit || !isConfigured}
                            id="creditCards"
                            onChange={(e) => {
                              setCreditCardIndex(e.target.value);
                              handleCreditCard(e.target.value);
                            }}
                          >
                            <option value={null} selected>
                              Select
                            </option>
                            {renderCreditCardData}
                          </Form.Select>
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col
                          sm={5}
                          md={5}
                          xs={5}

                          className="p-0 text-end"
                        >
                          <Form.Label className="col-form-label me-4">
                            {t("bulkinvoice.page.edit.nameoncard")}
                          </Form.Label>
                        </Col>
                        <Col xs={6} md={6} sm={6} className="p-0">
                          <Input
                            type="text"
                            className={styles.formControl}
                            id="nameoncard"
                            name="nameoncard"
                            disabled={editModeRedux || !chargeCredit || selectCredit || !isConfigured}
                            value={creditCardName}
                            maxLength={20}
                            onChange={(e) => {
                              setCardName(removeLeadingWhitespace(e.target.value));
                              dispatch(setCreditCardName(removeLeadingWhitespace(e.target.value)));
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col
                          sm={5}
                          md={5}
                          xs={5}

                          className="p-0 text-end"
                        >
                          <Form.Label className="col-form-label me-4">
                            {t("bulkinvoice.page.edit.cardnumber")}
                          </Form.Label>
                        </Col>

                        <Col xs={4} md={4} sm={4} className="p-0">
                          <Input
                            type="search"

                            className={`${styles.formControl} ${
                              editModeRedux
                                ? ""
                                : chargeCredit && isConfigured && !selectCredit
                                  ? !creditCardNumber?.trim()
                                    ? "borderRed"
                                    : creditCardNumber?.trim().length === 16 ||
                                        creditCardNumber?.trim().length === 15
                                      ? "borderGreen"
                                      : "borderRed"
                                  : ""
                            }`}

                            id="cardnumber"
                            name="cardnumber"
                            value={
                              onBlur ? creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X") : creditCardNumber
                            }
                            maxLength={16}

                            disabled={editModeRedux || !chargeCredit || selectCredit || !isConfigured}
                            onBlur={(e) => {
                              setOnBlur(true);
                            }}
                            onFocus={() => setOnBlur(false)}
                            onChange={(e) => {
                              const cardNumber = e.target.value?.replace(/[^\d:.\d{1}]/g, "");
                              dispatch(setCreditCardNumber(cardNumber || ""));
                              dispatch(setUnMaskedCreditCardNumber(e.target.value));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col
                          sm={5}
                          md={5}
                          xs={5}

                          className="p-0 text-end"
                        >
                          <Form.Label className="col-form-label me-1 noWrapLabel">
                            {t("bulkinvoice.page.edit.expirationdate")}
                          </Form.Label>
                        </Col>
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <Input
                            type="text"
                            className={`${styles.formControl} ${
                              editModeRedux
                                ? ""
                                : chargeCredit && isConfigured && !selectCredit
                                  ? creditCardExpirationDate != null && creditCardExpirationDate?.length == 5
                                    ? dateErr && !selectCredit
                                      ? "borderRed"
                                      : "borderGreen"
                                    : "borderRed"
                                  : ""
                            }`}
                            id="expirationdate"
                            name="expirationdate"
                            value={creditCardExpirationDate}
                            maxLength={5}
                            disabled={editModeRedux || !chargeCredit || selectCredit || !isConfigured}
                            onChange={HandlerExpDate}
                            onBlur={formik.handleBlur}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0 text-end">
                          <Form.Label className="col-form-label me-1 noWrapLabel">
                            {t("bulkinvoice.page.edit.cardbillingaddress")}
                          </Form.Label>
                        </Col>
                        <Col xs={6} md={6} sm={6} className="p-0">
                          <Input
                            type="text"
                            className={styles.formControl}
                            id="ad2"
                            name="ad2"
                            value={creditCardAddress}
                            maxLength={20}
                            disabled={editModeRedux || !chargeCredit || selectCredit || !isConfigured}
                            onChange={(e) => {
                              setCardAddress(removeLeadingWhitespace(e.target.value));
                              dispatch(setCreditCardAddress(removeLeadingWhitespace(e.target.value)));
                            }}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0 text-end">
                          <Form.Label className="col-form-label me-1">
                            {t("bulkinvoice.page.edit.cardbillingzipcode")}
                          </Form.Label>
                        </Col>
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <Input
                            type="text"

                            className={`${styles.formControl} ${
                              canadian
                                ? editModeRedux
                                  ? "borderBlack"
                                  : creditCardPostalCode?.length >= 1
                                    ? checkZip
                                      ? "borderRed"
                                      : canadianZipValidationState
                                        ? "borderBlack"
                                        : "borderRed"
                                    : "borderBlack"
                                : editModeRedux
                                  ? "borderBlack"
                                  : creditCardPostalCode?.length >= 1
                                    ? checkZip
                                      ? "borderRed"
                                      : normalZipValidationState
                                        ? "borderBlack"
                                        : "borderRed"
                                    : "borderBlack"
                            }`}
                            id="ad1"
                            name="cardbillingzipcode"
                            value={creditCardPostalCode}
                            maxLength={canadian ? 7 : 10}
                            disabled={editModeRedux || !chargeCredit || selectCredit || !isConfigured}
                            onChange={(e) => {
                              let value = e.target.value;
                              if (canadian) {
                                value = value.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
                                if (value?.length > 3 && value.indexOf(" ") === -1) {
                                  value = value.slice(0, 3) + " " + value.slice(3);
                                }
                              } else {
                                value = value.replace(/[^0-9\-]/g, "");
                                if (value?.length > 5 && value.indexOf("-") === -1) {
                                  value = value.slice(0, 5) + "-" + value.slice(5);
                                }
                              }
                              formik.handleChange(value);
                              setCardZip(value);
                              dispatch(setCreditCardPostalCode(value));
                              dispatch(setCheckZip(""));
                              canadian ? canadianZipValidation(e) : normalZipValidation(e);
                            }}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={5} md={5} xs={5} className="p-0 text-end">
                          <Form.Label className="col-form-label me-1">Security Code</Form.Label>
                        </Col>
                        <Col xs={3} sm={3} md={3} className="p-0 w-50px">
                          <Input
                            className={`${styles.formControl} ${
                              editModeRedux
                                ? ""
                                : chargeCredit && isConfigured && !selectCredit
                                  ? cvv?.length > 2
                                    ? "borderGreen"
                                    : "borderRed"
                                  : ""
                            }`}

                            type="cvv"
                            name="cvv"
                            value={cvv}
                            disabled={editModeRedux || !chargeCredit || selectCredit || !isConfigured}
                            maxLength={4}
                            onChange={(e) => {
                              dispatch(setCVV(e.target.value));
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            {isLoading && <LoadingIcon />}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BulkFormContent;
