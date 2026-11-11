import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { emailRegex } from "../../../../utils/validation/EmailRegex";
import DateInputField from "../../../common/DateInputField";
import {
  resetChanges,
  setBirthday,
  setCallback,
  setCheckContact,
  setContact,
  setContactData,
  setEditFormData,
  setEmail,
  setFax,
  setIsBirtdayValid,
  setIsCallBackValid,
  setIsLastCallValid,
  setLastcall,
  setName,
  setNotes,
  setPhone,
  setPosition,
  setViewDetail,
} from "../../../../redux/CustomerPlantContactSlice";
import PlantContactService from "../../../../services/PlantContactService";
const PlantContactContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const contactPk = params.contactPk;
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const viewDetail = useSelector((state) => state.customerPlantContactReducer.viewDetail);
  const name = useSelector((state) => state.customerPlantContactReducer.name);
  const contact = useSelector((state) => state.customerPlantContactReducer.contact);
  const position = useSelector((state) => state.customerPlantContactReducer.position);
  const phone = useSelector((state) => formatPhoneNumber(state.customerPlantContactReducer.phone));
  const fax = useSelector((state) => formatPhoneNumber(state.customerPlantContactReducer.fax));
  const email = useSelector((state) => state.customerPlantContactReducer.email);
  const birthday = useSelector((state) => state.customerPlantContactReducer.birthday);
  const callback = useSelector((state) => state.customerPlantContactReducer.callback);
  const lastcall = useSelector((state) => state.customerPlantContactReducer.lastcall);
  const notes = useSelector((state) => state.customerPlantContactReducer.notes);
  const editFormData = useSelector((state) => state.customerPlantContactReducer.editFormData);
  const changesCancelled = useSelector((state) => state.customerPlantContactReducer.changesCancelled);
  const checkContact = useSelector((state) => state.customerPlantContactReducer.checkContact);
  const plantPk = useSelector((state) => state.customerPlantContactReducer.plantPk);
  const isBirtdayValid = useSelector((state) => state.customerPlantContactReducer.isBirtdayValid);
  const isCallBackValid = useSelector((state) => state.customerPlantContactReducer.isCallBackValid);
  const isLastCallValid = useSelector((state) => state.customerPlantContactReducer.isLastCallValid);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setFax(formattedPhoneNumber));
  };

  const handleCheckContact = (contact) => {
    PlantContactService.checkContactExist(contact, plantPk, contactPk)
      .then((res) => {
        dispatch(setCheckContact(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchRecordById = (contactPk) => {
    setLoad(true);
    PlantContactService.getPlantContactsDataById(contactPk)
      .then((response) => {
        const { data } = response;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        navigate("/customer-plant-contacts/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
      });
  };

  useEffect(() => {
    if (contactPk) fetchRecordById(contactPk);
  }, [contactPk]);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setContact(editFormData.contact ? editFormData.contact?.trim() : ""));
      dispatch(setName(editFormData.name ? editFormData.name?.trim() : ""));
      dispatch(setPosition(editFormData.position ? editFormData.position : ""));
      dispatch(setPhone(editFormData.phone ? editFormData.phone : ""));
      dispatch(setFax(editFormData.fax ? editFormData.fax : ""));
      dispatch(setEmail(editFormData.email ? editFormData.email?.trim() : ""));
      dispatch(setBirthday(editFormData.birthday ? editFormData.birthday : ""));
      dispatch(setCallback(editFormData.callback ? editFormData.callback : ""));
      dispatch(setLastcall(editFormData.lastcall ? editFormData.lastcall : ""));
      dispatch(setNotes(editFormData.notes ? editFormData.notes : ""));
      dispatch(setCheckContact());
    }
  }, [editFormData, changesCancelled]);
  useEffect(() => {
    if (editFormData === null) {
      dispatch(resetChanges());
    }
  }, [editFormData]);
  // to backend

  const getData = () => {
    dispatch(
      setContactData({
        customerPlantContactPK: contactPk,
        contact: contact,
        name: name,
        position: position,
        phone: phone.replace(/\s+/g, ""),
        fax: fax.replace(/\s+/g, ""),
        email: email,
        birthday: birthday,
        callback: callback,
        lastcall: lastcall,
        notes: notes,
        plantId: plantPk,
      })
    );
  };
  useEffect(() => {
    getData();
  }, [contactPk, contact, name, position, phone, fax, email, birthday, callback, lastcall, notes, plantPk]);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const phoneLenght = 14;
  const validationSchema = yup.object({
    contact: yup.string().required(),
    name: yup.string().required(),
    position: yup.string().required(),
    phone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
    email: yup.string().matches(emailRegex),
  });
  return (
    <Formik
      initialValues={{
        contact,
        name,
        position,
        phone,
        fax,
        email,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        contact: true,
        name: true,
        position: true,
        phone: true,
        fax: true,
        email: true,
      }}
    >
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-0 ">
                  <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0 ">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.contact")}
                        </Form.Label>
                      </Col>
                      <Col xs={8} md={8} sm={8} className="p-0 d-flex ">
                        <input
                          type="text"
                          className={`${styles.formControl} ${
                            viewDetail
                              ? ""
                              : contact.length >= 1
                                ? checkContact
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                          }`}
                          id="contact"
                          name="contact"
                          value={contact}
                          maxLength={30}
                          disabled={viewDetail}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onChange={(e) => {
                            dispatch(setContact(e.target.value.replace(/^\s+/g, "")));
                            dispatch(setCheckContact(""));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              handleCheckContact(e.target.value);
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.name")}
                        </Form.Label>
                      </Col>
                      <Col xs={8} md={8} sm={8} className="p-0 d-flex ">
                        <input
                          type="text"
                          className={`${styles.formControl} ${
                            viewDetail ? "" : name.length >= 1 ? "borderGreen" : "borderRed"
                          }`}
                          id="name"
                          name="name"
                          value={name}
                          maxLength={30}
                          disabled={viewDetail}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onInput={(e) => dispatch(setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")))}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.position")}
                        </Form.Label>
                      </Col>
                      <Col xs={8} md={8} sm={8} className="p-0 d-flex ">
                        <input
                          type="text"
                          className={`${styles.formControl} ${
                            viewDetail ? "" : position.length >= 1 ? "borderGreen" : "borderRed"
                          }`}
                          id="position"
                          name="position"
                          value={position}
                          maxLength={30}
                          disabled={viewDetail}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onInput={(e) => dispatch(setPosition(e.target.value.replace(/^\s+/g, "")))}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.phone")}
                        </Form.Label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0 d-flex ">
                        <input
                          type="text"
                          className={`${styles.formControl} ${
                            viewDetail === true
                              ? ""
                              : formik.errors.phone === undefined && phone != null && phone.length > 1
                                ? ""
                                : formik.errors.phone !== undefined
                                  ? "borderRed"
                                  : ""
                          }`}
                          id="phone"
                          name="phone"
                          value={phone}
                          maxLength={phoneLenght}
                          disabled={viewDetail}
                          onChange={(e) => phoneFormatHandler(e)}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onInput={(e) => {
                            dispatch(setPhone(e.target.value));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0 d-flex ">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.fax")}
                        </Form.Label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="text"
                          className={`${styles.formControl} ${
                            viewDetail === true
                              ? ""
                              : formik.errors.fax === undefined && fax != null && fax.length > 1
                                ? ""
                                : formik.errors.fax !== undefined
                                  ? "borderRed"
                                  : ""
                          }`}
                          id="fax"
                          name="fax"
                          value={fax}
                          maxLength={phoneLenght}
                          disabled={viewDetail}
                          onChange={(e) => faxFormatHandler(e)}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onInput={(e) => {
                            dispatch(setFax(e.target.value));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.email")}
                        </Form.Label>
                      </Col>
                      <Col xs={9} md={9} sm={9} className="p-0 d-flex ">
                        <input
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
                          maxLength={70}
                          disabled={viewDetail}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onInput={(e) => {
                            dispatch(setEmail(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.birthday")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                        <DateInputField
                          date={birthday}
                          min={""}
                          reduxSetDate={(value) => dispatch(setBirthday(value))}
                          disabled={viewDetail}
                          format={"MM/DD/YYYY"}
                          setIsDateValid={(value) => dispatch(setIsBirtdayValid(value))}
                          className={`customFormControl ${
                            viewDetail === true ? "" : isBirtdayValid ? "" : "borderRed"
                          }`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.callback")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                        <DateInputField
                          date={callback}
                          reduxSetDate={(value) => dispatch(setCallback(value))}
                          disabled={viewDetail}
                          setIsDateValid={(value) => dispatch(setIsCallBackValid(value))}
                          className={`customFormControl ${
                            viewDetail === true ? "" : isCallBackValid ? "" : "borderRed"
                          }`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col xs={3} sm={3} md={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.lastcall")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                        <DateInputField
                          date={lastcall}
                          reduxSetDate={(value) => dispatch(setLastcall(value))}
                          disabled={viewDetail}
                          setIsDateValid={(value) => dispatch(setIsLastCallValid(value))}
                          className={`customFormControl ${
                            viewDetail === true ? "" : isLastCallValid ? "" : "borderRed"
                          }`}
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0 ">
                      <Col sm={12} md={12} xs={12} className="p-10">
                        <Form.Label className={`${styles.colFormLabel}`}>
                          {t("customerContacts.list.page.notes")}
                        </Form.Label>
                      </Col>
                      <Col sm={10} md={10} className="p-0 m-t-10 ">
                        <textarea
                          rows={12}
                          cols={20}
                          type="text"
                          className={`${styles.formControl} h-100 `}
                          id="notes"
                          name="notes"
                          value={notes}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          disabled={viewDetail}
                          onInput={(e) => dispatch(setNotes(e.target.value.replace(/^\s+/g, "")))}
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

export default PlantContactContent;
