import React, { useEffect, useState } from "react";
import UnitConfNocrossNoalternateContent from "./UnitConfNocrossNoalternateContent";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDetailsandTextTabValues,
  resetExistingMiscellaneous,
  setIsExistingMiscInvoice,
  setMiscInvoiceFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberPK,
  resetCustomerDealer,
  setCustomerPaperworkFiles,
  setViewDetail,
  setCompanyPaperworkFiles,
  setMiscInvoiceData,
  setId,
  resetChanges,
  setIsNonUnitNumberPresent,
  setIsRequirePO,
  resetCreditCardStates,
  setMiscInvoiceFiles,
  setInvoiceSisterCustomer,
  setIsSisterCompany,
  setIsLocalCompany,
  setNotCrossCompany,
  setCompanyName,
  setSelectedOption,
  setNotCrossCompanydata2,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";

function UnitConfNocrossNoalternateTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isNonUnitInvoice, setIsNonUnitInvoice] = useState(false);
  const isExistingMiscInvoice = useSelector((state) => state.miscInvoiceReducer.isExistingMiscInvoice);
  const viewDetail = useSelector((state) => state.miscInvoiceReducer.viewDetail);
  const localCompanyName = useSelector((state) => state.miscInvoiceReducer.localCompanyName);

  /****
   * Used to solve the issue related navigate to inner page
   * on close and backbutton click
   * ****/
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

  /******Save form data for Invoice for Unit Setting Non Unit Status */
  const unitInvoiceFormData = () => {
    dispatch(
      setMiscInvoiceFormData({
        isNonUnitInvoice: 0,
      })
    );
  };

  useEffect(() => {
    unitInvoiceFormData();
  }, [id]);
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
            dispatch(setIsNonUnitNumberPresent(false));
            dispatch(setIsRequirePO(false));
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
            dispatch(setMiscInvoiceData([]));
            dispatch(resetDetailsandTextTabValues());
            dispatch(resetCreditCardStates());
            dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
            dispatch(setIsSisterCompany(false));
            dispatch(setInvoiceSisterCustomer(false));
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
        <UnitConfNocrossNoalternateContent />
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
              dispatch(setNotCrossCompany([]));
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

export default UnitConfNocrossNoalternateTemplate;
