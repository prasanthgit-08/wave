import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlantFormData,
  setDelaysDamageContact,
  setDelaysDamagePhone,
  setDelaysFaxDamageUpdates,
  setDelaysDamageFAX,
  setDelaysDamagePhoneExtension,
} from "../../../../../../redux/CustomerPlantMaintenanceSlice";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
const DelaysDamage = () => {
  const dispatch = useDispatch();
  const [damageContact, setDamageContact] = useState("");
  const [damagePhone, setDamagePhone] = useState("");
  const [damagePhoneExtension, setDamagePhoneExtension] = useState("");
  const [faxDamageUpdates, setFaxDamageUpdates] = useState(false);
  const [damageFaxNumber, setDamageFaxNumber] = useState("");
  const [damageInstructions, setDamageInstructions] = useState("");
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDamagePhone(formattedPhoneNumber);
  };

  const phoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);
    setDamagePhoneExtension(extenstion);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDamageFaxNumber(formattedPhoneNumber);
  };
  useEffect(() => {
    if (faxDamageUpdates === false) {
      setDamageFaxNumber("");
    }
  }, [faxDamageUpdates, damageFaxNumber]);
  useEffect(() => {
    if (editPlantData != null) {
      setDamageContact(editPlantData.damageContact != null ? editPlantData.damageContact?.trim() : "");
      setDamagePhone(editPlantData.damagePhone != null ? formatPhoneNumber(editPlantData.damagePhone) : "");
      setDamagePhoneExtension(
        editPlantData.damagePhoneExtension != null ? editPlantData.damagePhoneExtension : ""
      );
      setFaxDamageUpdates(editPlantData.faxDamageUpdates != null ? editPlantData.faxDamageUpdates : "");
      setDamageFaxNumber(
        editPlantData.damageFaxNumber != null ? formatPhoneNumber(editPlantData.damageFaxNumber) : ""
      );
      setDamageInstructions(editPlantData.damageInstructions != null ? editPlantData.damageInstructions : "");
    }
  }, [editPlantData, viewDetail]);
  useEffect(() => {
    damageData();
  }, [
    damageContact,
    damageFaxNumber,
    damagePhone,
    damageInstructions,
    damagePhoneExtension,
    faxDamageUpdates,
  ]);

  const damageData = () => {
    dispatch(
      setPlantFormData({
        damageContact: damageContact,
        damagePhone: damagePhone.replace(/\s+/g, ""),
        damagePhoneExtension: damagePhoneExtension,
        faxDamageUpdates: faxDamageUpdates,
        damageFaxNumber: damageFaxNumber.replace(/\s+/g, ""),
        damageInstructions: damageInstructions,
      })
    );
  };

  useEffect(() => {
    dispatch(setDelaysDamageContact(damageContact));
    dispatch(setDelaysDamagePhone(damagePhone));
    dispatch(setDelaysFaxDamageUpdates(faxDamageUpdates));
    dispatch(setDelaysDamageFAX(damageFaxNumber));
    dispatch(setDelaysDamagePhoneExtension(damagePhoneExtension));
  }, [damageContact, damageFaxNumber, damagePhone, faxDamageUpdates, damagePhoneExtension]);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    damagePhone: yup.string().matches(phoneRegex).required(),
    damageContact: yup.string().required(),
    faxDamageUpdates: yup.boolean(),
    damageFaxNumber: yup.string().when("faxDamageUpdates", {
      is: true,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
  });

  return (
    <Formik
      initialValues={{
        damageContact,
        faxDamageUpdates,
        damageFaxNumber,
        damagePhone,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        damageContact: true,
        faxDamageUpdates: false,
        damageFaxNumber: true,
        damagePhone: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="m-b-5">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  {/*Damage Contact*/}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.delays.delay.tab.damageContact")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : formik.errors.damageContact === undefined &&
                                damageContact != null &&
                                damageContact.length >= 1
                              ? "borderGreen"
                              : formik.errors.damageContact !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        name="damageContact"
                        type="text"
                        value={damageContact}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => setDamageContact(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""))}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>

                  {/*Phone, Extn*/}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.pickuplot.tab.phone")}
                      </Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : damagePhone !== "" && damagePhone.length === 14
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        name="damagePhone"
                        type="text"
                        value={damagePhone}
                        maxLength={14}
                        disabled={viewDetail}
                        onChange={(e) => phoneFormatHandler(e)}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setDamagePhone(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                    <Col sm={1} md={1} xs={1} className="p-r-0">
                      <Form.Label className="col-form-label dealer-label w-100n text-center">
                        {t("edit.customer.plant.page.delays.delay.tab.extn")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} sm={1} md={1} lg={1} className="p-0">
                      <input
                        name="extn"
                        value={damagePhoneExtension}
                        maxLength={4}
                        disabled={damagePhone === "" || viewDetail === true}
                        onChange={phoneFormatExtension}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setDamagePhoneExtension(e.target.value);
                        }}
                        className={`customFormControl ${
                          viewDetail || !damagePhone || !damagePhoneExtension
                            ? ""
                            : damagePhoneExtension && damagePhoneExtension?.length < 3
                              ? "borderRed"
                              : ""
                        }`}
                      />
                    </Col>
                  </Form.Group>

                  {/*FAX Delay Updates*/}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.delays.delay.tab.faxDamageUpdates")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="faxDamageUpdates"
                        value={faxDamageUpdates}
                        checked={faxDamageUpdates}
                        disabled={viewDetail}
                        onChange={(e) => {
                          setFaxDamageUpdates(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* Fax Field */}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.general.tab.fax")}
                      </Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true || faxDamageUpdates === false
                            ? ""
                            : damageFaxNumber !== "" && damageFaxNumber.length === 14 && faxDamageUpdates
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        type="damageFaxNumber"
                        name="damageFaxNumber"
                        value={damageFaxNumber}
                        onChange={(e) => faxFormatHandler(e)}
                        maxLength={14}
                        disabled={viewDetail || faxDamageUpdates === false}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setDamageFaxNumber(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>

                  {/*Instructions*/}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <label className="col-form-label dealer-label p-0 m-b-20">
                        {t("edit.customer.plant.page.delays.delay.tab.instructions")}
                      </label>
                    </Col>
                    <Col xs={9} md={9} sm={9} className="p-0">
                      <textarea
                        rows={10}
                        cols={20}
                        type="text"
                        disabled={viewDetail}
                        className="customFormControl h-100 "
                        name="damageInstructions"
                        value={damageInstructions}
                        onInput={(e) => setDamageInstructions(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DelaysDamage;
