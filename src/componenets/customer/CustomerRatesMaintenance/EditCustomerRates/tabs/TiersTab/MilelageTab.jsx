import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import {
  /*   Tab Validation,
   */
  setCustomerRatesData,
  setIsTiersMileageTabValid,
  /* Miles */
  setMileageRateBreak1,
  setMileageRateBreak2,
  setMileageRateBreak3,
  setMileageRateBreak4,
  setMileageRateBreak5,
  setMileageRateBreak6,
  /* mileage rate
     mileage rate-Invoice Rate */
  setInvoiceRate1,
  setInvoiceRate2,
  setInvoiceRate3,
  setInvoiceRate4,
  setInvoiceRate5,
  setInvoiceRate6,
  setInvoiceRate7,
  /*   mileage rate-Invoice Reload
   */
  setInvoiceReloadRate1,
  setInvoiceReloadRate2,
  setInvoiceReloadRate3,
  setInvoiceReloadRate4,
  setInvoiceReloadRate5,
  setInvoiceReloadRate6,
  setInvoiceReloadRate7,
  /* mileage rate-Invoice Return Rate
   */
  setInvoiceReturnRate1,
  setInvoiceReturnRate2,
  setInvoiceReturnRate3,
  setInvoiceReturnRate4,
  setInvoiceReturnRate5,
  setInvoiceReturnRate6,
  setInvoiceReturnRate7,
  /*mileage rate-  Driver Rate*/
  setDriverRate1,
  setDriverRate2,
  setDriverRate3,
  setDriverRate4,
  setDriverRate5,
  setDriverRate6,
  setDriverRate7,
  /*mileage rate-  Driver Reload Rate*/
  setDriverReloadRate1,
  setDriverReloadRate2,
  setDriverReloadRate3,
  setDriverReloadRate4,
  setDriverReloadRate5,
  setDriverReloadRate6,
  setDriverReloadRate7,
  /* mileage rate-  Driver Return Rate*/
  setDriverReturnRate1,
  setDriverReturnRate2,
  setDriverReturnRate3,
  setDriverReturnRate4,
  setDriverReturnRate5,
  setDriverReturnRate6,
  setDriverReturnRate7,
} from "../../../../../../redux/CustomerRatesSlice";
import { parse } from "@fortawesome/fontawesome-svg-core";

