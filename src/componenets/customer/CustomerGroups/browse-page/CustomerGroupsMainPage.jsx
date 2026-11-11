import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setFormData,
  setViewDetail,
  resetCustomerGroups,
} from "../../../../redux/CustomerGroupsSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

const CustomerGroupsMainPage = () => {
  const searchTerm = useSelector((state) => state.customerGroups.searchTerm);
  const searchCriteria = useSelector((state) => state.customerGroups.searchCriteria);
  const listingData = useSelector((state) => state.customerGroups.listingData);
  const pageNumber = useSelector((state) => state.customerGroups.pageNumber);
  const totalPages = useSelector((state) => state.customerGroups.totalPages);
  const totalElements = useSelector((state) => state.customerGroups.totalElements);

  const dispatch = useDispatch();

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    numberOfElements: listingData?.length,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/customer-groups/add"}
          handleNewOnClick={() => {
            dispatch(setFormData(null));
            dispatch(setViewDetail(false));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => dispatch(resetCustomerGroups())}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing />}
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

export default CustomerGroupsMainPage;
