import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import DPUInvoiceUnitConfirmation from "./DPUInvoiceUnitConfirmation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setUnitNumber,
  setBolNumber,
  setUnitPK,
  setSelectedId,
  setDpuInvoiceData,
  setDpuInvoiceConfirmationData,
  setUnitNumberConfirmation,
  setUnitNumberLast5,
  setTransIds,
  setCreditCardArrayList,
} from "../../../../redux/Invoicing/DPUInvoiceSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
function DPUInvoiceUnitConfirmationTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const unitPK = useSelector((state) => state.dpuInvoice.unitPK);

  const onHandleCloseShow = () => {
    navigate("/");
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    setCloseShow(false);
    dispatch(setBolNumber(""));
    dispatch(setUnitPK(null));
    dispatch(setDpuInvoiceConfirmationData([]));
    dispatch(setUnitNumber(""));
    dispatch(setSelectedId(null));
    dispatch(setDpuInvoiceData([]));
    dispatch(setUnitPK(""));
    dispatch(setUnitNumberConfirmation(""));
    dispatch(setTransIds(""));
    toast.success("Page Closed");
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    dispatch(setUnitPK(""));
    dispatch(setUnitNumberConfirmation(""));
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setUnitPK(null));
    dispatch(setUnitNumber(""));
    dispatch(setTransIds(""));
    toast.success("Page Closed");
  };
  useEffect(() => {
    if (!unitPK) {
      navigate("/DpuInvoice/browse");
    }
  }, []);

  const onHandleCancelShow = () => {
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
        <DPUInvoiceUnitConfirmation />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => navigate("/DpuInvoice/invoiceText")}
          >
            Next
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => navigate("/DpuInvoice/browse")}
          >
            Back
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"

            onClick={onHandleCancelShow}
          >
            Cancel
          </button>
        </div>
      </div>
    </QuarterScreenWrapper>
  );
}

export default DPUInvoiceUnitConfirmationTemplate;
