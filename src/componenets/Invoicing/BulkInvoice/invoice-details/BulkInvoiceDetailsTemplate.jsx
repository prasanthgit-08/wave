import React, { useEffect, useState } from "react";
import BulkInvoiceDetails from "./BulkInvoiceDetails";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import BulkInvoiceService from "../../../../services/Invoicing/BulkInvoiceService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  updateField,
  setChangesCancelled,
  resetFormData,
  setSaveData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
} from "../../../../redux/Invoicing/BulkInvoiceSlice";
import ModalComponent from "../../../common/ModalComponent";
// import CreditCard from "../../../../modules/credit-card/CreditCard";
import { use } from "react";
import CreditCardComponent from "../../../../modules/credit-card/CreditCardComponent";

function BulkInvoiceDetailsTemplate() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [loadSave, setLoadSave] = useState(false);
  const [creditCardArrayList, setCreditCardArrayList] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(null);
  const [disableSave, setDisableSave] = useState(false);
  const [isCreditCardOpened, setisCreditCardOpened] = useState(false);
  const [transIds, setTransIds] = useState("");
  const [showInvoiceGenerationSuccess, setShowInvoiceGenerationSuccess] = useState(false);
  const [invoiceResponseList, setInvoiceResponseList] = useState([]);

  const saveData = useSelector((state) => state.bulkInvoiceReducer.saveData);
  const chargeCreditCardBit = useSelector((state) => state.bulkInvoiceReducer.chargeCreditCardBit);
  const dispatchStatus = useSelector((state) => state.bulkInvoiceReducer.dispatchStatus);
  const companyName = useSelector((state) => state.bulkInvoiceReducer.companyName);

  const formData = {
    customerFK: saveData?.customerFK,
    invoiceAmount: saveData?.invoiceAmount,
    poNumber: saveData.poNumber,
    invoiceText1: saveData?.invoiceTextInputValues?.[0] || "",
    invoiceText2: saveData?.invoiceTextInputValues?.[1] || "",
    invoiceText3: saveData?.invoiceTextInputValues?.[2] || "",
    invoiceText4: saveData?.invoiceTextInputValues?.[3] || "",
    ttID: "",
    bulkInvoicePK: id,
    monetraChargesVOList: creditCardArrayList,
    unitFK: saveData?.unitFK,
    chargeCreditCard: saveData?.chargeCreditCard,
    transIds: transIds || "",
  };

  const handleClose = () => {
    if (
      saveData?.invoiceTextInputValues &&
      saveData.invoiceTextInputValues?.length > 0 &&
      saveData.invoiceTextInputValues[0]?.trim()
    ) {
      setCloseShow(true);
    } else {
      dispatch(resetFormData());
      navigate(`/`);
      toast.success("Page closed");
    }
  };

  const saveRecord = () => {
    setLoadSave(true);
    BulkInvoiceService.createOrUpdateRecord(formData)

      .then((res) => {
        if (String(res?.errorCode) === "1") {
          toast.error("Something went wrong");
          setTransIds(res?.refTranID || "");
        }
        if (id) {
          toast.success("Bulk Invoices  Updated");
        } else {
          toast.success("Bulk Invoices Created");
        }
        dispatch(setPageNumber(0));
        dispatch(setSearchCriteria("Beginning"));
        dispatch(setSearchTerm(""));

        const savedInvoice = res?.data?.find((item) => item?.invoiceNumber);
        if (savedInvoice) {
          setInvoiceResponseList([
            {
              unitNumber: savedInvoice?.unitNumber || "",
              invoiceNumber: savedInvoice?.invoiceNumber || "",
              companyName: savedInvoice?.companyName || companyName,
            },
          ]);
        }

        setShowInvoiceGenerationSuccess(true);
      })
      .catch((err) => {
        navigate(`/bulk-invoice-details/${id}`);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoadSave(false);
      });
  };
  const hideInvoiceGenerationSuccess = () => {
    setShowInvoiceGenerationSuccess(false);
    navigate(`/bulk-invoice-unit-selection`);
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/`);
    dispatch(resetFields());

    toast.success("Page closed");
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setChangesCancelled(true);
    setCancelShow(false);
    toast.success("Changes Cancelled");

    // Clear form data
    dispatch(
      setSaveData({
        customer: null,
        description: "",
        poNumber: "",
        projectCode: "",
        invoiceAmount: 0,
        chargeCreditCard: "",
        invoiceText: "",
        invoiceTextInputValues: Array(4).fill(""),
        customerFK: null,
        unitFK: null,
      })
    );

    navigate("/bulk-invoice-unit-selection");
  };

  const handleCancel = () => {
    if (
      saveData?.invoiceTextInputValues &&
      saveData.invoiceTextInputValues?.length > 0 &&
      saveData.invoiceTextInputValues[0]?.trim()
    ) {
      setCancelShow(true);
    } else {
      navigate(`/bulk-invoice-unit-selection`); // Navigate if no changes to cancel
      toast.success("Changes Cancelled");
    }
  };

  useEffect(() => {
    if (chargeCreditCardBit && Number(remainingAmount) !== 0) {
      if (
        Number(remainingAmount) === Number(saveData?.invoiceAmount) &&
        saveData?.creditCardPayments === "A"
      ) {
        setDisableSave(false);
      } else {
        setDisableSave(true);
      }
    } else {
      setDisableSave(false);
    }
  }, [isCreditCardOpened, remainingAmount, chargeCreditCardBit, saveData]);

  useEffect(() => {
    if (showCreditCard) {
      setisCreditCardOpened(true);
    }
  }, [showCreditCard]);
  useEffect(() => {
    setisCreditCardOpened(false);
  }, []);

  return (
    <QuarterScreenWrapper>
      {loadSave && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleClose}
        >
          Close
        </button>
        <ModalComponent
          show={closeShow}
          onHide={handleCloseNo}
          title="Close Bulk Invoice  Changes "
          body="Please confirm you want to close the program without saving your changes"
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
      <>
        <BulkInvoiceDetails />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          {/* Credit Card */}
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            disabled={!chargeCreditCardBit || Number(saveData?.invoiceAmount) === 0}
            hidden={saveData.chargeCreditCard === "I"}
            onClick={() => {
              setShowCreditCard(true);
              setisCreditCardOpened(true);
            }}
          >
            Credit Card
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => saveRecord()}
            disabled={disableSave}
          >
            {loadSave ? (
              <div className="loader-container">
                <div className="loader_YardCheckin"></div>
              </div>
            ) : (
              "Save"
            )}
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Bulk Invoice  Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />

          <ModalComponent
            show={showInvoiceGenerationSuccess}
            onHide={hideInvoiceGenerationSuccess}
            title={"Invoice Generation Completed"}
            body={
              <div>
                {invoiceResponseList?.length > 0 && (
                  <div style={{ maxHeight: "150px", overflowY: "auto" }} className="mt-4">
                    <table className="table table-bordered rounded">
                      <thead>
                        <tr>
                          <th className="fw-bolder">Unit Number</th>
                          <th className="fw-bolder">Invoice Number</th>
                          <th className="fw-bolder">Company</th>
                        </tr>
                      </thead>
                      <tbody className="overflow-auto">
                        {invoiceResponseList?.map((unit, index) => (
                          <tr key={index}>
                            <td>{unit?.unitNumber}</td>
                            <td>{unit?.invoiceNumber}</td>
                            <td>{unit?.companyName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            }
            handleOK={hideInvoiceGenerationSuccess}
            showOK
          />
          <CreditCardComponent
            show={showCreditCard}
            onHide={() => setShowCreditCard(false)}
            amountTitle={"Invoice Difference"}
            source={"Bulk Invoice"}
            programName={"BulkInvoice"}
            creditCardArrayList={creditCardArrayList}
            incomingAmount={saveData?.invoiceAmount}
            setCreditCardArrayList={(value) => setCreditCardArrayList(value)}
            unitPK={id}
            customerId={saveData?.customerFK}
            dispatched={dispatchStatus}
            setRemainingAmount={setRemainingAmount}
            remainingAmountValue={remainingAmount}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
}

export default BulkInvoiceDetailsTemplate;
