import React from "react";
import { t } from "i18next";
import { Form, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import {
  setCustomerCreditCardEditData,
  setCustomerCreditCards,
  setViewDetail,
  setNameOnCard,
  setCardBillingAddress,
  setCardBillingZipcode,
  setPrimaryCard,
  setExpirationDate,
  setCardNumber,
  setCheckCardNumber,
  setCheckPrimary,
  resetChanges,
  setCardTest,
  setCheckZip,
  setTotalElements,
  setDateMessage,
  setIsLoading,
  setCVV,
} from "../../../../redux/CustomerCreditCardSlice";
import CustomerCreditCardService from "../../../../services/CustomerCreditCardService";
import CustomerService from "../../../../services/CustomerService";
import formatDateValidation from "../../../../utils/validation/DateValidation";
import ModalComponent from "../../../common/ModalComponent";
import { zipVal } from "../../../../utils/validation/ZipCodeValidation";
import Input from "../../../../components/common/input";

const CustomerCreditCardFormContent = ({ QuarterScreen }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const params = useParams();
  const customerId = params.customerId;
  const customerCreditCardPK = params.id;
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerCreditCardReducer.viewDetail);
  const customerCreditEditData = useSelector(
    (state) => state.customerCreditCardReducer.customerCreditEditData
  );

  const pageNumber = useSelector((state) => state.customerCreditCardReducer.pageNumber);
  const changesCancelled = useSelector((state) => state.customerCreditCardReducer.changesCancelled);
  const nameOnCard = useSelector((state) => state.customerCreditCardReducer.nameOnCard);
  const cardBillingAddress = useSelector((state) => state.customerCreditCardReducer.cardBillingAddress);
  const cardNumber = useSelector((state) => state.customerCreditCardReducer.cardNumber);
  const expirationDate = useSelector((state) => state.customerCreditCardReducer.expirationDate);
  const cardBillingZipcode = useSelector((state) => state.customerCreditCardReducer.cardBillingZipcode);
  const primaryCard = useSelector((state) => state.customerCreditCardReducer.primaryCard);
  const checkCardNumber = useSelector((state) => state.customerCreditCardReducer.checkCardNumber);
  const checkPrimary = useSelector((state) => state.customerCreditCardReducer.checkPrimary);
  const isLoading = useSelector((state) => state.customerCreditCardReducer.isLoading);
  const totalElements = useSelector((state) => state.customerCreditCardReducer.totalElements);

  const dateMessage = useSelector((state) => state.customerCreditCardReducer.dateMessage);
  const checkZip = useSelector((state) => state.customerCreditCardReducer.checkZip);
  const cvv = useSelector((state) => state.customerCreditCardReducer.cvv);
  const [canadian, setCanadian] = useState("");
  const [primaryShow, setPrimaryShow] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [isPrimary, setIsPrimary] = useState("");
  const [normalZipValidationState, setNormalZipValidationState] = useState(true);
  const [cadianZipValidationState, setCadianZipValidationState] = useState(true);

  useEffect(() => {
    if (customerCreditEditData === undefined) {
      dispatch(setNameOnCard(""));
      dispatch(setCardNumber(""));
      dispatch(setCardBillingAddress(""));
      dispatch(setExpirationDate(""));
      dispatch(setCardBillingZipcode(""));
      dispatch(setPrimaryCard());
      dispatch(setCheckCardNumber(""));
      dispatch(setCVV(""));
    }
  }, [customerCreditEditData]);
  useEffect(() => {
    if (customerCreditEditData != null) {
      dispatch(
        setNameOnCard(customerCreditEditData.creditCardName ? customerCreditEditData.creditCardName : "")
      );
      if (viewDetail) {
        dispatch(setCardNumber(maskNumber(customerCreditEditData?.creditCardNumber)));
      } else {
        dispatch(setCardNumber(customerCreditEditData?.creditCardNumber));
      }
      dispatch(
        setCardBillingAddress(
          customerCreditEditData.creditCardAddress ? customerCreditEditData.creditCardAddress : ""
        )
      );
      dispatch(
        setExpirationDate(
          customerCreditEditData.creditCardExpirationDate
            ? customerCreditEditData.creditCardExpirationDate
            : ""
        )
      );
      dispatch(setCVV(customerCreditEditData?.cardCode));
      dispatch(
        setCardBillingZipcode(
          customerCreditEditData.creditCardPostalCode ? customerCreditEditData.creditCardPostalCode : ""
        )
      );
      dispatch(setPrimaryCard(customerCreditEditData.isPrimary ? customerCreditEditData.isPrimary : ""));
      dispatch(setCheckCardNumber());
      if (customerCreditEditData.isPrimary !== null || customerCreditEditData.isPrimary !== "") {
        setIsPrimary(customerCreditEditData.isPrimary);
      }
    }
  }, [id, customerCreditEditData, changesCancelled, viewDetail]);

  const getCustomerCreditCardData = () => {
    dispatch(
      setCustomerCreditCards({
        customerCreditCardPK: customerCreditCardPK,
        creditCardName: nameOnCard,
        creditCardNumber: cardNumber,
        creditCardAddress: cardBillingAddress,
        creditCardExpirationDate: expirationDate,
        creditCardPostalCode: cardBillingZipcode,
        isPrimary: primaryCard,
        customerId: customerId,
        cardCode: cvv,
      })
    );
  };
  useEffect(() => {
    getCustomerCreditCardData();
    if (checkPrimary !== "" && primaryCard === true) {
      getOldData();
    }
  }, [
    customerCreditCardPK,
    nameOnCard,
    cardNumber,
    cardBillingAddress,
    expirationDate,
    cardBillingZipcode,
    primaryCard,
    customerId,
    checkPrimary,
    cvv,
  ]);

  //singledata
  const fetchRecordById = (id) => {
    dispatch(setIsLoading(true));
    CustomerCreditCardService.getCustomerCreditCardById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerCreditCardEditData(data));
        dispatch(resetChanges());
        dispatch(setViewDetail(true));

        setCanadian(data.customerFK.canadian);
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 100);
      })
      .catch((error) => {
        navigate("/customer-credit-card/" + customerId + "/" + pageNumber);
        dispatch(setIsLoading(false));
      });
  };
  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };
  const validationSchema = yup.object({
    nameOnCard: yup.string().required(),
    cardNumber: yup.string().required(),
    expirationDate: yup.string().required(),
    cardBillingZipcode: yup.string().when("canadian", {
      is: true,
      then: yup.string().matches(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/),
      otherwise: yup.string().matches(/^((\d{5}-\d{4})|(\d{5}))$/),
    }),
  });

  const normalZipValidation = (e) => {
    let value = e.target.value;
    if (value.match(/^((\d{5}-\d{4})|(\d{5}))$/)) {
      setNormalZipValidationState(true);
    } else {
      setNormalZipValidationState(false);
    }
  };
  const canadianZipValidation = (e) => {
    const value = e.target.value?.trim(); // Trim spaces
    const regex = /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/;

    if (regex.test(value)) {
      console.log("Valid Canadian postal code");
      setCadianZipValidationState(true);
    } else {
      console.log("Invalid Canadian postal code");
      setCadianZipValidationState(false);
    }
  };

  //Zipcode is validated from DB

  const [us, setUs] = useState("");
  const [uszip, setUszip] = useState("");

  const checkZipCode = (cardBillingZipcode) => {
    if (canadian !== true && cardBillingZipcode.length > 5) {
      const uszip = cardBillingZipcode.slice(0, 5);

      CustomerCreditCardService.checkZipCode(uszip)
        .then((response) => {
          dispatch(setCheckZip(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      CustomerCreditCardService.checkZipCode(cardBillingZipcode)
        .then((response) => {
          dispatch(setCheckZip(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const isNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");

    if (value) return phoneNumber;
  };
  //masking careditcard
  const maskNumber = (value) => {
    if (!value) return value;
    const regex = /[0-9](?=.*.{4})/gim;
    const maskingNum = value.replace(regex, "X");
    if (value) return maskingNum;
  };

  //Checking unique creditcard
  const checkUniqueCard = (cardNumber) => {
    CustomerCreditCardService.checkCardNumberExist(customerId, cardNumber, customerCreditCardPK)
      .then((response) => {
        dispatch(setCheckCardNumber(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //details of current primary card
  const getOldData = () => {
    CustomerCreditCardService.getCustomerCreditCardById(checkPrimary)
      .then((response) => {
        const data = response.data;
        setNumber(data.creditCardNumber);
        setDate(data.creditCardExpirationDate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkPrimaryCard = (e) => {
    CustomerCreditCardService.checkPrimary(customerId)
      .then((response) => {
        setPrimaryShow(true);
        dispatch(setCheckPrimary(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePrimaryNo = () => {
    setPrimaryShow(false);
    dispatch(setPrimaryCard(false));
  };
  const handlePrimaryYes = () => {
    setPrimaryShow(false);
    dispatch(setPrimaryCard(true));
  };

  const fetchTotalElements = () => {
    CustomerCreditCardService.getAllCustomerCreditCard("Beginning", "", 0, customerId)
      .then((response) => {
        const { data } = response;
        dispatch(setTotalElements(data.totalElements));
        if (data.totalElements === 0) {
          dispatch(setPrimaryCard(true));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (customerId) fetchTotalElements();
  }, [customerId]);
  const dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/gm;

  // for handling expiration date validation
  const HandlerExpDate = (e) => {
    const value = e.target.value;
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

      dispatch(setDateMessage(true));
    } else if (year === currentYear && month < currentMonth) {
      // expiration month has passed the current month in the current year

      dispatch(setDateMessage(true));
    } else {
      dispatch(setDateMessage(false));
    }
  };
  useEffect(() => {
    if (checkZip === "") setNormalZipValidationState(true);
    setCadianZipValidationState(true);
  }, [checkZip]);

  const getCanadian = () => {
    CustomerService.getCustomerById(customerId).then((response) => {
      const data = response.data;
      setCanadian(data.canadian);
    });
  };
  useEffect(() => {
    if (!id) getCanadian();
  }, [id]);
  return (
    <Formik
      initialValues={{
        nameOnCard,
        cardNumber,
        expirationDate,
        cardBillingZipcode,
        canadian,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        nameOnCard: true,
        cardNumber: true,
        expirationDate: true,
        cardBillingZipcode: true,
        canadian: false,
      }}
      on={on}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="w-100 p-2">
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Row className="m-0 p-10">
                    <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>
                            {t("edit. CustomerCreditCard.page.resources.tab.nameOnCard")}
                          </Form.Label>
                        </Col>
                        <Col xs={4} md={4} sm={4} className="p-0">
                          <Input
                            name={nameOnCard}
                            type="text"
                            className={`${QuarterScreen.formControl} ${
                              viewDetail === true || isLoading ? "" : nameOnCard ? "borderGreen" : "borderRed"
                            }`}

                            maxLength={30}
                            id="nameOnCard"
                            value={nameOnCard}
                            disabled={viewDetail}
                            onChange={(e) => {
                              formik.handleChange(e);
                              dispatch(setNameOnCard(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                            }}
                            onBlur={formik.handleBlur}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>
                            {t("edit. CustomerCreditCard.page.resources.tab.cardNumber")}
                          </Form.Label>
                        </Col>
                        <Col xs={2} md={2} sm={2} className="p-0 w-150px">
                          <Input
                            name={cardNumber}
                            className={`${QuarterScreen.formControl} ${
                              viewDetail || isLoading
                                ? ""
                                : cardNumber?.length === 16 || cardNumber?.length === 15
                                  ? checkCardNumber
                                    ? "borderRed"
                                    : "borderGreen"
                                  : "borderRed"
                            }`}
                            id="cdNo"
                            value={cardNumber}
                            disabled={viewDetail}
                            maxLength={16}
                            type="text"
                            spellCheck={false}
                            onChange={(e) => {
                              dispatch(setCardNumber(isNumber(e.target.value)));
                              dispatch(setCheckCardNumber(""));
                            }}
                            onBlur={(e) => {
                              const value = e.target.value;
                              if (!value.trim() || value.length < 15) return;
                              checkUniqueCard(value);
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="form-group  m-t-3 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>
                            {t("edit. CustomerCreditCard.page.resources.tab.expirationDate")}
                          </Form.Label>
                        </Col>
                        <Col xs={1} sm={1} md={1} className="p-0">
                          <Input
                            name={expirationDate}
                            type="text"
                            className={`${QuarterScreen.formControl} ${
                              viewDetail === true || isLoading
                                ? ""
                                : formik.errors.expirationDate === undefined &&
                                    expirationDate.length > 1 &&
                                    expirationDate.match(dateRegex) &&
                                    !dateMessage
                                  ? "borderGreen"
                                  : formik.errors.expirationDate || dateMessage
                                    ? "borderRed"
                                    : "borderRed"
                            }`}
                            id="expirationDate"
                            value={expirationDate}
                            maxLength={5}
                            disabled={viewDetail}
                            placeholder="mm/yy"
                            onChange={(e) => {
                              dispatch(setExpirationDate(formatDateValidation(e.target.value)));
                              HandlerExpDate(e);
                            }}
                            onBlur={formik.handleBlur}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>
                            {t("edit. CustomerCreditCard.page.resources.tab.cardBillingAddress")}
                          </Form.Label>
                        </Col>
                        <Col xs={4} md={4} sm={4} className="p-0">
                          <Input
                            name={cardBillingAddress}
                            type="text"
                            className={QuarterScreen.formControl}
                            id="ad1"
                            value={cardBillingAddress}
                            maxLength={30}
                            disabled={viewDetail}
                            onChange={(e) =>
                              dispatch(setCardBillingAddress(e.target.value.replace(/^\s+/g, "")))
                            }
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className=" form-group row m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>
                            {t("edit. CustomerCreditCard.page.resources.tab.cardBillingZipcode")}
                          </Form.Label>
                        </Col>
                        <Col xs={3} sm={3} md={3} className="p-0 w-100px">
                          <Input
                            className={`${QuarterScreen.formControl} ${
                              viewDetail || isLoading || cardBillingZipcode?.trim() === ""
                                ? ""
                                : canadian
                                  ? cardBillingZipcode &&
                                    cardBillingZipcode.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/)
                                    ? checkZip
                                      ? "borderRed"
                                      : "borderGreen"
                                    : "borderRed"
                                  : viewDetail || isLoading
                                    ? ""
                                    : cardBillingZipcode &&
                                        cardBillingZipcode.match(/^((\d{5}-\d{4})|(\d{5}))$/)
                                      ? checkZip
                                        ? "borderRed"
                                        : "borderGreen"
                                      : "borderRed"
                            }`}
                            type="postalcode"
                            name={cardBillingZipcode}
                            value={cardBillingZipcode.toUpperCase()}
                            disabled={viewDetail}
                            maxLength={10}
                            onChange={(e) => {
                              if (e.target.value !== "") {
                                dispatch(setCardBillingZipcode(zipVal(e.target.value)));
                                dispatch(setCheckZip(""));
                              } else {
                                dispatch(setCardBillingZipcode(zipVal("")));
                                dispatch(setCheckZip(""));
                              }
                            }}

                            onBlur={(e) => checkZipCode(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className=" form-group row m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>Security Code</Form.Label>
                        </Col>
                        <Col xs={3} sm={3} md={3} className="p-0 w-50px">
                          <Input
                            className={`${QuarterScreen.formControl} ${
                              viewDetail || isLoading ? "" : cvv?.length > 2 ? "borderGreen" : "borderRed"
                            }`}
                            type="cvv"
                            name="cvv"
                            value={cvv}
                            disabled={viewDetail}
                            maxLength={4}
                            onChange={(e) => {
                              dispatch(setCVV(e.target.value));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="form-group m-t-5 m-b-10 align-items-center row m-l-0 m-r-0">
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>
                            {t("edit. CustomerCreditCard.page.resources.tab.primaryCard")}
                          </Form.Label>
                        </Col>
                        <Col xs={3} sm={3} md={2} className="p-0">
                          <input
                            type="checkbox"

                            className="form-check-input p-0"
                            id="primaryCard"
                            name="primaryCard"
                            value={primaryCard}
                            checked={primaryCard}
                            disabled={
                              viewDetail ||
                              totalElements === 0 ||
                              (isPrimary &&
                                (customerCreditCardPK !== undefined ||
                                  customerCreditCardPK !== null ||
                                  customerCreditCardPK !== "")) ||
                              (isPrimary && primaryCard)
                            }
                            onClick={checkPrimaryCard}
                            onChange={(e) => dispatch(setPrimaryCard(e.target.checked))}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div>
            {isLoading && (
              <div className="fade modal-backdrop show">
                {" "}
                <div className="pos-center">
                  {" "}
                  <div className="loader"></div>
                </div>
              </div>
            )}
            <ModalComponent
              show={primaryShow}
              onHide={handlePrimaryNo}
              title={"Primary card switching"}
              body={
                "Credit card " +
                number.replace(/[0-9](?=.*.{4})/gim, "X") +
                " , " +
                date +
                " is the primary card . Do you want to switch to this card?"
              }
              handleYES={handlePrimaryYes}
              handleNO={handlePrimaryNo}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerCreditCardFormContent;
