import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { Col, Row, Form } from "react-bootstrap";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import Input from "../../../../../components/common/input";
import {
  setDebitCardPK,
  setProvider,
  setProcessCards,
  setDelaySettlements,
  setObjectKey,
  setEditFormData,
  setViewDetail,
  setDebitData,
  setActive,
  setProviderValid,
  setAddress1,
  setAddress2,
  setDebitCardzipPostLenght,
  setPostalCodePK,
  setObjectkeyValid,
} from "../../../../../redux/DebitCardSlice";

import DebitCardService from "../../../../../services/DebitCardService";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import LoadingIcon from "../../../../common/LoadingIcon";

const DebitCardContent = () => {
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.debitCardReducer.provider);
  const processCards = useSelector((state) => state.debitCardReducer.processCards);
  const delaySettlements = useSelector((state) => state.debitCardReducer.delaySettlements);
  const objectKey = useSelector((state) => state.debitCardReducer.objectKey);
  const viewDetail = useSelector((state) => state.debitCardReducer.viewDetail);
  const changesCancelled = useSelector((state) => state.debitCardReducer.changesCancelled);
  const editFormData = useSelector((state) => state.debitCardReducer.editFormData);
  const providerValid = useSelector((state) => state.debitCardReducer.providerValid);
  const address1 = useSelector((state) => state.debitCardReducer.address1);
  const address2 = useSelector((state) => state.debitCardReducer.address2);
  const postalCodePK = useSelector((state) => state.debitCardReducer.postalCodePK);
  const objectkeyValid = useSelector((state) => state.debitCardReducer.objectkeyValid);

  const [providerError, setProviderError] = useState("");
  const [objectKeyError, setObjectKeyError] = useState("");
  const active = useSelector((state) => state.debitCardReducer.active);
  const { id } = useParams();
  const debitCardPK = id;
  const navigate = useNavigate();
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [zipIdChcek, setZipIdChcek] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const handleMouseEventMain = (e) => {
    setZipIdChcek(e.target.dataset.id);
  };

  const fetchRecordById = (id) => {
    setLoading(true);
    dispatch(setActive(true));
    dispatch(setEditFormData(null));
    DebitCardService.getDebitCardById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        navigate("/debit-card-listing");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDebitCards = () => {
    dispatch(
      setDebitData({
        debitCardPK: id,
        provider: provider,
        processCards: processCards,
        delaySettlement: delaySettlements,
        objectKey: objectKey,
        active: active,
        address1: address1,
        address2: address2,
        city: city,
        state: statecode,
        postalCode: postalcode,
      })
    );
  };

  const handleCheckUniqueProvider = (value) => {
    DebitCardService.checkProvider(value, debitCardPK)
      .then((res) => {
        setProviderError(res.data);
        dispatch(setProviderValid(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckUniqueObjectkey = (value) => {
    DebitCardService.checkObjectkey(value, debitCardPK)
      .then((res) => {
        setObjectKeyError(res.data);
        dispatch(setObjectkeyValid(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      dispatch(setViewDetail(true));
      fetchRecordById(id);
    }
  }, [id, changesCancelled]);

  useEffect(() => {
    dispatch(setDebitCardzipPostLenght(zipPostLenght));
  }, [zipPostLenght]);

  useEffect(() => {
    getDebitCards();
  }, [
    id,
    provider,
    address1,
    address2,
    processCards,
    delaySettlements,
    objectKey,
    city,
    postalcode,
    statecode,
    active,
  ]);

  useEffect(() => {
    if (editFormData) {
      dispatch(setDebitCardPK(editFormData.debitCardPK || ""));
      dispatch(setProvider(editFormData.provider || ""));
      dispatch(setProcessCards(editFormData.processCards || false));
      dispatch(setDelaySettlements(editFormData.delaySettlement || false));
      dispatch(setObjectKey(editFormData.objectKey || ""));
      dispatch(setActive(editFormData?.active));
      dispatch(setProviderValid(false));
      dispatch(setObjectkeyValid(false));
      dispatch(setAddress1(editFormData?.address1 || ""));
      dispatch(setAddress2(editFormData?.address2 || ""));
      setCity(editFormData?.city || "");
      setStateCode(editFormData?.state?.trim() || "");
      setPostalCode(editFormData?.postalCode || "");
      dispatch(setPostalCodePK(editFormData?.postalCodePK));
    } else {
      dispatch(setDebitCardPK(""));
      dispatch(setProvider(""));
      dispatch(setProcessCards(false));
      dispatch(setDelaySettlements(false));
      dispatch(setObjectKey(""));
      dispatch(setAddress1(""));
      dispatch(setAddress2(""));
      dispatch(setActive(true));
      setCity("");
      setStateCode("");
      setPostalCode("");
      dispatch(setPostalCodePK(null));
      // setLoading(false);
    }
  }, [editFormData]);

  useEffect(() => {
    if (debitCardPK == null) {
      dispatch(setProviderValid(false));
      dispatch(setObjectkeyValid(false));
    }
  }, []);

  useEffect(() => {
    if (editFormData && viewDetail) {
      setCity(editFormData?.city || "");
      setStateCode(editFormData?.state?.trim() || "");
      setPostalCode(editFormData?.postalCode || "");
    }
  }, [editFormData, viewDetail]);

  const validationSchema = yup.object({
    code: yup.string().required(),
    provider: yup.string().required(),
  });

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  return (
    <div onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
      <Formik
        initialValues={{
          provider,
          processCards,
          delaySettlements,
          objectKey,
          address1,
          address2,
          city,
          state,
          zip,
        }}
        validationSchema={validationSchema}
        validateOnMount
        enableReinitialize={true}
        initialTouched={{
          code: true,
          provider: true,
        }}
        on={on}
      >
        {(formik) => (
          <div className="p-2 w-100  " onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
            {loading && <LoadingIcon />}
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Row className="m-0 p-10">
                    <Col sm={10} md={10} lg={10} xl={10} xs={10} className="m-t-32">
                      <Form.Group className="form-group   align-items-center row  m-l-0 m-r-0 ">
                        <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                          <Form.Label
                            className={`${QuarterScreenTemplate.customColFormLabel} ${QuarterScreenTemplate.customLabel}`}
                          >
                            Provider
                          </Form.Label>
                        </Col>
                        <Col xs={5} md={5} sm={5} className="p-0 ">
                          <Input
                            name={provider}
                            type="text"
                            maxLength={30}
                            id="provider"
                            value={provider}
                            disabled={viewDetail}
                            onChange={(e) => {
                              let inputValue = e.target.value;
                              while (inputValue.startsWith(" ") || inputValue.startsWith(".")) {
                                inputValue = inputValue.slice(1);
                              }
                              formik.handleChange(e);
                              dispatch(setProvider(inputValue));
                              dispatch(setProviderValid(false));
                            }}
                            onBlur={(e) => {
                              if (e.target.value) {
                                handleCheckUniqueProvider(e.target.value);
                              }
                            }}
                            className={`${styles.formControl} ${
                              viewDetail === true
                                ? ""
                                : provider !== "" && !providerValid
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className={`${styles.colFormLabel}`}>Address</Form.Label>
                        </Col>
                        <Col xs={5} md={5} sm={5} className="p-0">
                          <Input
                            name="address"
                            type="text"
                            className={`customFormControl ${
                              viewDetail ? "" : address1.length >= 1 ? "borderGreen" : "borderRed"
                            }`}
                            value={address1}
                            onChange={(e) => {
                              let inputValue = e.target.value;
                              while (inputValue.startsWith(" ") || inputValue.startsWith(".")) {
                                inputValue = inputValue.slice(1);
                              }
                              formik.handleChange(e);
                              dispatch(setAddress1(inputValue));
                            }}
                            disabled={viewDetail}
                            maxLength={30}
                            aria-autocomplete="list"
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0"></Col>
                        <Col xs={5} md={5} sm={5} className="p-0">
                          <Input
                            name="address2"
                            type="text"
                            className={`customFormControl`}
                            value={address2}
                            onChange={(e) => {
                              let inputValue = e.target.value;
                              while (inputValue.startsWith(" ") || inputValue.startsWith(".")) {
                                inputValue = inputValue.slice(1);
                              }
                              formik.handleChange(e);
                              dispatch(setAddress2(inputValue));
                            }}
                            disabled={viewDetail}
                            maxLength={30}
                            aria-autocomplete="list"
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <PostalCodeComponent
                        disabled={viewDetail || loading}
                        city={city}
                        setCity={setCity}
                        stateInputWidth={"55px"}
                        stateCode={statecode}
                        setStateCode={setStateCode}
                        postalCode={postalcode}
                        setPostalCode={setPostalCode}
                        setPostalValues={setPostalValues}
                        postalOptions={postalOptions}
                        postalCodePK={postalCodePK}
                        setPostalCodePK={(val) => {
                          dispatch(setPostalCodePK(val));
                        }}
                        canadian={canadian}
                        setCanadian={setCanadian}
                        hideLabel
                        className={"postalCodeRef"}
                      />

                      <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-5">
                        <Col xs={3} sm={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label"> Process Cards </Form.Label>
                        </Col>

                        <Col xs={1} md={1} sm={1} className="p-0 ">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${!viewDetail ? (processCards ? "" : "") : ""}`}
                            checked={processCards}
                            disabled={viewDetail}
                            onChange={(e) => dispatch(setProcessCards(e.target.checked))}
                            name="processCards"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-4">
                        <Col xs={3} sm={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label"> Delay Settlements </Form.Label>
                        </Col>

                        <Col xs={1} md={1} sm={1} className="p-0 ">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${!viewDetail ? (delaySettlements ? "" : "") : ""}`}
                            checked={delaySettlements}
                            disabled={viewDetail}
                            onChange={(e) => dispatch(setDelaySettlements(e.target.checked))}
                            name="delaySettlements"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-4 ">
                        <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                          <Form.Label
                            className={`${QuarterScreenTemplate.customColFormLabel} ${QuarterScreenTemplate.customLabel}`}
                          >
                            Object Key
                          </Form.Label>
                        </Col>
                        <Col xs={5} md={5} sm={5} className="p-0 ">
                          <Input
                            name={objectKey}
                            type="text"
                            maxLength={50}
                            id="objectKey"
                            value={objectKey}
                            disabled={viewDetail}
                            onChange={(e) => {
                              let inputValue = e.target.value;
                              while (inputValue.startsWith(" ") || inputValue.startsWith(".")) {
                                inputValue = inputValue.slice(1);
                              }
                              formik.handleChange(e);
                              dispatch(setObjectKey(inputValue));
                              dispatch(setObjectkeyValid(false));
                            }}
                            onBlur={(e) => {
                              if (e.target.value) {
                                handleCheckUniqueObjectkey(e.target.value);
                              }
                            }}
                            className={`${styles.formControl} ${
                              viewDetail === true
                                ? ""
                                : objectKey !== "" && !objectkeyValid
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default DebitCardContent;
