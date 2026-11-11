import React from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import TableListing from "./CustomerPlantReleaseListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  resetPlantReleases,
  setEditFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
} from "../../../../redux/CustomerPlantReleasesSlice";
import CustomerPlantReleaseListing from "./CustomerPlantReleaseListing";

const CustomerPlantReleasesBrowse = () => {
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.customerPlantReleaseReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerPlantReleaseReducer.totalPages);
  const totalElements = useSelector((state) => state.customerPlantReleaseReducer.totalElements);
  const plantReleaseData = useSelector((state) => state.customerPlantReleaseReducer.plantReleasesData);
  const searchTerm = useSelector((state) => state.customerPlantReleaseReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.customerPlantReleaseReducer.searchCriteria);
  const browseLoading = useSelector((state) => state.customerPlantReleaseReducer.browseLoading);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: plantReleaseData,
  };

  const onClose = () => {
    dispatch(resetPlantReleases());
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/customer-plant-release-browse/new`}
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
      TableListingComponent={<CustomerPlantReleaseListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={browseLoading}
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

export default CustomerPlantReleasesBrowse;
