import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlantFormData,
  setPickupLotSupervisorEmail,
  setPickupLotSupervisorPhone,
  setPickupLotPointContactEmail,
  setPickupLotPointContactPhone,
  setPickupLotSupervisorPhoneExtn,
  setPickupLotPointContactPhoneExtn,
} from "../../../../../redux/CustomerPlantMaintenanceSlice";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import phoneExtension from "../../../../../utils/validation/PhoneExtension";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
const PickupLotTab = () => {
  const [lotSupervisor, setLotSupervisor] = useState("");
  const [lotSupervisorPhone, setLotSupervisorPhone] = useState("");
  const [lotSupervisorPhoneExtn, setLotSupervisorPhoneExtn] = useState("");
  const [lotSupervisorEmail, setLotSupervisorEmail] = useState("");
  const [lotPointContact, setLotPointContact] = useState("");
  const [lotPointContactPhone, setLotPointContactPhone] = useState("");
  const [lotPointContactPhoneExtn, setLotPointContactPhoneExtn] = useState("");
  const [lotPointContactEmail, setLotPointContactEmail] = useState("");
  const [lotHours, setLotHours] = useState("");

  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setLotSupervisorPhone(formattedPhoneNumber);
  };

  const phoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);
    setLotSupervisorPhoneExtn(extenstion);
  };
  const pointPhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setLotPointContactPhone(formattedPhoneNumber);
  };

  const pointPhoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);
    setLotPointContactPhoneExtn(extenstion);
  };
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    lotSupervisorPhone: yup.string().matches(phoneRegex),
    lotSupervisorEmail: yup.string().matches(emailRegex),
    lotPointContactPhone: yup.string().matches(phoneRegex),
    lotPointContactEmail: yup.string().matches(emailRegex),
  });
  useEffect(() => {
    if (editPlantData != null) {
      setLotSupervisor(editPlantData.lotSupervisor != null ? editPlantData.lotSupervisor?.trim() : "");
      setLotSupervisorPhone(
        editPlantData.lotSupervisorPhone != null ? formatPhoneNumber(editPlantData.lotSupervisorPhone) : ""
      );
      setLotSupervisorPhoneExtn(
        editPlantData.lotSupervisorPhoneExtn != null ? editPlantData.lotSupervisorPhoneExtn : ""
      );
      setLotSupervisorEmail(
        editPlantData.lotSupervisorEmail != null ? editPlantData.lotSupervisorEmail?.trim() : ""
      );
      setLotPointContact(editPlantData.lotPointContact != null ? editPlantData.lotPointContact?.trim() : "");
      setLotPointContactPhone(
        editPlantData.lotPointContactPhone != null
          ? formatPhoneNumber(editPlantData.lotPointContactPhone)
          : ""
      );
      setLotPointContactPhoneExtn(
        editPlantData.lotPointContactPhoneExtn != null ? editPlantData.lotPointContactPhoneExtn : ""
      );
      setLotPointContactEmail(
        editPlantData.lotPointContactEmail != null ? editPlantData.lotPointContactEmail?.trim() : ""
      );
      setLotHours(editPlantData.lotHours != null ? editPlantData.lotHours : "");
    }
  }, [editPlantData, viewDetail]);
  useEffect(() => {
    pickupLotTabFormData();
  }, [
    lotSupervisor,
    lotSupervisorPhone,
    lotSupervisorPhoneExtn,
    lotSupervisorEmail,
    lotPointContact,
    lotPointContactEmail,
    lotPointContactPhone,
    lotPointContactPhoneExtn,
    lotHours,
  ]);
  const pickupLotTabFormData = () => {
    dispatch(
      setPlantFormData({
        lotSupervisor: lotSupervisor,
        lotSupervisorPhone: lotSupervisorPhone?.replace(/\s+/g, ""),
        lotSupervisorPhoneExtn: lotSupervisorPhoneExtn,
        lotSupervisorEmail: lotSupervisorEmail,
        lotPointContact: lotPointContact,
        lotPointContactPhone: lotPointContactPhone?.replace(/\s+/g, ""),
        lotPointContactPhoneExtn: lotPointContactPhoneExtn,
        lotPointContactEmail: lotPointContactEmail,
        lotHours: lotHours,
      })
    );
  };
  useEffect(() => {
    dispatch(setPickupLotPointContactEmail(lotPointContactEmail));
    dispatch(setPickupLotPointContactPhone(lotPointContactPhone));
    dispatch(setPickupLotSupervisorEmail(lotSupervisorEmail));
    dispatch(setPickupLotSupervisorPhone(lotSupervisorPhone));
    dispatch(setPickupLotSupervisorPhoneExtn(lotSupervisorPhoneExtn));
    dispatch(setPickupLotPointContactPhoneExtn(lotPointContactPhoneExtn));
  }, [
    lotPointContactEmail,
    lotPointContactPhone,
    lotSupervisorEmail,
    lotSupervisorPhone,
    lotPointContactPhoneExtn,
    lotSupervisorPhoneExtn,
  ]);
  return (
    <Formik
      initialValues={{
        lotPointContactPhone,
        lotPointContactEmail,
        lotSupervisorPhone,
        lotSupervisorEmail,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        lotPointContactPhone: true,
        lotPointContactEmail: true,
        lotSupervisorPhone: true,
        lotSupervisorEmail: true,
      }}
    >
      {(formik) => (
        <Form>
          <div>
            <div className="p-15 w-100">
              <Row className="m-0 p-0">
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group className="mt-3  align-items  row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.pickuplot.tab.supervisor")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className="customFormControl"
                        name="lotSupervisor"
                        type="text"
                        value={lotSupervisor}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setLotSupervisor(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/*Phone, Extn*/}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.pickuplot.tab.phone")}
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : formik.errors.lotSupervisorPhone === undefined &&
                                lotSupervisorPhone != null &&
                                lotSupervisorPhone.length > 1
                              ? ""
                              : formik.errors.lotSupervisorPhone !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        control="input"
                        name="phone"
                        value={lotSupervisorPhone}
                        maxLength={14}
                        disabled={viewDetail}
                        onChange={(e) => phoneFormatHandler(e)}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setLotSupervisorPhone(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>

                    <Col sm={1} md={1} xs={1} className="p-r-0">
                      <input
                        name="extn"
                        value={lotSupervisorPhoneExtn}
                        maxLength={4}
                        disabled={lotSupervisorPhone === "" || viewDetail === true}
                        onChange={phoneFormatExtension}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setLotSupervisorPhoneExtn(e.target.value);
                        }}
                        className={`customFormControl ${
                          !lotSupervisorPhone || !lotSupervisorPhoneExtn || viewDetail
                            ? ""
                            : lotSupervisorPhoneExtn && lotSupervisorPhoneExtn?.length < 3
                              ? "borderRed"
                              : ""
                        }`}
                      />
                    </Col>
                  </Form.Group>

                  {/*FAX Delay Updates*/}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.pickuplot.tab.email")}
                      </Form.Label>
                    </Col>
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <input
                        className={`customFormControl
                                `}
                        style={{
                          border: viewDetail
                            ? ""
                            : String(lotSupervisorEmail).match(emailRegex) || lotSupervisorEmail === ""
                              ? "black 1px solid"
                              : "red 2px solid",
                        }}
                        type="lotSupervisorEmail"
                        name="slotSupervisorEmail"
                        value={lotSupervisorEmail}
                        maxLength={70}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          // formik.handleChange(e);
                          setLotSupervisorEmail(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  {/*Delay Contact*/}
                  <Form.Group className="mt-5 align-items  row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.pickuplot.tab.pointContact")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className="customFormControl"
                        name="delayContact"
                        type="text"
                        value={lotPointContact}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setLotPointContact(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label p-0">Phone</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : formik.errors.lotPointContactPhone === undefined &&
                                lotPointContactPhone != null &&
                                lotPointContactPhone.length > 1
                              ? ""
                              : formik.errors.lotPointContactPhone !== undefined
                                ? "borderRed"
                                : ""
                        }`}
                        type="salesManagerPhone"
                        name="salesManagerPhone"
                        value={lotPointContactPhone}
                        maxLength={14}
                        onChange={pointPhoneFormatHandler}
                        onInput={(e) => {
                          formik.handleChange(e);
                          setLotPointContactPhone(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                      />
                    </Col>

                    <Col sm={1} md={1} xs={1} className="p-r-0">
                      <input
                        type="text"
                        id="salesManagerPhoneExtn"
                        name="salesManagerPhoneExtn"
                        onChange={pointPhoneFormatExtension}
                        maxLength={4}
                        value={lotPointContactPhoneExtn}
                        onInput={(e) => setLotPointContactPhoneExtn(e.target.value)}
                        disabled={lotPointContactPhone === "" || viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        className={`customFormControl ${
                          !lotPointContactPhone || !lotPointContactPhoneExtn || viewDetail
                            ? ""
                            : lotPointContactPhoneExtn && lotPointContactPhoneExtn?.length < 3
                              ? "borderRed"
                              : ""
                        }`}
                      />
                    </Col>
                  </Form.Group>

                  {/*FAX Delay Updates*/}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.pickuplot.tab.email")}
                      </Form.Label>
                    </Col>
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <input
                        className={`customFormControl
                   `}
                        style={{
                          border: viewDetail
                            ? ""
                            : String(lotPointContactEmail).match(emailRegex) || lotPointContactEmail === ""
                              ? "black 1px solid"
                              : "red 2px solid",
                        }}
                        type="lotPointContactEmail"
                        name="lotPointContactEmail"
                        value={lotPointContactEmail}
                        maxLength={70}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setLotPointContactEmail(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-5 align-items  row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <label className="col-form-label dealer-label p-0 m-b-20">
                        {t("edit.customer.plant.page.pickuplot.tab.hours")}
                      </label>
                    </Col>

                    <Col xs={10} md={10} sm={10} className="p-0">
                      <textarea
                        rows={10}
                        cols={20}
                        type="text"
                        className="customFormControl h-100"
                        name="notes"
                        value={lotHours}
                        disabled={viewDetail}
                        onInput={(e) => setLotHours(e.target.value)}
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
export default PickupLotTab;
