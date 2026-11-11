import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import {
  /*customer invoice percentage*/
  setCustomerInvoicePercentage,
  setCustomerRatePK,
  setInvoiceRates,
  setDriverRates,
  setUseMilageTiers,
  setFlatRateTiers,
  setUseLengthTiers,
  setNumberOfUnitsMinimum,
  setNumberOfUnitsMaximum,
  setOutboundInvoiceRate,
  setReloadInvoiceRate,
  setReturnInvoiceRate,
  setOutboundDriverRate,
  setReloadDriverRate,
  setReturnDriverRate,
  setAllowLongUnitRate,
  setOneOfMany,

  /*Tab Validation*/
  setCustomerRatesData,
  setIsGeneralTabValid,
  setCustomerId,
  setCustomerFK,
  setCustomerInput,
  setCustomerPlantInput,
  setCustomerPlantGroupId,
  setCustomerPlantGroupInput,
  setCustomerGroupId,
  setCustomerGroupInput,
  setCustomerPlantId,
  setCustomerUnitTypeGroupId,
  setCustomerUnitTypeGroupInput,
  setIsTiersMileageTabValid,
} from "../../../../../redux/CustomerRatesSlice";
import CustomerRatesService from "../../../../../services/CustomerRatesService";
import CustomerService from "../../../../../services/CustomerService";
import { useNavigate, useParams } from "react-router-dom";

