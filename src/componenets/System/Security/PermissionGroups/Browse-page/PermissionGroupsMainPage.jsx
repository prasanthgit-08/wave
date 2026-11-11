import React, { useState } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import Listpage from "./Listpage";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import {
  setSearchTerm,
  setPageNumber,
  setSelectedSearchCriteria,
  setViewDetail,
  setEditFormData,
  resetClose,
  setPermissionList,
  resetChanges,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import { useDispatch } from "react-redux";

const PermissionGroupsMainPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const totalElements = useSelector((state) => state.permissionGroupsReducer.totalElements);

  const searchTerm = useSelector((state) => state.permissionGroupsReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.permissionGroupsReducer.selectedSearchCriteria);
  const pageNumber = useSelector((state) => state.permissionGroupsReducer.pageNumber);
  const totalPages = useSelector((state) => state.permissionGroupsReducer.totalPages);
  const groupsData = useSelector((state) => state.permissionGroupsReducer.groupsData);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: groupsData,
    loading,
  };
  const handleNewOnClick = () => {
    dispatch(setEditFormData(null));
    dispatch(resetChanges());
    dispatch(setViewDetail(false));
    dispatch(setPermissionList([]));
  };
  const onClose = () => {
    dispatch(resetClose());
    dispatch(resetChanges());
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/permission-groups/add"}
          handleNewOnClick={handleNewOnClick}
          closeButtonRoute={"/"}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<Listpage loading={loading} setLoading={setLoading} />}
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

export default PermissionGroupsMainPage;
