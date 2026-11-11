import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  resetOrderUsers,
  setCustomerId,
  setEditFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
  setNormalSortFlag,
  setNormalSortValue,
} from "../../../../redux/CustomerOrderUsersSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import toast from "react-hot-toast";

const CustomerOrderUsers = () => {
  const { customerId, customerPageNo } = useParams();

  const searchTerm = useSelector((state) => state.customerOrderUsers.searchTerm);
  const searchCriteria = useSelector((state) => state.customerOrderUsers.searchCriteria);
  const listingData = useSelector((state) => state.customerOrderUsers.listingData);
  const pageNumber = useSelector((state) => state.customerOrderUsers.pageNumber);
  const totalPages = useSelector((state) => state.customerOrderUsers.totalPages);
  const totalElements = useSelector((state) => state.customerOrderUsers.totalElements);
  const orderEntryUsers = useSelector((state) => state.customerMaintenanceReducer.orderEntryUsers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewOnClick = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };
  const onClose = () => {
    dispatch(resetOrderUsers());
    dispatch(resetChanges());
    toast.success("Page Closed");
  };
  useEffect(() => {
    if (customerId) {
      dispatch(setCustomerId(customerId));
    }
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
          newButtonRoute={`/customer-order-users/${customerId}/${customerPageNo}/new-record`}
          handleNewOnClick={handleNewOnClick}
          closeButtonRoute={`/add-customer/${customerId}/${customerPageNo}`}
          handleCloseOnClick={() => onClose()}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing customerId={customerId} customerPageNo={customerPageNo} />}
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
};

export default CustomerOrderUsers;
