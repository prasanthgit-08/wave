import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import {
  setCustomerFormData,
  setDelaysHotlineTabInitialColor,
  setIsDelaysHotlineTabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import { removeLeadingWhitespace } from "../../../../../../utils/utils";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import Input from "../../../../../../components/common/input";

function HotlineTab() {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  useEffect(() => {
    if (editCustomerData === null) {
      setDescription("");
      setPhone("");
      setNotes("");
    }
    if (editCustomerData !== null) {
      setDescription(editCustomerData.hotlineDescription != null ? editCustomerData.hotlineDescription : "");
      setPhone(editCustomerData.hotLine != null ? formatPhoneNumber(editCustomerData.hotLine) : "");
      setNotes(editCustomerData.hotlineNotes != null ? editCustomerData.hotlineNotes : "");
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    breakdownFormData();
  }, [description, phone, notes]);

  const breakdownFormData = () => {
    dispatch(
      setCustomerFormData({
        hotlineDescription: description,
        hotLine: phone?.replace(/\s+/g, ""),
        hotlineNotes: notes,
      })
    );
  };

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    description: yup.string(),
    phone: yup.string().when("description", {
      is: (description) => description !== undefined && description?.length > 0,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
  });

  useEffect(() => {
    if (!phone && !description) {
      dispatch(setDelaysHotlineTabInitialColor(true));
    } else if (phone?.match(phoneRegex) && !description) {
      dispatch(setDelaysHotlineTabInitialColor(true));
    } else {
      if (!phone?.match(phoneRegex)) {
        dispatch(setIsDelaysHotlineTabValid(false));
        dispatch(setDelaysHotlineTabInitialColor(false));
      } else if (description) {
        dispatch(setIsDelaysHotlineTabValid(true));
        dispatch(setDelaysHotlineTabInitialColor(false));
      } else {
        dispatch(setDelaysHotlineTabInitialColor(true));
      }
    }
  }, [description, phone]);

  return (
    <Formik
      initialValues={{ description, phone }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        phone: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={8} md={8} lg={8} xl={8} xs={8}>
                {/* Description Field*/}
                <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.general.tab.description.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "235px" }}>
                    <Input
                      className="customFormControl"
                      name="description"
                      type="text"
                      maxLength={30}
                      value={description}
                      disabled={viewDetail}

                      onChange={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setDescription(cleanedValue);
                      }}
                      style={{
                        border: viewDetail
                          ? "black 1px solid"
                          : formik.errors.description === undefined &&
                              description != null &&
                              description?.length > 0
                            ? "green 2px solid"
                            : formik.errors.description !== undefined
                              ? "red 2px solid"
                              : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Phone Field */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.phone")}
                    </Form.Label>
                  </Col>
                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <Input
                      className="customFormControl"
                      name="phone"
                      value={phone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => {
                        formik.handleChange(e);
                        phoneFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true ||
                          (!description &&
                            formik.errors.phone === undefined &&
                            phone != null &&
                            phone?.length > 0) ||
                          (phone === "" && !description)
                            ? "black 1px solid"
                            : formik.errors.phone === undefined && phone != null && phone?.length > 0
                              ? "green 2px solid"
                              : !phoneRegex.test(phone)
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-15 row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Notes</Form.Label>
                  </Col>
                  <Col xs={10} md={10} sm={10} className="p-0" style={{ width: "600px" }}>
                    <textarea
                      rows={7}
                      cols={200}
                      type="text"
                      style={{
                        resize: "none",
                        display: "fixed",
                        maxWidth: "700px",
                        boxShadow: "none",
                        fontSize: "12px",
                      }}
                      className={`customFormControl h-250px`}
                      name="notes"
                      value={notes}
                      disabled={viewDetail}
                      autoComplete="off"

                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setNotes(cleanedValue);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default HotlineTab;
