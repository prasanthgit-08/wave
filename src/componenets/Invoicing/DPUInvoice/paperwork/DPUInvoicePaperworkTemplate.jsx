import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import DPUInvoicePaperwork from "./DPUInvoicePaperwork";
import { useNavigate } from "react-router-dom";
import DPUInvoiceService from "../../../../services/Invoicing/DPUInvoiceService";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setDpuInvoicePaperworkFiles,
  setUnitPK,
  resetChanges,
  setUnitNumberConfirmation,
  setUnitNumberLast5,
  setBolNumber,
  setSelectedId,
  setDpuInvoiceData,
  setCreditCardArrayList,
  setTransIds,
} from "../../../../redux/Invoicing/DPUInvoiceSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import LoadingIcon from "../../../common/LoadingIcon";
import { setUnitNumber } from "../../../../redux/UnitActivationSlice";

const DPUInvoicePaperworkTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unitPK = useSelector((state) => state.dpuInvoice.unitPK);
  const dpuInvoicePayload = useSelector((state) => state.dpuInvoice.dpuInvoicePayload);

  const disableSave = useSelector((state) => state.dpuInvoice.disableSave);
  const [closeShow, setCloseShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableClose, setDisableClose] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [showInvoiceGenerationSuccess, setShowInvoiceGenerationSuccess] = useState(false);
  const [invoiceResponseList, setInvoiceResponseList] = useState([]);

  const onHandleCloseShow = () => {
    if (disableClose) {
      setCloseShow(true);
    } else {
      dispatch(setUnitPK(null));
      dispatch(setDpuInvoicePaperworkFiles({ actionType: "clear" }));
      dispatch(setPageNumber(0));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setChangeColor(false));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setUnitNumber(null));
      dispatch(setUnitPK(""));
      dispatch(setUnitNumberConfirmation(""));
      dispatch(setTransIds(""));
      navigate("/");
      setCloseShow(false);
      toast.success("Page Closed");
    }
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
    dispatch(setUnitNumber(null));
    dispatch(setUnitPK(""));
    dispatch(setUnitNumberConfirmation(""));
    dispatch(setTransIds(""));
    dispatch(setCreditCardArrayList([]));
    toast.success("Page Closed");
  };

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
    dispatch(setTransIds(""));
    dispatch(setCreditCardArrayList([]));
    toast.success("Changes Cancelled");
  };

  const handleSave = () => {
    setLoading(true);
    DPUInvoiceService.savePDFFileList(dpuInvoicePayload)
      .then((response) => {
        const { responseList, creditCardResponse } = response?.data || {};
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
          if (responseList) {
            dispatch(resetChanges());
            dispatch(setDpuInvoicePaperworkFiles({ actionType: "clear" }));
            setInvoiceResponseList(responseList);
            setShowInvoiceGenerationSuccess(true);
          } else {
            toast.error("Scan Failed");
          }
        }
      })
      .catch(() => {
        toast.error("Scan Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!unitPK) {
      navigate("/DpuInvoice/browse");
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === `/DpuInvoice/paperWork`) {
      setDisableClose(true);
    } else {
      setDisableClose(false);
    }
  }, [window]);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        {loading && <LoadingIcon />}
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
            title={"Close DPU Invoice"}
            body="Please confirm you want to close the program without saving your changes"
            handleYES={onHandleCloseYes}
            handleNO={onHandleCloseNo}
          />
        </div>
      </div>
      <>
        <DPUInvoicePaperwork />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type=""
            disabled={disableSave}
            onClick={() => handleSave()}
          >
            Save
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => navigate("/DpuInvoice/invoiceText")}
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

          {/* Invoice Generation Success Modal */}
          <ModalComponent
            show={showInvoiceGenerationSuccess}
            onHide={() => {
              setShowInvoiceGenerationSuccess(false);
              navigate("/DpuInvoice/browse");
            }}
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
                            <td>{unit?.UnitNumber}</td>
                            <td>{unit?.InvoiceNumber}</td>
                            <td>{unit?.CompanyName}</td>
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
              navigate("/DpuInvoice/browse");
            }}
            showOK
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default DPUInvoicePaperworkTemplate;
