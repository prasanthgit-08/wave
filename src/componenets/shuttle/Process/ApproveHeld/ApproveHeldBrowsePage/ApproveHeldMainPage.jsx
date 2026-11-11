import React, { useState } from "react";
import { No_Of_Record_per_page } from "../../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import ApproveHeldFilter from "./ApproveHeldFilter";
import ApproveHeldListing from "./ApproveHeldListing";
import { useSelector } from "react-redux";
import { setPageNumber } from "../../../../../redux/ApproveHeldSlice";
import ApproveHeldBrowseFooter from "./ApproveHeldBrowseFooter";

import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import {
  APPROVE_HELD_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../../constants/screenSizes";
const ApproveHeldMainPage = () => {
  const pageNumber = useSelector((state) => state.approveHeldShuttleReducer.pageNumber);
  const totalPages = useSelector((state) => state.approveHeldShuttleReducer.totalPages);
  const approveHeldShuttleData = useSelector(
    (state) => state.approveHeldShuttleReducer.approveHeldShuttleData
  );
  const totalElements = useSelector((state) => state.approveHeldShuttleReducer.totalElements);
  const [browseLoading, setBrowseLoading] = useState(false);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: approveHeldShuttleData,
  };

  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={APPROVE_HELD_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={<ApproveHeldFilter />}
      TableListingComponent={
        <ApproveHeldListing browseLoading={browseLoading} setBrowseLoading={setBrowseLoading} />
      }
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={No_Of_Record_per_page}
          firstPage
          lastPage
          singleArrowUp

          singleArrowDown
          loading={browseLoading}
        />
      }
      FooterComponent={<ApproveHeldBrowseFooter />}
    />
  );
};

export default ApproveHeldMainPage;
