import { Button, Modal, Tab, Table, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import "./OrderEntry.module.css";
import "./OrderConfirmation.css";
import OEFooter from "./footer";
import OEHeader from "./header";
import styles from "./OrderEntry.module.css";
import useOrderEntry from "./useOrderEntry";
import Customer from "./tabs/customer";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import MiscCustomer from "./tabs/miscCustomer";
import Notes from "./tabs/notes";
import InvoiceHold from "./tabs/invoiceHold";
import Instructions from "./tabs/instructions";
import MiscPickup from "./tabs/miscPickup";
import Unit from "./tabs/unit";
import OnHold from "./tabs/onHold";
import MiscDelivery from "./tabs/miscDelivery";
import Contacts from "./tabs/contacts";
import OverWidth from "./tabs/overWidth";
import UnitRoutes from "./tabs/unitRoutes";
import DriveBys from "./tabs/driveBys";
import Documents from "./tabs/documents";
import useDebouncer from "../../../hooks/useDebouncer";
import {
  setActiveDispatchValid,
  setIsOpenBalancesDetailsInComplete,
  setisOpenBalancesDetailsPartial,
  setOrderEntrySchemaConditions,
} from "../../../store/slices/unit.slice";
import OpenBalances from "./tabs/openBalances";
import CreditCard from "./tabs/creditCard";
import Loading from "../../../components/common/loading";
import CommonModal from "../../../components/common/commonModal";
import UnitActivationSingleSelectionScreenModal from "../../../componenets/OrderEntry/OrderEntryProcess/edit-order-entry/tabs/modal/UnitActivationSingleSelectionScreenModal";

const OrderEntryTemplate = () => {
  const {
    tab,
    setTab,
    reactHookForm,
    handlePreSubmit,
    hasErrors,
    onValidationFailed,
    showOpenBalancesWarning,
    setShowOpenBalancesWarning,
    handleOrderConfirmationSave,
    showOrderConfirmation,
    setShowOrderConfirmation,
    saveLoading,
    savedUnits,
    setSavedUnits,
    unSavedUnits,
    setUnSavedUnits,
    generateBatchUnits,
    setShowError,
    setErrorMsg,
    errorMsg,
    showError,
    showSuccess,
    setShowSuccess,
    successMsg,
    setSuccessMsg,
    showCreditCardWarning,
    setShowCreditCardWarning,
    preInvoiceModal,
    setPreInvoiceModal,
    preInvoiceResult,
    setUnitActivation,
    unitActivation,
    setUnitActivationObj,
    unitActivationObj,
    lockError,
    setLockError,
  } = useOrderEntry();

  const {
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValidating },
  } = reactHookForm;
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.unit.orderEntrySchemaConditions.customer);
  const unit = useSelector((state) => state.unit.orderEntrySchemaConditions.unit);
  const hasDrivebys = useSelector((state) => state.unit.orderEntrySchemaConditions?.unit?.hasDrivebys);
  const invoiceHoldsValue = getValues("invoiceHolds");
  const unitValue = getValues("unit");
  const customerValue = getValues("customer");
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const selectedPlant = useSelector((state) => state.unit.selectedPlant);
  const openBalancePrepaid = customer?.openBalancePrepaid;
  const isOpenBalancesDetailsPartial = useSelector((state) => state.unit.isOpenBalancesDetailsPartial);
  const isOpenBalancesDetailsInComplete = useSelector((state) => state.unit.isOpenBalancesDetailsInComplete);
  const driveBysListing = useSelector((state) => state.unit.driveBysListing);
  const selectedUnitType = useSelector((state) => state.unit.selectedUnitType);
  const selectedPickupDealer = useSelector((state) => state.unit.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);
  const isCreditCardDetailsInComplete = useSelector((state) => state.unit.isCreditCardDetailsInComplete);
  const isCreditCardDetailsPartial = useSelector((state) => state.unit.isCreditCardDetailsPartial);
  const isCreditCardRequired = useSelector((state) => state.unit.isCreditCardRequired);
  const errorState = useMemo(
    () => ({
      customer: hasErrors("customer"),
      miscCustomer: hasErrors("miscCustomer"),
      unit: hasErrors("unit"),
      miscPickup: hasErrors("miscPickup"),
      miscDelivery: hasErrors("miscDelivery"),
      overWidth: hasErrors("overWidth"),
      onHold: hasErrors("onHold"),
      contacts: hasErrors("contacts"),
      invoiceHolds: hasErrors("invoiceHolds"),
      openBalances: isOpenBalancesDetailsPartial || isOpenBalancesDetailsInComplete,
      notes: hasErrors("notes"),
    }),
    [errors, isOpenBalancesDetailsPartial, isOpenBalancesDetailsInComplete]
  );
  const debounceUpdate = useDebouncer(() => {
    dispatch(setOrderEntrySchemaConditions({ [`${tab}TabValid`]: errorState[tab] }));
  }, 0);
  const disabledTabs = useMemo(
    () => ({
      miscCustomer: errorState.customer || !customer?.miscellaneousCustomer,
      unit: errorState.customer,
      invoiceHolds: !invoiceHoldsValue?.invoiceHold,
      overWidth: !selectedUnitType?.overWidth,
      hasCustomer: !selectedCustomer.customerPK,
      miscPickup: !unitValue.miscellaneousPickup,
      miscDelivery: !unitValue.miscellaneousDelivery,
      unitOnHold: !unitValue.unitOnHold,
      openBalances: !openBalancePrepaid,
      creditCard: !customerValue.creditCardPrepaid,
      unitRoutes: errorState.customer,
      driveBys: !unitValue.hasDrivebys,
    }),
    [errorState, customer, invoiceHoldsValue, hasDrivebys]
  );

  useEffect(() => {
    debounceUpdate();
  }, [
    errorState.customer,
    errorState.miscCustomer,
    errorState.unit,
    errorState.miscPickup,
    errorState.miscDelivery,
    errorState.overWidth,
    errorState.openBalances,
    errorState.onHold,
    errorState.contacts,
    errorState.invoiceHolds,
    errorState.notes,
  ]);

  useEffect(() => {
    let creditcard = disabledTabs.creditCard ? false : !isCreditCardRequired;

    let openBalance = openBalancePrepaid && errorState.openBalances;

    dispatch(setActiveDispatchValid(creditcard || openBalance));
  }, [disabledTabs.creditCard, isCreditCardRequired, openBalancePrepaid, errorState.openBalances]);

  const renderOrderConfirmation = () => {
    const unitNumberList = generateBatchUnits(
      unit.unitNumber,
      customerValue.firstBatchSequence,
      customerValue.lastBatchSequence
    );

    return (
      <>
        {customerValue.batchLoads &&
        savedUnits?.length === 0 &&
        unSavedUnits?.length === 0 &&
        unitNumberList?.length > 0 ? (
          unitNumberList?.map((unitNumber, index) => (
            <tr key={index} onClick={() => {}}>
              <td>{index + 1}</td>
              <td>{customer?.name}</td>
              <td>{selectedPickupDealer?.name || ""}</td>
              <td>{selectedDeliveryDealer?.name || ""}</td>
              <td>
                <span className={unit.unitNumber ? "unitNumber" : ""}>{unitNumber}</span>
              </td>
              <td>
                <span className={unit.specialCodeName ? "specialCode" : ""}>
                  {unit.specialCodeName || ""}
                </span>
              </td>
              <td>
                <span className={unit.stockNumber ? "stockNumber" : ""}>{unit.stockNumber}</span>
              </td>
              {/* <td><span className="mileagePost"></span></td> */}
            </tr>
          ))
        ) : (
          <tr onClick={() => {}}>
            <td>1</td>
            <td>{customer?.name}</td>
            <td>{selectedPickupDealer?.name || ""}</td>
            <td>{selectedDeliveryDealer?.name || ""}</td>
            <td>
              <span className={unit.unitNumber ? "unitNumber" : ""}>{unit.unitNumber}</span>
            </td>
            <td>
              <span className={unit.specialCodeName ? "specialCode" : ""}>{unit.specialCodeName || ""}</span>
            </td>
            <td>
              <span className={unit.stockNumber ? "stockNumber" : ""}>{unit.stockNumber}</span>
            </td>
          </tr>
        )}
      </>
    );
  };
  const drivebyTab = !!(
    unitValue.hasDrivebys &&
    (driveBysListing?.length === 0 ||
      errors?.unit?.invoiceMiles ||
      errors?.unit?.driverMiles ||
      errors?.unit?.invoiceFlatRate ||
      errors?.unit?.driverFlatRate)
  );
  return (
    <div className={styles.mainContainer}>
      <div style={{ margin: "1px" }}>
        <div className={styles.orderTabs}>
          {saveLoading && <Loading />}
          <OEHeader />

          <FormProvider {...reactHookForm}>
            <form onSubmit={handleSubmit(handlePreSubmit, onValidationFailed)} autoComplete="off">
              <Tabs activeKey={tab} onSelect={(k) => setTab(k)} mountOnEnter={true} unmountOnExit={false}>
                <Tab
                  eventKey={"customer"}
                  title={"Customer"}
                  tabClassName={errorState.customer ? "color-red" : "color-green"}
                >
                  <Customer styles={styles} />
                </Tab>

                <Tab
                  eventKey={"miscCustomer"}
                  title={"Misc Customer"}
                  disabled={disabledTabs.miscCustomer}
                  tabClassName={
                    !disabledTabs.miscCustomer ? (errorState.miscCustomer ? "color-red" : "color-green") : ""
                  }
                >
                  <MiscCustomer styles={styles} />
                </Tab>
                <Tab
                  eventKey={"unit"}
                  title={"Unit"}
                  disabled={disabledTabs.unit}
                  tabClassName={!disabledTabs.unit ? (errorState.unit ? "color-red" : "color-green") : ""}
                >
                  <Unit styles={styles} />
                </Tab>
                <Tab
                  eventKey={"miscPickup"}
                  title={"Misc Pickup"}
                  disabled={disabledTabs.miscPickup}
                  tabClassName={
                    disabledTabs.miscPickup ? "" : errorState.miscPickup ? "color-red" : "color-green"
                  }
                >
                  <MiscPickup styles={styles} />
                </Tab>

                <Tab
                  eventKey={"miscDelivery"}
                  title={"Misc Delivery"}
                  disabled={disabledTabs.miscDelivery}
                  tabClassName={
                    disabledTabs.miscDelivery ? "" : errorState.miscDelivery ? "color-red" : "color-green"
                  }
                >
                  <MiscDelivery styles={styles} />
                </Tab>
                <Tab
                  eventKey={"overWidth"}
                  title={"Over Width"}
                  disabled={disabledTabs.overWidth}
                  tabClassName={
                    !disabledTabs.overWidth ? (errorState.overWidth ? "color-red" : "color-green") : ""
                  }
                >
                  <OverWidth styles={styles} />
                </Tab>
                <Tab eventKey={"unitRoutes"} title={"Unit Routes"} disabled={disabledTabs.unitRoutes}>
                  <UnitRoutes styles={styles} />
                </Tab>
                <Tab
                  eventKey={"driveBys"}
                  title={"Drive By's"}
                  disabled={disabledTabs.driveBys}
                  tabClassName={!disabledTabs.driveBys ? (drivebyTab ? "color-red" : "color-green") : ""}
                >
                  <DriveBys styles={styles} />
                </Tab>
                <Tab
                  eventKey={"onHold"}
                  title={"On Hold"}
                  disabled={disabledTabs.unitOnHold}
                  tabClassName={
                    disabledTabs.unitOnHold ? "" : errorState.onHold ? "color-red" : "color-green"
                  }
                >
                  <OnHold styles={styles} />
                </Tab>
                <Tab
                  eventKey={"creditcard"}
                  title={"Credit Card"}
                  disabled={disabledTabs.creditCard}
                  tabClassName={
                    disabledTabs.creditCard ? "" : isCreditCardRequired ? "color-green" : "color-red"
                  }
                >
                  <CreditCard styles={styles} />
                </Tab>
                <Tab
                  eventKey={"openBalances"}
                  title={"Open Balances"}
                  disabled={!openBalancePrepaid}
                  tabClassName={
                    openBalancePrepaid ? (errorState.openBalances ? "color-red" : "color-green") : ""
                  }
                >
                  <OpenBalances styles={styles} />
                </Tab>
                <Tab eventKey={"contacts"} title={"Contacts"} disabled={disabledTabs.hasCustomer}>
                  <Contacts styles={styles} />
                </Tab>

                <Tab eventKey={"notes"} title={"Notes"} disabled={disabledTabs.hasCustomer}>
                  <Notes styles={styles} />
                </Tab>
                <Tab
                  eventKey={"invoiceHold"}
                  title={"InvoiceHold"}
                  disabled={disabledTabs.hasCustomer}
                  tabClassName={
                    disabledTabs.invoiceHolds ? "" : errorState.invoiceHolds ? "color-red" : "color-green"
                  }
                >
                  <InvoiceHold styles={styles} />
                </Tab>
                <Tab
                  eventKey={"instructions"}
                  title={"Instructions"}
                  disabled={disabledTabs.hasCustomer}
                  tabClassName={
                    selectedPlant?.orderInstructions || selectedCustomer?.orderEntryInstructions
                      ? "tab-font-color"
                      : ""
                  }
                >
                  <Instructions styles={styles} />
                </Tab>
                <Tab eventKey={"documents"} title={"Documents"} disabled={disabledTabs.hasCustomer}>
                  <Documents styles={styles} />
                </Tab>
              </Tabs>

              <OEFooter />

              <Modal
                show={showOpenBalancesWarning}
                onHide={() => setShowOpenBalancesWarning(false)}
                backdrop="static"
                keyboard={false}
              >
                <div className="modal-content" style={{ width: "600px" }}>
                  <Modal.Header closeButton>
                    <Modal.Title className="font-18 h-100">Warning!!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="font-14 h-100" style={{ width: "600px" }}>
                    {isOpenBalancesDetailsInComplete ? (
                      <p style={{ color: "red" }}>
                        Open Balances details are not entered completely. Do you want to edit the
                        details?{" "}
                      </p>
                    ) : isOpenBalancesDetailsPartial ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        Open Balances details are partially entered. Do you want to edit the details?{" "}
                      </p>
                    ) : (
                      ""
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary" /* onClick={handleOpenBalancesWarningYes} */
                      onClick={() => {
                        setShowOpenBalancesWarning(false);
                      }}
                    >
                      Yes
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowOrderConfirmation(true);
                        setShowOpenBalancesWarning(false);
                      }}
                    >
                      No
                    </Button>
                  </Modal.Footer>
                </div>
              </Modal>
              {/* Creditcard Modal */}
              <Modal
                show={showCreditCardWarning}
                onHide={() => setShowCreditCardWarning(false)}
                backdrop="static"
                keyboard={false}
              >
                <div className="modal-content" style={{ width: "600px" }}>
                  <Modal.Header closeButton>
                    <Modal.Title className="font-18 h-100">Warning!!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="font-14 h-100" style={{ width: "600px" }}>
                    {customerValue?.batchLoads ? (
                      <p style={{ color: "red" }}>Tab validation failed for Credit Card tab.</p>
                    ) : isCreditCardDetailsInComplete ? (
                      <p style={{ color: "red" }}>
                        Credit Card details are not entered completely. Do you want to edit the details?
                      </p>
                    ) : isCreditCardDetailsPartial ? (
                      <p style={{ color: "red" }}>
                        Credit Card details are partially entered. Do you want to edit the details?
                      </p>
                    ) : (
                      ""
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    {customerValue?.batchLoads ? (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setShowCreditCardWarning(false);
                        }}
                      >
                        OK
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setShowCreditCardWarning(false);
                          }}
                        >
                          Yes
                        </Button>

                        <Button
                          variant="secondary"
                          onClick={() => {
                            setShowOrderConfirmation(true);
                            setShowCreditCardWarning(false);
                          }}
                        >
                          No
                        </Button>
                      </>
                    )}
                  </Modal.Footer>
                </div>
              </Modal>

              {/* Order Confirmation Modal */}
              <Modal
                show={showOrderConfirmation}
                onHide={() => {
                  setShowOrderConfirmation(false);
                  setSavedUnits([]);
                  setUnSavedUnits([]);
                }}
                size="lg"
                backdrop="static"
                centered
                className="order-confirmation-modal"
              >
                {/* HEADER */}
                <Modal.Header closeButton>
                  <Modal.Title>
                    {customerValue.batchLoads ? "ORDER SUMMARY - BATCH LOAD" : "ORDER SUMMARY"}
                  </Modal.Title>
                </Modal.Header>

                {/* BODY */}
                <Modal.Body
                  style={{
                    maxHeight: "160px",
                    overflowY: "auto",
                  }}
                >
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Billing Customer</th>
                        <th>Pickup Dealer</th>
                        <th>Delivery Dealer</th>
                        <th className="grey-text">Unit #</th>
                        <th className="grey-text">Special Code</th>
                        <th className="grey-text">Stock #</th>
                      </tr>
                    </thead>

                    <tbody>{renderOrderConfirmation()}</tbody>
                  </Table>

                  {customerValue.batchLoads && savedUnits.length > 0 && (
                    <p className="alert alert-success text-center mt-3 orderSummaryInfo">
                      {savedUnits.length} Units (Sequence {unit.unitNumber + customerValue.firstBatchSequence}{" "}
                      – {unit.unitNumber + customerValue.lastBatchSequence})
                    </p>
                  )}

                  {customerValue.batchLoads && unSavedUnits.length > 0 && (
                    <>
                      <p className="alert alert-danger text-center mt-3 orderSummaryInfo">
                        {unSavedUnits.length} Units could not be saved due to duplicate Unit Numbers
                      </p>

                      <div className="row justify-content-center mt-3">
                        <div className="col-auto">
                          <span className="alert alert-warning py-2 px-3">
                            Duplicate Unit Numbers &gt;&gt;
                          </span>
                        </div>

                        <div className="col-4">
                          <ul className="duplicateList" style={{ maxHeight: "200px", overflowY: "auto" }}>
                            {unSavedUnits.map((unit) => (
                              <li key={unit} className="duplicateListElement">
                                {unit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </Modal.Body>

                {/* FOOTER */}
                <Modal.Footer className="d-flex justify-content-between">
                  {/* EDIT */}
                  <Button
                    className={`btn-dark px-5 ${
                      customerValue.batchLoads && unSavedUnits.length > 0 ? "hide-elements" : ""
                    }`}
                    onClick={() => setShowOrderConfirmation(false)}
                  >
                    Edit
                  </Button>

                  {/* SAVE */}
                  {!customerValue.batchLoads || unSavedUnits.length === 0 ? (
                    <Button
                      className="px-5 save-btn text-light"
                      onClick={() => {
                        handleOrderConfirmationSave();
                        setShowOrderConfirmation(false);
                      }}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className="btn-dark px-5"
                      onClick={() => {
                        setShowOrderConfirmation(false);
                        setTimeout(() => {
                          setSavedUnits([]);
                          setUnSavedUnits([]);
                        }, 150);
                      }}
                    >
                      Close
                    </Button>
                  )}
                </Modal.Footer>
              </Modal>
              <CommonModal
                show={showError || showSuccess}
                onHide={() => {
                  setShowError(false);
                  setShowSuccess(false);
                  setSuccessMsg("");
                  setErrorMsg("");
                }}
                title={`${showSuccess ? "Success !!" : "Warning !!"}`}
                body={errorMsg || successMsg}
                handleOK={() => {
                  setShowError(false);
                  setShowSuccess(false);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                showOK
                color={showError ? "red" : ""}
              />

              <UnitActivationSingleSelectionScreenModal
                show={unitActivation && !showSuccess}
                onHide={() => {
                  setUnitActivation(false);
                  setUnitActivationObj(null);
                }}
                orderEntry
                unitNumber={unitActivationObj?.unitNumber}
                last5={unitActivationObj?.last5}
                unitIdOE={unitActivationObj?.unitIdOE}
              />

              {/* Lock error modal */}
              <CommonModal
                show={lockError}
                onHide={() => {
                  setLockError("");
                }}
                title={`Warning !!`}
                body={lockError}
                handleOK={() => {
                  setLockError("");
                }}
                showOK
                color={lockError ? "red" : ""}
              />

              {/* pre-invoice modal */}
              <CommonModal
                show={preInvoiceModal}
                onHide={() => setPreInvoiceModal(false)}
                title={"Pre-Invoice Generation Completed"}
                body={
                  <div>
                    {preInvoiceResult?.length > 0 && (
                      <div style={{ maxHeight: "150px", overflowY: "auto" }} className="mt-4">
                        <table className="table table-bordered rounded">
                          <thead>
                            <tr>
                              <th className="fw-bolder">Unit Number</th>
                              <th className="fw-bolder">Invoice Number</th>
                            </tr>
                          </thead>
                          <tbody className="overflow-auto">
                            {preInvoiceResult?.map((invoice, index) => (
                              <tr key={index}>
                                <td>{invoice?.unitNumber}</td>
                                <td>{invoice?.invoiceNumber}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                }
                handleOK={() => {
                  setPreInvoiceModal(false);
                }}
                showOK
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default OrderEntryTemplate;
