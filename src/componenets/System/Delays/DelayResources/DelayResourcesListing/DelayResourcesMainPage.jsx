import React, { useEffect, useState } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import QuarterScreenSearchFilter from "../../../../common/QuarterScreenSearchFilter";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import DelayResourcesListing from "./DelayResourcesListing";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchSettings,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
} from "../../../../../redux/DelayResourcesSlice";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { PermissionKeyGeneratorUtil } from "../../../../../utils/PermissionKeyGeneratorUtil";

const DelayResourcesMainPage = () => {
  const [disableNew, setDisableNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const newPermission = PermissionKeyGeneratorUtil("DelayResources", "new");

  const dispatch = useDispatch();

  const pageNumber = useSelector((state) => state.delayResourcesFilter.pageNumber);
  const totalPages = useSelector((state) => state.delayResourcesFilter.totalPages);
  const totalElements = useSelector((state) => state.delayResourcesFilter.totalElements);
  const listingData = useSelector((state) => state.delayResourcesFilter.listingData);
  const searchCriteria = useSelector((state) => state.delayResourcesFilter.searchCriteria);
  const searchTerm = useSelector((state) => state.delayResourcesFilter.searchTerm);

  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber: setPageNumber,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData,
    loading,
  };

  // Based on Permission & logged in user, set default user
  useEffect(() => {
    if (deniedPermissions) {
      setDisableNew(deniedPermissions.includes(newPermission));
    }
  }, []);

  return (
    <QuarterScreenTemplate
      quarterScreenBrowseHeight="473px"
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          searchTerm={searchTerm}
          firstRadioGroupValue={searchCriteria}
          pageNumber
          newButtonRoute={"/add-delay-resources"}
          closeButtonRoute={"/"}

          setGlobalSearchTerm={setSearchTerms}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          fetchTableData={() => {}}
          handleNewOnClick={() => {}}
          handleCloseOnClick={() => {
            dispatch(resetSearchSettings());
          }}
          disableNew={disableNew}
        />
      }
      TableListingComponent={<DelayResourcesListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
        />
      }
    />
  );
};

export default DelayResourcesMainPage;
