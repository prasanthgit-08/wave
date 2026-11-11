import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import {
  //Tab Validation
  setCustomerRatesData,
  setIsTiersFlatRateTabValid,
  //Miles
  setFlatRateMileageBreak1,
  setFlatRateMileageBreak2,
  setFlatRateMileageBreak3,
  setFlatRateMileageBreak4,
  setFlatRateMileageBreak5,
  setFlatRateMileageBreak6,
  /*   Flat rate-Invoice Rate
   */
  setInvoiceFlatRate1,
  setInvoiceFlatRate2,
  setInvoiceFlatRate3,
  setInvoiceFlatRate4,
  setInvoiceFlatRate5,
  setInvoiceFlatRate6,
  setInvoiceFlatRate7,

  /*Flat rate-Invoice Reload*/
  setInvoiceReloadFlatRate1,
  setInvoiceReloadFlatRate2,
  setInvoiceReloadFlatRate3,
  setInvoiceReloadFlatRate4,
  setInvoiceReloadFlatRate5,
  setInvoiceReloadFlatRate6,
  setInvoiceReloadFlatRate7,

  /*Flat rate-Invoice Return Rate*/
  setInvoiceReturnFlatRate1,
  setInvoiceReturnFlatRate2,
  setInvoiceReturnFlatRate3,
  setInvoiceReturnFlatRate4,
  setInvoiceReturnFlatRate5,
  setInvoiceReturnFlatRate6,
  setInvoiceReturnFlatRate7,

  /*Flat rate-  Driver Rate*/
  setDriverFlatRate1,
  setDriverFlatRate2,
  setDriverFlatRate3,
  setDriverFlatRate4,
  setDriverFlatRate5,
  setDriverFlatRate6,
  setDriverFlatRate7,

  /*Flat rate-  Driver Reload Rate*/
  setDriverReloadFlatRate1,
  setDriverReloadFlatRate2,
  setDriverReloadFlatRate3,
  setDriverReloadFlatRate4,
  setDriverReloadFlatRate5,
  setDriverReloadFlatRate6,
  setDriverReloadFlatRate7,

  /*Flat rate-  Driver Return Rate*/
  setDriverReturnFlatRate1,
  setDriverReturnFlatRate2,
  setDriverReturnFlatRate3,
  setDriverReturnFlatRate4,
  setDriverReturnFlatRate5,
  setDriverReturnFlatRate6,
  setDriverReturnFlatRate7,
  setInvoiceFlatRateAddFS,
  setInvoiceMinimumAddFuelSurcharge,
} from "../../../../../../redux/CustomerRatesSlice";

