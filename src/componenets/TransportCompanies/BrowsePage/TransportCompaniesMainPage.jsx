import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  setAddress1,
  setAlternatePhone,
  setChangeColor,
  setCity,
  setDispatchEmail,
  setDispatcher,
  setDispatcherCellPhone,
  setDispatcherEmail,
  setDispatcherPhone,
  setEditFormData,
  setEIN,
  setEmail,
  setFAXNumber,
  setHaulAndTow,
  setInsuranceAddress1,
  setInsuranceAddress2,
  setInsuranceCanadian,
  setInsuranceCity,
  setInsuranceCompany,
  setInsuranceContact,
  setInsuranceEmail,
  setInsuranceFAX,
  setInsuranceNotes,
  setInsurancePhone,
  setInsurancePolicyNumber,
  setInsurancePostalCode,
  setInsuranceStateCode,
  setLowboy,
  setMotorized,
  setName,
  setPageNumber,
  setPhone,
  setPopup,
  setPostalCode,
  setSearchCriteria,
  setSearchTerm,
  setSearchTerms,
  setSelectedId,
  setSelectedStatus,
  setStateCode,
  setTowaway,
  setTransportCompanyPK,
  setTruckCamper,
  setViewDetail,
} from "../../../redux/TransportCompaniesSlice";
import TableListing from "./TableListing";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import { PaginationComponent } from "../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";

function TransportCompaniesMainPage() {
  const [loading, setLoading] = useState(true);
  const listingData = useSelector((state) => state.transportCompaniesReducer.listingData);
  const pageNumber = useSelector((state) => state.transportCompaniesReducer.pageNumber);
  const totalPages = useSelector((state) => state.transportCompaniesReducer.totalPages);
  const totalElements = useSelector((state) => state.transportCompaniesReducer.totalElements);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.transportCompaniesReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.transportCompaniesReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.transportCompaniesReducer.selectedStatus);
  const transportCompanyPK = useSelector((state) => state.transportCompaniesReducer.transportCompanyPK);
  const name = useSelector((state) => state.transportCompaniesReducer.name);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };
  const onHandleChangeNew = () => {
    dispatch(setViewDetail(false));
    dispatch(setTransportCompanyPK(null));
    dispatch(setEditFormData(null));

    dispatch(setName(""));
    dispatch(setAddress1(""));
    dispatch(setInsuranceAddress2(""));
    dispatch(setPhone(""));
    dispatch(setAlternatePhone(""));
    dispatch(setFAXNumber(""));
    dispatch(setEIN(""));
    dispatch(setEmail(""));
    dispatch(setDispatcher(""));
    dispatch(setDispatcherPhone());
    dispatch(setDispatcherCellPhone(""));
    dispatch(setDispatcherEmail(""));
    dispatch(setDispatchEmail(""));
    dispatch(setTowaway(false));
    dispatch(setHaulAndTow(false));
    dispatch(setLowboy(false));
    dispatch(setPopup(false));
    dispatch(setTruckCamper(false));
    dispatch(setMotorized(false));
    dispatch(setInsuranceCompany(""));
    dispatch(setInsuranceAddress1(""));
    dispatch(setInsuranceAddress2(""));
    dispatch(setInsuranceCity(""));
    dispatch(setInsuranceStateCode(""));
    dispatch(setInsurancePostalCode(""));
    dispatch(setInsuranceContact(""));
    dispatch(setInsuranceEmail(""));
    dispatch(setInsuranceFAX(""));
    dispatch(setInsurancePhone(""));
    dispatch(setInsuranceCanadian(false));
    dispatch(setInsurancePolicyNumber(""));
    dispatch(setInsuranceNotes(""));
    dispatch(setCity(""));
    dispatch(setStateCode(""));
    dispatch(setPostalCode(""));
    dispatch(setSelectedId(null));
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          secondRadioGroup
          handleNewOnClick={onHandleChangeNew}
          newButtonRoute={"/transport-companies-new"}
          closeButtonRoute={"/"}
          handleCloseOnClick={onHandleChangeNew}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
        />
      }

      TableListingComponent={<TableListing customerURL={``} loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
}

export default TransportCompaniesMainPage;