const MilelageTab = () => {
  /*Dispatch*/
  const dispatch = useDispatch();

  /*Redux States*/
  /*Common*/
  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerRatesReducer.editFormData);
  const invoiceRates = useSelector((state) => state.customerRatesReducer.invoiceRates);
  const driverRates = useSelector((state) => state.customerRatesReducer.driverRates);
  const useMilageTiers = useSelector((state) => state.customerRatesReducer.useMilageTiers);
  const flatRateTiers = useSelector((state) => state.customerRatesReducer.flatRateTiers);
  const customerInvoicePercentage = useSelector(
    (state) => state.customerRatesReducer.customerInvoicePercentage
  );
  /*mileageBreak*/
  const mileageBreak1 = useSelector((state) => state.customerRatesReducer.mileageRateBreak1);
  const mileageBreak2 = useSelector((state) => state.customerRatesReducer.mileageRateBreak2);
  const mileageBreak3 = useSelector((state) => state.customerRatesReducer.mileageRateBreak3);
  const mileageBreak4 = useSelector((state) => state.customerRatesReducer.mileageRateBreak4);
  const mileageBreak5 = useSelector((state) => state.customerRatesReducer.mileageRateBreak5);
  const mileageBreak6 = useSelector((state) => state.customerRatesReducer.mileageRateBreak6);
  /* mileage rate
     mileage rate-Invoice Rate */
  const invoiceRate1 = useSelector((state) => state.customerRatesReducer.invoiceRate1);
  const invoiceRate2 = useSelector((state) => state.customerRatesReducer.invoiceRate2);
  const invoiceRate3 = useSelector((state) => state.customerRatesReducer.invoiceRate3);
  const invoiceRate4 = useSelector((state) => state.customerRatesReducer.invoiceRate4);
  const invoiceRate5 = useSelector((state) => state.customerRatesReducer.invoiceRate5);
  const invoiceRate6 = useSelector((state) => state.customerRatesReducer.invoiceRate6);
  const invoiceRate7 = useSelector((state) => state.customerRatesReducer.invoiceRate7);
  /*mileage rate-Invoice Reload*/
  const invoiceReloadRate1 = useSelector((state) => state.customerRatesReducer.invoiceReloadRate1);
  const invoiceReloadRate2 = useSelector((state) => state.customerRatesReducer.invoiceReloadRate2);
  const invoiceReloadRate3 = useSelector((state) => state.customerRatesReducer.invoiceReloadRate3);
  const invoiceReloadRate4 = useSelector((state) => state.customerRatesReducer.invoiceReloadRate4);
  const invoiceReloadRate5 = useSelector((state) => state.customerRatesReducer.invoiceReloadRate5);
  const invoiceReloadRate6 = useSelector((state) => state.customerRatesReducer.invoiceReloadRate6);
  const invoiceReloadRate7 = useSelector((state) => state.customerRatesReducer.invoiceReloadRate7);
  /*mileage rate-Invoice Return Rate*/
  const invoiceReturnRate1 = useSelector((state) => state.customerRatesReducer.invoiceReturnRate1);
  const invoiceReturnRate2 = useSelector((state) => state.customerRatesReducer.invoiceReturnRate2);
  const invoiceReturnRate3 = useSelector((state) => state.customerRatesReducer.invoiceReturnRate3);
  const invoiceReturnRate4 = useSelector((state) => state.customerRatesReducer.invoiceReturnRate4);
  const invoiceReturnRate5 = useSelector((state) => state.customerRatesReducer.invoiceReturnRate5);
  const invoiceReturnRate6 = useSelector((state) => state.customerRatesReducer.invoiceReturnRate6);
  const invoiceReturnRate7 = useSelector((state) => state.customerRatesReducer.invoiceReturnRate7);

  /*mileage rate-  Driver Rate*/
  const driverRate1 = useSelector((state) => state.customerRatesReducer.driverRate1);
  const driverRate2 = useSelector((state) => state.customerRatesReducer.driverRate2);
  const driverRate3 = useSelector((state) => state.customerRatesReducer.driverRate3);
  const driverRate4 = useSelector((state) => state.customerRatesReducer.driverRate4);
  const driverRate5 = useSelector((state) => state.customerRatesReducer.driverRate5);
  const driverRate6 = useSelector((state) => state.customerRatesReducer.driverRate6);
  const driverRate7 = useSelector((state) => state.customerRatesReducer.driverRate7);
  /*mileage rate-  Driver Reload Rate*/
  const driverReloadRate1 = useSelector((state) => state.customerRatesReducer.driverReloadRate1);
  const driverReloadRate2 = useSelector((state) => state.customerRatesReducer.driverReloadRate2);
  const driverReloadRate3 = useSelector((state) => state.customerRatesReducer.driverReloadRate3);
  const driverReloadRate4 = useSelector((state) => state.customerRatesReducer.driverReloadRate4);
  const driverReloadRate5 = useSelector((state) => state.customerRatesReducer.driverReloadRate5);
  const driverReloadRate6 = useSelector((state) => state.customerRatesReducer.driverReloadRate6);
  const driverReloadRate7 = useSelector((state) => state.customerRatesReducer.driverReloadRate7);
  /*mileage rate-  Driver Return Rate*/
  const driverReturnRate1 = useSelector((state) => state.customerRatesReducer.driverReturnRate1);
  const driverReturnRate2 = useSelector((state) => state.customerRatesReducer.driverReturnRate2);
  const driverReturnRate3 = useSelector((state) => state.customerRatesReducer.driverReturnRate3);
  const driverReturnRate4 = useSelector((state) => state.customerRatesReducer.driverReturnRate4);
  const driverReturnRate5 = useSelector((state) => state.customerRatesReducer.driverReturnRate5);
  const driverReturnRate6 = useSelector((state) => state.customerRatesReducer.driverReturnRate6);
  const driverReturnRate7 = useSelector((state) => state.customerRatesReducer.driverReturnRate7);

  const isTiersMileageTabValid = useSelector((state) => state.customerRatesReducer.isTiersMileageTabValid);
  const customerRatesData = useSelector((state) => state.customerRatesReducer.customerRatesData);
  const useLengthTiers = useSelector((state) => state.customerRatesReducer.useLengthTiers);
  const [hasInvoiceRate1, setHasInvoiceRate1] = useState(false);
  const [hasInvoiceRate2, setHasInvoiceRate2] = useState(false);
  const [hasInvoiceRate3, setHasInvoiceRate3] = useState(false);
  const [hasInvoiceRate4, setHasInvoiceRate4] = useState(false);
  const [hasInvoiceRate5, setHasInvoiceRate5] = useState(false);
  const [hasInvoiceRate6, setHasInvoiceRate6] = useState(false);
  const [hasInvoiceRate7, setHasInvoiceRate7] = useState(false);
  const [hasDriverRate1, setHasDriverRate1] = useState(false);
  const [hasDriverRate2, setHasDriverRate2] = useState(false);
  const [hasDriverRate3, setHasDriverRate3] = useState(false);
  const [hasDriverRate4, setHasDriverRate4] = useState(false);
  const [hasDriverRate5, setHasDriverRate5] = useState(false);
  const [hasDriverRate6, setHasDriverRate6] = useState(false);
  const [hasDriverRate7, setHasDriverRate7] = useState(false);
  /**Set the Invoice rates  true or false based-If rates are
   * present then the Has Invoice Rate1 flag is true otherwise set is as false */
  useEffect(() => {
    if (invoiceRate1 || invoiceReloadRate1 || invoiceReturnRate1) {
      setHasInvoiceRate1(true);
    } else {
      setHasInvoiceRate1(false);
    }
  }, [invoiceRate1, invoiceReloadRate1, invoiceReturnRate1]);
  useEffect(() => {
    if (invoiceRate2 || invoiceReloadRate2 || invoiceReturnRate2) {
      setHasInvoiceRate2(true);
    } else {
      setHasInvoiceRate2(false);
    }
  }, [invoiceRate2, invoiceReloadRate2, invoiceReturnRate2]);
  useEffect(() => {
    if (invoiceRate3 || invoiceReloadRate3 || invoiceReturnRate3) {
      setHasInvoiceRate3(true);
    } else {
      setHasInvoiceRate3(false);
    }
  }, [invoiceRate3, invoiceReloadRate3, invoiceReturnRate3]);
  useEffect(() => {
    if (invoiceRate4 || invoiceReloadRate4 || invoiceReturnRate4) {
      setHasInvoiceRate4(true);
    } else {
      setHasInvoiceRate4(false);
    }
  }, [invoiceRate4, invoiceReloadRate4, invoiceReturnRate4]);
  useEffect(() => {
    if (invoiceRate5 || invoiceReloadRate5 || invoiceReturnRate5) {
      setHasInvoiceRate5(true);
    } else {
      setHasInvoiceRate5(false);
    }
  }, [invoiceRate5, invoiceReloadRate5, invoiceReturnRate5]);
  useEffect(() => {
    if (invoiceRate6 || invoiceReloadRate6 || invoiceReturnRate6) {
      setHasInvoiceRate6(true);
    } else {
      setHasInvoiceRate6(false);
    }
  }, [invoiceRate6, invoiceReloadRate6, invoiceReturnRate6]);
  useEffect(() => {
    if (invoiceRate7 || invoiceReloadRate7 || invoiceReturnRate7) {
      setHasInvoiceRate7(true);
    } else {
      setHasInvoiceRate7(false);
    }
  }, [invoiceRate7, invoiceReloadRate7, invoiceReturnRate7]);
  /**Set the Driver rates  true or false based-If rates are
   * present then the Has Invoice Rate1 flag is true otherwise set is as false */
  useEffect(() => {
    if (driverRate1 || driverReloadRate1 || driverReturnRate1) {
      setHasDriverRate1(true);
    } else {
      setHasDriverRate1(false);
    }
  }, [driverRate1, driverReloadRate1, driverReturnRate1]);
  useEffect(() => {
    if (driverRate2 || driverReloadRate2 || driverReturnRate2) {
      setHasDriverRate2(true);
    } else {
      setHasDriverRate2(false);
    }
  }, [driverRate2, driverReloadRate2, driverReturnRate2]);
  useEffect(() => {
    if (driverRate3 || driverReloadRate3 || driverReturnRate3) {
      setHasDriverRate3(true);
    } else {
      setHasDriverRate3(false);
    }
  }, [driverRate3, driverReloadRate3, driverReturnRate3]);
  useEffect(() => {
    if (driverRate4 || driverReloadRate4 || driverReturnRate4) {
      setHasDriverRate4(true);
    } else {
      setHasDriverRate4(false);
    }
  }, [driverRate4, driverReloadRate4, driverReturnRate4]);
  useEffect(() => {
    if (driverRate5 || driverReloadRate5 || driverReturnRate5) {
      setHasDriverRate5(true);
    } else {
      setHasDriverRate5(false);
    }
  }, [driverRate5, driverReloadRate5, driverReturnRate5]);
  useEffect(() => {
    if (driverRate6 || driverReloadRate6 || driverReturnRate6) {
      setHasDriverRate6(true);
    } else {
      setHasDriverRate6(false);
    }
  }, [driverRate6, driverReloadRate6, driverReturnRate6]);
  useEffect(() => {
    if (driverRate7 || driverReloadRate7 || driverReturnRate7) {
      setHasDriverRate7(true);
    } else {
      setHasDriverRate7(false);
    }
  }, [driverRate7, driverReloadRate7, driverReturnRate7]);

  /*View Detail Page*/
  useEffect(() => {
    setTimeout(() => {
      if (editFormData != null) {
        if (editFormData.isMileageTab) {
          dispatch(setMileageRateBreak1(editFormData?.mileageBreak1 === 0 ? "" : editFormData.mileageBreak1));
          dispatch(setMileageRateBreak2(editFormData?.mileageBreak2 === 0 ? "" : editFormData.mileageBreak2));
          dispatch(setMileageRateBreak3(editFormData?.mileageBreak3 === 0 ? "" : editFormData.mileageBreak3));
          dispatch(setMileageRateBreak4(editFormData?.mileageBreak4 === 0 ? "" : editFormData.mileageBreak4));
          dispatch(setMileageRateBreak5(editFormData?.mileageBreak5 === 0 ? "" : editFormData.mileageBreak5));
          dispatch(setMileageRateBreak6(editFormData?.mileageBreak6 === 0 ? "" : editFormData.mileageBreak6));
          dispatch(setInvoiceRate1(editFormData?.invoiceRate1 === 0 ? "" : editFormData.invoiceRate1));
          dispatch(setInvoiceRate7(editFormData?.invoiceRate7 === 0 ? "" : editFormData.invoiceRate7));
          dispatch(
            setInvoiceReloadRate1(
              editFormData?.invoiceReloadRate1 === 0 ? "" : editFormData.invoiceReloadRate1
            )
          );
          dispatch(
            setInvoiceReloadRate7(
              editFormData?.invoiceReloadRate7 === 0 ? "" : editFormData.invoiceReloadRate7
            )
          );
          dispatch(
            setInvoiceReturnRate1(
              editFormData?.invoiceReturnRate1 === 0 ? "" : editFormData.invoiceReturnRate1
            )
          );
          dispatch(
            setInvoiceReturnRate7(
              editFormData?.invoiceReturnRate7 === 0 ? "" : editFormData.invoiceReturnRate7
            )
          );
          dispatch(setDriverRate1(editFormData?.driverRate1 === 0 ? "" : editFormData.driverRate1));
          dispatch(setDriverRate7(editFormData?.driverRate7 === 0 ? "" : editFormData.driverRate7));
          dispatch(
            setDriverReloadRate1(editFormData?.driverReloadRate1 === 0 ? "" : editFormData.driverReloadRate1)
          );
          dispatch(
            setDriverReloadRate7(editFormData?.driverReloadRate7 === 0 ? "" : editFormData.driverReloadRate7)
          );
          dispatch(
            setDriverReturnRate1(editFormData?.driverReturnRate1 === 0 ? "" : editFormData.driverReturnRate1)
          );
          dispatch(
            setDriverReturnRate7(editFormData?.driverReturnRate7 === 0 ? "" : editFormData.driverReturnRate7)
          );
        }
        /*Invoice Outbound*/
        dispatch(setInvoiceRate2(editFormData?.invoiceRate2 === 0 ? "" : editFormData.invoiceRate2));
        dispatch(setInvoiceRate3(editFormData?.invoiceRate3 === 0 ? "" : editFormData.invoiceRate3));
        dispatch(setInvoiceRate4(editFormData?.invoiceRate4 === 0 ? "" : editFormData.invoiceRate4));
        dispatch(setInvoiceRate5(editFormData?.invoiceRate5 === 0 ? "" : editFormData.invoiceRate5));
        dispatch(setInvoiceRate6(editFormData?.invoiceRate6 === 0 ? "" : editFormData.invoiceRate6));

        /*Invoice Reload*/
        dispatch(
          setInvoiceReloadRate2(editFormData?.invoiceReloadRate2 === 0 ? "" : editFormData.invoiceReloadRate2)
        );
        dispatch(
          setInvoiceReloadRate3(editFormData?.invoiceReloadRate3 === 0 ? "" : editFormData.invoiceReloadRate3)
        );
        dispatch(
          setInvoiceReloadRate4(editFormData?.invoiceReloadRate4 === 0 ? "" : editFormData.invoiceReloadRate4)
        );
        dispatch(
          setInvoiceReloadRate5(editFormData?.invoiceReloadRate5 === 0 ? "" : editFormData.invoiceReloadRate5)
        );
        dispatch(
          setInvoiceReloadRate6(editFormData?.invoiceReloadRate6 === 0 ? "" : editFormData.invoiceReloadRate6)
        );

        /*Invoice Return*/
        dispatch(
          setInvoiceReturnRate2(editFormData?.invoiceReturnRate2 === 0 ? "" : editFormData.invoiceReturnRate2)
        );
        dispatch(
          setInvoiceReturnRate3(editFormData?.invoiceReturnRate3 === 0 ? "" : editFormData.invoiceReturnRate3)
        );
        dispatch(
          setInvoiceReturnRate4(editFormData?.invoiceReturnRate4 === 0 ? "" : editFormData.invoiceReturnRate4)
        );
        dispatch(
          setInvoiceReturnRate5(editFormData?.invoiceReturnRate5 === 0 ? "" : editFormData.invoiceReturnRate5)
        );
        dispatch(
          setInvoiceReturnRate6(editFormData?.invoiceReturnRate6 === 0 ? "" : editFormData.invoiceReturnRate6)
        );

        /*Driver Outbound*/
        dispatch(setDriverRate2(editFormData?.driverRate2 === 0 ? "" : editFormData.driverRate2));
        dispatch(setDriverRate3(editFormData?.driverRate3 === 0 ? "" : editFormData.driverRate3));
        dispatch(setDriverRate4(editFormData?.driverRate4 === 0 ? "" : editFormData.driverRate4));
        dispatch(setDriverRate5(editFormData?.driverRate5 === 0 ? "" : editFormData.driverRate5));
        dispatch(setDriverRate6(editFormData?.driverRate6 === 0 ? "" : editFormData.driverRate6));

        /*Driver Reload*/
        dispatch(
          setDriverReloadRate2(editFormData?.driverReloadRate2 === 0 ? "" : editFormData.driverReloadRate2)
        );
        dispatch(
          setDriverReloadRate3(editFormData?.driverReloadRate3 === 0 ? "" : editFormData.driverReloadRate3)
        );
        dispatch(
          setDriverReloadRate4(editFormData?.driverReloadRate4 === 0 ? "" : editFormData.driverReloadRate4)
        );
        dispatch(
          setDriverReloadRate5(editFormData?.driverReloadRate5 === 0 ? "" : editFormData.driverReloadRate5)
        );
        dispatch(
          setDriverReloadRate6(editFormData?.driverReloadRate6 === 0 ? "" : editFormData.driverReloadRate6)
        );

        /*Driver Return*/
        dispatch(
          setDriverReturnRate2(editFormData?.driverReturnRate2 === 0 ? "" : editFormData.driverReturnRate2)
        );
        dispatch(
          setDriverReturnRate3(editFormData?.driverReturnRate3 === 0 ? "" : editFormData.driverReturnRate3)
        );
        dispatch(
          setDriverReturnRate4(editFormData?.driverReturnRate4 === 0 ? "" : editFormData.driverReturnRate4)
        );
        dispatch(
          setDriverReturnRate5(editFormData?.driverReturnRate5 === 0 ? "" : editFormData.driverReturnRate5)
        );
        dispatch(
          setDriverReturnRate6(editFormData?.driverReturnRate6 === 0 ? "" : editFormData.driverReturnRate6)
        );
      }
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editFormData, viewDetail]);

  /*Setting Mileage tab form data for Save Operation*/
  const mileageTabFormData = () => {
    dispatch(
      setCustomerRatesData({
        mileageBreak1: mileageBreak1,
        mileageBreak2: mileageBreak2,
        mileageBreak3: mileageBreak3,
        mileageBreak4: mileageBreak4,
        mileageBreak5: mileageBreak5,
        mileageBreak6: mileageBreak6,
        invoiceRate1: invoiceRate1,
        invoiceRate2: invoiceRate2,
        invoiceRate3: invoiceRate3,
        invoiceRate4: invoiceRate4,
        invoiceRate5: invoiceRate5,
        invoiceRate6: invoiceRate6,
        invoiceRate7: invoiceRate7,
        invoiceReloadRate1: invoiceReloadRate1,
        invoiceReloadRate2: invoiceReloadRate2,
        invoiceReloadRate3: invoiceReloadRate3,
        invoiceReloadRate4: invoiceReloadRate4,
        invoiceReloadRate5: invoiceReloadRate5,
        invoiceReloadRate6: invoiceReloadRate6,
        invoiceReloadRate7: invoiceReloadRate7,
        invoiceReturnRate1: invoiceReturnRate1,
        invoiceReturnRate2: invoiceReturnRate2,
        invoiceReturnRate3: invoiceReturnRate3,
        invoiceReturnRate4: invoiceReturnRate4,
        invoiceReturnRate5: invoiceReturnRate5,
        invoiceReturnRate6: invoiceReturnRate6,
        invoiceReturnRate7: invoiceReturnRate7,
        driverRate1: driverRate1,
        driverRate2: driverRate2,
        driverRate3: driverRate3,
        driverRate4: driverRate4,
        driverRate5: driverRate5,
        driverRate6: driverRate6,
        driverRate7: driverRate7,
        driverReloadRate1: driverReloadRate1,
        driverReloadRate2: driverReloadRate2,
        driverReloadRate3: driverReloadRate3,
        driverReloadRate4: driverReloadRate4,
        driverReloadRate5: driverReloadRate5,
        driverReloadRate6: driverReloadRate6,
        driverReloadRate7: driverReloadRate7,

        driverReturnRate1: driverReturnRate1,
        driverReturnRate2: driverReturnRate2,
        driverReturnRate3: driverReturnRate3,
        driverReturnRate4: driverReturnRate4,
        driverReturnRate5: driverReturnRate5,
        driverReturnRate6: driverReturnRate6,
        driverReturnRate7: driverReturnRate7,
      })
    );
  };
  useEffect(() => {
    if (!flatRateTiers && useMilageTiers) {
      mileageTabFormData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mileageBreak1,
    mileageBreak2,
    mileageBreak3,
    mileageBreak4,
    mileageBreak5,
    mileageBreak6,
    /* // mileage rate
    // Invoice Rate */
    invoiceRate1,
    invoiceRate2,
    invoiceRate3,
    invoiceRate4,
    invoiceRate5,
    invoiceRate6,
    invoiceRate7,

    invoiceReloadRate1,
    invoiceReloadRate2,
    invoiceReloadRate3,
    invoiceReloadRate4,
    invoiceReloadRate5,
    invoiceReloadRate6,
    invoiceReloadRate7,

    invoiceReturnRate1,
    invoiceReturnRate2,
    invoiceReturnRate3,
    invoiceReturnRate4,
    invoiceReturnRate5,
    invoiceReturnRate6,
    invoiceReturnRate7,

    /*     Driver Rates
     */
    driverRate1,
    driverRate2,
    driverRate3,
    driverRate4,
    driverRate5,
    driverRate6,
    driverRate7,

    driverReloadRate1,
    driverReloadRate2,
    driverReloadRate3,
    driverReloadRate4,
    driverReloadRate5,
    driverReloadRate6,
    driverReloadRate7,

    driverReturnRate1,
    driverReturnRate2,
    driverReturnRate3,
    driverReturnRate4,
    driverReturnRate5,
    driverReturnRate6,
    driverReturnRate7,
    viewDetail,
    flatRateTiers,
    useMilageTiers,
  ]);
  /*Mileage Tab Validation*/
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
      (invoiceRate1 === "" ||
        parseFloat(invoiceRate1) === 0 ||
        invoiceRate1 === "." ||
        invoiceReloadRate1 === "" ||
        parseFloat(invoiceReloadRate1) === 0 ||
        invoiceReloadRate1 === "." ||
        invoiceReturnRate1 === "" ||
        parseFloat(invoiceReturnRate1) === 0 ||
        invoiceReturnRate1 === "." ||
        invoiceRate2 === "" ||
        parseFloat(invoiceRate2) === 0 ||
        invoiceRate2 === "." ||
        invoiceReloadRate2 === "" ||
        parseFloat(invoiceReloadRate2) === 0 ||
        invoiceReloadRate2 === "." ||
        invoiceReturnRate2 === "" ||
        parseFloat(invoiceReturnRate2) === 0 ||
        invoiceReturnRate2 === ".");

    const isCondition3Met =
      mileageBreak1 !== "" &&
      driverRates &&
      (driverRate1 === "" ||
        parseFloat(driverRate1) === 0 ||
        driverRate1 === "." ||
        driverReloadRate1 === "" ||
        parseFloat(driverReloadRate1) === 0 ||
        driverReloadRate1 === "." ||
        driverReturnRate1 === "" ||
        parseFloat(driverReturnRate1) === 0 ||
        driverReturnRate1 === "." ||
        driverRate2 === "" ||
        parseFloat(driverRate2) === 0 ||
        driverRate2 === "." ||
        driverReloadRate2 === "" ||
        parseFloat(driverReloadRate2) === 0 ||
        driverReloadRate2 === "." ||
        driverReturnRate2 === "" ||
        parseFloat(driverReturnRate2) === 0 ||
        driverReturnRate2 === ".");

    const isCondition4Met =
      mileageBreak2 !== "" &&
      invoiceRates &&
      (invoiceRate3 === "" ||
        parseFloat(invoiceRate3) === 0 ||
        invoiceRate3 === "." ||
        invoiceReloadRate3 === "" ||
        parseFloat(invoiceReloadRate3) === 0 ||
        invoiceReloadRate3 === "." ||
        invoiceReturnRate3 === "" ||
        parseFloat(invoiceReturnRate3) === 0 ||
        invoiceReturnRate3 === ".");

    const isCondition4_1Met =
      mileageBreak2 === "" && invoiceRates && (invoiceRate3 || invoiceReloadRate3 || invoiceReturnRate3);

    const isCondition5Met =
      mileageBreak2 !== "" &&
      driverRates &&
      (driverRate3 === "" ||
        parseFloat(driverRate3) === 0 ||
        driverRate3 === "." ||
        driverReloadRate3 === "" ||
        parseFloat(driverReloadRate3) === 0 ||
        driverReloadRate3 === "." ||
        driverReturnRate3 === "" ||
        parseFloat(driverReturnRate3) === 0 ||
        driverReturnRate3 === ".");

    const isCondition5_1Met =
      mileageBreak2 === "" && driverRates && (driverRate3 || driverReloadRate3 || driverReturnRate3);

    const isCondition6Met =
      mileageBreak3 !== "" &&
      invoiceRates &&
      (invoiceRate4 === "" ||
        parseFloat(invoiceRate4) === 0 ||
        invoiceRate4 === "." ||
        invoiceReloadRate4 === "" ||
        parseFloat(invoiceReloadRate4) === 0 ||
        invoiceReloadRate4 === "." ||
        invoiceReturnRate4 === "" ||
        parseFloat(invoiceReturnRate4) === 0 ||
        invoiceReturnRate4 === ".");

    const isCondition6_1Met =
      mileageBreak3 === "" && invoiceRates && (invoiceRate4 || invoiceReloadRate4 || invoiceReturnRate4);

    const isCondition7Met =
      mileageBreak3 !== "" &&
      driverRates &&
      (driverRate4 === "" ||
        parseFloat(driverRate4) === 0 ||
        driverRate4 === "." ||
        driverReloadRate4 === "" ||
        parseFloat(driverReloadRate4) === 0 ||
        driverReloadRate4 === "." ||
        driverReturnRate4 === "" ||
        parseFloat(driverReturnRate4) === 0 ||
        driverReturnRate4 === ".");

    const isCondition7_1Met =
      mileageBreak3 === "" && driverRates && (driverRate4 || driverReloadRate4 || driverReturnRate4);

    const isCondition8Met =
      mileageBreak4 !== "" &&
      invoiceRates &&
      (invoiceRate5 === "" ||
        parseFloat(invoiceRate5) === 0 ||
        invoiceRate5 === "." ||
        invoiceReloadRate5 === "" ||
        parseFloat(invoiceReloadRate5) === 0 ||
        invoiceReloadRate5 === "." ||
        invoiceReturnRate5 === "" ||
        parseFloat(invoiceReturnRate5) === 0 ||
        invoiceReturnRate5 === ".");

    const isCondition8_1Met =
      mileageBreak4 === "" && invoiceRates && (invoiceRate5 || invoiceReloadRate5 || invoiceReturnRate5);

    const isCondition9Met =
      mileageBreak4 !== "" &&
      driverRates &&
      (driverRate5 === "" ||
        parseFloat(driverRate5) === 0 ||
        driverRate5 === "." ||
        driverReloadRate5 === "" ||
        parseFloat(driverReloadRate5) === 0 ||
        driverReloadRate5 === "." ||
        driverReturnRate5 === "" ||
        parseFloat(driverReturnRate5) === 0 ||
        driverReturnRate5 === ".");

    const isCondition9_1Met =
      mileageBreak4 === "" && driverRates && (driverRate5 || driverReloadRate5 || driverReturnRate5);

    const isCondition10Met =
      mileageBreak5 !== "" &&
      invoiceRates &&
      (invoiceRate6 === "" ||
        parseFloat(invoiceRate6) === 0 ||
        invoiceRate6 === "." ||
        invoiceReloadRate6 === "" ||
        parseFloat(invoiceReloadRate6) === 0 ||
        invoiceReloadRate6 === "." ||
        invoiceReturnRate6 === "" ||
        parseFloat(invoiceReturnRate6) === 0 ||
        invoiceReturnRate6 === ".");

    const isCondition10_1Met =
      mileageBreak5 === "" && invoiceRates && (invoiceRate6 || invoiceReloadRate6 || invoiceReturnRate6);

    const isCondition11Met =
      mileageBreak5 !== "" &&
      driverRates &&
      (driverRate6 === "" ||
        parseFloat(driverRate6) === 0 ||
        driverRate6 === "." ||
        driverReloadRate6 === "" ||
        parseFloat(driverReloadRate6) === 0 ||
        driverReloadRate6 === "." ||
        driverReturnRate6 === "" ||
        parseFloat(driverReturnRate6) === 0 ||
        driverReturnRate6 === ".");

    const isCondition11_1Met =
      mileageBreak5 === "" && driverRates && (driverRate6 || driverReloadRate6 || driverReturnRate6);

    const isCondition12Met =
      mileageBreak6 !== "" &&
      invoiceRates &&
      (invoiceRate7 === "" ||
        parseFloat(invoiceRate7) === 0 ||
        invoiceRate7 === "." ||
        invoiceReloadRate7 === "" ||
        parseFloat(invoiceReloadRate7) === 0 ||
        invoiceReloadRate7 === "." ||
        invoiceReturnRate7 === "" ||
        parseFloat(invoiceReturnRate7) === 0 ||
        invoiceReturnRate7 === ".");

    const isCondition12_1Met =
      mileageBreak6 === "" && invoiceRates && (invoiceRate7 || invoiceReloadRate7 || invoiceReturnRate7);

    const isCondition13Met =
      mileageBreak6 !== "" &&
      driverRates &&
      (driverRate7 === "" ||
        parseFloat(driverRate7) === 0 ||
        driverRate7 === "." ||
        driverReloadRate7 === "" ||
        parseFloat(driverReloadRate7) === 0 ||
        driverReloadRate7 === "." ||
        driverReturnRate7 === "" ||
        parseFloat(driverReturnRate7) === 0 ||
        driverReturnRate7 === ".");

    const isCondition13_1Met =
      mileageBreak6 === "" && driverRates && (driverRate7 || driverReloadRate7 || driverReturnRate7);

    const isCondition14Met =
      (invoiceRates &&
        driverRates &&
        driverRate1 !== "" &&
        invoiceRate1 &&
        Number(driverRate1) > Number(invoiceRate1 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverRate2 !== "" &&
        invoiceRate2 &&
        Number(driverRate2) > Number(invoiceRate2 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverRate3 !== "" &&
        invoiceRate3 &&
        Number(driverRate3) > Number(invoiceRate3 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverRate4 !== "" &&
        invoiceRate4 &&
        Number(driverRate4) > Number(invoiceRate4 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverRate5 !== "" &&
        invoiceRate5 &&
        Number(driverRate5) > Number(invoiceRate5 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverRate6 !== "" &&
        invoiceRate6 &&
        Number(driverRate6) > Number(invoiceRate6 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverRate7 !== "" &&
        invoiceRate7 &&
        Number(driverRate7) > Number(invoiceRate7 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadRate1 !== "" &&
        invoiceReloadRate1 &&
        Number(driverReloadRate1) > Number(invoiceReloadRate1 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadRate2 !== "" &&
        invoiceReloadRate2 &&
        Number(driverReloadRate2) > Number(invoiceReloadRate2 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadRate3 !== "" &&
        invoiceReloadRate3 &&
        Number(driverReloadRate3) > Number(invoiceReloadRate3 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadRate4 !== "" &&
        invoiceReloadRate4 &&
        Number(driverReloadRate4) > Number(invoiceReloadRate4 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadRate5 !== "" &&
        invoiceReloadRate5 &&
        Number(driverReloadRate5) > Number(invoiceReloadRate5 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadRate6 !== "" &&
        invoiceReloadRate5 &&
        Number(driverReloadRate6) > Number(invoiceReloadRate6 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReloadRate7 !== "" &&
        invoiceReloadRate7 &&
        Number(driverReloadRate7) > Number(invoiceReloadRate7 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnRate1 !== "" &&
        invoiceReturnRate1 &&
        Number(driverReturnRate1) > Number(invoiceReturnRate1 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnRate2 !== "" &&
        invoiceReturnRate2 &&
        Number(driverReturnRate2) > Number(invoiceReturnRate2 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnRate3 !== "" &&
        invoiceReturnRate3 &&
        Number(driverReturnRate3) > Number(invoiceReturnRate3 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnRate4 !== "" &&
        invoiceReturnRate4 &&
        Number(driverReturnRate4) > Number(invoiceReturnRate4 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnRate5 !== "" &&
        invoiceReturnRate5 &&
        Number(driverReturnRate5) > Number(invoiceReturnRate5 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnRate6 !== "" &&
        invoiceReturnRate6 &&
        Number(driverReturnRate6) > Number(invoiceReturnRate6 * customerInvoicePercentage)) ||
      (((invoiceRates && driverRates) || (!invoiceRates && driverRates)) &&
        driverReturnRate7 !== "" &&
        invoiceReturnRate7 &&
        Number(driverReturnRate7) > Number(invoiceReturnRate7 * customerInvoicePercentage));

    const isCondition15Met =
      !invoiceRates &&
      !driverRates &&
      (mileageBreak1 || mileageBreak2 || mileageBreak3 || mileageBreak4 || mileageBreak5 || mileageBreak6);

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
      isCondition14Met ||
      isCondition15Met
    ) {
      dispatch(setIsTiersMileageTabValid(false));
    } else {
      dispatch(setIsTiersMileageTabValid(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    /*Miles*/
    mileageBreak1,
    mileageBreak2,
    mileageBreak3,
    mileageBreak4,
    mileageBreak5,
    mileageBreak6,
    /* Miles-1*/
    invoiceRate1,
    invoiceRate2,
    invoiceRates,
    driverRates,
    invoiceReloadRate1,
    invoiceReloadRate2,
    invoiceReturnRate1,
    invoiceReturnRate2,
    driverRate1,
    driverReloadRate1,
    driverReturnRate1,
    driverRate2,
    driverReloadRate2,
    driverReturnRate2,
    /*Miles-2*/
    invoiceRate3,
    invoiceReloadRate3,
    invoiceReturnRate3,
    driverRate3,
    driverReloadRate3,
    driverReturnRate3,
    /*Miles-3*/
    invoiceRate4,
    invoiceReloadRate4,
    invoiceReturnRate4,
    driverRate4,
    driverReloadRate4,
    driverReturnRate4,
    /*Miles-4*/
    invoiceRate5,
    invoiceReloadRate5,
    invoiceReturnRate5,
    driverRate5,
    driverReloadRate5,
    driverReturnRate5,
    /*Miles-5*/
    invoiceRate6,
    invoiceReloadRate6,
    invoiceReturnRate6,
    driverRate6,
    driverReloadRate6,
    driverReturnRate6,
    /*Miles-6*/
    invoiceRate7,
    invoiceReloadRate7,
    invoiceReturnRate7,
    driverRate7,
    driverReloadRate7,
    driverReturnRate7,
    customerInvoicePercentage,
  ]);
  /*Function to clear  Invoice rates on clearing of Mileage breaks*/
  const clearInvoiceRate1Values = () => {
    dispatch(setInvoiceRate1(""));
    dispatch(setInvoiceReloadRate1(""));
    dispatch(setInvoiceReturnRate1(""));
  };
  const clearInvoiceRate2Values = () => {
    dispatch(setInvoiceRate2(""));
    dispatch(setInvoiceReloadRate2(""));
    dispatch(setInvoiceReturnRate2(""));
  };
  const clearInvoiceRate3Values = () => {
    dispatch(setInvoiceRate3(""));
    dispatch(setInvoiceReloadRate3(""));
    dispatch(setInvoiceReturnRate3(""));
  };
  const clearInvoiceRate4Values = () => {
    dispatch(setInvoiceRate4(""));
    dispatch(setInvoiceReloadRate4(""));
    dispatch(setInvoiceReturnRate4(""));
  };
  const clearInvoiceRate5Values = () => {
    dispatch(setInvoiceRate5(""));
    dispatch(setInvoiceReloadRate5(""));
    dispatch(setInvoiceReturnRate5(""));
  };
  const clearInvoiceRate6Values = () => {
    dispatch(setInvoiceRate6(""));
    dispatch(setInvoiceReloadRate6(""));
    dispatch(setInvoiceReturnRate6(""));
  };
  const clearInvoiceRate7Values = () => {
    dispatch(setInvoiceRate7(""));
    dispatch(setInvoiceReloadRate7(""));
    dispatch(setInvoiceReturnRate7(""));
  };
  /*Function to clear Driver Rates on clearing of Mileage breaks*/
  const clearDriverRate1Values = () => {
    dispatch(setDriverRate1(""));
    dispatch(setDriverReloadRate1(""));
    dispatch(setDriverReturnRate1(""));
  };
  const clearDriverRate2Values = () => {
    dispatch(setDriverRate2(""));
    dispatch(setDriverReloadRate2(""));
    dispatch(setDriverReturnRate2(""));
  };
  const clearDriverRate3Values = () => {
    dispatch(setDriverRate3(""));
    dispatch(setDriverReloadRate3(""));
    dispatch(setDriverReturnRate3(""));
  };
  const clearDriverRate4Values = () => {
    dispatch(setDriverRate4(""));
    dispatch(setDriverReloadRate4(""));
    dispatch(setDriverReturnRate4(""));
  };
  const clearDriverRate5Values = () => {
    dispatch(setDriverRate5(""));
    dispatch(setDriverReloadRate5(""));
    dispatch(setDriverReturnRate5(""));
  };
  const clearDriverRate6Values = () => {
    dispatch(setDriverRate6(""));
    dispatch(setDriverReloadRate6(""));
    dispatch(setDriverReturnRate6(""));
  };
  const clearDriverRate7Values = () => {
    dispatch(setDriverRate7(""));
    dispatch(setDriverReloadRate7(""));
    dispatch(setDriverReturnRate7(""));
  };
  /*clear mileage break1 if flatrate checked*/
  useEffect(() => {
    if (flatRateTiers) {
      dispatch(setMileageRateBreak1(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatRateTiers]);
  /* clear all states if usemileage if false*/
  useEffect(() => {
    dispatch(setMileageRateBreak1(""));
    dispatch(setMileageRateBreak2(""));
    dispatch(setMileageRateBreak3(""));
    dispatch(setMileageRateBreak4(""));
    dispatch(setMileageRateBreak5(""));
    dispatch(setMileageRateBreak6(""));
    /* //Mileage - Invoice Rates
    //mileage rate-Invoice Rate */
    clearInvoiceRate1Values();
    clearInvoiceRate2Values();
    clearInvoiceRate3Values();
    clearInvoiceRate4Values();
    clearInvoiceRate5Values();
    clearInvoiceRate6Values();
    clearInvoiceRate7Values();
    /*     mileage rate-Clear Driver Rate
     */
    clearDriverRate1Values();
    clearDriverRate2Values();
    clearDriverRate3Values();
    clearDriverRate4Values();
    clearDriverRate5Values();
    clearDriverRate6Values();
    clearDriverRate7Values();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMilageTiers]);
  /*Clear all values if Flatrate is checked*/
  useEffect(() => {
    dispatch(setMileageRateBreak1(""));
    dispatch(setMileageRateBreak2(""));
    dispatch(setMileageRateBreak3(""));
    dispatch(setMileageRateBreak4(""));
    dispatch(setMileageRateBreak5(""));
    dispatch(setMileageRateBreak6(""));
    /*  //Mileage - Invoice Rates
    //mileage rate-Invoice Rate */
    clearInvoiceRate1Values();
    clearInvoiceRate2Values();
    clearInvoiceRate3Values();
    clearInvoiceRate4Values();
    clearInvoiceRate5Values();
    clearInvoiceRate6Values();
    clearInvoiceRate7Values();
    /*mileage rate-Clear Driver Rate*/
    clearDriverRate1Values();
    clearDriverRate2Values();
    clearDriverRate3Values();
    clearDriverRate4Values();
    clearDriverRate5Values();
    clearDriverRate6Values();
    clearDriverRate7Values();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatRateTiers]);
  /*Clear all values if Length rate checkbox alone is checked*/
  useEffect(() => {
    if (!useMilageTiers && useLengthTiers && viewDetail) {
      dispatch(setMileageRateBreak1(""));
      dispatch(setMileageRateBreak2(""));
      dispatch(setMileageRateBreak3(""));
      dispatch(setMileageRateBreak4(""));
      dispatch(setMileageRateBreak5(""));
      dispatch(setMileageRateBreak6(""));
      /*  //Mileage - Invoice Rates
      //mileage rate-Invoice Rate */
      clearInvoiceRate1Values();
      clearInvoiceRate2Values();
      clearInvoiceRate3Values();
      clearInvoiceRate4Values();
      clearInvoiceRate5Values();
      clearInvoiceRate6Values();
      clearInvoiceRate7Values();
      /*       //mileage rate-Clear Driver Rate
       */
      clearDriverRate1Values();
      clearDriverRate2Values();
      clearDriverRate3Values();
      clearDriverRate4Values();
      clearDriverRate5Values();
      clearDriverRate6Values();
      clearDriverRate7Values();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMilageTiers, useLengthTiers, viewDetail]);
  useEffect(() => {
    if (useMilageTiers && flatRateTiers && viewDetail) {
      dispatch(setMileageRateBreak1(""));
      dispatch(setMileageRateBreak2(""));
      dispatch(setMileageRateBreak3(""));
      dispatch(setMileageRateBreak4(""));
      dispatch(setMileageRateBreak5(""));
      dispatch(setMileageRateBreak6(""));
      /* //Mileage - Invoice Rates
      //mileage rate-Invoice Rate */
      clearInvoiceRate1Values();
      clearInvoiceRate2Values();
      clearInvoiceRate3Values();
      clearInvoiceRate4Values();
      clearInvoiceRate5Values();
      clearInvoiceRate6Values();
      clearInvoiceRate7Values();
      /*       mileage rate-Clear Driver Rate
       */
      clearDriverRate1Values();
      clearDriverRate2Values();
      clearDriverRate3Values();
      clearDriverRate4Values();
      clearDriverRate5Values();
      clearDriverRate6Values();
      clearDriverRate7Values();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMilageTiers, flatRateTiers, viewDetail]);

  /*   clear the rates 2 on clearing mileage break2
   */
  const clearRatesOnMileageBreak2 = () => {
    if (
      !mileageBreak2 &&
      !mileageBreak3 &&
      ((invoiceRates && !hasInvoiceRate4) || (driverRates && !hasDriverRate4)) &&
      !mileageBreak4 &&
      ((invoiceRates && !hasInvoiceRate5) || (driverRates && !hasDriverRate5)) &&
      !mileageBreak5 &&
      ((invoiceRates && !hasInvoiceRate6) || (driverRates && !hasDriverRate6)) &&
      !mileageBreak6 &&
      ((invoiceRates && !hasInvoiceRate7) || (driverRates && !hasDriverRate7))
    ) {
      clearInvoiceRate3Values();
      clearDriverRate3Values();
    }
  };

  /*   clear the rates 4 on clearing mileage break3
   */
  const clearRatesOnMileageBreak3 = () => {
    if (
      !mileageBreak3 &&
      !mileageBreak4 &&
      ((invoiceRates && !hasInvoiceRate5) || (driverRates && !hasDriverRate5)) &&
      !mileageBreak5 &&
      ((invoiceRates && !hasInvoiceRate6) || (driverRates && !hasDriverRate6)) &&
      !mileageBreak6 &&
      ((invoiceRates && !hasInvoiceRate7) || (driverRates && !hasDriverRate7))
    ) {
      clearInvoiceRate4Values();
      clearDriverRate4Values();
    }
  };

  /*   clear the rates 5 on clearing of mileagebreak4
   */
  const clearRatesOnMileageBreak4 = () => {
    if (
      !mileageBreak4 &&
      !mileageBreak5 &&
      ((invoiceRates && !hasInvoiceRate6) || (driverRates && !hasDriverRate6)) &&
      !mileageBreak6 &&
      ((invoiceRates && !hasInvoiceRate7) || (driverRates && !hasDriverRate7))
    ) {
      clearInvoiceRate5Values();
      clearDriverRate5Values();
    }
  };

  /*   clear the rates 6 on clearing of mileagebreak5
   */
  const clearRatesOnMileageBreak5 = () => {
    if (
      !mileageBreak5 &&
      !mileageBreak6 &&
      ((invoiceRates && !hasInvoiceRate7) || (driverRates && !hasDriverRate7))
    ) {
      clearInvoiceRate6Values();
      clearDriverRate6Values();
    }
  };

  /*   clear the rates 7 on the clearence of Mileage break6
   */
  const clearRatesOnMileageBreak6 = () => {
    if (!mileageBreak6) {
      clearInvoiceRate7Values();
      clearDriverRate7Values();
    }
  };
  /*   Clear all driver rates when the driver rates flag is unchecked
   */
  useEffect(() => {
    clearDriverRate1Values();
    clearDriverRate2Values();
    clearDriverRate3Values();
    clearDriverRate4Values();
    clearDriverRate5Values();
    clearDriverRate6Values();
    clearDriverRate7Values();
  }, [driverRates]);
  /*Clear all Invoice rates when the Invoice rates flag is unchecked*/
  useEffect(() => {
    clearInvoiceRate1Values();
    clearInvoiceRate2Values();
    clearInvoiceRate3Values();
    clearInvoiceRate4Values();
    clearInvoiceRate5Values();
    clearInvoiceRate6Values();
    clearInvoiceRate7Values();
  }, [invoiceRates]);
  return (
    <div className="p-1 w-100">
      <Row className="m-0 p-0">
        <Col sm={12} md={12} lg={12} xl={12} xs={12}>
          <Form.Group
            className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-evenly  row  m-l-0 m-r-0"
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
            <Col xs={1} md={1} sm={1} className="p-0 w-75px" style={{ position: "absolute", right: 0 }}></Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-evenly  row  m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0">
              <Form.Label className="col-form-label dealer-label">Miles</Form.Label>
            </Col>
            {/* MileageBreak1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers
                    ? "borderBlack"
                    : mileageBreak1 === "" || mileageBreak1 > 32767 || parseInt(mileageBreak1) === 0
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="mileageBreak1"
                value={mileageBreak1}
                maxLength={5}
                disabled={!useMilageTiers || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setMileageRateBreak1(enteredValue));
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
                  flatRateTiers ||
                  ((mileageBreak1 === "" || mileageBreak2 === "") &&
                    ((invoiceRates && !hasInvoiceRate3) || (driverRates && !hasDriverRate3)))
                    ? "borderBlack"
                    : Number(mileageBreak2) <= Number(mileageBreak1) || mileageBreak2 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="mileageBreak2"
                autoComplete="off"
                aria-autocomplete="list"
                value={mileageBreak2}
                maxLength={5}
                disabled={!useMilageTiers || viewDetail || flatRateTiers}
                onBlur={(e) => clearRatesOnMileageBreak2()}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (!enteredValue || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setMileageRateBreak2(enteredValue));
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
                  flatRateTiers ||
                  ((mileageBreak2 === "" ||
                    mileageBreak3 === "" ||
                    Number(mileageBreak2) <= Number(mileageBreak1)) &&
                    ((invoiceRates && !hasInvoiceRate4) || (driverRates && !hasDriverRate4)))
                    ? "borderBlack"
                    : Number(mileageBreak3) <= Number(mileageBreak2) || mileageBreak3 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                maxLength={5}
                name="mileageBreak3"
                autoComplete="off"
                aria-autocomplete="list"
                value={mileageBreak3}
                disabled={
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak2 === "" &&
                    !mileageBreak3 &&
                    ((invoiceRates && !hasInvoiceRate4) || (driverRates && !hasDriverRate4))) ||
                  (Number(mileageBreak2) <= Number(mileageBreak1) &&
                    !mileageBreak3 &&
                    ((invoiceRates && !hasInvoiceRate4) || (driverRates && !hasDriverRate4)))
                }
                onBlur={(e) => {
                  clearRatesOnMileageBreak3();
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setMileageRateBreak3(enteredValue));
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
                  flatRateTiers ||
                  ((mileageBreak3 === "" ||
                    mileageBreak4 === "" ||
                    Number(mileageBreak3) <= Number(mileageBreak2)) &&
                    ((invoiceRates && !hasInvoiceRate5) || (driverRates && !hasDriverRate5)))
                    ? "borderBlack"
                    : Number(mileageBreak4) <= Number(mileageBreak3) || mileageBreak4 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="mileageBreak4"
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                value={mileageBreak4}
                disabled={
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak3 === "" &&
                    !mileageBreak4 &&
                    ((invoiceRates && !hasInvoiceRate5) || (driverRates && !hasDriverRate5))) ||
                  (Number(mileageBreak3) <= Number(mileageBreak2) &&
                    !mileageBreak4 &&
                    ((invoiceRates && !hasInvoiceRate5) || (driverRates && !hasDriverRate5)))
                }
                onBlur={(e) => {
                  clearRatesOnMileageBreak4();
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setMileageRateBreak4(enteredValue));
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
                  flatRateTiers ||
                  ((mileageBreak4 === "" ||
                    mileageBreak5 === "" ||
                    Number(mileageBreak4) <= Number(mileageBreak3)) &&
                    ((invoiceRates && !hasInvoiceRate6) || (driverRates && !hasDriverRate6)))
                    ? "borderBlack"
                    : Number(mileageBreak5) <= Number(mileageBreak4) || mileageBreak5 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="mileageBreak5"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={5}
                value={mileageBreak5}
                disabled={
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak4 === "" &&
                    !mileageBreak5 &&
                    ((invoiceRates && !hasInvoiceRate6) || (driverRates && !hasDriverRate6))) ||
                  (Number(mileageBreak4) <= Number(mileageBreak3) &&
                    !mileageBreak5 &&
                    ((invoiceRates && !hasInvoiceRate6) || (driverRates && !hasDriverRate6)))
                }
                onBlur={(e) => {
                  clearRatesOnMileageBreak5();
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setMileageRateBreak5(enteredValue));
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
                  flatRateTiers ||
                  ((mileageBreak5 === "" ||
                    mileageBreak6 === "" ||
                    Number(mileageBreak5) <= Number(mileageBreak4)) &&
                    ((invoiceRates && !hasInvoiceRate7) || (driverRates && !hasDriverRate7)))
                    ? "borderBlack"
                    : Number(mileageBreak6) <= Number(mileageBreak5) || mileageBreak6 > 32767
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="mileageBreak6"
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                value={mileageBreak6}
                disabled={
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak5 === "" &&
                    !mileageBreak6 &&
                    ((invoiceRates && !hasInvoiceRate7) || (driverRates && !hasDriverRate7))) ||
                  (Number(mileageBreak5) <= Number(mileageBreak4) &&
                    !mileageBreak6 &&
                    ((invoiceRates && !hasInvoiceRate7) || (driverRates && !hasDriverRate7)))
                }
                onBlur={(e) => {
                  clearRatesOnMileageBreak6();
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^[0-9]*$/)) {
                    dispatch(setMileageRateBreak6(enteredValue));
                  }
                }}
              />
            </Col>

            {/* <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              Default 
            </Col> */}
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row  m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0">
              <Form.Label className="col-form-label ">Invoice Outbound</Form.Label>
            </Col>
            {/* Invoice Outbound-1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !invoiceRates
                    ? "borderBlack"
                    : invoiceRate1 === "" || parseFloat(invoiceRate1) === 0 || invoiceRate1 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceRate1}
                disabled={!useMilageTiers || !invoiceRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Outbound-2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !invoiceRates
                    ? "borderBlack"
                    : invoiceRate2 === "" || parseFloat(invoiceRate2) === 0 || invoiceRate2 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceRate2}
                disabled={!useMilageTiers || !invoiceRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Outbound-3 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak2 && !invoiceRate3)
                    ? "borderBlack"
                    : invoiceRate3 === "" || parseFloat(invoiceRate3) === 0 || invoiceRate3 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceRate3}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak2 === "" && !invoiceRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceRate3(enteredValue));
                  }
                }}
              />
            </Col>

            {/* Invoice Outbound-4 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak3 && !invoiceRate4)
                    ? "borderBlack"
                    : invoiceRate4 === "" || parseFloat(invoiceRate4) === 0 || invoiceRate4 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceRate4}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak3 === "" && !invoiceRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceRate4(enteredValue));
                  }
                }}
              />
            </Col>

            {/* Invoice Outbound-5 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak4 && !invoiceRate5)
                    ? "borderBlack"
                    : invoiceRate5 === "" || parseFloat(invoiceRate5) === 0 || invoiceRate5 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceRate5}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak4 === "" && !invoiceRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Outbound-6 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak5 && !invoiceRate6)
                    ? "borderBlack"
                    : invoiceRate6 === "" || parseFloat(invoiceRate6) === 0 || invoiceRate6 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceRate6}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak5 === "" && !invoiceRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Outbound-7 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak6 && !invoiceRate7)
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
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak6 === "" && !invoiceRate7)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>

          {/* Invoice Reload */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row  m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0  w-20px">
              <Form.Label className="col-form-label ">Invoice Reload</Form.Label>
            </Col>
            {/* Invoice Reload -1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !invoiceRates
                    ? "borderBlack"
                    : invoiceReloadRate1 === "" ||
                        parseFloat(invoiceReloadRate1) === 0 ||
                        invoiceReloadRate1 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadRate1}
                disabled={!useMilageTiers || !invoiceRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReloadRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !invoiceRates
                    ? "borderBlack"
                    : invoiceReloadRate2 === "" ||
                        parseFloat(invoiceReloadRate2) === 0 ||
                        invoiceReloadRate2 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadRate2}
                disabled={!useMilageTiers || !invoiceRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReloadRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -3 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak2 && !invoiceReloadRate3)
                    ? "borderBlack"
                    : invoiceReloadRate3 === "" ||
                        parseFloat(invoiceReloadRate3) === 0 ||
                        invoiceReloadRate3 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadRate3}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak2 === "" && !invoiceReloadRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReloadRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -4 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak3 && !invoiceReloadRate4)
                    ? "borderBlack"
                    : invoiceReloadRate4 === "" ||
                        parseFloat(invoiceReloadRate4) === 0 ||
                        invoiceReloadRate4 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadRate4}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak3 === "" && !invoiceReloadRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReloadRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -5 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak4 && !invoiceReloadRate5)
                    ? "borderBlack"
                    : invoiceReloadRate5 === "" ||
                        parseFloat(invoiceReloadRate5) === 0 ||
                        invoiceReloadRate5 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadRate5}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak4 === "" && !invoiceReloadRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReloadRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -6 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak5 && !invoiceReloadRate6)
                    ? "borderBlack"
                    : invoiceReloadRate6 === "" ||
                        parseFloat(invoiceReloadRate6) === 0 ||
                        invoiceReloadRate6 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReloadRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReloadRate6}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak5 === "" && !invoiceReloadRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReloadRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Reload -7 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak6 && !invoiceReloadRate7)
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
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak6 === "" && !invoiceReloadRate7)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReloadRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/* Invoice Return */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row  m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0 ">
              <Form.Label className="col-form-label ">Invoice Return</Form.Label>
            </Col>
            {/* Invoice Return-1*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !invoiceRates
                    ? "borderBlack"
                    : invoiceReturnRate1 === "" ||
                        parseFloat(invoiceReturnRate1) === 0 ||
                        invoiceReturnRate1 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnRate1}
                disabled={!useMilageTiers || !invoiceRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReturnRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-2*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !invoiceRates
                    ? "borderBlack"
                    : invoiceReturnRate2 === "" ||
                        parseFloat(invoiceReturnRate2) === 0 ||
                        invoiceReturnRate2 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnRate2}
                disabled={!useMilageTiers || !invoiceRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReturnRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-3*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak2 && !invoiceReturnRate3)
                    ? "borderBlack"
                    : invoiceReturnRate3 === "" ||
                        parseFloat(invoiceReturnRate3) === 0 ||
                        invoiceReturnRate3 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnRate3}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak2 === "" && !invoiceRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReturnRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-4*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak3 && !invoiceReturnRate4)
                    ? "borderBlack"
                    : invoiceReturnRate4 === "" ||
                        parseFloat(invoiceReturnRate4) === 0 ||
                        invoiceReturnRate4 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnRate4}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak3 === "" && !invoiceReturnRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReturnRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-5*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak4 && !invoiceReturnRate5)
                    ? "borderBlack"
                    : invoiceReturnRate5 === "" ||
                        parseFloat(invoiceReturnRate5) === 0 ||
                        invoiceReturnRate5 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnRate5}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak4 === "" && !invoiceReturnRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReturnRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-6*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak5 && !invoiceReturnRate6)
                    ? "borderBlack"
                    : invoiceReturnRate6 === "" ||
                        parseFloat(invoiceReturnRate6) === 0 ||
                        invoiceReturnRate6 === "."
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="invoiceReturnRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={invoiceReturnRate6}
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak5 === "" && !invoiceReturnRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReturnRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Invoice Return-7*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !invoiceRates ||
                  (!mileageBreak6 && !invoiceReturnRate7)
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
                disabled={
                  !useMilageTiers ||
                  !invoiceRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak6 === "" && !invoiceReturnRate7)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setInvoiceReturnRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/* Driver Outbound */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row  m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0 ">
              <Form.Label className="col-form-label ">Driver Outbound</Form.Label>
            </Col>
            {/* Driver Outbound - 1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !driverRates
                    ? "borderBlack"
                    : driverRate1 === "" ||
                        driverRate1 === "." ||
                        (invoiceRate1 &&
                          invoiceRates &&
                          Number(driverRate1) > Number(invoiceRate1 * customerInvoicePercentage)) ||
                        parseFloat(driverRate1) === 0 ||
                        (invoiceRates && !invoiceRate1)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverRate1}
                disabled={!useMilageTiers || !driverRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !driverRates
                    ? "borderBlack"
                    : driverRate2 === "" ||
                        driverRate2 === "." ||
                        (invoiceRates &&
                          invoiceRate2 &&
                          Number(driverRate2) > Number(invoiceRate2 * customerInvoicePercentage)) ||
                        parseFloat(driverRate2) === 0 ||
                        (invoiceRates && !invoiceRate2)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverRate2}
                disabled={!useMilageTiers || !driverRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 3 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak2 && !driverRate3)
                    ? "borderBlack"
                    : driverRate3 === "" ||
                        driverRate3 === "." ||
                        (invoiceRates &&
                          invoiceRate3 &&
                          Number(driverRate3) > Number(invoiceRate3 * customerInvoicePercentage)) ||
                        parseFloat(driverRate3) === 0 ||
                        (invoiceRates && !invoiceRate3)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverRate3}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak2 === "" && !driverRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 4 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak3 && !driverRate4)
                    ? "borderBlack"
                    : driverRate4 === "" ||
                        driverRate4 === "." ||
                        (invoiceRates &&
                          invoiceRate4 &&
                          Number(driverRate4) > Number(invoiceRate4 * customerInvoicePercentage)) ||
                        parseFloat(driverRate4) === 0 ||
                        (invoiceRates && !invoiceRate4)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverRate4}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak3 === "" && !driverRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 5 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak4 && !driverRate5)
                    ? "borderBlack"
                    : driverRate5 === "" ||
                        driverRate5 === "." ||
                        (invoiceRates &&
                          invoiceRate5 &&
                          Number(driverRate5) > Number(invoiceRate5 * customerInvoicePercentage)) ||
                        parseFloat(driverRate5) === 0 ||
                        (invoiceRates && !invoiceRate5)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverRate5}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak4 === "" && !driverRate5)
                }

                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 6 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak5 && !driverRate6)
                    ? "borderBlack"
                    : driverRate6 === "" ||
                        driverRate6 === "." ||
                        (invoiceRates &&
                          invoiceRate6 &&
                          Number(driverRate6) > Number(invoiceRate6 * customerInvoicePercentage)) ||
                        parseFloat(driverRate6) === 0 ||
                        (invoiceRates && !invoiceRate6)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverRate6}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak5 === "" && !driverRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Outbound - 7 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak6 && !driverRate7)
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
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak6 === "" && !driverRate7)
                }

                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/* Driver Reload */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row  m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0 ">
              <Form.Label className="col-form-label ">Driver Reload</Form.Label>
            </Col>
            {/* Driver Reload -1*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !driverRates
                    ? "borderBlack"
                    : driverReloadRate1 === "" ||
                        driverReloadRate1 === "." ||
                        (invoiceRates &&
                          invoiceReloadRate1 &&
                          Number(driverReloadRate1) >
                            Number(invoiceReloadRate1 * customerInvoicePercentage)) ||
                        parseFloat(driverReloadRate1) === 0 ||
                        (invoiceRates && !invoiceReloadRate1)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadRate1}
                disabled={!useMilageTiers || !driverRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReloadRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -2*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !driverRates
                    ? "borderBlack"
                    : driverReloadRate2 === "" ||
                        driverReloadRate2 === "." ||
                        (invoiceRates &&
                          invoiceReloadRate2 &&
                          Number(driverReloadRate2) >
                            Number(invoiceReloadRate2 * customerInvoicePercentage)) ||
                        parseFloat(driverReloadRate2) === 0 ||
                        (invoiceRates && !invoiceReloadRate2)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadRate2}
                disabled={!useMilageTiers || !driverRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReloadRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -3*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak2 && !driverReloadRate3)
                    ? "borderBlack"
                    : driverReloadRate3 === "" ||
                        driverReloadRate3 === "." ||
                        (invoiceRates &&
                          invoiceReloadRate3 &&
                          Number(driverReloadRate3) >
                            Number(invoiceReloadRate3 * customerInvoicePercentage)) ||
                        parseFloat(driverReloadRate3) === 0 ||
                        (invoiceRates && !invoiceReloadRate3)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadRate3}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak2 === "" && !driverReloadRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReloadRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -4*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak3 && !driverReloadRate4)
                    ? "borderBlack"
                    : driverReloadRate4 === "" ||
                        driverReloadRate4 === "." ||
                        (invoiceRates &&
                          invoiceReloadRate4 &&
                          Number(driverReloadRate4) >
                            Number(invoiceReloadRate4 * customerInvoicePercentage)) ||
                        parseFloat(driverReloadRate4) === 0 ||
                        (invoiceRates && !invoiceReloadRate4)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadRate4}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak3 === "" && !driverReloadRate4)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReloadRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -5*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak4 && !driverReloadRate5)
                    ? "borderBlack"
                    : driverReloadRate5 === "" ||
                        driverReloadRate5 === "." ||
                        (invoiceRates &&
                          invoiceReloadRate5 &&
                          Number(driverReloadRate5) >
                            Number(invoiceReloadRate5 * customerInvoicePercentage)) ||
                        parseFloat(driverReloadRate5) === 0 ||
                        (invoiceRates && !invoiceReloadRate5)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadRate5}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak4 === "" && !driverReloadRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReloadRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -6*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak5 && !driverReloadRate6)
                    ? "borderBlack"
                    : driverReloadRate6 === "" ||
                        driverReloadRate6 === "." ||
                        (invoiceRates &&
                          invoiceReloadRate6 &&
                          Number(driverReloadRate6) >
                            Number(invoiceReloadRate6 * customerInvoicePercentage)) ||
                        parseFloat(driverReloadRate6) === 0 ||
                        (invoiceRates && !invoiceReloadRate6)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadRate6}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak5 === "" && !driverReloadRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReloadRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/* Driver Reload -7*/}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak6 && !driverReloadRate7)
                    ? "borderBlack"
                    : driverReloadRate7 === "" ||
                        driverReloadRate7 === "." ||
                        (invoiceRates &&
                          invoiceReloadRate7 &&
                          Number(driverReloadRate7) >
                            Number(invoiceReloadRate7 * customerInvoicePercentage)) ||
                        parseFloat(driverReloadRate7) === 0 ||
                        (invoiceRates && !invoiceReloadRate7)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReloadRate7"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReloadRate7}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak6 === "" && !driverReloadRate7)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReloadRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
          {/*Driver Return*/}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 justify-content-between row  m-l-0 m-r-0">
            <Col xs={1} sm={1} md={1} className="p-0 ">
              <Form.Label className="col-form-label ">Driver Return</Form.Label>
            </Col>
            {/*Driver Return -1 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !driverRates
                    ? "borderBlack"
                    : driverReturnRate1 === "" ||
                        driverReturnRate1 === "." ||
                        (invoiceRates &&
                          invoiceReturnRate1 &&
                          Number(driverReturnRate1) >
                            Number(invoiceReturnRate1 * customerInvoicePercentage)) ||
                        parseFloat(driverReturnRate1) === 0 ||
                        (invoiceRates && !invoiceReturnRate1)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnRate1"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnRate1}
                disabled={!useMilageTiers || !driverRates || viewDetail || flatRateTiers}

                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReturnRate1(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -2 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers || viewDetail || flatRateTiers || !driverRates
                    ? "borderBlack"
                    : driverReturnRate2 === "" ||
                        driverReturnRate2 === "." ||
                        (invoiceRates &&
                          invoiceReturnRate2 &&
                          Number(driverReturnRate2) >
                            Number(invoiceReturnRate2 * customerInvoicePercentage)) ||
                        parseFloat(driverReturnRate2) === 0 ||
                        (invoiceRates && !invoiceReturnRate2)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnRate2"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnRate2}
                disabled={!useMilageTiers || !driverRates || viewDetail || flatRateTiers}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReturnRate2(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -3 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak2 && !driverReturnRate3)
                    ? "borderBlack"
                    : driverReturnRate3 === "" ||
                        driverReturnRate3 === "." ||
                        (invoiceRates &&
                          invoiceReturnRate3 &&
                          Number(driverReturnRate3) >
                            Number(invoiceReturnRate3 * customerInvoicePercentage)) ||
                        parseFloat(driverReturnRate3) === 0 ||
                        (invoiceRates && !invoiceReturnRate3)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnRate3"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnRate3}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak2 === "" && !driverReturnRate3)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReturnRate3(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -4 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak3 && !driverReturnRate4)
                    ? "borderBlack"
                    : driverReturnRate4 === "" ||
                        driverReturnRate4 === "." ||
                        (invoiceRates &&
                          invoiceReturnRate4 &&
                          Number(driverReturnRate4) >
                            Number(invoiceReturnRate4 * customerInvoicePercentage)) ||
                        parseFloat(driverReturnRate4) === 0 ||
                        (invoiceRates && !invoiceReturnRate4)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnRate4"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnRate4}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak3 === "" && !driverReturnRate4)
                }

                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReturnRate4(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -5 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak4 && !driverReturnRate5)
                    ? "borderBlack"
                    : driverReturnRate5 === "" ||
                        driverReturnRate5 === "." ||
                        (invoiceRates &&
                          invoiceReturnRate5 &&
                          Number(driverReturnRate5) >
                            Number(invoiceReturnRate5 * customerInvoicePercentage)) ||
                        parseFloat(driverReturnRate5) === 0 ||
                        (invoiceRates && !invoiceReturnRate5)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnRate5"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnRate5}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak4 === "" && !driverReturnRate5)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReturnRate5(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -6 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak5 && !driverReturnRate6)
                    ? "borderBlack"
                    : driverReturnRate6 === "" ||
                        driverReturnRate6 === "." ||
                        (invoiceRates &&
                          invoiceReturnRate6 &&
                          Number(driverReturnRate6) >
                            Number(invoiceReturnRate6 * customerInvoicePercentage)) ||
                        parseFloat(driverReturnRate6) === 0 ||
                        (invoiceRates && !invoiceReturnRate6)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                type="text"
                name="driverReturnRate6"
                autoComplete="newpassword"
                aria-autocomplete="none"
                value={driverReturnRate6}
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak5 === "" && !driverReturnRate6)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReturnRate6(enteredValue));
                  }
                }}
              />
            </Col>
            {/*Driver Return -7 */}
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !useMilageTiers ||
                  viewDetail ||
                  flatRateTiers ||
                  !driverRates ||
                  (!mileageBreak6 && !driverReturnRate7)
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
                disabled={
                  !useMilageTiers ||
                  !driverRates ||
                  viewDetail ||
                  flatRateTiers ||
                  (mileageBreak6 === "" && !driverReturnRate7)
                }
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue === "" || enteredValue.match(/^\d{0,2}(\.\d{0,4})?$/)) {
                    dispatch(setDriverReturnRate7(enteredValue));
                  }
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default MilelageTab;
