import React, { useEffect } from "react";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  resetSearchSettings,
} from "../../../../redux/DealerGroupsSearchFilterSlice";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import DealerGroupsListing from "./DealerGroupsListing";
import ThreeFourthScreenTemplate from "../../../Templates/ThreeFourthScreenTemplate";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import { resetDealerGroups } from "../../../../redux/EditDealerGroupslice";

const DealerGroupsListingMainPage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.dealerGroupReducer.pageNumber);
  const totalPages = useSelector((state) => state.dealerGroupReducer.totalPages);
  const totalElements = useSelector((state) => state.dealerGroupReducer.totalElements);
  const listingData = useSelector((state) => state.dealerGroupReducer.listingData);
  const searchTerm = useSelector((state) => state.dealerGroupReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.dealerGroupReducer.searchCriteria);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
    loading,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/add-dealer-group"}
          handleNewOnClick={() => {}}
          handleCloseOnClick={() => {
            dispatch(resetDealerGroups());
            dispatch(resetSearchSettings());
          }}
          closeButtonRoute={"/"}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<DealerGroupsListing loading={loading} setLoading={setLoading} />}
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

export default DealerGroupsListingMainPage;
