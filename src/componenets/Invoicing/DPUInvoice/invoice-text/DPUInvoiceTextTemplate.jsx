import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import { DPUInvoiceText } from "./DPUInvoiceText";
// import CreditCard from "../../../../modules/credit-card/CreditCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreditCardArrayList,
  setDpuInvoicePayload,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setUnitNumber,
  setInvoiceTextData,
  setUnitPK,
  setSelectedId,
  setDpuInvoiceData,
  setInputInvoiceText,
  setCreditCardClicked,
  setRemainingAmount,
  setUnitNumberConfirmation,
  setUnitNumberLast5,
  setBolNumber,
  setTransIds,
} from "../../../../redux/Invoicing/DPUInvoiceSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import CreditCardComponent from "../../../../modules/credit-card/CreditCardComponent";

function DPUInvoiceTextTemplate() {
  const [showCreditCard, setShowCreditCard] = useState(false);

  const creditCardArrayList = useSelector((state) => state.dpuInvoice.creditCardArrayList);
  const invoiceTextData = useSelector((state) => state.dpuInvoice.invoiceTextData);
  const customerFK = useSelector((state) => state.dpuInvoice.customerFK);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitPK = useSelector((state) => state.dpuInvoice.unitPK);

  const isCreditCardPrepaid = useSelector((state) => state.dpuInvoice.isCreditCardPrepaid);
  const inputInvoiceText = useSelector((state) => state.dpuInvoice.inputInvoiceText);
  const remainingAmount = useSelector((state) => state.dpuInvoice.remainingAmount);
  const transIds = useSelector((state) => state.dpuInvoice.transIds);

  const [closeShow, setCloseShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);

  const invoiceAmount = Number(invoiceTextData?.[0]?.InvoiceAmount || 0);
  const isCreditCardDisabled = invoiceAmount < 1 || !isCreditCardPrepaid;
  const isNextDisabled = invoiceAmount === 0 || (!isCreditCardDisabled && Number(remainingAmount) !== 0);

  const onHandleCloseShow = () => {
    setCloseShow(true);
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setInvoiceTextData([]));
    dispatch(setUnitPK(null));
    setCloseShow(false);
    dispatch(setUnitNumber(""));
    dispatch(setUnitNumberConfirmation(""));
    dispatch(setSelectedId(null));
    dispatch(setDpuInvoiceData([]));
    dispatch(setInputInvoiceText(inputInvoiceText));
    dispatch(setTransIds(""));
    dispatch(setCreditCardArrayList([]));
    setRemainingAmount(0);
    toast.success("Page Closed");
  };

  useEffect(() => {
    dispatch(
      setDpuInvoicePayload({
        monetraChargesVOList: creditCardArrayList,
        unitPK,
        transIds,
        IsCreditCardSelect: creditCardArrayList?.length > 0 ? true : false,
      })
    );
  }, [creditCardArrayList, unitPK, transIds]);

  useEffect(() => {
    if (!unitPK) {
      navigate("/DpuInvoice/browse");
    }
  }, []);

  const handleCancelShow = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    navigate("/DpuInvoice/browse");
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setBolNumber(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setUnitNumber(""));
    dispatch(setSelectedId(null));
    dispatch(setDpuInvoiceData([]));
    dispatch(setUnitNumberConfirmation(""));
    dispatch(setUnitNumber(""));
    dispatch(setUnitPK(null));
    dispatch(setChangeColor(false));
    dispatch(setCreditCardArrayList([]));
    setRemainingAmount(0);
    toast.success("Changes Cancelled");
  };

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

        <div className="col-xs-6">
          <ModalComponent
            show={closeShow}
            onHide={onHandleCloseNo}
            title={"Close Dpu invoice"}
            body="Please confirm you want to close the program without saving your changes"
            handleYES={onHandleCloseYes}
            handleNO={onHandleCloseNo}
          />
        </div>
      </div>
      <>
        <DPUInvoiceText />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          {/* Credit Card */}
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            onClick={() => {
              setShowCreditCard(true);
              dispatch(setCreditCardClicked(true));
            }}
            disabled={isCreditCardDisabled}
          >
            Credit Card
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => navigate("/DpuInvoice/paperWork")}
            disabled={isNextDisabled}
          >
            Next
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => navigate("/DpuInvoice/confirmation")}
          >
            Back
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={handleCancelShow}
          >
            Cancel
          </button>

          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel DPU Invoice Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />
        </div>

        {/* Credit Card Modal */}

        <CreditCardComponent
          show={showCreditCard}
          onHide={() => setShowCreditCard(false)}
          amountTitle={"Invoice Difference"}
          source={"DPU Invoice"}
          programName={"DPUInvoice"}
          creditCardArrayList={creditCardArrayList}
          incomingAmount={
            (Number(invoiceTextData?.[0]?.InvoiceAmount) || 0) +
            (Number(invoiceTextData?.[0]?.StorageFee) || 0) +
            (Number(invoiceTextData?.[0]?.StartAndrunFee) || 0)
          }
          setCreditCardArrayList={(value) => dispatch(setCreditCardArrayList(value))}
          unitPK={unitPK}
          customerId={customerFK}
          dispatched={true}
          remainingAmountValue={remainingAmount}
          setRemainingAmount={(value) => dispatch(setRemainingAmount(value))}
        />
      </div>
    </QuarterScreenWrapper>
  );
}

export default DPUInvoiceTextTemplate;
