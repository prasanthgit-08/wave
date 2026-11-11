import React, { useEffect, useState } from "react";
import InvoiceSaveContent from "./InvoiceSaveContent";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  setCreditCardArrayList,
  setDetailChange,
  setInvoiceById,
  setInvoiceData,
  setInvoiceNumber,
  setSaveEditInvoice,
  setTransIds,
  setUnitNumber,
  setUnitNumberId,
  setUnitNumberLast5,
  setUnitSelectionReset,
} from "../../../../redux/Invoicing/EditInvoiceSlice";
import EditInvoiceService from "../../../../services/Invoicing/EditInvoiceService";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import LoadingIcon from "../../../common/LoadingIcon";
import PreviewPopup from "../../../common/PreviewPopup";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
import { getCurrentCompany } from "../../../../utils/utils";

const InvoiceSave = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useAppNavigate();
  const saveEditInvoice = useSelector((state) => state.editInvoiceReducer.saveEditInvoice);
  const invoiceById = useSelector((state) => state.editInvoiceReducer.invoiceById);
  const invoiceDetailsData = useSelector((state) => state.editInvoiceReducer.invoiceDetailsData);
  const textChange = useSelector((state) => state.editInvoiceReducer.textChange);
  const detailChange = useSelector((state) => state.editInvoiceReducer.detailChange);
  const editReason = useSelector((state) => state.editInvoiceReducer.editReason);
  const nonUnitData = useSelector((state) => state.editInvoiceReducer.nonUnitData);
  const [cancelShow, setCancelShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const unitSelectionReset = useSelector((state) => state.editInvoiceReducer.unitSelectionReset);
  const print = useSelector((state) => state.editInvoiceReducer.print);
  const transIds = useSelector((state) => state.editInvoiceReducer.transIds);
  const unitNumber = useSelector((state) => state.editInvoiceReducer.unitNumber);
  const invoiceNumber = useSelector((state) => state.editInvoiceReducer.invoiceNumber);
  const [showInvoiceGenerationSuccess, setShowInvoiceGenerationSuccess] = useState(false);
  const [invoiceResponseList, setInvoiceResponseList] = useState([]);
  const currentCompanyName = getCurrentCompany()?.name || "";
  const isNonUnit = nonUnitData?.length > 0;
  const nonUnitInvoice = nonUnitData?.[0];

  const handleFinalSave = () => {
    setLoading(true);
    EditInvoiceService.saveNewInvoice(saveEditInvoice)
      .then((response) => {
        const { emailResponse, creditCardResponse } = response?.data || {};

        if (String(creditCardResponse?.errorCode) === "1") {
          // Hide the loader
          dispatch(setTransIds(creditCardResponse?.refTranID));
          dispatch(
            setCreditCardArrayList((prevList) =>
              prevList.map((card) =>
                creditCardResponse?.completedCards?.includes(card?.unmaskedCardNumber)
                  ? { ...card, processed: 1 }
                  : card
              )
            )
          );
          setLoading(false);
          toast.error("Credit Card Processing Failed. Cannot Save Invoice.");
        } else {
          if (print) {
            const attachments = emailResponse?.data?.[0]?.attachments || emailResponse?.[0]?.attachments;
            if (attachments && typeof attachments === "object") {
              const firstFileKey = Object.keys(attachments)[0];
              const fileBase64 = attachments[firstFileKey];
              if (fileBase64) {
                setFileContent(fileBase64);
                setShowPreview(true);
              } else {
                toast.error("No file content found");
              }
            } else {
              toast.error("Invalid Data");
            }
          }
          setInvoiceResponseList([
            {
              unitNumber: isNonUnit
                ? invoiceById?.[0]?.miscellaneousUnit
                : invoiceById?.[0]?.unitNumber || "",
              invoiceNumber: invoiceById?.[0]?.invoiceNumber,
              companyName: currentCompanyName,
            },
          ]);
          setShowInvoiceGenerationSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      })

      .finally(() => {
        setLoading(false);
        dispatch(setInvoiceById([]));
      });
  };

  useEffect(() => {
    dispatch(
      setSaveEditInvoice({
        key: "invoiceById",
        payload: { invoiceById, invoiceDetailsData },
      })
    );
  }, [invoiceById, invoiceDetailsData]);

  useEffect(() => {
    dispatch(
      setSaveEditInvoice({
        key: "transIds",
        payload: transIds,
      })
    );
  }, [transIds]);

  useEffect(() => {
    const changedArray = invoiceDetailsData?.filter(
      (invoice) =>
        invoice.description !== invoice.previousDescription ||
        Number(invoice.totalAmount) !== Number(invoice.previousTotalAmount)
    );
    dispatch(setDetailChange(changedArray.length > 0));
  }, [invoiceDetailsData]);

  //cancel
  const handleCancelShow = () => {
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    toast.success("Changes Cancelled");
    setCancelShow(false);
    dispatch(setInvoiceData([]));
    dispatch(setInvoiceById([]));
    nonUnitData?.length > 0
      ? navigate("/edit-invoice/invoice-non-unit-selection")
      : navigate("/edit-invoice/invoice-unit-selection");
    dispatch(resetFields());
    dispatch(setUnitSelectionReset(false));
  };

  const onHandleCloseShow = () => {
    setCloseShow(true);
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    toast.success("Page Closed");
    dispatch(resetFields());
    dispatch(setUnitSelectionReset(false));
  };

  useEffect(() => {
    if (!unitSelectionReset) {
      navigate(`/edit-invoice/invoice-unit-selection`);
    }
  }, [unitSelectionReset]);

  const hidepopup = () => {
    setShowPreview(false);
    !showInvoiceGenerationSuccess && navigate("/edit-invoice/invoice-unit-selection");
    !showInvoiceGenerationSuccess && dispatch(setUnitSelectionReset(false));
    !showInvoiceGenerationSuccess && dispatch(resetFields());
    dispatch(setInvoiceNumber(""));
    dispatch(setUnitNumber(""));
    dispatch(setUnitNumberId(null));
    dispatch(setUnitNumberLast5(""));
  };

  const hideInvoiceGenerationSuccess = () => {
    setShowInvoiceGenerationSuccess(false);
    navigate("/edit-invoice/invoice-unit-selection");
    dispatch(setUnitSelectionReset(false));
    dispatch(resetFields());
    dispatch(setInvoiceNumber(""));
    dispatch(setUnitNumber(""));
    dispatch(setUnitNumberId(null));
    dispatch(setUnitNumberLast5(""));
  };

  return (
    <QuarterScreenWrapper>
      {loading && <LoadingIcon />}
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
        <InvoiceSaveContent />
      </>

      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              handleFinalSave();
            }}
            disabled={
              !(
                (textChange || detailChange) &&
                editReason !== "" &&
                editReason !== null &&
                editReason !== undefined
              )
            }
          >
            Save
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              goBack();
            }}
          >
            Back
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={handleCancelShow}
          >
            Cancel
          </button>

          <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} />

          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Edit Invoice"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />

          <ModalComponent
            show={closeShow}
            onHide={onHandleCloseNo}
            title={"Close Edit Invoice"}
            body="Please confirm you want to close the program without saving your changes"
            handleYES={onHandleCloseYes}
            handleNO={onHandleCloseNo}
          />

          {/* Invoice Generation Success Modal */}
          <ModalComponent
            show={!showPreview && showInvoiceGenerationSuccess}
            onHide={hideInvoiceGenerationSuccess}
            title={"Invoice Edited Successfully"}
            body={
              <div>
                {invoiceResponseList?.length > 0 && (
                  <div style={{ maxHeight: "150px", overflowY: "auto" }} className="mt-4">
                    <table className="table table-bordered rounded">
                      <thead>
                        <tr>
                          <th className="fw-bolder">
                            {isNonUnit ? "Miscellaneous Unit Number" : "Unit Number"}
                          </th>
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
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default InvoiceSave;
