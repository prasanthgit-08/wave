import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetUndispatchDetails,
  setCreditCardArrayList,
  setRemainingAmount,
  setUndispatchFlag,
} from "../../../../../../../../redux/UndispatchSlice";
import toast from "react-hot-toast";
import CreditCard from "../../../../../../../../modules/credit-card/CreditCard";
import CreditCardComponent from "../../../../../../../../modules/credit-card/CreditCardComponent";

const DeleteUnitFooter = () => {
  const { driverId, dispatchId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteReason = useSelector((state) => state.undispatchReducer.deleteReason);
  const creditCardArrayList = useSelector((state) => state.undispatchReducer.creditCardArrayList);
  const remainingAmount = useSelector((state) => state.undispatchReducer.remainingAmount);
  const dispatchData = useSelector((state) => state.undispatchReducer.dispatchData);
  const attemptedPickup = useSelector((state) => state.undispatchReducer.attemptedPickup);
  const equipment = useSelector((state) => state.undispatchReducer.equipment);
  const checkEquipment = useSelector((state) => state.undispatchReducer.checkEquipment);

  const [showCreditCard, setShowCreditCard] = useState(false);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {/* Credit Card */}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => setShowCreditCard(true)}
          disabled={!dispatchData?.unitAmount || !dispatchData?.creditCardPrepaid}
        >
          Credit Card
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            if (attemptedPickup) {
              navigate(`/undispatch-apu-screen/${driverId}/${dispatchId}`);
            } else {
              navigate(`/undispatch-confirmation/${driverId}/${dispatchId}`);
            }
          }}
          disabled={
            !deleteReason ||
            (dispatchData?.unitAmount &&
              dispatchData?.creditCardPrepaid &&
              creditCardArrayList?.length === 0) ||
            (creditCardArrayList?.length !== 0 && Number(remainingAmount) !== 0)
          }
        >
          Next
        </button>{" "}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            if (equipment === "Checkin" && checkEquipment) {
              navigate(`/undispatch-equipment-return-screen/${driverId}/${dispatchId}`);
            } else {
              navigate(`/undispatch-details-screen/${driverId}/${dispatchId}`);
            }
          }}
        >
          Back
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/undispatch/" + driverId);
            dispatch(resetUndispatchDetails());
            toast.success("Changes Cancelled");
            dispatch(setUndispatchFlag(false));
          }}
        >
          Cancel
        </button>
        {/* Credit Card Modal */}
        <CreditCardComponent
          show={showCreditCard}
          onHide={() => setShowCreditCard(false)}
          amountTitle={"Invoice Return Amount"}
          source={"Undispatch"}
          programName={"Undispatch"}
          creditCardArrayList={creditCardArrayList}
          incomingAmount={Number(dispatchData?.unitAmount || 0) * -1}
          setCreditCardArrayList={(value) => dispatch(setCreditCardArrayList(value))}
          unitPK={dispatchData?.unitPk}
          customerId={dispatchData?.customerFK}
          dispatched={true}
          remainingAmountValue={remainingAmount}
          setRemainingAmount={(value) => dispatch(setRemainingAmount(value))}
        />
      </div>
    </div>
  );
};

export default DeleteUnitFooter;
