import React, { useState } from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import DriverTMRLogsListing from "./DriverTMRLogsListing";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import { setPageNumber } from "../../../../../redux/DriverTMRLogsSlice";
import DriverTMRLogsSearchFilter from "../DriverTMRLogsBrowsePage/DriverTMRLogsSearchFilter";

const DriverTMRLogsMainPage = () => {
  const totalElements = useSelector((state) => state.driverTMRLogsReducer.totalElements);
  const totalPages = useSelector((state) => state.driverTMRLogsReducer.totalPages);
  const pageNumber = useSelector((state) => state.driverTMRLogsReducer.pageNumber);
  const listingDriverTMRLogsData = useSelector(
    (state) => state.driverTMRLogsReducer.listingDriverTMRLogsData
  );

  const [loader, setLoader] = useState(false);

  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements,
    listingData: listingDriverTMRLogsData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={<DriverTMRLogsSearchFilter />}
      TableListingComponent={<DriverTMRLogsListing loader={loader} setLoader={setLoader} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={11}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          hideBorderTop
          hideBorderRight
          loading={loader}
        />
      }
    />
  );
};
export default DriverTMRLogsMainPage;
