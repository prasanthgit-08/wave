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
  setDelaysDelayContact,
  setDelaysDelayPhone,
  setDelaysDelayFAXDelayUpdates,
  setDelaysDelayFAX,
  setDelaysDelayPhoneExtn,
} from "../../../../../../redux/CustomerPlantMaintenanceSlice";
const DelayTab = () => {
  const dispatch = useDispatch();

  const [delayContact, setDelayContact] = useState("");
  const [delayPhone, setDelayPhone] = useState("");
  const [delayPhoneExtn, setDelayPhoneExtn] = useState("");
  const [faxDelayUpdates, setFaxDelayUpdates] = useState(false);
  const [delayFax, setDelayFax] = useState("");
  const [delayInstructions, setDelayInstructions] = useState("");

  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDelayPhone(formattedPhoneNumber);
  };

  const phoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);
    setDelayPhoneExtn(extenstion);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDelayFax(formattedPhoneNumber);
  };
  useEffect(() => {
    if (editPlantData != null) {
      setDelayContact(editPlantData.delayContact != null ? editPlantData.delayContact?.trim() : "");
      setDelayPhone(editPlantData.delayPhone != null ? formatPhoneNumber(editPlantData.delayPhone) : "");
      setDelayPhoneExtn(editPlantData.delayPhoneExtension != null ? editPlantData.delayPhoneExtension : "");
      setFaxDelayUpdates(editPlantData.faxDelayUpdates != null ? editPlantData.faxDelayUpdates : "");
      setDelayFax(
        editPlantData.delayFaxNumber != null ? formatPhoneNumber(editPlantData.delayFaxNumber) : ""
      );
      setDelayInstructions(editPlantData.delayInstructions != null ? editPlantData.delayInstructions : "");
    }
  }, [editPlantData, viewDetail]);

  useEffect(() => {
    if (faxDelayUpdates === false) {
      setDelayFax("");
    }
  }, [faxDelayUpdates, delayFax]);
  useEffect(() => {
    delayFormData();
  }, [delayContact, delayPhone, delayPhoneExtn, faxDelayUpdates, delayFax, delayInstructions]);

  const delayFormData = () => {
    dispatch(
      setPlantFormData({
        delayContact: delayContact,
        delayPhone: delayPhone.replace(/\s+/g, ""),
        delayPhoneExtension: delayPhoneExtn,
        faxDelayUpdates: faxDelayUpdates,
        delayFaxNumber: delayFax.replace(/\s+/g, ""),
        delayInstructions: delayInstructions,
      })
    );
  };

  useEffect(() => {
    dispatch(setDelaysDelayContact(delayContact));
    dispatch(setDelaysDelayPhone(delayPhone));
    dispatch(setDelaysDelayFAXDelayUpdates(faxDelayUpdates));
    dispatch(setDelaysDelayFAX(delayFax));
    dispatch(setDelaysDelayPhoneExtn(delayPhoneExtn));
  }, [delayContact, delayPhone, delayFax, faxDelayUpdates, delayPhoneExtn]);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    delayContact: yup.string().required(),
    fAXDelayUpdates: yup.boolean(),
    delayFax: yup.string().when("faxDelayUpdates", {
      is: true,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),

    delayPhone: yup.string().matches(phoneRegex).required(),
  });
  return (
    <Formik
      initialValues={{ delayContact, faxDelayUpdates, delayFax, delayPhone }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        delayContact: true,
        fAXDelayUpdates: false,
        delayFax: true,
        delayPhone: true,
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
                        {t("edit.customer.plant.page.delays.delay.tab.delayContact")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : (formik.errors.delayContact === undefined && delayContact != null) ||
                                delayContact.length > 1
                              ? "borderGreen"
                              : formik.errors.delayContact !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        name="delayContact"
                        type="text"
                        value={delayContact}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setDelayContact(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
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
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : formik.errors.delayPhone === undefined &&
                                delayPhone != null &&
                                delayPhone.length > 1
                              ? "borderGreen"
                              : formik.errors.delayPhone !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        control="input"
                        name="dealyPhone"
                        value={delayPhone}
                        maxLength={14}
                        disabled={viewDetail}
                        onChange={(e) => phoneFormatHandler(e)}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setDelayPhone(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>

                    <Col sm={1} md={1} xs={1} className="p-r-0">
                      <Form.Label className="col-form-label dealer-label w-100n text-center">
                        {t("edit.customer.plant.page.delays.delay.tab.extn")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} sm={1} md={1} className="p-0">
                      <input
                        name="extn"
                        value={delayPhoneExtn}
                        maxLength={4}
                        disabled={delayPhone === "" || viewDetail === true}
                        onChange={phoneFormatExtension}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setDelayPhoneExtn(e.target.value);
                        }}
                        className={`customFormControl ${
                          viewDetail || !delayPhone || !delayPhoneExtn
                            ? ""
                            : delayPhoneExtn && delayPhoneExtn?.length < 3
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
                        {t("edit.customer.plant.page.delays.delay.tab.faxDelayUpdates")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="fAXDelayUpdates"
                        value={faxDelayUpdates}
                        checked={faxDelayUpdates}
                        disabled={viewDetail}
                        onChange={(e) => {
                          setFaxDelayUpdates(e.target.checked);
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
                          viewDetail === true || faxDelayUpdates === false
                            ? ""
                            : formik.errors.delayFax === undefined && delayFax != null && delayFax.length >= 1
                              ? "borderGreen"
                              : formik.errors.delayFax !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        type="fax"
                        name="fax"
                        value={delayFax}
                        onChange={(e) => faxFormatHandler(e)}
                        maxLength={14}
                        disabled={viewDetail || faxDelayUpdates === false}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setDelayFax(e.target.value);
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
                        name="delayInstructions"
                        value={delayInstructions}
                        disabled={viewDetail}
                        onInput={(e) => setDelayInstructions(e.target.value)}
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

export default DelayTab;
