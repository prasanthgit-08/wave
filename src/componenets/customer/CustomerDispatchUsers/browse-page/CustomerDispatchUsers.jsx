import React from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import TableListing from "./TableListing";
import { useParams } from "react-router-dom";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setAddFormData,
  setViewDetail,
  resetCustomerDispatchUsers,
  setFormData,
} from "../../../../redux/CustomerDispatchUsersSlice";
import toast from "react-hot-toast";
const CustomerDispatchUsers = () => {
  const { customerId, customerPageNo } = useParams();
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.customerDispatchUsers.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDispatchUsers.searchCriteria);
  const listingData = useSelector((state) => state.customerDispatchUsers.listingData);
  const pageNumber = useSelector((state) => state.customerDispatchUsers.pageNumber);
  const totalPages = useSelector((state) => state.customerDispatchUsers.totalPages);
  const totalElements = useSelector((state) => state.customerDispatchUsers.totalElements);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const handleNewOnClick = () => {
    dispatch(setAddFormData(null));
    dispatch(setFormData(null));
    dispatch(setViewDetail(false));
  };

  const onClose = () => {
    dispatch(resetCustomerDispatchUsers());
    toast.success("Page Closed");
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/customer-dispatch-users/${customerId}/${customerPageNo}/new-record`}
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

export default CustomerDispatchUsers;
