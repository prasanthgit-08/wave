import React from "react";
import QuarterScreenTemplate from "../../../../../../../../Templates/QuarterScreenTemplate";
import PayHistoryHeader from "../PayHistoryHeader";
import PayHistoryDetailListing from "./PayHistoryDetailListing";
import { PaginationComponent } from "../../../../../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../../../../../services/constants/applicationConstants";
import { useSelector } from "react-redux";
import PayHistoryFooter from "../PayHistoryFooter";
import { setPageNumberDetailsTab } from "../../../../../../../../../redux/DriverPayHistorySlice";

function PayHistoryDetailTab() {
  const pageNumber = useSelector((state) => state.driverPayHistoryReducer.pageNumberDetailsTab);
  const totalPages = useSelector((state) => state.driverPayHistoryReducer.totalPagesDetailsTab);
  const totalElements = useSelector((state) => state.driverPayHistoryReducer.totalElementsDetailsTab);
  const checkDetailList = useSelector((state) => state.driverPayHistoryReducer.checkDetailList);

  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumberDetailsTab,
    totalPages,
    totalElements,
    listingData: checkDetailList,
  };

  return (
    <QuarterScreenTemplate
      screenHeight={"564px"}
      tableListingHeight={"463px"}
      overflowHidden
      SearchFilterComponent={<PayHistoryHeader />}
      TableListingComponent={<PayHistoryDetailListing />}
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

export default PayHistoryDetailTab;
