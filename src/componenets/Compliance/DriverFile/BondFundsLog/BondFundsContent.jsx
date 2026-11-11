import React, { useEffect } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";

import TableListing from "./TableListing";
import { setPageNumber, updateField } from "../../../../redux/BondFundsLogSlice";
import { useNavigate, useParams } from "react-router-dom";

const BondFundsContent = () => {
  const dispatch = useDispatch();
  const { driverId } = useParams();

  const totalPages = useSelector((state) => state.bondFundsLog.totalPages);
  const totalElements = useSelector((state) => state.bondFundsLog.totalElements);

  const pageNumber = useSelector((state) => state.bondFundsLog.pageNumber);

  const listingData = useSelector((state) => state.bondFundsLog.listingData);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
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

export default BondFundsContent;
