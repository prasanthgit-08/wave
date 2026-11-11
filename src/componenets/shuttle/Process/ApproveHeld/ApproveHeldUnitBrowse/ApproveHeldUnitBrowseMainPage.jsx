import React from "react";
import { No_Of_Record_per_page } from "../../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import { setUnitPageNumber } from "../../../../../redux/ApproveHeldSlice";
import ApproveHeldUnitBrowseFooter from "./ApproveHeldUnitBrowseFooter";
import ApproveHeldUnitBrowseHeader from "./ApproveHeldUnitBrowseHeader";
import ApproveHeldUnitBrowseListing from "./ApproveHeldUnitBrowseListing";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import {
  APPROVE_HELD_UNIT_BROWSE_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../../constants/screenSizes";

const ApproveHeldUnitBrowseMainPage = () => {
  const unitTotalPages = useSelector((state) => state.approveHeldShuttleReducer.unitTotalPages);
  const approveHeldUnitData = useSelector((state) => state.approveHeldShuttleReducer.approveHeldUnitData);
  const unitTotalElements = useSelector((state) => state.approveHeldShuttleReducer.unitTotalElements);
  const unitPageNumber = useSelector((state) => state.approveHeldShuttleReducer.unitPageNumber);

  const paginationProps = {
    pageNumber: unitPageNumber,
    setPageNumber: setUnitPageNumber,
    totalPages: unitTotalPages,
    totalElements: unitTotalElements,
    listingData: approveHeldUnitData,
  };

  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={APPROVE_HELD_UNIT_BROWSE_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={<ApproveHeldUnitBrowseHeader />}
      TableListingComponent={<ApproveHeldUnitBrowseListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={No_Of_Record_per_page}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
      FooterComponent={<ApproveHeldUnitBrowseFooter />}
    />
  );
};

export default ApproveHeldUnitBrowseMainPage;
