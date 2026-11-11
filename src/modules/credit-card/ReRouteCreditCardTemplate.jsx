import React, { useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import RerouteCreditCardComponent from "./RerouteCreditCardComponent";
import { useEffect } from "react";

const ReRouteCreditCardTemplate = ({
  show,
  onHide,
  programName,
  setTotalRemainingAmount,
  dispatched,
  resetAmount,
  setResetAmount,
  checkingPreExistCredit,
  amountTitle,
  source,
  unitCardDetails,
  setUnitCardDetails,
  rate,
}) => {
  const updateUnit = (index, updatedFields) => {
    let arr = unitCardDetails.map((unit, i) =>
      i === index
        ? {
            ...unit,
            remainingAmount: updatedFields.remainingAmount,
            authorizedCards: updatedFields.authorizedCards || [],
          }
        : unit
    );
    setUnitCardDetails && setUnitCardDetails(arr);
  };
  const totalRemaining = Array.isArray(unitCardDetails)
    ? unitCardDetails.reduce((sum, unit) => sum + Number(unit.remainingAmount || 0), 0)
    : rate;

  useEffect(() => {
    if (show) {
      setTotalRemainingAmount && setTotalRemainingAmount(totalRemaining);
    }
  }, [totalRemaining]);

  const [tab, setTab] = useState(unitCardDetails[0]?.unitNumber);
  const close = () => {
    setTab(unitCardDetails[0]?.unitNumber);
    onHide();
  };
  return (
    <Modal
      show={show}
      onHide={close}
      backdrop="static"
      keyboard={false}
      className="lookupModal creditCardModal"
      dialogClassName={`modal-left lookupFix`}
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-18 h-100">Credit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body className="font-14 h-100">
        <Tabs
          activeKey={tab}
          onSelect={(k) => setTab(k)}
          mountOnEnter={true}
          unmountOnExit={false}
          id="uncontrolled-tab-example"
          className="m-b-2"
        >
          {unitCardDetails?.map((unit, index) => (
            <Tab eventKey={unit?.unitNumber} title={unit?.unitNumber}>
              <RerouteCreditCardComponent
                show={show}
                programName={programName}
                remainingAmountValue={unit?.remainingAmount}
                unitPK={unit?.unitpk}
                incomingAmount={rate - unit.fodInvoiceAmount}
                creditCardArrayList={unit.authorizedCards}
                setCreditCardArrayList={(cards, Amount) => {
                  updateUnit(index, { authorizedCards: cards, remainingAmount: Amount });
                }}
                {...unit}
                dispatched={dispatched}
                resetAmounts={resetAmount}
                setResetAmounts={setResetAmount}
                checkingPreExistCredit={checkingPreExistCredit}
                amountTitle={amountTitle}
                source={source}
                customerId={unit?.customerfk}
              />
            </Tab>
          ))}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default ReRouteCreditCardTemplate;
