import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomerDelayServices from "../../../../services/CustomerDelayServices";
import {
  setBreakdown,
  setDamage,
  setDelay,
  setDescription,
  setNotes,
  setPhone,
} from "../../../../redux/CustomerDelaySlice";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import Input from "../../../../components/common/input";

const CustomerDelayContent = ({ checkDesc, setCheckDesc }) => {
  const validationSchema = yup.object({
    description: yup.string().required(),
    phone: yup.string().required(),
  });

  const { id, cpk } = useParams();
  const dispatch = useDispatch();
  const [description, setDescriptions] = useState("");
  const [phone, setPhones] = useState("");

  const discriptions = useSelector((state) => state.customerDelaySlice.description);
  const phones = useSelector((state) => formatPhoneNumber(state?.customerDelaySlice?.phone));
  const delay = useSelector((state) => state.customerDelaySlice.delay);
  const breakdown = useSelector((state) => state.customerDelaySlice.breakdown);
  const damage = useSelector((state) => state.customerDelaySlice.damage);
  const notes = useSelector((state) => state.customerDelaySlice.notes);
  const isEditMode = useSelector((state) => state.customerDelaySlice.editMode);

  useEffect(() => {
    if (isEditMode) {
      setCheckDesc("");
    }
  }, [isEditMode]);

  // Check Description already exists for a customer
  const handleCheckdesc = (e) => {
    CustomerDelayServices.checkDescriptionExist(id, e.target.value, cpk)
      .then((res) => {
        setCheckDesc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Phone Number Format setting
  const phoneHandler = (e) => {
    let value = e.target.value;
    const formatedPhoneNumber = formatPhoneNumber(value);
    dispatch(setPhone(formatedPhoneNumber));
  };

  return (
    <Formik
      initialValues={{
        description,
        phone,
      }}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <div className="w-100 p-2">
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Row className="m-0 p-0 mt-3 ">
                    <Col lg={6} md={6} sm={6} xs={6} className="mt-3">
                      <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                          <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                            {t("customerdelay.table.heading.disc")}
                          </Form.Label>
                        </Col>

                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0">
                          <Input
                            type="text"
                            className={`${QuarterScreen.formControl} ${
                              isEditMode
                                ? ""
                                : discriptions
                                  ? checkDesc
                                    ? "borderRed"
                                    : "borderGreen"
                                  : "borderRed"
                            }`}
                            id="description"
                            name="description"
                            value={discriptions}
                            disabled={isEditMode}
                            maxLength={30}
                            onChange={(e) => {
                              formik.handleChange(e);
                              setDescriptions(e.target.value);
                              dispatch(setDescription(e.target.value));
                              setCheckDesc("");
                            }}
                            onBlur={(e) => {
                              if (!e.target.value.trim()) return;
                              handleCheckdesc(e);
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="margin-box-5 form-group m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                          <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                            {t("customerdelay.form.phone")}
                          </Form.Label>
                        </Col>

                        <Col xl={4} lg={4} md={4} sm={4} xs={4} className="p-0">
                          <Input
                            type="tel"
                            className={`${QuarterScreen.formControl} ${
                              isEditMode
                                ? "black"
                                : phones.length > 0
                                  ? phones.match(/^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm)
                                    ? "black"
                                    : "borderRed"
                                  : "black"
                            }`}
                            id="phone"
                            name="phone"
                            value={phones}
                            disabled={isEditMode}
                            maxLength={14}
                            onChange={(e) => {
                              formik.handleChange(e);
                              phoneHandler(e);
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="margin-box-5 form-group m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                          <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                            {t("customerdelay.form.delay")}
                          </Form.Label>
                        </Col>

                        <Col xs={6} md={6} sm={5} className="p-0">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${!isEditMode ? (delay || damage || breakdown ? "" : "borderRed") : ""}`}
                            id="delay"
                            name="delay"
                            checked={delay}
                            disabled={isEditMode}
                            onChange={(e) => {
                              dispatch(setDelay(e.target.checked));
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="margin-box-5 form-group m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                          <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                            {t("customerdelay.form.breakdown")}
                          </Form.Label>
                        </Col>

                        <Col xs={6} md={6} sm={5} className="p-0">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${!isEditMode ? (delay || damage || breakdown ? "" : "borderRed") : ""}`}
                            id="breakdown"
                            name="breakdown"
                            disabled={isEditMode}
                            checked={breakdown}
                            onChange={(e) => {
                              dispatch(setBreakdown(e.target.checked));
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="margin-box-5 form-group m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                          <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                            {t("customerdelay.form.damage")}
                          </Form.Label>
                        </Col>

                        <Col xs={6} md={6} sm={5} className="p-0">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${!isEditMode ? (delay || damage || breakdown ? "" : "borderRed") : ""}`}
                            id="damage"
                            checked={damage}
                            disabled={isEditMode}
                            name="damage"
                            onChange={(e) => {
                              dispatch(setDamage(e.target.checked));
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                      <Form.Group className=" form-group  m-b-20 align-items-center m-l-0 m-r-0">
                        <Col xl={2} lg={3} md={3} xs={5} sm={3} className="p-0">
                          <Form.Label
                            className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label} m-b-15`}
                          >
                            {t("customerdelay.form.notes")}
                          </Form.Label>
                        </Col>

                        <div xl={12} lg={12} md={12} sm={12} xs={12} className="p-0">
                          <textarea
                            name="notes"
                            className="col-12 h-250px "
                            style={{ borderRadius: "0.25rem" }}
                            id="notes"
                            disabled={isEditMode}
                            cols="30"
                            rows="20"
                            autoComplete="off"
                            aria-autocomplete="list"
                            value={notes}
                            onChange={(e) => {
                              dispatch(setNotes(e.target.value));
                            }}
                          ></textarea>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerDelayContent;
