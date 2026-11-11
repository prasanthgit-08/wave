import React, { useEffect, useRef, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import InvoiceInformationViewContent from "./InvoiceInformationViewContent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  setAmountForCreditCard,
  setCreditCardArrayList,
  setInvoiceDetailPK,
  setInvoiceDetailsData,
  setRemainingAmount,
  setNonUnitData,
  setSaveEditInvoice,
  setUnitSelectionReset,
  setViewDetail,
} from "../../../../redux/Invoicing/EditInvoiceSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import CreditCardComponent from "../../../../modules/credit-card/CreditCardComponent";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";

const InvoiceInformationView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();
  const { viewDetail } = useSelector((state) => state.editInvoiceReducer);
  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const invoiceDetailsData = useSelector((state) => state.editInvoiceReducer.invoiceDetailsData);
  const invoiceById = useSelector((state) => state.editInvoiceReducer.invoiceById);
  const { currentInvoiceMiles, invoiceFlatRate, reroutFlag } = invoiceById[0] || {};
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showCreditCardWarning, setShowCreditCardWarning] = useState(false);
  const amountForCreditCard = useSelector((state) => state.editInvoiceReducer.amountForCreditCard);
  const creditCardArrayList = useSelector((state) => state.editInvoiceReducer.creditCardArrayList);
  const [cancelShow, setCancelShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);
  const nonUnitData = useSelector((state) => state.editInvoiceReducer.nonUnitData);
  const unitSelectionReset = useSelector((state) => state.editInvoiceReducer.unitSelectionReset);
  const remainingAmount = useSelector((state) => state.editInvoiceReducer.remainingAmount);
  const dispatchStatus = useSelector((state) => state.editInvoiceReducer.dispatchStatus);
  const isCreditCardRequired = useSelector((state) => state.editInvoiceReducer.isCreditCardRequired);
  const [amountReset, setAmountReset] = useState(false);
  const initialTriger = useRef(true);

  useEffect(() => {
    dispatch(
      setSaveEditInvoice({
        key: "creditCardArrayList",
        payload: creditCardArrayList,
      })
    );
  }, [creditCardArrayList]);

  //cancel
  const handleCancelShow = () => {
    if (viewDetail) {
      dispatch(setInvoiceDetailPK(null));
      dispatch(setInvoiceDetailsData([]));
      dispatch(setNonUnitData([]));
      setCancelShow(false);
      dispatch(resetFields());
      dispatch(setUnitSelectionReset(false));
      nonUnitData?.length > 0
        ? navigate("/edit-invoice/invoice-non-unit-selection")
        : navigate("/edit-invoice/invoice-unit-selection");
    } else {
      setCancelShow(true);
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setInvoiceDetailPK(null));
    dispatch(setInvoiceDetailsData([]));
    dispatch(setNonUnitData([]));
    dispatch(resetFields());
    dispatch(setCreditCardArrayList([]));
    dispatch(setViewDetail(true));
    toast.success("Changes Cancelled");
    setCancelShow(false);
    dispatch(setUnitSelectionReset(false));
  };

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      dispatch(setInvoiceDetailPK(null));
      dispatch(setInvoiceDetailsData([]));
      dispatch(setNonUnitData([]));
      setCloseShow(false);
      dispatch(resetFields());
      dispatch(setUnitSelectionReset(false));
      navigate("/");
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseNo = () => setCloseShow(false);

  const onHandleCloseYes = () => {
    dispatch(resetFields());
    dispatch(setUnitSelectionReset(false));
    navigate("/");
    toast.success("Page Closed");
  };

  const totalAmountSum = invoiceDetailsData?.reduce((sum, record) => {
    const amount = Number(record.totalAmount) || 0;
    return sum + amount;
  }, 0);

  useEffect(() => {
    if (initialTriger.current) {
      initialTriger.current = false;
      return;
    }
    dispatch(setAmountForCreditCard(totalAmountSum - invoiceById[0]?.invoiceAmount));
  }, [invoiceDetailsData]);

  useEffect(() => {
    if (!unitSelectionReset) {
      navigate(`/edit-invoice/invoice-unit-selection`);
    }
  }, [unitSelectionReset]);

  const prevAmount = useRef(amountForCreditCard);

  useEffect(() => {
    if (prevAmount.current !== amountForCreditCard) {
      dispatch(setCreditCardArrayList([]));
      setAmountReset(true);
      setRemainingAmount(0);
      prevAmount.current = amountForCreditCard;
    }
  }, [amountForCreditCard]);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
      <>
        <InvoiceInformationViewContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          {/* Credit Card */}
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            disabled={
              viewDetail ||
              invoiceById[0]?.sisterUnitFK !== null ||
              !isCreditCardRequired ||
              (isCreditCardRequired && amountForCreditCard === 0)
            }
            onClick={() => setShowCreditCard(true)}
          >
            Credit Card
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={!viewDetail}
            onClick={() => {
              navigate(`/edit-invoice-void/${invoicePK}`);
            }}
          >
            Void
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setViewDetail(false));
              if (Number(invoiceFlatRate) <= 0 && currentInvoiceMiles > 0 && !reroutFlag) {
                const tempArray = invoiceDetailsData.map((element) => {
                  // Check if miles is greater than 0
                  if (element.miles > 0) {
                    const rateNum = parseFloat(element.mileageRate);
                    const milesNum = parseFloat(currentInvoiceMiles);

                    if (!isNaN(rateNum) && !isNaN(milesNum)) {
                      const result = rateNum * milesNum;
                      return {
                        ...element,
                        miles: currentInvoiceMiles, // Replace miles
                        totalAmount: Math.round(result * 100) / 100, // Recalculate total amount
                      };
                    }
                  }
                  // Return the element unchanged if miles <= 0
                  return element;
                });
                dispatch(setInvoiceDetailsData(tempArray));
              }
            }}
            hidden={!viewDetail}
          >
            Edit
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={!viewDetail}
            onClick={() => {
              goBack();
            }}
          >
            Back
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={viewDetail}
            onClick={() => {
              if (
                (isCreditCardRequired && Number(remainingAmount) === 0 && nonUnitData?.length <= 0) ||
                (nonUnitData?.length > 0 && isCreditCardRequired && Number(remainingAmount) === 0) ||
                !isCreditCardRequired ||
                invoiceById[0]?.sisterUnitFK !== null
              ) {
                navigate(`/edit-invoice-save`);
              } else {
                setShowCreditCardWarning(true);
              }
            }}
            disabled={isCreditCardRequired && Number(remainingAmount) !== 0}
          >
            Next
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={handleCancelShow}
          >
            Cancel
          </button>

          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Edit Invoice"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />

          {/* Credit Card Modal */}
          <CreditCardComponent
            show={showCreditCard}
            onHide={() => setShowCreditCard(false)}
            amountTitle={"Adjustment Amount"}
            source={"Edit Invoice"}
            programName={"EditInvoice"}
            creditCardArrayList={creditCardArrayList}
            incomingAmount={amountForCreditCard}
            setCreditCardArrayList={(value) => dispatch(setCreditCardArrayList(value))}
            unitPK={invoiceById[0]?.unitFK}
            customerId={invoiceById[0]?.customerFK}
            dispatched={nonUnitData?.length > 0 ? true : dispatchStatus || null}
            remainingAmountValue={remainingAmount}
            setRemainingAmount={(value) => dispatch(setRemainingAmount(value))}
            setResetAmounts={setAmountReset}
          />
          {/* Modal for Credit Card Warning */}
          <ModalComponent
            show={showCreditCardWarning}
            onHide={() => setShowCreditCardWarning(false)}
            title={"Adjust Remaining Amount"}
            body={`Please adjust the remaining amount ${remainingAmount}`}
            okayButton
          />
          <ModalComponent
            show={closeShow}
            onHide={onHandleCloseNo}
            title={"Close Edit Invoice"}
            body="Please confirm you want to close the program without saving your changes"
            handleYES={onHandleCloseYes}
            handleNO={onHandleCloseNo}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default InvoiceInformationView;
