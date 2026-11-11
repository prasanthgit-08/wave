import React from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import RoutesListing from "./RoutesListing";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearch,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
} from "../../../../redux/CustomerDealerRoutesSlice";
import RoutesSearchFilter from "./RoutesSearchFilter";
import { useParams } from "react-router-dom";

const RoutesMainPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.customerDealerRoutes.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDealerRoutes.searchCriteria);
  const pageNumber = useSelector((state) => state.customerDealerRoutes.pageNumber);
  const totalPages = useSelector((state) => state.customerDealerRoutes.totalPages);
  const totalElements = useSelector((state) => state.customerDealerRoutes.totalElements);
  const listingData = useSelector((state) => state.customerDealerRoutes.listingData);

  const id = params.id;
  const group = params.group;
  const dealerId = params.dealerId;

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
        <RoutesSearchFilter
          searchTerm={searchTerm}
          searchCriteria={searchCriteria}
          pageNumber
          addNewRoute={"/add-customer-dealer-routes/" + id + "/" + group + "/" + dealerId}
          closeRoute={"/edit-customer-dealer/" + group + "/" + dealerId + "/" + id}
          setSearchTerm={setSearchTerm}
          setSearchCriteria={setSearchCriteria}
          setPageNumber={setPageNumber}
          fetchTableData={() => {}}
          handleClickNew={() => {}}
          handleClickClose={() => {
            dispatch(resetSearch());
          }}
          sequenceRoute={"/customer-dealer-routes-sequence/" + id + "/" + group + "/" + dealerId}
          handleClickSequence={() => {}}
        />
      }
      TableListingComponent={<RoutesListing />}
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

export default RoutesMainPage;
