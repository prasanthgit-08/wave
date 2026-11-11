import React, { useState } from "react";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import { setLoadedPageNumber, setPageNumber } from "../../../../redux/MileageLogSlice";

const MileageLogContent = () => {
  const totalPages = useSelector((state) => state.driverMileageLogs.totalPages);
  const totalElements = useSelector((state) => state.driverMileageLogs.totalElements);

  const pageNumber = useSelector((state) => state.driverMileageLogs.pageNumber);
  const loadedPageNumber = useSelector((state) => state.driverMileageLogs.loadedPageNumber);
  const selectionType = useSelector((state) => state.driverMileageLogs.selectionType);

  const listingData = useSelector((state) => state.driverMileageLogs.listingData);
  const [pageLoading, setPageLoading] = useState(false);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const LoadPaginationProps = {
    pageNumber: loadedPageNumber,
    setPageNumber: setLoadedPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <div className="w-100 ">
      <div className="quarterScreenFormContentHeight" style={{ height: "438px" }}>
        <div className="d-flex  h-100">
          <div className="flex-grow-1 ">
            <TableListing pageLoading={pageLoading} setPageLoading={setPageLoading} />
          </div>
          {selectionType === "safety miles" ? (
            <PaginationComponent
              {...paginationProps}
              firstPage
              lastPage
              singleArrowUp
              doubleArrowUp
              tripleArrowUp
              singleArrowDown
              doubleArrowDown
              tripleArrowDown
              loading={pageLoading}
            />
          ) : (
            <PaginationComponent
              {...LoadPaginationProps}
              firstPage
              lastPage
              singleArrowUp
              doubleArrowUp
              tripleArrowUp
              singleArrowDown
              doubleArrowDown
              tripleArrowDown
              loading={pageLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MileageLogContent;
