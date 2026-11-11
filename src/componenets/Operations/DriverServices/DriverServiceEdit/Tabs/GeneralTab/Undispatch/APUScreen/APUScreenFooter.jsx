import React, { useEffect, useState } from "react";
import {
  resetApuScreen,
  resetUndispatchDetails,
  setAPUCreditCardArrayList,
  setApuBackButtonFlag,
  setApuRemainingAmount,
  setCreditCardArrayList,
  setCreditCardConfirmationFlag,
  setRemainingAmount,
  setUndispatchFlag,
} from "../../../../../../../../redux/UndispatchSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CreditCard from "../../../../../../../../modules/credit-card/CreditCard";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import CreditCardComponent from "../../../../../../../../modules/credit-card/CreditCardComponent";
const APUScreenFooter = () => {
  const [disableNext, setDisableNext] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId, dispatchId } = useParams();
  const {
    driverAmount,
    invoiceAmount,
    billingCustomer,
    billingCustomerId,
    billingCustomerInput,
    apuAuthorizedBy,
    creditCardArrayList,
    apuRemainingAmount,
    dispatchData,
    postingCompanyFK,
    chargeCreditcard,
    unitOnHold,
    activationStatus,
    creditCardData,
    equipment,
    checkEquipment,
    invoiceBillingCustomerId,
    apuCreditCardArrayList,
    deleteUnit,
  } = useSelector((state) => state.undispatchReducer);

  //next button validation
  useEffect(() => {
    const toSafeString = (val) => (val != null ? String(val)?.trim() : "");

    const driverStr = toSafeString(driverAmount);
    const invoiceStr = toSafeString(invoiceAmount);

    const isValidDriverAmount =
      driverStr !== "" && driverStr !== "." && driverStr !== "0." && !/^\d+\.$/.test(driverStr);

    const isValidInvoiceAmount =
      invoiceStr !== "" && invoiceStr !== "." && invoiceStr !== "0." && !/^\d+\.$/.test(invoiceStr);

    if (
      apuAuthorizedBy &&
      isValidDriverAmount &&
      isValidInvoiceAmount &&
      billingCustomerId &&
      billingCustomerInput
    ) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
  }, [
    billingCustomer,
    billingCustomerId,
    billingCustomerInput,
    apuAuthorizedBy,
    driverAmount,
    invoiceAmount,
  ]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10" />
      <div className="d-flex align-items-center flex-wrap">
        {/* Credit Card */}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          disabled={!chargeCreditcard}
          onClick={() => {
            setShowCreditCard(true);
            dispatch(setCreditCardConfirmationFlag(true));
          }}
        >
          Credit Card
        </button>
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"

          disabled={
            (creditCardData?.Case === "Case1" &&
              creditCardData?.Navigate === "Y" &&
              Number(apuRemainingAmount) !== 0) ||
            (creditCardData?.Case === "Case2" &&
              creditCardData?.Navigate === "Y" &&
              Number(apuRemainingAmount) !== 0) ||
            (creditCardData?.Case === "Case3" &&
              creditCardData?.Navigate === "Y" &&
              Number(apuRemainingAmount) !== 0) ||
            (chargeCreditcard &&
              creditCardData?.Case === "Case3" &&
              creditCardData?.Navigate === "P" &&
              Number(apuRemainingAmount) !== 0 &&
              apuCreditCardArrayList?.length !== 0) ||
            (chargeCreditcard &&
              creditCardData?.Case === "Case3" &&
              creditCardData?.Navigate === "P" &&
              apuCreditCardArrayList?.length === 0) ||
            !disableNext
          }

          onClick={() => {
            navigate(`/undispatch-apu-document-screen/${driverId}/${dispatchId}`);
          }}
        >
          Next
        </button>{" "}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            if (unitOnHold) {
              navigate(`/undispatch-hold-screen/${driverId}/${dispatchId}`);
            } else if (activationStatus === "Delay") {
              navigate(`/undispatch-activation-delay-screen/${driverId}/${dispatchId}`);
            } else if (equipment === "Checkin" && checkEquipment) {
              navigate(`/undispatch-equipment-return-screen/${driverId}/${dispatchId}`);
            } else if (deleteUnit) {
              navigate(`/undispatch-delete-unit-screen/${driverId}/${dispatchId}`);
            } else {
              navigate(`/undispatch-details-screen/${driverId}/${dispatchId}`);
            }
          }}
        >
          Back
        </button>
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/undispatch/" + driverId);
            dispatch(resetUndispatchDetails());
            dispatch(resetApuScreen());
            dispatch(setUndispatchFlag(false));
            dispatch(setCreditCardConfirmationFlag(false));
          }}
        >
          Cancel
        </button>
        {/* Credit Card Modal */}
        <CreditCardComponent
          show={showCreditCard}
          onHide={() => setShowCreditCard(false)}
          amountTitle={"APU Amount"}
          source={"Undispatch"}
          programName={"Undispatch"}
          creditCardArrayList={apuCreditCardArrayList}
          incomingAmount={invoiceAmount}
          setCreditCardArrayList={(value) => dispatch(setAPUCreditCardArrayList(value))}
          unitPK={dispatchData?.unitPk}
          customerId={invoiceBillingCustomerId}
          dispatched={true}
          remainingAmountValue={apuRemainingAmount}
          setRemainingAmount={(value) => dispatch(setApuRemainingAmount(value))}
        />
      </div>
    </div>
  );
};

export default APUScreenFooter;
