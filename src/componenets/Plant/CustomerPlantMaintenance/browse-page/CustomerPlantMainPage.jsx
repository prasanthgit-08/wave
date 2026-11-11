import React, { useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { CustomerPlantSearchFilter } from "./CustomerPlantSearchFilter";
import CustomerPlantList from "./CustomerPlantList";
import { CustomerPlantAdvancedSearch } from "./CustomerPlantAdvancedSearch";
import { useSelector } from "react-redux";
import { setPageNumber } from "../../../../redux/CustomerPlantSearchFilterSlice";
import { useParams } from "react-router-dom";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";
const CustomerPlantMainPage = () => {
  const plantLoader = useSelector((state) => state.customerPlantmaintanceReducer.plantLoader);
  const pageNumber = useSelector((state) => state.customerPlantSearchFilterReducer.pageNumber);
  const totalElements = useSelector((state) => state.customerPlantSearchFilterReducer.totalElements);
  const totalPages = useSelector((state) => state.customerPlantSearchFilterReducer.totalPages);
  const plantData = useSelector((state) => state.customerPlantmaintanceReducer.plantData);
  const showAdvanceSearch = useSelector((state) => state.customerPlantSearchFilterReducer.showAdvanceSearch);
  const [loader, setLoader] = useState(true);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: plantData,
  };

  return (
    <StandardMaintenanceTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={<CustomerPlantSearchFilter />}
      TableListingComponent={<CustomerPlantList />}
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
      AdvancedSearchComponent={<CustomerPlantAdvancedSearch />}
    />
  );
};

export default CustomerPlantMainPage;
