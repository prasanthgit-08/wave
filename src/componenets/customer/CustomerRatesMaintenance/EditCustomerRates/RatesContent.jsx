import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Tab, Tabs } from "react-bootstrap";
import GeneralTab from "./tabs/GeneralTab";
import MilelageTab from "./tabs/TiersTab/MilelageTab";
import Length from "./tabs/TiersTab/Length";
import MinimumsTab from "./tabs/MinimumsTab";
import { Surcharges } from "./tabs/Surcharges";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomerRatesService from "../../../../services/CustomerRatesService";
import {
  setEditFormData,
  setIsCustomerRateLoading,
  setViewDetail,
} from "../../../../redux/CustomerRatesSlice";
import FlatRateTab from "./tabs/TiersTab/FlatRateTab";
const RatesContent = () => {
  const { customerRatePK } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*Values From Redux*/
  const editFormData = useSelector((state) => state.customerRatesReducer.editFormData);
  const changesCancelled = useSelector((state) => state.customerRatesReducer.changesCancelled);
  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
  /*General Tab*/
  const isGeneralTabValid = useSelector((state) => state.customerRatesReducer.isGeneralTabValid);
  const useMilageTiers = useSelector((state) => state.customerRatesReducer.useMilageTiers);
  const flatRateTiers = useSelector((state) => state.customerRatesReducer.flatRateTiers);
  const useLengthTiers = useSelector((state) => state.customerRatesReducer.useLengthTiers);
  const invoiceRates = useSelector((state) => state.customerRatesReducer.invoiceRates);
  const driverRates = useSelector((state) => state.customerRatesReducer.driverRates);
  const invoiceCDLSurcharge = useSelector((state) => state.customerRatesReducer.invoiceCDLSurcharge);
  const invoiceCDLSurchargeCanada = useSelector(
    (state) => state.customerRatesReducer.invoiceCDLSurchargeCanada
  );
  const invoiceCDLGVWRCutoff = useSelector((state) => state.customerRatesReducer.invoiceCDLGVWRCutoff);
  const invoiceCDLLengthCutoff = useSelector((state) => state.customerRatesReducer.invoiceCDLLengthCutoff);
  const driverCDLSurcharge = useSelector((state) => state.customerRatesReducer.driverCDLSurcharge);
  const driverCDLSurchargeCanada = useSelector(
    (state) => state.customerRatesReducer.driverCDLSurchargeCanada
  );
  const driverCDLGVWRCutoff = useSelector((state) => state.customerRatesReducer.driverCDLGVWRCutoff);
  const driverCDLLengthCutoff = useSelector((state) => state.customerRatesReducer.driverCDLLengthCutoff);
  /*Tiers - Mileage*/
  const isTiersMileageTabValid = useSelector((state) => state.customerRatesReducer.isTiersMileageTabValid);
  /*Tiers - Flatrate*/
  const isTiersFlatRateTabValid = useSelector((state) => state.customerRatesReducer.isTiersFlatRateTabValid);
  /*Tiers-Length*/
  const isTiersLengthTabValid = useSelector((state) => state.customerRatesReducer.isTiersLengthTabValid);
  const isCustomerRateLoading = useSelector((state) => state.customerRatesReducer.isCustomerRateLoading);
  /*Minimum tab valid*/
  const isMinimumTabValid = useSelector((state) => state.customerRatesReducer.isMinimumTabValid);
  /*Surcharges Tab*/
  const isSurchargesTabValid = useSelector((state) => state.customerRatesReducer.isSurchargesTabValid);
  const invoiceApportionedSurcharge = useSelector(
    (state) => state.customerRatesReducer.invoiceApportionedSurcharge
  );
  const invoiceApportionedWeightCutoff = useSelector(
    (state) => state.customerRatesReducer.invoiceApportionedWeightCutoff
  );
  const driverApportionedSurcharge = useSelector(
    (state) => state.customerRatesReducer.driverApportionedSurcharge
  );
  const driverApportionedWeightCutoff = useSelector(
    (state) => state.customerRatesReducer.driverApportionedWeightCutoff
  );
  const [activeKey, setactiveKey] = useState("Mileage");
  const [loader, setLoader] = useState(false);

  const noValuesPresentInTierA = () =>
    !invoiceCDLSurcharge &&
    !invoiceCDLSurchargeCanada &&
    !invoiceCDLGVWRCutoff &&
    !invoiceCDLLengthCutoff &&
    !driverCDLSurcharge &&
    !driverCDLSurchargeCanada &&
    !driverCDLGVWRCutoff &&
    !driverCDLLengthCutoff;

  const noValuesPresentInTierAForInvoiceandDriver = () =>
    invoiceRates &&
    driverRates &&
    !invoiceCDLSurcharge &&
    !invoiceCDLSurchargeCanada &&
    (parseFloat(invoiceCDLGVWRCutoff) === 0 ||
      !invoiceCDLGVWRCutoff ||
      parseFloat(invoiceCDLLengthCutoff) === 0 ||
      !invoiceCDLLengthCutoff) &&
    !driverCDLSurcharge &&
    !driverCDLSurchargeCanada &&
    (parseFloat(driverCDLGVWRCutoff) === 0 ||
      !driverCDLGVWRCutoff ||
      parseFloat(driverCDLLengthCutoff) === 0 ||
      !driverCDLLengthCutoff);

  useEffect(() => {
    if (customerRatePK) {
      setLoader(true);
      dispatch(setIsCustomerRateLoading(true));
      CustomerRatesService.getRecordById(customerRatePK)
        .then((response) => {
          const { data } = response;
          dispatch(setEditFormData(data));
          dispatch(setViewDetail(true));
          setTimeout(() => {
            dispatch(setIsCustomerRateLoading(false));
          }, 100);
          setLoader(false);
        })
        .catch((err) => {
          dispatch(setIsCustomerRateLoading(false));
          setLoader(false);
          navigate("/customer-rates");
        });
    }
  }, [customerRatePK]);
  /*Setting the tab based on Selection*/
  useEffect(() => {
    if (useMilageTiers && !flatRateTiers) {
      setactiveKey("Mileage");
    } else if (flatRateTiers) {
      setactiveKey("Flatrate");
    } else if (useLengthTiers) {
      setactiveKey("Length");
    } else {
      setactiveKey("Mileage");
    }
  }, [useMilageTiers, flatRateTiers, useLengthTiers]);
  /*******
   * Check the Invoice rates for tab color validation with Invoice Surcharge values
   * *****/
  const areInvoiceRatesOnly = () =>
    invoiceRates &&
    !driverRates &&
    ((invoiceCDLSurcharge &&
      (parseFloat(invoiceCDLSurcharge) === 0 || parseFloat(invoiceCDLSurcharge) !== 0) &&
      (!invoiceCDLSurchargeCanada || parseFloat(invoiceCDLSurchargeCanada) === 0) &&
      (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0) &&
      (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0)) ||
      (invoiceCDLSurchargeCanada &&
        (parseFloat(invoiceCDLSurchargeCanada) === 0 || parseFloat(invoiceCDLSurchargeCanada) !== 0) &&
        (!invoiceCDLSurcharge || parseFloat(invoiceCDLSurcharge) === 0) &&
        (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0) &&
        (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0)) ||
      (invoiceCDLGVWRCutoff &&
        parseFloat(invoiceCDLGVWRCutoff) === 0 &&
        (!invoiceCDLSurcharge || parseFloat(invoiceCDLSurcharge) === 0) &&
        (!invoiceCDLSurchargeCanada || parseFloat(invoiceCDLSurchargeCanada) === 0) &&
        (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0)) ||
      (invoiceCDLLengthCutoff &&
        parseFloat(invoiceCDLLengthCutoff) === 0 &&
        (!invoiceCDLSurcharge || parseFloat(invoiceCDLSurcharge) === 0) &&
        (!invoiceCDLSurchargeCanada || parseFloat(invoiceCDLSurchargeCanada) === 0) &&
        (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0)) ||
      ((invoiceCDLSurcharge || invoiceCDLSurchargeCanada) &&
        (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0) &&
        (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0)));
  /*******
   * Check the Driver rates for tab color validation
   * *****/
  const areDriverRatesOnly = () =>
    !invoiceRates &&
    driverRates &&
    ((driverCDLSurcharge &&
      (parseFloat(driverCDLSurcharge) === 0 || parseFloat(driverCDLSurcharge) !== 0) &&
      (!driverCDLSurchargeCanada || parseFloat(driverCDLSurchargeCanada) === 0) &&
      (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0) &&
      (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0)) ||
      (driverCDLSurchargeCanada &&
        (parseFloat(driverCDLSurchargeCanada) === 0 || parseFloat(driverCDLSurchargeCanada) !== 0) &&
        (!driverCDLSurcharge || parseFloat(driverCDLSurcharge) === 0) &&
        (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0) &&
        (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0)) ||
      (driverCDLGVWRCutoff &&
        parseFloat(driverCDLGVWRCutoff) === 0 &&
        (!driverCDLSurcharge || parseFloat(driverCDLSurcharge) === 0) &&
        (!driverCDLSurchargeCanada || parseFloat(driverCDLSurchargeCanada) === 0) &&
        (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0)) ||
      (driverCDLLengthCutoff &&
        parseFloat(driverCDLLengthCutoff) === 0 &&
        (!driverCDLSurcharge || parseFloat(driverCDLSurcharge) === 0) &&
        (!driverCDLSurchargeCanada || parseFloat(driverCDLSurchargeCanada) === 0) &&
        (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0)) ||
      ((driverCDLSurcharge || driverCDLSurchargeCanada) &&
        (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0) &&
        (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0)));
  /******
   * Validation of Invoice rates in case of value zero entered
   * *****/
  const areInvoiceRatesValid = () =>
    invoiceRates &&
    !driverRates &&
    ((invoiceCDLSurcharge &&
      parseFloat(invoiceCDLSurcharge) === 0 &&
      (!invoiceCDLSurchargeCanada || parseFloat(invoiceCDLSurchargeCanada) === 0) &&
      (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0) &&
      (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0)) ||
      (invoiceCDLSurchargeCanada &&
        parseFloat(invoiceCDLSurchargeCanada) === 0 &&
        (!invoiceCDLSurcharge || parseFloat(invoiceCDLSurcharge) === 0) &&
        (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0) &&
        (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0)) ||
      (invoiceCDLGVWRCutoff &&
        parseFloat(invoiceCDLGVWRCutoff) === 0 &&
        (!invoiceCDLSurcharge || parseFloat(invoiceCDLSurcharge) === 0) &&
        (!invoiceCDLSurchargeCanada || parseFloat(invoiceCDLSurchargeCanada) === 0) &&
        (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0)) ||
      (invoiceCDLLengthCutoff &&
        parseFloat(invoiceCDLLengthCutoff) === 0 &&
        (!invoiceCDLSurcharge || parseFloat(invoiceCDLSurcharge) === 0) &&
        (!invoiceCDLSurchargeCanada || parseFloat(invoiceCDLSurchargeCanada) === 0) &&
        (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0)));
  /******
   * Validation of Driver rates in case of value zero entered
   * *****/
  const areDriverRatesValid = () =>
    driverRates &&
    !invoiceRates &&
    ((driverCDLSurcharge &&
      parseFloat(driverCDLSurcharge) === 0 &&
      (!driverCDLSurchargeCanada || parseFloat(driverCDLSurchargeCanada) === 0) &&
      (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0) &&
      (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0)) ||
      (driverCDLSurchargeCanada &&
        parseFloat(driverCDLSurchargeCanada) === 0 &&
        (!driverCDLSurcharge || parseFloat(driverCDLSurcharge) === 0) &&
        (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0) &&
        (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0)) ||
      (driverCDLGVWRCutoff &&
        parseFloat(driverCDLGVWRCutoff) === 0 &&
        (!driverCDLSurcharge || parseFloat(driverCDLSurcharge) === 0) &&
        (!driverCDLSurchargeCanada || parseFloat(driverCDLSurchargeCanada) === 0) &&
        (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0)) ||
      (driverCDLLengthCutoff &&
        parseFloat(driverCDLLengthCutoff) === 0 &&
        (!driverCDLSurcharge || parseFloat(driverCDLSurcharge) === 0) &&
        (!driverCDLSurchargeCanada || parseFloat(driverCDLSurchargeCanada) === 0) &&
        (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0)));

  /********
   * Case for Only Involice and Driver CDL Surcharge values
   * without Lenth and GVWR Cutoff
   * *****/
  const areBothInvoiceadnDriverRatesOnlyforTab = () =>
    invoiceRates &&
    driverRates &&
    (invoiceCDLSurcharge || invoiceCDLSurchargeCanada || driverCDLSurcharge || driverCDLSurchargeCanada) &&
    (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0) &&
    (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0) &&
    (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0) &&
    (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0);

  /*****
   * Define the validations in the Surcharge tab
   * ****/
  const skipValidation =
    viewDetail ||
    (!invoiceApportionedSurcharge &&
      !!invoiceApportionedWeightCutoff &&
      invoiceApportionedWeightCutoff < 32767 &&
      (driverApportionedWeightCutoff == null || driverApportionedWeightCutoff < 32767) &&
      !driverApportionedSurcharge) ||
    (!driverApportionedSurcharge &&
      !!driverApportionedWeightCutoff &&
      driverApportionedWeightCutoff < 32767 &&
      (invoiceApportionedWeightCutoff == null || invoiceApportionedWeightCutoff < 32767) &&
      !invoiceApportionedSurcharge) ||
    (((!invoiceRates && !driverRates) ||
      noValuesPresentInTierA() ||
      areInvoiceRatesValid() ||
      areDriverRatesValid() ||
      areInvoiceRatesOnly() ||
      areDriverRatesOnly() ||
      areBothInvoiceadnDriverRatesOnlyforTab() ||
      noValuesPresentInTierAForInvoiceandDriver()) &&
      !invoiceApportionedSurcharge &&
      !invoiceApportionedWeightCutoff &&
      !driverApportionedSurcharge &&
      !driverApportionedWeightCutoff);

  return (
    <div className="p-2">
      {loader && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
          <Tab
            eventKey="general"
            title={t("edit.dealer.page.general.tab.heading.general")}
            tabClassName={
              isCustomerRateLoading || viewDetail ? "" : isGeneralTabValid ? "color-green" : "color-red"
            }
          >
            <GeneralTab />
          </Tab>
          <Tab
            eventKey="Tiers"
            title="Tiers"
            disabled={
              (!useMilageTiers && !useLengthTiers && !viewDetail) ||
              (!useMilageTiers && !useLengthTiers && viewDetail)
            }
            /***Tab validation of  Tiers Tab*/
            tabClassName={
              viewDetail || (!useMilageTiers && !useLengthTiers)
                ? ""
                : !useLengthTiers && (isTiersMileageTabValid || isTiersFlatRateTabValid)
                  ? "color-green"
                  : isTiersMileageTabValid && isTiersLengthTabValid
                    ? "color-green"
                    : isTiersFlatRateTabValid && isTiersLengthTabValid
                      ? "color-green"
                      : !useMilageTiers && useLengthTiers && isTiersLengthTabValid
                        ? "color-green"
                        : "color-red"
            }
          >
            <Tabs
              defaultActiveKey="Mileage"
              id="uncontrolled-tab-example"
              className="m-b-10"
              activeKey={activeKey}
              onSelect={(key) => {
                setactiveKey(key);
              }}
            >
              <tab
                eventKey="Mileage"
                title="Mileage"
                disabled={(!useMilageTiers && !viewDetail) || flatRateTiers || !useMilageTiers}
                /**Tab Validation of Mileage Tab */
                tabClassName={
                  viewDetail || !useMilageTiers || flatRateTiers
                    ? ""
                    : isTiersMileageTabValid
                      ? "color-green"
                      : "color-red"
                }
              >
                <MilelageTab />
              </tab>
              <tab
                eventKey="Flatrate"
                title="Flatrate"
                disabled={(!flatRateTiers && !viewDetail) || (!flatRateTiers && viewDetail)}
                /**Tab Validation of Flatrate Tab */

                tabClassName={
                  viewDetail || !flatRateTiers ? "" : isTiersFlatRateTabValid ? "color-green" : "color-red"
                }
              >
                <FlatRateTab />
              </tab>

              <tab
                eventKey="Length"
                title="Length"
                disabled={
                  (!useLengthTiers && !viewDetail) ||
                  (!useLengthTiers && viewDetail) ||
                  (useMilageTiers && !useLengthTiers && viewDetail) ||
                  (useMilageTiers && !useLengthTiers && !viewDetail)
                }
                /**Tab Validation of Length Tab */
                tabClassName={
                  viewDetail || !useLengthTiers ? "" : isTiersLengthTabValid ? "color-green" : "color-red"
                }
              >
                <Length />
              </tab>
            </Tabs>
          </Tab>
          <Tab
            eventKey="minimums"
            title={"Minimums"}
            tabClassName={viewDetail || isMinimumTabValid ? "" : "color-red"}
          >
            <MinimumsTab />
          </Tab>
          <Tab
            eventKey="Surcharges"
            title={"Surcharges"}
            tabClassName={skipValidation ? "" : isSurchargesTabValid ? "color-green" : "color-red"}
          >
            <Surcharges />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default RatesContent;
