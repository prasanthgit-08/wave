import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { t } from "i18next";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setListingData,
  setTotalElements,
  setTotalPages,
  setEditFormData,
  resetChanges,
  setViewDetail,
  setCustomerId,
  resetDPURestrictions,
  setSelectedCustomerId,
  setSelectedPlantId,
  setNotes,
  setIsEdit,
  setCustomerNameInput,
  setPlantNameInput,
  setCustomerDPURestrictionPK,
} from "../../../../redux/CustomerDPURestrictionsSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import CustomerDPURestrictionsService from "../../../../services/CustomerDPURestrictionsService";
import { useParams } from "react-router-dom";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import toast from "react-hot-toast";

const CustomerDPURestrictions = () => {
  const { customerId, customerPageNo } = useParams();

  const [loading, setLoading] = useState(true);
  const searchTerm = useSelector((state) => state.customerDPURestrictions.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDPURestrictions.searchCriteria);
  const listingData = useSelector((state) => state.customerDPURestrictions.listingData);
  const pageNumber = useSelector((state) => state.customerDPURestrictions.pageNumber);
  const totalPages = useSelector((state) => state.customerDPURestrictions.totalPages);
  const totalElements = useSelector((state) => state.customerDPURestrictions.totalElements);
  const isEdit = useSelector((state) => state.customerDPURestrictions.isEdit);
  const dispatch = useDispatch();

  const fetchTableData = () => {
    CustomerDPURestrictionsService.getTableData(customerId, searchTerm, searchCriteria, pageNumber)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleClickClose = () => {
    dispatch(resetChanges());
    dispatch(resetDPURestrictions());
    toast.success("Page Closed");
  };
  const onHandleChangeView = () => {
    dispatch(setEditFormData(undefined));
    dispatch(setViewDetail(undefined));
    dispatch(setCustomerNameInput(""));
    dispatch(setPlantNameInput(""));
    dispatch(setNotes(""));
    dispatch(setCustomerDPURestrictionPK(""));
    dispatch(setIsEdit(false));
  };
  useEffect(() => {
    if (customerId) dispatch(setCustomerId(customerId));
  }, [customerId]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/customer-dpu-restrictions/${customerId}/${customerPageNo}/new-record`}
          handleNewOnClick={onHandleChangeView}
          closeButtonRoute={`/add-customer/${customerId}/${customerPageNo}`}
          handleCloseOnClick={() => handleClickClose()}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }

      TableListingComponent={
        <TableListing customerURL={`${customerId}/${customerPageNo}`} loading={loading} />
      }
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          quarterScreen
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default CustomerDPURestrictions;
