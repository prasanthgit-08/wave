import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { t } from "i18next";
import { Form, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../../../../styles/QuarterScreen.module.css";
import Input from "../../../../../components/common/input";
import LoadingIcon from "../../../../common/LoadingIcon";
import {
  setViewDetail,
  setCheckPayToData,
  setEditFormData,
  setCheckPay,
  setCheckPayToFormData,
  setDescriptionValid,
  setCheckPayToCity,
  setCheckPayToStatecode,
  setCheckPayToPostcode,
  setCheckPayToZipLength,
  setCheckPayToCityLength,
  setPostalCodeOnChange,
  setCheckPayzipPostLenght,
  setZipPostLenght,
  setOnCancel,
  setCheckPayPostalCodePK,
  setCheckPayToCanadian,
} from "../../../../../redux/CheckPayToSlice";
import {
  setCheckPayToPK,
  setDescription,
  setName,
  setAddress1,
  setAddress2,
  setCity,
  setStateCode,
  setPostCode,
  // setPhone,
} from "../../../../../redux/CheckPayToSlice";
import { setDealerCity, setDealerStatecode, setDealerPostcode } from "../../../../../redux/EditDealerSlice";
import CheckPayToService from "../../../../../services/CheckPayToService";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import PostalCode from "../../../../common/PostalCode";
import PostalCodeUS from "../../../../common/PostalCodeUS";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";

const CheckPayToFormContent = () => {
  const viewDetail = useSelector((state) => state.checkPayToReducer.viewDetail);
  const { id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const editFormData = useSelector((state) => state.checkPayToReducer.editFormData);
  const navigate = useNavigate();
  const name = useSelector((state) => state.checkPayToReducer.name);
  const postalCodeOnChange = useSelector((state) => state.checkPayToReducer.postalCodeOnChange);
  const description = useSelector((state) => state.checkPayToReducer.description);
  const checkPayToPK = useSelector((state) => state.checkPayToReducer.checkPayToPK);
  const checkPayToCanadian = useSelector((state) => state.checkPayToReducer.checkPayToCanadian);
  const [descriptionError, setDescriptionError] = useState("");
  const address1 = useSelector((state) => state.checkPayToReducer.address1);
  const address2 = useSelector((state) => state.checkPayToReducer.address2);
  const checkPayzipPostLenght = useSelector((state) => state.checkPayToReducer.checkPayzipPostLenght);
  const descriptionValid = useSelector((state) => state.checkPayToReducer.descriptionValid);
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [loading, setLoading] = useState(false);
  let checkCanadian = /[a-z]/i;
  const changesCancelled = useSelector((state) => state.checkPayToReducer.changesCancelled);
  const onCancel = useSelector((state) => state.checkPayToReducer.onCancel);
  const checkPayToFormData = useSelector((state) => state.checkPayToReducer.checkPayToFormData);
  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setCheckPayToPK(""));
      dispatch(setName(""));
      dispatch(setDescription(""));
      dispatch(setAddress1(""));
      dispatch(setAddress2(""));
      setStateCode("");
      setCity("");
      setPostalCode("");
    }
  }, [editFormData]);

  //unique
  const checkName = useSelector((state) => state.checkPayToReducer.name);

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required,
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().required(),
    postalCode: yup
      .string()
      .required()
      .when("canadian", {
        is: true,
        then: yup.string().matches(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/),
        otherwise: yup.string().matches(/^((\d{5}-\d{4})|(\d{5}))$/),
      }),
  });

  useEffect(() => {
    dispatch(setCheckPayzipPostLenght(zipPostLenght));
    dispatch(setCheckPayPostalCodePK(postalCodePK));
  }, [zipPostLenght, postalCodePK]);

  useEffect(() => {}, [editFormData]);

  const getContact = () => {
    dispatch(
      setCheckPayToFormData({
        checkPayToPK: id,
        name: name,
        description: description,
        address1: address1,
        address2: address2,
        city: city,
        stateCode: statecode,
        postalCode: postalCode,
        canadian,
      })
    );
  };
  useEffect(() => {
    getContact();
  }, [id, description, name, address1, address2, city, statecode, postalCode, canadian]);

  useEffect(() => {
    dispatch(setCheckPayToCanadian(canadian));
  }, [postalCodePK]);

  const fetchRecordById = (id) => {
    setLoading(true);
    CheckPayToService.getCheckPayToById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        if (data === undefined || data === null || data === "") {
          dispatch(setCheckPayToPK(""));
          dispatch(setName(""));
          dispatch(setDescription(""));
          dispatch(setAddress1(""));
          dispatch(setAddress2(""));
          setStateCode("");
          setCity("");
          setPostalCode("");
        } else {
          dispatch(setCheckPayToPK(data.checkPayToPK || ""));
          dispatch(setName(data.name || ""));
          dispatch(setDescription(data.description || ""));
          dispatch(setAddress1(data.address1 || ""));
          dispatch(setAddress2(data.address2 || ""));
          setStateCode(data.stateCode != null ? data.stateCode?.trim() : "");
          setCity(data.city != null ? data.city?.trim() : "");
          setPostalCode(data.postalCode != null ? data.postalCode?.trim() : "");
          setPostalCodePK(data.postalCodePK ? data.postalCodePK : null);
          dispatch(setCheckPayToCanadian(data.canadian));
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/check-pay-to");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };
  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };
  const handleCheckUniqueDescription = (e) => {
    CheckPayToService.checkDescriptionExist(e, checkPayToPK)
      .then((res) => {
        if (res.data.length > 0) {
          setDescriptionError(res.data);
          dispatch(setDescriptionValid(false));
        } else {
          setDescriptionError("");
          dispatch(setDescriptionValid(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
      handleCheckUniqueDescription();
    }
  }, [id, changesCancelled]);

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };
  //unique contact
  const handleCheckContact = (e) => {
    CheckPayToService.checkDescriptionExist(id, e.target.value, name)
      .then((res) => {
        dispatch(setCheckPay(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{
        name,
        description,
        address1,
        city,
        statecode,
        postalCode,
      }}
      validationSchema={""}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        name: true,
        description: true,
        address1: true,
        city: true,
        statecode: true,
        postalcode: true,
      }}
      // on={on}
    >
      {(formik) => (
        <Form>
          <div className="p-2 w-100  ">
            {loading && <LoadingIcon />}
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Col xs={10} md={10} className="ms-3 h-250px">
                    <Form.Group className="margin-box-1 form-group m-t-20 m-b-20   align-items-center row  m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          {t("checkPayTo.name")}
                        </Form.Label>
                      </Col>

                      <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          className={`${QuarterScreen.formControl} ${
                            viewDetail || loading ? "" : name.length >= 1 ? "borderGreen" : "borderRed"
                          }`}
                          disabled={viewDetail}
                          maxLength={30}
                          onChange={(e) => {
                            formik.handleChange(e);
                            // dispatch(setName(e.target.value));
                            dispatch(setName(e.target.value.replace(/^\s+/g, "")));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    {/* <Form.Group className="margin-box-1 form-group m-t-20 m-b-20   align-items-center row  m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          {t("checkPayTo.description")}
                        </Form.Label>
                      </Col>

                      <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          value={description}
                          className={`${QuarterScreen.formControl} ${
                            viewDetail === true
                              ? ""
                              : description !== "" && descriptionError.length === 0
                              ? "borderGreen"
                              : "borderRed"
                          }`}
                          disabled={viewDetail}
                          autoComplete="off"
                          aria-autocomplete="list"
                          maxLength={30}
                          onInput={(e) => {
                            formik.handleChange(e);
                            // dispatch(setDescription(e.target.value));
                            dispatch(setDescription(e.target.value.replace(/^\s+/g, '')));
                            handleCheckUniqueDescription(e.target.value);
                          }}
                          style={{
                            borderColor:
                              viewDetail === true
                                ? "black"
                                : description !== "" && descriptionError.length === 0
                                ? "green"
                                : editFormData !== ""
                                ? "red"
                                : "",
                          }}
                        />
                      </Col>
                      <Form.Group
                        className={`form-group m-t-1  align-items-center d-flex ${
                          !viewDetail && descriptionError ? "" : "hide-elements"
                        }`}
                      >
                        <div className="p-0 w-200px "></div>

                        <Col xs={9} md={9} sm={9} className="d-flex ">
                          <p className="mb-0 text-danger margin-left-5 " style={{ height: "5px" }}>
                            {descriptionError}
                          </p>
                        </Col>
                      </Form.Group>
                    </Form.Group> */}
                    <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          {t("checkPayTo.description")}
                        </Form.Label>
                      </Col>

                      <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                        <Input
                          type="text"
                          id="description"
                          name="description"
                          value={description}
                          className={`${QuarterScreen.formControl} ${
                            viewDetail || loading
                              ? ""
                              : description !== "" && descriptionError.length === 0 && descriptionValid
                                ? "borderGreen"
                                : "borderRed"
                          }`}
                          disabled={viewDetail}
                          maxLength={30}
                          onChange={(e) => {
                            const value = e.target.value.replace(/^\s+/g, "");
                            formik.handleChange(e);
                            dispatch(setDescription(value));
                            setDescriptionError("");
                            dispatch(setDescriptionValid(true));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              handleCheckUniqueDescription(e.target.value);
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-1 form-group m-t-20 m-b-20   align-items-center row  m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Address
                        </Form.Label>
                      </Col>

                      <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                        <Input
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            viewDetail || loading ? "" : address1.length >= 1 ? "borderGreen" : "borderRed"
                          }`}
                          id="ad1"
                          name="address1"
                          value={address1}
                          maxLength={30}
                          disabled={viewDetail}
                          onChange={(e) => {
                            formik.handleChange(e);
                            // dispatch(setAddress1(e.target.value));
                            dispatch(setAddress1(e.target.value.replace(/^\s+/g, "")));
                          }}
                          spellCheck={false}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-1 form-group m-t-20 m-b-20   align-items-center row  m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0"></Col>

                      <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                        <Input
                          type="text"
                          className={QuarterScreen.formControl}
                          id="ad2"
                          name="address2"
                          value={address2}
                          disabled={viewDetail}
                          maxLength={30}
                          onChange={(e) => {
                            formik.handleChange(e);
                            // dispatch(setAddress2(e.target.value));
                            dispatch(setAddress2(e.target.value.replace(/^\s+/g, "")));
                          }}
                          spellCheck={false}
                        />
                      </Col>
                    </Form.Group>
                    <PostalCodeComponent
                      disabled={viewDetail}
                      city={viewDetail ? editFormData?.city?.trim() : city}
                      setCity={setCity}
                      stateCode={viewDetail ? editFormData?.stateCode?.trim() : statecode}
                      setStateCode={setStateCode}
                      postalCode={viewDetail ? editFormData?.postalCode?.trim() : postalCode}
                      setPostalCode={setPostalCode}
                      setPostalValues={setPostalValues}
                      postalOptions={postalOptions}
                      postalCodePK={postalCodePK}
                      setPostalCodePK={setPostalCodePK}
                      canadian={canadian}
                      setCanadian={setCanadian}
                    />
                  </Col>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CheckPayToFormContent;
