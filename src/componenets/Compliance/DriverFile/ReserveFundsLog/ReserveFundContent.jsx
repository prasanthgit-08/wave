import React from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import { setPageNumber } from "../../../../redux/ReserveFundsLogSlice";
import TableListing from "./TableListing";

const ReserveFundContent = () => {
  const totalPages = useSelector((state) => state.reserveFundsLog.totalPages);
  const totalElements = useSelector((state) => state.reserveFundsLog.totalElements);

  const pageNumber = useSelector((state) => state.reserveFundsLog.pageNumber);

  const listingData = useSelector((state) => state.reserveFundsLog.listingData);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <div className="w-100 ">
      <div className="quarterScreenFormContentHeight" style={{ height: "444px" }}>
        <div className="d-flex  h-100">
          <div className="flex-grow-1 ">
            <TableListing />
          </div>
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
          />
        </div>
      </div>
    </div>
  );
};

export default ReserveFundContent;
