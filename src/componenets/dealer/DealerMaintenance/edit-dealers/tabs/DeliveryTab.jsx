import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContactOnDelivery, setDealer, setDeliveryPhone } from "../../../../../redux/EditDealerSlice";
import { Form, Button, Tab, Tabs, Col, Row, Container } from "react-bootstrap";
import { t } from "i18next";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";

function DeliveryTab() {
  const [deliveryAddress1, setDeliveryAddress1] = useState("");
  const [deliveryAddress2, setDeliveryAddress2] = useState("");
  const [contactOnDeliveryPhone, setContactOnDeliveryPhone] = useState("");
  const [sundayDelivery, setSundayDelivery] = useState("");
  const [mondayDelivery, setMondayDelivery] = useState("");
  const [tuesdayDelivery, setTuesdayDelivery] = useState("");
  const [wednesdayDelivery, setWednesdayDelivery] = useState("");
  const [thursdayDelivery, setThursdayDelivery] = useState("");
  const [fridayDelivery, setFridayDelivery] = useState("");
  const [saturdayDelivery, setSaturdayDelivery] = useState("");
  const [deliveryHours, setDeliveryHours] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [atleastOneDeliveryDateCheck, setAtleastOneDeliveryDateCheck] = useState(true);

  const contactOnDelivery = useSelector((state) => state.editDealerReducer.contactOnDelivery);
  const dealerData = useSelector((state) => state.editDealerReducer.dealerData);

  const dealer = useSelector((state) => state.editDealerReducer.dealer);

  const deliveryPhone = useSelector((state) => state.editDealerReducer.deliveryPhone);

  const contactondelivery = useSelector((state) => state.editDealerReducer.contactOnDelivery);

  let viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  useEffect(() => {
    if (null != dealer) {
      dispatch(setContactOnDelivery(contactOnDelivery));
      setContactOnDeliveryPhone(formatPhoneNumber(deliveryPhone));
    }
  }, [deliveryPhone, contactOnDelivery]);

  useEffect(() => {
    if (dealerData != null) {
      setDeliveryAddress1(dealerData.deliveryAddress1 != null ? dealerData.deliveryAddress1?.trim() : "");
      setDeliveryAddress2(dealerData.deliveryAddress2 != null ? dealerData.deliveryAddress2?.trim() : "");
      setSundayDelivery(dealerData.sundayDelivery);
      setMondayDelivery(dealerData.mondayDelivery);
      setTuesdayDelivery(dealerData.tuesdayDelivery);
      setWednesdayDelivery(dealerData.wednesdayDelivery);
      setThursdayDelivery(dealerData.thursdayDelivery);
      setFridayDelivery(dealerData.fridayDelivery);
      setSaturdayDelivery(dealerData.saturdayDelivery);
      setDeliveryHours(dealerData.deliveryHours != null ? dealerData.deliveryHours : "");
      setDeliveryNotes(dealerData.deliveryNotes != null ? dealerData.deliveryNotes : "");

      if (null != dealerData?.contactOnDelivery) {
        dispatch(setContactOnDelivery(dealerData?.contactOnDelivery?.trim()));
      } else {
        dispatch(setContactOnDelivery(""));
      }
      dispatch(setDeliveryPhone(formatPhoneNumber(dealerData?.contactOnDeliveryPhone)));
    }
  }, [dealerData, viewDetail]);

  useEffect(() => {
    if (dealerData === undefined || dealerData === null || dealerData === "") {
      dispatch(setDeliveryPhone(""));
      dispatch(setContactOnDelivery(""));
      setContactOnDelivery("");
    }
  }, [dealerData]);

  useEffect(() => {
    deliveryTabFormData();
  }, [
    deliveryAddress1,
    deliveryAddress2,
    contactOnDelivery,
    contactOnDeliveryPhone,
    sundayDelivery,
    mondayDelivery,
    tuesdayDelivery,
    wednesdayDelivery,
    thursdayDelivery,
    fridayDelivery,
    saturdayDelivery,
    deliveryHours,
    deliveryNotes,
    deliveryPhone,
    atleastOneDeliveryDateCheck,
  ]);

  const dispatch = useDispatch();

  const deliveryTabFormData = () => {
    dispatch(
      setDealer({
        deliveryAddress1: deliveryAddress1,
        deliveryAddress2: deliveryAddress2,
        contactOnDelivery: contactOnDelivery,
        contactOnDeliveryPhone: deliveryPhone?.replace(/\s+/g, ""),
        sundayDelivery: sundayDelivery,
        mondayDelivery: mondayDelivery,
        tuesdayDelivery: tuesdayDelivery,
        wednesdayDelivery: wednesdayDelivery,
        thursdayDelivery: thursdayDelivery,
        fridayDelivery: fridayDelivery,
        saturdayDelivery: saturdayDelivery,
        deliveryHours: deliveryHours,
        deliveryNotes: deliveryNotes,
        atleastOneDeliveryDateCheck: atleastOneDeliveryDateCheck,
      })
    );
  };
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setDeliveryPhone(formattedPhoneNumber));
  };

  useEffect(() => {
    if (
      sundayDelivery ||
      mondayDelivery ||
      tuesdayDelivery ||
      wednesdayDelivery ||
      thursdayDelivery ||
      fridayDelivery ||
      saturdayDelivery
    ) {
      setAtleastOneDeliveryDateCheck(false);
    } else {
      setAtleastOneDeliveryDateCheck(true);
    }
  }, [
    sundayDelivery,
    mondayDelivery,
    tuesdayDelivery,
    wednesdayDelivery,
    thursdayDelivery,
    fridayDelivery,
    saturdayDelivery,
    atleastOneDeliveryDateCheck,
  ]);

  return (
    <div className="p-2 w-100">
      <Row className="m-0 p-0">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Delivery Address</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="text"
                className="customFormControl"
                id="ad1"
                name="ad1"
                value={deliveryAddress1}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                maxLength={30}
                disabled={viewDetail}
                autoComplete="one-time-code"
                aria-autocomplete="list"
                onInput={(e) => setDeliveryAddress1(e.target.value)}
                spellCheck={false}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0">
              <Form.Label className="col-form-label dealer-label"></Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="text"
                className="customFormControl"
                id="ad2"
                name="ad2"
                value={deliveryAddress2}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                maxLength={30}
                disabled={viewDetail}
                autoComplete="one-time-code"
                aria-autocomplete="list"
                onInput={(e) => setDeliveryAddress2(e.target.value)}
                spellCheck={false}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group  mt-5 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Delivery Contact</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="text"
                className={`customFormControl ${
                  !viewDetail ? (contactOnDelivery === "" ? "borderRed" : "borderGreen") : ""
                }`}
                id="contactOnDelivery"
                name="contactOnDelivery"
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

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Delivery Phone</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "110px" }}>
              <input
                type="text"
                className={`customFormControl ${
                  !viewDetail
                    ? deliveryPhone === "" || !deliveryPhone?.match(phoneRegex)
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="contactOnDeliveryPhone"
                name="contactOnDeliveryPhone"
                maxLength={14}
                onBeforeInput={(e) => {
                  if (e.data && /\D/.test(e.data)) {
                    e.preventDefault();
                  }
                }}
                value={deliveryPhone}
                disabled={viewDetail}
                onChange={(e) => phoneFormatHandler(e)}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => setDeliveryPhone(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group mt-5 row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0">
              <Form.Label className="col-form-label dealer-label p-0">
                Days Dealers Is Open For Deliveries
              </Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="p-0">
              <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                <input
                  className={`form-check-input ${
                    !viewDetail
                      ? sundayDelivery
                        ? "borderGreen"
                        : !sundayDelivery &&
                            !mondayDelivery &&
                            !tuesdayDelivery &&
                            !wednesdayDelivery &&
                            !thursdayDelivery &&
                            !fridayDelivery &&
                            !saturdayDelivery
                          ? "borderRed"
                          : ""
                      : ""
                  }`}
                  type="checkbox"
                  id="sundayDelivery"
                  name="sundayDelivery"
                  value={sundayDelivery}
                  checked={sundayDelivery}
                  onChange={(e) => setSundayDelivery(e.target.checked)}
                  disabled={viewDetail}
                />
                <span className="ps-2">Sunday</span>
              </Form.Check>

              <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                <Form.Check.Input
                  className={`form-check-input ${
                    !viewDetail
                      ? mondayDelivery
                        ? "borderGreen"
                        : !sundayDelivery &&
                            !mondayDelivery &&
                            !tuesdayDelivery &&
                            !wednesdayDelivery &&
                            !thursdayDelivery &&
                            !fridayDelivery &&
                            !saturdayDelivery
                          ? "borderRed"
                          : ""
                      : ""
                  }`}
                  type="checkbox"
                  name="mondayDelivery"
                  value={mondayDelivery}
                  checked={mondayDelivery}
                  disabled={viewDetail}
                  onChange={(e) => setMondayDelivery(e.target.checked)}
                />
                <span className="ps-2">Monday</span>
              </Form.Check>

              <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                <Form.Check.Input
                  className={`form-check-input ${
                    !viewDetail
                      ? tuesdayDelivery
                        ? "borderGreen"
                        : !sundayDelivery &&
                            !mondayDelivery &&
                            !tuesdayDelivery &&
                            !wednesdayDelivery &&
                            !thursdayDelivery &&
                            !fridayDelivery &&
                            !saturdayDelivery
                          ? "borderRed"
                          : ""
                      : ""
                  }`}
                  type="checkbox"
                  name="tuesdayDelivery"
                  value={tuesdayDelivery}
                  checked={tuesdayDelivery}
                  disabled={viewDetail}
                  onChange={(e) => setTuesdayDelivery(e.target.checked)}
                />
                <span className="ps-2">Tuesday</span>
              </Form.Check>

              <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                <Form.Check.Input
                  className={`form-check-input ${
                    !viewDetail
                      ? wednesdayDelivery
                        ? "borderGreen"
                        : !sundayDelivery &&
                            !mondayDelivery &&
                            !tuesdayDelivery &&
                            !wednesdayDelivery &&
                            !thursdayDelivery &&
                            !fridayDelivery &&
                            !saturdayDelivery
                          ? "borderRed"
                          : ""
                      : ""
                  }`}
                  type="checkbox"
                  name="wednesdayDelivery"
                  value={wednesdayDelivery}
                  checked={wednesdayDelivery}
                  disabled={viewDetail}
                  onChange={(e) => setWednesdayDelivery(e.target.checked)}
                />
                <span className="ps-2">Wednesday</span>
              </Form.Check>

              <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                <Form.Check.Input
                  className={`form-check-input ${
                    !viewDetail
                      ? thursdayDelivery
                        ? "borderGreen"
                        : !sundayDelivery &&
                            !mondayDelivery &&
                            !tuesdayDelivery &&
                            !wednesdayDelivery &&
                            !thursdayDelivery &&
                            !fridayDelivery &&
                            !saturdayDelivery
                          ? "borderRed"
                          : ""
                      : ""
                  }`}
                  type="checkbox"
                  name="thursdayDelivery"
                  value={thursdayDelivery}
                  checked={thursdayDelivery}
                  disabled={viewDetail}
                  onChange={(e) => setThursdayDelivery(e.target.checked)}
                />
                <span className="ps-2">Thursday</span>
              </Form.Check>

              <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                <Form.Check.Input
                  className={`form-check-input ${
                    !viewDetail
                      ? fridayDelivery
                        ? "borderGreen"
                        : !sundayDelivery &&
                            !mondayDelivery &&
                            !tuesdayDelivery &&
                            !wednesdayDelivery &&
                            !thursdayDelivery &&
                            !fridayDelivery &&
                            !saturdayDelivery
                          ? "borderRed"
                          : ""
                      : ""
                  }`}
                  type="checkbox"
                  name="fridayDelivery"
                  value={fridayDelivery}
                  checked={fridayDelivery}
                  disabled={viewDetail}
                  onChange={(e) => setFridayDelivery(e.target.checked)}
                />
                <span className="ps-2">Friday</span>
              </Form.Check>

              <Form.Check /* className="form-check-fix-padding" */ type="checkbox">
                <Form.Check.Input
                  className={`form-check-input ${
                    !viewDetail
                      ? saturdayDelivery
                        ? "borderGreen"
                        : !sundayDelivery &&
                            !mondayDelivery &&
                            !tuesdayDelivery &&
                            !wednesdayDelivery &&
                            !thursdayDelivery &&
                            !fridayDelivery &&
                            !saturdayDelivery
                          ? "borderRed"
                          : ""
                      : ""
                  }`}
                  type="checkbox"
                  name="saturdayDelivery"
                  value={saturdayDelivery}
                  checked={saturdayDelivery}
                  disabled={viewDetail}
                  onChange={(e) => setSaturdayDelivery(e.target.checked)}
                />
                <span className="ps-2">Saturday</span>
              </Form.Check>
            </Col>
          </Form.Group>
        </Col>
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="form-group mt-4 align-items-center row  m-l-0 m-r-0">
            <Col xs={10} sm={10} className="p-0">
              <label className="col-form-label dealer-label p-0 m-b-10">
                Additional Text Added To Drivers Confirmation Email For Delivery Hours
              </label>
            </Col>

            <Col sm={10} xs={10} className="p-0">
              <textarea
                rows={10}
                cols={20}
                type="text"
                name="deliveryHours"
                value={deliveryHours}
                disabled={viewDetail}
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "210px",
                  minWidth: "500px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                onInput={(e) => setDeliveryHours(e.target.value)}
                className="customFormControl h-100 textarea-height "
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
            <Col xs={10} sm={10} className="p-0">
              <label className="col-form-label dealer-label p-0 m-b-10">
                Text Added To Drivers Confirmation Email For Delivery Information
              </label>
            </Col>

            <Col sm={10} xs={10} className="p-0">
              <textarea
                rows={10}
                cols={20}
                type="text"
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "210px",
                  minWidth: "500px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                name="deliveryNotes"
                value={deliveryNotes}
                disabled={viewDetail}
                onInput={(e) => setDeliveryNotes(e.target.value)}
                className="customFormControl h-100 textarea-height browser-height-fit "
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default DeliveryTab;
