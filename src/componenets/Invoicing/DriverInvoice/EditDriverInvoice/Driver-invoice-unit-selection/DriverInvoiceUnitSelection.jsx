import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceData,
  setNonUnitData,
  setSearchTerms,
  setViewDetail,
  resetFields,
  setUnitSelectionReset,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberId,
  setInvoiceNumber,
  setSortValue,
  setSortType,
  setSelectedCompanyName,
  setCompanyFK,
  toggleCancelChanges,
  setUnitFK,
  setUnitPageNumber,
  setIsNonUnit,
  setDocumentFiles,
  setDriverSearchCriteria,
  setEmaiToUser,
  setEmailToDriver,
} from "../../../../../redux/DriverInvoiceSlice";
import DriverInvoiceUnitSelectionContent from "./DriverInvoiceUnitSelectionContent";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../../common/Button";

const DriverInvoiceUnitSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  window.addEventListener("popstate", () => {
    dispatch(resetFields());
    navigate(`/driver-invoice-browse`);
  });
  const { driverId } = useParams();

  const invoiceData = useSelector((state) => state.driverInvoiceReducer.invoiceData);
  const unitFK = useSelector((state) => state.driverInvoiceReducer.unitFK);
  const sisterUnitFK = useSelector((state) => state.driverInvoiceReducer.sisterUnitFK);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            dispatch(resetFields());
            navigate(`/`);
          }}
        >
          Close
        </button>
      </div>
      <DriverInvoiceUnitSelectionContent />
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setIsNonUnit(true));
              dispatch(setDocumentFiles([]));
              dispatch(setUnitFK(0));
              dispatch(setEmaiToUser(false));
              dispatch(setEmailToDriver(false));

              navigate("/driver-invoice-detail");
            }}
          >
            Non Unit
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setViewDetail(true));
              dispatch(setUnitSelectionReset(true));
              dispatch(setIsNonUnit(false));
              const path = driverId
                ? `/driver-invoice-unit-confirmation/${driverId}/${unitFK || sisterUnitFK}`
                : `/driver-invoice-unit-confirmation/${unitFK}`;

              navigate(path);
            }}
            disabled={!unitFK || invoiceData?.length === 0}
          >
            Next
          </button>

          <ButtonComponent
            route={"/driver-invoice-browse"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              dispatch(resetFields());
              dispatch(setIsNonUnit(false));
              dispatch(setUnitFK(null));
              dispatch(setInvoiceData([]));
              dispatch(setSearchTerms(""));
              dispatch(setDriverSearchCriteria("Beginning"));
              dispatch(setUnitNumber(""));
              dispatch(setUnitNumberLast5(""));
              dispatch(setUnitNumberId(null));
              dispatch(setInvoiceNumber(""));
              dispatch(setNonUnitData([]));
              dispatch(setSortValue(null));
              dispatch(setSortType(null));
              dispatch(setUnitPageNumber(0));
              dispatch(setSelectedCompanyName(""));
              dispatch(setCompanyFK(null));
              dispatch(toggleCancelChanges());
            }}
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default DriverInvoiceUnitSelection;
