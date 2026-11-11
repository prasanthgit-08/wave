import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import { useDispatch, useSelector } from "react-redux";
import {
  setContact,
  setName,
  setPosition,
  setPhone,
  setFax,
  setEmail,
  setBirthday,
  setCallback,
  setLastcall,
  setNotes,
  setPrimaryKey,
  setCheckContact,
  setDisableSave,
} from "../../../../redux/CustomerContactSlice";
import { useNavigate, useParams } from "react-router-dom";
import CustomerContactService from "../../../../services/CustomerContactService";
import { setEditFormData } from "../../../../redux/CustomerContactSlice";
import { setViewDetail } from "../../../../redux/CustomerContactSlice";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { emailRegex } from "../../../../utils/validation/EmailRegex";
import DateInputField from "../../../common/DateInputField";
import LoadingIcon from "../../../common/LoadingIcon";
import Input from "../../../../components/common/input";
const CCFormContent = () => {
  const { id } = useParams();
  const params = useParams();
  const { customerId, pageNumber } = useParams();
  const name = useSelector((state) => state.customerContactReducer.name);
  const contact = useSelector((state) => state.customerContactReducer.contact);
  const position = useSelector((state) => state.customerContactReducer.position);
  const phone = useSelector((state) => formatPhoneNumber(state.customerContactReducer.phone));
  const fax = useSelector((state) => formatPhoneNumber(state.customerContactReducer.fax));
  const email = useSelector((state) => state.customerContactReducer.email);
  const birthday = useSelector((state) => state.customerContactReducer.birthday);
  const [isBirthdayValid, setIsBirthdayValid] = useState(true);
  const callback = useSelector((state) => state.customerContactReducer.callback);
  const [isCallbackValid, setIsCallbackValid] = useState(true);
  const lastcall = useSelector((state) => state.customerContactReducer.lastcall);
  const [isLastCallValid, setIsLastCallValid] = useState(true);
  const notes = useSelector((state) => state.customerContactReducer.notes);
  const viewDetail = useSelector((state) => state.customerContactReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerContactReducer.editFormData);
  const checkContact = useSelector((state) => state.customerContactReducer.checkContact);
  const changesCancelled = useSelector((state) => state.customerContactReducer.changesCancelled);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const on = (setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setFax(formattedPhoneNumber));
  };
  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setPrimaryKey(""));
      dispatch(setContact(""));
      dispatch(setName(""));
      dispatch(setPosition(""));
      dispatch(setPhone(""));
      dispatch(setFax(""));
      dispatch(setEmail(""));
      dispatch(setBirthday(""));
      dispatch(setCallback(""));
      dispatch(setLastcall(""));
      dispatch(setNotes(""));
    }
  }, [editFormData]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      CustomerContactService.getCustomerContactsDataById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setEditFormData(data));
          dispatch(setViewDetail(true));
        })
        .catch((err) => {
          console.log(err);
          navigate("/customer-contact/" + customerId + "/" + pageNumber);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, changesCancelled]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setPrimaryKey(editFormData.customerContactPK ? editFormData.customerContactPK : ""));
      dispatch(setContact(editFormData.contact ? editFormData.contact : ""));
      dispatch(setName(editFormData.name ? editFormData.name?.trim() : ""));
      dispatch(setPosition(editFormData.position ? editFormData.position : ""));
      dispatch(setPhone(editFormData.phone ? editFormData.phone : ""));
      dispatch(setFax(editFormData.fax ? editFormData.fax : ""));
      dispatch(setEmail(editFormData.email ? editFormData.email?.trim() : ""));
      dispatch(setBirthday(editFormData.birthday ? editFormData.birthday : ""));
      dispatch(setCallback(editFormData.callback ? editFormData.callback : ""));
      dispatch(setLastcall(editFormData.lastcall ? editFormData.lastcall : ""));
      dispatch(setNotes(editFormData.notes ? editFormData.notes : ""));
    }
  }, [editFormData, changesCancelled]);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const phoneLenght = 14;
  const validationSchema = yup.object({
    contact: yup.string().required(),
    phone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
    email: yup.string().matches(emailRegex),
  });

  useEffect(() => {
    if (
      contact != "" &&
      (phone == "" || phone.match(phoneRegex)) &&
      (fax == "" || fax.match(phoneRegex)) &&
      (email == "" || email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)) &&
      !checkContact &&
      isBirthdayValid &&
      isCallbackValid &&
      isLastCallValid
    ) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [contact, phone, fax, email, checkContact, isBirthdayValid, isCallbackValid, isLastCallValid]);

  const handleCheckContact = (e) => {
    CustomerContactService.checkContactExist(e.target.value, customerId, id)
      .then((res) => {
        dispatch(setCheckContact(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{
        contact,
        phone,
        fax,
        email,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        contact: true,
        phone: true,
        fax: true,
        email: true,
      }}
      on={on}
    >
      {(formik) => (
        <div className="w-100 p-2">
          {loading && <LoadingIcon />}
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-10">
                  <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-start row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0 ">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.contact")}
                        </Form.Label>
                      </Col>
                      <Col xs={6} md={6} sm={6} className="p-0 d-flex ">
                        <Input
                          type="text"
                          className={`${styles.formControl} ${
                            viewDetail || loading
                              ? ""
                              : contact && !checkContact
                                ? "borderGreen"
                                : "borderRed"
                          }`}
                          id="contact"
                          name="contact"
                          value={contact}
                          maxLength={30}
                          disabled={viewDetail}
                          onChange={(e) => {
                            formik.handleChange(e);
                            dispatch(setContact(e.target.value));
                            dispatch(setCheckContact(""));
                          }}
                          onBlur={(e) => {
                            if (!e.target.value.trim()) return;
                            handleCheckContact(e);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.name")}
                        </Form.Label>
                      </Col>
                      <Col xs={6} md={6} sm={6} className={`p-0  `}>
                        <Input
                          type="text"
                          className={styles.formControl}
                          id="name"
                          name="name"
                          value={name}
                          maxLength={30}
                          disabled={viewDetail}
                          onChange={(e) => dispatch(setName(e.target.value))}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.position")}
                        </Form.Label>
                      </Col>
                      <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                        <Input
                          type="text"
                          className={styles.formControl}
                          id="position"
                          name="position"
                          value={position}
                          maxLength={30}
                          disabled={viewDetail}
                          onChange={(e) => dispatch(setPosition(e.target.value))}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.phone")}
                        </Form.Label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0 d-flex ">
                        <Input
                          type="text"

                          className={`${styles.formControl} ${
                            phone ? (phone.match(phoneRegex) ? "black" : "borderRed") : "black"
                          }`}
                          id="phone"
                          name="phone"
                          value={phone}
                          maxLength={phoneLenght}
                          disabled={viewDetail}
                          onChange={(e) => {
                            formik.handleChange(e);
                            phoneFormatHandler(e);
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0 d-flex ">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.fax")}
                        </Form.Label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0">
                        <Input
                          type="text"
                          className={`${styles.formControl} ${
                            fax ? (fax.match(phoneRegex) ? "black" : "borderRed") : "black"
                          }`}

                          id="fax"
                          name="fax"
                          value={fax}
                          maxLength={phoneLenght}
                          disabled={viewDetail}
                          onChange={(e) => {
                            formik.handleChange(e);
                            faxFormatHandler(e);
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.email")}
                        </Form.Label>
                      </Col>
                      <Col xs={6} md={6} sm={6} className="p-0 d-flex ">
                        <Input
                          type="text"
                          className={`${styles.formControl} ${
                            viewDetail === true
                              ? ""
                              : formik.errors.email === undefined && email !== null && email.length > 1
                                ? ""
                                : formik.errors.email !== undefined
                                  ? "borderRed"
                                  : ""
                          }`}
                          id="email"
                          name="email"
                          value={email}
                          maxLength={30}
                          disabled={viewDetail}
                          onChange={(e) => {
                            formik.handleChange(e);
                            dispatch(setEmail(e.target.value));
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.birthday")}
                        </Form.Label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0 ">
                        <DateInputField
                          date={birthday}
                          min={""}
                          max={new Date()}
                          reduxSetDate={(value) => dispatch(setBirthday(value))}
                          disabled={viewDetail}
                          format={"MM/DD/YYYY"}
                          setIsDateValid={setIsBirthdayValid}
                          className={isBirthdayValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.callback")}
                        </Form.Label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0 ">
                        <DateInputField
                          date={callback}
                          reduxSetDate={(value) => dispatch(setCallback(value))}
                          disabled={viewDetail}
                          setIsDateValid={setIsCallbackValid}
                          className={isCallbackValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.lastcall")}
                        </Form.Label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0  ">
                        <DateInputField
                          date={lastcall}
                          reduxSetDate={(value) => dispatch(setLastcall(value))}
                          disabled={viewDetail}
                          setIsDateValid={setIsLastCallValid}
                          className={isLastCallValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="margin-box-5 m-t-16 invisible  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 text-start">
                        <Form.Label htmlFor="name" className="col-form-label me-4">
                          Contact
                        </Form.Label>
                      </Col>
                      <Col xs={5} md={5} sm={5} className="p-0">
                        <Input
                          className={styles.formControl}
                          type="search"
                          maxLength={30}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 text-start">
                        <Form.Label htmlFor="name" className="col-form-label me-4">
                          Notes
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={9} md={9} sm={9} className="p-0 h-200px">
                        <textarea
                          className={`${styles.formControl} h-100`}
                          disabled={viewDetail}
                          value={notes}
                          onChange={(e) => {
                            dispatch(setNotes(e.target.value));
                          }}
                          name=""
                          id=""
                          cols="50"
                          rows="60"
                        ></textarea>
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
  );
};

export default CCFormContent;
