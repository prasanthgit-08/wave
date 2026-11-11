import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerRatesData,
  setInvoiceLengthRate1,
  setInvoiceLengthRate2,
  setInvoiceLengthRate3,
  setIsTiersLengthTabValid,
  setUnitLength1,
  setUnitLength2,
  setUseLengthTiersReload,
  setUseLengthTiersReturns,
  setdriverLengthRate1,
  setdriverLengthRate2,
  setdriverLengthRate3,
} from "../../../../../../redux/CustomerRatesSlice";
const Length = () => {
  const dispatch = useDispatch();
  const editFormData = useSelector((state) => state.customerRatesReducer.editFormData);
  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
  const unitLength1 = useSelector((state) => state.customerRatesReducer.unitLength1);
  const unitLength2 = useSelector((state) => state.customerRatesReducer.unitLength2);
  const invoiceLengthRate1 = useSelector((state) => state.customerRatesReducer.invoiceLengthRate1);
  const driverLengthRate1 = useSelector((state) => state.customerRatesReducer.driverLengthRate1);
  const invoiceLengthRate2 = useSelector((state) => state.customerRatesReducer.invoiceLengthRate2);
  const driverLengthRate2 = useSelector((state) => state.customerRatesReducer.driverLengthRate2);
  const invoiceLengthRate3 = useSelector((state) => state.customerRatesReducer.invoiceLengthRate3);
  const driverLengthRate3 = useSelector((state) => state.customerRatesReducer.driverLengthRate3);
  const useLengthTiersReload = useSelector((state) => state.customerRatesReducer.useLengthTiersReload);
  const useLengthTiersReturns = useSelector((state) => state.customerRatesReducer.useLengthTiersReturns);
  const invoiceRates = useSelector((state) => state.customerRatesReducer.invoiceRates);
  const driverRates = useSelector((state) => state.customerRatesReducer.driverRates);
  const useLengthTiers = useSelector((state) => state.customerRatesReducer.useLengthTiers);
  const isTiersLengthTabValid = useSelector((state) => state.customerRatesReducer.isTiersLengthTabValid);
  const RateValidation = /^\d{0,6}(?:\.\d{0,4})?$/;
  /* View detail
   */
  useEffect(() => {
    setTimeout(() => {
      if (editFormData != null) {
        dispatch(setUnitLength1(editFormData?.unitLength1 === 0 ? "" : editFormData.unitLength1));
        dispatch(setUnitLength2(editFormData?.unitLength2 === 0 ? "" : editFormData.unitLength2));

        dispatch(
          setInvoiceLengthRate1(
            parseFloat(editFormData.invoiceLengthRate1) === 0 && editFormData.invoiceRates === false
              ? ""
              : Number.isInteger(editFormData?.invoiceLengthRate1)
                ? editFormData?.invoiceLengthRate1.toFixed(4)
                : editFormData?.invoiceLengthRate1
          )
        );

        dispatch(
          setInvoiceLengthRate2(
            editFormData?.invoiceLengthRate2 === 0
              ? ""
              : Number.isInteger(editFormData?.invoiceLengthRate2)
                ? editFormData?.invoiceLengthRate2.toFixed(4)
                : editFormData?.invoiceLengthRate2
          )
        );

        dispatch(
          setInvoiceLengthRate3(
            editFormData?.invoiceLengthRate3 === 0
              ? ""
              : Number.isInteger(editFormData?.invoiceLengthRate3)
                ? editFormData?.invoiceLengthRate3.toFixed(4)
                : editFormData?.invoiceLengthRate3
          )
        );

        dispatch(
          setdriverLengthRate1(
            editFormData.driverRates === false && parseFloat(editFormData.driverLengthRate1) === 0
              ? ""
              : Number.isInteger(editFormData?.driverLengthRate1)
                ? editFormData?.driverLengthRate1.toFixed(4)
                : editFormData?.driverLengthRate1
          )
        );
        dispatch(
          setdriverLengthRate2(
            editFormData?.driverLengthRate2 === 0
              ? ""
              : Number.isInteger(editFormData?.driverLengthRate2)
                ? editFormData?.driverLengthRate2.toFixed(4)
                : editFormData?.driverLengthRate2
          )
        );

        dispatch(
          setdriverLengthRate3(
            editFormData?.driverLengthRate3 === 0
              ? ""
              : Number.isInteger(editFormData?.driverLengthRate3)
                ? editFormData?.driverLengthRate3.toFixed(4)
                : editFormData?.driverLengthRate3
          )
        );
        dispatch(setUseLengthTiersReload(editFormData?.useLengthTiersReload));
        dispatch(setUseLengthTiersReturns(editFormData?.useLengthTiersReturns));
      }
    }, 50);
  }, [editFormData, viewDetail]);
  /* Setting Length Tab Form data for save operation
   */
  useEffect(() => {
    const lengthTabFormData = () => {
      dispatch(
        setCustomerRatesData({
          unitLength1: unitLength1,
          unitLength2: unitLength2,
          invoiceLengthRate1: invoiceLengthRate1,
          driverLengthRate1: driverLengthRate1,
          invoiceLengthRate2: invoiceLengthRate2,
          driverLengthRate2: driverLengthRate2,
          invoiceLengthRate3: invoiceLengthRate3,
          driverLengthRate3: driverLengthRate3,
          useLengthTiersReload: useLengthTiersReload,
          useLengthTiersReturns: useLengthTiersReturns,
        })
      );
    };
    lengthTabFormData();
  }, [
    unitLength1,
    unitLength2,
    invoiceLengthRate1,
    driverLengthRate1,
    invoiceLengthRate2,
    driverLengthRate2,
    invoiceLengthRate3,
    driverLengthRate3,
    useLengthTiersReload,
    useLengthTiersReturns,
  ]);
  /* 
  Length Tab Validation
 ***/
  useEffect(() => {
    const isLenCondition1Met =
      unitLength1 === "" ||
      parseInt(unitLength1) === 0 ||
      (unitLength2 !== "" && !isNaN(Number(unitLength2)) && Number(unitLength2) <= Number(unitLength1));

    const isLenCondition2Met =
      unitLength1 !== "" &&
      invoiceRates &&
      (invoiceLengthRate2 === "" || parseFloat(invoiceLengthRate2) === 0 || invoiceLengthRate2 === ".");

    const isLenCondition3Met =
      unitLength1 !== "" &&
      driverRates &&
      (driverLengthRate2 === "" || parseFloat(driverLengthRate2) === 0 || driverLengthRate2 === ".");

    const isLenCondition4Met =
      unitLength2 !== "" &&
      invoiceRates &&
      (invoiceLengthRate3 === "" || parseFloat(invoiceLengthRate3) === 0 || invoiceLengthRate3 === ".");

    const isLenCondition5Met =
      unitLength2 !== "" &&
      driverRates &&
      (driverLengthRate3 === "" || parseFloat(driverLengthRate3) === 0 || driverLengthRate3 === ".");

    const isLenCondition6Met = !invoiceRates && !driverRates && (unitLength1 || unitLength2);

    if (
      isLenCondition1Met ||
      isLenCondition2Met ||
      isLenCondition3Met ||
      isLenCondition4Met ||
      isLenCondition5Met ||
      isLenCondition6Met
    ) {
      dispatch(setIsTiersLengthTabValid(false));
    } else {
      dispatch(setIsTiersLengthTabValid(true));
    }
  }, [
    invoiceRates,
    driverRates,
    unitLength1,
    unitLength2,
    invoiceLengthRate2,
    driverLengthRate2,
    invoiceLengthRate3,
    driverLengthRate3,
  ]);
  /*clear states if invoice false*/
  useEffect(() => {
    if (!invoiceRates) {
      dispatch(setInvoiceLengthRate2(""));
      dispatch(setInvoiceLengthRate3(""));
    }
  }, [viewDetail, invoiceRates]);
  /*clear states if driverrate false*/
  useEffect(() => {
    if (!driverRates) {
      dispatch(setdriverLengthRate2(""));
      dispatch(setdriverLengthRate3(""));
    }
  }, [viewDetail, driverRates]);

  /*clear all states id uselength tiers is false*/
  useEffect(() => {
    if (!useLengthTiers) {
      dispatch(setUnitLength1(""));
      dispatch(setUnitLength2(""));
      dispatch(setInvoiceLengthRate2(""));
      dispatch(setInvoiceLengthRate3(""));
      dispatch(setdriverLengthRate2(""));
      dispatch(setdriverLengthRate3(""));
      dispatch(setUseLengthTiersReload(""));
      dispatch(setUseLengthTiersReturns(""));
    }
  }, [useLengthTiers]);
  /*Function to clear InvoiceLengthRate3 and DriverLengthRate3*/
  const clearRatesOnUnitLength2 = () => {
    if (!unitLength2) {
      dispatch(setInvoiceLengthRate3(""));
      dispatch(setdriverLengthRate3(""));
    }
  };
  const isNumber = (value) => {
    if (!value) return value;
    const number = value?.replace(/[^\d:.]/g, "");
    if (value) return number;
  };
  const isDays = (value) => {
    if (!value) return value;
    const days = value?.replace(/[^\d]/g, "");
    if (value) return days;
  };
  return (
    <div className="p-1 w-100">
      <Row className="m-0 p-0">
        <Col sm={8} md={8} lg={8} xl={8} xs={8} className=" pe-0">
          <Form.Group className="mt-3 justify-content- align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0 w-10px">
              <Form.Label className="customColFormLabel">Length</Form.Label>
            </Col>
            {/* Length1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px mx-4">
              <input
                type="text"
                name="unitLength1"
                id="unitLength1"
                value={unitLength1}
                onInput={(e) => {
                  dispatch(setUnitLength1(isDays(e.target.value)));
                }}
                className={`customFormControl ${
                  viewDetail || !useLengthTiers
                    ? "borderBlack"
                    : unitLength1 && unitLength1 > 0 && unitLength1 <= 32767
                      ? "borderGreen"
                      : "borderRed"
                }`}
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={8}
                disabled={viewDetail || !useLengthTiers}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px" />
            {/* Length2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px mx-4">
              <input
                type="text"
                name="unitLength2"
                value={unitLength2}
                onBlur={(e) => clearRatesOnUnitLength2()}
                onInput={(e) => {
                  dispatch(setUnitLength2(isDays(e.target.value)));
                }}
                className={`customFormControl ${
                  viewDetail ||
                  !useLengthTiers ||
                  ((unitLength1 === "" || unitLength2 === "") &&
                    ((invoiceRates && !invoiceLengthRate3) || (driverRates && !driverLengthRate3)))
                    ? "borderBlack"
                    : unitLength2 > 32767 || Number(unitLength2) <= Number(unitLength1)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                maxLength={8}
                autoComplete="newpassword"
                aria-autocomplete="none"
                disabled={viewDetail || !useLengthTiers}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 justify-content- align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="customColFormLabel">Add To Invoice Rate</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                hidden
                type="text"
                id="invoiceLengthRate1"
                name="invoiceLengthRate1"
                value={invoiceLengthRate1}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceLengthRate1(isNumber(e.target.value)));
                }}
                className={`customFormControl ${
                  !viewDetail && useLengthTiers
                    ? !invoiceRates
                      ? ""
                      : invoiceLengthRate1 && invoiceLengthRate1 !== "."
                        ? "borderGreen"
                        : "borderRed"
                    : ""
                }`}
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={10}
                disabled={viewDetail || !invoiceRates || !useLengthTiers}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-15px mx-4" />
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="text"
                id="invoiceLengthRate2"
                name="invoiceLengthRate2"
                value={invoiceLengthRate2}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceLengthRate2(isNumber(e.target.value)));
                }}
                className={`customFormControl ${
                  !viewDetail && useLengthTiers
                    ? !invoiceRates
                      ? ""
                      : invoiceLengthRate2 && invoiceLengthRate2 > 0 && invoiceLengthRate2 !== "."
                        ? "borderGreen"
                        : "borderRed"
                    : ""
                }`}
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={10}
                disabled={viewDetail || !invoiceRates || !useLengthTiers}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px mx-4" />
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="text"
                id="invoiceLengthRate3"
                name="invoiceLengthRate3"
                value={invoiceLengthRate3}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceLengthRate3(isNumber(e.target.value)));
                }}
                className={`customFormControl ${
                  !useLengthTiers || viewDetail || !invoiceRates || (!unitLength2 && !invoiceLengthRate3)
                    ? "borderBlack"
                    : invoiceLengthRate3 === "" ||
                        parseFloat(invoiceLengthRate3) === 0 ||
                        invoiceLengthRate3 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={10}
                disabled={
                  viewDetail || (!unitLength2 && !invoiceLengthRate3) || !invoiceRates || !useLengthTiers
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 justify-content- align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="customColFormLabel">Add To Driver Rate</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                hidden
                type="text"
                name="driverLengthRate1"
                id="driverLengthRate1"
                value={driverLengthRate1}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setdriverLengthRate1(isNumber(e.target.value)));
                }}
                className={`customFormControl ${
                  !viewDetail && useLengthTiers
                    ? !driverRates
                      ? ""
                      : driverLengthRate1 && driverLengthRate1 !== "."
                        ? "borderGreen"
                        : "borderRed"
                    : ""
                }`}
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={10}
                disabled={viewDetail || !driverRates || !useLengthTiers}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-15px mx-4" />
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="text"
                name="driverLengthRate2"
                id="driverLengthRate2"
                value={driverLengthRate2}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setdriverLengthRate2(isNumber(e.target.value)));
                }}
                className={`customFormControl ${
                  !viewDetail && useLengthTiers
                    ? !driverRates
                      ? ""
                      : driverLengthRate2 && driverLengthRate2 > 0
                        ? "borderGreen"
                        : "borderRed"
                    : ""
                }`}
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={10}
                disabled={viewDetail || !driverRates || !useLengthTiers}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px mx-4" />
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="text"
                name="driverLengthRate3"
                id="driverLengthRate3"
                value={driverLengthRate3}
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setdriverLengthRate3(isNumber(e.target.value)));
                }}
                className={`customFormControl ${
                  !useLengthTiers || viewDetail || !driverRates || (!unitLength2 && !driverLengthRate3)
                    ? "borderBlack"
                    : driverLengthRate3 === "" ||
                        parseFloat(driverLengthRate3) === 0 ||
                        driverLengthRate3 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={10}
                disabled={
                  viewDetail || (!unitLength2 && !driverLengthRate3) || !driverRates || !useLengthTiers
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0 w-10px">
              <Form.Label className="customColFormLabel">Use On Reloads</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-1" style={{ marginLeft: "15px" }}>
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="useLengthTiersReload"
                id="useLengthTiersReload"
                onChange={(e) => {
                  dispatch(setUseLengthTiersReload(e.target.checked));
                }}
                checked={useLengthTiersReload}
                disabled={viewDetail || !useLengthTiers}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0 w-10px">
              <Form.Label className="customColFormLabel">Use On Returns</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-1" style={{ marginLeft: "15px" }}>
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="useLengthTiersReturns"
                id="useLengthTiersReturns"
                onChange={(e) => {
                  dispatch(setUseLengthTiersReturns(e.target.checked));
                }}
                checked={useLengthTiersReturns}
                disabled={viewDetail || !useLengthTiers}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Length;