const FlatRateTab = () => {
  //Dispatch
  const dispatch = useDispatch();

  /*  //Redux States
  //Common */

  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerRatesReducer.editFormData);
  const invoiceRates = useSelector((state) => state.customerRatesReducer.invoiceRates);
  const driverRates = useSelector((state) => state.customerRatesReducer.driverRates);
  const useMilageTiers = useSelector((state) => state.customerRatesReducer.useMilageTiers);
  const flatRateTiers = useSelector((state) => state.customerRatesReducer.flatRateTiers);
  const customerInvoicePercentage = useSelector(
    (state) => state.customerRatesReducer.customerInvoicePercentage
  );
  useSelector((state) => state.customerRatesReducer.customerInvoicePercentage);
  /*    mileageBreak
   */
  const mileageBreak1 = useSelector((state) => state.customerRatesReducer.flatRateMileageBreak1);
  const mileageBreak2 = useSelector((state) => state.customerRatesReducer.flatRateMileageBreak2);
  const mileageBreak3 = useSelector((state) => state.customerRatesReducer.flatRateMileageBreak3);
  const mileageBreak4 = useSelector((state) => state.customerRatesReducer.flatRateMileageBreak4);
  const mileageBreak5 = useSelector((state) => state.customerRatesReducer.flatRateMileageBreak5);
  const mileageBreak6 = useSelector((state) => state.customerRatesReducer.flatRateMileageBreak6);

  /*   Flat rate-Invoice Rate
   */
  const invoiceFlatRate1 = useSelector((state) => state.customerRatesReducer.invoiceFlatRate1);
  const invoiceFlatRate2 = useSelector((state) => state.customerRatesReducer.invoiceFlatRate2);
  const invoiceFlatRate3 = useSelector((state) => state.customerRatesReducer.invoiceFlatRate3);
  const invoiceFlatRate4 = useSelector((state) => state.customerRatesReducer.invoiceFlatRate4);
  const invoiceFlatRate5 = useSelector((state) => state.customerRatesReducer.invoiceFlatRate5);
  const invoiceFlatRate6 = useSelector((state) => state.customerRatesReducer.invoiceFlatRate6);
  const invoiceRate7 = useSelector((state) => state.customerRatesReducer.invoiceFlatRate7);

  /*   Flat rate-Invoice Reload
   */
  const invoiceReloadFlatRate1 = useSelector((state) => state.customerRatesReducer.invoiceReloadFlatRate1);
  const invoiceReloadFlatRate2 = useSelector((state) => state.customerRatesReducer.invoiceReloadFlatRate2);
  const invoiceReloadFlatRate3 = useSelector((state) => state.customerRatesReducer.invoiceReloadFlatRate3);
  const invoiceReloadFlatRate4 = useSelector((state) => state.customerRatesReducer.invoiceReloadFlatRate4);
  const invoiceReloadFlatRate5 = useSelector((state) => state.customerRatesReducer.invoiceReloadFlatRate5);
  const invoiceReloadFlatRate6 = useSelector((state) => state.customerRatesReducer.invoiceReloadFlatRate6);
  const invoiceReloadRate7 = useSelector((state) => state.customerRatesReducer.invoiceReloadFlatRate7);

  /*   Flat rate-Invoice Return Rate
   */
  const invoiceReturnFlatRate1 = useSelector((state) => state.customerRatesReducer.invoiceReturnFlatRate1);
  const invoiceReturnFlatRate2 = useSelector((state) => state.customerRatesReducer.invoiceReturnFlatRate2);
  const invoiceReturnFlatRate3 = useSelector((state) => state.customerRatesReducer.invoiceReturnFlatRate3);
  const invoiceReturnFlatRate4 = useSelector((state) => state.customerRatesReducer.invoiceReturnFlatRate4);
  const invoiceReturnFlatRate5 = useSelector((state) => state.customerRatesReducer.invoiceReturnFlatRate5);
  const invoiceReturnFlatRate6 = useSelector((state) => state.customerRatesReducer.invoiceReturnFlatRate6);
  const invoiceReturnRate7 = useSelector((state) => state.customerRatesReducer.invoiceReturnFlatRate7);

  /*   Flat rate-  Driver Rate
   */
  const driverFlatRate1 = useSelector((state) => state.customerRatesReducer.driverFlatRate1);
  const driverFlatRate2 = useSelector((state) => state.customerRatesReducer.driverFlatRate2);
  const driverFlatRate3 = useSelector((state) => state.customerRatesReducer.driverFlatRate3);
  const driverFlatRate4 = useSelector((state) => state.customerRatesReducer.driverFlatRate4);
  const driverFlatRate5 = useSelector((state) => state.customerRatesReducer.driverFlatRate5);
  const driverFlatRate6 = useSelector((state) => state.customerRatesReducer.driverFlatRate6);
  const driverRate7 = useSelector((state) => state.customerRatesReducer.driverFlatRate7);

  /*   Flat rate-  Driver Reload Rate
   */
  const driverReloadFlatRate1 = useSelector((state) => state.customerRatesReducer.driverReloadFlatRate1);
  const driverReloadFlatRate2 = useSelector((state) => state.customerRatesReducer.driverReloadFlatRate2);
  const driverReloadFlatRate3 = useSelector((state) => state.customerRatesReducer.driverReloadFlatRate3);
  const driverReloadFlatRate4 = useSelector((state) => state.customerRatesReducer.driverReloadFlatRate4);
  const driverReloadFlatRate5 = useSelector((state) => state.customerRatesReducer.driverReloadFlatRate5);
  const driverReloadFlatRate6 = useSelector((state) => state.customerRatesReducer.driverReloadFlatRate6);
  const driverReloadRate7 = useSelector((state) => state.customerRatesReducer.driverReloadFlatRate7);

  /*   // Flat rate-  Driver Return Rate
   */
  const driverReturnFlatRate1 = useSelector((state) => state.customerRatesReducer.driverReturnFlatRate1);
  const driverReturnFlatRate2 = useSelector((state) => state.customerRatesReducer.driverReturnFlatRate2);
  const driverReturnFlatRate3 = useSelector((state) => state.customerRatesReducer.driverReturnFlatRate3);
  const driverReturnFlatRate4 = useSelector((state) => state.customerRatesReducer.driverReturnFlatRate4);
  const driverReturnFlatRate5 = useSelector((state) => state.customerRatesReducer.driverReturnFlatRate5);
  const driverReturnFlatRate6 = useSelector((state) => state.customerRatesReducer.driverReturnFlatRate6);
  const driverReturnRate7 = useSelector((state) => state.customerRatesReducer.driverReturnFlatRate7);
  const invoiceFlatRateAddFS = useSelector((state) => state.customerRatesReducer.invoiceFlatRateAddFS);
  const useLengthTiers = useSelector((state) => state.customerRatesReducer.useLengthTiers);
  /*****Invoice Fuel surcharges to disable the Add fuel Surcharge field */
  const invoiceFuelSurchargeGas = useSelector((state) => state.customerRatesReducer.invoiceFuelSurchargeGas);
  const invoiceFuelSurchargeDiesel = useSelector(
    (state) => state.customerRatesReducer.invoiceFuelSurchargeDiesel
  );
  const invoiceFuelSurchargeGasCanada = useSelector(
    (state) => state.customerRatesReducer.invoiceFuelSurchargeGasCanada
  );
  const invoiceFuelSurchargeDieselCanada = useSelector(
    (state) => state.customerRatesReducer.invoiceFuelSurchargeDieselCanada
  );
  const driverFuelSurchargeGas = useSelector((state) => state.customerRatesReducer.driverFuelSurchargeGas);
  const driverFuelSurchargeDiesel = useSelector(
    (state) => state.customerRatesReducer.driverFuelSurchargeDiesel
  );
  const driverFuelSurchargeGasCanada = useSelector(
    (state) => state.customerRatesReducer.driverFuelSurchargeGasCanada
  );
  const driverFuelSurchargeDieselCanada = useSelector(
    (state) => state.customerRatesReducer.driverFuelSurchargeDieselCanada
  );
  /*   local states to set invoicerates and driver rates true/false
   */
  const [hasInvoiceFlatRate1, setHasInvoiceFlatRate1] = useState(false);
  const [hasInvoiceFlatRate2, setHasInvoiceFlatRate2] = useState(false);
  const [hasInvoiceFlatRate3, setHasInvoiceFlatRate3] = useState(false);
  const [hasInvoiceFlatRate4, setHasInvoiceFlatRate4] = useState(false);
  const [hasInvoiceFlatRate5, setHasInvoiceFlatRate5] = useState(false);
  const [hasInvoiceFlatRate6, setHasInvoiceFlatRate6] = useState(false);
  const [hasDriverFlatRate1, setHasDriverFlatRate1] = useState(false);
  const [hasDriverFlatRate2, setHasDriverFlatRate2] = useState(false);
  const [hasDriverFlatRate3, setHasDriverFlatRate3] = useState(false);
  const [hasDriverFlatRate4, setHasDriverFlatRate4] = useState(false);
  const [hasDriverFlatRate5, setHasDriverFlatRate5] = useState(false);
  const [hasDriverFlatRate6, setHasDriverFlatRate6] = useState(false);
  /*   Invoice Rates flag setting for rates clearence
   */
  useEffect(() => {
    if (invoiceFlatRate1 || invoiceReloadFlatRate1 || invoiceReturnFlatRate1) {
      setHasInvoiceFlatRate1(true);
    } else {
      setHasInvoiceFlatRate1(false);
    }
  }, [invoiceFlatRate1, invoiceReloadFlatRate1, invoiceReturnFlatRate1]);
  useEffect(() => {
    if (invoiceFlatRate2 || invoiceReloadFlatRate2 || invoiceReturnFlatRate2) {
      setHasInvoiceFlatRate2(true);
    } else {
      setHasInvoiceFlatRate2(false);
    }
  }, [invoiceFlatRate2, invoiceReloadFlatRate2, invoiceReturnFlatRate2]);
  useEffect(() => {
    if (invoiceFlatRate3 || invoiceReloadFlatRate3 || invoiceReturnFlatRate3) {
      setHasInvoiceFlatRate3(true);
    } else {
      setHasInvoiceFlatRate3(false);
    }
  }, [invoiceFlatRate3, invoiceReloadFlatRate3, invoiceReturnFlatRate3]);
  useEffect(() => {
    if (invoiceFlatRate4 || invoiceReloadFlatRate4 || invoiceReturnFlatRate4) {
      setHasInvoiceFlatRate4(true);
    } else {
      setHasInvoiceFlatRate4(false);
    }
  }, [invoiceFlatRate4, invoiceReloadFlatRate4, invoiceReturnFlatRate4]);
  useEffect(() => {
    if (invoiceFlatRate5 || invoiceReloadFlatRate5 || invoiceReturnFlatRate5) {
      setHasInvoiceFlatRate5(true);
    } else {
      setHasInvoiceFlatRate5(false);
    }
  }, [invoiceFlatRate5, invoiceReloadFlatRate5, invoiceReturnFlatRate5]);
  useEffect(() => {
    if (invoiceFlatRate6 || invoiceReloadFlatRate6 || invoiceReturnFlatRate6) {
      setHasInvoiceFlatRate6(true);
    } else {
      setHasInvoiceFlatRate6(false);
    }
  }, [invoiceFlatRate6, invoiceReloadFlatRate6, invoiceReturnFlatRate6]);
  /*   //Driver rates flag setting for rates clearence
   */
  useEffect(() => {
    if (driverFlatRate1 || driverReloadFlatRate1 || driverReturnFlatRate1) {
      setHasDriverFlatRate1(true);
    } else {
      setHasDriverFlatRate1(false);
    }
  }, [driverFlatRate1, driverReloadFlatRate1, driverReturnFlatRate1]);
  useEffect(() => {
    if (driverFlatRate2 || driverReloadFlatRate2 || driverReturnFlatRate2) {
      setHasDriverFlatRate2(true);
    } else {
      setHasDriverFlatRate2(false);
    }
  }, [driverFlatRate2, driverReloadFlatRate2, driverReturnFlatRate2]);
  useEffect(() => {
    if (driverFlatRate3 || driverReloadFlatRate3 || driverReturnFlatRate3) {
      setHasDriverFlatRate3(true);
    } else {
      setHasDriverFlatRate3(false);
    }
  }, [driverFlatRate3, driverReloadFlatRate3, driverReturnFlatRate3]);
  useEffect(() => {
    if (driverFlatRate4 || driverReloadFlatRate4 || driverReturnFlatRate4) {
      setHasDriverFlatRate4(true);
    } else {
      setHasDriverFlatRate4(false);
    }
  }, [driverFlatRate4, driverReloadFlatRate4, driverReturnFlatRate4]);
  useEffect(() => {
    if (driverFlatRate5 || driverReloadFlatRate5 || driverReturnFlatRate5) {
      setHasDriverFlatRate5(true);
    } else {
      setHasDriverFlatRate5(false);
    }
  }, [driverFlatRate5, driverReloadFlatRate5, driverReturnFlatRate5]);
  useEffect(() => {
    if (driverFlatRate6 || driverReloadFlatRate6 || driverReturnFlatRate6) {
      setHasDriverFlatRate6(true);
    } else {
      setHasDriverFlatRate6(false);
    }
  }, [driverFlatRate6, driverReloadFlatRate6, driverReturnFlatRate6]);
  /*   //View Detail Page
   */
  useEffect(() => {
    setTimeout(() => {
      if (editFormData != null) {
        //Miles
        if (editFormData.isFlatRatedTab && !editFormData.isMileageTab) {
          dispatch(
            setFlatRateMileageBreak1(editFormData?.mileageBreak1 === 0 ? "" : editFormData.mileageBreak1)
          );
          dispatch(
            setFlatRateMileageBreak2(editFormData?.mileageBreak2 === 0 ? "" : editFormData.mileageBreak2)
          );
          dispatch(
            setFlatRateMileageBreak3(editFormData?.mileageBreak3 === 0 ? "" : editFormData.mileageBreak3)
          );
          dispatch(
            setFlatRateMileageBreak4(editFormData?.mileageBreak4 === 0 ? "" : editFormData.mileageBreak4)
          );
          dispatch(
            setFlatRateMileageBreak5(editFormData?.mileageBreak5 === 0 ? "" : editFormData.mileageBreak5)
          );
          dispatch(
            setFlatRateMileageBreak6(editFormData?.mileageBreak6 === 0 ? "" : editFormData.mileageBreak6)
          );

          dispatch(setInvoiceFlatRate7(editFormData?.invoiceRate7 === 0 ? "" : editFormData.invoiceRate7));
          dispatch(
            setInvoiceReloadFlatRate7(
              editFormData?.invoiceReloadRate7 === 0 ? "" : editFormData.invoiceReloadRate7
            )
          );
          dispatch(
            setInvoiceReturnFlatRate7(
              editFormData?.invoiceReturnRate7 === 0 ? "" : editFormData.invoiceReturnRate7
            )
          );
          dispatch(setDriverFlatRate7(editFormData?.driverRate7 === 0 ? "" : editFormData.driverRate7));
          dispatch(
            setDriverReloadFlatRate7(
              editFormData?.driverReloadRate7 === 0 ? "" : editFormData.driverReloadRate7
            )
          );
          dispatch(
            setDriverReturnFlatRate7(
              editFormData?.driverReturnRate7 === 0 ? "" : editFormData.driverReturnRate7
            )
          );
        }
        /* Invoice Flatrates
         */
        dispatch(
          setInvoiceFlatRate1(editFormData?.invoiceFlatRate1 === 0 ? "" : editFormData.invoiceFlatRate1)
        );
        dispatch(
          setInvoiceFlatRate2(editFormData?.invoiceFlatRate2 === 0 ? "" : editFormData.invoiceFlatRate2)
        );
        dispatch(
          setInvoiceFlatRate3(editFormData?.invoiceFlatRate3 === 0 ? "" : editFormData.invoiceFlatRate3)
        );
        dispatch(
          setInvoiceFlatRate4(editFormData?.invoiceFlatRate4 === 0 ? "" : editFormData.invoiceFlatRate4)
        );
        dispatch(
          setInvoiceFlatRate5(editFormData?.invoiceFlatRate5 === 0 ? "" : editFormData.invoiceFlatRate5)
        );
        dispatch(
          setInvoiceFlatRate6(editFormData?.invoiceFlatRate6 === 0 ? "" : editFormData.invoiceFlatRate6)
        );

        /* Invoice Reload
         */
        dispatch(
          setInvoiceReloadFlatRate1(
            editFormData?.invoiceReloadFlatRate1 === 0 ? "" : editFormData.invoiceReloadFlatRate1
          )
        );
        dispatch(
          setInvoiceReloadFlatRate2(
            editFormData?.invoiceReloadFlatRate2 === 0 ? "" : editFormData.invoiceReloadFlatRate2
          )
        );
        dispatch(
          setInvoiceReloadFlatRate3(
            editFormData?.invoiceReloadFlatRate3 === 0 ? "" : editFormData.invoiceReloadFlatRate3
          )
        );
        dispatch(
          setInvoiceReloadFlatRate4(
            editFormData?.invoiceReloadFlatRate4 === 0 ? "" : editFormData.invoiceReloadFlatRate4
          )
        );
        dispatch(
          setInvoiceReloadFlatRate5(
            editFormData?.invoiceReloadFlatRate5 === 0 ? "" : editFormData.invoiceReloadFlatRate5
          )
        );
        dispatch(
          setInvoiceReloadFlatRate6(
            editFormData?.invoiceReloadFlatRate6 === 0 ? "" : editFormData.invoiceReloadFlatRate6
          )
        );

        /* Invoice Return
         */
        dispatch(
          setInvoiceReturnFlatRate1(
            editFormData?.invoiceReturnFlatRate1 === 0 ? "" : editFormData.invoiceReturnFlatRate1
          )
        );
        dispatch(
          setInvoiceReturnFlatRate2(
            editFormData?.invoiceReturnFlatRate2 === 0 ? "" : editFormData.invoiceReturnFlatRate2
          )
        );
        dispatch(
          setInvoiceReturnFlatRate3(
            editFormData?.invoiceReturnFlatRate3 === 0 ? "" : editFormData.invoiceReturnFlatRate3
          )
        );
        dispatch(
          setInvoiceReturnFlatRate4(
            editFormData?.invoiceReturnFlatRate4 === 0 ? "" : editFormData.invoiceReturnFlatRate4
          )
        );
        dispatch(
          setInvoiceReturnFlatRate5(
            editFormData?.invoiceReturnFlatRate5 === 0 ? "" : editFormData.invoiceReturnFlatRate5
          )
        );
        dispatch(
          setInvoiceReturnFlatRate6(
            editFormData?.invoiceReturnFlatRate6 === 0 ? "" : editFormData.invoiceReturnFlatRate6
          )
        );

        /*  Driver Outbound
         */
        dispatch(setDriverFlatRate1(editFormData?.driverFlatRate1 === 0 ? "" : editFormData.driverFlatRate1));
        dispatch(setDriverFlatRate2(editFormData?.driverFlatRate2 === 0 ? "" : editFormData.driverFlatRate2));
        dispatch(setDriverFlatRate3(editFormData?.driverFlatRate3 === 0 ? "" : editFormData.driverFlatRate3));
        dispatch(setDriverFlatRate4(editFormData?.driverFlatRate4 === 0 ? "" : editFormData.driverFlatRate4));
        dispatch(setDriverFlatRate5(editFormData?.driverFlatRate5 === 0 ? "" : editFormData.driverFlatRate5));
        dispatch(setDriverFlatRate6(editFormData?.driverFlatRate6 === 0 ? "" : editFormData.driverFlatRate6));

        /* Driver Reload
         */
        dispatch(
          setDriverReloadFlatRate1(
            editFormData?.driverReloadFlatRate1 === 0 ? "" : editFormData.driverReloadFlatRate1
          )
        );
        dispatch(
          setDriverReloadFlatRate2(
            editFormData?.driverReloadFlatRate2 === 0 ? "" : editFormData.driverReloadFlatRate2
          )
        );
        dispatch(
          setDriverReloadFlatRate3(
            editFormData?.driverReloadFlatRate3 === 0 ? "" : editFormData.driverReloadFlatRate3
          )
        );
        dispatch(
          setDriverReloadFlatRate4(
            editFormData?.driverReloadFlatRate4 === 0 ? "" : editFormData.driverReloadFlatRate4
          )
        );
        dispatch(
          setDriverReloadFlatRate5(
            editFormData?.driverReloadFlatRate5 === 0 ? "" : editFormData.driverReloadFlatRate5
          )
        );
        dispatch(
          setDriverReloadFlatRate6(
            editFormData?.driverReloadFlatRate6 === 0 ? "" : editFormData.driverReloadFlatRate6
          )
        );

        /*  Driver Return
         */
        dispatch(
          setDriverReturnFlatRate1(
            editFormData?.driverReturnFlatRate1 === 0 ? "" : editFormData.driverReturnFlatRate1
          )
        );
        dispatch(
          setDriverReturnFlatRate2(
            editFormData?.driverReturnFlatRate2 === 0 ? "" : editFormData.driverReturnFlatRate2
          )
        );
        dispatch(
          setDriverReturnFlatRate3(
            editFormData?.driverReturnFlatRate3 === 0 ? "" : editFormData.driverReturnFlatRate3
          )
        );
        dispatch(
          setDriverReturnFlatRate4(
            editFormData?.driverReturnFlatRate4 === 0 ? "" : editFormData.driverReturnFlatRate4
          )
        );
        dispatch(
          setDriverReturnFlatRate5(
            editFormData?.driverReturnFlatRate5 === 0 ? "" : editFormData.driverReturnFlatRate5
          )
        );
        dispatch(
          setDriverReturnFlatRate6(
            editFormData?.driverReturnFlatRate6 === 0 ? "" : editFormData.driverReturnFlatRate6
          )
        );
      }
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editFormData, viewDetail]);

  /*   Setting Flatrate tab data for save operation
   */
  const flatRateTabFormData = () => {
    dispatch(
      setCustomerRatesData({
        mileageBreak1: mileageBreak1,
        mileageBreak2: mileageBreak2,
        mileageBreak3: mileageBreak3,
        mileageBreak4: mileageBreak4,
        mileageBreak5: mileageBreak5,
        mileageBreak6: mileageBreak6,

        invoiceFlatRate1: invoiceFlatRate1,
        invoiceFlatRate2: invoiceFlatRate2,
        invoiceFlatRate3: invoiceFlatRate3,
        invoiceFlatRate4: invoiceFlatRate4,
        invoiceFlatRate5: invoiceFlatRate5,
        invoiceFlatRate6: invoiceFlatRate6,
        invoiceRate7: invoiceRate7,

        invoiceReloadFlatRate1: invoiceReloadFlatRate1,
        invoiceReloadFlatRate2: invoiceReloadFlatRate2,
        invoiceReloadFlatRate3: invoiceReloadFlatRate3,
        invoiceReloadFlatRate4: invoiceReloadFlatRate4,
        invoiceReloadFlatRate5: invoiceReloadFlatRate5,
        invoiceReloadFlatRate6: invoiceReloadFlatRate6,
        invoiceReloadRate7: invoiceReloadRate7,

        invoiceReturnFlatRate1: invoiceReturnFlatRate1,
        invoiceReturnFlatRate2: invoiceReturnFlatRate2,
        invoiceReturnFlatRate3: invoiceReturnFlatRate3,
        invoiceReturnFlatRate4: invoiceReturnFlatRate4,
        invoiceReturnFlatRate5: invoiceReturnFlatRate5,
        invoiceReturnFlatRate6: invoiceReturnFlatRate6,
        invoiceReturnRate7: invoiceReturnRate7,

        driverFlatRate1: driverFlatRate1,
        driverFlatRate2: driverFlatRate2,
        driverFlatRate3: driverFlatRate3,
        driverFlatRate4: driverFlatRate4,
        driverFlatRate5: driverFlatRate5,
        driverFlatRate6: driverFlatRate6,
        driverRate7: driverRate7,

        driverReloadFlatRate1: driverReloadFlatRate1,
        driverReloadFlatRate2: driverReloadFlatRate2,
        driverReloadFlatRate3: driverReloadFlatRate3,
        driverReloadFlatRate4: driverReloadFlatRate4,
        driverReloadFlatRate5: driverReloadFlatRate5,
        driverReloadFlatRate6: driverReloadFlatRate6,
        driverReloadRate7: driverReloadRate7,

        driverReturnFlatRate1: driverReturnFlatRate1,
        driverReturnFlatRate2: driverReturnFlatRate2,
        driverReturnFlatRate3: driverReturnFlatRate3,
        driverReturnFlatRate4: driverReturnFlatRate4,
        driverReturnFlatRate5: driverReturnFlatRate5,
        driverReturnFlatRate6: driverReturnFlatRate6,
        driverReturnRate7: driverReturnRate7,
        invoiceFlatRateAddFS: invoiceFlatRateAddFS,
      })
    );
  };
  useEffect(() => {
    if (flatRateTiers && useMilageTiers) {
      flatRateTabFormData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mileageBreak1,
    mileageBreak2,
    mileageBreak3,
    mileageBreak4,
    mileageBreak5,
    mileageBreak6,

    invoiceFlatRate1,
    invoiceFlatRate2,
    invoiceFlatRate3,
    invoiceFlatRate4,
    invoiceFlatRate5,
    invoiceFlatRate6,
    invoiceRate7,

    invoiceReloadFlatRate1,
    invoiceReloadFlatRate2,
    invoiceReloadFlatRate3,
    invoiceReloadFlatRate4,
    invoiceReloadFlatRate5,
    invoiceReloadFlatRate6,
    invoiceReloadRate7,

    invoiceReturnFlatRate1,
    invoiceReturnFlatRate2,
    invoiceReturnFlatRate3,
    invoiceReturnFlatRate4,
    invoiceReturnFlatRate5,
    invoiceReturnFlatRate6,
    invoiceReturnRate7,

    // Driver Rates
    driverFlatRate1,
    driverFlatRate2,
    driverFlatRate3,
    driverFlatRate4,
    driverFlatRate5,
    driverFlatRate6,
    driverRate7,

    driverReloadFlatRate1,
    driverReloadFlatRate2,
    driverReloadFlatRate3,
    driverReloadFlatRate4,
    driverReloadFlatRate5,
    driverReloadFlatRate6,
    driverReloadRate7,

    driverReturnFlatRate1,
    driverReturnFlatRate2,
    driverReturnFlatRate3,
    driverReturnFlatRate4,
    driverReturnFlatRate5,
    driverReturnFlatRate6,
    driverReturnRate7,

    invoiceFlatRateAddFS,
    viewDetail,
    flatRateTiers,
  ]);
  /********
   * Reset the Invoice Minimum Addfuel
   * Surcharge on clearing Surcharges fields
   ******/
  useEffect(() => {
    if (
      !invoiceFuelSurchargeGas &&
      !invoiceFuelSurchargeDiesel &&
      !invoiceFuelSurchargeGasCanada &&
      !invoiceFuelSurchargeDieselCanada &&
      !driverFuelSurchargeGas &&
      !driverFuelSurchargeDiesel &&
      !driverFuelSurchargeGasCanada &&
      !driverFuelSurchargeDieselCanada
    ) {
      dispatch(setInvoiceFlatRateAddFS(false));
    }
  }, [
    invoiceFuelSurchargeGas,
    invoiceFuelSurchargeDiesel,
    invoiceFuelSurchargeGasCanada,
    invoiceFuelSurchargeDieselCanada,
    driverFuelSurchargeGas,
    driverFuelSurchargeDiesel,
    driverFuelSurchargeGasCanada,
    driverFuelSurchargeDieselCanada,
  ]);
  /* Tab Validation of Flatrate tab contains 19 conditions if any of this 
  condition becomes true the flatrate tab will become false */
  useEffect(() => {
    const isCondition1Met =
      mileageBreak1 === "" ||
      parseInt(mileageBreak1) === 0 ||
      mileageBreak1 > 32767 ||
      (mileageBreak2 !== "" &&
        !isNaN(Number(mileageBreak2)) &&
        Number(mileageBreak2) <= Number(mileageBreak1)) ||
      mileageBreak2 > 32767 ||
      (mileageBreak3 !== "" &&
        !isNaN(Number(mileageBreak3)) &&
        Number(mileageBreak3) <= Number(mileageBreak2)) ||
      mileageBreak3 > 32767 ||
      (mileageBreak4 !== "" &&
        !isNaN(Number(mileageBreak4)) &&
        Number(mileageBreak4) <= Number(mileageBreak3)) ||
      mileageBreak4 > 32767 ||
      (mileageBreak5 !== "" &&
        !isNaN(Number(mileageBreak5)) &&
        Number(mileageBreak5) <= Number(mileageBreak4)) ||
      mileageBreak5 > 32767 ||
      (mileageBreak6 !== "" &&
        !isNaN(Number(mileageBreak6)) &&
        Number(mileageBreak6) <= Number(mileageBreak5)) ||
      mileageBreak6 > 32767;

    const isCondition2Met =
      mileageBreak1 !== "" &&
      invoiceRates &&
      (["", "."].includes(invoiceFlatRate1) ||
        parseFloat(invoiceFlatRate1) === 0 ||
        ["", "."].includes(invoiceReloadFlatRate1) ||
        parseFloat(invoiceReloadFlatRate1) === 0 ||
        ["", "."].includes(invoiceReturnFlatRate1) ||
        parseFloat(invoiceReturnFlatRate1) === 0);

    const isCondition3Met =
      mileageBreak1 !== "" &&
      driverRates &&
      (["", "."].includes(driverFlatRate1) ||
        parseFloat(driverFlatRate1) === 0 ||
        ["", "."].includes(driverReloadFlatRate1) ||
        parseFloat(driverReloadFlatRate1) === 0 ||
        ["", "."].includes(driverReturnFlatRate1) ||
        parseFloat(driverReturnFlatRate1) === 0);

    const isCondition4Met =
      mileageBreak2 !== "" &&
      invoiceRates &&
      (["", "."].includes(invoiceFlatRate2) ||
        parseFloat(invoiceFlatRate2) === 0 ||
        ["", "."].includes(invoiceReloadFlatRate2) ||
        parseFloat(invoiceReloadFlatRate2) === 0 ||
        ["", "."].includes(invoiceReturnFlatRate2) ||
        parseFloat(invoiceReturnFlatRate2) === 0);

    const isCondition4_1Met =
      mileageBreak2 === "" &&
      invoiceRates &&
      (invoiceFlatRate2 || invoiceReloadFlatRate2 || invoiceReturnFlatRate2);

    const isCondition5Met =
      mileageBreak2 !== "" &&
      driverRates &&
      (["", "."].includes(driverFlatRate2) ||
        parseFloat(driverFlatRate2) === 0 ||
        ["", "."].includes(driverReloadFlatRate2) ||
        parseFloat(driverReloadFlatRate2) === 0 ||
        ["", "."].includes(driverReturnFlatRate2) ||
        parseFloat(driverReturnFlatRate2) === 0);

    const isCondition5_1Met =
      mileageBreak2 === "" &&
      driverRates &&
      (driverFlatRate2 || driverReloadFlatRate2 || driverReturnFlatRate2);

    const isCondition6Met =
      mileageBreak3 !== "" &&
      invoiceRates &&
      (["", "."].includes(invoiceFlatRate3) ||
        parseFloat(invoiceFlatRate3) === 0 ||
        ["", "."].includes(invoiceReloadFlatRate3) ||
        parseFloat(invoiceReloadFlatRate3) === 0 ||
        ["", "."].includes(invoiceReturnFlatRate3) ||
        parseFloat(invoiceReturnFlatRate3) === 0);

    const isCondition6_1Met =
      mileageBreak3 === "" &&
      invoiceRates &&
      (invoiceFlatRate3 || invoiceReloadFlatRate3 || invoiceReturnFlatRate3);

    const isCondition7Met =
      mileageBreak3 !== "" &&
      driverRates &&
      (["", "."].includes(driverFlatRate3) ||
        parseFloat(driverFlatRate3) === 0 ||
        ["", "."].includes(driverReloadFlatRate3) ||
        parseFloat(driverReloadFlatRate3) === 0 ||
        ["", "."].includes(driverReturnFlatRate3) ||
        parseFloat(driverReturnFlatRate3) === 0);

    const isCondition7_1Met =
      mileageBreak3 === "" &&
      driverRates &&
      (driverFlatRate3 || driverReloadFlatRate3 || driverReturnFlatRate3);

    const isCondition8Met =
      mileageBreak4 !== "" &&
      invoiceRates &&
      (["", "."].includes(invoiceFlatRate4) ||
        parseFloat(invoiceFlatRate4) === 0 ||
        ["", "."].includes(invoiceReloadFlatRate4) ||
        parseFloat(invoiceReloadFlatRate4) === 0 ||
        ["", "."].includes(invoiceReturnFlatRate4) ||
        parseFloat(invoiceReturnFlatRate4) === 0);

    const isCondition8_1Met =
      mileageBreak4 === "" &&
      invoiceRates &&
      (invoiceFlatRate4 || invoiceReloadFlatRate4 || invoiceReturnFlatRate4);

    const isCondition9Met =
      mileageBreak4 !== "" &&
      driverRates &&
      (["", "."].includes(driverFlatRate4) ||
        parseFloat(driverFlatRate4) === 0 ||
        ["", "."].includes(driverReloadFlatRate4) ||
        parseFloat(driverReloadFlatRate4) === 0 ||
        ["", "."].includes(driverReturnFlatRate4) ||
        parseFloat(driverReturnFlatRate4) === 0);

    const isCondition9_1Met =
      mileageBreak4 === "" &&
      driverRates &&
      (driverFlatRate4 || driverReloadFlatRate4 || driverReturnFlatRate4);

    const isCondition10Met =
      mileageBreak5 !== "" &&
      invoiceRates &&
      (["", "."].includes(invoiceFlatRate5) ||
        parseFloat(invoiceFlatRate5) === 0 ||
        ["", "."].includes(invoiceReloadFlatRate5) ||
        parseFloat(invoiceReloadFlatRate5) === 0 ||
        ["", "."].includes(invoiceReturnFlatRate5) ||
        parseFloat(invoiceReturnFlatRate5) === 0);

    const isCondition10_1Met =
      mileageBreak5 === "" &&
      invoiceRates &&
      (invoiceFlatRate5 || invoiceReloadFlatRate5 || invoiceReturnFlatRate5);

    const isCondition11Met =
      mileageBreak5 !== "" &&
      driverRates &&
      (["", "."].includes(driverFlatRate5) ||
        parseFloat(driverFlatRate5) === 0 ||
        ["", "."].includes(driverReloadFlatRate5) ||
        parseFloat(driverReloadFlatRate5) === 0 ||
        ["", "."].includes(driverReturnFlatRate5) ||
        parseFloat(driverReturnFlatRate5) === 0);

    const isCondition11_1Met =
      mileageBreak5 === "" &&
      driverRates &&
      (driverFlatRate5 || driverReloadFlatRate5 || driverReturnFlatRate5);

    const isCondition12Met =
      mileageBreak6 !== "" &&
      invoiceRates &&
      (["", "."].includes(invoiceFlatRate6) ||
        parseFloat(invoiceFlatRate6) === 0 ||
        ["", "."].includes(invoiceReloadFlatRate6) ||
        parseFloat(invoiceReloadFlatRate6) === 0 ||
        ["", "."].includes(invoiceReturnFlatRate6) ||
        parseFloat(invoiceReturnFlatRate6) === 0);

    const isCondition12_1Met =
      mileageBreak6 === "" &&
      invoiceRates &&
      (invoiceFlatRate6 || invoiceReloadFlatRate6 || invoiceReturnFlatRate6);

    const isCondition13Met =
      mileageBreak6 !== "" &&
      driverRates &&
      (["", "."].includes(driverFlatRate6) ||
        parseFloat(driverFlatRate6) === 0 ||
        ["", "."].includes(driverReloadFlatRate6) ||
        parseFloat(driverReloadFlatRate6) === 0 ||
        ["", "."].includes(driverReturnFlatRate6) ||
        parseFloat(driverReturnFlatRate6) === 0);

    const isCondition13_1Met =
      mileageBreak6 === "" &&
      driverRates &&
      (driverFlatRate6 || driverReloadFlatRate6 || driverReturnFlatRate6);

    const isCondition14Met =
      /*       Invoice Flatrate
       */
      (invoiceFlatRate2 !== "" &&
        !isNaN(Number(invoiceFlatRate2)) &&
        Number(invoiceFlatRate2) <= Number(invoiceFlatRate1)) ||
      (invoiceFlatRate3 !== "" &&
        !isNaN(Number(invoiceFlatRate3)) &&
        Number(invoiceFlatRate3) <= Number(invoiceFlatRate2)) ||
      (invoiceFlatRate4 !== "" &&
        !isNaN(Number(invoiceFlatRate4)) &&
        Number(invoiceFlatRate4) <= Number(invoiceFlatRate3)) ||
      (invoiceFlatRate5 !== "" &&
        !isNaN(Number(invoiceFlatRate5)) &&
        Number(invoiceFlatRate5) <= Number(invoiceFlatRate4)) ||
      (invoiceFlatRate6 !== "" &&
        !isNaN(Number(invoiceFlatRate6)) &&
        Number(invoiceFlatRate6) <= Number(invoiceFlatRate5)) ||
      /*       Invoice Reload Flat Rate
       */
      (invoiceReloadFlatRate2 !== "" &&
        !isNaN(Number(invoiceReloadFlatRate2)) &&
        Number(invoiceReloadFlatRate2) <= Number(invoiceReloadFlatRate1)) ||
      (invoiceReloadFlatRate3 !== "" &&
        !isNaN(Number(invoiceReloadFlatRate3)) &&
        Number(invoiceReloadFlatRate3) <= Number(invoiceReloadFlatRate2)) ||
      (invoiceReloadFlatRate4 !== "" &&
        !isNaN(Number(invoiceReloadFlatRate4)) &&
        Number(invoiceReloadFlatRate4) <= Number(invoiceReloadFlatRate3)) ||
      (invoiceReloadFlatRate5 !== "" &&
        !isNaN(Number(invoiceReloadFlatRate5)) &&
        Number(invoiceReloadFlatRate5) <= Number(invoiceReloadFlatRate4)) ||
      (invoiceReloadFlatRate6 !== "" &&
        !isNaN(Number(invoiceReloadFlatRate6)) &&
        Number(invoiceReloadFlatRate6) <= Number(invoiceReloadFlatRate5)) ||
      /*       Invoice Return
       */
      (invoiceReturnFlatRate2 !== "" &&
        !isNaN(Number(invoiceReturnFlatRate2)) &&
        Number(invoiceReturnFlatRate2) <= Number(invoiceReturnFlatRate1)) ||
      (invoiceReturnFlatRate3 !== "" &&
        !isNaN(Number(invoiceReturnFlatRate3)) &&
        Number(invoiceReturnFlatRate3) <= Number(invoiceReturnFlatRate2)) ||
      (invoiceReturnFlatRate4 !== "" &&
        !isNaN(Number(invoiceReturnFlatRate4)) &&
        Number(invoiceReturnFlatRate4) <= Number(invoiceReturnFlatRate3)) ||
      (invoiceReturnFlatRate5 !== "" &&
        !isNaN(Number(invoiceReturnFlatRate5)) &&
        Number(invoiceReturnFlatRate5) <= Number(invoiceReturnFlatRate4)) ||
      (invoiceReturnFlatRate6 !== "" &&
        !isNaN(Number(invoiceReturnFlatRate6)) &&
        Number(invoiceReturnFlatRate6) <= Number(invoiceReturnFlatRate5)) ||
      /*       Driver Rate
       */
      (driverFlatRate2 !== "" &&
        !isNaN(Number(driverFlatRate2)) &&
        Number(driverFlatRate2) <= Number(driverFlatRate1)) ||
      (driverFlatRate3 !== "" &&
        !isNaN(Number(driverFlatRate3)) &&
        Number(driverFlatRate3) <= Number(driverFlatRate2)) ||
      (driverFlatRate4 !== "" &&
        !isNaN(Number(driverFlatRate4)) &&
        Number(driverFlatRate4) <= Number(driverFlatRate3)) ||
      (driverFlatRate5 !== "" &&
        !isNaN(Number(driverFlatRate5)) &&
        Number(driverFlatRate5) <= Number(driverFlatRate4)) ||
      (driverFlatRate6 !== "" &&
        !isNaN(Number(driverFlatRate6)) &&
        Number(driverFlatRate6) <= Number(driverFlatRate5)) ||
      /*       Driver Reload Rate
       */
      (driverReloadFlatRate2 !== "" &&
        !isNaN(Number(driverReloadFlatRate2)) &&
        Number(driverReloadFlatRate2) <= Number(driverReloadFlatRate1)) ||
      (driverReloadFlatRate3 !== "" &&
        !isNaN(Number(driverReloadFlatRate3)) &&
        Number(driverReloadFlatRate3) <= Number(driverReloadFlatRate2)) ||
      (driverReloadFlatRate4 !== "" &&
        !isNaN(Number(driverReloadFlatRate4)) &&
        Number(driverReloadFlatRate4) <= Number(driverReloadFlatRate3)) ||
      (driverReloadFlatRate5 !== "" &&
        !isNaN(Number(driverReloadFlatRate5)) &&
        Number(driverReloadFlatRate5) <= Number(driverReloadFlatRate4)) ||
      (driverReloadFlatRate6 !== "" &&
        !isNaN(Number(driverReloadFlatRate6)) &&
        Number(driverReloadFlatRate6) <= Number(driverReloadFlatRate5)) ||
      /*       Driver Return Rate
       */
      (driverReturnFlatRate2 !== "" &&
        !isNaN(Number(driverReturnFlatRate2)) &&
        Number(driverReturnFlatRate2) <= Number(driverReturnFlatRate1)) ||
      (driverReturnFlatRate3 !== "" &&
        !isNaN(Number(driverReturnFlatRate3)) &&
        Number(driverReturnFlatRate3) <= Number(driverReturnFlatRate2)) ||
      (driverReturnFlatRate4 !== "" &&
        !isNaN(Number(driverReturnFlatRate4)) &&
        Number(driverReturnFlatRate4) <= Number(driverReturnFlatRate3)) ||
      (driverReturnFlatRate5 !== "" &&
        !isNaN(Number(driverReturnFlatRate5)) &&
        Number(driverReturnFlatRate5) <= Number(driverReturnFlatRate4)) ||
      (driverReturnFlatRate6 !== "" &&
        !isNaN(Number(driverReturnFlatRate6)) &&
        Number(driverReturnFlatRate6) <= Number(driverReturnFlatRate5));

    const isCondition16Met =
      (invoiceRates &&
        driverRates &&
        driverFlatRate1 !== "" &&
        invoiceFlatRate1 &&
        Number(driverFlatRate1) > Number(invoiceFlatRate1 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverFlatRate2 !== "" &&
        invoiceFlatRate2 &&
        Number(driverFlatRate2) > Number(invoiceFlatRate2 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverFlatRate3 !== "" &&
        invoiceFlatRate3 &&
        Number(driverFlatRate3) > Number(invoiceFlatRate3 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverFlatRate4 !== "" &&
        invoiceFlatRate4 &&
        Number(driverFlatRate4) > Number(invoiceFlatRate4 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverFlatRate5 !== "" &&
        invoiceFlatRate5 &&
        Number(driverFlatRate5) > Number(invoiceFlatRate5 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverFlatRate6 !== "" &&
        invoiceFlatRate6 &&
        Number(driverFlatRate6) > Number(invoiceFlatRate6 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverRate7 !== "" &&
        invoiceRate7 &&
        Number(driverRate7) > Number(invoiceRate7 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadFlatRate1 !== "" &&
        invoiceReloadFlatRate1 &&
        Number(driverReloadFlatRate1) > Number(invoiceReloadFlatRate1 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadFlatRate2 !== "" &&
        invoiceReloadFlatRate2 &&
        Number(driverReloadFlatRate2 > Number(invoiceReloadFlatRate2 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadFlatRate3 !== "" &&
        invoiceReloadFlatRate3 &&
        Number(driverReloadFlatRate3 > Number(invoiceReloadFlatRate3 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadFlatRate4 !== "" &&
        invoiceReloadFlatRate4 &&
        Number(driverReloadFlatRate4 > Number(invoiceReloadFlatRate4 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadFlatRate5 !== "" &&
        invoiceReloadFlatRate5 &&
        Number(driverReloadFlatRate5 > Number(invoiceReloadFlatRate5 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadFlatRate6 !== "" &&
        invoiceReloadFlatRate6 &&
        Number(driverReloadFlatRate6 > Number(invoiceReloadFlatRate6 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadRate7 !== "" &&
        invoiceReloadRate7 &&
        Number(driverReloadRate7 > Number(invoiceReloadRate7 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnFlatRate1 !== "" &&
        invoiceReturnFlatRate1 &&
        Number(driverReturnFlatRate1 > Number(invoiceReturnFlatRate1 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnFlatRate2 !== "" &&
        invoiceReturnFlatRate2 &&
        Number(driverReturnFlatRate2 > Number(invoiceReturnFlatRate2 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnFlatRate3 !== "" &&
        invoiceReturnFlatRate3 &&
        Number(driverReturnFlatRate3 > Number(invoiceReturnFlatRate3 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnFlatRate4 !== "" &&
        invoiceReturnFlatRate4 &&
        Number(driverReturnFlatRate4 > Number(invoiceReturnFlatRate4 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnFlatRate5 !== "" &&
        invoiceReturnFlatRate5 &&
        Number(driverReturnFlatRate5 > Number(invoiceReturnFlatRate5 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnFlatRate6 !== "" &&
        invoiceReturnFlatRate6 &&
        Number(driverReturnFlatRate6 > Number(invoiceReturnFlatRate6 * customerInvoicePercentage))) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnRate7 !== "" &&
        invoiceReturnRate7 &&
        Number(driverReturnRate7 > Number(invoiceReturnRate7 * customerInvoicePercentage)));

    const isCondition17Met =
      !invoiceRates &&
      !driverRates &&
      (mileageBreak1 || mileageBreak2 || mileageBreak3 || mileageBreak4 || mileageBreak5 || mileageBreak6);

    const isCondition18Met =
      invoiceRates &&
      (["", "."].includes(invoiceRate7) ||
        parseFloat(invoiceRate7) === 0 ||
        ["", "."].includes(invoiceReloadRate7) ||
        parseFloat(invoiceReloadRate7) === 0 ||
        ["", "."].includes(invoiceReturnRate7) ||
        parseFloat(invoiceReturnRate7) === 0);

    const isCondition19Met =
      driverRates &&
      (["", "."].includes(driverRate7) ||
        parseFloat(driverRate7) === 0 ||
        ["", "."].includes(driverReloadRate7) ||
        parseFloat(driverReloadRate7) === 0 ||
        ["", "."].includes(driverReturnRate7) ||
        parseFloat(driverReturnRate7) === 0);

    if (
      isCondition1Met ||
      isCondition2Met ||
      isCondition3Met ||
      isCondition4Met ||
      isCondition4_1Met ||
      isCondition5Met ||
      isCondition5_1Met ||
      isCondition6Met ||
      isCondition6_1Met ||
      isCondition7Met ||
      isCondition7_1Met ||
      isCondition8Met ||
      isCondition8_1Met ||
      isCondition9Met ||
      isCondition9_1Met ||
      isCondition10Met ||
      isCondition10_1Met ||
      isCondition11Met ||
      isCondition11_1Met ||
      isCondition12Met ||
      isCondition12_1Met ||
      isCondition13Met ||
      isCondition13_1Met ||
      isCondition16Met ||
      isCondition17Met ||
      isCondition14Met ||
      isCondition18Met ||
      isCondition19Met
    ) {
      dispatch(setIsTiersFlatRateTabValid(false));
    } else {
      dispatch(setIsTiersFlatRateTabValid(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    //rates
    invoiceRates,
    driverRates,
    /*     Miles
     */
    mileageBreak1,
    mileageBreak2,
    mileageBreak3,
    mileageBreak4,
    mileageBreak5,
    mileageBreak6,
    /*  // Miles-1 */
    invoiceFlatRate1,
    invoiceReloadFlatRate1,
    invoiceReturnFlatRate1,
    invoiceRate7,
    invoiceReloadRate7,
    invoiceReturnRate7,
    driverFlatRate1,
    driverReloadFlatRate1,
    driverReturnFlatRate1,
    driverRate7,
    driverReloadRate7,
    driverReturnRate7,
    /*   //Miles-2*/
    invoiceFlatRate2,
    invoiceReloadFlatRate2,
    invoiceReturnFlatRate2,
    driverFlatRate2,
    driverReloadFlatRate2,
    driverReturnFlatRate2,
    /* Miles-3*/
    invoiceFlatRate3,
    invoiceReloadFlatRate3,
    invoiceReturnFlatRate3,
    driverFlatRate3,
    driverReloadFlatRate3,
    driverReturnFlatRate3,
    /* Miles-4*/
    invoiceFlatRate4,
    invoiceReloadFlatRate4,
    invoiceReturnFlatRate4,
    driverFlatRate4,
    driverReloadFlatRate4,
    driverReturnFlatRate4,
    /* Miles-5*/
    invoiceFlatRate5,
    invoiceReloadFlatRate5,
    invoiceReturnFlatRate5,
    driverFlatRate5,
    driverReloadFlatRate5,
    driverReturnFlatRate5,
    /*  Miles-6*/
    invoiceFlatRate6,
    invoiceReloadFlatRate6,
    invoiceReturnFlatRate6,
    driverFlatRate6,
    driverReloadFlatRate6,
    driverReturnFlatRate6,
    customerInvoicePercentage,
  ]);
  /*   Function to clear the Rates
   */
  const clearInvoiceFlatRate1Values = () => {
    dispatch(setInvoiceFlatRate1(""));
    dispatch(setInvoiceReloadFlatRate1(""));
    dispatch(setInvoiceReturnFlatRate1(""));
  };
  const clearInvoiceFlatRate2Values = () => {
    dispatch(setInvoiceFlatRate2(""));
    dispatch(setInvoiceReloadFlatRate2(""));
    dispatch(setInvoiceReturnFlatRate2(""));
  };
  const clearInvoiceFlatRate3Values = () => {
    dispatch(setInvoiceFlatRate3(""));
    dispatch(setInvoiceReloadFlatRate3(""));
    dispatch(setInvoiceReturnFlatRate3(""));
  };
  const clearInvoiceFlatRate4Values = () => {
    dispatch(setInvoiceFlatRate4(""));
    dispatch(setInvoiceReloadFlatRate4(""));
    dispatch(setInvoiceReturnFlatRate4(""));
  };
  const clearInvoiceFlatRate5Values = () => {
    dispatch(setInvoiceFlatRate5(""));
    dispatch(setInvoiceReloadFlatRate5(""));
    dispatch(setInvoiceReturnFlatRate5(""));
  };
  const clearInvoiceFlatRate6Values = () => {
    dispatch(setInvoiceFlatRate6(""));
    dispatch(setInvoiceReloadFlatRate6(""));
    dispatch(setInvoiceReturnFlatRate6(""));
  };
  const clearInvoiceFlatRate7Values = () => {
    dispatch(setInvoiceFlatRate7(""));
    dispatch(setInvoiceReloadFlatRate7(""));
    dispatch(setInvoiceReturnFlatRate7(""));
  };
  const clearDriverFlatRate1Values = () => {
    dispatch(setDriverFlatRate1(""));
    dispatch(setDriverReloadFlatRate1(""));
    dispatch(setDriverReturnFlatRate1(""));
  };
  const clearDriverFlatRate2Values = () => {
    dispatch(setDriverFlatRate2(""));
    dispatch(setDriverReloadFlatRate2(""));
    dispatch(setDriverReturnFlatRate2(""));
  };
  const clearDriverFlatRate3Values = () => {
    dispatch(setDriverFlatRate3(""));
    dispatch(setDriverReloadFlatRate3(""));
    dispatch(setDriverReturnFlatRate3(""));
  };
  const clearDriverFlatRate4Values = () => {
    dispatch(setDriverFlatRate4(""));
    dispatch(setDriverReloadFlatRate4(""));
    dispatch(setDriverReturnFlatRate4(""));
  };
  const clearDriverFlatRate5Values = () => {
    dispatch(setDriverFlatRate5(""));
    dispatch(setDriverReloadFlatRate5(""));
    dispatch(setDriverReturnFlatRate5(""));
  };
  const clearDriverFlatRate6Values = () => {
    dispatch(setDriverFlatRate6(""));
    dispatch(setDriverReloadFlatRate6(""));
    dispatch(setDriverReturnFlatRate6(""));
  };
  const clearDriverFlatRate7Values = () => {
    dispatch(setDriverFlatRate7(""));
    dispatch(setDriverReloadFlatRate7(""));
    dispatch(setDriverReturnFlatRate7(""));
  };

  /*   State Clearance
   */
  useEffect(() => {
    if (!viewDetail) {
      dispatch(setFlatRateMileageBreak1(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMilageTiers]);
  /*   clear states if Useflatrate tiers is checked
   */
  useEffect(() => {
    if (!flatRateTiers) {
      dispatch(setFlatRateMileageBreak1(""));
      dispatch(setFlatRateMileageBreak2(""));
      dispatch(setFlatRateMileageBreak3(""));
      dispatch(setFlatRateMileageBreak4(""));
      dispatch(setFlatRateMileageBreak5(""));
      dispatch(setFlatRateMileageBreak6(""));
      clearInvoiceFlatRate1Values();
      clearInvoiceFlatRate2Values();
      clearInvoiceFlatRate3Values();
      clearInvoiceFlatRate4Values();
      clearInvoiceFlatRate5Values();
      clearInvoiceFlatRate6Values();
      clearInvoiceFlatRate7Values();
      clearDriverFlatRate1Values();
      clearDriverFlatRate2Values();
      clearDriverFlatRate3Values();
      clearDriverFlatRate3Values();
      clearDriverFlatRate4Values();
      clearDriverFlatRate5Values();
      clearDriverFlatRate6Values();
      clearDriverFlatRate7Values();
      dispatch(setInvoiceFlatRateAddFS(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatRateTiers]);
  /* clear the  values if the length tiers is checked. */
  useEffect(() => {
    if (!flatRateTiers && useLengthTiers) {
      dispatch(setFlatRateMileageBreak1(""));
      dispatch(setFlatRateMileageBreak2(""));
      dispatch(setFlatRateMileageBreak3(""));
      dispatch(setFlatRateMileageBreak4(""));
      dispatch(setFlatRateMileageBreak5(""));
      dispatch(setFlatRateMileageBreak6(""));
      clearInvoiceFlatRate1Values();
      clearInvoiceFlatRate2Values();
      clearInvoiceFlatRate3Values();
      clearInvoiceFlatRate4Values();
      clearInvoiceFlatRate5Values();
      clearInvoiceFlatRate6Values();
      clearInvoiceFlatRate7Values();
      clearDriverFlatRate1Values();
      clearDriverFlatRate2Values();
      clearDriverFlatRate3Values();
      clearDriverFlatRate3Values();
      clearDriverFlatRate4Values();
      clearDriverFlatRate5Values();
      clearDriverFlatRate6Values();
      clearDriverFlatRate7Values();
      dispatch(setInvoiceFlatRateAddFS(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatRateTiers, useLengthTiers]);

  /*   clear the rates on Tab away of Mileage break 2 and no higher rates are present
   */
  const clearRatesOnMileageBreak2 = () => {
    if (
      !mileageBreak2 &&
      !mileageBreak3 &&
      ((invoiceRates && !hasInvoiceFlatRate3) || (driverRates && !hasDriverFlatRate3)) &&
      !mileageBreak4 &&
      ((invoiceRates && !hasInvoiceFlatRate4) || (driverRates && !hasDriverFlatRate4)) &&
      !mileageBreak5 &&
      ((invoiceRates && !hasInvoiceFlatRate5) || (driverRates && !hasDriverFlatRate5)) &&
      !mileageBreak6 &&
      ((invoiceRates && !hasInvoiceFlatRate6) || (driverRates && !hasDriverFlatRate6))
    ) {
      clearInvoiceFlatRate2Values();
      clearDriverFlatRate2Values();
    }
  };

  /*   clear the rates on Tab away of Mileage break 3 and no higher rates are present
   */
  const clearRatesOnMileageBreak3 = () => {
    if (
      !mileageBreak3 &&
      !mileageBreak4 &&
      ((invoiceRates && !hasInvoiceFlatRate4) || (driverRates && !hasDriverFlatRate4)) &&
      !mileageBreak5 &&
      ((invoiceRates && !hasInvoiceFlatRate5) || (driverRates && !hasDriverFlatRate5)) &&
      !mileageBreak6 &&
      ((invoiceRates && !hasInvoiceFlatRate6) || (driverRates && !hasDriverFlatRate6))
    ) {
      clearInvoiceFlatRate3Values();
      clearDriverFlatRate3Values();
    }
  };

  /*   clear the rates on Tab away of Mileage break 4 and no higher rates are present
   */
  const clearRatesOnMileageBreak4 = () => {
    if (
      !mileageBreak4 &&
      !mileageBreak5 &&
      ((invoiceRates && !hasInvoiceFlatRate5) || (driverRates && !hasDriverFlatRate5)) &&
      !mileageBreak6 &&
      ((invoiceRates && !hasInvoiceFlatRate6) || (driverRates && !hasDriverFlatRate6))
    ) {
      clearInvoiceFlatRate4Values();
      clearDriverFlatRate4Values();
    }
  };
  /*   clear the rates on Tab away of Mileage Break 5 and no higher rates are present
   */
  const clearRatesOnMileageBreak5 = () => {
    if (
      !mileageBreak5 &&
      !mileageBreak6 &&
      ((invoiceRates && !hasInvoiceFlatRate6) || (driverRates && !hasDriverFlatRate6))
    ) {
      clearInvoiceFlatRate5Values();
      clearDriverFlatRate5Values();
    }
  };
  /*   clear the rates on Tab away of Mileage break 6 and no higher rates are present
   */
  const clearRatesOnMileageBreak6 = () => {
    if (!mileageBreak6) {
      clearInvoiceFlatRate6Values();
      clearDriverFlatRate6Values();
    }
  };
  /*  State Clearance
   */
  useEffect(() => {
    if (!viewDetail) {
      dispatch(setFlatRateMileageBreak1(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatRateTiers]);
  /*   Clear all driver rates when the driver rate flag is unchecked
   */
  useEffect(() => {
    clearDriverFlatRate1Values();
    clearDriverFlatRate2Values();
    clearDriverFlatRate3Values();
    clearDriverFlatRate4Values();
    clearDriverFlatRate5Values();
    clearDriverFlatRate6Values();
    clearDriverFlatRate7Values();
  }, [driverRates]);
  /* clear all invoice rates when the Invoice rates flag is unchecked
   */
  useEffect(() => {
    clearInvoiceFlatRate1Values();
    clearInvoiceFlatRate2Values();
    clearInvoiceFlatRate3Values();
    clearInvoiceFlatRate4Values();
    clearInvoiceFlatRate5Values();
    clearInvoiceFlatRate6Values();
    clearInvoiceFlatRate7Values();
  }, [invoiceRates]);
  return (
    <div className="p-1 w-100">
      <Row className="m-0 p-0">
        <Col sm={12} md={12} lg={12} xl={12} xs={12}>
          <Form.Group
            className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-evenly  row m-l-0 m-r-0"
            style={{ position: "relative" }}
          >
            <Col xs={1} sm={1} md={1} className="p-0"></Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              Tier #1
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              Tier #2
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              Tier #3
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              Tier #4
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              Tier #5
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              Tier #6
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px" style={{ position: "absolute", right: 0 }}>
              Default
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-evenly  row m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0">
              <Form.Label className="col-form-label dealer-label">Miles</Form.Label>
            </Col>
            {/* MileageBreak1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || !flatRateTiers
                    ? "borderBlack"
                    : mileageBreak1 === "" || mileageBreak1 > 32767 || parseInt(mileageBreak1) === 0
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={5}
                name="mileageBreak1"
                value={mileageBreak1}
                disabled={!useMilageTiers || viewDetail || !flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setFlatRateMileageBreak1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* MileageBreak2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  !flatRateTiers ||
                  ((mileageBreak1 === "" || mileageBreak2 === "") &&
                    ((invoiceRates && !hasInvoiceFlatRate2) || (driverRates && !hasDriverFlatRate2)))
                    ? "borderBlack"
                    : Number(mileageBreak2) <= Number(mileageBreak1) || mileageBreak2 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="mileageBreak2"
                maxLength={5}
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={mileageBreak2}
                disabled={!useMilageTiers || viewDetail || !flatRateTiers}
                onBlur={(e) => {
                  clearRatesOnMileageBreak2();
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setFlatRateMileageBreak2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* MileageBreak3 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  ((mileageBreak2 === "" ||
                    mileageBreak3 === "" ||
                    Number(mileageBreak2) <= Number(mileageBreak1)) &&
                    ((invoiceRates && !hasInvoiceFlatRate3) || (driverRates && !hasDriverFlatRate3)))
                    ? "borderBlack"
                    : Number(mileageBreak3) <= Number(mileageBreak2) || mileageBreak3 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="mileageBreak3"
                maxLength={5}
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={mileageBreak3}
                disabled={
                  !useMilageTiers ||
                  viewDetail ||
                  (mileageBreak2 === "" &&
                    !mileageBreak3 &&
                    ((invoiceRates && !hasInvoiceFlatRate3) || (driverRates && !hasDriverFlatRate3))) ||
                  (Number(mileageBreak2) <= Number(mileageBreak1) &&
                    !mileageBreak3 &&
                    ((invoiceRates && !hasInvoiceFlatRate3) || (driverRates && !hasDriverFlatRate3)))
                }
                onBlur={(e) => {
                  clearRatesOnMileageBreak3();
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setFlatRateMileageBreak3(enteredValue));
                  }
                }}
              />
            </Col>
            {/* MileageBreak4 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  ((mileageBreak3 === "" ||
                    mileageBreak4 === "" ||
                    Number(mileageBreak3) <= Number(mileageBreak2)) &&
                    ((invoiceRates && !hasInvoiceFlatRate4) || (driverRates && !hasDriverFlatRate4)))
                    ? "borderBlack"
                    : Number(mileageBreak4) <= Number(mileageBreak3) || mileageBreak4 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="mileageBreak4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                maxLength={5}
                value={mileageBreak4}
                disabled={
                  !useMilageTiers ||
                  viewDetail ||
                  (mileageBreak3 === "" &&
                    !mileageBreak4 &&
                    ((invoiceRates && !hasInvoiceFlatRate4) || (driverRates && !hasDriverFlatRate4))) ||
                  (Number(mileageBreak3) <= Number(mileageBreak2) &&
                    !mileageBreak4 &&
                    ((invoiceRates && !hasInvoiceFlatRate4) || (driverRates && !hasDriverFlatRate4)))
                }
                onBlur={(e) => {
                  clearRatesOnMileageBreak4();
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setFlatRateMileageBreak4(enteredValue));
                  }
                }}
              />
            </Col>
            {/* MileageBreak5 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  ((mileageBreak4 === "" ||
                    mileageBreak5 === "" ||
                    Number(mileageBreak4) <= Number(mileageBreak3)) &&
                    ((invoiceRates && !hasInvoiceFlatRate5) || (driverRates && !hasDriverFlatRate5)))
                    ? "borderBlack"
                    : Number(mileageBreak5) <= Number(mileageBreak4) || mileageBreak5 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="mileageBreak5"
                maxLength={5}
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={mileageBreak5}
                disabled={
                  !useMilageTiers ||
                  viewDetail ||
                  (mileageBreak4 === "" &&
                    !mileageBreak5 &&
                    ((invoiceRates && !hasInvoiceFlatRate5) || (driverRates && !hasDriverFlatRate5))) ||
                  (Number(mileageBreak4) <= Number(mileageBreak3) &&
                    !mileageBreak5 &&
                    ((invoiceRates && !hasInvoiceFlatRate5) || (driverRates && !hasDriverFlatRate5)))
                }
                onBlur={(e) => {
                  clearRatesOnMileageBreak5();
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setFlatRateMileageBreak5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* MileageBreak6 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  ((mileageBreak5 === "" ||
                    mileageBreak6 === "" ||
                    Number(mileageBreak5) <= Number(mileageBreak4)) &&
                    ((invoiceRates && !hasInvoiceFlatRate6) || (driverRates && !hasDriverFlatRate6)))
                    ? "borderBlack"
                    : Number(mileageBreak6) <= Number(mileageBreak5) || mileageBreak6 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="mileageBreak6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={mileageBreak6}
                maxLength={5}
                disabled={
                  !useMilageTiers ||
                  viewDetail ||
                  (mileageBreak5 === "" &&
                    !mileageBreak6 &&
                    ((invoiceRates && !hasInvoiceFlatRate6) || (driverRates && !hasDriverFlatRate6))) ||
                  (Number(mileageBreak5) <= Number(mileageBreak4) &&
                    !mileageBreak6 &&
                    ((invoiceRates && !hasInvoiceFlatRate6) || (driverRates && !hasDriverFlatRate6)))
                }
                onBlur={(e) => {
                  clearRatesOnMileageBreak6();
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setFlatRateMileageBreak6(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0">
              <Form.Label className="col-form-label ">Invoice Outbound</Form.Label>
            </Col>
            {/* Invoice Outbound-1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates
                    ? "borderBlack"
                    : invoiceFlatRate1 === "" ||
                        (invoiceFlatRate2 && Number(invoiceFlatRate2) <= Number(invoiceFlatRate1)) ||
                        parseFloat(invoiceFlatRate1) === 0 ||
                        invoiceFlatRate1 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceFlatRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceFlatRate1}
                disabled={!flatRateTiers || !invoiceRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceFlatRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Outbound-2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak2 && !invoiceFlatRate2)
                    ? "borderBlack"
                    : invoiceFlatRate2 === "" ||
                        (invoiceFlatRate3 && Number(invoiceFlatRate3) <= Number(invoiceFlatRate2)) ||
                        Number(invoiceFlatRate2) <= Number(invoiceFlatRate1) ||
                        parseFloat(invoiceFlatRate2) === 0 ||
                        invoiceFlatRate2 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceFlatRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceFlatRate2}
                disabled={
                  !flatRateTiers || !invoiceRates || viewDetail || (mileageBreak2 === "" && !invoiceFlatRate2)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceFlatRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Outbound-3 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak3 && !invoiceFlatRate3)
                    ? "borderBlack"
                    : invoiceFlatRate3 === "" ||
                        Number(invoiceFlatRate3) <= Number(invoiceFlatRate2) ||
                        (invoiceFlatRate4 && Number(invoiceFlatRate4) <= Number(invoiceFlatRate3)) ||
                        parseFloat(invoiceFlatRate3) === 0 ||
                        invoiceFlatRate3 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceFlatRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceFlatRate3}
                disabled={
                  !flatRateTiers || !invoiceRates || viewDetail || (mileageBreak3 === "" && !invoiceFlatRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceFlatRate3(enteredValue));
                  }
                }}
              />
            </Col>

            {/* Invoice Outbound-4 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak4 && !invoiceFlatRate4)
                    ? "borderBlack"
                    : invoiceFlatRate4 === "" ||
                        Number(invoiceFlatRate4) <= Number(invoiceFlatRate3) ||
                        (invoiceFlatRate5 && Number(invoiceFlatRate5) <= Number(invoiceFlatRate4)) ||
                        parseFloat(invoiceFlatRate4) === 0 ||
                        invoiceFlatRate4 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceFlatRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceFlatRate4}
                disabled={
                  !flatRateTiers || !invoiceRates || viewDetail || (mileageBreak4 === "" && !invoiceFlatRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceFlatRate4(enteredValue));
                  }
                }}
              />
            </Col>

            {/* Invoice Outbound-5 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak5 && !invoiceFlatRate5)
                    ? "borderBlack"
                    : invoiceFlatRate5 === "" ||
                        Number(invoiceFlatRate5) <= Number(invoiceFlatRate4) ||
                        (invoiceFlatRate6 && Number(invoiceFlatRate6) <= Number(invoiceFlatRate5)) ||
                        parseFloat(invoiceFlatRate5) === 0 ||
                        invoiceFlatRate5 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceFlatRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceFlatRate5}
                disabled={
                  !flatRateTiers || !invoiceRates || viewDetail || (mileageBreak5 === "" && !invoiceFlatRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceFlatRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Outbound-6 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak6 && !invoiceFlatRate6)
                    ? "borderBlack"
                    : invoiceFlatRate6 === "" ||
                        Number(invoiceFlatRate6) <= Number(invoiceFlatRate5) ||
                        parseFloat(invoiceFlatRate6) === 0 ||
                        invoiceFlatRate6 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceFlatRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceFlatRate6}
                disabled={
                  !flatRateTiers || !invoiceRates || viewDetail || (mileageBreak6 === "" && !invoiceFlatRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceFlatRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Outbound-7 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates
                    ? "borderBlack"
                    : invoiceRate7 === "" || parseFloat(invoiceRate7) === 0 || invoiceRate7 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceRate7"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceRate7}
                disabled={!flatRateTiers || !invoiceRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceFlatRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/* Invoice Reload */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0  w-20px">
              <Form.Label className="col-form-label ">Invoice Reload</Form.Label>
            </Col>
            {/* Invoice Reload -1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates
                    ? "borderBlack"
                    : invoiceReloadFlatRate1 === "" ||
                        parseFloat(invoiceReloadFlatRate1) === 0 ||
                        invoiceReloadFlatRate1 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadFlatRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadFlatRate1}
                disabled={!flatRateTiers || !invoiceRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReloadFlatRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak2 && !invoiceReloadFlatRate2)
                    ? "borderBlack"
                    : invoiceReloadFlatRate2 === "" ||
                        Number(invoiceReloadFlatRate2) <= Number(invoiceReloadFlatRate1) ||
                        parseFloat(invoiceReloadFlatRate2) === 0 ||
                        invoiceReloadFlatRate2 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadFlatRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadFlatRate2}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak2 === "" && !invoiceReloadFlatRate2)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReloadFlatRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -3 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak3 && !invoiceReloadFlatRate3)
                    ? "borderBlack"
                    : invoiceReloadFlatRate3 === "" ||
                        Number(invoiceReloadFlatRate3) <= Number(invoiceReloadFlatRate2) ||
                        parseFloat(invoiceReloadFlatRate3) === 0 ||
                        invoiceReloadFlatRate3 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadFlatRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadFlatRate3}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak3 === "" && !invoiceReloadFlatRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReloadFlatRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -4 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak4 && !invoiceReloadFlatRate4)
                    ? "borderBlack"
                    : invoiceReloadFlatRate4 === "" ||
                        Number(invoiceReloadFlatRate4) <= Number(invoiceReloadFlatRate3) ||
                        parseFloat(invoiceReloadFlatRate4) === 0 ||
                        invoiceReloadFlatRate4 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadFlatRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadFlatRate4}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak4 === "" && !invoiceReloadFlatRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReloadFlatRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -5 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak5 && !invoiceReloadFlatRate5)
                    ? "borderBlack"
                    : invoiceReloadFlatRate5 === "" ||
                        Number(invoiceReloadFlatRate5) <= Number(invoiceReloadFlatRate4) ||
                        parseFloat(invoiceReloadFlatRate5) === 0 ||
                        invoiceReloadFlatRate5 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadFlatRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadFlatRate5}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak5 === "" && !invoiceReloadFlatRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReloadFlatRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -6 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak6 && !invoiceReloadFlatRate6)
                    ? "borderBlack"
                    : invoiceReloadFlatRate6 === "" ||
                        Number(invoiceReloadFlatRate6) <= Number(invoiceReloadFlatRate5) ||
                        parseFloat(invoiceReloadFlatRate6) === 0 ||
                        invoiceReloadFlatRate6 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadFlatRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadFlatRate6}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak6 === "" && !invoiceReloadFlatRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReloadFlatRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -7 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates
                    ? "borderBlack"
                    : invoiceReloadRate7 === "" ||
                        parseFloat(invoiceReloadRate7) === 0 ||
                        invoiceReloadRate7 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadRate7"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadRate7}
                disabled={!flatRateTiers || !invoiceRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReloadFlatRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/* Invoice Return */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0 ">
              <Form.Label className="col-form-label ">Invoice Return</Form.Label>
            </Col>
            {/* Invoice Return-1*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates
                    ? "borderBlack"
                    : invoiceReturnFlatRate1 === "" ||
                        parseFloat(invoiceReturnFlatRate1) === 0 ||
                        invoiceReturnFlatRate1 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnFlatRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnFlatRate1}
                disabled={!flatRateTiers || !invoiceRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReturnFlatRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-2*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak2 && !invoiceReturnFlatRate2)
                    ? "borderBlack"
                    : invoiceReturnFlatRate2 === "" ||
                        Number(invoiceReturnFlatRate2) <= Number(invoiceReturnFlatRate1) ||
                        parseFloat(invoiceReturnFlatRate2) === 0 ||
                        invoiceReturnFlatRate2 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnFlatRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnFlatRate2}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak2 === "" && !invoiceReturnFlatRate2)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReturnFlatRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-3*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak3 && !invoiceReturnFlatRate3)
                    ? "borderBlack"
                    : invoiceReturnFlatRate3 === "" ||
                        Number(invoiceReturnFlatRate3) <= Number(invoiceReturnFlatRate2) ||
                        parseFloat(invoiceReturnFlatRate3) === 0 ||
                        invoiceReturnFlatRate3 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnFlatRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnFlatRate3}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak3 === "" && !invoiceReturnFlatRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReturnFlatRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-4*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak4 && !invoiceReturnFlatRate4)
                    ? "borderBlack"
                    : invoiceReturnFlatRate4 === "" ||
                        Number(invoiceReturnFlatRate4) <= Number(invoiceReturnFlatRate3) ||
                        parseFloat(invoiceReturnFlatRate4) === 0 ||
                        invoiceReturnFlatRate4 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnFlatRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnFlatRate4}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak4 === "" && !invoiceReturnFlatRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReturnFlatRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-5*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak5 && !invoiceReturnFlatRate5)
                    ? "borderBlack"
                    : invoiceReturnFlatRate5 === "" ||
                        Number(invoiceReturnFlatRate5) <= Number(invoiceReturnFlatRate4) ||
                        parseFloat(invoiceReturnFlatRate5) === 0 ||
                        invoiceReturnFlatRate5 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnFlatRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnFlatRate5}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak5 === "" && !invoiceReturnFlatRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReturnFlatRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-6*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates || (!mileageBreak6 && !invoiceReturnFlatRate6)
                    ? "borderBlack"
                    : invoiceReturnFlatRate6 === "" ||
                        Number(invoiceReturnFlatRate6) <= Number(invoiceReturnFlatRate5) ||
                        parseFloat(invoiceReturnFlatRate6) === 0 ||
                        invoiceReturnFlatRate6 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnFlatRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnFlatRate6}
                disabled={
                  !flatRateTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  (mileageBreak6 === "" && !invoiceReturnFlatRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setInvoiceReturnFlatRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-7*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !invoiceRates
                    ? "borderBlack"
                    : invoiceReturnRate7 === "" ||
                        parseFloat(invoiceReturnRate7) === 0 ||
                        invoiceReturnRate7 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnRate7"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnRate7}
                disabled={!flatRateTiers || !invoiceRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReturnFlatRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/* Driver Outbound */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0 ">
              <Form.Label className="col-form-label ">Driver Outbound</Form.Label>
            </Col>
            {/* Driver Outbound - 1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates
                    ? "borderBlack"
                    : driverFlatRate1 === "" ||
                        (invoiceRates &&
                          invoiceFlatRate1 &&
                          Number(driverFlatRate1) > Number(invoiceFlatRate1 * customerInvoicePercentage)) ||
                        parseFloat(driverFlatRate1) === 0 ||
                        driverFlatRate1 === "." ||
                        (invoiceRates && !invoiceFlatRate1)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverFlatRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverFlatRate1}
                disabled={!flatRateTiers || !driverRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverFlatRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak2 && !driverFlatRate2)
                    ? "borderBlack"
                    : driverFlatRate2 === "" ||
                        driverFlatRate2 === "." ||
                        Number(driverFlatRate2) <= Number(driverFlatRate1) ||
                        (invoiceRates &&
                          invoiceFlatRate2 &&
                          Number(driverFlatRate2) > Number(invoiceFlatRate2 * customerInvoicePercentage)) ||
                        parseFloat(driverFlatRate2) === 0 ||
                        (invoiceRates && !invoiceFlatRate2)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverFlatRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverFlatRate2}
                disabled={
                  !flatRateTiers || !driverRates || viewDetail || (mileageBreak2 === "" && !driverFlatRate2)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverFlatRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 3 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak3 && !driverFlatRate3)
                    ? "borderBlack"
                    : driverFlatRate3 === "" ||
                        driverFlatRate3 === "." ||
                        Number(driverFlatRate3) <= Number(driverFlatRate2) ||
                        (invoiceRates &&
                          invoiceFlatRate3 &&
                          Number(driverFlatRate3) > Number(invoiceFlatRate3 * customerInvoicePercentage)) ||
                        parseFloat(driverFlatRate3) === 0 ||
                        (invoiceRates && !invoiceFlatRate3)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverFlatRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverFlatRate3}
                disabled={
                  !flatRateTiers || !driverRates || viewDetail || (mileageBreak3 === "" && !driverFlatRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverFlatRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 4 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak4 && !driverFlatRate4)
                    ? "borderBlack"
                    : driverFlatRate4 === "" ||
                        driverFlatRate4 === "." ||
                        Number(driverFlatRate4) <= Number(driverFlatRate3) ||
                        (invoiceRates &&
                          invoiceFlatRate4 &&
                          Number(driverFlatRate4) > Number(invoiceFlatRate4 * customerInvoicePercentage)) ||
                        parseFloat(driverFlatRate4) === 0 ||
                        (invoiceRates && !invoiceFlatRate4)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverFlatRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverFlatRate4}
                disabled={
                  !flatRateTiers || !driverRates || viewDetail || (mileageBreak4 === "" && !driverFlatRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverFlatRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 5 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak5 && !driverFlatRate5)
                    ? "borderBlack"
                    : driverFlatRate5 === "" ||
                        driverFlatRate5 === "." ||
                        Number(driverFlatRate5) <= Number(driverFlatRate4) ||
                        (invoiceRates &&
                          invoiceFlatRate5 &&
                          Number(driverFlatRate5) > Number(invoiceFlatRate5 * customerInvoicePercentage)) ||
                        parseFloat(driverFlatRate5) === 0 ||
                        (invoiceRates && !invoiceFlatRate5)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverFlatRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverFlatRate5}
                disabled={
                  !flatRateTiers || !driverRates || viewDetail || (mileageBreak5 === "" && !driverFlatRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverFlatRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 6 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak6 && !driverFlatRate6)
                    ? "borderBlack"
                    : driverFlatRate6 === "" ||
                        driverFlatRate6 === "." ||
                        Number(driverFlatRate6) <= Number(driverFlatRate5) ||
                        (invoiceRates &&
                          invoiceFlatRate6 &&
                          Number(driverFlatRate6) > Number(invoiceFlatRate6 * customerInvoicePercentage)) ||
                        parseFloat(driverFlatRate6) === 0 ||
                        (invoiceRates && !invoiceFlatRate6)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverFlatRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverFlatRate6}
                disabled={
                  !flatRateTiers || !driverRates || viewDetail || (mileageBreak6 === "" && !driverFlatRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverFlatRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 7 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates
                    ? "borderBlack"
                    : driverRate7 === "" ||
                        driverRate7 === "." ||
                        (invoiceRates &&
                          invoiceRate7 &&
                          Number(driverRate7) > Number(invoiceRate7 * customerInvoicePercentage)) ||
                        parseFloat(driverRate7) === 0 ||
                        (invoiceRates && !invoiceRate7)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverRate7"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverRate7}
                disabled={!flatRateTiers || !driverRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverFlatRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/* Driver Reload */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0 ">
              <Form.Label className="col-form-label ">Driver Reload</Form.Label>
            </Col>
            {/* Driver Reload -1*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates
                    ? "borderBlack"
                    : driverReloadFlatRate1 === "" ||
                        driverReloadFlatRate1 === "." ||
                        (invoiceRates &&
                          invoiceReloadFlatRate1 &&
                          Number(driverReloadFlatRate1) >
                            Number(invoiceReloadFlatRate1 * customerInvoicePercentage)) ||
                        parseFloat(driverReloadFlatRate1) === 0 ||
                        (invoiceRates && !invoiceReloadFlatRate1)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadFlatRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadFlatRate1}
                disabled={!flatRateTiers || !driverRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReloadFlatRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -2*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak2 && !driverReloadFlatRate2)
                    ? "borderBlack"
                    : driverReloadFlatRate2 === "" ||
                        driverReloadFlatRate2 === "." ||
                        (invoiceRates &&
                          invoiceReloadFlatRate2 &&
                          Number(driverReloadFlatRate2) >
                            Number(invoiceReloadFlatRate2 * customerInvoicePercentage)) ||
                        Number(driverReloadFlatRate2) <= Number(driverReloadFlatRate1) ||
                        parseFloat(driverReloadFlatRate2) === 0 ||
                        (invoiceRates && !invoiceReloadFlatRate2)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadFlatRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadFlatRate2}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak2 === "" && !driverReloadFlatRate2)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReloadFlatRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -3*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak3 && !driverReloadFlatRate3)
                    ? "borderBlack"
                    : driverReloadFlatRate3 === "" ||
                        driverReloadFlatRate3 === "." ||
                        (invoiceRates &&
                          invoiceReloadFlatRate3 &&
                          Number(driverReloadFlatRate3) >
                            Number(invoiceReloadFlatRate3 * customerInvoicePercentage)) ||
                        Number(driverReloadFlatRate3) <= Number(driverReloadFlatRate2) ||
                        parseFloat(driverReloadFlatRate3) === 0 ||
                        (invoiceRates && !invoiceReloadFlatRate3)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadFlatRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadFlatRate3}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak3 === "" && !driverReloadFlatRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReloadFlatRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -4*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak4 && !driverReloadFlatRate4)
                    ? "borderBlack"
                    : driverReloadFlatRate4 === "" ||
                        driverReloadFlatRate4 === "." ||
                        (invoiceRates &&
                          invoiceReloadFlatRate4 &&
                          Number(driverReloadFlatRate4) >
                            Number(invoiceReloadFlatRate4 * customerInvoicePercentage)) ||
                        Number(driverReloadFlatRate4) <= Number(driverReloadFlatRate3) ||
                        parseFloat(driverReloadFlatRate4) === 0 ||
                        (invoiceRates && !invoiceReloadFlatRate4)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadFlatRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadFlatRate4}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak4 === "" && !driverReloadFlatRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReloadFlatRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -5*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak5 && !driverReloadFlatRate5)
                    ? "borderBlack"
                    : driverReloadFlatRate5 === "" ||
                        driverReloadFlatRate5 === "." ||
                        (invoiceRates &&
                          invoiceReloadFlatRate5 &&
                          Number(driverReloadFlatRate5) >
                            Number(invoiceReloadFlatRate5 * customerInvoicePercentage)) ||
                        Number(driverReloadFlatRate5) <= Number(driverReloadFlatRate4) ||
                        parseFloat(driverReloadFlatRate5) === 0 ||
                        (invoiceRates && !invoiceReloadFlatRate5)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadFlatRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadFlatRate5}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak5 === "" && !driverReloadFlatRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReloadFlatRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -6*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers ||
                  viewDetail ||
                  !driverRates ||
                  (mileageBreak6 === "" && !driverReloadFlatRate6)
                    ? "borderBlack"
                    : driverReloadFlatRate6 === "" ||
                        driverReloadFlatRate6 === "." ||
                        (invoiceRates &&
                          invoiceReloadFlatRate6 &&
                          Number(driverReloadFlatRate6) >
                            Number(invoiceReloadFlatRate6 * customerInvoicePercentage)) ||
                        Number(driverReloadFlatRate6) <= Number(driverReloadFlatRate5) ||
                        parseFloat(driverReloadFlatRate6) === 0 ||
                        (invoiceRates && !invoiceReloadFlatRate6)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadFlatRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadFlatRate6}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak6 === "" && !driverReloadFlatRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReloadFlatRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -7*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates
                    ? "borderBlack"
                    : driverReloadRate7 === "" ||
                        driverReloadRate7 === "." ||
                        (invoiceRates &&
                          invoiceReloadRate7 &&
                          Number(driverReloadRate7) >
                            Number(invoiceReloadRate7 * customerInvoicePercentage)) ||
                        parseFloat(driverReloadRate7) === 0 ||
                        (invoiceRates && !invoiceRate7)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadRate7"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadRate7}
                disabled={!flatRateTiers || !driverRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReloadFlatRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/*Driver Return*/}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0 ">
              <Form.Label className="col-form-label ">Driver Return</Form.Label>
            </Col>
            {/*Driver Return -1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates
                    ? "borderBlack"
                    : driverReturnFlatRate1 === "" ||
                        driverReturnFlatRate1 === "." ||
                        (invoiceRates &&
                          invoiceReturnFlatRate1 &&
                          Number(driverReturnFlatRate1) >
                            Number(invoiceReturnFlatRate1 * customerInvoicePercentage)) ||
                        parseFloat(driverReturnFlatRate1) === 0 ||
                        (invoiceRates && !invoiceReturnFlatRate1)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnFlatRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnFlatRate1}
                disabled={!flatRateTiers || !driverRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReturnFlatRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak2 && !driverReturnFlatRate2)
                    ? "borderBlack"
                    : driverReturnFlatRate2 === "" ||
                        driverReturnFlatRate2 === "." ||
                        (invoiceRates &&
                          invoiceReturnFlatRate2 &&
                          Number(driverReturnFlatRate2) >
                            Number(invoiceReturnFlatRate2 * customerInvoicePercentage)) ||
                        Number(driverReturnFlatRate2) <= Number(driverReturnFlatRate1) ||
                        parseFloat(driverReturnFlatRate2) === 0 ||
                        (invoiceRates && !invoiceReturnFlatRate2)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnFlatRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnFlatRate2}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak2 === "" && !driverReturnFlatRate2)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReturnFlatRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -3 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak3 && !driverReturnFlatRate3)
                    ? "borderBlack"
                    : driverReturnFlatRate3 === "" ||
                        driverReturnFlatRate3 === "." ||
                        (invoiceRates &&
                          invoiceReturnFlatRate3 &&
                          Number(driverReturnFlatRate3) >
                            Number(invoiceReturnFlatRate3 * customerInvoicePercentage)) ||
                        Number(driverReturnFlatRate3) <= Number(driverReturnFlatRate2) ||
                        parseFloat(driverReturnFlatRate3) === 0 ||
                        (invoiceRates && !invoiceReturnFlatRate3)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnFlatRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnFlatRate3}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak3 === "" && !driverReturnFlatRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReturnFlatRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -4 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak4 && !driverReturnFlatRate4)
                    ? "borderBlack"
                    : driverReturnFlatRate4 === "" ||
                        driverReturnFlatRate4 === "." ||
                        (invoiceRates &&
                          invoiceReturnFlatRate4 &&
                          Number(driverReturnFlatRate4) >
                            Number(invoiceReturnFlatRate4 * customerInvoicePercentage)) ||
                        Number(driverReturnFlatRate4) <= Number(driverReturnFlatRate3) ||
                        parseFloat(driverReturnFlatRate4) === 0 ||
                        (invoiceRates && !invoiceReturnFlatRate4)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnFlatRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnFlatRate4}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak4 === "" && !driverReturnFlatRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReturnFlatRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -5 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak5 && !driverReturnFlatRate5)
                    ? "borderBlack"
                    : driverReturnFlatRate5 === "" ||
                        driverReturnFlatRate5 === "." ||
                        (invoiceRates &&
                          invoiceReturnFlatRate5 &&
                          Number(driverReturnFlatRate5) >
                            Number(invoiceReturnFlatRate5 * customerInvoicePercentage)) ||
                        Number(driverReturnFlatRate5) <= Number(driverReturnFlatRate4) ||
                        parseFloat(driverReturnFlatRate5) === 0 ||
                        (invoiceRates && !invoiceReturnFlatRate5)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnFlatRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnFlatRate5}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak5 === "" && !driverReturnFlatRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReturnFlatRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -6 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates || (!mileageBreak6 && !driverReturnFlatRate6)
                    ? "borderBlack"
                    : driverReturnFlatRate6 === "" ||
                        driverReturnFlatRate6 === "." ||
                        (invoiceRates &&
                          invoiceReturnFlatRate6 &&
                          Number(driverReturnFlatRate6) >
                            Number(invoiceReturnFlatRate6 * customerInvoicePercentage)) ||
                        Number(driverReturnFlatRate6) <= Number(driverReturnFlatRate5) ||
                        parseFloat(driverReturnFlatRate6) === 0 ||
                        (invoiceRates && !invoiceReturnFlatRate6)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnFlatRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnFlatRate6}
                disabled={
                  !flatRateTiers ||
                  !driverRates ||
                  viewDetail ||
                  (mileageBreak6 === "" && !driverReturnFlatRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    dispatch(setDriverReturnFlatRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -7 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !flatRateTiers || viewDetail || !driverRates
                    ? "borderBlack"
                    : driverReturnRate7 === "" ||
                        driverReturnRate7 === "." ||
                        (invoiceRates &&
                          invoiceReturnRate7 &&
                          Number(driverReturnRate7) >
                            Number(invoiceReturnRate7 * customerInvoicePercentage)) ||
                        parseFloat(driverReturnRate7) === 0 ||
                        (invoiceRates && !invoiceReturnRate7)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnRate7"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnRate7}
                disabled={!flatRateTiers || !driverRates || viewDetail}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReturnFlatRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/* Add Fuel Surcharge */}
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} md={2} className="p-0">
              <Form.Label className="col-form-label dealer-label w-300">Add Fuel Surcharge</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2}>
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="invoiceFlatRateAddFS"
                value={invoiceFlatRateAddFS}
                checked={invoiceFlatRateAddFS}
                disabled={
                  viewDetail ||
                  !flatRateTiers ||
                  (!invoiceFuelSurchargeGas &&
                    !invoiceFuelSurchargeDiesel &&
                    !invoiceFuelSurchargeGasCanada &&
                    !invoiceFuelSurchargeDieselCanada &&
                    !driverFuelSurchargeGas &&
                    !driverFuelSurchargeDiesel &&
                    !driverFuelSurchargeGasCanada &&
                    !driverFuelSurchargeDieselCanada)
                }
                onChange={(e) => dispatch(setInvoiceFlatRateAddFS(e.target.checked))}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FlatRateTab;
