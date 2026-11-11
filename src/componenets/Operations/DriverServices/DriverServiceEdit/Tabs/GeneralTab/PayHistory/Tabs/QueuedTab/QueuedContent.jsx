import React from "react";
import PayHistoryQueuedListing from "./PayHistoryQueuedListing";
import { useSelector } from "react-redux";
import { QuarterScreen_RecordsPerPage } from "../../../../../../../../../services/constants/applicationConstants";
import { setPageNumberQueuedTab } from "../../../../../../../../../redux/DriverPayHistorySlice";
import { PaginationComponent } from "../../../../../../../../common/PaginationComponent";

const QueuedContent = () => {
  const pageNumber = useSelector((state) => state.driverPayHistoryReducer.pageNumberQueuedTab);
  const totalPages = useSelector((state) => state.driverPayHistoryReducer.totalPagesQueuedTab);
  const totalElements = useSelector((state) => state.driverPayHistoryReducer.totalElementsQueuedTab);
  const checkQueuedList = useSelector((state) => state.driverPayHistoryReducer.checkQueuedList);
  const loading = useSelector((state) => state.driverPayHistoryReducer.queuedLoading);

  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumberQueuedTab,
    totalPages,
    totalElements,
    listingData: checkQueuedList,
  };
  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 ">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-390px">
              <div className="w-100">
                <PayHistoryQueuedListing />
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

export default QueuedContent;
