import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import DPUInvoiceUnitSelectionContent from "./DPUInvoiceUnitSelectionContent";
import { Link, NavigationType, useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setUnitNumberLast5,
  setBolNumber,
  setUnitNumber,
  setDpuInvoiceData,
  setUnitNumberConfirmation,
  setUnitPK,
  setTransIds,
  setCreditCardArrayList,
} from "../../../../redux/Invoicing/DPUInvoiceSlice";
import toast from "react-hot-toast";

function DPUInvoiceUnitSelectionTemplateFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const unitNumber = useSelector((state) => state.dpuInvoice.unitNumber);
  const selectedId = useSelector((state) => state.dpuInvoice.selectedId);
  const unitPK = useSelector((state) => state.dpuInvoice.unitPK);

  const onHandleCloseShow = () => {
    navigate("/");
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
    dispatch(setUnitPK(""));
    dispatch(setUnitNumberConfirmation(""));
    dispatch(setTransIds(""));
    setCloseShow(false);
    toast.success("Page Closed");
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(setUnitPK(""));
    dispatch(setUnitNumberConfirmation(""));
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
    dispatch(setTransIds(""));
    dispatch(setCreditCardArrayList([]));
    toast.success("Page Closed");
  };

  const onCancel = () => {
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
  };
  useEffect(() => {
    if (!unitPK) {
      navigate("/DpuInvoice/browse");
    }
  }, []);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
      <ModalComponent
        show={closeShow}
        onHide={onHandleCloseNo}
        title={"Close Dpu invoice"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={onHandleCloseYes}
        handleNO={onHandleCloseNo}
      />
      <DPUInvoiceUnitSelectionContent />
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => navigate("/DpuInvoice/confirmation")}
            disabled={!selectedId}
          >
            Next
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </QuarterScreenWrapper>
  );
}

export default DPUInvoiceUnitSelectionTemplateFooter;
