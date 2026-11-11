import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../common/Button";
import UnitSelectionContent from "./UnitSelectionContent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  resetCreditCardStates,
  resetCustomerDealer,
  resetDetailsandTextTabValues,
  resetExistingMiscellaneous,
  setCompanyFK,
  setCompanyName,
  setCompanyPaperworkFiles,
  setCustomerPaperworkFiles,
  setId,
  setIsNonUnitInvoice,
  setIsNonUnitNumberPresent,
  setIsRequirePO,
  setMiscInvoiceData,
  setMiscInvoiceFiles,
  setMiscInvoiceFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberPK,
  setViewDetail,
  setInvoiceSisterCustomer,
  setIsSisterCompany,
  setNotCrossCompany,
  setIsLocalCompany,
  setLocalCompany,
  setLocalCompanyName,
  setUnitRecordData,
  setSelectedOption,
  setNotCrossCompanydata2,
  toggleCancelChanges,
  setSelectedCompanyName,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";

function MiscInvoiceUnitSelectionTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyName = useSelector((state) => state.miscInvoiceReducer.companyName);
  const viewDetail = useSelector((state) => state.miscInvoiceReducer.viewDetail);
  const id = useSelector((state) => state.miscInvoiceReducer.id);
  const [companyNames, setCompanyNames] = useState([]);
  const unitNumber = useSelector((state) => state.miscInvoiceReducer.unitNumber);
  const unitNumberLast5 = useSelector((state) => state.miscInvoiceReducer.unitNumberLast5);
  const miscInvoiceData = useSelector((state) => state.miscInvoiceReducer.miscInvoiceData);
  const companyFK = useSelector((state) => state.miscInvoiceReducer.companyFK);
  const isNonUnitInvoice = useSelector((state) => state.miscInvoiceReducer.isNonUnitInvoice);
  const isLocalCompany = useSelector((state) => state.miscInvoiceReducer.isLocalCompany);
  const notCrossCompany = useSelector((state) => state.miscInvoiceReducer.notCrossCompany);
  const localCompanyName = useSelector((state) => state.miscInvoiceReducer.localCompanyName);

  /***
   * setting the id null if no Invoice data found found
   * ****/
  useEffect(() => {
    if (
      (unitNumberLast5 === "" && miscInvoiceData?.length === 0) ||
      (unitNumber === "" && miscInvoiceData?.length === 0)
    ) {
      dispatch(setId(null));
    }
  }, [unitNumberLast5, unitNumber, miscInvoiceData]);

  const fetchRecord = (id) => {
    MiscInvoiceService.getNotCrossCompanyAlternateCustomer(id)
      .then((res) => {
        const data = res?.data?.invoice;
        dispatch(setNotCrossCompany(data[0]));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (id) {
      fetchRecord(id);
    }
  }, [id]);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={(e) => {
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
            dispatch(resetCreditCardStates());
            dispatch(setIsNonUnitNumberPresent(false));
            dispatch(setIsRequirePO(false));
            dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
            dispatch(setIsSisterCompany(false));
            dispatch(setInvoiceSisterCustomer(false));
            dispatch(setCompanyName(localCompanyName));
            dispatch(resetChanges());
            dispatch(setNotCrossCompany([]));
            dispatch(setNotCrossCompanydata2([]));

            dispatch(resetExistingMiscellaneous());
            dispatch(setUnitRecordData(null));
            dispatch(setSelectedOption("Customer"));
            dispatch(setSelectedCompanyName(""));

            navigate(`/`);
          }}
        >
          Close
        </button>
      </div>
      <>
        <UnitSelectionContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              dispatch(setIsNonUnitInvoice(true));
              dispatch(setViewDetail(true));
              navigate("/misc-invoice-non-unit");
            }}
          >
            Non Unit
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              dispatch(setViewDetail(true));
              dispatch(setUnitRecordData(null));
              if (isLocalCompany && notCrossCompany.ScreenId === 2) {
                navigate(`/misc-invoice-unitcon-nocross-noalter/${id}`);
              } else if (isLocalCompany && notCrossCompany.ScreenId === 1) {
                navigate(`/misc-invoice-not-cross-alternate-customer/${id}`);
              } else if (!isLocalCompany) {
                navigate(`/misc-invoice-unitcon-cross/${id}`);
              }
            }}
            disabled={!id}
          >
            Next
          </button>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
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
              dispatch(resetCreditCardStates());
              dispatch(setIsNonUnitNumberPresent(false));
              dispatch(setIsRequirePO(false));
              dispatch(setMiscInvoiceFiles({ actionType: "clear" }));
              dispatch(setIsSisterCompany(false));
              dispatch(setInvoiceSisterCustomer(false));
              dispatch(setNotCrossCompany([]));
              dispatch(setNotCrossCompanydata2([]));
              dispatch(resetExistingMiscellaneous());
              dispatch(toggleCancelChanges());
              dispatch(setCompanyName(localCompanyName));
              dispatch(setUnitRecordData(null));
              dispatch(setSelectedOption("Customer"));
              dispatch(setSelectedCompanyName(""));
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </QuarterScreenWrapper>
  );
}

export default MiscInvoiceUnitSelectionTemplate;
