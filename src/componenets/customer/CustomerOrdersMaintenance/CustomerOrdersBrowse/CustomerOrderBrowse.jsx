import React from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";

import { useDispatch, useSelector } from "react-redux";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import CustomerOrderListing from "./CustomerOrderListing";
import {
  resetChanges,
  resetCustomerOrders,
  setEditFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
} from "../../../../redux/CustomerOrdersSlice";

function CustomerOrderBrowse() {
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.customerOrdersReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerOrdersReducer.totalPages);
  const totalElements = useSelector((state) => state.customerOrdersReducer.totalElements);
  const customerOrdersData = useSelector((state) => state.customerOrdersReducer.customerOrdersData);
  const searchTerm = useSelector((state) => state.customerOrdersReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.customerOrdersReducer.searchCriteria);
  const loading = useSelector((state) => state.customerOrdersReducer.loading);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerOrdersData,
  };
  const onClose = () => {
    dispatch(resetCustomerOrders);
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/customer-orders/add`}
          handleNewOnClick={() => {
            dispatch(setViewDetail(false));
            dispatch(resetChanges());
            dispatch(setEditFormData(null));
          }}
          closeButtonRoute={`/`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<CustomerOrderListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loading}
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
export default CustomerOrderBrowse;
