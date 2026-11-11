import React from "react";
import QuarterScreenTemplate from "../../../../../../../../Templates/QuarterScreenTemplate";
import PayHistoryHeader from "../PayHistoryHeader";
import PayHistorySummaryListing from "./PayHistorySummaryListing";
import { PaginationComponent } from "../../../../../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../../../../../services/constants/applicationConstants";
import { useSelector } from "react-redux";
import PayHistoryFooter from "../PayHistoryFooter";
import { setPageNumber } from "../../../../../../../../../redux/DriverPayHistorySlice";

function PayHistorySummaryTab() {
  const pageNumber = useSelector((state) => state.driverPayHistoryReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverPayHistoryReducer.totalPages);
  const totalElements = useSelector((state) => state.driverPayHistoryReducer.totalElements);
  const checkHeaderList = useSelector((state) => state.driverPayHistoryReducer.checkHeaderList);

  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements,
    listingData: checkHeaderList,
  };

  return (
    <QuarterScreenTemplate
      screenHeight={"564px"}
      tableListingHeight={"463px"}
      SearchFilterComponent={<PayHistoryHeader />}
      TableListingComponent={<PayHistorySummaryListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          singleArrowUp
          doubleArrowUp
          doubleArrowDown
          singleArrowDown
          borderThin
          recordsPerPage={QuarterScreen_RecordsPerPage}
        />
      }
      FooterComponent={<PayHistoryFooter />}
    />
  );
}

export default PayHistorySummaryTab;
