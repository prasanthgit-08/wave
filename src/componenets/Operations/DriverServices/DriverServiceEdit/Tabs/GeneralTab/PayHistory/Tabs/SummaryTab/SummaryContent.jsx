import React from "react";
import QuarterScreenTemplate from "../../../../../../../../Templates/QuarterScreenTemplate";
import PayHistoryHeader from "../PayHistoryHeader";
import PayHistorySummaryListing from "./PayHistorySummaryListing";
import { PaginationComponent } from "../../../../../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../../../../../services/constants/applicationConstants";
import { useSelector } from "react-redux";
import PayHistoryFooter from "../PayHistoryFooter";
import { setPageNumber } from "../../../../../../../../../redux/DriverPayHistorySlice";
const SummaryContent = () => {
  const pageNumber = useSelector((state) => state.driverPayHistoryReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverPayHistoryReducer.totalPages);
  const totalElements = useSelector((state) => state.driverPayHistoryReducer.totalElements);
  const checkHeaderList = useSelector((state) => state.driverPayHistoryReducer.checkHeaderList);
  const loading = useSelector((state) => state.driverPayHistoryReducer.loading);

  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements,
    listingData: checkHeaderList,
  };
  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 ">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-390px">
              <div className="w-100">
                <PayHistorySummaryListing />
              </div>
              <PaginationComponent
                {...paginationProps}
                loading={loading}
                firstPage
                lastPage
                doubleArrowUp
                doubleArrowDown
                singleArrowUp
                singleArrowDown
                recordsPerPage={QuarterScreen_RecordsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryContent;
