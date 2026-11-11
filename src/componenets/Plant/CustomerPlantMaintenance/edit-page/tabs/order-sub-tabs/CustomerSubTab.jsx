import React, { useEffect, useState, useRef } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import { Form, Col, Row } from "react-bootstrap";
import {
  setIsCustomerOrderTabValid,
  setOrderPlantCodeNew,
  setPlantFormData,
} from "../../../../../../redux/CustomerPlantMaintenanceSlice";
const CustomerSubTab = () => {
  const dispatch = useDispatch();
  const [orderPlantCode, setOrderPlantCode] = useState("");
  const [order, setOrder] = useState("");
  const [orderMotorized, setOrderMotorized] = useState(false);
  const [orderTowable, setOrderTowable] = useState(false);
  const [orderDecodeVin, setOrderDecodeVin] = useState("");
  const [orderUnitNumberPrefix, setOrderUnitNumberPrefix] = useState("");
  const [orderVinPrefix1, setOrderVinPrefix1] = useState("");
  const [orderPlantPosition1, setOrderPlantPOsition1] = useState("");
  const [orderPlantCharacter1, setOrderPlantCharacter1] = useState("");
  const [orderVinPrefix2, setOrderVinPrefix2] = useState("");
  const [orderPlantPosition2, setOrderPlantPOsition2] = useState("");
  const [orderPlantCharacter2, setOrderPlantCharacter2] = useState("");
  const [orderVinPrefix3, setOrderVinPrefix3] = useState("");
  const [orderPlantPosition3, setOrderPlantPOsition3] = useState("");
  const [orderPlantCharacter3, setOrderPlantCharacter3] = useState("");
  const [orderVinPrefix4, setOrderVinPrefix4] = useState("");
  const [orderPlantPosition4, setOrderPlantPOsition4] = useState("");
  const [orderPlantCharacter4, setOrderPlantCharacter4] = useState("");
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  const IsCustomerOrderTabValid = useSelector(
    (state) => state.customerPlantmaintanceReducer.IsCustomerOrderTabValid
  );
  useEffect(() => {
    if (editPlantData !== null) {
      setOrderPlantCode(editPlantData?.ordersPlantCode ? editPlantData?.ordersPlantCode : "");
      setOrderTowable(editPlantData?.ordersTowable != null ? editPlantData?.ordersTowable : "");
      setOrderMotorized(editPlantData?.ordersMotorized != null ? editPlantData?.ordersMotorized : "");
      setOrderUnitNumberPrefix(
        editPlantData?.ordersUnitNumberPrefix != null ? editPlantData?.ordersUnitNumberPrefix : ""
      );
      setOrderDecodeVin(editPlantData?.ordersVINDecoder != null ? editPlantData?.ordersVINDecoder : "");
      setOrderVinPrefix1(editPlantData?.ordersVINPrefix1 != null ? editPlantData?.ordersVINPrefix1 : "");

      setOrderPlantCharacter1(
        editPlantData?.ordersVINPlantCharacters1 != null ? editPlantData?.ordersVINPlantCharacters1 : ""
      );
      setOrderVinPrefix2(editPlantData?.ordersVINPrefix2 != null ? editPlantData?.ordersVINPrefix2 : "");

      setOrderPlantCharacter2(
        editPlantData?.ordersVINPlantCharacters2 != null ? editPlantData?.ordersVINPlantCharacters2 : ""
      );
      setOrderVinPrefix3(editPlantData?.ordersVINPrefix3 != null ? editPlantData?.ordersVINPrefix3 : "");

      setOrderPlantCharacter3(
        editPlantData?.ordersVINPlantCharacters3 != null ? editPlantData?.ordersVINPlantCharacters3 : ""
      );
      setOrderVinPrefix4(editPlantData?.ordersVINPrefix4 != null ? editPlantData?.ordersVINPrefix4 : "");

      setOrderPlantCharacter4(
        editPlantData?.ordersVINPlantCharacters4 != null ? editPlantData?.ordersVINPlantCharacters4 : ""
      );

      if (editPlantData?.ordersVINDecoder === false) {
        setOrderPlantPOsition1("");
        setOrderPlantPOsition2("");
        setOrderPlantPOsition3("");
        setOrderPlantPOsition4("");
      } else {
        setOrderPlantPOsition1(
          editPlantData?.ordersVINPlantPosition1 != null ? editPlantData?.ordersVINPlantPosition1 : ""
        );
        setOrderPlantPOsition2(
          editPlantData?.ordersVINPlantPosition2 != null ? editPlantData?.ordersVINPlantPosition2 : ""
        );
        setOrderPlantPOsition3(
          editPlantData?.ordersVINPlantPosition3 != null ? editPlantData?.ordersVINPlantPosition3 : ""
        );
        setOrderPlantPOsition4(
          editPlantData?.ordersVINPlantPosition4 != null ? editPlantData?.ordersVINPlantPosition4 : ""
        );

        if (editPlantData?.ordersVINPlantPosition2 === 0) {
          setOrderPlantPOsition2("");
        } else {
          setOrderPlantPOsition2(
            editPlantData?.ordersVINPlantPosition2 != null ? editPlantData?.ordersVINPlantPosition2 : ""
          );
        }

        if (editPlantData?.ordersVINPlantPosition3 === 0) {
          setOrderPlantPOsition3("");
        } else {
          setOrderPlantPOsition3(
            editPlantData?.ordersVINPlantPosition3 != null ? editPlantData?.ordersVINPlantPosition3 : ""
          );
        }
        if (editPlantData?.ordersVINPlantPosition4 === 0) {
          setOrderPlantPOsition4("");
        } else {
          setOrderPlantPOsition4(
            editPlantData?.ordersVINPlantPosition4 != null ? editPlantData?.ordersVINPlantPosition4 : ""
          );
        }
      }
    }
  }, [editPlantData, viewDetail]);

  const customerSubTab = () => {
    dispatch(
      setPlantFormData({
        ordersPlantCode: orderPlantCode,
        ordersMotorized: orderMotorized,
        ordersTowable: orderTowable,
        ordersUnitNumberPrefix: orderUnitNumberPrefix,
        ordersVINDecoder: orderDecodeVin,
        ordersVINPrefix1: orderVinPrefix1,
        ordersVINPrefix2: orderVinPrefix2,
        ordersVINPrefix3: orderVinPrefix3,
        ordersVINPrefix4: orderVinPrefix4,
        ordersVINPlantPosition1: orderPlantPosition1,
        ordersVINPlantPosition2: orderPlantPosition2,
        ordersVINPlantPosition3: orderPlantPosition3,
        ordersVINPlantPosition4: orderPlantPosition4,
        ordersVINPlantCharacters1: orderPlantCharacter1,
        ordersVINPlantCharacters2: orderPlantCharacter2,
        ordersVINPlantCharacters3: orderPlantCharacter3,
        ordersVINPlantCharacters4: orderPlantCharacter4,
      })
    );
  };
  useEffect(() => {
    customerSubTab();
  }, [
    orderPlantCode,
    orderMotorized,
    orderTowable,
    orderUnitNumberPrefix,
    orderDecodeVin,
    orderVinPrefix1,
    orderVinPrefix2,
    orderVinPrefix3,
    orderVinPrefix4,
    orderPlantPosition1,
    orderPlantPosition2,
    orderPlantPosition3,
    orderPlantPosition4,
    orderPlantCharacter1,
    orderPlantCharacter2,
    orderPlantCharacter3,
    orderPlantCharacter4,
  ]);

  useEffect(() => {
    dispatch(setOrderPlantCodeNew(orderPlantCode));
  }, [orderPlantCode]);
  useEffect(() => {
    if (orderPlantCode === "") {
      setOrderMotorized(false);
      setOrderTowable(false);
      setOrderUnitNumberPrefix("");
      setOrderDecodeVin(false);
    }
  }, [orderPlantCode]);
  const isCharacter = (value) => {
    if (!value) return value;

    const num = value.replace(/[^\A-Za-z0-9]/g, "");

    if (value) return num;
  };
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");

    if (value) return number;
  };
  const isCharacterUnitPrefix = (value) => {
    if (!value) return value;
    const newValue = value.replace(/[ ^[a-zA-Z]{3}[a-zA-Z-]$/, "");

    if (value) return newValue;
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    const pattern = /^[a-zA-Z]{0,3}[a-zA-Z-]?$/;

    if (!pattern.test(newValue)) {
      return;
    }

    setOrderUnitNumberPrefix(newValue);
  };
  //CLEARING FIELDS
  useEffect(() => {
    if (orderDecodeVin === false) {
      setOrderVinPrefix1("");
      setOrderVinPrefix2("");
      setOrderVinPrefix3("");
      setOrderVinPrefix4("");
      setOrderPlantPOsition1("");
      setOrderPlantPOsition2("");
      setOrderPlantPOsition3("");
      setOrderPlantPOsition4("");
      setOrderPlantCharacter1("");
      setOrderPlantCharacter2("");
      setOrderPlantCharacter3("");
      setOrderPlantCharacter4("");
    }
  }, [orderDecodeVin]);
  useEffect(() => {
    if (orderVinPrefix2 === "" && orderPlantCharacter2 == "" && orderPlantPosition2 === "") {
      setOrderVinPrefix3("");
      setOrderVinPrefix4("");

      setOrderPlantPOsition3("");
      setOrderPlantPOsition4("");

      setOrderPlantCharacter3("");
      setOrderPlantCharacter4("");
    }
  }, [orderVinPrefix2, orderPlantCharacter2, orderPlantPosition2]);
  useEffect(() => {
    if (orderVinPrefix3 === "" && orderPlantCharacter3 == "" && orderPlantPosition3 === "") {
      setOrderVinPrefix4("");

      setOrderPlantPOsition4("");

      setOrderPlantCharacter4("");
    }
  }, [orderVinPrefix3, orderPlantCharacter3, orderPlantPosition3]);
  useEffect(() => {
    if (
      orderPlantCode == "" ||
      (orderPlantCode != "" &&
        (orderTowable || orderMotorized) &&
        (!orderDecodeVin ||
          (orderDecodeVin &&
            orderVinPrefix1 !== "" &&
            orderPlantCharacter1 != "" &&
            orderPlantPosition1 != "" &&
            orderPlantPosition1 >= 1 &&
            orderPlantPosition1 <= 21 &&
            ((orderVinPrefix2 == "" && orderPlantPosition2 == "" && orderPlantCharacter2 === "") ||
              (orderVinPrefix2 != "" &&
                orderPlantCharacter2 != "" &&
                orderPlantPosition2 != "" &&
                orderPlantPosition2 >= 1 &&
                orderPlantPosition2 <= 21)) &&
            ((orderVinPrefix3 == "" && orderPlantPosition3 == "" && orderPlantCharacter3 === "") ||
              (orderVinPrefix3 != "" &&
                orderPlantCharacter3 != "" &&
                orderPlantPosition3 != "" &&
                orderPlantPosition3 >= 1 &&
                orderPlantPosition3 <= 21)) &&
            ((orderVinPrefix4 == "" && orderPlantPosition4 == "" && orderPlantCharacter4 === "") ||
              (orderVinPrefix4 != "" &&
                orderPlantCharacter4 != "" &&
                orderPlantPosition4 != "" &&
                orderPlantPosition4 >= 1 &&
                orderPlantPosition4 <= 21)))))
    ) {
      dispatch(setIsCustomerOrderTabValid(true));
    } else {
      dispatch(setIsCustomerOrderTabValid(false));
    }
  }, [
    orderPlantCode,
    orderMotorized,
    orderTowable,
    orderPlantPosition1,
    orderPlantCharacter1,
    orderDecodeVin,
    orderVinPrefix1,
    orderPlantCharacter2,
    orderPlantPosition2,
    orderVinPrefix2,
    orderPlantCharacter3,
    orderPlantCharacter4,
    orderPlantPosition3,
    orderPlantPosition4,
    orderVinPrefix3,
    orderVinPrefix4,
  ]);

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plant Code</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                id="orderPlantCode"
                name="orderPlantCode"
                type="orderPlantCode"
                value={orderPlantCode}
                maxLength={30}
                disabled={viewDetail}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderPlantCode(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Motorized</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-92px">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${
                  !viewDetail
                    ? orderMotorized
                      ? ""
                      : !orderMotorized && !orderTowable && orderPlantCode != ""
                        ? "borderRed"
                        : ""
                    : ""
                }`}
                name="orderMotorized"
                value={orderMotorized}
                checked={orderMotorized}
                disabled={viewDetail || orderPlantCode === "" || orderTowable}
                onChange={(e) => setOrderMotorized(e.target.checked)}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Towable</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-92px">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${
                  !viewDetail
                    ? orderTowable
                      ? ""
                      : !orderMotorized && !orderTowable && orderPlantCode != ""
                        ? "borderRed"
                        : ""
                    : ""
                }`}
                name="orderTowable"
                value={orderTowable}
                checked={orderTowable}
                disabled={viewDetail || orderPlantCode == "" || orderMotorized}
                onChange={(e) => setOrderTowable(e.target.checked)}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Unit Number Prefix</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-60px">
              <input
                className={`customFormControl`}
                id="orderUnitNumberPrefix"
                name="orderUnitNumberPrefix"
                type="orderUnitNumberPrefix"
                value={orderUnitNumberPrefix.toUpperCase()}
                maxLength={4}
                disabled={viewDetail || !orderPlantCode}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Decode VIN</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-92px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="orderDecodeVin"
                value={orderDecodeVin}
                checked={orderDecodeVin}
                disabled={viewDetail || !orderPlantCode}
                onChange={(e) => setOrderDecodeVin(e.target.checked)}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">VIN Prefix #1</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderVinPrefix1 == "" && orderDecodeVin != ""
                      ? "borderRed"
                      : orderVinPrefix1 !== ""
                        ? "borderGreen"
                        : ""
                }`}
                id="orderVinPrefix1"
                name="orderVinPrefix1"
                type="orderVinPrefix1"
                value={orderVinPrefix1.toUpperCase()}
                maxLength={3}
                disabled={viewDetail || !orderDecodeVin}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderVinPrefix1(isCharacter(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plant Position</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-40px">
              <input
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : (orderPlantPosition1 == "" && orderDecodeVin != "") ||
                        (orderPlantPosition1 !== "" && orderPlantPosition1 < 1) ||
                        orderPlantPosition1 > 21
                      ? "borderRed"
                      : orderPlantPosition1 !== ""
                        ? // &&orderPlantPosition1 <= 1 &&
                          //   orderPlantPosition1 >= 21
                          "borderGreen"
                        : ""
                }`}
                id="orderPlantPosition1"
                name="orderPlantPosition1"
                type="orderPlantPosition1"
                value={orderPlantPosition1}
                maxLength={2}
                disabled={viewDetail || !orderDecodeVin}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderPlantPOsition1(isNumber(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plant Characters</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                id="orderPlantCharacter1"
                name="orderPlantCharacter1"
                type="orderPlantCharacter1"
                value={orderPlantCharacter1.toUpperCase()}
                maxLength={30}
                disabled={viewDetail || !orderDecodeVin}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderPlantCharacter1(isCharacter(e.target.value));
                }}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderPlantCharacter1 == "" && orderDecodeVin != ""
                      ? "borderRed"
                      : orderPlantCharacter1 !== ""
                        ? "borderGreen"
                        : ""
                }`}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">VIN Prefix #2</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-60px">
              <input
                id="orderVinPrefix2"
                name="orderVinPrefix2"
                type="orderVinPrefix2"
                value={orderVinPrefix2.toUpperCase()}
                maxLength={3}
                disabled={viewDetail || !orderDecodeVin}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderVinPrefix2(isCharacter(e.target.value));
                }}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderVinPrefix2 == "" &&
                        orderDecodeVin != "" &&
                        (orderPlantPosition2 != "" || orderPlantCharacter2 != "")
                      ? "borderRed"
                      : orderVinPrefix2 !== ""
                        ? ""
                        : ""
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plant Position</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-40px">
              <input
                id="orderPlantPosition2"
                name="orderPlantPosition2"
                type="orderPlantPosition2"
                value={orderPlantPosition2}
                maxLength={2}
                disabled={viewDetail || !orderDecodeVin}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderPlantPOsition2(isNumber(e.target.value));
                }}

                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderVinPrefix2 == null || orderVinPrefix2 === ""
                      ? "" // no border if prefix is null or empty
                      : (orderPlantPosition2 === "" &&
                            orderDecodeVin !== "" &&
                            (orderVinPrefix2 !== "" || orderPlantCharacter2 !== "")) ||
                          (orderPlantPosition2 !== "" && orderPlantPosition2 < 1) ||
                          orderPlantPosition2 > 21
                        ? "borderRed"
                        : "borderGreen"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plant Characters</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                id="orderPlantCharacter2"
                name="orderPlantCharacter2"
                type="orderPlantCharacter2"
                value={orderPlantCharacter2.toUpperCase()}
                maxLength={30}
                disabled={viewDetail || !orderDecodeVin}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderPlantCharacter2(isCharacter(e.target.value));
                }}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderPlantCharacter2 == "" &&
                        orderDecodeVin != "" &&
                        (orderVinPrefix2 != "" || orderPlantPosition2 != "")
                      ? "borderRed"
                      : orderPlantCharacter2 !== ""
                        ? "borderGreen"
                        : ""
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">VIN Prefix #3</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-60px">
              <input
                id="orderVinPrefix3"
                name="orderVinPrefix3"
                type="orderVinPrefix3"
                value={orderVinPrefix3.toUpperCase()}
                maxLength={3}
                disabled={
                  viewDetail ||
                  (orderVinPrefix2 == "" && orderPlantCharacter2 == "" && orderPlantPosition2 == "")
                }
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderVinPrefix3(isCharacter(e.target.value));
                }}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderVinPrefix3 == "" &&
                        orderDecodeVin != "" &&
                        (orderPlantPosition3 != "" || orderPlantCharacter3 != "")
                      ? "borderRed"
                      : orderVinPrefix3 !== ""
                        ? ""
                        : ""
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plant Position</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-40px">
              <input
                id="orderPlantPosition3"
                name="orderPlantPosition3"
                type="orderPlantPosition3"
                value={orderPlantPosition3}
                maxLength={2}
                disabled={
                  viewDetail ||
                  (orderVinPrefix2 == "" && orderPlantCharacter2 == "" && orderPlantPosition2 == "")
                }
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderPlantPOsition3(isNumber(e.target.value));
                }}

                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderVinPrefix3 == null || orderVinPrefix3 === ""
                      ? "" // no border if prefix is null or empty
                      : (orderPlantPosition3 === "" &&
                            orderDecodeVin !== "" &&
                            (orderVinPrefix3 !== "" || orderPlantCharacter3 !== "")) ||
                          (orderPlantPosition3 !== "" && orderPlantPosition3 < 1) ||
                          orderPlantPosition3 > 21
                        ? "borderRed"
                        : "borderGreen"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plant Characters</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                id="orderPlantCharacter3"
                name="orderPlantCharacter3"
                type="orderPlantCharacter3"
                value={orderPlantCharacter3.toUpperCase()}
                maxLength={30}
                disabled={
                  viewDetail ||
                  (orderVinPrefix2 == "" && orderPlantCharacter2 == "" && orderPlantPosition2 == "")
                }
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderPlantCharacter3(isCharacter(e.target.value));
                }}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderPlantCharacter3 == "" &&
                        orderDecodeVin != "" &&
                        (orderVinPrefix3 != "" || orderPlantPosition3 != "")
                      ? "borderRed"
                      : orderPlantCharacter3 !== ""
                        ? "borderGreen"
                        : ""
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">VIN Prefix #4</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                id="orderVinPrefix4"
                name="orderVinPrefix4"
                type="orderVinPrefix4"
                value={orderVinPrefix4.toUpperCase()}
                maxLength={3}
                disabled={
                  viewDetail ||
                  (orderVinPrefix3 == "" && orderPlantCharacter3 == "" && orderPlantPosition3 == "")
                }
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderVinPrefix4(isCharacter(e.target.value));
                }}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderVinPrefix4 == "" &&
                        orderDecodeVin != "" &&
                        (orderPlantPosition4 != "" || orderPlantCharacter4 != "")
                      ? "borderRed"
                      : orderVinPrefix4 !== ""
                        ? ""
                        : ""
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plant Position</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-40px">
              <input
                id="orderPlantPosition4"
                name="orderPlantPosition4"
                type="orderPlantPosition4"
                value={orderPlantPosition4}
                maxLength={2}
                disabled={
                  viewDetail ||
                  (orderVinPrefix3 == "" && orderPlantCharacter3 == "" && orderPlantPosition3 == "")
                }
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderPlantPOsition4(isNumber(e.target.value));
                }}

                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : (orderPlantPosition4 == "" &&
                          orderDecodeVin != "" &&
                          (orderVinPrefix4 != "" || orderPlantCharacter4 != "")) ||
                        (orderPlantPosition4 !== "" && orderPlantPosition4 < 1) ||
                        orderPlantPosition4 > 21
                      ? "borderRed"
                      : orderPlantPosition4 !== "" &&
                          orderPlantPosition4 >= 1 &&
                          orderPlantPosition4 <= 21 &&
                          orderVinPrefix4 !== null &&
                          orderVinPrefix4 !== ""
                        ? "borderGreen"
                        : ""
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plant Characters</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                id="orderPlantCharacter4"
                name="orderPlantCharacter4"
                type="orderPlantCharacter4"
                value={orderPlantCharacter4.toUpperCase()}
                maxLength={30}
                disabled={
                  viewDetail ||
                  (orderVinPrefix3 == "" && orderPlantCharacter3 == "" && orderPlantPosition3 == "")
                }
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setOrderPlantCharacter4(isCharacter(e.target.value));
                }}
                className={`customFormControl ${
                  viewDetail === true
                    ? ""
                    : orderPlantCharacter4 == "" &&
                        orderDecodeVin != "" &&
                        (orderVinPrefix4 != "" || orderPlantPosition4 != "")
                      ? "borderRed"
                      : orderPlantCharacter4 !== ""
                        ? "borderGreen"
                        : ""
                }`}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerSubTab;
