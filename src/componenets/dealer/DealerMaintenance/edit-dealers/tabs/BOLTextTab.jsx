import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDealer,
  setDeliveryPhone,
  setContactOnDelivry,
  setContactOnDelivery,
} from "../../../../../redux/EditDealerSlice";
import { Form, Col, Row } from "react-bootstrap";
import { t } from "i18next";
import { Formik } from "formik";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import * as yup from "yup";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";

const BOLTextTab = () => {
  const [hours1, setHours1] = useState("");
  const [hours2, setHours2] = useState("");
  const [hours3, setHours3] = useState("");
  const [directions1, setDirections1] = useState("");
  const [directions2, setDirections2] = useState("");
  const [directions3, setDirections3] = useState("");
  const [directions4, setDirections4] = useState("");
  const [directions5, setDirections5] = useState("");
  const [directions6, setDirections6] = useState("");
  const [directions7, setDirections7] = useState("");
  const [motorizedOtherText1, setOtherText1] = useState("");
  const [motorizedOtherText2, setOtherText2] = useState("");
  const [motorizedOtherText3, setOtherText3] = useState("");
  const [towableOtherText1, setTowOtherText1] = useState("");
  const [towableOtherText2, setTowOtherText2] = useState("");
  const [towableOtherText3, setTowOtherText3] = useState("");
  const [washInstructions1, setWashInstructions1] = useState("");
  const [washInstructions2, setWashInstructions2] = useState("");
  const [washInstructions3, setWashInstructions3] = useState("");
  const [washInstructions4, setWashInstructions4] = useState("");
  const [washInstructions5, setWashInstructions5] = useState("");
  const [contactondeliveryphone, setContactOnDeliveryPhone] = useState("");
  const [bolTextHoursInputValues, setBolTextHoursInputValues] = useState(Array(3).fill(""));
  const [bolTextDirectionsInputValues, setBolTextDirectionsInputValues] = useState(Array(6).fill(""));
  const [bolTextWashInstructions, setBolTextWashInstructions] = useState(Array(5).fill(""));
  const [bolOtherTextMotorized, setBolOtherTextMotorized] = useState(Array(3).fill(""));
  const [bolOtherTextTowable, setBolOtherTextTowable] = useState(Array(3).fill(""));
  const dealerData = useSelector((state) => state.editDealerReducer.dealerData);
  const contactOnDelivery = useSelector((state) => state.editDealerReducer.contactOnDelivery);

  let viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);
  let deliveryPhone = useSelector((state) => state.editDealerReducer.deliveryPhone);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setDeliveryPhone(formattedPhoneNumber));
  };

  useEffect(() => {
    const backendValues = [hours1, hours2, hours3];
    setBolTextHoursInputValues(backendValues);
  }, [hours1, hours2, hours3]);

  useEffect(() => {
    const backendValues = [
      directions1,
      directions2,
      directions3,
      directions4,
      directions5,
      directions6,
      directions7,
    ];
    setBolTextDirectionsInputValues(backendValues);
  }, [directions1, directions2, directions3, directions4, directions5, directions6, directions7]);
  useEffect(() => {
    const backendValues = [motorizedOtherText1, motorizedOtherText2, motorizedOtherText3];
    setBolOtherTextMotorized(backendValues);
  }, [motorizedOtherText1, motorizedOtherText2, motorizedOtherText3]);

  useEffect(() => {
    const backendValues = [towableOtherText1, towableOtherText2, towableOtherText3];
    setBolOtherTextTowable(backendValues);
  }, [towableOtherText1, towableOtherText2, towableOtherText3]);

  useEffect(() => {
    const backendValues = [
      washInstructions1,
      washInstructions2,
      washInstructions3,
      washInstructions4,
      washInstructions5,
    ];
    setBolTextWashInstructions(backendValues);
  }, [washInstructions1, washInstructions2, washInstructions3, washInstructions4, washInstructions5]);

  useEffect(() => {
    if (dealerData != null) {
      setHours1(dealerData.hours1 != null ? dealerData.hours1?.trim() : "");
      setHours2(dealerData.hours2 != null ? dealerData.hours2?.trim() : "");
      setHours3(dealerData.hours3 != null ? dealerData.hours3?.trim() : "");
      setDirections1(dealerData.directions1 != null ? dealerData.directions1?.trim() : "");
      setDirections2(dealerData.directions2 != null ? dealerData.directions2?.trim() : "");
      setDirections3(dealerData.directions3 != null ? dealerData.directions3?.trim() : "");
      setDirections4(dealerData.directions4 != null ? dealerData.directions4?.trim() : "");
      setDirections5(dealerData.directions5 != null ? dealerData.directions5?.trim() : "");
      setDirections6(dealerData.directions6 != null ? dealerData.directions6?.trim() : "");
      setDirections7(dealerData.directions7 != null ? dealerData.directions7?.trim() : "");
      if (null != dealerData.directions7) {
        setDirections7(dealerData.directions7?.trim());
      } else {
        setDirections7("");
      }
      setOtherText1(dealerData.motorizedOtherText1 != null ? dealerData.motorizedOtherText1?.trim() : "");
      setOtherText2(dealerData.motorizedOtherText2 != null ? dealerData.motorizedOtherText2?.trim() : "");
      setOtherText3(dealerData.motorizedOtherText3 != null ? dealerData.motorizedOtherText3?.trim() : "");

      setTowOtherText1(dealerData.towableOtherText1 != null ? dealerData.towableOtherText1?.trim() : "");
      setTowOtherText2(dealerData.towableOtherText2 != null ? dealerData.towableOtherText2?.trim() : "");
      setTowOtherText3(dealerData.towableOtherText3 != null ? dealerData.towableOtherText3?.trim() : "");

      if (null != dealerData.washInstructions1) {
        setWashInstructions1(dealerData.washInstructions1?.trim());
      } else {
        setWashInstructions1("");
      }
      if (null != dealerData.washInstructions2) {
        setWashInstructions2(dealerData.washInstructions2?.trim());
      } else {
        setWashInstructions2("");
      }
      if (null != dealerData.washInstructions3) {
        setWashInstructions3(dealerData.washInstructions3?.trim());
      } else {
        setWashInstructions3("");
      }
      if (null != dealerData.washInstructions4) {
        setWashInstructions4(dealerData.washInstructions4?.trim());
      } else {
        setWashInstructions4("");
      }
      if (null != dealerData.washInstructions5) {
        setWashInstructions5(dealerData.washInstructions5?.trim());
      } else {
        setWashInstructions5("");
      }

      if (null != dealerData?.contactOnDelivery) {
        dispatch(setContactOnDelivery(dealerData?.contactOnDelivery?.trim()));
      } else {
        dispatch(setContactOnDelivery(""));
      }
    }
  }, [dealerData, viewDetail]);

  useEffect(() => {
    dispatch(setDeliveryPhone(formatPhoneNumber(deliveryPhone)));
    dispatch(setContactOnDelivery(contactOnDelivery));
  }, [deliveryPhone, contactOnDelivery]);

  useEffect(() => {
    if (dealerData === undefined || dealerData === null || dealerData === "") {
      dispatch(setDeliveryPhone(""));
      dispatch(setContactOnDelivery(""));
      setContactOnDelivery("");
    }
  }, [dealerData]);

  useEffect(() => {
    bolTextTabFormData();
  }, [
    hours1,
    hours2,
    hours3,
    bolTextHoursInputValues,
    directions1,
    directions2,
    directions3,
    directions4,
    directions5,
    directions6,
    directions7,
    bolTextDirectionsInputValues,
    motorizedOtherText1,
    motorizedOtherText2,
    motorizedOtherText3,
    bolOtherTextMotorized,
    towableOtherText1,
    towableOtherText2,
    towableOtherText3,
    bolOtherTextMotorized,
    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    bolTextWashInstructions,
    deliveryPhone,
    contactOnDelivery,
    bolOtherTextTowable,
  ]);

  const dispatch = useDispatch();

  const bolTextTabFormData = () => {
    dispatch(
      setDealer({
        contactOnDelivery: contactOnDelivery,
        hours1: hours1,
        hours2: hours2,
        hours3: hours3,
        bolTextHours: bolTextHoursInputValues,
        directions1: directions1,
        directions2: directions2,
        directions3: directions3,
        directions4: directions4,
        directions5: directions5,
        directions6: directions6,
        directions7: directions7,
        bolTextDirections: bolTextDirectionsInputValues,
        motorizedOtherText1: motorizedOtherText1,
        motorizedOtherText2: motorizedOtherText2,
        motorizedOtherText3: motorizedOtherText3,
        otherBolTextMotorized: bolOtherTextMotorized,
        towableOtherText1: towableOtherText1,
        towableOtherText2: towableOtherText2,
        towableOtherText3: towableOtherText3,
        otherBolTextTowable: bolOtherTextTowable,
        washInstructions1: washInstructions1,
        washInstructions2: washInstructions2,
        washInstructions3: washInstructions3,
        washInstructions4: washInstructions4,
        washInstructions5: washInstructions5,
        bolTextWashInstructions: bolTextWashInstructions,
        contactOnDeliveryPhone: deliveryPhone?.replace(/\s+/g, ""),
      })
    );
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    contactondeliveryphone: yup.string().matches(phoneRegex),
  });

  return (
    <Formik
      initialValues={{ contactondeliveryphone }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      initialTouched={{ contactondeliveryphone: true }}
    >
      {(formik) => (
        <div className="p-2 w-100">
          <Row className="m-0 p-0">
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ height: "100px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    {t("edit.dealer.page.bolText.tab.hours1")}
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <DynamicTextFields
                    numFields={3}
                    maxCharLimit={42}
                    inputValues={bolTextHoursInputValues}
                    setInputValues={setBolTextHoursInputValues}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="form-group m-b-10 align-items-center row  m-l-0 m-r-0"
                style={{ marginTop: "30px" }}
              >
                <Col xs={3} sm={3} className="p-0" style={{ height: "242px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    {t("edit.dealer.page.bolText.tab.directions1")}
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <DynamicTextFields
                    numFields={7}
                    maxCharLimit={42}
                    inputValues={bolTextDirectionsInputValues}
                    setInputValues={setBolTextDirectionsInputValues}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="form-group m-b-10 align-items-center row  m-l-0 m-r-0"
                style={{ marginTop: "30px" }}
              >
                <Col xs={3} sm={3} md={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("edit.dealer.page.bolText.tab.contactOnDelivery")}
                  </Form.Label>
                </Col>

                <Col xs={5} md={5} className="p-0">
                  <input
                    type="text"

                    className={`customFormControl ${
                      !viewDetail ? (contactOnDelivery === "" ? "borderRed" : "borderGreen") : ""
                    }`}
                    id="contactondelivery"
                    name="contactondelivery"
                    maxLength={30}
                    value={contactOnDelivery}

                    disabled={viewDetail}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => {
                      dispatch(setContactOnDelivery(e.target.value));
                    }}
                    onBeforeInput={(e) => {
                      if (e.data === " " && e.target.value?.trim().length === 0) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                <Col xs={3} sm={3} md={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("edit.dealer.page.bolText.tab.contactOnDeliveryPhone")}
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "110px" }}>
                  <input
                    className={`customFormControl ${
                      !viewDetail
                        ? deliveryPhone === "" || !deliveryPhone?.match(phoneRegex)
                          ? "borderRed"
                          : "borderGreen"
                        : ""
                    }`}

                    id="contactondeliveryphone"
                    name="contactondeliveryphone"
                    value={deliveryPhone}
                    maxLength={14}
                    disabled={viewDetail}
                    onChange={(e) => phoneFormatHandler(e)}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => {
                      formik.handleChange(e);
                      dispatch(setDeliveryPhone(e.target.value));
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              <Form.Group className=" form-group mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} md={3} className="p-0" style={{ height: "170px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    {t("edit.dealer.page.bolText.tab.washInstructions1")}
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <DynamicTextFields
                    numFields={5}
                    maxCharLimit={42}
                    inputValues={bolTextWashInstructions}
                    setInputValues={setBolTextWashInstructions}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>
              <Form.Group></Form.Group>
              <Form.Group
                className="form-group  align-items-center row  m-l-0 m-r-0"
                style={{ marginTop: "30px" }}
              >
                <Col xs={3} sm={3} className="p-0" style={{ height: "92px" }}>
                  <Form.Label className=" col-form-label dealer-label">Other Text - Motorized</Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <DynamicTextFields
                    numFields={3}
                    maxCharLimit={42}
                    inputValues={bolOtherTextMotorized}
                    setInputValues={setBolOtherTextMotorized}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="form-group  align-items-center row  m-l-0 m-r-0"
                style={{ marginTop: "30px" }}
              >
                <Col xs={3} sm={3} className="p-0" style={{ height: "92px" }}>
                  <Form.Label className=" col-form-label dealer-label">Other Text - Towable</Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <DynamicTextFields
                    numFields={3}
                    maxCharLimit={42}
                    inputValues={bolOtherTextTowable}
                    setInputValues={setBolOtherTextTowable}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </div>
      )}
    </Formik>
  );
};

export default BOLTextTab;
