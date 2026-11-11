import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import InputField from "../../../common/InputField";
import { t } from "i18next";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import {
  setCustomerOpenBalances,
  setViewDetail,
  resetChanges,
  setAmount,
  setNotes,
  setDescription,
  setCobDescriptionExist,
  setBalance,
} from "../../../../redux/customerOpenBalanceSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import CustomerOpenBalanceService from "../../../../services/CustomerOpenBalanceService";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import Input from "../../../../components/common/input";

const COBForm = () => {
  let viewDetail = useSelector((state) => state.customerOpenBalanceReducer.viewDetail);
  const cobData = useSelector((state) => state.customerOpenBalanceReducer.customerOpenBalanceData);

  const dispatch = useDispatch();
  const changesCancelled = useSelector((state) => state.customerOpenBalanceReducer.changesCancelled);
  const params = useParams();
  const customerOpenBalancePK = params.id;
  const customerId = params.customerId;
  const description = useSelector((state) => state.customerOpenBalanceReducer.description);
  const amount = useSelector((state) => state.customerOpenBalanceReducer.amount);
  const notes = useSelector((state) => state.customerOpenBalanceReducer.notes);
  const balance = useSelector((state) => state.customerOpenBalanceReducer.balance);
  const cobDescriptionExist = useSelector((state) => state.customerOpenBalanceReducer.cobDescriptionExist);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (cobData !== null) {
      dispatch(setBalance(cobData.balance?.toFixed(2)));
      dispatch(setNotes(cobData.notes ? cobData.notes?.trim() : ""));
      dispatch(setDescription(cobData.description ? cobData.description?.trim() : ""));
      dispatch(setAmount(cobData.amount?.toFixed(2)));
      dispatch(setCobDescriptionExist());
    }

    if (customerOpenBalancePK) {
      dispatch(setViewDetail(true));
    }
  }, [cobData, changesCancelled]);

  useEffect(() => {
    if (!customerOpenBalancePK) {
      dispatch(resetChanges());
    }
  }, [customerOpenBalancePK]);

  useEffect(() => {
    getCustomerOpenBalanceData();
  }, [customerOpenBalancePK, description, amount, balance, notes, viewDetail]);

  const getCustomerOpenBalanceData = () => {
    dispatch(
      setCustomerOpenBalances({
        customerOpenBalancePK: customerOpenBalancePK,
        amount: amount,
        balance: balance,
        description: description,
        notes: notes,
        customerId: customerId,
      })
    );
  };

  const addingBalance = (e) => {
    let amount = parseFloat(e.target.value);
    if (customerOpenBalancePK === undefined) {
      let balance = parseFloat(e.target.value);
      setBalance(amount?.toFixed(2));
    } else {
      let b = parseFloat(cobData.balance);
      let a = parseFloat(e.target.value);
      if (e.target.value !== "") {
        setBalance((b += a)?.toFixed(2));
      }
    }
  };

  const validationSchema = yup.object({
    descriptionCOB: yup.string().required(),
    amountCOB: yup.string().required(),
  });

  const handleCheckDescription = (description) => {
    CustomerOpenBalanceService.checkDescription(description, customerOpenBalancePK, customerId)
      .then((res) => {
        dispatch(setCobDescriptionExist(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setValue = (e) => {
    let a = parseFloat(e.target.value);
    setAmount(a?.toFixed(2));
  };
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };
  const setBalanceAmount = (e) => {
    let value = e.target.value;
    if (value > cobData?.amount || !customerOpenBalancePK) {
      if (customerOpenBalancePK) {
        let oldBalance = parseFloat(cobData.balance);
        let currentAmount = parseFloat(e.target.value);
        let oldAmount = parseFloat(cobData.amount);

        dispatch(setBalance((oldBalance + (currentAmount - oldAmount))?.toFixed(2)));
      } else {
        dispatch(setBalance(value));
      }
    } else {
      let oldBalance = parseFloat(cobData.balance);
      let currentAmount = parseFloat(e.target.value);
      let oldAmount = parseFloat(cobData.amount);
      dispatch(setBalance((oldBalance - (oldAmount - currentAmount))?.toFixed(2)));
    }
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value.replace(/^\s+/g, "");
    dispatch(setDescription(val));
    if (val.trim()) {
      dispatch(setCobDescriptionExist(""));
    }
  };

  return (
    <Formik initialValues={{}} validationSchema={validationSchema}>
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-10">
                  <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                    <Form.Group className="form-group m-t-1 form-group m-t-1 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col xs={2} sm={2} md={2} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>
                          {t("edit.customerOpenBalance.page.resources.tab.description")}
                        </Form.Label>
                      </Col>
                      <Col xs={6} md={6} sm={6} className="p-0">
                        <Input
                          name={description}
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            viewDetail
                              ? ""
                              : description
                                ? cobDescriptionExist
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                          }`}
                          id="description"
                          value={description}
                          disabled={viewDetail}
                          maxLength={30}
                          onChange={handleDescriptionChange}
                          onBlur={(e) => {
                            if (!e.target.value.trim()) {
                              dispatch(setCobDescriptionExist("empty"));
                              return;
                            }
                            handleCheckDescription(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col xs={2} sm={2} md={2} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>
                          {t("edit.customerOpenBalance.page.resources.tab.amount")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0 w-120px">
                        <Input
                          name={amount}
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            viewDetail ? "" : amount && amount >= 0 ? "borderGreen" : "borderRed"
                          }`}
                          id="amount"
                          value={amount}
                          disabled={viewDetail}
                          maxLength={11}

                          onChange={(e) => {
                            const regex = /^\d{0,8}(\.\d{0,2})?$/;

                            let sanitizedValue = e.target.value;

                            if (regex.test(sanitizedValue)) {
                              // If valid, update the value
                              dispatch(setAmount(sanitizedValue));
                            } else {
                              // If invalid, remove excess characters
                              let validPart = sanitizedValue.match(/\d{0,8}(\.\d{0,2})?/);
                              if (validPart) {
                                sanitizedValue = validPart[0];
                                dispatch(setAmount(sanitizedValue));
                              }
                            }
                          }}
                          onBlur={(e) => {
                            const val = e.target.value;
                            if (!val || isNaN(parseFloat(val))) {
                              dispatch(setBalance(""));
                              return;
                            }
                            setBalanceAmount(e);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col xs={2} sm={2} md={2} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>
                          {t("edit.customerOpenBalance.page.resources.tab.balance")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0 w-120px">
                        <InputField
                          name={balance}
                          type="number"
                          className={QuarterScreen.formControl}
                          id="balance"
                          value={balance}
                          disabled={true}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-10 align-items row m-l-0 m-r-0">
                      <Col xs={2} sm={2} md={2} className="p-0">
                        <label className="col-form-label dealer-label p-0 m-b-10">
                          {t("edit.customerOpenBalance.page.resources.tab.notes")}
                        </label>
                      </Col>

                      <Col l xs={7} sm={7} md={7} className="p-0 ">
                        <textarea
                          rows={8}
                          cols={22}
                          type="text"
                          name="notes"
                          id="notes"
                          value={notes}
                          disabled={viewDetail}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onInput={(e) => dispatch(setNotes(e.target.value.replace(/^\s+/g, "")))}
                          className={`${QuarterScreen.formControl} h-100`}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
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
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default COBForm;
