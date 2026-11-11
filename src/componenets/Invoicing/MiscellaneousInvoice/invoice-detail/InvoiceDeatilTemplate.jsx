import React, { useEffect, useRef, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import InvoiceDeatilContent from "./InvoiceDeatilContent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCustomerDealer,
  setIsNonUnitNumberPresent,
  resetDetailsandTextTabValues,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberPK,
  setViewDetail,
  setCustomerPaperworkFiles,
  setCompanyPaperworkFiles,
  setMiscInvoiceData,
  setMiscInvoiceFormData,
  setCreditCardArrayList,
  resetExistingMiscellaneous,
  setCreditCardNavigation,
  setCreditCardCase,
  resetCreditCardStates,
  setDescription,
  setAmount,
  setIsRequirePO,
  setId,
  resetChanges,
  setMiscInvoiceFiles,
  setIsSisterCompany,
  setInvoiceSisterCustomer,
  setIsLocalCompany,
  setNotCrossCompany,
  setCompanyName,
  setSelectedOption,
  setNotCrossCompanydata2,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";
import CreditCardComponent from "../../../../modules/credit-card/CreditCardComponent";

function InvoiceDeatilTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const totalAmount = useSelector((state) => state.miscInvoiceReducer.totalAmount);
  const isExistingMiscInvoice = useSelector((state) => state.miscInvoiceReducer.isExistingMiscInvoice);
  const amount = useSelector((state) => state.miscInvoiceReducer.amount);
  const description = useSelector((state) => state.miscInvoiceReducer.description);
  const list = useSelector((state) => state.miscInvoiceReducer.list);
  const creditCardArrayList = useSelector((state) => state.miscInvoiceReducer.creditCardArrayList);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const companyFK = useSelector((state) => state.miscInvoiceReducer.companyFK);
  const customerFK = useSelector((state) => state.miscInvoiceReducer.customerFK);
  const creditCardNavigation = useSelector((state) => state.miscInvoiceReducer.creditCardNavigation);
  const creditCardCase = useSelector((state) => state.miscInvoiceReducer.creditCardCase);
  const invoiceSisterCustomer = useSelector((state) => state.miscInvoiceReducer.invoiceSisterCustomer);
  const isSisterCompany = useSelector((state) => state.miscInvoiceReducer.isSisterCompany);
  const flagAddorEdit = useSelector((state) => state.miscInvoiceReducer.flagAddorEdit);
  const companyName = useSelector((state) => state.miscInvoiceReducer.companyName);
  const localCompanyName = useSelector((state) => state.miscInvoiceReducer.localCompanyName);
  const notCrossCompany = useSelector((state) => state.miscInvoiceReducer.notCrossCompany);
  const dispatchStatus = useSelector((state) => state.miscInvoiceReducer.dispatchStatus);
  const isNonUnitInvoice = useSelector((state) => state.miscInvoiceReducer.isNonUnitInvoice);
  const [amountReset, setAmountReset] = useState(false);

  /*******
   * Used to solve the issue related to solve the issue related
   *  to close and back button click
   * **** */
  window.addEventListener("popstate", () => {
    navigate(`/misc-invoice-unitselection`);
  });

  /******
   * Get the status to navigate to the credit card Screen
   *******/
  const getStatusForCreditCard = () => {
    MiscInvoiceService.getCreditCardStatus(id, customerFK, companyFK, invoiceSisterCustomer, isSisterCompany)
      .then((response) => {
        /****  Ensure `CreditCardStatus` exists and is an array**/
        const creditCardStatus = response?.data?.CreditCardStatus;
        if (!Array.isArray(creditCardStatus) || creditCardStatus?.length === 0) {
          console.error("No valid data received for CreditCardStatus");
          return;
        }
        /**** Extract first object from array*****/
        const creditCardData = creditCardStatus[0];
        if (creditCardData) {
          const navigateStatus = creditCardData.Navigate;
          dispatch(setCreditCardNavigation(navigateStatus));
          const creditCardCase = creditCardData.Case;
          dispatch(setCreditCardCase(creditCardCase));
        } else {
          console.error("Error: First object in array is null/undefined.");
        }
      })
      .catch((error) => {
        console.error("Error fetching credit card status:", error);
      });
  };

  useEffect(() => {
    getStatusForCreditCard();
  }, [id, customerFK, companyFK, invoiceSisterCustomer, isSisterCompany]);

  const prevAmount = useRef(totalAmount);

  useEffect(() => {
    if (prevAmount.current !== totalAmount) {
      dispatch(setCreditCardArrayList([]));
      setAmountReset(true);
      prevAmount.current = totalAmount;
    }
  }, [totalAmount]);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={(e) => {
            navigate(`/`);
            dispatch(setId(null));
            dispatch(setViewDetail(false));
            dispatch(setPageNumber(0));
            dispatch(setSearchTerm(""));
            dispatch(setUnitNumberPK(null));
            dispatch(setUnitNumber(""));
            dispatch(setSearchCriteria(""));
            dispatch(setUnitNumberLast5(""));
            dispatch(resetCustomerDealer());
            dispatch(setCustomerPaperworkFiles([]));
            dispatch(setCompanyPaperworkFiles([]));
            dispatch(setViewDetail(false));
            dispatch(setMiscInvoiceFormData(null));
            dispatch(setMiscInvoiceData([]));
            dispatch(resetDetailsandTextTabValues());
            dispatch(setIsSisterCompany(false));
            dispatch(setInvoiceSisterCustomer(false));
            dispatch(resetChanges());
            dispatch(resetCreditCardStates());
            dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
            dispatch(setIsLocalCompany(false));
            dispatch(setNotCrossCompany([]));
            dispatch(setNotCrossCompanydata2([]));
            dispatch(setCompanyName(localCompanyName));
            dispatch(setSelectedOption("Customer"));
          }}
        >
          Close
        </button>
      </div>
      <>
        <InvoiceDeatilContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          {/* Credit Card */}
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            disabled={
              (creditCardNavigation === "N" && !isSisterCompany) ||
              totalAmount === 0 ||
              (isSisterCompany && !invoiceSisterCustomer) ||
              (creditCardNavigation === "N" && isSisterCompany && invoiceSisterCustomer)
            }
            onClick={() => setShowCreditCard(true)}
          >
            Credit Card
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              dispatch(setDescription(""));
              dispatch(setAmount(""));
              if (id) {
                navigate(`/misc-invoice-document/${id}`);
              } else {
                navigate(`/misc-invoice-document`);
              }
            }}
            disabled={
              !list ||
              totalAmount === 0 ||
              (flagAddorEdit && (!amount || !description)) ||
              list?.length === 0 ||
              ((!isSisterCompany || (isSisterCompany && invoiceSisterCustomer)) &&
                ((creditCardCase === "Case1" &&
                  creditCardNavigation === "Y" &&
                  Number(remainingAmount) !== 0) ||
                  (creditCardCase === "Case2" &&
                    creditCardNavigation === "Y" &&
                    Number(remainingAmount) !== 0) ||
                  (creditCardCase === "Case3" &&
                    creditCardNavigation === "Y" &&
                    Number(remainingAmount) !== 0) ||
                  (creditCardCase === "Case3" &&
                    creditCardNavigation === "P" &&
                    Number(remainingAmount) !== 0 &&
                    creditCardArrayList?.length !== 0)))
            }
          >
            Next
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              dispatch(setDescription(""));
              dispatch(setAmount(""));
              if (isExistingMiscInvoice) {
                navigate(`/misc-invoice-exist-invoice/${id}`);
              } else if (id && id !== "null" && !isSisterCompany && notCrossCompany?.ScreenId === 2) {
                navigate(`/misc-invoice-unitcon-nocross-noalter/${id}`);
              } else if (id && id !== "null" && !isSisterCompany && notCrossCompany?.ScreenId === 1) {
                navigate(`/misc-invoice-not-cross-alternate-customer/${id}`);
              } else if (id && id !== "null" && isSisterCompany) {
                navigate(`/misc-invoice-unitcon-cross/${id}`);
              } else {
                navigate("/misc-invoice-non-unit");
              }
            }}
          >
            Back
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              dispatch(resetDetailsandTextTabValues());
              dispatch(resetCustomerDealer());
              dispatch(setIsNonUnitNumberPresent(false));
              dispatch(resetExistingMiscellaneous());
              dispatch(setViewDetail(false));
              dispatch(setMiscInvoiceFormData(null));
              dispatch(resetCreditCardStates());
              dispatch(setIsNonUnitNumberPresent(false));
              dispatch(setIsRequirePO(false));
              dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
              dispatch(setIsSisterCompany(false));
              dispatch(setInvoiceSisterCustomer(false));
              dispatch(setNotCrossCompany([]));
              dispatch(setNotCrossCompanydata2([]));
              dispatch(setSelectedOption("Customer"));
              navigate(`/misc-invoice-unitselection`);
            }}
          >
            Cancel
          </button>
        </div>
        {/* Credit Card Modal */}
        <CreditCardComponent
          show={showCreditCard}
          onHide={() => setShowCreditCard(false)}
          amountTitle={"Invoice Difference"}
          source={"Misc Invoice"}
          programName={"MiscellaneousInvoice"}
          creditCardArrayList={creditCardArrayList}
          incomingAmount={totalAmount}
          setCreditCardArrayList={(value) => dispatch(setCreditCardArrayList(value))}
          unitPK={id}
          customerId={customerFK}
          dispatched={isNonUnitInvoice ? false : dispatchStatus}
          setRemainingAmount={(value) => setRemainingAmount(value)}
          remainingAmountValue={remainingAmount}
          resetAmounts={amountReset}
          setResetAmounts={setAmountReset}
        />
      </div>
    </QuarterScreenWrapper>
  );
}

export default InvoiceDeatilTemplate;
