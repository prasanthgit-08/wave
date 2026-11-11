import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import UserMaintenanceAdvanceSearch from "./UserMaintenanceAdvanceSearch";
import UserMaintenanceAdvanceSort from "./UserMaintenanceAdvanceSort";
import UserMaintenanceListing from "./UserMaintenanceListing";
import UserMaintenanceSearchFilter from "./UserMaintenanceSearchFilter";

import {
  setAdvanceSortingCriteria,
  setPageNumber,
} from "../../../../../redux/UserMaintenanceSearchFilterSlice";
import StandardMaintenanceTemplate from "../../../../Templates/StandardMaintenanceTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../../constants/screenSizes";

export const UserMaintenanceMainPage = () => {
  const dispatch = useDispatch();
  const [firstField, setFirstField] = React.useState(null);
  const [secondField, setSecondField] = React.useState(null);
  const [loading, setLoading] = useState(false);

  const usersData = useSelector((state) => state.userMaintenanceReducer.usersData);
  const loader = useSelector((state) => state.userMaintenanceReducer.loader);
  const showAdvanceSearch = useSelector((state) => state.userMaintenanceReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.userMaintenanceReducer.showAdvanceSort);
  const advanceSortingOrder = useSelector((state) => state.userMaintenanceReducer.advanceSortingOrder);
  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.userMaintenanceReducer);

  useEffect(() => {
    dispatch(
      setAdvanceSortingCriteria({
        firstField: firstField,
        secondField: secondField,
      })
    );
  }, [firstField, secondField]);

  useEffect(() => {
    if (advanceSortingOrder != null) {
      setFirstField(firstField !== null ? firstField : advanceSortingOrder.firstField);
      setSecondField(secondField !== null ? secondField : advanceSortingOrder.secondField);
    }
  }, []);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: usersData,
    loading,
  };

  return (
    <StandardMaintenanceTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <UserMaintenanceSearchFilter setFirstField={setFirstField} setSecondField={setSecondField} />
      }
      TableListingComponent={<UserMaintenanceListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
        />
      }
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={<UserMaintenanceAdvanceSearch />}
      showAdvancedSort={showAdvanceSort}
      AdvancedSortComponent={
        <UserMaintenanceAdvanceSort setFirstField={setFirstField} setSecondField={setSecondField} />
      }
    />
  );
};

export default UserMaintenanceMainPage;
