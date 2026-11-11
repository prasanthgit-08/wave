import React from "react";
import PayHistoryDetailListing from "./PayHistoryDetailListing";
import { useSelector } from "react-redux";
import { QuarterScreen_RecordsPerPage } from "../../../../../../../../../services/constants/applicationConstants";
import { setPageNumberDetailsTab } from "../../../../../../../../../redux/DriverPayHistorySlice";
import { PaginationComponent } from "../../../../../../../../common/PaginationComponent";
const DetailsContent = () => {
  const pageNumber = useSelector((state) => state.driverPayHistoryReducer.pageNumberDetailsTab);
  const totalPages = useSelector((state) => state.driverPayHistoryReducer.totalPagesDetailsTab);
  const totalElements = useSelector((state) => state.driverPayHistoryReducer.totalElementsDetailsTab);
  const checkDetailList = useSelector((state) => state.driverPayHistoryReducer.checkDetailList);
  const loading = useSelector((state) => state.driverPayHistoryReducer.detailLoading);

  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumberDetailsTab,
    totalPages,
    totalElements,
    listingData: checkDetailList,
  };
  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 ">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-390px">
              <div className="w-100">
                <PayHistoryDetailListing />
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

export default DetailsContent;
