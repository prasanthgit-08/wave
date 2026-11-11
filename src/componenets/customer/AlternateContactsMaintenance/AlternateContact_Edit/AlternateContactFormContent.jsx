import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { t } from "i18next";
import { Form, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  setViewDetail,
  setContactData,
  setEditFormData,
  setCheckContact,
} from "../../../../redux/AlternateContactSlice";
import { setContact, setName, setEmail, setFax, setPhone } from "../../../../redux/AlternateContactSlice";
import AlternateContactService from "../../../../services/AlternateContactService";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import Input from "../../../../components/common/input";
import { emailRegex } from "../../../../utils/validation/EmailRegex";

const AlternateContactFormContent = () => {
  const viewDetail = useSelector((state) => state.alternateContactReducer.viewDetail);
  const params = useParams();
  const dispatch = useDispatch();
  const editFormData = useSelector((state) => state.alternateContactReducer.editFormData);
  const navigate = useNavigate();
  const { id } = useParams();
  const alternateContactPK = params.id;
  //redux
  const [load, setLoad] = useState(false);
  const name = useSelector((state) => state.alternateContactReducer.name);
  const contact = useSelector((state) => state.alternateContactReducer.contact);
  const email = useSelector((state) => state.alternateContactReducer.email);
  const phone = useSelector((state) => formatPhoneNumber(state.alternateContactReducer.phone));
  const fax = useSelector((state) => formatPhoneNumber(state.alternateContactReducer.fax));
  const changesCancelled = useSelector((state) => state.alternateContactReducer.changesCancelled);

  //unique
  const checkContact = useSelector((state) => state.alternateContactReducer.checkContact);

  useEffect(() => {
    if (editFormData === null) {
      dispatch(setContact(""));
      dispatch(setName(""));
      dispatch(setEmail(""));
      dispatch(setPhone(""));
      dispatch(setFax(""));
      dispatch(setCheckContact());
    }
  }, [editFormData]);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setContact(editFormData.contact ? editFormData.contact?.trim() : ""));
      dispatch(setName(editFormData.name ? editFormData.name?.trim() : ""));
      dispatch(setEmail(editFormData.email ? editFormData.email?.trim() : ""));
      dispatch(setPhone(editFormData.phone ? editFormData.phone : ""));
      dispatch(setFax(editFormData.fax ? editFormData.fax : ""));
      dispatch(setCheckContact());
    }
  }, [editFormData, changesCancelled]);

  // to backend
  const getContact = () => {
    dispatch(
      setContactData({
        alternateContactPK: alternateContactPK,
        contact: contact,
        name: name,
        email: email,
        fax: fax.replace(/\s+/g, ""),
        phone: phone.replace(/\s+/g, ""),
      })
    );
  };
  useEffect(() => {
    getContact();
  }, [alternateContactPK, contact, name, email, phone, fax]);

  const fetchRecordById = (id) => {
    setLoad(true);
    AlternateContactService.getAlternateContactsById(id)
      .then((response) => {
        const data = response?.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/alternate-contacts");
        setLoad(false);
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
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setFax(formattedPhoneNumber));
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    contact: yup.string().required(),
    phone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
    email: yup.string().matches(emailRegex),
  });

  //unique contact
  const handleCheckContact = (contact) => {
    AlternateContactService.checkDescriptionExist(id, contact, name)
      .then((res) => {
        dispatch(setCheckContact(res?.data));
      })
      .catch((err) => {
        console.log(err);
        console.log("error occur");
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
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-10">
                  <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={1} md={1} xs={1} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>
                          {t("edit.AlternateContact.page.resources.tab.contact")}
                        </Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="p-0">
                        <Input
                          name={contact}
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            viewDetail
                              ? ""
                              : contact != ""
                                ? checkContact
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                          }`}
                          maxLength={30}
                          id="contact"
                          value={contact}
                          disabled={viewDetail}
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

                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={1} md={1} xs={1} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>
                          {t("edit.AlternateContact.page.resources.tab.name")}
                        </Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="p-0">
                        <Input
                          name={name}
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            !viewDetail
                              ? name
                                ? "borderGreen"
                                : !name && !email && !phone && !fax
                                  ? "borderRed"
                                  : ""
                              : ""
                          }`}
                          maxLength={30}
                          id="name"
                          value={name}
                          disabled={viewDetail}
                          onChange={(e) => {
                            formik.handleChange(e);
                            dispatch(setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={1} md={1} xs={1} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>
                          {t("edit.AlternateContact.page.resources.tab.email")}
                        </Form.Label>
                      </Col>
                      <Col xs={5} sm={5} md={5} className="p-0">
                        <Input
                          type="text"
                          className={`customFormControl ${
                            !viewDetail
                              ? (!name && !email && !phone && !fax) || (email && !email.match(emailRegex))
                                ? "borderRed"
                                : email && email.match(emailRegex)
                                  ? "borderGreen"
                                  : ""
                              : ""
                          }`}
                          id="email"
                          name="email"
                          value={email}
                          maxLength={70}
                          disabled={viewDetail}
                          onChange={(e) => {
                            formik.handleChange(e);
                            dispatch(setEmail(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={1} md={1} xs={1} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>
                          {t("edit.AlternateContact.page.resources.tab.phone")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                        <Input
                          className={`customFormControl ${
                            !viewDetail
                              ? (!name && !email && !phone && !fax) || (phone && !phone.match(phoneRegex))
                                ? "borderRed"
                                : phone && phone.match(phoneRegex)
                                  ? "borderGreen"
                                  : ""
                              : ""
                          }`}
                          type="text"
                          name="phone"
                          value={phone}
                          maxLength={14}
                          disabled={viewDetail}
                          onChange={(e) => {
                            formik.handleChange(e);
                            phoneFormatHandler(e);
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={1} md={1} xs={1} className="p-0">
                        <Form.Label className={QuarterScreen.colFormLabel}>
                          {t("edit.AlternateContact.page.resources.tab.fax")}
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                        <Input
                          className={`customFormControl ${
                            !viewDetail
                              ? (!name && !email && !phone && !fax) || (fax && !fax.match(phoneRegex))
                                ? "borderRed"
                                : fax && fax.match(phoneRegex)
                                  ? "borderGreen"
                                  : ""
                              : ""
                          }`}
                          type="fax"
                          name="fax"
                          value={fax}
                          maxLength={14}
                          disabled={viewDetail}
                          onChange={(e) => {
                            formik.handleChange(e);
                            faxFormatHandler(e);
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
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
      )}
    </Formik>
  );
};

export default AlternateContactFormContent;