const GeneralTab = () => {
  /*Dispatch*/
  const dispatch = useDispatch();
  const params = useParams();
  const ratePK = params.customerRatePK;
  const currentURL = window.location.pathname;
  const navigate = useNavigate();

  /*  //Redux States
  //Common */
  const customerRatePK = useSelector((state) => state.customerRatesReducer.customerRatePK);
  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerRatesReducer.editFormData);
  const customerInput = useSelector((state) => state.customerRatesReducer.customerInput);
  const customerFK = useSelector((state) => state.customerRatesReducer.customerFK);
  const customerInvoicePercentage = useSelector(
    (state) => state.customerRatesReducer.customerInvoicePercentage
  );

  const customerPlantInput = useSelector((state) => state.customerRatesReducer.customerPlantInput);
  const customerPlantGroupInput = useSelector((state) => state.customerRatesReducer.customerPlantGroupInput);
  const customerGroupInput = useSelector((state) => state.customerRatesReducer.customerGroupInput);
  const customerUnitTypeGroupInput = useSelector(
    (state) => state.customerRatesReducer.customerUnitTypeGroupInput
  );
  /*General Tab Details*/
  const invoiceRates = useSelector((state) => state.customerRatesReducer.invoiceRates);
  const driverRates = useSelector((state) => state.customerRatesReducer.driverRates);
  const useMilageTiers = useSelector((state) => state.customerRatesReducer.useMilageTiers);
  const flatRateTiers = useSelector((state) => state.customerRatesReducer.flatRateTiers);
  const useLengthTiers = useSelector((state) => state.customerRatesReducer.useLengthTiers);
  const numberOfUnitsMinimum = useSelector((state) => state.customerRatesReducer.numberOfUnitsMinimum);
  const numberOfUnitsMaximum = useSelector((state) => state.customerRatesReducer.numberOfUnitsMaximum);
  const outboundInvoiceRate = useSelector((state) => state.customerRatesReducer.outboundInvoiceRate);
  const reloadInvoiceRate = useSelector((state) => state.customerRatesReducer.reloadInvoiceRate);
  const returnInvoiceRate = useSelector((state) => state.customerRatesReducer.returnInvoiceRate);
  const outBoundDriverRate = useSelector((state) => state.customerRatesReducer.outBoundDriverRate);
  const reloadDriverRate = useSelector((state) => state.customerRatesReducer.reloadDriverRate);
  const returnDriverRate = useSelector((state) => state.customerRatesReducer.returnDriverRate);
  const allowLongUnitRate = useSelector((state) => state.customerRatesReducer.allowLongUnitRate);
  const oneOfMany = useSelector((state) => state.customerRatesReducer.oneOfMany);
  /*which one*/
  const customerId = useSelector((state) => state.customerRatesReducer.customerId);
  const customerPlantId = useSelector((state) => state.customerRatesReducer.customerPlantId);
  const customerPlantGroupId = useSelector((state) => state.customerRatesReducer.customerPlantGroupId);
  const customerGroupId = useSelector((state) => state.customerRatesReducer.customerGroupId);
  const customerUnitTypeGroupId = useSelector((state) => state.customerRatesReducer.customerUnitTypeGroupId);
  /*field color*/
  const isCustomerRateLoading = useSelector((state) => state.customerRatesReducer.isCustomerRateLoading);

  /*Get Customer Invoice Percentage*/
  const getCustomerInfo = (customerFK) => {
    if (customerFK) {
      CustomerService.getCustomerById(customerFK)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerInvoicePercentage(data?.invoicePercentage / 100));
        })
        .catch((error) => {});
    }
  };
  /*Get Customer Invoice Percentage by customer group*/
  const getCustomerInfoByCustomerGroupFK = (customerGroupId) => {
    if (customerGroupId) {
      CustomerRatesService.getCustomerInfoByCustomerGroupFK(customerGroupId)
        .then((response) => {
          const data = response?.data;
          const invoicePercentage = data;
          if (invoicePercentage !== null && invoicePercentage !== undefined) {
            dispatch(setCustomerInvoicePercentage(invoicePercentage));
          }
        })
        .catch((error) => {});
    }
  };
  /*   General Tab Validation
   */
  useEffect(() => {
    const isCondition1Met =
      (invoiceRates &&
        !driverRates &&
        outboundInvoiceRate &&
        parseFloat(outboundInvoiceRate) !== 0 &&
        outboundInvoiceRate !== "." &&
        reloadInvoiceRate &&
        parseFloat(reloadInvoiceRate) !== 0 &&
        reloadInvoiceRate !== "." &&
        returnInvoiceRate &&
        parseFloat(returnInvoiceRate) !== 0 &&
        returnInvoiceRate !== ".") ||
      (driverRates &&
        !invoiceRates &&
        outBoundDriverRate &&
        parseFloat(outBoundDriverRate) !== 0 &&
        outBoundDriverRate !== "." &&
        reloadDriverRate &&
        parseFloat(reloadDriverRate) !== 0 &&
        reloadDriverRate !== "." &&
        returnDriverRate &&
        parseFloat(returnDriverRate) !== 0 &&
        returnDriverRate !== ".");

    const isCondition2Met =
      invoiceRates &&
      driverRates &&
      outboundInvoiceRate &&
      parseFloat(outboundInvoiceRate) !== 0 &&
      outboundInvoiceRate !== "." &&
      reloadInvoiceRate &&
      parseFloat(reloadInvoiceRate) !== 0 &&
      reloadInvoiceRate !== "." &&
      returnInvoiceRate &&
      parseFloat(returnInvoiceRate) !== 0 &&
      returnInvoiceRate !== "." &&
      outBoundDriverRate &&
      parseFloat(outBoundDriverRate) !== 0 &&
      outBoundDriverRate !== "." &&
      Number(outBoundDriverRate) <= Number(outboundInvoiceRate * customerInvoicePercentage) &&
      reloadDriverRate &&
      parseFloat(reloadDriverRate) !== 0 &&
      reloadDriverRate !== "." &&
      Number(reloadDriverRate) <= Number(reloadInvoiceRate * customerInvoicePercentage) &&
      returnDriverRate &&
      parseFloat(returnDriverRate) !== 0 &&
      returnDriverRate !== "." &&
      Number(returnDriverRate) <= Number(returnInvoiceRate * customerInvoicePercentage);

    const isCondition3Met =
      useMilageTiers &&
      !outboundInvoiceRate &&
      !reloadInvoiceRate &&
      !returnInvoiceRate &&
      !outBoundDriverRate &&
      !reloadDriverRate &&
      !returnDriverRate;

    const isCondition4Met =
      (invoiceRates || driverRates) &&
      numberOfUnitsMinimum &&
      numberOfUnitsMinimum <= 32767 &&
      numberOfUnitsMaximum &&
      numberOfUnitsMaximum <= 32767 &&
      Number(numberOfUnitsMaximum) >= Number(numberOfUnitsMinimum);

    if ((isCondition1Met || isCondition2Met || isCondition3Met) && isCondition4Met) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    invoiceRates,
    driverRates,
    outboundInvoiceRate,
    reloadInvoiceRate,
    returnInvoiceRate,
    outBoundDriverRate,
    reloadDriverRate,
    returnDriverRate,
    numberOfUnitsMinimum,
    numberOfUnitsMaximum,
    useMilageTiers,
    customerInvoicePercentage,
  ]);

  /*View  Detail Page*/
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setCustomerRatePK(editFormData?.customerRatePK));
      editFormData.customerFK && dispatch(setCustomerId(editFormData.customerFK.customerPK));
      editFormData.customerFK && dispatch(setCustomerFK(editFormData.customerFK.customerPK));
      editFormData.customerFK && dispatch(setCustomerInput(editFormData.customerFK.name));
      editFormData.customerPlantFK &&
        dispatch(setCustomerPlantId(editFormData.customerPlantFK.customerPlantPK));
      if (editFormData.customerPlantFK != null) {
        dispatch(setCustomerFK(editFormData.customerPlantFK.customerFK));
      }
      editFormData.customerPlantFK && dispatch(setCustomerPlantInput(editFormData.customerPlantFK.name));
      editFormData.customerPlantGroupFK &&
        dispatch(setCustomerPlantGroupId(editFormData.customerPlantGroupFK.customerPlantGroupPK));
      editFormData.customerPlantGroupFK &&
        dispatch(setCustomerPlantGroupInput(editFormData.customerPlantGroupFK.description));
      if (editFormData.customerPlantGroupFK != null) {
        dispatch(setCustomerFK(editFormData.customerPlantGroupFK.customerfk.customerPK));
      }
      editFormData.customerGroupFK &&
        dispatch(setCustomerGroupId(editFormData.customerGroupFK.customerGroupPK));
      editFormData.customerGroupFK &&
        dispatch(setCustomerGroupInput(editFormData.customerGroupFK.description));
      editFormData.customerUnitTypeGroupFK &&
        dispatch(setCustomerUnitTypeGroupId(editFormData.customerUnitTypeGroupFK));
      editFormData.customerUnitTypeGroup &&
        dispatch(setCustomerUnitTypeGroupInput(editFormData.customerUnitTypeGroup.description));

      dispatch(setInvoiceRates(editFormData?.invoiceRates));
      dispatch(setDriverRates(editFormData?.driverRates));
      dispatch(setUseMilageTiers(editFormData?.useMilageTiers));
      dispatch(setFlatRateTiers(editFormData?.flatRateTiers));
      dispatch(setUseLengthTiers(editFormData?.useLengthTiers));
      dispatch(setNumberOfUnitsMinimum(editFormData?.numberOfUnitsMinimum));
      dispatch(setNumberOfUnitsMaximum(editFormData?.numberOfUnitsMaximum));
      if (!editFormData.isMileageTab && !editFormData.isFlatRatedTab) {
        dispatch(setOutboundInvoiceRate(editFormData?.invoiceRate1 === 0 ? "" : editFormData.invoiceRate1));
        dispatch(
          setReloadInvoiceRate(editFormData?.invoiceReloadRate1 === 0 ? "" : editFormData.invoiceReloadRate1)
        );
        dispatch(
          setReturnInvoiceRate(editFormData?.invoiceReturnRate1 === 0 ? "" : editFormData.invoiceReturnRate1)
        );
      }

      dispatch(setAllowLongUnitRate(editFormData?.allowLongUnitRate));
      dispatch(setOneOfMany(editFormData?.oneOfMany));

      if (!editFormData.isMileageTab && !editFormData.isFlatRatedTab) {
        dispatch(setOutboundDriverRate(editFormData?.driverRate1 === 0 ? "" : editFormData.driverRate1));
        dispatch(
          setReloadDriverRate(editFormData?.driverReloadRate1 === 0 ? "" : editFormData.driverReloadRate1)
        );
        dispatch(
          setReturnDriverRate(editFormData?.driverReturnRate1 === 0 ? "" : editFormData.driverReturnRate1)
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editFormData, viewDetail]);

  /*   Adding General Tab form Data
   */
  const generalTabFormData = () => {
    dispatch(
      setCustomerRatesData({
        customerRatePK: ratePK,
        invoiceRates: invoiceRates,
        driverRates: driverRates,
        useMilageTiers: useMilageTiers,
        flatRateTiers: flatRateTiers,
        useLengthTiers: useLengthTiers,
        numberOfUnitsMinimum: numberOfUnitsMinimum,
        numberOfUnitsMaximum: numberOfUnitsMaximum,
        allowLongUnitRate: allowLongUnitRate,
        oneOfMany: oneOfMany,
        customerId: customerId,
        customerPlantId: customerPlantId,
        customerPlantGroupId: customerPlantGroupId,
        customerGroupId: customerGroupId,
        customerUnitTypeGroupFK: customerUnitTypeGroupId,
      })
    );
    /*   Setting the data for General Tab to if Mileage tab flag is false to avoid the complexities due to saving the data in
     the common fields in General tab and Mileage Tab(Invoicerate1-driverreturnrate1) */
    if (!useMilageTiers) {
      dispatch(
        setCustomerRatesData({
          invoiceRate1: outboundInvoiceRate,
          invoiceReloadRate1: reloadInvoiceRate,
          invoiceReturnRate1: returnInvoiceRate,
          driverRate1: outBoundDriverRate,
          driverReloadRate1: reloadDriverRate,
          driverReturnRate1: returnDriverRate,
        })
      );
    }
  };
  useEffect(() => {
    generalTabFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ratePK,
    invoiceRates,
    driverRates,
    useMilageTiers,
    flatRateTiers,
    useLengthTiers,
    numberOfUnitsMinimum,
    numberOfUnitsMaximum,
    outboundInvoiceRate,
    reloadInvoiceRate,
    returnInvoiceRate,
    outBoundDriverRate,
    reloadDriverRate,
    returnDriverRate,
    allowLongUnitRate,
    oneOfMany,
    customerId,
    customerPlantId,
    customerPlantGroupId,
    customerGroupId,
  ]);

  /*   UseEffect to clear states
   */
  useEffect(() => {
    if (!viewDetail) {
      dispatch(setOutboundInvoiceRate(""));
      dispatch(setReloadInvoiceRate(""));
      dispatch(setReturnInvoiceRate(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceRates]);

  useEffect(() => {
    if (!viewDetail) {
      dispatch(setOutboundDriverRate(""));
      dispatch(setReloadDriverRate(""));
      dispatch(setReturnDriverRate(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverRates]);

  useEffect(() => {
    if (!viewDetail) {
      dispatch(setOutboundInvoiceRate(""));
      dispatch(setReloadInvoiceRate(""));
      dispatch(setReturnInvoiceRate(""));
      dispatch(setOutboundDriverRate(""));
      dispatch(setReloadDriverRate(""));
      dispatch(setReturnDriverRate(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMilageTiers]);

  /*   UseEffect to get customer details by Plant,Customer,Customer Plant Group
   */
  useEffect(() => {
    if (customerPlantId || customerPlantGroupId || customerId) getCustomerInfo(customerFK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerFK, customerPlantId, customerPlantGroupId, customerId]);

  /*   UseEffect to get customer details by customer groupFK
   */
  useEffect(() => {
    getCustomerInfoByCustomerGroupFK(customerGroupId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerGroupId]);

  useEffect(() => {
    if (
      !customerId &&
      !customerPlantId &&
      !customerPlantGroupId &&
      !customerGroupId &&
      currentURL === `/customer-rates/new-record`
    )
      navigate("/customer-rates-customer-new");
  }, []);

  return (
    <div className="p-1 w-100">
      <Row className="m-0 p-0">
        <Col xs={4} sm={4} md={4} lg={4} className="">
          {/* Which One */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">
                {customerId
                  ? "Customer"
                  : customerPlantId
                    ? "Plant"
                    : customerPlantGroupId
                      ? "Plant Group"
                      : customerGroupId
                        ? "Customer Group"
                        : ""}
              </Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={customerInput || customerPlantInput || customerPlantGroupInput || customerGroupInput}
                disabled
                autoComplete="newpassword"
                aria-autocomplete="none"
              />
            </Col>
          </Form.Group>
          {/* Unit Type Group */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Unit Type Group</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                className="customFormControl"
                name="name"
                type="text"
                autoComplete="off"
                disabled
                value={customerUnitTypeGroupInput}
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          {/* Invoice Rates */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice Rates</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${
                  !viewDetail && !isCustomerRateLoading
                    ? !invoiceRates && !driverRates
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                name="invoiceRates"
                value={invoiceRates}
                checked={invoiceRates}
                disabled={viewDetail}
                onChange={(e) => dispatch(setInvoiceRates(e.target.checked))}
              />
            </Col>
          </Form.Group>

          {/* Driver Rates */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver Rates</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${
                  !viewDetail && !isCustomerRateLoading
                    ? !invoiceRates && !driverRates
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                name="driverRates"
                value={driverRates}
                checked={driverRates}
                disabled={viewDetail}
                onChange={(e) => dispatch(setDriverRates(e.target.checked))}
              />
            </Col>
          </Form.Group>
          {/* Mileage Tiers */}
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Mileage Tiers</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0 ">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="useMilageTiers"
                value={useMilageTiers}
                checked={useMilageTiers}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setFlatRateTiers(false));
                  dispatch(setUseMilageTiers(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          {/* Mileage Tiers As Flatrate */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Mileage Tiers As Flatrate</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="mileageTiersAsFlatRate"
                value={flatRateTiers}
                checked={flatRateTiers}
                disabled={!useMilageTiers || viewDetail}
                onChange={(e) => dispatch(setFlatRateTiers(e.target.checked))}
              />
            </Col>
          </Form.Group>

          {/* Length Tiers */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Length Tiers</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="useLengthTiers"
                value={useLengthTiers}
                checked={useLengthTiers}
                disabled={viewDetail}
                onChange={(e) => dispatch(setUseLengthTiers(e.target.checked))}
              />
            </Col>
          </Form.Group>

          {/* Minimum Units */}
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Minimum Units</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  viewDetail || isCustomerRateLoading
                    ? "borderBlack"
                    : !numberOfUnitsMinimum || numberOfUnitsMinimum > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="numberOfUnitsMinimum"
                value={numberOfUnitsMinimum || ""}
                autoComplete="newpassword"
                aria-autocomplete="none"
                disabled={viewDetail}
                maxLength={5}
                onInput={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || /^[1-9]\d*$/.test(enteredValue)) {
                    dispatch(setNumberOfUnitsMinimum(enteredValue));
                  } else if (e.inputType === "deleteContentBackward") {
                    dispatch(setNumberOfUnitsMinimum(""));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/* Maximum Units */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Maximum Units</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  viewDetail || isCustomerRateLoading
                    ? "borderBlack"
                    : Number(numberOfUnitsMaximum) < Number(numberOfUnitsMinimum) ||
                        !numberOfUnitsMaximum ||
                        numberOfUnitsMaximum > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="numberOfUnitsMaximum"
                value={numberOfUnitsMaximum || ""}
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={5}
                disabled={viewDetail}
                onInput={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || /^[1-9]\d*$/.test(enteredValue)) {
                    dispatch(setNumberOfUnitsMaximum(enteredValue));
                  } else if (e.inputType === "deleteContentBackward") {
                    dispatch(setNumberOfUnitsMaximum(""));
                  }
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} className="p-0">
          {/* Outbound Invoice Rate */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="customColFormLabel">Outbound Invoice Rate</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  (driverRates && !invoiceRates) ||
                  useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  isCustomerRateLoading
                    ? "borderBlack"
                    : (!useMilageTiers && !flatRateTiers && !outboundInvoiceRate) ||
                        parseFloat(outboundInvoiceRate) === 0 ||
                        outboundInvoiceRate === "." ||
                        outboundInvoiceRate === ""
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="outboundInvoiceRate"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={outboundInvoiceRate}
                disabled={
                  viewDetail ||
                  !invoiceRates ||
                  (driverRates && !invoiceRates) ||
                  useMilageTiers ||
                  (useMilageTiers && flatRateTiers)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setOutboundInvoiceRate(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              {/* Reload Invoice Rate */}
              <Form.Label className="customColFormLabel">Reload Invoice Rate</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  (driverRates && !invoiceRates) ||
                  useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  isCustomerRateLoading
                    ? "borderBlack"
                    : (!useMilageTiers && !flatRateTiers && !reloadInvoiceRate) ||
                        reloadInvoiceRate === "." ||
                        reloadInvoiceRate === "" ||
                        parseFloat(reloadInvoiceRate) === 0
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="reloadInvoiceRate"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={reloadInvoiceRate}
                disabled={
                  viewDetail ||
                  (driverRates && !invoiceRates) ||
                  !invoiceRates ||
                  useMilageTiers ||
                  (useMilageTiers && flatRateTiers)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setReloadInvoiceRate(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              {/* Return Invoice Rate */}
              <Form.Label className="customColFormLabel">Return Invoice Rate</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  (driverRates && !invoiceRates) ||
                  useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  isCustomerRateLoading
                    ? "borderBlack"
                    : (!useMilageTiers && !flatRateTiers && !returnInvoiceRate) ||
                        returnInvoiceRate === "." ||
                        returnInvoiceRate === "" ||
                        parseFloat(returnInvoiceRate) === 0
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="returnInvoiceRate"
                value={returnInvoiceRate}
                autoComplete="newpassword"
                aria-autocomplete="none"
                disabled={
                  viewDetail ||
                  !invoiceRates ||
                  (driverRates && !invoiceRates) ||
                  useMilageTiers ||
                  (useMilageTiers && flatRateTiers)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setReturnInvoiceRate(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>

          {/* Update Outbound Invoice Rates */}
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="customColFormLabel">Update Outbound Invoice Rates</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="updateOutboundDriverRates"
                disabled
              />
            </Col>
          </Form.Group>

          {/* Update Reload Invoice Rates */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="customColFormLabel">Update Reload Invoice Rates</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input type="checkbox" className="form-check-input p-0 " name="" disabled />
            </Col>
          </Form.Group>

          {/* Update Return Invoice Rates */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="customColFormLabel">Update Return Invoice Rates</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input type="checkbox" className="form-check-input p-0 " name="" disabled />
            </Col>
          </Form.Group>

          {/* Allow Long Unit Driver Rate */}
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="customColFormLabel">Allow Long Unit Driver Rate</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="allowLongUnitRate"
                value={allowLongUnitRate}
                checked={allowLongUnitRate}
                disabled={viewDetail}
                onChange={(e) => dispatch(setAllowLongUnitRate(e.target.checked))}
              />
            </Col>
          </Form.Group>

          {/* One Of Many */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="customColFormLabel">One Of Many</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="oneOfMany"
                value={oneOfMany}
                checked={oneOfMany}
                disabled={viewDetail}
                onChange={(e) => dispatch(setOneOfMany(e.target.checked))}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} className="p-0">
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              {/* Outbound Driver Rate */}
              <Form.Label className="customColFormLabel">Outbound Driver Rate</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  (!driverRates && invoiceRates) ||
                  useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  isCustomerRateLoading
                    ? "borderBlack"
                    : (!useMilageTiers && !flatRateTiers && !outBoundDriverRate) ||
                        outBoundDriverRate === "." ||
                        outBoundDriverRate === "" ||
                        parseFloat(outBoundDriverRate) === 0 ||
                        (outboundInvoiceRate &&
                          Number(outBoundDriverRate) >
                            Number(outboundInvoiceRate * customerInvoicePercentage)) ||
                        (invoiceRates && !outboundInvoiceRate)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="outBoundDriverRate"
                value={outBoundDriverRate}
                autoComplete="newpassword"
                aria-autocomplete="none"
                disabled={viewDetail || (invoiceRates && !driverRates) || !driverRates || useMilageTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setOutboundDriverRate(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              {/* Reload Driver Rate */}
              <Form.Label className="customColFormLabel">Reload Driver Rate</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  (!driverRates && invoiceRates) ||
                  useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  isCustomerRateLoading
                    ? "borderBlack"
                    : (!useMilageTiers && !flatRateTiers && !reloadDriverRate) ||
                        reloadDriverRate === "." ||
                        reloadDriverRate === "" ||
                        parseFloat(reloadDriverRate) === 0 ||
                        (reloadInvoiceRate &&
                          Number(reloadDriverRate) > Number(reloadInvoiceRate * customerInvoicePercentage)) ||
                        (invoiceRates && !reloadInvoiceRate)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="reloadDriverRate"
                value={reloadDriverRate}
                autoComplete="newpassword"
                aria-autocomplete="none"
                disabled={viewDetail || (invoiceRates && !driverRates) || useMilageTiers || !driverRates}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setReloadDriverRate(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              {/* Return Driver Rate */}
              <Form.Label className="customColFormLabel">Return Driver Rate</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  (!driverRates && invoiceRates) ||
                  useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  isCustomerRateLoading
                    ? "borderBlack"
                    : (!useMilageTiers && !flatRateTiers && !returnDriverRate) ||
                        returnDriverRate === "." ||
                        returnDriverRate === "" ||
                        parseFloat(returnDriverRate) === 0 ||
                        (returnInvoiceRate &&
                          Number(returnDriverRate) > Number(returnInvoiceRate * customerInvoicePercentage)) ||
                        (invoiceRates && !returnInvoiceRate)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="returnDriverRate"
                value={returnDriverRate}
                autoComplete="newpassword"
                aria-autocomplete="none"
                disabled={viewDetail || (invoiceRates && !driverRates) || !driverRates || useMilageTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setReturnDriverRate(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>

          {/* Update Outbound Drivers Rates */}
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="customColFormLabel">Update Outbound Drivers Rates</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="updateOutboundDriverRates"
                disabled
              />
            </Col>
          </Form.Group>

          {/* Update Reload Driver Rates */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="customColFormLabel">Update Reload Driver Rates</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input type="checkbox" className="form-check-input p-0 " name="" disabled />
            </Col>
          </Form.Group>

          {/* Update Return Driver Rates */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="customColFormLabel">Update Return Driver Rates</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input type="checkbox" className="form-check-input p-0 " name="" disabled />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default GeneralTab;
