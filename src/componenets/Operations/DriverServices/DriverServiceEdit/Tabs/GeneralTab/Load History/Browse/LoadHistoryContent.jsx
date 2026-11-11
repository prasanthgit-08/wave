import React from "react";
import LoadHistoryList from "./LoadHistoryList";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import { setPageNumber } from "../../../../../../../../redux/LoadHistorySlice";

function LoadHistoryContent() {
  const historyData = useSelector((state) => state.loadHistory.historyData);
  const pageNumber = useSelector((state) => state.loadHistory.pageNumber);
  const totalPages = useSelector((state) => state.loadHistory.totalPages);
  const totalElements = useSelector((state) => state.loadHistory.totalElements);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: historyData,
  };
  return (
    <div className="d-flex col-12 fit-heightDispatchBrowse  " style={{ minHeight: "720px" }}>
      <div className="w-100">
        <LoadHistoryList />
      </div>
      <PaginationComponent
        {...paginationProps}
        recordsPerPage={20}
        firstPage
        lastPage
        singleArrowUp
        singleArrowDown
        hideBorderRight
        hideBorderBottom
        hideBorderTop
      />
    </div>
  );
}

export default LoadHistoryContent;
