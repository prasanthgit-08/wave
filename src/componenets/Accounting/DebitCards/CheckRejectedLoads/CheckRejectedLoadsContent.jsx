import React, { useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { setCheckPageNumber } from "../../../../redux/CheckRejectedLoadsSlice";
import { useSelector } from "react-redux";
import CheckRejectedList from "./CheckRejectedList";

const CheckRejectedLoadsContent = () => {
  const browseData = useSelector((state) => state.checkRejectedLoadReducer.browseData);
  const totalPages = useSelector((state) => state.checkRejectedLoadReducer.totalPages);
  const totalElements = useSelector((state) => state.checkRejectedLoadReducer.totalElements);
  const checkPageNumber = useSelector((state) => state.checkRejectedLoadReducer.checkPageNumber);
  const [loading, setLoading] = useState(false);

  const paginationProps = {
    pageNumber: checkPageNumber,
    setPageNumber: setCheckPageNumber,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: browseData,
  };
  return (
    <div className="container-fluid table-bordered ">
      <div className=" ">
        <div className="row " style={{ minHeight: "617px" }}>
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-100">
              <div className="w-100">
                <CheckRejectedList loading={loading} setLoading={setLoading} />
              </div>
              <PaginationComponent
                {...paginationProps}
                firstPage
                lastPage
                singleArrowUp
                singleArrowDown
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckRejectedLoadsContent;
