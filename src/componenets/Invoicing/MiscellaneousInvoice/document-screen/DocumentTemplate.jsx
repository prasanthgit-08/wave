import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import DocumentContent from "./DocumentContent";
import ButtonComponent from "../../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";
import {
  resetCustomerDealer,
  resetExistingMiscellaneous,
  resetDetailsandTextTabValues,
  setIsNonUnitNumberPresent,
  setCompanyPaperworkFiles,
  setCustomerPaperworkFiles,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberPK,
  setViewDetail,
  setMiscInvoiceFormData,
  setChangeColor,
  resetCreditCardStates,
  setIsRequirePO,
  setId,
  setMiscInvoiceData,
  resetChanges,
  setMiscInvoiceFiles,
  setIsSisterCompany,
  setInvoiceSisterCustomer,
  setIsLocalCompany,
  setNotCrossCompany,
  setCompanyName,
  setSelectedOption,
  setNotCrossCompanydata2,
  setCreditCardArrayList,
  setTransIds,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";

function DocumentTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [closeShow, setCloseShow] = useState(false);
  const [disableClose, setDisableClose] = useState(false);
  const [disableCancel, setDisableCancel] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [showInvoiceGenerationSuccess, setShowInvoiceGenerationSuccess] = useState(false);
  const [invoiceResponseList, setInvoiceResponseList] = useState([]);
  const [isNonUnitInvoiceModal, setIsNonUnitInvoiceModal] = useState(false);
  const miscInvoiceFormData = useSelector((state) => state.miscInvoiceReducer.miscInvoiceFormData);
  const isDetailsTabValid = useSelector((state) => state.miscInvoiceReducer.isDetailsTabValid);
  const viewDetail = useSelector((state) => state.miscInvoiceReducer.viewDetail);
  const miscInvoiceFiles = useSelector((state) => state.miscInvoiceReducer.miscInvoiceFiles);
  const unitNumber = useSelector((state) => state.miscInvoiceReducer.unitNumber);
  const [loader, setLoader] = useState(false);
  const { customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles } = miscInvoiceFiles;
  const localCompanyName = useSelector((state) => state.miscInvoiceReducer.localCompanyName);

  /****Used to solve the issues related to close and backbutton click*****/

  window.addEventListener("popstate", () => {
    navigate(`/misc-invoice-unitselection`);
  });

  /*******
   * Save Validation for Miscellaneous Invoice
   * *****/
  useEffect(() => {
    if (isDetailsTabValid) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [isDetailsTabValid]);

  const onHandleCloseShow = () => {
    if (disableClose) {
      setCloseShow(true);
    } else {
      dispatch(setViewDetail(false));
      dispatch(setChangeColor(false));
      dispatch(setPageNumber(0));
      dispatch(setSearchTerm(""));
      dispatch(setUnitNumberPK(null));
      dispatch(setUnitNumber(""));
      dispatch(setSearchCriteria(""));
      dispatch(setUnitNumberLast5(""));
      dispatch(resetCustomerDealer());
      dispatch(setCustomerPaperworkFiles([]));
      dispatch(setCompanyPaperworkFiles([]));
      dispatch(setMiscInvoiceFormData(null));
      dispatch(resetDetailsandTextTabValues());
      dispatch(resetCreditCardStates());
      dispatch(setIsNonUnitNumberPresent(false));
      dispatch(setIsRequirePO(false));
      dispatch(setId(null));
      dispatch(setMiscInvoiceData([]));
      dispatch(setIsSisterCompany(false));
      dispatch(setInvoiceSisterCustomer(false));
      dispatch(resetChanges());
      dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
      dispatch(setIsLocalCompany(false));
      dispatch(setNotCrossCompany([]));
      dispatch(setNotCrossCompanydata2([]));

      dispatch(setCompanyName(localCompanyName));
      navigate(`/`);
      toast.success("Page closed");
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    dispatch(setViewDetail(false));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
    dispatch(setSearchTerm(""));
    dispatch(setUnitNumberPK(null));
    dispatch(setUnitNumber(""));
    dispatch(setSearchCriteria(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(resetCustomerDealer());
    dispatch(setCustomerPaperworkFiles([]));
    dispatch(setCompanyPaperworkFiles([]));
    dispatch(setMiscInvoiceFormData(null));
    dispatch(resetDetailsandTextTabValues());
    dispatch(resetCreditCardStates());
    dispatch(setIsNonUnitNumberPresent(false));
    dispatch(setIsRequirePO(false));
    dispatch(setId(null));
    dispatch(setMiscInvoiceData([]));
    dispatch(resetChanges());
    dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
    dispatch(setIsLocalCompany(false));
    dispatch(setNotCrossCompany([]));
    dispatch(setNotCrossCompanydata2([]));
    dispatch(setCompanyName(localCompanyName));
    navigate(`/`);
    setCloseShow(false);
    toast.success("Page Closed");
  };
  /*****
   * to close the window based on condition
   * ******/
  useEffect(() => {
    if (
      window.location.pathname === `/misc-invoice-document/${id}` ||
      window.location.pathname === `/misc-invoice-document`
    ) {
      setDisableClose(true);
    } else {
      setDisableClose(false);
    }
  }, [window]);

  /*****
   * Save Invoice Record
   ******/
  const saveInvoiceRecord = () => {
    setLoader(true);
    MiscInvoiceService.saveInvoiceData(
      miscInvoiceFormData,
      [...customerUploadFiles, ...customerScanFiles],
      [...companyUploadFiles, ...companyScanFiles]
    )
      .then((response) => {
        const { viewData, creditCardResponse } = response?.data || {};

        if (String(creditCardResponse?.errorCode) === "1") {
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
        } else {
          /**Extract required values from the response.
           * Documents, StatementDetails and InvoiceBatches are saved by the same call.**/
          const {
            invoiceNumber,
            isNonUnitInvoice,
            miscellaneousUnit,
            sisterInvoiceNumber,
            sisterCompanyName,
            localCompanyName,
          } = viewData || {};

          /**Dispatch actions to reset state**/
          dispatch(setViewDetail(false));
          dispatch(setIsNonUnitNumberPresent(false));
          dispatch(setIsRequirePO(false));
          dispatch(resetDetailsandTextTabValues());
          dispatch(resetExistingMiscellaneous());
          dispatch(setViewDetail(false));
          dispatch(resetCustomerDealer());
          dispatch(setCustomerPaperworkFiles([]));
          dispatch(setCompanyPaperworkFiles([]));
          dispatch(setMiscInvoiceFormData(null));
          dispatch(resetCreditCardStates());
          dispatch(setIsSisterCompany(false));
          dispatch(setInvoiceSisterCustomer(false));
          dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
          dispatch(setNotCrossCompany([]));
          dispatch(setNotCrossCompanydata2([]));

          const responseList = [
            {
              unitNumber: isNonUnitInvoice ? miscellaneousUnit : unitNumber,
              invoiceNumber: invoiceNumber,
              companyName: localCompanyName,
            },
          ];
          if (sisterInvoiceNumber) {
            responseList.push({
              unitNumber: isNonUnitInvoice ? miscellaneousUnit : unitNumber,
              invoiceNumber: sisterInvoiceNumber,
              companyName: sisterCompanyName,
            });
          }
          setInvoiceResponseList(responseList);
          setIsNonUnitInvoiceModal(isNonUnitInvoice);
          setShowInvoiceGenerationSuccess(true);
        }
      })

      .catch((error) => {
        console.error("Error saving invoice data:", error);
        dispatch(setViewDetail(false));
        dispatch(setIsNonUnitNumberPresent(false));
        dispatch(setIsRequirePO(false));
        dispatch(resetDetailsandTextTabValues());
        dispatch(resetExistingMiscellaneous());
        dispatch(setViewDetail(false));
        dispatch(resetCustomerDealer());
        dispatch(setCustomerPaperworkFiles([]));
        dispatch(setCompanyPaperworkFiles([]));
        dispatch(setMiscInvoiceFormData(null));
        dispatch(resetCreditCardStates());
        dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
        dispatch(setIsSisterCompany(false));
        dispatch(setInvoiceSisterCustomer(false));
        dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
        dispatch(setNotCrossCompany([]));
        dispatch(setNotCrossCompanydata2([]));

        navigate(`/misc-invoice-unitselection`);
      })
      .finally(() => {
        dispatch(setViewDetail(false));
        dispatch(setIsNonUnitNumberPresent(false));
        dispatch(setIsRequirePO(false));
        dispatch(resetDetailsandTextTabValues());
        dispatch(resetExistingMiscellaneous());
        dispatch(setViewDetail(false));
        dispatch(resetCustomerDealer());
        dispatch(setCustomerPaperworkFiles([]));
        dispatch(setCompanyPaperworkFiles([]));
        dispatch(setMiscInvoiceFormData(null));
        dispatch(resetCreditCardStates());
        dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
        setLoader(false);
      });
  };
  const handleCancelShow = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(`/misc-invoice-unitselection`);
    dispatch(resetDetailsandTextTabValues());
    dispatch(resetCustomerDealer());
    dispatch(setIsNonUnitNumberPresent(false));
    dispatch(setViewDetail(false));
    dispatch(resetExistingMiscellaneous());
    dispatch(setIsRequirePO(false));
    dispatch(setCustomerPaperworkFiles([]));
    dispatch(setCompanyPaperworkFiles([]));
    dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
    dispatch(setMiscInvoiceFormData(null));
    dispatch(setIsSisterCompany(false));
    dispatch(resetCreditCardStates());
    dispatch(setInvoiceSisterCustomer(false));
    dispatch(setNotCrossCompany([]));
    dispatch(setNotCrossCompanydata2([]));

    dispatch(setSelectedOption("Customer"));
    toast.success("Changes Cancelled");
    setCancelShow(false);
  };

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
      <>
        <DocumentContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => saveInvoiceRecord()}
            disabled={miscInvoiceFiles?.isScanning}
          >
            {loader === true ? (
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
            onClick={(e) => {
              if (id) {
                navigate(`/misc-invoice-details/${id}`);
              } else {
                navigate(`/misc-invoice-details`);
              }
            }}
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
            show={closeShow}
            onHide={handleCloseNo}
            title={"Close Miscellaneous Invoice"}
            body="Please confirm you want to close the program without saving your changes"
            handleYES={handleCloseYes}
            handleNO={handleCloseNo}
          />
          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Miscellaneous Invoice Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />

          {/* Invoice Generation Success Modal */}
          <ModalComponent
            show={showInvoiceGenerationSuccess}
            onHide={() => {
              setShowInvoiceGenerationSuccess(false);
              navigate(`/misc-invoice-unitselection`);
            }}
            title={"Invoice Generation Completed"}
            body={
              <div>
                {invoiceResponseList?.length > 0 && (
                  <div style={{ maxHeight: "150px", overflowY: "auto" }} className="mt-4">
                    <table className="table table-bordered rounded">
                      <thead>
                        <tr>
                          <th className="fw-bolder">
                            {isNonUnitInvoiceModal ? "Miscellaneous Unit Number" : "Unit Number"}
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
            handleOK={() => {
              setShowInvoiceGenerationSuccess(false);
              navigate(`/misc-invoice-unitselection`);
            }}
            showOK
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
}

export default DocumentTemplate;
