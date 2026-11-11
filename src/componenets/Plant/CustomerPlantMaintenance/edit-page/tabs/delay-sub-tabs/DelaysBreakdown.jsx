import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
import {
  setPlantFormData,
  setDelaysBreakdown,
  setDelaysBreakdownPhone,
  setDelaysBreakdownFAXbreakdownUpdates,
  setDelaysBreakdownFAX,
  setDelaysBreakdownPhoneExtension,
} from "../../../../../../redux/CustomerPlantMaintenanceSlice";
const DelayBreakdown = () => {
  const dispatch = useDispatch();

  const [breakdownContact, setBreakdownContact] = useState("");
  const [breakdownPhone, setBreakdownPhone] = useState("");
  const [breakdownPhoneExtension, setBreakdownPhoneExtension] = useState("");
  const [faxBreakdownUpdates, setFaxBreakdownUpdates] = useState(false);
  const [breakdownFAXNumber, setBreakdownFAXNumber] = useState("");
  const [breakdownInstructions, setBreakdownInstructions] = useState("");
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setBreakdownPhone(formattedPhoneNumber);
  };

  const phoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);
    setBreakdownPhoneExtension(extenstion);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setBreakdownFAXNumber(formattedPhoneNumber);
  };

  useEffect(() => {
    if (faxBreakdownUpdates === false) {
      setBreakdownFAXNumber("");
    }
  }, [faxBreakdownUpdates, breakdownFAXNumber]);

  useEffect(() => {
    if (editPlantData != null) {
      setBreakdownContact(
        editPlantData.breakdownContact != null ? editPlantData.breakdownContact?.trim() : ""
      );
      setBreakdownPhone(
        editPlantData.breakdownPhone != null ? formatPhoneNumber(editPlantData.breakdownPhone) : ""
      );
      setBreakdownPhoneExtension(
        editPlantData.breakdownPhoneExtension != null ? editPlantData.breakdownPhoneExtension : ""
      );
      setFaxBreakdownUpdates(
        editPlantData.faxBreakdownUpdates != null ? editPlantData.faxBreakdownUpdates : ""
      );
      setBreakdownFAXNumber(
        editPlantData.breakdownFAXNumber != null ? formatPhoneNumber(editPlantData.breakdownFAXNumber) : ""
      );
      setBreakdownInstructions(
        editPlantData.breakdownInstructions != null ? editPlantData.breakdownInstructions : ""
      );
    }
  }, [editPlantData, viewDetail]);

  useEffect(() => {
    breakdownFormData();
  }, [
    breakdownContact,
    breakdownPhone,
    breakdownPhoneExtension,
    faxBreakdownUpdates,
    breakdownFAXNumber,
    breakdownInstructions,
  ]);

  const breakdownFormData = () => {
    dispatch(
      setPlantFormData({
        breakdownContact: breakdownContact,
        breakdownPhone: breakdownPhone.replace(/\s+/g, ""),
        breakdownPhoneExtension: breakdownPhoneExtension,
        faxBreakdownUpdates: faxBreakdownUpdates,
        breakdownFAXNumber: breakdownFAXNumber.replace(/\s+/g, ""),
        breakdownInstructions: breakdownInstructions,
      })
    );
  };

  useEffect(() => {
    dispatch(setDelaysBreakdown(breakdownContact));
    dispatch(setDelaysBreakdownPhone(breakdownPhone));
    dispatch(setDelaysBreakdownFAXbreakdownUpdates(faxBreakdownUpdates));
    dispatch(setDelaysBreakdownFAX(breakdownFAXNumber));
    dispatch(setDelaysBreakdownPhoneExtension(breakdownPhoneExtension));
  }, [breakdownContact, breakdownFAXNumber, breakdownPhone, faxBreakdownUpdates, breakdownPhoneExtension]);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    breakdownContact: yup.string().required(),
    fAXBreakdownnUpdates: yup.boolean(),
    breakdownFAXNumber: yup.string().when(" faxBreakdownUpdates", {
      is: true,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
    breakdownPhone: yup.string().matches(phoneRegex).required(),
  });

  return (
    <Formik
      initialValues={{
        breakdownContact,
        faxBreakdownUpdates,
        breakdownFAXNumber,
        breakdownPhone,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        breakdownContact: true,
        faxBreakdownUpdates: false,
        breakdownFAXNumber: true,
        breakdownPhone: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="m-b-5">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  {/*Delay Contact*/}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.delays.delay.tab.breakdownContact")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl  ${
                          viewDetail === true
                            ? ""
                            : formik.errors.breakdownContact === undefined &&
                                breakdownContact != null &&
                                breakdownContact.length >= 1
                              ? "borderGreen"
                              : formik.errors.breakdownContact !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        name="breakdownContact"
                        type="text"
                        value={breakdownContact}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setBreakdownContact(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
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
                        className={`customFormControl  ${
                          viewDetail === true
                            ? ""
                            : formik.errors.breakdownPhone === undefined &&
                                breakdownPhone != null &&
                                breakdownPhone.length > 1
                              ? "borderGreen"
                              : formik.errors.breakdownPhone !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        control="input"
                        name="setBreakdownPhone"
                        value={breakdownPhone}
                        maxLength={14}
                        disabled={viewDetail}
                        onChange={(e) => phoneFormatHandler(e)}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setBreakdownPhone(e.target.value);
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
                        value={breakdownPhoneExtension}
                        maxLength={4}
                        disabled={breakdownPhone === "" || viewDetail === true}
                        onChange={phoneFormatExtension}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setBreakdownPhoneExtension(e.target.value);
                        }}
                        className={`customFormControl ${
                          !breakdownPhone || !breakdownPhoneExtension || viewDetail
                            ? ""
                            : breakdownPhoneExtension && breakdownPhoneExtension?.length < 3
                              ? "borderRed"
                              : ""
                        }`}
                      />
                    </Col>
                  </Form.Group>

                  {/*FAX Delay Updates*/}
                  <Form.Group className="mt-4 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.delays.delay.tab.faxbreakdownUpdates")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="fAXDelayUpdates"
                        value={faxBreakdownUpdates}
                        checked={faxBreakdownUpdates}
                        disabled={viewDetail}
                        onChange={(e) => {
                          setFaxBreakdownUpdates(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* Fax Field */}
                  <Form.Group className="mt-4 align-items  row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.general.tab.fax")}
                      </Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true || faxBreakdownUpdates === false
                            ? ""
                            : breakdownFAXNumber !== "" &&
                                breakdownFAXNumber.length === 14 &&
                                faxBreakdownUpdates
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        type="fax"
                        name="breakdownFAXNumber"
                        value={breakdownFAXNumber}
                        onChange={(e) => faxFormatHandler(e)}
                        maxLength={14}
                        disabled={viewDetail || faxBreakdownUpdates === false}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setBreakdownFAXNumber(e.target.value);
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
                        className="customFormControl h-100 "
                        name="notes"
                        value={breakdownInstructions}
                        disabled={viewDetail}
                        onInput={(e) => setBreakdownInstructions(e.target.value)}
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

export default DelayBreakdown;
