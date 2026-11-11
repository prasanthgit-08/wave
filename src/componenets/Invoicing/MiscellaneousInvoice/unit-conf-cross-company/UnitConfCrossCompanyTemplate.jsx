import React, { useEffect } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import UnitConfCrossCompany from "./UnitConfCrossCompany";
import ButtonComponent from "../../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  resetCreditCardStates,
  resetCustomerDealer,
  resetDetailsandTextTabValues,
  resetExistingMiscellaneous,
  setCompanyName,
  setCompanyPaperworkFiles,
  setCustomerPaperworkFiles,
  setId,
  setInvoiceSisterCustomer,
  setIsExistingMiscInvoice,
  setIsLocalCompany,
  setIsSisterCompany,
  setMiscInvoiceData,
  setMiscInvoiceFiles,
  setMiscInvoiceFormData,
  setNotCrossCompany,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberPK,
  setViewDetail,
  setIsNonUnitNumberPresent,
  setIsRequirePO,
  setSelectedOption,
  setNotCrossCompanydata2,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";

function UnitConfCrossCompanyTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isExistingMiscInvoice = useSelector((state) => state.miscInvoiceReducer.isExistingMiscInvoice);
  const viewDetail = useSelector((state) => state.miscInvoiceReducer.viewDetail);
  const localCompanyName = useSelector((state) => state.miscInvoiceReducer.localCompanyName);

  /*******Used to solve the issue due to close and
   * backbutton causing staying on current page******/
  window.addEventListener("popstate", () => {
    navigate(`/misc-invoice-unitselection`);
  });
  /******Check whether Miscelaneius Invoices exist for the Unit******/
  const checkExistingInvoice = (id) => {
    MiscInvoiceService.getExistingMiscInvoicesStatus(id)
      .then((res) => {
        dispatch(setIsExistingMiscInvoice(res?.data));
      })
      .catch((err) => {
        console.log("error");
      });
  };
  useEffect(() => {
    if (id) {
      checkExistingInvoice(id);
    }
  }, [id]);
  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={(e) => {
            navigate(`/`);
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
            dispatch(setMiscInvoiceFormData(null));
            dispatch(resetDetailsandTextTabValues());
            dispatch(setIsSisterCompany(false));
            dispatch(setInvoiceSisterCustomer(false));
            dispatch(setIsNonUnitNumberPresent(false));
            dispatch(setIsRequirePO(false));
            dispatch(setId(null));
            dispatch(setMiscInvoiceData([]));
            dispatch(resetCreditCardStates());
            dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
            dispatch(setCompanyName(localCompanyName));
            dispatch(resetChanges());
            dispatch(setIsLocalCompany(false));
            dispatch(setNotCrossCompany([]));
            dispatch(setNotCrossCompanydata2([]));
            dispatch(resetExistingMiscellaneous());
            dispatch(setSelectedOption("Customer"));
          }}
        >
          Close
        </button>
      </div>
      <>
        <UnitConfCrossCompany />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              if (isExistingMiscInvoice) {
                navigate(`/misc-invoice-exist-invoice/${id}`);
              } else {
                navigate(`/misc-invoice-details/${id}`);
              }
            }}
          >
            Next
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              navigate(`/misc-invoice-unitselection`);
            }}
          >
            Back
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              dispatch(setCustomerPaperworkFiles([]));
              dispatch(setCompanyPaperworkFiles([]));
              dispatch(setViewDetail(false));
              dispatch(resetCustomerDealer());
              dispatch(setMiscInvoiceFormData(null));
              dispatch(resetDetailsandTextTabValues());
              dispatch(setIsSisterCompany(false));
              dispatch(setInvoiceSisterCustomer(false));
              dispatch(setIsLocalCompany(false));
              dispatch(setNotCrossCompany([]));
              dispatch(resetExistingMiscellaneous());
              dispatch(setNotCrossCompanydata2([]));
              dispatch(setSelectedOption("Customer"));
              navigate(`/misc-invoice-unitselection`);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </QuarterScreenWrapper>
  );
}

export default UnitConfCrossCompanyTemplate;
